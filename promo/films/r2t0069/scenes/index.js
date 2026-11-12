// r2t0069: star_talk, BE LIKE, "Zodiacs watching a romcom | be like." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself on romcom night. Ending: lesson.
//   0.0–3.6    "Zodiacs watching | a romcom *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one viewer per sign (3.8 s each):
//              ♈ yelling "just KISS" at minute four · ♉ here for the snacks (three bowls) · ♊ talked the whole time,
//              missed the ending · ♋ pausing every scene to ask if you're okay · ♌ thinks they're the main character
//              (STARRING: LEO) · ♍ fact-checking the airport scene · ♎ rooting for both love interests · ♏ checked
//              both leads' charts, called the ending · ♐ wants to move to the movie's little town (BOOKED)
//              · ♑ working out the rent on that apartment · ♒ rooting for the best friend · ♓ sobbing at the opening scene
//  49.2        "Same movie. | *Twelve reviews.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Everyone loves | *a love story.*"  CREDITS: ROLLING
//  58.3        "Pisces? | *Still crying.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ROSE = '#ff7aa8'

// ── props
const POPCORN = [
  '.WWW.WWW.WW.',
  'WWWWWWWWWWWW',
  'WYWWWWWYWWWW',
  'RRWWRRWWRRWW',
  'RRWWRRWWRRWW',
  '.RWWRRWWRRW.',
  '.RWWRRWWRRW.',
  '..WWRRWWRR..',
]
const POPCORN_C = { W: CREAM, Y: GOLD, R: RED }
const SUITCASE = [
  '....HHHH....',
  '....H..H....',
  'SSSSSSSSSSSS',
  'SSTSSSSSSTSS',
  'SSTSSSSSSTSS',
  'SSTSSSSSSTSS',
  'SSSSSSSSSSSS',
  '.K........K.',
]
const SUITCASE_C = { H: INK, S: '#ff9a4a', T: '#c96a1a', K: INK }
const BUCKET = [
  'GGGGGGGGGGGG',
  'GWWWWWWWWWWG',
  'GWBBBBBBBBWG',
  '.GBBBBBBBBG.',
  '.GBBBBBBBBG.',
  '..GGGGGGGG..',
]

