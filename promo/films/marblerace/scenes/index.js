// marblerace: "12 signs. 1 marble race." The twelve Star Talk stars race down a tall marble run (deterministic physics,
// race.js), the camera rides the lead pack, each sign reacts in character, then a podium. Social cut only (full frame).

//   ~5–15     Aries leads ("GO GO GO", "Lapping you all.")           15.5 Scorpio slides past, quietly
//   ~18       the fork: Aries takes the "shortcut" (the long lane, alone)
//   27.8      Scorpio wins · 30.1 Libra · 30.5 Sagittarius             31.0 "Meanwhile…" Cancer, way back up the track
//   37.8      Cancer finally lands (last, checked on everyone)         38.6 podium
import { prog, lerp, ease, clamp, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { bubble, label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SIGN_IDS } from '../../signs3kit.js'
import { simulate, R, FPS, GATE, FINISH_Y } from './race.js'

export const HOOK = '12 signs. 1 race. | Who wins?'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6

const SIM = simulate({ seed: 4, ids: SIGN_IDS, drag: { taurus: 0.35, pisces: 0.25 }, kick: { aries: 300 } })
const N = SIM.n, NF = SIM.frames.length / (N * 2)
const SIGN = Object.fromEntries(SIGNS.map(s => [s.id, s]))
const fi = t => Math.max(0, Math.min(NF - 1, t * FPS))
function pos(t, i) {          // interpolated world position
  const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1), u = f - a, A = (a * N + i) * 2, B = (b * N + i) * 2
  return [lerp(SIM.frames[A], SIM.frames[B], u), lerp(SIM.frames[A + 1], SIM.frames[B + 1], u)]
}
const ID = id => SIGN_IDS.indexOf(id)
const FIN = SIM.finishT, ORDER = SIM.order
const LAST = ORDER[ORDER.length - 1], T_LAST = FIN[LAST]
export const T = { gate: GATE, win: FIN[ORDER[0]], meanwhile: r2(Math.max(FIN[ORDER[2]] + 0.5, T_LAST - 7)), last: T_LAST, podium: r2(T_LAST + 0.8) }
function r2(v) { return Math.round(v * 100) / 100 }
export const DURATION = r2(T.podium + 6.4)
export const STORY_END = DURATION

// ── camera (world y at the top of the frame), precomputed and smoothed
const CAM = (() => {
  const out = new Float32Array(NF)
  const target = t => {
    if (t < GATE + 0.2) return -330
    if (t < T.win + 0.3) {           // frame the lead group: the leader stays on screen, the next few fill the frame
      const ys = []; for (let i = 0; i < N; i++) ys.push(Math.min(pos(t, i)[1], FINISH_Y + 60)); ys.sort((a, b) => b - a)
      const pack = (ys[1] + ys[2] + ys[3] + ys[4]) / 4
      return Math.max(ys[0] - 1500, Math.min(pack - 950, ys[0] - 700))
    }
    if (t < T.meanwhile) return FINISH_Y - 980
    return Math.min(pos(t, ID(LAST))[1], FINISH_Y + 60) - 1000
  }
  let c = -330
  for (let f = 0; f < NF; f++) {
    const t = f / FPS, tg = target(t)
    if (Math.abs(t - T.meanwhile) < 0.5 / FPS) c = tg             // hard cut to "meanwhile…"
    else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / (t < GATE + 1.5 ? 0.5 : 0.22)))
    out[f] = c
  }
  return out
})()
const camAt = t => { const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return lerp(CAM[a], CAM[b], f - a) }

