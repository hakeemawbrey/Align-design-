// og-kute10: the social rework of kute10, THE UNSENT TEXT, "Capricorn trying to say “proud of you”" (10.5 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, no whip zoom).
//   0.00 frame 0: Capricorn mid-pace with a briefcase, "per my last text, good job." deleting letter by letter.
//        HOOK (static outline, until 3.3): "Capricorn’s love | language: *memos.*"
//   1.20 "please find attached: my pride (pdf)" ✗ · 4.60 "i’m really proud of you." → SENT 6.50
//   7.20 sis replies (Pisces bawls, Capricorn leaks) · 7.60 THE STARS, hard cut on the last line.
import { makeUnsent } from '../unsentkit.js'
import { box, R, INK } from '../unsentkit.js'

export const HOOK = 'Capricorn’s love | language: *memos.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.3

const EP = makeUnsent({
  id: 'og-kute10', duration: 10.5,
  sign: 'capricorn', name: 'Capricorn', to: 'little sis', status: 'online', avatar: '#ff8fb1',
  hook: '', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'I PASSED MY EXAM!!', at: -9, stamp: 'today 2:15 pm' }, { text: 'wait. are you CRYING?? love you', at: 7.2, typing: [6.8, 7.2] }],
  drafts: [
    { text: 'per my last text, good job.', at: -2.9, cps: 10, del: -0.15, delCps: 30 },
    { text: 'please find attached: my pride (pdf)', at: 1.2, cps: 16, del: 3.75, delCps: 42 },
    { text: 'i’m really proud of you.', at: 4.6, cps: 15, send: 6.5 },
  ],
  onHero: (c, t, S, o) => { const b = o.x - 120, y = o.y + 70; box(c, b - 30, y, 80, 56, '#6b4a2f', { b: 5 }); R(c, INK, b - 2, y - 14, 24, 14) },
  heroTears: t => t > 7.3 ? 1 : 0,
  sob: t => t > 6.55 ? 3 : 2,
  lines: [{ t: 7.6, text: 'Warm words don’t need a *board meeting.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
