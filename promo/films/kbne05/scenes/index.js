// kbne05: BREAKING NEWS: THE STARS, Ep 5 · "Leo asked a follow-up question" (15 s vertical, star_talk post, music: funk · Bb).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; the monitor shows ♌ Leo mid-sentence on a date, the spotlight
//        swinging off them. Hook: "BREAKING: Leo asked a | *follow-up question.*"
//   1.30 cut: THE REPLAY, telestrator on: a circle on Leo's ear ("LISTENED"), an arrow ("ASKED MORE"), a question counter
//        1… 2… 3. Record scratch at 3.0: "zero stories about *themselves.*"
//   5.00 cut: LIVE, close on ♑ Capricorn, the date, lighting up: "…nobody ever asks that." The spotlight slides over to
//        the date; Leo glows anyway.
//   8.20 cut: the desk. ♓ Pisces sobbing: "they asked the dog's *NAME.*"
//  11.00 THE STARS: "the spotlight looks good on *both* of them."
//  13.60 last headline: "Attention, | *returned.*" Hard cut at 15.0.
import {
  makeNews, deskShot, drawBits, sign, live, chyron, ticker, room, caught, arrow, bubble, chip, txt, px, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, GOLD, BONE, RED, INK,
} from '../../kbne01/newskit.js'

