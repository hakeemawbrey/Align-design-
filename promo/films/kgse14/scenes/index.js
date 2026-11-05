// kgse14: GUESS THE SIGN, "No plus-one, full dance floor" (9 s vertical, star_advice trial, funk · E, loop).
//   0.00  frame 0: the silhouette mid-split on a wedding dance floor under a disco ball.
//         Hook: "No plus-one. *Owned the dance floor.*"
//   0.35  record scratch + freeze · couples slow-dance; the silhouette dances solo; a crowd gathers and cheers
//   C1 "a sparkle cape" · C2 "its own spotlight" · buzz (happy tears) · 3·2·1 · reveal: LEO · last line · loop
import { makeGuess, box, R, bubble, shadow, label, drawStage, hearts, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, CYAN, MINT, INTER } from '../../kgse01/scenes/guesskit.js'

function disco(x, cx, cy, t) {
  R(x, INK, cx - 3, 300, 6, cy - 300 - 70)
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) { if (i * i + j * j > 34) continue; const on = (i + j + Math.floor(t * 8)) % 3 === 0; R(x, on ? '#ffffff' : (i + j) % 2 ? '#c9c4d8' : '#8a86a8', i * 11 - 5, j * 11 - 5, 10, 10) }
  x.restore()
  x.save(); x.globalCompositeOperation = 'lighter'
  for (let k = 0; k < 10; k++) { const a = t * 0.8 + k * 0.63, X = cx + Math.cos(a) * 420, Y = 900 + Math.sin(a * 1.3) * 300; x.fillStyle = ['rgba(255,140,200,0.25)', 'rgba(127,227,255,0.25)', 'rgba(255,220,120,0.25)'][k % 3]; x.beginPath(); x.arc(X, Y, 22, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function cape(x, o, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k * 1.5)
  x.fillStyle = INK; x.beginPath(); x.moveTo(o.x - 110, o.y - 60); x.lineTo(o.x + 110, o.y - 60); x.lineTo(o.x + 180 * k, o.y + 170); x.lineTo(o.x - 180 * k, o.y + 170); x.closePath(); x.fill()
  x.fillStyle = '#c44ad0'; x.beginPath(); x.moveTo(o.x - 100, o.y - 54); x.lineTo(o.x + 100, o.y - 54); x.lineTo(o.x + 170 * k, o.y + 162); x.lineTo(o.x - 170 * k, o.y + 162); x.closePath(); x.fill()
  for (let i = 0; i < 9; i++) R(x, GOLD, o.x - 140 + (i * 37) % 280, o.y + (i * 53) % 200 - 30, 8, 8)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse14', sign: 'leo', D: 9, ending: 'loop', brk: 'scratch', scratchCap: 'table for one. *dance floor for all.*',
  hook: 'No plus-one. | *Owned the dance floor.*',
  clues: ['a sparkle cape', 'its own spotlight'],
  last: 'No plus-one. | *Full heart.*',
  pisLine: 'PISCES? (happy tears)',
  bg(x, S) {
    drawStage(x, S.u, { spot: S.t > S.T.C2 ? 1.6 : 0.8 })
    // checkered dance floor
    for (let j = 0; j < 4; j++) for (let i = 0; i < 9; i++) R(x, (i + j + Math.floor(S.u * 4)) % 2 ? 'rgba(255,140,200,0.18)' : 'rgba(127,227,255,0.14)', i * 120, 1258 + j * 40, 120, 40)
    disco(x, 540, 470, S.u)
  },
  draw(x, S) {
    const { t, u, rv, T } = S
    // slow-dancing couples, sway
    ;[['cancer', 'capricorn', 160], ['aquarius', 'taurus', 920]].forEach(([a, b, cx], i) => {
      const sw = 14 * Math.sin(u * 1.6 + i)
      S.star(a, { x: cx - 45 + sw, y: 1130, s: 130, mood: 'heart', look: [1, 0], seed: 30 + i })
      S.star(b, { x: cx + 45 + sw, y: 1130, s: 130, mood: 'happy', look: [-1, 0], seed: 40 + i })
    })
    // the crowd gathers and cheers (from 3 s)
    const cg = clamp(prog(u, 3.0, 3.6))
    if (cg > 0) ['gemini', 'scorpio', 'sagittarius'].forEach((g, i) => { S.star(g, { x: [300, 780, 540][i], y: 1210 + (1 - cg) * 200, s: 110, mood: 'happy', look: [0, -1], seed: 50 + i, hops: [3.7 + i * 0.2, 4.4 + i * 0.2, 5.1] }) })
    if (cg > 0.5 && rv < 0.5) { label(x, 'WOO!', 300, 1060, { size: 44, col: GOLD, font: INTER, weight: 900, rot: -0.2 }); label(x, 'GO GO GO', 800, 1040, { size: 38, col: PINK, font: INTER, weight: 900, rot: 0.15 }) }
    const split = Math.exp(-u * 1.6)
    const o = { x: 540, y: 1000, s: 340, mood: rv > 0.5 ? 'sparkle' : 'happy', look: [0, -0.2], hops: [1.4, 1.8, 2.2, 2.6, 3.0, 3.4, 3.8, 4.2, 4.6, 5.0].filter(h => h < S.R), rot: 0.2 * Math.sin(u * 5) * (1 - split), squash: 0.3 * split }
    if (t > T.C1) cape(x, o, pop01(t, T.C1 + 0.05, 0.35, 1.8))
    shadow(x, 540, 1240, 300)
    S.sil(o)
    hearts(x, t, 1.5, 160, 1020, { n: 3, cell: 5 }); hearts(x, t, 2.6, 920, 1020, { n: 3, cell: 5 })
    if (rv > 0.5) bubble(x, t, 540, 700, S.R + 0.3, S.D + 1, 'everyone’s my plus-one.', { size: 32 })
  },
  cues: [['boom', 0.0, 0.12], ['clap', 3.7, { gain: 0.12, pan: -0.3 }], ['clap', 3.95, { gain: 0.12, pan: 0.3 }], ['clap', 4.2, { gain: 0.14 }], ['glitter', 3.1, 3.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
