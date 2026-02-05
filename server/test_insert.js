require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-' + Date.now(),
        name: 'Test Product',
        price: 100
    }]);

    if (error) {
        console.log('Insert error:', error.message);
        if (error.code === 'PGRST204') {
            console.log('Got PGRST204 - API cache issue.');
        }
    } else {
        console.log('Insert success!');
    }
}

check();
