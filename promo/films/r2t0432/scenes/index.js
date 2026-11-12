// r2t0432: star_talk, ROLL CALL, "The signs | *birdwatching.*" (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself on a birdwatching trip. Ending: group.
//   0.0–3.6    hook · 3.6–49.2 twelve cards (3.8 s each):
//              ♈ yelled BIRD!, scared them all off · ♉ forgot the birds, packed a picnic · ♊ named every bird, wrong, confidently
//              · ♋ adopted a pigeon · ♌ didn't watch the birds, the birds watched Leo · ♍ a bird log spreadsheet
//              · ♎ rated every bird, all tens · ♏ camouflage so good nobody found them · ♐ tried to fly with them
//              · ♑ started a bird-tour business · ♒ best friends with one specific crow · ♓ saw a baby duck, sobbed
//  49.2        group (the ending): "Birds seen: | *zero.*"  one bird flies over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff8ea', SLATE = '#9fb4c8', WOOD = '#c98f5a', SAND = '#f3d79a', ORANGE = '#ffb34a', GREEN = '#5fd068', BROWN = '#8a4a2e'
// ── shared props (each film carries its own copy)
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
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a mini birth-chart wheel */
function chartWheel(x, t, cx, cy, k, r = 150) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * r / 150, k * r / 150); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  const C = [RED, '#7fd08a', SAND, SKYB, GOLD, '#b6e08a', PINK, '#b07bff', '#ff9a4a', SLATE, '#6fd6ff', LAV]
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 140, a, a + Math.PI / 6 - 0.04); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 80, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -20); x.lineTo(50, 40); x.lineTo(-10, -62); x.closePath(); x.stroke()
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 340, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18
    const py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a pixel bitmap that pops in at t0 (cell size c) */
const bits = (x, t, bm, cols, cx, cy, c, t0, o = {}) => drawBits(x, bm, cols, cx, cy, c * pop01(t, t0, 0.3, 2), o)
const BIRD = ['..BB....', '.BBKB...', 'BBBBBOO.', '.BBBBB..', '..BBBBBB', '...BB...']
const bird = c => ({ B: c, K: INK, O: GOLD })
const FLAP = ['B.....B', 'BB...BB', '.BBBBB.', '...B...']
const PIGEON = ['...GGG....', '..GGKGG...', '..GGGGGOO.', '.GGGGGG...', 'GGWWGGGG..', 'GGWWWGGGGG', '.GGGGGGGG.', '...O..O...']
const PIGEON_C = { G: '#9fa4c0', K: INK, O: '#ff9a4a', W: '#c9a6ff' }
const CROW = ['...KKK....', '..KKWKK...', '..KKKKKGG.', '.KKKKKK...', 'KKKKKKKK..', 'KKKKKKKKKK', '.KKKKKKKK.', '...G..G...']
const CROW_C = { K: '#2a2350', W: '#ffffff', G: GOLD }
const DUCK = ['..YYY...', '.YYKYY..', '.YYYYYOO', 'YYYYYY..', 'YYYYYYY.', '.YYYYY..']
const DUCK_C = { Y: '#ffe066', K: INK, O: '#ff9a4a' }
const BUSH = ['....GGGGGG....', '..GGGGGGGGGG..', '.GGGgGGGGgGGG.', 'GGGGGGGGGGGGGG', 'GgGGGGGgGGGGgG', 'GGGGGGGGGGGGGG', 'GGGGgGGGGGGGGG', '.GGGGGGGGGGGG.']
const BUSH_C = { G: '#3f9a5a', g: '#2c7a44' }
const BASKET = ['...KKKKKK...', '..K......K..', '.K........K.', 'WWWWWWWWWWWW', 'WRWRWRWRWRWR', 'WWWWWWWWWWWW', 'WRWRWRWRWRWR', '.WWWWWWWWWW.']
const BASKET_C = { K: BROWN, W: SAND, R: RED }
const WING = ['....WWW', '..WWWWW', '.WWWWWW', 'WWWWWW.', 'WWWW...']
// a bird flying across: wings flap
function flyer(x, t, cx, cy, c, col = SLATE, flip = 1) { drawBits(x, Math.floor(t * 6) % 2 ? FLAP : ['.......', 'B.....B', '.BBBBB.', '...B...'], { B: col }, cx, cy, c, { sx: flip }) }

