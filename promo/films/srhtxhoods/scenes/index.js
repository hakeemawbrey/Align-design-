// srhtxhoods (45 s vertical, Star Talk Remix of htxhoods "Your sign as a Houston hood") · story 0–40.6, then the
// shared end card. THE STARS run a Houston star tour: every sign's own star pops in over its neighbourhood and says
// its line in the dialogue box. ♓ Pisces cries in the back of two other signs' cards (a guest at Bellaire, at a
// painting in the Museum District) before crying into Galveston Bay on its own. Beats on the 108 bpm grid (B = one beat).
//   0.00–2.82   HOOK  "Your sign as a | Houston | *neighborhood.*" over the little map (the Loop + the Beltway), twelve
//               glyph pins drop in; the tour-guide star (THE STARS, with a tiny flag) pops up. Box: the star tour.
//   2.82 + 2.22·i  sign i (♈ → ♓) lands (4 beats each): a colour wipe, the sign's STAR bounces in where the glyph
//               sticker was, SIGN NAME, the neighbourhood big in Garamond, its line-art landmark + gag; the star says
//               the quip in the box ("already at the next spot.", "here for the brunch.", …).
//   29.49 TURN  "Know your sign? | Now find who | *lines up* with it." Leo (the Galleria) and Sag (Buffalo Bayou) cards
//               slide together, their stars on them; a gold line links them, a heart pops. Box: "fire meets fire. that's a
//               *trine.*"
//   33.93 ★ LESSON UNLOCKED: "Love crosses | the *Beltway.*" (+1 WILLING TO DRIVE)
//   37.82 "Tag your | *neighborhood.*" with twelve neighbourhood tags popping around it; out 40.0–40.45; end card 40.6.
// One canvas (so wipes can clip whole layers), DOM dialogue boxes + the lesson, grain overlay, black fade-in. Pure f(t).
import { clamp, lerp, prog, ease, rng, C } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar, drawMoon } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame, cutPlays } from '../../cardfx.js'
import { B, BONE, GOLD, VOID, PINK, tint, hexA, ink, pin, rr, eado, heights, midtown, bellaire, galleria, village, museum, tunnels, bayou, downtown, montrose, bay, starFrame, inSprite, tearsCells } from './props.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN                 // 40.6
const beat = n => 0.6 + n * B
const TAU = Math.PI * 2
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', serif"
const MONO = "'Space Mono', monospace"
const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const VS = '︎'
const SHADOW = 'rgba(11,6,32,0.9)'

// ── timeline
const S = SIGNS.map((_, i) => beat(4 + 4 * i))           // card downbeats: 2.82 … 27.27 (4 beats each)
const TN = beat(52)                                      // 29.49 the turn
const LS = beat(60)                                      // 33.93 the lesson
const E0 = beat(67)                                      // 37.82 the last line
const OUT = [40.0, 40.45]
const KIND = ['slash', 'iris', 'twin', 'wave', 'star', 'blinds', 'swing', 'keyhole', 'arrow', 'peaks', 'pixels', 'bubbles', 'iris', 'wave']
const DUR = { slash: 0.36, iris: 0.4, twin: 0.38, wave: 0.42, star: 0.42, blinds: 0.42, swing: 0.5, keyhole: 0.42, arrow: 0.34, peaks: 0.44, pixels: 0.46, bubbles: 0.46 }
// layer k: 0 = hook, 1..12 = signs, 13 = turn, 14 = end line. WIPE[k] = when layer k starts covering layer k-1 (midpoint on the beat)
const WIPE = [0, ...S.map((s, i) => s - DUR[KIND[i]] * 0.5), TN - DUR[KIND[12]] * 0.5, E0 - DUR[KIND[13]] * 0.5]
const LINK = [TN + 1.6, TN + 2.05]                       // the gold line between the two cards; heart at LINK[1]

// ── copy (the picks are playful, never claims)
const INFO = [
  { hood: 'EaDo', quip: ['“Already', 'at', 'the', '\n', { w: 'next spot.”' }], prop: eado },
  { hood: 'the Heights', quip: ['“Here', 'for', '\n', 'the', { w: 'brunch.”' }], prop: heights },
  { hood: 'Midtown', quip: ['“Three', 'plans', '\n', { w: 'tonight.”' }], prop: midtown },
  { hood: 'Bellaire', quip: ['“Hosting,', '\n', { w: 'obviously.”' }], prop: bellaire },
  { hood: 'the Galleria', quip: ['“Main', 'character', '\n', { w: 'lighting.”' }], prop: galleria },
  { hood: 'Rice Village', quip: ['“Has', 'a', '\n', { w: 'reservation.”' }], prop: village },
  { hood: 'Museum District', quip: ['“Here', 'for', 'the', '\n', { w: 'aesthetic.”' }], prop: museum },
  { hood: 'the Tunnels', quip: ['“Knows', 'the', '\n', { w: 'secret route.”' }], prop: tunnels, sub: 'UNDER DOWNTOWN' },
  { hood: 'Buffalo Bayou', quip: ['“Already', '\n', { w: 'outside.”' }], prop: bayou, sub: 'THE TRAILS' },
  { hood: 'Downtown', quip: ['“In', 'the', 'office', '\n', { w: 'early.”' }], prop: downtown },
  { hood: 'Montrose', quip: ['“Liked', 'it', 'before', '\n', 'it', 'was', { w: 'cool.”' }], prop: montrose },
  { hood: 'Galveston Bay', quip: ['“Staring', 'at', '\n', 'the', { w: 'water.”' }], prop: bay },
]
// what each sign's star says in the box (≤ 26 characters: each has to type and hold inside its 2.2 s card)
const QUIP = ['already at the next spot.', 'here for the *brunch.*', 'three plans *tonight.*', 'hosting. *obviously.*', 'main character *lighting.*',
  'I have a *reservation.*', 'here for the *aesthetic.*', 'I know a *secret* route.', 'already *outside.*', 'in the office *early.*',
  'liked it before it was *cool.*', 'staring at the *water.*']
