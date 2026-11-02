// mlkit — the MOONLIGHT LANE show kit (Star Talk, promo/films/STARTALK-EPISODES.md). Built with mlpilot (Ep 1).
// Every episode COPIES this file into its own scenes/ folder unchanged (fix bugs in your copy only, and say so).
// Imports only shared modules (../../startalk.js etc.), so the copy works from any promo/films/ml<name>/scenes/.
//
// ═══════════════════════════════════════ CONSTANTS + HELPERS ═══════════════════════════════════════
//   ML_GOLD '#ffcf6e' (the show's warm gold) · GOLD BONE INK PINK LAV CYAN MINT NIGHT · INTER MONO SERIF
//   ML_FONTS: font strings to await before building DOM (await loadFonts() does it, never throws)
//   BEAT(n) = 0.6 + n·60/108 (the music grid) · BL = one beat · r3(v) · rgba(hex, a) · mixHex(a, b, k)
//   pop01(t, t0, d=.32, s=1.9) springy 0→1 · outK(t, [a,b]) 1→0 · popOut(t, [a,b]) bouncy 1→0 · inR(t, a, b)
//   bump(t, t0, d) 0→1→0 sine · starFrame / inSprite / tearsCells (overlays on a star sprite's 36-cell grid)
//   popCues(h) → word-pop sound cues for a popText(h) headline (pass the same { text, at, gap, late, lateAt, lateGap })
//
// ═══════════════════════════════════════ THE CAST ═══════════════════════════════════════
//   drawSign(ctx, sign, x, y, size, t, opts)   any neighbour: drawStarChar in signStar(sign) colours (+ glyph coin if
//        size ≥ 120). opts = drawStarChar opts (mood, look, hops, pop, squash, blush, alpha, seed…) plus the FIXED looks:
//          scorpio: a little white baker's cap (opts.cap = false hides it)    libra: a pink flower on the right point
//          pisces:  tears (opts.tears 0…3, default 2) + the tissue box at its side (opts.box = false hides it, opts.pull
//                   0…1 yanks a tissue)
//        opts.rot tips the star about its base (faints, slumps). Returns drawStarChar's { x, y, size, top }.
//   drawPisces(ctx, x, y, size, t, opts)       = drawSign(ctx, 'pisces', …). Pisces cries in EVERY episode.
//   standY(size, feet = LANE.feet)             the y to pass so a star of that size stands with its feet on `feet`.
//
// ═══════════════════════════════════════ THE SETS ═══════════════════════════════════════
//   drawLane(ctx, t, opts, fg)   the lane at night (the show's home set). Paints the whole frame (opaque). World is
//        2160 px wide (LANE.W); the screen shows world x pan … pan + 1080. opts:
//          time   'dusk' | 'night' (default) | 'late'          pan   0…1080 (world x of the screen's left edge)
//          zoom   1 (default) · focus [fx, fy] screen point the zoom is about (default [540, 1300])
//          lit    which windows glow: undefined = the default set for `time`; an array of ids; or { id: 0…1 }
//                 (ids: LANE.windows[i].id — 'a0'…'a6' home row, 'b0' 'pisces' 'b2' 'cafe' café, 'c0'…'c3' middle,
//                 'd0'…'d9' flower building). 'cafe' is the café's big front window + door.
//          lampsAt  time the three lamp posts flicker on (one after another); omit = already on (dusk: off unless set)
//          lights   rooftop string lights 0…1 (default 1 at night/late, 0 at dusk)
//          moon     { x, y, r } screen position override (default { x: 800, y: 360, r: 120 }) · dim 0…1 darkens all
//          shake    px, vertical shake
//        fg(ctx) is called inside the world transform, after the set and its glows: draw your characters there in
//        WORLD coordinates (stand them with standY; LANE gives the spots). Returns { toScreen(wx, wy) → [sx, sy] }.
//   LANE = { W, feet, bench: { x, seatY, seats: [x, x] }, lamps: [x, x, x], cafeDoor: { x, y }, stall: { x, y },
//            pisces: { x, y } (Pisces' window above the café), roof: { x0, x1, y } (rooftop terrace),
//            home: { x, y } (the home-row door), windows: [{ id, x, y, w, h }] }
//   drawCafe(ctx, t, opts)        the café interior (screen space, opaque): window onto the lane + moon, pendant lamps,
//        chalk menu (doodles, no words), pastry case, counter, two back tables. opts: lights 0…1 (1), chairsUp 0…1 (the
//        back tables' chairs flip up onto them: closing time), view 'night' | 'late', behind(ctx): called before the
//        counter is painted, so whoever you draw there stands BEHIND it (Taurus at CAFE.counter: standY(size, y)).
//        CAFE = { table: { x, y }, seats: [{ x, y }, { x, y }] (y = seated star's feet), counter: { x, y },
//        window: { x, y, w, h } }
//   drawCafeTable(ctx, t, opts)   the front table + its two chairs' fronts: draw it AFTER the seated stars. opts:
//        cups 0…2 (coffee cups on it), pastry 'croissant' | 'bun' | null, alpha.
//   drawApartment(ctx, t, opts)   a cosy apartment (screen space, opaque): window with the moon, curtains, floor lamp,
//        plant, framed doodle, couch, rug. opts: lamp 0…1 (1), time 'night' | 'late' | 'dusk'.
//        APT = { couch: { x, seatY, seats: [x, x] }, wall: { x, y } (free wall spot for a prop), window, lamp, plant }
//
// ═══════════════════════════════════════ THE SHOW (DOM pieces; build them inside build(), after loadFonts) ════════
//   showBug(root, ep, { at })     "MOONLIGHT LANE" Inter 800 small caps, letter-spaced, #ffcf6e, then " · EP n" white
//        60%. Top-left, 56 px from the edges. → { update(t, alpha = 1) }. Hide it over the title card and the end card
//        (pass alpha 0). Use cardFrame({ corners: 'tr bl br' }) so the frame's corner star doesn't sit under it.
//   buildCaption(root, { text, at, out, top = 170, kicker, size = 92, accentSize, accentColor = ML_GOLD })
//        a cold-open / scene caption: an optional mono kicker pill ('MONDAY · 6:58 PM') over a popText headline
//        ('*' accent, '|' line break). → { update(t) }. Sound: captionCues(same opts).
//   buildTitle(root, { ep, title, at, len = 3 })   the 3 s title card (opaque, full frame): night blue, the big moon, a
//        row of rooftops, "MOONLIGHT / LANE" in gold flickering on like a lamp, "EP n · <title>" under it.
//        → { update(t), on(t) }. Sound: titleCues(at, len).
//   buildPreviously(root, { at = 0, len = 2, stills: [{ caption, scene(ctx), crop: [x, y, w, h] }] })   the 2 s
//        "◀◀ PREVIOUSLY ON Moonlight Lane…" flash (Eps 2–10): opaque, VHS lines, 2–3 tilted polaroids popping in.
//        scene(ctx) draws a full 1080×1920 frame ONCE at build (e.g. drawLane + stars at a fixed t); crop picks the
//        part shown (default [0, 560, 1080, 1080]). → { update(t), on(t) }. Sound: previouslyCues(at, n, len).
//   buildAdvise(root, { at, out, cards, lines, box, narrator = true })   THE STARS ADVISE (opaque once faded in, over
//        0.6 s from at). The lane fades to deep blue, a "THE STARS ADVISE" header, THE STARS' box at the bottom
//        (dialogueBox, y 1500) and three advice cards dealt in one at a time from the top (cream, gold border, pixel icon,
//        bold 2–5 word head, one plain sentence). The last card gets the "★ TONIGHT'S MOVE" tab (it's the one Act 3 uses).
//          cards  [{ at, icon, head, body }]  icon: one of ICONS keys (calendar door question clock heart chat balloon
//                 star moon cup flower check). head may use *accent*. body ≤ ~80 chars (two lines).
//          lines  dialogue lines for the box ({ t, speaker = 'THE STARS', text, color }) ≤ ~46 chars; shout-outs go here.
//          box    { open, close } (defaults: first line − 0.25 / out[0]) · out [a, b] the fade-out (all gone at b).
//        → { update(t) }. Sound: adviseCues(same opts) (header, deals, talk blips).
//   buildNextTime(root, { at, out, teaser, finale = false })   the 3.5 s "NEXT TIME ON Moonlight Lane…" card (gold on
//        night) with one teaser line ('*' accent). finale: "THE END…" + teaser (e.g. '*for now*'). Draw ONLY
//        drawSky(ctx, t, SKY_H) behind it, and end it (out[1]) by the end card's start: the hand-off must be plain sky.
//        → { update(t) }. Sound: nextTimeCues(at).
//   The LESSON chip: use lesson.js (buildLesson / lessonCues) as usual.
//
// ═══════════════════════════════════════ PROPS (canvas) ═══════════════════════════════════════
//   drawMysteryCard(ctx, cx, cy, w, t, { sign, rot, alpha, glow, scaleX, back })   a veiled blind mystery card
//        (h = 1.5 w): "Mystery card", a blurred aura, the sign coin, "NO PHOTO YET". back: true = the card back.
//   drawPastry(ctx, x, y, cell, kind)   'croissant' | 'bun' | 'cake' | 'loaf' (≈ 14 × 9 cells, centred on x, y)
//   drawBubble(ctx, cx, cy, text, { size = 30, col = BONE, k = 1, alpha = 1, tail = 'down' | 'left' | 'right' | null })
//        a pixel speech bubble (one line). drawPhone(ctx, cx, cy, w, h, t, { title, msgs: [{ at, side 'L'|'R', text }],
//        typing: [a, b], alpha })   a phone with a message thread (newest at the bottom, bubbles pop in at `at`).
//   drawIcon(ctx, name, x, y, cell)   one of the ICONS pixel icons, top-left at (x, y).
//   sparkles(ctx, t, x, y, t0, n = 10, R = 150, seed = 1, cols)   a pixel-star burst at t0 (0.8 s).
//
// Everything is a pure function of t. Nothing touches `document` at module load (the sound build imports it in node).
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { drawSky, drawPixelStar, drawMoon } from '../../sky.js'
import { SKY_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

const TAU = Math.PI * 2
export const ML_GOLD = '#ffcf6e'
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', MINT = '#7dffb0'
export const NIGHT = '#0b1236'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const ML_FONTS = ['800 112px Inter', '800 44px Inter', '700 44px Inter', '500 30px Inter', "italic 500 150px 'EB Garamond'", "italic 600 120px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"]
export async function loadFonts(extra = []) { try { await Promise.all([...ML_FONTS, ...extra].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ } }

export const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)
export const r3 = v => +v.toFixed(3)
const hexRgb = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] }
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
export const mixHex = (a, b, k) => { const A = hexRgb(a), B = hexRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
export const rgba = (hex, a) => { const [r, g, b] = hexRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const inR = (t, a, b) => t >= a && t < b
export const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ═══════════════════════════════════════ sprite overlays (36-cell grid, same maths as startalk.js) ═══════════════════
const G = 36, HALF = 18, SC_Y = 19.6, SC_R = 17.6
const FOOT_ROW = SC_Y + SC_R * Math.cos(Math.PI / 5)
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
export function starFrame(x, y, size, t, { pop = 1, bob, squash = 0, hops = null, seed = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell
  return { cell, S, cy, base, ox: Math.round(x), oy: Math.round(cy + base), sx: 1 + sq, sy: 1 - sq * 0.9 }
}
export function inSprite(ctx, F, fn) {
  ctx.save(); ctx.translate(F.ox, F.oy); ctx.scale(F.sx, F.sy); ctx.translate(-F.S / 2, -F.S / 2 - F.base); ctx.scale(F.cell, F.cell)
  fn(); ctx.restore()
}
/** tears from the eye corners (k: 1 sniffle · 2 streams · 3 fountains) */
export function tearsCells(ctx, t, k) {
  if (k <= 0) return
  const drop = (i, j) => { ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7); ctx.fillStyle = '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5) }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let x, y
      if (k >= 3) { x = ex + d * 15 * ph; y = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { x = ex + d * 3.5 * ph; y = 20.5 + 15 * ph * ph }
      else { x = ex + d * 0.6 * ph; y = 21 + 8 * ph * ph }
      drop(Math.round(x * 2) / 2, Math.round(y * 2) / 2)
    }
    ctx.fillStyle = '#8fe3ff'; ctx.fillRect(d < 0 ? 10 : 20, 23.2, 6, 0.9)
  }
}
function paintCells(ctx, rows, pal, ox, oy) {
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = pal[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(ox + i, oy + j, 1.02, 1.02) } } })
}
const CAP = ['..KKKKKKK..', '.KWWWWWWWK.', 'KWWWWWWWWWK', 'KWWWWWWWWWK', '.KWWWWWWWK.', '..KSSSSSK..', '..KKKKKKK..']
const FLOWER = ['.KKK.', 'KPPPK', 'KPGPK', 'KPPPK', '.KKK.']
function drawTissueBox(ctx, x, y, c, t, pull = 0) {
  const w = 10 * c, h = 7 * c
  ctx.save(); ctx.translate(Math.round(x), Math.round(y))
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - c, -h / 2 - c, w + 2 * c, h + 2 * c)
  ctx.fillStyle = '#9fd8ff'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#ffffff'; for (let i = 0; i < 3; i++) ctx.fillRect(-w / 2 + (1 + i * 3) * c, -h / 2 + 3 * c, c, c)
  ctx.fillStyle = '#6fb6e8'; ctx.fillRect(-w / 2, h / 2 - c, w, c)
  const fl = Math.sin(t * 6) * c * 0.8, ph = (3 + 4 * pull) * c
  ctx.fillStyle = INK; ctx.fillRect(-2.5 * c + fl, -h / 2 - ph - c, 5 * c, ph + c)
  ctx.fillStyle = '#fffaf2'; ctx.fillRect(-2 * c + fl, -h / 2 - ph, 4 * c, ph)
  ctx.restore()
}
export function drawSign(ctx, sign, x, y, size, t, opts = {}) {
  const S = signStar(sign)
  const { rot = 0, cap = true, tears = 2, box = true, pull = 0, ...o } = opts
  const so = { color: S.color, glyph: size >= 120 ? S.glyph : null, ...o }
  if (sign === 'pisces') { so.glyph = null; if (o.mood === undefined) so.mood = 'sparkle'; if (o.glow === undefined) so.glow = 0.85 }
  ctx.save()
  if (rot) { const F = starFrame(x, y, size, t, so); ctx.translate(F.ox, F.oy); ctx.rotate(rot); ctx.translate(-F.ox, -F.oy) }
  const r = drawStarChar(ctx, x, y, size, t, so)
  if ((so.alpha ?? 1) > 0 && (so.pop ?? 1) > 0) {
    const F = starFrame(x, y, size, t, so)
    ctx.save(); ctx.globalAlpha *= so.alpha ?? 1
    if (sign === 'scorpio' && cap) inSprite(ctx, F, () => paintCells(ctx, CAP, { K: INK, W: '#fffaf0', S: '#e8dcc8' }, 12.5, -4.5))
    if (sign === 'libra') inSprite(ctx, F, () => paintCells(ctx, FLOWER, { K: INK, P: '#ffb3d9', G: ML_GOLD }, 28.5, 9))
    if (sign === 'pisces' && tears) inSprite(ctx, F, () => tearsCells(ctx, t, tears))
    ctx.restore()
  }
  ctx.restore()
  if (sign === 'pisces' && box && (so.alpha ?? 1) > 0 && (so.pop ?? 1) > 0.05) {
    ctx.save(); ctx.globalAlpha *= so.alpha ?? 1
    drawTissueBox(ctx, x + size * 0.56 * (so.pop ?? 1), y + size * 0.4 * (so.pop ?? 1), Math.max(1.5, size / 36 * 1.05 * (so.pop ?? 1)), t, pull)
    ctx.restore()
  }
  return r
}
export const drawPisces = (ctx, x, y, size, t, opts = {}) => drawSign(ctx, 'pisces', x, y, size, t, { seed: 12, ...opts })

