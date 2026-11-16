// og-nhce20: the social rework of nhce20, HOT TAKE, COLD TAKE, "The Holiday Market" (vertical star_advice, pop · F).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (box) until 2.4
//   2.4      HOT TAKE: Capricorn buys the whole stall, and the lease   5.3  COLD TAKE: Aries stares at one candle
//   8.2      WARM TAKE: THE STARS: "Say hi. Compliment the hat." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'Cute stranger at | the *holiday market.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce20',
  hook: '',
  hot: { sign: 'capricorn', take: 'Buy the whole stall. *And the lease.*', say: 'I own this market now.', prop: 'stall', propOpts: { sold: true }, propAt: [700, 880], propK: 0.85, at: [300, 1060] },
  cold: { sign: 'aries', take: 'Stare at one candle for *forty minutes.*', say: 'wow. a candle. so… wax.', prop: 'candles', propAt: [740, 1000], propK: 0.85, mood: 'wide', look: [1, 0.4] },
  last: 'Say *hi.* Compliment the hat.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
