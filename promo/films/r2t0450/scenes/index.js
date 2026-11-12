// r2t0450: star_talk, ROLLCALL, "The signs at | a friend’s *art show.*" (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order at a friend's art show, each the most extreme version of itself. Ending: group.
//   3.6–49.2   ♈ bought a painting, still wet · ♉ came for art, stayed at the cheese · ♊ explained the art to the artist
//              · ♋ hung it on their fridge · ♌ posed in front of every painting · ♍ straightened one frame, then all of them
//              · ♎ matched their outfit to the art · ♏ bought the darkest piece · ♐ brought twelve strangers
//              · ♑ asked about resale value · ♒ loved the blank wall most · ♓ a painting of a boat: wept
//  49.2        ending (group): "Best piece there? | *The cheese.*" (a framed cheese, SOLD)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { frame, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const BOAT = ['.....W......', '.....WW.....', '.....WWW....', '.....WWWW...', '.....W......', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..']
const BOAT_C = { W: '#ffffff', B: RED }
const MAGNET = ['RR', 'RR']

/** abstract paint blobs inside a frame */
function blobs(x, cols, seed = 1) {
  cols.forEach((c, i) => { x.fillStyle = c; x.beginPath(); x.arc(Math.sin(i * 2.1 + seed) * 50, Math.cos(i * 1.7 + seed) * 40, 34 + (i % 2) * 14, 0, Math.PI * 2); x.fill() })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bought a painting. | It was *still wet.*', mood: 'sparkle', star: { x: -160 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      frame(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 220, 180, x => {
        blobs(x, [RED, ORANGE, GOLD], 2)
        x.fillStyle = RED; for (let i = 0; i < 4; i++) x.fillRect(-80 + i * 50, 60, 12, 30 + 40 * clamp((lt - 0.4 - i * 0.15) / 0.8))
      })
      label(x, 790, 1060, 'SOLD! (WET)', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for the art. | Stayed at *the cheese.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BM.CHEESE, BM.CHEESE_C, 700 + (i % 2) * 150, 860 + Math.floor(i / 2) * 120, 14 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2))
      label(x, 790, 680, 'ART: OVER THERE →', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Explained the art | *to the artist.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'so what it | MEANS is…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#ffd23a', tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 970, 170 * k, { mood: 'wide', look: [-1, 0], seed: 21, glyph: false })
      label(x, 800, 1130, 'THE ARTIST', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bought the art. | Hung it *on the fridge.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -230, 280, 460); x.fillStyle = '#e8eef5'; x.fillRect(-130, -220, 260, 440)
        x.fillStyle = INK; x.fillRect(-130, -60, 260, 8); x.fillStyle = '#9aa5c4'; x.fillRect(90, -180, 14, 90); x.fillRect(90, 0, 14, 120)
        x.restore()
      }
      frame(x, 770, 790, pop01(t, P.t0 + 0.7, 0.3, 2), 130, 100, x => blobs(x, [SKYB, PINK], 4), { rot: -0.06, col: BONE })
      drawBits(x, MAGNET, { R: RED }, 770, 722, 9 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1040, 'PROUD ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Posed in front | of *every painting.*', mood: 'sparkle', star: { x: 0, y: 60 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      frame(x, 540, 700, pop01(t, P.t0 + 0.15, 0.3, 2), 260, 150, x => blobs(x, [ORANGE, GOLD, PINK], 6))
    },
    front(x, t, lt, P) {
      for (const f of [0.6, 1.2, 1.8]) { const d = lt - f; if (d > 0 && d < 0.18) { x.fillStyle = `rgba(255,250,235,${(0.45 * (1 - d / 0.18)).toFixed(3)})`; x.fillRect(100, 470, 880, 760) } }
      label(x, 800, 1130, 'PIC 47 OF 47', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Straightened one frame. | *Then all of them.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const tilt = (i % 2 ? 0.25 : -0.22) * (1 - ease.inOutCubic(prog(lt, 0.4 + i * 0.4, 0.7 + i * 0.4)))
        frame(x, 680 + i * 120, 760 + (i % 2) * 150, pop01(t, P.t0 + 0.15 + i * 0.1, 0.3, 2), 80, 80, x => blobs(x, [[MINT, GOLD][i % 2], PINK], i), { rot: tilt, col: BONE })
      }
      label(x, 790, 1100, 'LEVEL: 0.0°', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matched their outfit | *to the art.*', mood: 'heart', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 220, 200, x => { x.fillStyle = '#ffd9e6'; x.fillRect(-110, -100, 220, 200); blobs(x, [PINK, '#ff6fa3', LAV], 3) })
      label(x, 790, 1060, 'COORDINATED ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 1.2, 8, 170, 0.2, [PINK, BONE, LAV])
    } },
  { sign: 'scorpio', cap: 'Bought the darkest piece. | *Obviously.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      frame(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 220, 240, x => { x.fillStyle = '#05040c'; x.fillRect(-110, -120, 220, 240); x.fillStyle = '#1b1236'; x.beginPath(); x.arc(20, -20, 50, 0, Math.PI * 2); x.fill() }, { col: '#6b3a5a' })
      label(x, 790, 1090, 'TITLE: "MY SOUL"', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brought a plus-one. | *Plus twelve.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const ids = ['aries', 'leo', 'gemini', 'libra', 'aquarius', 'taurus']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2); if (k > 0.01) signChar(x, t, id, 210 + (i % 3) * 110, 780 + Math.floor(i / 3) * 140, 100 * k, { mood: 'happy', seed: 70 + i, glyph: false, glow: 0.4 }) })
      label(x, 320, 1080, 'GUEST LIST: +12', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked about | *resale value.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      frame(x, 320, 790, pop01(t, P.t0 + 0.2, 0.3, 2), 200, 160, x => blobs(x, [MINT, SKYB], 5), { col: BONE })
      const p = ease.outCubic(prog(lt, 0.6, 1.4))
      if (lt > 0.6) { x.save(); x.strokeStyle = GREEN; x.lineWidth = 20; x.beginPath(); x.moveTo(220, 1060); x.lineTo(lerp(220, 420, p), lerp(1060, 940, p)); x.stroke(); x.restore() }
      label(x, 320, 1100, 'INVESTMENT ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Loved the blank wall. | *Best piece there.*', mood: 'sparkle', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = P.k; x.strokeStyle = BONE; x.lineWidth = 4; x.setLineDash([16, 12]); x.strokeRect(680, 720, 220, 220); x.restore()
      label(x, 790, 990, 'MASTERPIECE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'so brave.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'A painting of a boat. | Pisces *wept.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      frame(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), 230, 180, x => { x.fillStyle = '#bfe8ff'; x.fillRect(-115, -90, 230, 180); x.fillStyle = '#5aa8e0'; x.fillRect(-115, 40, 230, 50); drawBits(x, BOAT, BOAT_C, 0, 10, 12) })
      label(x, 790, 1060, 'IT’S JUST SO… BOAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0450', key: 'F', accent: PINK, ending: 'group',
  title: 'The signs at | a friend’s *art show.*',
  cameos: CAMEOS,
  group: {
    cap: 'Best piece there? | *The cheese.*',
    draw(x, t, lt) {
      frame(x, 540, 690, pop01(t, t - lt + 1.6, 0.4, 2), 150, 110, x => { x.fillStyle = '#fff4e2'; x.fillRect(-75, -55, 150, 110); drawBits(x, BM.CHEESE, BM.CHEESE_C, 0, 0, 14) })
      label(x, 700, 640, 'SOLD', pop01(t, t - lt + 2.4, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.12, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
