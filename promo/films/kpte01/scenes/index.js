// kpte01: THE 10-SECOND PEP TALK, Ep 1 "Cancer, you're not too much" (17.2 s vertical, Month 2 batch m14, pop · C).
// Format kit: ../pepkit.js (no end card, no card transition). Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♌ Leo mid-lunge into the lens, Cancer behind on the bed mid-voice-note (REC), tissues flying ·
//              "Cancer. | *Look at me.*" · whip zoom at 0.42 · chip "for when you think | you're *too much*".
//   3.0–5.4    the spiral: Cancer's thread: a 4-minute voice note, then "sorry for rambling", "sorry", "sorry that was
//              so long lol". Pisces sobs by the tissues.
//   5.4–15.4   the 10-second pep talk: "your feelings aren't a *burden.*" (a BURDEN weight lifts off) · "the right
//              people ask *follow-up questions.*" (a reply: "wait, THEN what happened??") · "stop apologising for
//              *caring.*" (SORRY gets stamped out). Cancer stands taller line by line.
//   15.4–17.2  "Not too much. *Exactly* enough."  Hard cut.
import { makePep, room, bed, phone, flyTissue, drawBits, stamp, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, clamp, pop01, outK, sweatCells, inSprite, starFrame } from '../../kpte01/pepkit.js'

