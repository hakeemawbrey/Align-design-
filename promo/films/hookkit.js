// hookkit — the shared Month 2 HOOK KIT (promo/posting/month2-boost.md, promo/films/MONTH2-BUILD.md §4): reusable hook
// effects for vertical Star Talk films (1080×1920). Read-only for film sessions: import it, never edit it.
// Demo of every effect: promo/films/khookdemo (scenes/index.js + cues.js).
//
// ═══════════════════════════════════════ HOW IT PLUGS IN ═══════════════════════════════════════
//   import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, loopBack, loopCues } from '../../hookkit.js'
//
// Every effect is a FACTORY: effect(opts) → a scene builder `async (stage) => ({ start, end, root, update(t) })`.
// Append it to SCENES after your own build (later = on top), and spread the matching effectCues(opts) into CUES.
// Pass the SAME opts object to both, so picture and sound stay in sync:
//     const HOOK = { at: -1, text: 'Left on *read.* Again.' }
//     export const SCENES = [build, slamTitle(HOOK)]
//     export const CUES = [...yourCues, ...slamTitleCues(HOOK)]
// Everything is a pure function of t (any frame, any order). Nothing touches `document` at module top level (the sound
// build imports this in node). Cue entries use the synth kinds the sound build already has (pop, pluck, bell, tick,
// whoosh, boom, riser, glitter, tom, crash, chip, tapeStop): see promo/scripts/synth.mjs.
// Times: `at` = when the effect starts (s). `out` = [a, b] fade-out window where an effect stays up until you say;
// after b nothing of it shows. Negative `at` is fine (e.g. at: -1 → already landed on frame 0, the thumbnail).
// The kit draws in the Star Talk look: Inter 800, bone #efe6d6, gold #f2c75c, night-sky glass panels, *accent* in
// EB Garamond italic. No brand names anywhere: every label is yours to set.
//
// ── CAMERA effects (whip zoom, shake, record-scratch desaturate, glitch RGB split) ──────────────────────────────────
// They move/filter the whole picture: every stage child EXCEPT the kit's own overlays (and anything with
// data-hookcam="off") gets one combined CSS transform + filter per frame, so several can overlap (shake inside a whip).
// Kit overlays (titles, call screen, HUD…) stay steady on top; pass { cam: true } to an overlay to let it move too.
// Drawing your own canvas instead? Use the pure camera functions (whipZoomCam, shakeCam…) → { s, dx, dy, rot, blur,
// sat, bright, split, hue } and apply them yourself (ctx.translate/scale/rotate, ctx.filter).
//
// ═══════════════════════════════════════ THE EFFECTS (API) ═══════════════════════════════════════
// whipZoom({ at, len = 0.45, from = 1.6, to = 1, blur = 22, cx = 540, cy = 960, lines = true, flash = 0.35 })
//   Whip zoom: the picture punches from scale `from` (motion-blurred, pushed in close) to `to` with a springy settle,
//   speed lines streak in from the edges and a white flash pops at `at`. Keep from and to ≥ 1 (below 1 the frame
//   edges show). Hold a push-in: to = 1.25 stays zoomed after the whip. Frame 0 mid-zoom: at: -0.08.
//   whipZoomCues(opts) → whoosh + punch.            whipZoomCam(t, opts) → camera values.
//
// recordScratch({ at, len = 1.6, caption = 'yep. that’s me.', sub = null, top = 1500, sat = 0.12 })
//   RECORD SCRATCH + FREEZE FRAME: a white flash, the picture desaturates (sepia-grey, slight contrast) and holds;
//   the caption slot pops up (Inter 800, *accent* allowed; `sub` = a small mono line above it, e.g. 'you’re probably
//   wondering how I got here'). At at + len colour snaps back.
//   The kit can't stop YOUR clock, so freeze your build with frozen(build, [REC]) (or freezeTime(t, [REC]) yourself):
//     const REC = { at: 1.1, len: 1.5, caption: 'yep. *that’s me.*' }
//     SCENES = [frozen(build, [REC]), recordScratch(REC)]          CUES: ...recordScratchCues(REC)
//   recordScratchCues(opts) → scratch (wika-wika), tape stop on the music (sudden silence), a click.
//   freezeTime(t, wins) → t held at each win.at during [at, at + len] (later beats are NOT shifted: the film resumes
//   where it would have been). frozen(build, wins) wraps a scene builder so its update() gets freezeTime(t, wins).
//
// slamTitle({ at, text, top = 250, size = 118, accentSize = size·1.18, accentColor = GOLD, color = BONE, gap = 0.07,
//             out = null, width = 980, shake = 10 })
//   SLAM-IN HOOK TITLE (≤ 7 words): each word slams down from 2.4× with a blur and a squash, the line jolts on impact.
//   '*word*' = accent (EB Garamond italic, accentColor; may span words), ' | ' = line break. Shrinks to fit width.
//   at: -1 → fully landed on frame 0. out = [a, b] fades it (none = stays to the end of the film).
//   slamTitleCues(opts) → a thud + pop per word, a punch on the accent.
//
// screenShake({ at, len = 0.5, amp = 28, freq = 21, rot = 1.4, seed = 1 })
//   SCREEN SHAKE: decaying noise shake of the picture (px / degrees). shakeCues(opts) → low thump.   shakeCam(t, opts).
//
// caught({ at, x, y, r = 150, ry = r·0.82, out = null, label = 'CAUGHT IN 4K', arrow = 'bl', rec = true, color = '#ff3b3b' })
//   "CAUGHT IN 4K": a hand-drawn red ellipse scribbles round (x, y), an arrow swoops in from corner `arrow`
//   ('tl'|'tr'|'bl'|'br'|null) with the label at its tail, plus a blinking ● REC · 4K tag top-right if rec.
//   caughtCues(opts) → marker squeak, ding.
//
// incomingCall({ at, out, name = 'unknown', sub = 'incoming call…', glyph = '♌', color = '#f0603a', answerAt = null,
//                declineAt = null })
//   FULL-SCREEN FAKE INCOMING CALL: dark glass slides up over everything, avatar coin (glyph) with pulsing rings,
//   caller name (Inter 800, *accent* allowed), the sub line, a "slide to answer" pill with a shimmer. answerAt: the knob
//   slides across and the screen flicks away; declineAt: a red ✕ and it drops. out is still the hard end.
//   incomingCallCues(opts) → two-tone ring every 1.1 s until answered / declined / out, then a pop.
//
// notification({ at, out, title = 'texts', body, glyph = '♌', time = 'now', y = 120 })
//   PHONE NOTIFICATION DROP: a glass banner drops from the top with a spring and a buzz wiggle (title = small caps app
//   line, body = the message, *accent* allowed). notificationCues(opts) → ding-ding + buzz.
//
// loadingBar({ at, len = 2.6, label = 'overthinking…', stallAt = 99, error = 'Error: too many feelings', y = 900 })
//   LOADING BAR: a pixel panel, the bar fills in nervous chunks to stallAt %, jitters there, then (if error) the bar
//   goes red and the error line pops at at + len − 0.5. Holds to at + len, then pops away.
//   loadingBarCues(opts) → ticks per chunk, a riser into the stall, an error buzz.
//
// countdown({ at, from = 3, gap = 0.6, go = 'GO!', y = 960, color = GOLD })
//   3-2-1 COUNTDOWN: huge numbers slam in with a ring burst, one every gap s, then `go` (null = none). Ends at
//   at + (from + 1)·gap. countdownCues(opts) → beep per number, a high one for go.
//
// newsDesk({ at, out, headline, tag = 'BREAKING', channel = 'STAR NEWS', ticker = ['…'], live = true, clock = '11:00' })
//   NEWS DESK: a red BREAKING banner whips in, the lower third (channel bug + *accent* headline) slides under it, a
//   ticker crawls along the bottom, LIVE dot + clock top-right. newsDeskCues(opts) → news sting.
//
// gameHud({ at, out, title = 'ANY%', splits = [], start = at, color = '#7dffb0' })
//   VIDEO-GAME HUD: run title + a big speedrun timer (from `start`) top-right, and a splits column; each split
//   { at, name } pops with its time and a delta flash (gold = best). The timer stops at the last split.
//   gameHudCues(opts) → start beep, a chip blip per split.
// achievement({ at, out = [at + 2.4, at + 2.7], text, title = 'ACHIEVEMENT UNLOCKED', icon = '★', y = 1520 })
//   ACHIEVEMENT pop: a pill slides up with a pixel trophy, the title, the text (*accent* ok) and a shine sweep.
//   achievementCues(opts) → chiptune fanfare + glitter.
//
// chapter({ at, out, n = 1, title = 'THE FIRST TEXT', x = 70, y = 230, color = GOLD })
//   CHAPTER STICKER for long videos: a tilted sticker slaps on, reading "1 · THE FIRST TEXT". chapterCues(opts) → slap.
//
// glitch({ at, len = 1.2, text = 'LEO.EXE has stopped responding', buttons = ['WAIT', 'CLOSE'], dialog = true, amp = 1 })
//   GLITCH: the picture splits RGB, jumps and hue-flickers (camera effect) under slice bars and noise blocks; a retro
//   error dialog with `text` pops in the middle (dialog: false = just the glitch). glitchCues(opts) → data chirps.
//
// loopBack(builders, { duration, len = 0.4 })   LOOP HELPER (seamless replay)
//   Over the last `len` s it cross-blends a second, hidden copy of your frame 0 over the film, so the last frame IS
//   frame 0. `builders` = the scene builders that make up frame 0 (your build plus any kit overlay visible at t = 0,
//   e.g. the slam title). They are built a second time inside the loop layer and always shown at t = 0.
//     const HOOK = { at: -1, text: '…' }
//     export const SCENES = [build, slamTitle(HOOK), …, loopBack([build, slamTitle(HOOK)], { duration: DURATION })]
//     CUES: ...loopCues({ duration: DURATION })
//   Put loopBack LAST in SCENES. Builds that keep module-level caches still work (each build call makes its own DOM).
//   Your own fx(ctx, t) layer is not copied: clear it before the loop starts.
//   Driving your OWN timeline instead (smoother when your film is procedural): loopK(t, duration, len) → 0…1 eased;
//     pose = lerpPose(poseAt(t), poseAt(0), loopK(t, DURATION))   // every element eases into its frame-0 place
//   loopCues({ duration, len }) → a soft reverse swell into the seam.
//
// Helpers also exported: drawRich(ctx, text, cx, y, opts) (canvas *accent* text), tokens(text), GOLD, BONE, INK, RED.
//
// ── COPY-PASTE EXAMPLE (a 12 s short that loops) ───────────────────────────────────────────────────────────────────
//   import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, caught,
//            caughtCues, loopBack, loopCues } from '../../hookkit.js'
//   export const DURATION = 12
//   const HOOK = { at: -1, text: 'Rehearsing a *voice note.*', out: [3.2, 3.4] }
//   const WHIP = { at: -0.08 }
//   const REC = { at: 1.0, len: 1.6, caption: 'yep. *that’s me.*' }
//   const CAUGHT = { at: 1.15, x: 540, y: 1010, r: 190, out: [2.5, 2.6] }
//   export const SCENES = [frozen(build, [REC]), whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC), caught(CAUGHT),
//                          loopBack([build, slamTitle(HOOK)], { duration: DURATION })]
//   export const CUES = [...myCues, ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC),
//                        ...caughtCues(CAUGHT), ...loopCues({ duration: DURATION })]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'

