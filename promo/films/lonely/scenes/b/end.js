// Half b · END (25.0–30.0): two warm stars rise out of the conversation as the phone leaves, settle side by side
// over the frame, and "You deserve to be known." types in beneath them; then the Align lockup (film 3 g4 recipe).
// Timing (sound):
//   24.85–25.75 two pixel stars lift off the last two bubbles and drift up to (880, 380) / (1040, 380)
//   25.75 "You deserve to be known." types in (24 chars × 0.03, fade 0.12 → fully typed ≈26.56), centred, 120px
//   26.56 "known." lands → both stars flare gold together · 26.66 gold glint through "known."
//   26.56–27.60 the line HOLDS alone · the two stars fade 27.45 → 27.75
//   27.60–27.95 the line rises to y≈230 as the lockup forms beneath it
//   27.70–28.08 seed-of-life rings draw · chakra dots light bottom→top 27.75 + i·0.03
//   27.87–28.19 wordmark "Align" · 27.97–28.25 "BLIND BY DESIGN" → complete ≈28.25, held clean
//   28.70 one soft chakra pulse up the column · 28.85 the moon glows a touch
//   fade to black 29.60 → 29.95 (the last frame, 29.967, is black)
import { clamp, lerp, prog, ease, tw, mix, el, C } from '../../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../../src/scenes/common.js'
import { drawPixelStar, buildStarSprite } from '../../../sky.js'

export const ET = { STARS0: 24.85, STARS1: 25.75, TYPE: 25.75, PER: 0.03, FADE: 0.12, HOLD_OUT: 27.45, RISE: 27.6, RINGS: 27.7, DOTS: 27.75, WORD: 27.87, SUB: 27.97, PULSE: 28.7, MOON: 28.85, OUT: 29.6, END: 29.95 }
export const LINE = 'You deserve to be known.'
const KNOWN0 = LINE.indexOf('known')
export const T_FLARE = ET.TYPE + (LINE.length - 1) * ET.PER + ET.FADE
const T_GLINT = T_FLARE + 0.1
const T_HOLD = ET.RINGS + 0.45
const LINE_Y0 = H / 2, LINE_Y1 = 230, LINE_FS = 120
const MARK = 250, MARK_CY = 507, WORD_TOP = 647, WORD_FS = 118, SUB_TOP = 821, SUB_FS = 30
const PAIR = [{ x: 884, y: 372, col: '#ffd0b0' }, { x: 1036, y: 372, col: '#c9a6ff' }]

