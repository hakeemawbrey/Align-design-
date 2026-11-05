// tvkit — the shared look of "Then vs Now: Extended" (kxtve01–kxtve08, promo/films/month2/m40.md). 60 s vertical: the
// same evening in 2016 (top, the old-phone grade of Then vs Now) and 2026 (bottom, clean), side by side, hour by hour.
// No end card, no card transition, no logo: a hard cut on the punchline, or a seamless loop (hookkit loopBack).
//
//   export const { DURATION, SCENES, CUES, MUSIC, T } = makeThenNowX(spec)
//
// spec:
//   id, thing ('Friday night'), stamp ('11·18·2016'), accent, ending: 'cut' | 'loop'
//   hook: slamTitle opts (at: -1; sits on the seam by default), freeze: [recordScratch opts…]
//   promise: popText headline for the promise ('Wait for | *2 a.m.*'), shown T.promise
//   chapters: [{ time: '6 PM', title: 'GETTING READY' }] × 5 → T.ch[i] = start, each CH long: THEN first (T.ch[i] …
//             + SPLIT), then NOW. focus(t) defaults to that rhythm; pass spec.focus(t) → 'A' | 'B' | null to override.
//   A(x, t, K) / B(x, t, K)   draw the THEN / NOW panel (SW×SH, cleared each frame). K = helpers + { ch(t) → index,
//             local(t) → s since that chapter began, T }
//   lines: [{ t, who, text }]  dialogue box lines (who = sign id or 'stars'), grouped into boxes by `boxes` windows
//   boxes: [[open, close], …]  (lines are assigned by time)
//   last: 'Different hours. | *Same friends.*'   the last line (popText) at T.last, lands T.lastLand
//   fx: [[factory, opts, cuesFn], …]   more hookkit effects; music: { style, key, seed, … }; cues: extra cues
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'
import { drawBits, sparkles, hearts, speech, starFrame, inSprite, tearsCells, bangs, pixelText, R, GOLD, BONE, PINK, INK, LAV, HEART, PAPER, OLD } from '../nhve01/scenes/thennow.js'
import { hatCells } from '../nsge15/globekit.js'
import {
  whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, chapter, chapterCues,
  loopBack, loopCues, drawRich,
} from '../hookkit.js'

export { clamp, lerp, prog, ease, rng, drawBits, sparkles, hearts, speech, starFrame, inSprite, tearsCells, bangs, R, drawStarChar, signStar, STAR, drawPixelStar, easeOutBack, hatCells }
export { GOLD, BONE, PINK, INK, LAV, HEART, PAPER, OLD }
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const TAU = Math.PI * 2
export const SW = 1000, SH = 610                       // one panel
export const r3 = v => +v.toFixed(3)
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const inR = (t, a, b) => t >= a && t < b
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
export const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
export const mixHex = (a, b, k) => { const A1 = hexToRgb(a), B1 = hexToRgb(b); return '#' + A1.map((v, i) => Math.round(lerp(v, B1[i], clamp(k))).toString(16).padStart(2, '0')).join('') }
export const walk = (t, keys) => {
  if (t <= keys[0][0]) return [keys[0][1], keys[0][2]]
  for (let i = 1; i < keys.length; i++) if (t < keys[i][0]) { const a = keys[i - 1], b = keys[i], k = ease.inOutCubic(prog(t, a[0], b[0])); return [lerp(a[1], b[1], k), lerp(a[2], b[2], k)] }
  const l = keys[keys.length - 1]; return [l[1], l[2]]
}
const CPS = 30

// ── the shared timeline (60 s)
export const DURATION = 60
export const CH = 9.4, SPLIT = 4.4
export const T = {
  hookOut: [3.0, 3.25], stars: 3.4, promise: 3.9, promiseOut: [6.2, 6.45],
  ch: [6.6, 16.0, 25.4, 34.8, 44.2], pay: 53.6, last: 57.9, lastLand: 58.35,
}

// panels
const PA = { cx: 540, cy: 636 }, PB = { cx: 540, cy: 1312 }
export const SEAM = 974

