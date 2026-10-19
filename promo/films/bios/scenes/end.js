// bios · END (10.1–15.0): "Your sky says more." types in centred inside corner ticks (fully typed ≈11.04, holds),
// rises to the top 11.75–12.2 as the film 1 lockup forms beneath it: seed-of-life rings 11.85 · chakra dots 12.20 ·
// wordmark "Align" 12.50–13.00 · "PUT YOUR FAITH IN THE STARS" 12.75–13.10 · moon-phase row new → full (FULL lands ≈13.35)
// → complete ≈13.35, holds; faint portrait orbit; fade to void 14.50–14.85, black plate in grain.js (last frame black).
import { clamp, lerp, prog, ease, tw, rng, el, mix, C } from '../../../src/lib.js'
import { IMG, PEOPLE, img } from '../../../src/scenes/common.js'
import { drawMoonGlyph } from '../../../src/scenes/fx-moon.js'
import { W, H, SANS, SERIF, MONO, fill, makeTicks, ROSE } from './kit.js'

const T_TYPE = 10.22, PER = 0.03, FADE = 0.2
const T_RISE = 11.75, LINE_Y1 = 150, LINE_S1 = 0.7
const T_RINGS = 11.85, T_DOTS = 12.2, T_WORD = 12.5, T_SUB = 12.75, T_ROW = 12.8, T_LIT = 12.9, LIT_STEP = 0.04
const T_PULSE = 13.5, T_FADE = 14.5
const LINE = [['Your ', 0], ['sky', 1], [' says more.', 0]]
// lockup layout (centred column under the risen line)
const MARK = 300, MARK_TOP = 236, WORD_TOP = 546, WORD_FS = 124, SUB_TOP = 728, SUB_FS = 36, ROW_TOP = 798
const MR = { n: 9, gap: 62, r: 12, h: 80 }
const OCX = W / 2, OCY = 585, ORX = 860, ORY = 370

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // portrait orbit (behind the lockup)
  const orbitSvg = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root,
    `<svg width="${W}" height="${H}" style="overflow:visible"><ellipse cx="${OCX}" cy="${OCY}" rx="${ORX}" ry="${ORY}" fill="none" stroke="#efe6d6" stroke-opacity="0.13" stroke-width="1" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/></svg>`)
  const orbitPath = orbitSvg.querySelector('ellipse')
  const OSRC = [...PEOPLE, IMG + 'juniper.jpg', IMG + 'hakeem.jpg']
  const ORB_PICK = [12, 3, 7, 0, 13, 5, 9, 2, 10, 6, 4, 8]
  const orbs = ORB_PICK.map((pi, k) => {
    const g = el('div', { position: 'absolute', left: '-22px', top: '-22px', width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', opacity: 0, boxShadow: '0 0 0 1px rgba(239,230,214,0.55), 0 0 14px rgba(154,123,224,0.55)', willChange: 'transform' }, root)
    img(g, OSRC[pi], { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pi === 13 ? '50% 30%' : '50% 40%', transform: 'scale(1.3)', transformOrigin: '50% 42%' })
    return { g, a0: -Math.PI / 2 + (k / 12) * Math.PI * 2 + 0.13, t0: 12.45 + ((k * 5) % 12) * 0.05, ph: k * 1.91 }
  })
  const glow = fill(root, { background: 'radial-gradient(38% 44% at 50% 40%, rgba(154,123,224,0.26), rgba(11,6,32,0) 70%)', opacity: 0 })

  // the end line (per-char shimmer, "sky" in rose italic Garamond)
  const lineBox = el('div', { position: 'absolute', left: '50%', top: H / 2 + 'px', whiteSpace: 'pre', fontFamily: SANS, fontWeight: 500, fontSize: '88px', color: C.bone, letterSpacing: '-0.02em',
    lineHeight: 1, textShadow: '0 2px 24px rgba(8,4,24,0.7)', transformOrigin: '50% 50%' }, root)
  const chars = []
  LINE.forEach(([txt, accent]) => {
    const wrap = accent ? el('span', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.2em', letterSpacing: '0', textShadow: '0 0 30px rgba(232,98,138,0.45)' }, lineBox) : lineBox
    ;[...txt].forEach(ch => chars.push({ s: el('span', { opacity: 0 }, wrap, ch === ' ' ? ' ' : ch), final: accent ? ROSE : C.bone }))
  })
  const ticks = makeTicks(root, C.bone, 16)

  // lockup
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_TOP + MARK / 2}px` })
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
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.2em', textIndent: '0.2em', color: C.bone, opacity: 0 }, lock, 'PUT YOUR FAITH IN THE STARS')
  const MRW = MR.n * MR.gap
  const mrow = el('canvas', { position: 'absolute', left: (W / 2 - MRW / 2) + 'px', top: ROW_TOP + 'px', width: MRW + 'px', height: MR.h + 'px' }, lock)
  mrow.width = MRW * 2; mrow.height = MR.h * 2
  const mctx = mrow.getContext('2d')
  const fadeV = fill(root, { background: C.void, opacity: 0 })

  let lw = 0
  return {
    start: 10.1, end: 15.01, root,
    update(t) {
      if (!lw) lw = lineBox.offsetWidth
      // line typing (accent shimmer → final colour)
      const accents = [ROSE, C.gold, C.violet]
      chars.forEach((c, i) => {
        const p = prog(t, T_TYPE + i * PER, T_TYPE + i * PER + FADE)
        c.s.style.opacity = String(ease.outQuad(p))
        c.s.style.color = p >= 1 ? c.final : mix(accents[i % 3], c.final, ease.inQuad(p))
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.45))
      const ly = lerp(H / 2, LINE_Y1, rise), ls = lerp(1, LINE_S1, rise)
      lineBox.style.transform = `translate(-50%, -50%) translateY(${(ly - H / 2).toFixed(1)}px) scale(${ls.toFixed(4)})`
      ticks.update(t, (q) => {
        const g = ease.spring(prog(q, T_TYPE + 0.1, T_TYPE + 0.75), 0.1)
        const conv = ease.inOutCubic(prog(q, T_RISE - 0.08, T_RISE + 0.16))
        const bw = lw * lerp(1.02, 1.14, g) + 70, bh = lerp(110, 220, g)
        return { cx: W / 2, cy: H / 2, w: lerp(bw, 0, conv), h: lerp(bh, 0, conv), op: ease.outCubic(prog(q, T_TYPE + 0.1, T_TYPE + 0.3)) * (1 - prog(q, T_RISE + 0.12, T_RISE + 0.2)) }
      })
      // lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.03, T_RINGS + 0.4 + i * 0.03)))))
      const pulse = i => tw(t, [[T_PULSE + i * 0.06, 0], [T_PULSE + 0.07 + i * 0.06, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.06, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.06 * Math.sin((t - 13) * 2.4 - i * 0.5) * prog(t, 13, 13.4)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.4))
        c.setAttribute('r', String(3.7 * 3 * p * breathe(i) * (1 + 0.45 * pulse(i)))); c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.06, T_DOTS + i * 0.06 + 0.3)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 3.7 * 1.5], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.5))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = `blur(${lerp(8, 0, wp).toFixed(2)}px)`
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      sub.style.opacity = String(ease.outQuad(prog(t, T_SUB, T_SUB + 0.35)))
      mctx.setTransform(2, 0, 0, 2, 0, 0); mctx.clearRect(0, 0, MRW, MR.h)
      for (let i = 0; i < MR.n; i++) {
        const a = ease.outQuad(prog(t, T_ROW + i * 0.03, T_ROW + 0.25 + i * 0.03))
        if (a <= 0) continue
        const on = ease.outCubic(prog(t, T_LIT + i * LIT_STEP, T_LIT + 0.15 + i * LIT_STEP))
        const full = i === MR.n - 1
        const tf = T_LIT + (MR.n - 1) * LIT_STEP + 0.12
        const bloom = full ? tw(t, [[tf, 0], [tf + 0.1, 1, ease.outQuad], [tf + 0.4, 0.55, ease.inOutQuad]]) : 0
        drawMoonGlyph(mctx, MR.gap / 2 + i * MR.gap, MR.h / 2, MR.r * (1 + 0.12 * bloom), i / 16, {
          alpha: a * (0.4 + 0.5 * on + (full ? 0.1 * on : 0)), fillAlpha: on, lw: 1.3, discAlpha: 0.08, glow: full ? 0.6 * on + 1.4 * bloom : 0.35 * on })
      }
      orbitPath.setAttribute('stroke-dashoffset', String(1 - ease.inOutCubic(prog(t, 12.4, 13.2))))
      orbs.forEach(o => {
        const ang = o.a0 + (t - 12.4) * 0.07
        const x = OCX + Math.cos(ang) * ORX, y = OCY + Math.sin(ang) * ORY
        const depth = (Math.sin(ang) + 1) / 2
        const ap = ease.outCubic(prog(t, o.t0, o.t0 + 0.5))
        const twk = 0.82 + 0.18 * Math.sin(t * 2.2 + o.ph)
        // keep-outs: the risen end line (top centre) and the moon row (bottom centre)
        const k1 = Math.hypot(Math.max(0, Math.abs(x - W / 2) - 470), Math.max(0, Math.abs(y - LINE_Y1) - 60))
        const k2 = Math.hypot(Math.max(0, Math.abs(x - W / 2) - 330), Math.max(0, Math.abs(y - (ROW_TOP + 40)) - 40))
        const keep = ease.inOutQuad(clamp(Math.min(k1, k2) / 70))
        o.g.style.opacity = String(ap * lerp(0.28, 0.5, depth) * twk * keep)
        o.g.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(lerp(0.6, 1, ap) * lerp(0.75, 1, depth)).toFixed(4)})`
      })
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.85)))})`
      lock.style.transform = `scale(${lerp(1, 1.03, ease.inOutQuad(prog(t, 12.6, 14.6)))})`
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, 11.9, 12.8)) * (0.88 + 0.12 * Math.sin((t - 12.8) * 1.9)) + 0.35 * gP)
      fadeV.style.opacity = String(ease.inOutQuad(prog(t, T_FADE, T_FADE + 0.35)))
    },
  }
}

export const cues = [
  ...LINE.map(x => x[0]).join('').split('').map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.02]).filter(Boolean),
  ['bell', T_TYPE + 0.12, 587.33, 0.04, 2.4, 0],
  ['whoosh', T_RISE - 0.02, 0.5, 0.07],
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.06, f, 0.055, 2.2, (i - 3) * 0.12]),
  ['boom', T_WORD, 0.2],
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ['glitter', T_LIT, T_LIT + 0.6],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.06, f, 0.018, 1.6, (i - 3) * 0.1]),
  ['boom', T_FADE + 0.05, 0.28],
  ['bell', T_FADE + 0.06, 73.42, 0.05, 3.0, 0],
]
