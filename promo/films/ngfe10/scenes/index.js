// ngfe10: 24 DAYS OF GREEN FLAGS, door 10: "Asks before posting your photo." (18 s vertical, dreamy · F)
//   hook "Cute photo. | *Can I post it?*" · Capricorn holds up a phone with a photo of the two of them: "can I post
//   this one?" Leo: "not that one! my eyes!" (eyes shut in the photo). Swipe: DELETED. "this one?" Leo: "YES."
//   Last: "They *asked* first."
import { makeDoor, room, windowFrame, bubble, shadow, label, box, drawStarChar, signStar, sparkles, R, INK, BONE, GOLD, RED, prog, ease, lerp } from '../../ngfe01/scenes/advent.js'
const LEO = signStar('leo'), CAP = signStar('capricorn')
function snap(x, t, cx, cy, w, h, closed) {
  R(x, '#3a2a70', cx - w / 2, cy - h / 2, w, h)
  for (let i = 0; i < 6; i++) R(x, BONE, cx - w / 2 + ((i * 53) % w), cy - h / 2 + ((i * 31) % (h * 0.4)), 4, 4)
  drawStarChar(x, cx - w * 0.2, cy + h * 0.08, w * 0.45, t, { color: CAP.color, mood: 'happy', look: [1, 0], seed: 12, glow: 0.6, bob: 0, tips: false })
  drawStarChar(x, cx + w * 0.2, cy + h * 0.08, w * 0.45, t, { color: LEO.color, mood: closed ? 'sleepy' : 'sparkle', look: [-1, 0], seed: 13, glow: 0.6, bob: 0, tips: false, zzz: false, blink: closed ? 1 : undefined })
}
function scene(x, t, S) {
  const { u, hero, mate } = S
  room(x, { wall: '#2c2450', wall2: '#342a5c', floor: '#40305a' })
  windowFrame(x, t, 140, 280, 280, 260)
  shadow(x, 270, 1160, 230); shadow(x, 820, 1160, 230)
  hero(x, t, { x: 270, y: 990, s: 250, mood: u < 4.3 ? 'happy' : 'sparkle', look: [1, -0.3], hops: [S.t0 + 0.5, S.t0 + 3.4, S.t0 + 4.4] })
  mate(x, t, { x: 820, y: 990, s: 250, mood: u < 1.9 ? 'happy' : u < 3.4 ? 'wide' : u < 4.3 ? 'neutral' : 'heart', look: [-1, -0.5], hops: [S.t0 + 1.95, S.t0 + 2.2, S.t0 + 4.3, S.t0 + 4.6] })
  // the phone between them, the photo swipes
  const pin = ease.outBack(prog(u, 0.2, 0.6))
  x.save(); x.translate(545, lerp(1400, 700, pin)); x.rotate(-0.03)
  box(x, -170, -270, 340, 540, '#2a2148', { b: 8 })
  x.beginPath(); x.rect(-150, -230, 300, 440); x.clip()
  const sw = ease.inOutCubic(prog(u, 2.9, 3.3))
  snap(x, t, -sw * 330, -10, 300, 400, true)
  if (sw > 0) snap(x, t, 330 - sw * 330, -10, 300, 400, false)
  x.restore()
  if (u > 2.9 && u < 3.7) label(x, 'DELETED.', 545, 1060, { size: 40, col: RED, font: "Inter, sans-serif", weight: 800, rot: -0.08 })
  sparkles(x, t, 820, 900, S.t0 + 4.3, 10, 160, 1, [GOLD, BONE, LEO.color])
  bubble(x, t, 300, 640, S.t0 + 0.5, S.t0 + 1.9, 'can I post\nthis one?', { size: 42, tail: -0.1 })
  bubble(x, t, 790, 640, S.t0 + 1.95, S.t0 + 3.3, 'not that one!\nmy EYES!', { size: 42, tail: 0.2, col: '#ffe0c2' })
  bubble(x, t, 280, 660, S.t0 + 3.4, S.t0 + 4.4, 'deleted. this one?', { size: 40, tail: -0.1 })
  bubble(x, t, 820, 650, S.t0 + 4.35, S.t1 - 0.2, 'YES.', { size: 60, tail: 0, col: '#ffe0c2' })
  void INK; void GOLD
}
const EP = makeDoor({
  day: 10, hero: 'capricorn', mate: 'leo', hook: 'Cute photo. | *Can I post it?*',
  flag: '*asks* before posting your photo.', scene, pis: { x: 950, y: 1715 },
  cues: [['whoosh', 0.2, 0.35, 0.03], ['pop', 0.5, 880, 0.035, -0.3], ['pop', 1.95, 1318.51, 0.045, 0.3], ['whoosh', 2.9, 0.3, 0.035], ['tick', 3.0, 0.06], ['pop', 3.4, 987.77, 0.035, -0.3], ['pop', 4.35, 1567.98, 0.05, 0.3], ['glitter', 4.3, 4.7]],
  last: 'They *asked* first.',
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
