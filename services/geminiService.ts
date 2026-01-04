
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `Sen Avyna Furniture'ın marka sesisin. Ürün açıklamalarını kısa, etkileyici, ikna edici ve premium (lüks) bir dille yaz. Müşterilere kendini özel hissettir.`;

/**
 * Generates a luxury product description based on product name and category.
 */
export const generateProductDescription = async (name: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Ürün Adı: ${name}, Kategori: ${category}. Bu ürün için lüks bir pazarlama metni oluştur.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text || "Açıklama oluşturulamadı.";
  } catch (error) {
    console.error("Gemini description error:", error);
    return "Hata oluştu, lütfen tekrar deneyin.";
  }
};

/**
 * AI Decoration Assistant: Recommends products based on a room image.
 */
export const getDecorationAdvice = async (imageB64: string, productNames: string[]): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageB64.split(',')[1], // remove prefix
      },
    };
    
    const textPart = {
      text: `Bu odanın fotoğrafını analiz et. Odaya uygun stil tavsiyeleri ver ve şu Avyna ürünlerinden hangilerinin bu odaya uyacağını belirt: ${productNames.join(', ')}. Yanıtın samimi, uzman bir dekoratör gibi olsun.`
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: "Sen profesyonel bir iç mimar ve Avyna Furniture stil danışmanısın.",
      },
    });

    return response.text || "Tavsiye alınamadı.";
  } catch (error) {
    console.error("Gemini advisor error:", error);
    return "Oda analizi sırasında bir hata oluştu.";
  }
};