// ═══════════════════════════════════════ THE LANE ═══════════════════════════════════════
const LW = 2160, LY = 560                       // world width; the static layer covers y LY…1920
const FEET = 1420
export const standY = (size, feet = FEET) => feet - (FOOT_ROW - HALF) / G * size
const WIN = []
const win = (id, x, y, w, h, kind = 'pane') => WIN.push({ id, x, y, w, h, kind })
// A · home row (0–500)
;[60, 200, 340].forEach((x, i) => { win('a' + i, x, 690, 100, 120); win('a' + (i + 3), x, 860, 100, 120) })
win('a6', 60, 1190, 200, 110)
// B · the café (500–1160)
win('b0', 560, 830, 110, 130); win('pisces', 770, 820, 130, 140); win('b2', 1000, 830, 110, 130)
win('cafe', 540, 1160, 340, 150, 'shop')
// C · the middle building with the roof terrace (1160–1640)
;[1200, 1350, 1500].forEach((x, i) => win('c' + i, x, 960, 100, 110))
win('c3', 1190, 1170, 250, 130, 'shop')
// D · the flower building (1640–2160)
;[1690, 1840, 1990].forEach((x, i) => { win('d' + i, x, 700, 110, 120); win('d' + (i + 3), x, 860, 110, 120); win('d' + (i + 6), x, 1020, 110, 110) })
win('d9', 1680, 1180, 420, 120, 'shop')
const LAMPS = [440, 1060, 1700]
export const LANE = {
  W: LW, feet: FEET,
  bench: { x: 1190, seatY: 1402, seats: [1140, 1240] },
  lamps: LAMPS, cafeDoor: { x: 970, y: FEET }, stall: { x: 1890, y: 1300 },
  pisces: { x: 835, y: 905 }, roof: { x0: 1190, x1: 1610, y: 900 }, home: { x: 420, y: FEET },
  windows: WIN,
}
const DEFAULT_LIT = {
  dusk: ['a1', 'a3', 'pisces', 'cafe', 'c1', 'c3', 'd2', 'd4', 'd9'],
  night: ['a0', 'a2', 'a4', 'a6', 'b0', 'pisces', 'cafe', 'c0', 'c2', 'c3', 'd1', 'd3', 'd5', 'd7', 'd9'],
  late: ['a4', 'pisces', 'cafe', 'c2', 'd6'],
}
function tint(hex, time) { return time === 'dusk' ? mixHex(hex, '#f0a08c', 0.16) : time === 'late' ? mixHex(hex, '#070918', 0.32) : hex }

