require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
        console.log('API_ERROR:', error.message);
    } else if (data.length === 0) {
        console.log('NO_DATA');
    } else {
        console.log('KEYS:', Object.keys(data[0]).join(','));
    }
}

check();
