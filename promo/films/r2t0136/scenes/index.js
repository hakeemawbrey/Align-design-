// r2t0136: THE SIGNS AS… v3, SOLO film, "Geminis making plans | be like." (~43 s vertical, signs3kit, lofi · C)
// One Gemini, nine cards, each the most extreme version of a Gemini making plans. Ending: 'group'.
//   0.0–3.6    "Geminis making plans | *be like.*"
//   3.6–37.8   four plans, one Saturday · started the group chat, muted it · plan A fell through, now on plan Q
//              · on time, to the wrong party · "five minutes away", still in the shower · planned a trip, forty tabs
//              · cancelled at six, showed up at seven · bio says spontaneous, owns a spreadsheet · invited one, twelve came
//  37.8        "Every plan. | *All at once.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'gemini', YEL = '#f2cf4a', RED = '#e23d4e', WOOD = '#8a4a2e'

// a paper sheet with an ink outline and a drop shadow; optional coloured header with text
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
const SHOWER = [
  '.....KKKK',
  '.....K..K',
  'GGGGGG..K',
  '.GGGG...K',
]
const DRIP = ['S', 'S']

const CAMEOS = [
  { sign: S, cap: 'Four plans. | *One Saturday.*', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      if (sheet(x, 780, 850, 330, 380, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, head: 'SATURDAY', headBg: RED })) {
        const EV = [['BRUNCH 11:00', MINT], ['HIKE 11:00', SKYB], ['MOVIE 11:00', PINK], ['PARTY 11:00', GOLD]]
        EV.forEach(([s, c], i) => {
          const k = pop01(t, P.t0 + 0.45 + i * 0.3, 0.25, 2.2)
          if (k <= 0.01) return
          x.save(); x.translate(0, -85 + i * 68); x.rotate((i % 2 ? 1 : -1) * 0.04); x.scale(k, k)
          x.fillStyle = INK; x.fillRect(-138, -30, 276, 64); x.fillStyle = c; x.fillRect(-132, -24, 264, 52)
          x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 3)
          x.restore()
        })
        x.restore()
      }
      label(x, 780, 1110, 'DOUBLE-DOUBLE-BOOKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Started the group chat. | Then *muted it.*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, "who's in?!", pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, tail: 'bl' })
      const n = Math.floor(clamp((lt - 0.6) / 0.9) * 99)
      if (lt > 0.6) label(x, 790, 820, `${n} NEW MESSAGES`, 1, { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1010, 'CHAT MUTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: LAV, rot: -0.05 })
    } },
  { sign: S, cap: 'Plan A fell through. | Now on *plan Q.*', mood: lt => lt > 1.7 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.8],
    front(x, t, lt, P) {
      const L = 'ABCDEFGHIJKLMNOPQ', n = Math.min(L.length - 1, Math.floor(clamp((lt - 0.3) / 1.4) * (L.length - 1)))
      if (sheet(x, 790, 830, 280, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05, bg: '#fff4e2', head: 'THE PLAN', headBg: INK, headInk: YEL })) {
        x.fillStyle = n === L.length - 1 ? RED : INK; x.font = `800 170px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L[n], 0, 40)
        x.restore()
      }
      for (let i = 0; i < Math.min(5, n); i++) drawBits(x, ['P'], { P: '#d8d0bf' }, 640 + i * 70, 1080 + (i % 2) * 20, 30, { rot: i * 0.7 })
      bubble(x, 790, 1120, 'still fun!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Arrived right on time. | To the *wrong party.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.9],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 560, 590, 640, 120, k, { rot: -0.02, bg: PINK })) {
        x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HAPPY 80TH, MARGE!', 0, 4)
        x.restore()
      }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 990, 210 * k, { mood: lt > 1.3 ? 'squint' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 800, 760, 'and you are…?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      bubble(x, 330, 680, 'congrats!!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: S, cap: '“Five minutes away.” | Still *in the shower.*', mood: lt => lt > 1.5 ? 'wink' : 'happy', star: { x: -150 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SHOWER, { K: '#9aa5c4', G: '#c9c9d8' }, 450, 560, 24 * k)
      if (k > 0.9) for (let i = 0; i < 12; i++) {
        const ph = ((t * 1.3 + i * 0.173) % 1)
        drawBits(x, DRIP, { S: SKYB }, 300 + (i % 6) * 34 + Math.sin(i) * 10, 620 + ph * 520, 9, { alpha: 1 - ph * 0.6 })
      }
    },
    front(x, t, lt, P) {
      if (sheet(x, 800, 870, 220, 380, pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.06, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-94, -164, 188, 310)
        x.restore()
      }
      bubble(x, 800, 820, 'omw!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 960, 'SENT 9:00', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 26, bg: BONE, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1130, 'SHAMPOO: IN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Planned one trip. | *Forty tabs* open.', mood: lt => lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.max(1, Math.floor(clamp((lt - 0.3) / 1.4) * 40))
      if (sheet(x, 790, 850, 360, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: '#fff4e2' })) {
        const shown = Math.min(n, 14), tw = 340 / shown
        for (let i = 0; i < shown; i++) { x.fillStyle = i % 2 ? '#c9a6ff' : '#8fe3ff'; x.fillRect(-170 + i * tw, -150, tw - 3, 40) }
        x.fillStyle = INK; x.fillRect(-180, -110, 360, 6)
        x.fillStyle = '#d8d0bf'; for (let j = 0; j < 4; j++) x.fillRect(-140, -70 + j * 50, 280 - j * 40, 22)
        x.restore()
      }
      label(x, 790, 640, `TABS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'booked: | nothing', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Cancelled at six. | Showed up at *seven.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 790); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 138, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 104 - 5, Math.sin(a) * 104 - 5, 10, 10) }
        const hour = lerp(6, 7, ease.inOutCubic(prog(lt, 0.5, 1.3)))
        const ha = (hour / 12) * Math.PI * 2 - Math.PI / 2
        x.strokeStyle = INK; x.lineCap = 'square'; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 64, Math.sin(ha) * 64); x.stroke()
        x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -96); x.stroke()
        x.fillStyle = RED; x.fillRect(-10, -10, 20, 20)
        x.restore()
      }
      label(x, 790, 610, 'CANCELLED', pop01(t, P.t0 + 0.35, 0.3, 2), { size: 34, bg: RED, color: '#fff4e2', rot: -0.06 })
      bubble(x, 790, 1060, 'surprise! | I came!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 1.4, 7, 190, 0.4)
    } },
  { sign: S, cap: 'Bio says “spontaneous.” | Owns a *spreadsheet.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const sw = ease.inOutCubic(prog(lt, 1.0, 1.3))
      if (sw < 0.5) {
        if (sheet(x, 790, 850, 290, 340, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - sw * 2), { rot: 0.04, bg: '#2a2350' })) {
          x.fillStyle = '#140c30'; x.fillRect(-125, -150, 250, 190)
          x.restore()
          x.save(); signChar(x, t, S, 790, 790, 150 * (1 - sw * 2), { mood: 'wink', seed: 55, glyph: false, glow: 0.8 }); x.restore()
          label(x, 790, 960, '“spontaneous”', (1 - sw * 2) * pop01(t, P.t0 + 0.45, 0.3, 2), { size: 32, bg: YEL, rot: 0.03 })
        }
      } else if (sheet(x, 790, 850, 360, 330, (sw - 0.5) * 2, { rot: -0.03, bg: '#fff4e2', head: 'FUN_PLANS_v12', headBg: '#2fc79a', headInk: INK, headSize: 28 })) {
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 3
        for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(-180 + i * 90, -105); x.lineTo(-180 + i * 90, 165); x.stroke() }
        for (let j = 0; j <= 6; j++) { x.beginPath(); x.moveTo(-180, -105 + j * 45); x.lineTo(180, -105 + j * 45); x.stroke() }
        x.fillStyle = '#2fc79a'; for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) if ((i + j) % 3 !== 1) x.fillRect(-170 + i * 90, -95 + j * 45 + 45, 70, 25)
        x.restore()
      }
      label(x, 790, 1120, 'SURPRISE: SCHEDULED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Invited one friend. | *Twelve* showed up.', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const G = ['aries', 'cancer', 'leo', 'libra', 'sagittarius', 'aquarius', 'taurus', 'virgo', 'scorpio']
      G.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.14, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 640 + (i % 3) * 120, 700 + Math.floor(i / 3) * 170, 130 * k, { mood: i % 2 ? 'happy' : 'sparkle', seed: 30 + i, glyph: false, glow: 0.7, hops: [P.t0 + 0.5 + i * 0.14] })
      })
      bubble(x, 360, 620, 'the more | the merrier!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 760, 1170, 'PARTY OF 12', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0136', key: 'C', accent: YEL, solo: S, ending: 'group',
  title: 'Geminis making | plans *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Every plan. | *All at once.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
