const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
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
