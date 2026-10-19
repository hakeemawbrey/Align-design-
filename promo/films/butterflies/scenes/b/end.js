// ─────────────────────────────────────────────── BUTTERFLIES half b · END (24.75–30.0)
// Same sky as reveal.js (kit sky + twinkles + grain), so the handoff is a pure content dissolve: the revealed card has
// drifted up-left and faded by 24.85 while this root fades in over it 24.75–24.92. Then the end line and the lockup
// (film 3 g4 / ghosted recipe, retimed), with the motif: pixel-star butterflies fluttering up through the frame.
//   25.00–29.6   butterflies drift up from the lower edge (clear of the copy's centre band)
//   25.20        "Bring back the butterflies." types in (27 chars × 0.042, fade 0.12 → fully typed ≈26.45), centred, 124px
//   26.60        gold glint runs through "butterflies" · 26.65 eight butterflies lift off the word
//   26.45–27.75  the line holds alone
//   27.75–28.10  the line rises to y≈230 as the lockup forms beneath it
//   28.05–28.50  seed-of-life rings draw · chakra dots light bottom→top · wordmark "Align" · "BLIND BY DESIGN" → complete ≈28.5
//   28.80 one soft chakra pulse up the column · 28.95 the moon glows a touch
//   29.60–30.00  fade to black (plate reaches 1.0 at 30.0; last frame black; low boom 29.65)
import { lerp, prog, ease, tw, el, mix, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { sky, twinkles, drawGrain, grainOpacity, layerCanvas, pocketCanvas, MOON, makeFlight, drawFlight, CHAKRA_HEX as FLYC } from './kit.js'

const T0 = 24.75, T1 = 30.01, T_END = 30.0
const T_TYPE = 25.1, PER = 0.042, FADE = 0.12
const T_RISE = 27.75, T_RINGS = 28.05, T_DOTS = 28.1, T_WORD = 28.15, T_SUB = 28.23
const T_PULSE = 28.8, T_MOON = 28.95, T_OUT = 29.6
const T_HOLD = T_RINGS + 0.45
const LINE = 'Bring back the butterflies.'
const CH0 = 15, CH1 = 25
const T_GLINT = 26.6, T_LIFT = 26.65
const LINE_Y0 = H / 2, LINE_Y1 = 230, LINE_FS = 124
const MARK = 250, MARK_CY = 507, WORD_TOP = 647, WORD_FS = 118, SUB_TOP = 817, SUB_FS = 38

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

  // ── butterflies: an ambient flight up from the lower edge, and a few that lift off the word "butterflies"
  const fly = layerCanvas(root, { pointerEvents: 'none' }), fy = fly.getContext('2d')
  lineBox.before(fly)
  const AMB = makeFlight(5150, 16, (r, i) => {
    const side = i % 2 ? 1 : -1
    return { t0: 24.9 + i * 0.27 + r() * 0.15, x0: W / 2 + side * (420 + r() * 480), y0: H + 30, vx: side * (10 + r() * 30), vy: -(120 + r() * 80),
      sway: 20 + r() * 30, px: r() < 0.35 ? 6 : 5, col: FLYC[(i * 2 + 1) % 7], life: 3.6 + r() * 1.4 }
  })
  let LIFT = null
  const liftOff = () => {
    if (LIFT) return LIFT
    const xs = chars.slice(CH0, CH1 + 1).map(c => c.offsetLeft + c.offsetWidth / 2)
    const x0 = (W - lineE.offsetWidth) / 2
    LIFT = makeFlight(616, 8, (r, i) => ({ t0: T_LIFT + i * 0.05, x0: x0 + xs[Math.min(xs.length - 1, Math.round(i * (xs.length - 1) / 7))], y0: LINE_Y0 - LINE_FS * 0.35 - r() * 20,
      vx: -30 - r() * 90, vy: -(90 + r() * 60), sway: 16 + r() * 20, px: 6, col: FLYC[i % 7], life: 1.25 + r() * 0.3 }))
    return LIFT
  }

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

      fy.clearRect(0, 0, W, H)
      drawFlight(fy, AMB, t, 1 - ease.inOutQuad(prog(t, 28.0, 28.6)) * 0.6)
      drawFlight(fy, liftOff(), t)
      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.022]).filter(Boolean),
  ['bell', T_TYPE + 0.02, 587.33, 0.045, 2.6, 0],                 // "Bring back the butterflies."
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['tick', T_LIFT + 0.02 + i * 0.05, 0.012]),     // the butterflies lift off the word
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
