// srdealbreakers (20 s vertical Align ad, Star Talk Remix of "Three months in.") · story 0–15.6, then the shared end card.
//   0.00–4.55  "Three months *in.*"  The ♋ Cancer star, heart-eyed, falls harder every month while a calendar page flips:
//              MAR 3 (a flower pops onto its tip) · APR 11 (they left their scarf: now Cancer wears it) · MAY 22 (a list
//              floats up: "baby names?? ♥ Luna ♥ Nova ♥ Stella") · 3 MONTHS ♥ (hearts everywhere).
//   4.62       a text slams in: "btw. I don't want kids."  Record scratch. Cancer's eyes go wide, the names list drops off
//              screen, ♓ Pisces in the back starts crying (and doesn't stop).  "Then the | *dealbreaker.*"
//   5.15–8.20  THE STARS' gold star drops in: "three months. for one sentence."  (Pisces: still crying.)
//   8.30–10.9  "Said on | *day one.*"  THE STARS: "here, it goes on your card. day one."  A dealbreakers card deals in and
//              Cancer hop-stamps its chips one by one: ✕ DOESN'T WANT KIDS · ✕ ONE-WORD TEXTS · ✕ HATES MY GROUP CHAT.
//   11.05      card cut (flip).
//   11.15–15.4 "What matters, | *first.*"  The card glows; the names list floats back with a gold tag "SOMEDAY ♥", Cancer
//              goes heart-eyed (for the right one), Pisces switches to happy tears, the gold star winks.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff5a6e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const CAN = signStar('cancer'), PIS = signStar('pisces')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.42, h0Out: [4.42, 4.58],
  canIn: 0.2, pages: [0.55, 1.75, 2.95, 3.95], flower: 0.75, scarf: 1.95, names: 3.15, love: 3.95,
  slam: 4.62, drop: 4.85, h1: 4.75, h1Land: 5.05, h1Out: [8.1, 8.26], pisIn: 4.9, cry: [5.0, 12.9],
  goldIn: 5.15, open: 5.3, l1: 5.5,
  h2: 8.32, h2Land: 8.66, h2Out: [10.82, 10.98], l2: 8.3, textOut: [8.0, 8.25],
  card: [8.55, 9.0], stamps: [9.35, 9.75, 10.15], close: 10.85,
  cut: 11.05,
  h3: 11.15, h3Land: 11.6, glow: 11.7, back: 12.35, someday: 12.75, happyTears: 12.9, wink: [13.5, 14.0], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const CPS = 30
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'three months. for *one sentence.*' },
  { t: T.l2, speaker: SPEAK, text: 'here, it goes on your card. *day one.*' },
]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const CAN0 = { x: 380, y: 1030, size: 320 }, CAN1 = { x: 205, y: 1235, size: 210 }     // hook → beside the card
const GOLD_P = { x: 875, y: 1215, size: 200 }
const PIS_P = { x: 118, y: 860, size: 112 }
const CAL = { x: 805, y: 735, w: 250, h: 270 }
const NOTE = { x: 800, y: 1130, w: 270, h: 230 }
const CARD = { x: 540, y: 905, w: 500, h: 700 }
const PAGES = [['MAR', '3'], ['APR', '11'], ['MAY', '22'], ['3 MO', '♥']]
const CHIPS = ['DOESN’T WANT KIDS', 'ONE-WORD TEXTS', 'HATES MY GROUP CHAT']
const moveK = t => ease.inOutCubic(prog(t, T.card[0] - 0.2, T.card[1]))

// pixel bits
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const FLOWER = ['.p.p.', 'ppypp', '.pyp.', '.p.p.', '..g..', '.gg..', '..g..']
const DROP = ['.b.', 'bbb', 'bwb', '.b.']
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
function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }

