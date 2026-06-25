'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { Search, Tag, Plus, Trash2, ToggleLeft, ToggleRight, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'

interface Coupon {
  id: number
  code: string
  description: string | null
  discount_type: 'percentage' | 'flat'
  discount_value: number
  min_order_value: number
  max_uses: number | null
  uses_count: number
  active: boolean
  expiry_date: string | null
}

export default function CouponsPage() {
  const [search, setSearch] = useState('')
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)

  // Form States
  const [showModal, setShowModal] = useState(false)
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [discountType, setDiscountType] = useState<'percentage' | 'flat'>('percentage')
  const [discountValue, setDiscountValue] = useState(10)
  const [minOrder, setMinOrder] = useState(0)
  const [maxUses, setMaxUses] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCoupons(data || [])
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to load coupons.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  )

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return toast.error('Coupon code is required.')
    
    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('coupons')
        .insert([
          {
            code: code.trim().toUpperCase(),
            description: description || null,
            discount_type: discountType,
            discount_value: Number(discountValue),
            min_order_value: Number(minOrder),
            max_uses: maxUses ? Number(maxUses) : null,
            expiry_date: expiryDate ? new Date(expiryDate).toISOString() : null,
            active: true,
          },
        ])

      if (error) throw error
      
      toast.success('Coupon created successfully!')
      setShowModal(false)
      // Reset form
      setCode('')
      setDescription('')
      setDiscountType('percentage')
      setDiscountValue(10)
      setMinOrder(0)
      setMaxUses('')
      setExpiryDate('')
      
      fetchCoupons()
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Failed to create coupon.')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleCouponActive = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('coupons')
        .update({ active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      
      setCoupons((prev) =>
        prev.map((c) => (c.id === id ? { ...c, active: !currentStatus } : c))
      )
      toast.success(!currentStatus ? 'Coupon activated!' : 'Coupon deactivated!')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to update coupon status.')
    }
  }

  const handleDeleteCoupon = async (id: number) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return

    try {
      const { error } = await supabase.from('coupons').delete().eq('id', id)
      if (error) throw error
      setCoupons((prev) => prev.filter((c) => c.id !== id))
      toast.success('Coupon deleted.')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to delete coupon.')
    }
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Coupons</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-0.5">
            Manage discount codes for the checkout
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8721C] text-[#0F0603] text-sm font-semibold px-4 py-2.5 rounded-lg hover:from-[#E4B027] hover:to-[#F0882C] transition-all shadow-md shadow-[#D4A017]/10"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5EDD8]/30" />
        <input
          type="text"
          placeholder="Search coupons by code or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/25 focus:outline-none focus:border-[#D4A017]/40 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
        />
      </div>

      {/* Table List */}
      <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-8 h-8 animate-spin text-[#D4A017] mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-xs text-[#F5EDD8]/45">Loading coupon codes…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Tag className="w-10 h-10 text-[#D4A017]/30 mb-3" />
            <p className="text-[#F5EDD8]/40 text-sm">No coupons found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4A017]/10 text-xs font-semibold uppercase tracking-wider text-[#F5EDD8]/30">
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Min Order</th>
                  <th className="px-6 py-4">Uses</th>
                  <th className="px-6 py-4">Expires</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A017]/5 text-sm text-[#F5EDD8]/80">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#D4A017]/3 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="inline-block bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#D4A017] font-mono font-bold px-2.5 py-1 rounded text-sm w-fit uppercase tracking-wider">
                          {c.code}
                        </span>
                        {c.description && (
                          <span className="text-[#F5EDD8]/40 text-xs mt-1">{c.description}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#F5EDD8]">
                      {c.discount_type === 'percentage' ? `${c.discount_value}%` : `₹${c.discount_value}`} Off
                    </td>
                    <td className="px-6 py-4 text-[#F5EDD8]/60">
                      ₹{c.min_order_value}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[#F5EDD8]/60">
                        {c.uses_count} {c.max_uses ? `/ ${c.max_uses}` : 'uses'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {c.expiry_date ? (
                        <span className="flex items-center gap-1.5 text-xs text-[#F5EDD8]/50">
                          <Calendar className="w-3.5 h-3.5 text-[#D4A017]/50" />
                          {new Date(c.expiry_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      ) : (
                        <span className="text-[#F5EDD8]/20">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleCouponActive(c.id, c.active)}
                        className="flex items-center gap-1 text-xs"
                      >
                        {c.active ? (
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
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteCoupon(c.id)}
                        className="text-[#8B1A1A] hover:text-red-400 p-1.5 rounded-lg hover:bg-[#8B1A1A]/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1A0C06] border border-[#D4A017]/20 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <h3 className="font-serif text-[#F5EDD8] text-lg font-bold mb-4">Create New Coupon</h3>
            
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">COUPON CODE (UPPERCASE)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. LAUNCH20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/20 focus:outline-none focus:border-[#D4A017]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">DESCRIPTION</label>
                <input
                  type="text"
                  placeholder="e.g. 20% off on launch products"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/20 focus:outline-none focus:border-[#D4A017]/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">DISCOUNT TYPE</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">VALUE</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">MIN ORDER (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={minOrder}
                    onChange={(e) => setMinOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#D4A017] mb-1">MAX USES (OPTIONAL)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Unlimited"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4A017] mb-1">EXPIRY DATE (OPTIONAL)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-[#D4A017]/20 text-[#F5EDD8]/60 hover:bg-[#D4A017]/5 px-4 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-[#D4A017] to-[#E8721C] text-[#0F0603] text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
