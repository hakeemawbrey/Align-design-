// v3t047: THE SIGNS AS… v3, SOLO film, "Things only | Scorpios get." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through: nine everyday situations, each pushed to the most extreme (and lovable) Scorpio version.
//   0.0–3.6    "Things only | *Scorpios* get."  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards: "I'm not mad" and the room drops four degrees · remembers what you said in 2019
//              · phone always face down · "how are you?" wants the real answer · all black, feeling festive
//              · board game night: wins every game · small talk? skips to the deep end · one playlist, all intense
//              · kept your secret since second grade
//  37.8        "Deep end. | *Only.*"
//  41.2        callback: "Still *not mad.* | Bring a jacket." (the thermometer is back, dropping)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CRIM = '#ff4d6d'

const PHONE = [
  'KKKKKKKK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KGGGGGGK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', G: '#4a4070' }
const KING = [
  '...Y...',
  '..YYY..',
  '...Y...',
  '.WWWWW.',
  '..WWW..',
  '..WWW..',
  '.WWWWW.',
  'WWWWWWW',
]
const KING_C = { Y: GOLD, W: '#f4f0ff' }
const LOCK = [
  '..GGGG..',
  '.G....G.',
  '.G....G.',
  'YYYYYYYY',
  'YYYKKYYY',
  'YYYKKYYY',
  'YYYYKYYY',
  'YYYYYYYY',
]
const LOCK_C = { G: '#c9c9d8', Y: GOLD, K: INK }

// a thermometer whose red column drops
function thermo(x, cx, cy, k, p, temp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-34, -210, 68, 340); x.beginPath(); x.arc(0, 150, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.fillRect(-24, -200, 48, 330); x.beginPath(); x.arc(0, 150, 52, 0, Math.PI * 2); x.fill()
  x.fillStyle = SKYB; const h = lerp(300, 60, p); x.fillRect(-14, 130 - h, 28, h + 10); x.beginPath(); x.arc(0, 150, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 7; i++) x.fillRect(14, -180 + i * 44, 12, 4)
  x.restore()
  label(x, cx, cy - 280 * k, temp, k, { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: 'scorpio', cap: '“I’m not mad.” | The room *got colder.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.6) / 1.4)
      thermo(x, 800, 880, pop01(t, P.t0 + 0.25, 0.3, 2), p, `${Math.round(lerp(21, 4, p))}°C`)
      bubble(x, 390, 600, 'i’m not mad.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Remembers your words. | *From 2019.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 800, 690, 'MAR 3, 2019', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 900, '“i hate pickles.”', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1090, 'WORD FOR WORD', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: CRIM, color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Their phone? | *Face down. Always.*', mood: 'neutral', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { sy: 0.45 })
      label(x, 800, 720, 'FACE DOWN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1080, '(it’s a cat video)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“How are you?” | Wants *the real answer.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'good, you?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      bubble(x, 800, 880, 'no. really.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1070, 'TIME: 3 HOURS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'All black outfit. | Feeling: *festive.*', mood: 'sparkle', star: { x: -190 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = k; x.fillStyle = BONE; x.fillRect(680 + i * 90, 700, 74, 150); x.fillStyle = '#1a1424'; x.fillRect(686 + i * 90, 706, 62, 138); x.restore() }
      label(x, 800, 650, 'TODAY’S LOOK', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 800, 1020, 'PARTY MODE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Game night? | *Wins every game.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-150, -60, 300, 120); for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) { x.fillStyle = (i + j) % 2 ? '#fff4e2' : '#6b62a8'; x.fillRect(-144 + i * 36, -54 + j * 36, 36, 36) } x.restore() }
      drawBits(x, KING, KING_C, 800, 800, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 660, 'WINS: 47', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'LOSSES: 0', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Small talk? | Skips to *the deep end.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'nice weather!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 800, 900, 'what do you fear?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1090, 'DEPTH: 10,000 m', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'One playlist. | *All intense.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      notes(x, t, 800, 980, { n: 5, cell: 8, col: CRIM, seed: 3, alpha: clamp(lt - 0.3) })
      label(x, 800, 720, 'NOW PLAYING:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 830, 'FEELINGS (8 HRS)', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: CRIM, color: '#fff4e2', rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Your secret? | *Safe since 2nd grade.*', mood: 'happy', star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 1080, 'TOLD: NOBODY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3t047', key: 'D', accent: CRIM, solo: 'scorpio', ending: 'callback',
  title: 'Things only | *Scorpios* get.',
  cameos: CAMEOS,
  group: { cap: 'Deep end. | *Only.*', mood: 'squint' },
  last: {
    text: 'Still *not mad.* | Bring a jacket.',
    draw(x, t, lt) {
      const p = clamp((lt - 0.6) / 1.4)
      thermo(x, 540, 1040, pop01(t, t - lt + 0.4, 0.35, 2), p, `${Math.round(lerp(4, -12, p))}°C`)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
