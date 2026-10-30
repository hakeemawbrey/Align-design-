// srl01chakra (20 s vertical, Star Talk Remix of the "Chakra" loop L01) · story 0–15.6, then the shared end card.
// The loop's image (the chakra column flaring bar by bar inside a radial spectrum ring) becomes seven little chakra
// stars stacked in a wobbly totem, with THE STARS as a gold yoga teacher beside them.
//   0.00–5.40  "Seven chakras. | *One* line."  The seven stars drop in bottom → top (root red → crown violet), each with
//              a rising chime. Rule of three: ROOT is squashed under everyone (sweat drop), CROWN fell asleep (z's),
//              HEART is sticking out of the line, scrolling a glowing phone. Box (THE STARS): "deep breath. all seven
//              of you." → everyone inhales tall in sync… except crown (snoring) and heart (swiping).
//   5.40–8.30  "Heart… | *swiping?*"  THE STARS: "heart. are you swiping? in *yoga?*" → heart double-takes, the phone
//              flies off and poofs into a talk card ("What's a hill you will die on?").
//   8.30–11.4  "Open | *heart.*"  THE STARS: "open hearts ask *real* questions." → heart reads the card, heart-eyes,
//              slides into line; crown wakes with a start; root stops sweating; the column locks and flares
//              bottom → top (the loop's sweep), the ring blooms and the seed of life opens behind them.
//  11.55       card cut (flip).
//  11.70–15.5  "Put your faith | in the *stars.*"  The aligned column glows, flaring once per bar; the teacher winks.
// One canvas (sky + ring + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const TAU = Math.PI * 2

// the chakra column (root → crown), the loop's colours
const CHAKRA = [
  { name: 'ROOT', c: '#ff2d3a' }, { name: 'SACRAL', c: '#ff7a2e' }, { name: 'SOLAR PLEXUS', c: '#ffd23f' },
  { name: 'HEART', c: '#5fdc54' }, { name: 'THROAT', c: '#2fd0e6' }, { name: 'THIRD EYE', c: '#4a72ff' }, { name: 'CROWN', c: '#b45cff' },
]
const HEART_I = 3, CROWN_I = 6, ROOT_I = 0
const CRGB = CHAKRA.map(k => [1, 3, 5].map(i => parseInt(k.c.slice(i, i + 2), 16)))
function chakraAt(f) {
  const x = clamp(f) * 6, i = Math.min(5, Math.floor(x)), u = x - i
  return `rgb(${[0, 1, 2].map(k => Math.round(lerp(CRGB[i][k], CRGB[i + 1][k], u))).join(',')})`
}

