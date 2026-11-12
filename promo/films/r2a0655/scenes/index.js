// r2a0655: star_advice, ADVICE SOLO, "Cancer? Better | *than you think.*" (topic: "Cancer, you're doing better than
// you think", trimmed to fit two lines; ~45 s vertical, signs3kit social cut, music: lofi · G). One sign, 9 cards:
//   fed everyone today (feed you too) · stayed home all weekend (cozy is a skill) · remembered every birthday (that's
//   a gift) · moody today (moons have phases too) · worried you're too much (just enough) · kept every old text (heart
//   is a scrapbook) · plant still alive (so are you) · took a nap (productive, promise) · home feels safe because of you
//  37.8  "Soft shell. | *Strong heart.*"
//  41.2  callback: "Today, someone | *made you soup.*"  Card one's plate comes back: a friend brings Cancer the soup.
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'cancer', ACC = '#8fe3ff', ST = { x: -170 }
const POT = ['.RRRRRRRR.', 'RRRRRRRRRR', '.RRRRRRRR.', '.RRRRRRRR.', '..RRRRRR..', '..RRRRRR..']
const POT_C = { R: '#d9744a' }
const LEAVES = ['G..GG..G', 'GG.GG.GG', '.GGGGGG.', '..GGGG..', '...GG...', '...GG...']
const LEAVES_C = { G: '#5fd068' }

// the moon in four phases, lighting up one by one
function phases(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) {
    const px = -165 + i * 110, on = lt > 0.4 + i * 0.3
    x.fillStyle = INK; x.beginPath(); x.arc(px, 0, 46, 0, 7); x.fill()
    x.fillStyle = '#3a3360'; x.beginPath(); x.arc(px, 0, 40, 0, 7); x.fill()
    if (on) {
      x.fillStyle = '#ffe7a8'; x.beginPath()
      const f = [0.25, 0.5, 0.75, 1][i]
      x.arc(px, 0, 40, -Math.PI / 2, Math.PI / 2); x.ellipse(px, 0, 40 * Math.abs(1 - 2 * f), 40, 0, Math.PI / 2, -Math.PI / 2, f < 0.5); x.fill()
    }
  }
  x.restore()
}
// a scrapbook with little photos
function scrapbook(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -120, 336, 260)
  x.fillStyle = INK; x.fillRect(-172, -132, 344, 264)
  x.fillStyle = '#c98f5a'; x.fillRect(-164, -124, 328, 248)
  x.fillStyle = CREAM; x.fillRect(-152, -112, 148, 224); x.fillRect(4, -112, 148, 224)
  const PH = [[-120, -70, PINK], [-60, 30, MINT], [40, -60, GOLD], [100, 40, LAV]]
  PH.forEach(([px, py, c], i) => { x.save(); x.translate(px + 0, py); x.rotate(i % 2 ? 0.12 : -0.1); x.fillStyle = '#ffffff'; x.fillRect(-46, -40, 92, 84); x.fillStyle = c; x.fillRect(-38, -32, 76, 56); x.restore() })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Fed everyone today? | *Feed you too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOWL', 680 + i * 110, 820, 9 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 790, 680, 'SERVED: EVERYONE', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 30)
      bits(x, 'BOWL', 790, 1000, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
      L(x, 790, 1110, 'THIS ONE’S YOURS ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Home all weekend? | *Cozy is a skill.*', mood: 'sleepy', star: { x: -170, y: 10 },
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 380, 1060, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MUG', 790, 880, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      steam(x, t, 780, 800, { n: 2, h: 100 })
      L(x, 790, 680, 'SKILL: EXPERT', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'Every birthday remembered? | *That’s a gift.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: 'BIRTHDAYS', headBg: PINK, headInk: INK, lines: ['mom ♡', 'bestie ♡', 'neighbour’s cat ♡', 'the mail carrier ♡'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      bits(x, 'GIFT', 920, 1080, 10 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: S, cap: 'Moody today? | Moons *have phases too.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      phases(x, t, 760, 780, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 980, 'ALL NORMAL ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Worried you’re too much? | *You’re just right.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 780, 840, P.t0 + 0.5, { n: 8, life: 2.0, spread: 120, cell: 8, seed: 4 })
      L(x, 790, 680, 'FULL OF LOVE', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.05, 36)
      L(x, 790, 1100, 'AMOUNT: PERFECT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Kept every old message? | *Heart of a scrapbook.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scrapbook(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1090, 'SAVED SINCE 2014', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Plant still alive? | *So are you. Proud.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, POT_C, 790, 1020, 22 * k)
      drawBits(x, LEAVES, LEAVES_C, 790, 900, 18 * k)
      L(x, 790, 680, 'DAY 200 ✦', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, 0.05, 40)
      sparkles(x, t, 790, 880, P.t0 + 1.4, 7, 150, 0.3)
    } },
  { sign: S, cap: 'Took a nap? | *Productive. Promise.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1000, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.4, 0.35, 2), { w: 300, h: 260, head: 'TO DO', headBg: SKYB, headInk: INK, lines: ['laundry', ['rest ✓', '#2f8a48']], size: 34, progress: clamp((lt - 0.6) / 0.8) })
      L(x, 800, 1090, 'DAY: SUCCESS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Home feels safe | *because of you.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 790, 860, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 0.8, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 6 })
      L(x, 790, 1100, 'SAFE PLACE: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0655', key: 'G', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer? Better | *than you think.*',
  cameos: CAMEOS,
  group: { cap: 'Soft shell. | *Strong heart.*', mood: 'heart' },
  last: {
    text: 'Today, someone | *made you soup.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k1 = pop01(t, t0 + 0.2, 0.45, 1.8), k2 = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k1 > 0.01) signChar(x, t, S, 380, 1080, 250 * k1, { mood: lt > 1.4 ? 'heart' : 'wide', seed: 9, look: [1, 0], hops: [t0 + 1.5] })
      friend(x, t, 'taurus', 720, 1080, 230, k2, { mood: 'happy', look: [-1, 0], hops: [t0 + 1.0] })
      bits(x, 'BOWL', 560, 1120, 12 * pop01(t, t0 + 0.9, 0.3, 2))
      steam(x, t, 560, 1060, { n: 2, h: 90 })
      hearts(x, t, 540, 980, t0 + 1.4, { n: 6, life: 2.0, spread: 400, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
