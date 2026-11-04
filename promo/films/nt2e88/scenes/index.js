// nt2e88: ME EXPLAINING TO MY FRIENDS, "Aquarius's Planetarium Date" (20 s vertical, Star Talk Trends Vol. 2, music: funk · G).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 card cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'nt2e88',
  sign: 'aquarius', friends: ['virgo', 'pisces'], deep: '#1a86a8',
  hook: 'Me explaining to my friends why the planetarium *was romantic.*',
  board: 'IT WAS ROMANTIC',
  exhibits: [
    { icon: 'moon', label: ['dark room'], sticker: 'One: a *dark* room.' },
    { icon: 'galaxy', label: ['a real star map'], sticker: 'Two: a *real* star map.' },
    { icon: 'hand', label: ['they held my hand', 'at the nebula part'], sticker: 'They held my hand at *the nebula part.*' },
  ],
  twist: { friendLine: 'STOP. that’s actually cute.', friendX: 700, friendsCry: true },
  last: 'Your *weird* is someone’s favourite.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
