// v3a056: zodiac.advice444, ADVICE SOLO, "Pisces, stop doing | this in love." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a Pisces love habit, a warm nudge, one gag each.
// Pisces cries (gently) in every card.
//   0.0–3.6    "Pisces, stop doing | *this in love.*"  One big crying Pisces pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a blueprint of who they COULD be: DATE THE REAL ONE · one coffee, already a SAVE THE DATE: IT WAS ONE LATTE
//              · "it's fine!" (it is not): SAY THE REAL THING · gave the scarf away, now it's snowing: KEEP ONE FOR YOU
//              · throws a float ring to a Sagittarius who is chilling: THEY'RE OK · a mixtape for a maybe: 47 SONGS
//              · a forgiveness punch card: CARD FULL · rose-tinted glasses on red flags: THOSE ARE RED
//              · a gift box: TO: ME
//  37.8        group ending: "Love big. | *Love you too.*"  Pisces comes back, big (and teary, happily).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#9fa8ff', RED = '#e23d4e', BLUEPRINT = '#2f5fbf', WOOD = '#c98f2a'
const S = 'pisces'

// ── props
const CUP = ['..s.s..', '.s.s...', 'WWWWWW.', 'WBBBBWW', 'WWWWW.W', 'WWWWWWW', '.WWWW..']
const CUP_C = { W: '#fff4e2', B: '#7a4426', s: BONE }
const SCARF = ['RRRRRRRRRR', 'RWRWRWRWRR', 'RRRRRRRRRR', '.......RR.', '.......RR.', '.......RW.', '.......RR.', '.......W.W']
const SCARF_C = { R: RED, W: '#fff4e2' }
const FLAG = ['PRRRRR', 'PRRRRR', 'PRRRRR', 'PRRRR.', 'P.....', 'P.....', 'P.....', 'P.....', 'P.....']
const FLAG_C = { P: WOOD, R: RED }
const RING = ['..WWRR..', '.WW..RR.', 'RR....WW', 'RR....WW', 'WW....RR', 'WW....RR', '.RR..WW.', '..RRWW..']
const RING_C = { W: '#fff4e2', R: RED }

