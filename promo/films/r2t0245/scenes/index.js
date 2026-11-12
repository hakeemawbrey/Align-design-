// r2t0245: THE SIGNS AS… v3, ROLLCALL, "The signs vs. | the office printer." (~57 s vertical, signs3kit social cut,
// music: lofi · F). The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "The signs vs. | *the office printer.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each), pushed to the extreme:
//              ♈ yelled at it, it printed · ♉ refused to move until it printed (day 2) · ♊ talked to it for an hour
//              · ♋ gave it a blanket · ♌ fixed it, asked for applause · ♍ wrote a 12-page guide, couldn't print it
//              · ♎ apologised to it, and to the paper · ♏ stared at it, it gave up · ♐ took it outside for fresh air
//              · ♑ fixed it, sent the company an invoice · ♒ rebuilt it, now it makes toast · ♓ it jammed, Pisces cried with it
//  49.2        "Still says | *“paper jam.”*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aquarius’ printer? | *Toast for everyone.*"  The toast printer comes back, popping slices.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, SUN, GREY, WOOD, BROWN, GREEN, clamp, prog, lerp, ease } from './props.js'

const ACC = '#9fd6ff'
const TOAST = [
  '.TTTTTT.',
  'TTTTTTTT',
  'TBBBBBBT',
  'TBBBBBBT',
  'TBBBBBBT',
  'TBBBBBBT',
  'TTTTTTTT',
]
const TOAST_C = { T: '#c97a2a', B: '#f2c27a' }
const SUNB = ['...Y...', 'Y..Y..Y', '.YYYYY.', 'YYYYYYY', '.YYYYY.', 'Y..Y..Y', '...Y...']