const D = 15
const T = { slam: 0.15, cut1: 1.3, q: [1.7, 2.3, 2.85], rec: 3.0, cut2: 5.0, cut3: 8.2, sob: 8.5, l4: 11.0, last: 13.6 }
const CUTS = [T.cut1, T.cut2, T.cut3]
const REC = { at: T.rec, len: 1.2, caption: 'zero stories about *themselves.*', top: 1180 }
const S = 'THE STARS', CA = '♑︎ CAPRICORN · THE DATE', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'a Leo. on a date. asking *questions.*' },
  { t: 5.3, speaker: CA, color: '#c9b48a', text: '…nobody ever *asks* that.' },
  { t: 8.5, speaker: PI, color: '#8fd0ff', text: 'they asked the dog’s *NAME.*' },
  { t: 11.0, speaker: S, text: 'the spotlight looks good on *both* of them.' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'replay' : t < T.cut3 ? 'date' : 'desk2'

function spot(x, cx, top, bx, by, w, a = 1) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(cx, top, bx, by); g.addColorStop(0, `rgba(255,244,210,${0.05 * a})`); g.addColorStop(1, `rgba(255,244,210,${0.3 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 20, top); x.lineTo(cx + 20, top); x.lineTo(bx + w / 2, by); x.lineTo(bx - w / 2, by); x.fill()
  x.beginPath(); x.ellipse(bx, by, w / 2, 30, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
function dateTable(x, R) {
  room(x, R, { top: '#3a1e44', bot: '#24122e', floor: '#4a2a50' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  px(x, 300, fy - 110, 480, 24, INK); px(x, 306, fy - 106, 468, 16, '#c45a7a'); px(x, 525, fy - 86, 30, 86, INK)
  px(x, 520, fy - 160, 40, 50, INK); px(x, 526, fy - 154, 28, 44, '#f4ecd8'); px(x, 534, fy - 176, 12, 22, '#ffd23a')
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne05', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Leo asked a | *follow-up question.*', at: -1, out: [4.8, 5.0], accent: '#ffb36a' },
    { text: 'The date | *lit up.*', at: T.cut2 + 0.05, out: [8.0, 8.2], accent: '#c9b48a' },
    { text: 'Co-anchor: | *gone.*', at: T.cut3 + 0.05, out: [10.85, 11.0], accent: '#8fd0ff' },
    { text: 'Attention, | *returned.*', at: T.last, gap: 0.08, accent: GOLD, size: 110, accentSize: 160 },
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
          room(xx, M, { top: '#3a1e44', bot: '#24122e' })
          if (fin && tt > 9.2 && tt < 11.0) {
            const k = pop01(tt, 9.2, 0.3, 2)
            drawBits(xx, ['..BB.....BB..', '.BBBB...BBBB.', '.BBBBBBBBBBB.', '..BBBBBBBBB..', '..BEBBBBBEB..', '..BBBBNBBBB..', '...BBBBBBB...', '...BBTTTBB...', '....BBBBB....'], { B: '#c48a5a', E: INK, N: INK, T: '#ff8fa0' }, 540, 680, 16 * k)
            chip(xx, 540, 790, 'BISCUIT · GOOD BOY', { size: 22, color: GOLD, k })
            return
          }
          const sw = fin ? 1 : 0.5 + 0.5 * Math.sin(tt * 3)
          spot(xx, 540, M.y0, lerp(420, 650, sw), 800, 200, 1)
          sign(xx, tt, 'leo', { x: 420, y: 740, s: 160, mood: fin ? 'happy' : 'wide', look: [1, 0], seed: 15 })
          sign(xx, tt, 'capricorn', { x: 650, y: 750, s: 150, mood: fin ? 'heart' : 'neutral', look: [-1, 0], seed: 16 })
          if (!fin) bubble(xx, tt, 420, 600, -1, null, 'so… what about you?', { size: 22, col: '#f4ecd8' })
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : t > T.l4 ? 'happy' : 'squint') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.1, 11.6, 12.2, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [8.5, 8.85, 9.2, 9.7, T.last + 0.05] : [0.25], squash: fin && t < 10.8 ? 0.05 * Math.sin(t * 22) : 0 },
        chyron: { t0: fin ? T.cut3 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'DOG’S NAME: BISCUIT · CO-ANCHOR: SOBBING' : 'LEO · QUESTIONS ASKED: SEVERAL' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'replay') {
      live(x, t, FULL, {
        label: 'REPLAY', place: 'TABLE FOR TWO', clock: '8:41 PM', draw: (xx, tt, R) => {
          dateTable(xx, R)
          spot(xx, 540, R.y0, 540, 1040, 640, 0.8)
          sign(xx, st, 'leo', { x: 380, y: 990, s: 240, mood: 'neutral', look: [1, 0], seed: 15, hops: T.q })
          sign(xx, st, 'capricorn', { x: 720, y: 1000, s: 220, mood: 'happy', look: [-1, 0], seed: 16 })
        },
      })
      caught(x, t, 300, 930, 90, T.cut1 + 0.25, { col: '#ffe27a', w: 10 })
      chip(x, 300, 800, 'LISTENED', { size: 26, color: INK, bg: '#ffe27a', k: pop01(t, T.cut1 + 0.45, 0.3, 2) })
      arrow(x, t, 420, 820, 640, 760, T.q[0], { col: '#ffe27a' })
      chip(x, 700, 700, 'ASKED MORE', { size: 26, color: INK, bg: '#ffe27a', k: pop01(t, T.q[0] + 0.25, 0.3, 2) })
      const n = T.q.filter(q => st >= q).length
      chip(x, 540, 1200, `QUESTIONS ASKED: ${n}`, { size: 34, color: GOLD, border: GOLD, k: n ? 1 + 0.15 * Math.exp(-(st - T.q[n - 1]) * 8) : 1 })
      chyron(x, t, { t0: T.cut1, label: 'REPLAY', text: 'WATCH: THE LEO LISTENS. THEN ASKS. AGAIN.' })
    } else {
      live(x, t, FULL, {
        place: 'TABLE FOR TWO', clock: '8:43 PM', draw: (xx, tt, R) => {
          dateTable(xx, R)
          const sw = ease.inOutCubic(prog(tt, 6.4, 7.2))
          spot(xx, 540, R.y0, lerp(380, 720, sw), 1040, 300, 1)
          sign(xx, tt, 'capricorn', { x: 720, y: 980, s: 300, mood: tt > 5.6 ? 'heart' : 'wide', look: [-1, 0], seed: 16, blush: 1, hops: [5.3, 5.7, 6.1, 7.2] })
          const F = sign(xx, tt, 'leo', { x: 330, y: 1000, s: 230, mood: tt > 7.2 ? 'sparkle' : 'happy', look: [1, 0], seed: 15, hops: [7.25] })
          void F
          sparkles(xx, tt, 720, 860, 7.2, 10, 220, 3, [GOLD, BONE, '#ffb36a'])
        },
      })
      chyron(x, t, { t0: T.cut2, label: 'LIVE', text: 'SPOTLIGHT SHARED · NOBODY HURT' })
    }
    ticker(x, t, { y: 1404, items: ['LEO: LISTENING', 'FOLLOW-UP QUESTIONS: 3', 'DATE: GLOWING', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2), ['pop', T.cut1 + 0.25, 1174.66, 0.03, -0.3], ['tick', T.cut1 + 0.45, 0.04],
    ...T.q.map((q, i) => popCue(q, [880, 987.77, 1174.66][i], 0.045, 0)),
    popCue(5.6, 1318.51, 0.04, 0.3), ['whoosh', 6.4, 0.8, 0.03], ['glitter', 7.2, 7.8], ['pluck', 7.25, 1567.98, 0.04, 0.6, 0],
    ...sobCues(T.sob, 3), ...sobCues(9.6, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
