// r2a0491: star_advice, ADVICE SOLO, "Doing better than | you think, *Cap.*" (topic: Capricorn, you're doing better than
// you think) (~46 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine relatable Capricorn truths, each with a warm reframe and one gag. Ending: callback.
//   0.0–3.6    "Doing better than | you think, *Cap.*"
//   3.6–37.8   didn't finish the list, you started it · slow week, seeds grow quietly (a sprout) · took a nap, that counts
//              · asked for help, that's strong · one mistake, the boss forgot by lunch · your friends brag about you
//              · comparing climbs, yours is your own · nervous about the match, they already like you · look how far you've come
//  37.8        "Steady climb. | *Real progress.*"
//  41.2        callback: "That slow week? | It *bloomed.*"  The sprout's pot comes back, flowering.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', GREEN = '#5fd068'
const ACC = '#ffd27a'
const S = 'capricorn', ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 62); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
/** a clay pot; grow 0…1 raises a sprout, bloom 0…1 opens a flower on top */
function pot(x, t, cx, cy, k, grow, bloom = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 30 + grow * 150
  if (grow > 0.01) {
    x.fillStyle = INK; x.fillRect(-10, -60 - h, 20, h + 4); x.fillStyle = GREEN; x.fillRect(-5, -58 - h, 10, h)
    const lf = clamp(grow * 1.5)
    for (const [s, yy] of [[-1, 0.45], [1, 0.7]]) {
      if (lf < yy) continue
      x.save(); x.translate(0, -60 - h * (1 - yy)); x.scale(s, 1)
      x.fillStyle = INK; x.fillRect(2, -22, 70, 34); x.fillStyle = GREEN; x.fillRect(6, -18, 62, 26); x.fillStyle = '#8af08f'; x.fillRect(10, -14, 24, 8)
      x.restore()
    }
    if (bloom > 0.01) {
      x.save(); x.translate(0, -66 - h); x.scale(bloom, bloom); x.rotate(t * 0.4)
      for (let i = 0; i < 6; i++) { x.save(); x.rotate(i * Math.PI / 3); x.fillStyle = INK; x.fillRect(-22, -78, 44, 60); x.fillStyle = PINK; x.fillRect(-17, -73, 34, 50); x.restore() }
      x.fillStyle = INK; x.fillRect(-28, -28, 56, 56); x.fillStyle = GOLD; x.fillRect(-22, -22, 44, 44)
      x.restore()
    }
  }
  x.fillStyle = INK; x.fillRect(-110, -70, 220, 30); x.fillRect(-90, -44, 180, 120)
  x.fillStyle = '#d0703a'; x.fillRect(-102, -64, 204, 20); x.fillStyle = '#b85a2a'; x.fillRect(-84, -40, 168, 110)
  x.fillStyle = '#5b2e1a'; x.fillRect(-96, -70, 192, 8)
  x.restore()
}
const BOX = ['KKKKKKKKKK', 'KCCCCCCCCK', 'KCCCTTCCCK', 'KCCCTTCCCK', 'KCCCCCCCCK', 'KKKKKKKKKK']
const BOX_C = { K: '#8a5a3a', C: '#c98f2a', T: CREAM }
const MOUNT = [
  '.......WW.......', '......WWWW......', '.....GGWWGG.....', '....GGGGGGGG....', '...GGGGgGGGGG...',
  '..GGGGGGGGgGGG..', '.GGgGGGGGGGGGGG.', 'GGGGGGGGGGGGGgGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7a86b8', g: '#5a6698' }
const FLAG = ['KRRR', 'KRRR', 'K...', 'K...', 'K...']
const FLAG_C = { K: INK, R: GOLD }

