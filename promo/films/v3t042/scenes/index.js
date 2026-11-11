// v3t042: THE SIGNS AS… v3, "Bored zodiacs | be like." (~63 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "Bored zodiacs | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one bored sign per card (3.8 s each), each pushed to the extreme:
//              ♈ bored for a minute, ran a marathon · ♉ bored? calls it Sunday · ♊ texted everyone they've met
//              · ♋ baked for the whole street · ♌ a fashion show, audience of none · ♍ labelled the labels
//              · ♎ repainted the room, twice · ♏ guessed the book's ending on page one · ♐ learned a language in an hour
//              · ♑ did next year's taxes · ♒ invented a new colour · ♓ watched the rain, cried for one drop
//  49.2        "Nobody can | *sit still.*"
//  52.4        LESSON UNLOCKED: "Bored is okay. | Let your mind *wander.*"  STATUS: CHILL
//  58.3        "Or just | *call a friend.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ff9a4a', BROWN = '#8a4a2e', TEAL = '#2fc79a'

const MEDAL = [
  'RR...BB',
  '.RR.BB.',
  '..RBB..',
  '..GGG..',
  '.GGGGG.',
  'GGGWGGG',
  'GGGGGGG',
  '.GGGGG.',
  '..GGG..',
]
const MEDAL_C = { R: RED, B: SKYB, G: GOLD, W: '#fff4e2' }
const COOKIE = [
  '.CCCC.',
  'CCKCCC',
  'CCCCKC',
  'CKCCCC',
  'CCCKCC',
  '.CCCC.',
]
const COOKIE_C = { C: '#e8a24a', K: BROWN }
const BRUSH = [
  'PPPP',
  'PPPP',
  'WWWW',
  '.BB.',
  '.BB.',
  '.BB.',
  '.BB.',
  '.BB.',
]
const BOOK = [
  'RRRRRRWRRRRRR',
  'RWWWWWWWWWWWR',
  'RWKKKKWKKKKWR',
  'RWWWWWWWWWWWR',
  'RWKKKWWKKKKWR',
  'RWWWWWWWWWWWR',
  'RWKKKKWKKKWWR',
  'RWWWWWWWWWWWR',
  'RRRRRRWRRRRRR',
]
const BOOK_C = { R: '#c97bff', W: '#fff4e2', K: '#9aa5c4' }
const DROP = ['..S..', '.SSS.', 'SSSSS', 'SSWSS', '.SSS.']
const DROP_C = { S: SKYB, W: '#ffffff' }

const CAMEOS = [
  { sign: 'aries', cap: 'Bored for one minute. | Ran *a marathon.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -180 }, hops: [0.4, 0.7, 1.0, 1.3],
    front(x, t, lt, P) {
      label(x, 800, 680, '0:01 BORED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 830, 'MILE 26', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 48, bg: GOLD, rot: 0.05 })
      drawBits(x, MEDAL, MEDAL_C, 800, 1030, 16 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      sparkles(x, t, 800, 1030, P.t0 + 1.5, 6, 110, 0.4)
    } },
  { sign: 'taurus', cap: 'Bored? | Taurus calls it *Sunday.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: PINK, rot: -0.05 })
      bubble(x, 800, 920, 'perfect.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 800, 1100, 'PLANS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Bored. | Texted *everyone ever.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 212)
      for (let i = 0; i < 5; i++) bubble(x, 760 + (i % 2) * 70, 620 + i * 100, ['hey!!', 'u up?', 'hiii', 'guess what', 'hello?'][i], pop01(t, P.t0 + 0.3 + i * 0.25, 0.25, 2.2), { size: 32, tail: i % 2 ? 'br' : 'bl' })
      label(x, 800, 1140, `SENT: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bored. | Baked *for the street.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.3) / 1.3) * 9) + 1)
      for (let i = 0; i < n; i++) drawBits(x, COOKIE, COOKIE_C, 690 + (i % 3) * 100, 700 + Math.floor(i / 3) * 100, 12)
      label(x, 800, 1080, 'COOKIES: 300', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Bored. | Held *a fashion show.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(320, 470); x.lineTo(540, 470); x.lineTo(560, 1180); x.lineTo(160, 1180); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 13)
      label(x, 800, 720, `LOOK ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1040, 'AUDIENCE: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Bored. | Labelled *the labels.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'LABEL', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 52, bg: BONE, rot: -0.03 })
      label(x, 830, 870, 'this is a label', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.06, font: MONO, weight: 700 })
      label(x, 860, 960, '(label)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bored. | Repainted. *Twice.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) {
      const c = lt < 1.2 ? '#ffb3c8' : '#b3e8ff', p = lt < 1.2 ? prog(lt, 0.3, 1.1) : prog(lt, 1.3, 2.1)
      x.save(); x.globalAlpha = 0.16; x.fillStyle = c; x.fillRect(110, 480, 860 * p, 740); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, BRUSH, { P: lt < 1.2 ? PINK : SKYB, W: '#fff4e2', B: BROWN }, 820, 780, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.4 })
      label(x, 800, 1060, lt < 1.2 ? 'COAT 1: BLUSH' : 'COAT 2: SKY', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: lt < 1.2 ? PINK : SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read one page. | *Solved the book.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'PAGE 1', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1060, 'it was the cat.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Bored for an hour. | Learned *Portuguese.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 800, 690, '1 HOUR LATER', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 900, 'olá! tudo bem?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1090, 'FLUENT (ish)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Bored? | Did *next year’s taxes.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = '#fff4e2'; x.fillRect(-132, -172, 264, 344)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAXES 2027', 0, -132)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-100, -80 + i * 34, 160 + (i % 2) * 30, 10)
        x.restore()
      }
      label(x, 800, 1090, 'FILED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.06 })
    } },
  { sign: 'aquarius', cap: 'Bored. | Invented *a new colour.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        const h = (t * 160) % 360
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -120, 240, 240); x.fillStyle = `hsl(${h},90%,65%)`; x.fillRect(-110, -110, 220, 220)
        x.fillStyle = `hsl(${(h + 120) % 360},90%,65%)`; x.fillRect(-60, -60, 120, 120)
        x.restore()
      }
      label(x, 800, 1060, 'NAME: “GLORP”', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Watched the rain. | Cried for *one drop.*', mood: 'happy', tears: lt => lt > 1.0 ? 3 : 2, look: [1, -1], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) { const ph = ((t * 0.9 + i / 7) % 1); drawBits(x, DROP, DROP_C, 650 + i * 45, 520 + ph * 600, 6, { alpha: 0.6 }) }
      drawBits(x, DROP, DROP_C, 800, 800, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 1020, 'goodbye, little drop', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t042', key: 'D', accent: SKYB, ending: 'lesson',
  title: 'Bored zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody can | *sit still.*' },
  lesson: { text: 'Bored is okay. | Let your mind *wander.*', chip: 'STATUS: CHILL' },
  last: {
    text: 'Or just | *call a friend.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
