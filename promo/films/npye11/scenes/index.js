// npye11: YOUR SIGN AT THE HOLIDAY PARTY, "Aquarius at the holiday party" (16 s vertical trial reel, music: chiptune · E).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Aquarius* at the | holiday party:" — Aquarius mid-hop next to the host's dog; both in party hats.
//   2.4–5.2   1 "talks to the *host's dog* for an hour." Side by side on the floor: "he gets me." The tail wags.
//   5.2       card cut.
//   5.2–8.0   2 "starts a *paper snowflake* table." Flakes pop onto the table, every one a different pattern.
//             A guest: "mine came out weird!" Aquarius: "PERFECT."
//   8.0–11.6  THE STARS: "Your weird is someone's *favourite* thing."
import { makeEp, R, box, bubble, shadow, sparkles, hatCells, drawBits, prog, ease, INK, BONE, GOLD, PINK, MINT } from '../../npye01/scenes/kit.js'

const DOG = ['.KK............', 'KBBK...........', 'BBBBB..........', 'BEBBBBBBBBBBB..', 'BBBBBBBBBBBBBTT', '.NBBBBBBBBBBB..', '..BBBBBBBBBBB..', '..B.B.....B.B..', '..B.B.....B.B..']
const DOG2 = DOG.map((r, j) => j === 3 ? 'BEBBBBBBBBBBB.T' : j === 4 ? 'BBBBBBBBBBBBBT.' : r)
function dog(x, t, cx, cy, wag = true) {
  const bm = wag && Math.floor(t * 8) % 2 ? DOG2 : DOG
  drawBits(x, bm, { K: '#8a5a34', B: '#d9a35a', E: INK, N: INK, T: '#d9a35a' }, cx, cy + Math.abs(Math.sin(t * 4)) * -4, 13)
  drawBits(x, ['..B..', '.PPP.', '.GGG.', 'PPPPP'], { B: BONE, P: '#38c4ec', G: GOLD }, cx - 74, cy - 92, 8, { rot: -0.2 })
}
const FLAKES = [
  ['..W..', 'W.W.W', '.WWW.', 'W.W.W', '..W..'],
  ['W...W', '.W.W.', '..W..', '.W.W.', 'W...W'],
  ['.W.W.', 'WWWWW', '.W.W.', 'WWWWW', '.W.W.'],
  ['..W..', '.WWW.', 'WW.WW', '.WWW.', '..W..'],
  ['W.W.W', '.....', 'W.W.W', '.....', 'W.W.W'],
  ['.WWW.', 'W...W', 'W.W.W', 'W...W', '.WWW.'],
]

const EP = makeEp({
  id: 'npye11', series: 'party', sign: 'aquarius', name: 'Aquarius',
  hook(x, t, S) {
    const { hero, heroHat } = S
    shadow(x, 380, 1125, 230); shadow(x, 700, 1125, 200)
    const o = { x: 380, y: 950, s: 260, mood: 'happy', look: [1, 0.3], hops: [-0.2, 0.6, 1.4] }
    hero(x, t, o); heroHat(x, t, o)
    dog(x, t, 710, 1060)
    bubble(x, t, 700, 880, 0.8, 2.35, 'woof!', { size: 36, col: '#fff3d6' })
    bubble(x, t, 380, 650, 1.3, 2.35, 'finally, a real one.', { size: 34 })
  },
  hookCues: [['pop', 0.8, 1318.51, 0.035, 0.3], ['pop', 1.3, 880, 0.03, 0]],
  beats: [
    { caption: 'talks to the *host’s dog* for an hour.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        guest(x, t, 'leo', { x: 880, y: 960, s: 130, mood: 'neutral', look: [-1, 0.5], seed: 90 })
        bubble(x, t, 880, 780, S.t0 + 1.6, S.t1, '…it’s been an hour.', { size: 26, col: '#ffe8cc' })
        shadow(x, 360, 1120, 220); shadow(x, 620, 1120, 200)
        const o = { x: 360, y: 980, s: 230, mood: u > 0.8 ? 'sparkle' : 'happy', look: [1, 0.5], hops: [S.t0 + 0.8], squash: 0.08 }
        hero(x, t, o); heroHat(x, t, o)
        dog(x, t, 620, 1070)
        bubble(x, t, 380, 700, S.t0 + 0.6, S.t1, 'he gets me.', { size: 40 })
      },
      cues: [['pop', 0.6, 987.77, 0.035, 0], ['pop', 1.6, 739.99, 0.03, 0.4]] },
    { caption: 'starts a *paper snowflake* table.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        box(x, 160, 1020, 760, 30, '#7a5a44', { b: 6 }); R(x, INK, 190, 1050, 14, 100); R(x, INK, 876, 1050, 14, 100)
        FLAKES.forEach((f, i) => { const k = ease.outCubic(prog(u, 0.2 + i * 0.22, 0.4 + i * 0.22)); if (k > 0) drawBits(x, f, { W: ['#ffffff', '#dff1ff', '#fff3d6'][i % 3] }, 230 + i * 125, 990 - 40 * k, 10 * k, { rot: Math.sin(t + i) * 0.2 }) })
        guest(x, t, 'virgo', { x: 820, y: 860, s: 140, mood: 'happy', look: [-1, 0.5], seed: 91, hops: [S.t0 + 1.5] })
        guest(x, t, 'taurus', { x: 660, y: 860, s: 130, mood: 'happy', look: [0, 1], seed: 92, hops: [S.t0 + 1.0] })
        const o = { x: 330, y: 860, s: 220, mood: u > 1.9 ? 'sparkle' : 'happy', look: [1, 0.5], hops: [S.t0 + 0.3, S.t0 + 1.9] }
        hero(x, t, o); heroHat(x, t, o)
        bubble(x, t, 760, 680, S.t0 + 1.4, S.t1, 'mine came out weird!', { size: 30, col: '#ffe1ea' })
        bubble(x, t, 340, 640, S.t0 + 1.9, S.t1, 'PERFECT.', { size: 40 })
        sparkles(x, t, 540, 960, S.t0 + 1.9, 10, 300, 1, ['#ffffff', '#38c4ec', GOLD])
      },
      pis: { x: 960, y: 1180, s: 120 },
      cues: [['pop', 0.3, 880, 0.02, -0.4], ['pop', 0.52, 987.77, 0.02, -0.2], ['pop', 0.74, 1108.73, 0.02, 0], ['pop', 0.96, 1174.66, 0.02, 0.1], ['pop', 1.18, 1318.51, 0.02, 0.2], ['pop', 1.4, 1479.98, 0.03, 0.4], ['pop', 1.9, 1760, 0.04, 0], ['glitter', 1.9, 2.4]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, ok, HOPS } = S
    shadow(x, 430, 1110, 230 * ok); shadow(x, 700, 1120, 200 * ok)
    const o = { x: 430, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0.3], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    if (ok > 0.2) { x.save(); x.translate(700, 1060); x.scale(ok, ok); dog(x, t, 0, 0); x.restore() }
    drawBits(x, FLAKES[1], { W: '#ffffff' }, 560, 700 + Math.sin(t * 2) * 10, 10 * ok, { rot: t * 0.5 })
  },
  last: 'Your weird is someone’s *favourite* thing.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [hatCells, PINK, MINT]
