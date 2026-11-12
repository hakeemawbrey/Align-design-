// r2a0015: ADVICE ROLL CALL, "How each sign | handles feedback." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "How each sign | *handles feedback.*"
//   3.6–49.2   ♈ takes it fast, fixes it faster · ♉ needs a day, then it lands · ♊ ten questions, ten lessons · ♋ feels it,
//              then grows (a sprout) · ♌ needs the good part too (a gold star) · ♍ notes on the notes (be proud too)
//              · ♎ "totally fair!" (a balancing scale) · ♏ remembers every word, uses it well · ♐ laughs, then really
//              listens · ♑ books a follow-up · ♒ turns it into an experiment · ♓ cries, then "thank you, really"
//  49.2        "Different styles. | *Same growth.*"
//  52.6        CALLBACK: "The experiment? | *It worked.*"  Aquarius with the beaker, sparkling.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', LIME = '#b6f06a'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const WRENCH = ['.SS....', 'S.S....', 'SSS....', '..SS...', '...SS..', '....SS.', '.....SS']
const GLASS = ['WWWWWWW', '.SSSSS.', '..SSS..', '...S...', '..S.S..', '.S...S.', 'WWWWWWW']
const SPROUT = ['.LL...LL.', 'LLLL.LLLL', '.LLLSLLL.', '....S....', '....S....', 'PPPPPPPPP', '.PPPPPPP.', '..PPPPP..']
const BEAKER = ['..WWW..', '..W.W..', '..W.W..', '.W...W.', 'W.GGG.W', 'WGGGGGW', 'WGGGGGW', '.WWWWW.']
function scale(x, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -140, 28, 260); x.fillStyle = GOLD; x.fillRect(-8, -134, 16, 248)
  x.fillStyle = INK; x.fillRect(-90, 110, 180, 30); x.fillStyle = GOLD; x.fillRect(-84, 114, 168, 20)
  x.save(); x.translate(0, -130); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 150 - 4, 0, 8, 70); x.beginPath(); x.ellipse(s * 150, 80, 66, 20, -tilt, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.ellipse(s * 150, 78, 58, 14, -tilt, 0, Math.PI * 2); x.fill() }
  x.restore(); x.restore()
}
function bigStar(x, cx, cy, s, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(Math.sin(t * 2) * 0.1); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.48 : s * 1.12, a = i / 10 * Math.PI * 2 - Math.PI / 2; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
  x.fillStyle = GOLD; x.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.4 : s, a = i / 10 * Math.PI * 2 - Math.PI / 2; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath(); x.fill()
  x.restore()
}
function bubbles(x, t, cx, cy, k) {   // fizz rising out of a beaker
  for (let i = 0; i < 6; i++) { const ph = (t * 0.9 + i / 6) % 1; x.save(); x.globalAlpha = k * (1 - ph); x.fillStyle = LIME; x.beginPath(); x.arc(cx + Math.sin(i * 2 + t * 3) * 30, cy - ph * 200, 8 + (i % 3) * 4, 0, Math.PI * 2); x.fill(); x.restore() }
}