const CAMEOS = [
  { sign: 'aries', cap: 'Yelled “BIRD!” | *They all left.*', mood: lt => lt > 0.5 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 560, 640, 'BIRD!!!', pop01(t, P.t0 + 0.3, 0.22, 2.4), { size: 58, col: GOLD, tail: 'bl' })
      const fly = ease.inCubic(prog(lt, 0.5, 2.0))
      for (let i = 0; i < 6; i++) flyer(x, t + i * 0.1, 640 + i * 40 + fly * 110, 1080 - i * 30 - fly * 300, 10, [SLATE, PINK, SKYB][i % 3])
      label(x, 790, 1120, 'BIRDS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Forgot the binoculars. | *Packed a picnic.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, BASKET, BASKET_C, 790, 900, 22, P.t0 + 0.2)
      label(x, 790, 680, 'SNACKS: 14', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'birds can wait', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Named every bird. | *Wrong. Confidently.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, t, BIRD, bird(SKYB), 790, 850, 22, P.t0 + 0.15)
      bubble(x, 770, 650, 'that’s a… | swamp parrot', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1080, 'IT’S A PIGEON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted a pigeon. | *It lives there now.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, PIGEON, PIGEON_C, 790, 880, 22, P.t0 + 0.2)
      label(x, 790, 660, 'NAME: SIR COO', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
      label(x, 790, 1100, 'HAS A BEDROOM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Didn’t watch the birds. | *Birds watched Leo.*', mood: 'sparkle', star: { x: -60 }, hops: [1.3],
    front(x, t, lt, P, F) {
      for (let i = 0; i < 6; i++) { const a = Math.PI + i * Math.PI / 5; drawBits(x, BIRD, bird([SKYB, PINK, GOLD, MINT, LAV, SLATE][i]), F.x + Math.cos(a) * 300, F.cy + 40 + Math.sin(a) * 240, 13 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2), { sx: Math.cos(a) < 0 ? -1 : 1 }) }
      label(x, 540, 1130, 'AUDIENCE: 6', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Logged 40 birds. | *In a spreadsheet.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 330, h: 400, head: 'BIRD LOG', headCol: '#b6e08a', size: 28, rows: [
        ['07:01 sparrow', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['07:01 sparrow²', INK, pop01(t, P.t0 + 0.6, 0.2, 2)], ['07:02 leaf?', '#6b62a8', pop01(t, P.t0 + 0.8, 0.2, 2)], ['tab 2: graphs', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Rated every bird. | *All tens.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        bits(x, t, BIRD, bird([PINK, SKYB, GOLD][i]), 680 + i * 120, 800 + (i % 2) * 40, 12, P.t0 + 0.2 + i * 0.3)
        label(x, 680 + i * 120, 960 + (i % 2) * 40, '10', pop01(t, P.t0 + 0.6 + i * 0.3, 0.3, 2.4), { size: 40, bg: BONE, rot: (i - 1) * 0.08, font: MONO, weight: 700 })
      }
      bubble(x, 780, 640, 'they’re all | so pretty', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Camouflage so good, | *nobody found them.*', mood: 'wink', look: [1, 0], star: { x: 120, y: 30, s: 220 },
    front(x, t, lt, P, F) {
      bits(x, t, BUSH, BUSH_C, F.x, F.cy + 40, 30, P.t0 + 0.2)
      label(x, 340, 680, 'WHERE’S SCORPIO?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: '#b07bff', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1050, 'day 3. | still hidden.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'sagittarius', cap: 'Tried to *fly* | with the birds.', mood: 'sparkle', star: { x: -150 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), fl = 0.3 * Math.sin(t * 14)
      drawBits(x, WING, { W: BONE }, F.x - 160, F.cy - 20, 18 * k, { rot: -fl, sx: -1 })
      drawBits(x, WING, { W: BONE }, F.x + 160, F.cy - 20, 18 * k, { rot: fl })
      flyer(x, t, 800, 640, 10, SKYB)
      label(x, 790, 1100, 'ALTITUDE: 2 FT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Turned it into | *a business.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 850, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 360, head: 'BIRD TOURS', headCol: SLATE, rows: [
        ['basic  $5', INK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['premium  $9', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['owl (VIP)  $40', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      label(x, 780, 1100, 'Q3: PROFITABLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Best friends with | *one specific crow.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, t, CROW, CROW_C, 790, 880, 22, P.t0 + 0.2)
      label(x, 790, 660, 'THIS IS GARY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: '#6fd6ff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'GARY BRINGS GIFTS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw a baby duck. | *Sobbed.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, t, DUCK, DUCK_C, 780, 950, 20, P.t0 + 0.2)
      bubble(x, 780, 700, 'it’s so | tiny', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      hearts(x, t, 600, 1150, P.t0 + 1.0, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0432', key: 'E', accent: MINT, ending: 'group',
  title: 'The signs | *birdwatching.*',
  cameos: CAMEOS,
  group: {
    cap: 'Birds seen: | *zero.*',
    draw(x, t, lt) { if (lt > 1.4) flyer(x, t, lerp(-80, 1160, prog(lt, 1.4, 4.4)), 780 - 60 * Math.sin(lt * 1.3), 14, SKYB) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
