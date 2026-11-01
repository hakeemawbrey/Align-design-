// trwaitcap: WAIT FOR IT, "Blocked off." (20 s vertical, Star Talk Trends §12.2, music: screwed · Fm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./wait.js (identical in all five episodes).
//   0.0–3.8   "Capricorn's | *calendar.*"  + "wait for it…". A big day planner hangs on the wall: TODAY. ♑ Capricorn
//             books the first blocks (9 AM meeting, 10 AM emails). ♎ Libra, the date, waits on the right, hopeful.
//   3.95–9.3  "Fully | *booked…*"  Block after block thunks into the planner, every hour gone ("meeting about the
//             meeting", "lunch (at desk)"). Stickers: "9 to 3: *booked*" · "lunch: *at the desk*" · "…and one block is
//             *private?!*" The last block lands dark and taped shut: PRIVATE. Libra's face falls. The bar stalls at 99%.
//   9.45      card cut.
//   9.5–13.4  "One block | says *you.*"  On the drop the PRIVATE block flips over, gold: "free time with you" + a heart;
//             the rest of the day dims and slides aside. ♑ CAPRICORN: "I booked you *first*. the rest moved."
//   13.45–15.5 "*Blocked* off."  Libra melts, hearts float up, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, LILAC, MONO, INTER, HEART, drawBits, pop01, outK, popOut, r3, sparkles } from './wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const PL = { x: 190, y: 486, w: 700, head: 60, row: 44 }           // the planner on the wall
const ROWS = [
  { time: '9 AM', text: 'meeting', col: '#8b93c8' },
  { time: '10 AM', text: 'emails', col: '#9aa4c4' },
  { time: '11 AM', text: 'meeting about the meeting', col: '#8b93c8' },
  { time: '12 PM', text: 'lunch (at desk)', col: '#a7b2a0' },
  { time: '1 PM', text: 'spreadsheet', col: '#9aa4c4' },
  { time: '2 PM', text: 'goals review', col: '#8b93c8' },
  { time: '3 PM', text: 'more goals', col: '#a7b2a0' },
  { time: '4 PM', text: 'PRIVATE', col: '#3b2a63', priv: true },
]
const ROW_T = [1.1, 2.4, 4.4, 5.3, 5.9, 6.5, 7.0, 7.85]
const LOCK = ['.ggg.', 'g...g', 'g...g', 'GGGGG', 'GGkGG', 'GGkGG', 'GGGGG']