const FW = 1080, FH = 1920                         // Star Talk is vertical
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff3b3b'
const PINK = '#ff8fb1', MINT = '#7dffb0', CYAN = '#7fe0ff', LAV = '#c9a6ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const r3 = v => +v.toFixed(3)
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const outK = (t, out) => (out ? 1 - ease.inQuad(prog(t, out[0], out[1])) : 1)
const pop01 = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
const endOf = (o, fallback) => (o.out ? o.out[1] : fallback)

// ─────────────────────────────────────────────── layers
function overlay(stage, { cam = false } = {}) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px', overflow: 'hidden', pointerEvents: 'none' }, stage)
  if (!cam) root.dataset.hookcam = 'off'
  const cv = document.createElement('canvas'); cv.width = FW; cv.height = FH
  Object.assign(cv.style, { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px' })
  root.appendChild(cv)
  return { root, x: cv.getContext('2d') }
}
async function fonts() {
  try { await Promise.all(['800 100px Inter', '700 40px Inter', "italic 500 100px 'EB Garamond'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
}

// ─────────────────────────────────────────────── camera (combined transform + filter on the film)
const IDENT = () => ({ s: 1, dx: 0, dy: 0, rot: 0, blur: 0, sat: 1, bright: 1, contrast: 1, sepia: 0, split: 0, hue: 0 })
function combine(parts) {
  const c = IDENT()
  for (const p of parts) {
    if (!p) continue
    c.s *= p.s ?? 1; c.dx += p.dx ?? 0; c.dy += p.dy ?? 0; c.rot += p.rot ?? 0; c.blur += p.blur ?? 0
    c.sat *= p.sat ?? 1; c.bright *= p.bright ?? 1; c.contrast *= p.contrast ?? 1; c.sepia = Math.max(c.sepia, p.sepia ?? 0)
    c.split = Math.max(c.split, p.split ?? 0); c.hue += p.hue ?? 0
  }
  return c
}
function camCss(c) {
  const tr = (c.s !== 1 || c.dx || c.dy || c.rot) ? `translate(${c.dx.toFixed(2)}px,${c.dy.toFixed(2)}px) rotate(${c.rot.toFixed(3)}deg) scale(${c.s.toFixed(4)})` : ''
  const f = []
  if (c.blur > 0.05) f.push(`blur(${c.blur.toFixed(2)}px)`)
  if (c.sepia > 0.005) f.push(`sepia(${c.sepia.toFixed(3)})`)
  if (Math.abs(c.sat - 1) > 0.005) f.push(`saturate(${c.sat.toFixed(3)})`)
  if (Math.abs(c.contrast - 1) > 0.005) f.push(`contrast(${c.contrast.toFixed(3)})`)
  if (Math.abs(c.bright - 1) > 0.005) f.push(`brightness(${c.bright.toFixed(3)})`)
  if (Math.abs(c.hue) > 0.5) f.push(`hue-rotate(${c.hue.toFixed(1)}deg)`)
  if (c.split > 0.3) f.push(`drop-shadow(${c.split.toFixed(1)}px 0 0 rgba(255,40,80,0.75)) drop-shadow(${(-c.split).toFixed(1)}px 0 0 rgba(40,230,255,0.7))`)
  return { tr, f: f.join(' ') }
}
/** register a camera contribution fn(t) on this parent; returns apply(t) (idempotent: every cam effect applies the
 *  same combined value, so scene order doesn't matter) */
function camRegister(parent, fn) {
  const reg = parent.__hookcam || (parent.__hookcam = [])
  reg.push(fn)
  return t => {
    const { tr, f } = camCss(combine(reg.map(g => g(t))))
    for (const ch of parent.children) {
      if (ch.id === 'fx' || ch.dataset?.hookcam === 'off' || ch.tagName === 'SCRIPT') continue
      if (ch.style.transform !== tr) ch.style.transform = tr
      if (ch.style.filter !== f) ch.style.filter = f
      if (tr && ch.style.transformOrigin !== '50% 50%') ch.style.transformOrigin = '50% 50%'
    }
  }
}

// ─────────────────────────────────────────────── rich canvas text (*accent*, ' | ' line breaks)
export function tokens(text) {
  const out = []; let open = false
  for (const tok of String(text || '').trim().split(/\s+/)) {
    if (!tok) continue
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 })
    if (stars % 2) open = !open
  }
  return out
}
const fontOf = (accent, size, accentSize, weight = 800) => accent ? `italic 500 ${accentSize}px ${SERIF}` : `${weight} ${size}px ${INTER}`
/** lay out tokens into centred lines → [{ w, accent, x, y, width, size }] (x = word centre), fitted to maxW */
function layout(ctx, text, { size, accentSize = size * 1.18, maxW = 960, lineH = 1.08, weight = 800 }) {
  const tk = tokens(text)
  const lines = [[]]
  for (const t of tk) { if (t.br) lines.push([]); else lines[lines.length - 1].push(t) }
  const space = size * 0.26
  const measure = k => lines.map(L => L.map(t => { ctx.font = fontOf(t.accent, size * k, accentSize * k, weight); return ctx.measureText(t.w).width }))
  let k = 1, ws = measure(1)
  const widest = Math.max(1, ...ws.map((L, i) => L.reduce((a, b) => a + b, 0) + space * Math.max(0, lines[i].length - 1)))
  if (widest > maxW) { k = Math.max(0.5, maxW / widest); ws = measure(k) }
  const out = []
  let y = 0
  lines.forEach((L, i) => {
    const big = L.some(t => t.accent) ? accentSize * k : size * k
    const total = ws[i].reduce((a, b) => a + b, 0) + space * k * Math.max(0, L.length - 1)
    let x = -total / 2
    y += big * (i ? lineH : 0.8)
    L.forEach((t, j) => { out.push({ ...t, x: x + ws[i][j] / 2, y, width: ws[i][j], size: (t.accent ? accentSize : size) * k }); x += ws[i][j] + space * k })
  })
  return { words: out, height: y + size * k * 0.25, k }
}
function drawWord(ctx, w, cx, y, { color = BONE, accentColor = GOLD, weight = 800, shadow = true } = {}) {
  ctx.font = w.accent ? `italic 500 ${w.size}px ${SERIF}` : `${weight} ${w.size}px ${INTER}`
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  if (shadow) { ctx.shadowColor = 'rgba(6,4,18,0.9)'; ctx.shadowBlur = 28; ctx.shadowOffsetY = 4 }
  ctx.fillStyle = w.accent ? accentColor : color
  ctx.fillText(w.w, cx, y)
  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0
}
/** draw *accent* text centred at (cx, top y) in one go; returns the block height */
export function drawRich(ctx, text, cx, y, { size = 60, accentSize, color = BONE, accentColor = GOLD, maxW = 960, weight = 800, shadow = true, align = 'center' } = {}) {
  const L = layout(ctx, text, { size, accentSize: accentSize || size * 1.18, maxW, weight })
  let shift = 0
  if (align === 'left') { const minX = Math.min(...L.words.map(w => w.x - w.width / 2)); shift = -minX }
  for (const w of L.words) drawWord(ctx, w, cx + w.x + shift, y + w.y, { color, accentColor, weight, shadow })
  return L.height
}

// ─────────────────────────────────────────────── drawing bits
function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }
function glass(x, X, Y, w, h, r = 36, { fill = 'rgba(20,11,46,0.9)', rim = 'rgba(242,199,92,0.55)', glow = true } = {}) {
  x.save()
  if (glow) { x.shadowColor = 'rgba(4,2,14,0.7)'; x.shadowBlur = 50; x.shadowOffsetY = 14 }
  rr(x, X, Y, w, h, r); x.fillStyle = fill; x.fill()
  x.shadowBlur = 0; x.shadowOffsetY = 0
  x.lineWidth = 3; x.strokeStyle = rim; x.stroke()
  rr(x, X + 8, Y + 8, w - 16, h - 16, Math.max(4, r - 8)); x.lineWidth = 1.2; x.strokeStyle = 'rgba(239,230,214,0.18)'; x.stroke()
  x.restore()
}
/** stepped-corner pixel panel (the Star Talk HUD look) */
function pixelBox(x, X, Y, w, h, { fill = 'rgba(16,9,38,0.95)', border = GOLD, P = 8 } = {}) {
  x.fillStyle = INK; x.fillRect(X - P, Y, w + 2 * P, h); x.fillRect(X, Y - P, w, h + 2 * P)
  x.fillStyle = border; x.fillRect(X, Y + P, w, h - 2 * P); x.fillRect(X + P, Y, w - 2 * P, h)
  x.fillStyle = fill; x.fillRect(X + P, Y + P, w - 2 * P, h - 2 * P)
}
function burst(x, cx, cy, t, t0, { n = 10, dist = 260, seed = 7, dur = 0.7, colors = [GOLD, BONE, PINK, LAV] } = {}) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const r = rng(seed), e = ease.outCubic(p)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = dist * (0.6 + r() * 0.6), size = 14 + Math.round(r() * 2) * 6, kind = Math.floor(r() * 4)
    x.globalAlpha = (1 - ease.inQuad(p)) * clamp(p / 0.12)
    drawPixelStar(x, cx + Math.cos(a) * d * e, cy + Math.sin(a) * d * e, size, kind, colors[i % colors.length])
  }
  x.restore()
}
function coin(x, cx, cy, r, glyph, color) {
  const g = x.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r)
  g.addColorStop(0, '#fff6e0'); g.addColorStop(0.35, color); g.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.lineWidth = Math.max(3, r * 0.06); x.strokeStyle = 'rgba(239,230,214,0.85)'; x.stroke()
  if (glyph) { x.font = `700 ${Math.round(r * 1.05)}px 'Noto Sans Symbols 2', 'Segoe UI Symbol', ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(glyph + '︎', cx, cy + r * 0.06) }
}

// ═══════════════════════════════════════════════ 1. WHIP ZOOM
export function whipZoomCam(t, { at, len = 0.45, from = 1.6, to = 1, blur = 22, cx = 540, cy = 960 } = {}) {
  if (t < at - 0.001 || t > at + len + 0.6) return t > at + len + 0.6 && to !== 1 ? { s: to, dx: (1 - to) * (cx - FW / 2), dy: (1 - to) * (cy - FH / 2) } : null
  const p = prog(t, at, at + len)
  const s = Math.max(1, lerp(from, to, easeOutBack(p, 1.6)))
  const b = blur * Math.pow(1 - clamp(p * 1.3), 2)
  return { s, dx: (1 - s) * (cx - FW / 2), dy: (1 - s) * (cy - FH / 2), blur: b, bright: 1 + 0.25 * Math.pow(1 - p, 3) }
}
export function whipZoom(o) {
  const { at, len = 0.45, lines = true, flash = 0.35, cx = 540, cy = 960 } = o
  return async stage => {
    const { root, x } = overlay(stage)
    const apply = camRegister(stage, t => whipZoomCam(t, o))
    const R = rng(4242), RAYS = Array.from({ length: 46 }, () => ({ a: R() * Math.PI * 2, w: 2 + R() * 7, l: 0.25 + R() * 0.5, o: R() }))
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        apply(t)
        x.clearRect(0, 0, FW, FH)
        const p = prog(t, at - 0.02, at + len * 0.9)
        if (p <= 0 || p >= 1) return
        if (lines) {
          x.save(); x.globalCompositeOperation = 'lighter'
          const fade = Math.sin(Math.PI * Math.min(1, p * 1.4)) * 0.85
          for (const r of RAYS) {
            const R0 = lerp(1300, 520, ease.outCubic(p)) * (0.75 + r.l * 0.5), R1 = R0 + 700 * r.l
            const ca = Math.cos(r.a), sa = Math.sin(r.a)
            x.strokeStyle = `rgba(239,230,214,${(0.18 + 0.32 * r.o) * fade})`; x.lineWidth = r.w
            x.beginPath(); x.moveTo(cx + ca * R0, cy + sa * R0); x.lineTo(cx + ca * R1, cy + sa * R1); x.stroke()
          }
          x.restore()
        }
        const fl = flash * Math.pow(1 - prog(t, at, at + 0.16), 2) * (t >= at ? 1 : 0)
        if (fl > 0.004) { x.fillStyle = `rgba(255,250,240,${fl})`; x.fillRect(0, 0, FW, FH) }
      },
    }
  }
}
export function whipZoomCues({ at, len = 0.45 }) {
  return [['whoosh', r3(at + 0.12), Math.max(0.3, len * 0.9), 0.07], ['boom', r3(at + len * 0.55), 0.16], ['tom', r3(at + len * 0.55), 70, { gain: 0.22, decay: 0.25 }], ['tick', r3(at + len * 0.55), 0.06]]
}

// ═══════════════════════════════════════════════ 2. RECORD SCRATCH + FREEZE FRAME
export function freezeTime(t, wins = []) {
  for (const w of wins) { const len = w.len ?? 1.6; if (t >= w.at && t < w.at + len) return w.at }
  return t
}
export function frozen(build, wins) {
  return async stage => {
    const s = await build(stage)
    const inner = s.update.bind(s)
    return { ...s, update: t => inner(freezeTime(t, wins)), fx: s.fx ? (ctx, t) => s.fx(ctx, freezeTime(t, wins)) : undefined }
  }
}
function scratchCam(t, { at, len = 1.6, sat = 0.12 }) {
  if (t < at || t >= at + len) return null
  const k = 1 - ease.inQuad(prog(t, at + len - 0.08, at + len))
  return { sat: lerp(1, sat, k), sepia: 0.35 * k, contrast: 1 + 0.12 * k, bright: 1 + 0.6 * Math.pow(1 - prog(t, at, at + 0.12), 2) }
}
export function recordScratch(o) {
  const { at, len = 1.6, caption = 'yep. that’s me.', sub = null, top = 1500 } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const apply = camRegister(stage, t => scratchCam(t, o))
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        apply(t)
        x.clearRect(0, 0, FW, FH)
        if (t < at || t >= at + len) return
        // white flash + a thin film-frame border + vignette
        const fl = Math.pow(1 - prog(t, at, at + 0.14), 2)
        x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, 0, FW, 40); x.fillRect(0, FH - 40, FW, 40)
        const v = x.createRadialGradient(540, 960, 500, 540, 960, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.45)')
        x.fillStyle = v; x.fillRect(0, 0, FW, FH)
        // the "paused" bars top-left
        x.fillStyle = rgba(BONE, 0.85); x.fillRect(70, 96, 16, 52); x.fillRect(98, 96, 16, 52)
        x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('PAUSED', 134, 124)
        // caption slot
        const k = pop01(t, at + 0.18, 0.34, 2.4) * (1 - ease.inQuad(prog(t, at + len - 0.12, at + len)))
        if (k > 0.01) {
          x.save(); x.translate(540, top); x.scale(k, k); x.globalAlpha = clamp(k * 2)
          x.rotate(-0.02)
          const L = layout(x, caption, { size: 84, maxW: 900 })
          const h = L.height + (sub ? 60 : 0) + 70
          glass(x, -480, -h / 2, 960, h, 28, { fill: 'rgba(10,6,22,0.88)', rim: 'rgba(239,230,214,0.6)' })
          let y0 = -h / 2 + 35
          if (sub) { x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'top'; x.fillStyle = rgba(BONE, 0.75); x.fillText(sub, 0, y0); y0 += 60 }
          for (const w of L.words) drawWord(x, w, w.x, y0 + w.y)
          x.restore()
        }
        if (fl > 0.003) { x.fillStyle = `rgba(255,255,255,${0.85 * fl})`; x.fillRect(0, 0, FW, FH) }
      },
    }
  }
}
export function recordScratchCues({ at, len = 1.6 }) {
  return [
    ['whoosh', r3(at - 0.02), 0.1, 0.13], ['whoosh', r3(at + 0.08), 0.14, 0.15], ['whoosh', r3(at + 0.2), 0.09, 0.1],
    ['tapeStop', r3(at - 0.06), 0.3], ['tick', r3(at + 0.02), 0.09], ['pop', r3(at + 0.2), 659.25, 0.035, 0],
    ['tick', r3(at + len), 0.06], ['whoosh', r3(at + len + 0.08), 0.2, 0.05],
  ]
}

// ═══════════════════════════════════════════════ 3. SLAM-IN HOOK TITLE
export function slamTitle(o) {
  const { at, text, top = 250, size = 118, accentSize, accentColor = GOLD, color = BONE, gap = 0.07, out = null, width = 980, shake = 10, cam = false } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage, { cam })
    const L = layout(x, text, { size, accentSize: accentSize || size * 1.18, maxW: width })
    const W = L.words.map((w, i) => ({ ...w, t: at + i * gap + (w.accent ? 0.06 : 0) }))
    const last = W.length ? W[W.length - 1].t : at
    return {
      start: Math.min(0, at), end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (t < at || ok <= 0) return
        // the line jolts on each impact
        let jy = 0
        for (const w of W) { const d = t - w.t - 0.12; if (d > 0 && d < 0.3) jy += shake * Math.exp(-d * 18) * Math.cos(d * 60) * (w.accent ? 1.6 : 1) }
        x.save(); x.translate(540, top + jy); x.globalAlpha = ok
        for (const w of W) {
          const p = prog(t, w.t, w.t + 0.14)
          if (p <= 0) continue
          const s = lerp(2.4, 1, ease.inCubic(p))
          const after = t - (w.t + 0.14), sq = after > 0 ? 0.12 * Math.exp(-after * 12) * Math.cos(after * 40) : 0
          x.save(); x.translate(w.x, w.y); x.scale(s * (1 + sq), s * (1 - sq))
          x.globalAlpha = ok * clamp(p * 2.5)
          if (p < 1) x.filter = `blur(${((1 - p) * 10).toFixed(1)}px)`
          drawWord(x, { ...w }, 0, 0, { color, accentColor })
          x.restore()
        }
        x.restore()
        if (t < last + 0.5) burst(x, 540, top + L.height * 0.6, t, last + 0.12, { n: 9, dist: 420, seed: 77 })
      },
    }
  }
}
export function slamTitleCues({ at, text, gap = 0.07 }) {
  const ws = tokens(text).filter(t => !t.br)
  const out = []
  ws.forEach((w, i) => {
    const t = r3(at + i * gap + (w.accent ? 0.06 : 0) + 0.13)
    if (t < 0) return
    out.push(['tom', t, w.accent ? 85 : 120, { gain: w.accent ? 0.26 : 0.14, decay: 0.18 }], ['pop', t, [880, 987.77, 1174.66, 1318.51][i % 4], 0.025, (i % 2 ? 0.2 : -0.2)])
    if (w.accent) out.push(['boom', t, 0.12])
  })
  return out
}

// ═══════════════════════════════════════════════ 4. SCREEN SHAKE
export function shakeCam(t, { at, len = 0.5, amp = 28, freq = 21, rot = 1.4, seed = 1 } = {}) {
  if (t < at || t > at + len) return null
  const p = prog(t, at, at + len), k = Math.pow(1 - p, 1.6)
  const n = (o) => (noise1((t - at) * freq + o, seed) - 0.5) * 2
  return { dx: n(0) * amp * k, dy: n(17) * amp * k, rot: n(41) * rot * k, s: 1 + (amp * 2.6 / 540) * k }
}
export function screenShake(o) {
  return async stage => {
    const root = el('div', { display: 'none' }, stage); root.dataset.hookcam = 'off'
    const apply = camRegister(stage, t => shakeCam(t, o))
    return { start: -1e9, end: 1e9, root, update: apply }
  }
}
export function shakeCues({ at, len = 0.5 }) {
  return [['boom', r3(at), 0.2], ['tom', r3(at), 62, { gain: 0.3, decay: Math.min(0.5, len) }], ['tick', r3(at + 0.01), 0.07]]
}

// ═══════════════════════════════════════════════ 5. CAUGHT IN 4K
const CORNER = { tl: [-1, -1], tr: [1, -1], bl: [-1, 1], br: [1, 1] }
export function caught(o) {
  const { at, x: cx, y: cy, r = 150, ry, out = null, label = 'CAUGHT IN 4K', arrow = 'bl', rec = true, color = RED } = o
  const RY = ry ?? r * 0.82
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0) return
        x.save(); x.globalAlpha = ok
        x.lineCap = 'round'; x.lineJoin = 'round'
        // the scribbled ellipse: 1.15 turns, wobbly, drawn on over 0.32 s
        const p = ease.outCubic(prog(t, at, at + 0.32))
        x.strokeStyle = color; x.lineWidth = 14; x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 10
        x.beginPath()
        const N = 90, turns = 1.15, a0 = -2.2
        for (let i = 0; i <= N * p; i++) {
          const u = i / N, a = a0 + u * turns * Math.PI * 2
          const wob = 1 + 0.05 * Math.sin(u * 13) + 0.04 * u
          const px = cx + Math.cos(a) * r * wob, py = cy + Math.sin(a) * RY * wob
          if (i === 0) x.moveTo(px, py); else x.lineTo(px, py)
        }
        x.stroke()
        // arrow from the corner
        if (arrow && CORNER[arrow]) {
          const [sx, sy] = CORNER[arrow]
          const ap = ease.outCubic(prog(t, at + 0.22, at + 0.5))
          if (ap > 0) {
            const tx = cx + sx * r * 0.95, ty = cy + sy * RY * 0.95
            const fx = clamp(cx + sx * (r + 300), 80, FW - 80), fy = clamp(cy + sy * (RY + 330), 120, FH - 120)
            const mx = (fx + tx) / 2 - sy * 80, my = (fy + ty) / 2 + sx * 40
            const q = (u) => [(1 - u) * (1 - u) * fx + 2 * (1 - u) * u * mx + u * u * tx, (1 - u) * (1 - u) * fy + 2 * (1 - u) * u * my + u * u * ty]
            x.beginPath()
            for (let i = 0; i <= 30 * ap; i++) { const [px, py] = q(i / 30); if (i === 0) x.moveTo(px, py); else x.lineTo(px, py) }
            x.stroke()
            if (ap >= 1) {
              const [ax, ay] = q(1), [bx, by] = q(0.9), ang = Math.atan2(ay - by, ax - bx)
              x.beginPath(); x.moveTo(ax - Math.cos(ang - 0.5) * 50, ay - Math.sin(ang - 0.5) * 50); x.lineTo(ax, ay); x.lineTo(ax - Math.cos(ang + 0.5) * 50, ay - Math.sin(ang + 0.5) * 50); x.stroke()
            }
            const lk = pop01(t, at + 0.42, 0.3, 2.6)
            if (lk > 0.01 && label) {
              x.shadowBlur = 0
              x.save(); x.translate(fx, fy + sy * 56); x.rotate(-0.05 * sx); x.scale(lk, lk)
              x.font = `800 58px ${INTER}`; const w = x.measureText(label).width + 50
              x.fillStyle = color; rr(x, -w / 2, -42, w, 84, 14); x.fill()
              x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 3)
              x.restore()
            }
          }
        }
        x.shadowBlur = 0
        if (rec) {
          const blink = Math.floor((t - at) * 2.4) % 2 === 0
          x.font = `700 36px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
          x.fillStyle = BONE; x.fillText('REC · 4K', FW - 70, 124)
          if (blink) { x.fillStyle = color; x.beginPath(); x.arc(FW - 70 - x.measureText('REC · 4K').width - 30, 124, 13, 0, Math.PI * 2); x.fill() }
          x.strokeStyle = rgba(BONE, 0.7); x.lineWidth = 5
          const B = 60, m = 52
          for (const [qx, qy] of [[m, m + 120], [FW - m, m + 120], [m, FH - m], [FW - m, FH - m]]) {
            const dx = qx < FW / 2 ? 1 : -1, dy = qy < FH / 2 ? 1 : -1
            x.beginPath(); x.moveTo(qx, qy + dy * B); x.lineTo(qx, qy); x.lineTo(qx + dx * B, qy); x.stroke()
          }
        }
        x.restore()
      },
    }
  }
}
export function caughtCues({ at }) {
  return [
    ...Array.from({ length: 7 }, (_, i) => ['tick', r3(at + i * 0.045), 0.03]),
    ['pluck', r3(at + 0.05), 1567.98, 0.02, 0.15, 0.2], ['whoosh', r3(at + 0.36), 0.25, 0.04],
    ['bell', r3(at + 0.45), 1760, 0.035, 0.9, 0], ['pop', r3(at + 0.45), 1318.51, 0.04, 0],
  ]
}

