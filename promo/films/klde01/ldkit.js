// ldkit — ZODIAC LIE DETECTOR (batch m23, kld*): the shared set and engine. Every episode is one config:
//   import { makeLD } from '../../klde01/ldkit.js'   →   const EP = makeLD(cfg); export const { DURATION, SCENES, CUES } = EP
//
// The set (vertical 1080×1920): a dark interrogation room, one hanging lamp over a metal chair, the sign strapped in
// with two electrodes wired to the TRUTH-O-TRON on the desk below (a scrolling paper strip, a needle arm, LIE / TRUTH
// bulbs, a red beacon). ♓ Pisces runs the machine with a tissue box and cries the whole time (cfg.operator swaps the
// operator when Pisces is in the chair). THE STARS ask the questions in the dialogue box; the sign answers in bubbles.
//
// Frame 0 (= the thumbnail): the needle is mid-scribble off the chart, paper scraps flying, the beacon red, the sign
// mid-scream, the quoted lie on screen. At T.scratch a record scratch freezes the frame ("let's run that back"), then
// it snaps to calm and the questions run. No end card, no card cut, no logo. Endings: 'cut' (hard cut on the last
// line) or 'loop' (the last LOOP_LEN s cross-fade into exactly the frame-0 composition, so a replay is seamless).
//
// cfg = {
//   id, sign: 'aries', name: 'Aries', len: 15, ending: 'loop' | 'cut', music: { style, key, seed },
//   hook: '“I’m *totally* over my ex.”', hookSize?: 92, accent?: colour for the *accent*,
//   qs: [{ t, q, a, v: 'lie' | 'truth' | 'squeak', at?, vt?, m?: [answerMood, verdictMood], a2?: second bubble,
//          truth?: { at, dur, label, draw(x, t, S) } }],   t = the question starts typing in the box
//   last: { t, text },  long?: { promise, chapters: [{ t, text }] },  operator?: 'pisces' | sign id,
//   prop?(x, t, S): draw a prop on / around the subject (S.F = the subject's sprite frame, S.chaos 0…1),
//   pisTears?(t) → 0…3 override, cues?: [], tint?: colour of the room light
// }
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, slamTitle, slamTitleCues, chapter, chapterCues, loopBack, loopCues } from '../hookkit.js'
import { fill } from '../../src/scenes/common.js'
import {
  GOLD, BONE, PINK, INK, RED, MINT, INTER, MONO, FONTS, r3, pop01, outK, winK, hash, R, box, drawBits, sparkles, hearts, confetti, bubble, label,
  shadow, spotlight, starFrame, inSprite, tearsCells, tissueBox, buildBug, buildStamp, buildSticker, clamp, lerp, prog, ease, el,
} from './m23kit.js'

export const LOOP_LEN = 0.45
const PAPER = { x0: 92, x1: 792, top: 1222, h: 176 }
const MACH = { x: 60, y: 1196, w: 960, h: 232 }
const NEEDLE_X = PAPER.x1, MID = PAPER.top + PAPER.h / 2
const SUBJ = { x: 420, y: 930, s: 300 }
const OPER = { x: 912, y: 1052, s: 168 }
const BEACON = { x: 150, y: 1166 }
const WINDOW = 2.6                                  // seconds of trace on the paper
const SPEAK = 'THE STARS'

// ── the needle: a pure function of time
function makeAmp(cfg, T) {
  const lies = []; let n = 0
  for (const q of T.Q) if (q.v === 'lie' || q.v === 'squeak') lies.push({ t: q.vt, k: q.v === 'squeak' ? 0.75 : (cfg.long ? 1.05 + 0.13 * n++ : 1.7), squeak: q.v === 'squeak' })
  return τ => {
    let a = 0.07 + 0.03 * Math.sin(τ * 0.9)
    if (τ <= T.scratch) a = 2.1                                    // frame 0: off the chart
    for (const L of lies) {
      const d = τ - L.t
      if (d < -0.02 || d > 2.2) continue
      a += L.k * (d < 0.08 ? clamp(d / 0.08) : d < 1.1 ? 1 : Math.exp(-(d - 1.1) * 3.2))
    }
    for (const q of T.Q) if (q.v === 'truth' && τ > q.vt && τ < q.vt + 1.2) a *= 0.6           // truth: the needle settles
    return a
  }
}
const wave = τ => (Math.sin(τ * 23.1) * 0.55 + Math.sin(τ * 41.7 + 1.3) * 0.3 + Math.sin(τ * 67.3 + 2.1) * 0.25 + (hash(Math.floor(τ * 30)) - 0.5) * 0.5) / 1.1

