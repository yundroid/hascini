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
  telefon: "0212 000 00 00",        // TODO
  telefonLink: "+902120000000",     // TODO (boşluksuz, +90 ile)
  gsm: "0532 000 00 00",            // TODO
  // WhatsApp numarası: ülke kodu ile, başında + olmadan
  whatsapp: "905320000000",         // TODO
  eposta: "info@hascini.com",       // TODO

  adres: "E-5 Karayolu üzeri, Büyükçekmece / İstanbul", // TODO: mahalle, cadde, no
  // Google Haritalar'da işletmeyi bulup "Paylaş > Harita yerleştir" ile alınan src adresi
  haritaEmbed: "https://www.google.com/maps?q=B%C3%BCy%C3%BCk%C3%A7ekmece%20E-5&output=embed", // TODO
  haritaLink: "https://maps.google.com/?q=Has+%C3%87ini+B%C3%BCy%C3%BCk%C3%A7ekmece", // TODO

  calismaSaatleri: [
    ["Pazartesi – Cumartesi", "08:00 – 19:00"], // TODO
    ["Pazar", "Kapalı"]
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
