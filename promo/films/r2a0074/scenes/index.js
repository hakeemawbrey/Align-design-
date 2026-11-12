// r2a0074: star_advice, ADVICE ROLLCALL, "Each sign's | soft spot." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific soft spot per sign, each with a light visual gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ fierce, melts for puppies · ♉ warm bread · ♊ a 2 a.m. chat · ♋ old photos · ♌ when you remember
//              the little things · ♍ when someone helps first · ♎ a handwritten note · ♏ the friend who stayed
//              · ♐ home (secretly) · ♑ hearing "take a break" · ♒ being understood · ♓ everything (obviously)
//  49.2        GROUP ENDING: "Everyone has one. | *Handle with care.*"  A little pixel heart above the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const PUPPY = ['.BB.....BB.', 'BBBB...BBBB', 'BBWWWWWWWBB', '.WWKWWWKWW.', '.WWWWWWWWW.', '.WWWWNWWWW.', '..WWWPWWW..', '...WWWWW...', '..WWWWWWW..', '..WW...WW..']
const PUPPY_C = { B: BROWN, W: '#f2d2a8', K: INK, N: INK, P: PINK }
const BREAD = ['..CCCCCCC..', '.CCcCCCcCC.', 'CCCCcCCCcCC', 'CCCCCCCCCCC', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const BREAD_C = { C: '#e8a24a', c: '#fff4e2' }
const HOUSE = ['.....R.....', '....RRR....', '...RRRRR...', '..RRRRRRR..', '.RRRRRRRRR.', 'RRRRRRRRRRR', '.WWWWWWWWW.', '.WYYWWWYYW.', '.WYYWWWYYW.', '.WWWWDDWWW.', '.WWWWDDWWW.']
const HOUSE_C = { R: RED, W: CREAM, Y: GOLD, D: BROWN }
const ENV = ['WWWWWWWWWWWWW', 'WPWWWWWWWWWPW', 'WWPWWWWWWWPWW', 'WWWPWWWWWPWWW', 'WWWWPWHWPWWWW', 'WWWWWPWPWWWWW', 'WWWWWWWWWWWWW']

function card(x, cx, cy, w, h, k, draw, { rot = 0.04, bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'; draw(x); x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fierce outside. | *Melts for puppies.*', mood: lt => lt > 0.9 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, PUPPY, PUPPY_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      hearts(x, t, 600, 820, P.t0 + 0.9, { n: 6, life: 1.8, spread: 180, cell: 7, seed: 1 })
      label(x, 790, 1110, 'ARMOR: OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Warm bread. | *Instant peace.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ((t * 0.8 + i / 3) % 1)); x.fillStyle = BONE; x.fillRect(740 + i * 50 + Math.sin(t * 4 + i) * 8, 760 - ((t * 0.8 + i / 3) % 1) * 120, 10, 34); x.restore() }
      label(x, 790, 1100, 'STRESS: GONE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Soft for | *a 2 a.m. chat.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 400, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#140c30'; x.fillRect(-114, -184, 228, 368)
        x.fillStyle = BONE; x.font = `700 40px ${MONO}`; x.fillText('2:04', 0, -130)
        x.fillStyle = MINT; x.fillRect(-96, -60, 170, 56); x.fillStyle = PINK; x.fillRect(-74, 20, 170, 56)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('u up?', -11, -32); x.fillText('always.', 11, 48)
      }, { bg: '#2a2350' })
    } },
  { sign: 'cancer', cap: 'Old photos. | *Every single time.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) card(x, 760 + i * 40, 820 + i * 40, 220, 240, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), x => {
        x.fillStyle = ['#8fe3ff', '#ffd23a', '#ff8fb1'][i]; x.fillRect(-94, -104, 188, 160)
        signChar(x, t, ['cancer', 'pisces', 'taurus'][i], 0, -10, 90, { mood: 'happy', seed: 50 + i, glyph: false, glow: 0.4, tears: i === 1 ? 1 : 0 })
      }, { rot: -0.1 + i * 0.1 })
      label(x, 790, 1110, 'FEELINGS: ON', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You remembered? | *They’ll melt.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'your favorite, | right?', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, tail: 'bl' })
      label(x, 790, 960, 'OAT LATTE, EXTRA FOAM', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 820, P.t0 + 1.3, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'virgo', cap: 'Soft when | *someone helps first.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const done = lt > 1.0
      card(x, 800, 820, 280, 300, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('DISHES', 0, -110)
        for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-110, -60 + i * 50, 30, 30); if (done) { x.fillStyle = '#2fc79a'; x.fillRect(-104, -54 + i * 50, 18, 18) } x.fillStyle = '#9aa5c4'; x.fillRect(-60, -52 + i * 50, 150, 14) }
      })
      label(x, 800, 1080, 'ALREADY DONE?!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A handwritten note. | *Kept forever.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ENV, { W: CREAM, P: '#c9a6ff', H: RED }, 790, 830, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.06 })
      label(x, 790, 1060, 'IN THE GOOD BOX', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'The friend | *who stayed.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 900, 220 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false })
      label(x, 790, 640, 'STILL HERE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 860, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'sagittarius', cap: 'Soft for home. | *Secretly.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, HOUSE_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 420, 620, 'don’t tell anyone.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Hearing | *“take a break.”*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'take a break. | you earned it.', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 790, 1060, 'SHOULDERS: DOWN', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Being | *understood.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'aliens are just shy.', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 34, col: SKYB, tail: 'bl' })
      bubble(x, 800, 880, 'honestly? same.', pop01(t, P.t0 + 0.9, 0.25, 2), { size: 40, col: PINK, tail: 'br' })
      sparkles(x, t, 600, 820, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'pisces', cap: 'Soft for everything. | *Obviously.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const items = ['a nice cloud', 'a dog video', 'a kind cashier']
      items.forEach((s, i) => label(x, 800, 680 + i * 150, s, pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2), { size: 32, bg: [LAV, PINK, SKYB][i], rot: (i - 1) * 0.04 }))
    } },
]

const F = makeFilm({
  id: 'r2a0074', key: 'E', accent: PINK, ending: 'group',
  title: 'Each sign’s | *soft spot.*',
  cameos: CAMEOS,
  group: {
    cap: 'Everyone has one. | *Handle with care.*',
    draw(x, t, lt) {
      const b = 1 + 0.08 * Math.max(0, Math.sin(t * 6))
      drawBits(x, HEART, { H: PINK, W: '#fff' }, 540, 680, 22 * b * pop01(t, t - lt + 1.6, 0.4, 2))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
