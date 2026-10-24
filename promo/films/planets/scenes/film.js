// planets (30 s, vertical) · "Every planet in 30 seconds."
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556; a bar = 2.222 s). Sky = SKY_H + grain GRAIN_H, one canvas, DOM type.
//   0.00–0.40  fade up; hook "Every planet / in *30 seconds*." pops word by word (0.10–0.50); the ten planet orbs burst out
//              into a ring around a gold stopwatch whose hand whips round                          (hook out 2.42)
//   2.82 + 2.222·i  planet i lands (one bar each, on the downbeat): it whooshes in from the right, squashes, sparkles;
//              name up top, one-liner below, and its icon gag on beat 2. Out ~1.86 s later, flying off left.
//     ☉ Sun 2.82 spotlights · ☽ Moon 5.04 blanket · ☿ Mercury 7.27 phone · ♀ Venus 9.49 heart · ♂ Mars 11.71 sprint ·
//     ♃ Jupiter 13.93 clover · ♄ Saturn 16.16 stern clock · ♅ Uranus 18.38 bolt · ♆ Neptune 20.60 cloud ·
//     ♇ Pluto 22.82 butterfly (1.5 bars) + sticker "dwarf planet. *Still counts.*" at 23.93
//  26.16  end "Ten planets." → 26.72 "*One you.*" (wobble); the ten orbs swirl in round a pictogram person; burst 27.27
//  29.30–30.00  fade to black (black from 29.965)
import { clamp, lerp, prog, ease, el, rng, C } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { orb, sparkle, spotlights, blanket, phoneChat, beatingHeart, sprinter, clover, sternClock, bolt, dreamCloud, butterfly, sticker, stopwatch, person, GLYPH_FONT, VS, BONE, GOLD, PINK } from './illus.js'

export const DURATION = 30
const beat = n => 0.6 + n * 0.5556
const BAR = 4 * 0.5556
const T_OUT = 29.3, T_END = 30.0
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 6px rgba(6,4,18,0.7)'

// ── the ten
export const PLANETS = [
  { id: 'sun', name: 'Sun', glyph: '☉', col: '#f7b733', r: 200, line: 'who *you* are', gs: 1.0 },
  { id: 'moon', name: 'Moon', glyph: '☽', col: '#dfe7ff', r: 170, line: 'what you *need*' },
  { id: 'mercury', name: 'Mercury', glyph: '☿', col: '#8fd8f6', r: 150, line: 'how you *talk* & text' },
  { id: 'venus', name: 'Venus', glyph: '♀', col: '#ff8fb1', r: 170, line: 'what you *love*' },
  { id: 'mars', name: 'Mars', glyph: '♂', col: '#f0603a', r: 160, line: 'how you *go for it*', glyphCol: '#fff3e0', gy: 0.08 },
  { id: 'jupiter', name: 'Jupiter', glyph: '♃', col: '#e9a15a', r: 225, line: 'where you get *lucky*', gs: 0.95 },
  { id: 'saturn', name: 'Saturn', glyph: '♄', col: '#e9cf8a', r: 165, line: 'where you *grow up*', ring: true },
  { id: 'uranus', name: 'Uranus', glyph: '♅', col: '#7fe0d8', r: 175, line: 'where you *rebel*', ring: true },
  { id: 'neptune', name: 'Neptune', glyph: '♆', col: '#4f7cf0', r: 180, line: 'where you *dream*', glyphCol: '#fff3e0' },
  { id: 'pluto', name: 'Pluto', glyph: '♇', col: '#c9a6ff', r: 120, line: 'where you *transform*' },
]
const SLOT = PLANETS.map((_, i) => beat(4 + 4 * i))            // landing time (downbeat of each bar)
const SLOT_END = PLANETS.map((_, i) => i < 9 ? SLOT[i] + BAR : beat(46))
const TXT_OUT = SLOT_END.map(e => e - 0.36)                     // copy leaves just before the next planet arrives
const OX = 540, OY = 905
const HOOK_OUT = 2.42
const END_T = beat(46), END_ONE = beat(47), BURST = beat(48)
const STICK = SLOT[9] + 1.11
const ACC = PLANETS.map(p => p.col === '#4f7cf0' ? '#8fb0ff' : p.col)   // accent colour for each one-liner (legible on the sky)

