"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Flame, Eye, EyeOff, AlertCircle, Check } from "lucide-react";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, isConfigured } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const redirectTo = searchParams.get("redirect") || "/account";

  useEffect(() => {
    // If user is already logged in, redirect them
    if (!authLoading && user) {
      router.replace(redirectTo);
    }
  }, [user, authLoading, router, redirectTo]);

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-[#FAF6EB] border border-[#E6D7B8] rounded-2xl p-8 shadow-sm">
          <AlertCircle className="w-12 h-12 text-[#8B1A1A] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-2">Configuration Required</h2>
          <p className="text-[#4A2A1A] text-sm">
            Please configure your Supabase environment variables in the <code className="bg-[#EDE0C4] px-1 py-0.5 rounded">.env.local</code> file to enable authentication services.
          </p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      toast.success("Welcome back to Vrajaspice!");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            whatsapp_number: whatsapp || null,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Check if user needs to confirm email (or if they are auto-logged-in)
      const session = data?.session;
      if (session) {
        toast.success("Account created successfully!");
        router.refresh();
      } else {
        setRegisteredSuccess(true);
        toast.success("Registration successful! Check your email to confirm.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDD8] pt-28 pb-20 px-4 flex flex-col justify-center items-center font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-1/4 left-10 w-96 h-96 text-[#E8721C]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" opacity="0.05" />
        </svg>
        <svg className="absolute bottom-1/4 right-10 w-96 h-96 text-[#8B1A1A]" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" opacity="0.05" />
        </svg>
      </div>

      <div className="relative w-full max-w-md bg-[#FAF6EB] border border-[#E6D7B8] rounded-2xl p-8 shadow-xl shadow-[#2C1810]/5">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-white shadow-md border border-[#E6D7B8] mb-3 relative shrink-0">
            <Image
              src="/logo.png"
              alt="Vrajaspice"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2C1810]">Vrajaspice</h1>
          <p className="text-[#8B4513] text-xs font-semibold uppercase tracking-[0.2em] mt-1">Spice With Soul</p>
        </div>

        {registeredSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 border border-green-200">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#2C1810] mb-2">Check your email</h2>
            <p className="text-[#4A2A1A] text-sm leading-relaxed mb-6">
              We have sent a verification link to <strong className="text-[#2C1810]">{email}</strong>. 
              Please click the link in the email to activate your account.
            </p>
            <button
              onClick={() => {
                setRegisteredSuccess(false);
                setActiveTab("login");
                setEmail("");
                setPassword("");
              }}
              className="w-full py-3 bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] font-semibold rounded-xl transition-colors duration-200"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex border-b border-[#E6D7B8] mb-6">
              <button
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                }}
                className={`flex-1 pb-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === "login"
                    ? "text-[#8B1A1A] border-[#8B1A1A]"
                    : "text-[#8B4513]/60 border-transparent hover:text-[#8B4513]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setError("");
                }}
                className={`flex-1 pb-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === "register"
                    ? "text-[#8B1A1A] border-[#8B1A1A]"
                    : "text-[#8B4513]/60 border-transparent hover:text-[#8B4513]"
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 rounded-xl px-4 py-3 mb-5">
                <AlertCircle className="w-4 h-4 text-[#8B1A1A] shrink-0" />
                <p className="text-[#8B1A1A] text-xs font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={activeTab === "login" ? handleLogin : handleRegister} className="space-y-4">
              {activeTab === "register" && (
                <>
                  <div>
                    <label className="block text-[#4A2A1A] text-xs font-semibold uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-4 py-3 bg-[#F5EDD8]/40 border border-[#E6D7B8] text-[#2C1810] placeholder-[#2C1810]/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A2A1A] text-xs font-semibold uppercase tracking-wider mb-2">
                      WhatsApp Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. +91 9121552086"
                      className="w-full px-4 py-3 bg-[#F5EDD8]/40 border border-[#E6D7B8] text-[#2C1810] placeholder-[#2C1810]/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A] transition-all"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[#4A2A1A] text-xs font-semibold uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 bg-[#F5EDD8]/40 border border-[#E6D7B8] text-[#2C1810] placeholder-[#2C1810]/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A] transition-all"
                />
              </div>

              <div>
                <label className="block text-[#4A2A1A] text-xs font-semibold uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 bg-[#F5EDD8]/40 border border-[#E6D7B8] text-[#2C1810] placeholder-[#2C1810]/30 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A] focus:border-[#8B1A1A] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B4513]/40 hover:text-[#8B4513] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : activeTab === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-[#8B1A1A] mx-auto mb-2" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-sans text-[#2C1810]">Loading login form...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
