// starhello (15 s vertical Align ad, Star Talk #1) · story 0–10.6, then the shared end card ("come" + the Align logo).
//   0.00–5.05  "Astrology is just | *talking* to | the stars."  A twinkle in the middle of the sky swells into a big sleepy
//              gold pixel star (– – and drifting z's). It flutters awake (1.75), looks up, left, right… and straight at you
//              on the drop (2.82). The RPG box pops open: THE STARS "psst. up here." → a wink.
//   5.05–8.55  "They have | *notes.*"  THE STARS: "we've been trying to reach you about your love life." → a knowing squint.
//              The turn (7.15–8.2): little sign-coloured stars blink awake all over the sky, glance at the big one, then
//              all look at you.
//   8.55–10.5  box pops shut · "Time to | *listen.*"  A second wave wakes below; everyone hops on the accent, blinks in
//              unison, the big star winks. Everything pops out by 10.45.
//   10.45→     plain sky (SKY_H + grain); the end card takes over at 10.6.
// One canvas (sky + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'

export const DURATION = 15
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.36, h0Out: [4.88, 5.06],
  twinkle: 0.0, swell: [0.38, 0.8], flutter: 1.75, awake: 2.05, lookUp: 2.05, lookL: 2.32, lookR: 2.56, atYou: BEAT(4) - 0.0,   // 2.82 = the drop
  open: 2.75, l1: 2.95, wink: [3.78, 4.45],
  h1: 5.12, h1Land: 5.55, l2: 5.2, squint: [7.0, 7.55], h1Out: [8.36, 8.54],
  wake: [7.15, 8.15], allLook: 8.25, close: 8.48,
  h2: 8.66, h2Land: 9.15, wave2: [8.75, 9.25], hopAll: 9.15, syncBlink: 9.72, heroWink: [9.9, 10.3], h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: 'psst. up here.' },
  { t: T.l2, speaker: 'THE STARS', text: "we've been trying to reach you about your *love life.*" },
]
const CPS = 30
const HOPS = [T.atYou, ...talkHops(LINES, 'THE STARS', { cps: CPS }), T.hopAll, T.heroWink[0]]

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
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

// ── the hero (the stars' narrator) and the crowd
const HERO = { x: 540, y: 1010, size: 392 }
const sc = i => SIGNS[i % 12].color
// wave 1 wakes during the turn (clear of the headline and the box); wave 2 wakes below once the box has closed
const CROWD1 = [
  [150, 650, 116], [945, 680, 124], [345, 600, 78], [760, 615, 86], [120, 905, 92], [965, 945, 104],
  [255, 1150, 120], [840, 1170, 112], [110, 1320, 82], [980, 1320, 86], [440, 730, 64], [640, 735, 66],
].map(([x, y, s], i) => ({ x, y, s, col: sc(i * 5 + 1), seed: 11 + i, t: lerp(T.wake[0], T.wake[1], [0, 0.55, 0.2, 0.8, 0.35, 0.1, 0.65, 0.45, 0.9, 0.28, 1, 0.72][i]) }))
const CROWD2 = [
  [190, 1490, 104], [420, 1580, 84], [655, 1500, 112], [895, 1575, 98], [300, 1745, 74], [770, 1760, 80], [540, 1720, 62], [100, 1650, 64], [985, 1720, 66],
].map(([x, y, s], i) => ({ x, y, s, col: sc(i * 7 + 3), seed: 41 + i, t: lerp(T.wave2[0], T.wave2[1], [0.1, 0.5, 0.0, 0.7, 0.85, 0.35, 1, 0.6, 0.25][i]) }))
const CROWD = [...CROWD1, ...CROWD2]

