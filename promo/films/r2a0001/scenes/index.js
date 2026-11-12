// r2a0001: star_advice, ADVICE SOLO, "Libra, you can't fix | everyone." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm reframe, one gag each.
//   0.0–3.6    "Libra, you can’t fix | *everyone.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              mediating the group chat (you can mute it) · two friends fighting (not your job: off duty)
//              · said yes again (a pile of YES notes, then one small "no.") · carrying everyone's bags (put some down)
//              · everyone's happy but you (tick "me" too) · their storm cloud is not your weather
//              · can't pick a restaurant (a coin flip is fine) · a new match wants your real opinion · save some for you (tea, book)
//  37.8        "Kind is enough. | *You* are enough."  Libra comes back, big.
//  41.0        LESSON UNLOCKED: "You can’t fix everyone. | You *can* rest."  STATUS: OFF DUTY
//  46.9        "The group chat? | *Still muted.*"  The muted phone comes back.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ccf', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'
const S = 'libra'

// ── props
const FLAG = [
  'KWWWWWWW',
  'KWWWWWWW',
  'KWWWWWWW',
  'KWWWWWWW',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
  'K.......',
]
const FLAG_C = { K: '#8a4a2e', W: '#ffffff' }
const CLOUD = [
  '....GGGG......',
  '..GGGGGGGG.GG.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
  '..B..B...B..B.',
  '.B..B...B..B..',
]
const CLOUD_C = { G: '#7a7f99', B: SKYB }
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
const CUP = [
  '..s.s....',
  '.s.s.....',
  'WWWWWWW..',
  'WTTTTTWWW',
  'WTTTTTW.W',
  'WTTTTTWWW',
  'WWWWWWW..',
  '.WWWWW...',
]
const CUP_C = { W: CREAM, T: '#c98f6a', s: 'rgba(239,230,214,0.7)' }
const BOOK = [
  'RRRRRRRRRR',
  'RWWWWWWWWR',
  'RWKKKKKKWR',
  'RWWWWWWWWR',
  'RWKKKKKWWR',
  'RWWWWWWWWR',
  'RRRRRRRRRR',
]
const BOOK_C = { R: ROSE, W: CREAM, K: '#b9b0a0' }
const BELL_MUTE = [
  'X...YY....',
  '.X.YYYY...',
  '..XYYYYY..',
  '..YXYYYY..',
  '..YYXYYY..',
  '.YYYYXYYY.',
  'YYYYYYXYYY',
  '....YY.X..',
  '........X.',
]
const BELL_C = { Y: GOLD, X: RED }

// a phone: the group chat (pings piling up) or a match chat
function phone(x, cx, cy, k, { head = 'GROUP CHAT', headCol = LAV, lines = [], muted = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -70 + i * 62); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  if (muted > 0.01) {
    x.fillStyle = `rgba(20,12,48,${(0.75 * muted).toFixed(3)})`; x.fillRect(-112, -110, 224, 280)
    drawBits(x, BELL_MUTE, BELL_C, 0, 40, 12 * muted)
  }
  x.restore()
}
// a pile of sticky notes that all say YES, and one small one that says no
function stickies(x, t, lt, P) {
  const COLS = ['#ffd23a', '#7dffb0', '#8fe3ff', '#ff8fb1', '#ffb34a', '#c9a6ff']
  for (let i = 0; i < 7; i++) {
    const k = pop01(t, P.t0 + 0.15 + i * 0.1, 0.25, 2.2)
    if (k <= 0.01) continue
    const px = 690 + ((i * 53) % 190), py = 680 + ((i * 97) % 300)
    x.save(); x.translate(px, py); x.rotate(Math.sin(i * 1.7) * 0.2); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-64, -54, 128, 108); x.fillStyle = COLS[i % 6]; x.fillRect(-58, -48, 116, 96)
    x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YES', 0, 2)
    x.restore()
  }
}
// a stack of bags in the star's arms, wobbling; some get set down
function bags(x, t, F, lt, k) {
  if (k <= 0.01) return
  const down = ease.inOutCubic(prog(lt, 1.3, 1.8))
  const COLS = [ROSE, SKYB, GOLD, MINT, LAV, '#ffb34a']
  for (let i = 0; i < 6; i++) {
    const kept = i < 2
    const w = 110 - i * 6, h = 64
    let bx = F.x + 170 + Math.sin(t * 4 + i) * 8 * (1 - down) * (i / 5), by = F.cy + 150 - i * 62
    if (!kept) { bx = lerp(bx, 650 + (i - 2) * 72, down); by = lerp(by, 1110 - ((i - 2) % 2) * 20, down) }
    x.save(); x.translate(bx, by); x.scale(k, k); x.rotate(kept ? 0 : lerp(0.05 * Math.sin(i * 3), 0, down))
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = COLS[i]; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(-18, -h / 2 - 18, 36, 8); x.fillRect(-18, -h / 2 - 18, 6, 18); x.fillRect(12, -h / 2 - 18, 6, 18)
    x.restore()
  }
}
// a checklist: friends, family, the dog… and finally me
function checklist(x, t, lt, P) {
  const k = pop01(t, P.t0 + 0.2, 0.3, 2)
  if (k <= 0.01) return
  x.save(); x.translate(790, 850); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -200, 296, 416)
  x.fillStyle = INK; x.fillRect(-152, -212, 304, 424); x.fillStyle = CREAM; x.fillRect(-144, -204, 288, 408)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const ITEMS = ['friends', 'family', 'the dog', 'coworkers', 'ME']
  ITEMS.forEach((it, i) => {
    const y = -150 + i * 76, done = i < 4 ? lt > 0.4 + i * 0.15 : lt > 1.5
    x.fillStyle = INK; x.fillRect(-120, y - 20, 40, 40); x.fillStyle = '#fff'; x.fillRect(-114, y - 14, 28, 28)
    if (done) { x.fillStyle = i === 4 ? RED : '#2fc79a'; x.fillRect(-110, y - 4, 8, 12); x.fillRect(-104, y + 4, 8, 8); x.fillRect(-98, y - 6, 8, 14); x.fillRect(-92, y - 14, 8, 10) }
    x.fillStyle = INK; x.font = `${i === 4 ? 800 : 700} ${i === 4 ? 36 : 30}px ${INTER}`; x.fillText(it, -64, y + 2)
  })
  x.restore()
}
// a coin spinning in the air, landing on heads
function coin(x, t, cx, cy, lt) {
  const up = prog(lt, 0.3, 1.4), y = cy - Math.sin(Math.PI * up) * 220
  const sq = up < 1 ? Math.abs(Math.cos(lt * 14)) : 1
  x.save(); x.translate(cx, y); x.scale(Math.max(0.12, sq), 1)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 55, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c98f2a'; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('H', 0, 2)
  x.restore()
}

