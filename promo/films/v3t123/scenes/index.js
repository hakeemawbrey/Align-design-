// v3t123: THE SIGNS AS… v3, "“We need to talk.” | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · E)
//   0.0–3.6    hook. The twelve line up, then dive into the pip row.
//   3.6–49.2   every sign hears "we need to talk", pushed to the extreme:
//              ♈ started arguing, topic unknown · ♉ heard it, kept eating · ♊ replied with forty-two questions
//              · ♋ wrote a goodbye letter, just in case · ♌ assumed it's a tribute to them · ♍ showed up with a printed
//              agenda · ♎ agreed before hearing the problem · ♏ already knew, since last Tuesday · ♐ suggested talking on
//              a ten-mile hike · ♑ sent a calendar invite · ♒ replied "define talk" · ♓ cried before the second word
//  49.2        group ending: "It was about | *the dishes.*" (a stack of dishes pops up over the group photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', DARK = '#2a2350', STEEL = '#9aa5c4', BROWN = '#8a4a2e', GREEN = '#5fd068'

const GLOVE = [
  '.RRRR..',
  'RRRRRR.',
  'RRRRRRR',
  'RRRRRRR',
  'RRRRRR.',
  '.WWWW..',
  '.WWWW..',
]
const GLOVE_C = { R: RED, W: BONE }
const NOODLES = [
  '..Y.Y.Y..',
  '.YYYYYYY.',
  'WWWWWWWWW',
  'WBBBBBBBW',
  '.WBBBBBW.',
  '..WWWWW..',
]
const NOODLES_C = { Y: '#ffd23a', W: BONE, B: '#e8865a' }
const LETTER = [
  'WWWWWWWWWWW',
  'WKWWWWWWWKW',
  'WWKWWWWWKWW',
  'WWWKWPWKWWW',
  'WWWWKPKWWWW',
  'WWWWWKWWWWW',
  'WWWWWWWWWWW',
]
const LETTER_C = { W: BONE, K: STEEL, P: PINK }
const CROWN = [
  'G..G..G',
  'GG.G.GG',
  'GGGGGGG',
  'GRGGGRG',
  'GGGGGGG',
]
const CROWN_C = { G: GOLD, R: RED }
const MOUNTAIN = [
  '.......W.......',
  '......WWW......',
  '.....WWMMM.....',
  '....MMMMMMM....',
  '...MMMMMMMMM...',
  '..MMMMMMMMMMM..',
  '.MMMMMMMMMMMMM.',
  'MMMMMMMMMMMMMMM',
]
const MOUNTAIN_C = { W: BONE, M: '#7a6fb0' }
const PLATE = [
  '.WWWWWWWWW.',
  'WWWWWWWWWWW',
  '.WWWWWWWWW.',
]

// a printed agenda
function agenda(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = BONE; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGENDA', 0, -136)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  const rows = ['1. FEELINGS', '2. MORE FEELINGS', '3. Q & A', '4. SNACKS']
  const n = Math.floor(clamp((lt - 0.4) / 1.0) * rows.length + 0.001)
  for (let i = 0; i < Math.min(n + 1, rows.length); i++) x.fillText(rows[i], -112, -80 + i * 54)
  x.restore()
}
// a calendar invite card
function invite(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 260)
  x.fillStyle = BONE; x.fillRect(-152, -122, 304, 244)
  x.fillStyle = '#2fc79a'; x.fillRect(-152, -122, 304, 60)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -92)
  x.font = `700 28px ${MONO}`; x.fillText('“THE TALK”', 0, -20); x.fillText('3:00–3:15', 0, 30)
  if (lt > 1.2) { x.fillStyle = '#2fc79a'; x.fillRect(-90, 64, 180, 40); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText('ACCEPT?', 0, 85) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Started arguing. | Topic: *unknown.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', star: { x: -150 }, hops: [0.4, 0.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, GLOVE, GLOVE_C, F.x + 150, F.cy + 10 + Math.sin(t * 14) * 6, 16 * k)
      label(x, 790, 700, 'ROUND 1', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: RED, color: BONE, rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'about what?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Heard “we need to talk.” | *Kept eating.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, NOODLES, NOODLES_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'mm-hm. | go on.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Replied with | *forty-two questions.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'wide', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = Math.min(42, 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 41))
      bubble(x, 790, 700, 'why? when? | who? WHY?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 940, `QUESTION ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Wrote a goodbye letter. | *Just in case.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.2 ? 1 : 0, star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, LETTER, LETTER_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 790, 1080, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Assumed it’s | a *tribute* to them.', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 30, 16 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      bubble(x, 790, 760, 'a speech? | for me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, F.x, F.top, P.t0 + 0.7, 6, 140, 0.2)
    } },
  { sign: 'virgo', cap: 'Showed up with | an *agenda.* Printed.', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { agenda(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'libra', cap: 'Agreed before | *hearing the problem.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -160 }, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re right!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 790, 940, 'i haven’t | said it yet', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'scorpio', cap: 'Already knew. | Since *last Tuesday.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'KNEW: TUESDAY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: '#c97bff', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'go on. | surprise me.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Suggested talking | *on a ten-mile hike.*', mood: 'sparkle', star: { x: -160 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { drawBits(x, MOUNTAIN, MOUNTAIN_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'walk and talk!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1110, 'MILES: 10', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sent a | *calendar invite.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { invite(x, 790, 860, pop01(t, P.t0 + 0.25, 0.3, 2), lt) } },
  { sign: 'aquarius', cap: 'Replied: | “define *talk.*”', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'define | “talk.”', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: MINT, tail: 'bl' })
      label(x, 790, 980, 'ALSO: DEFINE “WE”', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Started crying | *before the second word.*', mood: 'wide', tears: lt => lt < 0.5 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, '“we ne—”', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, col: LAV, tail: 'br' })
      label(x, 790, 980, 'SOBBING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t123', key: 'E', accent: '#7dffb0', ending: 'group',
  title: '“We need to talk.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'It was about | *the dishes.*',
    moods: ['wide', 'happy', 'wide', 'heart', 'wink', 'squint', 'happy', 'wink', 'sparkle', 'neutral', 'wide', 'wide'],
    draw(x, t, lt) {
      // the dishes: a wobbly stack pops up behind the bunting, with a label
      for (let i = 0; i < 5; i++) drawBits(x, PLATE, { W: [BONE, SKYB, BONE, PINK, BONE][i] }, 540 + Math.sin(i * 2.1) * 10, 780 - i * 34, 16 * pop01(t, t - lt + 1.4 + i * 0.1, 0.3, 2))
      label(x, 760, 720, 'DISHES', pop01(t, t - lt + 2.0, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.08, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
