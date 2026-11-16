// og-kute18: the social rework of kute18, THE UNSENT TEXT, "Virgo said sorry nine times" (9.4 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, hard cut, no loop).
//   0.00 frame 0: "sorry sorry sorry sorry if this is weird sorry" mid-backspace, sorrys flying.
//        HOOK (static outline, until 3.3): "Virgo said sorry | *nine times.*" · 0.35 record scratch
//   1.30 "apologies in advance for existing" ✗ · 4.10 "hey! quick question:" (Pisces sniffles) · 5.70 THE STARS
import { makeUnsent } from '../unsentkit.js'

export const HOOK = 'Virgo said sorry | *nine times.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const EP = makeUnsent({
  id: 'og-kute18', duration: 9.4,
  sign: 'virgo', name: 'Virgo', to: 'Nell', status: 'online', avatar: '#f2c75c',
  hook: '', ending: 'cut', draftBase: 8,
  msgs: [{ text: 'ask me anything, anytime!', at: -9, stamp: 'last week' }],
  drafts: [
    { text: 'sorry sorry sorry sorry if this is weird sorry', at: -3.2, cps: 16, del: -0.3, delCps: 55 },
    { text: 'apologies in advance for existing', at: 1.3, cps: 18, del: 3.2, delCps: 44 },
    { text: 'hey! quick question:', at: 4.1, cps: 16 },
  ],
  breaks: [{ kind: 'scratch', at: 0.35, len: 0.8, caption: 'that was sorry *#9.*' }],
  sob: t => t > 5.4 ? 3 : 2, pisMood: t => t > 5.4 ? 'heart' : 'sparkle',
  lines: [{ t: 5.7, text: 'Drop the extra sorrys. You’re *allowed.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
