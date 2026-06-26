import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vrajaspice. Reach us via email at vrajaspice@gmail.com or WhatsApp +91 91215 52086 for orders, queries, and feedback.",
};

function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4,18 Q60,4 120,14 Q180,24 240,10 Q300,0 360,16 Q390,22 416,12"
        stroke="#E8721C"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M30,22 Q90,10 150,20 Q210,28 270,15 Q330,4 400,18"
        stroke="#D4A017"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6 bg-[#F5EDD8] parchment-texture">
        <svg
          className="absolute top-0 right-0 w-80 h-80 opacity-[0.05] translate-x-20 -translate-y-10"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" fill="#8B1A1A" />
        </svg>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Get In Touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#2C1810] mb-4">
            We&apos;d Love to Hear From You
          </h1>
          <BrushStroke className="w-64 mx-auto mb-6" />
          <p className="text-[#4A2A1A] text-lg max-w-xl mx-auto">
            Questions about our products, your order, or just want to share a recipe? Drop us a
            message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact body */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">

          {/* Contact info sidebar */}
          <aside className="md:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-6">
                Reach Us Directly
              </h2>

              {/* Email */}
              <a
                href="mailto:vrajaspice@gmail.com"
                className="flex items-start gap-4 p-5 rounded-xl card-warm hover:shadow-md transition-all duration-300 mb-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#8B1A1A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#6B1212] transition-colors">
                  <svg className="w-5 h-5 text-[#F5EDD8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-[#8B4513] uppercase tracking-wider mb-1">Email Us</p>
                  <p className="font-sans font-semibold text-[#2C1810] text-base">vrajaspice@gmail.com</p>
                  <p className="text-[#4A2A1A] text-sm">We reply within 24 hours</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919121552086"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/15 hover:border-[#25D366]/50 transition-all duration-300 mb-4 group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  {/* WhatsApp icon */}
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-[#25D366] uppercase tracking-wider mb-1">WhatsApp</p>
                  <p className="font-sans font-semibold text-[#2C1810] text-base">+91 91215 52086</p>
                  <p className="text-[#4A2A1A] text-sm">Quick responses, Mon–Sat</p>
                </div>
              </a>

              {/* WhatsApp CTA Button */}
              <a
                href="https://wa.me/919121552086?text=Hi%20Vrajaspice%2C%20I%20have%20a%20query!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-sans font-semibold px-6 py-4 rounded-xl hover:bg-[#1ebe5d] transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Hours */}
            <div className="card-warm rounded-xl p-6">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] mb-4">Support Hours</h3>
              <div className="space-y-2 text-sm text-[#4A2A1A]">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-[#2C1810]">10 AM – 7 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-[#2C1810]">10 AM – 5 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-[#8B1A1A]">Closed</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="card-warm rounded-2xl p-8 md:p-10">
              <h2 className="font-serif text-2xl font-bold text-[#2C1810] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[#4A2A1A] text-sm mb-8">
                Fill in the form below and our team will get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
