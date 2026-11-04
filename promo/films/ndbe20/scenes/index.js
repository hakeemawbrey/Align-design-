// ndbe20: DEALBREAKER OR NOT? E20, "They want your | *whole* backstory." (13 s vertical trial reel, music: jazzy · Eb).
//   0.0–3.9   frame 0: ♏ Scorpio mid-lean across a café table, chin on fist, a little notebook out; a question already
//             floating: "first pet?" More float up: "best day ever?" · "biggest fear?" · "comfort snack?". ♊ Gemini lights
//             up and answers every one (1.0 "a hamster named Toast!", 1.9 "this one, maybe?", 2.8 "geese.").
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    Gemini turns the notebook around: "ok. YOUR turn." Scorpio, caught, blushes… and smiles. Hearts.
//             THE STARS: "Share at your pace. Curious is a *compliment.*"
import { makeDeal, R, box, bubble, hearts, sparkles, table, floor, glow, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

function notebook(x, cx, cy, rot, k = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); box(x, -60, -44, 120, 88, '#fbf7ee', { b: 5 }); R(x, '#e8344e', -60, -44, 14, 88); for (let i = 0; i < 4; i++) R(x, '#b8b0d0', -36, -28 + i * 18, 80, 4); x.restore() }
const Q = [[-1, 'first pet?', 300, 540], [0.6, 'best day ever?', 330, 630], [1.5, 'biggest fear?', 380, 470], [2.4, 'comfort snack?', 250, 710]]
const A = [[1.0, 'a hamster named Toast!'], [1.9, 'this one, maybe?'], [2.8, 'geese.']]
const EP = makeDeal({
  id: 'ndbe20', sign: 'scorpio', date: 'gemini', verdict: 'not', accent: '#ff6177',
  hook: 'They want your | *whole* backstory.',
  last: 'Share at your pace. Curious is a *compliment.*',
  scene(x, t, S) {
    const { u, hero, date } = S
    floor(x, 1150, '#2c2244'); glow(x, 540, 880, 420, 0.14)
    hero(x, t, { x: 300, y: 880, s: 250, mood: 'sparkle', look: [1, 0], squash: -0.04, hops: Q.map(q => q[0]).filter(v => v > 0) })
    date(x, t, { x: 790, y: 890, s: 240, mood: u > A[0][0] ? 'happy' : 'sparkle', look: [-1, 0], squash: 0.04 * Math.sin(u * 8), hops: A.map(a => a[0]) })
    table(x, 540, 1010, 720, { cloth: '#8a3a5a' })
    notebook(x, 420, 990, -0.1)
    Q.forEach(([a, s, bx, by]) => bubble(x, t, bx, by, a, 3.85, s, { size: 32, col: '#ffd6e0', tail: 0 }))
    A.forEach(([a, s], i) => bubble(x, t, 780, [620, 520, 720][i], a, i === 2 ? 3.85 : A[i + 1][0], s, { size: 32, col: '#c9f2d4', tail: -0.2 }))
  },
  sceneCues: [...Q.filter(q => q[0] >= 0).map((q, i) => ['pop', q[0], [880, 987.77, 1174.66][i], 0.04, -0.3]), ...A.map((a, i) => ['pop', a[0], [1318.51, 1174.66, 1567.98][i], 0.045, 0.3])],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    floor(x, 1150, '#2c2244')
    if (k <= 0.01) return
    glow(x, 540, 880, 420, 0.18 * k)
    const caught = u > 1.2
    hero(x, t, { x: 300, y: 880, s: 250, pop: k, mood: caught ? (u > 2.0 ? 'happy' : 'wide') : 'sparkle', look: [1, 0], blush: caught ? 1 : 0, hops: [T.stamp + 1.25, T.stamp + 2.0] })
    date(x, t, { x: 790, y: 890, s: 240, pop: k, mood: 'sparkle', look: [-1, 0], hops: [T.stamp + 0.8] })
    table(x, 540, 1010, 720, { cloth: '#8a3a5a' })
    const turn = ease.inOutCubic(prog(u, 0.6, 1.0))
    notebook(x, lerp(420, 640, turn), 990, lerp(-0.1, Math.PI - 0.1, turn), k)
    bubble(x, t, 760, 640, T.stamp + 0.9, T.out[0], 'ok. YOUR turn.', { size: 34, col: '#c9f2d4', tail: -0.1 })
    hearts(x, t, T.stamp + 2.0, 300, 760, { n: 5 })
    sparkles(x, t, 540, 960, T.stamp + 1.0, 8, 120, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['whoosh', 0.6, 0.3, 0.025], ['pop', 0.9, 1174.66, 0.045, 0.3], ['pluck', 1.25, 523.25, 0.035, 0.5, -0.3], ['pluck', 2.0, 1567.98, 0.04, 0.5, -0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, pop01, outK]
