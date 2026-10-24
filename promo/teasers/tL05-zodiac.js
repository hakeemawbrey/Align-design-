// L05 · Zodiac — a zodiac-wheel visualizer. The twelve sign glyphs ride a ring that glides 90° (three signs)
// into place on every bar downbeat, so the four cardinal signs (Aries, Cancer, Libra, Capricorn) take the
// 12 o'clock seat in turn and the wheel makes exactly one full turn per loop. Radial spectrum bars pulse between
// the glyphs; an inner ring of the seven chakra dots and nested orbit rings counter-rotate by whole symmetry steps.
import { W, H, el, fill, clamp, lerp, ease, rng, SERIF, MONO, BONE, GOLD, VIOLET, ROSE, HOT, CHAKRAS,
  LOOP, BPM, BEAT, ph, osc, cyc, kick, hat, bar, spectrum, LOOP_CHORDS, loopBackdrop, loopStars, pixelStar } from './loopkit.js'

const CX = 540, CY = 900
const TAU = Math.PI * 2
const SIGNS = ['ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES']
const GLYPH = Array.from({ length: 12 }, (_, i) => String.fromCodePoint(0x2648 + i) + '︎')
const RG = 372                       // glyph ring radius
const R_BAR = 300                    // spectrum bars start here

/** wheel rotation (radians): rests through each bar, glides 90° over its last beat-and-a-half, lands on the downbeat */
function wheelRot(t) {
  const tt = ph(t) * LOOP, bi = Math.floor(tt / 2), fr = tt / 2 - bi
  const e = ease.inOutCubic(clamp((fr - 0.62) / 0.38))
  return (bi + e) * TAU / 4
}
/** 0 → 1 glide progress (for crossfading the sign name) */
function glide(t) { const tt = ph(t) * LOOP, fr = tt / 2 - Math.floor(tt / 2); return clamp((fr - 0.62) / 0.38) }

function dashedRing(ctx, r, n, rot, dash, { col = BONE, a = 0.4, w = 2 } = {}) {
  ctx.save(); ctx.translate(CX, CY); ctx.rotate(rot)
  ctx.strokeStyle = col; ctx.globalAlpha = a; ctx.lineWidth = w; ctx.lineCap = 'round'
  for (let i = 0; i < n; i++) {
    const a0 = i * TAU / n
    ctx.beginPath(); ctx.arc(0, 0, r, a0, a0 + TAU / n * dash); ctx.stroke()
  }
  ctx.restore()
}
function glow(ctx, x, y, r, rgb, a) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(0.4, `rgba(${rgb},${a * 0.35})`); g.addColorStop(1, `rgba(${rgb},0)`)
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
}
const hex2rgb = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)).join(',')

