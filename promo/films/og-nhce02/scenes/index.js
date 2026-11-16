// og-nhce02: social rework of nhce02 (static HOOK box 0–2.4 over the split screen, no animated hook title / series bug /
// white flashes, thermometer + Pisces + stickers + dialogue box in the safe zone, both signs pushed further; kit copy ./hckit.js).
// Was: nhce02: HOT TAKE, COLD TAKE, "The Borrowed Scarf" (14 s vertical star_advice trial reel, music: lofi · Dm).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #2.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce02',
  was: 'They lent you | *their scarf.*',
  hot: { sign: 'leo', take: 'Wear it to bed. You’re *engaged* now.', say: 'I told my mom. it’s a ring.', prop: 'scarf', col: '#e8344e', col2: '#efe6d6', mood: 'heart', propAt: [760, 860] },
  cold: { sign: 'virgo', take: 'Dry-clean it. Return it in an *hour.*', say: 'ironed. receipt attached.', prop: 'folded', propAt: [760, 900], mood: 'neutral' },
  last: 'It’s a scarf. Ask what it *means.*',
})

export const HOOK = "They lent me | *their scarf.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
export const STORY_END = 11.6
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
