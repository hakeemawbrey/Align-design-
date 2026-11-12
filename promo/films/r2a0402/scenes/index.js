// r2a0402: star_advice, ADVICE SOLO, "Pisces, it's okay | to start over." (~45 s vertical, signs3kit social cut,
// music: lofi · F). One sign the whole way (Pisces cries in every card): nine fresh starts, each with a warm reframe and
// one light gag. Ending: callback.
//   0.0–3.6    "Pisces, it’s okay | *to start over.*"
//   3.6–37.8   nine cards (3.8 s each):
//              painting went wrong, canvas #2 · dropped the hobby, the yarn rolls back · new city, box: FRAGILE FEELINGS
//              · changed your mind, plan B sprouts · lost the streak, day one still counts · deleted the draft, fresh page
//              · a friendship drifted, say hi first · missed the bus, the next one's coming · cried about it, new day loading
//  37.8        "Fresh start. | *Same big heart.*"
//  41.2        CALLBACK: "And plan B? | *Fully bloomed.*"  The sprout is back as a big flower.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', SEA = '#7fb8ff'

const YARN = [
  '..PPPP..',
  '.PpPPpP.',
  'PPPpPPPP',
  'PpPPPpPP',
  'PPPpPPpP',
  'PpPPPPPP',
  '.PPpPPP.',
  '..PPPP..',
]
const YARN_C = { P: PINK, p: '#ffd0de' }
const BOX = [
  'TTTTTTTTTTTTTT',
  'BBBBBBTTBBBBBB',
  'BBBBBBTTBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
]
const BOX_C = { T: '#e8c47a', B: '#c98f5a' }
const SUN = [
  '...Y..Y..Y...',
  '.Y.........Y.',
  '....OOOOO....',
  '..OOOOOOOOO..',
  'YOOOOOOOOOOOY',
  'OOOOOOOOOOOOO',
]
const SUN_C = { Y: GOLD, O: '#ffb34a' }
const BUS = [
  'YYYYYYYYYYYYYY',
  'YWWYWWYWWYWWYY',
  'YWWYWWYWWYWWYY',
  'YYYYYYYYYYYYYY',
  'YYYYYYYYYYYYYR',
  '.KK.......KK..',
]
const BUS_C = { Y: GOLD, W: SKYB, R: RED, K: INK }

