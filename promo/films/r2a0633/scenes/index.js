// r2a0633: star_advice, ADVICE SOLO (libra), "Libra, you don't have | *to be perfect.*" (signs3kit social cut, lofi · C).
// Nine gentle truths for a perfectionist Libra, each with a warm reframe and one light gag. Ending: lesson.
//   outfit #14 (the first was cute) · one sock on the floor · a typo they smiled at · the crooked frame · the lopsided
//   cake · "you too!" to the waiter · wonky art that's yours · said no, the world kept spinning · rest counts too
//   lesson "Lovely beats perfect. | *Every time.*"  PRESSURE: OFF   last "Leave the frame | *a little crooked.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fd8', S = 'libra', ST = { x: -190 }
const HANGER = ['....KK....', '...K..K...', '......K...', '.....K....', '...KKKK...', '..K....K..', '.K......K.', 'KKKKKKKKKK']
const SOCK = ['.WWW', '.WRW', '.WWW', '.WWW', 'WWWW', 'WWW.']
const CAKE = ['....Y.....', '....O.....', '....W.....', '.PPPPPPP..', 'PPWPPPWPPP', 'WWWWWWWWWW', 'CCCCCCCCCC', 'CCCCCCCCCC']
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -86, 256, 188)
  x.fillStyle = INK; x.fillRect(-136, -102, 272, 204); x.fillStyle = GOLD; x.fillRect(-128, -94, 256, 188)
  x.fillStyle = '#8fd6ff'; x.fillRect(-104, -70, 208, 140)
  x.fillStyle = '#5fbf6a'; x.fillRect(-104, 20, 208, 50)
  x.fillStyle = '#ffd23a'; x.fillRect(50, -50, 30, 30)
  x.fillStyle = PINK; x.fillRect(-60, -6, 26, 26); x.fillStyle = LAV; x.fillRect(-20, -6, 26, 26)
  x.restore()
}
// a wobbly hand-drawn star on paper
function doodle(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -130, 276, 276)
  x.fillStyle = INK; x.fillRect(-146, -146, 292, 292); x.fillStyle = CREAM; x.fillRect(-138, -138, 276, 276)
  x.strokeStyle = ACC; x.lineWidth = 9; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = (i % 2 ? 42 : 100) + 12 * Math.sin(i * 2.7); const px = Math.cos(a) * r + 6 * Math.sin(i * 1.3), py = Math.sin(a) * r + 6 * Math.cos(i * 2.1); i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Outfit number fourteen? | *The first was cute.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HANGER, { K: STEEL }, 800, 840, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.08 })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 13)
      L(x, 800, 1060, `OUTFIT #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), PINK, -0.04, 36)
      if (lt > 1.7) L(x, 800, 680, '#1 WAS PERFECT', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'One sock on the floor? | *Guests came for you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SOCK, { W: BONE, R: RED }, 800, 960, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.5 })
      L(x, 800, 720, 'HOUSE: LOVELY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Sent a typo? | *They still smiled.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: ACC, lines: [['see you tmorow!', BONE, 1, true], [':) same!', MINT, pop01(t, P.t0 + 1.4, 0.25, 2)]] })
    } },
  { sign: S, cap: 'The frame’s a bit crooked? | *Still a lovely photo.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.09)
      L(x, 800, 1090, 'TILT: 2°', pop01(t, P.t0 + 1.0, 0.3, 2.2), BONE, 0.04, 34)
    } },
  { sign: S, cap: 'Lopsided cake? | *Tastes just as sweet.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, { Y: GOLD, O: '#ff8a3a', W: CREAM, P: PINK, C: '#c98f5a' }, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.14 })
      bits(x, 'FORK', 930, 760, 12 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.4 })
      L(x, 800, 1140, 'GONE IN 5 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Told the waiter “you too”? | *Honestly charming.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 830, 690, 'enjoy your meal!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      bubble(x, 760, 870, 'you too!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1080, 'CHARM +10', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Your art looks wobbly? | *It’s yours. Love it.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      doodle(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'FRIDGE-WORTHY', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Said “no” for once? | *The world kept spinning.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'no, thanks!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      chart(x, 800, 930, 110, pop01(t, P.t0 + 0.8, 0.3, 2), t * 3)
    } },
  { sign: S, cap: 'Rest before it’s all done? | *Rest counts too.*', mood: 'sleepy', look: [0, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, 320, 760, { alpha: clamp(lt - 0.5) })
      L(x, 800, 740, 'TO-DO: LATER', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0633', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libra, you don’t | have *to be perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Already lovely. | *Just as you are.*', mood: 'heart' },
  lesson: { text: 'Lovely beats perfect. | *Every time.*', chip: 'PRESSURE: OFF' },
  last: {
    text: 'Leave the frame | *a little crooked.*',
    draw(x, t, lt) { frame(x, 540, 1440, 1.1 * pop01(t, t - lt + 0.7, 0.35, 2), 0.09); sparkles(x, t, 540, 1440, t - lt + 1.0, 7, 200, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