const CAMEOS = [
  // 1 · the list
  { sign: S, cap: 'Didn’t finish the list? | You *started* it.', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['TO DO', '✓ wake up', '✓ coffee', '✓ one email', '□ everything'], { w: 320, size: 34, rot: 0.04 })
      L(x, 790, 1120, 'PROGRESS', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 38)
    } },
  // 2 · the slow week
  { sign: S, cap: 'Slow week? | Seeds *grow quietly.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      pot(x, t, 790, 1020, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.5, 1.5)))
      sparkles(x, t, 790, 800, P.t0 + 1.5, 6, 140, 0.3)
      bubble(x, 800, 620, 'shh. | growing.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  // 3 · the nap
  { sign: S, cap: 'Took a nap? | That *counts too.*', mood: lt => lt < 1.3 ? 'sleepy' : 'sparkle', star: ST, hops: [1.35],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillRect(130, -24, 22, 48)
        x.fillStyle = DEEP; x.fillRect(-120, -54, 240, 108)
        const f = clamp((lt - 0.4) / 1.0)
        x.fillStyle = f < 0.5 ? RED : GREEN; x.fillRect(-110, -44, 220 * Math.max(0.12, f), 88)
        x.restore()
      }
      L(x, 790, 1060, 'RECHARGED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 40)
    } },
  // 4 · asking for help
  { sign: S, cap: 'Asked for help? | That’s *strong.*', mood: lt => lt < 1.1 ? 'squint' : 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        const lift = ease.outBack(prog(lt, 0.9, 1.4)) * 60
        drawBits(x, BOX, BOX_C, 790, 1000 - lift, 22 * k)
        signChar(x, t, 'taurus', 790, 790 - lift, 170 * k, { mood: lt > 1.2 ? 'happy' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      }
      bubble(x, 790, 600, 'got you.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  // 5 · the mistake
  { sign: S, cap: 'One mistake? | The boss *forgot by lunch.*', mood: lt => lt < 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), ['typo in', 'slide 4'], { w: 260, bg: CREAM, size: 38, rot: -0.05 })
      bubble(x, 790, 1020, 'what | typo?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
    } },
  // 6 · your friends
  { sign: S, cap: 'Your friends? | They brag *about you.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 960, 190 * k, { mood: 'sparkle', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.6] })
      bubble(x, 800, 690, 'that’s MY | friend!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bc' })
      hearts(x, t, 560, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  // 7 · comparing climbs
  { sign: S, cap: 'Comparing climbs? | Yours is *your own.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MOUNT, MOUNT_C, 790, 900, 22 * k)
      const p = ease.inOutCubic(prog(lt, 0.4, 1.6))
      if (k > 0.5) {
        drawBits(x, FLAG, FLAG_C, 790, 760, 14)
        signChar(x, t, S, lerp(650, 740, p), lerp(960, 860, p), 90, { mood: 'happy', seed: 17, glyph: false })
      }
      L(x, 790, 1110, 'YOUR PACE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 38)
    } },
  // 8 · the match
  { sign: S, cap: 'Nervous about the match? | They *already like you.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH', headCol: PINK, lines: [
        ['a capricorn?', LAV, pop01(t, P.t0 + 0.5, 0.2, 2)], ['love that', LAV, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['♡ ♡ ♡', PINK, pop01(t, P.t0 + 1.2, 0.25, 2.2)]] })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  // 9 · a year ago
  { sign: S, cap: 'Look back a year. | *Look how far.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', star: { x: -200, y: 40 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.0) * 5)
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(560 + i * 80, 1100 - (i + 1) * 70, 88, (i + 1) * 70 + 8); x.fillStyle = i === 4 ? GOLD : '#7a86b8'; x.fillRect(566 + i * 80, 1106 - (i + 1) * 70, 76, (i + 1) * 70 - 6) }
      L(x, 600, 1140, 'A YEAR AGO', pop01(t, P.t0 + 0.4, 0.3, 2.2), LAV, -0.03, 26)
      L(x, 880, 660, 'YOU, NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 34)
      sparkles(x, t, 880, 700, P.t0 + 1.35, 7, 140, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0491', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Doing better than | you think, *Cap.*',
  cameos: CAMEOS,
  group: { cap: 'Steady climb. | *Real progress.*', mood: 'sparkle' },
  last: {
    text: 'That slow week? | It *bloomed.*',
    draw(x, t, lt) {
      const t0 = t - lt
      pot(x, t, 540, 1260, pop01(t, t0 + 0.5, 0.35, 2) * 1.1, 1, ease.outBack(prog(lt, 1.1, 1.6)))
      sparkles(x, t, 540, 1020, t0 + 1.3, 8, 200, 0.4)
      hearts(x, t, 540, 1080, t0 + 1.5, { n: 6, life: 1.8, spread: 360, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
