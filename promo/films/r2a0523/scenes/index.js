// r2a0523: star_advice, ADVICE SOLO, "Sagittarius, protect | *your peace.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine gentle ways a Sagittarius can protect their peace, each a relatable truth + a warm reframe.
// Ending: callback.
//   0.0–3.6    "Sagittarius, protect | *your peace.*"
//   3.6–37.8   nine cards: you say yes to everything, try one no · freedom is your oxygen, keep some space · group chat on
//              fire, mute it, go outside · restless? take the long walk · draining people, wave from afar · you laugh it
//              off, you can also say ouch · a day with no plans is a plan · fire sign, still needs sleep · your people
//              get it, keep them close
//  37.8        "Free spirit, | *full heart.*"
//  41.2        CALLBACK: "Said one “no.” | *Weekend: saved.*"  the NO stamp comes back: the weekend is FREE.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c97bff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'sagittarius'

function txt(x, s, px, py, size, col = INK, align = 'center', font = INTER, w = 800) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function sheet(x, cx, cy, w, h, k, rot, fn, bg = CREAM) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
// a rubber-stamp mark that slams down (k: 0…1, bigger then settles)
function stamp(x, cx, cy, text, k, col = RED, rot = -0.18, size = 56) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); const s = 1 + 0.6 * (1 - k); x.scale(s, s); x.globalAlpha = clamp(k * 1.5)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(text).width + 40, h = size + 30
  x.strokeStyle = col; x.lineWidth = 8; x.strokeRect(-w / 2, -h / 2, w, h)
  x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}
const KITE = ['....P....', '...PPP...', '..PPYPP..', '.PPPYPPP.', 'YYYYYYYYY', '.PPPYPPP.', '..PPYPP..', '...PPP...', '....P....']
const SHOE = ['.....KKKK...', '....KBBBBK..', '...KBBWBBK..', 'KKKBBBBBBBKK', 'KBBBBBBBBBBK', 'KWWWWWWWWWWK', 'KKKKKKKKKKKK']
const BINOC = ['KKKK..KKKK', 'KGGK..KGGK', 'KGGKKKKGGK', 'KGGGGGGGGK', 'KSSGGGGSSK', 'KSSGKKGSSK', 'KKKK..KKKK']
const BANDAID = ['.PPPPPPPPPP.', 'PPPPWWWWPPPP', 'PPPPWPWPPPPP', 'PPPPWWWWPPPP', '.PPPPPPPPPP.']
const PILLOW = ['..WWWWWWWWWW..', '.WWWWWWWWWWWW.', 'WWWWLWWWWLWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.', '..WWWWWWWWWW..']
function hammock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = BROWN; x.fillRect(-190, -160, 22, 260); x.fillRect(168, -160, 22, 260)
  x.fillStyle = '#5fd068'; x.beginPath(); x.arc(-179, -180, 60, 0, 7); x.arc(179, -180, 60, 0, 7); x.fill()
  x.strokeStyle = CREAM; x.lineWidth = 10; x.beginPath(); x.moveTo(-168, -90); x.quadraticCurveTo(0, 40 + 6 * Math.sin(t * 2), 168, -90); x.stroke()
  x.restore()
}
function zzz(x, t, cx, cy) { for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); txt(x, 'z', cx + i * 30 + ph * 30, cy - ph * 120, 34 + i * 8, LAV); x.restore() } }

