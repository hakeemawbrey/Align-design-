import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ──────────────────────────────────────────────────────── S8 · end card
// Timing (sound): rings draw 26.95–27.52 · chakra dots pop 27.40–27.97 (bottom→top, 0.07 apart) ·
// wordmark 27.85–28.45 · sub-line 28.20–28.60 · chakra pulse sweeps bottom→top 28.55–29.05 (peak ~28.62 + i*0.06) ·
// slow push 1.00→1.04 over 27.8–29.6 · fade to void 29.50–29.85 · black 29.85–29.97.
// Lockup sits 40px higher than centre-balanced so a CTA line can be added later below the sub-line (~y 860–920).
const LIFT = 40
export function sceneEnd(stage) {
  const root = fill(stage, { background: C.void })
  const stars = makeStars(root, 140, 77)
  const glow = fill(root, { background: 'radial-gradient(40% 45% at 50% 40%, rgba(154,123,224,0.28), rgba(11,6,32,0) 70%)' })
  // everything in the lockup lives in `lock` so the slow push scales it as one
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${H / 2 - LIFT}px` })
  const CH = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CH.map((c, i) => `<radialGradient id="g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - 170) + 'px', top: (H / 2 - 260 - LIFT) + 'px', width: '340px', height: '340px' }, lock,
    `<svg width="340" height="340" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 + 96 - LIFT) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '132px', color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25)' }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 + 286 - LIFT) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '40px', letterSpacing: '0.2em', textIndent: '0.2em', color: C.bone }, lock, 'YOUR FIRST DECK IS WAITING')
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
      stars.style.opacity = String(prog(t, 26.95, 27.35))
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
