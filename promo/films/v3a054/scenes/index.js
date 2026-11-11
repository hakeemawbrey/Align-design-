// v3a054: zodiac.advice444, ADVICE SOLO, "Scorpio, you're allowed | to rest." (~43 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Scorpio-style, one gag each.
//   0.0–3.6    "Scorpio, you’re | *allowed to rest.*"  One big Scorpio pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the magnifying glass goes down: CASE CLOSED (TODAY) · a text that says "ok." gets decoded: IT MEANS OK
//              · the brick wall gets a door: OPEN HOUSE · a sleep mask with eyes drawn on: STILL INTENSE (ASLEEP)
//              · a heavy bag labelled 2019 is dropped: LIGHTER ALREADY · "I'm tired." and Taurus brings a pillow
//              · black hoodie + couch: OUTFIT: RESTING · the deep thoughts get a sign: BACK MONDAY
//              · a blanket burrito: SOFT MODE
//  37.8        group ending: "Rest now. | *Brood later.*"  Scorpio comes back, sleepy.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PLUM = '#ff5f8f', RED = '#e23d4e', WOOD = '#c98f2a', BRICK = '#b5523b'
const S = 'scorpio'

// ── props
const HOODIE = [
  '...KKKKKK...',
  '..KKkkkkKK..',
  '.KKKkkkkKKK.',
  'KKKKKKKKKKKK',
  'KKKKKWWKKKKK',
  'KKKKKWWKKKKK',
  'KK.KKKKKK.KK',
  'KK.KKKKKK.KK',
  'KK.KKKKKK.KK',
  '...KKKKKK...',
]
const HOODIE_C = { K: '#2b2440', k: '#140c30', W: '#c9c4dd' }
const PILLOW = [
  'P..........P',
  '.PPPPPPPPPP.',
  '.PWPPPPPPPP.',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  'P..........P',
]
const PILLOW_C = { P: '#fff4e2', W: '#ffffff' }

