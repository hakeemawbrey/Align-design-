// ksbe10: SAY IT BETTER ep 10, "I'm not mad." (♑ Capricorn to ♍ Virgo). synthwave · Bm. Hard cut.
//   frame 0: Capricorn mid-smile, steam jetting from the top point, a thermometer maxed out, "I'M NOT MAD :)" slamming.
//   freeze on the steam → Virgo: "…you're *literally* steaming." → THE STARS → "I'm hurt you didn't ask me first. Can we
//   decide *together* next time?" → the steam stops, the thermometer cools.  Pisces at the window cries.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, INK, BONE, RED } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'
const COOL = 12.6
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 10, room: 'living',
  A: { sign: 'capricorn', red: 0.5, steam: 1.6, mood0: 'happy' }, B: { sign: 'virgo' }, P: { x: 820, y: 640, s: 130 },
  hook: '“I’m not mad.” | (*steaming*)', caption: 'the steam *says otherwise.*',
  caught: { x: 264, y: 900, r: 190 },
  bad: { text: 'I’m not *mad* :)' }, react: '…you’re *literally* steaming.',
  stars: ['pretending costs more than *saying*.', 'name the *hurt*, then the ask.'],
  better: 'I’m hurt you didn’t ask me first. Can we decide *together* next time?',
  replies: ['yes. I should’ve *asked.*', 'next time: *together.*'],
  last: 'Say it *while* | it’s small.',
  keys: { A: [[2.4, { steam: 1.8, red: 0.6 }], [4.4, { steam: 0.5, red: 0.15, mood: 'neutral' }], [COOL, { steam: 0, red: 0, d: 0.8 }]] },
  draw(x, w) {
    // the thermometer on the wall
    const lvl = w < 4.4 ? 1 : w < COOL ? 0.75 : lerp(0.75, 0.3, ease.inOutCubic(prog(w, COOL, COOL + 1)))
    const X = 470, Y = 520, H = 300
    rect(x, X - 22, Y - 10, 44, H + 20, INK); rect(x, X - 14, Y, 28, H, BONE)
    rect(x, X - 8, Y + H * (1 - lvl), 16, H * lvl, lvl > 0.7 ? RED : '#7fd0f0')
    x.fillStyle = INK; x.beginPath(); x.arc(X, Y + H + 24, 38, 0, Math.PI * 2); x.fill(); x.fillStyle = lvl > 0.7 ? RED : '#7fd0f0'; x.beginPath(); x.arc(X, Y + H + 24, 28, 0, Math.PI * 2); x.fill()
    if (lvl > 0.95 && w < 2.4) { x.globalAlpha = 0.5 + 0.5 * Math.sin(w * 20); rect(x, X - 8, Y - 30, 16, 20, RED); x.globalAlpha = 1 }
  },
  cues: [['whoosh', 0.1, 0.6, 0.04], ['riser', COOL - 0.2, COOL + 0.8, 0.02]],
})
