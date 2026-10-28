// st4fromwhere (15 s vertical Align ad, Star Talk season 4, EP 031) · story 0–10.6, then the shared end card.
//   0.00–5.40  "In Houston, | your date could be | from *anywhere.*"  Two bone date stars at a little café table, two cups.
//              The left one talks about home and pixel postcards float up out of the story: mountains, the ocean, a
//              big city. The right one is only half listening (eyes wandering). 2.55: the purple ♐ Sagittarius star
//              (Jupiter-ruled, the traveller of the zodiac; backpack + passport from starsag) leans in from the right
//              edge. Box (♐ SAGITTARIUS): "ask where they're *from.*"  The listener goes wide-eyed.
//   5.40–8.30  "Every star has | a *backstory.*"  Box: "then *listen* to the whole story."  The listener turns, sparkles;
//              a dotted travel line strings the postcards together and a fourth card (a Houston skyline) lands last.
//   8.35 cut → "Ask where | they're *from.*"  Sag winks and slips out; the postcards fan into an arc over the pair; heart-eyes.
//              Everything pops out by 10.45; the end card takes over at 10.6.
// Easter eggs (stlore.js): the EP 031 seed constellation (top-left), the EP numeral in the frame, and the ghost peeking
// up from behind the café table, between the two cups (lore.json).
// One canvas (sky + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
export const EP = 31
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const SAG = signStar('sagittarius'), ACC = '#c9a6ff'
const TALKER = STAR.bone, LISTENER = '#f4dcd2'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.22, 5.4],
  cards: [0.7, 1.25, 1.8], ghost: 1.15,
  sagIn: [2.35, 2.75], open: 2.78, l1: 2.95, wide: 3.15,
  h1: 5.45, h1Land: 5.85, l2: 5.5, turn: 5.6, line: [6.3, 7.3], home: 7.25, sparkle: 6.2,
  close: 8.25, h1Out: [8.12, 8.3],
  cut: 8.35, h2: 8.4, h2Land: 8.75, heart: 9.05, wink: 8.45, sagOut: [8.95, 9.4], h2Out: [10.2, 10.45], out: [10.05, 10.45],
}
const SPEAK = '♐ SAGITTARIUS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "ask where they're *from.*", color: ACC },
  { t: T.l2, speaker: SPEAK, text: 'then *listen* to the whole story.', color: ACC },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ── pixel props: postcards (22 × 15 cells: a white border, a picture, a stamp)
