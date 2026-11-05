// kare08 — THE ALMOST RELATIONSHIP, Ep 8: 'Jealous with no "right" to be' (20 s vertical, star_advice; cinematic · Cm; hard cut).
//   0.0–2.6   the café: Libra laughing with Gemini at the back table; Aries mid-gasp in the foreground. The kit's caught
//             circle is already on the laugh. Hook "Jealous, but we're | *'not official.'*"
//   2.6–5.0   whip in to Aries' face, a shake.
//   5.0–10.0  the head fight: "you can't be jealous. you're not official." vs "…but I AM." (three rounds, faster)
//  10.0–12.6  the next table: Pisces sobbing into a croissant: "feelings don't need a LABEL."
//  12.6–20.0  THE STARS: "Jealousy isn't a crime. It's a *clue.*" · "That feeling is a *want*. Say the want."
//             18.6 Aries walks over to Libra: "I'd like us to be more." HARD CUT.
import { makeAlmost, drawCafe, drawCafeTable, CAFE, star, stars, standY, say, thought, sparkles, prog, ease, pop01, drawPastry, R, INK, BONE, PINK } from '../../kare01/scenes/almostkit.js'

const D = 20
const T = { face: 2.6, fight: [5.0, 6.6, 8.0, 9.1], pis: 10.0, valid: 10.5, stars: 12.6, l1: 13.0, l2: 15.4, more: 18.6 }

const shots = [
  { a: 0, b: T.face, draw(x, t) {
    drawCafe(x, t, {})
    star(x, 'libra', 640, standY(170, 1060), 170, t, { mood: 'happy', look: [1, 0], hops: [0.1, 0.5, 0.9, 1.3, 1.7, 2.1] })
    star(x, 'gemini', 860, standY(170, 1060), 170, t, { mood: 'happy', look: [-1, 0], hops: [0.3, 0.8, 1.4] })
    // Aries, big, foreground left, mid-gasp
    star(x, 'aries', 300, 1500, 420, t, { mood: 'wide', look: [1, -0.6], squash: -0.08, blink: false })
  } },
  { a: T.face, b: T.pis, draw(x, t, S) {
    drawCafe(x, t, { lights: 0.6 })
    R(x, 'rgba(20,6,30,0.35)', 0, 0, 1080, 1920)
    const round = T.fight.filter(c => t >= c).length
    star(x, 'aries', 540, 1280, 520, t, { mood: round === 0 ? 'wide' : round % 2 ? 'squint' : 'wide', look: round % 2 ? [-0.6, -0.6] : [0.6, -0.6], blink: false, squash: 0.03 * Math.sin(S.u * 20) * Math.exp(-((t - (T.fight[round - 1] || T.face)) * 3)) })
    const L = [['you can’t be jealous.', 'BRAIN'], ['…but I AM.', 'FEELING'], ['you’re not official!', 'BRAIN'], ['still. here we are.', 'FEELING']]
    L.forEach(([txt, who], i) => {
      const a = T.fight[i], b = i < 3 ? T.fight[i + 1] + 0.6 : T.pis
      const left = who === 'BRAIN'
      thought(x, t, left ? 320 : 760, 760 + (i >> 1) * 170, a, b, txt, { size: 36, col: left ? BONE : '#ffc9d9', tx: left ? 1 : -1 })
    })
  } },
  { a: T.pis, b: T.stars, draw(x, t) {
    drawCafe(x, t, {})
    star(x, 'pisces', 540, standY(300, 1230), 300, t, { tears: 3, mood: 'sparkle', look: [0, 0.4], hops: [T.valid, T.valid + 0.6] })
    drawCafeTable(x, t, { cups: 1, pastry: null })
    drawPastry(x, 600, 1300, 8, 'croissant')
    say(x, t, 540, 960, T.valid, T.stars, 'feelings don’t need a LABEL.', { size: 36 })
    sparkles(x, t, 540, 1150, T.valid, 10, 220, 3)
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    drawCafe(x, t, {})
    const walk = ease.inOutCubic(prog(t, T.more - 0.8, T.more))
    star(x, 'libra', 760, standY(230, 1250), 230, t, { mood: t > T.more + 0.4 ? 'sparkle' : 'happy', look: [-1, 0], hops: [T.more + 0.5] })
    star(x, 'aries', 200 + 340 * walk, standY(240, 1250), 240, t, { mood: t > T.more ? 'neutral' : 'squint', look: [1, -0.2], hops: [T.more - 0.6, T.more - 0.3, T.more] })
    star(x, 'pisces', 960, standY(130, 1060), 130, t, { tears: 2, mood: 'sparkle', look: [-1, 0], box: false })
    say(x, t, 470, 880, T.more, D + 1, 'I’d like us to be more.', { size: 32 })
    stars(x, 540, 640, 180, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.l2 + 1.6 ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
  } },
]
function cam(t) {
  if (t < T.face) return { z: 1.12, fx: 540, fy: 1200 }
  const hit = [T.face, ...T.fight, T.pis, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = 0
  return { z: 1 + 0.08 * k, dx: 40 * k, dy: up }
}
const E = makeAlmost({
  id: 'kare08', duration: D, ending: 'cut',
  hook: 'Jealous, but we’re | *‘not official.’*', hookOut: [2.4, 2.6], hookTop: 200, hookSize: 104, hookPlate: [160, 470],
  shots, cam,
  fx: [
    ['caught', { at: -1, x: 655, y: 1010, r: 140, ry: 110, out: [2.3, 2.5], label: '', arrow: null, rec: true }],
    ['whipZoom', { at: T.face, len: 0.4, from: 1.5, blur: 16 }], ['screenShake', { at: T.face + 0.2, len: 0.5, amp: 22 }],
  ],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'Jealousy isn’t a crime. It’s a *clue.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'That feeling is a *want*. Say the want.' },
  ],
  cues: [
    ...T.fight.map((a, i) => ['pop', a, i % 2 ? 523.25 : 1046.5, 0.04, i % 2 ? 0.4 : -0.4]),
    ['pop', T.valid, 1318.51, 0.035, 0], ['glitter', T.valid, T.valid + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pluck', T.more, 1174.66, 0.04, 0.5, -0.2],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
void [INK, PINK]
