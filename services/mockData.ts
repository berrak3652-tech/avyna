
import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Floki Berjer',
    price: 18500,
    description: 'Floki Berjer, modern çizgileri ve spor duruşuyla yaşam alanlarınıza hem estetik hem de fonksiyonellik kazandırmak üzere tasarlandı. Oturma odasından çocuk odasına, ofisten bekleme salonlarına kadar pek çok farklı mekânda rahatlıkla kullanılabilen çok yönlü bir berjer modelidir.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Floki/DSC00241.jpg',
      '/y1/Floki/DSC00242.jpg',
      '/y1/Floki/DSC00243.jpg',
      '/y1/Floki/DSC00244.jpg',
      '/y1/Floki/DSC00245.jpg',
      '/y1/Floki/DSC00246.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 92, height: 92, depth: 78 },
    features: [
      'Modern, dekoratif ve spor tasarım',
      'Çok amaçlı kullanım (ev, ofis, yazlık vb.)',
      '1. sınıf sünger ile yumuşak ve ergonomik oturum',
      'Uzun ömürlü, yüksek kaliteli kumaş',
      'Kalın ve sağlam metal iskelet',
      'Fermuarlı oturum minderi ile yer minderi kullanımı',
      'Kolay kurulum – ustalık gerektirmez'
    ],
    stock: 5
  },

  {
    id: '2',
    name: 'Thor 360° Döner Berjer',
    price: 16800,
    description: 'Thor 360° döner tekli koltuk / berjer, geniş oturma alanı, sağlam çelik profil yapısı ve modern tasarımıyla yaşam alanlarında fark yaratır. Tam 360 derece dönebilen mekanizması sayesinde maksimum hareket özgürlüğü sunar.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Thor/DSC00247.jpg',
      '/y1/Thor/DSC00248.jpg',
      '/y1/Thor/DSC00249.jpg',
      '/y1/Thor/DSC00250.jpg',
      '/y1/Thor/DSC00251.jpg',
      '/y1/Thor/DSC00252.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 100, height: 90, depth: 100 },
    features: [
      '360° dönebilen mekanizma',
      'Geniş ve ergonomik oturma alanı',
      '21 mm x 1 mm dayanıklı çelik profil iskelet',
      'Statik tekstüre siyah boyalı metal aksam',
      'Kaliteli kırpıntı sünger ile konforlu oturum',
      'Silinebilir, uzun ömürlü dokuma kumaş',
      'Modern, dekoratif ve güçlü tasarım'
    ],
    stock: 8
  },
  {
    id: '3',
    name: 'Bhsura İkili Yataklı Koltuk',
    price: 14200,
    description: 'Bhsura İkili Yataklı Koltuk, modern tasarımı ve çok fonksiyonlu yapısıyla yaşam alanlarını akıllı çözümlerle buluşturur. Gündüz konforlu bir ikili koltuk, ihtiyaç duyulduğunda ise pratik bir yatak olarak kullanılabilir.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Bhusra/DSC00127.jpg',
      '/y1/Bhusra/DSC00129.jpg',
      '/y1/Bhusra/DSC00130.jpg',
      '/y1/Bhusra/DSC00131.jpg',
      '/y1/Bhusra/DSC00132.jpg',
      '/y1/Bhusra/DSC00133.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 150, height: 70, depth: 60 },
    features: [
      'İkili koltuk + yatak fonksiyonu',
      'Modern ve şık tasarım',
      'Birinci sınıf dayanıklı metal profil iskelet',
      'Kademeli ve katlanma mekanizmalı yapı',
      'Esneme, gıcırdama ve sallanma yapmaz',
      'Kaliteli kırpıntı sünger dolgu',
      'Kolay temizlenebilir, silinebilir kumaş'
    ],
    stock: 6
  },
  {
    id: '4',
    name: 'Denise Koltuk',
    price: 15900,
    description: 'Şık ve rahat tasarımıyla Denise, modern yaşam tarzınıza mükemmel uyum sağlar.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Denise/IMG-20250617-WA0018.jpg',
      '/y1/Denise/IMG-20250617-WA0019.jpg',
      '/y1/Denise/IMG-20250617-WA0020.jpg',
      '/y1/Denise/IMG-20250617-WA0021.jpg',
      '/y1/Denise/IMG-20250617-WA0022.jpg',
      '/y1/Denise/IMG-20250617-WA0023.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 195, height: 82, depth: 88 },
    stock: 10
  },
  {
    id: '5',
    name: 'Gudrun Koltuk',
    price: 13500,
    description: 'Zarif ve fonksiyonel. Gudrun koltuğu ile konfor ve estetiği bir arada yaşayın.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Gudrun/DSC00280.jpg',
      '/y1/Gudrun/DSC00281.jpg',
      '/y1/Gudrun/DSC00282.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 185, height: 80, depth: 85 },
    stock: 7
  },
  {
    id: '6',
    name: 'Harpy Sallanır Sandalye',
    price: 17200,
    description: 'Harpy Sallanır Sandalye, konforu, sağlamlığı ve ergonomiyi tek bir tasarımda buluşturur. 250 kg taşıma kapasitesi ve devrilmez dengeli formuyla üst segment bir sallanır sandalye deneyimi sunar.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Harpy/DSC00092.jpg',
      '/y1/Harpy/DSC00094.jpg',
      '/y1/Harpy/DSC00095.jpg',
      '/y1/Harpy/DSC00099.jpg',
      '/y1/Harpy/DSC00101.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 60, height: 87, depth: 110 },
    features: [
      '%100 yerli üretim',
      'Ergonomik ve konforlu oturum yapısı',
      'Tamamı metal profil iskelet',
      '250 kg taşıma kapasitesi',
      'Devrilmez, dengeli ve güvenli tasarım',
      'Fermuarlı ve yıkanabilir kol kumaşları',
      'Kolay kurulum – ustalık gerektirmez'
    ],
    stock: 4
  },
  {
    id: '7',
    name: 'Lich Katlanabilir Çalışma Masası',
    price: 16400,
    description: 'Lich Katlanabilir Çalışma Masası; laptop sehpası, çizim masası veya öğrenci masası olarak çok amaçlı kullanılabilir. Katlanabilir mekanizması sayesinde minimum alan kaplar ve yer tasarrufu sağlar.',
    category: 'Aksesuar',
    images: [
      '/y1/Lich/DSC00274.jpg',
      '/y1/Lich/DSC00275.jpg',
      '/y1/Lich/DSC00277.jpg',
      '/y1/Lich/DSC00278.jpg',
      '/y1/Lich/DSC00279.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 77, height: 114, depth: 63 },
    features: [
      'Çok amaçlı kullanım (Laptop, çizim, ofis)',
      'Katlanabilir tasarım ile yer tasarrufu',
      'Pratik üst raf ile düzenli çalışma alanı',
      '1 mm kalınlığında dayanıklı metal profil',
      'Şık Atlantik çam desenli yüzey',
      'Ev, ofis ve çalışma alanları için ideal',
      'Kolay temizlenebilir yüzey'
    ],
    stock: 9
  },
  {
    id: '8',
    name: 'Napper Katlanabilir Şezlong',
    price: 12800,
    description: 'Napper Katlanabilir Şezlong, açık alanlarda maksimum konfor ve pratik kullanım sunar. 5 kademeli ayarlanabilir mekanizması ile bahçe, balkon ve havuz kenarı için ideal bir çözümdür.',
    category: 'Aksesuar',
    images: [
      '/y1/Napper/DSC00056.jpg',
      '/y1/Napper/DSC00057.jpg',
      '/y1/Napper/DSC00058.jpg',
      '/y1/Napper/DSC00059.jpg',
      '/y1/Napper/DSC00061.jpg',
      '/y1/Napper/DSC00062.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 55, height: 100, depth: 90 },
    features: [
      '5 kademeli ayarlanabilir sırt yapısı',
      'Katlanabilir ve hafif tasarım',
      'Kolay taşıma ve depolama',
      'Su ve kir tutmayan dış mekân kumaşı',
      'Ergonomik sünger dolgulu oturum',
      'Dayanıklı metal profil iskelet',
      'Kurulu gönderim – montaj gerektirmez'
    ],
    stock: 11
  },
  {
    id: '9',
    name: 'Pergamon Koltuk',
    price: 19500,
    description: 'Premium kalite ve zarif tasarım. Pergamon ile lüksü yaşam alanınıza taşıyın.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Pergamon/DSC00163.jpg',
      '/y1/Pergamon/DSC00166.jpg',
      '/y1/Pergamon/DSC00167.jpg',
      '/y1/Pergamon/DSC00168.jpg',
      '/y1/Pergamon/DSC00169.jpg',
      '/y1/Pergamon/DSC00170.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 230, height: 92, depth: 98 },
    stock: 3
  },
  {
    id: '10',
    name: 'Smile Koltuk',
    price: 11900,
    description: 'Neşeli ve konforlu. Smile koltuğu ile evinize pozitif enerji katın.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Smile/1 (1).jpg',
      '/y1/Smile/1 (2).jpg',
      '/y1/Smile/1 (3).jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 180, height: 75, depth: 82 },
    stock: 15
  },
  {
    id: '11',
    name: 'Storm İkili Yataklı Koltuk',
    price: 17800,
    description: 'Storm İkili Yataklı Koltuk, modern tasarımı ve akıllı katlanma mekanizmasıyla yaşam alanlarını çok yönlü çözümlerle buluşturur. 350 kg taşıma kapasitesi ile sağlam ve uzun ömürlü bir kullanım sunar.',
    category: 'Oturma Grubu',
    images: [
      '/y1/Storm/DSC00150.jpg',
      '/y1/Storm/DSC00151.jpg',
      '/y1/Storm/DSC00153.jpg',
      '/y1/Storm/DSC00154.jpg',
      '/y1/Storm/DSC00156.jpg',
      '/y1/Storm/DSC00157.jpg'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 80, height: 80, depth: 180 },
    features: [
      '%100 yerli üretim',
      '350 kg maksimum taşıma kapasitesi',
      'Dayanıklı çelik profil iskelet',
      '5 kademeli katlanma sistemi',
      'Sessiz kullanım: gıcırdama yapmaz',
      'Silinebilir kumaş ile kolay temizlik',
      'Kurulumu kolay demonte tasarım'
    ],
    stock: 6
  },
  {
    id: '12',
    name: 'Aila Ahşap Detaylı Sallanan Koltuk',
    price: 21500,
    description: 'Aila Sallanan Koltuk, doğal ahşap estetiğini modern metal gövdeyle birleştirerek yaşam alanlarınıza zamansız bir şıklık kazandırır. 1. sınıf gürgen ağacından üretilmiş ahşap detayları yüksek dayanıklılık katar.',
    category: 'Oturma Grubu',
    images: [
      '/y1/model (1).png',
      '/y1/model (6).png'
    ],
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    dimensions: { width: 65, height: 100, depth: 100 },
    features: [
      '%100 yerli üretim – AVYNA kalitesi',
      '1. sınıf gürgen ağacından ahşap detaylar',
      'Dayanıklı metal profil gövde',
      '300 kg taşıma kapasitesi',
      '28 DNS yoğunluklu sünger ile üstün konfor',
      'Devrilmez ve dengeli sallanma sistemi',
      'Kolay temizlenebilir dokuma kumaş'
    ],
    stock: 3
  }
];

