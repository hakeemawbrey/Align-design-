// og-nhce21: the social rework of nhce21, HOT TAKE, COLD TAKE, "The Holiday Card" (vertical star_advice, lofi · Bm).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (outline) until 2.4
//   2.4      HOT TAKE: Virgo designs a family crest with a motto   5.3  COLD TAKE: Scorpio signs "Regards. S."
//   8.2      WARM TAKE: THE STARS: "Ask first. Together is a choice." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'The holiday card: | *both your names?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce21',
  hook: '',
  hot: { sign: 'virgo', take: 'Design a family crest. *Laminate it.*', say: 'the crest has a motto.', prop: 'card', text: ['LOVE,', 'US (EST. NOV)', 'MOTTO: ON TIME'], propOpts: { crest: true }, propAt: [760, 880], propK: 0.9 },
  cold: { sign: 'scorpio', take: 'Sign it *“regards.”* Initials only.', say: 'regards. S.', prop: 'card', text: ['Regards.', 'S.'], propAt: [760, 880], propK: 0.9, mood: 'squint' },
  last: 'Ask first. *Together* is a choice.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
