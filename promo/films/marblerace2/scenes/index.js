// marblerace2 · Race 2 "Your pace, together." The pairs race on COURSE3: a narrow, built, fast course filmed close.
// HYPERSPACE boost ramps · AIRLOCK door (the pack piles up, then pours) · BOUNCE NEBULA trampolines · GALAXY WHEEL ·
// TRAPDOORS on timers · BLACK HOLE (back up to the airlock) · SATURN'S RINGS spiral (the overtaking zone) · SUPERNOVA ·
// MERCURY RETROGRADE · ASTEROID PINBALL · FINAL AIRLOCK · FINAL SPRINT. Twelve stars tied in pairs with 150 px ropes.
// Story (seed 470, baked in marblerace/scenes/race2.js): Leo & Aries, then Pisces & Scorpio, then Capricorn &
// Aquarius fall into the black hole (back to the airlock) · Libra & Gemini lead the whole final stretch and reach THE
// LAST DOOR first · the door opens, they're through… and the last-second black hole takes them · Taurus & Cancer beat
// Sagittarius & Virgo by 0.008 s (slow motion + a photo-finish freeze) · Libra & Gemini still come back for 3rd.
// Film time ≠ race time: the race runs at full speed except a slow-motion window around the finish (simT / filmT).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../sky.js'
import { SKY_H, SIGNS } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { bubble, label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO } from '../../signs3kit.js'
import { FPS, GATE, COURSE3, wheelSpokes, retroOn } from '../../marblerace/scenes/race.js'
import { RACE2, RACE2_FRAMES } from '../../marblerace/scenes/race2.js'

export const HOOK = 'Race 2: pairs. | The hardest course yet.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.4

const C = COURSE3, FIN_Y = C.FINISH, LW = C.LW, RW = C.RW, ZOOM = 1.38, VIEW = 1920 / ZOOM
const SIM = (() => { const bin = atob(RACE2_FRAMES), u8 = new Uint8Array(bin.length); for (let k = 0; k < bin.length; k++) u8[k] = bin.charCodeAt(k); return { ...RACE2, frames: new Float32Array(u8.buffer) } })()
const IDS = SIM.ids, N = SIM.n, NF = SIM.frames.length / (N * 2)
const SIGN = Object.fromEntries(SIGNS.map(s => [s.id, s]))
const ID = id => IDS.indexOf(id)
const fi = s => Math.max(0, Math.min(NF - 1, s * FPS))
function pos(s, i) {          // interpolated world position (no smear across a black-hole jump)
  const f = fi(s), a = Math.floor(f), b = Math.min(NF - 1, a + 1), u = f - a, A = (a * N + i) * 2, B = (b * N + i) * 2, fr = SIM.frames
  if (Math.abs(fr[B + 1] - fr[A + 1]) > 900) return u < 0.5 ? [fr[A], fr[A + 1]] : [fr[B], fr[B + 1]]
  return [lerp(fr[A], fr[B], u), lerp(fr[A + 1], fr[B + 1], u)]
}
const FIN = SIM.finishT, PAIRS = SIM.pairs                                            // PAIRS in finishing order
const PNAME = ([a, b]) => `${SIGN[a].name} & ${SIGN[b].name}`
const PFIN = PAIRS.map(p => Math.max(FIN[p[0]], FIN[p[1]]))
const PI_OF = id => PAIRS.findIndex(p => p.includes(id))
const SWALLOWS = SIM.events.filter(e => e.kind === 'swallow')
const HOLE = C.A[0], RETRO = C.Z[0], NOVA = C.X[0]
const r2 = v => Math.round(v * 100) / 100
const pairY = (pi, s) => (Math.min(pos(s, ID(PAIRS[pi][0]))[1], FIN_Y + 80) + Math.min(pos(s, ID(PAIRS[pi][1]))[1], FIN_Y + 80)) / 2
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th')
const sw = id => SWALLOWS.find(e => e.id === id)?.t

// ── race beats (race seconds)
const W1 = PFIN[0], W2 = PFIN[1], W3 = PFIN[2]
const swOf = (id, k = 0) => SWALLOWS.filter(e => e.id === id)[k]?.t
export const T = {
  gate: GATE, holes: 18.9, la: swOf('leo'), ps: swOf('scorpio'), ca: swOf('capricorn'), exitView: 23.6, again: swOf('leo', 1),
  door: 50.5, lg: swOf('libra'), win: W1, second: W2, third: W3, meanwhile: 54.9,
}
T.podium = r2(W3 + 0.7)
// ── time map: race time runs at SLOW× from just before the door opens to just after 2nd, with a FREEZE at the win
const SA = r2(W1 - 1.4), SB = r2(W2 + 0.3), SLOW = 0.3, FZ = 1.6
const A1 = SA + (W1 - SA) / SLOW, A2 = A1 + FZ + (SB - W1) / SLOW
export const simT = f => f < SA ? f : f < A1 ? SA + (f - SA) * SLOW : f < A1 + FZ ? W1 : f < A2 ? W1 + (f - A1 - FZ) * SLOW : f - A2 + SB
export const filmT = s => s < SA ? s : s < W1 ? SA + (s - SA) / SLOW : s < SB ? A1 + FZ + (s - W1) / SLOW : s - SB + A2
export const DURATION = r2(filmT(T.podium) + 9.2)
export const STORY_END = DURATION
const MARGIN = (W2 - W1).toFixed(3)

