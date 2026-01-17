
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert with more fields...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-2',
        name: 'Test Product 2',
        price: 200,
        description: 'Test description',
        category: 'Test category'
    }]);

    if (error) {
        console.log('Insert error:', error.message);
    } else {
        console.log('Insert success!');
    }
}

check();
