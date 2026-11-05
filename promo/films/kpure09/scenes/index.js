// kpure09 · Planet Talk: Uranus · "Sagittarius Books a Second Date" (24 s vertical, loop) · synthwave · Bm · star_talk
//   0      Uranus skydiving onto Sag's backpack (parachute and all), the map mid-flight;
//          "SAGITTARIUS. | Plan something for *next month.*"
//   0.45   glitch · 2.7 "Loves them. *Plans till Friday.*" the calendar: this week full, everything after it blank
//   5.6    ♐ "Commitment? Sounds *heavy.*" · 7.8 ♅ "Wild idea: put a date *in the calendar.*"
//   10.8   the page flips to NEXT MONTH · 11.2 Sag circles the 14th, sweating (caught circle)
//   12.6   countdown 3-2-1-GO · 15.1 ♐ "Concert on the *14th?*" · 17.2 notification: "*already* marked it"
//   18.2   Pisces sobbing on the map: "a *FUTURE* date!!" · 20.6 "A plan. | *And I'm still free.*" · loop
import { urFilm, HK } from '../../kpure01/urkit.js'
import { prog, ease, lerp, clamp } from '../../../src/lib.js'

const D = 24, CAL = 2.7, FLIPM = 10.8, CIRC = 11.2, CD = 12.6, ASKT = 15.1, NOTE = 17.2, PIS = 18.2, LAST = 20.6
const GX = 560, GY = 1010, CW = 104, CH = 84                 // calendar grid centre + cell size (7 × 5)
const cell = d => ({ x: GX + ((d - 1) % 7 - 3) * CW, y: GY - 120 + Math.floor((d - 1) / 7) * CH })
const C14 = cell(14)
const CAUGHT = { at: CIRC, x: C14.x, y: C14.y, r: 70, out: [CD - 0.1, CD + 0.1], label: 'THE 14TH', arrow: 'tl', rec: false }
const COUNT = { at: CD, from: 3, gap: 0.6, go: 'GO!', y: 900 }
const NOTIF = { at: NOTE, out: [20.3, 20.6], title: 'MESSAGES', body: '*already* marked it', glyph: '♥', y: 380 }

function dusk(x, t, K) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#120a2e'); g.addColorStop(0.55, '#5a2a6a'); g.addColorStop(1, '#f08a5a')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  K.drawSpace(x, t, { planet: 'uranus', stars: 0.7, glow: 0.3, seed: 9 })
  x.globalAlpha = 0.85; x.fillStyle = '#ff9a6a'; x.beginPath(); x.arc(540, 1250, 260, Math.PI, 0); x.fill(); x.globalAlpha = 1
  for (const [c, pts] of [['#3a1a4a', [[-20, 1300], [200, 1050], [420, 1260], [640, 1000], [900, 1240], [1100, 1100]]], ['#24122e', [[-20, 1400], [260, 1220], [540, 1380], [820, 1200], [1100, 1350]]]]) {
    x.fillStyle = c; x.beginPath(); x.moveTo(-20, 1920); pts.forEach(([a, b]) => x.lineTo(a, b)); x.lineTo(1100, 1920); x.closePath(); x.fill()
  }
  K.rect(x, -20, 1560, 1120, 400, '#1a0c22')
}
function calendar(x, t, K, k) {
  if (k <= 0.01) return
  const next = t >= FLIPM + 0.2
  const f = prog(t, FLIPM, FLIPM + 0.4), sy = Math.abs(Math.cos(f * Math.PI))
  x.save(); x.translate(GX, GY); x.scale(k, k * Math.max(0.05, sy)); x.translate(-GX, -GY)
  K.box(x, GX - 400, GY - 260, 800, 560, '#fffaf0', { o: 8 }); K.rect(x, GX - 400, GY - 260, 800, 80, next ? '#2fc7d0' : '#e8628a')
  K.txt(x, next ? 'NEXT MONTH' : 'THIS MONTH', GX, GY - 220, { size: 40, font: K.INTER, weight: 900, color: '#fff' })
  for (let d = 1; d <= 35; d++) {
    const c = cell(d)
    K.rect(x, c.x - CW / 2 + 4, c.y - CH / 2 + 4, CW - 8, CH - 8, '#efe6d6')
    if (d <= 31) K.txt(x, String(d), c.x - 34, c.y - 22, { size: 20, color: '#8a7a9a', align: 'left' })
    if (!next && d <= 5) K.txt(x, '★', c.x, c.y + 8, { size: 34, font: K.INTER, color: d === 5 ? '#e8628a' : '#f2c75c' })
    if (!next && d === 5) K.txt(x, 'FRI', c.x, c.y + 30, { size: 16, color: '#e8628a' })
    if (!next && d > 7 && d <= 31 && d % 3 === 0) K.txt(x, '?', c.x, c.y + 8, { size: 30, color: '#c9bfd8' })
    if (next && d === 14 && t > ASKT) K.txt(x, '♥', c.x, c.y + 10, { size: 40, font: K.INTER, color: '#e8628a' })
  }
  x.restore()
}

