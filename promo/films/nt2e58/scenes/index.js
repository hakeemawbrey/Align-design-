// nt2e58: TEXTS YOU'D SEND AT 1 AM, "Sunrise plan." (20 s vertical, Trends Vol. 2 ep 58, music: lofi)
// Format kit: ../../nt2e56/scenes/latekit.js (shared by nt2e56–nt2e60). Story 0–15.6, then the shared end card.
//   0.0–2.0    hook "Texts you’d send at *1 AM:* | Aries edition." the hero under a blanket, phone glowing, 1:02 AM.
//   2.0        draft 1 "WAKE UP I HAVE AN IDEA" → ✕ nope.
//   4.9        draft 2 "how fast can you put on shoes" → ✕ nope. again.
//   7.6        (card cut) the real one: "want to watch the sunrise with me this weekend?" → sent.   11.7 the reply: "setting an alarm. I'm in."
//   12.5       THE STARS: "*Sunrise* people now."  Pisces cries at the reply (beanbag, corner). Aries sits bolt upright (a ! pops at the hook).
import { makeLate, B } from '../../nt2e56/scenes/latekit.js'
const { R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD } = B

const EP = makeLate({
  id: 'nt2e58', hero: 'aries', name: 'Aries', time: '1:02 AM',
  prev: [`night night ✦`, '12:10 AM'],
  drafts: [`WAKE UP I HAVE AN IDEA`, `how fast can you put on shoes`],
  sent: `want to watch the sunrise with me this weekend?`,
  reply: `setting an alarm. I'm in.`,
  last: `*Sunrise* people now.`,
  prop: (x, t, F) => { if (t > 2) return; inSprite(x, F, () => { x.fillStyle = GOLD; x.fillRect(16, -4, 4, 6); x.fillRect(17, 3, 2, 2) }) },
  bg: null,
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD]
