import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        surface: '#FFDDD2',
        elevated: '#ffebe4',
        primary: '#E29578',
        secondary: '#eba288',
        gold: '#d17f63',
        border: '#f5c7b8',
        'text-primary': '#2d1b14',
        'text-muted': '#8a7a72',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow': 'flow 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(226,149,120,0.12)' },
          '100%': { boxShadow: '0 0 20px rgba(226,149,120,0.35), 0 0 40px rgba(226,149,120,0.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(226,149,120,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(226,149,120,0.06) 1px, transparent 1px)',
        'radial-primary': 'radial-gradient(ellipse at center, rgba(226,149,120,0.08) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}

export default config