const F = urFilm({
  id: 'kpure09', sign: 'sagittarius', dur: D, ending: 'loop',
  hook: { text: 'SAGITTARIUS. | Plan something | for *next month.*', top: 210, size: 96 },
  entry: { kind: 'crash', at: -0.6, x: 560, y: 960, size: 380 },
  brk: { at: 0.5, len: 0.45 },
  debris: [
    { w: 220, h: 160, color: '#f2d28a', x: 300, y: 1300, vx: -420, vy: -1300, spin: 3, t0: -0.15, front: true, draw(x) { x.fillStyle = '#140c28'; x.fillRect(-116, -86, 232, 172); x.fillStyle = '#f2d28a'; x.fillRect(-110, -80, 220, 160); x.strokeStyle = '#e8628a'; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-90, 50); x.quadraticCurveTo(0, -60, 90, 20); x.stroke() } },
    { label: 'N', w: 80, h: 80, color: '#7fe3ff', x: 720, y: 1300, vx: 600, vy: -1400, spin: -6, t0: -0.15, front: true },
  ],
  bg: dusk,
  paint(x, t, K) {
    // Sag + backpack
    const S = K.track(t, [[0, { x: 560, y: 1480, s: 330 }], [CAL + 0.5, { x: 250, y: 1560, s: 300 }]])
    const nerv = t > CIRC && t < ASKT
    K.sign(x, t, 'sagittarius', { ...S, mood: t < CAL ? 'wide' : t < 7.8 ? 'happy' : t < CIRC ? 'squint' : nerv ? 'wide' : t < NOTE ? 'happy' : 'heart', look: t < CAL ? [0, -1] : [1, -0.6], hops: [ASKT, NOTE + 0.1, NOTE + 0.5], sweat: nerv, shadow: true })
    K.box(x, S.x + S.s * 0.22, S.y - S.s * 0.25, S.s * 0.28, S.s * 0.36, '#8a5a3a', { o: 5 })
    // Uranus, parachute still open as it lands
    const U = K.track(t, [[0, { x: 560, y: 960, size: 380 }], [CAL + 0.5, { x: 830, y: 1500, size: 280 }]])
    const chute = 1 - prog(t, 0.2, 0.8)
    if (chute > 0) {
      x.save(); x.globalAlpha = chute; const P = K.LAND > t ? 1 : 1
      const cy = (t < K.LAND ? lerp(U.y - 1500, U.y, ease.inQuad(prog(t, K.E.at, K.LAND))) : U.y) - 420
      x.strokeStyle = '#140c28'; x.lineWidth = 5; for (const dx of [-160, -60, 60, 160]) { x.beginPath(); x.moveTo(U.x + dx * 0.4, cy + 400); x.lineTo(U.x + dx, cy + 60); x.stroke() }
      x.fillStyle = '#140c28'; x.beginPath(); x.ellipse(U.x, cy + 60, 250, 140, 0, Math.PI, 0); x.fill()
      for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#fffaf0' : '#e8628a'; x.beginPath(); x.moveTo(U.x, cy + 60); x.ellipse(U.x, cy + 60, 238, 128, 0, Math.PI + i * Math.PI / 5, Math.PI + (i + 1) * Math.PI / 5); x.closePath(); x.fill() }
      x.restore()
    }
    K.uranus(x, t, { ...U, mood: t < CAL ? 'happy' : t < 7.8 ? 'sly' : t < NOTE ? 'happy' : 'love', look: t < CAL ? [0, 1] : [-1, -0.6], hops: [0.4, NOTE + 0.2] })
    // Pisces on the map
    const pk = K.pop01(t, PIS, 0.4) * K.outK(t, [D - 0.9, D - 0.6])
    if (pk > 0.01) { x.save(); x.translate(560, 1820); x.scale(pk, pk); K.box(x, -170, -40, 340, 90, '#f2d28a', { o: 5 }); x.restore(); K.pisces(x, t, { x: 560, y: 1700, s: 220, pop: pk, hops: [PIS + 0.8, PIS + 1.6] }) }
  },
  over(x, t, K) { calendar(x, t, K, K.pop01(t, CAL, 0.35) * K.outK(t, [D - 0.9, D - 0.6])) },
  lines: [
    { t0: 5.6, t1: 7.6, who: 'sagittarius', text: 'Commitment? Sounds *heavy.*', x: 420, y: 1720, tailUp: true, tail: -120 },
    { t0: 7.8, t1: 10.6, who: 'uranus', text: 'Wild idea: put a date *in the calendar.*', x: 560, y: 1720, tailUp: true, tail: 220, maxW: 720 },
    { t0: ASKT, t1: 17.0, who: 'sagittarius', text: 'Concert on the *14th?*', x: 420, y: 1720, tailUp: true, tail: -120 },
    { t0: PIS + 0.2, t1: 20.4, who: 'pisces', text: 'a *FUTURE* date!!', x: 560, y: 1480, tail: 0 },
  ],
  heads: [
    { at: CAL, text: 'Loves them. | *Plans till Friday.*', out: [5.4, 5.65], top: 240, size: 96 },
    { at: LAST, text: 'A plan. | *And I’m still free.*', top: 240, size: 104, out: [D - 0.5, D - 0.2] },
  ],
  fx: [
    { f: HK.caught, c: HK.caughtCues, o: CAUGHT },
    { f: HK.countdown, c: HK.countdownCues, o: COUNT },
    { f: HK.notification, c: HK.notificationCues, o: NOTIF },
  ],
  cues: [['whoosh', FLIPM, 0.35, 0.05], ['tick', FLIPM + 0.2, 0.06], ['glitter', PIS, PIS + 1]],
  music: { style: 'synthwave', key: 'Bm', seed: 8109, sections: { drop: 0.5, breakdown: [CD], lift: [ASKT] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