const LANE_CACHE = new Map()
function laneLayer(time) {
  if (LANE_CACHE.has(time)) return LANE_CACHE.get(time)
  const cv = document.createElement('canvas'); cv.width = LW; cv.height = 1920 - LY
  const c = cv.getContext('2d')
  c.translate(0, -LY)
  const T = h => tint(h, time)
  const R = (x, y, w, h, col) => { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  // ground: sidewalk, curb, cobbled road
  R(0, 1330, LW, 160, T('#4b4769'))
  for (let x = 0; x < LW; x += 90) R(x, 1330, 4, 160, T('#3c3858'))
  R(0, 1405, LW, 4, T('#3c3858'))
  R(0, 1486, LW, 18, T('#78739a')); R(0, 1504, LW, 6, T('#2b2646'))
  R(0, 1510, LW, 410, T('#211c38'))
  const rc = rng(5)
  for (let y = 1524; y < 1920; y += 34) for (let x = (y / 34 % 2) * 30; x < LW; x += 60) R(x + rc() * 6, y, 46, 22, T(rc() < 0.5 ? '#2a2445' : '#28223f'))
  // building helper
  const building = (x0, x1, top, wall, trim, { brick = null } = {}) => {
    R(x0, top, x1 - x0, 1330 - top, T(wall))
    if (brick) for (let y = top + 40; y < 1330; y += 20) { R(x0, y, x1 - x0, 3, T(brick)); for (let x = x0 + ((y / 20) % 2) * 22; x < x1; x += 44) R(x, y, 3, 20, T(brick)) }
    R(x0 - 8, top - 6, x1 - x0 + 16, 34, T(trim)); R(x0 - 4, top + 28, x1 - x0 + 8, 8, T(mixHex(trim, '#000000', 0.25)))
    R(x0, top - 6, 4, 1336 - top, T(mixHex(trim, '#000000', 0.2)))
  }
  building(0, 505, 620, '#6b3a4f', '#3b2238', { brick: '#5a2f43' })
  building(505, 1165, 740, '#8a6a86', '#4b3355')
  building(1165, 1645, 900, '#3f4f7a', '#2a3358')
  building(1645, LW, 640, '#5b4a7e', '#352a55', { brick: '#4e3f70' })
  // windows (unlit look; the glow is painted live)
  for (const w of WIN) {
    R(w.x - 8, w.y - 8, w.w + 16, w.h + 16, T('#241a3c'))
    R(w.x, w.y, w.w, w.h, T('#1b2142'))
    if (w.kind === 'pane') { R(w.x + w.w / 2 - 3, w.y, 6, w.h, T('#241a3c')); R(w.x, w.y + w.h * 0.45, w.w, 6, T('#241a3c')); R(w.x - 12, w.y + w.h + 6, w.w + 24, 10, T('#2e2448')) }
    else { R(w.x, w.y + w.h - 14, w.w, 14, T('#2e2448')) }
  }
  // Pisces' flower box
  R(760, 966, 150, 20, T('#7a4a3a'));[770, 800, 830, 860, 885].forEach((x, i) => { R(x, 950, 10, 16, T('#3f8a5a')); R(x - 4, 942, 18, 10, T(['#ff8fb1', '#ffd36e', '#c9a6ff', '#ff8fb1', '#7fe0ff'][i])) })
  // home-row door + stoop
  R(380, 1170, 90, 160, T('#2a1830')); R(388, 1178, 74, 152, T('#4a2a48')); R(450, 1250, 6, 6, T('#f2c75c')); R(370, 1320, 110, 12, T('#6a6488'))
  // café: door, awning, hanging sign (a cup, no name)
  R(915, 1150, 110, 180, T('#2a1830')); R(925, 1160, 90, 170, T('#5a3040')); R(940, 1176, 60, 70, T('#1b2142'))
  for (let i = 0; i < 12; i++) {
    const x = 530 + i * 50
    R(x, 1078, 50, 70, T(i % 2 ? '#f3e6d0' : '#d8455f'))
    R(x + 6, 1148, 38, 8, T(i % 2 ? '#f3e6d0' : '#d8455f')); R(x + 14, 1156, 22, 6, T(i % 2 ? '#f3e6d0' : '#d8455f'))
  }
  R(526, 1070, 608, 10, T('#3b2238'))
  R(1130, 990, 40, 6, T('#1b1530')); R(1136, 996, 4, 16, T('#1b1530')); R(1160, 996, 4, 16, T('#1b1530'))
  R(1110, 1012, 80, 66, T('#1b1530')); R(1116, 1018, 68, 54, T('#e9d7b5'))
  R(1132, 1032, 30, 26, T('#7a4a3a')); R(1162, 1038, 8, 12, T('#7a4a3a')); R(1136, 1036, 22, 8, T('#4a2a1a')); R(1138, 1024, 4, 6, T('#ffffff')); R(1150, 1022, 4, 6, T('#ffffff'))
  // middle: shop door + roof terrace railing + plant
  R(1475, 1160, 100, 170, T('#1e2444')); R(1485, 1170, 80, 160, T('#2f3a66')); R(1550, 1245, 6, 6, T('#f2c75c'))
  for (let x = 1180; x <= 1620; x += 24) R(x, 858, 6, 42, T('#1b1530'))
  R(1176, 856, 452, 8, T('#1b1530'))
  R(1190, 760, 8, 140, T('#1b1530')); R(1604, 760, 8, 140, T('#1b1530'))
  R(1300, 870, 40, 30, T('#7a4a3a')); R(1296, 836, 48, 36, T('#3f8a5a')); R(1306, 826, 28, 14, T('#4fae72'))
  // flower stall (canopy, cart, buckets)
  R(1716, 1150, 8, 180, T('#1b1530')); R(2056, 1150, 8, 180, T('#1b1530'))
  for (let i = 0; i < 7; i++) { const x = 1706 + i * 50; R(x, 1130, 50, 40, T(i % 2 ? '#f3e6d0' : '#4fae8a')); R(x + 10, 1170, 30, 8, T(i % 2 ? '#f3e6d0' : '#4fae8a')) }
  R(1730, 1300, 330, 100, T('#7a4a3a')); R(1730, 1300, 330, 10, T('#9a6a48')); for (let x = 1750; x < 2050; x += 40) R(x, 1316, 4, 80, T('#5e3828'))
  R(1760, 1396, 40, 40, T('#1b1530')); R(1990, 1396, 40, 40, T('#1b1530')); R(1770, 1406, 20, 20, T('#5e5a7a')); R(2000, 1406, 20, 20, T('#5e5a7a'))
  const fl = rng(9), FC = ['#ff8fb1', '#ffd36e', '#c9a6ff', '#ff6b8a', '#7fe0ff', '#fff1c8']
  for (let b = 0; b < 5; b++) {
    const bx = 1750 + b * 62
    R(bx, 1250, 50, 50, T('#6a7aa0')); R(bx, 1250, 50, 6, T('#8a9ac0'))
    for (let k = 0; k < 7; k++) { const fx = bx + 4 + fl() * 40, fy = 1200 + fl() * 46; R(fx + 4, fy + 10, 4, 1250 - fy - 10, T('#3f8a5a')); R(fx, fy, 12, 12, T(FC[(b + k) % FC.length])); R(fx + 4, fy + 4, 4, 4, T('#fff1c8')) }
  }
  // lamp posts (iron; the light is live)
  for (const lx of LAMPS) {
    R(lx - 14, 1460, 28, 16, T('#1b1530')); R(lx - 6, 1040, 12, 424, T('#1b1530')); R(lx - 10, 1100, 20, 8, T('#1b1530'))
    R(lx - 26, 1000, 52, 10, T('#1b1530')); R(lx - 22, 1010, 44, 44, T('#1b1530')); R(lx - 16, 1016, 32, 32, T('#3a3550')); R(lx - 18, 1054, 36, 8, T('#1b1530')); R(lx - 6, 988, 12, 12, T('#1b1530'))
  }
  // the bench under the middle lamp
  const B = LANE.bench
  R(B.x - 110, 1338, 220, 12, T('#8a5a3a')); R(B.x - 110, 1356, 220, 12, T('#8a5a3a'))
  R(B.x - 116, 1384, 232, 16, T('#9a6a48')); R(B.x - 116, 1398, 232, 6, T('#5e3828'))
  R(B.x - 104, 1330, 10, 120, T('#1b1530')); R(B.x + 94, 1330, 10, 120, T('#1b1530'))
  LANE_CACHE.set(time, cv)
  return cv
}

function lampK(t, i, lampsAt) {
  if (lampsAt == null) return 1
  const dt = t - lampsAt - i * 0.32
  if (dt < 0) return 0
  if (dt > 0.7) return 1
  return [1, 0, 0.7, 0, 1, 0.3, 1, 1][Math.floor(dt / 0.09)] ?? 1
}
function glow(ctx, x, y, r, col, a) {
  if (a <= 0.01) return
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r)
}
export function drawLane(ctx, t, opts = {}, fg = null) {
  const { time = 'night', pan = 0, zoom = 1, focus = [540, 1300], lit, lampsAt, moon = {}, dim = 0, shake = 0 } = opts
  const lights = opts.lights ?? (time === 'dusk' ? 0 : 1)
  const lampsOff = time === 'dusk' && lampsAt == null
  // sky + moon (screen space, a little parallax)
  drawSky(ctx, t, { ...SKY_H, dim: time === 'late' ? 0.45 : SKY_H.dim, dx: -pan * 0.04, moon: null })
  if (time === 'dusk') { const g = ctx.createLinearGradient(0, 200, 0, 1000); g.addColorStop(0, 'rgba(120,60,140,0)'); g.addColorStop(1, 'rgba(255,150,110,0.5)'); ctx.fillStyle = g; ctx.fillRect(0, 200, 1080, 800) }
  if (time === 'late') { ctx.fillStyle = 'rgba(4,6,22,0.3)'; ctx.fillRect(0, 0, 1080, 1100) }
  const M = { x: 800, y: 360, r: 120, ...moon }
  drawMoon(ctx, M.x - pan * 0.06, M.y, M.r, 0.5, { alpha: time === 'dusk' ? 0.8 : 1, glow: 3, earthshine: 1, darkAlpha: 0.6 })
  const [fx, fy] = focus
  ctx.save()
  // world → screen: sx = (wx − pan − fx)·z + fx, sy = (wy − fy)·z + fy
  ctx.transform(zoom, 0, 0, zoom, fx - (pan + fx) * zoom, fy - fy * zoom + shake)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(laneLayer(time), 0, LY)
  ctx.imageSmoothingEnabled = true
  // windows
  const set = lit == null ? DEFAULT_LIT[time] : lit
  const litOf = id => Array.isArray(set) ? (set.includes(id) ? 1 : 0) : clamp(set[id] ?? 0)
  for (const w of WIN) {
    const k = litOf(w.id)
    if (k <= 0.01) continue
    const fl = 0.94 + 0.06 * noise1(t * 2 + w.x * 0.01, 4)
    ctx.globalAlpha = k
    ctx.fillStyle = w.id === 'cafe' ? '#ffcf7a' : w.kind === 'shop' ? '#ffd98a' : '#ffe2a0'
    ctx.fillRect(w.x, w.y, w.w, w.h)
    ctx.fillStyle = 'rgba(255,248,220,0.6)'; ctx.fillRect(w.x + 6, w.y + 6, w.w * 0.3, w.h * 0.3)
    if (w.kind === 'pane') { ctx.fillStyle = '#5a3a3a'; ctx.fillRect(w.x + w.w / 2 - 3, w.y, 6, w.h); ctx.fillRect(w.x, w.y + w.h * 0.45, w.w, 6) }
    if (w.id === 'cafe') {           // inside the café: pendant dots + a tiny counter silhouette
      ctx.fillStyle = '#c0703a'; ctx.fillRect(w.x, w.y + w.h - 40, w.w, 40)
      for (const px of [80, 250]) { ctx.fillStyle = '#fff6d8'; ctx.fillRect(w.x + px, w.y + 10, 16, 14) }
      ctx.fillStyle = '#ffcf7a'; ctx.fillRect(940, 1176, 60, 70)
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'lighter'
    glow(ctx, w.x + w.w / 2, w.y + w.h / 2, Math.max(w.w, w.h) * 0.95, '#ffb050', 0.22 * k * fl)
    ctx.globalCompositeOperation = 'source-over'
  }
  // lamps: lantern glass, glow, the pool of light on the pavement
  LAMPS.forEach((lx, i) => {
    const k = lampsOff ? 0 : lampK(t, i, lampsAt)
    const fl = k * (0.93 + 0.07 * noise1(t * 6 + i * 3, 7))
    ctx.fillStyle = k > 0.5 ? '#fff1c0' : '#3a3550'; ctx.fillRect(lx - 16, 1016, 32, 32)
    if (k > 0.5) { ctx.fillStyle = '#ffd36e'; ctx.fillRect(lx - 16, 1036, 32, 12) }
    if (fl <= 0.01) return
    ctx.globalCompositeOperation = 'lighter'
    glow(ctx, lx, 1032, 190, '#ffc060', 0.32 * fl)
    glow(ctx, lx, 1032, 60, '#fff0c0', 0.4 * fl)
    ctx.save(); ctx.translate(lx, 1460); ctx.scale(1, 0.22); glow(ctx, 0, 0, 240, '#ffc060', 0.3 * fl); ctx.restore()
    const cone = ctx.createLinearGradient(0, 1050, 0, 1460); cone.addColorStop(0, `rgba(255,200,110,${0.16 * fl})`); cone.addColorStop(1, 'rgba(255,200,110,0)')
    ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(lx - 20, 1050); ctx.lineTo(lx + 20, 1050); ctx.lineTo(lx + 170, 1460); ctx.lineTo(lx - 170, 1460); ctx.closePath(); ctx.fill()
    ctx.globalCompositeOperation = 'source-over'
  })
  // rooftop string lights
  if (lights > 0.01) {
    const x0 = 1194, x1 = 1608, y0 = 772, n = 15
    ctx.strokeStyle = '#1b1530'; ctx.lineWidth = 3; ctx.beginPath()
    for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(lerp(x0, x1, u), y0 + Math.sin(Math.PI * u) * 46) }
    ctx.stroke()
    const BC = ['#ffd36e', '#ff8fb1', '#7fe0ff', '#7dffb0', '#fff1c8']
    for (let i = 1; i < n; i++) {
      const u = i / n, bx = lerp(x0, x1, u), by = y0 + Math.sin(Math.PI * u) * 46 + 8
      const tw = lights * (0.75 + 0.25 * Math.sin(t * 3 + i * 1.7))
      ctx.globalAlpha = lights; ctx.fillStyle = BC[i % BC.length]; ctx.fillRect(Math.round(bx - 5), Math.round(by - 4), 10, 12); ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'lighter'; glow(ctx, bx, by + 2, 34, BC[i % BC.length], 0.35 * tw); ctx.globalCompositeOperation = 'source-over'
    }
  }
  if (fg) fg(ctx)
  ctx.restore()
  if (dim > 0) { ctx.fillStyle = `rgba(5,6,20,${clamp(dim)})`; ctx.fillRect(0, 0, 1080, 1920) }
  return { toScreen: (wx, wy) => [(wx - pan - fx) * zoom + fx, (wy - fy) * zoom + fy + shake] }
}

