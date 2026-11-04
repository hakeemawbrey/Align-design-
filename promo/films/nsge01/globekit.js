// SNOW GLOBE CITIES kit: the shared look and timeline of "Remix: Snow Globe Cities" (nsge01–nsge14, NEXT30-BUILD.md,
// rows in promo/films/next30/b16.md). Each episode's scenes/index.js passes one config to globeFilm() and gets back
// { DURATION, SCENES, CUES }. Everything draws as a pure function of t; DOM / offscreen canvases are only made inside
// build(). Nothing touches `document` at module top level (the sound build imports this file in node).
//
//   globeFilm(cfg) → { DURATION, SCENES, CUES }
//     cfg.city       'MINNEAPOLIS' (the plaque on the base)
//     cfg.hero       sign id inside the globe at t = 0;  cfg.partner  sign id who arrives at the turn (or is there from t = 0 with duo: true)
//     cfg.heads      [hook, gags, turn, last line] popText strings ('|' = break, *word* = accent); cfg.accents = 4 colours
//     cfg.lines      5 box lines [hook-hero, hook-stars, gag reaction, turn-stars, turn reply]: { who: 'hero'|'partner'|'stars', text }
//     cfg.gags       3 × { bm: bitmap key or rows, cols?, label: 'two|lines' }   (the third is the twist)
//     cfg.tie        { kind: 'talk', img: 'card-talk-6.png' } | { kind: 'mystery' } | { kind: 'deck' } | { kind: 'deal', text } | null
//     cfg.skyline    primitives drawn inside the globe (see drawSkyline)
//     cfg.inside     { top, bottom } globe sky colours; cfg.precip 'snow' | 'rain'
//     cfg.heroProp   { bm, cols, dx, dy, cell, until } a prop held by the hero in the hook (the thumbnail action)
//     cfg.draw(x, t, layer, K)   optional per-film drawing ('back' behind the stars, 'front' in front, 'over' outside the glass)
//     cfg.pos        optional overrides of the star positions; cfg.mood(t, who) optional mood override
//     cfg.music      { style, key, seed }
import { clamp, lerp, prog, ease, el, rng } from '../../src/lib.js'
import { fill, A } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../startalk.js'
import { popText } from '../lesson.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', ICE = '#bfe6ff', SNOW = '#f4f8ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

export const DURATION = 30
export const STORY_END = DURATION - ENDCARD_LEN       // 25.6
// the globe: glass centre + radius, base under it
export const GL = { cx: 540, cy: 890, r: 360, groundY: 1072, baseTop: 1222, baseBot: 1360 }

// ── the shared timeline (identical in every episode, so the series has one rhythm)
export const T = {
  bug: -1, h0: -1.2, h0Out: [6.12, 6.32],
  box1: { open: 0.7, close: 6.25 }, l0: 0.95, l1: 3.55,
  h1: 6.42, h1Out: [12.45, 12.65], gags: [6.95, 8.15, 9.35], gagOut: [12.3, 12.62],
  box2: { open: 9.75, close: 12.7 }, l2: 9.95,
  cut: 12.9,
  h2: 13.02, h2Out: [19.85, 20.05], partnerIn: 13.3,
  box3: { open: 13.45, close: 19.95 }, l3: 13.65, l4: 16.55,
  h3: 20.15, h3Land: 20.8, shake: 20.25, together: 20.6, tie: [21.25, 21.7], fountain: 21.6,
  out: [25.08, 25.48], h3Out: [25.18, 25.45], bugOut: [25.3, 25.55],
}
const CPS = 30

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1, sy = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, sy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch] || '#ff00ff'; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

/** a ring of pixel sparkles bursting out at t0 */
export function sparkles(x, t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
  const tt = t - t0
  if (tt < 0 || tt > 0.7) return
  const p = ease.outCubic(tt / 0.7)
  x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + seed
    drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
  }
  x.restore()
}

// ── star sprite frame (mirrors startalk.js drawStarChar) so props / tears sit on the sprite through hops and squash
const G = 36, HALF = 18
const FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** tears from both eyes (sprite cells), k: 1 sniffle · 2 streams · 3 fountains; frozen: the drops are sparkly ice */
export function tearsCells(ctx, t, k, frozen = false) {
  if (k <= 0) return
  const drop = (i, j) => {
    ctx.fillStyle = INK; ctx.fillRect(i - 0.15, j - 0.15, 1.3, 1.7)
    ctx.fillStyle = frozen ? '#e8f6ff' : '#8fe3ff'; ctx.fillRect(i, j, 1, 1.4); ctx.fillStyle = frozen ? GOLD : '#ffffff'; ctx.fillRect(i, j, 0.5, 0.5)
  }
  const n = k >= 3 ? 9 : k >= 2 ? 5 : 2, rate = k >= 3 ? 1.9 : k >= 2 ? 1.2 : 0.7
  for (const d of [-1, 1]) {
    const ex = d < 0 ? 10.2 : 25.2
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.13 : 0)) % 1 + 1) % 1
      if (k === 1 && ph > 0.75) continue
      let px, py
      if (k >= 3) { px = ex + d * 15 * ph; py = 20 - 9 * ph + 24 * ph * ph }
      else if (k === 2) { px = ex + d * 3.5 * ph; py = 20.5 + 15 * ph * ph }
      else { px = ex + d * 0.6 * ph; py = 21 + 8 * ph * ph }
      drop(px, py)
    }
  }
}

