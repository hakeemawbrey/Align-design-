// yrscorpio: THEN vs NOW, "Mystery, with subtitles." (20 s vertical, Star Talk Then vs Now §8, music: synthwave · Cm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./thennow.js (identical in Block B).
//   0.0–7.2   THEN "Scorpio dating | in *2016*"  (old phone video, stamp 11·05·2016). ♏ Scorpio, in sunglasses, posts
//             cryptic quotes to a big generic "status update" feed: "some people know what they did." (11:48 PM) ·
//             "the moon gets it." (2:13 AM) · "…" (3:30 AM). ♋ Cancer, the date, grows one, two, three question marks.
//             Stickers: "status: *cryptic*" · "posted at *2:13 AM*" · "(it was about *liking you*)".
//   7.22      card cut → NOW on the drop.
//   7.27–12.4 NOW "Scorpio dating | in *2026*"  Still the sunglasses, still a fog machine ("[fog machine]" subtitle),
//             but face to face. Sticker: "status: *said out loud*". ♏ SCORPIO: "I like you. that's the
//             *mystery*." Subtitles: "[heart pounding]" · "[translation: they like you a lot]". Cancer: heart eyes.
//   12.55–15.5 PAYOFF  the 2016 polaroid drops top-left. THE STARS: "Still deep. *Now readable.*"
//             Last: "Mystery, *with subtitles*."
import { makeFilm, R, INK, GOLD, BONE, PINK, LILAC, SKY, MONO, INTER, SERIF, drawBits, pop01, outK, popOut, r3, sparkles } from './thennow.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

// ── THEN: the status feed
const FEED = { x: 120, y: 560, w: 580, head: 58, row: 92 }
const POSTS = [
  { t: 1.0, text: 'some people know what they did.', time: '11:48 PM' },
  { t: 2.9, text: 'the moon gets it.', time: '2:13 AM' },
  { t: 4.6, text: '…', time: '3:30 AM' },
]
const QM = ['.qqq.', 'q...q', '...q.', '..q..', '.....', '..q..']
function feed(x, t, T, ctx) {
  if (ctx.era !== 'then') return
  const k = pop01(t, 0.6, 0.35, 2)
  if (k <= 0.01) return
  const H = FEED.head + 3 * FEED.row + 16
  x.save(); x.translate(FEED.x + FEED.w / 2, FEED.y + H / 2); x.scale(k, k); x.rotate(-0.01); x.translate(-FEED.w / 2, -H / 2)
  R(x, 'rgba(6,4,18,0.45)', 14, 16, FEED.w, H)
  R(x, INK, -6, -6, FEED.w + 12, H + 12)
  R(x, '#eef0f6', 0, 0, FEED.w, H)
  R(x, '#4b5a8f', 0, 0, FEED.w, FEED.head)
  x.font = `800 26px ${INTER}`; x.fillStyle = '#ffffff'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('STATUS UPDATE', 20, FEED.head / 2 + 1)
  x.font = `600 20px ${INTER}`; x.fillStyle = 'rgba(255,255,255,0.7)'; x.textAlign = 'right'; x.fillText("what's on your mind?", FEED.w - 18, FEED.head / 2 + 1)
  // newest on top: each new post pushes the older ones down
  const shown = POSTS.filter(p => t >= p.t)
  shown.slice().reverse().forEach((p, i) => {
    const age = prog(t, p.t, p.t + 0.3)
    const slot = i
    const ry = FEED.head + 8 + slot * FEED.row - (i === 0 ? (1 - ease.outCubic(age)) * 30 : 0)
    x.save(); x.globalAlpha = i === 0 ? clamp(age * 2) : 1
    R(x, '#ffffff', 10, ry, FEED.w - 20, FEED.row - 10)
    R(x, INK, 22, ry + 12, 58, 58); R(x, ctx.HERO.color, 25, ry + 15, 52, 52)
    R(x, INK, 32, ry + 32, 38, 9)                                                    // a tiny pair of shades on the avatar
    const n = Math.floor((p.text.length + 1) * clamp((t - p.t) / Math.max(0.3, p.text.length / 28)))
    x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(p.text.slice(0, n), 96, ry + 30)
    x.font = `700 18px ${MONO}`; x.fillStyle = '#7a6f99'; x.fillText(p.time, 96, ry + 60)
    x.restore()
  })
  x.restore()
  // the date's question marks, one per post
  if (ctx.date) shown.forEach((p, i) => {
    const q = pop01(t, p.t + 0.5, 0.3, 2.8)
    const wob = Math.sin(t * 5 + i * 2) * 0.12
    drawBits(x, QM, { q: [BONE, GOLD, PINK][i] }, ctx.date.x - 70 + i * 70, ctx.date.F.cy - 170 - (i % 2) * 30, 9 * q, { rot: wob })
  })
}

// ── the sunglasses (both eras: the mystery stays), in sprite cells
function shades(x, F, t, T, ctx) {
  const tilt = ctx.era === 'now' && t > 10.9 && t < T.pay ? -1 : 0                    // a peek over the shades
  x.fillStyle = INK
  x.fillRect(6, 15 + tilt, 11, 6); x.fillRect(19, 15 + tilt, 11, 6); x.fillRect(16, 16 + tilt, 4, 2)
  x.fillRect(7, 21 + tilt, 9, 1); x.fillRect(20, 21 + tilt, 9, 1)
  x.fillStyle = '#5a4f8a'; x.fillRect(8, 16 + tilt, 3, 1); x.fillRect(21, 16 + tilt, 3, 1)
}

