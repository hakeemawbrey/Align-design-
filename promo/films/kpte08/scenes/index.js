// kpte08: THE 10-SECOND PEP TALK, Ep 8 "Scorpio, say the soft thing" (17.2 s vertical, batch m14, cinematic · Dm).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md. Pisces is the coach (and cries the whole time).
//   0.0–3.0    frame 0: ♓ Pisces mid-sob pressed to the lens, Scorpio behind peeking over a brick wall · "Scorpio. | Say
//              the *soft* thing." · freeze frame at 0.42 · chip "scared to say | *‘I like you’*".
//   3.0–5.4    the spiral: typed "i like you"… deleted… sent: "lol".
//   5.4–15.4   "walls keep out the *right ones* too." · "soft isn't weak. soft is *brave.*" · "say it once,
//              *plainly.*" A brick falls out of the wall with each line; Scorpio peeks out more.
//   15.4–17.2  "Say it soft. | Mean it *out loud.*"  Hard cut.
import { makePep, room, phone, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits, HEART } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#241a40', wall2: '#20163a', floor: '#2e2240', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function wall(x, cx, top, w, rows, gone = 0) {
  for (let j = 0; j < rows; j++) for (let i = 0; i < Math.ceil(w / 90) + 1; i++) {
    const bx = cx - w / 2 + i * 90 - (j % 2 ? 45 : 0), by = top + j * 46
    if (bx < cx - w / 2 - 10 || bx + 84 > cx + w / 2 + 50) continue
    const id = j * 10 + i
    if (gone > 0 && [12, 3, 21].slice(0, Math.floor(gone)).includes(id)) continue
    box(x, bx, by, 84, 40, '#a8463a', { b: 4, hi: '#c25a4a' })
  }
}
function hook(x, t, S) {
  den(x, t)
  S.L(x, t, { x: 780, y: 840, s: 210, mood: 'squint', look: [-1, 0.2] })
  wall(x, 780, 860, 420, 9)
}
const MSGS = [{ at: 4.6, side: 'R', text: 'lol' }]
function spiral(x, t, S) {
  den(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 620, top: 640, w: 600, h: 560, title: '♏︎ to: them', msgs: MSGS, size: 40, glowA: 1 })
  // the draft line: typed, deleted
  const full = 'i like you', n = t < 4.0 ? Math.floor(prog(t, 3.1, 3.8) * full.length) : Math.max(0, full.length - Math.floor(prog(t, 4.0, 4.4) * full.length))
  if (t < 4.6) { box(x, 350, 1110, 540, 60, '#2a2148', { b: 4 }); x.font = "700 34px Inter"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(full.slice(0, n) + (Math.floor(t * 4) % 2 ? '|' : ''), 370, 1141) }
  S.L(x, t, { x: 200, y: 1230, s: 210, mood: t > 4.6 ? 'squint' : 'wide', look: [1, -0.6], blink: false })
  if (t > 4.0 && t < 4.6) label(x, 'DELETE ×10', 620, 1220, { size: 30, col: '#ff8fa0' })
}
function pep(x, t, S) {
  const gone = S.T.lines.filter(v => t > v + 0.6).length
  // the wall, losing a brick per line; Scorpio peeks over it
  wall(x, S.LP.x, 1000, 380, 7, gone)
  S.T.lines.forEach((v, i) => { const p = prog(t, v + 0.6, v + 1.4); if (p > 0 && p < 1) { x.save(); x.translate(S.LP.x - 120 + i * 90, 1050 + p * 300); x.rotate(p * 4); box(x, -42, -20, 84, 40, '#a8463a', { b: 4 }); x.restore() } })
  if (t > S.T.lines[2] + 1.2) { const k = pop01(t, S.T.lines[2] + 1.2, 0.3, 2.4); drawBits(x, HEART, { H: '#ff5c8a' }, S.LP.x, 860, 9 * k) }
}
const EP = makePep({
  id: 'kpte08', sign: 'scorpio', coach: 'pisces', end: 'cut', brk: 'scratch', scratchCap: 'typed it. *deleted it.*',
  hookLine: 'Scorpio. | Say the *soft* thing.',
  premise: 'scared to say | *‘I like you’*',
  lines: ['walls keep out the *right ones* too.', 'soft isn’t weak. soft is *brave.*', 'say it once, *plainly.*'],
  last: 'Say it soft. | Mean it *out loud.*', lastLate: 3,
  lpos: { x: 760, y: 960, s: 250 },
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [...Array.from({ length: 8 }, (_, i) => ['tick', 3.1 + i * 0.09, 0.025]), ...Array.from({ length: 6 }, (_, i) => ['tick', 4.0 + i * 0.07, 0.03]), ['pop', 4.6, 659.25, 0.04, 0.3], ['pluck', 4.75, 220, 0.03, 0.6, 0],
    ['tom', 6.6, 120, { gain: 0.18, decay: 0.2 }], ['tom', 9.8, 110, { gain: 0.18, decay: 0.2 }], ['tom', 13.0, 100, { gain: 0.2, decay: 0.2 }], ['pluck', 13.4, 1318.51, 0.035, 0.6, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [note, RED, PEP, GOLD, MINT, ease, lerp, outK]
