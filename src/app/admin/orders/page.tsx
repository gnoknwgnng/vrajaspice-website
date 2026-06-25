'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { ShoppingCart, ChevronDown } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled'
type PaymentMethod = 'COD' | 'Online' | 'UPI'

interface Order {
  id: string
  customer: string
  items: string
  amount: number
  payment: PaymentMethod
  status: OrderStatus
  date: string
}

// ── Status styling ───────────────────────────────────────────────────────────
const statusConfig: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  Pending:   { bg: 'bg-[#F59E0B]/10',  text: 'text-[#F59E0B]',  border: 'border-[#F59E0B]/30'  },
  Confirmed: { bg: 'bg-[#3B82F6]/10',  text: 'text-[#3B82F6]',  border: 'border-[#3B82F6]/30'  },
  Packed:    { bg: 'bg-[#8B4513]/15',  text: 'text-[#D4A017]',  border: 'border-[#D4A017]/30'  },
  Shipped:   { bg: 'bg-[#E8721C]/10',  text: 'text-[#E8721C]',  border: 'border-[#E8721C]/30'  },
  Delivered: { bg: 'bg-[#22C55E]/10',  text: 'text-[#22C55E]',  border: 'border-[#22C55E]/30'  },
  Cancelled: { bg: 'bg-[#8B1A1A]/15',  text: 'text-[#F87171]',  border: 'border-[#8B1A1A]/40'  },
}

const ALL_STATUSES: OrderStatus[] = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled']
const FILTER_TABS = ['All', ...ALL_STATUSES] as const
type FilterTab = typeof FILTER_TABS[number]

// ── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
  const { bg, text, border } = statusConfig[status]
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${bg} ${text} ${border} uppercase tracking-wide`}>
      {status}
    </span>
  )
}

// ── Status dropdown ──────────────────────────────────────────────────────────
function StatusDropdown({
  current,
  onChange,
}: {
  current: OrderStatus
  onChange: (s: OrderStatus) => void
}) {
  return (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => onChange(e.target.value as OrderStatus)}
        className="appearance-none bg-[#1A0C06] border border-[#D4A017]/20 text-[#F5EDD8] text-xs rounded-lg pl-2 pr-6 py-1.5 focus:outline-none focus:border-[#D4A017]/50 cursor-pointer"
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#F5EDD8]/40 pointer-events-none" />
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
// Placeholder orders — will come from Supabase in production
const MOCK_ORDERS: Order[] = []

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [orderStatuses, setOrderStatuses] = useState<Record<string, OrderStatus>>({})

  const filteredOrders = MOCK_ORDERS.filter((o) => {
    if (activeFilter === 'All') return true
    const current = orderStatuses[o.id] ?? o.status
    return current === activeFilter
  })

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrderStatuses((prev) => ({ ...prev, [id]: status }))
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#F5EDD8] font-serif text-2xl sm:text-3xl font-bold">Orders</h1>
          <p className="text-[#F5EDD8]/40 text-sm mt-0.5">
            Manage and fulfil customer orders
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[#F5EDD8]/40">Live orders</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap mb-5">
        {FILTER_TABS.map((tab) => {
          const active = activeFilter === tab
          const cfg = tab !== 'All' ? statusConfig[tab as OrderStatus] : null
          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={[
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150',
                active
                  ? cfg
                    ? `${cfg.bg} ${cfg.text} ${cfg.border} border`
                    : 'bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/25'
                  : 'text-[#F5EDD8]/40 hover:text-[#F5EDD8]/70 hover:bg-[#F5EDD8]/5',
              ].join(' ')}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-[#0F0603] border border-[#D4A017]/10 rounded-xl overflow-hidden">
        {/* Desktop header */}
        <div className="hidden xl:grid grid-cols-[100px_1fr_1fr_100px_110px_130px_100px_120px] gap-3 px-5 py-3 border-b border-[#D4A017]/10">
          {['Order #', 'Customer', 'Items', 'Amount', 'Payment', 'Status', 'Date', 'Update'].map((h) => (
            <p key={h} className="text-[#F5EDD8]/30 text-xs font-medium uppercase tracking-wider">
              {h}
            </p>
          ))}
        </div>

        {/* Rows or empty state */}
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#D4A017]/8 flex items-center justify-center mb-4">
              <ShoppingCart className="w-7 h-7 text-[#D4A017]/40" />
            </div>
            <p className="text-[#F5EDD8]/50 text-sm font-medium">
              {activeFilter === 'All' ? 'No orders yet' : `No ${activeFilter} orders`}
            </p>
            <p className="text-[#F5EDD8]/25 text-xs mt-1.5 max-w-xs">
              {activeFilter === 'All'
                ? 'Orders will appear here once customers start placing them.'
                : `Switch to a different filter to see other orders.`}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#D4A017]/5">
            {filteredOrders.map((order) => {
              const currentStatus = orderStatuses[order.id] ?? order.status
              return (
                <li key={order.id} className="hover:bg-[#D4A017]/3 transition-colors">
                  {/* Desktop row */}
                  <div className="hidden xl:grid grid-cols-[100px_1fr_1fr_100px_110px_130px_100px_120px] gap-3 items-center px-5 py-3.5">
                    <p className="text-[#D4A017] text-xs font-mono font-semibold">{order.id}</p>
                    <p className="text-[#F5EDD8] text-sm truncate">{order.customer}</p>
                    <p className="text-[#F5EDD8]/60 text-xs truncate">{order.items}</p>
                    <p className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount}</p>
                    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide w-fit
                      ${order.payment === 'COD' ? 'bg-[#E8721C]/10 text-[#E8721C] border-[#E8721C]/30' : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'}
                    `}>
                      {order.payment}
                    </span>
                    <StatusBadge status={currentStatus} />
                    <p className="text-[#F5EDD8]/40 text-xs">{order.date}</p>
                    <StatusDropdown
                      current={currentStatus}
                      onChange={(s) => updateStatus(order.id, s)}
                    />
                  </div>

                  {/* Mobile card */}
                  <div className="xl:hidden px-4 py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-[#D4A017] text-xs font-mono font-semibold">{order.id}</p>
                      <StatusBadge status={currentStatus} />
                    </div>
                    <p className="text-[#F5EDD8] text-sm font-medium">{order.customer}</p>
                    <p className="text-[#F5EDD8]/40 text-xs mt-0.5">{order.items}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase
                        ${order.payment === 'COD' ? 'bg-[#E8721C]/10 text-[#E8721C] border-[#E8721C]/30' : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'}
                      `}>
                        {order.payment}
                      </span>
                      <span className="text-[#F5EDD8]/30 text-xs">{order.date}</span>
                    </div>
                    <div className="mt-3">
                      <StatusDropdown
                        current={currentStatus}
                        onChange={(s) => updateStatus(order.id, s)}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {filteredOrders.length > 0 && (
        <p className="mt-4 text-[#F5EDD8]/20 text-xs text-right">
          Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
        </p>
      )}
    </AdminLayout>
  )
}
