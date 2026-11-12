// r2t0423: star_talk, ROLL CALL, "The signs | *at the ballet.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself at the ballet. Ending: group.
//   0.0–3.6    "The signs | *at the ballet.*"
//   3.6–49.2   ♈ joined in, on stage now · ♉ crunched through Act 1 · ♊ live-texted it to their match · ♋ cried at the overture
//              · ♌ took a bow at intermission · ♍ counted every spin, three were off · ♎ better dressed than the dancers
//              · ♏ guessed the lead's sign from one leap · ♐ tried the leap in the lobby · ♑ cost per pirouette: worth it
//              · ♒ rooted for the tree in Act 2 · ♓ the swan got sad, Pisces flooded row C
//  49.2        GROUP (the ending): "Encore? | *Leo said yes.*" (Leo already bowed once)  roses rain on the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const B = (x, cx, cy, text, k, o = {}) => bubble(x, cx, cy, text, k, { size: 44, ...o })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 (steam, sighs, dust) */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a sticky note / paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a little anger mark (four red corner ticks) */
function vein(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const s = 9 * k * (1 + 0.15 * Math.sin(t * 14))
  x.save(); x.translate(cx, cy)
  for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.fillStyle = INK; x.fillRect(dx * s * 1.6 - s * 0.9, dy * s * 1.6 - s * 0.9, s * 1.8, s * 1.8); x.fillStyle = RED; x.fillRect(dx * s * 1.6 - s * 0.6, dy * s * 1.6 - s * 0.6, s * 1.2, s * 1.2) }
  x.restore()
}
const ACC = '#ff8fb1'
const BAG = ['.KKKKKK.', 'KYYYYYYK', 'KYRRRRYK', 'KYRYYRYK', 'KYRRRRYK', 'KYYYYYYK', 'KYYYYYYK', '.KKKKKK.']
const ROSE = ['.RR.', 'RRRR', '.RR.', '..G.', '.GG.', '..G.', '..G.']
const ROSE_C = { R: '#e23d4e', G: '#5fd068' }
const TIARA = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYPYYYY', 'YYYYYYYYY']
const TREE = ['...GGG...', '..GGGGG..', '.GGGGGGG.', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '....B....', '....B....', '...BBB...']
const TREE_C = { G: '#5fd068', B: '#8a4a2e' }
const TISSUE = ['.WW.', 'WWWW', 'BBBB', 'BBBB', 'BBBB']

