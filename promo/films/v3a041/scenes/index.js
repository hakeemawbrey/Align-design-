// v3a041: star_advice, ADVICE ROLLCALL, "How each sign | shows up for you." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm, specific way each one shows up (one light visual gag each). Ending: 'group'.
//   0.0–3.6    "How each sign | *shows up for you.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ "bad day :(" 4:01, at your door 4:03 · ♉ a basket that keeps filling: BROUGHT EVERYTHING
//              · ♊ the perfect-timing meme: FRIEND: CACKLING · ♋ a cake for your dog: "happy bday, Biscuit!"
//              · ♌ a GO YOU!! banner, front row · ♍ labels every moving box (MUGS · MORE MUGS · WHY SO MANY MUGS)
//              · ♎ the reunion: RSVP 12/12 · ♏ the vibe radar pings: ON IT · ♐ a map, a dotted line: ROAD TRIP?
//              · ♑ proofreads your cover letter under the moon · ♒ "I collect rocks." "I NAME mine." · ♓ cries with you
//  49.2        "Friends like these? | *Keep them.*"  The twelve fly up into a group photo, hearts float up (the ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', CARD = '#d9a35e'

// a framed slab (phone / paper / banner), ink outline + drop shadow; leaves the context translated for the caller
function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const BREAD = ['..BBBBB..', '.BbBbBbB.', 'BBBBBBBBB', 'BBBBBBBBB', '.BBBBBBB.']
const BREAD_C = { B: '#e8a24a', b: '#fff1c4' }
const PIE = ['.CCCCCCC.', 'CcCcCcCcC', 'FFFFFFFFF', '.FFFFFFF.']
const PIE_C = { C: '#f2c27a', c: '#c96a2a', F: '#e23d4e' }
const BASKET = ['W...........W', '.W.........W.', 'BBBBBBBBBBBBB', 'BbBbBbBbBbBbB', 'BBBBBBBBBBBBB', '.BbBbBbBbBbB.', '..BBBBBBBBB..']
const BASKET_C = { W: '#8a4a2e', B: WOOD, b: '#a8742a' }
const CAKE = ['....F....', '....W....', '....W....', 'PPPPPPPPP', 'PwPwPwPwP', 'CCCCCCCCC', 'CCCCCCCCC']
const CAKE_C = { F: GOLD, W: '#fff', P: PINK, w: '#fff4e2', C: '#c98f2a' }
const ROCK = ['..GGG..', '.GgGGG.', 'GGGGgGG', 'GgGGGGG', '.GGGGG.']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BbbbbbbB', 'BbbbbbbB', 'BBBBBBBB']

