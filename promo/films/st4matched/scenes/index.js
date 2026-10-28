// st4matched (20 s vertical Align ad, Star Talk season 4, EP 029, thread B3: Leo × Aquarius) · story 0–15.6, then the end card.
//   0.00–6.90  "Tonight's deck | dealt them | *each other.*"  Tonight's deck (st4deck's card backs) hovers centre stage and
//              deals a hand of three to each of two stars: the orange ♌ Leo star in its starleo crown (left) and the cyan
//              ♒ Aquarius star, staraqua headphones round its neck (right). Drop (2.82): each middle card flips to a veiled
//              profile card, with the other's glyph on it. Leo goes heart-eyed at once; Aquarius squints… then smiles.
//              Box (♒ AQUARIUS): "card first, face last. okay. *i'm in.*"  (The ghost peeks out from behind the deck, 4.0–5.3.)
//   6.95–11.6  "Fixed fire. | Fixed *air.*"  The two veiled cards float to the middle and touch; a pixel heart pops between
//              them. THE STARS: "fixed fire, fixed air. this'll be *interesting.*" Leo bounces; Aquarius rolls its eyes,
//              fondly, then grins.
//  11.70 cut → "Opposites, | *matched.*"  The pair side by side under their two cards, hopping; Leo heart-eyed, Aquarius
//              sparkle-eyed. Everything pops out by 15.45; the end card takes over at 15.6.
// Astrology: Leo and Aquarius are opposite signs, both fixed (Leo fixed fire, Aquarius fixed air).
// One canvas (sky + constellation + deck + cards + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 29
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', HOT = '#ff4fd8'
const MONO = "'Space Mono', ui-monospace, monospace"
const LEO = signStar('leo'), AQU = signStar('aquarius')
const BEAT = n => 0.6 + n * 0.5556

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.85, h0Out: [6.75, 6.93],
  deck: 0.3, leoIn: 0.4, aquIn: 0.55, deal0: 1.0, dealGap: 0.14,
  flip: [BEAT(4), BEAT(4) + 0.4],               // 2.82: both middle cards flip
  heart: 3.15, squint: [3.2, 4.5], smile: 4.6,
  open: 4.7, s1: 4.9, ghost: 4.0,
  h1: 7.0, h1Land: 7.35, fly: [7.1, 7.8], kiss: 7.8, s2: 8.2, roll: [9.3, 10.1], grin: 10.2,
  close: 11.6, h1Out: [11.45, 11.62], deckOut: [6.6, 7.0],
  cut: 11.7, h2: 11.76, h2Land: 12.15, h2Out: [15.15, 15.4], out: [15.05, 15.45],
}
const LINES = [
  { t: T.s1, speaker: '♒ AQUARIUS', text: "card first, face last. okay. *i'm in.*", color: AQU.color },
  { t: T.s2, speaker: 'THE STARS', text: "fixed fire, fixed air. this'll be *interesting.*", color: GOLD },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

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

// ── props: starleo's crown; a heart
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── layout
const DECK = { x: 540, y: 700, w: 150 }
const LEO_P = { x: 270, y: 1180, size: 300 }, AQU_P = { x: 810, y: 1180, size: 290 }
const LEO_F = { x: 330, y: 1220, size: 300 }, AQU_F = { x: 750, y: 1220, size: 290 }
const HAND_Y = 830, CW = 122, CW_MID = 160
const MID = { y: 760 }
const GHOST = { at: T.ghost, x: DECK.x + 72, y: DECK.y - 10, from: 'left', where: "leaning out from behind tonight's deck, between Leo's hand and Aquarius's" }
// deal order: alternate leo / aquarius, three each (k = 0,1,2 = left, middle, right)
const DEALS = Array.from({ length: 6 }, (_, i) => ({ who: i % 2, k: [0, 0, 1, 1, 2, 2][i], t: +(T.deal0 + i * T.dealGap).toFixed(3) }))

function leoState(t) {
  if (t < T.flip[0]) return { mood: 'happy', look: [0, -1] }
  if (t < T.heart) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.cut) return { mood: 'heart' }                                   // instantly
  if (t < T.h2Land) return { mood: 'happy' }
  return { mood: 'heart' }
}
function aquState(t) {
  if (t < T.flip[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.squint[1]) return { mood: 'squint', look: [-0.5, -1], blink: false }  // hm.
  if (t < T.smile) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.roll[0]) return { mood: 'happy' }
  if (t < T.roll[1]) return { mood: 'eyeroll' }                                  // "interesting." sure.
  if (t < T.cut) return { mood: 'happy' }
  return { mood: 'sparkle', look: [-1, 0] }
}
const LEO_HOPS = [T.leoIn + 0.3, T.heart, T.heart + 0.45, T.kiss, 8.5, 9.0, 9.5, T.h2Land, 12.9, 13.7, 14.5]
const AQU_HOPS = [T.aquIn + 0.3, T.smile, ...talkHops(LINES, '♒ AQUARIUS', { cps: CPS }), T.grin, T.h2Land + 0.1, 13.3, 14.1]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const backIm = await loadImg('card-back.png')
  const BACK = bake(backIm, 240)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, "Tonight's deck | dealt them | *each other.*", { top: 170, size: 92, accentSize: 140, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Land, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.04 })
  const H1 = popText(root, 'Fixed fire. | Fixed *air.*', { top: 190, size: 120, accentSize: 170, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: AQU.color, lineHeight: 1.02 })
  const H2 = popText(root, 'Opposites, | *matched.*', { top: 190, size: 136, accentSize: 200, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawImg(img, bodyFrac, wBody) { if (!img) return; const w = wBody / bodyFrac, h = w * img.height / img.width; x.drawImage(img, -w / 2, -h / 2, w, h) }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, AQU.color]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  /** a glyph coin on a card (so we know whose card it is) */
  function glyphCoin(cx, cy, glyph, col, r = 26) {
    x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 5, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.font = `700 ${Math.round(r * 1.3)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(glyph, cx, cy + 2)
  }

  /** a veiled profile card (card first, face last): no name, no photo, just an aura in the other's colour and its glyph */
  function veiled(t, w, o) {
    const h = w * 1.55, r = w * 0.08
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, r + 4); x.fill()
    x.fillStyle = '#140c30'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.fill()
    x.save(); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.clip()
    // the aura veil: soft drifting blobs in the sign's colour
    for (let i = 0; i < 3; i++) {
      const bx = Math.sin(t * 0.9 + i * 2.1) * w * 0.18, by = -h * 0.12 + Math.cos(t * 0.7 + i * 1.7) * h * 0.08, R = w * (0.55 - i * 0.1)
      const g = x.createRadialGradient(bx, by, 0, bx, by, R); g.addColorStop(0, o.color + 'cc'); g.addColorStop(1, o.color + '00')
      x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    }
    // a veiled silhouette
    x.fillStyle = 'rgba(20,12,48,0.45)'; x.beginPath(); x.arc(0, -h * 0.17, w * 0.17, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(0, h * 0.08, w * 0.3, w * 0.2, 0, Math.PI, 0); x.fill()
    // text bars (unreadable on purpose)
    x.fillStyle = 'rgba(239,230,214,0.45)'
    for (let i = 0; i < 3; i++) x.fillRect(-w * 0.36, h * 0.18 + i * h * 0.075, w * (0.72 - i * 0.16), h * 0.03)
    x.restore()
    x.strokeStyle = GOLD; x.lineWidth = 2; x.globalAlpha = 0.7; x.beginPath(); x.roundRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16, r * 0.6); x.stroke(); x.globalAlpha = 1
    glyphCoin(0, -h * 0.17, o.glyph, o.color, w * 0.15)
  }
  // ── the deck: a squared-up stack with a glow, bobbing, shrinking as it deals
  function drawDeck(t) {
    const k = pop01(t, T.deck, 0.4, 2) * (1 - ease.inCubic(prog(t, ...T.deckOut)))
    if (k <= 0.01) return
    const left = 6 - DEALS.filter(d => t >= d.t).length
    const bob = Math.sin(t * 2.2) * 8
    x.save(); x.translate(DECK.x, DECK.y + bob); x.scale(k, k)
    const g = x.createRadialGradient(0, 0, 0, 0, 0, 220); g.addColorStop(0, 'rgba(242,199,92,0.3)'); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.fillRect(-220, -220, 440, 440)
    for (let i = 0; i < 3 + left; i++) { x.save(); x.translate(-i * 1.5, -i * 3.5); x.rotate(-0.04 + i * 0.006); drawImg(BACK, BACK_BODY, DECK.w); x.restore() }
    x.restore()
  }
  /** where card k of a hand sits (who 0 = Leo, 1 = Aquarius) */
  function handPos(who, k, t) {
    const P = who ? AQU_P : LEO_P
    const fan = [-1, 0, 1][k]
    return { x: P.x + fan * 92, y: HAND_Y + Math.abs(fan) * 22 + Math.sin(t * 2 + who * 2 + k) * 4, rot: fan * 0.2, w: CW }
  }
  function drawHands(t) {
    if (t >= T.cut) return
    const out = 1 - ease.inCubic(prog(t, T.fly[0] - 0.2, T.fly[0] + 0.2))
    for (const d of DEALS) {
      if (t < d.t) continue
      const isMid = d.k === 1
      if (isMid && t >= T.fly[0]) continue                 // the middle ones fly to the centre (drawMidCards)
      const p = ease.outCubic(prog(t, d.t, d.t + 0.35))
      const H = handPos(d.who, d.k, t)
      const cx = lerp(DECK.x, H.x, p), cy = lerp(DECK.y, H.y, p) - Math.sin(Math.PI * p) * 80
      const rot = lerp(-0.04, H.rot, p) + (1 - p) * (d.who ? 2 : -2)
      if (isMid) { drawMidCard(t, d.who, cx, cy, rot, p); continue }
      if (out <= 0.01) continue
      x.save(); x.globalAlpha = out; x.translate(cx, cy); x.rotate(rot); x.scale(out, out); drawImg(BACK, BACK_BODY, H.w); x.restore()
    }
  }
  /** the middle card: grows a little once dealt, flips to the veiled profile with the other's glyph */
  function drawMidCard(t, who, cx, cy, rot, p) {
    const grow = ease.outCubic(prog(t, T.flip[0] - 0.4, T.flip[0]))
    const w = lerp(CW, CW_MID, grow)
    const y = lerp(cy, MID.y, grow)
    const fp = prog(t, ...T.flip)
    const sx = Math.cos(Math.PI * fp)
    x.save(); x.translate(cx, y); x.rotate(rot * (1 - grow))
    if (fp > 0 && fp < 1) x.scale(1 + 0.08 * Math.sin(Math.PI * fp), 1 + 0.08 * Math.sin(Math.PI * fp))
    if (sx > 0) { x.scale(sx, 1); drawImg(BACK, BACK_BODY, w) }
    else {
      x.scale(-sx, 1); veiled(t, w, who ? LEO : AQU)
    }
    x.restore()
    if (who === 0) sparkles(t, LEO_P.x, MID.y, T.flip[1] - 0.1, 8, 120, 0.2)
    else sparkles(t, AQU_P.x, MID.y, T.flip[1] - 0.05, 8, 120, 1.0)
  }
  /** the two veiled cards, from the hands to the middle, touching; then over the pair in the last beat */
  function drawPairCards(t, ok) {
    if (t < T.fly[0]) return
    const pre = t < T.cut
    const e = ease.inOutCubic(prog(t, ...T.fly))
    const k = pre ? 1 : pop01(t, T.cut + 0.1, 0.4, 1.8) * ok
    if (k <= 0.01) return
    const tY = pre ? 760 : 800, w = pre ? lerp(CW_MID, 190, e) : 190
    for (const who of [0, 1]) {
      const P = who ? AQU_P : LEO_P
      const tx = 540 + (who ? 1 : -1) * 108
      const cx = pre ? lerp(P.x, tx, e) : tx, cy = (pre ? lerp(MID.y, tY, e) - Math.sin(Math.PI * e) * 90 : tY) + Math.sin(t * 2 + who) * 5
      const rot = (who ? 1 : -1) * (pre ? lerp(0, 0.09, e) : 0.09)
      x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
      veiled(t, w, who ? LEO : AQU)
      x.restore()
    }
    // the heart where they touch
    const hk = pre ? pop01(t, T.kiss, 0.35, 2.6) : pop01(t, T.cut + 0.3, 0.35, 2.6) * ok
    if (hk > 0.02) drawBits(x, HEART, HEART_C, 540, Math.round(tY - 150 + Math.sin(t * 3) * 6), 12 * hk * (1 + 0.07 * Math.sin(t * 8)))
    if (pre) sparkles(t, 540, tY, T.kiss, 12, 170, 0.5)
  }

  function drawCrown(t, r, size, pop) {
    const cell = size * pop / 30
    drawBits(x, CROWN, CROWN_C, Math.round(r.x + size * 0.02), Math.round(r.top - CROWN.length * cell * 0.12), cell, { rot: 0.14 + 0.04 * Math.sin(t * 3) })
  }
  /** staraqua's headphones, resting round the neck */
  function headphones(r, size, pop) {
    const s = size * pop, c = Math.max(4, Math.round(s / 30))
    const cupY = r.y + s * 0.3, cupX = s * 0.27, ry = s * 0.1
    for (const [col, wd] of [[INK, 3], ['#3a2a6e', 2]]) for (let i = 0; i <= 22; i++) {
      const a = Math.PI * i / 22, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = col; x.fillRect(Math.round(bx - c * wd / 2), Math.round(by - c * wd / 2), c * wd, c * wd)
    }
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 3.4, h = c * 5
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      const pre = t < T.cut
      if (ok > 0) {
        if (pre) {
          drawDeck(t)
          drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, from: GHOST.from, dur: 1.3, cell: 4 })
        }
        const L = pre ? LEO_P : LEO_F, Q = pre ? AQU_P : AQU_F
        const lp = pop01(t, pre ? T.leoIn : T.cut + 0.05, 0.36, 2.2) * ok
        const ap = pop01(t, pre ? T.aquIn : T.cut + 0.12, 0.36, 2.2) * ok
        if (lp > 0.02) {
          const r = drawStarChar(x, L.x, L.y, L.size, t, { color: LEO.color, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 5, glow: 1.15 })
          drawCrown(t, r, L.size, lp)
          sparkles(t, r.x, r.y, T.heart, 10, 190, 0.7, [PINK, GOLD, BONE])
        }
        if (ap > 0.02) {
          const r = drawStarChar(x, Q.x, Q.y, Q.size, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, pop: ap, seed: 11, glow: 1.15 })
          headphones(r, Q.size, ap)
          sparkles(t, r.x, r.y, T.smile, 10, 180, 1.4, [AQU.color, '#7dff8a', BONE])
        }
        drawHands(t)
        drawPairCards(t, ok)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.95 (→ "Fixed fire. Fixed air.") and 11.7 (box shut → "Opposites, matched."). cardfx picks.
const CUTS = [6.95, { t: T.cut, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.12, 1318.51, 0.04, 0],
  ['whoosh', T.deck, 0.35, 0.025], ['pop', T.leoIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.aquIn + 0.05, 880, 0.04, 0.3],
  ...DEALS.map((d, i) => ['tick', d.t, 0.03 + (i % 2) * 0.01]), ...DEALS.map(d => ['whoosh', d.t, 0.18, 0.012]),
  ['whoosh', T.flip[0] - 0.05, 0.35, 0.025], ['tick', T.flip[0] + 0.2, 0.05], ['pluck', T.flip[0] + 0.2, 1174.66, 0.045, 0.6, 0],
  ['bell', T.heart, 1760, 0.025, 1.0, -0.3], ['glitter', T.heart, T.heart + 0.5],
  ['pop', T.squint[0] + 0.3, 440, 0.03, 0.3], ['pluck', T.smile, 987.77, 0.04, 0.5, 0.3],
  ['pop', T.ghost + 0.05, 1318.51, 0.012, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.1, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.fly[0], 0.5, 0.03], ['tick', T.kiss, 0.06], ['pluck', T.kiss, 1318.51, 0.05, 0.7, 0], ['bell', T.kiss + 0.05, 1760, 0.025, 1.0, 0], ['glitter', T.kiss, T.kiss + 0.6],
  ['pop', T.roll[0], 523.25, 0.03, 0.3], ['pop', T.grin, 880, 0.035, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land + 0.05, 1174.66, 0.05, 0.7, 0],
  ['bell', T.cut + 0.35, 1760, 0.02, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
