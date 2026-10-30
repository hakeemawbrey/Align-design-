// guidesag1 (20 s vertical Align ad, Star Talk "Your Star Guide", ♐ note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00  "Sagittarius, your star has a note."  An airport departures board: FLIGHT SA01 · ANYWHERE · BOARDING. The ♐ guide,
//         lantern lit, a huge backpack on, is mid-tiptoe toward the gate while the pale star on the bench asks "so… what are we?"
//   2.8   ♐ YOUR STAR: "you get restless when it gets serious."  The board flaps: LAST CALL. Sag freezes, looks back.
//         Chip: mutable fire, ruled by Jupiter.
//   7.2   "staying can be the adventure."  Sag slowly unpacks: a passport, a compass, a rolled-up map. The pack sags flat.
//         The board flaps: SA01 · RIGHT HERE · STAYING. Sag sits; the other star hands it a mug.
//  10.75  card flip · "Stay for the *good part*."  Same board as frame 0, same two stars, now side by side.
// One canvas (sky + board + bench + two stars), DOM type above it. Pure f(t).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { guideFilm, GOLD, BONE, INK, MONO } from './guidefilm.js'

const SAG = signStar('sagittarius'), COL = SAG.color, ACC = '#c9a0ff', PAL = '#ffb3c8'
const T = {
  hookOut: [2.5, 2.8], askOut: [2.45, 2.75], open: 2.8, l1: 3.0, last1: 4.6, fact: 4.2, freeze: 5.4, look: 5.9,
  l2: 7.2, items: [7.9, 8.5, 9.1], flat: 9.5, staying: 9.6, sit: [9.8, 10.35], mug: 10.4, close: 10.6,
  cut: 10.75, last: 10.82, lastLand: 11.25, sip: 12.8, out: [15.15, 15.5],
}
const LINES = [
  { t: T.l1, text: 'you get restless when it gets *serious.*' },
  { t: T.l2, text: 'staying can be the *adventure.*' },
]
const BENCH = { x: 360, y: 1250 }
const PX = 290, PY = 1150
const K_out = t => 1 - ease.inCubic(prog(t, ...T.out))

const PACK = [
  '...KKKKKK...',
  '..KPPPPPPK..',
  '.KPPPPPPPPK.',
  'KPPLPPPPPPPK',
  'KPPPPPPPPPPK',
  'KPSSSSSSSSPK',
  'KPSBBBBBBSPK',
  'KPSBBBBBBSPK',
  'KPSSSSSSSSPK',
  'KPPPPPPPPPPK',
  'KPPPPPPPPPPK',
  'KPPPPPPPPPPK',
  '.KPPPPPPPPK.',
  '..KKKKKKKK..',
]
const PACK_C = { K: '#3a2a1a', P: '#d07a3a', L: '#f0a868', S: '#a85a2a', B: '#8a4a20' }
const ITEMS = [
  { name: 'PASSPORT', bm: ['NNNNNN', 'NGGGGN', 'NGNNGN', 'NGGGGN', 'NNNNNN', 'NNNNNN', 'NNNNNN'], c: { N: '#2a3a8a', G: GOLD } },
  { name: 'COMPASS', bm: ['.KKKK.', 'KWWRWK', 'KWWRWK', 'KWWWWK', 'KWWWWK', '.KKKK.'], c: { K: '#c99a3a', W: '#f5eedf', R: '#e23d4f' } },
  { name: 'MAP', bm: ['MMMMMMMM', 'MNMMNMMM', 'MMMMMNMM', 'MNMMMMNM', 'MMMMMMMM'], c: { M: '#e8d8a8', N: '#5fa06a' } },
]

