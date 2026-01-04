# Avyna Furniture - Premium 3D & AI Experience

Avyna Furniture, modern teknolojiyi lüks iç mekan tasarımıyla birleştiren, yapay zeka destekli bir e-ticaret ve dekorasyon platformudur.

## 🚀 Özellikler

- **AI Stil Danışmanı:** Gemini 3 Flash modelini kullanarak oda fotoğraflarınızı analiz eder ve size özel mobilya tavsiyeleri sunar.
- **3D & AR Görselleştirme:** Google `model-viewer` entegrasyonu ile ürünleri 3D olarak inceleyebilir ve Artırılmış Gerçeklik (AR) ile evinizde nasıl duracağını görebilirsiniz.
- **AI Ürün Açıklamaları:** Admin panelinde ürün isimlerinden otomatik olarak lüks ve ikna edici pazarlama metinleri oluşturur.
- **Dinamik Katalog:** Siyah-beyaz estetik, turuncu çerçeveler ve hover efektleri ile zenginleştirilmiş premium kullanıcı arayüzü.
- **Admin Paneli:** Stok yönetimi, ürün ekleme/silme ve AI içerik üretimi için gelişmiş yönetim arayüzü.

## 🛠 Teknolojiler

- **Frontend:** React, TypeScript, Tailwind CSS
- **Yapay Zeka:** Google Gemini API (@google/genai)
- **3D/AR:** Google Model-Viewer
- **İkonlar:** Lucide React
- **Veri:** LocalStorage tabanlı persistency (Firebase entegrasyonuna hazır yapı)

## 📦 Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/hakan353536/avyna.git
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. `.env` dosyanızı oluşturun ve Gemini API anahtarınızı ekleyin:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## 🎨 Tasarım Dili

Uygulama, "Lüks Minimalizm" konsepti üzerine kurulmuştur. Siyah-beyaz renk paleti, canlı turuncu (`#ea580c`) vurgularla birleşerek modern bir kontrast oluşturur. Ürün görselleri varsayılan olarak siyah-beyazdır ve kullanıcı etkileşimiyle (hover) renkli hale gelerek odak noktası oluşturur.

---

*Bu proje Google AI Studio ve modern web teknolojileri ile geliştirilmiştir.*