// 07-aura — "What color is your aura?" · rapid-cut montage of real aura portraits, each one shot on an
// aura camera: the Polaroid drops onto the pile with a flash, its false-colour print sweeps the chakra
// spectrum red → violet, then resolves to the real photo while the readout lands on that person's colour.
//
// Timing
//   0.00–0.85  hook "What color is / your aura?" types in (top) · hero print (Juniper) develops 0.0–0.3
//   0.25–1.20  hero sweep red → violet · 1.20 resolve flash → real photo · readout "VIOLET · INTUITIVE"
//   1.75 …     12 more prints, cuts accelerating (0.70s → 0.30s), each: drop + flash, fast sweep, resolve
//   6.29–7.20  last print (Lena) holds · 6.95–7.25 hook out · stack recedes and dims
//   7.35–9.35  "Your aura says / what your bio won't." · 9.70 end tag → 12.0
import { W, H, IMG, SERIF, MONO, el, fill, img, prog, ease, clamp, lerp, rng, spaceBackdrop, typeLine, starField, pixelStar, endTag, BONE, GOLD, CHAKRAS } from './kit.js'

const DURATION = 12
const END = 9.7

// ── people: photo, name/sign for the print's strip, the reading it lands on ───────────────
const P = (f) => IMG + 'people/' + f
const PEOPLE7 = [
  { src: IMG + 'juniper.jpg', name: 'Juniper', sign: 'Libra', col: 'VIOLET', trait: 'INTUITIVE', hex: '#b45cff', ch: 6, fy: 0.3 },
  { src: P('p9.jpg'), name: 'Rio', sign: 'Leo', col: 'ORANGE', trait: 'FEARLESS', hex: '#ff7a2e', ch: 1 },
  { src: P('p6.jpg'), name: 'Ari', sign: 'Aquarius', col: 'BLUE', trait: 'HONEST', hex: '#2fd0e6', ch: 4 },
  { src: P('p3.jpg'), name: 'Maya', sign: 'Virgo', col: 'ROSE', trait: 'MAGNETIC', hex: '#ff5fa2', ch: 0 },
  { src: P('p2.jpg'), name: 'Kai', sign: 'Capricorn', col: 'GREEN', trait: 'GROUNDED', hex: '#5fdc54', ch: 3 },
  { src: P('p11.jpg'), name: 'Theo', sign: 'Cancer', col: 'INDIGO', trait: 'OLD SOUL', hex: '#4a72ff', ch: 5 },
  { src: P('p5.jpg'), name: 'Noor', sign: 'Libra', col: 'YELLOW', trait: 'RADIANT', hex: '#ffd23f', ch: 2 },
  { src: P('p4.jpg'), name: 'Jae', sign: 'Sagittarius', col: 'RED', trait: 'PASSIONATE', hex: '#ff2d3a', ch: 0 },
  { src: P('p7.jpg'), name: 'Sol', sign: 'Pisces', col: 'TEAL', trait: 'EMPATH', hex: '#2fe6c0', ch: 4 },
  { src: P('p10.jpg'), name: 'Bianca', sign: 'Taurus', col: 'GOLD', trait: 'LOYAL', hex: '#f2c75c', ch: 2 },
  { src: P('p12.jpg'), name: 'Ivy', sign: 'Pisces', col: 'CORAL', trait: 'ROMANTIC', hex: '#ff6a4d', ch: 1 },
  { src: P('p8.jpg'), name: 'Amara', sign: 'Sagittarius', col: 'LAVENDER', trait: 'DREAMER', hex: '#c9a6ff', ch: 6 },
  { src: P('p1.jpg'), name: 'Lena', sign: 'Gemini', col: 'MAGENTA', trait: 'CREATIVE', hex: '#ff4fd8', ch: 6 },
]
// cut times: hero 1.75s, then accelerating
const DURS = [1.75, 0.7, 0.6, 0.5, 0.45, 0.4, 0.36, 0.33, 0.3, 0.3, 0.3, 0.3, 0.91]
const CUT = DURS.reduce((a, d) => (a.push(a[a.length - 1] + d), a), [0]) // CUT[i] = start of print i; CUT[13] = 7.2
const N = PEOPLE7.length
/** per-print sub-timing: [sweepA, sweepB, resolveA, resolveB] (absolute seconds) */
function phases(i) {
  const a = CUT[i]
  if (i === 0) return [0.25, 1.2, 1.18, 1.36]
  const d = Math.min(DURS[i], 0.62)
  return [a + 0.03, a + d * 0.6, a + d * 0.58, a + d * 0.58 + 0.09]
}
const RECEDE = { a: 6.95, b: 7.55 }
const CLOSE = 7.3
// closing spread: every print fanned out on an arc under the closing line (Lena lands in the centre)
const ARC = { cx: W / 2, cy: 2420, r: 1300, step: 5.6 }
const ARC_ORDER = [1, 3, 5, 7, 9, 0, 12, 11, 10, 8, 6, 4, 2]
const SPW = 290, SPS = () => SPW / PW               // spread card width / scale vs the big print
const arcPos = (k) => { const a = (k - 6) * ARC.step * Math.PI / 180; return { x: ARC.cx + ARC.r * Math.sin(a), y: ARC.cy - ARC.r * Math.cos(a), rot: (k - 6) * ARC.step } }
const DEAL = (k) => 7.18 + Math.abs(k - 6) * 0.055 + (k < 6 ? 0.02 : 0)

