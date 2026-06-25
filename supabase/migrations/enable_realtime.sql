-- SQL Migration: Enable Realtime replication for products
-- Run this in your Supabase SQL Editor:
-- Go to: https://supabase.com/dashboard/project/_/sql/new

-- 1. Check if supabase_realtime publication exists. If not, create it.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

-- 2. Add the products table to the supabase_realtime publication
-- This allows Supabase to publish INSERT/UPDATE/DELETE events to listening client-side applications.
ALTER PUBLICATION supabase_realtime ADD TABLE products;
