// srl03aura (20 s vertical, Star Talk Remix of the "Aura" loop L03) · story 0–15.6, then the shared end card.
// The loop's image (an aura-camera portrait sweeping the whole spectrum, one veil per beat) becomes a ♊ Gemini star
// whose bio says "chill", sitting for an aura photo.
//   0.00–2.80  "Bio: | *“chill.”*"  An aura-camera Polaroid; the Gemini star strikes a cool pose. FLASH. The photo
//              develops: RED · PASSION. Gemini, smug.
//   2.82–8.40  "Aura: | *everything.*"  The drop: the aura sweeps the spectrum, one colour per beat (ORANGE · CHAOS,
//              YELLOW · CHATTY, GREEN · NOSY, BLUE · DEEP, INDIGO · BROODY, VIOLET · DREAMY, MAGENTA · DRAMATIC),
//              Gemini's eyes get wider each time, then it all goes rainbow: ALL OF THEM. Pisces cries at the beauty.
//              THE STARS: "bio said chill. aura said *all of it.*"  ♊ GEMINI: "…it's a phase."
//   8.40–11.4  "Card first. | Face *last.*"  THE STARS: "your aura says what your bio *won't.*" Gemini hops out of the
//              photo, and the Polaroid flips into a veiled mystery card (aura on, face hidden).
//  11.55       card cut (flip).
//  11.70–15.5  "What color | is *yours?*"  The card glows in the rainbow aura; Gemini winks.
// One canvas (sky + aura + polaroid + stars + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
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
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BEAT = n => 0.6 + n * 0.5556
const GEM = signStar('gemini'), PIS = signStar('pisces')

