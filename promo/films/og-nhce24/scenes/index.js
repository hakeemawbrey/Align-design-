// og-nhce24: the social rework of nhce24, HOT TAKE, COLD TAKE, "They Planned Everything" (vertical star_advice, funk · D).
// Same split screen, cast and story; the kit copy in ./hckit.js drops the in-film hook caption, the series bug and the
// white flashes, keeps everything in the app's safe zones and ends on the warm take (no end card in --social).
//   0.0–2.4  split screen (fire | frost), static HOOK (box) until 2.4
//   2.4      HOT TAKE: Capricorn books bigger dates through June   5.3  COLD TAKE: Pisces says "cool, thanks" and sobs
//   8.2      WARM TAKE: THE STARS: "Tell them what you loved about it." holds to the end
import { makeHC, STORY_END as END } from './hckit.js'

export const HOOK = 'They planned the | *whole* winter date.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4

const EP = makeHC({
  id: 'og-nhce24',
  hook: '',
  hot: { sign: 'capricorn', take: 'Out-plan them. *Booked through June.*', say: 'date six is a spreadsheet.', prop: 'calendar', n: 25, propAt: [760, 880], propK: 0.9, propOpts: { title: 'JAN–JUN', mark: 'x' } },
  cold: { sign: 'pisces', take: 'Say “cool, thanks.” *Sob about it later.*', say: 'cool. thanks. (sobbing)', prop: 'none', at: [540, 1010], sayAt: [540, 640], mood: 'wide', look: [0, 1], still: true },
  last: 'Tell them what you *loved* about it.',
})

export const DURATION = EP.DURATION
export const STORY_END = END
export const SCENES = EP.SCENES
export const CUES = EP.CUES
