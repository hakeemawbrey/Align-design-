// v3a098: star_advice, ADVICE SOLO, "Virgo, your gift | is this." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quiet care Virgos give without noticing, one gag each.
//   0.0–3.6    "Virgo, your gift | *is this.*"
//   3.6–37.8   nine cards (3.8 s each):
//              you notice everything (the 1 cm haircut) · you always carry a plaster · your list saves the trip (passports: packed)
//              · your advice works (a droopy plant perks up) · you fix the group project (A+) · your love is a charged
//              phone (a battery fills) · you polish their profile and the matches arrive · you untangle every mess
//              (a knot becomes a line) · you show up, every time (an umbrella for two)
//  37.8        "Quiet care. | *Loud impact.*"  Virgo comes back, big.
//  41.2        callback: "The plant? | *Thriving.*"  the plant comes back, in bloom.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const VIR = '#ef5c94', WOOD = '#c98f2a', LEAF = '#5fd068'
const S = 'virgo'

const PLASTER = ['..TTTTTTTTTT..', '.TTTTTTTTTTTT.', 'TTTTPPPPPPTTTT', 'TTTTPdPdPPTTTT', 'TTTTPPdPdPTTTT', 'TTTTPPPPPPTTTT', '.TTTTTTTTTTTT.', '..TTTTTTTTTT..']
const PLASTER_C = { T: '#f2c9a0', P: '#fff4e2', d: '#d8b090' }
const POT = ['.RRRRRRRR.', 'RRRRRRRRRR', '.rrrrrrrr.', '.rrrrrrrr.', '..rrrrrr..', '..rrrrrr..']
const POT_C = { R: '#c8643a', r: '#a8502a' }
const LETTERA = ['.RRRR.', 'RR..RR', 'RR..RR', 'RRRRRR', 'RR..RR', 'RR..RR']

// a plant in a pot: droop 1 = wilted, 0 = perky; bloom adds flowers
function plant(x, t, cx, cy, s, droop, bloom) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const stems = [-40, 0, 40]
  stems.forEach((sx, i) => {
    const bend = droop * (i - 1 || 0.6) * 1.0 + 0.05 * Math.sin(t * 2 + i)
    x.save(); x.translate(sx * 0.5, -40); x.rotate(bend * 0.9)
    x.fillStyle = INK; x.fillRect(-8, -150, 16, 150); x.fillStyle = droop > 0.5 ? '#8a9a40' : LEAF; x.fillRect(-4, -146, 8, 146)
    x.fillStyle = INK; x.beginPath(); x.ellipse(-30, -110, 34, 18, -0.5, 0, 7); x.fill(); x.beginPath(); x.ellipse(30, -70, 34, 18, 0.5, 0, 7); x.fill()
    x.fillStyle = droop > 0.5 ? '#a0a848' : LEAF; x.beginPath(); x.ellipse(-30, -110, 28, 13, -0.5, 0, 7); x.fill(); x.beginPath(); x.ellipse(30, -70, 28, 13, 0.5, 0, 7); x.fill()
    if (bloom > 0.01) { x.save(); x.translate(0, -160); x.scale(bloom, bloom); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, 7); x.fill(); x.fillStyle = [PINK, GOLD, LAV][i]; for (let p = 0; p < 5; p++) { const a = p / 5 * Math.PI * 2 + t; x.beginPath(); x.arc(Math.cos(a) * 16, Math.sin(a) * 16, 14, 0, 7); x.fill() } x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 9, 0, 7); x.fill(); x.restore() }
    x.restore()
  })
  x.restore()
  drawBits(x, POT, POT_C, cx, cy + 20 * s, 18 * s)
}
function battery(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -170, 180, 340); x.fillRect(-36, -196, 72, 30)
  x.fillStyle = '#2a2350'; x.fillRect(-80, -160, 160, 320)
  const n = Math.round(p * 5)
  for (let i = 0; i < n; i++) { x.fillStyle = n < 2 ? '#ff5f5f' : MINT; x.fillRect(-68, 96 - i * 62, 136, 52) }
  x.restore()
}
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x)
  x.restore()
}
function cord(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  x.strokeStyle = INK; x.lineWidth = 16; x.lineCap = 'round'; x.lineJoin = 'round'
  const pts = []
  for (let i = 0; i <= 80; i++) { const u = i / 80, a = u * Math.PI * 10; const r = 70 * (1 - p) * Math.sin(Math.PI * u); pts.push([cx - 150 + 300 * u + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9]) }
  for (const [w, c] of [[16, INK], [8, SKYB]]) { x.lineWidth = w; x.strokeStyle = c; x.beginPath(); pts.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.stroke() }
  x.restore()
}
function umbrella(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 230, Math.PI, 0); x.fill()
  x.fillStyle = VIR; x.beginPath(); x.arc(0, 0, 220, Math.PI, 0); x.fill()
  x.fillStyle = '#ff9cc0'; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 220, Math.PI + i * Math.PI / 4, Math.PI + (i + 0.5) * Math.PI / 4); x.fill() }
  x.fillStyle = INK; x.fillRect(-7, -10, 14, 200)
  x.restore()
  x.fillStyle = 'rgba(143,227,255,0.7)'
  for (let i = 0; i < 26; i++) { const rx = 130 + ((i * 97) % 820), ry = 500 + ((t * 600 + i * 131) % 700); if (Math.abs(rx - cx) < 240 && ry > cy - 240) continue; x.fillRect(rx, ry, 5, 24) }
}