// lead changes between pairs (for the LEAD CHANGE! counter), from the baked race
const LEADS = (() => {
  const out = []; let cur = -1
  for (let f = Math.round(5 * FPS); f < NF; f += 6) { const s = f / FPS; if (s > W1) break
    const prog = PAIRS.map((p, i) => s >= PFIN[i] ? 1e6 : pairY(i, s)); let L = 0; prog.forEach((v, i) => { if (v > prog[L]) L = i })
    if (L !== cur) { if (cur >= 0 && (!out.length || s - out[out.length - 1].s > 0.9)) out.push({ s, pi: L }); cur = L } }
  return out.filter(l => l.s > 24)
})()

// ── camera: world y at the top of the view (VIEW world px tall), precomputed per race frame; hard cuts on beats
const DUO = [PI_OF('taurus'), PI_OF('sagittarius')]
const START_CAM = Math.round(C.SHELF[1] - 1020 / ZOOM)              // opening shot: the shelf mid-frame, under the title
const CAM = (() => {
  const out = new Float32Array(NF)
  const lead = s => { const y = PAIRS.map((p, i) => s >= PFIN[i] ? -1 : pairY(i, s)).sort((a, b) => b - a); return Math.max(y[0] - VIEW * 0.78, Math.min((y[0] + y[2]) / 2 - VIEW * 0.55, y[0] - VIEW * 0.45)) }
  const target = s => {
    if (s < GATE + 0.3) return START_CAM
    if (s > T.holes && s < T.exitView) return HOLE.y - VIEW * 0.55                           // three pairs, one black hole
    if (s >= T.exitView && s < T.exitView + 1.8) return HOLE.exit[1] - VIEW * 0.4            // …back at the airlock
    if (s > T.again - 0.7 && s < T.again + 0.45) return HOLE.y - VIEW * 0.55                  // Leo & Aries: again
    if (s < T.door) return lead(s)
    if (s < W2 + 0.6) return 16480 + 150 - VIEW                                             // THE LAST DOOR → the line
    if (s < T.meanwhile) return 16480 + 150 - VIEW
    if (s < T.podium) return Math.min(pairY(2, s) - VIEW * 0.55, FIN_Y + 150 - VIEW)         // Libra & Gemini come back for 3rd
    return FIN_Y + 150 - VIEW
  }
  let c = START_CAM
  const cuts = [T.holes, T.exitView, T.exitView + 1.8, T.again - 0.7, T.again + 0.45, T.door, T.meanwhile]
  for (let f = 0; f < NF; f++) {
    const s = f / FPS, tg = target(s)
    if (cuts.some(k => Math.abs(s - k) < 0.5 / FPS) || Math.abs(tg - c) > 1600) c = tg
    else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / (s < GATE + 1.5 ? 0.5 : 0.2)))
    out[f] = c
  }
  return out
})()
const camAt = s => { const f = fi(s), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return lerp(CAM[a], CAM[b], f - a) }

// ── reactions: [race s, seconds, sign, text] (shown only while the speaker is on screen)
const SAY = [
  [GATE + 0.15, 1.6, 'aries', 'GO GO GO!!'],
  [5.0, 1.6, 'leo', 'I lead, | you shine!'], [6.9, 1.2, 'aries', 'deal!'],
  [9.4, 1.5, 'pisces', "we're | flying!"], [12.0, 1.4, 'taurus', 'our pace.'], [14.5, 1.4, 'libra', 'left? | right?'],
  [16.6, 1.7, 'scorpio', 'the plan: | the black hole.'],
  [19.2, 0.9, 'leo', 'shortcut!'], [20.3, 0.9, 'aries', 'NOT a | shortcut!!'], [20.6, 0.7, 'scorpio', 'on three...'],
  [22.2, 0.9, 'capricorn', 'what are | they DOING?'], [22.6, 0.6, 'aquarius', 'ooh, | can we?'],
  [T.exitView + 0.2, 1.4, 'capricorn', 'WHY did we | do that?'],
  [26.6, 1.4, 'gemini', "we're | FIRST!"], [28.4, 1.4, 'libra', 'is that... | good?'], [30.4, 1.2, 'taurus', 'steady.'], [32.2, 1.5, 'virgo', 'Libra is | leading??'],
  [T.again - 0.6, 0.6, 'aries', 'not AGAIN'],
  [37.0, 1.2, 'sagittarius', 'passing!'], [39.2, 1.4, 'cancer', "gravity's | going UP!"], [41.0, 1.4, 'virgo', 'not in | the plan!'], [42.8, 1.0, 'taurus', 'float.'],
  [44.6, 1.3, 'sagittarius', 'catch | them!'], [46.8, 1.3, 'gemini', 'still | FIRST!'], [48.6, 1.3, 'libra', 'is that | a door?'],
  [T.door + 0.1, 0.7, 'gemini', "we're | first!"], [T.door + 0.4, 0.5, 'cancer', 'the door!'],
  [51.3, 0.35, 'virgo', 'OPEN!'], [51.6, 0.3, 'libra', 'we did it!'],
  [51.92, 0.25, 'taurus', 'now.'], [52.17, 0.07, 'gemini', 'NOOO—'],
  [W2 + 0.2, 1.0, 'cancer', 'we... | won?'], [W2 + 1.3, 1.1, 'virgo', 'by WHAT?'],
  [T.meanwhile + 0.9, 1.3, 'libra', 'we were | FIRST.'], [T.meanwhile + 2.4, 1.2, 'gemini', 'still | 3rd!!'],
]
const STICK = [            // story stickers (screen space): [race s, seconds, text, bg]
  [T.la + 0.02, 0.5, 'BLACK HOLE!!', PINK], [T.ps + 0.02, 0.5, 'BLACK HOLE!!', PINK], [T.ca + 0.02, 0.36, 'BLACK HOLE!!', PINK],
  [T.exitView + 0.02, 1.7, '3 PAIRS: BACK TO THE AIRLOCK.', GOLD],
  [T.again + 0.02, 0.4, 'LEO & ARIES… AGAIN.', PINK],
  [T.door + 0.02, 0.32, 'THE LAST DOOR.', '#ff5a6e'],
  [T.lg - 0.06, W1 - T.lg + 0.061, 'LAST-SECOND BLACK HOLE!!', PINK],
  [W2 + 0.02, 0.6, `BY ${MARGIN} SECONDS.`, GOLD],
  [T.meanwhile + 0.05, 1.6, 'MEANWHILE… LIBRA & GEMINI.', BONE],
]
// section banners: when the race leader enters each section
const BANNERS = (() => {
  const out = []
  for (const sec of C.SECTIONS) { for (let f = 0; f < NF; f += 3) { const s = f / FPS; if (s > W1) break; if (PAIRS.some((p, i) => pairY(i, s) > sec.y0 + 40)) { out.push({ s, sec }); break } } }
  return out.filter(b => b.s > GATE + 0.5)
})()

