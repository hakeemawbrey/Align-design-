// r2t0065: THE SIGNS AS… v3, SOLO film, "Late Capricorns | be like." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine moments of running late, each pushed to the most extreme (and lovable) Capricorn.
//   0.0–3.6    "Late Capricorns | *be like.*"
//   3.6–37.8   two minutes late, sent a formal apology letter · texted an ETA to the second · on time is a crisis
//              · train delayed, got off and walked faster · alarm didn't ring, woke at 4:59 anyway · one minute late,
//              docked their own pay · late to their own party, apologised to the cake · meeting at noon, there at 10:15
//              · finally on time, celebrated (quietly, briefly)
//  37.8        "Five minutes early | *is still late.*"
//  41.0        LESSON: "Be gentle | with *the clock.*"  STATUS: ON TIME-ISH
//  46.9        "Plot twist: | *party’s late too.*"  the cake, a candle, still waiting.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'capricorn', GREEN = '#2fc79a', RED = '#e23d4e'

// ── props
// a sealed envelope with a little letter peeking out
function letter(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  const up = 80 * ease.outCubic(prog(lt, 0.7, 1.2))
  x.fillStyle = INK; x.fillRect(-124, -120 - up, 248, 190); x.fillStyle = '#fff4e2'; x.fillRect(-116, -112 - up, 232, 176)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('Dear all,', -96, -82 - up)
  x.fillStyle = '#b9b0a0'; for (let i = 0; i < 3; i++) x.fillRect(-96, -50 - up + i * 26, 180 - i * 30, 10)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -20, 316, 190)
  x.fillStyle = INK; x.fillRect(-160, -30, 320, 196); x.fillStyle = '#e8dcc4'; x.fillRect(-152, -22, 304, 180)
  x.fillStyle = '#d4c6aa'; x.beginPath(); x.moveTo(-152, -22); x.lineTo(0, 76); x.lineTo(152, -22); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 70, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ff8a8a'; x.fillRect(-8, 62, 16, 16)
  x.restore()
}
// a clock face whose hand sweeps; red when on time
function clock(x, t, cx, cy, k, red, spin = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = red ? '#ffb0b0' : '#fff4e2'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  x.save(); x.rotate(t * spin); x.fillRect(-5, -96, 10, 96); x.restore()
  x.save(); x.rotate(-0.6); x.fillRect(-7, -64, 14, 64); x.restore()
  x.fillStyle = red ? RED : GREEN; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
const CAKE = [
  '.....F.....',
  '.....C.....',
  '.WWWWWWWWW.',
  'WPWWPWWPWWW',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'WWWWWWWWWWW',
  'BBBBBBBBBBB',
]
const CAKE_C = { F: GOLD, C: SKYB, W: '#fff4e2', P: PINK, B: '#8a4a2e' }
const TRAIN = [
  '.KKKKKKKKKKKK.',
  'KGGGGGGGGGGGGK',
  'KGSSGSSGSSGGGK',
  'KGSSGSSGSSGGGK',
  'KGGGGGGGGGGGGK',
  'KYYYYYYYYYYYYK',
  '.KKKKKKKKKKKK.',
  '..KK......KK..',
]
const TRAIN_C = { K: INK, G: '#9aa5c4', S: SKYB, Y: GOLD }

const CAMEOS = [
  { sign: S, cap: 'Two minutes late. | Sent *a formal apology.*', mood: lt => lt > 1.3 ? 'neutral' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      letter(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'SIGNED. SEALED.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Running late. | Texted an *ETA to the second.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sec = 47 - Math.floor(lt * 3)
      bubble(x, 790, 780, `ETA 9:03:${String(sec).padStart(2, '0')}`, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl', font: MONO, weight: 700 })
      label(x, 790, 1000, 'UPDATES: EVERY 10 S', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Early is on time. | On time is *a crisis.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.1 ? Math.sin(lt * 40) * 0.03 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.1, 2)
      label(x, 790, 1080, 'ON TIME?! PANIC.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: S, cap: 'Train delayed. | Got off. *Walked faster.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.2, 1.5, 1.8, 2.1],
    front(x, t, lt, P) {
      drawBits(x, TRAIN, TRAIN_C, 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'DELAYED: 4 MIN', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'TRAIN 0 · CAP 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Alarm didn’t ring. | *Woke up at 4:59 anyway.*', mood: lt => lt > 0.9 ? 'wide' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 780, lt > 0.9 ? '4:59 AM' : '4:58 AM', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 76, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 980, 'ALARM: 5:00', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: LAV, rot: -0.04 })
      label(x, 790, 1090, 'BEAT IT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05 })
    } },
  { sign: S, cap: 'One minute late. | *Docked their own pay.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'PAYSLIP', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 900, 'LATENESS: −1 MIN', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1050, 'FAIR.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Late to their own party. | *Apologised to the cake.*', mood: lt => lt > 1.2 ? 'neutral' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 680, 'so sorry, cake.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Meeting at noon? | *Arrived at 10:15.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      clock(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.9, false, 6)
      label(x, 790, 1060, 'WAITING: 1 H 45', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Finally on time. | Celebrated. *Briefly.*', mood: lt => lt > 1.0 && lt < 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, '9:00:00', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 70, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 5, 120, 0.3)
      label(x, 790, 980, 'YAY.', pop01(t, P.t0 + 1.0, 0.3, 2.4) * (1 - prog(lt, 1.6, 1.8)), { size: 44, bg: GOLD, rot: -0.05 })
      label(x, 790, 980, 'BACK TO WORK.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0065', key: 'F', accent: GREEN, solo: S, ending: 'lesson',
  title: 'Late Capricorns | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Five minutes early | *is still late.*', mood: 'squint' },
  lesson: { text: 'Be gentle | with *the clock.*', chip: 'STATUS: ON TIME-ISH' },
  last: {
    text: 'Plot twist: | *party’s late too.*',
    draw(x, t, lt) {
      drawBits(x, CAKE, CAKE_C, 540, 1170, 28 * pop01(t, t - lt + 0.7, 0.4, 2))
      sparkles(x, t, 540, 1150, t - lt + 1.1, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