// ── reactions: [t0, seconds, sign, text, opts]
const SAY = [
  [GATE + 0.15, 1.8, 'aries', 'GO GO GO!!'],
  [5.0, 2.2, 'taurus', 'is there a | snack stop?'],
  [7.4, 2.2, 'leo', 'is the camera | on me?'],
  [10.2, 2.3, 'aries', 'Lapping | you all.'],
  [14.2, 2.4, 'capricorn', 'excuse me. | business.'],
  [17.4, 2.4, 'libra', 'left? right? | ...right.'],
  [19.4, 2.0, 'virgo', 'optimal | line.'],
  [21.4, 2.4, 'pisces', "it's all so | beautiful"],
  [23.2, 2.2, 'aries', "this isn't | over!!"],
  [24.6, 1.8, 'sagittarius', 'WHEEEEE'],
  [T.win + 0.15, 2.5, 'capricorn', 'slow. steady. | CEO.'],
  [30.0, 2.3, 'cancer', 'is everyone | okay??'],
  [33.7, 2.3, 'scorpio', 'I let | them win.'],
  [T.meanwhile + 0.9, 2.6, 'taurus', 'I stopped | for snacks.'],
  [T.meanwhile + 4.0, 2.4, 'taurus', 'still | counts.'],
]
const WIN_LINE = { capricorn: 'Slow. Steady. CEO.', scorpio: 'Nobody saw it coming.' }
const LAST_LINE = { taurus: 'Stopped for snacks. Worth it.', cancer: 'Checked on everyone, though.' }
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th')

function mood(id, t) {
  const p = ORDER.indexOf(id), fin = FIN[id]
  if (fin !== null && t > fin) return p === 0 ? 'heart' : p < 3 ? 'happy' : 'wink'
  if (t < GATE) return id === 'aries' ? 'squint' : id === 'libra' ? 'neutral' : 'happy'
  if (id === 'capricorn') return 'squint'
  if (id === 'aries') return t > 18 ? 'wide' : 'squint'
  if (id === 'cancer') return 'wide'
  if (id === 'taurus') return 'sleepy'
  return 'happy'
}