// ═══════════════════════════════════════════════ 6. INCOMING CALL
export function incomingCall(o) {
  const { at, out, name = 'unknown', sub = 'incoming call…', glyph = '♌', color = '#f0603a', answerAt = null, declineAt = null } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const endT = answerAt ?? declineAt ?? null
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0) return
        const inP = ease.outCubic(prog(t, at, at + 0.3))
        let gone = 0, dy = (1 - inP) * FH, dx = 0
        if (answerAt != null) { gone = ease.inCubic(prog(t, answerAt + 0.35, answerAt + 0.6)); dy -= gone * FH * 0.2 }
        if (declineAt != null) { gone = ease.inCubic(prog(t, declineAt + 0.25, declineAt + 0.55)); dy += gone * FH }
        x.save(); x.globalAlpha = ok * (answerAt != null ? 1 - gone : 1); x.translate(dx, dy)
        // the screen
        const g = x.createLinearGradient(0, 0, 0, FH)
        g.addColorStop(0, 'rgba(18,10,44,0.97)'); g.addColorStop(0.55, 'rgba(36,18,70,0.97)'); g.addColorStop(1, rgba(color, 0.55))
        x.fillStyle = g; x.fillRect(0, 0, FW, FH)
        // status row
        x.font = `700 34px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('9:41', 80, 80)
        x.textAlign = 'right'; x.fillText('▮▮▮▯', FW - 80, 80)
        x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillStyle = rgba(BONE, 0.7); x.fillText(sub, 540, 330)
        drawRich(x, name, 540, 380, { size: 108, maxW: 920 })
        // avatar coin + rings
        const cy = 900
        const ringing = endT == null || t < endT
        for (let k = 0; k < 3; k++) {
          const ph = ((t - at) * 0.9 + k / 3) % 1
          if (!ringing) break
          x.strokeStyle = rgba(BONE, 0.45 * (1 - ph)); x.lineWidth = 6; x.beginPath(); x.arc(540, cy, 190 + ph * 220, 0, Math.PI * 2); x.stroke()
        }
        const buzz = ringing ? 6 * Math.sin((t - at) * 70) * (Math.floor((t - at) * 0.9 * 2) % 2 ? 0 : 1) : 0
        coin(x, 540 + buzz, cy, 180, glyph, color)
        // buttons row: decline / message
        x.font = `700 30px ${MONO}`; x.fillStyle = rgba(BONE, 0.75)
        x.fillText('remind me', 300, 1300); x.fillText('message', 780, 1300)
        // slide to answer pill
        const PW = 820, PH = 150, PX = 540 - PW / 2, PY = 1560
        x.fillStyle = 'rgba(239,230,214,0.16)'; rr(x, PX, PY, PW, PH, PH / 2); x.fill()
        x.strokeStyle = rgba(BONE, 0.35); x.lineWidth = 2; x.stroke()
        let kp = 0
        if (answerAt != null) kp = ease.inOutCubic(prog(t, answerAt, answerAt + 0.35))
        const KR = PH / 2 - 12, kx = lerp(PX + 12 + KR, PX + PW - 12 - KR, kp)
        // label with shimmer
        x.save(); rr(x, PX, PY, PW, PH, PH / 2); x.clip()
        x.font = `700 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = rgba(BONE, 0.55 * (1 - kp)); x.fillText('slide to answer', 560, PY + PH / 2 + 2)
        const sx = PX + ((t - at) * 520) % (PW + 300) - 150
        const sh = x.createLinearGradient(sx - 120, 0, sx + 120, 0); sh.addColorStop(0, 'rgba(255,255,255,0)'); sh.addColorStop(0.5, `rgba(255,255,255,${0.55 * (1 - kp)})`); sh.addColorStop(1, 'rgba(255,255,255,0)')
        x.globalCompositeOperation = 'source-atop'; x.fillStyle = sh; x.fillText('slide to answer', 560, PY + PH / 2 + 2)
        x.restore()
        x.fillStyle = '#5fdc7a'; x.beginPath(); x.arc(kx, PY + PH / 2, KR, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#fff'; x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('→', kx, PY + PH / 2 + 2)
        if (declineAt != null && t >= declineAt) {
          const dk = pop01(t, declineAt, 0.25, 2.4)
          x.save(); x.translate(540, cy); x.scale(dk, dk); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
          x.strokeStyle = '#fff'; x.lineWidth = 22; x.lineCap = 'round'; x.beginPath(); x.moveTo(-45, -45); x.lineTo(45, 45); x.moveTo(45, -45); x.lineTo(-45, 45); x.stroke(); x.restore()
        }
        x.restore()
      },
    }
  }
}
export function incomingCallCues({ at, out, answerAt = null, declineAt = null }) {
  const stop = answerAt ?? declineAt ?? (out ? out[0] : at + 4)
  const c = [['whoosh', r3(at + 0.1), 0.35, 0.05]]
  for (let t = at + 0.25; t < stop - 0.05; t += 1.1) {
    c.push(['pluck', r3(t), 1318.51, 0.035, 0.22, 0], ['pluck', r3(t + 0.11), 1046.5, 0.035, 0.22, 0], ['pluck', r3(t + 0.22), 1318.51, 0.035, 0.22, 0], ['pluck', r3(t + 0.33), 1046.5, 0.03, 0.3, 0])
  }
  if (answerAt != null) c.push(['whoosh', r3(answerAt + 0.15), 0.3, 0.05], ['pop', r3(answerAt + 0.35), 1174.66, 0.05, 0], ['pop', r3(answerAt + 0.42), 1567.98, 0.04, 0])
  if (declineAt != null) c.push(['pop', r3(declineAt), 330, 0.06, 0], ['pop', r3(declineAt + 0.08), 247, 0.06, 0], ['whoosh', r3(declineAt + 0.35), 0.3, 0.05])
  return c
}

