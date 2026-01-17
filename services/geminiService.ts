
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use a getter to avoid top-level initialization errors
const getGenAI = () => {
  // @ts-ignore
  let apiKey = '';

  // Try to get API key from various sources
  try {
    // @ts-ignore
    apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  } catch (e) { }

  if (!apiKey && typeof process !== 'undefined' && process.env) {
    apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY || '';
  }

  // Check if it's the placeholder or empty
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === '') {
    // Return a dummy object or throw a helpful error that the UI can catch
    console.error("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generates a luxury product description based on product name and category.
 */
export const generateProductDescription = async (name: string, category: string): Promise<string> => {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      return `${name} - Premium ${category} koleksiyonumuzdan özenle seçilmiş bir parça. Avyna kalitesi ve zarafeti bir arada.`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Sen Avyna Furniture'ın marka sesisin. Ürün açıklamalarını kısa, etkileyici, ikna edici ve premium (lüks) bir dille yaz. Müşterilere kendini özel hissettir. Ürün Adı: ${name}, Kategori: ${category}. Bu ürün için lüks bir pazarlama metni oluştur.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Açıklama oluşturulamadı.";
  } catch (error: any) {
    console.error("Gemini description error:", error);
    return `${name} - Premium ${category} koleksiyonumuzdan özenle seçilmiş bir parça. Avyna kalitesi ve zarafeti bir arada.`;
  }
};

/**
 * AI Decoration Assistant: Recommends products based on a room image.
 */
export const getDecorationAdvice = async (imageB64: string, productNames: string[]): Promise<string> => {
  try {
    const genAI = getGenAI();
    if (!genAI) {
      return `⚠️ Gemini API anahtarı bulunamadı.\n\nBu özelliği kullanmak için:\n1. Google AI Studio'dan (https://makersuite.google.com/app/apikey) ücretsiz bir API anahtarı alın\n2. .env.local dosyanıza ekleyin: VITE_GEMINI_API_KEY=your_key_here\n3. Sunucuyu yeniden başlatın\n\nŞu an için ürünlerimizi manuel olarak inceleyebilirsiniz: ${productNames.slice(0, 3).join(', ')} gibi parçalar odanıza çok yakışabilir!`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = imageB64.split(',')[1];

    const parts: any[] = [
      { text: "Bu odanın fotoğrafını analiz et. Odaya uygun stil tavsiyeleri ver ve şu Avyna ürünlerinden hangilerinin bu odaya uyacağını belirt: " + productNames.join(', ') + ". Yanıtın samimi, uzman bir dekoratör gibi olsun." },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData
        }
      }
    ];

    const result = await model.generateContent(parts);
    const response = await result.response;

    return response.text() || "Tavsiye alınamadı.";
  } catch (error: any) {
    console.error("Gemini advisor error:", error);
    return `⚠️ Oda analizi şu an kullanılamıyor.\n\nNeden: ${error.message || 'Bilinmeyen hata'}\n\nÇözüm: Gemini API anahtarınızı kontrol edin veya daha sonra tekrar deneyin.\n\nŞu an için ürünlerimizi manuel olarak inceleyebilirsiniz!`;
  }
};
