// r2a0551: star_advice, ADVICE SOLO (scorpio), "Scorpio, trust | can be rebuilt." (signs3kit social cut, music: lofi · D).
// Nine warm truths about trust for a Scorpio, each with one visual gag. Ending: group ("Rebuild slow. | Brick by brick.").
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', ST = { x: -180 }
const BRICK_C = '#b5553d', MORTAR = '#5a2a20'
/** a brick wall that rises row by row (rows 0..n), optional little door */
function wall(x, cx, by, rows, { door = 0, cols = 5, bw = 64, bh = 34 } = {}) {
  const w = cols * bw
  for (let r = 0; r < Math.floor(rows); r++) for (let c = 0; c < cols + 1; c++) {
    const off = r % 2 ? -bw / 2 : 0, lx = Math.max(cx - w / 2, cx - w / 2 + c * bw + off), rx = Math.min(cx + w / 2, cx - w / 2 + (c + 1) * bw + off)
    if (rx <= lx) continue
    x.fillStyle = MORTAR; x.fillRect(lx, by - (r + 1) * bh, rx - lx, bh)
    x.fillStyle = BRICK_C; x.fillRect(lx + 3, by - (r + 1) * bh + 3, rx - lx - 6, bh - 6)
  }
  if (door > 0.01) {
    x.save(); x.translate(cx, by); x.scale(door, door)
    x.fillStyle = INK; x.fillRect(-46, -150, 92, 150); x.fillStyle = '#c98f2a'; x.fillRect(-38, -142, 76, 142)
    x.fillStyle = GOLD; x.fillRect(20, -76, 10, 10); x.restore()
  }
}
/** a little pot with a sprout that grows (g 0..1) */
function sprout(x, t, cx, cy, k, g) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-74, -6, 148, 104); x.fillStyle = '#c96a3a'; x.fillRect(-66, 2, 132, 88); x.fillStyle = '#e08a54'; x.fillRect(-74, -6, 148, 22)
  const h = 160 * g
  x.fillStyle = '#4fbf6a'; x.fillRect(-5, -h, 10, h)
  if (g > 0.4) { const s = (g - 0.4) / 0.6; x.fillRect(-5 - 46 * s, -h * 0.6 - 18 * s, 46 * s, 20 * s); x.fillRect(5, -h * 0.75 - 18 * s, 46 * s, 20 * s) }
  if (g > 0.95) { x.fillStyle = PINK; x.fillRect(-16, -h - 26, 32, 28); x.fillStyle = GOLD; x.fillRect(-6, -h - 18, 12, 12) }
  x.restore()
}

const CAMEOS = [
  { sign: 'scorpio', cap: 'Got hurt once. | Walls got *taller.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      wall(x, 800, 1010, 1 + clamp((lt - 0.2) / 1.0) * 8, { door: pop01(t, P.t0 + 1.5, 0.35, 2) })
      L(x, 800, 1080, 'NOW WITH A DOOR', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Small steps count. | *One reply* is a win.', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MESSAGES', headCol: LAV, lines: [['hey, you ok?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['…yeah. thanks', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]], typing: lt > 0.8 && lt < 1.3 ? 1 : 0 })
      L(x, 800, 1090, 'PROGRESS: REAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Test people *gently.* | Not with 40 questions.', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 300, head: 'TRUST QUIZ', headBg: RED, lines: ['Q1. favorite color?', 'Q2. where were you', '    on May 4th?', 'Q3–40. …'], size: 26, align: 'left' })
      if (lt > 0.3) swapLabel(x, 800, 1080, lt, 1.2, 'QUESTIONS: 40', 'QUESTIONS: 2', { size: 32 })
    } },
  { sign: 'scorpio', cap: 'Not everyone is | *the one who left.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 900, 130, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 41, hops: [P.t0 + 1.2] })
      friend(x, t, 'libra', 880, 900, 130, pop01(t, P.t0 + 0.55, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 42, hops: [P.t0 + 1.4] })
      bubble(x, 800, 690, 'hi! we’re new', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bc' })
      L(x, 800, 1090, 'NEW CHAPTER', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Your radar is great. | Let it *rest.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lt > 1.3 ? 0.5 : Math.sin(t * 5) * 0.15 })
      if (lt > 1.3) zzz(x, t, 860, 720)
      L(x, 800, 1080, 'RADAR: NAP MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Share one small thing. | *See what grows.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sprout(x, t, 800, 930, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.5) / 1.3))
      bubble(x, 800, 640, 'I like jam.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 1100, 'TRUST: SPROUTING', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Forgiving isn’t forgetting. | It’s *putting it down.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const drop = ease.outCubic(clamp((lt - 1.0) / 0.4))
      bits(x, 'BACKPACK', 800, 760 + drop * 200, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: drop * 0.2 })
      if (lt < 1.0) L(x, 800, 640, 'GRUDGES: 14 KG', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 1130, 'SHOULDERS: FREE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Trust yourself first. | *You* kept you safe.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 800, 840, 26 * pop01(t, P.t0 + 0.25, 0.35, 2))
      L(x, 800, 1080, 'BODYGUARD: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 840, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'scorpio', cap: 'Someone stayed. | Let that *count.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 930, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 43, hops: [P.t0 + 1.2] })
      bits(x, 'MUG', 920, 1010, 9 * pop01(t, P.t0 + 0.6, 0.3, 2)); steam(x, t, 915, 975, { n: 2, h: 70 })
      bubble(x, 800, 680, 'still here.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
      hearts(x, t, 700, 1060, P.t0 + 1.4, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0551', key: 'D', accent: ACC, solo: 'scorpio', ending: 'group',
  title: 'Scorpio, trust | *can be rebuilt.*',
  cameos: CAMEOS,
  group: { cap: 'Rebuild slow. | *Brick by brick.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
