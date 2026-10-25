/*
 * HAS ÇİNİ — ÜRÜN ve PROJE VERİLERİ
 * ------------------------------------------------------------------
 * Ürün eklemek / çıkarmak için URUNLER listesini düzenleyin.
 * Proje eklemek için PROJELER listesine yeni kayıt ekleyin.
 *
 * gorsel: "assets/img/urunler/dosya.jpg" gibi gerçek bir fotoğraf yolu
 *         verilirse fotoğraf gösterilir; boş bırakılırsa ürünün desen
 *         (desen + renk) bilgisinden otomatik bir çizim üretilir.
 */

window.RENKLER = {
  "Gri": "#8e8f8d",
  "Antrasit": "#4b4d50",
  "Kırmızı": "#a5523c",
  "Sarı": "#c8a35f",
  "Kahverengi": "#6f4f3c",
  "Beyaz": "#dcd8cf",
  "Siyah": "#2c2c2d",
  "Bej": "#c9b48f",
  "Traverten": "#d6c4a3",
  "Bazalt": "#3d3f42",
  "Andezit": "#7c7a74",
  "Meşe": "#9a7451",
  "Ceviz": "#5e4130",
  "Yeşil": "#6b8a4e"
};

window.KATEGORILER = [
  { id: "parke", ad: "Kilit Parke Taşları", kisa: "Yaya yolu, otopark ve site içi yollar için yüksek dayanımlı beton parke.", desen: "herringbone", renk: "Kırmızı" },
  { id: "bordur", ad: "Bordür & Oluk", kisa: "Yol, refüj ve bahçe sınırları için bordür, oluk ve kanaletler.", desen: "curb", renk: "Gri" },
  { id: "bahce", ad: "Bahçe & Peyzaj", kisa: "Çim taşı, basamak, dekoratif çakıl ve peyzaj ürünleri.", desen: "grass", renk: "Gri" },
  { id: "seramik", ad: "Dış Mekan Seramik", kisa: "Kaymaz yüzeyli, dona dayanıklı 20 mm dış mekan porselen.", desen: "tile", renk: "Bej" },
  { id: "dogaltas", ad: "Doğal Taş", kisa: "Andezit, bazalt ve traverten; küp taş, plaka ve kayrak.", desen: "stone", renk: "Andezit" }
];

