// kbne01: BREAKING NEWS: THE STARS, Ep 1 · "Gemini replied in three minutes" (15 s vertical, star_talk post,
// music: pop · E). No end card, no card cut: hard cut on the punchline. The show look lives in ./newskit.js.
//   0.00 frame 0: whip-out into the desk, the BREAKING slab mid-slam, papers mid-air, the monitor shows ♊ Gemini
//        mid-thumb-tap. Hook: "BREAKING: Gemini replied | in *three minutes.*"
//   0.15 the slab lands (shake) → docks into the chyron (1.3).
//   1.35 cut: the phone. "hey! free saturday?" 9:02 PM → ♊ "YES!! omg yes" 9:05 PM. Record scratch + freeze at 2.35:
//        red circles on both timestamps, "3 MINUTES".
//   4.30 cut: LIVE on Gemini's block. ♈ Aries, wind-blown, with a mic: "witnesses say they typed… and *sent.*" Gemini
//        bounces in the lit window.
//   7.60 cut: the desk. ♓ Pisces co-anchor sobbing with a tissue: "they didn't even wait an *hour.*"
//  10.60 THE STARS: "no games. no waiting. experts have a word for it."
//  13.85 the last headline slams: "Experts call it | *interest.*" Hold, hard cut at 15.0.
import {
  makeNews, studio, desk, anchor, coanchor, sign, live, chyron, ticker, slam, papers, mic, wind, phone, street, windowFrame,
  caught, stamp, flash, bubble, chip, txt, px,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp,
  FULL, INTER, GOLD, BONE, RED, CYAN, PINK, INK,
} from '../newskit.js'

