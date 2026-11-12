// r2a0075: star_advice, ADVICE ROLLCALL, "What to try | this month." (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one small, warm thing each sign could try this month, each with a light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ finish one thing slowly · ♉ one new recipe · ♊ one hobby, all month · ♋ "no," kindly
//              · ♌ cheer for someone else · ♍ leave one dish · ♎ pick dinner first · ♏ share one secret
//              · ♐ stay home one weekend · ♑ a day with no to-do list · ♒ reply in the group chat
//              · ♓ a funny movie, for once
//  49.2        "Twelve small tries. | *One good month.*"
//  52.4        LESSON UNLOCKED: "Small steps count. | *Start with one.*"  MONTH: FRESH
//  58.3        "Virgo? | Still *at the sink.*"  The one dish, back again.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e', GREEN = '#5fd068', ORANGE = '#ffb34a'
const TURTLE = ['....GGGG.....', '...GgGGgG....', '..GGGgGGGG.ss', '..GgGGGgGG.sK', 'ssssssssssss.', '.ss..ss..ss..']
const PAN = ['.YYYYY.......', 'YYYYYYY......', 'YYYWYYY......', 'KKKKKKKKKKKKK', '.KKKKK.......']
const DISH = ['..WWWWWWW..', '.WWWWWWWWW.', 'WWWBBBBBWWW', 'WWWBBBBBWWW', '.WWWWWWWWW.', '..WWWWWWW..']
const POM = ['.P.P.P.', 'PPPPPPP', '.PPPPP.', 'PPPPPPP', '.P.P.P.', '...K...', '...K...']
const SOFA = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LMMMMMMMMMMMML', 'LLLLLLLLLLLLLL', 'K............K']
const YARN = ['..RRRR..', '.RrRRrR.', 'RRRrRRRR', 'RrRRRrRR', 'RRRRrRRR', '.RrRRRR.', '..RRRR..']

function paper(x, cx, cy, w, h, k, draw, { rot = 0.04, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'; draw(x); x.restore()
}
// the sink with one lonely dish in it
function sink(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -20, 340, 150); x.fillStyle = '#c9c9d8'; x.fillRect(-162, -12, 324, 134); x.fillStyle = '#8a8aa0'; x.fillRect(-140, 0, 280, 104)
  x.fillStyle = INK; x.fillRect(-14, -110, 28, 100); x.fillRect(-14, -110, 90, 24); x.fillStyle = '#c9c9d8'; x.fillRect(-8, -104, 16, 92); x.fillRect(-8, -104, 78, 12)
  x.restore()
  drawBits(x, DISH, { W: CREAM, B: '#b7a6ff' }, cx + 10 * k, cy + 60 * k, 14 * k, { rot: 0.2 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Try finishing | *one thing slowly.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, TURTLE, { G: GREEN, g: '#2f9a4a', s: '#9fd8a8', K: INK }, lerp(700, 840, clamp(lt / 2.4)), 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'SPEED: CALM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Try a new recipe. | *Just one.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PAN, { Y: GOLD, W: CREAM, K: INK }, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 790, 680, 'PAGE 2 (NEW!)', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: 'gemini', cap: 'Try one hobby. | *All month.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, YARN, { R: '#ff6b5a', r: '#ffb3a8' }, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'DAY 3 OF 30', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'still here!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Try saying no. | *Kindly.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'can you also—', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 780, 900, 'not this time. ♡', pop01(t, P.t0 + 0.9, 0.25, 2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 1100, 'BOUNDARY: CUTE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Try cheering | *for someone else.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.2, 1.7],
    front(x, t, lt, P, F) {
      drawBits(x, POM, { P: GOLD, K: INK }, F.x + 120, F.cy - 40 + Math.sin(t * 12) * 12, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 920, 200 * k, { mood: 'heart', look: [-1, 0], seed: 16, glyph: false })
      label(x, 820, 660, 'GO VIRGO!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Try leaving | *one dish.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -190 }, squash: lt => lt > 1.0 ? 0.03 * Math.sin(lt * 50) : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sink(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1100, 'BREATHE…', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Try picking dinner. | *First.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const picked = lt > 1.2
      paper(x, 800, 840, 300, 300, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('MENU', 0, -116)
        ;['pasta', 'tacos', 'soup', 'curry'].forEach((s, i) => { const on = picked ? i === 1 : i === Math.floor(t * 5) % 4; if (on) { x.fillStyle = GOLD; x.fillRect(-110, -78 + i * 56, 220, 44) } x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(s, 0, -56 + i * 56) })
      })
      label(x, 800, 1100, 'DECIDED IN 4 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Try sharing | *one secret.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'ok… I love | musicals.', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'TRUST: LEVEL UP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Try staying home. | *One whole weekend.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -180, y: -40 },
    back(x, t, lt, P) { drawBits(x, SOFA, { L: '#c97bff', M: '#9a5ad8', K: INK }, 540, 1020, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 660, 'PASSPORT: RESTING', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 850, 'is this… nice?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Try a day | *with no to-do list.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paper(x, 800, 840, 280, 320, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText('TO DO TODAY:', 0, -120)
        x.font = `800 34px ${INTER}`; x.fillStyle = '#6b62a8'; x.fillText('(nothing)', 0, 0)
      })
      label(x, 800, 1100, 'SUSPICIOUSLY CALM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Try the group chat. | *Reply once.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paper(x, 800, 840, 280, 400, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 372)
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('UNREAD: 312', 0, -150)
        if (lt > 1.0) { x.fillStyle = MINT; x.fillRect(-100, 40, 200, 60); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('lol', 0, 70) }
      }, { bg: '#2a2350' })
      label(x, 800, 1100, 'THE CHAT: SHOOK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Try a funny movie. | *Still cried.*', mood: 'happy', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 700, 'GENRE: COMEDY', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 920, 'happy tears | count!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0075', key: 'G', accent: MINT, ending: 'lesson',
  title: 'What to try | *this month.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve small tries. | *One good month.*' },
  lesson: { text: 'Small steps count. | *Start with one.*', chip: 'MONTH: FRESH' },
  last: {
    text: 'Virgo? | Still *at the sink.*',
    draw(x, t, lt) { sink(x, 540, 700, 0.9 * pop01(t, t - lt + 0.6, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