const st = { x: -210 }
const CAMEOS = [
  { sign: 'aries', cap: 'Takes it fast. | *Fixes it faster.*', mood: 'sparkle', look: [1, 0], star: st, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      drawBits(x, WRENCH, { S: '#c8cfe0' }, 790, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 16) * 0.3 })
      label(x, 790, 1100, 'FIXED IN 0:03', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: RED, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Needs a day. | Then it *really lands.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { W: '#c98f5a', S: GOLD }, 790, 860, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.2 ? Math.PI * ease.inOutCubic(prog(lt, 1.2, 1.6)) : 0 })
      label(x, 790, 1110, 'PROCESSED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ten questions. | *Ten new lessons.*', mood: 'sparkle', look: [1, 0], star: st,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) label(x, 690 + (i % 3) * 100, 760 + Math.floor(i / 3) * 160, '?', pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2.4), { size: 60, bg: [GOLD, PINK, SKYB][i % 3], rot: (i % 2 ? 0.1 : -0.1) })
      label(x, 790, 1110, 'CURIOUS = GROWING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Feels it first. | *Then grows.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: st,
    front(x, t, lt, P) {
      const g = ease.outBack ? ease.outCubic(prog(lt, 0.6, 1.4)) : prog(lt, 0.6, 1.4)
      drawBits(x, SPROUT, { L: '#5fd068', S: '#3f9e4a', P: '#c96a3a' }, 790, 1000 - 60 * g, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: lerp(0.5, 1.4, g) })
      sparkles(x, t, 790, 840, P.t0 + 1.4 * 1.29, 6, 120, 0.4)
    } },
  { sign: 'leo', cap: 'Needs the good part too. | *That’s fair.*', mood: 'sparkle', look: [1, 0], star: st, hops: [1.2],
    front(x, t, lt, P) {
      bigStar(x, 790, 820, 90, pop01(t, P.t0 + 0.3, 0.35, 2.2), t)
      label(x, 790, 1060, 'GOOD JOB, TRULY', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Notes on the notes. | Be *proud* too.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, BONE, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) { x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(690, 740 + i * 40, 150 - (i % 3) * 30, 10); x.fillStyle = RED; for (let i = 0; i < 6; i++) x.fillRect(860, 738 + i * 40, 30, 12) }
      label(x, 790, 1080, '+ 1 GOLD STAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“Totally fair!” | And *they mean it.*', mood: 'happy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      scale(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 0.25 * Math.sin(t * 2.5) * (1 - ease.inOutCubic(prog(lt, 1.0, 1.8))))
      label(x, 790, 640, 'BALANCED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Remembers every word. | *Uses it well.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 790, 860, 240, 300, '#9b5bd6', pop01(t, P.t0 + 0.2, 0.3, 2), -0.04)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) { x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOTED', 790, 790); x.fillText('& USED', 790, 840); x.fillText('WISELY', 790, 890) }
      sparkles(x, t, 790, 860, P.t0 + 1.4, 6, 150, 0.3)
    } },
  { sign: 'sagittarius', cap: 'Laughs first. | Then *really listens.*', mood: lt => lt > 1.1 ? 'neutral' : 'happy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'HA!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 70, col: GOLD, tail: 'bl' })
      label(x, 790, 960, 'OK. TELL ME MORE.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Books a follow-up. | Growth is *a plan.*', mood: 'happy', look: [1, 0], star: st,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 240, BONE, pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.8) { x.fillStyle = MINT; x.fillRect(640, 740, 300, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 790, 768); x.fillText('FOLLOW-UP', 790, 840); x.fillText('FRI 10:00', 790, 900) }
      label(x, 790, 1080, '✓ ACCEPTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Turns it into | *an experiment.*', mood: 'sparkle', look: [1, 0], star: st,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BEAKER, { W: '#c8e8ff', G: LIME }, 790, 900, 30 * k)
      if (k > 0.5) bubbles(x, t, 790, 800, k)
      label(x, 790, 1130, 'TRIAL #1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cries a little. | Then *“thank you, really.”*', mood: 'heart', tears: 2, look: [1, 0], star: st,
    front(x, t, lt, P) {
      bubble(x, 790, 800, 'thank you, | really.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, col: LAV, tail: 'bl' })
      hearts(x, t, 620, 1130, P.t0 + 1.2, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0015', key: 'G', accent: LIME, ending: 'callback',
  title: 'How each sign | *handles feedback.*',
  cameos: CAMEOS,
  group: { cap: 'Different styles. | *Same growth.*' },
  last: {
    text: 'The experiment? | *It worked.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aquarius', 400, 1080, 250 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2, t - lt + 1.8] })
      const b = pop01(t, t - lt + 0.7, 0.35, 2)
      drawBits(x, BEAKER, { W: '#c8e8ff', G: LIME }, 700, 1080, 26 * b)
      if (b > 0.5) bubbles(x, t, 700, 990, b)
      sparkles(x, t, 700, 1000, t - lt + 1.3, 8, 170, 0.4)
      label(x, 560, 1330, 'RESULT: GROWTH', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: LIME, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
