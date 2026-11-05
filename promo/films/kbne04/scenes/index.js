// kbne04: BREAKING NEWS: THE STARS, Ep 4 · "Taurus left the usual spot" (15 s vertical, star_talk post, music: jazzy · F).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor is a traffic cam: ♉ Taurus mid-step out of THE
//        USUAL café, a "?!" over them. Hook: "BREAKING: Taurus tried | a *new place.*"
//   1.30 cut: SKY CAM. A street map, the route from THE USUAL to NEW SPOT traced live. Record scratch at 2.8:
//        "two blocks east. *TWO.*"
//   4.80 cut: LIVE in the new café. ♋ Cancer, the date, waves from a new table. ♐ Sagittarius reports: "they ordered…
//        the usual. but *here.*"
//   8.40 cut: close on Taurus's first bite: sparkle eyes. "…ok it's *good.*"
//  10.60 cut: the desk. ♓ Pisces, crying into a menu: "they looked so *brave.*"
//  13.70 last headline: "Same Taurus. | *New* table." Hard cut at 15.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, caught, bubble, chip, txt, px, mic, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, CYAN,
} from '../../kbne01/newskit.js'

const D = 15
const T = { slam: 0.15, cut1: 1.3, rec: 2.8, cut2: 4.8, cut3: 8.4, bite: 8.9, cut4: 10.6, sob: 10.9, last: 13.7 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.2, caption: 'two blocks east. *TWO.*', top: 1180 }
const S = 'THE STARS', SG = '♐︎ SAGITTARIUS · LIVE', TA = '♉︎ TAURUS', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'tonight, a Taurus left *the usual.*' },
  { t: 5.1, speaker: SG, color: '#ffb36a', text: 'they ordered… the usual. but *here.*' },
  { t: 8.7, speaker: TA, color: '#9fe6b0', text: '…ok it’s *good.*' },
  { t: 10.95, speaker: PI, color: '#8fd0ff', text: 'they looked so *brave.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'map' : t < T.cut3 ? 'cafe' : t < T.cut4 ? 'bite' : 'desk2'

function cafeFront(x, cx, y, name, col) {
  px(x, cx - 130, y - 150, 260, 150, INK); px(x, cx - 122, y - 142, 244, 134, col)
  px(x, cx - 110, y - 120, 220, 34, INK); txt(x, name, cx, y - 102, { size: 22, weight: 800, font: INTER, color: GOLD, shadow: false })
  px(x, cx - 90, y - 76, 70, 70, 'rgba(255,214,150,0.7)'); px(x, cx + 20, y - 76, 70, 70, 'rgba(255,214,150,0.7)')
}
function streetMap(x, t, st, R) {
  room(x, R, { top: '#24304a', bot: '#1a2238' })
  for (let i = 0; i < 6; i++) { px(x, R.x0, R.y0 + 90 + i * 140, R.x1 - R.x0, 40, '#3a4664') }
  for (let i = 0; i < 6; i++) { px(x, R.x0 + 60 + i * 180, R.y0, 40, R.y1 - R.y0, '#3a4664') }
  for (let j = 0; j < 5; j++) for (let i = 0; i < 5; i++) px(x, R.x0 + 110 + i * 180, R.y0 + 140 + j * 140, 120, 80, (i + j) % 3 ? '#2c3854' : '#2f5a48')
  const A = { x: 250, y: 860 }, B = { x: 610, y: 860 }
  // the route
  const u = ease.inOutCubic(prog(st, T.cut1 + 0.4, T.rec))
  x.setLineDash([18, 14]); x.strokeStyle = GOLD; x.lineWidth = 10; x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(lerp(A.x, B.x, u), A.y); x.stroke(); x.setLineDash([])
  chip(x, A.x, A.y + 70, 'THE USUAL', { size: 22, color: BONE })
  chip(x, B.x, B.y + 70, 'NEW SPOT', { size: 22, color: GOLD, border: GOLD, k: pop01(st, T.cut1 + 0.2, 0.3, 2) })
  sign(x, st, 'taurus', { x: lerp(A.x, B.x, u), y: A.y - 30, s: 110, mood: 'wide', seed: 9, glyph: false })
  chip(x, 830, 600, 'SKY CAM 2', { size: 22, color: CYAN })
  // the circle on "2 blocks"
  if (st > T.rec - 0.1) { arrowText(x, st) }
}
function arrowText(x, st) { txt(x, '← 2 BLOCKS →', 430, 790, { size: 30, weight: 800, font: INTER, color: '#ffe27a', alpha: clamp(prog(st, T.rec - 0.1, T.rec + 0.1)) }) }
function cafe(x, t, R) {
  room(x, R, { top: '#5a3a2a', bot: '#3a2418', floor: '#6a4a34' })
  // pendant lamps, a chalk menu
  for (const lx of [260, 820]) { px(x, lx - 3, R.y0, 6, 130, INK); px(x, lx - 50, R.y0 + 130, 100, 40, INK); px(x, lx - 44, R.y0 + 136, 88, 28, '#ffe6a0') }
  px(x, 400, 560, 280, 200, INK); px(x, 408, 568, 264, 184, '#20302a'); txt(x, 'TODAY', 540, 600, { size: 26, color: BONE, shadow: false }); for (let i = 0; i < 4; i++) px(x, 440, 640 + i * 28, 200 - (i % 2) * 60, 6, 'rgba(239,230,214,0.5)')
  // the table
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  px(x, 520, fy - 120, 420, 26, INK); px(x, 526, fy - 116, 408, 18, '#c48a5a'); px(x, 715, fy - 94, 30, 94, INK)
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne04', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Taurus tried | a *new place.*', at: -1, out: [4.6, 4.8], accent: '#9fe6b0' },
    { text: 'LIVE from | *the new table.*', at: T.cut2 + 0.05, out: [8.2, 8.4], accent: '#ffb36a' },
    { text: 'The verdict: | *delicious.*', at: T.cut3 + 0.05, out: [10.45, 10.6], accent: '#ffe27a' },
    { text: 'Same Taurus. | *New* table.', at: T.last, gap: 0.08, accent: GOLD, size: 104, accentSize: 150 },
  ],
  lines: LINES, box: { open: 1.35, close: 14.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#2a3450', bot: '#1c2440', floor: '#3a4060' })
          if (!fin) {
            cafeFront(xx, 420, 790, 'THE USUAL', '#6a3a2a')
            sign(xx, tt, 'taurus', { x: 640, y: 740, s: 150, mood: 'wide', look: [1, 0], seed: 9 })
            txt(xx, '?!', 700, 610, { size: 56, weight: 900, font: INTER, color: '#ffe27a' })
            chip(xx, 700, 800, 'TRAFFIC CAM', { size: 16, color: CYAN })
          } else { cafeFront(xx, 420, 790, 'NEW SPOT', '#2a5a48'); sign(xx, tt, 'taurus', { x: 650, y: 740, s: 150, mood: 'sparkle', seed: 9 }) }
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.2, 12.0, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [10.95, 11.3, 11.7, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'NEW FAVOURITE SPOT? SOURCES: MAYBE' : 'TAURUS · NEW PLACE · SAME TAURUS' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'map') {
      live(x, t, FULL, { label: 'LIVE', place: 'SKY CAM', clock: '7:58 PM', draw: (xx, tt, R) => streetMap(xx, tt, st, R) })
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: 'TAURUS SPOTTED TWO BLOCKS FROM THE USUAL' })
    } else if (sh === 'cafe') {
      live(x, t, FULL, {
        place: 'THE NEW SPOT', clock: '8:02 PM', draw: (xx, tt, R) => {
          cafe(xx, tt, R)
          sign(xx, tt, 'cancer', { x: 860, y: 1030, s: 200, mood: 'happy', seed: 12, hops: [5.0, 5.3, 5.6, 7.0] })
          sign(xx, tt, 'taurus', { x: 620, y: 1040, s: 200, mood: tt > 6.6 ? 'happy' : 'neutral', look: [1, 0], seed: 9, hops: [6.6] })
          const F = sign(xx, tt, 'sagittarius', { x: 220, y: 1110, s: 240, mood: 'happy', seed: 14, hops: [5.2, 5.7, 6.2] })
          mic(xx, tt, F, { flag: 'STARS' })
          bubble(xx, tt, 860, 830, 5.0, 6.4, 'hi!! over here!', { size: 28, col: '#f4ecd8', tail: 0 })
          bubble(xx, tt, 640, 840, 6.6, T.cut3 - 0.15, '“the usual, please.”', { size: 28, col: '#f4ecd8', tail: -0.1 })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'DATE: DELIGHTED · ORDER: FAMILIAR' })
    } else {
      x.fillStyle = '#3a2418'; x.fillRect(0, 470, 1080, 940)
      const g = x.createRadialGradient(540, 900, 50, 540, 900, 600); g.addColorStop(0, 'rgba(255,214,150,0.35)'); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.fillRect(0, 470, 1080, 940)
      const z = 1 + 0.08 * ease.outCubic(prog(st, T.cut3, T.cut4))
      x.save(); x.translate(540, 950); x.scale(z, z); x.translate(-540, -950)
      sign(x, st, 'taurus', { x: 540, y: 1040, s: 380, mood: st > T.bite ? 'sparkle' : 'neutral', look: [0, 0.6], seed: 9, hops: [T.bite, T.bite + 0.4] })
      // a fork with a bite
      px(x, 690, 840, 14, 200, INK); px(x, 694, 844, 6, 192, '#c8c8d8'); px(x, 670, 800, 54, 50, INK); px(x, 676, 806, 42, 38, '#f2a05a')
      x.restore()
      sparkles(x, st, 540, 860, T.bite + 0.05, 12, 260, 2, [GOLD, BONE, '#ffb36a'])
      chyron(x, t, { t0: T.cut3, label: 'LIVE', text: 'FIRST BITE · PUPILS: SPARKLING' })
    }
    ticker(x, t, { y: 1404, items: ['TAURUS: TWO BLOCKS EAST', 'THE USUAL: STILL THERE, STILL FINE', 'NEW TABLE: GREAT', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['riser', T.cut1 + 0.4, T.rec, 0.02],
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.cut1 + 0.5 + i * 0.22).toFixed(2), 0.025]),
    popCue(5.0, 1174.66, 0.035, 0.3), popCue(6.6, 880, 0.03, -0.1),
    popCue(T.bite, 1318.51, 0.05, 0), ['glitter', T.bite, T.bite + 0.6], ['pluck', T.bite + 0.2, 1567.98, 0.04, 0.6, 0],
    ...sobCues(T.sob, 3), ...sobCues(12.0, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