const CARD_W = 22, CARD_H = 15
const PIC = {
  mountains: [
    'ssssssssssssssssss',
    'sssssssssssssssuss',
    'sssssssssssssuuuss',
    'sssssswssssssssuss',
    'ssssswwwsssssssss',
    'sssswwmmmssswssss',
    'sssmmmmmmmswwwsss',
    'ssmmmmmmmmmmmmmss',
    'smmmmMMmmmmmmmMmm',
    'gggmMMMMggggMMMgg',
    'gggggggggggggggggg',
  ],
  ocean: [
    'pppppppppppppppppp',
    'ppppppppppppyypppp',
    'pppppppppppyyyyppp',
    'ppppppppppppyypppp',
    'oooooooooooooooooo',
    'oOOooooooOOoooooOO',
    'oooooOOoooooooOOoo',
    'ooOooooooOOoooooo',
    'bbbbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbbbb',
    'bbbbbbbbbbbbbbbbbb',
  ],
  city: [
    'nnnnnnnnnnnnnnnnnn',
    'nnnnnnnnnnnnnnnnnn',
    'nnnkknnnnnnnnnnnnn',
    'nnnkknnnnkknnnnnnn',
    'nnkkkknnkkknnnkknn',
    'nnkykknnkykknnkknn',
    'kkkkkknkkkkknkkkkn',
    'kykkykkkkkykkkykkk',
    'kkkkkkkkkkkkkkkkkk',
    'kkykkkkykkkkykkkyk',
    'kkkkkkkkkkkkkkkkkk',
  ],
  houston: [
    'hhhhhhhhhhhhhhhhhh',
    'hhhhhhhhhhhhhhhhhh',
    'hhhhhhhkhhhhhhhhhh',
    'hhhhhhkkkhhhhhhhhh',
    'hhhhhhkkkhhhkhhhhh',
    'hhhkhhkykhhkkkhhhh',
    'hhkkkhkkkhhkykhkhh',
    'hkkykkkykkkkkkkkkh',
    'kkkkkkkkkkkkkkkkkk',
    'rrrrrrrrrrrrrrrrrr',
    'rrRrrrrRrrrrrRrrrr',
  ],
}
const PIC_C = {
  s: '#9fd4ff', u: '#ffe48a', w: '#ffffff', m: '#8a8fb8', M: '#5f6590', g: '#5fbf74',
  p: '#ffc6a8', y: '#ffd35c', o: '#3f8fe0', O: '#bfe6ff', b: '#f4d9a0',
  n: '#2a2470', k: '#3b3f7a', h: '#ff9e7a', r: '#5a9fd6', R: '#cfeaff',
}
function cardBits(kind) {
  const pic = PIC[kind], rows = []
  for (let j = 0; j < CARD_H; j++) {
    let r = ''
    for (let i = 0; i < CARD_W; i++) {
      if (j === 0 || j === CARD_H - 1 || i === 0 || i === CARD_W - 1) { r += 'W'; continue }
      if (j >= 2 && j <= 12 && i >= 2 && i <= 19) { r += pic[j - 2][i - 2] || pic[j - 2][pic[j - 2].length - 1]; continue }
      r += 'W'
    }
    rows.push(r)
  }
  // a little stamp, top-right corner
  for (const [i, j] of [[17, 2], [18, 2], [19, 2], [17, 3], [18, 3], [19, 3]]) rows[j] = rows[j].slice(0, i) + 'S' + rows[j].slice(i + 1)
  rows[3] = rows[3].slice(0, 18) + 'Z' + rows[3].slice(19)
  return rows
}
const CARDS = ['mountains', 'ocean', 'city', 'houston'].map(cardBits)
const CARD_COLS = { ...PIC_C, W: '#fff6e6', S: '#ff6f8f', Z: '#fff6e6' }
const CUP = ['.cccccc.', 'cCCCCCCcc', 'cCCCCCCc.c', 'cCCCCCCcc', '.cCCCCc..', '..cccc...'].map(r => r.padEnd(10, '.'))
const CUP_C = { c: '#efe6d6', C: '#c98a5a' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const PACK = [
  '...SSSSSS...',
  '..S......S..',
  '.PPPPPPPPPP.',
  'PPPPPPPPPPPP',
  'PppppppppppP',
  'PPPPPPPPPPPP',
  'PPPFFFFFFPPP',
  'PPPFffffFPPP',
  'PPPFFFFFFPPP',
  'PPPPPPPPPPPP',
  'PPPPPPPPPPPP',
  '.PPPPPPPPPP.',
]
const PACK_SAG = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
const PASSPORT = ['NNNNNNN', 'NNgggNN', 'NgNgNgN', 'NgggggN', 'NgNgNgN', 'NNgggNN', 'NNNNNNN', 'NNggg.N', 'NNNNNNN']
const PASS_C = { N: '#1f3a7a', g: '#f2c75c' }

// ── layout
const A = { x: 285, y: 1070, size: 290 }      // the talker (left)
const B = { x: 795, y: 1070, size: 290 }      // the listener (right)
const TABLE = { x: 540, y: 1196, w: 330 }
const CELL = 9
// postcard rest spots (the story above the talker), then the "whole story" row
const SPOTS = [{ x: 205, y: 690, rot: -0.12 }, { x: 455, y: 600, rot: 0.06 }, { x: 700, y: 712, rot: -0.05 }, { x: 520, y: 830, rot: 0.03 }]
const FINAL = [{ x: 160, y: 905, rot: -0.14 }, { x: 405, y: 830, rot: -0.04 }, { x: 675, y: 830, rot: 0.05 }, { x: 920, y: 905, rot: 0.14 }]
const LOW = 140
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))
const SAG_P = { x: 1020, y: 760, size: 270 }

const HOPS_A = [0.75, 1.3, 1.85, 2.2, T.line[0], T.line[0] + 0.5, T.home, 8.9, 9.5]
const HOPS_B = [T.wide, T.turn, T.sparkle + 0.3, T.heart, 9.6]
const HOPS_SAG = talkHops(LINES, SPEAK, { cps: CPS })