function bedroom(x, t) {
  room(x, t, { wall: '#2b2152', wall2: '#261c4a', floor: '#3a2a4c', win: { x: 120, y: 520, w: 260, h: 300 }, floorY: 1330 })
  bed(x, 760, 960, { w: 560, sheet: '#ffb1a0', col: '#6a4fa8' })
}
function recPhone(x, t, cx, cy, rot = 0.12) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -48, -86, 96, 172, '#2a2148', { b: 6 }); R(x, '#14102a', -38, -70, 76, 130)
  R(x, RED, -26, -56, 14, 14); x.font = "700 16px 'Space Mono', monospace"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('REC', -8, -49)
  x.font = "700 18px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillText('4:12', 0, -16)
  for (let i = 0; i < 6; i++) { const h = 6 + 22 * Math.abs(Math.sin(t * 11 + i * 1.4)); R(x, PEP, -30 + i * 11, 26 - h / 2, 7, h) }
  x.restore()
}
function hook(x, t, S) {
  bedroom(x, t)
  // Cancer on the bed, mid-ramble into a voice note
  S.L(x, t, { x: 800, y: 840, s: 220, mood: 'wide', look: [-0.6, 0.2], hops: [0.2, 0.55, 0.9, 1.25, 1.6, 1.95, 2.3], blink: false })
  recPhone(x, t, 930, 820, 0.18 + 0.05 * Math.sin(t * 9))
  // tissues mid-flight from the box
  for (let i = 0; i < 5; i++) { const p = ((t * 0.45 + i * 0.21) % 1); flyTissue(x, 640 + i * 70 + Math.sin(t * 3 + i) * 30, 560 + i * 40 - p * 120 + 50 * Math.sin(i * 2.1), t * 2 + i, 0.9) }
}
const MSGS = [
  { at: 3.1, side: 'R', text: '▶ voice note · 4:12', col: '#ffb1a0' },
  { at: 3.65, side: 'R', text: 'sorry for rambling' },
  { at: 4.1, side: 'R', text: 'sorry' },
  { at: 4.55, side: 'R', text: 'sorry that was so long lol', read: 'read 11:48' },
]
function spiral(x, t, S) {
  bedroom(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 610, top: 640, w: 600, h: 600, title: '♋︎ to: my best friend', msgs: MSGS, size: 40, glowA: 1 })
  S.L(x, t, { x: 210, y: 1250, s: 200, mood: 'wide', look: [1, -0.4], hops: [3.65, 4.1, 4.55], blink: false })
  const F = starFrame(210, 1250, 200, t, { seed: 3, hops: [3.65, 4.1, 4.55] })
  inSprite(x, F, () => sweatCells(x, t))
}
function pep(x, t, S) {
  const { i, ui, LP } = S
  // line 0: the BURDEN weight lifts off Cancer and floats away
  const w0 = S.T.lines[0]
  if (t > S.T.pep[0]) {
    const lift = ease.inOutCubic(prog(t, w0 + 0.7, w0 + 2.2))
    const wy = lerp(LP.y - 190, LP.y - 900, lift), wx = LP.x + 30 * lift
    if (lift < 1) {
      x.save(); x.globalAlpha = 1 - prog(t, w0 + 1.8, w0 + 2.2)
      box(x, wx - 120, wy - 60, 240, 110, '#5a5470', { b: 7, hi: '#77708e' }); R(x, INK, wx - 40, wy - 90, 80, 30); R(x, '#5a5470', wx - 30, wy - 84, 60, 20)
      x.font = "800 40px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BURDEN', wx, wy + 2)
      if (lift > 0) for (let k = 0; k < 2; k++) { const bx = wx + (k ? 90 : -90); R(x, INK, bx - 16, wy - 130 - 20 * Math.sin(t * 10 + k), 32, 24); R(x, BONE, bx - 12, wy - 126 - 20 * Math.sin(t * 10 + k), 24, 16) }
      x.restore()
    }
  }
  // line 1: a friend's reply bubble pops on a little phone
  const w1 = S.T.lines[1]
  if (t > w1 + 0.5 && t < S.T.lines[2] + 0.2) {
    const k = pop01(t, w1 + 0.5, 0.3, 2.4) * outK(t, [S.T.lines[2], S.T.lines[2] + 0.2])
    x.save(); x.translate(540, 640); x.scale(k, k)
    x.font = "800 36px Inter"; const bw = x.measureText('wait, THEN what happened??').width + 60
    box(x, -bw / 2, -60, bw, 120, BONE, { b: 6 })
    x.font = "800 36px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('wait, THEN what happened??', 0, 2)
    x.restore()
    label(x, '♌︎ a friend who actually listens', 540, 740, { size: 26, col: GOLD, alpha: k })
  }
  // line 2: SORRY gets stamped out
  const w2 = S.T.lines[2]
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.25, 2.4)
    x.save(); x.translate(560, 650); x.rotate(-0.05); x.scale(k, k)
    x.font = "800 92px Inter"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('SORRY', 5, 7); x.fillStyle = BONE; x.fillText('SORRY', 0, 0)
    x.restore()
    const xk = pop01(t, w2 + 1.1, 0.2, 3)
    if (xk > 0.01) { x.save(); x.translate(560, 650); x.scale(xk, xk); for (const r of [0.5, -0.5]) { x.save(); x.rotate(r); R(x, INK, -200, -18, 400, 36); R(x, RED, -194, -12, 388, 24); x.restore() } x.restore() }
  }
  void i; void ui; void clamp; void drawBits; void stamp; void MINT
}
function fin(x, t, S) {
  // Cancer's little shell of a pillow, now a crown of hearts
  void x; void t; void S
}

const EP = makePep({
  id: 'kpte01', sign: 'cancer', coach: 'leo', end: 'cut', brk: 'whip',
  hookLine: 'Cancer. | *Look at me.*',
  premise: 'for when you think | you’re *too much*',
  lines: ['your feelings aren’t a *burden.*', 'the right people ask *follow-up questions.*', 'stop apologising for *caring.*'],
  last: 'Not too much. | *Exactly* enough.', lastLate: 2,
  hook, spiral, pep, fin,
  cues: [['pop', 3.1, 659.25, 0.04, 0.3], ['pop', 3.65, 739.99, 0.035, 0.3], ['pop', 4.1, 880, 0.035, 0.3], ['pop', 4.55, 987.77, 0.035, 0.3],
    ['whoosh', 6.45, 0.6, 0.03], ['pop', 9.45, 1318.51, 0.04, 0.1], ['tom', 13.25, 110, { gain: 0.2, decay: 0.2 }], ['tick', 13.25, 0.06]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
