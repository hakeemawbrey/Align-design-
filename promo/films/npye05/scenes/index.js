// npye05: YOUR SIGN AT THE HOLIDAY PARTY, "Leo at the holiday party" (14 s vertical trial reel, music: funk · Am).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Leo* at the | holiday party:" — Leo mid-hop onto a little stage at frame 0, mic in hand.
//   2.4–5.2   1 "gives a speech *nobody scheduled.*" Spotlight. "I’d like to thank… me!" The front row eye-rolls,
//             lovingly.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "then hands the mic to the *shy* friend." Capricorn, in the light: "um… hi, everyone?" Leo leads
//             the cheering. Confetti.
//   8.0–11.6  THE STARS: "Share the spotlight. It gets *warmer.*" Both on the stage.
import { makeEp, R, box, bubble, shadow, spotlight, sparkles, confetti, mic, hatCells, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT } from '../../npye01/scenes/kit.js'

function stage(x) {
  box(x, 280, 1080, 520, 50, '#6b3d6b', { b: 7, hi: '#8a528a' })
  for (let i = 0; i < 6; i++) R(x, GOLD, 300 + i * 92, 1096, 30, 10)
}
function crowd(x, t, S, u, moods) {
  ['virgo', 'aries', 'taurus'].forEach((id, i) => { const g = { x: 260 + i * 280, y: 1215, s: 110, mood: moods[i], look: [0, -1], seed: 20 + i, hops: u > 1.5 ? [S.t0 + 1.6 + i * 0.1, S.t0 + 2.1 + i * 0.1] : [] }; S.guest(x, t, id, g); S.dress(x, t, g, () => hatCells(x, [MINT, GOLD, PINK][i], BONE, 0.1)) })
}

const EP = makeEp({
  id: 'npye05', series: 'party', sign: 'leo', name: 'Leo',
  hook(x, t, S) {
    const { hero, heroHat } = S
    stage(x)
    spotlight(x, 540, 380, 540, 1090, 440, Math.min(1, 0.3 + t))
    const o = { x: 540, y: 920, s: 280, mood: 'sparkle', look: [0, 0], hops: [-0.2, 0.9] }
    hero(x, t, o); heroHat(x, t, o)
    mic(x, 700, 880, 0.4)
    sparkles(x, t, 540, 860, 0.9, 10, 220, 1, [GOLD, BONE, '#f39a3a'])
    bubble(x, t, 540, 620, 1.0, 2.35, 'is this thing on?', { size: 38 })
  },
  hookCues: [['tom', 0.08, 100, { gain: 0.14, decay: 0.2 }], ['pop', 0.9, 1318.51, 0.04, 0], ['tick', 1.0, 0.05]],
  beats: [
    { caption: 'gives a speech *nobody scheduled.*',
      draw(x, t, S) {
        const { u, hero, heroHat } = S
        stage(x); spotlight(x, 540, 380, 540, 1090, 440, 1)
        const o = { x: 540, y: 920, s: 270, mood: u < 1.0 ? 'happy' : 'sparkle', look: [0, 0], hops: [0.2, 1.0, 1.4, 1.8].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        mic(x, 700, 880, 0.4)
        bubble(x, t, 540, 610, S.t0 + 0.4, S.t1, 'I’d like to thank… me!', { size: 38 })
        crowd(x, t, S, 0, ['eyeroll', 'happy', u > 1.2 ? 'eyeroll' : 'neutral'])
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['pop', 0.4, 880, 0.035, 0], ['tick', 1.0, 0.04]] },
    { caption: 'then hands the mic to the *shy* friend.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        stage(x)
        const sw = ease.inOutCubic(prog(u, 0.3, 0.9))
        spotlight(x, lerp(540, 640, sw), 380, lerp(440, 640, sw), 1090, 340, 1)
        const o = { x: 400, y: 940, s: 230, mood: 'happy', look: [1, 0], hops: [0.3, 1.5, 1.8, 2.1, 2.4].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        const g = { x: 650, y: 960, s: 190, mood: u < 1.4 ? 'wide' : 'happy', look: u < 1.4 ? [-1, 0] : [0, 0], hops: [S.t0 + 1.5], seed: 30, blush: 1 }
        guest(x, t, 'capricorn', g); dress(x, t, g, () => hatCells(x, GOLD, BONE, -0.1))
        mic(x, lerp(560, 760, sw), lerp(900, 900, sw), lerp(0.4, -0.3, sw))
        bubble(x, t, 680, 690, S.t0 + 0.9, S.t1, 'um… hi, everyone?', { size: 34, col: '#dff8ef' })
        crowd(x, t, S, u, ['happy', 'happy', 'happy'])
        confetti(x, t, S.t0 + 1.5, 540, 700)
      },
      cues: [['whoosh', 0.3, 0.5, 0.025], ['pop', 0.9, 739.99, 0.03, 0.3], ['clap', 1.5, { gain: 0.12, pan: -0.3 }], ['clap', 1.8, { gain: 0.12, pan: 0.3 }], ['clap', 2.1, { gain: 0.13 }], ['glitter', 1.5, 2.1]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    stage(x)
    spotlight(x, 540, 380, 540, 1090, 520, ok)
    const o = { x: 430, y: 900, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'capricorn', { x: 680, y: 940, s: 190, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.9], seed: 30 })
  },
  last: 'Share the spotlight. It gets *warmer.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
