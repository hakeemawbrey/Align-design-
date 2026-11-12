// r2a0195: star_advice, ADVICE ROLL CALL, "How each sign | travels." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific, relatable travel line each, with a light visual gag.
//   0.0–3.6    "How each sign | *travels.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries sprints to the gate (slow down) · Taurus plans trips around food (correct) · Gemini chats to the
//              whole plane · Cancer homesick by day two (call home) · Leo's landmark photos (be in them) · Virgo's packed
//              case (leave room for surprises) · Libra can't pick (anywhere with you) · Scorpio, one black bag · Sagittarius
//              already booked the next one (be here first) · Capricorn budgeted every coin (treat yourself) · Aquarius skips
//              the tourist route (your way is valid) · Pisces cries at every view (feel it all)
//  49.2        GROUP ending: "Different routes. | *Same sky.*"  Group photo, a little plane loops over everyone.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', TEAL = '#2fc79a'

// ── props
const PLANE = ['....W.....', '....WW....', 'WWWWWWWWWW', '....WW....', '....W.....']
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'CCCCCCCCCCCC',
  'CaaabbbcccdC',
  'CaaabbbcccdC',
  'CeeefffggQQC',
  'CeeefffggQQC',
  'CCCCCCCCCCCC',
]
const SUITCASE_C = { K: '#3a2a1a', C: '#c98f2a', a: PINK, b: SKYB, c: MINT, d: LAV, e: GOLD, f: ORANGE, g: '#a8d86a', Q: '#140c30' }
const BAG = ['..KKKK..', '.K....K.', 'BBBBBBBB', 'BbBBBBBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB']
const SLICE = ['YYYYYYY', '.YRYYY.', '.YYYRY.', '..YYY..', '..YRY..', '...Y...']
const ICE = ['.PPP.', 'PPPPP', 'PPPPP', '.CCC.', '.CCC.', '..C..', '..C..']
const HOUSE = ['...RR...', '..RRRR..', '.RRRRRR.', 'RRRRRRRR', '.WWWWWW.', '.WKWWYW.', '.WKWWWW.']
const MTN = ['......W.......', '.....WWW......', '....GGGGG.....', '...GGGGGGG.GG.', '..GGGGGGGGGGGG', '.GGGGGGGGGGGGG', 'GGGGGGGGGGGGGG']

