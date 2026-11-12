// r2t0662: star_talk, SOLO (gemini), "Your Gemini mom | *be like.*" (signs3kit social cut, music: lofi · E).
// Nine cards, the most extreme (and lovable) Gemini-mom version of everyday life. Ending: callback.
//   called to ask one thing (two hours later) · three new hobbies this week · knows everyone at the store by name
//   · five bubbles per sentence · plan A became plan F mid-sentence · read your birth chart, has notes · met your
//   match, now they text her · one story, six side-stories · lost her phone while on it
//   group "Never boring. | *Never done talking.*"   last "“One quick thing.” | *Hour three.*" (the phone call, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'gemini', ST = { x: -170 }
const ACC = '#ffd23a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ff9a4a'
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
// a phone with a header and chat bubbles: lines = [[text, colour, k, mine?]]
function phone(x, cx, cy, k, head, headCol, lines, { size = 26, w = 330, h = 470, rot = 0.04 } = {}) {
  box(x, cx, cy, w, h, k, rot, () => {
    x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
    x.fillStyle = headCol; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 48)
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 39)
    x.font = `800 ${size}px ${INTER}`
    lines.forEach(([txt, col, kk, mine], i) => {
      if (kk <= 0.01) return
      const tw = x.measureText(txt).width + 26, by = -h / 2 + 100 + i * (size + 30), bx = mine ? w / 2 - 26 - tw / 2 : -w / 2 + 26 + tw / 2
      x.save(); x.translate(bx, by); x.scale(kk, kk)
      x.fillStyle = col; x.fillRect(-tw / 2, -size * 0.8, tw, size * 1.6)
      x.fillStyle = INK; x.fillText(txt, 0, 2); x.restore()
    })
  })
}
const fmt = s => `${Math.floor(s / 3600)}:${String(Math.floor(s / 60) % 60).padStart(2, '0')}:${String(Math.floor(s) % 60).padStart(2, '0')}`
const HANDSET = ['.KKKKKK.', 'KGGGGGGK', 'KGSSSSGK', 'KGSSSSGK', 'KGSSSSGK', 'KGSSSSGK', 'KGSSSSGK', 'KGGGGGGK', 'KGGWWGGK', '.KKKKKK.']
const POT = ['..CCCC..', '.C....C.', 'CCCCCCCC', 'CccccccC', 'CccccccC', '.CccccC.', '..CCCC..']

