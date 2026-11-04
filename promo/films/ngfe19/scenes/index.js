// ngfe19: 24 DAYS OF GREEN FLAGS, door 19: "Notices your new haircut." (18 s vertical, dreamy · Ab)
//   hook "Something's | *different…*" · Scorpio walks in with a tiny new fringe. Libra: "hey!" …looks away… double
//   take: "wait. the haircut!" then "it suits you." Scorpio plays it cool ("oh, this?"), then does a little spin.
//   Last: "They *noticed*."
import { makeDoor, room, windowFrame, bubble, hearts, shadow, label, starFrame, inSprite, sparkles, R, INK, GOLD, BONE, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
function fringe(x, F) {
  inSprite(x, F, () => {
    const C = '#3a1a4a'
    const cols = [[12, 9], [13, 10], [14, 11], [15, 10], [16, 11], [17, 12], [18, 11], [19, 12], [20, 11], [21, 10], [22, 11], [23, 10], [24, 9]]
    for (const [i, d] of cols) { x.fillStyle = INK; x.fillRect(i - 0.3, 5.7, 1.6, d - 5 + 0.6); x.fillStyle = C; x.fillRect(i, 6, 1, d - 5) }
  })
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2e2452', wall2: '#352a5e', floor: '#43305a' })
  windowFrame(x, t, 380, 280, 320, 280)
  // Scorpio walks in from the right
  const walk = ease.outCubic(prog(u, 0, 0.8))
  const spin = prog(u, 4.3, 4.9)
  const sx = lerp(1250, 760, walk)
  shadow(x, 300, 1160, 230); shadow(x, sx, 1160, 230)
  const so = { x: sx, y: 990, s: 260, mood: u < 3.4 ? 'happy' : u < 4.3 ? 'neutral' : 'sparkle', look: u > 3.4 && u < 4.3 ? [1, -0.3] : [-1, 0], hops: [S.t0 + 0.8, S.t0 + 4.3, S.t0 + 4.55, S.t0 + 4.8], squash: spin > 0 && spin < 1 ? 0.15 * Math.sin(spin * Math.PI * 4) : 0 }
  mate(x, t, so)
  fringe(x, starFrame(so.x, so.y, so.s, t, { hops: so.hops, squash: so.squash, seed: 7 }))
  // Libra: "hey!" → looks away → double take
  const lk = u < 1.4 ? [1, 0] : u < 1.9 ? [-1, -0.5] : [1, 0]
  hero(x, t, { x: 300, y: 990, s: 260, mood: u < 1.9 ? 'happy' : u < 3.0 ? 'wide' : 'heart', look: lk, hops: [S.t0 + 0.9, S.t0 + 1.9, S.t0 + 2.05] })
  if (u > 1.9 && u < 2.4) label(x, '!!', 300, 760, { size: 70, col: GOLD, font: 'Inter, sans-serif', weight: 800 })
  sparkles(x, t, sx, 900, S.t0 + 4.3, 10, 170, 1, [GOLD, BONE, '#ff8fb1'])
  if (u > 3.0) hearts(x, t, S.t0 + 3.05, 300, 820, { n: 4 })
  bubble(x, t, 330, 680, S.t0 + 0.9, S.t0 + 1.9, 'hey!', { size: 48, tail: -0.1 })
  bubble(x, t, 330, 680, S.t0 + 2.0, S.t0 + 3.0, 'wait. the haircut!', { size: 44, tail: -0.1 })
  bubble(x, t, 330, 680, S.t0 + 3.0, S.t0 + 4.3, 'it suits you.', { size: 46, tail: -0.1 })
  bubble(x, t, 760, 660, S.t0 + 3.5, S.t1 - 0.2, 'oh, this?\n…thanks.', { size: 44, tail: 0.1, col: '#ffe0c2' })
  void R
}
const EP = makeDoor({
  day: 19, hero: 'libra', mate: 'scorpio', hook: "Something's | *different…*",
  flag: 'notices your *new haircut.*', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  payoff(x, t, S) { const o = { x: 800, y: 1060, s: 240, pop: S.ok, hops: S.PAY_HOPS.map(h => h + 0.08) }; fringe(x, starFrame(o.x, o.y, o.s * o.pop, t, { hops: o.hops, seed: 7 })) },
  cues: [['whoosh', 0, 0.5, 0.03], ['pop', 0.9, 880, 0.04, -0.3], ['whoosh', 1.9, 0.2, 0.04], ['pop', 2.0, 1567.98, 0.05, -0.3], ['pop', 3.0, 1174.66, 0.04, -0.3], ['pop', 3.5, 987.77, 0.04, 0.3], ['whoosh', 4.3, 0.5, 0.035], ['glitter', 4.3, 4.9]],
  last: 'They *noticed*.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
