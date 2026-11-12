// r2t0627: star_talk, SOLO (libra), "Your Libra mom | *be like.*" (signs3kit social cut, music: lofi · E).
// Nine cards: what's for dinner? she held a vote (tie) · two kids fighting, peace talks · painting the kitchen,
// forty swatches · leaving the house? not in that · taking out the trash, full glam · six guests, new plates ·
// met your date, checked the chart · one family photo, take forty-seven · grounded you, felt bad, ice cream?
// Ending: callback ("Dinner vote: | *still tied.*", the ballot box comes back).
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, chart, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }, SG = 'libra'
const BALLOT = ['..WWWW..', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBBKKBBK', 'KBBBBBBK', 'KBBBBBBK', 'KKKKKKKK']
const BALLOT_C = { W: CREAM, K: INK, B: '#6fc3ff' }
const TRASH = ['...KK...', '..KGGK..', '.GGGGGG.', 'GGGGGGGG', 'GGGGGGGG', 'GGGGGGGG', '.GGGGGG.']
const TRASH_C = { K: GOLD, G: '#8a90b8' }
const CONE = ['.PPPP.', 'PPWPPP', 'PPPPPP', 'YYYYYY', '.YYYY.', '.YYYY.', '..YY..', '..YY..']
const CONE_C = { P: PINK, W: '#ffffff', Y: '#e8b36a' }

/** the dinner ballot box with paper votes dropping in, and a tied tally */
function ballot(x, t, cx, cy, k, lt) {
  drawBits(x, BALLOT, BALLOT_C, cx, cy, 24 * k)
  for (let i = 0; i < 3; i++) {
    const p = prog(lt, 0.3 + i * 0.35, 0.6 + i * 0.35)
    if (p > 0 && p < 1) { x.fillStyle = INK; x.fillRect(cx - 24, cy - 200 + p * 120 - 4, 48, 40); x.fillStyle = CREAM; x.fillRect(cx - 20, cy - 200 + p * 120, 40, 32) }
  }
}

const CAMEOS = [
  { sign: SG, cap: 'What’s for dinner? | She *held a vote.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ballot(x, t, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      swapLabel(x, 800, 680, lt, 1.5, 'COUNTING…', 'TIE. AGAIN.', { size: 40, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: SG, cap: 'Two kids fighting? | *Peace talks.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SCALE', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.08 * Math.sin(t * 5) : 0 })
      L(x, 800, 660, 'BOTH SIDES HEARD', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, -0.04, 32)
      L(x, 800, 1100, 'HUG IT OUT ♡', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: SG, cap: 'Painting the kitchen. | *Forty swatches* later…', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = ['#fff4e2', '#fbeedd', '#f5e6d0', '#fff0dc', '#f7ead6', '#fdf1e0', '#f3e4cc', '#fff7ea', '#f9ecd8', '#f6e8d2', '#fbf0de', '#f4e5cf']
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 11)
      for (let i = 0; i < n; i++) { const cx = 680 + (i % 4) * 80, cy = 820 + Math.floor(i / 4) * 90; x.fillStyle = INK; x.fillRect(cx - 34, cy - 38, 68, 76); x.fillStyle = COLS[i]; x.fillRect(cx - 28, cy - 32, 56, 64) }
      L(x, 800, 680, `SWATCH ${Math.min(40, n * 4)}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, 0.04, 40)
      bubble(x, 800, 1140, 'they’re all beige?', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: SG, cap: 'Leaving the house? | *Not in that.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      bubble(x, 800, 700, 'one tiny scarf?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 70); x.scale(k * 0.9, k * 0.9); x.fillStyle = INK; x.fillRect(-130, -26, 260, 52); x.fillRect(60, -26, 52, 160); x.fillStyle = PINK; x.fillRect(-124, -20, 248, 40); x.fillRect(66, -20, 40, 148); x.fillStyle = '#ffffff'; for (let i = 0; i < 5; i++) x.fillRect(-110 + i * 48, -8, 16, 16); x.restore() }
      L(x, 800, 1130, 'NOW YOU MAY GO', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Taking out the trash? | *Full glam.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TRASH, TRASH_C, 800, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'HAIR: DONE', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, 0.05, 40)
      L(x, 800, 790, 'HEELS: ON', pop01(t, P.t0 + 1.2, 0.3, 2), PINK, -0.05, 40)
      sparkles(x, t, 370, 860, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: SG, cap: 'Six guests coming. | Bought *new plates.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.22) + 1)
      for (let i = 0; i < n; i++) bits(x, 'PLATE', 800, 1100 - i * 44, 14)
      L(x, 800, 680, 'MATCHES THE NAPKINS', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: SG, cap: 'Met your new date. | *Checked the chart.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 820, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1050, 'MOM APPROVES ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 36)
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: SG, cap: 'One family photo. | *Take forty-seven.*', mood: lt => lt > 1.6 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 900, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 46)
      L(x, 800, 680, `TAKE ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.04, 48)
      bubble(x, 800, 1120, 'chin up, sweetie!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      const fl = (t * 2) % 1; if (lt > 0.5 && fl < 0.08) { x.save(); x.globalAlpha = 0.3; x.fillStyle = '#fff'; x.fillRect(110, 480, 860, 740); x.restore() }
    } },
  { sign: SG, cap: 'Grounded you. | Felt bad. *Ice cream?*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      swapLabel(x, 800, 700, lt, 1.0, 'GROUNDED', 'ICE CREAM?', { size: 46, fromBg: RED, toBg: PINK })
      drawBits(x, CONE, CONE_C, 800, 960, 24 * pop01(t, P.t0 + 1.4, 0.3, 2), { rot: 0.08 })
      hearts(x, t, 800, 880, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0627', key: 'E', accent: ACC, solo: SG, ending: 'callback',
  title: 'Your Libra mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fair. Fabulous. | *Undecided.*', mood: 'sparkle' },
  last: {
    text: 'Dinner vote: | *still tied.*',
    draw(x, t, lt) {
      ballot(x, t, 540, 1380, 1.5 * pop01(t, t - lt + 0.5, 0.35, 2), lt)
      x.save(); x.globalAlpha = 0.95; bubble(x, 780, 1130, 'recount!', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 48, col: PINK, tail: 'bl' }); x.restore()
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
