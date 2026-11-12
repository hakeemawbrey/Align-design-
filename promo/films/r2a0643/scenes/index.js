// r2a0643: star_advice, ADVICE SOLO, "Scorpio, the right | people will stay." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Scorpio truth + a warm reframe, one gag each.
// Ending: the group beat.
//   0.0–3.6    "Scorpio, the right | people *will stay.*"  One big Scorpio pops in.
//   3.6–37.8   you test people, let them pass · a short list is a good list · some leave, make room (a HELLO mat)
//              · the ones who stay speak your silence · trust takes time (a slow little sprout) · new match? fewer questions
//              (the spotlight clicks off) · let one person in today (the velvet rope opens) · your intensity? someone loves
//              that · grudges are heavy, put one down
//  37.8        group (the ending): "Fewer people. | *Better people.*"  The big Scorpio comes back, all heart eyes.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff5a86', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e'
const S = 'scorpio'

// ── props
const SPROUT = [
  '...LL.LL...',
  '..LLLLLLL..',
  '...LLSLL...',
  '.....S.....',
  '.....S.....',
  'PPPPPPPPPPP',
  '.PPPPPPPPP.',
  '..PPPPPPP..',
  '..PPPPPPP..',
]
const SPROUT_C = { L: GREEN, S: '#3f9e4a', P: '#c9774a' }
const LAMP = [
  '....KKK....',
  '...KGGGK...',
  '..KGGGGGK..',
  '.KGGGGGGGK.',
  'KKKKKKKKKKK',
  '.....K.....',
  '.....K.....',
  '...KKKKK...',
]
const LAMP_C = { K: INK, G: '#9aa5c4' }
const FLAME = [
  '.....O.....',
  '....OO.....',
  '...OOYO....',
  '..OOYYOO...',
  '.OOYYYYOO..',
  '.OYYWWYYO..',
  'OOYWWWWYOO.',
  'OOYWWWWYOO.',
  '.OOYYYYOO..',
  '..OOOOOO...',
]
const FLAME_C = { O: '#ff6a3a', Y: '#ffb34a', W: '#fff1a8' }

// a marked test paper
function testPaper(x, cx, cy, k, grade) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-126, -160, 262, 330)
  x.fillStyle = INK; x.fillRect(-136, -170, 272, 330); x.fillStyle = '#ffffff'; x.fillRect(-130, -164, 260, 318)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['Q1. loyal?', 'Q2. kind?', 'Q3. stays?'].forEach((q, i) => { x.fillText(q, -110, -110 + i * 52); x.fillStyle = GREEN; x.fillText('✓', 80, -110 + i * 52); x.fillStyle = INK })
  if (grade > 0.01) { x.save(); x.translate(40, 90); x.rotate(-0.15); x.scale(grade, grade); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.stroke(); x.fillStyle = RED; x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.fillText('A+', 0, 4); x.restore() }
  x.restore()
}
// a short list with hearts
function shortList(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -150, 260, 290); x.fillStyle = CREAM; x.fillRect(-124, -144, 248, 278)
  x.fillStyle = '#e23d66'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY PEOPLE', 0, -108)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`
  ;['mom ♡', 'best friend ♡', 'the cat ♡'].forEach((n, i) => x.fillText(n, 0, -40 + i * 56))
  x.restore()
}
// a door frame with a welcome mat in front
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -220, 240, 400); x.fillStyle = '#fff1a8'; x.fillRect(-110, -210, 220, 380)
  x.fillStyle = INK; x.fillRect(-110, -210, 220 * (1 - 0.7 * open), 380); x.fillStyle = BROWN; x.fillRect(-104, -204, 208 * (1 - 0.7 * open), 368)
  x.fillStyle = GOLD; x.fillRect(-104 + 208 * (1 - 0.7 * open) - 26, -20, 12, 12)
  x.fillStyle = INK; x.fillRect(-150, 186, 300, 56); x.fillStyle = '#c98f2a'; x.fillRect(-144, 192, 288, 44)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO', 0, 216)
  x.restore()
}
// a velvet rope between two gold posts; the rope swings open
function rope(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const post = px => { x.fillStyle = INK; x.fillRect(px - 16, -150, 32, 250); x.fillStyle = GOLD; x.fillRect(px - 10, -144, 20, 238); x.fillStyle = INK; x.beginPath(); x.arc(px, -160, 24, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(px, -160, 18, 0, Math.PI * 2); x.fill() }
  post(-150); post(150)
  x.strokeStyle = INK; x.lineWidth = 22; x.lineCap = 'round'
  const a = lerp(0, 1.45, open)
  const draw = () => { x.beginPath(); x.moveTo(-150, -120); const ex = -150 + Math.cos(a) * 300, ey = -120 + Math.sin(a) * 300; x.quadraticCurveTo((-150 + ex) / 2, (-120 + ey) / 2 + 60 * (1 - open), ex, ey); x.stroke() }
  draw(); x.strokeStyle = '#c2185b'; x.lineWidth = 14; draw()
  x.restore()
}
// a heavy crate marked GRUDGES
function crate(x, cx, cy, k, label2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#8a5a3a'; x.fillRect(-142, -102, 284, 204)
  x.fillStyle = '#6a3e24'; for (let i = -1; i <= 1; i++) x.fillRect(-142, i * 62 - 6, 284, 12)
  x.fillStyle = CREAM; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label2, 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You test people. | *Let them pass.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      testPaper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.3, 0.25, 2.8))
    } },
  { sign: S, cap: 'A short list? | *It’s a good list.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      shortList(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'QUALITY > QUANTITY', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Some people leave. | *Make room for new.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      door(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.9, 1.4)))
      if (lt > 1.4) sparkles(x, t, 790, 760, P.t0 + 1.9, 6, 120, 0.4)
    } },
  { sign: S, cap: 'The ones who stay | *get your silence.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 80, col: LAV, tail: 'bl' })
      bubble(x, 830, 920, 'same. ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 60, tail: 'br' })
      label(x, 790, 1120, 'FLUENT IN QUIET', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Trust takes time. | *So take yours.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.3, 2.0))
      drawBits(x, SPROUT, SPROUT_C, 790, 960 - 60 * g, 10 + 12 * g)
      label(x, 790, 650, 'GROWING… SLOWLY', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match? | *Fewer questions.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const off = lt > 1.1
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (!off && k > 0.5) { x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(820, 690); x.lineTo(F.x - 140, F.cy + 140); x.lineTo(F.x + 120, F.cy + 160); x.fill(); x.restore() }
      drawBits(x, LAMP, LAMP_C, 840, 680, 24 * k, { rot: -0.5 })
      label(x, 800, 1080, off ? 'QUESTIONS: JUST 3' : 'QUESTION 1 OF 400', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: off ? MINT : '#e23d66', color: off ? INK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let one person in. | *Just one, today.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      rope(x, 790, 950, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.5)))
      label(x, 790, 640, 'GUEST LIST: +1', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your intensity? | *Someone loves that.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FLAME, FLAME_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 1 + 0.05 * Math.sin(t * 14) })
      label(x, 790, 1110, 'FIRE: WELCOME', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Grudges are heavy. | *Put one down.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.9, 1.3)) : ease.outCubic(prog(lt, 0.9, 1.3))
      crate(x, 790, lerp(760, 1020, d), pop01(t, P.t0 + 0.2, 0.3, 2), 'GRUDGES')
      label(x, 790, 640, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0643', key: 'C', accent: ROSE, solo: S, ending: 'group',
  title: 'Scorpio, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Fewer people. | *Better people.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
