// v3a091: star_advice, ADVICE ROLL CALL, "What each sign | wants on a date." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, one warm, specific wish each, one light gag each.
//   0.0–3.6    "What each sign | *wants on a date.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ a finish line (RACE YOU!) · ♉ no rushing dessert (SECONDS: YES) · ♊ two plans, both tonight
//              · ♋ a cosy night in (FORT: BUILT) · ♌ one real compliment, out loud · ♍ a plan and a backup plan
//              · ♎ somewhere pretty, you pick (relief) · ♏ one honest question · ♐ something new, even a weird fruit
//              · ♑ someone on time (6:58 PM) · ♒ a weird museum (MUSEUM OF SPOONS) · ♓ a sunset (they will cry)
//  49.2        "Everyone wants | *to be seen.*"  The twelve fly up into a group photo.
//  52.6        callback: "The spoon museum? | *Second date.*"  the spoon comes back with DATE #2.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', SIL = '#cfd6e6'
const FLAG = ['P........', 'PKWKWKWKW', 'PWKWKWKWK', 'PKWKWKWKW', 'PWKWKWKWK', 'P........', 'P........', 'P........', 'P........', 'P........']
const FLAG_C = { P: BONE, K: INK, W: '#ffffff' }
const PIE = ['....CCCC....', '..CCCCCCCC..', '.CCcCCCCcCC.', 'CCCCCCCCCCCC', 'FFFFFFFFFFFF', 'TTTTTTTTTTTT', '.TTTTTTTTTT.']
const PIE_C = { C: '#e7b46a', c: '#a8682a', F: RED, T: '#c98f2a' }
const FRUIT = ['....GG....', '...G..G...', '..PPPPPP..', '.PPwPPPwP.', 'PPPPPwPPPP', 'PwPPPPPPwP', 'PPPPwPPPPP', '.PPPPPPwP.', '..PPPPPP..']
const FRUIT_C = { G: '#5fd068', P: '#ff5fa2', w: '#fff4e2' }
const SPOON = ['..SSS..', '.SSSSS.', 'SSSWSSS', 'SSSSSSS', '.SSSSS.', '..SSS..', '...S...', '...S...', '...S...', '...S...', '...S...', '...S...', '..SSS..']
const SPOON_C = { S: SIL, W: '#ffffff' }
const BLANKET = ['BBBBBBBBBBBB', 'BbBBbBBbBBbB', 'BBBBBBBBBBBB', 'BbBBbBBbBBbB', 'BBBBBBBBBBBB', '.BBBBBBBBBB.']
const BLANKET_C = { B: SKYB, b: '#fff4e2' }

function clock(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 98, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 80 - 4, Math.sin(a) * 80 - 4, 8, 8) }
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -64); x.stroke()                                   // 12-ish
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(-0.25) * -44, Math.sin(-0.25) * -44 + 0); x.stroke()
  x.restore()
}
function sunset(x, t, lt, k) {
  if (k <= 0.01) return
  const y = 1000 + 60 * ease.inOutCubic(clamp(lt / 2.4))
  x.save(); x.globalAlpha = clamp(k)
  x.beginPath(); x.rect(120, 500, 840, 520); x.clip()
  x.fillStyle = 'rgba(255,143,177,0.18)'; x.fillRect(120, 760, 840, 260)
  x.fillStyle = INK; x.beginPath(); x.arc(800, y, 132, 0, 7); x.fill()
  x.fillStyle = '#ffb347'; x.beginPath(); x.arc(800, y, 120, 0, 7); x.fill()
  x.fillStyle = '#ffd27a'; x.beginPath(); x.arc(770, y - 30, 50, 0, 7); x.fill()
  x.restore()
  x.fillStyle = INK; x.fillRect(560, 1016, 400, 10); x.fillStyle = '#5a3a7a'; x.fillRect(560, 1026, 400, 40)
}

