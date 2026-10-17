// L02 · Moon — the moon runs through its whole month once per loop (full → new → full), a ring of eight
// phase glyphs drifts round it, and a "now" light sweeps the ring in step with the big moon. Seamless 8s loop.
// Loop rules: big-moon phase p = ph(t) + ½ (periodic). Ring: glyphs drift back exactly one slot (−45°) per loop
// and each glyph's phase is a function of where it sits, so frame(LOOP) === frame(0).
import { W, H, el, fill, clamp, SERIF, MONO, BONE, GOLD, drawMoon, drawMoonGlyph, phaseName, litOf, pixelStar,
  LOOP, BPM, ph, osc, kick, hat, bar, spectrum, loopBackdrop, loopStars } from './loopkit.js'

const CX = W / 2, CY = 900, R = 290, RING = 440, N = 8
const TAU = Math.PI * 2
const moonP = (t) => (ph(t) + 0.5) % 1          // 0 new · 0.5 full; loop starts (and ends) on the full moon
// a calmer progression than the shared one: Dmaj9 → F#m11 → Gmaj9 → Em9 (one per bar)
const CHORDS = [
  [146.83, 220, 329.63, 369.99, 554.37],
  [92.5, 185, 277.18, 329.63, 440],
  [98, 196, 293.66, 369.99, 440],
  [82.41, 164.81, 246.94, 293.66, 369.99],
]
// two small constellations whose lines draw on and fade once per loop (offset), in the corners
const CONST = [
  { pts: [[120, 300], [210, 250], [300, 290], [350, 380], [270, 440]], off: 0.05 },              // top-left
  { pts: [[760, 1520], [850, 1470], [930, 1540], [990, 1460], [900, 1640], [800, 1700]], off: 0.55 }, // bottom-right
]

