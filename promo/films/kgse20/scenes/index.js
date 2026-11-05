// kgse20: GUESS THE SIGN, "“You pick.” (They minded.)" (8 s vertical, star_advice trial, pop · D, loop).
//   0.00  frame 0: the silhouette mid-smile with a twitching eye, two menus flying.
//         Hook: "‘I don’t mind, you pick.’ *Minded.*"
//   0.35  record scratch + freeze · the date picks BURGERS; the thought bubble was PASTA all along
//   C1 "a hand mirror" · C2 "a pastel scarf" · buzz · 3·2·1 · reveal: LIBRA · last line · loop
import { makeGuess, box, R, bubble, shadow, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

function menu(x, cx, cy, rot, title, col, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -90, -120, 180, 240, col, { b: 6 }); R(x, BONE, -76, -60, 152, 160)
  x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, 0, -90)
  for (let i = 0; i < 5; i++) R(x, '#8a8098', -60, -40 + i * 28, 120 - (i % 2) * 30, 8)
  x.restore()
}
function thought(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [dx, dy, r] of [[-120, 130, 14], [-90, 96, 22]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 160, 80, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 0, 152, 72, 0, 0, Math.PI * 2); x.fill()
  x.font = `900 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e163d6'; x.fillText('PASTA ✨', 0, 4 + 3 * Math.sin(t * 5))
  x.restore()
}
function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.3); x.scale(k, k)
  R(x, INK, -12, 50, 24, 100); R(x, '#e163d6', -7, 54, 14, 92)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 60, 70, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e163d6'; x.beginPath(); x.ellipse(0, 0, 54, 64, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfeaff'; x.beginPath(); x.ellipse(0, 0, 44, 54, 0, 0, Math.PI * 2); x.fill(); R(x, '#ffffff', -24, -30, 12, 24)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse20', sign: 'libra', D: 8, ending: 'loop', brk: 'scratch', scratchCap: '“anything’s fine!” *(it was not)*',
  hook: '‘I don’t mind, you pick.’ | *Minded.*',
  clues: ['a hand mirror', 'a pastel scarf'],
  last: 'Say what you want. | *It’s allowed.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    // two menus flying at frame 0, then settling on the table
    const fl = clamp(u / 1.3)
    menu(x, lerp(180, 230, fl), lerp(560, 1130, ease.outCubic(fl)), lerp(-0.8, -0.1, fl), 'BURGERS', '#d9824a')
    menu(x, lerp(900, 850, fl), lerp(520, 1130, ease.outCubic(fl)), lerp(0.9, 0.1, fl), 'PASTA', '#e163d6')
    // the date picks
    S.star('aries', { x: 860, y: 900, s: 200, mood: 'happy', look: [-1, 0], seed: 12, hops: [1.4, 1.8] })
    bubble(x, t, 860, 740, 1.4, S.R, 'burgers?!', { size: 34 })
    const tw = u > 1.6 && rv < 0.5 ? 0.04 * Math.sin(u * 60) * (Math.sin(u * 3) > 0.3 ? 1 : 0) : 0
    const o = { x: 430, y: 1000, s: 330, mood: rv > 0.5 ? 'happy' : 'squint', look: [1, 0], hops: [0.05, 2.0].filter(h => h < S.R), rot: -0.1 * Math.exp(-u * 2) + tw, squash: 0.04 }
    shadow(x, 430, 1230, 280)
    S.sil(o)
    if (u > 1.9 && rv < 0.5) label(x, '“yay!”', 300, 760, { size: 44, col: BONE, font: INTER, weight: 900, rot: -0.1 })
    thought(x, t, 400, 560, pop01(t, 2.2, 0.35, 2.2) * (rv > 0.5 ? outK(t, [S.R + 0.2, S.R + 0.4]) : 1))
    if (t > T.C1) mirror(x, 170, 860, pop01(t, T.C1 + 0.05, 0.3, 2.4))
    if (T.C2 != null && t > T.C2) { const k = pop01(t, T.C2 + 0.05, 0.3, 2); x.save(); x.globalAlpha = clamp(k * 2); R(x, INK, o.x - 140, o.y + 40, 280, 46); R(x, '#f2b8e0', o.x - 134, o.y + 46, 268, 34); R(x, INK, o.x + 60, o.y + 70, 50, 100); R(x, '#f2b8e0', o.x + 66, o.y + 76, 38, 88); x.restore() }
    if (rv > 0.5) bubble(x, t, 430, 760, S.R + 0.3, S.D + 1, 'actually… pasta?', { size: 34 })
    if (rv > 0.5) bubble(x, t, 860, 740, S.R + 0.8, S.D + 1, 'pasta!! love it', { size: 30, col: '#c8f5d4' })
  },
  cues: [['whoosh', 0.0, 0.6, 0.05], ['pop', 1.4, 1174.66, 0.04, 0.4], ['tick', 1.65, 0.05], ['tick', 1.75, 0.05], ['pluck', 2.2, 1318.51, 0.035, -0.3, 0.4]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
