// v3t094: THE SIGNS AS… v3, "The signs | on moving day." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs move house, each the most extreme version of themself. Ending: 'callback' (Gemini's "misc" boxes).
//   0.0–3.6    "The signs | on *moving day.*"
//   3.6–49.2   ♈ carried the couch alone, upstairs · ♉ everything's packed except them · ♊ labelled every box "misc"
//              · ♋ wrapped each mug in a love letter · ♌ a marching band for the van · ♍ box 1 of 212, colour-coded
//              · ♎ still deciding where the lamp goes · ♏ moved at midnight, told no one · ♐ everything fit in one backpack
//              · ♑ billed their friends for the boxes · ♒ placed the furniture by their birth chart
//              · ♓ found an old photo, unpacking paused
//  49.2        "New home. | *Same chaos.*"
//  52.6        callback: "The keys? | In a box marked *“misc.”*"  Gemini's box comes back, keys on top.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const COUCH = [
  'RRRRRRRRRRRRRR',
  'RrrrrrRRrrrrrR',
  'RrrrrrRRrrrrrR',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRR',
  'B............B',
]
const COUCH_C = { R: '#ff6b5a', r: '#e2483a', B: '#5b2e1a' }
const MUG = [
  'WWWWWW..',
  'WPPPPW..',
  'WPHHPWWW',
  'WPHHPW.W',
  'WPPPPWWW',
  'WWWWWW..',
]
const MUG_C = { W: '#fff4e2', P: '#ffb3c8', H: '#ff4f86' }
const LAMP = [
  '..YYYY..',
  '.YYYYYY.',
  'YYYYYYYY',
  '...BB...',
  '...BB...',
  '...BB...',
  '..BBBB..',
]
const LAMP_C = { Y: '#ffe7a8', B: '#8a4a2e' }
const PACK = [
  '...GGGG...',
  '..G....G..',
  '.GGGGGGGG.',
  'GGGGGGGGGG',
  'GGYYYYYYGG',
  'GGYGGGGYGG',
  'GGYYYYYYGG',
  'GGGGGGGGGG',
  '.GGGGGGGG.',
]
const PACK_C = { G: '#9a6bff', Y: GOLD }
const KEYS = [
  '.YYY.......',
  'Y...YYYYYYY',
  'Y...Y..Y.Y.',
  '.YYY.......',
]
const KEYS_C = { Y: GOLD }

