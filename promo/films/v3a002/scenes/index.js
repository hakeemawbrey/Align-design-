// v3a002: zodiac.advice444, ADVICE ROLL CALL, "Each sign's | boundary to set." (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific boundary each with a light visual gag. Ending: lesson.
//   0.0–3.6    "Each sign's | *boundary to set.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one boundary per sign (3.8 s each):
//              ♈ not every fight is yours (the ARGUMENT trophy, set down) · ♉ want a fry? ask first (a tiny fence)
//              · ♊ mute the group chat, guilt-free · ♋ not every feeling is yours to carry (boxes: THEIR MOOD)
//              · ♌ you can be off duty (party hat off) · ♍ their mess? not your job (NOT MY DISHES)
//              · ♎ "no" is a full sentence · ♏ some things stay private (diary: BIRTH TIME: CLASSIFIED)
//              · ♐ not every trip needs a yes (tag: MY CHART SAYS STAY) · ♑ clock out, actually leave (5:00)
//              · ♒ alone time isn't rude (DO NOT DISTURB: RECHARGING) · ♓ you can say no and still be kind (crying, proud)
//  49.2        "Kind. | *And clear.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "A boundary is | how you *stay kind.*"  BOUNDARY: SET
//  58.3        "Taurus says: | *ask for the fry.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', TEAL = '#4fd1c5'

