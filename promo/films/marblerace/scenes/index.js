// marblerace · Race 1 "Fastest isn't the point." The twelve Star Talk stars race down a space-astrology marble run
// (deterministic physics in race.js: asteroid belt, binary stars, zodiac wheel, black hole → wormhole, stardust plinko,
// Mercury retrograde, Saturn, comet). Social cut only (full frame).
// Story (seed 38): Taurus offers Cancer half a snack at the back · Capricorn leads, bounces off a binary star · the black
// hole swallows Gemini, Capricorn and Scorpio → they pop out of the wormhole near the finish and take the podium (Gemini
// by 0.3 s) · MEANWHILE the honest racers float backwards in Mercury retrograde · Sagittarius: "wait, you guys skipped?"
// · Taurus & Cancer finish together · Virgo, stuck in retrograde, last · podium · "Fastest isn't the point. Who you finish with is."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { bubble, label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO, SIGN_IDS } from '../../signs3kit.js'
import { simulate, R, FPS, GATE, FINISH_Y, COURSE, wheelSpokes, retroOn } from './race.js'

export const HOOK = '12 signs. 1 space race. | Who wins?'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6

const SIM = simulate({ seed: 38, ids: SIGN_IDS, drag: { taurus: 0.35, cancer: 0.36, pisces: 0.25 }, kick: { aries: 300 }, T: 75 })
const N = SIM.n, NF = SIM.frames.length / (N * 2)
const SIGN = Object.fromEntries(SIGNS.map(s => [s.id, s]))
const ID = id => SIGN_IDS.indexOf(id)
const fi = t => Math.max(0, Math.min(NF - 1, t * FPS))
function pos(t, i) {          // interpolated world position (no smear across a wormhole jump)
  const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1), u = f - a, A = (a * N + i) * 2, B = (b * N + i) * 2
  const fr = SIM.frames
  if (Math.abs(fr[B + 1] - fr[A + 1]) > 900) return u < 0.5 ? [fr[A], fr[A + 1]] : [fr[B], fr[B + 1]]
  return [lerp(fr[A], fr[B], u), lerp(fr[A + 1], fr[B + 1], u)]
}
const FIN = SIM.finishT, ORDER = SIM.order
const SWALLOW = {}; for (const e of SIM.events) if (e.kind === 'swallow' && !(e.id in SWALLOW)) SWALLOW[e.id] = e
const HOLE = COURSE.A[0], RETRO = COURSE.Z[0]
const r2 = v => Math.round(v * 100) / 100
const T_LAST = FIN[ORDER[ORDER.length - 1]]
const SW1 = Math.min(...Object.values(SWALLOW).map(e => e.t))          // first swallow
export const T = {
  gate: GATE, swallow: r2(SW1), worm: r2(SW1 + 1.0), win: FIN[ORDER[0]],
  meanwhile: r2(FIN[ORDER[1]] + 1.0), pair: r2(FIN[ORDER[3]] + 3.2), virgo: r2(Math.max(FIN.taurus, FIN.cancer) + 0.6),
  last: T_LAST,
}
T.podium = r2(T_LAST + 0.9)
export const DURATION = r2(T.podium + 8.4)
export const STORY_END = DURATION