const sp = (t, a, d = 0.4, s = 2.0) => easeOutBack(prog(t, a, a + d), s)
const out = (t, a, d = 0.25) => 1 - ease.inQuad(prog(t, a, a + d))

/** springy word-by-word type: `*word*` = accent (EB Garamond italic, colour), `|` = line break; the last word may pop late with a wobble */
function popText(parent, text, { top, size, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, lastAt = null, wobble = false, lh = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight: lh, color: BONE, textShadow: SHADOW, letterSpacing: '-0.02em', display: 'none' }, parent)
  const ws = []
  let n = 0, inAcc = false
  const toks = text.split(' ')
  toks.forEach((w, i) => {
    if (w === '|') { el('br', {}, box); return }
    const starts = w.startsWith('*'), ends = w.endsWith('*')
    if (starts) inAcc = true
    const acc = inAcc
    if (ends) inAcc = false
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 80%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: (accentSize || size * 1.12) + 'px', color: accentColor, letterSpacing: '0', textShadow: `0 0 28px ${accentColor}66, ${SHADOW}` })
    const isLast = i === toks.length - 1
    ws.push({ t: isLast && lastAt != null ? lastAt : t0 + n * gap, big: isLast && lastAt != null, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    words: ws,
    update(t, tOut = 1e9, dOut = 0.18) {
      const o = 1 - ease.inQuad(prog(t, tOut, tOut + dOut))
      const show = t >= t0 - 0.01 && o > 0
      box.style.display = show ? 'block' : 'none'
      if (!show) return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * o)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 - (1 - o) * 16).toFixed(2)}px) scale(${(sc * lerp(0.7, 1, o)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── hook ring + end swirl: the ten mini orbs
const RING_R = 330, RING_Y = 1100
function miniRing(bx, t, k, { cx = OX, cy = RING_Y, R = RING_R, rot = 0, size = 52, t0 = 0, spread = 0 }) {
  PLANETS.forEach((P, i) => {
    const pin = easeOutBack(prog(t, t0 + i * 0.045, t0 + i * 0.045 + 0.42), 2.0)
    if (pin <= 0.001) return
    const an = -Math.PI / 2 + i * Math.PI * 2 / 10 + rot
    const d = R * pin * (1 + spread)
    orb(bx, { ...P, ring: P.ring }, cx + Math.cos(an) * d, cy + Math.sin(an) * d * 0.92, size * (0.6 + 0.4 * pin), t, { a: k })
  })
}

// beat thump for Venus's heart (decays after every beat from the landing)
const thumpAt = t0 => t => { if (t < t0 + 0.55) return 0; const u = (t - (t0 + 0.55)) % 0.5556; return Math.exp(-u * 9) }
// Saturn's clock: one notch per beat from landing + 0.55
const clockSteps = t0 => t => { const u = t - (t0 + 0.55); if (u < 0) return { n: 0, jolt: 0 }; const k = Math.floor(u / 0.5556) + 1, f = u - (k - 1) * 0.5556; return { n: k - 1 + easeOutBack(clamp(f / 0.14), 3), jolt: Math.exp(-f * 10) } }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await Promise.all([`800 108px Inter`, `700 62px Inter`, `italic 600 118px 'EB Garamond'`, `700 34px 'Space Mono'`, `100px 'DejaVu Sans'`].map(f => document.fonts.load(f).catch(() => {})))
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')

  // ── copy
  const hook = popText(root, 'Every planet | in *30 seconds.*', { top: 190, size: 124, weight: 800, at: 0.1, gap: 0.08, accentSize: 140 })
  const eye = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '150px', textAlign: 'center', fontFamily: "'Space Mono', monospace", fontWeight: '700', fontSize: '36px',
    letterSpacing: '0.25em', textIndent: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, '')
  const names = PLANETS.map((P, i) => popText(root, P.name, { top: 205, size: 168, weight: 800, at: SLOT[i] - 0.22 }))
  const lines = PLANETS.map((P, i) => popText(root, P.line, { top: 1530, size: 90, weight: 700, at: SLOT[i] - 0.04, gap: 0.06, accentColor: ACC[i], accentSize: 106 }))
  const endL = popText(root, 'Ten planets. | *One you.*', { top: 205, size: 150, weight: 800, at: END_T, gap: 0.1, lastAt: END_ONE, wobble: true, accentSize: 176, lh: 1.0 })
  // the two accent words "One you." pop together on beat 47
  endL.words[2].t = END_ONE; endL.words[2].big = true; endL.words[3].t = END_ONE + 0.08

  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 1 })

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      fxx.clearRect(0, 0, W, H)

      // ════════ hook: ring of ten + stopwatch
      if (t < 3.2) {
        const leave = ease.inCubic(prog(t, 2.12, 2.5))
        const k = 1 - prog(t, 2.3, 2.5)
        miniRing(bx, t, k, { t0: 0.18, rot: t * 0.55 + leave * 2.2, spread: leave * 1.4 })
        const sw = sp(t, 0.12, 0.45, 2.4) * (1 - ease.inQuad(prog(t, 2.15, 2.4)))
        stopwatch(bx, t, OX, RING_Y, 1.25 * sw, 1, t * 7.5)
        sparkle(fxx, OX, RING_Y, t, 0.32, { n: 14, rad: 380, seed: 5, size: 32 })
      }

      // ════════ the ten planets
      PLANETS.forEach((P, i) => {
        const t0 = SLOT[i], tEnd = SLOT_END[i]
        if (t < t0 - 0.35 || t > tEnd + 0.1) return
        const tt = t - t0
        // fly in from the right (lands on the downbeat), fly off to the left
        const inP = prog(t, t0 - 0.32, t0)
        const outP = ease.inCubic(prog(t, tEnd - 0.3, tEnd + 0.02))
        const x = lerp(OX + 900, OX, ease.outCubic(inP)) - 1300 * outP
        const bob = 10 * Math.sin(t * 2.4 + i)
        const ts = t - t0, sq = ts > 0 ? 0.16 * Math.exp(-ts * 7) * Math.cos(ts * 22) : 0
        const stretch = 0.12 * Math.sin(Math.PI * inP) + 0.15 * Math.sin(Math.PI * outP)
        const sx = (1 + sq + stretch), sy = (1 - sq - stretch * 0.6)
        const gagA = out(t, tEnd - 0.34, 0.22)
        let ox = x, oy = OY + bob
        if (P.id === 'mars') ox += 18 * Math.sin(tt * 13) * clamp(tt * 2)

        // behind the orb
        if (P.id === 'sun') spotlights(bx, t, tt, gagA, OX, OY)
        if (P.id === 'neptune') dreamCloud(bx, t, tt, gagA, OX, OY, 'back')
        if (P.id === 'mars') sprinter(bx, t, tt, gagA, OX, OY)
        orb(bx, P, ox, oy, P.r, t, { sx, sy })
        sparkle(fxx, OX, OY, t, t0 + 0.02, { n: 12, rad: P.r * 1.7, seed: 30 + i, size: 30, cols: [P.col, '#fff3e0', GOLD] })
        // in front
        if (P.id === 'moon') blanket(bx, t, tt, gagA, ox, oy, P.r)
        if (P.id === 'mercury') phoneChat(bx, t, tt, gagA, OX, OY)
        if (P.id === 'venus') beatingHeart(bx, t, tt, gagA, OX, OY, thumpAt(t0))
        if (P.id === 'jupiter') { clover(bx, t, tt, gagA, OX, OY); sparkle(fxx, OX + 300, OY + 310, t, t0 + 0.62, { n: 12, rad: 190, seed: 66, size: 28, cols: ['#5fdc7a', GOLD, '#fff3e0'] }) }
        if (P.id === 'saturn') sternClock(bx, t, tt, gagA, OX, OY, clockSteps(t0))
        if (P.id === 'uranus') { bolt(bx, t, tt, gagA, OX, OY); sparkle(fxx, OX + 300, OY + 300, t, t0 + 0.55, { n: 12, rad: 220, seed: 81, size: 30, cols: ['#ffe27a', '#7fe0d8', '#fff3e0'] }) }
        if (P.id === 'neptune') dreamCloud(bx, t, tt, gagA, OX, OY, 'front')
        if (P.id === 'pluto') {
          butterfly(bx, t, tt, gagA, OX, OY)
          sparkle(fxx, OX + 285, OY - 60, t, t0 + 0.97, { n: 12, rad: 170, seed: 99, size: 28, cols: ['#c9a6ff', PINK, '#fff3e0'] })
          sticker(fxx, t, t - STICK, gagA, OX, OY + 345)
          sparkle(fxx, OX, OY + 345, t, STICK + 0.12, { n: 14, rad: 330, seed: 12, size: 30, cols: [PINK, GOLD, '#fff3e0'] })
        }
      })

      // progress dots: ten little glyphs along the bottom
      const pa = clamp((t - (SLOT[0] - 0.3)) * 3) * (1 - prog(t, END_T - 0.2, END_T + 0.1))
      if (pa > 0.003) {
        const cur = SLOT.reduce((c, s, i) => (t >= s - 0.3 ? i : c), 0)
        bx.save(); bx.textAlign = 'center'; bx.textBaseline = 'middle'
        PLANETS.forEach((P, i) => {
          const x = 540 + (i - 4.5) * 84, y = 1838
          const on = i === cur ? sp(t, SLOT[i] - 0.3, 0.35, 2.4) : 0
          const done = i < cur || (i === cur)
          bx.globalAlpha = pa * (done ? 1 : 0.42)
          bx.font = `${Math.round(44 + 18 * on)}px ${GLYPH_FONT}`
          bx.fillStyle = done ? (i === cur ? P.col : '#efe6d6') : '#efe6d6'
          bx.shadowColor = i === cur ? P.col : 'transparent'; bx.shadowBlur = i === cur ? 18 : 0
          bx.fillText(P.glyph + VS, x, y - 10 * on)
        })
        bx.restore()
      }

      // ════════ end: ten orbs swirl round one person
      if (t >= END_T - 0.1) {
        const k = 1
        const conv = ease.outCubic(prog(t, END_T, END_T + 1.1))
        const R = lerp(620, 300, conv)
        miniRing(bx, t, k, { t0: END_T, cy: 1120, R, rot: t * 0.7 + (1 - conv) * 2.5, size: 46 })
        const ps = sp(t, BURST - 0.15, 0.5, 2.4)
        person(bx, OX, 1150, 1.0 * ps, 1)
        sparkle(fxx, OX, 1080, t, BURST + 0.15, { n: 16, rad: 420, seed: 77, size: 34 })
        sparkle(fxx, OX, 330, t, END_ONE + 0.15, { n: 14, rad: 300, seed: 78, size: 30, cols: [GOLD, '#ffd98a', '#fff3e0'] })
      }

      // ════════ copy
      hook.update(t, HOOK_OUT)
      names.forEach((n, i) => n.update(t, TXT_OUT[i]))
      lines.forEach((n, i) => n.update(t, TXT_OUT[i]))
      endL.update(t)
      // eyebrow counter
      let eyeA = 0
      for (let i = 0; i < 10; i++) if (t >= SLOT[i] - 0.25 && t < TXT_OUT[i] + 0.18) { eye.textContent = `${String(i + 1).padStart(2, '0')} / 10`; eyeA = clamp((t - SLOT[i] + 0.25) * 5) * out(t, TXT_OUT[i], 0.18) }
      eye.style.opacity = String(eyeA)

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : t < 0.4 ? 1 - ease.outQuad(prog(t, 0, 0.4)) : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

