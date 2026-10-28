// st4rivals (15 s vertical Align ad, Star Talk season 4 · EP 066, "Texas, then where?") · story 0–10.6, then the end card.
//   0.00–3.55  "A Houston star and | an Austin star *match.*"  Two bone stars pop in on opposite sides, each under a pixel
//              map pin (HOUSTON, orange · AUSTIN, violet). A pixel heart stamps MATCH between them; Houston squints across.
//              Box (HOUSTON STAR): "Austin? really?"  → the heart wobbles, Austin rolls its eyes right back.
//   3.65–8.1  "The *reading* says…"  The heart shrinks away; a dotted line draws between them and their Push / Pull / Align
//              reading pops in the middle. THE STARS: "Push: you're different. Pull: you're curious. that's a *start.*"
//              PUSH lights on "Push", PULL on "Pull", ALIGN glows on "start". Both stars soften to sparkle eyes.
//              (Ghost: peeks out from behind the Austin star's right point, 6.5–7.7.)
//   8.2 cut → "Different cities. | *Same* sky."  The two stars, pins and all, scoot closer and look up: one big gold star
//              pops overhead and a constellation line joins both pins to it. Hearts. Everything pops out by 10.45.
// One canvas (sky + constellation + cast + props), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, MONO, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, glow, at, wordT, checkLines, wordPops } from './kit.js'

export const DURATION = 15
const EP = 66
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const HOU = '#f59c4a', AUS = '#b08cff'
const HOU_TAG = 'HOUSTON STAR', SKY_TAG = 'THE STARS'

