// r2t0642: star_talk, SOLO, "Running late? | Cancers be like." (topic: Cancers running late be like) (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards): every reason a Cancer is late, pushed to the extreme. Ending: lesson.
//   0.0–3.6    "Running late? | Cancers *be like.*"  One big Cancer pops in.
//   3.6–37.8   packed snacks for everyone · said goodbye to the dog, twice · walked a lost duckling home · "5 min away"
//              (still on the couch) · went back for a blanket in case you're cold · called mom on the way, ninety minutes
//              · found an old photo, needed a minute · late to the first date, brought warm cookies · arrived, twenty hugs later
//  37.8        "Late. | But *with snacks.*"  The big Cancer comes back.
//  41.0        LESSON UNLOCKED: "They’re late | *because they care.*"  HEART: ON TIME
//  46.9        "Save them | *a seat.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#4fc3ff', CREAM = '#fff4e2', BROWN = '#8a4a2e', RED = '#e23d4e'
const S = 'cancer'

// ── props
const BAG = [
  '...KKKKKK...',
  '..K......K..',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
  'BBYYYYYYYYBB',
  'BBYRRYYGGYBB',
  'BBYRRYYGGYBB',
  'BBYYYYYYYYBB',
  'BBBBBBBBBBBB',
  'BBBBBBBBBBBB',
]
const BAG_C = { K: INK, B: '#c98f2a', Y: CREAM, R: RED, G: '#5fd068' }
const DOG = [
  'EE.......EE.',
  'EEE.....EEE.',
  '.FFFFFFFFF..',
  '.FKFFFFFKF..',
  '.FFFFNFFFF..',
  '..FFFTFFF...',
  '..FFFFFFFFFT',
  '..FFFFFFFFF.',
  '..F.F...F.F.',
]
const DOG_C = { E: BROWN, F: '#e0a86a', K: INK, N: INK, T: '#e0a86a' }
const DUCK = [
  '...YYY....',
  '..YYKYO...',
  '..YYYYOO..',
  '...YYY....',
  '.YYYYYYYY.',
  'YYYYYYYYYY',
  '.YYYYYYYY.',
  '...O..O...',
]
const DUCK_C = { Y: '#ffe24a', K: INK, O: '#ff9a4a' }
const BLANKET = [
  'PPPPPPPPPPPPPP',
  'PWPPWPPWPPWPPW',
  'PPPPPPPPPPPPPP',
  'LLLLLLLLLLLLLL',
  'PPPPPPPPPPPPPP',
  'PWPPWPPWPPWPPW',
  'PPPPPPPPPPPPPP',
  'W.W.W.W.W.W.W.',
]
const BLANKET_C = { P: SKYB, W: BONE, L: LAV }
const COOKIE = ['.CCCC.', 'CCkCCC', 'CCCCkC', 'CkCCCC', 'CCCkCC', '.CCCC.']
const COOKIE_C = { C: '#e0a86a', k: '#5a2e1a' }

// a phone: a header, a message bubble, an optional big timer
function phone(x, cx, cy, k, { head, headCol = MINT, msg = [], timer, foot }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  x.font = `800 28px ${INTER}`
  msg.forEach((m, i) => { const w = x.measureText(m).width + 30; x.fillStyle = BONE; x.fillRect(-w / 2, -60 + i * 52 - 23, w, 46); x.fillStyle = INK; x.fillText(m, 0, -60 + i * 52 + 2) })
  if (timer) { x.fillStyle = MINT; x.font = `700 42px ${MONO}`; x.fillText(timer, 0, 20) }
  if (foot) { x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText(foot, 0, 120) }
  x.restore()
}
// an old instant photo of two little stars
function photo(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -130, 250, 280)
  x.fillStyle = INK; x.fillRect(-130, -140, 260, 290)
  x.fillStyle = CREAM; x.fillRect(-124, -134, 248, 278)
  x.fillStyle = '#e8c49a'; x.fillRect(-108, -118, 216, 190)
  const st = (px, py, c) => { x.fillStyle = c; x.beginPath(); for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 18 : 40; x.lineTo(px + Math.cos(a) * r, py + Math.sin(a) * r) } x.fill() }
  st(-40, -10, BLUE); st(40, 0, GOLD)
  x.fillStyle = BROWN; x.font = `italic 600 26px Georgia, serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('summer camp ♡', 0, 110)
  x.restore()
}
// a plate of cookies with steam
function cookies(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 170, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 36, 160, 38, 0, 0, Math.PI * 2); x.fill()
  x.restore()
  for (const [dx, dy] of [[-70, 10], [0, -6], [70, 10], [-35, -40], [35, -40]]) drawBits(x, COOKIE, COOKIE_C, cx + dx * k, cy + dy * k, 12 * k)
  if (k > 0.9) {
    x.save(); x.strokeStyle = 'rgba(255,255,255,0.45)'; x.lineWidth = 9; x.lineCap = 'round'
    for (const dx of [-50, 10, 70]) { x.beginPath(); for (let j = 0; j <= 9; j++) { const yy = cy - 80 - j * 10, xx = cx + dx + Math.sin(j * 0.8 + t * 4 + dx) * 9; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
    x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Late because they | *packed everyone snacks.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BAG, BAG_C, 720 + i * 80, 960 - i * 110, 14 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), { rot: (i - 1) * 0.08 })
      label(x, 790, 640, 'SNACKS FOR: 12', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said bye to the dog. | *Then again.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'bye baby. | ok one more.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Found a lost duckling. | *Walked it home.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const w = ease.inOutQuad(prog(lt, 0.4, 2.2))
      drawBits(x, DUCK, DUCK_C, lerp(900, 700, w), 1080 - Math.abs(Math.sin(lt * 9)) * 10, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'DUCK: HOME SAFE', pop01(t, P.t0 + 1.5, 0.3, 2.6), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Five minutes away!” | *Still on the couch.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', msg: ['omw!!', '5 min away'] , foot: 'LOCATION: COUCH' })
    } },
  { sign: S, cap: 'Went back for a blanket. | *In case you’re cold.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, BLANKET_C, 790, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      label(x, 790, 680, 'ALSO: A SPARE', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Called mom on the way. | *Ninety minutes.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const m = Math.min(90, Math.floor(Math.max(0, lt - 0.4) * 50))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM ♡', headCol: PINK, timer: `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:00`, foot: 'STILL TALKING' })
    } },
  { sign: S, cap: 'Found an old photo. | *Needed a minute.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', tears: lt => lt > 1.0 ? 1 : 0, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      photo(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'NOSTALGIA: FULL', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late to the first date. | *Brought warm cookies.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cookies(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 660, '✦ MATCH: FORGIVEN', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally arrived. | *Twenty hugs later.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.min(20, Math.floor(Math.max(0, lt - 0.3) / 0.08))
      label(x, 790, 820, `HUGS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'HELLO: NOT YET', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 540, 1000, P.t0 + 0.6, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0642', key: 'E', accent: BLUE, solo: S, ending: 'lesson',
  title: 'Running late? | Cancers *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late. | But *with snacks.*', mood: 'heart' },
  lesson: { text: 'They’re late | *because they care.*', chip: 'HEART: ON TIME' },
  last: {
    text: 'Save them | *a seat.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
