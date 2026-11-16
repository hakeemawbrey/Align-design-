// og-nhce18: the social rework of nhce18, HOT TAKE, COLD TAKE, "New Year’s Eve Plans" (vertical star_advice, funk · A).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (box) until 2.4
//   2.4      HOT TAKE: Libra books a rooftop, a band and two boats   5.3  COLD TAKE: Taurus is asleep by nine
//   8.2      WARM TAKE: THE STARS: "Ask what they’d love. Plan that." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'NYE, no plans yet. | Boat or *bed by ten?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce18',
  hook: '',
  hot: { sign: 'libra', take: 'Book a rooftop, a band *and two boats.*', say: 'one boat for the band?', prop: 'tickets', propAt: [760, 900], propK: 1.15 },
  cold: { sign: 'taurus', take: 'Asleep by *nine.* Earplugs in.', say: 'wake me in march. zzz.', prop: 'blanket', mood: 'sleepy', still: true, at: [480, 1010] },
  last: 'Ask what *they’d* love. Plan that.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
