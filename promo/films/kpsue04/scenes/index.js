// kpsue04: PLANET TALK: THE SUN, Ep 4 "Whose Birthday Is It, Cancer?" (26.6 s vertical, star_advice post, dreamy · Ab).
// Hard cut. Frame 0: the Sun mid-burst through the party window, Cancer mid-carry of a wobbling stack of snack plates.
//   3.0 Cancer: has everyone got a snack? · 6.0 checklist EVERYONE OK? (me: …?) · 10.0 Sun: when did YOU last sit
//   down? · 12.6 "who'll do the dips?" · 14.8 Sun: let them look after you (the Sun takes the plates)
//   16.6 group chat: SIT DOWN. we got you · 18.4 the cake · 19.4 Pisces sobs · 22.6 "Sitting down. Being celebrated."
import { episode, drawPanel, hearts, rr, key, INK, GOLD } from '../../kpsue01/sunkit.js'
import { notification, notificationCues } from '../../hookkit.js'

const NOTIF = { at: 16.6, out: [19.8, 20.1], title: 'the group chat', body: 'SIT DOWN. *we got you.*', glyph: '♋', time: 'now', y: 120 }
const ROWS = [{ at: 6.2, text: 'Sam has a drink  ✓' }, { at: 6.6, text: 'Mia’s coat hung up  ✓' }, { at: 7.0, text: 'dips refilled (x3)  ✓' }, { at: 7.6, text: 'me: …?', color: '#c23a3a' }]

