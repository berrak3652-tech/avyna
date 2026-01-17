
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Testing insert...');
    const { data, error } = await supabase.from('products').insert([{
        id: 'test-' + Date.now(),
        name: 'Test Product',
        price: 100
    }]);

    if (error) {
        console.log('Insert error:', error.message);
        if (error.code === 'PGRST204') {
            console.log('Got PGRST204 - API cache issue.');
        }
    } else {
        console.log('Insert success!');
    }
}

check();
