// st4montrose (20 s vertical Align ad, Star Talk S4 EP 006, thread B1: Leo × Aquarius notice each other)
//   story 0–15.6, then the shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–5.80  "Meanwhile, in | *Montrose…*"  A generic mural wall on the left: the ♒ Aquarius star (headphones round its
//              neck) paints it with a floating roller, sunset stripes first. Across the street, the ♌ Leo star poses in its
//              own spotlight, crown on. 2.62: they lock eyes (wide), 3.05: both look away fast, blushing.
//              Drop (2.82): ♒ AQUARIUS STAR: "i don't do crushes."  The roller keeps going… and the middle of the mural
//              turns out to be a big orange star in a crown, with a heart. Aquarius pulls its headphones ON (not listening).
//   5.80–9.45  "Fixed signs. | *Opposite* sides."  THE STARS: "fixed signs on opposite sides. you'll *meet*."
//              Leo spots the mural of itself: sparkle, then heart eyes. Aquarius peeks over, and away again.
//   9.55 cut → "Opposites | *notice.*"  The street again: they take turns glancing at each other, then catch each
//              other at once, look away, both blush; hearts drift up over the road. Out by 15.45; end card at 15.6.
// One canvas (sky + street + mural + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, BEAT, pop01, outK, popOut, rgba, drawBits, CROWN, CROWN_C, sparkles, floatHearts, tipOf, headphones, drawSkyline } from './kit.js'

export const EP = 6
export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const AQU = signStar('aquarius'), LEO = signStar('leo')
const CYAN = AQU.color, ORANGE = LEO.color, ACC = '#8af0ff'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.42, h0Out: [5.6, 5.78],
  wall: 0.2, aqIn: 0.45, leoIn: 0.7, spot: 0.62,
  lock: 2.62, away: 3.05, open: 2.66, l1: BEAT(4),            // the drop: 2.82
  reveal: [3.7, 5.0], seen: 5.05, phonesOn: [5.2, 5.6],
  h1: 5.86, h1Land: 6.3, l2: 6.05, leoSees: 7.75, leoHeart: 8.25, aqPeek: [8.55, 9.0],
  close: 9.4, h1Out: [9.25, 9.43],
  cut: 9.55, h2: 9.62, h2Land: 10.0,
  g1: 10.9, g2: 11.7, both: 12.55, bothAway: 13.0, hearts: 13.1, h2Out: [15.1, 15.4], out: [15.0, 15.42],
}
const GHOST = { at: 11.0, x: 486, y: 840, from: 'left', dur: 1.4 }   // peeks round the mural wall's right edge, over the street
const AQ_TAG = `${AQU.glyph} AQUARIUS STAR`, SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: AQ_TAG, text: "i don't do crushes.", color: ACC },
  { t: T.l2, speaker: SPEAK, text: "fixed signs on opposite sides. you'll *meet*." },
]
const CPS = 30

// ── layout (dy drops the stage into the freed space after the box shuts, under the cut)
const A = { x: 285, y: 1110, size: 250 }
const L = { x: 835, y: 1095, size: 236 }
const WALL = { x: 36, y: 600, w: 452, h: 640 }          // the wall; the mural is its upper part
const MURAL = { x: 60, y: 628, w: 404, h: 330 }
const GROUND = 1240
const LOW = 150
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

const AQ_HOPS = [T.aqIn + 0.3, ...talkHops(LINES.slice(0, 1), AQ_TAG, { cps: CPS }), T.seen, T.h2Land, T.hearts]
const LEO_HOPS = [T.leoIn + 0.3, 1.6, 2.15, T.leoSees, T.leoHeart, T.h2Land + 0.1, T.hearts + 0.1]

