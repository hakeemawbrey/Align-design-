// npye07: YOUR SIGN AT THE HOLIDAY PARTY, "Libra at the holiday party" (14 s vertical trial reel, music: jazzy · Db).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Libra* at the | holiday party:" — Libra mid-twirl at the mirror, a sweater in each hand.
//   2.4–5.2   1 "changes *outfits* before leaving. four times." Scarf + hat swap four times (1/4 … 4/4):
//             "the first one. obviously."
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "introduces two people who'd *get along.*" Libra nudges Scorpio and Aquarius together:
//             "you BOTH love terrible puns!" They laugh.
//   8.0–11.6  THE STARS: "Make the introduction, then *step back.*" Libra steps aside; the two keep talking.
import { makeEp, R, box, bubble, shadow, sparkles, hearts, hatCells, scarfCells, drawBits, label, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT, RED } from '../../npye01/scenes/kit.js'

const SW = ['.SS...SS.', 'SSSSSSSSS', 'SSSSSSSSS', '.SSWSWSS.', '.SSSSSSS.', '.SSSSSSS.']
function mirror(x, cx, cy) {
  box(x, cx - 110, cy - 220, 220, 420, '#c9a06a', { b: 7 }); R(x, '#a9c6e8', cx - 94, cy - 204, 188, 388)
  R(x, 'rgba(255,255,255,0.35)', cx - 70, cy - 190, 24, 300); R(x, INK, cx - 60, cy + 200, 14, 60); R(x, INK, cx + 46, cy + 200, 14, 60)
}
const OUT = [[PINK, GOLD], [MINT, BONE], ['#7fd0ff', PINK], [RED, BONE]]

const EP = makeEp({
  id: 'npye07', series: 'party', sign: 'libra', name: 'Libra', room: { wreathOn: false },
  hook(x, t, S) {
    const { hero, dress } = S
    mirror(x, 800, 900)
    shadow(x, 460, 1125, 240)
    const spin = Math.cos(t * 9) * 0.25
    const o = { x: 460, y: 950, s: 270, mood: 'sparkle', look: [1, 0], hops: [-0.2, 0.8, 1.6], squash: 0.06 * Math.sin(t * 9) }
    hero(x, t, o); dress(x, t, o, () => hatCells(x, PINK, GOLD, spin))
    drawBits(x, SW, { S: '#3fa862', W: BONE }, 270, 880 + Math.sin(t * 5) * 10, 14, { rot: -0.3 })
    drawBits(x, SW, { S: '#e8344e', W: BONE }, 650, 880 - Math.sin(t * 5) * 10, 14, { rot: 0.3 })
    bubble(x, t, 470, 650, 1.0, 2.35, 'green? red? GREEN?', { size: 36 })
  },
  hookCues: [['whoosh', 0.1, 0.3, 0.02], ['pop', 1.0, 987.77, 0.035, 0]],
  beats: [
    { caption: 'changes *outfits* before leaving. four times.',
      draw(x, t, S) {
        const { u, hero, dress } = S
        mirror(x, 800, 900)
        const k = Math.min(3, Math.floor(u / 0.55)), [c1, c2] = OUT[k]
        shadow(x, 460, 1110, 230)
        const o = { x: 460, y: 950, s: 260, mood: k < 3 ? 'neutral' : 'sparkle', look: [1, 0], hops: [0, 0.55, 1.1, 1.65].map(h => S.t0 + h) }
        hero(x, t, o); dress(x, t, o, () => { hatCells(x, c1, c2, 0.1); scarfCells(x, c1, c2) })
        sparkles(x, t, 460, 950, S.t0 + k * 0.55, 8, 160, k, [c1, c2, BONE])
        label(x, `${k + 1}/4`, 800, 640, { size: 52, col: GOLD })
        bubble(x, t, 460, 620, S.t0 + 1.8, S.t1, 'the first one. obviously.', { size: 34 })
      },
      cues: [['whoosh', 0.0, 0.2, 0.02], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.55, 0.2, 0.02], ['pop', 0.57, 987.77, 0.03, 0], ['whoosh', 1.1, 0.2, 0.02], ['pop', 1.12, 1108.73, 0.03, 0], ['whoosh', 1.65, 0.2, 0.02], ['pop', 1.67, 1318.51, 0.035, 0], ['pop', 1.8, 880, 0.03, 0]] },
    { caption: 'introduces two people who’d *get along.*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        const meet = ease.inOutCubic(prog(u, 0.4, 1.1))
        shadow(x, 540, 1110, 200)
        const o = { x: 540, y: lerp(960, 900, meet), s: 220, mood: 'happy', look: [Math.sin(u * 4) > 0 ? 1 : -1, 0], hops: [S.t0 + 0.4, S.t0 + 1.1] }
        hero(x, t, o); heroHat(x, t, o)
        guest(x, t, 'scorpio', { x: lerp(200, 380, meet), y: 1000, s: 160, mood: u > 1.5 ? 'happy' : 'neutral', look: [1, 0], hops: u > 1.5 ? [S.t0 + 1.5, S.t0 + 1.9] : [], seed: 50 })
        guest(x, t, 'aquarius', { x: lerp(880, 700, meet), y: 1000, s: 160, mood: u > 1.5 ? 'happy' : 'neutral', look: [-1, 0], hops: u > 1.5 ? [S.t0 + 1.55, S.t0 + 1.95] : [], seed: 51 })
        bubble(x, t, 540, 640, S.t0 + 0.6, S.t1, 'you BOTH love terrible puns!', { size: 32 })
        hearts(x, t, S.t0 + 1.6, 540, 820, { n: 4, cols: [GOLD, PINK, BONE] })
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['whoosh', 0.4, 0.5, 0.02], ['pop', 0.6, 987.77, 0.035, 0], ['pluck', 1.5, 1174.66, 0.04, 0.5, -0.3], ['pluck', 1.55, 1479.98, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    const st = ease.inOutCubic(prog(t, 8.4, 9.2))
    shadow(x, lerp(540, 300, st), 1110, 200 * ok)
    const o = { x: lerp(540, 300, st), y: 930, s: 220, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'scorpio', { x: 560, y: 960, s: 160, pop: ok, mood: 'happy', look: [1, 0], hops: [8.8, 9.6, 10.4], seed: 50 })
    guest(x, t, 'aquarius', { x: 760, y: 960, s: 160, pop: ok, mood: 'happy', look: [-1, 0], hops: [9.0, 9.8, 10.6], seed: 51 })
    bubble(x, t, 660, 760, 9.0, 11.0, 'HA! okay, one more.', { size: 28, col: '#dff6ff' })
  },
  last: 'Make the introduction, then *step back.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
