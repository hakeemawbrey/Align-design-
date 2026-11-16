// og-ksbe03: the social rework of ksbe03 (same room, cast and story). Static HOOK (box, 0–2.4) instead of the slam title;
//   kit: ./sbkit.js + ./sbshort.js (og social copies: no series bug, calm freeze card, no whip/shake, hard cut, text in the
//   safe zone); crazier Gemini (rolls their eyes in two directions; both of them come back) and Sag (half-booked a flight to Peru).
// Original notes (ksbe03): "Whatever." (♊ Gemini to ♐ Sagittarius). chiptune · G. Hard cut.
//   frame 0: Gemini mid-eye-roll, the WHATEVER bubble mid-slam like a thrown frisbee, Sag knocked spinning.
//   freeze on the eye-roll → "so… we're *done* talking?" → THE STARS → the better line → a loading bar "cooling down…"
//   → Gemini: "ok. I'm *back.*"  Pisces sobs "that was so *mature*".
import { makeShort } from './sbshort.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'
const LOAD = { at: 13.6, len: 2.1, label: 'cooling down…', stallAt: 100, error: null, y: 1410 }
export const { DURATION, SCENES, CUES } = makeShort({
  room: 'bedroom',
  A: { sign: 'gemini', red: 0.35, mood0: 'eyeroll' }, B: { sign: 'sagittarius' }, P: { x: 860, y: 760, s: 120, look: [-1, 1] },
  caption: 'Gemini rolled their eyes in *two directions.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: '*Whatever.*', flyDir: -1 }, react: 'cool. should I book a flight to *Peru?*',
  stars: ['whatever usually means *I’m overwhelmed*.', 'so say *that*.'],
  better: 'I’m frustrated and I don’t want to say something *mean*. Give me a sec?',
  replies: ['take your time. I’ll be *right here.* (not Peru)', null],
  talk: [{ who: 'A', kind: 'say', at: 15.9, out: 17.5, text: 'ok. both of me are *back.*', cx: 380, cy: 880 },
    { who: 'P', kind: 'say', at: 16.4, out: 17.5, text: 'that was so *mature* (sobbing)', cx: 760, cy: 560 }],
  keys: { A: [[13.6, { mood: 'sleepy' }], [15.8, { mood: 'happy' }]], P: [[16.3, { tears: 3, mood: 'wide' }]] },
  last: 'Name the feeling, | *not* the exit.',
  kit: [[loadingBar, loadingBarCues, LOAD]],
})

// social hook: static caption from frame 0 (the film's own slam title is dropped by the social kit copy)
export const HOOK = '“Whatever” | ends *nothing.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4
