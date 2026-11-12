// r2a0567: star_advice, ADVICE SOLO (cancer), "Signs a Cancer | *likes you.*" (signs3kit social cut, music: lofi · F).
// Ending: card (lesson, then the last line over the Cancer + Taurus match card: the plate and the soup, paid off).
//   saved you a plate, every time · remembers what you said three months ago · "home safe?" every night
//   · knitting you a scarf · you met their mom, week two · got shy? the shell is opening · checked your compatibility,
//   smiled all day · made you soup, you weren't even sick · their home is yours (your slippers are there).
//   group "Shell open. | *Just for you.*"  lesson "Be gentle with a Cancer. | They *love deeply.*"
//   last "Cancer + Taurus: | *dinner forever.*" over Cancer + Taurus.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'cancer', ACC = '#8fe3ff', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

function card(x, cx, cy, w, h, k, rot, fn, face = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.7 * k; x.fillStyle = BONE
  for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) {
    const ph = ((t * 0.8 + j / 5) % 1)
    x.fillRect(cx - 50 + i * 50 + Math.sin(ph * 8 + i) * 10, cy - ph * 120, 10, 10)
  }
  x.restore()
}
const PLATE = [
  '...FFFFFFFF...',
  '..FFFFFFFFFF..',
  '.FFfFFFFFfFFF.',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
  '...WWWWWWWW...',
]
const PLATE_C = { F: '#c9d3e6', f: '#ffffff', W: CREAM }
const POT = [
  '.....KKKK.....',
  'KKKKKKKKKKKKKK',
  '.RRRRRRRRRRRR.',
  'RRRRRRRRRRRRRR',
  '.RRRRWRRRRRRR.',
  '.RRRRRRRRRRRR.',
  '.RRRRRRRRRRRR.',
  '..RRRRRRRRRR..',
]
const POT_C = { K: '#2a2350', R: '#ff6b5a', W: '#ffd0c8' }
const SLIPPERS = ['PPPP..PPPP', 'PWWP..PWWP', 'PPPP..PPPP', 'PPPP..PPPP', '.PP....PP.']
const SLIP_C = { P: PINK, W: CREAM }
const SHELL = [
  '....SSSSSS....',
  '..SSsSSSSsSS..',
  '.SSSSsSSsSSSS.',
  'SSsSSSsSSSSsSS',
  'SSSSsSSSSsSSSS',
]
const SHELL_C = { S: '#ffb3a8', s: '#e07a6e' }
// a phone with a single message
function phone(x, cx, cy, k, msg, reply) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-140, -230, 280, 460, 34); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.roundRect(-128, -218, 256, 436, 26); x.fill()
  x.fillStyle = '#140c30'; x.fillRect(-112, -190, 224, 380)
  x.font = `700 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const w = x.measureText(msg).width + 30
  x.fillStyle = SKYB; x.beginPath(); x.roundRect(-100, -150, w, 56, 16); x.fill(); x.fillStyle = INK; x.fillText(msg, -85, -121)
  if (reply > 0.01) { x.globalAlpha = reply; const w2 = x.measureText('yes :)').width + 30; x.fillStyle = MINT; x.beginPath(); x.roundRect(100 - w2, -70, w2, 56, 16); x.fill(); x.fillStyle = INK; x.fillText('yes :)', 115 - w2, -41) }
  x.globalAlpha = 1; x.fillStyle = LAV; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('11:02 PM', 0, 150)
  x.restore()
}
// a scarf that grows row by row from two needles
function scarf(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const COLS = [ACC, PINK, CREAM]
  for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-64, -150 + i * 24 - 2, 128, 28); x.fillStyle = COLS[Math.floor(i / 2) % 3]; x.fillRect(-60, -150 + i * 24, 120, 24) }
  x.fillStyle = INK; x.save(); x.translate(0, -160); x.rotate(0.5 + Math.sin(t * 9) * 0.08); x.fillRect(-120, -5, 240, 10); x.restore()
  x.save(); x.translate(0, -160); x.rotate(-0.5 - Math.sin(t * 9) * 0.08); x.fillRect(-120, -5, 240, 10); x.restore()
  x.fillStyle = GOLD; x.fillRect(-122, -230, 14, 14); x.fillRect(108, -230, 14, 14)
  x.restore()
}
// a compatibility meter filling to full
function meter(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -50, 380, 100); x.fillStyle = '#2a2350'; x.fillRect(-180, -40, 360, 80)
  x.fillStyle = PINK; x.fillRect(-176, -36, 352 * f, 72)
  for (let i = 0; i < Math.floor(f * 5); i++) drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, -140 + i * 70, 0, 6)
  x.restore()
}
// a little house with the door open and light inside
function house(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-190, -40); x.lineTo(0, -210); x.lineTo(190, -40); x.fill()
  x.fillStyle = '#ff6b5a'; x.beginPath(); x.moveTo(-166, -50); x.lineTo(0, -196); x.lineTo(166, -50); x.fill()
  x.fillStyle = INK; x.fillRect(-150, -50, 300, 220); x.fillStyle = '#ffe7a8'; x.fillRect(-142, -42, 284, 204)
  x.fillStyle = INK; x.fillRect(-46, 30, 92, 140); x.fillStyle = '#ffd23a'; x.fillRect(-40, 36, 80, 134)
  x.fillStyle = '#b5713a'; x.fillRect(-40, 36, 80 * (1 - open), 134)
  x.fillStyle = INK; x.fillRect(-120, -20, 60, 56); x.fillRect(60, -20, 60, 56); x.fillStyle = '#ffd23a'; x.fillRect(-114, -14, 48, 44); x.fillRect(66, -14, 48, 44)
  x.restore()
}

const ST = { x: -180 }
const CAMEOS = [
  // 1 · saved you a plate
  { sign: S, cap: 'Saved you a plate. | *Every single time.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PLATE, PLATE_C, 790, 880, 24 * k)
      steam(x, t, 790, 790, k)
      L(x, 790, 1080, 'RESERVED: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 2 · remembers what you said
  { sign: S, cap: 'Remembers what you said | *three months ago.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 330, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = ACC; x.fillRect(-170, -165, 340, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('ABOUT YOU', 0, -136)
        x.textAlign = 'left'; x.font = `700 24px ${MONO}`
        ;['- rainy days', '- the blue mug', '- hates cilantro', '- mom: Linda'].forEach((s, i) => { if (lt > 0.5 + i * 0.25) x.fillText(s, -140, -70 + i * 56) })
      })
      L(x, 790, 1100, 'MEMORY: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 30)
    } },
  // 3 · home safe?
  { sign: S, cap: 'Texts “home safe?” | *Every night.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.05 * pop01(t, P.t0 + 0.2, 0.35, 2), 'home safe?', pop01(t, P.t0 + 1.3 * 1.29, 0.25, 2))
      if (lt > 1.3) hearts(x, t, 560, 760, P.t0 + 1.3 * 1.29, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 4 })
    } },
  // 4 · knitting a scarf
  { sign: S, cap: 'Knitting you a scarf? | *That’s a love letter.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0.3], star: ST,
    front(x, t, lt, P) {
      scarf(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 12))
      L(x, 790, 1150, 'ROW 12 OF 400', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
    } },
  // 5 · met their mom
  { sign: S, cap: 'You met their mom. | *Week two.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 930, 220 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 61, glyph: false, glow: 0.6 })
      bubble(x, 840, 650, 'finally! sit, eat!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 820, 1120, 'MOM: ALREADY LOVES YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  // 6 · got shy
  { sign: S, cap: 'Got quiet and shy? | *The shell is opening.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), open = ease.inOutCubic(prog(lt, 0.7, 1.4))
      drawBits(x, SHELL, SHELL_C, 790, 930, 24 * k)
      drawBits(x, SHELL, SHELL_C, 790 + open * 70, 870 - open * 90, 24 * k, { sy: -1, rot: -0.7 * open })
      if (open > 0.1) { x.save(); x.globalAlpha = open; drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86', W: '#fff' }, 790, 870, 10); x.restore() }
      L(x, 790, 1100, 'SHELL: OPENING', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, 0.04, 32)
    } },
  // 7 · Align nod: compatibility
  { sign: S, cap: 'Checked your compatibility. | *Smiled all day.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 700, '✦ CANCER + YOU', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.03, 32)
      meter(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2), ease.outCubic(prog(lt, 0.4, 1.4)))
      L(x, 790, 1030, 'SCREENSHOTTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  // 8 · soup
  { sign: S, cap: 'Made you soup. | *You weren’t even sick.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, POT_C, 790, 900, 24 * k)
      steam(x, t, 790, 760, k)
      L(x, 790, 1110, 'JUST IN CASE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  // 9 · their home is yours
  { sign: S, cap: 'Their home is yours. | *Biggest sign of all.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      house(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.6, 1.2)))
      drawBits(x, SLIPPERS, SLIP_C, 790, 1060, 10 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      L(x, 790, 1150, 'YOUR SLIPPERS: HERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0567', key: 'F', accent: ACC, solo: S,
  title: 'Signs a Cancer | *likes you.*',
  cameos: CAMEOS,
  ending: 'card',
  card: { a: 'cancer', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Shell open. | *Just for you.*', mood: 'heart' },
  lesson: { text: 'Be gentle with a Cancer. | They *love deeply.*', chip: 'HEART: HOME' },
  last: { text: 'Cancer + Taurus: | *dinner forever.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
