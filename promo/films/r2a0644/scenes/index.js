// r2a0644: star_advice, ADVICE SOLO, "Cancer, your sign | to call home." (topic: Cancer, this is your sign to call home)
// (~45 s vertical, signs3kit social cut, music: lofi · E). One sign the whole way through (makeFilm solo mode, 9 cards): a
// relatable Cancer truth + a warm nudge to call home, one gag each. Ending: callback.
//   0.0–3.6    "Cancer, your sign | *to call home.*"  One big Cancer pops in.
//   3.6–37.8   you miss home more than you say (a little lit house) · they'd love to hear about your day · no reason
//              needed · home is your people · ask for the pie recipe · homesick? that's love · tell them about your new
//              match · can't call? mail a postcard · hang up smiling, call again Sunday
//  37.8        "Home’s just | *one call away.*"  Cancer comes back, big.
//  41.2        callback: "Made Nana’s pie. | *Almost like hers.*"  The pie comes back: CLOSE ENOUGH.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#4fc3ff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e'
const S = 'cancer'

// ── props
const HOUSE = [
  '......RR......',
  '.....RRRR.....',
  '....RRRRRR....',
  '...RRRRRRRR...',
  '..RRRRRRRRRR..',
  '.RRRRRRRRRRRR.',
  '..WWWWWWWWWW..',
  '..WYYWWWWYYW..',
  '..WYYWWWWYYW..',
  '..WWWWDDWWWW..',
  '..WWWWDDWWWW..',
  '..WWWWDDWWWW..',
]
const HOUSE_C = { R: RED, W: CREAM, Y: '#ffe24a', D: BROWN }
const PIE = [
  '....CCCCCC....',
  '..CCcCCCCcCC..',
  '.CCCCCCcCCCCC.',
  'CcCCCCCCCCCcCC',
  'PPPPPPPPPPPPPP',
  '.TTTTTTTTTTTT.',
  '..TTTTTTTTTT..',
]
const PIE_C = { C: '#e0a86a', c: '#a0602a', P: '#c94a6a', T: '#9aa5c4' }
const MOON = ['...YYYY.', '..YYYY..', '.YYYY...', '.YYYY...', '.YYYY...', '.YYYYY..', '..YYYYYY', '...YYYY.']

// a phone with a header and up to two bubbles
function phone(x, cx, cy, k, { head, headCol = MINT, msg = [], foot, ring = 0 }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 + Math.sin(ring * 40) * 0.04 * (ring > 0 ? 1 : 0)); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  x.font = `800 26px ${INTER}`
  msg.forEach(([m, col, kk], i) => { if (kk <= 0.01) return; x.save(); x.translate(0, -56 + i * 56); x.scale(kk, kk); const w = x.measureText(m).width + 28; x.fillStyle = col; x.fillRect(-w / 2, -23, w, 46); x.fillStyle = INK; x.fillText(m, 0, 2); x.restore() })
  if (foot) { x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText(foot, 0, 120) }
  x.restore()
}
// a handwritten recipe card
function recipe(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 310, 210)
  x.fillStyle = INK; x.fillRect(-160, -106, 320, 216); x.fillStyle = CREAM; x.fillRect(-154, -100, 308, 204)
  x.fillStyle = RED; x.fillRect(-154, -100, 308, 8)
  x.fillStyle = BROWN; x.font = `italic 700 34px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('Nana’s pie', 0, -54)
  x.font = `italic 500 24px Georgia, serif`; x.fillText('a pinch of this…', 0, 0); x.fillText('…and lots of love', 0, 40)
  x.restore()
}
// a postcard with a stamp
function postcard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 330, 216)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#ffffff'; x.fillRect(-164, -104, 328, 208)
  x.fillStyle = '#c9c3d8'; x.fillRect(0, -90, 4, 180)
  x.fillStyle = BLUE; x.fillRect(90, -90, 60, 70); x.fillStyle = '#ffffff'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♡', 120, -54)
  x.fillStyle = BROWN; x.font = `italic 600 28px Georgia, serif`; x.fillText('miss you!', -84, -30); x.fillText('xo', -84, 20)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(20, 10 + i * 30, 130, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You miss home | *more than you say.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'PORCH LIGHT: ON', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 720, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'They’d love to hear | *about your day.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'HOME ♡', headCol: PINK, msg: [['hi sweetie!!', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['tell us', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)], ['everything', BONE, pop01(t, P.t0 + 1.2, 0.25, 2.2)]] })
    } },
  { sign: S, cap: 'No big reason needed. | *“Just because” counts.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'hi! no reason. | just missed you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 980, 'BEST REASON EVER', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Home isn’t just a place. | *It’s your people.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['taurus', 'leo', 'pisces'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 690 + i * 110, 940 - (i % 2) * 70, 150 * k, { mood: 'happy', look: [-1, 0], seed: 30 + i, glyph: false, tears: id === 'pisces' ? 1 : 0, hops: [P.t0 + 1.2 + i * 0.15] })
      })
      label(x, 790, 660, 'HOME: FOUND', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask for the recipe. | *Keep it forever.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      recipe(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIE, PIE_C, 790, 1050, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
    } },
  { sign: S, cap: 'Homesick tonight? | *That’s just love.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: lt => lt < 1.2 ? 1 : 0, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, MOON, { Y: '#fff1a8' }, 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'MISSING = LOVING', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 780, P.t0 + 1.3, 6, 130, 0.4)
    } },
  { sign: S, cap: 'Got a new match? | *Home wants details.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', msg: [['what’s their', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)], ['sign??', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)]], foot: '— MOM' })
      label(x, 790, 1120, 'FAMILY: INVESTED', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Can’t call today? | *Mail a postcard.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      postcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'FRIDGE-WORTHY', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hang up smiling. | *Call again Sunday.*', mood: 'heart', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALL ENDED', headCol: LAV, msg: [['love you!', PINK, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['love you more', PINK, pop01(t, P.t0 + 0.9, 0.25, 2.2)]], foot: 'NEXT: SUNDAY ♡' })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0644', key: 'E', accent: BLUE, solo: S, ending: 'callback',
  title: 'Cancer, your sign | *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Home’s just | *one call away.*', mood: 'heart' },
  last: {
    text: 'Made Nana’s pie. | *Almost like hers.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, PIE, PIE_C, 540, 1060, 30 * pop01(t, t0 + 0.5, 0.4, 2))
      x.save(); x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 10; x.lineCap = 'round'
      if (lt > 1.0) for (const dx of [-80, 0, 80]) { x.beginPath(); for (let j = 0; j <= 10; j++) { const yy = 930 - j * 10, xx = 540 + dx + Math.sin(j * 0.8 + t * 4 + dx) * 10; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
      x.restore()
      label(x, 540, 1260, 'CLOSE ENOUGH ♡', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 960, t0 + 1.6, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
