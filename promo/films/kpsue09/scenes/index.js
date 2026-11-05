// kpsue09: PLANET TALK: THE SUN, Ep 9 "Sagittarius Said 'Sometime'" (23.2 s, star_talk post, synthwave · Bm). Hard cut.
// Frame 0: the Sun mid-spin in, Sag mid-jump with a backpack, hook "SAG. Sometime is not a date."
//   3.0 Sag: I told everyone "let's hang sometime!" · 5.8 CHATS: sometime!! ×11 · 10.4 Sun: sometime isn't on any
//   calendar, pick a day · 13.8 "Thursday. For… everyone." · 15.8 whip zoom: Thursday, eleven friends at one picnic
//   16.6 Sun: that's a lot of Thursday · 18.6 Pisces happy-sobs · 21.0 "Thursday. Everyone's Thursday."
import { episode, drawPanel, drawStamp, rr, key, INK } from '../../kpsue01/sunkit.js'
import { whipZoom, whipZoomCues } from '../../hookkit.js'
import { drawSign } from '../../planetkit.js'

const WHIP = { at: 15.8, len: 0.5, from: 1.7 }
const CHATS = ['Ana: when?? → “sometime!!”', 'Jo: still on? → “sometime!”', 'Max: which day → “soon-ish!”', 'Lu: ??? → “sometime!!!”', '…and 7 more chats']
const CROWD = [['aries', 130, 1330], ['taurus', 290, 1290], ['gemini', 790, 1290], ['cancer', 950, 1330], ['leo', 110, 1560], ['virgo', 270, 1600], ['libra', 810, 1600], ['scorpio', 970, 1560], ['capricorn', 420, 1250], ['aquarius', 660, 1250]]

function picnic(x, t) {
  if (t < 15.85) return
  x.save()
  x.fillStyle = INK; x.beginPath(); x.ellipse(540, 1560, 520, 150, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e5573b'; x.beginPath(); x.ellipse(540, 1560, 505, 138, 0, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.ellipse(540, 1560, 505, 138, 0, 0, Math.PI * 2); x.clip(); x.fillStyle = '#fff8ea'
  for (let i = -12; i < 12; i++) for (let j = -4; j < 4; j++) if ((i + j) % 2 === 0) x.fillRect(540 + i * 50, 1560 + j * 40, 50, 40)
  x.restore()
  x.restore()
  drawStamp(x, t, { at: 16.0, text: 'THURSDAY', x: 540, y: 1100, size: 80, rot: -0.1, color: '#f2c75c', out: [20.6, 20.9] })
}
function crowd(x, t) {
  if (t < 15.85) return
  CROWD.forEach(([s, cx, cy], i) => {
    const pop = Math.min(1, Math.max(0, (t - 15.9 - i * 0.07) / 0.25))
    drawSign(x, s, cx, cy, 150, t, { pop: pop < 1 ? pop * (1 + 0.25 * Math.sin(pop * Math.PI)) : 1, mood: i % 3 ? 'happy' : 'sparkle', look: [0, 0], hops: [16.5 + i * 0.1, 21.1 + i * 0.05], seed: i + 3, glyph: false })
  })
}

const E = episode({
  sign: 'sagittarius', duration: 23.2, ending: 'cut',
  entrance: { kind: 'spin', at: -0.65, x: 540, y: 600, size: 520 },
  hook: { text: 'SAG. Sometime is | not a *date.*' },
  tint: '#c06aff',
  sun: {
    mood: [[0, 'wide'], [0.6, 'happy'], [3.0, 'neutral'], [5.8, 'wide'], [8.0, 'sly'], [10.4, 'happy'], [13.8, 'proud'], [15.8, 'wide'], [17.2, 'happy'], [21.0, 'love']],
    shades: [[0, true], [10.3, false]],
    pos: [[15.8, { y: 600, size: 520 }], [16.1, { y: 470, size: 440 }]],
    hops: [10.4, 10.9, 16.6],
  },
  me: {
    base: { x: 540, y: 1420, size: 300 },
    mood: [[0, 'wide'], [1.0, 'happy'], [3.0, 'sparkle'], [5.8, 'happy'], [10.4, 'wide'], [13.8, 'squint'], [15.0, 'happy'], [21.0, 'happy']],
    look: [[0, [0, -1]], [3.0, [0, 0]], [10.4, [0, -1]], [16.0, [0, 0]]],
    squash: [[-1, -0.18], [0, -0.18], [0.3, 0.1], [0.6, 0]],
    hops: [3.1, 3.5, 3.9, 21.1, 21.4, 21.7],
  },
  bubbles: [
    { t0: 3.0, t1: 5.6, who: 'sagittarius', text: 'I told everyone “let’s hang *sometime!*”' },
    { t0: 10.4, t1: 13.6, who: 'sun', text: 'SAG! “Sometime” isn’t on ANY calendar. *Pick a day.*', y: 1060, shake: 2 },
    { t0: 13.8, t1: 15.6, who: 'sagittarius', text: 'Fine! Thursday. For… *everyone.*' },
    { t0: 16.6, t1: 18.6, who: 'sun', text: 'That’s… a lot of *Thursday.*', y: 820 },
    { t0: 19.0, t1: 20.8, who: 'pisces', text: 'I came! I’m SO *happy!*' },
    { t0: 21.0, who: 'sagittarius', text: 'Thursday. *Everyone’s* Thursday.', size: 52, x: 470, maxW: 720, tail: 60 },
  ],
  pisces: { at: 18.6, tears: [[18.6, 3]], hops: [19.0, 19.4] },
  fx: [whipZoom(WHIP)], fxCues: whipZoomCues(WHIP),
  back: picnic,
  mid(x, t) { crowd(x, t) },
  front(x, t) {
    // backpack bouncing on Sag's back
    if (t < 15.8) { const by = 1440 + Math.sin(t * 2.2 + 8.4) * 10; x.save(); x.translate(700, by); x.rotate(0.25); x.fillStyle = INK; rr(x, -60, -80, 120, 160, 30); x.fill(); x.fillStyle = '#7a5ad0'; rr(x, -52, -72, 104, 144, 24); x.fill(); x.fillStyle = '#f2c75c'; x.fillRect(-52, -20, 104, 12); x.restore() }
    const p = Math.min(1, Math.max(0, (t - 5.7) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - 10.1) / 0.3)))
    if (p > 0.01) drawPanel(x, t, { x: 540, y: 1020, w: 820, h: 420, title: 'CHATS', color: '#c9a6ff', pop: p, rows: CHATS.map((text, i) => ({ at: 6.0 + i * 0.3, text, color: i === 4 ? '#c23a6a' : undefined })), size: 36 })
    void key
  },
  cues: [...CHATS.map((_, i) => ['pop', +(6.0 + i * 0.3).toFixed(2), 880 + i * 60, 0.03, 0.2]), ['tom', 16.0, 90, { gain: 0.25, decay: 0.3 }], ...CROWD.map((_, i) => ['pop', +(15.9 + i * 0.07).toFixed(2), 700 + i * 50, 0.025, (i % 2 ? 0.3 : -0.3)]), ['glitter', 16.0, 16.8]],
})
export const { DURATION, SCENES, CUES } = E
