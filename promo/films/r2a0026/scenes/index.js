// r2a0026: star_advice, ADVICE SOLO, "How to check in | on a Libra." (~48 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm way to check in, one gag each.
// Ending: lesson (lesson beat, then a last line). No match card.
//   0.0–3.6    "How to check in | *on a Libra.*"
//   3.6–37.8   "I'm fine!" ask twice · two options, not twelve · they keep the peace, ask about theirs
//              · they mirror your mood, bring a good one · can't pick dessert? split two · hate conflict, disagree softly
//              · the outfit took three tries, compliment it · they check on everyone, check on them · flowers count
//  37.8        "Balance *goes both ways.*"
//  41.0        LESSON: "Ask how they are. | Then *really listen.*"  CHECK-IN: SENT
//  46.9        LAST: "This time, “fine” | *meant fine.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fc8', CREAM = '#fff4e2', GREEN = '#5fd068', RED = '#e23d4e'

// ── props
const CAKE = ['....PP....', '..PPPPPP..', 'PPPPPPPPPP', 'CCCCCCCCCC', 'YYYYYYYYYY', 'CCCCCCCCCC', 'YYYYYYYYYY']
const PILLOW = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPPPWPPPPWPPPP', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
const FLOWERS = ['.R...Y...R.', 'RRR.YYY.RRR', '.R...Y...R.', '..G..G..G..', '...G.G.G...', '....GGG....', '....GGG....', '...WWWWW...', '...WWWWW...', '....WWW....']
const DRESS = ['..PP..', '.PPPP.', '.PPPP.', 'PPPPPP', 'PPPPPP', 'PPPPPP', 'PPPPPP']

// a balance scale: the left pan full of little hearts (everyone else's), the right pan empty until a heart drops in
function scale(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tip = lt < 1.3 ? -0.22 : lerp(-0.22, 0, ease.outCubic(prog(lt, 1.3, 1.8)))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 260); x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 248)
  x.fillStyle = INK; x.fillRect(-80, 100, 160, 30); x.fillStyle = GOLD; x.fillRect(-74, 104, 148, 22)
  x.save(); x.translate(0, -150); x.rotate(tip)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 150, 0); x.rotate(-tip)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-66, 86, 132, 18); x.fillStyle = GOLD; x.fillRect(-60, 90, 120, 10)
    const n = s < 0 ? 5 : (lt > 1.3 ? 1 : 0)
    for (let i = 0; i < n; i++) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? PINK : '#ff4f86' }, -40 + (i % 3) * 40 + (s > 0 ? 40 : 0), 66 - Math.floor(i / 3) * 40, 8)
    x.restore()
  }
  x.restore(); x.restore()
}
// a hand mirror showing a friend's face
function mirror(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 120, 36, 150); x.fillStyle = ROSE; x.fillRect(-12, 124, 24, 142)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 150, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = ROSE; x.beginPath(); x.ellipse(0, 0, 120, 140, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfeaff'; x.beginPath(); x.ellipse(0, 0, 100, 120, 0, 0, Math.PI * 2); x.fill()
  x.restore()
  signChar(x, t, 'libra', cx + 4, cy + 6, 150 * k, { mood: lt > 1.2 ? 'sparkle' : 'neutral', seed: 51, glyph: false, glow: 0.4 })
}
const S = 'libra'
const CAMEOS = [
  { sign: S, cap: '“I’m fine!” | *Ask twice.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i’m fine!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 52, tail: 'bl' })
      bubble(x, 800, 900, 'okay, maybe | a little tired.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'ASKED: TWICE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give two options. | *Not twelve.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const many = lt < 1.1
      const L = many ? ['pizza', 'tacos', 'sushi', 'soup', 'pasta', 'salad'] : ['pizza', 'tacos']
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      L.forEach((s, i) => label(x, 690 + (i % 2) * 200, many ? 680 + Math.floor(i / 2) * 110 : 820, s, k, { size: many ? 30 : 46, bg: i % 2 ? SKYB : ROSE, rot: (i % 3 - 1) * 0.05 }))
      if (!many) label(x, 790, 1070, 'EASY.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They keep the peace. | *Ask about theirs.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { scale(x, t, 760, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'They mirror your mood. | *Bring a good one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      mirror(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Can’t pick dessert? | *Split two.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, { P: PINK, C: CREAM, Y: '#ffd23a' }, 700, 900, 16 * k)
      drawBits(x, CAKE, { P: '#8a4a2e', C: '#c98f2a', Y: '#6b3a22' }, 880, 900, 16 * k)
      label(x, 790, 1070, '½ + ½ = PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 700, 'we can do that?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'They hate conflict. | *Disagree softly.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { P: LAV, W: BONE }, 790, 940, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 720, 'hmm, i see it | a bit differently', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 790, 1110, 'STILL FRIENDS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The outfit took three tries. | *Notice it.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const cols = [SKYB, GOLD, ROSE]
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.25 + i * 0.3, 0.3, 2)
        drawBits(x, DRESS, { P: cols[i] }, 660 + i * 115, 860, 22 * k)
        if (i < 2 && lt > 0.9 + i * 0.25) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(615 + i * 115, 805); x.lineTo(705 + i * 115, 915); x.stroke() }
      }
      bubble(x, 790, 1080, 'you look great!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'They check on everyone. | *Check on them.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 800, 650 + i * 110, 'you ok?', pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      bubble(x, 790, 1080, 'are YOU ok?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, col: ROSE, tail: 'br' })
      hearts(x, t, 560, 760, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Bring something pretty. | *Flowers count.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, { R: ROSE, Y: GOLD, G: GREEN, W: CREAM }, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 180, 0.6)
      label(x, 790, 1110, 'DAY: MADE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0026', key: 'D', accent: ROSE, solo: 'libra', ending: 'lesson',
  title: 'How to check in | *on a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Balance | *goes both ways.*', mood: 'sparkle' },
  lesson: { text: 'Ask how they are. | Then *really listen.*', chip: 'CHECK-IN: SENT' },
  last: {
    text: 'This time, “fine” | *meant fine.*',
    draw(x, t, lt) {
      hearts(x, t, 540, 1180, t - lt + 0.8, { n: 8, life: 2.2, spread: 420, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
