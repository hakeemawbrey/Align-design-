// og-nhce23: the social rework of nhce23, HOT TAKE, COLD TAKE, "Crush in Town" (vertical star_advice, chiptune · E).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (outline) until 2.4
//   2.4      HOT TAKE: Pisces plans all ten days (and cries on day 4)   5.3  COLD TAKE: Leo waits, majestically
//   8.2      WARM TAKE: THE STARS: "Text “free for cocoa?” Keep it simple." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'Crush is in town. | Plan, or *just wait?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce23',
  hook: '',
  hot: { sign: 'pisces', take: 'Plan all ten days. *Laminated.*', say: 'day 4: we cry at the lights.', prop: 'clipboard', text: ['DAY 1: cocoa', 'DAY 2: skating', 'DAY 3: market', 'DAY 4: cry at', '  the lights', 'DAY 5: cry more'], propAt: [760, 880], propK: 0.9, mood: 'heart' },
  cold: { sign: 'leo', take: 'Wait for *them* to text. Majestically.', say: 'they’ll text me. I’m ME.', prop: 'phone', text: [], propOpts: { title: 'crush', status: 'no new messages' }, propAt: [770, 880], mood: 'neutral', still: true },
  last: 'Text *“free for cocoa?”* Keep it simple.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
