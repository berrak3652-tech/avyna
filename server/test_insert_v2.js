require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert with more fields...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-2',
        name: 'Test Product 2',
        price: 200,
        description: 'Test description',
        category: 'Test category'
    }]);

    if (error) {
        console.log('Insert error:', error.message);
    } else {
        console.log('Insert success!');
    }
}

check();
