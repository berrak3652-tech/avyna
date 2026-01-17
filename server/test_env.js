// Test script to verify Supabase connection with current environment variables
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('\n🔍 Supabase Connection Test\n');
console.log('━'.repeat(50));

if (!supabaseUrl) {
    console.error('❌ VITE_SUPABASE_URL is missing!');
    process.exit(1);
}

if (!supabaseAnonKey) {
    console.error('❌ VITE_SUPABASE_ANON_KEY is missing!');
    process.exit(1);
}

console.log('✅ Environment variables found:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 10)}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('🔄 Testing connection...\n');

try {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5);

    if (error) {
        console.error('❌ Supabase Error:', error.message);
        console.error('   Code:', error.code);
        console.error('   Details:', error.details);
        console.error('   Hint:', error.hint);
        console.log('\n💡 Possible solutions:');
        console.log('   1. Check if the API key is correct in .env.local');
        console.log('   2. Verify the Supabase project URL');
        console.log('   3. Check Row Level Security (RLS) policies');
        console.log('   4. Get fresh keys from: https://supabase.com/dashboard/project/mdxsasiabwronqkegkuo/settings/api');
        process.exit(1);
    }

    console.log('✅ Connection successful!');
    console.log(`   Found ${data.length} products`);

    if (data.length > 0) {
        console.log('\n📦 Sample products:');
        data.forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} - ${product.price}₺`);
        });
    } else {
        console.log('\n⚠️  No products found in database');
        console.log('   Run: node server/supabase_seed.js');
    }

    console.log('\n━'.repeat(50));
    console.log('✅ All checks passed! Ready for deployment.\n');

} catch (err) {
    console.error('❌ Unexpected error:', err.message);
    process.exit(1);
}
