// nt2e57: TEXTS YOU'D SEND AT 1 AM, "Alphabetised." (20 s vertical, Trends Vol. 2 ep 57, music: lofi)
// Format kit: ../../nt2e56/scenes/latekit.js (shared by nt2e56–nt2e60). Story 0–15.6, then the shared end card.
//   0.0–2.0    hook "Texts you’d send at *1 AM:* | Virgo edition." the hero under a blanket, phone glowing, 1:06 AM.
//   2.0        draft 1 "I reorganised my shelf and thought of you." → ✕ nope.
//   4.9        draft 2 "I alphabetised my feelings. A is for…" → ✕ nope. again.
//   7.6        (card cut) the real one: "I had a really nice time tonight." → sent.   11.7 the reply: "me too. still smiling."
//   12.5       THE STARS: "Simple *wins*."  Pisces cries at the reply (beanbag, corner). Virgo holds a label maker; a perfectly sorted shelf behind.
import { makeLate, B } from '../../nt2e56/scenes/latekit.js'
const { R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD } = B

const EP = makeLate({
  id: 'nt2e57', hero: 'virgo', name: 'Virgo', time: '1:06 AM',
  prev: [`get home ok?`, '12:31 AM'],
  drafts: [`I reorganised my shelf and thought of you.`, `I alphabetised my feelings. A is for…`],
  sent: `I had a really nice time tonight.`,
  reply: `me too. still smiling.`,
  last: `Simple *wins*.`,
  prop: (x, t, F) => inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(27.4, 14.4, 7.2, 10.2); x.fillStyle = '#9fe6b0'; x.fillRect(28, 15, 6, 9); x.fillStyle = BONE; x.fillRect(28.8, 16, 4.4, 2.4); x.fillStyle = INK; x.fillRect(29.2, 19.5, 1.2, 1.2); x.fillRect(31.4, 19.5, 1.2, 1.2) }),
  bg: (x) => { box(x, 878, 560, 180, 380, '#4a3a6a', { b: 6 }); const C = ['#e8344e', '#f2c75c', '#9fe6b0', '#7fd0ff']; for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) R(x, C[i], 892 + i * 42, 590 + r * 120, 32, 96) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD]
