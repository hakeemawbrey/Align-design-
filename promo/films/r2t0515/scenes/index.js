// r2t0515: star_talk, BE LIKE, "Stood up? | Zodiacs *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · F)
// When the other chair stays empty: twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   3.6–49.2   ♈ waited sixty seconds, over it · ♉ ordered for two, ate for two · ♊ live-texted it to the group · ♋ made
//              excuses for them · ♌ solo-date selfie, best date ever · ♍ checked the time forty times · ♎ smiled at the empty
//              chair · ♏ already knew, booked a table for one · ♐ joined the party at the next table · ♑ inbox zero, a
//              productive date · ♒ checked their chart, blamed Mercury · ♓ wrote a sad song, sobbed
//  49.2        "Table for two. | *Drama for twelve.*"
//  52.6        callback: "And Taurus? | *Dessert for two.*" (card 2, the second plate again)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, chartWheel, clock, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: '#fff4e2' }
const CHAIR = ['WWWWWWW.', 'W.....W.', 'W.....W.', 'W.....W.', 'WWWWWWWW', 'WWWWWWWW', 'W......W', 'W......W', 'W......W']
const CHAIR_C = { W: '#c98f5a' }
const CAKE = ['...R...', '..WWW..', '.PPPPP.', 'WWWWWWW', 'PPPPPPP', 'BBBBBBB']
const CAKE_C = { R: RED, W: CREAM, P: PINK, B: '#c98f5a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Waited sixty seconds. | *Completely over it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      const s = Math.min(60, Math.round(clamp((lt - 0.2) / 1.0) * 60))
      label(x, 790, 820, s < 60 ? `0:${String(s).padStart(2, '0')}` : '1:00', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1040, 'NEXT CHAPTER →', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#f0603a', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ordered for two. | *Ate for two.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const e = prog(lt, 0.9, 1.6)
      for (let i = 0; i < 2; i++) {
        drawBits(x, PLATE, PLATE_C, 690 + i * 200, 1000, 17 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
        if (e < (i ? 1 : 0.5) || i === 0 && lt < 1.2) drawBits(x, BM.PIZZA, BM.PIZZA_C, 690 + i * 200, 960, 12 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2))
      }
      label(x, 790, 720, 'NO REGRETS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#e9b24a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Live-texted it | *to the group chat.*', mood: 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP CHAT', headCol: '#f2cf4a', lines: [
        ['8:01 no sign', BONE, pop01(t, P.t0 + 0.4, 0.2, 2)], ['8:05 STILL no', PINK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['8:06 bread is good', MINT, pop01(t, P.t0 + 1.2, 0.2, 2)], ['viewers: 14', GOLD, pop01(t, P.t0 + 1.6, 0.2, 2), true],
      ] })
    } },
  { sign: 'cancer', cap: 'Made excuses | *for them.*', mood: 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'maybe their | cat is sad?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      bubble(x, 800, 940, 'maybe the | moon is weird?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
      label(x, 790, 1130, 'EXCUSES: 9', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Solo-date selfie. | *Best date ever.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BM.CAMERA, BM.CAMERA_C, 790, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const f = t - (P.t0 + 1.0); if (f > 0 && f < 0.3) { x.fillStyle = `rgba(255,250,235,${(0.6 * (1 - f / 0.3)).toFixed(3)})`; x.fillRect(100, 470, 880, 760) }
      label(x, 790, 1080, 'DATE: 10/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: '#f39a3a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Checked the time | *forty times.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      clock(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 8, (lt * 20) % 60, 140)
      label(x, 790, 1110, `CHECK #${1 + Math.floor(clamp(lt / 2.0) * 39)}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: '#ef5c94', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Kept smiling | *at the empty chair.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'love that | for you!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#e163d6', tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Saw it coming. | *Booked a table for one.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 320, head: 'BOOKING', headCol: '#e23d66', size: 30, rows: [
        ['table for: 1', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['booked: last week', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['surprised: no', RED, pop01(t, P.t0 + 1.4, 0.2, 2)],
      ] })
    } },
  { sign: 'sagittarius', cap: 'Joined the party | *at the next table.*', mood: 'sparkle', star: { x: 150 }, hops: [0.7, 1.2, 1.7],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BM.BALLOON, BM.BALLOON_C, 230 + i * 100, 720 - (i % 2) * 40 + Math.sin(t * 2 + i) * 8, 12 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2))
      drawBits(x, CAKE, CAKE_C, 330, 1000, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 330, 1130, 'NEW BESTIES: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: '#a35cf0', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Answered emails. | *Productive date.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const n = Math.max(0, 48 - Math.floor(clamp((lt - 0.3) / 1.4) * 48))
      label(x, 330, 840, `INBOX: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 330, 1040, n === 0 ? 'GREAT DATE ✓' : 'WORKING…', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Checked their chart. | *Blamed Mercury.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 125)
      label(x, 790, 1080, 'MERCURY DID THIS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#38c4ec', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Wrote a sad song | *about it. Sobbed.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 150, F.cy - 60, { n: 5, cell: 7, col: '#7c74f0', seed: 1 })
      sheet(x, 800, 920, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 300, h: 260, head: 'TRACK 1', headCol: '#7c74f0', size: 28, rows: [
        ['“empty chair”', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['(9 min long)', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0515', key: 'F', accent: PINK, ending: 'callback',
  title: 'Stood up? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Table for two. | *Drama for twelve.*' },
  last: {
    text: 'And Taurus? | *Dessert for two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'taurus', 380, 1010, 270, { mood: 'heart', look: [1, 0], pop: k, seed: 12, hops: [t - lt + 1.0] })
      drawBits(x, CAKE, CAKE_C, 640, 1000, 21 * pop01(t, t - lt + 0.8, 0.3, 2))
      drawBits(x, CAKE, CAKE_C, 830, 1000, 21 * pop01(t, t - lt + 1.1, 0.3, 2))
      label(x, 735, 1180, 'BOTH MINE', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
