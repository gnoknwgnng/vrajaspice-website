-- SQL Migration: Add Row Level Security (RLS) policies for user data
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/cvmwlqvluisqchttjswd/sql/new)

-- 1. Enable RLS on all relevant tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid duplicates/conflicts
DROP POLICY IF EXISTS "Customers can be created" ON public.customers;
DROP POLICY IF EXISTS "Customers can insert" ON public.customers;
DROP POLICY IF EXISTS "Customers can select their own profile" ON public.customers;
DROP POLICY IF EXISTS "Customers can update their own profile" ON public.customers;
DROP POLICY IF EXISTS "Addresses are manageable by owner" ON public.addresses;
DROP POLICY IF EXISTS "Orders can be placed" ON public.orders;
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Order items can be created" ON public.order_items;
DROP POLICY IF EXISTS "Customers can view their own order items" ON public.order_items;

-- 3. Customers table policies
-- Allow insert (needed for signup trigger and auto-create profile fallback)
CREATE POLICY "Customers can insert" ON public.customers
  FOR INSERT WITH CHECK (true);

-- Allow users to read their own customer profile
CREATE POLICY "Customers can select their own profile" ON public.customers
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to update their own customer profile
CREATE POLICY "Customers can update their own profile" ON public.customers
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. Addresses table policies
-- Since addresses references customers(id), we check if the customer belongs to auth.uid()
CREATE POLICY "Addresses are manageable by owner" ON public.addresses
  FOR ALL USING (
    customer_id IN (
      SELECT id FROM public.customers WHERE user_id = auth.uid()
    )
  );

-- 5. Orders table policies
-- Allow insert (so that logged-in users can insert orders)
CREATE POLICY "Orders can be placed" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Allow users to view their own orders
CREATE POLICY "Customers can view their own orders" ON public.orders
  FOR SELECT USING (
    customer_id IN (
      SELECT id FROM public.customers WHERE user_id = auth.uid()
    )
  );

-- 6. Order Items table policies
-- Allow insert (needed during checkout)
CREATE POLICY "Order items can be created" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Allow users to view order items for their own orders
CREATE POLICY "Customers can view their own order items" ON public.order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM public.orders WHERE customer_id IN (
        SELECT id FROM public.customers WHERE user_id = auth.uid()
      )
    )
  );
