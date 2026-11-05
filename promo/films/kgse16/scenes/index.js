// kgse16: GUESS THE SIGN, "Typed “what are we” and deleted it" (9 s vertical, star_advice trial, synthwave · Cm, loop).
//   0.00  frame 0: the silhouette mid-backspace, letters flying off the phone screen.
//         Hook: "Typed ‘what are we?’ *Deleted it.*"
//   0.35  colour flash · types it again, letter by letter… deletes it again
//   C1 "two coffee cups" · C2 "two phones" · buzz · 3·2·1 · reveal: GEMINI · last line · loop
import { makeGuess, box, R, phone, bubble, shadow, chat, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const Q = 'what are we?'
// typed length over scene time: deleting at frame 0, retyped, deleted, retyped (then the reveal)
function typed(u) {
  if (u < 0.6) return Math.round(Q.length * (1 - u / 0.6))
  if (u < 2.0) return Math.round(Q.length * clamp((u - 0.8) / 1.0))
  if (u < 3.0) return Q.length
  if (u < 3.4) return Math.round(Q.length * (1 - (u - 3.0) / 0.4))
  return Math.round(Q.length * clamp((u - 3.8) / 1.0))
}
function scr(u, S) {
  return (x, w, h) => {
    R(x, '#1a1634', 0, 0, w, h)
    x.font = `800 17px ${INTER}`; x.fillStyle = CYAN; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('them', 12, 18)
    chat(x, 'today was really fun', 10, 40, { size: 16 }); chat(x, 'same!! :)', w - 10, 84, { me: true, size: 16 })
    R(x, '#2e2752', 8, h - 70, w - 16, 54)
    x.font = `700 20px ${INTER}`; x.fillStyle = BONE; const n = typed(u); x.fillText(Q.slice(0, n) + (Math.floor(u * 3) % 2 ? '|' : ''), 18, h - 43)
    if (S.rv > 0.5) { chat(x, 'what are we? (no pressure)', w - 10, 128, { me: true, size: 15 }); x.font = `700 13px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'right'; x.fillText('sent', w - 12, 168) }
  }
}
function flying(x, u) {
  // letters flying off at frame 0 and on the second delete
  for (const [a, b] of [[-0.3, 0.6], [3.0, 3.4]]) {
    if (u < a || u > b + 0.8) continue
    for (let i = 0; i < Q.length; i++) {
      const p = clamp((u - a - i * 0.03) / 0.8); if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = 1 - p; label(x, Q[i], 700 + i * 12 + p * (i - 6) * 40, 1040 - p * 420 + p * p * 200, { size: 46, col: BONE, font: INTER, weight: 900, rot: p * (i % 2 ? 2 : -2) }); x.restore()
    }
  }
}
function cups(x, k, t) {
  if (k <= 0.01) return
  for (const [cx, c] of [[150, '#ef5c94'], [240, '#7fd0ff']]) { x.save(); x.translate(cx, 1190); x.scale(k, k); box(x, -36, -44, 72, 88, c, { b: 5 }); R(x, BONE, -36, -12, 72, 16); x.restore() }
}

export const EP = makeGuess({
  id: 'kgse16', sign: 'gemini', D: 9, ending: 'loop', brk: 'flash', flashCol: '#c9a6ff',
  hook: 'Typed ‘what are we?’ | *Deleted it.*',
  clues: ['two coffee cups', 'two phones'],
  last: 'Ask it kindly. | *You deserve the answer.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    const del = (u < 0.6) || (u > 3.0 && u < 3.4)
    const o = { x: 420, y: 1030, s: 350, mood: rv > 0.5 ? 'happy' : del ? 'squint' : 'neutral', look: [1, 0.3], hops: [0.9, 1.2, 1.5, 1.8, 3.9, 4.2].filter(h => h < S.R), rot: del ? 0.06 * Math.sin(u * 40) : 0.08, squash: del ? 0.06 : 0 }
    shadow(x, 420, 1250, 290)
    S.sil(o)
    phone(x, 760, 900, { w: 260, h: 420, rot: 0.08, fn: scr(u, S) })
    flying(x, u)
    if (t > T.C1) cups(x, pop01(t, T.C1 + 0.05, 0.3, 2.4), t)
    if (T.C2 != null) phone(x, 220, 800, { w: 120, h: 190, rot: -0.2, k: pop01(t, T.C2 + 0.05, 0.3, 2.4) * 0.9, fn: (x2, w, h) => { R(x2, '#1a1634', 0, 0, w, h); chat(x2, 'help', 6, 20, { size: 13 }) } })
    if (rv > 0.5) bubble(x, t, 420, 760, S.R + 0.3, S.D + 1, 'sent it. breathing.', { size: 32 })
  },
  cues: [['tick', 0.05, 0.05], ['tick', 0.2, 0.05], ['tick', 0.35, 0.05], ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.85 + i * 0.17).toFixed(3), 0.04]), ['whoosh', 3.0, 0.4, 0.04], ['tick', 3.1, 0.05], ['tick', 3.25, 0.05]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
