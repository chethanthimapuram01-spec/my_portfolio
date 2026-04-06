'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Metric {
  value: number
  suffix: string
  prefix?: string
  label: string
  sublabel: string
  color: string
  icon: string
}

const METRICS: Metric[] = [
  {
    value: 45,
    suffix: '%',
    label: 'Faster Documentation',
    sublabel: 'Physician time saved via AI-driven automation',
    color: '#E29578',
    icon: '⚡',
  },
  {
    value: 18,
    suffix: '%',
    label: 'Accuracy Boost',
    sublabel: 'Summarization quality improvement',
    color: '#d17f63',
    icon: '◈',
  },
  {
    value: 500,
    suffix: 'K+',
    label: 'Claims Automated',
    sublabel: 'Annual throughput in insurance AI pipeline',
    color: '#eba288',
    icon: '⬡',
  },
  {
    value: 35,
    suffix: '%',
    label: 'Manual Work Cut',
    sublabel: 'Claims processing effort reduction',
    color: '#E29578',
    icon: '◎',
  },
]

function useCounter(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function MetricCard({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCounter(metric.value, inView, 1400 + index * 100)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="relative group rounded-2xl p-8 overflow-hidden border border-[#f5c7b8] bg-surface scanline-container"
      style={{ '--accent': metric.color } as React.CSSProperties}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${metric.color}10 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: `linear-gradient(90deg, ${metric.color}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-6 border"
        style={{
          borderColor: `${metric.color}30`,
          background: `${metric.color}12`,
          color: metric.color,
        }}
      >
        {metric.icon}
      </div>

      {/* Big number */}
      <div className="mb-3">
        <span
          className="font-display font-bold leading-none"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)', color: metric.color }}
        >
          {metric.prefix}
          {count}
          {metric.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="font-display font-semibold text-text-primary text-base mb-2">{metric.label}</p>
      <p className="text-text-muted text-sm leading-relaxed">{metric.sublabel}</p>

      {/* Pulse ring */}
      <motion.div
        animate={inView ? { scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        className="absolute bottom-6 right-6 w-3 h-3 rounded-full"
        style={{ background: metric.color }}
      />
    </motion.div>
  )
}

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="impact" className="section-padding bg-bg relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(226,149,120,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">
            // measured outcomes
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary leading-tight">
            Impact,{' '}
            <span className="text-gradient-primary">not just output</span>
          </h2>
          <p className="text-text-muted text-lg mt-4 max-w-xl mx-auto">
            Every system I've built has a number attached to it.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {METRICS.map((m, i) => (
            <MetricCard key={i} metric={m} index={i} />
          ))}
        </div>

        {/* Data pipeline visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative"
        >
          <PipelineBar />
        </motion.div>
      </div>
    </section>
  )
}

function PipelineBar() {
  return (
    <div className="rounded-2xl border border-[#f5c7b8] bg-surface p-6 overflow-hidden relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-xs text-text-muted">system.pipeline — live metrics</span>
      </div>

      <div className="flex items-center gap-0 overflow-x-auto pb-2">
        {[
          { label: 'Data Ingestion', pct: 92, color: '#E29578' },
          { label: 'NLP Processing', pct: 87, color: '#d17f63' },
          { label: 'LLM Generation', pct: 78, color: '#eba288' },
          { label: 'Output Delivery', pct: 95, color: '#E29578' },
        ].map((stage, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <div className="text-center px-4">
              <div
                className="w-14 h-14 rounded-xl border flex items-center justify-center text-sm font-display font-bold mb-2 mx-auto"
                style={{ borderColor: `${stage.color}40`, background: `${stage.color}10`, color: stage.color }}
              >
                {stage.pct}%
              </div>
              <p className="text-[10px] text-text-muted whitespace-nowrap">{stage.label}</p>
            </div>
            {i < 3 && (
              <div className="flex items-center mx-1">
                <div className="w-8 h-px bg-[#f5c7b8] relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-3 rounded-full"
                    style={{ background: stage.color }}
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
                  />
                </div>
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M0 4h6M4 1l3 3-3 3" stroke={stage.color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
