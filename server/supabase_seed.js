
const { createClient } = require('@supabase/supabase-js');
const sUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const sKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
const supabase = createClient(sUrl, sKey);

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