const MOOD = [['wide'], ['heart'], ['sparkle', [1, -1]], ['happy'], ['wink'], ['squint', [1, 0]], ['sparkle', [0, 1]], ['squint', [-1, 0]], ['happy'], ['neutral', [0, 0]], ['eyeroll'], ['squint']]
const SPEAK = 'THE STARS', CPS = 40
const NAME = i => `${SIGNS[i].glyph} ${SIGNS[i].name.toUpperCase()} STAR`
const LINES1 = [{ t: 0.7, speaker: SPEAK, text: 'welcome to the *star tour*, Houston.' }, ...QUIP.map((q, i) => ({ t: +(S[i] + 0.42).toFixed(3), speaker: NAME(i), text: q, color: tint(SIGNS[i].color, '#ffffff', 0.45) }))]
const LINES2 = [{ t: +(TN + 1.75).toFixed(3), speaker: SPEAK, text: "fire meets fire. that's a *trine.*" }]
const CLOSE1 = TN + 0.25, CLOSE2 = LS - 0.08
const LESSON = { at: LS, out: [37.55, 37.75], text: 'Love crosses | the *Beltway.*', chip: '+1 WILLING TO DRIVE' }
const HOST_HOPS = [0.55, ...talkHops(LINES1, SPEAK, { cps: CPS }), ...talkHops(LINES2, SPEAK, { cps: CPS })]
const signHops = i => [S[i] + 0.35, ...talkHops(LINES1, NAME(i), { cps: CPS })]
const TAGS = ['EaDo', 'the Heights', 'Midtown', 'Bellaire', 'the Galleria', 'Rice Village', 'Museum District', 'the Tunnels', 'Buffalo Bayou', 'Downtown', 'Montrose', 'Galveston Bay']
// tag positions around the end line (above / below it), each with a little tilt
const TAG_POS = [[250, 330, -0.08], [770, 310, 0.07], [290, 480, 0.05], [260, 1270, 0.06], [790, 1260, -0.06], [290, 1410, -0.04],
  [330, 1560, 0.04], [800, 1410, 0.06], [800, 1560, -0.05], [780, 470, -0.06], [270, 1710, -0.06], [790, 1710, 0.05]]

// ── layout
const L = { eyeY: 168, gx: 540, gy: 350, gR: 118, nameTop: 500, hoodTop: 600, propY: 1135, quipTop: 1530, star: 250 }

// ── sparkles (pixel-star bursts)
const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.save(); ctx.globalAlpha *= Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
    ctx.restore()
  }
  ctx.restore()
}

