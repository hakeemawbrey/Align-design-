// r2a0480: star_advice, ADVICE ROLL CALL, "Each sign’s little | *ritual for luck.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one small, warm luck ritual each (astrology as gentle fun), with a light visual gag. Ending: group.
//   0.0–3.6    "Each sign’s little | *ritual for luck.*"
//   3.6–49.2   ♈ lucky socks, then go first anyway · ♉ a proper breakfast · ♊ ask for luck, get ten replies
//              · ♋ a note from home in your pocket · ♌ one power pose · ♍ pack the night before
//              · ♎ wear the outfit you love · ♏ keep the ritual secret · ♐ wish on a shooting star, then go see
//              · ♑ water the desk plant, steady wins · ♒ invent your own (hop, spin, clap) · ♓ wish on a star, you are one
//  49.2        group (the ending): "Twelve rituals. | *One lucky you.*"  a four-leaf clover pops up, LUCK: LOADING
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#5fd068'
const SOCK = ['..RRR', '..RWR', '..RRR', '..RWR', '..RRR', 'RRRRR', 'RRRRR', 'RRRR.']
const SOCK_C = { R: RED, W: CREAM }
const TOAST = ['.TTTTTT.', 'TTTTTTTT', 'TBBBBBBT', 'TBBYYBBT', 'TBBYYBBT', 'TBBBBBBT', 'TTTTTTTT']
const TOAST_C = { T: '#c98f2a', B: '#f2d28a', Y: GOLD }
const BAG = ['..KKKK..', '.K....K.', 'BBBBBBBB', 'BBYBBYBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB']
const BAG_C = { K: INK, B: PURP, Y: GOLD }
const HANGER = ['...KK...', '..K..K..', '...K....', '..KKKK..', '.KKKKKK.']
const DRESS = ['..P..P..', '..PPPP..', '..PPPP..', '...PP...', '..PPPP..', '.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP']
const PLANT = ['.G.G.G.', 'GGGGGGG', '.GGGGG.', '...G...', 'PPPPPPP', '.PPPPP.', '.PPPPP.']
const PLANT_C = { G: GREEN, P: ORANGE }
const CAN = ['S.......', '.S......', '..SKKKK.', '...KKKKK', '...KKKKK', '...KKKK.']
const CAN_C = { S: SKYB, K: GREY }
const CLOVER = ['.GG...GG.', 'GGGG.GGGG', 'GGGGGGGGG', '.GGGDGGG.', '..GDDDG..', '.GGGDGGG.', 'GGGGGGGGG', 'GGGG.GGGG', '.GG.DGGG.', '....D....', '...D.....']
const CLOVER_C = { G: GREEN, D: '#2f8a3c' }
const NOTE = ['WWWWWW', 'WPWWPW', 'WPPPPW', 'WWPPWW', 'WWWWWW']

