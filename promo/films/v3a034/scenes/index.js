// v3a034: star_advice, ADVICE SOLO, "Sagittarius, stop doing | this in love." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): the kind, funny "stop doing this" list for a Sagittarius in
// love. The joke is on the habit; every card ends on a warm reframe.
//   0.0–3.6    "Sagittarius, stop | doing *this in love.*"  One big Sagittarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              booking a flight on date one (a boarding pass: ONE WAY?) · honest about the haircut (TOO HONEST)
//              · bolting when it gets real (a suitcase with wheels, a STAY. TALK. sign) · the text from three cities ago
//              · the open cage (DOOR’S OPEN: commitment isn't a cage) · turning feelings into jokes (a rubber chicken, put down)
//              · the bag that's always packed (ALWAYS PACKED) · plans that stop at Friday (a calendar: NEXT MONTH?!)
//              · two boarding passes (Gemini comes along: TWO SEATS)
//  37.8        "Free spirit. | *Big heart.*"  Sagittarius comes back, big.
//  41.0        LESSON UNLOCKED: "Best adventure? | *Staying.*"  HEART: LANDED
//  46.9        "Same flight. | *Same row.*"  (the two passes, paid off)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', ORANGE = '#ff9a4a', CREAM = '#fff4e2'
const S = 'sagittarius'