function board(x, t) {
  const bx = 140, by = 570, bw = 800, bh = 260
  x.fillStyle = INK; x.fillRect(bx - 10, by - 10, bw + 20, bh + 20)
  x.fillStyle = '#0d0a1e'; x.fillRect(bx, by, bw, bh)
  x.fillStyle = '#2a2050'; x.fillRect(bx, by, bw, 50)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.fillText('DEPARTURES', bx + 24, by + 26)
  x.fillStyle = 'rgba(239,230,214,0.55)'; x.font = `700 22px ${MONO}`
  x.fillText('FLIGHT', bx + 24, by + 78); x.fillText('TO', bx + 200, by + 78); x.fillText('STATUS', bx + 530, by + 78)
  const staying = t > T.staying
  const dest = staying ? 'RIGHT HERE' : 'ANYWHERE'
  const status = staying ? 'STAYING' : t > T.last1 ? 'LAST CALL' : 'BOARDING'
  const flip = (t0) => t > t0 && t < t0 + 0.35
  const row = (y, cols, hl) => {
    for (const [cx, txt, col] of cols) {
      for (let i = 0; i < txt.length; i++) {
        const fx = cx + i * 30
        x.fillStyle = '#1e1838'; x.fillRect(fx, y - 22, 26, 44)
        x.fillStyle = 'rgba(0,0,0,0.6)'; x.fillRect(fx, y - 1, 26, 2)
        const ch = (hl && (flip(T.last1) || flip(T.staying))) ? 'ABCDEFGHIJKLMNOPRSTUVWY'[Math.floor(t * 40 + i * 7) % 23] : txt[i]
        x.fillStyle = col; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillText(ch, fx + 13, y + 1)
      }
    }
  }
  const amber = '#ffcf5a'
  const stCol = staying ? '#7dffb8' : t > T.last1 ? '#ff6a6a' : amber
  const blink = !staying && t > T.last1 && Math.sin(t * 9) < -0.2
  row(by + 130, [[bx + 24, 'SA01', amber], [bx + 200, dest, amber], [bx + 530, blink ? '         '.slice(0, status.length) : status, stCol]], true)
  row(by + 200, [[bx + 24, 'TA02', 'rgba(255,207,90,0.4)'], [bx + 200, 'SOMEWHERE', 'rgba(255,207,90,0.4)'], [bx + 530, 'DELAYED', 'rgba(255,207,90,0.4)']], false)
}

function sagX(t) {
  if (t < T.freeze) return lerp(700, 760, prog(t, 0, T.freeze))          // tiptoeing toward the gate
  if (t < T.sit[0]) return 760
  return lerp(760, 560, ease.inOutCubic(prog(t, ...T.sit)))
}
function sagY(t) { return t < T.sit[0] ? 1130 : lerp(1130, 1150, prog(t, ...T.sit)) }
const fullness = t => 1 - 0.55 * ease.outCubic(prog(t, T.items[0], T.flat))

function sagMood(t) {
  if (t < T.freeze) return { mood: 'squint', look: [1, 0], blink: false }
  if (t < T.look) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.flat) return { mood: 'neutral', look: [0.5, 0.6] }
  return { mood: 'happy' }
}

