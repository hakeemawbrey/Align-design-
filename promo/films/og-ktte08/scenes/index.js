// og-ktte08: social rework of ktte08 "Scorpio, Guess or Ask" (static HOOK outline over a longer opening; no series bug,
// slam title or record scratch; Scorpio pushed to full detective; ends on the last line under the "haha" text).
// Kit: ./ttkit.js (og social copy of ../../ktte01/scenes/ttkit.js). Was:
// ktte08: THIS OR THAT: LOVE EDITION, "Scorpio, Guess or Ask" (~10 s vertical, star advice trial reel, synthwave · C#).
//   frame 0: Scorpio squinting at a "haha." bubble under a red magnifier ("it had a period."), lunging into READ BETWEEN
//   THE LINES. ZOOM IN ON THE PERIOD vs GO TO SLEEP → long hover → SLEEP.
//   twist: GUESS WHAT THEY MEANT vs ASK WHAT THEY MEANT → ASK. A notification: "haha = I'm laughing :)".
//   Pisces cries with relief in the tissue cam. Last: "Ask. *It's faster than guessing.*" Hard cut.
import { makeTT, bubble, R, INK, RED } from './ttkit.js'
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
  id: 'og-ktte08', mode: 'solo', signs: ['scorpio'],
  hook: '', accent: '#ff5f7e',
  rounds: [
    { a: 'READ BETWEEN THE LINES', b: 'READ THE LINE', ia: 'q', ib: 'bubble', pick: 'a', d: 1.7, hover: true },
    { a: 'ZOOM IN ON THE PERIOD', b: 'GO TO SLEEP', ia: 'clock', ib: 'zz', pick: 'b', d: 2.2, pickAt: 1.7, hover: true },
    { a: 'GUESS WHAT THEY MEANT', b: 'ASK WHAT THEY MEANT', ia: 'sweat', ib: 'bubble', pick: 'b', d: 1.7 },
  ],
  last: 'Ask. It’s faster | *than guessing.*',
  ending: 'cut', fin: 2.5, finY: 1010,
  over(x, t, S) {
    if (S.v < 1.75) { bubble(x, t, 760, 1110, -1, 1.75, 'haha.', { size: 52, col: '#d8d2ec' }); magnifier(x, 760, 1110, S.v < 1.6 ? 1 : 0) }
    bubble(x, t, 360, 1080, 0.5, 1.7, 'it had a period.', { size: 40 })
  },
  fx(T) {
    const N = { at: +(T.realOf(T.E) + 0.2).toFixed(3), out: [99, 99.2], title: 'messages', body: 'haha = *I’m laughing* :)', glyph: '★', y: 520 }
    return { scenes: [notification(N)], cues: notificationCues(N) }
  },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const LIFT = +EP.T.realOf(EP.T.rounds[EP.T.rounds.length - 1].slam).toFixed(3)
export const FIRST = +EP.T.realOf(EP.T.rounds[0].slam).toFixed(3)

export const HOOK = 'They sent “haha.” | *Scorpio is on it.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.6
