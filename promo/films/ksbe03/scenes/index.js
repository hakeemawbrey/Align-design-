// ksbe03: SAY IT BETTER ep 3, "Whatever." (♊ Gemini to ♐ Sagittarius). chiptune · G. Hard cut.
//   frame 0: Gemini mid-eye-roll, the WHATEVER bubble mid-slam like a thrown frisbee, Sag knocked spinning.
//   freeze on the eye-roll → "so… we're *done* talking?" → THE STARS → the better line → a loading bar "cooling down…"
//   → Gemini: "ok. I'm *back.*"  Pisces sobs "that was so *mature*".
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'
const LOAD = { at: 13.6, len: 2.1, label: 'cooling down…', stallAt: 100, error: null, y: 1520 }
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 3, room: 'bedroom',
  A: { sign: 'gemini', red: 0.35, mood0: 'eyeroll' }, B: { sign: 'sagittarius' }, P: { x: 935, y: 760, s: 120, look: [-1, 1] },
  hook: '“Whatever” ends *nothing.*', caption: 'the eye-roll: *noted.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: '*Whatever.*', flyDir: -1 }, react: 'so… we’re *done* talking?',
  stars: ['whatever usually means *I’m overwhelmed*.', 'so say *that*.'],
  better: 'I’m frustrated and I don’t want to say something *mean*. Give me a sec?',
  replies: ['take your *time.*', null],
  talk: [{ who: 'A', kind: 'say', at: 15.9, out: 17.5, text: 'ok. I’m *back.*', cx: 380, cy: 880 },
    { who: 'P', kind: 'say', at: 16.4, out: 17.5, text: 'that was so *mature*', cx: 760, cy: 560 }],
  keys: { A: [[13.6, { mood: 'sleepy' }], [15.8, { mood: 'happy' }]], P: [[16.3, { tears: 3, mood: 'wide' }]] },
  last: 'Name the feeling, | *not* the exit.',
  kit: [[loadingBar, loadingBarCues, LOAD]],
})
