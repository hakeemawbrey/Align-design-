// ngfe12: 24 DAYS OF GREEN FLAGS, door 12: "Checks in when you go quiet." (18 s vertical, jazzy · Db)
//   hook "You went quiet | *for a day.*" · Virgo, curled up in a dim room, phone glowing: Pisces' text "no pressure to
//   reply." / "just here if you need me." Virgo exhales, a small smile: "thank you. tomorrow?" Pisces: "tomorrow."
//   In the corner window, Pisces (the hero) cries at its own text. Last: "*Here* when you're ready."
import { makeDoor, room, windowFrame, phone, shadow, box, signStar, R, INK, BONE, prog, ease, lerp, hearts } from '../../ngfe01/scenes/advent.js'
const PIS = signStar('pisces')
function scene(x, t, S) {
  const { u, mate, pisces } = S
  room(x, { wall: '#1e1a3a', wall2: '#221d42', floor: '#2c2448' })
  windowFrame(x, t, 120, 260, 300, 280)
  // bed + blanket
  box(x, 60, 1000, 560, 170, '#4a3a7a', { b: 8, hi: '#5c4a94' })
  box(x, 70, 960, 140, 60, BONE, { b: 5 })
  const relax = ease.inOutCubic(prog(u, 3.0, 3.6))
  mate(x, t, { x: 290, y: lerp(990, 960, relax), s: 230, mood: u < 3.0 ? 'sleepy' : u < 4.5 ? 'happy' : 'heart', look: [1, 0], hops: [S.t0 + 3.05, S.t0 + 4.5], zzz: false })
  box(x, 150, 1030, 460, 120, '#7a5aa8', { b: 6, hi: '#9070c0' })
  // phone glow on the ceiling
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(780, 760, 0, 780, 760, 420); g.addColorStop(0, 'rgba(160,200,255,0.18)'); g.addColorStop(1, 'rgba(160,200,255,0)'); x.fillStyle = g; x.fillRect(300, 300, 900, 900); x.restore()
  phone(x, t, 780, 800, { w: 420, h: 720, title: `${PIS.glyph}︎ Pisces`, rot: 0.03, msgs: [
    { at: S.t0 + 0.5, side: 'L', text: 'no pressure to reply.', size: 28 },
    { at: S.t0 + 1.5, side: 'L', text: 'just here if you need me.', size: 28 },
    { at: S.t0 + 3.6, side: 'R', text: 'thank you. tomorrow?', size: 28 },
    { at: S.t0 + 4.5, side: 'L', text: 'tomorrow.', size: 28 },
  ] })
  // Pisces in the corner, crying at its own text
  const pk = ease.outBack(prog(u, 0.9, 1.3))
  if (pk > 0) {
    box(x, 790, 1500, 250, 230, '#2a2250', { b: 6 })
    x.save(); x.beginPath(); x.rect(790, 1500, 250, 230); x.clip()
    pisces(x, t, { x: 915, y: 1630, s: 170 * pk, hops: [S.t0 + 4.55] }, u > 4.5 ? 3 : 2, u > 4.5 ? 'happy' : 'wide', [-1, -1])
    x.restore()
  }
  if (u > 4.5) hearts(x, t, S.t0 + 4.6, 290, 820, { n: 4 })
  void R; void INK; void shadow
}
const EP = makeDoor({
  day: 12, hero: 'pisces', mate: 'virgo', hook: 'You went quiet | *for a day.*',
  flag: 'checks in when you *go quiet.*', scene, pis: false, calPisces: false, payPisces: false, heroMood: 'happy',
  cues: [['pop', 0.5, 987.77, 0.04, 0.3], ['pop', 1.5, 1174.66, 0.04, 0.3], ['pop', 0.95, 659.25, 0.03, 0.5], ['pop', 3.6, 880, 0.04, 0.3], ['pop', 4.5, 1318.51, 0.045, 0.3], ['pluck', 4.55, 1567.98, 0.035, 0.5, 0.4]],
  last: '*Here* when you\'re ready.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
