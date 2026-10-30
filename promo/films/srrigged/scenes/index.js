// srrigged (20 s vertical, Star Talk Remix of "Rigged") · story 0–15.6, then the shared end card.
// The original: hidden scores rank the faces, the machine shatters into stars, and everyone is dealt blind.
// Here the ♏ Scorpio star (the one sign that always smells a rat) investigates the machine, then breaks it.
//   0.00–6.15   "Dating is | *rigged.*"  A grey world. A generic RANK-O-MATIC 3000 ranks three grey face cards by
//               SCORE: the 4.1 gets a HIDDEN stamp and drops out of sight, a BOOST $9.99 tag pumps the 9.6 up to RANK #1.
//               The ♏ star slides in, the only colour on screen, squinting. ♏: "hidden scores? paid boosts? for *love?*"
//               It hops onto the machine; the machine shakes, flashes ERROR and…
//   6.15        …shatters into pixel stars on the drop; colour floods back into the sky.
//   6.25–9.5    "No scores. | No *filters.*"  ♏ (happy, bouncing in the falling debris): "we don't rank people. *we deal.*"
//   9.65        card cut (deal)
//   9.75–15.42  "Let the stars | *deal.*"  ♏ deals five cards into a fan and each flips to a veiled mystery card (no faces,
//               no scores). ♏: "no faces. no scores. *just stars.*" → a wink; everything pops out.
//   15.42→      plain sky; the end card takes over at 15.6.
// One canvas (sky + props + cast), DOM type + dialogue boxes, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { glowAt, burst, drawFace, drawCardImg } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#ff4d5e'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const SCO = signStar('scorpio')
const SCO_TAG = `${SCO.glyph} SCORPIO STAR`

// ── the timeline
const T = {
  // A · the machine
  h0: 0.12, h0Land: BEAT(1), h0Out: [5.98, 6.14],
  machine: 0.3, hidden: 1.75, drop: [1.95, 2.45], boost: 3.1, rise: [3.25, 3.75], rank1: 3.75,
  scoIn: [0.9, 1.4], open1: 2.3, l1: 2.5, close1: 5.75, hop: [5.08, BEAT(9)], shake: [BEAT(9), BEAT(10)], shatter: BEAT(10), flood: [BEAT(10), 6.8],
  // B · no scores
  h1: 6.25, h1Land: BEAT(11) + 0.04, open2: 6.55, l2: 6.75, close2: 9.48, h1Out: [9.3, 9.46],
  // C · the deal
  h2: 9.75, h2Land: BEAT(17) + 0.1, deal0: 10.1, dealGap: 0.12, flip0: 10.95, flipGap: 0.14,
  open3: 10.8, l3: 11.0, close3: 14.0, wink: 14.25, out: [15.0, 15.42], h2Out: [15.08, 15.34],
}
const CPS = 30
const L1 = [{ t: T.l1, speaker: SCO_TAG, color: SCO.color, text: 'hidden scores? paid boosts? for *love?*' }]
const L2 = [{ t: T.l2, speaker: SCO_TAG, color: SCO.color, text: 'we don’t rank people. *we deal.*' }]
const L3 = [{ t: T.l3, speaker: SCO_TAG, color: SCO.color, text: 'no faces. no scores. *just stars.*' }]
const HOPS = [T.scoIn[1], ...talkHops(L1, SCO_TAG, { cps: CPS }), T.shatter + 0.05, ...talkHops(L2, SCO_TAG, { cps: CPS }), ...talkHops(L3, SCO_TAG, { cps: CPS }), T.wink]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// Scorpio's path: [t, x, y, size]
const KF = [
  [0, 1250, 1290, 190], [T.scoIn[0], 1250, 1290, 190], [T.scoIn[1], 880, 1290, 190], [T.hop[0], 880, 1290, 190], [T.hop[1], 540, 610, 190],
  [T.shatter, 540, 610, 190], [T.shatter + 0.6, 540, 930, 280], [T.h2, 540, 930, 280], [T.h2 + 0.4, 540, 700, 220], [99, 540, 700, 220],
]
function sco(t) {
  let i = 0
  while (i < KF.length - 2 && t >= KF[i + 1][0]) i++
  const [t0, x0, y0, s0] = KF[i], [t1, x1, y1, s1] = KF[i + 1]
  const k = (t0 === T.hop[0]) ? prog(t, t0, t1) : ease.inOutCubic(prog(t, t0, t1))
  let y = lerp(y0, y1, k)
  if (t > T.hop[0] && t < T.hop[1]) y -= Math.sin(Math.PI * prog(t, ...T.hop)) * 180
  return { x: lerp(x0, x1, k), y, s: lerp(s0, s1, k) }
}
function scoMood(t) {
  if (t < T.scoIn[1] + 0.2) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.hidden + 0.1) return { mood: 'squint', look: [-1, -1] }
  if (t < T.drop[1]) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.boost) return { mood: 'squint', look: [-1, -1] }
  if (t < T.l1) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.hop[0]) return { mood: 'squint', look: t < 4.4 ? [0, 0] : [-1, -1] }
  if (t < T.shatter) return { mood: 'squint', look: [0, 1] }
  if (t < T.shatter + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.h2) return { mood: 'happy' }
  if (t < T.flip0 + 0.8) return { mood: 'sparkle', look: [0, 1] }
  if (t < T.wink) return { mood: 'happy' }
  if (t < T.wink + 0.6) return { mood: 'wink' }
  return { mood: 'happy' }
}

