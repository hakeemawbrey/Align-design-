// kpple09 · Planet Talk: Pluto · "Pluto to Sagittarius: The Feeling Packed Light" (24 s vertical, loop) · synthwave · Bm
//   0      Pluto mid-drop onto an airport departures board, tiles flipping, Sag mid-sprint with a backpack, skidding ·
//          "SAGITTARIUS. | *Stop* running." · 0.5 lands on the board: boom, shake, whip
//   2.9    the board: FEELING SAD → LISBON · FEELING ATTACHED → THE COAST · CRUSH TEXTED → ANYWHERE · stamps fly
//   6.0    ♐ "new feeling? new *country.*" · 8.7 ♇ "the feeling comes *with* you." · 11.4 the backpack unzips:
//          a little grey feeling-cloud waves hello · 12.0 ♐ "it's been in there the whole *TIME?*"
//   14.8   ♇ "it packs light. sit with it for *one* coffee." · 18.0 a bench, a coffee, the cloud, Pisces sobbing:
//          "it's so *small* and *cute*" · 20.8 ♇ "one coffee. still *counts.*" · 22.3 "The feeling | *packed light.*"
//   23.55  loops back into the frame-0 skid
import { plutoFilm } from '../../kpple01/plutokit.js'

const D = 24
const PL = 'pluto', SA = 'sagittarius', PI = 'pisces'
const ROWS = [['FEELING SAD', 'LISBON'], ['FEELING ATTACHED', 'THE COAST'], ['CRUSH TEXTED', 'ANYWHERE'], ['SUNDAY SCARIES', 'MOUNTAINS']]
const UNZIP = 11.4, SIT = 18.0
const BX = 70, BY = 820, BW = 940, RH = 86

function cloud(x, K, t, X, Y, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y + Math.sin(t * 3) * 8); x.scale(s * k, s * k)
  x.fillStyle = K.INK; for (const [cx, cy, r] of [[-50, 10, 52], [0, -20, 64], [52, 8, 50], [0, 26, 50]]) { x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#b9b4c9'; for (const [cx, cy, r] of [[-50, 10, 52], [0, -20, 64], [52, 8, 50], [0, 26, 50]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  K.rect(x, -24, -6, 12, 18, K.INK); K.rect(x, 14, -6, 12, 18, K.INK)
  x.strokeStyle = K.INK; x.lineWidth = 5; x.beginPath(); x.arc(0, 22, 12, 0.2, Math.PI - 0.2); x.stroke()
  // a little waving arm
  x.save(); x.translate(80, -10); x.rotate(-0.6 + 0.5 * Math.sin(t * 9)); K.box(x, -6, -46, 14, 46, '#b9b4c9', { o: 4 }); x.restore()
  x.restore()
}

