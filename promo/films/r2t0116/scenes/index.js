// r2t0116: BELIKE, "One more thing… | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    the hook; the twelve line up, then dive into the pips.
//   3.6–49.2   ♈ already in the car, yelling "text me!" · ♉ sat back down, opened snacks · ♊ one more thing, then eleven
//              · ♋ one more hug, then six more · ♌ one more thing: a speech, about Leo · ♍ brought a list of one-more-things
//              · ♎ said bye for an hour · ♏ paused nine minutes, then "I know." · ♐ one more thing: moving abroad
//              · ♑ "let's book a meeting" · ♒ one more thing: a whole new theory · ♓ "I love you guys" (sobbing)
//  49.2        "Nobody | *left on time.*"
//  52.6        CALLBACK: "Gemini’s still | on *thing forty.*"  Gemini comes back, the counter still climbing.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'

const CAR = [
  '...RRRRRR.....',
  '..RSSRSSSR....',
  '.RRSSRSSSRRRR.',
  'RRRRRRRRRRRRRR',
  'RRRRRRRRRRRRRY',
  '.KKK.....KKK..',
  '.KWK.....KWK..',
]
const CAR_C = { R: RED, S: SKYB, Y: GOLD, K: INK, W: '#9aa5c4' }
const BOWL = ['Y.Y.YY.Y.Y', 'YYYYYYYYYY', 'BBBBBBBBBB', '.BBBBBBBB.', '..BBBBBB..']
const BOWL_C = { Y: '#ffe08a', B: '#6fc3ff' }
const SUITCASE = ['...KKKK...', '...K..K...', 'OOOOOOOOOO', 'OYOOOOOOYO', 'OOOOOOOOOO', 'OOOGGGGOOO', 'OOOOOOOOOO', 'OYOOOOOOYO', 'OOOOOOOOOO', '.K......K.']
const SUITCASE_C = { K: INK, O: ORANGE, Y: GOLD, G: MINT }

// a long scroll unrolling downwards (Leo's speech)
function scroll(x, cx, top, k, len, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  const W = 230, H = Math.max(40, len)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -6, W + 12, H + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-W / 2, 0, W, H)
  x.fillStyle = BROWN; x.fillRect(-W / 2 - 16, -14, W + 32, 22); x.fillRect(-W / 2 - 16, H - 6, W + 32, 22)
  x.save(); x.beginPath(); x.rect(-W / 2, 0, W, H); x.clip()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, 40 + i * 44))
  x.restore(); x.restore()
}
// a clipboard list (Virgo)
function clipboard(x, cx, cy, k, n, title) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -186, 272, 372)
  x.fillStyle = BROWN; x.fillRect(-128, -178, 256, 356)
  x.fillStyle = '#fff4e2'; x.fillRect(-110, -150, 220, 314)
  x.fillStyle = '#9aa5c4'; x.fillRect(-50, -196, 100, 34)
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText(title, -94, -122)
  for (let i = 0; i < 8; i++) {
    const y = -78 + i * 32
    x.fillStyle = i < n ? '#2fc79a' : '#c9c0b0'; x.fillRect(-94, y - 9, 18, 18)
    x.fillStyle = '#c9c0b0'; x.fillRect(-66, y - 4, 140 - (i % 3) * 22, 8)
  }
  x.restore()
}
// a chalkboard full of arrows (Aquarius' theory)
function chalkboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-186, -136, 372, 272)
  x.fillStyle = BROWN; x.fillRect(-178, -128, 356, 256)
  x.fillStyle = '#1f4a3a'; x.fillRect(-162, -112, 324, 224)
  x.strokeStyle = BONE; x.lineWidth = 5; x.lineCap = 'round'
  const p = clamp((lt - 0.3) / 1.4)
  const segs = [[-130, -70, -40, -20], [-40, -20, 40, -80], [40, -80, 120, -10], [-120, 60, -10, 20], [-10, 20, 110, 70], [-40, -20, -10, 20]]
  segs.forEach(([a, b, c, d], i) => {
    const q = clamp(p * segs.length - i); if (q <= 0) return
    x.beginPath(); x.moveTo(a, b); x.lineTo(lerp(a, c, q), lerp(b, d, q)); x.stroke()
  })
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  if (p > 0.2) x.fillText('?!', -130, -86)
  if (p > 0.6) x.fillText('= ✦', 120, 40)
  x.restore()
}
// a little analogue clock with racing hands (Libra's hour of goodbyes)
function clock(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'round'
  const a = t * 6, b = t * 0.5
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * r * 0.75, -Math.cos(a) * r * 0.75); x.stroke()
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(b) * r * 0.5, -Math.cos(b) * r * 0.5); x.stroke()
  x.restore()
}
const geminiThing = n => `THING ${n}`