window.URUNLER = [
  // ---------------- KİLİT PARKE ----------------
  {
    id: "behaton-6", ad: "Behaton Kilit Parke", kategori: "parke", desen: "herringbone",
    olcu: "10 × 20 cm", kalinlik: ["6 cm", "8 cm"], renkler: ["Gri", "Kırmızı", "Sarı", "Antrasit"],
    birim: "m²", adetM2: 50, kullanim: ["Yaya yolu", "Site içi", "Otopark"],
    aciklama: "En çok tercih edilen klasik kilit parke. Balıksırtı veya düz dizilebilir, yük dağılımı yüksektir. 8 cm kalınlık araç trafiği olan alanlar için önerilir."
  },
  {
    id: "kilit-dalga", ad: "Dalga (Kilit) Parke", kategori: "parke", desen: "herringbone",
    olcu: "11,2 × 22,5 cm", kalinlik: ["6 cm", "8 cm"], renkler: ["Gri", "Kırmızı", "Antrasit"],
    birim: "m²", adetM2: 40, kullanim: ["Otopark", "Sanayi alanı", "Yol"],
    aciklama: "Birbirine kenetlenen dalgalı formu sayesinde yatay kaymaya karşı en dayanıklı model. Ağır araç trafiğine uygundur."
  },
  {
    id: "dikdortgen-parke", ad: "Modern Dikdörtgen Parke", kategori: "parke", desen: "stretcher",
    olcu: "10 × 30 cm", kalinlik: ["6 cm", "8 cm"], renkler: ["Antrasit", "Gri", "Beyaz", "Kahverengi"],
    birim: "m²", adetM2: 33, kullanim: ["Villa", "Bahçe yolu", "Teras"],
    aciklama: "Uzun formatlı, sade çizgili modern parke. Şaşırtmalı dizildiğinde mimari projelerde şık bir görünüm sağlar."
  },
  {
    id: "kupe-tas", ad: "Eskitme Küp Parke", kategori: "parke", desen: "cobble",
    olcu: "Karışık ebat", kalinlik: ["6 cm"], renkler: ["Gri", "Kahverengi", "Sarı"],
    birim: "m²", kullanim: ["Tarihi doku", "Bahçe", "Kafe & restoran"],
    aciklama: "Kenarları tamburlanarak eskitilmiş, doğal taş görünümlü beton parke. Rustik ve otantik alanlar için idealdir."
  },
  {
    id: "altigen-parke", ad: "Altıgen Parke", kategori: "parke", desen: "hexagon",
    olcu: "20 cm (köşe-köşe)", kalinlik: ["6 cm", "8 cm"], renkler: ["Gri", "Antrasit", "Kırmızı"],
    birim: "m²", kullanim: ["Park", "Meydan", "Okul bahçesi"],
    aciklama: "Altıgen geometrisiyle hem estetik hem dengeli yük dağılımı sunar. Renk kombinasyonlarıyla desen oluşturulabilir."
  },
  {
    id: "hissedilebilir", ad: "Hissedilebilir Yüzey (Engelli Yolu)", kategori: "parke", desen: "tactile",
    olcu: "30 × 30 cm", kalinlik: ["6 cm"], renkler: ["Sarı"],
    birim: "adet", kullanim: ["Kaldırım", "Belediye projeleri"],
    aciklama: "Görme engelliler için kılavuz (çizgili) ve uyarı (noktalı) yüzeyli parke. TS standartlarına uygun ölçülerde."
  },

  // ---------------- BORDÜR ----------------
  {
    id: "bordur-50", ad: "Yol Bordürü", kategori: "bordur", desen: "curb",
    olcu: "15 × 30 × 50 cm / 15 × 30 × 100 cm", kalinlik: ["15 cm"], renkler: ["Gri"],
    birim: "mtül", kullanim: ["Yol kenarı", "Refüj", "Otopark"],
    aciklama: "Araç yolu ile kaldırımı ayıran standart beton bordür. Yüksek basınç dayanımına sahiptir."
  },
  {
    id: "bahce-bordur", ad: "Bahçe Bordürü", kategori: "bordur", desen: "curb",
    olcu: "8 × 20 × 50 cm / 10 × 20 × 50 cm", kalinlik: ["8 cm", "10 cm"], renkler: ["Gri", "Kırmızı", "Antrasit"],
    birim: "mtül", kullanim: ["Bahçe", "Çim sınırı", "Yürüyüş yolu"],
    aciklama: "Çim ve toprak alanları yürüyüş yollarından ayırmak için kullanılan ince profilli bordür."
  },
  {
    id: "oluk", ad: "Beton Oluk / Kanalet", kategori: "bordur", desen: "channel",
    olcu: "30 × 50 cm", kalinlik: ["8 cm"], renkler: ["Gri"],
    birim: "mtül", kullanim: ["Yağmur suyu drenajı", "Otopark", "Site içi"],
    aciklama: "Yüzey sularını toplayıp yönlendiren beton oluk. Bordür önünde veya yol ortasında kullanılır."
  },

  // ---------------- BAHÇE & PEYZAJ ----------------
  {
    id: "cim-tasi", ad: "Çim Taşı (Delikli Parke)", kategori: "bahce", desen: "grass",
    olcu: "40 × 60 cm", kalinlik: ["10 cm"], renkler: ["Gri"],
    birim: "adet", adetM2: 4.17, kullanim: ["Otopark", "Bahçe girişi", "İtfaiye yolu"],
    aciklama: "Boşluklarına çim ekilerek yeşil alanı korurken araç geçişine izin verir. Yağmur suyunu toprağa ulaştırır."
  },
  {
    id: "basamak", ad: "Prekast Basamak", kategori: "bahce", desen: "step",
    olcu: "35 × 100 cm", kalinlik: ["15 cm"], renkler: ["Gri", "Antrasit", "Beyaz"],
    birim: "adet", kullanim: ["Bahçe merdiveni", "Teras", "Giriş"],
    aciklama: "Bahçe kot farklarını çözmek için hazır beton basamak. Kaymaz yüzey seçeneği mevcuttur."
  },
  {
    id: "basma-tas", ad: "Bahçe Basma Taşı", kategori: "bahce", desen: "stepping",
    olcu: "40 × 40 cm / Ø 40 cm", kalinlik: ["5 cm"], renkler: ["Gri", "Antrasit", "Bej"],
    birim: "adet", kullanim: ["Çim üzeri yol", "Japon bahçesi"],
    aciklama: "Çim üzerine aralıklı yerleştirilen, ahşap veya taş dokulu dekoratif basma taşı."
  },
  {
    id: "cakil", ad: "Dekoratif Çakıl", kategori: "bahce", desen: "gravel",
    olcu: "16–32 mm / 32–64 mm", kalinlik: [], renkler: ["Beyaz", "Siyah", "Bej"],
    birim: "torba / ton", kullanim: ["Bahçe süsleme", "Saksı", "Drenaj"],
    aciklama: "Peyzaj alanlarında süsleme ve drenaj amaçlı kullanılan dere çakılı ve mermer çakıl."
  },

  // ---------------- DIŞ MEKAN SERAMİK ----------------
  {
    id: "seramik-20mm", ad: "20 mm Dış Mekan Porselen", kategori: "seramik", desen: "tile",
    olcu: "60 × 60 cm / 60 × 120 cm", kalinlik: ["20 mm"], renkler: ["Bej", "Gri", "Antrasit", "Traverten"],
    birim: "m²", kullanim: ["Teras", "Havuz başı", "Bahçe yolu"],
    aciklama: "Çim, çakıl veya kuma kuru döşenebilen 20 mm kalınlıkta porselen karo. R11 kaymazlık, donmaya ve lekeye karşı dayanıklı."
  },
  {
    id: "ahsap-seramik", ad: "Ahşap Görünümlü Dış Mekan Seramik", kategori: "seramik", desen: "wood",
    olcu: "20 × 120 cm / 30 × 120 cm", kalinlik: ["10 mm", "20 mm"], renkler: ["Meşe", "Ceviz", "Gri"],
    birim: "m²", kullanim: ["Teras", "Balkon", "Havuz çevresi"],
    aciklama: "Ahşabın sıcak görünümü, seramiğin bakım gerektirmeyen dayanıklılığıyla. Çürümez, solmaz, böceklenmez."
  },
  {
    id: "havuz-bordur", ad: "Havuz Kenar Bordürü", kategori: "seramik", desen: "pool",
    olcu: "30 × 60 cm", kalinlik: ["20 mm"], renkler: ["Beyaz", "Bej", "Gri"],
    birim: "mtül", kullanim: ["Havuz kenarı"],
    aciklama: "Yuvarlatılmış burunlu, kaymaz havuz kenar taşı. Klorlu suya dayanıklıdır."
  },

  // ---------------- DOĞAL TAŞ ----------------
  {
    id: "andezit-kup", ad: "Andezit Küp Taş", kategori: "dogaltas", desen: "cobble",
    olcu: "8 × 8 × 8 cm / 10 × 10 × 10 cm", kalinlik: [], renkler: ["Andezit"],
    birim: "m²", kullanim: ["Tarihi alan", "Meydan", "Rampa"],
    aciklama: "Yüzyıllardır kullanılan Arnavut kaldırımı. Doğal, son derece dayanıklı ve kaymaz."
  },
  {
    id: "bazalt-plaka", ad: "Bazalt Plaka", kategori: "dogaltas", desen: "stretcher",
    olcu: "30 × 60 cm / 40 × 60 cm", kalinlik: ["3 cm"], renkler: ["Bazalt"],
    birim: "m²", kullanim: ["Teras", "Giriş", "Cephe"],
    aciklama: "Koyu tonlu, yoğun dokulu volkanik taş. Fırçalanmış veya alevli yüzey seçenekleri."
  },
  {
    id: "traverten", ad: "Traverten Plaka", kategori: "dogaltas", desen: "tile",
    olcu: "30 × 60 cm / 40 × 60 cm", kalinlik: ["2 cm", "3 cm"], renkler: ["Traverten"],
    birim: "m²", kullanim: ["Havuz başı", "Teras", "Villa bahçesi"],
    aciklama: "Sıcak bej tonlarıyla Akdeniz havası. Yüzeyi güneşte ısınmaz, havuz çevreleri için idealdir."
  },
  {
    id: "kayrak", ad: "Kayrak Taşı (Düzensiz)", kategori: "dogaltas", desen: "stone",
    olcu: "Düzensiz", kalinlik: ["2–4 cm"], renkler: ["Andezit", "Bej", "Kahverengi"],
    birim: "m²", kullanim: ["Bahçe yolu", "Duvar kaplama"],
    aciklama: "Doğal kırık formlu plakalar ile organik görünümlü yollar ve duvarlar."
  }
];