// ── geometry: the Polaroid ───────────────────────────────────────────────────
const WW = 700, WH = 760                 // photo window
const BORDER = 34, STRIP = 132
const PW = WW + BORDER * 2, PH = WH + BORDER + STRIP // 768 × 926
const PX = W / 2, PY = 500 + PH / 2       // resting centre (top at y 500)
const R = rng(707)
const POSE = PEOPLE7.map((_, i) => i === 0 ? { rot: -1.2, dx: 0, dy: 0 } : { rot: (R() - 0.5) * 7, dx: (R() - 0.5) * 34, dy: (R() - 0.5) * 22 })

// ── aura camera print (adapted from promo/src/scenes/s3-veil.js makeAuraPrint) ─────────────
const CHAKRA = CHAKRAS.map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)))
const CH_NAMES = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET']
const LAG = 1.25
function chakraAt(x) {
  x = clamp(x, 0, 6); const i = Math.min(5, Math.floor(x)), f = x - i
  const a = CHAKRA[i], b = CHAKRA[i + 1]
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
}
const rgbS = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`
/** sweep position (0 → 6 + LAG) through [a, b], lingering slightly on each hue so every colour registers */
function sweepAt(t, a, b) {
  const u = prog(t, a, b) * (6 + LAG)
  const i = Math.floor(u), f = u - i
  return i + lerp(f, f * f * (3 - 2 * f), 0.55)
}
function makeAuraPrint(src) {
  const cv = document.createElement('canvas')
  let L = null, band = null, id = null, w = 0, h = 0, lastS = null
  const NB = 40, D = [10, 5, 30], HOTC = [255, 250, 240]
  const lut = new Uint8ClampedArray(NB * 256 * 3)
  function init() {
    if (L) return true
    if (!src.complete || !src.naturalWidth) return false
    w = src.naturalWidth; h = src.naturalHeight; cv.width = w; cv.height = h
    const g = cv.getContext('2d', { willReadFrequently: true })
    g.drawImage(src, 0, 0, w, h)
    const d = g.getImageData(0, 0, w, h).data
    const n = w * h, raw = new Float32Array(n), hist = new Uint32Array(256)
    for (let i = 0; i < n; i++) { const v = 0.3 * d[i * 4] + 0.59 * d[i * 4 + 1] + 0.11 * d[i * 4 + 2]; raw[i] = v; hist[v | 0]++ }
    let acc = 0, lo = 0, hi = 255
    for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc < n * 0.01) lo = v; if (acc < n * 0.995) hi = v }
    L = new Uint8Array(n); band = new Uint8Array(n)
    const cx = w * 0.5, cy = h * 0.6, rx = w * 0.62, ry = h * 0.62
    for (let y = 0, i = 0; y < h; y++) for (let x = 0; x < w; x++, i++) {
      L[i] = clamp((raw[i] - lo) / (hi - lo)) * 255
      const r = clamp(Math.hypot((x - cx) / rx, (y - cy) / ry))
      band[i] = Math.min(NB - 1, Math.floor(r * r * (3 - 2 * r) * NB))
    }
    id = g.createImageData(w, h)
    for (let i = 0; i < n; i++) id.data[i * 4 + 3] = 255
    return true
  }
  const mixc = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f]
  function draw(s) {
    if (!init() || s === lastS) return !!L
    lastS = s
    for (let b = 0; b < NB; b++) {
      const r = (b + 0.5) / NB, c = chakraAt(s - LAG * r)
      const stops = [[0, mixc(D, c, 0.12)], [0.24, mixc(D, c, 0.55)], [0.46, c], [0.7, mixc(c, HOTC, 0.5)], [0.88, HOTC], [1, HOTC]]
      for (let v = 0, k = 0; v < 256; v++) {
        const l = v / 255
        while (k < stops.length - 2 && l > stops[k + 1][0]) k++
        const [l0, c0] = stops[k], [l1, c1] = stops[k + 1], f = clamp((l - l0) / (l1 - l0)), o = (b * 256 + v) * 3
        const ff = f * f * (3 - 2 * f)
        lut[o] = c0[0] + (c1[0] - c0[0]) * ff; lut[o + 1] = c0[1] + (c1[1] - c0[1]) * ff; lut[o + 2] = c0[2] + (c1[2] - c0[2]) * ff
      }
    }
    const px = id.data, n = w * h
    for (let i = 0, j = 0; i < n; i++, j += 4) { const o = (band[i] * 256 + L[i]) * 3; px[j] = lut[o]; px[j + 1] = lut[o + 1]; px[j + 2] = lut[o + 2] }
    cv.getContext('2d').putImageData(id, 0, 0)
    return true
  }
  return { cv, draw }
}

function grainCanvas(size = 256, seed = 7) {
  const c = document.createElement('canvas'); c.width = c.height = size
  const g = c.getContext('2d'), d = g.createImageData(size, size), r = rng(seed)
  for (let i = 0; i < size * size; i++) { const v = Math.round(128 + (r() + r() + r() - 1.5) * 130); d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255 }
  g.putImageData(d, 0, 0)
  return c
}

export default {
  id: '07-aura', title: 'What color is your aura?', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, 1.75, [146.83, 220, 293.66, 369.99, 440]],          // D add9 colour
      [1.75, 4.6, [164.81, 246.94, 329.63, 415.3, 493.88]],   // E (lydian lift)
      [4.6, 7.2, [185, 277.18, 369.99, 440, 554.37]],         // F#m7
      [7.2, END, [123.47, 185, 246.94, 293.66, 369.99]],      // Bm9 — the closing line
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]], // D maj7 — tag
    ],
    padGain: 0.024,
  },
  cues: (() => {
    // each colour has its own note (D lydian, low → high with the chakra), struck as the reading lands
    const NOTE = [587.33, 659.25, 739.99, 830.61, 880, 987.77, 1108.73]
    const c = [
      ['riser', 0.05, 1.2, 0.07], ['glitter', 0.3, 1.15], ['whoosh', 0.12, 0.4, 0.06],
      ['bell', 1.22, 1108.73, 0.07, 2.4, 0], ['bell', 1.22, 554.37, 0.04, 2.6, 0], ['boom', 1.2, 0.16],
    ]
    for (let i = 1; i < N; i++) {
      const a = CUT[i], [, , ra] = phases(i), p = PEOPLE7[i]
      c.push(['tick', a, 0.11], ['whoosh', a + 0.02, 0.18, 0.04])
      c.push(['bell', ra + 0.03, NOTE[p.ch], 0.045, 0.9, ((i % 5) - 2) * 0.18])
    }
    c.push(['boom', CUT[12] + 0.06, 0.12], ['glitter', CUT[12] + 0.1, CUT[12] + 0.45])
    c.push(['whoosh', RECEDE.a + 0.15, 0.6, 0.08], ['bell', CLOSE + 0.1, 739.99, 0.05, 2.4, -0.2], ['bell', CLOSE + 0.75, 987.77, 0.04, 2.4, 0.2])
    for (let k = 0; k < 13; k++) if (k !== 6) c.push(['tick', DEAL(k) + 0.02, 0.05])
    return c
  })(),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'aurora', { seed: 7, grain: 0.22 })
    // deepen the centre so the prints read as objects lit in a dark room
    fill(root, { background: 'radial-gradient(60% 42% at 50% 50%, rgba(9,4,26,0.55) 0%, rgba(9,4,26,0.2) 70%, rgba(9,4,26,0) 100%)' })
    // a coloured spill of the current aura behind the pile
    const spill = el('div', { position: 'absolute', left: (PX - 700) + 'px', top: (PY - 760) + 'px', width: '1400px', height: '1520px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0 }, root)

    const pile = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    const grain = grainCanvas()
    // three Polaroid slots (under-2, under-1, top) re-assigned each frame
    const slots = [0, 1, 2].map(() => {
      const card = el('div', { position: 'absolute', left: (PX - PW / 2) + 'px', top: (PY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '6px',
        background: 'linear-gradient(170deg, #f6f0e4 0%, #ece3d2 60%, #e3d8c4 100%)', boxShadow: '0 40px 70px rgba(4,2,14,0.6), 0 6px 18px rgba(4,2,14,0.45)', display: 'none' }, pile)
      const cv = el('canvas', { position: 'absolute', left: BORDER + 'px', top: BORDER + 'px', width: WW + 'px', height: WH + 'px', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25)' }, card)
      cv.width = WW; cv.height = WH
      el('div', { position: 'absolute', left: BORDER + 'px', top: BORDER + 'px', width: WW + 'px', height: WH + 'px', boxShadow: 'inset 0 0 0 1.5px rgba(30,20,40,0.35), inset 0 2px 8px rgba(0,0,0,0.35)' }, card)
      const cap = el('div', { position: 'absolute', left: (BORDER + 6) + 'px', top: (BORDER + WH + 30) + 'px', width: (WW - 12) + 'px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '52px', color: '#2b2140', opacity: 0.86, letterSpacing: '0.01em' }, card)
      const no = el('div', { position: 'absolute', right: (BORDER + 6) + 'px', top: (BORDER + WH + 50) + 'px', fontFamily: MONO, fontSize: '22px', letterSpacing: '0.2em', color: 'rgba(43,33,64,0.55)' }, card)
      return { card, cv, g: cv.getContext('2d'), cap, no, key: '' }
    })
    // source images + aura prints (hidden <img>s so main.js waits for them)
    const srcs = PEOPLE7.map((p) => img(root, p.src, { left: '-10px', top: '-10px', width: '1px', height: '1px', opacity: 0 }))
    const prints = srcs.map((s) => makeAuraPrint(s))

    function cover(g, im, iw, ih, fy = 0.45, zoom = 1) {
      const s = Math.max(WW / iw, WH / ih) * zoom, dw = iw * s, dh = ih * s
      g.drawImage(im, (WW - dw) / 2, (WH - dh) * fy, dw, dh)
    }
    /** paint print i into slot at time t */
    function paint(slot, i, t, top) {
      const p = PEOPLE7[i], im = srcs[i], [sa, sb, ra, rb] = phases(i)
      const fi = Math.round(t * 30)
      const auraO = top ? 1 - ease.inOutQuad(prog(t, ra, rb)) : 0
      const sw = sweepAt(t, sa, sb)
      const develop = i === 0 ? ease.outQuad(prog(t, 0, 0.32)) : 1
      const key = top ? `${i}|${fi}` : `${i}|settled`
      if (slot.key === key) return
      slot.key = key
      const g = slot.g
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.filter = 'none'
      g.fillStyle = '#120a24'; g.fillRect(0, 0, WW, WH)
      if (!im.naturalWidth) return
      const zoom = top ? 1 + 0.025 * prog(t, CUT[i], CUT[i + 1] + 0.4) : 1.025
      const fy = p.fy ?? 0.5
      // real photo (slightly warm, the way the instant film renders it)
      g.filter = `saturate(1.08) contrast(1.04) brightness(${1 + 0.35 * (top ? Math.max(0, 1 - prog(t, rb - 0.02, rb + 0.3)) * (t > ra ? 1 : 0) : 0)})`
      cover(g, im, im.naturalWidth, im.naturalHeight, fy, zoom)
      g.filter = 'none'
      if (auraO > 0.001 && prints[i].draw(Math.round(sw * 1000) / 1000)) {
        g.globalAlpha = auraO
        g.filter = 'blur(1.2px) contrast(1.06)'
        cover(g, prints[i].cv, im.naturalWidth, im.naturalHeight, fy, zoom)
        g.filter = 'none'
        // halo at the head + edge field + light leak, all in the sweep's colours
        g.globalCompositeOperation = 'screen'
        const cIn = chakraAt(sw), cOut = chakraAt(sw - LAG - 0.2), cLeak = chakraAt(sw + 0.9)
        let gr = g.createRadialGradient(WW / 2, WH * 0.46, 0, WW / 2, WH * 0.46, WW * 0.62)
        gr.addColorStop(0, 'rgba(255,250,240,0)'); gr.addColorStop(0.3, 'rgba(255,250,240,0.12)'); gr.addColorStop(0.5, rgbS(cIn, 0.38)); gr.addColorStop(0.75, rgbS(cIn, 0.18)); gr.addColorStop(1, rgbS(cIn, 0))
        g.fillStyle = gr; g.fillRect(0, 0, WW, WH)
        gr = g.createRadialGradient(WW / 2, WH * 0.42, WW * 0.35, WW / 2, WH * 0.42, WW * 0.85)
        gr.addColorStop(0, rgbS(cOut, 0)); gr.addColorStop(1, rgbS(cOut, 0.55))
        g.fillStyle = gr; g.fillRect(0, 0, WW, WH)
        const lx = lerp(-0.1, 1.0, prog(t, sa - 0.05, rb)) * WW
        gr = g.createRadialGradient(lx, WH * 0.4, 0, lx, WH * 0.4, WW * 0.5)
        gr.addColorStop(0, 'rgba(255,246,232,0.32)'); gr.addColorStop(0.4, rgbS(cLeak, 0.35)); gr.addColorStop(1, rgbS(cLeak, 0))
        g.fillStyle = gr; g.fillRect(0, 0, WW, WH)
        g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'
      }
      // instant-film develop (hero only): from milky grey-violet to the image
      if (develop < 1) { g.globalAlpha = 1 - develop; g.fillStyle = '#2a2238'; g.fillRect(0, 0, WW, WH); g.globalAlpha = 1 }
      // film grain + inner vignette
      const rr = rng(fi * 13 + i)
      g.globalCompositeOperation = 'overlay'; g.globalAlpha = 0.22
      const ox = -Math.floor(rr() * 256), oy = -Math.floor(rr() * 256)
      for (let y = oy; y < WH; y += 256) for (let x = ox; x < WW; x += 256) g.drawImage(grain, x, y)
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1
      const vg = g.createRadialGradient(WW / 2, WH * 0.45, WW * 0.38, WW / 2, WH * 0.45, WW * 0.82)
      vg.addColorStop(0, 'rgba(10,5,30,0)'); vg.addColorStop(1, 'rgba(10,5,30,0.42)')
      g.fillStyle = vg; g.fillRect(0, 0, WW, WH)
      // camera flash on the drop
      const fl = top ? (i === 0 ? 0 : 1 - ease.outQuad(prog(t, CUT[i], CUT[i] + 0.12))) : 0
      if (fl > 0) { g.fillStyle = `rgba(255,252,246,${0.9 * fl})`; g.fillRect(0, 0, WW, WH) }
    }

    // ── closing spread (small settled prints) ──
    const spread = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    const k0 = SPS(), SB = BORDER * k0, SWW = WW * k0, SWH = WH * k0, SPH = PH * k0
    const spCards = ARC_ORDER.map((i, k) => {
      if (k === 6) return null
      const c = el('div', { position: 'absolute', left: (-SPW / 2) + 'px', top: (-SPH / 2) + 'px', width: SPW + 'px', height: SPH + 'px', borderRadius: '3px',
        background: 'linear-gradient(170deg, #f6f0e4 0%, #ece3d2 60%, #e3d8c4 100%)', boxShadow: '0 18px 30px rgba(4,2,14,0.55), 0 3px 8px rgba(4,2,14,0.4)', display: 'none' }, spread)
      img(c, PEOPLE7[i].src, { left: SB + 'px', top: SB + 'px', width: SWW + 'px', height: SWH + 'px', objectFit: 'cover', objectPosition: `50% ${(PEOPLE7[i].fy ?? 0.5) * 100}%`, filter: 'saturate(1.08) contrast(1.04)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3)' })
      el('div', { position: 'absolute', left: (SB + 2) + 'px', top: (SB + SWH + 9) + 'px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '19px', color: '#2b2140', opacity: 0.85 }, c, `${PEOPLE7[i].name}, ${PEOPLE7[i].sign.toLowerCase()}`)
      return c
    })

    // ── type ──
    const hook = typeLine(root, 'What color is\nyour aura?', { y: 232, size: 104, perChar: 0.022, fade: 0.26 })
    const close = typeLine(root, 'Your aura says\nwhat your bio won’t.', { y: 560, size: 100, perChar: 0.026, fade: 0.3 })
    // readout: ● AURA READING · VIOLET · INTUITIVE  + chakra bar
    const RO_Y = PY + PH / 2 + 46
    const ro = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: RO_Y + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.2em', color: 'rgba(239,230,214,0.94)', textShadow: '0 1px 12px rgba(11,6,32,0.8)', opacity: 0, whiteSpace: 'nowrap' }, root)
    const roDot = el('span', { display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', marginRight: '18px', verticalAlign: '1px' }, ro)
    const roText = el('span', {}, ro)
    const bar = el('div', { position: 'absolute', left: (W / 2 - 7 * 38 / 2) + 'px', top: (RO_Y + 56) + 'px', display: 'flex', gap: '8px', opacity: 0 }, root)
    const segs = CHAKRA.map((c) => el('div', { width: '30px', height: '5px', borderRadius: '3px', background: rgbS(c) }, bar))
    const tag = endTag(stage, { start: END, end: DURATION, line: 'WHAT COLOR\nIS YOURS?' })

    let cur = 0
    return {
      update(t) {
        bg.update(t)
        // which print is on top
        cur = 0
        for (let i = 0; i < N; i++) if (t >= CUT[i]) cur = i
        const p = PEOPLE7[cur], [sa, sb, ra, rb] = phases(cur)
        const rec = ease.inOutCubic(prog(t, RECEDE.a, RECEDE.b))
        // pile: slots show cur-2, cur-1, cur
        const show = [cur - 2, cur - 1, cur]
        slots.forEach((s, k) => {
          const i = show[k]
          if (i < 0) { s.card.style.display = 'none'; return }
          s.card.style.display = 'block'
          const pose = POSE[i], top = k === 2
          const dl = top && i > 0 ? prog(t, CUT[i], CUT[i] + 0.1) : 1
          const C6 = arcPos(6)
          const sc = lerp(1.07, 1, ease.outCubic(dl)) * lerp(1, SPS(), rec)
          const ty = lerp(pose.dy, C6.y - PY, rec), tx = lerp(pose.dx, 0, rec)
          s.card.style.transform = `translate(${tx}px, ${ty}px) rotate(${lerp(pose.rot + (1 - dl) * 2, 0, rec)}deg) scale(${sc})`
          s.card.style.filter = top ? 'none' : `brightness(${k === 1 ? 0.62 : 0.42})`
          s.card.style.opacity = String(top ? 1 : (k === 1 ? 1 : 0.9) * (1 - rec))
          if (s.idx !== i) { s.idx = i; s.cap.textContent = `${PEOPLE7[i].name}, ${PEOPLE7[i].sign.toLowerCase()}`; s.no.textContent = '№ ' + String(41 + i * 3).padStart(3, '0') }
          paint(s, i, t, top)
        })
        pile.style.opacity = spread.style.opacity = String(1 - prog(t, END - 0.25, END))
        // deal the spread out from the centre
        const C6 = arcPos(6)
        spCards.forEach((c, k) => {
          if (!c) return
          const d = ease.outCubic(prog(t, DEAL(k), DEAL(k) + 0.42))
          if (d <= 0) { c.style.display = 'none'; return }
          const P2 = arcPos(k), drift = 1 + 0.02 * prog(t, 7.6, END)
          c.style.display = 'block'
          c.style.zIndex = String(20 - Math.abs(k - 6))
          c.style.transform = `translate(${lerp(C6.x, P2.x, d)}px, ${lerp(C6.y + 10, P2.y, d) - 8 * Math.sin(Math.PI * d)}px) rotate(${lerp(0, P2.rot, d) * drift}deg)`
          c.style.opacity = String(Math.min(1, d * 3))
        })
        pile.style.zIndex = '2'; spread.style.zIndex = '1'
        // spill: sweep colour, then the person's colour
        const settled = t >= ra
        const sw = sweepAt(t, sa, sb)
        const sc = settled ? [1, 3, 5].map((k) => parseInt(p.hex.slice(k, k + 2), 16)) : chakraAt(sw)
        spill.style.background = `radial-gradient(closest-side, ${rgbS(sc, 0.34)} 0%, ${rgbS(sc, 0.13)} 45%, ${rgbS(sc, 0)} 100%)`
        spill.style.opacity = String((cur === 0 ? prog(t, 0.2, 0.6) : 1) * 0.75 * (1 - rec * 0.6) * (1 - prog(t, END - 0.3, END)))
        // readout
        const roO = ease.outQuad(prog(t, 0.3, 0.5)) * (1 - prog(t, RECEDE.a, RECEDE.a + 0.2))
        ro.style.opacity = bar.style.opacity = String(roO)
        if (roO > 0) {
          if (!settled) {
            const k = Math.round(clamp(sw, 0, 6))
            roText.textContent = `AURA READING · ${CH_NAMES[k]}`
            roDot.style.background = rgbS(chakraAt(sw)); roDot.style.boxShadow = `0 0 16px 4px ${rgbS(chakraAt(sw), 0.8)}`
            segs.forEach((s, i) => { s.style.opacity = String(i < k ? 0.6 : i === k ? 1 : 0.28); s.style.boxShadow = i === k ? `0 0 12px 2px ${rgbS(CHAKRA[i], 0.9)}` : 'none' })
          } else {
            roText.textContent = `AURA READING · ${p.col} · ${p.trait}`
            const pop = 1 - ease.outQuad(prog(t, ra, ra + 0.25))
            roDot.style.background = p.hex; roDot.style.boxShadow = `0 0 ${16 + 20 * pop}px ${4 + 6 * pop}px ${p.hex}`
            segs.forEach((s, i) => { s.style.opacity = String(i === p.ch ? 1 : 0.28); s.style.boxShadow = i === p.ch ? `0 0 14px 3px ${rgbS(CHAKRA[i], 0.9)}` : 'none' })
          }
        }
        hook.update(t, RECEDE.a)
        close.update(t - CLOSE, END - 0.35 - CLOSE)
        tag.update(t)
      },
      fx(ctx, t) {
        const a = 1 - prog(t, END - 0.3, END)
        if (a <= 0) return
        starField(ctx, t, { seed: 11, sprites: 18, dots: 50, alpha: 0.8 * a, keepOut: [[PX - PW / 2 - 20, PY - PH / 2 - 20, PW + 40, PH + 40], [80, 220, 920, 260]] })
        // sparkles burst off the print as each reading resolves
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < N; i++) {
          const [, , ra] = phases(i), q = prog(t, ra, ra + (i === 0 ? 0.7 : 0.45))
          if (q <= 0 || q >= 1 || t > RECEDE.a + 0.3) continue
          const r = rng(300 + i), n = i === 0 ? 14 : 6, pose = POSE[i]
          for (let k = 0; k < n; k++) {
            const ang = r() * 6.283, d0 = 0.56 + r() * 0.08, d = (d0 + q * (0.25 + r() * 0.2))
            const x = PX + pose.dx + Math.cos(ang) * PW * d * 0.95, y = PY + pose.dy + Math.sin(ang) * PH * d * 0.8
            ctx.globalAlpha = Math.sin(Math.PI * q) * a
            pixelStar(ctx, x, y, r() < 0.5 ? 4 : 3, Math.floor(r() * 3), r() < 0.35 ? GOLD : BONE)
          }
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
      },
    }
  },
}
