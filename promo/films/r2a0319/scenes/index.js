// r2a0319: star_advice, ADVICE ROLLCALL, "How each sign | *opens up.*" (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line about how each sign lets people in, each with a light gag.
// Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ fast (brave, not too much) · ♉ slowly, over shared snacks · ♊ a 17-minute 2 a.m. voice note · ♋ once safe (blanket fort)
//              · ♌ when you really listen · ♍ through little favours · ♎ after asking if you're ok (ask them back)
//              · ♏ one secret at a time · ♐ on a long drive, heart wide open · ♑ rarely, so it means everything · ♒ a weird fact first, then the real stuff
//              · ♓ through tears, and that's okay
//  49.2        group (the ending): "Everyone opens up. | *Just differently.*"  Over the photo: HEARTS: OPEN.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
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

const PEACH = '#ffb89a'
const DOOR = ['KKKKKKKKKK', 'KDDDDDDDDK', 'KDddddddDK', 'KDdDDDDdDK', 'KDddddddDK', 'KDDDDDDGDK', 'KDddddddDK', 'KDdDDDDdDK', 'KDddddddDK', 'KDDDDDDDDK', 'KKKKKKKKKK']
const DOOR_C = { K: INK, D: '#c98f5a', d: '#a8742a', G: GOLD }
const PLATE = ['..CC..YY..', '.CCCC.YYY.', '.CCCCYYYY.', 'WWWWWWWWWW', '.WWWWWWWW.']
const PLATE_C = { C: '#c98f5a', Y: GOLD, W: CREAM }
const FORT = ['......P......', '.....PPP.....', '....PPPPP....', '...PPWPPPP...', '..PPPWWPPPP..', '.PPPPWWWPPPP.', 'PPPPPKKKPPPPP', 'PPPPKKKKKPPPP', 'PPPPKKKKKPPPP']
const FORT_C = { P: '#ffb8d2', W: CREAM, K: '#2a2350' }
const LOCK = ['..KKKKK..', '.K.....K.', '.K.....K.', 'KKKKKKKKK', 'KGGGGGGGK', 'KGGGKGGGK', 'KGGGKGGGK', 'KGGGGGGGK', 'KKKKKKKKK']
const LOCK_C = { K: INK, G: GOLD }
const CAR = ['....KKKKKK.....', '...KSSKSSSK....', '..KSSSKSSSSK...', 'KKRRRRRRRRRRRKK', 'KRRRRRRRRRRRRRK', 'KRRRRRRRRRRRRRK', 'KKK.KKKKKKK.KKK', '..KKK.....KKK..']
const CAR_C = { K: INK, S: SKYB, R: '#ff9a4a' }
const TISSUE = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BKKKKKKKKB', 'BBBBBBBBBB', 'BBBPPPPBBB', 'BBBBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: '#8fd0ff', K: INK, P: CREAM }

const CAMEOS = [
  { sign: 'aries', cap: 'All at once. | *Brave, not too much.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.4],
    front(x, t, lt, P) {
      const o = ease.outBack ? ease.outBack(prog(lt, 0.2, 0.6)) : ease.outCubic(prog(lt, 0.2, 0.6))
      drawBits(x, DOOR, DOOR_C, 800, 900, 26 * pop01(t, P.t0 + 0.1, 0.3, 2), { sx: Math.max(0.15, 1 - o * 0.85) })
      label(x, 790, 640, 'DOOR: WIDE OPEN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Slowly, over snacks. | *Share the plate.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 1000, 34 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 720, 'okay… so,', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'In a 2 a.m. voice note. | *Listen to all of it.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'VOICE NOTE', headCol: GOLD, lines: [
        ['▶ ∿∿∿∿∿ 17:04', MINT, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['listening ♡', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
      ] })
    } },
  { sign: 'cancer', cap: 'Once they feel safe. | *Be the cosy place.*', mood: 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 790, 930, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 640, 'FORT: OPEN TO YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'When you really listen. | *Not just clap.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'can I tell you | something real?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1000, 'AUDIENCE: JUST YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Through little favours. | *That’s the love note.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 330, head: 'FOR YOU', headCol: MINT, size: 30, rows: [
        ['✓ fixed shelf', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['✓ your tea', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['✓ the hard talk', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'After asking if you’re ok. | *Ask them back.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'are YOU ok?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 800, 920, '…actually, no. | thanks for asking', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'One secret at a time. | *Keep it safe.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const op = lt > 1.0
      drawBits(x, op ? ['..KKKKK..', '.K.....K.', '.K.......', 'KKKKKKKKK', ...LOCK.slice(4)] : LOCK, LOCK_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1120, op ? 'TRUST: UNLOCKED' : 'TRUST: LOADING', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: op ? MINT : LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'On a long drive. | *Heart wide open.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CAR, CAR_C, 790 + Math.sin(t * 8) * 4, 940, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 4; i++) { const ph = (t * 1.2 + i / 4) % 1; x.fillStyle = `rgba(239,230,214,${(0.5 * Math.sin(Math.PI * ph)).toFixed(3)})`; x.fillRect(960 - ph * 360, 760 + i * 40, 60, 6) }
      label(x, 790, 1140, 'MILE 80: THE REAL TALK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Rarely. So when they do, | *it means everything.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      sheet(x, 765, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 300, head: 'CALENDAR', headCol: SLATE, size: 30, rows: [
        ['9:00 work', '#9a90b8'], ['10:00 you ♡', RED, pop01(t, P.t0 + 0.9, 0.2, 2)], ['11:00 still you', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
  { sign: 'aquarius', cap: 'A weird fact first. | *Then the real stuff.*', mood: 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'octopuses have | three hearts', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      bubble(x, 800, 900, 'also… I missed you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Through happy tears. | *And that’s okay.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 960, 28 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 680, 'TISSUES: ON HAND', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0319', key: 'E', accent: PEACH, ending: 'group',
  title: 'How each sign | *opens up.*',
  cameos: CAMEOS,
  group: {
    cap: 'Everyone opens up. | *Just differently.*',
    draw(x, t, lt) { label(x, 540, 700, 'HEARTS: OPEN', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 44, bg: PEACH, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
