// r2t0215: star_talk, ROLLCALL, "The signs at a | movie marathon." (~62 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself at a movie marathon. The look lives in ../../signs3kit.js.
//   0.0–3.6    "The signs at a | *movie marathon.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ skipped straight to movie six · ♉ asleep in the comfiest seat by movie one · ♊ two movies at once
//              · ♋ matching pyjamas for everyone · ♌ did all the voices · ♍ paused to fix the subtitles
//              · ♎ sorted the pillows by colour · ♏ guessed the twist at minute one · ♐ booked a trip to the film's island
//              · ♑ treated it like a deadline · ♒ rooting for the alien · ♓ movie three, still crying
//  49.2        "Nobody saw | the *ending.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Best part of movie night? | The *company.*"  MATCH: MOVIE NIGHT
//  58.3        "Same time | *next week?*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', POP = '#ff6f6f', GREEN = '#5fd068'

// ── props
const REMOTE = [
  'KKKKK',
  'KRKGK',
  'KKKKK',
  'KWKWK',
  'KKKKK',
  'KWKWK',
  'KKKKK',
  'KWKWK',
  'KKKKK',
]
const PILLOW = ['.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP', '.PPPPPP.']
const PJ = [
  'SS.SS.SS',
  'SSSSSSSS',
  'SDSSSSDS',
  '.SSSSSS.',
  '.SDSSDS.',
  '.SSSSSS.',
]
const ALIEN = [
  '.G.....G.',
  '..G...G..',
  '..GGGGG..',
  '.GGGGGGG.',
  'GGKKGKKGG',
  'GGKKGKKGG',
  '.GGGGGGG.',
  '..GG.GG..',
]
const PLANE = [
  '......WW.....',
  '......WWW....',
  'W.....WWWW...',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWS',
  'W.....WWWW...',
  '......WWW....',
]

