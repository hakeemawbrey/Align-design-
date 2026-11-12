// r2a0362: star_advice, ADVICE SOLO, "Virgo, before you | send that text." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards), ending: card (lesson + last line over the match card).
//   0.0–3.6    "Virgo, before you | *send that text.*"
//   3.6–37.8   draft nine? the first was fine · they won't grade your punctuation · reread twelve times, it still says hi
//              · no reply yet? probably lunch · a typo happened, nobody's leaving · saying how you feel isn't too much
//              · checked their chart first? cute, now hit send · one smiley won't ruin your reputation · phone down, water up
//  37.8        "Breathe. | *Then hit send.*"
//  41.0        LESSON UNLOCKED: "Kind beats | *perfect.*"  MESSAGE: SENT
//  46.9        "Taurus replied | *in four seconds.*" over the match card: Virgo + Taurus (the chart check, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const LEAF = '#8fe08a', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
function phone(x, cx, cy, k, rot, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  inner(x)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  x.restore()
}
const SMILEY = [
  '..YYYYY..',
  '.YYYYYYY.',
  'YYKYYYKYY',
  'YYYYYYYYY',
  'YKYYYYYKY',
  'YYKKKKKYY',
  '.YYYYYYY.',
  '..YYYYY..',
]
const GLASS = [
  'K........K',
  'KWWWWWWWWK',
  'KBBBBBBBBK',
  'KBBWBBBBBK',
  '.KBBBBBBK.',
  '.KBBBBBBK.',
  '.KBBBBWBK.',
  '..KBBBBK..',
  '..KKKKKK..',
]
const PEN = ['.........RR', '........RRR', '.......RRR.', '......RRR..', '.....RRR...', '....RRR....', '...RRR.....', '..RRR......', '.WWW.......', 'KW.........']

const S = 'virgo'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Draft number nine? | *The first was fine.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(lt * 5))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        txt(x, `DRAFT ${n}`, 0, -150, `700 26px ${MONO}`, LAV)
        x.fillStyle = BONE; x.fillRect(-100, -100, 200, 120)
        txt(x, 'hey! :)', 0, -40, `800 40px ${INTER}`, INK)
      })
      label(x, 790, 1120, 'DRAFT 1 WAS CUTE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'They won’t grade | *your punctuation.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'sounds good,', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 52, col: BONE, tail: 'bl' })
      const pk = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, PEN, { R: RED, W: BONE, K: INK }, 900, 820, 12 * pk)
      label(x, 790, 1040, 'GRADE: A+ ANYWAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, ...M })
    } },
  { sign: S, cap: 'Reread it twelve times. | *Still says hi.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(lt * 6))
      bubble(x, 790, 820, 'hi!', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 120, col: MINT, tail: 'bl' })
      label(x, 790, 1080, `READ: ${n} TIMES`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'No reply yet? | They’re *probably at lunch.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        txt(x, 'delivered', 60, -120, `700 22px ${MONO}`, GREY)
        x.fillStyle = MINT; x.fillRect(-20, -100, 120, 50); txt(x, 'hi!', 40, -75, `800 28px ${INTER}`, INK)
        const dots = Math.floor(t * 3) % 4
        txt(x, '.'.repeat(dots), -50, 20, `800 60px ${INTER}`, BONE)
      })
      label(x, 790, 640, 'THEM: EATING A SANDWICH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'A typo happened. | *Nobody’s leaving.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.25, 2)
      bubble(x, 780, 700, 'see you | tomorow!', k, { size: 50, col: BONE, tail: 'bl' })
      if (k > 0.9 && lt > 0.6) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(780, 732, 130, 40, 0, 0, Math.PI * 2 * Math.min(1, (lt - 0.6) / 0.4)); x.stroke(); x.restore() }
      label(x, 790, 1000, 'FRIENDSHIP: INTACT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, ...M })
      hearts(x, t, 790, 960, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Saying how you feel | *isn’t too much.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i missed | you today', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 56, col: PINK, tail: 'bl' })
      label(x, 790, 1010, 'TOO MUCH: 0%', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, ...M })
      hearts(x, t, 560, 1100, P.t0 + 1.2, { n: 6, life: 2, spread: 240, cell: 7, seed: 7 })
    } },
  { sign: S, cap: 'Checked their chart first? | *Cute. Now send.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        txt(x, 'COMPATIBILITY', 0, -140, `700 24px ${MONO}`, BONE)
        x.font = `700 64px ${SERIF}`
        txt(x, '♍︎', -60, -50, `700 64px ${SERIF}`, LEAF); txt(x, '♥', 0, -50, `700 56px ${SERIF}`, PINK); txt(x, '♉︎', 60, -50, `700 64px ${SERIF}`, '#5fd068')
        const p = ease.outCubic(prog(lt, 0.5, 1.3))
        x.fillStyle = INK; x.fillRect(-88, 30, 176, 34); x.fillStyle = MINT; x.fillRect(-82, 36, 164 * p, 22)
        txt(x, p >= 1 ? 'SWEET MATCH' : 'CHECKING…', 0, 110, `700 24px ${MONO}`, BONE)
      })
      label(x, 790, 1130, 'NOW HIT SEND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'One smiley won’t | *ruin your reputation.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2.4)
      drawBits(x, SMILEY, { Y: '#ffd23a', K: INK }, 790, 860, 30 * k, { rot: Math.sin(t * 3) * 0.06 })
      label(x, 790, 1120, 'REPUTATION: SAFE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, ...M })
      if (k > 0.9) sparkles(x, t, 790, 860, P.t0 + 0.7, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Phone down. | *Water up.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK, W: BONE, B: SKYB }, 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 640, 'YOU DID ENOUGH', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2a0362', key: 'F', accent: LEAF, solo: 'virgo', ending: 'card',
  title: 'Virgo, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'taurus', chip: 'IT’S A MATCH' },
  group: { cap: 'Breathe. | *Then hit send.*', mood: 'sparkle' },
  lesson: { text: 'Kind beats | *perfect.*', chip: 'MESSAGE: SENT' },
  last: { text: 'Taurus replied | *in four seconds.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
