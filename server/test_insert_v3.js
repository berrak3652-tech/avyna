require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert with dimensions...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-3',
        name: 'Test Product 3',
        price: 300,
        dimensions: { w: 1, h: 2 }
    }]);

    if (error) {
        console.log('Insert error:', error.message);
    } else {
        console.log('Insert success!');
    }
}

check();
