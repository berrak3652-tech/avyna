# 🎨 Image to 3D Model - n8n Workflow Rehberi

Bu rehber, fotoğraflardan 3D model oluşturmak için hazırladığım n8n workflow'larını nasıl kullanacağınızı açıklar.

---

## 📦 Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `n8n-image-to-3d-workflow.json` | Tek görsel için basit workflow |
| `n8n-batch-image-to-3d-workflow.json` | Çoklu görsel için batch workflow |
| `n8n-smart-object-to-3d-workflow.json` | **🆕 Akıllı obje seçimi ile 3D** |

---

## 🎯 YENİ: Akıllı Obje Seçimi ile 3D

Bu workflow, bir fotoğraftaki **belirli bir objeyi** metin ile seçip sadece onu 3D modele dönüştürür!

### Nasıl Çalışıyor?

```
📷 Orijinal Fotoğraf + "pink armchair" prompt
                ↓
    🔍 Grounding DINO (Obje Tespiti)
                ↓
    ✂️ SAM (Segment Anything Model)
                ↓
    🖼️ Transparan Arka Planlı Görsel
                ↓
    🎨 Meshy.ai 3D Dönüşüm
                ↓
    📦 Sadece Seçilen Objenin 3D Modeli
```

### Kullanım

**Webhook URL:**
```
POST https://your-n8n-domain.com/webhook/smart-object-to-3d
```

**Request Body:**
```json
{
  "image_url": "https://example.com/room-photo.jpg",
  "object_prompt": "pink armchair"
}
```

### Örnek Senaryolar

| Prompt | Ne Yapar |
|--------|----------|
| `"pink armchair"` | Pembe koltuğu seçer |
| `"wooden table"` | Ahşap masayı seçer |
| `"floor lamp"` | Lambayı seçer |
| `"all furniture"` | Tüm mobilyaları seçer |

### Gerekli API Keys

Bu workflow **2 ayrı API** kullanır:

1. **Replicate API** (Grounding DINO + SAM için)
   - https://replicate.com → API Token al
   - Environment: `REPLICATE_API_TOKEN`

2. **Meshy.ai API** (3D dönüşüm için)
   - https://meshy.ai → API Key al
   - Environment: `MESHY_API_KEY`

---

## 🔧 Kurulum

### 1. Meshy.ai API Key Alın

