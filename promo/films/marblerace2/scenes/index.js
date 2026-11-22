// marblerace2 · Race 2 "Your pace, together." The pairs race on a new, wilder course (COURSE2): the twelve stars race
// tied in twos with 150 px ropes through BIG BANG drops · a METEOR SHOWER · PULSAR beams · SOLAR FLARE wind · TWIN BLACK
// HOLES (left: back to the start · right: a shortcut) · a SUPERNOVA · MERCURY RETROGRADE · ASTEROID PINBALL · JUPITER
// and its moons · COMET ALLEY · and the EVENT HORIZON, a last black hole that throws you back up to the meteors.
// Story (seed 44, baked in marblerace/scenes/race2.js): Leo & Aries fall into the left hole (back to the start) ·
// Scorpio's plan: the right hole, the shortcut… and 0.6 s later the event horizon (back to the meteors) · Sagittarius &
// Virgo and Capricorn & Aquarius trade the lead for twenty seconds · the event horizon takes Sagittarius & Virgo too ·
// Taurus & Cancer, behind all race, pass Capricorn & Aquarius at the very end and win by 0.12 s.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../sky.js'
import { SKY_H, SIGNS } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { bubble, label, sparkles, pop01, GOLD, BONE, PINK, INK, INTER, MONO } from '../../signs3kit.js'
import { FPS, GATE, COURSE2, FINISH_Y2, wheelSpokes, retroOn } from '../../marblerace/scenes/race.js'
import { RACE2, RACE2_FRAMES } from '../../marblerace/scenes/race2.js'

export const HOOK = 'Race 2: pairs. | New course. No mercy.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.6

