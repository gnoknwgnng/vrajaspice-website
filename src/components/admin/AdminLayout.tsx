'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Mail,
  LogOut,
  Menu,
  X,
  Flame,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Tag },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('vrajaspice_admin_auth')
    if (!token) {
      router.replace('/admin')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('vrajaspice_admin_auth')
    router.replace('/admin')
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0F0603] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#D4A017]">
          <Flame className="w-6 h-6 animate-pulse" />
          <span className="font-sans text-sm text-[#F5EDD8]/60">Loading…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A0C06] flex font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 left-0 h-full z-30 w-64 flex flex-col',
          'bg-[#0F0603] border-r border-[#D4A017]/10',
          'transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:static lg:flex',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4A017]/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A017] to-[#8B1A1A] flex items-center justify-center shadow-lg group-hover:shadow-[#D4A017]/30 transition-shadow">
              <Flame className="w-4 h-4 text-[#F5EDD8]" />
            </div>
            <div>
              <p className="text-[#F5EDD8] font-serif text-base font-semibold leading-none">Vrajaspice</p>
              <p className="text-[#D4A017]/70 text-[10px] font-sans uppercase tracking-widest">Admin</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#F5EDD8]/50 hover:text-[#F5EDD8] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  active
                    ? 'bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/20'
                    : 'text-[#F5EDD8]/60 hover:bg-[#F5EDD8]/5 hover:text-[#F5EDD8]',
                ].join(' ')}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#D4A017]' : ''}`} />
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5 pt-2 border-t border-[#D4A017]/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#F5EDD8]/60 hover:bg-[#8B1A1A]/20 hover:text-[#F5EDD8] transition-all duration-150"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
          <p className="mt-3 text-center text-[#F5EDD8]/20 text-[10px] font-sans">
            Vrajaspice Admin v1.0
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-10 bg-[#0F0603]/90 backdrop-blur border-b border-[#D4A017]/10 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#F5EDD8]/60 hover:text-[#F5EDD8] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A017] to-[#8B1A1A] flex items-center justify-center">
              <Flame className="w-3 h-3 text-[#F5EDD8]" />
            </div>
            <span className="text-[#F5EDD8] font-serif text-sm font-semibold">Vrajaspice Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
