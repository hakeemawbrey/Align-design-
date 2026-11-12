// r2a0099: star_advice, ADVICE ROLLCALL, "Each sign's | new moon wish." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific new moon wish each, with a light visual gag. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ finish one thing first · ♉ an unhurried Sunday · ♊ one quiet hour · ♋ to be looked after · ♌ shine without
//              trying · ♍ leave one dish in the sink · ♎ choose without a poll · ♏ trust a little easier · ♐ an adventure
//              close to home · ♑ celebrate small wins · ♒ understood by one person · ♓ a good cry and a good friend
//  49.2        "New moon, new wish. | *Make yours.*"  a dark new moon with a gold rim over the group photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const MOONC = '#c9b8ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCCCCCW.W', 'WCCCCCW.W', 'WCCCCCWWW', 'WCCCCCW..', '.WWWWW...']
const PLATE = ['..WWWWWWW..', '.WWBBBBBWW.', 'WWBBBBBBBWW', 'WWBBBBBBBWW', '.WWBBBBBWW.', '..WWWWWWW..']
const SOUP = ['.S.S.S.', '..S.S..', 'KKKKKKK', 'KOOOOOK', '.KOOOK.', '..KKK..']
const KEY = ['.YYY......', 'Y...Y.....', 'Y...YYYYYY', 'Y...Y..Y.Y', '.YYY......']
const HOUSE = ['....R....', '...RRR...', '..RRRRR..', '.RRRRRRR.', '..WWWWW..', '..WDWWW..', '..WDWWW..']
const CUP = ['...F...', '...W...', '.PPPPP.', 'PPPPPPP', 'CCCCCCC', '.CCCCC.', '..CCC..']
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..']

