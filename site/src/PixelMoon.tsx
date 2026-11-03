import { useEffect, useRef } from 'react'

/** bone-white lit side, from the rim in to the centre; the dark side is the night sky with a little earthshine */
const LIT = ['#b9aecb', '#d6cde2', '#ebe3ef', '#f8f2f6']
const CRATER = ['#9f94b4', '#bdb2cc']
const DARK = ['#1d1438', '#2a1f4c']
const GLOW = 'rgba(232,222,255,'

/** 4×4 ordered dither, for the soft 16-bit shading */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

/** a few fixed craters, in unit-disc coordinates: [x, y, r] */
const CRATERS: [number, number, number][] = [[-0.32, -0.3, 0.2], [0.28, -0.42, 0.12], [0.38, 0.22, 0.22], [-0.18, 0.4, 0.14], [0.05, 0.02, 0.09], [-0.5, 0.12, 0.1]]

/**
 * The moon as pixel art, at a given phase, to sit with the pixel stars. `size` is CSS px, `grid` the
 * number of pixels across; `lit` 0 new → 1 full, lit on the right while waxing (northern sky).
 */
export default function PixelMoon({ size, grid = 22, lit, waxing, glow = true }: { size: number; grid?: number; lit: number; waxing: boolean; glow?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  // room around the disc for the glow ring
  const pad = glow ? Math.round(grid * 0.25) : 0
  const N = grid + pad * 2

  useEffect(() => {
    const g = ref.current?.getContext('2d')
    if (!g) return
    g.clearRect(0, 0, N, N)
    const k = Math.min(1, Math.max(0, lit))
    const r = grid / 2
    const c = N / 2
    for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
      const x = (px + 0.5 - c) / r, y = (py + 0.5 - c) / r
      const d = Math.hypot(x, y)
      const th = BAYER[(py % 4) * 4 + (px % 4)]
      if (d > 1) {
        // a stepped glow ring, dithered out
        if (glow && d < 1.45) {
          const a = (1 - (d - 1) / 0.45) * 0.55
          if (a > th * 0.6) { g.fillStyle = `${GLOW}${(a * 0.5).toFixed(2)})`; g.fillRect(px, py, 1, 1) }
        }
        continue
      }
      // the terminator: an ellipse across the disc
      const half = Math.sqrt(1 - y * y)
      const t = (1 - 2 * k) * half
      const onLit = waxing ? x > t : x < -t
      if (!onLit) {
        g.fillStyle = DARK[th > 0.5 ? 1 : 0]
        g.fillRect(px, py, 1, 1)
        continue
      }
      // shade toward the rim, dithered into four tones
      const shade = Math.min(3, Math.max(0, Math.floor((1 - d * d) * 3.2 + th * 0.9)))
      let col = LIT[shade]
      for (const [cx, cy, cr] of CRATERS) {
        const cd = Math.hypot(x - cx, y - cy)
        if (cd < cr) { col = CRATER[cd > cr * 0.6 ? 1 : 0]; break }
      }
      g.fillStyle = col
      g.fillRect(px, py, 1, 1)
    }
  }, [N, grid, lit, waxing, glow])

  const css = (size * N) / grid
  return (
    <canvas ref={ref} width={N} height={N} aria-hidden
      style={{ width: css, height: css, margin: -(css - size) / 2, imageRendering: 'pixelated', display: 'block' }} />
  )
}
