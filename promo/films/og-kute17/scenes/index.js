// og-kute17: the social rework of kute17, THE UNSENT TEXT, "Leo typed “i’m fine” again" (12 s vertical).
// Same phone, cast and story; the kit copy is ../unsentkit.js (no series bug, no slam title, no glitch burst).
//   0.00 frame 0: Leo mid-hair-flip, "i'm not ok" mid-delete.
//        HOOK (static box, until 3.3): "Leo is *thriving.* | (Leo is not.)"
//   1.20 "i'm THRIVING. obviously." ✗ · 3.60 "rough week but my hair looks amazing" ✗
//   6.40 "honestly i'm not ok. can you call?" → SENT 8.50 · 8.85 incoming call · 9.95 THE STARS, hard cut.
import { makeUnsent } from '../unsentkit.js'
import { incomingCall, incomingCallCues } from '../../hookkit.js'

export const HOOK = 'Leo is *thriving.* | (Leo is not.)'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.3

const EP = makeUnsent({
  id: 'og-kute17', duration: 12,
  sign: 'leo', name: 'Leo', to: 'Kai', status: 'online', avatar: '#9fe6b0',
  hook: '', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'hey, you good? you seemed off today', at: -9, stamp: '9:12 pm' }],
  drafts: [
    { text: 'i’m not ok', at: -1.0, cps: 12, del: -0.12, delCps: 14 },
    { text: 'i’m THRIVING. obviously.', at: 1.2, cps: 16, del: 2.8, delCps: 40 },
    { text: 'rough week but my hair looks amazing', at: 3.6, cps: 20, del: 5.5, delCps: 48 },
    { text: 'honestly i’m not ok. can you call?', at: 6.4, cps: 18, send: 8.5 },
  ],
  effects: [
    { fx: incomingCall, cues: incomingCallCues, o: { at: 8.85, out: [9.75, 9.85], name: 'Kai', sub: 'calling you back…', glyph: '♐', color: '#c9a6ff', answerAt: 9.5 } },
  ],
  moods: [[-9, 'sparkle', [1, -0.5]], [1.2, 'happy', [1, -0.3]], [2.8, 'neutral', [0, 0]], [3.6, 'happy', [1, -0.3]], [5.5, 'wide', [0, 0]], [6.4, 'sparkle', [1, -0.3]], [8.5, 'sparkle', [0, 0]], [10.5, 'happy', [1, 0.3]]],
  heroTears: t => t > 6.4 ? 1 : 0,
  sob: t => t > 8.5 ? 3 : 2,
  lines: [{ t: 9.95, text: 'Strong people *ask* for help too.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
