
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Checking Supabase API visibility...');
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
        console.log('Error querying products:', error.message);
    } else {
        console.log('Successfully queried products table!');
    }
}

check();