/*
 * PROJELER — "ornek: true" olan kayıtlar yer tutucudur.
 * Gerçek işlerinizi fotoğraflarıyla ekleyip bu kayıtları silin.
 * gorseller: ["assets/img/projeler/proje1-1.jpg", ...]
 */
window.PROJELER = [
  { ornek: true, baslik: "Site İçi Yol ve Otopark", yer: "Büyükçekmece", yil: 2025, tur: "Site & Konut",
    urunler: ["Behaton Kilit Parke", "Yol Bordürü"], metraj: "4.200 m²", desen: "herringbone", renk: "Gri",
    ozet: "Konut sitesinin araç yolları ve açık otoparkı 8 cm behaton parke ile yenilendi." },
  { ornek: true, baslik: "Villa Bahçesi ve Havuz Çevresi", yer: "Silivri", yil: 2025, tur: "Villa & Bahçe",
    urunler: ["20 mm Dış Mekan Porselen", "Havuz Kenar Bordürü"], metraj: "380 m²", desen: "tile", renk: "Bej",
    ozet: "Havuz başı ve teras alanı kaymaz 20 mm porselen ile döşendi, bahçe yolları basma taşla tamamlandı." },
  { ornek: true, baslik: "Fabrika Sahası", yer: "Hadımköy", yil: 2024, tur: "Ticari & Sanayi",
    urunler: ["Dalga (Kilit) Parke", "Beton Oluk / Kanalet"], metraj: "9.500 m²", desen: "herringbone", renk: "Antrasit",
    ozet: "Ağır tır trafiğine uygun 8 cm dalga parke ve yüzey suyu drenaj kanaletleri uygulandı." },
  { ornek: true, baslik: "Restoran Bahçesi", yer: "Beylikdüzü", yil: 2024, tur: "Ticari & Sanayi",
    urunler: ["Eskitme Küp Parke"], metraj: "620 m²", desen: "cobble", renk: "Kahverengi",
    ozet: "Rustik konsepte uygun eskitme küp parke ile oturma alanları ve yürüyüş yolları oluşturuldu." },
  { ornek: true, baslik: "Teras ve Balkon Yenileme", yer: "Esenyurt", yil: 2024, tur: "Villa & Bahçe",
    urunler: ["Ahşap Görünümlü Dış Mekan Seramik"], metraj: "150 m²", desen: "wood", renk: "Meşe",
    ozet: "Çürüyen ahşap deck kaldırılarak ahşap görünümlü 20 mm seramik ile bakım gerektirmeyen teras yapıldı." },
  { ornek: true, baslik: "Park ve Yürüyüş Yolu", yer: "Çatalca", yil: 2023, tur: "Kamu & Belediye",
    urunler: ["Altıgen Parke", "Hissedilebilir Yüzey (Engelli Yolu)", "Bahçe Bordürü"], metraj: "2.800 m²", desen: "hexagon", renk: "Antrasit",
    ozet: "Mahalle parkının yürüyüş yolları altıgen parke ve engelli kılavuz yüzeyiyle düzenlendi." },
  { ornek: true, baslik: "Müstakil Ev Otoparkı", yer: "Kumburgaz", yil: 2023, tur: "Villa & Bahçe",
    urunler: ["Çim Taşı (Delikli Parke)"], metraj: "90 m²", desen: "grass", renk: "Gri",
    ozet: "Bahçenin yeşil dokusunu bozmadan iki araçlık çim taşlı otopark yapıldı." },
  { ornek: true, baslik: "Tarihi Sokak Düzenlemesi", yer: "Büyükçekmece", yil: 2023, tur: "Kamu & Belediye",
    urunler: ["Andezit Küp Taş"], metraj: "1.100 m²", desen: "cobble", renk: "Andezit",
    ozet: "Sokak dokusuna uygun andezit küp taş ile Arnavut kaldırımı uygulaması." }
];

