// r2t0064: THE SIGNS AS… v3, BE LIKE, "Ice cream melted. | Zodiacs be like." (~61 s vertical, signs3kit, music: lofi · D)
// Twelve signs in zodiac order, each one's most extreme reaction to a melting ice cream.
//   0.0–3.6    "Ice cream melted. | Zodiacs *be like.*"
//   3.6–49.2   ♈ ate it in one bite (brain freeze, worth it) · ♉ licked the cone, and the napkin · ♊ was mid-story, now a
//              puddle · ♋ saved some for you (it's soup now) · ♌ blamed the sun for being jealous · ♍ brought a backup
//              cup · ♎ it melted on the outfit, now it's a look · ♏ said nothing, revenge on the sun pending
//              · ♐ dropped it, ordered three more · ♑ calculated the melt time, ate on schedule · ♒ refroze it,
//              invented a dessert · ♓ the scoop fell, grieved for an hour
//  49.2        "Twelve cones. | *One puddle.*"  group photo.
//  52.4        LESSON: "Eat the good stuff | *while it’s cold.*"  STATUS: SWEET
//  58.3        "Cancer’s gift? | *Bring a straw.*"  the soup cup with a straw (card four, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', RED = '#e23d4e', CONE_T = '#d99a4a'

// ── props
// a cone with a scoop that melts as m goes 0 → 1 (drips run down, the scoop shrinks)
function cone(x, t, cx, cy, k, m = 0, col = PINK, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  // cone
  x.fillStyle = INK; x.beginPath(); x.moveTo(-58, -6); x.lineTo(58, -6); x.lineTo(0, 170); x.closePath(); x.fill()
  x.fillStyle = CONE_T; x.beginPath(); x.moveTo(-48, 0); x.lineTo(48, 0); x.lineTo(0, 154); x.closePath(); x.fill()
  x.strokeStyle = '#b07a32'; x.lineWidth = 4; for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 22 - 20, 0); x.lineTo(i * 22 + 30, 90); x.stroke() }
  if (!col) { x.restore(); return }
  // scoop
  const r = 62 * (1 - 0.55 * m)
  x.fillStyle = INK; x.beginPath(); x.arc(0, -r * 0.6, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, -r * 0.6, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(-r * 0.5, -r * 1.1, r * 0.35, r * 0.3)
  // drips
  x.fillStyle = col
  for (const [dx, len] of [[-40, 70], [8, 110], [38, 50]]) x.fillRect(dx - 7, -6, 14, len * m)
  x.restore()
}
function puddle(x, cx, cy, k, col = PINK, w = 140) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, w + 6, 34, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, w, 28, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-w * 0.4, -12, w * 0.3, 8)
  x.restore()
}
// a paper cup, with an optional straw
function cup(x, cx, cy, k, { straw = false, col = PINK } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (straw) { x.fillStyle = INK; x.fillRect(14, -150, 22, 120); x.fillStyle = RED; x.fillRect(18, -146, 14, 116); x.fillStyle = '#fff4e2'; for (let i = 0; i < 4; i++) x.fillRect(18, -140 + i * 30, 14, 10) }
  x.fillStyle = INK; x.beginPath(); x.moveTo(-76, -50); x.lineTo(76, -50); x.lineTo(56, 90); x.lineTo(-56, 90); x.closePath(); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.moveTo(-68, -44); x.lineTo(68, -44); x.lineTo(50, 84); x.lineTo(-50, 84); x.closePath(); x.fill()
  x.fillStyle = col; x.fillRect(-66, -44, 132, 20)
  x.fillStyle = SKYB; x.fillRect(-52, 10, 104, 14)
  x.restore()
}
const SUN = [
  '...Y...Y...',
  '....Y.Y....',
  'Y..OOOOO..Y',
  '.YOOOOOOOY.',
  '..OOKOKOO..',
  'YYOOOOOOOYY',
  '..OOKKKOO..',
  '.YOOOOOOOY.',
  'Y..OOOOO..Y',
  '....Y.Y....',
  '...Y...Y...',
]
const SUN_C = { Y: GOLD, O: '#ffb34a', K: INK }
const FLAKE = ['..W.W..', 'W..W..W', '.W.W.W.', 'WWWWWWW', '.W.W.W.', 'W..W..W', '..W.W..']
const NAPKIN = ['WWWWWWW', 'WWWWWWW', 'WWPWWWW', 'WWWWWWW', 'WWWWWWW']

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it in one bite. | *Before it could.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      cone(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0, lt < 1.0 ? '#f0603a' : null, 0.1)
      label(x, 790, 640, 'BRAIN FREEZE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SKYB, rot: -0.05 })
      label(x, 790, 1100, 'WORTH IT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Licked the cone. | *And the napkin.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cone(x, t, 760, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 0.5, '#8a4a2e', -0.08)
      drawBits(x, NAPKIN, { W: '#fff4e2', P: PINK }, 900, 1040, 20 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: 0.2 })
      label(x, 790, 660, 'NO WASTE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Was mid-story. | *Now holding a puddle.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const m = clamp((lt - 0.3) / 1.3)
      cone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), m, '#f2cf4a', 0.06)
      puddle(x, 800, 1090, m, '#f2cf4a', 130)
      bubble(x, 800, 620, lt < 1.5 ? 'and THEN she—' : 'oh no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Saved some for you. | *It’s soup now.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cup(x, 790, 900, pop01(t, P.t0 + 0.3, 0.35, 2) * 1.3)
      label(x, 790, 680, 'FOR YOU ♥', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: PINK, rot: -0.04 })
      label(x, 790, 1110, 'SERVE CHILLED-ISH', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Blamed the sun. | *For being jealous.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 820, 690, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      bubble(x, 790, 920, 'jealous much?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      puddle(x, 790, 1110, pop01(t, P.t0 + 0.5, 0.35, 2), '#ffb34a', 110)
    } },
  { sign: 'virgo', cap: 'Brought a cup. | *And a backup cup.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      cup(x, 710, 920, pop01(t, P.t0 + 0.3, 0.35, 2), { col: MINT })
      cup(x, 880, 920, pop01(t, P.t0 + 0.9, 0.35, 2), { col: MINT })
      label(x, 790, 700, 'PLAN A · PLAN B', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Melted on their outfit. | *Now it’s a look.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [0, 1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const m = clamp((lt - 0.2) / 0.8)
      x.save(); x.fillStyle = PINK; for (const [dx, len] of [[-50, 60], [-10, 90], [30, 50]]) x.fillRect(F.x + dx, F.cy + 10, 16, len * m); x.restore()
      label(x, 790, 760, 'DRIP: COUTURE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.05 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.25, 8, 170, 0.4)
    } },
  { sign: 'scorpio', cap: 'Said nothing. | *Holding a grudge vs. the sun.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, SUN_C, 820, 700, 14 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      label(x, 800, 930, 'NOTED.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 46, bg: '#e23d66', color: '#fff4e2', rot: -0.05 })
      label(x, 800, 1070, 'FORGIVEN: NEVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Dropped it. | *Ordered three more.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.4],
    front(x, t, lt, P) {
      puddle(x, 560, 1140, pop01(t, P.t0 + 0.3, 0.3, 2), '#a35cf0', 90)
      const C = ['#a35cf0', MINT, PINK]
      C.forEach((c, i) => cone(x, t, 690 + i * 110, 900, 0.7 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2), 0, c, (i - 1) * 0.12))
      label(x, 800, 660, 'NO REGRETS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Calculated the melt time. | *Ate on schedule.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const s = Math.max(0, 90 - Math.floor(lt * 40))
      label(x, 790, 700, `MELT IN: 0:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
      cone(x, t, 790, 900, pop01(t, P.t0 + 0.4, 0.35, 2), 0, '#2fc79a', 0.04)
      label(x, 790, 1110, 'ON TIME. ALWAYS.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Refroze it. | *Invented a new dessert.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      puddle(x, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.0 ? '#bfe9ff' : PINK, 140)
      for (let i = 0; i < 3; i++) drawBits(x, FLAKE, { W: '#ffffff' }, 700 + i * 90, 820 - (i % 2) * 40, 9 * pop01(t, P.t0 + 0.8 + i * 0.1, 0.3, 2))
      label(x, 790, 680, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'The scoop fell. | *Grieved for an hour.*', mood: 'wide', tears: 3, look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const p = ease.inQuad(prog(lt, 0.3, 0.7))
      if (lt < 0.7) { x.save(); x.fillStyle = INK; x.beginPath(); x.arc(790, lerp(700, 1080, p), 62, 0, Math.PI * 2); x.fill(); x.fillStyle = LAV; x.beginPath(); x.arc(790, lerp(700, 1080, p), 56, 0, Math.PI * 2); x.fill(); x.restore() }
      else puddle(x, 790, 1100, 1, LAV, 120)
      cone(x, t, 840, 760, pop01(t, P.t0 + 0.1, 0.3, 2) * 0.8, 0, null, 0.2)
      label(x, 790, 1000, 'RIP, SCOOP', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0064', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Ice cream melted. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve cones. | *One puddle.*' },
  lesson: { text: 'Eat the good stuff | *while it’s cold.*', chip: 'STATUS: SWEET' },
  last: {
    text: 'Cancer’s gift? | *Bring a straw.*',
    draw(x, t, lt) {
      cup(x, 540, 740, pop01(t, t - lt + 0.6, 0.4, 2) * 1.2, { straw: lt > 1.0 })
      sparkles(x, t, 540, 730, t - lt + 1.05, 8, 200, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
