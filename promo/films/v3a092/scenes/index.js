// v3a092: star_advice, ADVICE ROLL CALL, "How each sign | can rest." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm permission to rest each, one light gag each.
//   0.0–3.6    "How each sign | *can rest.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ rest is not losing (NAP: WON) · ♉ you're a pro, teach us (a pillow) · ♊ mute the group chat (MUTED: 1 HR)
//              · ♋ let someone care for you (Libra brings tea) · ♌ no audience today (SHOW: PAUSED)
//              · ♍ the sock can wait (IT'S FINE) · ♎ nap without a vote · ♏ put the heavy box down (FEELINGS)
//              · ♐ the sofa counts as a trip · ♑ your worth isn't the to-do list · ♒ the big ideas will keep
//              · ♓ cry it out, then sleep
//  49.2        "Rest is | *part of the plan.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "You don't have to earn | *a slow day.*"  BATTERY: FULL
//  58.3        "Nap first. | *Everything after.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a'
const TROPHY = ['YYYYYYYYY', 'YwYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '....Y....', '..BBBBB..', '.BBBBBBB.']
const TROPHY_C = { Y: GOLD, w: '#fff4e2', B: '#8a4a2e' }
const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWpWWWWpWWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const PILLOW_C = { W: '#fff4e2', p: PINK }
const BELL = ['....YY....', '...YYYY...', '..YYYYYY..', '..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', '....YY....']
const BELL_C = { Y: GOLD }
const CUP = ['.s.s..', 's.s...', '......', 'CCCCC.', 'CTTTCC', 'CTTTC.C', 'CCCCCC', '.CCC..']
const CUP_C = { C: '#fff4e2', T: '#a8682a', s: 'rgba(239,230,214,0.6)' }
const SOCK = ['.WWW.', '.SSS.', '.SwS.', '.SSS.', '.SwS.', '.SSS.', '.SSSS', 'SSSSS', 'SSSS.']
const SOCK_C = { S: PINK, W: '#fff4e2', w: '#fff4e2' }
const SOFA = ['.RRRRRRRRRR.', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RCCCCCCCCCCR', 'RRRRRRRRRRRR', 'L..........L']
const SOFA_C = { R: '#a35cf0', C: LAV, L: '#5a3a7a' }
const BULB = ['.YYY.', 'YYYYY', 'YYwYY', 'YYYYY', '.YYY.', '.GGG.', '.GGG.']

function box(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -100, 260, 200); x.fillStyle = WOOD; x.fillRect(-122, -92, 244, 184)
  x.fillStyle = '#a8682a'; x.fillRect(-122, -92, 244, 30); x.fillStyle = GOLD; x.fillRect(-16, -92, 32, 184)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 30)
  x.restore()
}
function todo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -200, 280, 400); x.fillStyle = '#fff4e2'; x.fillRect(-132, -192, 264, 384)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const items = ['emails', 'gym', 'taxes', 'REST']
  items.forEach((s, i) => {
    x.fillStyle = INK; x.fillText(s, -70, -130 + i * 80); x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-110, -146 + i * 80, 28, 28)
    if (i < 3 && lt > 1.0) { x.fillStyle = 'rgba(27,18,54,0.75)'; x.fillRect(-75, -133 + i * 80, 150, 6) }
  })
  if (lt > 1.5) { x.fillStyle = '#2fa860'; x.fillRect(-106, 104, 10, 18); x.fillRect(-96, 94, 10, 28) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Rest isn’t | *losing.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 880, 26 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1100, 'NAP: WON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: '#f0603a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You’re a natural. | *Teach us.*', mood: 'sleepy', star: { x: -150, y: 20 },
    back(x, t, lt, P, F) { drawBits(x, PILLOW, PILLOW_C, F.x - 10, F.cy + 120, 28 * pop01(t, P.t0 + 0.1, 0.3, 1.6)) },
    front(x, t, lt, P) {
      label(x, 790, 680, 'PRO NAPPER', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05 })
      label(x, 790, 790, 'CLASS: OPEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Mute the group chat. | *One hour.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shake = lt < 1.2 ? 0.2 * Math.sin(t * 40) : 0
      drawBits(x, BELL, BELL_C, 790, 860, 22 * k, { rot: shake })
      if (lt > 1.2) { x.save(); x.translate(790, 860); x.rotate(-0.8); x.fillStyle = INK; x.fillRect(-150, -12, 300, 24); x.fillStyle = RED; x.fillRect(-144, -6, 288, 12); x.restore() }
      if (lt < 1.2) bubble(x, 800, 660, '87 new | messages', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bc' })
      label(x, 790, 1080, 'MUTED: 1 HR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: '#f2cf4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Let someone | *care for you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, CUP, CUP_C, lerp(760, 700, ease.outCubic(prog(lt, 0.4, 1.0))), 1000, 14 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 820, 660, 'my turn. | sit.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'leo', cap: 'No audience today. | *Still a star.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -150 },
    back(x, t, lt, P) {
      const c = ease.inOutCubic(prog(lt, 0.3, 1.2))
      x.fillStyle = '#b8233a'; x.fillRect(120, 490, 360 * c, 740); x.fillRect(960 - 360 * c, 490, 360 * c, 740)
      x.fillStyle = 'rgba(0,0,0,0.25)'; for (let i = 0; i < 6; i++) { x.fillRect(150 + i * 55 * c, 490, 10, 740); x.fillRect(930 - i * 55 * c, 490, 10, 740) }
    },
    front(x, t, lt, P) { label(x, 540, 640, 'SHOW: PAUSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) } },
  { sign: 'virgo', cap: 'The mess can wait. | *Truly.*', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: lt => lt > 1.6 ? [0, 0] : [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SOCK, SOCK_C, 800, 1070, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 1.2 })
      bubble(x, 780, 700, 'one sock. | on the floor.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 780, 880, 'IT’S FINE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05 })
    } },
  { sign: 'libra', cap: 'Nap without | *asking everyone.*', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'is it okay | if I nap?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 790, 900, 'YES.', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 72, bg: '#e163d6', rot: -0.05 })
      label(x, 790, 1070, 'NO VOTE NEEDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Feel it. | Then *put it down.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const d = ease.inOutCubic(prog(lt, 0.9, 1.5))
      box(x, lerp(F.x, 800, d), lerp(F.top - 70, 1010, d), pop01(t, P.t0 + 0.2, 0.3, 2), 'FEELINGS')
      if (lt > 1.5) sparkles(x, t, 800, 1000, P.t0 + 1.5 * 1.29, 6, 140, 0.4)
      label(x, 800, 700, 'LIGHTER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: '#e23d66', color: BONE, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'The sofa counts | as a *trip.*', mood: 'sleepy', star: { x: -40, y: -10, s: 260 },
    back(x, t, lt, P) { drawBits(x, SOFA, SOFA_C, 540, 990, 40 * pop01(t, P.t0 + 0.1, 0.3, 1.6)) },
    front(x, t, lt, P) { label(x, 540, 640, 'DESTINATION: SOFA', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) } },
  { sign: 'capricorn', cap: 'You’re more than | *your to-do list.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) { todo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'The big ideas | *will keep.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      const dim = lt > 1.2 ? 0.35 : 1
      for (let i = 0; i < 3; i++) drawBits(x, BULB, { Y: dim < 1 ? '#8a7a40' : GOLD, w: '#fff', G: '#8a8a9a' }, 660 + i * 130, 780 + (i % 2) * 80, 20 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      label(x, 790, 1060, 'SAVED FOR LATER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#38c4ec', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | *Then sleep.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', tears: lt => lt > 1.5 ? 1 : 3, star: { x: -150, y: 20 },
    back(x, t, lt, P, F) { drawBits(x, PILLOW, { W: LAV, p: '#fff4e2' }, F.x - 10, F.cy + 120, 28 * pop01(t, P.t0 + 0.1, 0.3, 1.6)) },
    front(x, t, lt, P) {
      label(x, 790, 700, 'GOOD CRY: DONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#7c74f0', color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'NIGHT NIGHT', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a092', key: 'E', accent: MINT, ending: 'lesson',
  title: 'How each sign | *can rest.*',
  cameos: CAMEOS,
  group: { cap: 'Rest is | *part of the plan.*', moods: Array(12).fill('sleepy') },
  lesson: { text: 'You don’t have to earn | *a slow day.*', chip: 'BATTERY: FULL' },
  last: { text: 'Nap first. | *Everything after.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
