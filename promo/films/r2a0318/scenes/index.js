// r2a0318: star_advice, ADVICE SOLO, "Taurus: worth | *the slow build.*" (topic: Taurus, you’re worth the slow build) (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one light gag each.
// Ending: callback.
//   0.0–3.6    hook
//   3.6–37.8   you take your time (the dough is proofing) · slow to trust, that's how it lasts (brick by brick) · routine is a
//              superpower (same mug, day 900) · grows slow, so do oaks · saving the good snack? today's the day · slow to reply,
//              worth the wait · resting isn't lazy · you don't quit (sweater, row 212) · small steps still get you there (snail)
//  37.8        "Steady. | *Always worth it.*"
//  41.2        callback: "The bread? | *So worth it.*" — card 1's dough comes back as a golden loaf.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SLATE = '#9fb4c8', RED = '#e23d4e', CREAM = '#fff8ea', WOOD = '#c98f5a', SAND = '#f3d79a'
// ── props
/** a paper sheet / screen with a coloured header and text rows: [text, colour?, k?] */
function sheet(x, cx, cy, k, { w = 330, h = 380, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30, scale = 1.12, paper = CREAM, ink = INK, font = MONO } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = paper; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  const top = -h / 2 + (head ? 60 : 0) + 44
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || ink; x.font = `700 ${size}px ${font}`
    x.fillText(txt, -w / 2 + 22, top + i * (size + 16)); x.restore()
  })
  x.restore()
}
/** a wall clock */
function clock(x, cx, cy, k, hh, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
const LAPTOP = ['..KKKKKKKKKKKK..', '..KSSSSSSSSSSK..', '..KSWWWWWWWSSK..', '..KSSSSSSSSSSK..', '..KSWWWWWSSSSK..', '..KSSSSSSSSSSK..', '..KKKKKKKKKKKK..', 'GGGGGGGGGGGGGGGG', '.GGGGGGGGGGGGGG.']
const LAPTOP_C = { K: INK, S: SKYB, W: CREAM, G: '#a9a9bf' }
const UMBRELLA = ['....RRRRRRR....', '..RRWWRRRWWRR..', '.RRWWWRRRWWWRR.', 'RRRRRRRRRRRRRRR', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '.......K.......', '......KK.......']
const UMBRELLA_C = { R: '#ff6b5a', W: CREAM, K: INK }
const CAKE = ['....F..F..F....', '....C..C..C....', '..PPPPPPPPPPP..', '..PWPWPWPWPWP..', '..BBBBBBBBBBB..', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', 'BBBBBBBBBBBBBBB', 'BBBBBBBBBBBBBBB', 'KKKKKKKKKKKKKKK']
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
/** a phone with message bubbles: [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
const MEDAL = ['RR.....RR', '.RR...RR.', '..RR.RR..', '...RRR...', '..GGGGG..', '.GGYYYGG.', 'GGYGGGYGG', 'GGYGGGYGG', 'GGYGGGYGG', '.GGYYYGG.', '..GGGGG..']
const MEDAL_C = { R: '#e23d4e', G: GOLD, Y: '#fff1a8' }
const BOOK = ['KKKKKKKKKKKKKKKK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLLWWK', 'KWWWWWWKKWWWWWWK', 'KWLLLWWKKWLLLLWK', 'KWWWWWWKKWWWWWWK', 'KWLLLLWKKWLLWWWK', 'KWWWWWWKKWWWWWWK', 'KKKKKKKKKKKKKKKK']
const BOOK_C = { K: '#8a4a2e', W: '#fff8ea', L: '#9a90b8' }
const PIGGY = ['......PP....', '.PPPPPPPPP..', 'PPPPPPPPPPP.', 'PPKPPPPPPPPS', 'PPPPPPPPPPPS', 'PPPPPPPPPPP.', '.PPPPPPPPP..', '.PP.....PP..']
const PIGGY_C = { P: '#ff9cc0', K: INK, S: '#ff6fa3' }
const COIN = ['.YYYY.', 'YYWYYY', 'YWYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const COIN_C = { Y: GOLD, W: '#fff1a8' }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.....L.....', '.TTTTTTTTT.', '.TTTTTTTTT.', '..TTTTTTT..', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }
const BED = ['WW.............', 'WW.............', 'WWPPPBBBBBBBBBB', 'WWPPPBBBBBBBBBB', 'WWBBBBBBBBBBBBB', 'WWWWWWWWWWWWWWW', 'W.............W']
const BED_C = { W: '#c98f5a', P: '#fff8ea', B: '#8fb8ff' }

const MOSS = '#8fd08a', BREAD = '#e7a84a'
/** dough in a bowl that rises (r 0…1) into a loaf */
function dough(x, cx, cy, k, r, { baked = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = baked ? '#c97a2a' : '#f3e2c0'; x.strokeStyle = INK; x.lineWidth = 8
  x.beginPath(); x.ellipse(0, -20 - 50 * r, 130, 50 + 70 * r, 0, Math.PI, 0); x.closePath(); x.fill(); x.stroke()
  if (baked) { x.strokeStyle = '#8a4a2e'; x.lineWidth = 6; for (const d of [-50, 0, 50]) { x.beginPath(); x.moveTo(d - 20, -110); x.lineTo(d + 20, -60); x.stroke() } }
  if (!baked) { x.fillStyle = INK; x.fillRect(-160, -20, 320, 100); x.fillStyle = SKYB; x.fillRect(-150, -14, 300, 86); x.fillStyle = '#c9ecff'; x.fillRect(-150, -14, 300, 16) }
  else { x.fillStyle = INK; x.fillRect(-170, -20, 340, 20); x.fillStyle = WOOD; x.fillRect(-164, -18, 328, 14) }
  x.restore()
}
const MUG = ['KKKKKKKK..', 'KMMMMMMK..', 'KMWWMMMKKK', 'KMMMMMMK.K', 'KMMWWMMK.K', 'KMMMMMMKKK', 'KMMMMMMK..', '.KKKKKK...']
const MUG_C = { K: INK, M: MOSS, W: CREAM }
const JAR = ['..KKKKKK..', '..KLLLLK..', '.KGGGGGGK.', 'KGGGGGGGGK', 'KGCCGGCCGK', 'KGCCGGCCGK', 'KGGGCCGGGK', 'KGGGCCGGGK', 'KGGGGGGGGK', '.KKKKKKKK.']
const JAR_C = { K: INK, L: RED, G: '#cfe8ff', C: '#c98f5a' }
const SNAIL = ['.....SSSS....', '....SsssSS...', '...SsSSSsS...', '...SsSsSsS...', '...SsSSssS.EE', '....SSSSSS.BB', 'BBBBBBBBBBBBB', '.BBBBBBBBBBB.']
const SNAIL_C = { S: '#c98f5a', s: '#f3d79a', B: '#b6e08a', E: INK }
const COUCH = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPCCCCCCCCCCPP', 'PPCCCCCCCCCCPP', 'PPPPPPPPPPPPPP', 'K............K']
const COUCH_C = { P: LAV, C: '#e3d4ff', K: INK }

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'You take your time. | *Good things do too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      dough(x, 780, 960, pop01(t, P.t0 + 0.15, 0.3, 2), clamp((lt - 0.3) / 1.8))
      label(x, 780, 660, 'PROOFING…', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: SAND, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow to trust? | *That’s how it lasts.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.6) * 15)
      for (let i = 0; i < n; i++) { const r = Math.floor(i / 3), c = i % 3, bx = 660 + c * 90 + (r % 2 ? 45 : 0), by = 1100 - r * 56; x.fillStyle = INK; x.fillRect(bx - 4, by - 4, 92, 56); x.fillStyle = r % 2 ? '#d9774a' : '#e88a5a'; x.fillRect(bx, by, 84, 48) }
      label(x, 790, 660, 'BRICK BY BRICK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You love a routine. | *It’s a superpower.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 890, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1100, 'SAME MUG · DAY 900', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MOSS, rot: -0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.fillStyle = `rgba(239,230,214,${(0.6 * Math.sin(Math.PI * ph)).toFixed(3)})`; x.fillRect(750 + i * 30 + Math.sin(ph * 6) * 8, 760 - ph * 120, 10, 26) }
    } },
  { sign: S, cap: 'You grow slowly. | *So do oak trees.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const g = clamp((lt - 0.2) / 1.6)
      x.fillStyle = INK; x.fillRect(770, 1140 - 300 * g, 36, 300 * g); x.fillStyle = '#8a4a2e'; x.fillRect(776, 1146 - 300 * g, 24, 300 * g)
      if (g > 0.2) { x.fillStyle = INK; x.beginPath(); x.arc(788, 1140 - 300 * g, 40 + 130 * g, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fd068'; x.beginPath(); x.arc(788, 1140 - 300 * g, 32 + 130 * g, 0, Math.PI * 2); x.fill() }
      label(x, 790, 1160, 'EST. SOMEDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SAND, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saving the good snack? | *Today’s the day.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 790, 880, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 640, 'FOR A SPECIAL DAY', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 30, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'TODAY. IT’S TODAY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow to reply? | *Worth the wait.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '♉︎ YOUR MATCH', headCol: MOSS, lines: [
        ['…', BONE, lt < 1.1 ? pop01(t, P.t0 + 0.4, 0.25, 2.2) : 0, true],
        ['the sweetest', PINK, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['reply ever ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
        ['wow. ok. ♡', SKYB, pop01(t, P.t0 + 1.7, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Resting isn’t lazy. | *It’s refuelling.*', mood: 'sleepy', look: [1, 0], star: { x: -80, y: 40, s: 260 },
    back(x, t, lt, P) { drawBits(x, COUCH, COUCH_C, 540, 1000, 40 * pop01(t, P.t0 + 0.05, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 760, 640, 'COMFY: MAXIMUM', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.globalAlpha = 0.8; x.fillText('z', 600 + Math.sin(t * 2) * 8, 760 - (t * 30) % 60); x.fillText('Z', 640, 720 - (t * 30 + 30) % 60)
    } },
  { sign: S, cap: 'You don’t quit. | *Row by row.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const rows = Math.floor(clamp((lt - 0.2) / 1.6) * 9)
      for (let r = 0; r < rows; r++) { x.fillStyle = INK; x.fillRect(636, 1100 - r * 46, 308, 46); x.fillStyle = r % 2 ? '#ff9cc0' : '#ffb8d2'; x.fillRect(642, 1104 - r * 46, 296, 38); x.fillStyle = 'rgba(27,18,54,0.25)'; for (let c = 0; c < 9; c++) x.fillRect(650 + c * 33, 1112 - r * 46, 14, 20) }
      label(x, 790, 640, `ROW ${200 + rows}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Small steps | *still get you there.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, lerp(640, 820, clamp((lt - 0.2) / 1.8)), 1040, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 880, 900, 'FINISH ✦', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: MINT, rot: 0.06, font: MONO, weight: 700 })
      sparkles(x, t, 880, 960, P.t0 + 1.7, 7, 140, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0318', key: 'C', accent: MOSS, solo: 'taurus', ending: 'callback',
  title: 'Taurus: worth | *the slow build.*',
  cameos: CAMEOS,
  group: { cap: 'Steady. | *Always worth it.*', mood: 'heart' },
  last: {
    text: 'The bread? | *So worth it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      dough(x, 540, 1120, 1.3 * pop01(t, t0 + 0.6, 0.4, 2), 1, { baked: true })
      sparkles(x, t, 540, 1000, t0 + 1.2, 8, 240, 0.4)
      hearts(x, t, 540, 960, t0 + 1.4, { n: 6, life: 1.8, spread: 420, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
