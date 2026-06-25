'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { Search, Users, Mail, Phone, Calendar, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Customer {
  id: number
  full_name: string
  email: string | null
  mobile: string | null
  whatsapp_number: string | null
  created_at: string
}

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setCustomers(data || [])
      } catch (err: any) {
        console.error('Error fetching customers:', err.message)
        toast.error('Failed to load customers from database.')
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  const filtered = customers.filter((c) =>
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
    (c.mobile && c.mobile.includes(search))
  )

  const handleDeleteCustomer = async (id: number) => {
    if (!confirm('Are you sure you want to delete this customer profile? This will not delete their auth login but will remove their customer profile record.')) return

    try {
      const { error } = await supabase.from('customers').delete().eq('id', id)
      if (error) throw error
      setCustomers((prev) => prev.filter((c) => c.id !== id))
      toast.success('Customer profile deleted successfully.')
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || 'Failed to delete customer.')
    }
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Customers</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-0.5">
            {customers.length} registered customer profiles
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5EDD8]/30" />
        <input
          type="text"
          placeholder="Search customers by name, email or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/25 focus:outline-none focus:border-[#D4A017]/40 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
        />
      </div>

      {/* Table/List */}
      <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-8 h-8 animate-spin text-[#D4A017] mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-xs text-[#F5EDD8]/45">Loading customer list…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-10 h-10 text-[#D4A017]/30 mb-3" />
            <p className="text-[#F5EDD8]/40 text-sm">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="w-full text-left border-collapse hidden md:table">
              <thead>
                <tr className="border-b border-[#D4A017]/10 text-xs font-semibold uppercase tracking-wider text-[#F5EDD8]/30">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">WhatsApp</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A017]/5 text-sm text-[#F5EDD8]/80">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-[#D4A017]/3 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8B1A1A] text-[#F5EDD8] flex items-center justify-center font-serif text-sm font-bold shadow-md">
                        {c.full_name?.charAt(0).toUpperCase() || 'C'}
                      </div>
                      <span className="font-medium text-[#F5EDD8]">{c.full_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      {c.email ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <Mail className="w-3.5 h-3.5 text-[#D4A017]/50" />
                          {c.email}
                        </span>
                      ) : (
                        <span className="text-[#F5EDD8]/20">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {c.mobile ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <Phone className="w-3.5 h-3.5 text-[#D4A017]/50" />
                          {c.mobile}
                        </span>
                      ) : (
                        <span className="text-[#F5EDD8]/20">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {c.whatsapp_number ? (
                        <span className="flex items-center gap-1.5 text-xs text-[#22C55E]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                          {c.whatsapp_number}
                        </span>
                      ) : (
                        <span className="text-[#F5EDD8]/20">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#F5EDD8]/50">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(c.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteCustomer(c.id)}
                        className="text-[#8B1A1A] hover:text-red-400 p-1.5 rounded-lg hover:bg-[#8B1A1A]/10 transition-colors"
                        title="Delete profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#D4A017]/10">
              {filtered.map((c) => (
                <div key={c.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#8B1A1A] text-[#F5EDD8] flex items-center justify-center font-serif text-sm font-bold shadow-md">
                        {c.full_name?.charAt(0).toUpperCase() || 'C'}
                      </div>
                      <span className="font-semibold text-[#F5EDD8]">{c.full_name}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteCustomer(c.id)}
                      className="text-[#8B1A1A] hover:text-red-400 p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 text-xs text-[#F5EDD8]/60 pl-12">
                    {c.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#D4A017]/50" />
                        {c.email}
                      </p>
                    )}
                    {c.mobile && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#D4A017]/50" />
                        {c.mobile}
                      </p>
                    )}
                    {c.whatsapp_number && (
                      <p className="flex items-center gap-2 text-[#22C55E]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        {c.whatsapp_number} (WhatsApp)
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-[#F5EDD8]/30">
                      <Calendar className="w-3.5 h-3.5" />
                      Joined {new Date(c.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
