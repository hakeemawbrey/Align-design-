// og-nt2e60: social rework of nt2e60. Static HOOK (box) 0–3.5 replaces the animated headline; the look lives in
// ./latekit.js (a social copy of the format kit: no headline, no bug, no progress bar, no end card); crazier Scorpio.
// Original: nt2e60: TEXTS YOU'D SEND AT 1 AM, "Say it at noon." (20 s vertical, Trends Vol. 2 ep 60, music: lofi)
// Format kit: ../../nt2e56/scenes/latekit.js (shared by nt2e56–nt2e60). Story 0–15.6, then the shared end card.
//   0.0–2.0    hook "Texts you’d send at *1 AM:* | Scorpio edition." the hero under a blanket, phone glowing, 1:09 AM.
//   2.0        draft 1 "I'm not a feelings person." → ✕ nope.
//   4.9        draft 2 "okay I'm a you person." → ✕ nope. again.
//   7.6        (card cut) the real one: "I really like talking to you." → sent.   11.7 the reply: "say it again at noon? :)"
//   12.5       THE STARS: "*Noon*. It's a date."  Pisces cries at the reply (beanbag, corner). Scorpio's hood is up until the reply lands, then it drops.
import { makeLate, B } from './latekit.js'
const { R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD } = B

const EP = makeLate({
  id: 'og-nt2e60', hero: 'scorpio', name: 'Scorpio', time: '1:09 AM',
  prev: [`that was a good talk.`, '12:44 AM'],
  drafts: [`I don't have feelings. I have a hood.`, `the hood is down. emotionally. it's you.`],
  sent: `I really like talking to you.`,
  reply: `say it again at noon? :)`,
  last: `*Noon*. It's a date.`,
  prop: (x, t, F, S) => inSprite(x, F, () => { if (S.replied) return; x.fillStyle = INK; x.fillRect(6, 4, 24, 6); x.fillRect(4, 8, 4, 14); x.fillRect(28, 8, 4, 14); x.fillStyle = '#3a2a5a'; x.fillRect(7, 5, 22, 4); x.fillRect(5, 9, 2, 12); x.fillRect(29, 9, 2, 12) }),
  bg: null,
})
export const HOOK = 'Scorpio at 1 AM: | *deleting* feelings.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, box, inSprite, clamp, prog, ease, lerp, INK, BONE, GOLD]