// ── the timeline
const T = {
  h0: 0.12, h0Out: [5.2, 5.4],
  drop0: 0.4, dropGap: 0.278,                                          // star i pops at drop0 + i·dropGap
  sweat: 2.3, open: 2.66, l1: BEAT(4) + 0.02,                          // 2.82 the drop
  inhale: [4.15, 4.85], exhale: [4.95, 5.5], snore: 4.55,
  h1: 5.55, h1Land: 5.95, l2: 5.6, take: [6.05, 6.3, 6.55], fling: [7.0, 7.5], cardIn: 7.55, h1Out: [8.15, 8.33],
  h3: 8.45, h3Land: 8.8, l3: 8.5, read: 8.3, heartEyes: 9.3, slide: [9.4, 9.9], wake: 9.62, lock: 10.0, cardOut: [10.85, 11.2],
  close: 11.3, h3Out: [11.15, 11.35],
  cut: 11.55,
  h2: 11.7, h2Land: 12.1, wink: [13.4, 13.9], h2Out: [15.1, 15.42], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'deep breath. all seven of you.' },
  { t: T.l2, speaker: SPEAK, text: 'heart. are you swiping? in *yoga?*', color: '#7ef08a' },
  { t: T.l3, speaker: SPEAK, text: 'open hearts ask *real* questions.', color: '#7ef08a' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const sine01 = p => 0.5 - 0.5 * Math.cos(Math.PI * clamp(p))
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
const PHONE = ['kkkkkkk', 'kSSSSSk', 'kSwSSSk', 'kSSSSSk', 'kSSwSSk', 'kSSSSSk', 'kSSSSSk', 'kSwwwSk', 'kkkkkkk', 'kkkWkkk', 'kkkkkkk']
const PHONE_C = { k: '#2a2050', S: '#9fe6ff', w: '#ffffff', W: '#6c5fa8' }
const DROP = ['.B.', 'BBB', 'BWB', '.B.']
const DROP_C = { B: '#7fd6ff', W: '#e8fbff' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
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

// ── layout
const COLX = 462, ROW0 = 1296, ROWG = 117, SIZE = 158
const rowY = i => ROW0 - i * ROWG
const RING = { x: COLX, y: rowY(3), r0: 236 }
const MIS = [6, -16, 12, 58, -10, 14, -20]                     // how crooked each star sits before the lock
const GUIDE = { x: 884, y: 1236, size: 228 }
const CARD = { x: 716, y: 930, w: 250 }
const LABEL_R = 368                                             // labels are right-aligned to this x

const misK = t => 1 - ease.inOutCubic(prog(t, T.lock - 0.35, T.lock + 0.05))       // the small jitters straighten at the lock
const flareAt = (t, i) => {                                     // a flare that sweeps bottom → top: at the lock, then once per bar
  let f = 0
  const k = t - (T.lock + i * 0.13)
  if (k > 0 && k < 0.9) f = Math.max(f, Math.exp(-k * 4.5) * Math.min(1, k / 0.05))
  if (t > T.h2) {
    const bar = 4 * 0.5556, ph = ((t - (T.h2 + 0.2)) % bar + bar) % bar - i * 0.1
    if (ph > 0 && ph < 0.9 && t > T.h2 + 0.2) f = Math.max(f, 0.7 * Math.exp(-ph * 4.5))
  }
  return f
}

const GUIDE_HOPS = talkHops(LINES, SPEAK, { cps: CPS })
function chakraState(t, i) {
  const lock = t >= T.lock - 0.05
  if (i === HEART_I) {
    if (t < T.take[0]) return { mood: 'neutral', look: [1, 1], blink: false }                 // glued to the phone
    if (t < T.take[1]) return { mood: 'wide', look: [0, 0], blink: false }                    // …huh?
    if (t < T.take[2]) return { mood: 'neutral', look: [1, 1], blink: false }                 // back to the phone
    if (t < T.fling[1]) return { mood: 'wide', look: [-1, 0], blink: false }                  // CAUGHT
    if (t < T.heartEyes) return { mood: 'neutral', look: [1, 0] }                            // reads the card
    if (t < T.h2) return { mood: 'heart' }
    return { mood: 'happy' }
  }
  if (i === CROWN_I) {
    if (t < T.wake) return { mood: 'sleepy', look: [0, 0] }
    if (t < T.wake + 0.45) return { mood: 'wide', look: [0, 0], blink: false }
    return { mood: t < T.h2 ? 'neutral' : 'happy' }
  }
  if (i === ROOT_I && !lock) return { mood: 'squint', look: [0, -1] }                         // holding everyone up
  if (t > T.take[2] && t < T.fling[1] + 0.3) return { mood: 'wide', look: [1, 0], blink: false }  // all look at heart
  if (t >= T.inhale[0] && t < T.exhale[1]) return { mood: 'happy' }
  if (lock && t < T.h2) return { mood: 'sparkle' }
  if (lock) return { mood: 'happy' }
  return { mood: 'neutral' }
}
function guideState(t) {
  if (t < T.l2) return { mood: 'happy', look: [0, 0] }                                        // eyes shut, zen
  if (t < T.take[2]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.cardIn) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.lock) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'heart' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: 'happy', look: [0, 0] }
}
const breathSq = t => {
  const a = sine01(prog(t, ...T.inhale)), b = sine01(prog(t, ...T.exhale))
  return -0.13 * (a - b)
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const TALK = bake(await loadImg('card-talk-1.png'), CARD.w)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // chakra labels (DOM, right-aligned to the left of the column)
  const labels = CHAKRA.map((k, i) => el('div', { position: 'absolute', left: '0px', width: LABEL_R + 'px', top: (rowY(i) - 16) + 'px', textAlign: 'right',
    fontFamily: MONO, fontWeight: 700, fontSize: '26px', letterSpacing: '0.1em', color: k.c, textShadow: '0 2px 10px rgba(6,4,18,0.95)', opacity: 0 }, root, k.name))

  // ── type
  const H0 = popText(root, 'Seven chakras. | *One* line.', { top: 200, size: 104, accentSize: 156, at: T.h0, gap: 0.1, late: 2, lateAt: T.h0 + 0.42, wobble: true })
  const H1 = popText(root, 'Heart… | *swiping?*', { top: 196, size: 112, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#7ef08a' })
  const H3 = popText(root, 'Open | *heart.*', { top: 196, size: 112, accentSize: 170, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: '#7ef08a' })
  const H2 = popText(root, 'Put your faith | in the *stars.*', { top: 200, size: 108, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H3, T.h3Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1404, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // how lit the whole mandala is: faint idle hum → blooms at the lock
  const bloomK = t => 0.22 + 0.78 * ease.outCubic(prog(t, T.lock, T.lock + 0.6))

  function drawRing(t) {
    const ok = popOut(t, T.out) * clamp((t - 0.3) / 0.8)
    if (ok <= 0) return
    const bk = bloomK(t), rot = t * 0.12
    const beat = Math.exp(-(((t - 0.6) % 0.5556 + 0.5556) % 0.5556) * 7)
    const R0 = RING.r0 + 10 * beat * bk
    x.save(); x.lineCap = 'round'
    for (let pass = 0; pass < 2; pass++) {
      x.globalCompositeOperation = pass ? 'source-over' : 'lighter'
      for (let i = 0; i < 96; i++) {
        const j = i % 48, q = j < 24 ? j : 47 - j
        const v = clamp(0.35 + 0.3 * Math.sin(t * 3.3 + q * 0.7) + 0.25 * Math.sin(t * 5.1 - q * 1.3) + 0.25 * beat * bk)
        const a = (i / 96) * TAU - Math.PI / 2 + rot
        const len = (12 + v * 120) * (0.55 + 0.45 * bk)
        x.strokeStyle = chakraAt((1 - Math.sin(a)) / 2)
        x.globalAlpha = ok * (pass ? (0.3 + 0.5 * v) : (0.08 + 0.16 * v)) * (0.45 + 0.55 * bk)
        x.lineWidth = pass ? 5 : 15
        x.beginPath(); x.moveTo(RING.x + Math.cos(a) * R0, RING.y + Math.sin(a) * R0); x.lineTo(RING.x + Math.cos(a) * (R0 + len), RING.y + Math.sin(a) * (R0 + len)); x.stroke()
      }
    }
    // beat rings rolling out once the column locks
    if (t > T.lock) for (let j = 0; j < 3; j++) {
      const pp = (((t - T.lock) / 0.5556 - j / 3) % 1 + 1) % 1
      x.globalCompositeOperation = 'source-over'; x.globalAlpha = ok * (1 - pp) * 0.3 * bk; x.strokeStyle = BONE; x.lineWidth = 2
      x.beginPath(); x.arc(RING.x, RING.y, R0 + pp * 420, 0, TAU); x.stroke()
    }
    // seed of life, opening behind the column at the lock
    const sk = ok * ease.outCubic(prog(t, T.lock + 0.1, T.lock + 0.9))
    if (sk > 0) {
      x.save(); x.translate(RING.x, RING.y); x.rotate(t * 0.2)
      const R = 104 * (0.7 + 0.3 * sk)
      const pet = [[0, 0], ...Array.from({ length: 6 }, (_, q) => [Math.cos((-90 + q * 60) * Math.PI / 180) * R, Math.sin((-90 + q * 60) * Math.PI / 180) * R])]
      for (let pass = 0; pass < 2; pass++) {
        x.globalCompositeOperation = pass ? 'source-over' : 'lighter'
        x.globalAlpha = sk * (pass ? 0.5 : 0.18); x.strokeStyle = pass ? '#e4d9f6' : '#c9a6ff'; x.lineWidth = pass ? 2.5 : 12
        for (const [px, py] of pet) { x.beginPath(); x.arc(px, py, R, 0, TAU); x.stroke() }
        x.beginPath(); x.arc(0, 0, R * 2, 0, TAU); x.stroke()
      }
      x.restore()
    }
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
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 6) {
    for (let i = 0; i < 6; i++) {
      const born = t0 + i * 0.17, life = 1.0
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 200 + Math.sin(p * 7 + i) * 14), Math.round(cy - 40 - p * 200), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawColumn(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return []
    const mk = misK(t), br = breathSq(t)
    const pos = []
    // draw top → bottom so each lower star sits in front of the one above (a totem)
    for (let i = 6; i >= 0; i--) {
      const born = T.drop0 + i * T.dropGap
      const pp = pop01(t, born, 0.34, 2.2) * ok
      if (pp <= 0.02) { pos[i] = null; continue }
      const fall = 1 - ease.outCubic(prog(t, born - 0.12, born + 0.16))
      let dx = MIS[i] * mk
      if (i === HEART_I) dx = MIS[i] * (1 - easeOutBack(prog(t, ...T.slide), 1.5))
      const sway = (1 - prog(t, T.lock - 0.3, T.lock)) * Math.sin(t * 2.3 + i * 0.9) * (3 + i * 1.6)       // the totem wobbles until it locks
      const cx = COLX + dx + sway, cy = rowY(i) - fall * 360
      const st = chakraState(t, i)
      let squash = 0
      if (i === ROOT_I) squash += 0.16 * (1 - easeOutBack(prog(t, T.lock, T.lock + 0.4), 1.6)) * clamp((t - T.drop0 - 6 * T.dropGap) / 0.3) + 0.03 * Math.sin(t * 9) * (t < T.lock ? 1 : 0) * clamp((t - 2.1) / 0.2)
      if (i !== HEART_I && i !== CROWN_I && i !== ROOT_I) squash += br
      if (i === HEART_I && t > T.take[2] && t < T.take[2] + 0.4) squash += -0.12 * Math.exp(-(t - T.take[2]) * 8) * Math.cos((t - T.take[2]) * 22)   // jump scare
      if (i === CROWN_I && t > T.wake && t < T.wake + 0.5) squash += -0.14 * Math.exp(-(t - T.wake) * 7) * Math.cos((t - T.wake) * 22)
      const f = flareAt(t, i)
      const hops = i === HEART_I ? [T.slide[1] - 0.02, T.h2 + 0.3] : i === CROWN_I ? [T.wake] : [T.lock + i * 0.13 + 0.02]
      // flare halo behind the star, like the loop's column dots
      if (f > 0.02) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(cx, cy, 0, cx, cy, 150 + 40 * f)
        g.addColorStop(0, CHAKRA[i].c + 'cc'); g.addColorStop(0.45, CHAKRA[i].c + '44'); g.addColorStop(1, CHAKRA[i].c + '00')
        x.globalAlpha = f * ok; x.fillStyle = g; x.fillRect(cx - 200, cy - 200, 400, 400); x.restore()
      }
      const r = drawStarChar(x, cx, cy, SIZE, t, { color: CHAKRA[i].c, ...st, hops, pop: pp, squash, seed: 2 + i * 3, glow: 0.75 + 0.6 * f + (t > T.lock ? 0.25 : 0), bob: t < T.lock ? 3 : 2 })
      pos[i] = { x: cx, y: r.y, pp }
    }
    return pos
  }

  function drawPhone(t, hp) {
    if (!hp || t > T.fling[1]) return
    const fl = prog(t, ...T.fling)
    const bx = hp.x + 104, by = hp.y + 24
    const px = bx + ease.inQuad(fl) * 330, py = by - Math.sin(Math.PI * fl) * 260 - fl * 80
    const rot = 0.12 + fl * 9
    const a = hp.pp * (1 - prog(t, T.fling[1] - 0.08, T.fling[1]))
    // screen glow on the heart star's face
    if (fl <= 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(bx, by, 0, bx, by, 110); g.addColorStop(0, 'rgba(159,230,255,0.28)'); g.addColorStop(1, 'rgba(159,230,255,0)')
      x.globalAlpha = a; x.fillStyle = g; x.fillRect(bx - 110, by - 110, 220, 220); x.restore()
    }
    drawBits(x, PHONE, PHONE_C, Math.round(px), Math.round(py), 8, { rot, alpha: a })
    // swipe flicks on the screen
    if (fl <= 0) {
      const sw = (t * 2.6) % 1
      x.save(); x.globalAlpha = a * Math.sin(Math.PI * sw); x.fillStyle = '#ffffff'
      x.fillRect(Math.round(px - 12 + sw * 20), Math.round(py - 6), 6, 6); x.restore()
    }
  }

  function drawCard(t) {
    if (!TALK) return
    const pin = pop01(t, T.cardIn, 0.4, 2.2), pout = popOut(t, T.cardOut)
    if (pin <= 0.01 || pout <= 0) return
    const s = pin * pout, w = CARD.w * s, h = TALK.height / TALK.width * w
    const cy = CARD.y + Math.sin(t * 2.1) * 6
    x.save(); x.translate(CARD.x, cy); x.rotate(0.08 * Math.sin(t * 1.4) + (1 - pin) * 0.6)
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, 0, 0, 0, 0, w * 1.1); g.addColorStop(0, 'rgba(126,240,138,0.28)'); g.addColorStop(1, 'rgba(126,240,138,0)')
    x.fillStyle = g; x.fillRect(-w * 1.1, -w * 1.1, w * 2.2, w * 2.2)
    x.globalCompositeOperation = 'source-over'
    x.drawImage(TALK, -w / 2, -h / 2, w, h)
    x.restore()
  }

  function drawSweat(t, rp) {
    if (!rp || t < T.sweat || t > T.lock) return
    for (let k = 0; k < 2; k++) {
      const ph = ((t - T.sweat) * 1.4 + k * 0.5) % 1
      drawBits(x, DROP, DROP_C, Math.round(rp.x + 72 + k * 10), Math.round(rp.y - 40 + ph * 50), 5, { alpha: Math.sin(Math.PI * ph) })
    }
  }

  function drawGuide(t) {
    const ok = popOut(t, T.out)
    const gp = pop01(t, 1.2, 0.4, 2.2) * ok
    if (gp <= 0.02) return
    const st = guideState(t)
    const sq = breathSq(t) + (t > T.take[2] && t < T.take[2] + 0.4 ? -0.1 * Math.exp(-(t - T.take[2]) * 8) : 0)
    const r = drawStarChar(x, GUIDE.x, GUIDE.y, GUIDE.size, t, { color: STAR.sky, ...st, hops: [1.5, ...GUIDE_HOPS, T.lock + 0.2], pop: gp, squash: sq, seed: 11, glow: 1.1 })
    if (t > T.lock && t < T.h2) floatHearts(t, r.x, r.y - 30, T.lock + 0.1, T.lock + 0.9, 3)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * lerp(0.8, 0.62, bloomK(t)) })
      if (t < T.out[1] + 0.02) {
        drawRing(t)
        drawGuide(t)
        const pos = drawColumn(t)
        drawPhone(t, pos[HEART_I])
        drawCard(t)
        drawSweat(t, pos[ROOT_I])
        if (pos[HEART_I] && t > T.heartEyes && t < T.lock + 0.4) floatHearts(t, pos[HEART_I].x, pos[HEART_I].y, T.heartEyes, T.slide[1], 7, 5)
        sparkles(t, COLX, RING.y, T.lock, 14, 330, 0.3, [GOLD, BONE, '#7ef08a', '#c9a6ff'])
        if (pos[HEART_I]) sparkles(t, CARD.x, CARD.y, T.cardIn - 0.05, 8, 90, 1.1, [BONE, '#7ef08a', GOLD])
      }
      // labels: on with their star, brighten on each flare, out with the stars
      const ok = popOut(t, T.out)
      labels.forEach((lb, i) => {
        const on = clamp((t - (T.drop0 + i * T.dropGap + 0.1)) / 0.25) * ok
        lb.style.opacity = String(on * (0.6 + 0.4 * Math.min(1, flareAt(t, i) * 1.5)))
        lb.style.transform = `translateX(${(MIS[i] * misK(t) * 0.3).toFixed(1)}px)`
      })
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 11.55 (box shut → "Put your faith in the stars."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the D-major palette and shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const COLUMN = [293.66, 329.63, 369.99, 440, 493.88, 587.33, 659.25]           // one chime per chakra, rising root → crown
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
export const CUES = [
  // hook: the column stacks up, bottom → top
  ...head(T.h0, 2, 0.1, T.h0 + 0.42, 0),
  ...COLUMN.map((f, i) => ['bell', +(T.drop0 + i * T.dropGap + 0.05).toFixed(3), f * 2, 0.026, 1.2, (i - 3) * 0.08]),
  ...COLUMN.map((f, i) => ['pop', +(T.drop0 + i * T.dropGap + 0.05).toFixed(3), f * 2, 0.03, 0]),
  ['pop', 1.25, 739.99, 0.04, 0.4], ['pop', 1.5, 987.77, 0.025, 0.4],
  ['chip', T.sweat, 1200, 0.06, { wave: 'tri', slide: -12, gain: 0.02, decay: 0.05, sustain: 0.5, ...FXO }],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // the big inhale (everyone but crown and heart) and the snore
  ['swell', T.inhale[0], T.inhale[1], { gain: 0.035, f0: 300, f1: 2400 }],
  ['whoosh', T.exhale[0], 0.6, 0.03],
  ['chip', T.snore, 150, 0.32, { wave: 'saw', slide: -4, gain: 0.03, decay: 0.3, sustain: 0.7, ...FXO }],
  ['chip', T.snore + 0.42, 520, 0.18, { wave: 'tri', slide: 6, gain: 0.02, decay: 0.15, sustain: 0.6, ...FXO }],
  // caught: double-take, the phone flies, poof → talk card
  ...head(T.h1, 1, 0.08, T.h1Land, 2),
  ['tick', T.take[0], 0.04], ['tick', T.take[1], 0.03], ['pop', T.take[2], 440, 0.05, 0], ['pop', T.take[2] + 0.05, 880, 0.04, 0],
  ['whoosh', T.fling[0], 0.5, 0.045], ['pop', T.fling[1] - 0.04, 1318.51, 0.04, 0.4], ['tick', T.fling[1], 0.04],
  ['pluck', T.cardIn + 0.05, 1174.66, 0.045, 0.6, 0.3], ['glitter', T.cardIn, T.cardIn + 0.45],
  // open heart → the column locks and flares bottom → top
  ...head(T.h3, 1, 0.08, T.h3Land, 1),
  ['pluck', T.heartEyes, 1174.66, 0.04, 0.5, 0], ['pluck', T.heartEyes + 0.12, 1567.98, 0.035, 0.5, 0],
  ['whoosh', T.slide[0], 0.4, 0.03], ['pop', T.slide[1], 659.25, 0.04, 0],
  ['pop', T.wake, 1318.51, 0.045, -0.2], ['tick', T.wake + 0.03, 0.04],
  ['boom', T.lock, 0.22],
  ...COLUMN.map((f, i) => ['bell', +(T.lock + i * 0.13).toFixed(3), f * 2, 0.034, 1.8, (i - 3) * 0.1]),
  ['glitter', T.lock, T.lock + 0.9],
  ['pop', T.cardOut[0], 1318.51, 0.03, 0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // put your faith in the stars
  ...head(T.h2, 5, 0.08, T.h2Land, 3),
  ['bell', T.h2 + 0.2, 1174.66, 0.025, 1.6, -0.2], ['bell', T.h2 + 0.2 + 2.222, 1318.51, 0.022, 1.6, 0.2],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
