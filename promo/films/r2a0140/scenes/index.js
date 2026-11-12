// r2a0140: THE SIGNS AS… v3, advice roll call, "How each sign gets | their spark back." (~63 s vertical, lofi · G). Ending: 'card'.
//   0.0–3.6    "How each sign gets | *their spark back.*"
//   3.6–49.2   ♈ a new challenge (the candle relights) · ♉ a long bath and good bread · ♊ one great chat, fully charged
//              · ♋ a call with someone who gets it · ♌ hearing "I'm proud of you" · ♍ clean desk, clear head
//              · ♎ something beautiful, even a sunset · ♏ alone time, then deep talks · ♐ a new street to wander
//              · ♑ rest without earning it first · ♒ a weird idea, chased all night · ♓ a good cry, then a good song
//  49.2        "Lit up. | *Again.*"
//  52.4        LESSON: "Your spark | *never left.*"  STATUS: GLOWING
//  58.3        "Some sparks | *come in pairs.*" over the match card: Gemini + Aquarius (the great chat and the all-nighter).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', ORANGE = '#ff9a4a', SPARK = '#ffd36b', GREEN = '#5fd068'

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
const CANDLE = ['..W..', '..W..', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC', 'CCCCC']
const FLAME = ['..F..', '.FFF.', 'FFYFF', 'FYYYF', '.FYF.']
const BREAD = ['..BBBBB..', '.BBbBBbB.', 'BBBBBBBBB', 'BBbBBBbBB', 'BBBBBBBBB']
const TUB = ['W..........', 'WSSSSSSSSSW', 'WSSSSSSSSSW', '.WWWWWWWWW.', '.K.......K.']
const BATT = ['KKKKKKKKKK.', 'K........KK', 'K........KK', 'K........KK', 'KKKKKKKKKK.']
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSHSHSK', 'KSHHHSK', 'KSSHSSK', 'KSSSSSK', 'KKKGKKK']
const DESK = ['TTTTTTTTTTTT', 'TTTTTTTTTTTT', '.L........L.', '.L........L.', '.L........L.']
const SIGNPOST = ['..YYYYYYY.', '..YYYYYYYY', '..YYYYYYY.', '...W......', 'PPPPPPP...', 'PPPPPPPP..', 'PPPPPPP...', '...W......', '...W......', '...W......']
const BULB = ['.YYYYY.', 'YYYWYYY', 'YYWYYYY', 'YYYYYYY', '.YYYYY.', '..GGG..', '..GGG..']
const HAMMOCK = ['W..........W', '.W........W.', '..HHHHHHHH..', '...HHHHHH...']

const CAMEOS = [
  { sign: 'aries', cap: 'A brand-new challenge. | *Fire\'s back.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CANDLE, { W: INK, C: '#fff4e2' }, 790, 940, 24 * k)
      drawBits(x, FLAME, { F: ORANGE, Y: GOLD }, 790, 790 - 6 * Math.sin(t * 9), 22 * pop01(t, P.t0 + 1.0, 0.3, 2.6))
      label(x, 790, 640, 'LEVEL UP?', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 790, P.t0 + 1.0, 6, 120, 0.4)
    } },
  { sign: 'taurus', cap: 'A long bath. | *And good bread.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, TUB, { W: '#fff4e2', S: SKYB, K: INK }, 380, 1030, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, BREAD, { B: '#e8a24a', b: '#c47a2a' }, 790, 860, 26 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      label(x, 790, 1050, 'FULLY RESTORED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'One great chat. | *Fully charged.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 770, 660, 'wait, me too!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (sheet(x, 790, 880, 300, 140, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: '#140c30' })) {
        const n = Math.floor(clamp((lt - 0.6) / 1.1) * 5)
        for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? GREEN : '#2a2350'; x.fillRect(-130 + i * 52, -46, 44, 92) }
        x.fillStyle = BONE; x.fillRect(150, -24, 16, 48)
        x.restore()
      }
      label(x, 790, 1060, 'BATTERY: 100', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A call with someone | who *gets it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', S: SKYB, H: PINK, G: '#6b62a8' }, 790, 860, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      label(x, 790, 650, 'CALL: 2 HRS 14 MIN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: '#3fb6f0', rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.7, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Hearing | *“I\'m proud of you.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, "I'm proud | of you.", pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const g = clamp((lt - 0.9) / 0.6)
      if (g > 0) { x.save(); x.globalAlpha = 0.35 * g; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(F.x, F.cy, 200 + 20 * Math.sin(t * 4), 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 1000, 'GLOW: MAX', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'A clean desk. | A *clear head.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DESK, { T: WOOD, L: '#6b3820' }, 790, 1000, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const mess = 1 - ease.inOutCubic(prog(lt, 0.6, 1.2))
      for (let i = 0; i < 5; i++) drawBits(x, ['PPP', 'PPP'], { P: ['#fff4e2', PINK, GOLD, SKYB, MINT][i] }, 700 + i * 45, 950 - (i % 2) * 20 - (1 - mess) * 300, 14, { rot: i, alpha: mess })
      sparkles(x, t, 790, 930, P.t0 + 1.2, 7, 160, 0.4)
      label(x, 790, 720, 'MIND: TIDY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Something beautiful. | *Even a sunset.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) {
      const k = clamp((lt - 0.2) / 0.6)
      if (k <= 0) return
      x.save(); x.globalAlpha = k
      const B = [['#ff8fb1', 560], ['#ffb36b', 640], ['#ffd36b', 720]]
      x.beginPath(); x.rect(560, 560, 400, 400); x.clip()
      B.forEach(([c, y]) => { x.fillStyle = c; x.fillRect(560, y, 400, 80) })
      x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(760, 820 - 60 * k, 70, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#6b3db0'; x.fillRect(560, 820, 400, 140)
      x.restore()
    },
    front(x, t, lt, P) { label(x, 760, 1040, 'STOPPED. STARED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04 }) } },
  { sign: 'scorpio', cap: 'Alone time. | Then *deep talks.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 680, 'DO NOT DISTURB', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'okay. now | tell me all.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'A new street | *to wander.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SIGNPOST, { Y: GOLD, P: PINK, W: WOOD }, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'DESTINATION: ???', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#a35cf0', color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Rest without | *earning it first.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: 150, y: -40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(690, 1000); x.rotate(Math.sin(t * 1.5) * 0.04); drawBits(x, HAMMOCK, { W: WOOD, H: '#2fc79a' }, 0, 0, 34 * k); x.restore()
    },
    front(x, t, lt, P) { label(x, 330, 720, 'NO REASON NEEDED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 }) } },
  { sign: 'aquarius', cap: 'A weird idea. | *Chased all night.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#fff1b0', W: '#ffffff', G: '#9aa5c4' }, 790, 800, 26 * pop01(t, P.t0 + 0.6, 0.3, 2.6))
      sparkles(x, t, 790, 790, P.t0 + 0.7, 8, 150, 0.6)
      label(x, 790, 1040, '3 A.M. · STILL GOING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#38c4ec', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A good cry. | Then *a good song.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 1000, { n: 5, cell: 8, col: LAV, seed: 2, alpha: clamp(lt - 1.0) })
      label(x, 790, 700, 'ON REPEAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0140', key: 'G', accent: SPARK, ending: 'card',
  title: 'How each sign gets | *their spark back.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Lit up. | *Again.*' },
  lesson: { text: 'Your spark | *never left.*', chip: 'STATUS: GLOWING' },
  last: {
    text: 'Some sparks | *come in pairs.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
