// sr02aligned (20 s vertical Align ad, Star Talk Remix of teaser 02 "The stars aligned") · story 0–15.6, then the end card.
//   0.00–5.15  "Ever tried getting | stars to *line up?*"  Seven little chakra-coloured stars bounce around the sky
//              (violet is asleep). Drop (2.82): THE STARS: "ok everyone. single file. *please.*" They proudly snap into
//              a neat… horizontal row.
//   5.20–10.40 "*Up*, not across."  They swing into a column, in the wrong order, and violet is still dozing off to the
//              side. THE STARS: "violet. wake up. you're on *top.*" Violet jolts awake and zooms into the top slot, then
//              the rest shuffle into rainbow order, red at the root, violet at the crown.
//   10.45 cut → "The stars *aligned.*"  The column locks: a flash, light rays, everyone sparkle-eyed. The column parts and
//              a veiled mystery card rises in the light; heart-eyes. Then "When it's right, | the stars *line up.*"
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + rays + stars + card), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', VIOLET = '#b45cff'
const BEAT = n => 0.6 + n * 0.5556
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']     // root → crown
const V = 6                                                                                    // violet, the sleeper

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.95, 5.12], in: 0.3,
  open: 2.66, l1: BEAT(4) + 0.02,                    // the drop: 2.82
  row: 4.15, h1: 5.2, h1Land: 5.55, col: 5.6,
  l2: 6.45, wake: 7.35, zoom: [7.6, 7.95], sort: [8.4, 9.15], happy: 9.3,
  close: 10.2, h1Out: [10.2, 10.38],
  cut: 10.45,
  h2: 10.55, h2Land: 10.95, lock: 11.0, part: [11.75, 12.25], card: 11.85, h2Out: [12.85, 13.05],
  h3: 13.1, h3Land: 13.55, out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'ok everyone. single file. *please.*' },
  { t: T.l2, speaker: SPEAK, text: "violet. wake up. you're on *top.*", color: VIOLET },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── layout
const SIZE = 118
const COL_X = 540, slotY = k => 1300 - k * 96                       // slot 0 (root) at the bottom … slot 6 (crown) on top
const SCATTER = [[250, 1230], [820, 820], [430, 760], [700, 1150], [180, 900], [920, 1260], [860, 600]]
const ROW_ORDER = [3, 0, 5, 2, 6, 1, 4]                             // who stands where in the (wrong) row, left → right
const SCRAMBLE = [2, 4, 0, 5, 1, 3]                                  // column slot for stars 0–5 before the sort
const DOZE = { x: 870, y: 760 }
const SIDES = [[175, 1280], [135, 1080], [150, 880], [200, 690], [905, 790], [935, 1010], [900, 1230]]
const CARD = { x: 540, y: 990, h: 640 }