const CAMEOS = [
  { sign: 'aries', cap: 'A date with | a *finish line.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.3, 1.8],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 800 + 10 * Math.sin(t * 6), 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'RACE YOU!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: '#f0603a', rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Good food. | *No rushing* dessert.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(620, 1004, 340, 20); x.fillStyle = WOOD; x.fillRect(624, 1008, 332, 12)
      drawBits(x, PIE, PIE_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'SECONDS: YES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two plans. | *Both tonight.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'MINI GOLF 7PM', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 900, 'MUSEUM 9PM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'NOT TIRED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.03 })
    } },
  { sign: 'cancer', cap: 'A cosy night in. | *Blanket provided.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 1.8)
      drawBits(x, BLANKET, BLANKET_C, F.x, F.cy + 150, 26 * k)
      label(x, 790, 700, 'FORT: BUILT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'One real compliment. | Said *out loud.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 830, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 760, 660, 'you look | AMAZING', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'br' })
      sparkles(x, t, 340, 880, P.t0 + 1.0, 8, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'A plan. | And a *backup plan.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -200, 300, 400); x.fillStyle = WOOD; x.fillRect(-142, -192, 284, 384)
        x.fillStyle = '#fff4e2'; x.fillRect(-120, -160, 240, 330); x.fillStyle = '#8a8a9a'; x.fillRect(-50, -210, 100, 34)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText('PLAN A', -96, -100); x.fillText('PLAN B', -96, -20); x.fillText('PLAN C', -96, 60)
        x.fillStyle = '#2fa860'; for (let i = 0; i < 3; i++) if (lt > 0.7 + i * 0.35) { x.fillRect(64, -110 + i * 80, 12, 24); x.fillRect(76, -122 + i * 80, 12, 36) }
        x.restore()
      }
      label(x, 790, 1130, 'RELAXED NOW', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Somewhere pretty. | *You pick it.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 830, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 800, 660, 'I booked | the garden!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 340, 640, 'RELIEF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: '#e163d6', rot: -0.06 })
      hearts(x, t, 340, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'One honest question. | *Then listen.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 980, 180 * k, { mood: lt > 1.4 ? 'sparkle' : 'wide', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.6] })
      bubble(x, 560, 640, 'what’s your | biggest dream?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 830, 760, 'FINALLY. DEEP.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#e23d66', color: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Something new. | Even a *weird fruit.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, FRUIT, FRUIT_C, 790, 900 + 8 * Math.sin(t * 4), 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 })
      label(x, 790, 680, 'WHAT IS THIS?!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: '#a35cf0', color: BONE, rot: -0.05 })
      label(x, 790, 1120, 'BEST DATE EVER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone *on time.* | Early is romantic.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      clock(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1070, '6:58 PM', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 690, 'SWOON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.06 })
    } },
  { sign: 'aquarius', cap: 'A weird museum. | *The weirder, the better.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 640, 'MUSEUM OF SPOONS', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.03, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      x.fillStyle = INK; x.fillRect(700, 1050, 180, 26); x.fillStyle = BONE; x.fillRect(706, 1056, 168, 14)
      drawBits(x, SPOON, SPOON_C, 790, 900, 20 * k, { rot: 0.15 * Math.sin(t * 2) })
      sparkles(x, t, 790, 880, P.t0 + 0.9, 7, 140, 0.2)
    } },
  { sign: 'pisces', cap: 'A sunset. | They *will* cry.', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -220 },
    back(x, t, lt, P) { sunset(x, t, lt, pop01(t, P.t0 + 0.1, 0.4, 1.4)) },
    front(x, t, lt, P) {
      bubble(x, 720, 620, 'it’s just | SO pretty', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3a091', key: 'D', accent: PINK, ending: 'callback',
  title: 'What each sign | *wants on a date.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone wants | *to be seen.*' },
  last: {
    text: 'The spoon museum? | *Second date.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      drawBits(x, SPOON, SPOON_C, 540, 1000, 30 * k, { rot: 0.15 * Math.sin(t * 2) })
      label(x, 540, 1300, 'DATE #2: BOOKED', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, t - lt + 1.0, { n: 8, life: 2.2, spread: 500, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