// the screen: a little TV with a scene title on it
function screen(x, t, cx, cy, k, title, { col = '#2a3d6a', heartsOn = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 312, 210)
  x.fillStyle = INK; x.fillRect(-160, -106, 320, 212)
  x.fillStyle = '#e0a56a'; x.fillRect(-152, -98, 304, 196)
  x.fillStyle = col; x.fillRect(-136, -82, 272, 164)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(title).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * 38))
  x.restore()
}
function calc(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -130, 212, 280)
  x.fillStyle = INK; x.fillRect(-110, -140, 220, 280); x.fillStyle = '#6b62a8'; x.fillRect(-102, -132, 204, 264)
  x.fillStyle = '#c8f0c0'; x.fillRect(-86, -116, 172, 60)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  x.fillText(lt > 1.1 ? 'ERROR' : String(Math.floor(lt * 9000)).padStart(4, '0'), 76, -86)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { x.fillStyle = CREAM; x.fillRect(-82 + c * 58, -34 + r * 52, 46, 40) }
  x.restore()
}
function clipboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -150, 240, 300); x.fillStyle = '#c98f2a'; x.fillRect(-114, -144, 228, 288)
  x.fillStyle = CREAM; x.fillRect(-98, -120, 196, 250); x.fillStyle = '#9aa5c4'; x.fillRect(-36, -160, 72, 30)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const L = ['no ticket', 'no ID', 'ran thru', 'security??']
  L.forEach((s, i) => {
    const on = lt > 0.4 + i * 0.25
    if (!on) return
    x.fillStyle = INK; x.fillText(s, -80, -84 + i * 54)
    x.fillStyle = RED; x.fillRect(56, -96 + i * 54, 8, 26); x.fillRect(48, -78 + i * 54, 24, 8)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Yelling “just KISS” | *at minute four.*', mood: 'wide', look: [1, 0], star: { x: -220 }, hops: [0.5, 0.8, 1.1],
    front(x, t, lt, P) {
      screen(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 'they meet | at a café')
      bubble(x, 760, 640, 'JUST KISS!!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 46, col: GOLD, tail: 'bl' })
      label(x, 790, 1120, 'RUNTIME: 0:04', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Here for the movie? | *Here for the snacks.*', mood: lt => lt > 0.8 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POPCORN_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, POPCORN, POPCORN_C, 660, 1060, 11 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.1 })
      drawBits(x, POPCORN, POPCORN_C, 920, 1060, 11 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.1 })
      label(x, 790, 660, 'MOVIE: ON IN THE BACK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Talked the whole time. | *Missed the ending.*', mood: 'sparkle', look: [-1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      screen(x, t, 765, 910, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.3 ? 'THE END' : 'the big | speech')
      bubble(x, 600, 640, 'ok but did u see | the shoes', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt > 1.3 ? 0 : 1), { size: 30, tail: 'bl' })
      bubble(x, 600, 640, 'wait, who | is he??', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 34, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Pausing every scene. | *“Are you okay?”*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      screen(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 'II  PAUSED')
      bubble(x, 760, 650, 'you okay? | need a hug?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      label(x, 790, 1120, 'PAUSE #31', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Thinks they’re | *the main character.*', mood: 'sparkle', look: [1, 0], star: { x: -230 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      screen(x, t, 765, 880, k, '', { col: '#3a2a10' })
      if (k > 0.5) signChar(x, t, 'leo', 765, 905, 170 * k, { mood: 'wink', seed: 22, glyph: false })
      label(x, 800, 1100, 'STARRING: LEO', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 880, P.t0 + 1.0, 8, 190, 0.2)
    } },
  { sign: 'virgo', cap: 'Fact-checking | *the airport scene.*', mood: lt => lt > 1.2 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      clipboard(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 660, 'GATE CLOSED 20 MIN AGO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Rooting for | *both love interests.*', mood: 'heart', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const H = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
      drawBits(x, H, { H: ROSE }, 690, 850, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 + 0.08 * Math.sin(t * 6)))
      drawBits(x, H, { H: SKYB }, 900, 850, 18 * pop01(t, P.t0 + 0.4, 0.3, 2) * (1 + 0.08 * Math.sin(t * 6 + 2)))
      label(x, 690, 990, 'THE BAKER', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 24, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 900, 990, 'THE PILOT', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 24, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 650, 'TEAM: BOTH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Checked both leads’ charts. | *Called the ending.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      screen(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'opening | credits')
      label(x, 790, 650, 'PREDICTION: WEDDING', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TOLD YOU.', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wants to move to | *the movie’s tiny town.*', mood: 'sparkle', look: [1, -1], star: { x: -220 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'a snowy | tiny town')
      drawBits(x, SUITCASE, SUITCASE_C, 800, 1070, 19 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 600, 1160, 'PACKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#ff9a4a', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Working out the rent | *on that apartment.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      calc(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 650, 'ON A FLORIST’S PAY??', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Rooting for | *the best friend.*', mood: 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      screen(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'the best | friend (2 lines)')
      label(x, 790, 1100, 'JUSTICE FOR THE SIDEKICK', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 24, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 640, 'give her | a movie!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Sobbing. | *It’s the opening scene.*', mood: 'wide', tears: 3, star: { x: -220 },
    front(x, t, lt, P) {
      screen(x, t, 760, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 'a dog | waves hello')
      const fill = clamp(lt / 2)
      drawBits(x, BUCKET, { G: '#9aa5c4', W: fill > 0.5 ? SKYB : '#2a2350', B: fill > 0.2 ? SKYB : '#2a2350' }, 790, 1070, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 1170, 'MINUTE 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0069', key: 'D', accent: ROSE, ending: 'lesson',
  title: 'Zodiacs watching | a romcom *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same movie. | *Twelve reviews.*' },
  lesson: { text: 'Everyone loves | *a love story.*', chip: 'CREDITS: ROLLING' },
  last: { text: 'Pisces? | *Still crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
