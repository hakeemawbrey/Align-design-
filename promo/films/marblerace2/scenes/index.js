// marblerace2 · Race 2 "Your pace, together." The pairs race: the twelve stars race tied in twos with 150 px ropes,
// same space course as Race 1, one change: the wormhole now spits you out back at the START.
// Story (seed 98, baked in marblerace/scenes/race2.js): Leo & Aries lead the first half ("I lead, you shine") · Libra &
// Gemini get caught between the two binary suns, then swallowed by the black hole and sent back to the start ·
// Scorpio & Pisces try Scorpio's plan (jump in) and miss · MEANWHILE in Mercury retrograde Leo & Aries argue, Taurus &
// Cancer float calmly past · Taurus & Cancer (last in Race 1) win · everyone waits at the line for Libra & Gemini.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../sky.js'
import { SKY_H, SIGNS } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { bubble, label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO } from '../../signs3kit.js'
import { R, FPS, GATE, FINISH_Y, COURSE, wheelSpokes, retroOn } from '../../marblerace/scenes/race.js'
import { RACE2, RACE2_FRAMES } from '../../marblerace/scenes/race2.js'

export const HOOK = 'Race 2: pairs. | 12 signs, tied together.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6

const SIM = (() => { const bin = atob(RACE2_FRAMES), u8 = new Uint8Array(bin.length); for (let k = 0; k < bin.length; k++) u8[k] = bin.charCodeAt(k); return { ...RACE2, frames: new Float32Array(u8.buffer) } })()
const IDS = SIM.ids, N = SIM.n, NF = SIM.frames.length / (N * 2)
const SIGN = Object.fromEntries(SIGNS.map(s => [s.id, s]))
const ID = id => IDS.indexOf(id)
const fi = t => Math.max(0, Math.min(NF - 1, t * FPS))
function pos(t, i) {          // interpolated world position (no smear across a wormhole jump)
  const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1), u = f - a, A = (a * N + i) * 2, B = (b * N + i) * 2
  const fr = SIM.frames
  if (Math.abs(fr[B + 1] - fr[A + 1]) > 900) return u < 0.5 ? [fr[A], fr[A + 1]] : [fr[B], fr[B + 1]]
  return [lerp(fr[A], fr[B], u), lerp(fr[A + 1], fr[B + 1], u)]
}
const FIN = SIM.finishT
const PAIRS = SIM.pairs
const PNAME = ([a, b]) => `${SIGN[a].name} & ${SIGN[b].name}`
const PFIN = PAIRS.map(p => Math.max(FIN[p[0]], FIN[p[1]]))
const PORDER = PAIRS.map((p, i) => i).sort((a, b) => PFIN[a] - PFIN[b])            // pair indices, winner first
const PI_OF = id => PAIRS.findIndex(p => p.includes(id))
const SWALLOW = {}; for (const e of SIM.events) if (e.kind === 'swallow' && !(e.id in SWALLOW)) SWALLOW[e.id] = e
const HOLE = COURSE.A[0], RETRO = COURSE.Z[0], EXIT = [540, 1150]
const r2 = v => Math.round(v * 100) / 100
const T_LAST = Math.max(...PFIN)
export const T = {
  gate: GATE, suns: 11.2, sunsOut: 13.8, plan: 18.0, swallow: SWALLOW.libra.t, start: r2(SWALLOW.libra.t + 1.0), meanwhile: r2(SWALLOW.libra.t + 3.6),
  lead: 32.3, follow: 33.6, win: PFIN[PORDER[0]], line: r2(PFIN[PORDER[0]] + 0.4), mid: 48.6, back: 52.6, last: T_LAST,
}
T.podium = r2(T_LAST + 0.9)
export const DURATION = r2(T.podium + 9.0)
export const STORY_END = DURATION

