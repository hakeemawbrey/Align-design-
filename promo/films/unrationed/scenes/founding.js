// UNRATIONED · 2 · THE ANSWER (4.45–10.95): founding member.
//   4.55–5.05   the phone rises in (screen-founding, "Stop rationing the stars."), aura behind it
//   4.90        moon badge top-left: NEW MOON, waxing through the beat → FULL MOON at the stamp (8.22)
//   5.00–7.50   phone pushes 1 → 1.35 on the arch + headline; screen masked above the plan cards (no prices)
//   5.00–7.55   caption right: ALIGN+ · FOUNDING MEMBER / "Stop rationing / the stars."
//   7.55–8.02   the gold founding card lifts out of the phone, grows past the camera…
//   8.02–8.22   …and stamps down centre (shake, gold ring, star burst); phone slides away
//   8.30–10.9   stars pour down, unrationed · gold sheen across the card 8.75–9.35
//   8.38        "The stars, unrationed." types (≈ 8.97 fully read) · out with the card 10.55–10.85
import { clamp, lerp, prog, ease, tw, rng, el, mix, C } from '../../../src/lib.js'
import { W, H, SANS, SERIF, MONO, A, fill, img } from '../../../src/scenes/common.js'
import { drawMoonGlyph, litOf, phaseName } from '../../../src/scenes/fx-moon.js'
import { FI, pixStar, STAR_COLS, typed } from './kit.js'

const T0 = 4.45, T1 = 10.95
const T_PIN = 4.55, T_CAP = 5.0, T_COUT = 7.25, T_LIFT = 7.55, T_PEAK = 8.02, T_STAMP = 8.22, T_OUT = 10.45
const T_TYPE = 8.38, PER = 0.026, FADE = 0.16, T_SHEEN = 8.75
const LINE = 'The stars, unrationed.'
const BADGE = { in: 4.9, out: 10.3 }

