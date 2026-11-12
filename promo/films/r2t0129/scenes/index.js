// r2t0129: star_talk, BELIKE, "Paper map? | Zodiacs be like." (topic: Zodiacs using a paper map) (~57 s vertical,
// signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each one's most extreme way with a paper map.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ skipped the map, ran north · ♉ found a bakery on it, trip over · ♊ asked for directions, made a friend
//              · ♋ drew a little home on every corner · ♌ held it up like a trophy · ♍ refolded it on the original creases
//              · ♎ two roads, still deciding · ♏ found the X, told no one · ♐ walked off the edge of the map, kept going
//              · ♑ timed the route to the minute · ♒ drew a new road, it exists now · ♓ the map got wet (tears)
//  49.2        "One map. | *Twelve detours.*"
//  52.6        CALLBACK: "Everyone’s home. | Virgo’s *still folding.*"  Virgo and the map, folding.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#efe0b8', PAPER2 = '#e2cf9f', ROUTE = '#e23d4e', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#8fcf7a', WATER = '#8fc8ef'

// a folded paper map (three panels), with a little lake, a park and a road. extra(x) draws on top in map coords.
function paperMap(x, cx, cy, k, { w = 360, h = 280, rot = 0.04, extra, fold = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * (1 - 0.65 * fold), k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  for (let i = 0; i < 3; i++) { x.fillStyle = i % 2 ? PAPER2 : PAPER; x.fillRect(-w / 2 + i * w / 3, -h / 2, w / 3, h) }
  x.fillStyle = WATER; x.beginPath(); x.ellipse(-w * 0.28, -h * 0.18, w * 0.12, h * 0.12, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = GREEN; x.fillRect(w * 0.12, h * 0.08, w * 0.22, h * 0.26)
  x.strokeStyle = '#b9a77a'; x.lineWidth = 10; x.beginPath(); x.moveTo(-w / 2, h * 0.2); x.lineTo(w / 2, -h * 0.1); x.stroke()
  x.beginPath(); x.moveTo(-w * 0.05, -h / 2); x.lineTo(w * 0.02, h / 2); x.stroke()
  if (extra) extra(x, w, h)
  x.restore()
}
function dashed(x, pts, p, col = ROUTE) {
  x.save(); x.strokeStyle = col; x.lineWidth = 7; x.lineCap = 'round'; x.setLineDash([14, 10]); x.beginPath()
  const n = pts.length - 1, upto = p * n
  x.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i <= n; i++) { const q = clamp(upto - (i - 1)); if (q <= 0) break; x.lineTo(lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)) }
  x.stroke(); x.restore()
}
const HOUSE = ['..RR..', '.RRRR.', 'RRRRRR', '.WWWW.', '.WDDW.', '.WDDW.']
const BUN = ['.BBBB.', 'BbBBbB', 'BBBBBB', '.BBBB.']
const PEN = ['......TT', '.....TT.', '....BB..', '...BB...', '..BB....', '.BB.....', 'KK......']

