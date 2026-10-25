/*
 * Desen çizici — gerçek ürün fotoğrafı olmayan yerlerde, ürünün döşeme
 * desenini (balıksırtı, altıgen, çim taşı...) seçilen renkte canvas ile çizer
 * ve JPEG veri adresi olarak döndürür. Sonuçlar önbelleğe alınır.
 */
(function () {
  const cache = new Map();

  function rng(seedStr) {
    let h = 1779033703 ^ seedStr.length;
    for (let i = 0; i < seedStr.length; i++) {
      h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  function hexRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function shade(hex, amt) {
    const [r, g, b] = hexRgb(hex);
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    const f = (c) => Math.round((t - c) * p + c);
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  }
  // Rastgele ton farkı: her taş bir tık farklı
  function vary(hex, r, spread = 0.12) {
    return shade(hex, (r() - 0.5) * spread * 2);
  }

  function bevelRect(ctx, x, y, w, h, fill, radius = 2) {
    ctx.fillStyle = fill;
    roundRect(ctx, x, y, w, h, radius);
    ctx.fill();
    const g = ctx.createLinearGradient(x, y, x + w, y + h);
    g.addColorStop(0, "rgba(255,255,255,0.16)");
    g.addColorStop(0.5, "rgba(255,255,255,0)");
    g.addColorStop(1, "rgba(0,0,0,0.18)");
    ctx.fillStyle = g;
    ctx.fill();
  }
  function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function poly(ctx, pts, fill) {
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const g = ctx.createLinearGradient(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    g.addColorStop(0, "rgba(255,255,255,0.14)");
    g.addColorStop(1, "rgba(0,0,0,0.16)");
    ctx.fillStyle = g;
    ctx.fill();
  }

  const P = {
    herringbone(ctx, W, H, c, r, s) {
      const u = 16 * s, gap = 1.6 * s;
      ctx.fillStyle = shade(c, -0.45); ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W / 2, H / 2); ctx.rotate(Math.PI / 4);
      const R = Math.ceil(Math.hypot(W, H) / 2 / u) + 4;
      for (let k = -R; k < R; k++) {
        for (let sx = -R; sx < R; sx += 4) {
          const x = k + sx;
          if (Math.abs(x) > R + 4) continue;
          bevelRect(ctx, x * u + gap / 2, k * u + gap / 2, 2 * u - gap, u - gap, vary(c, r), 2 * s);
          bevelRect(ctx, (x + 2) * u + gap / 2, (k - 1) * u + gap / 2, u - gap, 2 * u - gap, vary(c, r), 2 * s);
        }
      }
      ctx.restore();
    },
    stretcher(ctx, W, H, c, r, s, o = {}) {
      const h = (o.h || 22) * s, L = (o.L || 66) * s, gap = 1.8 * s;
      ctx.fillStyle = shade(c, -0.4); ctx.fillRect(0, 0, W, H);
      for (let y = 0, row = 0; y < H; y += h, row++) {
        for (let x = row % 2 ? -L / 2 : 0; x < W; x += L)
          bevelRect(ctx, x + gap / 2, y + gap / 2, L - gap, h - gap, vary(c, r), 2 * s);
      }
    },
    cobble(ctx, W, H, c, r, s) {
      ctx.fillStyle = shade(c, -0.5); ctx.fillRect(0, 0, W, H);
      for (let y = 0; y < H;) {
        const h = (24 + r() * 10) * s;
        for (let x = -r() * 20 * s; x < W;) {
          const w = (22 + r() * 18) * s;
          bevelRect(ctx, x + 2 * s, y + 2 * s, w - 4 * s, h - 4 * s, vary(c, r, 0.2), 7 * s);
          x += w;
        }
        y += h;
      }
    },
    hexagon(ctx, W, H, c, r, s) {
      const R = 26 * s, gap = 2 * s, hw = Math.sqrt(3) * R;
      ctx.fillStyle = shade(c, -0.45); ctx.fillRect(0, 0, W, H);
      for (let row = -1; row * 1.5 * R < H + R; row++) {
        const y = row * 1.5 * R;
        for (let x = row % 2 ? hw / 2 : 0; x < W + hw; x += hw) {
          const pts = [];
          for (let i = 0; i < 6; i++) {
            const a = Math.PI / 6 + (i * Math.PI) / 3;
            pts.push([x + (R - gap) * Math.cos(a), y + (R - gap) * Math.sin(a)]);
          }
          poly(ctx, pts, vary(c, r));
        }
      }
    },
    tactile(ctx, W, H, c, r, s) {
      const u = 90 * s, gap = 3 * s;
      ctx.fillStyle = shade(c, -0.45); ctx.fillRect(0, 0, W, H);
      for (let y = 0, row = 0; y < H; y += u, row++)
        for (let x = 0, col = 0; x < W; x += u, col++) {
          bevelRect(ctx, x + gap, y + gap, u - 2 * gap, u - 2 * gap, vary(c, r, 0.06), 3 * s);
          if ((row + col) % 2) {
            for (let i = 0; i < 4; i++) {
              ctx.fillStyle = shade(c, -0.18);
              roundRect(ctx, x + u * (0.17 + i * 0.19), y + 10 * s, 7 * s, u - 20 * s, 3.5 * s); ctx.fill();
              ctx.fillStyle = shade(c, 0.25);
              roundRect(ctx, x + u * (0.17 + i * 0.19), y + 10 * s, 3 * s, u - 20 * s, 1.5 * s); ctx.fill();
            }
          } else {
            for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) {
              const cx = x + u * (0.16 + i * 0.17), cy = y + u * (0.16 + j * 0.17);
              ctx.fillStyle = shade(c, -0.2); ctx.beginPath(); ctx.arc(cx + s, cy + s, 5.5 * s, 0, 7); ctx.fill();
              ctx.fillStyle = shade(c, 0.2); ctx.beginPath(); ctx.arc(cx - s, cy - s, 4 * s, 0, 7); ctx.fill();
            }
          }
        }
    },
    curb(ctx, W, H, c, r, s) {
      // üstte çim, ortada bordür, altta asfalt
      grassField(ctx, 0, 0, W, H * 0.38, r, s);
      const top = H * 0.38, bh = H * 0.24, L = 150 * s;
      ctx.fillStyle = shade(c, -0.5); ctx.fillRect(0, top, W, bh);
      for (let x = -r() * L; x < W; x += L) {
        ctx.fillStyle = vary(c, r, 0.08);
        ctx.fillRect(x + 1.5 * s, top, L - 3 * s, bh);
        const g = ctx.createLinearGradient(0, top, 0, top + bh);
        g.addColorStop(0, "rgba(255,255,255,0.28)"); g.addColorStop(0.35, "rgba(255,255,255,0.05)");
        g.addColorStop(0.36, "rgba(0,0,0,0.08)"); g.addColorStop(1, "rgba(0,0,0,0.28)");
        ctx.fillStyle = g; ctx.fillRect(x + 1.5 * s, top, L - 3 * s, bh);
      }
      ctx.fillStyle = "#3a3b3d"; ctx.fillRect(0, top + bh, W, H - top - bh);
      speckle(ctx, 0, top + bh, W, H - top - bh, r, 2200 * s * s, ["#2d2e30", "#4b4c4e", "#56575a"]);
      ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(0, top + bh, W, 6 * s);
    },
    channel(ctx, W, H, c, r, s) {
      const bh = 90 * s, L = 150 * s;
      ctx.fillStyle = shade(c, -0.45); ctx.fillRect(0, 0, W, H);
      for (let y = 0, row = 0; y < H; y += bh, row++)
        for (let x = row % 2 ? -L / 2 : 0; x < W; x += L) {
          bevelRect(ctx, x + 1.5 * s, y + 1.5 * s, L - 3 * s, bh - 3 * s, vary(c, r, 0.08), 2 * s);
          const g = ctx.createLinearGradient(0, y + bh * 0.25, 0, y + bh * 0.75);
          g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(0.3, "rgba(0,0,0,0.28)");
          g.addColorStop(0.7, "rgba(255,255,255,0.12)"); g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g; ctx.fillRect(x + 1.5 * s, y + bh * 0.25, L - 3 * s, bh * 0.5);
        }
    },
    grass(ctx, W, H, c, r, s) {
      const u = 96 * s, hole = 0.3 * u;
      ctx.fillStyle = shade(c, -0.45); ctx.fillRect(0, 0, W, H);
      for (let y = 0, row = 0; y < H; y += u, row++)
        for (let x = row % 2 ? -u / 2 : 0; x < W; x += u) {
          bevelRect(ctx, x + 1.5 * s, y + 1.5 * s, u - 3 * s, u - 3 * s, vary(c, r, 0.08), 3 * s);
          for (const [hx, hy] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) {
            const px = x + hx * u - hole / 2, py = y + hy * u - hole / 2;
            grassField(ctx, px, py, hole, hole, r, s * 0.6);
            ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 2 * s; ctx.strokeRect(px, py, hole, hole);
          }
        }
    },
    step(ctx, W, H, c, r, s) {
      const n = 4, sh = H / n;
      for (let i = 0; i < n; i++) {
        const y = i * sh, tread = sh * 0.62;
        ctx.fillStyle = vary(c, r, 0.05); ctx.fillRect(0, y, W, tread);
        const g = ctx.createLinearGradient(0, y, 0, y + tread);
        g.addColorStop(0, "rgba(0,0,0,0.1)"); g.addColorStop(1, "rgba(255,255,255,0.18)");
        ctx.fillStyle = g; ctx.fillRect(0, y, W, tread);
        ctx.fillStyle = shade(c, -0.3); ctx.fillRect(0, y + tread, W, sh - tread);
        ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(0, y + tread - 2 * s, W, 2 * s);
        for (let x = -r() * 200 * s; x < W; x += 200 * s) { ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fillRect(x, y, 2 * s, sh); }
      }
    },
    stepping(ctx, W, H, c, r, s) {
      grassField(ctx, 0, 0, W, H, r, s);
      const n = 6, sz = 70 * s;
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1), x = W * 0.12 + t * W * 0.76 - sz / 2, y = H * 0.5 + Math.sin(t * 3.2) * H * 0.22 - sz / 2;
        ctx.fillStyle = "rgba(0,0,0,0.3)"; roundRect(ctx, x + 4 * s, y + 5 * s, sz, sz, 6 * s); ctx.fill();
        bevelRect(ctx, x, y, sz, sz, vary(c, r, 0.1), 6 * s);
      }
    },
    gravel(ctx, W, H, c, r, s) {
      ctx.fillStyle = shade(c, -0.35); ctx.fillRect(0, 0, W, H);
      const n = Math.round((W * H) / (60 * s * s));
      for (let i = 0; i < n; i++) {
        const x = r() * W, y = r() * H, rx = (4 + r() * 6) * s, ry = rx * (0.6 + r() * 0.35), a = r() * Math.PI;
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath(); ctx.ellipse(x + 1.5 * s, y + 1.5 * s, rx, ry, a, 0, 7); ctx.fill();
        ctx.fillStyle = vary(c, r, 0.22);
        ctx.beginPath(); ctx.ellipse(x, y, rx, ry, a, 0, 7); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath(); ctx.ellipse(x - rx * 0.3, y - ry * 0.3, rx * 0.4, ry * 0.35, a, 0, 7); ctx.fill();
      }
    },
    tile(ctx, W, H, c, r, s) {
      const u = 120 * s, gap = 2 * s;
      ctx.fillStyle = shade(c, -0.3); ctx.fillRect(0, 0, W, H);
      for (let y = 0, row = 0; y < H; y += u, row++)
        for (let x = row % 2 ? -u / 2 : 0; x < W; x += u * 2) {
          const fill = vary(c, r, 0.05);
          ctx.fillStyle = fill; ctx.fillRect(x + gap / 2, y + gap / 2, u * 2 - gap, u - gap);
          // taş damarı
          ctx.strokeStyle = shade(c, -0.08); ctx.lineWidth = 1 * s; ctx.globalAlpha = 0.6;
          for (let v = 0; v < 3; v++) {
            ctx.beginPath(); let vx = x + r() * u * 2, vy = y;
            ctx.moveTo(vx, vy);
            for (let k = 0; k < 6; k++) { vx += (r() - 0.5) * 40 * s; vy += u / 6; ctx.lineTo(vx, Math.min(vy, y + u - gap)); }
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          const g = ctx.createLinearGradient(x, y, x + u * 2, y + u);
          g.addColorStop(0, "rgba(255,255,255,0.12)"); g.addColorStop(1, "rgba(0,0,0,0.08)");
          ctx.fillStyle = g; ctx.fillRect(x + gap / 2, y + gap / 2, u * 2 - gap, u - gap);
        }
    },
    wood(ctx, W, H, c, r, s) {
      const h = 40 * s;
      ctx.fillStyle = shade(c, -0.5); ctx.fillRect(0, 0, W, H);
      for (let y = 0; y < H; y += h) {
        for (let x = -r() * 200 * s; x < W;) {
          const L = (180 + r() * 140) * s, fill = vary(c, r, 0.12);
          ctx.fillStyle = fill; ctx.fillRect(x + 1.5 * s, y + 1.5 * s, L - 3 * s, h - 3 * s);
          ctx.save(); ctx.beginPath(); ctx.rect(x + 1.5 * s, y + 1.5 * s, L - 3 * s, h - 3 * s); ctx.clip();
          ctx.strokeStyle = shade(c, -0.22); ctx.lineWidth = 1 * s; ctx.globalAlpha = 0.5;
          for (let g = 0; g < 7; g++) {
            const gy = y + 4 * s + r() * (h - 8 * s), amp = r() * 4 * s, f = 0.01 + r() * 0.02;
            ctx.beginPath();
            for (let gx = x; gx < x + L; gx += 6 * s) ctx.lineTo(gx, gy + Math.sin(gx * f / s) * amp);
            ctx.stroke();
          }
          ctx.restore(); ctx.globalAlpha = 1;
          x += L;
        }
      }
    },
    pool(ctx, W, H, c, r, s) {
      const band = H * 0.32;
      P.tile(ctx, W, band, c, r, s * 0.6);
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(0, band - 10 * s, W, 10 * s);
      const g = ctx.createLinearGradient(0, band, 0, H);
      g.addColorStop(0, "#3a9cc0"); g.addColorStop(1, "#1d6a8f");
      ctx.fillStyle = g; ctx.fillRect(0, band, W, H - band);
      ctx.strokeStyle = "rgba(255,255,255,0.22)"; ctx.lineWidth = 2 * s;
      for (let i = 0; i < 40; i++) {
        const x = r() * W, y = band + r() * (H - band), w = (30 + r() * 60) * s;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + w / 2, y - 8 * s, x + w, y + r() * 6 * s); ctx.stroke();
      }
    },
    stone(ctx, W, H, c, r, s) {
      const u = 70 * s, cols = Math.ceil(W / u) + 2, rows = Math.ceil(H / u) + 2, pts = [];
      ctx.fillStyle = shade(c, -0.5); ctx.fillRect(0, 0, W, H);
      for (let j = 0; j < rows; j++) { pts[j] = []; for (let i = 0; i < cols; i++) pts[j][i] = [(i - 1) * u + (r() - 0.5) * u * 0.6, (j - 1) * u + (r() - 0.5) * u * 0.6]; }
      const shrink = (q) => { const cx = q.reduce((a, p) => a + p[0], 0) / q.length, cy = q.reduce((a, p) => a + p[1], 0) / q.length; return q.map(([x, y]) => [cx + (x - cx) * 0.92, cy + (y - cy) * 0.92]); };
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = pts[j][i], b = pts[j][i + 1], d = pts[j + 1][i + 1], e = pts[j + 1][i];
        if (r() < 0.35) { poly(ctx, shrink([a, b, d]), vary(c, r, 0.2)); poly(ctx, shrink([a, d, e]), vary(c, r, 0.2)); }
        else poly(ctx, shrink([a, b, d, e]), vary(c, r, 0.2));
      }
    }
  };

  function grassField(ctx, x, y, w, h, r, s) {
    ctx.fillStyle = "#4f6e35"; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    const n = Math.round((w * h) / (14 * s * s));
    for (let i = 0; i < n; i++) {
      const gx = x + r() * w, gy = y + r() * h;
      ctx.strokeStyle = ["#6b8a4e", "#5a7a3f", "#7d9c5a", "#43602c"][(r() * 4) | 0];
      ctx.lineWidth = 1.2 * s;
      ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + (r() - 0.5) * 4 * s, gy - (4 + r() * 6) * s); ctx.stroke();
    }
    ctx.restore();
  }
  function speckle(ctx, x, y, w, h, r, n, colors) {
    for (let i = 0; i < n; i++) { ctx.fillStyle = colors[(r() * colors.length) | 0]; ctx.fillRect(x + r() * w, y + r() * h, 1.5, 1.5); }
  }

  function grain(ctx, W, H, r, amt) {
    const img = ctx.getImageData(0, 0, W, H), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (r() - 0.5) * amt;
      d[i] += n; d[i + 1] += n; d[i + 2] += n;
    }
    ctx.putImageData(img, 0, 0);
  }

  /**
   * desenGorsel("herringbone", "Kırmızı", 600, 450) → "data:image/jpeg;..."
   */
  window.desenGorsel = function (tip, renkAdi, W = 600, H = 450) {
    const key = `${tip}|${renkAdi}|${W}x${H}`;
    if (cache.has(key)) return cache.get(key);
    const renk = (window.RENKLER && window.RENKLER[renkAdi]) || renkAdi || "#8e8f8d";
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    const r = rng(key);
    const s = Math.max(W, H) / 600;
    (P[tip] || P.stretcher)(ctx, W, H, renk, r, s);
    grain(ctx, W, H, r, 18);
    // yumuşak ışık
    const g = ctx.createRadialGradient(W * 0.3, H * 0.2, 0, W * 0.5, H * 0.5, Math.hypot(W, H) * 0.7);
    g.addColorStop(0, "rgba(255,245,230,0.12)"); g.addColorStop(1, "rgba(0,0,0,0.22)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const url = cv.toDataURL("image/jpeg", 0.85);
    cache.set(key, url);
    return url;
  };
})();