// ═══════════════════════════════════════════════ 7. NOTIFICATION DROP
export function notification(o) {
  const { at, out, title = 'texts', body = 'hey', glyph = '♌', color = '#f0603a', time = 'now', y = 120 } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0) return
        const d = easeOutBack(prog(t, at, at + 0.42), 1.5)
        const lift = out ? ease.inCubic(prog(t, out[0], out[1])) * 300 : 0
        const bz = t - at - 0.45, wig = bz > 0 && bz < 0.45 ? 8 * Math.sin(bz * 90) * (1 - bz / 0.45) : 0
        const Y = lerp(-320, y, d) - lift
        x.save(); x.translate(540 + wig, Y)
        glass(x, -470, 0, 940, 210, 40, { fill: 'rgba(28,17,60,0.93)', rim: 'rgba(239,230,214,0.35)' })
        coin(x, -470 + 92, 105, 52, glyph, color)
        x.textAlign = 'left'; x.textBaseline = 'alphabetic'
        x.font = `700 28px ${MONO}`; x.fillStyle = rgba(BONE, 0.65); x.fillText(String(title).toUpperCase(), -470 + 170, 66)
        x.textAlign = 'right'; x.fillText(time, 440, 66)
        x.textAlign = 'left'
        x.save(); x.beginPath(); x.rect(-470 + 160, 80, 770, 120); x.clip()
        drawRich(x, body, -470 + 170, 88, { size: 50, accentSize: 58, maxW: 740, align: 'left', shadow: false })
        x.restore()
        x.restore()
      },
    }
  }
}
export function notificationCues({ at }) {
  return [['pop', r3(at + 0.05), 1567.98, 0.05, 0.3], ['pop', r3(at + 0.17), 2093, 0.045, 0.3], ['tom', r3(at + 0.45), 55, { gain: 0.12, decay: 0.12 }], ['tom', r3(at + 0.6), 55, { gain: 0.1, decay: 0.12 }]]
}

