const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://mdxsasiabwronqkegkuo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1keHNhc2lhYndyb25xa2Vna3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMTQ0MzEsImV4cCI6MjA4MzY5MDQzMX0.PpfYdieqVCKvItbCOMvdjKD_AdUdaw8pBdiNogUJQ5E';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Columns:', Object.keys(data[0]));
        console.log('Sample Data:', data[0]);
    }
}

check();
