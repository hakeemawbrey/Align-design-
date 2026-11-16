// og-nhce06: social rework of nhce06 (static HOOK box 0–2.4 over the split screen, no animated hook title / series bug /
// white flashes, thermometer + Pisces + stickers + dialogue box in the safe zone, both signs pushed further; kit copy ./hckit.js).
// Was: nhce06: HOT TAKE, COLD TAKE, "Two Weeks Apart" (14 s vertical star_advice trial reel, music: funk · E).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #6.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce06',
  was: 'They’re going home | *for two weeks.*',
  hot: { sign: 'cancer', take: 'Pack a bag. Move in with their *mom.*', say: 'I packed snacks for twelve!', prop: 'suitcase', propAt: [760, 1000] },
  cold: { sign: 'sagittarius', take: 'Two weeks, zero texts. *Freedom!*', say: 'off the grid! bye forever!', prop: 'phone', text: [], propOpts: { title: 'phone', status: 'off until march' }, propAt: [770, 880], mood: 'happy' },
  last: 'Pick a *call time.* Then enjoy your people.',
})

export const HOOK = "They’re going home | *for two weeks.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
export const STORY_END = 11.6
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
