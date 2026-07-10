import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = body

    if (!orderId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: 'Missing required parameters' }, { status: 400 })
    }

    // 1. Retrieve the Secret Key from environment
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keySecret) {
      console.error('Razorpay secret key is not configured.')
      return NextResponse.json({ success: false, error: 'Payment verification configuration error' }, { status: 500 })
    }

    // 2. Recreate signature to verify authenticity
    const signText = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(signText.toString())
      .digest('hex')

    const isSignatureValid = expectedSignature === razorpay_signature

    if (!isSignatureValid) {
      console.error('Razorpay payment signature mismatch:', {
        received: razorpay_signature,
        expected: expectedSignature,
      })
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 })
    }

    // 3. Signature is valid! Update payment details and status in database
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        razorpay_payment_id,
        razorpay_order_id,
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating order status in Supabase after successful payment:', updateError.message)
      return NextResponse.json({
        success: false,
        error: 'Payment verified, but database update failed. Please contact support.',
      }, { status: 500 })
    }

    // Trigger push notification to admin on successful payment verification
    try {
      const { sendAdminOrderPushNotification } = await import('@/lib/push-notifications')
      await sendAdminOrderPushNotification(orderId)
    } catch (pushErr) {
      console.error('Failed to send admin push notification:', pushErr)
    }

    return NextResponse.json({ success: true, message: 'Payment verified successfully' })
  } catch (err: any) {
    console.error('Error verifying payment:', err)
    return NextResponse.json({ success: false, error: err.message || 'Internal server error' }, { status: 500 })
  }
}
