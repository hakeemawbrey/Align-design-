// S-TALK · THEN YOU TALK IN CARDS — shown, not told (global 19.55–26.85). Marcus and Juniper actually play talk cards and
// answer them, as a big chat over the sky (no phone: everything reads at ≥ 40 px).
//   A 19.75–22.9  Marcus plays THE FOOL (card-talk-1 "What's a hill you will die on?") — it lands left; on the right the
//                 thread: Juniper types… "Pineapple on pizza. I will die on it." → Marcus "Bold. Mine: cereal is soup."
//                 → Juniper "Okay. You're fun."   caption: "Skip the small talk."
//   B 22.9–26.2   Juniper plays THE SUN (card-talk-2 "Morning person or night owl?") — it lands right; thread on the left:
//                 Marcus "Night owl. Always." → Juniper types… "Same. 2am diner?" → Marcus "It's a date." ✦
//                 caption: "Get a real answer."
//   26.0–26.5     everything lifts away; the sky is clean by 26.55 for f8's line.
// Same sky spine as f5→f8 (f7's paintSky): its clock runs 24.0 → 26.6 across the scene, so it joins f5's last frame
// (local 24.0) and f8's first (26.6) with no jump.
import { clamp, lerp, prog, ease, tw, el, C } from '../../../src/lib.js'
import { W, H, A, SERIF, SANS, MONO, fill, img } from '../../../src/scenes/common.js'
import { drawGrain } from './f3-chart.js'
import { paintSky, grainCanvas } from './f7-talk.js'

const T0 = 19.55, T1 = 26.85, SKY0 = 24.0, SKY1 = 26.6
const EXIT = { a: 26.0, b: 26.5 }
const CW = 732, CH = 1170, S = 760 / 1050                   // talk card png; body 1050 tall → 760 on screen
const JU = { bg: 'rgba(120,96,210,0.34)', bd: 'rgba(201,166,255,0.55)', name: 'JUNIPER' }
const MA = { bg: 'rgba(242,199,92,0.16)', bd: 'rgba(242,199,92,0.6)', name: 'MARCUS' }

// beat A: card left, thread right · beat B: card right, thread left
const A_ = { card: { src: 'card-talk-1.png', x: 520, y: 590, rz: -3, from: [1500, 1400, 14], land: 19.75, dur: 0.5 },
  label: 'MARCUS PLAYED THE FOOL', col: { x0: 930, x1: 1800 }, labelAt: 20.15, out: 22.6, cap: ['Skip the small talk.', 19.9, 22.5],
  msgs: [{ who: JU, text: 'Pineapple on pizza. I will die on it.', type: 20.4, at: 20.75 },
         { who: MA, text: 'Bold. Mine: cereal is soup.', at: 21.35 },
         { who: JU, text: 'Okay. You’re fun.', type: 21.8, at: 22.05 }] }
const B_ = { card: { src: 'card-talk-2.png', x: 1400, y: 590, rz: 3, from: [400, -500, -14], land: 23.1, dur: 0.5 },
  label: 'JUNIPER PLAYED THE SUN', col: { x0: 120, x1: 990 }, labelAt: 23.3, out: EXIT.a, cap: ['Get a real answer.', 23.1, 25.85],
  msgs: [{ who: MA, text: 'Night owl. Always.', at: 23.55 },
         { who: JU, text: 'Same. 2am diner?', type: 24.05, at: 24.35 },
         { who: MA, text: 'It’s a date. ✦', at: 24.95, gold: true }] }
const ROW0 = 330, ROW_H = 158

function caption(root, text) {
  const box = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '58px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px',
    lineHeight: 1, color: C.bone, whiteSpace: 'nowrap', opacity: 0, textShadow: '0 0 30px rgba(11,6,32,0.9), 0 2px 12px rgba(11,6,32,0.8)' }, root, text)
  return box
}

