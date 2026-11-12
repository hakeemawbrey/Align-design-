// r2a0218: star_advice, ADVICE SOLO, "Sagittarius, you can't fix | everyone." (~45 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the big-hearted helper who wants to fix every friend,
// each card a relatable truth plus a warm reframe and one cute visual gag.
//   0.0–3.6    "Sag, you can't fix | *everyone.*"
//   3.6–37.8   nine cards (3.8 s each):
//              flying out for every crisis, call instead · advice nobody asked for, wait for the question · pep talks for
//              everyone, keep one for you · can't fix their sad, sit with them · fixing everything at once, close the
//              toolbox · running on pure optimism, refuel · their lesson, their route · trust their wings · you light up rooms
//  37.8        "Big heart. | *Smaller to-do list.*"  Sagittarius comes back, big.
//  41.2        callback: "The toolbox? | *Packed for a trip.*"  The toolbox from card 5, now holding a ticket that says FOR ME.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'sagittarius'
const ST = { x: -190 }
const VIO = '#b98aff'

const TICKET = ['KKKKKKKKKKKK', 'KWWWWWWW.WWK', 'KWBBBBWW.WWK', 'KWWWWWWW.WWK', 'KWBBBWWW.WWK', 'KKKKKKKKKKKK']
const BENCH = ['WWWWWWWWWWWWWWWW', 'WWWWWWWWWWWWWWWW', '................', 'WWWWWWWWWWWWWWWW', '.B............B.', '.B............B.', '.B............B.']
const BIRD = ['..YYY...', '.YYKYY..', 'OYYYYYY.', '.YYYYYYY', '..YYYYY.', '...Y.Y..']
const WING_UP = ['W....', 'WW...', 'WWW..'], WING_DN = ['WWW..', 'WW...', 'W....']
const NEST = ['B.BBBBBB.B', 'BBBBBBBBBB', '.BBBBBBBB.']
const LAMP = ['..YYYYYY..', '.YYYYYYYY.', 'YYYYYYYYYY', '....KK....', '....KK....', '....KK....', '..KKKKKK..']

