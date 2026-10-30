// srbirthtime (20 s vertical Align ad, Star Talk Remix of "The most honest thing about you") · story 0–15.6, then the end card.
//   0.00–4.70  "Everyone's bio | *fibs* a little."  A dating bio types itself in, line by line, and THE STARS' gold star
//              fact-checks each one with a red stamp: 6'2" (…ISH) · loves hiking (ONCE.) · no drama (the star rolls its
//              eyes so hard it tips over: SURE.)
//   4.60–7.30  "The most *honest* | thing about you."  THE STARS: "you know what never fibs? your birth time."  The bio poofs;
//              only the birth data types out, huge: "May 12, 1998 · 5:00 PM · Tulsa" (the star nods along, impressed).
//   7.20–10.8  the pill folds into a face-down sign card that charges with gold light (the star holds its breath, puffing
//              up). THE STARS: "we were there. we took notes."  9.49 FLIP → the Taurus sign card; a ♉ Taurus star hops in
//              beside it, heart-eyed at itself.
//   10.9       card cut (flip).
//   11.0–15.4  "The sky already | *wrote you down.*"  The YOUR CARD stamp lands on the sign card (no fact-check needed);
//              the gold star winks. Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + props + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff4f64', GREEN = '#7fe696'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = { ...signStar('taurus'), color: '#6fd38a' }   // the green of Align's own Taurus sign card (SIGNS amber would read as the gold narrator)
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
const BIO = [
  { t: 0.7, text: '6\'2"', stamp: '…ISH', st: 1.45 },
  { t: 1.95, text: 'loves hiking', stamp: 'ONCE.', st: 2.75 },
  { t: 3.25, text: 'no drama', stamp: 'SURE.', st: 4.15 },
]
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.45, 4.62], starIn: 0.3, bioIn: 0.35, tip: [3.75, 4.15],
  open: 4.6, l1: 4.8, poof: 5.0, h1: 5.0, h1Land: 5.4, h1Out: [10.6, 10.78],
  type: [5.3, 6.9], fold: [7.2, 7.6], charge: [7.6, 9.45], l2: 7.95,
  flip: [BEAT(16), BEAT(16) + 0.32], tauIn: 9.95, close: 10.72,
  cut: 10.9,
  h2: 11.0, h2Land: 11.45, stamp: 12.15, wink: [13.3, 13.8], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const CPS = 30
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'you know what never fibs? your *birth time.*' },
  { t: T.l2, speaker: SPEAK, text: 'we were there. we *took notes.*' },
]
const DATA = 'May 12, 1998 · 5:00 PM · Tulsa'
const KEYS = (() => {           // keystroke times: three chunks, like the original
  const ch = [[0, 12, T.type[0], 5.95], [12, 22, 6.1, 6.5], [22, DATA.length, 6.6, T.type[1]]], out = []
  for (const [a, b, t0, t1] of ch) for (let i = a; i < b; i++) out.push(+(t0 + (i - a) / Math.max(1, b - a - 1) * (t1 - t0)).toFixed(3))
  return out
})()

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const BIOP = { x: 520, y: 830, w: 720, h: 460 }
const PILL = { x: 540, y: 800, w: 960, h: 140 }
const CARD = { x: 540, y: 905, h: 560 }
const GOLD_P = { x: 870, y: 1225, size: 220 }
const TAU_P = { x: 215, y: 1235, size: 210 }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
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

