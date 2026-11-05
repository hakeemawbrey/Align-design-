// kbne12: BREAKING NEWS: THE STARS, Ep 12 · "Pisces hasn't cried" (16 s vertical, star_talk post, music: cinematic · Ab).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
// Tonight the co-anchor IS the story: Pisces's seat holds an AT THE MOVIES placard.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♓ Pisces at the movies, eyes glistening,
//        popcorn mid-air, a STREAK clock 1:29:59. Hook: "BREAKING: Pisces hasn't cried | in *90 minutes.*"
//   1.30 cut: LIVE in the cinema. The streak clock ticks past 1:30:00. On screen, the two leads hold hands; Pisces's lip
//        wobbles. Record scratch at 3.5: "holding… *holding…*"
//   5.60 cut: the desk. THE STARS grip the desk: "the whole newsroom is holding its *breath.*"
//   8.00 cut: the cinema. The credits roll… and a tiny dog in a scarf waves. Pisces fountains (9.3). STREAK OVER.
//  11.20 cut: the desk. THE STARS are crying too: "honestly? *same.*"
//  14.60 last headline: "Streak *over.* | Heart *full.*" Hard cut at 16.0.
import {
  makeNews, deskShot, studio, desk, anchor, sign, live, chyron, ticker, room, caught, bubble, chip, txt, px, sparkles, drawBits, tears,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, TEAR,
} from '../../kbne01/newskit.js'

