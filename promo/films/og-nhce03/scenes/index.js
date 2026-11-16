// og-nhce03: social rework of nhce03 (static HOOK outline 0–2.4 over the split screen, no animated hook title / series bug /
// white flashes, thermometer + Pisces + stickers + dialogue box in the safe zone, both signs pushed further; kit copy ./hckit.js).
// Was: nhce03: HOT TAKE, COLD TAKE, "The Plus-One" (14 s vertical star_advice trial reel, music: jazzy · Bb).
// Story 0–11.6, then the short 2.4 s end card. The format look lives in ../../nhce01/scenes/hckit.js (see its header for
// the timeline): hook split screen 0–2.4 · HOT TAKE 2.4–5.3 · icy jump cut 5.3 · COLD TAKE 5.3–8.2 · WARM TAKE 8.2–11.6.
// Row: promo/films/next30/b44.md #3.
import { makeHC } from './hckit.js'

const EP = makeHC({
  id: 'og-nhce03',
  was: 'The party invite says | *“plus one?”*',
  hot: { sign: 'sagittarius', take: 'Bring someone you met *at the bus stop.*', say: 'we met four minutes ago!', prop: 'partyhat', at: [400, 1010] },
  cold: { sign: 'aquarius', take: 'Go alone. Study the snacks. *Leave.*', say: 'I am observing the dip.', prop: 'snacks', propAt: [740, 980], mood: 'neutral' },
  last: 'Bring someone who’d *enjoy* it.',
})

export const HOOK = "The invite says | *“plus one?”*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4
export const STORY_END = 11.6
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
