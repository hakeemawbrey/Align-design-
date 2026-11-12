// r2a0462: star_advice, ADVICE SOLO (pisces), "Pisces, this is your sign | *to call home.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine gentle nudges for a Pisces to call home, a relatable truth + a warm reframe (Pisces cries in
// every card). Ending: lesson.
//   missing home cooking · homesick from a song · typed "miss you", deleted it · scared it'll be awkward · worried you're a
//   bother · crying at old photos · checked the family's charts, call the Cancer one · 3% battery · far from home
//   group "Soft heart. | Strong roots."   lesson "Missing them is love. | Let them hear it."   last "Pisces called home. | Everyone cried."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', ACC = '#8fe3ff', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone: header strip, a big middle line, chat pills or ring waves */
function phone(x, t, cx, cy, k, { head = '', headCol = MINT, big = '', bigCol = BONE, sub = '', ring = false, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (ring) {
    x.strokeStyle = MINT; x.lineWidth = 6
    for (let i = 0; i < 3; i++) { const ph = ((t * 1.4 + i / 3) % 1); x.globalAlpha = 1 - ph; x.beginPath(); x.arc(0, 0, 210 + ph * 90, -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(0, 0, 210 + ph * 90, Math.PI - 0.6, Math.PI + 0.6); x.stroke() }
    x.globalAlpha = 1
  }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -132) }
  if (big) { x.fillStyle = bigCol; x.font = `800 ${big.length > 8 ? 34 : 44}px ${INTER}`; x.fillText(big, 0, -10) }
  if (sub) { x.fillStyle = GREY; x.font = `700 22px ${MONO}`; x.fillText(sub, 0, 60) }
  x.textAlign = 'left'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little photo with a family of tiny stars inside */
function photo(x, t, cx, cy, k, rot, ids, seed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, -96, 236, 210)
  x.fillStyle = INK; x.fillRect(-122, -108, 244, 216); x.fillStyle = CREAM; x.fillRect(-114, -100, 228, 200)
  x.fillStyle = '#3a3260'; x.fillRect(-100, -86, 200, 140)
  ids.forEach((id, i) => signChar(x, t, id, -60 + i * 60 * (2 / Math.max(1, ids.length - 1)), -10, 70, { mood: 'happy', seed: seed + i, glyph: false, glow: 0.5 }))
  x.restore()
}
const POT = ['...KKKKK...', '..KKKKKKK..', 'HPPPPPPPPPH', '.PPWPPPPPP.', '.PPPPPPPPP.', '.PPPPPPPPP.', '..PPPPPPP..']
const POT_C = { K: GREY, P: RED, W: '#ffffff', H: GREY }
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
const HOUSE_C = { R: RED, W: CREAM, Y: GOLD, D: '#8a5a3a' }
const BATT = ['KKKKKKKKKK.', 'KRR......KK', 'KRR......KK', 'KKKKKKKKKK.']

const CAMEOS = [
  // 1 · home cooking
  { sign: S, cap: 'Missing home cooking? | *Call for the recipe.*', mood: lt => lt < 1.2 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 790, 900, P.t0 + 0.4, { n: 4, cell: 10, rise: 170, spread: 100, seed: 1 })
      L(x, 790, 650, 'MOM’S SOUP', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 40)
      L(x, 790, 1150, 'RECIPE: “A LITTLE”', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 30)
    } },
  // 2 · a song
  { sign: S, cap: 'Homesick from a song? | *Call and hum it.*', mood: lt => lt < 1.2 ? 'sparkle' : 'happy', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: SKYB, seed: 1 })
      bubble(x, 790, 700, 'hmm hm hmmm ♪', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 1080, 'that’s OUR song!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  // 3 · the draft
  { sign: S, cap: 'Deleted “miss you” again? | *Send it.*', mood: lt => lt < 1.4 ? 'sparkle' : 'heart', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sent = lt > 1.4
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: sent ? 'SENT ✓' : 'DRAFT', headCol: sent ? MINT : GOLD, lines: [['miss you ♡', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['miss u more!', LAV, pop01(t, P.t0 + 1.8, 0.2, 2), false]] })
      if (sent) hearts(x, t, 800, 700, P.t0 + 1.9, { n: 5, life: 1.2, spread: 180, cell: 7, seed: 3 })
    } },
  // 4 · awkward
  { sign: S, cap: 'Scared it’ll be awkward? | They’re *just happy.*', mood: lt => lt < 1.1 ? 'wide' : 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'HOME ♡', headCol: PINK, big: 'HELLO!!', bigCol: PINK, sub: 'picked up in 1 ring' })
      bubble(x, 520, 620, 'MY BABY!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  // 5 · a bother
  { sign: S, cap: 'Worried you’re a bother? | You’re *their favourite.*', mood: lt => lt < 1.2 ? 'sparkle' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'CONTACTS', headCol: MINT, big: '★ YOU', bigCol: GOLD, sub: 'pinned to the top' })
      sparkles(x, t, 800, 870, P.t0 + 1.2, 7, 170, 0.4)
      L(x, 800, 1140, 'FAVOURITE ★', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 38)
    } },
  // 6 · old photos
  { sign: S, cap: 'Crying at old photos? | *Call who’s in them.*', mood: 'sparkle', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      photo(x, t, 760, 760, pop01(t, P.t0 + 0.2, 0.3, 2), -0.08, ['cancer', 'pisces', 'taurus'], 40)
      photo(x, t, 820, 1020, pop01(t, P.t0 + 0.5, 0.3, 2), 0.07, ['pisces', 'capricorn'], 50)
      L(x, 600, 1150, 'ALBUM: 2009', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.05, 32)
    } },
  // 7 · Align nod: the family charts
  { sign: S, cap: 'Read the family’s charts? | Call *the Cancer.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 150, pop01(t, P.t0 + 0.15, 0.3, 2), t)
      L(x, 790, 640, 'MOM: ♋︎ CANCER', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, -0.04, 36)
      L(x, 790, 1100, 'HOME BASE', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 36)
    } },
  // 8 · 3% battery
  { sign: S, cap: 'Phone on 3%? | *Enough for “love you.”*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BATT, { K: BONE, R: RED }, 790, 700, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 800, '3%', pop01(t, P.t0 + 0.3, 0.3, 2), RED, -0.04, 40, CREAM)
      bubble(x, 790, 1020, 'love you! | bye!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  // 9 · far from home
  { sign: S, cap: 'Far from home? | A voice *closes the gap.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      // the windows light up and a heart travels from the house
      if (lt > 1.2) hearts(x, t, 800, 800, P.t0 + 1.3, { n: 6, life: 1.4, spread: 200, cell: 7, seed: 9 })
      L(x, 800, 640, 'CONNECTED ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2a0462', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Pisces, this is your | sign *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong roots.*', mood: 'heart' },
  lesson: { text: 'Missing them is love. | *Let them hear it.*', chip: 'CALL: HOME' },
  last: {
    text: 'Pisces called home. | *Everyone cried.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
