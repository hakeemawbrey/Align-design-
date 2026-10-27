// stopposites (20 s vertical Align ad, Star Talk batch 3) · story 0–15.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "*Opposites* | attract."  The ♈ Aries star (cardinal fire, Mars) and the ♎ Libra star (cardinal air, Venus),
//              opposite signs, sit across a little pixel café table with two cups and a candle.
//   2.82       the drop: the box opens. ARIES: "let's go. *now.*" (bouncing, can't sit still)
//              LIBRA: "let's *think* about it." (thinking dots)
//   6.0        "*Mars* vs. *Venus.*"  Both squint; a pixel spark crackles between them.
//   7.9        the reading pops between them: PUSH / PULL / ALIGN rows light up one by one.
//              THE STARS: "your opposite shows you what you're *missing.*"  → the glare melts.
//   11.55      card cut (flip) · "Push. Pull. *Align.*"  Each word lights its row; the two cups slide in and clink;
//              heart-eyes. Everything pops out by 15.45.
//   15.45→     plain sky; the end card takes over at 15.6.
// One canvas (sky + table + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, glow, typingBubble, at, wordT, checkLines, NOTE, wordPops } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const ARI = signStar('aries'), LIB = signStar('libra')
const ARI_TAG = `${ARI.glyph} ARIES STAR`, LIB_TAG = `${LIB.glyph} LIBRA STAR`, SKY_TAG = 'THE STARS'

