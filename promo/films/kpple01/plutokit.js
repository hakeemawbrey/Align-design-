// plutokit — the shared look of PLANET TALK: PLUTO (batch p10, kpple01–kpple12). Imported read-only by every film in
// the batch. Built on planetkit.js (the cast, the entrance, the bubbles) and hookkit.js (slam title, whip, scratch,
// loop). No end card, no card cut, no logo, no "Align": DURATION is the story.
//
//   import { plutoFilm } from '../../kpple01/plutokit.js'
//   const F = plutoFilm({ ...cfg });  export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
//
// The format (every film):
//   t = 0      Pluto mid-entrance (cfg.enter: crash / rise / drop / burst / zoom…) with red-violet eclipse light and a
//              HUGE shadow on the set; the hook line is already slammed on screen (hookkit slamTitle, at: -1).
//   landing    boom + screen shake + a whip punch-in (the pattern break, before 1 s). Then: Pluto is tiny.
//   story      cfg.bg / cfg.paint draw the set in world space (cfg.shots = gentle camera moves), cfg.says are the
//              planetkit speech bubbles (screen space), cfg.heads are pop captions, cfg.over draws screen-space props.
//   Pisces     cries in every film (K.sign(x, t, 'pisces', { tears: 3 })).
//   ending     'loop': hookkit loopBack eases the last 0.45 s into the exact frame-0 picture (seamless replay);
//              'cut':  the punchline (cfg.last) lands ≥ 0.6 s before the end and the last frame is a story frame.
//
// cfg: { id, sign, dur, ending, hook: { text, top, size, out }, enter: { kind, at, len, x, y, size }, shadow?,
//        bg?(x, t, K), paint(x, t, K), over?(x, t, K), says: [speech opts], heads: [{ text, at, out, y, size }],
//        last?: { text, at, y, size }, shots?: [{ at, z, cx, cy, d }], whip?: hookkit opts | false, rec?: { at, len,
//        caption, sub }, shakes?: [t], flashes?: [t], fx?: [{ f, c, o }], chapters?: [{ at, out, n, title }], cues?,
//        music: { style, key, seed, sections } }
// Pure f(t). Nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, rng } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, entranceLand, aboveHorizon, colorOf } from '../planetkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, screenShake, shakeCues, loopBack, loopCues, drawRich, chapter, chapterCues } from '../hookkit.js'
export * as HK from '../hookkit.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff3b4e', PINK = '#ff8fb1', CY = '#7fe3ff'
export const PLUM = '#c06a9a', EMBER = '#ff5a6e', VIOLET = '#8a4fd0'
export const INTER = "'Inter', system-ui, sans-serif", MONO = "'Space Mono', ui-monospace, monospace", SERIF = "'EB Garamond', Georgia, serif"
export const CPS = 30
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inOut = (t, a, b, d = 0.3) => pop01(t, a, d) * outK(t, [b - 0.25, b])
const R = Math.round
const TAU = Math.PI * 2

