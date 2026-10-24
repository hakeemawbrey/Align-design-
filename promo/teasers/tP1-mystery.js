// P1 · Mystery — film-faithful loop (S3 "the stars align", restrained). 10s @ 96 bpm, seamless.
// Juniper's mystery card floats in the grainy S1 nebula; a pearl moon behind it wanes and waxes once per loop (FULL at
// the seam); the seven chakra stars orbit the card and glide into the logo column, the crown star landing on the bar-1
// downbeat (t = 0 ≡ 10s) with a soft flare, hold for a breath, then drift apart again. Caption held steady, breathing glow.
// Beat map (loop time): 7.6–10.0 glide in (red lands 9.4 … violet 10.0) · 0.0 flare + column beam · 0.6–3.0 drift apart ·
//   moon: full 0 → new 5 → full 10 · bells each bar, glitter 9.2–9.9 into the lock, chime chord on 0.
import { W, H, el, fill, img, lerp, clamp, ease, prog, SERIF, MONO, BONE, A, CHAKRAS,
  LOOP, BEAT, ph, osc, kick, sd, near, filmNebula, filmGrain, filmPixelStars, chakraStar, chakraBeam, drawMoon, filmMusic, filmCues, CHAKRA_RGB } from './filmkit.js'

const CC = { x: 540, y: 790 }                // card centre
const M = 0.54                                // card-profile-3.png display scale (body ≈ 677×1081)
const MYS = { w: 1496, h: 2238 }
const MOON = { x: 540, y: 500, R: 470 }
const GAP = 150, COL_Y = (i) => CC.y + 3 * GAP - i * GAP
const LAND = (i) => -(6 - i) * 0.1          // seconds relative to the seam: red first, crown on the downbeat
const ORX = 440, ORY = 690

/** chakra star i: orbit (one lap per loop) blended into the column by c */
function starAt(i, t) {
  const th = (i / 7) * Math.PI * 2 + 0.35 + 2 * Math.PI * ph(t)
  const rr = 1 - 0.09 * (i % 3)
  const ox = CC.x + ORX * rr * Math.cos(th) + 14 * osc(t, 3, i * 0.13)
  const oy = CC.y + ORY * rr * Math.sin(th) + 12 * osc(t, 2, i * 0.29)
  const rise = ease.inOutCubic(prog(sd(t, LAND(i)), -2.4, 0))
  const rel = ease.inOutCubic(prog(sd(t, 0), 0.6, 3.0))
  const c = Math.min(rise, 1 - rel)
  return { x: lerp(ox, CC.x, c), y: lerp(oy, COL_Y(i), c), c }
}

