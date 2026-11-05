// kpte02: THE 10-SECOND PEP TALK, Ep 2 "Virgo, about that unanswered text" (17.6 s vertical, Month 2 batch m14, chiptune · A).
// Format kit: ../../kpte01/pepkit.js (no end card, no card transition). Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♐ Sagittarius mid-lunge, Virgo's phone already knocked mid-air · "Virgo. Put. | The phone. *Down.*"
//              record scratch + freeze at 0.42 ("yep. *that's you.*") · chip "left on read, | *rereading your own text*".
//   3.0–5.4    the spiral: "hey! hope your week's going ok :)" · read 2:14 pm · Virgo's red pen edits it in their head.
//   5.4–15.4   "one quiet phone isn't a *verdict.*" (the VERDICT paper tears) · "you said it kindly. your part's *done.*"
//              (a ✓ list) · "go live your *evening.*" (phone face down, tea + a book).
//   15.4–17.6  "Your worth doesn't wait | for a *reply.*"  Loop back to frame 0.
import { makePep, room, couch, phone, note, stamp, label, mug, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, inSprite, starFrame, sweatCells } from '../../kpte01/pepkit.js'

function lounge(x, t) {
  room(x, t, { wall: '#262050', wall2: '#211a48', floor: '#33284a', win: { x: 680, y: 500, w: 280, h: 300 }, floorY: 1330 })
  couch(x, 640, 1080, 600, '#4f6fa8')
}
function miniPhone(x, cx, cy, rot, k = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -60, -110, 120, 220, '#2a2148', { b: 7 }); R(x, '#5fa8ff', -46, -60, 92, 40); R(x, '#14102a', -46, -16, 92, 100)
  x.font = "700 16px 'Space Mono', monospace"; x.fillStyle = '#9a94b8'; x.textAlign = 'center'; x.fillText('read', 0, 10)
  x.restore()
}
function hook(x, t, S) {
  lounge(x, t)
  S.L(x, t, { x: 760, y: 900, s: 230, mood: 'wide', look: [-0.8, -1], blink: false })
  // the phone, mid-flight out of Virgo's hand
  const p = (t * 0.6) % 1
  miniPhone(x, 600 + 80 * Math.sin(t * 1.3), 640 - 30 * Math.sin(t * 2), 0.6 + t * 3.2, 0.9)
  void p
}
const MSGS = [
  { at: 3.05, side: 'R', text: 'hey! hope your week’s going ok :)', read: 'read 2:14 pm' },
]
function spiral(x, t, S) {
  lounge(x, t)
  x.fillStyle = 'rgba(5,4,12,0.5)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 600, top: 640, w: 600, h: 560, title: '♍︎ to: them', msgs: MSGS, size: 40, glowA: 1 })
  // the red pen edits in Virgo's head
  const e = [[3.7, 'too many !?'], [4.2, 'the :) ??'], [4.7, 'rewrite?']]
  e.forEach(([at, s], i) => note(x, 380 + i * 170, 1290 + (i % 2) * 40, s, { w: 230, h: 70, col: '#ffd0d0', size: 28, rot: [-0.08, 0.06, -0.03][i], k: pop01(t, at, 0.25, 2.4), txt: RED }))
  S.L(x, t, { x: 200, y: 1160, s: 200, mood: 'wide', look: [1, -0.6], hops: [3.7, 4.2, 4.7], blink: false })
  inSprite(x, starFrame(200, 1160, 200, t, { seed: 3, hops: [3.7, 4.2, 4.7] }), () => sweatCells(x, t))
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  // line 0: the VERDICT paper tears in two
  if (t > w0 + 0.3 && t < w1) {
    const k = pop01(t, w0 + 0.3, 0.3, 2.2) * outK(t, [w1 - 0.25, w1])
    const tear = ease.outCubic(prog(t, w0 + 1.3, w0 + 1.8))
    for (const d of [-1, 1]) {
      x.save(); x.translate(560 + d * tear * 70, 640 + tear * 30); x.rotate(d * tear * 0.25); x.scale(k, k)
      x.beginPath(); x.rect(d < 0 ? -160 : 0, -100, 160, 200); x.clip()
      box(x, -150, -95, 300, 190, BONE, { b: 6 })
      x.font = "800 44px Inter"; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VERDICT', 0, -40)
      for (let i = 0; i < 3; i++) R(x, '#b9b0c8', -110, 4 + i * 26, 220, 10)
      x.restore()
    }
  }
  // line 1: the ✓ list
  if (t > w1 + 0.3 && t < w2) {
    const k = outK(t, [w2 - 0.25, w2])
    ;['✓ said it kindly', '✓ meant it', '✓ your part: done'].forEach((s, i) => {
      const kk = pop01(t, w1 + 0.4 + i * 0.5, 0.25, 2.4) * k
      note(x, 560, 560 + i * 90, s, { w: 420, h: 72, col: i === 2 ? MINT : '#fff2c4', size: 32, k: kk, rot: [-0.03, 0.02, -0.01][i] })
    })
  }
  // line 2: phone face down, tea + a book
  if (t > w2 + 0.3) {
    const k = pop01(t, w2 + 0.3, 0.3, 2.4)
    x.save(); x.translate(540, 700); x.scale(k, k)
    box(x, -230, -20, 150, 30, '#2a2148', { b: 6 })
    label(x, 'face down', -155, -50, { size: 22, col: '#9a94b8' })
    x.restore()
    mug(x, t, 560, 720, { s: 1.2 * k, col: '#3fb08a' })
    if (k > 0.01) { x.save(); x.translate(700, 700); x.scale(k, k); box(x, -60, -24, 120, 40, '#e8344e', { b: 6 }); box(x, -54, -50, 110, 26, '#f2c75c', { b: 6 }); x.restore() }
  }
}
const EP = makePep({
  id: 'kpte02', sign: 'virgo', coach: 'sagittarius', end: 'loop', brk: 'scratch', scratchCap: 'rereading it. *again.*',
  hookLine: 'Virgo. Put. | The phone. *Down.*', hookSize: 104,
  premise: 'left on read, | *rereading your own text*',
  lines: ['one quiet phone isn’t a *verdict.*', 'you said it kindly. your part’s *done.*', 'go live your *evening.*'],
  last: 'Your worth doesn’t wait | for a *reply.*', lastLate: 2,
  hook, spiral, pep,
  cues: [['pop', 3.05, 880, 0.04, 0.3], ['pluck', 3.5, 392, 0.03, 0.3, 0], ['tick', 3.7, 0.04], ['tick', 4.2, 0.04], ['tick', 4.7, 0.04],
    ['whoosh', 7.05, 0.3, 0.04], ['tick', 7.1, 0.06], ['pop', 9.35, 987.77, 0.03, 0], ['pop', 9.85, 1174.66, 0.03, 0], ['pop', 10.35, 1318.51, 0.035, 0], ['tick', 12.5, 0.05]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, PEP, lerp]
