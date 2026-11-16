// og-nhce19: the social rework of nhce19, HOT TAKE, COLD TAKE, "Winter Blues" (vertical star_advice, dreamy · Db).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (outline) until 2.4
//   2.4      HOT TAKE: Aquarius texts the entire contact list   5.3  COLD TAKE: Gemini (both of them) is "FINE"
//   8.2      WARM TAKE: THE STARS: "Tell one person how you really feel." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'Winter blues hit. | Tell all, or *no one?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce19',
  hook: '',
  hot: { sign: 'aquarius', take: 'Text your *entire* contact list. Twice.', say: 'hi dentist! hi old landlord!', prop: 'phone', text: ['>hi!!', '>hi!!', '>hi dentist!!', '>hi (to everyone)', '>hi again'], propOpts: { title: 'everyone' }, propAt: [770, 880], mood: 'wide' },
  cold: { sign: 'gemini', take: 'Smile through it. *Both* of you.', say: 'I’m FINE. we’re FINE.', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'happy' },
  last: 'Tell *one* person how you really feel.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