// ═══════════════════════════════════════ drawing helpers (world or screen space)
export function box(x, X, Y, w, h, c, { ink = INK, o = 4 } = {}) {
  x.fillStyle = ink; x.fillRect(R(X - o), R(Y - o), R(w + 2 * o), R(h + 2 * o))
  x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h))
}
export function rect(x, X, Y, w, h, c) { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
export function rrect(x, X, Y, w, h, r, c, stroke = null, lw = 4) {
  x.beginPath(); x.roundRect(X, Y, w, h, r)
  if (c) { x.fillStyle = c; x.fill() }
  if (stroke) { x.strokeStyle = stroke; x.lineWidth = lw; x.stroke() }
}
export function txt(x, s, X, Y, { size = 32, font = MONO, weight = 700, color = BONE, align = 'center', base = 'middle', italic = false, maxW, alpha = 1, spacing = 0 } = {}) {
  x.save(); x.globalAlpha *= alpha
  x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = base; x.fillStyle = color
  if (spacing) x.letterSpacing = spacing + 'px'
  x.fillText(s, X, Y, maxW); x.restore()
}
export function glow(x, X, Y, r, color, a = 0.5) {
  const g = x.createRadialGradient(X, Y, 0, X, Y, r)
  g.addColorStop(0, rgbaHex(color, a)); g.addColorStop(1, rgbaHex(color, 0))
  x.fillStyle = g; x.fillRect(X - r, Y - r, r * 2, r * 2)
}
function rgbaHex(hex, a) { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
/** a sticky label (world or screen) */
export function label(x, s, X, Y, { size = 30, bg = BONE, ink = INK, rot = 0, pad = 18, pop = 1 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(pop, pop)
  x.font = `700 ${size}px ${MONO}`; const w = x.measureText(s).width + pad * 2, h = size + pad * 1.4
  box(x, -w / 2, -h / 2, w, h, bg, { o: 4 }); txt(x, s, 0, 2, { size, color: ink })
  x.restore()
}
/** a phone: bubbles [{ side: 'L'|'R'|'C', text, at, color?, from? }] */
export function phone(x, t, { X = 540, Y = 960, w = 520, h = 900, rot = 0, pop = 1, title = '', time = '11:48', bubbles = [], screen = null, bg = '#1a1236', accent = PINK, size = 32 } = {}) {
  if (pop <= 0.01) return
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(pop, pop)
  rrect(x, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 56, INK)
  rrect(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 50, '#3a2f5a')
  rrect(x, -w / 2, -h / 2, w, h, 44, bg)
  rrect(x, -60, -h / 2 + 14, 120, 26, 13, INK)
  txt(x, time, -w / 2 + 50, -h / 2 + 28, { size: 22, align: 'left', color: BONE })
  if (title) { rect(x, -w / 2, -h / 2 + 56, w, 76, 'rgba(255,255,255,0.06)'); txt(x, title, 0, -h / 2 + 94, { size: 28, color: BONE, maxW: w - 40 }) }
  x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2 + 136, w, h - 150, 30); x.clip()
  if (screen) screen(x, t, w, h)
  let y = -h / 2 + 170
  for (const b of bubbles) {
    const k = b.at == null ? 1 : pop01(t, b.at, 0.28, 2.2)
    if (k <= 0) { continue }
    const fs = b.size ?? size
    x.font = `700 ${fs}px ${MONO}`
    const words = b.text.split(' '), rows = []; let cur = ''
    for (const wd of words) { const test = cur ? cur + ' ' + wd : wd; if (x.measureText(test).width > w * 0.66 && cur) { rows.push(cur); cur = wd } else cur = test }
    rows.push(cur)
    const lh = fs * 1.25, bw = Math.max(...rows.map(r => x.measureText(r).width)) + 44, bh = rows.length * lh + 26
    const bx = b.side === 'R' ? w / 2 - 24 - bw : b.side === 'C' ? -bw / 2 : -w / 2 + 24
    x.save(); x.translate(bx + bw / 2, y + bh / 2); x.scale(k, k); x.translate(-(bx + bw / 2), -(y + bh / 2))
    if (b.strike) x.globalAlpha *= 0.55
    if (b.from) txt(x, b.from, b.side === 'R' ? bx + bw : bx, y - 14, { size: 20, align: b.side === 'R' ? 'right' : 'left', color: '#bdb3d8' })
    rrect(x, bx, y, bw, bh, 24, b.color ?? (b.side === 'R' ? accent : '#efe6d6'))
    rows.forEach((r, i) => txt(x, r, bx + 22, y + 13 + lh * (i + 0.5), { size: fs, align: 'left', color: b.ink ?? INK }))
    if (b.strike) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(bx - 6, y + bh / 2); x.lineTo(bx + bw + 6, y + bh / 2); x.stroke() }
    x.restore()
    y += bh + (b.from ? 52 : 22)
  }
  x.restore()
  x.restore()
}
/** an interior room (world space): wall gradient, dots, optional window with a moon, floor */
export function room(x, t, { wall = '#2a1d4e', wall2 = '#1d1438', floor = '#3a2742', floorY = 1380, window: win = true, lamp = true, warm = 0.25 } = {}) {
  const g = x.createLinearGradient(0, -400, 0, floorY); g.addColorStop(0, wall2); g.addColorStop(1, wall)
  x.fillStyle = g; x.fillRect(-1200, -800, 3480, floorY + 800)
  x.fillStyle = 'rgba(255,255,255,0.035)'
  for (let j = -6; j < 15; j++) for (let i = -10; i < 22; i++) if ((i + j) % 2 === 0) x.fillRect(i * 110 + 30, j * 110 + 40, 10, 10)
  if (win) {
    box(x, 640, 300, 320, 420, '#0d0a2a', { o: 10 })
    for (let k = 0; k < 14; k++) { const r = rng(k * 9 + 3); const sx = 660 + r() * 280, sy = 320 + r() * 380, tw = 0.5 + 0.5 * Math.sin(t * 3 + k); rect(x, sx, sy, 5, 5, `rgba(255,244,220,${0.4 + 0.6 * tw})`) }
    rect(x, 795, 300, 10, 420, INK); rect(x, 640, 505, 320, 10, INK)
  }
  const f = x.createLinearGradient(0, floorY, 0, floorY + 600); f.addColorStop(0, floor); f.addColorStop(1, '#120a20')
  x.fillStyle = f; x.fillRect(-1200, floorY, 3480, 1400)
  rect(x, -1200, floorY - 14, 3480, 18, INK); rect(x, -1200, floorY - 10, 3480, 6, 'rgba(255,255,255,0.08)')
  for (let i = -10; i < 30; i++) rect(x, i * 150, floorY + 40, 6, 600, 'rgba(0,0,0,0.12)')
  if (lamp) glow(x, 120, 700, 520, '#ffd68c', 0.22 + warm * 0.3)
}
/** Pluto's eclipse light: a red-violet corona + slow rays behind (X, Y) */
export function eclipse(x, t, X, Y, r, k = 1) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= k
  glow(x, X, Y, r * 2.6, VIOLET, 0.45)
  glow(x, X, Y, r * 1.6, EMBER, 0.5)
  x.globalCompositeOperation = 'lighter'
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * TAU + t * 0.12, w = 0.06 + 0.03 * Math.sin(i * 3.1)
    x.fillStyle = `rgba(255,90,110,${0.08 + 0.05 * Math.sin(t * 2 + i)})`
    x.beginPath(); x.moveTo(X, Y); x.arc(X, Y, r * 3, a - w, a + w); x.closePath(); x.fill()
  }
  x.restore()
}
/** sparkly floating motes (letting-go particles) rising from (X, Y) */
export function motes(x, t, X, Y, { n = 10, spread = 300, rise = 600, t0 = 0, dur = 3, color = GOLD, seed = 3 } = {}) {
  const r = rng(seed)
  for (let i = 0; i < n; i++) {
    const off = r() * dur, sx = (r() - 0.5) * spread, sz = 14 + Math.round(r() * 2) * 6
    const ph = (t - t0 - off * 0.5)
    if (ph < 0) continue
    const p = (ph % dur) / dur
    x.save(); x.globalAlpha = Math.sin(p * Math.PI) * 0.9
    drawPixelStar(x, X + sx + Math.sin(p * 6 + i) * 30, Y - p * rise, sz, i % 3, i % 2 ? color : BONE)
    x.restore()
  }
}

