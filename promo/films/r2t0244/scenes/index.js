// r2t0244: THE SIGNS AS… v3, SOLO film, "Tauruses when dinner | is late." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine moments of a late dinner, each pushed to the most extreme Taurus. Ending: callback.
//   0.0–3.6    "Tauruses when | *dinner is late.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              ten minutes late: a personal attack · checked the oven forty times · ate the garnish, then the centerpiece
//              · the driver got lost, Taurus went to find them · moved into the kitchen (pillow and all)
//              · "I'm fine" (the stomach disagrees) · lay on the floor, dramatically · "how long?" every 30 seconds
//              · dinner arrived, forgave everyone
//  37.8        "Hungry Taurus. | *Different person.*"  Taurus comes back, big.
//  41.2        CALLBACK: "Tomorrow? | *Oven check #1.*"  The oven comes back with its counter.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, clock, plate, CREAM, RED, ORANGE, SUN, GREY, WOOD, BROWN, GREEN, clamp, prog, lerp, ease } from './props.js'

const S = 'taurus', ACC = '#7ddc7a'

const PARSLEY = ['.G.G.', 'GGGGG', '.GGG.', '..B..', '..B..']
const APPLE = ['..B..', '.RRRR', 'RRRRR', 'RWRRR', 'RRRRR', '.RRR.']
const PILLOW = [
  'PPPPPPPPPPP',
  'PWWWWWWWWWP',
  'PWWWWWWWWWP',
  'PWWWWWWWWWP',
  'PPPPPPPPPPP',
]
const CAR = [
  '...BBBBB....',
  '..BWWBWWB...',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  '.KK.....KK..',
]

// an oven with a glowing window and a counter label
function oven(x, t, cx, cy, k, { lit = true } = {}) {
  card(x, cx, cy, 260, 280, k, { bg: '#d9dbe8', rot: 0, border: 6 }, () => {
    x.fillStyle = INK; for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(-90 + i * 60, -110, 12, 0, 7); x.fill() }
    x.fillStyle = INK; x.fillRect(-110, -80, 220, 170)
    x.fillStyle = lit ? `rgba(255,${150 + 40 * Math.sin(t * 5)},60,1)` : '#3d3470'; x.fillRect(-100, -70, 200, 150)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-90, -60, 30, 60)
    x.fillStyle = INK; x.fillRect(-90, 108, 180, 12)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Dinner’s ten minutes late. | *Personal attack.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'neutral', star: { x: -190 },
    front(x, t, lt, P) {
      clock(x, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), t, { speed: 1, rim: RED })
      label(x, 790, 1010, '+10 MIN', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, font: MONO, weight: 700, rot: -0.05 })
      bubble(x, 380, 620, 'how dare.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: S, cap: 'Checked the oven | *forty times.*', mood: 'wide', look: [1, 0], star: { x: -190 }, hops: [0.5, 1.0, 1.5, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      oven(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 39))
      label(x, 790, 640, `CHECK #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ate the garnish. | Then *the centerpiece.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      plate(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280 }, () => { if (lt < 0.9) drawBits(x, PARSLEY, { G: GREEN, B: '#2fa36b' }, 0, -20, 12) })
      const fruit = lt < 1.6
      if (fruit) { card(x, 790, 760, 220, 40, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: WOOD, rot: 0, border: 5 }); for (let i = 0; i < 3; i++) drawBits(x, APPLE, { R: [RED, ORANGE, SUN][i], B: BROWN, W: '#fff' }, 720 + i * 70, 700, 11 * pop01(t, P.t0 + 0.3, 0.35, 2) * (1 - prog(lt, 1.2 + i * 0.12, 1.4 + i * 0.12))) }
      label(x, 790, 760, 'DECOR: GONE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SUN })
    } },
  { sign: S, cap: 'Driver got lost. | Taurus *went to find them.*', mood: 'squint', star: { x: -200, s: 260 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, CAR, { B: RED, W: SKYB, K: INK }, lerp(980, 800, prog(lt, 0.3, 1.2)), 940, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'ON MY WAY TO YOU', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: ACC })
      bubble(x, 380, 620, 'left. LEFT!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Smelled it cooking. | *Moved into the kitchen.*', mood: 'sleepy', star: { x: -190, y: 30 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { P: PINK, W: CREAM }, 350, 1010, 18 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      oven(x, t, 790, 880, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 650, 'NEW ADDRESS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “I’m fine.” | Stomach *disagreed.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', star: { x: -190 }, squash: lt => lt > 1.1 ? 0.05 * Math.sin(lt * 40) : 0,
    front(x, t, lt, P) {
      bubble(x, 380, 620, 'I’m fine :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 790, 860, 'GRRRRRR', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 70, bg: ORANGE, rot: Math.sin(t * 30) * 0.05 })
    } },
  { sign: S, cap: 'Lay on the floor. | *Waiting. Dramatically.*', mood: 'sleepy', star: { x: -40, y: 140, s: 280 }, squash: 0.2,
    front(x, t, lt, P) {
      label(x, 800, 680, 'R.I.P. ME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: LAV, font: MONO, weight: 700, rot: 0.05 })
      bubble(x, 330, 700, 'tell dinner | I loved it', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: S, cap: '“How long?” | *Every 30 seconds.*', mood: 'squint', star: { x: -190 }, hops: [0.7, 1.4, 2.1],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bubble(x, 790 + (i % 2 ? 40 : -40), 640 + i * 125, ['how long?', 'now?', 'now??', 'NOW?'][i], pop01(t, P.t0 + 0.25 + i * 0.5, 0.25, 2.2), { size: 40, tail: 'bl', col: i === 3 ? PINK : BONE })
    } },
  { sign: S, cap: 'Dinner arrived. | *Forgave everyone.*', mood: 'heart', star: { x: -190 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      plate(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300 }, () => {
        x.fillStyle = INK; x.fillRect(-90, -64, 180, 60); x.fillStyle = '#e8a24a'; x.fillRect(-84, -58, 168, 48)
        x.fillStyle = GREEN; x.fillRect(-60, -70, 30, 14); x.fillRect(20, -72, 34, 14)
      })
      label(x, 790, 1100, 'ALL IS FORGIVEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT })
      hearts(x, t, 790, 900, P.t0 + 1.0, { n: 7, life: 1.8, spread: 260, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0244', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Tauruses when | *dinner is late.*',
  cameos: CAMEOS,
  group: { cap: 'Hungry Taurus. | *Different person.*', mood: 'happy' },
  last: {
    text: 'Tomorrow? | *Oven check #1.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 1140, 250 * k, { mood: 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.2, t - lt + 2.0, t - lt + 2.8] })
      oven(x, t, 730, 1110, pop01(t, t - lt + 0.3, 0.35, 2))
      label(x, 730, 900, 'CHECK #1', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: SUN, font: MONO, weight: 700, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