function magnifier(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 70, 28, 150); x.fillStyle = WOOD; x.fillRect(-8, 76, 16, 140)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9c9d8'; x.beginPath(); x.arc(0, 0, 82, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe9ff'; x.beginPath(); x.arc(0, 0, 68, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-40, -40, 16, 30)
  x.restore()
}
function textMsg(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -54, 220, 108)
  x.fillStyle = LAV; x.fillRect(-102, -46, 204, 92)
  x.fillStyle = INK; x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ok.', 0, 2)
  x.restore()
  // the "analysis" arrows fan out, then get crossed through
  const p = clamp((lt - 0.5) * 2.5), gone = clamp((lt - 1.2) * 3)
  if (p > 0.01) {
    x.save(); x.globalAlpha = 1 - gone * 0.8
    x.strokeStyle = PLUM; x.lineWidth = 5; x.setLineDash([10, 8])
    for (const [dx, dy] of [[-140, -150], [0, -170], [140, -150]]) { x.beginPath(); x.moveTo(cx, cy - 60 * k); x.lineTo(cx + dx * p, cy - 60 * k + dy * p); x.stroke() }
    x.setLineDash([]); x.fillStyle = PLUM; x.font = `800 44px ${INTER}`; x.textAlign = 'center'
    ;[[-140, -170], [0, -190], [140, -170]].forEach(([dx, dy]) => x.fillText('?', cx + dx * p, cy - 60 * k + dy * p))
    x.restore()
  }
}
function wall(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -220, 360, 440)
  for (let r = 0; r < 10; r++) for (let c = 0; c < 5; c++) {
    const off = r % 2 ? 36 : 0
    x.fillStyle = (r + c) % 3 ? BRICK : '#9c4430'
    x.fillRect(-172 + c * 72 + off - (r % 2 ? 36 : 0), -212 + r * 43, 66, 37)
  }
  x.fillStyle = INK; x.fillRect(-180, -220, 8, 440); x.fillRect(172, -220, 8, 440)
  // a little door that swings open
  x.fillStyle = INK; x.fillRect(-62, 40, 124, 180)
  x.fillStyle = '#ffe9a8'; x.fillRect(-54, 48, 108, 172)
  x.save(); x.translate(-54, 48); x.scale(1 - 0.85 * open, 1)
  x.fillStyle = '#6a4bb0'; x.fillRect(0, 0, 108, 172); x.fillStyle = GOLD; x.fillRect(86, 86, 12, 12)
  x.restore()
  x.restore()
}
function sleepMask(x, F, k) {
  if (k <= 0.01) return
  const w = F.S * 0.72, h = F.S * 0.2, cy = F.cy - F.S * 0.02
  x.save(); x.translate(F.x, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 20); x.fill()
  x.fillStyle = '#2b2440'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 16); x.fill()
  // two intense drawn-on eyes
  for (const d of [-1, 1]) {
    x.fillStyle = '#fff'; x.beginPath(); x.ellipse(d * w * 0.2, 0, h * 0.36, h * 0.3, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.beginPath(); x.arc(d * w * 0.2, 0, h * 0.18, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#fff'; x.lineWidth = 5; x.beginPath(); x.moveTo(d * w * 0.2 - d * h * 0.4, -h * 0.5); x.lineTo(d * w * 0.2 + d * h * 0.3, -h * 0.34); x.stroke()
  }
  x.restore()
}
function heavyBag(x, cx, cy, k, drop) {
  if (k <= 0.01) return
  const y = cy + lerp(-150, 0, ease.outBounce ? ease.outBounce(drop) : ease.outCubic(drop))
  x.save(); x.translate(cx, y); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-140, -130, 280, 260, 40); x.fill()
  x.fillStyle = '#5a4a7a'; x.beginPath(); x.roundRect(-130, -120, 260, 240, 34); x.fill()
  x.fillStyle = INK; x.fillRect(-60, -170, 120, 50); x.fillStyle = '#5a4a7a'; x.fillRect(-46, -160, 92, 26)
  x.fillStyle = BONE; x.fillRect(-90, -30, 180, 70)
  x.fillStyle = INK; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2019', 0, 6)
  x.restore()
}
function thoughtCloud(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; for (const [px, py, r] of [[-90, 10, 80], [0, -30, 100], [100, 10, 80], [10, 50, 80]]) { x.beginPath(); x.arc(px, py, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#3a3360'; for (const [px, py, r] of [[-90, 10, 80], [0, -30, 100], [100, 10, 80], [10, 50, 80]]) { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.strokeStyle = LAV; x.lineWidth = 7; x.beginPath()
  for (let i = 0; i < 60; i++) { const a = i * 0.32 + t * 2, r = 4 + i * 1.5; const px = Math.cos(a) * r, py = Math.sin(a) * r * 0.7; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
  x.restore()
}
function burrito(x, F, k) {
  if (k <= 0.01) return
  const w = F.S * 0.86
  x.save(); x.translate(F.x, F.cy + F.S * 0.22); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 6, -F.S * 0.2 - 6, w + 12, F.S * 0.42 + 12, 40); x.fill()
  x.fillStyle = '#b07ad6'; x.beginPath(); x.roundRect(-w / 2, -F.S * 0.2, w, F.S * 0.42, 34); x.fill()
  x.fillStyle = '#c99ae8'; for (let i = 0; i < 4; i++) x.fillRect(-w / 2 + 20 + i * w / 4, -F.S * 0.18, 10, F.S * 0.38)
  x.fillStyle = '#d9b6f0'; x.beginPath(); x.moveTo(-w / 2, -F.S * 0.2); x.lineTo(w * 0.1, -F.S * 0.2); x.lineTo(-w / 2, F.S * 0.12); x.fill()
  x.restore()
}
function zzz(x, t, cx, cy, n = 3, size = 54) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.5 + i / n) % 1)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.strokeStyle = INK; x.lineWidth = 8
    x.font = `800 ${size * (0.6 + ph * 0.6)}px ${INTER}`; x.textAlign = 'center'
    x.strokeText('Z', cx + ph * 120 + Math.sin(ph * 6) * 14, cy - ph * 220); x.fillText('Z', cx + ph * 120 + Math.sin(ph * 6) * 14, cy - ph * 220)
    x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'No need to | *investigate today.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.8, 1.3))
      magnifier(x, lerp(720, 830, down), lerp(800, 1000, down), pop01(t, P.t0 + 0.2, 0.35, 2), lerp(-0.4, 1.4, down))
      label(x, 780, 660, 'CASE CLOSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 780, 740, '(FOR TODAY)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not every text | *needs decoding.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      textMsg(x, 780, 940, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1110, 'IT MEANS OK', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Your walls can | *have a day off.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -230 }, hops: [1.6],
    back(x, t, lt, P) { wall(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.9, 1.4))) },
    front(x, t, lt, P) { label(x, 790, 630, 'OPEN HOUSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 }) } },
  { sign: S, cap: 'Close your eyes. | *Even you.*', mood: 'sleepy', star: { x: -40, y: 10, s: 340 },
    front(x, t, lt, P, F) {
      sleepMask(x, F, pop01(t, P.t0 + 0.5, 0.3, 2.2))
      zzz(x, t, F.x + 150, F.cy - 120, 3, 50)
      label(x, 540, 1140, 'STILL INTENSE (ASLEEP)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PLUM, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Old grudges are heavy. | *Put them down.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      heavyBag(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.6, 1.1))
      label(x, 790, 700, 'LIGHTER ALREADY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You can say | *“I’m tired.”*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 420, 640, 'i’m tired.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1000, 190 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.7] })
      drawBits(x, PILLOW, PILLOW_C, 780, 820, 18 * pop01(t, P.t0 + 1.3, 0.3, 2.2), { rot: -0.1 })
    } },
  { sign: S, cap: 'Black hoodie. | Couch. *Done.*', mood: 'happy', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, HOODIE, HOODIE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { outline: '#5a4a7a' })
      label(x, 790, 1120, 'OUTFIT: RESTING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Deep thoughts | *can wait till Monday.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, -1], star: { x: -220, y: 70 }, hops: [1.6],
    front(x, t, lt, P) {
      thoughtCloud(x, t, 760, 720, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 760, 730, 'BACK MONDAY', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 40, bg: GOLD, rot: -0.08 })
    } },
  { sign: S, cap: 'Soft is | *still strong.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -10, y: 0, s: 330 }, hops: [0.6],
    front(x, t, lt, P, F) {
      burrito(x, F, pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 540, 620, 'SOFT MODE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
      hearts(x, t, 700, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'v3a054', key: 'G', accent: PLUM, solo: S, ending: 'group',
  title: 'Scorpio, you’re | *allowed to rest.*',
  cameos: CAMEOS,
  group: { cap: 'Rest now. | *Brood later.*', mood: 'sleepy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