// a little screen with a caption inside
function screen(x, cx, cy, k, txt, { w = 300, h = 200, col = '#2a5a8a', sub } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20); x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = CREAM; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, sub ? -20 : 0)
  if (sub) { x.fillStyle = 'rgba(6,4,18,0.7)'; x.fillRect(-w / 2 + 14, h / 2 - 58, w - 28, 42); x.fillStyle = CREAM; x.font = `700 24px ${INTER}`; x.fillText(sub, 0, h / 2 - 37) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Skipped straight | *to movie six.*', mood: lt => lt > 1 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P, F) {
      drawBits(x, REMOTE, { K: '#3a3360', R: RED, G: GREEN, W: '#8a8aa0' }, F.x + 140, F.cy + 40, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      screen(x, 790, 760, pop01(t, P.t0 + 0.3, 0.3, 2), lt > 1 ? 'MOVIE 6' : 'MOVIE 1', { w: 260, h: 170 })
      label(x, 790, 1050, '▶▶ x6', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Asleep in the comfiest seat | *by movie one.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', star: { x: -150, y: 20 },
    back(x, t, lt, P, F) {
      drawBits(x, PILLOW, { P: LAV }, F.x, F.cy + 100, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      screen(x, 800, 760, pop01(t, P.t0 + 0.3, 0.3, 2), 'OPENING', { w: 240, h: 160 })
      label(x, 800, 1060, 'MINUTE 3. GONE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#9fe0a8', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Watched two movies | *at the same time.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, -0.5], star: { x: 0, y: 120, s: 240 },
    front(x, t, lt, P) {
      screen(x, 310, 680, pop01(t, P.t0 + 0.2, 0.3, 2), 'SPACE!', { w: 280, h: 180, col: '#3a2a6a' })
      screen(x, 770, 680, pop01(t, P.t0 + 0.35, 0.3, 2), 'ROMANCE!', { w: 280, h: 180, col: '#8a3a5a' })
      label(x, 540, 1150, 'FOLLOWING BOTH. SOMEHOW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made everyone | *matching pyjamas.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, PJ, { S: '#9fd9ff', D: CREAM }, 700 + (i % 2) * 170, 800 + Math.floor(i / 2) * 170, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: Math.sin(i * 2) * 0.08 })
      label(x, 790, 1120, 'SIZES: EVERYONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Did the voices. | *All of the voices.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const L = ['“I am the hero!”', '“…the villain!”', '“…the dog!”']
      L.forEach((l, i) => bubble(x, 760, 640 + i * 150, l, pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 32, col: [BONE, LAV, GOLD][i], tail: 'bl' }))
      label(x, 760, 1120, 'CAST: LEO', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Paused it to fix | *the subtitles.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), '⏸', { w: 320, h: 220, sub: lt > 1.4 ? 'You’re welcome.' : 'Your welcome.' })
      if (lt > 0.8 && lt < 1.4) { x.fillStyle = RED; x.fillRect(690, 872, 90, 6) }
      label(x, 790, 1080, 'GRAMMAR: FIXED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#9fe0a8', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Sorted the pillows | *by colour.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const COLS = [RED, ORANGE, GOLD, GREEN, SKYB, LAV]
      const ORDER = [3, 0, 5, 1, 4, 2]
      const s = ease.inOutCubic(prog(lt, 0.6, 1.4))
      for (let i = 0; i < 6; i++) {
        const from = ORDER.indexOf(i), px = 660 + lerp(from, i, s) % 3 * 130, row = Math.floor(lerp(from, i, s) / 3)
        drawBits(x, PILLOW, { P: COLS[i] }, 660 + (lerp(from, i, s) % 3) * 130, 840 + row * 120 - Math.sin(Math.PI * s) * 30, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      }
      label(x, 790, 1110, 'RAINBOW: ACHIEVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | *at minute one.*', mood: lt => lt > 1 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), '0:01', { w: 260, h: 170, col: '#3a2a5a' })
      bubble(x, 790, 1000, 'it’s the butler.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1130, 'IT WAS THE BUTLER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booked a trip | *to the movie’s island.*', mood: lt => lt > 1 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      screen(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'ISLAND!', { w: 260, h: 160, col: '#2a7a8a' })
      const d = ease.inOutCubic(prog(lt, 0.9, 1.8))
      drawBits(x, PLANE, { W: CREAM, S: SKYB }, lerp(620, 840, d), lerp(980, 900, d), 12 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.15 })
      label(x, 790, 1110, 'FLIGHT: BOOKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Treated the marathon | *like a deadline.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = clamp((lt - 0.3) / 1.6)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -40, 320, 80); x.fillStyle = '#2a2350'; x.fillRect(-152, -32, 304, 64)
        x.fillStyle = GREEN; x.fillRect(-152, -32, 304 * p, 64)
        x.fillStyle = CREAM; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`MOVIES ${Math.round(p * 6)}/6`, 0, 2)
        x.restore()
      }
      label(x, 790, 680, 'ON SCHEDULE', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: '#9fb7c9', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'BREAKS: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Rooting for | *the alien.*', mood: lt => lt > 1 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      screen(x, 790, 800, k, '', { w: 300, h: 220, col: '#1f3a4a' })
      drawBits(x, ALIEN, { G: MINT, K: INK }, 790, 800, 16 * k)
      label(x, 790, 1060, 'TEAM ALIEN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#6fe3ff', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 820, P.t0 + 1.2, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'pisces', cap: 'Movie three? | *Still crying.*', mood: 'squint', tears: 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), 'it’s a comedy', { w: 300, h: 170, col: '#5a3a7a' })
      label(x, 790, 1050, 'TISSUES: 3 BOXES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0215', key: 'F', accent: POP, ending: 'lesson',
  title: 'The signs at a | *movie marathon.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody saw | the *ending.*' },
  lesson: { text: 'Best part of movie night? | The *company.*', chip: 'MATCH: MOVIE NIGHT' },
  last: { text: 'Same time | *next week?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
