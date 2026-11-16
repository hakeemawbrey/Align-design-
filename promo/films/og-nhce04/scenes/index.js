// og-nhce04: social rework of nhce04 (static HOOK box 0–2.4 over the split screen, no animated hook title / series bug /
// white flashes, thermometer + Pisces + stickers + dialogue box in the safe zone, both signs pushed further; kit copy ./hckit.js).
// Was: nhce04: HOT TAKE, COLD TAKE, "Single in Cuffing Season" (14 s vertical star_advice trial reel, music: dreamy · Eb).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #4.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce04',
  was: 'Cuffing season started. | *You’re single.*',
  hot: { sign: 'gemini', take: 'Five dates by *Friday.* Go go go.', say: 'I double-booked lunch. twice.', prop: 'calendar', n: 5, propAt: [760, 880], propK: 0.9, propOpts: { title: 'THIS WEEK' } },
  cold: { sign: 'scorpio', take: 'Hibernate till May. *Bolt* the door.', say: 'see you in may. maybe.', prop: 'blanket', mood: 'sleepy', still: true, at: [480, 1010] },
  last: 'Cozy counts *with friends,* too.',
})

export const HOOK = "Cuffing season. | *I’m still single.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
export const STORY_END = 11.6
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
