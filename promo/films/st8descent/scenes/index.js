// st8descent (45 s vertical Align ad, Star Talk season 8 "EX RETROGRADE", S8 E11) · story 0–40.6, then the end card.
//   Genre: an epic myth trailer, in season 6's archive look (sepia film plate, sprockets, scratches, hand-tinted gold).
//   The myth is real and attributed: in the Sumerian myth "Inanna's Descent" the goddess Inanna (linked with the planet
//   Venus) passes seven gates into the underworld and gives up something at each (crown, necklace, beads, breastplate,
//   gold ring, measuring rod, royal robe). Some scholars link the story to Venus vanishing from the sky. The real sky:
//   mid-retrograde, Venus passes between Earth and the Sun and is lost in the Sun's glare for a few days.
//   0.00–2.55  FRAME 0: archive plate, Gate I. Inanna mid-lift, her horned crown already over her head; the gatekeeper's
//              tray out of the dark doorway. Hook: "Seven gates. | One *goddess.*"
//   2.60       trailer card: "From ancient | *Sumer.*" · THE SUMERIAN MYTH “INANNA’S DESCENT”
//   5.00       archive: the stair down past seven gates. Lower third INANNA. THE STARS (the trailer voice): "she went down
//              to the underworld. *seven gates.*" → "at every gate, she had to *leave something.*"
//  11.25       trailer slam: "Seven gates. | Seven *goodbyes.*"
//  12.20       SPLIT SCREEN, 7 × 1.8 s: top, the archive gate N, Inanna's item flies to the tray (hand-tinted gold);
//              bottom, in colour, Venus (retrograde, dim) drops one ex's keepsake into her EXES box and floats a little
//              higher each time (her retro arrow fades: lighter). Ghost in the box at gate V.
//  24.80       the real sky: Sun, Earth, Venus's orbit; Venus slides between Earth and the Sun and vanishes in the glare.
//              "Some scholars link this | to Venus *vanishing.*"
//  30.40       colour, Gate I again (the frame-0 framing, changed): Venus, lighter, rising back up through it. The box now
//              says DONATE (rewatch bait). VENUS: "seven things i didn't need to *carry.*" → THE STARS: "in the myth, she
//              comes back *up.*"  Hidden comet over the gate towers.
//  36.80      "You come back | *lighter.*"  Plain sky at 40.6, end card.
// Canvases: x (the frame) + ac (an offscreen archive layer graded sepia, then composited). DOM type above, grain on top.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { VENUS, drawVenus, drawDayChip, hookCard, hookCues, genreBug, stingerCues } from '../../st8cast.js'
import { pop01, outK, popOut, r3, R, glow, burst, monoText, panel, seq, wordPops, flash, chip, lowerThird, hiddenComet, GOLD, BONE, INK, PINK, NOTE } from '../kit.js'

export const DURATION = 45
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const SEPIA = '#a87b4f', CREAM = '#f3e3c3', LAPIS = '#3d5bd9'
const DAY = { day: 19, phase: 'gone' }

// ── the timeline
const GATE0 = 12.2, GATE_LEN = 1.8
const T = {
  hookOut: 2.55, card1: [2.6, 5.0], shotC: [5.0, 11.25], card2: [11.25, 12.2],
  gates: [GATE0, GATE0 + 7 * GATE_LEN],                // 12.2 – 24.8
  sky: [24.8, 30.4], h1: 25.0, h1Land: 25.4, h1Out: [30.05, 30.3], vanish: [26.0, 28.0],
  ret: [30.4, 40.6], last: 36.8, out: [40.05, 40.45],
  ghost: GATE0 + 4 * GATE_LEN + 0.15, comet: 31.2, donate: 31.0,
}
const gateAt = n => r3(GATE0 + n * GATE_LEN)         // n = 0…6
const NARR = 'THE STARS', VEN = VENUS.tag
const S1 = seq(5.3, [
  { who: NARR, x: 'she went down to the underworld. *seven gates.*', hold: 0.9 },
  { who: NARR, x: 'at every gate, she had to *leave something.*', hold: 1.6 },
])
const S2 = seq(30.85, [
  { who: VEN, x: 'seven things i didn’t need to *carry.*', color: '#ffb3d1', hold: 1.6 },
  { who: NARR, x: 'in the myth, she comes back *up.*', hold: 1.5 },
])
const LINES1 = S1.lines, LINES2 = S2.lines
const CPS = 28

// ── the seven gates: what Inanna leaves (the myth) and what Venus lets go of (one ex's keepsake each)
const ITEMS = ['CROWN', 'NECKLACE', 'BEADS', 'BREASTPLATE', 'GOLD RING', 'MEASURING ROD', 'ROYAL ROBE']
const KEEPS = ['THE PROMISE RING', 'HIS HOODIE', 'THE MIXTAPE', 'THE LOVE LETTERS', 'A DRIED ROSE', '“OUR SONG”', 'HIS SPARE KEY']
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']

