// r2a0062: ADVICE SOLO, "Cancer, it’s okay | to say no." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "Cancer, it’s okay | *to say no.*"
//   3.6–37.8   hosting again? skip a turn · said yes to everyone? save one yes (a jar) · favour at 11 pm? morning works
//              · guilty saying no? kind people say no too · snacks for everyone? eat one yourself · mom-friend duty?
//              off duty today (a sash) · always the umbrella? you deserve shelter too · phone buzzing? it can wait
//              · said no, felt awful? they still love you
//  37.8        "Big heart. | *Gentle limits.*"
//  41.0        LESSON: "A kind no | is still *kind.*"  STATUS: RESTED
//  46.9        "And yes, you can | *still bring snacks.*"  a plate of cookies.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'cancer', BLUE = '#3fb6f0', RED = '#e23d4e'

// ── props
const PLATES = ['.WWWWWWWWW.', 'WWWWWWWWWWW', '.LLLLLLLLL.', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.LLLLLLLLL.', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.LLLLLLLLL.']
const PLATES_C = { W: '#fff4e2', L: '#c9b8a0' }
const JAR = [
  '.KKKKKKK.',
  '.KKKKKKK.',
  'GG.....GG',
  'G.......G',
  'G.YYYYY.G',
  'G.YYYYY.G',
  'G.YYYYY.G',
  'G.......G',
  'GGGGGGGGG',
]
const JAR_C = { K: '#8a4a2e', G: '#bfe9ff', Y: GOLD }
const COOKIE = ['..CCCCC..', '.CCDCCCC.', 'CCCCCCDCC', 'CDCCCCCCC', 'CCCCDCCCC', '.CCCCCDC.', '..CCCCC..']
const COOKIE_C = { C: '#e0a85a', D: '#5b2e1a' }
const UMB = [
  '.....RRRRR.....',
  '...RRRRRRRRR...',
  '.RRRWRRRRRWRRR.',
  'RRRRRRRRRRRRRRR',
  'R.R.R.R.R.R.R.R',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K.......',
  '.......K.K.....',
  '........K......',
]
const UMB_C = { R: '#ff8fb1', W: '#ffd0de', K: INK }

function rain(x, t, cx, cy, w, h, alpha = 1) {
  x.save(); x.globalAlpha = 0.7 * alpha; x.fillStyle = SKYB
  for (let i = 0; i < 18; i++) { const ph = (t * 1.4 + i * 0.173) % 1; x.fillRect(cx - w / 2 + ((i * 53) % w), cy - h / 2 + ph * h, 5, 22) }
  x.restore()
}
function phone(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + (lt < 1.3 ? Math.sin(t * 50) * 4 : 0), cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -166, 220, 344)
  x.fillStyle = INK; x.fillRect(-116, -178, 232, 356)
  x.fillStyle = '#2a2350'; x.fillRect(-106, -168, 212, 336)
  x.fillStyle = lt > 1.3 ? '#0c0820' : '#140c30'; x.fillRect(-92, -140, 184, 280)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (lt <= 1.3) { x.fillStyle = BONE; x.font = `800 64px ${INTER}`; x.fillText(String(Math.min(47, 3 + Math.floor(lt * 34))), 0, -20); x.font = `700 22px ${MONO}`; x.fillText('messages', 0, 40) }
  else { x.fillStyle = GOLD; x.beginPath(); x.arc(0, -10, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = '#0c0820'; x.beginPath(); x.arc(18, -24, 40, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// a doily-edged card with a handwritten-ish "no, thank you ♥"
function noteCard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -90, 312, 196)
  x.fillStyle = '#fff4e2'; for (let i = 0; i < 14; i++) { x.beginPath(); x.arc(-140 + i * 21.5, -96, 12, 0, Math.PI * 2); x.arc(-140 + i * 21.5, 96, 12, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.fillRect(-156, -100, 312, 200)
  x.fillStyle = '#fff4e2'; x.fillRect(-150, -94, 300, 188)
  x.fillStyle = BLUE; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('no, thank you', 0, -20)
  x.fillStyle = '#ff4f86'; x.font = `800 52px ${INTER}`; x.fillText('♥', 0, 44)
  x.restore()
}
// a sash across the star, "OFF DUTY"
function sash(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + 80); x.rotate(-0.35); x.scale(k * 0.85, k * 0.85)
  x.fillStyle = INK; x.fillRect(-170, -30, 340, 60); x.fillStyle = MINT; x.fillRect(-164, -24, 328, 48)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OFF DUTY', 0, 2)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Hosting again? | You can *skip a turn.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLATES, PLATES_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1100, 'HOST: NOT TODAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Said yes to everyone? | Save *one yes for you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 660, 'YES (FOR ME)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 900, P.t0 + 1.15, 7, 160, 0.4)
    } },
  { sign: S, cap: 'A favour at 11 p.m.? | *Morning works too.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, '11:47 PM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'tomorrow? | promise!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: S, cap: 'Guilty saying no? | Kind people *say no too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      noteCard(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 560, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Snacks for everyone? | *Eat one yourself.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 5; i++) drawBits(x, COOKIE, COOKIE_C, 700 + (i % 3) * 90, 860 + Math.floor(i / 3) * 100, 14 * k)
      const p = ease.inOutCubic(prog(lt, 0.9, 1.3))
      drawBits(x, COOKIE, COOKIE_C, lerp(790, 470, p), lerp(960, 880, p), 14 * k * (1 + 0.4 * p))
      label(x, 790, 1120, 'ONE FOR THE CHEF', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Mom-friend duty again? | *Take a day off.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -150, s: 320 },
    front(x, t, lt, P, F) {
      sash(x, F, pop01(t, P.t0 + 1.0, 0.35, 2))
      label(x, 790, 760, 'FIRST AID KIT', pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - prog(lt, 0.8, 1.0)), { size: 34, bg: RED, color: '#fff4e2', rot: 0.04 })
      label(x, 790, 900, 'BACK TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04 })
      sparkles(x, t, 400, 880, P.t0 + 1.05, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Always the umbrella? | *You deserve shelter too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [0, -1], star: { x: -100, y: 40, s: 260 },
    back(x, t, lt, P) { rain(x, t, 540, 820, 780, 640, clamp(lt * 2)) },
    front(x, t, lt, P, F) {
      const p = ease.outBack ? ease.outBack(prog(lt, 0.9, 1.3)) : ease.outCubic(prog(lt, 0.9, 1.3))
      drawBits(x, UMB, UMB_C, F.x + 20, lerp(500, F.top - 50, p), 20, { alpha: clamp(lt - 0.8) * 3 })
      label(x, 800, 1110, 'DRY. FINALLY.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Phone buzzing all night? | *It can wait.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, 'GOODNIGHT MODE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Said no, felt awful? | *They still love you.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 950, 210 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 800, 690, 'no worries! | love you!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: '#ffe7a8', tail: 'bc' })
      hearts(x, t, 620, 860, P.t0 + 1.3, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0062', key: 'F', accent: BLUE, solo: S, ending: 'lesson',
  title: 'Cancer, it’s okay | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Gentle limits.*', mood: 'heart' },
  lesson: { text: 'A kind no | is still *kind.*', chip: 'STATUS: RESTED' },
  last: {
    text: 'And yes, you can | *still bring snacks.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.9, 0.35, 2)
      for (let i = 0; i < 3; i++) drawBits(x, COOKIE, COOKIE_C, 400 + i * 140, 1130, 20 * k)
      sparkles(x, t, 540, 1130, t0 + 1.0, 8, 260, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
