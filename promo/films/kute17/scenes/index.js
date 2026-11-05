// kute17: THE UNSENT TEXT, "Leo typed “i’m fine” again" (10 s vertical trial reel, music: cinematic · D).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Leo mid-hair-flip, the screen glitching on "i'm not ok" mid-delete · 0.30 glitch
//   1.20 "i'm fine!!" ✗ · 2.70 "lol rough week" ✗ · 4.50 "honestly i'm not ok. can you call?" → SENT 6.50 · 6.85 incoming call · 7.90 THE STARS
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, shadow, INK, GOLD, BONE, RED, PINK, BLUE, INTER, SERIF, MONO, ease, clamp, prog } from '../../kute01/unsentkit.js'
import { glitch, glitchCues, incomingCall, incomingCallCues } from '../../hookkit.js'

const EP = makeUnsent({
  id: 'kute17', duration: 10,
  sign: 'leo', name: 'Leo', to: 'Kai', status: 'online', avatar: '#9fe6b0',
  hook: 'Leo typed *“i’m fine”* | again.', ending: 'cut', draftBase: 1,
  msgs: [{ text: 'hey, you good? you seemed off today', at: -9, stamp: '9:12 pm' }],
  drafts: [
    { text: 'i’m not ok', at: -1.0, cps: 12, del: -0.12, delCps: 14 },
    { text: 'i’m fine!!', at: 1.2, cps: 12, del: 2.3, delCps: 26 },
    { text: 'lol rough week', at: 2.7, cps: 14, del: 4.1, delCps: 30 },
    { text: 'honestly i’m not ok. can you call?', at: 4.5, cps: 18, send: 6.5 },
  ],
  effects: [
    { fx: glitch, cues: glitchCues, o: { at: 0.3, len: 0.6, dialog: false, amp: 0.8 } },
    { fx: incomingCall, cues: incomingCallCues, o: { at: 6.85, out: [7.75, 7.85], name: 'Kai', sub: 'calling you back…', glyph: '♐', color: '#c9a6ff', answerAt: 7.5 } },
  ],
  moods: [[-9, 'sparkle', [1, -0.5]], [1.2, 'happy', [1, -0.3]], [2.3, 'neutral', [0, 0]], [2.7, 'squint', [1, -0.3]], [4.1, 'wide', [0, 0]], [4.5, 'sparkle', [1, -0.3]], [6.5, 'sparkle', [0, 0]], [8.5, 'happy', [1, 0.3]]],
  heroTears: t => t > 4.5 ? 1 : 0,
  sob: t => t > 6.5 ? 3 : 2,
  lines: [{ t: 7.95, text: 'Strong people *ask* for help too.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
