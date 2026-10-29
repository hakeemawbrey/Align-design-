// st9capwork (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E47) · story 0–20.6, then the end card.
//   9 TO 5 with Capricorn, working from the home desk (../../st9caphome.js, ep 'work': the goat pin one ledge up).
//   0.00  Frame 0 / thumbnail: Capricorn at the desk, pointer out, presenting a mountain chart: "5-YEAR PLAN".
//         Hook: "A Capricorn's 5-year plan has a *10-year* plan."
//   2.80  The zoom-out gag: the 5-YEAR PLAN is a corner of the 10-YEAR PLAN… which is a corner of the 25-YEAR PLAN
//         (DRAFT). CAP: "it’s a *draft.*"
//   7.80  The video call: three teammates in tiles (♐ Sag, ♓ Pisces, ♈ Aries), lost. ARIES: "where are we on this?"
//         CAP: "base camp. everyone gets a *rope.*"
//  12.90  whip → the climb: on the chart, little goat-Capricorn leads, roped to all three, switchback by switchback.
//         ★ ASTROLOGY SAYS — Capricorn is the natural ruler of the 10th house (career, reputation).
//  17.00  The summit (rhymes with frame 0: same pose, same chart, now the whole team on top). LAST: "Climb *with* people."
//   Ghost: leans out from behind the left monitor. Rewatch bait: the 25-YEAR PLAN's base camp is labelled "COFFEE".
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { R, blk, bubble, bubbleCues, whip, whipCues, popIn } from '../../st9saghome.js'
import { CAP, drawCapHome, drawCapHomeFront, drawCap } from '../../st9caphome.js'

export const DURATION = 25
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const MINT = '#7fe8c4', INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const MONO = "'Space Mono', ui-monospace, monospace"

