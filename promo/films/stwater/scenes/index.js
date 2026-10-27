// stwater (25 s vertical Align ad, Star Talk batch 3) · story 0–20.6, then the shared end card ("come" + the Align logo).
//   0.00–2.8   "The *water signs* | group chat."  The ♋ Cancer (Moon), ♏ Scorpio (Pluto/Mars) and ♓ Pisces (Neptune/Jupiter)
//              stars sit under a pixel rain cloud. It's raining. Cancer is already teary.
//   2.82       the drop: the box opens. Every line makes the rain heavier and the puddle of tears wider:
//              CANCER: "they said *'k.'*"  → tears
//              SCORPIO: "i've already analyzed it *9 ways.*"  → nine little "?" orbit it
//              PISCES: "i wrote a *song* about it."  → pixel notes float up
//   8.4        "Big *feelings.* | Zero *questions.*"
//   11.3       THE STARS: "or… just ask them what they *meant?*"  → three blinks; the cloud clears to a rainbow.
//   14.45      card cut (deal) · "Feel it. | Then *say* it."  Cancer actually asks ("hey! what did 'k' mean?") and the
//              reply pops in ("sorry, busy day! dinner friday?"). Heart-eyes all round. Everything pops out by 20.45.
//   20.45→     plain sky; the end card takes over at 20.6.
// One canvas (sky + weather + cast), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, noise1 } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, BEAT, pop01, outK, popOut, popText, drawBits, sparkles, glow, at, wordT, checkLines, eyesOf, NOTE, wordPops } from './kit.js'

export const DURATION = 25
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const CAN = signStar('cancer'), SCO = signStar('scorpio'), PIS = signStar('pisces')
const CAN_TAG = `${CAN.glyph} CANCER STAR`, SCO_TAG = `${SCO.glyph} SCORPIO STAR`, PIS_TAG = `${PIS.glyph} PISCES STAR`, SKY_TAG = 'THE STARS'
const WATER = '#5f9cff'

