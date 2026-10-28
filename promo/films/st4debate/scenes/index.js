// st4debate (20 s vertical Align ad, Star Talk season 4 · EP 072, thread A: the vote) · story 0–15.6, then the shared
// end card ("come" + the Align logo, cta SIGN UP TO VOTE YOUR CITY).
//   0.00–7.00  "The great city | *debate.*"  Two podiums with pixel name plates (ATLANTA, MIAMI). The ♈ Aries star and the
//              ♐ Sagittarius star shout over each other (pixel bubbles: "ATLANTA!!" / "MIAMI!!"). In the middle the ♎ Libra
//              star moderates from a little desk, its scale balanced on its head; every shout tips the beam and Libra
//              squints it back level. LIBRA: "for once, i'm *supposed* to stay neutral." → sparkle eyes, beam dead level.
//   7.00–10.98 "Who gets the | *last word?*"  THE STARS: "the voters decide. that's *you.*" → the shouting stops; all three
//              turn and look straight at you, wide-eyed.
//   10.98 cut → "Your city. | Your *call.*"  A third podium rises at the front, plate "YOU", its mic turned to the viewer.
//              Everyone looks down at it and goes happy; the scale's pans glow. Pops out by 15.45; end card at 15.6.
// Neutral by design: both podiums the same size, both get the same shouts, nobody wins the debate.
// Easter eggs: the seed constellation (EP 72) top-left; the ghost peeks out from behind the MIAMI podium's left edge.
// One canvas (sky + stage), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 72
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const LIB = signStar('libra'), ARI = signStar('aries'), SAG = signStar('sagittarius')
const MAG = LIB.color

