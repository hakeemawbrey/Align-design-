// stfire (25 s vertical Align ad, Star Talk batch 3) · story 0–20.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "The *fire signs* | group chat."  The ♈ Aries (Mars), ♌ Leo (Sun) and ♐ Sagittarius (Jupiter) stars pop in
//              around a small pixel campfire. Everyone is hyped.
//   2.82       the drop: the box opens. Each line makes the fire bigger:
//              ARIES: "i texted first. obviously."  → the fire grows
//              LEO: "i texted first AND sent a selfie."  → a selfie flash, bigger
//              SAG: "i'm booking us a trip to Peru."  → a pixel plane zips over, a bonfire
//   8.5        "All *fire.* | Zero *chill.*"
//   11.5       THE STARS: "…did anyone ask how *they're* doing?"  → all three go wide-eyed; the fire shrinks to a candle.
//   14.85      card cut (flip) · "Passion | *listens,* too."  A soft bone star ("them") floats in above the candle and talks
//              (a "• • •" bubble); the three fire stars look up, nod, and go heart-eyed. Everything pops out by 20.45.
//   20.45→     plain sky; the end card takes over at 20.6.
// One canvas (sky + fire + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, noise1 } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, glow, typingBubble, at, wordT, checkLines, NOTE, wordPops } from './kit.js'

export const DURATION = 25
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const ARI = signStar('aries'), LEO = signStar('leo'), SAG = signStar('sagittarius')
const ARI_TAG = `${ARI.glyph} ARIES STAR`, LEO_TAG = `${LEO.glyph} LEO STAR`, SAG_TAG = `${SAG.glyph} SAG STAR`, SKY_TAG = 'THE STARS'
const FIRE = ELEMENT_COLOR.fire

