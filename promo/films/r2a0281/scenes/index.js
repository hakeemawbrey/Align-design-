// r2a0281: star_advice, ADVICE SOLO (capricorn), "Capricorn, let yourself | be proud." (~45 s vertical, signs3kit, lofi · D)
// One Capricorn, nine warm nudges to actually enjoy what they've done, each with one visual gag.
//   0.0–3.6    "Capricorn, let | yourself *be proud.*"
//   3.6–37.8   nine cards: you hit the goal, look at it first · got a compliment, say thank you · the list is done, all of
//              it · built slowly, counts double · hang the certificate, not in a drawer · mom's already bragging · your
//              chart agrees · close the laptop, wear the party hat · look how far you've climbed
//  37.8        "Proud looks | *good on you.*"
//  41.2        callback: "Next goal? | *After cake.*" the trophy comes back with a cake beside it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, laptop, chart, confetti, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#b9f0c8'
const ST = { x: -170 }

const TROPHY = ['GGGGGGGGGGG', 'G.GGGGGGG.G', 'G.GGGWGGG.G', '.GGGGWGGGG.', '..GGGGGGG..', '...GGGGG...', '....GGG....', '.....G.....', '....GGG....', '..BBBBBBB..', '..BBBBBBB..']
const TROPHY_C = { G: GOLD, W: '#fff4c0', B: '#8a4a2e' }
const CAKE = ['....F....', '....C....', '.PPPPPPP.', 'PWPWPWPWP', 'PPPPPPPPP', 'SSSSSSSSS', 'SWSSWSSWS', 'SSSSSSSSS']
const CAKE_C = { F: ORANGE, C: CREAM, P: PINK, W: '#fff', S: '#c98f6a' }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPYP..', '.PPPPPPP.', '.PYPPPYP.', 'PPPPPPPPP']
const HAT_C = { Y: GOLD, P: '#7dc8ff' }

function trophy(x, cx, cy, k, cell = 18) { drawBits(x, TROPHY, TROPHY_C, cx, cy, cell * k) }
/** a checklist card; every row ticked once lt passes its time */
function checklist(x, cx, cy, k, lt, rows) {
  card(x, cx, cy, 330, 80 + rows.length * 70, k, { bg: CREAM, rot: 0.04 }, () => {
    const h = 80 + rows.length * 70
    txt(x, 'TO DO', 0, -h / 2 + 40, { size: 32, font: MONO, weight: 700 })
    rows.forEach((r, i) => {
      const py = -h / 2 + 105 + i * 70
      x.fillStyle = INK; x.fillRect(-140, py - 20, 40, 40); x.fillStyle = '#fff'; x.fillRect(-134, py - 14, 28, 28)
      if (lt > 0.4 + i * 0.25) { x.fillStyle = GREEN; x.fillRect(-130, py - 2, 10, 10); x.fillRect(-122, py + 4, 10, 10); x.fillRect(-114, py - 8, 10, 10); x.fillRect(-106, py - 16, 10, 10) }
      txt(x, r, -80, py + 2, { size: 28, align: 'left' })
    })
  })
}
/** a staircase of blocks, each labelled; the last one gets a flag */
function stairs(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const cols = [LAV, SKYB, MINT, GOLD]
  for (let i = 0; i < 4; i++) {
    const s = ease.outBack(prog(lt, 0.3 + i * 0.25, 0.6 + i * 0.25))
    if (s <= 0.01) continue
    const w = 90, h = 70 * (i + 1), px = -180 + i * 95
    x.fillStyle = INK; x.fillRect(px - 5, 150 - h * s - 5, w + 10, h * s + 10)
    x.fillStyle = cols[i]; x.fillRect(px, 150 - h * s, w, h * s)
  }
  if (lt > 1.4) drawBits(x, ['K.RRRR', 'K.RRRR', 'K.RRR.', 'K.....', 'K.....', 'K.....'], { K: INK, R: RED }, 145, 150 - 280 - 30, 9 * ease.outBack(prog(lt, 1.4, 1.7)))
  x.restore()
}
/** a framed certificate */
function certificate(x, cx, cy, k) {
  card(x, cx, cy, 320, 230, k, { bg: GOLD, rot: -0.03 }, () => {
    x.fillStyle = CREAM; x.fillRect(-140, -95, 280, 190)
    txt(x, 'CERTIFICATE', 0, -55, { size: 30, font: MONO, weight: 700 })
    txt(x, 'of doing', 0, -10, { size: 26, weight: 700, color: '#6b62a8' })
    txt(x, 'A LOT.', 0, 30, { size: 38 })
    x.fillStyle = RED; x.beginPath(); x.arc(100, 60, 22, 0, Math.PI * 2); x.fill()
  })
}
/** a mountain with a flag on top and a little path */
function mountain(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-210, 170); x.lineTo(0, -180); x.lineTo(210, 170); x.closePath(); x.fill()
  x.fillStyle = '#7a8bb0'; x.beginPath(); x.moveTo(-196, 164); x.lineTo(0, -166); x.lineTo(196, 164); x.closePath(); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.moveTo(-60, -66); x.lineTo(0, -166); x.lineTo(60, -66); x.lineTo(20, -86); x.lineTo(-10, -66); x.closePath(); x.fill()
  x.fillStyle = '#c9b48a'; for (let i = 0; i < 6; i++) x.fillRect(-120 + i * 40 + (i % 2) * 10, 130 - i * 46, 22, 12)
  drawBits(x, ['K.GGGG', 'K.GGGG', 'K.GGG.', 'K.....', 'K.....'], { K: INK, G: GOLD }, 18, -196, 9)
  x.restore()
}

