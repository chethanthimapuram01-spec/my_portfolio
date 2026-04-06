'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Role {
  title: string
  domain: string
  period: string
  type: string
  highlights: { icon: string; text: string }[]
  metrics: { value: string; label: string }[]
  tags: string[]
  accentColor: string
}

const ROLES: Role[] = [
  {
    title: 'AI / ML Engineer',
    domain: 'Healthcare AI',
    period: 'Aug 2024 — Present',
    type: 'Current',
    accentColor: '#E29578',
    highlights: [
      { icon: '◈', text: 'Built LLM pipelines generating structured SOAP notes from clinical transcripts — T5, BERT, GPT-Neo' },
      { icon: '⬡', text: 'Real-time transcription with speaker diarization — Word Error Rate cut from 14% → 8%' },
      { icon: '◎', text: 'RAG + question-answering services integrated into enterprise EHR platforms' },
      { icon: '⚡', text: '120K+ clinical transcripts processed via PySpark pipelines for downstream NLP' },
      { icon: '◈', text: 'MLflow monitoring for hallucination risk, model drift, and system reliability' },
    ],
    metrics: [
      { value: '45%', label: 'Doc time reduced' },
      { value: '18%', label: 'Accuracy gain' },
      { value: '8%', label: 'Word error rate' },
    ],
    tags: ['LLM', 'RAG', 'PySpark', 'FastAPI', 'Docker', 'MLflow', 'HIPAA'],
  },
  {
    title: 'ML Engineer',
    domain: 'Enterprise Insurance AI',
    period: 'Jul 2020 — Jul 2023',
    type: 'Previous',
    accentColor: '#d17f63',
    highlights: [
      { icon: '◈', text: 'Document intelligence pipeline with OCR + NLP — entity recognition & classification at scale' },
      { icon: '⬡', text: 'Anomaly detection models (XGBoost, Random Forest) for fraudulent claims identification' },
      { icon: '◎', text: 'ETL pipelines ingesting structured + unstructured claims data for ML workflows' },
      { icon: '⚡', text: 'CI/CD via Jenkins & GitLab with containerized Docker deployments and MLflow lifecycle' },
      { icon: '◈', text: '500K claims/year automated — 40% faster approval turnaround' },
    ],
    metrics: [
      { value: '500K+', label: 'Claims/year' },
      { value: '35%', label: 'Manual work cut' },
      { value: '40%', label: 'Faster approval' },
    ],
    tags: ['NLP', 'XGBoost', 'ETL', 'Docker', 'Airflow', 'MLflow', 'GDPR'],
  },
]

function FlowConnector() {
  return (
    <div className="flex justify-center py-4">
      <div className="relative flex flex-col items-center">
        <div className="w-px h-12 bg-[#f5c7b8] relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full rounded-full"
            style={{ background: 'linear-gradient(180deg, #E29578, #d17f63)', height: '40%' }}
            animate={{ y: ['0%', '250%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div
          className="w-3 h-3 rounded-full border-2 border-[#f5c7b8]"
          style={{ background: '#FFDDD2' }}
        />
      </div>
    </div>
  )
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative rounded-2xl border bg-surface overflow-hidden group"
      style={{ borderColor: `${role.accentColor}25` }}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${role.accentColor}, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 0%, ${role.accentColor}08, transparent 60%)`,
        }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-mono px-2 py-0.5 rounded border"
                style={{ color: role.accentColor, borderColor: `${role.accentColor}40`, background: `${role.accentColor}10` }}
              >
                {role.type}
              </span>
              <span className="text-xs text-text-muted font-mono">{role.period}</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-text-primary mb-1">{role.title}</h3>
            <p className="text-text-muted text-sm font-mono">// {role.domain}</p>
          </div>

          {/* Metric badges */}
          <div className="flex flex-wrap gap-2">
            {role.metrics.map((m, i) => (
              <div
                key={i}
                className="text-center px-3 py-1.5 rounded-lg border"
                style={{ borderColor: `${role.accentColor}30`, background: `${role.accentColor}0a` }}
              >
                <div className="font-display font-bold text-lg leading-none" style={{ color: role.accentColor }}>
                  {m.value}
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights — styled as pipeline steps */}
        <div className="space-y-3 mb-8">
          {role.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-[#f5c7b8] hover:bg-elevated transition-all duration-200"
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs"
                style={{ color: role.accentColor, background: `${role.accentColor}15` }}
              >
                {h.icon}
              </span>
              <p className="text-text-muted text-sm leading-relaxed">{h.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {role.tags.map(tag => (
            <span key={tag} className="skill-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-padding bg-bg relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">
            // career pipeline
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Where I've{' '}
            <span className="text-gradient-warm">deployed</span>
          </h2>
          <p className="text-text-muted text-lg mt-4 max-w-lg mx-auto">
            Two domains, one consistent outcome — AI that ships and scales.
          </p>
        </motion.div>

        {/* Pipeline: start node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#E2957825] bg-[#E2957808]">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary">pipeline.start()</span>
          </div>
        </motion.div>

        {/* Role cards */}
        {ROLES.map((role, i) => (
          <div key={i}>
            <FlowConnector />
            <RoleCard role={role} index={i} />
          </div>
        ))}

        {/* Pipeline: end node */}
        <div className="flex justify-center mt-4">
          <FlowConnector />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#eba28825] bg-[#eba28808]">
            <span className="font-mono text-xs text-secondary">next.opportunity() ↗</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
