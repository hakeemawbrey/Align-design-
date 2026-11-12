// r2a0461: star_advice, ADVICE SOLO (virgo), "Signs a Virgo | *needs a break.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle signs a Virgo needs a break, each a relatable truth + a warm reframe. Ending: callback.
//   cleaned the clean kitchen · read the text nine times · forty-item to-do list · the crooked frame · rehearsing tomorrow
//   in bed · a pros-and-cons list for a match · ironed the pyjamas · one typo · rest isn't a prize
//   group "Not perfect. | Already enough."   last "Still crooked. | Still lovely." (the frame comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'virgo', ACC = '#7dffb0', CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, lh = 1.55 } = {}) {
  if (k <= 0.01) return
  const LH = size * lh, h = lines.length * LH + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + LH * (i + 0.5)))
  x.restore()
}
/** a picture frame (a little mountain painting) tilted by rot */
function frame(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-2, -190, 4, 70); x.fillRect(-10, -196, 20, 12)
  x.fillStyle = INK; x.fillRect(-140, -124, 280, 220)
  x.fillStyle = GOLD; x.fillRect(-132, -116, 264, 204)
  x.fillStyle = SKYB; x.fillRect(-110, -94, 220, 160)
  x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-110, 66); x.lineTo(-40, -30); x.lineTo(20, 40); x.lineTo(60, 0); x.lineTo(110, 66); x.fill()
  x.fillStyle = '#ffe27a'; x.fillRect(50, -74, 30, 30)
  x.restore()
}
/** a little anger/stress mark (four corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const SPRAY = [
  '.KKKK...',
  '.KWWK...',
  'KKKKKKK.',
  '...KK...',
  '..MMMM..',
  '.MMMMMM.',
  '.MWMMMM.',
  '.MWMMMM.',
  '.MMMMMM.',
  '.MMMMMM.',
  '.MMMMMM.',
]
const SPRAY_C = { K: PURP, W: '#ffffff', M: MINT }
const IRON = [
  '...HHHHH...',
  '...H...H...',
  '..BBBBBBB..',
  '.BBBBBBBBB.',
  'BBBWBBBBBBB',
  'SSSSSSSSSSS',
]
const IRON_C = { H: PURP, B: SKYB, W: '#ffffff', S: '#c9c9d8' }
const PJ = ['PP...PP', 'PPPPPPP', '.PWPWP.', '.PPPPP.', '.PWPWP.', '.PPPPP.']
const PJ_C = { P: PINK, W: '#ffffff' }
const BED = ['P..........P', 'PWWW.......P', 'PWWWBBBBBBBP', 'PBBBBBBBBBBP', 'PPPPPPPPPPPP', 'P..........P']
const BED_C = { P: PURP, W: CREAM, B: LAV }
const MUG = ['.......', 'MMMMM..', 'MWMMMMM', 'MMMMM.M', 'MMMMMMM', 'MMMMM..', '.MMM...']
const MUG_C = { M: PINK, W: '#ffffff' }

const CAMEOS = [
  // 1 · the kitchen
  { sign: S, cap: 'Scrubbing a clean sink? | *Sit down, love.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SPRAY, SPRAY_C, 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 + (lt < 1.2 ? 0.06 * Math.sin(t * 18) : 0) })
      sparkles(x, t, 790, 900, P.t0 + 0.6, 7, 170, 0.2)
      L(x, 790, 640, 'ALREADY SPOTLESS', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 34)
      L(x, 790, 1150, 'SPRAY #6', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, 0.04, 34)
    } },
  // 2 · the text
  { sign: S, cap: 'Reread it nine times? | *Just send it.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const sent = lt > 1.6
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: sent ? 'SENT ✓' : 'DRAFT 9 OF 9', headCol: sent ? MINT : GOLD, lines: [['see you at 7!', LAV, pop01(t, P.t0 + 0.4, 0.2, 2), true]] })
      if (sent) hearts(x, t, 790, 700, P.t0 + 2.0, { n: 4, life: 1.2, spread: 160, cell: 7, seed: 2 })
    } },
  // 3 · the list
  { sign: S, cap: 'A forty-item list? | *Pick one.*', mood: lt => lt < 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const unroll = ease.outCubic(prog(lt, 0.3, 1.0))
      if (k > 0.01) {
        x.save(); x.translate(790, 560); x.scale(k, k)
        const H = 40 + unroll * 600
        x.fillStyle = INK; x.fillRect(-128, -8, 256, H + 16); x.fillStyle = CREAM; x.fillRect(-120, 0, 240, H)
        x.fillStyle = '#b9b0a0'; for (let y = 40; y < H - 10; y += 34) x.fillRect(-90, y, 180, 8)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('TO DO (40)', 0, 28)
        x.restore()
      }
      L(x, 520, 640, 'JUST ONE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.06, 34)
    } },
  // 4 · the crooked frame
  { sign: S, cap: 'Frame a bit crooked? | *Let it lean.*', mood: lt => lt < 1.3 ? 'squint' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      frame(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 0.16)
      vein(x, F.x + 90, F.top + 20, lt < 1.3 ? pop01(t, P.t0 + 0.5, 0.2, 2) : 0, t)
      L(x, 790, 1130, 'IT’S ART NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 36)
    } },
  // 5 · bedtime rehearsal
  { sign: S, cap: 'Up planning tomorrow? | *Sleep first.*', mood: lt => lt < 1.2 ? 'wide' : 'sleepy', star: { x: -170, y: -30 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 470, 1080, 34 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      note(x, 800, 820, lt < 1.3 ? pop01(t, P.t0 + 0.3, 0.3, 2) : 0, ['PLAN A', 'PLAN B', 'PLAN C…Z'], { w: 250, bg: CREAM, size: 34, rot: 0.05, font: MONO, weight: 700 })
      L(x, 800, 820, 'ZZZ: BOOKED', lt >= 1.3 ? pop01(t, P.t0 + 1.3, 0.3, 2.2) : 0, LAV, 0.04, 36)
    } },
  // 6 · Align nod: the match
  { sign: S, cap: 'Ranked your match? | *Just say hi.*', mood: lt => lt < 1.3 ? 'squint' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · TAURUS', headCol: MINT, lines: [['hi! ♡', PINK, pop01(t, P.t0 + 1.4, 0.2, 2), true], ['hi!! :)', LAV, pop01(t, P.t0 + 1.8, 0.2, 2), false]] })
      note(x, 560, 620, pop01(t, P.t0 + 0.4, 0.3, 2), ['PROS: 31', 'CONS: 0'], { w: 220, size: 30, rot: -0.08, font: MONO, weight: 700 })
    } },
  // 7 · the iron
  { sign: S, cap: 'Ironing your pyjamas? | You’re *allowed to rest.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PJ, PJ_C, 790, 1020, 28 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const sl = Math.sin(t * 5) * 40
      drawBits(x, IRON, IRON_C, 790 + (lt < 1.4 ? sl : 0), 880, 16 * pop01(t, P.t0 + 0.3, 0.3, 2))
      puffs(x, t, 790, 820, P.t0 + 0.5, { n: 4, cell: 10, rise: 160, spread: 120, seed: 2 })
      L(x, 790, 620, 'CRISP PJs', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  // 8 · the typo
  { sign: S, cap: 'One typo? | *Not a crisis.*', mood: lt => lt < 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      note(x, 790, 870, k, ['see you at', 'teh park!'], { w: 330, bg: CREAM, size: 40, rot: 0.04 })
      const c = ease.outCubic(prog(lt, 0.5, 0.9))
      if (c > 0 && k > 0.5) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(735, 903, 50, 32, 0.04, 0, Math.PI * 2 * c); x.stroke(); x.restore() }
      L(x, 790, 1110, 'STILL UNDERSTOOD ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  // 9 · rest
  { sign: S, cap: 'Rest isn’t a prize. | *No earning needed.*', mood: lt => lt < 0.9 ? 'happy' : 'sleepy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 770, 860, P.t0 + 0.4, { n: 4, cell: 9, rise: 150, spread: 60, seed: 5 })
      L(x, 790, 640, 'BREAK: TAKEN', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2a0461', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Signs a Virgo | *needs a break.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Already enough.*', mood: 'heart' },
  last: {
    text: 'Still crooked. | *Still lovely.*',
    draw(x, t, lt) {
      frame(x, 540, 1060, 1.5 * pop01(t, t - lt + 0.6, 0.4, 2), 0.16)
      label(x, 540, 1330, 'STILL CROOKED ♡', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
