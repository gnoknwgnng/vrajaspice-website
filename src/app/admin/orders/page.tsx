'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// ── Types ────────────────────────────────────────────────────────────────────
type OrderStatus = 'Pending' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled'

interface Order {
  id: string
  orderNumber: string
  customer: string
  items: string
  amount: number
  payment: string
  paymentStatus: string
  status: OrderStatus
  date: string
  awbNumber?: string
  icarryShipmentId?: string
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

// Map DB order_status strings to our OrderStatus type
function mapOrderStatus(status: string): OrderStatus {
  const map: Record<string, OrderStatus> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    packed: 'Packed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }
  return map[status?.toLowerCase()] ?? 'Pending'
}

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
  orderId,
  current,
  onChange,
}: {
  orderId: string
  current: OrderStatus
  onChange: (s: OrderStatus) => void
}) {
  const [saving, setSaving] = useState(false)

  const handleChange = async (newStatus: OrderStatus) => {
    setSaving(true)
    const dbStatus = newStatus.toLowerCase()
    await supabase.from('orders').update({ order_status: dbStatus }).eq('id', orderId)
    onChange(newStatus)
    setSaving(false)
  }

  return (
    <div className="relative">
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value as OrderStatus)}
        disabled={saving}
        className="appearance-none bg-[#1A0C06] border border-[#D4A017]/20 text-[#F5EDD8] text-xs rounded-lg pl-2 pr-6 py-1.5 focus:outline-none focus:border-[#D4A017]/50 cursor-pointer disabled:opacity-50"
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
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All')
  const [orderStatuses, setOrderStatuses] = useState<Record<string, OrderStatus>>({})
  const [shippingLoadingId, setShippingLoadingId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          total_amount,
          payment_method,
          payment_status,
          order_status,
          created_at,
          awb_number,
          icarry_shipment_id,
          customers ( full_name ),
          order_items ( product_name, quantity )
        `)
        // Only show fully paid orders (filter out ghost awaiting_payment records)
        .eq('payment_status', 'paid')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return
      }

      const mapped: Order[] = (data || []).map((o: any) => {
        const itemSummary = (o.order_items || [])
          .map((i: any) => `${i.product_name} ×${i.quantity}`)
          .join(', ')

        return {
          id: o.id.toString(),
          orderNumber: o.order_number,
          customer: o.customers?.full_name || 'Guest',
          items: itemSummary || '—',
          amount: Number(o.total_amount),
          payment: o.payment_method?.toUpperCase() || 'ONLINE',
          paymentStatus: o.payment_status,
          status: mapOrderStatus(o.order_status),
          awbNumber: o.awb_number || undefined,
          icarryShipmentId: o.icarry_shipment_id || undefined,
          date: new Date(o.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        }
      })

      setOrders(mapped)
    } finally {
      setLoading(false)
    }
  }

  // ── Ship with iCarry Action ────────────────────────────────────────────────
  const handleShipOrder = async (orderId: string) => {
    setShippingLoadingId(orderId)
    try {
      const res = await fetch('/api/icarry/create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        if (!result.awb) {
          alert(`Shipment booked, but Direct API is deactivated in iCarry settings. Please enter the AWB manually.`)
        } else {
          alert(`Shipment booked successfully! AWB: ${result.awb}`)
        }
        fetchOrders()
      } else {
        alert(`Error booking shipment: ${result.error}`)
      }
    } catch (err: any) {
      alert(`Booking failed: ${err.message}`)
    } finally {
      setShippingLoadingId(null)
    }
  }

  // ── Save AWB Manually Action ──────────────────────────────────────────────
  const handleSaveAwb = async (orderId: string, awb: string) => {
    if (!awb.trim()) return
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          awb_number: awb.trim(),
          icarry_shipment_id: awb.trim(), // fallback shipment id to AWB itself for tracking lookup
          order_status: 'shipped',
          tracking_status: 'in_transit'
        })
        .eq('id', orderId)

      if (error) throw error
      alert('AWB saved successfully!')
      fetchOrders()
    } catch (err: any) {
      alert(`Failed to save AWB: ${err.message}`)
    }
  }

  const filteredOrders = orders.filter((o) => {
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
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="text-xs text-[#D4A017]/60 hover:text-[#D4A017] transition-colors border border-[#D4A017]/20 rounded-lg px-3 py-1.5 hover:border-[#D4A017]/40"
          >
            ↻ Refresh
          </button>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#F5EDD8]/40">Live orders</span>
          </div>
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
        <div className="hidden xl:grid grid-cols-[110px_80px_1fr_1fr_90px_110px_130px_90px_120px] gap-3 px-5 py-3 border-b border-[#D4A017]/10">
          {['Order #', 'ID', 'Customer', 'Items', 'Amount', 'Payment', 'Status', 'Date', 'Update'].map((h) => (
            <p key={h} className="text-[#F5EDD8]/30 text-xs font-medium uppercase tracking-wider">
              {h}
            </p>
          ))}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin w-6 h-6 text-[#D4A017]/60" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <p className="text-[#F5EDD8]/30 text-sm">Loading orders…</p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-[#D4A017]/8 flex items-center justify-center mb-4">
              <ShoppingCart className="w-7 h-7 text-[#D4A017]/40" />
            </div>
            <p className="text-[#F5EDD8]/50 text-sm font-medium">
              {activeFilter === 'All' ? 'No paid orders yet' : `No ${activeFilter} orders`}
            </p>
            <p className="text-[#F5EDD8]/25 text-xs mt-1.5 max-w-xs">
              {activeFilter === 'All'
                ? 'Completed orders will appear here once customers finish payment.'
                : 'Switch to a different filter to see other orders.'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#D4A017]/5">
            {filteredOrders.map((order) => {
              const currentStatus = orderStatuses[order.id] ?? order.status
              return (
                <li key={order.id} className="hover:bg-[#D4A017]/3 transition-colors">
                  {/* Desktop row */}
                  <div className="hidden xl:grid grid-cols-[110px_80px_1fr_1fr_90px_110px_130px_90px_150px] gap-3 items-center px-5 py-3.5">
                    <p className="text-[#D4A017] text-xs font-mono font-semibold truncate">{order.orderNumber}</p>
                    <p className="text-[#F5EDD8]/30 text-xs font-mono">#{order.id}</p>
                    <p className="text-[#F5EDD8] text-sm truncate">{order.customer}</p>
                    <p className="text-[#F5EDD8]/60 text-xs truncate">{order.items}</p>
                    <p className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount}</p>
                    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wide w-fit
                      ${order.payment === 'COD' ? 'bg-[#E8721C]/10 text-[#E8721C] border-[#E8721C]/30' : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'}
                    `}>
                      {order.payment}
                    </span>
                    <div>
                      <StatusBadge status={currentStatus} />
                      {order.awbNumber && (
                        <p className="text-[10px] text-[#22C55E] font-mono mt-0.5">AWB: {order.awbNumber}</p>
                      )}
                    </div>
                    <p className="text-[#F5EDD8]/40 text-xs">{order.date}</p>
                    <div className="flex items-center gap-2">
                      <StatusDropdown
                        orderId={order.id}
                        current={currentStatus}
                        onChange={(s) => updateStatus(order.id, s)}
                      />
                      {(!order.awbNumber || order.awbNumber === 'null' || order.awbNumber.trim() === '') && currentStatus !== 'Cancelled' && currentStatus !== 'Delivered' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleShipOrder(order.id)}
                            disabled={shippingLoadingId === order.id}
                            className="bg-[#22C55E] hover:bg-[#16a34a] text-white text-[10px] font-bold px-2 py-1.5 rounded-lg disabled:opacity-50 transition-colors whitespace-nowrap"
                          >
                            {shippingLoadingId === order.id ? 'Booking...' : '🚢 Ship'}
                          </button>
                          <button
                            onClick={() => {
                              const val = prompt('Enter iCarry AWB tracking number manually:')
                              if (val && val.trim()) {
                                handleSaveAwb(order.id, val)
                              }
                            }}
                            className="bg-[#8B4513] hover:bg-[#6B330E] text-[#F5EDD8] text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          >
                            ✏️ AWB
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="xl:hidden px-4 py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-[#D4A017] text-xs font-mono font-semibold">{order.orderNumber}</p>
                        <p className="text-[#F5EDD8]/30 text-[10px] font-mono">#{order.id}</p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={currentStatus} />
                        {order.awbNumber && (
                          <p className="text-[9px] text-[#22C55E] font-mono mt-0.5">AWB: {order.awbNumber}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-[#F5EDD8] text-sm font-medium">{order.customer}</p>
                    <p className="text-[#F5EDD8]/40 text-xs mt-0.5">{order.items}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[#F5EDD8] text-sm font-semibold">₹{order.amount}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase
                          ${order.payment === 'COD' ? 'bg-[#E8721C]/10 text-[#E8721C] border-[#E8721C]/30' : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30'}
                        `}>
                          {order.payment}
                        </span>
                        <span className="text-[#F5EDD8]/30 text-xs">{order.date}</span>
                      </div>
                      {(!order.awbNumber || order.awbNumber === 'null' || order.awbNumber.trim() === '') && currentStatus !== 'Cancelled' && currentStatus !== 'Delivered' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleShipOrder(order.id)}
                            disabled={shippingLoadingId === order.id}
                            className="bg-[#22C55E] hover:bg-[#16a34a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
                          >
                            {shippingLoadingId === order.id ? 'Booking...' : '🚢 Book iCarry'}
                          </button>
                          <button
                            onClick={() => {
                              const val = prompt('Enter iCarry AWB tracking number manually:')
                              if (val && val.trim()) {
                                handleSaveAwb(order.id, val)
                              }
                            }}
                            className="bg-[#8B4513] hover:bg-[#6B330E] text-[#F5EDD8] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            ✏️ Manual
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <StatusDropdown
                        orderId={order.id}
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
