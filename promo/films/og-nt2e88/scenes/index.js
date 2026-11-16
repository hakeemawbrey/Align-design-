// og-nt2e88: social rework of nt2e88 (static HOOK box 0–3.4, no bug/animated title/flashes/end card, crazier lines,
// og kit copy ../../og-nt2e81/scenes/t2kit.js). Was: ME EXPLAINING TO MY FRIENDS, "Aquarius's Planetarium Date" (18 s vertical, Star Talk Trends Vol. 2, music: funk · G).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 jump cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../og-nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'og-nt2e88',
  sign: 'aquarius', friends: ['virgo', 'pisces'], deep: '#1a86a8',
  hook: '',
  board: 'IT WAS ROMANTIC',
  exhibits: [
    { icon: 'moon', label: ['dark room'], sticker: 'One: a *pitch-black* room.' },
    { icon: 'galaxy', label: ['a real star map'], sticker: 'Two: a star map. *I corrected it.*' },
    { icon: 'hand', label: ['they held my hand', 'at the nebula part'], sticker: 'They held my hand at *the nebula part.*' },
  ],
  twist: { friendLine: 'STOP. that’s actually cute.', friendX: 700, friendsCry: true },
  last: 'Nerdy and *adored*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Aquarius thinks this | *is peak romance.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.4
