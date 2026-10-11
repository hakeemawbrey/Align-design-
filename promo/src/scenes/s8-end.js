import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ──────────────────────────────────────────────────────── S8 · end card
export function sceneEnd(stage) {
  const root = fill(stage, { background: C.void })
  const stars = makeStars(root, 140, 77)
  const glow = fill(root, { background: 'radial-gradient(40% 45% at 50% 44%, rgba(154,123,224,0.28), rgba(11,6,32,0) 70%)' })
  const CH = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CH.map((c, i) => `<radialGradient id="g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - 170) + 'px', top: (H / 2 - 260) + 'px', width: '340px', height: '340px' }, root,
    `<svg width="340" height="340" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.6" stroke-width="0.5" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 + 110) + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '112px', color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25)' }, root, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (H / 2 + 262) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '18px', letterSpacing: '0.32em', color: C.label2 }, root, 'DATING · DEALT BY THE STARS')
  const black = fill(root, { background: '#000', opacity: 0 })
  return {
    start: 26.85, end: 30.01, root,
    update(t) {
      rings.forEach((c, i) => {
        const p = ease.inOutCubic(prog(t, 27.0 + i * 0.04, 27.85 + i * 0.04))
        c.setAttribute('stroke-dashoffset', String(1 - p))
      })
      const d0 = 27.75
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, d0 + i * 0.1, d0 + i * 0.1 + 0.55))
        c.setAttribute('r', String(3.7 * 3 * p)); c.setAttribute('opacity', String(p))
      })
      cores.forEach((c, i) => {
        const p = prog(t, d0 + i * 0.1, d0 + i * 0.1 + 0.38)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 3.7 * 1.5], [1, 3.7]], ease.outQuad)))
      })
      const wp = ease.outCubic(prog(t, 28.2, 29.0))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = `blur(${lerp(8, 0, wp)}px)`
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(t, 28.6, 29.0)))
      stars.style.opacity = String(prog(t, 26.85, 27.5))
      glow.style.opacity = String(prog(t, 27.6, 28.6))
      black.style.opacity = String(ease.inQuad(prog(t, 29.45, 29.95)))
    },
  }
}