const CAMEOS = [
  { sign: S, cap: 'You say yes to everything. | *Try one no.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) sheet(x, 750 + (i - 1.5) * 24, 760 + i * 70, 260, 150, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), -0.1 + i * 0.06, () => {
        txt(x, 'YOU’RE INVITED', 0, -30, 24, '#4a4470', 'center', MONO, 700); x.fillStyle = [PINK, MINT, GOLD, SKYB][i]; x.fillRect(-100, 10, 200, 14); x.fillRect(-100, 36, 140, 14)
      })
      stamp(x, 750, 1000, 'NO, THANKS', pop01(t, P.t0 + 1.3, 0.25, 1.4), RED, -0.18, 46)
    } },
  { sign: S, cap: 'Freedom is your oxygen. | *Keep some space.*', mood: 'sparkle', look: [1, -1], star: { x: -170, y: 60 }, hops: [1.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), kx = 790 + 20 * Math.sin(t * 1.8), ky = 700 + 16 * Math.sin(t * 2.4)
      x.strokeStyle = CREAM; x.lineWidth = 3; x.beginPath(); x.moveTo(F.x + 80, F.cy - 30); x.quadraticCurveTo(600, 760, kx, ky + 90); if (k > 0.5) x.stroke()
      drawBits(x, KITE, { P: ACC, Y: GOLD }, kx, ky, 20 * k, { rot: 0.1 * Math.sin(t * 2) })
      L(x, 790, 1060, 'SPACE: KEPT', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Group chat on fire? | *Mute it. Go outside.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-134, -204, 268, 408); x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388); x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
        txt(x, 'GROUP CHAT', 0, -132, 24, MINT, 'center', MONO, 700)
        const muted = lt > 1.1
        x.fillStyle = muted ? GREY : RED; x.fillRect(-70, -60, 140, 90); txt(x, muted ? 'MUTED' : '99+', 0, -14, muted ? 34 : 50, CREAM, 'center', MONO, 700)
        x.restore()
      }
      L(x, 790, 1110, 'OUTSIDE: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Feeling restless? | *Take the long walk.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { K: INK, B: ACC, W: CREAM }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 5; i++) if (lt > 0.6 + i * 0.25) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(640 + i * 70, 1020 - (i % 2) * 24, 34, 18) }
      L(x, 790, 650, 'ROUTE: THE LONG ONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Some people drain you. | *Wave from afar.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BINOC, { K: INK, G: GREY, S: SKYB }, 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'hiii! (bye)', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1060, 'DISTANCE: HEALTHY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'You laugh it off. | You can *also say ouch.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, lt < 1.2 ? 'haha, it’s fine!' : 'ok… that hurt.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: lt < 1.2 ? BONE : LAV, tail: 'bl' })
      drawBits(x, BANDAID, { P: '#f2b38a', W: CREAM }, 790, 900, 18 * pop01(t, P.t0 + 1.2, 0.3, 2), { rot: -0.3 })
      L(x, 790, 1090, 'HONEST = BRAVE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'A day with no plans | *is a plan.*', mood: 'sleepy', star: { x: 110, y: 60, s: 230 },
    back(x, t, lt, P) { hammock(x, t, 650, 980, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { L(x, 540, 640, 'SCHEDULE: EMPTY ♥', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, -0.04, 32) } },
  { sign: S, cap: 'Fire sign energy? | *Still needs sleep.*', mood: 'sleepy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, PILLOW, { W: CREAM, L: LAV }, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.6) zzz(x, t, F.x + 60, F.cy - 120)
      L(x, 790, 650, '♐︎ RECHARGING', pop01(t, P.t0 + 0.9, 0.3, 2.4), ACC, 0.04, 34)
    } },
  { sign: S, cap: 'Your people get it. | *Keep them close.*', mood: 'heart', star: { x: 0, y: 30, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      signChar(x, t, 'aries', 300, 930, 190 * pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'happy', look: [1, 0], seed: 21, glyph: false })
      signChar(x, t, 'leo', 780, 930, 190 * pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 22, glyph: false })
      L(x, 540, 640, 'INNER CIRCLE', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.03, 36)
      hearts(x, t, 540, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 300, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0523', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'callback',
  title: 'Sagittarius, protect | *your peace.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit, | *full heart.*', mood: 'heart' },
  last: {
    text: 'Said one “no.” | *Weekend: saved.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'sagittarius', 330, 1130, 320 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 33, hops: [t0 + 1.4] })
      sheet(x, 760, 1130, 330, 250, k, 0.05, () => {
        x.fillStyle = ACC; x.fillRect(-165, -125, 330, 60); txt(x, 'THIS WEEKEND', 0, -94, 28, INK, 'center', MONO, 700)
        txt(x, 'SAT · SUN', 0, -10, 40, INK)
      })
      stamp(x, 770, 1180, 'FREE', pop01(t, t0 + 1.2, 0.25, 1.4), '#2fc79a', -0.15, 64)
      sparkles(x, t, 760, 1130, t0 + 1.3, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