// ═══════════════════════════════════════════ pixel props (rows of cells; '.' = empty)
export const BITS = {
  map: { rows: ['BBBBBBBBBBBB', 'BRRBYYBGGBCB', 'BRBBYBBGBBCB', 'BBRRBYYBGGBB', 'BCBBRBBYBBGB', 'BCCBRRBYYBGB', 'BBCBBRBBYBBB', 'BBBBBBBBBBBB'], cols: { B: BONE, R: '#ff6b6b', Y: '#ffd23a', G: '#5fd38a', C: '#7fd0ff' } },
  bowl: { rows: ['..S..S..S...', '...S..S..S..', '............', 'WWWWWWWWWWWW', 'WOOOOYOOOYOW', '.WOYOOOOOOW.', '..WWWWWWWW..', '...WWWWWW...'], cols: { S: '#dfe8ff', W: '#e9ddc8', O: '#d9893a', Y: '#ffe9a0' } },
  chair: { rows: ['.RRRRRRRR.', '.RWRWRWRR.', '.RRWRWRWR.', '.RWRWRWRR.', '.RRRRRRRR.', 'GGGGGGGGGG', '.G......G.', '.G......G.', 'G........G'], cols: { R: '#ff6b6b', W: BONE, G: '#9aa3b8' } },
  bench: { rows: ['BBBBBBBBBBBB', 'B..........B', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.K........K.', '.K........K.', '.K........K.'], cols: { B: '#b07a4a', K: '#3a3350' } },
  train: { rows: ['..CCCCCCCC..', '.CWWCWWCWWC.', '.CWWCWWCWWC.', '.CCCCCCCCCC.', '.CYCCCCCCYC.', '.CCCCCCCCCC.', '..K......K..'], cols: { C: '#7fd0ff', W: '#e8f6ff', Y: '#ffd23a', K: '#3a3350' } },
  snowflake: { rows: ['....W....', '.W..W..W.', '..W.W.W..', '...WWW...', 'WWWWWWWWW', '...WWW...', '..W.W.W..', '.W..W..W.', '....W....'], cols: { W: SNOW } },
  sun: { rows: ['....Y....', '.Y.....Y.', '...OOO...', '..OYYYO..', 'Y.OYYYO.Y', '..OYYYO..', '...OOO...', '.Y.....Y.', '....Y....'], cols: { Y: '#ffd23a', O: '#ff9a3a' } },
  pretzel: { rows: ['.PPP..PPP.', 'P...PP...P', 'P...PP...P', '.P.P..P.P.', '..PP..PP..', '.P..PP..P.', 'P...PP...P', '.PPP..PPP.'], cols: { P: '#c8803a' } },
  bell: { rows: ['....KK....', '...BBBB...', '..BBBBBB..', '..BBKBBB..', '..BBBKBB..', '.BBBKBBBB.', '.BBBBKBBB.', 'BBBBBBBBBB', '....BB....'], cols: { B: '#c9a35a', K: '#3a2a18' } },
  phone: { rows: ['KKKKKKKK', 'KWWWWWWK', 'KWPPPWWK', 'KWWWWWWK', 'KWWCCCWK', 'KWWWWWWK', 'KWPPWWWK', 'KWWWWWWK', 'KKKWWKKK', 'KKKKKKKK'], cols: { K: '#3a3350', W: '#e8f6ff', P: PINK, C: '#7fd0ff' } },
  bridge: { rows: ['Y..........Y', 'YY........YY', 'Y.Y......Y.Y', 'Y..YYYYYY..Y', 'YYYYYYYYYYYY', 'Y..........Y'], cols: { Y: '#ffc93a' } },
  incline: { rows: ['..........RR', '........RRWR', '......RRRRRR', '....KK.K..K.', '..KK........', 'KK..........'], cols: { R: '#ff6b6b', W: '#ffe9a0', K: '#9aa3b8' } },
  moon: { rows: ['..MMMM..', '.MMM....', 'MMM.....', 'MMM.....', 'MMM.....', 'MMM.....', '.MMM....', '..MMMM..'], cols: { M: '#ffe9a0' } },
  moose: { rows: ['A..A..A..A', 'AAAA..AAAA', '...BBBB...', '..BBBBBB..', '..BKBBKB..', '..BBBBBB..', '...BBBB...', '...BNNB...', '....BB....'], cols: { A: '#d9c19a', B: '#7a4e2e', K: INK, N: '#4a2e1a' } },
  eyes: { rows: ['.KKKK..KKKK.', 'KWWWWKKWWWWK', 'KWWKKKKWWKKK', 'KWWKKKKWWKKK', 'KWWWWKKWWWWK', '.KKKK..KKKK.'], cols: { K: INK, W: BONE } },
  umbrella: { rows: ['....BB....', '..BBBBBB..', '.BBLBBLBB.', 'BBBBBBBBBB', '....K.....', '....K.....', '....K.....', '.K..K.....', '..KK......'], cols: { B: '#5a7cf0', L: '#8fb0ff', K: '#3a3350' } },
  rain: { rows: ['..CCCC....', '.CCCCCCC..', 'CCCCCCCCC.', '.CCCCCCCC.', '..........', '.D..D..D..', '..D..D..D.', '.D..D..D..'], cols: { C: '#9aa8c8', D: '#7fd0ff' } },
  mountain: { rows: ['.....W.....', '....WWW....', '...WWGWW...', '..WGGGGGW..', '.GGGGGGGGG.', 'GGGGGGGGGGG'], cols: { W: SNOW, G: '#5a6a9a' } },
  camera: { rows: ['..KKK.....', 'KKKKKKKKKK', 'KWWWKKKWWK', 'KWWKCCKWWK', 'KWWKCCKWWK', 'KWWWKKKWWK', 'KKKKKKKKKK'], cols: { K: '#3a3350', W: '#9aa3b8', C: '#7fd0ff' } },
  briefcase: { rows: ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBYYBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB'], cols: { K: '#3a3350', B: '#8a5a3a', Y: '#ffd23a' } },
  skate: { rows: ['..BBB.....', '..BBB.....', '..BBB.....', '..BBBBBB..', '.BBBBBBBB.', '..K....K..', 'SSSSSSSSSS'], cols: { B: BONE, K: '#9aa3b8', S: '#cfe6ff' } },
  clock: { rows: ['..WWWW..', '.W....W.', 'W...K..W', 'W...K..W', 'W...KKKW', 'W......W', '.W....W.', '..WWWW..'], cols: { W: BONE, K: INK } },
  heart: { rows: ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...'], cols: { P: '#ff4f86' } },
  thermo: { rows: ['..WW..', '.W..W.', '.W..W.', '.WCCW.', '.WCCW.', '.WCCW.', 'WCCCCW', 'WCCCCW', '.WWWW.'], cols: { W: BONE, C: '#7fd0ff' } },
  thermoHot: { rows: ['..WW..', '.WRRW.', '.WRRW.', '.WRRW.', '.WRRW.', '.WRRW.', 'WRRRRW', 'WRRRRW', '.WWWW.'], cols: { W: BONE, R: '#ff6b6b' } },
  tear: { rows: ['...C...', '..CCC..', '.CCWCC.', 'CCWCCCC', 'CCCCCCC', '.CCCCC.', '..CCC..'], cols: { C: '#bfe6ff', W: '#ffffff' } },
  statue: { rows: ['...CCC...', '..CCCCC..', '..CWCWC..', '..CCCCC..', '...CCC...', '..CCCCC..', '.CCCCCCC.', '..CCCCC..', '.CCCCCCC.'], cols: { C: '#bfe6ff', W: '#ffffff' } },
  wall: { rows: ['S.S.S.S.S.S', 'SSSSSSSSSSS', 'SDSSSDSSSDS', 'SSSSSSSSSSS', 'SSDSSSDSSSD', 'SSSSSSSSSSS'], cols: { S: '#b8aa98', D: '#8a7e70' } },
  shell: { rows: ['....OO....', '..OOOOOO..', '.OPOPOPOO.', 'OOPOPOPOPO', 'OPOPOPOPOO', '.OOOOOOOO.'], cols: { O: '#ff8f6a', P: '#ffd0b8' } },
  taffy: { rows: ['.....K', '....K.', '...K..', '.AAA..', 'AAAAA.', 'AAAAA.', '.AAA..', 'WWWWWW'], cols: { K: '#d9c19a', A: '#d98a2a', W: SNOW } },
  hand: { rows: ['.Y.Y.Y.', '.Y.Y.Y.', '.YYYYY.', 'YYYYYYY', '.YYYYYY', '..YYYYY', '...YYY.'], cols: { Y: '#ffd9a0' } },
  flags: { rows: ['RRY..YBB', 'RYY..YYB', 'YYK..KYY', '..K..K..', '..K..K..', '..K..K..'], cols: { R: '#ff6b6b', Y: '#ffd23a', B: '#5a7cf0', K: '#3a3350' } },
  pierogi: { rows: ['..YYYYY..', '.YWYWYWY.', 'YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.'], cols: { Y: '#f0d08a', W: '#ffe9c0' } },
  cocoa: { rows: ['.S..S.', '..S..S', 'WWWWWW.', 'WBBBBWW', 'WBBBBW.W', 'WBBBBWW', '.WWWW..'].map(r => r.padEnd(8, '.')), cols: { S: '#dfe8ff', W: '#ff8fa0', B: '#7a4e2e' } },
  mittens: { rows: ['.RR...RR.', 'RRRR.RRRR', 'RRRRRRRRR', 'RRRRRRRRR', 'RRRR.RRRR', 'WWWW.WWWW'], cols: { R: '#ff6b6b', W: BONE } },
  scarf: { rows: ['RWRWRWRWRW', 'WRWRWRWRWR', '........RW', '........WR', '........RW', '........WR'], cols: { R: '#ff6b6b', W: BONE } },
  shovel: { rows: ['..K', '..K', '..K', '..K', '..K', 'SSSSS', 'SSSSS', 'SSSSS'].map(r => r.padEnd(5, '.')), cols: { K: '#b07a4a', S: '#9aa3b8' } },
  skis: { rows: ['R..........R', '.R........R.', '..RRRRRRRR..'], cols: { R: '#ff6b6b' } },
  curds: { rows: ['..YY.YY..', '.YYYYYYY.', 'YYWYYYWYY', 'BBBBBBBBB', '.BBBBBBB.'], cols: { Y: '#ffd23a', W: '#fff1a0', B: '#e9ddc8' } },
  blanket: { rows: ['PPPPPPPPPP', 'PWPPWPPWPP', 'PPPPPPPPPP', 'PPWPPWPPWP', 'PPPPPPPPPP'], cols: { P: '#c9a6ff', W: '#efe6d6' } },
  bagel: { rows: ['..BBBBB..', '.BBYBYBB.', 'BBB...BBB', 'BBB...BBB', '.BBYBYBB.', '..BBBBB..'], cols: { B: '#c8803a', Y: '#ffe9a0' } },
  calendar: { rows: ['.K....K.', 'RRRRRRRR', 'WWWWWWWW', 'WKWKWKWW', 'WWWWWWWW', 'WKWKWPPW', 'WWWWWWWW'], cols: { K: '#3a3350', R: '#ff6b6b', W: BONE, P: '#ff4f86' } },
}
const bitsOf = g => (typeof g.bm === 'string' ? BITS[g.bm] : { rows: g.bm, cols: g.cols })

// ═══════════════════════════════════════════ the skyline inside the globe
// primitives (x in frame px, y up from GL.groundY in px; P = 8 px cells):
//   { k: 'blocks', x0, x1, seed, min, max, col }        random city blocks with lit windows
//   { k: 'tower', x, w, h, col, tip }                     a tall tower (tip: 'spire' | 'antenna' | 'flat')
//   { k: 'dome', x, w, h, col }                           a domed building
//   { k: 'peaks', list: [[x, h, w]], col, snow }          mountains behind the city
//   { k: 'hill', x, w, h, col }                           a round hill
//   { k: 'cross', x, y, h }                               a lit cross on a hill (y up from ground)
//   { k: 'rows', x0, x1, h, cols }                        row houses / brownstones with stoops
//   { k: 'bridge', x0, x1, y, h, col }                    an arch bridge (y up from ground)
//   { k: 'river', y0, y1, col }                           a frozen river band in front (y up from ground)
//   { k: 'trees', x0, x1, seed, h }                       snowy pines
//   { k: 'roofs', x0, x1, seed, h, cols }                 steep old-town roofs
//   { k: 'walls', x0, x1, h, col }                        crenellated stone walls
const P = 8
export function drawSkyline(x, list, t) {
  const gy = GL.groundY
  const win = (bx, by, bw, bh, seed) => {
    const R = rng(seed)
    for (let j = by + P; j < by + bh - P; j += P * 2) for (let i = bx + P; i < bx + bw - P; i += P * 2) {
      const on = R() < 0.55
      if (!on) continue
      const fl = 0.75 + 0.25 * Math.sin(t * 1.3 + i * 0.7 + j * 0.3)
      x.fillStyle = `rgba(255,214,140,${(0.75 * fl).toFixed(3)})`; x.fillRect(i, j, P, P)
    }
  }
  for (const p of list) {
    if (p.k === 'peaks') for (const [px, ph, pw] of p.list) {
      const w = pw || ph * 1.4
      for (let j = 0; j < ph; j += P) {
        const half = Math.round((w / 2) * (1 - j / ph) / P) * P
        x.fillStyle = p.snow !== false && j > ph * 0.68 ? SNOW : (p.col || '#3a4a7a')
        x.fillRect(px - half, gy - j - P, half * 2, P)
      }
    }
    else if (p.k === 'hill') {
      for (let j = 0; j < p.h; j += P) {
        const half = Math.round((p.w / 2) * Math.sqrt(1 - (j / p.h) ** 2) / P) * P
        x.fillStyle = j > p.h - P * 2 ? SNOW : (p.col || '#2e3a66'); x.fillRect(p.x - half, gy - j - P, half * 2, P)
      }
    }
    else if (p.k === 'cross') {
      const cy = gy - p.y, a = 0.75 + 0.25 * Math.sin(t * 2)
      x.save(); x.shadowColor = '#fff1c8'; x.shadowBlur = 18
      x.fillStyle = `rgba(255,241,200,${a.toFixed(3)})`; x.fillRect(p.x - P / 2, cy - p.h, P, p.h); x.fillRect(p.x - P * 2, cy - p.h * 0.72, P * 4, P)
      x.restore()
    }
    else if (p.k === 'blocks') {
      const R = rng(p.seed || 3); let bx = p.x0
      while (bx < p.x1) {
        const bw = (3 + Math.floor(R() * 4)) * P, bh = Math.round(lerp(p.min, p.max, R()) / P) * P
        x.fillStyle = p.col || '#232a52'; x.fillRect(bx, gy - bh, bw - P / 2, bh)
        x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(bx, gy - bh, P, bh)
        x.fillStyle = SNOW; x.fillRect(bx, gy - bh - P / 2, bw - P / 2, P / 2 + 1)
        win(bx, gy - bh, bw - P / 2, bh, (p.seed || 3) * 31 + bx)
        bx += bw
      }
    }
    else if (p.k === 'tower') {
      x.fillStyle = p.col || '#2a3260'; x.fillRect(p.x - p.w / 2, gy - p.h, p.w, p.h)
      x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect(p.x - p.w / 2, gy - p.h, P, p.h)
      win(p.x - p.w / 2, gy - p.h, p.w, p.h, p.x * 7)
      if (p.tip === 'spire') for (let j = 0; j < 6; j++) { const hw = Math.max(P / 2, (p.w / 2) * (1 - j / 6)); x.fillStyle = p.col || '#2a3260'; x.fillRect(p.x - hw, gy - p.h - (j + 1) * P, hw * 2, P) }
      if (p.tip === 'antenna') { x.fillStyle = '#9aa3b8'; x.fillRect(p.x - 2, gy - p.h - P * 6, 4, P * 6); x.fillStyle = (t % 1.2) < 0.6 ? '#ff6b6b' : '#7a2a3a'; x.fillRect(p.x - 4, gy - p.h - P * 6 - 4, 8, 8) }
      x.fillStyle = SNOW; x.fillRect(p.x - p.w / 2, gy - p.h - P / 2, p.w, P / 2 + 1)
    }
    else if (p.k === 'dome') {
      x.fillStyle = p.col || '#2a3260'; x.fillRect(p.x - p.w / 2, gy - p.h, p.w, p.h)
      win(p.x - p.w / 2, gy - p.h, p.w, p.h, p.x * 5)
      const r = p.w * 0.32
      for (let j = 0; j < r; j += P) { const hw = Math.round(Math.sqrt(r * r - j * j) / P) * P; x.fillStyle = j > r - P * 2 ? SNOW : '#3a4a7a'; x.fillRect(p.x - hw, gy - p.h - j - P, hw * 2, P) }
      x.fillStyle = '#9aa3b8'; x.fillRect(p.x - 2, gy - p.h - r - P * 3, 4, P * 3)
    }
    else if (p.k === 'rows') {
      const cols = p.cols || ['#7a3a3a', '#8a4a3a', '#6a3a4a']; let bx = p.x0, i = 0
      while (bx < p.x1) {
        const bw = P * 6, bh = p.h + (i % 2) * P
        x.fillStyle = cols[i % cols.length]; x.fillRect(bx, gy - bh, bw - 2, bh)
        x.fillStyle = SNOW; x.fillRect(bx - 2, gy - bh - P, bw + 2, P)
        x.fillStyle = '#3a2a2a'; x.fillRect(bx + P * 2, gy - P * 3, P * 2, P * 3)
        x.fillStyle = 'rgba(255,214,140,0.85)'; x.fillRect(bx + P, gy - bh + P * 2, P, P * 2); x.fillRect(bx + P * 4, gy - bh + P * 2, P, P * 2)
        if (bh > P * 9) { x.fillRect(bx + P, gy - bh + P * 6, P, P * 2); x.fillRect(bx + P * 4, gy - bh + P * 6, P, P * 2) }
        bx += bw; i++
      }
    }
    else if (p.k === 'bridge') {
      const y = gy - p.y, w = p.x1 - p.x0, col = p.col || '#ffc93a'
      x.fillStyle = col; x.fillRect(p.x0, y, w, P)
      for (let i = 0; i <= w; i += P) { const a = Math.sin(Math.PI * i / w) * p.h; x.fillRect(p.x0 + i, y - a, P, P); if ((i / P) % 3 === 0) x.fillRect(p.x0 + i, y - a, P / 2, a) }
      x.fillRect(p.x0, y, P, P * 4); x.fillRect(p.x1 - P, y, P, P * 4)
    }
    else if (p.k === 'river') {
      x.fillStyle = p.col || '#8fb8e0'; x.fillRect(GL.cx - GL.r, gy - p.y1, GL.r * 2, p.y1 - p.y0)
      x.fillStyle = 'rgba(255,255,255,0.35)'
      for (let i = 0; i < 9; i++) x.fillRect(GL.cx - GL.r + ((i * 97 + 40) % (GL.r * 2)), gy - p.y0 - P - (i % 3) * P, P * (2 + (i % 3)), P / 2)
    }
    else if (p.k === 'trees') {
      const R = rng(p.seed || 5)
      for (let bx = p.x0; bx < p.x1; bx += P * (3 + Math.floor(R() * 3))) {
        const h = (p.h || 60) * (0.7 + 0.5 * R())
        for (let j = 0; j < h; j += P) { const hw = Math.max(P / 2, Math.round((h - j) * 0.32 / P) * P); x.fillStyle = (j / P) % 3 === 2 ? SNOW : '#1f4a3a'; x.fillRect(bx - hw, gy - j - P, hw * 2, P) }
      }
    }
    else if (p.k === 'roofs') {
      const R = rng(p.seed || 9), cols = p.cols || ['#6a5a7a', '#7a6a5a', '#5a6a7a']; let bx = p.x0, i = 0
      while (bx < p.x1) {
        const bw = P * (5 + Math.floor(R() * 3)), bh = (p.h || 70) * (0.8 + 0.4 * R())
        x.fillStyle = cols[i % cols.length]; x.fillRect(bx, gy - bh, bw - 2, bh)
        for (let j = 0; j < bw / 2; j += P) { x.fillStyle = j > bw / 2 - P * 2 ? '#3a3a4a' : SNOW; x.fillRect(bx + j, gy - bh - j - P, bw - 2 * j - 2, P) }
        x.fillStyle = 'rgba(255,214,140,0.85)'; x.fillRect(bx + P * 2, gy - bh + P * 2, P, P * 2)
        bx += bw; i++
      }
    }
    else if (p.k === 'walls') {
      const y = gy - p.h
      x.fillStyle = p.col || '#8a7e70'; x.fillRect(p.x0, y, p.x1 - p.x0, p.h)
      x.fillStyle = 'rgba(0,0,0,0.18)'; for (let j = y + P * 2; j < gy; j += P * 2) x.fillRect(p.x0, j, p.x1 - p.x0, 2)
      for (let i = p.x0; i < p.x1; i += P * 2) { x.fillStyle = p.col || '#8a7e70'; x.fillRect(i, y - P, P, P); x.fillStyle = SNOW; x.fillRect(i, y - P - 3, P, 3) }
    }
  }
}

// ═══════════════════════════════════════════ the globe
function snowLayer(x, t, { n = 110, seed = 11, shake = 0, rain = false, tint = SNOW, size = 1 } = {}) {
  const R = rng(seed), top = GL.cy - GL.r, H2 = GL.r * 2
  for (let i = 0; i < n; i++) {
    const x0 = GL.cx - GL.r + R() * GL.r * 2, ph = R(), sp = rain ? 520 + R() * 260 : 38 + R() * 46, sz = (rain ? 1 : R() < 0.25 ? 2 : 1) * size
    const swirl = shake * (140 + R() * 120)
    let y = top + (((ph * H2 + t * sp) % H2) + H2) % H2
    let xx = x0 + (rain ? 0 : 16 * Math.sin(t * (0.8 + R()) + i))
    if (shake > 0.01) { const a = t * 6 + i; xx += Math.cos(a) * swirl * 0.6; y -= Math.abs(Math.sin(a * 0.7)) * swirl }
    x.fillStyle = tint
    if (rain) { x.globalAlpha = 0.7; x.fillRect(Math.round(xx / 2) * 2, Math.round(y), 3, 18); x.globalAlpha = 1 }
    else { const c = 5 * sz; x.fillRect(Math.round(xx - c / 2), Math.round(y - c / 2), c, c); if (sz > 1) { x.fillRect(Math.round(xx - c), Math.round(y - c / 4), c * 2, c / 2) } }
  }
}
function drawBase(x, city, t) {
  const top = GL.baseTop, bot = GL.baseBot
  const rows = Math.round((bot - top) / P)
  for (let j = 0; j < rows; j++) {
    const half = lerp(300, 360, j / rows)
    x.fillStyle = j < 2 ? '#c08a4a' : j % 5 === 0 ? '#6a3e22' : '#8a5530'
    x.fillRect(GL.cx - Math.round(half / P) * P, top + j * P, Math.round(half / P) * P * 2, P)
  }
  x.fillStyle = INK; x.fillRect(GL.cx - 368, bot, 736, P)
  // the brass plaque
  const pw = 400, ph = 66, py = top + 44
  x.fillStyle = INK; x.fillRect(GL.cx - pw / 2 - 6, py - 6, pw + 12, ph + 12)
  x.fillStyle = '#d9b25a'; x.fillRect(GL.cx - pw / 2, py, pw, ph)
  x.fillStyle = '#f2d88a'; x.fillRect(GL.cx - pw / 2, py, pw, 6)
  x.fillStyle = '#5a3a18'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const fs = Math.min(34, 34 * (pw - 40) / Math.max(1, x.measureText(city).width))
  x.font = `700 ${fs.toFixed(1)}px ${MONO}`; x.fillText(city, GL.cx, py + ph / 2 + 2)
  void t
}
function drawGlass(x, t) {
  const { cx, cy, r } = GL
  x.save()
  x.lineWidth = 10; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, r + 4, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 4; x.strokeStyle = 'rgba(220,240,255,0.55)'; x.beginPath(); x.arc(cx, cy, r - 2, 0, Math.PI * 2); x.stroke()
  // highlight arcs
  x.lineCap = 'round'
  x.lineWidth = 18; x.strokeStyle = 'rgba(255,255,255,0.22)'; x.beginPath(); x.arc(cx, cy, r - 34, Math.PI * 1.08, Math.PI * 1.42); x.stroke()
  x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(cx, cy, r - 34, Math.PI * 1.46, Math.PI * 1.52); x.stroke()
  x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,0.1)'; x.beginPath(); x.arc(cx, cy, r - 30, Math.PI * 0.08, Math.PI * 0.3); x.stroke()
  x.restore()
  void t
}
/** the shake: a tilt (radians) around the base, and how hard the snow swirls (0..1) */
export function shakeAt(t, times) {
  let a = 0, sw = 0
  for (const t0 of times) {
    const d = t - t0
    if (d < 0) continue
    if (d < 1.3) a += 0.075 * Math.sin(d * 22) * Math.exp(-d * 3.2)
    sw = Math.max(sw, d < 2.6 ? Math.exp(-d * 1.4) : 0)
  }
  return { a, sw }
}

// ═══════════════════════════════════════════ the bug
const GLOBE_ICON = ['..BBBB..', '.BWCWCB.', 'BCWCWCWB', 'BWCWCWCB', 'BCCWWCCB', '.BBBBBB.', 'KKKKKKKK', 'KYYYYYYK']
function buildBug(root, city) {
  const box = el('div', { position: 'absolute', left: '56px', top: '56px', height: '44px', display: 'flex', alignItems: 'center', gap: '14px', transformOrigin: '0% 50%', pointerEvents: 'none' }, root)
  const ic = el('canvas', { width: '40px', height: '40px', imageRendering: 'pixelated' }, box)
  ic.width = 40; ic.height = 40
  drawBits(ic.getContext('2d'), GLOBE_ICON, { B: '#bfe6ff', W: '#ffffff', C: '#7fb0e0', K: '#8a5530', Y: '#d9b25a' }, 20, 20, 4.2)
  el('div', { font: `800 26px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.18em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, box,
    `REMIX: SNOW GLOBE CITIES`)
  void city
  return {
    update(t, out = 1) {
      box.style.display = out <= 0.01 ? 'none' : 'flex'
      box.style.opacity = String(clamp(out))
    },
  }
}

// ═══════════════════════════════════════════ the film
const NAME = id => id === 'sagittarius' ? 'SAG' : id.toUpperCase()
const SPEAK = 'THE STARS'
const TEXT_COL = { aries: '#ff9a7a', taurus: '#9fe6b0', gemini: '#ffe27a', cancer: '#bfe6ff', leo: '#ffc96b', virgo: '#c8e6a0', libra: '#ffb3d1', scorpio: '#ff8fa0', sagittarius: '#d9b3ff', capricorn: '#d9c19a', aquarius: '#8fd8ff', pisces: '#b8c8ff' }

export function globeFilm(cfg) {
  const HERO = signStar(cfg.hero), PART = signStar(cfg.partner), PIS = signStar('pisces')
  const spk = id => `${signStar(id).glyph}︎ ${NAME(id)}`
  const L_AT = [T.l0, T.l1, T.l2, T.l3, T.l4]
  const LINES = cfg.lines.map((L, i) => {
    const id = L.who === 'hero' ? cfg.hero : L.who === 'partner' ? cfg.partner : null
    return { t: L.t ?? L_AT[i], speaker: id ? spk(id) : SPEAK, color: id ? TEXT_COL[id] : undefined, text: L.text, who: L.who }
  })
  const B1 = LINES.slice(0, 2), B2 = LINES.slice(2, 3), B3 = LINES.slice(3)
  const heroSp = spk(cfg.hero), partSp = spk(cfg.partner)
  const heroHops = [-0.12, 0.42, ...talkHops(LINES, heroSp, { cps: CPS }), T.gags[2] + 0.35, T.together, T.together + 0.5, T.fountain + 0.2]
  const partHops = [...(cfg.duo ? [-0.05, 0.55] : [T.partnerIn + 0.25]), ...talkHops(LINES, partSp, { cps: CPS }), T.together + 0.12, T.together + 0.62, T.fountain + 0.3]
  const narHops = [0.2, ...talkHops(LINES, SPEAK, { cps: CPS })]
  const pos = {
    hero: { x: 420, y: 1000, s: 160 }, heroTurn: { x: 400, y: 1000, s: 150 }, heroEnd: { x: 462, y: 996, s: 150 },
    part: { x: 680, y: 1000, s: 150 }, partEnd: { x: 620, y: 996, s: 150 }, partFrom: { x: 820, y: 1000 },
    nar: { x: 112, y: 1150, s: 118 }, pis: { x: 972, y: 1150, s: 118 }, pisTurn: { x: 965, y: 600, s: 112 },
    ...(cfg.pos || {}),
  }
  const shakes = [T.shake, ...(cfg.shakes || [])]
  const tie = cfg.tie || null

  async function build(stage) {
    try {
      await Promise.all(["800 112px Inter", "800 26px Inter", "700 30px Inter", "700 28px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
    } catch (_) { /* fonts optional */ }
    const img = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + src })
    const cardImg = tie && tie.kind === 'talk' ? await img(tie.img) : null
    const backImg = tie && (tie.kind === 'mystery' || tie.kind === 'deck') ? await img('card-back.png') : null

    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const [a0, a1, a2, a3] = cfg.accents || [ICE, GOLD, PINK, GOLD]
    const H0 = popText(root, cfg.heads[0], { top: 150, size: 92, accentSize: 128, at: T.h0, gap: 0.05, accentColor: a0, fit: true })
    const H1 = popText(root, cfg.heads[1], { top: 160, size: 96, accentSize: 132, at: T.h1, gap: 0.1, accentColor: a1, fit: true })
    const H2 = popText(root, cfg.heads[2], { top: 160, size: 96, accentSize: 132, at: T.h2, gap: 0.1, accentColor: a2, fit: true })
    const H3 = popText(root, cfg.heads[3], { top: 160, size: 100, accentSize: 140, at: T.h3, late: cfg.lateWords || 1, lateAt: T.h3Land, wobble: true, accentColor: a3, fit: true })
    const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
    const BOXY = 1418
    const box1 = dialogueBox(root, { lines: B1, y: BOXY, ...T.box1, cps: CPS, size: 46, height: 280 })
    const box2 = dialogueBox(root, { lines: B2, y: BOXY, ...T.box2, cps: CPS, size: 46, height: 280 })
    const box3 = dialogueBox(root, { lines: B3, y: BOXY, ...T.box3, cps: CPS, size: 46, height: 280 })
    const bug = buildBug(root, cfg.city)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

    const K = { x, T, GL, drawBits, BITS, sparkles, pop01, outK, popOut, starFrame, inSprite, tearsCells, drawStarChar, signStar, SNOW, INK, BONE, GOLD, PINK, ICE }

    // ── characters
    function moodOf(t, who) {
      if (cfg.mood) { const m = cfg.mood(t, who); if (m) return m }
      if (t > T.together) return t > T.fountain ? 'sparkle' : 'heart'
      if (who === 'hero') {
        if (t > T.gags[2] + 0.2 && t < T.gags[2] + 1.6) return 'wide'
        if (t > T.partnerIn + 0.2 && t < T.l3) return 'wide'
        if (t > T.l3 && t < T.l4) return 'neutral'
        if (t > T.l4) return 'happy'
        return 'happy'
      }
      return 'happy'
    }
    function star(t, P, id, opts) {
      const S = signStar(id)
      drawStarChar(x, P.x, P.y, P.s, t, { color: S.color, glyph: S.glyph, glow: 1.05, ...opts })
    }
    function heroPose(t) {
      let P = { ...pos.hero }
      const m = ease.inOutCubic(prog(t, T.h2 - 0.1, T.h2 + 0.4)), e = ease.inOutCubic(prog(t, T.together - 0.2, T.together + 0.3))
      P = { x: lerp(P.x, pos.heroTurn.x, m), y: lerp(P.y, pos.heroTurn.y, m), s: lerp(P.s, pos.heroTurn.s, m) }
      P = { x: lerp(P.x, pos.heroEnd.x, e), y: lerp(P.y, pos.heroEnd.y, e), s: lerp(P.s, pos.heroEnd.s, e) }
      // the double-take at the twisted third gag
      const dt = t - T.gags[2] - 0.2
      if (dt > 0 && dt < 0.5) P.x += 14 * Math.sin(dt * 40) * (1 - dt / 0.5)
      return P
    }
    function partPose(t) {
      const e = ease.inOutCubic(prog(t, T.together - 0.2, T.together + 0.3))
      let P = { ...pos.part }
      if (!cfg.duo) { const k = ease.outCubic(prog(t, T.partnerIn, T.partnerIn + 0.5)); P.x = lerp(pos.partFrom.x, P.x, k); P.y = lerp(pos.partFrom.y, P.y, k) }
      return { x: lerp(P.x, pos.partEnd.x, e), y: lerp(P.y, pos.partEnd.y, e), s: lerp(P.s, pos.partEnd.s, e) }
    }
    function cast(t) {
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      // partner
      const showP = cfg.duo || t > T.partnerIn
      if (showP) {
        const pp = partPose(t), pk = (cfg.duo ? 1 : pop01(t, T.partnerIn, 0.36, 2.1)) * ok
        star(t, pp, cfg.partner, { mood: moodOf(t, 'partner'), hops: partHops, pop: pk, seed: 7, look: t < T.together ? [-1, 0] : undefined })
      }
      const hp = heroPose(t)
      const hlook = showP && t < T.together && t > T.partnerIn ? [1, 0] : undefined
      star(t, hp, cfg.hero, { mood: moodOf(t, 'hero'), hops: heroHops, pop: ok, seed: 3, look: hlook })
      if (cfg.hero === 'pisces') { const F = starFrame(hp.x, hp.y, hp.s, t, { hops: heroHops, seed: 3, pop: ok }); inSprite(x, F, () => tearsCells(x, t, t > T.fountain ? 3 : t > T.gags[0] ? 2 : 1, !!cfg.frozenTears)) }
      // the hero's prop in the hook (the thumbnail action)
      const hpP = cfg.heroProp
      if (hpP && t < (hpP.until ?? T.h0Out[1])) {
        const F = starFrame(hp.x, hp.y, hp.s, t, { hops: heroHops, seed: 3 })
        const b = typeof hpP.bm === 'string' ? BITS[hpP.bm] : { rows: hpP.bm, cols: hpP.cols }
        drawBits(x, b.rows, b.cols, hp.x + (hpP.dx ?? 80), F.cy + (hpP.dy ?? 10), hpP.cell ?? 7, { rot: (hpP.rot ?? 0) + 0.08 * Math.sin(t * 6), alpha: outK(t, [(hpP.until ?? T.h0Out[1]) - 0.2, hpP.until ?? T.h0Out[1]]) })
      }
      if (t > T.together && t < T.together + 0.8) sparkles(x, t, (hp.x + 600) / 2, hp.y - 60, T.together, 10, 150, 2, ['#ff4f86', BONE, GOLD])
      if (t > T.together + 0.3) {
        const hk = pop01(t, T.together + 0.3, 0.3, 2.4) * ok
        const hb = BITS.heart
        drawBits(x, hb.rows, hb.cols, (hp.x + partPose(t).x) / 2, hp.y - 130 + 6 * Math.sin(t * 4), 8 * hk)
      }
    }
    function narrator(t) {
      const k = pop01(t, -0.3, 0.38, 2.1) * popOut(t, T.out)
      if (k <= 0.02) return
      const talking = LINES.some((L, i) => L.speaker === SPEAK && t > L.t && t < L.t + 2.2)
      drawStarChar(x, pos.nar.x, pos.nar.y, pos.nar.s, t, { color: STAR.sky, mood: t > T.together ? 'sparkle' : talking ? 'happy' : 'neutral', look: talking ? [1, -0.4] : undefined, hops: narHops, pop: k, seed: 2, glow: 1.05 })
    }
    function pisces(t) {
      if (cfg.hero === 'pisces' || cfg.partner === 'pisces') { if (!cfg.pisOutside) return }
      const ok = popOut(t, T.out)
      if (ok <= 0) return
      const m = ease.inOutCubic(prog(t, T.h2 - 0.1, T.h2 + 0.4)) * (1 - ease.inOutCubic(prog(t, T.h2Out[0], T.h2Out[1] + 0.2)))
      const P0 = cfg.pisOutside ? { ...pos.pis, ...cfg.pisOutside } : pos.pis
      const P = { x: lerp(P0.x, pos.pisTurn.x, m), y: lerp(P0.y, pos.pisTurn.y, m), s: lerp(P0.s, pos.pisTurn.s, m) }
      const tears = t > T.fountain ? 3 : t > T.gags[2] ? 2 : t > 1.5 ? 1 : 1
      const col = cfg.pisOutside?.id ? signStar(cfg.pisOutside.id).color : PIS.color
      const opts = { color: col, glyph: cfg.pisOutside?.id ? signStar(cfg.pisOutside.id).glyph : PIS.glyph, mood: t > T.fountain ? 'happy' : 'wide', look: [-1, -0.3], seed: 6, glow: 0.8, pop: ok, hops: [T.gags[2] + 0.3, T.shake + 0.1, T.fountain] }
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      if (!cfg.pisOutside?.noTears) { const F = starFrame(P.x, P.y, P.s, t, opts); inSprite(x, F, () => tearsCells(x, t, tears)) }
    }

    // ── the three gags (in front of the globe's sky) + sticker labels
    const GAG_X = [236, 540, 844], GAG_Y = 664
    function sticker(t, cx, cy, text, k, { col = BONE, ink = INK, size = 27, rot = 0 } = {}) {
      if (k <= 0.01) return
      const rows = text.split('|')
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
      x.font = `800 ${size}px ${INTER}`
      const w = Math.min(300, Math.max(...rows.map(r => x.measureText(r).width)) + 34), lh = size * 1.18, h = rows.length * lh + 22
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
      x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
      rows.forEach((r, i) => { const mw = x.measureText(r).width, sc = mw > w - 24 ? (w - 24) / mw : 1; x.save(); x.translate(0, -h / 2 + 11 + lh * (i + 0.5) + 1); x.scale(sc, 1); x.fillText(r, 0, 0); x.restore() })
      x.restore()
    }
    K.sticker = sticker
    function gags(t) {
      if (t < T.gags[0] || t > T.gagOut[1]) return
      const o = outK(t, T.gagOut)
      cfg.gags.forEach((g, i) => {
        const t0 = T.gags[i]
        if (t < t0) return
        const k = pop01(t, t0, i === 2 ? 0.42 : 0.32, i === 2 ? 2.8 : 2) * o
        const b = bitsOf(g), cell = g.cell ?? Math.min(12, 132 / Math.max(b.rows[0].length, b.rows.length))
        const bob = 6 * Math.sin(t * 3 + i * 2)
        const wob = i === 2 ? 0.25 * Math.sin((t - t0) * 16) * Math.exp(-(t - t0) * 3) : 0.04 * Math.sin(t * 2 + i)
        // a pale disc behind each prop so it reads over the skyline
        x.save(); x.globalAlpha = 0.85 * clamp(k); x.fillStyle = 'rgba(16,12,40,0.72)'; x.beginPath(); x.arc(GAG_X[i], GAG_Y + bob, 92 * k, 0, Math.PI * 2); x.fill()
        x.lineWidth = 5; x.strokeStyle = i === 2 ? GOLD : 'rgba(239,230,214,0.55)'; x.stroke(); x.restore()
        drawBits(x, b.rows, b.cols, GAG_X[i], GAG_Y + bob, cell * k, { rot: wob })
        sticker(t, GAG_X[i], GAG_Y + 142, g.label, pop01(t, t0 + 0.12, 0.3, 2) * o, { col: i === 2 ? GOLD : BONE, rot: [-0.04, 0.03, -0.02][i] })
        if (i === 2) sparkles(x, t, GAG_X[i], GAG_Y, t0 + 0.05, 10, 120, 1, [GOLD, BONE, PINK])
      })
    }

    // ── the tie-in
    function tieIn(t) {
      if (!tie || t < T.tie[0]) return
      const k = easeOutBack(prog(t, ...T.tie), 1.4), ok = popOut(t, T.out)
      if (ok <= 0) return
      const cx = lerp(1320, 540, k), cy = lerp(560, 640, k)
      if (tie.kind === 'talk' && cardImg) {
        const w = 290 * ok, h = w * cardImg.height / cardImg.width
        x.save(); x.translate(cx, cy + 20); x.rotate(lerp(0.9, -0.05, k) + 0.02 * Math.sin(t * 2))
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h); x.drawImage(cardImg, -w / 2, -h / 2, w, h); x.restore()
      }
      if (tie.kind === 'mystery' && backImg) {
        const w = 230 * ok, h = w * backImg.height / backImg.width
        x.save(); x.translate(cx, cy + 20); x.rotate(lerp(0.9, 0.05, k) + 0.02 * Math.sin(t * 2))
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 16, -h / 2 + 20, w, h); x.drawImage(backImg, -w / 2, -h / 2, w, h); x.restore()
        sticker(t, cx, cy + h / 2 + 50, tie.label || 'card first.', pop01(t, T.tie[1] + 0.1, 0.3, 2) * ok, { col: GOLD, size: 30 })
      }
      if (tie.kind === 'deck' && backImg) {
        for (let i = 0; i < 3; i++) {
          const kk = easeOutBack(prog(t, T.tie[0] + i * 0.12, T.tie[1] + i * 0.12), 1.5)
          const w = 190 * ok, h = w * backImg.height / backImg.width
          x.save(); x.translate(lerp(1320, 540 + (i - 1) * 140, kk), lerp(560, 650 + Math.abs(i - 1) * 24, kk)); x.rotate(lerp(0.9, (i - 1) * 0.22, kk))
          x.fillStyle = 'rgba(6,4,18,0.4)'; x.fillRect(-w / 2 + 12, -h / 2 + 16, w, h); x.drawImage(backImg, -w / 2, -h / 2, w, h); x.restore()
        }
        sticker(t, 540, 900, tie.label || "tonight's deck", pop01(t, T.tie[1] + 0.4, 0.3, 2) * ok, { col: GOLD, size: 30 })
      }
      if (tie.kind === 'deal') {
        x.save(); x.translate(cx, cy); x.rotate(lerp(0.6, -0.03, k))
        const w = 560 * ok, h = 210 * ok
        x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
        x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-w / 2, -h / 2, w, h)
        x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20)
        x.scale(ok, ok)
        x.fillStyle = GOLD; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEALBREAKERS', 0, -52)
        x.fillStyle = BONE; x.font = `800 38px ${INTER}`
        const tw = x.measureText(tie.text).width; x.save(); if (tw > 480) x.scale(480 / tw, 1); x.fillText(tie.text, 0, 12); x.restore()
        x.restore()
        // the stamp THUNKs down
        const st = T.tie[1] + 0.35, sk = prog(t, st - 0.18, st)
        if (t > st - 0.18) {
          const sc = t < st ? lerp(2.2, 1, ease.inCubic(sk)) : 1
          x.save(); x.translate(cx + 200, cy + 60); x.rotate(-0.18); x.scale(sc * ok, sc * ok); x.globalAlpha = clamp(sk * 2)
          x.strokeStyle = '#5fd38a'; x.lineWidth = 7; x.strokeRect(-110, -34, 220, 68)
          x.fillStyle = '#5fd38a'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tie.stamp || 'DAY ONE', 0, 2)
          x.restore()
          sparkles(x, t, cx + 200, cy + 60, st, 10, 110, 2, ['#5fd38a', BONE, GOLD])
        }
      }
    }

    return {
      start: 0, end: STORY_END + 0.01, root,
      update(t) {
        const ok = popOut(t, T.out)
        const ss = ease.inOutCubic(prog(t, 0, 3))
        drawSky(x, t, { ...SKY_H, zoom: lerp(1.56, SKY_H.zoom, ss), dim: 0.5 })
        // a soft table light under the globe
        if (ok > 0) {
          const g = x.createRadialGradient(GL.cx, GL.cy, 0, GL.cx, GL.cy, 640); g.addColorStop(0, `rgba(150,200,255,${(0.16 * ok).toFixed(3)})`); g.addColorStop(1, 'rgba(150,200,255,0)')
          x.fillStyle = g; x.fillRect(0, 300, 1080, 1300)
        }
        if (t < T.out[1] + 0.02) {
          const { a, sw } = shakeAt(t, shakes)
          const gs = ok
          x.save()
          x.translate(GL.cx, GL.baseBot); x.rotate(a); x.scale(gs, gs); x.translate(-GL.cx, -GL.baseBot)
          // inside the glass
          x.save(); x.beginPath(); x.arc(GL.cx, GL.cy, GL.r, 0, Math.PI * 2); x.clip()
          const ins = cfg.inside || { top: '#16204a', bottom: '#3c4f8f' }
          const gg = x.createLinearGradient(0, GL.cy - GL.r, 0, GL.cy + GL.r); gg.addColorStop(0, ins.top); gg.addColorStop(1, ins.bottom)
          x.fillStyle = gg; x.fillRect(GL.cx - GL.r, GL.cy - GL.r, GL.r * 2, GL.r * 2)
          // tiny stars inside the globe sky
          const R = rng(4)
          for (let i = 0; i < 26; i++) { const sx = GL.cx - GL.r + R() * GL.r * 2, sy = GL.cy - GL.r + R() * GL.r * 0.9; x.fillStyle = `rgba(255,255,255,${(0.3 + 0.5 * Math.abs(Math.sin(t * 1.5 + i))).toFixed(3)})`; x.fillRect(Math.round(sx), Math.round(sy), 3, 3) }
          if (cfg.draw) cfg.draw(x, t, 'sky', K)
          drawSkyline(x, cfg.skyline || [], t)
          // the snowy ground
          x.fillStyle = cfg.ground || '#dfe8f8'; x.fillRect(GL.cx - GL.r, GL.groundY, GL.r * 2, GL.r)
          x.fillStyle = '#ffffff'; for (let i = 0; i < 18; i++) x.fillRect(GL.cx - GL.r + ((i * 83) % (GL.r * 2)), GL.groundY + 8 + (i % 4) * 22, 16, 4)
          if (cfg.draw) cfg.draw(x, t, 'back', K)
          cast(t)
          if (cfg.draw) cfg.draw(x, t, 'front', K)
          snowLayer(x, t, { shake: sw, rain: cfg.precip === 'rain', tint: cfg.precip === 'rain' ? '#bfe0ff' : SNOW, n: cfg.precip === 'rain' ? 70 : 110 })
          x.restore()
          drawGlass(x, t)
          drawBase(x, cfg.city, t)
          x.restore()
          narrator(t)
          pisces(t)
          if (cfg.draw) cfg.draw(x, t, 'over', K)
          gags(t)
          tieIn(t)
        }
        box1.update(t); box2.update(t); box3.update(t)
        for (const [h, o] of HEADS) h.update(t, outK(t, o))
        bug.update(t, outK(t, T.bugOut))
        drawGrain(gx, t)
      },
    }
  }

  // card-cut candidates (cardfx keeps the middle one: 12.9, between the gags and the turn)
  const CUTS = [6.35, { t: T.cut, kind: 'flip' }, 20.1]
  const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

  // ── sound (pitched SFX are shifted into the film's key by the engine)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
  const nWords = s => s.replace(/\|/g, ' ').split(/\s+/).filter(Boolean).length
  const CUES = [
    ['glitter', 0.05, 0.6], ['pop', 0.42, 880, 0.035, -0.2],
    ...talkCues(LINES, { cps: CPS }),
    // the gags: three pops, the third a bigger twist
    ...wordPops(T.h1, Math.min(6, nWords(cfg.heads[1])), 0.1, 1),
    ['pop', T.gags[0], 880, 0.045, -0.4], ['tick', T.gags[0] + 0.14, 0.03],
    ['pop', T.gags[1], 987.77, 0.045, 0], ['tick', T.gags[1] + 0.14, 0.03],
    ['pop', T.gags[2], 1318.51, 0.055, 0.4], ['bell', T.gags[2] + 0.06, 1760, 0.03, 0.9, 0.3], ['glitter', T.gags[2], T.gags[2] + 0.4],
    ['whoosh', T.gags[2] + 0.2, 0.3, 0.025],
    ['whoosh', T.gagOut[0], 0.35, 0.025],
    // the turn
    ...wordPops(T.h2, Math.min(6, nWords(cfg.heads[2])), 0.1, 2),
    ...(cfg.duo ? [] : [['pop', T.partnerIn + 0.05, 739.99, 0.045, 0.35], ['pluck', T.partnerIn + 0.2, 1174.66, 0.03, 0.5, 0.35]]),
    // the shake: rattle + whoosh + glitter swirl
    ['whoosh', T.shake - 0.05, 0.5, 0.05], ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.shake + i * 0.14).toFixed(3), 0.03 - i * 0.003]), ['glitter', T.shake, T.shake + 1.2],
    ...wordPops(T.h3, Math.min(6, nWords(cfg.heads[3])), 0.08, 0), ['pop', T.h3Land, 1174.66, 0.05, 0], ['bell', T.h3Land + 0.05, 2349.32, 0.022, 1.0, 0],
    ['pluck', T.together + 0.3, 1174.66, 0.04, 0.5, -0.1], ['pluck', T.together + 0.42, 1567.98, 0.035, 0.5, 0.1],
    ...(tie ? [['whoosh', T.tie[0], 0.4, 0.04], ['pluck', T.tie[1], 1318.51, 0.04, 0.6, 0.2]] : []),
    ...(tie && tie.kind === 'deck' ? [['tick', T.tie[1] + 0.12, 0.03], ['tick', T.tie[1] + 0.24, 0.03]] : []),
    ...(tie && tie.kind === 'deal' ? [['tom', T.tie[1] + 0.35, 92, { gain: 0.28, decay: 0.3 }], ['tick', T.tie[1] + 0.35, 0.06]] : []),
    ['glitter', T.fountain, T.fountain + 0.5],
    ['whoosh', T.out[0], 0.35, 0.03],
    ...(cfg.cues || []),
    ...cardCutCues(CUTS),
    ...endcardCues(STORY_END),
  ]
  return { DURATION, SCENES, CUES, T }
}

/** the cues.js object for an episode */
export function globeCues(id, cfg, CUES) {
  const m = cfg.music
  return { id, duration: DURATION, music: { style: m.style, key: m.key, seed: m.seed, sections: { drop: 0.9, breakdown: [12.7], lift: [13.0], outroAt: DURATION - 4.4 }, hits: [T.gags[2], T.shake] }, cues: CUES }
}