const T = {
  h0: 0.12, h0Land: 0.55, h0Out: [5.8, 5.98],
  tableIn: 0.3, ariIn: 0.5, libIn: 0.75,
  open: 2.6, l1: BEAT(4) + 0.02, l2: 5.05, think: [4.6, 5.1],
  h1: 6.05, h1Land: 6.45, glare: [6.45, 7.75], h1Out: [11.15, 11.35],
  rows: [7.85, 8.15, 8.45], l3: 8.05, melt: 9.9, close: 11.3,
  cut: 11.55,
  h2: [11.65, 12.05, 12.5], clink: 13.0, hearts: 13.2,
  out: [15.05, 15.42], h2Out: [15.1, 15.36],
}
const CPS = 30
const LINES = [
  { t: T.l1, speaker: ARI_TAG, color: ARI.color, text: "let's go. *now.*" },
  { t: T.l2, speaker: LIB_TAG, color: '#f08ae6', text: "let's *think* about it." },
  { t: T.l3, speaker: SKY_TAG, text: "your opposite shows you what you're *missing.*" },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_MISS = wordT(LT, LINES, 2, 'missing')

// layout
const ARIP = { x: 225, y: 960, s: 290 }, LIBP = { x: 855, y: 960, s: 290 }
const TABLE = { x: 540, y: 1270 }
const ROWS = [
  { label: 'PUSH', col: READING.push, y: 845 },
  { label: 'PULL', col: READING.pull, y: 940 },
  { label: 'ALIGN', col: READING.align, y: 1035 },
]
const after = t => t >= T.cut

const ARI_HOPS = [T.ariIn + 0.3, 1.6, 2.1, ...talkHops(LINES, ARI_TAG, { cps: CPS }), 3.9, 4.25, 4.6, T.rows[0] + 0.05, T.melt, T.h2[0], T.clink + 0.05]
const LIB_HOPS = [T.libIn + 0.3, ...talkHops(LINES, LIB_TAG, { cps: CPS }), T.rows[1] + 0.05, T.melt + 0.1, T.h2[1], T.clink + 0.1]

const ARI_ST = [
  [0, { mood: 'happy' }], [1.4, { mood: 'sparkle', look: [1, 0] }],
  [T.l1, { mood: 'sparkle', look: [0, 0] }], [T.l1 + 1.2, { mood: 'neutral', look: [1, 0] }],
  [T.l2 + 0.4, { mood: 'wide', look: [1, 0], blink: false }], [T.l2 + 1.0, { mood: 'eyeroll' }],
  [T.glare[0], { mood: 'squint', look: [1, 0], blink: false }],
  [T.rows[0], { mood: 'wide', look: [1, 0], blink: false }], [T.l3 + 0.6, { mood: 'neutral', look: [0, -1] }], [T_MISS, { mood: 'wide', look: [1, 0], blink: false }], [T.melt, { mood: 'sparkle', look: [1, 0] }],
  [T.cut, { mood: 'happy' }], [T.clink, { mood: 'heart' }],
]
const LIB_ST = [
  [0, { mood: 'neutral', look: [-1, 0] }], [1.4, { mood: 'neutral', look: [-1, 1] }],
  [T.l1, { mood: 'wide', look: [-1, 0], blink: false }], [T.l1 + 1.0, { mood: 'neutral', look: [0, -1] }],
  [T.l2, { mood: 'squint', look: [0, -1] }], [T.l2 + 1.0, { mood: 'happy' }],
  [T.glare[0], { mood: 'squint', look: [-1, 0], blink: false }],
  [T.rows[0], { mood: 'wide', look: [-1, 0], blink: false }], [T.l3 + 0.6, { mood: 'neutral', look: [0, -1] }], [T_MISS, { mood: 'wide', look: [-1, 0], blink: false }], [T.melt + 0.1, { mood: 'sparkle', look: [-1, 0] }],
  [T.cut, { mood: 'happy' }], [T.clink + 0.05, { mood: 'heart' }],
]

const CUP = ['.XXXXX..', 'XwwwwwXX', 'XwwwwwX.X', 'XwwwwwX.X', 'XwwwwwXX', '.XXXXX..']
const CANDLE = ['..f..', '.fFf.', '..F..', '.WWW.', '.WwW.', '.WwW.', 'sssss']
const BOLT = ['..XX', '.XX.', 'XXXX', '.XX.', 'XX..']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, '*Opposites* | attract.', { top: 200, size: 124, accentSize: 184, at: T.h0, times: [T.h0, T.h0Land], wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, '*Mars* vs. *Venus.*', { top: 250, size: 112, accentSize: 168, at: T.h1, times: [T.h1, T.h1 + 0.2, T.h1Land], wobble: true, colors: { 0: ARI.color, 2: '#f08ae6' } })
  const H2 = popText(root, 'Push. Pull. | *Align.*', { top: 200, size: 128, accentSize: 196, at: T.h2[0], times: T.h2, wobble: true, colors: { 0: READING.push, 1: READING.pull, 2: READING.align }, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawTable(t, o) {
    const pk = pop01(t, T.tableIn, 0.4, 1.8) * o
    if (pk <= 0.01) return
    x.save(); x.translate(TABLE.x, TABLE.y); x.scale(pk, pk)
    const c = 12
    // top + legs
    x.fillStyle = INK; x.fillRect(-25 * c, -c, 50 * c, 5 * c); x.fillRect(-3 * c, 3 * c, 6 * c, 12 * c); x.fillRect(-11 * c, 14 * c, 22 * c, 3 * c)
    x.fillStyle = '#b06a3b'; x.fillRect(-24 * c, 0, 48 * c, 3 * c); x.fillStyle = '#d98b52'; x.fillRect(-24 * c, 0, 48 * c, c)
    x.fillStyle = '#7a4526'; x.fillRect(-2 * c, 3 * c, 4 * c, 11 * c); x.fillRect(-10 * c, 15 * c, 20 * c, c)
    x.restore()
    // candle (centre) + cups that slide in to clink after the cut
    drawBits(x, CANDLE, { f: '#ffd24a', F: '#ff8a3a', W: '#fff3e0', w: '#f0dcc0', s: '#c98a1f' }, TABLE.x, TABLE.y - 58, 11, { sc: pk })
    glow(x, TABLE.x, TABLE.y - 95, 110, '#ffb347', 0.6 * pk)
    const cl = ease.inOutCubic(prog(t, T.clink - 0.35, T.clink))
    const bounce = t > T.clink ? Math.exp(-(t - T.clink) * 8) * Math.sin((t - T.clink) * 30) * 10 : 0
    const cupL = lerp(TABLE.x - 200, TABLE.x - 92, cl) - bounce, cupR = lerp(TABLE.x + 200, TABLE.x + 92, cl) + bounce
    const cupY = TABLE.y - 46 - cl * 50
    drawBits(x, CUP, { X: '#2a2350', w: ARI.color }, cupL, cupY, 12, { sc: pk, rot: cl * 0.25 })
    drawBits(x, CUP.map(r => [...r].reverse().join('')), { X: '#2a2350', w: '#f08ae6' }, cupR, cupY, 12, { sc: pk, rot: -cl * 0.25 })
  }
  function drawGlare(t) {
    if (t < T.glare[0] || t > T.glare[1]) return
    const k = Math.sin(Math.PI * prog(t, ...T.glare))
    // a crackling zig-zag between their eyes
    const y0 = ARIP.y + 20, xa = ARIP.x + 130, xb = LIBP.x - 130, N = 10
    x.save(); x.globalAlpha = clamp(k * 1.6)
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1), jit = ((Math.floor(t * 18) + i * 7) % 5 - 2) * 9
      const px = lerp(xa, xb, u), py = y0 + (i % 2 ? -16 : 16) + jit
      x.fillStyle = INK; x.fillRect(Math.round(px) - 14, Math.round(py) - 14, 28, 28)
      x.fillStyle = i % 2 ? '#fff1c8' : GOLD; x.fillRect(Math.round(px) - 9, Math.round(py) - 9, 18, 18)
    }
    drawBits(x, BOLT, { X: '#fff1c8' }, 540, y0 - 70 + Math.sin(t * 30) * 4, 10, { sc: k })
    x.restore()
  }
  function drawRows(t, o) {
    const fadeForCut = 1
    ROWS.forEach((R, i) => {
      const pk = pop01(t, T.rows[i], 0.32, 2.4) * o * fadeForCut
      if (pk <= 0.01) return
      // after the cut, each headline word re-lights its row
      const lit = after(t) ? clamp(1 - (t - T.h2[i]) * 1.2) * (t >= T.h2[i] ? 1 : 0) : clamp(1 - (t - T.rows[i] - 0.3) * 1.5)
      const w = 300, h = 74
      x.save(); x.translate(540, R.y); x.scale(pk * (1 + 0.08 * lit), pk * (1 + 0.08 * lit))
      glow(x, 0, 0, 220, R.col, 0.4 + 0.8 * lit)
      x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
      x.fillStyle = R.col; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2, -h / 2, w, 8)
      x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(R.label, 0, 3)
      x.restore()
    })
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + (((i * 37) % 9) / 8 - 0.5) * 220 + Math.sin(p * 7 + i) * 16, cy - p * 260, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    // after the cut the box is gone: the whole table scene settles lower, into the freed space
    x.save(); x.translate(0, after(t) ? 170 : 0)
    drawTable(t, o)
    drawRows(t, o)
    // Aries can't sit still in the hook; leans in during the glare
    const lean = Math.sin(Math.PI * prog(t, ...T.glare)) * 40
    const fidget = t < T.l2 ? Math.abs(Math.sin(t * 9)) * 6 : 0
    const close = 0
    const pa = pop01(t, T.ariIn, 0.36, 2.2) * o, pl = pop01(t, T.libIn, 0.36, 2.2) * o
    if (pa > 0.01) drawStarChar(x, ARIP.x + lean + close, ARIP.y - fidget, ARIP.s, t, { color: ARI.color, glyph: ARI.glyph, ...at(t, ARI_ST), hops: ARI_HOPS, seed: 3, pop: pa, squash: t < T.l2 ? Math.sin(t * 18) * 0.03 : 0 })
    if (pl > 0.01) drawStarChar(x, LIBP.x - lean - close, LIBP.y, LIBP.s, t, { color: LIB.color, glyph: LIB.glyph, ...at(t, LIB_ST), hops: LIB_HOPS, seed: 7, pop: pl, bob: LIBP.s * 0.02, squash: Math.sin(t * 2) * 0.02 })
    typingBubble(x, t, LIBP.x - 40, LIBP.y - 170, T.think, '#f08ae6')
    drawGlare(t)
    sparkles(x, t, 540, 1000, T.melt, { n: 12, R: 260, size: 24, seed: 2, cols: [READING.push, READING.pull, GOLD, BONE] })
    sparkles(x, t, TABLE.x, TABLE.y - 80, T.clink, { n: 10, R: 120, size: 22, seed: 4, cols: [GOLD, BONE, PINK] })
    if (t > T.hearts) { floatHearts(t, ARIP.x, ARIP.y - 60, T.hearts); floatHearts(t, LIBP.x, LIBP.y - 60, T.hearts + 0.1) }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 11.55 (box shut, H1 gone → "Push. Pull. Align."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const PITCH = { [ARI_TAG]: 1174.66, [LIB_TAG]: 739.99, [SKY_TAG]: 880 }
export const CUES = [
  ['pop', T.h0, 1174.66, 0.045, 0], ['pop', T.h0Land, 880, 0.04, 0],
  ['pop', T.tableIn + 0.2, 587.33, 0.04, 0], ['pop', T.ariIn + 0.05, 1174.66, 0.04, -0.5], ['pop', T.libIn + 0.05, 739.99, 0.04, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ['tick', T.think[0] + 0.1, 0.02], ['tick', T.think[0] + 0.3, 0.02],
  ['pop', T.h1, 987.77, 0.04, -0.3], ['pop', T.h1 + 0.2, 880, 0.03, 0], ['pop', T.h1Land, 739.99, 0.05, 0.3],
  ['riser', T.glare[0], T.glare[1] - 0.2, 0.02], ...[0, 1, 2, 3, 4].map(i => ['tick', +(T.glare[0] + 0.15 + i * 0.22).toFixed(3), 0.035]),
  ...T.rows.map((tr, i) => ['pluck', tr, [987.77, 1174.66, 1318.51][i], 0.045, 0.6, [-0.3, 0.3, 0][i]]),
  ['glitter', T.melt, T.melt + 0.6], ['bell', T.melt + 0.05, 1318.51, 0.03, 1.2, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...T.h2.map((th, i) => ['pop', th, [987.77, 1174.66, 1318.51][i], 0.05, 0]), ['pluck', T.h2[2], 1318.51, 0.05, 0.7, 0],
  ['bell', T.clink, 2093, 0.04, 1.0, 0], ['tick', T.clink, 0.05], ['glitter', T.hearts, T.hearts + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