const F = plutoFilm({
  id: 'kpple09', sign: SA, dur: D, ending: 'loop',
  hook: { text: 'SAGITTARIUS. | *Stop* running.', out: [2.5, 2.75] },
  enter: { kind: 'drop', at: -0.5, len: 1.0, x: 540, y: 690, size: 250 },
  shots: [{ at: 11.2, z: 1.15, cx: 640, cy: 1250, d: 0.6 }, { at: 14.7, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 6.0, t1: 8.4, who: SA, text: 'new feeling? new *country.*', x: 540, y: 1790, tailUp: true, tail: 180 },
    { t0: 8.7, t1: 11.1, who: PL, text: 'the feeling comes *with* you.', x: 540, y: 420 },
    { t0: 12.0, t1: 14.5, who: SA, text: "it's been in there the whole *TIME?*", x: 540, y: 1790, tailUp: true, tail: 180 },
    { t0: 14.8, t1: 17.8, who: PL, text: 'it packs light. sit with it for *one* coffee.', x: 540, y: 420 },
    { t0: 18.4, t1: 20.6, who: PI, text: "it's so *small* and *cute*", x: 380, y: 1160, tail: -100 },
    { t0: 20.8, t1: 22.2, who: PL, text: 'one coffee. still *counts.*', x: 540, y: 420 },
  ],
  last: { text: 'The feeling | *packed light.*', at: 22.3, y: 230 },
  bg(x, t, K) {
    // the terminal: a big window wall, floor
    const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#1a1a40'); g.addColorStop(1, '#3a2a50')
    x.fillStyle = g; x.fillRect(-400, -400, 1880, 2720)
    for (let i = 0; i < 6; i++) K.rect(x, i * 200, 1100, 8, 420, 'rgba(255,255,255,0.08)')
    K.rect(x, -400, 1540, 1880, 600, '#2a2238'); K.rect(x, -400, 1536, 1880, 6, 'rgba(255,255,255,0.12)')
    // the departures board
    K.box(x, BX, BY - 70, BW, 70 + RH * ROWS.length, '#0e0c18', { o: 8 })
    K.txt(x, 'DEPARTURES', BX + 30, BY - 35, { size: 34, align: 'left', color: '#f2c75c', spacing: 4 })
    ROWS.forEach(([a, b], i) => {
      const y = BY + i * RH, shown = t > 2.9 + i * 0.3
      const flip = t < 1.4 || (t > 2.9 + i * 0.3 - 0.4 && t < 2.9 + i * 0.3)
      const scr = s => flip ? s.split('').map((c, j) => c === ' ' ? ' ' : String.fromCharCode(65 + Math.floor((Math.sin(t * 40 + j * 3 + i) * 0.5 + 0.5) * 26))).join('') : s
      K.rect(x, BX + 10, y + 6, BW - 20, RH - 12, '#1e1a2e')
      K.txt(x, scr(shown || flip ? a : '----'), BX + 30, y + RH / 2, { size: 32, align: 'left', color: '#efe6d6' })
      K.txt(x, scr(shown || flip ? '→ ' + b : ''), BX + BW - 30, y + RH / 2, { size: 32, align: 'right', color: '#7fe3ff' })
    })
  },
  paint(x, t, K) {
    K.pluto(x, t, { mood: t < 6 ? 'angry' : t > 20.7 ? 'proud' : t > 17.9 ? 'happy' : 'neutral', look: t > 5.9 && t < 14.6 ? [0.6, 1] : undefined })
    // passport stamps
    ;[['DEPARTED', 4.2, 250, 1270, -0.2], ['DEPARTED AGAIN', 4.6, 760, 1240, 0.15], ['DEPARTED (3)', 5.0, 470, 1330, -0.05]].forEach(([s, at, X, Y, r]) => {
      if (t < 8.6) K.label(x, s, X, Y, { size: 30, bg: '#ff8a8a', rot: r, pop: K.inOut(t, at, 8.6) })
    })
    // Sagittarius: skids at frame 0, runs in place, then sits on the bench with a coffee
    const sit = K.ease.inOutCubic(K.prog(t, SIT - 0.4, SIT + 0.2))
    if (sit > 0) { K.box(x, 120, 1500, 840, 30, '#5a4a6a'); K.box(x, 160, 1530, 20, 60, '#3a2a4a'); K.box(x, 900, 1530, 20, 60, '#3a2a4a') }
    const run = t < SIT - 0.4 ? 0.07 * Math.sin(t * 16) : 0
    const SX = K.lerp(700, 660, sit), SY = K.lerp(1400, 1360, sit)
    // the backpack behind it
    const zip = K.prog(t, UNZIP, UNZIP + 0.3)
    x.save(); x.translate(SX + 140, SY - 20); x.rotate(0.15); K.box(x, -70, -110, 140, 190, '#d4513d', { o: 6 }); K.rect(x, -60, -110 + 30 * zip, 120, 10, '#8a2a2a'); x.restore()
    K.sign(x, t, SA, { x: SX, y: SY, size: 290, mood: t < 2.7 ? 'wide' : t < 8.6 ? 'happy' : t < 11.5 ? 'squint' : t < 14.7 ? 'wide' : 'neutral', squash: run - (t < 0.6 ? 0.12 * (1 - t / 0.6) : 0), look: t > 8.6 && t < 11.5 ? [0, -1] : t > UNZIP && t < 14.7 ? [1, -0.4] : undefined })
    // skid marks at frame 0
    if (t < 1.2) { x.save(); x.globalAlpha = 1 - t / 1.2; for (let i = 0; i < 4; i++) K.rect(x, SX - 300 + i * 40, 1540 + i * 6, 220, 8, 'rgba(255,255,255,0.4)'); x.restore() }
    // the feeling-cloud
    const ck = K.pop01(t, UNZIP + 0.2, 0.4, 2.6)
    const cx = K.lerp(SX + 150, 900, sit), cy = K.lerp(SY - 180, 1380, sit)
    cloud(x, K, t, cx, cy, K.lerp(0.9, 0.7, sit), ck)
    if (sit > 0.5) { x.save(); x.translate(SX - 150, 1450); K.box(x, -26, -60, 52, 60, '#efe6d6', { o: 4 }); K.rect(x, -26, -60, 52, 12, '#7a4a2a'); x.restore() }
    if (t > SIT) K.pisces(x, t, { x: 260, y: 1390, size: 210, pop: K.pop01(t, SIT, 0.35), look: [1, -0.2] })
  },
  cues: [
    ...ROWS.map((r, i) => ['tick', +(2.9 + i * 0.3).toFixed(2), 0.06]),
    ['pop', 4.2, 392, 0.04, -0.3], ['pop', 4.6, 440, 0.04, 0.3], ['pop', 5.0, 493.88, 0.04, 0],
    ['whoosh', UNZIP, 0.25, 0.05], ['pop', UNZIP + 0.25, 1318.51, 0.04, 0.3], ['glitter', UNZIP + 0.3, UNZIP + 1.2],
    ['whoosh', SIT - 0.4, 0.5, 0.04], ['glitter', 18.4, 19.4],
  ],
  music: { style: 'synthwave', key: 'Bm', seed: 10909, sections: { breakdown: [UNZIP], lift: [SIT] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
