// og-nt2e86: social rework of nt2e86 (static HOOK box 0–3.4, no bug/animated title/flashes/end card, crazier lines,
// og kit copy ../../og-nt2e81/scenes/t2kit.js). Was: ME EXPLAINING TO MY FRIENDS, "Cancer and the Different Goodnight" (18 s vertical, Star Talk Trends Vol. 2, music: funk · E).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 jump cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../og-nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'og-nt2e86',
  sign: 'cancer', friends: ['leo', 'pisces'], deep: '#1b7fb0',
  hook: '',
  board: 'THE GOODNIGHT TEXT',
  exhibits: [
    { icon: 'moon', label: ['usually a moon'], sticker: 'Usually a moon. Tonight: *a STAR?!*' },
    { icon: 'clock', label: ['11:52, not 11:40'], sticker: 'Twelve minutes late. *I timed it.*' },
    { icon: 'question', label: ['CASE FILE', 'TOP SECRET'], sticker: 'I made a *case file.*' },
  ],
  twist: { friendLine: '…or they were just sleepy?', friendX: 640, heroLine: '…case closed.', heroAt: 2.1, heroMood: 'happy',
    phone: [{ text: 'sorry, fell asleep mid-text! you up?', at: 2.4 }], phoneAt: 2.3, phoneName: 'THEM' },
  last: 'Sometimes sleepy is *just sleepy*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Goodnight text had | *a star, not a moon.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.4
