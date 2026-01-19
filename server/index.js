
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('better-sqlite3');
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.join(__dirname, '../.env') });
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database Initialization
const db = new Database('database.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT,
    description TEXT,
    stock INTEGER DEFAULT 0,
    imageUrl TEXT,
    modelUrl TEXT,
    dimensions TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customerName TEXT,
    customerEmail TEXT,
    customerPhone TEXT,
    address TEXT,
    total REAL,
    status TEXT DEFAULT 'pending',
    items TEXT,
    createdAt TEXT
  );
`);

// --- PRODUCT ROUTES ---

app.get('/api/products', (req, res) => {
    try {
        const products = db.prepare('SELECT * FROM products ORDER BY name ASC').all();
        // Parse dimensions and images if they exist
        const parsedProducts = products.map(p => ({
            ...p,
            dimensions: p.dimensions ? JSON.parse(p.dimensions) : null,
            images: p.imageUrl ? JSON.parse(p.imageUrl) : []
        }));
        res.json(parsedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products', (req, res) => {
    const { id, name, price, category, description, stock, imageUrl, modelUrl, dimensions } = req.body;
    try {
        const stmt = db.prepare(`
      INSERT INTO products (id, name, price, category, description, stock, imageUrl, modelUrl, dimensions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id || Date.now().toString(), name, price, category, description, stock, imageUrl, modelUrl, JSON.stringify(dimensions));
        res.status(201).json({ success: true, id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        stmt.run(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- ORDER ROUTES ---

app.post('/api/orders', (req, res) => {
    const { customerName, customerEmail, customerPhone, address, total, items } = req.body;
    const id = 'ORD-' + Date.now();
    const createdAt = new Date().toISOString();
    try {
        const stmt = db.prepare(`
      INSERT INTO orders (id, customerName, customerEmail, customerPhone, address, total, items, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, customerName, customerEmail, customerPhone, address, total, JSON.stringify(items), createdAt);
        res.status(201).json({ success: true, orderId: id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders', (req, res) => {
    try {
        const orders = db.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
        const parsedOrders = orders.map(o => ({
            ...o,
            items: JSON.parse(o.items)
        }));
        res.json(parsedOrders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- AI PROXY ROUTES ---

// Gemini Proxy
app.post('/api/ai/generate-description', async (req, res) => {
    const { name, category } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key not found' });
    }

    try {
        // We'll call Gemini API here or just proxy the request
        // For now, let's keep it simple and assume the frontend might still call it,
        // but this is where it SHOULD go.
        res.json({ message: 'AI proxy ready - implement logic' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// n8n Proxy
app.post('/api/ai/image-to-3d', async (req, res) => {
    const { imageUrl } = req.body;
    const webhookUrl = 'https://n8n.polmarkai.pro/webhook-test/image-to-3d';

    try {
        const response = await axios.post(webhookUrl, { imageUrl });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- PAYTR PAYMENT ROUTES ---

app.post('/api/payment/paytr/token', async (req, res) => {
    try {
        const {
            email,
            payment_amount,
            merchant_oid,
            user_name,
            user_address,
            user_phone,
            user_basket,
            user_ip
        } = req.body;

        const merchant_id = process.env.PAYTR_MERCHANT_ID || 'dummy_id';
        const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'dummy_key';
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'dummy_salt';

        const timeout_limit = "30";
        const debug_on = 1;
        const test_mode = 1; // Set to 0 for production
        const no_installment = 0;
        const max_installment = 0;
        const currency = "TL";
        const merchant_ok_url = `${req.get('origin')}/payment-success`;
        const merchant_fail_url = `${req.get('origin')}/payment-fail`;

        // Create user_basket if not provided stringified
        const basket = typeof user_basket === 'string' ? user_basket : JSON.stringify(user_basket);
        const user_basket_base64 = Buffer.from(basket).toString('base64');

        const hash_str = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_base64 + no_installment + max_installment + currency + test_mode;
        const paytr_token = crypto.createHmac('sha256', merchant_key).update(hash_str + merchant_salt).digest('base64');

        const params = {
            merchant_id,
            user_ip,
            merchant_oid,
            email,
            payment_amount,
            paytr_token,
            user_basket: user_basket_base64,
            debug_on,
            no_installment,
            max_installment,
            user_name,
            user_address,
            user_phone,
            merchant_ok_url,
            merchant_fail_url,
            timeout_limit,
            currency,
            test_mode
        };

        const response = await axios.post('https://www.paytr.com/odeme/api/get-token', new URLSearchParams(params));

        if (response.data.status === 'success') {
            res.json({ status: 'success', token: response.data.token });
        } else {
            res.status(400).json({ status: 'error', message: response.data.err_msg });
        }
    } catch (error) {
        console.error('PayTR Token Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// PayTR Callback (Notification)
app.post('/api/payment/paytr/callback', async (req, res) => {
    const { merchant_oid, status, total_amount, hash } = req.body;
    const merchant_key = process.env.PAYTR_MERCHANT_KEY || 'dummy_key';
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT || 'dummy_salt';

    // Verify hash
    const hash_str = merchant_oid + merchant_salt + status + total_amount;
    const expected_hash = crypto.createHmac('sha256', merchant_key).update(hash_str).digest('base64');

    if (hash !== expected_hash) {
        return res.send('PAYTR notification failed: bad hash');
    }

    if (status === 'success') {
        // Update order status in your database
        console.log(`Order ${merchant_oid} paid successfully`);
        // Here you would typically call your DB service to update the order
    } else {
        console.log(`Order ${merchant_oid} payment failed`);
    }

    res.send('OK');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
