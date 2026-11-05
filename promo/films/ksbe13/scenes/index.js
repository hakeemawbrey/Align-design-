// ksbe13: SAY IT BETTER ep 13, "Here we go again" (♌ Leo to ♈ Aries, who's holding a talk card). chiptune · A. Loops.
//   frame 0: Leo mid-eye-roll on the couch, "HERE WE GO AGAIN." slamming, Aries mid-sentence with a talk card.
//   freeze → Aries: "never *mind* then." (the card droops) → THE STARS → "Okay. I'm *listening*. What's going on?" →
//   the talk card comes back up: "What's been on your mind this week?" → Aries opens up.  Pisces cries behind the couch.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { drawTalkCard } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 13, room: 'living', end: 'loop',
  A: { sign: 'leo', red: 0.15, mood0: 'eyeroll' }, B: { sign: 'aries' }, P: { x: 985, y: 1165, s: 150, look: [-1, 0] },
  hook: 'Three words that | *shut* a door.', caption: 'the *eye-roll.*',
  caught: { x: 264, y: 1150, r: 150 },
  bad: { text: 'Here we go *again.*' }, react: 'never *mind* then.',
  stars: ['an eye-roll tells them *not to try*.', 'open the door *instead*.'],
  better: 'Okay. I’m *listening*. What’s going on?',
  replies: ['honestly? work’s been *a lot.*', 'thanks for *asking.*'],
  last: 'Every talk deserves | a *fresh* start.',
  front(x, w, K) {
    const b = K.st.B; if (!b) return
    const droop = ease.inOutCubic(prog(w, 2.4, 2.9)) * (1 - ease.inOutCubic(prog(w, 12.4, 13.0)))
    const big = ease.inOutCubic(prog(w, 12.6, 13.2)) * (1 - ease.inOutCubic(prog(w, 15.6, 16.0)))
    drawTalkCard(x, lerp(b.x + 120, 830, big), lerp(b.y - 40 + droop * 90, 760, big), lerp(110, 190, big), 'What’s been on your mind this week?', { rot: lerp(0.15 + droop * 0.9, 0.04, big) })
  },
  cues: [['whoosh', 12.6, 0.4, 0.04], ['pluck', 13.2, 1318.51, 0.04, 0.6, 0.2]],
})
