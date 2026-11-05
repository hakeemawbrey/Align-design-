// kpte07: THE 10-SECOND PEP TALK, Ep 7 "Libra, a kind no is allowed" (17.6 s vertical, batch m14, jazzy · Bb).
// Format kit: ../../kpte01/pepkit.js. Rows: promo/films/month2/m14.md.
//   0.0–3.0    frame 0: ♈ Aries mid-lunge, a giant YES button yanked out from under Libra's finger · "Libra. | You can say
//              *no.*" · record scratch + freeze at 0.42 · chip "saying yes to a date | *you don't want*".
//   3.0–5.4    the spiral: "dinner friday? my treat!!" · Libra, sweating, types "sure!! sounds fun haha".
//   5.4–15.4   "‘no, thank you’ is a full *sentence.*" · "kind and honest fit in *one text.*" (the kind draft) · "a
//              pity yes wastes both your *Fridays.*" (two calendars, two sad Fridays → two free ones).
//   15.4–17.6  "Kind no. | *Free* Friday."  Loop.
import { makePep, room, phone, note, label, R, box, INK, BONE, RED, PEP, GOLD, MINT, prog, ease, lerp, pop01, outK, inSprite, starFrame, sweatCells } from '../../kpte01/pepkit.js'

function den(x, t) { room(x, t, { wall: '#232a52', wall2: '#1f254c', floor: '#2f2a4a', win: { x: 120, y: 500, w: 240, h: 280 }, floorY: 1330 }) }
function bigButton(x, cx, cy, text, col, k = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -150, 20, 300, 60); R(x, '#5a5470', -144, 26, 288, 48)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, 136, 70, 0, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.ellipse(0, 4, 126, 60, 0, 0, 7); x.fill()
  x.font = "800 58px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
function hook(x, t, S) {
  den(x, t)
  S.L(x, t, { x: 840, y: 860, s: 220, mood: 'wide', look: [-1, 0.6], blink: false })
  bigButton(x, 620 + 30 * Math.sin(t * 5), 740, 'YES', '#3fb08a', 0.9, -0.5 + 0.2 * Math.sin(t * 6))
}
const MSGS = [{ at: 3.05, side: 'L', text: 'dinner friday? my treat!!' }, { at: 4.55, side: 'R', text: 'sure!! sounds fun haha' }]
function spiral(x, t, S) {
  den(x, t)
  x.fillStyle = 'rgba(5,4,12,0.45)'; x.fillRect(0, 0, 1080, 1920)
  phone(x, t, { cx: 620, top: 640, w: 600, h: 560, title: '♎︎ to: the nice one', msgs: MSGS, typing: [3.6, 4.55], size: 38, glowA: 1 })
  S.L(x, t, { x: 200, y: 1230, s: 210, mood: t > 4.55 ? 'squint' : 'wide', look: [1, -0.6], blink: false })
  inSprite(x, starFrame(200, 1230, 210, t, { seed: 3 }), () => sweatCells(x, t))
  if (t > 4.6) label(x, '(does not want to)', 200, 1370, { size: 26, col: '#ff8fa0' })
}
function pep(x, t, S) {
  const [w0, w1, w2] = S.T.lines
  if (t < w1) note(x, 560, 640, '“No, thank you.”', { w: 440, h: 110, col: BONE, size: 42, rot: -0.03, k: pop01(t, w0 + 0.5, 0.3, 2.4) * outK(t, [w1 - 0.25, w1]) })
  if (t > w1 + 0.4 && t < w2) note(x, 560, 650, 'thanks for asking! | I don’t feel a spark, | but have a great Friday', { w: 520, h: 190, col: '#cfe6ff', size: 32, rot: 0.02, k: pop01(t, w1 + 0.4, 0.3, 2.4) * outK(t, [w2 - 0.25, w2]) })
  if (t > w2 + 0.4) {
    const flip = t > w2 + 1.6
    ;[-1, 1].forEach((d, i) => {
      const k = pop01(t, w2 + 0.4 + i * 0.15, 0.3, 2.4)
      x.save(); x.translate(560 + d * 140, 660); x.scale(k, k)
      box(x, -100, -90, 200, 180, BONE, { b: 6 }); R(x, RED, -100, -90, 200, 44)
      x.font = "800 26px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIDAY', 0, -67)
      x.font = "800 30px Inter"; x.fillStyle = flip ? '#2a8a5a' : '#7a6a9a'; x.fillText(flip ? 'FREE ✓' : 'meh.', 0, 12)
      x.restore()
    })
  }
}
const EP = makePep({
  id: 'kpte07', sign: 'libra', coach: 'aries', end: 'loop', brk: 'scratch', scratchCap: 'about to say *yes.* again.',
  hookLine: 'Libra. | You can say *no.*',
  premise: 'saying yes to a date | *you don’t want*',
  lines: ['‘no, thank you’ is a full *sentence.*', 'kind and honest fit in *one text.*', 'a pity yes wastes both your *Fridays.*'],
  last: 'Kind no. | *Free* Friday.', lastLate: 2,
  hook, spiral, pep,
  pepSet: (x, t) => den(x, t),
  cues: [['pop', 3.05, 880, 0.04, -0.3], ['tick', 3.7, 0.02], ['tick', 3.9, 0.02], ['tick', 4.1, 0.02], ['pop', 4.55, 659.25, 0.04, 0.3], ['pluck', 4.7, 247, 0.03, 0.5, 0],
    ['pop', 6.25, 1174.66, 0.04, 0], ['pop', 9.35, 987.77, 0.04, 0], ['bell', 13.75, 1760, 0.03, 0.8, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PEP, GOLD, MINT, ease, lerp]
