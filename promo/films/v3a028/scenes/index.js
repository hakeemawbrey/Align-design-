// v3a028: star_advice, ADVICE SOLO, "Dear Sagittarius: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): gentle permission slips for a Sagittarius, one gag each.
//   0.0–3.6    "Dear Sagittarius: | *it's okay.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              staying home is an adventure too (DESTINATION: SOFA) · changing plans is okay (a ticket: RESCHEDULED)
//              · not every joke has to land (crickets) · you can miss people and still go (a suitcase, a waving friend)
//              · slow down, scenic route (a snail ride) · big dreams, small steps (footprints: STEP 1 DONE)
//              · honest is good, gentle is better ("kindly: no.") · a string doesn't stop a kite (STILL FLYING)
//              · lost your keys again? still lovable (FOUND: IN FRIDGE)
//  37.8        "Wild heart. | *Soft landing.*"  Sagittarius comes back, big.
//  41.0        LESSON UNLOCKED: "Wander all you want. | *Home is still here.*"  HEART: HOME
//  46.9        "Go explore, Sag. | *We'll wait up.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

const S = 'sagittarius', PURP = '#b48cff'
// ── props
const SOFA = ['.PPPPPPPPPP.', 'PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'PLLLLLLLLLLP', 'PLLLLLLLLLLP', 'PPPPPPPPPPPP', 'W..........W']
const SOFA_C = { P: PURP, L: '#d5bfff', W: WOOD }
const SUITCASE = ['...KKKK...', '...K..K...', 'OOOOOOOOOO', 'OOOOOOOOOO', 'OOOHOOOOOO', 'OOOOOOOOOO', 'OOOOOOOOOO', '.K......K.']
const SUITCASE_C = { O: ORANGE, K: INK, H: '#ff4f86' }
const SNAIL = ['....SSS.....', '...SWWSS....', '..SWSSWS....', '..SWWWSS..A.', '...SSSS...A.', 'BBBBBBBBBBB.', '.BBBBBBBBBB.']
const SNAIL_C = { S: GOLD, W: '#e0a52a', B: '#9fe39a', A: INK }
const FOOT = ['.FF.', 'FFFF', 'FFFF', '.FF.']
const KITE = ['...P...', '..PPP..', '.PPYPP.', 'PPYYYPP', '.PPYPP.', '..PPP..', '...P...']
const KEYS = ['.YYY......', 'Y...Y.....', 'Y...YYYYYY', 'Y...Y...Y.', '.YYY....Y.']
const CRICKET = ['G...G', '.GGG.', 'GGGGG', '.G.G.']

const CAMEOS = [
  { sign: S, cap: 'Staying home | *is an adventure too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: 120, y: -20, s: 260 },
    back(x, t, lt, P) { drawBits(x, SOFA, SOFA_C, 640, 960, 30 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 400, 680, 'DESTINATION: SOFA', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 400, 760, 'ETA: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changing plans | *is okay.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05, bg: '#bfe9ff', head: PURP, headH: 50 }, () => {
        say(x, 'TICKET', 0, -65, { size: 28, color: BONE, font: MONO, weight: 700 })
        say(x, 'SAT → ???', 0, 10, { size: 40 })
        x.setLineDash([8, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(100, -40); x.lineTo(100, 90); x.stroke(); x.setLineDash([])
      })
      label(x, 790, 860, 'RESCHEDULED', pop01(t, P.t0 + 1.1, 0.25, 2.8), { size: 44, bg: 'rgba(0,0,0,0)', color: RED, rot: -0.2, font: MONO, weight: 700 })
      label(x, 780, 1100, 'LATER. STILL ON.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every joke | *has to land.*', mood: lt => lt > 1.4 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 560, 640, 'why did the | comet blush?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      ;[[700, 1020], [880, 990]].forEach(([cx, cy], i) => drawBits(x, CRICKET, { G: GREEN }, cx, cy - (Math.floor(t * 4 + i) % 2) * 12, 12 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2)))
      label(x, 790, 880, 'CHIRP. CHIRP.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'STILL FUNNY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can miss people | *and still go.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 580, 1100, 15 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 970, 180 * k, { mood: 'heart', look: [-1, 0], seed: 111, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.6] })
      bubble(x, 800, 680, 'call me | when you land!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bc' })
      hearts(x, t, 620, 880, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Slow down. | *Scenic route.*', mood: 'sleepy', star: { x: -40, y: -90, s: 220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, SNAIL, SNAIL_C, 500 + 30 * prog(lt, 0, 2.4), 1000, 34 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 820, 680, 'SPEED: CHILL', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 540, 1170, 'SCENIC ROUTE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big dreams, | *small steps.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220, y: 40 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, FOOT, { F: BONE }, 520 + i * 85, 1080 - i * 70 + (i % 2 ? 18 : -18), 14 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2), { rot: -0.6 })
      drawBits(x, ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '.Y.Y.'], { Y: GOLD }, 930, 690, 14 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      label(x, 760, 1150, 'STEP 1: DONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honest is good. | *Gentle is better.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 990, 180 * k, { mood: lt > 1.4 ? 'happy' : 'wide', look: [-1, 0], seed: 112, glyph: false })
      bubble(x, 800, 690, 'is my haircut | bad?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.1 ? 1 : 0.001), { size: 34, col: ROSE, tail: 'br' })
      bubble(x, 540, 650, 'bold! and it’ll | grow. ♡', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1150, 'HONEST + KIND', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A string doesn’t | *stop a kite.*', mood: 'sparkle', look: [1, -1], star: { x: -220, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), kx = 800 + 30 * Math.sin(t * 1.6), ky = 660 + 20 * Math.cos(t * 2.1)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(F.x + 90, F.cy + 20); x.quadraticCurveTo(650, 900, kx, ky + 60); x.stroke(); x.restore() }
      drawBits(x, KITE, { P: PINK, Y: GOLD }, kx, ky, 18 * k, { rot: 0.2 * Math.sin(t * 2) })
      label(x, 800, 1100, 'STILL FLYING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lost your keys again? | *Still lovable.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), open = ease.inOutCubic(prog(lt, 0.8, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -230, 260, 460); x.fillStyle = '#e8f4ff'; x.fillRect(-122, -222, 244, 444)
        x.fillStyle = INK; x.fillRect(-122, -60, 244, 8)
        x.fillStyle = '#bfe9ff'; x.fillRect(-110, 0, 220, 6); x.fillRect(-110, 100, 220, 6)
        drawBits(x, KEYS, { Y: GOLD }, 0, 60, 9 * pop01(t, P.t0 + 1.1, 0.3, 2))
        x.fillStyle = INK; x.fillRect(-122 - 4, -222, (244 + 8) * (1 - open * 0.85), 448); x.fillStyle = '#d7e8f8'; x.fillRect(-122, -218, 244 * (1 - open * 0.85), 440)
        x.restore()
      }
      label(x, 800, 1150, 'FOUND: IN FRIDGE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a028', key: 'F', accent: PURP, solo: S, ending: 'lesson',
  title: 'Dear Sagittarius: | *it’s okay.*',
  cameos: CAMEOS,
  group: { cap: 'Wild heart. | *Soft landing.*', mood: 'heart' },
  lesson: { text: 'Wander all you want. | *Home is still here.*', chip: 'HEART: HOME' },
  last: { text: 'Go explore, Sag. | *We’ll wait up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