const CAMEOS = [
  { sign: 'capricorn', cap: 'You hit the goal. | *Look at it first.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      trophy(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt < 1.3) label(x, 790, 660, 'NEXT GOAL…?', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      else label(x, 790, 660, 'NOT YET.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.35, 7, 180, 0.4)
    } },
  { sign: 'capricorn', cap: 'Someone said "great job." | *Just say thanks.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'great job!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      if (lt < 1.3) bubble(x, 760, 930, 'oh it was noth—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      else bubble(x, 760, 930, 'thank you.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 48, col: MINT, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'The list is done. | *Yes, all of it.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      checklist(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt, ['the report', 'the taxes', 'the other report', 'everything'])
      label(x, 790, 1150, 'NOTHING LEFT?!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'You built it slowly. | *That counts double.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      stairs(x, 800, 920, pop01(t, P.t0 + 0.1, 0.3, 2), lt)
      label(x, 790, 640, 'STEP BY STEP', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Frame the certificate. | *Not in a drawer.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const up = ease.outBack(prog(lt, 0.8, 1.3))
      certificate(x, 790, lerp(1060, 780, up), pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 1110, 360, 90, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - ease.inCubic(prog(lt, 0.9, 1.3))), { bg: WOOD, rot: 0 }, () => { x.fillStyle = INK; x.fillRect(-40, -8, 80, 16) })
      label(x, 790, 610, 'ON THE WALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Tell your mom. | *She\'s already bragging.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MOM', headCol: PINK, lines: [['so proud!!', PINK, pop01(t, P.t0 + 0.5, 0.25, 2)], ['told the street', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2)], ['and the mailman', MINT, pop01(t, P.t0 + 1.2, 0.25, 2)], ['and the dog', LAV, pop01(t, P.t0 + 1.5, 0.25, 2)]], size: 22 })
    } },
  { sign: 'capricorn', cap: 'Your chart agrees. | *You earned this.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 880, 170, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1110, 'EARNED IT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.25, 7, 200, 0.2)
    } },
  { sign: 'capricorn', cap: 'Close the laptop. | *Wear the party hat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const shut = ease.inOutCubic(prog(lt, 0.5, 0.9))
      laptop(x, 790, 1000, pop01(t, P.t0 + 0.2, 0.35, 2), () => { txt(x, shut > 0.5 ? 'OUT OF OFFICE' : '87 EMAILS', 0, 0, { size: 26, font: MONO, weight: 700, color: shut > 0.5 ? MINT : RED }) })
      const h = ease.outBounce ? ease.outBounce(prog(lt, 1.0, 1.4)) : ease.outCubic(prog(lt, 1.0, 1.4))
      if (lt > 0.95) drawBits(x, HAT, HAT_C, F.x, lerp(F.top - 260, F.top - 30, h), 11, { rot: -0.12 })
      confetti(x, t, 600, 840, P.t0 + 1.4, { n: 16, spread: 300, h: 500 })
    } },
  { sign: 'capricorn', cap: 'Look back down. | *Look how far.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: lt => lt > 0.8 ? [1, 1] : [1, 0], star: { x: -190, y: -40 }, hops: [0.9],
    front(x, t, lt, P) {
      mountain(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 760, 1150, 'YOU STARTED HERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 808, 720, P.t0 + 1.4, 6, 110, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0281', key: 'D', accent: ACC, solo: 'capricorn', ending: 'callback',
  title: 'Capricorn, let | yourself *be proud.*',
  cameos: CAMEOS,
  group: { cap: 'Proud looks | *good on you.*', mood: 'sparkle' },
  last: {
    text: 'Next goal? | *After cake.*',
    draw(x, t, lt) {
      const t0 = t - lt
      trophy(x, 400, 1080, pop01(t, t0 + 0.3, 0.4, 2), 26)
      drawBits(x, CAKE, CAKE_C, 700, 1120, 32 * pop01(t, t0 + 0.8, 0.4, 2.2))
      sparkles(x, t, 680, 1060, t0 + 1.1, 8, 170, 0.6)
      hearts(x, t, 560, 1000, t0 + 1.2, { n: 6, life: 2, spread: 400, cell: 7, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
