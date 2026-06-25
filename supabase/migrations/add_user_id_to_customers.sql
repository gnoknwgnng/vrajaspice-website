-- SQL Migration: Add User ID to Customers and trigger auto-creation
-- Run this in your Supabase SQL Editor

-- 1. Add user_id referencing auth.users to customers
ALTER TABLE customers ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);

-- 2. Create trigger function to auto-create customer row on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.customers (full_name, email, created_at, user_id)
  VALUES (
    COALESCE(new.raw_user_meta_data->>'full_name', 'Valued Customer'),
    new.email,
    NOW(),
    new.id
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Bind trigger function to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
