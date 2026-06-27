'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/admin/AdminLayout'
import {
  ShoppingCart,
  IndianRupee,
  Clock,
  Truck,
  Package,
  Mail,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────
interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  codOrders: number
  products: number
  newsletterLeads: number
  recentOrders: RecentOrder[]
}

interface RecentOrder {
  id: string
  orderNumber: string
  customer: string
  amount: number
  payment: string
  status: string
  date: string
}

// ── Stat card types ────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string
  icon: React.ElementType
  accent: string
  sub?: string
  loading?: boolean
}

function StatCard({ label, value, icon: Icon, accent, sub, loading }: StatCardProps) {
  return (
    <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl p-5 flex items-start gap-4 hover:border-[#D4A017]/25 transition-colors">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-[#F5EDD8]/50 text-xs font-medium uppercase tracking-wider truncate">{label}</p>
        {loading ? (
          <div className="h-7 w-20 bg-[#D4A017]/10 rounded animate-pulse mt-0.5" />
        ) : (
          <p className="text-[#F5EDD8] text-2xl font-serif font-bold mt-0.5">{value}</p>
        )}
        {sub && <p className="text-[#F5EDD8]/30 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Quick link card ────────────────────────────────────────────────────────────
interface QuickLinkProps {
  href: string
  label: string
  description: string
  icon: React.ElementType
}

function QuickLink({ href, label, description, icon: Icon }: QuickLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 bg-[#0F0603] border border-[#D4A017]/10 rounded-xl p-4 hover:border-[#D4A017]/30 hover:bg-[#D4A017]/5 transition-all duration-150"
    >
      <div className="w-10 h-10 rounded-lg bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center justify-center shrink-0 group-hover:bg-[#D4A017]/20 transition-colors">
        <Icon className="w-4 h-4 text-[#D4A017]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#F5EDD8] text-sm font-semibold">{label}</p>
        <p className="text-[#F5EDD8]/40 text-xs truncate">{description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-[#F5EDD8]/20 group-hover:text-[#D4A017] group-hover:translate-x-0.5 transition-all" />
    </Link>
  )
}

// ── Status badge ───────────────────────────────────────────────────────────────
const statusColors: Record<string, { text: string; bg: string }> = {
  pending:   { text: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
  confirmed: { text: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10' },
  packed:    { text: 'text-[#D4A017]', bg: 'bg-[#8B4513]/15' },
  shipped:   { text: 'text-[#E8721C]', bg: 'bg-[#E8721C]/10' },
  delivered: { text: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
  cancelled: { text: 'text-[#F87171]', bg: 'bg-[#8B1A1A]/15' },
}

function OrderStatusBadge({ status }: { status: string }) {
  const s = status?.toLowerCase() || 'pending'
  const cfg = statusColors[s] ?? { text: 'text-[#F5EDD8]/60', bg: 'bg-[#F5EDD8]/5' }
  return (
    <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${cfg.bg} ${cfg.text}`}>
      {status}
    </span>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchStats() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/stats')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: DashboardStats = await res.json()
      setStats(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatRevenue = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const statCards: StatCardProps[] = [
    {
      label: 'Total Orders',
      value: String(stats?.totalOrders ?? 0),
      icon: ShoppingCart,
      accent: '#D4A017',
      sub: stats?.totalOrders === 0 ? 'Awaiting first order' : `${stats?.totalOrders} paid order${(stats?.totalOrders ?? 0) !== 1 ? 's' : ''}`,
      loading,
    },
    {
      label: 'Total Revenue',
      value: formatRevenue(stats?.totalRevenue ?? 0),
      icon: IndianRupee,
      accent: '#22C55E',
      sub: 'Lifetime earnings',
      loading,
    },
    {
      label: 'Pending Orders',
      value: String(stats?.pendingOrders ?? 0),
      icon: Clock,
      accent: '#F59E0B',
      sub: stats?.pendingOrders === 0 ? 'All caught up!' : 'Needs attention',
      loading,
    },
    {
      label: 'COD Orders',
      value: String(stats?.codOrders ?? 0),
      icon: Truck,
      accent: '#E8721C',
      sub: 'Cash on delivery',
      loading,
    },
    {
      label: 'Products',
      value: String(stats?.products ?? 0),
      icon: Package,
      accent: '#8B4513',
      sub: 'Active in catalogue',
      loading,
    },
    {
      label: 'Newsletter Leads',
      value: String(stats?.newsletterLeads ?? 0),
      icon: Mail,
      accent: '#8B1A1A',
      sub: 'Subscribers collected',
      loading,
    },
  ]

  const quickLinks: QuickLinkProps[] = [
    {
      href: '/admin/products',
      label: 'Add Product',
      description: 'Create a new spice product listing',
      icon: Plus,
    },
    {
      href: '/admin/orders',
      label: 'View Orders',
      description: 'Manage and fulfil customer orders',
      icon: ShoppingCart,
    },
    {
      href: '/admin/customers',
      label: 'View Customers',
      description: 'Browse customer profiles and history',
      icon: TrendingUp,
    },
    {
      href: '/admin/newsletter',
      label: 'Export Leads',
      description: 'Download newsletter subscribers as CSV',
      icon: Mail,
    },
  ]

  return (
    <AdminLayout>
      {/* Page heading */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-1">
            Welcome back — here&apos;s your store at a glance.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="text-xs text-[#D4A017]/60 hover:text-[#D4A017] transition-colors border border-[#D4A017]/20 rounded-lg px-3 py-1.5 hover:border-[#D4A017]/40 disabled:opacity-40"
        >
          ↻ Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 bg-[#8B1A1A]/20 border border-[#F87171]/30 rounded-xl px-5 py-3 text-[#F87171] text-sm flex items-center gap-2">
          <span>⚠</span>
          <span>Could not load live data: {error}</span>
          <button onClick={fetchStats} className="ml-auto underline text-xs hover:text-white">
            Retry
          </button>
        </div>
      )}

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4A017]/10">
              <h2 className="text-[#F5EDD8] font-serif text-base font-semibold">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="flex items-center gap-1.5 text-[#D4A017] text-xs font-medium hover:text-[#E4B027] transition-colors"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Table header */}
            <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 border-b border-[#D4A017]/5">
              {['Order #', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                <p key={h} className="text-[#F5EDD8]/30 text-xs font-medium uppercase tracking-wider">
                  {h}
                </p>
              ))}
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="space-y-0 divide-y divide-[#D4A017]/5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 px-5 py-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 bg-[#D4A017]/8 rounded animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
            ) : !stats?.recentOrders?.length ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#D4A017]/10 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-[#D4A017]/60" />
                </div>
                <p className="text-[#F5EDD8]/50 text-sm font-medium">No orders yet</p>
                <p className="text-[#F5EDD8]/25 text-xs mt-1 max-w-xs">
                  Orders will appear here once customers start purchasing from your store.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[#D4A017]/5">
                {stats.recentOrders.map((order) => (
                  <li key={order.id} className="hover:bg-[#D4A017]/3 transition-colors">
                    <div className="hidden sm:grid grid-cols-5 gap-4 items-center px-5 py-3.5">
                      <p className="text-[#D4A017] text-xs font-mono font-semibold truncate">{order.orderNumber}</p>
                      <p className="text-[#F5EDD8] text-sm truncate">{order.customer}</p>
                      <p className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount.toLocaleString('en-IN')}</p>
                      <OrderStatusBadge status={order.status} />
                      <p className="text-[#F5EDD8]/40 text-xs">{order.date}</p>
                    </div>
                    {/* Mobile card */}
                    <div className="sm:hidden px-4 py-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-[#D4A017] text-xs font-mono font-semibold">{order.orderNumber}</p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="text-[#F5EDD8] text-sm">{order.customer}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount.toLocaleString('en-IN')}</span>
                        <span className="text-[#F5EDD8]/40 text-xs">{order.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#D4A017]/10">
              <h2 className="text-[#F5EDD8] font-serif text-base font-semibold">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              {quickLinks.map((ql) => (
                <QuickLink key={ql.href} {...ql} />
              ))}
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-1">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#F5EDD8]/30 text-xs">Live data from Supabase</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