// ── characters in a panel
/** a sign star (or { color }) with optional tears (0–3), the 2016 bangs, a knit hat */
export function star(x, t, c) {
  const sg = c.sign ? signStar(c.sign) : null
  const opts = { color: c.color || (sg ? sg.color : STAR.sky), glyph: c.glyph === false ? null : (c.glyph || (sg ? sg.glyph : null)), mood: c.mood || 'neutral', look: c.look, hops: c.hops, pop: c.pop ?? 1, alpha: c.alpha ?? 1, seed: c.seed ?? 3, glow: c.glow ?? 0.9, squash: c.squash || 0, bob: c.bob, blink: c.blink }
  if (opts.pop <= 0.01 || opts.alpha <= 0.01) return null
  const sz = c.s * (c.raw ? 1 : 1.18)
  drawStarChar(x, c.x, c.y, sz, t, opts)
  const F = starFrame(c.x, c.y, sz, t, opts)
  if (c.bangs) bangs(x, F, c.bangs === true ? '#4a2c1a' : c.bangs)
  if (c.hat) inSprite(x, F, () => hatCells(x, c.hat))
  if (c.tears) { x.save(); x.globalAlpha *= opts.alpha; inSprite(x, F, () => tearsCells(x, t, c.tears)); x.restore() }
  return F
}
/** a room: back wall with a window (night), floor */
export function room(x, t, { wall = '#4a3a6a', floor = '#2e2448', win = true, winX = 640, winW = 300, y = 430, lamp = true, sky = '#141040', old = false } = {}) {
  R(x, wall, 0, 0, SW, y); for (let i = 0; i < 11; i++) R(x, 'rgba(0,0,0,0.07)', i * 96, 0, 5, y)
  if (win) {
    R(x, INK, winX - 6, 70, winW + 12, 230); R(x, sky, winX, 76, winW, 218)
    const r = rng(7); for (let i = 0; i < 9; i++) R(x, `rgba(255,240,200,${0.4 + 0.4 * Math.sin(t * 2 + i)})`, winX + r() * winW, 80 + r() * 140, 4, 4)
    for (let i = 0; i < 5; i++) { const bh = 40 + r() * 90; R(x, '#221a50', winX + i * winW / 5, 294 - bh, winW / 5 - 4, bh); R(x, '#ffd98a', winX + i * winW / 5 + 10, 294 - bh + 14, 8, 10) }
    R(x, INK, winX + winW / 2 - 3, 76, 6, 218); R(x, old ? '#c8a070' : '#e8e0f0', winX - 16, 300, winW + 32, 14)
  }
  if (lamp) { R(x, INK, 120, 180, 6, 250); R(x, INK, 80, 150, 90, 50); R(x, '#ffe08a', 86, 156, 78, 38) }
  R(x, INK, 0, y - 8, SW, 8); R(x, floor, 0, y, SW, SH - y)
  for (let i = 0; i < 6; i++) R(x, 'rgba(0,0,0,0.12)', 0, y + 30 + i * 34, SW, 3)
}
export function couch(x, cx, cy, w = 520, col = '#7a4a8a') {
  R(x, INK, cx - w / 2 - 6, cy - 110, w + 12, 176); R(x, col, cx - w / 2, cy - 104, w, 80)
  R(x, mixHex(col, '#ffffff', 0.18), cx - w / 2 + 40, cy - 24, w - 80, 60); R(x, mixHex(col, '#000000', 0.25), cx - w / 2, cy - 24, 40, 84); R(x, mixHex(col, '#000000', 0.25), cx + w / 2 - 40, cy - 24, 40, 84)
}
export function oldPhone(x, cx, cy, s = 1, rot = 0, screen = '#9fd8ff') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -30, -50, 60, 100); R(x, '#4a4652', -25, -45, 50, 90); R(x, screen, -19, -36, 38, 58); R(x, '#2a2633', -6, 30, 12, 8)
  x.restore()
}
export function newPhone(x, cx, cy, s = 1, rot = 0, screen = '#c9e8ff') {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -28, -56, 56, 112); R(x, '#26223a', -24, -52, 48, 104); R(x, screen, -20, -46, 40, 92)
  x.restore()
}
/** a chat bubble list on a phone screen-ish panel */
export function chatPanel(x, cx, cy, w, msgs, { k = 1, title = '', bg = '#f4f0ff' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 60 + msgs.length * 52
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, bg, -w / 2, -h / 2, w, h)
  x.font = `800 22px ${INTER}`; x.textBaseline = 'middle'
  if (title) { R(x, '#d8d0f0', -w / 2, -h / 2, w, 40); x.fillStyle = INK; x.textAlign = 'center'; x.fillText(title, 0, -h / 2 + 21) }
  msgs.forEach((m, i) => {
    const me = m.me, tw = Math.min(w - 60, x.measureText(m.text).width + 30), yy = -h / 2 + (title ? 72 : 36) + i * 50
    const bx = me ? w / 2 - 14 - tw : -w / 2 + 14
    R(x, me ? '#7fb0ff' : '#ffffff', bx, yy - 20, tw, 40); x.fillStyle = INK; x.textAlign = 'left'; x.fillText(m.text, bx + 15, yy + 1)
  })
  x.restore()
}

