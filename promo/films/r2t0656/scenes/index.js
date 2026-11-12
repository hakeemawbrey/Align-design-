// r2t0656: star_talk, SOLO (virgo), "Virgo red flags | *we love.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine "red flags" that are secretly love, each pushed to the most extreme Virgo version.
//   reorganised your fridge on date one · corrected your "ur cute" text · a quarterly review of the relationship
//   · sanitised your hands before holding them · annotated your birth chart · remembers every word, indexed
//   · ironed your socks · forty minutes early, reviewed the venue · "I'm fine" (cleans the whole house)
// Ending: card. group "Picky? | *Picked you.*" · lesson · "Final review? | *Keeper.*" over Virgo + Taurus (the review, paid off).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, soap, steam, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fdc6a', S = 'virgo', ST = { x: -180 }

// an open fridge whose shelves go from jumbled to sorted by colour
const FCOLS = [RED, '#ffb34a', '#ffe76a', '#5fd068', SKYB, LAV]
function fridge(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -208, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -220, 300, 440)
  x.fillStyle = '#e8eef8'; x.fillRect(-142, -212, 284, 424)
  x.fillStyle = '#fffbe6'; x.fillRect(-126, -196, 252, 392)
  const sorted = ease.inOutCubic(prog(lt, 0.7, 1.3))
  for (let r = 0; r < 4; r++) {
    const y = -150 + r * 96
    x.fillStyle = STEEL; x.fillRect(-126, y + 40, 252, 8)
    for (let c = 0; c < 5; c++) {
      const jumble = FCOLS[(r * 7 + c * 3) % 6], neat = FCOLS[(r + Math.floor(c / 5)) % 6]
      const col = sorted > 0.5 ? neat : jumble
      const jx = (1 - sorted) * Math.sin(r * 3 + c * 5) * 10
      x.fillStyle = INK; x.fillRect(-112 + c * 48 + jx - 3, y - 26 - 3, 38, 66 - 6)
      x.fillStyle = col; x.fillRect(-112 + c * 48 + jx, y - 26, 32, 54 - 6)
    }
  }
  x.restore()
}
// a pair of socks with a crisp ironed crease
const SOCK = ['.WWWW..', '.WWWW..', '.WWWW..', '.WWWW..', '.WWWW..', '.WWWWW.', 'WWWWWWW', 'WWWWWWW', '.WWWWW.']
function socks(x, t, cx, cy, k) {
  if (k <= 0.01) return
  drawBits(x, SOCK, { W: CREAM }, cx - 60, cy, 20 * k, { rot: -0.08, sx: -1 })
  drawBits(x, SOCK, { W: CREAM }, cx + 70, cy + 10, 20 * k, { rot: 0.08 })
  x.save(); x.strokeStyle = STEEL; x.lineWidth = 4
  x.beginPath(); x.moveTo(cx - 60, cy - 80 * k); x.lineTo(cx - 60, cy + 40 * k); x.moveTo(cx + 70, cy - 70 * k); x.lineTo(cx + 70, cy + 50 * k); x.stroke(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Reorganised your fridge. | *On date one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      fridge(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1120, 'SORTED: BY COLOUR', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.35, 7, 200, 0.4)
    } },
  { sign: S, cap: 'You texted “ur cute.” | They sent *a correction.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: VIRGO', headCol: MINT, lines: [['ur cute', PINK, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['*you’re', MINT, pop01(t, P.t0 + 1.2, 0.2, 2), true], ['(also cute)', MINT, pop01(t, P.t0 + 1.7, 0.2, 2), true]], typing: lt > 0.7 && lt < 1.2 ? 1 : 0, size: 28 })
    } },
  { sign: S, cap: 'Gave the relationship | a *quarterly review.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'US: Q3 REVIEW', headBg: ACC, headInk: INK, lines: ['talking: A', 'snacks: B+', 'socks: see p.2'], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'MEETING: 9 AM', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Sanitised your hands | *before holding them.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'SPRAY', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.12 })
      soap(x, t, 820, 760, { n: 6, spread: 220, r: 22, h: 220, alpha: clamp((lt - 0.5) * 2) })
      bubble(x, 800, 620, 'hold hands?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      L(x, 800, 1110, 'NOW YOU MAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Annotated | your *birth chart.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 860, 160, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      const pins = [[690, 760], [900, 800], [740, 980], [880, 960]]
      pins.forEach(([px, py], i) => { if (lt > 0.6 + i * 0.25) { x.fillStyle = INK; x.fillRect(px - 16, py - 16, 32, 32); x.fillStyle = '#ffe76a'; x.fillRect(px - 12, py - 12, 24, 24) } })
      L(x, 800, 1100, 'NOTES: 14 PAGES', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Remembers every word. | *Indexed.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      ;[PINK, MINT, SKYB, GOLD].forEach((c, i) => { const k = pop01(t, P.t0 + 0.6 + i * 0.15, 0.25, 2); if (k > 0.01) { x.fillStyle = INK; x.fillRect(930, 760 + i * 46 - 4, 48 * k + 8, 36); x.fillStyle = c; x.fillRect(934, 760 + i * 46, 44 * k, 28) } })
      L(x, 800, 640, 'TAB: YOUR FAVES', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.04, 32)
      L(x, 800, 1080, 'SINCE DATE ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Ironed your socks. | *You’re welcome.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      socks(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 720, { n: 3, h: 120, alpha: clamp(lt - 0.4) })
      L(x, 800, 1090, 'CREASE: PERFECT', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Forty minutes early. | *Reviewed the venue.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 650, 11 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sheet(x, 800, 900, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 330, h: 280, head: 'VENUE REVIEW', headBg: STEEL, headInk: INK, lines: ['lights: fine', 'chairs: wobbly', ['you: 10/10', '#c2185b']], size: 32, align: 'left', progress: clamp((lt - 0.7) / 1.0) })
    } },
  { sign: S, cap: '“I’m fine.” | *Cleans the whole house.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      bits(x, 'BROOM', 800 + 20 * Math.sin(t * 9), 900, 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.25 * Math.sin(t * 9) })
      soap(x, t, 800, 1000, { n: 7, spread: 280, r: 24, h: 300, alpha: clamp(lt - 0.8) })
      L(x, 800, 1110, 'ROOMS DONE: 7', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0656', key: 'C', accent: ACC, solo: S, ending: 'card',
  title: 'Virgo red flags | *we love.*',
  cameos: CAMEOS,
  card: { a: 'virgo', b: 'taurus', chip: 'IT’S A MATCH' },
  group: { cap: 'Picky? | *Picked you.*', mood: 'heart' },
  lesson: { text: 'They notice everything. | *Including you.*', chip: 'STATUS: NOTICED' },
  last: {
    text: 'Final review? | *Keeper.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 600, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
