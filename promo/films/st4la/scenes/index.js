// st4la (15 s vertical Align ad, Star Talk season 4 · EP 075, thread A: the vote, a city letter) · story 0–10.6, then the
// shared end card ("come" + the Align logo, cta SIGN UP TO VOTE YOUR CITY).
//   0.00–5.20  "Dear *LA.*"  Generic pixel palms in a sunset glow. The ♌ Leo star (crown, starleo) poses inside a big pixel
//              ring light; a phone on a tripod snaps it, flash after flash, the filter tag flipping (GOLDEN, GLOW, VIVID,
//              DREAMY). Each flash a new pose: wink, sparkle, heart-eyes at its own screen.
//              Drop (2.82): THE STARS: "you look great in this *light.*" → Leo preens, heart-eyed.
//   5.20–8.45  "Every photo | *flatters.*"  THE STARS: "let them see the *card* before the photo." → the ring light clicks off,
//              a soft veil fogs the phone's screen, and Leo's own veiled card (card-profile-2: a Leo, orange aura) deals in.
//              Leo goes wide-eyed, then sparkly.
//   8.45 cut → "Fall for the | *card.*"  The card front and centre with a warm halo; Leo below, heart-eyed at it.
//              Pops out by 10.45; the end card takes over at 10.6.
// Easter eggs: the seed constellation (EP 75) top-left; the ghost peeks out from behind the phone's right edge.
// One canvas (sky + set), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 75
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#9a7be0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const LEO = signStar('leo')
const ORANGE = LEO.color

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.02, 5.2],
  ring: 0.3, leoIn: 0.5, phone: 0.7,
  snaps: [1.0, 1.5, 2.0, 2.45, 3.4, 3.9, 4.4],
  open: 2.62, l1: 2.82,
  h1: 5.26, h1Land: 5.66, l2: 5.32, off: 6.55, veil: [6.7, 7.0], deal: [6.95, 7.45], gasp: 7.0, spark: 7.7,
  close: 8.35, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.92, heart: 9.25, h2Out: [10.2, 10.42], out: [10.05, 10.45],
  ghost: 3.95,
}
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: 'you look great in this *light.*' },
  { t: T.l2, speaker: 'THE STARS', text: 'let them see the *card* before the photo.' },
]
const CPS = 30
const FILTERS = ['GOLDEN', 'GLOW', 'VIVID', 'DREAMY', 'GOLDEN', 'SOFT', 'GLOW']
const TINT = ['rgba(255,190,90,0.35)', 'rgba(255,150,210,0.32)', 'rgba(255,90,90,0.28)', 'rgba(160,140,255,0.32)', 'rgba(255,190,90,0.35)', 'rgba(255,230,200,0.3)', 'rgba(255,150,210,0.32)']

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
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']          // Leo's (starleo)
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const RING = { x: 540, y: 960, r: 205 }
const LEO0 = { x: 540, y: 990, size: 290 }
const LEO1 = { x: 300, y: 1130, size: 240 }       // beat 2: steps aside for the card
const LEO2 = { x: 250, y: 1560, size: 250 }       // beat 3: below, looking up at the card
const PHONE = { x: 820, y: 1170, w: 150, h: 250 }
const CARD1 = { x: 690, y: 980, w: 360 }
const CARD2 = { x: 560, y: 1000, w: 470 }