const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [8.2, 8.4],
  ariIn: 0.45, leoIn: 0.7, sagIn: 0.95, fireIn: 0.3,
  open: 2.6, l1: BEAT(4) + 0.02, l2: 5.75, l3: 8.75,
  h1: 8.5, h1Land: 8.92, h1Out: [14.4, 14.6],
  l4: 11.6, gasp: 12.95, shrink: [13.05, 13.75], candle: 13.4, close: 14.62,
  cut: 14.85,
  h2: 14.95, h2Land: 15.4, themIn: 15.55, talk: [16.0, 17.4], nods: [16.2, 17.3], hearts: 17.65,
  out: [20.05, 20.42], h2Out: [20.1, 20.36],
}
const CPS = 30
const LINES = [
  { t: T.l1, speaker: ARI_TAG, color: ARI.color, text: 'i texted first. *obviously.*' },
  { t: T.l2, speaker: LEO_TAG, color: LEO.color, text: 'i texted first AND sent a *selfie.*' },
  { t: T.l3, speaker: SAG_TAG, color: '#c49bff', text: "i'm booking us a trip to *Peru.*" },
  { t: T.l4, speaker: SKY_TAG, text: "…did anyone ask how *they're* doing?" },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_SELFIE = wordT(LT, LINES, 1, 'selfie'), T_PERU = wordT(LT, LINES, 2, 'Peru'), T_THEY = wordT(LT, LINES, 3, 'they')

// fire size (cells tall) per beat: grows with every line, then shrinks to a candle flame
const FIRE_STEPS = [[0, 9], [T.l1 + 0.4, 15], [T.l2 + 0.5, 22], [T_SELFIE + 0.1, 26], [T.l3 + 0.5, 31], [T_PERU + 0.1, 38]]
function fireH(t) {
  let h = 0, prev = 0, tPrev = -1
  for (const [t0, v] of FIRE_STEPS) { if (t >= t0) { prev = h; h = v; tPrev = t0 } }
  const k = easeOutBack(prog(t, tPrev, tPrev + 0.4), 2.4)
  let H = tPrev < 0 ? h : lerp(prev, h, k)
  H *= pop01(t, T.fireIn, 0.4, 2)
  const s = ease.inOutCubic(prog(t, ...T.shrink))
  return { H: lerp(H, 5.5, s), wK: lerp(1, 0.28, s), candle: s }
}

// layout: the trio around the fire (beats 1–3); after the cut, "them" above the candle and the trio below
const FIRE_POS = { x: 540, y: 1335 }
const A1 = { x: 200, y: 1010, s: 250 }, L1p = { x: 540, y: 720, s: 270 }, S1 = { x: 880, y: 1010, s: 250 }
const A2 = { x: 205, y: 1360, s: 240 }, L2p = { x: 540, y: 1420, s: 250 }, S2 = { x: 875, y: 1360, s: 240 }
const THEM = { x: 540, y: 760, s: 210 }
const FIRE2 = { x: 540, y: 1150 }
const after = t => t >= T.cut

const ARI_HOPS = [T.ariIn + 0.3, ...talkHops(LINES, ARI_TAG, { cps: CPS }), T.gasp, T.hearts]
const LEO_HOPS = [T.leoIn + 0.3, ...talkHops(LINES, LEO_TAG, { cps: CPS }), T.gasp + 0.05, T.hearts + 0.08]
const SAG_HOPS = [T.sagIn + 0.3, ...talkHops(LINES, SAG_TAG, { cps: CPS }), T.gasp + 0.1, T.hearts + 0.16]
const THEM_HOPS = [T.themIn + 0.3, T.talk[0] + 0.1, T.talk[0] + 0.6, T.talk[0] + 1.1]

const ARI_ST = [
  [0, { mood: 'happy', look: [0, 0] }], [T.l1, { mood: 'squint', look: [0, 0], blink: false }], [T.l1 + 0.9, { mood: 'happy' }],
  [T.l2, { mood: 'squint', look: [1, -1] }], [T_SELFIE + 0.1, { mood: 'wide', look: [1, -1], blink: false }], [T.l2 + 1.6, { mood: 'eyeroll' }],
  [T.l3, { mood: 'neutral', look: [1, 0] }], [T_PERU + 0.1, { mood: 'sparkle', look: [1, -1] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_THEY + 0.15, { mood: 'wide', look: [0, 0], blink: false }], [T.shrink[1] + 0.5, { mood: 'neutral', look: [1, 0] }],
  [T.cut, { mood: 'neutral', look: [1, -1] }], [T.talk[0] + 0.2, { mood: 'sparkle', look: [1, -1] }], [T.hearts, { mood: 'heart' }],
]
const LEO_ST = [
  [0, { mood: 'sparkle', look: [0, 0] }], [T.l1, { mood: 'eyeroll' }], [T.l1 + 1.4, { mood: 'squint', look: [-1, 0] }],
  [T.l2, { mood: 'happy' }], [T_SELFIE, { mood: 'wink', look: [0, 0] }], [T.l2 + 1.7, { mood: 'heart' }],
  [T.l3, { mood: 'wide', look: [1, 0], blink: false }], [T_PERU + 0.3, { mood: 'squint', look: [1, 0] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_THEY + 0.15, { mood: 'wide', look: [0, 0], blink: false }], [T.shrink[1] + 0.5, { mood: 'neutral', look: [0, 1] }],
  [T.cut, { mood: 'neutral', look: [0, -1] }], [T.talk[0] + 0.3, { mood: 'sparkle', look: [0, -1] }], [T.hearts + 0.08, { mood: 'heart' }],
]
const SAG_ST = [
  [0, { mood: 'happy', look: [0, 0] }], [T.l1, { mood: 'neutral', look: [-1, 0] }],
  [T.l2, { mood: 'neutral', look: [-1, -1] }], [T_SELFIE + 0.1, { mood: 'eyeroll' }],
  [T.l3, { mood: 'sparkle', look: [0, -1] }], [T_PERU, { mood: 'happy' }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_THEY + 0.15, { mood: 'wide', look: [0, 0], blink: false }], [T.shrink[1] + 0.5, { mood: 'neutral', look: [-1, 0] }],
  [T.cut, { mood: 'neutral', look: [-1, -1] }], [T.talk[0] + 0.4, { mood: 'sparkle', look: [-1, -1] }], [T.hearts + 0.16, { mood: 'heart' }],
]
const THEM_ST = [[0, { mood: 'neutral', look: [0, 1] }], [T.talk[0], { mood: 'happy' }], [T.talk[1], { mood: 'happy', blush: 1 }]]

// pixel bits
const LOGS = ['dd.......dd', 'DDdd...ddDD', '..DDdddDD..', '...ddDDd...', '..ddDDDdd..', 'DDdd...ddDD', 'dd.......dd']
const LOG_C = { d: '#8a4b2a', D: '#5c2e1a' }
const CANDLE = ['.WWWW.', 'WWWWWW', 'WwwwwW', 'WwwwwW', 'WwwwwW', 'WwwwwW', 'WwwwwW', 'WwwwwW', 'WwwwwW', 'ssssss', 'SSSSSS']
const CANDLE_C = { W: '#fff3e0', w: '#f0dcc0', s: '#c98a1f', S: '#8a5a1a' }
const PLANE = ['......XX....', '.....XXX....', 'X...XXXX....', 'XXXXXXXXXXXo', 'X...XXXX....', '.....XXX....', '......XX....']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The *fire signs* | group chat.', { top: 190, size: 104, accentSize: 140, at: T.h0, times: [T.h0, T.h0Land, T.h0Land + 0.12, T.h0Land + 0.4, T.h0Land + 0.48], wobble: true, accentColor: FIRE })
  const H1 = popText(root, 'All *fire.* | Zero *chill.*', { top: 196, size: 112, accentSize: 150, at: T.h1, times: [T.h1, T.h1Land, T.h1 + 0.6, T.h1Land + 0.6], wobble: true, colors: { 1: FIRE, 3: '#8fd8f6' } })
  const H2 = popText(root, 'Passion | *listens,* too.', { top: 200, size: 124, accentSize: 176, at: T.h2, times: [T.h2, T.h2Land, T.h2Land + 0.32], wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the pixel fire: columns of cells with a noisy flame profile (cell 10 px)
  function drawFire(t, cx, by, k) {
    const { H, wK, candle } = fireH(t)
    if (H <= 0.2 || k <= 0) return
    const c = 10, Wc = Math.max(5, Math.round((8 + H * 0.55) * wK))
    const half = Wc / 2
    glow(x, cx, by - H * c * 0.45, (40 + H * c * 0.9) * k, '#ff8a3a', 0.8 * k)
    x.save(); x.globalAlpha *= k
    // logs / candle
    if (candle < 0.5) drawBits(x, LOGS, LOG_C, cx, by + 20, 10, { alpha: 1 - candle * 2 })
    if (candle > 0) drawBits(x, CANDLE, CANDLE_C, cx, by + 40, 12, { sc: easeOutBack(prog(t, T.candle, T.candle + 0.35), 2.2) })
    const baseY = candle > 0.5 ? by - 26 : by
    for (let i = 0; i < Wc; i++) {
      const u = (i + 0.5 - half) / half
      const prof = Math.pow(Math.max(0, 1 - u * u), 0.8)
      const n = noise1(t * 7 + i * 0.9, 3) * 0.5 + noise1(t * 13 + i * 2.1, 7) * 0.3
      const hc = Math.round(H * prof * (0.62 + n))
      for (let j = 0; j < hc; j++) {
        const v = j / Math.max(1, hc), core = Math.abs(u) < 0.45 && v < 0.55
        x.fillStyle = core && v < 0.3 ? '#fff6c8' : core ? '#ffd24a' : v < 0.55 ? '#ffa834' : v < 0.82 ? '#ff6a2a' : '#d9302a'
        x.fillRect(Math.round(cx + (i - half) * c), Math.round(baseY - (j + 1) * c), c, c)
      }
    }
    // embers drifting up
    const nE = Math.round(H * 0.4 * (1 - candle))
    for (let e = 0; e < nE; e++) {
      const ph = (t * (0.6 + (e % 4) * 0.15) + e * 0.173) % 1
      const ex = cx + Math.sin(e * 12.9898 + t * 1.3) * half * c * 0.8, ey = baseY - H * c * (0.5 + ph * 0.9)
      x.globalAlpha = k * Math.sin(Math.PI * ph)
      x.fillStyle = e % 3 ? '#ffb347' : '#fff1c8'; x.fillRect(Math.round(ex), Math.round(ey), 6, 6)
    }
    x.restore()
  }

  function drawPlane(t) {
    const p = prog(t, T_PERU + 0.05, T_PERU + 1.35)
    if (p <= 0 || p >= 1) return
    const px = lerp(1180, -160, ease.inOutQuad(p)), py = lerp(565, 525, p) + Math.sin(p * 9) * 10
    // contrail
    x.save(); x.globalAlpha = 0.5 * (1 - p)
    for (let k = 1; k < 14; k++) { x.fillStyle = BONE; x.fillRect(Math.round(px + 40 + k * 22), Math.round(py + Math.sin((p - k * 0.012) * 9) * 14), 10, 6) }
    x.restore()
    drawBits(x, PLANE.map(r => [...r].reverse().join('')), { X: '#fff3e0', o: '#ff8fb1' }, px, py, 7, { rot: -0.08 })
  }

  function flash(t, t0, cx, cy) {
    const d = t - t0
    if (d < 0 || d > 0.5) return
    const a = d < 0.06 ? 1 : Math.exp(-(d - 0.06) * 9)
    glow(x, cx, cy, 420, '#ffffff', a * 1.2)
    x.save(); x.globalAlpha = a * 0.25; x.fillStyle = '#ffffff'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }

  function floatHearts(t, cx, cy, t0, seed) {
    for (let i = 0; i < 7; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + side * 220 + Math.sin(p * 7 + i) * 16, cy - 40 - p * 240, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const two = after(t)
    const fp = two ? FIRE2 : FIRE_POS
    // a little shake on every grow step (before the candle)
    drawFire(t, fp.x, fp.y, o)
    const gaspSq = t > T.gasp && t < T.gasp + 0.6 ? -0.12 * Math.exp(-(t - T.gasp) * 7) * Math.cos((t - T.gasp) * 20) : 0
    const nod = t >= T.nods[0] && t < T.nods[1] ? 0.06 * Math.max(0, Math.sin((t - T.nods[0]) * Math.PI / 0.28)) : 0
    const cast = [
      { P: two ? A2 : A1, c: ARI, st: ARI_ST, hops: ARI_HOPS, tin: T.ariIn, seed: 3 },
      { P: two ? L2p : L1p, c: LEO, st: LEO_ST, hops: LEO_HOPS, tin: T.leoIn, seed: 5 },
      { P: two ? S2 : S1, c: SAG, st: SAG_ST, hops: SAG_HOPS, tin: T.sagIn, seed: 8 },
    ]
    const res = []
    for (const m of cast) {
      const pk = pop01(t, m.tin, 0.36, 2.2) * o
      if (pk <= 0.01) { res.push(null); continue }
      // hotter = brighter glow while the fire is big
      const heat = clamp((fireH(t).H - 9) / 29)
      res.push(drawStarChar(x, m.P.x, m.P.y, m.P.s, t, { color: m.c.color, glyph: m.c.glyph, ...at(t, m.st), hops: m.hops, seed: m.seed, pop: pk, glow: 1 + heat * 0.4, squash: gaspSq + nod }))
    }
    // "them": the person they're texting
    if (two) {
      const tp = pop01(t, T.themIn, 0.4, 2) * o
      if (tp > 0.01) {
        const r = drawStarChar(x, THEM.x, THEM.y, THEM.s, t, { color: STAR.bone, ...at(t, THEM_ST), hops: THEM_HOPS, seed: 11, pop: tp, glow: 0.9 })
        typingBubble(x, t, THEM.x + 150, r.top + 30, T.talk, '#b8a8e0')
        if (t > T.hearts) floatHearts(t, THEM.x, THEM.y + 520, T.hearts, 3)
      }
      sparkles(x, t, THEM.x, THEM.y, T.themIn + 0.3, { n: 10, R: 160, size: 22, seed: 2, cols: [BONE, GOLD, PINK] })
      sparkles(x, t, 540, 1150, T.hearts, { n: 14, R: 330, size: 26, seed: 5, cols: [PINK, GOLD, BONE, FIRE] })
    }
    // gags: Leo's selfie flash, Sag's plane to Peru
    if (!two && res[1]) flash(t, T_SELFIE + 0.12, res[1].x, res[1].y)
    drawPlane(t)
    // grow-step sparks
    for (const [t0] of FIRE_STEPS.slice(1)) sparkles(x, t, fp.x, fp.y - 140, t0, { n: 8, R: 110, size: 20, seed: t0, dur: 0.5, cols: ['#ffd24a', '#ff6a2a', BONE] })
    sparkles(x, t, fp.x, fp.y - 40, T.candle + 0.3, { n: 8, R: 80, size: 18, seed: 9, cols: [BONE, GOLD] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const heat = clamp((fireH(t).H - 9) / 29) * (t < T.shrink[1] ? 1 : 0)
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      // the sky warms up as the fire grows
      if (heat > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createLinearGradient(0, 1920, 0, 600); g.addColorStop(0, `rgba(255,96,40,${0.22 * heat})`); g.addColorStop(1, 'rgba(255,96,40,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); x.restore() }
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 14.85 (box shut, H1 gone → the candle beat). End card flips at 20.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const PITCH = { [ARI_TAG]: 987.77, [LEO_TAG]: 739.99, [SAG_TAG]: 1174.66, [SKY_TAG]: 880 }
export const CUES = [
  // hook
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Land, 1174.66, 0.045, -0.1], ['pop', T.h0Land + 0.12, 1318.51, 0.045, 0.1], ...wordPops(T.h0Land + 0.4, 2, 0.08, 2, 0.026),
  ['whoosh', T.fireIn, 0.4, 0.03], ['boom', T.fireIn + 0.15, 0.08],
  ['pop', T.ariIn + 0.05, 987.77, 0.04, -0.5], ['pop', T.leoIn + 0.05, 739.99, 0.04, 0], ['pop', T.sagIn + 0.05, 1174.66, 0.04, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  // the fire grows with every line
  ...FIRE_STEPS.slice(1).map(([t0], i) => ['whoosh', +t0.toFixed(3), 0.3, 0.02 + i * 0.006]),
  ...FIRE_STEPS.slice(1).map(([t0], i) => ['pluck', +t0.toFixed(3), NOTE[i % 7], 0.035, 0.4, 0]),
  ['tick', T_SELFIE + 0.12, 0.06], ['pop', T_SELFIE + 0.14, 1567.98, 0.04, 0], ['glitter', T_SELFIE + 0.12, T_SELFIE + 0.5],
  ['whoosh', T_PERU + 0.05, 1.1, 0.035], ['boom', T_PERU + 0.1, 0.1],
  ...wordPops(T.h1, 2, 0.1, 1, 0.028), ['pop', T.h1 + 0.6, 659.25, 0.03, 0], ['pop', T.h1Land + 0.6, 587.33, 0.045, 0],
  // "…did anyone ask"
  ['pop', T.gasp, 440, 0.035, 0], ['pop', T.gasp + 0.06, 392, 0.03, 0],
  ['whoosh', T.shrink[0], 0.6, 0.03], ['bell', T.candle + 0.3, 1318.51, 0.03, 1.2, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // passion listens, too
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['pop', T.h2Land + 0.32, 987.77, 0.035, 0],
  ['pop', T.themIn + 0.05, 659.25, 0.04, 0], ['glitter', T.themIn + 0.3, T.themIn + 0.7],
  ['tick', T.talk[0] + 0.1, 0.02], ['tick', T.talk[0] + 0.3, 0.02], ['tick', T.talk[0] + 0.5, 0.02], ['tick', T.talk[0] + 0.9, 0.02], ['tick', T.talk[0] + 1.1, 0.02],
  ['tick', T.nods[0] + 0.1, 0.02], ['tick', T.nods[0] + 0.4, 0.02],
  ['glitter', T.hearts, T.hearts + 0.6], ['bell', T.hearts + 0.05, 1760, 0.025, 1.0, 0], ['pluck', T.hearts, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
