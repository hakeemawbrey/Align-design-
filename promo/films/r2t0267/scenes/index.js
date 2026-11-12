// r2t0267: THE SIGNS AS… v3, SOLO film, "Taurus making | plans be like." (~51 s vertical, signs3kit social cut,
// music: lofi · E). One sign the whole way through: nine plans, each the most extreme Taurus version.
//   0.0–3.6    "Taurus making | plans *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              plan one food, plan two also food · said yes to brunch, cancelled for a nap · the usual table, forever
//              · a whole trip planned around one bakery · plans at 8, pyjamas at 7 · agreed to a hike, brought a couch
//              · the plan is set in stone (literally) · matched with someone, asked about snacks · spontaneous? no.
//  37.8        "Comfort first. | *Plans second.*"
//  41.0        LESSON UNLOCKED: "Slow plans | are *still plans.*"  COMFORT: BOOKED
//  46.9        "Invite them anyway. | *Bring snacks.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'taurus'
const ST = { x: -190 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const PILLOW = ['.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const COUCH = ['.RR..........RR.', 'RRRRRRRRRRRRRRRR', 'RrrrrrRRrrrrrrRR', 'RrrrrrRRrrrrrrRR', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', '.B............B.']
const COUCH_C = { R: '#c2304a', r: '#e25a6e', B: BROWN }
const CROISSANT = ['....OOOO....', '..OOoOOoOO..', '.OOoOOOOoOO.', 'OOoOO..OOoOO', 'OO.......OO.']
const CROISSANT_C = { O: '#e8a24a', o: '#b9732e' }
const PJ = ['.BBBB..BBBB.', 'BBWBBBBBBWBB', 'BBBBBBBBBBBB', '.BBBBWBBBBB.', '.BBBBBBBWBB.', '.BBWBBBBBBB.', '.BBBBBBBBBB.']
const PJ_C = { B: '#8fa8ff', W: CREAM }

const CAMEOS = [
  { sign: S, cap: 'Plan one: food. | Plan two: *also food.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'SATURDAY', 0, -150, { size: 30, font: MONO, weight: 700 })
        ;['10: brunch', '12: lunch', '2: snack', '4: dinner?', '5: dinner.'].forEach((s, i) => { if (lt > 0.4 + i * 0.25) txt(x, s, -150, -90 + i * 54, { size: 30, weight: 700, color: i === 4 ? RED : BROWN, align: 'left' }) })
      })
      tag(x, 790, 1110, pop01(t, P.t0 + 1.8, 0.3, 2.2), 'FULLY BOOKED', GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Said yes to brunch. | *Cancelled for a nap.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -190, y: 30 },
    back(x, t, lt, P, F) { drawBits(x, PILLOW, { W: '#d8e4ff' }, F.x + 10, F.cy + 110, 24 * pop01(t, P.t0 + 0.8, 0.35, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'brunch at 11?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 790, 860, 'yes!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, col: MINT, tail: 'br' })
      tag(x, 790, 1030, pop01(t, P.t0 + 1.4, 0.3, 2.4), 'UPDATE: NAPPING', LAV, 0.04, 36)
      if (lt > 1.2) { x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.fillText('z', 470 + 10 * Math.sin(t * 2), 640); x.fillText('Z', 510, 600 + 8 * Math.sin(t * 2.4)) }
    } },
  { sign: S, cap: 'Picked the restaurant. | *The usual. Forever.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 820, 300, 200, k, { bg: CREAM, rot: -0.03 }, () => { txt(x, 'TABLE 4', 0, -40, { size: 48, color: RED }); txt(x, 'RESERVED: TAURUS', 0, 30, { size: 22, font: MONO, weight: 700 }) })
      tag(x, 790, 1000, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'VISIT #1,000', MINT, 0.04, 36)
      bubble(x, 790, 1120, 'the usual?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
    } },
  { sign: S, cap: 'Planned a whole trip. | *Around one bakery.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 380, 360, k, { bg: '#cfeccf', rot: 0.03 }, () => {
        x.strokeStyle = '#8fa8ff'; x.lineWidth = 14; x.beginPath(); x.moveTo(-190, 80); x.bezierCurveTo(-60, 20, 40, 140, 190, -40); x.stroke()
        x.setLineDash([12, 10]); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-150, 150); x.lineTo(0, -10 * ease.outCubic(prog(lt, 0.4, 1.2)) + 10); x.stroke(); x.setLineDash([])
        txt(x, 'TRIP MAP', 0, -150, { size: 28, font: MONO, weight: 700 })
      })
      drawBits(x, CROISSANT, CROISSANT_C, 790, 850, 16 * pop01(t, P.t0 + 1.0, 0.35, 2.4))
      sparkles(x, t, 790, 850, P.t0 + 1.2, 6, 110, 0.3)
      tag(x, 790, 1110, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'SIGHTSEEING: NO', BONE, -0.04, 32)
    } },
  { sign: S, cap: 'Plans at 8. | *Pajamas on at 7.*', mood: lt => lt > 1.1 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P, F) { drawBits(x, PJ, PJ_C, F.x, F.cy + 30, 20 * pop01(t, P.t0 + 0.9, 0.35, 2), { alpha: 0.9 }) },
    front(x, t, lt, P) {
      clock(x, 790, 790, 110, pop01(t, P.t0 + 0.2, 0.3, 2), 7, 0)
      tag(x, 790, 990, pop01(t, P.t0 + 0.6, 0.3, 2.2), 'PARTY: 8 P.M.', ORANGE, -0.04, 34)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TAURUS: IN BED', LAV, 0.04, 34)
    } },
  { sign: S, cap: 'Agreed to a hike. | *Brought the couch.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', star: { x: -40, y: -60, s: 250 },
    back(x, t, lt, P) {
      x.fillStyle = 'rgba(95,208,104,0.35)'; x.beginPath(); x.moveTo(120, 1220); x.lineTo(500, 760); x.lineTo(960, 1220); x.closePath(); x.fill()
      drawBits(x, COUCH, COUCH_C, 540, 930, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
    },
    front(x, t, lt, P) {
      tag(x, 290, 640, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'TRAIL: 5 MI', BONE, -0.06, 32)
      tag(x, 800, 1130, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'HIKED: 0 MI', GOLD, 0.05, 34)
    } },
  { sign: S, cap: 'Made a plan. | *Set in stone.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6), drop = ease.inCubic(prog(lt, 0.2, 0.55))
      const y = lerp(560, 860, drop)
      if (k > 0.01) {
        x.save(); x.translate(790, y); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-160, -200, 320, 400, [120, 120, 16, 16]); x.fill()
        x.fillStyle = '#9aa5c4'; x.beginPath(); x.roundRect(-150, -190, 300, 380, [110, 110, 12, 12]); x.fill()
        txt(x, 'THE PLAN', 0, -90, { size: 36, color: DEEP })
        txt(x, 'dinner, 7', 0, -20, { size: 32, weight: 700, color: DEEP })
        txt(x, 'no changes', 0, 40, { size: 32, weight: 700, color: DEEP })
        txt(x, 'ever', 0, 100, { size: 32, weight: 700, color: RED })
        x.restore()
      }
      if (lt > 0.55) sparkles(x, t, 790, 1060, P.t0 + 0.55 * 1.29, 8, 140, 0.2, [GREY, BONE, BONE])
      bubble(x, 420, 640, 'move it to 8?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'br' })
    } },
  { sign: S, cap: 'Got a match. | *Asked about snacks.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = PINK; x.fillRect(-170, -200, 340, 70); txt(x, '✦ NEW MATCH', 0, -165, { size: 30, font: MONO, weight: 700 })
        chart(x, 0, -40, 70, 1, t)
        txt(x, 'Q1: snacks?', 0, 90, { size: 32, color: INK })
        if (lt > 1.2) txt(x, 'A: always', 0, 150, { size: 32, color: GREEN })
      })
      if (lt > 1.3) hearts(x, t, 380, 1000, P.t0 + 1.3 * 1.29, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Spontaneous plans? | *Absolutely not.*', mood: lt => lt > 1.0 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'road trip? now?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      bubble(x, 790, 900, 'NO.', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 90, col: '#ff8a7a', tail: 'bl' })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'REQUIRES 3 WEEKS NOTICE', BONE, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0267', key: 'E', accent: '#5fd068', solo: S, ending: 'lesson',
  title: 'Taurus making | plans *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Comfort first. | *Plans second.*', mood: 'sleepy' },
  lesson: { text: 'Slow plans | are *still plans.*', chip: 'COMFORT: BOOKED' },
  last: { text: 'Invite them anyway. | *Bring snacks.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
