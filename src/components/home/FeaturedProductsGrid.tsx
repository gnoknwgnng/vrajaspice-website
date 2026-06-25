'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'
import { supabase } from '@/lib/supabase'

interface FeaturedProductsGridProps {
  initialProducts: Product[]
}

export default function FeaturedProductsGrid({ initialProducts }: FeaturedProductsGridProps) {
  const [featuredList, setFeaturedList] = useState<Product[]>(initialProducts)

  useEffect(() => {
    setFeaturedList(initialProducts)
  }, [initialProducts])

  useEffect(() => {
    const fetchLatestFeatured = () => {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data: Product[]) => {
          if (data && data.length > 0) {
            const activeFeatured = data.filter((p) => p.featured && p.isActive !== false)
            setFeaturedList(activeFeatured)
          }
        })
        .catch((err) => console.error('Error fetching latest featured products:', err))
    }

    // Subscribe to realtime updates on the products table
    const channel = supabase
      .channel('realtime-featured-products')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('Realtime change on homepage products:', payload)
          fetchLatestFeatured()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {featuredList.map((product, i) => (
        <ProductCard key={product.slug} product={product} priority={i < 4} />
      ))}
    </div>
  )
}
