// kpure05 · Planet Talk: Uranus · "Leo, Let Them Plan It" (25 s vertical, hard cut) · funk · A · star_talk
//   0      Uranus rolling onto Leo's stage, the spotlight swinging wild, Leo's mic "went flying"; "LEO. | Hand over the *mic.*"
//   0.45   glitch · 2.7 "Date night. Planned by Leo. *Again.*" + Leo's run sheet (light show ✓ speech ✓ outfit change ✓✓✓)
//   6.2    ♅ "Plot twist: let *them* spoil *you.*" · 9.6 ♌ "Me? In the *AUDIENCE?*"
//   11.6   Leo in a chair, stiff · the date on stage reads a tiny handwritten card:
//          "You make everyone feel like the main character. *Tonight it's your turn.*"
//   16.8   Leo melts, the crown slips: "I… don't know where to *look.*" · 19.0 Pisces in the audience, sobbing, applauding
//   23.6   "Front row. | *Finally* the audience." · hard cut at 25
import { urFilm, HK, r3 } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 25, SHEET = 2.7, SEAT = 11.6, CARD = 12.2, MELT = 16.8, PIS = 19.0, LAST = 23.6
const DATE = 'virgo', DC = '#f0a3c8'
const RUN = [['LIGHT SHOW', '✓'], ['THE SPEECH', '✓'], ['OUTFIT CHANGE', '✓✓✓'], ['THEIR TURN?', '…']]

function stage(x, t, K) {
  x.fillStyle = '#120a1e'; x.fillRect(0, 0, 1080, 1920)
  // the spotlight: swinging wild at the start, then settling on whoever has the stage
  const tx = t < 2.4 ? 540 + 380 * Math.sin(t * 5.5) : t < SEAT ? 540 : 540
  const ty = t < SEAT ? 1330 : 1180
  const g = x.createLinearGradient(0, 0, 0, ty); g.addColorStop(0, 'rgba(255,240,200,0.0)'); g.addColorStop(1, 'rgba(255,240,200,0.28)')
  x.fillStyle = g; x.beginPath(); x.moveTo(500, -40); x.lineTo(580, -40); x.lineTo(tx + 260, ty); x.lineTo(tx - 260, ty); x.closePath(); x.fill()
  // the stage floor
  K.box(x, -20, 1420, 1120, 40, '#6a3a2a', { o: 8 }); x.fillStyle = '#4a2a20'; x.fillRect(-20, 1460, 1120, 470)
  for (let i = 0; i < 9; i++) K.rect(x, i * 130, 1470, 4, 450, 'rgba(0,0,0,0.25)')
  x.fillStyle = 'rgba(255,240,200,0.22)'; x.beginPath(); x.ellipse(tx, ty + 90, 250, 50, 0, 0, Math.PI * 2); x.fill()
  // curtains
  for (const s of [-1, 1]) {
    x.save(); x.translate(s < 0 ? 0 : 1080, 0); x.scale(s < 0 ? 1 : -1, 1)
    K.box(x, -20, -20, 200, 1460, '#b0263c', { o: 6 }); for (let i = 0; i < 4; i++) K.rect(x, 10 + i * 46, 0, 10, 1420, 'rgba(0,0,0,0.25)')
    x.restore()
  }
  K.box(x, -20, -20, 1120, 140, '#b0263c', { o: 6 })
  // the audience: a row of seat backs (the front row is where Leo ends up)
  if (t >= SEAT - 0.3) for (let i = 0; i < 5; i++) K.box(x, 40 + i * 210, 1790, 170, 140, '#3a1a3a', { o: 5 })
}
function crown(x, X, Y, s, rot) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  x.fillStyle = '#140c28'; x.beginPath(); x.moveTo(-58, 24); x.lineTo(-62, -30); x.lineTo(-30, 0); x.lineTo(0, -42); x.lineTo(30, 0); x.lineTo(62, -30); x.lineTo(58, 24); x.closePath(); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(-50, 18); x.lineTo(-52, -18); x.lineTo(-28, 8); x.lineTo(0, -30); x.lineTo(28, 8); x.lineTo(52, -18); x.lineTo(50, 18); x.closePath(); x.fill()
  x.restore()
}