function rainRoses(x, t, t0, { n = 14, spread = 900, cx = 540, top = 420, fall = 900, cell = 9 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.45 + i / n) % 1)
    drawBits(x, ROSE, ROSE_C, cx + Math.sin(i * 2.7) * spread / 2, top + ph * fall, cell, { rot: Math.sin(t * 2 + i) * 0.6, alpha: Math.sin(Math.PI * ph) })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'The ballet started. | Aries *joined in.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      L(x, 790, 640, 'ON STAGE NOW', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 38)
      bubble(x, 790, 860, 'I got | this!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 1080, 'NOT IN THE CAST', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 32, CREAM)
    } },
  { sign: 'taurus', cap: 'Brought snacks. | Crunched *through Act 1.*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BAG, { K: INK, Y: '#ffe27a', R: '#ff6b5a' }, 790, 900, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.06 })
      for (let i = 0; i < 3; i++) label(x, 640 + i * 160, 640 + (i % 2) * 60, 'CRUNCH', pop01(t, P.t0 + 0.6 + i * 0.35, 0.25, 2.4), { size: 30, bg: BONE, rot: (i - 1) * 0.12, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'shhh!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Live-texted the ballet | *to their match.*', mood: 'sparkle', look: [1, 1], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const lines = ['she SPINS', 'omg a leap', 'a TREE??', 'are u awake'].map((s, i) => [s, i === 3 ? LAV : PINK, pop01(t, P.t0 + 0.3 + i * 0.35, 0.2, 2), true])
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MATCH · LIBRA', headCol: MINT, lines })
    } },
  { sign: 'cancer', cap: 'Cried at the overture. | *Before the dancing.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 9, col: GOLD, alpha: clamp(lt * 2), seed: 2 })
      L(x, 790, 640, 'CURTAIN: STILL DOWN', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 30)
      for (let i = 0; i < 3; i++) drawBits(x, TISSUE, { W: CREAM, B: SKYB }, 760 + i * 40, 1100 - i * 40, 14 * pop01(t, P.t0 + 1.0 + i * 0.25, 0.25, 2), { rot: (i - 1) * 0.2 })
    } },
  { sign: 'leo', cap: 'Took a bow | *at intermission.*', mood: 'sparkle', star: { x: -170 }, squash: lt => lt > 0.8 && lt < 1.6 ? 0.16 : 0,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, ROSE, ROSE_C, 700 + i * 70, lerp(560, 1060 + (i % 2) * 40, ease.outBounce ? ease.outBounce(prog(lt, 0.9 + i * 0.12, 1.5 + i * 0.12)) : prog(lt, 0.9, 1.5)), 14, { rot: (i - 1.5) * 0.4, alpha: lt > 0.85 + i * 0.12 ? 1 : 0 })
      L(x, 790, 680, 'BRAVO (SELF)', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 40)
      sparkles(x, t, 370, 850, P.t0 + 0.9, 8, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Counted every spin. | *Three* were off.', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), ['SPINS: 32', 'CLEAN: 29', 'NOTES: 4 PGS'], { w: 340, bg: CREAM, size: 36, font: MONO, weight: 700 })
      L(x, 790, 1110, 'REVIEW: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Dressed better | *than the dancers.*', mood: 'sparkle', star: { x: -170, y: 30 },
    front(x, t, lt, P, F) {
      drawBits(x, TIARA, { Y: GOLD, P: PINK }, F.x, F.top - 40, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, F.x, F.top - 40, P.t0 + 0.5, 6, 100, 0.2)
      L(x, 790, 760, 'BEST DRESSED', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, 0.05, 40)
      bubble(x, 790, 980, 'is that | the star?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Guessed the lead’s sign | from *one leap.*', mood: 'squint', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), arc = prog(lt, 0.3, 1.2)
      if (k > 0.01) signChar(x, t, 'leo', lerp(660, 920, arc), 980 - Math.sin(Math.PI * arc) * 260, 150 * k, { mood: 'sparkle', seed: 18, glyph: false })
      L(x, 790, 1130, '✦ LEAD: LEO', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 40)
      bubble(x, 430, 590, 'called it.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Tried the leap | *in the lobby.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', star: { x: -80, y: -40 }, hops: [0.5],
    front(x, t, lt, P) {
      L(x, 540, 1120, 'SPLIT: ALMOST', pop01(t, P.t0 + 1.0, 0.3, 2.2), ORANGE, -0.04, 40)
      bubble(x, 780, 620, 'nailed | it!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      if (lt > 1.2) label(x, 280, 900, 'OOF', pop01(t, P.t0 + 1.25, 0.25, 2.4), { size: 40, bg: BONE, rot: -0.12, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Cost per pirouette? | *Worth it.*', mood: lt => lt < 1.1 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), ['TICKET ÷ SPINS', '= GOOD DEAL'], { w: 360, bg: CREAM, size: 34, font: MONO, weight: 700 })
      L(x, 790, 1060, 'APPROVED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 40)
    } },
  { sign: 'aquarius', cap: 'Rooted for | *the tree in Act 2.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TREE, TREE_C, 790, 940, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.03 * Math.sin(t * 2) })
      L(x, 790, 640, 'MVP: THE TREE', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.04, 38)
      bubble(x, 420, 600, 'so brave!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'The swan got sad. | Pisces *flooded row C.*', mood: 'wide', tears: 3, star: { x: -170, y: -40 },
    back(x, t, lt, P) {
      const h = lerp(0, 160, ease.outCubic(prog(lt, 0.4, 2.0)))
      x.save(); x.fillStyle = 'rgba(143,227,255,0.55)'; x.fillRect(110, 1220 - h, 860, h)
      x.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 9; i++) x.fillRect(130 + i * 95 + 10 * Math.sin(t * 3 + i), 1220 - h - 4, 50, 6); x.restore()
    },
    front(x, t, lt, P) {
      L(x, 790, 640, 'ROW C: FLOODED', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 38)
      bubble(x, 790, 860, 'the SWAN!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0423', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *at the ballet.*',
  cameos: CAMEOS,
  group: {
    cap: 'Encore? | *Leo said yes.*',
    moods: ['sparkle', 'happy', 'sparkle', 'wide', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'heart', 'wide'],
    draw(x, t, lt) { rainRoses(x, t, t - lt + 0.8, { n: 16, spread: 900, top: 380, fall: 1000, cell: 10 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
