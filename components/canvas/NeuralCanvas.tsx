'use client'
import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  phaseSpeed: number
}

interface Packet {
  from: number
  to: number
  t: number
  speed: number
}

export default function NeuralCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let nodes: Node[] = []
    let packets: Packet[] = []
    let frame = 0
    const MAX_DIST = 180
    const MOUSE_ATTRACT = 140

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      const density = (canvas.width * canvas.height) / 11000
      const count = Math.min(90, Math.max(40, Math.floor(density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.018,
      }))
    }

    const spawnPacket = () => {
      const fromIdx = Math.floor(Math.random() * nodes.length)
      const n = nodes[fromIdx]
      const neighbors: number[] = []
      for (let i = 0; i < nodes.length; i++) {
        if (i === fromIdx) continue
        const dx = n.x - nodes[i].x
        const dy = n.y - nodes[i].y
        if (dx * dx + dy * dy < MAX_DIST * MAX_DIST) neighbors.push(i)
      }
      if (!neighbors.length) return
      const toIdx = neighbors[Math.floor(Math.random() * neighbors.length)]
      packets.push({ from: fromIdx, to: toIdx, t: 0, speed: 0.003 + Math.random() * 0.006 })
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    for (let i = 0; i < 30; i++) spawnPacket()

    const CORAL = '#E29578'

    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      /* update nodes */
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.phase += n.phaseSpeed
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        const mdx = mouse.current.x - n.x
        const mdy = mouse.current.y - n.y
        const mdist2 = mdx * mdx + mdy * mdy
        if (mdist2 < MOUSE_ATTRACT * MOUSE_ATTRACT) {
          const mdist = Math.sqrt(mdist2)
          n.vx += (mdx / mdist) * 0.06
          n.vy += (mdy / mdist) * 0.06
          const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
          if (spd > 1.8) { n.vx *= 1.8 / spd; n.vy *= 1.8 / spd }
        }
      }

      /* draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist2 = dx * dx + dy * dy
          if (dist2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(dist2)
            const alpha = (1 - dist / MAX_DIST) * 0.13
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(226,149,120,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      /* draw nodes */
      for (const n of nodes) {
        const pulse = (Math.sin(n.phase) + 1) * 0.5
        const mdx = mouse.current.x - n.x
        const mdy = mouse.current.y - n.y
        const mInfluence = Math.max(0, 1 - Math.sqrt(mdx * mdx + mdy * mdy) / MOUSE_ATTRACT)

        const alpha = 0.25 + pulse * 0.3 + mInfluence * 0.55
        const r = n.radius + pulse * 0.6 + mInfluence * 2.5

        if (mInfluence > 0.4) {
          ctx.shadowColor = CORAL
          ctx.shadowBlur = 14
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226,149,120,${alpha})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      /* update & draw packets */
      packets = packets.filter(p => {
        p.t += p.speed
        if (p.t >= 1) return false
        const a = nodes[p.from]
        const b = nodes[p.to]
        if (!a || !b) return false
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const fade = p.t < 0.2 ? p.t / 0.2 : p.t > 0.8 ? (1 - p.t) / 0.2 : 1
        ctx.shadowColor = CORAL
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(226,149,120,${fade})`
        ctx.fill()
        ctx.shadowBlur = 0
        return true
      })

      if (frame % 3 === 0 && packets.length < 50) spawnPacket()
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  )
}
