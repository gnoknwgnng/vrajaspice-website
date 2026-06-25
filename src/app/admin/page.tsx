'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Flame, Eye, EyeOff, AlertCircle } from 'lucide-react'

// TODO: Replace hardcoded auth with Supabase auth
// import { createClient } from '@/lib/supabase/client'

const ADMIN_EMAILS = ['vrajaspice@gmail.com', 'admin@vrajaspice.in']
const ADMIN_PASSWORDS = ['vrajaspice', 'admin123']
const AUTH_TOKEN_KEY = 'vrajaspice_admin_auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If already authenticated, go straight to dashboard
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token) {
      router.replace('/admin/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600))

    const normalizedEmail = email.trim().toLowerCase()
    if (ADMIN_EMAILS.includes(normalizedEmail) && ADMIN_PASSWORDS.includes(password)) {
      // Store a simple token (replace with real JWT/session in production)
      const token = btoa(`${email}:${Date.now()}`)
      localStorage.setItem(AUTH_TOKEN_KEY, token)
      router.replace('/admin/dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
    }

    setLoading(false)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#0F0603] flex flex-col items-center justify-center px-4 font-sans">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D4A017]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#8B1A1A]/8 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg shadow-[#D4A017]/20 mb-4 relative shrink-0">
            <Image
              src="/logo.png"
              alt="Vrajaspice"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-[#F5EDD8] font-serif text-3xl font-bold tracking-tight">Vrajaspice</h1>
          <p className="text-[#D4A017]/80 text-xs font-sans uppercase tracking-[0.2em] mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-[#1A0C06] border border-[#D4A017]/15 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-[#F5EDD8] font-serif text-xl font-semibold mb-1">Welcome back</h2>
          <p className="text-[#F5EDD8]/40 text-sm mb-7">Sign in to manage your store</p>

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2.5 bg-[#8B1A1A]/20 border border-[#8B1A1A]/40 rounded-lg px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-[#F87171] shrink-0" />
              <p className="text-[#F87171] text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#F5EDD8]/70 text-xs font-medium uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vrajaspice@gmail.com"
                className={[
                  'w-full px-4 py-3 rounded-lg text-sm',
                  'bg-[#0F0603] border text-[#F5EDD8] placeholder-[#F5EDD8]/20',
                  'focus:outline-none focus:ring-2 focus:ring-[#D4A017]/40 focus:border-[#D4A017]/50',
                  'transition-colors duration-150',
                  error ? 'border-[#8B1A1A]/50' : 'border-[#D4A017]/20',
                ].join(' ')}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[#F5EDD8]/70 text-xs font-medium uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={[
                    'w-full px-4 py-3 pr-11 rounded-lg text-sm',
                    'bg-[#0F0603] border text-[#F5EDD8] placeholder-[#F5EDD8]/20',
                    'focus:outline-none focus:ring-2 focus:ring-[#D4A017]/40 focus:border-[#D4A017]/50',
                    'transition-colors duration-150',
                    error ? 'border-[#8B1A1A]/50' : 'border-[#D4A017]/20',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5EDD8]/30 hover:text-[#F5EDD8]/70 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={[
                'w-full py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200',
                'bg-gradient-to-r from-[#D4A017] to-[#E8721C] text-[#0F0603]',
                'hover:from-[#E4B027] hover:to-[#F0882C] hover:shadow-lg hover:shadow-[#D4A017]/20',
                'focus:outline-none focus:ring-2 focus:ring-[#D4A017]/40 focus:ring-offset-2 focus:ring-offset-[#1A0C06]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
              ].join(' ')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Hint (dev only) */}
          <p className="mt-6 text-center text-[#F5EDD8]/20 text-xs">
            Demo: vrajaspice@gmail.com / vrajaspice
          </p>
        </div>

        <p className="mt-6 text-center text-[#F5EDD8]/20 text-xs">
          Vrajaspice &copy; {new Date().getFullYear()} — Internal Use Only
        </p>
      </div>
    </div>
  )
}
