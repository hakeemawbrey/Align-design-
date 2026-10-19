// swipes (15s, LOOK B "Nebula"): "312 swipes. 0 butterflies." → look up → Tonight's deck, dealt from the stars →
// "Slow down. Look up." + lockup. Scenes stack in this order (later = above).
//   0.00–4.70  s1 the room: phone, swipe blur, SWIPES TODAY 300→312, captions, screen off, camera tilts up (3.7–4.6)
//   3.65–15.0  s0 the one sky (under everything after the room)
//   4.90–10.5  s2 a star falls → the card back → the deck → the deal · "TONIGHT'S DECK / Every night, a new deck."
//  10.45–15.0  s3 "Slow down. Look up." + lockup + fade to black
//   0.00–15.0  s9 one grain layer on top
import sky from './s0-sky.js'
import swipes, { cues as c1 } from './s1-swipes.js'
import deck, { cues as c2 } from './s2-deck.js'
import end, { cues as c3 } from './s3-end.js'
import grain from './s9-grain.js'
export const DURATION = 15
export const SCENES = [sky, swipes, deck, end, grain]
export const CUES = [...c1, ...c2, ...c3]
