// v3a080: zodiac.advice444, ADVICE SOLO, "Sag, read this | before your date." (batch hook "Sagittarius, read this | before your next date.", shortened to fit two lines) (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Sagittarius dating truth, a warm reframe, one gag each.
//   0.0–3.6    "Sag, read this | *before your date.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              passport stamped DATE 1: THE PARK · "nice shirt… mostly!" gets a FILTER: ON sticker · a giant pixel ear
//              (listening mode) · the date-plan scroll that will not stop unrolling · a map with a wandering dotted path
//              · a birdcage, door wide open, with a cushion inside · NEW MATCH: VIRGO (earth sign? give it a chance)
//              · their joke fills the laugh meter · an arrow lands in a heart target: SECOND DATE?
//  37.8        GROUP ENDING: "Bring the adventure. | *Stay for dessert.*"  Sagittarius comes back, heart-eyed.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ff9f5a', RED = '#e23d4e', NAVY = '#2a3f8f'
const S = 'sagittarius'

// ── props
const EAR = [
  '..PPPPP...',
  '.PPPPPPP..',
  'PPPpppPPP.',
  'PPp...pPPP',
  'PPp.PP.pPP',
  'PPP..P.pPP',
  '.PPP.P.pPP',
  '..PPPp.pPP',
  '....Pp.PP.',
  '...PPppPP.',
  '...PPPPP..',
  '....PPP...',
]
const EAR_C = { P: '#ffc9a8', p: '#e8957a' }
const ARROW = [
  'FF.........',
  '.FF........',
  'FFSSSSSSSHH',
  '.FF.....HHH',
  'FF......H..',
]

// a passport, open, with one round stamp
function passport(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -120, 356, 260)
  x.fillStyle = INK; x.fillRect(-182, -132, 364, 264)
  x.fillStyle = NAVY; x.fillRect(-174, -124, 348, 248)
  x.fillStyle = '#fff4e2'; x.fillRect(-160, -110, 156, 220); x.fillRect(4, -110, 156, 220)
  x.fillStyle = '#c9c0b0'; for (let i = 0; i < 5; i++) { x.fillRect(-146, -80 + i * 36, 128, 6) }
  if (stamp > 0.01) {
    x.save(); x.translate(82, 0); x.rotate(-0.25); x.scale(stamp, stamp)
    x.strokeStyle = '#2f9e5a'; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke()
    x.fillStyle = '#2f9e5a'; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `800 26px ${INTER}`; x.fillText('DATE 1', 0, -16)
    x.font = `700 20px ${MONO}`; x.fillText('THE PARK', 0, 18)
    x.restore()
  }
  x.restore()
}
// a scroll of date ideas that keeps unrolling down the panel
function itinerary(x, cx, top, k, p) {
  if (k <= 0.01) return
  const ITEMS = ['1. coffee', '2. hike', '3. museum', '4. boat ride', '5. zip line', '6. tacos', '7. sunrise?']
  const h = lerp(60, 600, p)
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, 0, 268, h + 8)
  x.fillStyle = '#fff4e2'; x.fillRect(-126, 0, 252, h)
  x.save(); x.beginPath(); x.rect(-126, 0, 252, h); x.clip()
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ITEMS.forEach((s, i) => x.fillText(s, -104, 46 + i * 80))
  x.restore()
  // the roll at the bottom
  x.fillStyle = INK; x.fillRect(-150, h - 14, 300, 44); x.fillStyle = '#e8dcc4'; x.fillRect(-144, h - 8, 288, 32)
  x.fillStyle = INK; x.fillRect(-150, -22, 300, 34); x.fillStyle = '#e8dcc4'; x.fillRect(-144, -16, 288, 22)
  x.restore()
}
// a little map with a dotted path that wanders everywhere before reaching the heart pin
function map(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-180, -170, 376, 356)
  x.fillStyle = INK; x.fillRect(-192, -182, 384, 364)
  x.fillStyle = '#d9f2c4'; x.fillRect(-184, -174, 368, 348)
  x.fillStyle = '#a8d8f0'; x.fillRect(60, -174, 124, 120)
  x.fillStyle = '#b8e0a0'; x.fillRect(-170, 60, 120, 100)
  const PTS = [[-150, 140], [-100, -120], [120, -140], [150, 80], [-40, 30], [20, 150], [100, 120]]
  const total = PTS.length - 1, upto = p * total
  x.fillStyle = RED
  for (let s = 0; s < total; s++) {
    if (s > upto) break
    const [ax, ay] = PTS[s], [bx, by] = PTS[s + 1], frac = Math.min(1, upto - s)
    for (let q = 0; q <= 10 * frac; q++) { const u = q / 10; x.fillRect(ax + (bx - ax) * u - 5, ay + (by - ay) * u - 5, 10, 10) }
  }
  x.restore()
  if (p > 0.95) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx + 100, cy + 100, 9)
}
// a birdcage with its door swung open and a cushion inside
function cage(x, cx, cy, k, door) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 150, 300, 24); x.fillStyle = GOLD; x.fillRect(-144, 154, 288, 16)
  x.fillStyle = PINK; x.fillRect(-90, 112, 180, 40); x.fillStyle = '#ffd0df'; x.fillRect(-80, 116, 160, 14)
  x.strokeStyle = GOLD; x.lineWidth = 8
  x.beginPath(); x.arc(0, -40, 140, Math.PI, 0); x.stroke()
  for (let i = -3; i <= 3; i++) { if (i === 1 || i === 2) continue; x.beginPath(); x.moveTo(i * 40, i === 0 ? -180 : -40 - Math.sqrt(Math.max(0, 140 * 140 - (i * 40) ** 2))); x.lineTo(i * 40, 150); x.stroke() }
  x.beginPath(); x.moveTo(-140, -40); x.lineTo(-140, 150); x.moveTo(140, -40); x.lineTo(140, 150); x.stroke()
  // the door: swings out to the right
  x.save(); x.translate(100, 150); x.rotate(-door * 1.2)
  x.strokeStyle = '#ffe7a8'; x.lineWidth = 7
  x.strokeRect(-60, -160, 60, 160)
  x.restore()
  x.fillStyle = INK; x.fillRect(-14, -206, 28, 30); x.fillStyle = GOLD; x.fillRect(-8, -200, 16, 18)
  x.restore()
}
// a phone with a match notification
function matchPhone(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = MINT; x.fillRect(-92, -120, 184, 150)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('✦ NEW MATCH', 0, -94)
  x.font = `800 40px ${INTER}`; x.fillText('♍︎ VIRGO', 0, -36)
  x.font = `700 20px ${MONO}`; x.fillText('(earth sign)', 0, 6)
  x.restore()
}
// a laugh meter that fills up for THEIR joke
function meter(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-70, -230, 140, 460)
  x.fillStyle = '#140c30'; x.fillRect(-58, -218, 116, 436)
  const n = Math.floor(clamp(p) * 8)
  const COLS = [MINT, MINT, '#c9f27a', GOLD, GOLD, ORANGE, PINK, PINK]
  for (let i = 0; i < 8; i++) { x.fillStyle = i < n ? COLS[i] : '#2a2350'; x.fillRect(-48, 166 - i * 52, 96, 42) }
  x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOL-O-METER', 0, 262)
  x.restore()
}
// a round target with a heart bullseye
function target(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const R = [150, 116, 82, 48], C = ['#fff4e2', RED, '#fff4e2', RED]
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 158, 0, Math.PI * 2); x.fill()
  R.forEach((r, i) => { x.fillStyle = C[i]; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill() })
  x.restore()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, cx, cy + 4, 8 * k)
}

