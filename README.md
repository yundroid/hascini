# Has Çini — Kurumsal Web Sitesi

Büyükçekmece E-5 üzerindeki **Has Çini** için hazırlanmış; kilit parke, bordür, bahçe/peyzaj, dış mekan seramik ve doğal taş ürünlerini tanıtan web sitesi.

Site tamamen **statik** (HTML + CSS + JavaScript) çalışır. Derleme, veritabanı ya da sunucu tarafı kod gerektirmez; dosyaları herhangi bir hostinge (cPanel, Netlify, Vercel, GitHub Pages vb.) yüklemek yeterlidir.

## Sayfalar

| Sayfa | Dosya | İçerik |
|---|---|---|
| Ana Sayfa | `index.html` | Hero, ürün grupları, neden biz, rakamlar, öne çıkan projeler, sipariş süreci, metraj hesaplayıcı, yorumlar, SSS |
| Ürünler | `urunler.html` | Kategori filtresi, arama, ürün detay penceresi (renk/kalınlık seçimi), hesaplayıcı |
| Projelerimiz | `projeler.html` | Proje galerisi, türe göre filtre, proje detay penceresi |
| Hakkımızda | `hakkimizda.html` | Hikaye, değerler, hizmetler |
| İletişim | `iletisim.html` | Telefon, WhatsApp, e-posta, adres, çalışma saatleri, form, harita |

## Öne çıkan özellikler

- **Teklif listesi (sepet mantığı):** Müşteri ürünleri renk/kalınlık/miktarıyla listeye ekler, ad-telefon-teslimat yeri bilgisini yazar ve tek tıkla **WhatsApp** ya da **e-posta** ile hazır bir teklif mesajı gönderir. Liste tarayıcıda saklanır.
- **Metraj hesaplayıcı:** En × boy veya toplam m² girilir, fire payı seçilir; gereken m² ve yaklaşık adet hesaplanır ve teklif listesine eklenir.
- **Sabit WhatsApp düğmesi**, tıklayınca aranan telefon numaraları.
- **SEO:** Sayfa başlıkları/açıklamaları, Open Graph, `LocalBusiness` yapısal verisi, `sitemap.xml`, `robots.txt`.
- **Mobil uyumlu**, erişilebilir (klavye, ekran okuyucu, azaltılmış hareket desteği).
- **Desen görselleri:** Gerçek fotoğraf eklenene kadar her ürünün döşeme deseni (balıksırtı, altıgen, çim taşı…) seçilen renkte otomatik çizilir.

## İçeriği güncelleme

### 1. İletişim bilgileri — `assets/js/config.js`
Telefon, WhatsApp, e-posta, adres, harita, çalışma saatleri, sayaçlardaki rakamlar ve sosyal medya hesapları buradan yönetilir. **`TODO` yazan her alanı gerçek bilgiyle değiştirin.**

> `index.html` içindeki `application/ld+json` bloğundaki telefon ve adresi de aynı şekilde güncelleyin (Google bu bilgiyi okur).

Google Haritalar yerleştirme adresi: Google Haritalar'da işletmenizi açın → **Paylaş** → **Harita yerleştir** → çıkan koddaki `src="..."` değerini `haritaEmbed` alanına yapıştırın.

### 2. Ürünler — `assets/js/data.js` → `URUNLER`
Her ürün bir kayıttır. Yeni ürün için mevcut bir kaydı kopyalayıp düzenleyin:

```js
{
  id: "behaton-6",                 // benzersiz, Türkçe karakter ve boşluk olmadan
  ad: "Behaton Kilit Parke",
  kategori: "parke",               // parke | bordur | bahce | seramik | dogaltas
  desen: "herringbone",            // fotoğraf yoksa çizilecek desen
  gorsel: "assets/img/urunler/behaton.jpg", // (isteğe bağlı) gerçek fotoğraf
  olcu: "10 × 20 cm",
  kalinlik: ["6 cm", "8 cm"],
  renkler: ["Gri", "Kırmızı"],     // RENKLER listesindeki adlar
  birim: "m²",                     // m² | adet | mtül | ...
  adetM2: 50,                      // (isteğe bağlı) 1 m²'deki adet
  kullanim: ["Yaya yolu", "Otopark"],
  aciklama: "..."
}
```

Desen seçenekleri: `herringbone`, `stretcher`, `cobble`, `hexagon`, `tactile`, `curb`, `channel`, `grass`, `step`, `stepping`, `gravel`, `tile`, `wood`, `pool`, `stone`.

### 3. Projeler — `assets/js/data.js` → `PROJELER`
Şu an listede **örnek** projeler vardır ve sitede "Örnek" etiketiyle görünürler. Gerçek işlerinizi ekleyip örnekleri silin:

```js
{
  baslik: "Site İçi Yol ve Otopark", yer: "Büyükçekmece", yil: 2025, tur: "Site & Konut",
  urunler: ["Behaton Kilit Parke"], metraj: "4.200 m²",
  gorseller: ["assets/img/projeler/site-1.jpg", "assets/img/projeler/site-2.jpg"],
  ozet: "..."
}
```

Fotoğrafları `assets/img/projeler/` klasörüne koyun. Öneri: yatay, en az 1600 px genişlik, JPG/WebP, 300 KB altı.

### 4. Yorumlar ve SSS — `assets/js/data.js` → `YORUMLAR`, `SSS`
Yorumlar şu an yer tutucudur; Google yorumlarınızdan izin alarak gerçek yorumlarla değiştirin.

### 5. Hakkımızda metni — `hakkimizda.html`
`TODO` yorumu olan paragrafları işletmenin gerçek hikayesiyle (kuruluş yılı vb.) güncelleyin.

### 6. Paylaşım görseli
Sosyal medyada link paylaşıldığında görünecek 1200×630 boyutunda bir görseli `assets/img/og.jpg` olarak ekleyin.

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# tarayıcıda http://localhost:8000
```

## Yayına alma

Tüm klasörü hostinginizin kök dizinine (`public_html`) yükleyin. Alan adı `www.hascini.com` dışında olacaksa `sitemap.xml`, `robots.txt` ve HTML dosyalarındaki `canonical`/`og:url` adreslerini güncelleyin.