const CAMEOS = [
  { sign: S, cap: 'You notice | *everything.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 990, 180 * k, { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 560, 640, 'new haircut?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 830, 760, 'IT WAS 1 CM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: VIR, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You always | *have a plaster.*', mood: lt => lt > 1.1 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 830, 990, 180 * k, { mood: lt > 1.3 ? 'happy' : 'squint', look: [-1, 0], seed: 22, glyph: false })
      bubble(x, 830, 650, 'ow. paper cut', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 30, tail: 'br' })
      drawBits(x, PLASTER, PLASTER_C, 560, 900, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.4), { rot: -0.3 })
      label(x, 560, 1130, 'ALWAYS. CARRIES. ONE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your list | *saves the trip.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.7],
    front(x, t, lt, P) {
      ;['PASSPORTS: PACKED', 'CHARGERS: PACKED', 'SNACKS: PACKED', 'YOUR SOCKS: PACKED'].forEach((s, i) =>
        label(x, 780, 660 + i * 120, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2.4), { size: 28, bg: [MINT, SKYB, GOLD, PINK][i], rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Your advice | *actually works.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) plant(x, t, 790, 1030, 1.3 * k, 1 - ease.outBack(prog(lt, 0.9, 1.5)), 0)
      bubble(x, 790, 620, 'water + sun.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bc' })
      if (lt > 1.5) sparkles(x, t, 790, 860, P.t0 + 1.5 * 1.29, 7, 160, 0.3, [LEAF, GOLD, BONE])
    } },
  { sign: S, cap: 'You fix | *the group project.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -220 },
    front(x, t, lt, P) {
      const neat = ease.inOutCubic(prog(lt, 0.7, 1.3))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 6; i++) {
        if (k < 0.01) break
        const r = lerp((i % 2 ? 1 : -1) * (0.3 + i * 0.12), 0, neat), dx = lerp((i % 3 - 1) * 70, 0, neat), dy = lerp(-30 * i, -14 * i, neat)
        x.save(); x.translate(790 + dx, 1000 + dy); x.rotate(r); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -14, 240, 28); x.fillStyle = '#fff4e2'; x.fillRect(-114, -9, 228, 18); x.restore()
      }
      label(x, 790, 700, 'A+', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 64, bg: MINT, rot: -0.06 })
    } },
  { sign: S, cap: 'Your love looks like | *a charged phone.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      battery(x, 790, 880, 0.9 * pop01(t, P.t0 + 0.2, 0.3, 2), clamp(0.2 + (lt - 0.5) / 1.4 * 0.8))
      label(x, 790, 1120, 'FULL. FOR YOU.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You polish their profile. | *Matches arrive.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#3d3470'; x.fillRect(-90, -140, 180, 120)
        x.fillStyle = BONE; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('bio: edited', 0, -80)
        ;[0, 1, 2].forEach(i => { if (lt > 0.9 + i * 0.3) { x.fillStyle = PINK; x.fillRect(-90, 10 + i * 46, 180, 38); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('✦ NEW MATCH', 0, 30 + i * 46) } })
      })
      label(x, 780, 1120, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You untangle | *every mess.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      cord(x, t, 760, 880, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.6)))
      label(x, 790, 1080, 'UNTANGLED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'You show up. | *Every single time.*', mood: 'happy', look: [1, 0], star: { x: -160, y: 30, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      umbrella(x, t, 540, 760, pop01(t, P.t0 + 0.6, 0.35, 2))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 690, 990, 200 * k, { mood: lt > 0.8 ? 'heart' : 'wide', look: [-1, 0], seed: 23, glyph: false, hops: [P.t0 + 1.2] })
      label(x, 540, 1150, 'BROUGHT TWO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a098', key: 'F', accent: VIR, solo: S, ending: 'callback',
  title: 'Virgo, your gift | *is this.*',
  cameos: CAMEOS,
  group: { cap: 'Quiet care. | *Loud impact.*', mood: 'sparkle' },
  last: {
    text: 'The plant? | *Thriving.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) plant(x, t, 540, 1180, 1.5 * k, 0, pop01(t, t - lt + 0.9, 0.35, 2.4))
      label(x, 540, 1330, 'IN BLOOM', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: VIR, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
