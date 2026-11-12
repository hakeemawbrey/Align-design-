// r2a0059: star_advice, ADVICE ROLLCALL, "How each sign | handles jealousy." (~57 s vertical, signs3kit, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific, relatable line per sign + a light visual gag.
//   0.0–3.6    "How each sign | handles *jealousy.*"
//   3.6–49.2   Aries races it (NOT A RACE) · Taurus holds on tighter (GRIP: GENTLE) · Gemini jokes it away (haha… okay, ouch)
//              · Cancer goes quiet (hug?) · Leo wants the spotlight back (never lost it) · Virgo makes a comparison list
//              (crossed out) · Libra says "i'm fine!" · Scorpio feels it deeply (SOFT MODE) · Sagittarius books a trip (talk
//              first) · Capricorn works harder (OVERTIME: CANCELLED) · Aquarius acts unbothered · Pisces cries a little
//  49.2        "A little green? | *Still lovable.*"
//  52.6        CALLBACK: "Libra? | *Finally said it.*"  Libra's "i'm fine!" becomes "ok. i was jealous. hug?"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ee08a', RED = '#e23d4e', BROWN = '#8a4a2e'

const PASS = ['WWWWWWWWWWWWW', 'WBBBBBBBBBBBW', 'WWWWWWWWWWWWW', 'WKKK.KKKK.KKW', 'WWWWWWWWWWWWW', 'WKK.KKKKK.KKW', 'WWWWWWWWWWWWW']
function strike(x, cx, cy, w, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 6); x.lineTo(cx - w / 2 + w * k, cy - 6); x.stroke(); x.restore()
}
function list(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = BONE; x.fillRect(-142, -122, 284, 244)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('THEM vs ME', 0, -78)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  ;['taller?', 'funnier?', 'better hair?'].forEach((l, i) => x.fillText(l, -118, -24 + i * 48))
  x.restore()
  strike(x, cx, cy - 30, 250 * k, ease.outCubic(prog(lt, 1.0, 1.3)))
  strike(x, cx, cy + 18, 250 * k, ease.outCubic(prog(lt, 1.2, 1.5)))
  strike(x, cx, cy + 66, 250 * k, ease.outCubic(prog(lt, 1.4, 1.7)))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wants to race it. | *You’re already enough.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      label(x, 790, 760, 'FINISH LINE?', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'NOT A RACE', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 42, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Holds on tighter. | *Love isn’t a grip.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'GRIP: TIGHT', pop01(t, P.t0 + 0.2, 0.3, 2) * (lt < 1.2 ? 1 : 0), { size: 40, bg: RED, color: BONE, font: MONO, weight: 700 })
      label(x, 790, 760, 'GRIP: GENTLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GREEN, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.3, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Jokes it away. | *Say the real thing.*', mood: lt => lt > 1.3 ? 'neutral' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 730, 'haha totally fine', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 790, 930, 'okay. ouch.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Goes quiet. | *Ask for the hug.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 800, '…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 70, col: SKYB, tail: 'bl' })
      bubble(x, 790, 800, 'hug?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 60, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Wants the spotlight back. | *You never lost it.*', mood: 'sparkle', star: { x: 0 },
    back(x, t, lt, P) {
      const a = 0.26 * ease.outCubic(prog(lt, 0.4, 1.0))
      x.fillStyle = `rgba(255,241,200,${a.toFixed(3)})`; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1180); x.lineTo(320, 1180); x.fill()
    },
    front(x, t, lt, P) {
      label(x, 790, 620, 'STILL ON YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 860, P.t0 + 1.0, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Makes a comparison list. | *You’re not a list.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { list(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Says "I’m fine!" | *Feelings are allowed.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, "i'm fine!", pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 960, 'NARRATOR: NOT FINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Feels it deeply. | *Say it softly.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'INTENSITY: MAX', pop01(t, P.t0 + 0.2, 0.3, 2) * (lt < 1.2 ? 1 : 0), { size: 34, bg: RED, color: BONE, font: MONO, weight: 700 })
      label(x, 790, 760, '♡ SOFT MODE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Books a trip. | *Talk first. Then fly.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      drawBits(x, PASS, { W: BONE, B: LAV, K: '#6b62a8' }, 320, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 320, 1000, 'ON HOLD: 1 CHAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Works harder. | *Rest isn’t losing.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      label(x, 320, 780, 'OVERTIME', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 42, bg: BONE, font: MONO, weight: 700 })
      strike(x, 320, 780, 240, ease.outCubic(prog(lt, 1.0, 1.3)))
      label(x, 320, 940, 'NAP: BOOKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Acts unbothered. | *Bothered is human.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'UNBOTHERED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: SKYB, font: MONO, weight: 700 })
      label(x, 800, 880, '(bothered)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries a little. | *Tears are honest.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 780, 'FEELING IT ALL', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: LAV, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 1.0, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0059', key: 'E', accent: GREEN, ending: 'callback',
  title: 'How each sign | handles *jealousy.*',
  cameos: CAMEOS,
  group: { cap: 'A little green? | *Still lovable.*' },
  last: {
    text: 'Libra? | *Finally said it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 360, 1100, 250 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.7] })
      bubble(x, 720, 930, 'ok. i was | jealous. hug?', pop01(t, t - lt + 0.9, 0.3, 2.2), { size: 46, col: PINK, tail: 'bl' })
      hearts(x, t, 540, 1150, t - lt + 1.7, { n: 6, life: 1.8, spread: 400, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
