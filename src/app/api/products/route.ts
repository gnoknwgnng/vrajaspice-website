import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { products as mockProducts, Product } from '@/lib/products'

// Helper to map DB row to frontend Product type
function mapDbRowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description || '',
    description: row.description || '',
    ingredients: row.ingredients || '',
    weight: row.weight || '100g',
    sellingPrice: Number(row.selling_price),
    mrp: Number(row.mrp),
    stockQuantity: Number(row.stock_quantity),
    featured: !!row.featured,
    badge: row.badge,
    imageUrl: row.image_url || '/placeholder.png',
    category: row.category || 'everyday',
    benefits: row.benefits || [],
    usageSuggestions: row.usage_suggestions || [],
    faqs: row.faqs || [],
    isActive: row.is_active !== undefined ? !!row.is_active : true,
  }
}

// GET all products (dynamic fetch from Supabase, fallback to static mock list)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch failed or no products. Using mock fallback.', error)
      return NextResponse.json(mockProducts)
    }

    const products = data.map(mapDbRowToProduct)
    return NextResponse.json(products)
  } catch (err) {
    console.error('Error fetching from Supabase. Using mock fallback.', err)
    return NextResponse.json(mockProducts)
  }
}

// PUT to update product active status or other fields in Supabase
export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, is_active, stock_quantity, selling_price } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 })
    }

    // Prepare update payload
    const updatePayload: any = {}
    if (is_active !== undefined) updatePayload.is_active = is_active
    if (stock_quantity !== undefined) updatePayload.stock_quantity = stock_quantity
    if (selling_price !== undefined) updatePayload.selling_price = selling_price

    const { data, error } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, updatedProduct: data?.[0] })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