function box(x, cx, cy, w, h, text, k, rot = 0) {
  if (!slab(x, cx, cy, w, h, k, { bg: CARD, rot })) return
  x.fillStyle = '#b5833f'; x.fillRect(-w / 2, -6, w, 12)
  x.fillStyle = BONE; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, 52)
  txt(x, text, 0, -h / 2 + 39, 31, INK, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bad day? | Aries is *already outside.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      if (slab(x, 800, 820, 260, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', inner: '#140c30', rot: 0.04 })) {
        x.fillStyle = LAV; x.fillRect(-100, -110, 200, 70); txt(x, 'bad day :(', 0, -76, 32)
        txt(x, 'sent 4:01', 50, -20, 20, '#9aa5c4', MONO, 700)
        x.restore()
      }
      label(x, 800, 1090, 'AT YOUR DOOR: 4:03', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 0.4 && lt < 1.0) { x.fillStyle = BONE; for (let i = 0; i < 3; i++) x.fillRect(150 + i * 10, 840 + i * 40, 60, 8) }
    } },
  { sign: 'taurus', cap: 'Never shows up | *empty-handed.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const items = [[BREAD, BREAD_C, 730, 940], [PIE, PIE_C, 860, 940], [BREAD, BREAD_C, 800, 880], [PIE, PIE_C, 790, 820]]
      items.forEach(([bm, c, X, Y], i) => { const d = pop01(t, P.t0 + 0.45 + i * 0.28, 0.3, 2); if (d > 0.01) drawBits(x, bm, c, X, Y, 15 * d, { rot: (i % 2 ? 0.1 : -0.1) }) })
      drawBits(x, BASKET, BASKET_C, 800, 1010, 20 * k)
      label(x, 800, 650, 'BROUGHT: EVERYTHING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sends the meme | *at the perfect time.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      if (slab(x, 800, 850, 270, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2a2350', inner: '#140c30', rot: -0.04 })) {
        x.fillStyle = '#8fe3ff'; x.fillRect(-100, -150, 200, 150)
        x.restore()
        signChar(x, t, 'taurus', 795, 790, 110 * pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sleepy', seed: 51, glyph: false, glow: 0.4 })
      }
      bubble(x, 800, 960, 'this is SO you', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 30, tail: 'bl' })
      label(x, 800, 1130, 'FRIEND: CACKLING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: "Remembers your | *dog's birthday.*", mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) { x.fillStyle = Math.floor(t * 8) % 2 ? GOLD : '#ffb34a'; x.fillRect(780, 852, 22, 26) }
      bubble(x, 760, 680, 'happy bday, | Biscuit!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1130, 'BISCUIT IS A DOG', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: 'leo', cap: 'Your loudest fan. | *Front row.*', mood: 'sparkle', star: { x: 0, y: 90, s: 270 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (slab(x, 540, 640, 560, 150, k, { bg: '#fff4e2', rot: -0.03 + 0.03 * Math.sin(t * 6) })) {
        x.fillStyle = '#ffb34a'; x.fillRect(-280, -75, 560, 22); x.fillRect(-280, 53, 560, 22)
        txt(x, 'GO YOU!!', 0, 4, 80, RED)
        x.restore()
      }
      hearts(x, t, 540, 1000, P.t0 + 1.0, { n: 8, life: 2, spread: 600, cell: 7, seed: 6 })
      sparkles(x, t, 540, 640, P.t0 + 0.9, 8, 300, 0.2)
    } },
  { sign: 'virgo', cap: 'Helps you move. | *Labels every box.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      box(x, 800, 1020, 300, 170, 'MUGS', pop01(t, P.t0 + 0.2, 0.3, 2))
      box(x, 800, 850, 280, 170, 'MORE MUGS', pop01(t, P.t0 + 0.6, 0.3, 2), 0.03)
      box(x, 800, 680, 290, 170, 'WHY SO MANY?', pop01(t, P.t0 + 1.3, 0.3, 2), -0.04)
    } },
  { sign: 'libra', cap: 'Plans the reunion. | *Everyone* comes.', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 300, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.03 })) {
        txt(x, 'REUNION', 0, -140, 34)
        const n = Math.min(12, Math.floor(clamp((lt - 0.4) / 1.0) * 12))
        for (let i = 0; i < 12; i++) { const c = i % 3, r = Math.floor(i / 3); x.fillStyle = i < n ? '#2fc79a' : '#d6cfc0'; x.fillRect(-105 + c * 75, -95 + r * 60, 60, 46); if (i < n) txt(x, '✓', -75 + c * 75, -72 + r * 60, 30, '#fff') }
        x.restore()
      }
      label(x, 800, 1110, 'RSVP: 12 / 12', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows something’s wrong | *before you do.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 850); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#123a2a'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.strokeStyle = '#2fc79a'; x.lineWidth = 3; for (const r of [50, 100, 145]) { x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke() }
        const a = t * 3; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 145, Math.sin(a) * 145); x.stroke()
        if (lt > 0.7) { x.fillStyle = Math.floor(t * 6) % 2 ? RED : '#ff8f8f'; x.fillRect(50, -70, 24, 24) }
        x.restore()
      }
      label(x, 800, 620, 'VIBE: OFF', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'ON IT. TEA COMING.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Turns your bad day | into an *adventure.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 800, 860, 340, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#f2dfb0', rot: -0.04 })) {
        x.fillStyle = '#a7d98f'; x.fillRect(-150, -120, 120, 90); x.fillRect(40, 10, 110, 100)
        x.fillStyle = '#8fc7e8'; x.fillRect(-20, -130, 60, 260)
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 14)
        x.fillStyle = RED; for (let i = 0; i < n; i++) { const p = i / 13; x.fillRect(lerp(-110, 110, p) - 5, -70 + Math.sin(p * 5) * 60 + p * 80 - 5, 10, 10) }
        if (n >= 14) { x.lineWidth = 8; x.strokeStyle = RED; x.beginPath(); x.moveTo(90, 50); x.lineTo(130, 90); x.moveTo(130, 50); x.lineTo(90, 90); x.stroke() }
        x.restore()
      }
      label(x, 800, 650, 'ROAD TRIP?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Proofreads your | cover letter. *Midnight.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(890, 600, 50 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(912, 588, 44 * k, 0, Math.PI * 2); x.fill(); x.restore() }
      if (slab(x, 790, 880, 280, 340, pop01(t, P.t0 + 0.3, 0.3, 2), { bg: '#fff4e2', rot: 0.03 })) {
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 8; i++) x.fillRect(-110, -130 + i * 34, 220 - (i % 3) * 40, 12)
        const n = Math.floor(clamp((lt - 0.5) / 0.9) * 6)
        x.strokeStyle = RED; x.lineWidth = 5; for (let i = 0; i < n; i++) { x.beginPath(); x.ellipse(-60 + (i % 3) * 60, -124 + i * 45, 34, 18, 0, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      label(x, 790, 1110, 'TYPOS FOUND: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Loves your *weird.* | Raises you one.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: { x: -200, y: 60, s: 240 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 33, glyph: false })
      drawBits(x, ROCK, { G: '#9aa5c4', g: '#c9d0e4' }, 800, 1110, 12 * k)
      bubble(x, 800, 650, 'I collect rocks.', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 36, tail: 'bc' })
      bubble(x, 330, 620, 'I NAME mine.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 800, 760, 'WEIRD: MATCHED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries *with you.* | Every single time.', mood: 'neutral', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 930, 200 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], seed: 34, glyph: false, hops: lt > 1.4 ? [P.t0 + 1.9] : [] })
      drawBits(x, TISSUE, { W: '#fff', B: SKYB, b: '#c9f1ff' }, 540, 1110, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 650, 'TISSUES: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a041', key: 'D', accent: PINK, ending: 'group',
  title: 'How each sign | *shows up for you.*',
  cameos: CAMEOS,
  group: {
    cap: 'Friends like these? | *Keep them.*',
    moods: ['sparkle', 'happy', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'happy', 'sparkle', 'happy', 'wink', 'heart'],
    draw(x, t, lt) {
      hearts(x, t, 540, 1350, t - lt + 1.4, { n: 12, life: 2.6, spread: 860, cell: 8, seed: 7 })
      sparkles(x, t, 540, 1180, t - lt + 1.1, 12, 380, 0.4, [PINK, GOLD, BONE])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
