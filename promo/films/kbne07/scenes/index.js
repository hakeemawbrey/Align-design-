// kbne07: BREAKING NEWS: THE STARS, Ep 7 · "Capricorn's out-of-office is on" (15 s vertical, star_talk post, music: house · G).
// No end card, no card cut: hard cut on the punchline. Show look: ../../kbne01/newskit.js.
//   0.00 frame 0: mid-whip into the desk, the slab mid-slam; on the monitor an OUT OF OFFICE stamp slams onto ♑ Capricorn's
//        laptop mid-close. Hook: "BREAKING: Capricorn logged off. | *On purpose.*"
//   1.30 cut: the office. A countdown clock: FRI 4:59:57… 5:00:00 — the laptop shuts. Record scratch at 2.75:
//        "they *closed* the laptop."
//   4.40 cut: THE MARKETS. CALENDAR · EMPTY ▲, a FEELINGS INDEX line climbing. V.O.: "markets react: the weekend is *wide
//        open.*"
//   7.20 cut: the phone. "free this weekend?" → ♋ "YES. finally".
//  10.00 cut: the desk. ♓ Pisces, sobbing: "they used the word *free.*"
//  13.60 last headline: "Out of office. | *Into* feelings." Hard cut at 15.0.
import {
  makeNews, deskShot, sign, live, chyron, ticker, room, phone, stamp, caught, bubble, chip, txt, px, sparkles,
  slamCues, stingCues, sobCues, popCue, pop01, outK, prog, ease, lerp, clamp, FULL, INTER, MONO, GOLD, BONE, RED, INK, GREEN,
} from '../../kbne01/newskit.js'

const D = 15
const T = { slam: 0.15, cut1: 1.3, zero: 2.45, shut: 2.55, rec: 2.75, cut2: 4.4, cut3: 7.2, me: 7.5, reply: 8.3, cut4: 10.0, sob: 10.3, last: 13.6 }
const CUTS = [T.cut1, T.cut2, T.cut3, T.cut4]
const REC = { at: T.rec, len: 1.2, caption: 'they *closed* the laptop.', top: 1180 }
const S = 'THE STARS', PI = '♓︎ PISCES'
const LINES = [
  { t: 1.55, speaker: S + ' · V.O.', text: 'Friday. 4:59 p.m. a Capricorn, *watching.*' },
  { t: 4.7, speaker: S + ' · V.O.', text: 'markets react: the weekend is *wide open.*' },
  { t: 7.5, speaker: S + ' · V.O.', text: 'and then… a text. a *personal* one.' },
  { t: 10.3, speaker: PI, color: '#8fd0ff', text: 'they used the word *free.*' },
]
const shot = t => t < T.cut1 ? 'desk' : t < T.cut2 ? 'office' : t < T.cut3 ? 'markets' : t < T.cut4 ? 'phone' : 'desk2'