const D = 15
const T = {
  slam: 0.15, dock: [1.0, 1.3], cut1: 1.35, me: 1.55, reply: 2.0, freeze: [2.35, 3.55], cut2: 4.3, cut3: 7.6,
  sob: 8.0, l4: 10.6, last: 13.85,
}
const CUTS = [T.cut1, T.cut2, T.cut3]
const REC = { at: T.freeze[0], len: T.freeze[1] - T.freeze[0], caption: 'they were just… *excited?*', top: 1180 }
const S = 'THE STARS', AR = '♈︎ ARIES · LIVE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.6, speaker: S + ' · V.O.', text: 'sent at 9:02. replied at *9:05.*' },
  { t: 4.6, speaker: AR, color: '#ff7a4a', text: 'witnesses say they typed… and *sent.*' },
  { t: 7.95, speaker: PI, color: '#8fd0ff', text: 'they didn’t even wait an *hour.*' },
  { t: 10.6, speaker: S, text: 'no games. no waiting. experts have a *word* for it.' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'phone' : t < T.cut3 ? 'field' : 'desk2'

const MSGS = [
  { at: T.me, side: 'R', text: 'hey! free saturday?', time: '9:02 PM' },
  { at: T.reply, side: 'L', text: 'YES!! omg yes', time: '9:05 PM' },
]

// the monitor at frame 0: Gemini mid-tap with a phone
function gemMonitor(x, t, M) {
  const g = x.createLinearGradient(0, M.y0, 0, M.y1); g.addColorStop(0, '#2a1d5c'); g.addColorStop(1, '#3d2a6e'); x.fillStyle = g; x.fillRect(M.x0, M.y0, M.x1 - M.x0, M.y1 - M.y0)
  const F = sign(x, t, 'gemini', { x: 470, y: 720, s: 190, mood: 'wide', look: [1, 0.4], seed: 4, hops: [0.6, 1.0] })
  // phone in hand + thumb blur
  px(x, 560, 650, 70, 120, INK); px(x, 566, 656, 58, 108, '#4f8df0')
  if (Math.sin(t * 40) > 0) px(x, 580, 700, 30, 10, BONE)
  void F
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne01', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Gemini replied | in *three minutes.*', at: -1, out: [4.1, 4.3], accent: '#ffe27a' },
    { text: 'LIVE: the scene | of the *reply.*', at: T.cut2 + 0.05, out: [7.4, 7.6], accent: '#ff7a4a' },
    { text: 'Co-anchor: | *not okay.*', at: T.cut3 + 0.05, out: [10.45, 10.6], accent: '#8fd0ff' },
    { text: 'Experts call it | *interest.*', at: T.last, gap: 0.08, out: null, accent: GOLD, size: 104, accentSize: 150 },
  ],
  lines: LINES, box: { open: 1.4, close: 14.9 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.last && t < T.last + 0.3 ? 12 * Math.exp(-(t - T.last) * 12) * Math.sin((t - T.last) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      studio(x, t, { monitor: fin ? (xx, tt, M) => { xx.fillStyle = '#2a1d5c'; xx.fillRect(M.x0, M.y0, M.x1 - M.x0, M.y1 - M.y0); if (tt < 11.9) { sign(xx, tt, 'gemini', { x: 540, y: 720, s: 180, mood: 'heart', seed: 4, hops: [9.0, 9.5] }); return }
        const k = pop01(tt, 11.9, 0.3, 2); xx.fillStyle = '#f4ecd8'; xx.fillRect(M.x0, M.y0, M.x1 - M.x0, M.y1 - M.y0)
        txt(xx, 'in·ter·est', 540, 610, { size: 56 * k, weight: 800, font: INTER, color: INK, shadow: false }); txt(xx, '(n.) replying because', 540, 690, { size: 30, color: INK, shadow: false, alpha: k }); txt(xx, 'you want to talk to them.', 540, 735, { size: 30, color: INK, shadow: false, alpha: k }) } : gemMonitor })
      const aMood = !fin ? 'wide' : t > T.last ? 'sparkle' : t > T.l4 ? 'happy' : 'squint'
      anchor(x, t, { mood: aMood, look: fin ? (t < T.l4 ? [1, 0] : [0, 0]) : [0.3, -0.6], hops: fin ? [10.7, 11.1, 11.5, 12.0, T.last] : [0.2] })
      coanchor(x, t, { mood: fin ? (t > T.last ? 'happy' : 'sparkle') : 'wide', tears: fin ? 3 : 2, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [8.0, 8.35, 8.7, 9.1, 9.5, T.last + 0.05] : [0.25], squash: fin && t > T.sob && t < 10.5 ? 0.06 * Math.sin(t * 22) : 0 })
      desk(x, t)
      if (!fin) papers(x, t, -0.3)
      chyron(x, t, { t0: fin ? T.cut3 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'CO-ANCHOR ‘FINE’ · TISSUES REQUESTED' : 'GEMINI · REPLY TIME: 3 MIN' })
      if (!fin) slam(x, t, { t0: -0.15, land: T.slam, dock: T.dock })
    } else if (sh === 'phone') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const zoom = 1 + 0.06 * ease.outCubic(prog(st, T.cut1, T.freeze[0]))
      const bs = phone(x, st, { cx: 540, cy: 900, w: 640, h: 760, s: zoom, title: '♊︎ gemini', status: 'online', msgs: MSGS, typing: [1.7, T.reply] })
      // the freeze: circle both times
      if (bs[1]) { caught(x, t, bs[0].tx - 20, bs[0].ty, 92, T.freeze[0] + 0.1, { t1: T.cut2 - 0.2 }); caught(x, t, bs[1].tx + 20, bs[1].ty, 92, T.freeze[0] + 0.3, { t1: T.cut2 - 0.2 }) }
      sign(x, st, 'gemini', { x: 900, y: 1250, s: 150, mood: st > T.reply ? 'heart' : 'wide', look: [-1, -1], seed: 4, hops: [T.reply + 0.05, T.reply + 0.4, 3.9] })
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: 'GEMINI · REPLY TIME: 3 MIN', y: 1310 })
    } else if (sh === 'field') {
      live(x, t, FULL, {
        place: 'GEMINI’S BLOCK', clock: '9:06 PM', draw: (xx, tt, R) => {
          street(xx, tt, R, { lit: 0.6 })
          windowFrame(xx, 760, 760, 260, 230, w => { sign(w, tt, 'gemini', { x: 760, y: 820, s: 150, mood: 'heart', seed: 4, hops: [4.6, 5.0, 5.4, 5.8, 6.2, 6.6, 7.0] }) })
          const F = sign(xx, tt, 'aries', { x: 300, y: 1110, s: 260, mood: tt > 6.2 ? 'wide' : 'happy', look: [0, 0], seed: 7, hops: [4.6, 5.1, 5.6, 6.0, 6.4] })
          mic(xx, tt, F, { flag: 'STARS' })
          wind(xx, tt, R, 1)
          bubble(xx, tt, 760, 560, 5.2, T.cut3 - 0.2, 'SENT!!', { size: 34, col: '#ffe27a', tail: 0.1 })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'WITNESSES: ‘THEY JUST… ANSWERED’' })
    }
    ticker(x, t, { y: 1404, items: ['GEMINI REPLY TIME: 3 MIN', 'NO GAMES DETECTED', 'LOCAL HEARTS: RACING', 'MORE AT ELEVEN'] })
  },
  over(x, t) {
    flash(x, t, T.last, { col: '#ffe27a', d: 0.15 })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['whoosh', 0.0, 0.35, 0.05], ['tick', 0.4, 0.04], ['whoosh', T.dock[0], 0.3, 0.03],
    popCue(T.me, 880, 0.04, 0.2), ['tick', 1.75, 0.02], ['tick', 1.85, 0.02], popCue(T.reply, 1318.51, 0.05, -0.2), popCue(T.reply + 0.06, 1567.98, 0.035, -0.2),
    ['tick', T.freeze[0] + 0.4, 0.05], ['tick', T.freeze[0] + 0.6, 0.05],
    ['whoosh', 4.6, 1.2, 0.02], popCue(5.2, 1174.66, 0.04, 0.3),
    ...sobCues(T.sob, 3), ...sobCues(9.0, 3), ['pop', 8.4, 659.25, 0.03, 0.4],
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
