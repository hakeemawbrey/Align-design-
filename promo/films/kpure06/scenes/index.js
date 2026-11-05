// kpure06 · Planet Talk: Uranus · "Virgo Lets the Night Wander" (27 s vertical, loop) · lofi · D · star_advice
//   0      Uranus crash-landing on Virgo's colour-coded planner, pages mid-flutter; "VIRGO. | Drop the *timetable.* Now."
//   0.45   glitch · 2.7 "First date. *Fully* scheduled." 7:02 ARRIVE · 7:14 TOPIC TWO · 7:40 DESSERT · 8:40 GRACEFUL EXIT
//   8.2    Uranus scribbles over 8:00–9:00: WANDER · ♅ "What if you left *one hour* to wander?"
//   11.8   ♍ "And do *what?*" · 13.3 ♅ "*Whatever happens.*"
//   15.2   whip to the night market: the date: "Ooh, a night market. *Shall we?*" · ♍ laughs: "*Yes.* Unplanned."
//   19.6   notification: "can we get lost again next week?" · 20.4 Pisces crying at the dumpling stall
//   23.0   "Best part? | *Wasn't on the plan.*" · 26.55 eases back into frame 0 (loop)
import { urFilm, HK } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 27, PLAN = 2.7, SCRIB = 8.2, MARKET = 15.2, NOTE = 19.6, PIS = 20.4, LAST = 23.0
const DATE = 'aries', DC = '#ff9a6a'
const ROWS = [['7:02', 'ARRIVE', '#9fe6b0'], ['7:14', 'TOPIC TWO', '#f2c75c'], ['7:40', 'DESSERT', '#ff8fb1'], ['8:00', 'COMPLIMENT', '#c9a6ff'], ['8:40', 'GRACEFUL EXIT', '#7fe3ff']]
const NOTIF = { at: NOTE, out: [22.0, 22.3], title: 'MESSAGES', body: 'can we get *lost* again next week?', glyph: '♥', y: 380 }

