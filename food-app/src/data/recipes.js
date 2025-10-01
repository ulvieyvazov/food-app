// src/data/recipes.js

export const recipes = [
  {
    id: 1,
    name: "Mercimek Çorbası",
    category: "Çorbalar",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
    time: "30 dk",
    servings: 4,
    ingredients: [
      "1 su bardağı kırmızı mercimek",
      "1 adet soğan",
      "2 yemek kaşığı un",
      "1 yemek kaşığı salça",
      "Tuz, karabiber",
      "Zeytinyağı"
    ],
    instructions: [
      "Mercimeği yıkayıp tencereye alın, üzerine su ekleyin.",
      "Soğanı kavurun, salça ve unu ekleyin.",
      "Mercimek yumuşayınca blenderdan geçirin.",
      "Kavurduğunuz soğanları ekleyin ve kaynatın.",
      "Sıcak servis yapın."
    ],
    comments: [
      { user: "Ayşe", text: "Çok lezzetli oldu, teşekkürler!" },
      { user: "Mehmet", text: "Tarife uydum, harika bir çorba çıktı." }
    ]
  },
  {
    id: 2,
    name: "İmam Bayıldı",
    category: "Ana Yemekler",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500",
    time: "60 dk",
    servings: 6,
    ingredients: [
      "6 adet patlıcan",
      "4 adet domates",
      "3 adet soğan",
      "4 diş sarımsak",
      "Zeytinyağı",
      "Tuz, şeker"
    ],
    instructions: [
      "Patlıcanları soyun ve tuzlu suda bekletin.",
      "Soğan ve sarımsağı doğrayın, kavurun.",
      "Domatesleri rendeleyin ve ekleyin.",
      "Patlıcanları kızartın ve içine harcı doldurun.",
      "Fırında 40 dakika pişirin."
    ],
    comments: [
      { user: "Fatma", text: "Annemin yaptığı gibi oldu!" },
      { user: "Ali", text: "Fırın sıcaklığı tam kac derece olmalı?" }
    ]
  },
  {
    id: 3,
    name: "Sütlaç",
    category: "Tatlılar",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    time: "45 dk",
    servings: 8,
    ingredients: [
      "1 litre süt",
      "1 su bardağı pirinç",
      "1 su bardağı şeker",
      "1 paket vanilya",
      "Tarçın (üzeri için)"
    ],
    instructions: [
      "Pirinci haşlayın ve süzün.",
      "Sütü kaynatın, pirinci ekleyin.",
      "Şeker ve vanilyayı ekleyin, kıvam alana kadar karıştırın.",
      "Kaselere paylaştırın.",
      "Üzerine tarçın serpin ve fırında kızartın."
    ],
    comments: [
      { user: "Zeynep", text: "Tam kıvamında oldu!" },
      { user: "Can", text: "Tarçınsız da yapılabilir mi?" }
    ]
  },
  {
    id: 4,
    name: "Limonata",
    category: "İçecekler",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f?w=500",
    time: "10 dk",
    servings: 4,
    ingredients: [
      "4 adet limon",
      "1 litre su",
      "6 yemek kaşığı şeker",
      "Nane yaprakları",
      "Buz"
    ],
    instructions: [
      "Limonları sıkın.",
      "Suya limon suyunu ve şekeri ekleyin, karıştırın.",
      "Nane yapraklarını ekleyin.",
      "Buzla servis yapın."
    ],
    comments: [
      { user: "Elif", text: "Çok serinletici!" },
      { user: "Burak", text: "Yaz günleri için ideal." }
    ]
  },
  {
    id: 5,
    name: "Mantı",
    category: "Ana Yemekler",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500",
    time: "90 dk",
    servings: 4,
    ingredients: [
      "500 gr kıyma",
      "2 su bardağı un",
      "1 yumurta",
      "Yoğurt",
      "Sarımsak",
      "Tereyağı"
    ],
    instructions: [
      "Hamuru yoğurun ve dinlendirin.",
      "İnce açın ve kareler kesin.",
      "İçine kıyma koyup kapatın.",
      "Haşlayın ve süzün.",
      "Yoğurt ve sarımsaklı sos ile servis edin."
    ],
    comments: [
      { user: "Selin", text: "El emeği göz nuru!" },
      { user: "Kemal", text: "Çok güzel oldu ama yorucu :)" }
    ]
  },
  {
    id: 6,
    name: "Baklava",
    category: "Tatlılar",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500",
    time: "120 dk",
    servings: 12,
    ingredients: [
      "1 paket baklavalık yufka",
      "200 gr tereyağı",
      "2 su bardağı ceviz",
      "3 su bardağı şeker",
      "2 su bardağı su"
    ],
    instructions: [
      "Yufkaları yağlayarak tepsiye dizin.",
      "Cevizi serpin ve katlamaya devam edin.",
      "Kesip fırında pişirin.",
      "Şerbetini hazırlayın.",
      "Sıcakken şerbet dökün."
    ],
    comments: [
      { user: "Hülya", text: "Bayram günü yaptım, harika oldu!" },
      { user: "Oğuz", text: "Şerbet miktarını azaltabilir miyim?" }
    ]
  }
];

export const categories = ["Çorbalar", "Ana Yemekler", "Tatlılar", "İçecekler"];