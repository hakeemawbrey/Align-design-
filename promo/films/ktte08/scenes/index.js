// ktte08: THIS OR THAT: LOVE EDITION, "Scorpio, Guess or Ask" (~10 s vertical, star advice trial reel, synthwave · C#).
// Rows: promo/films/month2/m29.md. Format: ../../ktte01/scenes/ttkit.js (read-only).
//   frame 0: Scorpio mid-squint at a "haha." bubble under a red magnifier, lunging into READ BETWEEN THE LINES;
//   record scratch. CHECK THE TIMESTAMP vs GO TO SLEEP → long hover → SLEEP.
//   twist: GUESS WHAT THEY MEANT vs ASK WHAT THEY MEANT → ASK. A notification: "haha = I'm laughing :)".
//   Pisces cries with relief in the tissue cam. Last: "Ask. *It's faster than guessing.*" Hard cut.
import { makeTT, bubble, R, INK, RED } from '../../ktte01/scenes/ttkit.js'
import { notification, notificationCues } from '../../hookkit.js'

function magnifier(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(0.7); R(x, INK, 70, -14, 150, 28); R(x, '#7b5634', 76, -8, 138, 16); x.restore()
  x.lineWidth = 16; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(255,120,140,0.14)'; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.restore()
}
const EP = makeTT({
  id: 'ktte08', mode: 'solo', signs: ['scorpio'],
  hook: 'SCORPIO DECODING | *ONE “HAHA.”*', accent: '#ff5f7e',
  brk: { kind: 'scratch', t: 0.12, len: 0.55, cap: 'it had *a period.*' },
  rounds: [
    { a: 'READ BETWEEN THE LINES', b: 'READ THE LINE', ia: 'q', ib: 'bubble', pick: 'a', d: 1.7 },
    { a: 'CHECK THE TIMESTAMP', b: 'GO TO SLEEP', ia: 'clock', ib: 'zz', pick: 'b', d: 2.2, pickAt: 1.7, hover: true },
    { a: 'GUESS WHAT THEY MEANT', b: 'ASK WHAT THEY MEANT', ia: 'sweat', ib: 'bubble', pick: 'b', d: 1.7 },
  ],
  last: 'Ask. It’s faster | *than guessing.*',
  ending: 'cut', fin: 2.5, finY: 930,
  over(x, t, S) {
    if (S.v < 1.1) { bubble(x, t, 760, 1110, -1, 1.1, 'haha.', { size: 52, col: '#d8d2ec' }); magnifier(x, 760, 1110, S.v < 0.95 ? 1 : 0) }
  },
  fx(T) {
    const N = { at: +(T.realOf(T.E) + 0.2).toFixed(3), out: [99, 99.2], title: 'messages', body: 'haha = *I’m laughing* :)', glyph: '★', y: 455 }
    return { scenes: [notification(N)], cues: notificationCues(N) }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
