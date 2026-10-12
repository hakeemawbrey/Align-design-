// L03 · Aura — a breathing aura-camera portrait whose colour sweeps the whole spectrum once per loop
// (red → orange → yellow → green → blue → indigo → violet → magenta → red), one sign's aura veil per second,
// aura rings rolling out on every beat, rising motes and a spectrum readout. Seamless 8s loop.
// Loop rules: veil i owns second i (hold on the downbeat, crossfade into veil i+1 over the second half, veil 7
// fades back into veil 0); colour, breathing, rings, motes are all ph/osc/cyc/kick based.
import { W, H, IMG, el, fill, img, clamp, SERIF, MONO, BONE, hexToRgb,
  LOOP, BPM, ph, osc, cyc, kick, hat, bar, spectrum, LOOP_CHORDS, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 960
const TAU = Math.PI * 2
const VEILS = [
  { sign: 'aries', name: 'RED', hex: '#ff2d3a' },
  { sign: 'leo', name: 'ORANGE', hex: '#ff7a2e' },
  { sign: 'gemini', name: 'YELLOW', hex: '#ffd23f' },
  { sign: 'capricorn', name: 'GREEN', hex: '#3fdc8a' },
  { sign: 'aquarius', name: 'BLUE', hex: '#2fd0e6' },
  { sign: 'cancer', name: 'INDIGO', hex: '#4a72ff' },
  { sign: 'pisces', name: 'VIOLET', hex: '#a35cff' },
  { sign: 'scorpio', name: 'MAGENTA', hex: '#ff3d8f' },
]
const N = VEILS.length
const RGB = VEILS.map(v => hexToRgb(v.hex))
const sstep = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
/** which veil + blend toward the next: hold the first half of each second, crossfade the second half */
function blendAt(t) {
  const u = ph(t) * N, i = Math.floor(u) % N, f = sstep((u - Math.floor(u) - 0.45) / 0.55)
  return { i, j: (i + 1) % N, f }
}
function colAt(t) {
  const { i, j, f } = blendAt(t)
  return RGB[i].map((c, k) => Math.round(c + (RGB[j][k] - c) * f))
}
// one sign chime per second, climbing a D-major pentatonic as the colour climbs the spectrum
const NOTES = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99]

