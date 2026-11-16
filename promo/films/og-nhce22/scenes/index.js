// og-nhce22: the social rework of nhce22, HOT TAKE, COLD TAKE, "The Longest Night" (vertical star_advice, dreamy · Gb).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (box) until 2.4
//   2.4      HOT TAKE: Aquarius confesses every thought, alphabetically   5.3  COLD TAKE: Sagittarius leaves with a telescope
//   8.2      WARM TAKE: THE STARS: "Long night? Pull a talk card." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'The longest night. | Confess or *run away?*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce22',
  hook: '',
  hot: { sign: 'aquarius', take: 'Confess *every* thought. Alphabetically.', say: 'confession three hundred…', prop: 'moon', propAt: [770, 820], propK: 0.9, mood: 'wide' },
  cold: { sign: 'sagittarius', take: 'Pack a telescope. *Leave for a month.*', say: 'me, the telescope, bye.', prop: 'telescope', propAt: [760, 960], propK: 0.9, mood: 'happy' },
  last: 'Long night? Pull a *talk card.*',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