// ── sound
const MEL = [784, 880, 988, 1175, 1046, 988, 880, 1318, 1175, 1568]
export const cues = [
  // hook
  ...[659, 784, 880, 1046, 1175].map((f, i) => ['pop', 0.1 + i * 0.08, f, 0.055, (i - 2) * 0.15]),
  ['whoosh', 0.12, 0.5, 0.04], ['glitter', 0.2, 0.9], ['bell', 0.33, 1318.5, 0.03, 1.2, 0],
  ...PLANETS.map((_, i) => ['tick', 0.2 + i * 0.045, 0.03]),
  ...[1, 2, 3].map(n => ['tick', beat(n), 0.06]),
  ['whoosh', 2.12, 0.45, 0.05],
  // planets
  ...PLANETS.flatMap((P, i) => {
    const t0 = SLOT[i], f = MEL[i], n = P.line.split(' ').length
    const c = [
      ['whoosh', t0 - 0.34, 0.4, 0.05],
      ['pop', t0 - 0.22, f, 0.06, 0.2],
      ['pluck', t0, [293.66, 220, 246.94, 196][i % 4], 0.055, 0.6, 0],
      ...Array.from({ length: n }, (_, k) => ['pop', t0 - 0.04 + k * 0.06, [f * 0.75, f * 0.84, f, f * 1.12][k % 4], 0.035, (k - 1) * 0.2]),
    ]
    const g = t0 + 0.55
    if (P.id === 'sun') c.push(['tick', t0 + 0.5, 0.12], ['tick', t0 + 0.78, 0.12], ['bell', t0 + 0.8, 1174.66, 0.03, 1.0, 0])
    if (P.id === 'moon') c.push(['whoosh', t0 + 0.42, 0.4, 0.03], ['bell', t0 + 0.85, 587.33, 0.03, 1.4, 0.3], ['bell', t0 + 1.4, 659.25, 0.02, 1.2, 0.3])
    if (P.id === 'mercury') c.push(...[0.62, 0.7, 0.78, 0.86, 1.3, 1.38, 1.46].map(d => ['tick', t0 + d, 0.05]), ['pop', t0 + 0.7, 1318, 0.045, -0.3], ['pop', t0 + 1.02, 1175, 0.045, -0.2], ['pop', t0 + 1.34, 1568, 0.045, -0.3])
    if (P.id === 'venus') c.push(...[0, 1, 2].map(k => ['pluck', g + k * 0.5556, 146.83, 0.05, 0.25, 0.3]), ['bell', g, 1318.5, 0.025, 1.0, 0.3])
    if (P.id === 'mars') c.push(['whoosh', t0 + 0.35, 1.2, 0.05], ...[0.5, 0.74, 0.98, 1.22, 1.46].map(d => ['tick', t0 + d, 0.035]))
    if (P.id === 'jupiter') c.push(['pop', t0 + 0.45, 1568, 0.05, 0.3], ['glitter', t0 + 0.6, t0 + 1.3], ['bell', t0 + 0.62, 1760, 0.03, 1.2, 0.3])
    if (P.id === 'saturn') c.push(...[0, 1, 2].map(k => ['tick', g + k * 0.5556, 0.14]), ['bell', g + 1.15, 880, 0.02, 0.6, 0.3])
    if (P.id === 'uranus') c.push(['boom', t0 + 0.5, 0.12], ['glitter', t0 + 0.55, t0 + 1.1], ['pop', t0 + 0.5, 1568, 0.04, 0.3])
    if (P.id === 'neptune') c.push(['riser', t0 + 0.3, t0 + 1.4, 0.02], ['bell', t0 + 0.75, 1174.66, 0.025, 1.8, -0.3], ['bell', t0 + 1.05, 1479.98, 0.02, 1.8, 0.3])
    if (P.id === 'pluto') c.push(...[0.6, 0.72, 0.84].map(d => ['tick', t0 + d, 0.05]), ['pop', t0 + 0.97, 1568, 0.05, 0.3], ['glitter', t0 + 0.97, t0 + 1.5],
      ['pop', STICK, 880, 0.065, 0], ['tick', STICK + 0.02, 0.15], ['bell', STICK + 0.05, 1318.5, 0.03, 1.2, 0])
    return c
  }),
  // end
  ['whoosh', END_T - 0.2, 0.6, 0.05],
  ...[784, 880, 988].map((f, i) => ['pop', END_T + i * 0.1, f, 0.05, (i - 1) * 0.2]),
  ['pop', END_ONE, 1318, 0.07, 0], ['bell', END_ONE + 0.02, 1318.5, 0.03, 1.6, 0], ['pop', END_ONE + 0.08, 1568, 0.05, 0.1],
  ['boom', BURST, 0.12], ['glitter', BURST, BURST + 1.4], ['pluck', BURST + 0.02, 587.33, 0.05, 0.8, 0],
  ...[1046, 1318, 1568, 1175, 1397, 1760].map((f, i) => ['pop', BURST + i * 0.06, f, 0.035, i % 2 ? 0.5 : -0.5]),
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.4, 0],
]
