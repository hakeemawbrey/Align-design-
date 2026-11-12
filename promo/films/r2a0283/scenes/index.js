// r2a0283: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, here's your | Sunday reset." (~43 s vertical, lofi · C)
// One Sagittarius, nine gentle Sunday-reset steps for a sign that never sits still, each with one visual gag.
//   0.0–3.6    "Sagittarius, here’s | your *Sunday reset.*"
//   3.6–37.8   nine cards: unpack the suitcase from three trips ago · plan zero things · text the friends you met abroad
//              · a real breakfast, not airport snacks · charge your phone and yourself · explore your own street · write
//              the big ideas, pick one · your chart says rest · book the next trip, for later
//  37.8        the ending (group): "Rest today. | *Roam tomorrow.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, bar, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ffc37a'
const ST = { x: -170 }

const PANCAKES = ['....YY....', '...YYYY...', '.SSSSSSSS.', 'SSSSSSSSSS', '.TTTTTTTT.', 'SSSSSSSSSS', '.TTTTTTTT.', 'SSSSSSSSSS', 'WWWWWWWWWW']
const PANCAKES_C = { Y: GOLD, S: '#e0a060', T: '#b06a30', W: '#e8e4f4' }

/** an open suitcase overflowing, with travel stickers */
function suitcase(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -40, 340, 210); x.fillStyle = '#c96a3a'; x.fillRect(-162, -32, 324, 194)
  x.fillStyle = INK; x.fillRect(-40, -70, 80, 34); x.fillStyle = '#c96a3a'; x.fillRect(-32, -64, 64, 22); x.fillStyle = INK; x.fillRect(-20, -58, 40, 12)
  const C = [PINK, SKYB, MINT, GOLD, LAV]
  const pop = ease.outBack(prog(lt, 0.4, 0.8))
  for (let i = 0; i < 6; i++) { x.save(); x.translate(-120 + i * 48, -40 - pop * (30 + (i % 3) * 30)); x.rotate((i - 2.5) * 0.25 * pop); x.fillStyle = INK; x.fillRect(-26, -20, 52, 40); x.fillStyle = C[i % 5]; x.fillRect(-22, -16, 44, 32); x.restore() }
  ;[['TRIP 1', -90, 50, GOLD], ['TRIP 2', 0, 110, MINT], ['TRIP 3', 90, 50, PINK]].forEach(([s, px, py, c], i) => {
    if (lt < 0.9 + i * 0.25) return
    x.save(); x.translate(px, py); x.rotate((i - 1) * 0.12); x.fillStyle = INK; x.fillRect(-56, -22, 112, 44); x.fillStyle = c; x.fillRect(-52, -18, 104, 36); txt(x, s, 0, 2, { size: 22, font: MONO, weight: 700 }); x.restore()
  })
  x.restore()
}
/** a Sunday planner where every line gets crossed out */
function planner(x, cx, cy, k, lt) {
  card(x, cx, cy, 320, 360, k, { bg: CREAM, rot: 0.03 }, () => {
    x.fillStyle = GOLD; x.fillRect(-160, -180, 320, 56)
    txt(x, 'SUNDAY', 0, -152, { size: 32, font: MONO, weight: 700 })
    ;['hike', 'brunch x2', 'concert', 'road trip'].forEach((s, i) => {
      const py = -80 + i * 62
      txt(x, s, -130, py, { size: 32, align: 'left', weight: 700 })
      const p = clamp((lt - 0.6 - i * 0.2) / 0.2)
      if (p > 0) { x.fillStyle = RED; x.fillRect(-136, py - 4, 260 * p, 8) }
    })
  })
}
/** a street sign on a pole */
function streetSign(x, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -60, 24, 320); x.fillStyle = GREY; x.fillRect(-6, -56, 12, 312)
  x.fillStyle = INK; x.fillRect(-170, -140, 340, 96); x.fillStyle = GREEN; x.fillRect(-162, -132, 324, 80)
  x.strokeStyle = '#fff'; x.lineWidth = 4; x.strokeRect(-152, -122, 304, 60)
  txt(x, text, 0, -90, { size: 34, font: MONO, weight: 700, color: '#fff' })
  x.restore()
}
/** a boarding pass */
function ticket(x, cx, cy, k) {
  card(x, cx, cy, 360, 190, k, { bg: '#ffffff', rot: -0.05 }, () => {
    x.fillStyle = SKYB; x.fillRect(-180, -95, 360, 52)
    txt(x, 'BOARDING PASS', 0, -68, { size: 28, font: MONO, weight: 700 })
    txt(x, 'TO: SOMEWHERE', -150, -10, { size: 28, align: 'left' })
    txt(x, 'WHEN: LATER :)', -150, 40, { size: 28, align: 'left', color: '#6b62a8' })
    x.fillStyle = INK; for (let i = 0; i < 12; i++) x.fillRect(110 + (i % 4) * 14, -20 + Math.floor(i / 4) * 22, 8 + (i % 3) * 3, 14)
  })
}

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Unpack the suitcase. | *From three trips ago.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) { suitcase(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'sagittarius', cap: 'Plan zero things today. | *Yes, zero.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) { planner(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'sagittarius', cap: 'Text the friends | *you met abroad.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'TRAVEL FRIENDS', headCol: GOLD, lines: [['miss you!!', PINK, pop01(t, P.t0 + 0.6, 0.25, 2)], ['when\'s the reunion?', MINT, pop01(t, P.t0 + 1.0, 0.25, 2)], ['you still owe me tea', LAV, pop01(t, P.t0 + 1.4, 0.25, 2)]], size: 22 })
      hearts(x, t, 790, 700, P.t0 + 1.2, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: 'sagittarius', cap: 'Eat a real breakfast. | *Not airport snacks.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 690, 'GATE: KITCHEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Charge your phone. | *And yourself.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const p = lerp(0.04, 1, ease.inOutCubic(prog(lt, 0.5, 1.6)))
      bar(x, 790, 800, pop01(t, P.t0 + 0.2, 0.35, 2), p, `PHONE ${Math.round(p * 100)}%`, { col: p > 0.5 ? MINT : RED, w: 300 })
      bar(x, 790, 1020, pop01(t, P.t0 + 0.4, 0.35, 2), p, `YOU ${Math.round(p * 100)}%`, { col: p > 0.5 ? GOLD : RED, w: 300 })
    } },
  { sign: 'sagittarius', cap: 'Explore your own street. | *It counts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      streetSign(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 'YOUR STREET')
      label(x, 800, 1110, 'NEW CAFÉ FOUND!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Write the big ideas down. | *Pick one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 340, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'BIG IDEAS', 0, -130, { size: 32, font: MONO, weight: 700 })
        ;['learn to surf', 'start a band', 'see the aurora', 'run a café'].forEach((s, i) => txt(x, s, -140, -60 + i * 58, { size: 30, align: 'left', weight: 700 }))
        if (lt > 1.2) { x.strokeStyle = GREEN; x.lineWidth = 6; x.beginPath(); x.ellipse(-30, 56, 140, 30, 0, 0, Math.PI * 2 * clamp((lt - 1.2) / 0.3)); x.stroke() }
      })
    } },
  { sign: 'sagittarius', cap: 'Your chart says rest. | *Listen this once.*', mood: lt => lt > 1.3 ? 'sleepy' : 'eyeroll', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 860, 160, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.15)
      label(x, 790, 860, 'REST', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 48, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 600, 640, 'fine. just today.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Book the next adventure. | *For later.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      ticket(x, 790, 860, pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 220, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0283', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'group',
  title: 'Sagittarius, here’s | your *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Rest today. | *Roam tomorrow.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
