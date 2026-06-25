import { NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, whatsapp, whatsappOptIn } = body

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured. Mocking newsletter subscription for:', email)
      return NextResponse.json({ success: true, message: 'Subscribed successfully (Mock Mode)' })
    }

    // Insert into Supabase table
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          name,
          email: email.trim().toLowerCase(),
          whatsapp_number: whatsapp || null,
          whatsapp_opt_in: !!whatsappOptIn,
        },
      ])

    if (error) {
      // If already subscribed, return success anyway to prevent user frustration
      if (error.code === '23505') { // Unique key violation code in PG
        return NextResponse.json({ success: true, message: 'Already subscribed' })
      }
      console.error('Error inserting newsletter subscriber:', error.message)
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Newsletter subscription error:', err)
    return NextResponse.json({ success: false, error: err.message || 'Failed to subscribe' }, { status: 500 })
  }
}