const PW = 404, PH = Math.round(PW * 2532 / 1170), PX = 690, PY = H / 2
// no price figures in this ad: the screen fades out above the plan cards (phone-local y 445 → 565); push 1 → 1.35 centred on the arch + headline
const PCUT = 565, PFOC = 210, PUSH = 1.35
const CW = 620, CH = Math.round(CW * 1584 / 1264), CX = W / 2, CY = 424

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const persp = fill(root, { background: 'transparent', perspective: '2200px' })

  // phone + aura
  const aura = el('div', { position: 'absolute', left: (PX - 520) + 'px', top: (PY - 600) + 'px', width: '1040px', height: '1200px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,214,150,0.42), rgba(214,150,255,0.2) 50%, rgba(180,92,255,0) 100%)' }, persp)
  const phone = el('div', { position: 'absolute', left: (PX - PW / 2) + 'px', top: (PY - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, willChange: 'transform', transformOrigin: `50% ${PFOC}px`,
    WebkitMaskImage: `linear-gradient(180deg, #000 0px, #000 ${PCUT - 120}px, transparent ${PCUT}px)`, maskImage: `linear-gradient(180deg, #000 0px, #000 ${PCUT - 120}px, transparent ${PCUT}px)` }, persp)
  const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '54px', overflow: 'hidden', background: C.canvas,
    boxShadow: '0 60px 120px rgba(4,2,14,0.7), 0 18px 40px rgba(4,2,14,0.45), 0 0 70px rgba(242,199,92,0.16), 0 0 0 1.5px rgba(239,230,214,0.35)' }, phone)
  img(scr, A + 'screen-founding.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
  const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 7) + 'px', top: (y * PH - 7) + 'px', width: '14px', height: '14px', background: C.bone, boxShadow: '0 0 0 2px rgba(20,10,46,0.85), 0 0 10px rgba(239,230,214,0.45)', opacity: 0 }, phone))

  // caption right of the phone
  const cap = el('div', { position: 'absolute', left: '1010px', top: (H / 2 - 128) + 'px', opacity: 0, isolation: 'isolate' }, root)
  el('div', { position: 'absolute', left: '-300px', right: '-260px', top: '-150px', bottom: '-150px', zIndex: -1,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.55), rgba(11,6,32,0.4) 45%, rgba(11,6,32,0) 100%)' }, cap)
  el('div', { fontFamily: MONO, fontSize: '28px', letterSpacing: '0.3em', color: 'rgba(255,246,234,0.86)', marginBottom: '18px', textShadow: '0 0 14px rgba(8,4,24,0.85)' }, cap, 'ALIGN+ · FOUNDING MEMBER')
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px', lineHeight: 1.0, color: '#fff6ea', whiteSpace: 'nowrap', textShadow: '0 0 26px rgba(8,4,24,0.7), 0 2px 3px rgba(4,2,14,0.5)' }, cap, 'Stop rationing<br>the stars.')

  // the founding card (stamp)
  const flash = el('div', { position: 'absolute', left: (CX - 700) + 'px', top: (CY - 560) + 'px', width: '1400px', height: '1120px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(255,226,160,0.55), rgba(242,199,92,0.22) 40%, rgba(180,92,255,0.08) 70%, rgba(180,92,255,0) 100%)' }, persp)
  const cardG = el('div', { position: 'absolute', left: (CX - CW / 2) + 'px', top: (CY - CH / 2) + 'px', width: CW + 'px', height: CH + 'px', opacity: 0, willChange: 'transform' }, persp)
  img(cardG, A + 'card-founding.png', { left: 0, top: 0, width: '100%', height: '100%' })
  const sheen = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0,
    WebkitMaskImage: `url(${A}card-founding.png)`, maskImage: `url(${A}card-founding.png)`, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }, cardG)

  // caption under the card
  const L = typed(root, LINE, { fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px', lineHeight: '1', textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.6)' })
  L.box.style.top = '806px'
  const capPocket = el('div', { position: 'absolute', left: (W / 2 - 640) + 'px', top: '700px', width: '1280px', height: '320px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(11,6,32,0.6), rgba(11,6,32,0) 100%)' }, root)
  root.insertBefore(capPocket, L.box)
  const ACC = [C.gold, C.rub, C.amber, C.plum]

  return {
    start: T0, end: T1, root,
    update(t) {
      // ── phone
      const pin = ease.outCubic(prog(t, T_PIN, T_PIN + 0.5))
      const push = ease.inOutQuad(prog(t, 5.0, 7.5))
      const pout = ease.inOutQuad(prog(t, T_LIFT, T_LIFT + 0.45))
      const pop = Math.min(prog(t, T_PIN, T_PIN + 0.22), 1 - pout)
      phone.style.opacity = String(pop)
      phone.style.transform = `translate(${-130 * pout - 30 * push}px, ${lerp(70, 0, pin) + 227 - 85 * lerp(1, PUSH, push) + 6 * Math.sin((t - 5) * 1.1)}px) rotateY(${lerp(20, 9, pin) + 6 * pout}deg) rotateZ(${lerp(-3, -1.2, pin)}deg) scale(${lerp(1, 0.92, pout) * lerp(1, PUSH, push)})`
      hs.forEach((h, i) => { if (i > 1) { h.style.opacity = '0'; return } h.style.opacity = String(ease.outQuad(prog(t, T_PIN + 0.3, T_PIN + 0.5)) * (1 - prog(t, T_COUT, T_COUT + 0.3))) })
      aura.style.opacity = String(pop * (0.85 + 0.15 * Math.sin(t * 1.6)))
      aura.style.transform = `translateX(${-130 * pout}px)`
      // ── caption
      const ci = ease.outCubic(prog(t, T_CAP, T_CAP + 0.3)), co = ease.inOutQuad(prog(t, T_COUT, T_COUT + 0.3))
      cap.style.opacity = String(Math.min(prog(t, T_CAP, T_CAP + 0.14), 1 - co))
      cap.style.transform = `translateX(${lerp(36, 0, ci) + 40 * co}px)`
      // ── card: lift → peak → stamp → hold → out
      let cx = 0, cy = 0, s = 1, rz = 0, rx = 0, op = 0
      if (t >= T_LIFT) {
        const a = ease.outCubic(prog(t, T_LIFT, T_PEAK))
        const b = ease.inQuad(prog(t, T_PEAK, T_STAMP))
        // start at the phone (it's moving left) at phone scale, rise to 1.24 just above centre, slam to 1.0
        const sx = PX - 60 - CX, sy = PY - CY
        cx = lerp(sx, 0, a); cy = lerp(sy, -18, a) + lerp(0, 18, b)
        s = lerp(lerp(0.4, 1.24, a), 1, b)
        rz = lerp(lerp(-8, -2.5, a), 0, b); rx = lerp(lerp(18, 6, a), 0, b)
        op = ease.outQuad(prog(t, T_LIFT, T_LIFT + 0.14))
        // stamp shake
        if (t >= T_STAMP) {
          const k = t - T_STAMP, dmp = Math.exp(-k * 14)
          cx += Math.sin(k * 90) * 9 * dmp; cy += Math.cos(k * 77) * 7 * dmp
          s *= 1 - 0.025 * Math.exp(-k * 22) * Math.sin(k * 60 + 1.2)
          cy += 5 * Math.sin((t - T_STAMP) * 1.3) * prog(t, T_STAMP + 0.3, T_STAMP + 1.2)
        }
        const o = ease.inOutQuad(prog(t, T_OUT, T_OUT + 0.3))
        op *= 1 - o; cy -= 34 * o; s *= lerp(1, 0.95, o)
      }
      cardG.style.opacity = String(op)
      cardG.style.transform = `translate(${cx}px, ${cy}px) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`
      cardG.style.filter = t < T_STAMP ? `drop-shadow(0 ${lerp(60, 20, prog(t, T_PEAK, T_STAMP))}px 50px rgba(4,2,14,0.6))` : 'drop-shadow(0 20px 40px rgba(4,2,14,0.55))'
      const fl = tw(t, [[T_STAMP - 0.02, 0], [T_STAMP + 0.06, 1, ease.outQuad], [T_STAMP + 0.9, 0.38, ease.inOutQuad]]) * (1 - ease.inOutQuad(prog(t, T_OUT, T_OUT + 0.3)))
      flash.style.opacity = String(fl * (0.92 + 0.08 * Math.sin(t * 2)))
      flash.style.transform = `translate(${cx}px, ${cy}px) scale(${1 + 0.1 * tw(t, [[T_STAMP, 0], [T_STAMP + 0.3, 1, ease.outQuad], [T_STAMP + 1.2, 0]])})`
      // gold sheen sweeps the card once
      const sp = prog(t, T_SHEEN, T_SHEEN + 0.6)
      sheen.style.opacity = String(sp > 0 && sp < 1 ? 1 : 0)
      sheen.style.background = `linear-gradient(115deg, rgba(255,236,190,0) ${lerp(-40, 110, sp) - 14}%, rgba(255,236,190,0.55) ${lerp(-40, 110, sp)}%, rgba(255,236,190,0) ${lerp(-40, 110, sp) + 14}%)`
      // ── under-card caption
      const lo = ease.inOutQuad(prog(t, T_OUT, T_OUT + 0.25))
      L.chars.forEach((c, i) => {
        const p = prog(t, T_TYPE + i * PER, T_TYPE + i * PER + FADE)
        c.style.opacity = String(ease.outQuad(p) * (1 - lo))
        c.style.color = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
      })
      L.box.style.transform = `translateY(${-14 * lo}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.6)))})`
      capPocket.style.opacity = String(ease.outQuad(prog(t, T_TYPE - 0.1, T_TYPE + 0.3)) * (1 - lo))
    },
  }
}