const C = COURSE2, FINISH_Y = FINISH_Y2
const SIM = (() => { const bin = atob(RACE2_FRAMES), u8 = new Uint8Array(bin.length); for (let k = 0; k < bin.length; k++) u8[k] = bin.charCodeAt(k); return { ...RACE2, frames: new Float32Array(u8.buffer) } })()
const IDS = SIM.ids, N = SIM.n, NF = SIM.frames.length / (N * 2)
const SIGN = Object.fromEntries(SIGNS.map(s => [s.id, s]))
const ID = id => IDS.indexOf(id)
const fi = t => Math.max(0, Math.min(NF - 1, t * FPS))
function pos(t, i) {          // interpolated world position (no smear across a black-hole jump)
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
const SWALLOWS = SIM.events.filter(e => e.kind === 'swallow')                        // every gulp: { t, id, hole }
const HOLES = C.A.filter(a => a.horizon > 0), JUP = C.A.find(a => a.name === 'jupiter')
const HOLE = HOLES[0], RETRO = C.Z.find(z => z.g < 0), FLARE = C.Z.find(z => z.wx), NOVA = C.X[0]
const EXITS = HOLES.map(a => ({ at: a.exit, from: a.name }))
const r2 = v => Math.round(v * 100) / 100
const sw = (id, hole) => SWALLOWS.find(e => e.id === id && e.hole === hole)?.t
const PODIUM_AFTER = PFIN[PORDER[2]]                                                  // the podium is set once 3rd is home
const T_LAST = PODIUM_AFTER
export const T = {
  gate: GATE, holes: 16.0, left: sw('leo', 'start'), right: sw('scorpio', 'shortcut'), exitCut: 19.95, horizon1: sw('scorpio', 'horizon'),
  meteors: 21.6, meanwhile: 23.2, horizonHold: 43.9, horizon2: sw('sagittarius', 'horizon'), final: 45.2,
  win: PFIN[PORDER[0]], second: PFIN[PORDER[1]], line: 53.0, again: 54.4, again2: sw('sagittarius', 'start'), third: 56.6, thirdT: PFIN[PORDER[2]],
}
T.podium = r2(PODIUM_AFTER + 1.2)
export const DURATION = r2(T.podium + 9.2)
export const STORY_END = DURATION

// ── camera (world y at the top of the frame), precomputed and smoothed; hard cuts between story beats
const clampY = y => Math.min(y, FINISH_Y + 60)
const yOf = id => t => clampY(pos(t, ID(id))[1])
const mid2 = (a, b) => t => (yOf(a)(t) + yOf(b)(t)) / 2
const pairY = (pi, t) => mid2(...PAIRS[pi])(t)
const CAM = (() => {
  const out = new Float32Array(NF)
  const lead = (t, pis) => { const y = pis.map(pi => pairY(pi, t)).sort((a, b) => b - a); return Math.max(y[0] - 1350, Math.min((y[0] + y[1]) / 2 - 1000, y[0] - 700)) }
  const front3 = [PI_OF('sagittarius'), PI_OF('capricorn'), PI_OF('taurus')]
  const target = t => {
    if (t < GATE + 0.2) return -330
    if (t < T.holes) return lead(t, PAIRS.map((p, i) => i))
    if (t < T.exitCut) return 7050 - 1080                                              // the twin black holes
    if (t < T.meteors) return C.A.find(a => a.name === 'shortcut').exit[1] - 880         // the shortcut… and the horizon
    if (t < T.meanwhile) return 2650 - 1000                                            // back with the meteors
    if (t < T.horizonHold) return lead(t, front3)                                      // the duel at the front
    if (t < T.final) return HOLES.find(a => a.name === 'horizon').y - 1050               // the event horizon again
    if (t < T.line) return (pairY(PI_OF('taurus'), t) + pairY(PI_OF('capricorn'), t)) / 2 - 1000   // the final stretch
    if (t < T.again) return FINISH_Y - 1150                                            // the line
    if (t < T.third) return 7050 - 1080                                                // Sagittarius & Virgo: the left hole
    if (t < T.podium) return Math.min(pairY(PI_OF('libra'), t) - 1000, FINISH_Y - 1150)
    return FINISH_Y - 1150
  }
  let c = -330
  const cuts = [T.holes, T.exitCut, T.meteors, T.meanwhile, T.horizonHold, T.final, T.line, T.again, T.third]
  for (let f = 0; f < NF; f++) {
    const t = f / FPS, tg = target(t)
    if (cuts.some(k => Math.abs(t - k) < 0.5 / FPS)) c = tg
    else c += (tg - c) * (1 - Math.exp(-(1 / FPS) / (t < GATE + 1.5 ? 0.5 : 0.22)))
    out[f] = c
  }
  return out
})()
const camAt = t => { const f = fi(t), a = Math.floor(f), b = Math.min(NF - 1, a + 1); return lerp(CAM[a], CAM[b], f - a) }

// ── reactions: [t0, seconds, sign, text] (shown only while the speaker is on screen)
const SAY = [
  [GATE + 0.15, 1.7, 'aries', 'GO GO GO!!'],
  [4.6, 1.6, 'scorpio', 'follow | the plan.'],
  [6.4, 1.5, 'pisces', "we're | FIRST!"],
  [9.6, 1.4, 'libra', 'left? | right?'],
  [12.2, 1.6, 'leo', 'I lead, | you shine!'],
  [14.0, 1.2, 'aries', 'deal!'],
  [16.3, 1.6, 'libra', 'left hole | or right?'],
  [18.0, 1.0, 'scorpio', 'right. | on three.'],
  [T.left + 0.1, 0.9, 'aries', 'LEFT??'],
  [T.exitCut + 0.02, 0.55, 'scorpio', "we're | winni—"],
  [T.meteors + 0.25, 1.4, 'pisces', 'that was | so fast.'],
  [T.meanwhile + 0.9, 1.5, 'cancer', "gravity's | going UP!"],
  [T.meanwhile + 2.6, 1.4, 'taurus', 'just | float.'],
  [T.meanwhile + 4.2, 1.6, 'virgo', 'this is | not the plan.'],
  [T.meanwhile + 6.0, 1.6, 'capricorn', "we're first. | hold it."],
  [T.meanwhile + 7.8, 1.6, 'sagittarius', "no, WE'RE | first!"],
  [T.meanwhile + 9.6, 1.2, 'aquarius', 'boing!'],
  [34.2, 1.4, 'virgo', 'a MOON?!'],
  [36.4, 1.4, 'capricorn', 'focus.'],
  [39.1, 1.3, 'aquarius', 'COMET!'],
  [41.3, 1.2, 'taurus', 'ow.'],
  [42.6, 1.3, 'sagittarius', "we're | winning!"],
  [T.final + 0.5, 1.6, 'capricorn', 'not 2nd | again.'],
  [T.final + 2.4, 1.6, 'cancer', "they're | so fast."],
  [T.final + 4.3, 1.4, 'taurus', 'our pace.'],
  [T.win - 1.4, 0.9, 'cancer', '...now?'],
  [T.win - 0.45, 0.8, 'taurus', 'now.'],
  [T.win + 0.15, 1.3, 'cancer', 'did we...?'],
  [T.third + 0.2, 1.0, 'libra', 'we never | chose!'],
  [T.thirdT + 0.15, 1.3, 'gemini', '3rd!!'],
]
const STICK = [            // big story stickers (screen space)
  [8.8, 1.6, 'METEOR SHOWER!', GOLD, INK],
  [T.holes + 0.05, 1.6, 'TWIN BLACK HOLES.', PINK, INK],
  [T.left + 0.02, 0.48, 'LEFT HOLE!!', PINK, INK],
  [T.right + 0.02, 0.32, 'SHORTCUT!!', GOLD, INK],
  [T.exitCut + 0.02, 0.27, 'SHORTCUT!!', GOLD, INK],
  [T.horizon1 + 0.02, 1.3, '…EVENT HORIZON.', PINK, INK],
  [T.meteors + 0.02, 1.5, '…BACK TO THE METEORS.', GOLD, INK],
  [T.meanwhile, 1.8, 'MEANWHILE, UP FRONT…', GOLD, INK],
  [T.horizon2 + 0.02, 1.0, 'EVENT HORIZON!!', PINK, INK],
  [T.final + 0.02, 1.6, 'FINAL STRETCH.', GOLD, INK],
  [T.line + 0.05, 2.0, 'BY 0.12 SECONDS.', GOLD, INK],
  [T.again + 0.05, 0.8, 'SAGITTARIUS & VIRGO…', BONE, INK],
  [T.again2 + 0.03, 1.2, '…AGAIN.', PINK, INK],
]
const ORD = n => n + (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th')

function mood(id, t) {
  const pi = PI_OF(id), fin = PFIN[pi], place = PORDER.indexOf(pi)
  if (t > fin) return place === 0 ? 'heart' : place < 3 ? 'happy' : 'wink'
  if (t < GATE) return id === 'aries' || id === 'leo' ? 'squint' : 'happy'
  if (SWALLOWS.some(e => e.id === id && t > e.t && t < e.t + 2.2)) return 'wide'
  if (id === 'taurus' || id === 'cancer') return t > T.final ? 'squint' : 'happy'
  if (id === 'capricorn' || id === 'sagittarius') return 'squint'
  if (RETRO && retroOn(RETRO, t)) { const y = pos(t, ID(id))[1]; if (y > RETRO.y0 && y < RETRO.y1) return 'wide' }
  return 'happy'
}

function makeBuild(cfg) {
  const { camAt, SAY, STICK, focus = null, end = null, endT = T.podium, dur = DURATION } = cfg
  const FP = focus ? PI_OF(focus[0]) : -1
  return async function build(stage) {
  try { await Promise.all(["800 34px Inter", "800 42px Inter", "800 64px Inter", "700 26px 'Space Mono'", "italic 500 56px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) {}
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { S, P, M, W, SHELF, SIGNS: SECTIONS } = C

  const px = (cx, cy, s, col) => { x.fillStyle = col; x.fillRect(Math.round(cx - s / 2), Math.round(cy - s / 2), s, s) }
  function rail(s, col, cam) { const [x1, y1, x2, y2, th] = s; x.lineWidth = th + 10; x.strokeStyle = INK; x.beginPath(); x.moveTo(x1, y1 - cam); x.lineTo(x2, y2 - cam); x.stroke(); x.lineWidth = th; x.strokeStyle = col; x.stroke() }
  const vis = (y, m = 200) => y > -m && y < 1920 + m
  const disc = (cx, cy, r, col) => { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }

  function zones(cam, t) {
    if (RETRO) { const y0 = RETRO.y0 - cam, y1 = RETRO.y1 - cam; if (y1 > -50 && y0 < 1970) {
      const on = retroOn(RETRO, t)
      x.fillStyle = on ? 'rgba(255,120,190,0.18)' : 'rgba(255,120,190,0.07)'; x.fillRect(97, y0, 886, y1 - y0)
      x.strokeStyle = 'rgba(255,143,177,0.5)'; x.lineWidth = 4; x.setLineDash([18, 14]); x.strokeRect(97, y0, 886, y1 - y0); x.setLineDash([])
      if (on) { x.fillStyle = PINK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; for (let k = 0; k < 4; k++) { const ay = y1 - ((t * 260 + k * 215) % (y1 - y0)); x.fillText('↑', 200 + k * 230, ay) } } } }
    if (FLARE) { const y0 = FLARE.y0 - cam, y1 = FLARE.y1 - cam; if (y1 > -50 && y0 < 1970) {
      const on = retroOn(FLARE, t)
      x.fillStyle = on ? 'rgba(255,150,60,0.20)' : 'rgba(255,150,60,0.06)'; x.fillRect(97, y0, 886, y1 - y0)
      x.strokeStyle = 'rgba(255,170,90,0.5)'; x.lineWidth = 4; x.setLineDash([18, 14]); x.strokeRect(97, y0, 886, y1 - y0); x.setLineDash([])
      if (on) for (let k = 0; k < 14; k++) { const ax = 100 + ((t * 900 + k * 173) % 880), ay = y0 + 40 + (k * 61) % (y1 - y0 - 80); x.fillStyle = k % 2 ? '#ffb35c' : '#ffd36b'; x.fillRect(ax, ay, 70, 8); x.fillRect(ax + 60, ay - 6, 12, 20) } } }
  }
  function holes(cam, t) {
    for (const h of HOLES) {
      const cy = h.y - cam; if (!vis(cy, 300)) continue
      const hot = h.name === 'horizon' ? '#ff5a7a' : h.name === 'shortcut' ? '#7dffb0' : '#ff9a3c'
      for (let k = 0; k < 42; k++) { const a = t * (1.6 + (k % 5) * 0.25) + k * 0.73, rr = 52 + (k * 37 % 80); px(h.x + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.45, 10, k % 3 ? hot : '#c9a6ff') }
      for (let k = 4; k >= 1; k--) { x.fillStyle = `rgba(120,60,200,${0.07 * k})`; x.beginPath(); x.arc(h.x, cy, 48 + k * 24, 0, Math.PI * 2); x.fill() }
      x.fillStyle = '#000'; x.beginPath(); x.arc(h.x, cy, 48, 0, Math.PI * 2); x.fill()
      x.strokeStyle = hot; x.lineWidth = 5; x.beginPath(); x.arc(h.x, cy, 52, 0, Math.PI * 2); x.stroke()
      const tag = h.name === 'start' ? 'TO START' : h.name === 'shortcut' ? 'SHORTCUT' : null
      if (tag) label(x, h.x, cy + 120, tag, 1, { size: 24, bg: hot, rot: 0.03 })
      for (const e of SWALLOWS) {                         // the gulp: a shrinking spiral ghost
        if (e.hole !== h.name) continue
        const d = t - e.t; if (d < 0 || d > 0.7) continue
        const k = 1 - d / 0.7, a = d * 14
        drawStarChar(x, h.x + Math.cos(a) * 60 * k, cy + Math.sin(a) * 30 * k, 92 * k, t, { color: SIGN[e.id].color, mood: 'wide', seed: 3 })
      }
    }
    for (const ex of EXITS) {                              // where each hole spits you out
      const [wx, wy] = ex.at, cy = wy - cam; if (!vis(cy, 200)) continue
      for (let k = 0; k < 24; k++) { const a = -t * 2.4 + k * 0.52, rr = 34 + (k % 6) * 10; px(wx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.5, 8, k % 2 ? '#8fe3ff' : BONE) }
      for (const e of SWALLOWS) { if (e.hole !== ex.from) continue; const d = t - e.t; if (d >= 0 && d < 0.6) sparkles(x, t, wx, cy, e.t, 12, 160, 5) }
    }
    if (JUP) { const cy = JUP.y - cam; if (vis(cy, 500)) { for (let k = 0; k < 3; k++) { const rr = 200 + ((t * 60 + k * 100) % 300); x.strokeStyle = `rgba(242,199,92,${(0.25 * (1 - (rr - 200) / 300)).toFixed(3)})`; x.lineWidth = 4; x.beginPath(); x.arc(JUP.x, cy, rr, 0, Math.PI * 2); x.stroke() } } }
  }
  function nova(cam, t) {
    if (!NOVA) return
    const cy = NOVA.y - cam; if (!vis(cy, 500)) return
    const ph = ((t % NOVA.period) + NOVA.period) % NOVA.period, on = ph < NOVA.on, warn = ph > NOVA.period - 0.8
    if (on || ph < 0.7) { const rr = 70 + ph * 900; x.strokeStyle = `rgba(255,240,180,${(0.8 * (1 - ph / 0.7)).toFixed(3)})`; x.lineWidth = 16; x.beginPath(); x.arc(NOVA.x, cy, rr, 0, Math.PI * 2); x.stroke() }
    const pulse = warn ? 1 + 0.12 * Math.sin(t * 40) : 1
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8 + t, rr = (NOVA.core + 20 + 10 * Math.sin(t * 6 + k)) * pulse; px(NOVA.x + Math.cos(a) * rr, cy + Math.sin(a) * rr, 14, warn ? '#ffffff' : '#ffd36b') }
  }
  function planets(cam, t) {
    for (const p of P) {
      if (p[2] < 50) continue
      const cy = p[1] - cam; if (!vis(cy, 300)) continue
      if (p[2] > 100) {                                  // Jupiter: bands + the great red spot
        x.fillStyle = INK; x.beginPath(); x.arc(p[0], cy, p[2] + 6, 0, Math.PI * 2); x.fill()
        const bands = ['#e9d3b0', '#c98e5a', '#f0dcc0', '#b9774a', '#e8c8a0', '#c98e5a', '#f0dcc0']
        x.save(); x.beginPath(); x.arc(p[0], cy, p[2], 0, Math.PI * 2); x.clip(); bands.forEach((c, i) => { x.fillStyle = c; x.fillRect(p[0] - p[2], cy - p[2] + i * (2 * p[2] / 7), 2 * p[2], 2 * p[2] / 7 + 1) })
        x.fillStyle = '#c0503a'; x.beginPath(); x.ellipse(p[0] + 45, cy + 30, 34, 18, 0, 0, Math.PI * 2); x.fill(); x.restore()
      } else {                                           // the supernova's core
        const g = x.createRadialGradient(p[0], cy, 6, p[0], cy, p[2]); g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#ffe08a'); g.addColorStop(1, '#ff8a3c')
        x.fillStyle = INK; x.beginPath(); x.arc(p[0], cy, p[2] + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = g; x.beginPath(); x.arc(p[0], cy, p[2], 0, Math.PI * 2); x.fill()
      }
    }
  }
  function movers(cam, t) {
    for (const m of M) {
      const [mx, my] = m.p(t), cy = my - cam; if (!vis(cy, 120)) continue
      if (m.kind === 'meteor') {
        for (let k = 1; k < 9; k++) px(mx + Math.sin(k) * 4, cy - k * 24, Math.max(4, 24 - k * 2.4), k % 2 ? '#ffb35c' : '#ffd36b')
        disc(mx, cy, m.r, '#9a7a6a'); px(mx - 8, cy - 6, 12, '#7a5a4a'); px(mx + 10, cy + 8, 8, '#7a5a4a')
      } else if (m.kind === 'moon') {
        disc(mx, cy, m.r, '#d8d4e8'); px(mx - 10, cy - 8, 12, '#a9a3c0'); px(mx + 12, cy + 10, 9, '#a9a3c0')
      } else if (m.kind === 'comet') {
        const dir = m.v(t)[0] > 0 ? -1 : 1
        for (let k = 1; k < 16; k++) px(mx + dir * k * 26, cy + Math.sin(t * 9 + k) * 4, Math.max(4, 30 - k * 1.6), k % 2 ? '#8fe3ff' : BONE)
        disc(mx, cy, m.r, '#eafcff')
      }
    }
  }
  function beams(cam, t) {
    for (const wh of W) {
      const cy = wh.cy - cam; if (!vis(cy, 400)) continue
      x.strokeStyle = 'rgba(143,227,255,0.25)'; x.lineWidth = 4; x.beginPath(); x.arc(wh.cx, cy, wh.r1 + 18, 0, Math.PI * 2); x.stroke()
      for (const s of wheelSpokes(wh, t)) rail([s[0], s[1], s[2], s[3], s[4]], '#8fe3ff', cam)
      disc(wh.cx, cy, wh.r0 + 4, BONE)
    }
  }
  function track(cam, t) {
    zones(cam, t); planets(cam, t)
    const fy = FINISH_Y - cam
    if (vis(fy, 60)) { for (let i = 0; i < 18; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(97 + i * 49, fy - 24 + j * 24, 49, 24) } label(x, 540, fy - 70, 'FINISH', 1, { size: 34, bg: GOLD, rot: -0.03 }) }
    for (const [y, txt] of SECTIONS) { const sy = y - cam; if (vis(sy, 60)) label(x, 540, sy, txt, 1, { size: 28, bg: PINK, rot: 0.02 }) }
    x.lineCap = 'round'
    for (const s of S) { if (Math.max(s[1], s[3]) - cam < -40 || Math.min(s[1], s[3]) - cam > 1960) continue; rail(s, BONE, cam) }
    if (t < GATE + 0.25) { x.save(); x.globalAlpha = clamp(1 - (t - GATE) / 0.25); rail(SHELF, GOLD, cam); x.restore() }
    for (const p of P) {
      const [ppx, py, pr, e] = p; if (pr >= 50) continue; const sy = py - cam; if (sy < -40 || sy > 1960) continue
      if (e) { disc(ppx, sy, pr, PINK); x.fillStyle = '#ffd1e0'; x.beginPath(); x.arc(ppx - pr * 0.3, sy - pr * 0.3, pr * 0.3, 0, Math.PI * 2); x.fill() }    // pinball bumper
      else { x.fillStyle = INK; x.fillRect(ppx - pr - 4, sy - pr - 4, 2 * pr + 8, 2 * pr + 8); x.fillStyle = GOLD; x.fillRect(ppx - pr, sy - pr, 2 * pr, 2 * pr); x.fillStyle = '#fff3c4'; x.fillRect(ppx - pr + 3, sy - pr + 3, 5, 5) }
    }
    beams(cam, t); movers(cam, t); nova(cam, t); holes(cam, t)
  }
  function tears(cx, cy, t) {
    for (const d of [-1, 1]) for (let q = 0; q < 4; q++) {
      const ph = ((t * 1.4 + q / 4) % 1), ppx = cx + d * (12 + 22 * ph), py = cy - 6 + 30 * ph * ph
      x.fillStyle = INK; x.fillRect(ppx - 4, py - 4, 9, 11); x.fillStyle = '#8fe3ff'; x.fillRect(ppx - 2, py - 2, 5, 7)
    }
  }
  function ropes(cam, t) {                 // the ties: a sagging rope, gold; Taurus & Cancer's is the striped scarf
    for (const [a, b] of PAIRS) {
      const [ax, ay] = pos(t, ID(a)), [bx, by] = pos(t, ID(b)), d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
      if (d > 400 || Math.max(ay, by) - cam < -80 || Math.min(ay, by) - cam > 2000) continue
      const sag = Math.max(0, 150 - d) * 0.5, mx = (ax + bx) / 2, my = (ay + by) / 2 + sag - cam
      x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(ax, ay - cam); x.quadraticCurveTo(mx, my, bx, by - cam); x.stroke()
      if (a === 'taurus') { for (let k = 0; k < 8; k++) { const q = u => [(1 - u) ** 2 * ax + 2 * u * (1 - u) * mx + u * u * bx, (1 - u) ** 2 * (ay - cam) + 2 * u * (1 - u) * my + u * u * (by - cam)]; const [p0x, p0y] = q(k / 8), [p1x, p1y] = q((k + 1) / 8); x.strokeStyle = k % 2 ? SIGN.taurus.color : SIGN.cancer.color; x.lineWidth = 8; x.beginPath(); x.moveTo(p0x, p0y); x.lineTo(p1x, p1y); x.stroke() } }
      else { x.strokeStyle = '#e9d39a'; x.lineWidth = 6; x.beginPath(); x.moveTo(ax, ay - cam); x.quadraticCurveTo(mx, my, bx, by - cam); x.stroke() }
    }
  }
  function stars(cam, t) {
    ropes(cam, t)
    const order = IDS.map((id, i) => [id, i, pos(t, i)]).sort((a, b) => a[2][1] - b[2][1])
    for (const [id, i, [wx, wy]] of order) {
      const sy = wy - cam; if (sy < -80 || sy > 2000) continue
      if (SWALLOWS.some(e => e.id === id && t > e.t && t < e.t + 0.02)) continue
      const s = SIGN[id], fin = FIN[id]
      if (focus && focus.includes(id)) { x.save(); x.globalAlpha = 0.5 + 0.2 * Math.sin(t * 4); x.strokeStyle = s.color; x.lineWidth = 6; x.setLineDash([14, 10]); x.beginPath(); x.arc(wx, sy - 4, 74, t * 0.8, t * 0.8 + Math.PI * 2); x.stroke(); x.setLineDash([]); x.restore() }
      const last = SWALLOWS.filter(e => e.id === id && e.t <= t).pop()
      const hops = fin !== null && t > fin ? [fin + 0.3, fin + 1.0, fin + 1.7] : last ? [last.t + 0.05] : null
      const bounce = t > GATE && (fin === null || t < fin) ? Math.sin(t * 9 + i) * 0.04 : 0
      drawStarChar(x, wx, sy - 4, 92, t, { color: s.color, glyph: s.glyph, mood: mood(id, t), seed: i + 2, hops, squash: bounce, look: [Math.sign(Math.sin(t * 0.7 + i)) * 0.6, 0.6] })
      if (id === 'pisces' && t > GATE) tears(wx, sy - 4, t)
    }
  }
  function says(cam, t) {
    const focusTalk = focus && SAY.some(([t0, d, id]) => focus.includes(id) && t > t0 - 0.2 && t < t0 + d + 0.2)
    for (const [t0, d, id, text, own] of SAY) {
      if (t < t0 || t > t0 + d) continue
      if (focusTalk && !focus.includes(id) && !own) continue
      if (focus && focus.includes(id) && t0 > PFIN[FP] + 1.1) {          // after they finish: the pair comments from the corner
        const k = pop01(t, t0, 0.3, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - 0.25, t0 + d)))
        bubble(x, id === focus[0] ? 320 : 450, 1110, text, k, { size: 42, col: BONE, tail: 'bl' })
        continue
      }
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
      label(x, 540, 560, text, pop01(t, t0 + 0.02, 0.25, 1.8) * (1 - ease.inQuad(prog(t, t0 + d - Math.min(0.3, d / 3), t0 + d))), { size: 50, bg, color: ink, rot: -0.04 })
    }
  }
  function board(t) {                      // live pairs leaderboard: all six pairs
    const k = clamp((t - GATE - 0.6) / 0.4) * (1 - clamp((t - endT + 0.4) / 0.3))
    if (k <= 0) return
    const rank = PAIRS.map((p, pi) => [pi, t >= PFIN[pi] ? 1e6 - PFIN[pi] : (pos(t, ID(p[0]))[1] + pos(t, ID(p[1]))[1]) / 2]).sort((a, b) => b[1] - a[1]).map(r => r[0])
    x.save(); x.globalAlpha = k
    const X = 100, Y = 300, Wd = 330, H = 40
    x.fillStyle = 'rgba(14,9,32,0.86)'; x.fillRect(X - 12, Y - 50, Wd + 24, 50 + 6 * H + 16)
    x.font = `700 22px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('LIVE · PAIRS', X, Y - 24)
    rank.forEach((pi, r) => {
      const y = Y + 16 + r * H, [a, b] = PAIRS[pi]
      if (pi === FP) { x.fillStyle = 'rgba(242,199,92,0.24)'; x.fillRect(X - 8, y - 19, Wd + 16, 38) }
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
    if (hk > 0) { x.save(); x.globalAlpha = clamp(hk); x.textAlign = 'center'; x.font = `800 60px ${INTER}`; x.fillStyle = BONE; x.fillText('Behind the whole race.', 540, 520); x.fillStyle = GOLD; x.fillText('Ahead by 0.12 seconds.', 540, 596); x.restore() }
    const lk = pop01(t, t0 + 1.8, 0.4, 1.7)
    if (lk > 0) {
      const [la, lb] = PAIRS[PI_OF('sagittarius')]
      drawStarChar(x, 230, 1610, 104, t, { color: SIGN[la].color, glyph: SIGN[la].glyph, mood: 'happy', seed: 9, pop: clamp(lk), hops: [t0 + 2.6, t0 + 3.8] })
      drawStarChar(x, 340, 1610, 104, t, { color: SIGN[lb].color, glyph: SIGN[lb].glyph, mood: 'wide', seed: 10, pop: clamp(lk), hops: [t0 + 2.8, t0 + 4.0] })
      x.save(); x.globalAlpha = clamp(lk); x.textAlign = 'left'; x.textBaseline = 'middle'
      x.font = `800 34px ${INTER}`; x.fillStyle = BONE; x.fillText('Sagittarius & Virgo: still racing.', 410, 1588)
      x.font = `italic 500 40px 'EB Garamond', Georgia, serif`; x.fillStyle = PINK; x.fillText('The long way. Twice.', 410, 1638)
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
    start: 0, end: dur, root,
    update(t) {
      const cam = camAt(t)
      drawSky(sx, t, { ...SKY_H, dy: -cam * 0.04 })
      x.clearRect(0, 0, 1080, 1920)
      track(cam, t); stars(cam, t); board(t); says(cam, t); stickers(t)
      if (end) end(x, t); else podium(t)
    },
  }
  }
}
export const SCENES = [makeBuild({ camAt, SAY, STICK })]
export { makeBuild, SAY as MAIN_SAY, SIM, IDS, pos, FIN, PAIRS, PFIN, PORDER, PI_OF, SWALLOWS, HOLES, ID, SIGN, ORD, clampY, NF, r2, PNAME, C as COURSE, FINISH_Y }

// quiet cue sheet: gate, soft knocks for meteor / moon / comet hits, low whoomps for each gulp, a pop per pair home
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
const hits = []; for (const e of SIM.events) if (['meteor', 'moon', 'comet'].includes(e.kind) && e.t < T.podium) { if (!hits.some(h => Math.abs(h - e.t) < 1.2)) hits.push(e.t) }
const gulps = []; for (const e of SWALLOWS) if (e.t < T.podium && !gulps.some(g => Math.abs(g - e.t) < 0.3)) gulps.push(e.t)
export const CUES = [
  ['pluck', r2(GATE), 784, 0.03, 0.4, 0],
  ['whoosh', r2(GATE + 0.05), 0.5, 0.02],
  ...hits.map(h => ['pluck', r2(h), 392, 0.02, 0.3, 0]),
  ...gulps.map(g => ['whoosh', r2(g), 0.9, 0.03]),
  ...PORDER.filter(pi => PFIN[pi] < T.podium).map((pi, p) => ['pop', r2(PFIN[pi]), NOTE[(5 - p) % 6], 0.02, 0]),
  ['bell', r2(T.win + 0.05), 1760, 0.02, 1.6, 0],
  ['glitter', r2(T.podium + 0.6), r2(T.podium + 1.4)],
  ['bell', r2(T.podium + 0.4), 1318.5, 0.018, 1.8, 0],
].sort((a, b) => a[1] - b[1])