function aqState(t) {
  if (t < T.lock) return { mood: 'neutral', look: [-0.4, -1] }               // painting (looks up at the wall)
  if (t < T.away) return { mood: 'wide', look: [1, 0], blink: false }        // eyes lock
  if (t < T.reveal[0]) return { mood: 'squint', look: [-1, 0], blink: false, blush: 1 }   // "i don't do crushes."
  if (t < T.seen) return { mood: 'neutral', look: [-0.4, -1], blush: 0.6 }
  if (t < T.phonesOn[1]) return { mood: 'wide', look: [0, 0], blink: false, blush: 1 }    // caught (looks at you)
  if (t < T.aqPeek[0]) return { mood: 'sleepy', zzz: false, blush: 0.6 }                   // headphones on, "not listening"
  if (t < T.aqPeek[1]) return { mood: 'neutral', look: [1, 0], blush: 1 }
  if (t < T.cut) return { mood: 'sleepy', zzz: false, blush: 0.6 }
  if (t < T.g1) return { mood: 'neutral', look: [-1, -0.3] }
  if (t < T.g1 + 0.6) return { mood: 'neutral', look: [1, 0] }               // glance… (Leo isn't looking)
  if (t < T.both) return { mood: 'neutral', look: [-1, -0.3] }
  if (t < T.bothAway) return { mood: 'wide', look: [1, 0], blink: false }
  return { mood: 'happy', blush: 1 }
}
function leoState(t) {
  if (t < T.lock) return { mood: 'happy', look: [0, 0] }                     // posing for you
  if (t < T.away) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.leoSees) return { mood: 'wink', look: [0, 0], blush: 1 }          // looks away, back to posing
  if (t < T.leoHeart) return { mood: 'sparkle', look: [-1, -1] }             // sees the mural
  if (t < T.cut) return { mood: 'heart' }
  if (t < T.g2) return { mood: 'happy', look: [0, 0] }
  if (t < T.g2 + 0.6) return { mood: 'neutral', look: [-1, 0] }               // glance… (Aquarius isn't looking)
  if (t < T.both) return { mood: 'happy', look: [0, 0] }
  if (t < T.bothAway) return { mood: 'wide', look: [-1, 0], blink: false }
  return { mood: 'heart' }
}
const aqPhones = t => t < T.phonesOn[0] ? 1 : t < T.cut ? 1 - ease.inOutCubic(prog(t, ...T.phonesOn)) : 1   // 1 = round the neck

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Meanwhile, in | *Montrose…*', { top: 200, size: 104, accentSize: 172, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: ACC })
  const H1 = popText(root, 'Fixed signs. | *Opposite* sides.', { top: 200, size: 104, accentSize: 150, at: T.h1, late: -1, lateAt: T.h1Land, wobble: true, accentColor: GOLD, fit: true })
  const H2 = popText(root, 'Opposites | *notice.*', { top: 200, size: 130, accentSize: 210, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // how much of the mural is painted (left → right), and where the roller is
  function revealAt(t) {
    if (t < 0.8) return 0.04
    if (t < T.lock) return lerp(0.04, 0.42, ease.inOutQuad(prog(t, 0.8, T.lock)))
    if (t < T.reveal[0]) return 0.42
    return lerp(0.42, 1, ease.inOutQuad(prog(t, ...T.reveal)))
  }
  function rollerPos(t, dy) {
    const r = revealAt(t), painting = (t > 0.8 && t < T.lock) || (t > T.reveal[0] && t < T.reveal[1])
    const zig = painting ? Math.sin(t * 9) : Math.sin(t * 1.5) * 0.15
    return { x: MURAL.x + r * MURAL.w, y: MURAL.y + MURAL.h * (0.5 + 0.38 * zig) + dy, painting }
  }

  function drawMural(t, dy, ok) {
    const W0 = WALL, M = MURAL
    x.save(); x.globalAlpha *= ok
    // brick wall
    x.fillStyle = '#4a2c3a'; x.fillRect(W0.x, W0.y + dy, W0.w, W0.h)
    for (let j = 0; j * 26 < W0.h; j++) for (let i = -1; i * 64 < W0.w; i++) {
      const bx = W0.x + i * 64 + (j % 2 ? 32 : 0), by = W0.y + dy + j * 26
      const hs = Math.sin(i * 12.9 + j * 78.2) * 437.5, r = hs - Math.floor(hs)
      x.fillStyle = r < 0.3 ? '#5b3546' : r < 0.6 ? '#553041' : '#4f2c3d'
      const L0 = Math.max(W0.x, bx + 3), R0 = Math.min(W0.x + W0.w, bx + 61)
      if (R0 > L0) x.fillRect(L0, by + 3, R0 - L0, 20)
    }
    x.fillStyle = '#2a1830'; x.fillRect(W0.x, W0.y + dy, W0.w, 10); x.fillRect(W0.x + W0.w - 8, W0.y + dy, 8, W0.h)
    // the mural, painted left → right
    const rv = revealAt(t)
    x.save(); x.beginPath(); x.rect(M.x, M.y + dy, M.w * rv, M.h); x.clip()
    const bands = ['#3b1f6e', '#6a2c8c', '#c2459a', '#f0646f', '#f7a24b', '#ffd36b']
    bands.forEach((c, i) => { x.fillStyle = c; x.fillRect(M.x, M.y + dy + i * M.h / bands.length, M.w, M.h / bands.length + 1) })
    // wavy cyan water along the bottom
    x.fillStyle = '#38c4ec'
    for (let i = 0; i < M.w; i += 10) { const h = 40 + 12 * Math.sin(i * 0.05); x.fillRect(M.x + i, M.y + dy + M.h - h, 10, h) }
    x.fillStyle = '#9cecff'
    for (let i = 0; i < M.w; i += 10) { const h = 40 + 12 * Math.sin(i * 0.05); x.fillRect(M.x + i, M.y + dy + M.h - h, 10, 8) }
    // little painted stars
    ;[[0.12, 0.18], [0.3, 0.1], [0.22, 0.45], [0.5, 0.06]].forEach(([u, v], i) => drawPixelStar(x, M.x + u * M.w, M.y + dy + v * M.h, 30, i % 2, '#fff3c4'))
    // the crush: a big orange star with a crown and a heart (painted, so flat: no glow, no blinking)
    const SX = M.x + M.w * 0.66, SY = M.y + dy + M.h * 0.56
    drawStarChar(x, SX, SY, 190, 0, { color: ORANGE, glyph: null, mood: 'heart', bob: 0, glow: 0, blink: false, tips: false, blush: 1 })
    drawBits(x, CROWN, CROWN_C, SX, SY - 104, 7)
    drawBits(x, ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86', W: '#ffd1de' }, M.x + M.w * 0.92, M.y + dy + M.h * 0.3, 10)
    x.restore()
    // wet edge drips
    if (rv > 0.05 && rv < 1) for (let k = 0; k < 4; k++) {
      const dx = M.x + M.w * rv - 6, dl = 10 + 16 * ((Math.sin(k * 3.1 + t * 2) + 1) / 2)
      x.fillStyle = '#f7a24b'; x.fillRect(dx, M.y + dy + 40 + k * 80, 6, dl)
    }
    // a frame line under the mural + a paint tray on the sidewalk
    x.fillStyle = '#2a1830'; x.fillRect(M.x - 6, M.y + dy + M.h, M.w + 12, 8)
    x.restore()
  }
  function drawRoller(t, dy, ok, pop) {
    if (pop <= 0.02 || ok <= 0) return
    const R = rollerPos(t, dy), c = 6
    x.save(); x.globalAlpha *= ok
    x.translate(R.x, R.y); x.scale(pop, pop)
    // the handle runs down-right toward Aquarius
    x.fillStyle = INK; x.fillRect(-4, 18, 12, 120); x.fillStyle = '#c98a1f'; x.fillRect(-1, 20, 6, 116)
    x.fillStyle = INK; x.fillRect(-14 * c / 2 - 6, -30, 14 * c + 12, 60)
    x.fillStyle = '#f7a24b'; x.fillRect(-14 * c / 2, -24, 14 * c, 48)
    x.fillStyle = '#ffd36b'; x.fillRect(-14 * c / 2, -24, 14 * c, 10)
    x.fillStyle = '#c2459a'; x.fillRect(-14 * c / 2, 14, 14 * c, 10)
    x.restore()
  }
  function drawStreet(t, dy, ok) {
    x.save(); x.globalAlpha *= ok
    const G = GROUND + dy
    // a far, generic skyline down the street, between the wall and Leo
    x.save(); x.beginPath(); x.rect(WALL.x + WALL.w, 0, 1080, G); x.clip()
    drawSkyline(x, t, { y: G - 120, scale: 0.42, alpha: 0.85, ox: 140, lit: 0.28 })
    x.restore()
    // ground: sidewalks + the street between them
    x.fillStyle = '#1d1440'; x.fillRect(0, G - 120, 1080, 2000)
    x.fillStyle = '#2b2160'; x.fillRect(0, G, 480, 210); x.fillRect(680, G, 400, 210)          // sidewalks
    x.fillStyle = '#3a2d78'; x.fillRect(0, G, 480, 8); x.fillRect(680, G, 400, 8)
    x.fillStyle = '#120c2c'; x.fillRect(480, G - 120, 200, 400)                               // the street
    x.fillStyle = '#ffd36b'
    for (let j = 0; j < 7; j++) x.fillRect(574, G - 110 + j * 52, 12, 28)                      // lane dashes
    x.fillStyle = '#4a3a8c'; x.fillRect(472, G - 120, 8, 400); x.fillRect(680, G - 120, 8, 400) // curbs
    x.restore()
  }
  function drawSpot(t, dy, ok) {
    const k = t - T.spot
    let on = k < 0 ? 0 : k < 0.05 ? 1 : k < 0.1 ? 0.25 : 1
    on *= ok
    if (on <= 0) return
    const PY = GROUND + dy + 10, R = 190, cx = L.x
    // the spotlight on a pole, top right
    x.save()
    x.fillStyle = INK; x.fillRect(1000, 560 + dy, 14, PY - 560 - dy)
    x.fillStyle = '#3a2a6e'; x.fillRect(1003, 560 + dy, 8, PY - 560 - dy)
    x.translate(990, 560 + dy); x.rotate(0.5)
    x.fillStyle = INK; x.fillRect(-46, -26, 70, 52); x.fillStyle = '#5a4a9e'; x.fillRect(-40, -20, 58, 40); x.fillStyle = '#fff3d6'; x.fillRect(-46, -18, 8, 36)
    x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 560 + dy, 0, PY)
    g.addColorStop(0, `rgba(255,236,190,${0.24 * on})`); g.addColorStop(1, `rgba(255,190,120,${0.12 * on})`)
    x.fillStyle = g
    x.beginPath(); x.moveTo(955, 545 + dy); x.lineTo(975, 600 + dy); x.lineTo(cx + R, PY); x.lineTo(cx - R, PY); x.closePath(); x.fill()
    x.translate(cx, PY); x.scale(1, 0.2)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, R * 1.1)
    p.addColorStop(0, `rgba(255,214,150,${0.45 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, R * 1.1, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  /** a quick "look-away" whoosh streak beside a star */
  function zip(cx, cy, dir, t0, t) {
    const p = prog(t, t0, t0 + 0.35)
    if (p <= 0 || p >= 1) return
    x.save(); x.globalAlpha = 1 - p; x.fillStyle = BONE
    for (let i = 0; i < 3; i++) x.fillRect(cx + dir * (60 + p * 80) - (dir < 0 ? 70 : 0), cy - 40 + i * 34, 70, 6)
    x.restore()
  }
  function eyeLine(t, dy) {   // a pixel dotted sightline when their eyes lock
    const on = (t > T.lock && t < T.away) || (t > T.both && t < T.bothAway)
    if (!on) return
    const t0 = t < T.away ? T.lock : T.both, p = clamp((t - t0) / 0.2)
    const ax = A.x + 80, bx = L.x - 80, y0 = A.y - 20 + dy, y1 = L.y - 20 + dy
    x.save(); x.fillStyle = PINK
    for (let i = 0; i < 14 * p; i++) { const u = i / 13; x.fillRect(lerp(ax, bx, u) - 5, lerp(y0, y1, u) - 5, 10, 10) }
    drawPixelStar(x, (ax + bx) / 2, (y0 + y1) / 2 - 30, 40 * p, 1, '#fff3c4')
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      if (ok > 0) {
        const wallK = easeOutBack(prog(t, T.wall, T.wall + 0.45), 1.4)
        drawStreet(t, dy, ok)
        x.save(); x.translate(0, (1 - wallK) * 900); drawMural(t, dy, ok); x.restore()
        drawGhostCameo(x, t, { ...GHOST, y: GHOST.y + dy })
        drawSpot(t, dy, ok)
        // Leo, posing in its spotlight, crown on
        const lp = pop01(t, T.leoIn, 0.34, 2.1) * ok
        if (lp > 0.02) {
          const pose = t < T.lock ? 0.05 * Math.sin(t * 6) : 0
          const lo = { color: ORANGE, glyph: LEO.glyph, ...leoState(t), hops: LEO_HOPS, pop: lp, seed: 3, glow: 1.1, squash: pose }
          const r = drawStarChar(x, L.x, L.y + dy, L.size, t, lo)
          const tip = tipOf(t, r, L.size, lp, lo)
          drawBits(x, CROWN, CROWN_C, tip.x, tip.y - 8 * lp, 6 * lp)
          if (t > T.leoSees) sparkles(x, t, L.x, L.y + dy, T.leoSees, 10, 170, 2, [GOLD, ORANGE, BONE, PINK])
          if (t > T.leoHeart && t < T.cut) floatHearts(x, t, L.x, L.y + dy - 60, T.leoHeart, T.close - 0.3, 3, 6, 160)
        }
        // Aquarius at the wall, roller floating beside it
        const ap = pop01(t, T.aqIn, 0.36, 2.0) * ok
        if (ap > 0.02) {
          const ao = { color: CYAN, glyph: AQU.glyph, ...aqState(t), hops: AQ_HOPS, pop: ap, seed: 8, glow: 1.0 }
          const r = drawStarChar(x, A.x, A.y + dy, A.size, t, ao)
          headphones(x, r, A.size * ap, aqPhones(t))
          if (t < T.cut) drawRoller(t, dy, ok, ap)
          sparkles(x, t, r.x, r.y - A.size * 0.5, T.phonesOn[1] - 0.1, 8, 120, 1, ['#ff4fd8', ACC, BONE])
        }
        zip(A.x - 80, A.y + dy - 40, -1, T.away, t); zip(L.x + 80, L.y + dy - 40, 1, T.away, t)
        zip(A.x - 80, A.y + dy - 40, -1, T.bothAway, t); zip(L.x + 80, L.y + dy - 40, 1, T.bothAway, t)
        eyeLine(t, dy)
        sparkles(x, t, MURAL.x + MURAL.w * 0.66, MURAL.y + MURAL.h * 0.56 + dy, T.reveal[1] - 0.1, 12, 170, 0)
        if (t > T.hearts) floatHearts(x, t, 580, 1000 + dy, T.hearts, T.out[0] - 0.5, 1, 7, 260)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.82 (H0 → H1 while the box talks: inert) and 9.55 (box shut → "Opposites notice.").
const CUTS = [5.82, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.wall, 0.4, 0.03], ['pop', T.aqIn + 0.05, 659.25, 0.035, -0.4], ['tick', T.spot, 0.05], ['tick', T.spot + 0.1, 0.04], ['pop', T.leoIn + 0.05, 880, 0.035, 0.4],
  ['bell', T.lock, 1567.98, 0.03, 1.0, 0], ['whoosh', T.away, 0.22, 0.04], ['pop', T.away + 0.02, 440, 0.03, -0.3], ['pop', T.away + 0.05, 440, 0.03, 0.3],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [AQ_TAG]: 1046.5, [SPEAK]: 880 } }),
  ['glitter', T.reveal[1] - 0.1, T.reveal[1] + 0.5], ['pop', T.seen, 523.25, 0.04, -0.3], ['tick', T.phonesOn[1], 0.04],
  ...wordPops(T.h1, 3, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['bell', T.leoSees, 1318.51, 0.03, 1.0, 0.4], ['pluck', T.leoHeart, 1174.66, 0.04, 0.5, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 1, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['tick', T.g1, 0.03], ['tick', T.g2, 0.03], ['bell', T.both, 1567.98, 0.03, 1.0, 0], ['whoosh', T.bothAway, 0.22, 0.04],
  ['pluck', T.hearts, 1318.51, 0.035, 0.5, 0], ['bell', T.hearts + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