// ── fx: stamp ring + burst, star rain, moon badge
const BURST = (() => {
  const r = rng(9191), out = []
  for (let i = 0; i < 110; i++) {
    const a = r() * Math.PI * 2, e = 0.85 + r() * 0.3
    const x0 = CX + Math.cos(a) * 230 * e, y0 = CY + Math.sin(a) * 300 * e
    const sp = 380 + r() * 900
    out.push({ x0, y0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.8, life: 0.7 + r() * 1.1, u: r() < 0.3 ? 4 : r() < 0.7 ? 3 : 2,
      col: r() < 0.22 ? '#f2c75c' : STAR_COLS[Math.floor(r() * 5)], arms: r() < 0.45, tw: r() * 6.28 })
  }
  return out
})()
const RAIN = (() => {
  const r = rng(5150), out = []
  for (let i = 0; i < 150; i++) out.push({ b: T_STAMP + 0.05 + r() * 2.3, x: r() * W, y0: -20 + r() * 300, v: 40 + r() * 110, dr: (r() - 0.5) * 20,
    u: r() < 0.2 ? 4 : r() < 0.6 ? 3 : 2, col: r() < 0.08 ? '#f2c75c' : STAR_COLS[Math.floor(r() * 6)], arms: r() < 0.35, tw: r() * 6.28, sp: 2 + r() * 4 })
  return out
})()
export function drawFoundingFx(ctx, t) {
  // badge (the one moon in this beat): new → full by the stamp
  if (t >= BADGE.in && t < BADGE.out + 0.3) {
    const al = ease.inOutQuad(prog(t, BADGE.in, BADGE.in + 0.35)) * (1 - ease.inOutQuad(prog(t, BADGE.out, BADGE.out + 0.3)))
    const p = 0.5 * ease.inOutQuad(prog(t, BADGE.in + 0.1, T_STAMP))
    const bloom = Math.exp(-(((t - T_STAMP - 0.05) / 0.35) ** 2))
    const GX = 92, GY = 86, GR = 18, y = GY + (1 - ease.outCubic(prog(t, BADGE.in, BADGE.in + 0.45))) * 8
    ctx.save()
    const pg = ctx.createRadialGradient(GX + 90, y, 10, GX + 90, y, 230)
    pg.addColorStop(0, `rgba(11,6,32,${0.34 * al})`); pg.addColorStop(1, 'rgba(11,6,32,0)')
    ctx.fillStyle = pg; ctx.fillRect(GX - 140, y - 230, 460, 460)
    drawMoonGlyph(ctx, GX, y, GR, p, { alpha: al * 0.85, lw: 1.6, discAlpha: 0.12, glow: 0.6 + 1.6 * bloom })
    ctx.globalAlpha = al * 0.85
    ctx.font = "400 17px 'Space Mono', monospace"
    try { ctx.letterSpacing = '3px' } catch {}
    ctx.textBaseline = 'alphabetic'; ctx.shadowColor = 'rgba(11,6,32,0.8)'; ctx.shadowBlur = 10
    ctx.fillStyle = 'rgba(239,230,214,0.9)'; ctx.fillText(phaseName(p), GX + GR + 18, y - 3)
    ctx.font = "400 14px 'Space Mono', monospace"; ctx.fillStyle = 'rgba(239,230,214,0.55)'
    ctx.fillText(`${Math.round(litOf(p) * 100)}% LIT`, GX + GR + 18, y + 18)
    try { ctx.letterSpacing = '0px' } catch {}
    ctx.restore()
  }
  if (t < T_STAMP || t > T1) return
  const k = t - T_STAMP
  const fade = 1 - ease.inOutQuad(prog(t, T_OUT, T_OUT + 0.35))
  // rings
  for (const [d, r0, r1, a0] of [[0, 260, 1000, 0.7], [0.08, 240, 760, 0.4]]) {
    const q = prog(k, d, d + 0.75)
    if (q <= 0 || q >= 1) continue
    const rr = lerp(r0, r1, ease.outCubic(q))
    ctx.save(); ctx.globalAlpha = a0 * (1 - ease.inQuad(q)); ctx.strokeStyle = '#f6d98f'; ctx.lineWidth = lerp(4, 1, q)
    ctx.shadowColor = 'rgba(242,199,92,0.8)'; ctx.shadowBlur = 16
    ctx.beginPath(); ctx.ellipse(CX, CY, rr, rr * 0.92, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore()
  }
  // burst
  for (const p of BURST) {
    if (k > p.life) continue
    const q = k / p.life, drag = (1 - Math.exp(-3.2 * k)) / 3.2
    const a = (q < 0.08 ? q / 0.08 : 1 - ease.inQuad((q - 0.08) / 0.92)) * (0.7 + 0.3 * Math.sin(k * 20 + p.tw))
    pixStar(ctx, p.x0 + p.vx * drag, p.y0 + p.vy * drag + 30 * k * k, p.u, p.col, a, p.arms)
  }
  // star rain (unrationed): slow, everywhere, keeps coming
  for (const p of RAIN) {
    const lt = t - p.b
    if (lt < 0) continue
    const y = p.y0 + lt * p.v
    if (y > H + 20) continue
    const a = ease.outQuad(clamp(lt / 0.4)) * fade * (0.45 + 0.4 * Math.sin(t * p.sp + p.tw))
    pixStar(ctx, p.x + Math.sin(lt * 0.8 + p.tw) * p.dr, y, p.u, p.col, a, p.arms)
  }
}

export const cues = [
  ['whoosh', T_PIN, 0.45, 0.1], ['tick', T_PIN + 0.3, 0.06],
  ['bell', T_CAP + 0.05, 659.25, 0.04, 2.4, 0.2],
  ['riser', T_LIFT - 0.2, T_STAMP - 0.02, 0.08], ['whoosh', T_LIFT, 0.5, 0.14],
  ['boom', T_STAMP, 0.5], ['tick', T_STAMP, 0.22], ['bell', T_STAMP + 0.01, 220, 0.06, 3.0, 0],
  ['glitter', T_STAMP, T_STAMP + 1.4],
  ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_STAMP + 0.1 + i * 0.07, f, 0.03, 2.0, (i - 1.5) * 0.2]),
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.018]).filter(Boolean),
  ['glitter', T_SHEEN, T_SHEEN + 0.5], ['bell', T_SHEEN + 0.1, 1760, 0.02, 1.4, 0.3],
]
