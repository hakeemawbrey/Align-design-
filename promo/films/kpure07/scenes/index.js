// kpure07 · Planet Talk: Uranus · "Libra Picks Something" (22 s vertical, hard cut) · house · Eb · star_talk
//   0      Uranus somersaulting onto Libra's giant scales, the pans flipping; "LIBRA. | What do *YOU* want?"
//   0.45   glitch · 2.8 the polite loop: "Where to?" "Whatever you want!" "No, *you* pick!" "No, *YOU* pick!"
//          "The polite loop. *Round three.*"
//   7.6    ♅ "Radical idea. *Say what you want.*" · 10.8 Libra shaking… 11.4 "…*tacos.*" (the scales tip, decided)
//   13.4   the date: "Oh thank goodness. I *LOVE* tacos." · 14.0 ACHIEVEMENT UNLOCKED: picked the restaurant
//   16.0   Pisces sobs: "they *CHOSE!!*" · 18.6 a plate of tacos lands · 20.6 "Tacos. | *Groundbreaking.*" · hard cut at 22
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 22, LOOPT = 2.8, URA = 7.6, PICK = 11.4, YES = 13.4, ACH = 14.0, PIS = 16.0, PLATE = 18.6, LAST = 20.6
const DATE = 'cancer', DC = '#9fd8ff'
const ACHV = { at: ACH, out: [ACH + 1.9, ACH + 2.2], text: 'Picked the *restaurant.*', y: 1180 }

function street(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0e0b2a'); g.addColorStop(1, '#2c1a44')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  K.drawSpace(x, t, { planet: 'uranus', stars: 0.6, glow: 0.5, seed: 7 })
  // buildings
  const B = [[-20, 520, 260], [250, 640, 220], [480, 460, 260], [750, 600, 350]]
  for (const [X, Y, W] of B) { K.box(x, X, Y, W, 1500, '#1c1438', { o: 6 }); for (let j = 0; j < 9; j++) for (let i = 0; i < 3; i++) if ((i * 7 + j * 3 + X) % 5 > 1) K.rect(x, X + 30 + i * (W - 60) / 3, Y + 50 + j * 90, 34, 44, (i + j) % 3 ? 'rgba(255,214,140,0.55)' : 'rgba(127,227,255,0.35)') }
  // sidewalk
  K.box(x, -20, 1470, 1120, 470, '#3a2e4e', { o: 8 }); for (let i = 0; i < 6; i++) K.rect(x, i * 200, 1480, 6, 440, 'rgba(0,0,0,0.2)')
}
/** Libra's giant scales: tilt −1…1 (+ = right pan down), flip = the pans tumbling */
function scales(x, t, K, { X, Y, s = 1, tilt = 0, flip = 0 }) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  K.box(x, -14, -10, 28, 360, '#c9a24a', { o: 5 }); K.box(x, -90, 340, 180, 30, '#c9a24a', { o: 5 })
  x.save(); x.rotate(tilt * 0.35)
  K.box(x, -300, -18, 600, 24, '#f2c75c', { o: 5 })
  for (const sd of [-1, 1]) {
    x.save(); x.translate(sd * 280, 0); x.rotate(-tilt * 0.35 + flip * sd * Math.sin(t * 14) * 1.4)
    x.strokeStyle = '#140c28'; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(-80, 150); x.moveTo(0, 0); x.lineTo(80, 150); x.stroke()
    K.box(x, -110, 150, 220, 26, '#f2c75c', { o: 5 })
    x.restore()
  }
  x.restore(); x.restore()
}

