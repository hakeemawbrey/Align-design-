// L10 · Faith — the signature ambient loop. "Put your faith in the stars." breathing with the music:
// per-letter glow from the spectrum, a light sweep across the words once per bar, a crescent moon that
// waxes and wanes above, aurora curtains swaying below, the chakra column glowing faintly behind.
// Seamless 8s loop: every motion is built from ph/osc/cyc/kick/hat/bar (integer cycles per loop).
import { W, H, el, fill, lerp, clamp, SERIF, MONO, BONE, CHAKRAS, drawMoon, pixelStar,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, spectrum, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2
const LINES = [['Put your faith', 905], ['in the stars.', 1065]]   // [text, baseline y]
const FS = 132
const FONT = `italic 400 ${FS}px 'EB Garamond', Georgia, serif`
const MOON = [CX, 470, 84]
// Faith progression: D → Bm → G → A, airy voicings (one chord per bar)
const CHORDS = [
  [146.83, 220, 293.66, 369.99, 659.25],   // Dmaj (add9 top)
  [123.47, 246.94, 293.66, 369.99, 554.37],// Bm add9
  [98, 196, 246.94, 293.66, 440],          // G add9
  [110, 220, 277.18, 329.63, 493.88],      // A add9
]
const sstep = (a, b, x) => { const u = clamp((x - a) / (b - a), 0, 1); return u * u * (3 - 2 * u) }

export default {
  id: 'L10-faith', title: 'Put your faith in the stars (loop)', duration: LOOP, loop: true,
  music: { chords: CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.16, hatGain: 0.028 },
  // a glassy bell rides each light sweep (just after every downbeat), soft glitter as the moon fills
  cues: [
    ...[0, 1, 2, 3].map(i => ['bell', i * 2 + 0.75, [739.99, 739.99, 587.33, 659.25][i], 0.03, 2.2, (i % 2 ? 0.25 : -0.25)]),
    ...[0, 1, 2, 3].map(i => ['bell', i * 2 + 1.25, [1108.73, 987.77, 880, 987.77][i], 0.016, 1.6, (i % 2 ? -0.3 : 0.3)]),
    ['glitter', 0.2, 1.6], ['glitter', 4.2, 5.6],
  ],
  async build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'teal', { seed: 10, grain: 0.18, stars: 160 })
    // hidden spans make sure both fonts are loaded before the canvas draws with them
    el('div', { position: 'absolute', left: '-9999px', fontFamily: SERIF, fontStyle: 'italic' }, root, 'Put your faith in the stars.')
    const mark = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1540px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.62em', textIndent: '0.62em', color: BONE, opacity: 0.7, textShadow: '0 0 14px rgba(11,6,32,0.8)' }, root, 'ALIGN')
    try { await document.fonts.load(FONT, 'Put your faith in the stars.') } catch (e) { void e }
    // per-letter layout (kerned positions via prefix widths)
    const mc = document.createElement('canvas').getContext('2d'); mc.font = FONT
    const glyphs = []
    LINES.forEach(([txt, y], li) => {
      const w = mc.measureText(txt).width, x0 = CX - w / 2
      ;[...txt].forEach((ch, i) => {
        if (ch === ' ') return
        glyphs.push({ ch, x: x0 + mc.measureText(txt.slice(0, i)).width, y, li })
      })
    })
    glyphs.forEach((g, i) => { g.band = Math.round((i / (glyphs.length - 1)) * 31); g.seq = i })
    // glyph-local mid x for sweep
    glyphs.forEach(g => { g.cx = g.x + mc.measureText(g.ch).width / 2 })
    return {
      update(t) { bg.update(t); mark.style.opacity = String(0.66 + 0.14 * bar(t, 3)) },
      fx(ctx, t) {
        const k = kick(t), h = hat(t), b = bar(t), p = ph(t)
        aurora(ctx, t)
        loopStars(ctx, t, { seed: 21, sprites: 30, dots: 110, keepOut: [[110, 760, 860, 360], [400, 330, 280, 280]] })
        chakraColumn(ctx, t)
        // soft rose/violet bloom behind the words, breathing with the kick
        const bl = ctx.createRadialGradient(CX, 985, 40, CX, 985, 520)
        bl.addColorStop(0, `rgba(214,170,255,${0.10 + 0.07 * k + 0.05 * b})`); bl.addColorStop(0.5, `rgba(232,120,170,${0.04 + 0.03 * k})`); bl.addColorStop(1, 'rgba(232,120,170,0)')
        ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = bl; ctx.fillRect(0, 465, W, 1040); ctx.globalCompositeOperation = 'source-over'
        // the moon: a crescent that waxes and wanes, with a gentle bob
        const mp = 0.14 + 0.05 * osc(t, 1, 0.25)
        drawMoon(ctx, MOON[0], MOON[1] + 6 * osc(t, 2), MOON[2], mp, { glow: 1.4 + 0.4 * b, earthshine: 0.7, darkAlpha: 0.5 })
        // ── the words ──
        const S = spectrum(t, 32)
        // light sweep: once per bar, a warm diagonal band crosses the line (offscreen at the bar seam)
        const sw = cyc(t, 4), sx = lerp(-420, W + 420, sstep(0.08, 0.78, sw))
        ctx.font = FONT; ctx.textBaseline = 'alphabetic'
        for (const g of glyphs) {
          const v = S[g.band]
          const breathe = 0.5 + 0.5 * osc(t, 2, -g.seq * 0.035)
          const sweep = Math.exp(-(((g.cx + (g.y - 985) * 0.35 - sx) / 150) ** 2))
          const lift = -3 * v - 2 * breathe
          // halo pass
          ctx.save()
          ctx.shadowColor = `rgba(255,236,214,${0.28 + 0.5 * v + 0.35 * sweep})`
          ctx.shadowBlur = 18 + 50 * v + 34 * sweep
          ctx.globalAlpha = 0.86 + 0.14 * Math.max(v, sweep)
          ctx.fillStyle = BONE
          ctx.fillText(g.ch, g.x, g.y + lift)
          ctx.restore()
          // sweep glint pass (additive warm gold-white)
          if (sweep > 0.02) {
            ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.55 * sweep
            ctx.fillStyle = '#ffe2b0'; ctx.fillText(g.ch, g.x, g.y + lift)
            ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1
          }
        }
        // a pixel star rides the sweep along the top of the words
        if (sx > 60 && sx < W - 60) {
          const tw = 0.5 + 0.5 * Math.sin(Math.PI * sstep(0.08, 0.78, sw))
          ctx.globalAlpha = 0.9 * tw
          pixelStar(ctx, sx + 30, 790 + 10 * Math.sin(2 * Math.PI * sw), 4, (Math.round(t * 30) >> 2) % 2 ? 0 : 1, '#ffe7b8')
          ctx.globalAlpha = 1
        }
        void h; void p; void BEAT
      },
    }
  },
}

