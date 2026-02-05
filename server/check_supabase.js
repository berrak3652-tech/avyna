require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Checking Supabase API visibility...');
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
        console.log('Error querying products:', error.message);
    } else {
        console.log('Successfully queried products table!');
    }
}

check();