// ═══════════════════════════════════════ THE CAFÉ (interior) ═══════════════════════════════════════
export const CAFE = { table: { x: 540, y: 1330 }, seats: [{ x: 330, y: 1400 }, { x: 750, y: 1400 }], counter: { x: 720, y: 950 }, window: { x: 60, y: 360, w: 440, h: 520 } }
function chair(ctx, x, y, s, flip, col = '#4a2a3a') {
  ctx.save(); ctx.translate(x, y); if (flip) ctx.scale(1, -1)
  const R = (a, b, w, h) => ctx.fillRect(Math.round(a * s), Math.round(b * s), Math.round(w * s), Math.round(h * s))
  ctx.fillStyle = col; R(-22, -110, 6, 110); R(16, -60, 6, 60); R(-22, -64, 44, 8); R(-22, -110, 30, 6); R(-22, -90, 26, 5)
  ctx.restore()
}
export function drawCafe(ctx, t, { lights = 1, chairsUp = 0, view = 'night', behind = null } = {}) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  const dk = view === 'late' ? 0.18 : 0
  const D = h => mixHex(h, '#140c28', dk + (1 - lights) * 0.35)
  // wall: warm stripes + wainscot
  R(0, 0, 1080, 1250, D('#a0584a'))
  for (let x = 0; x < 1080; x += 60) R(x, 0, 24, 1050, D('#b06a52'))
  R(0, 1040, 1080, 16, D('#5a2a2a')); R(0, 1056, 1080, 194, D('#7a4030'))
  for (let x = 20; x < 1080; x += 120) R(x, 1076, 96, 150, D('#6a3628'))
  // the window onto the lane
  const W0 = CAFE.window
  R(W0.x - 16, W0.y - 16, W0.w + 32, W0.h + 32, D('#3a1e1e'))
  const sg = ctx.createLinearGradient(0, W0.y, 0, W0.y + W0.h); sg.addColorStop(0, '#0d1238'); sg.addColorStop(1, view === 'late' ? '#141a44' : '#2a2a6a')
  ctx.fillStyle = sg; ctx.fillRect(W0.x, W0.y, W0.w, W0.h)
  const sr = rng(3); for (let i = 0; i < 26; i++) R(W0.x + sr() * W0.w, W0.y + sr() * W0.h * 0.6, 4, 4, '#ffffff')
  ctx.save(); ctx.beginPath(); ctx.rect(W0.x, W0.y, W0.w, W0.h); ctx.clip()
  drawMoon(ctx, W0.x + 300, W0.y + 130, 62, 0.5, { alpha: 1, glow: 2, earthshine: 1, darkAlpha: 0.6 })
  R(W0.x, W0.y + 380, 140, 140, '#2a1e40'); R(W0.x + 150, W0.y + 330, 120, 190, '#30264c'); R(W0.x + 290, W0.y + 400, 150, 120, '#2a1e40')
  ;[[30, 410], [70, 450], [190, 360], [220, 420], [330, 430]].forEach(([a, b], i) => R(W0.x + a, W0.y + b, 22, 26, (i + Math.floor(t * 0.5)) % 4 ? '#ffd98a' : '#3a3050'))
  ctx.restore()
  R(W0.x + W0.w / 2 - 6, W0.y, 12, W0.h, D('#3a1e1e')); R(W0.x, W0.y + 250, W0.w, 12, D('#3a1e1e'))
  R(W0.x - 30, W0.y + W0.h + 10, W0.w + 60, 18, D('#5a2a2a'))
  // chalk menu: doodles only
  R(620, 330, 420, 330, D('#3a2a20')); R(634, 344, 392, 302, D('#1e2a26'))
  ctx.globalAlpha = 0.75
  for (let i = 0; i < 6; i++) { R(670, 400 + i * 38, 120 + ((i * 53) % 90), 8, '#e8e4d0'); R(900, 400 + i * 38, 70, 8, '#e8e4d0') }
  R(700, 600, 30, 24, '#ffcf6e'); R(730, 606, 8, 12, '#ffcf6e'); R(800, 596, 40, 26, '#ff8fb1'); R(880, 600, 36, 22, '#ffcf6e')
  ctx.globalAlpha = 1
  // floor
  R(0, 1250, 1080, 670, D('#5a3a3a'))
  for (let y = 1250; y < 1920; y += 70) for (let x = ((y - 1250) / 70 % 2) * 70; x < 1080; x += 140) R(x, y, 70, 70, D('#6e4a44'))
  // whoever works the counter (Taurus) stands behind it
  if (behind) behind(ctx)
  // counter + pastry case (right)
  R(600, 900, 480, 360, D('#6a3a24')); R(590, 890, 500, 20, D('#9a6a48'))
  for (let x = 620; x < 1080; x += 80) R(x, 930, 60, 300, D('#5a2e1c'))
  R(830, 740, 240, 152, D('#c8e4f0')); R(836, 746, 228, 140, D('#e8f4f8')); R(830, 814, 240, 6, D('#a0c0d0'))
  ;[['croissant', 885, 786], ['bun', 1010, 786], ['cake', 885, 856], ['loaf', 1010, 856]].forEach(([k, x, y]) => drawPastry(ctx, x, y, 4.2, k))
  // back tables (left/right of the window) with chairs that flip up at closing time
  for (const [tx, s] of [[150, 0.8], [560, 0.8]]) {
    const ty = 1180
    const up = ease.inOutCubic(clamp(chairsUp * 1.4 - (tx > 300 ? 0.4 : 0)))
    for (const d of [-1, 1]) {
      const cx = lerp(tx + d * 70, tx + d * 34, up), cy = lerp(ty + 70, ty - 16, up)
      chair(ctx, cx, cy, s * (d < 0 ? -1 : 1) * 1, up > 0.5, D('#3e2030'))
    }
    R(tx - 70, ty, 140, 12, D('#2e1a24')); R(tx - 6, ty + 12, 12, 58, D('#2e1a24')); R(tx - 30, ty + 66, 60, 8, D('#2e1a24'))
  }
  // pendant lamps
  for (const lx of [300, 800]) {
    R(lx - 2, 0, 4, 250, '#1b1236'); R(lx - 46, 250, 92, 40, D('#2a4a3a')); R(lx - 54, 286, 108, 8, D('#1e3a2a'))
    if (lights > 0.01) {
      R(lx - 18, 294, 36, 10, '#fff1c0')
      ctx.globalCompositeOperation = 'lighter'; glow(ctx, lx, 300, 320, '#ffb050', 0.26 * lights); glow(ctx, lx, 300, 80, '#fff0c0', 0.35 * lights); ctx.globalCompositeOperation = 'source-over'
    }
  }
  if (lights < 1) { ctx.fillStyle = `rgba(6,4,20,${0.35 * (1 - lights)})`; ctx.fillRect(0, 0, 1080, 1920) }
}
export function drawCafeTable(ctx, t, { cups = 2, pastry = 'croissant', alpha = 1 } = {}) {
  const T0 = CAFE.table, R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  ctx.save(); ctx.globalAlpha *= alpha
  R(T0.x - 170, T0.y, 340, 22, '#2e1a24'); R(T0.x - 160, T0.y + 4, 320, 10, '#4a2a34')
  R(T0.x - 10, T0.y + 22, 20, 150, '#2e1a24'); R(T0.x - 60, T0.y + 166, 120, 12, '#2e1a24')
  for (let i = 0; i < cups; i++) {
    const cx = T0.x + (i ? 70 : -90)
    R(cx - 2, T0.y - 4, 44, 6, '#e8dccb'); R(cx + 4, T0.y - 34, 32, 30, '#fff8ec'); R(cx + 36, T0.y - 28, 8, 16, '#fff8ec'); R(cx + 8, T0.y - 30, 24, 6, '#7a4a3a')
    ctx.globalAlpha = 0.4 * alpha; for (let k = 0; k < 3; k++) R(cx + 12 + k * 6 + Math.sin(t * 3 + k) * 3, T0.y - 52 - k * 10 - ((t * 20) % 12), 4, 8, '#ffffff'); ctx.globalAlpha = alpha
  }
  if (pastry) { R(T0.x - 34, T0.y - 4, 68, 6, '#e8dccb'); drawPastry(ctx, T0.x, T0.y - 22, 4, pastry) }
  ctx.restore()
}