function plates(x, t) {
  // the stack rides on Cancer's head, then floats up to the Sun at 15.4
  const k = key(t, [[0, 0], [15.4, 0], [16.2, 1]])
  if (k >= 0.999 && t > 17.2) return
  const fade = 1 - Math.min(1, Math.max(0, (t - 16.8) / 0.4))
  const px = 540 + k * 230, py = 1255 - k * 520
  x.save(); x.globalAlpha *= fade; x.translate(px, py); x.rotate(0.06 * Math.sin(t * 5) * (1 - k))
  for (let i = 0; i < 5; i++) {
    const wob = Math.sin(t * 6 + i) * 10 * (1 - k)
    x.fillStyle = INK; x.beginPath(); x.ellipse(wob, -i * 30, 120, 26, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff8ea'; x.beginPath(); x.ellipse(wob, -i * 30 - 4, 112, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = ['#f2c75c', '#e5573b', '#9fd08a', '#f7a8c0', '#c9a6ff'][i]; x.beginPath(); x.ellipse(wob, -i * 30 - 10, 60, 12, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function cake(x, t) {
  if (t < 18.3) return
  const p = Math.min(1, (t - 18.3) / 0.35), s = p < 1 ? 1 - Math.pow(1 - p, 3) * 1.0 + Math.sin(p * Math.PI) * 0.15 : 1
  x.save(); x.translate(540, 1130); x.scale(s, s)
  x.fillStyle = INK; rr(x, -190, -60, 380, 170, 26); x.fill()
  x.fillStyle = '#f7a8c0'; rr(x, -180, -50, 360, 150, 20); x.fill()
  x.fillStyle = '#fff8ea'; rr(x, -180, -50, 360, 44, 20); x.fill()
  for (let i = 0; i < 7; i++) { x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(-150 + i * 50, -6, 14, 0, Math.PI); x.fill() }
  x.fillStyle = '#c23a6a'; x.font = "800 34px Inter"; x.textAlign = 'center'; x.fillText('YOUR DAY', 0, 62)
  for (let i = 0; i < 5; i++) {
    const cx = -100 + i * 50
    x.fillStyle = INK; x.fillRect(cx - 9, -128, 18, 80); x.fillStyle = ['#7fe0ff', GOLD, '#ff8fb1', '#7dffb0', '#c9a6ff'][i]; x.fillRect(cx - 6, -125, 12, 74)
    const f = 1 + 0.18 * Math.sin(t * 13 + i * 2)
    x.fillStyle = '#ffd45a'; x.beginPath(); x.ellipse(cx, -146, 11 * f, 20 * f, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff8ea'; x.beginPath(); x.ellipse(cx, -140, 5, 9, 0, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function windowFrame(x, t) {
  // the party window the Sun bursts through: shutters flung open
  x.save(); x.translate(540, 640)
  x.fillStyle = 'rgba(255,214,120,0.10)'; x.fillRect(-330, -360, 660, 720)
  x.strokeStyle = INK; x.lineWidth = 22; x.strokeRect(-330, -360, 660, 720)
  x.strokeStyle = '#c98a5a'; x.lineWidth = 12; x.strokeRect(-330, -360, 660, 720)
  const sw = Math.max(0, 1 - Math.max(0, t + 0.4) / 0.9)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 330, 0); x.rotate(s * (0.15 + 0.25 * Math.sin(Math.min(1, Math.max(0, t + 0.6)) * 9) * Math.exp(-Math.max(0, t + 0.6) * 2)) + s * 0.1)
    x.fillStyle = INK; x.fillRect(s > 0 ? 0 : -150, -350, 150, 700); x.fillStyle = '#7fb0c9'; x.fillRect(s > 0 ? 8 : -142, -342, 134, 684)
    x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(s > 0 ? 30 : -120, -320, 30, 300)
    x.restore()
  }
  void sw
  // bunting
  for (let i = 0; i < 9; i++) { const bx = -360 + i * 90, by = -400 + Math.sin(i * 0.9) * 8; x.fillStyle = ['#ff8fb1', GOLD, '#7fe0ff'][i % 3]; x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(bx - 34, by); x.lineTo(bx + 34, by); x.lineTo(bx, by + 60); x.closePath(); x.fill(); x.stroke() }
  x.restore()
}

const E = episode({
  sign: 'cancer', duration: 26.6, ending: 'cut',
  entrance: { kind: 'burst', at: -0.25, x: 540, y: 640, size: 560 },
  hook: { text: 'CANCER. Whose | birthday *is* it?', top: 880 },
  sun: {
    mood: [[0, 'wide'], [0.7, 'happy'], [7.6, 'sad'], [10.0, 'wide'], [11.2, 'neutral'], [14.8, 'happy'], [18.4, 'love'], [22.6, 'proud']],
    pos: [[15.0, { x: 540 }], [15.6, { x: 600 }], [18.0, { x: 600 }], [18.6, { x: 540 }]], hops: [10.0, 14.8, 16.2],
  },
  me: {
    mood: [[0, 'wide'], [1.2, 'happy'], [6.0, 'neutral'], [10.0, 'wide'], [12.6, 'squint'], [14.8, 'neutral'], [16.7, 'wide'], [18.4, 'sparkle'], [22.6, 'happy']],
    tears: [[0, 0], [18.8, 2], [21.0, 3]],
    look: [[0, [0, -1]], [3, [1, 0]], [6.0, [0, -1]], [16.7, [0, -1]], [18.4, [0, -1]]],
    squash: [[0, 0], [22.4, 0], [22.8, 0.16]],
    hops: [3.4, 3.9, 4.4, 4.9],
  },
  bubbles: [
    { t0: 3.0, t1: 5.8, who: 'cancer', text: 'It’s MY party! Has everyone got a *snack?*' },
    { t0: 10.0, t1: 12.4, who: 'sun', text: 'Cancer. When did YOU last *sit down?*', y: 1120 },
    { t0: 12.6, t1: 14.6, who: 'cancer', text: 'But who’ll do the *dips?*' },
    { t0: 14.8, t1: 18.0, who: 'sun', text: 'You look after everyone. Tonight, let them look after *you.*', y: 1120 },
    { t0: 20.2, t1: 22.4, who: 'pisces', text: 'I brought tissues. *For me.*' },
    { t0: 22.6, who: 'cancer', text: 'Sitting down. *Being* celebrated.', size: 52, x: 450, maxW: 680, tail: 90 },
  ],
  pisces: { at: 19.4, tears: [[19.4, 3]], hops: [20.2, 20.6] },
  fx: [notification(NOTIF)], fxCues: notificationCues(NOTIF),
  back: windowFrame,
  front(x, t) {
    plates(x, t)
    const p = Math.min(1, Math.max(0, (t - 5.9) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - 9.6) / 0.3)))
    if (p > 0.01) drawPanel(x, t, { x: 540, y: 1010, w: 680, h: 380, title: 'EVERYONE OK?', color: '#7fe0ff', pop: p, rows: ROWS, size: 38 })
    cake(x, t)
    hearts(x, t, { at: 18.5, cx: 540, cy: 1040, color: '#ff8fb1' })
  },
  cues: [...ROWS.map((r, i) => ['pop', r.at, 784 + i * 90, 0.03, 0.2]), ['whoosh', 15.4, 0.6, 0.06], ['bell', 18.35, 830.61, 0.05, 2.2, 0], ['glitter', 18.4, 19.2], ['pluck', 22.65, 622.25, 0.05, 0.8, 0]],
})
export const { DURATION, SCENES, CUES } = E