// Müşteri yorumları — gerçek yorumlarla değiştirin (Google yorumlarınızdan alabilirsiniz)
window.YORUMLAR = [
  { ornek: true, isim: "Müşteri Adı", rol: "Site Yöneticisi", metin: "Buraya gerçek bir müşteri yorumu gelecek. Google Haritalar'daki yorumlarınızdan izin alarak ekleyebilirsiniz." },
  { ornek: true, isim: "Müşteri Adı", rol: "Villa Sahibi", metin: "Buraya gerçek bir müşteri yorumu gelecek. Kısa, samimi ve somut (ürün, süre, hizmet) yorumlar en etkili olanlardır." },
  { ornek: true, isim: "Müşteri Adı", rol: "Müteahhit", metin: "Buraya gerçek bir müşteri yorumu gelecek. Kurumsal müşterilerden alınan referanslar güveni artırır." }
];

window.SSS = [
  { s: "Fiyatlarınızı sitede neden göremiyorum?", c: "Parke ve seramik fiyatları kalınlık, renk, miktar ve teslimat mesafesine göre değişir. Teklif listenize ürünleri ekleyip gönderdiğinizde size en güncel fiyatı aynı gün iletiyoruz." },
  { s: "Teslimat yapıyor musunuz?", c: "Evet. İstanbul ve çevre illere kendi araçlarımızla, palet halinde teslimat yapıyoruz. Vinçli araç ihtiyacı varsa sipariş sırasında belirtmeniz yeterli." },
  { s: "Döşeme / uygulama hizmeti veriyor musunuz?", c: "Ürün satışının yanında, anlaşmalı uygulama ekiplerimizle zemin hazırlığı, döşeme ve bordür montajı hizmeti sunuyoruz. Keşif için bizimle iletişime geçin." },
  { s: "Kaç m² malzeme almam gerekiyor?", c: "Sitedeki hesaplayıcı ile alanınızı girerek fire payı dahil ihtiyacınızı hesaplayabilirsiniz. Genel kural olarak düz alanlarda %5, kesimi çok olan alanlarda %10 fire eklenir." },
  { s: "Araç trafiği olan alanda kaç cm parke kullanmalıyım?", c: "Yaya alanlarında 6 cm yeterlidir. Binek araç trafiğinde 8 cm, kamyon ve tır geçen sanayi alanlarında 8–10 cm dalga parke öneriyoruz." },
  { s: "Mağazanızı ziyaret edip ürünleri görebilir miyim?", c: "Elbette. E-5 üzerindeki satış alanımızda ürünleri yerinde inceleyebilir, renk ve dokuları karşılaştırabilirsiniz." }
];
