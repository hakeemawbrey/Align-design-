import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, VERT, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"
import { drawMoonGlyph } from './fx-moon.js'

// ──────────────────────────────────────────────────────── S8 · end card
// Timing (sound): rings draw 26.95–27.52 · chakra dots pop 27.40–27.97 (bottom→top, 0.07 apart) ·
// wordmark 27.85–28.45 · sub-line 28.20–28.60 · chakra pulse sweeps bottom→top 28.55–29.05 (peak ~28.62 + i*0.06) ·
// slow push 1.00→1.04 over 27.8–29.6 · fade to void 29.50–29.85 · black 29.85–29.97.
// Portrait orbit: 12 tiny aura portraits (36–48px, ≤0.5 opacity) on a wide tilted ring far behind the mark;
//   orbit hairline draws 27.55–28.35 · portraits fade/scale in one by one 27.62 + k*0.06 (→ ~28.3), soft, no hard pop ·
//   slow drift 0.07 rad/s · twinkle field (50 dot stars, a few pixel crosses) fades in 27.0–27.6 · all fade with the end 29.50–29.85.
// Moon row (new → full, 9 phases) under the sub-line, in the lockup's push: outlines fade in 28.25 + i*0.03 ·
//   each phase lights 28.45 + i*0.075 (bottom of the arc: new … full) → FULL lands 29.05 with a soft bloom (peak ~29.15).
// Lockup sits 40px higher than centre-balanced so a CTA line can be added later below the sub-line (~y 860–920).
const LIFT = 40
// vertical (9:16): bigger lockup stacked in the visual centre (block y ≈ 380–1470, centred ~y 925):
//   mark 520px (centre 540,640) · wordmark 190px · sub-line on two lines · moon row (84px pitch) below at y ≈ 1420
//   (fx-stars.js mirrors the mark centre/scale for the chakra sparkles)
const L = VERT ? {
  mark: 520, markTop: 380, wordTop: 905, wordFS: 190, subTop: 1196, subFS: 50, subLH: 1.5, mrTop: 1372, gap: 84, r: 17, mh: 100,
  origin: 925, glow: 'radial-gradient(70% 34% at 50% 36%, rgba(154,123,224,0.30), rgba(11,6,32,0) 70%)',
  OCY: 900, ORX: 455, ORY: 760, keepY: 1422, keepHW: 400, keepHH: 50,
} : {
  mark: 340, markTop: H / 2 - 260 - LIFT, wordTop: H / 2 + 96 - LIFT, wordFS: 132, subTop: H / 2 + 286 - LIFT, subFS: 40, subLH: null, mrTop: H / 2 + 360 - LIFT, gap: 64, r: 13, mh: 80,
  origin: H / 2 - LIFT, glow: 'radial-gradient(40% 45% at 50% 40%, rgba(154,123,224,0.28), rgba(11,6,32,0) 70%)',
  OCY: 500, ORX: 820, ORY: 450, keepY: H / 2 + 400 - LIFT, keepHW: 320, keepHH: 30,
}
export function sceneEnd(stage) {
  const root = fill(stage, { background: C.void })
  const stars = makeStars(root, 140, 77)
  // twinkle field + portrait orbit (behind the glow/lockup)
  const tcv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  tcv.width = W; tcv.height = H
  const tctx = tcv.getContext('2d')
  const tr = rng(8821)
  const TW = Array.from({ length: 50 }, () => ({ x: tr() * W, y: tr() * H, u: tr() < 0.25 ? 3 : 2, ph: tr() * 6.28, sp: 1.2 + tr() * 2.4, a: 0.25 + tr() * 0.5, pix: tr() < 0.12 }))
  const OCX = W / 2, OCY = L.OCY, ORX = L.ORX, ORY = L.ORY
  const orbitSvg = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root,
    `<svg width="${W}" height="${H}" style="overflow:visible"><ellipse cx="${OCX}" cy="${OCY}" rx="${ORX}" ry="${ORY}" fill="none" stroke="#efe6d6" stroke-opacity="0.13" stroke-width="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`)
  const orbitPath = orbitSvg.querySelector('ellipse')
  const OSRC = [...PEOPLE, IMG + 'juniper.jpg', IMG + 'hakeem.jpg']
  const ORB_N = 12, ORB_PICK = [12, 3, 7, 0, 13, 5, 9, 2, 10, 6, 4, 8]
  const orbs = ORB_PICK.map((pi, k) => {
    const g = el('div', { position: 'absolute', left: '-24px', top: '-24px', width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', opacity: 0, boxShadow: '0 0 0 1px rgba(239,230,214,0.55), 0 0 14px rgba(154,123,224,0.55)', willChange: 'transform' }, root)
    img(g, OSRC[pi], { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pi === 13 ? '50% 30%' : '50% 40%', transform: 'scale(1.3)', transformOrigin: '50% 42%' })
    return { g, a0: -Math.PI / 2 + (k / ORB_N) * Math.PI * 2 + 0.13, t0: 27.62 + ((k * 5) % ORB_N) * 0.06, ph: k * 1.91 }
  })
  const glow = fill(root, { background: L.glow })
  // everything in the lockup lives in `lock` so the slow push scales it as one
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${L.origin}px` })
  const CH = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CH.map((c, i) => `<radialGradient id="g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - L.mark / 2) + 'px', top: L.markTop + 'px', width: L.mark + 'px', height: L.mark + 'px' }, lock,
    `<svg width="${L.mark}" height="${L.mark}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: L.wordTop + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: L.wordFS + 'px', color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25)' }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: L.subTop + 'px', textAlign: 'center', fontFamily: MONO, fontSize: L.subFS + 'px', letterSpacing: '0.2em', textIndent: '0.2em', color: C.bone, ...(VERT ? { lineHeight: L.subLH, whiteSpace: 'pre', textIndent: '0', paddingLeft: '0.2em', boxSizing: 'border-box' } : {}) }, lock, VERT ? 'PUT YOUR FAITH\nIN THE STARS' : 'PUT YOUR FAITH IN THE STARS')
  // moon row: blind (new) → aligned (full)
  const MR = { n: 9, gap: L.gap, r: L.r, w: 9 * L.gap, h: L.mh }
  const mrow = el('canvas', { position: 'absolute', left: (W / 2 - MR.w / 2) + 'px', top: L.mrTop + 'px', width: MR.w + 'px', height: MR.h + 'px' }, lock)
  mrow.width = MR.w * 2; mrow.height = MR.h * 2
  const mctx = mrow.getContext('2d')
  const fadeV = fill(root, { background: C.void, opacity: 0 })
  const black = fill(root, { background: '#000', opacity: 0 })
  return {
    start: 26.95, end: 30.01, root,
    update(t) {
      rings.forEach((c, i) => {
        const p = ease.outCubic(prog(t, 26.95 + i * 0.03, 27.34 + i * 0.03))
        c.setAttribute('stroke-dashoffset', String(1 - p))
      })
      const d0 = 27.4
      // one pulse sweeps up the chakra column (~28.55–29.05) and a slow breathe keeps halos alive after
      const pulse = i => tw(t, [[28.55 + i * 0.06, 0], [28.62 + i * 0.06, 1, ease.outQuad], [28.95 + i * 0.06, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.06 * Math.sin((t - 27.9) * 2.4 - i * 0.5) * prog(t, 27.9, 28.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, d0 + i * 0.07, d0 + i * 0.07 + 0.45))
        c.setAttribute('r', String(3.7 * 3 * p * breathe(i) * (1 + 0.45 * pulse(i)))); c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, d0 + i * 0.07, d0 + i * 0.07 + 0.32)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 3.7 * 1.5], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      const wp = ease.outCubic(prog(t, 27.85, 28.45))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = `blur(${lerp(8, 0, wp)}px)`
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(t, 28.2, 28.6)))
      mctx.setTransform(2, 0, 0, 2, 0, 0); mctx.clearRect(0, 0, MR.w, MR.h)
      for (let i = 0; i < MR.n; i++) {
        const a = ease.outQuad(prog(t, 28.25 + i * 0.03, 28.5 + i * 0.03))
        if (a <= 0) continue
        const on = ease.outCubic(prog(t, 28.45 + i * 0.075, 28.62 + i * 0.075))
        const full = i === MR.n - 1
        const bloom = full ? tw(t, [[29.05, 0], [29.15, 1, ease.outQuad], [29.45, 0.55, ease.inOutQuad]]) : 0
        drawMoonGlyph(mctx, MR.gap / 2 + i * MR.gap, MR.h / 2, MR.r * (1 + 0.12 * bloom), i / 16, {
          alpha: a * (0.4 + 0.5 * on + (full ? 0.1 * on : 0)), fillAlpha: on, lw: VERT ? 1.6 : 1.3, discAlpha: 0.08, glow: full ? 0.6 * on + 1.4 * bloom : 0.35 * on })
      }
      stars.style.opacity = String(prog(t, 26.95, 27.35))
      // twinkle field
      tctx.clearRect(0, 0, W, H)
      const fin = ease.outQuad(prog(t, 27.0, 27.6))
      TW.forEach(s => {
        const a = s.a * fin * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.01) return
        tctx.fillStyle = `rgba(239,230,214,${a})`
        tctx.fillRect(s.x - s.u / 2, s.y - s.u / 2, s.u, s.u)
        if (s.pix) {
          tctx.fillStyle = `rgba(239,230,214,${a * 0.6})`
          tctx.fillRect(s.x - s.u / 2, s.y - s.u * 1.5, s.u, s.u); tctx.fillRect(s.x - s.u / 2, s.y + s.u / 2, s.u, s.u)
          tctx.fillRect(s.x - s.u * 1.5, s.y - s.u / 2, s.u, s.u); tctx.fillRect(s.x + s.u / 2, s.y - s.u / 2, s.u, s.u)
        }
      })
      // portrait orbit: tilted ring, front (bottom) larger/brighter, back (top) smaller/dimmer
      orbitPath.setAttribute('stroke-dashoffset', String(1 - ease.inOutCubic(prog(t, 27.55, 28.35))))
      orbs.forEach(o => {
        const ang = o.a0 + (t - 27.6) * 0.07
        const x = OCX + Math.cos(ang) * ORX, y = OCY + Math.sin(ang) * ORY
        const depth = (Math.sin(ang) + 1) / 2 // 0 back (top) → 1 front (bottom)
        const ap = ease.outCubic(prog(t, o.t0, o.t0 + 0.5))
        const twk = 0.82 + 0.18 * Math.sin(t * 2.2 + o.ph)
        // keep-out: portraits dissolve where the orbit passes behind the moon row (x 640–1280, y 870–930)
        const kd = Math.hypot(Math.max(0, Math.abs(x - W / 2) - L.keepHW), Math.max(0, Math.abs(y - L.keepY) - L.keepHH))
        const keep = lerp(1, ease.inOutQuad(clamp(kd / 70)), prog(t, 28.1, 28.4))
        o.g.style.opacity = String(ap * lerp(0.28, 0.5, depth) * twk * keep)
        o.g.style.transform = `translate(${x}px, ${y}px) scale(${lerp(0.6, 1, ap) * lerp(0.75, 1, depth)})`
      })
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, 26.95, 27.8)))})`
      lock.style.transform = `scale(${lerp(1, 1.04, ease.inOutQuad(prog(t, 27.8, 29.6)))})`
      const gPulse = tw(t, [[28.55, 0], [28.8, 1, ease.outQuad], [29.3, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, 27.0, 27.9)) * (0.88 + 0.12 * Math.sin((t - 27.9) * 1.9)) + 0.35 * gPulse)
      glow.style.transform = `scale(${1 + 0.05 * gPulse + 0.02 * Math.sin((t - 27.9) * 1.3)})`
      stars.style.transform = `scale(${lerp(1, 1.02, prog(t, 26.95, 30))})`
      fadeV.style.opacity = String(ease.inOutQuad(prog(t, 29.5, 29.85)))
      black.style.opacity = String(prog(t, 29.85, 29.97))
    },
  }
}