const GROUP_LINES = (t, P) => [
  ['who invited him??', ROSE, pop01(t, P.t0 + 0.3, 0.25, 2.2)],
  ['LIBRA HELP', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
  ['ok but she said', SKYB, pop01(t, P.t0 + 0.7, 0.25, 2.2)],
  ['!!!!!', MINT, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
]

const CAMEOS = [
  { sign: S, cap: 'You referee the group chat. | You can *mute it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { lines: GROUP_LINES(t, P), muted: pop01(t, P.t0 + 1.5, 0.3, 2) })
      label(x, 790, 1120, 'MUTED. PEACEFUL.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Friends fighting? | *Not your job.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: { x: 0, y: 40, s: 240 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const a = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (a > 0.01) {
        signChar(x, t, 'aries', 250, 990, 170 * a, { mood: 'eyeroll', look: [1, 0], seed: 21, glyph: false })
        signChar(x, t, 'capricorn', 830, 990, 170 * a, { mood: 'eyeroll', look: [-1, 0], seed: 22, glyph: false })
      }
      const f = pop01(t, P.t0 + 0.9, 0.3, 2)
      drawBits(x, FLAG, FLAG_C, F.x + 110, F.cy - 70, 12 * f, { rot: 0.1 * Math.sin(t * 6) })
      bubble(x, 540, 620, 'I’m just | gonna go.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 540, 1170, 'OFF DUTY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said yes again? | *“No” is allowed.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      stickies(x, t, lt, P)
      const k = pop01(t, P.t0 + 1.4, 0.3, 2.4)
      if (k > 0.01) {
        x.save(); x.translate(400, 640); x.rotate(-0.08); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-60, -46, 120, 92); x.fillStyle = '#fff'; x.fillRect(-54, -40, 108, 80)
        x.fillStyle = RED; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('no.', 0, 2)
        x.restore()
      }
      sparkles(x, t, 400, 640, P.t0 + 1.5, 6, 100, 0.3)
    } },
  { sign: S, cap: 'Carrying everyone’s bags? | *Put some down.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', star: { x: -170, y: 40 }, hops: [1.9],
    front(x, t, lt, P, F) {
      bags(x, t, F, lt, pop01(t, P.t0 + 0.1, 0.35, 2))
      label(x, 800, 640, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone’s happy but you? | *Tick yourself.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      checklist(x, t, lt, P)
      hearts(x, t, 760, 1000, P.t0 + 1.6, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Their storm cloud | *isn’t your weather.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const s = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (s > 0.01) signChar(x, t, 'scorpio', 800, 1000, 180 * s, { mood: 'neutral', look: [0, 1], seed: 23, glyph: false })
      drawBits(x, CLOUD, CLOUD_C, 800, 790 + Math.sin(t * 2) * 6, 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      const sun = pop01(t, P.t0 + 1.3, 0.35, 2)
      drawBits(x, SUN, { Y: GOLD }, 340, 640, 14 * sun, { rot: t * 0.6 })
      label(x, 540, 1160, 'FORECAST: YOU’RE FINE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Can’t pick dinner? | *Any choice is fine.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: lt => [0, lt < 1.4 ? -1 : 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      coin(x, t, 790, 900, lt)
      bubble(x, 790, 660, 'tacos? | pasta? | both?', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.3, 1.45)), { size: 30, col: LAV, tail: 'bl' })
      label(x, 790, 1090, 'HEADS: TACOS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match wants | *your real opinion.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '✦ YOUR MATCH', headCol: MINT, lines: [
        ['what do YOU want?', ROSE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['honestly? pizza', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
        ['YES. same.', ROSE, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 800, P.t0 + 1.7, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'You balance everyone. | *Save some for you.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(640, 1060, 300, 22); x.fillStyle = WOOD; x.fillRect(644, 1064, 292, 14)
      drawBits(x, CUP, CUP_C, 720, 1000, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, BOOK, BOOK_C, 860, 1025, 11 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.05 })
      label(x, 790, 700, 'ME TIME: BOOKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 960, P.t0 + 1.3, 6, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0001', key: 'D', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Libra, you can’t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Kind is enough. | *You* are enough.', mood: 'sparkle' },
  lesson: { text: 'You can’t fix everyone. | You *can* rest.', chip: 'STATUS: OFF DUTY' },
  last: {
    text: 'The group chat? | *Still muted.*',
    draw(x, t, lt) {
      phone(x, 540, 1300, 0.95 * pop01(t, t - lt + 0.6, 0.35, 2), { lines: [['LIBRA??', GOLD, 1], ['hello??', ROSE, 1]], muted: 1 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
