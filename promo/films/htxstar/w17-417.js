// hst417 · 12 days · Taurus practices small talk on a Heights porch (with Biscuit the dog) · pop
import { ep, C, Y, G, Kp, clamp, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, porch, dog, thermo, streetSign, glasses } from './w17.js'

const L = 300, R = 780, M = 540
const set = (x, t) => { porch(x, t); dog(x, 860, G - 30, t) }
const cue = (x, s, k) => { if (k <= 0) return; x.save(); x.translate(M, 560); x.scale(k, k); x.rotate(0.03); box(x, -240, -54, 480, 108, BONE, 6); txt(x, s, 0, 2, { size: 40, col: INK }); x.restore() }

export const EP = ep(12, {
  hook: '12 days out: Taurus | practices small talk',
  hookSet: (x, t) => { set(x, t); streetSign(x, 540, 300 + 540, 'THE HEIGHTS', { pole: false }) },
  hookCast: C({ taurus: [[0, L, Y, 270], [1.4, L + 40, Y, 270]] }), hookMood: { taurus: 'happy' }, hookLook: { taurus: [0, 0] },
  calX: 820, calY: 700, calS: 0.62,
  scenes: [
    { dur: 3.4, set, cast: C({ taurus: [M - 60, Y, 300] }), mood: { taurus: 'happy' }, look: { taurus: [0, 0] },
      lines: [[0.15, 1.5, 'taurus', 'practice with | me. please.'], [1.8, 1.4, 'taurus', "I'm | rusty."]] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); cue(x, 'OPENER #1', Kp(lt, 0.05)) }, cast: C({ taurus: [L, Y, 240], gemini: [R - 120, Y, 210] }), mood: { taurus: 'squint', gemini: 'wink' },
      lines: [[0.3, 1.6, 'taurus', "so... where'd you | go to high school?"], [2.1, 1.3, 'gemini', 'a classic.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); cue(x, 'OPENER #2', Kp(lt, 0.05)); thermo(x, 820, 820, '80°', Kp(lt, 1.6)) }, cast: C({ taurus: [L, Y, 240], virgo: [R - 120, Y, 210] }), mood: { taurus: 'happy', virgo: 'squint' },
      lines: [[0.3, 1.4, 'taurus', "how 'bout | this weather?"], [1.9, 1.5, 'virgo', "it's 80. | in January."]] },
    { dur: 3.4, set, cast: C({ taurus: [L, Y, 240] }), mood: { taurus: 'sparkle' }, look: { taurus: [0, 0] },
      lines: [[0.2, 1.4, 'taurus', 'this is | Biscuit.'], [1.8, 1.4, 'taurus', "he's my | opener."]] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); cue(x, 'COACH LIBRA', Kp(lt, 0.05)) }, front: (x, t, lt, P) => glasses(x, P, 'libra', PINK), cast: C({ libra: [L, Y, 240], taurus: [R - 120, Y, 220] }), mood: { libra: 'wink', taurus: 'wide' },
      lines: [[0.3, 1.5, 'libra', 'ask what | they love.'], [2.0, 1.4, 'taurus', 'oh. | ...oh!']] },
    { dur: 3.4, set, cast: C({ taurus: [M - 60, Y, 300] }), mood: { taurus: 'heart' }, look: { taurus: [0, 0] },
      lines: [[0.2, 2.8, 'taurus', 'so. what are YOU | excited about?']] },
    { dur: 3.6, set, cast: C({ taurus: [M - 60, Y, 300] }), mood: { taurus: 'happy' }, look: { taurus: [0, 0] },
      lines: [[0.15, 1.6, 'taurus', 'people love | being asked'], [1.9, 1.6, 'taurus', 'about the things | they love.']] },
  ],
  stamp: { set, cast: C({ taurus: [L, Y, 240], libra: [R - 100, Y, 210] }), mood: { taurus: 'sparkle', libra: 'heart' }, look: { taurus: [0, 0] },
    lines: [[1.2, 2.2, 'taurus', 'comment what | YOU love.']] },
  line: 'Ask a good question. Jan 9.', stars: ['taurus', 'libra', 'gemini', 'virgo'],
})
