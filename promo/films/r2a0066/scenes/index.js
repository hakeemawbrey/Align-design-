// r2a0066: star_advice, ADVICE SOLO, "What Cancers need | on a bad day." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "What Cancers need | *on a bad day.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              bottled it up all day (the FEELINGS jar, lid off) · replaying one comment (REPLAY #47, then pause)
//              · the old blanket (no shame) · the comfort show, episode one again · cancelled plans (the couch understands)
//              · cried in the car (a reset bar fills) · a match asks "you okay?" (tell the truth; snacks incoming)
//              · even the moon has off nights · tomorrow is a fresh tide
//  37.8        "Bad day. | *Not a bad you.*"  Cancer comes back, big.
//  41.2        CALLBACK: "The old blanket? | *Still undefeated.*"  Cancer wrapped in the patchwork blanket.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', TIDE = '#9fd8ff', S = 'cancer'

// ── props
const JAR = [
  '..GGGGGGGG..',
  '.GWWWWWWWWG.',
  'GWWWWWWWWWWG',
  'GWPPPPPPPPWG',
  'GWPPPPPPPPWG',
  'GWPPPPPPPPWG',
  'GWPPPPPPPPWG',
  'GWPPPPPPPPWG',
  'GWPPPPPPPPWG',
  '.GGGGGGGGGG.',
]
const JAR_C = { G: '#cfe8ff', W: 'rgba(207,232,255,0.25)', P: '#c9a6ff' }
const LID = ['.LLLLLLLL.', 'LLLLLLLLLL', 'LLLLLLLLLL']
const BLANKET = [
  'AAAABBBBCCCCDDDD',
  'AAAABBBBCCCCDDDD',
  'AAAABBBBCCCCDDDD',
  'CCCCDDDDAAAABBBB',
  'CCCCDDDDAAAABBBB',
  'CCCCDDDDAAAABBBB',
  'BBBBAAAADDDDCCCC',
  'BBBBAAAADDDDCCCC',
]
const BLANKET_C = { A: '#ff8fb1', B: '#8fe3ff', C: '#ffd23a', D: '#7dffb0' }
const TV = [
  'GGGGGGGGGGGGGGG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GGGGGGGGGGGGGGG',
  '.....GGGGG.....',
  '...GGGGGGGGG...',
]
const TV_C = { G: '#e0a56a', S: '#2a3d6a' }
const COUCH = [
  '..CCCCCCCCCCCC..',
  '..CCCCCCCCCCCC..',
  'AACCCCCCCCCCCCAA',
  'AAPPPPPPPPPPPPAA',
  'AAPPPPPPPPPPPPAA',
  'AAAAAAAAAAAAAAAA',
  '.K............K.',
]
const COUCH_C = { C: '#c97bff', A: '#a35fd6', P: '#d9a6ff', K: INK }
const MOON = [
  '....MMMM...',
  '..MMMMM....',
  '.MMMMM.....',
  'MMMMMM.....',
  'MMMKKM.....',
  'MMMMMM.....',
  'MMMMMM.....',
  '.MMMMMM....',
  '..MMMMMMM..',
  '....MMMM...',
]
const MOON_C = { M: '#fff1c8', K: INK }
const WAVE = [
  '...WW.....WW.....WW..',
  '..WBBW...WBBW...WBBW.',
  '.WBBBBW.WBBBBW.WBBBBW',
  'BBBBBBBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBBBBBBBB',
  'DDDDDDDDDDDDDDDDDDDDD',
]
const WAVE_C = { W: CREAM, B: '#6fc3ff', D: '#3a7fc2' }
const SUN = ['...YYYY...', '..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYYY']