const CAMEOS = [
  { sign: 'aries', cap: 'Wear the lucky socks. | *Then go first anyway.*', mood: 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, SOCK_C, 730, 920, 20 * k, { rot: -0.1 })
      drawBits(x, SOCK, SOCK_C, 860, 940, 20 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      L(x, 800, 680, 'LUCKY SINCE 2019', pop01(t, P.t0 + 0.8, 0.3, 2), GOLD, -0.04, 30)
      bubble(x, 800, 1130, 'me first!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'A proper breakfast. | *Luck starts with toast.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOAST, TOAST_C, 800, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      puffs(x, t, 800, 800, P.t0 + 0.5, { n: 3, cell: 9, rise: 110, spread: 80 })
      L(x, 800, 1120, 'BUTTER: GENEROUS', pop01(t, P.t0 + 1.2, 0.3, 2.2), GREEN, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Ask for luck. | *Get ten replies.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.5) / 0.3))
      const R = ['you got this!', 'good luck!!', '✦✦✦', 'go get it ♡']
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'wish me luck?', headCol: GOLD, lines: R.slice(0, n).map((s, i) => [s, i % 2 ? MINT : PINK, 1, i % 2 === 1]) })
      L(x, 790, 1130, `REPLIES: ${Math.min(10, n * 3)}`, pop01(t, P.t0 + 0.8, 0.3, 2), ACC, -0.04, 32)
    } },
  { sign: 'cancer', cap: 'A note from home. | *Luck in your pocket.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const o = ease.outCubic(prog(lt, 0.7, 1.2))
      drawBits(x, NOTE, { W: CREAM, P: PINK }, 800, lerp(1000, 860, o), 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.2, -0.04, o) })
      if (o > 0.6) bubble(x, 800, 680, 'proud of you | – mum', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
      hearts(x, t, 800, 860, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'One power pose. | *Luck loves confidence.*', mood: 'sparkle', star: { x: -100, s: 340 }, hops: [0.6], squash: lt => lt > 0.6 && lt < 2 ? -0.08 : 0,
    front(x, t, lt, P) {
      sparkles(x, t, 440, 860, P.t0 + 0.8, 8, 220, 0.2)
      L(x, 800, 700, 'POSE: HELD', pop01(t, P.t0 + 0.5, 0.3, 2), ORANGE, -0.04, 36)
      L(x, 800, 1060, '2 MINUTES ✦', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Pack the night before. | *Ready is lucky.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 700, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      note(x, 870, 860, pop01(t, P.t0 + 0.5, 0.3, 2), ['keys ✓', 'snack ✓', 'charger ✓'], { w: 220, bg: CREAM, size: 28, rot: 0.05, font: MONO, weight: 700 })
      L(x, 800, 660, 'PACKED: 9 P.M.', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Wear the outfit you love. | *Feel good, do good.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, HANGER, { K: INK }, 800, 740, 16 * k)
      drawBits(x, DRESS, { P: PINK }, 800, 880, 24 * k)
      sparkles(x, t, 800, 860, P.t0 + 1.0, 7, 170, 0.5)
      L(x, 800, 1110, 'MAIN CHARACTER FIT', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Keep the ritual secret. | *It works better.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      giftBox(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), 0, { body: '#140c30', ribbon: RED, bow: false })
      L(x, 800, 940, '???', pop01(t, P.t0 + 0.6, 0.3, 2), RED, 0.04, 44, CREAM)
      bubble(x, 800, 680, 'not telling.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Wish on a shooting star. | *Then go see.*', mood: 'sparkle', look: [-1, -1], star: { x: 150 }, hops: [1.5],
    back(x, t, lt, P) {
      const p = prog(lt, 0.3, 1.1)
      if (p > 0 && p < 1) {
        const sx = lerp(180, 520, p), sy = lerp(560, 760, p)
        x.save(); x.strokeStyle = 'rgba(255,241,200,0.6)'; x.lineWidth = 8; x.beginPath(); x.moveTo(sx - 120, sy - 70); x.lineTo(sx, sy); x.stroke(); x.restore()
        sparkles(x, t, sx, sy, t - 0.05, 4, 20, 0.1, [GOLD, BONE])
        x.save(); x.fillStyle = GOLD; x.fillRect(sx - 12, sy - 12, 24, 24); x.restore()
      }
    },
    front(x, t, lt, P) {
      L(x, 330, 900, 'WISH: SENT', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 330, 1080, 'road trip?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Water the desk plant. | *Steady wins.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const g = 1 + 0.25 * ease.outBack(prog(lt, 1.0, 1.5))
      drawBits(x, PLANT, PLANT_C, 330, 1010 - 40 * (g - 1), 22 * g * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAN, CAN_C, 470, 800, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: -1, rot: 0.3 })
      L(x, 330, 660, 'DAY 412 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Invent your own ritual. | *Luck likes originals.*', mood: 'sparkle', star: ST, hops: [0.4, 1.4],
    squash: lt => Math.sin(lt * 4) * 0.05,
    front(x, t, lt, P) {
      const STEP = ['HOP', 'SPIN', 'CLAP', '✦ LUCK']
      STEP.forEach((s, i) => L(x, 800 + (i % 2 ? 40 : -40), 660 + i * 130, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), [SKYB, MINT, GOLD, PINK][i], i % 2 ? 0.05 : -0.05, 36))
    } },
  { sign: 'pisces', cap: 'Wish on a star. | *You are one.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sparkles(x, t, 380, 860, P.t0 + 1.2, 8, 220, 0.4)
      bubble(x, 800, 700, 'wait… me?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 900, 'WISH: GRANTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 36)
      hearts(x, t, 800, 1100, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0480', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s little | *ritual for luck.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve rituals. | *One lucky you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CLOVER, CLOVER_C, 540, 720, 18 * pop01(t, t0 + 1.4, 0.4, 2), { rot: Math.sin(t * 2) * 0.08 })
      L(x, 540, 560, 'LUCK: LOADING ✦', pop01(t, t0 + 1.8, 0.3, 2.4), ACC, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
