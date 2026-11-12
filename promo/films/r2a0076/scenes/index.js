// r2a0076: star_advice ADVICE SOLO, "Pisces, you don't have | to be perfect." (~51 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Pisces truth + a warm reframe,
// one visual gag each. Pisces cries in every card (happy-sad, gently).
//   0.0–3.6    "Pisces, you don't | have to be *perfect.*"
//   3.6–37.8   rewrote one text eleven times (send it) · the doodle is wobbly (still art) · burnt the cookies (still
//              made them) · said sorry to a chair (so kind) · forgot a birthday (call them now) · the plant is droopy
//              (it forgives you) · daydreamed all meeting (that's ideas) · cried at a nice song (soft is strong)
//              · your chart isn't a to-do list
//  37.8        "Imperfect. | *Still magic.*"
//  41.0        LESSON UNLOCKED: "You're loved as you are. | *Not as you edit.*"  STATUS: ENOUGH
//  46.9        "Wobbly heart. | *Still a heart.*"  (the doodle comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#7fd6d0', BROWN = '#8a4a2e', RED = '#e23d4e', GREEN = '#6fcf7a'
const S = 'pisces'

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
// a phone with a message draft
function phone(x, cx, cy, k, line1, line2, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  x.fillStyle = SEA; x.fillRect(-90, -40, 180, 70)
  text(x, line1, 0, -5, 28, INK, MONO, 700)
  if (line2) text(x, line2, 0, 110, 30, MINT, MONO, 700)
  x.restore()
}
// a wobbly hand-drawn heart on paper
function doodle(x, t, cx, cy, k, rot = -0.04) {
  if (!card(x, cx, cy, 300, 280, '#fff4e2', k, rot)) return
  x.strokeStyle = RED; x.lineWidth = 12; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 60; i++) {
    const a = i / 60 * Math.PI * 2
    const hx = 16 * Math.pow(Math.sin(a), 3), hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
    const w = 1 + 0.08 * Math.sin(i * 1.7 + 1)
    i ? x.lineTo(hx * 6.5 * w, hy * 6.5 * w + 6) : x.moveTo(hx * 6.5 * w, hy * 6.5 * w + 6)
  }
  x.stroke(); x.restore()
}
const TRAY_COOKIE = ['.BBBB.', 'BBkBBB', 'BBBBkB', 'BkBBBB', '.BBBB.']
const CHAIR = [
  'WWW.....',
  'W.W.....',
  'W.W.....',
  'W.W.....',
  'WWWWWWWW',
  'WWWWWWWW',
  'W......W',
  'W......W',
  'W......W',
]
const PLANT = [
  '..L...L..',
  '.LL..LL..',
  '..LL.L...',
  '...LLL...',
  '....S....',
  '.PPPPPPP.',
  '.PPPPPPP.',
  '..PPPPP..',
  '..PPPPP..',
]
const CAKEB = ['WWWWWWWWW', 'WRRRRRRRW', 'WRWWWWWRW', 'WRRRRRRRW', 'WWWWWWWWW']
// a cloud of daydream
function cloud(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const blob = (bx, by, r) => { x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; for (const [bx, by, r] of [[-90, 10, 76], [0, -30, 96], [90, 10, 76], [0, 40, 80]]) blob(bx, by, r + 7)
  x.fillStyle = BONE; for (const [bx, by, r] of [[-90, 10, 76], [0, -30, 96], [90, 10, 76], [0, 40, 80]]) blob(bx, by, r)
  // a little rainbow inside
  const cols = [RED, GOLD, MINT, SKYB, LAV]
  x.lineWidth = 12; cols.forEach((c, i) => { x.strokeStyle = c; x.beginPath(); x.arc(0, 50, 90 - i * 13, Math.PI, Math.PI * 2); x.stroke() })
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(cx - 150 * k, cy + 130 * k, 18 * k, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx - 150 * k, cy + 130 * k, 12 * k, 0, Math.PI * 2); x.fill()
}
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  const cols = [SEA, BONE, LAV, '#2a2350']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i % 4]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 120, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Rewrote one text | *eleven times?* Send it.', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, tears: 1,
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 10), sent = lt > 1.4
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), sent ? 'hi :)' : `draft ${d}`, sent ? 'SENT' : '')
      label(x, 790, 610, 'JUST SEND IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SEA, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The doodle’s wobbly. | *Still art.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, tears: 1,
    front(x, t, lt, P) {
      doodle(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1090, 'FRIDGE-WORTHY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the cookies? | You *still made them.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, tears: 2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (card(x, 790, 880, 300, 200, '#9aa5c4', k, 0.03)) {
        for (let i = 0; i < 6; i++) drawBits(x, TRAY_COOKIE, { B: '#3a2618', k: INK }, -95 + (i % 3) * 95, -45 + Math.floor(i / 3) * 90, 9)
        x.restore()
      }
      // a little smoke
      x.save(); x.globalAlpha = 0.5 * k; x.fillStyle = '#c9c9d8'
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.beginPath(); x.arc(730 + i * 60, 760 - ph * 120, 18 + ph * 16, 0, Math.PI * 2); x.fill() }
      x.restore()
      label(x, 790, 1070, 'MADE WITH LOVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “sorry” | *to a chair.* So kind.', mood: 'wide', look: [1, 1], star: { x: -170 }, tears: 1, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { W: BROWN }, 800, 960, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 560, 620, 'oh! sorry!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Forgot a birthday? | *Call them now.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, tears: 2,
    front(x, t, lt, P) {
      drawBits(x, CAKEB, { W: BONE, R: PINK }, 790, 760, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 650, 'YESTERDAY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'happy late | birthday!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Droopy plant? | *It forgives you.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, tears: 1,
    front(x, t, lt, P) {
      const perk = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.5)) : prog(lt, 1.0, 1.5)
      drawBits(x, PLANT, { L: GREEN, S: GREEN, P: RED }, 790, 900, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: lerp(0.7, 1, perk), rot: lerp(0.3, 0, perk) })
      label(x, 790, 1120, 'WATERED. FINALLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Daydreamed all meeting? | *That’s ideas.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 }, tears: 1,
    front(x, t, lt, P) {
      cloud(x, t, 760, 700, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1090, 'IDEA: SAVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried at a sweet song? | *Soft is strong.*', mood: 'sparkle', look: [0, 0], star: { x: -170 }, tears: 3,
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 9, col: SEA, alpha: pop01(t, P.t0 + 0.2, 0.3, 2), seed: 3 })
      label(x, 790, 680, 'SONG: ON REPEAT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: SEA, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'STRONG', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 52, bg: PINK, rot: -0.06 })
    } },
  { sign: S, cap: 'Your birth chart | isn’t *a to-do list.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, tears: 1,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 1080, 'NO HOMEWORK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.3, 7, 150, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0076', key: 'D', accent: SEA, solo: S, ending: 'lesson',
  title: 'Pisces, you don’t | have to be *perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Imperfect. | *Still magic.*', mood: 'sparkle' },
  lesson: { text: 'You’re loved as you are. | *Not as you edit.*', chip: 'STATUS: ENOUGH' },
  last: {
    text: 'Wobbly heart. | *Still a heart.*',
    draw(x, t, lt) {
      doodle(x, t, 540, 1220, pop01(t, t - lt + 0.7, 0.4, 2), 0.05)
      hearts(x, t, 540, 1120, t - lt + 1.3, { n: 6, life: 1.6, spread: 300, cell: 6, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
