// kbne08: BREAKING NEWS: THE STARS, Ep 8 · "Aquarius said the word" (14 s vertical, star_talk post, music: synthwave · F#m).
// No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack). Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♒ Aquarius mid-sentence in an interview
//        chair. A glitch hits at 0.35. Hook: "BREAKING: Aquarius used the word | *'feelings.'*"
//   1.30 cut: THE TAPE, rewound, at half speed: "I have…" "feelings…" "for you." pop one by one. Record scratch on the
//        word at 2.9: "out loud. *on purpose.*"
//   4.90 cut: the WARMTH GAUGE swings from DETACHED to WARM.
//   7.40 cut: the phone. The crush: "me too. a lot :)"
//   9.60 cut: the desk. ♓ Pisces sobbing into the desk: "they said it like a *poem.*"
//  11.90 last headline: "Detached? | Not *tonight.*"  13.6–14.0 loops back to frame 0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, caught, bubble, chip, txt, px, mic, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, CYAN,
} from '../../kbne01/newskit.js'
import { glitch, glitchCues } from '../../hookkit.js'

const D = 14
const T = { slam: 0.15, cut1: 1.3, w: [1.6, 2.25, 2.85], rec: 2.95, cut2: 4.9, cut3: 7.4, reply: 7.9, cut4: 9.6, sob: 9.9, last: 11.9 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.1, caption: 'out loud. *on purpose.*', top: 1180 }
const GL = { at: 0.35, len: 0.55, dialog: false, amp: 0.8 }
const S = 'THE STARS', PI = '♓︎ PISCES'
const AQ = '#5fc8e8'
const LINES = [
  { t: 4.15, speaker: S + ' · V.O.', text: 'let’s see that again. *slowly.*' },
  { t: 5.2, speaker: S + ' · V.O.', text: 'the warmth gauge has never been *here.*' },
  { t: 7.9, speaker: S + ' · V.O.', text: 'and the crush? *same.*' },
  { t: 9.9, speaker: PI, color: '#8fd0ff', text: 'they said it like a *poem.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'tape' : t < T.cut3 ? 'gauge' : t < T.cut4 ? 'phone' : 'desk2'

function chair(x, cx, fy) {
  px(x, cx - 130, fy - 260, 260, 220, INK); px(x, cx - 122, fy - 252, 244, 204, '#3a6a8a')
  px(x, cx - 160, fy - 90, 320, 60, INK); px(x, cx - 152, fy - 84, 304, 48, '#4a7a9a'); px(x, cx - 10, fy - 30, 20, 30, INK)
}
function interview(x, t, R) {
  room(x, R, { top: '#152a40', bot: '#0e1c2e', floor: '#1e3248' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.86
  for (let i = 0; i < 3; i++) { px(x, 140 + i * 300, R.y0 + 60, 200, 300, 'rgba(95,200,232,0.08)') }
  chair(x, 540, fy)
}
function gauge(x, t) {
  const cx = 540, cy = 1060, Rr = 330
  for (let i = 0; i <= 24; i++) {
    const a = Math.PI + (i / 24) * Math.PI
    const c = i < 8 ? '#7fd0ff' : i < 16 ? '#c9a6ff' : '#ff8f6a'
    px(x, cx + Math.cos(a) * Rr - 18, cy + Math.sin(a) * Rr - 18, 36, 36, INK); px(x, cx + Math.cos(a) * Rr - 14, cy + Math.sin(a) * Rr - 14, 28, 28, c)
  }
  txt(x, 'DETACHED', cx - 300, cy + 60, { size: 30, color: '#7fd0ff' }); txt(x, 'WARM', cx + 300, cy + 60, { size: 30, color: '#ff8f6a' })
  const u = ease.outBack(prog(t, T.cut2 + 0.4, T.cut2 + 1.6))
  const a = Math.PI + lerp(0.08, 0.93, clamp(u, 0, 1.05)) * Math.PI + 0.03 * Math.sin(t * 30) * (u > 0.95 ? 1 : 0)
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * (Rr - 60), cy + Math.sin(a) * (Rr - 60)); x.stroke()
  x.strokeStyle = GOLD; x.lineWidth = 12; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * (Rr - 64), cy + Math.sin(a) * (Rr - 64)); x.stroke()
  px(x, cx - 30, cy - 30, 60, 60, INK); px(x, cx - 22, cy - 22, 44, 44, GOLD)
  txt(x, 'WARMTH GAUGE', cx, 600, { size: 34, weight: 800, font: INTER, color: GOLD, spacing: 6 })
  if (t > T.cut2 + 1.6) chip(x, cx, 1200, 'NEW RECORD', { size: 30, color: INK, bg: '#ff8f6a', k: pop01(t, T.cut2 + 1.6, 0.3, 2.4) })
  sign(x, t, 'aquarius', { x: 880, y: 1240, s: 140, mood: t > T.cut2 + 1.6 ? 'happy' : 'wide', seed: 18, hops: [T.cut2 + 1.65] })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne08', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: Aquarius used the word | *‘feelings.’*', at: -1, out: [4.7, 4.9], accent: AQ },
    { text: 'The warmth | *gauge.*', at: T.cut2 + 0.05, out: [7.2, 7.4], accent: '#ff8f6a' },
    { text: 'The crush: | *same.*', at: T.cut3 + 0.05, out: [9.45, 9.6], accent: '#7fd0ff' },
    { text: 'Detached? | Not *tonight.*', at: T.last, gap: 0.08, accent: GOLD, size: 108, accentSize: 156 },
  ],
  lines: LINES, box: { open: 3.95, close: 13.5 },
  cuts: CUTS, recs: [REC], fx: [glitch(GL)], fxCues: glitchCues(GL),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          interview(xx, tt, M)
          sign(xx, tt, 'aquarius', { x: 540, y: 740, s: 170, mood: fin ? 'heart' : 'wide', look: fin ? undefined : [0, 0], seed: 18 })
          if (!fin) bubble(xx, tt, 540, 590, -1, null, 'I have… fee—', { size: 24, col: '#f4ecd8' })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [10.2, 11.0, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0.6] : [-1, -0.5], hops: fin ? [9.9, 10.25, 10.6, 11.1, T.last + 0.05] : [0.25], squash: fin && t < 11.6 ? 0.08 * Math.abs(Math.sin(t * 9)) : 0 },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'FEELINGS: MUTUAL · CO-ANCHOR: FACE DOWN' : 'AQUARIUS · SAID ‘FEELINGS’ · NOT A THEORY' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'tape') {
      live(x, t, FULL, {
        label: '◀◀ 0.5×', place: 'THE TAPE', clock: '9:12 PM', draw: (xx, tt, R) => {
          interview(xx, tt, R)
          sign(xx, st, 'aquarius', { x: 540, y: 1000, s: 280, mood: st > T.w[1] ? 'wide' : 'neutral', look: [0, 0], seed: 18, hops: T.w })
          const words = ['I have…', 'feelings…', 'for you.']
          words.forEach((w, i) => {
            const k = pop01(st, T.w[i], 0.3, 2.4)
            if (k < 0.01) return
            txt(xx, w, [300, 540, 790][i], [640, 700, 640][i], { size: i === 1 ? 72 * k : 48 * k, weight: 900, font: INTER, color: i === 1 ? AQ : BONE })
          })
          // tape-rewind lines
          for (let j = 0; j < 6; j++) px(xx, R.x0, R.y0 + ((j * 150 + st * 400) % (R.y1 - R.y0)), R.x1 - R.x0, 3, 'rgba(255,255,255,0.12)')
        },
      })
      if (st > T.w[1]) caught(x, t, 540, 700, 210, T.w[1] + 0.2, { w: 10 })
      chyron(x, t, { t0: T.cut1, label: 'REPLAY', text: 'THE MOMENT · SLOWED DOWN · STILL HAPPENED' })
    } else if (sh === 'gauge') {
      live(x, t, FULL, { label: 'LIVE', place: 'THE SCIENCE DESK', clock: '9:13 PM', draw: (xx, tt, R) => { room(xx, R, { top: '#14102e', bot: '#0c0a22' }); gauge(xx, tt) } })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'AQUARIUS WARMTH · OFF THE CHART (THE WARM END)' })
    } else {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const bs = phone(x, t, { cx: 540, cy: 900, w: 640, h: 760, title: '♊︎ the crush', status: 'online', msgs: [{ at: -9, side: 'R', text: 'I have feelings for you.', time: '9:12 PM' }, { at: T.reply, side: 'L', text: 'me too. a lot :)', time: '9:12 PM' }], typing: [T.cut3 + 0.1, T.reply] })
      if (bs[1]) caught(x, t, bs[1].x, bs[1].y, 150, T.reply + 0.4, { col: GOLD, w: 10 })
      sign(x, t, 'aquarius', { x: 880, y: 1250, s: 160, mood: t > T.reply + 0.2 ? 'heart' : 'wide', look: [-1, -1], seed: 18, hops: [T.reply + 0.2, T.reply + 0.5] })
      sparkles(x, t, 880, 1150, T.reply + 0.2, 10, 120, 2, ['#ff8fa0', GOLD, BONE])
      chyron(x, t, { t0: T.cut3, label: 'BREAKING', text: 'FEELINGS RETURNED · WITHIN A MINUTE' })
    }
    ticker(x, t, { y: 1404, items: ['AQUARIUS: “FEELINGS”', 'DETACHMENT: PAUSED', 'WARMTH: RECORD', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...T.w.map((w, i) => ['pluck', w, [440, 659.25, 880][i], 0.05, 0.8, 0]), ['tapeStop', T.cut1 + 0.05, 0.3],
    ['riser', T.cut2 + 0.4, T.cut2 + 1.6, 0.03], ...slamCues(T.cut2 + 1.6, 0.5), ['bell', T.cut2 + 1.65, 1760, 0.035, 1.2, 0],
    popCue(T.reply, 1318.51, 0.05, -0.2), ['glitter', T.reply + 0.2, T.reply + 0.7],
    ...sobCues(T.sob, 3), ...sobCues(10.9, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