// ── NOW: fog at the floor + movie subtitles
const SUBS = [
  { t: 7.8, out: 9.05, text: '[fog machine]' },
  { t: 9.2, out: 11.0, text: '[heart pounding]' },
  { t: 11.15, out: 12.4, text: '[translation: they like you a lot]' },
]
function fog(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  const k = clamp(prog(t, T.sw + 0.3, T.sw + 1.4)) * outK(t, T.out)
  if (k <= 0.01) return
  x.save()
  // a dramatic spotlight from above onto Scorpio (of course)
  const sp = ctx.hero ? ctx.hero.x : 300
  const lg = x.createLinearGradient(0, 430, 0, 1180)
  lg.addColorStop(0, `rgba(255,236,200,${0.0 * k})`); lg.addColorStop(0.35, `rgba(255,236,200,${0.16 * k})`); lg.addColorStop(1, `rgba(255,236,200,${0.05 * k})`)
  x.fillStyle = lg; x.beginPath(); x.moveTo(sp - 40, 430); x.lineTo(sp + 40, 430); x.lineTo(sp + 210, 1180); x.lineTo(sp - 210, 1180); x.closePath(); x.fill()
  for (let i = 0; i < 9; i++) {
    const fx = ((i * 150 + t * (18 + i * 4)) % 1300) - 110, fy = 1150 + Math.sin(i * 1.7 + t * 0.8) * 26
    const r = 120 + (i % 3) * 40
    const g = x.createRadialGradient(fx, fy, 0, fx, fy, r)
    g.addColorStop(0, `rgba(199,166,255,${0.42 * k})`); g.addColorStop(1, 'rgba(199,166,255,0)')
    x.fillStyle = g; x.fillRect(fx - r, fy - r, r * 2, r * 2)
  }
  x.restore()
}
function subtitles(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  for (const s of SUBS) {
    const a = clamp(prog(t, s.t, s.t + 0.12)) * (1 - clamp(prog(t, s.out - 0.12, s.out)))
    if (a <= 0.01) continue
    x.save(); x.globalAlpha = a
    x.font = `italic 500 44px ${SERIF}`
    const w = x.measureText(s.text).width + 44
    R(x, 'rgba(6,4,18,0.82)', 540 - w / 2, 1262, w, 64)
    x.fillStyle = '#fffbe8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s.text, 540, 1295)
    x.restore()
  }
}

const EP = makeFilm({
  id: 'yrscorpio', key: 'Cm', seed: 8083,
  year: '2016', stamp: '11·05·2016',
  hero: { sign: 'scorpio', lineColor: '#ff9db8' },
  date: { sign: 'cancer', lineColor: '#bfe3ff' },
  cap0: 'Scorpio dating | in *2016*',
  cap1: 'Scorpio dating | in *2026*',
  last: 'Mystery, | *with subtitles*.', lastLate: 2,
  stickers: [
    { text: 'status: *cryptic*', at: 1.55, out: [6.85, 7.1], top: 1375, cx: 520, rot: -2.5 },
    { text: 'posted at *2:13 AM*', at: 3.4, out: [6.85, 7.1], top: 1483, cx: 560, rot: 2 },
    { text: '(it was about *liking you*)', at: 5.2, out: [6.85, 7.1], top: 1591, cx: 510, rot: -1.5 },
    { text: 'status: *said out loud*', at: 7.75, out: [8.75, 8.95], top: 1420, cx: 540, rot: -2 },
  ],
  nowLine: { who: 'hero', text: "I like you. that's the *mystery*." },
  starsLine: 'Still deep. *Now readable.*',
  snap: 5.6,
  moods(ph, t) {
    if (ph === 'then') return { mood: 'neutral', look: [0.6, -1] }
    if (ph === 'now') return t > 10.9 ? { mood: 'wide', look: [1, 0] } : { mood: 'neutral', look: [1, 0] }
    return { mood: 'happy' }
  },
  dateMoods(ph, t) {
    if (ph === 'then') return t > 5.1 ? { mood: 'wide', look: [-1, -1], squash: 0.04 } : { mood: 'neutral', look: [-1, -1] }
    if (ph === 'now') return t > 10.7 ? { mood: 'heart', look: [-1, 0] } : t > 9.2 ? { mood: 'wide', look: [-1, 0] } : { mood: 'neutral', look: [-1, 0] }
    return null
  },
  heroHops: [1.0, 2.9, 4.6],
  dateHops: [10.7, 11.05],
  back: feed,
  mid: fog,
  heroProp: shades,
  front: subtitles,
  cues: T => [
    ...POSTS.flatMap(p => [['pop', p.t, 783.99, 0.03, -0.2], ...Array.from({ length: Math.min(8, Math.ceil(p.text.length / 4)) }, (_, i) => ['tick', r3(p.t + 0.08 + i * 0.13), 0.015])]),
    ...POSTS.map((p, i) => ['pop', r3(p.t + 0.5), [392, 349.23, 311.13][i], 0.03, 0.4]),
    ['whoosh', 7.8, 0.9, 0.025], ...SUBS.map(s => ['tick', s.t, 0.025]),
    ...[9.25, 9.8, 10.35].flatMap(v => [['tom', v, 70, { gain: 0.12, decay: 0.2 }], ['tom', r3(v + 0.18), 66, { gain: 0.08, decay: 0.2 }]]),
    ['bell', 10.75, 1567.98, 0.03, 1.2, 0.3], ['glitter', 10.75, 11.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
