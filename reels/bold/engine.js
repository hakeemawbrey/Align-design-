// Bold reels: the frame engine (an ES module run in Chromium by render.mjs).
// The pre–Star Talk look: the nebula night sky with its crescent moon and grain, headlines in Inter 800 popping in word
// by word with one accent in EB Garamond italic, punchlines in Inter 700, a Space Mono eyebrow, and a big glowing
// line-art visual in the middle of every beat. No end card, no logo: the last beat carries one quiet mono line about
// the Houston beta and the city vote.
//   window.setup({ script, timeline, fonts, glyphs })  then  window.frame(t) → JPEG data URL,  window.cover() → JPEG,
//   window.cues() → the SFX cue list for the score
import { drawSkyFast, drawGrain, getSky, SKY_V, GRAIN_V, W, H } from './sky.js'
import { clamp, lerp, prog, ease, BONE, GOLD, PINK, BLUE, VIOLET, MUTED, color, easeOutBack, popOut, sparkle, font, label, setGlyphs, wob, rgba } from './kit.js'
import VIS from './vis/index.js'

const cv = document.getElementById('c') || document.body.appendChild(document.createElement('canvas'))
cv.width = W; cv.height = H
const x = cv.getContext('2d')
const gcv = document.createElement('canvas'); gcv.width = W; gcv.height = H
const gx = gcv.getContext('2d')

let S = null, TL = null, LAY = []
const MARGIN = 70, MAXW = W - 2 * MARGIN
const ACCENTS = [GOLD, PINK, BLUE, VIOLET]
const IN = 0.42, OUT = 0.24        // vis enter / exit seconds

// ───────────────────────── text layout
// a text spec from the timeline: { words: [{ w, em, br, s }] } (s = when the word pops; br = line break before it)
function layoutText(spec, { size, accentCol, center = false, top, maxLines = 4, minSize = 54 }) {
  if (!spec || !spec.words.length) return null
  let sz = size, lines
  for (let tries = 0; tries < 12; tries++) {
    lines = []
    let cur = [], cw = 0
    const sp = sz * 0.27
    for (const wd of spec.words) {
      x.font = wd.em ? font(sz * 1.12, { weight: 500, family: 'serif', italic: true }) : font(sz, { weight: spec.weight || 800 })
      const ww = x.measureText(wd.w).width
      if ((wd.br || (cur.length && cw + sp + ww > MAXW)) && cur.length) { lines.push({ words: cur, w: cw }); cur = []; cw = 0 }
      cur.push({ ...wd, ww }); cw += (cur.length > 1 ? sp : 0) + ww
    }
    if (cur.length) lines.push({ words: cur, w: cw })
    const tooWide = lines.some(l => l.w > MAXW + 1)
    if (lines.length <= maxLines && !tooWide) break
    if (sz <= minSize) break
    sz *= 0.92
  }
  const lh = sz * 1.04, sp = sz * 0.27
  const h = lines.length * lh
  const y0 = center ? top - h / 2 : top
  const out = []
  lines.forEach((l, li) => {
    let px = W / 2 - l.w / 2
    for (const wd of l.words) {
      out.push({ ...wd, x: px + wd.ww / 2, y: y0 + lh * (li + 0.5), size: wd.em ? sz * 1.12 : sz })
      px += wd.ww + sp
    }
  })
  return { words: out, top: y0, bottom: y0 + h, size: sz, accentCol, weight: spec.weight || 800 }
}

function drawText(L, t, outK, { big = true } = {}) {
  if (!L || outK <= 0) return
  for (const wd of L.words) {
    if (t < wd.s) continue
    const p = prog(t, wd.s, wd.s + (wd.em ? 0.42 : 0.3))
    const sc = (wd.em ? 0.3 + 0.7 * easeOutBack(p, 3.0) : 0.6 + 0.4 * easeOutBack(p, 2.4)) * lerp(0.9, 1, outK) * outK
    if (sc <= 0) continue
    const rot = wd.em && big ? 8 * wob(t, wd.s, 14, 3.4) : 0
    x.save()
    x.globalAlpha = clamp(p * 3) * clamp(outK * 1.4)
    x.translate(wd.x, wd.y + (1 - ease.outCubic(p)) * 30 + (1 - outK) * 10)
    x.rotate(rot * Math.PI / 180); x.scale(sc, sc)
    x.font = wd.em ? font(wd.size, { weight: 500, family: 'serif', italic: true }) : font(wd.size, { weight: L.weight })
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 30
    x.fillStyle = wd.em ? L.accentCol : BONE
    x.fillText(wd.w, 0, wd.size * 0.04)
    x.restore()
    if (wd.em && big && wd.first) sparkle(x, wd.x, wd.y, t, wd.s + 0.12, { n: 9, R: 120 + wd.size * 0.4, seed: Math.round(wd.x + wd.y), size: 26 })
  }
}

