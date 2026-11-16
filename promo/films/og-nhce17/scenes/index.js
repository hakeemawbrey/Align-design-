// og-nhce17: the social rework of nhce17, HOT TAKE, COLD TAKE, "Shorter Texts" (vertical star_advice, jazzy · Eb).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (outline) until 2.4
//   2.4      HOT TAKE: Cancer drafts a forty-text apology for nothing   5.3  COLD TAKE: Libra replies with one letter
//   8.2      WARM TAKE: THE STARS: "Busy month. Ask “how’s your week?”" holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'Texts got shorter. | Spiral or *go cold?*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce17',
  hook: '',
  hot: { sign: 'cancer', take: 'Draft a forty-text apology. *For nothing.*', say: 'WHAT DID I DO??', prop: 'phone', text: ['busy week!', '>are we ok?', '>was it the meme', '>i made a slideshow', '>of our memories'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'wide' },
  cold: { sign: 'libra', take: 'Reply with one letter. *Frostbite.*', say: 'k.', prop: 'phone', text: ['busy week!', '>k.'], propOpts: { title: 'crush' }, propAt: [770, 880], mood: 'neutral' },
  last: 'Busy month. Ask *“how’s your week?”*',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
