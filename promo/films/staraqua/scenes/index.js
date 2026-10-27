// staraqua (16 s vertical Align ad, Star Talk batch 3) · story 0–11.6, then the shared end card ("come" + the Align logo).
//   0.00–5.80  "Dear | *Aquarius…*"  The cyan ♒ star (fixed air; Saturn-ruled, Uranus in modern astrology) floats alone
//              up in the top-right corner in big pink pixel headphones, glowing alien-green, music notes drifting off it.
//              Far below, a little crowd of stars chats. Drop (2.82): THE STARS: "being different is your whole thing."
//              It goes cool and aloof (squint, looks away); the crowd glances up at it.
//   5.80–9.05  "Ruled by Uranus. | Still *human.*"  THE STARS: "being *close* doesn't make you less you." → wide eyes; the
//              orange ♌ Leo star (its opposite sign) steps out of the crowd and waves; the Aquarius star floats down beside
//              it; its headphones lift off and pop into sparkles. Sparkle eyes. The crowd pops away.
//   9.12 cut → "Let them | *in.*"  The pair, close; the music notes now float between them in both colours. Heart eyes.
//              Everything pops out by 11.45; the end card takes over at 11.6.
// One canvas (sky + crowd + stars + headphones), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar } from '../../startalk.js'

export const DURATION = 16
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 11.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const AQU = signStar('aquarius'), LEO = signStar('leo')
const CYAN = AQU.color, ALIEN = '#7dff8a', HOT = '#ff4fd8', ACC = '#8af0ff'

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.62, 5.8],
  crowd: 0.3, aqIn: 0.55,
  open: 2.62, l1: 2.84, aloof: 3.1, crowdLook: 3.4, cool: 4.4,
  h1: 5.86, h1Land: 6.3, l2: 6.0, gasp: 6.1, leoOut: [6.55, 7.15], wave: [7.0, 7.9], down: [7.3, 8.2], phones: [7.95, 8.45], meet: 8.4,
  close: 9.0, h1Out: [8.86, 9.04],
  cut: 9.12, h2: 9.18, h2Land: 9.52, heart: 9.95, h2Out: [11.15, 11.4], out: [11.05, 11.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'being different is your whole thing.' },
  { t: T.l2, speaker: SPEAK, text: "being *close* doesn't make you less you.", color: ACC },
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


// ── pixel props
const NOTE_BM = ['...XX.', '...XXX', '...X.X', '...X..', '.XXX..', 'XXXX..', '.XX...']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── layout
const AQ_FAR = { x: 790, y: 700, size: 270 }
const AQ_NEAR = { x: 720, y: 1110, size: 330 }
const LEO_IN = { x: 300, y: 1185, size: 150 }
const LEO_NEAR = { x: 350, y: 1120, size: 320 }
const CROWD = [   // the little crowd (Leo is the one who steps out)
  { id: 'gemini', x: 150, y: 1250, size: 112, seed: 11, look: [1, 0] },
  { id: 'libra', x: 455, y: 1255, size: 118, seed: 12, look: [-1, 0] },
  { id: 'aries', x: 200, y: 1115, size: 104, seed: 13, look: [1, 1] },
  { id: 'cancer', x: 420, y: 1110, size: 100, seed: 14, look: [-1, 1] },
]
const LOW = 110
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

function aqState(t) {
  if (t < T.l1) return { mood: 'sleepy', zzz: false }                                   // vibing, eyes shut
  if (t < T.aloof) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.cool) return { mood: 'squint', look: [1, -1], blink: false }                 // aloof
  if (t < T.gasp) return { mood: 'sleepy', zzz: false }
  if (t < T.leoOut[1]) return { mood: 'wide', look: [-1, 1], blink: false }              // "being close…"
  if (t < T.meet) return { mood: 'neutral', look: [-1, 0.5] }
  if (t < T.cut) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}
