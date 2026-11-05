// kdwe04 · Don't Watch This If You're a ___ · "Cancer's Hoodie Box" (18 s vertical, loop) · dreamy · Ab
//   0      Cancer hugging the lens, tearful; "CANCER. | Close it. *Right now.*" · scratch + freeze · whip out
//   1.5    the closet, a box marked DONATE · "Cancer, *decluttering.*" · 2.2 the lid flips: the ex's hoodie
//   4.4    Cancer puts it on · "one last *time.*" · 6.8 a clock: 9:00 PM · "Missing an ex hits | at *9 p.m.*"
//   9.6    the hoodie goes back in, DONATE is crossed out: LATER
//   11.5   Pisces in its own scarf, sobbing: "i kept *their* scarf too!!" · ♋ "…we’re *healing.*"
//   15.0   "Moved on. | *Hoodie* stays." · 17.55 Cancer spots the lens and lunges back → frame 0 (loop)
import { dwFilm, tag } from '../../kdwe01/dwkit.js'
import { prog, ease, lerp } from '../../../src/lib.js'

const CA = tag('cancer'), PI = tag('pisces')
const OPEN = 2.2, WEAR = 4.4, NINE = 6.8, BACKIN = 9.6, PIS = 11.4
const HOOD = '#5a78b4'
function hoodie(x, K, X, Y, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(s / 340, s / 340); x.globalAlpha = Math.min(1, k * 2)
  // the hood around the face + the sleeves on the side points
  x.lineJoin = 'round'
  x.strokeStyle = '#140c28'; x.lineWidth = 64; x.beginPath(); x.arc(0, -10, 150, Math.PI * 1.02, Math.PI * 1.98); x.stroke()
  x.strokeStyle = HOOD; x.lineWidth = 50; x.stroke()
  for (const d of [-1, 1]) { K.box(x, d * 150 - 40, 40, 80, 70, HOOD); K.rect(x, d * 150 - 40, 96, 80, 14, '#3e5a90') }
  K.rect(x, -40, 60, 6, 60, '#efe6d6'); K.rect(x, 34, 60, 6, 60, '#efe6d6')
  x.restore()
}
const F = dwFilm({
  id: 'kdwe04', sign: 'cancer', dur: 18, ending: 'loop',
  hook: 'CANCER.|Close it. *Right now.*', hookOut: 1.3, scratch: 'oh no. *the box.*',
  lens: { mood: 'sparkle', look: [0, 0] }, pull: { x: 340, y: 1260, s: 340 },
  shots: [
    { at: 0, cam: [1, 540, 960] },
    { at: WEAR, cam: [1.3, 400, 1130] },
    { at: BACKIN, cam: [1, 540, 960] },
    { at: PIS, cam: [1.05, 560, 1000] },
  ],
  punch: [{ at: NINE, dur: 2.4, z: 0.12, x: 400, y: 1000 }],
  heads: [
    { text: 'Cancer, *decluttering.*', at: 1.5, out: [4.1, 4.35], top: 240 },
    { text: 'one last *time.*', at: 4.6, out: [6.5, 6.75], top: 240 },
    { text: 'Missing an ex hits|at *9 p.m.*', at: NINE + 0.15, out: [9.3, 9.55], top: 240 },
    { text: 'Moved on.|*Hoodie* stays.', at: 15.0, out: [17.2, 17.5], top: 250 },
  ],
  boxes: [
    { open: 11.7, close: 14.9, lines: [{ t: 11.85, speaker: PI, text: 'i kept *their* scarf too!!', color: '#9fd7ff' }, { t: 13.35, speaker: CA, text: '…we’re *healing.*', color: '#d8d8ff' }] },
  ],
  pitch: { [CA]: 587.33, [PI]: 1046.5 },
  paint(x, t, K) {
    K.room(x, t, { wall: '#2a2a50', wall2: '#16163a', floor: '#2e2a44', window: true })
    // the closet
    K.box(x, 40, 560, 300, 800, '#7a5a7a'); K.rect(x, 60, 580, 260, 760, '#5a3e5a'); K.rect(x, 186, 580, 8, 760, '#140c28')
    // the box
    const lid = ease.outBack(prog(t, OPEN, OPEN + 0.4)) * (1 - ease.inOutQuad(prog(t, BACKIN + 0.6, BACKIN + 1.0)))
    K.box(x, 600, 1180, 300, 180, '#c99a5a')
    x.save(); x.translate(600, 1180); x.rotate(-lid * 1.9); K.box(x, 0, -30, 300, 30, '#d9aa6a'); x.restore()
    const crossed = prog(t, BACKIN + 1.1, BACKIN + 1.4)
    K.label(x, 'DONATE', 750, 1280, { size: 34, bg: '#efe6d6' })
    if (crossed > 0) { x.save(); x.strokeStyle = K.RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(670, 1280); x.lineTo(670 + 160 * crossed, 1280); x.stroke(); x.restore() }
    K.label(x, 'LATER', 760, 1330, { size: 30, bg: '#ffd9dc', rot: -0.06, pop: K.pop01(t, BACKIN + 1.5, 0.3) })
    // the hoodie rising out of the box (before it's worn) / folded back in
    const rise = ease.outCubic(prog(t, OPEN + 0.3, OPEN + 0.8))
    if (t > OPEN + 0.3 && t < WEAR) { x.save(); x.translate(750, 1180 - rise * 160); x.rotate(Math.sin(t * 3) * 0.05); K.box(x, -110, -70, 220, 150, HOOD); K.box(x, -150, -60, 50, 110, HOOD); K.box(x, 100, -60, 50, 110, HOOD); K.rect(x, -60, -70, 120, 40, '#3e5a90'); x.restore() }
    const down = ease.inCubic(prog(t, BACKIN, BACKIN + 0.6))
    if (t > BACKIN && down < 1) { x.save(); x.translate(lerp(380, 750, down), lerp(1200, 1150, down)); K.box(x, -100, -40, 200, 80, HOOD); x.restore() }
    // Pisces, in its own (their) scarf
    if (t > PIS) { const k = K.pop01(t, PIS, 0.4); K.pisces(x, t, { x: 820, y: 1000, s: 260, pop: k, look: [-1, 0], tears: 3 }); if (k > 0.5) { K.box(x, 745, 1085, 150, 30, '#ef5c94', { o: 3 }); K.box(x, 850, 1100, 30, 80, '#ef5c94', { o: 3 }) } }
    if (!K.hide) {
      const worn = t > WEAR && t < BACKIN ? 1 : 0
      const mood = t < OPEN ? 'happy' : t < WEAR ? 'wide' : t < NINE ? 'heart' : t < BACKIN ? 'sparkle' : t < PIS ? 'neutral' : 'happy'
      const y = 1260
      K.star(x, t, 'cancer', { x: 340, y, s: 340, mood, look: t < WEAR ? [1, 0.2] : [0, 0], seed: 3, tears: t > NINE && t < BACKIN ? 1 : 0, squash: t > 6 && t < NINE ? 0.06 * Math.sin(t * 8) : 0 })
      hoodie(x, K, 340, y, 340, worn * ease.outCubic(prog(t, WEAR, WEAR + 0.3)))
    }
  },
  over(x, t, K) {
    // the 9 p.m. clock
    const k = K.inOut(t, NINE, 9.4)
    if (k > 0.01) { x.save(); x.translate(780, 640); x.scale(k, k); x.rotate(0.05); K.box(x, -170, -70, 340, 140, '#1a1236', { o: 6 }); K.txt(x, '9:00 PM', 0, 4, { size: 72, font: K.INTER, weight: 900, color: '#ff8fb1' }); x.restore() }
  },
  cues: [
    ['whoosh', OPEN, 0.3, 0.04], ['pop', OPEN + 0.1, 523.25, 0.05, 0.2], ['glitter', OPEN + 0.3, OPEN + 1.2],
    ['whoosh', WEAR, 0.3, 0.04], ['pop', WEAR + 0.2, 659.25, 0.04, 0],
    ['bell', NINE, 783.99, 0.05, 1.6, 0.2], ['bell', NINE + 0.5, 783.99, 0.035, 1.4, -0.2],
    ['whoosh', BACKIN, 0.5, 0.04], ['tick', BACKIN + 1.15, 0.06], ['pop', BACKIN + 1.55, 1174.66, 0.04, 0],
    ['pop', PIS + 0.03, 783.99, 0.05, 0.3], ['glitter', PIS, PIS + 1.4],
  ],
  music: { style: 'dreamy', key: 'Ab', seed: 4104, sections: { drop: 1.42, lift: [NINE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
