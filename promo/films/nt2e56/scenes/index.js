// nt2e56: TEXTS YOU'D SEND AT 1 AM, "Snack paused." (20 s vertical, Trends Vol. 2 ep 56, music: lofi)
// Format kit: ../../nt2e56/scenes/latekit.js (shared by nt2e56–nt2e60). Story 0–15.6, then the shared end card.
//   0.0–2.0    hook "Texts you’d send at *1 AM:* | Taurus edition." the hero under a blanket, phone glowing, 1:04 AM.
//   2.0        draft 1 "describe your perfect sandwich. go." → ✕ nope.
//   4.9        draft 2 "I'd share my snacks with you. ALL of them." → ✕ nope. again.
//   7.6        (card cut) the real one: "your laugh is my favourite sound." → sent.   11.7 the reply: "…I'm laughing right now."
//   12.5       THE STARS: "The snack can *wait*."  Pisces cries at the reply (beanbag, corner). Taurus holds a cookie, then puts it down for the reply.
import { makeLate, B } from '../../nt2e56/scenes/latekit.js'
const { R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD } = B

const EP = makeLate({
  id: 'nt2e56', hero: 'taurus', name: 'Taurus', time: '1:04 AM',
  prev: [`home safe! tonight was fun :)`, '11:52 PM'],
  drafts: [`describe your perfect sandwich. go.`, `I'd share my snacks with you. ALL of them.`],
  sent: `your laugh is my favourite sound.`,
  reply: `…I'm laughing right now.`,
  last: `The snack can *wait*.`,
  prop: (x, t, F, S) => inSprite(x, F, () => { const up = S.replied ? 0 : 1; x.fillStyle = INK; x.fillRect(27.2, 15.2 + 3 * (1 - up), 8.6, 8.6); x.fillStyle = '#c9844a'; x.fillRect(28, 16 + 3 * (1 - up), 7, 7); x.fillStyle = '#5a3418'; x.fillRect(29, 17.5 + 3 * (1 - up), 1.4, 1.4); x.fillRect(32, 19 + 3 * (1 - up), 1.4, 1.4); x.fillRect(30, 21 + 3 * (1 - up), 1.4, 1.4) }),
  bg: null,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD]