const F = urFilm({
  id: 'kpure07', sign: 'libra', dur: D, ending: 'cut',
  hook: { text: 'LIBRA. | What do *YOU* want?', top: 240 },
  entry: { kind: 'spin', at: -0.55, len: 1.0, x: 560, y: 760, size: 330 },
  brk: { at: 0.5, len: 0.45 },
  bg: street,
  paint(x, t, K) {
    // the scales: flipping at the start, level and stuck during the loop, then decisively tipped at PICK
    const flip = 1 - ease.outCubic(prog(t, 0, 1.6))
    const tilt = t < 1.6 ? 0.6 * Math.sin(t * 9) * flip : t < PICK ? 0.08 * Math.sin(t * 3) : lerp(0.08 * Math.sin(PICK * 3), 1, ease.outBack(prog(t, PICK, PICK + 0.4)))
    const S = K.track(t, [[0, { X: 560, Y: 1000, s: 1 }], [LOOPT + 0.4, { X: 540, Y: 1080, s: 0.6 }]])
    scales(x, t, K, { ...S, tilt, flip })
    const U = K.track(t, [[0, { x: 560, y: 760, size: 330 }], [LOOPT + 0.4, { x: 760, y: 660, size: 290 }]])
    K.uranus(x, t, { ...U, mood: t < LOOPT ? 'happy' : t < URA ? 'sly' : t < YES ? 'wide' : 'love', look: t < LOOPT ? [-0.5, 1] : [-1, 1], hops: [0.6, YES + 0.2] })
    // Libra + the date
    const shaking = t > 10.8 && t < PICK + 0.4
    const vib = shaking ? Math.sin(t * 80) * 6 : 0
    const L = K.track(t, [[0, { x: 220, y: 1420, s: 300 }], [LOOPT + 0.4, { x: 260, y: 1500, s: 300 }]])
    K.sign(x, t, 'libra', { x: L.x + vib, y: L.y, s: L.s, mood: t < LOOPT ? 'wide' : t < URA ? 'happy' : t < PICK ? 'squint' : t < YES ? 'wide' : 'sparkle', look: t < LOOPT ? [1, -1] : [1, 0], hops: [PICK + 0.1, YES + 0.2, YES + 0.6, PLATE + 0.2], sweat: shaking, shadow: true })
    const dk = ease.outCubic(prog(t, LOOPT - 0.2, LOOPT + 0.3))
    if (dk > 0) K.sign(x, t, DATE, { x: lerp(1300, 820, dk), y: 1500, s: 300, glyph: false, seed: 5, mood: t < YES ? 'happy' : 'heart', look: [-1, 0], hops: [YES + 0.1, YES + 0.5, PLATE + 0.3], shadow: true })
    // the tacos
    const pk = K.pop01(t, PLATE, 0.35)
    if (pk > 0) {
      x.save(); x.translate(540, 1700); x.scale(pk, pk)
      x.fillStyle = '#140c28'; x.beginPath(); x.ellipse(0, 0, 200, 50, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fffaf0'; x.beginPath(); x.ellipse(0, -4, 186, 40, 0, 0, Math.PI * 2); x.fill()
      for (let i = 0; i < 3; i++) { x.save(); x.translate(-110 + i * 110, -40); x.fillStyle = '#140c28'; x.beginPath(); x.arc(0, 0, 58, Math.PI, 0); x.fill(); x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(0, 0, 50, Math.PI, 0); x.fill(); K.rect(x, -40, -18, 80, 10, '#7fd06a'); K.rect(x, -30, -28, 60, 10, '#e8625a'); x.restore() }
      x.restore()
    }
    const qk = K.pop01(t, PIS, 0.4)
    if (qk > 0) K.pisces(x, t, { x: 900, y: 1150, s: 220, pop: qk, hops: [PIS + 0.8, PIS + 1.6] })
  },
  over(x, t, K) {
    const k = K.win(t, 3.0, 7.3)
    if (k > 0.01) K.label(x, `POLITE LOOP ×${clamp(1 + Math.floor((t - 3.0) / 1.15), 1, 3)}`, 540, 760, { size: 40, bg: '#ff8fb1', pop: k, rot: -0.05 })
  },
  lines: [
    { t0: 2.95, t1: 4.0, who: 'the date', color: DC, text: 'Where to?', x: 780, y: 1240, tail: 60 },
    { t0: 4.0, t1: 5.15, who: 'libra', text: 'Whatever you want!', x: 320, y: 1240, tail: -60 },
    { t0: 5.15, t1: 6.25, who: 'the date', color: DC, text: 'No, *you* pick!', x: 780, y: 1240, tail: 60 },
    { t0: 6.25, t1: 7.4, who: 'libra', text: 'No, *YOU* pick!', x: 320, y: 1240, tail: -60 },
    { t0: URA, t1: 10.6, who: 'uranus', text: 'Radical idea. *Say what you want.*', x: 540, y: 340, tail: 220, maxW: 760 },
    { t0: PICK, t1: 13.2, who: 'libra', text: '…*tacos.*', x: 320, y: 1240, tail: -60, size: 56 },
    { t0: YES, t1: 15.8, who: 'the date', color: DC, text: 'Oh thank goodness. I *LOVE* tacos.', x: 700, y: 1240, tail: 120, maxW: 600 },
    { t0: PIS + 0.2, t1: 18.4, who: 'pisces', text: 'they *CHOSE!!*', x: 760, y: 900, tail: 140 },
  ],
  heads: [
    { at: LOOPT, text: 'The polite loop. | *Round three.*', out: [6.9, 7.15], top: 240, size: 92 },
    { at: LAST, text: 'Tacos. | *Groundbreaking.*', top: 260, size: 110 },
  ],
  fx: [
    { f: HK.achievement, c: HK.achievementCues, o: ACHV },
    { f: HK.screenShake, c: HK.shakeCues, o: { at: PICK, len: 0.4, amp: 14 } },
  ],
  cues: [
    ['tick', 4.15, 0.05], ['tick', 5.3, 0.05], ['tick', 6.45, 0.05],
    ['whoosh', PICK - 0.05, 0.3, 0.05], ['pop', PICK + 0.1, 392, 0.06, 0],
    ['pop', PLATE, 783.99, 0.05, 0], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'house', key: 'Eb', seed: 8107, sections: { drop: 0.5, breakdown: [10.8], lift: [YES] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
