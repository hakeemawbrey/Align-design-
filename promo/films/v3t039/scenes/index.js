// v3t039: THE SIGNS AS… v3, "The signs | picking a movie." (~62 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   movie night, one sign per card, each pushed to the extreme:
//              ♈ pressed play before anyone voted · ♉ doesn't care, here for snacks · ♊ pitched forty movies, watched none
//              · ♋ brought blankets for everyone · ♌ picked the one they'd star in · ♍ read every review, movie's over
//              · ♎ picked it for the poster · ♏ guessed the twist in minute one · ♐ a documentary, three hours long
//              · ♑ ranked them by group compatibility · ♒ wants the one nobody's heard of · ♓ cried at the opening logo
//  49.2        group: "Two hours later: | *still choosing.*"
//  52.4        LESSON UNLOCKED: "Any movie works | with *the right people.*"  MOVIE: PICKED
//  58.3        last line: "Aries pressed play. | *Everyone stayed.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2'

const POPCORN = [
  '.WYW.WYW.',
  'WWWWWWWWW',
  'WYWWWYWWW',
  'RWRWRWRWR',
  'RWRWRWRWR',
  '.RWRWRWR.',
  '.RWRWRWR.',
  '..RWRWR..',
]
const POP_C = { W: CREAM, Y: '#ffd23a', R: RED }
const BLANKETS = [
  'PPPPPPPPPPPP',
  'PpPpPpPpPpPp',
  'MMMMMMMMMMMM',
  'MmMmMmMmMmMm',
  'SSSSSSSSSSSS',
  'SsSsSsSsSsSs',
  'LLLLLLLLLLLL',
  'LlLlLlLlLlLl',
]
const BLANK_C = { P: PINK, p: '#ff6f9a', M: MINT, m: '#4fd890', S: SKYB, s: '#5fb8ef', L: LAV, l: '#a888ef' }

// a little screen (TV) with something drawn inside
function screen(x, cx, cy, k, w, h, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * 1.3, k * 1.3)
  x.fillStyle = INK; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24)
  x.fillStyle = '#1e1640'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.fillRect(-30, h / 2 + 12, 60, 30); x.fillRect(-70, h / 2 + 36, 140, 14)
  if (inner) inner(x, w, h)
  x.restore()
}
// a list on a sheet
function list(x, cx, cy, k, head, rows, { w = 300, col = '#2fc79a', size = 30, rot = 0.04 } = {}) {
  if (k <= 0.01) return
  const h = 90 + rows.length * 60
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 ${size + 4}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 42)
  x.textAlign = 'left'; x.font = `700 ${size}px ${MONO}`
  rows.forEach((r, i) => { x.fillStyle = i === 0 ? col : '#5a5a7a'; x.fillText(r, -w / 2 + 26, -h / 2 + 106 + i * 60) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Pressed play | *before anyone voted.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 755, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 180, (x, w, h) => {
        if (lt > 0.6) { x.fillStyle = GOLD; x.beginPath(); x.moveTo(-30, -45); x.lineTo(50, 0); x.lineTo(-30, 45); x.fill() }
      })
      label(x, 800, 625, 'VOTES: 0', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Doesn’t care. | *Here for snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POP_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'BUCKET #2', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Pitched forty movies. | *Watched none.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const N = ['ooh, THIS', 'no wait', 'or THIS', 'hear me out']
      for (let i = 0; i < 4; i++) bubble(x, 700 + (i % 2) * 120, 640 + i * 130, N[i], pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2), { size: 40, col: [CREAM, SKYB, PINK, GOLD, LAV][i], tail: i % 2 ? 'br' : 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought blankets | *for everyone.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BLANKETS, BLANK_C, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, '+ PILLOWS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1060, P.t0 + 1.5, { n: 3, life: 1.0, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Picked the one | *they’d star in.*', mood: 'sparkle', star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      screen(x, 755, 860, k, 280, 220, null)
      if (k > 0.6) signChar(x, t, 'leo', 755, 870, 160 * clamp(k), { mood: 'wink', seed: 31, glyph: false })
      label(x, 790, 620, 'BASICALLY ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Read every review. | *The movie’s over.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      list(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'REVIEWS', ['#1: 4/5', '#2: 3/5', '#3: 5/5', '#4: 2/5'], { col: '#2fc79a', size: 32, w: 280 })
      label(x, 790, 1150, 'THE END', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked it | *for the poster.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-138, -198, 276, 396)
        const g = x.createLinearGradient(0, -190, 0, 190); g.addColorStop(0, PINK); g.addColorStop(1, LAV); x.fillStyle = g; x.fillRect(-130, -190, 260, 380)
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, -40, 70, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SO PRETTY', 0, 120)
        x.restore()
      }
      sparkles(x, t, 790, 880, P.t0 + 0.8, 8, 200, 0.2, [PINK, GOLD, BONE])
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | *in minute one.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      screen(x, 755, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 180, (x) => { x.fillStyle = CREAM; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('0:01', 0, 0) })
      label(x, 790, 625, 'CALLED IT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: LAV, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Picked a documentary. | *Three hours long.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      screen(x, 330, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 180, (x) => { x.fillStyle = CREAM; x.fillRect(-90, 50, 180, 12); x.fillRect(-60, 70, 120, 10) })
      label(x, 330, 630, 'RUNTIME: 3:12', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ranked them by | *group compatibility.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      list(x, 780, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'SHORTLIST', ['1. 94 pts', '2. 91 pts', '3. 88 pts', '4. cut'], { col: '#2fc79a', size: 32, w: 280 })
    } },
  { sign: 'aquarius', cap: 'Wants the one | *nobody’s heard of.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      screen(x, 755, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 180, (x) => { x.fillStyle = SKYB; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('???', 0, 0) })
      label(x, 790, 625, 'VIEWS: 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the opening logo.*', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, 755, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 260, 180, (x) => { x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = '#1e1640'; x.beginPath(); x.arc(14, -8, 40, 0, Math.PI * 2); x.fill() })
      label(x, 800, 625, '0:00:04', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t039', key: 'F', accent: '#c9a6ff', ending: 'lesson',
  title: 'The signs | *picking a movie.*',
  cameos: CAMEOS,
  group: { cap: 'Two hours later: | *still choosing.*' },
  lesson: { text: 'Any movie works | with *the right people.*', chip: 'MOVIE: PICKED' },
  last: {
    text: 'Aries pressed play. | *Everyone stayed.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 0.6, { n: 8, life: 2.0, spread: 500, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
