// og-nt2e87: social rework of nt2e87 (static HOOK outline 0–3.4, no bug/animated title/flashes/end card, crazier lines,
// og kit copy ../../og-nt2e81/scenes/t2kit.js). Was: ME EXPLAINING TO MY FRIENDS, "Aries Texts First (Again)" (18 s vertical, Star Talk Trends Vol. 2, music: funk · F).
// Story 0–15.6, then the short shared end card (2.4 s). The format look and timeline live in ../../nt2e81/scenes/t2kit.js (makeExplain):
//   0.0 hook: the hero mid-jab at the whiteboard · 2.3 EXHIBIT A · 5.0 EXHIBIT B · 7.7 jump cut, EXHIBIT C (the twist) ·
//   ~8.7 the friends react · 11.65 THE STARS pop in · 11.95 the last line. Pisces cries on the couch (or at the board).
import { makeExplain } from '../../og-nt2e81/scenes/t2kit.js'

const EP = makeExplain({
  id: 'og-nt2e87',
  sign: 'aries', friends: ['capricorn', 'pisces'], deep: '#c2401c',
  hook: '',
  board: 'WHY I TEXT FIRST',
  exhibits: [
    { icon: 'heart', label: ['I like them'], sticker: 'I like them. *Loudly.*' },
    { icon: 'thumb', label: ['they waved', 'ONCE'], sticker: 'They *waved once.* That counts.' },
    { icon: 'zz', label: ['waiting is', 'boring'], sticker: 'Waiting is for *other signs.*' },
  ],
  twist: { cheer: true, friendLine: '…okay, fair. SEND IT.', friendX: 700 },
  last: 'Sent. *Zero regrets.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

export const HOOK = 'Aries made a case | *for texting first.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.4
