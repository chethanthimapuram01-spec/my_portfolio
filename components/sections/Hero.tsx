'use client'
import { motion } from 'framer-motion'
import NeuralCanvas from '../canvas/NeuralCanvas'

const ROLES = ['AI/ML Engineer', 'LLM Systems Architect', 'RAG Pipeline Builder', 'Production ML Engineer']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
      {/* Neural network background */}
      <div className="absolute inset-0 z-0">
        <NeuralCanvas className="opacity-60" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0 pointer-events-none" />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226,149,120,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 mt-20 mb-8 px-4 py-2 rounded-full border border-[#E2957825] bg-[#E2957808]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-mono text-xs text-primary tracking-widest uppercase">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <h1 className="font-display font-bold leading-none mb-3" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
            <span className="text-text-primary">Chethan</span>
            <br />
            <span className="text-gradient-primary">Thimapuram</span>
          </h1>
        </motion.div>

        {/* Role ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-8"
        >
          <RoleTicker roles={ROLES} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
        >
          5+ years designing AI systems that go beyond the sandbox —{' '}
          <span className="text-text-primary">RAG pipelines, LLM workflows, real-time ML</span> —
          all production-grade, all measured by outcomes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#experience" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L8 11M8 11L4 7M8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Explore Work
          </a>
          <a href="#contact" className="btn-outline">
            Let's Talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { value: '5+', label: 'Years Production AI' },
            { value: '500K+', label: 'Records Automated' },
            { value: '45%', label: 'Efficiency Gained' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2 rounded-lg border border-[#f5c7b8] bg-[#FFDDD280]"
            >
              <span className="font-display font-bold text-xl text-primary">{stat.value}</span>
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ── Role ticker ── */
function RoleTicker({ roles }: { roles: string[] }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <span className="font-mono text-xs text-text-muted tracking-widest">// role</span>
      <div className="overflow-hidden h-6">
        <motion.div
          animate={{ y: roles.map((_, i) => `-${i * 24}px`) }}
          transition={{
            duration: roles.length * 2.5,
            repeat: Infinity,
            ease: 'linear',
            times: roles.map((_, i) => i / roles.length),
          }}
          className="flex flex-col"
        >
          {[...roles, roles[0]].map((role, i) => (
            <span
              key={i}
              className="font-display font-semibold text-base text-primary h-6 leading-6 whitespace-nowrap"
            >
              {role}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