// ═══════════════════════════════════════════════ 8. LOADING BAR
function loadingAt(t, { at, len = 2.6, stallAt = 99 }) {
  const fillEnd = at + len * 0.55
  const p = prog(t, at + 0.25, fillEnd)
  const steps = [0, 0.12, 0.37, 0.41, 0.68, 0.74, 0.93, 1]
  const i = Math.min(steps.length - 2, Math.floor(p * (steps.length - 1)))
  const f = ease.outQuad((p * (steps.length - 1)) - i)
  return Math.round(lerp(steps[i], steps[i + 1], f) * stallAt)
}
export function loadingBar(o) {
  const { at, len = 2.6, label = 'overthinking…', stallAt = 99, error = 'Error: too many feelings', y = 900 } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const errT = at + len - 0.5
    return {
      start: at, end: at + len, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const k = pop01(t, at, 0.3, 2.2) * (1 - ease.inQuad(prog(t, at + len - 0.15, at + len)))
        if (k <= 0.01) return
        let pct = loadingAt(t, o)
        const isErr = error && t >= errT
        if (pct >= stallAt && !isErr) pct = stallAt
        x.save(); x.translate(540, y); x.scale(k, k)
        const jit = pct >= stallAt && !isErr ? 3 * Math.sin(t * 50) : isErr ? 10 * Math.sin((t - errT) * 60) * Math.exp(-(t - errT) * 6) : 0
        x.translate(jit, 0)
        pixelBox(x, -440, -150, 880, 300, { border: isErr ? RED : GOLD })
        x.font = `800 56px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE
        x.fillText(label, -390, -62)
        x.font = `700 52px ${MONO}`; x.textAlign = 'right'; x.fillStyle = isErr ? RED : GOLD
        x.fillText(isErr ? '!!' : `${pct}%`, 390, -62)
        // bar: 20 pixel cells
        const N = 20, BW = 780, cw = BW / N
        x.fillStyle = '#2a1f55'; x.fillRect(-BW / 2, -10, BW, 60)
        const on = Math.round((pct / 100) * N)
        for (let i = 0; i < N; i++) if (i < on) { x.fillStyle = isErr ? RED : (i % 2 ? GOLD : '#ffe7a3'); x.fillRect(-BW / 2 + i * cw + 3, -4, cw - 6, 48) }
        if (isErr) {
          const ek = pop01(t, errT, 0.25, 2.6)
          x.save(); x.translate(0, 105); x.scale(ek, ek); x.font = `700 38px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ff8a8a'; x.fillText(error, 0, 0); x.restore()
        } else {
          x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillStyle = rgba(BONE, 0.6)
          x.fillText(pct >= stallAt ? 'almost there…' : 'please wait', 0, 105)
        }
        x.restore()
      },
    }
  }
}
export function loadingBarCues(o) {
  const { at, len = 2.6, error = 'Error: too many feelings', stallAt = 99 } = o
  const c = [['pop', r3(at + 0.02), 880, 0.035, 0]]
  let last = -1
  for (let t = at + 0.25; t < at + len * 0.55; t += 1 / 30) { const v = Math.floor(loadingAt(t, o) / 10); if (v !== last) { if (last >= 0) c.push(['tick', r3(t), 0.03]); last = v } }
  c.push(['riser', r3(at + len * 0.3), r3(at + len * 0.55), 0.03])
  if (stallAt >= 99) c.push(['pop', r3(at + len * 0.55), 1760, 0.02, 0])
  if (error) { const e = at + len - 0.5; c.push(['pop', r3(e), 196, 0.07, 0], ['pop', r3(e + 0.09), 185, 0.07, 0], ['tick', r3(e), 0.08]) }
  return c
}

