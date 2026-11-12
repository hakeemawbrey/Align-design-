// r2a0498: star_advice, ADVICE SOLO (libra), "Libra, it’s okay | *to ask for help.*" (signs3kit social cut, music: lofi · C).
// Nine cards: a relatable Libra truth + a warm reframe, one light gag each. Ending: callback.
//   carrying everyone's mood · "I'm fine!" · fixing every argument · hate bothering people (they reply "omw!!")
//   · hosted, cooked, cleaned (sit down) · asking feels awkward · checking everyone's match but yours · two
//   choices, one Libra · balancing everyone (keep some)
//   group "Helping you | *helps them too.*"   last "They came. | *Obviously.*" (the "omw!!" friend, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const ACC = '#ff8fd0', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4'
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
function phone(x, cx, cy, k, lines, head = 'BESTIE', rot = 0.04) {
  box(x, cx, cy, 280, 400, k, rot, () => {
    x.fillStyle = '#140c30'; x.fillRect(-124, -180, 248, 360)
    x.fillStyle = MINT; x.fillRect(-112, -168, 224, 48); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.fillText(head, 0, -144)
    x.font = `800 30px ${INTER}`
    lines.forEach(([txt, col, kk, right], i) => { if (kk <= 0.01) return; const w = x.measureText(txt).width + 28; x.save(); x.translate(right ? 108 - w / 2 : -108 + w / 2, -70 + i * 70); x.scale(kk, kk); x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2); x.restore() })
  })
}
// a balance scale whose beam tips by `tip` (−1…1)
function scale(x, cx, cy, k, tip, lpan, rpan) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -120, 28, 250); x.fillRect(-70, 120, 140, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -114, 16, 240)
  x.save(); x.rotate(tip * 0.28)
  x.fillStyle = INK; x.fillRect(-180, -132, 360, 22); x.fillStyle = GOLD; x.fillRect(-176, -128, 352, 14)
  for (const [s, fn] of [[-1, lpan], [1, rpan]]) {
    x.save(); x.translate(s * 160, -120); x.rotate(-tip * 0.28)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 90); x.moveTo(0, 0); x.lineTo(50, 90); x.stroke()
    x.fillStyle = INK; x.fillRect(-70, 86, 140, 18); x.fillStyle = GOLD; x.fillRect(-66, 88, 132, 12)
    fn && fn(); x.restore()
  }
  x.restore(); x.restore()
}
const CHAIR = ['PP......', 'PP......', 'PP......', 'PP......', 'PP......', 'PPYYYYYY', 'PPYYYYYY', 'P.....P.', 'P.....P.', 'P.....P.']
const HAND = ['..K.K.K..', '.KWKWKWK.', '.KWKWKWKK', '.KWWWWWKW', 'KWWWWWWWK', 'KWWWWWWK.', '.KWWWWK..', '..KWWWK..']

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'You carry everyone’s mood. | *Put some down.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const drop = lt > 1.4
      const B = ['THEIR STRESS', 'HER BREAKUP', 'HIS DEADLINE', 'GROUP CHAT']
      B.forEach((b, i) => { if (drop && i < 3) return; L(x, 800 + (i % 2 ? 14 : -14), (drop ? 1100 : 1060) - i * 84, b, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), [LAV, PINK, GOLD, MINT][i], (i % 2 ? 0.04 : -0.04), 28) })
      if (drop) L(x, 790, 700, 'LIGHTER ✓', pop01(t, P.t0 + 1.45 * 1.29, 0.3, 2.4), MINT, 0.05, 40)
    } },
  { sign: S, cap: '“I’m fine!” you say. | *You can be honest.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'I’m fine!! ♡', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      if (lt > 1.4) bubble(x, 800, 900, 'ok, not fine.', pop01(t, P.t0 + 1.45 * 1.29, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      if (lt > 1.4) L(x, 790, 1100, 'THAT’S ALLOWED', pop01(t, P.t0 + 1.8 * 1.29, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'You fix every argument. | *Not your job.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 680, 900, 150 * k, { mood: 'squint', look: [1, 0], seed: 31, glyph: false }); signChar(x, t, 'taurus', 900, 900, 150 * k, { mood: 'squint', look: [-1, 0], seed: 32, glyph: false }) }
      L(x, 790, 680, 'MEDIATOR: ON CALL', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 30)
      L(x, 790, 1100, 'SHIFT: OVER ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'You hate bothering people. | *They want to help.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['sorry to bug u…', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        ['omw!!', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
        ['bringing tea', MINT, pop01(t, P.t0 + 1.8, 0.25, 2.2)],
      ])
    } },
  { sign: S, cap: 'Hosted. Cooked. Cleaned. | *Sit down.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { P: ACC, Y: GOLD }, 800, 940, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 700, 'RESERVED: LIBRA', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.05, 32)
      bubble(x, 560, 620, 'we got the dishes', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Asking feels awkward. | *It gets easier.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const up = clamp((lt - 0.4) / 1.0)
      drawBits(x, HAND, { K: INK, W: '#ffd9c0' }, F.x + 160, F.cy - 40 - up * 120, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 720, 'um… can I ask | something?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1100, 'OF COURSE!', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'You check everyone’s match. | *Check yours too.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const mine = lt > 1.5
      box(x, 790, 860, 300, 300, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = ACC; x.fillRect(-150, -150, 300, 60); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('COMPATIBILITY', 0, -120)
        x.fillStyle = BONE; x.font = `700 80px ${GLYPH_FONT}`; x.fillText(mine ? '♎︎ + ♊︎' : ['♈︎ + ♌︎', '♉︎ + ♍︎', '♋︎ + ♓︎'][Math.floor(lt * 2.5) % 3], 0, 16)
        x.font = `700 24px ${MONO}`; x.fillText(mine ? 'FOR: YOU' : 'FOR: FRIENDS', 0, 110)
      })
      L(x, 790, 640, mine ? 'FINALLY. YOURS.' : 'CHECKED: 27', pop01(t, P.t0 + 0.5, 0.3, 2.2), mine ? MINT : GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'Two choices, one Libra. | *Ask a friend.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 700, 720, 'SOUP?', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.06, 40)
      L(x, 890, 720, 'SALAD?', pop01(t, P.t0 + 0.35, 0.3, 2), MINT, 0.06, 40)
      bubble(x, 790, 920, 'get the soup!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      L(x, 790, 1110, 'DECIDED IN 1 SEC', pop01(t, P.t0 + 1.8, 0.3, 2.4), BONE, -0.04, 30)
    } },
  { sign: S, cap: 'You balance everyone. | *Keep some for you.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const tip = lt > 1.4 ? -0.4 : Math.sin(t * 2) * 0.15
      scale(x, 790, 900, 0.8 * pop01(t, P.t0 + 0.15, 0.3, 2), tip,
        () => { if (lt > 1.4) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 60, 10) },
        () => { x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('EVERYONE', 0, 70) })
      L(x, 790, 1130, 'YOU COUNT TOO', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0498', key: 'C', accent: ACC, solo: S,
  title: 'Libra, it’s okay | *to ask for help.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Helping you | *helps them too.*', mood: 'heart' },
  last: {
    text: 'They came. | *Obviously.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      if (k > 0.01) { signChar(x, t, 'libra', 420, 1060, 240 * k, { mood: 'heart', seed: 5, look: [1, 0] }); signChar(x, t, 'gemini', 680, 1060, 220 * k, { mood: 'sparkle', seed: 6, look: [-1, 0], hops: [t - lt + 1.0] }) }
      label(x, 540, 800, 'omw!! → here!', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 930, t - lt + 1.4, { n: 7, life: 2.0, spread: 400, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