// ───────────────────────── beats
function buildLayout() {
  LAY = TL.beats.map((b, i) => {
    const hasVis = !!(b.vis && VIS[b.vis.k])
    const accentCol = color(b.accent, ACCENTS[i % ACCENTS.length])
    const nHead = b.head ? b.head.words.length : 0
    let head = null, sub = null
    if (hasVis) {
      const size = b.size || (nHead <= 4 ? 132 : nHead <= 8 ? 112 : nHead <= 13 ? 96 : 86)
      head = layoutText(b.head, { size, accentCol, top: b.eyebrow ? 222 : 196, maxLines: 4 })
      sub = layoutText(b.sub && { ...b.sub, weight: 700 }, { size: 60, accentCol: color(b.subAccent, accentCol === GOLD ? PINK : GOLD), center: true, top: 1610, maxLines: 3, minSize: 44 })
    } else {
      const size = b.size || (nHead <= 4 ? 156 : nHead <= 8 ? 128 : nHead <= 14 ? 106 : 90)
      const subH = b.sub ? 200 : 0
      head = layoutText(b.head, { size, accentCol, center: true, top: 900 - subH / 2, maxLines: 6 })
      if (b.sub) sub = layoutText({ ...b.sub, weight: 700 }, { size: 64, accentCol: color(b.subAccent, accentCol === GOLD ? PINK : GOLD), center: true, top: (head ? head.bottom : 900) + 130, maxLines: 3 })
    }
    for (const L of [head, sub]) if (L) { let prevEm = false; for (const w of L.words) { w.first = w.em && !prevEm; prevEm = w.em } }
    const visTop = head ? head.bottom + 50 : 300
    const visBot = sub ? sub.top - 40 : (b.final ? 1760 : 1790)
    return { head, sub, hasVis, vis: { cx: W / 2, cy: (visTop + visBot) / 2, w: MAXW, h: Math.max(300, visBot - visTop), top: visTop, bottom: visBot } }
  })
}

// chained visuals: consecutive beats whose vis has keep: true and the same kind share one visual (no exit/enter)
function chainInfo(i) {
  const b = TL.beats[i]
  if (!b.vis) return { first: i, last: i }
  const same = (j, k) => TL.beats[j]?.vis && TL.beats[k]?.vis && TL.beats[j].vis.k === TL.beats[k].vis.k && TL.beats[k].vis.keep
  let first = i, last = i
  while (first > 0 && same(first - 1, first)) first--
  while (last < TL.beats.length - 1 && same(last, last + 1)) last++
  return { first, last }
}

function drawBeat(i, t) {
  const b = TL.beats[i], L = LAY[i]
  const lt = t - b.start, dur = b.end - b.start
  const isLast = i === TL.beats.length - 1
  const textOut = isLast ? 1 : popOut(t, b.end - 0.22, b.end - 0.02)
  // visual
  if (L.hasVis) {
    const { first, last } = chainInfo(i)
    const c0 = TL.beats[first].start, c1 = TL.beats[last].end
    const kIn = first === 0 && i === 0 && b.vis.instant !== false ? 1 : easeOutBack(prog(t, c0 + 0.04, c0 + 0.04 + IN), 1.6)
    const kOut = last === TL.beats.length - 1 ? 1 : popOut(t, c1 - OUT, c1 - 0.02)
    const box = LAY[first].vis   // a chain keeps its first beat's box so the visual doesn't jump
    const mod = VIS[b.vis.k]
    const pre = i === 0 ? Math.min(0.8, dur * 0.3) : 0     // the hook beat starts mid-action, so frame 0 has content
    const s = { t, lt: lt + pre, dur, clt: t - c0 + pre, cdur: c1 - c0, k: kIn, out: kOut, ...box, seed: (i + 1) * 7919 + (TL.seed || 0), prev: i > first ? TL.beats[i - 1].vis : null, step: i - first, voiced: !!TL.voiced, beat: i, final: isLast }
    x.save()
    if (!mod.own) {
      const sc = lerp(0.55, 1, kIn) * (kOut < 1 ? lerp(0.6, 1, kOut) : 1)
      x.globalAlpha = clamp(kIn * 2.5) * clamp(kOut * 1.6)
      x.translate(box.cx, box.cy); x.scale(sc, sc); x.translate(-box.cx, -box.cy)
    }
    try { mod.draw(x, b.vis, s) } catch (e) { if (!window.__visErr) { window.__visErr = 1; console.error(`vis ${b.vis.k}: ${e.message}`) } }
    x.restore()
  }
  // eyebrow
  if (b.eyebrow) {
    const a = (i === 0 ? 1 : clamp(lt / 0.25)) * clamp(textOut * 1.5)
    label(x, b.eyebrow.toUpperCase(), W / 2, 152, { size: 32, weight: 700, family: 'mono', spacing: 0.22, color: color(b.eyebrowCol, GOLD), alpha: a })
  }
  // type (a punch-in on the very first frames, so frame 0 already reads as the hook)
  x.save()
  if (i === 0) { const z = 1 + 0.07 * (1 - ease.outCubic(prog(t, 0, 0.4))); x.translate(W / 2, 600); x.scale(z, z); x.translate(-W / 2, -600) }
  drawText(L.head, t, textOut)
  drawText(L.sub, t, textOut, { big: false })
  x.restore()
  // the quiet footer: final beat only
  if (isLast && TL.footer) {
    const a = 0.62 * clamp((t - (b.footerAt ?? b.start + 0.5)) / 0.5)
    const lines = TL.footer.split('\n')
    lines.forEach((ln, k) => label(x, ln.toUpperCase(), W / 2, 1838 - (lines.length - 1 - k) * 38, { size: 24, weight: 700, family: 'mono', spacing: 0.2, color: BONE, alpha: a, shadow: true }))
  }
}

