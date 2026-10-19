// UNRATIONED · 3 · END (10.8–15.0): end line + Align lockup (LOOK A: "PUT YOUR FAITH IN THE STARS" + moon-phase row).
//   10.75        "Become a founding member." types (24 × 0.032, fade 0.15 → fully typed ≈11.67), centred, 104px
//   12.00        gold glint runs through "founding"
//   12.20–12.55  the line rises to y≈180 as the lockup forms beneath it
//   12.30        rings draw · 12.36 chakra dots bottom→top · 12.50 wordmark · 12.68 sub-line
//   12.80–13.30  moon row: outlines in, phases light new → full (FULL ≈13.28, soft bloom) → lockup complete ≈13.3
//   13.60        one chakra pulse · hold · fade to black 14.5–15.0 (overlay plate; last frame black)
import { lerp, prog, ease, tw, el, mix, C } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { drawMoonGlyph } from '../../../src/scenes/fx-moon.js'
import { typed } from './kit.js'

const T0 = 10.6
const T_TYPE = 10.75, PER = 0.032, FADE = 0.15, T_GLINT = 12.0
const T_RISE = 12.2, T_RINGS = 12.3, T_DOTS = 12.36, T_WORD = 12.5, T_SUB = 12.68, T_ROW = 12.8, T_PULSE = 13.6
const T_HOLD = T_RINGS + 0.45
const LINE = 'Become a founding member.'
const CH0 = 9, CH1 = 16
const LINE_Y0 = H / 2, LINE_Y1 = 176, LINE_FS = 104
const MARK = 256, MARK_CY = 416, WORD_TOP = 556, WORD_FS = 112, SUB_TOP = 712, SUB_FS = 30
const MR = { n: 9, gap: 62, r: 12, h: 80, top: 772 }; MR.w = MR.n * MR.gap

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const L = typed(root, LINE, { fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' })
  L.box.style.transformOrigin = '50% 50%'
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 140}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 560) + 'px', top: (MARK_CY - 380) + 'px', width: '1120px', height: '820px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.32), rgba(154,123,224,0.11) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="urg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="urc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#urg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#urc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'PUT YOUR FAITH IN THE STARS')
  const mrow = el('canvas', { position: 'absolute', left: (W / 2 - MR.w / 2) + 'px', top: MR.top + 'px', width: MR.w + 'px', height: MR.h + 'px' }, lock)
  mrow.width = MR.w * 2; mrow.height = MR.h * 2
  const mctx = mrow.getContext('2d')

  return {
    start: T0, end: 15.01, root,
    update(t) {
      L.chars.forEach((s, i) => {
        const p = prog(t, T_TYPE + i * PER, T_TYPE + i * PER + FADE)
        const inC = i >= CH0 && i <= CH1
        const wv = inC ? Math.exp(-Math.pow((t - (T_GLINT + (i - CH0) * 0.035)) / 0.1, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.35))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      L.box.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.6))) * lerp(1, 0.9, rise)})`

      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.26 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.035, T_DOTS + i * 0.035 + 0.16))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.035, T_DOTS + i * 0.035 + 0.15)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.4)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.34))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.3))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      // moon row
      mctx.setTransform(2, 0, 0, 2, 0, 0); mctx.clearRect(0, 0, MR.w, MR.h)
      for (let i = 0; i < MR.n; i++) {
        const a = ease.outQuad(prog(t, T_ROW + i * 0.02, T_ROW + 0.22 + i * 0.02))
        if (a <= 0) continue
        const on = ease.outCubic(prog(t, T_ROW + 0.06 + i * 0.05, T_ROW + 0.2 + i * 0.05))
        const full = i === MR.n - 1
        const fT = T_ROW + 0.2 + (MR.n - 1) * 0.05
        const bloom = full ? tw(t, [[fT, 0], [fT + 0.1, 1, ease.outQuad], [fT + 0.45, 0.55, ease.inOutQuad]]) : 0
        drawMoonGlyph(mctx, MR.gap / 2 + i * MR.gap, MR.h / 2, MR.r * (1 + 0.12 * bloom), i / 16, {
          alpha: a * (0.4 + 0.5 * on + (full ? 0.1 * on : 0)), fillAlpha: on, lw: 1.3, discAlpha: 0.08, glow: full ? 0.6 * on + 1.4 * bloom : 0.35 * on })
      }
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.015, prog(t, T_RINGS, 15))})`
    },
  }
}

export const cues = [
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.02]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.045, 2.6, 0],
  ['glitter', T_GLINT - 0.05, T_GLINT + 0.35], ['bell', T_GLINT, 1760, 0.022, 1.4, 0.3],
  ['whoosh', T_RISE - 0.02, 0.5, 0.08],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.035, f, 0.06, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.2], ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99].map((f, i) => ['bell', T_ROW + 0.06 + i * 0.05, f, 0.02, 1.2, (i - 4) * 0.1]),
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),
  ['boom', 14.55, 0.3], ['bell', 14.56, 73.42, 0.05, 3.0, 0],
]
