// kpte14: THE 10-SECOND PEP TALK, Ep 14 "Virgo, take your own advice" (17.2 s vertical, batch m14, funk · A).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♌ Leo mid-lunge, spinning Virgo's own advice pages back at Virgo, pages mid-air · "Virgo. Read |
//              your *own* advice." · record scratch + freeze at 0.42 · chip "the friend who gives advice | *and never takes it*".
//   3.0–5.4    the spiral: on a call to a friend: "you deserve BETTER!!" · then their own thread: "can't tonight, sorry"
//              → "no worries!! whenever works :)"
//   5.4–15.4   "you'd never let your friend *settle.*" · "so don't let *you.*" (the advice card flips to face Virgo) ·
//              "talk to you like you talk to *them.*" (a mirror with a heart).
//   15.4–17.2  "Be *your* own | best friend tonight."  Hard cut.
import { makePep, room, phone, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, drawBits, HEART } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#262252', wall2: '#211d4c', floor: '#30294a', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function page(x, cx, cy, rot, s = 1) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); box(x, -50, -64, 100, 128, BONE, { b: 4 }); x.font = "800 14px Inter"; x.fillStyle = PEP; x.textAlign = 'center'; x.fillText('ADVICE', 0, -40); for (let j = 0; j < 4; j++) R(x, '#b9b0c8', -36, -24 + j * 20, 72, 6); x.restore() }
function hook(x, t, S) {
  den(x, t)
  for (let i = 0; i < 6; i++) { const a = t * 2.2 + i * 1.05; page(x, 760 + Math.cos(a) * 200, 820 + Math.sin(a) * 120, a, 0.9) }
  S.L(x, t, { x: 760, y: 860, s: 220, mood: 'wide', look: [0, 0], blink: false })
}
const MSGS = [{ at: 4.1, side: 'L', text: 'can’t tonight, sorry' }, { at: 4.6, side: 'R', text: 'no worries!! whenever works :)' }]
function spiral(x, t, S) {
  den(x, t)
  if (t < 4.0) {
    S.L(x, t, { x: 360, y: 1050, s: 260, mood: 'wide', look: [1, -0.3], hops: [3.2, 3.5, 3.8] })
    R(x, INK, 430, 930, 50, 90); R(x, '#7fd0ff', 434, 934, 42, 82)
  } else {
    phone(x, t, { cx: 620, top: 640, w: 600, h: 520, title: '♍︎ them', msgs: MSGS, size: 36, glowA: 1 })
    S.L(x, t, { x: 200, y: 1250, s: 200, mood: 'happy', look: [1, -0.6], squash: 0.04 })
  }
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t > w0 + 0.4 && t < w1) note(x, 560, 660, 'SETTLE? | not on my watch.', { w: 420, h: 150, col: '#fff2c4', size: 36, k: pop01(t, w0 + 0.4, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]), rot: -0.04 })
  if (t > w1 + 0.4 && t < w2) {
    const k = outK(t, [w2 - 0.25, w2]), fl = ease.inOutCubic(prog(t, w1 + 0.9, w1 + 1.4))
    x.save(); x.translate(560, 660); x.scale(Math.cos(Math.PI * fl) * k, k)
    box(x, -200, -90, 400, 180, fl < 0.5 ? '#fff2c4' : MINT, { b: 6 })
    x.font = "800 34px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    if (fl < 0.5) { x.fillText('to: my friend', 0, -30); x.fillText('“you deserve better”', 0, 20) } else { x.scale(-1, 1); x.fillText('to: ME', 0, -30); x.fillText('“you deserve better”', 0, 20) }
    x.restore()
  }
  if (t > w2 + 0.4) {
    const k = pop01(t, w2 + 0.4, 0.3, 2.4)
    x.save(); x.translate(560, 680); x.scale(k, k); box(x, -110, -150, 220, 300, '#9fd8f6', { b: 8 }); R(x, '#d9f1fd', -96, -136, 192, 272); x.restore()
    if (k > 0.5) { S.L(x, t, { x: 560, y: 690, s: 150, mood: 'happy', look: [0, 0], glyph: false }); drawBits(x, HEART, { H: '#ff5c8a' }, 620, 600, 6) }
  }
}
const EP = makePep({
  id: 'kpte14', sign: 'virgo', coach: 'leo', end: 'cut', brk: 'scratch', scratchCap: 'great advice. for *everyone else.*',
  hookLine: 'Virgo. Read | your *own* advice.',
  premise: 'the friend who gives advice | *and never takes it*',
  lines: ['you’d never let your friend *settle.*', 'so don’t let *you.*', 'talk to you like you talk to *them.*'],
  last: 'Be *your* own | best friend tonight.', lastLate: 0,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  bubbles: [{ t0: 3.15, t1: 3.98, x: 560, y: 860, text: 'you deserve BETTER!!', size: 40, tail: -0.4 }],
  cues: [['pop', 4.1, 659.25, 0.04, -0.3], ['pop', 4.6, 880, 0.04, 0.3], ['pluck', 4.8, 247, 0.03, 0.5, 0], ['pop', 6.25, 1174.66, 0.04, 0], ['whoosh', 9.85, 0.4, 0.04], ['pop', 10.3, 1318.51, 0.04, 0], ['pop', 13.0, 1567.98, 0.04, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, GOLD, lerp]
