// r2t0145: THE SIGNS AS… v3, SOLO film, "Your Libra | sibling be like." (~46 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine sibling moments, each the most extreme (and lovable) Libra version. Ending: callback.
//   0.0–3.6    "Your Libra | *sibling* be like."
//   3.6–37.8   nine cards (3.8 s each):
//              picking a movie, two hours later · you two argued, Libra hosted a peace summit · borrowed your sweater, it
//              looks better on them · "who broke the vase?" "define broke." · getting ready for the shop: ninety minutes
//              · dinner order: half of everything · rated your outfit, gently · checked your match's compatibility first
//              · couldn't pick your gift, got you both
//  37.8        "Indecisive. | *Iconic.*"  Libra comes back, big.
//  41.2        CALLBACK: "Update: still | *picking the movie.*"  the TV is back: DAY 3.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LIB = '#ff8fd0', RED = '#e23d4e'
const S = 'libra'

// ── props
// a TV with a row of film tiles scrolling
function tv(x, t, cx, cy, k, lt, { scroll = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -120, 372, 260)
  x.fillStyle = INK; x.fillRect(-190, -130, 380, 260); x.fillStyle = '#3d3470'; x.fillRect(-180, -120, 360, 240)
  x.fillStyle = '#140c30'; x.fillRect(-166, -106, 332, 212)
  x.save(); x.beginPath(); x.rect(-166, -106, 332, 212); x.clip()
  const off = scroll ? (t * 260) % 120 : 0, COLS = [PINK, MINT, SKYB, GOLD, LAV, '#ff6b5a']
  for (let i = -1; i < 5; i++) { x.fillStyle = COLS[(i + 6 + Math.floor(t * 260 / 120)) % 6]; x.fillRect(-160 + i * 120 - off, -60, 96, 130) }
  x.restore()
  x.fillStyle = INK; x.fillRect(-60, 130, 120, 16); x.fillRect(-14, 130, 28, 40)
  x.restore()
}
const GAVEL = ['.KKKK.......', 'KTTTTK......', 'KTTTTKKKKKKK', 'KTTTTKWWWWWW', 'KTTTTKKKKKKK', '.KKKK.......']
const SWEATER = [
  '..SS.SS..',
  '.SSSSSSS.',
  'SSSSSSSSS',
  'SSHSSSHSS',
  'SS.SSS.SS',
  'SS.SSS.SS',
  '...SSS...',
  '...SSS...',
]
const VASE = ['..BBB..', '..B.B..', '.BBBBB.', 'BBBBBBB', 'BBWBBBB', 'BBBBBBB', '.BBBBB.', '..BBB..']
const GIFT = ['RR.R.RR', '.RRRRR.', 'GGGRGGG', 'GGGRGGG', 'RRRRRRR', 'GGGRGGG', 'GGGRGGG', 'GGGRGGG']
function plate(x, cx, cy, k, food) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 40, 0, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 0, 100, 32, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(-30, -4, 50, 20, 0, Math.PI * 0.5, Math.PI * 1.5); x.fill()
  x.fillStyle = food; x.beginPath(); x.ellipse(-30, -4, 44, 15, 0, Math.PI * 0.5, Math.PI * 1.5); x.fill()
  x.restore()
}
function score(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, -80, 236, 176)
  x.fillStyle = INK; x.fillRect(-122, -92, 244, 184); x.fillStyle = BONE; x.fillRect(-114, -84, 228, 168)
  x.fillStyle = INK; x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -10)
  x.font = `700 22px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('(LOVINGLY)', 0, 56)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Picking a movie? | *Two hours later…*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tv(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1090, `SCROLLING: ${lt > 1.2 ? '2 HRS' : '5 MIN'}`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You two argued. | Libra *hosted a summit.*', mood: 'happy', look: [1, 0], star: { x: 0, y: -60, s: 260 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'aries', 250, 1050, 170 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [1, 0], seed: 5, glyph: false })
        signChar(x, t, 'scorpio', 830, 1050, 170 * k, { mood: lt > 1.4 ? 'happy' : 'squint', look: [-1, 0], seed: 6, glyph: false })
      }
    },
    front(x, t, lt, P) {
      drawBits(x, GAVEL, { K: INK, T: '#c98f2a', W: '#e8b56a' }, 700, 1100, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: lt > 1.2 ? 0.4 : -0.2 })
      label(x, 540, 620, 'PEACE TALKS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Borrowed your sweater. | It *looks better on them.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: '#7a6fd0', H: PINK }, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 1100, 'KEEPING IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LIB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Who broke the vase?” | *“Define broke.”*', mood: lt => lt > 1.1 ? 'wink' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sp = lt > 0.8 ? 1 : 0
      drawBits(x, VASE, { B: '#6fc3ff', W: '#fff' }, 760 - sp * 30, 900, 24 * k, { rot: -0.2 * sp })
      if (sp) drawBits(x, ['BB.', 'BBB', '.BB'], { B: '#6fc3ff' }, 880, 1010, 18, { rot: 0.5 })
      bubble(x, 790, 650, 'technically…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Getting ready for the shop: | *ninety minutes.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 180, 0, 0, 7); x.fill()
        x.fillStyle = '#c98f2a'; x.beginPath(); x.ellipse(0, 0, 120, 170, 0, 0, 7); x.fill()
        x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 100, 150, 0, 0, 7); x.fill()
        x.restore()
        signChar(x, t, S, 790, 860, 130 * k, { mood: 'wink', seed: 9, glyph: false, glow: 0.4 })
      }
      label(x, 800, 1090, `${Math.min(90, 5 + Math.floor(lt * 40))} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dinner order? | *Half of everything.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      ;['#ffb34a', '#5fd068', '#ff6b5a', '#ffd23a'].forEach((c, i) => plate(x, 690 + (i % 2) * 160, 720 + Math.floor(i / 2) * 200 + (i % 2) * 40, pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2) * 0.75, c))
      label(x, 790, 1140, 'ONE OF EACH (½)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rated your outfit. | *Gently.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      score(x, 790, 860, pop01(t, P.t0 + 0.5, 0.3, 2), lt > 1.3 ? '9/10' : '7/10')
      bubble(x, 790, 1080, 'maybe… a belt?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Checked your match’s | *compatibility first.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -150, 260, 320)
        x.fillStyle = INK; x.fillRect(-136, -164, 272, 328); x.fillStyle = '#2a2350'; x.fillRect(-128, -156, 256, 312)
        x.restore()
        signChar(x, t, 'taurus', 790, 820, 160 * k, { mood: 'happy', seed: 51, glyph: false, glow: 0.8 })
      }
      label(x, 790, 1000, '✦ TAURUS', k, { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'SIBLING: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Couldn’t pick your gift. | *Got you both.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: GOLD, G: PINK }, 710, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.08 })
      drawBits(x, GIFT, { R: BONE, G: '#6fc3ff' }, 880, 920, 20 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.08 })
      sparkles(x, t, 800, 900, P.t0 + 1.3, 8, 200, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2t0145', key: 'F', accent: LIB, solo: S, ending: 'callback',
  title: 'Your Libra | *sibling* be like.',
  cameos: CAMEOS,
  group: { cap: 'Indecisive. | *Iconic.*', mood: 'sparkle' },
  last: {
    text: 'Update: still | *picking the movie.*',
    draw(x, t, lt) {
      const t0 = t - lt
      tv(x, t, 660, 1130, 1.3 * pop01(t, t0 + 0.3, 0.45, 1.8), lt)
      label(x, 660, 1360, 'SCROLLING: DAY 3', pop01(t, t0 + 1.2, 0.3, 2.6), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      const k = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 230, 1230, 200 * k, { mood: lt > 1.6 ? 'wide' : 'happy', look: [1, 0], seed: 44, hops: [t0 + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
