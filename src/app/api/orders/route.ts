import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      customerId,
      customerName,
      mobile,
      email,
      shippingAddress,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
    } = body

    // 1. Generate Order Number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`

    // 2. Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.log('Supabase is not configured. Mocking order placement.')
      return NextResponse.json({
        success: true,
        orderId: `mock-${Date.now()}`,
        orderNumber,
        message: 'Order placed successfully (Mock Mode)',
      })
    }

    // 3. Resolve Customer ID
    let resolvedCustomerId = customerId

    if (!resolvedCustomerId) {
      // Check if customer with this email already exists
      const { data: existingCustomer, error: findError } = await supabase
        .from('customers')
        .select('id')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle()

      if (!findError && existingCustomer) {
        resolvedCustomerId = existingCustomer.id
      } else {
        // Create new guest customer
        const { data: newCustomer, error: createError } = await supabase
          .from('customers')
          .insert([
            {
              full_name: customerName,
              email: email.trim().toLowerCase(),
              mobile,
            },
          ])
          .select('id')
          .single()

        if (createError) {
          console.error('Error creating guest customer:', createError.message)
          throw new Error('Failed to associate order with customer profile')
        }
        resolvedCustomerId = newCustomer.id
      }
    }

    // 3.5. Save Address to Saved Addresses if Registered Customer
    if (resolvedCustomerId && shippingAddress) {
      try {
        const { data: existingAddress, error: addressFindError } = await supabase
          .from('addresses')
          .select('id')
          .eq('customer_id', resolvedCustomerId)
          .eq('line1', shippingAddress.address1.trim())
          .eq('city', shippingAddress.city.trim())
          .eq('pin_code', shippingAddress.pinCode.trim())
          .maybeSingle()

        if (!addressFindError && !existingAddress) {
          await supabase
            .from('addresses')
            .insert([
              {
                customer_id: resolvedCustomerId,
                line1: shippingAddress.address1.trim(),
                line2: shippingAddress.address2 ? shippingAddress.address2.trim() : null,
                city: shippingAddress.city.trim(),
                state: shippingAddress.state.trim(),
                pin_code: shippingAddress.pinCode.trim(),
                country: 'India',
              }
            ])
        }
      } catch (addrErr) {
        console.error('Error auto-saving shipping address:', addrErr)
      }
    }

    // 4. Create Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_id: resolvedCustomerId,
          order_number: orderNumber,
          subtotal,
          shipping_charge: shipping,
          total_amount: total,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'cod' ? 'pending' : 'awaiting_payment',
          order_status: 'pending',
          shipping_address: shippingAddress,
        },
      ])
      .select('id')
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError.message)
      throw orderError
    }

    const orderId = orderData.id

    // 5. Insert Order Items
    const orderItemsPayload = items.map((item: any) => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.productName,
      product_slug: item.productId ? null : item.productName.toLowerCase().replace(/\s+/g, '-'),
      quantity: item.quantity,
      unit_price: item.sellingPrice,
      total_price: item.sellingPrice * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsPayload)

    if (itemsError) {
      console.error('Error creating order items:', itemsError.message)
      throw itemsError
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
    })
  } catch (err: any) {
    console.error('Error placing order:', err)
    return NextResponse.json({ success: false, error: err.message || 'Failed to place order' }, { status: 500 })
  }
}
