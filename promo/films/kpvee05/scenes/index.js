// kpvee05 · Planet Talk: Venus to Leo — "Compliment Them First" (22 s vertical, star_talk, loop). jazzy · E.
//   0.00  frame 0: Venus mid-burst out of Leo's mirror, the frame spinning, glitter shards flying; Leo mid-pose.
//         Slam "LEO. The mirror's *my* job, darling."  Leo: "I was rehearsing!"  Leo's prep card: THINGS TO SAY
//         ABOUT ME (my hair · my hair, again · my vibe).
//   5.0   Venus: "Your love language is praise, darling." "So give some." The card flips: ABOUT THEM.
//   9.8   the date (whip zoom): Leo: "Your laugh is the best thing in this room." The date glows: "…wow. Thank you."
//  15.0   GLOW meter: LEO 100 % → 140 %. Pisces sobs, applauding.  18.8 slam "Compliment them. *Watch* you glow."
//         Loops back into the mirror.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, panel, txt, rich, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE } from '../../kpvee01/venuskit.js'

const T = { card: 4.0, flip: [9.0, 9.4], date: 9.8, glow: 13.4, meter: [15.0, 16.8], sob: 16.4, last: 18.8, back: 20.6 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const DATE = { x: 790, y: 1380, s: 250, col: '#9fe6b0' }

function mirror(x, t) {
  const a = outK(t, [T.date - 0.2, T.date + 0.1]) || 0
  const ret = ease.inOutCubic(prog(t, T.back, T.back + 0.9))
  const k = Math.max(a, ret)
  if (k <= 0.01) return
  const spin = (1 - ease.outCubic(prog(t, -0.4, 0.8))) * 0.5
  x.save(); x.globalAlpha *= k; x.translate(540, 690); x.rotate(spin)
  x.fillStyle = 'rgba(160,200,255,0.14)'; x.beginPath(); x.ellipse(0, 0, 250, 330, 0, 0, Math.PI * 2); x.fill()
  x.lineWidth = 46; x.strokeStyle = INK; x.stroke(); x.lineWidth = 34; x.strokeStyle = '#e8c260'; x.stroke()
  x.lineWidth = 6; x.strokeStyle = '#fff1b8'; x.beginPath(); x.ellipse(0, 0, 258, 338, 0, 3.6, 4.6); x.stroke()
  for (let k2 = 0; k2 < 8; k2++) { const a2 = k2 / 8 * Math.PI * 2; drawGem(x, Math.cos(a2) * 250, Math.sin(a2) * 330) }
  // stand
  x.fillStyle = INK; x.fillRect(-20, 330, 40, 300); x.fillStyle = '#c9a24a'; x.fillRect(-12, 336, 24, 290)
  x.restore()
  // shards (frame 0)
  const sa = 1 - prog(t, 0.5, 1.5)
  if (sa > 0) for (let i = 0; i < 16; i++) {
    const ph = clamp((t + 0.8) / 2.3), ang = fr(i, 1) * Math.PI * 2, R = 200 + ph * (500 + fr(i, 2) * 400)
    x.save(); x.globalAlpha = sa; x.translate(540 + Math.cos(ang) * R, 690 + Math.sin(ang) * R * 1.1); x.rotate(t * 5 + i)
    x.fillStyle = 'rgba(210,235,255,0.9)'; x.strokeStyle = INK; x.lineWidth = 3
    x.beginPath(); x.moveTo(0, -26); x.lineTo(18, 10); x.lineTo(-14, 18); x.closePath(); x.fill(); x.stroke(); x.restore()
  }
}
function drawGem(x, gx, gy) { x.fillStyle = INK; x.beginPath(); x.arc(gx, gy, 15, 0, 7); x.fill(); x.fillStyle = ROSE; x.beginPath(); x.arc(gx, gy, 10, 0, 7); x.fill() }
function prepCard(x, t) {
  const k = pop01(t, T.card, 0.35, 2.2) * outK(t, [T.date - 0.3, T.date])
  if (k <= 0.01) return
  const f = ease.inOutCubic(prog(t, ...T.flip)), sx = Math.abs(Math.cos(f * Math.PI))
  const about = f < 0.5 ? 'ME' : 'THEM'
  x.save(); x.translate(800, 1170); x.rotate(0.06); x.scale(k * Math.max(0.03, sx), k)
  panel(x, 0, 0, 390, 330, { fill: CREAM, rad: 18 })
  txt(x, 'THINGS TO SAY', 0, -122, { size: 30, color: INK })
  txt(x, 'ABOUT ' + about, 0, -84, { size: 34, color: about === 'ME' ? '#e05a2b' : '#2a9a5a' })
  const L = about === 'ME' ? ['1. my hair', '2. my hair (again)', '3. my vibe'] : ['1. their laugh', '2. their taste', '3. ask about *them*']
  L.forEach((l, i) => txt(x, l.replace(/\*/g, ''), -160, -20 + i * 56, { size: 32, align: 'left', italic: true, color: INK }))
  if (about === 'ME') { x.strokeStyle = 'rgba(0,0,0,0)' }
  x.restore()
}

const EP = episode({
  sign: 'leo', dur: 22, ending: 'loop',
  enter: { kind: 'burst', at: -0.4, x: 540, y: 680, size: 400 },
  venus: [
    { t: 0, x: 540, y: 680, size: 400, mood: 'wide', look: [-0.6, 1] },
    { t: 1.5, mood: 'sly', look: [-0.8, 1] },
    { t: 5.0, mood: 'happy' },
    { t: 9.4, mood: 'love' },
    { t: 10.2, d: 0.6, x: 540, y: 560, size: 300, mood: 'love', look: [0, 1] },
    { t: 13.5, mood: 'happy' },
    { t: 21.2, d: 0.6, x: 540, y: 680, size: 400, mood: 'wide', look: [-0.6, 1] },
  ],
  signK: [
    { t: 0, x: 320, y: 1400, size: 280, mood: 'wink', look: [1, -1], squash: -0.08 },
    { t: 1.0, mood: 'wide', look: [0.6, -1], squash: 0 },
    { t: 5.0, mood: 'neutral' },
    { t: 7.6, mood: 'squint', look: [1, 0] },
    { t: 10.0, mood: 'happy', look: [1, 0] },
    { t: 13.6, mood: 'sparkle', look: [1, 0] },
    { t: 21.2, mood: 'wink', look: [1, -1], squash: -0.08 },
  ],
  pisK: [
    { t: 0, x: 150, y: 1580, size: 175, mood: 'wide', look: [1, -1], tears: 1 },
    { t: 13.6, mood: 'sparkle', tears: 2 },
    { t: 16.4, mood: 'happy', tears: 3, d: 0.1 },
    { t: 21.2, mood: 'wide', tears: 1 },
  ],
  bubbles: [
    { t0: 2.9, t1: 4.8, who: 'leo', text: 'I was *rehearsing!*', x: 360, y: 1720, tail: -40 },
    { t0: 5.0, t1: 7.4, who: 'venus', text: 'Your love language is *praise*, darling.', y: 300 },
    { t0: 7.6, t1: 9.4, who: 'venus', text: 'So *give* some.', y: 300, size: 60 },
    { t0: 10.6, t1: 13.2, who: 'leo', text: 'Your laugh is the best thing *in this room.*', x: 540, y: 1760, tail: -220 },
    { t0: 13.4, t1: 15.4, who: 'the date', text: '…wow. *Thank* you.', x: 640, y: 1060, tail: 150, tailUp: false, color: DATE.col },
    { t0: 16.4, t1: 18.6, who: 'pisces', text: '*BRAVO.* I’m a wreck.', x: 440, y: 1790, tail: -260 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'LEO. The mirror’s | *my* job, darling.', top: 150, size: 100, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.15, from: 1.4, len: 0.4 }],
    ['screenShake', { at: 0.18, len: 0.5, amp: 24 }],
    ['whipZoom', { at: T.date, from: 1.3, len: 0.4 }],
    ['slamTitle', { at: T.last, text: 'Compliment them. | *Watch* you glow.', top: 180, size: 100, out: [21.0, 21.2] }],
  ],
  back(x, t) { mirror(x, t) },
  mid(x, t) {
    prepCard(x, t)
    const dk = pop01(t, T.date + 0.2, 0.4, 2) * outK(t, [21.0, 21.3])
    if (dk > 0.01) {
      const g = prog(t, T.glow, T.glow + 0.6)
      if (g > 0) { const gr = x.createRadialGradient(DATE.x, DATE.y, 0, DATE.x, DATE.y, 260); gr.addColorStop(0, `rgba(190,255,210,${0.45 * g * dk})`); gr.addColorStop(1, 'rgba(190,255,210,0)'); x.fillStyle = gr; x.fillRect(DATE.x - 260, DATE.y - 260, 520, 520) }
      drawStarChar(x, DATE.x, DATE.y, DATE.s, t, { color: DATE.col, mood: t > T.glow ? 'heart' : 'happy', look: [-1, 0], pop: dk, glow: 1 + g * 0.8, hops: [T.glow + 0.1, T.glow + 0.6], seed: 14 })
    }
  },
  front(x, t, S) {
    // Leo's glow aura + the GLOW meter
    const mk = pop01(t, T.meter[0], 0.3) * outK(t, [18.6, 18.8])
    const lg = prog(t, ...T.meter) * outK(t, [21.0, 21.4])
    if (lg > 0) { const gr = x.createRadialGradient(S.sign.x, S.sign.y, 0, S.sign.x, S.sign.y, 320); gr.addColorStop(0, `rgba(255,210,110,${0.5 * lg})`); gr.addColorStop(1, 'rgba(255,210,110,0)'); x.fillStyle = gr; x.fillRect(S.sign.x - 320, S.sign.y - 320, 640, 640) }
    if (mk > 0.01) {
      const n = Math.round(100 + 40 * ease.outCubic(prog(t, ...T.meter)))
      panel(x, 540, 1000, 560, 120, { fill: '#2a1648', rad: 20, s: mk })
      rich(x, `♌︎ LEO GLOW: *${n}%*`, 540, 980, { size: 46, color: BONE, accent: GOLD, s: mk })
      x.fillStyle = '#ffd27a'; if (mk > 0.5) x.fillRect(300, 1030, 480 * Math.min(1, (n - 60) / 80) , 14)
    }
    sparkleBurst(x, t, S.sign.x, S.sign.y, T.meter[1], { R: 300, n: 14 })
    sparkleBurst(x, t, DATE.x, DATE.y, T.glow, { R: 240 })
    if (t > T.sob && t < 19.4) for (let k = 0; k < 3; k++) heart(x, S.pis.x + 60 + k * 40, S.pis.y - 130 - ((t - T.sob) * 80 + k * 40) % 160, 16, { alpha: 0.9 })
    void lerp
  },
  cues: [
    ['pop', T.card, 987.77, 0.05, 0.3], ['whoosh', T.flip[0], 0.3, 0.05], ['tick', T.flip[1], 0.05],
    ['pop', T.date + 0.2, 784, 0.05, 0.3], ['bell', T.glow, 1760, 0.04, 1.2, 0.3], ['glitter', T.glow, T.glow + 0.6],
    ['riser', T.meter[0], T.meter[1], 0.05], ['pop', T.meter[1], 1318.51, 0.06, 0], ['glitter', T.meter[1], T.meter[1] + 0.5],
    ...sobCues(T.sob, 4), ...[0, 0.2, 0.4, 0.6].map(d => ['tick', +(T.sob + 0.1 + d).toFixed(2), 0.05]),
  ],
})
export const { DURATION, SCENES, CUES } = EP
