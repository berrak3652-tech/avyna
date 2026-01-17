
-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT,
  description TEXT,
  stock INTEGER DEFAULT 0,
  images JSONB,
  modelurl TEXT,
  dimensions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  address TEXT,
  total_amount NUMERIC,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  quantity INTEGER DEFAULT 1,
  price NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security) - Optional, for now we can disable or set public
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public Access" ON products FOR SELECT USING (true);
-- CREATE POLICY "Public Insert" ON products FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Public Delete" ON products FOR DELETE USING (true);

-- For testing, you can disable RLS:
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
