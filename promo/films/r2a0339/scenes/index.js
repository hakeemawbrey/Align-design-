// r2a0339: star_advice, ADVICE ROLLCALL (twelve signs), "How to make plans | *with each sign.*" (signs3kit social cut,
// music: lofi · E). Ending: lesson (LESSON UNLOCKED, then a last line).
//   ♈ pick a time, they'll be early · ♉ mention the food first · ♊ send options, lots · ♋ invite them over, blankets come too
//   · ♌ make it an event · ♍ share the plan early · ♎ two choices, not twenty · ♏ keep it small, just you two
//   · ♐ leave room for a detour · ♑ send the invite · ♒ suggest something odd · ♓ plan a cozy movie night (tissues ready)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, clock, confetti, chart, CUP, CUP_C, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const PIZZA = ['.....YY.....', '....YRYY....', '...YYYYRY...', '..YRYYYYYY..', '.YYYYYRYYYY.', 'CCCCCCCCCCCC']
const PIZZA_C = { Y: '#ffd23a', R: RED, C: '#c98f5a' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBBBPB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#fff', B: '#8fe3ff', P: PINK }
const BLANKET = ['LLLLLLLLLL', 'LYLLYLLYLL', 'LLLLLLLLLL', 'LLYLLYLLYL', 'LLLLLLLLLL']
const SCREEN = (x, cx, cy, k, t) => card(x, cx, cy, 300, 200, k, 0, x => { x.fillStyle = '#140c30'; x.fillRect(-140, -90, 280, 180); hearts(x, t, 0, 60, t - 1, { n: 3, life: 3, spread: 120, cell: 5, seed: 1 }); lines(x, ['THE END'], { size: 30, y: 0, color: CREAM, font: MONO, weight: 700 }) }, PURP)

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Pick a time. | They’ll be *early.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      clock(x, 800, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 6, 40)
      L(x, 800, 1040, 'PLAN: 7:00', pop01(t, P.t0 + 0.4, 0.3, 2), GREY, -0.04, 32)
      if (lt > 1.2) L(x, 800, 1110, 'HERE: 6:40', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 34, CREAM)
    } },
  { sign: 'taurus', cap: 'Mention the food first. | *They’re in.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIZZA, PIZZA_C, 800, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 660, 'say less.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 42, tail: 'bc' })
      if (lt > 1.4) hearts(x, t, 600, 820, P.t0 + 1.4, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Send options. | *Lots of options.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ops = ['park?', 'movie?', 'bowling?', 'all three?']
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GROUP CHAT', headCol: GOLD, rows: ops.map((o, i) => [o, [MINT, LAV, PINK, GOLD][i], pop01(t, P.t0 + 0.4 + i * 0.3, 0.25, 2.2), i % 2 === 1]) })
    } },
  { sign: 'cancer', cap: 'Invite them over. | *Blankets will come too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const stack = Math.min(3, Math.floor(clamp((lt - 0.4) / 1.2) * 4))
      for (let i = 0; i < stack; i++) drawBits(x, BLANKET, { L: ['#b7a6ff', '#ff8fb1', '#7dffb0'][i], Y: CREAM }, 800, 1020 - i * 90, 22, { rot: (i - 1) * 0.05 })
      if (lt > 1.6) L(x, 800, 640, 'COZY: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Make it an event. | They’ll *bring the sparkle.*', mood: 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      card(x, 800, 840, 300, 260, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => { lines(x, ['YOU’RE', 'INVITED'], { size: 44, y: -30 }); lines(x, ['✦ tonight ✦'], { size: 26, y: 70, font: MONO, weight: 700, color: '#6b62a8' }) }, '#ffe7a8')
      sparkles(x, t, 800, 840, P.t0 + 0.9, 8, 200, 0.2); sparkles(x, t, 400, 760, P.t0 + 1.5, 7, 160, 0.6)
    } },
  { sign: 'virgo', cap: 'Share the plan early. | *They’ll relax.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 850, 300, 360, pop01(t, P.t0 + 0.25, 0.35, 2), 0.04, x => {
        lines(x, ['THE PLAN'], { size: 36, y: -130 })
        x.font = `700 26px ${MONO}`; x.textAlign = 'left'
        ;['☑ where', '☑ when', '☑ who', '☑ snacks'].forEach((r, i) => { if (lt > 0.5 + i * 0.25) { x.fillStyle = INK; x.fillText(r, -110, -60 + i * 52) } })
      })
      if (lt > 1.6) L(x, 800, 1090, 'STRESS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Give two choices. | *Not twenty.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 700, 860, 180, 220, pop01(t, P.t0 + 0.25, 0.35, 2), -0.06, x => lines(x, ['A'], { size: 90 }), MINT)
      card(x, 900, 860, 180, 220, pop01(t, P.t0 + 0.45, 0.35, 2), 0.06, x => lines(x, ['B'], { size: 90 }), LAV)
      if (lt > 1.4) { L(x, 800, 1090, 'DECIDED IN 1 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30); sparkles(x, t, 700, 860, P.t0 + 1.4, 6, 130, 0.3) }
    } },
  { sign: 'scorpio', cap: 'Keep it small. | *Just you two.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 760, 900, 230 * k, { mood: 'happy', look: [-1, 0], seed: 33, glyph: false })
      L(x, 600, 620, 'TABLE FOR 2', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 34)
      if (lt > 1.3) hearts(x, t, 580, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'Leave room | for *a detour.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        const p = clamp((lt - 0.4) / 1.3)
        x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath()
        for (let i = 0; i <= 40 * p; i++) { const u = i / 40; const px = -120 + u * 240, py = 80 - u * 160 + Math.sin(u * 14) * 60; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.setLineDash([])
        x.fillStyle = MINT; x.fillRect(-136, 64, 32, 32); x.fillStyle = GOLD; x.fillRect(104, -96, 32, 32)
      }, '#ffe7a8')
      if (lt > 1.6) L(x, 800, 1090, 'SCENIC ROUTE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Send a real invite. | *They’ll accept.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 850, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = RED; x.fillRect(-150, -150, 300, 64); lines(x, ['SAT 2PM'], { size: 36, y: -118, color: CREAM })
        lines(x, ['picnic'], { size: 40, y: -20 })
        if (lt > 1.2) { x.fillStyle = '#5fd068'; x.fillRect(-110, 50, 220, 60); lines(x, ['✓ ACCEPTED'], { size: 28, y: 82, font: MONO, weight: 700 }) }
      })
    } },
  { sign: 'aquarius', cap: 'Suggest something odd. | *They’re so in.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 800, 830, 330, 230, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => { lines(x, ['MOTH', 'MUSEUM?'], { size: 50 }) }, '#8fe3ff')
      if (lt > 1.2) bubble(x, 800, 1060, 'YES. when?', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 40, tail: 'bc', col: MINT })
    } },
  { sign: 'pisces', cap: 'Plan a cozy movie. | *Tissues ready.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      SCREEN(x, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      drawBits(x, TISSUE, TISSUE_C, 640, 1040, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      if (lt > 1.4) L(x, 800, 1120, 'BEST NIGHT', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0339', key: 'E', accent: MINT, ending: 'lesson',
  title: 'How to make plans | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Every sign | *says yes differently.*' },
  lesson: { text: 'Plans feel best | when *they fit.*', chip: 'PLANS: MADE' },
  last: {
    text: 'Now go text | *the group chat.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 9, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
