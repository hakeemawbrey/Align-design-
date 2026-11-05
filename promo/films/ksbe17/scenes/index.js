// ksbe17: SAY IT BETTER ep 17 (long), "Left on Read, Played Twice" (♋ Cancer and ♊ Gemini). lofi · Eb. Hard cut.
// ROUND 1: Cancer mid-fall onto the bed, phone mid-air, "READ 4:12 PM" — "SO YOU JUST IGNORE ME NOW?"; paragraphs,
// screenshots to the group chat, both go cold; Pisces sobbing in the middle → ◀◀ REWIND → ROUND 2: "Hey, I got a bit
// anxious earlier. Everything okay?" … a quick 'busy' next time, a call tonight → THE VERDICT 1/10 vs 10/10.
import { makeLong } from '../../ksbe01/scenes/sblong.js'
import { drawPhoneSmall, rect, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease } from '../../../src/lib.js'
const L = makeLong({
  ep: 17, room: 'bedroom',
  A: { sign: 'cancer' }, B: { sign: 'gemini' }, P: { x: 330, y: 640, s: 120, look: [1, 1] },
  hook: 'Left on read. | *Two* endings.',
  r1: [
    { who: 'A', text: 'So you just *ignore* me now?' },
    { who: 'B', text: 'I was *busy!* Relax!' },
    { who: 'A', text: 'Busy for *six hours?*' },
    { who: 'B', text: 'Why are you *tracking* me?!' },
    { who: 'A', text: 'Screenshot sent to *the group.*' },
    { who: 'B', text: 'Wow. *Fine.* Goodnight.' },
  ],
  r2: [
    { who: 'A', text: 'Hey, I got a bit *anxious* earlier. Everything okay?' },
    { who: 'B', text: 'Oh no, sorry! I read it in a meeting and *forgot*.', kind: 'better' },
    { who: 'A', text: 'That makes sense. Could you send a quick ‘busy’ *next time?*' },
    { who: 'B', text: 'Deal. And can I *call* you tonight?', kind: 'better' },
    { who: 'A', text: 'yes. *please.*', kind: 'say' },
  ],
  stars: ['the silence felt *loud*.', 'say the worry, *gently*.'],
  starsAfter: 1,
  card: { text: 'How do you like to stay in touch on busy days?', after: 3 },
  scores: ['1/10', '10/10'],
  last: 'Ask the question | *under* the question.',
  front(x, w, K) {
    const T = L.TIMES, a = K.st.A
    if (!a) return
    if (w < T.r1End) {   // the phone with READ 4:12 PM in round 1
      const fly = 1 - ease.outCubic(prog(w, -0.5, 0.5))
      drawPhoneSmall(x, a.x + 170, a.y - 130 - fly * 200, 1.0, w, { rot: 0.2 + fly * 2, lines: [60, 40] })
      x.save(); x.font = "800 26px 'Space Mono'"; x.fillStyle = BONE; x.textAlign = 'center'
      const tw = 220; rect(x, a.x + 60, a.y - 290, tw, 44, INK); x.fillText('READ 4:12 PM', a.x + 60 + tw / 2, a.y - 259); x.restore()
    } else if (w >= T.R2 && T.r2[3] && w > T.r2[3].at + 2) {   // the call: both phones glowing
      drawPhoneSmall(x, a.x + 110, a.y - 40, 0.8, w, { rot: 0.1, lines: [] })
      const b = K.st.B; if (b) drawPhoneSmall(x, b.x - 110, b.y - 40, 0.8, w, { rot: -0.1, lines: [] })
    }
  },
})
export const { DURATION, SCENES, CUES, TIMES } = L
