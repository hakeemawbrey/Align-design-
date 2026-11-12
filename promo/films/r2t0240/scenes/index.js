// r2t0240: star_talk, SOLO, "Being a Virgo | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): everyday Virgo life, each card the most extreme version.
//   0.0–3.6    "Being a Virgo | *be like.*"
//   3.6–37.8   nine cards (3.8 s each): spice rack alphabetical, then by colour · group project, did everyone's part · spotted
//              a typo on a billboard from the car · a backup for the backup charger · picture frame one degree off, can't
//              sleep · "I'm fine", reorganized the fridge twice · cleaned the hotel room before checkout · silently fixed your
//              whole slideshow · love language: untangling your necklace
//  37.8        "Tired. | *But aligned.*"  Virgo comes back, big.
//  41.2        callback: "Still thinking | about *that frame.*"  the crooked frame is back, and so is Virgo's squint.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, sheet, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const S = 'virgo', ACC = '#7dffb0'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }
const JAR = ['.KKKK.', 'KWWWWK', 'KCCCCK', 'KCCCCK', 'KCCCCK', '.KKKK.']
const PLUG = ['..K..K..', '..K..K..', 'WWWWWWWW', 'WWWWWWWW', '.WWWWWW.', '..WWWW..', '...WW...']
const KNOT = ['....GG....GG', '...G..G..G..', '..G....GG...', '.G....G..G..', 'G....G....G.', '.G..G......G', '..GG......G.']

