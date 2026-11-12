// r2a0668: star_advice, ADVICE SOLO (capricorn), "Capricorn, you’re | *more than work.*" (signs3kit social cut, music: lofi · C).
// One sign (solo, 9 cards): gentle reminders that a Capricorn is more than their output, one gag each. Ending: lesson.
//   the to-do list can wait till Monday · rest is maintenance · your friends miss you, not your output · a day off is
//   allowed · laugh at something unproductive · your worth isn't a spreadsheet · let someone take care of you · the goal
//   can move, you're still winning · someone will love the off-duty you
//   group "Hard worker. | *Soft heart.*"   LESSON "Loved for who you are, | *not what you do.*"
//   last "Out of office? | *Finally, yes.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, steam, friend, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -190 }
const DUCK = ['..YYY....', '.YYKYY...', '.YYYYYOO.', '..YYY....', 'YYYYYYYY.', 'YYYYYYYYY', '.YYYYYYY.']
const DUCK_C = { Y: '#ffd23a', K: INK, O: '#ff9a4a' }
const HATB = ['..RRR..', '..RRR..', 'RRRRRRR']
/** a spreadsheet grid with one cell that becomes a heart */
function grid(x, t, cx, cy, k, heart) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -130, 340, 280)
  x.fillStyle = INK; x.fillRect(-172, -142, 344, 284); x.fillStyle = CREAM; x.fillRect(-164, -134, 328, 268)
  x.fillStyle = '#5fd068'; x.fillRect(-164, -134, 328, 44)
  x.strokeStyle = '#b9b0a0'; x.lineWidth = 2
  for (let i = 1; i < 4; i++) { x.beginPath(); x.moveTo(-164 + i * 82, -90); x.lineTo(-164 + i * 82, 134); x.stroke() }
  for (let j = 1; j < 5; j++) { x.beginPath(); x.moveTo(-164, -90 + j * 45); x.lineTo(164, -90 + j * 45); x.stroke() }
  x.fillStyle = '#8a8070'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) if (!(i === 1 && j === 2)) x.fillText(String((i * 7 + j * 3) % 10 * 100), -123 + i * 82, -68 + j * 45)
  if (heart > 0.01) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, -41, 22, 6 * heart, { outline: null })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Your to-do list | *can wait till Monday.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 380, rot: 0.04, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['quarterly plan', 'reply to all', 'plan 2032', 'plan the plan'], size: 30, align: 'left' })
      L(x, 790, 820, 'PAUSED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.12, 48)
    } },
  { sign: S, cap: 'Rest isn’t lazy. | It’s *maintenance.*', mood: 'sleepy', look: [1, 0], star: { x: -190, y: 10 },
    back(x, t, lt, P, F) { bits(x, 'PILLOW', F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 790, 840, 28 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1060, 'SERVICE MODE: ON', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Your friends miss *you,* | not your output.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP ♡', headCol: PINK, lines: [['we miss u!!', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['come out?', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['…okay ♡', MINT, pop01(t, P.t0 + 1.6, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'You’re allowed | *a whole day off.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel2(x, 790, 820, lt)
      L(x, 790, 1060, 'NO ALARM SET', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 36)
    } },
  { sign: S, cap: 'Laugh at something | *unproductive.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DUCK, DUCK_C, 800, 900, 20 * k)
      drawBits(x, HATB, { R: RED }, 790, 790, 16 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      L(x, 790, 650, 'A DUCK. IN A HAT.', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 790, 1090, 'USEFUL: NO. JOY: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Your worth isn’t | *a spreadsheet.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      grid(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.2 * 3.1 / 2.4, 0.35, 2.4))
      L(x, 790, 1070, 'VALUE: PRICELESS', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Let someone | *take care of you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      friend(x, t, 'cancer', 840, 960, 190, k, { mood: 'happy', look: [-1, 0] })
      const mx = lerp(840, 720, ease.inOutCubic(prog(lt, 0.6, 1.1)))
      bits(x, 'MUG', mx, 860, 16 * k); if (k > 0.5) steam(x, t, mx - 6, 810, { n: 2, alpha: 0.7, h: 90 })
      bubble(x, 800, 660, 'sit. drink. rest.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'br', col: LAV })
    } },
  { sign: S, cap: 'The goal can move. | *You’re still winning.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const gx = lerp(740, 860, ease.inOutCubic(prog(lt, 0.5, 1.2)))
      L(x, gx, 760, 'GOAL', pop01(t, P.t0 + 0.2, 0.3, 2.2), GOLD, 0.03, 44)
      drawBits(x, ['W.', 'W.', 'W.', 'W.', 'W.', 'W.'], { W: BONE }, gx - 40, 860, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1060, 'PROGRESS: STILL YES', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Someone will love | the *off-duty you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: MINT, lines: [['fun for you?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['…rest?', LAV, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['teach me ♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2)]] })
    } },
]
// "emails" crossed out on a calendar day, "NOTHING" written in
function swapLabel2(x, cx, cy, lt) {
  sheet(x, cx, cy, 1, { w: 320, h: 300, rot: -0.04, head: 'SATURDAY', headBg: RED, headInk: CREAM, lines: lt > 1.2 ? [['emails', '#b9b0a0'], ['NOTHING ♡', '#2f9a52']] : ['emails', 'emails'], size: 40 })
  if (lt > 0.9) { const p = clamp((lt - 0.9) / 0.3); x.save(); x.translate(cx, cy); x.rotate(-0.04); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(-80, -50); x.lineTo(-80 + 160 * p, -50); x.stroke(); x.restore() }
}

const F = makeFilm({
  id: 'r2a0668', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Capricorn, you’re | *more than work.*',
  cameos: CAMEOS,
  group: { cap: 'Hard worker. | *Soft heart.*', mood: 'heart' },
  lesson: { text: 'Loved for who you are, | *not what you do.*', chip: 'WORK: LOGGED OFF' },
  last: { text: 'Out of office? | *Finally, yes.*',
    draw(x, t, lt) { L(x, 540, 1180, 'OUT OF OFFICE ✓', pop01(t, t - lt + 0.9, 0.3, 2.2), MINT, -0.04, 44) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