// a sprout that grows; bloom 0…1 opens a big flower
function plant(x, t, cx, cy, grow, bloom = 0, s = 1) {
  if (grow <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-58, -6, 116, 76); x.fillStyle = '#e07a4a'; x.fillRect(-52, 0, 104, 64); x.fillStyle = '#c05a3a'; x.fillRect(-52, 0, 104, 12)
  const h = 160 * grow
  x.fillStyle = INK; x.fillRect(-8, -h - 4, 16, h + 6); x.fillStyle = GREEN; x.fillRect(-4, -h, 8, h)
  if (grow > 0.4) { x.fillStyle = GREEN; x.fillRect(4, -h * 0.55, 34, 14); x.fillRect(-38, -h * 0.75, 34, 14) }
  if (bloom > 0.01) {
    const r = 46 * bloom
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t * 0.4; x.fillStyle = INK; x.fillRect(Math.cos(a) * r - 26 * bloom, -h + Math.sin(a) * r - 26 * bloom, 52 * bloom, 52 * bloom); x.fillStyle = i % 2 ? PINK : '#ffd0de'; x.fillRect(Math.cos(a) * r - 22 * bloom, -h + Math.sin(a) * r - 22 * bloom, 44 * bloom, 44 * bloom) }
    x.fillStyle = GOLD; x.fillRect(-22 * bloom, -h - 22 * bloom, 44 * bloom, 44 * bloom)
  } else if (grow > 0.8) { x.fillStyle = '#9ae58a'; x.fillRect(-12, -h - 20, 24, 24) }
  x.restore()
}
// an easel: the first canvas is a smudge, then a fresh one swings in
function easel(x, cx, cy, k, fresh) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, 60, 18, 200); x.fillRect(72, 60, 18, 200); x.fillRect(-9, 40, 18, 230)
  x.fillStyle = '#c98f2a'; x.fillRect(-86, 64, 10, 192); x.fillRect(76, 64, 10, 192); x.fillRect(-5, 44, 10, 222)
  x.fillStyle = INK; x.fillRect(-136, -156, 272, 222)
  x.fillStyle = PAPER; x.fillRect(-128, -148, 256, 206)
  if (fresh < 0.5) {
    x.fillStyle = '#7a6a8a'; for (let i = 0; i < 9; i++) x.fillRect(-90 + (i * 37) % 160, -110 + (i * 53) % 130, 70, 22)
    x.fillStyle = '#5b4a6a'; x.fillRect(-60, -60, 120, 40)
  } else {
    x.fillStyle = SEA; x.fillRect(-128, -10, 256, 68)
    x.fillStyle = INK; x.fillRect(-34, -64, 72, 44); x.fillStyle = '#c9a6ff'; x.fillRect(-30, -60, 64, 36); x.fillRect(34, -54, 20, 24)
    x.fillStyle = INK; x.fillRect(-14, -50, 8, 8)
  }
  x.restore()
}
// a desk calendar page with a big number
function dayPage(x, cx, cy, k, txt, sub) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = PAPER; x.fillRect(-120, -140, 240, 280)
  x.fillStyle = RED; x.fillRect(-120, -140, 240, 60)
  x.fillStyle = '#fff'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sub, 0, -110)
  x.fillStyle = INK; x.font = `800 120px ${INTER}`; x.fillText(txt, 0, 20)
  x.restore()
}
// a page of writing: scribbled-out lines, then a clean page with one line
function page(x, cx, cy, k, fresh) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -166, 252, 332)
  x.fillStyle = '#ffffff'; x.fillRect(-120, -160, 240, 320)
  x.fillStyle = '#c3cbe0'; for (let i = 0; i < 7; i++) x.fillRect(-100, -120 + i * 40, 200, 3)
  if (!fresh) { x.fillStyle = '#3a2a8a'; for (let i = 0; i < 6; i++) { x.fillRect(-96, -132 + i * 40, 180 - (i % 3) * 30, 10) } x.fillStyle = RED; for (let i = 0; i < 6; i++) x.fillRect(-100, -128 + i * 40, 190 - (i % 3) * 30, 5) }
  else { x.fillStyle = '#3a2a8a'; x.font = `italic 600 34px Georgia, serif`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('Chapter 1', -96, -128) }
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'pisces', cap: 'The painting went wrong? | *New canvas.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, tears: lt => lt > 1.3 ? 1 : 2, hops: [1.3],
    front(x, t, lt, P) {
      easel(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 1 : 0)
      label(x, 800, 620, lt > 1.2 ? 'CANVAS #2' : 'CANVAS #1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 1.2 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) sparkles(x, t, 800, 800, P.t0 + 1.25, 7, 180, 0.4)
    } },
  { sign: 'pisces', cap: 'Dropped the hobby? | *Pick it back up.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: STAR, tears: 1, hops: [1.5],
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.4, 1.4))
      drawBits(x, YARN, YARN_C, lerp(900, 560, r), 1090, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -r * 6 })
      x.save(); x.strokeStyle = PINK; x.lineWidth = 6; x.beginPath(); x.moveTo(950, 1140); x.lineTo(lerp(900, 560, r) + 50, 1130); x.stroke(); x.restore()
      label(x, 770, 700, 'WELCOME BACK', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'New city, new start? | *Brave, not lost.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, tears: 2,
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 800, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1000, 'FRAGILE: FEELINGS', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: RED, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 690, 'NEW KEYS ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Changed your mind? | *That’s growing.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: STAR, tears: 1, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plant(x, t, 800, 1060, ease.outCubic(prog(lt, 0.3, 1.6)), 0, 1.5)
      label(x, 800, 690, 'PLAN B: SPROUTING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Lost your streak? | *Day one still counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, tears: lt => lt > 1.2 ? 1 : 3,
    front(x, t, lt, P) {
      const fresh = lt > 1.1
      dayPage(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), fresh ? '1' : '0', fresh ? 'DAY' : 'STREAK')
      if (fresh) label(x, 800, 1090, 'STILL A DAY ✦', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Deleted the draft? | *Fresh page, fresh you.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: STAR, tears: 1,
    front(x, t, lt, P) {
      page(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.1)
      if (lt > 1.1) sparkles(x, t, 800, 880, P.t0 + 1.15, 6, 190, 0.6)
    } },
  { sign: 'pisces', cap: 'A friendship drifted? | *Say hi first.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: STAR, tears: lt => lt > 1.5 ? 2 : 1, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'hey, stranger :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 740, 880, 'I MISSED YOU!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      const k = pop01(t, P.t0 + 1.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 840, 1080, 160 * k, { mood: 'heart', look: [-1, 0], seed: 27, glyph: false, hops: [P.t0 + 1.8] })
    } },
  { sign: 'pisces', cap: 'Missed the bus? | *Another one’s coming.*', mood: lt => lt > 1.6 ? 'sparkle' : 'wide', look: [1, 0], star: STAR, tears: lt => lt > 1.6 ? 1 : 3,
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.2, 0.9)), come = ease.outCubic(prog(lt, 1.3, 2.0))
      if (go < 1) drawBits(x, BUS, BUS_C, lerp(780, 900, go), 1060, 20, { alpha: 1 - go })
      if (lt > 1.3) drawBits(x, BUS, BUS_C, lerp(640, 780, come), 1060, 20, { alpha: come })
      label(x, 800, 700, lt > 1.3 ? 'NEXT BUS: NOW' : 'BUS: GONE', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: lt > 1.3 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried about it? | *Now try again.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: lt => lt > 1.5 ? [1, -1] : [0, 1], star: STAR, tears: lt => lt > 1.5 ? 1 : 3, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const up = ease.outCubic(prog(lt, 0.6, 1.6))
      drawBits(x, SUN, SUN_C, 800, lerp(1120, 900, up), 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 800, 680, 'NEW DAY: LOADING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0402', key: 'F', accent: SEA, solo: 'pisces', ending: 'callback',
  title: 'Pisces, it’s okay | *to start over.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh start. | *Same big heart.*', mood: 'heart' },
  last: {
    text: 'And plan B? | *Fully bloomed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 380, 1110, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, tears: 2, hops: [t - lt + 1.4] })
      plant(x, t, 720, 1220, pop01(t, t - lt + 0.5, 0.4, 1.6), ease.outBack ? ease.outBack(clamp((lt - 1.1) / 0.5)) : clamp((lt - 1.1) / 0.5), 1.15)
      hearts(x, t, 620, 1000, t - lt + 1.5, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
