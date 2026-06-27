import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service-role key for server-side admin queries (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
)

export async function GET() {
  try {
    // Run all queries in parallel for speed
    const [ordersRes, revenueRes, pendingRes, codRes, productsRes, newsletterRes] =
      await Promise.all([
        // Total paid orders count
        supabaseAdmin
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('payment_status', 'paid'),

        // Total revenue (sum of total_amount for paid orders)
        supabaseAdmin
          .from('orders')
          .select('total_amount')
          .eq('payment_status', 'paid'),

        // Pending orders (paid but not yet delivered/cancelled)
        supabaseAdmin
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('payment_status', 'paid')
          .in('order_status', ['pending', 'confirmed', 'packed', 'shipped']),

        // COD orders (paid + cod payment method)
        supabaseAdmin
          .from('orders')
          .select('id', { count: 'exact', head: true })
          .eq('payment_method', 'cod')
          .eq('payment_status', 'paid'),

        // Products count
        supabaseAdmin
          .from('products')
          .select('id', { count: 'exact', head: true }),

        // Newsletter subscribers count
        supabaseAdmin
          .from('newsletter_subscribers')
          .select('id', { count: 'exact', head: true }),
      ])

    // Calculate total revenue
    const totalRevenue = (revenueRes.data || []).reduce(
      (sum: number, row: any) => sum + Number(row.total_amount || 0),
      0,
    )

    // Fetch recent 5 orders with customer info
    const { data: recentOrdersData } = await supabaseAdmin
      .from('orders')
      .select(
        `
        id,
        order_number,
        total_amount,
        payment_method,
        order_status,
        created_at,
        customers ( full_name )
      `,
      )
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: false })
      .limit(5)

    const recentOrders = (recentOrdersData || []).map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number,
      customer: o.customers?.full_name || 'Guest',
      amount: Number(o.total_amount),
      payment: o.payment_method?.toUpperCase() || 'ONLINE',
      status: o.order_status,
      date: new Date(o.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }))

    return NextResponse.json({
      totalOrders: ordersRes.count ?? 0,
      totalRevenue,
      pendingOrders: pendingRes.count ?? 0,
      codOrders: codRes.count ?? 0,
      products: productsRes.count ?? 0,
      newsletterLeads: newsletterRes.count ?? 0,
      recentOrders,
    })
  } catch (err: any) {
    console.error('Admin stats error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to fetch stats' },
      { status: 500 },
    )
  }
}
