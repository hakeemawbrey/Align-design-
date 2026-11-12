// r2a0573: star_advice, ADVICE SOLO, "How to check in | *on a Leo.*" (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine gentle ways to check in on a Leo, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "How to check in | *on a Leo.*"
//   3.6–37.8   nine cards: always "great!", ask twice · praise the effort, not just the shine · cheer the small wins
//              · quiet Leo? bring snacks · they hype everyone, hype them back · pride can hide hurt, be gentle
//              · ask about part two of their story · text "proud of you", screenshot incoming · just show up
//  37.8        "Big heart. | *Check in anyway.*"
//  41.2        CALLBACK: "They said “great.” | *They meant it.*"  card one's "great!!" bubble comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb34a', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'leo'

function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function sheet(x, cx, cy, w, h, k, rot, fn, bg = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(); x.restore()
}
const FINGER = ['...YY...', '...YY...', '...YY...', '.YYYYYY.', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..BBBB..', '..BBBB..', '..BBBB..']
const BOWL = ['.O.o.O.o.O.', 'OoOoOoOoOoO', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..', '...WWWWW...']
const BANDAID = ['.PPPPPPPPPP.', 'PPPPWWWWPPPP', 'PPPPWWWWPPPP', '.PPPPPPPPPP.']
const FLOWERS = ['.R..Y..P.', 'RRRYYYPPP', '.R..Y..P.', '..G.G.G..', '...GGG...', '...KKK...', '..KKKKK..', '..KKKKK..', '...KKK...']

const CAMEOS = [
  { sign: S, cap: 'Always “great!” | *Ask twice.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'great!!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 50, tail: 'bl' })
      bubble(x, 790, 920, '…ok, a little tired.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 790, 1110, 'SECOND ASK: TRUTH', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Praise the effort, | *not just the shine.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 3; i >= 0; i--) sheet(x, 790 + i * 16, 880 - i * 14, 260, 320, k, 0.04 - i * 0.03, i ? null : () => {
        txt(x, 'DRAFT 12', 0, -120, 28, INK, MONO, 700)
        x.strokeStyle = '#6b62a8'; x.lineWidth = 5; x.beginPath(); x.moveTo(-90, 60); x.quadraticCurveTo(-20, -80, 40, 20); x.quadraticCurveTo(80, 70, 100, -40); x.stroke()
        for (let j = 0; j < 4; j++) { x.fillStyle = '#c8c0b0'; x.fillRect(-100 + j * 30, 100, 20, 6) }
      })
      L(x, 790, 650, 'ALL 12 DRAFTS: SEEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Cheer the small wins. | *Watch them glow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.7],
    front(x, t, lt, P) {
      drawBits(x, FINGER, { Y: GOLD, B: BROWN }, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.12 + 0.08 * Math.sin(t * 6) })
      L(x, 800, 650, 'WIN: MADE THE BED', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, -0.04, 30)
      sparkles(x, t, 420, 860, P.t0 + 1.3, 8, 190, 0.3)
      bubble(x, 800, 1130, 'you did it!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Quiet Leo? | *Bring snacks.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { O: ORANGE, o: GOLD, W: '#5fb4ff' }, 790, 940, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 680, 'NO SPEECH NEEDED', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.04, 30)
      L(x, 790, 1110, 'SNACK: ACCEPTED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'They hype everyone. | *Hype them back.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 990, 200 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.8, P.t0 + 1.4] })
      bubble(x, 820, 700, 'YOU’RE AMAZING!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      L(x, 800, 1160, 'LEO: SPEECHLESS', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, -0.04, 30)
    } },
  { sign: S, cap: 'Pride can hide hurt. | *Be gentle.*', mood: 'neutral', look: [1, 0.5], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, BANDAID, { P: '#ffc9a8', W: PAPER }, F.x + 60, F.cy + 50, 9 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { rot: -0.3 })
      bubble(x, 790, 720, 'i’m totally fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 960, 'HANDLE WITH CARE', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
      if (lt > 1.6) hearts(x, t, 560, 800, P.t0 + 1.9, { n: 4, life: 1.3, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Remember their story. | *Ask about part two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 880, 250, 330, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, () => {
        x.fillStyle = '#c98f2a'; x.fillRect(-125, -165, 24, 330)
        txt(x, 'THE LEO', 10, -90, 34, INK, "'EB Garamond', Georgia, serif", 700); txt(x, 'SAGA', 10, -44, 40, INK, "'EB Garamond', Georgia, serif", 700)
        txt(x, 'PART 2', 10, 60, 30, RED, MONO, 700)
      }, ORANGE)
      bubble(x, 790, 1110, 'you REMEMBERED?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Text “proud of you.” | *Screenshot incoming.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, 250, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        x.fillStyle = '#140c30'; x.fillRect(-110, -180, 220, 360)
        x.fillStyle = PINK; x.fillRect(-90, -120, 180, 90); txt(x, 'proud of', 0, -92, 30, INK); txt(x, 'you.', 0, -54, 30, INK)
      }, '#2a2350')
      const fl = t - (P.t0 + 1.3 * 3.1 / 2.4)
      if (fl > 0 && fl < 0.3) { x.save(); x.globalAlpha = 0.8 * (1 - fl / 0.3); x.fillStyle = '#fff'; x.fillRect(670, 680, 240, 380); x.restore() }
      L(x, 790, 1120, 'SAVED FOREVER', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Just show up. | *That’s the whole gift.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.3, 1.0))
      signChar(x, t, 'cancer', lerp(1100, 840, f), 990, 200, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false, alpha: f })
      drawBits(x, FLOWERS, { R: RED, Y: GOLD, P: PINK, G: '#5fd068', K: '#6fc3ff' }, lerp(1000, 720, f), 940, 12, { alpha: f })
      L(x, 790, 680, 'DOORBELL: DING', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
      if (lt > 1.3) hearts(x, t, 560, 800, P.t0 + 1.6, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0573', key: 'C', accent: ACC, solo: 'leo', ending: 'callback',
  title: 'How to check in | *on a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Check in anyway.*', mood: 'heart' },
  last: {
    text: 'They said “great.” | *They meant it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'leo', 520, 1170, 380 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', seed: 33, hops: [t0 + 1.4] })
      bubble(x, 640, 860, 'great!!', pop01(t, t0 + 0.9, 0.25, 2.2), { size: 68, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 540, 1440, t0 + 1.4, { n: 6, life: 1.8, spread: 600, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