/** a red toolbox; open 0…1 lifts the lid; fn draws what sticks out of it */
function toolbox(x, cx, cy, k, open, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (fn && open > 0.05) fn(open)
  x.fillStyle = INK; x.fillRect(-150, -60, 300, 150); x.fillStyle = RED; x.fillRect(-142, -52, 284, 134)
  x.fillStyle = '#b02a3a'; x.fillRect(-142, 10, 284, 10)
  x.fillStyle = GREY; x.fillRect(-24, 0, 48, 30)
  x.save(); x.translate(-150, -60); x.rotate(-open * 0.9)
  x.fillStyle = INK; x.fillRect(0, -40, 300, 46); x.fillStyle = '#ff6b5a'; x.fillRect(8, -32, 284, 30)
  x.fillStyle = INK; x.fillRect(110, -72, 80, 34); x.fillStyle = '#140c30'; x.fillRect(122, -64, 56, 20)
  x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Flying out for every crisis? | *Call instead.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const swap = lt > 1.3
      if (!swap) for (let i = 0; i < 5; i++) drawBits(x, TICKET, { K: INK, W: CREAM, B: VIO }, 790 + Math.sin(i * 2.1) * 60, 1000 - i * 60, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2), { rot: Math.sin(i * 1.3) * 0.25 })
      else phone(x, 790, 860, pop01(t, P.t0 + 1.3, 0.3, 2.2), { head: 'CALLING…', headCol: MINT, size: 30, lines: [['hi! how are you?', MINT, 1]], w: 300, h: 360 })
      label(x, 790, 640, swap ? 'FLIGHTS: 0' : 'FLIGHTS: 5', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: swap ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Advice nobody asked for? | *Wait for the question.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const zip = lt > 1.2
      bubble(x, 760, 700, 'have you tried | moving to Peru?', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (zip ? 1 - prog(lt, 1.2, 1.4) : 1), { size: 36, tail: 'bl' })
      if (zip) {
        const k = pop01(t, P.t0 + 1.3, 0.3, 2.2)
        x.save(); x.translate(790, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-90, -20, 180, 40); x.fillStyle = GREY; for (let i = 0; i < 8; i++) x.fillRect(-84 + i * 22, -14, 12, 28); x.fillStyle = GOLD; x.fillRect(80, -26, 30, 52); x.restore()
      }
      label(x, 790, 1070, 'ADVICE: ON HOLD', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Pep talks for everyone? | *Keep one for you.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [-1, -1], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      const d = ease.outBack ? ease.outBack(prog(lt, 1.0, 1.3)) : prog(lt, 1.0, 1.3)
      ;['you got this!', 'so proud!', 'go, team!'].forEach((s, i) => label(x, 800, 660 + i * 110, s, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { size: 36, bg: [PINK, SKYB, GOLD][i], rot: (i - 1) * 0.05 }))
      if (lt > 1.0) { x.save(); x.translate(F.x, F.top - 10); x.rotate(-0.08); x.scale(d, d); x.fillStyle = INK; x.fillRect(-110, -34, 220, 68); x.fillStyle = '#fff1b0'; x.fillRect(-104, -28, 208, 56); txt(x, 'you too ♡', 0, 2, { size: 32 }); x.restore() }
    } },
  { sign: S, cap: 'Can’t fix their sad? | *Just sit with them.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -110, y: 10, s: 250 },
    back(x, t, lt, P) { drawBits(x, BENCH, { W: WOOD, B: BROWN }, 590, 1060, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 720, 900, 220 * k, { mood: lt > 1.6 ? 'happy' : 'neutral', look: [-1, 1], seed: 23, glyph: false, tears: 2 })
      label(x, 590, 640, 'FIXING: 0 · SITTING: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 600, 850, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Fixing everything at once? | *Close the toolbox.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = 1 - ease.inOutCubic(prog(lt, 1.1, 1.5))
      toolbox(x, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), open, o => {
        const TOOLS = [['their rent', SKYB], ['his ex', PINK], ['her job', MINT], ['the weather', GOLD]]
        TOOLS.forEach(([s, c], i) => { x.save(); x.translate(-90 + (i % 2) * 180, -110 - Math.floor(i / 2) * 80 - (1 - o) * -60); x.rotate((i - 1.5) * 0.12); x.fillStyle = INK; x.fillRect(-90, -24, 180, 48); x.fillStyle = c; x.fillRect(-84, -18, 168, 36); txt(x, s, 0, 1, { size: 24 }); x.restore() })
      })
      label(x, 790, 1130, 'TOOLBOX: CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Running on pure optimism? | *Refuel first.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lvl = lerp(0.06, 1, ease.inOutCubic(prog(lt, 0.9, 1.9)))
      bar(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lvl, 'OPTIMISM TANK', { col: lvl < 0.3 ? RED : lvl < 0.7 ? ORANGE : MINT, w: 320 })
      label(x, 790, 1000, 'FUEL: NAP + SNACK', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their lesson to learn? | *Let them learn it.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 340, 340, k, { bg: CREAM, rot: 0.03 }, () => {
        x.strokeStyle = '#6b62a8'; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath()
        const p = prog(lt, 0.4, 1.6)
        for (let i = 0; i <= 40 * p; i++) { const u = i / 40, px = -130 + u * 250 + Math.sin(u * 14) * 40 * (1 - u), py = 120 - u * 230 + Math.cos(u * 9) * 40; i ? x.lineTo(px, py) : x.moveTo(px, py) }
        x.stroke(); x.setLineDash([])
        x.fillStyle = RED; x.fillRect(110, -140, 8, 60); x.fillStyle = GOLD; x.fillRect(118, -140, 40, 26)
      })
      label(x, 790, 1100, 'THEIR ROUTE. THEIR PACE.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hard to watch them struggle? | *Trust their wings.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, -1], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, NEST, { B: BROWN }, 790, 1060, 22 * k)
      const fly = ease.inOutCubic(prog(lt, 0.9, 2.2)), wob = lt < 0.9 ? Math.sin(t * 18) * 6 : 0
      const bx = lerp(790, 860, fly) + wob, by = lerp(1010, 640, fly) + Math.sin(t * 6) * 10 * fly
      drawBits(x, BIRD, { Y: SUN, K: INK, O: ORANGE }, bx, by, 14 * k)
      drawBits(x, Math.floor(t * 8) % 2 ? WING_UP : WING_DN, { W: CREAM }, bx - 10, by - 6, 14 * k)
      label(x, 600, 700, 'FLYING SOLO', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You light up rooms. | *That’s already plenty.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.7],
    back(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.5, 1.0))
      if (g > 0) { x.save(); const gr = x.createRadialGradient(370, 860, 20, 370, 860, 420); gr.addColorStop(0, `rgba(255,241,176,${0.45 * g})`); gr.addColorStop(1, 'rgba(255,241,176,0)'); x.fillStyle = gr; x.fillRect(110, 470, 860, 760); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'ENOUGH: ALWAYS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'NO FIXING NEEDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.0, 8, 220, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0218', key: 'C', accent: VIO, solo: S, ending: 'callback',
  title: 'Sag, you can’t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Smaller to-do list.*', mood: 'sparkle' },
  last: {
    text: 'The toolbox? | *Packed for a trip.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.4, 2)
      if (k > 0.01) signChar(x, t, S, 330, 1050, 240 * k, { mood: 'sparkle', look: [1, 0], seed: 71, hops: [t0 + 1.5] })
      toolbox(x, 720, 1130, pop01(t, t0 + 0.5, 0.4, 2), ease.outCubic(prog(lt, 0.9, 1.3)), o => {
        x.save(); x.translate(0, -60 - 60 * o); x.rotate(-0.1); x.fillStyle = INK; x.fillRect(-110, -44, 220, 88); x.fillStyle = CREAM; x.fillRect(-104, -38, 208, 76); x.fillStyle = VIO; x.fillRect(-104, -38, 40, 76); txt(x, 'FOR ME', 22, 2, { size: 30, font: MONO, weight: 700 }); x.restore()
      })
      sparkles(x, t, 720, 980, t0 + 1.4, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
