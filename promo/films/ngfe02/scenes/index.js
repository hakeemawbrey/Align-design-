// ngfe02: 24 DAYS OF GREEN FLAGS, door 2: "Asks how the big thing went." (18 s vertical, lofi · Am)
//   hook "The day after | your *big interview…*" · Virgo steps out of the INTERVIEW door, the phone buzzes: Taurus
//   "so?? how did it go??" · Virgo: "it went GREAT. you remembered??" · Taurus: "it was on my fridge all week ★"
//   Virgo melts. Last: "They *remembered*. And asked."
import { makeDoor, room, phone, bubble, hearts, shadow, label, box, R, INK, BONE, GOLD, MONO, INTER, prog, ease, lerp, clamp, signStar } from '../../ngfe01/scenes/advent.js'
const TAU = signStar('taurus')
function scene(x, t, S) {
  const { u, mate } = S
  room(x, { wall: '#26304f', wall2: '#2c3860', floor: '#3a3a5e' })
  // the interview door
  box(x, 90, 420, 330, 740, '#6a5a8a', { b: 10, hi: '#7d6ca0' })
  const open = ease.outCubic(prog(u, 0, 0.6)) * (1 - ease.inCubic(prog(u, 1.0, 1.4)))
  R(x, '#120d2c', 90, 420, 330 * open, 740)
  box(x, 130, 470, 250, 70, BONE, { b: 5 })
  x.save(); x.font = `700 30px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INTERVIEW', 255, 506); x.restore()
  R(x, GOLD, 380, 800, 18, 18)
  // Virgo walks out, exhales
  const wx = lerp(250, 330, ease.outCubic(prog(u, 0.1, 0.9)))
  shadow(x, wx, 1160, 240)
  const mood = u < 0.9 ? 'sleepy' : u < 1.6 ? 'wide' : u < 4.3 ? 'happy' : 'heart'
  mate(x, t, { x: wx, y: 1000, s: 270, mood, look: u > 0.9 && u < 4.3 ? [1, -0.6] : [0, 0], hops: [S.t0 + 0.95, S.t0 + 3.1, S.t0 + 4.35], zzz: false })
  if (u > 0.9 && u < 1.6) label(x, 'BZZ BZZ', 760, 380, { size: 40, col: GOLD, rot: 0.1 * Math.sin(t * 30) })
  if (u > 4.3) hearts(x, t, S.t0 + 4.35, wx, 820, { n: 6 })
  const pin = ease.outBack(prog(u, 0.85, 1.25))
  if (pin > 0) phone(x, t, 760, lerp(1500, 800, pin), {
    w: 420, h: 700, title: `${TAU.glyph}︎ Taurus`, rot: 0.04 + (u < 1.6 ? 0.03 * Math.sin(t * 40) : 0), glowA: 1, msgs: [
      { at: S.t0 + 1.0, side: 'L', text: 'so?? how did it go??', size: 28 },
      { at: S.t0 + 2.6, side: 'R', text: 'it went GREAT. you remembered??', size: 28 },
      { at: S.t0 + 3.7, side: 'L', text: "it was on my fridge all week ★", size: 28 },
    ] })
  void bubble; void clamp; void INTER
}
const EP = makeDoor({
  day: 2, hero: 'taurus', mate: 'virgo', hook: 'The day after | your *big interview…*',
  flag: 'asks how *the big thing* went.', scene, pis: { x: 120, y: 1715, look: [1, -0.6] },
  cues: [['tick', 0.05, 0.05], ['whoosh', 0.1, 0.4, 0.03], ['pop', 0.95, 880, 0.04, 0], ['tick', 0.92, 0.04], ['tick', 1.0, 0.04], ['tick', 1.08, 0.04], ['tick', 1.16, 0.04],
    ['pop', 1.0, 1174.66, 0.045, 0.3], ['pop', 2.6, 987.77, 0.045, 0.3], ['pop', 3.7, 1318.51, 0.045, 0.3], ['pluck', 4.35, 1174.66, 0.04, 0.5, -0.2], ['pluck', 4.47, 1567.98, 0.035, 0.5, -0.2]],
  last: 'They *remembered*. And asked.', mateMood: 'heart',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