// ── camera (world y at the top of the frame), precomputed and smoothed; hard cuts between story beats
const clampY = y => Math.min(y, FINISH_Y + 60)
const yOf = id => t => clampY(pos(t, ID(id))[1])
const mid2 = (a, b) => t => (yOf(a)(t) + yOf(b)(t)) / 2
const CAM = (() => {
  const out = new Float32Array(NF)
  const target = t => {
    if (t < GATE + 0.2) return -330
    if (t < T.suns) { const y = IDS.map(id => yOf(id)(t)).sort((a, b) => b - a), pack = (y[1] + y[2] + y[3] + y[4]) / 4; return Math.max(y[0] - 1500, Math.min(pack - 950, y[0] - 700)) }
    if (t < T.sunsOut) return 3900 - 980                                              // between two suns
    if (t < T.plan) return mid2('leo', 'aries')(t) - 900                               // the leaders
    if (t < T.start) return HOLE.y - 1080                                              // Scorpio's plan · the gulp
    if (t < T.meanwhile) return EXIT[1] - 900                                          // …back at the start
    if (t < T.follow) return (mid2('leo', 'aries')(t) + mid2('taurus', 'cancer')(t)) / 2 - 960   // retrograde: the pass
    if (t < T.line) return mid2('taurus', 'cancer')(t) - 1000                          // the new leaders to the line
    if (t < T.mid) return FINISH_Y - 1150                                              // at the line
    if (t < T.back) return Math.min(mid2('pisces', 'scorpio')(t), mid2('sagittarius', 'virgo')(t)) - 900
    return Math.min(mid2('libra', 'gemini')(t) - 1000, FINISH_Y - 1150)                // the last pair, all the way home
  }
  let c = -330
  const cuts = [T.suns, T.sunsOut, T.plan, T.start, T.meanwhile, T.follow, T.line, T.mid, T.back]
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
const W = PFIN[PORDER[0]], C2 = PFIN[PORDER[1]], L3 = PFIN[PORDER[2]]
const SAY = [
  [GATE + 0.15, 1.7, 'aries', 'GO GO GO!!'],
  [4.6, 1.8, 'leo', 'I lead, | you shine!'],
  [6.5, 1.4, 'aries', 'deal!'],
  [7.2, 2.0, 'taurus', 'our pace. | ready?'],
  [9.3, 1.4, 'cancer', 'ready.'],
  [11.6, 1.5, 'libra', 'which sun?? | which sun??'],
  [13.15, 1.5, 'gemini', 'BOTH suns!'],
  [14.6, 1.6, 'leo', 'still | leading!'],
  [18.3, 1.6, 'scorpio', 'on three, | we jump.'],
  [19.95, 1.4, 'pisces', '...we missed!'],
  [T.start + 0.25, 1.8, 'libra', 'is this... | the start?'],
  [T.start + 1.6, 1.0, 'gemini', 'AGAIN!'],
  [T.meanwhile + 0.6, 1.8, 'aries', "gravity's | going UP??"],
  [T.meanwhile + 2.6, 1.8, 'cancer', 'just float. | with me.'],
  [T.meanwhile + 4.6, 1.5, 'leo', 'you go left!'],
  [T.meanwhile + 6.2, 1.5, 'aries', 'no, YOU | go left!'],
  [T.lead + 0.15, 1.4, 'taurus', 'excuse us.'],
  [35.0, 1.8, 'capricorn', 'we can | catch them.'],
  [37.0, 1.5, 'aquarius', 'shortcut?'],
  [38.7, 1.2, 'capricorn', '...no.'],
  [W + 0.15, 1.8, 'cancer', 'we... | won?'],
  [C2 + 0.1, 1.5, 'capricorn', '2nd. | again.'],
  [L3 + 0.1, 1.4, 'aries', 'third! | together!'],
  [L3 + 1.6, 2.2, 'taurus', 'at our | own pace.'],
  [PFIN[PI_OF('pisces')] + 0.1, 1.8, 'pisces', 'we made it!'],
  [PFIN[PI_OF('virgo')] + 0.1, 1.6, 'virgo', 'on | schedule.'],
  [T.back + 0.5, 2.0, 'gemini', 'we hit the | suns TWICE.'],
  [T.back + 2.9, 2.0, 'libra', 'was that | the right way?'],
  [T.back + 5.3, 2.0, 'gemini', "there's only | one way: ours!"],
  [T.last - 1.4, 1.6, 'cancer', 'we waited!'],
]
const STICK = [            // big story stickers (screen space)
  [T.suns + 0.1, 1.8, 'BETWEEN TWO SUNS…', GOLD, INK],
  [T.plan + 0.05, 1.6, "SCORPIO'S PLAN…", PINK, INK],
  [T.swallow + 0.02, 0.95, 'BLACK HOLE!!', PINK, INK],
  [T.start + 0.05, 1.6, '…BACK TO THE START.', GOLD, INK],
  [T.meanwhile, 2.0, 'MEANWHILE…', GOLD, INK],
  [T.lead, 1.8, 'NEW LEADERS.', GOLD, INK],
  [T.back, 2.2, 'AND LIBRA & GEMINI…', BONE, INK],
]
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th')

function mood(id, t) {
  const pi = PI_OF(id), fin = PFIN[pi], place = PORDER.indexOf(pi)
  if (t > fin) return place === 0 || id === 'pisces' || id === 'scorpio' ? 'heart' : place < 3 ? 'happy' : 'wink'
  if (t < GATE) return id === 'aries' || id === 'leo' ? 'squint' : 'happy'
  if (id in SWALLOW && t > SWALLOW[id].t && t < SWALLOW[id].t + 2.4) return 'wide'
  if ((id === 'libra' || id === 'gemini') && t > 11.4 && t < 13.2) return 'wide'
  if (id === 'taurus' || id === 'cancer') return t > T.meanwhile ? 'heart' : 'happy'
  if (id === 'leo' || id === 'aries') return t > T.meanwhile + 4.4 && t < T.lead + 2 ? 'eyeroll' : 'squint'
  if (id === 'capricorn') return 'squint'
  if (RETRO && retroOn(RETRO, t)) { const y = pos(t, ID(id))[1]; if (y > RETRO.y0 && y < RETRO.y1) return 'wide' }
  return 'happy'
}
async function build(stage) {
  try { await Promise.all(["800 34px Inter", "800 42px Inter", "800 64px Inter", "700 26px 'Space Mono'", "italic 500 56px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) {}
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { S, P, M, W, SHELF, SIGNS: SECTIONS } = COURSE
  const SECTIONS2 = [...SECTIONS.filter(q => q[1] !== 'WORMHOLE EXIT'), [EXIT[1] - 150, 'WORMHOLE EXIT (MOVED!)']]

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
    const [wx, wy] = EXIT, cy = wy - cam; if (!vis(cy, 200)) return
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
    for (const [y, txt] of SECTIONS2) { const sy = y - cam; if (vis(sy, 60)) label(x, 540, sy, txt, 1, { size: 28, bg: PINK, rot: 0.02 }) }
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
  }  function ropes(cam, t) {                 // the ties: a sagging rope, gold; Taurus & Cancer's is the striped scarf
    for (const [a, b] of PAIRS) {
      const [ax, ay] = pos(t, ID(a)), [bx, by] = pos(t, ID(b)), d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
      if (d > 400 || Math.max(ay, by) - cam < -80 || Math.min(ay, by) - cam > 2000) continue
      const sag = Math.max(0, 150 - d) * 0.5, mx = (ax + bx) / 2, my = (ay + by) / 2 + sag - cam
      x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(ax, ay - cam); x.quadraticCurveTo(mx, my, bx, by - cam); x.stroke()
      if (a === 'taurus') { for (let k = 0; k < 8; k++) { const u0 = k / 8, u1 = (k + 1) / 8, q = u => [(1 - u) ** 2 * ax + 2 * u * (1 - u) * mx + u * u * bx, (1 - u) ** 2 * (ay - cam) + 2 * u * (1 - u) * my + u * u * (by - cam)]; const [p0x, p0y] = q(u0), [p1x, p1y] = q(u1); x.strokeStyle = k % 2 ? SIGN.taurus.color : SIGN.cancer.color; x.lineWidth = 8; x.beginPath(); x.moveTo(p0x, p0y); x.lineTo(p1x, p1y); x.stroke() } }
      else { x.strokeStyle = '#e9d39a'; x.lineWidth = 6; x.beginPath(); x.moveTo(ax, ay - cam); x.quadraticCurveTo(mx, my, bx, by - cam); x.stroke() }
    }
  }
  function stars(cam, t) {
    ropes(cam, t)
    const order = IDS.map((id, i) => [id, i, pos(t, i)]).sort((a, b) => a[2][1] - b[2][1])
    for (const [id, i, [wx, wy]] of order) {
      const sy = wy - cam; if (sy < -80 || sy > 2000) continue
      const sw = SWALLOW[id]; if (sw && t > sw.t && t < sw.t + 0.02) continue
      const s = SIGN[id], fin = FIN[id]
      const hops = fin !== null && t > fin ? [fin + 0.3, fin + 1.0, fin + 1.7] : sw ? [sw.t + 0.05] : null
      const bounce = t > GATE && (fin === null || t < fin) ? Math.sin(t * 9 + i) * 0.04 : 0
      drawStarChar(x, wx, sy - 4, 92, t, { color: s.color, glyph: s.glyph, mood: mood(id, t), seed: i + 2, hops, squash: bounce, look: [Math.sign(Math.sin(t * 0.7 + i)) * 0.6, 0.6] })
      if (id === 'pisces' && t > GATE) tears(wx, sy - 4, t)
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
    PORDER.forEach((pi, p) => {                                       // the pair's place, under the second one home
      const fin = PFIN[pi]; if (t < fin || t > fin + 2.4) return
      const id = FIN[PAIRS[pi][0]] > FIN[PAIRS[pi][1]] ? PAIRS[pi][0] : PAIRS[pi][1]
      const [wx, wy] = pos(t, ID(id)), sy = wy - cam; if (sy < 480 || sy > 1600) return
      label(x, clamp(wx, 160, 860), sy + 78, ORD(p + 1), pop01(t, fin, 0.3, 2) * (1 - ease.inQuad(prog(t, fin + 2.1, fin + 2.4))), { size: 30, bg: p === 0 ? GOLD : BONE, rot: -0.06 })
    })
  }
  function stickers(t) {
    for (const [t0, d, text, bg, ink] of STICK) {
      if (t < t0 || t > t0 + d) continue
      label(x, 540, 560, text, pop01(t, t0 + 0.02, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - 0.3, t0 + d))), { size: 50, bg, color: ink, rot: -0.04 })
    }
  }
  function board(t) {                      // live pairs leaderboard: all six pairs
    const k = clamp((t - GATE - 0.6) / 0.4) * (1 - clamp((t - T.podium + 0.4) / 0.3))
    if (k <= 0) return
    const rank = PAIRS.map((p, pi) => [pi, t >= PFIN[pi] ? 1e6 - PFIN[pi] : (pos(t, ID(p[0]))[1] + pos(t, ID(p[1]))[1]) / 2]).sort((a, b) => b[1] - a[1]).map(r => r[0])
    x.save(); x.globalAlpha = k
    const X = 100, Y = 300, Wd = 330, H = 40
    x.fillStyle = 'rgba(14,9,32,0.86)'; x.fillRect(X - 12, Y - 50, Wd + 24, 50 + 6 * H + 16)
    x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LIVE · PAIRS', X, Y - 24)
    rank.forEach((pi, r) => {
      const y = Y + 16 + r * H, [a, b] = PAIRS[pi]
      x.fillStyle = BONE; x.font = `800 24px ${INTER}`; x.fillText(ORD(r + 1), X, y)
      x.fillStyle = SIGN[a].color; x.fillRect(X + 58, y - 10, 20, 20); x.fillStyle = SIGN[b].color; x.fillRect(X + 80, y - 10, 20, 20)
      x.fillStyle = BONE; x.font = `800 24px ${INTER}`; x.fillText(PNAME(PAIRS[pi]), X + 112, y)
    })
    x.restore()
  }
  function podium(t) {
    const t0 = T.podium; if (t < t0) return
    const a = clamp((t - t0) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.9 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const steps = [[PORDER[1], 290, 1180], [PORDER[0], 540, 1100], [PORDER[2], 790, 1230]]
    steps.forEach(([pi, cx, top], j) => {
      const k = pop01(t, t0 + 0.3 + j * 0.25, 0.4, 1.7); if (k <= 0) return
      x.save(); x.globalAlpha = clamp(k)
      x.fillStyle = INK; x.fillRect(cx - 119, top - 4, 238, 1460 - top + 8)
      x.fillStyle = pi === PORDER[0] ? GOLD : BONE; x.fillRect(cx - 115, top, 230, 1460 - top)
      x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(PORDER.indexOf(pi) + 1), cx, top + 60)
      x.restore()
      PAIRS[pi].forEach((id, q) => drawStarChar(x, cx + (q ? 55 : -55), top - 80 + (1 - k) * 60, 120, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: pi === PORDER[0] ? 'heart' : 'happy', seed: j * 2 + q + 5, hops: [t0 + 1.2 + j * 0.3 + q * 0.15, t0 + 2.6 + j * 0.3, t0 + 4 + j * 0.3 + q * 0.15], pop: clamp(k) }))
      x.save(); x.globalAlpha = clamp(k); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'
      x.fillText(SIGN[PAIRS[pi][0]].name, cx, top - 210); x.fillText('& ' + SIGN[PAIRS[pi][1]].name, cx, top - 174); x.restore()
    })
    if (t > t0 + 0.6) sparkles(x, t, 540, 900, t0 + 0.6, 14, 260, 7)
    const hk = pop01(t, t0 + 0.2, 0.4, 1.6) * (1 - ease.inQuad(prog(t, t0 + 4.2, t0 + 4.6)))
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); x.textAlign = 'center'; x.font = `800 60px ${INTER}`; x.fillStyle = BONE; x.fillText('Back of the pack in Race 1.', 540, 520); x.fillStyle = GOLD; x.fillText('First in Race 2.', 540, 596); x.restore() }
    const lk = pop01(t, t0 + 1.8, 0.4, 1.7)
    if (lk > 0) {
      const [la, lb] = PAIRS[PI_OF('libra')]
      drawStarChar(x, 230, 1610, 104, t, { color: SIGN[la].color, glyph: SIGN[la].glyph, mood: 'happy', seed: 9, pop: clamp(lk), hops: [t0 + 2.6, t0 + 3.8] })
      drawStarChar(x, 340, 1610, 104, t, { color: SIGN[lb].color, glyph: SIGN[lb].glyph, mood: 'wink', seed: 10, pop: clamp(lk), hops: [t0 + 2.8, t0 + 4.0] })
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `800 36px ${INTER}`; x.fillStyle = BONE; x.fillText('Libra & Gemini: last.', 410, 1588)
      x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('Everyone waited.', 410, 1638)
      x.restore()
    }
    const ek = pop01(t, t0 + 4.6, 0.45, 1.5)
    if (ek > 0) {
      x.save(); x.globalAlpha = clamp(ek); x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.fillText("Fastest isn't the point.", 540, 520)
      x.font = `italic 500 64px 'EB Garamond', Georgia, serif`; x.fillStyle = GOLD; x.fillText('Your pace, together, is.', 540, 596)
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
    },
  }
}
export const SCENES = [build]

// quiet cue sheet: gate, a soft knock for each binary-star / comet hit, a low whoomp for the swallow, a pop per pair home
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
const hits = []; for (const e of SIM.events) if (e.kind === 'sun' || e.kind === 'comet') { if (!hits.some(h => Math.abs(h - e.t) < 1.2)) hits.push(e.t) }
export const CUES = [
  ['pluck', r2(GATE), 784, 0.03, 0.4, 0],
  ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
  ...hits.map(h => ['pluck', r2(h), 392, 0.02, 0.3, 0]),
  ['whoosh', r2(T.swallow), 0.9, 0.03],
  ...PORDER.map((pi, p) => ['pop', r2(PFIN[pi]), NOTE[(5 - p) % 6], 0.02, 0]),
  ['bell', r2(T.win + 0.05), 1760, 0.02, 1.6, 0],
  ['glitter', r2(T.podium + 0.6), r2(T.podium + 1.4)],
  ['bell', r2(T.podium + 0.4), 1318.5, 0.018, 1.8, 0],
].sort((a, b) => a[1] - b[1])
