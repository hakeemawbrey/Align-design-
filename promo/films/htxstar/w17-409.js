// hst409 · 20 days · Pisces is already crying (the bayou bat bridge at sunset) · dreamy
import { ep, C, Y, Kp, clamp, box, txt, sparkles, heart, GOLD, BONE, PINK, INK, MONO, SKYB, LAV, batBridge, bayou, glasses, tissues, skyline, outside, skyFill } from './w17.js'

const L = 300, R = 780, M = 540
const bridge = (x, t, lt) => batBridge(x, t, lt + 2)
const glow = (x, t) => { skyFill(x, '#1a1040', '#ff7a6a', 0, 1390); skyline(x, 1390, t, { alpha: 0.95, col: '#2a1d48' }); outside(x, { ground: '#2a2040' }); x.fillStyle = 'rgba(255,150,120,0.18)'; x.fillRect(0, 300, 1080, 500) }

export const EP = ep(20, {
  hook: '20 days left | and Pisces is | already crying.',
  hookSet: (x, t, lt) => batBridge(x, t, lt + 1.5),
  hookCast: C({ pisces: [[0, M, Y, 280], [2.6, M, Y, 280]] }), hookMood: { pisces: 'heart' }, hookLook: { pisces: [0, 0] },
  calX: 840, calY: 1050, calS: 0.55,
  cues: [['bell', 0.5, 1567.98, 0.01, 1.6, 0]],
  scenes: [
    { dur: 3.6, set: bridge, cast: C({ pisces: [M, Y, 300] }), mood: { pisces: 'heart' }, look: { pisces: [0, 0] },
      lines: [[0.15, 1.4, 'pisces', "I'm fine. | it's just..."], [1.8, 1.6, 'pisces', "we'll all be | TOGETHER."]] },
    { dur: 3.6, set: bridge, cast: C({ scorpio: [L, Y, 230], pisces: [R, Y, 240] }), mood: { scorpio: 'squint', pisces: 'heart' },
      lines: [[0.2, 1.5, 'scorpio', "it's the bats, | right?"], [1.9, 1.5, 'pisces', 'the bats are | together too!']] },
    { dur: 3.6, set: bridge, front: (x, t, lt, P) => { glasses(x, P, 'cancer'); tissues(x, 470, 1300, 0.8) }, cast: C({ cancer: [[0, -200, Y, 240], [0.6, L, Y, 240]], pisces: [R, Y, 240] }), mood: { cancer: 'happy', pisces: 'heart' },
      lines: [[0.7, 1.4, 'cancer', 'here, baby. | tissues.'], [2.3, 1.2, 'pisces', 'thank you, | Auntie.']] },
    { dur: 3.4, set: bridge, cast: C({ libra: [L, Y, 230], pisces: [R, Y, 240] }), mood: { libra: 'wide', pisces: 'wink' },
      lines: [[0.2, 1.4, 'libra', "you can't cry | for 20 days."], [1.8, 1.4, 'pisces', 'watch me.']] },
    { dur: 3.8, set: glow, cast: C({ pisces: [M, Y, 280] }), mood: { pisces: 'neutral' }, look: { pisces: [0, -1] },
      lines: [[0.2, 1.7, 'pisces', 'the city glow means | no stars up there.'], [2.0, 1.6, 'pisces', "so WE'RE | the stars."]], stick: [[0.1, 1.6, '✓ REAL: CITY GLOW', '#7dffb0']] },
    { dur: 3.4, set: glow, cast: C({ aquarius: [L, Y, 230], pisces: [R, Y, 240] }), mood: { aquarius: 'wide', pisces: 'heart' },
      lines: [[0.2, 1.4, 'aquarius', 'that was | kind of deep.'], [1.8, 1.4, 'pisces', '*cries | harder*']] },
    { dur: 3.6, set: bridge, cast: C({ pisces: [M, Y, 300] }), mood: { pisces: 'happy' }, look: { pisces: [0, 0] },
      lines: [[0.15, 1.6, 'pisces', 'if you miss | someone,'], [1.9, 1.6, 'pisces', 'tell them. | today.']] },
  ],
  stamp: { set: bridge, front: (x, t, lt) => { if (lt > 0.6) for (let k = 0; k < 3; k++) heart(x, 300 + k * 240, 1020 - ((lt * 60 + k * 40) % 120), 7) }, cast: C({ pisces: [L, Y, 240], cancer: [R, Y, 220] }), mood: { pisces: 'heart', cancer: 'heart' }, look: { pisces: [0, 0] },
    lines: [[1.2, 2.2, 'pisces', 'happy tears | count, okay?']] },
  line: 'Bring tissues. Jan 9.', stars: ['pisces', 'cancer', 'scorpio', 'aquarius'],
})