export default {
  id: 'L05-zodiac', title: 'Zodiac (loop)', duration: LOOP, loop: true,
  music: { chords: LOOP_CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, pulseGain: 0.22, hatGain: 0.04, padGain: 0.024 },
  cues: [
    // the wheel's glide: a soft whoosh into each downbeat, a bell as the new sign takes the top seat
    ...[0, 1, 2, 3].map(i => ['whoosh', i * 2 + 1.3, 0.6, 0.05]),
    ...[0, 1, 2, 3].map(i => ['bell', i * 2, [587.33, 554.37, 493.88, 554.37][i], 0.03, 1.8, 0]),
    ...[0, 1, 2, 3].map(i => ['tick', i * 2 + 0.01, 0.07]),
    ['glitter', 1.25, 2.0], ['glitter', 5.25, 6.0],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'teal', { seed: 6, grain: 0.18 })
    const mk = (txt) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: '286px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.42em', color: BONE, textShadow: '0 0 18px rgba(242,199,92,0.35)' }, root, txt)
    const names = [0, 3, 6, 9].map(i => mk(SIGNS[i]))
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1488px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '84px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25)' }, root, 'Align')
    return {
      update(t) {
        bg.update(t)
        const tt = ph(t) * LOOP, bi = Math.floor(tt / 2) % 4, g = glide(t)
        names.forEach((n, j) => {
          const out = clamp(g * 2), inn = clamp(g * 2 - 1)
          const o = j === bi ? 1 - out : j === (bi + 1) % 4 ? inn : 0
          const dy = j === bi ? -out * 16 : (1 - inn) * 16
          n.style.opacity = String(o * (0.72 + 0.28 * bar(t)))
          n.style.transform = `translateY(${dy}px)`
        })
        word.style.opacity = String(0.8 + 0.2 * bar(t))
      },
      fx(ctx, t) {
        loopStars(ctx, t, { seed: 11, sprites: 28, dots: 110, keepOut: [[40, 400, 1000, 1000]] })
        const k = kick(t), h = hat(t), b = bar(t)
        const rot = wheelRot(t)
        ctx.save(); ctx.globalCompositeOperation = 'screen'
        // breathing halo behind the wheel
        glow(ctx, CX, CY, 620 + 40 * k, '120,90,220', 0.22 + 0.1 * b)
        glow(ctx, CX, CY - RG, 220 + 60 * b, '242,199,92', 0.18 + 0.4 * b)      // the top seat lights on each downbeat
        ctx.restore()

        // expanding beat rings (one per beat)
        for (let j = 0; j < 2; j++) {
          const pp = ((ph(t) * 16 - j) % 1 + 1) % 1
          ctx.globalAlpha = (1 - pp) ** 2 * 0.28; ctx.strokeStyle = BONE; ctx.lineWidth = 2
          ctx.beginPath(); ctx.arc(CX, CY, 480 + pp * 260, 0, TAU); ctx.stroke()
        }
        // outer frame: two gold circles + 72 degree ticks turning with the wheel
        ctx.globalAlpha = 0.55; ctx.strokeStyle = GOLD; ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(CX, CY, 470, 0, TAU); ctx.stroke()
        ctx.globalAlpha = 0.3; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(CX, CY, 486, 0, TAU); ctx.stroke()
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(-rot)
        for (let i = 0; i < 72; i++) {
          const a = i * TAU / 72, long = i % 6 === 0
          ctx.globalAlpha = long ? 0.7 : 0.35; ctx.lineWidth = long ? 2.5 : 1.5; ctx.strokeStyle = GOLD
          const r0 = long ? 448 : 458
          ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * 470, Math.sin(a) * 470); ctx.stroke()
        }
        // house dividers between signs (from bar ring out to the frame)
        for (let i = 0; i < 12; i++) {
          const a = -Math.PI / 2 + (i + 0.5) * TAU / 12
          ctx.globalAlpha = 0.16; ctx.lineWidth = 1.5; ctx.strokeStyle = BONE
          ctx.beginPath(); ctx.moveTo(Math.cos(a) * 282, Math.sin(a) * 282); ctx.lineTo(Math.cos(a) * 448, Math.sin(a) * 448); ctx.stroke()
        }
        ctx.restore()
        // inner frame circles
        ctx.globalAlpha = 0.4; ctx.strokeStyle = BONE; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(CX, CY, 282, 0, TAU); ctx.stroke()

        // radial spectrum bars in the gaps between glyphs (4 per gap, 48 total), turning with the wheel
        const S = spectrum(t, 24)
        ctx.save(); ctx.translate(CX, CY); ctx.lineCap = 'round'
        for (let gI = 0; gI < 12; gI++) {
          for (let j = 0; j < 4; j++) {
            const v = S[(j * 6 + (gI * 5) % 6) % 24] * (0.85 + 0.15 * Math.cos(gI * TAU / 12 - rot))
            const a = -Math.PI / 2 + gI * TAU / 12 + (9 + j * 4) * Math.PI / 180 - rot
            const len = 14 + v * 128
            const col = v > 0.55 ? HOT : v > 0.3 ? GOLD : VIOLET
            ctx.strokeStyle = col; ctx.globalAlpha = 0.35 + 0.6 * v; ctx.lineWidth = 6
            ctx.beginPath(); ctx.moveTo(Math.cos(a) * (R_BAR + 8), Math.sin(a) * (R_BAR + 8)); ctx.lineTo(Math.cos(a) * (R_BAR + 8 + len), Math.sin(a) * (R_BAR + 8 + len)); ctx.stroke()
          }
        }
        ctx.restore()

        // the twelve glyphs (upright), the one at 12 o'clock lit
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        for (let i = 0; i < 12; i++) {
          const a = -Math.PI / 2 + i * TAU / 12 - rot
          const x = CX + Math.cos(a) * RG, y = CY + Math.sin(a) * RG
          let d = ((a + Math.PI / 2) % TAU + TAU) % TAU; if (d > Math.PI) d = TAU - d
          const top = Math.exp(-(d * d) / 0.02)
          const lit = top * (0.45 + 0.55 * b + 0.15 * k)
          if (lit > 0.02) {
            ctx.save(); ctx.globalCompositeOperation = 'screen'
            glow(ctx, x, y, 90 + 40 * b, '242,199,92', 0.55 * lit); ctx.restore()
          }
          const sz = 66 * (1 + 0.16 * lit)
          ctx.font = `${sz.toFixed(1)}px FreeSerif, 'DejaVu Sans', serif`
          ctx.shadowColor = lit > 0.1 ? 'rgba(255,214,140,0.9)' : 'rgba(201,166,255,0.6)'; ctx.shadowBlur = 10 + 26 * lit
          ctx.globalAlpha = 0.62 + 0.38 * lit
          ctx.fillStyle = lit > 0.1 ? `rgb(${Math.round(lerp(239, 255, lit))},${Math.round(lerp(230, 226, lit))},${Math.round(lerp(214, 160, lit))})` : BONE
          ctx.fillText(GLYPH[i], x, y + 2)
        }
        ctx.shadowBlur = 0
        // pointer at 12 o'clock
        ctx.globalAlpha = 0.85; ctx.fillStyle = GOLD
        ctx.beginPath(); ctx.moveTo(CX, CY - 494); ctx.lineTo(CX - 11, CY - 514); ctx.lineTo(CX + 11, CY - 514); ctx.closePath(); ctx.fill()
        ctx.globalAlpha = 0.5 + 0.5 * b; pixelStar(ctx, CX, CY - 536, 4, b > 0.6 ? 0 : 1, GOLD)

        // nested orbit rings, counter-rotating by whole symmetry steps
        dashedRing(ctx, 250, 36, 2 * (TAU / 36) * ph(t) * 3, 0.5, { a: 0.35, w: 2 })       // 36-fold: 3 dash steps per loop
        dashedRing(ctx, 132, 24, -(TAU / 24) * 2 * ph(t), 0.55, { col: GOLD, a: 0.45, w: 2 }) // 24-fold: −2 steps per loop
        // orbiting moons on those rings
        const om = [[250, 1, ROSE, 7], [250, 1, VIOLET, 5], [132, -2, GOLD, 6]]
        om.forEach(([r, n, col, s], j) => {
          const a = -Math.PI / 2 + TAU * (n * ph(t) + j * 0.5)
          const x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r
          ctx.save(); ctx.globalCompositeOperation = 'screen'; glow(ctx, x, y, s * 5, hex2rgb(col), 0.6); ctx.restore()
          ctx.globalAlpha = 1; ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(x, y, s * 0.6, 0, TAU); ctx.fill()
        })

        // inner ring: the seven chakra dots, one full counter-turn per loop; each flares on the kick in turn
        for (let i = 0; i < 7; i++) {
          const a = -Math.PI / 2 + i * TAU / 7 - TAU * ph(t)
          const x = CX + Math.cos(a) * 190, y = CY + Math.sin(a) * 190
          const beatIx = Math.floor(ph(t) * 16 + 1e-6) % 7
          const f = (beatIx === i ? k : 0)
          ctx.save(); ctx.globalCompositeOperation = 'screen'
          glow(ctx, x, y, 34 + 30 * f, hex2rgb(CHAKRAS[i]), 0.85); ctx.restore()
          ctx.globalAlpha = 0.95; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, 5 + 4 * f, 0, TAU); ctx.fill()
        }
        // faint chord lines joining the chakra dots (a 7-point star, turning with them)
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(-TAU * ph(t))
        ctx.strokeStyle = '#d9cdf0'; ctx.globalAlpha = 0.18 + 0.12 * k; ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let i = 0; i <= 7; i++) { const a = -Math.PI / 2 + ((i * 3) % 7) * TAU / 7; const x = Math.cos(a) * 190, y = Math.sin(a) * 190; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y) }
        ctx.stroke(); ctx.restore()

        // centre: a 12-ray sun turning one ray-step (30°) per loop, pulsing on the kick
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(TAU / 12 * ph(t))
        ctx.globalCompositeOperation = 'screen'; glow(ctx, 0, 0, 110 + 30 * k, '255,226,170', 0.5 + 0.3 * k)
        ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = GOLD; ctx.lineCap = 'round'
        for (let i = 0; i < 12; i++) {
          const a = i * TAU / 12, L = (i % 2 ? 46 : 70) * (1 + 0.12 * k)
          ctx.globalAlpha = 0.85; ctx.lineWidth = i % 2 ? 2 : 3
          ctx.beginPath(); ctx.moveTo(Math.cos(a) * 30, Math.sin(a) * 30); ctx.lineTo(Math.cos(a) * L, Math.sin(a) * L); ctx.stroke()
        }
        ctx.globalAlpha = 1; ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(0, 0, 16 + 5 * k, 0, TAU); ctx.fill()
        ctx.globalAlpha = 0.7; ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(0, 0, 26, 0, TAU); ctx.stroke()
        ctx.restore()
        ctx.globalAlpha = 1
        void h; void rng; void cyc; void osc; void BEAT; void H
      },
    }
  },
}
