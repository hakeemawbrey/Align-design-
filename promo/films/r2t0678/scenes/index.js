// r2t0678: THE SIGNS AS… v3, "“Trust me.” | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// How each sign takes "trust me", pushed to the extreme. Ending: callback.
//   ♈ said yes before the sentence ended · ♉ not with my fries · ♊ yes AND no, both sincere · ♋ trusts you, packed a
//   first-aid kit anyway · ♌ Leo trusts Leo · ♍ asked for three sources · ♎ polled the group chat: a tie
//   · ♏ said "sure", took a screenshot · ♐ took the "shortcut", ended up abroad · ♑ put it in writing
//   · ♒ ignored the forecast, trusted the stars · ♓ trusted you, cried happy tears
//   group "Trust issues? | *Twelve kinds.*"   last "Scorpio still | *has the screenshot.*" (the screenshot, paid off)
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, GREEN, SLATE } from '../props.js'

const L = { x: -170 }, PURPLE = '#c97bff'
const FRIES = [
  '.Y.Y.YY.Y.',
  '.YYY.YYYY.',
  'YYYYYYYYYY',
  'RRRRRRRRRR',
  'RWRRRRRRWR',
  'RRRRRRRRRR',
  '.RRRRRRRR.',
  '.RRRRRRRR.',
]
const FRIES_C = { Y: '#ffd23a', R: RED, W: BONE }
const KIT = [
  '...KKKK...',
  '...K..K...',
  'WWWWWWWWWW',
  'WWWWRRWWWW',
  'WWWWRRWWWW',
  'WWRRRRRRWW',
  'WWRRRRRRWW',
  'WWWWRRWWWW',
  'WWWWRRWWWW',
  'WWWWWWWWWW',
]
const KIT_C = { K: '#9aa5c4', W: BONE, R: RED }
const SIGNPOST = [
  '..WWWWWWWWWW.',
  '..WWWWWWWWWWW',
  '..WWWWWWWWWW.',
  '.....PP......',
  '.....PP......',
  '.....PP......',
  '.....PP......',
  '...GGGGGG....',
]

/** a small screenshot card: a chat bubble "trust me" with a SAVED tick */
function shot(x, cx, cy, k, rot = 0.05) {
  phone(x, cx, cy, k, { top: 'SAVED ✓', head: 'SCREENSHOT', msg: '“trust me”', bg: LAV, rot })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Said yes | *before you finished.*', mood: 'wide', star: L, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'trust m—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'br', col: LAV })
      bubble(x, 790, 900, 'YES.', pop01(t, P.t0 + 0.45, 0.2, 2.6), { size: 96, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 0.55, 8, 180, 0.2)
    } },
  { sign: 'taurus', cap: 'Trust you? | *Not with my fries.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'GUARDED 24/7', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: '#5fd068', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Yes. Also no. | *Both, sincerely.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: L,
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'YES!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 72, tail: 'bl' })
      bubble(x, 830, 940, 'NO!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 72, tail: 'bl', col: LAV })
    } },
  { sign: 'cancer', cap: 'Trusts you fully. | *Packed a first-aid kit.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, KIT, KIT_C, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1090, 'JUST IN CASE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Trust you? | *Leo trusts Leo.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.25 * pop01(t, P.t0 + 0.2, 0.3, 1); x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(300, 480); x.lineTo(460, 480); x.lineTo(560, 1180); x.lineTo(200, 1180); x.fill(); x.restore()
      label(x, 790, 760, 'MY ADVICE:', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, 'ASK ME', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 56, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Asked for sources. | *Three. Cited.*', mood: 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), '1. ________ | 2. ________ | 3. ________', { head: 'SOURCES?', headBg: MINT, size: 38, w: 360, font: MONO, weight: 700 })
      label(x, 790, 1080, 'DUE: TODAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Polled the group chat. | *It’s a tie.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(prog(lt, 0.3, 1.3) * 6))
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), `trust: ${'▮'.repeat(n) || '–'} | don’t: ${'▮'.repeat(n) || '–'}`, { head: 'POLL', headBg: PINK, size: 44, w: 360, font: MONO, weight: 700 })
      label(x, 790, 1060, 'TIE. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Said “sure.” | Took *a screenshot.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      shot(x, 790, 830, 1.1 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (lt > 0.9 && lt < 1.15) { x.save(); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(660, 620, 260, 420); x.restore() }
    } },
  { sign: 'sagittarius', cap: 'Took the “shortcut.” | *Ended up abroad.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SIGNPOST, { W: PAPER, P: WOOD, G: '#5fd068' }, 790, 820, 22 * k)
      if (k > 0.5) { x.save(); x.fillStyle = INK; x.font = `800 ${Math.round(30 * k)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.globalAlpha = Math.min(1, k); x.fillText('SHORTCUT →', 812, 767); x.restore() }
      label(x, 790, 1080, 'PASSPORT: STAMPED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“Trust me”? | *Put it in writing.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'I, the undersigned, | promise it’ll | be fine. | ________', { head: 'AGREEMENT', headBg: '#9aa5c4', size: 32, w: 380 })
      label(x, 790, 1080, 'SIGN HERE ✍', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ignored the forecast. | *Trusted the stars.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'FORECAST: RAIN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: '#9aa5c4', rot: -0.04, font: MONO, weight: 700 })
      bits(x, 'star', 790, 870, 18 * pop01(t, P.t0 + 0.8, 0.35, 2.4))
      sparkles(x, t, 790, 870, P.t0 + 0.9, 7, 140, 0.4)
      label(x, 790, 1080, 'CHART SAYS: SUN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Trusted you. | *Cried happy tears.*', mood: 'heart', look: [1, 0], star: L, tears: 3,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’d never | lie to me ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 790, 950, P.t0 + 0.9, { n: 6, life: 1.8, spread: 200, cell: 8, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0678', key: 'G', accent: PURPLE, ending: 'callback',
  title: '“Trust me.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Trust issues? | *Twelve kinds.*' },
  last: {
    text: 'Scorpio still | *has the screenshot.*',
    draw(x, t, lt) { shot(x, 540, 1060, 1.3 * pop01(t, t - lt + 0.7, 0.35, 2), -0.04); sparkles(x, t, 540, 1060, t - lt + 1.0, 8, 260, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
