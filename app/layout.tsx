import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chethan Thimapuram — AI/ML Engineer',
  description:
    'AI/ML Engineer with 5+ years building production-grade AI systems — LLMs, RAG pipelines, vector search, and scalable ML infrastructure.',
  keywords: [
    'AI Engineer',
    'ML Engineer',
    'LLM',
    'RAG',
    'Machine Learning',
    'Python',
    'AWS',
    'NLP',
  ],
  openGraph: {
    title: 'Chethan Thimapuram — AI/ML Engineer',
    description:
      'Building AI systems that scale. LLMs, RAG, Vector Search, and production ML infrastructure.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  )
}