function aState(t) {
  if (t < T.wide) return { mood: 'happy', look: [0.6, -0.4] }
  if (t < T.l2) return { mood: 'neutral', look: [1, -0.6] }               // looks up at Sag too
  if (t < T.cut) return { mood: 'sparkle', look: [1, 0] }                  // telling the whole story
  return { mood: 'happy', blush: 1 }
}
function bState(t) {
  if (t < T.wide) {                                                         // half listening: eyes wander off
    const w = Math.sin(t * 1.7)
    return { mood: 'neutral', look: [w > 0 ? 1 : 0.6, -0.7 + 0.2 * w] }
  }
  if (t < T.turn) return { mood: 'wide', look: [1, -0.8], blink: false }   // a Sagittarius, leaning in?
  if (t < T.sparkle) return { mood: 'wide', look: [-1, 0], blink: false }  // turns to the talker
  if (t < T.heart) return { mood: 'sparkle', look: [-1, 0] }
  return { mood: 'heart' }
}
function sagState(t) {
  if (t < T.l1) return { mood: 'sparkle', look: [-1, 0.5] }
  if (t < T.l2) return { mood: 'happy', look: [-1, 0.6] }
  if (t < T.wink) return { mood: 'neutral', look: [-1, 0.4] }
  return { mood: 'wink' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'In Houston, | your date could be | from *anywhere.*', { top: 196, size: 88, accentSize: 132, at: T.h0, gap: 0.08, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.62, lineHeight: 1.04 })
  const H1 = popText(root, 'Every star has | a *backstory.*', { top: 210, size: 104, accentSize: 156, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, "Ask where | they're *from.*", { top: 200, size: 132, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ACC, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, ACC]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.19, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 160 + Math.sin(p * 7 + i) * 16), Math.round(cy - 40 - p * 200), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  /** where postcard i sits at time t (born from the talker, then resting, then circling the pair at the end) */
  function cardPos(i, t) {
    const born = i < 3 ? T.cards[i] : T.home
    if (t < born) return null
    const S = SPOTS[i]
    const fx = i < 3 ? A.x + 40 : A.x + 120, fy = A.y - 120
    const k = ease.outCubic(prog(t, born, born + 0.6))
    let px = lerp(fx, S.x, k), py = lerp(fy, S.y, k) - Math.sin(Math.PI * k) * 60
    let rot = lerp(-0.6, S.rot, k) + Math.sin(t * 1.6 + i * 1.3) * 0.03
    py += Math.sin(t * 2.1 + i * 2) * 6
    let sc = 0.35 + 0.65 * easeOutBack(prog(t, born, born + 0.45), 2.2)
    if (t > T.cut - 0.05) {   // last beat: the postcards fan out in an arc over the pair (the 4th waits for Sag to leave)
      const F = FINAL[i], t0 = i === 3 ? T.sagOut[0] : T.cut - 0.05 + i * 0.08
      const kk = ease.inOutCubic(prog(t, t0, t0 + 0.5))
      px = lerp(px, F.x, kk); py = lerp(py, F.y + Math.sin(t * 2.3 + i) * 7, kk)
      rot = lerp(rot, F.rot, kk); sc = lerp(sc, 0.86, kk)
    }
    return { x: px, y: py, rot, sc }
  }
  function drawTravelLine(t, ps) {
    const k = prog(t, ...T.line)
    if (k <= 0 || t > T.cut) return
    const pts = ps.filter(Boolean)
    x.save()
    let total = 0
    for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
    let run = 0
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i], L = Math.hypot(p1.x - p0.x, p1.y - p0.y)
      for (let d = 0; d < L; d += 26) {
        if ((run + d) / total > k) break
        const u = d / L
        x.globalAlpha = 0.85 * (1 - ease.inQuad(prog(t, T.cut - 0.3, T.cut)))
        x.fillStyle = Math.floor((run + d) / 26) % 2 ? GOLD : BONE
        x.fillRect(Math.round(lerp(p0.x, p1.x, u)) - 7, Math.round(lerp(p0.y, p1.y, u)) - 6, 14, 12)
      }
      run += L
    }
    x.restore()
  }
  function drawTable(t, ok, dy) {
    const { x: cx, w } = TABLE, ty = TABLE.y + dy
    x.save(); x.globalAlpha = clamp(ok * 2)
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, ty - 6, w + 12, 36); x.fillRect(cx - 26, ty + 24, 52, 230); x.fillRect(cx - 110, ty + 244, 220, 30)
    x.fillStyle = '#8a5a3c'; x.fillRect(cx - w / 2, ty, w, 24); x.fillStyle = '#b07a52'; x.fillRect(cx - w / 2, ty, w, 8)
    x.fillStyle = '#6a4430'; x.fillRect(cx - 18, ty + 30, 36, 218); x.fillRect(cx - 102, ty + 250, 204, 18)
    x.restore()
    // two cups with a curl of steam
    for (const [i, s] of [[0, -1], [1, 1]]) {
      const ux = cx + s * 92, uy = ty - 30
      drawBits(x, CUP, CUP_C, ux, uy, 6, { alpha: clamp(ok * 2) })
      x.save(); x.globalAlpha = 0.5 * clamp(ok * 2); x.fillStyle = BONE
      for (let k = 0; k < 4; k++) { const ph = (t * 0.9 + k * 0.25 + i * 0.4) % 1; x.globalAlpha = 0.45 * Math.sin(Math.PI * ph) * clamp(ok * 2); x.fillRect(Math.round(ux - 8 + Math.sin(ph * 6 + i) * 8), Math.round(uy - 30 - ph * 60), 6, 6) }
      x.restore()
    }
  }
  /** Sagittarius leans in from the right edge: backpack, passport, a tilt */
  function drawSag(t) {
    if (t < T.sagIn[0] || t > T.sagOut[1]) return
    const kin = ease.outBack(prog(t, ...T.sagIn)), kout = ease.inCubic(prog(t, ...T.sagOut))
    const px = lerp(1320, SAG_P.x, kin) + kout * 330, py = SAG_P.y + Math.sin(t * 2.4) * 6
    const lean = lerp(0, -0.32, kin) + (t > T.l1 && t < T.close ? Math.sin(t * 3) * 0.04 : 0)
    x.save(); x.translate(px, py + SAG_P.size * 0.4); x.rotate(lean); x.translate(-px, -(py + SAG_P.size * 0.4))
    const s = SAG_P.size
    drawBits(x, PACK, PACK_SAG, Math.round(px + s * 0.33), Math.round(py), s / 21, { rot: 0.14 })
    const r = drawStarChar(x, px, py, s, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: HOPS_SAG, seed: 9, glow: 1.1 })
    drawBits(x, PASSPORT, PASS_C, Math.round(px - s * 0.42), Math.round(r.top + s * 0.18 + Math.sin(t * 5) * 6), s / 30, { rot: -0.3 })
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        const ps = [0, 1, 2, 3].map(i => cardPos(i, t))
        drawTravelLine(t, ps)
        // the two date stars, then the table in front of them (they're sitting), then the ghost (it hides behind the table top)
        drawStarChar(x, A.x, A.y + dy, A.size * ok, t, { color: TALKER, ...aState(t), hops: HOPS_A, seed: 3, glow: 0.9 })
        drawStarChar(x, B.x, B.y + dy, B.size * ok, t, { color: LISTENER, ...bState(t), hops: HOPS_B, seed: 6, glow: 0.9 })
        drawTable(t, ok, dy)
        drawGhostCameo(x, t, { x: TABLE.x, y: TABLE.y, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        ps.forEach((p, i) => { if (p) drawBits(x, CARDS[i], CARD_COLS, Math.round(p.x), Math.round(p.y), CELL * p.sc * ok, { rot: p.rot }) })
        sparkles(t, ps[3] ? ps[3].x : 540, ps[3] ? ps[3].y : 820, T.home + 0.35, 10, 150, 2)
        sparkles(t, B.x, B.y + dy - 60, T.sparkle, 8, 170, 1, [GOLD, BONE, ACC])
        drawSag(t)
        if (t > T.heart) floatHearts(t, 540, A.y + dy - 150, T.heart, T.out[0], 3, 6)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.42 (H0 out → "Every star has a backstory") and 8.35 (box shut → the last line). cardfx keeps 8.35.
const CUTS = [5.42, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 7, 0.08, 0, 0.024), ['pop', T.h0 + 0.62, 1174.66, 0.045, 0],
  ...T.cards.flatMap((c, i) => [['whoosh', c - 0.02, 0.3, 0.02], ['pop', c + 0.3, NOTE[2 + i * 2], 0.04, -0.3 + i * 0.3]]),
  ['pop', T.ghost + 0.1, 1318.51, 0.012, 0],
  ['whoosh', T.sagIn[0], 0.45, 0.04], ['pop', T.sagIn[1], 523.25, 0.04, 0.6],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.wide, 440, 0.035, 0.4],
  ...wordPops(T.h1, 3, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.turn, 659.25, 0.03, 0.4], ['glitter', T.sparkle, T.sparkle + 0.5],
  ['whoosh', T.line[0], 0.9, 0.02], ['pop', T.home + 0.3, 1318.51, 0.045, 0], ['bell', T.home + 0.35, 1760, 0.025, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.1, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['tick', T.wink, 0.03], ['whoosh', T.sagOut[0], 0.35, 0.02],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
