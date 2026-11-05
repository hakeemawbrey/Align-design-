// klne07: LONG DISTANCE NOTES, "Not Over Text" (22 s vertical, star_advice post, synthwave · C#m). Hard cut.
// Kit: ../../klne01/ldnkit.js. Dubai (GST, UTC+4) ↔ Manila (PHT, UTC+8): Manila is 4 hours ahead.
//   0.0  frame 0: Dubai 6 PM, ♈ Aries mid-panic at a phone that just says "k."; Manila 10 PM, ♑ Capricorn mid-brush.
//        "One “k.” | *Four hours* of panic."
//   3.2  Aries spirals: "k?? just k??" · "are they mad??" · "should I send a paragraph?" · Capricorn brushes, calm.
//   8.3  THE STARS: "hard talks get a *call,* not a text. tone needs a voice." → 10.0 Aries calls · 10.9 Capricorn
//        picks up (toothbrush still in) · 11.6 "k meant ok! I was brushing my teeth." · 13.4 Aries: "…oh. OK!" · both
//        laugh down the line · Pisces (Aries's roommate) cries in relief.
//  20.3  "Hard talks get | a *voice.*"
import { makeLDN, phone, card, R, box, label, bubble, hearts, sparkles, GOLD, INK, INTER } from '../../klne01/ldnkit.js'

const T = { s1: 3.2, s2: 4.4, s3: 5.6, line: 8.3, call: 10.0, pick: 10.9, ok: 11.6, oh: 13.4, laugh: 14.6, cry: 14.0, last: 20.3 }
const brush = (x, F, t) => { const w = 8 * Math.sin(t * 22); R(x, INK, F.ox - 20 + w, F.oy - F.base - 40, 120, 18); R(x, '#7fd0ff', F.ox - 16 + w, F.oy - F.base - 36, 112, 10); R(x, '#ffffff', F.ox + 80 + w, F.oy - F.base - 52, 22, 14) }
const EP = makeLDN({
  id: 'klne07', len: 22, ending: 'cut', music: { style: 'synthwave', key: 'C#m', seed: 2327 },
  hook: 'One “k.” | *Four hours* of panic.',
  L: { sign: 'aries', city: 'Dubai', min0: 18 * 60 },
  R: { sign: 'capricorn', city: 'Manila', offset: 240 },
  sets: [[0, 'room', 'room', {}]],
  badgeAt: 0.6, gap: '4 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'hard talks get a *call,* not a text. tone needs a voice.' }],
  boxes: [{ from: 0, to: 1, close: 11.4 }],
  pose(t, side) {
    if (side === 'L') return { x: 260, y: 1150, s: 250, mood: t < T.line ? 'wide' : t < T.ok + 0.6 ? 'neutral' : t < T.oh ? 'wide' : 'happy', look: t < T.line ? [0.6, 0.6] : [1, 0], hops: [0, T.s1, T.s2, T.s3, T.call, T.oh, T.laugh, T.laugh + 0.4], squash: t < 0.6 ? 0.1 * Math.sin(t * 30) : 0,
      prop: (x, F) => phone(x, F.ox + 140, F.oy - F.base - 40, { s: 0.55, rot: 0.15, glow: 1, lines: t < T.call ? ['k.'] : ['calling…'] }) }
    return { x: 820, y: 1150, s: 240, mood: t < T.pick ? 'neutral' : t < T.laugh ? 'happy' : 'sparkle', look: t < T.call ? [0, 0] : [-1, 0], hops: [T.pick, T.ok, T.laugh, T.laugh + 0.4],
      prop: (x, F) => { if (t < T.ok + 1.2) brush(x, F, t); if (t > T.call) phone(x, F.ox - 140, F.oy - F.base - 40, { s: 0.55, rot: -0.15, glow: 1, lines: t < T.pick ? ['ARIES calling'] : ['on a call'] }) } }
  },
  pis: { side: 'L', x: 460, y: 1240, s: 115, look: [-1, -0.5], tears: t => (t > T.cry ? 3 : 2), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: [T.cry] },
  draw(x, t) {
    if (t < 0.9) label(x, '“k.”', 300, 870, { size: 80, col: '#ff6b81', font: INTER, weight: 800, rot: -0.1 })
    bubble(x, t, 260, 760, T.s1, T.line - 0.2, 'k?? just k??', { size: 32 })
    bubble(x, t, 300, 660, T.s2, T.line - 0.2, 'are they mad??', { size: 30, col: '#ffd6e0' })
    bubble(x, t, 270, 870, T.s3, T.line - 0.2, ['should I send', 'a paragraph?'], { size: 28, col: '#d9d4ea' })
    // the call: a glowing line across the seam
    if (t > T.pick && t < T.last) { x.save(); x.globalCompositeOperation = 'lighter'; x.strokeStyle = 'rgba(127,224,255,0.7)'; x.lineWidth = 8; x.setLineDash([24, 16]); x.lineDashOffset = -t * 120; x.beginPath(); x.moveTo(400, 1060); x.quadraticCurveTo(540, 980 + 20 * Math.sin(t * 4), 680, 1060); x.stroke(); x.restore(); label(x, 'ON A CALL', 540, 1000, { size: 26, col: '#7fe0ff' }) }
    bubble(x, t, 810, 780, T.ok, T.last - 0.1, ['k meant ok! I was', 'brushing my teeth.'], { size: 30 })
    bubble(x, t, 270, 760, T.oh, T.last - 0.1, '…oh. OK!', { size: 34, col: '#ffe9a8' })
    if (t > T.laugh && t < T.last) { label(x, 'HAHA', 330, 920, { size: 40, col: GOLD, font: INTER, weight: 800, rot: -0.1 }); label(x, 'HA!', 740, 940, { size: 44, col: GOLD, font: INTER, weight: 800, rot: 0.1 }) }
    hearts(x, t, T.laugh, 540, 1100, { n: 7, spread: 320 })
  },
  last: { t: T.last, text: 'Hard talks get | a *voice.*', size: 96 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.pick], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES, ['pop', T.s1, 880, 0.04, -0.3], ['pop', T.s2, 987.77, 0.04, -0.3], ['pop', T.s3, 1174.66, 0.04, -0.3],
  ...[0, 1.1].flatMap(d => [['pop', T.call + d, 1318.51, 0.04, 0.3], ['pop', T.call + d + 0.12, 1046.5, 0.04, 0.3]]), ['tick', T.pick, 0.06], ['pop', T.oh, 1567.98, 0.05, -0.3], ['glitter', T.laugh, T.laugh + 0.5], ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
void [card, box, sparkles]
