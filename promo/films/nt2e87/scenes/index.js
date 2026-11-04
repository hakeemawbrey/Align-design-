// nt2e87: ME EXPLAINING TO MY FRIENDS, "Aries Texts First (Again)" (20 s vertical, Star Talk Trends Vol. 2, music: funk · F).
// Story 0–15.6, then the shared end card. The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 card cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'nt2e87',
  sign: 'aries', friends: ['capricorn', 'pisces'], deep: '#c2401c',
  hook: 'Me explaining to my friends why I’m *texting first* again.',
  board: 'WHY I TEXT FIRST',
  exhibits: [
    { icon: 'heart', label: ['I like them'], sticker: 'I *like* them.' },
    { icon: 'thumb', label: ['they seem to', 'like me'], sticker: 'They seem to *like me* back.' },
    { icon: 'zz', label: ['waiting is', 'boring'], sticker: 'Waiting is *boring.*' },
  ],
  twist: { cheer: true, friendLine: '…okay, that’s fair. SEND IT.', friendX: 700 },
  last: 'Brave is just *honest*, faster.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