function leoState(t) {
  if (t < T.leoOut[0]) return { mood: t > T.crowdLook && t < T.cool ? 'wide' : 'happy', look: t > T.crowdLook && t < T.cool ? [1, -1] : undefined }
  if (t < T.meet) return { mood: 'happy' }
  return { mood: 'happy', look: [1, 0], blush: 1 }
}
const AQ_HOPS = [T.gasp, T.meet, T.h2Land, T.heart]
const LEO_HOPS = [T.leoOut[0] + 0.2, T.wave[0] + 0.2, T.wave[0] + 0.6, T.meet + 0.1, T.h2Land + 0.1, 10.6]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear | *Aquarius…*', { top: 190, size: 128, accentSize: 176, at: T.h0, gap: 0.12, accentColor: ACC, wobble: true, late: 1, lateAt: T.h0 + 0.24, lineHeight: 1.0 })
  const H1 = popText(root, 'Ruled by Uranus. | Still *human.*', { top: 190, size: 104, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ALIEN })
  const H2 = popText(root, 'Let them | *in.*', { top: 200, size: 150, accentSize: 260, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.92 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
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
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.17, life = 1.1
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      const hx = cx + side * 200 + Math.sin(p * 7 + i) * 18, hy = cy - 40 - p * 220
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }
  function alienGlow(cx, cy, R, a) {
    if (a <= 0.01) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, R * 0.2, cx, cy, R)
    g.addColorStop(0, `rgba(125,255,138,${0.32 * a})`); g.addColorStop(0.6, `rgba(125,255,138,${0.12 * a})`); g.addColorStop(1, 'rgba(125,255,138,0)')
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  /** music notes drifting up from (cx, cy); cols alternate */
  function notes(t, cx, cy, t0, t1, cols, spread = 1, n = 8) {
    for (let i = 0; i < n; i++) {
      const per = 1.6, ph0 = i / n
      const k = (t - t0) / per + ph0
      const born = t0 + (Math.floor(k) - ph0) * per
      if (born < t0 - 0.01 || born > t1) continue
      const p = k - Math.floor(k)
      const side = (((i * 53) % 9) / 8 - 0.5) * 2
      const nx = cx + side * 150 * spread + Math.sin(p * 6 + i) * 20, ny = cy - p * 260
      drawBits(x, NOTE_BM, { X: cols[i % cols.length] }, Math.round(nx), Math.round(ny), 6, { alpha: Math.sin(Math.PI * p) * 0.95 })
    }
  }
  /** headphones on a star rect: k = 0 on the head, 1 down around the neck */
  function headphones(r, size, pop, k) {
    if (k >= 1) return
    const s = size * pop, c = Math.max(4, Math.round(s / 30))
    const lift = ease.outCubic(k)                                // they lift off the head, spread a little and fade
    const cupY = r.y - s * 0.06 - lift * s * 0.55, cupX = s * 0.4 * (1 + 0.25 * lift)
    const ry = -s * 0.44
    x.save(); x.globalAlpha *= 1 - ease.inQuad(k)
    // the band: pixel steps along a half ellipse
    for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26
      const bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = INK; x.fillRect(Math.round(bx - c * 1.5), Math.round(by - c * 1.5), c * 3, c * 3)
    }
    for (let i = 0; i <= 26; i++) {
      const a = Math.PI * i / 26
      const bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry
      x.fillStyle = '#3a2a6e'; x.fillRect(Math.round(bx - c), Math.round(by - c), c * 2, c * 2)
    }
    // the cups
    for (const sd of [-1, 1]) {
      const cx = r.x + sd * cupX, w = c * 5, h = c * 8
      x.fillStyle = INK; x.fillRect(Math.round(cx - w / 2 - c), Math.round(cupY - h / 2 - c), w + 2 * c, h + 2 * c)
      x.fillStyle = HOT; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), w, h)
      x.fillStyle = '#ffb3f0'; x.fillRect(Math.round(cx - w / 2), Math.round(cupY - h / 2), c, h)
      x.fillStyle = '#b02a98'; x.fillRect(Math.round(cx + w / 2 - c), Math.round(cupY - h / 2), c, h)
    }
    x.restore()
  }
  function drawCrowd(t, ok, dy) {
    CROWD.forEach((m, i) => {
      const p = pop01(t, T.crowd + i * 0.08, 0.32, 2.2) * ok * popOut(t, [8.45 + i * 0.06, 8.8 + i * 0.06])
      if (p <= 0.02) return
      const st = signStar(m.id)
      const looking = t > T.crowdLook && t < T.cool
      drawStarChar(x, m.x, m.y + dy, m.size, t, { color: st.color, glyph: null, mood: looking ? 'wide' : (i % 2 ? 'happy' : 'neutral'), look: looking ? [1, -1] : m.look, pop: p, seed: m.seed, glow: 0.6, hops: [1.2 + i * 0.4, 2.2 + i * 0.3, 4.8 + i * 0.2, 9.7 + i * 0.15], tips: false })
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        drawCrowd(t, ok, dy)
        // Leo steps out of the crowd
        const lk = ease.inOutCubic(prog(t, ...T.leoOut))
        const LP = { x: lerp(LEO_IN.x, LEO_NEAR.x, lk), y: lerp(LEO_IN.y, LEO_NEAR.y, lk) + dy - Math.sin(Math.PI * lk) * 80, size: lerp(LEO_IN.size, LEO_NEAR.size, lk) }
        const lp = pop01(t, T.crowd + 0.2, 0.32, 2.2) * ok
        const wave = t > T.wave[0] && t < T.wave[1] ? 0.06 * Math.sin((t - T.wave[0]) * 18) : 0
        if (lp > 0.02) drawStarChar(x, LP.x, LP.y, LP.size, t, { color: LEO.color, glyph: lk > 0.5 ? LEO.glyph : null, ...leoState(t), hops: LEO_HOPS, pop: lp, squash: wave, seed: 3, glow: 0.7 + 0.5 * lk })
        // Aquarius floats in, drifts, then comes down
        const ap = pop01(t, T.aqIn, 0.4, 2.0) * ok
        if (ap > 0.02) {
          const dk = ease.inOutCubic(prog(t, ...T.down))
          const drift = (1 - dk) * 18 * Math.sin(t * 1.3)
          const A = { x: lerp(AQ_FAR.x, AQ_NEAR.x, dk) + drift, y: lerp(AQ_FAR.y, AQ_NEAR.y, dk) + dy + (1 - dk) * 22 * Math.sin(t * 1.9), size: lerp(AQ_FAR.size, AQ_NEAR.size, dk) }
          const pk = ease.inOutCubic(prog(t, ...T.phones))
          const gasp = t >= T.gasp && t < T.gasp + 0.5 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
          alienGlow(A.x, A.y, A.size * 1.05, ap * lerp(1, 0.35, pk))
          if (t < T.phones[1]) notes(t, A.x, A.y - A.size * 0.3, T.aqIn + 0.3, T.phones[0], [ALIEN, HOT, ACC], 1, 6)
          const r = drawStarChar(x, A.x, A.y, A.size, t, { color: CYAN, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, pop: ap, squash: gasp, seed: 8, glow: lerp(1.4, 1.1, pk), bob: dk < 1 ? A.size * 0.05 : undefined })
          headphones(r, A.size, ap, pk)
          sparkles(t, (r.x + LP.x) / 2, r.y, T.meet, 12, 300, 4, [GOLD, LEO.color, ACC, ALIEN])
          sparkles(t, r.x, r.y - A.size * 0.6, T.phones[1] - 0.1, 8, 120, 2, [HOT, ALIEN, BONE])
          if (t > T.cut) notes(t, (r.x + LP.x) / 2, r.y - 120, T.cut, T.out[0], [ALIEN, LEO.color, HOT, GOLD], 0.6, 6)
          if (t > T.heart) floatHearts(t, r.x, r.y - 40, T.heart, T.out[0], 5, 6)
        }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.82 (H0 out → "Ruled by Uranus") and 9.12 (box shut → "Let them in."). cardfx keeps 9.12.
const CUTS = [5.82, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.24, 1174.66, 0.045, 0],
  ...CROWD.map((m, i) => ['pop', +(T.crowd + i * 0.08 + 0.04).toFixed(3), NOTE[i + 1], 0.02, -0.4]),
  ['whoosh', T.aqIn - 0.1, 0.5, 0.03], ['pop', T.aqIn + 0.1, 880, 0.035, 0.4], ['bell', T.aqIn + 0.3, 1760, 0.018, 1.2, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.aloof, 0.025], ['pop', T.crowdLook, 1174.66, 0.02, -0.4], ['pop', T.crowdLook + 0.06, 1318.51, 0.018, -0.3],
  ...wordPops(T.h1, 4, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.gasp, 440, 0.035, 0.3], ['pop', T.leoOut[0] + 0.2, 659.25, 0.035, -0.3], ['pop', T.wave[0] + 0.2, 987.77, 0.02, -0.3],
  ['whoosh', T.down[0], 0.8, 0.035], ['tick', T.phones[1], 0.035], ['bell', T.meet, 1318.51, 0.03, 1.2, 0], ['glitter', T.meet, T.meet + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, 0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
