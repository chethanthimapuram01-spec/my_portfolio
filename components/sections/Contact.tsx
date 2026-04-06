'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-bg relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(226,149,120,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">
            // let's connect
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
            Ready to build{' '}
            <span className="text-gradient-primary">something real?</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Whether it's a role, a project, or just a conversation about what's next in AI — I'm here.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <ContactLink
              icon="✉"
              label="Email"
              value="chethanthimapuram01@gmail.com"
              href="mailto:chethanthimapuram01@gmail.com"
              color="#E29578"
            />
            <ContactLink
              icon="◈"
              label="LinkedIn"
              value="linkedin.com/in/chethan"
              href="https://linkedin.com"
              color="#d17f63"
            />
            <ContactLink
              icon="◎"
              label="Phone"
              value="+1 (656) 200-3453"
              href="tel:+16562003453"
              color="#eba288"
            />

            {/* Availability card */}
            <div className="rounded-2xl border border-[#E2957825] bg-[#E2957808] p-5 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <span className="font-mono text-xs text-primary">Available for opportunities</span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Open to full-time AI/ML roles, contract projects, and advisory conversations. US-based, remote or hybrid.
              </p>
            </div>

            {/* What I'm looking for */}
            <div className="rounded-2xl border border-[#f5c7b8] bg-surface p-5">
              <p className="font-mono text-xs text-text-muted mb-3">// looking for</p>
              {[
                'Production AI/ML systems',
                'LLM & RAG-based products',
                'High-ownership engineering teams',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  <span className="text-primary text-xs">›</span>
                  <span className="text-text-muted text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-6xl mx-auto mt-20 pt-8 border-t border-[#f5c7b8] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <span className="font-mono text-xs text-text-muted">
          © 2025 Chethan Thimapuram
        </span>
        <span className="font-mono text-xs text-text-muted">
          Built with Next.js · Framer Motion · Tailwind
        </span>
      </motion.div>
    </section>
  )
}

function ContactLink({
  icon, label, value, href, color,
}: {
  icon: string
  label: string
  value: string
  href: string
  color: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex items-center gap-3 p-4 rounded-xl border border-[#f5c7b8] bg-surface hover:bg-elevated transition-all duration-200 group"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border"
        style={{ color, borderColor: `${color}35`, background: `${color}12` }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted font-mono">{label}</p>
        <p className="text-text-primary text-sm truncate group-hover:text-primary transition-colors duration-200">
          {value}
        </p>
      </div>
      <svg
        className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        width="14" height="14" viewBox="0 0 14 14" fill="none"
      >
        <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </a>
  )
}

function Field({
  label, type, placeholder, value, onChange, required, rows,
}: {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  rows?: number
}) {
  const inputClass =
    'w-full bg-elevated border border-[#f5c7b8] rounded-lg px-4 py-3 text-text-primary text-sm placeholder:text-text-muted outline-none transition-all duration-200 focus:border-[#E2957840] focus:shadow-[0_0_0_3px_#E2957810] font-sans resize-none'

  return (
    <div className="space-y-1.5">
      <label className="font-mono text-xs text-text-muted">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          rows={rows ?? 4}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
        />
      )}
    </div>
  )
}
