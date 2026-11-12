// r2a0050: THE SIGNS AS… v3, advice roll call, "Homesick? | Here’s what helps." (what each sign needs) (~62 s, signs3kit, lofi · G)
// Twelve signs, zodiac order: one warm, specific thing each sign needs when they miss home. Ending: lesson.
//   0.0–3.6    "Homesick? | Here’s what *helps.*"
//   3.6–49.2   ♈ one small thing to do · ♉ a taste of home cooking (pot) · ♊ a two-hour call home · ♋ old photos
//              · ♌ to hear "we missed you!" · ♍ their routine, rebuilt here · ♎ make this place pretty (plant)
//              · ♏ permission to feel it · ♐ a pin: anywhere can be home · ♑ to hear they're doing great
//              · ♒ their people, any time zone · ♓ a song from back home (crying)
//  49.2        "Missing home | *means you loved it.*"
//  52.4        LESSON: "Home isn’t far. | It’s *who you call.*"  STATUS: MISSED YOU TOO
//  58.3        "Call home. | *They’d love that.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', GREEN = '#5fd068', WOOD = '#8a4a2e', SLATE = '#9aa5c4', WARM = '#ffc27a'

const POT = [
  '.S..S..S.',
  'S..S..S..',
  '.........',
  '..KKKKK..',
  'KKRRRRRKK',
  '.RRRRRRR.',
  '.RRRRRRR.',
  '.RRRRRRR.',
  '..RRRRR..',
]
const POT_C = { S: '#ffffff', K: INK, R: RED }
const PLANT = [
  '..G...G..',
  '.GGG.GGG.',
  '..GGGGG..',
  '...GGG...',
  '....G....',
  '.TTTTTTT.',
  '.TTTTTTT.',
  '..TTTTT..',
  '..TTTTT..',
]
const PLANT_C = { G: GREEN, T: '#d9774a' }
const PIN = [
  '..RRRR..',
  '.RRRRRR.',
  'RRRWWRRR',
  'RRRWWRRR',
  '.RRRRRR.',
  '..RRRR..',
  '...RR...',
  '...RR...',
]
const PIN_C = { R: RED, W: '#fff4e2' }
const CLOCK = [
  '..KKKKK..',
  '.KWWWWWK.',
  'KWWWKWWWK',
  'KWWWKWWWK',
  'KWWWKKKWK',
  'KWWWWWWWK',
  '.KWWWWWK.',
  '..KKKKK..',
]

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-158, -214, 328, 440)
  x.fillStyle = INK; x.fillRect(-170, -226, 340, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -216, 320, 432)
  x.fillStyle = '#140c30'; x.fillRect(-146, -186, 292, 372)
  if (head) { x.fillStyle = headCol; x.fillRect(-146, -186, 292, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -158) }
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(0, -60 + i * 100); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -32, w + 8, 64); x.fillStyle = col; x.fillRect(-w / 2, -28, w, 56)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
    x.restore()
  })
  x.restore()
}
// a polaroid with little stars inside
function photo(x, t, cx, cy, k, ids, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -146, 272, 300); x.fillStyle = '#fff4e2'; x.fillRect(-128, -138, 256, 284)
  x.fillStyle = '#2a4a7a'; x.fillRect(-110, -120, 220, 200)
  x.restore()
  ids.forEach((id, i) => signChar(x, t, id, cx - 50 * (ids.length - 1) / 2 * 1.4 + i * 70 + Math.sin(rot) * 20, cy - 20, 80 * k, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.5 }))
}

const CAMEOS = [
  { sign: 'aries', cap: 'One small thing | *to do today.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      label(x, 790, 780, 'TODAY: BAKE BREAD', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 960, '✓ DONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A taste | *of home cooking.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1110, 'GRANDMA’S RECIPE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: WARM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A long call | *with home.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 134)
      phone(x, 770, 850, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, { head: 'HOME ♥', headCol: PINK, lines: [
        ['on a call', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        [`${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`, GOLD, pop01(t, P.t0 + 0.7, 0.25, 2.2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Old photos. | *And a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      photo(x, t, 800, 860, pop01(t, P.t0 + 0.3, 0.35, 2), ['cancer', 'taurus', 'leo'], 0.05)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'To hear | *“we missed you!”*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 820, 'WE MISSED | YOU!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 50, tail: 'bl' })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 220, 0.3)
    } },
  { sign: 'virgo', cap: 'Their routine, | *rebuilt here.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const L = ['7:00 TEA', '7:15 WALK', '7:40 PLAN']
      L.forEach((l, i) => label(x, 790, 720 + i * 120, l, pop01(t, P.t0 + 0.4 + i * 0.4, 0.3, 2.2), { size: 36, bg: [MINT, SKYB, GOLD][i], rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Make this place | *pretty.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 180, 0.4, [PINK, MINT, BONE])
      label(x, 790, 660, 'COZY: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Permission | *to feel it.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 820, 'FEELINGS: ALLOWED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'take your time', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Proof anywhere | *can be home.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.4, 1.0)) : ease.outCubic(prog(lt, 0.4, 1.0))
      if (lt > 0.35) drawBits(x, PIN, PIN_C, 790, lerp(520, 860, d), 22)
      label(x, 790, 1060, 'HOME (FOR NOW) ♥', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'To hear | *they’re doing great.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'so proud | of you', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1000, '★ GOLD STAR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their people. | *Any time zone.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { K: INK, W: '#fff4e2' }, 700, 820, 16 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.08 })
      drawBits(x, CLOCK, { K: INK, W: SKYB }, 880, 820, 16 * pop01(t, P.t0 + 0.5, 0.35, 2), { rot: 0.08 })
      label(x, 790, 1040, 'HERE 3 A.M. · HOME 9 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A song | *from back home.*', mood: lt => lt < 1.0 ? 'sleepy' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 980, { n: 6, cell: 10, col: LAV, seed: 2 })
      label(x, 790, 700, '♪ ON REPEAT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0050', key: 'G', accent: WARM, ending: 'lesson',
  title: 'Homesick? | Here’s what *helps.*',
  cameos: CAMEOS,
  group: { cap: 'Missing home | means *you loved it.*' },
  lesson: { text: 'Home isn’t far. | It’s *who you call.*', chip: 'STATUS: MISSED YOU TOO' },
  last: {
    text: 'Call home. | *They’d love that.*',
    draw(x, t, lt) { hearts(x, t, 540, 1560, t - lt + 0.4, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
