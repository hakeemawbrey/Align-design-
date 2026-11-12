// r2t0315: THE SIGNS AS… v3, BELIKE, "Match double texts? | Zodiacs be like." (~63 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself when their match sends a second text. Ending: card.
//   0.0–3.6    "Match double texts? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ replied before the second one landed · ♉ finished the snack, then replied · ♊ sent seven back
//              · ♋ both texts into the memory box · ♌ assumed it was fan mail · ♍ proofread both, sent notes
//              · ♎ asked everyone how to reply · ♏ analysed the gap between them · ♐ replied by postcard
//              · ♑ replied with a meeting invite · ♒ replied with an octopus fact · ♓ two texts, they really care (sobbing)
//  49.2        "Double text? | *Bold. Loved it.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "A double text | is just *extra interest.*"  MATCH: KEPT
//  58.3        "Gemini and Aries? | *Still texting.*" over the match card: Gemini + Aries (seven back, instant reply, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', PAPER = '#fff4e2', HOT = '#ff4f86'

// ── props
const SANDWICH = [
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: RED, Y: '#ffd23a' }
const BOX = [
  '.KKKKKKKKKKKK.',
  'KLLLLLLLLLLLLK',
  'KKKKKKKKKKKKKK',
  'KBBBBBBBBBBBBK',
  'KBBBBHHBBBBBBK',
  'KBBBBHHHBBBBBK',
  'KBBBBBHBBBBBBK',
  'KBBBBBBBBBBBBK',
  'KKKKKKKKKKKKKK',
]
const BOX_C = { K: '#7a5230', L: '#ff8fb1', B: '#c98f5a', H: HOT }
const ENVELOPE = [
  'WWWWWWWWWWWWWW',
  'WKWWWWWWWWWWKW',
  'WWKWWWWWWWWKWW',
  'WWWKWWWWWWKWWW',
  'WWWWKWRRWKWWWW',
  'WWWWWKRRKWWWWW',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
]
const ENVELOPE_C = { W: PAPER, K: '#b9b0a0', R: RED }
const WATCH = [
  '....KKK....',
  '...KKKKK...',
  '..WWWWWWW..',
  '.WWWWKWWWW.',
  'WWWWWKWWWWW',
  'WWWWWKKKWWW',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
  '..WWWWWWW..',
]
const WATCH_C = { K: INK, W: '#d8dbe8' }
const OCTO = [
  '...PPPPP...',
  '..PPPPPPP..',
  '.PPWKPWKPP.',
  '.PPPPPPPPP.',
  '..PPPPPPP..',
  '.P.P.P.P.P.',
  'P..P..P..P.',
  '.P..P.P..P.',
]
const OCTO_C = { P: '#c97bff', W: '#fff', K: INK }

