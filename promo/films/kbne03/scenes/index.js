// kbne03: BREAKING NEWS: THE STARS, Ep 3 · "Scorpio went first" (16 s vertical, star_talk post, music: cinematic · Dm).
// No end card, no card cut: the last 0.4 s blends back into frame 0 (kit loopBack). Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam, the monitor shows ♏ Scorpio mid-gasp at their own phone.
//        Hook: "BREAKING: Scorpio said | *'I miss you'* first."
//   1.30 cut: the phone, "i miss you" sent 11:40 PM. Record scratch at 1.9: "no riddles. *no subtext.*"
//   4.40 cut: LIVE in Scorpio's hallway. ♉ Taurus, the field reporter, whispers by the door: "they said it…
//        *plainly.*" From behind the door: "…was that too much?"
//   7.80 cut: the phone. "I miss you too. like a lot." Scorpio's eyes turn to hearts.
//  10.40 cut: the desk. ♓ Pisces fountains: "I've never seen them so *soft.*"
//  12.90 last headline: "Soft is the new | *mysterious.*"  15.6–16.0 loops back to frame 0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, phone, room, caught, bubble, chip, txt, px, mic,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, GOLD, BONE, RED, INK,
} from '../../kbne01/newskit.js'

const D = 16
const T = { slam: 0.15, cut1: 1.3, rec: 1.9, cut2: 4.4, door: 6.2, cut3: 7.8, reply: 8.3, cut4: 10.4, sob: 10.7, last: 12.9 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.3, caption: 'no riddles. *no subtext.*', top: 1180 }
const S = 'THE STARS', TA = '♉︎ TAURUS · LIVE', PI = '♓︎ PISCES'
const SC = '#c04a8a'
const LINES = [
  { t: 3.3, speaker: S + ' · V.O.', text: 'three words. sent *first.*' },
  { t: 4.7, speaker: TA, color: '#9fe6b0', text: '(whispering) they said it… *plainly.*' },
  { t: 8.7, speaker: S + ' · V.O.', text: 'and the reply came *right back.*' },
  { t: 10.75, speaker: PI, color: '#8fd0ff', text: 'I’ve never seen them so *soft.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'phone' : t < T.cut3 ? 'hall' : t < T.cut4 ? 'phone2' : 'desk2'
const MINE = { at: -5, side: 'R', text: 'i miss you', time: '11:40 PM · sent' }

function hallway(x, t, R) {
  room(x, R, { top: '#1e1540', bot: '#2b1f55', floor: '#3a2a5a' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  // the door, light spilling under it
  const dx0 = 600, dx1 = 900, dy0 = 560
  px(x, dx0 - 14, dy0 - 14, dx1 - dx0 + 28, fy - dy0 + 14, INK); px(x, dx0, dy0, dx1 - dx0, fy - dy0, '#5a3a6a')
  for (const [a, b] of [[dy0 + 40, dy0 + 260], [dy0 + 320, fy - 40]]) { px(x, dx0 + 30, a, dx1 - dx0 - 60, 8, '#4a2e5a'); px(x, dx0 + 30, b, dx1 - dx0 - 60, 8, '#4a2e5a') }
  px(x, dx1 - 50, (dy0 + fy) / 2, 22, 22, GOLD)
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, fy, 0, fy + 90); g.addColorStop(0, 'rgba(255,214,150,0.55)'); g.addColorStop(1, 'rgba(255,214,150,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(dx0, fy); x.lineTo(dx1, fy); x.lineTo(dx1 + 60, fy + 100); x.lineTo(dx0 - 60, fy + 100); x.fill(); x.restore()
  // a framed moon picture
  px(x, 170, 600, 170, 170, INK); px(x, 178, 608, 154, 154, '#2a2060'); px(x, 230, 650, 50, 50, '#f4ecd8'); px(x, 248, 650, 32, 32, '#2a2060')
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne03', duration: D, end: 'loop',
  heads: [
    { text: 'BREAKING: Scorpio said | *‘I miss you’* first.', at: -1, out: [4.2, 4.4], accent: '#ff8fc8' },
    { text: 'LIVE outside | *the door.*', at: T.cut2 + 0.05, out: [7.6, 7.8], accent: '#9fe6b0' },
    { text: 'The reply: | *instant.*', at: T.cut3 + 0.05, out: [10.25, 10.4], accent: '#7fd0ff' },
    { text: 'Soft is the new | *mysterious.*', at: T.last, gap: 0.08, accent: GOLD, size: 100, accentSize: 140 },
  ],
  lines: LINES, box: { open: 3.1, close: 15.5 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#3a1a40', bot: '#22102e' })
          sign(xx, tt, 'scorpio', { x: fin ? 540 : 450, y: 730, s: 180, mood: fin ? 'heart' : 'wide', look: [1, 0.6], seed: 8 })
          if (!fin) { px(xx, 560, 650, 70, 120, INK); px(xx, 566, 656, 58, 108, '#4f8df0'); txt(xx, '!', 640, 600, { size: 60, weight: 900, font: INTER, color: '#ff8fc8' }) }
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.0, T.last] : [0.2] },
        p: { mood: fin ? 'happy' : 'wide', tears: fin ? 3 : 2, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [10.75, 11.1, 11.5, 11.9, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'FEELINGS RETURNED · CO-ANCHOR IN (HAPPY) TEARS' : 'SCORPIO · FEELINGS SENT · NO RIDDLE' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'phone' || sh === 'phone2') {
      const two = sh === 'phone2'
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const msgs = two ? [MINE, { at: T.reply, side: 'L', text: 'I miss you too. like a lot.', time: '11:41 PM' }] : [MINE]
      const bs = phone(x, st, { cx: 540, cy: 900, w: 640, h: 760, s: 1 + 0.08 * ease.outCubic(prog(st, sh === 'phone' ? T.cut1 : T.cut3, (sh === 'phone' ? T.cut1 : T.cut3) + 2.5)), title: '♋︎ them', status: two ? 'typing…' : 'online', msgs, typing: two ? [T.cut3 + 0.1, T.reply] : null })
      if (!two && bs[0]) caught(x, t, bs[0].x, bs[0].y, 130, T.rec + 0.2, { w: 10 })
      if (two) {
        sign(x, st, 'scorpio', { x: 880, y: 1250, s: 160, mood: st > T.reply + 0.2 ? 'heart' : 'wide', look: [-1, -1], seed: 8, hops: [T.reply + 0.2, T.reply + 0.5] })
        if (bs[1]) caught(x, t, bs[1].x, bs[1].y, 150, T.reply + 0.5, { col: GOLD, w: 10 })
      }
      if (!two) chip(x, 540, 1250, 'HIDDEN MEANING: NONE FOUND', { size: 26, color: GOLD, border: GOLD, k: pop01(t, 3.4, 0.3, 2) })
    } else {
      live(x, t, FULL, {
        place: 'SCORPIO’S HALLWAY', clock: '11:42 PM', draw: (xx, tt, R) => {
          hallway(xx, tt, R)
          const F = sign(xx, tt, 'taurus', { x: 330, y: 1100, s: 250, mood: tt > T.door ? 'wide' : 'squint', look: tt > T.door ? [1, -0.3] : [0, 0], seed: 9, hops: [4.8, 5.3, 5.8] })
          mic(xx, tt, F, { flag: 'STARS' })
          // a finger to the lips: a little "shh" chip
          chip(xx, 330, 800, 'shh', { size: 26, color: BONE, k: pop01(tt, 4.6, 0.3, 2) * outK(tt, [6.0, 6.2]) })
          bubble(xx, tt, 750, 610, T.door, T.cut3 - 0.15, '…was that too much?', { size: 30, col: '#f4ecd8', tail: 0.3 })
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'REPORTER WHISPERING · DOOR CLOSED · HEART OPEN' })
    }
    ticker(x, t, { y: 1404, items: ['NO HIDDEN MEANING DETECTED', 'MYSTERY LEVEL: LOW', 'SOFTNESS: RECORD HIGH', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), popCue(3.45, 1174.66, 0.035, 0),
    ['pluck', T.door, 659.25, 0.035, 0.6, 0.3], ['pop', 5.0, 440, 0.02, -0.3],
    ['tick', T.cut3 + 0.2, 0.02], ['tick', T.cut3 + 0.33, 0.02], popCue(T.reply, 1318.51, 0.05, -0.2), ['pluck', T.reply + 0.3, 1567.98, 0.04, 0.6, 0], ['glitter', T.reply + 0.5, T.reply + 1.0],
    ...sobCues(T.sob, 3), ...sobCues(11.7, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
