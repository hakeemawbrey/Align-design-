// r2t0665: star_talk, SOLO (sagittarius), "Sagittarius red | flags *we love.*" (signs3kit social cut, music: lofi · F).
// Nine cards, the most extreme (and lovable) Sagittarius red flags. Ending: card (lesson + last line over the match card).
//   "let's go!" (doesn't say where) · brutally honest about your haircut · laughs at their own joke first · texts back
//   in 3–5 business days · "5 min away" (still in the shower) · adopted a stray mid-date · committed to the bit (a fake
//   moustache, day 40) · checked our compatibility: chaotic, stayed anyway · can't sit still, movie paused again
//   lesson "Love a Sagittarius | *for the adventure.*"  last "Red flags? | *Party flags.*" over the match card:
//   Sagittarius + Aquarius, CHAOTIC MATCH (the compatibility check, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'sagittarius', ST = { x: -170 }
const ACC = '#c9a6ff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const FLAG = ['P........', 'PRRRRRRR.', 'PRRRRRRRR', 'PRRRRRRR.', 'PRRRRRR..', 'P........', 'P........', 'P........', 'P........']
const DOG = ['.BB....BB.', '.BBB..BBB.', '..BBBBBB..', '..BKBBKB..', '..BBBBBB..', '...BNNB...', '..BBBBBB..', '.BBBBBBBBB', '.BBBBBBBB.', '.B.B..B.B.']
const STACHE = ['.KK....KK.', 'KKKK..KKKK', 'KKKKKKKKKK', '.KKKKKKKK.']
function redFlag(x, cx, cy, k, t) { drawBits(x, FLAG, { P: BONE, R: RED }, cx + Math.sin(t * 4) * 4, cy, 14 * k, { rot: Math.sin(t * 4) * 0.05 }) }

const CAMEOS = [
  { sign: SG, cap: '“Let’s go!” | *Doesn’t say where.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.1, 1.7],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'pack light!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 900, 'DESTINATION: ???', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, 0.04, 32)
      redFlag(x, 880, 1060, pop01(t, P.t0 + 1.4, 0.3, 2.4), t)
    } },
  { sign: SG, cap: 'Brutally honest. | *About your haircut.*', mood: lt => lt > 1.0 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 940, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.1 ? 'wide' : 'happy' })
      x.fillStyle = BROWN; const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k > 0.5) { for (let i = 0; i < 5; i++) x.fillRect(780 + i * 18, 830 - (i % 2) * 22, 14, 34) }
      bubble(x, 790, 680, 'it’s… a choice!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      redFlag(x, 600, 1080, pop01(t, P.t0 + 1.6, 0.3, 2.4), t)
    } },
  { sign: SG, cap: 'Laughs at their own joke. | *First.*', mood: lt => Math.floor(lt * 4) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so a horse walks in—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 880, 'HAHAHA', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 52, col: GOLD, tail: 'bl' })
      L(x, 800, 1090, 'PUNCHLINE: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: SG, cap: 'Texts back in | *3–5 business days.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 780, 860, 320, 420, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-146, -196, 292, 392)
        x.font = `800 28px ${INTER}`
        x.fillStyle = PINK; x.fillRect(-130, -160, 200, 52); x.fillStyle = INK; x.fillText('dinner fri?', -30, -134)
        x.fillStyle = '#8a8aa0'; x.font = `700 20px ${MONO}`; x.fillText(lt > 0.8 ? '· · · 4 DAYS LATER · · ·' : '', 0, -40)
        if (lt > 1.3) { x.fillStyle = ACC; x.fillRect(-60, 10, 190, 52); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('YES!! 🙂'.replace(' 🙂', ''), 35, 36) }
      })
      L(x, 790, 1110, 'SEEN: TUESDAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: '“Five minutes away!” | *Still in the shower.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'omw!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: MINT, tail: 'bl' })
      for (let i = 0; i < 8; i++) { const ph = (t * 1.6 + i / 8) % 1; x.fillStyle = SKYB; x.fillRect(700 + (i * 41) % 200, 820 + ph * 200, 8, 22) }
      L(x, 800, 1090, 'LOCATION: SHOWER', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: SG, cap: 'Adopted a stray. | *Mid-date.*', mood: lt => lt > 0.9 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, DOG, { B: '#d9a05a', K: INK, N: '#5a3a1a' }, 800, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 690, 'HIS NAME IS NOODLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, 0.05, 28)
      hearts(x, t, 560, 800, P.t0 + 1.0, { n: 4, life: 1.2, spread: 100, cell: 6, seed: 2 })
      L(x, 800, 1110, 'DATE: ALSO HAPPY', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: SG, cap: 'Commitment issues? | *Committed to the bit.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, STACHE, { K: '#3a2418' }, F.x, F.cy + 34, 13 * pop01(t, P.t0 + 0.3, 0.3, 2.4))
      bubble(x, 800, 700, 'I’m Gerald now.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 810, 1090, 'THE BIT: DAY 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), ORANGE, -0.04, 32)
    } },
  { sign: SG, cap: 'Checked our compatibility. | *Stayed anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.15, 0.3, 2), LAV, -0.04, 30)
      box(x, 790, 860, 280, 300, pop01(t, P.t0 + 0.35, 0.35, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-126, -136, 252, 200)
        x.fillStyle = SKYB; x.font = `700 28px ${MONO}`; x.fillText('♒︎ AQUARIUS', 0, 110)
      })
      friend(x, t, 'aquarius', 790, 830, 150, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'wink', look: [0, 0] })
      L(x, 790, 1100, 'RESULT: CHAOTIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 32)
    } },
  { sign: SG, cap: 'Can’t sit still. | *Even for a movie.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -10 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      box(x, 800, 820, 300, 200, pop01(t, P.t0 + 0.15, 0.3, 2), 0, () => {
        x.fillStyle = '#4a3a8a'; x.fillRect(-136, -86, 272, 172)
        x.fillStyle = BONE; x.fillRect(-30, -36, 20, 72); x.fillRect(10, -36, 20, 72)
      })
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 8)
      L(x, 800, 1080, `PAUSED ×${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2t0665', key: 'F', accent: ACC, solo: SG, ending: 'card',
  title: 'Sagittarius red | flags *we love.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'aquarius', chip: 'CHAOTIC MATCH' },
  group: { cap: 'Every flag? | *A party flag.*', mood: 'sparkle' },
  lesson: { text: 'Love a Sagittarius | *for the adventure.*', chip: 'STATUS: SMITTEN' },
  last: {
    text: 'Red flags? | *Never boring.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.4, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
      for (let i = 0; i <= 24; i++) { const fx = 120 + i * 35, fy = 700 + 40 * Math.sin(Math.PI * i / 24); i ? x.lineTo(fx, fy) : x.moveTo(fx, fy) } x.stroke()
      for (let i = 0; i < 12; i++) { const fx = 150 + i * 70, fy = 700 + 40 * Math.sin(Math.PI * (fx - 120) / 840); x.fillStyle = i % 2 ? RED : '#ff6b7a'; x.beginPath(); x.moveTo(fx - 22, fy); x.lineTo(fx + 22, fy); x.lineTo(fx, fy + 44); x.fill() }
      x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