const CAMEOS = [
  { sign: 'aries', cap: 'Map? Skipped it. | Ran *north.*', mood: 'sparkle', star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      paperMap(x, 820, 1020, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.6, 1.0))), { w: 260, h: 200, rot: 0.3 })
      label(x, 790, 640, 'NORTH: PROBABLY', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 860, 'FOLLOW ME!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: '#ff8a7a', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Found a bakery on it. | *Trip over.*', mood: lt => lt < 1.1 ? 'squint' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paperMap(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { drawBits(x, BUN, { B: ORANGE, b: '#c98f2a' }, 40, -20, 14 * pop01(t, P.t0 + 0.7, 0.3, 2.2)); x.strokeStyle = RED; x.lineWidth = 8; if (lt > 1.0) { x.beginPath(); x.arc(40, -20, 66, 0, Math.PI * 2); x.stroke() } } })
      bubble(x, 790, 620, 'we live | here now', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1100, 'DESTINATION: BUN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked for directions. | *Made a best friend.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 930, 190 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 33, glyph: false })
      bubble(x, 790, 640, 'which way… | omg, same shoes!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'STILL LOST. HAPPY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Drew a little home | on *every corner.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paperMap(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { [[-140, -100], [140, -100], [-140, 100], [140, 100]].forEach(([a, b], i) => drawBits(x, HOUSE, { R: RED, W: CREAM, D: '#8a4a2e' }, a, b, 9 * pop01(t, P.t0 + 0.5 + i * 0.3, 0.25, 2.2))) } })
      label(x, 790, 1110, 'HOME: EVERYWHERE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Held it up | like *a trophy.*', mood: 'sparkle', star: { x: -150, y: 40 }, hops: [1.0],
    front(x, t, lt, P, F) {
      paperMap(x, F.x + 40, F.cy - 230, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 300, h: 220, rot: -0.06 })
      sparkles(x, t, F.x + 40, F.cy - 230, P.t0 + 0.8, 8, 200, 0.2)
      label(x, 800, 1100, 'NAVIGATOR OF THE YEAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Refolded it. | *Original creases.*', mood: lt => lt < 1.6 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paperMap(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { fold: ease.inOutCubic(prog(lt, 0.5, 1.5)) })
      label(x, 790, 1100, 'CREASES: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 870, P.t0 + 1.55, 6, 120, 0.4)
    } },
  { sign: 'libra', cap: 'Two roads. | Still *deciding.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: 0, y: 120, s: 240 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.fillStyle = '#7d86a8'
      x.beginPath(); x.moveTo(500, 1240); x.lineTo(580, 1240); x.lineTo(360, 700); x.lineTo(300, 700); x.fill()
      x.beginPath(); x.moveTo(500, 1240); x.lineTo(580, 1240); x.lineTo(780, 700); x.lineTo(720, 700); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 320, 640, 'LEFT?', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
      label(x, 770, 640, 'RIGHT?', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
      label(x, 540, 1170, 'HOURS: 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Found the X. | *Told no one.*', mood: lt => lt < 1.2 ? 'squint' : 'wink', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      paperMap(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { const k = pop01(t, P.t0 + 0.6, 0.3, 2.4); if (k > 0.01) { x.save(); x.translate(70, 40); x.scale(k, k); x.strokeStyle = RED; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-30, -30); x.lineTo(30, 30); x.moveTo(30, -30); x.lineTo(-30, 30); x.stroke(); x.restore() } } })
      bubble(x, 790, 630, 'shh.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'LOCATION: SECRET', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Walked off the map. | *Kept going.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.9, 1.7],
    front(x, t, lt, P) {
      paperMap(x, 760, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => dashed(x, [[-150, 100], [-40, 20], [80, -30], [160, -55], [240, -80]], ease.inOutCubic(prog(lt, 0.4, 1.6))) })
      label(x, 790, 1100, 'HERE BE ADVENTURE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Timed the route. | *To the minute.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paperMap(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { dashed(x, [[-150, 110], [-60, 0], [60, 10], [150, -100]], ease.inOutCubic(prog(lt, 0.4, 1.3)), INK); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; if (lt > 0.8) x.fillText('4 min', -100, 40); if (lt > 1.1) x.fillText('11 min', 100, -30) } })
      label(x, 790, 1100, 'ARRIVAL: 14:07', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Drew a new road. | *It exists now.*', mood: lt => lt < 1.4 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.5, 1.4))
      paperMap(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { x.save(); x.strokeStyle = '#6fc3ff'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-160, -110); x.lineTo(lerp(-160, 150, p), lerp(-110, 110, p)); x.stroke(); x.restore() } })
      if (lt > 0.4 && lt < 1.6) drawBits(x, PEN, { T: '#6fc3ff', B: CREAM, K: INK }, lerp(630, 940, p) + 40, lerp(760, 980, p) - 40, 10)
      label(x, 790, 1100, 'ROAD: PATENTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The map got wet. | *From crying.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paperMap(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { extra: (x, w, h) => { x.fillStyle = 'rgba(111,195,255,0.55)'; for (let i = 0; i < 6; i++) if (lt > 0.5 + i * 0.2) { x.beginPath(); x.arc(-130 + (i * 71) % 260, -80 + (i * 53) % 170, 34, 0, Math.PI * 2); x.fill() } } })
      bubble(x, 790, 620, 'it’s so | pretty tho', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1100, 'WHERE ARE WE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0129', key: 'D', accent: '#e8c27a', ending: 'callback',
  title: 'Paper map? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One map. | *Twelve detours.*' },
  last: {
    text: 'Everyone’s home. | Virgo’s *still folding.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 360, 1060, 320 * k, { mood: 'squint', look: [1, 0], seed: 40 })
      paperMap(x, 760, 1080, 1.1 * pop01(t, t - lt + 0.7, 0.35, 2), { fold: 0.5 + 0.5 * Math.sin(lt * 4) })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