const D = 16
const T = { slam: 0.15, cut1: 1.3, hands: 3.0, rec: 3.5, cut2: 5.6, cut3: 8.0, dog: 8.8, cry: 9.3, cut4: 11.2, last: 14.6 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.1, caption: 'holding… *holding…*', top: 1180 }
const S = 'THE STARS', PI = '♓︎ PISCES · LIVE'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'a Pisces. a movie. *no tears.* yet.' },
  { t: 5.9, speaker: S, text: 'the whole newsroom is holding its *breath.*' },
  { t: 9.6, speaker: PI, color: '#8fd0ff', text: 'IT HAD A LITTLE *SCARF.*' },
  { t: 11.5, speaker: S, text: 'honestly? *same.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'cinema' : t < T.cut3 ? 'desk2' : t < T.cut4 ? 'credits' : 'desk3'

function streak(t, base = 89 * 60 + 59) {
  const s = base + Math.max(0, t - 0.4)
  return `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(Math.floor(s) % 60).padStart(2, '0')}`
}
function screenGlow(x, R, col = 'rgba(160,200,255,0.25)') {
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(0, R.y0, 0, R.y1); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0); x.restore()
}
function seats(x, R, y) { for (let i = 0; i < 6; i++) { px(x, R.x0 + i * 180 - 20, y, 160, 200, INK); px(x, R.x0 + i * 180 - 14, y + 6, 148, 190, '#6a1e2e') } }
function popcorn(x, cx, cy, t) {
  px(x, cx - 50, cy - 70, 100, 110, INK); px(x, cx - 44, cy - 64, 88, 100, '#f4ecd8'); for (let i = 0; i < 4; i++) px(x, cx - 40 + i * 22, cy - 64, 10, 100, RED)
  for (let i = 0; i < 6; i++) px(x, cx - 44 + (i * 17) % 80, cy - 88 + (i % 2) * 8, 18, 18, '#fff1c8')
  void t
}
function cinema(x, t, st, R) {
  room(x, R, { top: '#0a0818', bot: '#140c28' })
  // the big screen: two little figures who hold hands at T.hands
  px(x, R.x0 + 80, R.y0 + 60, R.x1 - R.x0 - 160, 340, '#2a3a6a')
  const k = ease.inOutCubic(prog(st, T.hands - 0.8, T.hands))
  px(x, lerp(300, 470, k), R.y0 + 220, 50, 140, '#f4ecd8'); px(x, lerp(780, 560, k), R.y0 + 220, 50, 140, '#ffb3c8')
  if (st > T.hands) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 530, R.y0 + 160, 8 * pop01(st, T.hands, 0.3, 2))
  screenGlow(x, R)
  seats(x, R, R.y1 - 200)
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne12', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Pisces hasn’t cried | in *90 minutes.*', at: -1, out: [5.4, 5.6], accent: '#8fd0ff' },
    { text: 'The newsroom: | *bracing.*', at: T.cut2 + 0.05, out: [7.8, 8.0], accent: GOLD },
    { text: 'The *credits.*', at: T.cut3 + 0.05, out: [11.0, 11.2], accent: '#8fd0ff' },
    { text: 'Streak *over.* | Heart *full.*', at: T.last, gap: 0.08, accent: TEAR, size: 108, accentSize: 150 },
  ],
  lines: LINES, box: { open: 1.35, close: 15.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.cry && t < T.cry + 0.5 ? 14 * Math.exp(-(t - T.cry) * 7) * Math.sin((t - T.cry) * 50) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh.startsWith('desk')) {
      const n = sh === 'desk' ? 0 : sh === 'desk2' ? 1 : 2
      studio(x, t, {
        monitor: (xx, tt, M) => {
          cinema(xx, tt, n === 2 ? 99 : 0, M)
          sign(xx, tt, 'pisces', { x: 540, y: 800, s: 150, mood: n === 2 ? 'happy' : 'sparkle', seed: 6, tears: n === 2 ? 3 : 0, glyph: false })
          if (n === 0) { popcorn(xx, 650, 790, tt); for (let i = 0; i < 4; i++) px(xx, 600 + i * 30, 680 - ((tt * 200 + i * 40) % 80), 14, 14, '#fff1c8') }
          chip(xx, 540, 600, n === 2 ? 'STREAK: OVER' : `NO TEARS · ${streak(tt)}`, { size: 22, color: n === 2 ? '#ff8fa0' : TEAR })
        },
      })
      const F = anchor(x, t, { mood: n === 2 ? (t > T.last ? 'happy' : 'sparkle') : n === 1 ? 'wide' : 'wide', look: n === 1 ? [0.6, -0.8] : [0.3, -0.6], hops: n === 2 ? [11.5, 12.2, T.last] : n === 1 ? [5.9, 6.4] : [0.2], squash: n === 1 ? 0.04 * Math.sin(t * 30) : 0 })
      if (n === 2) tears(x, t, F, 2)
      // Pisces's empty seat with a placard
      px(x, 700, 1040, 200, 110, INK); px(x, 706, 1046, 188, 98, BONE); txt(x, 'AT THE', 800, 1076, { size: 22, weight: 800, font: INTER, color: INK, shadow: false }); txt(x, 'MOVIES', 800, 1110, { size: 26, weight: 900, font: INTER, color: RED, shadow: false })
      desk(x, t)
      if (n === 0) { const { papers } = K; void papers }
      chyronFor(x, t, n)
      if (n === 0) slamAt(x, t)
    } else if (sh === 'cinema') {
      live(x, t, FULL, {
        place: 'ROW F, SEAT 9', clock: streak(st + 1.3), draw: (xx, tt, R) => {
          cinema(xx, tt, st, R)
          const wob = st > T.hands ? 0.07 * Math.sin(t * 26) : 0
          sign(xx, st, 'pisces', { x: 540, y: 1100, s: 300, mood: st > T.hands ? 'wide' : 'sparkle', look: [0, -1], seed: 6, squash: wob, blink: false })
          popcorn(xx, 760, 1120, tt)
        },
      })
      chip(x, 540, 1240, `NO TEARS · ${streak(st + 1.3)}`, { size: 34, color: TEAR, border: TEAR })
      chyron(x, t, { t0: T.cut1, label: 'LIVE', text: 'THE HAND-HOLDING SCENE · PISCES HOLDING ON' })
    } else {
      live(x, t, FULL, {
        place: 'ROW F, SEAT 9', clock: 'THE CREDITS', draw: (xx, tt, R) => {
          room(xx, R, { top: '#0a0818', bot: '#140c28' })
          px(xx, R.x0 + 80, R.y0 + 60, R.x1 - R.x0 - 160, 340, '#05040c')
          // the credits roll; a tiny dog in a scarf waves
          for (let i = 0; i < 8; i++) { const y = R.y0 + 420 - ((tt - T.cut3) * 110 + i * 44) % 360; if (y > R.y0 + 60 && y < R.y0 + 390) px(xx, 380 + (i % 3) * 30, y, 240 - (i % 2) * 60, 10, 'rgba(239,230,214,0.55)') }
          const dk = pop01(tt, T.dog, 0.35, 2.2)
          if (dk > 0.01) {
            drawBits(xx, ['..BB.....BB..', '.BBBB...BBBB.', '.BBBBBBBBBBB.', '..BEBBBBBEB..', '..BBBBNBBBB..', '...BBTTTBB...', '..SSSSSSSSS..', '...SS...SS...'], { B: '#c48a5a', E: INK, N: INK, T: '#ff8fa0', S: RED }, 540, R.y0 + 230, 13 * dk, { rot: 0.1 * Math.sin(tt * 8) })
            txt(xx, 'and introducing: a very good dog', 540, R.y0 + 360, { size: 24, color: BONE, alpha: clamp(dk) })
          }
          screenGlow(xx, R, 'rgba(255,214,150,0.12)')
          seats(xx, R, R.y1 - 200)
          const F = sign(xx, tt, 'pisces', { x: 540, y: 1100, s: 300, mood: tt > T.cry ? 'happy' : tt > T.dog ? 'wide' : 'sparkle', look: [0, -1], seed: 6, hops: [T.cry, T.cry + 0.4, T.cry + 0.8] })
          tears(xx, tt, F, tt > T.cry ? 3 : tt > T.dog + 0.2 ? 1 : 0)
          sparkles(xx, tt, 540, 1000, T.cry, 14, 260, 1, [TEAR, BONE, '#ffffff'])
        },
      })
      stamp2(x, t)
      chyron(x, t, { t0: T.cut3, label: 'BREAKING', text: t < T.cry ? 'CREDITS ROLLING · STREAK STILL ALIVE' : 'STREAK OVER · AT 1:31:40 · DOG IN A SCARF' })
    }
    ticker(x, t, { y: 1404, items: ['PISCES: AT THE MOVIES', 'TISSUES: STANDING BY', 'NEWSROOM: BRACING', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ['strings', T.hands - 0.6, T.rec, [261.63, 329.63, 392]], ['pluck', T.hands, 1318.51, 0.035, 1.0, 0],
    ['riser', 5.8, 7.9, 0.02], ['pluck', T.dog, 1567.98, 0.04, 0.6, 0], ['pluck', T.dog + 0.15, 2093, 0.035, 0.6, 0],
    ...slamCues(T.cry, 0.7), ['glitter', T.cry, T.cry + 0.8], ...sobCues(T.cry + 0.1, 3), ...sobCues(T.cry + 0.8, 3), ...sobCues(12.0, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})

import { chyron as _ch, slam as _sl, papers as _pa, stamp } from '../../kbne01/newskit.js'
function chyronFor(x, t, n) {
  if (n === 0) _ch(x, t, { t0: 1.15, label: 'BREAKING', text: 'PISCES · NO TEARS · 89 MINUTES AND COUNTING' })
  if (n === 1) _ch(x, t, { t0: T.cut2, label: 'DEVELOPING', text: 'NEWSROOM HOLDS ITS BREATH' })
  if (n === 2) _ch(x, t, { t0: T.cut4, label: 'DEVELOPING', text: 'ANCHOR ALSO CRYING · TISSUES FOR EVERYONE' })
}
function slamAt(x, t) { _pa(x, t, -0.3); _sl(x, t, { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }) }
function stamp2(x, t) { stamp(x, t, 540, 600, 'STREAK OVER', T.cry + 0.1, { size: 70, col: '#ff2a3a', bg: 'rgba(255,255,255,0.92)' }) }
