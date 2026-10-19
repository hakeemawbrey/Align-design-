// photos · P4 END (10.2–15). "Fall for the chart." → the Align lockup (film 1: PUT YOUR FAITH IN THE STARS + moon row).
//   10.60–11.75  the end line types in at centre (Inter 500 96px, "chart." rose Garamond italic), holds
//   11.95–12.40  it glides up to y 190 (scale .80) as the lockup arrives under it
//   12.22–12.62  seed-of-life rings draw · 12.48–12.95 chakra dots pop bottom→top · 12.75–13.20 wordmark "Align"
//   12.95–13.30  PUT YOUR FAITH IN THE STARS · moon row outlines 13.00 → phases light 13.05 + i·0.04 → FULL 13.37 (bloom)
//   13.40–13.90  one chakra pulse sweeps up · portrait orbit + twinkles around (dim, keep-outs for the type)
//   14.50–14.85  fade to void · 14.85–14.95 black (last frame black)
import { clamp, lerp, prog, ease, tw, rng, el, C } from '../../../src/lib.js'
import { IMG, PEOPLE, img } from '../../../src/scenes/common.js'
import { drawMoonGlyph } from '../../../src/scenes/fx-moon.js'
import { W, H, SANS, SERIF, MONO, BONE, ROSE } from './kit.js'

