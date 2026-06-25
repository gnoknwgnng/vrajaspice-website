-- SQL Migration: Fix Admin Dashboard Access and Actions
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/cvmwlqvluisqchttjswd/sql/new)

-- Disable RLS on tables managed by the admin panel so the mock admin client can read/write data
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers DISABLE ROW LEVEL SECURITY;


