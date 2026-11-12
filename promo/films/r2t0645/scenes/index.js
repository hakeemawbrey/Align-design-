// r2t0645: star_talk, BELIKE, "After a long nap? | Zodiacs be like." (topic: Zodiacs after a long nap be like)
// (~53 s vertical, signs3kit social cut, music: lofi · F). Twelve signs in zodiac order, each one's most extreme way of waking
// up from a long nap. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ four-minute nap, fully charged · ♉ woke up, went straight back to sleep (ROUND 2) · ♊ "what year is it?"
//              · ♋ had a sad dream, needs a hug now · ♌ pillow face, still took a selfie · ♍ made the bed, twice
//              · ♎ fixed their hair, eyes still shut · ♏ "who moved my blanket?" · ♐ woke up planning a trip
//              · ♑ the nap was in the calendar · ♒ woke up with a theory · ♓ woke up crying, the dream was nice
//  49.2        "Twelve naps. | *Twelve moods.*"  The group photo.
//  52.6        callback: "And Taurus? | *Still asleep.*"  Taurus comes back, snoring: ROUND 3.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const NAP = '#9b8cff', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068', BROWN = '#8a4a2e'

// ── props
const PILLOW = [
  '.PPPPPPPPPPPP.',
  'PPPPPPPPPPPPPP',
  'PPWPPPPPPPPWPP',
  'PPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPP',
  '.PPPPPPPPPPPP.',
]
const SUITCASE = [
  '....KKKK....',
  '...K....K...',
  'OOOOOOOOOOOO',
  'OYOOOOOOOOYO',
  'OOOOOOOOOOOO',
  'OOOOSSSSOOOO',
  'OOOOOOOOOOOO',
  'OYOOOOOOOOYO',
  'OOOOOOOOOOOO',
  '.K........K.',
]
const SUITCASE_C = { K: INK, O: '#ff9a4a', Y: '#c95f2a', S: GOLD }
const COMB = ['KKKKKKKKKKKK', 'K.K.K.K.K.K.', 'K.K.K.K.K.K.']

