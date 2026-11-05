// kbne02: BREAKING NEWS: THE STARS, Ep 2 · "Virgo kept the typo" (14 s vertical, star_talk post, music: chiptune · A).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♍ Virgo shaking over a phone, a red circle
//        round "see you tmorrow". Hook: "BREAKING: Virgo sent a typo. | *Kept it.*"
//   1.30 cut: the phone. "see you tmorrow" sent 8:14 PM, a TYPO UNCORRECTED clock counting up; the thumb creeps to
//        EDIT… and pulls back. Record scratch at 2.6: "it's been *four seconds.*"
//   4.60 cut: LIVE in Virgo's living room. Virgo vibrating on the sofa. Chyron: LOCAL VIRGO · VISIBLY CALM (LYING).
//        VIRGO: "I'm fine. it's *fine.* it's a typo."
//   7.60 cut: the phone again. The crush: "can't wait!! see u tmorrow too". Virgo melts.
//  10.00 cut: the desk. ♓ Pisces, sobbing with pride: "they let it *stay.*"
//  12.70 last headline: "Growth looks like | *tmorrow.*" Hard cut at 14.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, phone, livingRoom, room, caught, bubble, chip, txt, px,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK,
} from '../../kbne01/newskit.js'

const D = 14
const T = { slam: 0.15, cut1: 1.3, rec: 2.6, cut2: 4.6, cut3: 7.6, reply: 8.0, cut4: 10.0, sob: 10.3, last: 12.7 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.2, caption: 'it’s been *four seconds.*', top: 1180 }
const S = 'THE STARS', VI = '♍︎ VIRGO · LIVE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'a typo. sent. and *not fixed.*' },
  { t: 4.85, speaker: VI, color: '#9fe6b0', text: 'I’m fine. it’s *fine.* it’s a typo.' },
  { t: 8.3, speaker: S + ' · V.O.', text: 'the crush: did *not* care.' },
  { t: 10.35, speaker: PI, color: '#8fd0ff', text: 'they let it *stay.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'phone' : t < T.cut3 ? 'room' : t < T.cut4 ? 'phone2' : 'desk2'
const MINE = { at: -5, side: 'R', text: 'see you tmorrow', time: '8:14 PM · sent' }

function shaky(t, amp = 6) { return amp * Math.sin(t * 47) }
function typoClock(x, t, st, X, Y) {
  const secs = Math.floor(Math.max(0, st - T.cut1) + 1)
  chip(x, X, Y, `TYPO UNCORRECTED · 00:0${Math.min(9, secs)}`, { size: 26, color: '#ff8fa0', border: RED })
}
function editButton(x, t, st, cx, cy) {
  // the EDIT button under the bubble, and Virgo's thumb creeping toward it and pulling back
  px(x, cx - 70, cy - 30, 140, 60, INK); px(x, cx - 64, cy - 24, 128, 48, '#3b3466'); txt(x, 'EDIT', cx, cy + 2, { size: 26, weight: 800, font: INTER, shadow: false })
  const u = prog(st, T.cut1 + 0.2, T.rec + 0.1), back = ease.inOutCubic(prog(st, T.rec + 0.3, T.cut2 - 0.3))
  const d = lerp(lerp(320, 30, ease.outCubic(u)), 320, back)
  const tx = cx + d * 0.6, ty = cy + d
  px(x, tx - 46, ty - 10, 92, 260, INK); px(x, tx - 40, ty - 4, 80, 250, '#e9b48a'); px(x, tx - 28, ty + 6, 56, 40, '#f6d0b0')
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne02', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Virgo sent a typo. | *Kept it.*', at: -1, out: [4.4, 4.6], accent: '#9fe6b0' },
    { text: 'LIVE: Virgo is | *totally* fine.', at: T.cut2 + 0.05, out: [7.4, 7.6], accent: '#9fe6b0' },
    { text: 'The crush | *replied.*', at: T.cut3 + 0.05, out: [9.85, 10.0], accent: '#7fd0ff' },
    { text: 'Growth looks like | *tmorrow.*', at: T.last, gap: 0.08, accent: GOLD, size: 104, accentSize: 150 },
  ],
  lines: LINES, box: { open: 1.35, close: 13.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#26405e', bot: '#1d2f4e' })
          sign(xx, tt, 'virgo', { x: fin ? 540 : 430 + shaky(tt, 4), y: 730, s: 180, mood: fin ? 'heart' : 'wide', look: [1, 0.5], seed: 5 })
          if (!fin) { bubble(xx, tt, 640, 600, -1, null, 'see you tmorrow', { size: 26, col: '#4f8df0', color: BONE }); caught(xx, tt, 640, 600, 120, -0.4, { w: 8 }) }
          else txt(xx, 'still says tmorrow', 540, 590, { size: 28, color: GOLD })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [10.4, 10.9, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [10.35, 10.7, 11.05, 11.5, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'TYPO STILL STANDING · CO-ANCHOR PROUD' : 'VIRGO · TYPO SENT · TYPO KEPT' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'phone' || sh === 'phone2') {
      const two = sh === 'phone2'
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const msgs = two ? [MINE, { at: T.reply, side: 'L', text: 'can’t wait!! see u tmorrow too', time: '8:15 PM' }] : [MINE]
      const bs = phone(x, st, { cx: 540, cy: 900, w: 640, h: 760, s: 1 + 0.04 * Math.sin(t * 2), title: '♑︎ the crush', status: 'online', msgs, typing: two ? [T.cut3 + 0.1, T.reply] : null })
      if (!two) {
        typoClock(x, t, st, 540, 1240)
        if (bs[0]) { caught(x, t, bs[0].x - 60, bs[0].y, 110, T.cut1 + 0.3, { w: 10 }); editButton(x, t, st, bs[0].x + 60, bs[0].y + 120) }
      } else {
        sign(x, st, 'virgo', { x: 880, y: 1250, s: 160, mood: st > T.reply + 0.2 ? 'heart' : 'wide', look: [-1, -1], seed: 5, hops: [T.reply + 0.2, T.reply + 0.5] })
        if (bs[1]) caught(x, t, bs[1].x + 70, bs[1].y, 110, T.reply + 0.5, { col: GOLD, w: 10 })
      }
    } else {
      live(x, t, FULL, {
        place: 'VIRGO’S SOFA', clock: '8:14 PM', draw: (xx, tt, R) => {
          livingRoom(xx, tt, R, { wall: '#2e4a6a' })
          const F = sign(xx, tt, 'virgo', { x: 420 + shaky(tt, 7), y: 1000, s: 270, mood: tt > 5.9 ? 'squint' : 'wide', look: [0, 0], seed: 5, squash: 0.04 * Math.sin(tt * 40), hops: [4.9, 5.3, 5.7, 6.1] })
          void F
          // the phone on the cushion, face down… then flipped up again
          px(xx, 700, 1040, 120, 40, INK); px(xx, 706, 1044, 108, 32, '#3a2d74')
          for (let i = 0; i < 4; i++) { const p = (tt * 2 + i / 4) % 1; xx.globalAlpha = 1 - p; txt(xx, '!', 300 + i * 80, 760 - p * 60, { size: 40, color: '#ff8fa0', weight: 800, font: INTER }); xx.globalAlpha = 1 }
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'LOCAL VIRGO · VISIBLY CALM (LYING)' })
    }
    ticker(x, t, { y: 1404, items: ['TYPO: UNCORRECTED', 'EDIT BUTTON: UNTOUCHED', 'VIRGO: VIBRATING', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['whoosh', T.cut1 - 0.3, 0.3, 0.03],
    ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.cut1 + 0.3 + i * 0.25).toFixed(2), 0.03]),
    ['riser', T.cut1 + 0.2, T.rec, 0.02],
    ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.cut2 + 0.2 + i * 0.27).toFixed(2), 1318.51 + (i % 3) * 100, 0.012, (i % 2 ? 0.3 : -0.3)]),
    ['tick', T.cut3 + 0.2, 0.02], ['tick', T.cut3 + 0.33, 0.02], popCue(T.reply, 1318.51, 0.05, -0.2), ['pluck', T.reply + 0.25, 1567.98, 0.04, 0.5, 0], ['glitter', T.reply + 0.5, T.reply + 0.9],
    ...sobCues(T.sob, 3), ...sobCues(11.3, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
