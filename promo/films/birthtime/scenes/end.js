// birthtime · END (10.85–15.0): the end line, then the LOOK A lockup (film 1 S8 recipe, retimed + compacted).
// Timing (sound):
//   10.95 "The sky already wrote you down." types centred (EB Garamond italic 104px, perChar 0.02) → typed ≈11.73
//   11.73–12.0 the line holds alone · 12.0–12.6 it glides (inOutCubic) up to y 196 at 0.78×
//   12.34–12.77 seed-of-life rings draw · chakra dots 12.48 + i·0.06 (→ 12.84)
//   12.68–13.08 wordmark "Align" · 12.90–13.20 "PUT YOUR FAITH IN THE STARS"
//   12.92 moon row outlines · phases light 13.0 + i·0.04 → FULL 13.32 (bloom ~13.42) → lockup complete ≈13.3
//   13.55 one chakra pulse up the column · fade to void 14.5–14.85 · black 14.85–14.95 (last frame black)
import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { drawMoonGlyph } from '../../../src/scenes/fx-moon.js'

export const END_LINE = 'The sky already wrote you down.'
export const T_LINE = 10.95, LINE_PER = 0.02
const T_RISE = 12.0, T_RINGS = 12.34, T_DOTS = 12.48, T_WORD = 12.68, T_SUB = 12.9, T_ROW = 12.94, T_PULSE = 13.55
const LINE_Y1 = 196, LINE_S1 = 0.78
const MARK = 250, MARK_TOP = 300, WORD_TOP = 560, WORD_FS = 112, SUB_TOP = 722, SUB_FS = 30, MR_TOP = 778

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const glow = fill(root, { background: 'radial-gradient(38% 46% at 50% 48%, rgba(154,123,224,0.30), rgba(11,6,32,0) 70%)', opacity: 0 })
  const lineBox = el('div', { position: 'absolute', left: 0, top: (H / 2) + 'px', width: W + 'px', height: '0', transformOrigin: '50% 0' }, root)
  const line = new TypeLine(lineBox, END_LINE, {
    left: '50%', top: '0', transform: 'translate(-50%,-55%)', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1,
    textShadow: '0 0 40px rgba(239,230,214,0.22), 0 2px 18px rgba(8,4,24,0.75)',
  }, { perChar: LINE_PER, fade: 0.16, final: C.bone, accent: ['#ffffff', '#f2c75c', '#ecdcff'] })
  const lock = fill(root, { background: 'transparent', transformOrigin: '50% 560px' })
  const CH = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CH.map((c, i) => `<radialGradient id="bg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="bc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: MARK_TOP + 'px', width: MARK + 'px', height: MARK + 'px' }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.9" stroke-width="1.1" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CH.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#bg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#bc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.2, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.3em', textIndent: '0.3em', color: C.bone, opacity: 0 }, lock, 'PUT YOUR FAITH IN THE STARS')
  const MR = { n: 9, gap: 56, r: 11, h: 70 }
  MR.w = MR.n * MR.gap
  const mrow = el('canvas', { position: 'absolute', left: (W / 2 - MR.w / 2) + 'px', top: MR_TOP + 'px', width: MR.w + 'px', height: MR.h + 'px' }, lock)
  mrow.width = MR.w * 2; mrow.height = MR.h * 2
  const mctx = mrow.getContext('2d')
  const fadeV = fill(root, { background: C.void, opacity: 0 })
  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: 10.85, end: 15.01, root,
    update(t) {
      // end line: type → hold → rise
      line.update(t - T_LINE)
      const rp = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.6))
      lineBox.style.transform = `translateY(${lerp(0, LINE_Y1 - H / 2, rp)}px) scale(${lerp(1, LINE_S1, rp)})`
      glow.style.opacity = String(ease.inOutQuad(prog(t, 11.0, 12.6)) * (0.9 + 0.1 * Math.sin(t * 1.7)) + 0.3 * tw(t, [[T_PULSE, 0], [T_PULSE + 0.2, 1, ease.outQuad], [T_PULSE + 0.7, 0]]))
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.025, T_RINGS + 0.34 + i * 0.025)))))
      const pulse = i => tw(t, [[T_PULSE + i * 0.06, 0], [T_PULSE + 0.07 + i * 0.06, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.06, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.06 * Math.sin((t - 12.9) * 2.4 - i * 0.5) * prog(t, 12.9, 13.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.4))
        c.setAttribute('r', String(3.7 * 3 * p * breathe(i) * (1 + 0.45 * pulse(i)))); c.setAttribute('opacity', String(Math.min(1, p * 0.95 + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.3)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 3.7 * 1.5], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.08))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, 13.0)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.4))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = `blur(${lerp(8, 0, wp)}px)`
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(t, T_SUB, T_SUB + 0.3)))
      mctx.setTransform(2, 0, 0, 2, 0, 0); mctx.clearRect(0, 0, MR.w, MR.h)
      for (let i = 0; i < MR.n; i++) {
        const a = ease.outQuad(prog(t, T_ROW + i * 0.02, T_ROW + 0.22 + i * 0.02))
        if (a <= 0) continue
        const on = ease.outCubic(prog(t, 13.0 + i * 0.04, 13.14 + i * 0.04))
        const full = i === MR.n - 1
        const bloom = full ? tw(t, [[13.32, 0], [13.42, 1, ease.outQuad], [13.75, 0.55, ease.inOutQuad]]) : 0
        drawMoonGlyph(mctx, MR.gap / 2 + i * MR.gap, MR.h / 2, MR.r * (1 + 0.12 * bloom), i / 16, {
          alpha: a * (0.4 + 0.5 * on + (full ? 0.1 * on : 0)), fillAlpha: on, lw: 1.3, discAlpha: 0.08, glow: full ? 0.6 * on + 1.4 * bloom : 0.35 * on })
      }
      lock.style.transform = `scale(${lerp(1, 1.03, ease.inOutQuad(prog(t, 13.0, 14.8)))})`
      fadeV.style.opacity = String(ease.inOutQuad(prog(t, 14.5, 14.85)))
      black.style.opacity = String(prog(t, 14.85, 14.95))
    },
  }
}
