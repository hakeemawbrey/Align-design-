// r2a0490: star_advice, ADVICE ROLL CALL, topic "How each sign | shows they're serious." → hook "How signs show | *they're serious.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, one warm, specific line each with one light gag. Ending: card (Virgo + Capricorn).
//   ♈ plans date two before date one ends · ♉ cooks you their best recipe · ♊ puts the phone face down · ♋ saves you the
//   cozy seat · ♌ shares the spotlight · ♍ clears you a drawer · ♎ stops keeping options open (matches: one) · ♏ gives
//   you the wifi password · ♐ books a trip for two · ♑ puts you in the calendar, in pen · ♒ shows you their weird hobby
//   (a rock named Dave) · ♓ writes your name into a song
//   group "Twelve ways | to say "I'm in.""  lesson "Serious looks different | on every sign."  STATUS: ALIGNED
//   last "In pen. | With a drawer." over the match card: Virgo + Capricorn (the drawer and the pen).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
function calendar(x, cx, cy, k, head, big, ink = INK) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -140, 280, 280); x.fillStyle = CREAM; x.fillRect(-132, -132, 264, 264)
  x.fillStyle = RED; x.fillRect(-132, -132, 264, 64)
  x.fillStyle = CREAM; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -100)
  x.fillStyle = ink; x.font = `800 52px ${INTER}`; big.split('|').forEach((s, i, a) => x.fillText(s.trim(), 0, 20 + (i - (a.length - 1) / 2) * 60))
  x.restore()
}
const POT = [
  '..S..S..S..',
  '...S..S....',
  '.KKKKKKKKK.',
  'KKRRRRRRRKK',
  '.RRRRRRRRR.',
  '.RRWRRRRRR.',
  '.RRRRRRRRR.',
  '..RRRRRRR..',
]
const POT_C = { S: '#c3cbe0', K: INK, R: RED, W: '#fff' }
const PHONE_DOWN = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK']
const COUCH = [
  'PP........PP',
  'PPPPPPPPPPPP',
  'PPCCCCCCCCPP',
  'PPCCCCCCCCPP',
  'PPPPPPPPPPPP',
  '.B........B.',
]
const COUCH_C = { P: '#c97bff', C: '#e3c6ff', B: INK }
const DRAWER = [
  'WWWWWWWWWWWW',
  'WDDDDDDDDDDW',
  'WDDDDKKDDDDW',
  'WDDDDDDDDDDW',
  'WWWWWWWWWWWW',
  'WDDDDDDDDDDW',
  'WDDDDKKDDDDW',
  'WDDDDDDDDDDW',
  'WWWWWWWWWWWW',
]
const DRAWER_C = { W: '#8a5a2e', D: '#c98a4e', K: GOLD }
const TICKET = (x, cx, cy, k, rot) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -60, 260, 120); x.fillStyle = GOLD; x.fillRect(-124, -54, 248, 108)
  x.fillStyle = INK; x.fillRect(50, -54, 4, 108)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT ONE', -36, -12); x.fillText('ANYWHERE', -36, 22)
  x.restore()
}
const ROCK = [
  '...GGGG...',
  '.GGGGGGGG.',
  'GGKGGGKGGG',
  'GGGGGGGGGG',
  'GGGPPPGGGG',
  '.GGGGGGGG.',
]
const ROCK_C = { G: SLATE, K: INK, P: PINK }

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries plans date two | *before date one ends.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'TOMORROW', 'DATE 2!')
      L(x, 790, 1090, 'BOOKED: MID-DESSERT', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Taurus cooks for you. | *Their best recipe.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03 * Math.sin(t * 4) })
      L(x, 790, 660, 'GRANDMA’S. SECRET.', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Gemini puts the phone | *face down.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.4, 0.9))
      drawBits(x, PHONE_DOWN, { K: INK, S: f > 0.5 ? '#2a2350' : SKYB }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 - 0.6 * Math.sin(Math.PI * f) })
      L(x, 790, 760, 'PINGS: 48 (IGNORED)', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, -0.04, 30)
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'cancer', cap: 'Cancer saves you | *the cozy seat.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'RESERVED: YOU', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.05, 36)
    } },
  { sign: 'leo', cap: 'Leo shares | *the spotlight.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) * 2)
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(500, 470); x.lineTo(620, 470); x.lineTo(960, 1120); x.lineTo(160, 1120); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 1100, 'SPOTLIGHT: SPLIT 50/50', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 28)
      bubble(x, 790, 700, 'you shine too', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Virgo clears you | *a drawer.*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DRAWER, DRAWER_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'LABELLED: YOURS', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 34)
      sparkles(x, t, 790, 880, P.t0 + 1.1, 8, 180, 0.3)
    } },
  { sign: 'libra', cap: 'Libra stops | *keeping options open.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(1, Math.round(lerp(12, 1, ease.inOutCubic(prog(lt, 0.4, 1.4)))))
      L(x, 790, 800, `MATCHES: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2.4), PINK, -0.04, 44)
      L(x, 790, 980, n === 1 ? 'JUST YOU.' : 'DECIDING…', pop01(t, P.t0 + 0.5, 0.3, 2.4), n === 1 ? GOLD : SLATE, 0.04, 36)
      if (n === 1) hearts(x, t, 380, 760, P.t0 + 1.4 * 1.29, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Scorpio gives you | *the wifi password.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'tell no one.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      L(x, 790, 960, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Sag books | *a trip for two.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      TICKET(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), -0.08)
      TICKET(x, 800, 950, pop01(t, P.t0 + 0.7, 0.3, 2), 0.06)
      L(x, 790, 1130, 'SEATS: TOGETHER', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ff9a4a', -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Capricorn writes you in. | *In pen.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'SATURDAY', lt > 0.8 ? 'YOU. | (in pen)' : '', '#2a2350')
      L(x, 790, 1090, 'NOT PENCIL. PEN.', pop01(t, P.t0 + 1.4, 0.3, 2.4), SLATE, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Aquarius shows you | *their weird hobby.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROCK, ROCK_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'THIS IS DAVE', pop01(t, P.t0 + 0.9, 0.3, 2.4), '#6fc3ff', -0.04, 38)
      L(x, 790, 1090, 'DAVE APPROVES', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Pisces writes | *your name into a song.*', mood: lt => lt > 0.9 ? 'heart' : 'sleepy', tears: lt => lt > 0.9 ? 3 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 1010, { n: 5, cell: 9, col: GOLD, alpha: clamp(lt * 2) })
      bubble(x, 780, 700, '♪ ooh, you… ♪', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0490', key: 'G', accent: ACC, ending: 'card',
  title: 'How signs show | *they’re serious.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'capricorn', chip: 'ALIGNED' },
  group: { cap: 'Twelve ways | to say *“I’m in.”*' },
  lesson: { text: 'Serious looks different | *on every sign.*', chip: 'STATUS: ALIGNED' },
  last: { text: 'In pen. | *With a drawer.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
