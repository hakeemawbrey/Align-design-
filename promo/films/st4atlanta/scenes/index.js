// st4atlanta (15 s vertical Align ad, Star Talk season 4, EP 079 · thread A, the vote) · story 0–10.6, then the end card.
//   0.00–4.95  "Dear *Atlanta.*"  A canopy of pixel trees (the city in a forest), trunks down to a mossy floor, fireflies.
//              The ♋ Cancer star (starcancer's crab shell on its head) peeks out from behind a trunk, ducks back, peeks again.
//              Box (THE STARS): "come out of the *woods.*"  It tiptoes out into the clearing.
//   5.00–8.40  "Peek less. | *Show up.*"  Box: "the right one is looking for you, *too.*"  Across the clearing a bone star leans out
//              from behind another trunk with a pixel flashlight; the beam sweeps… and lands on Cancer. Both go wide-eyed.
//   8.45 cut → "Be | *findable.*"  The two stand together in a warm pool of light; heart eyes, fireflies. Everything pops out
//              by 10.45; the end card takes over at 10.6.
// Easter eggs (stlore.js): the constellation (EP 79) top-left, the EP 079 cartouche, the ghost (also hiding) leans out from
// a third trunk.
// One canvas (sky + canopy + trunks + cast), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 79
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const LEAF = '#7fd68a', LAMP = '#ffe08a'
const CAN = signStar('cancer')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.75, 4.95],
  peeks: [[0.7, 1.5], [1.9, 3.7]], open: 2.2, l1: 2.35, step: [3.8, 4.5],
  h1: 5.0, h1Land: 5.45, l2: 5.1, seekIn: 5.4, beam: [5.8, 7.0], found: 7.0, glow: 7.5, close: 8.3, h1Out: [8.2, 8.38],
  cut: 8.45,
  h2: 8.5, h2Land: 8.85, h2Out: [10.2, 10.42], out: [10.05, 10.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'come out of the *woods.*', color: LEAF },
  { t: T.l2, speaker: SPEAK, text: 'the right one is looking for you, *too.*', color: LAMP },
]
const CPS = 28

