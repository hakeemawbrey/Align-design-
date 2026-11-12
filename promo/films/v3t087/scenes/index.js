// v3t087: THE SIGNS AS… v3, SOLO film, "Cancers in love | be like." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine moments of Cancer in love, each pushed to the most extreme (and lovable) version.
//   0.0–3.6    "Cancers in love | *be like.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards: second date, met their mum · already named your future dog · you looked cold, knitted a scarf
//              · remembers your coffee order and your cousin's · you caught a cold, moved in to look after you
//              · celebrates the anniversary of your first match · tiny argument, a four-page letter
//              · a photo album after one week · you left for a weekend, devastated
//  37.8        "Soft shell. | *Softer heart.*"
//  41.0        LESSON UNLOCKED: "Let a Cancer care. | It’s how they *say love.*"  STATUS: CHERISHED
//  46.9        "Date a Cancer, | *get a whole family.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#3fb6f0', RED = '#e23d4e', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const DOG = [
  'BB......BB.',
  'BBB....BBB.',
  '.BWWWWWWB..',
  '.WWKWWKWW..',
  '.WWWWWWWW..',
  '.WWWKKWWW..',
  '..WWWWWW...',
  '.WWWWWWWWW.',
  'WWWWWWWWWWW',
  'W.W.....W.W',
]
const DOG_C = { B: BROWN, W: '#f2d49b', K: INK }
const CAKE = [
  '.....F.....',
  '.....C.....',
  '.....C.....',
  '.PPPPPPPPP.',
  'PWPWPWPWPWP',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
]
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: '#ffffff', B: '#c94f7c' }
const CASE = ['...KKKK...', '...K..K...', 'SSSSSSSSSS', 'SSSSSSSSSS', 'SYSSSSSSYS', 'SSSSSSSSSS', 'SSSSSSSSSS', 'SYSSSSSSYS', 'SSSSSSSSSS']
const CASE_C = { K: INK, S: LAV, Y: GOLD }
const CUP = ['.W.W..', 'W.W...', 'CCCCC.', 'CCCCCC', 'CCCC.C', 'CCCCCC', 'CCCC..', '.CC...']

// a long knitted scarf growing row by row
function scarf(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 9) + 1
  for (let i = 0; i < n; i++) { const c = i % 2 ? RED : CREAM; x.fillStyle = INK; x.fillRect(cx - 54 * k, cy - 220 * k + i * 46 * k - 4, 108 * k, 50 * k); x.fillStyle = c; x.fillRect(cx - 50 * k, cy - 220 * k + i * 46 * k, 100 * k, 42 * k) }
  // the needles
  x.fillStyle = '#d8dbe8'; x.save(); x.translate(cx, cy - 220 * k + n * 46 * k); x.rotate(0.5 + 0.15 * Math.sin(t * 12)); x.fillRect(-90, -4, 180, 8); x.restore()
}
// a letter with many lines
function letter(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  for (let p = 3; p >= 0; p--) {
    const show = clamp((lt - 0.3 - (3 - p) * 0.3) / 0.2)
    if (show <= 0) continue
    x.save(); x.translate(cx + p * 22, cy + p * 16); x.rotate(0.05 - p * 0.04); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-122, -162, 244, 324); x.fillStyle = '#ffe1ea'; x.fillRect(-114, -154, 228, 308)
    x.fillStyle = '#c94f7c'; for (let i = 0; i < 9; i++) x.fillRect(-90, -120 + i * 28, 150 + (i % 3) * 18, 8)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText(`page ${4 - p}`, 0, 136)
    x.restore()
  }
}
// a photo album, open
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-172, -130, 344, 260)
  x.fillStyle = BROWN; x.fillRect(-164, -122, 328, 244)
  x.fillStyle = CREAM; x.fillRect(-152, -110, 148, 220); x.fillRect(4, -110, 148, 220)
  const C = [BLUE, PINK, GOLD, LAV]
  for (let i = 0; i < 4; i++) { const px = -140 + (i % 2) * 156 + (i > 1 ? 0 : 0), py = -96 + (i % 2) * 0 + Math.floor(i / 2) * 104; x.fillStyle = INK; x.fillRect(px - 2 + (i > 1 ? 0 : 0), py - 2, 128, 96); x.fillStyle = C[i]; x.fillRect(px, py, 124, 92); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#fff' }, px + 62, py + 46, 6) }
  x.restore()
}

const CAMEOS = [
  { sign: 'cancer', cap: 'Second date? | You *met their mum.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 230 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 1.0] })
      bubble(x, 800, 660, 'so THIS is them!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
      label(x, 800, 1150, 'MUM: ALREADY OBSESSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Already named | *your future dog.*', mood: 'heart', star: { x: -190 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 660, 'BISCUIT', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.05 })
      label(x, 800, 1110, 'DATE COUNT: 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You looked cold. | *Knitted you a scarf.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scarf(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1160, 'TIME TAKEN: 1 HR', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Knows your coffee order. | And *your cousin’s.*', mood: 'sparkle', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CUP, { W: '#d8dbe8', C: BROWN }, 720, 900, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, CUP, { W: '#d8dbe8', C: '#f2d49b' }, 890, 920, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 680, 'OAT, EXTRA HOT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1110, 'COUSIN: DECAF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You caught a cold. | They *moved in.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: -190 }, hops: [0.4, 1.0],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 390, 600, 'i brought soup!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 800, 1110, 'STAYING TILL YOU’RE 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Celebrates the anniversary | of *your first match.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 770, 660, '✦ MATCH-IVERSARY!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: 'cancer', cap: 'Tiny argument. | A *four-page letter.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      letter(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1130, 'P.S. SORRY ♡', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made a photo album. | After *one week.*', mood: 'sparkle', star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      album(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'VOLUME 1 OF ∞', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'You left for a weekend. | *Devastated.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 2 : 0, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'back sunday!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      const n = Math.floor(clamp((lt - 0.9) / 1.0) * 3)
      for (let i = 0; i < n; i++) label(x, 800, 850 + i * 90, ['miss u', 'miss u more', 'come home'][i], 1, { size: 30, bg: [BONE, PINK, SKYB][i], rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 })
      label(x, 800, 1140, 'IT’S FRIDAY', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t087', key: 'D', accent: BLUE, solo: 'cancer', ending: 'lesson',
  title: 'Cancers in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Softer heart.*', mood: 'heart' },
  lesson: { text: 'Let a Cancer care. | It’s how they *say love.*', chip: 'STATUS: CHERISHED' },
  last: {
    text: 'Date a Cancer, | *get a whole family.*',
    draw(x, t, lt) {
      const t0 = t - lt
      ;[['cancer', 240, 0.5], ['cancer', 840, 0.7]].forEach(([id, px, d], i) => { const k = pop01(t, t0 + d, 0.4, 2); if (k > 0.01) signChar(x, t, id, px, 1020, 190 * k, { mood: 'heart', look: [i ? -1 : 1, 0], seed: 70 + i, glyph: false, hops: [t0 + d + 0.6] }) })
      drawBits(x, DOG, DOG_C, 540, 1270, 16 * pop01(t, t0 + 1.0, 0.35, 2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
