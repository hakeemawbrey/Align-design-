// r2a0416: star_advice, ADVICE SOLO (cancer), "Cancer, home is | also you." (signs3kit social cut, music: lofi · D). Ending: group.
// Nine relatable Cancer truths, each with a warm reframe and one light gag: the homebody who makes everywhere home.
//   0.0–3.6    "Cancer, home is | *also you.*"  One big Cancer pops in.
//   3.6–37.8   nine cards: a hotel room, home in four minutes · every birthday but yours · cooks for all, a plate for you
//              · moods like the tide · the memory shoebox · back in the shell · "home safe?" · the hug that fixes
//              things (Pisces, happy tears) · homesick? the house comes too
//  37.8        "Wherever you are, | *it’s warm there.*"  Cancer back, big, all hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#9fe8ff', WOOD = '#c98f2a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }
const S = 'cancer'

// ── props
const HOUSE = ['.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', '.WWWWWWWWWW.', '.WYYWWWWDDW.', '.WYYWWWWDDW.', '.WWWWWWWDDW.', '.WWWWWWWDDW.']
const HOUSE_C = { R: RED, W: CREAM, Y: '#ffe76a', D: WOOD }
const POT = ['.KKKKKKKKKK.', 'KGGGGGGGGGGK', '.KGGGGGGGGK.', '.KGGGGGGGGK.', '.KGGGGGGGGK.', '..KKKKKKKK..']
const POT_C = { K: INK, G: '#9aa5c4' }
const STEAM = ['.W..W.', 'W..W..', '.W..W.', '..W..W']
const BOX = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KBBBBBBBBBBK', 'KKKKKKKKKKKK']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']

