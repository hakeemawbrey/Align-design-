import { useEffect, useRef } from 'react'

/**
 * The shooting stars from comealign.com: every few seconds a pixel streak
 * crosses the sky, white at the head and fading to violet along its tail.
 * Same numbers as the site: drawn at a third of the size with hard pixels,
 * 15 frames a second, at most five at once, the first after 2.5 s and then
 * one every 4–10 s. Off for reduced motion and while the tab is hidden.
 */
const SCALE = 3
const FPS = 15
const MAX = 5
const FIRST_MS = 2500
const TAIL = ['#ffffff', '#f8edff', '#ddd0ff', '#c9b6f0', '#9a7be0', '#6b4bd0']

interface Star { x: number; y: number; dx: number; dy: number; ux: number; uy: number; age: number; lifetime: number; length: number }

export default function FallingStars() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = ref.current
    const ctx = el?.getContext('2d') ?? null
    if (!el || !ctx) return
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stars: Star[] = []
    let w = 0, h = 0, raf = 0, last = 0, timer = 0, gone = false

    const size = () => {
      // the canvas fills the 390 × 844 phone; its own pixels are three of the phone's
      w = el.width = Math.ceil((el.offsetWidth || 390) / SCALE)
      h = el.height = Math.ceil((el.offsetHeight || 844) / SCALE)
      stars.length = 0
    }
    const frame = (now: number) => {
      raf = 0
      if (gone || still.matches || document.hidden) return
      if (now - last >= 1000 / FPS) {
        last = now
        ctx.clearRect(0, 0, w, h)
        for (const s of stars) {
          const x = s.x + s.dx * s.age, y = s.y + s.dy * s.age
          const fade = s.age > s.lifetime - 5 ? (s.lifetime - s.age) / 5 : 1
          for (let k = s.length; k >= 0; k--) {
            const t = k / s.length
            if (t > fade) continue
            ctx.fillStyle = TAIL[Math.min(TAIL.length - 1, Math.floor(t * TAIL.length))]
            ctx.globalAlpha = (1 - t) * 0.9 + 0.1
            ctx.fillRect(Math.round(x - s.ux * k * 1.6), Math.round(y - s.uy * k * 1.6), 1, 1)
          }
          if (fade > 0.4) {
            ctx.globalAlpha = 1
            ctx.fillStyle = TAIL[0]
            ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1)
            ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3)
          }
          ctx.globalAlpha = 1
          s.age++
        }
        for (let i = stars.length - 1; i >= 0; i--) if (stars[i].age > stars[i].lifetime) stars.splice(i, 1)
        if (stars.length === 0) ctx.clearRect(0, 0, w, h)
      }
      if (stars.length > 0) raf = requestAnimationFrame(frame)
    }
    const launch = () => {
      if (gone || still.matches || document.hidden || stars.length >= MAX) return
      const dir = Math.random() < 0.5 ? 1 : -1
      const speed = 4 + Math.random() * 3
      const slope = 0.35 + Math.random() * 0.3
      const len = Math.hypot(1, slope)
      stars.push({
        x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        dx: (dir * speed) / len, dy: (speed * slope) / len, ux: dir / len, uy: slope / len,
        age: 0, lifetime: 12 + Math.floor(Math.random() * 8), length: 9 + Math.floor(Math.random() * 7),
      })
      raf ||= requestAnimationFrame(frame)
    }
    const loop = () => {
      if (gone || still.matches || document.hidden) return
      launch()
      timer = window.setTimeout(loop, 4000 + Math.random() * 6000)
    }
    const restart = () => {
      window.clearTimeout(timer); cancelAnimationFrame(raf); raf = 0
      stars.length = 0; ctx.clearRect(0, 0, w, h)
      if (!still.matches && !document.hidden) timer = window.setTimeout(loop, FIRST_MS)
    }
    size(); restart()
    document.addEventListener('visibilitychange', restart)
    still.addEventListener('change', restart)
    return () => {
      gone = true
      window.clearTimeout(timer); cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', restart)
      still.removeEventListener('change', restart)
    }
  }, [])
  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated', pointerEvents: 'none' }} />
}
