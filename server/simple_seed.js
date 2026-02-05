require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const items = [
    { id: 'p1', name: 'Aurelia Kadife Koltuk', price: 18500, category: 'Oturma Grubu' },
    { id: 'p2', name: 'Lumiera Mermer Masa', price: 12400, category: 'Yemek Odası' }
];

async function run() {
    console.log('Seeding...');
    const { error } = await supabase.from('products').insert(items);
    if (error) console.log('Error:', error.message);
    else console.log('Success!');
}
run();
