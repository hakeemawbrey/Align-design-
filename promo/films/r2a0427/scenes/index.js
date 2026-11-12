// r2a0427: star_advice, ADVICE SOLO, "What Cancers need | to feel heard." (~43 s vertical, signs3kit social cut,
// music: lofi · F). Nine relatable Cancer truths, each with a warm reframe and one light visual gag. Ending: group.
//   0.0–3.6    "What Cancers need | *to feel heard.*"
//   3.6–37.8   ask, then really wait · they remember your stuff, remember theirs (a calendar) · their shell isn't a no,
//              knock softly (a little door) · a long text, reply with heart · small comment, big feelings underneath (an
//              iceberg) · always hosting, host them for once (a pot) · nostalgia is love, look at the photos · mood
//              shifted, blame the moon kindly · a hug says "I heard you"
//  37.8        "Hear them once. | *Family forever.*"  The big Cancer comes back, all hearts (the ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', PAPER = '#fff4e2'

// ── props
const POT = [
  '....W..W..W....',
  '...W..W..W.....',
  '....W..W..W....',
  '.KKKKKKKKKKKKK.',
  'KKRRRRRRRRRRRKK',
  '..RRRRRRRRRRR..',
  '..RRRRRRRRRRR..',
  '..RRRRRRRRRRR..',
  '...RRRRRRRRR...',
]
const POT_C = { W: '#d8dbe8', K: INK, R: '#ff6b5a' }
const MOON = ['..YYY..', '.YYYYY.', 'YYYYYYY', 'YYYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}

const S = 'cancer', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Ask how they are. | *Then really wait.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'how are you, | really?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, tail: 'br' })
      const n = Math.min(9, Math.floor(Math.max(0, lt - 0.7) * 6))
      label(x, 790, 870, `WAITING${'.'.repeat(1 + n % 3)}`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'okay… | so actually…', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'They remember your stuff. | *Remember theirs.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = '#ff6b5a'; x.fillRect(-160, -170, 320, 64)
        x.fillStyle = PAPER; x.font = `800 34px ${INTER}`; x.fillText('MARCH', 0, -138)
        x.fillStyle = '#9aa5c4'; for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) x.fillRect(-140 + c * 58, -80 + r * 58, 40, 40)
        if (lt > 0.8) { x.strokeStyle = PINK; x.lineWidth = 7; x.beginPath(); x.arc(-140 + 2 * 58 + 20, -80 + 2 * 58 + 20, 34, 0, Math.PI * 2); x.stroke() }
      })
      label(x, 790, 1110, 'THEIR BIG INTERVIEW', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 640, 'TEXT THEM ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their shell isn’t a no. | *Knock softly.*', mood: lt => lt > 1.6 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.outCubic(prog(lt, 1.5, 2.0))
      card(x, 800, 900, 220, 340, k, 0, x => {
        x.fillStyle = '#c98f5a'; x.fillRect(-110, -170, 220 * (1 - 0.7 * open), 340)
        x.fillStyle = GOLD; x.fillRect(70 * (1 - open) - 10, 0, 20, 20)
      }, '#2a2350')
      bubble(x, 790, 640, 'knock knock', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (open > 0.5) bubble(x, 830, 820, 'come in.', pop01(t, P.t0 + 1.8 * 1.29, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      label(x, 800, 1130, 'SHELL: OPENING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent a long text? | *Reply with heart.*', mood: lt => lt > 1.6 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 870, 240, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = '#140c30'; x.fillRect(-104, -180, 208, 350)
        x.fillStyle = SKYB; const n = Math.min(9, Math.floor(lt * 5)); for (let r = 0; r < n; r++) x.fillRect(-90, -165 + r * 30, r % 3 === 2 ? 110 : 170, 18)
        if (lt > 1.4) { x.fillStyle = PINK; x.fillRect(-10, 120, 90, 40); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('♥', 35, 141) }
      }, '#2a2350')
      label(x, 790, 640, 'PARAGRAPH 4', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'NOT “k”. A HEART.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Small comment. | *Big feelings underneath.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), d = ease.outCubic(prog(lt, 0.7, 1.4))
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        x.fillStyle = 'rgba(111,195,255,0.35)'; x.fillRect(620, 800, 340, 400)
        x.fillStyle = '#e8f6ff'; x.beginPath(); x.moveTo(740, 800); x.lineTo(790, 730); x.lineTo(840, 800); x.fill()
        x.fillStyle = 'rgba(232,246,255,0.85)'; x.beginPath(); x.moveTo(740, 800); x.lineTo(840, 800); x.lineTo(800 + 160 * d, 800 + 330 * d); x.lineTo(780 - 160 * d, 800 + 330 * d); x.fill()
        x.fillStyle = BONE; x.fillRect(620, 796, 340, 6)
        x.restore()
      }
      label(x, 790, 690, '“it’s fine lol”', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
      label(x, 790, 1050, 'FEELINGS: HUGE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: '#6fc3ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Always hosting? | *Host them for once.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'sit. i cooked.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1130, 'GUEST: CANCER (FINALLY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 470, 820, P.t0 + 1.5, { n: 4, life: 1.5, spread: 120, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Nostalgia is love. | *Look at the photos.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let j = 0; j < 4; j++) card(x, 760 + j * 34, 1000 - j * 60, 230, 170, pop01(t, P.t0 + 0.2 + j * 0.15, 0.25, 2), (j % 2 ? 0.08 : -0.06), x => {
        x.fillStyle = ['#6fc3ff', '#ffb34a', '#7dffb0', '#ff8fb1'][j]; x.fillRect(-100, -70, 200, 120)
        x.fillStyle = PAPER; x.beginPath(); x.arc(-30, -10, 22, 0, Math.PI * 2); x.arc(30, -10, 22, 0, Math.PI * 2); x.fill()
      })
      label(x, 790, 640, 'ALBUM 14 OF 30', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 610, 1130, 'aww, 2014!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Mood shifted? | *Blame the moon, kindly.*', mood: lt => ['happy', 'sleepy', 'wide', 'heart'][Math.min(3, Math.floor(lt / 0.55))], look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let j = 0; j < 4; j++) {
        const k = pop01(t, P.t0 + 0.2 + j * 0.3, 0.25, 2), cx = 650 + j * 90
        drawBits(x, MOON, { Y: GOLD }, cx, 860, 12 * k)
        if (k > 0.5) { x.save(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(cx + (j - 1.5) * 26, 860, 44, 0, Math.PI * 2); x.fill(); x.restore() }
      }
      label(x, 790, 700, 'MOON: DRAMATIC', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'YOU: STILL LOVED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A hug says | *“I heard you.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -110 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), c = ease.inOutCubic(prog(lt, 0.4, 0.9))
      if (k > 0.01) signChar(x, t, 'taurus', lerp(860, 690, c), 920, 240 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      label(x, 600, 650, 'MESSAGE: RECEIVED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 8, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0427', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'What Cancers need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Hear them once. | *Family forever.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