const F = guideFilm({
  duration: 20, speaker: '♐ YOUR STAR', color: COL, accent: ACC, glyph: SAG.glyph,
  chip: { sign: 'SAGITTARIUS', glyph: '♐', n: 1, of: 3 },
  hook: { text: '*Sagittarius,* | your star | has a note.', out: T.hookOut, size: 82, top: 210 },
  lines: LINES, open: T.open, close: T.close,
  fact: { text: 'SAGITTARIUS: MUTABLE FIRE|RULED BY JUPITER', at: T.fact, dur: T.l2 - T.fact - 0.2, x: 540, y: 1356 },
  heads: [{ text: 'Stay for the | *good part.*', at: T.last, out: T.out, top: 196, size: 112, accentSize: 170, accentColor: ACC, late: 2, lateAt: T.lastLand }],
  guide(t) {
    const tip = t < T.freeze ? 0.05 * Math.abs(Math.sin(t * 6)) : 0
    const jolt = t > T.freeze && t < T.freeze + 0.4 ? -0.1 * Math.sin(Math.PI * prog(t, T.freeze, T.freeze + 0.4)) : 0
    return { x: sagX(t), y: sagY(t), size: 290, ...sagMood(t), squash: tip + jolt, pop: K_out(t), side: -1 }
  },
  drawBack(x, t, K) {
    const ko = K_out(t)
    x.save(); x.globalAlpha = ko
    board(x, t)
    // the floor + the bench
    x.fillStyle = 'rgba(239,230,214,0.18)'; x.fillRect(60, 1300, 960, 6)
    x.fillStyle = INK; x.fillRect(BENCH.x - 250, BENCH.y - 10, 500, 34); x.fillRect(BENCH.x - 230, BENCH.y + 20, 20, 30); x.fillRect(BENCH.x + 210, BENCH.y + 20, 20, 30)
    x.fillStyle = '#6a7090'; x.fillRect(BENCH.x - 244, BENCH.y - 4, 488, 22)
    // a GATE sign with an arrow, right edge
    x.fillStyle = INK; x.fillRect(900, 860, 150, 64); x.fillStyle = '#ffcf5a'; x.fillRect(906, 866, 138, 52)
    x.fillStyle = INK; x.font = `800 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GATE →', 975, 893)
    // the backpack, behind Sag (it slumps as it empties)
    const f = fullness(t)
    if (ko > 0.01) K.drawBits(PACK, PACK_C, sagX(t) + 110, sagY(t) - 10 + (1 - f) * 70, 15, { sx: 1 })
    x.restore()
  },
  drawFront(x, t, K) {
    const ko = K_out(t)
    if (ko <= 0.01) return
    // the other star on the bench
    const pm = t < T.askOut[0] ? { mood: 'sparkle', look: [1, 0] } : t < T.l2 ? { mood: 'neutral', look: [1, 0] } : t < T.sit[1] ? { mood: 'sparkle', look: [1, 0] } : { mood: 'happy', look: [1, 0] }
    K.star({ x: PX, y: PY, size: 210, t, color: PAL, glyph: null, ...pm, seed: 9, hops: [], pop: ko })
    const ka = 1 - ease.inCubic(prog(t, ...T.askOut))
    if (ka > 0.01) K.bubble(PX + 60, PY - 180, 'so… what are we?', { size: 42, k: ka * ko, color: '#8a2a5a' })
    // the unpacked things, set on the floor one by one
    ITEMS.forEach((it, i) => {
      const t0 = T.items[i]
      if (t < t0) return
      const p = prog(t, t0, t0 + 0.5)
      const sx = 860, sy = 1060, ex = 780 + i * 100, ey = 1272
      const ix = lerp(sx, ex, p), iy = lerp(sy, ey, p) - Math.sin(Math.PI * p) * 160
      K.drawBits(it.bm, it.c, ix, iy, 9 * ko, { rot: (1 - p) * 2 })
      K.sparkles(t, ex, ey, t0 + 0.5, 6, 60, i, [GOLD, BONE, ACC])
    })
    // the mug, handed over
    if (t > T.mug) {
      const p = ease.outCubic(prog(t, T.mug, T.mug + 0.4))
      const mx = lerp(PX + 90, 452, p), my = 1150
      K.drawBits(['.WWWW..', '.WCCW..', '.WWWWWW', '.WWWW.W', '.WWWWWW', '..WW...'], { W: '#f5eedf', C: '#7a4a2a' }, mx, my, 9 * ko)
      x.save(); x.fillStyle = 'rgba(239,230,214,0.6)'
      for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i * 0.33) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * p * ko; x.fillRect(mx - 18 + i * 14, my - 40 - ph * 50, 7, 7) }
      x.restore()
    }
  },
  cues: [
    ['tick', 0.3, 0.02], ['tick', 0.75, 0.02], ['tick', 1.2, 0.02], ['tick', 1.65, 0.02], ['pop', 0.6, 880, 0.025, -0.4],
    ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.last1 + i * 0.04).toFixed(2), 0.035]), ['bell', T.last1 + 0.4, 987.77, 0.03, 1.0, 0.3],
    ['boom', T.freeze, 0.08], ['tick', T.freeze, 0.05], ['pop', T.look, 739.99, 0.03, 0],
    ...T.items.flatMap((v, i) => [['whoosh', v, 0.3, 0.025], ['pop', v + 0.5, [880, 987.77, 1174.66][i], 0.04, 0.4]]),
    ['tick', T.flat, 0.04], ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.staying + i * 0.04).toFixed(2), 0.035]), ['pluck', T.staying + 0.4, 1567.98, 0.04, 0.6, 0],
    ['whoosh', T.sit[0], 0.4, 0.03], ['pop', T.mug + 0.3, 1318.51, 0.035, -0.2],
    ['whoosh', T.out[0], 0.35, 0.03],
  ],
  cuts: [{ t: T.cut, kind: 'flip' }],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
