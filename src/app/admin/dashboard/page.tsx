'use client'

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
  AlertTriangle,
} from 'lucide-react'
import { products } from '@/lib/products'

// ── Stat card types ──────────────────────────────────────────────────────────
interface StatCardProps {
  label: string
  value: string
  icon: React.ElementType
  accent: string
  sub?: string
}

function StatCard({ label, value, icon: Icon, accent, sub }: StatCardProps) {
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
        <p className="text-[#F5EDD8] text-2xl font-serif font-bold mt-0.5">{value}</p>
        {sub && <p className="text-[#F5EDD8]/30 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Quick link card ──────────────────────────────────────────────────────────
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

// ── Low stock alert ──────────────────────────────────────────────────────────
const LOW_STOCK_THRESHOLD = 20

export default function DashboardPage() {
  const lowStockProducts = products.filter((p) => p.stockQuantity <= LOW_STOCK_THRESHOLD)

  const stats: StatCardProps[] = [
    {
      label: 'Total Orders',
      value: '0',
      icon: ShoppingCart,
      accent: '#D4A017',
      sub: 'Awaiting first order',
    },
    {
      label: 'Total Revenue',
      value: '₹0',
      icon: IndianRupee,
      accent: '#22C55E',
      sub: 'Lifetime earnings',
    },
    {
      label: 'Pending Orders',
      value: '0',
      icon: Clock,
      accent: '#F59E0B',
      sub: 'Needs attention',
    },
    {
      label: 'COD Orders',
      value: '0',
      icon: Truck,
      accent: '#E8721C',
      sub: 'Cash on delivery',
    },
    {
      label: 'Products',
      value: String(products.length),
      icon: Package,
      accent: '#8B4513',
      sub: 'Active in catalogue',
    },
    {
      label: 'Newsletter Leads',
      value: '0',
      icon: Mail,
      accent: '#8B1A1A',
      sub: 'Subscribers collected',
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
      <div className="mb-8">
        <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-[#F5EDD8]/40 text-sm mt-1">
          Welcome back — here&apos;s your store at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
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

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#D4A017]/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-[#D4A017]/60" />
              </div>
              <p className="text-[#F5EDD8]/50 text-sm font-medium">No orders yet</p>
              <p className="text-[#F5EDD8]/25 text-xs mt-1 max-w-xs">
                Orders will appear here once customers start purchasing from your store.
              </p>
            </div>
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

          {/* Low Stock Alerts */}
          <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#D4A017]/10">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <h2 className="text-[#F5EDD8] font-serif text-base font-semibold">Low Stock</h2>
            </div>
            <div className="p-4">
              {lowStockProducts.length === 0 ? (
                <p className="text-[#F5EDD8]/30 text-xs text-center py-4">
                  All products are well-stocked ✓
                </p>
              ) : (
                <ul className="space-y-2">
                  {lowStockProducts.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-lg px-3 py-2"
                    >
                      <p className="text-[#F5EDD8]/80 text-xs font-medium truncate pr-2">{p.name}</p>
                      <span className="text-[#F59E0B] text-xs font-bold shrink-0">
                        {p.stockQuantity} left
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