/** a framed picture tilted by rot */
function frame(x, cx, cy, k, rot) {
  card(x, cx, cy, 230, 170, k, { bg: GOLD, rot }, () => {
    x.fillStyle = '#2a2350'; x.fillRect(-95, -65, 190, 130)
    x.fillStyle = SUN; x.beginPath(); x.arc(40, -20, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = GREEN; x.beginPath(); x.moveTo(-95, 65); x.lineTo(-30, -10); x.lineTo(30, 65); x.fill()
  })
  if (k > 0.5) { x.save(); x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(cx - 60, cy - 90); x.lineTo(cx, cy - 140); x.lineTo(cx + 60, cy - 90); x.stroke(); x.fillStyle = INK; x.fillRect(cx - 6, cy - 146, 12, 12); x.restore() }
}

const CAMEOS = [
  { sign: S, cap: 'Spice rack: alphabetical. | *Then by colour.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [RED, SUN, GREEN, ORANGE, '#8a4a2e', PINK, SKYB, LAV], SORT = [0, 3, 1, 2, 6, 7, 5, 4]
      const m = ease.inOutCubic(prog(lt, 1.0, 1.6))
      for (let i = 0; i < 8; i++) {
        const from = i, to = SORT.indexOf(i), p = lerp(from, to, m)
        drawBits(x, JAR, { K: INK, W: CREAM, C: COLS[i] }, 660 + (p % 4) * 86, 860 + Math.floor(i / 4) * 0 + (i < 4 ? -70 : 80), 12 * pop01(t, P.t0 + 0.15 + i * 0.06, 0.3, 2))
      }
      label(x, 790, 1100, lt > 1.6 ? 'SORT: BY COLOUR' : 'SORT: A → Z', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Group project? | *Did everyone’s part.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const N = ['SAM', 'ALEX', 'JO', 'ME']
      N.forEach((n, i) => sheet(x, 700 + (i % 2) * 180, 760 + Math.floor(i / 2) * 230, 160, 200, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), n, { rot: i % 2 ? 0.05 : -0.04, size: 24 }, () => { if (lt > 0.9 + i * 0.15) txt(x, '✓ V', 0, 30, { size: 44, color: GREEN }) }))
      label(x, 790, 1130, 'GRADE: A (FOR ALL 4)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Typo on a billboard. | *Spotted from the car.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 760, 340, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffffff', rot: 0 }, () => { txt(x, 'GRAND', 0, -32, { size: 48 }); txt(x, 'OPEING!', 0, 30, { size: 48, color: RED }) })
      x.fillStyle = INK; x.fillRect(770, 850, 40, 260)
      const r = prog(lt, 0.9, 1.3)
      if (r > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.beginPath(); x.ellipse(830, 790, 130, 50, -0.05, 0, Math.PI * 2 * r); x.stroke(); x.restore() }
      bubble(x, 400, 620, 'OPENING.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 44, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Has a backup | *for the backup charger.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2)
        drawBits(x, PLUG, { K: INK, W: CREAM }, 680 + i * 110, 900, 14 * k)
        label(x, 680 + i * 110, 1030, ['MAIN', 'BACKUP', 'BACKUP²'][i], k, { size: 22, bg: [MINT, GOLD, PINK][i], rot: i % 2 ? 0.05 : -0.05, ...LBL })
      }
      label(x, 790, 680, 'BATTERY: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GREEN, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Picture frame one degree off. | *Can’t sleep.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lerp(0.08, 0, ease.outBack(prog(lt, 1.4, 1.7))))
      label(x, 790, 1060, lt > 1.6 ? 'LEVEL. FINALLY.' : '3:12 A.M.', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: lt > 1.6 ? MINT : LAV, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: '“I’m fine.” | *Reorganized the fridge twice.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 420, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8f4ff', rot: 0 }, () => {
        x.fillStyle = GREY; for (let s = 0; s < 3; s++) x.fillRect(-120, -100 + s * 110, 240, 8)
        const C = [[RED, SUN, GREEN], [PINK, ORANGE, LAV], [SKYB, MINT, GOLD]]
        for (let s = 0; s < 3; s++) for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.fillRect(-96 + i * 70, -170 + s * 110, 50, 66); x.fillStyle = C[s][i]; x.fillRect(-92 + i * 70, -166 + s * 110, 42, 58) }
      })
      label(x, 790, 1120, 'REORG #2 · 11 P.M.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Cleaned the hotel room. | *Before checkout.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 800, 170, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: MINT, rot: 0.06 }, () => {
        x.fillStyle = INK; x.beginPath(); x.arc(0, -100, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, -100, 22, 0, Math.PI * 2); x.fill()
        txt(x, 'ROOM', 0, -10, { size: 30, font: MONO, weight: 700 }); txt(x, 'ALREADY', 0, 32, { size: 26, font: MONO, weight: 700 }); txt(x, 'CLEANED', 0, 70, { size: 26, font: MONO, weight: 700 })
      })
      bubble(x, 790, 1060, 'towels: folded | into swans', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 170, 0.6, [BONE, MINT, SKYB])
    } },
  { sign: S, cap: 'Silently fixed | *your whole slideshow.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = ease.outBack(prog(lt, 1.0, 1.4))
      card(x, 790, 860, 340, 250, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffffff', rot: 0.02 }, () => {
        txt(x, lt > 1.2 ? 'Q3 Review' : 'q3 reveiw!!', lerp(-30, 0, m), lerp(-80, -82, m), { size: 34, color: lt > 1.2 ? INK : RED })
        const B = [[-130, -10, 20, 30], [-30, 20, -20, 30], [70, -30, 10, 30]]
        B.forEach(([bx, by, dy], i) => { x.fillStyle = [PINK, MINT, SKYB][i]; x.fillRect(lerp(bx + dy, -140 + i * 100, m), lerp(by, 0, m), 80, 80) })
      })
      label(x, 790, 1060, 'ALIGNED: ALL OF IT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Love language? | *Untangling your necklace.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), u = ease.inOutCubic(prog(lt, 0.6, 1.5))
      if (u < 1) drawBits(x, KNOT, { G: GOLD }, 790, 860, 18 * k, { alpha: 1 - u })
      if (u > 0) { x.save(); x.globalAlpha = u; x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(790, 780, 140, 0.2, Math.PI - 0.2); x.stroke(); x.strokeStyle = GOLD; x.lineWidth = 6; x.stroke(); drawBits(x, ['.G.', 'GWG', '.G.'], { G: PINK, W: '#ffffff' }, 790, 925, 14); x.restore() }
      hearts(x, t, 790, 960, P.t0 + 1.6, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0240', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Being a Virgo | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Tired. | *But aligned.*', mood: 'sleepy' },
  last: {
    text: 'Still thinking | about *that frame.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 360, 1060, 300 * k, { mood: 'squint', look: [1, -1], seed: 62 })
      frame(x, 740, 980, 1.2 * pop01(t, t0 + 0.7, 0.35, 2), 0.05 + 0.02 * Math.sin(t * 2))
      label(x, 740, 1200, 'IT MOVED. SOMEHOW.', pop01(t, t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, ...LBL })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
