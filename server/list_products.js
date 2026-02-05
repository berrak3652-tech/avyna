require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listProducts() {
    console.log('\nListing all products in Supabase...\n');

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error:', error.message);
        return;
    }

    console.log(`Total products: ${data.length}\n`);

    data.forEach((product, index) => {
        const imageCount = Array.isArray(product.images) ? product.images.length : 0;
        console.log(`${(index + 1).toString().padStart(2)}. ${product.name.padEnd(20)} - ${product.price} TL - ${imageCount} images`);
    });

    console.log('\n');
}

listProducts();