// ── layout
const FULL = { x0: 0, x1: 1080, y0: 0, y1: 1920 }
const TOP = { x0: 70, x1: 1010, y0: 470, y1: 990 }          // the split screen's archive plate
const BOT = { x0: 70, x1: 1010, y0: 1030, y1: 1550 }        // and its colour plate
const BOX = { x: 790, y: 1400 }                            // the EXES box in the colour plate
export const GHOST = { at: r3(T.ghost), x: BOX.x + 20, y: BOX.y - 70, where: 'rising out of Venus’s EXES box in the split screen’s colour plate, gate V' }
export const COMET = { at: T.comet, from: [1060, 560], to: [620, 470] }

// ── pixel bitmaps
const CROWN = ['H.H.H.H.H', 'HHHHHHHHH', 'GgGGgGGgG', 'GGGGGGGGG', 'gGgGgGgGg']
const CROWN_C = { H: '#e9d6a8', G: '#f2c75c', g: '#b9852f' }
const RING = ['.YYY.', 'Y...Y', 'Y...Y', '.YYY.']
const RING_C = { Y: '#ffd34d' }
const HOODIE = ['..PPPP..', '.PPddPP.', 'PPPPPPPP', 'PP.PP.PP', 'PP.PP.PP', 'PPPPPPPP', '.PPPPPP.']
const HOODIE_C = { P: '#c0413a', d: '#7a2420' }
const TAPE = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWkWWWWkWK', 'KWWWWWWWWK', 'KKKwwwwKKK']
const TAPE_C = { K: '#3a3358', W: '#f3e3c3', k: '#1b1236', w: '#8b84ad' }
const LETTER = ['WWWWWWWWWW', 'WwWWWWWWwW', 'WWwWWWWwWW', 'WWWwRRwWWW', 'WWWWRRWWWW', 'WWWWWWWWWW']
const LETTER_C = { W: '#fff6e2', w: '#c9b892', R: '#ff4f86' }
const ROSE = ['.rRr.', 'rRrRr', '.rRr.', '..g..', '.gg..', '..g..', '..g..']
const ROSE_C = { r: '#9a3048', R: '#c24a62', g: '#6f8a4a' }
const RECORD = ['..KKKK..', '.KKkkKK.', 'KKkPPkKK', 'KkPWWPkK', 'KkPWWPkK', 'KKkPPkKK', '.KKkkKK.', '..KKKK..']
const RECORD_C = { K: '#1b1236', k: '#3a3358', P: '#ff8fb1', W: '#fff1c8' }
const KEYB = ['.YYY......', 'Y...YYYYYY', 'Y...Y..Y.Y', '.YYY......']
const KEY_C = { Y: '#f2c75c' }
const KEEP_BM = [[RING, RING_C, 9], [HOODIE, HOODIE_C, 9], [TAPE, TAPE_C, 8], [LETTER, LETTER_C, 8], [ROSE, ROSE_C, 9], [RECORD, RECORD_C, 8], [KEYB, KEY_C, 8]]

const lastLine = 'You come back | *lighter.*'