function laptop(x, cx, cy, open, w = 360) {
  // base
  px(x, cx - w / 2 - 6, cy - 6, w + 12, 40, INK); px(x, cx - w / 2, cy, w, 28, '#8a86a8')
  // lid (open 1 → closed 0)
  const h = 230 * open
  if (h > 4) { px(x, cx - w / 2 + 14, cy - h - 6, w - 28, h + 6, INK); px(x, cx - w / 2 + 20, cy - h, w - 40, h, '#2a3a6a'); if (open > 0.6) for (let i = 0; i < 5; i++) px(x, cx - w / 2 + 44, cy - h + 26 + i * 34, 200 - (i % 2) * 70, 12, 'rgba(160,200,255,0.5)') }
}
function office(x, t, R) {
  room(x, R, { top: '#2a3048', bot: '#1c2034', floor: '#343a54' })
  const fy = R.y0 + (R.y1 - R.y0) * 0.78
  px(x, 200, fy - 140, 680, 26, INK); px(x, 206, fy - 136, 668, 18, '#8a6a4a'); px(x, 230, fy - 114, 20, 114, INK); px(x, 830, fy - 114, 20, 114, INK)
  // shelf of binders
  for (let i = 0; i < 7; i++) px(x, 120 + i * 46, 600, 38, 120, ['#c45a5a', '#5a8ac4', '#c4a05a', '#5ac48a'][i % 4])
  px(x, 100, 720, 360, 14, INK)
}
function clock(x, t, cx, cy) {
  const left = Math.max(0, T.zero - t)
  const secs = Math.ceil(left * 2.4)
  const s = left <= 0 ? '5:00:00' : `4:59:5${Math.min(9, 10 - secs)}`
  px(x, cx - 230, cy - 70, 460, 140, INK); px(x, cx - 222, cy - 62, 444, 124, '#120a1e')
  txt(x, 'FRI', cx - 170, cy, { size: 34, color: '#ff8fa0', shadow: false })
  txt(x, s, cx + 40, cy + 4, { size: 66, color: left <= 0 ? GREEN : '#ff4f5f', shadow: false })
}
function markets(x, t, R) {
  room(x, R, { top: '#0e1a2e', bot: '#0a1220' })
  for (let i = 0; i < 10; i++) px(x, R.x0, R.y0 + 80 + i * 70, R.x1 - R.x0, 2, 'rgba(127,224,255,0.1)')
  txt(x, 'FEELINGS INDEX', 300, 600, { size: 30, color: GREEN, align: 'left' })
  const u = ease.outCubic(prog(t, T.cut2 + 0.2, T.cut3 - 0.4))
  x.strokeStyle = GREEN; x.lineWidth = 10; x.beginPath()
  const N = 40
  for (let i = 0; i <= N * u; i++) { const X = 120 + i * 20, Y = 1080 - i * 10 - 30 * Math.sin(i * 0.9) * (1 - i / N); i ? x.lineTo(X, Y) : x.moveTo(X, Y) }
  x.stroke()
  const rows = [['CALENDAR', 'EMPTY', '▲'], ['WEEKEND', 'OPEN', '▲'], ['INBOX', 'IGNORED', '▲'], ['FEELINGS', 'RISING', '▲▲']]
  rows.forEach(([a, b, c], i) => { const k = pop01(t, T.cut2 + 0.4 + i * 0.4, 0.3, 2); if (k < 0.01) return; chip(x, 140, 690 + i * 80, `${a} · ${b} ${c}`, { size: 28, color: GREEN, align: 'left', k }) })
  sign(x, t, 'capricorn', { x: 880, y: 1170, s: 150, mood: 'sparkle', seed: 16, hops: [5.5, 6.0, 6.5] })
}

