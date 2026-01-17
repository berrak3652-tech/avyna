
export const N8N_WEBHOOK_URL = 'https://n8n.polmarkai.pro/webhook-test/image-to-3d';

export interface N8NResponse {
    success: boolean;
    modelUrl?: string;
    error?: string;
}

export const N8nService = {
    generate3DModel: async (imageUrl: string): Promise<N8NResponse> => {
        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();

            if (!text || text.trim() === "") {
                return {
                    success: true,
                    error: "İşlem başlatıldı (Boş yanıt)"
                };
            }

            try {
                const data = JSON.parse(text);
                return {
                    success: true,
                    modelUrl: data.modelUrl || data.url || data.glb_url || data.output || data.model_urls?.glb,
                };
            } catch (e) {
                // If it's not JSON, it might be a success message as plain text
                return {
                    success: true,
                    error: text.length > 100 ? text.substring(0, 100) + "..." : text
                };
            }
        } catch (error) {
            console.error('N8n Webhook Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu',
            };
        }
    },
};
