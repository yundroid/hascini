/* Has Çini — site davranışları */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------------- İkonlar ---------------- */
  const I = {
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8z"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01" stroke-width="3"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h8"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m9.8 15.5 5.7-3.5-5.7-3.5z"/>'
  };
  const ico = (n, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  const waIco = (cls = "") => `<svg class="ico ico-fill ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12 9.8 9.8 0 0 1 12 2.2 9.8 9.8 0 0 1 21.8 12 9.8 9.8 0 0 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7c1.7.9 3.7 1.4 5.7 1.4 6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3z"/></svg>`;

  const waLink = (text) => `https://wa.me/${S.whatsapp}${text ? "?text=" + encodeURIComponent(text) : ""}`;
  const urunGorsel = (u, renk, w, h) => u.gorsel || window.desenGorsel(u.desen, renk || u.renkler[0], w, h);
  const kategoriAd = (id) => (window.KATEGORILER.find((k) => k.id === id) || {}).ad || "";

  /* ---------------- Görünürken beliren öğeler ---------------- */
  const rio = "IntersectionObserver" in window ? new IntersectionObserver((ents) => ents.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); rio.unobserve(en.target); }
  }), { rootMargin: "0px 0px -8% 0px" }) : null;
  function observeReveal() { $$(".reveal:not(.in)").forEach((el) => (rio ? rio.observe(el) : el.classList.add("in"))); }

  /* ---------------- Üst menü & alt bilgi ---------------- */
  const sayfa = document.body.dataset.page;
  const menu = [
    ["index", "index.html", "Ana Sayfa"],
    ["urunler", "urunler.html", "Ürünler"],
    ["projeler", "projeler.html", "Projelerimiz"],
    ["hakkimizda", "hakkimizda.html", "Hakkımızda"],
    ["iletisim", "iletisim.html", "İletişim"]
  ];

  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="topbar">
        <div class="container topbar-in">
          <span>${ico("pin")} ${esc(S.adres)}</span>
          <span class="topbar-r">
            <span>${ico("clock")} ${esc(S.calismaSaatleri[0].join(": "))}</span>
            <a href="mailto:${esc(S.eposta)}">${ico("mail")} ${esc(S.eposta)}</a>
          </span>
        </div>
      </div>
      <div class="nav-wrap">
        <nav class="container nav" aria-label="Ana menü">
          <a class="brand" href="index.html" aria-label="${esc(S.firma)} ana sayfa">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-txt"><img class="brand-yazi" src="assets/img/logo-yazi.svg" alt="HAS ÇİNİ" width="132" height="24"><small>Parke · Bordür · Dış Mekan</small></span>
          </a>
          <ul class="nav-links" id="nav-links">
            ${menu.map(([id, href, ad]) => `<li><a href="${href}"${id === sayfa ? ' aria-current="page"' : ""}>${ad}</a></li>`).join("")}
          </ul>
          <div class="nav-cta">
            <a class="nav-phone" href="tel:${esc(S.telefonLink)}">${ico("phone")}<span><small>Hemen arayın</small>${esc(S.telefon)}</span></a>
            <button class="btn btn-primary btn-sm teklif-ac" type="button" aria-label="Teklif listesi">${ico("list")} <span class="tl-txt">Teklif Listesi</span><span class="badge" data-teklif-sayi>0</span></button>
            <button class="nav-toggle" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="nav-links">${ico("menu")}</button>
          </div>
        </nav>
      </div>`;
    const tg = $(".nav-toggle", header);
    tg.addEventListener("click", () => {
      const open = header.classList.toggle("menu-open");
      tg.setAttribute("aria-expanded", open);
      tg.innerHTML = ico(open ? "close" : "menu");
    });
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const footer = $("#site-footer");
  if (footer) {
    const sosyal = Object.entries(S.sosyal).filter(([, v]) => v)
      .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener" aria-label="${k}">${ico(k)}</a>`).join("");
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <a class="brand brand-light" href="index.html">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-txt"><img class="brand-yazi" src="assets/img/logo-yazi-acik.svg" alt="HAS ÇİNİ" width="132" height="24"><small>Parke · Bordür · Dış Mekan</small></span>
          </a>
          <p class="footer-about">${esc(S.slogan)}. Büyükçekmece E-5 üzerindeki satış alanımızda kilit parke, bordür, bahçe ve dış mekan seramik ürünlerini yerinde inceleyebilirsiniz.</p>
          ${sosyal ? `<div class="social">${sosyal}</div>` : ""}
        </div>
        <div>
          <h3>Sayfalar</h3>
          <ul>${menu.map(([, href, ad]) => `<li><a href="${href}">${ad}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3>Ürünler</h3>
          <ul>${window.KATEGORILER.map((k) => `<li><a href="urunler.html?kategori=${k.id}">${esc(k.ad)}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3>İletişim</h3>
          <ul class="footer-contact">
            <li>${ico("pin")}<a href="${esc(S.haritaLink)}" target="_blank" rel="noopener">${esc(S.adres)}</a></li>
            <li>${ico("phone")}<a href="tel:${esc(S.telefonLink)}">${esc(S.telefon)}</a></li>
            <li>${waIco()}<a href="${waLink()}" target="_blank" rel="noopener">${esc(S.gsm)} (WhatsApp)</a></li>
            <li>${ico("mail")}<a href="mailto:${esc(S.eposta)}">${esc(S.eposta)}</a></li>
            ${S.calismaSaatleri.map(([g, s]) => `<li>${ico("clock")}<span>${esc(g)}: ${esc(s)}</span></li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} ${esc(S.unvan)}. Tüm hakları saklıdır.</span>
        <span>Büyükçekmece · Beylikdüzü · Esenyurt · Silivri · Çatalca · Avcılar</span>
      </div>`;
  }

  // Sabit WhatsApp düğmesi
  document.body.insertAdjacentHTML("beforeend",
    `<a class="wa-float" href="${waLink("Merhaba, ürünleriniz hakkında bilgi almak istiyorum.")}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">${waIco()}<span>WhatsApp</span></a>`);

  // data-site="telefon" gibi alanları doldur
  $$("[data-site]").forEach((el) => {
    const k = el.dataset.site;
    if (k === "telefon") { el.textContent = S.telefon; if (el.tagName === "A") el.href = "tel:" + S.telefonLink; }
    else if (k === "gsm") { el.textContent = S.gsm; if (el.tagName === "A") el.href = waLink(); }
    else if (k === "eposta") { el.textContent = S.eposta; if (el.tagName === "A") el.href = "mailto:" + S.eposta; }
    else if (k === "adres") { el.textContent = S.adres; if (el.tagName === "A") el.href = S.haritaLink; }
    else if (k === "whatsapp") { el.href = waLink(el.dataset.mesaj || ""); }
    else if (k === "harita") { el.src = S.haritaEmbed; }
    else if (k === "saatler") el.innerHTML = S.calismaSaatleri.map(([g, s]) => `<li><span>${esc(g)}</span><strong>${esc(s)}</strong></li>`).join("");
  });

  $$("[data-yil]").forEach((el) => (el.textContent = S.rakamlar[0].deger + S.rakamlar[0].ek));

  const hrefler = { telefon: "tel:" + S.telefonLink, eposta: "mailto:" + S.eposta, adres: S.haritaLink, gsm: waLink() };
  $$("[data-site-card]").forEach((el) => (el.href = hrefler[el.dataset.siteCard]));
  $$("[data-site-text]").forEach((el) => (el.textContent = S[el.dataset.siteText]));

  // Desen arka planları: <div data-desen="herringbone" data-renk="Kırmızı">
  $$("[data-desen]").forEach((el) => {
    const w = +el.dataset.w || 1400, h = +el.dataset.h || 900;
    el.style.backgroundImage = `url(${window.desenGorsel(el.dataset.desen, el.dataset.renk, w, h)})`;
  });

  /* ---------------- Bildirim ---------------- */
  const toastEl = document.createElement("div");
  toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite");
  document.body.appendChild(toastEl);
  let toastT;
  function toast(msg) {
    toastEl.innerHTML = ico("check") + `<span>${esc(msg)}</span>`;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /* ---------------- Teklif listesi ---------------- */
  const KEY = "hascini-teklif";
  const Teklif = {
    items: (() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } })(),
    save() { try { localStorage.setItem(KEY, JSON.stringify(this.items)); } catch {} this.render(); },
    add(item) {
      const same = this.items.find((i) => i.id === item.id && i.renk === item.renk && i.kalinlik === item.kalinlik);
      if (same) same.miktar = +same.miktar + +item.miktar; else this.items.push(item);
      this.save();
      toast(`${item.ad} teklif listenize eklendi`);
      $$("[data-teklif-sayi]").forEach((b) => { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); });
    },
    render() {
      $$("[data-teklif-sayi]").forEach((b) => { b.textContent = this.items.length; b.hidden = !this.items.length; });
      const list = $("#teklif-items");
      if (!list) return;
      if (!this.items.length) {
        list.innerHTML = `<div class="empty">${ico("list")}<p>Teklif listeniz boş.</p><a class="btn btn-outline btn-sm" href="urunler.html">Ürünlere göz atın</a></div>`;
      } else {
        list.innerHTML = this.items.map((i, n) => {
          const u = window.URUNLER.find((x) => x.id === i.id);
          return `<div class="t-item">
            <img src="${u ? urunGorsel(u, i.renk, 160, 120) : ""}" alt="" width="64" height="48">
            <div class="t-info"><strong>${esc(i.ad)}</strong><small>${[i.renk, i.kalinlik].filter(Boolean).map(esc).join(" · ")}</small></div>
            <label class="t-qty"><span class="sr-only">Miktar</span><input type="number" min="1" step="1" value="${esc(i.miktar)}" data-n="${n}"><span>${esc(i.birim)}</span></label>
            <button class="icon-btn" data-sil="${n}" aria-label="Kaldır">${ico("trash")}</button>
          </div>`;
        }).join("");
      }
      $("#teklif-gonder").disabled = !this.items.length;
      $("#teklif-mail").classList.toggle("disabled", !this.items.length);
    },
    mesaj() {
      const f = $("#teklif-form");
      const v = (n) => f.elements[n].value.trim();
      let t = `Merhaba ${S.firma}, aşağıdaki ürünler için fiyat teklifi almak istiyorum:\n\n`;
      this.items.forEach((i, n) => { t += `${n + 1}. ${i.ad}${i.renk ? " — " + i.renk : ""}${i.kalinlik ? ", " + i.kalinlik : ""}: ${i.miktar} ${i.birim}\n`; });
      t += "\n";
      if (v("ad")) t += `Ad Soyad: ${v("ad")}\n`;
      if (v("tel")) t += `Telefon: ${v("tel")}\n`;
      if (v("yer")) t += `Teslimat yeri: ${v("yer")}\n`;
      if (f.elements.uygulama.checked) t += `Uygulama (döşeme) hizmeti de istiyorum.\n`;
      if (v("not")) t += `Not: ${v("not")}\n`;
      return t;
    }
  };

  document.body.insertAdjacentHTML("beforeend", `
    <div class="drawer-backdrop" id="teklif-bg" hidden></div>
    <aside class="drawer" id="teklif-drawer" aria-label="Teklif listesi" aria-hidden="true" inert>
      <header class="drawer-head">
        <div><h2>Teklif Listesi</h2><p>Ürünleri ekleyin, tek mesajla fiyat isteyin.</p></div>
        <button class="icon-btn" id="teklif-kapat" aria-label="Kapat">${ico("close")}</button>
      </header>
      <div class="drawer-body">
        <div id="teklif-items"></div>
        <form id="teklif-form" class="t-form" novalidate>
          <div class="row2">
            <label>Ad Soyad<input name="ad" autocomplete="name"></label>
            <label>Telefon<input name="tel" type="tel" autocomplete="tel"></label>
          </div>
          <label>Teslimat yeri (ilçe / mahalle)<input name="yer" placeholder="örn. Beylikdüzü, Adnan Kahveci"></label>
          <label class="check"><input type="checkbox" name="uygulama"> Döşeme / uygulama hizmeti de istiyorum</label>
          <label>Not<textarea name="not" rows="2" placeholder="Teslim tarihi, vinç ihtiyacı vb."></textarea></label>
        </form>
      </div>
      <footer class="drawer-foot">
        <button class="btn btn-wa btn-block" id="teklif-gonder" type="button">${waIco()} WhatsApp ile Teklif İste</button>
        <a class="btn btn-ghost btn-block" id="teklif-mail" href="#">${ico("mail")} E-posta ile gönder</a>
        <p class="fine">Fiyatlarımız miktar ve teslimat yerine göre belirlenir. Mesai saatlerinde aynı gün dönüş yapıyoruz.</p>
      </footer>
    </aside>`);

  const drawer = $("#teklif-drawer"), bg = $("#teklif-bg");
  let lastFocus;
  function openDrawer() {
    lastFocus = document.activeElement;
    bg.hidden = false; drawer.inert = false; drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => $("#teklif-kapat").focus(), 50);
  }
  function closeDrawer() {
    drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); drawer.inert = true; bg.hidden = true;
    document.body.classList.remove("no-scroll");
    lastFocus && lastFocus.focus();
  }
  document.addEventListener("click", (e) => { if (e.target.closest(".teklif-ac")) openDrawer(); });
  $("#teklif-kapat").addEventListener("click", closeDrawer);
  bg.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer(); });
  $("#teklif-items").addEventListener("input", (e) => {
    const n = e.target.dataset.n;
    if (n != null) { Teklif.items[n].miktar = Math.max(1, +e.target.value || 1); try { localStorage.setItem(KEY, JSON.stringify(Teklif.items)); } catch {} }
  });
  $("#teklif-items").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sil]");
    if (b) { Teklif.items.splice(+b.dataset.sil, 1); Teklif.save(); }
  });
  $("#teklif-gonder").addEventListener("click", () => window.open(waLink(Teklif.mesaj()), "_blank", "noopener"));
  $("#teklif-mail").addEventListener("click", (e) => {
    e.preventDefault();
    if (!Teklif.items.length) return;
    location.href = `mailto:${S.eposta}?subject=${encodeURIComponent("Fiyat teklifi talebi")}&body=${encodeURIComponent(Teklif.mesaj())}`;
  });
  Teklif.render();

  /* ---------------- Modal (ürün & proje) ---------------- */
  document.body.insertAdjacentHTML("beforeend",
    `<dialog class="modal" id="modal"><button class="icon-btn modal-x" aria-label="Kapat">${ico("close")}</button><div class="modal-body"></div></dialog>`);
  const modal = $("#modal");
  $(".modal-x", modal).addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener("close", () => document.body.classList.remove("no-scroll"));
  function openModal(html, cls = "") {
    $(".modal-body", modal).innerHTML = html;
    modal.className = "modal " + cls;
    document.body.classList.add("no-scroll");
    modal.showModal();
  }

  function urunModal(u) {
    let renk = u.renkler[0], kal = u.kalinlik[0] || "";
    openModal(`
      <div class="pm">
        <div class="pm-media"><img id="pm-img" src="${urunGorsel(u, renk, 900, 700)}" alt="${esc(u.ad)} — ${esc(renk)}"></div>
        <div class="pm-info">
          <span class="eyebrow">${esc(kategoriAd(u.kategori))}</span>
          <h2>${esc(u.ad)}</h2>
          <p>${esc(u.aciklama)}</p>
          <dl class="specs">
            <div><dt>Ebat</dt><dd>${esc(u.olcu)}</dd></div>
            ${u.kalinlik.length ? `<div><dt>Kalınlık</dt><dd>${u.kalinlik.map(esc).join(" / ")}</dd></div>` : ""}
            <div><dt>Satış birimi</dt><dd>${esc(u.birim)}</dd></div>
            ${u.adetM2 ? `<div><dt>1 m²</dt><dd>≈ ${String(u.adetM2).replace(".", ",")} adet</dd></div>` : ""}
            <div><dt>Kullanım</dt><dd>${u.kullanim.map(esc).join(", ")}</dd></div>
          </dl>
          <div class="opt">
            <span class="opt-l">Renk: <strong id="pm-renk">${esc(renk)}</strong></span>
            <div class="swatches">${u.renkler.map((r, i) => `<button type="button" class="sw${i ? "" : " on"}" data-r="${esc(r)}" style="--c:${window.RENKLER[r] || "#999"}" aria-label="${esc(r)}" title="${esc(r)}"></button>`).join("")}</div>
          </div>
          ${u.kalinlik.length > 1 ? `<div class="opt"><span class="opt-l">Kalınlık</span><div class="seg">${u.kalinlik.map((k, i) => `<button type="button" class="${i ? "" : "on"}" data-k="${esc(k)}">${esc(k)}</button>`).join("")}</div></div>` : ""}
          <div class="pm-add">
            <label class="qty"><span class="sr-only">Miktar</span><input type="number" id="pm-qty" min="1" value="${u.birim === "adet" ? 100 : 50}"><span>${esc(u.birim)}</span></label>
            <button class="btn btn-primary" id="pm-ekle" type="button">${ico("plus")} Teklif Listesine Ekle</button>
          </div>
          <a class="btn btn-wa btn-block" id="pm-wa" target="_blank" rel="noopener" href="#">${waIco()} Bu ürünü WhatsApp'tan sorun</a>
        </div>
      </div>`, "modal-wide");
    const waUpd = () => $("#pm-wa").href = waLink(`Merhaba, ${u.ad} (${renk}${kal ? ", " + kal : ""}) hakkında bilgi ve fiyat almak istiyorum.`);
    waUpd();
    $$(".sw", modal).forEach((b) => b.addEventListener("click", () => {
      $$(".sw", modal).forEach((x) => x.classList.remove("on")); b.classList.add("on");
      renk = b.dataset.r; $("#pm-renk").textContent = renk;
      const img = $("#pm-img"); img.src = urunGorsel(u, renk, 900, 700); img.alt = `${u.ad} — ${renk}`;
      waUpd();
    }));
    $$(".seg button", modal).forEach((b) => b.addEventListener("click", () => {
      $$(".seg button", modal).forEach((x) => x.classList.remove("on")); b.classList.add("on");
      kal = b.dataset.k; waUpd();
    }));
    $("#pm-ekle").addEventListener("click", () => {
      Teklif.add({ id: u.id, ad: u.ad, renk, kalinlik: kal, miktar: Math.max(1, +$("#pm-qty").value || 1), birim: u.birim });
      modal.close();
    });
  }

  /* ---------------- Ürün kartları ---------------- */
  const urunKart = (u) => `
    <article class="card product reveal">
      <button class="card-hit" data-urun="${u.id}" aria-label="${esc(u.ad)} detaylarını gör"></button>
      <div class="card-media"><img loading="lazy" src="${urunGorsel(u)}" alt="${esc(u.ad)}" width="600" height="450">
        <span class="chip">${esc(kategoriAd(u.kategori))}</span></div>
      <div class="card-body">
        <h3>${esc(u.ad)}</h3>
        <p class="meta">${esc(u.olcu)}${u.kalinlik.length ? " · " + u.kalinlik.map(esc).join(" / ") : ""}</p>
        <div class="card-foot">
          <span class="dots">${u.renkler.map((r) => `<i style="--c:${window.RENKLER[r] || "#999"}" title="${esc(r)}"></i>`).join("")}</span>
          <span class="more">İncele ${ico("arrow")}</span>
        </div>
      </div>
    </article>`;

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-urun]");
    if (b) { const u = window.URUNLER.find((x) => x.id === b.dataset.urun); if (u) urunModal(u); }
  });

  const grid = $("#urun-grid");
  if (grid) {
    const params = new URLSearchParams(location.search);
    let kat = params.get("kategori") || "hepsi", ara = "";
    const filtre = $("#urun-filtre");
    filtre.innerHTML = [["hepsi", "Tümü"], ...window.KATEGORILER.map((k) => [k.id, k.ad])]
      .map(([id, ad]) => `<button type="button" data-k="${id}" class="${id === kat ? "on" : ""}">${esc(ad)} <small>${id === "hepsi" ? window.URUNLER.length : window.URUNLER.filter((u) => u.kategori === id).length}</small></button>`).join("");
    const draw = () => {
      const q = ara.toLocaleLowerCase("tr");
      const list = window.URUNLER.filter((u) => (kat === "hepsi" || u.kategori === kat) &&
        (!q || [u.ad, u.aciklama, u.olcu, ...u.kullanim, ...u.renkler].join(" ").toLocaleLowerCase("tr").includes(q)));
      grid.innerHTML = list.length ? list.map(urunKart).join("") :
        `<p class="empty-grid">Aramanıza uygun ürün bulunamadı. Aradığınız ürünü <a href="${waLink("Merhaba, şu ürünü arıyorum: " + ara)}" target="_blank" rel="noopener">WhatsApp'tan sorun</a>, temin edelim.</p>`;
      $("#urun-sayi").textContent = `${list.length} ürün`;
      observeReveal();
    };
    filtre.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      kat = b.dataset.k;
      $$("button", filtre).forEach((x) => x.classList.toggle("on", x === b));
      const url = new URL(location); kat === "hepsi" ? url.searchParams.delete("kategori") : url.searchParams.set("kategori", kat);
      history.replaceState(null, "", url);
      draw();
    });
    $("#urun-ara").addEventListener("input", (e) => { ara = e.target.value.trim(); draw(); });
    draw();
    const acik = params.get("urun");
    if (acik) { const u = window.URUNLER.find((x) => x.id === acik); if (u) urunModal(u); }
  }

  // Ana sayfa kategori kartları
  const kg = $("#kategori-grid");
  if (kg) {
    kg.innerHTML = window.KATEGORILER.map((k, i) => `
      <a class="cat reveal${i === 0 ? " cat-lg" : ""}" href="urunler.html?kategori=${k.id}">
        <img loading="lazy" src="${window.desenGorsel(k.desen, k.renk, i === 0 ? 900 : 600, i === 0 ? 900 : 450)}" alt="">
        <div class="cat-txt">
          <span class="cat-n">${window.URUNLER.filter((u) => u.kategori === k.id).length} ürün</span>
          <h3>${esc(k.ad)}</h3>
          <p>${esc(k.kisa)}</p>
          <span class="more">Ürünleri gör ${ico("arrow")}</span>
        </div>
      </a>`).join("");
  }

  /* ---------------- Projeler ---------------- */
  const projeGorsel = (p, w = 800, h = 600) => (p.gorseller && p.gorseller[0]) || window.desenGorsel(p.desen, p.renk, w, h);
  const pg = $("#proje-grid");
  if (pg) {
    const limit = +pg.dataset.limit || Infinity;
    const pf = $("#proje-filtre");
    let tur = "hepsi";
    const turler = [...new Set(window.PROJELER.map((p) => p.tur))];
    if (pf) {
      pf.innerHTML = [["hepsi", "Tümü"], ...turler.map((t) => [t, t])]
        .map(([id, ad]) => `<button type="button" data-t="${esc(id)}" class="${id === tur ? "on" : ""}">${esc(ad)}</button>`).join("");
      pf.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        tur = b.dataset.t; $$("button", pf).forEach((x) => x.classList.toggle("on", x === b)); draw();
      });
    }
    const draw = () => {
      const list = window.PROJELER.map((p, i) => [p, i]).filter(([p]) => tur === "hepsi" || p.tur === tur).slice(0, limit);
      pg.innerHTML = list.map(([p, i]) => `
        <article class="project reveal">
          <button class="card-hit" data-proje="${i}" aria-label="${esc(p.baslik)} projesini incele"></button>
          <img loading="lazy" src="${projeGorsel(p)}" alt="${esc(p.baslik)}" width="800" height="600">
          ${p.ornek ? '<span class="ornek" title="Bu kayıt örnektir, gerçek projelerle değiştirilecek">Örnek</span>' : ""}
          <div class="project-txt">
            <span class="eyebrow">${esc(p.tur)} · ${esc(p.yer)}</span>
            <h3>${esc(p.baslik)}</h3>
            <p>${esc(p.metraj)} · ${esc(p.yil)}</p>
          </div>
        </article>`).join("");
      observeReveal();
    };
    draw();
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-proje]");
    if (!b) return;
    const p = window.PROJELER[+b.dataset.proje];
    const imgs = p.gorseller && p.gorseller.length ? p.gorseller : [projeGorsel(p, 1200, 800)];
    openModal(`
      <div class="pj">
        <div class="pj-main"><img id="pj-img" src="${imgs[0]}" alt="${esc(p.baslik)}"></div>
        ${imgs.length > 1 ? `<div class="pj-thumbs">${imgs.map((s, i) => `<button type="button" data-src="${esc(s)}" class="${i ? "" : "on"}"><img src="${esc(s)}" alt=""></button>`).join("")}</div>` : ""}
        <div class="pj-info">
          <div>
            <span class="eyebrow">${esc(p.tur)}</span>
            <h2>${esc(p.baslik)}</h2>
            <p>${esc(p.ozet)}</p>
          </div>
          <dl class="specs">
            <div><dt>Konum</dt><dd>${esc(p.yer)}</dd></div>
            <div><dt>Yıl</dt><dd>${esc(p.yil)}</dd></div>
            <div><dt>Metraj</dt><dd>${esc(p.metraj)}</dd></div>
            <div><dt>Kullanılan ürünler</dt><dd>${p.urunler.map(esc).join(", ")}</dd></div>
          </dl>
          <a class="btn btn-primary" href="${waLink(`Merhaba, "${p.baslik}" projesindekine benzer bir uygulama için teklif almak istiyorum.`)}" target="_blank" rel="noopener">${waIco()} Benzer bir proje için teklif alın</a>
        </div>
      </div>`, "modal-wide");
    $$(".pj-thumbs button", modal).forEach((t) => t.addEventListener("click", () => {
      $("#pj-img").src = t.dataset.src; $$(".pj-thumbs button", modal).forEach((x) => x.classList.toggle("on", x === t));
    }));
  });

  /* ---------------- Rakamlar ---------------- */
  const rk = $("#rakamlar");
  if (rk) {
    rk.innerHTML = S.rakamlar.map((r) => `<div class="stat"><strong data-to="${r.deger}" data-ek="${esc(r.ek)}">0${esc(r.ek)}</strong><span>${esc(r.etiket)}</span></div>`).join("");
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      $$("[data-to]", rk).forEach((el) => {
        const to = +el.dataset.to, ek = el.dataset.ek, t0 = performance.now(), d = 1400;
        const step = (t) => {
          const k = Math.min(1, (t - t0) / d), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
          el.textContent = (ek === "%" ? "%" + v : v.toLocaleString("tr-TR") + ek);
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }), { threshold: 0.4 });
    io.observe(rk);
  }

  /* ---------------- Yorumlar & SSS ---------------- */
  const yr = $("#yorumlar");
  if (yr) yr.innerHTML = window.YORUMLAR.map((y) => `
    <figure class="quote reveal">
      <div class="stars" aria-label="5 üzerinden 5">★★★★★</div>
      <blockquote>“${esc(y.metin)}”</blockquote>
      <figcaption><span class="avatar">${esc(y.isim[0])}</span><span><strong>${esc(y.isim)}</strong><small>${esc(y.rol)}</small></span></figcaption>
    </figure>`).join("");

  const sss = $("#sss");
  if (sss) sss.innerHTML = window.SSS.map((q, i) => `
    <details class="faq"${i === 0 ? " open" : ""}><summary>${esc(q.s)}<span class="faq-i" aria-hidden="true"></span></summary><p>${esc(q.c)}</p></details>`).join("");

  /* ---------------- Metraj hesaplayıcı ---------------- */
  const hs = $("#hesaplayici");
  if (hs) {
    const sel = $("#h-urun", hs);
    const uygun = window.URUNLER.filter((u) => u.birim === "m²" || u.adetM2);
    sel.innerHTML = uygun.map((u) => `<option value="${u.id}">${esc(u.ad)}</option>`).join("");
    const f = (n) => $("#" + n, hs);
    const fmt = (n, d = 1) => n.toLocaleString("tr-TR", { maximumFractionDigits: d });
    let sonuc = null;
    const hesap = () => {
      const u = uygun.find((x) => x.id === sel.value);
      const mod = $("input[name=h-mod]:checked", hs).value;
      $(".h-olcu", hs).hidden = mod !== "olcu"; $(".h-alan", hs).hidden = mod !== "alan";
      const net = mod === "olcu" ? (+f("h-en").value || 0) * (+f("h-boy").value || 0) : +f("h-m2").value || 0;
      const fire = +f("h-fire").value;
      const top = net * (1 + fire / 100);
      $("#h-net", hs).textContent = fmt(net) + " m²";
      $("#h-top", hs).textContent = fmt(Math.ceil(top)) + " m²";
      const adet = u.adetM2 ? Math.ceil(top * u.adetM2) : null;
      $("#h-adet-w", hs).hidden = !adet;
      if (adet) $("#h-adet", hs).textContent = fmt(adet, 0) + " adet";
      $("#h-ekle", hs).disabled = !net;
      sonuc = { u, miktar: u.birim === "adet" ? adet : Math.ceil(top) };
    };
    hs.addEventListener("input", hesap);
    $("#h-ekle", hs).addEventListener("click", () => {
      if (!sonuc || !sonuc.miktar) return;
      const { u } = sonuc;
      Teklif.add({ id: u.id, ad: u.ad, renk: u.renkler[0], kalinlik: u.kalinlik[0] || "", miktar: sonuc.miktar, birim: u.birim });
    });
    hesap();
  }

  /* ---------------- İletişim formu ---------------- */
  const cf = $("#iletisim-form");
  if (cf) {
    const metin = () => {
      const v = (n) => cf.elements[n].value.trim();
      return `Merhaba ${S.firma},\n\nKonu: ${v("konu")}\n${v("mesaj")}\n\nAd Soyad: ${v("ad")}\nTelefon: ${v("tel")}`;
    };
    const gecerli = () => {
      let ok = true;
      ["ad", "tel", "mesaj"].forEach((n) => {
        const el = cf.elements[n], bos = !el.value.trim();
        el.closest("label").classList.toggle("err", bos);
        if (bos) ok = false;
      });
      if (!ok) cf.querySelector(".err input, .err textarea").focus();
      return ok;
    };
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      if (gecerli()) window.open(waLink(metin()), "_blank", "noopener");
    });
    $("#form-mail").addEventListener("click", () => {
      if (gecerli()) location.href = `mailto:${S.eposta}?subject=${encodeURIComponent(cf.elements.konu.value)}&body=${encodeURIComponent(metin())}`;
    });
  }

  observeReveal();
})();
