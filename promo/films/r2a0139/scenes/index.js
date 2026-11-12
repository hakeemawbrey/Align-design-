// r2a0139: THE SIGNS AS… v3, advice roll call, "Each sign when | they feel at home." (~62 s vertical, lofi · E). Ending: 'lesson'.
//   0.0–3.6    "Each sign when | they *feel at home.*"
//   3.6–49.2   ♈ finally sits down · ♉ shoes off, snacks appear · ♊ talks less, laughs more · ♋ kettle on for everyone
//              · ♌ shows you the messy hair · ♍ leaves one dish in the sink · ♎ picks the movie without asking
//              · ♏ shows you their birth chart · ♐ unpacks the whole suitcase · ♑ phone face down
//              · ♒ plays you the weird playlist · ♓ cries in front of you, happy tears
//  49.2        "Home is | *who you're with.*"
//  52.4        LESSON: "Be someone's | *soft place to land.*"  STATUS: HOME
//  58.3        "Shoes off. | *You're home.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', ORANGE = '#ff9a4a', WARM = '#ffb36b'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
const CHAIR = ['RR......', 'RR......', 'RR......', 'RRRRRRRR', 'RRRRRRRR', 'W......W', 'W......W']
const SHOE = ['.SSS....', 'SSSSS...', 'SSSSSSSS', 'WWWWWWWW']
const BOWL = ['.Y.O.Y.', 'YOYOYOY', 'WWWWWWW', '.WWWWW.', '..WWW..']
const KETTLE = ['...KK...', '..KKKK..', '.RRRRRR.', 'RRRRRRRRK', 'RRRRRRR.K', 'RRRRRRRK.', '.RRRRRR..']
const MUG = ['WWWW.', 'WWWWW', 'WWWW.', 'WWWW.']
const STEAM = ['.S.', 'S..', '.S.', '..S']
const PLATE = ['..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']
const REMOTE = ['KKKK', 'KRKK', 'KKKK', 'KGBK', 'KKKK', 'KGGK', 'KKKK']
const CASE = ['...KKKK...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBYBBBBYBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const PHONE = ['KKKKKK', 'KGGGGK', 'KGGGGK', 'KGGGGK', 'KGGGGK', 'KKKKKK']
const HEADPH = ['.KKKKK.', 'K.....K', 'K.....K', 'PP...PP', 'PP...PP']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.1, 3.7, 5.2]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Stops rushing. | *Finally sits down.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, CHAIR, { R: '#c96a6a', W: WOOD }, 380, 1030, 26 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SPEED: CHILL', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'ahh.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Kicks off their shoes. | *Snacks appear.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) { const p = ease.outCubic(prog(lt, 0.3 + i * 0.15, 0.9 + i * 0.15)); if (p > 0) drawBits(x, SHOE, { S: WOOD, W: BONE }, lerp(420, 640 + i * 80, p), 1100 - Math.sin(Math.PI * p) * 220, 12, { rot: p * 6 }) }
      drawBits(x, BOWL, { Y: GOLD, O: ORANGE, W: '#fff4e2' }, 800, 860, 26 * pop01(t, P.t0 + 1.1, 0.3, 2.4))
      sparkles(x, t, 800, 860, P.t0 + 1.1, 7, 150, 0.4)
    } },
  { sign: 'gemini', cap: 'Talks less. | *Laughs more.*', mood: lt => lt > 0.9 ? 'happy' : 'sparkle', star: { x: -170 }, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      const H = ['ha', 'haha', 'HAHA', 'haha'].slice(0, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 3))
      H.forEach((s, i) => bubble(x, 720 + (i % 2) * 120, 660 + i * 110, s, pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.2), { size: 40, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Puts the kettle on. | *For everyone.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, KETTLE, { K: INK, R: '#3fb6f0' }, 770, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) drawBits(x, STEAM, { S: BONE }, 770, 660 - (t * 40 % 30), 14, { alpha: 0.7 })
      for (let i = 0; i < 4; i++) drawBits(x, MUG, { W: [PINK, MINT, GOLD, LAV][i] }, 660 + i * 80, 1040, 16 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.25, 2.2))
    } },
  { sign: 'leo', cap: 'Lets you see | the *messy hair.*', mood: 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = '#ffb34a'; x.lineWidth = 8; x.lineCap = 'round'
        for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32; x.beginPath(); x.moveTo(F.x + Math.cos(a) * 110, F.top + 30); x.quadraticCurveTo(F.x + Math.cos(a) * 170 * k, F.top - 50 * k, F.x + Math.cos(a + 0.5) * 150 * k, F.top - 90 * k); x.stroke() }
        x.restore() }
      label(x, 790, 760, 'NO FILTER', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'just us.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Leaves one dish | in the *sink.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 960, 300, 120, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#9aa5c4' })) { x.fillStyle = '#6b7490'; x.fillRect(-130, -40, 260, 70); x.restore() }
      drawBits(x, PLATE, { W: '#fff4e2' }, 790, 930, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.4 })
      label(x, 790, 720, 'IT CAN WAIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Picks the movie. | *Without asking.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, REMOTE, { K: INK, R: RED, G: '#9aa5c4', B: SKYB }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 650, 'DECIDED IN 1 SECOND', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04 })
      sparkles(x, t, 790, 860, P.t0 + 1.1, 7, 150, 0.4)
    } },
  { sign: 'scorpio', cap: 'Shows you | *their birth chart.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1060, 'ACCESS: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Unpacks the suitcase. | *All of it.*', mood: lt => lt > 1.3 ? 'happy' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, B: '#a35cf0', Y: GOLD }, 790, 1020, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const ITEMS = [[PINK, 700, 760], [MINT, 860, 720], [GOLD, 780, 650], [SKYB, 900, 840]]
      ITEMS.forEach(([c, ax, ay], i) => { const p = ease.outCubic(prog(lt, 0.5 + i * 0.2, 0.9 + i * 0.2)); if (p > 0) drawBits(x, ['CCCC', 'CCCC', 'CCCC'], { C: c }, lerp(790, ax, p), lerp(990, ay, p), 16) })
      label(x, 790, 1150, 'STAYING A WHILE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03 })
    } },
  { sign: 'capricorn', cap: 'Phone face down. | *Work can wait.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.6, 1.0))
      drawBits(x, PHONE, { K: '#9aa5c4', G: f > 0.5 ? '#6b62a8' : SKYB }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: Math.abs(1 - 2 * f) + 0.05 })
      label(x, 790, 1060, 'OUT OF OFFICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Plays you | the *weird playlist.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, HEADPH, { K: '#c9c9d8', P: '#38c4ec' }, 790, 800, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 790, 1000, { n: 5, cell: 8, col: '#38c4ec', seed: 4, alpha: clamp(lt - 0.5) })
      label(x, 790, 1080, 'TRACK 1: WHALE SONGS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Cries in front of you. | *Happy tears.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SAFE HERE', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 42, bg: SKYB, rot: 0.05 })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 6, life: 1.8, spread: 180, cell: 8, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0139', key: 'E', accent: WARM, ending: 'lesson',
  title: 'Each sign when | they *feel at home.*',
  cameos: CAMEOS,
  group: { cap: 'Home is | *who you\'re with.*' },
  lesson: { text: 'Be someone\'s | *soft place to land.*', chip: 'STATUS: HOME' },
  last: {
    text: 'Shoes off. | *You\'re home.*',
    draw(x, t, lt) {
      for (let i = 0; i < 2; i++) drawBits(x, SHOE, { S: WOOD, W: BONE }, 470 + i * 150, 1560, 22 * pop01(t, t - lt + 0.6 + i * 0.2, 0.3, 2.2), { rot: i ? 0.1 : -0.05 })
      hearts(x, t, 540, 1520, t - lt + 1.0, { n: 5, life: 1.8, spread: 300, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