// the machine's three cards: x, score, seed
const MC = { x: 540, y: 880, w: 940, h: 620 }
const SLOTS = [{ x: 250, score: '6.2', seed: 4 }, { x: 540, score: '4.1', seed: 9 }, { x: 830, score: '9.6', seed: 14 }]
// shatter debris
const DEBRIS = (() => { const r = rng(77); return Array.from({ length: 46 }, (_, i) => ({ x: MC.x + (r() - 0.5) * MC.w, y: MC.y + (r() - 0.5) * MC.h, vx: (r() - 0.5) * 900, vy: -300 - r() * 700, s: 18 + r() * 26, c: [GOLD, BONE, PINK, LAV, '#8fd8f6'][i % 5], spin: r() })) })()
// the fan
const FAN = Array.from({ length: 5 }, (_, i) => ({ x: 540 + (i - 2) * 175, y: 1100 + Math.abs(i - 2) * 30, rot: (i - 2) * 0.13 }))
const DEAL_ORDER = [2, 1, 3, 0, 4]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const ims = await Promise.all(['card-back.png', 'card-profile-1.png', 'card-profile-2.png', 'card-profile-3.png', 'card-profile-4.png', 'card-profile-5.png'].map(loadImg))
  const BACK = bake(ims[0], 300), PROF = ims.slice(1).map(im => bake(im, 300))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dating is | *rigged.*', { top: 190, size: 128, accentSize: 196, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: RED })
  const H1 = popText(root, 'No scores. | No *filters.*', { top: 190, size: 124, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.12, accentColor: LAV })
  const H2 = popText(root, 'Let the stars | *deal.*', { top: 190, size: 124, accentSize: 196, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box1 = dialogueBox(root, { lines: L1, y: 1420, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: L2, y: 1420, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: L3, y: 1420, open: T.open3, close: T.close3, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function desat(k) {
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'saturation'; x.globalAlpha = clamp(k); x.fillStyle = '#808080'; x.fillRect(0, 0, 1080, 1920); x.restore()
    x.save(); x.globalAlpha = 0.25 * clamp(k); x.fillStyle = '#0a0a10'; x.fillRect(0, 0, 1080, 1920); x.restore()
  }
  function tag(label, cx, cy, k, { col = '#e4e4ea', fillC = 'rgba(10,10,16,0.92)', size = 26, rot = 0 } = {}) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(label).width + 30, h = size * 1.8
    x.fillStyle = fillC; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 8); x.fill()
    x.strokeStyle = col; x.lineWidth = 3; x.stroke(); x.fillStyle = col; x.fillText(label, 0, 2)
    x.restore()
  }

  // ── A · the RANK-O-MATIC 3000 (generic, grey, clinical)
  function drawMachine(t) {
    if (t < T.machine || t >= T.shatter) return
    const k = pop01(t, T.machine, 0.42, 1.6)
    const sh = t > T.shake[0] ? Math.sin(t * 70) * 14 * prog(t, T.shake[0], T.shake[1]) : 0
    const land = t > T.hop[1] && t < T.hop[1] + 0.3 ? 0.04 * Math.sin(Math.PI * prog(t, T.hop[1], T.hop[1] + 0.3)) : 0
    x.save(); x.translate(MC.x + sh, MC.y); x.scale(k * (1 + land), k * (1 - land))
    const { w, h } = MC
    x.fillStyle = '#1c1c22'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26); x.fill()
    x.strokeStyle = '#6a6a74'; x.lineWidth = 6; x.stroke()
    // header strip
    x.fillStyle = '#2c2c34'; x.fillRect(-w / 2 + 20, -h / 2 + 20, w - 40, 70)
    x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = '#cfcfd6'
    x.fillText('RANK-O-MATIC 3000', -w / 2 + 44, -h / 2 + 56)
    // blinking lights (red when it panics)
    const panic = t > T.shake[0]
    for (let i = 0; i < 3; i++) {
      const on = panic ? Math.floor(t * 12 + i) % 2 === 0 : Math.floor(t * 2.5 + i * 0.7) % 3 === 0
      x.fillStyle = on ? (panic ? RED : '#a8e0a0') : '#3a3a44'; x.beginPath(); x.arc(w / 2 - 60 - i * 44, -h / 2 + 55, 13, 0, Math.PI * 2); x.fill()
    }
    // the three slots
    SLOTS.forEach((s, i) => {
      let dy = 0, a = 1
      if (i === 1) { const d = ease.inCubic(prog(t, ...T.drop)); dy = d * 420; a = 1 - d }
      const rise = i === 2 ? ease.outCubic(prog(t, ...T.rise)) * -40 : 0
      const cx = s.x - 540, cy = 10 + dy + rise, cw = 210, ch = 262
      x.save(); x.globalAlpha = a
      x.beginPath(); x.rect(-w / 2 + 20, -h / 2 + 100, w - 40, h - 120); x.clip()
      x.fillStyle = '#d8d8dc'; x.beginPath(); x.roundRect(cx - cw / 2 - 6, cy - ch / 2 - 6, cw + 12, ch + 12, 14); x.fill()
      x.save(); x.beginPath(); x.roundRect(cx - cw / 2, cy - ch / 2, cw, ch, 10); x.clip(); drawFace(x, cx, cy, cw, s.seed, { gray: 0.85 }); x.restore()
      x.restore()
      if (a > 0.02) tag(`SCORE ${s.score}`, cx, cy + ch / 2 + 46, a)
    })
    // HIDDEN stamp on the 4.1
    const hk = prog(t, T.hidden, T.hidden + 0.14)
    if (hk > 0 && t < T.drop[1]) {
      const d = ease.inCubic(prog(t, ...T.drop))
      tag('HIDDEN', 0, 10 + d * 420, lerp(2, 1, ease.outCubic(hk)) * (1 - d), { col: RED, size: 40, rot: -0.2 })
    }
    // BOOST on the 9.6, RANK #1 above it
    tag('BOOST $9.99', 290, 60 + ease.outCubic(prog(t, ...T.rise)) * -40, lerp(2, 1, ease.outCubic(prog(t, T.boost, T.boost + 0.14))) * (t >= T.boost ? 1 : 0), { col: GOLD, size: 28, rot: 0.12 })
    tag('▲ RANK #1', 290, -200, pop01(t, T.rank1, 0.3, 2.6), { col: '#a8e0a0', size: 28 })
    // ERROR flash
    if (panic) tag('ERROR: FEELINGS', 0, -h / 2 + 140, pop01(t, T.shake[0], 0.2, 3), { col: RED, size: 34, fillC: 'rgba(40,6,12,0.95)' })
    x.restore()
  }
  function drawDebris(t) {
    const tt = t - T.shatter
    if (tt < 0 || tt > 3.3) return
    x.save()
    DEBRIS.forEach((d, i) => {
      const px = d.x + d.vx * tt * 0.6, py = d.y + d.vy * tt * 0.6 + 260 * tt * tt * 0.6
      const a = clamp(1 - tt / 3.3) * (0.6 + 0.4 * Math.sin(t * 9 + i))
      x.globalAlpha = a
      drawPixelStar(x, px, py, d.s, i % 2 ? 1 : 2, d.c)
    })
    x.restore()
    // the white flash
    const f = 1 - prog(t, T.shatter, T.shatter + 0.22)
    if (f > 0 && f < 1) { x.save(); x.globalAlpha = f * 0.45; x.fillStyle = '#fff6e0'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }

  // ── C · the deal: five cards, each flips to a veiled mystery card
  function drawDeal(t, S) {
    if (t < T.deal0) return
    const o = popOut(t, T.out)
    if (o <= 0) return
    DEAL_ORDER.forEach((i, n) => {
      const f = FAN[i], t0 = T.deal0 + n * T.dealGap
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, t0 + 0.38))
      const cx = lerp(S.x, f.x, p), cy = lerp(S.y + 40, f.y, p) - Math.sin(Math.PI * p) * 80
      const rot = lerp(i % 2 ? 1.4 : -1.4, f.rot, p), w = 300 * lerp(0.4, 1, p)
      const fp = prog(t, T.flip0 + n * T.flipGap, T.flip0 + n * T.flipGap + 0.32)
      if (fp < 0.5) drawCardImg(x, BACK, cx, cy, w, { rot, flip: fp * 2, sc: o })
      else drawCardImg(x, PROF[i], cx, cy + Math.sin(t * 2 + i) * 5, w * 1.04, { rot, flip: 2 - fp * 2, sc: o })
      burst(x, t, f.x, f.y, T.flip0 + n * T.flipGap + 0.16, { n: 8, R: 120, size: 20, seed: i })
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      desat(1 - ease.inOutCubic(prog(t, ...T.flood)))
      if (t < T.out[1] + 0.02) {
        drawMachine(t)
        drawDebris(t)
        const S = sco(t), o = popOut(t, T.out)
        if (t >= T.scoIn[0] && o > 0) {
          const sq = t > T.hop[1] && t < T.shatter ? 0.18 * Math.exp(-(t - T.hop[1]) * 6) * Math.cos((t - T.hop[1]) * 22) : 0
          glowAt(x, S.x, S.y, S.s * 1.2, SCO.color, t > T.shatter ? 0.5 : 0.25)
          drawStarChar(x, S.x, S.y, S.s, t, { color: SCO.color, glyph: SCO.glyph, ...scoMood(t), hops: HOPS, seed: 6, pop: o, squash: sq })
        }
        drawDeal(t, S)
        burst(x, t, 540, 700, T.wink, { n: 12, R: 220, size: 26, seed: 8 })
      }
      box1.update(t); box2.update(t); box3.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// one card cut (a 20 s film): B → C at 9.65
const CUTS = [{ t: 9.65, kind: 'deal', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const FX = { rev: 0.1, dly: 0, bus: 'fx' }
const PITCH = { [SCO_TAG]: 659.25 }
export const CUES = [
  // A
  ...wordPops(T.h0, 2, 0.1, 0, 0.022), ['pop', T.h0Land, 440, 0.05, 0], ['pluck', T.h0Land, 329.63, 0.045, 0.5, 0],
  ['whoosh', T.machine, 0.4, 0.025], ['tom', T.machine + 0.38, 80, { gain: 0.16, decay: 0.3 }],
  ['whoosh', T.scoIn[0], 0.4, 0.025], ['pop', T.scoIn[1], 659.25, 0.04, 0.5],
  ['tom', T.hidden + 0.12, 95, { gain: 0.24, decay: 0.25 }], ['tick', T.hidden + 0.12, 0.08], ['chip', T.drop[0], 900, 0.45, { slide: -30, gain: 0.025, decay: 0.4, sustain: 0.5, ...FX }],
  ['tom', T.boost + 0.12, 110, { gain: 0.2, decay: 0.2 }], ['chip', T.rise[0], 500, 0.4, { slide: 24, gain: 0.025, decay: 0.3, sustain: 0.6, ...FX }],
  ['bell', T.rank1, 1318.51, 0.025, 0.6, 0.3],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(L1, { cps: CPS, pitch: PITCH }),
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.hop[0], 0.4, 0.035], ['tom', T.hop[1], 70, { gain: 0.3, decay: 0.3 }], ['tick', T.hop[1], 0.08],
  ['riser', T.shake[0], T.shatter, 0.04],
  ...Array.from({ length: 7 }, (_, i) => ['chip', +(T.shake[0] + i * 0.075).toFixed(3), i % 2 ? 1760 : 1320, 0.05, { gain: 0.02, decay: 0.04, sustain: 0.5, ...FX }]),
  // the shatter (the drop)
  ['boom', T.shatter, 0.3], ['crash', T.shatter, { gain: 0.05, len: 1.6 }], ['glitter', T.shatter, T.shatter + 1.2],
  ['bell', T.shatter + 0.02, 1318.51, 0.04, 1.6, -0.3], ['bell', T.shatter + 0.08, 1760, 0.035, 1.6, 0.3], ['swell', T.flood[0], T.flood[1], { gain: 0.04, f0: 500, f1: 3500 }],
  // B
  ...wordPops(T.h1, 3, 0.12, 1, 0.025), ['pop', T.h1Land, 1318.51, 0.05, 0],
  ['pop', T.open2, 739.99, 0.04, 0], ...talkCues(L2, { cps: CPS, pitch: PITCH }),
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // C
  ...wordPops(T.h2, 3, 0.07, 2, 0.025), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...DEAL_ORDER.map((i, n) => ['whoosh', +(T.deal0 + n * T.dealGap).toFixed(3), 0.2, 0.018]),
  ...DEAL_ORDER.map((i, n) => ['tick', +(T.deal0 + n * T.dealGap + 0.36).toFixed(3), 0.04]),
  ...DEAL_ORDER.map((i, n) => ['pop', +(T.flip0 + n * T.flipGap + 0.16).toFixed(3), NOTE[(n * 2) % 7] * 2, 0.03, +((FAN[i].x / 1080 - 0.5) * 1.2).toFixed(2)]),
  ['glitter', T.flip0, T.flip0 + 1.0],
  ['pop', T.open3, 739.99, 0.04, 0], ...talkCues(L3, { cps: CPS, pitch: PITCH }),
  ['pop', T.close3, 880, 0.03, 0], ['pop', T.close3 + 0.07, 587.33, 0.03, 0],
  ['pop', T.wink, 1567.98, 0.035, 0], ['bell', T.wink + 0.04, 2093, 0.02, 0.8, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