// ── the old-phone grade (soft, saturated, warm, grainy, vignetted, stamped)
function makeGrader(stamp) {
  const lo = document.createElement('canvas'); lo.width = SW / 2.4; lo.height = SH / 2.4
  const lx = lo.getContext('2d')
  const rnd = rng(2016)
  const grains = Array.from({ length: 4 }, () => {
    const c = document.createElement('canvas'); c.width = 170; c.height = 104
    const g = c.getContext('2d'), im = g.createImageData(170, 104)
    for (let i = 0; i < im.data.length; i += 4) { const v = 128 + (rnd() - 0.5) * 230; im.data[i] = v; im.data[i + 1] = v * 0.96; im.data[i + 2] = v * 0.88; im.data[i + 3] = 255 }
    g.putImageData(im, 0, 0); return c
  })
  return function grade(dst, src, t) {
    lx.clearRect(0, 0, lo.width, lo.height); lx.drawImage(src, 0, 0, lo.width, lo.height)
    dst.save(); dst.clearRect(0, 0, SW, SH); dst.imageSmoothingEnabled = true
    dst.filter = 'saturate(1.7) contrast(1.1) brightness(1.04)'; dst.drawImage(lo, 0, 0, SW, SH); dst.filter = 'none'
    dst.globalCompositeOperation = 'multiply'; dst.fillStyle = '#ffd6a0'; dst.fillRect(0, 0, SW, SH)
    dst.globalCompositeOperation = 'screen'; dst.fillStyle = 'rgba(120,52,20,0.2)'; dst.fillRect(0, 0, SW, SH)
    dst.globalCompositeOperation = 'overlay'; dst.globalAlpha = 0.4; dst.imageSmoothingEnabled = false
    const gi = Math.floor(t * 15) % 4, ox = (Math.floor(t * 15) * 37) % 40
    dst.drawImage(grains[gi], -ox, -ox * 0.6, SW + 40, SH + 40)
    dst.globalAlpha = 1; dst.globalCompositeOperation = 'source-over'; dst.imageSmoothingEnabled = true
    const v = dst.createRadialGradient(SW / 2, SH / 2, SH * 0.3, SW / 2, SH / 2, SW * 0.62)
    v.addColorStop(0, 'rgba(40,14,4,0)'); v.addColorStop(1, 'rgba(40,14,4,0.6)'); dst.fillStyle = v; dst.fillRect(0, 0, SW, SH)
    pixelText(dst, stamp, SW - 28, 56, 6)
    dst.restore()
  }
}
function jitter(t) {
  const n = Math.floor(t * 12)
  const h = k => { const s = Math.sin(n * 12.9898 + k * 78.233) * 43758.5453; return (s - Math.floor(s)) * 2 - 1 }
  return { dx: 4 * h(1) + 6 * Math.sin(t * 1.7), dy: 3 * h(2) + 4 * Math.sin(t * 2.3 + 1), rot: 0.003 * h(3) }
}
function roundRect(x, l, t, w, h, r) { x.beginPath(); x.roundRect ? x.roundRect(l, t, w, h, r) : x.rect(l, t, w, h) }
function yearTag(x, text, now) {
  x.save(); x.rotate(now ? 0.03 : -0.05)
  x.font = `italic 600 64px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const w = x.measureText(text).width + 40
  x.fillStyle = INK; roundRect(x, -w / 2 - 5, -40, w + 10, 80, 16); x.fill()
  x.fillStyle = now ? '#fffaf0' : OLD; roundRect(x, -w / 2, -35, w, 70, 13); x.fill()
  x.fillStyle = now ? '#e0457b' : INK; x.fillText(text, 0, 2)
  x.restore()
}
function drawPanel(x, img, P, { old, k, dim, t, label }) {
  x.save(); x.translate(P.cx, P.cy); x.scale(k, k)
  const j = old ? jitter(t) : { dx: 0, dy: 0, rot: 0 }
  if (old) {
    x.fillStyle = 'rgba(6,4,18,0.5)'; roundRect(x, -SW / 2 + 10, -SH / 2 + 18, SW + 10, SH + 10, 26); x.fill()
    x.fillStyle = '#2a2633'; roundRect(x, -SW / 2 - 14, -SH / 2 - 14, SW + 28, SH + 28, 28); x.fill()
    x.fillStyle = '#3a3546'; roundRect(x, -SW / 2 - 14, -SH / 2 - 14, SW + 28, 10, 6); x.fill()
  } else {
    x.save(); x.shadowColor = 'rgba(255,200,140,0.5)'; x.shadowBlur = 50; x.fillStyle = BONE; roundRect(x, -SW / 2 - 7, -SH / 2 - 7, SW + 14, SH + 14, 34); x.fill(); x.restore()
  }
  x.save(); roundRect(x, -SW / 2, -SH / 2, SW, SH, old ? 12 : 28); x.clip()
  if (old) { x.translate(j.dx, j.dy); x.rotate(j.rot); x.scale(1.03, 1.03) }
  x.drawImage(img, -SW / 2, -SH / 2, SW, SH)
  if (dim > 0) { x.fillStyle = `rgba(8,5,22,${0.42 * dim})`; x.fillRect(-SW / 2 - 20, -SH / 2 - 20, SW + 40, SH + 40) }
  x.restore()
  x.translate(-SW / 2 + 96, -SH / 2 + 8); yearTag(x, label, !old)
  x.restore()
}
/** the clock chip on the seam (right) */
function drawClock(x, t, text, kick) {
  x.save(); x.translate(900, SEAM); x.scale(1 + 0.2 * kick, 1 + 0.2 * kick); x.rotate(0.04)
  R(x, INK, -118, -40, 236, 80); R(x, '#1d1446', -112, -34, 224, 68); R(x, GOLD, -112, 26, 224, 8)
  x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText(text, 0, -2)
  x.restore()
}

// ── the bug
function buildBug(root) {
  el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 32px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: BONE, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', pointerEvents: 'none' }, root, 'THEN&nbsp;vs&nbsp;NOW')
}

const FONTS = ["800 76px Inter", "800 32px Inter", "800 118px Inter", "700 30px Inter", "italic 600 64px 'EB Garamond'", "italic 500 150px 'EB Garamond'", "700 40px 'Space Mono'", "700 28px 'Space Mono'", "800 22px Inter"]
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

export function makeThenNowX(spec) {
  const accent = spec.accent || PINK
  const chIdx = t => { let k = -1; T.ch.forEach((c, i) => { if (t >= c) k = i }); return k }
  const focus = spec.focus || (t => { const i = chIdx(t); if (i < 0 || t >= T.pay) return null; return t - T.ch[i] < SPLIT ? 'A' : 'B' })
  const tag = who => who === 'stars' ? 'THE STARS' : `${signStar(who).glyph}︎ ${who.toUpperCase()}`
  const tagCol = who => who === 'stars' ? GOLD : mixHex(signStar(who).color, '#ffffff', 0.35)
  const LINES = spec.lines.map(L => ({ t: L.t, speaker: tag(L.who), color: tagCol(L.who), text: L.text }))
  const BOXW = spec.boxes.map(([o, c]) => ({ open: o, close: c, lines: LINES.filter(L => L.t >= o && L.t < c) })).filter(b => b.lines.length)
  const hops = who => talkHops(LINES, tag(who), { cps: CPS })

  async function build(stage) {
    try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const mk = () => { const c = document.createElement('canvas'); c.width = SW; c.height = SH; return c }
    const pa = mk(), pb = mk(), po = mk(), ax = pa.getContext('2d'), bx = pb.getContext('2d'), ox = po.getContext('2d')
    const grade = makeGrader(spec.stamp)
    const K = { ch: chIdx, local: t => { const i = chIdx(t); return i < 0 ? t : t - T.ch[i] }, T, hops, SW, SH }
    const promise = spec.promise ? popText(root, spec.promise, { top: 880, size: 84, accentSize: 120, at: T.promise, late: 1, lateAt: T.promise + 0.4, wobble: true, accentColor: GOLD }) : null
    const last = popText(root, spec.last, { top: spec.lastTop ?? 878, size: 80, accentSize: 112, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: accent })
    const BOXES = BOXW.map(b => dialogueBox(root, { lines: b.lines, y: 1690, width: 980, height: 196, cps: CPS, size: 40, open: b.open, close: b.close }))
    buildBug(root)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        drawSky(x, t, SKY_H)
        // caption
        drawRich(x, `${spec.thing} · *2016* vs *2026*`, 540, 160, { size: 56, accentSize: 66, accentColor: accent, maxW: 980 })
        ax.clearRect(0, 0, SW, SH); spec.A(ax, t, K); grade(ox, pa, t)
        bx.clearRect(0, 0, SW, SH); spec.B(bx, t, K)
        const f = focus(t)
        const i = chIdx(t), sw = i >= 0 ? T.ch[i] + SPLIT : -9
        const kA = f === 'A' ? 1 + 0.025 * bump(t, i >= 0 ? T.ch[i] : -9, 0.35) : f === 'B' ? 0.965 : 1
        const kB = f === 'B' ? 1 + 0.025 * bump(t, sw, 0.35) : f === 'A' ? 0.965 : 1
        drawPanel(x, po, PA, { old: true, k: kA, dim: f === 'B' ? 1 : 0, t, label: '2016' })
        drawPanel(x, pb, PB, { old: false, k: kB, dim: f === 'A' ? 1 : 0, t, label: '2026' })
        // the seam: clock chip per chapter
        if (i >= 0) drawClock(x, t, spec.chapters[i].time, bump(t, T.ch[i], 0.35))
        else if (spec.hookTime) drawClock(x, t, spec.hookTime, 0)
        // the last line band
        const lk = ease.inOutCubic(prog(t, T.last - 0.25, T.last + 0.1))
        if (lk > 0) { x.fillStyle = `rgba(8,5,24,${0.82 * lk})`; x.fillRect(0, 840, 1080, 300 * lk); R(x, rgba(accent, lk), 0, 840, 1080, 6); R(x, rgba(accent, lk), 0, 840 + 300 * lk - 6, 1080, 6) }
        if (spec.over) spec.over(x, t, K)
        if (promise) promise.update(t, outK(t, T.promiseOut))
        last.update(t, 1)
        for (const b of BOXES) b.update(t)
        drawGrain(gx, t)
      },
    }
  }

  const HOOK = { at: -1, top: 856, size: 96, out: T.hookOut, ...spec.hook }
  const WHIP0 = { at: -0.3, len: 0.55, from: 1.6, blur: 9 }
  const FREEZE = spec.freeze || []
  const CHAPS = spec.chapters.map((c, i) => ({ at: T.ch[i] + 0.1, out: [T.ch[i] + 3.9, T.ch[i] + 4.1], n: i + 1, title: c.title, x: 60, y: SEAM - 48, color: GOLD }))
  const WHIPS = T.ch.map(at => ({ at, len: 0.4, from: 1.3, flash: 0.25 }))
  const FX = spec.fx || []
  const base = FREEZE.length ? frozen(build, FREEZE) : build
  const SCENES = [base, whipZoom(WHIP0), ...WHIPS.map(o => whipZoom(o)), slamTitle(HOOK), ...FREEZE.map(o => recordScratch(o)), ...CHAPS.map(o => chapter(o)), ...FX.map(([fn, o]) => fn(o))]
  if (spec.ending === 'loop') SCENES.push(loopBack([build, slamTitle(HOOK)], { duration: DURATION, len: 0.45 }))
  const CUES = [
    ...whipZoomCues(WHIP0), ...slamTitleCues(HOOK), ...WHIPS.flatMap(o => whipZoomCues(o)),
    ...FREEZE.flatMap(o => recordScratchCues(o)), ...CHAPS.flatMap(o => chapterCues(o)), ...FX.flatMap(([, o, c]) => (c ? c(o) : [])),
    ...T.ch.flatMap(c => [['tick', r3(c + SPLIT - 0.08), 0.04], ['pop', r3(c + SPLIT), 1046.5, 0.035, 0.3]]),
    ...(spec.promise ? [...wordPops(T.promise, 2, 0.1, 0), ['pop', r3(T.promise + 0.4), 1174.66, 0.04, 0]] : []),
    ...wordPops(T.last, 2, 0.1, 1, 0.03), ['pop', T.lastLand, 1046.5, 0.05, 0], ['bell', r3(T.lastLand + 0.05), 2093, 0.03, 1.0, 0], ['glitter', T.lastLand, r3(T.lastLand + 0.5)],
    ...talkCues(LINES, { cps: CPS }),
    ...(spec.cues || []),
    ...(spec.ending === 'loop' ? loopCues({ duration: DURATION, len: 0.45 }) : []),
  ]
  const m = spec.music
  const MUSIC = { style: m.style, key: m.key, seed: m.seed, sections: { drop: m.drop ?? T.ch[0], breakdown: m.breakdown || [T.ch[2]], lift: m.lift || [T.ch[4]], outroAt: DURATION - 0.4 }, hits: m.hits || [T.lastLand] }
  return { DURATION, SCENES, CUES, MUSIC, T }
}
