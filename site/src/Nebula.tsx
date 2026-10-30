import { useEffect, useRef } from 'react'
import MoonPhase from '@app/components/sky/MoonPhase'
import { moonTonight } from '@app/data/moon'

/** the videos' sky: violet clouds with pink edges, on deep indigo */
const STOPS: [number, [number, number, number]][] = [
  [0, [16, 9, 36]],
  [0.38, [30, 16, 60]],
  [0.58, [62, 34, 112]],
  [0.74, [104, 64, 168]],
  [0.88, [150, 98, 196]],
  [1, [196, 150, 222]],
]
const PINK: [number, number, number] = [178, 92, 150]

function ramp(t: number): [number, number, number] {
  for (let i = 1; i < STOPS.length; i++) {
    const [b, cb] = STOPS[i]
    const [a, ca] = STOPS[i - 1]
    if (t <= b) {
      const k = (t - a) / (b - a)
      return [ca[0] + (cb[0] - ca[0]) * k, ca[1] + (cb[1] - ca[1]) * k, ca[2] + (cb[2] - ca[2]) * k]
    }
  }
  return STOPS[STOPS.length - 1][1]
}

/** value noise with a fixed seed, so the sky is the same on every visit */
function noise2(seed: number) {
  const P = new Uint8Array(512)
  let s = seed
  const p = Array.from({ length: 256 }, (_, i) => i)
  for (let i = 255; i > 0; i--) { s = (s * 16807) % 2147483647; const j = s % (i + 1); [p[i], p[j]] = [p[j], p[i]] }
  for (let i = 0; i < 512; i++) P[i] = p[i & 255]
  const V = Float32Array.from({ length: 256 }, (_, i) => P[i] / 255)
  const f = (t: number) => t * t * (3 - 2 * t)
  return (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y)
    const xf = f(x - xi), yf = f(y - yi)
    const h = (a: number, b: number) => V[P[(P[a & 255] + b) & 255]]
    const a = h(xi, yi), b = h(xi + 1, yi), c = h(xi, yi + 1), d = h(xi + 1, yi + 1)
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf
  }
}

function fbm(n: (x: number, y: number) => number, x: number, y: number) {
  let v = 0, amp = 0.5, fr = 1
  for (let o = 0; o < 4; o++) { v += amp * n(x * fr, y * fr); fr *= 2.03; amp *= 0.5 }
  return v
}

/** the little four-point stars scattered over the sky, as in the videos: [x%, y%, size, colour] */
const SPARKS: [number, number, number, string][] = [
  [8, 14, 9, '#f2c75c'], [91, 9, 7, '#c9b6f0'], [72, 22, 6, '#ffbdf6'], [14, 47, 6, '#c9b6f0'], [86, 41, 10, '#f2c75c'],
  [5, 72, 7, '#ffbdf6'], [94, 66, 6, '#efe6d6'], [38, 6, 5, '#efe6d6'], [58, 88, 8, '#f2c75c'], [27, 91, 6, '#c9b6f0'],
  [80, 83, 7, '#ffbdf6'], [48, 33, 5, '#efe6d6'], [65, 57, 5, '#c9b6f0'], [20, 26, 5, '#efe6d6'],
]

/**
 * The sky behind the whole page, from the promo videos: grainy violet nebula clouds,
 * tonight's real moon in the corner, and a scatter of small four-point stars.
 */
export default function Nebula() {
  const ref = useRef<HTMLCanvasElement>(null)
  const moon = moonTonight()

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    // drawn once, off the critical path, so the hero's first frames aren't held up
    const draw = () => {
      // the clouds are soft, so they're worked out small...
      const W = 128, H = Math.round(W * (window.innerHeight / window.innerWidth))
      const small = document.createElement('canvas')
      small.width = W; small.height = H
      const sg = small.getContext('2d')!
      const img = sg.createImageData(W, H)
      const n = noise2(7), m = noise2(29)
      const sc = 3.2 / W
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const u = x * sc, v = y * sc
        // domain warp gives the clouds their marbled, smoky edges
        const wx = fbm(n, u + 1.7, v + 9.2), wy = fbm(n, u + 8.3, v + 2.8)
        let t = fbm(n, u + 2.2 * wx, v + 2.2 * wy)
        t = Math.min(1, Math.max(0, (t - 0.32) * 1.9))
        // darker toward the middle of the page so text and cards read
        const cx = x / W - 0.5, cy = y / H - 0.42
        t *= 1 - 0.55 * Math.exp(-(cx * cx * 3.2 + cy * cy * 1.6))
        const [r0, g0, b0] = ramp(t)
        const pink = Math.max(0, fbm(m, u * 1.3, v * 1.3) - 0.48) * 2.4 * t
        const i = (y * W + x) * 4
        img.data[i] = r0 + (PINK[0] - r0) * pink
        img.data[i + 1] = g0 + (PINK[1] - g0) * pink
        img.data[i + 2] = b0 + (PINK[2] - b0) * pink
        img.data[i + 3] = 255
      }
      sg.putImageData(img, 0, 0)
      // ...then drawn up to about screen size, blurred and grained once, so the page carries
      // no live blur or blend layer while it scrolls
      const BW = Math.min(900, Math.round(window.innerWidth * 0.75)), BH = Math.round(BW * (H / W))
      cv.width = BW; cv.height = BH
      const g = cv.getContext('2d')!
      g.filter = `blur(${Math.round(BW / 120)}px) saturate(1.1)`
      g.drawImage(small, -BW * 0.02, -BH * 0.02, BW * 1.04, BH * 1.04)
      g.filter = 'none'
      const px = g.getImageData(0, 0, BW, BH)
      let s = 99
      for (let i = 0; i < px.data.length; i += 4) {
        s = (s * 16807) % 2147483647
        const d = ((s & 255) - 128) * 0.11
        px.data[i] += d; px.data[i + 1] += d; px.data[i + 2] += d
      }
      g.putImageData(px, 0, 0)
      cv.classList.add('on')
    }
    const ric = (window as unknown as { requestIdleCallback?: (f: () => void, o?: object) => number }).requestIdleCallback
    const id = ric ? ric(draw, { timeout: 1200 }) : window.setTimeout(draw, 300)
    return () => { (window as unknown as { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id); window.clearTimeout(id) }
  }, [])

  return (
    <div className="sky" aria-hidden>
      <canvas ref={ref} className="nebula" />
      {SPARKS.map(([x, y, s, c], i) => (
        <svg key={i} className="spark-star" width={s} height={s} viewBox="0 0 10 10"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 0.73) % 5}s`, color: c }}>
          <path d="M5 0 L5.9 4.1 L10 5 L5.9 5.9 L5 10 L4.1 5.9 L0 5 L4.1 4.1 Z" fill="currentColor" />
        </svg>
      ))}
      <div className="sky-moon" title={`${moon.name} tonight`}>
        <MoonPhase size={44} lit={moon.lit} waxing={moon.waxing} />
      </div>
    </div>
  )
}