/** a plate stack: n plates, the top one labelled */
function plates(x, cx, cy, n, k, top) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < n; i++) {
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, -i * 26, 130, 30, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, -i * 26 - 4, 122, 24, 0, 0, Math.PI * 2); x.fill()
  }
  if (top) { x.fillStyle = PINK; x.beginPath(); x.ellipse(0, -n * 26 - 4, 122, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(top, 0, -n * 26 - 2) }
  x.restore()
}
/** a pixel phone with chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2); x.restore()
  })
  x.restore()
}
/** a mini month grid of dots, hearts on some days; the last one lights up late */
function birthdays(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -180, 340, 360); x.fillStyle = BONE; x.fillRect(-162, -172, 324, 344)
  x.fillStyle = PINK; x.fillRect(-162, -172, 324, 56)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BIRTHDAYS', 0, -142)
  for (let d = 0; d < 28; d++) {
    const c = d % 7, r = Math.floor(d / 7), px = -132 + c * 44, py = -70 + r * 58
    const mine = d === 26, on = mine ? lt > 1.4 : (d * 7) % 3 !== 0
    if (on) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: mine ? GOLD : '#ff4f86' }, px, py, mine ? 6 : 4.6)
    else { x.fillStyle = '#b9b0a0'; x.fillRect(px - 6, py - 6, 12, 12) }
    if (mine) { x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(px - 22, py - 24, 44, 48) }
  }
  x.restore()
}
/** a blanket fort / shell: a lilac dome with a little sign */
function shell(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 200, Math.PI, 0); x.lineTo(200, 10); x.lineTo(-200, 10); x.fill()
  x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(0, 0, 190, Math.PI, 0); x.fill()
  x.fillStyle = '#a985e6'; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 190, Math.PI + i * Math.PI / 5 + 0.08, Math.PI + i * Math.PI / 5 + 0.22); x.fill() }
  x.restore()
}
/** the wave: tide rising and falling across the panel floor */
function tide(x, t, lt, k) {
  if (k <= 0.01) return
  const lvl = 1120 - 140 * (0.5 + 0.5 * Math.sin(lt * 2.6))
  x.save(); x.globalAlpha = clamp(k) * 0.85; x.fillStyle = '#5aa9e6'
  x.beginPath(); x.moveTo(110, 1220); for (let i = 0; i <= 40; i++) { const px = 110 + i * 21.5; x.lineTo(px, lvl + 14 * Math.sin(i * 0.7 + t * 3)) } x.lineTo(970, 1220); x.fill()
  x.fillStyle = ACC; for (let i = 0; i <= 40; i += 3) x.fillRect(110 + i * 21.5, lvl + 14 * Math.sin(i * 0.7 + t * 3) - 4, 16, 8)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'New place? | Home in *four minutes.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 22 * k)
      L(x, 790, 640, 'HOTEL ROOM 214', pop01(t, P.t0 + 0.4, 0.3, 2), BONE, -0.04, 28)
      L(x, 790, 1100, 'NOW: COSY', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 38)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Remember all birthdays? | *Yours counts too.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      birthdays(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 790, 940, P.t0 + 1.5, 7, 140, 0.5, [GOLD, PINK, BONE])
      L(x, 790, 1120, 'THIS ONE’S YOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Feeding everyone? | *Save yourself a plate.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, POT, POT_C, 690, 1040, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.4) drawBits(x, STEAM, { W: BONE }, 690, 930 - (t * 30 % 30), 9, { alpha: 0.7 })
      plates(x, 860, 1080, 4, pop01(t, P.t0 + 0.5, 0.3, 2), lt > 1.3 ? 'FOR ME' : null)
      bubble(x, 800, 660, 'seconds, anyone?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Moods like the tide? | *Still so lovable.*', mood: lt => Math.sin(lt * 2.6) > 0 ? 'happy' : 'neutral', star: { x: -170, y: -60 },
    back(x, t, lt, P) { tide(x, t, lt, pop01(t, P.t0 + 0.2, 0.4, 1.6)) },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#ffe76a' }, 820, 640, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 860, 'LOVE LEVEL: SAME', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Kept every ticket stub? | *That’s love, archived.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.floor(clamp((lt - 0.4) / 1.0) * 5)
      const COLS = [GOLD, PINK, MINT, ACC, LAV]
      for (let i = 0; i < n; i++) L(x, 790 + (i % 2 ? 40 : -40), 940 - i * 62, ['CINEMA 2019', 'FAIR RIDE', 'GIG, ROW F', 'TRAIN HOME', 'ZOO DAY'][i], 1, COLS[i], (i % 2 ? 0.08 : -0.08), 26)
      drawBits(x, BOX, { K: INK, B: '#d59a4a' }, 790, 1060, 22 * k)
      L(x, 790, 1060, 'MEMORIES', k, CREAM, 0, 28)
    } },
  { sign: S, cap: 'Back in your shell? | *Rest is allowed.*', mood: 'sleepy', star: { x: -170, y: 40, s: 240 },
    back(x, t, lt, P) { shell(x, 370, 1010, pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'BACK SOON ♡', pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV, -0.05, 38)
      bubble(x, 790, 960, 'take your time', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Text “home safe?” | *It means a lot.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '11:58 PM', headCol: ACC, lines: [
        ['home safe?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['yes!! ♡', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['you’re the best', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Your hugs? | They *fix things.*', mood: 'heart', look: [1, 0], star: { x: -110 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const hug = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (k > 0.01) signChar(x, t, 'pisces', lerp(830, 690, hug), 900, 210 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 19, glyph: false, tears: lt > 1.2 ? 3 : 2 })
      L(x, 790, 640, 'HUG: 10/10', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.05, 40)
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 7 })
    } },
  { sign: S, cap: 'Homesick? | Home *comes with you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      drawBits(x, HOUSE, HOUSE_C, F.x + 6, F.top - 70, 11 * k, { rot: 0.05 * Math.sin(t * 4) })
      L(x, 790, 820, 'HOME: PORTABLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, F.x, F.top - 70, P.t0 + 0.8, 6, 110, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0416', key: 'D', accent: ACC, solo: 'cancer', ending: 'group',
  title: 'Cancer, home is | *also you.*',
  cameos: CAMEOS,
  group: {
    cap: 'Wherever you are, | *it’s warm there.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
