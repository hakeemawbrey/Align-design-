// r2t0073: star_talk, BELIKE, "Off-key singing? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme reaction when someone sings off-key.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ sang louder to win · ♉ earmuffs, in July · ♊ harmonised, also off-key · ♋ recorded it for the memories
//              · ♌ waited for their turn · ♍ held up a tuner · ♎ "so pretty!" (wincing) · ♏ one stare, the song stopped
//              · ♐ laughed off the couch · ♑ booked them lessons · ♒ called it a new genre · ♓ still cried, beautiful
//  49.2        "Twelve critics. | *One song.*"
//  52.6        CALLBACK: "Taurus? | *Still in earmuffs.*"  Taurus comes back, earmuffs on.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..', '..KK..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const MUFF = ['...KKKKKKKKK...', '..K.........K..', '.K...........K.', 'PPP.........PPP', 'PPPP.......PPPP', 'PPPP.......PPPP', 'PPPP.......PPPP', 'PPP.........PPP']
const MUFF_C = { K: '#6b62a8', P: PINK }
const SUN = ['..Y.Y.Y..', '.........', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '..YYYYY..', 'Y.YYYYY.Y', '.........', '..Y.Y.Y..']
const COUCH = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LMMMMMMMMMMMML', 'LMMMMMMMMMMMML', 'LLLLLLLLLLLLLL', 'K............K']

// a wobbly sour note: a music note with a squiggle
const sour = (x, t, cx, cy, k) => { if (k > 0.01) label(x, cx, cy, '♪ ?!? ♪', k, { size: 34, bg: LAV, rot: Math.sin(t * 9) * 0.08, font: MONO, weight: 700 }) }
// earmuffs placed on a star frame
const muffs = (x, F, k) => drawBits(x, MUFF, MUFF_C, F.x, F.top + 40 * F.cell / 8.3, F.cell * 1.4 * 2.4 * k)

const CAMEOS = [
  { sign: 'aries', cap: 'Sang louder. | *To win.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy + 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      notes(x, t, 760, 900, { n: 5, cell: 9, col: RED, seed: 1 })
      label(x, 800, 650, 'VOLUME: MAX', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Put on earmuffs. | *In July.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', star: { x: -150 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.4, 0.9))
      if (lt > 0.35) drawBits(x, MUFF, MUFF_C, F.x, lerp(560, F.top + 10, d), 18)
      drawBits(x, SUN, { Y: GOLD }, 830, 650, 14 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: t * 0.5 })
      label(x, 820, 1080, 'JULY 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Harmonised. | *Also off-key.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'laaa~', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 46, col: LAV, tail: 'br' })
      bubble(x, 800, 860, 'LAAA~?', pop01(t, P.t0 + 0.8, 0.25, 2), { size: 50, col: GOLD, tail: 'bl' })
      sour(x, t, 800, 1080, pop01(t, P.t0 + 1.4, 0.3, 2.4))
    } },
  { sign: 'cancer', cap: 'Recorded it. | *For the memories.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 850); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-134, -206, 268, 412); x.fillStyle = '#2a2350'; x.fillRect(-126, -198, 252, 396); x.fillStyle = '#140c30'; x.fillRect(-112, -172, 224, 340)
      if (Math.sin(t * 8) > 0) { x.fillStyle = RED; x.beginPath(); x.arc(-70, -130, 14, 0, Math.PI * 2); x.fill() }
      x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'; x.fillText('REC', -48, -130)
      x.restore()
      notes(x, t, 800, 1000, { n: 3, cell: 7, col: SKYB, seed: 4 })
      label(x, 800, 1110, 'SAVED: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Politely waited | for *their turn.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      label(x, 800, 720, 'UP NEXT: LEO', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'take your time.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1110, '(stretching)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Held up | *a tuner.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 830); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = '#2a2350'; x.fillRect(-142, -112, 284, 224)
      x.fillStyle = '#d8f5c8'; x.fillRect(-120, -90, 240, 130)
      x.fillStyle = INK; for (let i = -4; i <= 4; i++) x.fillRect(i * 26 - 2, -84, 4, i === 0 ? 30 : 16)
      const a = -0.9 + 0.12 * Math.sin(t * 13)
      x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(0, 36); x.lineTo(Math.sin(a) * 110, 36 - Math.cos(a) * 110); x.stroke()
      x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillText('FLAT', 0, 88)
      x.restore()
      label(x, 800, 1090, 'VERY FLAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“So pretty!” | *Wincing.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -180 }, squash: lt => lt > 0.9 ? 0.06 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so pretty!!', pop01(t, P.t0 + 0.3, 0.25, 2), { size: 48, col: PINK, tail: 'bl' })
      sour(x, t, 800, 960, pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 800, 1110, '(it was not)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'One stare. | *Song over.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const stop = lt > 1.0
      if (!stop) notes(x, t, 820, 950, { n: 4, cell: 8, col: LAV, seed: 2 })
      label(x, 800, 720, stop ? '…' : '♪ la la la', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: stop ? BONE : LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'SILENCE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Laughed right | *off the couch.*', mood: 'happy', squash: lt => lt > 1.2 ? 0.2 : 0, star: { x: -160, y: 30 }, hops: [0.5, 0.9],
    back(x, t, lt, P) { drawBits(x, COUCH, { L: '#c97bff', M: '#9a5ad8', K: INK }, 470, 1020, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'HAHAHA', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 52, col: GOLD, tail: 'bl' })
      sour(x, t, 800, 1000, pop01(t, P.t0 + 0.3, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Booked them | *singing lessons.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 840); x.rotate(-0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-166, -116, 332, 232); x.fillStyle = CREAM; x.fillRect(-160, -110, 320, 220)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `700 26px ${MONO}`; x.fillText('GIFT CARD', 0, -70)
      x.font = `800 36px ${INTER}`; x.fillText('10 vocal', 0, -10); x.fillText('lessons', 0, 34)
      x.fillStyle = GOLD; x.fillRect(-160, 76, 320, 34)
      x.restore()
      label(x, 800, 1090, 'PREPAID', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Called it | a *new genre.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      sour(x, t, 800, 700, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 900, 'GENRE: OFF-CORE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s art.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Off-key? | Pisces *still cried.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 800, 1000, { n: 5, cell: 8, col: LAV, seed: 6 })
      bubble(x, 800, 680, 'so beautiful…', pop01(t, P.t0 + 0.6, 0.25, 2), { size: 44, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0073', key: 'G', accent: LAV, ending: 'callback',
  title: 'Off-key singing? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve critics. | *One song.*' },
  last: {
    text: 'Taurus? | *Still in earmuffs.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) {
        const F = signChar(x, t, 'taurus', 540, 1050, 320 * k, { mood: 'happy', seed: 44, hops: [t - lt + 1.3] })
        drawBits(x, MUFF, MUFF_C, F.x, F.top + 12, 19 * k)
      }
      sparkles(x, t, 540, 1000, t - lt + 1.4, 7, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