/** a cardboard box with a marker label */
function box(x, cx, cy, w, h, k, text, { rot = 0, col = '#c98f4a', ink = INK, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-w / 2, -h / 2, w, 14)
  x.fillStyle = '#e8d3a8'; x.fillRect(-14, -h / 2, 28, h * 0.35)
  if (text) { x.fillStyle = ink; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, h * 0.12) }
  x.restore()
}
// an invoice slip
function invoice(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -160, 300, 320)
  x.fillStyle = '#fff4e2'; x.fillRect(-142, -152, 284, 304)
  x.fillStyle = INK; x.textBaseline = 'middle'
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText('INVOICE', 0, -112)
  x.font = `700 24px ${MONO}`
  const rows = [['boxes', '4.00'], ['tape', '2.50'], ['snacks', '0.00'], ['friendship', 'free']]
  rows.forEach(([a, b], i) => { if (lt > 0.4 + i * 0.25) { x.textAlign = 'left'; x.fillText(a, -120, -54 + i * 46); x.textAlign = 'right'; x.fillText(b, 120, -54 + i * 46) } })
  x.restore()
}
// a birth-chart floor plan: the couch on one house, a planet dot on the other
function planWheel(x, t, cx, cy, r, k) {
  if (k <= 0.01) return
  const COLS = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
  drawBits(x, COUCH, COUCH_C, cx, cy, 8 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Carried the couch. | *Alone. Upstairs.*', mood: 'sparkle', star: { x: -40, y: 40 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 500 + 30 * Math.sin(lt * 4), 650, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 + 0.04 * Math.sin(lt * 5) })
      label(x, 790, 1080, 'HELP? NO THANKS.', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Everything’s packed. | Except *them.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) box(x, 700 + (i % 2) * 170, 1000 - Math.floor(i / 2) * 150, 160, 130, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), 'BOX', { rot: (i - 1) * 0.05 })
      label(x, 790, 680, 'NOT MOVING', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 40, bg: '#ff6b5a', rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Labelled every box | *“misc.”*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const POS = [[700, 1010], [870, 1010], [785, 870], [785, 730]]
      POS.forEach(([px, py], i) => box(x, px, py, 160, 130, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), 'MISC', { rot: (i % 2 ? 0.05 : -0.04) }))
    } },
  { sign: 'cancer', cap: 'Wrapped every mug | in *a love letter.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 680, 'dear mug, | stay safe', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 880, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hired a marching band | for *the van.*', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'GRAND ENTRANCE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: '#ffb34a', rot: 0.05 })
      label(x, 790, 820, 'BAND: 30 PEOPLE', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04 })
      if (lt > 0.6) notes(x, t, 790, 1150, { n: 5, cell: 8, col: GOLD })
    } },
  { sign: 'virgo', cap: 'Box 1 of 212. | *Colour-coded.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', GOLD, '#5fd068', SKYB, LAV, PINK]
      for (let i = 0; i < 6; i++) box(x, 690 + (i % 2) * 190, 700 + Math.floor(i / 2) * 150, 170, 120, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), `#${i + 1}`, { col: COLS[i] })
    } },
  { sign: 'libra', cap: 'Where does the lamp go? | *Day four.*', mood: 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const px = Math.floor(lt * 2.5) % 2 ? 870 : 700
      drawBits(x, LAMP, LAMP_C, px, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'HERE? THERE?', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Moved at midnight. | *Told no one.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'NEW ADDRESS: ████', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: LAV, rot: -0.04 })
      bubble(x, 790, 920, 'what move?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Their whole life fit | in *one backpack.*', mood: 'sparkle', star: { x: 150 }, hops: [1.2],
    back(x, t, lt, P) { drawBits(x, PACK, PACK_C, 310, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.06 }) },
    front(x, t, lt, P) { label(x, 310, 1080, 'NEXT STOP: ANYWHERE', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: GOLD, rot: -0.05 }) } },
  { sign: 'capricorn', cap: 'Billed their friends | for *the boxes.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { invoice(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Placed the furniture | by *their birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      planWheel(x, t, 790, 800, 130, pop01(t, P.t0 + 0.25, 0.35, 2))
      bubble(x, 790, 1050, 'couch faces Venus', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Found an old photo. | *Unpacking: paused.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.07); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -140, 240, 280); x.fillStyle = '#fff4e2'; x.fillRect(-112, -132, 224, 264)
        x.fillStyle = '#6fc3ff'; x.fillRect(-96, -116, 192, 180)
        x.restore()
        if (k > 0.5) { signChar(x, t, 'pisces', 760, 820, 110, { glyph: false, seed: 31, mood: 'happy' }); signChar(x, t, 'cancer', 830, 830, 100, { glyph: false, seed: 32, mood: 'happy' }) }
      }
      label(x, 790, 1070, 'BEST FRIENDS · AGE 6', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 26, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3t094', key: 'F', accent: '#ffb34a', ending: 'callback',
  title: 'The signs | on *moving day.*',
  cameos: CAMEOS,
  group: { cap: 'New home. | *Same chaos.*' },
  last: {
    text: 'The keys? | In a box marked *“misc.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      box(x, 540, 1150, 360, 280, k, 'MISC', { size: 64, rot: -0.03 })
      drawBits(x, KEYS, KEYS_C, 540, 970, 18 * pop01(t, t - lt + 1.2, 0.35, 2.2), { rot: -0.1 })
      sparkles(x, t, 540, 980, t - lt + 1.3, 6, 140, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