// the office printer: a grey box with a paper tray and a status screen; paper slides out `out` (0…1)
function printer(x, t, cx, cy, k, { out = 0, screen = 'READY', scol = MINT, shake = 0, blanket = false, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + Math.sin(t * 50) * shake * 6, cy); x.scale(k * s, k * s)
  if (out > 0) { x.fillStyle = INK; x.fillRect(-86, -110 - out * 120, 172, out * 120 + 20); x.fillStyle = '#ffffff'; x.fillRect(-80, -104 - out * 120, 160, out * 120 + 14); x.fillStyle = '#b9b0a0'; for (let i = 0; i < Math.floor(out * 4); i++) x.fillRect(-60, -90 - out * 120 + i * 26, 120 - (i % 2) * 30, 8) }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -90, 316, 210)
  x.fillStyle = INK; x.fillRect(-160, -110, 320, 210)
  x.fillStyle = '#d9dbe8'; x.fillRect(-152, -102, 304, 194)
  x.fillStyle = '#9aa5c4'; x.fillRect(-152, -102, 304, 30)
  x.fillStyle = INK; x.fillRect(-110, -96, 220, 12)
  x.fillStyle = INK; x.fillRect(30, -50, 108, 48); x.fillStyle = scol; x.fillRect(36, -44, 96, 36)
  txt(x, screen, 84, -25, { size: screen.length > 6 ? 14 : 18, font: MONO, weight: 700 })
  x.fillStyle = INK; x.fillRect(-120, 40, 240, 16); x.fillStyle = '#9aa5c4'; x.fillRect(-116, 44, 232, 8)
  x.fillStyle = GREEN; x.fillRect(-130, -40, 16, 16); x.fillStyle = RED; x.fillRect(-104, -40, 16, 16)
  if (blanket) { x.fillStyle = INK; x.fillRect(-170, -40, 340, 150); x.fillStyle = PINK; x.fillRect(-164, -34, 328, 138); x.fillStyle = '#ffd1e3'; for (let i = 0; i < 6; i++) x.fillRect(-150 + i * 56, -20, 28, 110) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Yelled at it. | *It printed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -180 }, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'PRINT!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 56, col: RED, tail: 'bl' })
      printer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { out: prog(lt, 1.0, 1.5), shake: lt < 1.0 && lt > 0.4 ? 1 : 0, screen: lt > 1.0 ? 'OK OK' : 'JAM', scol: lt > 1.0 ? MINT : RED, s: 1 })
    } },
  { sign: 'taurus', cap: 'Refused to move | *until it printed.*', mood: 'neutral', star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      printer(x, t, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'WARMING', scol: SUN, s: 1 })
      label(x, 790, 700, 'WAITING: DAY 2', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SUN, font: MONO, weight: 700 })
      bubble(x, 330, 620, 'I live here now', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Talked to it | *for an hour.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const TOP = ['so, printer…', 'my weekend?', 'funny story—', 'anyway, ink?']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 650, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      printer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'zzz', scol: LAV, s: 1 })
    } },
  { sign: 'cancer', cap: 'Gave it a blanket. | *It’s tired.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      printer(x, t, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'COZY', scol: PINK, blanket: lt > 0.9, s: 1 })
      label(x, 790, 1120, 'REST, LITTLE GUY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: CREAM })
      hearts(x, t, 790, 860, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Pressed one button. | Asked *for applause.*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      printer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { out: prog(lt, 0.5, 1.0), screen: 'OK', s: 1 })
      label(x, 790, 650, 'STANDING OVATION?', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD })
      sparkles(x, t, 790, 800, P.t0 + 1.2, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Wrote a 12-page fix guide. | *Couldn’t print it.*', mood: lt => lt > 1.4 ? 'eyeroll' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) card(x, 720 + i * 18, 680 + i * 14, 200, 130, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { bg: CREAM, rot: -0.06 + i * 0.03, border: 4 }, () => { x.fillStyle = '#b9b0a0'; for (let j = 0; j < 4; j++) x.fillRect(-80, -44 + j * 24, 150 - (j % 2) * 40, 8); if (i === 2) txt(x, 'p. 1/12', 50, 50, { size: 18, font: MONO, weight: 700 }) })
      printer(x, t, 820, 1000, pop01(t, P.t0 + 0.4, 0.35, 2), { screen: 'JAM', scol: RED, s: 0.75 })
    } },
  { sign: 'libra', cap: 'Apologized to it. | *And to the paper.*', mood: 'squint', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'sorry, sorry!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      printer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'FINE.', scol: LAV, s: 1 })
      label(x, 790, 780, 'TO THE PAPER TOO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: CREAM, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Stared at it. | It *gave up.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      printer(x, t, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), { out: prog(lt, 1.3, 1.8), shake: lt > 0.8 && lt < 1.3 ? 0.6 : 0, screen: lt > 1.3 ? 'YES BOSS' : '…', scol: lt > 1.3 ? MINT : GREY, s: 1 })
      label(x, 790, 680, 'EYE CONTACT: 0 BLINKS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Took it outside | *for fresh air.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    back(x, t, lt, P) { drawBits(x, SUNB, { Y: SUN }, 880, 620, 16 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: t * 0.3 }) },
    front(x, t, lt, P) {
      x.fillStyle = 'rgba(95,208,104,0.35)'; x.fillRect(110, 1080, 860, 140)
      printer(x, t, 760, 980, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'HAPPY', scol: MINT, s: 0.8 })
      label(x, 760, 760, 'IT NEEDED THIS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: ORANGE })
    } },
  { sign: 'capricorn', cap: 'Fixed it. | *Sent an invoice.*', mood: 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      printer(x, t, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'FIXED', s: 0.75 })
      card(x, 790, 700, 260, 180, pop01(t, P.t0 + 0.9, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'INVOICE', 0, -56, { size: 30, font: MONO, weight: 700 })
        txt(x, 'printer: fixed', 0, -6, { size: 22, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'DUE: FRIDAY', 0, 46, { size: 28, color: RED })
      })
    } },
  { sign: 'aquarius', cap: 'Rebuilt it. | Now it *makes toast.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      printer(x, t, 790, 980, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'TOAST', scol: SUN, s: 1 })
      const up = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.4)) : prog(lt, 1.0, 1.4)
      if (lt > 1.0) drawBits(x, TOAST, TOAST_C, 790, lerp(900, 740, up), 16)
      label(x, 790, 1150, 'v2.0', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It jammed. | Pisces *cried with it.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, star: { x: -180 },
    front(x, t, lt, P) {
      printer(x, t, 790, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { screen: 'JAM :(', scol: RED, s: 1 })
      bubble(x, 790, 660, 'we’re both | going through it', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0245', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs vs. | *the office printer.*',
  cameos: CAMEOS,
  group: { cap: 'Still says | *“paper jam.”*' },
  last: {
    text: 'Aquarius’ printer? | *Toast for everyone.*',
    draw(x, t, lt) {
      printer(x, t, 540, 1220, pop01(t, t - lt + 0.3, 0.35, 2), { screen: 'TOAST', scol: SUN })
      for (let i = 0; i < 4; i++) {
        const ph = (lt - 0.9 - i * 0.55)
        if (ph <= 0) continue
        const p = Math.min(1, ph / 1.2)
        drawBits(x, TOAST, TOAST_C, 540 + (i - 1.5) * 220 * p, 1120 - Math.sin(Math.PI * Math.min(p, 0.85)) * 380 + (p > 0.85 ? 0 : 0), 14, { rot: p * (i % 2 ? 3 : -3) })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