// ═══════════════════════════════════════════════ 9. COUNTDOWN
export function countdown(o) {
  const { at, from = 3, gap = 0.6, go = 'GO!', y = 960, color = GOLD } = o
  const n = from + (go ? 1 : 0)
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    return {
      start: at, end: at + n * gap, root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const i = Math.floor((t - at) / gap)
        if (i < 0 || i >= n) return
        const t0 = at + i * gap, lt = t - t0
        const label = i < from ? String(from - i) : go
        const s = lt < 0.12 ? lerp(2.6, 1, ease.inCubic(lt / 0.12)) : 1 + 0.08 * Math.exp(-(lt - 0.12) * 14) * Math.cos((lt - 0.12) * 40)
        const fade = 1 - ease.inQuad(prog(lt, gap - 0.12, gap))
        // ring burst
        const rp = prog(lt, 0.1, 0.55)
        if (rp > 0 && rp < 1) { x.strokeStyle = rgba(color, 0.7 * (1 - rp)); x.lineWidth = 18 * (1 - rp) + 2; x.beginPath(); x.arc(540, y, 200 + rp * 330, 0, Math.PI * 2); x.stroke() }
        x.save(); x.translate(540, y); x.scale(s, s); x.globalAlpha = fade * clamp(lt / 0.06)
        x.font = i < from ? `800 420px ${INTER}` : `800 260px ${INTER}`
        x.textAlign = 'center'; x.textBaseline = 'middle'
        x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 40
        x.lineWidth = 16; x.strokeStyle = INK; x.strokeText(label, 0, 10)
        x.fillStyle = i < from ? BONE : color; x.fillText(label, 0, 10)
        x.restore()
        if (i === from && go) burst(x, 540, y, t, t0 + 0.1, { n: 12, dist: 420, seed: 31 })
      },
    }
  }
}
export function countdownCues({ at, from = 3, gap = 0.6, go = 'GO!' }) {
  const c = []
  for (let i = 0; i < from; i++) c.push(['pop', r3(at + i * gap + 0.1), 880, 0.06, 0], ['tom', r3(at + i * gap + 0.1), 110, { gain: 0.15, decay: 0.15 }])
  if (go) { const g = at + from * gap + 0.1; c.push(['pop', r3(g), 1760, 0.07, 0], ['bell', r3(g), 1760, 0.035, 0.8, 0], ['boom', r3(g), 0.15], ['glitter', r3(g), r3(g + 0.4)]) }
  return c
}

