const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
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