const E = { type: 10.6, per: 0.05, up: [11.95, 12.4], rings: 12.22, dots: 12.48, word: [12.75, 13.2], sub: [12.95, 13.3], mrow: 13.0, mlit: 13.05, pulse: 13.4, fade: [14.5, 14.85], black: [14.85, 14.95] }
const L = { lineY: 190, mark: 300, markTop: 282, wordTop: 590, wordFS: 118, subTop: 762, subFS: 34, mrTop: 818, gap: 58, r: 12, mh: 72, OCX: 960, OCY: 560, ORX: 830, ORY: 420 }
const LINE = [['Fall for the ', {}], ['chart.', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.18em', color: ROSE }]]

export default async function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden' }, stage)
  // twinkle field + portrait orbit
  const tcv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  tcv.width = W; tcv.height = H
  const tctx = tcv.getContext('2d')
  const tr = rng(8821)
  const TW = Array.from({ length: 46 }, () => ({ x: tr() * W, y: tr() * H, u: tr() < 0.25 ? 3 : 2, ph: tr() * 6.28, sp: 1.2 + tr() * 2.4, a: 0.25 + tr() * 0.5, pix: tr() < 0.12 }))
  const orbitSvg = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root,
    `<svg width="${W}" height="${H}" style="overflow:visible"><ellipse cx="${L.OCX}" cy="${L.OCY}" rx="${L.ORX}" ry="${L.ORY}" fill="none" stroke="#efe6d6" stroke-opacity="0.12" stroke-width="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`)
  const orbitPath = orbitSvg.querySelector('ellipse')
  const OSRC = [...PEOPLE, IMG + 'juniper.jpg', IMG + 'hakeem.jpg']
  const ORB_PICK = [12, 3, 7, 0, 13, 5, 9, 2, 10, 6, 4, 8]
  const orbs = ORB_PICK.map((pi, k) => {
    const g = el('div', { position: 'absolute', left: '-24px', top: '-24px', width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', opacity: 0, boxShadow: '0 0 0 1px rgba(239,230,214,0.55), 0 0 14px rgba(154,123,224,0.55)' }, root)
    img(g, OSRC[pi], { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 38%', transform: 'scale(1.3)', transformOrigin: '50% 42%' })
    return { g, a0: -Math.PI / 2 + (k / 12) * Math.PI * 2 + 0.26, t0: 12.5 + ((k * 5) % 12) * 0.05, ph: k * 1.91 }
  })
  const glow = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(38% 42% at 50% 42%, rgba(154,123,224,0.26), rgba(11,6,32,0) 70%)', opacity: 0 }, root)
  const lock = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '50% 560px' }, root)
  // the mark (s8-end.js)
  const CH = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CH.map((c, i) => `<radialGradient id="pg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="pc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - L.mark / 2) + 'px', top: L.markTop + 'px', width: L.mark + 'px', height: L.mark + 'px' }, lock,
    `<svg width="${L.mark}" height="${L.mark}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#pg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#pc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: L.wordTop + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: L.wordFS + 'px', color: BONE, textShadow: '0 0 40px rgba(239,230,214,0.25)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: L.subTop + 'px', textAlign: 'center', fontFamily: MONO, fontSize: L.subFS + 'px', letterSpacing: '0.2em', textIndent: '0.2em', color: BONE, opacity: 0 }, lock, 'PUT YOUR FAITH IN THE STARS')
  const MR = { n: 9, gap: L.gap, r: L.r, w: 9 * L.gap, h: L.mh }
  const mrow = el('canvas', { position: 'absolute', left: (W / 2 - MR.w / 2) + 'px', top: L.mrTop + 'px', width: MR.w + 'px', height: MR.h + 'px' }, lock)
  mrow.width = MR.w * 2; mrow.height = MR.h * 2
  const mctx = mrow.getContext('2d')
  // the end line (typed, per char: colour shimmer accent → bone, like lib TypeLine)
  const lineBox = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '0px', textAlign: 'center', whiteSpace: 'pre', fontFamily: SANS, fontWeight: 500, fontSize: '96px', color: BONE, letterSpacing: '-0.015em', transformOrigin: '50% 50%' }, root)
  const chars = []
  for (const [txt, st] of LINE) {
    const span = el('span', { ...st }, lineBox)
    for (const ch of txt) chars.push({ e: el('span', { opacity: 0 }, span, ch === ' ' ? ' ' : ch), fin: st.color || BONE })
  }
  const ACC = [C.rub, C.gold, C.violet]
  const fadeV = el('div', { position: 'absolute', inset: 0, background: C.void, opacity: 0 }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', opacity: 0 }, root)
  const hexMix = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(k)))).join(',')})` }

  return {
    start: 10.2, end: 15.01, root,
    update(t) {
      // end line
      chars.forEach((c, i) => {
        const t0 = E.type + i * E.per, p = prog(t, t0, t0 + 0.28)
        c.e.style.opacity = String(ease.outQuad(p))
        c.e.style.color = p >= 1 ? c.fin : hexMix(ACC[i % 3], c.fin, ease.inQuad(p))
      })
      const up = ease.inOutCubic(prog(t, E.up[0], E.up[1]))
      const ly = lerp(H / 2, L.lineY, up)
      lineBox.style.top = (ly - 62) + 'px'
      lineBox.style.transform = `scale(${lerp(1, 0.8, up)})`
      // mark
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, E.rings + i * 0.03, E.rings + 0.38 + i * 0.03)))))
      const pulse = i => tw(t, [[E.pulse + i * 0.06, 0], [E.pulse + 0.07 + i * 0.06, 1, ease.outQuad], [E.pulse + 0.4 + i * 0.06, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.06 * Math.sin((t - 13) * 2.4 - i * 0.5) * prog(t, 13, 13.4)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, E.dots + i * 0.065, E.dots + i * 0.065 + 0.42))
        c.setAttribute('r', String(3.7 * 3 * p * breathe(i) * (1 + 0.45 * pulse(i)))); c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, E.dots + i * 0.065, E.dots + i * 0.065 + 0.3)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 3.7 * 1.5], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, E.rings - 0.02, E.rings + 0.04))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, E.rings, 13.0)))})`
      const wp = ease.outCubic(prog(t, E.word[0], E.word[1]))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(t, E.sub[0], E.sub[1])))
      // moon row: new → full
      mctx.setTransform(2, 0, 0, 2, 0, 0); mctx.clearRect(0, 0, MR.w, MR.h)
      const fullAt = E.mlit + (MR.n - 1) * 0.04 + 0.12
      for (let i = 0; i < MR.n; i++) {
        const a = ease.outQuad(prog(t, E.mrow + i * 0.02, E.mrow + 0.22 + i * 0.02))
        if (a <= 0) continue
        const on = ease.outCubic(prog(t, E.mlit + i * 0.04, E.mlit + 0.16 + i * 0.04))
        const full = i === MR.n - 1
        const bloom = full ? tw(t, [[fullAt, 0], [fullAt + 0.1, 1, ease.outQuad], [fullAt + 0.4, 0.55, ease.inOutQuad]]) : 0
        drawMoonGlyph(mctx, MR.gap / 2 + i * MR.gap, MR.h / 2, MR.r * (1 + 0.12 * bloom), i / 16, {
          alpha: a * (0.4 + 0.5 * on + (full ? 0.1 * on : 0)), fillAlpha: on, lw: 1.3, discAlpha: 0.08, glow: full ? 0.6 * on + 1.4 * bloom : 0.35 * on })
      }
      // twinkles
      tctx.clearRect(0, 0, W, H)
      const fin = ease.outQuad(prog(t, 10.6, 11.4))
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
      // portrait orbit (dim), dissolving where it passes behind the type
      orbitPath.setAttribute('stroke-dashoffset', String(1 - ease.inOutCubic(prog(t, 12.4, 13.2))))
      orbs.forEach(o => {
        const ang = o.a0 + (t - 12.5) * 0.07
        const x = L.OCX + Math.cos(ang) * L.ORX, y = L.OCY + Math.sin(ang) * L.ORY
        const depth = (Math.sin(ang) + 1) / 2
        const ap = ease.outCubic(prog(t, o.t0, o.t0 + 0.5))
        const twk = 0.82 + 0.18 * Math.sin(t * 2.2 + o.ph)
        const kd1 = Math.hypot(Math.max(0, Math.abs(x - 960) - 470), Math.max(0, Math.abs(y - L.lineY) - 70))
        const kd2 = Math.hypot(Math.max(0, Math.abs(x - 960) - 400), Math.max(0, Math.abs(y - 820) - 70))
        const keep = ease.inOutQuad(clamp(Math.min(kd1, kd2) / 70))
        o.g.style.opacity = String(ap * lerp(0.26, 0.48, depth) * twk * keep)
        o.g.style.transform = `translate(${x}px, ${y}px) scale(${lerp(0.6, 1, ap) * lerp(0.75, 1, depth)})`
      })
      lock.style.transform = `scale(${lerp(1, 1.03, ease.inOutQuad(prog(t, 13.0, 14.6)))})`
      const gP = tw(t, [[E.pulse, 0], [E.pulse + 0.25, 1, ease.outQuad], [E.pulse + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, 12.2, 13.0)) * (0.88 + 0.12 * Math.sin((t - 13) * 1.9)) + 0.35 * gP)
      fadeV.style.opacity = String(ease.inOutQuad(prog(t, E.fade[0], E.fade[1])))
      black.style.opacity = String(prog(t, E.black[0], E.black[1]))
    },
  }
}