// a phone with a short chat
function phone(x, cx, cy, k, { head = '✦ YOUR MATCH', headCol = MINT, lines = [] } = {}) {
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
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 70); x.scale(kk, kk)
    x.font = `800 24px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a cassette-style replay counter that gets paused
function replay(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const paused = lt > 1.3
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -92, 310, 196)
  x.fillStyle = INK; x.fillRect(-160, -102, 320, 204)
  x.fillStyle = '#ff9a4a'; x.fillRect(-152, -94, 304, 188)
  x.fillStyle = CREAM; x.fillRect(-120, -70, 240, 50)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“interesting…”', 0, -44)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 62, 34); if (!paused) x.rotate(t * 6)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = CREAM; x.fillRect(-6, -26, 12, 52); x.fillRect(-26, -6, 52, 12)
    x.restore()
  }
  x.restore()
}
// a struck-through list of plans
function plans(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -110, 248, 232)
  x.fillStyle = INK; x.fillRect(-128, -120, 256, 240); x.fillStyle = CREAM; x.fillRect(-120, -112, 240, 224)
  x.fillStyle = '#e23d4e'; x.fillRect(-120, -112, 240, 44)
  x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TONIGHT', 0, -90)
  const L = ['brunch', 'party', 'errands']
  L.forEach((s, i) => {
    const y = -34 + i * 52
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText(s, 0, y)
    const p = clamp((lt - 0.5 - i * 0.25) / 0.2)
    if (p > 0) { x.fillStyle = '#e23d4e'; x.fillRect(-80, y - 3, 160 * p, 7) }
  })
  x.restore()
}
// a reset bar filling up
function resetBar(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -40, 320, 80); x.fillStyle = '#140c30'; x.fillRect(-152, -32, 304, 64)
  x.fillStyle = MINT; x.fillRect(-146, -26, 292 * p, 52)
  for (let i = 1; i < 8; i++) { x.fillStyle = 'rgba(20,12,48,0.5)'; x.fillRect(-146 + i * 36.5, -26, 4, 52) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Bottled it up all day? | *Open the jar.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), up = ease.outCubic(prog(lt, 1.0, 1.4))
      const shake = lt < 1.0 ? Math.sin(t * 40) * 4 * clamp(lt - 0.4) : 0
      drawBits(x, JAR, JAR_C, 790 + shake, 960, 22 * k)
      drawBits(x, LID, { L: GOLD }, 790 + shake + 60 * up, 838 - 160 * up, 22 * k, { rot: 0.9 * up })
      if (k > 0.5) { x.save(); x.translate(790, 990); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FEELINGS', 0, 0); x.restore() }
      hearts(x, t, 790, 860, P.t0 + 1.1, { n: 7, life: 1.6, spread: 200, cell: 7, seed: 2 })
      label(x, 790, 1160, 'LID: OFF. PHEW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Replaying one comment? | *Press pause.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      replay(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 650, lt > 1.3 ? 'PAUSED' : `REPLAY #${40 + Math.min(7, Math.floor(lt * 6))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: lt > 1.3 ? MINT : PINK, rot: 0.04, font: MONO, weight: 700 })
      const pk = pop01(t, P.t0 + 1.3, 0.3, 2.4)
      if (pk > 0.01) { x.save(); x.translate(790, 1100); x.scale(pk, pk); x.fillStyle = INK; x.fillRect(-56, -56, 112, 112); x.fillStyle = CREAM; x.fillRect(-48, -48, 96, 96); x.fillStyle = INK; x.fillRect(-26, -30, 18, 60); x.fillRect(8, -30, 18, 60); x.restore() }
    } },
  { sign: S, cap: 'Need your old blanket? | *No shame.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190, y: -20 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      drawBits(x, BLANKET, BLANKET_C, F.x + 10, F.cy + 90, 16 * k, { rot: 0.03 * Math.sin(t * 2) })
      label(x, 800, 720, 'AGE: 31', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 840, 'BLANKET: 31', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, F.x, F.cy - 80, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'The comfort show again? | *Episode one it is.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, TV_C, 790, 860, 20 * k)
      if (k > 0.5) { x.save(); x.translate(790, 830); x.globalAlpha = clamp((k - 0.5) * 2); x.fillStyle = CREAM; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('S1 · E1', 0, 0); x.restore() }
      label(x, 790, 1100, 'WATCHED: 14 TIMES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 830, P.t0 + 0.6, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Cancelled your plans? | *The couch understands.*', mood: lt => lt > 1.5 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      plans(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      drawBits(x, COUCH, COUCH_C, 790, 1070, 19 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 790, 1180, 'COUCH: HONOURED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cried in the car? | *That’s a reset.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt < 1.3 ? 2 : 0, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 720, 'SYSTEM RESET', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      resetBar(x, 790, 880, pop01(t, P.t0 + 0.3, 0.3, 2), clamp((lt - 0.4) / 1.1))
      label(x, 790, 1050, 'DONE. FRESH.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.55, 8, 180, 0.2)
    } },
  { sign: S, cap: 'Someone asks “you okay?” | *Tell the truth.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.6, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { lines: [
        ['you okay?', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['honestly? no', BONE, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['on my way', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
        ['w/ snacks', PINK, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 880, P.t0 + 1.6, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Even the moon | *has off nights.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, -1], star: { x: -200, y: 30 },
    front(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 800, 820 + Math.sin(t * 1.5) * 8, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.1 })
      bubble(x, 560, 620, 'same, moon.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 800, 1100, 'MOON: RESTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Tomorrow is | *a fresh tide.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200, y: -40 }, hops: [1.3],
    front(x, t, lt, P) {
      const rise = ease.outCubic(prog(lt, 0.3, 1.4))
      x.save(); x.beginPath(); x.rect(120, 480, 840, 610); x.clip()
      drawBits(x, SUN, { Y: GOLD }, 790, 1060 - 200 * rise, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.restore()
      drawBits(x, WAVE, WAVE_C, 540 + 20 * Math.sin(t * 2), 1100, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 620, 'TIDE: TURNING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: TIDE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0066', key: 'D', accent: TIDE, solo: S, ending: 'callback',
  title: 'What Cancers need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Bad day. | *Not a bad you.*', mood: 'sparkle' },
  last: {
    text: 'The old blanket? | *Still undefeated.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1080, 260 * k, { mood: 'heart', seed: 40, hops: [t0 + 1.3], glyph: false })
      drawBits(x, BLANKET, BLANKET_C, 540, 1210, 22 * pop01(t, t0 + 0.7, 0.35, 2), { rot: 0.03 * Math.sin(t * 2) })
      hearts(x, t, 540, 960, t0 + 1.2, { n: 7, life: 1.8, spread: 300, cell: 7, seed: 8 })
      label(x, 540, 1400, 'CHAMPION: SINCE AGE 3', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
