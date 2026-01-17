# 🚀 AVYNA - Canlıya Alma Rehberi

## ✅ Build Hazır!

Production build başarıyla oluşturuldu. Tüm dosyalar `dist` klasöründe hazır.

**Build Tarihi:** 12 Ocak 2026, 00:27

---

## 📦 Dist Klasörü İçeriği

```
dist/
├── .htaccess          ✅ (URL yönlendirme için)
├── index.html         ✅ (Ana sayfa)
├── favicon.ico        ✅ (Site ikonu)
├── assets/            ✅ (JS ve CSS dosyaları)
├── images/            ✅ (Genel görseller)
├── videos/            ✅ (Video dosyaları)
└── y1/                ✅ (11 ürün klasörü - tüm görseller)
    ├── Bhusra/
    ├── Denise/
    ├── Floki/
    ├── Gudrun/
    ├── Harpy/
    ├── Lich/
    ├── Napper/
    ├── Pergamon/
    ├── Smile/
    ├── Storm/
    └── Thor/
```

---

## 🌐 Hostinger'a Yükleme Adımları

### Yöntem 1: cPanel File Manager (Önerilen)

1. **cPanel'e Giriş Yap**
   - https://hostinger.com/cpanel adresine git
   - Kullanıcı adı ve şifrenle giriş yap

2. **File Manager'ı Aç**
   - cPanel ana sayfasında "File Manager" butonuna tıkla

3. **public_html Klasörüne Git**
   - Sol menüden `public_html` klasörünü seç
   - Bu klasör sitenin ana dizinidir

4. **Mevcut Dosyaları Yedekle (Opsiyonel)**
   - Tüm dosyaları seç
   - "Compress" butonuna tıkla
   - `backup_$(date).zip` olarak kaydet

5. **Eski Dosyaları Sil**
   - `public_html` içindeki TÜM dosyaları seç
   - "Delete" butonuna tıkla
   - ⚠️ **DİKKAT:** `.env` veya `.htaccess` gibi gizli dosyalar varsa onları da sil

6. **Yeni Dosyaları Yükle**
   - "Upload" butonuna tıkla
   - `d:\acursor\avyna\dist` klasöründeki **TÜM** dosyaları sürükle-bırak
   - Yükleme tamamlanana kadar bekle

7. **Dosyaları Çıkar (Eğer ZIP Yüklediysen)**
   - Yüklenen ZIP dosyasına sağ tıkla
   - "Extract" seç
   - Çıkarma tamamlandıktan sonra ZIP dosyasını sil

8. **Dosya İzinlerini Kontrol Et**
   - Tüm klasörler: `755`
   - Tüm dosyalar: `644`

### Yöntem 2: FTP (FileZilla)

1. **FileZilla'yı Aç**
   - Host: `ftp.avynafurniture.com` (veya Hostinger'dan aldığın FTP adresi)
   - Username: FTP kullanıcı adın
   - Password: FTP şifren
   - Port: `21`

2. **Bağlan**
   - "Quickconnect" butonuna tıkla

3. **Dosyaları Yükle**
   - Sol panel: `d:\acursor\avyna\dist`
   - Sağ panel: `/public_html`
   - Tüm dosyaları sürükle-bırak

---

## 🔍 Deployment Sonrası Kontrol

### 1. Site Erişimi
```
✅ https://avynafurniture.com/
✅ https://www.avynafurniture.com/
```

### 2. Ürünler Kontrolü
- Ana sayfada **11 ürün** görünmeli
- Her ürünün görselleri yüklenmeli
- Fiyatlar doğru görünmeli

### 3. Supabase Bağlantısı
- Browser Console'u aç (F12)
- **401 Unauthorized** hatası OLMAMALI
- Ürünler Supabase'den gelmeli

### 4. Fonksiyonalite Testi
- [ ] Ana sayfa yükleniyor
- [ ] Ürünler görünüyor (11 adet)
- [ ] Ürün detay sayfası açılıyor
- [ ] Sepete ekleme çalışıyor
- [ ] Admin paneli açılıyor
- [ ] Deneme Odası çalışıyor
- [ ] Mobil responsive

---

## 🐛 Sorun Giderme

### Ürünler Görünmüyor
**Sebep:** Supabase API anahtarı build'e dahil edilmemiş olabilir.

**Çözüm:**
1. `.env.local` dosyasının doğru olduğundan emin ol
2. `npm run build` komutunu tekrar çalıştır
3. Yeni build'i yükle

### 401 Unauthorized Hatası
**Sebep:** Supabase API anahtarı geçersiz.

**Çözüm:**
1. https://supabase.com/dashboard/project/mdxsasiabwronqkegkuo/settings/api
2. Yeni anon key al
3. `.env.local` dosyasını güncelle
4. Rebuild yap

### Görseller Yüklenmiyor
**Sebep:** `y1` klasörü yüklenmemiş.

**Çözüm:**
1. `dist/y1` klasörünün var olduğunu kontrol et
2. Yoksa: `Copy-Item -Path "y1" -Destination "dist\y1" -Recurse -Force`
3. Tekrar yükle

### 404 Hatası (Sayfa Bulunamadı)
**Sebep:** `.htaccess` dosyası yok.

**Çözüm:**
1. `dist/.htaccess` dosyasının var olduğunu kontrol et
2. Yoksa: `Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force`
3. Tekrar yükle

---

## 📊 Supabase Ürün Durumu

**Toplam Ürün:** 11 (y1 klasöründen)

| Ürün Adı   | Fiyat    | Görsel Sayısı | Kategori |
|------------|----------|---------------|----------|
| Bhusra     | 24.500₺  | 18            | Koltuk   |
| Denise     | 22.800₺  | -             | Koltuk   |
| Floki      | 26.900₺  | 6             | Koltuk   |
| Gudrun     | 23.500₺  | -             | Koltuk   |
| Harpy      | 25.200₺  | -             | Koltuk   |
| Lich       | 21.900₺  | -             | Koltuk   |
| Napper     | 27.500₺  | -             | Koltuk   |
| Pergamon   | 28.900₺  | -             | Koltuk   |
| Smile      | 24.200₺  | -             | Koltuk   |
| Storm      | 26.500₺  | -             | Koltuk   |
| Thor       | 29.900₺  | 6             | Koltuk   |

---

## 🎯 Hızlı Komutlar

```powershell
# Build oluştur
npm run build

# y1 klasörünü kopyala
Copy-Item -Path "y1" -Destination "dist\y1" -Recurse -Force

# .htaccess kopyala
Copy-Item -Path ".htaccess" -Destination "dist\.htaccess" -Force

# Dist klasörünü kontrol et
Get-ChildItem -Path "dist" -Recurse | Measure-Object
```

---

## ✅ Deployment Checklist

- [x] Production build oluşturuldu
- [x] y1 klasörü dist'e kopyalandı
- [x] .htaccess dosyası dist'e kopyalandı
- [x] Supabase'e 11 ürün yüklendi
- [ ] Dosyalar Hostinger'a yüklendi
- [ ] Site kontrolü yapıldı
- [ ] Tüm fonksiyonlar test edildi

---

## 🎉 Başarıyla Tamamlandı!

Artık `dist` klasöründeki tüm dosyaları Hostinger'a yükleyebilirsin.

**Canlı URL:** https://avynafurniture.com/

**Destek:** Sorun yaşarsan browser console'u kontrol et ve hata mesajlarını paylaş.

---

**Son Güncelleme:** 12 Ocak 2026, 00:27
