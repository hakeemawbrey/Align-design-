// divekit: the DEEP DIVE: ___ IN LOVE look (Month 2 boost, star_advice posts, kdde01–06). Read-only for kdde02–06.
//
// A literal deep-sea dive into one sign's love life, about 2 min:
//   0.0–6.2     HOOK: frame 0 = the sign mid-cannonball above a night sea, spray mid-air, the hook line on screen.
//               whip zoom + colour flash, SPLASH at 0.9, Pisces jumps in after it (already crying into its helmet),
//               THE STARS: "everything nobody tells you about loving a ___." → "four depths. *wait* for the bottom."
//   4 chapters (26 s each), one per depth, each opened by a chapter sticker and a dive (bubbles stream, gauge spins):
//               1 THE SURFACE · HOW THEY FLIRT   2 THE REEF · WHAT THEY NEED
//               3 THE TRENCH · HOW THEY FIGHT    4 THE DEEP · WHAT MAKES THEM STAY
//               each chapter = 3 beats (~7.9 s): a new headline + a memory bubble floating up with a little scene
//               (types: duo, chat, card, lens, better, list, meter) + THE STARS (or Pisces) in the dialogue box.
//   payoff      the sea floor: the treasure chest rattles, opens, gold light, the last line lands, hard cut ~0.9 s later.
//   Running gag: Pisces's glass helmet fills with its own happy tears, chapter by chapter, full at the bottom.
//
// makeDive(cfg) → { DURATION, SCENES, CUES, T }
//   cfg: { id, sign, name ('Aries'), article ('an'), hook, accent, lens: { element, ruler, mode },
//          hookPose(x, t, P) optional extra prop on the cannonballing sign (P = its sprite pose),
//          chapters: [ { beats: [beat, beat, beat], pisces?: { at: beatIndex, text } } ×4 ],
//          payoff: { say, pisces }, last, music cues via the score in cues.js }
//   beat: { head: 'They flirt like a *dare.*', type, say: ['narrator line', 'optional second line'], ...type params }
//     duo    { a: mood/line for the sign, b: partner, sayA, sayB, moodA, moodB, icon, iconAt }   (two stars on a little floor)
//     chat   { title, msgs: [[side 'L'|'R', text], …] }                                          (a phone thread)
//     card   { q: 'the talk-card question' }                                                     (a talk card flips)
//     lens   { }                                                       (THROUGH THE STARS: glyph · element · ruler)
//     better { bad: 'the hot way', good: 'the better way' }                                      (✗ then ✓)
//     list   { title, items: [3 strings] }                                                       (three ticks)
//     meter  { label, curve: [[u, v], …] (u in s from the beat start, v 0…1), lo, hi }           (a gauge)
// Pure f(t). No end card, no card cut, no logo. Imports shared, read-only modules (+ hookkit.js).
import { clamp, lerp, prog, ease, el, tw } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, chapter, chapterCues, recordScratch, recordScratchCues, frozen } from '../../hookkit.js'
import { pop01, outK, drawBits, sparkles, starFrame, inSprite, tearsCells, INTER, MONO } from '../../sxmail1/scenes/mail.js'

export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff4a5a', GREEN = '#5fd38a', TEAR = '#8fe3ff'
const SERIF = "'EB Garamond', Georgia, serif"
const PARTNER = '#a9c3ff'
const PIS = signStar('pisces')
const R = (x, col, X, Y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }
function box(x, X, Y, w, h, col, { b = 6, hi = null } = {}) {
  R(x, INK, X - b, Y, w + 2 * b, h); R(x, INK, X, Y - b, w, h + 2 * b); R(x, col, X, Y, w, h)
  if (hi) R(x, hi, X + b, Y + b * 0.6, w - 2 * b, Math.max(3, b * 0.7))
}
function wrap(x, text, maxW) {
  const words = text.split(' '), lines = []; let cur = ''
  for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { lines.push(cur); cur = w } else cur = n }
  if (cur) lines.push(cur)
  return lines
}
export function bubbleTxt(x, t, cx, cy, t0, t1, text, { size = 30, col = BONE, tail = 0, maxW = 380 } = {}) {
  const k = pop01(t, t0, 0.26, 2.4) * outK(t, [t1, t1 + 0.18])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const L = wrap(x, text, maxW), lh = size * 1.15
  const w = Math.max(...L.map(l => x.measureText(l).width)) + 40, h = L.length * lh + 26
  R(x, INK, -w / 2 - 5, -h / 2, w + 10, h); R(x, INK, -w / 2, -h / 2 - 5, w, h + 10); R(x, col, -w / 2, -h / 2, w, h)
  const tx = tail * w * 0.35
  R(x, INK, tx - 14, h / 2 + 3, 16, 14); R(x, col, tx - 9, h / 2, 8, 9)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  L.forEach((l, i) => x.fillText(l, 0, -h / 2 + 13 + lh * (i + 0.5) + 2))
  x.restore()
}