const F = urFilm({
  id: 'kpure05', sign: 'leo', dur: D, ending: 'cut',
  hook: { text: 'LEO. | Hand over the *mic.*', top: 250 },
  entry: { roll: true, from: 'right', at: -0.3, x: 560, y: 860, size: 400 },
  debris: [
    { w: 40, h: 150, color: '#3a3a4a', x: 300, y: 1200, vx: -300, vy: -1500, spin: 9, t0: -0.4 },
    { w: 70, h: 70, color: '#9aa6b8', x: 300, y: 1150, vx: -320, vy: -1550, spin: 9, t0: -0.4 },
    { label: '★', w: 70, h: 70, color: '#f2c75c', x: 700, y: 1250, vx: 500, vy: -1300, spin: -7, t0: -0.3 },
  ],
  bg: stage,
  paint(x, t, K) {
    const onStage = t < SEAT
    // Uranus
    const U = K.track(t, [[0, { x: 560, y: 860, size: 400 }], [SHEET + 0.5, { x: 770, y: 700, size: 330 }], [SEAT, { x: 770, y: 700, size: 330 }], [SEAT + 0.5, { x: 800, y: 640, size: 300 }]])
    K.uranus(x, t, { ...U, mood: t < 2 ? 'happy' : t < 6.2 ? 'sly' : t < MELT ? 'happy' : 'love', look: onStage ? [-1, 0.6] : [-0.6, 1], hops: [MELT + 0.2] })
    // the date, on stage after the swap
    const dk = ease.outCubic(prog(t, SEAT, SEAT + 0.45))
    if (dk > 0) K.sign(x, t, DATE, { x: lerp(1300, 540, dk), y: 1300, s: 300, glyph: false, mood: 'happy', look: [0, 1], seed: 7, hops: [CARD + 0.1], shadow: true })
    // Leo: on stage, then in the front row (big, in front, looking up)
    const L = K.track(t, [[0, { x: 330, y: 1320, s: 320 }], [SHEET + 0.5, { x: 300, y: 1320, s: 300 }], [SEAT, { x: 300, y: 1320, s: 300 }], [SEAT + 0.5, { x: 300, y: 1720, s: 340 }]])
    const mood = t < SHEET ? 'wide' : t < 6.2 ? 'sparkle' : t < SEAT ? 'wide' : t < MELT ? 'squint' : 'heart'
    const r = K.sign(x, t, 'leo', { ...L, mood, look: onStage ? [1, -0.4] : [0.6, -1], hops: [9.7, MELT + 0.1, MELT + 0.6], shadow: onStage })
    // the crown, slipping as Leo melts
    const sl = ease.outBack(prog(t, MELT + 0.2, MELT + 0.8))
    crown(x, L.x + sl * 70, (r?.top ?? L.y - L.s / 2) + 10 + sl * 30, L.s / 300, -0.1 + sl * 0.6)
    // Pisces, in the audience, sobbing and applauding
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 820, y: 1740, s: 260, pop: pk, hops: [PIS + 0.3, PIS + 0.6, PIS + 0.9, PIS + 1.2, PIS + 1.5] })
  },
  over(x, t, K) {
    // Leo's run sheet
    const k = K.win(t, 2.9, 6.0)
    if (k > 0.01) {
      x.save(); x.translate(560, 820); x.rotate(0.04); x.scale(k, k)
      K.box(x, -300, -230, 600, 460, '#fffaf0', { o: 7 }); K.rect(x, -300, -230, 600, 70, '#f2c75c')
      K.txt(x, "LEO'S RUN SHEET", 0, -195, { size: 30, color: K.INK })
      RUN.forEach(([a, b], i) => {
        const on = t > 3.2 + i * 0.55
        if (!on) return
        K.txt(x, a, -260, -100 + i * 90, { size: 34, align: 'left', color: K.INK })
        K.txt(x, b, 260, -100 + i * 90, { size: 36, align: 'right', color: i === 3 ? K.RED : '#2fa86a', font: K.INTER, weight: 900 })
      })
      x.restore()
    }
    // the tiny handwritten card
    const ck = K.win(t, CARD, MELT - 0.2)
    if (ck > 0.01) { x.save(); x.translate(640, 1180); x.rotate(-0.12); x.scale(ck, ck); K.box(x, -90, -60, 180, 120, '#fffaf0', { o: 5 }); for (let i = 0; i < 3; i++) K.rect(x, -64, -30 + i * 26, 128 - i * 30, 6, '#7a5cc0'); x.restore() }
  },
  lines: [
    { t0: 6.2, t1: 9.4, who: 'uranus', text: 'Plot twist: let *them* spoil *you.*', x: 600, y: 400, tail: 200, maxW: 760 },
    { t0: 9.6, t1: 11.4, who: 'leo', text: 'Me? In the *AUDIENCE?*', x: 400, y: 1000, tail: -100 },
    { t0: CARD + 0.2, t1: 16.6, who: 'the date', color: DC, text: 'You make everyone feel like the main character. *Tonight it’s your turn.*', x: 540, y: 420, tail: 0, tailUp: false, maxW: 820, size: 42 },
    { t0: MELT, t1: 19.0, who: 'leo', text: 'I… don’t know where to *look.*', x: 420, y: 1420, tail: -100 },
    { t0: PIS + 0.2, t1: 21.5, who: 'pisces', text: '*BRAVO!!* (sob)', x: 760, y: 1440, tail: 60 },
    { t0: 21.6, t1: 23.3, who: 'uranus', text: 'How’s the *view?*', x: 640, y: 380, tail: 200 },
  ],
  heads: [
    { at: SHEET, text: 'Date night. Planned by Leo. | *Again.*', out: [5.8, 6.05], top: 230, size: 80 },
    { at: LAST, text: 'Front row. | *Finally* the audience.', top: 250, size: 100 },
  ],
  fx: [{ f: HK.whipZoom, c: HK.whipZoomCues, o: { at: SEAT, len: 0.4, from: 1.4 } }],
  cues: [
    ...RUN.map((_, i) => ['tick', r3(3.2 + i * 0.55), 0.06]),
    ['pop', 4.85, 220, 0.05, 0],
    ['pop', CARD, 1174.66, 0.04, 0], ['whoosh', MELT + 0.15, 0.3, 0.04], ['tom', MELT + 0.8, 140, { gain: 0.15, decay: 0.3 }],
    ...[0, 1, 2, 3, 4].map(i => ['clap', r3(PIS + 0.3 + i * 0.3), { gain: 0.08 }]),
    ['glitter', PIS, PIS + 1.2],
  ],
  music: { style: 'funk', key: 'A', seed: 8105, sections: { drop: 0.45, breakdown: [SEAT], lift: [MELT] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
