// r2a0324: star_advice, ADVICE ROLLCALL, "What each sign | should say yes to." (signs3kit social cut, music: lofi · E).
// One warm yes per sign, each with a light gag. Ending: lesson.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const SNAIL = ['....SSSS....', '...SPPPPS...', '..SPPSSPPS..', '..SPSPPSPS..', '..SPPSSPPS.K', 'GGGSPPPPSGKK', 'GGGGGGGGGGG.']
const KEY = ['.YYY........', 'Y...Y.......', 'Y...YYYYYYYY', 'Y...Y...Y.Y.', '.YYY.........']
const LAMP = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....K....', '....K....', '....K....', '..KKKKK..']
const BOOK = ['RRRRRRRRRR', 'RWWWWWWWWR', 'RWWWWWWWWR', 'RRRRRRRRRR']
const CAM = ['...KKK......', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGKKKKGGGK', 'KGGKSSSSKGGK', 'KGGKSWSSKGGK', 'KGGGKKKKGGGK', 'KKKKKKKKKKKK']
const BLANKET = ['PPPPPPPPPPPP', 'PWPWPWPWPWPW', 'PPPPPPPPPPPP', 'WPWPWPWPWPWP', 'PPPPPPPPPPPP']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'KKKKKKKKKKKK']

function card(x, cx, cy, k, head, lines, { rot = 0.04, w = 300, headCol = MINT, size = 28 } = {}) {
  if (k <= 0.01) return
  const h = 86 + lines.length * 48
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 54)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 28)
  x.font = `800 ${size}px ${INTER}`; lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 86 + i * 48))
  x.restore()
}

const R = { x: -160 }
const CAMEOS = [
  { sign: 'aries', cap: 'Say yes to | *the slow walk.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', star: R,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, { S: '#e8a24a', P: '#ffd23a', G: '#9aa5c4', K: INK }, lerp(700, 820, clamp(lt / 2.4)), 1060, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 760, 'NO RACE TODAY', pop01(t, P.t0 + 0.7, 0.3, 2.4), MINT, -0.04, 34)
      bubble(x, 780, 600, 'this is... nice?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Say yes to | *the new restaurant.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', star: R,
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'NEW MENU', ['something', 'you can’t', 'pronounce'], { headCol: GOLD })
      bubble(x, 790, 1090, 'okay. one bite.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      if (lt > 1.5) hearts(x, t, 600, 1060, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'gemini', cap: 'Say yes to | *one thing at a time.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', star: R,
    front(x, t, lt, P) {
      const n = Math.max(1, 9 - Math.floor(clamp((lt - 0.3) / 1.0) * 8))
      L(x, 790, 860, `TABS OPEN: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), n === 1 ? MINT : RED, -0.04, 40)
      bubble(x, 790, 1060, 'ahh. quiet.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Say yes to | *being looked after.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 900, 170 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false })
      const p = ease.outCubic(prog(lt, 0.8, 1.3))
      if (p > 0) drawBits(x, BLANKET, { P: PINK, W: CREAM }, lerp(760, 380, p), lerp(900, 980, p), 20 * p, { rot: -0.1 })
      L(x, 800, 660, 'YOUR TURN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Say yes to | *a quiet night in.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: R,
    front(x, t, lt, P) {
      drawBits(x, LAMP, { Y: '#ffe7a8', K: INK }, 820, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOOK, { R: '#ffb34a', W: CREAM }, 660, 1080, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 640, 'AUDIENCE: NONE. FINE.', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'virgo', cap: 'Say yes to | *the messy first try.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = CREAM; x.fillRect(-142, -122, 284, 244)
        x.strokeStyle = '#4f8bff'; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath()
        const n = Math.floor(clamp(lt / 1.2) * 30)
        for (let i = 0; i <= n; i++) { const a = i / 30 * Math.PI * 2, r = 80 + 14 * Math.sin(i * 1.7); i ? x.lineTo(Math.cos(a) * r, Math.sin(a) * r * 0.9) : x.moveTo(r, 0) }
        x.stroke(); x.restore()
      }
      L(x, 790, 1080, 'GOOD ENOUGH ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Say yes to | *your first choice.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: R, hops: [1.0],
    front(x, t, lt, P) {
      L(x, 720, 820, 'THIS', pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.8 ? MINT : BONE, -0.05, 40)
      L(x, 880, 820, 'THAT', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, 0.05, 40)
      if (lt > 0.8) { x.save(); x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.ellipse(720, 820, 90, 50, 0, 0, Math.PI * 2 * clamp((lt - 0.8) / 0.3)); x.stroke(); x.restore() }
      L(x, 790, 1060, 'DECIDED IN 1 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Say yes to | *letting someone in.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.2))
      drawBits(x, KEY, { Y: GOLD }, lerp(540, 790, p), 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 790, 1040, 'SPARE KEY: GIVEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Say yes to | *the second date.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: 160 },
    front(x, t, lt, P) {
      card(x, 310, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOUR MATCH', ['date #2?'], { headCol: PINK, size: 36 })
      bubble(x, 310, 1040, 'same person?!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 760, 620, 'YES ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 44)
    } },
  { sign: 'capricorn', cap: 'Say yes to | *the day off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: lt > 0.9 ? '#2a2350' : SKYB }, 310, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 310, 1080, 'OUT OF OFFICE', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#2fc79a', -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Say yes to | *the group photo.*', mood: lt => lt > 1.1 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, CAM, { K: INK, G: '#9aa5c4', S: SKYB, W: '#ffffff' }, 790, 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0 && lt < 1.2) { x.save(); x.globalAlpha = 0.6; x.fillStyle = '#fff'; x.fillRect(100, 470, 880, 760); x.restore() }
      L(x, 790, 1060, 'SMILE (OPTIONAL)', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Say yes to | *the happy tears.*', mood: lt => lt < 0.8 ? 'happy' : 'heart', tears: lt => lt < 0.8 ? 1 : 2, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, 'GOOD CRY', pop01(t, P.t0 + 0.4, 0.3, 2.4), LAV, -0.04, 44)
      hearts(x, t, 790, 1120, P.t0 + 0.8, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0324', key: 'E', accent: MINT, ending: 'lesson',
  title: 'What each sign | *should say yes to.*',
  cameos: CAMEOS,
  group: { cap: 'Small yes. | *Big glow.*' },
  lesson: { text: 'A small yes | can *change your week.*', chip: 'STATUS: OPEN' },
  last: { text: 'Pisces already | *said yes.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