1. [Meshy.ai](https://www.meshy.ai/) adresine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard > Settings > API Keys bölümüne gidin
4. "Create API Key" butonuna tıklayın
5. API key'i kopyalayın

### 2. n8n'de Environment Variable Ekleyin

n8n ayarlarınızda şu environment variable'ı ekleyin:

```
MESHY_API_KEY=your_api_key_here
```

**Coolify kullanıyorsanız:**
1. Coolify dashboard > n8n servisi > Environment Variables
2. `MESHY_API_KEY` = `msy_xxxxxxxxxxxxxx` ekleyin
3. Servisi yeniden başlatın

### 3. Workflow'u n8n'e Import Edin

1. n8n interface'ini açın
2. Sol menüden "Workflows" seçin
3. "Import from File" seçeneğini kullanın
4. `.json` dosyasını seçin
5. "Save" butonuna tıklayın
6. "Active" toggle'ını açın

---

## 🚀 Kullanım

### Tek Görsel için (n8n-image-to-3d-workflow.json)

**Webhook URL:**
```
POST https://your-n8n-domain.com/webhook/image-to-3d
```

**Request Body:**
```json
{
  "image_url": "https://example.com/your-image.jpg"
}
```

**Örnek cURL:**
```bash
curl -X POST https://your-n8n-domain.com/webhook/image-to-3d \
  -H "Content-Type: application/json" \
  -d '{"image_url": "https://example.com/chair.jpg"}'
```

**Başarılı Response:**
```json
{
  "success": true,
  "message": "3D model created successfully!",
  "task_id": "task_abc123",
  "model_urls": {
    "glb": "https://assets.meshy.ai/.../model.glb",
    "fbx": "https://assets.meshy.ai/.../model.fbx",
    "usdz": "https://assets.meshy.ai/.../model.usdz",
    "obj": "https://assets.meshy.ai/.../model.obj"
  },
  "thumbnail": "https://assets.meshy.ai/.../thumbnail.png"
}
```

---

### Çoklu Görsel için (n8n-batch-image-to-3d-workflow.json)

**Webhook URL:**
```
POST https://your-n8n-domain.com/webhook/batch-image-to-3d
```

**Request Body:**
```json
{
  "image_urls": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "product_name": "Pink Armchair"
}
```

**Başarılı Response:**
```json
{
  "success": true,
  "all_complete": true,
  "summary": {
    "total": 3,
    "succeeded": 3,
    "processing": 0,
    "failed": 0
  },
  "models": [
    {
      "task_id": "task_abc123",
      "status": "SUCCEEDED",
      "model_urls": {
        "glb": "https://assets.meshy.ai/.../model1.glb"
      }
    }
  ],
  "still_processing": [],
  "errors": []
}
```

---

## 📸 Görsellerinizi Yükleme

Görselleriniz local'de olduğu için önce bir URL'ye yüklemeniz gerekiyor:

### Seçenek 1: Cloudflare R2 / AWS S3
```bash
# AWS CLI ile
aws s3 cp DSC00241.jpg s3://your-bucket/images/
```

### Seçenek 2: imgbb.com (Ücretsiz)
1. https://imgbb.com adresine gidin
2. Görselinizi yükleyin
3. "Direct link" URL'ini kopyalayın

### Seçenek 3: n8n File Upload Endpoint
Workflow'a bir file upload endpoint ekleyebiliriz.

---

## 🔄 Workflow Açıklaması

### Tek Görsel Workflow Akışı:

```
┌─────────────────┐
│ Webhook Trigger │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create 3D Task  │ → Meshy.ai API'ye istek gönder
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Wait 30s     │ → İşleme zamanı
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check Status   │ → Durumu kontrol et
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌────────┐
│ Ready │ │ Error  │
└───┬───┘ └────────┘
    │
    ▼
┌─────────────────┐
│ Download Model  │ → .glb dosyasını indir
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Save & Return  │ → Sonucu döndür
└─────────────────┘
```

---

## ⚙️ Meshy.ai Parametreleri

Workflow'da kullanılan parametreler:

| Parametre | Değer | Açıklama |
|-----------|-------|----------|
| `enable_pbr` | `true` | PBR texture'lar (daha gerçekçi) |
| `ai_model` | `meshy-4` | En güncel AI modeli |
| `topology` | `quad` | Quad mesh (düzenleme için iyi) |
| `target_polycount` | `30000` | Polygon sayısı (kalite/boyut dengesi) |

### Alternatif Değerler:

**Düşük Poly (Hızlı):**
```json
{
  "target_polycount": 10000,
  "topology": "triangle"
}
```

**Yüksek Kalite:**
```json
{
  "target_polycount": 100000,
  "topology": "quad",
  "enable_pbr": true
}
```

---

## 🎯 Pembe Koltuk İçin Kullanım

6 adet koltuk fotoğrafınız için:

1. Görselleri bir hosting'e yükleyin (imgbb.com en kolay)
2. URL'leri alın
3. Batch workflow'u kullanın:

```json
{
  "image_urls": [
    "https://i.ibb.co/xxx/DSC00241.jpg",
    "https://i.ibb.co/xxx/DSC00242.jpg",
    "https://i.ibb.co/xxx/DSC00243.jpg",
    "https://i.ibb.co/xxx/DSC00244.jpg",
    "https://i.ibb.co/xxx/DSC00245.jpg",
    "https://i.ibb.co/xxx/DSC00246.jpg"
  ],
  "product_name": "Floki Pink Armchair"
}
```

---

## 💰 Meshy.ai Fiyatlandırma

| Plan | Aylık Kredi | Fiyat |
|------|-------------|-------|
| Free | 200 | $0 |
| Pro | 1000 | $20/ay |
| Max | 3000 | $60/ay |

> 💡 Her 3D model ~20-50 kredi kullanır (kaliteye göre)

---

## 🐛 Sorun Giderme

### "Unauthorized" hatası
- API key'i kontrol edin
- Environment variable doğru ayarlandı mı?

### "Task FAILED" hatası
- Görsel URL'i erişilebilir mi?
- Görsel formatı destekleniyor mu? (JPG, PNG, WebP)
- Görsel boyutu max 20MB

### Uzun işleme süresi
- Yüksek polycount daha uzun sürer
- Wait süresini artırın (60s yerine 120s)

---

## 📞 Destek

Sorularınız için:
- Meshy.ai Docs: https://docs.meshy.ai
- n8n Community: https://community.n8n.io