export const { DURATION, SCENES, CUES } = makeNews({
  id: 'kbne07', duration: D, end: 'cut',
  heads: [
    { text: 'BREAKING: Capricorn logged off. | *On purpose.*', at: -1, out: [4.2, 4.4], accent: '#c9b48a' },
    { text: 'Markets | *react.*', at: T.cut2 + 0.05, out: [7.0, 7.2], accent: GREEN },
    { text: 'A *personal* | text.', at: T.cut3 + 0.05, out: [9.85, 10.0], accent: '#7fd0ff' },
    { text: 'Out of office. | *Into* feelings.', at: T.last, gap: 0.08, accent: GOLD, size: 100, accentSize: 140 },
  ],
  lines: LINES, box: { open: 1.35, close: 14.95 },
  cuts: CUTS, recs: [REC],
  shake: t => (t > T.slam && t < T.slam + 0.4 ? 18 * Math.exp(-(t - T.slam) * 10) * Math.sin((t - T.slam) * 60) : 0) + (t > T.shut && t < T.shut + 0.3 ? 10 * Math.exp(-(t - T.shut) * 12) * Math.sin((t - T.shut) * 60) : 0),
  draw(x, st, K) {
    const t = K.t, sh = shot(t)
    if (sh === 'desk' || sh === 'desk2') {
      const fin = sh === 'desk2'
      deskShot(x, t, {
        monitor: (xx, tt, M) => {
          room(xx, M, { top: '#2a3048', bot: '#1c2034' })
          if (!fin) { laptop(xx, 600, 760, 0.55 + 0.1 * Math.sin(tt * 2), 260); sign(xx, tt, 'capricorn', { x: 390, y: 740, s: 160, mood: 'wide', look: [1, 0.5], seed: 16 }); stamp(xx, tt, 600, 650, 'OUT OF OFFICE', -0.05, { size: 34, col: '#ff2a3a', bg: 'rgba(255,255,255,0.9)' }) }
          else { sign(xx, tt, 'capricorn', { x: 540, y: 740, s: 170, mood: 'heart', seed: 16 }); chip(xx, 540, 600, 'SAT · BRUNCH · 11AM', { size: 22, color: GOLD }) }
        },
        a: { mood: fin ? (t > T.last ? 'sparkle' : 'happy') : 'wide', look: fin ? [1, 0] : [0.3, -0.6], hops: fin ? [11.2, 12.4, T.last] : [0.2] },
        p: { mood: fin ? 'sparkle' : 'wide', tears: fin ? 3 : 1, tissue: fin ? pop01(t, T.sob, 0.3, 2) : 0, look: fin ? [0, 0] : [-1, -0.5], hops: fin ? [10.3, 10.65, 11.0, 11.5, 12.6, T.last + 0.05] : [0.25] },
        chyron: { t0: fin ? T.cut4 : 1.15, label: fin ? 'DEVELOPING' : 'BREAKING', text: fin ? 'WEEKEND PLANS CONFIRMED · LAPTOP RESTING' : 'CAPRICORN · LOGGED OFF · NOT A DRILL' },
        slam: fin ? null : { t0: -0.15, land: T.slam, dock: [1.0, 1.3] }, papers: fin ? null : -0.3,
      })
    } else if (sh === 'office') {
      live(x, t, FULL, {
        place: 'THE OFFICE', clock: 'FRI', draw: (xx, tt, R) => {
          office(xx, tt, R)
          const open = 1 - ease.inCubic(prog(st, T.zero, T.shut))
          laptop(xx, 640, 1040, open)
          sign(xx, st, 'capricorn', { x: 330, y: 1020, s: 230, mood: st > T.shut ? 'sparkle' : 'wide', look: st > T.shut ? [0, 0] : [1, 0.3], seed: 16, hops: [T.shut + 0.05, T.shut + 0.4] })
          clock(xx, st, 540, 640)
          sparkles(xx, st, 640, 960, T.shut, 10, 200, 1, [GOLD, BONE, GREEN])
        },
      })
      stamp(x, t, 640, 900, 'OUT OF OFFICE', T.shut + 0.05, { size: 60, col: '#ff2a3a', bg: 'rgba(255,255,255,0.92)', t1: T.cut2 - 0.1 })
      chyron(x, t, { t0: T.cut1, label: 'LIVE', text: 'COUNTDOWN TO 5:00 · CAPRICORN NOT BLINKING' })
    } else if (sh === 'markets') {
      live(x, t, FULL, { label: 'MARKETS', place: 'CLOSING BELL', clock: '5:01 PM', draw: (xx, tt, R) => markets(xx, tt, R) })
      chyron(x, t, { t0: T.cut2, label: 'MARKETS', text: 'CALENDAR EMPTY · WEEKEND WIDE OPEN' })
    } else {
      x.fillStyle = '#0d0828'; x.fillRect(0, 470, 1080, 940)
      const bs = phone(x, t, { cx: 540, cy: 900, w: 640, h: 760, title: '♋︎ them', status: 'online', msgs: [{ at: T.me, side: 'R', text: 'free this weekend?', time: '5:03 PM' }, { at: T.reply, side: 'L', text: 'YES. finally', time: '5:03 PM' }], typing: [T.me + 0.3, T.reply] })
      if (bs[0]) caught(x, t, bs[0].x, bs[0].y, 150, T.me + 0.3, { col: GOLD, w: 10 })
      sign(x, t, 'capricorn', { x: 880, y: 1250, s: 160, mood: t > T.reply + 0.2 ? 'heart' : 'neutral', look: [-1, -1], seed: 16, hops: [T.reply + 0.2, T.reply + 0.5] })
      chyron(x, t, { t0: T.cut3, label: 'BREAKING', text: 'WORD ‘FREE’ USED · NOT ABOUT A MEETING' })
    }
    ticker(x, t, { y: 1404, items: ['CAPRICORN: OFFLINE', 'OUT-OF-OFFICE: ON', 'CALENDAR: EMPTY ▲', 'MORE AT ELEVEN'] })
  },
  cues: [
    ...slamCues(T.slam), ...stingCues(0.2),
    ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.cut1 + 0.3 + i * 0.28).toFixed(2), 0.05]), ['bell', T.zero, 1760, 0.04, 1.0, 0], ['boom', T.shut, 0.2], ['tick', T.shut, 0.08], ...slamCues(T.shut + 0.05, 0.6),
    ...Array.from({ length: 4 }, (_, i) => popCue(T.cut2 + 0.4 + i * 0.4, [880, 987.77, 1174.66, 1318.51][i], 0.035, 0)), ['riser', T.cut2 + 0.2, T.cut3 - 0.4, 0.02],
    popCue(T.me, 880, 0.04, 0.2), popCue(T.reply, 1318.51, 0.05, -0.2), ['glitter', T.reply + 0.2, T.reply + 0.7],
    ...sobCues(T.sob, 3), ...sobCues(11.4, 3),
    ...slamCues(T.last, 0.8), ['bell', T.last + 0.05, 1760, 0.035, 1.2, 0], ['glitter', T.last, T.last + 0.5],
  ],
})
