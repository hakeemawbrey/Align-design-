// r2a0588: star_advice, ADVICE SOLO (libra), "What Libras won't | *say out loud.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine things a Libra keeps quiet, each with a warm reframe and one light gag. Ending: group.
//   "I don't mind" (minds a lot) · let you pick the restaurant again · the scales wobble in a fight · rehearsed "no" in
//   the mirror · wants to be someone's first pick (a match: you) · lonely in a full room · the peacemaker takes a day off
//   · "are we good?" "always." · your side of the scale counts (the scales finally level)
//   group "Kind to everyone. | *You too.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'libra', ST = { x: -190 }

/** a gold balance scale; tilt in radians (0 = level). lw / rw: labels on the pans */
function scales(x, cx, cy, k, tilt, lw = '', rw = '') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 146, 168, 18)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-180, -10, 360, 20); x.fillStyle = GOLD; x.fillRect(-176, -6, 352, 12)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 170, 0); x.rotate(-tilt)
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, 110); x.moveTo(0, 0); x.lineTo(60, 110); x.stroke()
    x.fillStyle = INK; x.fillRect(-80, 104, 160, 28); x.fillStyle = GOLD; x.fillRect(-76, 108, 152, 20)
    const w = d < 0 ? lw : rw
    if (w) { x.fillStyle = BONE; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'bottom'; x.fillText(w, 0, 100) }
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“I don’t mind” means | *you do. That’s okay.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i don’t mind!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      L(x, 800, 960, 'MINDS: A LITTLE', pop01(t, P.t0 + 1.1, 0.3, 2.2), STEEL, 0.04, 34)
      L(x, 800, 1080, 'ALLOWED TO', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Let them pick again? | *Your pick counts too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: 'DINNER?', headBg: PINK, headInk: INK, lines: ['their pick', lt > 1.3 ? ['YOUR PICK ✓', '#c2185b'] : 'your pick'], size: 38, rot: -0.04 })
      sparkles(x, t, 800, 900, P.t0 + 1.7, 6, 160, 0.5)
    } },
  { sign: S, cap: 'Scared of conflict? | *Calm can still be honest.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lt < 1.4 ? 0.28 * Math.sin(t * 5) : 0.28 * Math.sin(t * 5) * Math.exp(-(lt - 1.4) * 3)
      scales(x, 770, 920, 0.75 * pop01(t, P.t0 + 0.2, 0.3, 2), tilt)
      L(x, 800, 640, 'BALANCE: WOBBLY', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Practised “no” in the mirror? | *Say it once, softly.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(820, 880); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 122, 172, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe6ff'; x.beginPath(); x.ellipse(0, 0, 104, 154, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.fillRect(-60, -110, 22, 60); x.restore()
      bubble(x, 800, 660, lt < 1.2 ? 'no…? no!' : 'no, thank you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      L(x, 810, 1110, 'TAKE 37', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Want to be someone’s | *first pick? You are.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, lines: [['♎ libra', GOLD, pop01(t, P.t0 + 0.6, 0.2, 2), false], ['you were', MINT, pop01(t, P.t0 + 1.0, 0.2, 2), true], ['my first pick', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), true]], size: 30 })
      hearts(x, t, 810, 800, P.t0 + 1.6, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Lonely in a full room? | *Tell one friend.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['leo', 'gemini', 'sagittarius'].forEach((id, i) => friend(x, t, id, 680 + i * 120, 1010 - (i % 2) * 40, 100, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { mood: 'happy', look: [i - 1, 0] }))
      friend(x, t, 'cancer', 830, 760, 150, pop01(t, P.t0 + 0.9, 0.3, 2), { mood: 'heart', look: [-1, 0] })
      bubble(x, 790, 610, 'you ok?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Always the peacemaker? | *Take a day off.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'PEACEMAKER: ON', 'OFF DUTY TODAY', { size: 38, fromBg: GOLD, toBg: LAV })
      L(x, 800, 1060, 'THEY’LL BE FINE', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Need to hear it? | *Asking isn’t too much.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: MINT, lines: [['are we good?', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['always.', MINT, pop01(t, P.t0 + 1.4, 0.2, 2), false]], typing: lt > 0.8 && lt < 1.4 ? 1 : 0, size: 30 })
    } },
  { sign: S, cap: 'Your side of the scale | *counts too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const tilt = lerp(0.3, 0, ease.inOutCubic(prog(lt, 0.4, 1.2)))
      scales(x, 770, 920, 0.75 * pop01(t, P.t0 + 0.2, 0.3, 2), tilt, 'THEM', 'YOU')
      L(x, 800, 640, 'BALANCED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
      sparkles(x, t, 800, 800, P.t0 + 1.6, 6, 200, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0588', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'What Libras won’t | *say out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Kind to everyone. | *You too.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