export function buildEnd(type) {
  const spriteS = buildStarSprite(true)
  // ── closing line (per-char spans)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, type)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // ── lockup: seed-of-life rings + chakra column, wordmark, sub-line (g4)
  const lock = fill(type, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="lbg${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="lbc${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#lbg${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#lbc${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  return {
    /** the moon's soft glow during the hold (drawn onto the sky canvas) */
    moonGlow(bx, t, m) {
      const mb = tw(t, [[ET.MOON, 0], [ET.MOON + 0.3, 1, ease.outQuad], [29.6, 0.55, ease.inOutQuad]])
      if (mb <= 0.003) return
      const g = bx.createRadialGradient(m.x, m.y, m.r * 0.8, m.x, m.y, m.r * 3.2)
      g.addColorStop(0, `rgba(255,240,214,${0.16 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
      bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(m.x - m.r * 3.3, m.y - m.r * 3.3, m.r * 6.6, m.r * 6.6)
      bx.globalCompositeOperation = 'source-over'
    },
    /** two warm stars (pixel layer): from the bubbles → side by side above the line; flare together on "known." */
    stars(px, t, from) {
      if (t < ET.STARS0 || t > ET.RISE + 0.3) return
      const out = 1 - ease.inOutQuad(prog(t, ET.HOLD_OUT, ET.RISE + 0.2))
      const fl = tw(t, [[T_FLARE - 0.04, 0], [T_FLARE + 0.08, 1, ease.outQuad], [T_FLARE + 0.7, 0.25, ease.inOutQuad]])
      const fr = Math.round(t * 30)
      PAIR.forEach((q, i) => {
        const p = prog(t, ET.STARS0 + i * 0.12, ET.STARS1), e = ease.inOutCubic(p)
        const f = from[i]
        const x = lerp(f.x, q.x, e) + Math.sin(Math.PI * e) * (i ? 60 : -60), y = lerp(f.y, q.y, e) - Math.sin(Math.PI * e) * 30
        const bob = Math.sin(t * 1.6 + i * 1.3) * 4 * prog(t, ET.STARS1 - 0.2, ET.STARS1 + 0.4)
        const a = ease.outQuad(prog(t, ET.STARS0 + i * 0.12, ET.STARS0 + i * 0.12 + 0.25)) * out
        if (a <= 0.003) return
        const twk = 0.75 + 0.25 * Math.sin(t * 3.4 + i * 2)
        px.globalCompositeOperation = 'lighter'; px.globalAlpha = a * (0.45 + 0.55 * fl) * twk
        const R = 70 + 50 * fl
        px.drawImage(spriteS, x - R, y + bob - R, R * 2, R * 2)
        px.globalCompositeOperation = 'source-over'; px.globalAlpha = a
        px.imageSmoothingEnabled = false
        drawPixelStar(px, x, y + bob, fl > 0.5 ? 42 : 35, ((fr >> 2) + i) % 6 === 0 ? 1 : 0, fl > 0.3 ? '#f2c75c' : q.col, '#fff6e6')
        px.imageSmoothingEnabled = true
        px.globalAlpha = 1
      })
    },
    update(t) {
      chars.forEach((s, i) => {
        const t0 = ET.TYPE + i * ET.PER
        const p = prog(t, t0, t0 + ET.FADE)
        const inK = i >= KNOWN0 && i < KNOWN0 + 5
        const wv = inK ? Math.exp(-Math.pow((t - (T_GLINT + (i - KNOWN0) * 0.04)) / 0.11, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      lineBox.style.display = t >= ET.TYPE - 0.05 ? 'block' : 'none'
      const rise = ease.inOutCubic(prog(t, ET.RISE, ET.RISE + 0.35))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(0.985, 1, ease.outCubic(prog(t, ET.TYPE, ET.TYPE + 0.7)))})`

      lock.style.display = t >= ET.RINGS - 0.05 ? 'block' : 'none'
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, ET.RINGS + i * 0.02, ET.RINGS + 0.24 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[ET.PULSE + i * 0.05, 0], [ET.PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [ET.PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, ET.DOTS + i * 0.03, ET.DOTS + i * 0.03 + 0.15))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, ET.DOTS + i * 0.03, ET.DOTS + i * 0.03 + 0.14)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, ET.RINGS - 0.02, ET.RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, ET.RINGS, ET.RINGS + 0.38)))})`
      const wp = ease.outCubic(prog(t, ET.WORD, ET.WORD + 0.32))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, ET.SUB, ET.SUB + 0.28))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[ET.PULSE, 0], [ET.PULSE + 0.25, 1, ease.outQuad], [ET.PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, ET.RINGS, ET.RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, ET.RINGS, ET.END))})`
    },
  }
}

export const endCues = [
  ['whoosh', ET.STARS0, 0.6, 0.05],                               // the two stars lift off the conversation
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', ET.TYPE + i * ET.PER, 0.02]).filter(Boolean),   // typing
  ['bell', ET.TYPE + 0.02, 587.33, 0.04, 2.4, 0],                 // the line arrives (D5)
  ['glitter', T_FLARE - 0.02, T_GLINT + 0.4],                     // both stars flare on "known."
  ['bell', T_FLARE, 1174.66, 0.03, 1.8, -0.2],
  ['bell', T_FLARE + 0.03, 1479.98, 0.022, 1.6, 0.2],
  ['whoosh', ET.RISE - 0.02, 0.5, 0.08],                          // line rises, rings draw
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', ET.DOTS + i * 0.03, f, 0.06, 2.2, (i - 3) * 0.12]),  // chakra chimes
  ['boom', ET.WORD, 0.2],                                         // wordmark lands
  ['bell', ET.WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', ET.PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),
  ['boom', ET.OUT + 0.05, 0.3],                                   // final low boom into black
  ['bell', ET.OUT + 0.06, 73.42, 0.05, 3.0, 0],
]
