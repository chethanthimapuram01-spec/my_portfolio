'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Impact', href: '#impact' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = LINKS.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(`#${id}`)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-lg border-b border-[#f5c7b8]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#" className="font-display font-bold text-sm tracking-wider text-text-primary">
          <span className="text-primary">CT</span>
          <span className="text-text-muted ml-1 hidden sm:inline">/ AI · ML Engineer</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${active === link.href ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-xs px-4 py-2"
          >
            Hire me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-surface border-b border-[#f5c7b8]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-base"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary w-fit" onClick={() => setOpen(false)}>
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
