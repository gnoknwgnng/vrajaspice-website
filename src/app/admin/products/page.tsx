'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AdminLayout from '@/components/admin/AdminLayout'
import { Product } from '@/lib/products'
import { Plus, Pencil, ToggleLeft, ToggleRight, Search, Package, X, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

// ── Badge pill ───────────────────────────────────────────────────────────────
function BadgePill({ text }: { text: string | null }) {
  if (!text) return <span className="text-[#F5EDD8]/20 text-xs">—</span>
  return (
    <span className="inline-block bg-[#D4A017]/15 border border-[#D4A017]/25 text-[#D4A017] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
      {text}
    </span>
  )
}

// ── Stock pill ───────────────────────────────────────────────────────────────
function StockPill({ qty }: { qty: number }) {
  const low = qty <= 20
  const color = low ? 'text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10' : 'text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/10'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
      {low && '⚠ '}{qty}
    </span>
  )
}

// ── Active toggle ────────────────────────────────────────────────────────────
function ActiveToggle({ active, onToggle, disabled }: { active: boolean; onToggle: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={active ? 'Click to deactivate' : 'Click to activate'}
    >
      {active ? (
        <>
          <ToggleRight className="w-5 h-5 text-[#22C55E]" />
          <span className="text-[#22C55E]">Active</span>
        </>
      ) : (
        <>
          <ToggleLeft className="w-5 h-5 text-[#F5EDD8]/30" />
          <span className="text-[#F5EDD8]/30">Inactive</span>
        </>
      )}
    </button>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [productsList, setProductsList] = useState<Product[]>([])
  const [activeMap, setActiveMap] = useState<Record<number, boolean>>({})
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Form States
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('everyday')
  const [sellingPrice, setSellingPrice] = useState(99)
  const [mrp, setMrp] = useState(129)
  const [stockQuantity, setStockQuantity] = useState(100)
  const [badge, setBadge] = useState('')
  const [weight, setWeight] = useState('100g')
  const [imageUrl, setImageUrl] = useState('/placeholder.png')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [featured, setFeatured] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Fetch all products
  const fetchProductsList = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      if (data && data.length > 0) {
        setProductsList(data)
        const initialMap = Object.fromEntries(
          data.map((p: Product) => [p.id, p.isActive !== false])
        )
        setActiveMap(initialMap)
      }
    } catch (err) {
      console.error('Error fetching admin products', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductsList()
  }, [])

  const filtered = productsList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const toggleActive = async (id: number) => {
    const currentStatus = activeMap[id] !== false
    const newStatus = !currentStatus
    setUpdatingId(id)

    // Optimistic UI update
    setActiveMap((prev) => ({ ...prev, [id]: newStatus }))

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: newStatus }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update product status')
      }

      toast.success(newStatus ? 'Product activated successfully!' : 'Product deactivated successfully!')
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Failed to save changes to database.')
      // Rollback on error
      setActiveMap((prev) => ({ ...prev, [id]: currentStatus }))
    } finally {
      setUpdatingId(null)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug || 'product'}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload file to 'product-images' bucket
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        if (error.message.includes('bucket_not_found') || error.message.includes('does not exist')) {
          throw new Error('Supabase Storage bucket "product-images" not found. Please create a public bucket named "product-images" in your Supabase dashboard, or paste an image link below.')
        }
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setImageUrl(publicUrl)
      toast.success('Image uploaded successfully!')
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Failed to upload image. You can still paste an image link below.')
    } finally {
      setUploading(false)
    }
  }

  const handleNameChange = (val: string) => {
    setName(val)
    if (!editingProduct) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    setName('')
    setSlug('')
    setCategory('everyday')
    setSellingPrice(99)
    setMrp(129)
    setStockQuantity(100)
    setBadge('')
    setWeight('100g')
    setImageUrl('/placeholder.png')
    setShortDescription('')
    setDescription('')
    setIngredients('')
    setFeatured(false)
    setIsActive(true)
    setShowModal(true)
  }

  const openEditModal = (p: Product) => {
    setEditingProduct(p)
    setName(p.name)
    setSlug(p.slug)
    setCategory(p.category)
    setSellingPrice(p.sellingPrice)
    setMrp(p.mrp)
    setStockQuantity(p.stockQuantity)
    setBadge(p.badge || '')
    setWeight(p.weight)
    setImageUrl(p.imageUrl)
    setShortDescription(p.shortDescription)
    setDescription(p.description)
    setIngredients(p.ingredients)
    setFeatured(p.featured)
    setIsActive(p.isActive !== false)
    setShowModal(true)
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return toast.error('Name is required.')
    if (!slug.trim()) return toast.error('Slug is required.')

    setSubmitting(true)
    const payload = {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      category,
      selling_price: Number(sellingPrice),
      mrp: Number(mrp),
      stock_quantity: Number(stockQuantity),
      badge: badge || null,
      weight,
      image_url: imageUrl || '/placeholder.png',
      short_description: shortDescription,
      description,
      ingredients,
      featured: !!featured,
      is_active: !!isActive,
    }

    try {
      if (editingProduct) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingProduct.id)

        if (error) throw error
        toast.success('Product updated successfully!')
      } else {
        // Insert
        const { error } = await supabase
          .from('products')
          .insert([payload])

        if (error) throw error
        toast.success('Product added successfully!')
      }

      setShowModal(false)
      fetchProductsList()
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Failed to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return

    try {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (error) throw error
      setProductsList((prev) => prev.filter((p) => p.id !== id))
      toast.success('Product deleted successfully.')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to delete product.')
    }
  }

  return (
    <AdminLayout>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Products</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-0.5">{productsList.length} products in catalogue</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8721C] text-[#0F0603] text-sm font-semibold px-4 py-2.5 rounded-lg hover:from-[#E4B027] hover:to-[#F0882C] transition-all shadow-md hover:shadow-[#D4A017]/30 w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5EDD8]/30" />
        <input
          type="text"
          placeholder="Search products by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/25 focus:outline-none focus:border-[#D4A017]/40 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
        />
      </div>

      {/* Table container */}
      <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-8 h-8 animate-spin text-[#D4A017] mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-xs text-[#F5EDD8]/45">Loading product catalog…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="w-10 h-10 text-[#D4A017]/30 mb-3" />
            <p className="text-[#F5EDD8]/40 text-sm">No products match your search</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#D4A017]/5">
            {filtered.map((p: Product) => (
              <li key={p.id} className="hover:bg-[#D4A017]/3 transition-colors">
                {/* Desktop row */}
                <div className="hidden lg:grid grid-cols-[56px_1fr_100px_100px_80px_120px_100px_130px] gap-3 items-center px-4 py-3">
                  {/* Image */}
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#1A0C06] border border-[#D4A017]/10 relative shrink-0">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      onError={() => {}}
                    />
                  </div>
                  {/* Name */}
                  <div className="min-w-0">
                    <p className="text-[#F5EDD8] text-sm font-medium truncate">{p.name}</p>
                    <p className="text-[#F5EDD8]/30 text-xs capitalize truncate">{p.category} · {p.weight}</p>
                  </div>
                  {/* Price */}
                  <p className="text-[#D4A017] text-sm font-semibold">₹{p.sellingPrice}</p>
                  {/* MRP */}
                  <p className="text-[#F5EDD8]/30 text-sm line-through">₹{p.mrp}</p>
                  {/* Stock */}
                  <StockPill qty={p.stockQuantity} />
                  {/* Badge */}
                  <BadgePill text={p.badge} />
                  {/* Status */}
                  <ActiveToggle active={activeMap[p.id]} onToggle={() => toggleActive(p.id)} />
                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEditModal(p)}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#F5EDD8]/50 hover:text-[#D4A017] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#8B1A1A] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Mobile card */}
                <div className="lg:hidden flex items-start gap-3 px-4 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1A0C06] border border-[#D4A017]/10 relative shrink-0">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                      onError={() => {}}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[#F5EDD8] text-sm font-medium leading-tight">{p.name}</p>
                      <BadgePill text={p.badge} />
                    </div>
                    <p className="text-[#F5EDD8]/30 text-xs capitalize mt-0.5">{p.category} · {p.weight}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-[#D4A017] text-sm font-semibold">₹{p.sellingPrice}</span>
                      <span className="text-[#F5EDD8]/30 text-xs line-through">₹{p.mrp}</span>
                      <StockPill qty={p.stockQuantity} />
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-3 pt-2 border-t border-[#D4A017]/5">
                      <ActiveToggle active={activeMap[p.id]} onToggle={() => toggleActive(p.id)} />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(p)}
                          className="flex items-center gap-1 text-xs text-[#F5EDD8]/40 hover:text-[#D4A017] transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="flex items-center gap-1 text-xs text-[#8B1A1A] hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer count */}
      <p className="mt-4 text-[#F5EDD8]/20 text-xs text-right">
        Showing {filtered.length} of {productsList.length} products
      </p>

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#1A0C06] border border-[#D4A017]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4A017]/10 pb-3">
              <h3 className="font-serif text-[#F5EDD8] text-xl font-bold">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-[#0F0603] border border-[#D4A017]/15 flex items-center justify-center text-[#F5EDD8]/60 hover:text-[#F5EDD8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-[#F5EDD8]">
              {/* Section 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">PRODUCT NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashmiri Red Chilli Powder"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none focus:border-[#D4A017]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">SLUG (FOR ROUTING)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kashmiri-red-chilli"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none focus:border-[#D4A017]/40"
                  />
                </div>
              </div>

              {/* Section 2: Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">SELLING PRICE (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">STOCK QUANTITY</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  >
                    <option value="everyday">Everyday Masalas</option>
                    <option value="satvik">Satvik Spices</option>
                    <option value="premium">Premium Blends</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">WEIGHT</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 100g, 250g"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">BADGE (OPTIONAL)</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller, Launch Special"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 4: Image Picker and Preview */}
              <div className="bg-[#0F0603] border border-[#D4A017]/15 rounded-xl p-4">
                <label className="block text-xs font-semibold text-[#D4A017] mb-3">PRODUCT IMAGE</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* Thumbnail Preview */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#1A0C06] border border-[#D4A017]/25 relative shrink-0">
                    <Image
                      src={imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="96px"
                      onError={() => {
                        setImageUrl('/placeholder.png')
                      }}
                    />
                  </div>
                  
                  {/* File Selector & URL Input */}
                  <div className="flex-1 w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="bg-[#1A0C06] border border-[#D4A017]/30 hover:bg-[#D4A017]/10 text-[#F5EDD8] text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm select-none">
                        {uploading ? 'Uploading...' : 'Choose File...'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploading}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[#F5EDD8]/45 text-[10px]">
                        Support PNG, JPG, WEBP. Max 2MB.
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] text-[#F5EDD8]/30 mb-1">OR ENTER DIRECT IMAGE URL</span>
                      <input
                        type="text"
                        required
                        placeholder="/products/garam-masala.png or https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-xs text-[#F5EDD8] focus:outline-none focus:border-[#D4A017]/30"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Descriptions */}
              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">SHORT DESCRIPTION</label>
                <input
                  type="text"
                  required
                  placeholder="A brief tagline description..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">FULL DESCRIPTION</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed product story, texture, and aroma details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">INGREDIENTS (COMMA-SEPARATED)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Coriander, Cumin, Black Pepper, Ginger, Cardamom..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                />
              </div>

              {/* Section 6: Booleans */}
              <div className="flex gap-6 items-center pt-2">
                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D4A017]/20 bg-[#0F0603] text-[#D4A017] focus:ring-0 cursor-pointer"
                  />
                  FEATURED PRODUCT (HOMEPAGE)
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D4A017]/20 bg-[#0F0603] text-[#D4A017] focus:ring-0 cursor-pointer"
                  />
                  ACTIVE (VISIBLE ON STORE)
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end border-t border-[#D4A017]/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-[#D4A017]/20 text-[#F5EDD8]/60 hover:bg-[#D4A017]/5 px-5 py-2.5 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-[#D4A017] to-[#E8721C] text-[#0F0603] text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