// a boarding pass
function pass(x, cx, cy, k, { gate = 'GATE 1', col = SKYB, rot = -0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -80, 336, 180)
  x.fillStyle = INK; x.fillRect(-172, -94, 344, 188); x.fillStyle = CREAM; x.fillRect(-164, -86, 328, 172)
  x.fillStyle = col; x.fillRect(-164, -86, 328, 48)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', 0, -61)
  x.font = `800 44px ${INTER}`; x.fillText(gate, 0, 10)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 14; i++) x.fillRect(-130 + i * 19, 52, i % 3 ? 8 : 12, 24)
  x.restore()
}
// a plane-window row with little faces
function windows(x, t, lt, P) {
  for (let i = 0; i < 4; i++) {
    const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2)
    if (k <= 0.01) continue
    const cx = 610 + (i % 2) * 170, cy = 740 + Math.floor(i / 2) * 230
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-70, -90, 140, 180, 50); x.fill()
    x.fillStyle = '#c9c9d8'; x.beginPath(); x.roundRect(-62, -82, 124, 164, 44); x.fill()
    x.fillStyle = '#8fe3ff'; x.beginPath(); x.roundRect(-48, -68, 96, 136, 36); x.fill()
    x.restore()
    if (lt > 0.5 + i * 0.2) signChar(x, t, ['libra', 'taurus', 'leo', 'capricorn'][i], cx, cy + 6, 100 * k, { mood: 'happy', look: [-1, 0], seed: 100 + i, glyph: false })
  }
}
// a viewfinder frame around the landmark, Leo stepping in
function viewfinder(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 10
  for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.moveTo(a * 190, b * 120); x.lineTo(a * 190, b * 70); x.moveTo(a * 190, b * 120); x.lineTo(a * 130, b * 120); x.stroke() }
  x.fillStyle = RED; x.beginPath(); x.arc(150, -90, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a departures board flipping between three choices
function board(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const L = ['BEACH', 'CITY', 'SNOW', 'FOREST']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#140c30'; x.fillRect(-170, -140, 340, 280)
  x.fillStyle = GOLD; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEPARTURES', 0, -110)
  for (let i = 0; i < 3; i++) {
    const w = L[(Math.floor(lt * 4) + i) % 4]
    x.fillStyle = '#2a2350'; x.fillRect(-150, -66 + i * 70, 300, 56)
    x.fillStyle = BONE; x.font = `700 34px ${MONO}`; x.fillText(lt > 1.5 ? (i === 1 ? 'WITH YOU' : '· · ·') : w, 0, -36 + i * 70)
  }
  x.restore()
}
// a signpost: THIS WAY one way, Aquarius heading the other
function signpost(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 330); x.fillStyle = BROWN; x.fillRect(-6, -150, 12, 330)
  const arrow = (y, dir, txt, col) => {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-120 * dir, y - 36); x.lineTo(110 * dir, y - 36); x.lineTo(150 * dir, y); x.lineTo(110 * dir, y + 36); x.lineTo(-120 * dir, y + 36); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(-112 * dir, y - 28); x.lineTo(106 * dir, y - 28); x.lineTo(138 * dir, y); x.lineTo(106 * dir, y + 28); x.lineTo(-112 * dir, y + 28); x.closePath(); x.fill()
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 10 * dir, y + 1)
  }
  arrow(-100, 1, 'TOURS', CREAM); arrow(-10, -1, 'NOT THAT', MINT)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sprints to the gate? | *Slow down.* Enjoy it.', mood: lt => lt > 1.4 ? 'happy' : 'squint', star: { x: -210 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P, F) {
      if (lt < 1.4) { x.fillStyle = 'rgba(239,230,214,0.5)'; for (let i = 0; i < 4; i++) x.fillRect(F.x - 260 - (t * 600 + i * 70) % 120, F.cy - 60 + i * 40, 90, 8) }
      pass(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { gate: 'GATE 1', col: '#f0603a' })
      label(x, 790, 1060, 'BOARDING IN 2 HRS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Plans trips around food. | *Correct.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#d8ecc0'; x.fillRect(-162, -142, 324, 284)
        x.strokeStyle = '#8fc0e8'; x.lineWidth = 14; x.beginPath(); x.moveTo(-162, 60); x.bezierCurveTo(-60, 10, 40, 120, 162, 40); x.stroke()
        x.strokeStyle = '#b9b0a0'; x.lineWidth = 4; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-120, -90); x.lineTo(-20, 0); x.lineTo(100, -80); x.stroke(); x.setLineDash([])
        x.restore()
        ;[[670, 770], [770, 860], [890, 780]].forEach(([px, py], i) => drawBits(x, SLICE, { Y: GOLD, R: RED }, px, py, 9 * pop01(t, P.t0 + 0.5 + i * 0.25, 0.25, 2.4)))
      }
      label(x, 790, 1090, 'ITINERARY: LUNCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Chats to the whole plane. | Friends *everywhere.*', mood: 'happy', look: [1, 0], star: { x: -250, s: 260 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      windows(x, t, lt, P)
      bubble(x, 300, 640, 'where you from?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Homesick by day two? | Call home. *It’s okay.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-124, -194, 248, 388); x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368); x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
        x.fillStyle = MINT; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lt > 0.9 ? 'CONNECTED' : 'CALLING…', 0, 110)
        x.restore()
        drawBits(x, HOUSE, { R: RED, W: CREAM, K: BROWN, Y: GOLD }, 790, 820, 16 * k)
      }
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 14 })
    } },
  { sign: 'leo', cap: 'Snapping every view? | *Be in them.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: 0, y: 40, s: 240 }, hops: [1.3],
    back(x, t, lt, P) { drawBits(x, MTN, { W: '#ffffff', G: '#6b62a8' }, 540, 900, 28 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      viewfinder(x, 540, 860, 1.6 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 540, 1140, 'CLICK. (THE GOOD ONE)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Packed perfectly? | Leave room for *surprises.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 900, 700, 'SPACE FOR: ?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#a8d86a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 905, 905, P.t0 + 1.25, 6, 80, 0.3)
    } },
  { sign: 'libra', cap: 'Can’t pick a destination? | *Anywhere* with you.', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { board(x, t, 760, 850, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'scorpio', cap: 'One black bag. | *Effortlessly* cool.', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, BAG, { K: '#3a3a4a', B: '#1d1d2a', b: '#3a3a4a' }, F.x + 230, F.cy + 80, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 660, 'PACKED IN 4 MIN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Next trip booked? | *Be here* first.', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      pass(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { gate: 'TRIP 1', col: '#b36cff', rot: 0.06 })
      pass(x, 780, 900, pop01(t, P.t0 + 0.5, 0.3, 2), { gate: 'TRIP 2', col: LAV, rot: -0.05 })
      label(x, 790, 1090, 'TRIP 1: NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Budgeted every coin? | *Treat yourself* once.', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, ICE, { P: PINK, C: '#e2a45a' }, 790, 880, 30 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 660, 'BUDGET: +1 TREAT', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: TEAL, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: 'aquarius', cap: 'Skip the tourist route? | *Your way* is valid.', mood: 'sparkle', look: [-1, 0], star: { x: -220 }, hops: [0.9, 1.6],
    front(x, t, lt, P) { signpost(x, 790, 900, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2)) } },
  { sign: 'pisces', cap: 'Cries at every view? | *Feel it all.*', mood: 'sparkle', tears: 3, look: [1, -1], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-110, -150, 220, 300, 70); x.fill()
        x.fillStyle = '#c9c9d8'; x.beginPath(); x.roundRect(-100, -140, 200, 280, 62); x.fill()
        x.save(); x.beginPath(); x.roundRect(-84, -124, 168, 248, 54); x.clip()
        const g = x.createLinearGradient(0, -124, 0, 124); g.addColorStop(0, '#ff8fb1'); g.addColorStop(1, '#ffb34a'); x.fillStyle = g; x.fillRect(-84, -124, 168, 248)
        drawBits(x, MTN, { W: '#ffffff', G: '#5b3a8a' }, 0, 70, 12)
        x.restore(); x.restore()
      }
      label(x, 790, 1080, 'VIEW #31 (SOBBING)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0195', key: 'G', accent: SKYB, ending: 'group',
  title: 'How each sign | *travels.*',
  cameos: CAMEOS,
  group: {
    cap: 'Different routes. | *Same sky.*',
    draw(x, t, lt) {
      if (lt < 0.8) return
      const a = (lt - 0.8) * 1.2
      drawBits(x, PLANE, { W: BONE }, 540 + Math.cos(a) * 380, 800 + Math.sin(a) * 60, 14, { rot: a + Math.PI / 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
