// nt2e59: TEXTS YOU'D SEND AT 1 AM, "Sorry, moon." (20 s vertical, Trends Vol. 2 ep 59, music: lofi)
// Format kit: ../../nt2e56/scenes/latekit.js (shared by nt2e56–nt2e60). Story 0–15.6, then the shared end card.
//   0.0–2.0    hook "Texts you’d send at *1 AM:* | Libra edition." the hero under a blanket, phone glowing, 1:08 AM.
//   2.0        draft 1 "quick poll: is the moon extra pretty tonight" → ✕ nope.
//   4.9        draft 2 "…or is it because we talked" → ✕ nope. again.
//   7.6        (card cut) the real one: "tonight was lovely. so are you." → sent.   11.7 the reply: "it's you. the moon's fine."
//   12.5       THE STARS: "Sorry, *moon*."  Pisces cries at the reply (beanbag, corner). A window with a crescent moon behind the phone, top right.
import { makeLate, B } from '../../nt2e56/scenes/latekit.js'
const { R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD } = B

const EP = makeLate({
  id: 'nt2e59', hero: 'libra', name: 'Libra', time: '1:08 AM',
  prev: [`thanks for tonight :)`, '12:02 AM'],
  drafts: [`quick poll: is the moon extra pretty tonight`, `…or is it because we talked`],
  sent: `tonight was lovely. so are you.`,
  reply: `it's you. the moon's fine.`,
  last: `Sorry, *moon*.`,
  prop: null,
  bg: (x, t) => { box(x, 878, 520, 180, 330, '#1a2050', { b: 8 }); R(x, INK, 964, 520, 8, 330); R(x, INK, 878, 681, 180, 8); x.fillStyle = '#f4ecd0'; x.beginPath(); x.arc(925, 600, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1a2050'; x.beginPath(); x.arc(940, 590, 30, 0, Math.PI * 2); x.fill(); for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,' + (0.4 + 0.4 * Math.sin(t * 2 + i)) + ')', 890 + (i * 53) % 160, 700 + (i * 37) % 130, 4, 4) },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD]
