// ─────────────────────────────────────────────── EIGHTBILLION half b · END (26.2–30.0)  (recipe: ghosted b end.js)
// Same sky as answer.js (kit sky + twinkles + grain), so the handoff is a pure content dissolve: answer.js's hand has
// drifted apart and faded by 26.25 while this root fades in over it 26.2–26.37.
//   26.38        "You are not arriving alone." types in (27 chars × 0.024, fade 0.12 → fully typed ≈27.12), centred, 120px
//   27.22        gold glint runs through "alone"
//   27.80–28.15  the line rises to y≈230 as the lockup forms beneath it
//   28.10–28.45  seed-of-life rings draw · chakra dots light bottom→top · wordmark "Align" 28.2 · "BLIND BY DESIGN" 28.28
//                → complete ≈28.55, held clean to 29.6
//   28.80 one soft chakra pulse up the column · 28.95 the moon glows a touch
//   29.60–30.00  fade to black (plate reaches 1.0 at 30.0; last frame black; low boom 29.65)
import { lerp, prog, ease, tw, el, mix, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, layerCanvas, pocketCanvas, MOON } from './kit.js'

const T0 = 26.2, T1 = 30.01, T_END = 30.0
const T_TYPE = 26.38, PER = 0.024, FADE = 0.12
const T_RISE = 27.8, T_RINGS = 28.1, T_DOTS = 28.15, T_WORD = 28.2, T_SUB = 28.28
const T_PULSE = 28.8, T_MOON = 28.95, T_OUT = 29.6
const T_HOLD = T_RINGS + 0.45
const LINE = 'You are not arriving alone.'
const CH0 = 21, CH1 = 25
const T_GLINT = 27.22
const LINE_Y0 = H / 2, LINE_Y1 = 230, LINE_FS = 120
const MARK = 250, MARK_CY = 507, WORD_TOP = 647, WORD_FS = 118, SUB_TOP = 821, SUB_FS = 30

export default async function build(stage) {
  const root = fill(stage, { background: C.void, opacity: 0 })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const pocket = pocketCanvas(W / 2, H / 2, 820, 510, 0.55)
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ── closing line (per-char spans)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // ── lockup: seed-of-life rings + chakra column, wordmark, sub-line
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="ebg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="ebc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ebg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ebc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.17)))
      sky(bx, t, 1)
      // the moon glows a touch as the lockup holds
      const mb = tw(t, [[T_MOON, 0], [T_MOON + 0.3, 1, ease.outQuad], [29.5, 0.55, ease.inOutQuad]])
      if (mb > 0.003) {
        const g = bx.createRadialGradient(MOON.x, MOON.y, MOON.r * 0.8, MOON.x, MOON.y, MOON.r * 3.2)
        g.addColorStop(0, `rgba(255,240,214,${0.16 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(MOON.x - MOON.r * 3.3, MOON.y - MOON.r * 3.3, MOON.r * 6.6, MOON.r * 6.6)
        bx.globalCompositeOperation = 'source-over'
      }
      twinkles(bx, t)
      bx.globalAlpha = ease.inOutQuad(prog(t, T0, T0 + 0.5)); bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1

      // ── the line (typed with an accent shimmer; gold glint passes through "chosen")
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        const inC = i >= CH0 && i <= CH1
        const wv = inC ? Math.exp(-Math.pow((t - (T_GLINT + (i - CH0) * 0.035)) / 0.1, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.35))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.6)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.24 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.15))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.14)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.38)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.32))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.28))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, T_END))})`

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.022]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.045, 2.6, 0],                 // "You are not arriving alone."
  ['glitter', T_GLINT - 0.05, T_GLINT + 0.35],
  ['bell', T_GLINT, 1760, 0.022, 1.4, 0.3],
  ['whoosh', T_RISE - 0.02, 0.5, 0.08],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.03, f, 0.06, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.2],
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),
  ['boom', T_OUT + 0.05, 0.3],
  ['bell', T_OUT + 0.06, 73.42, 0.05, 3.0, 0],
]
