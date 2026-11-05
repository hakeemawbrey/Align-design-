// kgse11: GUESS THE SIGN, "“I'm fine.” Then forty fun facts" (10 s vertical, star_advice trial, chiptune · F, loop).
//   0.00  frame 0: the silhouette mid-gesture at a chalkboard, a friend's "you ok?" bubble behind it.
//         Hook: "‘I’m fine.’ Then forty *facts about anything.*"
//   0.35  record scratch + freeze · facts tumble out to dodge the question (all true: octopus hearts, honey, Venus)
//   C1 "lab goggles" · C2 "a lightning bolt" · buzz · 3·2·1 · reveal: AQUARIUS · last line · loop
import { makeGuess, box, R, bubble, shadow, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const FACTS = [[1.3, 'octopuses have 3 hearts'], [2.3, 'honey can keep for centuries'], [3.3, 'a day on Venus is longer', 'than its year'], [4.3, 'FACT #40…']]
function board(x, u) {
  box(x, 200, 520, 760, 420, '#22463a', { b: 10 }); R(x, '#a07850', 190, 940, 780, 18)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  FACTS.forEach(([a, l1, l2], i) => {
    const k = clamp(prog(u, a, a + 0.35))
    if (k <= 0) return
    const y = 580 + i * 92
    x.save(); x.globalAlpha = k; x.font = `700 34px ${MONO}`; x.fillStyle = i === 3 ? GOLD : '#e8f2ea'
    const txt = l1.slice(0, Math.ceil(l1.length * k)); x.fillText(`${i + 1 < 4 ? i + 1 + '.' : ''} ${txt}`, 230, y)
    if (l2) { x.font = `700 28px ${MONO}`; x.fillText('   ' + l2, 230, y + 36) }
    x.restore()
  })
}
function goggles(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k * 2)
  const y = o.y - o.s * 0.05 - (1 - k) * 60
  R(x, INK, o.x - 140, y - 8, 280, 16)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(o.x + d * 70, y, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(127,227,255,0.55)'; x.beginPath(); x.arc(o.x + d * 70, y, 40, 0, Math.PI * 2); x.fill(); R(x, '#ffffff', o.x + d * 70 - 22, y - 22, 12, 12) }
  x.restore()
}
function bolt(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const P = [[-10, -70], [30, -70], [8, -10], [36, -10], [-20, 74], [-2, 10], [-30, 10]]
  x.fillStyle = INK; x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a * 1.2, b * 1.2) : x.moveTo(a * 1.2, b * 1.2)); x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); P.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.fill()
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse11', sign: 'aquarius', D: 10, ending: 'loop', brk: 'scratch', scratchCap: '“are you okay?” *anyway—*',
  hook: '‘I’m fine.’ Then forty | *facts about anything.*',
  clues: ['lab goggles', 'a lightning bolt'],
  last: 'You’re allowed | *to not be fine.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    board(x, u)
    // the friend who asked
    S.star('libra', { x: 900, y: 1110, s: 170, mood: u > 2.6 ? 'squint' : 'wide', look: [-1, -0.3], seed: 9, hops: [0.1, 2.6] })
    bubble(x, t, 860, 980, -1, u < 1.25 ? 1.25 : 0, 'you ok?', { size: 34, tail: 0.3 })
    if (rv > 0.5) bubble(x, t, 860, 980, S.R + 0.2, S.D + 1, 'I’m here. tell me.', { size: 30, tail: 0.3 })
    const o = { x: 430, y: 1080, s: 330, mood: rv > 0.5 ? 'sparkle' : 'happy', look: [1, -0.6], hops: FACTS.map(f => f[0] + 0.05).filter(h => h < S.R), rot: -0.16 * Math.exp(-u * 2) + 0.08 * Math.sin(u * 4) * (1 - rv), squash: -0.08 * Math.exp(-u * 3) }
    shadow(x, 430, 1290, 280)
    S.sil(o)
    if (t > T.C1) goggles(x, o, pop01(t, T.C1 + 0.05, 0.3, 2))
    if (T.C2 != null) bolt(x, 150, 1060, pop01(t, T.C2 + 0.05, 0.3, 2.6))
    if (rv > 0.5) bubble(x, t, 330, 990, S.R + 0.5, S.D + 1, 'okay. not fine. a bit sad.', { size: 30, tail: 0.2 })
  },
  cues: FACTS.flatMap(([a], i) => [['pop', a, [880, 987.77, 1174.66, 1567.98][i], 0.045, -0.2], ['chip', a + 0.02, 660 + i * 110, { gain: 0.02, len: 0.08 }]]).filter(c => c[0] !== 'chip'),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
