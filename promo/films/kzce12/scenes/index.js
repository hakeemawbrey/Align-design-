// kzce12: ZODIAC COURTROOM, "Ninety Seconds, Three Texts" (15 s vertical, Month 2 boost m06 #12, chiptune · A). Loop.
//   0.00  frame 0: ♈ Aries mid-air in the dock, three phones flying out of its hands; gavel mid-slam. 0.3 whip.
//         Hook: "Aries triple-texted | in *ninety seconds.*"
//   1.0   CHARGE: TRIPLE-TEXTED IN NINETY SECONDS   1.4 EXHIBIT A: "hi" 9:00:05 · "hiii" 9:00:40 · "did that send??" 9:01:35 (gasp)
//   5.1   ARIES: "I was *EXCITED!*"   6.9 JUDGE: "excitement isn't a *crime.*"
//   8.6   NOT GUILTY · 9.2 sentence: "one text. then wait for the reply."   10.6 the reply drops in: "hiii!! saturday?"
//  12.4   last line "Excitement is legal. | So is *patience.*"; 14.6–15.0 eases back into frame 0 (seamless loop).
import { makeCourt, drawChat, box, R, clamp, prog, ease, INK, popWords } from '../../kzce01/scenes/courtkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const T = { ng: 8.6, reply: 10.6, last: 12.4 }
const NOTE = { at: T.reply, out: [12.0, 12.25], title: 'messages', body: 'hiii!! *saturday?*', glyph: '♊', time: 'now', y: 120 }
function phones(x, t, P) {
  const fly = ease.outCubic(clamp((t + 0.4) / 1.4))
  ;[[-1, -0.9, -0.5], [1, -1.1, 0.6], [0.2, -1.5, -0.2]].forEach(([dx, dy, rot], i) => {
    x.save(); x.translate(P.x + dx * (60 + 140 * fly), P.y - 60 + dy * (40 + 120 * fly) + 120 * fly * fly); x.rotate(rot + t * (i % 2 ? 3 : -3))
    box(x, -24, -42, 48, 84, '#2a2148', { b: 4 }); R(x, '#7fd0ff', -18, -34, 36, 60); x.restore()
  })
}
const CFG = {
  id: 'kzce12', dur: 15, ending: 'loop',
  hook: { at: -1, text: 'Aries triple-texted | in *ninety seconds.*', out: [1.25, 1.4], accentColor: '#f0603a', size: 98 },
  fx: { whips: [{ at: 0.3, from: 1.25 }, { at: T.ng + 0.08, from: 1.2 }], flashes: [[T.ng + 0.1, '#c9ffd9']] },
  kit: [notification(NOTE)], kitCues: notificationCues(NOTE),
  gavels: [0.05, T.ng],
  gasps: [-0.2, 3.0, T.ng + 0.1, T.reply + 0.1],
  jury: ['cancer', 'taurus', 'scorpio', 'pisces', 'libra', 'aquarius'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.reply + 0.2 ? 'happy' : undefined; if (t > T.reply + 0.3) return 'happy' },
  judge: { mood: t => t < 0.6 ? 'wide' : t < 5 ? 'squint' : t < T.ng ? 'neutral' : 'sparkle', look: t => t > 1.4 && t < 4.8 ? [0, 1] : t > 5 && t < 8.4 ? [-1, 1] : [0, 0.3] },
  dock: [{ who: 'aries', mood: t => t < 1.3 ? 'wide' : t < 3 ? 'neutral' : t < 5 ? 'wide' : t < 6.9 ? 'happy' : t < T.ng ? 'neutral' : t < T.reply ? 'happy' : 'sparkle',
    look: t => t > 1.4 && t < 4.8 ? [1, -0.6] : t > T.reply && t < 12 ? [0, -1] : undefined, hops: [0.0, 5.1, 5.4, T.reply + 0.1, T.reply + 0.4, T.reply + 0.7], prop: (x, t, P) => { if (t < 1.4) phones(x, t, P) } }],
  heads: [{ text: 'Excitement is legal. | So is *patience.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#f0603a', size: 96, out: [14.45, 14.6] }],
  ticker: { at: 1.0, out: [12.1, 12.4], label: 'CHARGE', text: 'TRIPLE-TEXTED IN NINETY SECONDS' },
  boxes: [{ open: 4.95, close: 8.5, lines: [{ t: 5.1, who: 'aries', text: 'I was *EXCITED!*' }, { t: 6.9, who: 'JUDGE', text: "excitement isn't a *crime.*" }] }],
  exhibits: [{ at: 1.4, out: [4.55, 4.85], label: 'EXHIBIT A', draw(x, t, k, B) {
    drawChat(x, t, B, { title: '♈︎ aries', size: 54, msgs: [{ at: 1.7, side: 'R', text: 'hi', meta: '9:00:05 PM' }, { at: 2.2, side: 'R', text: 'hiii', meta: '9:00:40 PM' }, { at: 2.8, side: 'R', text: 'did that send??', meta: '9:01:35 PM' }] })
  } }],
  stamps: [{ at: T.ng, text: 'NOT GUILTY', color: '#2fae6a', out: [10.3, 10.55], y: 860, size: 120 }],
  sentence: { at: 9.2, out: [10.3, 10.55], text: 'one text. then wait.' },
  cues: [['whoosh', 0.02, 0.4, 0.05], ['pop', 1.7, 880, 0.04, 0.2], ['pop', 2.2, 987.77, 0.04, 0.2], ['pop', 2.8, 1174.66, 0.05, 0.2], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
void INK
const EP = makeCourt(CFG)
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
