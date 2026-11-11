// v3t075: THE SIGNS AS… v3, SOLO film, "Pisces in love | be like." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine love moments, each the most extreme (and lovable) Pisces version. Pisces cries in
// every card. The format look lives in ../../signs3kit.js. Ending: group.
//   0.0–3.6    "Pisces in love | *be like.*"  One big (teary) Pisces pops in, then the cards start.
//   3.6–37.8   nine cards: first date, named your future goldfish · you held the door, vows drafted · a scrapbook of your
//              first coffee · "see you soon", missed you in three seconds · checked your compatibility, cried at the result
//              · shared an umbrella, now it's sacred · you laughed at their joke, replay #48 · planned a surprise, cried first
//              · says "I love you" every eleven minutes
//  37.8        "Too much? | *Just enough.*"  The big Pisces comes back, happy-crying. The end.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PI = '#b7a6ff', RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const BOWL = [
  '..KKKKKK..',
  '.SSSSSSSS.',
  'SSSSSSSSSS',
  'SSSOOSSSSS',
  'SSOOOOSSSS',
  'SSSOOSSSSS',
  'SSSSSSSSSS',
  '.SSSSSSSS.',
  '..KKKKKK..',
]
const BOWL_C = { K: '#c9c9d8', S: SKYB, O: ORANGE }
const UMBRELLA = [
  '.....P.....',
  '...PPPPP...',
  '.PPPPPPPPP.',
  'PPPPPPPPPPP',
  'P.P.PKP.P.P',
  '.....K.....',
  '.....K.....',
  '.....K.....',
  '...K.K.....',
  '...KKK.....',
]
const UMB_C = { P: PINK, K: '#2a2350' }
const GIFT = [
  '..R...R..',
  '...R.R...',
  'GGGGRGGGG',
  'GGGGRGGGG',
  'RRRRRRRRR',
  'GGGGRGGGG',
  'GGGGRGGGG',
  'GGGGRGGGG',
]
const GIFT_C = { R: RED, G: MINT }
const CUP = ['.WWWWW.', 'WWWWWWW', 'BBBBBBB.W', 'BBBBBBBWW', '.BBBBB..', '..BBB...']

function card(x, cx, cy, k, { w = 280, h = 300, head = '', headBg = PI, body = [], rot = 0.05, size = 34, font = INTER, draw } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 31) }
  x.fillStyle = INK; x.font = `800 ${size}px ${font}`
  const top = head ? -h / 2 + 58 : -h / 2
  body.forEach((l, i) => x.fillText(l, 0, top + (h - (head ? 58 : 0)) * (i + 0.5) / body.length))
  if (draw) draw()
  x.restore()
}

const T2 = lt => lt < 1.0 ? 2 : 3
const CAMEOS = [
  { sign: 'pisces', cap: 'First date. | Named *your future goldfish.*', mood: 'heart', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'BUBBLES JR.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'we just met', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: BONE, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'You held the door. | *Vows drafted.*', mood: lt => lt > 0.8 ? 'wide' : 'heart', tears: T2, star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 300, h: 320, head: 'MY VOWS', headBg: PINK, body: ['the door…', 'you held it…', 'forever.'], size: 34, font: `Georgia, serif` })
      label(x, 790, 1110, 'DRAFT 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Your first coffee? | Pisces made *a scrapbook.*', mood: 'heart', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 320, h: 320, head: 'US: DAY 1', headBg: GOLD, body: [], draw() {
        drawBits(x, CUP, { W: '#fff4e2', B: '#8a5a3a' }, -50, 30, 18); drawBits(x, CUP, { W: '#fff4e2', B: '#8a5a3a' }, 60, 50, 14)
        x.fillStyle = PINK; x.fillRect(100, -60, 26, 26); x.fillStyle = MINT; x.fillRect(-130, 100, 30, 30)
      } })
      label(x, 790, 1110, 'PAGES: 64', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“See you soon.” | *Missed you instantly.*', mood: 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -180 },
    front(x, t, lt, P) {
      const s = Math.floor(Math.max(0, lt - 0.3) / 0.35)
      label(x, 790, 800, `APART: 0:00:0${Math.min(9, s)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 980, 'come back…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Checked your compatibility. | *Cried at the result.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', tears: T2, star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 650, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: PI, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 860, 'PISCES + YOU', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: BONE, rot: 0.03 })
      label(x, 790, 1020, 'SOULMATES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: PINK, rot: -0.05 })
      hearts(x, t, 560, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 100, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Shared an umbrella. | *Now it’s sacred.*', mood: 'heart', tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, UMBRELLA, UMB_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 })
      // a velvet rope in front of it
      const k = pop01(t, P.t0 + 1.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = GOLD; x.fillRect(650, 1000, 14, 90); x.fillRect(916, 1000, 14, 90); x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(657, 1010); x.quadraticCurveTo(790, 1070, 923, 1010); x.stroke(); x.restore() }
      label(x, 790, 640, 'NEVER TO BE OPENED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'pisces', cap: 'You laughed at their joke. | *Replayed it for weeks.*', mood: 'heart', tears: 2, star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const n = 41 + Math.floor(clamp((lt - 0.4) / 1.4) * 7)
      bubble(x, 790, 680, 'haha!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, col: BONE, tail: 'bl' })
      label(x, 790, 900, `▶ REPLAY #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: PI, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'BEST SOUND EVER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.05 })
    } },
  { sign: 'pisces', cap: 'Planned a surprise. | *Cried first.*', mood: 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 1080, 'SURPRISE: SPOILED', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04 })
      bubble(x, 790, 660, 'it’s just | so nice', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Says “I love you” | *every eleven minutes.*', mood: 'heart', tears: 2, star: { x: -180 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 11)
      bubble(x, 790, 700, 'I love you', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      label(x, 790, 930, `TODAY: #${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 0.8, { n: 6, life: 2.0, spread: 110, cell: 8, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t075', key: 'G', accent: PI, solo: 'pisces', ending: 'group',
  title: 'Pisces in love | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Too much? | *Just enough.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
