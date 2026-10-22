// T1 · SKIP THE SMALL TALK (global 21.95–26.85) — the talk deck as a core feature, after f7's "Then you talk in cards."
// Same sky spine as f7/f8 (paintSky): its clock eases 26.8 → 26.6 across the scene, so it joins f7's last frame (local
// 26.8) and f8's first (26.6) with no visible jump. Three real talk cards (card-talk-1 The Fool, -2 The Sun, -5 The
// Empress) are dealt up into a fan, each question lights on the beat; "Skip the small talk." → "Ask what matters.";
// the cards lift away and the sky is clean by 26.55 for f8's line.
import { clamp, lerp, prog, ease, tw, el, C } from '../../../src/lib.js'
import { W, H, A, SERIF, fill, img } from '../../../src/scenes/common.js'
import { drawGrain } from './f3-chart.js'
import { paintSky, grainCanvas } from './f7-talk.js'

const T0 = 21.95, T1 = 26.85
const BEAT = 60 / 132                                        // the post-flip tempo (cues.js), grid from 4.15
const DEAL = [22.05, 22.18, 22.31], DEAL_DUR = 0.6
const LIT0 = 4.15 + 42 * BEAT, LIT = [LIT0, LIT0 + 2 * BEAT, LIT0 + 4 * BEAT]   // on the grid          // each question lights, on the beat
const CAP1 = { in: 22.35, out: 24.4 }, CAP2 = { in: 24.6, out: 26.2 }
const EXIT = { a: 25.95, b: 26.5 }
// card png 732×1170, body 60..672 × 60..1110 (centred)
const CW = 732, CH = 1170, BODY_H = 1050, CARD_H = 700, S = CARD_H / BODY_H
const CARDS = [
  { src: 'card-talk-1.png', x: 500, y: 610, rz: -7 },
  { src: 'card-talk-2.png', x: 960, y: 580, rz: 0 },
  { src: 'card-talk-5.png', x: 1420, y: 610, rz: 7 },
]

function words(parent, text, style, at, gap = 0.08) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + 0.22), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${((1 - e) * 22).toFixed(2)}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 6).toFixed(2)}px)` : 'none'
      }
    },
  }
}

export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2200px' }, root)
  const cards = CARDS.map((c, i) => {
    const holder = el('div', { position: 'absolute', left: c.x + 'px', top: c.y + 'px', width: 0, height: 0, transformStyle: 'preserve-3d' }, deck)
    const face = el('div', { position: 'absolute', left: -CW * S / 2 + 'px', top: -CH * S / 2 + 'px', width: CW * S + 'px', height: CH * S + 'px' }, holder)
    img(face, A + c.src, { left: 0, top: 0, width: '100%', height: '100%' })
    const glow = el('div', { position: 'absolute', left: 60 * S + 'px', top: 60 * S + 'px', width: 612 * S + 'px', height: BODY_H * S + 'px', borderRadius: 40 * S + 'px', pointerEvents: 'none' }, face)
    const sheenBox = el('div', { position: 'absolute', left: 60 * S + 'px', top: 60 * S + 'px', width: 612 * S + 'px', height: BODY_H * S + 'px', borderRadius: 40 * S + 'px', overflow: 'hidden', pointerEvents: 'none' }, face)
    const sheen = el('div', { position: 'absolute', left: '-70%', top: '-20%', width: '55%', height: '140%', mixBlendMode: 'screen', opacity: 0,
      background: 'linear-gradient(90deg, rgba(255,236,200,0) 0%, rgba(255,226,170,0.55) 50%, rgba(255,236,200,0) 100%)', transform: 'rotate(16deg)' }, sheenBox)
    return { ...c, i, holder, glow, sheen }
  })
  const capStyle = { left: 0, width: W + 'px', top: '70px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1, color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.9), 0 2px 12px rgba(11,6,32,0.8)' }
  const cap1 = words(root, 'Skip the small talk.', capStyle, CAP1.in)
  const cap2 = words(root, 'Ask what matters.', capStyle, CAP2.in)
  const gx = grainCanvas(root, 0.55)

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.3)))   // crossfade over f7's last fade (same sky)
      paintSky(bx, lerp(26.8, 26.6, prog(t, T0, 26.6)))
      const ex = ease.inCubic(prog(t, EXIT.a, EXIT.b))
      for (const c of cards) {
        const s0 = DEAL[c.i], p = prog(t, s0, s0 + DEAL_DUR), e = ease.outBack(p), e2 = ease.outCubic(p)
        const lit = tw(t, [[LIT[c.i] - 0.04, 0], [LIT[c.i] + 0.08, 1, ease.outQuad], [LIT[c.i] + 0.7, 0.35, ease.inOutQuad]])
        const bob = Math.sin((t - s0) * 1.6 + c.i * 1.3) * 6 * prog(t, s0 + DEAL_DUR, s0 + DEAL_DUR + 0.4)
        const y = lerp(c.y + 820, c.y, e) + bob - 14 * lit - 160 * ex - (c.i === 1 ? 60 : 30) * ex
        const x = c.x + (c.x - 960) * 0.25 * ex
        const rz = lerp(c.rz * 3 + (c.i - 1) * 8, c.rz, e2) * (1 + ex)
        const ry = lerp(c.i === 0 ? 60 : c.i === 2 ? -60 : 40, 0, e2)
        const sc = (1 + 0.06 * lit) * lerp(1, 0.82, ex)
        c.holder.style.display = p > 0 && ex < 1 ? 'block' : 'none'
        c.holder.style.transform = `translate(${(x - c.x).toFixed(2)}px, ${(y - c.y).toFixed(2)}px) rotateZ(${rz.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${sc.toFixed(4)})`
        c.holder.style.opacity = String(clamp(p * 4) * (1 - ex))
        c.glow.style.boxShadow = `0 0 ${(30 + 70 * lit).toFixed(1)}px ${(4 + 16 * lit).toFixed(1)}px rgba(242,199,92,${(0.18 + 0.55 * lit).toFixed(3)}), 0 24px 60px rgba(5,2,18,0.55)`
        const sp = prog(t, LIT[c.i] - 0.05, LIT[c.i] + 0.5)
        c.sheen.style.opacity = String(sp > 0 && sp < 1 ? Math.sin(Math.PI * sp) : 0)
        c.sheen.style.transform = `translateX(${(sp * 330).toFixed(1)}%) rotate(16deg)`
      }
      cap1.update(t, 1 - ease.inOutQuad(prog(t, CAP1.out, CAP1.out + 0.2)))
      cap2.update(t, 1 - ease.inOutQuad(prog(t, CAP2.out, CAP2.out + 0.25)))
      drawGrain(gx, t)
    },
  }
}

export const cues = [
  ...DEAL.map((d, i) => ['whoosh', d, 0.45, 0.06]),
  ...DEAL.map((d, i) => ['tick', d + DEAL_DUR * 0.6, 0.05]),
  ...LIT.map((l, i) => ['bell', l, [880, 1108.73, 1318.51][i], 0.04, 1.8, (i - 1) * 0.4]),
  ['glitter', LIT[0], LIT[2] + 0.5],
  ['whoosh', EXIT.a, 0.55, 0.06],
]
