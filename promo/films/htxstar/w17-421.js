// hst421 · 8 days · Capricorn rehearses "hello" in a paddle boat (Hermann Park pond) with Pisces as coach · dreamy
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, pond, paddleBoat, duck, streetSign } from './w17.js'

const L = 300, R = 780, M = 540
const BY = 1150, CY = BY - 90
const set = (x, t) => pond(x, t)
const boat = (spin = 0) => (x, t, lt) => { set(x, t); duck(x, 900, 1300, t); paddleBoat(x, M, BY, t, '#ff8f3c', typeof spin === 'function' ? spin(lt) : spin) }
const pair = (cs = 210, ps = 200) => C({ capricorn: [M - 110, CY, cs], pisces: [M + 110, CY, ps] })
const score = (x, s, k, col = GOLD) => { if (k <= 0) return; x.save(); x.translate(M, 560); x.scale(k, k); x.rotate(-0.04); box(x, -180, -60, 360, 120, '#1c1240', 6); txt(x, s, 0, 2, { size: 54, col }); x.restore() }

export const EP = ep(8, {
  hook: 'One week and a day. | Capricorn rehearsed hello.',
  hookSet: (x, t) => { boat(0)(x, t, 0); streetSign(x, 300, 840, 'HERMANN PARK', { pole: false }) },
  hookCast: pair(), hookMood: { capricorn: 'squint', pisces: 'heart' }, hookLook: { capricorn: [0, 0] },
  calX: 820, calY: 760, calS: 0.6,
  scenes: [
    { dur: 3.4, set: boat(0), cast: C({ capricorn: [M - 110, CY, 260], pisces: [M + 130, CY, 190] }), mood: { capricorn: 'squint', pisces: 'happy' }, look: { capricorn: [0, 0] },
      lines: [[0.15, 1.5, 'capricorn', 'rate my | intro.'], [1.8, 1.4, 'capricorn', 'ready?']] },
    { dur: 3.6, set: (x, t, lt) => { boat(0)(x, t, lt); score(x, '3 / 10', Kp(lt, 1.8), BRAKE) }, cast: pair(), mood: { capricorn: 'neutral', pisces: 'squint' },
      lines: [[0.2, 1.5, 'capricorn', 'Hello. I am | a Capricorn.'], [2.0, 1.4, 'pisces', 'warmer!']] },
    { dur: 3.6, set: (x, t, lt) => { boat(0)(x, t, lt); score(x, '5 / 10', Kp(lt, 1.8), GOLD) }, cast: pair(), mood: { capricorn: 'sparkle', pisces: 'wink' },
      lines: [[0.2, 1.5, 'capricorn', 'Hello! | I have goals.'], [2.0, 1.4, 'pisces', 'warmer...']] },
    { dur: 3.4, set: boat(lt => lt * 3.7), cast: C({ capricorn: [[0, 430, CY, 210], [0.85, 650, CY, 210], [1.7, 430, CY, 210], [2.55, 650, CY, 210], [3.4, 430, CY, 210]], pisces: [[0, 650, CY, 200], [0.85, 430, CY, 200], [1.7, 650, CY, 200], [2.55, 430, CY, 200], [3.4, 650, CY, 200]] }), mood: { capricorn: 'wide', pisces: 'heart' },
      lines: [[0.6, 2.4, [M, CY, 200], 'we are going | in circles.']] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); paddleBoat(x, 360, BY, t); duck(x, 820, 1180, t) }, cast: C({ capricorn: [250, CY, 210] }), mood: { capricorn: 'eyeroll' },
      lines: [[0.3, 1.2, [820, 1160, 120], 'HONK.'], [1.7, 1.5, 'capricorn', 'even the duck | is judging.']] },
    { dur: 3.8, set: (x, t, lt) => { boat(0)(x, t, lt); score(x, '10 / 10', Kp(lt, 2.4), MINT); if (lt > 2.4) sparkles(x, t, M, 560, t - lt + 2.4, 10, 200, 5) }, cast: pair(), mood: { capricorn: lt => lt > 1.6 ? 'happy' : 'neutral', pisces: 'heart' },
      lines: [[0.2, 1.3, 'pisces', 'just say: | "hey."'], [1.6, 1.0, 'capricorn', "hey. | I'm Cap."], [2.7, 1.0, 'pisces', 'PERFECT.']] },
    { dur: 3.6, set: boat(0), cast: C({ capricorn: [M - 110, CY, 260], pisces: [M + 130, CY, 190] }), mood: { capricorn: 'happy', pisces: 'heart' }, look: { capricorn: [0, 0] },
      lines: [[0.15, 1.6, 'capricorn', "you don't | need a pitch."], [1.9, 1.6, 'capricorn', 'just | say hey.']] },
  ],
  stamp: { set: boat(0), cast: pair(), mood: { capricorn: 'sparkle', pisces: 'heart' }, look: { capricorn: [0, 0] },
    lines: [[1.2, 2.2, 'capricorn', 'hey. see you | in 8 days.']] },
  line: 'Just say hey. Jan 9.', stars: ['capricorn', 'pisces', 'libra', 'taurus'],
})
