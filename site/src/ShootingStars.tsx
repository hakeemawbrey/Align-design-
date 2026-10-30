import { useEffect, useRef } from 'react'

/** one pixel of the sky, in CSS px, like the reveal's stars */
const PX = 3
const FPS = 15
/** head to tail: white, pearl, lilac, then the trail fades into violet */
const TRAIL = ['#ffffff', '#f8edff', '#ddd0ff', '#c9b6f0', '#9a7be0', '#6b4bd0']
/** scrolling sends a star every this many CSS px, at most this many in the sky at once */
const SCROLL_PER_STAR = 260
const MAX_STARS = 5

interface Star { x: number; y: number; dx: number; dy: number; ux: number; uy: number; f: number; frames: number; len: number }

/**
 * Pixel stars falling across the sky: now and then on their own, and more as you scroll, falling the
 * way the page is going. A bright head and a stepped trail, drawn on a coarse grid at a game's frame
 * rate. The loop only runs while a star is in the sky; none at all for reduced motion.
 */
export default function ShootingStars() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const g = cv.getContext('2d')!
    let W = 0, H = 0
    const fit = () => { W = cv.width = Math.ceil(innerWidth / PX); H = cv.height = Math.ceil(innerHeight / PX) }
    fit()

    const stars: Star[] = []
    let raf = 0, last = 0, timer = 0, dead = false

    /** a new star; `up` sends it rising, for scrolling back up the page */
    const spawn = (up = false) => {
      if (stars.length >= MAX_STARS) return
      const dir = Math.random() < 0.5 ? 1 : -1
      const speed = 4 + Math.random() * 3 // pixels a frame
      const slope = (0.35 + Math.random() * 0.3) * (up ? -1 : 1)
      const len = Math.hypot(1, slope)
      stars.push({
        x: dir > 0 ? Math.random() * W * 0.6 : W * 0.4 + Math.random() * W * 0.6,
        y: up ? H * 0.55 + Math.random() * H * 0.4 : Math.random() * H * 0.4,
        dx: dir * speed / len, dy: speed * slope / len, ux: dir / len, uy: slope / len,
        f: 0, frames: 12 + Math.floor(Math.random() * 8), len: 9 + Math.floor(Math.random() * 7),
      })
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = (t: number) => {
      raf = 0
      if (dead) return
      if (t - last >= 1000 / FPS) {
        last = t
        g.clearRect(0, 0, W, H)
        for (const s of stars) {
          const hx = s.x + s.dx * s.f, hy = s.y + s.dy * s.f
          // the trail thins and blinks out over the last few frames
          const fade = s.f > s.frames - 5 ? (s.frames - s.f) / 5 : 1
          for (let i = s.len; i >= 0; i--) {
            const k = i / s.len
            if (k > fade) continue
            g.fillStyle = TRAIL[Math.min(TRAIL.length - 1, Math.floor(k * TRAIL.length))]
            g.globalAlpha = (1 - k) * 0.9 + 0.1
            g.fillRect(Math.round(hx - s.ux * i * 1.6), Math.round(hy - s.uy * i * 1.6), 1, 1)
          }
          // a little cross for the head, like the sparkle sprites
          if (fade > 0.4) {
            g.globalAlpha = 1
            g.fillStyle = '#ffffff'
            g.fillRect(Math.round(hx) - 1, Math.round(hy), 3, 1)
            g.fillRect(Math.round(hx), Math.round(hy) - 1, 1, 3)
          }
          g.globalAlpha = 1
          s.f++
        }
        for (let i = stars.length - 1; i >= 0; i--) if (stars[i].f > stars[i].frames) stars.splice(i, 1)
        if (!stars.length) g.clearRect(0, 0, W, H)
      }
      if (stars.length) raf = requestAnimationFrame(tick)
    }

    // now and then on their own
    const idle = () => {
      if (dead) return
      if (!document.hidden) spawn()
      timer = window.setTimeout(idle, 4000 + Math.random() * 6000)
    }
    timer = window.setTimeout(idle, 2500)

    // and more as you scroll, falling the way you're going
    let y0 = scrollY, travelled = 0
    const onScroll = () => {
      const dy = scrollY - y0
      y0 = scrollY
      travelled += Math.abs(dy)
      if (travelled >= SCROLL_PER_STAR) { travelled = 0; spawn(dy < 0) }
    }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', fit)
    return () => {
      dead = true; cancelAnimationFrame(raf); clearTimeout(timer)
      removeEventListener('scroll', onScroll); removeEventListener('resize', fit)
    }
  }, [])

  return <canvas ref={ref} className="falling" aria-hidden />
}
