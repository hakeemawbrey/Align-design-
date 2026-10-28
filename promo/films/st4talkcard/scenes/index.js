// st4talkcard (15 s vertical Align ad, Star Talk season 4, EP 016 · thread: talk cards) · story 0–10.6, then the end card.
//   0.00–3.30  "First-date | small talk | in *Houston.*"  Two date stars at a tiny café table, two sweating iced coffees.
//              LEFT: "so… the weather."  RIGHT: "humid."  Sweat drops. Silence: a pixel tumbleweed rolls across the table,
//              a clock ticks, both stars look anywhere else. (The ghost peeks over the table edge to watch it roll.)
//   3.30–8.50  "Try a | *talk card.*"  card-talk-1 flips in over the table: "What's a hill you will die on?"
//              Box (THE STARS): "skip the weather." → "ask what they'd *argue* for."  The card settles onto the table and
//              both stars light up, debating: "tacos > kolaches" · "HOW DARE YOU" · "ok hear me out—"
//   8.55–10.4  "Talk *deeper* than | the weather."  They're still arguing, happily. Everything pops out by 10.45.
// One canvas (sky + table + stars + card + bubbles), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 16
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', SKYB = '#7fdcff'
const MONO = "'Space Mono', ui-monospace, monospace"
const ME = '#c9a6ff', THEM = STAR.bone

// ── the timeline
const T = {
  h0: 0.12, h0Out: [3.12, 3.3],
  table: 0.25, meIn: 0.4, themIn: 0.55,
  b1: 1.05, b2: 2.0, sweat: 2.05, bubOut: [3.0, 3.18],
  tumble: [2.35, 3.45], ghost: 2.2,
  h1: 3.36, h1Land: 3.7, card: [3.3, 3.62], flip: [3.62, 4.02],
  open: 4.2, l1: 4.38, l2: 6.15, settle: [6.95, 7.45],
  deb: [7.25, 7.95, 8.75], close: 8.42, h1Out: [8.3, 8.48],
  h2: 8.6, h2Land: 8.95, h2Out: [10.15, 10.4], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'skip the weather.' },
  { t: T.l2, speaker: SPEAK, text: "ask what they'd *argue* for." },
]
const CPS = 28

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = bm[j][i]; if (ch === '.') continue; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }
  x.restore()
}

// ── pixel bits
const CUP = ['....s...', '....s...', '.WWWsWWW', '.WCCCCCW', '.WCCCCCW', '.WcCCCCW', '..WCCCW.', '..WCCCW.', '..WcccW.', '...WWW..']
const CUP_C = { s: '#ff8fb1', W: '#e8f3ff', C: '#a0673b', c: '#7a4a28' }
const TUMBLE = ['..bb.b..', '.b..b.b.', 'b.bb..bb', '.b..bb.b', 'b.b.b..b', '.bb..b.b', '..b.bb..', '...bb...']
const TUMBLE_C = { b: '#c9a06a' }
const DROP = ['.X.', 'XXX', 'XWX', '.X.']
const DROP_C = { X: SKYB, W: '#e8fbff' }

// ── layout
const ME_P = { x: 186, y: 1150, size: 256 }, THEM_P = { x: 894, y: 1150, size: 256 }
const TABLE = { x: 540, y: 1275, w: 360 }
const CARD = { x: 540, y: 838, h: 860 }
const CARD_DOWN = { x: 540, y: 1182, s: 0.22 }
const lowK = t => ease.inOutCubic(prog(t, 8.45, 8.56))        // under the 8.5 cut the stage drops into the freed box space
const BUBS = [   // [t, side, text, out]
  { t: T.b1, side: -1, text: 'so… the weather.', out: T.bubOut },
  { t: T.b2, side: 1, text: 'humid.', out: T.bubOut },
  { t: T.deb[0], side: -1, text: 'tacos > kolaches', out: [T.deb[2] - 0.05, T.deb[2] + 0.1] },
  { t: T.deb[1], side: 1, text: 'HOW DARE YOU', out: [T.out[0], T.out[1]] },
  { t: T.deb[2], side: -1, text: 'ok, hear me out—', out: [T.out[0], T.out[1]] },
]

const ME_HOPS = [T.meIn + 0.3, T.b1 + 0.05, T.b1 + 0.45, T.deb[0], T.deb[0] + 0.35, T.deb[2], T.deb[2] + 0.4, T.h2Land + 0.3, 9.6]
const THEM_HOPS = [T.themIn + 0.3, T.b2 + 0.05, T.deb[1], T.deb[1] + 0.3, T.deb[1] + 0.6, 9.3, 9.9]

