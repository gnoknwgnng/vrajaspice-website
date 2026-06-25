'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { supabase } from '@/lib/supabase'
import { Search, Mail, Users, Calendar, Trash2, Download } from 'lucide-react'
import toast from 'react-hot-toast'

interface Subscriber {
  id: number
  name: string | null
  email: string
  whatsapp_number: string | null
  whatsapp_opt_in: boolean
  created_at: string
}

export default function NewsletterPage() {
  const [search, setSearch] = useState('')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setSubscribers(data || [])
      } catch (err: any) {
        console.error(err)
        toast.error('Failed to load newsletter subscribers.')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  const filtered = subscribers.filter((s) =>
    (s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.whatsapp_number && s.whatsapp_number.includes(search))
  )

  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return

    try {
      const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id)
      if (error) throw error
      setSubscribers((prev) => prev.filter((s) => s.id !== id))
      toast.success('Subscriber removed.')
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to remove subscriber.')
    }
  }

  // Export subscribers to CSV file
  const handleExportCSV = () => {
    if (subscribers.length === 0) return toast.error('No subscribers to export.')

    const headers = ['Name', 'Email', 'WhatsApp Number', 'WhatsApp Opt-In', 'Subscription Date']
    const rows = subscribers.map((s) => [
      s.name || '',
      s.email,
      s.whatsapp_number || '',
      s.whatsapp_opt_in ? 'Yes' : 'No',
      new Date(s.created_at).toISOString(),
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `vrajaspice_newsletter_subscribers_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('CSV export completed successfully!')
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Newsletter Subscribers</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-0.5">
            {subscribers.length} total leads collected
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-[#0F0603] border border-[#D4A017]/25 text-[#D4A017] hover:bg-[#D4A017]/10 text-sm font-semibold px-4 py-2.5 rounded-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5EDD8]/30" />
        <input
          type="text"
          placeholder="Search subscribers by name, email or WhatsApp…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#0F0603] border border-[#D4A017]/15 rounded-lg text-sm text-[#F5EDD8] placeholder-[#F5EDD8]/25 focus:outline-none focus:border-[#D4A017]/40 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
        />
      </div>

      {/* Table list */}
      <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <svg className="w-8 h-8 animate-spin text-[#D4A017] mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-xs text-[#F5EDD8]/45">Loading subscriber list…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mail className="w-10 h-10 text-[#D4A017]/30 mb-3" />
            <p className="text-[#F5EDD8]/40 text-sm">No subscribers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D4A017]/10 text-xs font-semibold uppercase tracking-wider text-[#F5EDD8]/30">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">WhatsApp</th>
                  <th className="px-6 py-4">WhatsApp Opt-In</th>
                  <th className="px-6 py-4">Subscribed Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A017]/5 text-sm text-[#F5EDD8]/80">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-[#D4A017]/3 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#F5EDD8]">
                      {s.name || <span className="text-[#F5EDD8]/20">—</span>}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {s.email}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {s.whatsapp_number || <span className="text-[#F5EDD8]/20">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      {s.whatsapp_opt_in ? (
                        <span className="inline-flex items-center gap-1 text-xs text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded-full font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-[#F5EDD8]/30 bg-[#F5EDD8]/5 border border-[#F5EDD8]/10 px-2 py-0.5 rounded-full">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-[#F5EDD8]/50">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(s.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteSubscriber(s.id)}
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
    </AdminLayout>
  )
}