function postcard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.07); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 336, 216)
  x.fillStyle = INK; x.fillRect(-172, -114, 344, 228); x.fillStyle = PAPER; x.fillRect(-164, -106, 328, 212)
  x.fillStyle = '#8fe3ff'; x.fillRect(-150, -92, 140, 184); x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-150, 92); x.lineTo(-90, -10); x.lineTo(-40, 50); x.lineTo(-10, 0); x.lineTo(-10, 92); x.fill()
  x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(-50, -50, 20, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('got both!', 6, -40); x.fillText('wish you', 6, 0); x.fillText('were here', 6, 34)
  x.fillStyle = RED; x.fillRect(110, -94, 40, 46)
  x.restore()
}
function invite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -112, 316, 240)
  x.fillStyle = INK; x.fillRect(-162, -124, 324, 248); x.fillStyle = PAPER; x.fillRect(-154, -116, 308, 232)
  x.fillStyle = '#9aa5c4'; x.fillRect(-154, -116, 308, 52)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MEETING INVITE', 0, -90)
  x.font = `800 30px ${INTER}`; x.fillText('“Us: Q&A”', 0, -24)
  x.font = `700 24px ${MONO}`; x.fillText('TUE · 30 MIN', 0, 22)
  x.fillStyle = '#5fd068'; x.fillRect(-120, 58, 110, 40); x.fillStyle = '#d9cfbd'; x.fillRect(10, 58, 110, 40)
  x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.fillText('ACCEPT', -65, 79); x.fillText('DECLINE', 65, 79)
  x.restore()
}
/** two stacked match bubbles (the double text) at the top of the card */
function twoTexts(x, t, P, { y = 650, a = 'hey!', b = 'also hi', at = 0.2 } = {}) {
  bubble(x, 790, y, a, pop01(t, P.t0 + at, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
  bubble(x, 790, y + 90, b, pop01(t, P.t0 + at + 0.35, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Replied before | *the second one landed.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'hey!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
      bubble(x, 790, 790, 'HI!! YES!! DINNER?', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 36, col: '#ff6b5a', tail: 'bl' })
      bubble(x, 790, 920, 'also hi', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: SKYB, tail: 'br' })
      label(x, 790, 1090, 'REPLIED: INSTANTLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Finished their snack. | *Then replied.*', mood: lt => lt > 1.6 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      twoTexts(x, t, P)
      const eat = prog(lt, 0.7, 1.5)
      drawBits(x, SANDWICH, SANDWICH_C, 790, 950, 18 * pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - 0.6 * eat), { alpha: 1 - prog(lt, 1.4, 1.55) })
      label(x, 790, 1100, lt > 1.6 ? 'NOW: REPLYING' : 'PRIORITIES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Double text? | Gemini *sent seven back.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
      for (let i = 0; i < n; i++) bubble(x, 700 + (i % 2) * 140, 640 + i * 62, ['omg', 'HI', 'wait', 'lol', 'ok so', 'also', 'TACOS?'][i], pop01(t, P.t0 + 0.3 + i * 0.2, 0.2, 2.2), { size: 28, col: '#ffd23a', tail: 'bl' })
      label(x, 790, 1130, `SENT: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Saved both texts | to *the memory box.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.8, 1.4))
      bubble(x, 790, lerp(660, 920, d), 'hey!', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.45)), { size: 34, col: SKYB, tail: 'br' })
      bubble(x, 790, lerp(750, 930, d), 'also hi', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.45)), { size: 34, col: SKYB, tail: 'br' })
      drawBits(x, BOX, BOX_C, 790, 1040, 15 * pop01(t, P.t0 + 0.5, 0.3, 2))
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Two texts? | Assumed it’s *fan mail.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, ENVELOPE, ENVELOPE_C, 760, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      drawBits(x, ENVELOPE, ENVELOPE_C, 840, 860, 18 * pop01(t, P.t0 + 0.45, 0.3, 2), { rot: 0.08 })
      label(x, 790, 680, 'FAN MAIL', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.04 })
      bubble(x, 790, 1100, 'thank you, fans', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Proofread both. | *Sent notes.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      twoTexts(x, t, P, { y: 700, a: 'your so sweet', b: 'see you their' })
      const r = ease.outCubic(prog(lt, 0.8, 1.2))
      if (r > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(712, 700, 52, 30, -0.1, 0, Math.PI * 2 * r); x.stroke(); x.beginPath(); x.ellipse(866, 790, 56, 30, 0.1, 0, Math.PI * 2 * r); x.stroke(); x.restore() }
      label(x, 790, 960, 'NOTES: 2', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'STILL INTO THEM', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Asked everyone | *how to reply.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      twoTexts(x, t, P)
      label(x, 790, 920, 'ASKING: EVERYONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      const n = Math.min(26, Math.floor(clamp((lt - 1.0) / 1.0) * 26))
      label(x, 790, 1060, `OPINIONS: ${n}`, pop01(t, P.t0 + 1.0, 0.3, 2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Analyzed the gap | *between the texts.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      twoTexts(x, t, P)
      drawBits(x, WATCH, WATCH_C, 790, 960, 15 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 790, 1110, 'GAP: 4 MIN. WHY?', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#ff5a7a', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Replied. | *By postcard.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      postcard(x, 780, 860, pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1090, 'ARRIVES: NEXT MONTH', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Replied with | *a meeting invite.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      invite(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1100, 'AGENDA: ATTACHED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Replied with | *an octopus fact.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, OCTO, OCTO_C, 790, 1000, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 3) })
      bubble(x, 790, 720, 'they have | three hearts!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Two texts?! | They *really care.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      twoTexts(x, t, P, { y: 680 })
      label(x, 790, 920, 'TEXTS: 2', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1020, 'TEARS: ALL OF THEM', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04 })
      hearts(x, t, 400, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0315', key: 'F', accent: HOT, ending: 'card',
  title: 'Match double texts? | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aries', chip: 'IT’S A MATCH' },
  group: { cap: 'Double text? | *Bold. Loved it.*' },
  lesson: { text: 'A double text | is just *extra interest.*', chip: 'MATCH: KEPT' },
  last: { text: 'Gemini and Aries? | *Still texting.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
