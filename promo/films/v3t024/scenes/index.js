// v3t024: THE SIGNS AS… v3, "Waiter: “enjoy!” | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Waiter: “enjoy!” | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   each sign's reply when the waiter says "enjoy" (3.8 s each), pushed to the extreme:
//              ♈ "you too!" before he finished · ♉ didn't hear him, already eating · ♊ said "you too", now best friends
//              · ♋ said "you too", replayed it for a week · ♌ "thank you, I know." · ♍ corrected it in writing (napkin)
//              · ♎ couldn't pick a reply, said all of them · ♏ just nodded, already knows his sign
//              · ♐ said "you too", laughed for ten minutes · ♑ replied "noted." like an email
//              · ♒ asked the waiter his rising sign · ♓ said "love you too", cried
//  49.2        "Nobody | *survived it.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Awkward is human. | *Laugh* it off."  CRINGE: FORGIVEN
//  58.3        "The waiter? | Also said *“you too.”*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const PASTA = pad([
  '...YYYYYY....',
  '..YYRYYYRY...',
  '.YYYYYYYYYY..',
  'WWWWWWWWWWWWW',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
])
const PASTA_C = { Y: '#ffd98a', R: RED, W: '#fff4e2' }
const FORK = pad(['K.K.K', 'K.K.K', 'KKKKK', '..K..', '..K..', '..K..', '..K..', '..K..'])

/** a paper napkin with a handwritten correction */
function napkin(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.07); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -112, 280, 240)
  x.fillStyle = INK; x.fillRect(-146, -126, 292, 252); x.fillStyle = '#ffffff'; x.fillRect(-138, -118, 276, 236)
  x.strokeStyle = '#e3dccf'; x.lineWidth = 3; x.strokeRect(-122, -102, 244, 204)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 30px ${INTER}`
  x.fillText('CORRECTION:', 0, -60); x.font = `700 28px ${MONO}`; x.fillText('I meant', 0, -6); x.fillText('“thank you.”', 0, 36)
  x.fillStyle = '#6b62a8'; x.font = `700 22px ${MONO}`; x.fillText('– table 4', 0, 82)
  x.restore()
}
/** a work email card */
function email(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -102, 320, 220)
  x.fillStyle = INK; x.fillRect(-166, -116, 332, 232); x.fillStyle = '#fff4e2'; x.fillRect(-158, -108, 316, 216)
  x.fillStyle = '#6fc3ff'; x.fillRect(-158, -108, 316, 50)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.font = `800 26px ${INTER}`; x.fillText('RE: enjoy', -138, -82)
  x.font = `700 26px ${MONO}`; x.fillText('Noted.', -138, -20); x.fillText('Best regards,', -138, 24); x.fillText('Capricorn', -138, 62)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: '“You too!” | *Before he finished.*', mood: 'sparkle', star: { x: -160 }, hops: [0.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 560, 600, 'enj—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl', col: '#c9c2da' })
      bubble(x, 790, 820, 'YOU TOO!', pop01(t, P.t0 + 0.45, 0.25, 2.4), { size: 60, tail: 'bl' })
      label(x, 790, 1040, 'REPLY TIME: −1s', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t hear him. | *Already eating.*', mood: 'heart', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, PASTA, PASTA_C, 790, 1020, 20 * k)
      drawBits(x, FORK, { K: '#c9c9d8' }, 640, 960 - 20 * Math.abs(Math.sin(t * 6)), 10 * k, { rot: 0.3 })
      bubble(x, 560, 620, 'enjoy!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl', col: '#c9c2da' })
      label(x, 790, 800, 'DO NOT DISTURB', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Said “you too.” | Now they’re *best friends.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const L = ['you too!', 'wait, where | are you from?', 'no WAY', 'brunch sunday?']
      bubble(x, 790, 720, L[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 960, 'NEW BESTIE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.05 })
      hearts(x, t, 790, 900, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 1 })
    } },
  { sign: 'cancer', cap: 'Said “you too.” | Replayed it *for a week.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [0, -1], star: { x: -160 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 46)
      label(x, 790, 760, `REPLAY #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 50, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, 'DAY 7', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.05 })
    } },
  { sign: 'leo', cap: '“Thank you. | *I know.*”', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 560, 610, 'enjoy!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl', col: '#c9c2da' })
      bubble(x, 790, 830, 'I always do.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bl' })
      sparkles(x, t, 790, 830, P.t0 + 1.0, 7, 190, 0.2)
      label(x, 790, 1060, 'MAIN CHARACTER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Said “you too.” | *Sent a correction.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { napkin(x, 770, 860, 1.3 * pop01(t, P.t0 + 0.3, 0.35, 2)) } },
  { sign: 'libra', cap: 'Couldn’t pick a reply. | Said *all of them.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['thanks', 'thanks, you too', 'thanks, you too, | same, enjoy!', 'thanks, you too, | same, enjoy, | bless you?']
      bubble(x, 780, 820, W[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Just nodded. | *Already knows his sign.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 }, squash: lt => (lt > 0.6 && lt < 0.9) ? 0.1 : 0,
    front(x, t, lt, P) {
      label(x, 790, 760, '*nod*', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 48, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'Virgo. | obviously.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Said “you too.” | *Laughed for ten minutes.*', mood: lt => Math.floor(lt * 4) % 2 ? 'squint' : 'happy', star: { x: 150 }, hops: [0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 330, 700, 'HA'.repeat(n).split('').join(''), pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'br' })
      label(x, 320, 960, 'MINUTE 10', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Replied “noted.” | *Like an email.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { email(x, 760, 850, 1.25 * pop01(t, P.t0 + 0.3, 0.35, 2)) } },
  { sign: 'aquarius', cap: 'Asked the waiter | his *rising sign.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'and your | rising?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 940, '✦ CHART: PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Said “love you too.” | *Cried.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'love you too!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 980, 'TABLE FOR 1, PLEASE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t024', key: 'F', accent: GOLD, ending: 'lesson',
  title: 'Waiter: “enjoy!” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *survived it.*' },
  lesson: { text: 'Awkward is human. | *Laugh* it off.', chip: 'CRINGE: FORGIVEN' },
  last: { text: 'The waiter? | Also said *“you too.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
