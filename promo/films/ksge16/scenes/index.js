// ksge16 · SPOT THE GREEN FLAG: "Cancer Plans Your Birthday" (trial reel, ≈ 10 s, pop · D). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: party poppers mid-burst, a banner mid-fall.
//   TAKE A   the banner lands: HAPPY BIRTHDAY, a quiet table for two, your favourite cake: "just us, like you said."
//   TAKE B   the banner lands: SURPRISE!!!  a crowd pops up behind the couch; you sweat. "forty people!! SURPRISE!!"
//   freeze, 3-2-1, GREEN FLAG: Take A. THE STARS: "They planned your birthday, *not theirs.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, sweat, table, confetti, drawBits, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK, RED, INTER } from '../../ksge01/scenes/greenkit.js'
import { party } from '../../ksge02/scenes/sets.js'

function banner(x, text, y, rot, col) {
  x.save(); x.translate(252, y); x.rotate(rot)
  box(x, -190, -38, 380, 76, col, { b: 6 }); x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
function cake(x, cx, cy, tk, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -60, -40, 120, 50, PINK, { b: 5, hi: '#ffd0e0' }); box(x, -44, -76, 88, 36, BONE, { b: 5 })
  for (const d of [-16, 16]) { R(x, INK, d - 5, -110, 10, 36); R(x, '#9fd8f6', d - 3, -106, 6, 30); drawBits(x, ['.F.', 'FFF', '.F.'], { F: GOLD }, d, -118 + Math.sin(tk * 12 + d) * 2, 4) }
  x.restore()
}
function scene(x, tk, S, mode) {
  const { hero, you, other } = S
  const f = S.focus[mode]
  party(x, tk, { banner: null })
  // the banner falls at frame 0
  const fall = ease.outBack ? ease.outBack(clamp(prog(tk, -0.3, 0.45))) : clamp(prog(tk, -0.3, 0.45))
  const surprise = mode === 'B'
  banner(x, surprise ? 'SURPRISE!!!' : 'happy birthday', lerp(-60, 170, fall), 0.06 * (1 - fall), surprise ? GOLD : BONE)
  confetti(x, tk, -0.25, 120, 360, { n: 18 }); confetti(x, tk, -0.2, 390, 360, { n: 18 })
  if (!surprise) {
    table(x, 250, 480, 300)
    cake(x, 250, 480, tk, pop01(tk, 0.7, 0.3, 2.4))
    you(x, tk, { x: 90, y: 440, s: 150, mood: tk > 1.1 ? 'heart' : 'wide', look: [1, 0] })
    hero(x, tk, { x: 420, y: 430, s: 180, mood: 'happy', look: [-1, 0] })
    pbubble(x, tk, 260, 270, 1.0, 99, 'just us,\nlike you said.', { size: 32, tail: 0.6, col: '#c9f2d4' })
    hearts(x, tk, 1.3, 250, 360, { n: 5, cell: 4 })
  } else {
    // the crowd pops up behind the couch
    const crowd = ['leo', 'gemini', 'sagittarius', 'libra', 'aries', 'aquarius']
    crowd.forEach((sg, i) => { const k = pop01(tk, f[0] + 0.15 + i * 0.07, 0.25, 2.4); if (k > 0.01) other(sg, 20 + i)(x, tk, { x: 50 + i * 82, y: 430 - (i % 2) * 40, s: 100, pop: k, mood: 'happy', hops: [f[0] + 0.5 + i * 0.05] }) })
    box(x, 10, 480, 484, 80, '#7d5cc6', { b: 6 })
    const yo = { x: 250, y: 560, s: 150 }
    you(x, tk, { ...yo, mood: 'wide', look: [0, 0] })
    if (tk > f[0] + 0.5) sweat(x, tk, yo.x + 60, yo.y - 70)
    hero(x, tk, { x: 430, y: 600, s: 150, mood: 'sparkle', look: [-1, 0], hops: [f[0] + 0.3, f[0] + 0.8] })
    pbubble(x, tk, 260, 290, f[0] + 0.45, 99, 'SURPRISE!!\nforty people!!', { size: 32, tail: 0.6 })
  }
  void RED
}
const EP = makeGreen({
  id: 'ksge16', sign: 'cancer', name: 'Cancer', win: 'A', ending: 'cut',
  hook: 'YOU SAID | *NO SURPRISE PARTY.*',
  premise: 'You said: *no surprise party,* please.',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They planned your birthday, *not theirs.*',
  cues: [['pop', 0.0, 1760, 0.05, -0.3], ['pop', 0.05, 1567.98, 0.05, 0.3], ['glitter', 0.0, 0.5], ['pop', 0.7, 1318.51, 0.035, -0.4], ['pluck', 1.0, 1174.66, 0.035, -0.4, 0.3], ['pop', 2.2, 880, 0.04, 0.4], ['pop', 2.3, 987.77, 0.04, 0.4], ['pop', 2.4, 1174.66, 0.04, 0.4], ['clap', 2.5, { gain: 0.14, pan: 0.3 }]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