function blueprint(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340)
  x.fillStyle = BLUEPRINT; x.fillRect(-160, -160, 320, 320)
  x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 2
  for (let i = -160; i <= 160; i += 32) { x.beginPath(); x.moveTo(i, -160); x.lineTo(i, 160); x.stroke(); x.beginPath(); x.moveTo(-160, i); x.lineTo(160, i); x.stroke() }
  x.strokeStyle = '#fff'; x.lineWidth = 5; x.setLineDash([12, 8]); x.beginPath()
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 50 : 110; const px = Math.cos(a) * r, py = Math.sin(a) * r + 10; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.closePath(); x.stroke(); x.setLineDash([])
  x.fillStyle = '#fff'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('THEM (V2.0)', 0, 140)
  x.font = `700 18px ${MONO}`; x.fillText('+ texts back', 80, -120); x.fillText('+ therapy', -80, -120)
  x.restore()
}
function invite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -100, 300, 200)
  x.fillStyle = '#fffaf0'; x.fillRect(-142, -92, 284, 184)
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-128, -78, 256, 156)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAVE', 0, -36); x.fillText('THE DATE', 0, -6)
  x.font = `800 26px ${INTER}`; x.fillText('(met tuesday)', 0, 40)
  x.restore()
}
function snow(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k); x.fillStyle = '#ffffff'
  for (let i = 0; i < 26; i++) { const ph = ((t * 0.35 + i * 0.137) % 1), sx = 130 + ((i * 97) % 820), sy = 480 + ph * 740 + Math.sin(t * 2 + i) * 6; x.fillRect(sx, sy, 10, 10) }
  x.restore()
}
function tape(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -110, 360, 220)
  x.fillStyle = '#ff9ccf'; x.fillRect(-170, -100, 340, 200)
  x.fillStyle = '#fffaf0'; x.fillRect(-140, -84, 280, 70)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('for u (maybe)', 0, -48)
  x.fillStyle = INK; x.fillRect(-110, 10, 220, 70); x.fillStyle = '#3a3360'; x.fillRect(-100, 18, 200, 54)
  for (const d of [-1, 1]) { x.fillStyle = '#fff'; x.beginPath(); x.arc(d * 60, 45, 20, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(d * 60, 45, 9, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function punchCard(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -120, 360, 240)
  x.fillStyle = '#fffaf0'; x.fillRect(-170, -110, 340, 220)
  x.fillStyle = SEA; x.fillRect(-170, -110, 340, 56)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FORGIVENESS CARD', 0, -82)
  for (let i = 0; i < 10; i++) {
    const px = -128 + (i % 5) * 64, py = -10 + Math.floor(i / 5) * 70
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = i < n ? PINK : '#fffaf0'; x.beginPath(); x.arc(px, py, 18, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function roseGlasses(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + F.S * 0.04); x.scale(k, k)
  const r = F.S * 0.14, dx = F.S * 0.2
  x.fillStyle = INK; x.fillRect(-dx, -6, dx * 2, 12)
  for (const d of [-1, 1]) {
    x.fillStyle = INK; x.beginPath(); x.arc(d * dx, 0, r + 8, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,140,190,0.85)'; x.beginPath(); x.arc(d * dx, 0, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(d * dx - r * 0.5, -r * 0.5, 8, 14)
  }
  x.restore()
}
function giftBox(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -60, 260, 190)
  x.fillStyle = SEA; x.fillRect(-122, -52, 244, 174)
  x.fillStyle = GOLD; x.fillRect(-18, -52, 36, 174)
  const ly = lerp(-60, -150, open), lr = lerp(0, -0.3, open)
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-146, -40, 292, 56); x.fillStyle = '#b3baff'; x.fillRect(-138, -32, 276, 40); x.fillStyle = GOLD; x.fillRect(-18, -32, 36, 40)
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(-36, -46, 34, 18, -0.4, 0, Math.PI * 2); x.ellipse(36, -46, 34, 18, 0.4, 0, Math.PI * 2); x.fill()
  x.restore()
  x.restore()
  label(x, cx + 120 * k, cy + 60 * k, 'TO: ME', k, { size: 32, bg: BONE, rot: 0.12, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: S, cap: 'Falling for | *their potential.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', tears: 1, look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      blueprint(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'DATE THE REAL ONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One coffee. | *Wedding planned.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 700, 1040, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      invite(x, 820, 780, pop01(t, P.t0 + 0.8, 0.3, 2.2))
      label(x, 860, 1080, 'IT WAS ONE LATTE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“It’s fine!” | *It’s not fine.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', tears: lt => lt > 1.1 ? 3 : 1, look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 740, 660, 'it’s FINE!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 780, 1080, 'SAY THE REAL THING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gave away your scarf. | *In the snow.*', mood: 'wide', tears: 2, look: [1, 0], star: { x: -220 }, squash: lt => Math.sin(lt * 40) * 0.02,
    back(x, t, lt, P) { snow(x, t, clamp((lt - 0.3) * 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 990, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 21, glyph: false })
      drawBits(x, SCARF, SCARF_C, 820, 1080, 14 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 780, 680, 'KEEP ONE FOR YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rescuing people | *who are fine.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', tears: 1, look: [1, 0], star: { x: -230 }, hops: [0.6],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.5, 1.1))
      drawBits(x, RING, RING_C, lerp(420, 790, fly), lerp(860, 900, fly) - Math.sin(Math.PI * fly) * 160, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: fly * 3 })
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      if (lt > 1.2) bubble(x, 800, 680, 'i’m good!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1140, 'THEY’RE OK', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A playlist | *for a maybe.*', mood: 'heart', tears: 1, look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      tape(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, '47 SONGS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgiving | *the same thing again.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', tears: 2, look: [1, 0], star: { x: -220 }, hops: [],
    front(x, t, lt, P) {
      punchCard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(10, Math.floor(clamp((lt - 0.4) / 1.0) * 10)))
      label(x, 790, 1080, 'CARD FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Red flags? | *You see pink.*', mood: 'heart', tears: 1, star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      roseGlasses(x, F, pop01(t, P.t0 + 0.4, 0.3, 2.2))
      ;[[680, 0.3], [800, 0.45], [920, 0.6]].forEach(([fx, d], i) => drawBits(x, FLAG, FLAG_C, fx, 960 + (i % 2) * 30, 22 * pop01(t, P.t0 + d, 0.3, 2), { rot: Math.sin(t * 3 + i) * 0.06 }))
      label(x, 810, 700, 'THOSE ARE RED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgetting | *you deserve it too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: lt => lt > 1.3 ? 2 : 1, look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      giftBox(x, 780, 920, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outBack(prog(lt, 1.0, 1.4)))
      if (lt > 1.2) hearts(x, t, 780, 820, P.t0 + 1.25, { n: 7, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3a056', key: 'D', accent: SEA, solo: S, ending: 'group',
  title: 'Pisces, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Love big. | *Love you too.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