function goldState(t) {
  if (t < BIO[0].st - 0.5) return { mood: 'neutral', look: [-1, -0.6] }
  if (t < BIO[0].st) return { mood: 'squint', look: [-1, -0.6] }
  if (t < BIO[1].st - 0.5) return { mood: 'neutral', look: [-1, -0.3] }
  if (t < BIO[1].st) return { mood: 'squint', look: [-1, -0.3] }
  if (t < T.l1) return { mood: 'eyeroll' }
  if (t < T.type[0]) return { mood: 'happy' }
  if (t < T.fold[0]) { const n = KEYS.filter(k => k <= t).length; return { mood: 'wide', look: [-1 + 2 * n / DATA.length, -1], blink: false } }
  if (t < T.flip[0]) return { mood: 'wide', look: [-1, -0.5], blink: false }
  if (t < T.flip[0] + 0.6) return { mood: 'sparkle' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
const GOLD_HOPS = [T.starIn + 0.3, BIO[0].st + 0.05, BIO[1].st + 0.05, ...talkHops(LINES, SPEAK, { cps: CPS }), T.flip[0] + 0.05, T.h2Land, T.stamp + 0.05, T.wink[0]]
const TAU_HOPS = [T.tauIn + 0.3, T.tauIn + 0.75, T.h2Land, T.stamp + 0.1, 14.3]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 54px Inter", "600 50px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [backIm, signIm, stampIm] = await Promise.all([loadImg('card-sign-back.png'), loadImg('card-sign.png'), loadImg('card-sign-stamped.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, "Everyone's bio | *fibs* a little.", { top: 210, size: 112, accentSize: 170, at: T.h0, gap: 0.08, accentColor: RED, wobble: true })
  const H1 = popText(root, 'The most *honest* | thing about you.', { top: 210, size: 104, accentSize: 150, at: T.h1, gap: 0.07, accentColor: GREEN })
  const H2 = popText(root, 'The sky already | *wrote you down.*', { top: 196, size: 100, accentSize: 138, fit: true, at: T.h2, late: 3, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 180 + Math.sin(p * 7 + i) * 14), Math.round(cy - 60 - p * 220), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  // ── the dating bio, fact-checked
  function drawBio(t) {
    const a = pop01(t, T.bioIn, 0.4, 1.8)
    const poof = prog(t, T.poof, T.poof + 0.22)
    if (a <= 0.01 || poof >= 1) return
    const s = a * (1 + 0.2 * Math.sin(Math.PI * poof)) * (1 - poof)
    const { w, h } = BIOP
    x.save(); x.translate(BIOP.x, BIOP.y + Math.sin(t * 1.6) * 5); x.rotate(-0.02); x.scale(s, s)
    x.shadowColor = 'rgba(4,2,14,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12
    x.fillStyle = '#f6efe2'; rr(x, -w / 2, -h / 2, w, h, 30); x.fill(); x.shadowColor = 'transparent'
    x.fillStyle = '#d9cfbf'; x.beginPath(); x.arc(-w / 2 + 74, -h / 2 + 74, 40, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#b8ad9c'; x.beginPath(); x.arc(-w / 2 + 74, -h / 2 + 64, 15, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-w / 2 + 74, -h / 2 + 106, 26, Math.PI, 0); x.fill()
    x.fillStyle = INK; x.font = "italic 500 44px " + SERIF; x.textAlign = 'left'; x.fillText('about me', -w / 2 + 136, -h / 2 + 88)
    x.fillStyle = 'rgba(27,18,54,0.15)'; x.fillRect(-w / 2 + 36, -h / 2 + 130, w - 72, 2)
    BIO.forEach((b, i) => {
      const yy = -h / 2 + 210 + i * 96
      const n = Math.floor(clamp((t - b.t) / 0.45) * b.text.length)
      if (t < b.t) return
      x.fillStyle = INK; x.font = "600 50px " + INTER; x.textAlign = 'left'
      const shown = b.text.slice(0, n)
      x.fillText(shown, -w / 2 + 56, yy)
      if (n < b.text.length && Math.floor(t * 4) % 2 === 0) { const mw = x.measureText(shown).width; x.fillRect(-w / 2 + 60 + mw, yy - 40, 4, 48) }
      // the stamp
      const sp = prog(t, b.st - 0.1, b.st)
      if (sp > 0) {
        const sc = lerp(2.2, 1, ease.inQuad(sp)) * (sp >= 1 ? 1 + 0.08 * Math.exp(-(t - b.st) * 10) * Math.cos((t - b.st) * 30) : 1)
        x.save(); x.translate(w / 2 - 150, yy - 16); x.rotate([-0.12, 0.08, -0.06][i]); x.scale(sc, sc); x.globalAlpha *= clamp(sp * 2)
        x.strokeStyle = RED; x.lineWidth = 5; rr(x, -105, -38, 210, 76, 12); x.stroke()
        x.fillStyle = RED; x.font = "700 40px 'Space Mono'"; x.textAlign = 'center'; x.fillText(b.stamp, 0, 14)
        x.restore()
        // strike-through on the claim
        x.fillStyle = 'rgba(255,79,100,0.75)'; const mw = x.measureText(b.text).width; x.font = "600 50px " + INTER
        x.fillRect(-w / 2 + 50, yy - 18, (x.measureText(b.text).width + 12) * ease.outCubic(prog(t, b.st, b.st + 0.2)), 5)
      }
    })
    x.restore()
  }

  // ── the birth data pill (types huge) → folds into the sign card → charges → flips → stamped
  function drawPill(t) {
    const a = pop01(t, T.type[0] - 0.25, 0.3, 1.8) * (1 - prog(t, T.fold[0], T.fold[1]))
    if (a <= 0.01) return
    const fold = ease.inOutCubic(prog(t, T.fold[0], T.fold[1]))
    const n = KEYS.filter(k => k <= t).length
    const shown = DATA.slice(0, n)
    const w = lerp(PILL.w, 300, fold), h = lerp(PILL.h, 300, fold)
    x.save(); x.globalAlpha = clamp(a); x.translate(PILL.x, lerp(PILL.y, CARD.y, fold) + Math.sin(t * 1.6) * 4); x.scale(a, a)
    x.shadowColor = 'rgba(127,230,150,0.5)'; x.shadowBlur = 40
    x.fillStyle = 'rgba(20,14,44,0.92)'; rr(x, -w / 2, -h / 2, w, h, h / 2); x.fill(); x.shadowColor = 'transparent'
    x.strokeStyle = 'rgba(127,230,150,0.75)'; x.lineWidth = 3; rr(x, -w / 2, -h / 2, w, h, h / 2); x.stroke()
    x.globalAlpha *= 1 - fold
    x.fillStyle = BONE; x.font = "700 54px " + INTER; x.textAlign = 'center'
    const tw = x.measureText(DATA).width
    x.textAlign = 'left'; x.fillText(shown, -tw / 2, 19)
    if (n < DATA.length && Math.floor(t * 5) % 2 === 0) { x.fillStyle = GREEN; x.fillRect(-tw / 2 + x.measureText(shown).width + 4, -24, 5, 56) }
    x.restore()
  }
  function drawCard(t) {
    const a = pop01(t, T.fold[1] - 0.15, 0.4, 2) * popOut(t, T.out)
    if (a <= 0.01) return
    const ch = prog(t, ...T.charge), fp = prog(t, ...T.flip)
    const trem = t > T.charge[1] - 0.6 && t < T.flip[0] ? Math.sin(t * 80) * 4 * prog(t, T.charge[1] - 0.6, T.charge[1]) : 0
    const breathe = 1 + 0.04 * ch * (0.5 + 0.5 * Math.sin(t * 6))
    const cx = CARD.x + trem, cy = CARD.y + Math.sin(t * 1.5) * 5
    // halo + rays
    const halo = (fp < 1 ? ch : 1 - 0.5 * prog(t, T.flip[1], T.flip[1] + 1)) * a
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 60, cx, cy, 520); g.addColorStop(0, `rgba(242,199,92,${0.35 * halo})`); g.addColorStop(1, 'rgba(242,199,92,0)')
    x.fillStyle = g; x.fillRect(cx - 600, cy - 600, 1200, 1200)
    for (let i = 0; i < 12; i++) {
      const ang = i / 12 * Math.PI * 2 + t * 0.4
      x.strokeStyle = `rgba(255,230,160,${0.12 * halo})`; x.lineWidth = 18
      x.beginPath(); x.moveTo(cx + Math.cos(ang) * 200, cy + Math.sin(ang) * 260); x.lineTo(cx + Math.cos(ang) * 560, cy + Math.sin(ang) * 640); x.stroke()
    }
    x.restore()
    // motes streaming in while it charges
    if (ch > 0 && fp <= 0) for (let i = 0; i < 14; i++) {
      const ph = ((t * 0.9 + i * 0.137) % 1), ang = i * 2.39
      const r = lerp(520, 80, ph)
      drawPixelStar(x, cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * 1.2, 16, i % 2 ? 1 : 2, i % 3 ? GOLD : BONE)
    }
    const H = CARD.h * a * breathe
    const sx = Math.abs(Math.cos(Math.PI * fp))
    x.save(); x.translate(cx, cy); x.scale(sx, 1)
    if (fp < 0.5) { if (backIm) { const bh = H * 1.32, bw = bh * 1044 / 1440; x.drawImage(backIm, -bw / 2, -bh / 2, bw, bh) } }
    else {
      const sk = prog(t, T.stamp - 0.08, T.stamp)
      const HF = H * 1.32
      if (signIm) { const w = HF * 848 / 1152; x.drawImage(signIm, -w / 2, -HF / 2, w, HF) }
      if (stampIm && sk > 0) {
        const s2 = lerp(1.25, 1, ease.inQuad(sk))
        x.globalAlpha = sk; const h2 = HF * 1156 / 1152 * s2, w2 = h2 * 904 / 1156; x.drawImage(stampIm, -w2 / 2, -h2 / 2, w2, h2)
      }
    }
    x.restore()
    // the flip flash
    const ft = t - (T.flip[0] + 0.16)
    if (ft > 0 && ft < 0.35) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 1 - ft / 0.35; const f = x.createRadialGradient(cx, cy, 0, cx, cy, 600); f.addColorStop(0, 'rgba(255,250,230,0.9)'); f.addColorStop(1, 'rgba(255,250,230,0)'); x.fillStyle = f; x.fillRect(cx - 600, cy - 600, 1200, 1200); x.restore() }
    sparkles(t, cx, cy, T.flip[0] + 0.16, 14, 340, 0, [GOLD, GREEN, BONE, PINK])
    sparkles(t, cx, cy, T.stamp, 10, 260, 1, [GOLD, BONE, RED])
  }

  function drawGold(t) {
    const gp = pop01(t, T.starIn, 0.4, 2) * popOut(t, T.out)
    if (gp <= 0.02) return
    // "no drama" → an eye-roll so hard it tips over (and pops back)
    const tip = Math.sin(Math.PI * prog(t, ...T.tip)) * 0.5
    const puff = t > T.charge[0] && t < T.flip[0] ? -0.08 * prog(t, T.charge[0], T.charge[1]) : 0        // holds its breath
    const pfx = t > T.flip[0] && t < T.flip[0] + 0.5 ? 0.14 * Math.exp(-(t - T.flip[0]) * 6) * Math.cos((t - T.flip[0]) * 22) : 0   // exhales
    x.save(); x.translate(GOLD_P.x, GOLD_P.y + GOLD_P.size * 0.3); x.rotate(tip); x.translate(-GOLD_P.x, -(GOLD_P.y + GOLD_P.size * 0.3))
    const r = drawStarChar(x, GOLD_P.x, GOLD_P.y, GOLD_P.size, t, { color: STAR.sky, ...goldState(t), hops: GOLD_HOPS, pop: gp, squash: puff + pfx, seed: 6, glow: 1.15 })
    x.restore()
    if (t > T.charge[0] + 0.4 && t < T.flip[0]) {      // little "…" while it holds its breath
      x.save(); x.fillStyle = BONE; x.globalAlpha = 0.8; for (let i = 0; i < 3; i++) if ((t * 3 - i) % 3 > 0.5) x.fillRect(r.x - 30 + i * 26, r.top - 40, 12, 12); x.restore()
    }
  }
  function drawTaurus(t) {
    const tp = pop01(t, T.tauIn, 0.38, 2.2) * popOut(t, T.out)
    if (tp <= 0.02) return
    const drop = 1 - ease.outCubic(prog(t, T.tauIn - 0.12, T.tauIn + 0.22))
    const mood = t < T.tauIn + 0.5 ? 'wide' : t < T.h2Land ? 'heart' : t < T.stamp + 0.1 ? 'happy' : 'sparkle'
    const r = drawStarChar(x, TAU_P.x, TAU_P.y - drop * 600, TAU_P.size, t, { color: TAU.color, glyph: TAU.glyph, mood, look: [1, -0.5], hops: TAU_HOPS, pop: tp, seed: 3, glow: 1.1 })
    if (t > T.tauIn + 0.5 && t < T.h2Land + 0.6) floatHearts(t, r.x, r.y - 30, T.tauIn + 0.5, T.h2Land, 2)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * lerp(1, 0.7, ease.inOutQuad(prog(t, T.type[0], T.type[0] + 0.5)) * (1 - prog(t, T.flip[0], T.flip[0] + 0.6))) })
      if (t < T.out[1] + 0.02) {
        drawBio(t)
        if (t >= T.poof && t < T.poof + 0.7) sparkles(t, BIOP.x, BIOP.y, T.poof, 10, 260, 2, [BONE, GOLD, RED])
        drawCard(t)
        drawPill(t)
        drawTaurus(t)
        drawGold(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 10.9 (box shut, "The most honest thing about you." out → "The sky already wrote you down.").
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NT = [523.25, 622.25, 698.46, 783.99, 932.33, 1046.5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NT[(base + i) % NT.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the bio, fact-checked
  ...wordPops(T.h0, 5, 0.08, 0, 0.024), ['pop', T.starIn + 0.05, 783.99, 0.04, 0.3], ['whoosh', T.bioIn - 0.05, 0.3, 0.03],
  ...BIO.flatMap(b => Array.from({ length: b.text.length }, (_, i) => ['tick', +(b.t + i * 0.45 / b.text.length).toFixed(3), 0.03])),
  ...BIO.flatMap((b, i) => [['boom', b.st, 0.11], ['tick', b.st, 0.09], ['pop', b.st + 0.02, [392, 349.23, 311.13][i], 0.045, 0.2]]),
  ['whoosh', T.tip[0], 0.4, 0.03], ['tick', T.tip[1] - 0.2, 0.04],
  // the most honest thing about you
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.poof, 1046.5, 0.04, 0], ['glitter', T.poof, T.poof + 0.4],
  ...wordPops(T.h1, 6, 0.07, 1, 0.022),
  ...KEYS.map((k, i) => ['tick', k, i % 4 === 0 ? 0.06 : 0.04]),
  ['whoosh', T.fold[0], 0.45, 0.04], ['bell', T.fold[1], 392, 0.035, 1.6, 0],
  ['riser', T.charge[0], T.flip[0], 0.08], ['glitter', T.charge[0] + 0.3, T.flip[0]],
  // the flip
  ['whoosh', T.flip[0] - 0.12, 0.3, 0.07], ['boom', T.flip[0] + 0.16, 0.2], ['glitter', T.flip[0] + 0.16, T.flip[0] + 0.9],
  ['bell', T.flip[0] + 0.18, 1046.5, 0.05, 2.0, 0.2], ['bell', T.flip[0] + 0.22, 1567.98, 0.03, 1.8, -0.2],
  ['whoosh', T.tauIn - 0.15, 0.3, 0.03], ['pop', T.tauIn + 0.1, 698.46, 0.045, -0.3], ['pluck', T.tauIn + 0.5, 1396.91, 0.035, 0.6, -0.3],
  ['pop', T.close, 932.33, 0.03, 0], ['pop', T.close + 0.07, 622.25, 0.03, 0],
  // the sky already wrote you down
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.05, 0], ['pop', T.h2Land + 0.12, 1244.51, 0.045, 0], ['pluck', T.h2Land + 0.24, 1567.98, 0.045, 0.7, 0],
  ['boom', T.stamp, 0.14], ['tick', T.stamp, 0.1], ['glitter', T.stamp, T.stamp + 0.5],
  ['pluck', T.wink[0], 1244.51, 0.035, 0.5, 0.3], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