function heroState(t) {
  // mood / look / forced blink per beat
  if (t < T.flutter) return { mood: 'sleepy', look: [0, 0] }
  if (t < T.awake) { const k = t - T.flutter; return { mood: 'neutral', look: [0, 0], blink: k < 0.08 ? 0.5 : k < 0.17 ? 1 : k < 0.24 ? 0.5 : 1 } }
  if (t < T.lookL) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.lookR) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.atYou) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.l1) return { mood: 'happy' }
  if (t < T.wink[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.squint[0]) return { mood: 'neutral', look: t < T.l2 ? undefined : [0, 0] }
  if (t < T.squint[1]) return { mood: 'squint', look: [t < T.squint[0] + 0.28 ? 1 : 0, 0] }
  if (t < T.allLook) { const k = t - T.wake[0]; return { mood: 'wide', look: k < 0.35 ? [0, 0] : k < 0.75 ? [-1, 0] : [1, -1] } }
  if (t < T.h2) return { mood: 'happy' }
  if (t >= T.heroWink[0] && t < T.heroWink[1]) return { mood: 'wink', look: [0, 0] }
  return { mood: 'sparkle', look: [0, 0], blink: t >= T.syncBlink && t < T.syncBlink + 0.16 ? (t < T.syncBlink + 0.04 || t > T.syncBlink + 0.12 ? 0.5 : 1) : false }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 34px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Astrology is just | *talking* to | the stars.', { top: 190, size: 108, accentSize: 150, at: T.h0, late: 0, wobble: true, gap: 0.08, accentColor: GOLD })
  const H1 = popText(root, 'They have | *notes.*', { top: 200, size: 128, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Time to | *listen.*', { top: 200, size: 140, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    // before the swell: just a twinkling pixel star in the sky
    const sw = prog(t, ...T.swell)
    if (sw < 0.35) {
      const tw = 0.75 + 0.25 * Math.sin(t * 9)
      x.save(); x.globalAlpha = clamp(t / 0.25) * (1 - sw / 0.35)
      drawPixelStar(x, HERO.x, HERO.y, Math.round(42 + 70 * sw) * tw, 0, STAR.sky)
      x.restore()
    }
    const pk = easeOutBack(sw, 1.6) * ok
    if (pk <= 0.02) return
    const st = heroState(t)
    // a little settle-squash right after the swell
    const sq = t > T.swell[1] ? 0.1 * Math.exp(-(t - T.swell[1]) * 8) * Math.cos((t - T.swell[1]) * 24) : 0
    drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: STAR.sky, ...st, hops: HOPS, pop: pk, squash: sq, seed: 3, glow: 1.15 })
    // wake-up sparkle ring
    sparkles(t, HERO.x, HERO.y, T.atYou, 12, 260, 7)
  }

  function drawCrowd(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    CROWD.forEach((c, i) => {
      // before waking: a small twinkle in its colour
      const pk = pop01(t, c.t, 0.34, 2.2)
      if (pk < 0.4) {
        const tw = 0.55 + 0.45 * Math.max(0, Math.sin(t * 3.3 + i * 1.9))
        x.save(); x.globalAlpha = (1 - pk / 0.4) * clamp(t / 0.4) * ok
        drawPixelStar(x, c.x, c.y, Math.round(c.s * 0.3) * tw, 1, c.col)
        x.restore()
      }
      if (pk <= 0.02) return
      const k = t - c.t
      const toHero = [Math.sign(HERO.x - c.x) * (Math.abs(HERO.x - c.x) > 60 ? 1 : 0), Math.sign(HERO.y - c.y) * (Math.abs(HERO.y - c.y) > 150 ? 1 : 0)]
      let mood = 'neutral', look = [0, 0], blink
      if (k < 0.22) blink = 1
      else if (k < 0.3) blink = 0.5
      if (i < CROWD1.length && t < T.allLook - 0.05 * (i % 4)) { look = toHero; if (k > 0.3 && k < 0.6) mood = 'wide' }
      if (t >= T.syncBlink && t < T.syncBlink + 0.16) blink = t < T.syncBlink + 0.04 || t > T.syncBlink + 0.12 ? 0.5 : 1
      else if (t > T.allLook && t < T.syncBlink + 0.3) blink = blink ?? false
      if (t >= T.heroWink[0] && i % 3 === 0) mood = 'happy'
      drawStarChar(x, c.x, c.y, c.s, t, { color: c.col, mood, look, blink, seed: c.seed, pop: pk * ok, hops: [c.t + 0.3, T.hopAll + (c.x / W) * 0.12], glow: 0.8, bob: c.s * 0.05 })
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) { drawCrowd(t); drawHero(t) }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.12 (H0 out → "They have notes." + the second line) and 8.62 (box shut → "Time to listen.").
// cardfx keeps one for a 15 s film (the 8.62 one). End card flips at 10.6.
const CUTS = [5.12, { t: 8.62, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: headline + the star swells out of a twinkle
  ...wordPops(T.h0, 7, 0.08, 0, 0.022), ['pop', T.h0Land, 1318.51, 0.05, 0], ['pluck', T.h0Land, 1174.66, 0.045, 0.6, 0],
  ['bell', T.swell[0], 1760, 0.02, 1.2, 0], ['pop', T.swell[0] + 0.12, 587.33, 0.04, 0],
  // wakes up: flutter blinks, glances, looks at you (the drop)
  ['tick', T.flutter + 0.08, 0.03], ['tick', T.flutter + 0.24, 0.03],
  ['pop', T.awake, 987.77, 0.035, 0], ['tick', T.lookL, 0.02], ['tick', T.lookR, 0.02],
  ['pop', T.atYou, 1174.66, 0.045, 0], ['bell', T.atYou, 1174.66, 0.035, 1.2, 0], ['glitter', T.atYou, T.atYou + 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2],
  // they have notes
  ...wordPops(T.h1, 2, 0.07, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['pop', T.squint[0], 440, 0.03, 0.2],
  // the turn: the sky blinks awake
  ...CROWD1.map((c, i) => ['pop', +(c.t + 0.26).toFixed(3), NOTE[(i * 3) % 7] * 1.0, 0.026, +((c.x / W - 0.5) * 1.2).toFixed(2)]),
  ['glitter', T.wake[0] + 0.2, T.wake[1] + 0.2],
  ['bell', T.allLook, 1318.51, 0.035, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // time to listen
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...CROWD2.map((c, i) => ['pop', +(c.t + 0.26).toFixed(3), NOTE[(i * 2 + 1) % 7], 0.022, +((c.x / W - 0.5) * 1.2).toFixed(2)]),
  ['glitter', T.hopAll, T.hopAll + 0.4], ['tick', T.syncBlink + 0.04, 0.03],
  ['pluck', T.heroWink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.heroWink[0] + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