// ── props
const TROPHY = ['YYYYYYYYY', 'YWYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..BBBBB..']
const TROPHY_C = { Y: GOLD, W: '#fff4e2', B: WOOD }
const FRIES = ['.F.F.F.F.', 'FF.FFF.FF', '.FFFFFFF.', 'RRRRRRRRR', 'RRWWRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '.RRRRRRR.']
const FRIES_C = { F: '#ffd45c', R: RED, W: '#fff' }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PYPPPPP.', 'PPPPPPYPP']
const HAT_C = { P: PINK, Y: GOLD }
const PLATE = ['.WWWWWWW.', 'WWWWWWWWW', 'WWBWWWBWW', 'WWWWWWWWW', '.WWWWWWW.']
const SUITCASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', '.K......K.']
const SUITCASE_C = { B: '#b866ff', Y: GOLD, K: '#3a3157' }
const BOOK = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KPPPYYPPPK', 'KPPPYYPPPK', 'KPPYYYYPPK', 'KPPYKKYPPK', 'KPPYYYYPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const BOOK_C = { K: INK, P: '#8a2b4a', Y: GOLD }
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  fn(); x.restore()
}
function boxStack(x, t, cx, cy, n, lt) {
  for (let i = 0; i < n; i++) {
    const k = pop01(t, t - lt + 0.2 + i * 0.15, 0.3, 2), down = ease.inOutCubic(prog(lt, 1.0 + i * 0.12, 1.4 + i * 0.12))
    if (k <= 0.01) continue
    const bx = lerp(cx, 600 + i * 150, down), by = lerp(cy - i * 118, 1150, down)
    x.save(); x.translate(bx, by); x.rotate(lerp((i - 1) * 0.06, 0, down)); x.scale(k * lerp(1.3, 0.8, down), k * lerp(1.3, 0.8, down))
    x.fillStyle = INK; x.fillRect(-90, -44, 180, 88); x.fillStyle = '#c89a62'; x.fillRect(-84, -38, 168, 76)
    x.fillStyle = '#a77a45'; x.fillRect(-84, -38, 168, 12)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THEIR MOOD', 0, 8)
    x.restore()
  }
}
function clock(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 98, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 80 - 4, Math.sin(a) * 80 - 4, 8, 8) }
  const mins = lerp(-0.6, 0, ease.outCubic(clamp(lt / 1.0)))
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(-Math.PI / 2 + mins) * 70, Math.sin(-Math.PI / 2 + mins) * 70); x.stroke()
  const h = 5 / 12 * Math.PI * 2 - Math.PI / 2
  x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(h) * 46, Math.sin(h) * 46); x.stroke()
  x.restore()
}
function door(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -250, 260, 500)
  x.fillStyle = '#5b3a8c'; x.fillRect(-120, -240, 240, 490)
  x.fillStyle = '#6d48a8'; x.fillRect(-100, -220, 200, 190); x.fillRect(-100, 0, 200, 200)
  x.fillStyle = GOLD; x.beginPath(); x.arc(84, 20, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Not every fight | *is yours.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const down = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, TROPHY, TROPHY_C, lerp(700, 820, down), lerp(760, 1060, down), 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lerp(0.15, 0, down) })
      label(x, 800, 610, 'ARGUMENT #12', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 30, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1180, 'LET IT GO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Want a fry? | *Ask first.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FRIES, FRIES_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const f = ease.outCubic(prog(lt, 0.6, 1.1))
      if (f > 0.01) {
        x.save(); x.globalAlpha = clamp(f * 2)
        for (let i = 0; i < 7; i++) { const px = 640 + i * 50; x.fillStyle = INK; x.fillRect(px - 10, 1140 - 110 * f - 6, 20, 110 * f + 6); x.fillStyle = BONE; x.fillRect(px - 6, 1140 - 110 * f, 12, 110 * f) }
        x.fillStyle = INK; x.fillRect(630, 1060, 320, 22); x.fillStyle = BONE; x.fillRect(634, 1064, 312, 14)
        x.restore()
      }
      label(x, 790, 700, 'ASK FIRST', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Mute the group chat. | *Guilt-free.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const muted = lt > 1.2
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), () => {
        const n = muted ? 0 : Math.min(5, 1 + Math.floor(lt * 5))
        for (let i = 0; i < n; i++) { x.fillStyle = [PINK, SKYB, MINT, GOLD, LAV][i]; x.fillRect(-96 + (i % 2) * 30, -140 + i * 54, 160, 42) }
        if (muted) { x.fillStyle = BONE; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('zz', 0, 0) }
      })
      label(x, 780, 1110, muted ? 'MUTED. PEACE.' : 'GROUP CHAT', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: muted ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Not every feeling | *is yours to carry.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      boxStack(x, t, 760, 1000, 3, lt)
      label(x, 800, 620, 'SET THEM DOWN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You can be | *off duty.*', mood: lt => lt > 1.2 ? 'sleepy' : 'sparkle', star: { x: -200 },
    front(x, t, lt, P, F) {
      const off = ease.inOutCubic(prog(lt, 0.7, 1.2))
      drawBits(x, HAT, HAT_C, lerp(F.x + 10, 780, off), lerp(F.top - 40, 1060, off), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.2, 0.4, off) })
      label(x, 790, 760, 'OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Their mess? | *Not your job.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, PLATE, { W: '#fff4e2', B: '#9b7b4a' }, 790 + (i % 2) * 12, 1080 - i * 44, 22 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: (i % 2 ? 0.06 : -0.05) })
      label(x, 790, 700, 'NOT MY DISHES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“No” is | *a full sentence.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 780, 'NO.', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 110, tail: 'bl' })
      sparkles(x, t, 760, 780, P.t0 + 1.0, 8, 170, 0.5)
      label(x, 760, 1080, 'NO EXPLANATION', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Some things | *stay private.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 1120, 'BIRTH TIME: PRIVATE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Not every trip | *needs a yes.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -210 },
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUITCASE_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'MY CHART SAYS: STAY', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'NEXT TIME!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Clock out. | *Actually leave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: { x: -210 }, hops: [1.3, 1.6, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'OUT OF OFFICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Alone time | *isn’t rude.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      door(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 830, 'RECHARGING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: TEAL, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You can say no | *and still be kind.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'no, but | I love you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1060, 'PROUD (CRYING)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 980, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3a002', key: 'E', accent: TEAL, ending: 'lesson',
  title: 'Each sign’s | *boundary to set.*',
  cameos: CAMEOS,
  group: { cap: 'Kind. | *And clear.*' },
  lesson: { text: 'A boundary is | how you *stay kind.*', chip: 'BOUNDARY: SET' },
  last: {
    text: 'Taurus says: | *ask for the fry.*',
    draw(x, t, lt) { drawBits(x, FRIES, FRIES_C, 540, 760, 16 * pop01(t, t - lt + 0.6, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
