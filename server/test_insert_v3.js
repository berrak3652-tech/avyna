
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert with dimensions...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-3',
        name: 'Test Product 3',
        price: 300,
        dimensions: { w: 1, h: 2 }
    }]);

    if (error) {
        console.log('Insert error:', error.message);
    } else {
        console.log('Insert success!');
    }
}

check();