const T = {
  h0: 0.12, h0Land: 0.62, h0Out: [8.15, 8.35],
  cloudIn: 0.25, canIn: 0.5, scoIn: 0.75, pisIn: 1.0,
  open: 2.6, l1: BEAT(4) + 0.02, l2: 5.4, l3: 8.45,
  h1: 8.45, h1Land: 8.85, h1Out: [14.0, 14.2],
  l4: 11.25, clear: [12.85, 13.45], rainbow: [13.1, 13.9], close: 14.2,
  cut: 14.45,
  h2: 14.55, h2Land: 15.0, sent: 15.55, reply: 17.0, hearts: 17.75,
  out: [20.05, 20.42], h2Out: [20.1, 20.36],
}
const CPS = 30
const LINES = [
  { t: T.l1, speaker: CAN_TAG, color: CAN.color, text: "they said *'k.'*" },
  { t: T.l2, speaker: SCO_TAG, color: '#ff6f8f', text: "i've already analyzed it *9 ways.*" },
  { t: T.l3, speaker: PIS_TAG, color: '#a9a3ff', text: 'i wrote a *song* about it.' },
  { t: T.l4, speaker: SKY_TAG, text: 'or… just ask them what they *meant?*' },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_9 = wordT(LT, LINES, 1, '9 ways'), T_SONG = wordT(LT, LINES, 2, 'song'), T_MEANT = wordT(LT, LINES, 3, 'meant')

// rain + puddle intensity steps (0…1)
const RAIN_STEPS = [[0, 0.35], [T.l1 + 0.3, 0.55], [T.l2 + 0.5, 0.75], [T.l3 + 0.5, 1]]
function rainK(t) {
  let v = 0, prev = 0, t0 = -1
  for (const [a, b] of RAIN_STEPS) if (t >= a) { prev = v; v = b; t0 = a }
  const k = lerp(prev, v, ease.outCubic(prog(t, t0, t0 + 0.5))) * pop01(t, T.cloudIn, 0.4, 1.6)
  return k * (1 - ease.inOutCubic(prog(t, ...T.clear)))
}
const puddleW = t => lerp(0, 1, clamp(rainK(t) / 1)) * (t < T.clear[0] ? 1 : 1 - 0.6 * ease.inOutCubic(prog(t, T.clear[0], T.clear[1] + 0.6)))

// layout
const CAN1 = { x: 200, y: 1040, s: 240 }, SCO1 = { x: 540, y: 960, s: 250 }, PIS1 = { x: 880, y: 1040, s: 240 }
const CAN2 = { x: 300, y: 1440, s: 250 }, SCO2 = { x: 610, y: 1490, s: 220 }, PIS2 = { x: 860, y: 1440, s: 220 }
const CLOUD = { x: 540, y: 640 }
const PUDDLE_Y = 1345
const RB = { x: 540, y: 1180, r0: 380, r1: 470 }      // rainbow arc (pre-cut); after the cut it sits higher
const RB2 = { x: 540, y: 1270, r0: 420, r1: 505 }
const after = t => t >= T.cut

const CAN_HOPS = [T.canIn + 0.3, ...talkHops(LINES, CAN_TAG, { cps: CPS }), T.clear[1], T.sent, T.reply + 0.4]
const SCO_HOPS = [T.scoIn + 0.3, ...talkHops(LINES, SCO_TAG, { cps: CPS }), T.clear[1] + 0.08, T.hearts]
const PIS_HOPS = [T.pisIn + 0.3, ...talkHops(LINES, PIS_TAG, { cps: CPS }), T.clear[1] + 0.16, T.hearts + 0.1]

const CAN_ST = [
  [0, { mood: 'sparkle', look: [0, 1] }], [T.l1, { mood: 'sparkle', look: [0, 0] }],
  [T.l2, { mood: 'sparkle', look: [1, -1] }], [T.l3, { mood: 'sparkle', look: [1, 0] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEANT, { mood: 'wide', look: [0, 0], blink: false }], [T.clear[1], { mood: 'happy' }],
  [T.cut, { mood: 'neutral', look: [1, -1] }], [T.sent + 0.4, { mood: 'squint', look: [1, -1] }], [T.reply + 0.2, { mood: 'wide', look: [1, -1], blink: false }], [T.reply + 0.75, { mood: 'heart' }],
]
const SCO_ST = [
  [0, { mood: 'squint', look: [-1, 0] }], [T.l1, { mood: 'squint', look: [-1, 0], blink: false }],
  [T.l2, { mood: 'squint', look: [0, 0] }], [T_9, { mood: 'eyeroll' }],
  [T.l3, { mood: 'squint', look: [1, 0] }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEANT, { mood: 'wide', look: [0, 0], blink: false }], [T.clear[1] + 0.1, { mood: 'happy' }],
  [T.cut, { mood: 'squint', look: [-1, -1] }], [T.reply + 0.3, { mood: 'happy' }], [T.hearts, { mood: 'heart' }],
]
const PIS_ST = [
  [0, { mood: 'sleepy', zzz: false }], [T.l1, { mood: 'sparkle', look: [-1, 0] }],
  [T.l2, { mood: 'neutral', look: [-1, -1] }],
  [T.l3, { mood: 'sparkle', look: [0, -1] }], [T_SONG, { mood: 'happy' }],
  [T.l4, { mood: 'neutral', look: [0, -1] }], [T_MEANT, { mood: 'wide', look: [0, 0], blink: false }], [T.clear[1] + 0.2, { mood: 'sparkle', look: [0, -1] }],
  [T.cut, { mood: 'neutral', look: [-1, -1] }], [T.reply + 0.3, { mood: 'sparkle', look: [-1, -1] }], [T.hearts + 0.1, { mood: 'heart' }],
]

const CLOUD_BM = [
  '........WWWW..........',
  '......WWwwwwWW........',
  '.....WwwwwwwwwW.WWW...',
  '..WWWwwwwwwwwwwWwwwW..',
  '.WwwwwwwwwwwwwwwwwwwW.',
  'WwwwwwwwwwwwwwwwwwwwwW',
  'WggggwwwwwwwwwwwwggggW',
  '.WggggggggggggggggggW.',
  '..WWWWWWWWWWWWWWWWWW..',
]
const NOTE_BM = ['..XXXX', '..X..X', '..X..X', '..X..X', 'XXX.XX', 'XXX.XX']
const QM = ['.XXX.', 'X...X', '...X.', '..X..', '.....', '..X..']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const RAINBOW = ['#ff5c6c', '#ff9f43', '#ffd84a', '#6fdc8c', '#5fb8ff', '#8f7cff']

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The *water signs* | group chat.', { top: 190, size: 104, accentSize: 140, at: T.h0, times: [T.h0, T.h0Land, T.h0Land + 0.12, T.h0Land + 0.4, T.h0Land + 0.48], wobble: true, accentColor: WATER })
  const H1 = popText(root, 'Big *feelings.* | Zero *questions.*', { top: 196, size: 108, accentSize: 140, at: T.h1, times: [T.h1, T.h1Land, T.h1 + 0.6, T.h1Land + 0.6], wobble: true, colors: { 1: WATER, 3: GOLD } })
  const H2 = popText(root, 'Feel it. | Then *say* it.', { top: 200, size: 124, accentSize: 176, at: T.h2, times: [T.h2, T.h2 + 0.1, T.h2Land - 0.15, T.h2Land, T.h2Land + 0.18], wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawCloud(t, k) {
    const pk = pop01(t, T.cloudIn, 0.4, 1.8)
    const fade = 1 - ease.inOutCubic(prog(t, ...T.clear))
    if (pk <= 0.01 || fade <= 0) return
    const dark = rainK(t)
    const cols = { W: '#2a2350', w: dark > 0.7 ? '#6f7398' : dark > 0.5 ? '#8a8fb8' : '#a9aed0', g: dark > 0.7 ? '#4f527a' : '#6b6f98' }
    const lift = (1 - fade) * 120
    drawBits(x, CLOUD_BM, cols, CLOUD.x + Math.sin(t * 0.9) * 10, CLOUD.y - lift + Math.sin(t * 1.4) * 5, 26, { sc: pk, alpha: fade, outline: null })
  }
  function drawRain(t) {
    const k = rainK(t)
    if (k <= 0.02) return
    const n = Math.round(130 * k)
    x.save()
    for (let i = 0; i < n; i++) {
      const sp = 1.1 + (i % 5) * 0.12, ph = (t * sp + i * 0.137) % 1
      const rx = 540 + ((i * 97) % 520) - 260 + Math.sin(i) * 16, ry = lerp(CLOUD.y + 90, PUDDLE_Y, ph)
      x.globalAlpha = 0.85 * k
      x.fillStyle = i % 4 ? '#8fc2ff' : '#d8ecff'
      x.fillRect(Math.round(rx), Math.round(ry), 6, 24)
    }
    x.restore()
  }
  function drawPuddle(t, k) {
    const w = puddleW(t)
    if (w <= 0.01 || k <= 0) return
    const R = lerp(60, 470, w), c = 10
    x.save(); x.globalAlpha *= k
    for (let j = -3; j <= 3; j++) for (let i = -Math.ceil(R / c); i <= Math.ceil(R / c); i++) {
      const u = i * c / R, v = j / 3.4
      if (u * u + v * v > 1) continue
      const rip = Math.sin(i * 0.37 - t * 4 + j * 1.7) > 0.93
      x.fillStyle = rip ? '#bfe0ff' : j < 0 ? '#3f7cf0' : '#2d5ec8'
      x.fillRect(Math.round(540 + i * c), Math.round(PUDDLE_Y + j * c), c, c)
    }
    // splash rings
    for (let s = 0; s < 6; s++) {
      const ph = (t * 1.3 + s * 0.31) % 1, sx = 540 + Math.sin(s * 7.1) * R * 0.7
      x.globalAlpha = k * (1 - ph) * clamp(rainK(t) * 2)
      x.fillStyle = '#d8ecff'; x.fillRect(Math.round(sx - 20 * ph - 5), PUDDLE_Y - 14 - 22 * ph, 6, 6); x.fillRect(Math.round(sx + 20 * ph), PUDDLE_Y - 14 - 22 * ph, 6, 6)
    }
    x.restore()
  }
  function drawRainbow(t, k) {
    const p = ease.outCubic(prog(t, ...T.rainbow))
    if (p <= 0 || k <= 0) return
    const R_ = after(t) ? RB2 : RB, c = 12, band = (R_.r1 - R_.r0) / RAINBOW.length
    x.save(); x.globalAlpha *= k * 0.95
    const aMax = Math.PI * p
    const n = Math.ceil(R_.r1 / c)
    for (let j = -n; j <= 0; j++) for (let i = -n; i <= n; i++) {
      const px = i * c + c / 2, py = j * c + c / 2, d = Math.hypot(px, py)
      if (d < R_.r0 || d >= R_.r1) continue
      const ang = Math.atan2(-py, -px)            // 0 at the left foot → π at the right foot
      if (ang > aMax) continue
      x.fillStyle = RAINBOW[Math.min(RAINBOW.length - 1, Math.floor((R_.r1 - d) / band))]
      x.fillRect(Math.round(R_.x + i * c), Math.round(R_.y + j * c), c, c)
    }
    x.restore()
    glow(x, R_.x, R_.y - R_.r0, 380, '#ffd84a', 0.25 * p * k)
  }
  function tears(t, r, k) {
    const e = eyesOf(r)
    for (const [ex, ey] of [e.l, e.r]) for (let d = 0; d < 3; d++) {
      const ph = (t * 1.2 + d / 3 + (ex > r.x ? 0.5 : 0)) % 1
      x.save(); x.globalAlpha = k * (1 - ph)
      x.fillStyle = INK; x.fillRect(Math.round(ex - 9), Math.round(ey + e.cell * 4 + ph * 130 - 3), 18, 24)
      x.fillStyle = '#9fd4ff'; x.fillRect(Math.round(ex - 6), Math.round(ey + e.cell * 4 + ph * 130), 12, 18)
      x.fillStyle = '#e6f4ff'; x.fillRect(Math.round(ex - 6), Math.round(ey + e.cell * 4 + ph * 130), 6, 6)
      x.restore()
    }
  }
  function orbitQ(t, r) {
    if (t < T_9 || t > T.l3 + 0.4) return
    const o = 1 - prog(t, T.l3, T.l3 + 0.4)
    for (let i = 0; i < 9; i++) {
      const pk = pop01(t, T_9 + i * 0.06, 0.25, 2.6) * o
      const a = t * 1.2 + i * (Math.PI * 2 / 9)
      drawBits(x, QM, { X: i % 3 ? '#ff8fa8' : BONE }, r.x + Math.cos(a) * 190, r.y - 10 + Math.sin(a) * 130, 6, { sc: pk })
    }
  }
  function notes(t, r) {
    if (t < T_SONG) return
    for (let i = 0; i < 6; i++) {
      const born = T_SONG + i * 0.32, p = (t - born) / 1.6
      if (p < 0 || p >= 1 || born > T.l4) continue
      drawBits(x, NOTE_BM, { X: i % 2 ? '#c9a6ff' : '#8fd8f6' }, r.x + 90 + Math.sin(p * 6 + i) * 30 - i * 14, r.y - 120 - p * 240, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }
  function bubble(t, t0, text, right, y, col, ink) {
    const pk = pop01(t, t0, 0.32, 2.2)
    if (pk <= 0.01) return
    x.save()
    x.font = `700 40px ${MONO}`
    const tw = x.measureText(text).width, w = tw + 64, h = 92
    const bx = right ? 1080 - 110 - w : 110, by = y
    x.translate(bx + (right ? w : 0), by + h); x.scale(pk, pk); x.translate(-(right ? w : 0), -h)
    x.fillStyle = 'rgba(14,8,32,0.9)'; x.fillRect(-6, -6, w + 12, h + 12)
    x.fillStyle = col; x.fillRect(0, 0, w, h)
    // pixel tail
    const tx = right ? w - 36 : 24
    x.fillRect(tx, h, 18, 12); x.fillRect(tx + (right ? 12 : -6), h + 12, 12, 10)
    x.fillStyle = ink; x.textBaseline = 'middle'; x.fillText(text, 32, h / 2 + 2)
    x.restore()
  }
  function floatHearts(t, cx, cy, t0) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, p = (t - born) / 1.3
      if (p < 0 || p >= 1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, cx + (((i * 37) % 9) / 8 - 0.5) * 520 + Math.sin(p * 7 + i) * 16, cy - p * 260, 7, { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const two = after(t)
    drawRainbow(t, o)
    if (!two) { drawCloud(t, o); drawRain(t); drawPuddle(t, o) }
    const blinkSq = t > T_MEANT + 0.2 && t < T_MEANT + 0.8 ? -0.1 * Math.exp(-(t - T_MEANT - 0.2) * 7) * Math.cos((t - T_MEANT - 0.2) * 20) : 0
    const cast = [
      { P: two ? CAN2 : CAN1, c: CAN, st: CAN_ST, hops: CAN_HOPS, tin: T.canIn, seed: 3 },
      { P: two ? SCO2 : SCO1, c: SCO, st: SCO_ST, hops: SCO_HOPS, tin: T.scoIn, seed: 6 },
      { P: two ? PIS2 : PIS1, c: PIS, st: PIS_ST, hops: PIS_HOPS, tin: T.pisIn, seed: 9 },
    ]
    const res = cast.map(m => {
      const pk = pop01(t, m.tin, 0.36, 2.2) * o
      if (pk <= 0.01) return null
      return drawStarChar(x, m.P.x, m.P.y, m.P.s, t, { color: m.c.color, glyph: m.c.glyph, ...at(t, m.st), hops: m.hops, seed: m.seed, pop: pk, squash: blinkSq })
    })
    if (res[0] && t < T_MEANT) tears(t, res[0], o * pop01(t, T.canIn + 0.5, 0.3))
    if (res[1]) orbitQ(t, res[1])
    if (res[2]) notes(t, res[2])
    if (!two) sparkles(x, t, 540, 800, T.clear[1], { n: 12, R: 300, size: 26, seed: 4, cols: [GOLD, BONE, '#8fd8f6', PINK] })
    if (two) {
      bubble(t, T.sent, "hey! what did 'k' mean?", false, 720, '#fff3e0', INK)
      bubble(t, T.reply, 'sorry, busy day!', true, 880, '#5fb8ff', '#0d1a3a')
      bubble(t, T.reply + 0.55, 'dinner friday? ♥', true, 1010, '#5fb8ff', '#0d1a3a')
      if (t > T.hearts) floatHearts(t, 540, 1320, T.hearts)
      sparkles(x, t, 820, 940, T.reply + 0.1, { n: 10, R: 200, size: 22, seed: 7, cols: ['#5fb8ff', BONE, GOLD] })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const gloom = rainK(t)
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, { ...base, dim: base.dim * (1 - 0.35 * gloom) })
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: 14.45 (box shut, H1 gone → Cancer actually asks). End card flips at 20.6.
const CUTS = [{ t: T.cut, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const PITCH = { [CAN_TAG]: 1174.66, [SCO_TAG]: 659.25, [PIS_TAG]: 987.77, [SKY_TAG]: 880 }
export const CUES = [
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Land, 987.77, 0.045, -0.1], ['pop', T.h0Land + 0.12, 1174.66, 0.045, 0.1], ...wordPops(T.h0Land + 0.4, 2, 0.08, 2, 0.026),
  ['whoosh', T.cloudIn, 0.5, 0.03], ['boom', T.cloudIn + 0.3, 0.06],
  ['pop', T.canIn + 0.05, 1174.66, 0.04, -0.5], ['pop', T.scoIn + 0.05, 659.25, 0.04, 0], ['pop', T.pisIn + 0.05, 987.77, 0.04, 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ...RAIN_STEPS.slice(1).map(([t0], i) => ['whoosh', +t0.toFixed(3), 0.6, 0.018 + i * 0.006]),
  ...Array.from({ length: 9 }, (_, i) => ['pop', +(T_9 + i * 0.06).toFixed(3), NOTE[i % 7] * 2, 0.02, ((i % 3) - 1) * 0.4]),
  ...[0, 1, 2, 3].map(i => ['pluck', +(T_SONG + i * 0.32).toFixed(3), NOTE[[2, 4, 3, 5][i]], 0.035, 0.5, 0.4]),
  ...wordPops(T.h1, 2, 0.1, 1, 0.028), ['pop', T.h1 + 0.6, 659.25, 0.03, 0], ['pop', T.h1Land + 0.6, 587.33, 0.045, 0],
  ['tick', T_MEANT + 0.25, 0.03], ['tick', T_MEANT + 0.45, 0.03], ['tick', T_MEANT + 0.65, 0.03],
  ['riser', T.clear[0] - 0.3, T.clear[1], 0.02], ['glitter', T.clear[1], T.clear[1] + 0.8], ['bell', T.rainbow[0] + 0.2, 1318.51, 0.035, 1.4, 0], ['bell', T.rainbow[0] + 0.5, 1760, 0.025, 1.2, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2 + 0.1, 987.77, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.sent - 0.05, 0.3, 0.03], ['pop', T.sent + 0.1, 1174.66, 0.04, -0.3],
  ['pop', T.reply + 0.1, 1318.51, 0.045, 0.3], ['pop', T.reply + 0.65, 1567.98, 0.04, 0.3], ['glitter', T.reply + 0.1, T.reply + 0.6],
  ['glitter', T.hearts, T.hearts + 0.6], ['bell', T.hearts + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