function beat(root, B) {
  const g = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  // the played card
  const holder = el('div', { position: 'absolute', left: B.card.x + 'px', top: B.card.y + 'px', width: 0, height: 0 }, g)
  const face = el('div', { position: 'absolute', left: -CW * S / 2 + 'px', top: -CH * S / 2 + 'px', width: CW * S + 'px', height: CH * S + 'px' }, holder)
  img(face, A + B.card.src, { left: 0, top: 0, width: '100%', height: '100%' })
  const glow = el('div', { position: 'absolute', left: 60 * S + 'px', top: 60 * S + 'px', width: 612 * S + 'px', height: 1050 * S + 'px', borderRadius: 40 * S + 'px', pointerEvents: 'none' }, face)
  const sheenBox = el('div', { position: 'absolute', left: 60 * S + 'px', top: 60 * S + 'px', width: 612 * S + 'px', height: 1050 * S + 'px', borderRadius: 40 * S + 'px', overflow: 'hidden', pointerEvents: 'none' }, face)
  const sheen = el('div', { position: 'absolute', left: '-70%', top: '-20%', width: '55%', height: '140%', mixBlendMode: 'screen', opacity: 0,
    background: 'linear-gradient(90deg, rgba(255,236,200,0) 0%, rgba(255,226,170,0.6) 50%, rgba(255,236,200,0) 100%)', transform: 'rotate(16deg)' }, sheenBox)
  // the thread
  const colW = B.col.x1 - B.col.x0
  const label = el('div', { position: 'absolute', left: B.col.x0 + 'px', width: colW + 'px', top: (ROW0 - 70) + 'px', textAlign: 'center', fontFamily: MONO, fontSize: '26px',
    letterSpacing: '0.26em', color: 'rgba(242,199,92,0.95)', opacity: 0, textShadow: '0 0 12px rgba(11,6,32,0.9)' }, g, '✦&nbsp;&nbsp;' + B.label + '&nbsp;&nbsp;✦')
  const msgs = B.msgs.map((m, i) => {
    const me = m.who === MA
    const row = el('div', { position: 'absolute', left: B.col.x0 + 'px', width: colW + 'px', top: (ROW0 + i * ROW_H) + 'px', textAlign: me ? 'right' : 'left' }, g)
    const name = el('div', { fontFamily: MONO, fontSize: '22px', letterSpacing: '0.22em', color: 'rgba(239,230,214,0.7)', margin: me ? '0 18px 8px 0' : '0 0 8px 18px', opacity: 0 }, row, m.who.name)
    const bub = el('div', { display: 'inline-block', maxWidth: '820px', padding: '20px 34px', borderRadius: '40px', [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '12px',
      background: m.who.bg, border: `2px solid ${m.who.bd}`, fontFamily: SANS, fontSize: '42px', lineHeight: 1.25, color: '#f6f0e6', textAlign: 'left', whiteSpace: 'nowrap',
      boxShadow: m.gold ? '0 0 40px rgba(242,199,92,0.35)' : '0 10px 30px rgba(5,2,18,0.4)', transformOrigin: me ? '100% 100%' : '0% 100%', opacity: 0 }, row, m.text)
    let dots = null
    if (m.type) {
      dots = el('div', { position: 'absolute', [me ? 'right' : 'left']: '0', top: '38px', display: 'flex', gap: '12px', padding: '24px 30px', borderRadius: '40px', borderBottomLeftRadius: '12px',
        background: m.who.bg, border: `2px solid ${m.who.bd}`, opacity: 0 }, row)
      for (let d = 0; d < 3; d++) el('div', { width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(239,230,214,0.85)' }, dots)
    }
    return { ...m, name, bub, dots }
  })
  return { B, g, holder, glow, sheen, label, msgs, cap: caption(root, B.cap[0]) }
}

export default function build(stage) {
  const root = fill(stage, { background: '#0b0620' })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '22px', textAlign: 'center', textIndent: '0.3em', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.3em',
    color: C.bone, opacity: 0, textShadow: '0 0 12px rgba(11,6,32,0.9)' }, root, 'THE TALK DECK')
  const beats = [beat(root, A_), beat(root, B_)]
  const gx = grainCanvas(root, 0.55)

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.2)))
      paintSky(bx, lerp(SKY0, SKY1, prog(t, T0, SKY1)))
      const ex = ease.inCubic(prog(t, EXIT.a, EXIT.b))
      eb.style.opacity = String(ease.outQuad(prog(t, 19.75, 20.05)) * (1 - ex))
      for (const b of beats) {
        const B = b.B, c = B.card
        const p = prog(t, c.land - c.dur, c.land), e = ease.outBack(p), e2 = ease.outCubic(p)
        const out = ease.inCubic(prog(t, B.out, B.out + 0.35))
        const on = p > 0 && out < 1
        b.g.style.display = on ? 'block' : 'none'
        if (!on) { b.cap.style.opacity = '0'; continue }
        const land = tw(t, [[c.land - 0.04, 0], [c.land + 0.06, 1, ease.outQuad], [c.land + 0.8, 0.3, ease.inOutQuad]])
        const dir = c.x < 960 ? -1 : 1
        const x = lerp(c.from[0], c.x, e2) + dir * 500 * out, y = lerp(c.from[1], c.y, e) - 10 * land
        const rz = lerp(c.from[2], c.rz, e2)
        b.holder.style.transform = `translate(${(x - c.x).toFixed(2)}px, ${(y - c.y).toFixed(2)}px) rotate(${rz.toFixed(3)}deg) scale(${(1 + 0.04 * land).toFixed(4)})`
        b.holder.style.opacity = String(clamp(p * 4) * (1 - out))
        b.glow.style.boxShadow = `0 0 ${(30 + 70 * land).toFixed(1)}px ${(4 + 16 * land).toFixed(1)}px rgba(242,199,92,${(0.2 + 0.5 * land).toFixed(3)}), 0 24px 60px rgba(5,2,18,0.55)`
        const sp = prog(t, c.land + 0.02, c.land + 0.5)
        b.sheen.style.opacity = String(sp > 0 && sp < 1 ? Math.sin(Math.PI * sp) : 0)
        b.sheen.style.transform = `translateX(${(sp * 330).toFixed(1)}%) rotate(16deg)`
        b.label.style.opacity = String(ease.outQuad(prog(t, B.labelAt, B.labelAt + 0.2)) * (1 - out))
        const tOut = 1 - ease.inOutQuad(prog(t, B.out - 0.05, B.out + 0.25))
        for (const m of b.msgs) {
          const k = prog(t, m.at, m.at + 0.28), kb = ease.outBack(k)
          m.bub.style.opacity = String(clamp(k * 3) * tOut)
          m.bub.style.transform = `translateY(${((1 - kb) * 26).toFixed(2)}px) scale(${lerp(0.85, 1, kb).toFixed(4)})`
          m.name.style.opacity = String(ease.outQuad(prog(t, (m.type || m.at) - 0.05, (m.type || m.at) + 0.15)) * tOut)
          if (m.dots) {
            const dk = t >= m.type && t < m.at + 0.04 ? 1 : 0
            m.dots.style.opacity = String(dk * tOut)
            ;[...m.dots.children].forEach((d, i) => { d.style.transform = `translateY(${(-8 * Math.max(0, Math.sin((t - m.type) * 14 - i * 0.9))).toFixed(1)}px)` })
          }
          if (m.gold) m.bub.style.boxShadow = `0 0 ${(30 + 60 * tw(t, [[m.at, 0], [m.at + 0.15, 1, ease.outQuad], [m.at + 1, 0.4, ease.inOutQuad]])).toFixed(1)}px rgba(242,199,92,0.45)`
        }
        const [ctext, cin, cout] = B.cap
        b.cap.style.opacity = String(ease.outQuad(prog(t, cin, cin + 0.25)) * (1 - ease.inOutQuad(prog(t, cout, cout + 0.25))))
        b.cap.style.transform = `translateY(${((1 - ease.outCubic(prog(t, cin, cin + 0.35))) * 18).toFixed(2)}px)`
        void ctext
      }
      drawGrain(gx, t)
    },
  }
}

export const cues = [
  ...[A_, B_].flatMap(B => [
    ['whoosh', B.card.land - B.card.dur + 0.05, B.card.dur, 0.09], ['tick', B.card.land, 0.08], ['boom', B.card.land, 0.12],
    ['bell', B.card.land + 0.02, B === A_ ? 880 : 1108.73, 0.04, 1.8, B === A_ ? -0.4 : 0.4],
    ...B.msgs.flatMap(m => [
      ...(m.type ? [0, 0.1, 0.2].map(d => ['tick', m.type + d, 0.018]) : []),
      ['tick', m.at, 0.045], ['bell', m.at + 0.01, m.who === MA ? 659.25 : 783.99, 0.022, 0.9, m.who === MA ? 0.3 : -0.3],
    ]),
  ]),
  ['glitter', B_.msgs[2].at, B_.msgs[2].at + 0.6],
  ['whoosh', EXIT.a, 0.5, 0.06],
]