const CAMEOS = [
  { sign: 'aries', cap: 'Already left. | Yelled *"text me!"*', mood: 'sparkle', star: { x: -170 }, hops: [0.4],
    back(x, t, lt, P) {
      const d = ease.inCubic(prog(lt, 0.9, 2.2))
      drawBits(x, CAR, CAR_C, lerp(780, 1060, d), 1040, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - prog(lt, 1.9, 2.3) })
      if (d > 0.05) { x.save(); x.fillStyle = BONE; x.globalAlpha = 0.6 * (1 - d); for (let i = 0; i < 3; i++) x.fillRect(lerp(780, 1060, d) - 190 - i * 40, 1000 + i * 30, 70, 8); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'TEXT ME IT!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Sat back down. | *Opened snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 980, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 760, 'SETTLING IN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'One more thing. | Then *eleven more.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 11)
      bubble(x, 780, 700, 'oh, and also—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 900, geminiThing(n), pop01(t, P.t0 + 0.5, 0.3, 2), { size: 56, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'One more hug. | Then *six more.*', mood: 'heart', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 770, 960, 200 * k, { mood: lt > 1.4 ? 'squint' : 'happy', look: [-1, 0], seed: 12, glyph: false })
      const n = 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 6)
      label(x, 780, 700, `HUG ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 48, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 0.8, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'One more thing: | *a speech.* About Leo.', mood: 'sparkle', star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      const len = lerp(60, 520, ease.outCubic(prog(lt, 0.4, 2.0)))
      scroll(x, 790, 610, pop01(t, P.t0 + 0.25, 0.3, 2), len, ['THANK YOU,', '1. ME', '2. ALSO ME', '3. MY HAIR', '4. ME AGAIN', '5. …', '6. ME'])
    } },
  { sign: 'virgo', cap: 'Brought a list | of *one more things.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.25, 0.3, 2), Math.floor(clamp((lt - 0.5) / 1.5) * 8), 'ONE MORE THING:')
      label(x, 790, 1110, 'PAGE 1 OF 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Said goodbye | *for an hour.*', mood: 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.25, 0.3, 2), t)
      const w = ['bye!', 'okay bye!', 'bye bye!', 'byeee!'][Math.floor(lt * 2) % 4]
      bubble(x, 790, 1060, w, pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Paused nine minutes. | Then: *"I know."*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const dots = '.'.repeat(1 + Math.floor(lt * 2.5) % 3)
      if (lt < 1.4) bubble(x, 790, 780, dots, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, col: LAV, tail: 'bl' })
      else bubble(x, 790, 780, '…I know.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 56, col: LAV, tail: 'bl' })
      label(x, 790, 1020, 'PAUSE: 9 MIN', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'One more thing: | *moving abroad.* Bye!', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 790, 960, 24 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.06 })
      label(x, 790, 700, 'FLIGHT: TONIGHT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'One more thing? | *Book a meeting.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'calendar invite | sent.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 920, 'RE: ONE MORE THING', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 30, bg: '#9aa5c4', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'TUES · 9:00 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'One more thing: | a *brand-new theory.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      chalkboard(x, 790, 820, pop01(t, P.t0 + 0.25, 0.3, 2), lt)
      label(x, 790, 1060, 'PART 1 OF 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'One more thing: | *"I love you guys."*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 740, 'love you | GUYS!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      hearts(x, t, 780, 1000, P.t0 + 0.8, { n: 6, life: 2.0, spread: 220, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0116', key: 'C', accent: GOLD, ending: 'callback',
  title: '"One more thing…" | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *left on time.*' },
  last: {
    text: 'Gemini’s still | on *thing forty.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 540, 1000, 300 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', seed: 40, hops: [t - lt + 1.2] })
      const n = 40 + Math.floor(Math.max(0, lt - 1.2) * 3)
      label(x, 540, 1230, geminiThing(n), pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 56, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 760, 790, 'oh, and—', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