function render(t) {
  t = clamp(t, 0, TL.duration - 1e-4)
  const drift = t * 3.2
  drawSkyFast(x, t, { dx: -drift * 0.8, dy: drift * 0.35 })
  let i = TL.beats.findIndex(b => t >= b.start && t < b.end)
  if (i < 0) i = TL.beats.length - 1
  drawBeat(i, t)
  // grain on top
  drawGrain(gx, t)
  x.save(); x.globalCompositeOperation = 'overlay'; x.globalAlpha = GRAIN_V; x.drawImage(gcv, 0, 0); x.restore()
}

// ───────────────────────── sound cues (melodic pops on each word, a bell on accents, a whoosh per beat, + the visuals')
const PENTA = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
function cues() {
  const out = []
  const v = !!TL.voiced
  TL.beats.forEach((b, i) => {
    if (i > 0) out.push(['whoosh', Math.max(0, b.start - 0.05), 0.42, v ? 0.035 : 0.05])
    const L = LAY[i]
    let n = 0
    for (const Lx of [L.head, L.sub]) {
      if (!Lx) continue
      for (const w of Lx.words) {
        if (w.s < 0.05) continue
        if (w.em && w.first) out.push(['bell', w.s + 0.1, PENTA[(i * 2 + 3) % PENTA.length], v ? 0.025 : 0.04, 1.6, 0])
        else if (!v || n % 3 === 0) out.push(['pop', w.s, PENTA[(n + i) % PENTA.length] * (Lx === L.sub ? 0.5 : 1), v ? 0.018 : 0.04, ((n % 5) - 2) * 0.15])
        n++
      }
    }
    const mod = b.vis && VIS[b.vis.k]
    if (mod?.cues) {
      const { first } = chainInfo(i)
      if (first === i || b.vis.keep) try { for (const c of mod.cues(b.vis, b.start, b.end - b.start, { voiced: v, step: i - first, prev: i > first ? TL.beats[i - 1].vis : null }) || []) out.push(c) } catch (e) { console.error(`cues ${b.vis.k}: ${e.message}`) }
    }
  })
  return out.filter(c => c[1] >= 0 && c[1] < TL.duration - 0.1)
}

async function setup({ script, timeline, fonts, glyphs }) {
  S = script; TL = timeline
  setGlyphs(glyphs)
  for (const [fam, src, style, weight] of fonts) {
    const f = new FontFace(fam, `url(${src})`, { style, weight }); await f.load(); document.fonts.add(f)
  }
  getSky()
  buildLayout()
  return { beats: LAY.length }
}

window.setup = setup
window.__prof = { r: 0, e: 0, n: 0 }
window.frame = (t) => { const a = performance.now(); render(t); const b = performance.now(); const u = cv.toDataURL('image/jpeg', 0.9); const P = window.__prof; P.r += b - a; P.e += performance.now() - b; P.n++; return u }
window.cover = (t) => { render(t ?? coverTime()); return cv.toDataURL('image/jpeg', 0.92) }
window.cues = cues
window.layout = () => LAY.map(l => ({ head: l.head && [l.head.top, l.head.bottom, l.head.size], sub: l.sub && [l.sub.top, l.sub.bottom, l.sub.size], vis: l.vis }))
function coverTime() { const b = TL.beats[0]; return Math.min(b.end - 0.3, b.start + Math.max(1.2, (b.end - b.start) * 0.75)) }
