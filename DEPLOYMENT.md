# 🚀 AVYNA - Deployment Rehberi

## 📦 Production Build Hazır!

Build başarıyla tamamlandı. Tüm dosyalar `dist` klasöründe hazır.

---

## 🌐 Canlıya Alma Adımları

### 1️⃣ **Frontend Deployment (Hostinger / cPanel)**

#### Dosyaları Yükle:
1. **`dist`** klasörünün içindeki TÜM dosyaları sunucuya yükle
2. Hedef klasör: `public_html` veya `www`

#### Yüklenecek Dosyalar:
```
dist/
├── index.html
├── .htaccess
├── favicon.ico
├── assets/
│   ├── index-*.js
│   └── index-*.css
├── images/
├── videos/
└── y1/ (Ürün görselleri)
```

#### cPanel File Manager ile:
1. cPanel'e giriş yap
2. File Manager'ı aç
3. `public_html` klasörüne git
4. Mevcut dosyaları sil (varsa)
5. `dist` klasöründeki dosyaları yükle
6. `.htaccess` dosyasının yüklendiğinden emin ol

---

### 2️⃣ **Backend Deployment**

#### Seçenek A: Aynı Sunucuda (Hostinger)
```bash
# SSH ile bağlan
ssh kullanici@sunucu-ip

# Proje klasörüne git
cd /home/kullanici/avyna

# Backend dosyalarını yükle
# server/ klasörünü FTP ile yükle

# Node.js kurulu mu kontrol et
node --version
npm --version

# Bağımlılıkları yükle
cd server
npm install

# PM2 ile başlat
npm install -g pm2
pm2 start index.js --name avyna-backend
pm2 save
pm2 startup
```

#### Seçenek B: Vercel/Railway (Önerilen)
1. GitHub'a push yap
2. Vercel/Railway'e bağla
3. Environment variables ekle:
   - `PORT=5000`
   - `VITE_GEMINI_API_KEY=your_key`

---

### 3️⃣ **Environment Variables**

#### Frontend (.env)
```env
VITE_API_URL=https://api.avyna.com
VITE_GEMINI_API_KEY=your_gemini_key
```

#### Backend (.env)
```env
PORT=5000
VITE_GEMINI_API_KEY=your_gemini_key
```

---

### 4️⃣ **Database Setup**

Backend SQLite kullanıyor, otomatik oluşturulacak.

Ürünleri yüklemek için:
```bash
cd server
node seed_y1_products.js
```

---

### 5️⃣ **Domain Ayarları**

#### DNS Kayıtları:
```
A Record:  @  →  Sunucu IP
CNAME:     www  →  domain.com
```

#### SSL Sertifikası:
- Hostinger: Let's Encrypt (Otomatik)
- cPanel: SSL/TLS Manager'dan aktifleştir

---

### 6️⃣ **Test Checklist**

- [ ] Ana sayfa yükleniyor
- [ ] Ürünler görünüyor (y1 görselleri)
- [ ] Ürün detay sayfası çalışıyor
- [ ] Video oynatıcı çalışıyor
- [ ] Deneme Odası çalışıyor
- [ ] Kamera erişimi çalışıyor
- [ ] Sepete ekleme çalışıyor
- [ ] Admin paneli çalışıyor
- [ ] Backend API çalışıyor
- [ ] Mobil responsive

---

## 🔧 Sorun Giderme

### Görseller Görünmüyor:
- `y1` klasörünün yüklendiğini kontrol et
- Dosya izinlerini kontrol et (755)

### API Çalışmıyor:
- Backend'in çalıştığını kontrol et
- CORS ayarlarını kontrol et
- Environment variables'ı kontrol et

### 404 Hatası:
- `.htaccess` dosyasının yüklendiğini kontrol et
- mod_rewrite aktif mi kontrol et

---

## 📊 Performans Optimizasyonu

### Yapıldı:
- ✅ Vite production build
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Lazy loading

### Öneriler:
- CDN kullan (Cloudflare)
- Gzip compression aktif et
- Browser caching ayarla

---

## 🎯 Deployment Komutları

### Hızlı Deployment:
```bash
# Build
npm run build

# .htaccess kopyala
Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force

# y1 kopyala
Copy-Item -Path "y1" -Destination "dist\y1" -Recurse -Force

# FTP ile yükle veya
# Git push (Vercel/Netlify için)
```

---

## 🌟 Canlı URL'ler

**Frontend:** https://avyna.com  
**Backend API:** https://api.avyna.com  
**Admin Panel:** https://avyna.com (Alt menüden Yönetim)

---

## 📞 Destek

Sorun yaşarsan:
1. Browser console'u kontrol et
2. Network tab'ı kontrol et
3. Backend loglarını kontrol et

**Başarılar! 🚀**