function canState(t) {
  if (t < T.pages[1]) return { mood: 'happy' }
  if (t < T.slam) return { mood: 'heart' }
  if (t < T.l1) return { mood: 'wide', look: [0.6, -1], blink: false }
  if (t < T.l2) return { mood: 'wide', look: [1, -0.2] }
  if (t < T.stamps[0]) return { mood: 'neutral', look: [1, -0.6] }
  if (t < T.someday) return { mood: 'happy' }
  if (t < T.someday + 0.5) return { mood: 'sparkle' }
  return { mood: 'heart' }
}
function goldState(t) {
  if (t < T.l1) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l1 + 1.3) return { mood: 'squint', look: [0, 0] }
  if (t < T.l2) return { mood: 'neutral', look: [-1, 0.3] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
const CAN_HOPS = [T.canIn + 0.3, T.flower, T.scarf, T.names, T.love, T.love + 0.35, T.slam + 0.05, ...T.stamps.map(s => s - 0.32), T.h3Land, T.someday]
const GOLD_HOPS = [T.goldIn + 0.25, ...talkHops(LINES, SPEAK, { cps: CPS }), T.wink[0]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "500 44px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Three months *in.*', { top: 210, size: 124, accentSize: 180, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK })
  const H1 = popText(root, 'Then the | *dealbreaker.*', { top: 200, size: 124, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: RED })
  const H2 = popText(root, 'Said on | *day one.*', { top: 200, size: 124, accentSize: 190, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'What matters, | *first.*', { top: 200, size: 124, accentSize: 200, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7, spread = 240) {
    for (let i = 0; i < 10; i++) {
      const born = t0 + i * 0.16, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * spread + Math.sin(p * 7 + i) * 16), Math.round(cy - 60 - p * 260), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the calendar page: flips to each month, then "3 MO ♥"
  function drawCalendar(t) {
    const a = pop01(t, T.pages[0] - 0.15, 0.35, 2) * (1 - prog(t, T.slam + 0.1, T.slam + 0.35))
    if (a <= 0.01) return
    let idx = 0; for (let i = 0; i < PAGES.length; i++) if (t >= T.pages[i]) idx = i
    const fp = prog(t, T.pages[idx] - 0.12, T.pages[idx] + 0.12)
    const sy = Math.abs(Math.cos(Math.PI * fp)) * (idx === 0 ? 1 : 1)
    const page = fp < 0.5 && idx > 0 ? PAGES[idx - 1] : PAGES[idx]
    const { x: cx, w, h } = CAL, cy = CAL.y + Math.sin(t * 1.8) * 6
    x.save(); x.globalAlpha = clamp(a); x.translate(cx, cy); x.rotate(0.06); x.scale(a, a * Math.max(0.04, sy))
    x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 24; x.shadowOffsetY = 10
    x.fillStyle = BONE; rr(x, -w / 2, -h / 2, w, h, 18); x.fill(); x.shadowColor = 'transparent'
    x.fillStyle = idx === 3 ? PINK : RED; rr(x, -w / 2, -h / 2, w, 78, 18); x.fill(); x.fillRect(-w / 2, -h / 2 + 50, w, 28)
    x.fillStyle = '#fff'; x.font = "700 40px 'Space Mono'"; x.textAlign = 'center'; x.fillText(page[0], 0, -h / 2 + 54)
    x.fillStyle = INK; x.font = (page[1] === '♥' ? "800 130px " : "800 120px ") + INTER; x.fillText(page[1], 0, 80)
    for (const rx of [-70, 70]) { x.fillStyle = '#9a8f80'; x.fillRect(rx - 6, -h / 2 - 14, 12, 30) }
    x.restore()
  }

  // ── the names list (falls off at the slam; floats back at the end with a SOMEDAY tag)
  function drawNames(t) {
    const inA = pop01(t, T.names, 0.4, 2)
    const fall = ease.inCubic(prog(t, T.drop, T.drop + 0.6))
    const back = pop01(t, T.back, 0.45, 1.8)
    let k, dy = 0, rot = 0.08, X = NOTE.x, Y = NOTE.y
    if (t < T.back) { k = inA * (1 - prog(t, T.drop + 0.45, T.drop + 0.6)); dy = fall * 900; rot = 0.08 + fall * 1.2 }
    else { k = back * 0.78; X = 880; Y = 668; rot = -0.06 }
    k *= popOut(t, T.out)
    if (k <= 0.01) return
    const { w, h } = NOTE
    x.save(); x.globalAlpha = clamp(k); x.translate(X, Y + dy + Math.sin(t * 2 + 1) * 6); x.rotate(rot + Math.sin(t * 1.4) * 0.02); x.scale(k, k)
    x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 22; x.shadowOffsetY = 8
    x.fillStyle = '#fbf3e4'; x.fillRect(-w / 2, -h / 2, w, h); x.shadowColor = 'transparent'
    x.fillStyle = 'rgba(255,90,110,0.35)'; x.fillRect(-w / 2 + 34, -h / 2, 3, h)
    x.fillStyle = INK; x.textAlign = 'left'
    x.font = "italic 500 40px " + SERIF; x.fillText('baby names??', -w / 2 + 48, -h / 2 + 50)
    x.font = "700 32px " + INTER
    ;['♥ Luna', '♥ Nova', '♥ Stella'].forEach((s, i) => { x.fillStyle = i === 2 ? '#c2366a' : INK; x.fillText(s, -w / 2 + 52, -h / 2 + 104 + i * 42) })
    // the end: a gold SOMEDAY tag
    const tg = pop01(t, T.someday, 0.3, 2.4)
    if (t >= T.back && tg > 0.01) {
      x.save(); x.translate(w / 2 - 30, h / 2 - 10); x.rotate(-0.22); x.scale(tg, tg)
      x.fillStyle = GOLD; rr(x, -110, -30, 220, 60, 12); x.fill()
      x.fillStyle = INK; x.font = "700 30px 'Space Mono'"; x.textAlign = 'center'; x.fillText('SOMEDAY ♥', 0, 11)
      x.restore()
    }
    x.restore()
  }

  // ── the text that ends it
  function drawText(t) {
    const a = pop01(t, T.slam, 0.22, 2.6) * outK(t, T.textOut)
    if (a <= 0.01) return
    const shake = t < T.slam + 0.35 ? Math.sin((t - T.slam) * 70) * 14 * (1 - (t - T.slam) / 0.35) : 0
    const cx = 540 + shake, cy = 745, w = 760, h = 118
    x.save(); x.globalAlpha = clamp(a); x.translate(cx, cy); x.scale(a, a)
    x.fillStyle = 'rgba(216,222,234,0.7)'; x.font = "700 24px 'Space Mono'"; x.textAlign = 'left'; x.fillText('SAM · 3 MONTHS', -w / 2 + 10, -h / 2 - 16)
    x.shadowColor = 'rgba(255,90,110,0.45)'; x.shadowBlur = 40
    x.fillStyle = '#262b35'; rr(x, -w / 2, -h / 2, w, h, 50); x.fill(); x.shadowColor = 'transparent'
    x.fillStyle = '#262b35'; x.beginPath(); x.moveTo(-w / 2 + 20, h / 2 - 30); x.lineTo(-w / 2 - 10, h / 2 + 8); x.lineTo(-w / 2 + 60, h / 2 - 6); x.fill()
    x.fillStyle = '#f3f5f9'; x.font = "500 46px " + INTER; x.textAlign = 'center'; x.fillText("btw. I don't want kids.", 0, 16)
    x.restore()
  }

  // ── the dealbreakers card with its stamped chips
  function drawCard(t) {
    const din = ease.outBack(prog(t, ...T.card)), ok = popOut(t, T.out)
    if (din <= 0.001 || ok <= 0) return
    const { w, h } = CARD
    const cy = lerp(CARD.y + 1100, CARD.y, din) + Math.sin(t * 1.5) * 5
    const glow = ease.outCubic(prog(t, T.glow, T.glow + 0.6))
    x.save(); x.translate(CARD.x, cy); x.rotate(lerp(0.3, -0.02, din)); x.scale(ok, ok)
    x.shadowColor = `rgba(242,199,92,${0.35 + 0.35 * glow})`; x.shadowBlur = 50 + 40 * glow
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2c1d5c'); g.addColorStop(1, '#170f36')
    x.fillStyle = g; rr(x, -w / 2, -h / 2, w, h, 34); x.fill(); x.shadowColor = 'transparent'
    x.strokeStyle = GOLD; x.lineWidth = 5; rr(x, -w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 24); x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 2; rr(x, -w / 2 + 26, -h / 2 + 26, w - 52, h - 52, 18); x.stroke()
    // header: the sign, the name
    x.fillStyle = CAN.color; x.font = "800 86px " + INTER; x.textAlign = 'center'; x.fillText(CAN.glyph, 0, -h / 2 + 128)
    x.fillStyle = BONE; x.font = "italic 500 46px " + SERIF; x.fillText('you, Cancer', 0, -h / 2 + 190)
    x.fillStyle = GOLD; x.font = "700 26px 'Space Mono'"; x.fillText('DEALBREAKERS', 0, -h / 2 + 258)
    x.fillStyle = 'rgba(242,199,92,0.5)'; x.fillRect(-150, -h / 2 + 276, 300, 2)
    // chips: an empty dashed slot until its stamp lands
    T.stamps.forEach((st, i) => {
      const yy = -h / 2 + 340 + i * 96
      const p = prog(t, st - 0.12, st)
      x.save(); x.translate(0, yy)
      if (p < 1) { x.setLineDash([10, 8]); x.strokeStyle = 'rgba(239,230,214,0.3)'; x.lineWidth = 2; rr(x, -200, -34, 400, 68, 34); x.stroke(); x.setLineDash([]) }
      if (p > 0) {
        const sc = lerp(1.8, 1, ease.inQuad(p)) * (p >= 1 ? 1 + 0.08 * Math.exp(-(t - st) * 10) * Math.cos((t - st) * 30) : 1)
        x.globalAlpha *= clamp(p * 2); x.rotate([-0.035, 0.03, -0.02][i]); x.scale(sc, sc)
        x.fillStyle = 'rgba(255,90,110,0.18)'; rr(x, -210, -36, 420, 72, 36); x.fill()
        x.strokeStyle = RED; x.lineWidth = 4; rr(x, -210, -36, 420, 72, 36); x.stroke()
        x.fillStyle = '#ffd6dc'; x.font = "700 26px 'Space Mono'"; x.fillText('✕ ' + CHIPS[i], 0, 9)
      }
      x.restore()
    })
    x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = "700 20px 'Space Mono'"; x.fillText('SAID ON DAY ONE', 0, h / 2 - 50)
    x.restore()
    T.stamps.forEach((st, i) => sparkles(t, CARD.x, CARD.y - h / 2 + 340 + i * 96, st, 8, 230, i, [RED, PINK, BONE, GOLD]))
  }

  function drawPisces(t) {
    const a = pop01(t, T.pisIn, 0.35, 2) * popOut(t, T.out)
    if (a <= 0.01) return
    const happy = t >= T.happyTears
    const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.size, t, { color: PIS.color, mood: happy ? 'sparkle' : (t < T.cry[0] + 0.3 ? 'wide' : 'squint'), look: [0.5, 0.3], pop: a, seed: 9, glow: 0.8, squash: happy ? 0 : 0.03 * Math.sin(t * 22), hops: [T.happyTears] })
    // tears: two little streams (sad, then happy)
    if (t > T.cry[0]) for (let i = 0; i < 8; i++) {
      const born = T.cry[0] + i * 0.13, per = 0.75
      const ph = ((t - born) % per + per) % per / per
      if (t < born) continue
      const side = i % 2 ? 1 : -1
      const tx = r.x + side * (PIS_P.size * 0.16 + ph * 26), ty = r.y + PIS_P.size * 0.02 + ph * ph * 120
      drawBits(x, DROP, { b: happy ? GOLD : '#6fb6ff', w: '#e8f4ff' }, Math.round(tx), Math.round(ty), 4, { alpha: a * (1 - ph) })
    }
  }

  function drawCancer(t) {
    const ok = popOut(t, T.out)
    const cp = pop01(t, T.canIn, 0.38, 2.2) * ok
    if (cp <= 0.02) return
    const m = moveK(t)
    const P = { x: lerp(CAN0.x, CAN1.x, m), y: lerp(CAN0.y, CAN1.y, m), size: lerp(CAN0.size, CAN1.size, m) }
    const gasp = t >= T.slam && t < T.slam + 0.6 ? -0.14 * Math.exp(-(t - T.slam) * 6) * Math.cos((t - T.slam) * 22) : 0
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: CAN.color, glyph: CAN.glyph, ...canState(t), hops: CAN_HOPS, pop: cp, squash: gasp, seed: 2, glow: 1.1 })
    const S = r.size
    // the scarf (theirs), wound under the eyes, tail hanging
    const sk = pop01(t, T.scarf, 0.3, 2)
    if (sk > 0.01) {
      x.save(); x.globalAlpha = clamp(sk); x.translate(r.x, r.y + S * 0.3); x.scale(sk, sk)
      const c = Math.max(4, Math.round(S / 34)), wcells = Math.round(S * 0.5 / c)
      for (let i = 0; i < wcells; i++) { x.fillStyle = i % 4 < 2 ? '#e8476a' : '#fff1e6'; x.fillRect((i - wcells / 2) * c, 0, c, c * 3) }
      for (let j = 0; j < 5; j++) { x.fillStyle = j % 2 ? '#fff1e6' : '#e8476a'; x.fillRect(wcells / 2 * c - c * 3 + Math.round(Math.sin(t * 3 + j) * 0.6) * c * 0.5, c * 3 + j * c, c * 2, c) }
      x.strokeStyle = INK; x.lineWidth = 2; x.strokeRect(-wcells / 2 * c, 0, wcells * c, c * 3)
      x.restore()
    }
    // the flower on its tip
    const fk = pop01(t, T.flower, 0.3, 2.4)
    if (fk > 0.01) drawBits(x, FLOWER, { p: PINK, y: GOLD, g: '#6fd38a' }, r.x + S * 0.08, r.top - S * 0.05, Math.max(3, S / 50) * fk, { rot: 0.25 })
    if (t > T.love && t < T.slam) floatHearts(t, r.x, r.y - 40, T.love, T.slam - 0.4, 3)
    if (t > T.someday) floatHearts(t, r.x + 40, r.y - 30, T.someday, T.out[0] - 0.6, 6, 6, 160)
    sparkles(t, r.x, r.y, T.flower, 8, 140, 0)
    return r
  }

  function drawGold(t) {
    const gp = pop01(t, T.goldIn, 0.4, 2) * popOut(t, T.out)
    if (gp <= 0.02) return
    const drop = 1 - ease.outCubic(prog(t, T.goldIn - 0.15, T.goldIn + 0.2))
    drawStarChar(x, GOLD_P.x, GOLD_P.y - drop * 500, GOLD_P.size, t, { color: STAR.sky, ...goldState(t), hops: GOLD_HOPS, pop: gp, seed: 5, glow: 1.15 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      const sour = ease.inOutQuad(prog(t, T.slam, T.slam + 0.3)) * (1 - ease.inOutQuad(prog(t, T.card[0], T.card[1] + 0.3)))
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * lerp(1, 0.6, sour) })
      if (t < T.out[1] + 0.02) {
        drawPisces(t)
        drawCalendar(t)
        drawCard(t)
        drawCancer(t)
        drawGold(t)
        drawNames(t)
        drawText(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 11.05 (box shut, "Said on day one." out → "What matters, first.").  End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NT = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NT[(base + i) % NT.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // three months in: page flips, gifts, love
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1244.51, 0.045, 0],
  ['pop', T.canIn + 0.05, 783.99, 0.04, -0.2],
  ...T.pages.map((p, i) => ['tick', p, 0.05]), ...T.pages.map((p, i) => ['whoosh', p - 0.1, 0.25, 0.015]),
  ['pluck', T.flower, 1046.5, 0.04, 0.6, -0.2], ['pluck', T.scarf, 932.33, 0.04, 0.6, -0.2], ['pluck', T.names, 1244.51, 0.04, 0.6, 0.3],
  ['bell', T.love, 1244.51, 0.035, 1.2, 0], ['glitter', T.love, T.love + 0.5], ['pluck', T.love + 0.1, 1567.98, 0.03, 0.6, 0],
  // the dealbreaker: a slam, a record scratch, the list drops
  ['boom', T.slam, 0.22], ['whoosh', T.slam - 0.08, 0.2, 0.06], ['tick', T.slam, 0.08], ['pop', T.slam + 0.02, 311.13, 0.05, 0],
  ['whoosh', T.drop, 0.6, 0.035], ['pop', T.drop + 0.55, 207.65, 0.03, 0.3],
  ...wordPops(T.h1, 2, 0.08, 1, 0.025), ['pop', T.h1Land, 466.16, 0.05, 0],
  ['pop', T.pisIn + 0.05, 698.46, 0.03, -0.4], ['pluck', T.cry[0] + 0.1, 466.16, 0.025, 0.8, -0.4], ['pluck', T.cry[0] + 0.3, 415.3, 0.025, 0.8, -0.4],
  ['whoosh', T.goldIn - 0.15, 0.35, 0.03], ['pop', T.goldIn + 0.1, 932.33, 0.045, 0.3],
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // said on day one: the card deals, three stamps
  ...wordPops(T.h2, 2, 0.08, 2, 0.025), ['pop', T.h2Land, 1244.51, 0.045, 0], ['pop', T.h2Land + 0.1, 1567.98, 0.04, 0],
  ['whoosh', T.card[0], 0.45, 0.045], ['tick', T.card[1], 0.05],
  ...T.stamps.flatMap((s, i) => [['boom', s, 0.1], ['tick', s, 0.09], ['pop', s + 0.02, NT[i + 2], 0.04, 0]]),
  ['pop', T.close, 932.33, 0.03, 0], ['pop', T.close + 0.07, 622.25, 0.03, 0],
  // what matters, first
  ...wordPops(T.h3, 2, 0.08, 1, 0.028), ['pop', T.h3Land, 1244.51, 0.055, 0], ['pluck', T.h3Land, 1046.5, 0.05, 0.7, 0],
  ['bell', T.glow, 1567.98, 0.03, 1.4, 0], ['whoosh', T.back - 0.05, 0.35, 0.03], ['pop', T.back + 0.1, 1046.5, 0.035, 0.3],
  ['pop', T.someday, 1244.51, 0.045, 0.3], ['glitter', T.someday, T.someday + 0.5], ['pluck', T.happyTears, 1567.98, 0.03, 0.6, -0.4],
  ['pluck', T.wink[0], 1244.51, 0.035, 0.5, 0.3], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
