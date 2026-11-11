// v3a043: star_advice, ADVICE ROLLCALL, "How each sign | makes friends." (~62 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, one warm and specific way each makes a friend (one light visual gag each). Ending: 'lesson'.
//   0.0–3.6    "How each sign | *makes friends.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ "HI!! I'M ARIES!!" · ♉ breaks off one square of the good chocolate · ♊ the whole queue is laughing: 4 NEW FRIENDS
//              · ♋ a bowl of soup: YOU'RE FAMILY NOW · ♌ "LOVE THE JACKET!" from across the room · ♍ tucks your tag in
//              · ♎ two sign profiles: COMPATIBLE · ♏ the trust bar fills, slowly, then all at once · ♐ a pile of postcards
//              · ♑ HANGOUT #2, already in the planner · ♒ "what's your favourite cloud?" · ♓ cried at your story
//  49.2        "Everyone's | *somebody's person.*"  group photo.
//  52.4        LESSON UNLOCKED: "Your people | *will find you.*"  FRIENDS: FOUND
//  58.3        "Go say hi. | *Aries-style.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', CORAL = '#ff8a6b'

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

const CHOC = ['WWWWWWWWWW', 'WCcCcCcCcW', 'WCCCCCCCCW', 'WCcCcCcCcW', 'WCCCCCCCCW', 'WCcCcCcCcW', 'WCCCCCCCCW', 'WRRRRRRRRW', 'WRRRRRRRRW']
const CHOC_C = { W: '#5b2e1a', C: '#7a4a2e', c: '#9a6a4a', R: RED }
const SQUARE = ['CCCC', 'CccC', 'CccC', 'CCCC']
const BOWL = ['..S...S..', '.S...S...', '..S...S..', 'YYYYYYYYY', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..']
const BOWL_C = { S: '#e6e6f0', Y: '#ffd23a', B: '#ff8fb1' }
const POSTCARD_COLS = ['#8fe3ff', '#ffd23a', '#7dffb0', '#ff8fb1']

function profile(x, t, cx, cy, k, id, rot) {
  if (!slab(x, cx, cy, 200, 250, k, { bg: '#2a2350', rot })) return
  x.fillStyle = '#140c30'; x.fillRect(-86, -110, 172, 160)
  x.restore()
  signChar(x, t, id, cx, cy - 40, 130 * k, { mood: 'happy', seed: id.length + 40, glyph: false, glow: 0.7 })
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  txt(x, id.toUpperCase(), 0, 90, 26, '#ffd23a', MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Says hi first. | *Very loud.*', mood: 'sparkle', star: { x: -200, y: 40 }, hops: [0.4, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 980, 190 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], seed: 36, glyph: false, hops: lt > 1.3 ? [P.t0 + 1.6] : [] })
      bubble(x, 520, 630, "HI!! I'M ARIES!!", pop01(t, P.t0 + 0.5, 0.25, 2.4) * (1 + 0.04 * Math.sin(t * 20)), { size: 52, tail: 'bl' })
      bubble(x, 820, 790, 'hi…!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Shares the *good* snacks. | That’s trust.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CHOC, CHOC_C, 790, 880, 22 * k, { rot: 0.06 })
      const d = ease.outCubic(prog(lt, 0.8, 1.3))
      if (lt > 0.8) drawBits(x, SQUARE, { C: '#7a4a2e', c: '#9a6a4a' }, lerp(820, 640, d), lerp(780, 680, d), 22, { rot: d * 0.4 })
      label(x, 790, 1120, 'ONE SQUARE = BESTIES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talks to everyone | *in line.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -250, y: 20, s: 240 },
    front(x, t, lt, P) {
      const ids = ['scorpio', 'capricorn', 'aquarius', 'cancer']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2)
        const laugh = lt > 0.9 + i * 0.15
        if (k > 0.01) signChar(x, t, id, 500 + i * 120, 990, 140 * k, { mood: laugh ? 'happy' : 'neutral', look: [-1, 0], seed: 37 + i, glyph: false, hops: laugh ? [P.t0 + 1.2 + i * 0.2] : [] })
      })
      bubble(x, 420, 640, 'so anyway—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 760, 760, '4 NEW FRIENDS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopts you. | *Feeds you* forever.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, BOWL, BOWL_C, 790, 920 + Math.sin(t * 3) * 4, 24 * k)
      label(x, 790, 1120, "YOU'RE FAMILY NOW", pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04 })
      bubble(x, 790, 650, 'seconds?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Compliments your outfit | *across the room.*', mood: 'sparkle', star: { x: -260, y: 40, s: 240 }, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F = signChar(x, t, 'capricorn', 830, 960, 170 * k, { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], seed: 41, glyph: false, hops: lt > 1.2 ? [P.t0 + 1.6] : [] })
        x.fillStyle = INK; x.fillRect(760, 1000, 140, 70); x.fillStyle = TEAL; x.fillRect(766, 1006, 128, 58); x.fillStyle = INK; x.fillRect(826, 1006, 8, 58)
      }
      bubble(x, 520, 640, 'LOVE THE JACKET!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 46, tail: 'bl' })
      label(x, 830, 1150, 'SEEN. BLUSHING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Tucks in your tag. | *Friends now.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, -1], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        const F = signChar(x, t, 'sagittarius', 800, 930, 230 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 42, glyph: false })
        const tuck = ease.inOutCubic(prog(lt, 0.8, 1.15))
        if (tuck < 1) { x.save(); x.translate(800, F.top - 6); x.rotate(-0.3); x.fillStyle = INK; x.fillRect(-26, -50 * (1 - tuck) - 4, 52, 58 * (1 - tuck) + 8); x.fillStyle = '#ffffff'; x.fillRect(-22, -50 * (1 - tuck), 44, 58 * (1 - tuck)); x.restore() }
      }
      label(x, 800, 650, 'TAG: TUCKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Asks your sign. | Finds *common ground.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -250, s: 250 }, hops: [1.4],
    front(x, t, lt, P) {
      profile(x, t, 620, 870, pop01(t, P.t0 + 0.3, 0.3, 2), 'libra', -0.06)
      profile(x, t, 850, 870, pop01(t, P.t0 + 0.6, 0.3, 2), 'gemini', 0.06)
      label(x, 740, 1100, '✦ COMPATIBLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 735, 870, P.t0 + 1.4, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 8 })
    } },
  { sign: 'scorpio', cap: 'Slow to open. | Then *ride or die.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (slab(x, 790, 860, 300, 120, k, { bg: '#2a2350' })) {
        const f = lt < 1.5 ? 0.04 + 0.08 * prog(lt, 0.4, 1.5) : lerp(0.12, 1, ease.outCubic(prog(lt, 1.5, 1.8)))
        x.fillStyle = '#140c30'; x.fillRect(-130, -30, 260, 60); x.fillStyle = f >= 1 ? TEAL : RED; x.fillRect(-130, -30, 260 * f, 60)
        x.restore()
      }
      label(x, 790, 720, 'TRUST', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'FOREVER NOW', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: TEAL, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.8, 7, 190, 0.5)
    } },
  { sign: 'sagittarius', cap: 'Met you on a trip. | *Pen pals* for life.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2)
        if (slab(x, 760 + i * 30, 1000 - i * 90, 250, 160, k, { bg: '#fff4e2', rot: (i % 2 ? 0.1 : -0.08) })) {
          x.fillStyle = POSTCARD_COLS[i]; x.fillRect(-110, -64, 120, 128)
          x.fillStyle = RED; x.fillRect(66, -60, 40, 46)
          x.fillStyle = '#b9b0a0'; for (let j = 0; j < 3; j++) x.fillRect(24, -2 + j * 22, 80, 8)
          x.restore()
        }
      }
      label(x, 790, 1140, 'WISH YOU WERE HERE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Schedules the | *second hangout.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      if (slab(x, 800, 870, 320, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.03 })) {
        x.fillStyle = TEAL; x.fillRect(-160, -180, 320, 50); txt(x, 'PLANNER', 0, -154, 30, '#fff4e2', MONO, 700)
        for (let i = 0; i < 5; i++) { x.fillStyle = '#d6cfc0'; x.fillRect(-140, -110 + i * 56, 280, 4) }
        const k = pop01(t, P.t0 + 0.9, 0.3, 2.4)
        if (k > 0.01) { x.save(); x.translate(0, 20); x.scale(k, k); x.fillStyle = INK; x.fillRect(-130, -32, 260, 64); x.fillStyle = PINK; x.fillRect(-124, -26, 248, 52); txt(x, 'HANGOUT #2 ✓', 0, 2, 30, INK, INTER, 800); x.restore() }
        x.restore()
      }
      bubble(x, 520, 640, 'same time | next week?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Opens with | a *weird question.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200, y: 40 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 190 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 43, glyph: false, hops: lt > 1.2 ? [P.t0 + 1.5] : [] })
      bubble(x, 480, 620, "what's your | favourite cloud?", pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 780, 'the fluffy one', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bc' })
      label(x, 540, 1160, 'BEST FRIENDS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at your story. | *Instant bond.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', tears: 3, look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 940, 200 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 44, glyph: false })
      bubble(x, 820, 650, '…and then my | plant bloomed', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bc' })
      label(x, 540, 1150, 'BONDED FOR LIFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 680, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'v3a043', key: 'F', accent: CORAL, ending: 'lesson',
  title: 'How each sign | *makes friends.*',
  cameos: CAMEOS,
  group: { cap: "Everyone's | *somebody's person.*" },
  lesson: { text: 'Your people | *will find you.*', chip: 'FRIENDS: FOUND' },
  last: {
    text: 'Go say hi. | *Aries-style.*',
    draw(x, t, lt) { bubble(x, 540, 840, 'HI!!', pop01(t, t - lt + 0.9, 0.3, 2.4), { size: 70, tail: 'bc' }); sparkles(x, t, 540, 840, t - lt + 1.0, 10, 220, 0.2, [CORAL, GOLD, BONE]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