export default {
  id: 'L02-moon', title: 'Moon (loop)', duration: LOOP, loop: true,
  music: { chords: CHORDS.map((c, i) => [i * 2, i * 2 + 2, c]), bpm: BPM, padGain: 0.026, pulseGain: 0.16, hatGain: 0.022 },
  cues: [
    // full moon (t=0) gets the bright chime + glitter, new moon (t=4) a low one, quarters soft
    ['bell', 0, 739.99, 0.04, 2.4, 0],
    ['glitter', 0.02, 0.5],
    ['bell', 2, 554.37, 0.026, 1.8, 0.35],
    ['bell', 4, 293.66, 0.035, 2.2, 0],
    ['bell', 6, 440, 0.026, 1.8, -0.35],
    ['glitter', 7.55, 7.98],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = loopBackdrop(root, 'teal', { seed: 7, grain: 0.18, stars: 160 })
    const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '262px', textAlign: 'center', fontFamily: MONO, fontSize: '28px', letterSpacing: '0.42em', color: BONE, opacity: 0.8 }, root, 'TONIGHT’S MOON')
    const phase = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1420px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.36em', color: BONE, opacity: 0.6 }, root, '')
    const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '1500px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '84px', color: BONE, textShadow: '0 0 30px rgba(239,230,214,0.25)' }, root, 'Align')
    return {
      update(t) {
        bg.update(t)
        const p = moonP(t)
        const name = phaseName(p)
        if (phase.textContent !== name) phase.textContent = name
        phase.style.opacity = String(0.5 + 0.25 * litOf(p))
        word.style.opacity = String(0.8 + 0.12 * bar(t))
        eyebrow.style.opacity = String(0.72 + 0.1 * bar(t))
      },
      fx(ctx, t) {
        const p = moonP(t), k = kick(t), hh = hat(t), lit = litOf(p)
        loopStars(ctx, t, { seed: 9, sprites: 22, dots: 80, alpha: 0.85, keepOut: [[CX - RING - 40, CY - RING - 40, 2 * RING + 80, 2 * RING + 80]] })

        // constellations: lines draw on over a quarter loop, hold, fade
        for (const c of CONST) {
          const q = ((ph(t) - c.off) % 1 + 1) % 1
          const draw = clamp(q / 0.25), fade = q < 0.6 ? 1 : clamp(1 - (q - 0.6) / 0.3)
          const segs = c.pts.length - 1
          ctx.strokeStyle = BONE; ctx.lineWidth = 1.5; ctx.lineCap = 'round'
          for (let s = 0; s < segs; s++) {
            const f = clamp(draw * segs - s)
            if (f <= 0 || fade <= 0) continue
            const [x0, y0] = c.pts[s], [x1, y1] = c.pts[s + 1]
            ctx.globalAlpha = 0.32 * fade
            ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f); ctx.stroke()
          }
          c.pts.forEach(([x, y], i) => {
            const tw = 0.5 + 0.5 * osc(t, 2 + (i % 3), i * 0.23)
            ctx.globalAlpha = 0.55 + 0.45 * tw * (0.4 + 0.6 * fade)
            pixelStar(ctx, x, y, 3, tw > 0.75 ? 0 : tw > 0.35 ? 1 : 2, i % 2 ? BONE : GOLD)
          })
        }
        ctx.globalAlpha = 1

        // tides of light: one soft ring per beat rolls out from the limb (brighter when the moon is fuller)
        for (let j = 0; j < 4; j++) {
          const q = ((ph(t) * 16 - j) % 1 + 1) % 1
          const e = 1 - (1 - q) ** 2
          const rr = R + 18 + e * 520
          ctx.globalAlpha = (1 - q) ** 1.6 * clamp(q / 0.1) * (0.12 + 0.22 * lit)
          ctx.strokeStyle = '#d9cdf0'; ctx.lineWidth = 2.5 - 1.5 * q
          ctx.beginPath(); ctx.arc(CX, CY, rr, 0, TAU); ctx.stroke()
        }
        ctx.globalAlpha = 1

        // kick halo (additive), breathing with the beat and the moon's light
        ctx.save(); ctx.globalCompositeOperation = 'lighter'
        const gR = R * (1.9 + 0.25 * k)
        const g = ctx.createRadialGradient(CX, CY, R * 0.92, CX, CY, gR)
        const a0 = (0.05 + 0.16 * lit) * (0.55 + 0.6 * k)
        g.addColorStop(0, `rgba(244,234,216,${a0})`); g.addColorStop(0.4, `rgba(190,200,245,${a0 * 0.4})`); g.addColorStop(1, 'rgba(160,170,230,0)')
        ctx.fillStyle = g; ctx.fillRect(CX - gR, CY - gR, gR * 2, gR * 2)
        ctx.restore()

        // spectrum fringe: fine ticks hugging the limb (mirrored left/right, static — no rotation)
        const S = spectrum(t, 48)
        ctx.lineCap = 'round'
        for (let i = 0; i < 96; i++) {
          const m = i < 48 ? i : 95 - i
          const v = S[m]
          const a = -Math.PI / 2 + (i + 0.5) / 96 * TAU
          const r0 = R + 26, len = 4 + v * 46
          ctx.globalAlpha = 0.18 + 0.5 * v; ctx.strokeStyle = BONE; ctx.lineWidth = 2.2
          ctx.beginPath(); ctx.moveTo(CX + Math.cos(a) * r0, CY + Math.sin(a) * r0); ctx.lineTo(CX + Math.cos(a) * (r0 + len), CY + Math.sin(a) * (r0 + len)); ctx.stroke()
        }
        ctx.globalAlpha = 1

        // the moon itself
        drawMoon(ctx, CX, CY, R, p, { glow: 1 + 0.5 * k, earthshine: 0.75, darkAlpha: 0.95 })
        // faint limb light so the dark moon keeps its presence, pulsing on the kick
        ctx.globalAlpha = (1 - lit) * (0.16 + 0.22 * k); ctx.strokeStyle = '#c9bce4'; ctx.lineWidth = 2
        ctx.beginPath(); ctx.arc(CX, CY, R - 1, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1

        // phase ring: faint orbit + a "now" comet sweeping clockwise from the top once per loop
        ctx.globalAlpha = 0.22; ctx.strokeStyle = BONE; ctx.lineWidth = 1.2
        ctx.beginPath(); ctx.arc(CX, CY, RING, 0, TAU); ctx.stroke()
        const nowA = -Math.PI / 2 + TAU * p                     // angle where the ring's phase == the moon's phase
        for (let s = 0; s < 40; s++) {
          const a0 = nowA - s * 0.018, a1 = nowA - (s + 1) * 0.018
          ctx.globalAlpha = 0.75 * (1 - s / 40) ** 2; ctx.strokeStyle = GOLD; ctx.lineWidth = 3
          ctx.beginPath(); ctx.arc(CX, CY, RING, a1, a0); ctx.stroke()
        }
        ctx.globalAlpha = 1
        // glyphs: drift back one slot (−45°) per loop; a glyph's phase = its position on the ring (top = new, clockwise)
        for (let i = 0; i < N; i++) {
          const u = (((i - ph(t)) / N) % 1 + 1) % 1               // 0..1 around the ring
          const a = -Math.PI / 2 + TAU * u
          const x = CX + Math.cos(a) * RING, y = CY + Math.sin(a) * RING
          let d = Math.abs(u - p); d = Math.min(d, 1 - d)
          const near = Math.exp(-(d * d) / 0.0025)
          // a dark plate under the glyph so it reads over the orbit line
          ctx.globalAlpha = 0.6; ctx.fillStyle = '#0d0a2a'; ctx.beginPath(); ctx.arc(x, y, 31, 0, TAU); ctx.fill()
          drawMoonGlyph(ctx, x, y, 25 + 5 * near + 2 * k * near, u, {
            alpha: 0.55 + 0.45 * near, lw: 1.6, discAlpha: 0.1, fillAlpha: 0.85 + 0.15 * near, glow: 0.3 + 1.4 * near + 0.4 * hh * near,
            color: near > 0.5 ? '#fff3e0' : BONE,
          })
        }
        ctx.globalAlpha = 1
        void H
      },
    }
  },
}