// ─────────────────────────────────────────────── pixel icons (drawBits)
export const ICONS = {
  heart: [['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }],
  phone: [['KKKKK', 'KSSSK', 'KSSSK', 'KSSSK', 'KSSSK', 'KKWKK'], { K: '#2a2148', S: '#9fe6b0', W: BONE }],
  sandwich: [['..BBBBB..', '.BBBBBBB.', 'GGGGGGGGG', 'RRRRRRRRR', 'YYYYYYYYY', '.BBBBBBB.'], { B: '#e0a85a', G: '#5fd38a', R: '#ff6a6a', Y: '#ffd23a' }],
  pancake: [['...YY....', '.BBBBBBB.', 'BBBBBBBBB', '.DDDDDDD.', 'BBBBBBBBB', '.DDDDDDD.', 'BBBBBBBBB'], { B: '#e0a85a', D: '#b0743a', Y: '#ffe27a' }],
  crown: [['G..G..G', 'GG.G.GG', 'GGGGGGG', 'GRGGGRG', 'GGGGGGG'], { G: GOLD, R: RED }],
  shell: [['...SSS...', '..SSSSS..', '.SSPSPSS.', 'SSPSPSPSS', 'SPSPSPSPS', '.SSSSSSS.'], { S: '#ffd0c0', P: '#ff9fa8' }],
  house: [['....R....', '...RRR...', '..RRRRR..', '.RRRRRRR.', '.WWWWWWW.', '.WWDWWYW.', '.WWDWWWW.'], { R: '#ff6a6a', W: BONE, D: '#7a4f3a', Y: '#ffd23a' }],
  soup: [['.S.S.S.', '..S.S..', 'BBBBBBB', 'BYYYYYB', '.BBBBB.', '..BBB..'], { S: '#cfe6ff', B: '#4f7cd8', Y: '#ffd23a' }],
  sun: [['Y..Y..Y', '.YYYYY.', '.YOOOY.', 'YYOOOYY', '.YOOOY.', '.YYYYY.', 'Y..Y..Y'], { Y: '#ffd23a', O: '#ff9a3a' }],
  moon: [['..MMM..', '.MM....', 'MM.....', 'MM.....', 'MM.....', '.MM....', '..MMM..'], { M: '#fff1c8' }],
  clock: [['.KKKKK.', 'KWWKWWK', 'KWWKWWK', 'KWWKKWK', 'KWWWWWK', 'KWWWWWK', '.KKKKK.'], { K: '#2a2148', W: BONE }],
  flag: [['P......', 'PRRRRR.', 'PRRRRRR', 'PRRRRR.', 'P......', 'P......', 'P......'], { P: '#8c86a8', R: '#ff6a6a' }],
  tea: [['.S.S..', '..S...', 'CCCCC.', 'CCCCCC', 'CCCCC.', '.CCC..'], { S: '#cfe6ff', C: '#c9a6ff' }],
  wrench: [['.GG...', 'G..G..', '.GGGG.', '...GG.', '....GG', '.....G'], { G: '#cfd3e6' }],
  spot: [['..YYY..', '.YYYYY.', 'YYYYYYY', '.KKKKK.', '..KKK..'], { Y: '#fff1a8', K: '#2a2148' }],
  shades: [['KKK.KKK', 'KBK.KBK', 'KKKKKKK'], { K: '#14102a', B: '#5a5aa8' }],
  list: [['WWWWWW', 'WGWKKW', 'WWWWWW', 'WGWKKW', 'WWWWWW', 'WGWKKW', 'WWWWWW'], { W: BONE, G: GREEN, K: '#8c86a8' }],
  hug: [['.HH.HH.', 'HHHHHHH', 'HWHHHWH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff8fb1', W: '#fff' }],
  basket: [['..BBBBB..', '.B.....B.', 'BBBBBBBBB', 'BKBKBKBKB', 'BBBBBBBBB', '.BBBBBBB.'], { B: '#c9894a', K: '#8a5a30' }],
  plane: [['....W....', '...WWW...', 'WWWWWWWWW', '...WWW...', '....W....', '...WWW...'], { W: BONE }],
  chat: [['WWWWWWW', 'WKWKWKW', 'WWWWWWW', '.W.....'], { W: BONE, K: '#8c86a8' }],
  gift: [['..R.R..', 'GGGRGGG', 'GGGRGGG', 'RRRRRRR', 'GGGRGGG', 'GGGRGGG'], { G: '#5fd38a', R: '#ff6a6a' }],
}
export function icon(x, name, cx, cy, cell, opts) { const [bm, cols] = ICONS[name]; drawBits(x, bm, cols, cx, cy, cell, opts) }

// ─────────────────────────────────────────────── the sea
const SEA = [[0, [32, 122, 150]], [0.25, [22, 82, 128]], [0.5, [16, 44, 96]], [0.75, [10, 20, 60]], [1, [6, 8, 28]]]
function seaCol(d, add = 0) {
  d = clamp(d); let i = 0; while (i < SEA.length - 2 && d > SEA[i + 1][0]) i++
  const [a, A] = SEA[i], [b, B] = SEA[i + 1], k = (d - a) / (b - a)
  return A.map((v, j) => Math.round(lerp(v, B[j], k) + add))
}
const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
function hash(i, s = 1) { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

/** the underwater backdrop at depth d (0 surface … 1 the deep), scroll = how far we've sunk (px, drives particles) */
function drawSea(x, t, d, scroll, { rays = 1 - d } = {}) {
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, rgb(seaCol(d - 0.08, 8))); g.addColorStop(1, rgb(seaCol(d + 0.12, -4)))
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // light rays from the surface
  if (rays > 0.02) {
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 6; i++) {
      const sx = 120 + i * 180 + 60 * Math.sin(t * 0.3 + i), w = 70 + 40 * hash(i, 2), a = rays * (0.05 + 0.04 * Math.sin(t * 0.8 + i * 1.7))
      x.fillStyle = `rgba(190,240,255,${Math.max(0, a)})`; x.beginPath(); x.moveTo(sx, -20); x.lineTo(sx + w, -20); x.lineTo(sx + w * 2.2 - 260, 1920); x.lineTo(sx - 260, 1920); x.closePath(); x.fill()
    }
    x.restore()
  }
  // marine snow / plankton drifting (rises fast while we dive)
  for (let i = 0; i < 70; i++) {
    const r = hash(i, 5), px = (r * 1100 + Math.sin(t * 0.5 + i) * 18) % 1100 - 10
    const py = ((((hash(i, 9) * 1920 - scroll * (0.4 + r)) - t * 14 * (0.5 + r)) % 1920) + 1920) % 1920
    const c = 3 + Math.floor(r * 3) * 2
    x.globalAlpha = 0.25 + 0.4 * hash(i, 3)
    R(x, d > 0.6 && i % 3 === 0 ? '#9ff6ff' : '#dff6ff', px, py, c, c)
  }
  x.globalAlpha = 1
  // bioluminescent glow dots in the deep
  if (d > 0.55) {
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 18; i++) {
      const px = hash(i, 11) * 1080, py = ((hash(i, 13) * 1920 - scroll * 0.3) % 1920 + 1920) % 1920, a = (d - 0.55) * 1.4 * (0.4 + 0.6 * Math.max(0, Math.sin(t * 1.3 + i * 2)))
      const gg = x.createRadialGradient(px, py, 0, px, py, 40); gg.addColorStop(0, `rgba(120,255,230,${0.35 * a})`); gg.addColorStop(1, 'rgba(120,255,230,0)')
      x.fillStyle = gg; x.fillRect(px - 40, py - 40, 80, 80)
    }
    x.restore()
  }
}

/** a little pixel fish (dir 1 = swimming right) */
const FISH = ['..FFF...', '.FFFFF.T', 'FFEFFFTT', 'FFFFFFTT', '.FFFFF.T', '..FFF...']
function fish(x, cx, cy, cell, col, dir = 1, t = 0) {
  drawBits(x, FISH, { F: col, E: INK, T: col }, cx, cy + Math.sin(t * 6 + cx * 0.01) * 4, cell, { sx: dir < 0 ? -1 : 1, alpha: 0.95 })
}
/** a school crossing at t0 (pattern interrupt) */
function school(x, t, t0, y, dir, col, n = 7, cell = 7) {
  const u = t - t0; if (u < 0 || u > 4) return
  const X = dir > 0 ? lerp(-300, 1380, u / 4) : lerp(1380, -300, u / 4)
  for (let i = 0; i < n; i++) fish(x, X - dir * (i % 4) * 90 - dir * Math.floor(i / 4) * 40, y + ((i * 53) % 140) - 70 + Math.sin(u * 3 + i) * 12, cell, col, dir, t + i)
}
/** a jellyfish drifting up (the deep) */
function jelly(x, t, cx, cy, s, col = '#ff9ff0') {
  const p = Math.sin(t * 2.4) * 0.12
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 0, cx, cy, s * 1.6); g.addColorStop(0, 'rgba(255,160,240,0.25)'); g.addColorStop(1, 'rgba(255,160,240,0)'); x.fillStyle = g; x.fillRect(cx - s * 2, cy - s * 2, s * 4, s * 4); x.restore()
  drawBits(x, ['..JJJJ..', '.JJJJJJ.', 'JJWJJWJJ', 'JJJJJJJJ', 'J.J..J.J', 'J.J..J.J', '.J.JJ.J.', '.J..J..J'], { J: col, W: '#fff' }, cx, cy, s / 8, { sx: 1 + p, sy: 1 - p, alpha: 0.85 })
}

