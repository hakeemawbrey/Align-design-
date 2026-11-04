// ngie05: THE SIGNS AS WINTER GIFTS, "Leo as a winter gift" (14 s vertical trial reel, music: funk · Bm).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Leo* were a | winter gift:" — Leo mid-tug on the ribbon of a gold box: "drumroll, please!"
//   2.4–5.2   1 "a scarf you can see from *across the street.*" A long gold scarf rises, glittering.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "comes with: a matching one *for you.*" Leo and Pisces, side by side in matching gold scarves.
//   8.0–11.6  THE STARS: "Hype them up. Then *let* them hype you."
import { makeEp, R, bubble, shadow, sparkles, scarfCells, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD } from '../../npye01/scenes/kit.js'

function scarf(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < 16; i++) {
    const X = -300 + i * 40, Y = 40 * Math.sin(i * 0.6 + t * 3)
    if (pass === 0) R(x, INK, X - 6, Y - 36, 52, 72); else { R(x, i % 4 === 3 ? '#fff1a8' : GOLD, X, Y - 30, 40, 60); if (i % 2) R(x, '#ffffff', X + 14, Y - 6, 10, 10) }
  }
  x.restore()
  for (let i = 0; i < 6; i++) { const ph = (t * 2 + i / 6) % 1; if (ph < 0.15) R(x, '#ffffff', cx - 260 + i * 100, cy - 50 + (i % 2) * 90, 12, 12) }
}

const EP = makeEp({
  id: 'ngie05', series: 'gifts', sign: 'leo', name: 'Leo', boxCol: '#e8b43a', ribbon: '#e8344e', finGift: scarf,
  hook(x, t, S) { giftHook(x, t, S, { line: 'drumroll, please!' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a scarf you can see from *across the street.*',
      draw(x, t, S) { giftReveal(x, t, S, scarf, { line: 'is it too much? no.', heroMood: 'sparkle' }) },
      cues: [...revealCues, ['glitter', 0.7, 1.6], ['pop', 1.2, 987.77, 0.035, 0]] },
    { caption: 'comes with: a matching one *for you.*',
      draw(x, t, S) {
        const { u, hero, dress, pisces } = S
        shadow(x, 400, 1125, 230); shadow(x, 700, 1125, 200)
        const o = { x: 400, y: 960, s: 250, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 1.3] }
        hero(x, t, o); dress(x, t, o, () => scarfCells(x, GOLD, '#fff1a8'))
        const k = ease.outCubic(prog(u, 0.2, 0.6))
        const P = { x: 700, y: 990, s: 200, pop: k, hops: [S.t0 + 0.6, S.t0 + 1.4] }
        if (k > 0.01) { const F = pisces(x, t, P, 3, 'sparkle', [-1, 0]); void F; dress(x, t, { ...P, seed: 6 }, () => scarfCells(x, GOLD, '#fff1a8')) }
        sparkles(x, t, 550, 900, S.t0 + 0.6, 12, 260, 1, [GOLD, BONE, '#fff1a8'])
        bubble(x, t, 550, 660, S.t0 + 1.0, S.t1, 'now we’re BOTH iconic.', { size: 34 })
      },
      pis: false,
      cues: [['pop', 0.3, 880, 0.03, 0], ['pop', 0.6, 1318.51, 0.045, 0.3], ['glitter', 0.6, 1.1], ['pop', 1.0, 987.77, 0.035, 0]] },
  ],
  last: 'Hype them up. Then *let* them hype you.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