// Inanna's regalia, drawn on her (star centre x, y, size s); n = how many items she still wears (7 → 0)
function regalia(ctx, x, y, s, n, { only = -1 } = {}) {
  const c = Math.max(3, Math.round(s / 40))
  const has = i => only >= 0 ? i === only : n > i
  if (has(6)) {                                         // the robe: a long cloth behind and below her
    ctx.save(); ctx.fillStyle = '#7d5a8c'
    for (let j = 0; j < 9; j++) { const w = s * (0.5 + j * 0.05); R(ctx, '#6a4878', x - w / 2, y + s * 0.05 + j * c * 2, w, c * 2) }
    ctx.restore()
  }
  if (has(5)) {                                         // the measuring rod and its coiled line, held at her side
    R(ctx, INK, x + s * 0.44 - c, y - s * 0.32 - c, c * 3, s * 0.78 + 2 * c); R(ctx, '#5b8fe0', x + s * 0.44, y - s * 0.32, c, s * 0.78)
    for (let k = 0; k < 3; k++) R(ctx, '#d9c6a0', x + s * 0.44 - c * 2 + k * c, y + s * 0.1 + k * c * 1.5, c * 4 - k * c, c)
  }
  if (has(3)) { R(ctx, INK, x - s * 0.1 - c, y + s * 0.2 - c, s * 0.2 + 2 * c, s * 0.12 + 2 * c); R(ctx, '#f2c75c', x - s * 0.1, y + s * 0.2, s * 0.2, s * 0.12); R(ctx, '#b9852f', x - s * 0.04, y + s * 0.23, s * 0.08, s * 0.05) }
  if (has(2)) for (const sx of [-1, 1]) { R(ctx, INK, x + sx * s * 0.2 - c * 2, y + s * 0.2 - c * 2, c * 4, c * 5); R(ctx, '#5b8fe0', x + sx * s * 0.2 - c, y + s * 0.2 - c, c * 2, c * 3) }
  if (has(1)) for (let k = -4; k <= 4; k++) { const a = k / 4 * 0.9, bx = x + Math.sin(a) * s * 0.2, by = y + s * 0.08 + (1 - Math.cos(a)) * -s * 0.05; R(ctx, INK, bx - c * 1.5, by - c * 1.5, c * 3, c * 3); R(ctx, LAPIS, bx - c, by - c, c * 2, c * 2) }
  if (has(4)) drawBits(ctx, RING, RING_C, Math.round(x - s * 0.44), Math.round(y + s * 0.04), c)
  if (has(0)) drawBits(ctx, CROWN, CROWN_C, Math.round(x), Math.round(y - s * 0.56), c * 1.4)
}
// where each item sits on her (for the flight to the tray)
const itemAnchor = (i, x, y, s) => [[x, y - s * 0.56], [x, y + s * 0.08], [x, y + s * 0.2], [x, y + s * 0.26], [x - s * 0.44, y + s * 0.04], [x + s * 0.44, y], [x, y + s * 0.3]][i]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const ac = document.createElement('canvas'); ac.width = 1080; ac.height = 1920
  const a = ac.getContext('2d')

  const hook = hookCard(root, { text: 'Seven gates. | One *goddess.*', at: 0, out: T.hookOut, accentColor: GOLD })
  const C1 = popText(root, 'From ancient | *Sumer.*', { top: 720, size: 104, accentSize: 190, at: T.card1[0] + 0.15, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.card1[0] + 0.55, fit: true })
  const C2 = popText(root, 'Seven gates. | Seven *goodbyes.*', { top: 760, size: 100, accentSize: 170, at: T.card2[0] + 0.05, gap: 0.07, accentColor: PINK, wobble: true, late: 1, lateAt: T.card2[0] + 0.3, fit: true })
  const H1 = popText(root, 'Some scholars link this | to Venus *vanishing.*', { top: 196, size: 76, accentSize: 132, at: T.h1, gap: 0.06, accentColor: PINK, wobble: true, late: 1, lateAt: T.h1Land, fit: true })
  const LAST = popText(root, lastLine, { top: 236, size: 118, accentSize: 200, at: T.last, gap: 0.09, accentColor: '#ffd98a', wobble: true, late: 1, lateAt: T.last + 0.45, fit: true })
  const box1 = dialogueBox(root, { lines: LINES1, y: 1470, width: 960, height: 290, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1470, width: 960, height: 290, cps: CPS, close: T.last - 0.1 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── the archive look (season 6's grade), applied to the offscreen layer
  function grade(t) {
    a.save()
    a.globalCompositeOperation = 'color'; a.fillStyle = SEPIA; a.fillRect(0, 0, 1080, 1920)
    a.globalCompositeOperation = 'lighter'; a.fillStyle = 'rgb(34,22,10)'; a.fillRect(0, 0, 1080, 1920)
    a.globalCompositeOperation = 'multiply'; a.fillStyle = '#f6dfb8'; a.fillRect(0, 0, 1080, 1920)
    a.globalCompositeOperation = 'source-over'
    a.fillStyle = `rgba(10,6,2,${0.04 + 0.1 * noise1(t * 9, 4)})`; a.fillRect(0, 0, 1080, 1920)
    const g = a.createRadialGradient(540, 900, 260, 540, 900, 1100)
    g.addColorStop(0, 'rgba(20,12,4,0)'); g.addColorStop(1, 'rgba(20,12,4,0.65)')
    a.fillStyle = g; a.fillRect(0, 0, 1080, 1920)
    a.restore()
  }
  function scratches(t, P) {
    const r = rng(1000 + Math.floor(t * 12))
    a.save(); a.beginPath(); a.rect(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0); a.clip()
    const ns = r() < 0.7 ? 1 + Math.floor(r() * 2) : 0
    for (let i = 0; i < ns; i++) { const sx = P.x0 + r() * (P.x1 - P.x0), al = 0.15 + r() * 0.3; a.fillStyle = r() < 0.5 ? `rgba(255,244,220,${al})` : `rgba(30,18,8,${al})`; a.fillRect(Math.round(sx), P.y0, 2 + Math.floor(r() * 2), P.y1 - P.y0) }
    for (let i = 0; i < 7; i++) { const s = 3 + Math.floor(r() * 6); a.fillStyle = r() < 0.6 ? 'rgba(25,15,6,0.55)' : 'rgba(255,246,226,0.5)'; a.fillRect(Math.round(P.x0 + r() * (P.x1 - P.x0)), Math.round(P.y0 + r() * (P.y1 - P.y0)), s, Math.max(2, s - 2)) }
    a.restore()
  }
  function sprockets(t, P) {
    const off = (t * 150) % 60
    x.save(); x.fillStyle = '#1a120a'
    x.fillRect(P.x0 - 6, P.y0 - 8, 46, P.y1 - P.y0 + 16); x.fillRect(P.x1 - 40, P.y0 - 8, 46, P.y1 - P.y0 + 16)
    x.fillStyle = '#d9c6a0'
    for (let y = P.y0 - 60 + off; y < P.y1 - 4; y += 60) { if (y < P.y0) continue; const hh = Math.min(26, P.y1 - y - 4); x.fillRect(P.x0 + 8, Math.round(y), 18, hh); x.fillRect(P.x1 - 26, Math.round(y), 18, hh) }
    x.restore()
  }
  /** draw fn into the archive layer inside rect P, grade it, then composite onto the frame (with gate weave) */
  function archive(t, P, drawFn, { strip = true, k = 1 } = {}) {
    a.clearRect(0, 0, 1080, 1920)
    const wx = Math.round((noise1(t * 7, 1) - 0.5) * 6), wy = Math.round((noise1(t * 7, 2) - 0.5) * 6)
    a.save(); a.beginPath(); a.rect(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0); a.clip()
    a.fillStyle = '#0d0820'; a.fillRect(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0)
    a.translate(wx, wy); drawFn(a, t)
    a.restore()
    grade(t); scratches(t, P)
    x.save(); x.globalAlpha = k
    x.drawImage(ac, P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0, P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0)
    x.restore()
    if (strip) sprockets(t, P)
    return [wx, wy]
  }

  // ── the set pieces
  /** a Mesopotamian city gate: two crenellated towers, a glazed band, a dark arched doorway; n cuneiform wedges over it */
  function gate(ctx, t, cx, base, s, n, { tray = 0, eyes = true, lit = 1 } = {}) {
    const c = Math.max(2, Math.round(6 * s))
    const tw = 150 * s, th = 560 * s, dw = 220 * s, dh = 330 * s
    const brick = (x0, y0, w, h, col, dark) => {
      R(ctx, INK, x0 - c, y0 - c, w + 2 * c, h + c)
      R(ctx, col, x0, y0, w, h)
      for (let yy = y0 + c * 4, j = 0; yy < y0 + h; yy += c * 4, j++) { R(ctx, dark, x0, yy, w, Math.max(1, c / 2)); for (let xx = x0 + (j % 2 ? c * 4 : 0); xx < x0 + w; xx += c * 8) R(ctx, dark, xx, yy - c * 4, Math.max(1, c / 2), c * 4) }
    }
    // the wall between the towers + the doorway
    brick(cx - dw / 2 - 30 * s, base - th * 0.78, dw + 60 * s, th * 0.78, '#b0855a', '#8a6440')
    for (const sx of [-1, 1]) {
      const x0 = cx + sx * (dw / 2 + 30 * s) - (sx < 0 ? tw : 0)
      brick(x0, base - th, tw, th, '#c29466', '#946c46')
      for (let k = 0; k < 4; k++) R(ctx, '#c29466', x0 + k * tw / 4 + c, base - th - c * 5, tw / 4 - 2 * c, c * 5)     // crenels
      R(ctx, '#3d5bd9', x0, base - th * 0.62, tw, c * 4)                                                                // glazed band
      for (let k = 0; k < 3; k++) R(ctx, '#f2c75c', x0 + tw * (0.2 + k * 0.3), base - th * 0.62 + c, c * 2, c * 2)    // rosettes
    }
    R(ctx, '#3d5bd9', cx - dw / 2 - 30 * s, base - th * 0.62, dw + 60 * s, c * 4)
    // the doorway (arched)
    const dx0 = cx - dw / 2, dy0 = base - dh
    R(ctx, INK, dx0 - c, dy0 - c, dw + 2 * c, dh + c)
    R(ctx, '#07040e', dx0, dy0, dw, dh)
    for (let k = 0; k < 6; k++) { const w = dw * (1 - Math.pow(k / 6, 2)) ; R(ctx, '#07040e', cx - w / 2, dy0 - (k + 1) * c * 2, w, c * 2) }
    // the gate's number in cuneiform: n vertical wedges over the arch
    for (let k = 0; k < n; k++) {
      const wx = cx + (k - (n - 1) / 2) * c * 5, wy = dy0 - c * 22
      R(ctx, '#3a2414', wx - c * 1.5, wy, c * 3, c * 2); R(ctx, '#3a2414', wx - c / 2, wy + c * 2, c, c * 5)
    }
    // Neti the gatekeeper: two eyes in the dark, and the tray
    if (eyes) { const bl = (t * 0.7 + n * 0.3) % 3.3 < 0.12; for (const sx of [-1, 1]) R(ctx, '#fff1c8', cx + sx * c * 4 - c, dy0 + dh * 0.32, c * 2, bl ? c * 0.6 : c * 2) }
    if (tray > 0) {
      const ty = dy0 + dh * 0.62, tw2 = 120 * s * tray
      R(ctx, '#d9b47a', cx - c * 8, ty + c, c * 5, c * 2); R(ctx, '#d9b47a', cx + c * 3, ty + c, c * 5, c * 2)       // hands
      R(ctx, INK, cx - tw2 / 2 - c, ty - c, tw2 + 2 * c, c * 3); R(ctx, '#e8c98a', cx - tw2 / 2, ty, tw2, c)
    }
    void lit
  }
  /** Inanna: a gold star with the eight-pointed star of Inanna behind her (her real symbol) and her regalia */
  function inanna(ctx, t, X, Y, s, n, { hops = null, mood = 'neutral', look = [0, 0], halo = 1, pop = 1 } = {}) {
    if (pop <= 0) return null
    ctx.save()
    // the eight-pointed star symbol, slowly turning
    if (halo > 0) {
      ctx.save(); ctx.globalAlpha *= 0.55 * halo; ctx.translate(X, Y); ctx.rotate(t * 0.15)
      for (let k = 0; k < 8; k++) { ctx.rotate(Math.PI / 4); ctx.fillStyle = '#f7dca0'; ctx.beginPath(); ctx.moveTo(0, -s * 0.95); ctx.lineTo(s * 0.09, -s * 0.3); ctx.lineTo(-s * 0.09, -s * 0.3); ctx.closePath(); ctx.fill() }
      ctx.restore()
    }
    const has = i => i >= 7 - n                                                   // items leave in order, crown first
    if (has(6)) regalia(ctx, X, Y, s * pop, 7, { only: 6 })                       // the robe goes behind
    const r = drawStarChar(ctx, X, Y, s, t, { color: '#f2c75c', mood, look, hops, pop, seed: 4, glow: 0.7 })
    for (let i = 0; i < 6; i++) if (has(i)) regalia(ctx, r.x, r.y, s * pop, 7, { only: i })
    ctx.restore()
    return r
  }
  function keepsakeBox(ctx, t, X, Y, label, { shake = 0 } = {}) {
    const j = Math.round(Math.sin(t * 40) * 3 * shake)
    R(ctx, INK, X - 106 + j, Y - 86, 212, 132)
    R(ctx, '#b9824a', X - 100 + j, Y - 80, 200, 120); R(ctx, '#9a6a38', X - 100 + j, Y - 80, 200, 14)
    R(ctx, '#d39a5e', X - 112 + j, Y - 96, 100, 18); R(ctx, '#d39a5e', X + 12 + j, Y - 96, 100, 18)       // open flaps
    ctx.save(); ctx.font = `700 30px 'Space Mono', monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK; ctx.fillText(label, X + j, Y - 20); ctx.restore()
  }
  /** the colour plate: Venus on a cloud ledge, the box on the right; gate n's keepsake flies in */
  function venusPlate(t, P, n, at) {
    x.save(); x.beginPath(); x.rect(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0); x.clip()
    const g = x.createLinearGradient(0, P.y0, 0, P.y1); g.addColorStop(0, '#1d0f3a'); g.addColorStop(1, '#4a1f52')
    x.fillStyle = g; x.fillRect(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0)
    for (let i = 0; i < 30; i++) { x.globalAlpha = 0.35 + 0.35 * Math.sin(t * 2 + i); R(x, BONE, P.x0 + (i * 131) % (P.x1 - P.x0), P.y0 + (i * 71) % (P.y1 - P.y0 - 160), 4, 4) }
    x.globalAlpha = 1
    // the cloud ledge
    for (let i = 0; i < 9; i++) { const cx = P.x0 + 40 + i * 110; R(x, '#d9cdf0', cx - 70, P.y1 - 90 - (i % 2) * 14, 140, 120) }
    R(x, '#b9acd9', P.x0, P.y1 - 40, P.x1 - P.x0, 40)
    const lighter = clamp((t - GATE0) / (7 * GATE_LEN)), vy = P.y1 - 230 - 90 * ease.inOutQuad(lighter) + Math.sin(t * 2) * 4
    const retro = 1 - clamp(n / 7 + prog(t, at + 0.9, at + 1.5) / 7)
    const sp = prog(t, at + 0.2, at + 0.9)
    const r = drawVenus(x, 300, vy, 230, t, { retro, mood: sp > 0 && sp < 1 ? 'squint' : prog(t, at + 0.9, at + 1.3) > 0 ? 'happy' : 'neutral', look: [1, 0], hops: [at + 0.2, at + 0.95], seed: 5 })
    // the box (the ghost peeks out of it at gate V), then this gate's keepsake flying in
    keepsakeBox(x, t, BOX.x, BOX.y, 'EXES', { shake: Math.max(0, 1 - Math.abs(t - at - 0.95) * 6) })
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'below', cell: 3 })
    R(x, '#b9824a', BOX.x - 100, BOX.y - 66, 200, 10)                         // the box's front lip over the ghost
    const [bm, cols, cell] = KEEP_BM[n]
    const fp = prog(t, at + 0.25, at + 0.95)
    if (fp < 1) {
      const fx = lerp(r.x + 110, BOX.x, ease.inOutQuad(fp)), fy = lerp(r.y, BOX.y - 100, fp) - Math.sin(Math.PI * fp) * 170
      drawBits(x, bm, cols, Math.round(fx), Math.round(fy), cell, { rot: fp * 2.4 })
    }
    burst(x, t, at + 0.95, BOX.x, BOX.y - 100, { n: 8, R: 90, cols: [PINK, GOLD, BONE], seed: n + 3 })
    x.restore()
    // the label under the plate
    chip(x, t, { at: at + 0.12, out: at + GATE_LEN - 0.04, text: `♀ LETS GO OF: ${KEEPS[n]}`, x: 540, y: P.y1 + 52, size: 28, color: '#ffc2d8', border: PINK, type: false })
    // plate border
    x.save(); x.strokeStyle = PINK; x.lineWidth = 6; x.globalAlpha = 0.8; x.strokeRect(P.x0 + 3, P.y0 + 3, P.x1 - P.x0 - 6, P.y1 - P.y0 - 6); x.restore()
  }
  /** the real sky: Sun, Venus's orbit, Earth; Venus passes between them and vanishes in the glare */
  function skyDiagram(t, k) {
    const S = { x: 540, y: 820 }, E = { x: 540, y: 1330 }, rv = 300
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(2,4,16,0.55)'; x.fillRect(0, 0, 1080, 1920)
    // the orbit (dotted pixel ring)
    for (let i = 0; i < 72; i++) { const an = i / 72 * Math.PI * 2; R(x, 'rgba(255,143,177,0.55)', S.x + Math.cos(an) * rv - 3, S.y + Math.sin(an) * rv - 3, 6, 6) }
    // the glare cone from Earth toward the Sun
    const ga = 0.18 + 0.12 * prog(t, ...T.vanish)
    x.save(); x.globalCompositeOperation = 'lighter'
    const cg = x.createLinearGradient(0, S.y, 0, E.y); cg.addColorStop(0, `rgba(255,220,140,${ga})`); cg.addColorStop(1, 'rgba(255,220,140,0)')
    x.fillStyle = cg; x.beginPath(); x.moveTo(E.x, E.y - 30); x.lineTo(S.x - 170, S.y); x.lineTo(S.x + 170, S.y); x.closePath(); x.fill(); x.restore()
    // the Sun
    glow(x, S.x, S.y, 260, '#ffd98a', 1)
    for (let yy = -9; yy <= 9; yy++) { const w = Math.round(Math.sqrt(81 - yy * yy)); R(x, yy < -4 ? '#fff1c8' : '#ffd34d', S.x - w * 8, S.y + yy * 8, w * 16, 8) }
    monoText(x, 'THE SUN', S.x, S.y - 120, { size: 26, color: '#ffe3a0' })
    // Earth
    for (let yy = -4; yy <= 4; yy++) { const w = Math.round(Math.sqrt(16 - yy * yy)); R(x, '#3d7be0', E.x - w * 8, E.y + yy * 8, w * 16, 8) }
    R(x, '#5fbf6a', E.x - 16, E.y - 16, 16, 16); R(x, '#5fbf6a', E.x + 4, E.y + 6, 12, 12)
    monoText(x, 'EARTH (US)', E.x, E.y + 70, { size: 26, color: CYAN2 })
    // Venus, moving along the near side of its orbit
    const p = prog(t, T.sky[0] + 0.6, T.sky[1] - 0.3)
    const an = Math.PI / 2 + lerp(0.95, -0.95, ease.inOutSine ? ease.inOutSine(p) : p)
    const vx = S.x + Math.cos(an) * rv, vy = S.y + Math.sin(an) * rv
    const inGlare = 1 - clamp(Math.abs(vx - S.x) / 110)
    drawVenus(x, vx, vy, 120, t, { retro: 0.6, alpha: 1 - 0.92 * inGlare, mood: inGlare > 0.4 ? 'squint' : 'neutral', look: [0, 1], seed: 5 })
    if (inGlare > 0.05) glow(x, vx, vy, 200, '#fff6dc', 0.9 * inGlare)
    x.restore()
    chip(x, t, { at: T.sky[0] + 0.9, out: T.sky[1] - 0.2, text: '✦ VENUS PASSES BETWEEN EARTH AND THE SUN', x: 540, y: 1480, size: 26, color: GOLD })
    chip(x, t, { at: T.vanish[0] + 0.4, out: T.sky[1] - 0.2, text: 'LOST IN THE SUN’S GLARE FOR A FEW DAYS', x: 540, y: 1580, size: 26, color: '#ffe3a0', border: '#ffd98a' })
  }

  // ── the archive tableaux
  function coldOpen(ctx, t) {
    // Gate I, big; Inanna in front of the left tower, mid-lift: her crown already over her head, drifting to the tray
    gate(ctx, t, 600, 1560, 1.15, 1, { tray: 1 })
    const lift = ease.inOutQuad(prog(t, 0, 2.4))
    const r = inanna(ctx, t, 330, 1330, 280, 6, { mood: 'wide', look: [1, -1], hops: [0.9] })
    const cx = lerp(r.x + 20, 470, lift), cy = r.top - 70 - 60 * Math.sin(Math.PI * Math.min(1, lift * 1.3))
    drawBits(ctx, CROWN, CROWN_C, Math.round(cx), Math.round(cy), 9)
    for (const sx of [-1, 1]) R(ctx, '#f2c75c', cx + sx * 56 - 10, cy + 30, 20, 20)
  }
  function descent(ctx, t) {
    // the stair down past seven gates, each smaller and darker
    const p = prog(t, T.shotC[0], T.shotC[1])
    for (let n = 6; n >= 0; n--) {
      const s = 0.52 * Math.pow(0.8, n), gx = 300 + n * 95, gy = 760 + n * 105
      ctx.save(); ctx.globalAlpha = 1 - n * 0.11
      gate(ctx, t, gx, gy, s, n + 1, { eyes: n < 3 })
      ctx.restore()
    }
    // the stair
    for (let k = 0; k < 24; k++) R(ctx, '#5a4030', 120 + k * 36, 800 + k * 34, 120, 14)
    const ix = lerp(220, 380, p), iy = lerp(700, 860, p)
    inanna(ctx, t, ix, iy, 190, 7, { mood: 'neutral', look: [1, 1], hops: [5.2, 6.4, 7.6, 8.8, 10.0] })
  }
  function gateShot(ctx, t, n, at) {
    gate(ctx, t, 600, TOP.y1 + 10, 0.82, n + 1, { tray: 1 })
    // the items already left at earlier gates sit on the tray (the gatekeeper is tidy)
    const r = inanna(ctx, t, 300, TOP.y1 - 170, 210, prog(t, at + 0.25, at + 0.3) > 0 ? 6 - n : 7 - n, { mood: prog(t, at + 0.95, at + 1.4) > 0 ? 'happy' : 'neutral', look: [1, 0], hops: [at + 0.15] })
    return r
  }
  // the flying item, hand-tinted gold, drawn AFTER the grade
  function gateTint(t, n, at) {
    const fp = prog(t, at + 0.25, at + 0.95)
    if (fp <= 0) return
    const [ax, ay] = itemAnchor(n, 300, TOP.y1 - 170, 210)
    const tx = 600, ty = TOP.y1 + 10 - 330 * 0.82 + 0.62 * 330 * 0.82 - 16
    const fx = lerp(ax, tx, ease.inOutQuad(fp)), fy = lerp(ay, ty, fp) - Math.sin(Math.PI * fp) * 120
    x.save(); x.beginPath(); x.rect(TOP.x0, TOP.y0, TOP.x1 - TOP.x0, TOP.y1 - TOP.y0); x.clip()
    glow(x, fx, fy, 70, GOLD, fp < 1 ? 1 : 0.5)
    if (n === 0) drawBits(x, CROWN, CROWN_C, Math.round(fx), Math.round(fy), 6)
    else if (n === 4) drawBits(x, RING, RING_C, Math.round(fx), Math.round(fy), 7)
    else { x.save(); x.translate(fx, fy); x.rotate(fp * 3); R(x, INK, -22, -12, 44, 24); R(x, n === 6 ? '#b58fc9' : n === 1 || n === 2 ? '#7f9cf0' : GOLD, -18, -8, 36, 16); x.restore() }
    x.restore()
  }

  function gateTitle(t, n, at) {
    const k = pop01(t, at, 0.28, 2.6) * outK(t, [at + GATE_LEN - 0.12, at + GATE_LEN])
    if (k <= 0.01) return
    x.save(); x.translate(540, 300); x.scale(k, k)
    monoText(x, 'GATE', 0, -86, { size: 40, color: GOLD, spacing: 0.4 })
    x.font = `italic 500 190px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText(ROMAN[n], 0, 50); x.fillStyle = '#ffe3a0'; x.fillText(ROMAN[n], 0, 42)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.5 })
      const gi = Math.floor((t - GATE0) / GATE_LEN)
      if (t < T.card1[0]) {
        // FRAME 0: archive, full frame
        archive(t, { x0: 0, x1: 1080, y0: 0, y1: 1920 }, (c, tt) => { drawSky(c, tt, SKY_H); coldOpen(c, tt) }, { strip: false })
        { const lift = ease.inOutQuad(prog(t, 0, 2.4)); glow(x, lerp(350, 470, lift), 1030 - 60 * Math.sin(Math.PI * Math.min(1, lift * 1.3)), 150, GOLD, 0.9) }
        monoText(x, '▶ ARCHIVE FOOTAGE · AS TOLD IN SUMERIAN MYTH', 540, 1640, { size: 24, color: CREAM, spacing: 0.08, alpha: 0.9 })
      } else if (t < T.card1[1]) {
        // trailer card 1
        R(x, '#030208', 0, 0, 1080, 1920)
        monoText(x, 'THE SUMERIAN MYTH', 540, 640, { size: 30, color: GOLD, spacing: 0.3, n: Math.floor((t - T.card1[0]) / 0.03) })
        monoText(x, '“INANNA’S DESCENT”', 540, 1150, { size: 40, color: CREAM, spacing: 0.12, n: Math.floor((t - T.card1[0] - 0.9) / 0.04) })
      } else if (t < T.shotC[1]) {
        archive(t, FULL, (c, tt) => { drawSky(c, tt, SKY_H); descent(c, tt) }, { strip: false })
        lowerThird(x, t, { at: 5.35, out: 10.9, name: 'INANNA', sub: 'SUMERIAN GODDESS · LINKED WITH VENUS', y: 1260, w: 760, color: GOLD })
        monoText(x, '▶ ARCHIVE FOOTAGE · AS TOLD IN SUMERIAN MYTH', 540, 1390, { size: 24, color: CREAM, spacing: 0.08, alpha: 0.85 })
      } else if (t < T.card2[1]) {
        R(x, '#030208', 0, 0, 1080, 1920)
      } else if (t < T.gates[1]) {
        // the split screen
        const n = clamp(gi, 0, 6), at = gateAt(n)
        archive(t, TOP, (c, tt) => { drawSky(c, tt, SKY_H); gateShot(c, tt, n, at) })
        gateTint(t, n, at)
        chip(x, t, { at: at + 0.12, out: at + GATE_LEN - 0.04, text: `INANNA LEAVES: ${ITEMS[n]}`, x: 540, y: TOP.y0 - 2, size: 26, type: false, color: CREAM, border: '#d9b47a', fill: 'rgba(30,18,8,0.94)' })
        venusPlate(t, BOT, n, at)
        gateTitle(t, n, at)
        flash(x, t, at, { dur: 0.16, peak: 0.3 })
      } else if (t < T.sky[1]) {
        skyDiagram(t, ease.outCubic(prog(t, T.sky[0], T.sky[0] + 0.4)))
      } else {
        // the return: Gate I in colour, Venus rising back up through it, lighter
        const k = ease.outCubic(prog(t, T.ret[0], T.ret[0] + 0.4)) * popOut(t, T.out)
        x.save(); x.globalAlpha = k
        const dawn = x.createLinearGradient(0, 600, 0, 1700); dawn.addColorStop(0, 'rgba(255,170,190,0)'); dawn.addColorStop(1, 'rgba(255,170,190,0.25)')
        x.fillStyle = dawn; x.fillRect(0, 0, 1080, 1920)
        hiddenComet(x, t, { at: COMET.at, from: COMET.from, to: COMET.to, dur: 2.6 })
        gate(x, t, 540, 1560, 1.15, 1, { tray: 0, eyes: false })
        const rise = ease.inOutQuad(prog(t, T.ret[0] + 0.3, T.last + 2.5))
        glow(x, 540, 1290 - 260 * rise, 340, PINK, 0.8)
        const lp = prog(t, T.last, T.last + 0.6)
        drawVenus(x, 540, 1290 - 260 * rise, 300, t, { retro: 0, mood: lp > 0 ? 'sparkle' : 'happy', look: [0, -1], hops: [...talkHops(LINES2, VEN, { cps: CPS }), T.last + 0.45], seed: 5 })
        // the box, set down at the gate (now labelled DONATE)
        keepsakeBox(x, t, 860, 1620, t < T.donate ? 'EXES' : 'DONATE')
        x.restore()
      }
      // season devices (not on the black trailer cards)
      const onCard = (t >= T.card1[0] && t < T.card1[1]) || (t >= T.card2[0] && t < T.card2[1])
      if (!onCard && t < T.out[1]) {
        drawDayChip(x, t, DAY)
        genreBug(x, t, { text: '▶ TRAILER', x: 96, y: 1838, color: GOLD })
      }
      flash(x, t, T.card1[0], { dur: 0.25, peak: 0.8 })
      flash(x, t, T.sky[0], { dur: 0.25, peak: 0.6 })
      flash(x, t, T.ret[0], { dur: 0.3, peak: 0.8, col: '#ffe3ec' })
      hook.update(t)
      C1.update(t, t < T.card1[1] - 0.1 ? 1 : 0)
      C2.update(t, t < T.card2[1] - 0.05 ? 1 : 0)
      H1.update(t, outK(t, T.h1Out))
      box1.update(t); box2.update(t)
      LAST.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}
const CYAN2 = '#9fe8ff'

// card-motif candidates (beat changes): cold open → card, montage → the sky, the sky → the return
const CUTS = [{ t: 2.58, kind: 'flip' }, { t: T.sky[0] - 0.02, kind: 'flip' }, { t: T.ret[0] - 0.02, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S8 E11' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...stingerCues(T.card1[0], { key: KEY, kind: 'trailer' }),
  ['tick', r3(T.card1[0] + 0.9), 0.03],
  ...wordPops(T.card1[0] + 0.15, 2, 0.1, 0), ['pop', r3(T.card1[0] + 0.55), 1174.66, 0.045, 0],
  ['whoosh', T.shotC[0], 0.5, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [NARR]: 523.25 } }),
  ...stingerCues(T.card2[0], { key: KEY, kind: 'trailer' }),
  ...wordPops(T.card2[0] + 0.05, 3, 0.07, 2), ['pop', r3(T.card2[0] + 0.3), 1318.51, 0.045, 0],
  ...Array.from({ length: 7 }, (_, n) => {
    const at = gateAt(n)
    return [['tom', at, 70 + n * 4, { gain: 0.28 }], ['boom', at, 0.12], ['whoosh', r3(at + 0.3), 0.45, 0.025],
      ['pluck', r3(at + 0.95), NOTE[n % NOTE.length], 0.04, 0.5, 0.3], ['pop', r3(at + 0.95), NOTE[(n + 2) % NOTE.length], 0.035, 0.4]]
  }).flat(),
  ['tick', r3(T.ghost + 0.05), 0.015],
  ['riser', T.sky[0], T.vanish[0] + 1.0, 0.05], ['swell', T.vanish[0], T.vanish[1], { gain: 0.04 }],
  ...wordPops(T.h1, 5, 0.06, 1), ['pop', T.h1Land, 1318.51, 0.045, 0],
  ['bell', r3(T.sky[0] + 0.9), 1760, 0.025, 1.4, 0], ['bell', r3(T.vanish[0] + 0.4), 2093, 0.025, 1.6, 0],
  ['crash', T.ret[0], { gain: 0.05, len: 2.6 }], ['glitter', T.ret[0], T.ret[0] + 0.8],
  ...talkCues(LINES2, { cps: CPS, pitch: { [VEN]: 987.77, [NARR]: 523.25 } }),
  ['tick', r3(T.comet + 0.6), 0.012],
  ...wordPops(T.last, 3, 0.09, 3), ['pop', r3(T.last + 0.45), 1567.98, 0.05, 0], ['bell', r3(T.last + 0.45), 2349.32, 0.03, 1.8, 0],
  ['whoosh', T.out[0], 0.35, 0.025],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
