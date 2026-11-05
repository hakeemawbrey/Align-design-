// moonkit — the shared look of "Planet Talk: The Moon" (batch p02, kpmoe01–kpmoe12). Imported read-only by every film
// in the batch. Built on promo/films/planetkit.js (the Moon character, signs, bubbles, entrance) and hookkit.js.
// No end card, no card cut, no logo: DURATION is the story.
//
//   import { moonFilm, K } from '../../kpmoe01/moonkit.js'
//   const F = moonFilm({ ...cfg });  export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
//
// The format (every film):
//   t = 0     the Moon is mid-entrance (cfg.enter: a planetkit entrance kind, frame 0 mid-motion), the sign is caught
//             mid-action, the hook line is already slammed on screen (hookkit slamTitle at −1).
//   ≤ 1 s     a pattern break: a whip zoom (cfg.whip), a record scratch + freeze (cfg.freeze) or a HUSH (cfg.hush: the
//             music tape-stops, the screen dims and a big "shh…" floats out of the Moon).
//   story     cfg.set(x, t, K) paints the set (world space, behind everyone; default = the Moon's night sky),
//             cfg.paint(x, t, K) world props between the set and the cast, cfg.front(x, t, K) world props in front,
//             cfg.over(x, t, K) screen-space overlays (phones, labels) under the bubbles, cfg.says = speech bubbles
//             (screen space, planetkit speech()), cfg.heads = big pop captions.
//   cast      the Moon follows cfg.moon keyframes, the sign follows cfg.me keyframes, Pisces (the Moon's little
//             stargazing buddy) sits on a cloud with a telescope (cfg.pis) and CRIES in every film.
//   cfg.moonMotion(t, pose) → partial pose overrides (e.g. a pendulum swing on top of the keyframes).
//   cfg.string = { dx, until } draws the silver thread the Moon swings down on.
//   ending    'loop': hookkit loopBack eases the last LOOP s into the exact frame-0 composition (seamless replay);
//             'cut':  hard cut on the punchline (the last head lands ≥ 0.6 s before the end; nothing fades).
//
// Keyframes: [{ at, x, y, size|s, rot, mood, look, tears, d }] — numbers ease from the previous key over d s (default
// 0.45, easeInOutCubic; the first key snaps); mood / look / tears / everything else switches at `at`.
// Entrances: planetkit 'crash' is only on screen late in its fall → use at ≈ −0.6 (len 0.7) for a frame-0 mid-fall.
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { popText } from '../lesson.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, entranceLand, aboveHorizon, PLANETS } from '../planetkit.js'
import {
  slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, freezeTime, loopBack, loopCues,
  chapter, chapterCues,
} from '../hookkit.js'
import { box, rect, rrect, txt, rich, phone, room, label, loading } from '../kdwe01/dwkit.js'
export * as HK from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff3b4e', PINK = '#ff8fb1', CY = '#7fe3ff'
export const SILVER = '#dfe2f2', MOONRIM = '#9aa3d6', NIGHT = '#0b0820'
export const INTER = "'Inter', system-ui, sans-serif", MONO = "'Space Mono', ui-monospace, monospace", SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d) * outK(t, [b - 0.25, b])

// ═══════════════════════════════════════ keyframe tracks
const NUM = new Set(['x', 'y', 'size', 's', 'rot', 'squash', 'alpha'])
export function track(keys, t, base = {}) {
  let cur = { ...base }, prev = { ...base }, k0 = null, n = 0
  for (const k of keys) {
    if (k.at > t) break
    prev = { ...cur }; n++
    for (const [p, v] of Object.entries(k)) if (p !== 'at' && p !== 'd') cur[p] = v
    k0 = k
  }
  if (!k0 || n === 1) return cur
  const e = ease.inOutCubic(prog(t, k0.at, k0.at + (k0.d ?? 0.45)))
  const out = { ...cur }
  for (const p of NUM) if (typeof cur[p] === 'number' && typeof prev[p] === 'number') out[p] = lerp(prev[p], cur[p], e)
  return out
}