// ── canvas word pops. items: string | '\n' | { w, col?, accent? (default true: EB Garamond italic) }
function words(ctx, items, { cx = 540, top, size = 62, weight = 700, accSize = Math.round(size * 1.12), lh = 1.14, col = BONE, accCol = GOLD, ls = -0.02 }, t, t0, { step = 0.07, dur = 0.28, back = 1.9, wobbleLast = false } = {}) {
  const lines = [[]]
  for (const it of items) { if (it === '\n') lines.push([]); else lines.at(-1).push(it) }
  const gap = size * 0.26
  const nAll = lines.flat().length
  let k = 0
  lines.forEach((ln, li) => {
    const ws = ln.map(it => {
      const o = typeof it === 'object', acc = o && it.accent !== false
      const font = acc ? `italic 500 ${accSize}px ${SERIF}` : `${weight} ${size}px ${INTER}`
      ctx.font = font; ctx.letterSpacing = acc ? '0px' : `${ls * size}px`
      return { txt: o ? it.w : it, font, ls: ctx.letterSpacing, col: o ? (it.col || accCol) : col, w: ctx.measureText(o ? it.w : it).width, acc }
    })
    const total = ws.reduce((a, w) => a + w.w, 0) + gap * (ws.length - 1)
    let x = cx - total / 2
    const base = top + size * lh * li + size * 0.86
    ws.forEach(w => {
      const i = k++, a = t0 + i * step
      const p = prog(t, a, a + dur)
      if (p > 0) {
        const sc = lerp(0.6, 1, easeOutBack(p, back)), tt = t - a
        const rot = wobbleLast && i === nAll - 1 && tt > 0 ? 0.16 * Math.exp(-tt * 4) * Math.sin(tt * 18) : 0
        ctx.save(); ctx.translate(x + w.w / 2, base - size * 0.32 + lerp(30, 0, ease.outCubic(p))); ctx.rotate(rot); ctx.scale(sc, sc)
        ctx.globalAlpha *= Math.min(1, p * 3)
        ctx.font = w.font; ctx.letterSpacing = w.ls; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
        ctx.shadowColor = SHADOW; ctx.shadowBlur = 28; ctx.shadowOffsetY = 4
        if (w.acc || w.col !== col) { ctx.shadowColor = hexA(w.col.length === 7 ? w.col : '#000000', 0.45); ctx.shadowBlur = 26; ctx.shadowOffsetY = 0; ctx.fillStyle = w.col; ctx.fillText(w.txt, 0, size * 0.32); ctx.shadowColor = SHADOW; ctx.shadowBlur = 24; ctx.shadowOffsetY = 4 }
        ctx.fillStyle = w.col; ctx.fillText(w.txt, 0, size * 0.32)
        ctx.restore()
      }
      x += w.w + gap
    })
  })
  ctx.letterSpacing = '0px'
}
function mono(ctx, txt, x, y, size, col, a = 1, ls = 0.25) {
  if (a <= 0.003) return
  ctx.save(); ctx.globalAlpha *= a; ctx.font = `700 ${size}px ${MONO}`; ctx.letterSpacing = `${size * ls}px`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = SHADOW; ctx.shadowBlur = 16; ctx.fillStyle = col; ctx.fillText(txt, x + size * ls / 2, y); ctx.restore()
}
function glyphText(ctx, g, size, col) {
  ctx.font = `bold ${size}px ${GLYPH}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.shadowColor = col; ctx.shadowBlur = 30; ctx.fillStyle = col; ctx.fillText(g + VS, 0, size * 0.04); ctx.shadowBlur = 0
}
/** a glyph sticker: dark disc, glowing rim, dashed inner ring, the glyph */
function sticker(ctx, g, col, R) {
  ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fillStyle = hexA(tint(col, VOID, 0.5), 0.8); ctx.fill(); ink(ctx, tint(col, '#ffffff', 0.25), { w: 9, fa: 0, glow: 30 })
  ctx.beginPath(); ctx.arc(0, 0, R - 18, 0, TAU); ctx.setLineDash([4, 16]); ink(ctx, tint(col, '#ffffff', 0.5), { w: 4, fa: 0, glow: 0 }); ctx.setLineDash([])
  glyphText(ctx, g, R * 1.6, tint(col, '#ffffff', 0.72))
}

// ── the glyph's entrance, different per sign (u = seconds since the downbeat)
function glyphPose(i, u) {
  const p = prog(u, -0.05, 0.36), e = easeOutBack(p, 2.0), w = (a, f = 16, k = 5) => u > 0.3 ? a * Math.exp(-(u - 0.3) * k) * Math.sin((u - 0.3) * f) : 0
  const P = { dx: 0, dy: 0, s: 1, sx: 1, sy: 1, rot: 0, a: 1 }
  switch (i % 6) {
    case 0: P.dy = lerp(500, 0, e); P.sy = 1 + 0.3 * (1 - p) + w(0.12); P.sx = 1 / P.sy; break
    case 1: { const f = ease.inQuad(prog(u, -0.1, 0.2)); P.dy = lerp(-600, 0, f); const sq = u > 0.2 ? 0.3 * Math.exp(-(u - 0.2) * 6) * Math.cos((u - 0.2) * 18) : 0; P.sx = 1 + sq; P.sy = 1 - sq; break }
    case 2: P.s = e; P.rot = (1 - ease.outCubic(p)) * -TAU; break
    case 3: P.s = lerp(2.2, 1, ease.inQuad(prog(u, -0.1, 0.16))) + w(0.08, 30, 8); P.a = prog(u, -0.1, 0.04); break
    case 4: P.dx = lerp(-900, 0, ease.outCubic(prog(u, -0.1, 0.24))) + w(30, 20, 6); P.sx = 1 + 0.4 * (1 - prog(u, -0.1, 0.3)); break
    case 5: P.s = e; P.rot = lerp(-1.0, 0, ease.outCubic(p)) + w(0.15, 12, 4); break
  }
  return P
}

// ── wipe masks (path on ctx, p 0→1 covers the screen). Returns an edge-stroke callback.
const PIX = (() => { const r = rng(4242), o = []; for (let gy = 0; gy < 18; gy++) for (let gx = 0; gx < 10; gx++) { const x = gx * 108 + 54, y = gy * 108 + 54; o.push({ x, y, d: Math.hypot(x - 540, y - 735) / 1300 * 0.62 + r() * 0.14 }) } return o })()
const BUB = (() => { const r = rng(777), o = []; for (let gy = 0; gy < 8; gy++) for (let gx = 0; gx < 5; gx++) { const x = gx * 270 + (gy % 2) * 135 - 40 + (r() - 0.5) * 60, y = gy * 280 - 20 + (r() - 0.5) * 60; o.push({ x, y, d: (1 - y / H) * 0.45 + r() * 0.12, R: 250 + r() * 60 }) } return o })()
function maskPath(ctx, kind, p) {
  ctx.beginPath()
  switch (kind) {
    case 'slash': { const D = lerp(-950, 1150, ease.inOutCubic(p)); ctx.moveTo(-60, -60); ctx.lineTo(D - 27, -60); ctx.lineTo(D + 890, 1980); ctx.lineTo(-60, 1980); ctx.closePath(); return () => { ctx.beginPath(); ctx.moveTo(D - 27, -60); ctx.lineTo(D + 890, 1980) } }
    case 'iris': { const R = 2300 * ease.inOutQuad(p); ctx.arc(540, 1100, R, 0, TAU); return () => { ctx.beginPath(); ctx.arc(540, 1100, R, 0, TAU) } }
    case 'wave': { const Y = lerp(H + 140, -160, ease.inOutQuad(p)), f = x => Y + 60 * Math.sin(x / 110 + p * 14); ctx.moveTo(-20, H + 20); for (let x = -20; x <= W + 20; x += 20) ctx.lineTo(x, f(x)); ctx.lineTo(W + 20, H + 20); ctx.closePath(); return () => { ctx.beginPath(); for (let x = -20; x <= W + 20; x += 20) x === -20 ? ctx.moveTo(x, f(x)) : ctx.lineTo(x, f(x)) } }
    case 'star': { const R = 2500 * ease.inOutQuad(p), rot = p * 1.6, n = 12; const draw = () => { for (let k = 0; k < n * 2; k++) { const a = rot + (k / (n * 2)) * TAU, r = k % 2 ? R * 0.6 : R; k ? ctx.lineTo(540 + Math.cos(a) * r, L.gy + Math.sin(a) * r) : ctx.moveTo(540 + Math.cos(a) * r, L.gy + Math.sin(a) * r) } ctx.closePath() }; draw(); return () => { ctx.beginPath(); draw() } }
    case 'blinds': { const n = 12, h = H / n; const draw = () => { for (let k = 0; k < n; k++) { const q = ease.outCubic(prog(p, k * 0.05, k * 0.05 + 0.45)), hh = h * q; if (hh > 0) ctx.rect(k % 2 ? W * (1 - q) : 0, k * h, W * q + 1, h + 1) } }; draw(); return () => { ctx.beginPath(); for (let k = 0; k < n; k++) { const q = ease.outCubic(prog(p, k * 0.05, k * 0.05 + 0.45)); if (q > 0 && q < 1) { const x = k % 2 ? W * (1 - q) : W * q; ctx.moveTo(x, k * h); ctx.lineTo(x, k * h + h) } } } }
    case 'keyhole': { const k = 6200 * ease.inCubic(p), cx = 540, cy = 1000; const draw = () => { ctx.arc(cx, cy - 0.35 * k, 0.5 * k, 0, TAU); ctx.moveTo(cx - 0.22 * k, cy - 0.2 * k); ctx.lineTo(cx + 0.22 * k, cy - 0.2 * k); ctx.lineTo(cx + 0.5 * k, cy + 0.9 * k); ctx.lineTo(cx - 0.5 * k, cy + 0.9 * k); ctx.closePath() }; draw(); return () => { ctx.beginPath(); ctx.arc(cx, cy - 0.35 * k, 0.5 * k, Math.PI * 0.62, Math.PI * 2.38); ctx.lineTo(cx + 0.5 * k, cy + 0.9 * k); ctx.lineTo(cx - 0.5 * k, cy + 0.9 * k); ctx.closePath() } }
    case 'arrow': { const X = lerp(-120, 2000, ease.inQuad(p)); ctx.moveTo(-60, -60); ctx.lineTo(X - 700, -60); ctx.lineTo(X, 960); ctx.lineTo(X - 700, 1980); ctx.lineTo(-60, 1980); ctx.closePath(); return () => { ctx.beginPath(); ctx.moveTo(X - 700, -60); ctx.lineTo(X, 960); ctx.lineTo(X - 700, 1980) } }
    case 'peaks': { const Y = lerp(H + 420, -120, ease.inOutCubic(p)), pts = []; for (let k = 0; k <= 9; k++) pts.push([-60 + k * 150, Y - (k % 2 ? 380 : 0) - (k % 4 === 1 ? 120 : 0)]); ctx.moveTo(-60, H + 60); pts.forEach(q => ctx.lineTo(...q)); ctx.lineTo(W + 80, H + 60); ctx.closePath(); return () => { ctx.beginPath(); pts.forEach((q, k) => k ? ctx.lineTo(...q) : ctx.moveTo(...q)) } }
    case 'pixels': { const draw = () => { for (const c of PIX) { const q = clamp(easeOutBack(prog(p, c.d, c.d + 0.2), 1.6), 0, 1.15), s = 110 * q; if (s > 0) ctx.rect(c.x - s / 2, c.y - s / 2, s, s) } }; draw(); return () => { ctx.beginPath(); for (const c of PIX) { const q = prog(p, c.d, c.d + 0.2); if (q > 0 && q < 1) { const s = 110 * q; ctx.rect(c.x - s / 2, c.y - s / 2, s, s) } } } }
    case 'bubbles': { const draw = () => { for (const b of BUB) { const q = easeOutBack(prog(p, b.d, b.d + 0.4), 1.4), r = b.R * Math.max(0, q); if (r > 0) { ctx.moveTo(b.x + r, b.y); ctx.arc(b.x, b.y, r, 0, TAU) } } }; draw(); return () => { ctx.beginPath(); for (const b of BUB) { const q = prog(p, b.d, b.d + 0.4); if (q > 0 && q < 1) { const r = b.R * easeOutBack(q, 1.4); ctx.moveTo(b.x + r, b.y); ctx.arc(b.x, b.y, r, 0, TAU) } } } }
  }
  return () => ctx.beginPath()
}

// ── the hook map: pin positions (inside the Beltway ellipse), each with its sign
const MAP = { x: 540, y: 1045 }, MAPK = 0.8
const PINS = (() => { const r = rng(61), o = []; for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + i * TAU / 12 + (r() - 0.5) * 0.3, d = (i % 2 ? 250 : 380) + (r() - 0.5) * 40; o.push({ x: MAP.x + Math.cos(a) * d * MAPK, y: MAP.y + Math.sin(a) * d * 0.82 * MAPK, t: beat(0) + i * 0.07 }) } return o })()

// ── the turn: two little sign cards
const PAIR = [4, 8]
const CARD = { w: 360, h: 480, y: 1060, xs: [290, 790], s: 1.1 }

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  await Promise.all([`800 108px Inter`, `900 100px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))
  try { await document.fonts.load("700 52px 'Space Mono'") } catch (_) { /* optional */ }
  const box1 = dialogueBox(root, { lines: LINES1, y: 1480, width: 960, height: 290, open: 0.5, close: CLOSE1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1480, width: 960, height: 290, open: LINES2[0].t - 0.2, close: CLOSE2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 1 })
  const SKYN = { ...SKY_H, moon: null }
  const moonOn = (dark = 0.62) => drawMoon(x, SKY_H.moon.x, SKY_H.moon.y, SKY_H.moon.r, SKY_H.moon.phase, { alpha: 1, glow: 3, earthshine: 1, darkAlpha: dark })
  // fit each neighbourhood name to the width
  const HOOD_SZ = INFO.map(inf => { x.font = `italic 500 176px ${SERIF}`; return Math.min(176, Math.floor(176 * 940 / x.measureText(inf.hood).width)) })

  // ───────── layers
  function hook(t) {
    drawSky(x, t, SKY_H)
    mono(x, 'HOUSTON, TX', 540, 150, 32, GOLD, ease.outQuad(prog(t, 0.05, 0.4)))
    words(x, ['Your', 'sign', 'as', 'a', '\n', 'Houston', '\n', { w: 'neighborhood.', col: '#ff8fb1' }], { top: 210, size: 124, weight: 800, accSize: 150, lh: 1.02 }, t, 0.1, { step: 0.07, back: 2.2, wobbleLast: true })
    // the map: two rings (the Loop, the Beltway), a little skyline in the middle
    const mk = easeOutBack(prog(t, 0.2, 0.7), 1.6)
    if (mk > 0.01) {
      x.save(); x.translate(MAP.x, MAP.y); x.scale(mk * MAPK, mk * MAPK)
      const kick = t > beat(0) ? 1 + 0.05 * Math.exp(-(t - beat(0)) * 6) * Math.sin((t - beat(0)) * 20) : 1
      x.scale(kick, kick)
      x.beginPath(); x.ellipse(0, 0, 450, 370, 0, 0, TAU); x.setLineDash([26, 18]); ink(x, BONE, { w: 8, fa: 0.06, glow: 10 }); x.setLineDash([])
      x.beginPath(); x.ellipse(0, 0, 220, 180, 0, 0, TAU); ink(x, GOLD, { w: 10, fa: 0.08, glow: 22 })
      // a plain 610 shield on the inner ring
      x.save(); x.translate(156, -126)
      x.beginPath(); x.moveTo(-38, -34); x.lineTo(38, -34); x.lineTo(38, 8); x.quadraticCurveTo(38, 34, 0, 46); x.quadraticCurveTo(-38, 34, -38, 8); x.closePath(); ink(x, BONE, { w: 5, fa: 0.92, fill: '#1c2a5a', glow: 10 })
      x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('610', 0, 2)
      x.restore()
      // generic skyline
      x.beginPath(); x.moveTo(-130, 60)
      for (const [bx, bw, bh] of [[-120, 40, 70], [-78, 36, 130], [-38, 44, 180], [10, 40, 150], [54, 34, 210], [92, 36, 100]]) { x.lineTo(bx, 60 - bh); x.lineTo(bx + bw, 60 - bh); x.lineTo(bx + bw, 60) }
      x.lineTo(130, 60); ink(x, '#c9a6ff', { w: 6, fa: 0.3, glow: 16 })
      x.restore()
    }
    // the twelve glyph pins drop in, then bounce on the beat
    PINS.forEach((P, i) => {
      const s = SIGNS[i], tt = t - P.t
      if (tt < 0) return
      const fall = ease.inQuad(prog(tt, 0, 0.22)), land = tt > 0.22 ? 0.25 * Math.exp(-(tt - 0.22) * 7) * Math.cos((tt - 0.22) * 22) : 0
      const bob = tt > 0.6 ? 10 * Math.exp(-((((t - 0.6) % B) + B) % B) * 6) : 0
      const py = lerp(P.y - 260, P.y, fall) - bob
      x.save(); x.globalAlpha *= clamp(tt * 8); x.translate(P.x, py); x.scale(1 + land, 1 - land)
      x.scale(MAPK, MAPK); pin(x, 0, 0, 1.25, tint(s.color, '#ffffff', 0.15), 1, false)
      x.translate(0, -90); x.font = `bold 62px ${GLYPH}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = VOID; x.fillText(s.glyph + VS, 0, 3)
      x.restore()
      sparkle(x, P.x, P.y, t, P.t + 0.22, { n: 6, rad: 80, seed: 10 + i, size: 18, cols: [s.color, '#fff3e0', GOLD] })
    })
    // the tour guide (THE STARS) with its little flag, bottom right of the map
    const hk = easeOutBack(prog(t, 0.45, 0.85), 2.2)
    if (hk > 0.02) {
      const r = drawStarChar(x, 860, 1310, 220, t, { color: STAR.sky, mood: t < 1.0 ? 'happy' : t < 2.0 ? 'sparkle' : 'happy', look: [-1, -1], hops: HOST_HOPS, seed: 3, pop: hk, glow: 1.1 })
      guideFlag(r.x - 140, r.y + 10, t, hk)
    }
  }

  // a tiny tour-guide flag on a stick, held at (fx, fy)
  function guideFlag(fx, fy, t, k) {
    x.save(); x.translate(fx, fy); x.scale(k, k); x.rotate(-0.2 + 0.06 * Math.sin(t * 3))
    x.beginPath(); x.moveTo(0, 60); x.lineTo(0, -150); ink(x, BONE, { w: 7, fa: 0, glow: 10 })
    x.beginPath(); x.moveTo(0, -150); for (let k2 = 0; k2 <= 12; k2++) { const v = k2 / 12; x.lineTo(v * 120, -150 + 6 * Math.sin(v * 6 + t * 7)) } for (let k2 = 12; k2 >= 0; k2--) { const v = k2 / 12; x.lineTo(v * 120, -80 + 6 * Math.sin(v * 6 + t * 7)) } x.closePath()
    ink(x, PINK, { w: 5, fa: 0.85, glow: 16 })
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = VOID; x.fillText('TOUR', 58, -114)
    x.restore()
  }

  // ♓ Pisces crying in the back of someone else's card (rule of three: Bellaire, the Museum District, then its own)
  const CAMEO = { 3: [175, 1330, 'squint', 2], 6: [905, 1330, 'squint', 3] }
  function cameo(i, t) {
    const c = CAMEO[i]; if (!c) return
    const u = t - S[i], k = easeOutBack(prog(u, 0.9, 1.25), 2.2)
    if (k <= 0.02) return
    const pis = signStar('pisces'), sob = 0.04 * Math.max(0, Math.sin(t * 15))
    const opts = { hops: [S[i] + 1.3, S[i] + 1.75], seed: 6, pop: k, squash: sob }
    drawStarChar(x, c[0], c[1], 150, t, { color: pis.color, glyph: null, mood: c[2], glow: 0.9, ...opts })
    inSprite(x, starFrame(c[0], c[1], 150, t, opts), () => tearsCells(x, t, c[3]))
  }

  function sign(i, t) {
    const s = SIGNS[i], inf = INFO[i], u = t - S[i], col = s.color, lite = tint(col, '#ffffff', 0.55)
    drawSky(x, t, SKYN)
    // the colour wash
    const g = x.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, hexA(tint(col, VOID, 0.45), 0.9)); g.addColorStop(0.45, hexA(tint(col, VOID, 0.25), 0.8)); g.addColorStop(1, hexA(tint(col, VOID, 0.6), 0.92))
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    // sunburst rays behind the glyph
    x.save(); x.translate(L.gx, L.gy); x.rotate(t * 0.25 + i)
    x.globalCompositeOperation = 'lighter'
    for (let k = 0; k < 16; k++) { const a0 = k * TAU / 16; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 1500, a0, a0 + TAU / 32); x.closePath(); x.fillStyle = hexA(tint(col, '#ffffff', 0.3), 0.06); x.fill() }
    x.restore()
    const rg = x.createRadialGradient(L.gx, L.gy, 20, L.gx, L.gy, 520); rg.addColorStop(0, hexA(tint(col, '#ffffff', 0.2), 0.36)); rg.addColorStop(1, hexA(col, 0))
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = rg; x.fillRect(0, 0, W, H); x.restore()
    // darker bands behind the neighbourhood and the quip, for readability
    for (const [y0, y1] of [[560, 860]]) {
      const qb = x.createLinearGradient(0, y0, 0, y1); qb.addColorStop(0, hexA(VOID, 0)); qb.addColorStop(0.35, hexA(VOID, 0.32)); qb.addColorStop(0.7, hexA(VOID, 0.32)); qb.addColorStop(1, hexA(VOID, 0))
      x.fillStyle = qb; x.fillRect(0, y0, W, y1 - y0)
    }
    moonOn(0.2)

    // glyph sticker
    const P = glyphPose(i, u), bump = 1 + 0.05 * Math.exp(-((((t - 0.6) % B) + B) % B) * 7) * prog(u, 0.5, 0.8)
    // the sign's own star, where the glyph sticker was (it keeps the sticker's entrance)
    x.save(); x.globalAlpha *= P.a
    x.translate(L.gx + P.dx, L.gy + P.dy); x.rotate(P.rot); x.scale(P.s * P.sx * bump, P.s * P.sy * bump)
    const [mood, look] = MOOD[i], tears = i === 11 ? 3 : 0
    const sopts = { hops: signHops(i), seed: 20 + i, squash: tears ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0 }
    drawStarChar(x, 0, 0, L.star, t, { color: col, glyph: s.glyph, mood: u < 0.35 ? 'wide' : mood, look, glow: 1.1, ...sopts })
    if (tears) inSprite(x, starFrame(0, 0, L.star, t, sopts), () => tearsCells(x, t, tears))
    x.restore()
    sparkle(x, L.gx, L.gy, t, S[i] + 0.2, { n: 12, rad: 240, seed: 30 + i, size: 30, cols: [col, lite, '#fff3e0', GOLD] })

    mono(x, `${String(i + 1).padStart(2, '0')} / 12`, 540, L.eyeY, 30, GOLD, ease.outQuad(prog(u, 0.0, 0.25)))
    // SIGN NAME (letter-spaced) → the neighbourhood, big
    words(x, [s.name.toUpperCase()], { top: L.nameTop, size: 76, weight: 800, col: lite, ls: 0.08 }, t, S[i] + 0.06, { back: 2.4, dur: 0.3 })
    const hs = HOOD_SZ[i]
    words(x, [{ w: inf.hood, col: '#fff6e6' }], { top: L.hoodTop + (176 - hs) * 0.5, size: hs, accSize: hs, lh: 1 }, t, S[i] + 0.2, { back: 2.8, dur: 0.36, wobbleLast: true })
    if (inf.sub) mono(x, inf.sub, 540, L.hoodTop + 236, 32, lite, ease.outQuad(prog(u, 0.4, 0.6)), 0.3)
    // underline swoosh under the neighbourhood
    const sw = ease.inOutCubic(prog(u, 0.38, 0.62))
    if (sw > 0) {
      x.save(); x.beginPath()
      for (let k = 0; k <= 30 * sw; k++) { const v = k / 30, xx = lerp(330, 750, v), yy = L.hoodTop + 178 + 14 * Math.sin(v * Math.PI * 1.6 + 0.4) - 6 * v; k ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      ink(x, tint(col, '#ffffff', 0.35), { w: 9, fa: 0, glow: 18 }); x.restore()
    }
    // landmark
    const prp = easeOutBack(prog(u, 0.36, 0.76), 2.0)
    if (prp > 0.01) inf.prop(x, 540, L.propY + 6 * Math.sin(t * 2.2), 0.92 * prp, u, tint(col, '#ffffff', 0.4))
    sparkle(x, 540, L.propY, t, S[i] + 0.45, { n: 10, rad: 300, seed: 60 + i, size: 26 })
    // quip
    cameo(i, t)
  }

  function miniCard(i, cx, cy, rot, sc, t) {
    const s = SIGNS[i], col = s.color, lite = tint(col, '#ffffff', 0.55)
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    const g = x.createLinearGradient(0, -CARD.h / 2, 0, CARD.h / 2); g.addColorStop(0, tint(col, VOID, 0.35)); g.addColorStop(1, tint(col, VOID, 0.7))
    x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    rr(x, -CARD.w / 2, -CARD.h / 2, CARD.w, CARD.h, 34); x.fillStyle = g; x.fill(); x.shadowColor = 'transparent'; x.shadowBlur = 0; x.shadowOffsetY = 0
    rr(x, -CARD.w / 2, -CARD.h / 2, CARD.w, CARD.h, 34); ink(x, tint(col, '#ffffff', 0.35), { w: 7, fa: 0, glow: 26 })
    drawStarChar(x, 0, -75, 190, t, { color: col, glyph: s.glyph, mood: t >= LINK[1] ? 'heart' : t >= LINK[0] ? 'wide' : 'happy', look: [i === PAIR[0] ? 1 : -1, -1], seed: 30 + i, hops: [LINK[1] + 0.05, LINK[1] + 0.6], glow: 1 })
    x.font = `800 40px ${INTER}`; x.letterSpacing = '4px'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = lite; x.fillText(s.name.toUpperCase(), 2, 80); x.letterSpacing = '0px'
    x.font = `italic 500 ${i === 8 ? 54 : 62}px ${SERIF}`; x.fillStyle = '#fff6e6'; x.fillText(INFO[i].hood, 0, 150)
    x.restore()
  }

  function turn(t) {
    drawSky(x, t, SKY_H)
    const fade = 1 - ease.inOutQuad(prog(t, LS - 0.15, LS + 0.35))          // the lesson takes the frame
    if (fade <= 0) return
    x.save(); x.globalAlpha *= fade
    turnBody(t)
    x.restore()
  }
  function turnBody(t) {
    const u = t - TN
    const wa = ease.outQuad(prog(u, 0, 0.6))
    const gl = x.createRadialGradient(540, 1180, 0, 540, 1180, 700); gl.addColorStop(0, `rgba(242,199,92,${0.14 * wa})`); gl.addColorStop(1, 'rgba(242,199,92,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = gl; x.fillRect(0, 0, W, H); x.restore()
    words(x, ['Know', 'your', { w: 'sign?', col: '#ff8fb1' }], { top: 190, size: 112, weight: 800, accSize: 136 }, t, TN + 0.05, { step: 0.09, back: 2.2 })
    words(x, ['Now', 'find', 'who', '\n', { w: 'lines', col: GOLD }, { w: 'up', col: GOLD }, 'with', 'it.'], { top: 370, size: 100, weight: 800, accSize: 128, lh: 1.08 }, t, TN + 0.85, { step: 0.08, back: 2.2 })
    // the two cards slide in from the sides and lean together
    const linked = prog(u, LINK[1] - TN, LINK[1] - TN + 0.2)
    PAIR.forEach((si, j) => {
      const sd = j ? 1 : -1
      const k = easeOutBack(prog(u, 0.25 + j * 0.12, 0.85 + j * 0.12), 1.5)
      const lean = lerp(sd * 0.16, sd * 0.06, ease.inOutCubic(prog(u, 1.3, 1.7)))
      const near = 0
      const bob = 8 * Math.sin(t * 2.4 + j * 1.6)
      const hop = linked > 0 ? Math.abs(Math.sin((u - (LINK[1] - TN)) * 9)) * Math.exp(-(u - (LINK[1] - TN)) * 3.5) * 40 : 0
      miniCard(si, lerp(CARD.xs[j] + sd * 900, CARD.xs[j] - sd * near, k), CARD.y + bob - hop, lean, CARD.s, t)
    })
    // gold link between the two glyphs
    const lk = ease.inOutCubic(prog(t, LINK[0], LINK[1]))
    if (lk > 0) {
      const ax = CARD.xs[0] + 34, bx = CARD.xs[1] - 34, ay = CARD.y - 80
      const pulse = 1 + 0.35 * Math.exp(-Math.max(0, t - LINK[1]) * 4)
      x.save(); x.beginPath()
      for (let k = 0; k <= 40 * lk; k++) { const v = k / 40, px = lerp(ax, bx, v), py = ay - Math.sin(Math.PI * v) * 150 + 8 * Math.sin(t * 3 + v * 6) * v * (1 - v); k ? x.lineTo(px, py) : x.moveTo(px, py) }
      ink(x, GOLD, { w: 12 * pulse, fa: 0, glow: 34 }); x.restore()
      for (const px of [ax, bx]) { x.beginPath(); x.arc(px, ay, 16 * pulse, 0, TAU); ink(x, GOLD, { w: 4, fa: 1, glow: 26 }) }
    }
    const hk = easeOutBack(prog(t, LINK[1], LINK[1] + 0.4), 3)
    if (hk > 0.01) {
      const hb = 1 + 0.1 * Math.max(0, Math.sin((t - LINK[1]) * 8))
      x.save(); x.translate(540, CARD.y - 240); x.scale(hk * hb * 1.2, hk * hb * 1.2)
      x.beginPath(); x.moveTo(0, 42); x.bezierCurveTo(-70, -6, -46, -62, 0, -26); x.bezierCurveTo(46, -62, 70, -6, 0, 42); x.closePath(); ink(x, PINK, { w: 8, fa: 0.7, glow: 28 })
      x.restore()
      const fk = prog(t, LINK[1], LINK[1] + 0.6)
      if (fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(540, CARD.y - 240, 50 + 170 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 10 * (1 - fk) + 2, fa: 0, glow: 30 }); x.restore() }
    }
    sparkle(x, 540, CARD.y - 240, t, LINK[1], { n: 18, rad: 340, seed: 77, size: 32, cols: [PINK, GOLD, '#fff3e0', '#c9a6ff'] })
  }

  function endLine(t) {
    drawSky(x, t, SKY_H)
    const u = t - E0
    const op = OUT, k = 1 - ease.inCubic(prog(t, op[0], op[1])), sw0 = 1 + 0.1 * Math.sin(Math.PI * Math.min(1, prog(t, op[0], op[1]) * 2.2))
    if (k <= 0.001) return
    x.save(); x.globalAlpha = k; x.translate(540, 960); x.scale(lerp(0.9, 1, k) * (k < 1 ? sw0 : 1), lerp(0.9, 1, k) * (k < 1 ? sw0 : 1)); x.translate(-540, -960)
    const wa = ease.outQuad(prog(u, 0, 0.6))
    const gl = x.createRadialGradient(540, 900, 0, 540, 900, 700); gl.addColorStop(0, `rgba(242,199,92,${0.16 * wa})`); gl.addColorStop(1, 'rgba(232,98,138,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = gl; x.fillRect(0, 0, W, H); x.restore()
    // the tags pop around it
    TAGS.forEach((tg, i) => {
      const [tx, ty, tr] = TAG_POS[i], t0 = E0 + 0.55 + i * 0.075
      const tk = easeOutBack(prog(t, t0, t0 + 0.34), 2.6)
      if (tk <= 0.01) return
      const col = SIGNS[i].color
      x.save(); x.translate(tx, ty + 6 * Math.sin(t * 2.5 + i)); x.rotate(tr + (t > t0 ? 0.12 * Math.exp(-(t - t0) * 5) * Math.sin((t - t0) * 16) : 0)); x.scale(tk, tk)
      x.font = `700 46px ${INTER}`; const tw = x.measureText(tg).width
      const w = tw + 128, h = 92
      rr(x, -w / 2, -h / 2, w, h, 46); x.fillStyle = hexA(tint(col, VOID, 0.55), 0.92); x.fill(); ink(x, tint(col, '#ffffff', 0.3), { w: 5, fa: 0, glow: 18 })
      x.font = `bold 50px ${GLYPH}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = tint(col, '#ffffff', 0.45); x.fillText(SIGNS[i].glyph + VS, -w / 2 + 50, 3)
      x.font = `700 46px ${INTER}`; x.fillStyle = BONE; x.fillText(tg, 26, 2)
      x.restore()
    })
    // dark halo so the line reads over the tags
    const hg = x.createRadialGradient(540, 880, 60, 540, 880, 520); hg.addColorStop(0, hexA(VOID, 0.55 * wa)); hg.addColorStop(1, hexA(VOID, 0))
    x.fillStyle = hg; x.fillRect(0, 400, W, 1000)
    words(x, ['Tag', 'your', '\n', { w: 'neighborhood.', col: GOLD }], { top: 680, size: 168, weight: 800, accSize: 158, lh: 1.0 }, t, E0 + 0.05, { step: 0.12, back: 2.4, dur: 0.34, wobbleLast: true })
    const sw = ease.inOutCubic(prog(u, 0.55, 0.9))
    if (sw > 0) {
      x.save(); x.beginPath()
      for (let j = 0; j <= 30 * sw; j++) { const v = j / 30, xx = lerp(170, 910, v), yy = 1060 + 22 * Math.sin(v * Math.PI * 1.6 + 0.4) - 10 * v; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
      ink(x, GOLD, { w: 12, fa: 0, glow: 22 }); x.restore()
    }
    sparkle(x, 540, 900, t, E0 + 0.4, { n: 16, rad: 380, seed: 99, size: 36 })
    x.restore()
  }

  const LAYERS = [hook, ...SIGNS.map((_, i) => t => sign(i, t)), turn, endLine]
  const edgeCol = k => k >= 1 && k <= 12 ? tint(SIGNS[k - 1].color, '#ffffff', 0.45) : GOLD

  function transition(k, p, t) {
    const kind = KIND[k - 1], newL = LAYERS[k], oldL = LAYERS[k - 1], ec = edgeCol(k)
    oldL(t)
    const edgeA = Math.sin(Math.PI * clamp(p))
    if (kind === 'twin') {
      const e = ease.outCubic(p), off = (1 - e) * 600
      ;[[0, -off], [540, off]].forEach(([cx, dx]) => { x.save(); x.beginPath(); x.rect(cx + dx, 0, 540, H); x.clip(); x.translate(dx, 0); newL(t); x.restore() })
      x.save(); x.globalAlpha = edgeA; x.beginPath(); x.moveTo(540 - off, 0); x.lineTo(540 - off, H); x.moveTo(540 + off, 0); x.lineTo(540 + off, H); ink(x, ec, { w: 14, fa: 0, glow: 30 }); x.restore()
      return
    }
    if (kind === 'swing') {
      const ang = lerp(-1.2, 0, easeOutBack(p, 1.8))
      const tr = () => { x.translate(540, -700); x.rotate(ang); x.translate(-540, 700) }
      x.save(); tr(); x.beginPath(); x.rect(0, 0, W, H); x.clip(); newL(t); x.restore()
      x.save(); tr(); x.globalAlpha = edgeA; x.beginPath(); x.rect(0, 0, W, H); ink(x, ec, { w: 16, fa: 0, glow: 30 }); x.restore()
      return
    }
    x.save(); const edge = maskPath(x, kind, p); x.clip(); newL(t); x.restore()
    x.save(); x.globalAlpha = edgeA; edge(); ink(x, ec, { w: kind === 'pixels' ? 6 : 14, fa: 0, glow: 30 }); x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      let k = 0
      for (let j = 0; j < WIPE.length; j++) if (t >= WIPE[j]) k = j
      const p = k > 0 ? (t - WIPE[k]) / DUR[KIND[k - 1]] : 1
      x.save()
      if (p < 1) transition(k, p, t); else LAYERS[k](t)
      x.restore()
      box1.update(t); box2.update(t)
      lesson.update(t)
      drawGrain(gx, t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
    },
  }
}