function planner(x, t, T, ctx) {
  const k = clamp(popOut(t, T.out)) * ease.outBack(prog(t, 0.25, 0.85))
  if (k <= 0.01) return
  const H = PL.head + ROWS.length * PL.row + 26
  x.save(); x.translate(540, PL.y + H / 2); x.scale(k, k); x.rotate(-0.012); x.translate(-540, -(PL.y + H / 2))
  // paper + header + rings
  R(x, 'rgba(6,4,18,0.45)', PL.x + 16, PL.y + 18, PL.w, H)
  R(x, INK, PL.x - 6, PL.y - 6, PL.w + 12, H + 12)
  R(x, '#f4ecdc', PL.x, PL.y, PL.w, H)
  R(x, INK, PL.x, PL.y, PL.w, PL.head)
  x.font = `800 34px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('TODAY', PL.x + 26, PL.y + PL.head / 2 + 2)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.fillText('♑︎ CAPRICORN', PL.x + PL.w - 24, PL.y + PL.head / 2 + 2)
  for (let i = 0; i < 7; i++) { const rx = PL.x + 60 + i * 96; R(x, INK, rx - 6, PL.y - 22, 14, 34); R(x, '#c9c2d8', rx - 2, PL.y - 18, 6, 26) }
  // hour lines + times
  const rev = ease.inOutCubic(prog(t, T.reveal, T.reveal + 0.5))
  ROWS.forEach((r, i) => {
    const ry = PL.y + PL.head + 12 + i * PL.row
    R(x, '#d9cfbd', PL.x + 12, ry + PL.row - 2, PL.w - 24, 2)
    x.font = `700 22px ${MONO}`; x.fillStyle = '#6b5f86'; x.textAlign = 'left'; x.fillText(r.time, PL.x + 18, ry + PL.row / 2)
    // the block thunks in
    const p = prog(t, ROW_T[i], ROW_T[i] + 0.22)
    if (p <= 0) return
    const drop = (1 - ease.outCubic(p)) * -40
    const bx = PL.x + 120, bw = PL.w - 140, by = ry + 4 + drop, bh = PL.row - 8
    x.save(); x.globalAlpha *= clamp(p * 3)
    if (r.priv) {
      // the private block: dark, taped shut; on the reveal it flips over, gold
      const flip = prog(t, T.reveal, T.reveal + 0.4)
      const sy = Math.abs(Math.cos(Math.PI * flip))
      const face = flip >= 0.5
      const glow = face ? 0.5 + 0.3 * Math.sin(t * 5) : 0
      const big = face ? 1 + 0.28 * ease.outBack(prog(t, T.reveal + 0.2, T.reveal + 0.6)) : 1
      x.translate(bx + bw / 2, by + bh / 2); x.scale(big, big); x.translate(-(bx + bw / 2), 0)
      x.scale(1 + 0.04 * Math.sin(Math.PI * flip), Math.max(0.04, sy) * (face ? 1 + 0.06 * Math.sin(Math.PI * clamp((t - T.lastLand) * 3)) : 1)); x.translate(0, -(by + bh / 2))
      if (face && glow) { x.save(); x.globalAlpha *= glow; R(x, '#fff1b0', bx - 14, by - 10, bw + 28, bh + 20); x.restore() }
      R(x, INK, bx - 4, by - 4, bw + 8, bh + 8)
      R(x, face ? '#ffd96b' : r.col, bx, by, bw, bh)
      x.font = `800 26px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
      if (!face) {
        R(x, '#e9d8a6', bx + bw * 0.55, by - 6, 120, bh + 12)                   // a strip of tape across it
        x.fillStyle = BONE; x.fillText('PRIVATE', bx + 54, by + bh / 2 + 1)
        drawBits(x, LOCK, { g: '#c9c2d8', G: GOLD, k: INK }, bx + 26, by + bh / 2, 3.4, { outline: null })
      } else {
        x.fillStyle = INK; x.fillText('free time with you', bx + 56, by + bh / 2 + 1)
        drawBits(x, HEART, { H: '#ff4f86' }, bx + 28, by + bh / 2, 4)
      }
    } else {
      // the rest of the day: on the reveal it dims and slides aside
      x.globalAlpha *= 1 - 0.55 * rev
      x.translate(rev * 26, 0)
      R(x, INK, bx - 4, by - 4, bw + 8, bh + 8); R(x, r.col, bx, by, bw, bh); R(x, 'rgba(255,255,255,0.25)', bx, by, bw, 5)
      x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText(r.text, bx + 20, by + bh / 2 + 1)
    }
    x.restore()
  })
  x.restore()
  const privY = PL.y + PL.head + 12 + 7 * PL.row + PL.row / 2
  sparkles(x, t, 600, privY, T.reveal + 0.4, 10, 200, 1, [GOLD, PINK, BONE])
}

const EP = makeEpisode({
  id: 'trwaitcap', key: 'Fm', seed: 1202,
  hero: { sign: 'capricorn', lineColor: '#c9e6a0' },
  date: { sign: 'libra', lineColor: '#ffb3d0' },
  h0: "Capricorn's | *calendar.*", h0Accent: '#c9e6a0',
  h1: 'Fully | *booked…*',
  h2: 'One block | says *you.*', h2Accent: PINK,
  last: '*Blocked* off.', lastAccent: GOLD,
  stickers: ['9 to 3: *booked*', 'lunch: *at the desk*', '…and one block is *private?!*'],
  line: { who: 'hero', text: 'I booked you *first*. the rest moved.' },
  focus: { x: 540, y: 830 },
  glow: { x: 600, y: 925 },
  heroHops: ROW_T.map(v => r3(v + 0.05)),
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'neutral', look: [0.6, -1] }
    if (ph === 'build') return t > ROW_T[7] ? { mood: 'squint', look: [1, 0] } : { mood: 'squint', look: [0.6, -1] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'sparkle', look: [-0.6, -1] }
    if (ph === 'build') return t > ROW_T[7] + 0.2 ? { mood: 'wide', look: [-0.6, -1], squash: 0.06 } : { mood: 'neutral', look: [-0.6, -1] }
    if (ph === 'reveal') return t < T.reveal + 0.5 ? { mood: 'wide', look: [-0.6, -1] } : { mood: 'heart', look: [-1, 0] }
    return null
  },
  back: planner,
  cues: T => [
    ...ROW_T.slice(0, 7).map((v, i) => ['tom', r3(v + 0.2), 110 - i * 4, { gain: 0.12, decay: 0.18 }]),
    ...ROW_T.slice(0, 7).map(v => ['tick', r3(v + 0.21), 0.035]),
    ['tom', r3(ROW_T[7] + 0.2), 70, { gain: 0.2, decay: 0.35 }], ['tick', r3(ROW_T[7] + 0.4), 0.04],
    ['whoosh', T.reveal, 0.4, 0.04], ['pop', r3(T.reveal + 0.2), 1318.51, 0.04, 0.1], ['pluck', r3(T.reveal + 0.42), 1567.98, 0.035, 0.6, 0.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
