require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    const testId = `test-${Date.now()}`;
    const { data, error } = await supabase.from('products').insert([{
        id: testId,
        name: 'Terminal Test Product',
        price: 999,
        category: 'Aksesuar',
        description: 'Test description',
        images: ['https://picsum.photos/200'],
        modelurl: 'https://example.com/test.glb',
        dimensions: { width: 10, height: 10, depth: 10 }
    }]).select();

    if (error) {
        console.error('INSERT_ERROR:', error);
    } else {
        console.log('INSERT_SUCCESS:', data);
    }
}

testInsert();
