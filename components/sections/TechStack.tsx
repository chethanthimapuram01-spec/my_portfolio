'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface SkillGroup {
  category: string
  tag: string
  icon: string
  color: string
  skills: string[]
  description: string
}

const STACK: SkillGroup[] = [
  {
    category: 'Generative AI & LLMs',
    tag: 'core',
    icon: '◈',
    color: '#E29578',
    description: 'Large language models, agents, and prompt systems',
    skills: ['LLMs', 'Prompt Engineering', 'AI Agents', 'Tool Calling', 'RAG', 'Embeddings', 'Vector Search', 'Semantic Search'],
  },
  {
    category: 'Machine Learning',
    tag: 'models',
    icon: '⬡',
    color: '#d17f63',
    description: 'Model training, evaluation, and monitoring',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'Hugging Face', 'MLflow', 'Feature Engineering', 'Drift Detection'],
  },
  {
    category: 'Data Engineering',
    tag: 'data',
    icon: '◎',
    color: '#eba288',
    description: 'Pipelines, processing, and data infrastructure',
    skills: ['PySpark', 'ETL Pipelines', 'Pandas', 'NumPy', 'Airflow', 'SQL', 'Data Processing', 'OpenSearch'],
  },
  {
    category: 'APIs & Backend',
    tag: 'api',
    icon: '⚡',
    color: '#E29578',
    description: 'Service development and AI integration',
    skills: ['FastAPI', 'REST APIs', 'Python', 'Shell Scripting', 'AI Service Integration', 'Microservices'],
  },
  {
    category: 'Cloud & Infrastructure',
    tag: 'infra',
    icon: '▣',
    color: '#d17f63',
    description: 'Cloud platforms and deployment pipelines',
    skills: ['AWS Lambda', 'AWS S3', 'AWS EC2', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'GitLab', 'Azure', 'GCP'],
  },
]

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border bg-surface overflow-hidden cursor-default"
      style={{ borderColor: hovered ? `${group.color}35` : '#f5c7b8' }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${group.color}10, transparent 60%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 border"
            style={{
              color: group.color,
              borderColor: `${group.color}35`,
              background: `${group.color}12`,
            }}
          >
            {group.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-display font-semibold text-text-primary text-sm">{group.category}</h3>
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                style={{ color: group.color, borderColor: `${group.color}40`, background: `${group.color}10` }}
              >
                {group.tag}
              </span>
            </div>
            <p className="text-text-muted text-xs">{group.description}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.04 }}
              className="skill-tag"
              style={
                hovered
                  ? { borderColor: `${group.color}30`, color: group.color, background: `${group.color}10` }
                  : {}
              }
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* System architecture flow visualization */
function ArchFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const layers = [
    { label: 'User Query / Data Input', color: '#8a7a72', width: 'w-48' },
    { label: 'RAG + Embedding Layer', color: '#E29578', width: 'w-56' },
    { label: 'LLM Inference Engine', color: '#d17f63', width: 'w-64' },
    { label: 'API Gateway + FastAPI', color: '#eba288', width: 'w-56' },
    { label: 'Cloud Infrastructure', color: '#8a7a72', width: 'w-48' },
  ]

  return (
    <div ref={ref} className="rounded-2xl border border-[#f5c7b8] bg-surface p-6 overflow-hidden relative">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-xs text-text-muted">system.architecture — AI inference stack</span>
      </div>

      <div className="flex flex-col items-center gap-0">
        {layers.map((layer, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`${layer.width} h-9 rounded-lg border flex items-center justify-center`}
              style={{
                borderColor: `${layer.color}40`,
                background: `${layer.color}10`,
                color: layer.color,
              }}
            >
              <span className="text-xs font-mono text-center px-2">{layer.label}</span>
            </motion.div>
            {i < layers.length - 1 && (
              <div className="relative h-6 flex flex-col items-center">
                <div className="w-px h-full bg-[#f5c7b8] relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 w-full h-3 rounded-full"
                    style={{ background: layer.color }}
                    animate={inView ? { y: ['0%', '150%'] } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stack" className="section-padding bg-surface relative overflow-hidden">
      {/* Background radial */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right top, rgba(226,149,120,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">
            // technical arsenal
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary">
            Built with{' '}
            <span className="text-gradient-primary">depth</span>
          </h2>
          <p className="text-text-muted text-lg mt-4 max-w-lg mx-auto">
            Full-stack AI from embeddings to production infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill cards — left 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STACK.map((group, i) => (
              <SkillCard key={i} group={group} index={i} />
            ))}
          </div>

          {/* Architecture diagram — right column */}
          <div className="flex flex-col gap-4">
            <ArchFlow />

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-2xl border border-[#f5c7b8] bg-bg p-5"
            >
              <p className="font-mono text-xs text-text-muted mb-4">// certifications</p>
              {[
                { name: 'IBM Generative AI Engineering', issuer: 'IBM Professional' },
                { name: 'Python Programming (MTA)', issuer: 'Microsoft' },
              ].map((cert, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-3 ${i < 1 ? 'border-b border-[#f5c7b8]' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0 border border-[#d17f6335] bg-[#d17f6310]"
                    style={{ color: '#d17f63' }}
                  >
                    ◈
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{cert.name}</p>
                    <p className="text-text-muted text-xs">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-2xl border border-[#f5c7b8] bg-bg p-5"
            >
              <p className="font-mono text-xs text-text-muted mb-3">// education</p>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs flex-shrink-0 border border-[#E2957835] bg-[#E2957810]"
                  style={{ color: '#E29578' }}
                >
                  ◎
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium">MS Information Technology</p>
                  <p className="text-text-muted text-xs">University of South Florida · 2023–2025</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
