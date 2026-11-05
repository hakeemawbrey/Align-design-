// kbne14: BREAKING NEWS: THE STARS, Ep 14 · "Situationship enters month six" (20 s vertical, star_talk post, music: lofi · C).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♎ Libra and ♐ Sagittarius frozen mid-high-five,
//        a MONTH 6 page flying. Hook: "BREAKING: Situationship enters | its *sixth month.*"
//   1.30 cut: THE TIMELINE: MONTH 1 hanging out · MONTH 3 hanging out a lot · MONTH 6 hanging out A LOT. Record scratch at
//        3.6: "nobody has asked *the question.*"
//   5.70 cut: LIVE at a park bench. ♍ Virgo reports in a whisper: "sources say neither has *asked.*" The two share fries,
//        both open their mouths… "so…" "…so."
//  10.00 cut: a talk card, face down between them, flips (10.7): "What are we doing here?"
//  12.60 cut: the two-shot. Both at once: "…dating?" Laughter, hearts.
//  15.20 cut: the desk. ♓ Pisces sobbing: "they said it at the *same time.*"
//  18.60 last headline: "Ask the | *question.*" Hard cut at 20.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, caught, bubble, chip, txt, px, mic, sparkles, drawBits, stamp,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, SERIF, GOLD, BONE, RED, INK, PINK,
} from '../../kbne01/newskit.js'