// ═══════════════════════════════════════ moon-flavoured props
/** a moon phase disc (phase 0 = new, 0.5 = full, 1 = new again), lit from the right while waxing */
export function phaseDisc(x, X, Y, r, phase, { lit = SILVER, dark = '#2a2550', ink = INK } = {}) {
  x.save()
  x.fillStyle = ink; x.beginPath(); x.arc(X, Y, r + 5, 0, TAU); x.fill()
  x.fillStyle = dark; x.beginPath(); x.arc(X, Y, r, 0, TAU); x.fill()
  const p = ((phase % 1) + 1) % 1
  const waxing = p <= 0.5, f = waxing ? p * 2 : (1 - p) * 2   // 0 new → 1 full
  x.fillStyle = lit; x.beginPath()
  const side = waxing ? 1 : -1
  x.arc(X, Y, r, -Math.PI / 2, Math.PI / 2, side < 0)          // the lit limb
  const tw = r * (1 - 2 * f)                                     // terminator ellipse half-width
  x.ellipse(X, Y, Math.abs(tw), r, 0, Math.PI / 2, -Math.PI / 2, (side > 0) === (tw > 0))
  x.fill()
  x.restore()
}
/** the phase strip: 8 discs pop in left → right (new → full → new); k = how far it has filled (0…1) */
export function phaseStrip(x, t, { at, out, y = 760, r = 46, label: lb = null }) {
  const vis = inOut(t, at, out)
  if (vis <= 0.01) return
  x.save(); x.translate(540, y); x.scale(vis, vis)
  box(x, -500, -r - 34, 1000, r * 2 + 68 + (lb ? 56 : 0), 'rgba(12,8,34,0.88)', { o: 6 })
  for (let i = 0; i < 8; i++) {
    const k = pop01(t, at + 0.1 + i * 0.12, 0.25, 2.4)
    if (k <= 0) continue
    x.save(); x.translate(-437 + i * 125, 0); x.scale(k, k); phaseDisc(x, 0, 0, r, i / 8); x.restore()
  }
  if (lb) txt(x, lb, 0, r + 44, { size: 30, color: SILVER })
  x.restore()
}
/** a puffy pixel cloud centred at (X, Y), width w */
export function cloud(x, X, Y, w, { color = '#cfd3f0', shade = '#9aa0d0', alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha
  const h = w * 0.36, P = Math.max(6, Math.round(w / 40))
  const puffs = [[-0.32, 0.05, 0.22], [-0.08, -0.12, 0.28], [0.2, -0.05, 0.24], [0.38, 0.08, 0.16], [0, 0.12, 0.3]]
  for (const pass of [0, 1, 2]) {
    for (const [px, py, pr] of puffs) {
      const cx = X + px * w, cy = Y + py * w + (pass === 2 ? -P : 0), rr = pr * w + (pass === 0 ? P : 0)
      x.fillStyle = pass === 0 ? INK : pass === 1 ? shade : color
      x.beginPath(); x.arc(Math.round(cx), Math.round(cy), Math.round(pass === 2 ? rr - P : rr), 0, TAU); x.fill()
    }
  }
  x.fillStyle = INK; x.fillRect(Math.round(X - w * 0.5), Math.round(Y + h * 0.45), Math.round(w), P)
  x.restore()
  return { top: Y - h * 0.6 }
}
/** a small brass telescope on a tripod (Pisces' prop), pointing at angle a */
export function telescope(x, X, Y, s = 1, a = -0.6) {
  x.save(); x.translate(X, Y); x.scale(s, s)
  x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'
  for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(0, 0); x.lineTo(d * 44, 90); x.stroke() }
  x.strokeStyle = '#8a6a3a'; x.lineWidth = 5
  for (const d of [-1, 0, 1]) { x.beginPath(); x.moveTo(0, 0); x.lineTo(d * 44, 90); x.stroke() }
  x.rotate(a)
  box(x, -30, -14, 130, 28, '#d9a94a', { o: 5 }); box(x, 96, -20, 36, 40, '#f2c75c', { o: 5 }); rect(x, -6, -14, 8, 28, '#8a6a3a')
  x.restore()
}
/** the "shh…" that floats out of the Moon during a hush, and the room dims */
function hushFx(x, t, at, len, mx, my) {
  const k = prog(t, at, at + len)
  if (k <= 0 || k >= 1) return
  const a = Math.sin(Math.PI * k)
  x.save(); x.fillStyle = `rgba(4,2,14,${0.45 * a})`; x.fillRect(0, 0, 1080, 1920)
  x.globalAlpha = a; x.translate(mx + 120 + 90 * k, my - 140 - 160 * k); x.rotate(-0.12)
  txt(x, 'shh…', 0, 0, { size: 120, font: SERIF, weight: 600, italic: true, color: SILVER })
  x.restore()
}

