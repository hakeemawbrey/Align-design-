// kpsue02: PLANET TALK: THE SUN, Ep 2 "Taurus and the Comfy Rut" (26 s vertical, star_advice post, lofi · F). Loop.
// Frame 0: the Sun mid-rise over the hill at dawn, Taurus wrapped in a blanket, hook "TAURUS. Good morning, gorgeous."
//   3.0 Taurus: comfy era, same couch, same order · 6.2 THIS WEEK board: NO, NO, NO · 8.0 "new people are a lot"
//   10.6 Sun: comfort is a gift, not a hiding place · 14.2 one new thing, keep the blanket · 16.6 text: game night?
//   17.4 Taurus: "…yes." · 18.4 Pisces cries · 23.2 "New plans. Same blanket." → loops to the sunrise.
import { episode, drawPanel, rr, INK } from '../../kpsue01/sunkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const NOTIF = { at: 16.6, out: [19.6, 19.9], title: 'texts', body: 'Sam: game night tomorrow? *blankets welcome*', glyph: '♉', time: 'now', y: 120 }
const no = (at, text) => ({ at, text: text + '  — NO', color: INK })

function blanket(x, t) {
  const w = 470, h = 160, cx = 540, cy = 1545 + Math.sin(t * 2.2 + 8.4) * 6
  x.save(); x.translate(cx, cy); x.rotate(-0.03)
  x.fillStyle = INK; rr(x, -w / 2 - 7, -h / 2 - 7, w + 14, h + 14, 50); x.fill()
  x.fillStyle = '#e98aa8'; rr(x, -w / 2, -h / 2, w, h, 44); x.fill()
  x.save(); rr(x, -w / 2, -h / 2, w, h, 44); x.clip()
  x.fillStyle = '#f6b2c6'; for (let i = -6; i < 6; i++) for (let j = -2; j < 3; j++) if ((i + j) % 2 === 0) x.fillRect(i * 50, j * 50 - 10, 50, 50)
  x.restore()
  x.strokeStyle = '#fff8ea'; x.lineWidth = 5; x.setLineDash([12, 10]); rr(x, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 34); x.stroke(); x.setLineDash([])
  x.restore()
  // the same takeout box, every night
  x.save(); x.translate(850, 1590); x.rotate(0.06)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(70, -60); x.lineTo(54, 60); x.lineTo(-54, 60); x.closePath(); x.fill()
  x.fillStyle = '#fff8ea'; x.beginPath(); x.moveTo(-62, -52); x.lineTo(62, -52); x.lineTo(48, 52); x.lineTo(-48, 52); x.closePath(); x.fill()
  x.fillStyle = '#e5573b'; x.font = "800 26px Inter"; x.textAlign = 'center'; x.fillText('SAME', 0, -4); x.fillText('ORDER', 0, 26)
  x.restore()
}

const E = episode({
  sign: 'taurus', duration: 26, ending: 'loop',
  entrance: { kind: 'rise', at: -0.9, x: 540, y: 690, size: 640 },
  horizon: 1250,
  hook: { text: 'TAURUS. Good | morning, *gorgeous.*', top: 1640, out: [2.6, 2.85] },
  sun: { mood: [[0, 'happy'], [3.0, 'neutral'], [6.3, 'wide'], [7.6, 'sad'], [10.6, 'happy'], [14.2, 'proud'], [15.4, 'happy'], [17.4, 'love'], [23.2, 'happy']], hops: [10.6, 14.2, 17.6] },
  me: {
    base: { x: 540, y: 1390, size: 380 },
    mood: [[0, 'sleepy'], [3, 'neutral'], [6.2, 'squint'], [8.0, 'sleepy'], [10.6, 'neutral'], [14.2, 'wide'], [16.7, 'wide'], [17.4, 'happy'], [23.2, 'happy']],
    look: [[0, [0, -1]], [3, [0, 0]], [6.2, [0, -1]], [16.7, [1, -1]], [17.4, [0, -1]]],
  },
  bubbles: [
    { t0: 3.0, t1: 6.0, who: 'taurus', text: 'My comfy era. Same couch. Same order. *Forever.*' },
    { t0: 8.0, t1: 10.3, who: 'taurus', text: 'New people are *a lot.*' },
    { t0: 10.6, t1: 14.0, who: 'sun', text: 'Comfort is a gift, gorgeous. Not a *hiding place.*', y: 1110 },
    { t0: 14.2, t1: 16.4, who: 'sun', text: 'Try ONE new thing. Keep the *blanket.*', y: 1110 },
    { t0: 17.4, t1: 20.6, who: 'taurus', text: '…*yes.* Blanket’s coming too.' },
    { t0: 20.8, t1: 23.0, who: 'pisces', text: 'Taurus said YES?! I need a *minute.*' },
    { t0: 23.2, t1: 25.4, who: 'taurus', text: 'New plans. *Same blanket.*', size: 54 },
  ],
  pisces: { at: 18.4, out: [25.3, 25.6], tears: [[18.4, 2], [20.8, 3]], hops: [20.8, 21.2] },
  fx: [notification(NOTIF)], fxCues: notificationCues(NOTIF),
  back: null,
  front(x, t) {
    blanket(x, t)
    if (t > 6.1 && t < 10.6) {
      const p = Math.min(1, (t - 6.1) / 0.3), q = Math.max(0, (t - 10.3) / 0.3)
      drawPanel(x, t, { x: 540, y: 1000, w: 720, h: 330, title: 'THIS WEEK', color: '#9fd08a', pop: p * (1 - q), rows: [no(6.4, 'Brunch with Sam'), no(6.9, 'Pottery class'), no(7.4, 'Game night')], size: 38 })
    }
  },
  cues: [['tom', 6.4, 120, { gain: 0.12, decay: 0.15 }], ['tom', 6.9, 110, { gain: 0.12, decay: 0.15 }], ['tom', 7.4, 100, { gain: 0.12, decay: 0.15 }], ['bell', 17.45, 698.46, 0.04, 1.6, 0], ['glitter', 17.4, 18.0]],
})
export const { DURATION, SCENES, CUES } = E
