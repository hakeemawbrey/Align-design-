// kgse05: GUESS THE SIGN, "Reading it from the lock screen" (9 s vertical, star_advice trial, cinematic · Dm, hard cut).
//   0.00  frame 0: the silhouette mid-lean over a lock screen, a red "caught" circle already round it.
//         Hook: "Reads it from the lock screen. *Strategically.*"
//   0.35  record scratch + freeze · long-press preview, the whole message read, still no "seen"
//   C1 "sunglasses at night" · C2 "a magnifying glass" · buzz · 3·2·1 · reveal: SCORPIO · last line, hard cut
import { caught, caughtCues } from '../../hookkit.js'
import { makeGuess, box, R, phone, bubble, shadow, chat, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const CAUGHT = { at: -1, x: 760, y: 900, r: 230, out: [1.1, 1.3], label: 'CAUGHT IN 4K', arrow: 'bl', rec: false }
function lock(u, S) {
  return (x, w, h) => {
    R(x, '#120e28', 0, 0, w, h)
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 60px ${INTER}`; x.fillStyle = BONE; x.fillText('11:47', w / 2, 70)
    x.font = `700 16px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText('🔒 locked', w / 2, 112)
    const ex = clamp(prog(u, 1.6, 2.1))
    const hh = lerp(70, 210, ease.outCubic(ex))
    R(x, 'rgba(60,52,110,0.95)', 12, 140, w - 24, hh)
    x.textAlign = 'left'; x.font = `800 17px ${INTER}`; x.fillStyle = CYAN; x.fillText('them · now', 24, 160)
    x.font = `700 17px ${INTER}`; x.fillStyle = BONE
    const lines = ['hey are you up? i wanted', 'to say sorry about earlier,', 'i was stressed and it came', 'out wrong. can we talk', 'tomorrow?']
    lines.slice(0, ex > 0.5 ? 5 : 1).forEach((l, i) => x.fillText(i === 0 && ex < 0.5 ? 'hey are you up? i wan…' : l, 24, 186 + i * 22))
    if (u > 2.4) { x.font = `800 15px ${MONO}`; x.fillStyle = MINT; x.fillText('“seen”: not sent', 24, h - 26) }
  }
}
function shades(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const d of [-1, 1]) { R(x, INK, d * 62 - 48, -26, 96, 56); R(x, '#2b2140', d * 62 - 42, -20, 84, 44); R(x, 'rgba(255,255,255,0.6)', d * 62 - 34, -14, 24, 8) }
  R(x, INK, -16, -12, 32, 12)
  x.restore()
}
function magnifier(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.6 + 0.05 * Math.sin(t * 3)); x.scale(k, k)
  R(x, INK, -12, 50, 24, 120); R(x, '#a07850', -7, 54, 14, 112)
  x.lineWidth = 20; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 60, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 11; x.strokeStyle = '#c9c4d8'; x.stroke(); x.fillStyle = 'rgba(180,230,255,0.25)'; x.fill()
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse05', sign: 'scorpio', D: 9, ending: 'cut', brk: 'scratch', brkAt: 0.4, scratchCap: 'no. they did *not* open it.',
  hook: 'Reads it from the lock screen. | *Strategically.*',
  clues: ['sunglasses at night', 'a magnifying glass'],
  last: 'Open it when you’re | *ready to answer.*',
  scenes: [caught(CAUGHT)],
  draw(x, S) {
    const { t, u, rv, T } = S
    const lean = rv > 0.5 ? 0 : 0.22 + 0.03 * Math.sin(u * 2)
    shadow(x, 470, 1240, 300)
    const o = { x: 430, y: 1010, s: 380, mood: rv > 0.5 ? 'happy' : 'squint', look: [1, 0.4], hops: [2.0, 3.2].filter(h => h < S.R), rot: lean, squash: 0.04 }
    S.sil(o)
    if (t > T.C1) shades(x, o.x + 18, o.y - 20, pop01(t, T.C1 + 0.05, 0.3, 2.6))
    phone(x, 770, 900, { w: 270, h: 450, rot: -0.08, fn: lock(u, S) })
    if (T.C2 != null) magnifier(x, 650, 820, pop01(t, T.C2 + 0.05, 0.3, 2.4), t)
    if (rv > 0.5) bubble(x, t, 380, 690, S.R + 0.3, S.D + 1, 'okay. opening it.', { size: 32, tail: 0.3 })
  },
  cues: [...caughtCues({ ...CAUGHT, at: 0 }).filter(c => c[1] < 0.3), ['whoosh', 1.6, 0.4, 0.03], ['pop', 1.7, 659.25, 0.04, 0.2], ['tick', 2.45, 0.06]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
