// kwme07: WAIT, THAT'S ME, "Sending the text, then throwing my phone" (7 s loop, star_advice trial, music: house · A♭).
//   0.00  frame 0: the camera mid-whip, ♈ Aries mid-throw, the phone spinning through the air toward a pillow pile; hook on.
//   0.55  it lands in the pillows.  1.4 BZZ BZZ (it lights up).  1.8–2.4 Aries dives in after it and hugs it.
//   3.4–4.9  the slow turn, phone clutched.  5.0  last line: "anyway, did they reply."   6.55–7 loop back.
import { makeWM, wmMusic, box, phone, label, sms, pop01, outK, prog, ease, lerp, clamp, MINT } from '../../kwme01/wmkit.js'

const H = { x: 600, y: 1200, s: 400, face: 1 }
const LAND = 0.55, BUZZ = 1.4, DIVE = [1.8, 2.4], TURN = 3.4
const PILE = { x: 700, y: 1250 }
function pile(x) {
  box(x, PILE.x - 200, PILE.y - 30, 230, 120, '#f6b7c9', { bw: 6, hi: '#ffd8e2' })
  box(x, PILE.x - 20, PILE.y - 60, 210, 140, '#9fd0ff', { bw: 6, hi: '#c9e6ff' })
  box(x, PILE.x - 110, PILE.y - 110, 200, 100, '#c9a6ff', { bw: 6, hi: '#e2ccff' })
}
function phonePos(t) {
  const d = ease.inOutCubic(prog(t, ...DIVE))
  if (t < LAND) { const p = prog(t, -0.6, LAND); return { x: lerp(420, PILE.x - 10, p), y: 980 - 420 * Math.sin(Math.PI * p) + p * 230, rot: p * 14, glow: 0 } }
  const bz = t > BUZZ && t < DIVE[1] ? 10 * Math.sin(t * 70) : 0
  return { x: lerp(PILE.x - 10, H.x + 30, d) + bz, y: lerp(1210, 1290, d), rot: lerp(0.3, -0.1, d), glow: t > BUZZ ? 1 : 0 }
}
const EP = makeWM({
  id: 'kwme07', dur: 7, sign: 'aries', turn: TURN, brk: 'whip',
  hook: 'Sending the text, | then *throwing* my phone',
  last: 'anyway, did they reply.',
  hero: H, wash: '#b0402f',
  heroOpts: (t) => {
    const d = ease.inOutCubic(prog(t, ...DIVE))
    return { x: lerp(330, H.x, d), mood: t < BUZZ ? 'wide' : t < DIVE[1] ? 'sparkle' : 'happy', look: [1, t < LAND ? -0.5 : 0.6], hops: [0.0, BUZZ + 0.1, DIVE[0]], tilt: 0.12 }
  },
  back(x) { pile(x) },
  front(x, t) {
    const P = phonePos(t)
    phone(x, P.x, P.y, { w: 170, h: 300, rot: P.rot, screen: P.glow ? '#2a3a5a' : '#14102a', draw: P.glow ? (c, w) => sms(c, 'haha yes!! when?', 'L', 60, w, { size: 22 }) : null })
    const bk = pop01(t, BUZZ, 0.2, 3) * outK(t, [DIVE[0] + 0.3, DIVE[0] + 0.45])
    if (bk > 0.01) { label(x, 'BZZ', PILE.x + 120, 1100, { size: 60 * bk, col: MINT, rot: 0.2 }); label(x, 'BZZ', PILE.x - 160, 1060, { size: 46 * bk, col: MINT, rot: -0.2 }) }
  },
  cues: [['whoosh', 0.05, 0.4, 0.05], ['boom', LAND, 0.12], ['pop', LAND + 0.02, 330, 0.04, 0.3], ['chip', BUZZ, 110, 0.12, { gain: 0.05, wave: 'square' }], ['chip', BUZZ + 0.18, 110, 0.12, { gain: 0.05, wave: 'square' }], ['whoosh', DIVE[0], 0.5, 0.05], ['pop', DIVE[1], 987.77, 0.05, 0]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'house', key: 'Ab', seed: 2607 })
void clamp