// ═══════════════════════════════════════ THE APARTMENT ═══════════════════════════════════════
export const APT = { couch: { x: 540, seatY: 1400, seats: [400, 690] }, wall: { x: 300, y: 560 }, window: { x: 580, y: 330, w: 400, h: 520 }, lamp: { x: 120, y: 1200 }, plant: { x: 990, y: 1290 } }
export function drawApartment(ctx, t, { lamp = 1, time = 'night' } = {}) {
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
  const D = h => mixHex(h, '#100a24', (1 - lamp) * 0.3 + (time === 'late' ? 0.12 : 0))
  R(0, 0, 1080, 1260, D('#5a4a7a'))
  for (let y = 40; y < 1200; y += 80) for (let x = ((y / 80) % 2) * 60; x < 1080; x += 120) R(x, y, 8, 8, D('#6a5a8a'))
  R(0, 1180, 1080, 18, D('#3a2e54'))
  // window
  const W0 = APT.window
  R(W0.x - 18, W0.y - 18, W0.w + 36, W0.h + 36, D('#2a2040'))
  const sg = ctx.createLinearGradient(0, W0.y, 0, W0.y + W0.h)
  sg.addColorStop(0, time === 'dusk' ? '#4a2a6a' : '#0d1238'); sg.addColorStop(1, time === 'dusk' ? '#ff9a7a' : '#2a2a6a')
  ctx.fillStyle = sg; ctx.fillRect(W0.x, W0.y, W0.w, W0.h)
  const sr = rng(8); for (let i = 0; i < 20; i++) R(W0.x + sr() * W0.w, W0.y + sr() * W0.h * 0.55, 4, 4, '#ffffff')
  ctx.save(); ctx.beginPath(); ctx.rect(W0.x, W0.y, W0.w, W0.h); ctx.clip()
  drawMoon(ctx, W0.x + 270, W0.y + 140, 64, 0.5, { alpha: 1, glow: 2, earthshine: 1, darkAlpha: 0.6 })
  R(W0.x, W0.y + 400, 120, 120, '#2a1e40'); R(W0.x + 130, W0.y + 360, 110, 160, '#30264c'); R(W0.x + 250, W0.y + 420, 150, 100, '#2a1e40')
  ;[[30, 430], [160, 390], [190, 450], [290, 450]].forEach(([a, b]) => R(W0.x + a, W0.y + b, 20, 24, '#ffd98a'))
  ctx.restore()
  R(W0.x + W0.w / 2 - 6, W0.y, 12, W0.h, D('#2a2040')); R(W0.x - 30, W0.y + W0.h + 14, W0.w + 60, 18, D('#3a2e54'))
  // curtains
  for (const [cx, d] of [[W0.x - 50, 1], [W0.x + W0.w + 10, -1]]) { R(cx, W0.y - 50, 60, W0.h + 120, D('#c05a6a')); for (let k = 0; k < 3; k++) R(cx + 10 + k * 16, W0.y - 50, 6, W0.h + 120, D('#a04a5a')) }
  R(W0.x - 70, W0.y - 60, W0.w + 140, 14, D('#2a2040'))
  // framed doodle (a heart-ish star)
  R(140, 420, 200, 160, D('#2a2040')); R(152, 432, 176, 136, D('#efe6d6'))
  drawPixelStar(ctx, 216, 476, 48, 1, '#f2c75c')
  // floor + rug
  R(0, 1198, 1080, 722, D('#4a3040'))
  for (let y = 1198; y < 1920; y += 48) R(0, y, 1080, 4, D('#3e2636'))
  R(160, 1500, 760, 160, D('#c08a4a')); R(176, 1512, 728, 136, D('#d8a45c')); for (let x = 200; x < 900; x += 60) R(x, 1560, 30, 30, D('#c08a4a'))
  // couch
  const C = APT.couch
  R(C.x - 360, 1150, 720, 170, D('#2f8a8a')); R(C.x - 340, 1162, 680, 30, D('#3fa4a2'))
  R(C.x - 380, 1250, 760, 120, D('#287a7a')); R(C.x - 360, 1262, 720, 26, D('#3fa4a2'))
  R(C.x - 420, 1210, 70, 180, D('#226a6a')); R(C.x + 350, 1210, 70, 180, D('#226a6a'))
  R(C.x - 380, 1370, 20, 40, D('#2a1830')); R(C.x + 360, 1370, 20, 40, D('#2a1830'))
  R(C.x - 300, 1190, 90, 70, D('#f2c75c')); R(C.x + 220, 1190, 90, 70, D('#ff8fb1'))
  // floor lamp (left)
  const L = APT.lamp
  R(L.x - 4, 760, 8, 440, '#1b1236'); R(L.x - 40, 1196, 80, 10, '#1b1236')
  R(L.x - 60, 690, 120, 80, D('#f3e6d0')); R(L.x - 50, 700, 100, 60, lamp > 0.5 ? '#fff1c8' : D('#d8ccb8'))
  if (lamp > 0.01) { ctx.globalCompositeOperation = 'lighter'; glow(ctx, L.x, 740, 360, '#ffb050', 0.28 * lamp); glow(ctx, L.x, 740, 100, '#fff0c0', 0.3 * lamp); ctx.globalCompositeOperation = 'source-over' }
  // plant (right)
  const P = APT.plant
  R(P.x - 40, P.y - 70, 80, 90, D('#c0703a')); R(P.x - 46, P.y - 76, 92, 14, D('#d8844a'))
  const lv = [[-60, -190], [-30, -250], [10, -280], [40, -220], [70, -160], [-80, -130], [20, -170]]
  lv.forEach(([a, b], i) => { const sw = Math.sin(t * 1.3 + i) * 3; R(P.x + a + sw, P.y + b, 46, 26, D(i % 2 ? '#3f8a5a' : '#4fae72')); R(P.x + a / 3, P.y + b / 2 - 20, 6, -b / 2 - 40, D('#2e6a44')) })
  if (lamp < 1) { ctx.fillStyle = `rgba(6,4,20,${0.4 * (1 - lamp)})`; ctx.fillRect(0, 0, 1080, 1920) }
}

