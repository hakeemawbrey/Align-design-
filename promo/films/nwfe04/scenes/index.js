// nwfe04: WAIT FOR IT, "Pre-warmed." (20 s vertical trial reel, Wait for It Vol. 2 ep 4, music: screwed · Em)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Scorpio is holding | *your coat.*" + "wait for it…". ♏ Scorpio, mid-lift, holds ♈ Aries's coat up in
//             front of a radiator and stares; Aries waits on the right, ready to go out into the snow.
//   3.95–9.3  "It's just | *standing there…*"  Stickers: "staring at the *radiator*" · "five minutes: *no blinking*" ·
//             "…it's *ignoring you?!*". Heat shimmers; Aries checks the window (snow).
//   9.45      card cut.
//   9.5–13.4  "Why? | *For you.*"  On the drop the coat, steaming, sails over and wraps round Aries.
//             ♏ SCORPIO: "it's cold out. I *warmed* it first."
//   13.45–15.5 "*Pre-warmed*."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, drawBits, pop01, outK, popOut, r3, plate, sparkles, snowfall } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const RAD = { x: 470, y: 1215, w: 220, h: 170 }
const COAT = ['..CC..CC..', '.CCCCCCCC.', 'CCCCBCCCCC', 'CCCCBCCCCC', 'CCC.B.CCCC', 'CC.CBC.CC.', 'CC.CBC.CC.', 'CC.CBC.CC.', 'CC.CBC.CC.', '...CBC....', '...CCC....']
const COLS = { C: '#e8a23a', B: '#7a4a2a' }

function radiator(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  const { x: cx, y, w, h } = RAD
  R(x, INK, cx - w / 2 - 6, y - h - 6, w + 12, h + 12)
  for (let i = 0; i < 7; i++) { const fx = cx - w / 2 + i * (w / 7); R(x, '#d9dde8', fx + 3, y - h, w / 7 - 6, h); R(x, '#ffffff', fx + 6, y - h + 6, 6, h - 12) }
  R(x, INK, cx - w / 2 - 6, y - 24, w + 12, 8); R(x, '#ff6262', cx + w / 2 - 30, y - h - 22, 18, 18)
  // heat shimmer
  for (let i = 0; i < 4; i++) {
    const ph = (t * 0.7 + i / 4) % 1, hx = cx - 70 + i * 46
    x.save(); x.globalAlpha = k * 0.5 * Math.sin(Math.PI * ph)
    for (let j = 0; j < 5; j++) R(x, '#ffcf9a', hx + 8 * Math.sin(t * 5 + j + i), y - h - 20 - ph * 140 - j * 14, 6, 10)
    x.restore()
  }
  x.restore()
}

function coat(x, t, T, ctx, layer) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const fly = ease.inOutCubic(prog(t, T.reveal + 0.05, T.reveal + 0.7))
  if ((layer === 'back') !== (fly >= 1)) return
  const H = ctx.hero || { ...ctx.P.hero, F: { cy: ctx.P.hero.y } }, D = ctx.P.date
  // held up in front of the radiator, then sails over to Aries and wraps it
  const hx = RAD.x - 10, hy = RAD.y - RAD.h - 40 + 6 * Math.sin(t * 1.3)
  const cx = lerp(hx, D.x, fly), cy = lerp(hy, D.y + 20, fly) - 140 * Math.sin(Math.PI * fly)
  const cell = lerp(20, 27, fly)
  if (fly < 1) {
    // Scorpio's arm/hanger: a line from the hero to the coat's shoulders
    x.save(); x.globalAlpha = k * (1 - fly)
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(H.x + 90, H.F.cy - 20); x.lineTo(cx, cy - 120); x.stroke()
    x.strokeStyle = '#7a4a2a'; x.lineWidth = 6; x.beginPath(); x.moveTo(H.x + 90, H.F.cy - 20); x.lineTo(cx, cy - 120); x.stroke()
    R(x, INK, cx - 60, cy - 128, 120, 12)
    x.restore()
  }
  x.save(); x.globalAlpha = k
  drawBits(x, COAT, COLS, cx, cy, cell, { rot: 0.06 * Math.sin(t * 1.1) * (1 - fly) })
  x.restore()
  // steam off the warm coat after the drop
  if (t > T.reveal) for (let i = 0; i < 5; i++) {
    const ph = (t * 0.8 + i / 5) % 1
    x.save(); x.globalAlpha = k * 0.75 * Math.sin(Math.PI * ph)
    R(x, '#ffffff', cx - 70 + i * 34 + 10 * Math.sin(t * 3 + i), cy - 110 - ph * 120, 14, 14)
    x.restore()
  }
  const wk = pop01(t, T.reveal + 0.8, 0.3, 2.4) * outK(t, T.out)
  if (wk > 0.01) plate(x, 'WARM', D.x - 150, D.y - 160, { size: 26, bg: GOLD, alpha: clamp(wk), rot: -0.08 })
}

const EP = makeEpisode({
  id: 'nwfe04', key: 'Em', seed: 4704,
  hero: { sign: 'scorpio', lineColor: '#d6a8ff' },
  date: { sign: 'aries' },
  pos: { hero: { x: 190, y: 1075, s: 230 }, date: { x: 905, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Scorpio is holding | *your coat.*', h0Accent: '#d6a8ff',
  h1: 'It’s just | *standing there…*',
  h2: 'Why? | *For you.*', h2Accent: PINK,
  last: '*Pre-warmed*.', lastAccent: GOLD,
  stickers: ['staring at the *radiator*', 'five minutes: *no blinking*', '…it’s *ignoring you?!*'],
  line: { who: 'hero', text: 'it’s cold out. I *warmed* it first.' },
  focus: { x: 540, y: 1000 },
  glow: { x: 760, y: 1000 },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: 'squint', look: [1, 0.3] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'neutral', look: [-1, 0.2] }
    if (ph === 'build') return { mood: t > T.stk[2] ? 'eyeroll' : 'neutral', look: [-1, 0.2] }
    if (ph === 'reveal' && t > T.reveal + 0.6) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 30, seed: 4, alpha: 0.5 * clamp(popOut(t, T.out)), y1: 940, speed: 0.7 }) },
  mid(x, t, T, ctx) { radiator(x, t, T); coat(x, t, T, ctx, 'back') },
  front(x, t, T, ctx) {
    coat(x, t, T, ctx, 'front')
    sparkles(x, t, ctx.P.date.x, ctx.P.date.y - 30, T.reveal + 0.72, 10, 150, 2, [GOLD, '#ffcf9a', BONE])
  },
  cues: T => [
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.4 + i * 1.5), 0.012]),
    ['whoosh', r3(T.reveal + 0.05), 0.6, 0.04], ['pop', r3(T.reveal + 0.72), 1318.51, 0.035, 0.4], ['pop', r3(T.reveal + 0.85), 1567.98, 0.03, 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
