// bios · ANSWER (3.55–10.15)
//   3.62  "Your sky doesn't." (rose; readable ~3.95 → 5.12)
//   5.20  phone in (screen-onboarding-big-three) · "ASTROLOGY, MINUS THE HOMEWORK" / "One sky. Three yous." · Sun / Moon / Rising rows
//   7.62  screen → screen-onboarding-manual · "KNOW YOURSELF FIRST" / "Taurus, the user manual." · STRENGTHS quote (8.20 → 9.82)
//   9.82  everything leaves (phone drifts right) before the end line
import { clamp, lerp, prog, ease, el, C } from '../../../src/lib.js'
import { W, H, A, SANS, SERIF, MONO, fill, img, phone, ROSE } from './kit.js'

const S1 = { words: [3.62, 3.72, 3.84], out: 5.12 }
const PH_IN = 5.2, SWAP = 7.62, OUT = 9.82
const PCX = 1410, PCY = 548
const BX = 236   // left text column
const ROWS_AT = [5.78, 5.98, 6.18]
const Q_IN = 8.2

function charLine(parent, text, style, color = C.bone) {
  const e = el('div', { position: 'absolute', whiteSpace: 'pre', ...style }, parent)
  const spans = [...text].map(ch => ch === '\n' ? (el('br', {}, e), null) : el('span', { opacity: 0, color }, e, ch === ' ' ? ' ' : ch)).filter(Boolean)
  return { e, spans, update(lt, per = 0.024, fade = 0.26) { spans.forEach((s, i) => { s.style.opacity = String(ease.outQuad(prog(lt, i * per, i * per + fade))) }) } }
}

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })

  // ── beat 1: "Your sky doesn't."
  const row = el('div', { position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', alignItems: 'baseline', gap: '0.26em',
    fontFamily: SANS, fontWeight: 500, fontSize: '88px', color: C.bone, whiteSpace: 'nowrap', letterSpacing: '-0.02em', textShadow: '0 2px 26px rgba(8,4,24,0.6)' }, root)
  const w1 = el('span', { display: 'inline-block' }, row, 'Your')
  const w2 = el('span', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: '1.2em', color: ROSE, letterSpacing: '0', textShadow: '0 0 30px rgba(232,98,138,0.45)' }, row, 'sky')
  const w3 = el('span', { display: 'inline-block' }, row, 'doesn’t.')
  const W1 = [w1, w2, w3]
  const arrL = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '56px', color: 'rgba(239,230,214,0.34)' }, root, '⟵')
  const arrR = el('div', { position: 'absolute', top: '50%', fontFamily: SANS, fontWeight: 200, fontSize: '56px', color: 'rgba(239,230,214,0.34)' }, root, '⟶')

  // ── phone (big three → manual)
  const persp = el('div', { position: 'absolute', inset: 0, perspective: '1900px' }, root)
  const halo = el('div', { position: 'absolute', left: (PCX - 520) + 'px', top: (PCY - 620) + 'px', width: '1040px', height: '1240px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(214,190,255,0.32), rgba(180,120,255,0.12) 55%, rgba(180,92,255,0) 100%)' }, persp)
  const P = phone(persp, A + 'screen-onboarding-big-three.png', 870)
  const man = img(P.scr, A + 'screen-onboarding-manual.png', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 })
  P.g.style.left = (PCX - P.pw / 2) + 'px'; P.g.style.top = (PCY - P.ph / 2) + 'px'

  // ── text column A: the big three
  const colA = el('div', { position: 'absolute', inset: 0, opacity: 0 }, root)
  const rail = el('div', { position: 'absolute', left: (BX - 40) + 'px', top: '520px', width: '3px', height: '0px', background: 'rgba(239,230,214,0.22)' }, root)
  const eyeA = el('div', { position: 'absolute', left: BX + 'px', top: '290px', fontFamily: MONO, fontSize: '32px', letterSpacing: '0.3em', color: 'rgba(239,230,214,0.85)', whiteSpace: 'nowrap', opacity: 0 }, colA, 'ASTROLOGY, MINUS THE HOMEWORK')
  const titleA = charLine(colA, 'One sky. Three yous.', { left: BX + 'px', top: '344px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.0, letterSpacing: '-0.01em', textShadow: '0 2px 30px rgba(8,5,34,0.55)' })
  const ITEMS = [
    { label: 'Sun', sub: 'Taurus', c: '#f2c75c', g: 'radial-gradient(circle at 36% 32%, #fff6d0 0%, #f2d06a 30%, #b88a22 72%, #5a3f0c 100%)', glow: '242,199,92' },
    { label: 'Moon', sub: 'Sagittarius', c: '#8fb0ff', g: 'radial-gradient(circle at 36% 32%, #e2ecff 0%, #6f9cff 30%, #2f56d8 72%, #10215e 100%)', glow: '74,114,255' },
    { label: 'Rising', sub: 'Libra', c: '#cfa8ff', g: 'radial-gradient(circle at 36% 32%, #fbeaff 0%, #c58bff 30%, #8a3fe0 72%, #3a1468 100%)', glow: '180,92,255' },
  ]
  const rows = ITEMS.map((it, i) => {
    const r = el('div', { position: 'absolute', left: BX + 'px', top: (520 + i * 96) + 'px', display: 'flex', alignItems: 'center', gap: '26px', whiteSpace: 'nowrap', fontFamily: SANS, opacity: 0 }, colA)
    el('div', { width: '54px', height: '54px', borderRadius: '50%', background: it.g, boxShadow: `0 0 26px 4px rgba(${it.glow},0.5)` }, r)
    el('div', { fontSize: '58px', fontWeight: 500, color: it.c, letterSpacing: '-0.01em' }, r, it.label)
    el('div', { fontSize: '50px', color: 'rgba(239,230,214,0.74)', letterSpacing: '-0.01em' }, r, '— ' + it.sub)
    return r
  })

  // ── text column B: the user manual
  const colB = el('div', { position: 'absolute', inset: 0, opacity: 0 }, root)
  const eyeB = el('div', { position: 'absolute', left: BX + 'px', top: '244px', fontFamily: MONO, fontSize: '32px', letterSpacing: '0.3em', color: 'rgba(239,230,214,0.85)', whiteSpace: 'nowrap', opacity: 0 }, colB, 'KNOW YOURSELF FIRST')
  const titleB = charLine(colB, 'Taurus, the\nuser manual.', { left: BX + 'px', top: '298px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.0, letterSpacing: '-0.01em', textShadow: '0 2px 30px rgba(8,5,34,0.55)' })
  const quote = el('div', { position: 'absolute', left: BX + 'px', top: '560px', opacity: 0 }, colB)
  el('div', { fontFamily: MONO, fontSize: '30px', letterSpacing: '0.32em', color: 'rgba(239,230,214,0.85)', marginBottom: '14px' }, quote, 'STRENGTHS')
  el('div', { fontFamily: SANS, fontWeight: 400, fontSize: '48px', lineHeight: 1.3, color: C.bone, whiteSpace: 'pre', letterSpacing: '-0.01em', textShadow: '0 2px 20px rgba(8,4,24,0.6)' }, quote, 'Steady to the bone.\nBuilds a home anywhere.\nStill knows how you take your coffee.')

  let rw = 0
  return {
    start: 3.55, end: 10.2, root,
    update(t) {
      if (!rw) rw = row.offsetWidth
      // beat 1
      const o1 = ease.inOutQuad(prog(t, S1.out, S1.out + 0.18))
      W1.forEach((w, i) => {
        const p = ease.outCubic(prog(t, S1.words[i], S1.words[i] + 0.34))
        w.style.opacity = String(Math.min(prog(t, S1.words[i], S1.words[i] + 0.2), 1 - o1))
        w.style.filter = `blur(${(lerp(10, 0, p) + 6 * o1).toFixed(2)}px)`
        w.style.transform = `translateY(${lerp(16, 0, p) - 10 * o1}px)`
      })
      const ap = ease.outCubic(prog(t, 3.8, 4.5))
      arrL.style.left = (W / 2 - rw / 2 - lerp(280, 140, ap) - 56) + 'px'
      arrR.style.left = (W / 2 + rw / 2 + lerp(280, 140, ap) - 4) + 'px'
      arrL.style.transform = arrR.style.transform = 'translateY(-55%)'
      arrL.style.opacity = arrR.style.opacity = String(ap * (1 - o1))

      // phone
      const pin = ease.outCubic(prog(t, PH_IN, PH_IN + 0.5))
      const pout = ease.inOutCubic(prog(t, OUT, OUT + 0.3))
      const bob = Math.sin((t - PH_IN) * 1.3) * 6
      const swapK = ease.inOutCubic(prog(t, SWAP, SWAP + 0.3))
      const bump = Math.sin(Math.PI * swapK) * 0.012
      const ry = lerp(-14, -6, pin) + 3 * prog(t, PH_IN, OUT) + 6 * pout
      P.g.style.opacity = String(Math.min(prog(t, PH_IN, PH_IN + 0.18), 1 - pout))
      P.g.style.transform = `translate(${lerp(110, 0, pin) + 70 * pout}px, ${bob}px) rotateY(${ry.toFixed(2)}deg) scale(${(lerp(0.96, 1, pin) + bump - 0.03 * pout).toFixed(4)})`
      man.style.opacity = String(swapK)
      halo.style.opacity = String(pin * (1 - pout) * (0.85 + 0.15 * Math.sin(t * 1.7)))

      // column A
      const aOut = ease.inOutQuad(prog(t, SWAP - 0.12, SWAP + 0.08))
      colA.style.opacity = String(1 - aOut)
      colA.style.transform = `translateX(${-30 * aOut}px)`
      eyeA.style.opacity = String(ease.outQuad(prog(t, PH_IN + 0.08, PH_IN + 0.4)))
      titleA.update(t - (PH_IN + 0.16))
      rows.forEach((r, i) => {
        const p = ease.outCubic(prog(t, ROWS_AT[i], ROWS_AT[i] + 0.34))
        r.style.opacity = String(prog(t, ROWS_AT[i], ROWS_AT[i] + 0.22))
        r.style.transform = `translateX(${lerp(26, 0, p)}px)`
      })
      // rail (shared by both columns): grows with the rows, re-grows for the quote
      const railA = ease.outCubic(prog(t, ROWS_AT[0] - 0.05, ROWS_AT[2] + 0.3)) * (1 - aOut)
      const railB = ease.outCubic(prog(t, Q_IN - 0.05, Q_IN + 0.5))
      const bOut = ease.inOutQuad(prog(t, OUT - 0.04, OUT + 0.22))
      if (t < SWAP + 0.1) { rail.style.top = '520px'; rail.style.height = (270 * railA) + 'px'; rail.style.opacity = String(railA) }
      else { rail.style.top = '566px'; rail.style.height = (240 * railB) + 'px'; rail.style.opacity = String(railB * (1 - bOut)) }

      // column B
      colB.style.opacity = String(prog(t, SWAP, SWAP + 0.05) * (1 - bOut))
      colB.style.transform = `translateX(${-30 * bOut}px)`
      eyeB.style.opacity = String(ease.outQuad(prog(t, SWAP + 0.06, SWAP + 0.36)))
      titleB.update(t - (SWAP + 0.12), 0.022)
      const qp = ease.outCubic(prog(t, Q_IN, Q_IN + 0.4))
      quote.style.opacity = String(prog(t, Q_IN, Q_IN + 0.28))
      quote.style.transform = `translateY(${lerp(18, 0, qp)}px)`
    },
  }
}

export const cues = [
  ...S1.words.map((w, i) => ['tick', w, 0.02]),
  ['bell', S1.words[1], 659.25, 0.045, 2.4, 0],          // "sky" (E5)
  ['whoosh', S1.out, 0.35, 0.05],
  ['whoosh', PH_IN - 0.05, 0.5, 0.08],                    // phone in
  ...ROWS_AT.map((a, i) => ['bell', a, [587.33, 739.99, 880][i], 0.035, 1.8, -0.3 + i * 0.3]),   // Sun / Moon / Rising
  ['whoosh', SWAP - 0.08, 0.35, 0.05],                    // screen swap
  ['bell', SWAP + 0.1, 440, 0.03, 2.0, 0.2],
  ['bell', Q_IN + 0.05, 554.37, 0.03, 2.2, -0.2],         // the quote
  ['whoosh', OUT, 0.45, 0.06],
]
