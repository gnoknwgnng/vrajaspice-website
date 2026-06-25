import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, mobile, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email, and message are required' }, { status: 400 })
    }

    console.log('Received contact form submission:', { name, email, mobile, message })

    // Optional: Integrate with Resend email sender if configured in env
    const resendApiKey = process.env.RESEND_API_KEY
    const resendFromEmail = process.env.RESEND_FROM_EMAIL
    
    if (resendApiKey && resendFromEmail) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: resendFromEmail,
            to: resendFromEmail, // Send to site owner/admin
            reply_to: email,
            subject: `Vrajaspice - New Contact Form Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile || 'N/A'}\n\nMessage:\n${message}`,
          }),
        })
        if (!res.ok) {
          console.warn('Failed to send email via Resend API, but message received successfully.')
        }
      } catch (emailErr) {
        console.error('Error sending email through Resend:', emailErr)
      }
    }

    return NextResponse.json({ success: true, message: 'Message received' })
  } catch (err: any) {
    console.error('Contact form submission error:', err)
    return NextResponse.json({ success: false, error: err.message || 'Failed to submit' }, { status: 500 })
  }
}