// ═══════════════════════════════════════ the series bug (canvas: survives the loop copy)
function bug(x) {
  x.save()
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  try { x.fontVariantCaps = 'all-small-caps' } catch (_) { /* optional */ }
  x.letterSpacing = '6px'
  x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.shadowOffsetY = 2
  x.fillStyle = '#d9c3ff'
  drawPixelStar(x, 70, 88, 22, 1, '#d9c3ff')
  x.fillText('PLANET TALK', 96, 90)
  x.restore()
}

// ═══════════════════════════════════════ the film
export function plutoFilm(cfg) {
  const D = cfg.dur, SIGN = cfg.sign, LOOP = cfg.ending === 'loop' ? (cfg.loopLen ?? 0.45) : 0
  const EN = { kind: 'crash', at: -0.35, x: 540, y: 760, size: 300, ...(cfg.enter || {}) }
  const LAND = entranceLand(EN.kind, EN)
  const HOOK = { at: -1, top: 230, size: 108, out: [2.5, 2.75], ...cfg.hook }
  const WHIP = cfg.whip === false ? null : { at: r3(LAND + 0.02), len: 0.42, from: 1.35, blur: 16, cx: EN.x, cy: EN.y, ...(cfg.whip || {}) }
  const SHAKE = { at: r3(LAND), len: 0.5, amp: 30 }
  const REC = cfg.rec ? { len: 1.4, top: 1580, ...cfg.rec } : null
  const says = (cfg.says || []).map(s => ({ cps: 32, size: 46, maxW: 700, tail: 0, ...s }))
  const lines = says.map(s => ({ t: s.t0 + 0.08, who: s.who, speaker: s.who, text: s.text }))
  const shots = cfg.shots || []
  const hopsOf = who => says.filter(s => s.who === who).flatMap(s => [s.t0 + 0.05, s.t0 + 0.6])

  function camOf(t) {
    let z = 1, cx = 540, cy = 960
    for (const s of shots) {
      const k = ease.inOutCubic(prog(t, s.at, s.at + (s.d ?? 0.5)))
      if (k <= 0) break
      z = lerp(z, s.z ?? 1, k); cx = lerp(cx, s.cx ?? 540, k); cy = lerp(cy, s.cy ?? 960, k)
    }
    return { z, cx, cy }
  }
  const K = {
    D, SIGN, LAND, EN, box, rect, rrect, txt, label, phone, room, glow, eclipse, motes, pop01, outK, inOut, lerp, prog, ease, clamp,
    GOLD, BONE, INK, RED, PINK, CY, PLUM, EMBER, VIOLET, MONO, INTER, SERIF,
    space: (x, t, o = {}) => drawSpace(x, t, { planet: 'pluto', ...o }),
    /** Pluto: during the entrance it follows the entrance pose (o.x/o.y/o.size should match cfg.enter), then o */
    pluto(x, t, o = {}) {
      const base = { x: EN.x, y: EN.y, size: EN.size, ...o }
      let px = base.x, py = base.y, ps = base.size, rot = o.rot ?? 0, squash = o.squash ?? 0, alpha = o.alpha ?? 1
      if (t < LAND + 1.0 && o.entrance !== false) {
        if (cfg.shadow !== false && t < LAND + 0.25) {
          // the HUGE menacing shadow it casts while arriving
          const k = 1 - ease.inCubic(prog(t, LAND - 0.1, LAND + 0.25))
          x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#05020e'
          x.beginPath(); x.ellipse(540, 980, 760 * (0.8 + 0.2 * k), 900 * (0.8 + 0.2 * k), 0, 0, TAU); x.fill(); x.restore()
        }
        eclipse(x, t, EN.x, EN.y, EN.size * 0.7, 1 - prog(t, LAND + 0.2, LAND + 1.0) * 0.6)
        drawEntranceFx(x, 'pluto', EN.kind, t, EN)
        if (t < LAND) { const P = entrance(EN.kind, t, EN); px = P.x; py = P.y; ps = P.size; rot += P.rot; squash += P.squash; alpha *= P.alpha }
        else { const P = entrance(EN.kind, t, EN); squash += P.squash; rot += P.rot }
      } else if (o.aura !== false) eclipse(x, t, px, py, ps * 0.6, 0.35)
      const draw = () => drawPlanet(x, 'pluto', px, py, ps, t, { mood: o.mood ?? 'sly', look: o.look, lines, speaker: 'pluto', cps: 32, badge: o.badge ?? true, rot, squash, alpha, tears: o.tears ?? 0, pop: o.pop ?? 1, hops: o.hops, blush: o.blush })
      if (EN.kind === 'rise' && t < LAND + 0.05 && EN.horizon) aboveHorizon(x, EN.horizon, draw); else draw()
    },
    /** a sign star (talk hops from its bubbles) */
    sign(x, t, id, o = {}) {
      return drawSign(x, id, o.x ?? 540, o.y ?? 1300, o.size ?? 300, t, { mood: o.mood ?? 'neutral', look: o.look, hops: o.hops ?? hopsOf(id), seed: o.seed ?? id.length, tears: o.tears ?? 0, squash: o.squash, pop: o.pop, alpha: o.alpha, shadow: o.shadow ?? true, sweat: o.sweat, blink: o.blink })
    },
    pisces(x, t, o = {}) { return K.sign(x, t, 'pisces', { mood: 'sparkle', look: [0, -0.5], tears: 3, seed: 6, ...o }) },
    /** pop caption (screen) */
    head(x, t, { text, at, out, y = 340, size = 84, accent = GOLD, maxW = 960 }) {
      const k = pop01(t, at, 0.3, 2.3) * (out ? outK(t, out) : 1)
      if (k <= 0.01) return
      x.save(); x.translate(540, y); x.scale(k, k); x.globalAlpha *= clamp(k * 1.6)
      drawRich(x, text, 0, 0, { size, accentColor: accent, maxW })
      x.restore()
    },
  }

  async function build(stage) {
    try { await Promise.all(["800 30px Inter", "800 84px Inter", "italic 600 100px 'EB Garamond'", "700 30px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#07041a' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const top = layerCanvas(root), tx = top.getContext('2d')
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        const { z, cx, cy } = camOf(t)
        x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, 1080, 1920)
        x.save(); x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
        if (cfg.bg) cfg.bg(x, t, K); else K.space(x, t, { horizon: EN.horizon ? { y: EN.horizon } : null })
        cfg.paint(x, t, K)
        x.restore()
        const fl = Math.max(0, ...(cfg.flashes || []).map(c => (t >= c && t < c + 0.12) ? 1 - (t - c) / 0.12 : 0))
        if (fl > 0) { x.fillStyle = `rgba(255,236,246,${0.7 * fl})`; x.fillRect(0, 0, 1080, 1920) }
        tx.clearRect(0, 0, 1080, 1920)
        if (cfg.over) cfg.over(tx, t, K)
        for (const s of says) speech(tx, t, s)
        for (const h of cfg.heads || []) K.head(tx, t, h)
        if (cfg.last) K.head(tx, t, { y: 330, size: 92, ...cfg.last })
        if (cfg.overTop) cfg.overTop(tx, t, K)
        bug(tx)
        drawGrain(gx, t)
      },
    }
  }
  const main = REC ? frozen(build, [REC]) : build
  const extra = []
  if (WHIP) extra.push(whipZoom(WHIP))
  extra.push(screenShake(SHAKE))
  for (const s of cfg.shakes || []) extra.push(screenShake({ at: s, len: 0.4, amp: 20 }))
  if (REC) extra.push(recordScratch(REC))
  for (const e of cfg.fx || []) extra.push(e.f(e.o))
  for (const c of cfg.chapters || []) extra.push(chapter({ y: 150, x: 60, color: '#d9b3ff', ...c }))
  const SCENES = [main, ...extra, slamTitle(HOOK)]
  if (LOOP) SCENES.push(loopBack([main, slamTitle(HOOK)], { duration: D, len: LOOP }))

  // ── sound
  const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
  const CUES = [
    ...entranceCues(EN.kind, EN), ['boom', r3(LAND), 0.3], ['tom', r3(LAND + 0.02), 55, { gain: 0.32, decay: 0.5 }],
    ...slamTitleCues(HOOK),
    ...(WHIP ? whipZoomCues(WHIP) : []), ...shakeCues(SHAKE),
    ...(cfg.shakes || []).flatMap(s => shakeCues({ at: s, len: 0.4 })),
    ...(REC ? recordScratchCues(REC) : []),
    ...(cfg.fx || []).flatMap(e => e.c ? e.c(e.o) : []),
    ...(cfg.chapters || []).flatMap(c => chapterCues(c)),
    ...speechCues(says),
    ...[...(cfg.heads || []), ...(cfg.last ? [{ at: cfg.last.at, text: cfg.last.text }] : [])].flatMap((h, i) => [['pop', r3(h.at), NOTE[i % NOTE.length], 0.035, 0], ['tick', r3(h.at + 0.03), 0.04]]),
    ...(cfg.last ? [['tom', r3(cfg.last.at), 90, { gain: 0.2, decay: 0.2 }], ['glitter', r3(cfg.last.at), r3(Math.min(D - 0.05, cfg.last.at + 0.8))]] : []),
    ...(cfg.flashes || []).map(f => ['whoosh', r3(f - 0.05), 0.15, 0.05]),
    ...shots.filter(s => s.at > 1).map(s => ['whoosh', r3(s.at), Math.max(0.2, (s.d ?? 0.5) * 0.8), 0.03]),
    ...(LOOP ? loopCues({ duration: D, len: LOOP }) : []),
    ...(cfg.cues || []),
  ].filter(c => c[1] >= 0 && c[1] < D)
  const MUSIC = { ...cfg.music, sections: { drop: r3(LAND), ...(cfg.music.sections || {}), outroAt: cfg.music.sections?.outroAt ?? Math.max(1.5, D - 1.6) } }
  return { DURATION: D, SCENES, CUES, MUSIC, K }
}
