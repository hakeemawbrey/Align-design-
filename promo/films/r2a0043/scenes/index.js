// r2a0043: star_advice, ADVICE SOLO, "What Capricorns need | after a fight." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Capricorn truth + a warm reframe, one gag each.
//   0.0–3.6    "What Capricorns | need *after a fight.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              they go quiet (PROCESSING bar) · they fix it with a plan (a make-up plan, step 1: snacks)
//              · sorry, with actions (built your shelf) · a feeling, shared (a rare one, in a jar) · space first, hug second
//              · still a team (matching badges) · facts help, so does tea · call it a tie (scoreboard 1–1)
//              · one fight isn't the whole chart (STILL ALIGNED)
//  37.8        "Serious face. | *Soft* heart."  Capricorn comes back, big.
//  41.0        LESSON: "Give them time. | They *always* come back."  TEAM: RESTORED
//  46.9        "Make-up plan: | *approved.*" over the match card: Capricorn + Cancer.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', CREAM = '#fff4e2', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'capricorn'

const JAR = [
  '.KKKKKK.',
  '.GGGGGG.',
  'G......G',
  'G......G',
  'G......G',
  'G......G',
  'G......G',
  '.GGGGGG.',
]
const JAR_C = { K: WOOD, G: '#bfe6ff' }
const CUP = ['..s.s....', '.s.s.....', 'WWWWWWW..', 'WTTTTTWWW', 'WTTTTTW.W', 'WTTTTTWWW', 'WWWWWWW..', '.WWWWW...']
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }

function card(x, cx, cy, w, h, k, rot = 0.04) {
  x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
}
function txt(x, s, px, py, size = 28, col = INK, align = 'left', w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${INTER}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function plan(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 300, 360, k)
  txt(x, 'MAKE-UP PLAN', 0, -140, 28, INK, 'center')
  x.fillStyle = TEAL; x.fillRect(-130, -116, 260, 6)
  ;['1. snacks', '2. talk', '3. hug', '4. more snacks'].forEach((s, i) => { if (lt > 0.4 + i * 0.3) txt(x, s, -110, -70 + i * 60, 30) })
  x.restore()
}
function shelf(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = WOOD; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = '#8a4a2e'
  for (let i = 0; i < 3; i++) x.fillRect(-142, -60 + i * 100, 284, 12)
  const B = ['#ff6b5a', SKYB, GOLD, LAV, MINT, PINK]
  for (let i = 0; i < 6; i++) if (lt > 0.5 + i * 0.15) { x.fillStyle = INK; x.fillRect(-120 + i * 40, -150, 32, 88); x.fillStyle = B[i]; x.fillRect(-116 + i * 40, -146, 24, 80) }
  x.restore()
}
function scoreboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#140c30'; x.fillRect(-160, -100, 320, 200)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('YOU', -80, -66); x.fillText('THEM', 80, -66)
  x.font = `700 96px ${MONO}`; x.fillStyle = GOLD
  x.fillText('1', -80, 20); x.fillText(lt > 1.1 ? '1' : '0', 80, 20)
  x.fillStyle = BONE; x.fillRect(-6, -10, 12, 12); x.fillRect(-6, 20, 12, 12)
  x.restore()
}
function trend(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); card(x, cx, cy, 320, 260, k, -0.03)
  const pts = [[-130, 60], [-80, 30], [-40, 40], [0, 90], [40, 10], [80, -40], [130, -80]]
  const n = Math.max(1, Math.floor(clamp((lt - 0.2) / 1.2) * pts.length))
  x.strokeStyle = TEAL; x.lineWidth = 10; x.beginPath()
  pts.slice(0, n).forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke()
  if (n > 3) { x.fillStyle = RED; x.fillRect(-8, 82, 16, 16); txt(x, 'one fight', 0, 115, 22, RED, 'center') }
  x.restore()
}
function badge(x, cx, cy, k, s) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
  txt(x, s, 0, 2, 22, INK, 'center')
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'They go quiet. | *Give them a minute.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [0, 1], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -40, 300, 80); x.fillStyle = '#140c30'; x.fillRect(-142, -32, 284, 64)
        x.fillStyle = TEAL; x.fillRect(-136, -26, 272 * clamp(lt / 2.0), 52)
        x.restore()
      }
      label(x, 790, 740, 'PROCESSING...', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'BACK SOON', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 34, bg: TEAL, rot: 0.04 })
    } },
  { sign: S, cap: 'They fix it with a plan. | *Let them.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { plan(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Sorry looks like | *building your shelf.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      shelf(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'SORRY (BUT WOOD)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They shared a feeling. | *Be gentle with it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const h = pop01(t, P.t0 + 1.0, 0.35, 2)
      hearts(x, t, 790, 900, P.t0 + 1.1, { n: 1, life: 0.1, spread: 0, cell: 12, seed: 1 })
      if (h > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 790, 930 - 20 * Math.sin(t * 3), 14 * h)
      label(x, 790, 700, 'RARE: HANDLE WITH CARE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Space first. | *Hug second.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const come = ease.inOutCubic(prog(lt, 1.0, 1.5))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', lerp(840, 600, come), 960, 210 * k, { mood: come > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      label(x, 780, 720, come < 0.5 ? 'SPACE: GIVEN' : 'HUG: GIVEN', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 480, 820, P.t0 + 1.6 * 1.29, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Remind them | *you’re still a team.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 960, 220 * k, { mood: 'happy', look: [-1, 0], seed: 18, glyph: false })
      badge(x, F.x + 60, F.cy + 40, pop01(t, P.t0 + 0.8, 0.3, 2.4), 'US')
      badge(x, 860, 1000, pop01(t, P.t0 + 1.0, 0.3, 2.4), 'US')
      label(x, 540, 640, 'TEAM: STILL US', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.03 })
    } },
  { sign: S, cap: 'Facts help. | *So does tea.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); card(x, 790, 790, 300, 180, k)
        txt(x, 'THE FACTS:', -120, -50, 28); txt(x, 'we both care', -120, 0, 28, TEAL); txt(x, 'that’s it', -120, 50, 28, TEAL)
        x.restore()
      }
      drawBits(x, CUP, CUP_C, 790, 1050, 14 * pop01(t, P.t0 + 1.1, 0.3, 2))
    } },
  { sign: S, cap: 'They hate losing. | Call it *a tie.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      scoreboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1050, 'EVERYBODY WINS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: TEAL, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 6, 170, 0.3)
    } },
  { sign: S, cap: 'One fight isn’t | *the whole chart.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      trend(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1070, '✦ STILL ALIGNED ✦', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0043', key: 'C', accent: TEAL, solo: S, ending: 'card',
  title: 'What Capricorns | need *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'ALIGNED' },
  group: { cap: 'Serious face. | *Soft* heart.', mood: 'sparkle' },
  lesson: { text: 'Give them time. | They *always* come back.', chip: 'TEAM: RESTORED' },
  last: {
    text: 'Make-up plan: | *approved.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
