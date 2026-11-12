// r2t0714: star_talk, BE LIKE, "Zodiacs in a new fit | be like." (signs3kit social cut, music: lofi · D, ending: callback)
//   0.0–3.6    "Zodiacs in a new fit | *be like.*"  The twelve line up, then the cards start.
//   3.6–49.2   twelve cards (3.8 s each), each sign in something new:
//              Aries wore it with the tag still on · Taurus: new sweater, day nine · Gemini: a new profile pic per
//              outfit change · Cancer is saving it for a special day · Leo walks in slow motion · Virgo lint-rolls it
//              before the first wear · Libra asks everyone "is this me?" · Scorpio bought it in black, again · Sag's new
//              hat blew away in an hour · Capricorn calculated the cost per wear · Aquarius wears it backwards, on purpose
//              · Pisces: happy tears, it fits
//  49.2        "New fit. | *New personality.*"
//  52.6        callback: "Taurus, day thirty. | *Still the sweater.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, friend, HANGER, HANGER_C, SWEATER, SWEATER_C, HAT, HAT_C, RED, CREAM, ORANGE, VIOLET, NIGHT } from './props.js'

const TEE = [
  'TTT....TTT',
  'TTTTTTTTTT',
  'TTTTTTTTTT',
  '.TTTTTTTT.',
  '..TTTTTT..',
  '..TTTTTT..',
  '..TTTTTT..',
  '..TTTTTT..',
]
const ROLLER = [
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  'WWWWWWWWWW',
  '....KK....',
  '....KK....',
  '....RR....',
  '....RR....',
  '....RR....',
]
// a sweater with a little day counter
function sweater(x, cx, cy, cell, k) { drawBits(x, SWEATER, SWEATER_C, cx, cy, cell * k) }
// a price tag on a string
function tag(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.25 + 0.12 * Math.sin(t * 3)); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -80); x.lineTo(0, -30); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -26); x.lineTo(50, -26); x.lineTo(50, 74); x.lineTo(-50, 74); x.lineTo(-50, -26); x.fill()
  x.fillStyle = CREAM; x.fillRect(-44, -20, 88, 88); x.fillStyle = INK; x.beginPath(); x.arc(0, -4, 6, 0, Math.PI * 2); x.fill()
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 36)
  x.restore()
}
// wind streaks for slow motion
function wind(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE
  for (let i = 0; i < 6; i++) { const px = cx + ((i * 97 + t * 120) % 400) - 200; x.fillRect(px, cy - 150 + i * 55, 90, 6) }
  x.restore()
}
// a wardrobe rail of hangers, all black
function rail(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -150, 400, 14); x.fillStyle = '#c9c9d8'; x.fillRect(-196, -146, 392, 6)
  for (let i = 0; i < n; i++) drawBits(x, TEE, { T: i === n - 1 ? '#1a1a24' : '#24202e' }, -170 + i * 68, -60, 7.5, { outline: '#6a6090' })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wore it out the shop. | *Tag still on.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      tag(x, t, F.x + 170, F.cy - 30, 1.5 * pop01(t, P.t0 + 0.4, 0.3, 2), '$40')
      label(x, 790, 650, 'NO TIME. GO.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'New cozy sweater. | *Day nine.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', star: { x: -190 },
    front(x, t, lt, P) {
      sweater(x, 790, 860, 24, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 8)
      label(x, 790, 1090, `DAY ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, font: MONO, weight: 700, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'New profile pic | *every outfit change.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [0.8, 1.4, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 4)
      for (let i = 0; i < n; i++) board(x, 740 + i * 34, 820 - i * 24, 0.8, { w: 210, h: 260, frame: ['#ffd23a', PINK, MINT, SKYB][i], bg: NIGHT, rot: -0.08 + i * 0.06 }, x => signChar(x, t, 'gemini', 0, -10, 140, { mood: i % 2 ? 'wink' : 'sparkle', glyph: false, seed: 60 + i, glow: 0.6 }))
      label(x, 790, 1100, `PIC ${n} OF THE DAY`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: '#ffd23a', font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Saving it | *for a special day.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      board(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 220, frame: PINK, bg: SKYB, rot: 0.04 }, x => { x.fillStyle = PINK; x.fillRect(-20, -110, 40, 220); x.fillRect(-150, -20, 300, 40) })
      label(x, 790, 1060, 'OPEN: SOMEDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: CREAM, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'New jacket. | *Walked in slow motion.*', mood: 'sparkle', star: { x: -100 }, hops: [],
    back(x, t, lt, P) { wind(x, t, 540, 860, pop01(t, P.t0 + 0.3, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SLO-MO: ON', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700, rot: 0.05 })
      sparkles(x, t, 440, 860, P.t0 + 1.2, 8, 200, 0.4)
      bubble(x, 760, 1110, '*hair flip*', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Lint-rolled it | *before the first wear.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TEE, { T: SKYB }, 790, 880, 24 * k)
      drawBits(x, ROLLER, { W: '#ffffff', K: INK, R: '#c7e07a' }, 790 + 60 * Math.sin(lt * 5), 840 + 40 * Math.cos(lt * 5), 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: 0.3 })
      label(x, 790, 1110, 'LINT FOUND: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#c7e07a', font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Asked everyone: | *“is this me?”*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const A = [['yes!', 640, 640], ['so you', 860, 700], ['iconic', 690, 900], ['wear it!!', 860, 1000], ['…is it?', 640, 1100]]
      A.forEach(([s, ax, ay], i) => bubble(x, ax, ay, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 34, tail: i % 2 ? 'br' : 'bl', col: i === 4 ? LAV : BONE }))
    } },
  { sign: 'scorpio', cap: 'Bought it in black. | *Again.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      rail(x, t, 740, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 3 + Math.floor(clamp((lt - 0.4) / 1.0) * 3))
      label(x, 790, 1080, 'BLACK #47', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#ff5e8a', font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'New hat. | *Lost it in an hour.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -200 }, hops: [0.6],
    front(x, t, lt, P, F) {
      const fly = ease.inCubic(prog(lt, 0.9, 2.2))
      drawBits(x, HAT, HAT_C, lerp(F.x, 880, fly), lerp(F.top - 30, 640, fly) - Math.sin(fly * Math.PI) * 80, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fly * 4 })
      bubble(x, 760, 1100, 'bye, hat!!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Calculated the | *cost per wear.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { title: 'COST / WEAR', lines: ['wear 1: $90', 'wear 30: $3', 'wear 90: $1'], ticks: clamp((lt - 0.6) / 1.0) * 3.01, w: 330, head: '#7dd87a' })
      label(x, 790, 1110, 'WORTH IT ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Wore it backwards. | *On purpose.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TEE, { T: '#6be0ff' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)); tag(x, t, 790, 790, 0.9 * pop01(t, P.t0 + 0.6, 0.3, 2), 'BACK')
      label(x, 790, 1090, 'IT’S A LOOK', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: '#6be0ff', font: MONO, weight: 700, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'It fits perfectly. | *Happy tears.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: { x: -190 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TEE, { T: '#a99bff' }, 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'PERFECT FIT ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: PINK, font: MONO, weight: 700, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.1, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2t0714', key: 'D', accent: PINK, ending: 'callback',
  title: 'Zodiacs in a new fit | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'New fit. | *New personality.*' },
  last: {
    text: 'Taurus, day thirty. | *Still the sweater.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) {
        signChar(x, t, 'taurus', 540, 1120, 300 * k, { mood: 'heart', seed: 4, glyph: false, hops: [t0 + 1.4] })
        drawBits(x, SWEATER, SWEATER_C, 540, 1215, 15 * k, { alpha: 0.95 })
      }
      const n = 9 + Math.floor(clamp((lt - 0.6) / 1.2) * 21)
      label(x, 760, 960, `DAY ${n}`, pop01(t, t0 + 0.7, 0.3, 2.2), { size: 48, bg: GOLD, font: MONO, weight: 700, rot: 0.06 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