export default {
  id: 'L03-aura', title: 'Aura (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, padGain: 0.024, pulseGain: 0.2, hatGain: 0.03 },
  cues: [
    ...NOTES.map((hz, i) => ['bell', i + 0.5, hz, 0.022, 1.4, (i / (N - 1) - 0.5) * 0.6]),
    ['whoosh', 7.45, 0.55, 0.035],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'aurora', { seed: 11, grain: 0.2, stars: 120 })
    const grain = bg.root.lastChild; root.appendChild(grain)          // move the grain above everything
    bg.root.style.opacity = '0.55'
    // full-frame aura field (recoloured every frame)
    const field = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'screen' }, root)
    root.insertBefore(field, grain)
    // the veils
    const VW = 1300, VH = Math.round(VW * 585 / 640)
    const wrap = el('div', { position: 'absolute', left: (CX - VW / 2) + 'px', top: (CY - VH / 2 - 40) + 'px', width: VW + 'px', height: VH + 'px', mixBlendMode: 'screen',
      WebkitMaskImage: 'radial-gradient(ellipse 48% 50% at 50% 56%, #000 58%, transparent 100%)', maskImage: 'radial-gradient(ellipse 48% 50% at 50% 56%, #000 58%, transparent 100%)' }, root)
    root.insertBefore(wrap, grain)
    const imgs = VEILS.map(v => img(wrap, `${IMG}aura/${v.sign}.jpg`, { left: 0, top: 0, width: VW + 'px', height: VH + 'px', opacity: 0 }))
    const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '262px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.42em', color: BONE, opacity: 0.85 }, root, 'WHAT COLOR IS YOURS?')
    const read = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1468px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.4em', color: BONE, opacity: 0.75 }, root, '')
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1590px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '76px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25)' }, root, 'Align')
    ;[eyebrow, read, word].forEach(e => root.insertBefore(e, grain))
    return {
      update(t) {
        bg.update(t)
        const { i, j, f } = blendAt(t), k = kick(t)
        const [r, g, b] = colAt(t)
        const glow = 0.5 + 0.12 * osc(t, 4) + 0.22 * k
        field.style.background = `radial-gradient(ellipse 70% 46% at 50% 52%, rgba(${r},${g},${b},${0.26 * glow}) 0%, rgba(${r},${g},${b},${0.12 * glow}) 45%, rgba(${r},${g},${b},0) 78%),` +
          `radial-gradient(ellipse 120% 40% at 50% 100%, rgba(${r},${g},${b},${0.25 * glow}), rgba(${r},${g},${b},0) 70%)`
        imgs.forEach((im, q) => { im.style.opacity = String(q === i ? 1 - f : q === j ? f : 0) })
        // breathing: one breath per bar, plus a small kick swell
        const s = 1 + 0.025 * osc(t, 4, -0.25) + 0.012 * k
        wrap.style.transform = `scale(${s})`
        wrap.style.filter = `brightness(${0.86 + 0.2 * k}) saturate(${1.25 + 0.15 * k}) contrast(1.08)`
        const v = f < 0.5 ? VEILS[i] : VEILS[j]
        const txt = `${v.name} · ${v.sign.toUpperCase()}`
        if (read.textContent !== txt) read.textContent = txt
        read.style.opacity = String(0.55 + 0.3 * (1 - Math.sin(Math.PI * f)))
        word.style.opacity = String(0.82 + 0.12 * bar(t))
      },
      fx(ctx, t) {
        const k = kick(t), hh = hat(t)
        const [r, g, b] = colAt(t)
        const C = (a) => `rgba(${r},${g},${b},${a})`
        loopStars(ctx, t, { seed: 13, sprites: 16, dots: 60, alpha: 0.7, keepOut: [[140, 440, 800, 1000]] })
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        // aura rings: one per beat, rolling out from the body (tall ellipses)
        for (let q = 0; q < 4; q++) {
          const u = ((ph(t) * 16 - q) % 1 + 1) % 1
          const e = 1 - (1 - u) ** 2.2
          const rx = 280 + e * 520, ry = rx * 1.28
          const a = (1 - u) ** 1.5 * clamp(u / 0.08)
          ctx.filter = 'blur(18px)'; ctx.strokeStyle = C(0.22 * a); ctx.lineWidth = 40
          ctx.beginPath(); ctx.ellipse(CX, CY + 40, rx, ry, 0, 0, TAU); ctx.stroke()
          ctx.filter = 'blur(1.5px)'; ctx.strokeStyle = `rgba(255,243,224,${0.16 * a})`; ctx.lineWidth = 2.5
          ctx.beginPath(); ctx.ellipse(CX, CY + 40, rx, ry, 0, 0, TAU); ctx.stroke()
          ctx.filter = 'none'
        }
        // rising motes (each wraps once or twice per loop, fading at both ends)
        for (let m = 0; m < 46; m++) {
          const sx = (m * 0.6180339) % 1, n = 1 + (m % 2), c = cyc(t, n, (m * 0.3819) % 1)
          const x = CX + (sx - 0.5) * 820 + 18 * osc(t, 2, sx)
          const y = 1500 - c * 1150
          const a = Math.sin(Math.PI * c) * (0.35 + 0.4 * hh * (m % 3 === 0 ? 1 : 0.3))
          const rad = 2 + (m % 4)
          const gg = ctx.createRadialGradient(x, y, 0, x, y, rad * 4)
          gg.addColorStop(0, `rgba(255,247,236,${a})`); gg.addColorStop(0.35, C(a * 0.6)); gg.addColorStop(1, C(0))
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, rad * 4, 0, TAU); ctx.fill()
        }
        ctx.restore()
        // spectrum readout: mirrored bars, each tinted by its chakra band, above the wordmark
        const S = spectrum(t, 24), NB = 48, x0 = 250, x1 = 830, base = 1572
        for (let q = 0; q < NB; q++) {
          const m = q < NB / 2 ? NB / 2 - 1 - q : q - NB / 2
          const v = S[m], x = x0 + (q + 0.5) / NB * (x1 - x0)
          const hgt = 4 + v * 52
          const [cr, cg, cb] = RGB[Math.min(N - 1, Math.floor(m / (NB / 2) * N))]
          ctx.globalAlpha = 0.35 + 0.6 * v
          ctx.fillStyle = `rgb(${Math.round((cr + r) / 2)},${Math.round((cg + g) / 2)},${Math.round((cb + b) / 2)})`
          ctx.fillRect(x - 3, base - hgt, 6, hgt)
        }
        ctx.globalAlpha = 1
        void H; void BPM; void k
      },
    }
  },
}