// trunks: [x, width]; Cancer hides behind #1, the ghost behind #2, the seeker behind #3
const TRUNKS = [[110, 70], [300, 92], [690, 80], [930, 92]]
const FLOOR = 1300
const HIDE = { x: 352, y: 1110, size: 250 }, OUT = { x: 470, y: 1120, size: 260 }
const SEEK = { x: 880, y: 1120, size: 240 }
const FIN_C = { x: 400, y: 1110, size: 270 }, FIN_S = { x: 690, y: 1110, size: 270 }
const GHOST = { at: 2.75, x: 650, y: 1060 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const BMP = s => s.trim().split(/\s+/)
function bits(x, bm, cols, cx, cy, cell, { rot = 0, a = 1, outline = 'rgba(14,8,32,0.9)' } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  if (outline) { x.fillStyle = outline; bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect(ox + (i - 1) * cell, oy + (j - 1) * cell, cell * 3, cell * 3) })) }
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
const TORCH = BMP(`KKKKKKk.. KGGGGGKLL KGGGGGKLL KKKKKKk..`)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Dear *Atlanta.*', { top: 250, size: 130, accentSize: 190, at: T.h0, gap: 0.12, accentColor: LEAF, wobble: true, late: 1, lateAt: T.h0 + 0.3 })
  const H1 = popText(root, 'Peek less. | *Show up.*', { top: 215, size: 110, accentSize: 160, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, gap: 0.08, accentColor: LAMP })
  const H2 = popText(root, 'Be | *findable.*', { top: 200, size: 130, accentSize: 200, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.95 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const sceneK = t => clamp(popOut(t, T.out))
  // the canopy: overlapping pixel crowns (built once, positions only)
  const CROWNS = (() => { const r = rng(79), o = []; for (let i = 0; i < 16; i++) o.push({ x: -40 + i * 76 + r() * 30, y: 640 + r() * 150 + (i % 2) * 40, r: 95 + r() * 55, tone: Math.floor(r() * 3), ph: r() * 6 }); return o })()
  const LEAVES = ['#1f4a33', '#2a5e3c', '#356f45']
  function drawCanopy(t) {
    const k = sceneK(t) * clamp(prog(t, 0, 0.5))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    const c = 12
    for (const C of CROWNS) {
      const sw = Math.sin(t * 0.9 + C.ph) * 4
      const R = Math.round(C.r / c)
      for (let j = -R; j <= R; j++) for (let i = -R; i <= R; i++) {
        const d = Math.hypot(i + 0.5, (j + 0.5) * 1.25)
        if (d > R) continue
        const edge = d > R - 1.2
        const lit = (-i - j) / R
        x.fillStyle = edge ? '#123020' : lit > 0.6 ? '#4f8f5a' : LEAVES[C.tone]
        x.fillRect(Math.round(C.x + sw + i * c), Math.round(C.y + j * c), c, c)
      }
    }
    x.restore()
  }
  function drawGround(t) {
    const k = sceneK(t) * clamp(prog(t, 0, 0.5))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = '#16301f'; x.fillRect(0, FLOOR, W, H - FLOOR)
    x.fillStyle = '#244a2e'; for (let i = 0; i < 40; i++) x.fillRect((i * 53) % W, FLOOR - 6 + (i % 3) * 4, 18, 8)
    x.restore()
  }
  function drawTrunk(t, [tx, tw]) {
    const k = sceneK(t) * clamp(prog(t, 0, 0.5))
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = 'rgba(10,6,20,0.92)'; x.fillRect(tx - tw / 2 - 6, 760, tw + 12, FLOOR - 750)
    x.fillStyle = '#4a2f22'; x.fillRect(tx - tw / 2, 760, tw, FLOOR - 760)
    x.fillStyle = '#5e3c2a'; x.fillRect(tx - tw / 2, 760, tw * 0.3, FLOOR - 760)
    x.fillStyle = '#382218'; for (let y = 800; y < FLOOR; y += 64) x.fillRect(tx - tw / 2 + tw * 0.45, y, tw * 0.25, 22)
    // roots
    x.fillStyle = '#4a2f22'; x.fillRect(tx - tw / 2 - 18, FLOOR - 22, 24, 22); x.fillRect(tx + tw / 2 - 6, FLOOR - 22, 24, 22)
    x.restore()
  }
  // Cancer's crab shell, worn as a little dome hat (starcancer's colours)
  function shellHat(cx, rimY, c, rot = 0) {
    const RX = 9, RY = 6
    x.save(); x.translate(Math.round(cx), Math.round(rimY)); x.rotate(rot)
    const inside = (i, j) => { const u = (i + 0.5) / RX, v = (j + 0.5) / RY; return j >= 0 && u * u + v * v <= 1 }
    for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
      const on = inside(i, j), edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
      if (!on && !edge) continue
      let col = INK
      if (on) {
        const u = (i + 0.5) / RX, v = (j + 0.5) / RY, lit = -u * 0.6 + v * 0.8
        col = lit > 0.75 ? '#ffd2b0' : lit > 0.3 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'
        if (j === 0) col = (i + 40) % 3 === 0 ? INK : '#8f2f2a'
        if ((i + 3) ** 2 + (j - 3) ** 2 <= 1.5 || (i - 3) ** 2 + (j - 4) ** 2 <= 1.5) col = '#ffe3cc'
      }
      x.fillStyle = col; x.fillRect(i * c, -(j + 1) * c, c + 0.5, c + 0.5)
    }
    x.restore()
  }
  function canState(t) {
    if (t < T.step[0]) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.step[1]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.beam[0]) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.found) return { mood: 'neutral', look: [1, 0] }
    if (t < T.glow) return { mood: 'wide', look: [1, 0], blink: false }
    return { mood: 'heart' }
  }
  // how far Cancer is out from behind its trunk (0 hidden … 1 peeking), before it steps out
  function peekK(t) {
    let k = 0
    for (const [a, b] of T.peeks) k = Math.max(k, ease.outCubic(prog(t, a, a + 0.3)) * (1 - ease.inCubic(prog(t, b - 0.25, b))))
    return k
  }
  function drawCancer(t) {
    const fin = t >= T.cut
    let px, py, size, st
    if (fin) { px = FIN_C.x; py = FIN_C.y; size = FIN_C.size * pop01(t, T.cut + 0.05, 0.34, 2); st = { mood: t > T.h2Land + 0.2 ? 'heart' : 'happy' } }
    else if (t < T.step[0]) { px = lerp(TRUNKS[1][0] - 20, HIDE.x, peekK(t)); py = HIDE.y; size = HIDE.size; st = canState(t) }
    else { const e = ease.inOutCubic(prog(t, ...T.step)); px = lerp(HIDE.x, OUT.x, e); py = lerp(HIDE.y, OUT.y, e) - Math.abs(Math.sin(e * Math.PI * 3)) * 18; size = lerp(HIDE.size, OUT.size, e); st = canState(t) }
    const ok = sceneK(t)
    if (size * ok <= 4) return null
    const hops = fin ? [T.h2Land, T.h2Land + 0.7] : [T.found + 0.05]
    const r = drawStarChar(x, px, py, size * ok, t, { color: CAN.color, glyph: size > 200 ? CAN.glyph : null, ...st, hops, seed: 3, bob: 4 })
    const c = Math.max(2, Math.round(size * ok / 36))
    shellHat(r.x, r.top + c * 6, Math.round(c * 1.3), -0.08)
    return r
  }
  // the seeker: a bone star leaning out from behind the far trunk, with a flashlight
  function beamAngle(t) {
    // sweep the clearing, then settle on Cancer
    const sweep = prog(t, T.beam[0], T.found)
    const tgt = Math.atan2(OUT.y - 20 - (SEEK.y + 10), OUT.x - (SEEK.x - 80))
    if (sweep < 1) return lerp(tgt - 0.65, tgt + 0.15, Math.sin(sweep * Math.PI * 1.5) * 0.5 + 0.5) * (1 - sweep) + tgt * sweep
    return tgt
  }
  function drawSeeker(t) {
    if (t < T.seekIn || t >= T.cut) return
    const out = ease.outCubic(prog(t, T.seekIn, T.seekIn + 0.45))
    const px = lerp(TRUNKS[3][0] + 30, SEEK.x, out)
    const st = t < T.found ? { mood: 'squint', look: [-1, 0] } : t < T.glow ? { mood: 'wide', look: [-1, 0], blink: false } : { mood: 'heart' }
    const r = drawStarChar(x, px, SEEK.y, SEEK.size * sceneK(t), t, { color: STAR.bone, ...st, hops: [T.found + 0.05], seed: 14, bob: 4 })
    return r
  }
  function drawBeam(t) {
    if (t < T.beam[0] || t >= T.cut) return
    const k = clamp(prog(t, T.beam[0], T.beam[0] + 0.2)) * sceneK(t)
    const ox = SEEK.x - 80, oy = SEEK.y + 10, a = beamAngle(t), L = 560, spread = 0.2
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(ox, oy, 0, ox, oy, L)
    g.addColorStop(0, rgba(LAMP, 0.42 * k)); g.addColorStop(1, rgba(LAMP, 0.02 * k))
    x.fillStyle = g; x.beginPath(); x.moveTo(ox, oy); x.arc(ox, oy, L, a - spread, a + spread); x.closePath(); x.fill()
    x.restore()
    // the flashlight in its point
    bits(x, TORCH, { K: '#3a3a52', k: '#22223a', G: '#8a8aa6', L: LAMP }, ox + 10, oy, 6, { rot: a + Math.PI, a: k })
  }
  function lightPool(t) {
    const k = (t >= T.cut ? 1 : clamp(prog(t, T.found, T.glow))) * sceneK(t)
    if (k <= 0) return
    const cx = t >= T.cut ? 545 : OUT.x, cy = FLOOR - 40
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 420)
    g.addColorStop(0, rgba(LAMP, 0.32 * k)); g.addColorStop(1, rgba(LAMP, 0))
    x.fillStyle = g; x.fillRect(cx - 420, cy - 420, 840, 840)
    x.restore()
  }
  function fireflies(t) {
    const k = sceneK(t) * clamp(prog(t, 0.3, 1))
    const r = rng(17)
    for (let i = 0; i < 18; i++) {
      const bx = 60 + r() * 960, by = 760 + r() * 560, ph = r() * 6
      const a = (0.45 + 0.55 * Math.sin(t * 2.4 + ph)) * k
      const fx = Math.round(bx + Math.sin(t * 0.8 + ph) * 26), fy = Math.round(by + Math.cos(t * 0.6 + ph) * 20)
      x.fillStyle = rgba('#fff2a8', a); x.fillRect(fx, fy, 7, 7); x.fillStyle = rgba('#d8ff6a', a * 0.25); x.fillRect(fx - 6, fy - 6, 19, 19)
    }
  }
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.4
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 7) / 6 - 0.5
      bits(x, HEART, { X: '#ff4f6e' }, cx + side * 240 + Math.sin(p * 4 + i) * 14, cy - p * 200, 7, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        drawGround(t)
        lightPool(t)
        drawTrunk(t, TRUNKS[0]); drawTrunk(t, TRUNKS[2])
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right' })
        // Cancer hides behind trunk 1 until it steps out (drawn first, then the trunk over it)
        const behind = t < T.step[0] + 0.15
        if (behind) drawCancer(t)
        drawTrunk(t, TRUNKS[1])
        if (!behind) drawCancer(t)
        if (t >= T.cut) {
          const pk = pop01(t, T.cut + 0.15, 0.34, 2) * sceneK(t)
          drawStarChar(x, FIN_S.x, FIN_S.y, FIN_S.size * pk, t, { color: STAR.bone, mood: t > T.h2Land + 0.35 ? 'heart' : 'happy', hops: [T.h2Land + 0.2, T.h2Land + 0.9], seed: 14, bob: 6 })
        }
        drawSeeker(t)
        drawTrunk(t, TRUNKS[3])
        drawBeam(t)
        drawCanopy(t)
        fireflies(t)
        if (t > T.glow && t < T.cut) floatHearts(t, 680, 980, T.glow, T.close - 0.4)
        if (t >= T.cut && t > T.h2Land + 0.3) floatHearts(t, 545, 980, T.h2Land + 0.3, T.out[0])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.97 (H0 out → "Peek less") and 8.45 (box shut → "Be findable."). cardfx keeps the 8.45 one.
const CUTS = [4.97, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 1, 0.12, 0, 0.026), ['pop', T.h0 + 0.3, 1174.66, 0.045, 0],
  ...T.peeks.flatMap(([a, b]) => [['pop', a + 0.05, 880, 0.03, -0.3], ['pop', b - 0.2, 659.25, 0.025, -0.3]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...[0, 1, 2].map(i => ['tick', +(T.step[0] + 0.12 + i * 0.22).toFixed(3), 0.035]), ['pluck', T.step[1], 880, 0.03, 0.5, -0.2],
  ...wordPops(T.h1, 2, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ['pop', T.seekIn + 0.1, 587.33, 0.03, 0.4], ['tick', T.beam[0], 0.06], ['whoosh', T.beam[0], 1.1, 0.025],
  ['pop', T.found, 1318.51, 0.05, 0], ['bell', T.found + 0.05, 1760, 0.028, 1.4, 0], ['glitter', T.glow, T.glow + 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.1, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.45],
  ['bell', T.h2Land + 0.4, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