// ═══════════════════════════════════════ PROPS ═══════════════════════════════════════
const PASTRY = {
  croissant: ['....KKKK......', '..KKOOOOKK....', '.KOOYOOYOOK...', 'KOYOOYOOYOOK..', 'KOOYOOYOOYOK..', '.KOOOOOOOOK...', '..KKKKKKKK....'],
  bun: ['...KKKKKK...', '.KKOOOOOOKK.', 'KOOOWOOWOOOK', 'KOOOOOOOOOOK', 'KOOOOOOOOOOK', '.KKKKKKKKKK.'],
  cake: ['.KKKKKKKKK..', 'KPPPPPPPPPK.', 'KWWWWWWWWWK.', 'KYYYYYYYYYK.', 'KWWWWWWWWWK.', 'KYYYYYYYYYK.', '.KKKKKKKKK..'],
  loaf: ['..KKKKKKKK..', '.KOOOOOOOOK.', 'KOOYOOYOOYOK', 'KOOOOOOOOOOK', 'KOOOOOOOOOOK', '.KKKKKKKKKK.'],
}
const PAST_PAL = { K: '#3a1e14', O: '#e0963a', Y: '#ffd27a', W: '#fff4e0', P: '#ff8fb1' }
export function drawPastry(ctx, x, y, cell, kind = 'croissant') {
  const rows = PASTRY[kind] || PASTRY.croissant, w = rows[0].length * cell, h = rows.length * cell
  ctx.save(); ctx.translate(Math.round(x - w / 2), Math.round(y - h / 2)); ctx.scale(cell, cell); paintCells(ctx, rows, PAST_PAL, 0, 0); ctx.restore()
}
export const ICONS = {
  calendar: ['..K....K..', 'KKRKKKKRKK', 'KRRRRRRRRK', 'KRRRRRRRRK', 'KWWWWWWWWK', 'KWKWKWKWWK', 'KWWWWWWWWK', 'KWKWKWRRWK', 'KWWWWWRRWK', 'KKKKKKKKKK'],
  door: ['KKKKKKK...', 'KBBBBBKG..', 'KBBBBBKGG.', 'KBBBBBKGGG', 'KBBBBGKGGG', 'KBBBBBKGGG', 'KBBBBBKGGG', 'KBBBBBKGG.', 'KBBBBBKG..', 'KKKKKKK...'],
  question: ['.KKKKKKKK.', 'KWWWWWWWWK', 'KWWKKKKWWK', 'KWWWWWKWWK', 'KWWWWKKWWK', 'KWWWKKWWWK', 'KWWWWWWWWK', 'KWWWKKWWWK', '.KKKKKKKK.', '..KWK.....', '..KK......'],
  clock: ['..KKKKKK..', '.KWWWWWWK.', 'KWWWKWWWWK', 'KWWWKWWWWK', 'KWWWKWWWWK', 'KWWWKKKWWK', 'KWWWWWWWWK', 'KWWWWWWWWK', '.KWWWWWWK.', '..KKKKKK..'],
  heart: ['.KKK.KKK.', 'KPPPKPPPK', 'KPWPPPPPK', 'KPPPPPPPK', '.KPPPPPK.', '..KPPPK..', '...KPK...', '....K....'],
  chat: ['.KKKKKKKK.', 'KWWWWWWWWK', 'KWWWWWWWWK', 'KWBBWBBWBK', 'KWWWWWWWWK', '.KKKKWKKK.', '....KWK...', '....KK....'],
  balloon: ['..KKKK..', '.KRRRRK.', 'KRRWRRRK', 'KRWRRRRK', 'KRRRRRRK', '.KRRRRK.', '..KRRK..', '...KK...', '....K...', '...K....', '....K...'],
  star: ['....K....', '...KGK...', 'KKKKGKKKK', 'KGGGGGGGK', '.KGGGGGK.', '..KGGGK..', '.KGGKGGK.', 'KGK...KGK', 'KK.....KK'],
  moon: ['..KKKK...', '.KGGGK...', 'KGGGK....', 'KGGK.....', 'KGGK.....', 'KGGGK....', '.KGGGKKK.', '..KKKKKK.'],
  cup: ['..K.K.K...', '...K.K....', 'KKKKKKKK..', 'KWWWWWWKKK', 'KWOOOOWK.K', 'KWOOOOWK.K', 'KWOOOOWKKK', '.KWWWWK...', '..KKKK....'],
  flower: ['..KKK...', '.KPPPK..', 'KPPGPPK.', '.KPPPK..', '..KMK...', '..KMK.K.', '..KMKKMK', '..KMMMK.', '...KMK..'],
  check: ['........KK', '.......KMK', '......KMK.', 'KK...KMK..', 'KMK.KMK...', '.KMKMK....', '..KMK.....', '...K......'],
}
const ICON_PAL = { K: INK, W: '#fff8ec', G: GOLD, R: '#e8566e', P: '#ff8fb1', B: '#5a7be0', O: '#a8683a', M: '#3fb88a' }
export function drawIcon(ctx, name, x, y, cell) {
  const rows = ICONS[name] || ICONS.star
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(cell, cell); paintCells(ctx, rows, ICON_PAL, 0, 0); ctx.restore()
}
export function sparkles(ctx, t, x, y, t0, n = 10, R = 150, seed = 1, cols = [ML_GOLD, BONE, PINK, CYAN]) {
  const p = prog(t, t0, t0 + 0.8)
  if (p <= 0 || p >= 1) return
  const r = rng(seed * 31 + 7), e = ease.outCubic(p)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(p)
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + r() * 0.6) * e; drawPixelStar(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, 16 + r() * 16, i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
export function drawBubble(ctx, cx, cy, text, { size = 30, col = BONE, k = 1, alpha = 1, tail = 'down', ink = INK } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(Math.round(cx), Math.round(cy)); ctx.scale(k, k)
  ctx.font = `700 ${size}px ${INTER}`
  const w = ctx.measureText(text).width + size * 1.3, h = size * 1.9
  ctx.fillStyle = ink; ctx.fillRect(-w / 2 - 4, -h / 2, w + 8, h); ctx.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h)
  if (tail === 'down') { ctx.fillStyle = ink; ctx.fillRect(-14, h / 2 + 2, 16, 14); ctx.fillStyle = col; ctx.fillRect(-10, h / 2, 10, 10) }
  if (tail === 'left') { ctx.fillStyle = ink; ctx.fillRect(-w / 2 - 16, 0, 16, 16); ctx.fillStyle = col; ctx.fillRect(-w / 2 - 10, 4, 12, 8) }
  if (tail === 'right') { ctx.fillStyle = ink; ctx.fillRect(w / 2, 0, 16, 16); ctx.fillStyle = col; ctx.fillRect(w / 2 - 2, 4, 12, 8) }
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 2)
  ctx.restore()
}
function wrapLines(ctx, text, maxW) {
  const out = []; let cur = ''
  for (const w of text.split(' ')) { const n = cur ? cur + ' ' + w : w; if (ctx.measureText(n).width > maxW && cur) { out.push(cur); cur = w } else cur = n }
  if (cur) out.push(cur)
  return out
}
export function drawPhone(ctx, cx, cy, w, h, t, { title = '', msgs = [], typing = null, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  ctx.save(); ctx.globalAlpha *= alpha
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2)
  ctx.fillStyle = INK; ctx.fillRect(x0 - 10, y0 - 10, w + 20, h + 20)
  ctx.fillStyle = '#2a2050'; ctx.fillRect(x0, y0, w, h)
  ctx.fillStyle = '#120c2a'; ctx.fillRect(x0 + 16, y0 + 60, w - 32, h - 100)
  ctx.fillStyle = '#1b1236'; ctx.fillRect(x0 + w / 2 - 40, y0 + 20, 80, 14)
  ctx.fillStyle = BONE; ctx.font = `700 26px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(title, cx, y0 + 88)
  ctx.save(); ctx.beginPath(); ctx.rect(x0 + 16, y0 + 112, w - 32, h - 152); ctx.clip()
  ctx.font = `600 28px ${INTER}`
  const maxW = w - 140, lh = 36
  const shown = msgs.filter(m => t >= m.at)
  const typingOn = typing && t >= typing[0] && t < typing[1]
  let y = y0 + h - 56 - (typingOn ? 70 : 0)
  for (let i = shown.length - 1; i >= 0 && y > y0 + 100; i--) {
    const m = shown[i], ls = wrapLines(ctx, m.text, maxW), bh = ls.length * lh + 26
    const bw = Math.min(maxW, Math.max(...ls.map(s => ctx.measureText(s).width))) + 36
    const k = easeOutBack(prog(t, m.at, m.at + 0.25), 2)
    const bx = m.side === 'R' ? x0 + w - 32 - bw : x0 + 32
    y -= bh
    ctx.save(); ctx.translate(bx + (m.side === 'R' ? bw : 0), y + bh); ctx.scale(k, k); ctx.translate(-(bx + (m.side === 'R' ? bw : 0)), -(y + bh))
    ctx.fillStyle = m.side === 'R' ? ML_GOLD : '#e9e2f5'; ctx.fillRect(bx, y, bw, bh)
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'top'
    ls.forEach((s, j) => ctx.fillText(s, bx + 18, y + 14 + j * lh))
    ctx.restore()
    y -= 16
  }
  if (typingOn) { const by = y0 + h - 120; ctx.fillStyle = '#e9e2f5'; ctx.fillRect(x0 + 32, by, 110, 50); for (let i = 0; i < 3; i++) { ctx.fillStyle = INK; ctx.globalAlpha = alpha * (0.4 + 0.6 * (Math.floor(t * 6) % 3 === i ? 1 : 0)); ctx.fillRect(x0 + 52 + i * 26, by + 20, 12, 12) } ctx.globalAlpha = alpha }
  ctx.restore()
  ctx.restore()
}
export function drawMysteryCard(ctx, cx, cy, w, t, { sign = 'capricorn', rot = 0, alpha = 1, glow: gl = 0, scaleX = 1, back = false } = {}) {
  if (alpha <= 0 || w <= 0) return
  const S = signStar(sign), h = w * 1.5, u = w / 300
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(cx, cy); ctx.rotate(rot); ctx.scale(scaleX, 1)
  ctx.save(); ctx.shadowColor = rgba(S.color, 0.5 + 0.4 * gl); ctx.shadowBlur = (30 + 50 * gl) * u
  ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 24 * u); ctx.fillStyle = '#150c2c'; ctx.fill(); ctx.restore()
  ctx.lineWidth = 6 * u; ctx.strokeStyle = back ? GOLD : mixHex(S.color, '#ffffff', 0.25); ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 24 * u); ctx.stroke()
  if (back) {
    ctx.strokeStyle = rgba(GOLD, 0.7); ctx.lineWidth = 3 * u
    for (let i = 0; i < 7; i++) { const a = i / 6 * TAU; ctx.beginPath(); ctx.arc(i ? Math.cos(a) * 40 * u : 0, i ? Math.sin(a) * 40 * u : 0, 40 * u, 0, TAU); ctx.stroke() }
    ctx.fillStyle = BONE; ctx.font = `italic 500 ${Math.round(44 * u)}px ${SERIF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('Align', 0, h * 0.34)
    ctx.restore(); return
  }
  ctx.fillStyle = BONE; ctx.font = `italic 500 ${Math.round(34 * u)}px ${SERIF}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'
  ctx.fillText('Mystery card', -w / 2 + 22 * u, -h / 2 + 52 * u)
  ctx.save(); ctx.shadowColor = S.color; ctx.shadowBlur = 24 * u
  ctx.beginPath(); ctx.arc(w / 2 - 40 * u, -h / 2 + 40 * u, 24 * u, 0, TAU); ctx.fillStyle = S.color; ctx.fill(); ctx.restore()
  ctx.font = `700 ${Math.round(30 * u)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#1a0e30'
  ctx.fillText(S.glyph + '︎', w / 2 - 40 * u, -h / 2 + 42 * u)
  const ax = -w / 2 + 18 * u, ay = -h / 2 + 80 * u, aw = w - 36 * u, ah = 200 * u
  ctx.save(); ctx.beginPath(); ctx.roundRect(ax, ay, aw, ah, 16 * u); ctx.clip()
  const g = ctx.createRadialGradient(0, ay + ah * 0.55, 10 * u, 0, ay + ah * 0.55, aw * 0.75)
  g.addColorStop(0, mixHex(S.color, '#ffffff', 0.5)); g.addColorStop(0.5, S.color); g.addColorStop(1, mixHex(S.color, '#10082a', 0.6))
  ctx.fillStyle = g; ctx.fillRect(ax, ay, aw, ah)
  ctx.fillStyle = 'rgba(26,14,48,0.4)'; ctx.beginPath(); ctx.arc(0, ay + ah * 0.6, 50 * u, 0, TAU); ctx.fill()
  ctx.restore()
  ctx.fillStyle = BONE; ctx.font = `700 ${Math.round(20 * u)}px ${MONO}`; ctx.textAlign = 'center'; ctx.fillText('NO PHOTO YET', 0, ay + ah + 34 * u)
  ctx.fillStyle = rgba(BONE, 0.35)
  for (let i = 0; i < 3; i++) ctx.fillRect(-w / 2 + 30 * u, ay + ah + (66 + i * 30) * u, (w - 60 * u) * [1, 0.8, 0.55][i], 12 * u)
  ctx.restore()
}

// ═══════════════════════════════════════ DOM: bug, caption, title, previously, advise, next time ═══════════════════
const BUG_CSS = { fontFamily: INTER, fontWeight: '800', letterSpacing: '0.22em', color: ML_GOLD, fontVariantCaps: 'all-small-caps' }
export function showBug(root, ep, { at = 0 } = {}) {
  const b = el('div', { position: 'absolute', left: '56px', top: '56px', whiteSpace: 'nowrap', display: 'none', pointerEvents: 'none', lineHeight: '1',
    textShadow: '0 2px 10px rgba(6,4,18,0.9), 0 0 18px rgba(255,207,110,0.35)' }, root)
  el('span', { ...BUG_CSS, fontSize: '42px' }, b, 'Moonlight Lane')
  el('span', { fontFamily: INTER, fontWeight: '800', fontSize: '27px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }, b, ` · EP ${ep}`)
  return {
    root: b,
    update(t, alpha = 1) { const a = alpha * clamp((t - at) / 0.25); b.style.display = a > 0.01 ? 'block' : 'none'; b.style.opacity = String(a) },
  }
}
function kickerPill(parent, text, top) {
  const w = el('div', { position: 'absolute', left: 0, top: top + 'px', width: '1080px', textAlign: 'center', display: 'none', pointerEvents: 'none' }, parent)
  el('span', { display: 'inline-block', padding: '10px 26px 9px', font: `700 30px ${MONO}`, letterSpacing: '0.16em', color: ML_GOLD, background: 'rgba(11,18,54,0.88)', boxShadow: `0 0 0 3px ${ML_GOLD}, 0 0 0 7px ${INK}, 0 8px 24px rgba(6,4,18,0.7)` }, w, text)
  return w
}
export function buildCaption(root, { text, at, out, top = 170, kicker = null, size = 92, accentSize, accentColor = ML_GOLD, gap = 0.07, late = 0, lateAt = null }) {
  const kp = kicker ? kickerPill(root, kicker, top) : null
  const pt = popText(root, text, { top: top + (kicker ? 84 : 0), size, accentSize: accentSize || size * 1.4, accentColor, at: at + (kicker ? 0.15 : 0), gap, late, lateAt, wobble: true })
  return {
    update(t) {
      const o = out ? outK(t, out) : 1
      pt.update(t, o)
      if (kp) { const k = pop01(t, at, 0.3, 2) * o; kp.style.display = t >= at && k > 0.01 ? 'block' : 'none'; kp.style.opacity = String(clamp(k)); kp.style.transform = `scale(${(0.6 + 0.4 * k).toFixed(3)})` }
    },
  }
}
function wordTimes({ text, at, gap = 0.07, late = 0, lateAt = null, lateGap = 0.1 }) {
  const ws = String(text).trim().split(/\s+/).filter(w => w && w !== '|'), n = ws.length
  return ws.map((_, i) => { const big = late > 0 && i >= n - late; return { t: big ? lateAt + (i - (n - late)) * lateGap : at + i * gap, big } })
}
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
export const popCues = h => wordTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.024, i % 2 ? 0.15 : -0.15]])
export const captionCues = c => [...(c.kicker ? [['pop', r3(c.at), 880, 0.035, -0.2], ['tick', r3(c.at + 0.05), 0.03]] : []), ...popCues({ ...c, at: c.at + (c.kicker ? 0.15 : 0) })]