// ═══════════════════════════════════════════════ 10. NEWS DESK
export function newsDesk(o) {
  const { at, out, headline = 'Gemini replied in under *three minutes.*', tag = 'BREAKING', channel = 'STAR NEWS', ticker = ['More at eleven'], live = true, clock = '11:00' } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    x.font = `700 38px ${MONO}`
    const crawl = ticker.map(s => String(s).toUpperCase()).join('   ★   ') + '   ★   '
    const crawlW = x.measureText(crawl).width
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0) return
        x.save(); x.globalAlpha = ok
        const LT = 1330
        // BREAKING banner whips in from the left
        const b = ease.outCubic(prog(t, at, at + 0.28))
        const bx = lerp(-700, 0, b)
        x.fillStyle = RED; x.beginPath(); x.moveTo(bx, LT - 110); x.lineTo(bx + 560, LT - 110); x.lineTo(bx + 520, LT); x.lineTo(bx, LT); x.closePath(); x.fill()
        const pulse = 0.85 + 0.15 * Math.sin((t - at) * 9)
        x.font = `800 70px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = `rgba(255,255,255,${pulse})`
        x.fillText(tag, bx + 60, LT - 52)
        // lower third
        const l = ease.outCubic(prog(t, at + 0.15, at + 0.5))
        const lx = lerp(FW, 0, l)
        x.fillStyle = 'rgba(239,230,214,0.96)'; x.fillRect(lx, LT, FW, 230)
        x.fillStyle = GOLD; x.fillRect(lx, LT, 22, 230)
        x.save(); x.beginPath(); x.rect(lx, LT, FW, 230); x.clip()
        drawRich(x, headline, lx + 60, LT + 30, { size: 64, accentSize: 74, color: INK, accentColor: '#b5122b', maxW: 940, align: 'left', shadow: false })
        x.restore()
        // channel bar
        x.fillStyle = INK; x.fillRect(lx, LT + 230, FW, 70)
        x.font = `800 40px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.fillText(channel, lx + 60, LT + 266)
        // ticker
        const tk = ease.outCubic(prog(t, at + 0.3, at + 0.6))
        const TY = FH - 200 + (1 - tk) * 220
        x.fillStyle = '#b5122b'; x.fillRect(0, TY, FW, 86)
        x.fillStyle = INK; x.fillRect(0, TY, 230, 86)
        x.save(); x.beginPath(); x.rect(230, TY, FW - 230, 86); x.clip()
        x.font = `700 38px ${MONO}`; x.fillStyle = '#fff'; x.textBaseline = 'middle'
        const off = ((t - at) * 260) % crawlW
        for (let k = -1; k < 3; k++) x.fillText(crawl, 250 - off + k * crawlW, TY + 45)
        x.restore()
        x.font = `800 36px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('LATEST', 115, TY + 45)
        // LIVE + clock
        if (live) {
          const lk = prog(t, at + 0.2, at + 0.4)
          x.globalAlpha = ok * lk
          x.fillStyle = RED; rr(x, FW - 330, 92, 130, 64, 10); x.fill()
          x.font = `800 38px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('LIVE', FW - 265, 125)
          x.fillStyle = 'rgba(16,9,38,0.85)'; rr(x, FW - 190, 92, 130, 64, 10); x.fill()
          x.font = `700 34px ${MONO}`; x.fillStyle = BONE; x.fillText(clock, FW - 125, 125)
        }
        x.restore()
      },
    }
  }
}
export function newsDeskCues({ at }) {
  return [
    ['whoosh', r3(at + 0.12), 0.3, 0.06], ['boom', r3(at + 0.28), 0.18],
    ...[392, 523.25, 659.25, 783.99].map((f, i) => ['bell', r3(at + 0.28 + i * 0.09), f, 0.04, 1.2, (i - 1.5) * 0.2]),
    ['whoosh', r3(at + 0.4), 0.3, 0.04], ['tick', r3(at + 0.6), 0.04],
  ]
}

// ═══════════════════════════════════════════════ 11. GAME HUD + ACHIEVEMENT
const fmtTime = s => { s = Math.max(0, s); const m = Math.floor(s / 60), r = s - m * 60; return `${m}:${r.toFixed(2).padStart(5, '0')}` }
export function gameHud(o) {
  const { at, out, title = 'ANY%', splits = [], start = at, color = MINT } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const stopAt = splits.length ? splits[splits.length - 1].at : Infinity
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        const k = pop01(t, at, 0.3, 2) * ok
        if (k <= 0.01) return
        x.save(); x.globalAlpha = clamp(k)
        // title strip
        const tw = ease.outCubic(prog(t, at, at + 0.3))
        x.fillStyle = 'rgba(10,6,22,0.82)'; x.fillRect(0, 70, FW * tw, 74)
        x.font = `700 34px ${MONO}`; x.fillStyle = color; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.save(); x.beginPath(); x.rect(0, 70, FW * tw, 74); x.clip(); x.fillText(title, 50, 108); x.restore()
        // timer
        const run = Math.min(t, stopAt) - start
        const done = t >= stopAt
        x.font = `700 92px ${MONO}`; x.textAlign = 'right'
        x.lineWidth = 10; x.strokeStyle = INK; x.strokeText(fmtTime(run), FW - 50, 220)
        x.fillStyle = done ? GOLD : color; x.fillText(fmtTime(run), FW - 50, 220)
        // splits column
        splits.forEach((s, i) => {
          const py = 300 + i * 66
          const p = prog(t, at + 0.1 + i * 0.05, at + 0.4 + i * 0.05)
          if (p <= 0) return
          x.globalAlpha = clamp(k) * p
          x.fillStyle = 'rgba(10,6,22,0.72)'; x.fillRect(FW - 520, py - 28, 470, 58)
          const hit = t >= s.at
          x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.fillStyle = hit ? BONE : rgba(BONE, 0.55)
          x.fillText(s.name, FW - 500, py + 2)
          x.textAlign = 'right'
          if (hit) {
            const fl = Math.exp(-(t - s.at) * 4)
            x.fillStyle = s.best === false ? '#ff8a8a' : GOLD
            x.fillText(fmtTime(s.at - start), FW - 70, py + 2)
            if (fl > 0.02) { x.globalAlpha = clamp(k) * fl; x.fillStyle = s.best === false ? RED : GOLD; x.fillRect(FW - 520, py - 28, 470, 58); x.globalAlpha = clamp(k) }
          } else { x.fillStyle = rgba(BONE, 0.35); x.fillText('-:--.--', FW - 70, py + 2) }
        })
        x.restore()
      },
    }
  }
}
export function gameHudCues({ at, splits = [] }) {
  return [
    ['chip', r3(at + 0.05), 523.25, 0.08, { gain: 0.04, wave: 'square', duty: 0.25, decay: 0.08, sustain: 0.6 }], ['chip', r3(at + 0.14), 1046.5, 0.12, { gain: 0.04, wave: 'square', duty: 0.25, decay: 0.1, sustain: 0.6 }],
    ...splits.flatMap((s, i) => [['chip', r3(s.at), [659.25, 783.99, 880, 1046.5, 1174.66][i % 5], 0.09, { gain: 0.045, wave: 'square', duty: 0.5, decay: 0.08, sustain: 0.5 }], ['pop', r3(s.at), 1760, 0.02, 0.4]]),
  ]
}
export function achievement(o) {
  const { at, text = 'ate dinner alone and *loved it*', title = 'ACHIEVEMENT UNLOCKED', icon = '★', y = 1520 } = o
  const out = o.out || [at + 2.4, at + 2.7]
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    return {
      start: at, end: out[1], root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0) return
        const d = easeOutBack(prog(t, at, at + 0.4), 1.6)
        const Y = lerp(FH + 120, y, d) + ease.inCubic(prog(t, out[0], out[1])) * 300
        x.save(); x.translate(540, Y); x.globalAlpha = ok
        const PW = 940, PH = 220
        glass(x, -PW / 2, -PH / 2, PW, PH, PH / 2, { fill: 'rgba(16,9,38,0.95)', rim: GOLD })
        // trophy coin
        const cx = -PW / 2 + 115
        x.fillStyle = GOLD; x.beginPath(); x.arc(cx, 0, 78, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.beginPath(); x.arc(cx, 0, 64, 0, Math.PI * 2); x.fill()
        drawPixelStar(x, cx, 0, 70, 0, GOLD)
        if (icon && icon !== '★') { x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(icon, cx, 4) }
        x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = GOLD
        x.fillText(title, cx + 110, -40)
        x.save(); x.beginPath(); x.rect(cx + 100, -30, PW - 260, 120); x.clip()
        drawRich(x, text, cx + 110, -26, { size: 48, accentSize: 56, maxW: PW - 290, align: 'left', shadow: false })
        x.restore()
        // shine
        const sw = prog(t, at + 0.35, at + 0.95)
        if (sw > 0 && sw < 1) {
          x.save(); rr(x, -PW / 2, -PH / 2, PW, PH, PH / 2); x.clip()
          const sx = lerp(-PW, PW, sw)
          const g = x.createLinearGradient(sx - 140, 0, sx + 140, 0); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(0.5, 'rgba(255,240,200,0.35)'); g.addColorStop(1, 'rgba(255,240,200,0)')
          x.fillStyle = g; x.fillRect(-PW / 2, -PH / 2, PW, PH); x.restore()
        }
        x.restore()
        burst(x, cx + 540, Y, t, at + 0.3, { n: 10, dist: 300, seed: 913 })
      },
    }
  }
}
export function achievementCues({ at }) {
  const ch = (t, f, len) => ['chip', r3(t), f, len, { gain: 0.045, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.6 }]
  return [['whoosh', r3(at + 0.1), 0.3, 0.04], ch(at + 0.25, 783.99, 0.08), ch(at + 0.33, 1046.5, 0.08), ch(at + 0.41, 1318.51, 0.08), ch(at + 0.49, 1567.98, 0.25), ['glitter', r3(at + 0.4), r3(at + 1.0)], ['bell', r3(at + 0.5), 2093, 0.025, 1.0, 0]]
}

