// ndbe06: DEALBREAKER OR NOT? E6, "They laughed | when you said *no.*" (13 s vertical trial reel, music: screwed · Fm).
//   0.0–3.9   frame 0: a party under string lights, music notes in the air. ♍ Virgo mid-step back, its "no thanks!"
//             bubble already up. 0.8 the grey date (no sign): "come ON, one more song!" 1.6 the date laughs (HA HA HA).
//             Virgo's bubble stays put. 2.5 the lights dim, the music notes stop: the room goes quiet.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Virgo heads out arm in arm with two friends (♎ Libra, ♋ Cancer) into the snow; Virgo's own bubble:
//             "home time." THE STARS: "A no is a whole *answer.*"
import { makeDeal, R, bubble, label, hearts, sparkles, floor, glow, notes, snowfall, snowGround, prog, lerp, ease, clamp, pop01, outK, drawStarChar, signStar, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function lights(x, t, on) {
  for (let i = 0; i < 12; i++) {
    const lx = 40 + i * 92, ly = 470 + 30 * Math.sin(i / 11 * Math.PI)
    R(x, INK, lx - 10, ly - 2, 20, 6)
    const col = ['#ffd23a', '#ff8fb1', '#7fd0ff', '#9fe6b0'][i % 4]
    R(x, INK, lx - 9, ly + 4, 18, 24)
    R(x, on > 0.5 ? col : '#4a4466', lx - 5, ly + 8, 10, 16)
    if (on > 0.5) glow(x, lx, ly + 16, 50, 0.25 * on, '255,230,170')
  }
  x.save(); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let i = 0; i <= 11; i++) { const lx = 40 + i * 92, ly = 470 + 30 * Math.sin(i / 11 * Math.PI); i ? x.lineTo(lx, ly) : x.moveTo(lx, ly) } x.stroke(); x.restore()
}
const ASK = 0.8, LAUGH = [1.6, 1.85, 2.1], QUIET = 2.5
const EP = makeDeal({
  id: 'ndbe06', sign: 'virgo', date: 'grey', verdict: 'deal', accent: '#9fe6b0', voteMood: 'neutral',
  hook: 'They laughed | when you said *no.*',
  last: 'A no is a whole *answer.*',
  scene(x, t, S) {
    const { u, hero, date } = S
    const on = 1 - prog(u, QUIET, QUIET + 0.25)
    floor(x, 1150, '#2a2040')
    if (on > 0) glow(x, 540, 800, 520, 0.12 * on, '255,143,177')
    lights(x, t, on)
    notes(x, t, -2, QUIET, 540, 900, { n: 5, spread: 700 })
    // a couple of party-goer silhouettes at the back
    for (const [px, c] of [[120, '#6a5a8a'], [960, '#5a4a7a']]) drawStarChar(x, px, 1000, 150, t, { color: c, mood: on > 0.5 ? 'happy' : 'wide', seed: px, glow: 0.2, alpha: 0.75, look: [px < 540 ? 1 : -1, 0], hops: on > 0.5 ? [0.2, 0.7, 1.2, 1.7, 2.2] : [] })
    const step = ease.outCubic(prog(u, -0.6, 0.2))
    hero(x, t, { x: lerp(380, 330, step), y: 900, s: 250, mood: u > LAUGH[0] ? 'neutral' : 'squint', look: [1, 0], hops: [QUIET + 0.1] })
    date(x, t, { x: 740, y: 910, s: 240, mood: u > LAUGH[0] && u < QUIET ? 'happy' : u > QUIET ? 'neutral' : 'sparkle', look: [-1, 0], hops: [ASK, ...LAUGH] })
    bubble(x, t, 330, 680, -1, 3.85, 'no thanks!', { size: 40, tail: -0.1 })
    bubble(x, t, 720, 620, ASK, LAUGH[0] + 0.6, 'come ON, one more song!', { size: 32, tail: 0.1 })
    LAUGH.forEach((l, i) => { const k = pop01(t, l, 0.2, 3) * outK(t, [QUIET - 0.1, QUIET + 0.1]); if (k > 0.01) label(x, 'HA', 820 + i * 60, 700 - i * 50, { size: 48 * k, col: '#cfc8e8', font: 'Inter, sans-serif', weight: 800, rot: (i - 1) * 0.2 }) })
    label(x, '…', 540, 760, { size: 70, col: BONE, alpha: prog(u, QUIET + 0.2, QUIET + 0.4) })
  },
  sceneCues: [['pop', ASK, 739.99, 0.04, 0.3], ...LAUGH.map((l, i) => ['pop', l, [523.25, 587.33, 523.25][i], 0.04, 0.4]), ['whoosh', QUIET, 0.4, 0.03], ['pluck', QUIET + 0.2, 220, 0.04, 1.0, 0]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    snowGround(x, 1150)
    snowfall(x, t, { top: 620, bottom: 1150, n: 34 })
    if (k <= 0.01) return
    const walk = 40 * Math.sin(u * 1.4)
    const hops = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map(v => v + T.stamp)
    drawStarChar(x, 260 + walk, 950, 200, t, { ...signStar('libra'), pop: k, mood: 'happy', look: [1, 0], seed: 21, hops: hops.map(h => h + 0.12) })
    hero(x, t, { x: 520 + walk, y: 940, s: 230, pop: k, mood: u > 1.0 ? 'happy' : 'neutral', look: [0, 0], hops })
    drawStarChar(x, 790 + walk, 955, 200, t, { ...signStar('cancer'), pop: k, mood: 'happy', look: [-1, 0], seed: 22, hops: hops.map(h => h + 0.24) })
    bubble(x, t, 520 + walk, 720, T.stamp + 1.0, T.out[0], 'home time.', { size: 34 })
    hearts(x, t, T.stamp + 1.3, 520, 800, { n: 4 })
    void [sparkles, clamp, GOLD, PINK]
  },
  finaleCues: [['pop', 1.0, 880, 0.04, 0], ['pluck', 1.3, 1174.66, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