const CAMEOS = [
  { sign: 'aries', cap: 'Wish: to finish | *one thing first.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 800, 850, 280, 300, CREAM, { k, rot: 0.03 })
      if (k > 0.5) {
        x.save(); x.translate(800, 850); x.rotate(0.03)
        for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-110, -100 + i * 60, 30, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-60, -92 + i * 60, 150 - i * 20, 14) }
        if (lt > 1.1) { x.strokeStyle = '#2f9a4a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-104, -86); x.lineTo(-96, -76); x.lineTo(-82, -98); x.stroke() }
        x.restore()
      }
      label(x, 800, 1090, '1 DONE = A WIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Wish: a slow, | *unhurried Sunday.*', mood: 'sleepy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, C: BROWN }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.save(); x.globalAlpha = 0.6 * clamp(lt - 0.5); x.fillStyle = '#c9c9d8'; for (let i = 0; i < 3; i++) x.fillRect(740 + i * 40 + Math.sin(t * 3 + i) * 8, 690 - ((t * 50 + i * 30) % 80), 12, 30); x.restore()
      label(x, 800, 1080, 'ALARMS: OFF', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Wish: one quiet hour | *with your thoughts.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const words = ['and', 'wait', 'also', 'oh!', 'hmm']
      words.forEach((w, i) => { const gone = lt > 1.0 + i * 0.12; bubble(x, 690 + (i % 3) * 110, 700 + Math.floor(i / 3) * 150 + (i % 2) * 30, w, gone ? 0 : pop01(t, P.t0 + 0.1 + i * 0.12, 0.25, 2.2), { size: 32, tail: 'bl', col: [BONE, LAV, SKYB][i % 3] }) })
      label(x, 800, 1060, 'shhh. nice.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Wish: to be | *looked after, for once.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 980, 190 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false })
      drawBits(x, SOUP, { S: '#c9c9d8', K: INK, O: ORANGE }, 670, 900, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 820, 700, 'SOUP DELIVERY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wish: to shine | *without trying so hard.*', mood: 'sleepy', star: { x: -150 }, hops: [1.1],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.5, 0.6, 1.6)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.5 * Math.min(1, k); const g = x.createRadialGradient(F.x, F.cy, 40, F.x, F.cy, 260); g.addColorStop(0, '#fff1b0'); g.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = g; x.fillRect(F.x - 280, F.cy - 280, 560, 560); x.restore()
    },
    front(x, t, lt, P, F) {
      sparkles(x, t, F.x, F.cy, P.t0 + 0.6, 8, 170, 0.3)
      sparkles(x, t, F.x, F.cy, P.t0 + 1.6, 8, 190, 0.8)
      label(x, 790, 820, 'GLOW: ON AUTO', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Wish: to leave | *one dish in the sink.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM, B: '#c9c9d8' }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 800, 1070, 'IT CAN WAIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 680, 'just one.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Wish: to choose | *without a poll.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 800, 850, 300, 280, CREAM, { k, rot: -0.03 })
      if (k > 0.5) {
        x.save(); x.translate(800, 850); x.rotate(-0.03)
        text(x, 'POLL', 0, -100, 34, INK, MONO, 700)
        const crossed = lt > 1.0
        x.fillStyle = '#9aa5c4'; x.fillRect(-110, -50, 220, 40); x.fillRect(-110, 10, 220, 40)
        if (crossed) { x.fillStyle = RED; x.fillRect(-130, -10, 260, 10) }
        x.restore()
      }
      label(x, 800, 1070, 'MY CALL. DONE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Wish: to trust | *a little easier.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2), open = ease.inOutCubic(prog(lt, 1.0, 1.6))
      card(x, 800, 860, 220, 340, '#5a4a8a', { k })
      if (k > 0.5) { x.fillStyle = '#fff3c0'; x.globalAlpha = 0.8 * open; x.fillRect(696, 696, 208 * open, 328); x.globalAlpha = 1 }
      drawBits(x, KEY, { Y: GOLD }, lerp(620, 740, ease.outCubic(prog(lt, 0.3, 0.9))), 880, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 1110, 'DOOR: AJAR', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Wish: an adventure | *close to home.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 800, 860, 320, 300, '#ead7a8', { k, rot: 0.04 })
      if (k > 0.5) {
        drawBits(x, HOUSE, { R: RED, W: CREAM, D: BROWN }, 740, 900, 10)
        x.strokeStyle = '#b89a62'; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(760, 900); x.quadraticCurveTo(820, 800, 860, 820); x.stroke(); x.setLineDash([])
        drawBits(x, PIN, { R: RED, W: '#fff' }, 860, 800, 10 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      }
      label(x, 800, 1100, '2 STREETS AWAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Wish: to celebrate | *the small wins.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CUP, { F: ORANGE, W: CREAM, P: PINK, C: BROWN }, 800, 860, 32 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1080, 'REPLIED TO 1 EMAIL', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 1.2, 7, 160, 0.4)
    } },
  { sign: 'aquarius', cap: 'Wish: to be understood | *by one person.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 980, 180 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.5) / 0.25))
      for (let i = 0; i < n; i++) { x.fillStyle = MINT; x.fillRect(560 + i * 50, 760 - i * 20, 34, 30 + i * 20) }
      label(x, 600, 640, 'SIGNAL: FULL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Wish: a good cry | *and a good friend.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 980, 190 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false })
      card(x, 800, 720, 130, 90, '#ffffff', { k: pop01(t, P.t0 + 0.9, 0.3, 2), rot: 0.1 })
      label(x, 800, 1140, 'BOTH. GRANTED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0099', key: 'E', accent: MOONC, ending: 'group',
  title: 'Each sign’s | *new moon wish.*',
  cameos: CAMEOS,
  group: {
    cap: 'New moon, new wish. | *Make yours.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.3, 0.5, 1.8)
      if (k <= 0.01) return
      x.save(); x.translate(540, 650); x.scale(k, k)
      x.shadowColor = GOLD; x.shadowBlur = 40; x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
      x.shadowBlur = 0; x.fillStyle = '#1b1236'; x.beginPath(); x.arc(0, 0, 102, 0, Math.PI * 2); x.fill()
      x.restore()
      sparkles(x, t, 540, 650, t - lt + 1.6, 8, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