function desk(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1e2a3e'); g.addColorStop(1, '#2c3a4e')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  for (let i = 0; i < 8; i++) K.rect(x, 0, 200 + i * 140, 1080, 2, 'rgba(255,255,255,0.04)')
  K.box(x, -20, 1080, 1120, 900, '#8a6a4a', { o: 8 })
  for (let i = 0; i < 6; i++) K.rect(x, -20, 1140 + i * 140, 1120, 4, 'rgba(0,0,0,0.12)')
  // a lamp + a neat pen cup
  K.box(x, 860, 900, 120, 180, '#efe6d6'); K.rect(x, 900, 840, 8, 60, '#3a3a4a')
  for (let i = 0; i < 3; i++) K.rect(x, 880 + i * 30, 860 - i * 12, 10, 60, ['#ff8fb1', '#f2c75c', '#7fe3ff'][i])
}
function planner(x, t, K) {
  const X = 540, Y = 1360, W = 940, H = 600
  x.save(); x.translate(X, Y); x.rotate(-0.02)
  K.box(x, -W / 2, -H / 2, W, H, '#fffaf0', { o: 8 }); K.rect(x, -6, -H / 2, 12, H, '#d8cdb8')
  // left page: a tidy header + tabs
  K.txt(x, 'FRIDAY', -W / 4, -H / 2 + 60, { size: 40, color: K.INK, font: K.INTER, weight: 900 })
  K.txt(x, 'first date ♡', -W / 4, -H / 2 + 110, { size: 30, color: '#7a5cc0' })
  for (let i = 0; i < 4; i++) K.rect(x, -W / 2 + 40, -H / 2 + 170 + i * 80, W / 2 - 90, 4, '#e3dccb')
  // right page: the timetable
  const shown = t < PLAN ? ROWS.length : Math.min(ROWS.length, Math.floor((t - PLAN - 0.1) / 0.45) + 1)
  ROWS.forEach(([tm, s, c], i) => {
    if (i >= shown) return
    const y = -H / 2 + 60 + i * 100
    K.box(x, 30, y, W / 2 - 70, 76, c, { o: 3 })
    K.txt(x, tm, 50, y + 38, { size: 28, align: 'left', color: K.INK })
    K.txt(x, s, 150, y + 38, { size: 28, align: 'left', color: K.INK, font: K.INTER, weight: 800 })
  })
  // the scribble: 8:00–9:00 becomes WANDER
  const sk = prog(t, SCRIB, SCRIB + 0.7)
  if (sk > 0) {
    x.save(); x.strokeStyle = '#2fc7d0'; x.lineWidth = 14; x.lineCap = 'round'; x.lineJoin = 'round'
    x.beginPath(); const n = Math.floor(sk * 14)
    for (let i = 0; i <= n; i++) { const px = 40 + (i % 2 ? W / 2 - 100 : 0), py = 100 + i * 12; i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    if (sk >= 1) { x.save(); x.translate(W / 4, 160); x.rotate(-0.1); x.scale(K.pop01(t, SCRIB + 0.7, 0.3), K.pop01(t, SCRIB + 0.7, 0.3)); K.box(x, -150, -44, 300, 88, '#2fc7d0', { o: 5 }); K.txt(x, 'WANDER', 0, 2, { size: 50, font: K.INTER, weight: 900, color: '#fff' }); x.restore() }
  }
  x.restore()
}
function market(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0c0a24'); g.addColorStop(1, '#2a1838')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // string lights
  for (let r = 0; r < 2; r++) {
    x.strokeStyle = '#1a1030'; x.lineWidth = 4; x.beginPath(); x.moveTo(-20, 520 + r * 160); x.quadraticCurveTo(540, 640 + r * 160, 1100, 520 + r * 160); x.stroke()
    for (let i = 0; i < 12; i++) { const u = i / 11, px = lerp(-20, 1100, u), py = lerp(520 + r * 160, 520 + r * 160, u) + 2 * (1 - u) * u * 120; const on = 0.6 + 0.4 * Math.sin(t * 3 + i + r); x.fillStyle = `rgba(255,214,140,${on})`; x.beginPath(); x.arc(px, py + 14, 12, 0, Math.PI * 2); x.fill() }
  }
  // stalls
  const st = [['NOODLES', '#e8628a'], ['DUMPLINGS', '#f2c75c'], ['PLANTS', '#9fe6b0']]
  st.forEach(([s, c], i) => { const X = 60 + i * 340; K.box(x, X, 980, 300, 380, '#3a2a4a', { o: 6 }); K.box(x, X - 10, 940, 320, 70, c, { o: 6 }); K.txt(x, s, X + 150, 976, { size: 28, color: K.INK, font: K.INTER, weight: 900 }); K.box(x, X, 1260, 300, 100, '#c99a6a', { o: 5 }) })
  x.fillStyle = '#2a2030'; x.fillRect(0, 1360, 1080, 560)
}

const F = urFilm({
  id: 'kpure06', sign: 'virgo', dur: D, ending: 'loop',
  hook: { text: 'VIRGO. | Drop the *timetable.* | Now.', top: 210, size: 98 },
  entry: { kind: 'crash', at: -0.6, x: 560, y: 900, size: 400 },
  brk: { at: 0.5, len: 0.45 },
  debris: [
    { w: 200, h: 140, color: '#fffaf0', x: 300, y: 1150, vx: -500, vy: -1200, spin: 3, t0: -0.1, front: true },
    { w: 200, h: 140, color: '#f2c75c', x: 760, y: 1150, vx: 560, vy: -1300, spin: -3, t0: -0.08, front: true },
    { w: 180, h: 130, color: '#9fe6b0', x: 560, y: 1150, vx: 160, vy: -1600, spin: 2, t0: -0.06, front: true },
  ],
  bg(x, t, K) { (t < MARKET ? desk : market)(x, t, K) },
  paint(x, t, K) {
    if (t < MARKET) {
      planner(x, t, K)
      const U = K.track(t, [[0, { x: 560, y: 900, size: 400 }], [PLAN + 0.5, { x: 790, y: 640, size: 320 }]])
      K.uranus(x, t, { ...U, mood: t < PLAN ? 'happy' : t < SCRIB ? 'wide' : 'sly', look: t < PLAN ? [0, 1] : [-0.6, 1], hops: [SCRIB + 0.7, 13.4] })
      const V = K.track(t, [[0, { x: 210, y: 820, s: 300 }], [PLAN + 0.5, { x: 230, y: 760, s: 280 }]])
      K.sign(x, t, 'virgo', { ...V, mood: t < PLAN ? 'wide' : t < SCRIB ? 'sparkle' : t < 11.8 ? 'wide' : 'squint', look: [1, 0.8], hops: [0.5, 11.9], sweat: t > SCRIB && t < MARKET })
      return
    }
    const walk = Math.sin(t * 6) * 6
    K.sign(x, t, 'virgo', { x: 340, y: 1520 + walk, s: 300, mood: t < 17.6 ? 'wide' : 'happy', look: [1, 0], hops: [17.7, 18.1, NOTE + 0.2], shadow: true })
    K.sign(x, t, DATE, { x: 740, y: 1520 - walk, s: 300, glyph: false, mood: 'happy', look: [-1, 0], seed: 3, shadow: true })
    K.uranus(x, t, { noEntry: true, x: 540, y: 680, size: 240, mood: 'love', look: [0, 1] })
    const pk = K.pop01(t, PIS, 0.4)
    if (pk > 0) K.pisces(x, t, { x: 550, y: 1160, s: 210, pop: pk, hops: [PIS + 0.8, PIS + 1.6] })
  },
  lines: [
    { t0: 5.9, t1: 8.0, who: 'virgo', text: 'Topic two is the *backup* topic.', x: 360, y: 500, tail: -120 },
    { t0: SCRIB + 0.2, t1: 11.6, who: 'uranus', text: 'What if you left *one hour* to wander?', x: 540, y: 380, tail: 220, maxW: 760 },
    { t0: 11.8, t1: 13.2, who: 'virgo', text: 'And do *what?*', x: 330, y: 520, tail: -100 },
    { t0: 13.3, t1: 15.0, who: 'uranus', text: '*Whatever happens.*', x: 700, y: 380, tail: 100 },
    { t0: 15.5, t1: 17.4, who: 'the date', color: DC, text: 'Ooh, a night market. *Shall we?*', x: 620, y: 1800, tailUp: true, tail: 120 },
    { t0: 17.6, t1: 19.4, who: 'virgo', text: '*Yes.* Unplanned. (laughs)', x: 420, y: 1800, tailUp: true, tail: -80 },
    { t0: PIS + 0.2, t1: 22.8, who: 'pisces', text: '*spontaneous* Virgo!!', x: 560, y: 900, tail: 0 },
  ],
  heads: [
    { at: PLAN, text: 'First date. | *Fully* scheduled.', out: [5.6, 5.85], top: 240, size: 96 },
    { at: LAST, text: 'Best part? | *Wasn’t on the plan.*', top: 240, size: 100, out: [D - 0.5, D - 0.2] },
  ],
  fx: [
    { f: HK.whipZoom, c: HK.whipZoomCues, o: { at: MARKET, len: 0.45, from: 1.5 } },
    { f: HK.notification, c: HK.notificationCues, o: NOTIF },
  ],
  cues: [
    ...ROWS.map((_, i) => ['tick', +(PLAN + 0.1 + i * 0.45).toFixed(2), 0.06]),
    ['whoosh', SCRIB, 0.6, 0.04], ['pop', SCRIB + 0.72, 1174.66, 0.05, 0],
    ['glitter', MARKET + 0.1, MARKET + 1], ['glitter', PIS, PIS + 1],
  ],
  music: { style: 'lofi', key: 'D', seed: 8106, sections: { drop: PLAN, breakdown: [SCRIB], lift: [MARKET] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
