// v3a044: star_advice, ADVICE SOLO, "Aquarius, stop doing | this in love." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (solo mode, 9 cards): a relatable Aquarius-in-love habit + a warm reframe, one gag each.
// Ending: 'callback' (no lesson): the phone from card 8 comes back with a same-day reply.
//   0.0–3.6    "Aquarius, stop doing | *this in love.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              vanishing to think (a door hanger: BRB, THINKING) · too cool to care (the CHILL thermometer warms up)
//              · "statistically, I like you" · personal space: 9 FT → scooted: COZY · the TIME MACHINE v2 blueprint
//              · flirting in riddles ("what has keys but no locks?") · a normal candlelit dinner: SURPRISINGLY NICE
//              · seen 3 days ago, next eclipse soon · matching antennae
//  37.8        "Rare. | *And worth knowing.*"  Aquarius comes back, big.
//  41.2        "They replied. | *Same day.*"  The phone comes back: replied, just now.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', TEAL = '#2fc79a', AQUA = '#6fc3ff', WOOD = '#c98f2a'
const S = 'aquarius'

function slab(x, cx, cy, w, h, k, { bg = BONE, rot = 0, inner = null, pad = 14 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (inner) { x.fillStyle = inner; x.fillRect(-w / 2 + pad, -h / 2 + pad, w - 2 * pad, h - 2 * pad) }
  return true
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800) => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// the phone of card 8 (and the callback): a message, then a status line
function phone(x, cx, cy, k, msg, status, statusCol, rot = 0.04) {
  if (!slab(x, cx, cy, 270, 400, k, { bg: '#2a2350', inner: '#140c30', rot })) return
  x.fillStyle = LAV; x.fillRect(-110, -140, 200, 80); txt(x, msg, -10, -100, 30)
  txt(x, status, 0, 10, 26, statusCol, MONO, 700)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  x.restore()
}
// little antennae on top of a star (two stalks with bobbles)
function antennae(x, t, F, k, col) {
  if (k <= 0.01) return
  for (const d of [-1, 1]) {
    const bx = F.x + d * F.S * 0.12, by = F.top + 6
    x.fillStyle = INK; x.fillRect(bx - 5, by - 70 * k, 10, 70 * k)
    const wob = Math.sin(t * 6 + d) * 6
    x.fillStyle = INK; x.fillRect(bx - 17 + wob, by - 70 * k - 30, 34, 34); x.fillStyle = col; x.fillRect(bx - 12 + wob, by - 70 * k - 25, 24, 24)
  }
}
const CANDLE = ['..F..', '.FFF.', '..W..', '.WWW.', '.WWW.', '.WWW.', '.WWW.']
const PLATE = ['..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']

const CAMEOS = [
  { sign: S, cap: 'Vanishing to think? | *Say so first.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 870); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -240, 280, 480); x.fillStyle = '#7a4a9f'; x.fillRect(-130, -230, 260, 470)
        x.fillStyle = GOLD; x.fillRect(90, 10, 22, 22)
        x.restore()
      }
      const sw = Math.sin(t * 3) * 0.05
      if (slab(x, 800, 790, 200, 190, pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: '#fff4e2', rot: sw })) {
        x.fillStyle = INK; x.beginPath(); x.arc(0, -70, 22, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7a4a9f'; x.beginPath(); x.arc(0, -70, 14, 0, Math.PI * 2); x.fill()
        txt(x, 'BRB:', 0, -8, 38); txt(x, 'THINKING', 0, 40, 32, TEAL)
        x.restore()
      }
      label(x, 800, 1160, 'BACK IN 2 HRS. LOVE U.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Too cool to care? | *Care out loud.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), w = ease.inOutCubic(prog(lt, 0.6, 1.4))
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-36, -230, 72, 380); x.beginPath(); x.arc(0, 180, 70, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff4e2'; x.fillRect(-24, -218, 48, 360)
        const col = w < 0.5 ? '#6fc3ff' : '#ff4f86'
        x.fillStyle = col; x.beginPath(); x.arc(0, 180, 58, 0, Math.PI * 2); x.fill()
        const h = lerp(60, 330, w); x.fillRect(-16, 150 - h, 32, h)
        x.fillStyle = INK; for (let i = 0; i < 7; i++) x.fillRect(24, -200 + i * 50, 22, 6)
        x.restore()
      }
      label(x, 800, 600, w < 0.5 ? 'CHILL: -40°' : 'CHILL: GONE', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: w < 0.5 ? SKYB : PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Skip the data. | Say *“I like you.”*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, -1], star: { x: -200, y: 40 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (slab(x, 790, 880, 290, 290, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#fff4e2', rot: 0.04 })) {
        x.fillStyle = INK; x.beginPath(); x.arc(0, 10, 110, 0, Math.PI * 2); x.fill()
        x.fillStyle = PINK; x.beginPath(); x.moveTo(0, 10); x.arc(0, 10, 100, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.999); x.closePath(); x.fill()
        txt(x, 'LIKE YOU', 0, 10, 34, INK, MONO, 700)
        txt(x, 'FIG. 1', 0, -120, 22, '#6b62a8', MONO, 700)
        x.restore()
      }
      bubble(x, 470, 620, 'statistically, | I like you.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'NERDY. ALSO CUTE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your space matters. | *So do they.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -280, s: 240 },
    hops: [1.0],
    front(x, t, lt, P, F) {
      const sc = ease.inOutCubic(prog(lt, 1.0, 1.5))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const px = lerp(870, 600, sc)
      if (k > 0.01) signChar(x, t, 'gemini', px, 920, 200 * k, { mood: sc > 0.5 ? 'heart' : 'neutral', look: [-1, 0], seed: 51, glyph: false })
      if (sc < 0.95) {
        x.save(); x.globalAlpha = 1 - sc
        x.fillStyle = BONE; for (let i = 0; i < 8; i++) x.fillRect(lerp(370, px - 110, i / 8), 1080, 20, 6)
        x.restore()
        label(x, 620, 1130, 'SPACE: 9 FT', pop01(t, P.t0 + 0.5, 0.3, 2.2) * (1 - sc), { size: 32, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      }
      label(x, 480, 640, 'COZY. STILL FREE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Share the *weird* ideas. | They want in.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      if (slab(x, 780, 820, 330, 260, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: '#2f5fbf', rot: -0.04 })) {
        x.strokeStyle = '#cfe4ff'; x.lineWidth = 3
        for (let i = -150; i <= 150; i += 30) { x.beginPath(); x.moveTo(i, -120); x.lineTo(i, 120); x.stroke() }
        x.lineWidth = 5; x.strokeRect(-90, -50, 140, 110); x.beginPath(); x.arc(-20, 5, 36, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(50, 0); x.lineTo(120, -40); x.stroke()
        txt(x, 'TIME MACHINE v2', 0, -96, 26, '#fff', MONO, 700)
        x.restore()
      }
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 840, 1060, 150 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, -1], seed: 52, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 520, 630, "I'm in.", pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: S, cap: 'Love isn’t | a *riddle.* Be clear.', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: { x: -220, y: 40 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 830, 980, 190 * k, { mood: 'squint', look: [-1, -1], seed: 53, glyph: false })
      bubble(x, 480, 620, 'what has keys | but no locks?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 34, tail: 'bl' })
      bubble(x, 480, 620, 'dinner friday?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      if (lt < 1.4) label(x, 830, 760, '???', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: BONE, rot: 0.06 })
      else label(x, 830, 760, 'YES!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.06 })
    } },
  { sign: S, cap: 'A normal date | won’t *break* you.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 1000); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -10, 340, 36); x.fillStyle = '#fff4e2'; x.fillRect(-164, -4, 328, 24)
        x.fillStyle = INK; x.fillRect(-14, 26, 28, 120); x.fillStyle = WOOD; x.fillRect(-8, 26, 16, 114)
        x.restore()
        drawBits(x, PLATE, { W: '#ffffff' }, 730, 958, 18 * k)
        drawBits(x, CANDLE, { F: Math.floor(t * 8) % 2 ? GOLD : '#ffb34a', W: '#fff4e2' }, 870, 930, 16 * k)
      }
      label(x, 800, 720, 'NO ALIENS. JUST PASTA.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 800, 1140, 'SURPRISINGLY NICE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.03 })
    } },
  { sign: S, cap: 'Reply before | the *next eclipse.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'hey you :)', 'seen 3 days ago', '#9aa5c4')
      const e = pop01(t, P.t0 + 0.9, 0.3, 2)
      if (e > 0.01) { x.save(); x.translate(800, 610); x.scale(e, e); x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); const m = prog(lt, 0.9, 1.8); x.fillStyle = '#140c30'; x.beginPath(); x.arc(lerp(-110, -22, m), 0, 50, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 800, 1140, 'NEXT ECLIPSE: SOON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not too different. | *Just rare.*', mood: 'sparkle', star: { x: -200 }, hops: [0.5, 1.5],
    front(x, t, lt, P, F) {
      antennae(x, t, F, pop01(t, P.t0 + 0.3, 0.3, 2), AQUA)
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) {
        const G = signChar(x, t, 'libra', 820, 930, 230 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 54, glyph: false, hops: [P.t0 + 1.6] })
        antennae(x, t, G, pop01(t, P.t0 + 1.2, 0.3, 2), PINK)
      }
      label(x, 540, 1150, 'MATCHING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.03 })
      hearts(x, t, 540, 900, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3a044', key: 'G', accent: AQUA, solo: S, ending: 'callback',
  title: 'Aquarius, stop | doing *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Rare. | *And worth knowing.*', mood: 'sparkle' },
  last: {
    text: 'They replied. | *Same day.*',
    draw(x, t, lt) {
      phone(x, 540, 1000, 1.3 * pop01(t, t - lt + 0.5, 0.35, 2), 'hey you :)', 'replied: just now', TEAL, -0.03)
      hearts(x, t, 540, 760, t - lt + 1.2, { n: 8, life: 2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
