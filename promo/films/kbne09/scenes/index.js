// kbne09: BREAKING NEWS: THE STARS, Ep 9 · "Sagittarius booked a second date" (15 s vertical, star_talk post, music: pop · D).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♐ Sagittarius mid-jump, a calendar flying out
//        of their hands. Hook: "BREAKING: Sagittarius made plans. | *In advance.*"
//   1.30 cut: the calendar lands. NEXT SATURDAY gets circled in red: 2ND DATE · 7 PM. Record scratch at 2.6:
//        "written down. *in pen.*"
//   4.40 cut: ARCHIVE footage (last spring, sepia): Sagittarius on a windy hill: "let's see where the wind takes us!"
//   7.00 cut: LIVE outside a restaurant, a RESERVED sign. ♑ Capricorn reports: "the wind took them… to a
//        *reservation.*"
//  10.20 cut: the desk. ♓ Pisces cries at the calendar: "it has a *time* on it."
//  13.60 last headline: "Freedom includes | *showing up.*" Hard cut at 15.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, street, caught, bubble, chip, txt, px, mic, wind, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK,
} from '../../kbne01/newskit.js'

const D = 15
const T = { slam: 0.15, cut1: 1.3, land: 1.6, circle: 2.1, rec: 2.6, cut2: 4.4, cut3: 7.0, cut4: 10.2, sob: 10.5, last: 13.6 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.2, caption: 'written down. *in pen.*', top: 1180 }
const S = 'THE STARS', SG = '♐︎ SAGITTARIUS · ARCHIVE', CP = '♑︎ CAPRICORN · LIVE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.6, speaker: S + ' · V.O.', text: 'next Saturday. 7 p.m. *booked.*' },
  { t: 4.7, speaker: SG, color: '#ffb36a', text: 'let’s see where the wind *takes us!*' },
  { t: 7.3, speaker: CP, color: '#c9b48a', text: 'the wind took them… to a *reservation.*' },
  { t: 10.5, speaker: PI, color: '#8fd0ff', text: 'it has a *time* on it.' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'cal' : t < T.cut3 ? 'archive' : t < T.cut4 ? 'resto' : 'desk2'

function calendar(x, t, st, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const w = 700, h = 560
  px(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK); px(x, -w / 2, -h / 2, w, h, '#f4ecd8')
  px(x, -w / 2, -h / 2, w, 90, RED); txt(x, 'NEXT MONTH-ISH', 0, -h / 2 + 46, { size: 36, weight: 800, font: INTER, shadow: false })
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  days.forEach((d, i) => txt(x, d, -w / 2 + 50 + i * 100, -h / 2 + 120, { size: 24, color: INK, shadow: false }))
  for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) {
    px(x, -w / 2 + 12 + i * 98, -h / 2 + 145 + j * 100, 90, 92, (i + j) % 2 ? '#ece0c6' : '#e6d8bc')
    txt(x, String(j * 7 + i + 1), -w / 2 + 30 + i * 98, -h / 2 + 165 + j * 100, { size: 20, color: '#7a6a5a', shadow: false })
  }
  // the circled Saturday (week 2, col 5)
  const cxS = -w / 2 + 12 + 5 * 98 + 45, cyS = -h / 2 + 145 + 1 * 100 + 46
  if (st > T.circle) { txt(x, '2ND DATE', cxS, cyS + 4, { size: 18, weight: 900, font: INTER, color: RED, shadow: false }); txt(x, '7 PM', cxS, cyS + 28, { size: 16, weight: 800, font: INTER, color: RED, shadow: false }) }
  x.restore()
  return { x: cx + cxS * s, y: cy + cyS * s }
}
function hill(x, t, R) {
  room(x, R, { top: '#6a8ab8', bot: '#a8c0d8' })
  x.fillStyle = '#5a9a5a'; x.beginPath(); x.moveTo(R.x0, R.y1); x.quadraticCurveTo(540, R.y0 + 380, R.x1, R.y1); x.fill()
  for (let i = 0; i < 4; i++) { const cx = ((i * 300 + t * 60) % 1300) - 100; px(x, cx, R.y0 + 100 + i * 40, 160, 40, 'rgba(255,255,255,0.8)') }
}
function resto(x, t, R) {
  street(x, t, R, { lit: 0.8 })
  px(x, 560, 640, 420, 420, INK); px(x, 568, 648, 404, 404, '#6a2a3a')
  px(x, 590, 670, 360, 60, INK); txt(x, 'TABLE 4', 770, 700, { size: 30, weight: 800, font: INTER, color: GOLD, shadow: false })
  px(x, 620, 770, 300, 220, 'rgba(255,214,150,0.7)')
  // RESERVED sign in the window
  px(x, 680, 840, 180, 70, INK); px(x, 686, 846, 168, 58, BONE); txt(x, 'RESERVED', 770, 876, { size: 26, weight: 900, font: INTER, color: RED, shadow: false })
  txt(x, 'SAT · 7 PM', 770, 950, { size: 22, color: INK, shadow: false })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne09', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Sagittarius made plans. | *In advance.*', at: -1, out: [4.2, 4.4], accent: '#ffb36a' },
    { text: 'ARCHIVE: | *last spring.*', at: T.cut2 + 0.05, out: [6.8, 7.0], accent: '#e8c08a' },
    { text: 'LIVE: the | *reservation.*', at: T.cut3 + 0.05, out: [10.0, 10.2], accent: '#c9b48a' },
    { text: 'Freedom includes | *showing up.*', at: T.last, gap: 0.08, accent: GOLD, size: 100, accentSize: 140 },
  ],
  lines: LINES, box: { open: 1.35, close: 14.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.land && t < T.land + 0.3 ? 12 * Math.exp(-(t - T.land) * 12) * Math.sin((t - T.land) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#3a2a5a', bot: '#2a1d48' })
          if (!fin) {
            sign(xx, tt, 'sagittarius', { x: 450, y: 720 - 30 * Math.abs(Math.sin(tt * 4)), s: 160, mood: 'wide', look: [1, -0.8], seed: 14 })
            xx.save(); xx.translate(640, 640 - tt * 40); xx.rotate(0.5 + tt * 2); px(xx, -50, -40, 100, 80, INK); px(xx, -44, -34, 88, 68, '#f4ecd8'); px(xx, -44, -34, 88, 18, RED); xx.restore()
          } else { calendar(xx, tt, 99, 540, 680, 0.38); }
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.2, 12.4, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [-0.5, -0.8] : [-1, -0.5], hops: fin ? [10.5, 10.85, 11.2, 11.7, 12.7, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'SECOND DATE CONFIRMED · CO-ANCHOR OVERWHELMED' : 'SAGITTARIUS · PLANS MADE · IN ADVANCE' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'cal') {
      x.fillStyle = '#1a1240'; x.fillRect(0, 470, 1080, 940)
      const p = prog(st, T.cut1, T.land)
      const C = calendar(x, t, st, 540, lerp(400, 900, ease.inCubic(p)), lerp(1.3, 1, ease.inCubic(p)), lerp(-0.3, -0.03, ease.inCubic(p)))
      caught(x, t, C.x, C.y, 70, T.circle, { w: 10 })
      sparkles(x, t, C.x, C.y, T.circle + 0.3, 10, 120, 1, [RED, GOLD, BONE])
      sign(x, st, 'sagittarius', { x: 900, y: 1250, s: 150, mood: st > T.circle ? 'sparkle' : 'wide', look: [-1, -1], seed: 14, hops: [T.land, T.circle + 0.1] })
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: 'SATURDAY CIRCLED · TIME INCLUDED' })
    } else if (sh === 'archive') {
      live(x, t, FULL, {
        label: 'ARCHIVE', place: 'LAST SPRING', clock: 'TAPE 03', bg: '#a8c0d8', draw: (xx, tt, R) => {
          hill(xx, tt, R)
          sign(xx, tt, 'sagittarius', { x: 540, y: 960, s: 260, mood: 'happy', look: [1, -0.6], seed: 14, hops: [4.8, 5.4, 6.0] })
          wind(xx, tt, R, 1)
          xx.save(); xx.globalCompositeOperation = 'saturation'; xx.fillStyle = 'rgba(120,90,60,0.6)'; xx.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0); xx.restore()
          xx.save(); xx.globalAlpha = 0.18; xx.fillStyle = '#c89a5a'; xx.fillRect(R.x0, R.y0, R.x1 - R.x0, R.y1 - R.y0); xx.restore()
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'ARCHIVE', text: 'SAGITTARIUS, LAST SPRING · NO PLANS · ALL VIBES' })
    } else {
      live(x, t, FULL, {
        place: 'TABLE 4', clock: 'SAT · 6:58 PM', draw: (xx, tt, R) => {
          resto(xx, tt, R)
          const F = sign(xx, tt, 'capricorn', { x: 280, y: 1110, s: 240, mood: 'happy', seed: 16, hops: [7.4, 8.0, 8.6] })
          mic(xx, tt, F, { flag: 'STARS' })
          sign(xx, tt, 'sagittarius', { x: 770, y: 1110, s: 170, mood: tt > 8.4 ? 'sparkle' : 'happy', look: [-1, 0], seed: 14, hops: [8.4, 8.8, 9.2] })
          bubble(xx, tt, 770, 600, 8.6, T.cut4 - 0.15, 'I’m EARLY.', { size: 32, col: '#ffe27a' })
        },
      })
      chyron(x, t, { t0: T.cut3, label: 'LIVE', text: 'SAGITTARIUS ARRIVES · TWO MINUTES EARLY' })
    }
    ticker(x, t, { y: 1404, items: ['SAGITTARIUS: COMMITTED (TO SATURDAY)', 'THE WIND: CONSULTED, OVERRULED', 'TABLE 4: RESERVED', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['whoosh', T.cut1 + 0.05, 0.3, 0.05], ...slamCues(T.land, 0.6),
    ['tick', T.circle, 0.05], ['tick', T.circle + 0.1, 0.05], ['tick', T.circle + 0.2, 0.05], popCue(T.circle + 0.3, 1318.51, 0.045, 0), ['glitter', T.circle + 0.3, T.circle + 0.8],
    ['whoosh', T.cut2 + 0.3, 2.0, 0.025], ['vinyl', T.cut2, T.cut3, { gain: 0.02 }],
    popCue(8.4, 1174.66, 0.04, 0.2), popCue(8.6, 1567.98, 0.04, 0.2),
    ...sobCues(T.sob, 3), ...sobCues(11.6, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