async function build(stage) {
  try { await Promise.all(["800 34px Inter", "800 30px Inter", "800 64px Inter", "700 26px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) {}
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const { S, P, SHELF } = SIM.course

  function track(cam, t) {
    // finish band (checkered) + label
    const fy = FINISH_Y - cam
    if (fy > -60 && fy < 1980) {
      for (let i = 0; i < 18; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(97 + i * 49, fy - 24 + j * 24, 49, 24) }
      label(x, 540, fy - 70, 'FINISH', 1, { size: 34, bg: GOLD, rot: -0.03 })
    }
    // section signs painted on the course
    for (const [y, txt] of [[3300, 'PLINKO'], [5000, 'THE FORK'], [8100, 'PLINKO 2']]) { const sy = y - cam; if (sy > -60 && sy < 1980) label(x, 540, sy, txt, 1, { size: 26, bg: PINK, rot: 0.02 }) }
    // rails
    x.lineCap = 'round'
    const rail = (s, col) => { const [x1, y1, x2, y2, th] = s; x.lineWidth = th + 10; x.strokeStyle = INK; x.beginPath(); x.moveTo(x1, y1 - cam); x.lineTo(x2, y2 - cam); x.stroke(); x.lineWidth = th; x.strokeStyle = col; x.stroke() }
    for (const s of S) { if (Math.max(s[1], s[3]) - cam < -40 || Math.min(s[1], s[3]) - cam > 1960) continue; rail(s, BONE) }
    if (t < GATE + 0.25) { x.save(); x.globalAlpha = clamp(1 - (t - GATE) / 0.25); rail(SHELF, GOLD); x.restore() }
    // pegs: little gold studs
    for (const [px, py, pr] of P) { const sy = py - cam; if (sy < -30 || sy > 1950) continue; x.fillStyle = INK; x.fillRect(px - pr - 4, sy - pr - 4, 2 * pr + 8, 2 * pr + 8); x.fillStyle = GOLD; x.fillRect(px - pr, sy - pr, 2 * pr, 2 * pr); x.fillStyle = '#fff3c4'; x.fillRect(px - pr + 3, sy - pr + 3, 5, 5) }
  }

  function stars(cam, t) {
    const order = SIGN_IDS.map((id, i) => [id, i, pos(t, i)]).sort((a, b) => a[2][1] - b[2][1])
    for (const [id, i, [wx, wy]] of order) {
      const sy = wy - cam; if (sy < -80 || sy > 2000) continue
      const s = SIGN[id], fin = FIN[id]
      const hops = fin !== null && t > fin ? [fin + 0.3, fin + 1.0, fin + 1.7] : null
      const bounce = t > GATE && (fin === null || t < fin) ? Math.sin(t * 9 + i) * 0.04 : 0
      drawStarChar(x, wx, sy - 4, 92, t, { color: s.color, glyph: s.glyph, mood: mood(id, t), seed: i + 2, hops, squash: bounce, look: [Math.sign(Math.sin(t * 0.7 + i)) * 0.6, 0.6] })
      if (id === 'pisces' && t > GATE) tears(wx, sy - 4, t)
    }
  }
  function tears(cx, cy, t) {
    for (const d of [-1, 1]) for (let q = 0; q < 4; q++) {
      const ph = ((t * 1.4 + q / 4) % 1), px = cx + d * (12 + 22 * ph), py = cy - 6 + 30 * ph * ph
      x.fillStyle = INK; x.fillRect(px - 4, py - 4, 9, 11); x.fillStyle = '#8fe3ff'; x.fillRect(px - 2, py - 2, 5, 7)
    }
  }
  function says(cam, t) {
    for (const [t0, d, id, text] of SAY) {
      if (t < t0 || t > t0 + d) continue
      const [wx, wy] = pos(t, ID(id)), sy = wy - cam
      if (sy < 520 || sy > 1560) continue
      const k = pop01(t, t0, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - 0.25, t0 + d)))
      const bx = clamp(wx, 250, 820)
      bubble(x, bx, sy - 128, text, k, { size: 42, col: BONE, tail: wx < bx - 40 ? 'bl' : wx > bx + 40 ? 'br' : 'bc' })
    }
    // places pop as each star crosses the line
    ORDER.forEach((id, p) => {
      const fin = FIN[id]; if (t < fin || t > fin + 2.2) return
      const [wx, wy] = pos(t, ID(id)), sy = wy - cam; if (sy < 480 || sy > 1600) return
      label(x, clamp(wx, 160, 860), sy + 78, ORD(p + 1), pop01(t, fin, 0.3, 2) * (1 - ease.inQuad(prog(t, fin + 1.9, fin + 2.2))), { size: 30, bg: p === 0 ? GOLD : BONE, rot: -0.06 })
    })
  }
  function board(t) {        // live top 3 + last, top-left under the app bar
    const k = clamp((t - GATE - 0.6) / 0.4) * (1 - clamp((t - T.meanwhile + 0.3) / 0.3))
    if (k <= 0) return
    const rank = SIGN_IDS.map((id, i) => { const f = FIN[id]; return [id, f !== null && t >= f ? 1e6 - f : pos(t, i)[1]] }).sort((a, b) => b[1] - a[1]).map(r => r[0])
    const rows = [[1, rank[0]], [2, rank[1]], [3, rank[2]], [12, rank[11]]]
    x.save(); x.globalAlpha = k
    const X = 110, Y = 300, W = 300, H = 46
    x.fillStyle = 'rgba(14,9,32,0.86)'; x.fillRect(X - 12, Y - 52, W + 24, 52 + rows.length * H + 24)
    x.font = `700 24px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LIVE', X, Y - 24)
    rows.forEach(([n, id], r) => {
      const y = Y + 20 + r * H + (n === 12 ? 12 : 0)
      x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.fillText(n === 12 ? 'last' : ORD(n), X, y)
      x.fillStyle = SIGN[id].color; x.fillRect(X + 78, y - 12, 24, 24)
      x.fillStyle = BONE; x.fillText(SIGN[id].name, X + 116, y)
    })
    x.restore()
  }
  function meanwhile(t) {
    const t0 = T.meanwhile; if (t < t0 || t > t0 + 2.6) return
    label(x, 540, 560, 'MEANWHILE…', pop01(t, t0 + 0.05, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + 2.3, t0 + 2.6))), { size: 46, bg: GOLD, rot: -0.04 })
  }
  function podium(t) {
    const t0 = T.podium; if (t < t0) return
    const a = clamp((t - t0) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.9 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const steps = [[ORDER[1], 330, 1180, 150], [ORDER[0], 540, 1100, 230], [ORDER[2], 750, 1230, 100]]
    steps.forEach(([id, cx, top, h], j) => {
      const k = pop01(t, t0 + 0.3 + j * 0.25, 0.4, 1.7); if (k <= 0) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(cx - 104, top - 4, 208, 1460 - top + 8)
      x.fillStyle = id === ORDER[0] ? GOLD : BONE; x.fillRect(cx - 100, top, 200, 1460 - top)
      x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(ORDER.indexOf(id) + 1), cx, top + 60)
      x.restore()
      drawStarChar(x, cx, top - 110 + (1 - k) * 60, 170, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: id === ORDER[0] ? 'heart' : 'happy', seed: j + 5, hops: [t0 + 1.2 + j * 0.3, t0 + 2.6 + j * 0.3, t0 + 4 + j * 0.3], pop: clamp(k) })
      const n = SIGN[id].name; x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.globalAlpha = clamp(k); x.fillText(n, cx, top - 262); x.globalAlpha = 1
    })
    if (t > t0 + 0.6) sparkles(x, t, 540, 900, t0 + 0.6, 14, 260, 7)
    // headline + the last-place hero
    const hk = pop01(t, t0 + 0.2, 0.4, 1.6)
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); x.font = `800 72px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(`${SIGN[ORDER[0]].name} wins.`, 540, 560); x.font = `italic 500 56px 'EB Garamond', Georgia, serif`; x.fillStyle = GOLD; x.fillText(WIN_LINE[ORDER[0]] || 'Nobody saw it coming.', 540, 640); x.restore() }
    const lk = pop01(t, t0 + 1.6, 0.4, 1.7)
    if (lk > 0) {
      drawStarChar(x, 330, 1585, 120, t, { color: SIGN[LAST].color, glyph: SIGN[LAST].glyph, mood: 'happy', seed: 9, pop: clamp(lk), hops: [t0 + 2.4, t0 + 3.6] })
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `800 38px ${INTER}`; x.fillStyle = BONE; x.fillText(`${SIGN[LAST].name}: last.`, 410, 1560)
      x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText(LAST_LINE[LAST] || 'Still smiling, though.', 410, 1612)
      x.restore()
    }
  }

  return {
    start: 0, end: DURATION, root,
    update(t) {
      const cam = camAt(t)
      drawSky(sx, t, { ...SKY_H, dy: -cam * 0.04 })
      x.clearRect(0, 0, 1080, 1920)
      track(cam, t); stars(cam, t); says(cam, t); board(t); meanwhile(t); podium(t)
      drawGrain(gx, t)
    },
  }
}
export const SCENES = [build]

// quiet cue sheet: gate thunk, one soft pop per finisher, a bell for the winner, glitter on the podium
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
export const CUES = [
  ['pluck', r2(GATE), 784, 0.03, 0.4, 0],
  ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
  ...ORDER.map((id, p) => ['pop', r2(FIN[id]), NOTE[(11 - p) % 7], 0.02, 0]),
  ['bell', r2(T.win + 0.05), 1760, 0.02, 1.6, 0],
  ['whoosh', r2(T.meanwhile), 0.5, 0.02],
  ['glitter', r2(T.podium + 0.6), r2(T.podium + 1.4)],
  ['bell', r2(T.podium + 0.4), 1318.5, 0.018, 1.8, 0],
]