function starPos(i, t) {
  // scatter, wandering
  let px = SCATTER[i][0] + Math.sin(t * 1.3 + i * 1.9) * 40, py = SCATTER[i][1] + Math.cos(t * 1.1 + i * 2.7) * 30
  if (i === V) { px = SCATTER[i][0] + Math.sin(t * 0.6) * 10; py = SCATTER[i][1] + Math.sin(t * 0.9) * 8 }
  // the (wrong) horizontal row
  const r = ease.inOutCubic(prog(t, T.row + i * 0.05, T.row + 0.35 + i * 0.05))
  const rx = 120 + ROW_ORDER.indexOf(i) * 140, ry = 1000
  px = lerp(px, rx, r); py = lerp(py, ry, r) - Math.sin(Math.PI * r) * 60
  // swing into the column (scrambled); violet drifts off to doze
  const c = ease.inOutCubic(prog(t, T.col + i * 0.05, T.col + 0.45 + i * 0.05))
  const cx = i === V ? DOZE.x : COL_X, cy = i === V ? DOZE.y : slotY(SCRAMBLE[i])
  px = lerp(px, cx, c); py = lerp(py, cy, c)
  if (i === V) {
    const z = ease.inOutCubic(prog(t, ...T.zoom))
    px = lerp(px, COL_X, z); py = lerp(py, slotY(6), z) - Math.sin(Math.PI * z) * 80
  } else {
    const s = ease.inOutCubic(prog(t, T.sort[0] + i * 0.04, T.sort[1] - (5 - i) * 0.04))
    px += Math.sin(Math.PI * s) * (SCRAMBLE[i] > i ? -150 : SCRAMBLE[i] < i ? 150 : 0); py = lerp(py, slotY(i), s)
  }
  // part around the card
  const pt = ease.inOutCubic(prog(t, T.part[0] + Math.abs(3 - i) * 0.03, T.part[1] + Math.abs(3 - i) * 0.03))
  px = lerp(px, SIDES[i][0], pt); py = lerp(py, SIDES[i][1], pt)
  return { x: px, y: py }
}
function state(i, t) {
  if (t < T.row) {
    if (i === V) return { mood: 'sleepy' }
    return { mood: i % 3 === 0 ? 'happy' : 'neutral' }
  }
  if (t < T.col) return i === V ? { mood: 'sleepy' } : { mood: 'happy' }
  if (i === V) {
    if (t < T.wake) return { mood: 'sleepy' }
    if (t < T.sort[0]) return { mood: 'wide', look: [-1, 0], blink: false }
  } else if (t < T.wake) return { mood: 'neutral', look: [1, -1] }        // everyone stares at the sleeper
  else if (t < T.sort[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.happy) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.lock) return { mood: 'happy' }
  if (t < T.card + 0.3) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.h3) return { mood: 'heart', look: [i <= 3 ? 1 : -1, 0] }
  return { mood: 'happy' }
}
const HOPS = CHAKRAS.map((_, i) => [T.in + 0.3 + i * 0.08, ...(i === 1 ? [1.5, 2.1, 2.7, 3.3] : []), i === V ? T.wake : T.row + 0.4 + i * 0.05, T.lock + i * 0.04, T.h3Land + i * 0.1, T.h3Land + 0.6 + i * 0.1])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const imCard = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-3.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Ever tried getting | stars to *line up?*', { top: 230, size: 96, accentSize: 140, at: T.h0, gap: 0.07, wobble: true, late: 2, lateAt: T.h0 + 0.6 })
  const H1 = popText(root, '*Up,* not across.', { top: 260, size: 120, accentSize: 180, at: T.h1, gap: 0.08, wobble: true, late: 0, accentColor: PINK })
  const H2 = popText(root, 'The stars | *aligned.*', { top: 210, size: 120, accentSize: 190, at: T.h2, gap: 0.08, wobble: true, late: 1, lateAt: T.h2Land })
  const H3 = popText(root, 'When it’s right, | the stars *line up.*', { top: 230, size: 96, accentSize: 140, at: T.h3, gap: 0.07, wobble: true, late: 2, lateAt: T.h3Land })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, VIOLET]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + seed; drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 30 * (1 - 0.4 * p), 1, cols[i % cols.length]) }
    x.restore()
  }

  function rays(t) {
    const k = prog(t, T.lock, T.lock + 0.5), ok = popOut(t, T.out)
    if (k <= 0 || ok <= 0) return
    const cy = 1010, a = (0.25 + 0.75 * (1 - prog(t, T.lock + 0.3, T.lock + 1.2))) * ok
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 24; i++) {
      const ang = i / 24 * Math.PI * 2 + t * 0.08, len = 1300 * ease.outCubic(k), wd = 0.025 + 0.015 * (i % 3)
      const g = x.createRadialGradient(COL_X, cy, 0, COL_X, cy, len)
      g.addColorStop(0, `rgba(255,240,205,${0.32 * a})`); g.addColorStop(1, 'rgba(255,240,205,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(COL_X, cy); x.arc(COL_X, cy, len, ang - wd, ang + wd); x.closePath(); x.fill()
    }
    const fk = prog(t, T.lock, T.lock + 0.45)
    if (fk < 1) { const g = x.createRadialGradient(COL_X, cy, 0, COL_X, cy, 600); g.addColorStop(0, `rgba(255,248,225,${0.7 * (1 - fk)})`); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 300, 1080, 1500) }
    x.restore()
    // the column's light beam (until it parts)
    const bk = ease.outCubic(k) * (1 - prog(t, T.part[0], T.part[0] + 0.3))
    if (bk > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(COL_X - 60, 0, COL_X + 60, 0); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(0.5, `rgba(255,240,200,${0.35 * bk})`); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.fillRect(COL_X - 60, 560, 120, 900); x.restore() }
  }

  function drawCard(t) {
    const p = ease.outCubic(prog(t, T.card, T.card + 0.7)), ok = popOut(t, T.out)
    if (!imCard || p <= 0 || ok <= 0) return
    const h = CARD.h * lerp(0.7, 1, p) * ok, w = h * 1496 / 2238
    const cy = CARD.y + (1 - p) * 220 + Math.sin(t * 1.4) * 8
    x.save(); x.globalAlpha = p; x.translate(CARD.x, cy); x.rotate(0.03 * Math.sin(t * 1.1))
    x.drawImage(imCard, -w / 2, -h / 2, w, h)
    // a slow shine across the face
    const sk = prog(t, T.card + 0.4, T.card + 1.3)
    if (sk > 0 && sk < 1) { x.globalCompositeOperation = 'lighter'; const gx0 = lerp(-w, w, sk); const g = x.createLinearGradient(gx0 - 70, -h / 2, gx0 + 70, h / 2); g.addColorStop(0, 'rgba(255,230,180,0)'); g.addColorStop(0.5, `rgba(255,240,210,${0.5 * Math.sin(Math.PI * sk)})`); g.addColorStop(1, 'rgba(255,230,180,0)'); x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2 + 20, -h / 2 + 20, w - 40, h - 40, 30); x.fill() }
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // the order guide: faint slot ticks while they sort
    const gk = prog(t, T.col, T.col + 0.4) * (1 - prog(t, T.lock, T.lock + 0.3))
    if (gk > 0) { x.save(); x.globalAlpha = 0.25 * gk; x.fillStyle = BONE; for (let k = 0; k < 7; k++) x.fillRect(COL_X - 90, slotY(k) + 52, 180, 4); x.restore() }
    CHAKRAS.forEach((col, i) => {
      const p = starPos(i, t)
      const pp = pop01(t, T.in + i * 0.08, 0.36, 2.1) * ok
      const jolt = i === V && t >= T.wake && t < T.wake + 0.5 ? -0.25 * Math.exp(-(t - T.wake) * 7) * Math.cos((t - T.wake) * 24) : 0
      const lockSq = t >= T.lock && t < T.lock + 0.5 ? 0.12 * Math.exp(-(t - T.lock) * 8) * Math.cos((t - T.lock) * 26) : 0
      drawStarChar(x, p.x, p.y, SIZE, t, { color: col, ...state(i, t), hops: HOPS[i], pop: pp, squash: jolt + lockSq, seed: i * 3 + 1, glow: 1.1 })
    })
    // "!" over violet when it wakes
    const wk = prog(t, T.wake, T.wake + 0.6)
    if (wk > 0 && wk < 1) {
      const p = starPos(V, t)
      x.save(); x.globalAlpha = Math.sin(Math.PI * wk); x.fillStyle = GOLD
      for (const [i, j] of [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2], [0, 4], [1, 4]]) x.fillRect(p.x - 8 + i * 8, p.y - 120 - 20 * wk + j * 8, 8, 8)
      x.restore()
    }
    if (t > T.lock && t < T.lock + 0.75) sparkles(t, COL_X, 1010, T.lock, 14, 380, 0.2, CHAKRAS)
    if (t > T.zoom[1] && t < T.zoom[1] + 0.7) sparkles(t, COL_X, slotY(6), T.zoom[1], 8, 90, 1)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        rays(t)
        drawCard(t)
        drawStars(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut: 10.45 (box shut → "The stars aligned."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 622.25, 698.46, 783.99, 830.61, 932.33, 1046.5]
const wordPops = (t0, n, gap, b = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(b + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.07, 0, 0.024), ['pop', T.h0 + 0.6, 1046.5, 0.045, 0], ['pop', T.h0 + 0.7, 1174.66, 0.04, 0],
  ...CHAKRAS.map((_, i) => ['pop', +(T.in + i * 0.08 + 0.05).toFixed(3), NOTE[i], 0.03, (i - 3) * 0.12]),
  ['tick', 1.5, 0.03], ['tick', 2.1, 0.03], ['tick', 2.7, 0.03],
  ['pop', T.open, 698.46, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...CHAKRAS.map((_, i) => ['tick', +(T.row + 0.35 + i * 0.05).toFixed(3), 0.04]), ['pluck', T.row + 0.7, 1046.5, 0.035, 0.5, 0],
  // up, not across
  ...wordPops(T.h1, 3, 0.08, 2, 0.026),
  ['whoosh', T.col, 0.5, 0.04], ...CHAKRAS.slice(0, 6).map((_, i) => ['tick', +(T.col + 0.45 + i * 0.05).toFixed(3), 0.035]),
  ['boom', T.wake, 0.1], ['pop', T.wake, 1396.91, 0.045, 0.3], ['whoosh', T.zoom[0], 0.35, 0.05], ['pluck', T.zoom[1], 1567.98, 0.04, 0.6, 0],
  ['whoosh', T.sort[0], 0.6, 0.04], ...CHAKRAS.slice(0, 6).map((_, i) => ['pop', +(T.sort[0] + 0.45 + i * 0.05).toFixed(3), NOTE[i], 0.022, 0]),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 523.25, 0.03, 0],
  // the lock + the card
  ...wordPops(T.h2, 2, 0.08, 1, 0.026), ['pop', T.h2Land, 1046.5, 0.045, 0],
  ['boom', T.lock, 0.24], ['bell', T.lock, 523.25, 0.06, 2.6, -0.3], ['bell', T.lock + 0.05, 783.99, 0.05, 2.6, 0.3], ['bell', T.lock + 0.1, 1046.5, 0.04, 2.4, 0], ['glitter', T.lock, T.lock + 0.8],
  ['whoosh', T.part[0], 0.5, 0.04], ['riser', T.card - 0.3, T.card + 0.6, 0.04], ['glitter', T.card + 0.4, T.card + 1.3],
  ['pluck', T.card + 0.4, 1567.98, 0.035, 0.6, 0],
  // last line
  ...wordPops(T.h3, 4, 0.07, 2, 0.026), ['pop', T.h3Land, 1046.5, 0.05, 0], ['pluck', T.h3Land + 0.1, 1244.51, 0.045, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
