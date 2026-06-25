-- SQL Migration: Fix Supabase Storage RLS Policies for Product Images
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/cvmwlqvluisqchttjswd/sql/new)

-- 1. Create policy to allow anyone to upload/insert images into the 'product-images' bucket
DROP POLICY IF EXISTS "Allow public inserts to product-images" ON storage.objects;
CREATE POLICY "Allow public inserts to product-images" ON storage.objects
  FOR INSERT TO public WITH CHECK (bucket_id = 'product-images');

-- 2. Create policy to allow anyone to update images in the 'product-images' bucket (for overwrites)
DROP POLICY IF EXISTS "Allow public updates to product-images" ON storage.objects;
CREATE POLICY "Allow public updates to product-images" ON storage.objects
  FOR UPDATE TO public USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

-- 3. Create policy to allow anyone to delete images from the 'product-images' bucket
DROP POLICY IF EXISTS "Allow public deletes from product-images" ON storage.objects;
CREATE POLICY "Allow public deletes from product-images" ON storage.objects
  FOR DELETE TO public USING (bucket_id = 'product-images');