// ── timeline
function timeline(cfg) {
  const D = cfg.len
  const T = { D, scratch: cfg.scratch ?? 0.72, ending: cfg.ending || 'cut' }
  T.recLen = cfg.recLen ?? 0.62
  T.calm = T.scratch + T.recLen
  T.loopAt = T.ending === 'loop' ? D - LOOP_LEN : D + 1
  const CPS = cfg.cps || 32
  T.CPS = CPS
  T.Q = cfg.qs.map((q, i) => {
    const tm = lineTimes([{ t: q.t, speaker: SPEAK, text: q.q }], { cps: CPS })[0]
    const at = q.at ?? r3(tm.done + 0.28)
    const vt = q.vt ?? r3(at + 0.62)
    return { ...q, i, done: tm.done, at, vt }
  })
  T.Q.forEach((q, i) => { q.end = q.end ?? (i < T.Q.length - 1 ? T.Q[i + 1].t - 0.12 : (cfg.last ? cfg.last.t - 0.1 : D - 0.6)); if (q.truth) q.end = Math.min(q.end, q.truth.at) })
  T.last = cfg.last
  return T
}

export function makeLD(cfg) {
  const T = timeline(cfg), D = T.D
  const SUB = signStar(cfg.sign), PIS = signStar('pisces')
  const OPS = cfg.operator ? signStar(cfg.operator) : PIS
  const amp = makeAmp(cfg, T)
  const accent = cfg.accent || SUB.color
  const LINES = T.Q.map(q => ({ t: q.t, speaker: SPEAK, text: q.q }))
  const lastLine = cfg.last?.box ? [{ t: cfg.last.t, speaker: SPEAK, text: cfg.last.box }] : []
  const NAR_HOPS = talkHops([...LINES, ...lastLine], SPEAK, { cps: T.CPS })
  const SUB_HOPS = [...T.Q.flatMap(q => [q.at, q.at + 0.4]), ...(cfg.subHops || [])]
  const LIES = T.Q.filter(q => q.v === 'lie' || q.v === 'squeak')
  const TRUTHS = T.Q.filter(q => q.v === 'truth')
  const FLASHES = T.Q.filter(q => q.truth).map(q => ({ ...q.truth, q }))

  // what state is the room in at time t?  (pure)
  function state(t) {
    const chaos = t <= T.scratch ? 1 : 0
    let lie = 0, lieQ = null, truth = 0, truthQ = null
    for (const q of LIES) { const d = t - q.vt; if (d >= 0 && d < 1.6) { lie = Math.max(lie, d < 1.1 ? 1 : 1 - (d - 1.1) / 0.5); lieQ = q } }
    for (const q of TRUTHS) { const d = t - q.vt; if (d >= 0 && d < 1.8) { truth = Math.max(truth, d < 1.3 ? 1 : 1 - (d - 1.3) / 0.5); truthQ = q } }
    let flash = null
    for (const f of FLASHES) if (t >= f.at && t < f.at + f.dur) flash = f
    const lieN = LIES.filter(q => q.vt <= t).length, truthN = TRUTHS.filter(q => q.vt <= t).length
    return { chaos, lie, lieQ, truth, truthQ, flash, lieN, truthN }
  }

  async function build(stage) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07040f' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const tint = layerCanvas(root, { pointerEvents: 'none', mixBlendMode: 'screen' }), tx = tint.getContext('2d')

    const promise = cfg.long ? popText(root, cfg.long.promise, { top: 176, size: 74, accentSize: 104, at: T.calm + 0.15, gap: 0.07, accentColor: GOLD, fit: true }) : null
    const LAST = cfg.last ? popText(root, cfg.last.text, { top: cfg.last.top ?? 176, size: cfg.last.size ?? 92, accentSize: (cfg.last.size ?? 92) * 1.4, at: cfg.last.t, gap: 0.08, late: 1, lateAt: cfg.last.t + 0.08 * (cfg.last.text.split(/\s+/).length - 1) + 0.12, wobble: true, accentColor: cfg.last.accent || GOLD, fit: true }) : null
    const boxes = T.Q.map(q => dialogueBox(root, { lines: [{ t: q.t, speaker: SPEAK, text: q.q }], y: 1462, height: 280, size: 50, cps: T.CPS, open: q.t - 0.2, close: q.end }))
    const lastBox = lastLine.length ? dialogueBox(root, { lines: lastLine, y: 1462, height: 280, size: 50, cps: T.CPS, open: cfg.last.t - 0.2, close: D + 5 }) : null
    const stLie = buildStamp(root, { text: 'LIE', ink: RED, top: 600, size: 200, rot: -9 })
    const stTruth = buildStamp(root, { text: 'TRUTH', ink: MINT, top: 610, size: 160, rot: 6 })
    const stVerdict = cfg.long?.verdict ? buildStamp(root, { text: 'VERDICT', ink: GOLD, top: 540, size: 150, rot: -5, sub: cfg.long.verdict }) : null
    const stickTruth = FLASHES.map(f => buildSticker(root, { text: f.label, top: 176, size: 54, tilt: -3, accent: RED }))
    const bug = buildBug(root, { name: 'ZODIAC LIE', sub: 'DETECTOR', col: '#ff6b81', dot: RED })
    const hud = cfg.long ? el('div', { position: 'absolute', right: '56px', top: '56px', font: `700 30px ${MONO}`, color: BONE, letterSpacing: '0.1em', textShadow: '0 2px 10px rgba(6,4,18,0.95)', display: 'none' }, root) : null
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flashW = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: '0', pointerEvents: 'none' }, root)

    // ── the room
    function room(x, t, S) {
      const g = x.createLinearGradient(0, 0, 0, 1920)
      g.addColorStop(0, '#120a24'); g.addColorStop(0.55, '#1d1336'); g.addColorStop(1, '#0b0716')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      // wall panels
      x.globalAlpha = 0.18
      for (let i = 0; i < 6; i++) R(x, '#3a2a62', 30 + i * 180, 360, 150, 760)
      x.globalAlpha = 1
      R(x, '#140d28', 0, 1120, 1080, 800)
      R(x, '#2a1d4a', 0, 1116, 1080, 8)
      // a one-way mirror on the back wall
      box(x, 650, 470, 330, 210, '#1a2440', { b: 8 }); R(x, 'rgba(160,200,255,0.12)', 662, 482, 140, 186)
      x.save(); x.globalAlpha = 0.25; x.strokeStyle = '#cfe3ff'; x.lineWidth = 6; x.beginPath(); x.moveTo(690, 640); x.lineTo(780, 500); x.stroke(); x.beginPath(); x.moveTo(740, 650); x.lineTo(820, 520); x.stroke(); x.restore()
      label(x, 'OBSERVATION', 815, 708, { size: 18, col: 'rgba(239,230,214,0.4)' })
      // the hanging lamp
      const sw = 0.025 * Math.sin(t * 1.3) + S.chaos * 0.12 * Math.sin(t * 19)
      x.save(); x.translate(SUBJ.x, 0); x.rotate(sw)
      R(x, INK, -4, 0, 8, 470)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-74, 540); x.lineTo(74, 540); x.lineTo(34, 466); x.lineTo(-34, 466); x.closePath(); x.fill()
      x.fillStyle = '#4a3f70'; x.beginPath(); x.moveTo(-64, 532); x.lineTo(64, 532); x.lineTo(28, 474); x.lineTo(-28, 474); x.closePath(); x.fill()
      R(x, '#fff3c4', -26, 532, 52, 12)
      x.restore()
      const lampA = S.chaos ? 0.6 + 0.4 * Math.sin(t * 40) : 0.9
      spotlight(x, SUBJ.x + Math.sin(sw) * 540, 540, SUBJ.x, 1110, 520, lampA, cfg.tint || '255,236,180')
      // the chair
      R(x, INK, SUBJ.x - 160, 640, 320, 330); R(x, '#4b4470', SUBJ.x - 148, 652, 296, 306); R(x, '#5b5486', SUBJ.x - 148, 652, 296, 22)
      R(x, INK, SUBJ.x - 190, 1040, 380, 44); R(x, '#4b4470', SUBJ.x - 180, 1046, 360, 30)
      for (const d of [-1, 1]) { R(x, INK, SUBJ.x + d * 160 - 12, 1060, 24, 70); R(x, '#3a3460', SUBJ.x + d * 160 - 6, 1060, 12, 64) }
      shadow(x, SUBJ.x, 1110, 420, 0.4)
    }

    function wires(x, F) {
      // two electrode pads on the upper arms of the sign, wires down to the machine's input jack
      const pads = [[8.5, 13.5], [27.5, 13.5]]
      const world = pads.map(([i, j]) => [F.ox + (i * F.cell - F.S / 2) * F.sx, F.oy + ((j * F.cell) - F.S / 2 - F.base) * F.sy])
      world.forEach(([px, py], k) => {
        x.save(); x.strokeStyle = INK; x.lineWidth = 11; x.lineCap = 'round'
        const ex = 180 + k * 40, ey = MACH.y + 10
        x.beginPath(); x.moveTo(px, py); x.bezierCurveTo(px + (k ? 120 : -160), py + 160, ex - 60, ey - 220, ex, ey); x.stroke()
        x.strokeStyle = k ? '#ff6b81' : '#7fd0ff'; x.lineWidth = 5; x.stroke(); x.restore()
      })
      return world
    }
    function padsDraw(x, world) { for (const [px, py] of world) { box(x, px - 18, py - 14, 36, 28, '#d9d4ea', { b: 5, hi: '#ffffff' }); R(x, '#8a83a8', px - 6, py - 4, 12, 8) } }

    function subject(x, t, S) {
      let mood = 'neutral', look = [0, 0], squash = 0, blink
      if (S.chaos) { mood = 'wide'; squash = 0.12 * Math.sin(t * 34); look = [0.3 * Math.sin(t * 13), -0.4]; blink = false }
      else {
        for (const q of T.Q) {
          if (t >= q.t && t < q.at) { mood = 'neutral'; look = [-0.2, -0.4] }
          if (t >= q.at && t < q.vt) mood = q.m?.[0] || 'happy'
          if (t >= q.vt && t < q.end + 0.12) {
            mood = q.m?.[1] || (q.v === 'truth' ? 'happy' : t < q.vt + 0.9 ? 'wide' : 'squint')
            if (q.v !== 'truth' && t < q.vt + 0.5) squash = 0.1 * Math.sin((t - q.vt) * 40) * Math.exp(-(t - q.vt) * 5)
          }
        }
        if (cfg.last && t >= cfg.last.t - 0.3) mood = cfg.last.mood || 'happy'
      }
      if (cfg.mood) { const m = cfg.mood(t, S); if (m) { mood = m.mood || mood; look = m.look || look } }
      const o = { color: SUB.color, glyph: SUB.glyph, mood, look, squash, hops: SUB_HOPS, seed: 3, glow: 1.05, blink }
      const sx = SUBJ.x + (S.chaos ? 10 * Math.sin(t * 47) : 0)
      const F = starFrame(sx, SUBJ.y, SUBJ.s, t, o)
      const world = wires(x, F)
      drawStarChar(x, sx, SUBJ.y, SUBJ.s, t, o)
      if (cfg.subTears) { const k = cfg.subTears(t, S); if (k) inSprite(x, F, () => tearsCells(x, t, k)) }
      padsDraw(x, world)
      S.F = F
      if (cfg.prop) cfg.prop(x, t, S)
    }

    function operator(x, t, S) {
      let tears = 2, mood = 'wide', look = [-1, 0.2]
      if (S.lie) { tears = 3; mood = 'wide'; look = [-1, -0.2] }
      if (S.truth) { tears = 3; mood = 'sparkle' }
      if (S.chaos) { tears = 3; mood = 'wide' }
      if (cfg.last && t > cfg.last.t) { tears = 3; mood = 'happy' }
      if (cfg.opMood) { const m = cfg.opMood(t, S); if (m) ({ tears = tears, mood = mood, look = look } = m) }
      if (cfg.operator && cfg.operator !== 'pisces') tears = cfg.opTears ? cfg.opTears(t, S) : 0
      const o = { color: OPS.color, glyph: OPS.glyph, mood, look, seed: 7, glow: 0.9, hops: [T.calm, ...LIES.map(q => q.vt + 0.05), ...TRUTHS.map(q => q.vt + 0.05)] }
      drawStarChar(x, OPER.x, OPER.y, OPER.s, t, o)
      const F = starFrame(OPER.x, OPER.y, OPER.s, t, o)
      if (tears) inSprite(x, F, () => tearsCells(x, t, tears))
      tissueBox(x, 790, MACH.y - 30, 0.9, t)
      // a used tissue flying at every lie
      for (const q of LIES) { const d = t - q.vt; if (d > 0.1 && d < 1.3) { const p = d / 1.2; drawBits(x, ['.WW.', 'WWWW', 'WWW.'], { W: '#ffffff' }, lerp(860, 700, p), 1060 - 260 * Math.sin(Math.PI * p), 7, { rot: d * 6, alpha: 1 - p * p }) } }
    }

    function machine(x, t, S) {
      box(x, MACH.x, MACH.y, MACH.w, MACH.h, '#2b2350', { b: 8, hi: '#3a3068' })
      // paper window
      R(x, INK, PAPER.x0 - 8, PAPER.top - 8, PAPER.x1 - PAPER.x0 + 16, PAPER.h + 16)
      R(x, '#f4ecd8', PAPER.x0, PAPER.top, PAPER.x1 - PAPER.x0, PAPER.h)
      const pxs = (PAPER.x1 - PAPER.x0) / WINDOW
      x.save(); x.beginPath(); x.rect(PAPER.x0, PAPER.top, PAPER.x1 - PAPER.x0, PAPER.h); x.clip()
      const off = (t * pxs) % 44
      x.fillStyle = 'rgba(232,52,78,0.16)'
      for (let gx2 = PAPER.x1 - off; gx2 > PAPER.x0 - 44; gx2 -= 44) x.fillRect(gx2, PAPER.top, 2, PAPER.h)
      for (let gy = PAPER.top + 22; gy < PAPER.top + PAPER.h; gy += 44) x.fillRect(PAPER.x0, gy, PAPER.x1 - PAPER.x0, 2)
      R(x, 'rgba(232,52,78,0.35)', PAPER.x0, MID - 1, PAPER.x1 - PAPER.x0, 3)
      x.restore()
      // the trace (not clipped when it goes off the chart)
      x.save(); x.lineJoin = 'round'; x.lineCap = 'round'
      const pts = []
      for (let px = PAPER.x0; px <= NEEDLE_X; px += 3) { const τ = t - (NEEDLE_X - px) / pxs; pts.push([px, MID + amp(τ) * (PAPER.h * 0.42) * wave(τ)]) }
      x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
      x.strokeStyle = '#2c2a7a'; x.lineWidth = 2.5; x.stroke()
      x.restore()
      const ny = pts[pts.length - 1][1]
      // needle arm
      x.save(); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(890, MID); x.lineTo(NEEDLE_X, ny); x.stroke(); x.strokeStyle = '#c9c3e0'; x.lineWidth = 4; x.stroke(); x.restore()
      R(x, RED, NEEDLE_X - 5, ny - 5, 10, 10)
      box(x, 872, MID - 22, 40, 44, '#5b5486', { b: 5 })
      // bulbs
      const lieOn = S.lie > 0 || S.chaos ? (Math.sin(t * 28) > -0.3 ? 1 : 0.35) : 0.12
      const trOn = S.truth > 0 ? 1 : 0.12
      for (const [cx, col, on, txt] of [[952, RED, lieOn, 'LIE'], [952, MINT, trOn, 'TRUTH']].map((b, i) => [b[0], b[1], b[2], b[3], i])) {
        const cy = txt === 'LIE' ? 1252 : 1336
        if (on > 0.5) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 4, cx, cy, 70); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); x.globalAlpha = 0.6 * on; x.fillStyle = g; x.fillRect(cx - 70, cy - 70, 140, 140); x.restore() }
        box(x, cx - 24, cy - 24, 48, 48, col, { b: 5 }); x.globalAlpha = 1 - on; R(x, '#2b2350', cx - 24, cy - 24, 48, 48); x.globalAlpha = 1
        label(x, txt, cx, cy + 40, { size: 16, col: BONE })
      }
      label(x, 'TRUTH-O-TRON', 220, MACH.y + MACH.h - 16, { size: 18, col: 'rgba(239,230,214,0.55)' })
      if (cfg.long) label(x, `LIES ${S.lieN} · TRUTHS ${S.truthN}`, 600, MACH.y + MACH.h - 16, { size: 20, col: GOLD })
      // the red beacon
      const bOn = S.lie > 0 || S.chaos
      box(x, BEACON.x - 34, BEACON.y - 30, 68, 34, '#3a3068', { b: 5 })
      x.fillStyle = INK; x.beginPath(); x.arc(BEACON.x, BEACON.y - 30, 34, Math.PI, 0); x.fill()
      x.fillStyle = bOn ? '#ff3b55' : '#5a2632'; x.beginPath(); x.arc(BEACON.x, BEACON.y - 30, 27, Math.PI, 0); x.fill()
      if (bOn) {
        x.save(); x.globalCompositeOperation = 'lighter'; x.translate(BEACON.x, BEACON.y - 44)
        const a = t * 9
        for (const d of [0, Math.PI]) { x.rotate(0); const g = x.createLinearGradient(0, 0, Math.cos(a + d) * 600, Math.sin(a + d) * 300); g.addColorStop(0, 'rgba(255,60,80,0.45)'); g.addColorStop(1, 'rgba(255,60,80,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a + d - 0.25) * 700, Math.sin(a + d - 0.25) * 350); x.lineTo(Math.cos(a + d + 0.25) * 700, Math.sin(a + d + 0.25) * 350); x.closePath(); x.fill() }
        x.restore()
      }
      // paper scraps flying off the chart
      if (S.chaos) for (let i = 0; i < 9; i++) { const p = ((t * 1.3 + i / 9) % 1 + 1) % 1; drawBits(x, ['PPPP', 'PLLP', 'PPPP'], { P: '#f4ecd8', L: '#2c2a7a' }, lerp(NEEDLE_X, NEEDLE_X - 500 - i * 40, p) + 40 * Math.sin(i * 7), MID - 60 - 700 * p + 600 * p * p * (i % 3 ? 1 : 0.4), 8, { rot: p * 8 + i }) }
      for (const q of LIES) confetti(x, t, q.vt, NEEDLE_X - 30, PAPER.top, { n: cfg.long ? 8 + 2 * q.i : 14, life: 1.4, v0: 420, cols: ['#f4ecd8', '#ffffff', '#ffd2da'], size: 16 })
    }

    function drawScene(x, t) {
      const S = { ...state(t), t }
      const tf = t, Sf = S
      if (Sf.flash) {
        const f = Sf.flash, u = tf - f.at
        drawSky(x, tf, { zoom: 1.4, dim: 0.75 })
        f.draw(x, tf, { u, f, hero: (xx, tt, o) => { const oo = { color: SUB.color, glyph: SUB.glyph, seed: 3, ...o }; drawStarChar(xx, o.x, o.y, o.s, tt, oo); return starFrame(o.x, o.y, o.s, tt, oo) }, pis: (xx, tt, o) => { const oo = { color: PIS.color, glyph: PIS.glyph, seed: 7, ...o }; drawStarChar(xx, o.x, o.y, o.s, tt, oo); const F = starFrame(o.x, o.y, o.s, tt, oo); inSprite(xx, F, () => tearsCells(xx, tt, o.tears ?? 3)); return F } })
        return Sf
      }
      // camera: shake on frame 0 chaos + every lie
      let sh = Sf.chaos ? 16 : 0
      for (const q of LIES) { const d = tf - q.vt; if (d > 0 && d < 0.5) sh = Math.max(sh, (cfg.long ? 10 + q.i * 2 : 18) * Math.exp(-d * 7)) }
      const zoom = Sf.chaos ? 1.06 + 0.02 * Math.sin(tf * 30) : 1
      x.save()
      x.translate(540, 960); x.scale(zoom, zoom); x.translate(-540 + sh * Math.sin(tf * 61), -960 + sh * Math.cos(tf * 53))
      room(x, tf, Sf)
      subject(x, tf, Sf)
      operator(x, tf, Sf)
      machine(x, tf, Sf)
      // answers
      for (const q of T.Q) {
        const ans = Array.isArray(q.a) ? q.a : [q.a]
        bubble(x, tf, q.ax ?? 680, q.ay ?? 480, q.at, q.end, ans, { size: 40, tail: -0.7, maxW: 560 })
        if (q.a2) bubble(x, tf, q.a2x ?? 700, q.a2y ?? 380, q.a2t, q.end, q.a2, { size: 36, tail: -0.6, col: '#ffe9a8', maxW: 560 })
      }
      if (cfg.extra) cfg.extra(x, tf, Sf)
      // frame-0 scream mark
      if (Sf.chaos) { label(x, 'AAAAA!!', SUBJ.x + 230, 720 + 6 * Math.sin(tf * 50), { size: 64, col: '#ffe27a', font: INTER, weight: 800, rot: -0.12 }) }
      for (const q of LIES) sparkles(x, tf, NEEDLE_X, MID, q.vt, 10, 120, q.i, ['#ff6b81', '#ffffff', GOLD])
      for (const q of TRUTHS) sparkles(x, tf, SUBJ.x, SUBJ.y - 60, q.vt, 12, 220, q.i, [MINT, '#ffffff', GOLD])
      if (cfg.last) hearts(x, tf, cfg.last.t + 0.3, OPER.x, OPER.y - 80, { n: 6 })
      x.restore()
      return Sf
    }

    function tintDraw(t, S) {
      tx.clearRect(0, 0, 1080, 1920)
      const red = S.flash ? 0 : (S.chaos ? 0.7 + 0.3 * Math.sin(t * 28) : S.lie * (0.45 + 0.35 * Math.sin(t * 24)))
      if (red > 0.01) { const g = tx.createRadialGradient(540, 960, 380, 540, 960, 1150); g.addColorStop(0, 'rgba(255,40,70,0)'); g.addColorStop(1, `rgba(255,40,70,${0.5 * red})`); tx.fillStyle = g; tx.fillRect(0, 0, 1080, 1920) }
      if (S.truth > 0.01 && !S.flash) { const g = tx.createRadialGradient(540, 960, 380, 540, 960, 1150); g.addColorStop(0, 'rgba(90,255,170,0)'); g.addColorStop(1, `rgba(90,255,170,${0.3 * S.truth})`); tx.fillStyle = g; tx.fillRect(0, 0, 1080, 1920) }
    }

    function domUpdate(t) {
      const S = state(t)
      if (promise) promise.update(t, outK(t, [cfg.long.promiseOut - 0.2, cfg.long.promiseOut]))
      if (LAST) LAST.update(t, 1)
      boxes.forEach(b => { if (S.flash) b.root.style.display = 'none'; else b.update(t) })
      if (lastBox) lastBox.update(t)
      const ql = S.lieQ, qt = S.truthQ
      stLie.update(t, S.flash ? null : ql?.vt, [ql ? ql.vt + 0.85 : 0, ql ? ql.vt + 1.05 : 0])
      stTruth.update(t, S.flash ? null : qt?.vt, [qt ? qt.vt + 1.0 : 0, qt ? qt.vt + 1.2 : 0])
      if (stVerdict) stVerdict.update(t, cfg.long.verdictAt, [cfg.long.verdictOut - 0.2, cfg.long.verdictOut])
      FLASHES.forEach((f, i) => stickTruth[i].update(t, f.at + 0.05, [f.at + f.dur - 0.1, f.at + f.dur]))
      if (hud) { const qi = T.Q.filter(q => q.t <= t).length; hud.style.display = qi > 0 && qi <= T.Q.length && t < (cfg.long.verdictAt ?? D) ? 'block' : 'none'; hud.textContent = `Q ${qi}/${T.Q.length}` }
      // white flash in/out of a truth cutaway, and on the scratch
      let fl = 0
      for (const f of FLASHES) { fl = Math.max(fl, 1 - clamp(Math.abs(t - f.at) / 0.12), 1 - clamp(Math.abs(t - (f.at + f.dur)) / 0.12)) }
      flashW.style.opacity = String(clamp(fl) * 0.85)
      return S
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const S = drawScene(x, t)
        tintDraw(t, S)
        domUpdate(t)
        bug.update(t, 1)
        drawGrain(gx, t)
      },
    }
  }

  // ── hook-kit pieces
  const firstFlash = FLASHES[0]
  const hookOut = cfg.hookOut || (cfg.long ? [T.calm + 0.05, T.calm + 0.2] : firstFlash ? [firstFlash.at - 0.12, firstFlash.at] : [T.Q[0].vt + 1.3, T.Q[0].vt + 1.45])
  const HOOK = { at: -1, text: cfg.hook, top: cfg.hookTop ?? 190, size: cfg.hookSize ?? 104, accentColor: accent, out: hookOut }
  const WHIP = { at: -0.3, len: 0.5, from: 1.5, blur: 10 }
  const REC = { at: T.scratch, len: T.recLen, caption: cfg.recCaption || 'let’s run that *back.*', top: 1520 }
  const CHAPS = (cfg.long?.chapters || []).map((c, i) => ({ at: c.t, out: [c.t + (c.dur ?? 1.6) - 0.15, c.t + (c.dur ?? 1.6)], n: i + 1, title: c.text }))
  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
  const siren = (t0, d, g = 0.03) => Array.from({ length: Math.floor(d / 0.16) }, (_, i) => ['pop', r3(t0 + i * 0.16), i % 2 ? 659.25 : 880, g, i % 2 ? -0.3 : 0.3])
  const scribble = (t0, d, g = 0.02) => Array.from({ length: Math.floor(d / 0.045) }, (_, i) => ['tick', r3(t0 + i * 0.045 + (i % 3) * 0.006), g * (0.6 + 0.4 * hash(i))])
  const CUES = [
    // frame 0: off the chart, then the record scratch + freeze
    ...siren(0, T.scratch, 0.035), ...scribble(0, T.scratch, 0.03),
    ['whoosh', T.calm - 0.05, 0.3, 0.04], ['pop', T.calm, 1046.5, 0.04, 0],
    ...talkCues([...LINES, ...lastLine], { cps: T.CPS }),
    ...T.Q.flatMap((q, i) => {
      const c = [['pop', q.at, NOTE[i % 6], 0.045, -0.2], ['pop', q.at + 0.06, NOTE[(i + 2) % 6], 0.03, -0.2]]
      if (q.v === 'lie') {
        const g = cfg.long ? 0.03 + 0.004 * q.i : 0.04
        c.push(['boom', q.vt, cfg.long ? 0.2 + 0.02 * q.i : 0.32], ['tom', q.vt, 92, { gain: 0.25, decay: 0.3 }], ...siren(q.vt, 1.0, g), ...scribble(q.vt, 0.9, g * 0.7))
      } else if (q.v === 'squeak') c.push(['pop', q.vt, 1567.98, 0.05, 0], ['pop', q.vt + 0.07, 1760, 0.04, 0], ...scribble(q.vt, 0.5, 0.02))
      else c.push(['bell', q.vt, 1760, 0.05, 1.1, 0], ['bell', q.vt + 0.08, 2349.32, 0.03, 1.0, 0], ['glitter', q.vt, q.vt + 0.5], ['pluck', q.vt + 0.05, 1174.66, 0.04, 0.5, 0.2])
      return c
    }),
    ...FLASHES.flatMap(f => [['whoosh', f.at - 0.05, 0.35, 0.05], ['pop', f.at + 0.05, 1318.51, 0.04, 0], ['whoosh', f.at + f.dur - 0.05, 0.3, 0.035]]),
    ...(cfg.long?.verdictAt ? [['riser', cfg.long.verdictAt - 1.4, cfg.long.verdictAt, 0.05], ['boom', cfg.long.verdictAt, 0.4], ['crash', cfg.long.verdictAt, { gain: 0.06, len: 1.6 }], ['glitter', cfg.long.verdictAt, cfg.long.verdictAt + 0.6]] : []),
    ...(cfg.last ? [['pop', cfg.last.t, 987.77, 0.04, 0], ['pluck', cfg.last.t + 0.5, 1318.51, 0.045, 0.6, 0], ['bell', cfg.last.t + 0.55, 1760, 0.03, 1.2, 0]] : []),
    ...(T.ending === 'loop' ? [...siren(T.loopAt + 0.1, LOOP_LEN - 0.1, 0.02), ...loopCues({ duration: D, len: LOOP_LEN })] : []),
    ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...CHAPS.flatMap(c => chapterCues(c)),
    ...(cfg.cues || []),
  ]
  const sections = cfg.sections || { drop: T.calm, outroAt: cfg.last ? cfg.last.t + 0.5 : D - 1 }
  const music = { style: cfg.music.style, key: cfg.music.key, seed: cfg.music.seed, sections: { ...sections, outroAt: Math.min(sections.outroAt ?? D - 1, D - 0.6) }, hits: cfg.hits || LIES.slice(0, 3).map(q => q.vt) }
  const MAIN = frozen(build, [REC])
  const SCENES = [MAIN, whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC), ...CHAPS.map(c => chapter(c))]
  if (T.ending === 'loop') SCENES.push(loopBack([MAIN, whipZoom(WHIP), slamTitle(HOOK)], { duration: D, len: LOOP_LEN }))
  return { DURATION: D, SCENES, CUES, T, music }
}
