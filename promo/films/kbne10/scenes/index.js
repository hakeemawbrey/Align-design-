// kbne10: BREAKING NEWS: THE STARS, Ep 10 · "Libra picked the restaurant" (13 s vertical, star_talk post, music: chiptune · C).
// No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack). Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♎ Libra mid-point at a menu board, friends
//        mid-gasp. Hook: "BREAKING: Libra picked | *the restaurant.*"
//   1.30 cut: THE REPLAY. Three choices; the finger swings left… right… lands on NOODLES at 3.5, the clock at 0:09.
//        Record scratch at 3.6: "under *ten seconds.*"
//   5.00 cut: the group chat goes wild: "WAIT", "LIBRA??", "who are you", "so proud".
//   7.60 cut: the desk. ♓ Pisces, happy tears: "they just… *chose.*"
//  10.20 last headline: "Decided. | *Delighted.*"  12.6–13.0 loops back to frame 0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, caught, bubble, chip, txt, px, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, GREEN,
} from '../../kbne01/newskit.js'

const D = 13
const T = { slam: 0.15, cut1: 1.3, pick: 3.5, rec: 3.6, cut2: 5.0, cut3: 7.6, sob: 7.9, last: 10.2 }
const CUTS = [T.cut1, T.cut2, T.cut3]
const REC = { at: T.rec, len: 1.0, caption: 'under *ten seconds.*', top: 1180 }
const S = 'THE STARS', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'the question: “where should we eat?”' },
  { t: 5.25, speaker: S + ' · V.O.', text: 'the group chat: *not okay.*' },
  { t: 7.9, speaker: PI, color: '#8fd0ff', text: 'they just… *chose.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'replay' : t < T.cut3 ? 'chat' : 'desk2'
const OPTS = ['NOODLES', 'TACOS', 'CURRY']

function board(x, cx, cy, w, hi) {
  px(x, cx - w / 2 - 8, cy - 150, w + 16, 300, INK); px(x, cx - w / 2, cy - 142, w, 284, '#20302a')
  OPTS.forEach((o, i) => {
    const X = cx - w / 3 + i * (w / 3)
    if (i === hi) px(x, X - w / 7, cy - 60, w / 3.5, 120, 'rgba(242,199,92,0.35)')
    txt(x, o, X, cy, { size: w / 14, weight: 800, font: INTER, color: i === hi ? GOLD : BONE, shadow: false })
  })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne10', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: Libra picked | *the restaurant.*', at: -1, out: [4.8, 5.0], accent: '#f6b3d8' },
    { text: 'The group chat: | *gone.*', at: T.cut2 + 0.05, out: [7.45, 7.6], accent: '#7fd0ff' },
    { text: 'Decided. | *Delighted.*', at: T.last, gap: 0.09, accent: GOLD, size: 112, accentSize: 160 },
  ],
  lines: LINES, box: { open: 1.35, close: 12.5 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.pick && t < T.pick + 0.3 ? 12 * Math.exp(-(t - T.pick) * 12) * Math.sin((t - T.pick) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#3a2a5a', bot: '#2a1d48' })
          board(xx, 540, 640, 380, fin ? 0 : -1)
          sign(xx, tt, 'libra', { x: 540, y: 790, s: 120, mood: fin ? 'sparkle' : 'wide', look: [0, -1], seed: 17, glyph: false })
          if (!fin) { sign(xx, tt, 'gemini', { x: 380, y: 800, s: 80, mood: 'wide', seed: 4, glyph: false }); sign(xx, tt, 'virgo', { x: 700, y: 800, s: 80, mood: 'wide', seed: 5, glyph: false }); px(xx, 590, 700, 60, 16, BONE) }
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [8.2, 9.2, T.last] : [0.2] },
        p: { mood: fin ? 'happy' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [7.9, 8.25, 8.6, 9.1, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut3 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'NOODLES AT 7 · EVERYONE RELIEVED' : 'LIBRA · DECISION MADE · NO POLL NEEDED' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'replay') {
      live(x, t, FULL, {
        label: 'REPLAY', place: 'THE MENU WALL', clock: `0:0${Math.min(9, Math.floor(prog(st, T.cut1, T.pick) * 9) + 1)}`, draw: (xx, tt, R) => {
          room(xx, R, { top: '#3a2a4a', bot: '#24182e', floor: '#4a3450' })
          const sw = st < T.pick ? Math.sin((st - T.cut1) * 5.5) : 0
          const hi = st >= T.pick ? 0 : sw < -0.33 ? 0 : sw > 0.33 ? 2 : 1
          board(xx, 540, 700, 860, hi)
          const F = sign(xx, st, 'libra', { x: 540, y: 1120, s: 230, mood: st > T.pick ? 'sparkle' : 'squint', look: [sw, -1], seed: 17, hops: [T.pick] })
          if (F) { const fx = lerp(540, 540 + sw * 260, 1), tx = st >= T.pick ? 255 : fx; px(xx, tx - 12, 860, 24, 90, INK); px(xx, tx - 7, 864, 14, 84, '#f7cf68') }
          sparkles(xx, st, 255, 700, T.pick, 10, 160, 2, [GOLD, BONE, GREEN])
        },
      })
      if (st >= T.pick) caught(x, t, 255, 700, 150, T.pick + 0.05, { col: GOLD, w: 10 })
      chyron(x, t, { t0: T.cut1, label: 'REPLAY', text: 'THE FINGER SWINGS · THE FINGER LANDS' })
    } else {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const m = (at, text, col) => ({ at, side: 'L', text, col })
      phone(x, t, { cx: 540, cy: 900, w: 660, h: 780, title: '✦ dinner (12)', status: '11 typing…', font: 30, msgs: [
        { at: -9, side: 'R', text: 'noodles at 7?', time: 'Libra · 6:12 PM' },
        m(5.3, '♈ WAIT', '#7a2a2a'), m(5.6, '♊ LIBRA??', '#2a5a4a'), m(5.9, '♏ who are you', '#5a2a4a'), m(6.25, '♋ so proud of you', '#2a3a6a'), m(6.6, '♉ noodles. yes. obviously', '#5a4a2a'),
      ] })
      sign(x, t, 'libra', { x: 890, y: 1250, s: 150, mood: 'happy', look: [-1, -1], seed: 17, hops: [5.6, 6.25, 6.6, 7.0] })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'GROUP CHAT REACTS · NOBODY ASKED “ARE YOU SURE”' })
    }
    ticker(x, t, { y: 1404, items: ['LIBRA: DECIDED', 'NOODLES: 7 PM', 'POLL: NOT NEEDED', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...Array.from({ length: 9 }, (_, i) => ['chip', +(T.cut1 + 0.25 + i * 0.22).toFixed(2), 523.25 + (i % 3) * 130, 0.08, { gain: 0.02 }]),
    ...slamCues(T.pick, 0.6), ['bell', T.pick + 0.05, 1760, 0.035, 1.0, 0], ['glitter', T.pick, T.pick + 0.4],
    ...[5.3, 5.6, 5.9, 6.25, 6.6].map((a, i) => popCue(a, [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.04, i % 2 ? 0.2 : -0.2)),
    ...sobCues(T.sob, 3), ...sobCues(9.0, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