/** rising bubbles from a point */
function bubbles(x, t, cx, cy, n = 5, seed = 1, rate = 0.9, h = 260) {
  for (let i = 0; i < n; i++) {
    const ph = (((t * rate + i / n + seed * 0.21) % 1) + 1) % 1, r = 5 + 6 * hash(i, seed)
    const bx = cx + Math.sin(ph * 9 + i) * 14, by = cy - ph * h
    x.globalAlpha = 0.8 * (1 - ph); x.strokeStyle = '#dff6ff'; x.lineWidth = 3; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke()
    R(x, '#ffffff', bx - r * 0.4, by - r * 0.5, 3, 3)
  }
  x.globalAlpha = 1
}

/** a glass dive helmet around a star sprite pose F; water 0…1 fills it from the bottom (Pisces's tears) */
function helmet(x, t, F, size, { water = 0, a = 1 } = {}) {
  if (a <= 0.01) return
  const cx = F.ox, cy = F.cy, r = size * 0.64
  x.save(); x.globalAlpha *= a
  if (water > 0.01) {
    x.save(); x.beginPath(); x.arc(cx, cy, r - 6, 0, Math.PI * 2); x.clip()
    const top = cy + r - water * 2 * r
    x.fillStyle = 'rgba(120,215,255,0.42)'; x.beginPath(); x.moveTo(cx - r, cy + r)
    for (let i = 0; i <= 24; i++) { const px = cx - r + (i / 24) * 2 * r; x.lineTo(px, top + 7 * Math.sin(t * 5 + i * 0.9)) }
    x.lineTo(cx + r, cy + r); x.closePath(); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.5)'
    for (let i = 0; i <= 24; i += 2) { const px = cx - r + (i / 24) * 2 * r; R(x, 'rgba(255,255,255,0.55)', px, top + 7 * Math.sin(t * 5 + i * 0.9) - 2, 8, 4) }
    x.restore()
  }
  x.fillStyle = 'rgba(190,235,255,0.10)'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(cx, cy, r + 4, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 6; x.strokeStyle = '#cfefff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.7)'; x.beginPath(); x.arc(cx, cy, r * 0.8, -2.5, -1.7); x.stroke()
  // the collar
  box(x, cx - r * 0.62, cy + r * 0.86, r * 1.24, 18, '#d0a24a', { b: 5, hi: 'rgba(255,255,255,0.3)' })
  x.restore()
}

/** a diver: star + helmet (+ Pisces tears), returns its frame */
function diver(x, t, P, o = {}) {
  const opts = { color: P.color, glyph: P.glyph, mood: o.mood || 'happy', look: o.look, seed: P.seed || 3, pop: o.pop ?? 1, alpha: o.alpha ?? 1, hops: o.hops, squash: o.squash || 0, glow: 0.8, blink: o.blink }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (o.tears) inSprite(x, F, () => tearsCells(x, t, o.tears))
  helmet(x, t, F, P.s * (o.pop ?? 1), { water: o.water || 0, a: o.alpha ?? 1 })
  if (o.bubbles !== false && (o.pop ?? 1) > 0.5) bubbles(x, t, F.ox + P.s * 0.25, F.cy - P.s * 0.55, 4, P.seed || 1, 0.7, 220)
  return F
}