function mood(id, s) {
  const pi = PI_OF(id), fin = PFIN[pi]
  if (s > fin) return pi === 0 ? 'heart' : pi < 3 ? 'happy' : 'wink'
  if (s < GATE) return id === 'aries' || id === 'leo' ? 'squint' : 'happy'
  if (SWALLOWS.some(e => e.id === id && s > e.t && s < e.t + 2.0)) return 'wide'
  if (pi <= 1 && s > T.duel) return 'squint'
  if (RETRO && retroOn(RETRO, s)) { const y = pos(s, ID(id))[1]; if (y > RETRO.y0 && y < RETRO.y1) return 'wide' }
  return id === 'taurus' || id === 'cancer' ? 'happy' : id === 'capricorn' ? 'squint' : 'happy'
}
const secAt = y => C.SECTIONS.find(q => y >= q.y0 && y < q.y1) || null
const secCol = y => secAt(y)?.col || '#8fe3ff'

async function build(stage) {
  try { await Promise.all(["800 34px Inter", "800 42px Inter", "800 64px Inter", "800 220px Inter", "700 26px 'Space Mono'", "italic 500 56px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) {}
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sxx = skyC.getContext('2d')
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { S, P, W, SHELF } = C
  const isWall = s => s[0] === s[2] && Math.abs(s[3] - s[1]) > 5000
  const vis = (y, cam, m = 200) => y > cam - m && y < cam + VIEW + m
  const disc = (cx, cy, r, col) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  const toScreen = (wx, wy, cam) => [540 + (wx - 540) * ZOOM, (wy - cam) * ZOOM]

  function tube(x1, y1, x2, y2, th, col, glow = 0) {       // a glossy rail
    x.lineCap = 'round'
    if (glow) { x.save(); x.shadowColor = col; x.shadowBlur = glow; x.strokeStyle = col; x.lineWidth = th + 4; x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); x.restore() }
    x.strokeStyle = INK; x.lineWidth = th + 12; x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke()
    x.strokeStyle = col; x.lineWidth = th + 4; x.stroke()
    x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = Math.max(2, th * 0.3); x.beginPath(); x.moveTo(x1, y1 - th * 0.28); x.lineTo(x2, y2 - th * 0.28); x.stroke()
  }
  function backdrop(cam, s, t) {
    for (const q of C.SECTIONS) {
      if (q.y1 < cam - 50 || q.y0 > cam + VIEW + 50) continue
      const g = x.createLinearGradient(0, q.y0, 0, q.y1); g.addColorStop(0, q.col + '30'); g.addColorStop(0.5, q.col + '14'); g.addColorStop(1, q.col + '26')
      x.fillStyle = g; x.fillRect(LW, q.y0, RW - LW, q.y1 - q.y0)
      x.strokeStyle = q.col + '18'; x.lineWidth = 2
      for (let gy = Math.ceil(q.y0 / 120) * 120; gy < q.y1; gy += 120) { x.beginPath(); x.moveTo(LW, gy); x.lineTo(RW, gy); x.stroke() }
      for (let gx = LW + 70; gx < RW; gx += 140) { x.beginPath(); x.moveTo(gx, q.y0); x.lineTo(gx, q.y1); x.stroke() }
      // side panels with running lights, and neon walls
      for (const side of [-1, 1]) {
        const wx = side < 0 ? LW - 60 : RW + 60
        x.fillStyle = '#0b0820'; x.fillRect(side < 0 ? LW - 120 : RW + 8, q.y0, 112, q.y1 - q.y0)
        for (let ly = q.y0 + 30; ly < q.y1; ly += 90) { const on = Math.sin(t * 5 - ly * 0.01) > 0.2; x.fillStyle = on ? q.col : q.col + '44'; x.fillRect(wx - 7, ly, 14, 14) }
        x.save(); x.shadowColor = q.col; x.shadowBlur = 24; x.strokeStyle = q.col; x.lineWidth = 10
        x.beginPath(); x.moveTo(side < 0 ? LW : RW, q.y0); x.lineTo(side < 0 ? LW : RW, q.y1); x.stroke(); x.restore()
        x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo((side < 0 ? LW : RW) + side * 9, q.y0); x.lineTo((side < 0 ? LW : RW) + side * 9, q.y1); x.stroke()
      }
    }
  }
  function zones(cam, s) {
    if (RETRO && vis(RETRO.y0, cam, 900)) {
      const on = retroOn(RETRO, s)
      x.fillStyle = on ? 'rgba(255,120,190,0.20)' : 'rgba(255,120,190,0.06)'; x.fillRect(LW, RETRO.y0, RW - LW, RETRO.y1 - RETRO.y0)
      if (on) { x.fillStyle = PINK; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; for (let k = 0; k < 4; k++) { const ay = RETRO.y1 - ((s * 300 + k * 190) % (RETRO.y1 - RETRO.y0)); x.fillText('↑', 270 + k * 180, ay) } }
    }
    if (NOVA && vis(NOVA.y, cam, 500)) {
      const ph = ((s % NOVA.period) + NOVA.period) % NOVA.period, warn = ph > NOVA.period - 0.8
      if (ph < 0.6) { x.strokeStyle = `rgba(255,240,180,${(0.85 * (1 - ph / 0.6)).toFixed(3)})`; x.lineWidth = 18; x.beginPath(); x.arc(NOVA.x, NOVA.y, 60 + ph * 800, 0, Math.PI * 2); x.stroke() }
      const pulse = warn ? 1 + 0.14 * Math.sin(s * 40) : 1
      for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 + s, rr = (NOVA.core + 22 + 10 * Math.sin(s * 6 + k)) * pulse; x.fillStyle = warn ? '#ffffff' : '#ffd36b'; x.fillRect(NOVA.x + Math.cos(a) * rr - 7, NOVA.y + Math.sin(a) * rr - 7, 14, 14) }
    }
    for (const H of C.A) {
      if (!(H.horizon > 0)) continue
      if (vis(H.y, cam, 400)) {
        const hot = H.name === 'lastdoor' ? '#ff3a4e' : '#ff9a3c'
        for (let k = 0; k < 48; k++) { const a = s * (1.6 + (k % 5) * 0.25) + k * 0.73, rr = 52 + (k * 37 % 90); x.fillStyle = k % 3 ? hot : '#c9a6ff'; x.fillRect(H.x + Math.cos(a) * rr - 5, H.y + Math.sin(a) * rr * 0.45 - 5, 10, 10) }
        for (let k = 4; k >= 1; k--) { x.fillStyle = `rgba(120,60,200,${0.08 * k})`; x.beginPath(); x.arc(H.x, H.y, 48 + k * 26, 0, Math.PI * 2); x.fill() }
        x.fillStyle = '#000'; x.beginPath(); x.arc(H.x, H.y, 48, 0, Math.PI * 2); x.fill(); x.strokeStyle = hot; x.lineWidth = 5; x.stroke()
        for (const e of SWALLOWS) { if (e.hole !== H.name) continue; const d = s - e.t; if (d < 0 || d > 0.7) continue; const k = 1 - d / 0.7, a = d * 14; drawStarChar(x, H.x + Math.cos(a) * 60 * k, H.y + Math.sin(a) * 30 * k, 92 * k, s, { color: SIGN[e.id].color, mood: 'wide', seed: 3 }) }
      }
      const [ex, ey] = H.exit
      if (vis(ey, cam, 300)) { for (let k = 0; k < 26; k++) { const a = -s * 2.4 + k * 0.48, rr = 36 + (k % 6) * 10; x.fillStyle = k % 2 ? '#8fe3ff' : BONE; x.fillRect(ex + Math.cos(a) * rr - 4, ey + Math.sin(a) * rr * 0.5 - 4, 8, 8) }
        for (const e of SWALLOWS) { if (e.hole !== H.name) continue; const d = s - e.t; if (d >= 0 && d < 0.6) sparkles(x, s, ex, ey, e.t, 12, 160, 5) } }
    }
  }
  function rails(cam, s, t) {
    for (const sg of S) {
      if (isWall(sg)) continue
      const [x1, y1, x2, y2, th, o] = sg
      if (Math.max(y1, y2) < cam - 60 || Math.min(y1, y2) > cam + VIEW + 60) continue
      const col = secCol((y1 + y2) / 2)
      if (o && o.gate) {                                   // a laser door: red when closed, faint when open
        const ph = ((s % o.gate.period) + o.gate.period) % o.gate.period, open = ph < o.gate.on
        if (open) { x.save(); x.setLineDash([12, 14]); x.strokeStyle = 'rgba(125,255,176,0.45)'; x.lineWidth = 6; x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); x.restore() }
        else { x.save(); x.shadowColor = '#ff3a4e'; x.shadowBlur = 28; x.strokeStyle = '#ff3a4e'; x.lineWidth = th; x.beginPath(); x.moveTo(x1, y1); x.lineTo(x2, y2); x.stroke(); x.strokeStyle = '#ffd1d6'; x.lineWidth = th * 0.3; x.stroke(); x.restore() }
        for (const [px, py] of [[x1, y1], [x2, y2]]) { disc(px, py, 14, open ? '#7dffb0' : '#ff3a4e') }
        const left = open ? 0 : (o.gate.period - ph) / (o.gate.period - o.gate.on)      // timer ring: fills as the door gets ready
        if (!open) { x.strokeStyle = '#ffd36b'; x.lineWidth = 6; x.beginPath(); x.arc((x1 + x2) / 2, (y1 + y2) / 2 - 46, 20, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - left)); x.stroke() }
        continue
      }
      if (o && o.bounce) {                                 // trampoline: pink with a spring under it
        const nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny); x.strokeStyle = INK; x.lineWidth = 5; x.beginPath()
        for (let k = 0; k <= 10; k++) { const u = k / 10, off = (k % 2 ? 1 : -1) * 10 + 22; x.lineTo(x1 + (x2 - x1) * u + nx / L * off, y1 + (y2 - y1) * u + ny / L * off) } x.stroke()
        tube(x1, y1, x2, y2, th, '#ff8fb1', 18); continue
      }
      tube(x1, y1, x2, y2, th, o && o.boost ? '#bdf4ff' : col, o && o.boost ? 16 : 0)
      if (o && o.boost) {                                  // moving chevrons along the boost rail
        const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L
        for (let d = (s * 420) % 70; d < L; d += 70) { const cx = x1 + ux * d, cy = y1 + uy * d - 2; x.strokeStyle = '#1b6b8a'; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - ux * 10 - uy * 9, cy - uy * 10 + ux * 9); x.lineTo(cx, cy); x.lineTo(cx - ux * 10 + uy * 9, cy - uy * 10 - ux * 9); x.stroke() }
      }
    }
    if (s < GATE + 0.3) { x.save(); x.globalAlpha = clamp(1 - (s - GATE) / 0.3); tube(SHELF[0], SHELF[1], SHELF[2], SHELF[3], 12, GOLD, 18); x.restore() }
    for (const p of P) {
      const [ppx, py, pr, e] = p; if (!vis(py, cam, 80)) continue
      if (pr >= 50) { const g = x.createRadialGradient(ppx, py, 6, ppx, py, pr); g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#ffe08a'); g.addColorStop(1, '#ff8a3c'); x.fillStyle = INK; x.beginPath(); x.arc(ppx, py, pr + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = g; x.beginPath(); x.arc(ppx, py, pr, 0, Math.PI * 2); x.fill(); continue }
      if (e) { x.save(); x.shadowColor = PINK; x.shadowBlur = 20; disc(ppx, py, pr, PINK); x.restore(); x.fillStyle = '#ffd1e0'; x.beginPath(); x.arc(ppx - pr * 0.3, py - pr * 0.3, pr * 0.32, 0, Math.PI * 2); x.fill(); continue }
      x.fillStyle = INK; x.fillRect(ppx - pr - 4, py - pr - 4, 2 * pr + 8, 2 * pr + 8); x.fillStyle = GOLD; x.fillRect(ppx - pr, py - pr, 2 * pr, 2 * pr); x.fillStyle = '#fff3c4'; x.fillRect(ppx - pr + 3, py - pr + 3, 5, 5)
    }
    for (const wh of W) {
      if (!vis(wh.cy, cam, 400)) continue
      x.save(); x.shadowColor = '#c9a6ff'; x.shadowBlur = 30; x.strokeStyle = 'rgba(201,166,255,0.5)'; x.lineWidth = 6; x.beginPath(); x.arc(wh.cx, wh.cy, wh.r1 + 20, 0, Math.PI * 2); x.stroke(); x.restore()
      for (const sp of wheelSpokes(wh, s)) tube(sp[0], sp[1], sp[2], sp[3], sp[4], '#c9a6ff')
      disc(wh.cx, wh.cy, wh.r0, GOLD)
      SIGNS.forEach((sg, i) => { const a = wh.w * s + (i + 0.5) * 2 * Math.PI / 12; x.font = `700 32px 'Segoe UI Symbol', 'Noto Sans Symbols 2', serif`; x.fillStyle = sg.color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sg.glyph + '︎', wh.cx + Math.cos(a) * (wh.r1 + 22), wh.cy + Math.sin(a) * (wh.r1 + 22)) })
    }
    if (vis(FIN_Y, cam, 80)) {
      for (let i = 0; i < 14; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(LW + i * 50, FIN_Y - 26 + j * 26, 50, 26) }
      x.save(); x.shadowColor = GOLD; x.shadowBlur = 24; x.fillStyle = GOLD; x.fillRect(LW, FIN_Y - 32, RW - LW, 6); x.restore()
      label(x, 540, FIN_Y + 70, 'FINISH', 1, { size: 34, bg: GOLD, rot: 0 })
    }
  }
  function tears(cx, cy, s) {
    for (const d of [-1, 1]) for (let q = 0; q < 4; q++) { const ph = ((s * 1.4 + q / 4) % 1), ppx = cx + d * (12 + 22 * ph), py = cy - 6 + 30 * ph * ph; x.fillStyle = INK; x.fillRect(ppx - 4, py - 4, 9, 11); x.fillStyle = '#8fe3ff'; x.fillRect(ppx - 2, py - 2, 5, 7) }
  }
  function ropes(cam, s) {                 // gold ropes; Taurus & Cancer's is the striped scarf
    for (const [a, b] of PAIRS) {
      const [ax, ay] = pos(s, ID(a)), [bx, by] = pos(s, ID(b)), d = Math.hypot(ax - bx, ay - by)
      if (d > 400 || !vis(ay, cam, 120)) continue
      const sag = Math.max(0, 150 - d) * 0.5, mx = (ax + bx) / 2, my = (ay + by) / 2 + sag
      x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo(mx, my, bx, by); x.stroke()
      if (a === 'taurus' || b === 'taurus') { for (let k = 0; k < 8; k++) { const q = u => [(1 - u) ** 2 * ax + 2 * u * (1 - u) * mx + u * u * bx, (1 - u) ** 2 * ay + 2 * u * (1 - u) * my + u * u * by]; const [p0x, p0y] = q(k / 8), [p1x, p1y] = q((k + 1) / 8); x.strokeStyle = k % 2 ? SIGN.taurus.color : SIGN.cancer.color; x.lineWidth = 8; x.beginPath(); x.moveTo(p0x, p0y); x.lineTo(p1x, p1y); x.stroke() } }
      else { x.strokeStyle = '#e9d39a'; x.lineWidth = 6; x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo(mx, my, bx, by); x.stroke() }
    }
  }
  function stars(cam, s) {
    ropes(cam, s)
    const order = IDS.map((id, i) => [id, i, pos(s, i)]).sort((a, b) => a[2][1] - b[2][1])
    for (const [id, i, [wx, wy]] of order) {
      if (!vis(wy, cam, 120)) continue
      if (SWALLOWS.some(e => e.id === id && s > e.t && s < e.t + 0.02)) continue
      const sg = SIGN[id], fin = FIN[id]
      // trail
      let prev = [wx, wy]
      for (let k = 1; k <= 9; k++) { const p = pos(s - k * 0.025, i); if (Math.abs(p[1] - prev[1]) > 300) break; x.strokeStyle = sg.color + (k < 4 ? '88' : '44'); x.lineWidth = Math.max(4, 40 - k * 4); x.lineCap = 'round'; x.beginPath(); x.moveTo(prev[0], prev[1]); x.lineTo(p[0], p[1]); x.stroke(); prev = p }
      const [qx, qy] = pos(s - 0.05, i), sp = Math.hypot(wx - qx, wy - qy) / 0.05
      if (sp > 1150 && sp < 4000) { const ux = (wx - qx) / (sp * 0.05), uy = (wy - qy) / (sp * 0.05); for (let k = -1; k <= 1; k++) { x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 4; x.beginPath(); x.moveTo(wx - ux * 60 - uy * k * 26, wy - uy * 60 + ux * k * 26); x.lineTo(wx - ux * 130 - uy * k * 26, wy - uy * 130 + ux * k * 26); x.stroke() } }
      const last = SWALLOWS.filter(e => e.id === id && e.t <= s).pop()
      const hops = fin !== null && s > fin ? [fin + 0.3, fin + 1.0, fin + 1.7] : last ? [last.t + 0.05] : null
      const bounce = s > GATE && (fin === null || s < fin) ? Math.sin(s * 9 + i) * 0.04 : 0
      drawStarChar(x, wx, wy - 4, 92, s, { color: sg.color, glyph: sg.glyph, mood: mood(id, s), seed: i + 2, hops, squash: bounce, look: [Math.sign(Math.sin(s * 0.7 + i)) * 0.6, 0.6] })
      if (id === 'pisces' && s > GATE) tears(wx, wy - 4, s)
    }
  }
  // ── screen-space layers
  function says(cam, s) {
    for (const [s0, d, id, text] of SAY) {
      if (s < s0 || s > s0 + d) continue
      const [wx, wy] = pos(s, ID(id)), [px, py] = toScreen(wx, wy, cam)
      if (py < 380 || py > 1560) continue
      const k = pop01(s, s0, 0.22, 1.8) * (1 - ease.inQuad(prog(s, s0 + d - 0.2, s0 + d)))
      const bx = clamp(px, 250, 830)
      bubble(x, bx, py - 150, text, k, { size: 46, col: BONE, tail: px < bx - 40 ? 'bl' : px > bx + 40 ? 'br' : 'bc' })
    }
    PAIRS.forEach((p, pi) => {                                         // the pair's place under the second one home
      const fin = PFIN[pi]; if (s < fin || s > fin + 2.4) return
      const id = FIN[p[0]] > FIN[p[1]] ? p[0] : p[1], [px, py] = toScreen(...pos(s, ID(id)), cam); if (py < 480 || py > 1650) return
      label(x, clamp(px, 160, 860), py + 100, ORD(pi + 1), pop01(s, fin, 0.25, 2) * (1 - ease.inQuad(prog(s, fin + 2.1, fin + 2.4))), { size: 36, bg: pi === 0 ? GOLD : BONE, rot: -0.06 })
    })
  }
  function banners(s) {
    for (const [s0, d, text, bg] of STICK) { if (s < s0 || s > s0 + d) continue; label(x, 540, 600, text, pop01(s, s0 + 0.005, Math.min(0.2, d / 3), 1.8) * (1 - ease.inQuad(prog(s, s0 + d - Math.min(0.25, d / 3), s0 + d))), { size: 54, bg, color: INK, rot: -0.04 }) }
    for (const b of BANNERS) { const d = s - b.s; if (d < 0 || d > 1.3 || STICK.some(([s0, dd]) => s > s0 && s < s0 + dd)) continue
      const k = pop01(s, b.s, 0.2, 1.8) * (1 - ease.inQuad(prog(d, 1.0, 1.3))); label(x, 540, 600, '▸ ' + b.sec.name, k, { size: 46, bg: b.sec.col, color: INK, rot: -0.03 }) }
    LEADS.forEach((l, n) => { const d = s - l.s; if (d < 0 || d > 1.1 || s > SA) return
      const k = pop01(s, l.s, 0.18, 2) * (1 - ease.inQuad(prog(d, 0.85, 1.1))); label(x, 540, 700, `LEAD CHANGE #${n + 1}: ${PNAME(PAIRS[l.pi]).toUpperCase()}`, k, { size: 32, bg: BONE, color: INK, rot: 0.02 }) })
  }
  function prompts(s) {                    // comment prompts: pick a winner early, lock it in before the last door
    const P2 = [[2.7, 7.0, 'COMMENT WHICH PAIR WINS ↓'], [T.door - 3.6, 3.4, 'LAST CHANCE: WHO WINS?']]
    for (const [s0, d, text] of P2) { if (s < s0 || s > s0 + d) continue
      const k = pop01(s, s0, 0.25, 1.8) * (1 - ease.inQuad(prog(s, s0 + d - 0.3, s0 + d)))
      label(x, 540, 178, text, k, { size: 40, bg: BONE, color: INK, rot: -0.02 }) }
  }
  function countdown(s) {
    const steps = [[0.35, '3'], [1.05, '2'], [1.75, '1'], [GATE, 'GO!']]
    for (const [s0, txt] of steps) {
      const d = s - s0; if (d < 0 || d > 0.62) continue
      const k = pop01(s, s0, 0.2, 2.2) * (1 - ease.inQuad(prog(d, 0.4, 0.62)))
      x.save(); x.translate(540, 1270); x.scale(k, k); x.font = `800 ${txt === 'GO!' ? 200 : 260}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 22; x.strokeStyle = INK; x.strokeText(txt, 0, 0); x.fillStyle = txt === 'GO!' ? GOLD : BONE; x.fillText(txt, 0, 0); x.restore()
    }
  }
  function board(s) {
    const k = clamp((s - GATE - 0.6) / 0.4) * (1 - clamp((s - T.podium + 0.4) / 0.3)); if (k <= 0) return
    const rank = PAIRS.map((p, pi) => [pi, s >= PFIN[pi] ? 1e6 - PFIN[pi] : pairY(pi, s)]).sort((a, b) => b[1] - a[1]).map(r => r[0])
    x.save(); x.globalAlpha = k
    const X = 96, Y = 300, Wd = 340, H = 40
    x.fillStyle = 'rgba(14,9,32,0.88)'; x.fillRect(X - 12, Y - 50, Wd + 24, 50 + 6 * H + 16)
    x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LIVE · PAIRS', X, Y - 24)
    rank.forEach((pi, r) => { const y = Y + 16 + r * H, [a, b] = PAIRS[pi]
      x.fillStyle = BONE; x.font = `800 24px ${INTER}`; x.fillText(ORD(r + 1), X, y)
      x.fillStyle = SIGN[a].color; x.fillRect(X + 58, y - 10, 20, 20); x.fillStyle = SIGN[b].color; x.fillRect(X + 80, y - 10, 20, 20)
      x.fillStyle = BONE; x.fillText(PNAME(PAIRS[pi]), X + 112, y) })
    x.restore()
  }
  function slowmo(t, s) {
    if (t < SA || s > SB) return
    const k = clamp((t - SA) / 0.3) * (1 - clamp((s - SB + 0.08) / 0.08))
    x.fillStyle = `rgba(0,0,0,${(0.3 * k).toFixed(3)})`; x.fillRect(0, 0, 1080, 150); x.fillRect(0, 1770, 1080, 150)
    x.save(); x.globalAlpha = k; x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.fillText(t > A1 && t < A1 + FZ ? 'PHOTO FINISH ■' : 'SLOW MOTION ▸▸', 1040, 120); x.restore()
    if (t > A1 && t < A1 + FZ) {                         // the freeze: a flash, the finish line lit, the gap
      const d = t - A1, fl = clamp(1 - d / 0.25)
      if (fl > 0) { x.fillStyle = `rgba(255,255,255,${(0.7 * fl).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
      const cam = camAt(s), fy = (FIN_Y - cam) * ZOOM
      x.save(); x.shadowColor = GOLD; x.shadowBlur = 30; x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); x.moveTo(0, fy); x.lineTo(1080, fy); x.stroke(); x.restore()
      label(x, 540, 770, 'PHOTO FINISH', pop01(t, A1 + 0.1, 0.25, 2), { size: 60, bg: GOLD, rot: -0.03 })
    }
  }
  function podium(t, s) {
    const t0 = filmT(T.podium); if (t < t0) return
    const a = clamp((t - t0) / 0.5)
    x.fillStyle = `rgba(8,5,22,${(0.9 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
    const steps = [[1, 290, 1180], [0, 540, 1100], [2, 790, 1230]]
    steps.forEach(([pi, cx, top], j) => {
      const k = pop01(t, t0 + 0.3 + j * 0.25, 0.4, 1.7); if (k <= 0) return
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(cx - 119, top - 4, 238, 1460 - top + 8); x.fillStyle = pi === 0 ? GOLD : BONE; x.fillRect(cx - 115, top, 230, 1460 - top)
      x.fillStyle = INK; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(pi + 1), cx, top + 60); x.restore()
      PAIRS[pi].forEach((id, q) => drawStarChar(x, cx + (q ? 55 : -55), top - 80 + (1 - k) * 60, 120, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: pi === 0 ? 'heart' : 'happy', seed: j * 2 + q + 5, hops: [t0 + 1.2 + j * 0.3 + q * 0.15, t0 + 2.6 + j * 0.3, t0 + 4 + j * 0.3 + q * 0.15], pop: clamp(k) }))
      x.save(); x.globalAlpha = clamp(k); x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(SIGN[PAIRS[pi][0]].name, cx, top - 210); x.fillText('& ' + SIGN[PAIRS[pi][1]].name, cx, top - 174); x.restore()
    })
    if (t > t0 + 0.6) sparkles(x, t, 540, 900, t0 + 0.6, 14, 260, 7)
    const hk = pop01(t, t0 + 0.2, 0.4, 1.6) * (1 - ease.inQuad(prog(t, t0 + 4.2, t0 + 4.6)))
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); x.textAlign = 'center'; x.font = `800 58px ${INTER}`; x.fillStyle = BONE; x.fillText('Back of the pack in Race 1.', 540, 520); x.fillStyle = GOLD; x.fillText(`First by ${MARGIN} seconds.`, 540, 596); x.restore() }
    const lk = pop01(t, t0 + 1.8, 0.4, 1.7)
    if (lk > 0) {
      ;['leo', 'aries'].forEach((id, q) => drawStarChar(x, 220 + q * 110, 1610, 100, t, { color: SIGN[id].color, glyph: SIGN[id].glyph, mood: 'wide', seed: 9 + q, pop: clamp(lk), hops: [t0 + 2.6 + q * 0.12, t0 + 3.8 + q * 0.12] }))
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.fillText('Leo & Aries: 3 black holes.', 400, 1588)
      x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('Still racing.', 400, 1638); x.restore()
    }
    const ek = pop01(t, t0 + 4.6, 0.45, 1.5)
    if (ek > 0) { x.save(); x.globalAlpha = clamp(ek); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.fillText("Fastest isn't the point.", 540, 520); x.font = `italic 500 64px 'EB Garamond', Georgia, serif`; x.fillStyle = GOLD; x.fillText('Your pace, together, is.', 540, 596); x.restore() }
  }

  return {
    start: 0, end: DURATION, root,
    update(t) {
      const s = Math.min(simT(t), T.podium + 0.6), cam = camAt(s)
      drawSky(sxx, t, { ...SKY_H, dy: -cam * 0.03 })
      x.clearRect(0, 0, 1080, 1920)
      let shx = 0, shy = 0
      for (const e of SWALLOWS) { const d = s - e.t; if (d > 0 && d < 0.35) { const a = 14 * (1 - d / 0.35); shx += Math.sin(t * 90) * a; shy += Math.cos(t * 77) * a } }
      x.save(); x.translate(540 + shx, shy); x.scale(ZOOM, ZOOM); x.translate(-540, -cam)
      backdrop(cam, s, t); zones(cam, s); rails(cam, s, t); stars(cam, s)
      x.restore()
      board(s); says(cam, s); banners(s); prompts(s); countdown(s); slowmo(t, s); podium(t, s)
    },
  }
}
export const SCENES = [build]

// quiet cue sheet (film time): countdown ticks, the gate, whoomps for each gulp, pops at each pair home, a bell for the win
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
const gulps = []; for (const e of SWALLOWS) if (!gulps.some(g => Math.abs(g - e.t) < 0.3)) gulps.push(e.t)
export const CUES = [
  ['pluck', 0.35, 523.25, 0.03, 0.3, 0], ['pluck', 1.05, 523.25, 0.03, 0.3, 0], ['pluck', 1.75, 523.25, 0.03, 0.3, 0],
  ['pluck', r2(GATE), 1046.5, 0.035, 0.5, 0], ['whoosh', r2(GATE + 0.05), 0.6, 0.025],
  ...gulps.map(g => ['whoosh', r2(filmT(g)), 0.9, 0.035]),
  ...LEADS.map(l => ['pluck', r2(filmT(l.s)), 784, 0.015, 0.25, 0]),
  ...PAIRS.map((p, pi) => PFIN[pi] < T.podium ? ['pop', r2(filmT(PFIN[pi])), NOTE[(5 - pi) % 6], 0.022, 0] : null).filter(Boolean),
  ['bell', r2(A1 + 0.05), 1760, 0.024, 2.2, 0], ['glitter', r2(A1 + 0.1), r2(A1 + 0.9)],
  ['glitter', r2(filmT(T.podium) + 0.6), r2(filmT(T.podium) + 1.4)],
  ['bell', r2(filmT(T.podium) + 0.4), 1318.5, 0.018, 1.8, 0],
].sort((a, b) => a[1] - b[1])