const CAMEOS = [
  { sign: S, cap: 'Not every date | *needs a passport.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      passport(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.2, 0.3, 2.6))
      label(x, 790, 1060, 'LOCAL IS CUTE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honest is hot. | *Kind is hotter.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 760, 740, 'nice shirt… | mostly!', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 960, 'FILTER: ON', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: PINK, rot: -0.06 })
      sparkles(x, t, 790, 960, P.t0 + 1.35, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Let them talk. | *Ask the follow-up.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, EAR, EAR_C, 800, 830, 26 * k * (1 + 0.04 * Math.sin(t * 6)))
      label(x, 800, 1110, 'LISTENING MODE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 780, 570, 'wait, and THEN?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'One plan is enough. | *Promise.*', mood: lt => lt > 1.6 ? 'squint' : 'sparkle', star: { x: -200 }, hops: [0.7],
    front(x, t, lt, P) {
      itinerary(x, 790, 540, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 2.0)))
      label(x, 380, 600, 'PLAN B… C… D…', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got lost on the way? | *Charming,* honestly.', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      map(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutQuad(prog(lt, 0.4, 1.8)))
      label(x, 790, 1080, 'SCENIC ROUTE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: ORANGE, rot: 0.04 })
    } },
  { sign: S, cap: 'Staying isn’t a cage. | *The door’s open.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      cage(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.8, 1.4)))
      label(x, 800, 1090, 'COMFY, ACTUALLY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not a fire sign? | *Still worth a coffee.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      matchPhone(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'GIVE IT A CHANCE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Your jokes land. | *Let theirs land too.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', star: { x: -200 }, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      bubble(x, 760, 560, 'their joke:', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      meter(x, 820, 870, pop01(t, P.t0 + 0.3, 0.3, 2), prog(lt, 0.6, 1.8))
      label(x, 450, 640, 'HA! HA!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.08 })
    } },
  { sign: S, cap: 'Want a second date? | *Say so.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      target(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      const a = ease.outCubic(prog(lt, 0.5, 1.0))
      if (lt > 0.45) drawBits(x, ARROW, { F: PINK, S: '#c98f2a', H: '#d8dbe8' }, lerp(420, 720, a), lerp(760, 820, a), 11, { rot: 0.05 })
      sparkles(x, t, 800, 820, P.t0 + 1.0 * (3.1 / 2.4), 8, 190, 0.4)
      label(x, 800, 1070, 'BULLSEYE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a080', key: 'C', accent: ORANGE, solo: S, ending: 'group',
  title: 'Sag, read this | *before your date.*',
  cameos: CAMEOS,
  group: { cap: 'Bring the adventure. | *Stay for dessert.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