// ─────────────────────────────────────────────── the memory-bubble vignettes (local coords, centre 0,0, radius 300)
const V = {}
V.duo = (x, t, u, B, S) => {
  R(x, 'rgba(255,255,255,0.06)', -300, 120, 600, 200); R(x, 'rgba(6,4,18,0.25)', -300, 120, 600, 8)
  const A = { x: -130, y: 30, s: 190 }, Bp = { x: 130, y: 30, s: 190 }
  const mA = typeof B.moodA === 'function' ? B.moodA(u) : (B.moodA || 'happy'), mB = typeof B.moodB === 'function' ? B.moodB(u) : (B.moodB || 'happy')
  const hopsA = [B.t0 + 1.0, B.t0 + 1.3], hopsB = [B.t0 + 3.2, B.t0 + 3.5]
  if (B.actA === 'zoom') A.x = lerp(-420, -130, ease.outBack(prog(u, 0.2, 0.9)))
  if (B.actB === 'zoom') Bp.x = lerp(420, 130, ease.outBack(prog(u, 2.6, 3.3)))
  const shA = B.actA === 'shake' && u > 1 && u < 3 ? 6 * Math.sin(u * 40) : 0
  const shB = B.actB === 'shake' && u > 3 && u < 5 ? 6 * Math.sin(u * 40) : 0
  drawStarChar(x, A.x + shA, A.y, A.s, t, { color: S.color, glyph: S.glyph, mood: mA, look: [1, 0], seed: 4, hops: hopsA })
  drawStarChar(x, Bp.x + shB, Bp.y, Bp.s, t, { color: B.partner || PARTNER, mood: mB, look: [-1, 0], seed: 8, hops: hopsB })
  if (B.icon) { const ik = pop01(u, B.iconAt ?? 1.8, 0.3, 2.6); if (ik > 0.01) icon(x, B.icon, lerp(-60, 0, ease.outCubic(ik)), -120 - 8 * Math.sin(t * 3), 11 * ik) }
  if (B.sayA) bubbleTxt(x, u, -60, -190, 0.9, 7.3, B.sayA, { tail: -0.6, size: 30, maxW: 360 })
  if (B.sayB) bubbleTxt(x, u, 80, B.sayA ? -80 : -190, 3.1, 7.3, B.sayB, { tail: 0.6, size: 30, col: '#dfe9ff', maxW: 340 })
}
V.chat = (x, t, u, B, S) => {
  const w = 400, h = 540, top = -280
  box(x, -w / 2, top, w, h, '#2a2148', { b: 8 })
  R(x, '#14102a', -w / 2 + 16, top + 50, w - 32, h - 70)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(B.title || `${S.glyph}︎ them`, 0, top + 26)
  const msgs = B.msgs || []
  const at = i => 0.7 + i * (B.gap || 0.9)
  let y = top + 70
  const placed = []
  x.font = `700 31px ${INTER}`
  for (let i = 0; i < msgs.length; i++) {
    if (u < at(i)) break
    const [side, text] = msgs[i], L = wrap(x, text, 250), hh = L.length * 35 + 22
    placed.push({ side, L, hh, y, k: pop01(u, at(i), 0.22, 2.4) }); y += hh + 14
  }
  const over = Math.max(0, y - (top + h - 30))
  x.save(); x.beginPath(); x.rect(-w / 2 + 16, top + 50, w - 32, h - 70); x.clip()
  for (const p of placed) {
    const bw = Math.max(...p.L.map(l => x.measureText(l).width)) + 30, bx = p.side === 'R' ? w / 2 - 28 - bw : -w / 2 + 28, by = p.y - over
    x.save(); x.translate(bx + bw / 2, by + p.hh / 2); x.scale(p.k, p.k)
    R(x, p.side === 'R' ? '#4f7cd8' : '#3a3160', -bw / 2, -p.hh / 2, bw, p.hh)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'; p.L.forEach((l, j) => x.fillText(l, -bw / 2 + 15, -p.hh / 2 + 28 + j * 35))
    x.restore()
  }
  x.restore()
}
V.card = (x, t, u, B) => {
  const f = prog(u, 1.2, 1.9), sx = Math.abs(Math.cos(f * Math.PI)), front = f > 0.5
  const w = 330, h = 460, rot = -0.05 + 0.02 * Math.sin(t * 1.5)
  x.save(); x.rotate(rot); x.translate(0, -10 + lerp(260, 0, ease.outBack(prog(u, 0.1, 0.8)))); x.scale(Math.max(0.02, sx), 1)
  R(x, 'rgba(6,4,18,0.4)', -w / 2 + 16, -h / 2 + 20, w, h)
  box(x, -w / 2, -h / 2, w, h, front ? '#f4e8cc' : '#2a1f55', { b: 8 })
  if (!front) {
    R(x, GOLD, -w / 2 + 18, -h / 2 + 18, w - 36, 6); R(x, GOLD, -w / 2 + 18, h / 2 - 24, w - 36, 6)
    for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) if ((i + j) % 2 === 0) R(x, 'rgba(242,199,92,0.35)', -w / 2 + 40 + i * 54, -h / 2 + 50 + j * 54, 14, 14)
  } else {
    x.font = `700 22px ${MONO}`; x.fillStyle = '#7a5a2a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TALK CARD', 0, -h / 2 + 44)
    R(x, '#c9b48a', -w / 2 + 40, -h / 2 + 66, w - 80, 4)
    x.font = `italic 500 46px ${SERIF}`; x.fillStyle = '#2c2a7a'
    const L = wrap(x, B.q, w - 70); L.forEach((l, i) => x.fillText(l, 0, -((L.length - 1) * 54) / 2 + i * 54 + 20))
    icon(x, 'heart', 0, h / 2 - 50, 5)
  }
  x.restore()
  if (front) sparkles(x, u, 0, 0, 1.6, 10, 220, 2)
}
V.lens = (x, t, u, B, S, cfg) => {
  // a brass telescope lens: glyph, then element · modality · ruler
  const k = ease.outBack(prog(u, 0.2, 0.8))
  x.save(); x.scale(k, k)
  x.lineWidth = 22; x.strokeStyle = INK; x.beginPath(); x.arc(0, -40, 196, 0, Math.PI * 2); x.stroke()
  x.lineWidth = 12; x.strokeStyle = '#d0a24a'; x.beginPath(); x.arc(0, -40, 192, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(10,8,30,0.5)'; x.beginPath(); x.arc(0, -40, 184, 0, Math.PI * 2); x.fill()
  x.font = `500 210px ${SERIF}`; x.fillStyle = S.color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(S.glyph + '︎', 0, -30 + 6 * Math.sin(t * 2))
  x.restore()
  const L = cfg.lens
  const rows = [`${L.element.toUpperCase()} SIGN`, L.mode.toUpperCase(), `RULED BY ${L.ruler.toUpperCase()}`]
  rows.forEach((r, i) => {
    const kk = pop01(u, 1.4 + i * 0.6, 0.28, 2.4); if (kk <= 0.01) return
    x.save(); x.translate([-150, 150, 0][i], [150, 150, 222][i]); x.scale(kk, kk)
    x.font = `800 30px ${INTER}`; const w = x.measureText(r).width + 36
    R(x, INK, -w / 2 - 4, -26, w + 8, 52); R(x, i === 2 ? GOLD : BONE, -w / 2, -22, w, 44)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(r, 0, 2); x.restore()
  })
  const nk = pop01(u, 3.6, 0.3, 2); if (nk > 0.01) { x.save(); x.globalAlpha = clamp(nk); x.font = `italic 500 30px ${SERIF}`; x.fillStyle = '#dff6ff'; x.textAlign = 'center'; x.fillText('(astrology: a lens, not a lab result)', 0, -258); x.restore() }
}
V.better = (x, t, u, B) => {
  const row = (y, ok, label, text, k) => {
    if (k <= 0.01) return
    x.save(); x.translate(0, y); x.scale(k, k)
    box(x, -260, -88, 520, 176, ok ? '#173a2c' : '#3a1724', { b: 7 })
    x.font = `800 24px ${MONO}`; x.fillStyle = ok ? GREEN : RED; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(label, -236, -60)
    drawBits(x, ok ? ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'] : ['R....R', 'RR..RR', '.RRRR.', '.RRRR.', 'RR..RR', 'R....R'], { G: GREEN, R: RED }, -205, 14, 9)
    x.font = `800 31px ${INTER}`; x.fillStyle = BONE
    const L = wrap(x, text, 370); L.forEach((l, i) => x.fillText(l, -150, 14 - ((L.length - 1) * 36) / 2 + i * 36))
    x.restore()
  }
  // the bad way, then it gets crossed out, then the better way
  row(-120, false, 'THE HOT WAY', B.bad, pop01(u, 0.4, 0.3, 2.2))
  if (u > 2.0) { const s = ease.outCubic(prog(u, 2.0, 2.35)); x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(-250, -120); x.lineTo(lerp(-250, 250, s), -120 + lerp(0, -10, s)); x.stroke(); x.restore() }
  row(110, true, 'THE BETTER WAY', B.good, pop01(u, 2.6, 0.34, 2.2))
  if (u > 2.6) sparkles(x, u, 0, 110, 2.7, 10, 230, 1, [GREEN, BONE, GOLD])
}
V.list = (x, t, u, B) => {
  x.font = `800 30px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'
  const tk = pop01(u, 0.3, 0.3, 2); if (tk > 0.01) { x.save(); x.globalAlpha = clamp(tk); x.fillText(B.title || 'WHAT THEY NEED', 0, -210); x.restore() }
  B.items.forEach((it, i) => {
    const k = pop01(u, 0.9 + i * 1.5, 0.3, 2.4); if (k <= 0.01) return
    x.save(); x.translate(0, -110 + i * 120); x.scale(k, k)
    box(x, -250, -46, 500, 92, i === B.items.length - 1 ? '#3a2f12' : '#241c48', { b: 6 })
    drawBits(x, ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: GREEN }, -205, 0, 7)
    x.font = `800 32px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    const L = wrap(x, it, 380); L.forEach((l, j) => x.fillText(l, -160, -((L.length - 1) * 34) / 2 + j * 34 + 2))
    x.restore()
  })
}
V.meter = (x, t, u, B, S) => {
  const v = clamp(tw(u, B.curve, ease.inOutCubic))
  const W2 = 120, H2 = 400
  box(x, -W2 / 2 - 120, -H2 / 2 - 30, W2, H2, '#14102a', { b: 8 })
  const fh = (H2 - 20) * v, hot = v > 0.6
  R(x, hot ? RED : v > 0.3 ? '#ffb03a' : '#5fd3ff', -W2 / 2 - 110, H2 / 2 - 40 - fh, W2 - 20, fh)
  for (let i = 1; i < 6; i++) R(x, 'rgba(255,255,255,0.3)', -W2 / 2 - 120, -H2 / 2 - 30 + i * H2 / 6, 24, 4)
  x.font = `800 28px ${MONO}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText(B.label, -180 + 60, -262)
  x.font = `700 22px ${MONO}`; x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillText(B.hi || 'HOT', -180 + 60 + 120, -200); x.fillText(B.lo || 'CALM', -180 + 60 + 120, 160)
  drawStarChar(x, 130, 20, 210, t, { color: S.color, glyph: S.glyph, mood: hot ? 'squint' : v > 0.3 ? 'neutral' : 'happy', look: [-1, 0], seed: 4, squash: hot ? 0.05 * Math.sin(t * 30) : 0 })
  if (hot) for (let i = 0; i < 4; i++) { const ph = (((t * 1.6 + i / 4) % 1) + 1) % 1; x.globalAlpha = 1 - ph; R(x, '#ffd0c0', 90 + i * 30 + Math.sin(ph * 8) * 6, -90 - ph * 120, 12, 12) }
  x.globalAlpha = 1
}

// ─────────────────────────────────────────────── the film
export const CHAPTERS = [
  { n: 1, place: 'THE SURFACE', topic: 'HOW THEY FLIRT', depth: 20, d: 0.12 },
  { n: 2, place: 'THE REEF', topic: 'WHAT THEY NEED', depth: 60, d: 0.32 },
  { n: 3, place: 'THE TRENCH', topic: 'HOW THEY FIGHT', depth: 400, d: 0.6 },
  { n: 4, place: 'THE DEEP', topic: 'WHAT MAKES THEM STAY', depth: 1000, d: 0.85 },
]
const HOOK_END = 6.2, CH_LEN = 26, BEAT0 = 2.3, BEAT_LEN = 7.9
export function makeDive(cfg) {
  const S = signStar(cfg.sign)
  const C0 = i => HOOK_END + i * CH_LEN
  const PAY = C0(4)                      // 110.2
  const D = cfg.D || 118
  const T = {
    splash: 0.9, pisJump: 1.5, under: [1.2, 2.6], say0: 2.0, say1: 4.0,
    pay: PAY, floor: [PAY, PAY + 1.4], rattle: PAY + 1.5, open: PAY + 3.2, last: D - 0.95, D,
  }
  const beats = []
  cfg.chapters.forEach((ch, i) => ch.beats.forEach((b, j) => beats.push({ ...b, ch: i, j, t0: C0(i) + BEAT0 + j * BEAT_LEN, t1: C0(i) + BEAT0 + (j + 1) * BEAT_LEN })))
  const NAR = 'THE STARS', PSP = `${PIS.glyph}︎ PISCES`
  const CPS = 30
  // dialogue: one box for the hook, one per chapter, one for the payoff
  const lines = []
  lines.push({ t: T.say0, speaker: NAR, text: `everything nobody tells you about loving ${cfg.article || 'a'} *${cfg.name}.*` })
  lines.push({ t: T.say1, speaker: NAR, text: 'four depths. *wait* for the bottom.' })
  const boxes = [{ lines: lines.slice(), open: T.say0 - 0.22, close: HOOK_END - 0.1 }]
  cfg.chapters.forEach((ch, i) => {
    const L = []
    ch.beats.forEach((b, j) => {
      const t0 = C0(i) + BEAT0 + j * BEAT_LEN
      const say = b.say || []
      if (say[0]) L.push({ t: t0 + 0.5, speaker: NAR, text: say[0] })
      if (say[1]) L.push({ t: t0 + 4.1, speaker: say[1].startsWith('P:') ? PSP : NAR, color: say[1].startsWith('P:') ? '#9fd8ff' : undefined, text: say[1].replace(/^P:\s*/, '') })
    })
    boxes.push({ lines: L, open: L[0].t - 0.22, close: C0(i + 1) - 0.15 })
  })
  const PL = [{ t: T.rattle + 0.1, speaker: PSP, color: '#9fd8ff', text: cfg.payoff.pisces || 'is it… is it *treasure?*' }, { t: T.open + 0.4, speaker: NAR, text: cfg.payoff.say }]
  boxes.push({ lines: PL, open: PL[0].t - 0.22, close: D + 1 })
  const ALL = boxes.flatMap(b => b.lines)

  const HERO = { x: 250, y: 1320, s: 200, color: S.color, glyph: S.glyph, seed: 4 }
  const GUIDE = { x: 540, y: 1340, s: 150, color: STAR.sky, glyph: null, seed: 2 }
  const PISD = { x: 830, y: 1320, s: 200, color: PIS.color, glyph: PIS.glyph, seed: 6 }
  const NAR_HOPS = talkHops(ALL, NAR, { cps: CPS }), PIS_HOPS = talkHops(ALL, PSP, { cps: CPS })
  const water = t => t < HOOK_END ? 0.08 : t < PAY ? 0.08 + 0.2 * Math.min(4, (t - HOOK_END) / CH_LEN) : clamp(0.88 + 0.12 * prog(t, T.open, T.open + 2))

  function depthAt(t) {
    if (t < HOOK_END) return { d: 0.04 * prog(t, 1.2, HOOK_END), m: Math.round(lerp(0, 8, prog(t, 1.2, HOOK_END))) }
    if (t >= PAY) { const k = ease.inOutCubic(prog(t, ...T.floor)); return { d: lerp(0.88, 1, k), m: Math.round(lerp(1000, 1200, k)) } }
    const i = Math.min(3, Math.floor((t - HOOK_END) / CH_LEN)), lt = t - C0(i)
    const prev = i ? CHAPTERS[i - 1] : { d: 0.04, depth: 8 }, cur = CHAPTERS[i]
    const k = ease.inOutCubic(prog(lt, 0, 2.0))
    const nextK = i < 3 ? 0 : 0
    void nextK
    return { d: lerp(prev.d, cur.d, k) + 0.08 * prog(lt, 2, CH_LEN), m: Math.round(lerp(prev.depth, cur.depth, k) + (cur.depth * 0.3) * prog(lt, 2, CH_LEN)) }
  }
  // how far we've sunk (drives the particle scroll; fast during the chapter dives)
  function sunk(t) {
    let s = t * 30
    for (let i = 0; i < 4; i++) s += 2600 * ease.inOutCubic(prog(t, C0(i), C0(i) + 2))
    s += 1400 * ease.inOutCubic(prog(t, ...T.floor)) + 900 * ease.inOutCubic(prog(t, ...T.under))
    return s
  }

  async function build(stage) {
    try { await Promise.all(["800 110px Inter", "800 64px Inter", "800 32px Inter", "800 30px Inter", "800 26px Inter", "italic 500 150px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "500 210px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const heads = beats.map(b => popText(root, b.head, { top: 250, size: 96, accentSize: 128, at: b.t0 + 0.05, gap: 0.07, accentColor: cfg.accent || S.color, fit: true }))
    const lastT = popText(root, cfg.last, { top: 560, size: 104, accentSize: 140, at: T.last, gap: 0.05, accentColor: GOLD, fit: true })
    const DB = boxes.map(b => dialogueBox(root, { lines: b.lines, y: 1480, open: b.open, close: b.close, cps: CPS, size: 46 }))
    // bug + depth gauge + chapter sticker (DOM)
    const bug = el('div', { position: 'absolute', left: '54px', top: '58px', font: `800 30px ${INTER}`, letterSpacing: '0.22em', fontVariant: 'small-caps', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap' }, root, 'DEEP&nbsp;DIVE')
    const gauge = el('div', { position: 'absolute', right: '54px', top: '50px', font: `700 30px ${MONO}`, color: '#dff6ff', background: 'rgba(6,10,30,0.7)', border: '4px solid #cfefff', padding: '6px 16px', whiteSpace: 'nowrap', letterSpacing: '0.06em' }, root, '')
    const stick = el('div', { position: 'absolute', left: '50%', top: '700px', display: 'none', transformOrigin: '50% 50%', textAlign: 'center', whiteSpace: 'nowrap' }, root)
    const stickN = el('div', { display: 'inline-block', font: `800 34px ${MONO}`, color: INK, background: GOLD, padding: '10px 22px', border: `6px solid ${INK}`, letterSpacing: '0.12em' }, stick)
    el('br', {}, stick)
    const stickT = el('div', { display: 'inline-block', marginTop: '14px', font: `800 78px ${INTER}`, color: BONE, background: 'rgba(16,9,38,0.95)', padding: '18px 34px 24px', border: `6px solid ${GOLD}`, boxShadow: `0 0 0 6px ${INK}` }, stick)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const flash = el('div', { position: 'absolute', inset: 0, background: cfg.accent || '#fff', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen' }, root)

    // the hook above water: night sky, the sea surface, the sign mid-cannonball
    function above(t) {
      const pan = ease.inOutCubic(prog(t, ...T.under))           // camera sinks under the surface
      const surf = lerp(1240, -200, pan)
      x.save()
      drawSky(x, t, { ...SKY_H, zoom: 1.4, dy: -pan * 300 })
      // the sea below the surface line
      const g = x.createLinearGradient(0, surf, 0, surf + 1500); g.addColorStop(0, '#2a8aa8'); g.addColorStop(1, '#174a78'); x.fillStyle = g; x.fillRect(0, surf, 1080, 1920 - surf + 400)
      for (let i = 0; i < 12; i++) R(x, 'rgba(220,250,255,0.35)', ((i * 157 + t * 40) % 1180) - 60, surf + 18 + (i % 3) * 30, 70, 6)
      R(x, '#dff6ff', 0, surf - 6, 1080, 10)
      // the sign: mid-air at frame 0, hits the water at T.splash
      const fallK = prog(t, -0.6, T.splash)
      const sy = lerp(520, surf + 60, ease.inQuad(fallK)), sx = lerp(420, 520, fallK)
      if (t < T.splash + 0.12) {
        const P = { ...HERO, x: sx, y: sy, s: 320 }
        drawStarChar(x, P.x, P.y, P.s, t, { color: S.color, glyph: S.glyph, mood: 'wide', look: [0, 1], seed: 4, squash: -0.12 })
        const F = starFrame(P.x, P.y, P.s, t, { squash: -0.12, seed: 4 })
        if (cfg.hookPose) cfg.hookPose(x, t, P, F)
        // spray mid-air around it (it just leapt off the boat)
        for (let i = 0; i < 14; i++) { const a = hash(i, 4) * Math.PI * 2, rr = 200 + 60 * hash(i, 7) + t * 120; R(x, '#dff6ff', P.x + Math.cos(a) * rr, P.y + Math.sin(a) * rr * 0.7 - 40, 12, 12) }
      }
      // the boat edge (left), speed lines
      box(x, -40, surf - 160, 300, 120, '#c45a3a', { b: 8, hi: 'rgba(255,255,255,0.25)' }); R(x, BONE, -40, surf - 120, 300, 14)
      // SPLASH: a crown of water
      const sp = t - T.splash
      if (sp > 0 && sp < 1.6) {
        const k = ease.outCubic(clamp(sp / 0.5)), fade = 1 - prog(sp, 0.9, 1.6)
        x.globalAlpha = fade
        for (let i = 0; i < 26; i++) { const a = -Math.PI * (0.05 + 0.9 * (i / 25)), v = 380 + 160 * hash(i, 3), px = 520 + Math.cos(a) * v * k, py = surf + Math.sin(a) * v * k * 1.4 + 900 * sp * sp; R(x, INK, px - 11, py - 11, 22, 22); R(x, '#dff6ff', px - 8, py - 8, 16, 16) }
        x.globalAlpha = 1
        box(x, 520 - 200 * k, surf - 40 * k, 400 * k, 40 * k, '#dff6ff', { b: 6 })
      }
      // Pisces jumps in after it, already crying
      const pj = t - T.pisJump
      if (pj > -0.2 && pj < 0.8) {
        const py = lerp(surf - 520, surf + 80, ease.inQuad(clamp((pj + 0.2) / 0.9)))
        const F = diver(x, t, { ...PISD, x: 760, y: py, s: 230 }, { mood: 'happy', tears: 3, water: 0.08, bubbles: false })
        void F
      }
      x.restore()
    }

    function underwater(t) {
      const dd = depthAt(t)
      drawSea(x, t, dd.d, sunk(t))
      // a pattern interrupt every ~9 s: a school of fish / a jellyfish / a turtle-shaped rock passing
      const fishT = []
      for (let a = 8.5; a < PAY; a += 9.2) fishT.push(a)
      fishT.forEach((f, i) => school(x, t, f, [470, 1130, 600, 1080][i % 4], i % 2 ? -1 : 1, ['#ffb03a', '#9ff6ff', '#ff8fb1', '#c9a6ff'][i % 4], 6, 7))
      if (dd.d > 0.6) { jelly(x, t, 140 + 30 * Math.sin(t * 0.4), 1900 - ((t * 30) % 2200), 70); jelly(x, t, 960, 2100 - (((t + 20) * 26) % 2300), 54, '#9ff6ff') }
      // sea floor at the payoff
      if (t > T.floor[0]) {
        const k = ease.inOutCubic(prog(t, ...T.floor)), fy = lerp(2300, 1080, k)
        R(x, '#2a2240', 0, fy, 1080, 1000); R(x, '#3a3058', 0, fy, 1080, 16)
        for (let i = 0; i < 9; i++) { const px = i * 130 + 20; drawBits(x, ['..G..', '.GG..', '..GG.', '.GG..', 'GG...', '.GG..', '..G..'], { G: '#3fb08a' }, px, fy - 40 + Math.sin(t * 2 + i) * 4, 9, { rot: 0.1 * Math.sin(t * 1.5 + i) }) }
        icon(x, 'shell', 180, fy + 60, 8); icon(x, 'shell', 900, fy + 90, 7)
        chest(t, 540, fy - 10)
      }
      // the memory bubble
      for (const b of beats) memBubble(t, b)
      // the divers
      if (t > 2.2) divers(t)
    }

    function chest(t, cx, cy) {
      const sh = t > T.rattle && t < T.open ? 6 * Math.sin(t * 50) * prog(t, T.rattle, T.rattle + 0.3) : 0
      const op = ease.outBack(prog(t, T.open, T.open + 0.5))
      x.save(); x.translate(cx + sh, cy)
      if (op > 0) {
        x.save(); x.globalCompositeOperation = 'lighter'
        for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.22 + 0.04 * Math.sin(t * 2 + i); x.fillStyle = `rgba(255,220,120,${0.16 * op})`; x.beginPath(); x.moveTo(0, -40); x.lineTo(Math.cos(a - 0.07) * 1100, -40 + Math.sin(a - 0.07) * 1100); x.lineTo(Math.cos(a + 0.07) * 1100, -40 + Math.sin(a + 0.07) * 1100); x.closePath(); x.fill() }
        const g = x.createRadialGradient(0, -40, 0, 0, -40, 420); g.addColorStop(0, `rgba(255,230,150,${0.5 * op})`); g.addColorStop(1, 'rgba(255,230,150,0)'); x.fillStyle = g; x.fillRect(-420, -460, 840, 840)
        x.restore()
      }
      box(x, -170, -60, 340, 150, '#8a5a30', { b: 9, hi: 'rgba(255,255,255,0.2)' })
      R(x, GOLD, -170, -10, 340, 16); R(x, GOLD, -20, -60, 40, 150)
      x.save(); x.translate(0, -60); x.rotate(-1.1 * op)
      box(x, -170, -70, 340, 70, '#9a6a3a', { b: 9 }); R(x, GOLD, -20, -70, 40, 70)
      x.restore()
      if (op > 0.3) for (let i = 0; i < 6; i++) { const ph = (((t * 0.8 + i / 6) % 1) + 1) % 1; icon(x, i % 2 ? 'heart' : 'crown', -120 + i * 48, -80 - ph * 260, 5, { alpha: 1 - ph }) }
      x.restore()
      sparkles(x, t, cx, cy - 60, T.open, 14, 260, 3, [GOLD, BONE, PINK])
    }

    function memBubble(t, b) {
      if (t < b.t0 - 0.2 || t > b.t1 + 0.4) return
      const u = t - b.t0
      const rise = ease.outBack(prog(u, 0, 0.6)), burst = prog(t, b.t1 - 0.35, b.t1)
      const cy = lerp(1400, 840, rise) + 8 * Math.sin(t * 1.3), r = 372 * lerp(0.4, 1, rise) * (1 + 0.15 * burst)
      if (burst >= 1) { // popped: little bubbles fly out
        const pk = prog(t, b.t1, b.t1 + 0.4)
        for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, rr = 380 + 200 * pk; x.globalAlpha = 1 - pk; x.strokeStyle = '#dff6ff'; x.lineWidth = 4; x.beginPath(); x.arc(540 + Math.cos(a) * rr, 840 + Math.sin(a) * rr, 10, 0, Math.PI * 2); x.stroke() }
        x.globalAlpha = 1; return
      }
      x.save(); x.globalAlpha = 1 - burst
      x.fillStyle = 'rgba(20,14,50,0.78)'; x.beginPath(); x.arc(540, cy, r, 0, Math.PI * 2); x.fill()
      x.save(); x.beginPath(); x.arc(540, cy, r - 6, 0, Math.PI * 2); x.clip()
      x.translate(540, cy); x.scale(r / 312, r / 312)
      V[b.type](x, t, u, b, S, cfg)
      x.restore()
      x.lineWidth = 14; x.strokeStyle = INK; x.beginPath(); x.arc(540, cy, r + 5, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 7; x.strokeStyle = '#dff6ff'; x.beginPath(); x.arc(540, cy, r, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(540, cy, r * 0.86, -2.6, -1.9); x.stroke()
      x.restore()
    }

    function divers(t) {
      const inK = ease.outBack(prog(t, 2.2, 3.0))
      const fin = t > T.open
      const yOff = lerp(500, 0, inK)
      // the hero
      const hm = fin ? 'sparkle' : t < HOOK_END ? 'happy' : 'happy'
      diver(x, t, { ...HERO, y: HERO.y + yOff }, { mood: hm, look: [0.3, -1], hops: fin ? [T.open + 0.1, T.open + 0.5] : undefined })
      // the guide (THE STARS)
      diver(x, t, { ...GUIDE, y: GUIDE.y + yOff }, { mood: fin ? 'happy' : 'happy', hops: NAR_HOPS, look: [0, -0.5] })
      // Pisces: tears every chapter, helmet filling
      const crying = t < PAY ? (Math.floor((t - HOOK_END) / 3) % 3 === 0 ? 3 : 2) : 3
      const F = diver(x, t, { ...PISD, y: PISD.y + yOff }, { mood: fin ? 'happy' : crying === 3 ? 'happy' : 'sparkle', tears: crying, water: water(t), hops: PIS_HOPS, look: [-0.5, -1], blink: false })
      void F
    }

    return {
      start: 0, end: D + 0.01, root,
      update(t) {
        // whip zoom in the first 0.35 s, a shake on the splash and on each chapter dive
        const wz = 1
        let sh = 0
        const sp = t - T.splash; if (sp > 0 && sp < 0.5) sh += 20 * Math.exp(-sp * 8) * Math.sin(sp * 60)
        for (let i = 0; i < 4; i++) { const q = t - C0(i) - 1.9; if (q > 0 && q < 0.4) sh += 10 * Math.exp(-q * 10) * Math.sin(q * 60) }
        const q = t - T.open; if (q > 0 && q < 0.5) sh += 16 * Math.exp(-q * 8) * Math.sin(q * 55)
        x.save(); x.translate(540, 960); x.scale(wz, wz); x.translate(-540, -960 + sh)
        if (t < T.under[1]) above(t)
        if (t >= T.under[1]) underwater(t)
        else if (t > T.under[0]) { x.save(); x.globalAlpha = prog(t, T.under[0] + 0.8, T.under[1]); underwater(t); x.restore() }
        x.restore()
        // DOM
        beats.forEach((b, i) => heads[i].update(t, outK(t, [b.t1 - 0.3, b.t1 - 0.05])))
        lastT.update(t, 1)
        DB.forEach(b => b.update(t))
        const dd = depthAt(t)
        gauge.textContent = `▼ ${String(dd.m).padStart(4, '0')} m`
        // chapter stickers
        let si = -1; for (let i = 0; i < 4; i++) if (t >= C0(i) && t < C0(i) + 2.3) si = i
        if (si >= 0) {
          const lt = t - C0(si), k = pop01(lt, 0.05, 0.34, 2.6) * outK(lt, [1.95, 2.25])
          stick.style.display = 'block'; stick.style.opacity = String(clamp(k * 2))
          stick.style.transform = `translateX(-50%) scale(${k.toFixed(3)}) rotate(${(-3 + 2 * Math.sin(lt * 3)).toFixed(2)}deg)`
          stickN.textContent = `▼ ${CHAPTERS[si].depth} m`; stickT.textContent = CHAPTERS[si].place
        } else stick.style.display = 'none'
        // colour flash on the splash, a soft one on each chapter
        let fl = 0.55 * Math.max(0, 1 - Math.abs(t - T.splash) / 0.16)
        for (let i = 0; i < 4; i++) fl += 0.25 * Math.max(0, 1 - Math.abs(t - C0(i)) / 0.15)
        fl += 0.6 * Math.max(0, 1 - Math.abs(t - T.open) / 0.2)
        flash.style.opacity = String(clamp(fl))
        drawGrain(gx, t)
      },
    }
  }

  // ── sound
  const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
  const CUES = [
    ['whoosh', 0.0, 0.35, 0.06], ['pop', 0.02, 1318.51, 0.04, 0], ['riser', 0.1, T.splash, 0.03],
    ['boom', T.splash, 0.3], ['tom', T.splash, 80, { gain: 0.3, decay: 0.35 }], ['whoosh', T.splash, 0.8, 0.06], ['glitter', T.splash, T.splash + 0.5],
    ['whoosh', T.pisJump, 0.4, 0.04], ['pop', T.pisJump + 0.55, 523.25, 0.05, 0.3], ['pluck', T.pisJump + 0.6, 1318.51, 0.03, 0.5, 0.3],
    ['whoosh', T.under[0], 1.2, 0.03],
    ...talkCues(ALL, { cps: CPS }),
  ]
  for (let i = 0; i < 4; i++) {
    const c = C0(i)
    CUES.push(['whoosh', c, 1.6, 0.05], ['riser', c, c + 1.9, 0.03], ['pop', c + 0.06, 880, 0.05, 0], ['bell', c + 0.1, 1760, 0.03, 1.0, 0], ['tom', c + 1.9, 90, { gain: 0.2, decay: 0.25 }])
    for (let k = 0; k < 6; k++) CUES.push(['pop', +(c + 0.3 + k * 0.22).toFixed(3), NOTE[k % 6] * 2, 0.012, (k % 2 ? 0.3 : -0.3)])
  }
  for (const b of beats) {
    CUES.push(['pop', +(b.t0 + 0.05).toFixed(3), 659.25, 0.035, -0.2], ['whoosh', b.t0, 0.4, 0.025], ['pop', +(b.t1 - 0.02).toFixed(3), 1318.51, 0.03, 0.2], ['tick', +(b.t1).toFixed(3), 0.03])
    if (b.type === 'card') CUES.push(['whoosh', b.t0 + 1.2, 0.3, 0.03], ['pluck', b.t0 + 1.6, 1318.51, 0.04, 0.6, 0.2], ['glitter', b.t0 + 1.6, b.t0 + 2.0])
    if (b.type === 'better') CUES.push(['tick', b.t0 + 2.0, 0.05], ['whoosh', b.t0 + 2.05, 0.25, 0.03], ['bell', b.t0 + 2.65, 1760, 0.03, 0.9, 0])
    if (b.type === 'list') b.items.forEach((_, i) => CUES.push(['pop', +(b.t0 + 0.9 + i * 1.5).toFixed(3), NOTE[i * 2], 0.04, 0]))
    if (b.type === 'lens') [1.4, 2.0, 2.6].forEach((d, i) => CUES.push(['pop', +(b.t0 + d).toFixed(3), NOTE[i + 2], 0.035, 0]))
    if (b.type === 'chat') (b.msgs || []).forEach((m, i) => CUES.push(['pop', +(b.t0 + 0.7 + i * (b.gap || 0.9)).toFixed(3), m[0] === 'R' ? 440 : 880, 0.035, m[0] === 'R' ? 0.25 : -0.25]))
    if (b.type === 'duo') CUES.push(['pop', b.t0 + 1.0, 987.77, 0.03, -0.3], ['pop', b.t0 + 3.2, 739.99, 0.03, 0.3], ...(b.icon ? [['pluck', b.t0 + (b.iconAt ?? 1.8), 1174.66, 0.035, 0.5, 0]] : []))
  }
  // fish schools
  for (let a = 8.5; a < PAY; a += 9.2) CUES.push(['whoosh', +a.toFixed(2), 1.2, 0.015])
  CUES.push(['whoosh', T.floor[0], 1.4, 0.05], ['tick', T.rattle, 0.05], ['tick', T.rattle + 0.12, 0.05], ['tick', T.rattle + 0.24, 0.05],
    ['riser', T.rattle, T.open, 0.04], ['boom', T.open, 0.3], ['bell', T.open + 0.05, 1760, 0.04, 1.4, 0], ['glitter', T.open, T.open + 0.8],
    ['pop', T.last, 1318.51, 0.05, 0], ['pluck', T.last + 0.08, 1760, 0.045, 0.6, 0])
  const WHIP = { at: -0.22, from: 1.7 }
  const HOOK = { at: -1, text: cfg.hook, top: 150, size: 112, accentColor: cfg.accent || S.color, out: [HOOK_END - 0.4, HOOK_END - 0.1] }
  const CH = CHAPTERS.map((c, i) => ({ at: C0(i) + 0.35, out: [C0(i + 1) - 0.3, C0(i + 1) - 0.05], n: c.n, title: c.topic, x: 54, y: 120, color: cfg.accent || GOLD }))
  CUES.push(...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...CH.flatMap(c => chapterCues(c)))
  // optional record-scratch freeze mid-fall (before the splash)
  const REC = cfg.rec ? { at: 0.28, len: 0.5, caption: cfg.rec, top: 1560 } : null
  if (REC) CUES.push(...recordScratchCues(REC))
  const SC = [REC ? frozen(build, [REC]) : build, whipZoom(WHIP), slamTitle(HOOK), ...CH.map(c => chapter(c)), ...(REC ? [recordScratch(REC)] : [])]
  return { DURATION: D, SCENES: SC, CUES, T, C0, beats }
}
