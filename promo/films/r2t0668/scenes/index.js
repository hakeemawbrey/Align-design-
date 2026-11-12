// r2t0668: star_talk, ROLLCALL (twelve signs), "The signs on a | *cabin weekend.*" (signs3kit social cut, music: lofi · G).
// Aries summited before breakfast · Taurus never left the blanket · Gemini found the one bar of signal · Cancer made a
// scrapbook by Saturday · Leo: fifty photos with one tree · Virgo brought a binder for two nights · Libra compared everyone's
// birth charts by the fire · Scorpio read the whole guestbook, took notes · Sagittarius got lost on purpose · Capricorn
// answered work from a canoe · Aquarius named a new constellation · Pisces cried at every sunset.
// Ending: lesson. "No signal, all signs. | *Best weekend yet.*"  last "Next year? | *Gemini booked it.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -190 }
const TREE = ['....G....', '...GGG...', '..GGGGG..', '...GGG...', '..GGGGG..', '.GGGGGGG.', '..GGGGG..', '.GGGGGGG.', 'GGGGGGGGG', '....B....', '....B....']
const TREE_C = { G: '#3fa35a', B: '#8a4a2e' }
const SUNB = ['...YYY...', '.YYYYYYY.', 'YYYYYYYYY', 'OOOOOOOOO', '.........', 'WWWWWWWWW', '.WWWWWWW.']
const SUNB_C = { Y: '#ffb34a', O: '#ff6b5a', W: '#6fc3ff' }
const CANOE = ['K..............K', 'KWWWWWWWWWWWWWWK', '.KWWWWWWWWWWWWK.', '..KKKKKKKKKKKK..']
const CANOE_C = { K: '#8a4a2e', W: '#c98f2a' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#c9d6ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = NIGHT; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.5 - 7, Math.sin(a) * r * 0.5 - 7, 14, 14)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hiked to the summit | *before breakfast.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.5],
    front(x, t, lt, P, F) {
      bits(x, 'BACKPACK', F.x - 120, F.cy + 20, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, TREE, TREE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1090, 'SUMMIT ✓ 6:02 AM', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 34)
      bubble(x, 790, 640, 'again?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Never left | *the blanket.*', mood: 'sleepy', look: [1, 0], star: { x: -190, y: 20 },
    back(x, t, lt, P, F) { bits(x, 'BLANKET', F.x, F.cy + 90, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'MUG', 790, 860, 18 * pop01(t, P.t0 + 0.4, 0.3, 2)); steam(x, t, 780, 790, { n: 3, alpha: 0.7, h: 110 })
      L(x, 770, 1070, `DAY ${1 + Math.floor(clamp((lt - 0.4) / 1.3) * 2)}: STILL HERE`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Found the one bar | of *signal.*', mood: 'wide', look: [1, -1], star: ST, hops: [0.8, 1.4, 1.9],
    front(x, t, lt, P, F) {
      phone(x, t, 800, 790 - 20 * Math.sin(t * 6), 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '1 BAR!', headCol: MINT, lines: [['sending…', BONE, 1]], rot: 0.15 })
      bubble(x, 760, 1110, 'NOBODY MOVE', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook | *by Saturday.*', mood: 'heart', tears: lt => lt > 1.2 ? 1 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'HEARTB', 790, 850, 8 * pop01(t, P.t0 + 0.7, 0.3, 2.4))
      L(x, 790, 1070, 'VOL. 1 OF 4', pop01(t, P.t0 + 1.2, 0.3, 2.2), CREAM, -0.04, 38)
    } },
  { sign: 'leo', cap: 'Fifty photos | with *one tree.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      drawBits(x, TREE, TREE_C, 820, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = (lt * 2.5) % 1; if (fl < 0.15 && lt > 0.4) { x.fillStyle = 'rgba(255,250,235,0.35)'; x.fillRect(110, 480, 860, 740) }
      L(x, 790, 1090, `PHOTO ${Math.min(50, 1 + Math.floor(clamp((lt - 0.3) / 1.7) * 50))}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 42)
    } },
  { sign: 'virgo', cap: 'Brought a binder | for *two nights.*', mood: 'happy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 380, rot: 0.04, head: 'CABIN PLAN', headBg: MINT, headInk: INK, lines: ['7:00 coffee', '7:05 nature', '7:10 snacks', '7:15 more plan'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.3) })
      L(x, 790, 1080, 'TAB 14 OF 30', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Compared everyone’s charts | *by the fire.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1070, 'WE’RE ALL A MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Read the whole guestbook. | *Took notes.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 320, rot: -0.04, head: 'GUESTBOOK', headBg: '#c98f2a', headInk: INK, lines: ['“loved it!”', '“bear??”', '“who is Tim”'], size: 34 })
      bits(x, 'PEN', 920, 960, 12 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.6 })
      L(x, 790, 1090, 'FILE: TIM', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'Got lost. | *On purpose.* Twice.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      L(x, 770, 1070, 'TRAIL? WHAT TRAIL?', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Answered work emails | *from a canoe.*', mood: 'neutral', look: [1, 0], star: { x: -190, y: -30 },
    back(x, t, lt, P, F) { drawBits(x, CANOE, CANOE_C, F.x + 40, F.cy + 140 + 6 * Math.sin(t * 2), 18 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 840, 18 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1060, 'OUT OF OFFICE: NO', pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Named a new | *constellation.*', mood: 'sparkle', look: [1, -1], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const pts = [[690, 640], [760, 720], [850, 690], [900, 800], [820, 880], [720, 860]]
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * pts.length)
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 4; x.beginPath()
      pts.slice(0, Math.max(1, n)).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); if (n > 1) x.stroke(); x.restore()
      pts.slice(0, n).forEach(([a, b], i) => drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, a, b, 10))
      L(x, 790, 1060, '“THE BOB”', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 40)
    } },
  { sign: 'pisces', cap: 'Cried at the sunset. | *Every* sunset.', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SUNB, SUNB_C, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1070, `SUNSET #${1 + Math.floor(clamp((lt - 0.5) / 1.2) * 2)}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, -0.04, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0668', key: 'G', accent: ACC, ending: 'lesson',
  title: 'The signs on a | *cabin weekend.*',
  cameos: CAMEOS,
  group: { cap: 'One cabin. | *Twelve vibes.*' },
  lesson: { text: 'No signal, all signs. | *Best weekend yet.*', chip: 'BONDS: ALIGNED' },
  last: { text: 'Next year? | *Gemini booked it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