// ── camera (world y at the top of the frame), precomputed and smoothed; hard cuts between story beats
const clampY = y => Math.min(y, FINISH_Y + 60)
const CAM = (() => {
  const out = new Float32Array(NF)
  const ys = t => SIGN_IDS.map((_, i) => clampY(pos(t, i)[1]))
  const target = t => {
    if (t < GATE + 0.2) return -330
    if (t > T.swallow - 1.6 && t < T.worm) return HOLE.y - 1080   // hold on the black hole for the gulp
    if (t < T.worm) {                                   // the lead group (until the black hole)
      const y = ys(t).sort((a, b) => b - a), pack = (y[1] + y[2] + y[3] + y[4]) / 4
      return Math.max(y[0] - 1500, Math.min(pack - 950, y[0] - 700))
    }
    if (t < T.meanwhile) { const y = ys(t).sort((a, b) => b - a); return Math.max(y[0] - 1350, Math.min((y[0] + y[1]) / 2 - 1000, y[0] - 700)) }   // the wormhole duel
    if (t < T.pair) {                                   // the honest racers: the middle of the unfinished pack
      const y = SIGN_IDS.filter(id => !(id in SWALLOW) && (FIN[id] === null || FIN[id] > t)).map(id => clampY(pos(t, ID(id))[1])).sort((a, b) => b - a)
      return (y[Math.floor(y.length / 3)] + y[Math.floor(y.length / 2)]) / 2 - 900
    }
    if (t < T.virgo) return (clampY(pos(t, ID('taurus'))[1]) + clampY(pos(t, ID('cancer'))[1])) / 2 - 960
    return clampY(pos(t, ID('virgo'))[1]) - 1000
  }
  let c = -330
  const cuts = [T.worm, T.meanwhile, T.pair, T.virgo]
  for (let f = 0; f < NF; f++) {
    const t = f / FPS, tg = target(t)
    if (cuts.some(k => Math.abs(t - k) < 0.5 / FPS)) c = tg
    else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / (t < GATE + 1.5 ? 0.5 : 0.22)))
    out[f] = c
  }
  return out
})()
const camAt = t => { const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return lerp(CAM[a], CAM[b], f - a) }

// ── reactions: [t0, seconds, sign, text]
const SAY = [
  [GATE + 0.15, 1.8, 'aries', 'GO GO GO!!'],
  [5.0, 2.2, 'taurus', 'want half | my snack?'],
  [7.2, 2.0, 'cancer', '...for me?'],
  [10.9, 2.2, 'capricorn', 'excuse me. | business.'],
  [12.2, 1.8, 'aquarius', 'new route. | trust me.'],
  [13.6, 1.9, 'leo', 'I AM | the star.'],
  [15.0, 1.8, 'sagittarius', 'WHEEEEE'],
  [17.6, 1.8, 'gemini', 'ooh, | shiny.'],
  [T.worm + 0.4, 2.0, 'gemini', 'wait, | where are we?'],
  [T.worm + 2.6, 2.2, 'capricorn', 'this counts. | check the rules.'],
  [25.4, 2.2, 'scorpio', 'went in | on purpose.'],
  [27.6, 2.2, 'gemini', 'which one of me | is winning?'],
  [T.win + 0.15, 2.0, 'gemini', 'BOTH of us | won.'],
  [FIN.capricorn + 0.1, 2.0, 'capricorn', 'requesting | a recount.'],
  [T.meanwhile + 1.0, 2.4, 'cancer', 'why is gravity | going UP??'],
  [T.meanwhile + 3.6, 2.4, 'virgo', 'this was NOT | in the plan.'],
  [T.meanwhile + 6.2, 2.2, 'pisces', "it's all so | beautiful"],
  [38.6, 2.0, 'aquarius', 'I meant | to do that.'],
  [FIN.sagittarius + 0.1, 2.4, 'sagittarius', 'wait, you | guys skipped?'],
  [T.pair + 0.8, 2.4, 'cancer', "I'll wait | for you."],
  [T.pair + 3.4, 2.6, 'taurus', 'saved you | the last bite.'],
  [T.virgo + 1.0, 2.4, 'virgo', 'still in | retrograde.'],
  [T.virgo + 3.8, 2.0, 'virgo', 'optimal | line.'],
]
const STICK = [            // big story stickers (screen space)
  [T.swallow + 0.05, 0.95, 'BLACK HOLE!!', PINK, INK],
  [T.worm + 0.05, 1.8, '…WORMHOLE.', GOLD, INK],
  [T.meanwhile, 2.4, 'MEANWHILE…', GOLD, INK],
  [T.pair, 2.0, 'AT THE BACK…', PINK, INK],
  [T.virgo, 2.2, 'AND VIRGO…', BONE, INK],
]
const SNACK = [[4.8, 9.2], [T.pair + 3.2, 1e9]]
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th')

