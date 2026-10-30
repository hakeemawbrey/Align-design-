import { useEffect, useRef } from 'react'

/** one pixel of the sky, in CSS px, like the reveal's stars */
const PX = 3
const FPS = 15
/** head to tail: white, pearl, lilac, then the trail fades into violet */
const TRAIL = ['#ffffff', '#f8edff', '#ddd0ff', '#c9b6f0', '#9a7be0', '#6b4bd0']

/**
 * Now and then a pixel star falls across the sky: a bright head and a stepped trail, drawn on a
 * coarse grid at a game's frame rate. Nothing runs between stars; none at all for reduced motion.
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
    addEventListener('resize', fit)

    let raf = 0, timer = 0, dead = false
    const fall = () => {
      if (dead) return
      if (document.hidden) { timer = window.setTimeout(fall, 2000); return }
      // start in the upper part of the sky, heading down and across at a shallow angle
      const dir = Math.random() < 0.5 ? 1 : -1
      const x0 = dir > 0 ? Math.random() * W * 0.6 : W * 0.4 + Math.random() * W * 0.6
      const y0 = Math.random() * H * 0.35
      const speed = 4 + Math.random() * 3 // pixels a frame
      const dx = dir * speed, dy = speed * (0.35 + Math.random() * 0.25)
      const frames = 14 + Math.floor(Math.random() * 8)
      const len = 10 + Math.floor(Math.random() * 6)
      let f = 0, last = 0
      const step = (t: number) => {
        if (dead) return
        if (t - last >= 1000 / FPS) {
          last = t
          g.clearRect(0, 0, W, H)
          const hx = x0 + dx * f, hy = y0 + dy * f
          // the trail thins and blinks out over the last few frames
          const fade = f > frames - 5 ? (frames - f) / 5 : 1
          for (let i = len; i >= 0; i--) {
            const k = i / len
            if (k > fade) continue
            const col = TRAIL[Math.min(TRAIL.length - 1, Math.floor(k * TRAIL.length))]
            g.fillStyle = col
            g.globalAlpha = (1 - k) * 0.9 + 0.1
            g.fillRect(Math.round(hx - (dx / speed) * i), Math.round(hy - (dy / speed) * i), 1, 1)
          }
          // a little cross for the head, like the sparkle sprites
          if (fade > 0.4) {
            g.globalAlpha = 1
            g.fillStyle = '#ffffff'
            g.fillRect(Math.round(hx) - 1, Math.round(hy), 3, 1)
            g.fillRect(Math.round(hx), Math.round(hy) - 1, 1, 3)
          }
          g.globalAlpha = 1
          f++
        }
        if (f <= frames) raf = requestAnimationFrame(step)
        else { g.clearRect(0, 0, W, H); timer = window.setTimeout(fall, 3500 + Math.random() * 6500) }
      }
      raf = requestAnimationFrame(step)
    }
    timer = window.setTimeout(fall, 2500)
    return () => { dead = true; cancelAnimationFrame(raf); clearTimeout(timer); removeEventListener('resize', fit) }
  }, [])

  return <canvas ref={ref} className="falling" aria-hidden />
}
