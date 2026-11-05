// kzce09: ZODIAC COURTROOM, "Haha, Interesting" (12 s vertical, Month 2 boost m06 #9, synthwave · Bm). Hard cut.
//   0.00  frame 0: the jury frozen mid-gasp, ♒ Aquarius calmly sipping tea in the dock; gavel mid-slam; whip zoom in.
//         Hook: "Someone confessed. | Aquarius said *'interesting.'*"
//   0.9   CHARGE: ANSWERED "I LIKE YOU" WITH "HAHA INTERESTING"
//   1.3   EXHIBIT A: the chat. "I really like you." → "haha interesting" (sent) · 2.6 a red circle scribbles round it (gasp)
//   4.3   AQUARIUS: "I was *processing!!*"   6.0 JUDGE: "then say *'give me a minute.'*"
//   7.9   GUILTY (OF BUFFERING) · 8.5 sentence: "say how you feel. even 'one sec.'"   Pisces fountains.
//  10.3   last line "'Interesting' is | not a *feeling.*" holds to 12.0, hard cut.
import { makeCourt, drawChat, R, box, label, clamp, prog, ease, INK, RED, popWords } from '../../kzce01/scenes/courtkit.js'

const T = { circ: 2.6, guilty: 7.9, last: 10.3 }
function tea(x, t, P) {
  const sip = t < 3.9 ? (Math.sin(t * 2.2) > 0.3 ? 1 : 0) : 0
  x.save(); x.translate(P.x + 105, P.y + 10 - sip * 30)
  box(x, -34, -30, 68, 56, '#fffaf0', { b: 5, hi: null }); R(x, '#c98a4a', -28, -26, 56, 12)
  R(x, INK, 34, -20, 18, 30); R(x, '#fffaf0', 34, -14, 10, 18)
  for (let i = 0; i < 3; i++) { x.globalAlpha = 0.5 * Math.abs(Math.sin(t * 2 + i)); R(x, '#efe6d6', -16 + i * 14, -60 - ((t * 30 + i * 12) % 40), 6, 14) }
  x.restore()
}
const CFG = {
  id: 'kzce09', dur: 12, ending: 'cut',
  hook: { at: -1, text: "Someone confessed. | Aquarius said *'interesting.'*", out: [1.15, 1.3], accentColor: '#38c4ec', size: 88 },
  fx: { whips: [{ at: -0.08, from: 1.3, blur: 7, len: 0.5 }, { at: T.guilty + 0.08, from: 1.2 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  gavels: [0.05, T.guilty],
  gasps: [-0.1, T.circ, T.guilty + 0.1],
  jury: ['virgo', 'leo', 'cancer', 'pisces', 'aries', 'libra'],
  tears: () => 3,
  juryMood: (t, id) => { if (t < 0.9) return 'wide'; if (id === 'pisces') return t > T.guilty + 0.3 ? 'happy' : undefined; if (t > T.guilty + 0.5) return 'happy' },
  judge: { mood: t => t < 0.6 ? 'wide' : t < 4.2 ? 'squint' : t < 6 ? 'eyeroll' : t < T.guilty ? 'neutral' : 'happy', look: t => t > 1.3 && t < 4.1 ? [0, 1] : t > 4.2 && t < 7.7 ? [-1, 1] : [0, 0.3] },
  dock: [{ who: 'aquarius', mood: t => t < 1.2 ? 'happy' : t < T.circ ? 'neutral' : t < 4.2 ? 'wide' : t < 6 ? 'happy' : t < T.guilty + 0.1 ? 'neutral' : t < 9.2 ? 'wide' : 'happy',
    look: t => t > 1.3 && t < 4.1 ? [1, -0.6] : undefined, hops: [4.3, 4.6, 9.4], zzz: false, prop: (x, t, P) => tea(x, t, P) }],
  heads: [{ text: "'Interesting' is | not a *feeling.*", at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#38c4ec', size: 100 }],
  ticker: { at: 0.9, out: [10.0, 10.3], label: 'CHARGE', text: 'ANSWERED "I LIKE YOU" WITH "HAHA INTERESTING"' },
  boxes: [{ open: 4.2, close: 7.8, lines: [{ t: 4.3, who: 'aquarius', text: 'I was *processing!!*' }, { t: 6.0, who: 'JUDGE', text: "then say *'give me a minute.'*" }] }],
  exhibits: [{
    at: 1.3, out: [3.85, 4.1], label: 'EXHIBIT A',
    draw(x, t, k, B) {
      drawChat(x, t, B, { title: '♒︎ aquarius', size: 38, msgs: [{ at: 1.5, side: 'L', text: 'I really like you.', meta: '11:12 PM' }, { at: 2.1, side: 'R', text: 'haha interesting', meta: 'sent · 11:12 PM' }] })
      if (t > T.circ) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(B.cx + 120, B.cy - 120, 220, 70, -0.05, 0, Math.PI * 2 * clamp(prog(t, T.circ, T.circ + 0.35))); x.stroke(); x.restore() }
    },
  }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'OF BUFFERING', color: RED, out: [9.7, 10.0], y: 860 }],
  sentence: { at: 8.5, out: [9.7, 10.0], text: "say how you feel. even 'one sec.'" },
  cues: [['pop', 1.5, 1174.66, 0.04, -0.2], ['pop', 2.1, 659.25, 0.04, 0.2], ['tick', T.circ, 0.05], ['tick', T.circ + 0.1, 0.05], ['tick', T.circ + 0.2, 0.05],
    ['pluck', T.guilty + 0.6, 659.25, 0.03, 0.4, 0.45], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