const T = {
  hookOut: 2.6, zoom: [2.8, 5.4], call: 7.8, callOut: 12.6, climb: 12.9, summit: 17.0, ghost: 5.9,
  last: 17.9, out: [20.15, 20.55],
}
const TEAM = [
  { id: 'sagittarius', tag: '♐ SAG', x: 210 },
  { id: 'pisces', tag: '♓ PISCES', x: 540 },
  { id: 'aries', tag: '♈ ARIES', x: 870 },
]
const B = [
  { at: 5.5, out: 7.6, x: 470, y: 920, text: 'it’s a *draft.*', tag: CAP.tag, tagColor: CAP.color, w: 400, tailX: 0.6 },
  { at: 8.3, out: 10.2, x: 870, y: 1150, text: 'where are we on this?', tag: '♈ ARIES', tagColor: signStar('aries').color, w: 460, tailX: 0.75 },
  { at: 10.3, out: 12.6, x: 560, y: 920, text: 'base camp. everyone gets a *rope.*', tag: CAP.tag, tagColor: CAP.color, w: 560 },
]
const STAMPS = [
  { at: 3.0, out: 5.3, time: '9:00 AM', text: 'quick planning *sync*' },
  { at: 15.9, out: 17.75, time: '2:30 PM', text: 'nobody left at *base camp*' },
]
const FACT = { at: 13.3, dur: 2.4, text: 'Capricorn is the natural ruler of the 10th house (career, reputation).', label: '★ ASTROLOGY SAYS', y: 1330 }
const LAST = 'Climb *with* | people.'
const CLOCK = [
  { t: 0, from: '9:00', to: '9:00', at: 0, dur: 0.1 },
  { t: T.call, from: '9:00 AM', to: '11:15 AM', at: T.call + 0.05, dur: 0.7 },
  { t: T.climb, from: '11:15 AM', to: '2:30 PM', at: T.climb + 0.05, dur: 0.8 },
  { t: T.summit, from: '2:30 PM', to: '4:58 PM', at: T.summit + 0.05, dur: 0.7 },
]
const CH = { x0: 100, y0: 640, x1: 760, y1: 1010 }
const LEVELS = ['5-YEAR PLAN', '10-YEAR PLAN', '25-YEAR PLAN (DRAFT)']
const LEVEL_BG = ['#2a3f5f', '#24364f', '#1d2c42']
export const GHOST = { at: T.ghost, x: 264, y: 1070, from: 'right', where: 'leaning out from behind the left monitor on Capricorn’s desk' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const hour = t => lerp(9, 17, t / STORY_END)
const SUB = 0.3
const sub = r => ({ x: r.x + r.w * 0.05, y: r.y + r.h * (1 - SUB) - r.h * 0.04, w: r.w * SUB, h: r.h * SUB })
const RECTS = (() => { const r2 = { x: CH.x0, y: CH.y0, w: CH.x1 - CH.x0, h: CH.y1 - CH.y0 }, r1 = sub(r2), r0 = sub(r1); return [r0, r1, r2] })()
/** the switchback path on a chart rect: p 0 (base camp) → 1 (the summit) */
function pathAt(r, p) {
  const pts = [[0.2, 0.9], [0.62, 0.78], [0.36, 0.62], [0.66, 0.45], [0.46, 0.3], [0.56, 0.14]]
  const n = pts.length - 1, f = clamp(p) * n, i = Math.min(n - 1, Math.floor(f)), k = f - i
  return { x: r.x + r.w * lerp(pts[i][0], pts[i + 1][0], k), y: r.y + r.h * lerp(pts[i][1], pts[i + 1][1], k) }
}
function level(x, t, i, r) {
  R(x, LEVEL_BG[i], r.x, r.y, r.w, r.h)
  const base = r.y + r.h * 0.98, pk = { x: r.x + r.w * 0.56, y: r.y + r.h * 0.1 }
  const step = Math.max(2, r.h / 60)
  for (let yy = pk.y; yy < base; yy += step) {
    const k = (yy - pk.y) / (base - pk.y), hw = k * r.w * 0.5
    x.fillStyle = k < 0.2 ? '#f4f1ea' : (Math.floor((yy - pk.y) / step) % 3 ? '#7f8a97' : '#5d6673'); x.fillRect(pk.x - hw, yy, hw * 2, step + 0.5)
  }
  // the dotted route + a flag
  for (let p = 0; p < 1; p += 0.025) { const q = pathAt(r, p); x.fillStyle = GOLD; x.fillRect(q.x - r.w * 0.004, q.y - r.w * 0.004, r.w * 0.008, r.w * 0.008) }
  x.fillStyle = '#ff4f6e'; x.fillRect(pk.x + r.w * 0.01, pk.y - r.h * 0.12, r.w * 0.006, r.h * 0.12); x.fillRect(pk.x + r.w * 0.016, pk.y - r.h * 0.12, r.w * 0.04, r.h * 0.05)
  x.font = `700 ${Math.max(4, r.h * (i === 2 ? 0.065 : 0.085))}px ${MONO}`; x.fillStyle = BONE; x.textBaseline = 'top'; x.textAlign = 'left'
  x.fillText(LEVELS[i], r.x + r.w * 0.025, r.y + r.h * 0.03)
  if (i === 2) { x.font = `700 ${r.h * 0.045}px ${MONO}`; x.fillStyle = MINT; x.fillText('BASE CAMP: COFFEE', r.x + r.w * 0.66, r.y + r.h * 0.88) }
  x.textBaseline = 'alphabetic'
}
/** the chart with the zoom-out camera (f: 0 = framed on the 5-year, 2 = the 25-year draft) */
function chart(x, t, f) {
  blk(x, CH.x0, CH.y0, CH.x1 - CH.x0, CH.y1 - CH.y0, LEVEL_BG[2], { o: 10 })
  const i = Math.min(1, Math.floor(f)), k = f - i
  const a = RECTS[i], b = RECTS[i + 1]
  const w = a.w * Math.pow(b.w / a.w, k)
  const kk = (w - a.w) / (b.w - a.w || 1)
  const A = { x: lerp(a.x, b.x, kk), y: lerp(a.y, b.y, kk), w, h: w * (a.h / a.w) }
  const s = (CH.x1 - CH.x0) / A.w
  x.save(); x.beginPath(); x.rect(CH.x0, CH.y0, CH.x1 - CH.x0, CH.y1 - CH.y0); x.clip()
  x.translate(CH.x0, CH.y0); x.scale(s, s); x.translate(-A.x, -A.y)
  for (let j = 2; j >= 0; j--) { const r = RECTS[j]; if (j < 2) { x.fillStyle = INK; x.fillRect(r.x - r.w * 0.02, r.y - r.w * 0.02, r.w * 1.04, r.h + r.w * 0.04) } level(x, t, j, r) }
  x.restore()
}
/** the climb: goat-Capricorn leads, the team roped behind */
function climb(x, t) {
  const r = RECTS[2], p = ease.inOutCubic(prog(t, T.climb + 0.4, T.summit))
  const lead = 0.06 + 0.94 * p, pk = pathAt(r, 1)
  const SUM = [{ x: pk.x + 10, y: pk.y + 62 }, { x: pk.x + 84, y: pk.y + 86 }, { x: pk.x + 150, y: pk.y + 110 }, { x: pk.x + 214, y: pk.y + 134 }]
  const P = [lead, ...TEAM.map((_, k) => Math.max(0, lead - 0.08 * (k + 1)))].map((q, k) => {
    const pt = pathAt(r, q), a = { x: pt.x, y: pt.y + 20 }, kk = ease.outCubic(prog(t, T.summit - 0.1, T.summit + 0.4))
    return { x: lerp(a.x, SUM[k].x, kk), y: lerp(a.y, SUM[k].y, kk) }
  })
  // the rope
  x.fillStyle = BONE
  for (let k = 0; k < P.length - 1; k++) for (let s = 0; s <= 1; s += 0.1) x.fillRect(lerp(P[k].x, P[k + 1].x, s) - 2, lerp(P[k].y, P[k + 1].y, s) - 12 + Math.sin(Math.PI * s) * 8, 4, 4)
  TEAM.forEach((m, k) => { const q = P[k + 1]; const st = signStar(m.id); drawStarChar(x, q.x, q.y - 30, 74, t, { color: st.color, mood: p >= 1 ? 'happy' : 'neutral', look: [1, -1], seed: 20 + k, glow: 0.6, hops: [T.summit + 0.1 + k * 0.08] }) })
  drawCap(x, P[0].x, P[0].y - 34, 84, t, { mood: p >= 1 ? 'happy' : 'neutral', look: [-1, 0], seed: 6, hops: [T.summit] })
}
function pointer(x, t, r, tx, ty) {
  const sx = r.x - r.size * 0.36, sy = r.y + r.size * 0.02, wob = Math.sin(t * 3) * 6
  const ex = tx + wob, ey = ty
  for (let s = 0; s <= 1; s += 0.04) { const px = lerp(sx, ex, s), py = lerp(sy, ey, s); R(x, INK, px - 5, py - 5, 10, 10); R(x, '#c9a86a', px - 2, py - 2, 4, 4) }
  R(x, '#ff4f6e', ex - 6, ey - 6, 12, 12)
}
function tiles(x, t) {
  const k = popIn(t, T.call, 0.35, 2) * (1 - ease.inCubic(prog(t, T.callOut, T.callOut + 0.3)))
  if (k <= 0.02) return
  R(x, 'rgba(10,8,24,0.85)', 60, 1120, 960, 40)
  x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.textBaseline = 'middle'; x.fillText('▣ PLAN SYNC · 4 PEOPLE · 1:58:02', 80, 1141); x.textBaseline = 'alphabetic'
  TEAM.forEach((m, i) => {
    const kk = popIn(t, T.call + 0.1 * i, 0.35, 2) * (k / Math.max(0.01, popIn(t, T.call, 0.35, 2)))
    if (kk <= 0.02) return
    x.save(); x.translate(m.x, 1270); x.scale(kk, kk)
    blk(x, -150, -100, 300, 210, '#141a2c', { o: 6 })
    const st = signStar(m.id)
    drawStarChar(x, 0, 10, 140, t, { color: st.color, glyph: null, mood: t > T.call + 3 && i !== 2 ? 'neutral' : 'wide', look: [Math.sin(t * 2 + i), -0.5], seed: 30 + i, glow: 0.5 })
    R(x, 'rgba(0,0,0,0.6)', -146, 74, 160, 32); x.font = `700 20px ${MONO}`; x.fillStyle = BONE; x.textBaseline = 'middle'; x.fillText(m.tag, -138, 90)
    if (i === 1) { x.fillStyle = GOLD; x.font = '800 50px Inter'; x.fillText('?', 90, -50) }
    x.restore()
  })
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "700 40px Inter", "800 112px Inter", "italic 600 48px 'EB Garamond'", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Capricorn’s 5-year plan has a *10-year* plan.', at: 0, out: T.hookOut, accentColor: MINT, size: 76, accentSize: 112, top: 250 })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, accentColor: MINT }))
  const last = popText(root, LAST, { top: 262, size: 108, accentSize: 166, at: T.last, gap: 0.08, accentColor: MINT, wobble: true, late: 1, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = outK(t, T.out)
      drawSky(x, t); daySky(x, t, { hour: hour(t) })
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const z1 = gaspZoom(t, { at: T.zoom[1] - 0.1, dur: 1.1, x: 430, y: 820, amount: 0.12, follow: 0.2 })
      const z2 = gaspZoom(t, { at: T.summit, dur: 1.3, x: 430, y: 760, amount: 0.18, follow: 0.3 })
      x.save()
      if (ok < 1) { const s = lerp(0.9, 1, ok); x.globalAlpha = ok; x.translate(540, 1030); x.scale(s, s); x.translate(-540, -1030) }
      z1.apply(x); z2.apply(x)
      drawCapHome(x, t, { room: 'desk', ep: 'work', friday: 'free', tieOnHook: false })
      const f = 2 * ease.inOutCubic(prog(t, ...T.zoom))
      chart(x, t, f)
      if (t >= T.climb) climb(x, t)
      const presenting = t < T.call || t >= T.summit
      const r = drawCap(x, 560, 1050, 250, t, { mood: t < T.zoom[1] ? 'neutral' : t < T.call ? 'squint' : t < T.summit ? 'neutral' : 'happy', look: presenting ? [-1, -1] : [0, 0], hops: [0.1, T.zoom[0] + 0.1, 10.4, 11.2, T.summit + 0.05, T.last + 0.35], seed: 6 })
      if (presenting) pointer(x, t, r, t < T.summit ? 300 : pathAt(RECTS[2], 1).x + 40, t < T.summit ? 900 : pathAt(RECTS[2], 1).y + 100)
      drawCapHomeFront(x, t, { room: 'desk' })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      tiles(x, t)
      for (const b of B) bubble(x, t, b)
      x.restore()
      factChip(x, t, FACT)
      whip(x, t, T.climb, { dir: 1 })
      const c = [...CLOCK].reverse().find(s => t >= s.t)
      drawClock(x, t, { from: c.from, to: c.to, at: c.at, dur: c.dur, sign: 'cap', ampm: 'AM' })
      drawRecFrame(x, t, { battery: lerp(0.8, 0.4, t / STORY_END), time: `00:${String(Math.floor(t)).padStart(2, '0')}` })
      hook.update(t); for (const s of stamps) s.update(t)
      last.update(t, ok)
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.call, kind: 'deal' }, { t: T.climb, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E47' }), cardCuts(CUTS)]

// ── sound
const r3 = v => +v.toFixed(3)
const NOTE = [392, 466.16, 523.25, 587.33, 698.46, 783.99, 932.33]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...bubbleCues(B, { pitch: { [CAP.tag]: 523.25, '♈ ARIES': 880 } }),
  ['riser', T.zoom[0], T.zoom[0] + 1.2, 0.04], ['whoosh', T.zoom[0] + 1.25, 0.4, 0.03], ['boom', T.zoom[0] + 1.25, 0.1],
  ['riser', T.zoom[0] + 1.3, T.zoom[1], 0.05], ['whoosh', T.zoom[1], 0.4, 0.03], ['boom', T.zoom[1], 0.14],
  ...clockCues(CLOCK[1].at, CLOCK[1].dur), ...clockCues(CLOCK[2].at, CLOCK[2].dur), ...clockCues(CLOCK[3].at, CLOCK[3].dur),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...TEAM.map((_, i) => ['pop', r3(T.call + 0.1 * i + 0.05), NOTE[i + 2], 0.04, (i - 1) * 0.5]),
  ['tick', T.ghost + 0.05, 0.015],
  ...whipCues(T.climb),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', r3(T.climb + 0.6 + i * 0.7), NOTE[i % 7], 0.035, 0.5, -0.3 + i * 0.1]),
  ...factChipCues(FACT.at, { dur: FACT.dur }),
  ['bell', T.summit, 1567.98, 0.045, 1.6, 0], ['glitter', T.summit, T.summit + 0.6],
  ...[0, 1, 2].map(i => ['pop', r3(T.last + i * 0.08), NOTE[i + 1], 0.026, (i % 2 ? 0.15 : -0.15)]),
  ['pop', r3(T.last + 0.35), 932.33, 0.05, 0], ['pluck', r3(T.last + 0.35), 587.33, 0.045, 0.6, 0], ['bell', r3(T.last + 0.45), 1567.98, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
