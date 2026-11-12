// r2a0659: star_advice, ADVICE SOLO (virgo), "Virgo, here's your | *Sunday reset.*" (signs3kit social cut, music: lofi · E).
// Nine gentle steps of a Virgo Sunday reset, each a warm reframe with one light gag. Ending: lesson.
//   put the list down · clean one drawer, not the house · the slow coffee · text the friend who makes you laugh
//   · leave one thing crooked, on purpose · read your chart just for fun · fresh sheets · a walk with no step count
//   · say one nice thing to yourself.   group "Soft Sunday. | *Earned.*" · lesson · "See you Monday. | *Rested.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, steam, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', S = 'virgo', ST = { x: -180 }

// a single drawer, pulled open, neat inside
function drawer(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = '#c98f5a'; x.fillRect(-150, -120, 300, 240)
  const dy = 70 * open
  x.fillStyle = INK; x.fillRect(-140, -50 + dy, 280, 110); x.fillStyle = '#e0b27a'; x.fillRect(-132, -42 + dy, 264, 94)
  x.fillStyle = INK; x.fillRect(-30, 0 + dy, 60, 16)
  if (open > 0.5) { const C = [PINK, MINT, SKYB, GOLD, LAV]; for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(-120 + i * 50, -60 + dy - 4, 40, 28); x.fillStyle = C[i]; x.fillRect(-116 + i * 50, -60 + dy, 32, 20) } }
  x.restore()
}
// a picture frame on the wall that is (allowed to be) crooked
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -110, 280, 220); x.fillStyle = GOLD; x.fillRect(-132, -102, 264, 204)
  x.fillStyle = SKYB; x.fillRect(-110, -80, 220, 160); x.fillStyle = '#5fd068'; x.fillRect(-110, 20, 220, 60)
  x.fillStyle = '#ffe76a'; x.fillRect(40, -60, 40, 40)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Step one: | *put the list down.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.9, 1.4))
      sheet(x, 800, lerp(840, 980, down), pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'TO-DO (47)', headBg: STEEL, headInk: INK, lines: ['dust', 'sort', 'fix', 'more…'], size: 32, align: 'left', rot: lerp(-0.04, 0.3, down) })
      L(x, 800, 650, 'LIST: ON A BREAK', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 34)
    } },
  { sign: S, cap: 'Clean one drawer. | *Not the whole house.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawer(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.5, 1.0)))
      L(x, 800, 1100, 'ONE IS ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 800, 900, P.t0 + 1.2, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Make the good coffee. | *The slow way.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 780, 780, { n: 3, h: 140 })
      L(x, 800, 1100, 'RUSH: CANCELLED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Text the friend | *who makes you laugh.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: MINT, lines: [['call today?', ACC, pop01(t, P.t0 + 0.5, 0.2, 2), true], ['YES. snacks?', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), false], ['always', ACC, pop01(t, P.t0 + 1.7, 0.2, 2), true]], typing: lt > 0.8 && lt < 1.3 ? 1 : 0, size: 28 })
    } },
  { sign: S, cap: 'Leave one thing crooked. | *On purpose.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      frame(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 0.14 + 0.02 * Math.sin(t * 2))
      L(x, 800, 1060, 'TILTED. ALLOWED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Read your chart. | *Just for fun.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1080, 'TODAY: BE KIND TO YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Fresh sheets. | *You deserve them.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', 800, 960, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      zzz(x, t, 760, 740, { alpha: clamp(lt - 1.0), size: 50 })
      sparkles(x, t, 800, 880, P.t0 + 0.8, 6, 190, 0.5)
    } },
  { sign: S, cap: 'Take a walk. | *Don’t count the steps.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      swap(x, 800, 820, lt)
      L(x, 800, 1060, 'SUN: ON', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: S, cap: 'Say one nice thing | *to yourself.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, lt < 1.2 ? 'you did… okay?' : 'you did great.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: lt < 1.2 ? BONE : PINK, tail: 'bl' })
      L(x, 800, 960, 'NO NOTES', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 40)
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 6 })
    } },
]
// the step counter, crossed out and swapped for a happier sticker
function swap(x, cx, cy, lt) {
  if (lt < 0.9) { L(x, cx, cy, 'STEPS: 4,812', 1, STEEL, -0.04, 36); return }
  const p = clamp((lt - 0.9) / 0.25)
  if (p < 1) { L(x, cx, cy, 'STEPS: 4,812', 1, STEEL, -0.04, 36); x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore(); return }
  L(x, cx, cy, 'STEPS: WHO KNOWS', 1, MINT, 0.04, 36)
}

const F = makeFilm({
  id: 'r2a0659', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Virgo, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Soft Sunday. | *Earned.*', mood: 'heart' },
  lesson: { text: 'Rest is productive too. | *Promise.*', chip: 'RESET: COMPLETE' },
  last: { text: 'See you Monday. | *Rested.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
