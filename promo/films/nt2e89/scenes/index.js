// nt2e89: ME EXPLAINING TO MY FRIENDS, "Taurus and Our Place" (20 s vertical, Star Talk Trends Vol. 2, music: funk · A).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 card cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'nt2e89',
  sign: 'taurus', friends: ['gemini', 'pisces'], deep: '#a8700f',
  hook: 'Me explaining to my friends why date three was *the same spot.*',
  board: 'SAME SPOT, AGAIN',
  exhibits: [
    { icon: 'bread', label: ['the bread'], sticker: 'Exhibit A: *the bread.*' },
    { icon: 'plate', label: ['the server knows', 'our order'], sticker: 'The server knows *our order.*' },
    { icon: 'heart', label: ['it’s OUR', 'place now'], sticker: 'It’s *our place* now.' },
  ],
  twist: { friendLine: '…okay, that’s actually cute.', friendX: 690, cheer: true },
  last: 'Same table, *new* chapter.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