export function buildTitle(root, { ep, title, at, len = 3 }) {
  const w = el('div', { position: 'absolute', inset: 0, display: 'none', pointerEvents: 'none', overflow: 'hidden' }, root)
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px' }, w)
  cv.width = 1080; cv.height = 1920
  const x = cv.getContext('2d')
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#060a24'); g.addColorStop(0.55, '#0d1748'); g.addColorStop(1, '#1a1650')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  const r = rng(21)
  for (let i = 0; i < 70; i++) drawPixelStar(x, r() * 1080, r() * 1300, 8 + r() * 14, i % 3 ? 1 : 2, i % 4 ? BONE : ML_GOLD)
  drawMoon(x, 540, 520, 190, 0.5, { alpha: 1, glow: 3, earthshine: 1, darkAlpha: 0.6 })
  // rooftops with lit windows
  const rr = rng(4)
  let rx = -20
  while (rx < 1100) {
    const bw = 120 + rr() * 140, bh = 260 + rr() * 260
    x.fillStyle = '#120c2e'; x.fillRect(rx, 1920 - bh, bw, bh)
    for (let wy = 1920 - bh + 40; wy < 1880; wy += 70) for (let wx = rx + 20; wx < rx + bw - 40; wx += 54) { x.fillStyle = rr() < 0.4 ? '#ffd98a' : '#1e1a44'; x.fillRect(wx, wy, 26, 32) }
    rx += bw + 6
  }
  const txt = el('div', { position: 'absolute', left: 0, top: '880px', width: '1080px', textAlign: 'center' }, w)
  const big = el('div', { ...BUG_CSS, fontSize: '172px', lineHeight: '0.9', letterSpacing: '0.1em', paddingLeft: '0.1em',
    background: 'linear-gradient(180deg, #fff6d8 0%, #ffcf6e 55%, #e89a3a 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }, txt)
  big.innerHTML = 'Moonlight<br>Lane'
  const glowEl = el('div', { position: 'absolute', left: 0, top: '-40px', width: '1080px', height: '400px', background: 'radial-gradient(ellipse at 50% 50%, rgba(255,207,110,0.35), rgba(255,207,110,0) 65%)' }, txt)
  txt.insertBefore(glowEl, big)
  const sub = el('div', { marginTop: '34px', font: `700 38px ${MONO}`, letterSpacing: '0.24em', color: BONE, textShadow: '0 3px 12px rgba(6,4,18,0.9)' }, txt)
  el('span', {}, sub, `EP ${ep} · `)
  el('span', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', fontSize: '66px', letterSpacing: '0', color: ML_GOLD }, sub, title)
  const FL = [0, 1, 0.15, 0.9, 0.3, 1, 0.6, 1]
  return {
    on: t => t >= at && t < at + len,
    update(t) {
      const on = t >= at && t < at + len
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const dt = t - at
      w.style.opacity = String(clamp(dt / 0.12) * (1 - prog(t, at + len - 0.18, at + len)))
      const f = dt < 0.25 ? 0 : dt < 0.25 + FL.length * 0.08 ? FL[Math.floor((dt - 0.25) / 0.08)] : 1
      big.style.opacity = String(f); glowEl.style.opacity = String(f * (0.8 + 0.2 * Math.sin(t * 4)))
      big.style.filter = `drop-shadow(0 6px 0 rgba(60,30,0,0.85)) drop-shadow(0 0 ${Math.round(30 * f)}px rgba(255,207,110,0.7))`
      sub.style.opacity = String(clamp(prog(t, at + 1.05, at + 1.35)))
      sub.style.transform = `translateY(${((1 - ease.outCubic(prog(t, at + 1.05, at + 1.4))) * 24).toFixed(1)}px)`
      cv.style.transform = `scale(${(1.04 - 0.04 * prog(t, at, at + len)).toFixed(4)})`
    },
  }
}
export const titleCues = (at, len = 3) => [
  ['whoosh', r3(at), 0.5, 0.04], ['bell', r3(at + 0.3), 1174.66, 0.025, 1.6, 0],
  ...[0.25, 0.41, 0.57, 0.73].map((d, i) => ['tick', r3(at + d), 0.03 + i * 0.006]), ['pluck', r3(at + 0.89), 880, 0.04, 0.8, 0], ['glitter', r3(at + 0.9), r3(at + 1.6)],
  ['pop', r3(at + 1.08), 1318.51, 0.035, 0], ['whoosh', r3(at + len - 0.2), 0.35, 0.03],
]

export function buildPreviously(root, { at = 0, len = 2, stills = [] }) {
  const w = el('div', { position: 'absolute', inset: 0, display: 'none', pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 40%, #16205a 0%, #0a0f2e 70%, #05081c 100%)' }, root)
  const head = el('div', { position: 'absolute', left: 0, top: '230px', width: '1080px', textAlign: 'center', whiteSpace: 'nowrap' }, w)
  el('div', { font: `700 40px ${MONO}`, letterSpacing: '0.24em', color: BONE, textShadow: '0 3px 12px rgba(6,4,18,0.95)' }, head, '◀◀ PREVIOUSLY ON')
  el('div', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '600', fontSize: '128px', lineHeight: '1.05', color: ML_GOLD, textShadow: '0 6px 0 rgba(60,30,0,0.8), 0 0 34px rgba(255,207,110,0.5)' }, head, 'Moonlight Lane…')
  const n = stills.length, PW = n >= 3 ? 300 : 380, PH = Math.round(PW * 1.18)
  const ROT = [-5, 3, -2], DY = [0, 50, -10]
  const tiles = stills.map((s, i) => {
    const left = Math.round(540 + (i - (n - 1) / 2) * (PW + 36) - PW / 2 - 14)
    const tile = el('div', { position: 'absolute', left: left + 'px', top: (720 + DY[i % 3]) + 'px', width: (PW + 28) + 'px', padding: '14px 14px 0', background: '#f7efdd', boxShadow: '0 16px 40px rgba(0,0,0,0.6)', transformOrigin: '50% 50%' }, w)
    const c = el('canvas', { display: 'block', width: PW + 'px', height: PH + 'px', imageRendering: 'auto' }, tile)
    c.width = PW; c.height = PH
    try {
      const full = document.createElement('canvas'); full.width = 1080; full.height = 1920
      const fx = full.getContext('2d'); s.scene(fx)
      const [cx0, cy0, cw, ch] = s.crop || [0, 560, 1080, 1080 * PH / PW]
      c.getContext('2d').drawImage(full, cx0, cy0, cw, ch, 0, 0, PW, PH)
    } catch (_) { /* a still that fails stays blank */ }
    el('div', { font: `700 26px ${INTER}`, color: INK, textAlign: 'center', padding: '14px 4px 18px', lineHeight: '1.15' }, tile, s.caption || '')
    return { tile, t0: at + 0.2 + i * 0.32, rot: ROT[i % 3] }
  })
  const lines = el('div', { position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 3px, rgba(0,0,0,0) 3px 7px)' }, w)
  void lines
  return {
    on: t => t >= at && t < at + len,
    update(t) {
      const on = t >= at && t < at + len
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      w.style.opacity = String(clamp((t - at) / 0.06) * (1 - prog(t, at + len - 0.12, at + len)))
      const jit = Math.floor(t * 24) % 3 - 1
      head.style.transform = `translate(${jit * 3}px, ${(Math.floor(t * 12) % 2) * 2}px)`
      for (const T of tiles) {
        const k = easeOutBack(prog(t, T.t0, T.t0 + 0.3), 2)
        T.tile.style.display = t >= T.t0 ? 'block' : 'none'
        T.tile.style.transform = `translateY(${((1 - k) * 80).toFixed(1)}px) rotate(${(T.rot + (1 - k) * 10).toFixed(2)}deg) scale(${(0.7 + 0.3 * k).toFixed(3)})`
      }
    },
  }
}
export const previouslyCues = (at = 0, n = 3, len = 2) => [
  ['tapeStop', r3(at + 0.02), 0.3], ['whoosh', r3(at), 0.4, 0.04],
  ...Array.from({ length: n }, (_, i) => [['tick', r3(at + 0.2 + i * 0.32), 0.05], ['pop', r3(at + 0.22 + i * 0.32), NOTE[(i * 2) % 7], 0.03, (i - 1) * 0.3]]).flat(),
  ['whoosh', r3(at + len - 0.15), 0.3, 0.03],
]

// THE STARS ADVISE
const ADV = { cardTop: [310, 620, 930], cardW: 900, cardH: 270, boxY: 1500, boxH: 240, star: { x: 540, y: 1372, s: 140 } }
function accentHtml(s, col) { return String(s).replace(/\*([^*]+)\*/g, `<span style="font-family:${SERIF};font-style:italic;font-weight:600;color:${col};font-size:1.12em">$1</span>`) }
export function buildAdvise(root, { at, out, cards = [], lines = [], box = {}, narrator = true }) {
  const OUT = out || [at + 20, at + 20.3]
  const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', display: 'none', pointerEvents: 'none' }, root)
  cv.width = 1080; cv.height = 1920
  const x = cv.getContext('2d')
  const head = el('div', { position: 'absolute', left: 0, top: '170px', width: '1080px', textAlign: 'center', display: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }, root)
  el('div', { ...BUG_CSS, fontSize: '76px', letterSpacing: '0.18em', paddingLeft: '0.18em', lineHeight: '1', textShadow: '0 5px 0 rgba(60,30,0,0.75), 0 0 30px rgba(255,207,110,0.5)' }, head, '★ The Stars Advise ★')
  const cardEls = cards.map((c, i) => {
    const last = i === cards.length - 1
    const w = el('div', { position: 'absolute', left: ((1080 - ADV.cardW) / 2) + 'px', top: ADV.cardTop[i % 3] + 'px', width: ADV.cardW + 'px', height: ADV.cardH + 'px', display: 'none', pointerEvents: 'none', transformOrigin: '50% 0%' }, root)
    el('div', { position: 'absolute', inset: 0, borderRadius: '20px', background: 'linear-gradient(170deg, #fff8e8 0%, #f6e8c8 100%)', boxShadow: `0 0 0 6px ${GOLD}, 0 0 0 11px ${INK}, 0 22px 40px rgba(2,4,20,0.65)` }, w)
    if (last) el('div', { position: 'absolute', right: '26px', top: '-30px', padding: '8px 18px 7px', font: `700 24px ${MONO}`, letterSpacing: '0.12em', color: INK, background: ML_GOLD, boxShadow: `0 0 0 4px ${INK}` }, w, '★ TONIGHT’S MOVE')
    const ic = el('canvas', { position: 'absolute', left: '34px', top: '58px', width: '150px', height: '150px', imageRendering: 'pixelated' }, w)
    ic.width = 150; ic.height = 150
    const icx = ic.getContext('2d'); icx.fillStyle = '#efe0bf'; icx.fillRect(0, 0, 150, 150); icx.fillStyle = INK; icx.fillRect(0, 0, 150, 6); icx.fillRect(0, 144, 150, 6); icx.fillRect(0, 0, 6, 150); icx.fillRect(144, 0, 6, 150)
    const rows = ICONS[c.icon] || ICONS.star, cell = Math.floor(110 / Math.max(rows.length, rows[0].length))
    drawIcon(icx, c.icon, 75 - rows[0].length * cell / 2, 75 - rows.length * cell / 2, cell)
    el('div', { position: 'absolute', left: '34px', top: '18px', font: `700 24px ${MONO}`, letterSpacing: '0.14em', color: '#9a7a4a' }, w, `0${i + 1}`)
    const tx = el('div', { position: 'absolute', left: '214px', top: '0', width: '650px', height: ADV.cardH + 'px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }, w)
    const hd = el('div', { font: `800 52px ${INTER}`, lineHeight: '1.05', color: INK, whiteSpace: 'nowrap', letterSpacing: '-0.01em' }, tx)
    hd.innerHTML = accentHtml(c.head, '#c2306a')
    el('div', { marginTop: '14px', font: `500 30px ${INTER}`, lineHeight: '1.3', color: '#4a3a5a' }, tx, c.body)
    return { w, hd, c, i }
  })
  // shrink any headline that is too wide (measured once, laid out but invisible)
  for (const C of cardEls) {
    C.w.style.display = 'block'; C.w.style.visibility = 'hidden'
    let s = 52
    while (C.hd.scrollWidth > 650 && s > 34) { s -= 2; C.hd.style.fontSize = s + 'px' }
    C.w.style.display = 'none'; C.w.style.visibility = 'visible'
  }
  const L = lines.map(l => ({ speaker: 'THE STARS', ...l }))
  const bx = L.length ? dialogueBox(root, { lines: L, y: ADV.boxY, height: ADV.boxH, width: 960, open: box.open ?? L[0].t - 0.25, close: box.close ?? OUT[0], cps: 28, size: 46 }) : null
  const HOPS = [at + 0.6, ...talkHops(L, 'THE STARS', { cps: 28 }), ...cards.map(c => c.at + 0.32)]
  const sr = rng(13), STARS = Array.from({ length: 60 }, () => [sr() * 1080, sr() * 1920, 6 + sr() * 12, sr() * 6])
  return {
    update(t) {
      const on = t >= at && t < OUT[1]
      const o = outK(t, OUT), fin = ease.inOutQuad(prog(t, at, at + 0.6)) * o
      cv.style.display = on ? 'block' : 'none'; head.style.display = on ? 'block' : 'none'
      if (bx) bx.update(t)
      for (const C of cardEls) C.w.style.display = on && t >= C.c.at ? 'block' : 'none'
      if (!on) return
      x.clearRect(0, 0, 1080, 1920)
      x.globalAlpha = fin
      const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#070c2e'); g.addColorStop(0.6, '#0e1850'); g.addColorStop(1, '#141a5a')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      for (const [sx, sy, ss, ph] of STARS) { x.globalAlpha = fin * (0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + ph))); drawPixelStar(x, sx, sy, ss, 1, BONE) }
      x.globalAlpha = fin
      glow(x, 540, 1372, 260, '#ffcf6e', 0.2)
      if (narrator) {
        const k = pop01(t, at + 0.45, 0.4, 2) * o
        const lineOn = L.some(l => t >= l.t && t < l.t + 1.6)
        drawStarChar(x, ADV.star.x, ADV.star.y, ADV.star.s, t, { color: STAR.sky, mood: lineOn ? 'happy' : 'sparkle', look: [0, -1], hops: HOPS, pop: k, seed: 2, glow: 1.1 })
      }
      x.globalAlpha = 1
      const hk = pop01(t, at + 0.25, 0.4, 2) * o
      head.style.opacity = String(clamp(hk)); head.style.transform = `scale(${(0.7 + 0.3 * hk).toFixed(3)})`
      for (const C of cardEls) {
        if (t < C.c.at) continue
        const p = prog(t, C.c.at, C.c.at + 0.55), k = easeOutBack(p, 1.6)
        const rest = [-1.2, 1.0, -0.6][C.i % 3]
        const isNew = cardEls.every(D => D.i <= C.i || t < D.c.at)
        const pulse = isNew ? 1 + 0.008 * Math.sin((t - C.c.at) * 4) : 0.985
        C.w.style.opacity = String(clamp(p * 4) * o * (isNew ? 1 : 0.86))
        C.w.style.transform = `translateY(${((1 - k) * -620).toFixed(1)}px) rotate(${(rest + (1 - k) * -14).toFixed(2)}deg) scale(${pulse.toFixed(4)})`
      }
    },
  }
}
export function adviseCues({ at, cards = [], lines = [] }) {
  const L = lines.map(l => ({ speaker: 'THE STARS', ...l }))
  return [
    ['whoosh', r3(at), 0.6, 0.04], ['bell', r3(at + 0.3), 1760, 0.03, 1.6, 0], ['glitter', r3(at + 0.25), r3(at + 1.0)], ['pop', r3(at + 0.45), 880, 0.03, 0],
    ...cards.flatMap((c, i) => [['whoosh', r3(c.at), 0.35, 0.05], ['tick', r3(c.at + 0.3), 0.07], ['pop', r3(c.at + 0.32), NOTE[(i * 2 + 1) % 7], 0.045, 0], ['pluck', r3(c.at + 0.34), NOTE[(i * 2 + 3) % 7] * 2, 0.03, 0.6, 0]]),
    ...talkCues(L, { cps: 28, pitch: { 'THE STARS': 880 } }),
  ]
}

export function buildNextTime(root, { at, out, teaser = '', finale = false }) {
  const w = el('div', { position: 'absolute', left: '80px', top: '620px', width: '920px', height: '560px', display: 'none', pointerEvents: 'none', transformOrigin: '50% 50%' }, root)
  el('div', { position: 'absolute', inset: 0, borderRadius: '30px', background: 'radial-gradient(ellipse at 50% 20%, #1c2a70 0%, #0b1236 75%)', boxShadow: `0 0 0 6px ${ML_GOLD}, 0 0 0 12px ${INK}, 0 30px 80px rgba(2,4,20,0.8), 0 0 120px rgba(255,207,110,0.35)` }, w)
  const shine = el('div', { position: 'absolute', top: 0, bottom: 0, width: '140px', background: 'linear-gradient(90deg, rgba(255,240,200,0), rgba(255,240,200,0.25), rgba(255,240,200,0))', transform: 'skewX(-20deg)' }, el('div', { position: 'absolute', inset: 0, borderRadius: '30px', overflow: 'hidden' }, w))
  const moon = el('div', { position: 'absolute', left: '410px', top: '-60px', width: '100px', height: '100px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #fffaf0, #f2dfb0 60%, #d8c08a)', boxShadow: '0 0 40px rgba(255,230,170,0.8), 0 0 0 6px #0b1236' }, w)
  void moon
  const col = el('div', { position: 'absolute', inset: '60px 40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }, w)
  el('div', { font: `700 40px ${MONO}`, letterSpacing: '0.3em', color: ML_GOLD }, col, finale ? 'THE END…' : 'NEXT TIME ON')
  if (!finale) el('div', { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '600', fontSize: '128px', lineHeight: '1.05', color: ML_GOLD, textShadow: '0 6px 0 rgba(60,30,0,0.7), 0 0 30px rgba(255,207,110,0.5)' }, col, 'Moonlight Lane…')
  const tl = el('div', { marginTop: finale ? '20px' : '30px', font: `700 ${finale ? 96 : 50}px ${INTER}`, lineHeight: '1.15', color: BONE, opacity: 0 }, col)
  tl.innerHTML = accentHtml(teaser, ML_GOLD)
  return {
    update(t) {
      const on = t >= at && (!out || t < out[1])
      w.style.display = on ? 'block' : 'none'
      if (!on) return
      const p = easeOutBack(prog(t, at, at + 0.5), 1.7), o = out ? 1 - ease.inCubic(prog(t, ...out)) : 1
      w.style.transform = `scale(${(p * (1 + 0.01 * Math.sin(t * 3))).toFixed(4)}) rotate(${lerp(-6, -1.2, p).toFixed(2)}deg)`
      w.style.opacity = String(clamp(prog(t, at, at + 0.12)) * o)
      shine.style.left = lerp(-200, 1100, prog(t, at + 0.4, at + 1.3)) + 'px'
      const tk = prog(t, at + 0.75, at + 1.1)
      tl.style.opacity = String(tk); tl.style.transform = `translateY(${((1 - ease.outCubic(tk)) * 20).toFixed(1)}px)`
    },
  }
}
export const nextTimeCues = at => [
  ['whoosh', r3(at - 0.05), 0.5, 0.05], ['glitter', r3(at), r3(at + 0.7)], ['bell', r3(at + 0.1), 1174.66, 0.035, 1.4, 0],
  ['pop', r3(at + 0.2), 880, 0.04, 0], ['pluck', r3(at + 0.78), 1318.51, 0.04, 0.8, 0], ['pop', r3(at + 0.8), 1760, 0.025, 0.2],
]