function meState(t) {
  if (t < T.b1) return { mood: 'happy' }
  if (t < T.b2) return { mood: 'neutral', look: [1, 0] }
  if (t < T.tumble[0]) return { mood: 'neutral', look: [1, 0], blink: false }
  if (t < T.card[0]) return { mood: 'neutral', look: [t < 2.9 ? 1 : -1, 1], blink: false }      // watches the tumbleweed, then the floor
  if (t < T.l1) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.l2 + 0.6) return { mood: 'neutral', look: [1, -1] }
  if (t < T.deb[0]) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.deb[1]) return { mood: 'happy' }
  if (t < T.deb[2]) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.h2Land) return { mood: 'squint', look: [1, 0], blink: false }
  return { mood: 'happy' }
}
function themState(t) {
  if (t < T.b1 + 0.3) return { mood: 'happy' }
  if (t < T.b2) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.tumble[0]) return { mood: 'squint', look: [0, 0], blink: false }
  if (t < T.card[0]) return { mood: 'neutral', look: [t < 2.95 ? -1 : 1, -1], blink: false }
  if (t < T.l1) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.l2 + 0.6) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.deb[1]) return { mood: t < T.deb[0] ? 'sparkle' : 'wide', look: [-1, 0], blink: false }
  if (t < T.deb[2]) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.h2Land) return { mood: 'happy' }
  return { mood: 'wink' }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [imBack, imTalk] = await Promise.all([load('card-back.png'), load('card-talk-1.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'First-date | small talk | in *Houston.*', { top: 190, size: 104, accentSize: 156, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.62, lineHeight: 0.98 })
  const H1 = popText(root, 'Try a | *talk card.*', { top: 150, size: 96, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: LAV, lineHeight: 0.92 })
  const H2 = popText(root, 'Talk *deeper* than | the weather.', { top: 210, size: 104, accentSize: 156, at: T.h2, late: 0, gap: 0.08, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, rgb, a) {
    if (a <= 0) return
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`)
    x.fillStyle = g; x.fillRect(cx - r, cy - r, 2 * r, 2 * r)
  }

  // café table + two iced coffees, sweating
  function drawTable(t) {
    const k = pop01(t, T.table, 0.4, 1.6) * popOut(t, T.out)
    if (k <= 0.01) return
    const c = 6, w = TABLE.w * k, ty = TABLE.y + (1 - k) * 80
    x.save(); x.globalAlpha = clamp(k * 1.5)
    // pedestal + foot
    x.fillStyle = INK; x.fillRect(TABLE.x - 4 * c, ty, 8 * c, 190); x.fillRect(TABLE.x - 18 * c, ty + 178, 36 * c, 4 * c)
    x.fillStyle = '#7a5a9c'; x.fillRect(TABLE.x - 2 * c, ty, 4 * c, 184); x.fillRect(TABLE.x - 17 * c, ty + 180, 34 * c, 2 * c)
    // top
    x.fillStyle = INK; x.fillRect(TABLE.x - w / 2 - c, ty - 3 * c, w + 2 * c, 5 * c)
    x.fillStyle = '#b48ad8'; x.fillRect(TABLE.x - w / 2, ty - 2 * c, w, 3 * c)
    x.fillStyle = '#e2cdf5'; x.fillRect(TABLE.x - w / 2, ty - 2 * c, w, c)
    x.restore()
    // cups
    for (const [cx, s] of [[TABLE.x - 120, 0], [TABLE.x + 120, 1]]) {
      const ck = pop01(t, T.table + 0.2 + s * 0.08, 0.3, 2.2) * popOut(t, T.out)
      if (ck <= 0.01) continue
      drawBits(x, CUP, CUP_C, cx, ty - 12 * c * 0.5 - 30, 6 * ck)
      // condensation drips running down the cup
      for (let i = 0; i < 2; i++) {
        const ph = (t * 0.6 + i * 0.5 + s * 0.3) % 1
        x.fillStyle = `rgba(232,251,255,${0.8 * Math.sin(Math.PI * ph) * ck})`
        x.fillRect(Math.round(cx - 14 + i * 26), Math.round(ty - 66 + ph * 40), 5, 7)
      }
    }
  }

  function drawTumble(t) {
    if (t < T.tumble[0] || t > T.tumble[1]) return
    const p = prog(t, ...T.tumble)
    const tx = lerp(-80, 1160, p), hop = Math.abs(Math.sin(p * Math.PI * 4)) * 50
    drawBits(x, TUMBLE, TUMBLE_C, tx, TABLE.y - 74 - hop, 9, { rot: p * 14, outline: '#5b3f22' })
    // dust puffs where it lands
    for (let k = 1; k < 4; k++) {
      const pk = k / 4, dt = p - pk
      if (dt < 0 || dt > 0.12) continue
      x.fillStyle = `rgba(239,230,214,${0.5 * (1 - dt / 0.12)})`
      const dx = lerp(-80, 1160, pk)
      for (let q = -2; q <= 2; q++) x.fillRect(dx + q * 16 - 4, TABLE.y - 34 - Math.abs(q) * 4 - dt * 120, 8, 8)
    }
  }

  function drawSweat(t, r, side) {
    const dt = t - T.sweat
    if (dt < 0 || dt > 1.3) return
    for (let i = 0; i < 2; i++) {
      const p = clamp((dt - i * 0.35) / 0.8)
      if (p <= 0 || p >= 1) continue
      const sx = r.x + side * (60 + i * 30) + side * p * 30, sy = r.top + 70 + p * 110
      drawBits(x, DROP, DROP_C, sx, sy, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  // card: rises over the table, flips face up, then settles onto the table (small)
  function cardState(t) {
    if (t < T.card[0]) return null
    const pin = easeOutBack(prog(t, ...T.card), 1.6)
    const fp = prog(t, ...T.flip), ang = ease.inOutCubic(fp) * Math.PI
    const sk = ease.inOutCubic(prog(t, ...T.settle))
    const ok = popOut(t, T.out)
    return { pin, fp, ang, front: ang > Math.PI / 2, sk, ok,
      cx: lerp(CARD.x, CARD_DOWN.x, sk), cy: lerp(lerp(CARD.y + 700, CARD.y, pin), CARD_DOWN.y, sk) + Math.sin(t * 1.6) * 5 * (1 - sk),
      s: lerp(1, CARD_DOWN.s, sk) * ok }
  }
  function drawCard(t) {
    const c = cardState(t)
    if (!c || c.s <= 0.01) return
    const im = c.front ? imTalk : imBack
    const h = CARD.h * (c.front ? 1 : 1.06), w = h * (im ? im.width / im.height : 0.626)
    const sxk = Math.max(0.02, Math.abs(Math.cos(c.ang)))
    glow(c.cx, c.cy, 520 * c.s, '242,199,92', (c.front ? 0.28 + 0.3 * Math.exp(-(t - T.flip[1]) * 3) : 0.16) * c.s)
    x.save(); x.globalAlpha = clamp(c.pin * 2)
    x.translate(c.cx, c.cy); x.rotate((1 - c.pin) * 0.22 + lerp(0.015 * Math.sin(t * 1.3), -0.06, c.sk)); x.scale(sxk * c.s, c.s * (1 + 0.04 * Math.sin(Math.PI * c.fp)))
    if (im) x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
    sparkles(t, c.cx, c.cy, T.flip[1] - 0.05, 12, 330, 1)
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, LAV, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }

  // pixel speech bubble with Space Mono text; tail toward the speaker
  function bubble(t, b) {
    const k = pop01(t, b.t, 0.28, 2.4) * (1 - ease.inCubic(prog(t, ...b.out)))
    if (k <= 0.01) return
    x.save()
    x.font = `700 40px ${MONO}`
    const tw = x.measureText(b.text).width, bw = tw + 56, bh = 84, P = 6
    const ax = b.side < 0 ? Math.max(40 + bw / 2, ME_P.x + 70) : Math.min(1040 - bw / 2, THEM_P.x - 70)
    const ay = b.side < 0 ? 858 : 965
    x.translate(ax, ay + bh / 2); x.scale(k, k); x.translate(0, -bh / 2)
    const L = -bw / 2, R = bw / 2
    const fillStep = (o, col) => { x.fillStyle = col; x.fillRect(L + o + P, o, bw - 2 * o - 2 * P, bh - 2 * o); x.fillRect(L + o, o + P, bw - 2 * o, bh - 2 * o - 2 * P) }
    fillStep(-P, INK); fillStep(0, b.side < 0 ? '#efe2ff' : BONE)
    // tail (stepped) toward the speaker below
    const tx = b.side < 0 ? L + 50 : R - 50
    x.fillStyle = INK; for (let i = 0; i < 4; i++) x.fillRect(tx - (3 - i) * P - P + (b.side < 0 ? -i * P : i * P), bh - P + i * P, (4 - i) * P + 2 * P, P + 1)
    x.fillStyle = b.side < 0 ? '#efe2ff' : BONE; for (let i = 0; i < 3; i++) x.fillRect(tx - (3 - i) * P + (b.side < 0 ? -i * P : i * P), bh - P + i * P, (3 - i) * P, P + 1)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(b.text, 0, bh / 2 + 2)
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const mp = pop01(t, T.meIn, 0.36, 2.2) * ok, tp = pop01(t, T.themIn, 0.36, 2.2) * ok
    const lean = ease.inOutCubic(prog(t, T.deb[0] - 0.4, T.deb[0])) * 22          // they lean in to argue
    const shrink = t > T.tumble[0] && t < T.card[0] + 0.2 ? 0.05 : 0                 // awkward hunch
    const rM = drawStarChar(x, ME_P.x + lean, ME_P.y, ME_P.size, t, { color: ME, ...meState(t), hops: ME_HOPS, pop: mp, seed: 4, squash: shrink, glow: t > T.l2 + 0.6 ? 1.3 : 0.9 })
    const rT = drawStarChar(x, THEM_P.x - lean, THEM_P.y, THEM_P.size, t, { color: THEM, ...themState(t), hops: THEM_HOPS, pop: tp, seed: 9, squash: shrink, glow: t > T.l2 + 0.6 ? 1.3 : 0.9 })
    drawSweat(t, rM, -1); drawSweat(t, rT, 1)
    if (t > T.l2 + 0.55) { sparkles(t, rM.x, rM.y, T.l2 + 0.6, 8, 150, 2, [GOLD, LAV, BONE]); sparkles(t, rT.x, rT.y, T.l2 + 0.6, 8, 150, 5, [GOLD, BONE, PINK]) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.42, SKY_H.zoom, ss), dy: lerp(-20, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      // warm, sticky Houston-afternoon haze that cools off once the card lands
      const haze = (1 - prog(t, T.flip[1], T.flip[1] + 1.2)) * clamp(t / 0.6)
      if (haze > 0) { const g = x.createLinearGradient(0, 700, 0, 1920); g.addColorStop(0, 'rgba(255,170,90,0)'); g.addColorStop(1, `rgba(255,150,80,${0.16 * haze})`); x.fillStyle = g; x.fillRect(0, 700, 1080, 1220) }
      if (t < T.out[1] + 0.02) {
        x.save(); x.translate(0, 150 * lowK(t))
        drawTable(t)
        drawGhostCameo(x, t, { x: TABLE.x, y: TABLE.y - 18, at: T.ghost, dur: 1.15, from: 'below', cell: 3 })
        drawTumble(t)
        drawStars(t)
        drawCard(t)
        for (const b of BUBS) bubble(t, b)
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.3 (small talk dies → the talk card) and 8.5 (box shut → the last line). A 15 s film keeps one.
const CUTS = [3.31, { t: 8.5, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: headline, table, two stars, small talk, sweat, the tumbleweed silence
  ...wordPops(T.h0, 5, 0.09, 0), ['pop', T.h0 + 0.62, 1046.5, 0.045, 0],
  ['pop', T.table + 0.05, 523.25, 0.03, 0], ['pop', T.table + 0.25, 783.99, 0.025, -0.3], ['pop', T.table + 0.33, 880, 0.025, 0.3],
  ['pop', T.meIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.themIn + 0.05, 783.99, 0.04, 0.3],
  ['pop', T.b1, 880, 0.035, -0.3], ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.b1 + 0.08 + i * 0.07).toFixed(3), 659.25 + (i % 2) * 120, 0.012, -0.3]),
  ['pop', T.b2, 587.33, 0.035, 0.3], ['pop', T.b2 + 0.1, 523.25, 0.014, 0.3],
  ['pluck', T.sweat + 0.2, 1567.98, 0.02, 0.3, -0.3], ['pluck', T.sweat + 0.55, 1567.98, 0.02, 0.3, 0.3],
  ['whoosh', T.tumble[0], 1.0, 0.035], ...[0, 1, 2, 3].map(i => ['tick', +(T.tumble[0] + 0.1 + i * 0.27).toFixed(3), 0.045]),
  ['pop', T.bubOut[0], 440, 0.02, 0],
  // the talk card
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1046.5, 0.045, 0], ['pop', T.h1Land + 0.1, 1174.66, 0.035, 0],
  ['whoosh', T.card[0], 0.4, 0.03], ['whoosh', T.flip[0], 0.35, 0.03], ['bell', T.flip[1], 1567.98, 0.035, 1.4, 0], ['glitter', T.flip[1] - 0.05, T.flip[1] + 0.5],
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['glitter', T.l2 + 0.6, T.l2 + 1.0], ['whoosh', T.settle[0], 0.4, 0.025], ['tick', T.settle[1], 0.05],
  // the debate
  ...T.deb.flatMap((t0, i) => [['pop', t0, i % 2 ? 783.99 : 880, 0.04, i % 2 ? 0.3 : -0.3], ...[0, 1, 2, 3].map(j => ['pop', +(t0 + 0.07 + j * 0.065).toFixed(3), (i % 2 ? 587.33 : 659.25) * (1 + 0.06 * (j % 2)), 0.013, i % 2 ? 0.3 : -0.3])]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h2, 5, 0.08, 1, 0.028), ['pluck', T.h2 + 0.08, 1046.5, 0.045, 0.7, 0], ['bell', T.h2 + 0.4, 1318.51, 0.025, 1.0, 0],
  ['pop', 9.3, 783.99, 0.02, 0.3], ['pop', 9.6, 880, 0.02, -0.3], ['pop', 9.9, 783.99, 0.02, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
