// v3a137: ADVICE SOLO, "What Sagittarians | need in love." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign (solo, 9 cards): what a Sagittarius needs from love, one gag each. Ending: lesson.
//   "pack a bag!" · lots of laughs · blunt honesty (that shirt? no.) · big dreams, taken seriously (goats)
//   · freedom is a green flag · story #200, still listening · a spontaneous date (TODAY: ?!) · a compass, not a cage
//   · a match who says yes too
//   group "Free heart. | *Big love.*"   LESSON "Love them loose. | They *come back closer.*"   last "The goat story? | *Part two tonight.*"
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, calendar, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const S = 'sagittarius', L = { x: -190 }
const FLAG = [['WFFFFFFF', 'WFFFFFFF', 'WFFFFFFF', 'WFFFFFFF', 'W.......', 'W.......', 'W.......', 'W.......', 'W.......'], { W: BONE, F: GREEN }]
function compass(x, t, cx, cy, k, settle) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('N', 0, -92); x.fillText('S', 0, 92); x.fillText('E', 92, 0); x.fillText('W', -92, 0)
  const a = (1 - settle) * Math.sin(t * 9) * 1.6 + settle * 0.6
  x.rotate(a)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 80); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Someone who says | *“pack a bag.”*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'pack a bag! | we leave at 6.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      bits(x, 'suitcase', 790, 930, 22 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1110, 'PACKED IN 4 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughs. | *So many laughs.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', star: L, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) label(x, 700 + i * 100, 700 + i * 40, 'HA', pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.4), { size: 56, bg: [GOLD, PINK, MINT][i], rot: (i - 1) * 0.12, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'stop, I’m | crying!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Honesty. | *Even the blunt kind.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'this shirt?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'br', col: LAV })
      bubble(x, 790, 860, 'no. the blue one.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1060, 'TRUST +10', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big dreams, | *taken seriously.*', mood: 'sparkle', look: [1, -1], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'sail somewhere | learn drums | own goats', { head: 'DREAMS', headBg: ORANGE, size: 38, w: 380 })
      bubble(x, 790, 1060, 'let’s do it.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Needing freedom | is *a green flag.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, FLAG[0], FLAG[1], 800, 840, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.04 * Math.sin(t * 4) })
      label(x, 800, 1080, 'GREEN FLAG ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Someone who | *loves your stories.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and THEN | the goat…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 790, 900, 'STORY #200', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 42, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1070, 'tell it again ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'br', col: LAV })
    } },
  { sign: S, cap: 'Dates that start | *with “why not?”*', mood: 'wide', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      calendar(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'TODAY', lt > 0.9 ? '?!' : '—')
      label(x, 790, 1060, 'BEST DATE EVER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A compass, | *not a cage.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      compass(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.4)))
      label(x, 790, 1060, 'POINTS: HOME ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match who | *says yes too.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 790, 800, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '✦', head: 'NEW MATCH', msg: 'road trip? | YES.', bg: MINT })
      sparkles(x, t, 790, 800, P.t0 + 1.2, 8, 230, 0.2)
    } },
]

const F = makeFilm({
  id: 'v3a137', key: 'E', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'What Sagittarians | *need in love.*',
  cameos: CAMEOS,
  group: { cap: 'Free heart. | *Big love.*', mood: 'sparkle' },
  lesson: { text: 'Love them loose. | They *come back closer.*', chip: 'ADVENTURE: SHARED' },
  last: {
    text: 'The goat story? | *Part two tonight.*',
    draw(x, t, lt) { bubble(x, 540, 1420, 'and THEN…', pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 52, tail: 'bc' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
