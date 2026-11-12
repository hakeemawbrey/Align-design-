// r2t0409: star_talk, ROLLCALL, "The signs | *learning to knit.*" (~57 s vertical, signs3kit social cut, music: lofi · D)
//   ♈ a scarf in four minutes (9 ft) · ♉ bought the softest yarn, napped on it · ♊ six projects, none finished
//   · ♋ tiny sweaters for the plants · ♌ a sweater of their own face · ♍ dropped one stitch, attempt 23
//   · ♎ matching sweaters for the crush · ♏ everything black · ♐ made a yarn lasso · ♑ opened a shop on day two
//   · ♒ a hat for the wifi router · ♓ tangled, cried, cosy now
//   Ending: callback, Aries's scarf is now forty feet.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, confetti, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#ff9fc4'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

/** a ball of yarn with wrap lines and a loose tail */
function yarn(x, cx, cy, r, k, col = PINK, { tail = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
  x.strokeStyle = 'rgba(27,18,54,0.35)'; x.lineWidth = 5
  for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(-r, i * r * 0.28 - r * 0.3); x.quadraticCurveTo(0, i * r * 0.28 + r * 0.3, r, i * r * 0.28 - r * 0.3); x.stroke() }
  x.restore()
  if (tail) { x.strokeStyle = col; x.lineWidth = 7; x.beginPath(); x.moveTo(r * 0.7, r * 0.6); x.quadraticCurveTo(r * 1.4, r * 1.2, r * 2, r * 0.9); x.stroke() }
  x.restore()
}
/** two knitting needles crossed */
function needles(x, cx, cy, len, k, { col = '#c9c9d8' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const r of [-0.5, 0.5]) { x.save(); x.rotate(r); x.fillStyle = INK; x.fillRect(-7, -len / 2, 14, len); x.fillStyle = col; x.fillRect(-3, -len / 2 + 4, 6, len - 8); x.fillStyle = RED; x.fillRect(-10, len / 2 - 18, 20, 18); x.restore() }
  x.restore()
}
/** a striped scarf from (x0, y) to (x1, y) */
function scarf(x, x0, x1, y, h, k, cols = [RED, SUN, PINK]) {
  if (k <= 0.01 || x1 <= x0) return
  x.save(); x.globalAlpha = clamp(k)
  x.fillStyle = INK; x.fillRect(x0 - 5, y - h / 2 - 5, x1 - x0 + 10, h + 10)
  const st = 28
  for (let p = x0, i = 0; p < x1; p += st, i++) { x.fillStyle = cols[i % cols.length]; x.fillRect(p, y - h / 2, Math.min(st, x1 - p), h) }
  x.fillStyle = cols[0]; for (let i = 0; i < 4; i++) x.fillRect(x1, y - h / 2 + 6 + i * (h / 4), 22, 8)
  x.restore()
}
/** a knitted sweater (body + sleeves), optional fn draws the front design */
function sweater(x, cx, cy, s, k, col, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-110, -110, 220, 230); x.fillRect(-170, -110, 70, 170); x.fillRect(100, -110, 70, 170)
  x.fillStyle = col; x.fillRect(-102, -102, 204, 214); x.fillRect(-162, -102, 62, 154); x.fillRect(100, -102, 62, 154)
  x.fillStyle = 'rgba(27,18,54,0.25)'; for (let i = 0; i < 5; i++) x.fillRect(-100, 80 + (i % 2) * 8, 200, 4)
  x.fillStyle = INK; x.fillRect(-36, -110, 72, 24)
  if (fn) fn()
  x.restore()
}
const PLANT = ['....GG....', '...GGGG...', '.GG.GG.GG.', 'GGGGGGGGGG', '.GGGGGGGG.', '...GGGG...', '...TTTT...', '..TTTTTT..', '..TTTTTT..', '...TTTT...']
const ROUTER = ['K.......K', 'K.......K', 'K.......K', 'KKKKKKKKK', 'KGGGGGGGK', 'KGMGMGMGK', 'KKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Knit a scarf | in *four minutes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      needles(x, 790, 700, 200, pop01(t, P.t0 + 0.2, 0.35, 2))
      scarf(x, 480, lerp(480, 930, clamp((lt - 0.4) / 1.0)), 960, 70, pop01(t, P.t0 + 0.3, 0.3, 2))
      lab(x, 790, 1120, 'LENGTH: 9 FEET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Bought the softest yarn. | *Napped on it.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: { x: -110, y: 40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      yarn(x, 330, 1030, 90, k, MINT, { tail: false }); yarn(x, 520, 1060, 100, k, PINK, { tail: false }); yarn(x, 700, 1040, 90, k, SKYB, { tail: false })
    },
    front(x, t, lt, P) {
      lab(x, 800, 660, 'PROJECTS: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { bg: GREEN, rot: 0.04, size: 36 })
    } },
  { sign: 'gemini', cap: 'Started six projects. | *Finished none.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [PINK, SUN, MINT, SKYB, LAV, ORANGE]
      for (let i = 0; i < 6; i++) { const kk = pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2); yarn(x, 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 170, 46, kk, cols[i]); needles(x, 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 170, 90, kk) }
      lab(x, 790, 1120, 'DONE: 0/6', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 38 })
    } },
  { sign: 'cancer', cap: 'Tiny sweaters | *for the plants.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PLANT, { G: GREEN, T: BROWN }, 800, 880, 24 * k)
      if (lt > 0.8) sweater(x, 800, 870, 0.6, pop01(t, P.t0 + 0.8 * 1.29, 0.35, 2), PINK)
      lab(x, 800, 1120, 'IT GETS COLD', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
      hearts(x, t, 800, 700, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Knit a sweater | of *their own face.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sweater(x, 800, 860, 1.05, pop01(t, P.t0 + 0.2, 0.35, 2), ORANGE, () => signChar(x, t, 'leo', 0, 10, 150, { mood: 'wink', seed: 45, glyph: false, glow: 0.3 }))
      lab(x, 800, 1130, 'ONE OF ONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Dropped one stitch. | *Started over.*', mood: lt => lt > 1.1 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const unravel = clamp((lt - 0.9) / 0.6)
      scarf(x, 620, lerp(960, 640, unravel), 820, 80, pop01(t, P.t0 + 0.2, 0.3, 2), [MINT, BONE])
      yarn(x, 760, 1010, 60, pop01(t, P.t0 + 0.2, 0.35, 2), MINT)
      lab(x, 790, 660, 'ATTEMPT #23', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: MINT, rot: 0.04, size: 40 })
    } },
  { sign: 'libra', cap: 'Matching sweaters | for *their crush.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sweater(x, 700, 880, 0.75, pop01(t, P.t0 + 0.2, 0.35, 2), PINK, () => drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 0, 14))
      sweater(x, 880, 880, 0.75, pop01(t, P.t0 + 0.5, 0.35, 2), PINK, () => drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 0, 14))
      lab(x, 790, 650, 'FIRST DATE: TUESDAY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: LAV, rot: 0.04, size: 30 })
      lab(x, 790, 1110, 'TOO SOON?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Every project? | *Black. Always.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      yarn(x, 700, 990, 70, k, '#4a4560'); yarn(x, 860, 1010, 60, k, '#4a4560')
      sweater(x, 790, 780, 0.75, pop01(t, P.t0 + 0.6, 0.35, 2), '#4a4560', () => { x.fillStyle = '#6b6680'; x.fillRect(-60, -20, 120, 12) })
      lab(x, 790, 1130, 'COLOUR: “MIDNIGHT”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: LAV, rot: -0.04, size: 30 })
    } },
  { sign: 'sagittarius', cap: 'Got bored. | Made a *yarn lasso.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.ellipse(F.x + 170, F.top - 100, 130 * k, 40 * k, Math.sin(t * 6) * 0.3, 0, Math.PI * 2); x.stroke()
        x.strokeStyle = SUN; x.lineWidth = 8; x.stroke()
        x.beginPath(); x.moveTo(F.x + 170, F.top - 60); x.lineTo(F.x + 90, F.cy); x.stroke(); x.restore()
      }
      lab(x, 790, 1100, 'YEEHAW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 40 })
    } },
  { sign: 'capricorn', cap: 'Day two: | *opened a shop.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-165, -165, 330, 60); txt(x, 'SCARVES INC.', 0, -135, { size: 30, color: BONE })
        scarf(x, -120, 120, -20, 50, 1, [GREEN, BONE]); txt(x, 'BULK ORDERS', 0, 70, { size: 28, font: MONO, weight: 700 }); txt(x, 'WELCOME', 0, 112, { size: 28, font: MONO, weight: 700 })
      })
      lab(x, 790, 1110, 'HOBBY? NO. BRAND.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: GOLD, rot: -0.04, size: 30 })
    } },
  { sign: 'aquarius', cap: 'Knit a hat | *for the wifi router.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, ROUTER, { K: INK, G: '#c9c9d8', M: Math.sin(t * 8) > 0 ? MINT : GREEN }, 800, 960, 22 * k, { outline: null })
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      if (lt > 0.7) { x.save(); x.translate(800, lerp(600, 830, d)); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, Math.PI, 0); x.fill(); x.fillStyle = SKYB; x.beginPath(); x.arc(0, 0, 88, Math.PI, 0); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, -96, 22, 0, Math.PI * 2); x.fill(); x.restore() }
      lab(x, 800, 1120, 'IT LOOKED COLD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'Got tangled. Cried. | *Cosy now.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt > 1.3 ? 1 : 3, star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k); x.strokeStyle = LAV; x.lineWidth = 10
        for (let i = 0; i < 5; i++) { x.beginPath(); x.ellipse(F.x, F.cy + 20, 150, 50, -0.4 + i * 0.2, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      yarn(x, 800, 960, 70, pop01(t, P.t0 + 0.2, 0.35, 2), LAV)
      lab(x, 790, 700, 'STATUS: BURRITO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0409', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *learning to knit.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve scarves. | *None match.*' },
  last: {
    text: 'Aries’ scarf? | *Now 40 feet.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 260, 1080, 230 * k, { mood: lt > 1.4 ? 'sparkle' : 'squint', seed: 9, look: [1, 0], hops: [t0 + 1.4] })
      const p = ease.outCubic(clamp((lt - 0.4) / 1.4))
      scarf(x, 380, lerp(380, 1060, p), 1130, 70, 1)
      scarf(x, lerp(1060, 20, clamp((lt - 1.6) / 1.2)), 1060, 1240, 70, lt > 1.6 ? 1 : 0)
      lab(x, 600, 1360, 'STILL GOING', pop01(t, t0 + 1.8, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.03, size: 40 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