// poses on each snap (mood + squash): the flash freezes it for a beat
function leoState(t) {
  if (t < T.snaps[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.l2) {
    let k = -1
    T.snaps.forEach((s, i) => { if (t >= s) k = i })
    const P = [{ mood: 'wink' }, { mood: 'sparkle', look: [1, 0] }, { mood: 'heart' }, { mood: 'wink' }, { mood: 'heart' }, { mood: 'sparkle', look: [1, -1] }, { mood: 'heart' }]
    return P[k]
  }
  if (t < T.off) return { mood: 'neutral', look: [1, 0] }
  if (t < T.spark) return { mood: 'wide', look: [1, 0], blink: false }       // the card? first?
  if (t < T.cut) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart', look: [1, -1] }
}
const poseSquash = t => { let q = 0; T.snaps.forEach((s, i) => { const d = t - s; if (d >= 0 && d < 0.45 && t < T.l2) q += (i % 2 ? -0.08 : 0.07) * Math.exp(-d * 6) * Math.cos(d * 18) }); return q }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const FACE = bake(await loadImg('card-profile-2.png'), 640)
  const FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *LA.*', { top: 230, size: 150, accentSize: 230, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0 + 0.3, wobble: true, accentColor: ORANGE })
  const H1 = popText(root, 'Every photo | *flatters.*', { top: 196, size: 118, accentSize: 190, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H2 = popText(root, 'Fall for the | *card.*', { top: 196, size: 124, accentSize: 220, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.96 })
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
      const born = t0 + i * 0.25, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 6 + i) * 14), Math.round(cy - 60 - p * 200), cell, { alpha: Math.sin(Math.PI * p) })
    }
  }

  // sunset glow + generic pixel palms at the edges
  const t0 = px => px * 0.01
  function palm(px, base, h, lean, ok) {
    x.save(); x.globalAlpha = ok
    const top = base - h
    for (let k = 0; k <= 48; k++) {
      const f = k / 48, yy = lerp(base, top, f), xx = px + lean * f * f * 120
      x.fillStyle = '#140d2a'; x.fillRect(Math.round(xx - 13), Math.round(yy), 26, h / 48 + 2)
      if (k % 3 === 0) { x.fillStyle = '#21183f'; x.fillRect(Math.round(xx - 13), Math.round(yy), 26, 4) }
    }
    const cx = px + lean * 120, cy = top
    for (let f = 0; f < 9; f++) {
      const a = -Math.PI / 2 + (f - 4) * 0.42 + Math.sin(f * 2.1 + t0(px)) * 0.06
      for (let s = 0; s < 16; s++) {
        const d = s * 17, droop = s * s * 1.1
        const th = 26 - s * 1.2
        x.fillStyle = '#140d2a'
        x.fillRect(Math.round(cx + Math.cos(a) * d * 1.35 - 12), Math.round(cy + Math.sin(a) * d * 0.75 + droop - th / 2), 24, th)
      }
    }
    x.fillStyle = '#140d2a'; x.fillRect(Math.round(cx - 22), Math.round(cy - 18), 44, 36)
    x.restore()
  }
  function drawBackdrop(t, ok) {
    const g = x.createLinearGradient(0, 760, 0, 1920)
    g.addColorStop(0, 'rgba(255,120,90,0)'); g.addColorStop(0.4, `rgba(255,140,90,${0.2 * ok})`); g.addColorStop(0.62, `rgba(255,190,120,${0.26 * ok})`); g.addColorStop(1, 'rgba(255,190,120,0.04)')
    x.fillStyle = g; x.fillRect(0, 760, W, 1160)
    palm(70, 1920, 1140, 0.6, ok)
    palm(1010, 1920, 1220, -0.7, ok)
    palm(180, 1920, 920, 0.3, ok * 0.8)
  }

  // the ring light: a ring of pixel LEDs on a stand; bright with a halo while on; clicks off at T.off
  function drawRing(t, ok) {
    const k = pop01(t, T.ring, 0.4, 1.8) * ok
    if (k <= 0.01) return
    const on = t < T.off ? 1 : t < T.off + 0.08 ? 0.3 : t < T.off + 0.14 ? 0.8 : 0
    const fade = t >= T.cut ? 0 : 1
    if (fade <= 0) return
    x.save(); x.globalAlpha = k
    // stand
    x.fillStyle = INK; x.fillRect(RING.x - 10, RING.y + RING.r, 20, 1400 - RING.y - RING.r); x.fillStyle = '#4a4a5a'; x.fillRect(RING.x - 5, RING.y + RING.r, 10, 1400 - RING.y - RING.r)
    if (on > 0) {
      const g = x.createRadialGradient(RING.x, RING.y, RING.r * 0.6, RING.x, RING.y, RING.r * 1.5)
      g.addColorStop(0, `rgba(255,248,230,${0.22 * on})`); g.addColorStop(0.5, `rgba(255,236,200,${0.12 * on})`); g.addColorStop(1, 'rgba(255,236,200,0)')
      x.fillStyle = g; x.fillRect(RING.x - RING.r * 1.5, RING.y - RING.r * 1.5, RING.r * 3, RING.r * 3)
    }
    const N = 30
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2, px = RING.x + Math.cos(a) * RING.r, py = RING.y + Math.sin(a) * RING.r
      x.fillStyle = INK; x.fillRect(Math.round(px - 16), Math.round(py - 16), 32, 32)
      x.fillStyle = on > 0.5 ? '#fffaf0' : '#6b6f80'; x.fillRect(Math.round(px - 11), Math.round(py - 11), 22, 22)
      if (on > 0.5) { x.fillStyle = '#ffe9b8'; x.fillRect(Math.round(px - 11), Math.round(py + 4), 22, 7) }
    }
    x.restore()
  }

  // the phone on its tripod: a live view of Leo with a filter tint; veiled at T.veil
  function drawPhone(t, ok, leoSt) {
    const k = pop01(t, T.phone, 0.36, 2) * ok
    if (k <= 0.01 || t >= T.cut) return
    const { x: cx, y: cy, w, h } = PHONE, P = 8
    x.save(); x.globalAlpha = clamp(k)
    // tripod
    x.fillStyle = INK
    for (const s of [-1, 0, 1]) { x.save(); x.translate(cx, cy + h / 2); x.rotate(s * 0.28); x.fillRect(-6, 0, 12, 1400 - cy - h / 2); x.restore() }
    x.fillStyle = '#4a4a5a'; x.fillRect(cx - 4, cy + h / 2, 8, 200)
    // body + screen
    x.fillStyle = INK; x.fillRect(cx - w / 2 - P, cy - h / 2, w + 2 * P, h); x.fillRect(cx - w / 2, cy - h / 2 - P, w, h + 2 * P)
    x.fillStyle = '#2b2340'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    const sx = cx - w / 2 + 10, sy = cy - h / 2 + 16, sw = w - 20, sh = h - 36
    x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
    x.fillStyle = '#3a2c74'; x.fillRect(sx, sy, sw, sh)
    drawStarChar(x, cx, cy + 14, 120, t, { color: ORANGE, ...leoSt, look: [0, 0], seed: 3, glow: 0.5, bob: 0, tips: false })
    drawBits(x, CROWN, CROWN_C, cx - 2, cy - 44, 3, { rot: -0.2 })
    let f = -1; T.snaps.forEach((s, i) => { if (t >= s) f = i })
    if (f >= 0) { x.fillStyle = TINT[f]; x.fillRect(sx, sy, sw, sh) }
    const vk = prog(t, ...T.veil)
    if (vk > 0) {
      // the veil: a soft lavender aura over the photo, a "?" in the middle
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, sh * 0.7)
      g.addColorStop(0, `rgba(217,205,240,${0.95 * vk})`); g.addColorStop(1, `rgba(154,123,224,${0.9 * vk})`)
      x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
      x.globalAlpha = clamp(k) * vk; x.fillStyle = INK; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', cx, cy + 4)
      x.globalAlpha = clamp(k)
    }
    x.restore()
    // shutter flash on each snap
    for (const s of T.snaps) { const d = t - s; if (d >= 0 && d < 0.16) { x.fillStyle = `rgba(255,255,255,${0.9 * (1 - d / 0.16)})`; x.fillRect(sx, sy, sw, sh) } }
    // the filter tag above the phone
    if (f >= 0 && t < T.veil[0]) {
      const tk = easeOutBack(prog(t, T.snaps[f], T.snaps[f] + 0.2), 2.6)
      const label = 'FILTER: ' + FILTERS[f]
      x.save(); x.translate(cx - 20, cy - h / 2 - 54); x.scale(tk, tk); x.rotate(-0.04)
      x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText(label).width + 36
      x.fillStyle = INK; x.fillRect(-tw / 2 - 6, -28, tw + 12, 56); x.fillStyle = '#fff1c8'; x.fillRect(-tw / 2, -22, tw, 44)
      x.fillStyle = INK; x.fillText(label, 0, 2)
      x.restore()
    }
    x.restore()
    // the ghost leans out past the phone's right edge (drawn after the phone)
    drawGhostCameo(x, t, { x: cx + w / 2 + P, y: cy + 30, at: T.ghost, dur: 1.4, from: 'left', cell: 3 })
  }

  // a whole-frame flash on each snap (soft)
  function flash(t) {
    for (const s of T.snaps) {
      const d = t - s
      if (d >= 0 && d < 0.14) { x.fillStyle = `rgba(255,250,235,${0.28 * (1 - d / 0.14)})`; x.fillRect(0, 0, W, 1920) }
    }
  }

  function drawImg(img, bodyFrac, wBody) { if (!img) return; const w = wBody / bodyFrac, h = w * img.height / img.width; x.drawImage(img, -w / 2, -h / 2, w, h) }
  function drawCard(t, ok) {
    if (t < T.deal[0]) return
    const fin = t >= T.cut
    const C = fin ? CARD2 : CARD1
    const dk = fin ? 1 : ease.outCubic(prog(t, ...T.deal))
    const cx = fin ? C.x : lerp(1300, C.x, dk), cy = (fin ? C.y : lerp(1500, C.y, dk)) + Math.sin(t * 1.8) * 6
    const rot = fin ? -0.03 + 0.01 * Math.sin(t * 1.3) : lerp(0.9, 0.06, dk)
    const halo = (fin ? 1 : dk) * ok
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, C.w * 1.25)
    g.addColorStop(0, `rgba(243,154,58,${0.32 * halo})`); g.addColorStop(1, 'rgba(243,154,58,0)')
    x.fillStyle = g; x.fillRect(cx - C.w * 1.25, cy - C.w * 1.25, C.w * 2.5, C.w * 2.5)
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(ok, ok)
    drawImg(FACE, FACE_BODY, C.w)
    x.restore()
    sparkles(t, cx, cy, T.deal[1], 12, C.w * 0.8, 2, [GOLD, ORANGE, BONE])
    if (fin) sparkles(t, cx, cy, T.h2Land, 14, C.w * 0.85, 3, [GOLD, ORANGE, BONE, PINK])
  }

  function drawLeo(t, ok) {
    const lk = pop01(t, T.leoIn, 0.38, 2.2) * ok
    if (lk <= 0.02) return
    const fin = t >= T.cut
    const step = ease.inOutCubic(prog(t, T.deal[0] - 0.1, T.deal[0] + 0.35))
    const P = fin ? LEO2 : { x: lerp(LEO0.x, LEO1.x, step), y: lerp(LEO0.y, LEO1.y, step), size: lerp(LEO0.size, LEO1.size, step) }
    const st = leoState(t)
    const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
    const hops = [T.leoIn + 0.28, ...T.snaps.map(s => s + 0.02), T.spark, T.h2Land, T.heart]
    const r = drawStarChar(x, P.x, P.y, P.size, t, { color: ORANGE, glyph: LEO.glyph, ...st, hops, pop: lk, squash: poseSquash(t) + gasp, seed: 3, glow: 1.15 })
    drawBits(x, CROWN, CROWN_C, Math.round(r.x - 4), Math.round(r.top + P.size * 0.04), P.size / 40 * lk, { rot: -0.22 + 0.04 * Math.sin(t * 3) })
    if (!fin && t > T.l1 + 0.6 && t < T.l2) floatHearts(t, r.x, r.y - 40, T.l1 + 0.6, T.l2 - 0.6, 1)
    if (!fin) sparkles(t, r.x, r.y, T.spark, 10, 170, 1, [GOLD, ORANGE, BONE])
    if (fin && t > T.heart) floatHearts(t, r.x + 40, r.y - 40, T.heart, T.out[0] - 0.3, 4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        drawBackdrop(t, ok)
        drawRing(t, ok)
        drawLeo(t, ok)
        drawPhone(t, ok, leoState(t))
        drawCard(t, ok)
        if (t < T.l2) flash(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.22 (H0 out → "Every photo flatters.") and 8.45 (box shut → "Fall for the card.").
// cardfx keeps one for a 15 s film (the 8.45 one). End card flips at 10.6.
const CUTS = [5.22, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }),
  cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // dear LA: the ring light hums on, Leo pops in, the phone snaps away
  ...wordPops(T.h0, 1, 0.1, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0],
  ['tick', T.ring, 0.05], ['bell', T.ring + 0.05, 1760, 0.018, 0.8, 0],
  ['pop', T.leoIn + 0.05, 739.99, 0.045, 0], ['pop', T.phone + 0.05, 987.77, 0.03, 0.4],
  ...T.snaps.flatMap((s, i) => [['tick', s, 0.05], ['tick', +(s + 0.05).toFixed(3), 0.03], ['pluck', +(s + 0.08).toFixed(3), NOTE[(i * 2) % 7] * 2, 0.025, 0.3, 0.4]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0.5],
  // every photo flatters: the light clicks off, the veil, the card deals in
  ...wordPops(T.h1, 2, 0.08, 1, 0.024), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['tick', T.off, 0.05], ['tick', T.off + 0.1, 0.03], ['whoosh', T.veil[0], 0.35, 0.02],
  ['whoosh', T.deal[0], 0.45, 0.035], ['tick', T.deal[1], 0.04], ['pop', T.gasp, 440, 0.035, 0],
  ['glitter', T.spark, T.spark + 0.45], ['bell', T.spark + 0.03, 1567.98, 0.022, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // fall for the card
  ...wordPops(T.h2, 3, 0.09, 2, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.3], ['bell', T.heart + 0.05, 1760, 0.022, 1.0, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