// little floating Zs
function zzz(x, t, cx, cy, n = 3, col = LAV) {
  x.save(); x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) { const ph = ((t * 0.6 + i / n) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.font = `800 ${34 + i * 12}px ${INTER}`; x.fillText('z', cx + i * 34 + Math.sin(ph * 6) * 8, cy - ph * 120 - i * 20) }
  x.restore()
}
// a battery that fills up
function battery(x, cx, cy, k, fill) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -26, 24, 52)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -54, 240, 108)
  x.fillStyle = fill > 0.95 ? GREEN : GOLD; x.fillRect(-112, -46, 224 * fill, 92)
  x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${Math.round(fill * 100)}%`, 0, 4)
  x.restore()
}
// a phone held up as a camera, with a photo frame and crease lines
function selfie(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#ffb34a'; x.fillRect(-112, -170, 224, 300)
  // a tiny star portrait with pillow creases
  x.fillStyle = '#ff9a4a'; x.beginPath(); for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 36 : 84; x.lineTo(Math.cos(a) * r, -20 + Math.sin(a) * r) } x.fill()
  x.strokeStyle = '#c95f2a'; x.lineWidth = 4; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(-40, -40 + i * 18); x.lineTo(40, -30 + i * 18); x.stroke() }
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 166, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a made bed (seen from the side)
function bed(x, cx, cy, k, neat) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -40, 400, 140); x.fillRect(-210, -150, 30, 260); x.fillRect(180, -80, 30, 190)
  x.fillStyle = BROWN; x.fillRect(-204, -144, 18, 248); x.fillRect(186, -74, 18, 178)
  x.fillStyle = CREAM; x.fillRect(-180, -60, 110, 50)
  x.fillStyle = SKYB; x.fillRect(-180, -20, 360, 60)
  if (neat < 1) { x.fillStyle = '#6fb8e0'; for (let i = 0; i < 4; i++) x.fillRect(-150 + i * 90, -26 + Math.sin(i * 2) * 10 * (1 - neat), 40, 10) }
  x.fillStyle = BROWN; x.fillRect(-190, 40, 380, 40)
  x.restore()
}
// a hand mirror
function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.2); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, 80, 32, 140); x.fillStyle = PINK; x.fillRect(-10, 86, 20, 130)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 100, 120, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, 0, 92, 112, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfe9ff'; x.beginPath(); x.ellipse(0, 0, 76, 96, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-46, -60, 18, 60)
  x.restore()
}
// a calendar entry for the nap
function planner(x, cx, cy, k, tick) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = '#ffffff'; x.fillRect(-152, -142, 304, 284)
  x.fillStyle = '#2f9e6a'; x.fillRect(-152, -142, 304, 56); x.fillStyle = '#ffffff'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TUESDAY', 0, -114)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  ;[['1:00', 'meeting'], ['2:00', 'NAP'], ['2:20', 'meeting']].forEach(([h, w], i) => { const y = -50 + i * 66; if (w === 'NAP') { x.fillStyle = LAV; x.fillRect(-140, y - 26, 280, 52); x.fillStyle = INK } x.fillText(h, -126, y); x.fillText(w, -30, y) })
  if (tick > 0.01) { x.strokeStyle = GREEN; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(90, 16); x.lineTo(110, 34); x.lineTo(110 + 30 * tick, 34 - 40 * tick); x.stroke() }
  x.restore()
}
// a scribbled theory on a little chalkboard
function theory(x, cx, cy, k, d) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = BROWN; x.fillRect(-170, -130, 340, 260); x.fillStyle = '#1f4a3a'; x.fillRect(-158, -118, 316, 236)
  x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.fillStyle = '#ffffff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const nodes = [[-90, -60, 'NAP'], [80, -60, 'DREAM'], [0, 60, 'COSMOS?']]
  nodes.forEach(([px, py, w], i) => { if (d > i / 3) { x.strokeRect(px - 62, py - 24, 124, 48); x.fillText(w, px, py + 2) } })
  if (d > 0.5) { x.beginPath(); x.moveTo(-28, -60); x.lineTo(18, -60); x.moveTo(60, -36); x.lineTo(20, 36); x.moveTo(-60, -36); x.lineTo(-20, 36); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Four-minute nap. | *Fully charged.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -180 }, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      battery(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.0)))
      label(x, 790, 1080, 'READY FOR ANYTHING', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 30, bg: RED, color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Woke up. | *Went right back.*', mood: lt => lt > 0.6 && lt < 1.0 ? 'neutral' : 'sleepy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, PILLOW, { P: LAV, W: '#ffffff' }, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) zzz(x, t, F.x + 60, F.cy - 120)
      label(x, 790, 700, 'NAP: ROUND 2', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Woke up asking | *“what year is it?”*', mood: 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'WAIT. | WHAT YEAR | IS IT?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 52, tail: 'bl' })
      label(x, 790, 1080, 'NAP: 40 MINUTES', pop01(t, P.t0 + 1.4, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Had a sad dream. | *Needs a hug now.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: lt => lt < 1.3 ? 1 : 0, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hug? | please?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, col: LAV, tail: 'bl' })
      label(x, 790, 1060, 'HUG: URGENT', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 980, P.t0 + 1.4, { n: 5, life: 1.8, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Pillow face? | *Still took a selfie.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      selfie(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'PROFILE PIC: NEW', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made the bed. | *Then remade it.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bed(x, 780, 960, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.6, 1.0)))
      label(x, 790, 700, 'CORNERS: 90°', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Fixed their hair. | *Eyes still shut.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      mirror(x, 820, 840, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, COMB, { K: GOLD }, 690, 640 + Math.sin(t * 9) * 14, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.3 })
      label(x, 790, 1110, 'LOOK: EFFORTLESS', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Woke up. | *“Who moved my blanket?”*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'it was folded | LEFT.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1060, 'INVESTIGATION: OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 28, bg: '#e23d66', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Woke up. | *Booked a trip.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 790, 900, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 790, 650, 'LEAVING: TONIGHT', pop01(t, P.t0 + 1.0, 0.3, 2.6), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'The nap? | *Was in the calendar.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      planner(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 1.1, 1.4)))
    } },
  { sign: 'aquarius', cap: 'Woke up | *with a theory.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      theory(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.4)))
    } },
  { sign: 'pisces', cap: 'Woke up crying. | *The dream was nice.*', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'there were | puppies…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0645', key: 'F', accent: NAP, ending: 'callback',
  title: 'After a long nap? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve naps. | *Twelve moods.*' },
  last: {
    text: 'And Taurus? | *Still asleep.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.5, 0.45, 1.8)
      drawBits(x, PILLOW, { P: LAV, W: '#ffffff' }, 540, 1160, 26 * k)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1010, 300 * k, { mood: 'sleepy', seed: 9 })
      if (lt > 1.0) zzz(x, t, 640, 860)
      label(x, 540, 1340, 'NAP: ROUND 3', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