const T = {
  h0: 0.12, h0Land: 0.7, h0Out: [3.4, 3.58],
  houIn: 0.3, ausIn: 0.5, pins: [0.75, 0.9], heart: 1.2,
  open: 1.58, l1: 1.75, roll: 2.6, heartOut: [3.5, 3.8],
  h1: 3.66, h1Land: 3.95, line: [3.75, 4.2], l2: 3.95, h1Out: [7.9, 8.08],
  close: 8.1,
  cut: 8.2,
  h2: 8.27, h2Land: 8.65, scoot: [8.2, 8.7], sky: 8.85, link: [9.0, 9.4], hearts: 9.5,
  out: [10.05, 10.45], h2Out: [10.18, 10.42],
  ghost: 6.45,
}
const CPS = 32
const LINES = [
  { t: T.l1, speaker: HOU_TAG, color: HOU, text: 'Austin? *really?*' },
  { t: T.l2, speaker: SKY_TAG, text: "Push: you're different. Pull: you're curious. that's a *start.*" },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_PUSH = wordT(LT, LINES, 1, 'Push'), T_PULL = wordT(LT, LINES, 1, 'Pull'), T_START = wordT(LT, LINES, 1, 'start')

// layout
const HP = { x: 225, y: 1060, s: 270 }, AP = { x: 855, y: 1060, s: 270 }
const HF = { x: 365, y: 1270, s: 300 }, AF = { x: 715, y: 1270, s: 300 }
const OVER = { x: 540, y: 720 }
const ROWS = [
  { label: 'PUSH', col: READING.push, y: 905, t: () => T_PUSH },
  { label: 'PULL', col: READING.pull, y: 1000, t: () => T_PULL },
  { label: 'ALIGN', col: READING.align, y: 1095, t: () => T_START },
]
const after = t => t >= T.cut

const HOU_HOPS = [T.houIn + 0.3, T.heart + 0.05, ...talkHops(LINES, HOU_TAG, { cps: CPS }), T_PUSH + 0.05, T_START + 0.1, T.h2Land, T.hearts]
const AUS_HOPS = [T.ausIn + 0.3, T.heart + 0.1, T.roll + 0.5, T_PULL + 0.05, T_START + 0.15, T.h2Land + 0.08, T.hearts + 0.1]

const HOU_ST = [
  [0, { mood: 'happy', look: [0, 0] }], [T.heart, { mood: 'heart' }], [T.heart + 0.5, { mood: 'squint', look: [1, 0], blink: false }],
  [T.l1, { mood: 'squint', look: [1, 0], blink: false }], [LT[0].done + 0.6, { mood: 'neutral', look: [1, 0] }],
  [T_PUSH, { mood: 'wide', look: [1, 0], blink: false }], [T_PULL, { mood: 'neutral', look: [1, -1] }], [T_START, { mood: 'sparkle', look: [1, 0] }],
  [T.cut, { mood: 'happy' }], [T.sky, { mood: 'sparkle', look: [1, -1] }], [T.hearts, { mood: 'heart' }],
]
const AUS_ST = [
  [0, { mood: 'happy', look: [0, 0] }], [T.heart, { mood: 'heart' }], [T.heart + 0.5, { mood: 'neutral', look: [-1, 0] }],
  [T.l1 + 0.3, { mood: 'wide', look: [-1, 0], blink: false }], [T.roll, { mood: 'eyeroll' }], [T.roll + 0.9, { mood: 'squint', look: [-1, 0] }],
  [T_PUSH, { mood: 'wide', look: [-1, 0], blink: false }], [T_PULL, { mood: 'neutral', look: [-1, -1] }], [T_START, { mood: 'sparkle', look: [-1, 0] }],
  [T.cut, { mood: 'happy' }], [T.sky, { mood: 'sparkle', look: [-1, -1] }], [T.hearts + 0.1, { mood: 'heart' }],
]

const PIN = ['..XXXXX..', '.XXXXXXX.', 'XXXwwwXXX', 'XXwwwwwXX', 'XXwwwwwXX', 'XXXwwwXXX', '.XXXXXXX.', '..XXXXX..', '...XXX...', '....X....']
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const SMALL_HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 30px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A Houston star and | an Austin star | *match.*', { top: 190, size: 88, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.07, accentColor: PINK, lineHeight: 1.02 })
  const H1 = popText(root, 'The *reading* | says…', { top: 230, size: 104, accentSize: 150, at: T.h1, times: [T.h1, T.h1Land, T.h1Land + 0.2], wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Different cities. | *Same* sky.', { top: 210, size: 104, accentSize: 170, at: T.h2, times: [T.h2, T.h2 + 0.12, T.h2Land, T.h2Land + 0.22], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // where the two stars stand (they scoot closer and lower on the cut)
  function place(t, A, B) {
    if (!after(t)) return A
    const e = ease.inOutCubic(prog(t, ...T.scoot))
    return { x: lerp(A.x, B.x, e), y: lerp(A.y, B.y, e) - Math.sin(Math.PI * e) * 60, s: lerp(A.s, B.s, e) }
  }

  // a pixel map pin over a star's head, with its city tag
  function drawPin(t, P, t0, col, label, o, seed) {
    const k = pop01(t, t0, 0.36, 2.2) * o
    if (k <= 0.01) return null
    const drop = (1 - ease.outCubic(prog(t, t0, t0 + 0.3))) * -120
    const bob = Math.sin(t * 2.3 + seed) * 5
    const px = P.x, py = P.y - P.s * 0.5 - 190 + drop + bob
    glow(x, px, py, 90, col, 0.35 * k)
    drawBits(x, PIN, { X: col, w: '#fff6e6' }, px, py, 9, { sc: k })
    // the tag
    x.save(); x.translate(px, py + 78); x.scale(k, k)
    x.font = `700 30px ${MONO}`; x.letterSpacing = '0.12em'
    const tw = x.measureText(label).width + 34
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-tw / 2 - 4, -26, tw + 8, 52)
    x.fillStyle = col; x.fillRect(-tw / 2, -22, tw, 44)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 4, 2)
    x.letterSpacing = '0px'
    x.restore()
    return { x: px, y: py - 40 }
  }

  // the MATCH heart between them (hook), wobbling at "really?"
  function drawMatch(t) {
    const k = pop01(t, T.heart, 0.34, 2.6) * (1 - ease.inCubic(prog(t, ...T.heartOut)))
    if (k <= 0.01 || t > T.heartOut[1]) return
    const wob = t > LT[0].chars[8] && t < LT[0].chars[8] + 0.8 ? Math.sin((t - LT[0].chars[8]) * 30) * 0.18 * (1 - prog(t, LT[0].chars[8], LT[0].chars[8] + 0.8)) : 0
    const beat = 1 + 0.06 * Math.max(0, Math.sin(t * 7))
    glow(x, 540, 960, 200, PINK, 0.6 * k)
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, 540, 960, 22, { sc: k * beat, rot: wob })
    x.save(); x.translate(540, 1095); x.scale(k, k); x.rotate(-0.05 + wob * 0.5)
    x.font = `700 40px ${MONO}`; x.letterSpacing = '0.16em'; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText('MATCH').width + 40
    x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-tw / 2 - 6, -36, tw + 12, 72)
    x.fillStyle = PINK; x.fillRect(-tw / 2, -30, tw, 60)
    x.fillStyle = INK; x.fillText('MATCH', 6, 3); x.letterSpacing = '0px'
    x.restore()
    sparkles(x, t, 540, 960, T.heart + 0.05, { n: 10, R: 170, size: 24, seed: 1, cols: [PINK, GOLD, BONE] })
  }

  // the reading: a dotted line between them, then the three rows lighting on their words
  function drawReading(t, o) {
    if (after(t)) return
    const lk = ease.outCubic(prog(t, ...T.line)) * o
    if (lk > 0.01) {
      const xa = HP.x + 120, xb = AP.x - 120, y = 1000
      x.save(); x.globalAlpha = 0.85 * o
      for (let px = xa; px < lerp(xa, xb, lk); px += 22) { x.fillStyle = INK; x.fillRect(px - 2, y - 7, 14, 14); x.fillStyle = GOLD; x.fillRect(px, y - 5, 10, 10) }
      x.restore()
    }
    ROWS.forEach((R, i) => {
      const t0 = R.t()
      const pk = pop01(t, t0 - 0.05, 0.32, 2.4) * o
      const ghost = clamp(prog(t, T.line[1] - 0.1, T.line[1] + 0.2)) * o
      const lit = t >= t0 ? clamp(1 - (t - t0 - 0.3) * 1.2) : 0
      const w = 250, h = 70
      x.save(); x.translate(540, R.y)
      if (pk <= 0.01) {
        // waiting slot (dim) until its word types
        if (ghost > 0.01) { x.globalAlpha = 0.5 * ghost; x.fillStyle = 'rgba(14,8,32,0.85)'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.strokeStyle = R.col; x.lineWidth = 3; x.setLineDash([10, 8]); x.strokeRect(-w / 2, -h / 2, w, h); x.setLineDash([]) }
        x.restore(); return
      }
      const s = pk * (1 + 0.08 * lit)
      x.scale(s, s)
      glow(x, 0, 0, 220, R.col, 0.35 + 0.8 * lit)
      x.fillStyle = 'rgba(14,8,32,0.92)'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
      x.fillStyle = R.col; x.fillRect(-w / 2, -h / 2, w, h)
      x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2, -h / 2, w, 8)
      x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(R.label, 0, 3)
      x.restore()
    })
    sparkles(x, t, 540, ROWS[2].y, T_START + 0.1, { n: 12, R: 200, size: 24, seed: 2, cols: [READING.align, READING.push, READING.pull, BONE] })
  }

  // the final beat: one big star overhead, a constellation line from both pins to it
  function drawSameSky(t, pinH, pinA, o) {
    if (!after(t)) return
    const k = pop01(t, T.sky, 0.4, 2.2) * o
    if (k <= 0.01) return
    const lk = ease.inOutCubic(prog(t, ...T.link)) * o
    if (lk > 0.01 && pinH && pinA) {
      x.save(); x.globalAlpha = 0.8 * o; x.strokeStyle = BONE; x.lineWidth = 4; x.setLineDash([4, 12]); x.lineCap = 'round'
      for (const p of [pinH, pinA]) { x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(lerp(p.x, OVER.x, lk), lerp(p.y, OVER.y, lk)); x.stroke() }
      x.setLineDash([]); x.restore()
    }
    const tw = 1 + 0.08 * Math.sin(t * 5)
    glow(x, OVER.x, OVER.y, 260, GOLD, 0.8 * k)
    drawPixelStar(x, OVER.x, OVER.y, 120 * k * tw, Math.floor(t * 6) % 3, GOLD, '#fff6e6')
    sparkles(x, t, OVER.x, OVER.y, T.sky + 0.05, { n: 12, R: 160, size: 26, seed: 3, cols: [GOLD, BONE, HOU, AUS] })
  }

  function floatHearts(t, cx, cy, t0, o) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.16, p = (t - born) / 1.2
      if (p < 0 || p >= 1) continue
      drawBits(x, SMALL_HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + (((i * 5) % 8) / 7 - 0.5) * 260 + Math.sin(p * 7 + i) * 16, cy - p * 240, 7, { alpha: Math.sin(Math.PI * p) * o })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const H = place(t, HP, HF), A = place(t, AP, AF)
    const ph = pop01(t, T.houIn, 0.36, 2.2) * o, pa = pop01(t, T.ausIn, 0.36, 2.2) * o
    const pinH = drawPin(t, H, T.pins[0], HOU, 'HOUSTON', o, 0)
    const pinA = drawPin(t, A, T.pins[1], AUS, 'AUSTIN', o, 2)
    drawSameSky(t, pinH, pinA, o)
    drawMatch(t)
    drawReading(t, o)
    if (ph > 0.01) drawStarChar(x, H.x, H.y, H.s, t, { color: STAR.bone, ...at(t, HOU_ST), hops: HOU_HOPS, seed: 3, pop: ph })
    if (pa > 0.01) drawStarChar(x, A.x, A.y, A.s, t, { color: STAR.bone, ...at(t, AUS_ST), hops: AUS_HOPS, seed: 8, pop: pa })
    // the ghost leans out from behind the Austin star's right point (drawn after it)
    drawGhostCameo(x, t, { x: AP.x + 104, y: AP.y + 10, at: T.ghost, dur: 1.25, from: 'left', cell: 3 })
    if (t > T.hearts) { floatHearts(t, H.x, H.y - 80, T.hearts, o); floatHearts(t, A.x, A.y - 80, T.hearts + 0.08, o) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.6 (inert: hook → the reading), 8.2 (box shut → "Different cities. Same sky.", plays).
const CUTS = [3.6, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const PITCH = { [HOU_TAG]: 783.99, [SKY_TAG]: 880 }
export const CUES = [
  ...wordPops(T.h0, 8, 0.07, 0, 0.022), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.houIn + 0.05, 739.99, 0.04, -0.5], ['pop', T.ausIn + 0.05, 880, 0.04, 0.5],
  ['tick', T.pins[0] + 0.25, 0.04], ['tick', T.pins[1] + 0.25, 0.04],
  ['boom', T.heart + 0.05, 0.1], ['pop', T.heart + 0.05, 1318.51, 0.05, 0], ['glitter', T.heart, T.heart + 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ['pop', T.roll + 0.1, 440, 0.03, 0.4], ['pop', T.roll + 0.3, 392, 0.03, 0.4],
  ['whoosh', T.heartOut[0], 0.3, 0.025],
  ['pop', T.h1, 987.77, 0.035, 0], ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['riser', T.line[0], T.line[1], 0.02],
  ['pluck', T_PUSH, 987.77, 0.045, 0.6, -0.3], ['pluck', T_PULL, 1174.66, 0.045, 0.6, 0.3], ['pluck', T_START, 1318.51, 0.05, 0.8, 0],
  ['glitter', T_START + 0.1, T_START + 0.7], ['bell', T_START + 0.12, 1760, 0.025, 1.2, 0],
  ['tick', T.ghost + 0.05, 0.02],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.12, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['pop', T.h2Land + 0.22, 1174.66, 0.035, 0],
  ['whoosh', T.scoot[0], 0.35, 0.025],
  ['bell', T.sky, 1567.98, 0.035, 1.6, 0], ['glitter', T.sky, T.sky + 0.6], ['riser', T.link[0], T.link[1], 0.015],
  ['glitter', T.hearts, T.hearts + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
