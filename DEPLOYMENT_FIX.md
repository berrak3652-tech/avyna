# 🚨 AVYNA - Canlıya Alma Acil Düzeltme

## Sorun: Ürünler Görünmüyor (401 Unauthorized)

**Neden:** Production build'de yanlış/eski Supabase API anahtarı kullanılmış.

---

## ✅ Çözüm Adımları

### 1️⃣ Supabase API Anahtarını Al

1. Supabase Dashboard'a git: https://supabase.com/dashboard
2. Projeyi seç: `mdxsasiabwronqkegkuo`
3. **Settings** → **API** menüsüne git
4. Şu bilgileri kopyala:
   - **Project URL**: `https://mdxsasiabwronqkegkuo.supabase.co`
   - **anon/public key**: `eyJ...` ile başlayan uzun anahtar

### 2️⃣ Lokal .env.local Dosyasını Güncelle

`.env.local` dosyasını oluştur/güncelle (proje ana dizininde):

```env
# Supabase Config
VITE_SUPABASE_URL=https://mdxsasiabwronqkegkuo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MjY4MzEsImV4cCI6MjA1MjIwMjgzMX0.YOUR_ACTUAL_KEY_HERE

# OpenRouter API Key (AI özellikler için)
VITE_OPENROUTER_API_KEY=your_openrouter_key_here
```

⚠️ **ÖNEMLİ**: `YOUR_ACTUAL_KEY_HERE` kısmını Supabase'den aldığın gerçek anahtarla değiştir!

### 3️⃣ Lokal Test

```bash
# Bağımlılıkları yükle (ilk kez yapıyorsan)
npm install

# Development modda test et
npm run dev
```

Tarayıcıda `http://localhost:5173` aç ve ürünlerin göründüğünü kontrol et.

### 4️⃣ Production Build

```bash
# Build oluştur
npm run build

# Build'i test et (opsiyonel)
npm run preview
```

### 5️⃣ Hostinger'a Deploy

#### A. cPanel File Manager ile:

1. **cPanel**'e giriş yap
2. **File Manager**'ı aç
3. `public_html` klasörüne git
4. Mevcut dosyaları **SİL** (veya yedekle)
5. `dist` klasöründeki **TÜM** dosyaları yükle:
   ```
   dist/
   ├── index.html
   ├── .htaccess
   ├── assets/
   ├── images/
   ├── videos/
   └── y1/
   ```

#### B. FTP ile:

```bash
# FileZilla veya WinSCP kullan
# Hedef: public_html/
# Kaynak: dist/ klasörünün içindeki tüm dosyalar
```

### 6️⃣ Doğrulama

1. https://avynafurniture.com/ aç
2. **F12** → **Console** aç
3. Hata olmamalı (401 hatası gitmeli)
4. Ürünler görünmeli

---

## 🔍 Sorun Devam Ederse

### Console'da Hata Kontrolü:

```javascript
// Browser console'da çalıştır:
fetch('https://mdxsasiabwronqkegkuo.supabase.co/rest/v1/products?select=*', {
  headers: {
    'apikey': 'YOUR_ANON_KEY',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### Supabase RLS (Row Level Security) Kontrolü:

1. Supabase Dashboard → **Table Editor** → `products`
2. **RLS** kapalı olmalı veya public read izni olmalı:

```sql
-- RLS'yi kapat (test için)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- VEYA public read izni ver
CREATE POLICY "Public read access" ON products
FOR SELECT USING (true);
```

---

## 📋 Checklist

- [ ] Supabase API anahtarını aldım
- [ ] `.env.local` dosyasını güncelledim
- [ ] Lokal test yaptım (ürünler görünüyor)
- [ ] Production build oluşturdum (`npm run build`)
- [ ] `dist` klasörünü Hostinger'a yükledim
- [ ] Canlı sitede ürünler görünüyor
- [ ] Console'da hata yok

---

## 🎯 Hızlı Komutlar

```bash
# Tek seferde build + test
npm run build && npm run preview

# Build klasörünü temizle ve yeniden oluştur
Remove-Item -Recurse -Force dist
npm run build
```

---

## 📞 Yardım

Sorun devam ederse:
1. Browser console screenshot'ı al
2. Network tab'da failed requests'leri kontrol et
3. `.env.local` dosyasının doğru olduğundan emin ol

**Başarılar! 🚀**
