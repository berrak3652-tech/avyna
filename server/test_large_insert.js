const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
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
