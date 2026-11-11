// v3t013: THE SIGNS AS… v3, "Zodiacs saying sorry | be like." (~62 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    "Zodiac apologies | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one apology per sign (3.8 s each), each pushed to the extreme:
//              ♈ yelled "SORRY!", still mad · ♉ apology ETA 3–5 weeks · ♊ said sorry, then said "but"
//              · ♋ apologised first, it was your fault · ♌ an apology tour, sold out · ♍ proofread the sorry note twice
//              · ♎ apologised to both sides, and the chair · ♏ apologised with one long stare · ♐ a joke, made it worse
//              · ♑ a calendar invite: "Sorry, 3 p.m." · ♒ apologised to your birth chart · ♓ came to apologise, got comforted
//  49.2        "Sorry is | *hard, okay?*"
//  52.4        LESSON UNLOCKED: "Say it simply. | *Mean it.*"  FRIENDS: AGAIN
//  58.3        "Pisces is still crying. | *Happily.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068', CREAM = '#fff4e2'

const CHAIR = [
  'BBBBBBB.',
  'B.....B.',
  'B.....B.',
  'BBBBBBBB',
  'B......B',
  'B......B',
]
const CHAIR_C = { B: '#c97a3a' }
const TICKET = [
  'GGGGGGGGGGGGG',
  'GWWWWWWWWWWWG',
  'GWKKKKKKKKKWG',
  '.WWWWWWWWWWW.',
  'GWKKKKK.KKKWG',
  'GWWWWWWWWWWWG',
  'GGGGGGGGGGGGG',
]
const TICKET_C = { G: ORANGE, W: CREAM, K: '#c24a6a' }
const NOTE = [
  'WWWWWWWWWWW',
  'WKKKKKKKKKW',
  'WWWWWWWWWWW',
  'WKKKKKKRRRW',
  'WWWWWWWWWWW',
  'WKKKKKKKKWW',
  'WWWWWWWWWWW',
  'WKKKKWWWWWW',
  'WWWWWWWWWWW',
]
const NOTE_C = { W: CREAM, K: '#9aa5c4', R: RED }
const MUG = ['.S.S.S..', '..S.S...', 'WWWWWWW.', 'WPPPPPWW', 'WPPPPPW.W', 'WPPPPPWW', 'WWWWWWW.']
const MUG_C = { S: '#ffffff', W: CREAM, P: PINK }

function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  const C = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Yelled “SORRY!” | Still *mad about it.*', mood: 'squint', star: { x: -160 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.25, 2.6)
      bubble(x, 770 + 4 * Math.sin(t * 40) * (lt > 0.4 && lt < 1.2 ? 1 : 0), 760, 'SORRY!!!', k, { size: 64, col: '#ffd0d0', tail: 'bl' })
      label(x, 790, 1000, 'VOLUME: 11', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Will apologise. | In *three to five weeks.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SORRY: PROCESSING', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      // a loading bar that barely moves
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -30, 320, 60); x.fillStyle = '#2a2350'; x.fillRect(-150, -20, 300, 40)
        x.fillStyle = MINT; x.fillRect(-150, -20, 300 * (0.02 + 0.03 * clamp(lt / 2.4)), 40); x.restore()
      }
      label(x, 790, 1040, 'ETA: 3–5 WEEKS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Said sorry. | Then *said “but.”*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: lt => [lt > 1.0 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'so sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 880, 'BUT—', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 64, col: GOLD, tail: 'bl' })
      label(x, 790, 1080, 'BUT #7', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Apologised first. | It was *your fault.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I’m SO sorry', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      drawBits(x, MUG, MUG_C, 790, 930, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 1100, 'ALSO: TEA', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 880, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Did an apology tour. | *Sold out.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(360, 490); x.lineTo(420, 490); x.lineTo(560, 1180); x.lineTo(220, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      drawBits(x, TICKET, TICKET_C, 790, 800, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.08 })
      label(x, 790, 980, 'SORRY TOUR', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SOLD OUT', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 36, bg: RED, color: CREAM, rot: 0.06, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.4, 6, 150, 0.2)
    } },
  { sign: 'virgo', cap: 'Wrote a sorry note. | *Proofread it twice.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, NOTE, NOTE_C, 790, 880, 24 * k, { rot: 0.05 })
      const n = lt > 1.0 ? (lt > 1.6 ? 2 : 1) : 0
      label(x, 790, 1100, `DRAFT ${n + 1} OF 3`, pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Apologised to both sides. | *And the chair.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: lt => [lt > 1.4 ? 1 : Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'sorry! | and sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      drawBits(x, CHAIR, CHAIR_C, 800, 1000, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 800, 860, 'sorry, chair', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Apologised with | *one long stare.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const dots = '.'.repeat(1 + Math.min(2, Math.floor(lt * 1.5)))
      bubble(x, 780, 760, dots, pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 64, col: LAV, tail: 'bl' })
      label(x, 790, 980, 'STARE: 00:04:12', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: '#c97bff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, '(it meant sorry)', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Apologised with a joke. | *Made it worse.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: 150 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 320, 700, 'knock knock?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 320, 900, 'LAUGHS: 0', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 320, 1040, 'OOPS', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 40, bg: RED, color: CREAM, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sent an invite: | *“Sorry, 3 p.m.”*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 850); x.scale(k, k); x.rotate(-0.04)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-160, -140, 320, 280)
        x.fillStyle = RED; x.fillRect(-160, -140, 320, 64)
        x.fillStyle = CREAM; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -108)
        x.fillStyle = INK; x.font = `800 36px Inter, Arial, sans-serif`; x.fillText('Apology', 0, -20)
        x.font = `700 28px ${MONO}`; x.fillText('3:00–3:05', 0, 30); x.fillStyle = '#6b62a8'; x.fillText('agenda: 1 item', 0, 80)
        x.restore()
      }
      label(x, 320, 1100, 'ACCEPT?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Apologised | to *your birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 800, 860, 130, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      bubble(x, 790, 640, 'sorry, Mars', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      label(x, 800, 1090, 'CHART: FORGIVES', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Came to apologise. | *You comforted them.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’m so s-s-sorry', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 790, 900, 'hey, it’s okay!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      label(x, 790, 1090, 'TISSUES: 40', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t013', key: 'E', accent: PINK, ending: 'lesson',
  title: 'Zodiac apologies | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Sorry is | *hard, okay?*' },
  lesson: { text: 'Say it simply. | *Mean it.*', chip: 'FRIENDS: AGAIN' },
  last: {
    text: 'Pisces is still crying. | *Happily.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
