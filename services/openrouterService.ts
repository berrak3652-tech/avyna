
// OpenRouter API Service
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const getApiKey = () => {
    try {
        return import.meta.env.VITE_OPENROUTER_API_KEY || '';
    } catch (e) {
        return '';
    }
};

/**
 * Generates a luxury product description using OpenRouter API
 */
export const generateProductDescription = async (name: string, category: string): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
            return `${name} - Premium ${category} koleksiyonumuzdan özenle seçilmiş bir parça. Avyna kalitesi ve zarafeti bir arada.`;
        }

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Avyna Furniture'
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    {
                        role: 'system',
                        content: 'Sen Avyna Furniture\'ın marka sesisin. Ürün açıklamalarını kısa, etkileyici, ikna edici ve premium (lüks) bir dille yaz. Müşterilere kendini özel hissettir.'
                    },
                    {
                        role: 'user',
                        content: `Ürün Adı: ${name}, Kategori: ${category}. Bu ürün için lüks bir pazarlama metni oluştur (maksimum 2-3 cümle).`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || `${name} - Premium ${category} koleksiyonumuzdan özenle seçilmiş bir parça.`;
    } catch (error: any) {
        console.error('OpenRouter description error:', error);
        return `${name} - Premium ${category} koleksiyonumuzdan özenle seçilmiş bir parça. Avyna kalitesi ve zarafeti bir arada.`;
    }
};

/**
 * AI Decoration Assistant using OpenRouter API
 * Note: Vision models require base64 image support
 */
export const getDecorationAdvice = async (imageB64: string, productNames: string[]): Promise<string> => {
    try {
        const apiKey = getApiKey();
        if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
            return `⚠️ OpenRouter API anahtarı bulunamadı.\n\nBu özelliği kullanmak için:\n1. OpenRouter'dan (https://openrouter.ai/keys) ücretsiz bir API anahtarı alın\n2. .env.local dosyanıza ekleyin: VITE_OPENROUTER_API_KEY=your_key_here\n3. Sunucuyu yeniden başlatın\n\nŞu an için ürünlerimizi manuel olarak inceleyebilirsiniz: ${productNames.slice(0, 3).join(', ')} gibi parçalar odanıza çok yakışabilir!`;
        }

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'Avyna Furniture'
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-exp:free',
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `Bu odanın fotoğrafını analiz et. Odaya uygun stil tavsiyeleri ver ve şu Avyna ürünlerinden hangilerinin bu odaya uyacağını belirt: ${productNames.join(', ')}. Yanıtın samimi, uzman bir dekoratör gibi olsun.`
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: imageB64
                                }
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "Tavsiye alınamadı.";
    } catch (error: any) {
        console.error('OpenRouter advisor error:', error);
        return `⚠️ Oda analizi şu an kullanılamıyor.\n\nNeden: ${error.message || 'Bilinmeyen hata'}\n\nÇözüm: OpenRouter API anahtarınızı kontrol edin veya daha sonra tekrar deneyin.\n\nŞu an için ürünlerimizi manuel olarak inceleyebilirsiniz!`;
    }
};