// ── the timeline
const T = {
  h0: 0.12, h0Out: [6.84, 7.0],
  pods: 0.3, ariIn: 0.5, sagIn: 0.64, libIn: 0.86, scaleIn: 1.05,
  shouts: [[1.3, 0], [1.78, 1], [2.24, 0], [2.62, 1], [4.7, 0], [5.05, 1], [5.4, 0], [5.72, 1]],     // [t, who: 0 = Aries, 1 = Sag]
  open: 2.82, l1: 3.0, proud: 4.3,
  h1: 7.04, h1Land: 7.5, l2: 7.25, hush: 7.3, turn: 8.3,
  close: 10.86, h1Out: [10.72, 10.9],
  cut: 10.98,
  h2: 11.03, h2Land: 11.45, you: 11.3, tap: [12.2, 12.5], happy: 12.0, glow: 12.6, h2Out: [15.2, 15.42], out: [15.05, 15.45],
  ghost: 5.6,
}
const LINES = [
  { t: T.l1, speaker: '♎ LIBRA STAR', text: "for once, i'm *supposed* to stay neutral.", color: '#ff9cf0' },
  { t: T.l2, speaker: 'THE STARS', text: "the voters decide. that's *you.*" },
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
const PAN = ['BBBBBBBBBBBBB', '.BbbbbbbbbbB.', '..BBBBBBBBB..']
const PAN_C = { B: '#f7c948', b: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const POD = [{ x: 205, city: 'ATLANTA' }, { x: 875, city: 'MIAMI' }]
const POD_TOP = 1150, POD_W = 240, POD_H = 250
const STAR_Y = 1052, STAR_S = 212
const LIBX = 540, LIBY = 900, LIBS = 244
const DESK = { x: 540, top: 1022, w: 260, h: 200 }
const ARM = 170, HANG = 118
const YOU = { x: 540, top: 1470, w: 330, h: 330 }

// the beam angle: each shout yanks it toward the shouter, Libra squints it back; from the line on it's dead level
function beamAngle(t) {
  let a = 0
  for (const [s, who] of T.shouts) {
    const d = t - s
    if (d < 0 || d > 1.4) continue
    a += (who ? 1 : -1) * 0.2 * Math.exp(-d * 3.2) * Math.cos(d * 7)
  }
  if (t > T.proud && t < T.shouts[4][0]) a *= 0.2
  if (t > T.hush) a *= 1 - prog(t, T.hush, T.hush + 0.6)
  return a
}
const shoutAt = (t, who) => T.shouts.some(([s, w]) => w === who && t >= s && t < s + 0.42) && t < T.hush

function libState(t) {
  if (t < T.scaleIn + 0.3) return { mood: 'happy', look: [0, 0] }
  if (t < T.l1) { const a = beamAngle(t); return { mood: 'squint', look: [a < 0 ? -1 : 1, -0.4], blink: false } }   // eyes on the tipping beam
  if (t < T.proud) return { mood: 'neutral', look: [0, 0] }
  if (t < T.shouts[4][0]) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.hush) return { mood: 'eyeroll' }
  if (t < T.turn) return { mood: 'neutral', look: [0, 0] }
  if (t < T.cut) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.happy) return { mood: 'neutral', look: [0, 1] }
  return { mood: t > T.glow ? 'heart' : 'happy' }
}
function argState(t, who) {
  const side = who ? -1 : 1     // looks toward the other podium
  if (t < T.hush) return shoutAt(t, who) ? { mood: 'squint', look: [side, 0], blink: false } : { mood: 'neutral', look: [side, 0] }
  if (t < T.turn) return { mood: 'wide', look: [side * -0.3, 0], blink: false }       // …oh. the voters?
  if (t < T.cut) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.happy + who * 0.15) return { mood: 'neutral', look: [who ? -1 : 1, 1] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The great city | *debate.*', { top: 196, size: 112, accentSize: 200, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0 + 0.4, wobble: true, accentColor: MAG, lineHeight: 0.98 })
  const H1 = popText(root, 'Who gets the | *last word?*', { top: 196, size: 112, accentSize: 170, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Your city. | Your *call.*', { top: 196, size: 124, accentSize: 210, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.3, life = 1.3
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 6 + i) * 14), Math.round(cy - 60 - p * 200), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  // a stepped pixel block (podium / desk) with a name plate and a little gooseneck mic
  function block(cx, top, w, h, label, { k = 1, rim = GOLD, plateCol = '#fbf6ea', mic = 0, micAim = 0, size = 34 } = {}) {
    if (k <= 0.01) return
    const P = 8, L = Math.round(cx - w / 2)
    x.save()
    // body: ink outline, dark wood, lighter top lip, side shade
    x.fillStyle = INK; x.fillRect(L - P, top, w + 2 * P, h); x.fillRect(L, top - P, w, h + P)
    x.fillStyle = '#3a2a5c'; x.fillRect(L, top, w, h)
    x.fillStyle = '#56407f'; x.fillRect(L, top, w, 2 * P)
    x.fillStyle = '#2a1f45'; x.fillRect(L + w - 2 * P, top + 2 * P, 2 * P, h - 2 * P)
    x.fillStyle = rim; x.fillRect(L, top + 2 * P, w, P / 2)
    // the plate
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width, pw = Math.min(w - 2 * P, tw + 44), ph = size + 30, py = top + 4 * P
    x.fillStyle = INK; x.fillRect(cx - pw / 2 - P / 2, py - P / 2, pw + P, ph + P)
    x.fillStyle = plateCol; x.fillRect(cx - pw / 2, py, pw, ph)
    x.fillStyle = INK; x.fillText(label, cx, py + ph / 2 + 2)
    // stars on the podium front
    drawPixelStar(x, cx, top + h - 3.2 * P, 20, 1, rim, '#fff6e6')
    // gooseneck mic: a pixel stem from the lip, a head (aimed at the speaker, or at the viewer)
    if (mic) {
      const bx = cx + w * 0.28, by = top - P
      x.fillStyle = INK; x.fillRect(bx - 5, by - 56 * mic, 10, 56 * mic)
      x.fillStyle = '#9aa3b0'; x.fillRect(bx - 2, by - 54 * mic, 4, 54 * mic)
      x.save(); x.translate(bx, by - 58 * mic); x.rotate(micAim)
      x.fillStyle = INK; x.fillRect(-13, -26, 26, 34); x.fillStyle = '#2b2b38'; x.fillRect(-9, -22, 18, 26)
      x.fillStyle = '#6b6f80'; for (let j = 0; j < 3; j++) x.fillRect(-9, -20 + j * 8, 18, 3)
      x.restore()
    }
    x.restore()
  }

  // a shout bubble: bone balloon, ink text, a tail toward the shouter
  function shout(t, s, who) {
    const d = t - s
    if (d < 0 || d > 0.62 || s > T.hush) return
    const k = easeOutBack(prog(d, 0, 0.16), 2.6) * (1 - ease.inCubic(prog(d, 0.46, 0.62)))
    const txt = who ? 'MIAMI!!' : 'ATLANTA!!'
    const n = T.shouts.findIndex(q => q[0] === s)
    const cx = who ? 830 : 250, cy = 886 - (n % 2) * 14 - (n >= 4 ? 24 : 0)
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate((who ? 1 : -1) * (0.08 + 0.04 * Math.sin(d * 30)))
    x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const bw = x.measureText(txt).width + 50, bh = 74, P = 7
    x.fillStyle = INK; x.fillRect(-bw / 2 - P, -bh / 2, bw + 2 * P, bh); x.fillRect(-bw / 2, -bh / 2 - P, bw, bh + 2 * P)
    x.fillStyle = BONE; x.fillRect(-bw / 2, -bh / 2, bw, bh)
    // tail
    const tx = who ? 30 : -30
    x.fillStyle = INK; x.fillRect(tx - 14, bh / 2, 28, 26); x.fillStyle = BONE; x.fillRect(tx - 7, bh / 2 - 2, 14, 20)
    x.fillStyle = who ? SAG.color : ARI.color; x.fillText(txt, 0, 3)
    x.restore()
  }

  function drawScale(t, r, k) {
    if (k <= 0.01) return
    const a = beamAngle(t), c = 8
    const px = r.x, base = r.top + 6, py = base - 64
    const glow = prog(t, T.glow, T.glow + 0.5)
    x.save(); x.globalAlpha = clamp(k)
    // post + foot plate on Libra's tip + finial
    x.fillStyle = INK; x.fillRect(px - 2.5 * c, py - c, 5 * c, base - py + 2 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(px - 1.5 * c, py, 3 * c, base - py); x.fillStyle = '#f7c948'; x.fillRect(px - 1.5 * c, py, c, base - py)
    x.fillStyle = INK; x.fillRect(px - 5 * c, base - c, 10 * c, 3 * c); x.fillStyle = '#f7c948'; x.fillRect(px - 4 * c, base, 8 * c, c)
    drawBits(x, ['.y.', 'yYy', '.y.'], { y: '#f7c948', Y: '#fff1c8' }, px, py - 2.2 * c, c)
    x.save(); x.translate(px, py); x.rotate(a)
    x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
    x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
    x.fillStyle = '#fff1c8'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, 4)
    x.fillStyle = '#c98a1f'; x.fillRect(-ARM - c, -c, 2 * c, 2 * c); x.fillRect(ARM - c, -c, 2 * c, 2 * c)
    x.restore()
    // a tiny spirit level bubble in the middle of the beam: centred = neutral
    x.fillStyle = INK; x.fillRect(px - 26, py + 14, 52, 16); x.fillStyle = '#9ff3c4'; x.fillRect(px - 22, py + 17, 44, 10)
    x.fillStyle = '#ffffff'; x.fillRect(Math.round(px - 5 + clamp(a * 90, -16, 16)), py + 18, 10, 8)
    for (const s of [-1, 1]) {
      const ex = px + Math.cos(a) * ARM * s, ey = py + Math.sin(a) * ARM * s
      const bx = ex, by = ey + HANG
      x.fillStyle = 'rgba(255,241,200,0.85)'
      for (let i = 0; i <= 10; i++) { const f = i / 10; x.fillRect(Math.round(lerp(ex, bx - 48, f)) - 2, Math.round(lerp(ey, by - 6, f)), 4, 6); x.fillRect(Math.round(lerp(ex, bx + 48, f)) - 2, Math.round(lerp(ey, by - 6, f)), 4, 6) }
      if (glow > 0) {
        const g = x.createRadialGradient(bx, by - 20, 0, bx, by - 20, 90)
        g.addColorStop(0, `rgba(242,199,92,${0.45 * glow})`); g.addColorStop(1, 'rgba(242,199,92,0)')
        x.fillStyle = g; x.fillRect(bx - 90, by - 110, 180, 180)
        drawPixelStar(x, bx, by - 26, 30 * glow, 1, GOLD, '#fff6e6')
      }
      drawBits(x, PAN, PAN_C, bx, by, c)
    }
    x.restore()
  }

  function drawStage(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const hushed = t >= T.hush
    // the arguers (behind their podiums)
    const hopsA = [T.ariIn + 0.28, ...T.shouts.filter(s => s[1] === 0).map(s => s[0]), T.turn, T.happy]
    const hopsS = [T.sagIn + 0.28, ...T.shouts.filter(s => s[1] === 1).map(s => s[0]), T.turn + 0.06, T.happy + 0.15]
    POD.forEach((p, who) => {
      const k = pop01(t, who ? T.sagIn : T.ariIn, 0.36, 2.2) * ok
      if (k > 0.02) {
        const sh = shoutAt(t, who) ? 0.1 * Math.sin(t * 60) : 0
        const lean = shoutAt(t, who) ? (who ? -16 : 16) : 0
        drawStarChar(x, p.x + lean, STAR_Y, STAR_S, t, { color: who ? SAG.color : ARI.color, glyph: who ? SAG.glyph : ARI.glyph, ...argState(t, who), hops: who ? hopsS : hopsA, pop: k, squash: sh, seed: 4 + who * 5, glow: 1.05 })
      }
      const pk = easeOutBack(prog(t, T.pods + who * 0.08, T.pods + who * 0.08 + 0.4), 1.6) * ok
      const rise = (1 - clamp(pk)) * 300
      block(p.x, POD_TOP + rise, POD_W, POD_H, p.city, { k: pk, rim: who ? SAG.color : ARI.color, mic: clamp(pk), micAim: who ? -0.5 : 0.5 })
    })
    // the ghost, behind the MIAMI podium's left edge (drawn after the podium)
    drawGhostCameo(x, t, { x: POD[1].x - POD_W / 2 - 8, y: POD_TOP + 150, at: T.ghost, dur: 1.4, from: 'right', cell: 3 })
    // Libra + the scale + the desk
    const lk = pop01(t, T.libIn, 0.38, 2.2) * ok
    if (lk > 0.02) {
      const drop = (1 - ease.outCubic(prog(t, T.libIn - 0.12, T.libIn + 0.22))) * -420
      const hopsL = talkHops(LINES.slice(0, 1), LINES[0].speaker, { cps: CPS }).concat([T.proud, T.turn + 0.03, T.happy + 0.08])
      const r = drawStarChar(x, LIBX, LIBY + drop, LIBS, t, { color: MAG, glyph: LIB.glyph, ...libState(t), hops: hopsL, pop: lk, seed: 2, glow: 1.1 })
      drawScale(t, r, pop01(t, T.scaleIn, 0.4, 1.8) * ok)
      if (t > T.proud) sparkles(t, r.x, r.y, T.proud, 10, 190, 1, [GOLD, MAG, BONE])
      if (t > T.glow) floatHearts(t, r.x, r.y - 30, T.glow, T.out[0] - 0.4, 2)
    }
    const dk = pop01(t, T.libIn + 0.1, 0.36, 1.8) * ok
    block(DESK.x, DESK.top + (1 - clamp(dk)) * 260, DESK.w, DESK.h, 'MODERATOR', { k: dk, rim: MAG, size: 30 })
    if (hushed && t < T.cut) sparkles(t, 540, 1000, T.turn, 12, 360, 3, [GOLD, BONE])
    // shouting
    for (const [s, who] of T.shouts) shout(t, s, who)
    // beat 3: the YOU podium rises at the front, mic turned to the viewer
    if (t >= T.cut) {
      const yk = easeOutBack(prog(t, T.you, T.you + 0.5), 1.5) * ok
      const tap = t > T.tap[0] && t < T.tap[1] ? Math.sin(Math.PI * prog(t, ...T.tap)) : 0
      block(YOU.x, YOU.top + (1 - clamp(yk)) * 480, YOU.w, YOU.h, 'YOU', { k: yk, rim: GOLD, plateCol: '#fff1c8', mic: clamp(yk), micAim: -0.15 - 0.2 * tap, size: 58 })
      sparkles(t, YOU.x, YOU.top + 40, T.you + 0.45, 12, 220, 2, [GOLD, BONE, PINK])
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawStage(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.02 (H0 out → "Who gets the last word?") and 10.98 (box shut → "Your city. Your call.").
// cardfx keeps one for this film (the 10.98 one). End card flips at 15.6.
const CUTS = [7.02, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }),
  cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // the great city debate: podiums rise, the arguers pop in, Libra drops in with its scale, the shouting
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0 + 0.4, 1174.66, 0.045, 0], ['boom', T.h0 + 0.4, 0.12],
  ['whoosh', T.pods, 0.4, 0.03], ['tick', T.pods + 0.3, 0.04], ['tick', T.pods + 0.38, 0.04],
  ['pop', T.ariIn + 0.05, 659.25, 0.04, -0.4], ['pop', T.sagIn + 0.05, 739.99, 0.04, 0.4],
  ['pop', T.libIn + 0.05, 880, 0.045, 0], ['pluck', T.scaleIn + 0.1, 1318.51, 0.035, 0.6, 0],
  ...T.shouts.flatMap(([s, who]) => [['pop', s, who ? 440 : 392, 0.05, who ? 0.45 : -0.45], ['pop', +(s + 0.08).toFixed(3), who ? 523.25 : 466.16, 0.04, who ? 0.45 : -0.45], ['tick', +(s + 0.2).toFixed(3), 0.03]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', T.proud, T.proud + 0.45], ['bell', T.proud + 0.02, 1760, 0.022, 0.9, 0],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.4],
  // who gets the last word: the hush, everyone turns to you
  ...wordPops(T.h1, 3, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['tick', T.hush, 0.04], ['pop', T.turn, 1318.51, 0.045, 0], ['bell', T.turn + 0.03, 1567.98, 0.025, 1.2, 0], ['glitter', T.turn, T.turn + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // your city, your call: the YOU podium
  ...wordPops(T.h2, 3, 0.09, 2, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.you, 0.5, 0.035], ['boom', T.you + 0.45, 0.1], ['glitter', T.you + 0.45, T.you + 0.9],
  ['tick', T.tap[0] + 0.1, 0.04], ['tick', T.tap[0] + 0.22, 0.035],
  ['pluck', T.glow, 1174.66, 0.04, 0.6, 0], ['bell', T.glow + 0.05, 1760, 0.022, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