const CAMEOS = [
  { sign: SG, cap: 'Called to ask one thing. | *Two hours later.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HANDSET, { K: INK, G: '#2a2350', S: SKYB, W: BONE }, F.x + 120, F.cy - 10, 9 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.3 })
      L(x, 800, 860, 'CALL ' + fmt(Math.min(7260, 30 + Math.pow(clamp(lt / 2.2), 2.2) * 7230)), pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, -0.03, 40)
      bubble(x, 800, 680, 'oh! and also…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: SG, cap: 'Three new hobbies. | *This week.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      L(x, 790, 680, 'POTTERY', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.05, 36)
      L(x, 790, 820, 'SALSA', pop01(t, P.t0 + 0.7, 0.3, 2), PINK, -0.04, 36)
      L(x, 790, 960, 'FRENCH (DAY 1)', pop01(t, P.t0 + 1.2, 0.3, 2), SKYB, 0.04, 34)
      drawBits(x, POT, { C: '#c9653a', c: '#e0905a' }, 560, 1080, 12 * pop01(t, P.t0 + 1.6, 0.3, 2.2), { rot: -0.25 })
      L(x, 830, 1100, 'IT’S WONKY', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.05, 28)
    } },
  { sign: SG, cap: 'Knows everyone at the store. | *By name.*', mood: 'happy', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const names = ['hi Linda!', 'hey Raj!', 'Tommy! how’s the knee?', 'hi baby Mo!']
      names.forEach((n, i) => bubble(x, 760 + (i % 2 ? 30 : -20), 640 + i * 140, n, pop01(t, P.t0 + 0.2 + i * 0.45, 0.25, 2.2), { size: 32, col: [BONE, MINT, PINK, SKYB][i], tail: 'bl' }))
    } },
  { sign: SG, cap: 'Five bubbles. | *Per sentence.*', mood: 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ws = ['ok', 'so', 'your aunt', 'called', 'call me']
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 'MOM ♊︎', ACC, ws.map((w, i) => [w, i % 2 ? CREAM : '#ffe7a8', pop01(t, P.t0 + 0.35 + i * 0.25, 0.2, 2.2), false]), { size: 30 })
    } },
  { sign: SG, cap: 'Plan A became plan F. | *Mid-sentence.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(clamp((lt - 0.2) / 1.6) * 6))
      L(x, 790, 860, `PLAN ${'ABCDEF'[n]}`, pop01(t, P.t0 + 0.15, 0.3, 2), GOLD, 0.04, 64)
      bubble(x, 800, 660, 'actually, what if…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1090, 'WE’RE AT THE BEACH NOW', pop01(t, P.t0 + 1.9, 0.3, 2.4), SKYB, -0.04, 26)
    } },
  { sign: SG, cap: 'Read your birth chart. | *Has notes.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k); x.rotate(t * 0.15)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
        x.strokeStyle = '#6b62a8'; x.lineWidth = 4
        x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 110, Math.sin(a) * 110); x.lineTo(Math.cos(a) * 160, Math.sin(a) * 160); x.stroke() }
        x.restore()
      }
      for (let i = 0; i < 3; i++) box(x, 690 + i * 100, 760 + (i % 2) * 180, 110, 90, pop01(t, P.t0 + 0.8 + i * 0.3, 0.25, 2.2), (i - 1) * 0.12, () => { x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.fillText(['hmm', 'SEE ME', '!!'][i], 0, 2) }, [GOLD, PINK, MINT][i])
      L(x, 790, 1110, 'GRADE: B+', pop01(t, P.t0 + 1.9, 0.3, 2.4), BONE, -0.04, 32)
    } },
  { sign: SG, cap: 'Met your match once. | Now *they text her.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 770, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 'YOUR MATCH ♎︎', PINK, [
        ['hi mom!!', PINK, pop01(t, P.t0 + 0.5, 0.2, 2.2), false],
        ['recipe worked!', PINK, pop01(t, P.t0 + 0.9, 0.2, 2.2), false],
        ['brunch sat? ♡', MINT, pop01(t, P.t0 + 1.4, 0.2, 2.2), true],
      ], { size: 30 })
      L(x, 790, 1120, 'YOU: NOT INVITED', pop01(t, P.t0 + 1.9, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: SG, cap: 'Told one story. | *Six side-stories.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 6))
      L(x, 790, 660, `STORY 1 · TANGENT ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), LAV, 0.04, 30)
      bubble(x, 800, 860, ['so the dentist…', 'wait, his cousin…', 'who was a pilot…', 'in Lisbon!', 'anyway the dentist', 'the cat!'][n - 1], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1100, 'POINT: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Lost her phone. | *While on it.*', mood: lt => lt > 1.5 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, HANDSET, { K: INK, G: '#2a2350', S: SKYB, W: BONE }, F.x + 120, F.cy - 10, 9 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.3 })
      bubble(x, 800, 700, 'has anyone seen | my phone?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1090, 'IT’S IN YOUR HAND', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0662', key: 'E', accent: ACC, solo: SG, ending: 'callback',
  title: 'Your Gemini mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never boring. | *Never done talking.*', mood: 'sparkle' },
  last: {
    text: '“One quick thing.” | *Hour three.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, SG, 500, 1000, 400 * k, { mood: Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', seed: 5, look: [1, 0] })
      drawBits(x, HANDSET, { K: INK, G: '#2a2350', S: SKYB, W: BONE }, 680, 970, 14 * k, { rot: 0.3 })
      label(x, 540, 1300, 'CALL ' + fmt(10800 + lt * 40), pop01(t, t - lt + 0.9, 0.35, 2.4), { size: 52, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