// a boarding pass
function pass(x, cx, cy, k, { rot = -0.06, dest = 'ANYWHERE', col = ORANGE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-176, -76, 364, 170)
  x.fillStyle = INK; x.fillRect(-184, -90, 368, 180)
  x.fillStyle = CREAM; x.fillRect(-176, -82, 352, 164)
  x.fillStyle = col; x.fillRect(-176, -82, 352, 44)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', -160, -60)
  x.font = `800 40px ${INTER}`; x.fillText(dest, -160, 0)
  x.font = `700 22px ${MONO}`; x.fillText('SEAT 12A · GATE ✦', -160, 50)
  x.setLineDash([8, 8]); x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(110, -82); x.lineTo(110, 82); x.stroke(); x.setLineDash([])
  for (let i = 0; i < 9; i++) x.fillRect(126 + i * 5, -40 + (i % 3) * 4, 3, 90 - (i % 3) * 8)
  x.restore()
}
function scissorsHair(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // a hand mirror
  x.fillStyle = INK; x.fillRect(-16, 60, 32, 150); x.beginPath(); x.ellipse(0, -40, 110, 130, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, -40, 100, 120, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfe9ff'; x.beginPath(); x.ellipse(0, -40, 84, 104, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-50, -110, 18, 70)
  x.restore()
}
function suitcase(x, cx, cy, k, { col = ORANGE, rot = 0, stickers = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-50, -200, 100, 24); x.fillRect(-50, -200, 20, 70); x.fillRect(30, -200, 20, 70)
  x.fillStyle = INK; x.fillRect(-130, -140, 260, 280)
  x.fillStyle = col; x.fillRect(-122, -132, 244, 264)
  x.fillStyle = 'rgba(0,0,0,0.15)'; for (let i = 0; i < 3; i++) x.fillRect(-90 + i * 80, -132, 14, 264)
  if (stickers) { x.fillStyle = MINT; x.fillRect(-100, -100, 70, 50); x.fillStyle = SKYB; x.beginPath(); x.arc(60, 40, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = PINK; x.fillRect(-60, 50, 80, 40) }
  x.fillStyle = INK; x.beginPath(); x.arc(-90, 160, 20, 0, Math.PI * 2); x.arc(90, 160, 20, 0, Math.PI * 2); x.fill()
  x.restore()
}
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-124, -190, 248, 380)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -180, 228, 360)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  lines.forEach(([txt, col, y], i) => { x.fillStyle = col; x.fillRect(-90, y - 28, 180, 56); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, y) })
  x.restore()
}
function cage(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 12
  x.beginPath(); x.arc(0, -60, 140, Math.PI, 0); x.stroke()
  for (let i = -3; i <= 3; i++) { if (i === 2 || i === 3) continue; x.beginPath(); x.moveTo(i * 40, -60 - Math.sqrt(Math.max(0, 140 * 140 - (i * 40) ** 2)) + 4); x.lineTo(i * 40, 140); x.stroke() }
  x.strokeStyle = GOLD; x.lineWidth = 6
  x.beginPath(); x.arc(0, -60, 140, Math.PI, 0); x.stroke()
  for (let i = -3; i <= 3; i++) { if (i === 2 || i === 3) continue; x.beginPath(); x.moveTo(i * 40, -60 - Math.sqrt(Math.max(0, 140 * 140 - (i * 40) ** 2)) + 4); x.lineTo(i * 40, 140); x.stroke() }
  // the door, swung open
  x.save(); x.translate(140, 140); x.scale(Math.cos(open * 1.2), 1)
  x.strokeStyle = GOLD; x.lineWidth = 6; for (let j = 0; j < 3; j++) { x.beginPath(); x.moveTo(-j * 40, 0); x.lineTo(-j * 40, -150); x.stroke() }
  x.restore()
  x.fillStyle = INK; x.fillRect(-160, 136, 320, 24); x.fillStyle = WOOD; x.fillRect(-154, 140, 308, 14)
  x.restore()
}
const CHICKEN = [
  '..RR....',
  '.YYYY...',
  'YYkYYo..',
  'YYYYYoo.',
  '.YYYY...',
  '..YYYY..',
  '..YYYYY.',
  '...YYYYY',
  '....YYY.',
  '....o.o.',
]
function cal(x, cx, cy, k, fill) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = CREAM; x.fillRect(-162, -142, 324, 284)
  x.fillStyle = ORANGE; x.fillRect(-162, -142, 324, 56)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLANS', 0, -114)
  const days = ['M', 'T', 'W', 'T', 'F']
  days.forEach((d, i) => { x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText(d, -120 + i * 60, -60) })
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    const on = r === 0 || (fill && c === 4)
    x.fillStyle = on ? (r === 0 ? MINT : PINK) : 'rgba(27,18,54,0.2)'; x.fillRect(-142 + c * 60, -34 + r * 58, 44, 44)
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Date one | *isn’t a flight.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.4],
    front(x, t, lt, P) {
      pass(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { dest: 'ANYWHERE' })
      label(x, 790, 1080, 'BOOKED AT DESSERT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Honest is good. | *Gentle is better.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      scissorsHair(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 600, 640, 'your haircut | is… brave', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 800, 1140, 'TRY: “IT SUITS YOU!”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'It got real? | *Don’t run. Talk.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.3, 0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const back = ease.inOutCubic(prog(lt, 1.0, 1.4))
      suitcase(x, lerp(930, 790, back) - 14 * Math.sin(lt * 20) * (lt < 1 ? 1 : 0), 980, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.75, { rot: lt < 1 ? 0.08 : 0 })
      label(x, 760, 660, 'STAY. TALK.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: RED, color: '#fff', rot: -0.05 })
    } },
  { sign: S, cap: 'Reply to the text | *from three cities ago.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), [['hey :)', BONE, -100], ['you around?', BONE, -20], ['…hello?', PINK, 60]])
      label(x, 790, 1110, 'SENT: 2 WEEKS AGO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Commitment | *isn’t a cage.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      cage(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.7, 1.2)))
      label(x, 790, 640, 'DOOR WAS NEVER LOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every feeling | *needs a joke.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), down = ease.inOutCubic(prog(lt, 1.1, 1.4))
      drawBits(x, CHICKEN, { R: RED, Y: GOLD, k: INK, o: ORANGE }, 800, lerp(860, 960, down), 22 * k, { rot: lerp(0.3 * Math.sin(lt * 9), 1.4, down) })
      bubble(x, 640, 640, 'ha ha. | anyway…', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (1 - down), { size: 34, tail: 'bl' })
      label(x, 760, 1110, 'SAY THE REAL THING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Unpack the bag | *at their place.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      suitcase(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.85, { col: SKYB })
      label(x, 790, 660, 'ALWAYS PACKED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1170, '(IT’S BEEN 8 MONTHS)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Make plans | *past Friday.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      cal(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.2)
      label(x, 790, 1110, 'NEXT MONTH?! WOW.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bring them | *on the adventure.*', mood: 'heart', star: { x: -230, s: 260 }, hops: [0.5, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 520, 960, 170 * k, { mood: 'sparkle', look: [1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.6] })
      pass(x, 800, 760, pop01(t, P.t0 + 0.7, 0.35, 2) * 0.75, { dest: 'TOGETHER', rot: -0.08 })
      pass(x, 820, 960, pop01(t, P.t0 + 0.9, 0.35, 2) * 0.75, { dest: 'TOGETHER', rot: 0.06, col: MINT })
      label(x, 790, 1140, 'TWO SEATS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a034', key: 'G', accent: ORANGE, solo: S, ending: 'lesson',
  title: 'Sagittarius, stop | doing *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'Best adventure? | *Staying.*', chip: 'HEART: LANDED' },
  last: {
    text: 'Same flight. | *Same row.*',
    draw(x, t, lt) {
      pass(x, 540, 1130, pop01(t, t - lt + 0.7, 0.35, 2) * 0.9, { dest: 'TOGETHER', rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
