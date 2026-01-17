
const { createClient } = require('@supabase/supabase-js');
const sUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const sKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
const supabase = createClient(sUrl, sKey);

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
