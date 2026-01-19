
import { SupabaseService } from './supabase';

export const ApiService = {
    // Products
    async getProducts() {
        return await SupabaseService.getProducts();
    },

    async addProduct(product: any) {
        const result = await SupabaseService.addProduct(product);
        return { success: true, ...result };
    },

    async deleteProduct(id: string) {
        await SupabaseService.deleteProduct(id);
        return { success: true };
    },

    async updateProduct(product: any) {
        const result = await SupabaseService.updateProduct(product);
        return { success: true, ...result };
    },


    // Orders
    async createOrder(order: any, items: any[]) {
        return await SupabaseService.createOrder(order, items);
    },

    async getOrders() {
        return await SupabaseService.getOrders();
    },

    async updateOrderStatus(orderId: string, status: string) {
        return await SupabaseService.updateOrderStatus(orderId, status);
    },


    // AI Tools (Still using n8n for this)
    async generate3DModel(imageUrl: string) {
        const webhookUrl = 'https://n8n.polmarkai.pro/webhook-test/image-to-3d';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl })
        });
        if (!response.ok) throw new Error('Failed to generate 3D model');
        return await response.json();
    },

    // PayTR
    async getPayTRToken(paymentData: any) {
        const response = await fetch('http://localhost:5000/api/payment/paytr/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paymentData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Payment token could not be generated');
        }
        return await response.json();
    }
};