// the loop's veils, now read as Gemini moods
const VEILS = [
  { name: 'RED', mood: 'PASSION', hex: '#ff2d3a' }, { name: 'ORANGE', mood: 'CHAOS', hex: '#ff7a2e' },
  { name: 'YELLOW', mood: 'CHATTY', hex: '#ffd23f' }, { name: 'GREEN', mood: 'NOSY', hex: '#3fdc8a' },
  { name: 'BLUE', mood: 'DEEP', hex: '#2fd0e6' }, { name: 'INDIGO', mood: 'BROODY', hex: '#4a72ff' },
  { name: 'VIOLET', mood: 'DREAMY', hex: '#a35cff' }, { name: 'MAGENTA', mood: 'DRAMATIC', hex: '#ff3d8f' },
]
const RGB = VEILS.map(v => [1, 3, 5].map(i => parseInt(v.hex.slice(i, i + 2), 16)))

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.42, frameIn: 0.3, gemIn: 0.5, pose: 0.95, flash: 1.45, h0Out: [2.62, 2.8],
  sweep0: BEAT(4), sweepGap: 0.5556, rainbow: BEAT(4) + 7 * 0.5556 + 0.5,          // 2.82 … 7.71
  h1: 2.88, h1Land: 3.25, open: 3.18, l1: 3.32, pisIn: 4.6, l2: 6.3, h1Out: [8.25, 8.42],
  h2: 8.5, h2Land: 8.9, l3: 8.55, hopOut: [8.75, 9.15], flip: [9.2, 9.65],
  close: 11.4, h2Out: [11.15, 11.35],
  cut: 11.55,
  h3: 11.7, h3Land: 12.1, wink: [13.3, 13.8], h3Out: [15.1, 15.42], out: [15.05, 15.45],
}
const ST = 'THE STARS', GT = '♊ GEMINI STAR'
const LINES = [
  { t: T.l1, speaker: ST, text: 'bio said chill. aura said *all of it.*', color: '#ff8fd0' },
  { t: T.l2, speaker: GT, text: '…it’s a phase.', color: GEM.color },
  { t: T.l3, speaker: ST, text: 'your aura says what your bio *won’t.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const sstep = v => { v = clamp(v); return v * v * (3 - 2 * v) }

/** current veil index + blend (hold, then crossfade into the next in the last 30% of each beat) */
function veilAt(t) {
  if (t < T.sweep0) return { i: 0, j: 0, f: 0 }
  const u = Math.min(7, (t - T.sweep0) / T.sweepGap)
  const i = Math.floor(u), f = i >= 7 ? 0 : sstep((u - i - 0.7) / 0.3)
  return { i, j: Math.min(7, i + 1), f }
}
const colAt = t => { const { i, j, f } = veilAt(t); return RGB[i].map((c, k) => Math.round(c + (RGB[j][k] - c) * f)) }
const rainbowK = t => ease.inOutCubic(prog(t, T.rainbow - 0.3, T.rainbow + 0.3))

// ── layout
const POL = { x: 540, y: 812, w: 560, h: 676, photo: 476 }     // polaroid: photo square at the top, label strip below
const PHOTO_Y = POL.y - POL.h / 2 + 42 + POL.photo / 2
const GEMS = { x: 540, y: PHOTO_Y + 20, size: 290 }
const GEM_OUT = { x: 214, y: 1258, size: 220 }
const GUIDE = { x: 880, y: 1250, size: 196 }
const PISC = { x: 150, y: 1010, size: 116 }
const CARD = { x: 560, y: 812, w: 440 }
const TEAR = ['.B.', 'BBB', '.B.']
function drawBits(x, bm, cols, cx, cy, cell, { alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy)
  const ox = -w * cell / 2, oy = -h * cell / 2
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

const GEM_HOPS = [T.gemIn + 0.3, T.pose, ...talkHops(LINES, GT, { cps: CPS }), T.hopOut[0] + 0.05, T.h3Land]
const GUIDE_HOPS = [1.0, ...talkHops(LINES, ST, { cps: CPS })]
function gemState(t) {
  if (t < T.pose) return { mood: 'happy' }
  if (t < T.flash) return { mood: 'wink', look: [0, 0] }                             // the cool pose
  if (t < T.flash + 0.35) return { mood: 'squint', look: [0, 0] }                    // flash-blind
  if (t < T.sweep0) return { mood: 'sparkle', look: [0, 0] }                         // RED · PASSION. nice.
  if (t < T.sweep0 + 2 * T.sweepGap) return { mood: 'neutral', look: [1, -1] }       // …orange? yellow?
  if (t < T.rainbow - 0.3) return { mood: 'wide', look: [Math.round(Math.sin(t * 9)), -1], blink: false }
  if (t < T.l2) return { mood: 'eyeroll' }                                            // dizzy
  if (t < T.l3) return { mood: 'squint', look: [-1, 0] }                              // "…it's a phase."
  if (t < T.h3) return { mood: 'happy' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: 'heart' }
}
function guideState(t) {
  if (t < T.sweep0) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.l3) return { mood: 'squint', look: [-1, 0] }
  return { mood: 'happy', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const FACE = bake(await loadImg('card-profile-1.png'), CARD.w)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Bio: | *“chill.”*', { top: 150, size: 112, accentSize: 176, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: '#9fd8ff', lineHeight: 0.94 })
  const H1 = popText(root, 'Aura: | *everything.*', { top: 150, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#ff8fd0', lineHeight: 0.94 })
  const H2 = popText(root, 'Card first. | Face *last.*', { top: 150, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.94 })
  const H3 = popText(root, 'What color | is *yours?*', { top: 150, size: 112, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#ff8fd0', lineHeight: 0.94 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1404, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flash = el('div', { position: 'absolute', inset: 0, background: '#fffaf0', opacity: 0 }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const develop = t => ease.outCubic(prog(t, T.flash + 0.05, T.flash + 0.9))
  /** fillStyle for the aura: the current veil colour, or the rainbow once it's all of them */
  function auraPaint(t, a, cx, cy) {
    const rk = rainbowK(t)
    if (rk <= 0.01) { const [r, g, b] = colAt(t); return `rgba(${r},${g},${b},${a})` }
    const g = x.createConicGradient(t * 1.6, cx, cy)
    VEILS.forEach((v, i) => g.addColorStop(i / 8, v.hex))
    g.addColorStop(1, VEILS[0].hex)
    return g
  }

  function drawField(t) {
    const d = develop(t) * popOut(t, T.out)
    if (d <= 0) return
    const [r, g, b] = rainbowK(t) > 0.5 ? [255, 170, 230] : colAt(t)
    const beat = Math.exp(-(((t - 0.6) % 0.5556 + 0.5556) % 0.5556) * 6)
    x.save(); x.globalCompositeOperation = 'lighter'
    const gr = x.createRadialGradient(540, 860, 60, 540, 860, 900)
    gr.addColorStop(0, `rgba(${r},${g},${b},${0.2 * d * (0.7 + 0.3 * beat)})`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`)
    x.fillStyle = gr; x.fillRect(0, 0, 1080, 1920)
    x.restore()
  }

  function drawAuraIn(t, cx, cy, d, rad = 230) {
    // breathing aura blob + rings rolling out on the beat, clipped by the caller
    const beat = Math.exp(-(((t - 0.6) % 0.5556 + 0.5556) % 0.5556) * 6)
    x.save(); x.globalCompositeOperation = 'lighter'
    const rk = rainbowK(t)
    for (let q = 0; q < 3; q++) {
      const u = (((t - 0.6) / 0.5556 - q / 3) % 1 + 1) % 1
      x.globalAlpha = d * (1 - u) ** 1.5 * 0.55
      x.strokeStyle = auraPaint(t, 1, cx, cy); x.lineWidth = 22 - 14 * u
      x.beginPath(); x.ellipse(cx, cy, rad * (0.7 + u * 1.1), rad * (0.85 + u * 1.25), 0, 0, TAU); x.stroke()
    }
    x.globalAlpha = d * (0.7 + 0.25 * beat)
    const [r, g, b] = colAt(t)
    const gr = x.createRadialGradient(cx, cy, 10, cx, cy, rad * 1.25)
    gr.addColorStop(0, `rgba(${r},${g},${b},${0.95 * (1 - rk * 0.6)})`); gr.addColorStop(0.55, `rgba(${r},${g},${b},${0.45 * (1 - rk * 0.6)})`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`)
    x.fillStyle = gr; x.fillRect(cx - rad * 1.4, cy - rad * 1.4, rad * 2.8, rad * 2.8)
    if (rk > 0) {
      x.globalAlpha = d * rk * 0.6
      x.fillStyle = auraPaint(t, 1, cx, cy)
      x.beginPath(); x.ellipse(cx, cy, rad * 1.05, rad * 1.2, 0, 0, TAU); x.fill()
    }
    x.restore()
  }

  function drawPolaroid(t) {
    const pin = pop01(t, T.frameIn, 0.42, 1.8)
    const fl = prog(t, T.flip[0], (T.flip[0] + T.flip[1]) / 2)
    if (pin <= 0.01 || fl >= 1) return
    const sx = 1 - ease.inCubic(fl)
    const d = develop(t)
    x.save(); x.translate(POL.x, POL.y + (1 - pin) * 240); x.scale(sx * pin, pin); x.rotate(-0.035)
    const left = -POL.w / 2, top = -POL.h / 2
    // frame (bone, pixel-ish ink edge)
    x.fillStyle = INK; x.fillRect(left - 6, top - 6, POL.w + 12, POL.h + 12)
    x.fillStyle = '#f4ecdc'; x.fillRect(left, top, POL.w, POL.h)
    x.fillStyle = '#e2d6bf'; x.fillRect(left, top + POL.h - 10, POL.w, 10)
    // the photo
    const ph = { x: left + (POL.w - POL.photo) / 2, y: top + 42, s: POL.photo }
    x.save(); x.beginPath(); x.rect(ph.x, ph.y, ph.s, ph.s); x.clip()
    x.fillStyle = '#120c2a'; x.fillRect(ph.x, ph.y, ph.s, ph.s)
    const pcx = 0, pcy = ph.y + ph.s / 2 + 20
    if (d > 0) drawAuraIn(t, pcx, pcy, d)
    // the sitter (until it hops out of the photo)
    const ho = prog(t, ...T.hopOut)
    if (ho <= 0) {
      const st = gemState(t)
      drawStarChar(x, pcx, pcy, GEMS.size, t, { color: GEM.color, glyph: GEM.glyph, ...st, hops: GEM_HOPS, pop: pop01(t, T.gemIn, 0.36, 2.2), seed: 5, glow: 0.9,
        squash: t > T.flash && t < T.flash + 0.4 ? 0.12 * Math.exp(-(t - T.flash) * 6) : 0 })
    }
    // un-developed photo veil
    x.globalAlpha = 0.55 * (t > T.flash ? 1 - d : 0); x.fillStyle = '#3a3448'; x.fillRect(ph.x, ph.y, ph.s, ph.s)
    x.restore()
    // label strip: the readout
    if (t > T.flash + 0.3) {
      const { i, f } = veilAt(t)
      const v = VEILS[f < 0.5 ? i : Math.min(7, i + 1)]
      const rk = rainbowK(t)
      const txt = rk > 0.5 ? 'ALL OF THEM' : `${v.name} · ${v.mood}`
      x.font = "700 36px 'Space Mono'"; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.globalAlpha = clamp((t - T.flash - 0.3) / 0.2)
      x.fillStyle = rk > 0.5 ? auraPaint(t, 1, 0, top + POL.h - 76) : v.hex
      x.fillText(txt, 0, top + POL.h - 82)
      x.fillStyle = 'rgba(27,18,54,0.55)'; x.font = "700 20px 'Space Mono'"
      x.fillText('AURA CAMERA · ♊ GEMINI', 0, top + POL.h - 36)
    }
    x.restore()
  }

  function drawCard(t) {
    if (!FACE) return
    const fl = prog(t, (T.flip[0] + T.flip[1]) / 2, T.flip[1])
    if (fl <= 0) return
    const ok = popOut(t, T.out)
    const sx = easeOutBack(fl, 1.6)
    const w = CARD.w, h = FACE.height / FACE.width * w
    const cy = CARD.y + Math.sin(t * 2) * 6
    drawAuraIn(t, CARD.x, cy, ok * clamp(fl * 2), 300)
    x.save(); x.translate(CARD.x, cy); x.scale(sx * ok, ok); x.rotate(0.03 * Math.sin(t * 1.3))
    x.drawImage(FACE, -w / 2, -h / 2, w, h)
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    // Gemini, out of the photo
    const ho = prog(t, ...T.hopOut)
    if (ho > 0 && ok > 0) {
      const e = ease.inOutCubic(ho)
      const gx2 = lerp(POL.x, GEM_OUT.x, e), gy2 = lerp(GEMS.y, GEM_OUT.y, e) - Math.sin(Math.PI * ho) * 200
      const r = drawStarChar(x, gx2, gy2, lerp(GEMS.size, GEM_OUT.size, e), t, { color: GEM.color, glyph: GEM.glyph, ...gemState(t), hops: GEM_HOPS.filter(h => h > T.hopOut[1]), pop: ok, seed: 5, glow: 1.1 })
      if (t > T.h3) sparkles(t, r.x, r.y, T.h3Land, 8, 120, 0.2, VEILS.map(v => v.hex))
    }
    // Pisces, crying at how beautiful it is
    const pp = pop01(t, T.pisIn, 0.36, 2.2) * popOut(t, [T.l3, T.l3 + 0.3])
    if (pp > 0.02) {
      const r = drawStarChar(x, PISC.x, PISC.y, PISC.size, t, { color: PIS.color, mood: 'sparkle', look: [1, -1], pop: pp, seed: 21, glow: 0.7, bob: 4, squash: 0.04 * Math.sin(t * 14) })
      for (let k = 0; k < 4; k++) {
        const ph = ((t - T.pisIn) * 1.6 + k * 0.25) % 1, side = k % 2 ? 1 : -1
        drawBits(x, TEAR, { B: '#8fd8ff' }, Math.round(r.x + side * (22 + ph * 40)), Math.round(r.y - 6 + ph * ph * 90 - Math.sin(Math.PI * ph) * 18), 4, { alpha: pp * Math.sin(Math.PI * ph) })
      }
    }
    // THE STARS
    const gp = pop01(t, 0.75, 0.36, 2.2) * ok
    if (gp > 0.02) drawStarChar(x, GUIDE.x, GUIDE.y, GUIDE.size, t, { color: STAR.bone, ...guideState(t), hops: GUIDE_HOPS, pop: gp, seed: 9, glow: 1.1 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * 0.8 })
      if (t < T.out[1] + 0.02) {
        drawField(t)
        drawPolaroid(t)
        drawCard(t)
        if (t > T.flip[0]) sparkles(t, CARD.x, CARD.y, (T.flip[0] + T.flip[1]) / 2, 12, 300, 0.5, VEILS.map(v => v.hex))
        drawCast(t)
      }
      const fk = t - T.flash
      flash.style.opacity = String(fk < 0 ? 0 : fk < 0.04 ? fk / 0.04 * 0.9 : 0.9 * Math.exp(-(fk - 0.04) * 6))
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 11.55 (box shut → "What color is yours?"). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the D-major palette and shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const SWEEP = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25, 739.99]      // one chime per colour, climbing
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
export const CUES = [
  ...head(T.h0, 1, 0.1, T.h0Land, 0),
  ['whoosh', T.frameIn, 0.4, 0.03], ['pop', T.frameIn + 0.3, 523.25, 0.035, 0],
  ['pop', T.gemIn + 0.05, 880, 0.04, 0], ['pop', 0.8, 1174.66, 0.035, 0.4],
  ['pluck', T.pose, 1318.51, 0.035, 0.5, 0],
  // the shutter + flash
  ['chip', T.flash - 0.04, 3000, 0.04, { wave: 'noise', gain: 0.05, decay: 0.03, sustain: 0.4, ...FXO }], ['tick', T.flash, 0.07],
  ['chip', T.flash + 0.05, 6000, 0.5, { wave: 'noise', slide: -20, gain: 0.018, decay: 0.4, sustain: 0.3, ...FXO }],
  ['swell', T.flash + 0.05, T.flash + 0.9, { gain: 0.03, f0: 500, f1: 4000 }],
  ['bell', T.flash + 0.6, SWEEP[0] * 2, 0.03, 1.4, 0],
  // the spectrum sweep, one chime per beat
  ...head(T.h1, 1, 0.08, T.h1Land, 2),
  ...SWEEP.slice(1).map((f, i) => ['bell', +(T.sweep0 + (i + 1) * T.sweepGap - 0.12).toFixed(3), f * 2, 0.026, 1.2, (i / 6 - 0.5) * 0.6]),
  ['riser', T.rainbow - 1.4, T.rainbow, 0.05], ['glitter', T.rainbow - 0.2, T.rainbow + 0.6], ['boom', T.rainbow, 0.16],
  ['pop', T.pisIn + 0.05, 987.77, 0.025, -0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GT]: 1150 } }),
  // card first: Gemini hops out, the Polaroid flips into the mystery card
  ...head(T.h2, 3, 0.08, T.h2Land, 1),
  ['whoosh', T.hopOut[0], 0.4, 0.035], ['pop', T.hopOut[1], 659.25, 0.04, -0.4],
  ['whoosh', T.flip[0], 0.35, 0.04], ['pluck', T.flip[1] - 0.1, 1174.66, 0.05, 0.6, 0], ['glitter', T.flip[1] - 0.2, T.flip[1] + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // what color is yours?
  ...head(T.h3, 3, 0.08, T.h3Land, 3),
  ['bell', T.h3Land + 0.05, 1760, 0.025, 1.6, 0],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
