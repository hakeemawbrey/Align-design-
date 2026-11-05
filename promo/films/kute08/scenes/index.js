// kute08: THE UNSENT TEXT, "Scorpio typed “k.”" (10 s vertical trial reel, music: screwed · Fm).
// The series look lives in ../../kute01/unsentkit.js (shared, read-only). Rows: promo/films/month2/m36.md.
//   0.00 frame 0: Scorpio's eyes narrowed over the phone, "k." mid-delete · 0.30 glitch
//   1.30 "do whatever you want" ✗ · 3.40 "that hurt my feelings. can we talk?" (Pisces sobs) · 6.10 THE STARS · loop
import { makeUnsent } from '../../kute01/unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../../kute01/unsentkit.js'
import { glitch, glitchCues } from '../../hookkit.js'

const EP = makeUnsent({
  id: 'kute08', duration: 10,
  sign: 'scorpio', name: 'Scorpio', to: 'Remy', status: 'online', avatar: '#c9a6ff',
  hook: 'Scorpio typed *“k.”* | Then deleted it.', ending: 'loop', draftBase: 1,
  msgs: [{ text: 'can’t make it tonight, sorry', at: -9, stamp: 'today 8:02 pm' }],
  drafts: [
    { text: 'k.', at: -0.9, cps: 5, del: -0.12, delCps: 6 },
    { text: 'do whatever you want', at: 1.3, cps: 14, del: 3.0, delCps: 32 },
    { text: 'that hurt my feelings. can we talk?', at: 3.4, cps: 16 },
  ],
  effects: [{ fx: glitch, cues: glitchCues, o: { at: 0.3, len: 0.6, dialog: false, amp: 0.8 } }],
  moods: [[-9, 'squint', [1, -0.4]], [1.3, 'squint', [1, -0.3]], [3.0, 'wide', [0, 0]], [3.4, 'neutral', [1, -0.3]], [6.7, 'happy', [1, 0.3]]],
  lines: [{ t: 6.1, text: 'Say *hurt.* Not “k.”' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
