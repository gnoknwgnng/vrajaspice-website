"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        {/* Success illustration */}
        <div className="w-20 h-20 rounded-full bg-[#E8721C]/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#E8721C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-3">
          Message Received!
        </h3>
        <p className="text-[#4A2A1A] text-base max-w-sm mx-auto">
          Thank you for reaching out. Our team will get back to you within 24 hours. In the
          meantime, feel free to browse our spice collection!
        </p>
        <a
          href="/products"
          className="inline-block mt-8 bg-[#8B1A1A] text-[#F5EDD8] font-sans font-semibold px-8 py-3 rounded-full hover:bg-[#6B1212] transition-colors duration-300 text-sm"
        >
          Explore Products →
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#F5EDD8] border border-[#8B4513]/25 rounded-xl px-4 py-3.5 font-sans text-[#2C1810] placeholder:text-[#8B4513]/50 focus:outline-none focus:ring-2 focus:ring-[#E8721C]/50 focus:border-[#E8721C] transition-all duration-200 text-sm";

  const labelClass = "block font-sans text-xs font-semibold text-[#8B4513] uppercase tracking-wider mb-1.5";

  const errorClass = "mt-1.5 text-xs text-red-600 flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name <span className="text-[#8B1A1A]">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Priya Sharma"
          autoComplete="name"
          {...register("name")}
          className={inputClass}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className={errorClass}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address <span className="text-[#8B1A1A]">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="priya@example.com"
          autoComplete="email"
          {...register("email")}
          className={inputClass}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className={labelClass}>
          Mobile Number <span className="text-[#8B1A1A]">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm font-semibold text-[#8B4513]/70 select-none">
            +91
          </span>
          <input
            id="mobile"
            type="tel"
            placeholder="98765 43210"
            autoComplete="tel"
            {...register("mobile")}
            className={`${inputClass} pl-12`}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
          />
        </div>
        {errors.mobile && (
          <p id="mobile-error" className={errorClass}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.mobile.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Your Message <span className="text-[#8B1A1A]">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your query, order issue, or feedback..."
          {...register("message")}
          className={`${inputClass} resize-none leading-relaxed`}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#8B1A1A] text-[#F5EDD8] font-sans font-semibold px-8 py-4 rounded-xl hover:bg-[#6B1212] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          "Send Message →"
        )}
      </button>

      <p className="text-center text-xs text-[#8B4513]/60">
        By submitting this form, you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-[#8B1A1A] transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
