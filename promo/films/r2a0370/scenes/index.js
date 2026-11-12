// r2a0370: star_advice, ADVICE ROLLCALL, "Routines, | *sign by sign.*" (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "Routines, | *sign by sign.*"
//   3.6–49.2   ♈ starts at full speed, pace yourself · ♉ same breakfast daily, comfort is a strength
//              · ♊ needs variety, rotate it, it still counts · ♋ builds it around people, add one thing for you
//              · ♌ the mirror pep talk works · ♍ colour-codes it, leave one square blank
//              · ♎ make it pretty, aesthetic is allowed · ♏ keeps it private, your rituals are valid
//              · ♐ hates routines, try one tiny thing · ♑ 5 a.m. starts, rest is part of it
//              · ♒ invents their own system, weird works · ♓ follows the vibes, gentle reminders help
//  49.2        "Small steps. | *Every day.*"
//  52.6        CALLBACK: "Sagittarius, | *day three.*"  the one-line list comes back, ✓ ✓ ✓.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const SNEAKER = ['....RRR.....', '...RRRRR....', '..RRWRRRRR..', '.RRRRRRRRRRR', 'WWWWWWWWWWWW', 'KKKKKKKKKKKK']
const TOAST = ['.BBBBBB.', 'BTTTTTTB', 'BTTTTTTB', 'BTTYYTTB', 'BTTTTTTB', 'BBBBBBBB']
const MUG = ['WWWWWW..', 'WPPPPWWW', 'WPPPPW.W', 'WPPPPWWW', 'WPPPPW..', '.WWWW...']
const CANDLE = ['...F...', '..FYF..', '...W...', '.PPPPP.', '.PPPPP.', '.PPPPP.', '.PPPPP.', 'KKKKKKK']
const JOURNAL = ['KKKKKKKKK', 'KPPPPPPYK', 'KPPPPPPYK', 'KPPGGPPYK', 'KPPGGPPYK', 'KPPPPPPYK', 'KPPPPPPYK', 'KKKKKKKKK']
const ALARM = ['K.......K', '.KKKKKKK.', 'KWWWWWWWK', 'KWWWKWWWK', 'KWWWKWWWK', 'KWWWKKKWK', 'KWWWWWWWK', '.KKKKKKK.', 'K.......K']
const NOTE = ['YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYY.']
/** a small spinning wheel of options */
function wheel(x, t, cx, cy, r, k, spin) {
  if (k <= 0.01) return
  const C = [PINK, SKYB, GOLD, MINT, LAV, '#ffb34a']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  x.save(); x.rotate(spin)
  for (let i = 0; i < 6; i++) { x.fillStyle = C[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 6 * Math.PI * 2, (i + 1) / 6 * Math.PI * 2); x.closePath(); x.fill() }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-16, -r - 30); x.lineTo(16, -r - 30); x.lineTo(0, -r + 6); x.closePath(); x.fill()
  x.restore()
}
/** a weekly planner grid, colour-coded, one blank square */
function planner(x, cx, cy, k, n) {
  if (k <= 0.01) return
  const C = [PINK, SKYB, GOLD, MINT, LAV]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = CREAM; x.fillRect(-170, -140, 340, 280)
  for (let i = 0; i < 12; i++) { const px = -150 + (i % 4) * 76, py = -120 + Math.floor(i / 4) * 86; if (i >= n) continue; x.fillStyle = INK; x.fillRect(px - 2, py - 2, 68, 76); x.fillStyle = i === 6 ? CREAM : C[i % 5]; x.fillRect(px + 2, py + 2, 60, 68) }
  x.restore()
}
/** a hand mirror */
function mirror(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 110, 36, 140); x.fillStyle = PINK; x.fillRect(-10, 116, 20, 130)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 120, 140, 0, 0, 7); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.ellipse(0, 0, 110, 130, 0, 0, 7); x.fill()
  x.fillStyle = '#bfe9ff'; x.beginPath(); x.ellipse(0, 0, 92, 112, 0, 0, 7); x.fill()
  x.restore()
}
/** a list card with rows + check marks */
function list(x, cx, cy, k, rows, done, { title = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const h = 90 + rows.length * 60
  x.fillStyle = INK; x.fillRect(-160, -h / 2 - 8, 320, h + 16); x.fillStyle = CREAM; x.fillRect(-152, -h / 2, 304, h)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 36)
  x.font = `700 26px ${MONO}`; x.textAlign = 'left'
  rows.forEach((r, i) => { const y = -h / 2 + 96 + i * 60; x.fillStyle = INK; x.fillRect(-130, y - 16, 32, 32); x.fillStyle = i < done ? MINT : CREAM; x.fillRect(-125, y - 11, 22, 22); x.fillStyle = INK; x.fillText(r, -84, y + 2) })
  x.restore()
}
/** an odd hand-drawn system: arrows in a loop */
function loopChart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const N = ['tea', 'think', 'build', 'nap', '?!']
  const C = [SKYB, MINT, GOLD, LAV, PINK]
  N.forEach((n, i) => { const a = i / 5 * Math.PI * 2 - Math.PI / 2 + t * 0.3, px = Math.cos(a) * 140, py = Math.sin(a) * 140
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 50, 0, 7); x.fill(); x.fillStyle = C[i]; x.beginPath(); x.arc(px, py, 43, 0, 7); x.fill()
    x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(n, px, py) })
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 5; x.setLineDash([10, 10]); x.beginPath(); x.arc(0, 0, 140, 0, 7); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Starts at full speed. | *Pace it. It sticks.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      drawBits(x, SNEAKER, { R: RED, W: CREAM, K: INK }, 790 + (lt < 1.4 ? 20 * Math.sin(t * 20) : 0), 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 660, 'DAY 1: EVERYTHING', pop01(t, P.t0 + 0.6, 0.3, 2.4) * (lt > 1.5 ? 0.8 : 1), GOLD, 0.04, 32)
      L(x, 790, 1090, 'DAY 2: A LITTLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Same breakfast daily. | *Comfort is a strength.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, TOAST, { B: '#c98f2a', T: '#f3cf86', Y: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1090, 'TOAST: AGAIN ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Needs variety? | *Rotate it. Still counts.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wheel(x, t, 790, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), 8 * ease.outCubic(clamp((lt - 0.3) / 1.4)))
      L(x, 790, 1100, 'TODAY: YOGA?', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'cancer', cap: 'Builds it around people. | *Add one thing for you.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, MUG, { W: CREAM, P: SKYB }, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 660, 'ME TIME: 7 PM', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, 0.04, 36)
    } },
  { sign: 'leo', cap: 'Mirror pep talks? | *They work.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      mirror(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 1100, 'you’ve GOT this', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      sparkles(x, t, 800, 820, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Colour-codes it all. | *Leave one square blank.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      planner(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(12, Math.floor(clamp((lt - 0.2) / 1.0) * 12) + 1))
      L(x, 790, 1100, 'BLANK = FREE TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Make it pretty. | *Aesthetic is allowed.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = 0.9 + 0.1 * Math.sin(t * 13)
      drawBits(x, CANDLE, { F: '#ffb34a', Y: GOLD, W: CREAM, P: PINK, K: INK }, 720, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { sy: fl })
      drawBits(x, CANDLE, { F: '#ffb34a', Y: GOLD, W: CREAM, P: LAV, K: INK }, 870, 950, 18 * pop01(t, P.t0 + 0.5, 0.35, 2), { sy: fl })
      L(x, 790, 660, 'VIBE: SET', pop01(t, P.t0 + 1.1, 0.3, 2.4), LAV, 0.04, 40)
    } },
  { sign: 'scorpio', cap: 'Keeps it private. | *Your rituals are valid.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, JOURNAL, { K: INK, P: '#c97bff', Y: GOLD, G: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1090, 'FOR MY EYES ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 32, BONE)
    } },
  { sign: 'sagittarius', cap: 'Hates routines? | *Try one tiny thing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      list(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ['step outside'], lt > 1.3 ? 1 : 0, { title: 'MY ROUTINE' })
      L(x, 790, 1090, 'THAT’S IT. THAT’S ALL.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Up at 5 a.m.? | *Rest is part of it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const ring = lt < 1.2 ? 0.12 * Math.sin(t * 40) : 0
      drawBits(x, ALARM, { K: INK, W: CREAM }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: ring })
      L(x, 790, 1100, lt > 1.5 ? 'NAP: ALSO SCHEDULED' : '5:00 AM', pop01(t, P.t0 + 0.6, 0.3, 2.4), lt > 1.5 ? LAV : GOLD, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Invents their own system. | *Weird works.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      loopChart(x, t, 780, 840, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1110, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Follows the vibes. | *Gentle reminders help.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], tears: lt => lt > 1.2 ? 2 : 1, star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2)
        drawBits(x, NOTE, { Y: ['#ffe27a', PINK, MINT][i] }, 720 + i * 90, 700 + i * 140, 16 * k, { rot: (i - 1) * 0.12 })
        if (k > 0.5) { x.save(); x.translate(720 + i * 90, 700 + i * 140); x.rotate((i - 1) * 0.12); x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['water ♡', 'breathe', 'you’re ok'][i], 0, 0); x.restore() }
      }
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2a0370', key: 'G', accent: ACC, ending: 'callback',
  title: 'Routines, | *sign by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Small steps. | *Every day.*' },
  last: {
    text: 'Sagittarius, | *day three.*',
    draw(x, t, lt) {
      const t0 = t - lt
      list(x, 700, 1150, 1.3 * pop01(t, t0 + 0.3, 0.35, 2), ['step outside', 'step outside', 'step outside'], Math.floor(clamp((lt - 0.7) / 1.2) * 3.99), { title: 'MY ROUTINE' })
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 300, 1220, 220 * k, { mood: lt > 2.0 ? 'sparkle' : 'happy', look: [1, 0], seed: 40, hops: [t0 + 2.0, t0 + 2.3] })
      if (lt > 2.0) sparkles(x, t, 700, 1150, t0 + 2.0, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
