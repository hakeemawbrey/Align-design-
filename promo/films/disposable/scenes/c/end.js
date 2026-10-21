// ─────────────────────────────────────────────── DISPOSABLE part c · END (53.65–60.0) (adapted from ghosted's end.js)
// Same sky as story.js (kit sky + twinkles + grain), so the handoff is a pure content dissolve: story.js's phone has
// mostly faded by 53.65 while this root fades in over it 53.65–53.9. Slower and bigger than ghosted.
//   53.85        "Be chosen." types in (10 chars × 0.05, fade 0.2 → fully typed ≈54.5), centred, 150px
//   54.85        a slow gold glint runs through "chosen"
//   54.50–55.50  the line holds alone
//   55.50–56.10  the line rises to y≈200 as the lockup forms beneath it
//   55.80–57.00  seed-of-life rings draw · chakra dots light bottom→top 55.95 + i·0.06 · wordmark "Align" 56.25 ·
//                "BLIND BY DESIGN" (40px) 56.55 → complete ≈57.0, held clean to 59.3
//   57.80 one soft chakra pulse up the column · 58.0 the moon glows a touch
//   59.30–60.00  fade to black (plate reaches 1.0 at 60.0; last frame black; low soft boom 59.35)
import { lerp, prog, ease, tw, el, mix, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, layerCanvas, pocketCanvas, MOON } from './kit.js'

const T0 = 53.65, T1 = 60.01, T_END = 60.0
const T_TYPE = 53.85, PER = 0.05, FADE = 0.2
const T_RISE = 55.5, T_RINGS = 55.8, T_DOTS = 55.95, T_WORD = 56.25, T_SUB = 56.55
const T_PULSE = 57.8, T_MOON = 58.0, T_OUT = 59.3
const T_HOLD = T_RINGS + 1.0
const LINE = 'Be chosen.'
const CH0 = 3, CH1 = 8
const T_GLINT = 54.85
const LINE_Y0 = H / 2, LINE_Y1 = 200, LINE_FS = 150
const MARK = 270, MARK_CY = 500, WORD_TOP = 650, WORD_FS = 132, SUB_TOP = 838, SUB_FS = 40

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
  const defs = CHK.map((c, i) => `<radialGradient id="ghg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="ghc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ghg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#ghc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.25)))
      sky(bx, t, 1)
      // the moon glows a touch as the lockup holds
      const mb = tw(t, [[T_MOON, 0], [T_MOON + 0.8, 1, ease.inOutQuad], [59.2, 0.55, ease.inOutQuad]])
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
        const wv = inC ? Math.exp(-Math.pow((t - (T_GLINT + (i - CH0) * 0.07)) / 0.18, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.6))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 1.0)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.04, T_RINGS + 0.5 + i * 0.04)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.08, 0], [T_PULSE + 0.2 + i * 0.08, 1, ease.inOutQuad], [T_PULSE + 0.8 + i * 0.08, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 1.6 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.6)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.3))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.3)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.05, T_RINGS + 0.25))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.8)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.6))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.5))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.4, 1, ease.inOutQuad], [T_PULSE + 1.2, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.9)) * (0.9 + 0.1 * Math.sin((t - T_HOLD) * 1.4)) + 0.2 * gP)
      glow.style.transform = `scale(${1 + 0.04 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.015, prog(t, T_RINGS, T_END))})`

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.012]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.035, 3.0, 0],                 // "Be chosen."
  ['glitter', T_GLINT - 0.05, T_GLINT + 0.6],
  ['bell', T_GLINT + 0.1, 1760, 0.014, 1.8, 0.3],
  ['whoosh', T_RISE, 0.8, 0.04],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.06, f, 0.035, 2.6, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.1],
  ['bell', T_WORD + 0.02, 146.83, 0.04, 3.6, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.08, f, 0.012, 2.0, (i - 3) * 0.1]),
  ['boom', T_OUT + 0.05, 0.16],
  ['bell', T_OUT + 0.06, 73.42, 0.04, 3.0, 0],
]