// ═══════════════════════════════════════════════ 12. CHAPTER STICKER
export function chapter(o) {
  const { at, out, n = 1, title = 'THE FIRST TEXT', x: X = 70, y: Y = 230, color = GOLD } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const label = `${n} · ${String(title).toUpperCase()}`
    return {
      start: at, end: endOf(o, 1e9), root,
      update(t) {
        x.clearRect(0, 0, FW, FH)
        const ok = outK(t, out)
        if (ok <= 0 || t < at) return
        const p = prog(t, at, at + 0.16)
        const s = lerp(1.9, 1, ease.inCubic(p)), after = t - at - 0.16
        const sq = after > 0 ? 0.06 * Math.exp(-after * 12) * Math.cos(after * 45) : 0
        x.font = `800 54px ${INTER}`
        const w = x.measureText(label).width + 80, h = 96
        x.save(); x.translate(X + w / 2, Y + h / 2); x.rotate(-0.045); x.scale(s * (1 + sq), s * (1 - sq)); x.globalAlpha = ok * clamp(p * 3)
        x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 20; x.shadowOffsetY = 8
        x.fillStyle = '#fff8ea'; rr(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 22); x.fill()
        x.shadowBlur = 0; x.shadowOffsetY = 0
        x.fillStyle = color; rr(x, -w / 2, -h / 2, w, h, 16); x.fill()
        x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 3)
        // peel corner
        x.fillStyle = 'rgba(255,248,234,0.9)'; x.beginPath(); x.moveTo(w / 2 + 8, h / 2 - 26); x.lineTo(w / 2 - 22, h / 2 + 8); x.lineTo(w / 2 + 8, h / 2 + 8); x.closePath(); x.fill()
        x.restore()
      },
    }
  }
}
export function chapterCues({ at }) {
  return [['whoosh', r3(at + 0.05), 0.18, 0.04], ['tom', r3(at + 0.16), 140, { gain: 0.16, decay: 0.12 }], ['tick', r3(at + 0.16), 0.07], ['pop', r3(at + 0.2), 1174.66, 0.03, -0.3]]
}

// ═══════════════════════════════════════════════ 13. GLITCH
function glitchCam(t, { at, len = 1.2, amp = 1 }) {
  if (t < at || t >= at + len) return null
  const lt = t - at, k = amp * (0.5 + 0.5 * Math.max(0, noise1(lt * 9, 5) - 0.2) / 0.8)
  const jump = noise1(Math.floor(lt * 14), 9) > 0.62
  return { split: 14 * k + (jump ? 10 : 0), dx: jump ? (noise1(lt * 30, 3) - 0.5) * 70 * amp : 0, hue: jump ? 90 * amp : 0, contrast: 1.15, sat: 1.3 }
}
export function glitch(o) {
  const { at, len = 1.2, text = 'LEO.EXE has stopped responding', buttons = ['WAIT', 'CLOSE'], dialog = true } = o
  return async stage => {
    await fonts()
    const { root, x } = overlay(stage)
    const apply = camRegister(stage, t => glitchCam(t, o))
    return {
      start: -1e9, end: 1e9, root,
      update(t) {
        apply(t)
        x.clearRect(0, 0, FW, FH)
        if (t < at || t >= at + len) return
        const lt = t - at, fr = Math.floor(lt * 20), R = rng(1000 + fr)
        // slice bars + noise blocks
        for (let i = 0; i < 7; i++) {
          const y = R() * FH, h = 6 + R() * 60
          x.fillStyle = [`rgba(255,40,80,${0.18 + R() * 0.2})`, `rgba(40,230,255,${0.18 + R() * 0.2})`, `rgba(239,230,214,${0.1 + R() * 0.15})`][i % 3]
          x.fillRect(0, y, FW, h)
        }
        for (let i = 0; i < 14; i++) { x.fillStyle = R() > 0.5 ? 'rgba(0,0,0,0.6)' : `rgba(${R() > 0.5 ? '255,60,120' : '80,240,255'},0.5)`; x.fillRect(R() * FW, R() * FH, 20 + R() * 140, 8 + R() * 30) }
        // scanlines
        x.fillStyle = 'rgba(0,0,0,0.16)'; for (let y = 0; y < FH; y += 6) x.fillRect(0, y, FW, 2)
        if (dialog) {
          const k = pop01(t, at + 0.12, 0.2, 2.2)
          if (k > 0.01) {
            const jx = noise1(fr, 77) > 0.7 ? (R() - 0.5) * 40 : 0
            x.save(); x.translate(540 + jx, 960); x.scale(k, k)
            const PW = 900, PH = 420
            x.fillStyle = INK; x.fillRect(-PW / 2 - 8, -PH / 2 - 8, PW + 16, PH + 16)
            x.fillStyle = '#d8d0c2'; x.fillRect(-PW / 2, -PH / 2, PW, PH)
            x.fillStyle = '#3a2a8a'; x.fillRect(-PW / 2, -PH / 2, PW, 70)
            x.font = `700 32px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('system error', -PW / 2 + 24, -PH / 2 + 36)
            x.fillStyle = '#d8d0c2'; x.fillRect(PW / 2 - 60, -PH / 2 + 14, 42, 42); x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.fillText('✕', PW / 2 - 39, -PH / 2 + 36)
            // warning icon
            x.fillStyle = RED; x.beginPath(); x.moveTo(-PW / 2 + 110, -60); x.lineTo(-PW / 2 + 170, 50); x.lineTo(-PW / 2 + 50, 50); x.closePath(); x.fill()
            x.fillStyle = '#fff'; x.font = `800 70px ${INTER}`; x.fillText('!', -PW / 2 + 110, 18)
            x.save(); x.beginPath(); x.rect(-PW / 2 + 200, -110, PW - 240, 200); x.clip()
            drawRich(x, text, -PW / 2 + 210, -100, { size: 46, accentSize: 54, color: INK, accentColor: '#3a2a8a', maxW: PW - 260, align: 'left', shadow: false })
            x.restore()
            buttons.forEach((b, i) => {
              const bw = 220, bx = PW / 2 - 40 - (buttons.length - i) * (bw + 24) + 24
              x.fillStyle = INK; x.fillRect(bx - 4, PH / 2 - 110, bw + 8, 78)
              x.fillStyle = '#ece6da'; x.fillRect(bx, PH / 2 - 106, bw, 70)
              x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.fillText(b, bx + bw / 2, PH / 2 - 70)
            })
            x.restore()
          }
        }
      },
    }
  }
}
export function glitchCues({ at, len = 1.2 }) {
  const R = rng(4711), c = [['tapeStop', r3(at), Math.min(0.4, len * 0.4)], ['tick', r3(at), 0.08]]
  for (let t = at; t < at + len - 0.05; t += 0.07 + R() * 0.06) c.push(['chip', r3(t), 200 + Math.floor(R() * 8) * 180, 0.04, { gain: 0.03, wave: 'square', duty: 0.125, decay: 0.03, sustain: 0.4, rev: 0.02, dly: 0 }])
  c.push(['pop', r3(at + 0.15), 220, 0.06, 0], ['pop', r3(at + 0.25), 207.65, 0.06, 0])
  return c
}

// ═══════════════════════════════════════════════ 14. LOOP BACK
/** 0 → 1 over the last `len` s (eased), for films that drive their own timeline back to the frame-0 pose */
export function loopK(t, duration, len = 0.4) {
  return ease.inOutCubic(prog(t, duration - len, duration - 1 / 30))
}
export function loopBack(builders, { duration, len = 0.4 }) {
  return async stage => {
    const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: FW + 'px', height: FH + 'px', overflow: 'hidden', opacity: 0, background: '#05040c' }, stage)
    wrap.dataset.hookcam = 'off'
    const copies = []
    for (const b of builders) copies.push(await b(wrap))
    let drawn = false
    return {
      start: duration - len, end: duration + 1, root: wrap,
      update(t) {
        if (!drawn) {   // frame 0 never changes: render it once
          for (const s of copies) {
            const on = 0 >= s.start && 0 < s.end
            if (s.root) s.root.style.display = on ? 'block' : 'none'
            if (on) s.update(0)
          }
          drawn = true
        }
        wrap.style.opacity = String(loopK(t, duration, len))
      },
    }
  }
}
export function loopCues({ duration, len = 0.4 }) {
  return [['riser', r3(duration - len - 0.1), r3(duration - 0.02), 0.03], ['whoosh', r3(duration - len * 0.5), len, 0.035]]
}