const D = 20
const T = { slam: 0.15, cut1: 1.3, m: [1.7, 2.4, 3.1], rec: 3.6, cut2: 5.7, so: 7.6, so2: 8.2, cut3: 10.0, flip: 10.7, cut4: 12.6, both: 13.0, cut5: 15.2, sob: 15.5, last: 18.6 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4, T.cut5]
const REC = { at: T.rec, len: 1.2, caption: 'nobody has asked *the question.*', top: 1180 }
const S = 'THE STARS', VI = '♍︎ VIRGO · LIVE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.6, speaker: S + ' · V.O.', text: 'six months. still “just hanging out.”' },
  { t: 6.0, speaker: VI, color: '#9fe6b0', text: '(whispering) sources say neither has *asked.*' },
  { t: 10.3, speaker: S + ' · V.O.', text: 'then: a talk card. *face down.*' },
  { t: 15.5, speaker: PI, color: '#8fd0ff', text: 'they said it at the *same time.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'timeline' : t < T.cut3 ? 'bench' : t < T.cut4 ? 'card' : t < T.cut5 ? 'two' : 'desk2'
const MS = [['MONTH 1', 'hanging out'], ['MONTH 3', 'hanging out a lot'], ['MONTH 6', 'hanging out A LOT']]

function park(x, t, R) {
  room(x, R, { top: '#2a3a6a', bot: '#3a5a7a', floor: '#3f7a54' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  for (const tx of [150, 920]) { px(x, tx - 14, fy - 300, 28, 300, '#5a3a2a'); px(x, tx - 110, fy - 460, 220, 200, '#2f6a44'); px(x, tx - 80, fy - 520, 160, 100, '#3f7a54') }
  // the bench
  px(x, 260, fy - 150, 560, 24, INK); px(x, 266, fy - 146, 548, 16, '#a06a3a'); px(x, 260, fy - 90, 560, 30, INK); px(x, 266, fy - 86, 548, 22, '#b87a44')
  px(x, 290, fy - 60, 20, 60, INK); px(x, 770, fy - 60, 20, 60, INK)
}
function fries(x, cx, cy) { px(x, cx - 34, cy - 30, 68, 60, INK); px(x, cx - 28, cy - 24, 56, 50, RED); for (let i = 0; i < 5; i++) px(x, cx - 26 + i * 12, cy - 56 + (i % 2) * 8, 8, 34, '#ffd23a') }
function talkCard(x, t, cx, cy, s, flip) {
  // flip: 0 face down → 1 face up (squash through the middle)
  const k = Math.abs(Math.cos(Math.PI * flip)), up = flip > 0.5
  x.save(); x.translate(cx, cy); x.scale(s * Math.max(0.04, k), s)
  const w = 420, h = 560
  px(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK)
  if (!up) {
    px(x, -w / 2, -h / 2, w, h, '#2a1f55'); px(x, -w / 2 + 20, -h / 2 + 20, w - 40, h - 40, '#3a2d74')
    drawBits(x, ['...G...', '..GGG..', 'GGGGGGG', '.GGGGG.', '.GG.GG.'], { G: GOLD }, 0, 0, 22)
  } else {
    px(x, -w / 2, -h / 2, w, h, '#f4ecd8'); px(x, -w / 2 + 14, -h / 2 + 14, w - 28, 6, GOLD); px(x, -w / 2 + 14, h / 2 - 20, w - 28, 6, GOLD)
    txt(x, 'TALK CARD', 0, -h / 2 + 60, { size: 24, color: '#8a7a5a', shadow: false, spacing: 4 })
    ;['What are we', 'doing here?'].forEach((l, i) => txt(x, l, 0, -30 + i * 70, { size: 52, weight: 500, font: SERIF, color: INK, shadow: false }))
    txt(x, '✦', 0, h / 2 - 70, { size: 40, color: GOLD, shadow: false })
  }
  x.restore()
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne14', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Situationship enters | its *sixth month.*', at: -1, out: [5.5, 5.7], accent: '#f6b3d8' },
    { text: 'LIVE: the bench. | *Nobody* asks.', at: T.cut2 + 0.05, out: [9.8, 10.0], accent: '#9fe6b0' },
    { text: 'A card. | *Face down.*', at: T.cut3 + 0.05, out: [12.45, 12.6], accent: GOLD },
    { text: 'Both, at once: | *“…dating?”*', at: T.both + 0.2, out: [15.0, 15.2], accent: PINK },
    { text: 'Ask the | *question.*', at: T.last, gap: 0.09, accent: GOLD, size: 112, accentSize: 164 },
  ],
  lines: LINES, box: { open: 1.4, close: 19.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#2a3a6a', bot: '#3a5a7a' })
          sign(xx, tt, 'libra', { x: 440, y: 760, s: 150, mood: fin ? 'heart' : 'happy', look: [1, -0.3], seed: 17, squash: fin ? 0 : -0.1 })
          sign(xx, tt, 'sagittarius', { x: 640, y: 760, s: 150, mood: fin ? 'heart' : 'happy', look: [-1, -0.3], seed: 14, squash: fin ? 0 : -0.1 })
          if (!fin) { xx.save(); xx.translate(700, 620 - tt * 30); xx.rotate(0.4 + tt); px(xx, -46, -40, 92, 80, INK); px(xx, -40, -34, 80, 68, '#f4ecd8'); txt(xx, 'MO. 6', 0, 4, { size: 20, weight: 900, font: INTER, color: RED, shadow: false }); xx.restore(); chip(xx, 540, 640, 'HIGH FIVE', { size: 18, color: GOLD }) }
          else chip(xx, 540, 600, 'OFFICIALLY DATING', { size: 22, color: GOLD })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [16.5, 17.6, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [15.5, 15.85, 16.2, 16.7, 17.8, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut5 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'IT’S OFFICIAL · BOTH SAID IT · BOTH LAUGHED' : 'SITUATIONSHIP · MONTH 6 · LABEL: PENDING' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'timeline') {
      live(x, t, FULL, {
        label: 'GRAPHIC', place: 'THE TIMELINE', clock: 'MONTH 6', draw: (xx, tt, R) => {
          room(xx, R, { top: '#1a1440', bot: '#120c30' })
          const u = ease.inOutCubic(prog(st, T.cut1 + 0.1, T.m[2] + 0.2))
          px(xx, 120, 880, 840, 14, INK); px(xx, 120, 882, 840 * u, 10, GOLD)
          MS.forEach(([a, b], i) => {
            const k = pop01(st, T.m[i], 0.3, 2.4); if (k < 0.01) return
            const X = 180 + i * 360
            px(xx, X - 20, 866, 40, 40, INK); px(xx, X - 14, 872, 28, 28, i === 2 ? PINK : GOLD)
            chip(xx, X, 780 - (i % 2) * 0, a, { size: 28, color: i === 2 ? PINK : GOLD, k })
            txt(xx, b, X, 970 + (i === 2 ? 10 : 0), { size: i === 2 ? 36 : 28, weight: 800, font: INTER, color: BONE, alpha: clamp(k), maxW: 330 })
          })
          sign(xx, st, 'libra', { x: 420, y: 1180, s: 140, mood: 'happy', seed: 17, glyph: false })
          sign(xx, st, 'sagittarius', { x: 660, y: 1180, s: 140, mood: 'happy', seed: 14, glyph: false })
        },
      })
      chyron(x, t, { t0: T.cut1, label: 'GRAPHIC', text: 'SIX MONTHS · NO LABEL · NO TALK' })
    } else if (sh === 'bench') {
      live(x, t, FULL, {
        place: 'THE PARK BENCH', clock: 'SUN · 4:12 PM', draw: (xx, tt, R) => {
          park(xx, tt, R)
          const look = tt > T.so - 0.4 && tt < T.so2 + 0.6
          sign(xx, tt, 'libra', { x: 420, y: 1010, s: 200, mood: tt > T.so2 + 0.4 ? 'squint' : look ? 'wide' : 'happy', look: look ? [1, 0] : [-0.4, 0.4], seed: 17, hops: [T.so] })
          sign(xx, tt, 'sagittarius', { x: 660, y: 1010, s: 200, mood: tt > T.so2 + 0.4 ? 'squint' : look ? 'wide' : 'happy', look: look ? [-1, 0] : [0.4, 0.4], seed: 14, hops: [T.so2] })
          fries(xx, 540, 1060)
          const F = sign(xx, tt, 'virgo', { x: 900, y: 1150, s: 190, mood: 'squint', look: [-1, 0], seed: 5, hops: [6.1, 6.7, 7.2] })
          mic(xx, tt, F, { flag: 'STARS', side: -1 })
          bubble(xx, tt, 380, 780, T.so, T.cut3 - 0.1, 'so…', { size: 34, col: '#f4ecd8' })
          bubble(xx, tt, 700, 780, T.so2, T.cut3 - 0.1, '…so.', { size: 34, col: '#f4ecd8' })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'TWO PEOPLE · ONE FRIES · ZERO LABELS' })
    } else if (sh === 'card') {
      x.fillStyle = '#2a4a3a'; x.fillRect(0, 470, 1080, 940)
      for (let i = 0; i < 12; i++) px(x, 0, 480 + i * 80, 1080, 4, 'rgba(0,0,0,0.12)')
      const flip = ease.inOutCubic(prog(t, T.flip, T.flip + 0.45))
      const z = lerp(0.9, 1.05, ease.outCubic(prog(t, T.cut3, T.cut4)))
      talkCard(x, t, 540, 900, z, flip)
      sparkles(x, t, 540, 900, T.flip + 0.45, 14, 300, 1, [GOLD, BONE, PINK])
      chyron(x, t, { t0: T.cut3, label: 'LIVE', text: t < T.flip + 0.3 ? 'A TALK CARD · FACE DOWN · HANDS SHAKING' : '“WHAT ARE WE DOING HERE?”' })
    } else {
      live(x, t, FULL, {
        place: 'THE PARK BENCH', clock: 'SUN · 4:14 PM', draw: (xx, tt, R) => {
          park(xx, tt, R)
          const after = tt > T.both + 0.4
          sign(xx, tt, 'libra', { x: 400, y: 1000, s: 250, mood: after ? 'happy' : 'wide', look: [1, 0], seed: 17, blush: 1, hops: [T.both, T.both + 0.5, T.both + 0.9, 14.0] })
          sign(xx, tt, 'sagittarius', { x: 680, y: 1000, s: 250, mood: after ? 'happy' : 'wide', look: [-1, 0], seed: 14, blush: 1, hops: [T.both, T.both + 0.55, T.both + 1.0, 14.1] })
          bubble(xx, tt, 540, 720, T.both, null, '…dating?', { size: 44, col: '#ffe3ef' })
          drawBits(xx, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 540, 900 - 40 * Math.sin(tt * 3), 10 * pop01(tt, T.both + 0.6, 0.3, 2.4))
          sparkles(xx, tt, 540, 900, T.both + 0.5, 14, 280, 2, ['#ff4f86', GOLD, BONE])
        },
      })
      chyron(x, t, { t0: T.cut4, label: 'BREAKING', text: 'ANSWER GIVEN · SIMULTANEOUSLY · BY BOTH' })
    }
    ticker(x, t, { y: 1404, items: ['SITUATIONSHIP: MONTH 6', 'THE QUESTION: FINALLY ASKED', 'FRIES: SHARED', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ...T.m.map((m, i) => popCue(m, [880, 1174.66, 1567.98][i], 0.045, 0)), ['riser', T.cut1 + 0.1, T.m[2] + 0.2, 0.02],
    popCue(T.so, 659.25, 0.035, -0.3), popCue(T.so2, 587.33, 0.035, 0.3), ['pluck', T.so2 + 0.5, 2637, 0.012, 0.1, 0.3], ['pluck', T.so2 + 0.6, 2637, 0.012, 0.1, 0.3],
    ['riser', T.cut3 + 0.2, T.flip, 0.025], ['whoosh', T.flip, 0.4, 0.05], ...slamCues(T.flip + 0.45, 0.5), ['bell', T.flip + 0.5, 1760, 0.035, 1.2, 0], ['glitter', T.flip + 0.45, T.flip + 1.0],
    popCue(T.both, 1318.51, 0.05, -0.15), popCue(T.both + 0.02, 1318.51, 0.05, 0.15), ['glitter', T.both + 0.5, T.both + 1.2], ['pluck', T.both + 0.6, 1567.98, 0.04, 0.6, 0],
    ...sobCues(T.sob, 3), ...sobCues(16.7, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
