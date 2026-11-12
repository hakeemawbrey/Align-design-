// r2a0065: star_advice, ADVICE ROLL CALL, "Each sign’s brave | step this week." (~57 s vertical, signs3kit, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific brave step each, one light visual gag each.
//   0.0–3.6    "Each sign’s brave | *step this week.*"
//   3.6–49.2   ♈ asks for help, just once · ♉ orders something new · ♊ finishes one thing before starting three
//              · ♋ goes to the party, leaves the shell at home · ♌ posts with no filter, still glowing
//              · ♍ sends it with one typo · ♎ disagrees, kindly, still friends · ♏ shares one secret (a small one)
//              · ♐ unpacks the suitcase, stays a while · ♑ logs off at five, on the dot · ♒ says hi first in the
//              group chat · ♓ sends the text (cries a little)
//  49.2        "Small steps. | *Big brave.*"  group photo.
//  52.6        CALLBACK: "Scorpio’s secret? | *They like you back.*"  Scorpio returns, the SECRET #1 card, hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', RED = '#e23d4e'

// ── props
const SHELL = [
  '....SSSSS....',
  '..SSPPPPPSS..',
  '.SPPSSSSSPPS.',
  'SPPSPPPPPSPPS',
  'SPSPPSSSPPSPS',
  'SPSPSPPPSPSPS',
  'SPSPPSSPPSPPS',
  '.SPPPPPPPPPS.',
  '..SSSSSSSSS..',
]
const SHELL_C = { S: '#c98f6a', P: '#ffd9b8' }
const CASE = [
  '....KKKKK....',
  '....K...K....',
  'BBBBBBBBBBBBB',
  'BBYBBBBBBBYBB',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  'BBYBBBBBBBYBB',
  'BBBBBBBBBBBBB',
  '.K.........K.',
]
const CASE_C = { K: INK, B: '#a35cf0', Y: GOLD }

// a small card with lines of text (menus, checklists, notes)
function card(x, cx, cy, k, title, lines, { w = 360, bg = '#fff4e2', rot = -0.04, tcol = INK } = {}) {
  if (k <= 0.01) return
  const h = 100 + lines.length * 54
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = tcol; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 44)
  x.font = `700 36px ${INTER}`; x.textAlign = 'left'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, -h / 2 + 112 + i * 54))
  x.restore()
}
function laptop(x, cx, cy, k, close) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 60, 340, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-162, 64, 324, 20)
  const h = 190 * (1 - close)
  x.fillStyle = INK; x.fillRect(-150, 60 - h - 8, 300, h + 8)
  if (h > 20) { x.fillStyle = '#6fc3ff'; x.fillRect(-140, 60 - h, 280, h - 6) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asks for help. | *Just once.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'could you… | help me?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1000, 'HELP: ACCEPTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Same café. | *Orders something new.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 'MENU', ['the usual', lt > 1.0 ? '✓ the NEW one' : '  the new one', 'the usual (2)'])
      sparkles(x, t, 790, 860, P.t0 + 1.35, 7, 180, 0.4)
    } },
  { sign: 'gemini', cap: 'Finishes one thing. | *Then starts three.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 'TO DO', [lt > 0.9 ? '✓ the one thing' : '  the one thing', '  idea 2', '  idea 3', '  idea 4'], { bg: '#fff6c8' })
      label(x, 790, 1150, 'DONE: 1. PROUD.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'cancer', cap: 'Goes to the party. | *Leaves the shell at home.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SHELL, SHELL_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'BACK BY 11', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Posts with no filter. | *Still glowing.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 760, 'FILTER: NONE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 920, 'GLOW: NATURAL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 400, 860, P.t0 + 1.2, 9, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Sends it | *with one typo.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'see you tmorrow!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 800, 960, 'TYPO: LEFT IN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: RED, color: '#fff4e2', rot: -0.04 })
      label(x, 800, 1090, 'WORLD: FINE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Disagrees. Kindly. | *Still friends.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 840, 990, 180 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 18, glyph: false })
      bubble(x, 760, 680, 'actually, | I think…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 620, 880, P.t0 + 1.4, { n: 5, life: 1.5, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Shares one secret. | *A small one.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 780, 'SECRET #1', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 50, bg: '#e23d66', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 960, '(OF 400)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Unpacks the suitcase. | *Stays a while.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'UNPACKED: 100%', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Logs off at five. | *On the dot.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      laptop(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.2)))
      label(x, 800, 680, '5:00:00', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'GOODBYE, INBOX', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Joins the group chat. | *Says hi first.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'hi everyone!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      bubble(x, 760, 960, 'HIII!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 870, 1080, 'yay hi!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Sends the text. | Cries *a little.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 760, 'SENT ✓', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 52, bg: MINT, rot: -0.04 })
      label(x, 800, 940, 'BRAVE (& DAMP)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0065', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s brave | *step this week.*',
  cameos: CAMEOS,
  group: { cap: 'Small steps. | *Big brave.*' },
  last: {
    text: 'Scorpio’s secret? | *They like you back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'scorpio', 380, 1020, 280 * a, { mood: lt > 1.3 ? 'wink' : 'happy', look: [1, 0], seed: 31, hops: [t0 + 1.3] })
      label(x, 730, 980, 'SECRET #1', pop01(t, t0 + 0.8, 0.35, 2), { size: 50, bg: '#e23d66', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1260, t0 + 1.2, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
