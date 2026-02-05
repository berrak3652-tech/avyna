require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLargeInsert() {
    console.log('Generating dummy images...');
    const largeImage = 'a'.repeat(1024 * 1024 * 5); // 5MB string
    const testId = `large-test-${Date.now()}`;

    console.log('Starting insert...');
    const start = Date.now();
    const { data, error } = await supabase.from('products').insert([{
        id: testId,
        name: 'Large Payload Test',
        price: 1,
        category: 'Aksesuar',
        description: 'Testing large JSONB payload',
        images: [largeImage],
        modelurl: 'https://example.com/test.glb',
        dimensions: { width: 1, height: 1, depth: 1 }
    }]).select();

    const duration = (Date.now() - start) / 1000;
    if (error) {
        console.error('INSERT_ERROR:', error);
    } else {
        console.log(`INSERT_SUCCESS in ${duration}s`);
    }
}

testLargeInsert();
