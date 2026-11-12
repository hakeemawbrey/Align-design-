// r2t0056: star_talk, ROLLCALL, "The signs at a | trampoline park." (~45 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself at the trampoline park.
//   0.0–3.6    "The signs at a | *trampoline park.*"
//   3.6–49.2   signed the waiver mid-flip · found the snack bar, never jumped · two trampolines at once · holding everyone's
//              shoes · demanded a slow-mo replay · read the rules out loud (rule 2: what's your sign?) · picking matching
//              socks (IT'S A MATCH) · dodgeball got personal · bounced into the next town · made a jump schedule
//              · moved into the foam pit · one bounce, happy tears
//  49.2        "Nobody | *landed it.*"
//  52.6        CALLBACK: "Closing time. | Aquarius *stayed.*"  Aquarius peeking out of the foam pit, a little HOME sign.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BLUE = '#5aa8ff', AQUA = '#6fe3e0'

// ── props
// a trampoline seen from the side: a dark mat on a blue frame with little legs
function tramp(x, cx, cy, w, k, bounce = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -6, w + 12, 30)
  x.fillStyle = BLUE; x.fillRect(-w / 2, 0, w, 18)
  x.fillStyle = '#1b1236'; x.beginPath(); x.moveTo(-w / 2 + 12, 0); x.quadraticCurveTo(0, 26 * bounce, w / 2 - 12, 0); x.lineTo(w / 2 - 12, -4); x.lineTo(-w / 2 + 12, -4); x.fill()
  x.fillStyle = INK; for (const s of [-1, 1]) x.fillRect(s * (w / 2 - 30) - 9, 18, 18, 70)
  x.fillStyle = BLUE; for (const s of [-1, 1]) x.fillRect(s * (w / 2 - 30) - 5, 18, 10, 66)
  x.restore()
}
const PRETZEL = ['.BBB...BBB.', 'B...B.B...B', 'B....B....B', 'B...B.B...B', '.BBB...BBB.', '..B.....B..', '...B...B...', '....BBB....']
const SOCK = ['.SSS..', '.SSS..', '.SSS..', '.SSS..', '.SSSS.', 'SSSSSS', 'SSSSSS']
const SHOE = ['....RRR.', '...RRRR.', 'RRRRRRRR', 'WWWWWWWW']
const BALL = ['..RRRR..', '.RRRRRRR', 'RRWRRRRR', 'RRRRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const FOAM_COLS = [ORANGE, AQUA, PINK, GOLD, MINT, LAV]
function foam(x, cx, cy, k, seed = 0, w = 300) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) {
    const px = -w / 2 + i * (w / 6) + (r % 2) * 18, py = r * -38 + Math.sin(i * 3 + r + seed) * 6
    x.fillStyle = INK; x.fillRect(px - 4, py - 4, 56, 48)
    x.fillStyle = FOAM_COLS[(i + r * 2 + seed) % 6]; x.fillRect(px, py, 48, 40)
  }
  x.restore()
}
function clip(x, cx, cy, k, lines, { w = 280, title = 'RULES', rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const h = 90 + lines.length * 52
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#8a4a2e'; x.fillRect(-50, -h / 2 - 16, 100, 26)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 32px ${INTER}`; x.fillText(title, 0, -h / 2 + 44)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 22, -h / 2 + 100 + i * 52))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Signed the waiver | *mid-flip.*', mood: 'sparkle', star: { x: -170, y: -60 }, hops: [0.5, 1.0, 1.5, 2.0],
    back(x, t, lt, P) { tramp(x, 370, 1110, 300, pop01(t, P.t0 + 0.1, 0.3, 2), Math.abs(Math.sin(lt * 6))) },
    front(x, t, lt, P) {
      clip(x, 780, 820, pop01(t, P.t0 + 0.4, 0.3, 2), ['x  ~aries~', 'x  ~later~'], { title: 'WAIVER', w: 270, rot: 0.08 })
      label(x, 790, 1060, 'SIGNED: IN AIR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the snack bar. | *Never jumped.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SNACK BAR', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 40, bg: ORANGE, font: MONO, weight: 700 })
      drawBits(x, PRETZEL, { B: '#c9853a' }, 790, 880, 24 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1090, 'JUMPS: 0', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two trampolines. | *At the same time.*', mood: 'wink', star: { x: 0, y: -90 }, hops: [0.6, 1.2, 1.8],
    look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2), b = Math.abs(Math.sin(lt * 6))
      tramp(x, 320, 1110, 270, k, b); tramp(x, 760, 1110, 270, k, 1 - b)
    },
    front(x, t, lt, P) { label(x, 540, 560, 'LEFT FOOT · RIGHT FOOT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, font: MONO, weight: 700 }) } },
  { sign: 'cancer', cap: "Held everyone's shoes. | *And feelings.*", mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(prog(lt, 0.2, 1.6) * 6) + 1)
      for (let i = 0; i < n; i++) drawBits(x, SHOE, { R: [RED, BLUE, MINT, PINK, GOLD, LAV][i], W: BONE }, 790 + (i % 2 ? 40 : -40), 1060 - i * 56, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2), { rot: i % 2 ? 0.08 : -0.06 })
      bubble(x, 790, 640, 'drink water!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Demanded a | *slow-motion replay.*', mood: 'sparkle', star: { x: -170, y: -40 }, hops: [0.7],
    back(x, t, lt, P) { tramp(x, 370, 1110, 300, pop01(t, P.t0 + 0.1, 0.3, 2), 0.4) },
    front(x, t, lt, P) {
      label(x, 790, 760, '▶ REPLAY', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 46, bg: GOLD, font: MONO, weight: 700 })
      label(x, 790, 900, 'SPEED: 0.25×', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 380, 820, P.t0 + 0.9, 8, 190, 0.5)
    } },
  { sign: 'virgo', cap: 'Read the safety rules. | *Out loud.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clip(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['1. no shoes', "2. what's", '   your sign?', '3. no flips'], { title: 'RULES (1/40)', w: 300 })
    } },
  { sign: 'libra', cap: 'Twenty minutes | picking *socks.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, { S: PINK }, 720, 860, 22 * k, { rot: -0.1 })
      drawBits(x, SOCK, { S: lt > 1.6 ? PINK : MINT }, 860, 860, 22 * k, { rot: 0.1 })
      label(x, 790, 1080, "✦ IT'S A MATCH", pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Dodgeball got | *very personal.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = prog(lt, 0.4, 1.1)
      if (p > 0) drawBits(x, BALL, { R: RED, W: BONE }, lerp(420, 860, p), 820 - Math.sin(Math.PI * p) * 120, 18)
      label(x, 790, 1060, 'ROUND 47', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: BONE, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'rematch.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Bounced over the wall. | *Next town now.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.2],
    back(x, t, lt, P) { tramp(x, 710, 1110, 300, pop01(t, P.t0 + 0.1, 0.3, 2), Math.abs(Math.sin(lt * 5))) },
    front(x, t, lt, P) {
      label(x, 320, 760, 'NEXT TOWN →', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 320, 940, 'byeee!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Turned it into a | *training plan.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      clip(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['MON: jump', 'TUE: jump', 'WED: review', 'THU: jump'], { title: 'Q1 PLAN', w: 270, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Moved into | the *foam pit.*', mood: 'sleepy', look: [1, 0], star: { x: -170, y: 40 },
    front(x, t, lt, P) {
      foam(x, 380, 1120, pop01(t, P.t0 + 0.2, 0.3, 2), 1, 360)
      label(x, 790, 820, 'NEW ADDRESS', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: AQUA, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'mail me here', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'One bounce. | *Happy tears.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: 0, y: -60 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { tramp(x, 540, 1110, 320, pop01(t, P.t0 + 0.1, 0.3, 2), 0.5) },
    front(x, t, lt, P) {
      label(x, 790, 600, 'SO FREE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
      hearts(x, t, 540, 760, P.t0 + 0.9, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0056', key: 'C', accent: BLUE, ending: 'callback',
  title: 'The signs at a | *trampoline park.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *landed it.*' },
  last: {
    text: 'Closing time. | Aquarius *stayed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 540, 1080, 260 * k, { mood: 'sleepy', look: [0, 0], seed: 40 })
      foam(x, 540, 1200, pop01(t, t - lt + 0.3, 0.35, 2), 2, 520)
      label(x, 790, 880, 'HOME', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: AQUA, rot: 0.08, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
