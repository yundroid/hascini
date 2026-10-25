/*
 * HAS ÇİNİ — SİTE AYARLARI
 * ------------------------------------------------------------------
 * İşletmeye ait tüm iletişim bilgileri bu dosyadan yönetilir.
 * Değeri değiştirdiğinizde sitedeki tüm sayfalar otomatik güncellenir.
 * "TODO" ile işaretli alanlar gerçek bilgilerle değiştirilmelidir.
 */
window.SITE = {
  firma: "Has Çini",
  unvan: "Has Çini Yapı Malzemeleri", // TODO: resmi ticari unvan
  slogan: "Kaldırımdan bahçeye, dış mekanın her metrekaresi",

  // Telefon: ekranda görünen biçim ve arama için kullanılan biçim
  telefon: "0532 513 21 22",
  telefonLink: "+905325132122",     // boşluksuz, +90 ile
  gsm: "0532 513 21 22",
  // WhatsApp numarası: ülke kodu ile, başında + olmadan
  whatsapp: "905325132122",
  eposta: "34hascini@gmail.com",

  adres: "Mimarsinan Mh, E-5 Karayolu No:34, 34535 Büyükçekmece / İstanbul",
  // Konum: 41.01790358508834, 28.560796890412625
  haritaEmbed: "https://www.google.com/maps?q=41.01790358508834,28.560796890412625&hl=tr&z=17&output=embed",
  haritaLink: "https://www.google.com/maps/search/?api=1&query=41.01790358508834,28.560796890412625",

  calismaSaatleri: [
    ["Her gün", "09:00 – 21:00"]
  ],

  // Rakamlar (ana sayfadaki sayaçlar) — gerçek değerlerle güncelleyin
  rakamlar: [
    { deger: 20, ek: "+", etiket: "Yıllık tecrübe" },         // TODO
    { deger: 1500, ek: "+", etiket: "Tamamlanan proje" },      // TODO
    { deger: 250, ek: "+", etiket: "Ürün çeşidi" },           // TODO
    { deger: 100, ek: "%", etiket: "Zamanında teslimat hedefi" }
  ],

  sosyal: {
    instagram: "", // örn. "https://instagram.com/hascini"
    facebook: "",
    youtube: ""
  }
};