export const K = { box, rect, rrect, txt, rich, phone, room, label, loading, phaseDisc, phaseStrip, cloud, telescope, pop01, outK, inOut, track, drawPlanet, drawSign, drawSpace, GOLD, BONE, INK, RED, PINK, CY, SILVER, MOONRIM, NIGHT, INTER, MONO, SERIF }

// ═══════════════════════════════════════ the series bug
function buildBug(root) {
  const b = el('div', { position: 'absolute', left: '56px', top: '64px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '34px', height: '34px' }, b); ic.width = 34; ic.height = 34
  { const c = ic.getContext('2d'); c.fillStyle = SILVER; c.beginPath(); c.arc(17, 17, 15, 0, TAU); c.fill(); c.globalCompositeOperation = 'destination-out'; c.beginPath(); c.arc(24, 12, 14, 0, TAU); c.fill() }
  el('div', { font: `800 28px ${INTER}`, letterSpacing: '0.2em', color: '#e6e8fa', textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', fontVariant: 'small-caps' }, b, 'PLANET&nbsp;TALK&nbsp;·&nbsp;THE&nbsp;MOON')
  return { update(o = 1) { b.style.opacity = String(o) } }
}

// ═══════════════════════════════════════ the film
export function moonFilm(cfg) {
  const D = cfg.dur, SIGN = cfg.sign, LOOP = cfg.ending === 'loop' ? (cfg.loopLen ?? 0.45) : 0
  const E = { kind: 'crash', at: -0.25, x: 540, y: 640, size: 540, ...(cfg.enter || {}) }
  const LAND = entranceLand(E.kind, E)
  const moonKeys = cfg.moon || []
  const meKeys = cfg.me || []
  const PIS = cfg.pis || null
  const says = (cfg.says || []).map(s => ({ size: 44, maxW: 720, cps: s.who === 'moon' ? 26 : 32, ...s }))
  const lines = says.map(s => ({ t: s.t0, who: s.who, text: s.text }))
  const shots = cfg.shots || [{ at: -10, cam: [1, 540, 960] }]
  const HOOK = { at: -1, top: 210, size: 104, ...cfg.hook }
  const WHIP = cfg.whip === false ? null : { at: 0.55, len: 0.42, from: 1.5, blur: 18, ...(cfg.whip || {}) }
  const FREEZE = cfg.freeze ? { len: 1.2, top: 1640, ...cfg.freeze } : null
  const hushes = (cfg.hush || []).map(h => typeof h === 'number' ? { at: h, len: 1.3 } : { len: 1.3, ...h })
  const st = t => (FREEZE ? freezeTime(t, [FREEZE]) : t)

  function camOf(t) {
    let i = 0; for (let j = 0; j < shots.length; j++) if (t >= shots[j].at) i = j
    const sh = shots[i]
    let [z, cx, cy] = sh.cam
    const nxt = shots[i + 1]
    z *= 1 + (sh.push ?? 0.025) * prog(t, Math.max(0, sh.at), nxt ? nxt.at : D)
    if (i > 0) {
      const p = prog(t, sh.at, sh.at + (sh.d ?? 0.3))
      if (p < 1) { const [pz, px, py] = shots[i - 1].cam; const e = ease.outCubic(p); z = lerp(pz, z, e); cx = lerp(px, cx, e); cy = lerp(py, cy, e) }
    }
    return { z, cx, cy }
  }
  function moonPose(t) {
    const P = entrance(E.kind, t, E)
    const base = { x: E.x, y: E.y, size: E.size, rot: 0, mood: cfg.moonMood ?? 'sad', squash: 0 }
    if (t < LAND) return { ...base, ...P, mood: track(moonKeys, t, base).mood ?? base.mood, entering: true }
    return track(moonKeys, t, base)
  }
  function world(x, t) {
    if (cfg.set) cfg.set(x, t, K)
    else drawSpace(x, t, { planet: 'moon', horizon: cfg.horizon ?? null, seed: cfg.seed ?? 3 })
    if (cfg.paint) cfg.paint(x, t, K)
    // Pisces on its cloud with the telescope
    if (PIS && t >= (PIS.from ?? -10)) {
      const p = track(PIS.keys || [], t, { x: PIS.x, y: PIS.y, s: PIS.s ?? 170, tears: 0, mood: 'sparkle', look: [-1, -0.4] })
      const k = PIS.from != null && PIS.from > 0 ? pop01(t, PIS.from, 0.4) : 1
      x.save(); x.translate(p.x, p.y); x.scale(k, k); x.translate(-p.x, -p.y)
      const drift = Math.sin(t * 0.9) * 8
      if (PIS.cloud !== false) cloud(x, p.x, p.y + p.s * 0.55 + drift, p.s * 1.9)
      if (PIS.scope !== false) telescope(x, p.x + p.s * (PIS.flip ? -0.75 : 0.75), p.y + p.s * 0.05 + drift, p.s / 230, PIS.flip ? -2.5 : -0.6)
      drawSign(x, 'pisces', p.x, p.y + drift, p.s, t, { mood: p.mood, look: p.look, tears: p.tears, seed: 6, hops: PIS.hops || null, glow: 0.8 })
      x.restore()
    }
    // the sign
    if (meKeys.length) {
      const m = track(meKeys, t, { x: 540, y: 1340, s: 300, mood: 'wide', look: [0, -1], tears: 0, squash: 0, rot: 0 })
      if (m.s > 0 && (m.alpha ?? 1) > 0) {
        const hops = says.filter(s => s.who === SIGN).map(s => s.t0 + 0.1)
        if (m.rot) { x.save(); x.translate(m.x, m.y); x.rotate(m.rot); x.translate(-m.x, -m.y) }
        drawSign(x, SIGN, m.x, m.y, m.s, t, { mood: m.mood, look: m.look, tears: m.tears, squash: m.squash, hops: [...hops, ...(cfg.meHops || [])], seed: 3, shadow: m.shadow ?? false, sweat: m.sweat ?? false, alpha: m.alpha ?? 1 })
        if (m.rot) x.restore()
        if (cfg.meProp) cfg.meProp(x, t, m, K)
      }
    }
    // the Moon
    const M = moonPose(t)
    if (cfg.moonMotion) Object.assign(M, cfg.moonMotion(t, M))
    if ((M.alpha ?? 1) > 0 && M.size > 0) {
      const drawM = () => {
        if (cfg.string && t < (cfg.string.until ?? 1e9)) {
          // the silver thread the Moon swings down on (from the top of the frame to the top of the Moon)
          x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(M.x + (cfg.string.dx ?? -60), -400); x.lineTo(M.x, M.y - M.size / 2 + 8); x.stroke()
          x.strokeStyle = '#eef0ff'; x.lineWidth = 5; x.stroke(); x.restore()
        }
        if (t < LAND + 0.6) drawEntranceFx(x, 'moon', E.kind, t, E)
        drawPlanet(x, 'moon', M.x, M.y, M.size, t, { rot: M.rot, squash: M.squash, alpha: M.alpha ?? 1, mood: M.mood, look: M.look, tears: M.tears ?? 0, lines, cps: 26, hops: cfg.moonHops || null, seed: 5 })
      }
      if (cfg.horizon && E.kind === 'rise' && t < LAND + 0.2) aboveHorizon(x, cfg.horizon.y ?? 1560, drawM); else drawM()
    }
    if (cfg.front) cfg.front(x, t, K)
    return M
  }

  async function build(stage) {
    try { await Promise.all(["900 96px Inter", "800 44px Inter", "800 28px Inter", "italic 600 120px 'EB Garamond'", "italic 600 50px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: NIGHT })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = (cfg.heads || []).map(h => ({ h, P: popText(root, h.text.replace(/\s*\|\s*/g, ' | '), { top: h.top ?? 250, size: h.size ?? 88, accentSize: h.accentSize ?? Math.round((h.size ?? 88) * 1.3), at: h.at, gap: h.gap ?? 0.07, late: h.late || 0, lateAt: h.lateAt ?? null, wobble: true, accentColor: h.accent || '#b9c2ff', fit: true }) }))
    const top = layerCanvas(root), tx = top.getContext('2d')
    const bug = buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0, pointerEvents: 'none' }, root)
    return {
      start: 0, end: D + 0.01, root,
      update(T) {
        const t = T
        const shake = Math.max(0, ...(cfg.shakes || []).map(s => { const d = t - s; return d > 0 && d < 0.45 ? 18 * Math.exp(-d * 9) : 0 })) * Math.sin(t * 70)
        const { z, cx, cy } = camOf(t)
        x.save(); x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = NIGHT; x.fillRect(0, 0, 1080, 1920)
        x.translate(0, shake); x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
        const M = world(x, t)
        x.restore()
        // screen space
        tx.setTransform(1, 0, 0, 1, 0, 0); tx.clearRect(0, 0, 1080, 1920)
        for (const h of hushes) {
          // the Moon's screen position for the "shh…"
          const sx = (M.x - cx) * z + 540, sy = (M.y - cy) * z + 960
          hushFx(tx, t, h.at, h.len, sx, sy)
        }
        if (cfg.over) { tx.save(); tx.translate(0, shake); cfg.over(tx, t, K); tx.restore() }
        for (const s of says) speech(tx, t, s)
        if (cfg.overTop) cfg.overTop(tx, t, K)
        for (const { h, P } of heads) P.update(t, h.out ? outK(t, h.out) : 1)
        bug.update(1)
        const f = Math.max(0, ...(cfg.flashes || []).map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        flash.style.opacity = String(0.55 * f)
        drawGrain(gx, T)
      },
    }
  }

  // ── sound
  const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91]
  const wordPops = (t0, n, gap, b0 = 0, gain = 0.022) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(b0 + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const fx = (cfg.fx || [])
  const CUES = [
    ...entranceCues(E.kind, E),
    ...slamTitleCues(HOOK),
    ...(WHIP ? whipZoomCues(WHIP) : []),
    ...(FREEZE ? recordScratchCues(FREEZE) : []),
    ...hushes.flatMap(h => [['tapeStop', r3(h.at - 0.05), 0.35], ['whoosh', r3(h.at + 0.1), 0.9, 0.05], ['bell', r3(h.at + 0.25), 1396.91, 0.025, 2.2, 0.2]]),
    ...fx.flatMap(e => e.c ? e.c(e.o) : []),
    ...(cfg.chapters || []).flatMap(c => chapterCues(c)),
    ...shots.filter(s => s.at > 0.2).flatMap(s => [['whoosh', r3(s.at - 0.04), 0.22, 0.03]]),
    ...(cfg.heads || []).filter(h => h.at > 0).flatMap((h, i) => wordPops(h.at, Math.max(1, h.text.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length - (h.late || 0)), h.gap ?? 0.07, i)),
    ...(cfg.heads || []).filter(h => h.late).flatMap(h => [['pop', r3(h.lateAt), 1174.66, 0.045, 0], ['pop', r3(h.lateAt + 0.08), 1567.98, 0.03, 0]]),
    ...speechCues(says),
    ...(PIS?.sobs || []).flatMap(s => [['pluck', r3(s), 659.25, 0.035, 0.5, 0.3], ['pluck', r3(s + 0.16), 587.33, 0.035, 0.5, 0.3], ['pluck', r3(s + 0.34), 523.25, 0.03, 0.6, 0.3]]),
    ...(cfg.shakes || []).map(s => ['boom', r3(s), 0.06]),
    ...(cfg.flashes || []).map(s => ['tick', r3(s), 0.06]),
    ...(LOOP ? loopCues({ duration: D, len: LOOP }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const brk = [...(cfg.music.sections?.breakdown ? [].concat(cfg.music.sections.breakdown) : []), ...hushes.filter(h => h.at > 1.5).map(h => h.at)]
  const MUSIC = { ...cfg.music, sections: { ...(cfg.music.sections || {}), ...(brk.length ? { breakdown: brk } : {}), outroAt: cfg.music.sections?.outroAt ?? Math.max(1.5, D - 1.6) } }

  const MAIN = FREEZE ? frozen(build, [FREEZE]) : build
  const TITLE = slamTitle(HOOK)
  const SCENES = [MAIN, ...(WHIP ? [whipZoom(WHIP)] : []), ...(FREEZE ? [recordScratch(FREEZE)] : []), ...fx.map(e => e.f(e.o)), ...(cfg.chapters || []).map(c => chapter(c)), TITLE]
  if (LOOP) SCENES.push(loopBack([MAIN, slamTitle(HOOK)], { duration: D, len: LOOP }))
  return { DURATION: D, SCENES, CUES, MUSIC, K, LAND, st }
}