function mood(id, t) {
  const p = ORDER.indexOf(id), fin = FIN[id]
  if (fin !== null && t > fin) return p === 0 ? 'heart' : id === 'taurus' || id === 'cancer' ? 'heart' : p < 3 ? 'happy' : 'wink'
  if (t < GATE) return id === 'aries' ? 'squint' : 'happy'
  if (id in SWALLOW && t > SWALLOW[id].t && t < SWALLOW[id].t + 1.4) return 'wide'
  if (id === 'virgo' && t > T.meanwhile) return t > T.virgo ? 'sleepy' : 'wide'
  if (id === 'capricorn') return 'squint'
  if (id === 'cancer') return (t > 7.2 && t < 9.2) || t > T.pair + 0.8 ? 'heart' : 'wide'
  if (id === 'taurus') return (t > 4.8 && t < 9.2) || t > T.pair + 3.2 ? 'happy' : 'sleepy'
  if (id === 'gemini') return 'wink'
  if (RETRO && retroOn(RETRO, t)) { const y = pos(t, ID(id))[1]; if (y > RETRO.y0 && y < RETRO.y1) return 'wide' }
  return 'happy'
}

async function build(stage) {
  try { await Promise.all(["800 34px Inter", "800 42px Inter", "800 64px Inter", "700 26px 'Space Mono'", "italic 500 56px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) {}
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const { S, P, M, W, SHELF, SIGNS: SECTIONS } = COURSE

  const px = (cx, cy, s, col) => { x.fillStyle = col; x.fillRect(Math.round(cx - s / 2), Math.round(cy - s / 2), s, s) }
  function rail(s, col, cam) { const [x1, y1, x2, y2, th] = s; x.lineWidth = th + 10; x.strokeStyle = INK; x.beginPath(); x.moveTo(x1, y1 - cam); x.lineTo(x2, y2 - cam); x.stroke(); x.lineWidth = th; x.strokeStyle = col; x.stroke() }
  const vis = (y, m = 200) => y > -m && y < 1920 + m

  function retroZone(cam, t) {
    const y0 = RETRO.y0 - cam, y1 = RETRO.y1 - cam; if (y1 < -50 || y0 > 1970) return
    const on = retroOn(RETRO, t)
    x.fillStyle = on ? 'rgba(255,120,190,0.18)' : 'rgba(255,120,190,0.07)'; x.fillRect(97, y0, 886, y1 - y0)
    x.strokeStyle = 'rgba(255,143,177,0.5)'; x.lineWidth = 4; x.setLineDash([18, 14]); x.strokeRect(97, y0, 886, y1 - y0); x.setLineDash([])
    if (on) { x.fillStyle = PINK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; for (let k = 0; k < 4; k++) { const ay = y1 - ((t * 260 + k * 215) % (y1 - y0)); x.fillText('↑', 200 + k * 230, ay) } }
  }
  function blackHole(cam, t) {
    const cy = HOLE.y - cam; if (!vis(cy, 300)) return
    for (let k = 0; k < 46; k++) {                      // accretion swirl
      const a = t * (1.6 + (k % 5) * 0.25) + k * 0.73, rr = 58 + (k * 37 % 90)
      px(HOLE.x + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.45, 10, k % 3 ? '#ff9a3c' : '#c9a6ff')
    }
    for (let k = 4; k >= 1; k--) { x.fillStyle = `rgba(120,60,200,${0.07 * k})`; x.beginPath(); x.arc(HOLE.x, cy, 52 + k * 26, 0, Math.PI * 2); x.fill() }
    x.fillStyle = '#000'; x.beginPath(); x.arc(HOLE.x, cy, 52, 0, Math.PI * 2); x.fill()
    x.strokeStyle = 'rgba(255,190,120,0.9)'; x.lineWidth = 5; x.beginPath(); x.arc(HOLE.x, cy, 56, 0, Math.PI * 2); x.stroke()
    for (const [id, e] of Object.entries(SWALLOW)) {      // the gulp: a shrinking spiral ghost
      const d = t - e.t; if (d < 0 || d > 0.7) continue
      const k = 1 - d / 0.7, a = d * 14
      drawStarChar(x, HOLE.x + Math.cos(a) * 60 * k, cy + Math.sin(a) * 30 * k, 92 * k, t, { color: SIGN[id].color, mood: 'wide', seed: 3 })
    }
  }
  function wormhole(cam, t) {
    const [wx, wy] = HOLE.exit, cy = wy - cam; if (!vis(cy, 200)) return
    for (let k = 0; k < 30; k++) { const a = -t * 2.4 + k * 0.42, rr = 40 + (k % 6) * 12; px(wx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.5, 9, k % 2 ? '#8fe3ff' : BONE) }
    for (const e of Object.values(SWALLOW)) { const d = t - e.t; if (d >= 0 && d < 0.6) sparkles(x, t, wx, cy, e.t, 12, 160, 5) }
  }
  function saturn(cam, t) {
    const p = P.find(q => q[2] > 100); if (!p) return
    const cy = p[1] - cam; if (!vis(cy, 300)) return
    x.strokeStyle = '#e9d39a'; x.lineWidth = 10; x.beginPath(); x.ellipse(p[0], cy, 330, 70, -0.12, Math.PI, Math.PI * 2); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.arc(p[0], cy, p[2] + 5, 0, Math.PI * 2); x.fill()
    const bands = ['#e8c27a', '#d9a55a', '#f0d79c', '#c98e4a', '#e8c27a']
    x.save(); x.beginPath(); x.arc(p[0], cy, p[2], 0, Math.PI * 2); x.clip()
    bands.forEach((c, i) => { x.fillStyle = c; x.fillRect(p[0] - p[2], cy - p[2] + i * (2 * p[2] / 5), 2 * p[2], 2 * p[2] / 5 + 1) })
    x.restore()
    x.strokeStyle = '#e9d39a'; x.lineWidth = 10; x.beginPath(); x.ellipse(p[0], cy, 330, 70, -0.12, 0, Math.PI); x.stroke()
  }
  function movers(cam, t) {
    for (const m of M) {
      const [mx, my] = m.p(t), cy = my - cam; if (!vis(cy, 120)) continue
      if (m.kind === 'rock') {
        x.fillStyle = INK; x.beginPath(); x.arc(mx, cy, m.r + 5, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#8f88a8'; x.beginPath(); x.arc(mx, cy, m.r, 0, Math.PI * 2); x.fill()
        px(mx - m.r * 0.3, cy - m.r * 0.2, m.r * 0.45, '#6d6688'); px(mx + m.r * 0.35, cy + m.r * 0.3, m.r * 0.3, '#6d6688')
      } else if (m.kind === 'sun') {
        for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6 + t * 0.8, rr = m.r + 14 + 6 * Math.sin(t * 5 + k); px(mx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 12, '#ffd36b') }
        x.fillStyle = INK; x.beginPath(); x.arc(mx, cy, m.r + 5, 0, Math.PI * 2); x.fill()
        const g = x.createRadialGradient(mx - 18, cy - 18, 6, mx, cy, m.r); g.addColorStop(0, '#fff6c9'); g.addColorStop(0.6, '#ffc24a'); g.addColorStop(1, '#f08a2c')
        x.fillStyle = g; x.beginPath(); x.arc(mx, cy, m.r, 0, Math.PI * 2); x.fill()
      } else if (m.kind === 'comet') {
        for (let k = 1; k < 16; k++) px(mx - k * 26, cy + Math.sin(t * 9 + k) * 4, Math.max(4, 30 - k * 1.6), k % 2 ? '#8fe3ff' : BONE)
        x.fillStyle = INK; x.beginPath(); x.arc(mx, cy, m.r + 5, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#eafcff'; x.beginPath(); x.arc(mx, cy, m.r, 0, Math.PI * 2); x.fill()
      }
    }
  }
  function wheel(cam, t) {
    for (const wh of W) {
      const cy = wh.cy - cam; if (!vis(cy, 400)) continue
      x.strokeStyle = 'rgba(242,199,92,0.35)'; x.lineWidth = 4; x.beginPath(); x.arc(wh.cx, cy, wh.r1 + 22, 0, Math.PI * 2); x.stroke()
      for (const s of wheelSpokes(wh, t)) rail([s[0], s[1], s[2], s[3], s[4]], GOLD, cam)
      SIGNS.forEach((sg, i) => { const a = wh.w * t + (i + 0.5) * 2 * Math.PI / 12; x.font = `700 34px 'Segoe UI Symbol', 'Noto Sans Symbols 2', serif`; x.fillStyle = sg.color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sg.glyph + '︎', wh.cx + Math.cos(a) * (wh.r1 + 22), cy + Math.sin(a) * (wh.r1 + 22)) })
      x.fillStyle = INK; x.beginPath(); x.arc(wh.cx, cy, wh.r0 + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(wh.cx, cy, wh.r0, 0, Math.PI * 2); x.fill()
    }
  }
  function track(cam, t) {
    retroZone(cam, t); saturn(cam, t); wormhole(cam, t)
    const fy = FINISH_Y - cam
    if (vis(fy, 60)) { for (let i = 0; i < 18; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(97 + i * 49, fy - 24 + j * 24, 49, 24) } label(x, 540, fy - 70, 'FINISH', 1, { size: 34, bg: GOLD, rot: -0.03 }) }
    for (const [y, txt] of SECTIONS) { const sy = y - cam; if (vis(sy, 60)) label(x, 540, sy, txt, 1, { size: 28, bg: PINK, rot: 0.02 }) }
    x.lineCap = 'round'
    for (const s of S) { if (Math.max(s[1], s[3]) - cam < -40 || Math.min(s[1], s[3]) - cam > 1960) continue; rail(s, BONE, cam) }
    if (t < GATE + 0.25) { x.save(); x.globalAlpha = clamp(1 - (t - GATE) / 0.25); rail(SHELF, GOLD, cam); x.restore() }
    for (const [ppx, py, pr] of P) { if (pr > 100) continue; const sy = py - cam; if (sy < -30 || sy > 1950) continue; x.fillStyle = INK; x.fillRect(ppx - pr - 4, sy - pr - 4, 2 * pr + 8, 2 * pr + 8); x.fillStyle = GOLD; x.fillRect(ppx - pr, sy - pr, 2 * pr, 2 * pr); x.fillStyle = '#fff3c4'; x.fillRect(ppx - pr + 3, sy - pr + 3, 5, 5) }
    wheel(cam, t); movers(cam, t); blackHole(cam, t)
  }

  function cookie(cx, cy) {
    const C = ['.KKKK.', 'KccdcK', 'KcccdK', 'KdcccK', 'KccdcK', '.KKKK.'], col = { K: INK, c: '#d9a55a', d: '#6b3b1f' }, s = 6
    C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = col[ch]; x.fillRect(cx + (i - 3) * s, cy + (j - 3) * s, s, s) } }))
  }
  function tears(cx, cy, t) {
    for (const d of [-1, 1]) for (let q = 0; q < 4; q++) {
      const ph = ((t * 1.4 + q / 4) % 1), ppx = cx + d * (12 + 22 * ph), py = cy - 6 + 30 * ph * ph
      x.fillStyle = INK; x.fillRect(ppx - 4, py - 4, 9, 11); x.fillStyle = '#8fe3ff'; x.fillRect(ppx - 2, py - 2, 5, 7)
    }
  }
  function stars(cam, t) {
    const order = SIGN_IDS.map((id, i) => [id, i, pos(t, i)]).sort((a, b) => a[2][1] - b[2][1])
    for (const [id, i, [wx, wy]] of order) {
      const sy = wy - cam; if (sy < -80 || sy > 2000) continue
      const sw = SWALLOW[id]; if (sw && t > sw.t && t < sw.t + 0.02) continue
      const s = SIGN[id], fin = FIN[id]
      const hops = fin !== null && t > fin ? [fin + 0.3, fin + 1.0, fin + 1.7] : sw ? [sw.t + 0.05] : null
      const bounce = t > GATE && (fin === null || t < fin) ? Math.sin(t * 9 + i) * 0.04 : 0
      drawStarChar(x, wx, sy - 4, 92, t, { color: s.color, glyph: s.glyph, mood: mood(id, t), seed: i + 2, hops, squash: bounce, look: [Math.sign(Math.sin(t * 0.7 + i)) * 0.6, 0.6] })
      if (id === 'pisces' && t > GATE) tears(wx, sy - 4, t)
      if (id === 'taurus' && SNACK.some(([a, b]) => t > a && t < b)) cookie(wx + 46, sy + 6)
    }
  }
  function says(cam, t) {
    for (const [t0, d, id, text] of SAY) {
      if (t < t0 || t > t0 + d) continue
      const [wx, wy] = pos(t, ID(id)), sy = wy - cam
      if (sy < 330 || sy > 1560) continue
      const k = pop01(t, t0, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - 0.25, t0 + d)))
      const bx = clamp(wx, 250, 820)
      bubble(x, bx, sy - 128, text, k, { size: 42, col: BONE, tail: wx < bx - 40 ? 'bl' : wx > bx + 40 ? 'br' : 'bc' })
    }
    ORDER.forEach((id, p) => {
      const fin = FIN[id]; if (t < fin || t > fin + 2.2) return
      const [wx, wy] = pos(t, ID(id)), sy = wy - cam; if (sy < 480 || sy > 1600) return
      label(x, clamp(wx, 160, 860), sy + 78, ORD(p + 1), pop01(t, fin, 0.3, 2) * (1 - ease.inQuad(prog(t, fin + 1.9, fin + 2.2))), { size: 30, bg: p === 0 ? GOLD : BONE, rot: -0.06 })
    })
  }
  function stickers(t) {
    for (const [t0, d, text, bg, ink] of STICK) {
      if (t < t0 || t > t0 + d) continue
      label(x, 540, 560, text, pop01(t, t0 + 0.02, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - 0.3, t0 + d))), { size: 50, bg, color: ink, rot: -0.04 })
    }
  }
  function board(t) {
    const k = clamp((t - GATE - 0.6) / 0.4) * (1 - clamp((t - T.podium + 0.4) / 0.3))
    if (k <= 0) return
    const rank = SIGN_IDS.map((id, i) => { const f = FIN[id]; return [id, f !== null && t >= f ? 1e6 - f : pos(t, i)[1]] }).sort((a, b) => b[1] - a[1]).map(r => r[0])
    const rows = [[1, rank[0]], [2, rank[1]], [3, rank[2]], [12, rank[11]]]
    x.save(); x.globalAlpha = k
    const X = 110, Y = 300, Wd = 300, H = 46
    x.fillStyle = 'rgba(14,9,32,0.86)'; x.fillRect(X - 12, Y - 52, Wd + 24, 52 + rows.length * H + 24)
    x.font = `700 24px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LIVE', X, Y - 24)
    rows.forEach(([n, id], r) => {
      const y = Y + 20 + r * H + (n === 12 ? 12 : 0)
      x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.fillText(n === 12 ? 'last' : ORD(n), X, y)
      x.fillStyle = SIGN[id].color; x.fillRect(X + 78, y - 12, 24, 24)
      x.fillStyle = BONE; x.fillText(SIGN[id].name, X + 116, y)
    })
    x.restore()
  }
  function podium(t) {
    const t0 = T.podium; if (t < t0) return
    const a = clamp((t - t0) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.9 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const steps = [[ORDER[1], 330, 1180], [ORDER[0], 540, 1100], [ORDER[2], 750, 1230]]
    steps.forEach(([id, cx, top], j) => {
      const k = pop01(t, t0 + 0.3 + j * 0.25, 0.4, 1.7); if (k <= 0) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(cx - 104, top - 4, 208, 1460 - top + 8)
      x.fillStyle = id === ORDER[0] ? GOLD : BONE; x.fillRect(cx - 100, top, 200, 1460 - top)
      x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(ORDER.indexOf(id) + 1), cx, top + 60)
      x.restore()
      drawStarChar(x, cx, top - 110 + (1 - k) * 60, 170, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: id === ORDER[0] ? 'heart' : 'happy', seed: j + 5, hops: [t0 + 1.2 + j * 0.3, t0 + 2.6 + j * 0.3, t0 + 4 + j * 0.3], pop: clamp(k) })
      x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.globalAlpha = clamp(k); x.fillText(SIGN[id].name, cx, top - 262); x.globalAlpha = 1
    })
    if (t > t0 + 0.6) sparkles(x, t, 540, 900, t0 + 0.6, 14, 260, 7)
    const hk = pop01(t, t0 + 0.2, 0.4, 1.6) * (1 - ease.inQuad(prog(t, t0 + 3.8, t0 + 4.2)))
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); x.textAlign = 'center'; x.font = `800 66px ${INTER}`; x.fillStyle = BONE; x.fillText('The black hole', 540, 520); x.fillText('picked the podium.', 540, 596); x.restore() }
    const lk = pop01(t, t0 + 1.6, 0.4, 1.7)
    if (lk > 0) {
      drawStarChar(x, 250, 1610, 112, t, { color: SIGN.taurus.color, glyph: SIGN.taurus.glyph, mood: 'heart', seed: 9, pop: clamp(lk), hops: [t0 + 2.4, t0 + 3.6] })
      drawStarChar(x, 370, 1610, 112, t, { color: SIGN.cancer.color, glyph: SIGN.cancer.glyph, mood: 'heart', seed: 10, pop: clamp(lk), hops: [t0 + 2.6, t0 + 3.8] })
      if (lk > 0.5) cookie(310, 1655)
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `800 38px ${INTER}`; x.fillStyle = BONE; x.fillText('Taurus & Cancer: at the back.', 440, 1588)
      x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('Together. Worth it.', 440, 1638)
      x.restore()
    }
    const ek = pop01(t, t0 + 4.2, 0.45, 1.5)
    if (ek > 0) {
      x.save(); x.globalAlpha = clamp(ek); x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.fillText("Fastest isn't the point.", 540, 520)
      x.font = `italic 500 64px 'EB Garamond', Georgia, serif`; x.fillStyle = GOLD; x.fillText('Who you finish with is.', 540, 596)
      x.restore()
    }
  }

  return {
    start: 0, end: DURATION, root,
    update(t) {
      const cam = camAt(t)
      drawSky(sx, t, { ...SKY_H, dy: -cam * 0.04 })
      x.clearRect(0, 0, 1080, 1920)
      track(cam, t); stars(cam, t); board(t); says(cam, t); stickers(t); podium(t)
      drawGrain(gx, t)
    },
  }
}
export const SCENES = [build]

// quiet cue sheet: gate, a soft knock for each binary-star / comet hit, a low whoomp for each swallow, pops at the line
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const hits = []; for (const e of SIM.events) if (e.kind === 'sun' || e.kind === 'comet') { if (!hits.some(h => Math.abs(h - e.t) < 1.2)) hits.push(e.t) }
export const CUES = [
  ['pluck', r2(GATE), 784, 0.03, 0.4, 0],
  ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
  ...hits.map(h => ['pluck', r2(h), 392, 0.02, 0.3, 0]),
  ...Object.values(SWALLOW).map(e => ['whoosh', r2(e.t), 0.9, 0.03]),
  ...ORDER.map((id, p) => ['pop', r2(FIN[id]), NOTE[(11 - p) % 7], 0.02, 0]),
  ['bell', r2(T.win + 0.05), 1760, 0.02, 1.6, 0],
  ['glitter', r2(T.podium + 0.6), r2(T.podium + 1.4)],
  ['bell', r2(T.podium + 0.4), 1318.5, 0.018, 1.8, 0],
]