export default {
  id: 'P1-mystery', title: 'Mystery (film loop)', duration: LOOP, loop: true,
  music: filmMusic(),
  cues: filmCues({
    glitter: [[9.2, 9.9]],
    extra: [['bell', 0, 587.33, 0.04, 3, 0], ['bell', 0.02, 880, 0.03, 3, -0.2], ['bell', 0.04, 1174.66, 0.02, 3, 0.2],
      ...[0, 1, 2, 3, 4, 5, 6].map(i => ['bell', (LOOP + LAND(i)) % LOOP, [293.66, 329.63, 369.99, 440, 493.88, 554.37, 587.33][i] * 2, 0.012, 1.2, (i - 3) * 0.12])],
  }),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const neb = filmNebula(root, { shift: [1.6, 0.9], exposure: 0.82, drift: [22, 16], bright: 34, keep: [[150, 220, 780, 1150]],
      pockets: [{ x: 540, y: 1500, rx: 640, ry: 260, a: 0.6 }] })
    // moon behind the card
    const mc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    mc.width = W; mc.height = H
    const mx = mc.getContext('2d')
    // the card (clipped to its opaque body, clean rim glow — as in S3)
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, root)
    const glow = el('div', { position: 'absolute', left: (120 - MYS.w / 2) + 'px', top: (114 - MYS.h / 2) + 'px', width: '1254px', height: '2002px', borderRadius: '84px' }, holder)
    const card = img(holder, A + 'card-profile-3.png', { left: -MYS.w / 2 + 'px', top: -MYS.h / 2 + 'px', width: MYS.w + 'px', height: MYS.h + 'px', clipPath: 'inset(114px 122px 122px 120px round 84px)' })
    // stars / beam layer
    const fc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    fc.width = W; fc.height = H
    const fx = fc.getContext('2d')
    // caption (held steady; breathes in glow)
    el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '820px', opacity: 0.85, background: 'linear-gradient(180deg, rgba(11,6,32,0) 0%, rgba(11,6,32,0.17) 30%, rgba(11,6,32,0.4) 50%, rgba(11,6,32,0.63) 70%, rgba(11,6,32,0.8) 100%)' }, root)
    const capBox = el('div', { position: 'absolute', left: '50%', bottom: '304px', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }, root)
    const eyebrow = el('div', { fontFamily: MONO, fontSize: '27px', letterSpacing: '0.28em', color: 'rgba(239,230,214,0.92)', textShadow: '0 1px 12px rgba(11,6,32,0.8)', marginBottom: '20px', textTransform: 'uppercase' }, capBox, '✦&nbsp;&nbsp;Blind by design&nbsp;&nbsp;✦')
    const line = el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '84px', lineHeight: 1.05, color: BONE }, capBox, 'The stars are giving<br>you a chance.')
    const grain = filmGrain(root, { opacity: 0.48 })
    return {
      update(t) {
        neb.update(t)
        const cam = neb.cam(t)
        const fl = near(t, 0, 0.45)                      // the soft flare on the downbeat
        const lock = near(t, 0, 1.4)
        // moon: full at the seam → new at mid-loop → full again (waning, then waxing)
        mx.clearRect(0, 0, W, H)
        drawMoon(mx, MOON.x + cam.dx * 1.2, MOON.y + cam.dy * 1.2, MOON.R, 0.5 + ph(t), { alpha: 0.8, glow: 1.1 + 0.8 * fl, earthshine: 0.9, darkAlpha: 0.72 })
        // card float (periodic), tiny 3D sway
        const bob = 7 * osc(t, 2, 0.1), ry = 3.2 * osc(t, 1, 0.2), rx = 1.6 * osc(t, 1, 0.45), rz = 0.5 * osc(t, 1, 0.7)
        holder.style.transform = `translate(${CC.x}px, ${CC.y + bob}px) perspective(1600px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${rz}deg) scale(${M * (1 + 0.012 * fl)})`
        card.style.filter = `brightness(${(1 + 0.05 * lock + 0.12 * fl).toFixed(3)})`
        const g = 0.25 + 0.75 * lock
        glow.style.boxShadow = `0 0 ${(lerp(36, 90, g) / M).toFixed(1)}px ${(lerp(4, 16, g) / M).toFixed(1)}px rgba(255,${Math.round(lerp(150, 220, g))},${Math.round(lerp(232, 246, g))},${(0.38 + 0.4 * g).toFixed(3)}), 0 ${(30 / M).toFixed(1)}px ${(80 / M).toFixed(1)}px rgba(5,2,18,0.55)`
        // caption glow breath (two slow breaths per loop + a lift on the lock)
        const br = 0.5 + 0.5 * osc(t, 2, 0.25)
        line.style.textShadow = `0 0 ${(24 + 22 * br + 20 * lock).toFixed(1)}px rgba(255,236,200,${(0.16 + 0.14 * br + 0.18 * lock).toFixed(3)}), 0 2px 30px rgba(11,6,32,0.85), 0 1px 3px rgba(11,6,32,0.7)`
        eyebrow.style.opacity = String(0.82 + 0.18 * br)

        // ── stars
        fx.clearRect(0, 0, W, H)
        filmPixelStars(fx, t, { seed: 37, sprites: 22, dots: 64, pal: [BONE, '#f2c75c', BONE, '#c9a6ff'], keep: [[176, 240, 728, 1100], [60, 1380, 960, 260]] })
        const S = CHAKRAS.map((_, i) => starAt(i, t))
        const cAll = Math.min(...S.map(s => s.c))
        chakraBeam(fx, CC.x, 150, 1430, cAll * (0.35 + 0.65 * fl), { width: 85, pts: cAll > 0.6 ? S : [] })
        // neighbour hairlines fade in as they gather
        fx.save(); fx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < 6; i++) {
          const a = 0.4 * clamp((Math.min(S[i].c, S[i + 1].c) - 0.45) / 0.5) * (1 - cAll * 0.6)
          if (a < 0.01) continue
          fx.strokeStyle = `rgba(255,248,236,${a.toFixed(3)})`; fx.lineWidth = 1.4
          fx.beginPath(); fx.moveTo(S[i].x, S[i].y); fx.lineTo(S[i + 1].x, S[i + 1].y); fx.stroke()
        }
        // trails
        fx.lineCap = 'round'
        S.forEach((s, i) => {
          const rgb = CHAKRA_RGB[i].join(',')
          let prev = s
          for (let j = 1; j <= 12; j++) {
            const q = starAt(i, t - j * 0.03)
            fx.strokeStyle = `rgba(${rgb},${((1 - j / 13) * 0.45).toFixed(3)})`; fx.lineWidth = lerp(6, 1, j / 12)
            fx.beginPath(); fx.moveTo(prev.x, prev.y); fx.lineTo(q.x, q.y); fx.stroke()
            prev = q
          }
        })
        fx.restore()
        S.forEach((s, i) => {
          const land = near(t, LAND(i), 0.18)
          const sz = 1.75 * (1 + 0.1 * osc(t, 8, i / 7)) * (1 + 0.06 * kick(t, 5)) * (1 + 0.35 * land + 0.45 * fl)
          chakraStar(fx, s.x, s.y, i, { s: sz, spike: (26 + 30 * land + 55 * fl) * sz })
        })
        grain.update(t)
        void H; void BEAT
      },
    }
  },
}