/** faint chakra column behind the words: each dot flares as a slow wave climbs it once per bar */
function chakraColumn(ctx, t) {
  const k = kick(t)
  const top = 640, bot = 1300
  ctx.globalCompositeOperation = 'lighter'
  const ln = ctx.createLinearGradient(0, top - 60, 0, bot + 60)
  ln.addColorStop(0, 'rgba(201,166,255,0)'); ln.addColorStop(0.5, 'rgba(239,230,214,0.05)'); ln.addColorStop(1, 'rgba(255,45,58,0)')
  ctx.fillStyle = ln; ctx.fillRect(CX - 1, top - 60, 2, bot - top + 120)
  for (let i = 0; i < 7; i++) {
    const y = bot - (i / 6) * (bot - top)
    const d = ((cyc(t, 4) * 1.4 - 0.2 - i / 7) % 1 + 1) % 1
    const wave = Math.exp(-(Math.min(d, 1 - d) ** 2) / 0.008)
    const rad = 46 + 26 * wave + 8 * k
    const g = ctx.createRadialGradient(CX, y, 0, CX, y, rad * 2.4)
    g.addColorStop(0, CHAKRAS[i] + 'aa'); g.addColorStop(0.35, CHAKRAS[i] + '33'); g.addColorStop(1, CHAKRAS[i] + '00')
    ctx.globalAlpha = 0.22 + 0.33 * wave
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, y, rad * 2.4, 0, Math.PI * 2); ctx.fill()
    const inText = sstep(760, 820, y) * (1 - sstep(1080, 1140, y))
    ctx.globalAlpha = (0.3 + 0.5 * wave) * (1 - 0.85 * inText)
    ctx.fillStyle = '#fff6ea'; ctx.beginPath(); ctx.arc(CX, y, 2.5 + 2.5 * wave, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
}

/** aurora curtains in the lower third: rays hang from a swaying bright edge, all motion periodic.
 *  Drawn 1px-per-ray on a quarter-res buffer, then upscaled smooth so the rays read soft, not striped. */
const AQ = 4, AY = 1100, AW = W / AQ, AH = (H - AY) / AQ
let ABUF = null
function aurora(ctx, t) {
  if (!ABUF) { ABUF = document.createElement('canvas'); ABUF.width = AW; ABUF.height = AH }
  const a2 = ABUF.getContext('2d')
  a2.clearRect(0, 0, AW, AH)
  const p = ph(t), b = bar(t, 1.6)
  const TAU = Math.PI * 2
  a2.globalCompositeOperation = 'lighter'
  const curtains = [
    { base: 1690, amp: 80, h: 560, col: [[70, 240, 190], [110, 200, 255]], a: 0.34, f: [1.3, 2.7], n: [1, 2], o: [0.1, 0.6], fold: 0 },
    { base: 1530, amp: 60, h: 420, col: [[160, 120, 255], [255, 120, 190]], a: 0.24, f: [1.9, 0.8], n: [-1, 1], o: [0.4, 0.2], fold: 0.5 },
    { base: 1820, amp: 55, h: 600, col: [[90, 230, 170], [190, 120, 255]], a: 0.26, f: [0.9, 2.2], n: [2, -1], o: [0.75, 0.33], fold: 0.25 },
  ]
  for (const c of curtains) {
    for (let xi = 0; xi < AW; xi++) {
      const u = (xi + 0.5) / AW
      const edge = (c.base + c.amp * (0.6 * Math.sin(TAU * (c.f[0] * u + c.n[0] * p + c.o[0])) + 0.4 * Math.sin(TAU * (c.f[1] * u + c.n[1] * p + c.o[1]))) - AY) / AQ
      // fine ray striation + slow folds that travel along the curtain
      const stri = 0.5 + 0.5 * (0.6 * Math.sin(TAU * (u * 31 + c.fold + p)) + 0.4 * Math.sin(TAU * (u * 13.7 - 2 * p + c.fold)))
      const fold = 0.5 + 0.5 * Math.sin(TAU * (u * 2.1 + c.n[0] * p + c.fold))
      const hh = c.h / AQ * (0.5 + 0.3 * fold + 0.3 * stri)
      const mixv = 0.5 + 0.5 * Math.sin(TAU * (u * 1.2 + p + c.o[1]))
      const [r, g, bl] = [0, 1, 2].map(i => Math.round(lerp(c.col[0][i], c.col[1][i], mixv)))
      const a = c.a * (0.3 + 0.9 * stri * (0.4 + 0.6 * fold)) * (0.85 + 0.3 * b)
      const gr = a2.createLinearGradient(0, edge - hh, 0, edge + 12)
      gr.addColorStop(0, `rgba(${r},${g},${bl},0)`)
      const e0 = hh / (hh + 12)
      gr.addColorStop(e0 * 0.6, `rgba(${r},${g},${bl},${a * 0.4})`)
      gr.addColorStop(e0, `rgba(${Math.min(255, r + 90)},${Math.min(255, g + 30)},${Math.min(255, bl + 20)},${a})`)
      gr.addColorStop(e0 + (1 - e0) * 0.35, `rgba(${r},${g},${bl},${a * 0.35})`)
      gr.addColorStop(1, `rgba(${r},${g},${bl},0)`)
      a2.fillStyle = gr; a2.fillRect(xi, edge - hh, 1, hh + 12)
    }
  }
  a2.globalCompositeOperation = 'source-over'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'; ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(ABUF, 0, AY, W, H - AY)
  ctx.restore()
}