// card-motif cuts: candidates before every card (hook → ♈, between all twelve sign cards, ♓ → the turn, → the end line),
// 0.07 s before each downbeat; cardfx keeps three: 7.197 (→ ♊), 18.308 (→ ♏), 27.197 (→ ♓).
const CUT_KINDS = ['flip', 'deal', 'shuffle', 'flip', 'fan', 'deal', 'flip', 'shuffle', 'deal', 'flip', 'fan', 'shuffle', 'deal', 'flip']
const CUTS = [...S, TN, E0].map((t, i) => ({ t: +(t - 0.07).toFixed(3), kind: CUT_KINDS[i], ...(i % 4 === 3 ? { dir: -1 } : {}), ...(i === 8 ? { from: 'left' } : i === 12 ? { from: 'right' } : {}) }))
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const MEL = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const BASS = [146.83, 164.81, 185, 196, 220, 246.94, 277.18, 293.66, 329.63, 369.99, 392, 440]   // a rising line, one per sign
const count = items => items.filter(w => w !== '\n').length
const GAGS = [1.15, 1.15, 0.55, 1.1, 1.15, 1.2, 1.1, 1.6, 0.5, 0.45, 0.6, 0.9]                // each landmark's gag moment (u)
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(0.1 + i * 0.07).toFixed(3), [784, 880, 988, 1175, 1318, 1568][i], 0.05, (i - 2.5) * 0.15]),
  ['whoosh', 0.05, 0.4, 0.03],
  ...PINS.map((P, i) => ['pop', +(P.t + 0.22).toFixed(3), MEL[(i * 3) % 7], 0.04, (P.x - 540) / 600]),
  ['glitter', beat(0) + 0.2, beat(0) + 1.2], ['tick', beat(2), 0.05], ['tick', beat(3), 0.05],
  ['riser', beat(2), WIPE[1] + 0.15, 0.03],
  // signs
  ...SIGNS.flatMap((s, i) => {
    const t = S[i], o = []
    // the colour wipe's own whoosh, unless a card cut plays over this change (it brings its own)
    if (!cutPlays(CUTS, CUTS[i].t)) o.push(['whoosh', +(WIPE[i + 1] - 0.05).toFixed(3), DUR[KIND[i]] + 0.1, 0.045])
    o.push(['pop', t, MEL[(i * 2) % 7], 0.065, 0], ['pluck', t, BASS[i], 0.06, 0.7, 0])
    o.push(['pop', +(t + 0.2).toFixed(3), MEL[(i * 2 + 2) % 7], 0.05, 0.2], ['pluck', +(t + 0.22).toFixed(3), MEL[(i * 2 + 4) % 7], 0.04, 0.5, 0])
    o.push(['pop', +(t + 0.4).toFixed(3), MEL[(i + 4) % 7] * 0.75, 0.05, -0.2])
    const g = +(t + GAGS[i]).toFixed(3)
    o.push(i % 3 === 0 ? ['bell', g, 1174.66, 0.03, 1.2, 0] : i % 3 === 1 ? ['glitter', g, g + 0.4] : ['pop', g, 1318.51, 0.05, 0.3])
    return o
  }),
  ['tick', S[2] + 0.9, 0.05], ['tick', S[2] + 1.25, 0.05],                 // Midtown plan bubbles
  ['pop', S[1] + 1.15, 1567.98, 0.05, 0],                                       // Heights mimosa clink
  ...[0.62, 0.7, 0.78, 0.84].map(d => ['tick', +(S[10] + d).toFixed(3), 0.04]),  // Montrose neon flicker
  ['whoosh', S[8] + 0.5, 1.2, 0.025],                                           // runner
  // turn
  ...(cutPlays(CUTS, CUTS[12].t) ? [] : [['whoosh', +(WIPE[13] - 0.05).toFixed(3), 0.5, 0.05]]), ['boom', TN, 0.08],
  ...[0, 1, 2].map(i => ['pop', +(TN + 0.05 + i * 0.09).toFixed(3), [880, 988, 1318.51][i], 0.05, (i - 1) * 0.2]),
  ['whoosh', TN + 0.25, 0.5, 0.04], ['pop', TN + 0.8, 587.33, 0.05, -0.5], ['pop', TN + 0.92, 739.99, 0.05, 0.5],
  ...[0, 1, 2, 3, 4, 5, 6].map(i => ['pop', +(TN + 0.85 + i * 0.08).toFixed(3), MEL[(i + 2) % 7], 0.03, (i - 3) * 0.12]),
  ['riser', LINK[0] - 0.4, LINK[1], 0.035],
  ['pluck', LINK[0] + 0.2, 987.77, 0.045, 0.7, -0.3], ['pluck', LINK[1] - 0.05, 1318.51, 0.045, 0.7, 0.3],
  ['bell', LINK[1], 1174.66, 0.05, 1.6, 0], ['bell', LINK[1] + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', LINK[1], LINK[1] + 0.7],
  // end line
  ...(cutPlays(CUTS, CUTS[13].t) ? [] : [['whoosh', +(WIPE[14] - 0.05).toFixed(3), 0.55, 0.05]]),
  ...[0, 1, 2].map(i => ['pop', +(E0 + 0.05 + i * 0.12).toFixed(3), [880, 988, 1318.51][i], 0.06, (i - 1) * 0.2]),
  ['bell', E0 + 0.3, 1318.51, 0.035, 1.8, 0], ['boom', E0, 0.09], ['glitter', E0 + 0.3, E0 + 1.6],
  ...TAGS.map((_, i) => ['pop', +(E0 + 0.55 + i * 0.075).toFixed(3), MEL[(i * 3) % 7], 0.028, TAG_POS[i][0] > 540 ? 0.45 : -0.45]),
  ['whoosh', OUT[0], 0.4, 0.035],
  ['pop', 0.5, 739.99, 0.045, 0.3], ['bell', 0.55, 1318.51, 0.02, 0.8, 0.3],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SPEAK]: 700, ...Object.fromEntries(SIGNS.map((_, i) => [NAME(i), 560 + i * 45])) } }), ...talkCues(LINES2, { cps: CPS, pitch: { [SPEAK]: 700 } }),
  ...[3, 6].flatMap(i => [0, 0.16, 0.32].map((d, k) => ['chip', +(S[i] + 1.3 + d).toFixed(3), 1320 * (1 - k * 0.06), 0.12, { bus: 'sfx', rev: 0.14, dly: 0, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])),
  ...[0, 0.16, 0.32, 0.6, 0.76].map((d, k) => ['chip', +(S[11] + 0.6 + d).toFixed(3), 1250 * (1 - (k % 3) * 0.06), 0.12, { bus: 'sfx', rev: 0.14, dly: 0, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }]),
  ...lessonCues(LS, { ...LESSON, key: 'A' }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
