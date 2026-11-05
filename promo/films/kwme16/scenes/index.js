// kwme16: WAIT, THAT'S ME, "Saving the receipt from our first date" (9 s loop, star_advice trial, music: jazzy · D).
//   0.00  frame 0: ♋ Cancer mid-kiss of a little paper receipt, hearts mid-burst; hook on.  0.32 colour flash.
//   1.4   the receipt is pressed into a scrapbook page, then a napkin 2.0, a straw 2.5, a fortune slip 3.0.
//   4.8–6.3  the slow turn.  6.4  last line: "it had both our orders on it."   8.55–9 loop back.
import { makeWM, wmMusic, box, drawBits, label, pop01, prog, ease, lerp, HEART, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 310, y: 1200, s: 400, face: 1 }
const B = { x: 750, y: 900, w: 480, h: 620 }
const PRESS = [1.4, 2.0, 2.5, 3.0], TURN = 4.8
function receipt(x, cx, cy, rot, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -110, 140, 220, '#ffffff', { bw: 4, ink: '#8a84a8' })
  x.font = "700 16px 'Space Mono', monospace"; x.fillStyle = INK; x.textAlign = 'left'
  ;['2 noodles', '1 dumplings', '2 teas', '- - - - - -', 'thank you!'].forEach((l, i) => x.fillText(l, -56, -70 + i * 34))
  x.restore()
}
function book(x, t) {
  box(x, B.x - B.w / 2, B.y - B.h / 2, B.w, B.h, '#f4e8cc', { bw: 8 })
  label(x, 'first date ♡', B.x, B.y - B.h / 2 + 46, { size: 36, col: '#c42a3f', stroke: null, font: "'EB Garamond', serif", weight: 500 })
  const k = i => pop01(t, PRESS[i], 0.3, 2.4)
  const p = ease.inOutCubic(prog(t, PRESS[0] - 0.5, PRESS[0]))
  if (t > PRESS[0] - 0.5) receipt(x, lerp(H.x + 80, B.x - 110, p), lerp(H.y - 120, B.y - 80, p), lerp(0.3, -0.08, p), lerp(0.8, 1, p))
  if (k(1) > 0.01) { x.save(); x.translate(B.x + 110, B.y - 130); x.rotate(0.1); x.scale(k(1), k(1)); box(x, -80, -80, 160, 160, '#ffffff', { bw: 4, ink: '#8a84a8' }); drawBits(x, HEART, { H: '#ff8fb1' }, 0, 0, 10); x.restore() }
  if (k(2) > 0.01) { x.save(); x.translate(B.x + 100, B.y + 110); x.rotate(-0.7); x.scale(k(2), k(2)); box(x, -12, -110, 24, 220, '#ff5c8e', { bw: 4 }); x.restore() }
  if (k(3) > 0.01) { x.save(); x.translate(B.x - 60, B.y + 200); x.rotate(-0.05); x.scale(k(3), k(3)); box(x, -150, -34, 300, 68, '#ffffff', { bw: 4, ink: '#8a84a8' }); label(x, 'good things ahead', 0, 2, { size: 24, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700 }); x.restore() }
}
const EP = makeWM({
  id: 'kwme16', dur: 9, sign: 'cancer', turn: TURN, brk: 'flash',
  hook: '*Saving the receipt* | from our first date',
  last: 'it had both our orders on it.',
  hero: H, wash: '#b05a3a',
  heroOpts: (t) => ({ mood: t < PRESS[0] - 0.4 ? 'heart' : 'sparkle', look: [1, -0.4], hops: [-0.1, ...PRESS], tilt: 0.06 }),
  back(x, t) { book(x, t) },
  front(x, t) {
    if (t < PRESS[0] - 0.5) receipt(x, H.x + 80, H.y - 120, 0.3, 0.8)
    const tt = t + 0.3
    if (tt > 0 && tt < 1.4) for (let i = 0; i < 6; i++) drawBits(x, HEART, { H: i % 2 ? '#ff5c8e' : '#ff8fb1' }, H.x + 80 + Math.cos(i) * tt * 260, H.y - 160 - tt * 220 + Math.sin(i * 2) * 60, 8, { alpha: 1 - tt / 1.4 })
  },
  cues: [['pluck', 0.02, 1174.66, 0.03, 0.4, 0], ...PRESS.map((v, i) => ['pop', v, 659.25 * (1 + i * 0.2), 0.045, 0.3]), ['bell', PRESS[3] + 0.05, 1760, 0.025, 0.8, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'jazzy', key: 'D', seed: 2616 })
void BONE
