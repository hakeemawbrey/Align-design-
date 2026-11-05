// kwme22: WAIT, THAT'S ME, "Winning imaginary arguments at 3 a.m." (9 s loop, star_advice trial, music: synthwave · G♯m).
//   0.00  frame 0: the camera mid-whip, ♒ Aquarius in bed mid-point at the ceiling, a speech bubble mid-slam, clock 3:00.
//   1.0 "AND ANOTHER THING—"  ·  1.9 "checkmate." the crowd in its head cheers  ·  2.7 a trophy drops: WINNER
//   3.6   caption slams: "the argument: 3 years ago."  5.0–6.5 the slow turn.  6.6 last line: "they’ll never know. I won."
import { makeWM, wmMusic, box, label, bubble, drawBits, drawStarChar, pop01, outK, prog, ease, GOLD, INK, BONE, MINT } from '../../kwme01/wmkit.js'

const H = { x: 420, y: 1180, s: 400, face: 1 }
const A1 = -0.3, A2 = 1.0, A3 = 1.9, TROPHY = 2.7, REVEAL = 3.6, TURN = 5.0
const TROPHY_BM = ['GGGGGGG', 'GGGGGGG', '.GGGGG.', '..GGG..', '...G...', '..GGG..', '.GGGGG.']
const CROWD = ['#f0603a', '#e9b24a', '#7fd0f0', '#3f7cf0', '#c9a6ff', '#9fe6b0']
function head(x, t) {
  // a thought cloud above: a tiny cheering crowd of stars
  box(x, 560, 420, 460, 300, '#2a2148', { bw: 6, ink: '#8a84a8' })
  CROWD.forEach((c, i) => drawStarChar(x, 620 + i * 70, 640, 90, t, { color: c, mood: t > A3 ? 'happy' : 'neutral', look: [0, -1], seed: 20 + i, tips: false, hops: t > A3 ? [A3, A3 + 0.35 + i * 0.05, A3 + 0.8, TROPHY + 0.1] : null }))
  label(x, 'the crowd (in my head)', 790, 460, { size: 22, col: BONE, stroke: null, font: "'Space Mono', monospace", weight: 700 })
  drawBits(x, ['GG', 'GG'], { G: '#2a2148' }, 600, 760, 20); drawBits(x, ['G'], { G: '#2a2148' }, 560, 810, 18)
}
const EP = makeWM({
  id: 'kwme22', dur: 9, sign: 'aquarius', turn: TURN, brk: 'whip',
  hook: 'Winning *imaginary arguments* | at 3 a.m.',
  last: 'they’ll never know. I won.',
  hero: H, wash: '#2a3a8a',
  heroOpts: (t) => ({ mood: t < TROPHY ? 'squint' : 'sparkle', look: [1, -1], hops: [A1 + 0.3, A2, A3, TROPHY + 0.2], squash: -0.05, tilt: -0.08 }),
  back(x, t) {
    head(x, t)
    box(x, 120, 1300, 840, 120, '#4a3a8a', { bw: 8, hi: '#6a5aaa' }); box(x, 120, 1230, 200, 80, BONE, { bw: 6 })
    box(x, 120, 520, 260, 110, '#14102a', { bw: 6 }); label(x, '3:00', 250, 578, { size: 64, col: '#ff5c8e', stroke: null, font: "'Space Mono', monospace", weight: 700 })
  },
  front(x, t) {
    bubble(x, t, 380, 850, A1, A2 - 0.05, 'and you KNOW what—', { size: 36, tail: 0.1 })
    bubble(x, t, 380, 850, A2, A3 - 0.05, 'AND ANOTHER THING—', { size: 38, tail: 0.1 })
    bubble(x, t, 380, 850, A3, REVEAL - 0.1, 'checkmate.', { size: 46, tail: 0.1 })
    const tk = ease.outBack(prog(t, TROPHY, TROPHY + 0.35)) * outK(t, [TURN, TURN + 0.2])
    if (tk > 0.01) { drawBits(x, TROPHY_BM, { G: GOLD }, 800, 900 - (1 - tk) * 400, 20); label(x, 'WINNER', 800, 1010, { size: 44 * tk, col: GOLD }) }
    const k = pop01(t, REVEAL, 0.25, 2.6) * outK(t, [TURN + 0.2, TURN + 0.4])
    if (k > 0.01) { x.save(); x.translate(540, 1240); x.rotate(-0.04); x.scale(k, k); box(x, -360, -46, 720, 92, INK, { bw: 6, ink: MINT }); label(x, 'the argument: 3 years ago', 0, 2, { size: 36, col: MINT, stroke: null, font: "'Space Mono', monospace", weight: 700 }); x.restore() }
  },
  cues: [['pop', A2, 880, 0.045, -0.2], ['pop', A3, 1174.66, 0.05, -0.2], ['glitter', A3 + 0.1, A3 + 0.8], ...[0, 1, 2, 3].map(i => ['clap', +(A3 + 0.15 + i * 0.18).toFixed(2), { gain: 0.08 }]), ['boom', TROPHY + 0.3, 0.12], ['bell', TROPHY + 0.32, 1760, 0.035, 1.0, 0.3], ['tick', REVEAL, 0.08], ['pluck', REVEAL + 0.05, 220, 0.04, 0.6, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'synthwave', key: 'G#', seed: 2622 })
