require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const items = [
    {
        id: '1',
        name: 'Aurelia Kadife Koltuk',
        price: 18500,
        description: 'Zarafetin ve konforun buluştuğu nokta. İtalyan kadife dokusuyla salonunuza saray havası katın.',
        category: 'Oturma Grubu',
        imageurl: 'https://picsum.photos/seed/sofa1/800/600',
        modelurl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 220, height: 85, depth: 95 },
        stock: 5
    },
    {
        id: '2',
        name: 'Lumiera Mermer Masa',
        price: 12400,
        description: 'Doğal damarlı Carrara mermeri ve altın varaklı ayaklarla akşam yemeklerinizi sanata dönüştürün.',
        category: 'Yemek Odası',
        imageurl: 'https://picsum.photos/seed/table1/800/600',
        modelurl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 180, height: 75, depth: 90 },
        stock: 3
    },
    {
        id: '3',
        name: 'Zephyr Minimalist Berjer',
        price: 6800,
        description: 'Modern çizgiler, sürdürülebilir ahşap iskelet. Avyna kalitesiyle minimalizmin doruklarına ulaşın.',
        category: 'Oturma Grubu',
        imageurl: 'https://picsum.photos/seed/berjer/800/600',
        modelurl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        dimensions: { width: 80, height: 95, depth: 85 },
        stock: 12
    }
];

async function run() {
    console.log('Upserting with lowercase keys...');
    const { error } = await supabase.from('products').upsert(items);
    if (error) console.log('Error:', JSON.stringify(error, null, 2));
    else console.log('Seeding Success!');
}
run();
