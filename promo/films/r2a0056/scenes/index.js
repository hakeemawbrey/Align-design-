// r2a0056: star_advice, ADVICE SOLO, "Aries, this is your sign | to call home." (~49 s vertical, signs3kit, music: lofi · D)
// One sign the whole film (solo mode, 9 cards): a relatable Aries truth + a warm reframe, one visual gag each.
//   0.0–3.6    "Aries, this is your sign | *to call home.*"
//   3.6–37.8   always on the go (MISSED: HOME ×3) · texts in caps (OK!!!!!) · won today (CALL GRANDMA) · Mercury busy
//              (phones still work) · the old room (KEPT AS IS) · hard to say sorry (hi. miss you.) · did something brave
//              (your drawing on the fridge) · can't sit still (pace while you talk: LAP 12) · ten minutes is plenty (10:00)
//  37.8        "Fast. Brave. Busy. | *Still loved.*"
//  41.0        LESSON: "Home is where you | never *have to win.*"  STATUS: CALLED
//  46.9        "Go on. | *They'll pick up.*"
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff6b4a', BROWN = '#8a4a2e', GREEN = '#7ee08a'

const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK', 'KKKKKKKKK']
const PHONE_C = { K: '#2a2350', S: SKYB, W: BONE }
const TROPHY = ['YYYYYYYYYYY', 'Y.YYYYYYY.Y', 'Y.YYYYYYY.Y', '.YYYYYYYYY.', '..YYYYYYY..', '....YYY....', '....YYY....', '...YYYYY...', '..KKKKKKK..', '..KKKKKKK..']
const BED = ['P.............', 'P.............', 'PWWW..........', 'PWWWRRRRRRRRRR', 'PRRRRRRRRRRRRR', 'PRRRRRRRRRRRRR', 'PBBBBBBBBBBBBP', 'P............P']
const BED_C = { P: BROWN, W: BONE, R: RED, B: '#5a3a2a' }
const POSTER = ['GGGGGGGGGG', 'G........G', 'G...YY...G', 'G..YYYY..G', 'G.YYYYYY.G', 'G...YY...G', 'G..Y..Y..G', 'G........G', 'GGGGGGGGGG']
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -236, 252, 472)
  x.fillStyle = '#e8eef5'; x.fillRect(-118, -228, 236, 456)
  x.fillStyle = '#b8c2d0'; x.fillRect(-118, -70, 236, 8); x.fillRect(84, -190, 12, 90); x.fillRect(84, -30, 12, 120)
  const d = ease.outBack ? pop01(lt, 0.6, 0.3, 2) : 1
  if (d > 0.01) {
    x.save(); x.translate(-10, 40); x.rotate(-0.06); x.scale(d, d)
    x.fillStyle = INK; x.fillRect(-84, -94, 168, 188); x.fillStyle = BONE; x.fillRect(-78, -88, 156, 176)
    drawBits(x, POSTER.slice(1, 8).map(r => r.slice(1, 9)), { Y: RED, G: GOLD }, 0, 0, 16, { outline: null })
    x.fillStyle = RED; x.beginPath(); x.arc(0, -96, 12, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Always on the go? | *Home misses you.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? Math.sin(t * 50) * 0.05 : 0.04 })
      label(x, 790, 1100, 'MISSED: HOME ×3', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You text in caps. | A call is *warmer.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'OK!!!!!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      label(x, 790, 980, '☏ CALL INSTEAD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Won something today? | *Tell your people.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: BROWN }, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 820, P.t0 + 0.6, 7, 170, 0.3)
      label(x, 790, 1090, 'CALL GRANDMA', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: S, cap: "Mercury's acting up? | *Phones still work.*", mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, '☿ MERCURY: BUSY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, PHONE, PHONE_C, 790, 900, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 1100, '✓ CONNECTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Miss your old room? | *It misses you too.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 720, 'KEPT AS IS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hard to say sorry? | *Hello works too.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hi. | miss you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Did something brave? | *They’re so proud.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      fridge(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1130, 'ON THE FRIDGE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: "Can't sit still? | *Pace while you talk.*", mood: 'happy', star: { x: 0, y: 0 }, hops: [0.5, 1.0, 1.5, 2.0],
    look: lt => [Math.cos(lt * 2.6) > 0 ? 1 : -1, 0],
    back(x, t, lt, P) {
      for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(230 + i * 85, 1150 + (i % 2) * 22, 26, 16) }
    },
    front(x, t, lt, P) {
      label(x, 540, 600, 'LAP 12', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: RED, color: BONE, font: MONO, weight: 700 })
      bubble(x, 790, 760, 'anyway, mom—', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Only got ten minutes? | *That’s plenty.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 820, '10:00', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 80, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 990, 'BEST MINUTES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0056', key: 'D', accent: RED, solo: S, ending: 'lesson',
  title: 'Aries, this is your | sign *to call home.*',
  cameos: CAMEOS,
  group: { cap: 'Fast. Brave. Busy. | *Still loved.*', mood: 'heart' },
  lesson: { text: 'Home is where you | never *have to win.*', chip: 'STATUS: CALLED' },
  last: { text: 'Go on. | *They’ll pick up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
