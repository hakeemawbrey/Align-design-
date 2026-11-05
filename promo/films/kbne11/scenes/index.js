// kbne11: BREAKING NEWS: THE STARS, Ep 11 · "Aries waited" (15 s vertical, star_talk post, music: funk · E).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♈ Aries mid-lunge at their phone.
//        Hook: "BREAKING: Aries did NOT | *double text.*"
//   1.30 cut: the phone. "had fun today!" sent 6:00 PM, no reply. "hey?" gets typed… and deleted. Record scratch at 2.5:
//        "hands *off* the keyboard."
//   4.20 cut: LIVE in Aries's living room. A HOLDING meter fills while Aries does push-ups, a lap, a long breath; the clock
//        runs 6:12 → 6:58.
//   8.00 a notification drops: "sorry, was at the gym!! *had fun too*". Aries leaps, then replies ONCE: "same time
//        thursday?"
//  10.20 cut: the desk. ♓ Pisces, sobbing: "the *restraint.*"
//  13.60 last headline: "Patience is | *also* bold." Hard cut at 15.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, livingRoom, caught, bubble, chip, txt, px, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, GREEN,
} from '../../kbne01/newskit.js'
import { notification, notificationCues } from '../../hookkit.js'

const D = 15
const T = { slam: 0.15, cut1: 1.3, rec: 2.5, cut2: 4.2, note: 8.0, leap: 8.5, reply: 9.0, cut3: 10.2, sob: 10.5, last: 13.6 }
const CUTS = [T.cut1, T.cut2, T.cut3]
const REC = { at: T.rec, len: 1.1, caption: 'hands *off* the keyboard.', top: 1180 }
const NOTE = { at: T.note, out: [9.9, 10.15], title: 'messages · ♌ them', body: 'sorry, was at the gym!! *had fun too*', glyph: '♌', color: '#f39a3a', time: '7:01 PM', y: 140 }
const S = 'THE STARS', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'one text sent. no reply. an Aries, *waiting.*' },
  { t: 4.5, speaker: S + ' · V.O.', text: 'sources confirm: push-ups. a lap. *breathing.*' },
  { t: 10.5, speaker: PI, color: '#8fd0ff', text: 'the *restraint.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'phone' : t < T.cut3 ? 'room' : 'desk2'

function holdMeter(x, t, cx, cy) {
  const u = clamp(prog(t, T.cut2 + 0.2, T.note))
  px(x, cx - 330, cy - 40, 660, 80, INK); px(x, cx - 322, cy - 32, 644, 64, '#2a1f55')
  const n = 16
  for (let i = 0; i < n; i++) if ((i + 1) / n <= u + 0.001) px(x, cx - 318 + i * 40, cy - 26, 34, 52, i % 2 ? '#ff7a4a' : '#ffb36a')
  txt(x, t < T.note ? 'HOLDING… NOT DOUBLE-TEXTING' : 'HELD ✓', cx, cy - 70, { size: 26, color: t < T.note ? '#ffb36a' : GREEN })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne11', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Aries did NOT | *double text.*', at: -1, out: [4.0, 4.2], accent: '#ff7a4a' },
    { text: 'LIVE: Aries, | *holding.*', at: T.cut2 + 0.05, out: [7.8, 8.0], accent: '#ffb36a' },
    { text: 'Co-anchor: | *moved.*', at: T.cut3 + 0.05, out: [13.4, 13.6], accent: '#8fd0ff' },
    { text: 'Patience is | *also* bold.', at: T.last, gap: 0.08, accent: GOLD, size: 110, accentSize: 160 },
  ],
  lines: LINES, box: { open: 1.35, close: 14.95 },
  cuts: CUTS, recs: [REC], fx: [notification(NOTE)], fxCues: notificationCues(NOTE),
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#4a2a3a', bot: '#2e1a28' })
          sign(xx, tt, 'aries', { x: fin ? 540 : 450, y: 740, s: 170, mood: fin ? 'heart' : 'wide', look: [1, 0.5], seed: 7, squash: fin ? 0 : -0.12 })
          if (!fin) { px(xx, 600, 690, 64, 110, INK); px(xx, 606, 696, 52, 98, '#4f8df0'); chip(xx, 630, 620, 'NO!', { size: 22, color: '#ff8fa0' }) }
          else chip(xx, 540, 600, 'THURSDAY · 7 PM', { size: 22, color: GOLD })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.2, 12.4, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [10.5, 10.85, 11.2, 11.7, 12.7, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut3 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'ONE TEXT EACH · THURSDAY PENCILLED IN' : 'ARIES · ONE TEXT · STILL ONE TEXT' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'phone') {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      phone(x, st, { cx: 540, cy: 860, w: 640, h: 700, title: '♌︎ them', status: 'last seen 6:01 PM', msgs: [{ at: -9, side: 'R', text: 'had fun today!', time: '6:00 PM · delivered' }] })
      // the draft field: "hey?" types on, then backspaces away
      const typed = 'hey?'
      const nIn = Math.floor(clamp(prog(st, T.cut1 + 0.2, T.cut1 + 0.7)) * 4), nOut = Math.floor(clamp(prog(st, T.rec - 0.35, T.rec)) * 4)
      const s = typed.slice(0, Math.max(0, nIn - nOut))
      px(x, 260, 1130, 560, 70, INK); px(x, 266, 1136, 548, 58, '#241a4a')
      txt(x, (s || ' ') + (Math.sin(t * 12) > 0 ? '|' : ''), 290, 1166, { size: 32, weight: 600, font: INTER, align: 'left', shadow: false })
      if (st > T.rec - 0.1) caught(x, t, 540, 1166, 160, T.rec, { w: 10 })
      sign(x, st, 'aries', { x: 900, y: 1250, s: 150, mood: 'squint', look: [-1, -1], seed: 7, squash: 0.05 * Math.sin(t * 30) })
      chyron(x, t, { t0: T.cut1, label: 'BREAKING', text: 'DRAFT TYPED · DRAFT DELETED · ARIES HOLDING' })
    } else {
      live(x, t, FULL, {
        place: 'ARIES’S LIVING ROOM', clock: t < T.note ? `6:${String(12 + Math.floor(prog(t, T.cut2, T.note) * 46)).padStart(2, '0')} PM` : '7:01 PM', draw: (xx, tt, R) => {
          livingRoom(xx, tt, R, { wall: '#4a2a3a' })
          // the montage: push-ups → a lap → a breath → the leap
          const ph = tt < 5.6 ? 'push' : tt < 6.8 ? 'lap' : tt < T.note ? 'breathe' : 'leap'
          let X = 540, Y = 1060, sq = 0, mood = 'squint'
          if (ph === 'push') { sq = 0.18 * Math.abs(Math.sin(tt * 9)); Y = 1080; chip(xx, 540, 760, 'PUSH-UPS', { size: 24, color: '#ffb36a' }) }
          if (ph === 'lap') { X = lerp(200, 880, Math.abs(Math.sin((tt - 5.6) * 2.6))); mood = 'happy'; chip(xx, 540, 760, 'A LAP', { size: 24, color: '#ffb36a' }) }
          if (ph === 'breathe') { sq = -0.1 * Math.sin((tt - 6.8) * 3); mood = 'sleepy'; chip(xx, 540, 760, 'BREATHING', { size: 24, color: '#ffb36a' }) }
          if (ph === 'leap') { Y = 1060 - 120 * Math.max(0, Math.sin(Math.PI * clamp(prog(tt, T.leap, T.leap + 0.5)))); mood = tt > T.leap ? 'sparkle' : 'wide' }
          sign(xx, tt, 'aries', { x: X, y: Y, s: 240, mood, look: [0, 0], seed: 7, squash: sq, zzz: false })
          if (tt < T.note) holdMeter(xx, tt, 540, 640)
          sparkles(xx, tt, 540, 900, T.leap + 0.2, 12, 220, 2, ['#ff7a4a', GOLD, BONE])
          bubble(xx, tt, 540, 640, T.reply, T.cut3 - 0.15, 'had fun too :) same time thursday?', { size: 28, col: '#4f8df0', color: BONE })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: t < T.note ? 'NO REPLY YET · ARIES DOING PUSH-UPS' : 'THE REPLY LANDS · ARIES REPLIES ONCE' })
    }
    ticker(x, t, { y: 1404, items: ['ARIES: HOLDING', 'DOUBLE TEXTS: ZERO', 'PUSH-UPS: SEVERAL', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.cut1 + 0.25 + i * 0.12).toFixed(2), 0.035]), ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.rec - 0.35 + i * 0.09).toFixed(2), 0.025]),
    ...Array.from({ length: 8 }, (_, i) => ['tom', +(T.cut2 + 0.3 + i * 0.17).toFixed(2), 120, { gain: 0.08, decay: 0.12 }]), ['whoosh', 5.7, 0.4, 0.04], ['whoosh', 6.2, 0.4, 0.04], ['swell', 6.8, 7.9, { gain: 0.03 }],
    popCue(T.leap, 1318.51, 0.05, 0), ['glitter', T.leap + 0.2, T.leap + 0.7], popCue(T.reply, 880, 0.04, 0.2),
    ...sobCues(T.sob, 3), ...sobCues(11.6, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
