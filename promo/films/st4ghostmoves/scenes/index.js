// st4ghostmoves (15 s vertical Align ad, Star Talk S4 EP 008, thread C1: the ghost moves to Houston) · story 0–10.6,
//   then the shared end card. The ghost (stghost's sheet, drawn with stlore's drawGhostSheet) is the star this time.
//   0.00–4.40  "The ghost moved | to *Houston.*"  A moving box thumps down on the floor of a new place, the skyline out
//              back. The ghost rises out from behind it and unpacks: a potted plant, a mug, a string of fairy lights.
//              Its phone pops up: "had fun last night! :)" … "Seen · 3 days ago". The ghost sinks behind the box (old
//              habits). Drop (2.82): THE GHOST: "new city. i'm being *better*." It rises back up, determined.
//   4.40–8.30  "No more | *ghosting.*"  It types a reply and sends it: "had fun, but we're not a match. good luck!"
//              (Delivered ✓). THE STARS: "proud of you." The ghost blushes; little hearts.
//   8.40 cut → "New city. | *Kind* goodbyes."  The ghost among its unpacked things, fairy lights on; a reply comes back:
//              "appreciate you saying so. good luck too!" Out by 10.45; end card at 10.6.
// One canvas (sky + skyline + floor + box + ghost + phone), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostSheet, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, LAV, MONO, INTER, BEAT, pop01, outK, popOut, rgba, drawBits, sparkles, floatHearts, drawSkyline } from './kit.js'

export const EP = 8
export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const ICE = '#bfe0ff'

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [4.22, 4.4],
  boxIn: 0.3, ghostUp: [0.7, 1.15], plant: 1.25, mug: 1.55, lights: 1.85,
  phoneIn: 2.05, seen: 2.3, sink: [2.35, 2.6], open: 2.62, l1: BEAT(4), rise: [3.1, 3.5],     // the drop: 2.82
  h1: 4.46, h1Land: 4.8, type: [4.75, 5.85], send: 5.95, delivered: 6.25, l2: 6.4, blush: 6.95, hearts: 7.0,
  close: 8.3, h1Out: [8.14, 8.32],
  cut: 8.42, h2: 8.5, h2Land: 8.88, reply: 8.7, h2Out: [10.2, 10.42], out: [10.1, 10.45],
}
const GH_TAG = 'THE GHOST', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: GH_TAG, text: "new city. i'm being *better*.", color: ICE },
  { t: T.l2, speaker: SPEAK, text: 'proud of you.' },
]
const CPS = 30
const DRAFT = "had fun, but we're not a match. good luck!"
const THEIRS = 'had fun last night! :)'
const REPLY = 'appreciate you saying so. good luck too!'

// ── layout
const FLOOR = 1330
const BOX = { x: 330, y: 1215, w: 440, h: 250 }       // centre
const GH = { x: 330, y: 955, cell: 11 }
const PHONE = { x: 820, y: 930, w: 380, h: 620 }
const LOW = 110
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))

const PLANT = ['...gg...', '..gGg.g.', '.g.gGgG.', 'gGg.gg..', '.gGggGg.', '...gg...', '.tttttt.', '.TTTTTT.', '..TTTT..', '..TTTT..']
const PLANT_C = { g: '#5fbf6a', G: '#9be08a', t: '#e0794a', T: '#b85a32' }
const MUG = ['.MMMM...', '.MWMM.M.', '.MMMMM.M', '.MMMM..M', '.MMMMMM.', '.MMMM...', 'ssssss..']
const MUG_C = { M: '#ff8fb1', W: '#ffd1de', s: '#7a5aa8' }

function ghostLook(t) {
  if (t < T.phoneIn) return { look: [0, 0] }
  if (t < T.sink[1]) return { look: [1, 0], wide: true }
  if (t < T.rise[0]) return { look: [1, 0.4], wide: true }
  if (t < T.h1) return { look: [0, 0] }
  if (t < T.send + 0.2) return { look: [1, 0] }
  if (t < T.blush) return { look: [0, 0], wide: true }
  if (t < T.reply) return { look: [0, 0], blush: 1 }
  return { look: [1, 0], blush: 1 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "500 26px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The ghost moved | to *Houston.*', { top: 200, size: 100, accentSize: 168, fit: true, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'No more | *ghosting.*', { top: 200, size: 120, accentSize: 186, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: ICE })
  const H2 = popText(root, 'New city. | *Kind* goodbyes.', { top: 200, size: 118, accentSize: 176, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function wrap(text, maxW) {
    const words = text.split(' '), rows = []
    let cur = ''
    for (const w of words) { const n = cur ? cur + ' ' + w : w; if (x.measureText(n).width > maxW && cur) { rows.push(cur); cur = w } else cur = n }
    if (cur) rows.push(cur)
    return rows
  }
  /** a chat bubble; side 1 = mine (right, gold), -1 = theirs (left, lilac). Returns its height. */
  function bubble(text, side, bx, by, maxW, a = 1) {
    x.font = `500 30px ${INTER}`
    const rows = wrap(text, maxW - 36), lh = 37, bw = Math.min(maxW, Math.max(...rows.map(r => x.measureText(r).width)) + 36), bh = rows.length * lh + 26
    const L0 = side > 0 ? bx + maxW - bw : bx
    x.save(); x.globalAlpha *= a
    x.fillStyle = side > 0 ? GOLD : '#3d2c78'; x.beginPath(); x.roundRect(L0, by, bw, bh, 20); x.fill()
    x.fillStyle = side > 0 ? INK : BONE; x.textBaseline = 'top'; x.textAlign = 'left'
    rows.forEach((r, i) => x.fillText(r, L0 + 18, by + 14 + i * lh))
    x.restore()
    return bh
  }

  function drawPhone(t, dy, ok) {
    const pin = easeOutBack(prog(t, T.phoneIn, T.phoneIn + 0.36), 1.7) * ok
    if (pin <= 0.01) return
    const P = PHONE, buzz = t > T.phoneIn && t < T.phoneIn + 0.5 ? Math.sin(t * 80) * 0.03 : 0
    x.save(); x.translate(P.x, P.y + dy + Math.sin(t * 1.6) * 6); x.rotate(0.04 + buzz); x.scale(pin, pin)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-P.w / 2 - 10, -P.h / 2 - 10, P.w + 20, P.h + 20, 46); x.fill()
    x.fillStyle = '#3a2a6e'; x.beginPath(); x.roundRect(-P.w / 2, -P.h / 2, P.w, P.h, 38); x.fill()
    const sw = P.w - 30, sh = P.h - 40, L0 = -sw / 2, T0 = -sh / 2
    x.save(); x.beginPath(); x.roundRect(L0, T0, sw, sh, 26); x.clip()
    x.fillStyle = '#120a28'; x.fillRect(L0, T0, sw, sh)
    // header: a veiled avatar + "them"
    x.fillStyle = '#20163f'; x.fillRect(L0, T0, sw, 70)
    x.fillStyle = LAV; x.beginPath(); x.arc(L0 + 44, T0 + 38, 20, 0, Math.PI * 2); x.fill()
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillText('them', L0 + 76, T0 + 38)
    const inner = sw - 36
    let y = T0 + 92
    // the thread scrolls up a little when mine is sent
    const sent = ease.outCubic(prog(t, T.send, T.send + 0.35))
    y -= 40 * sent + 70 * ease.outCubic(prog(t, T.reply, T.reply + 0.35))
    y += bubble(THEIRS, -1, L0 + 18, y, inner * 0.82) + 8
    const seenA = 1 - sent
    if (t > T.seen && seenA > 0.01) {
      x.save(); x.globalAlpha = seenA * clamp((t - T.seen) / 0.15); x.font = `700 22px ${MONO}`; x.fillStyle = '#ff7a8a'; x.textBaseline = 'top'
      const pulse = t < T.rise[0] ? 0.7 + 0.3 * Math.sin(t * 14) : 1
      x.globalAlpha *= pulse; x.fillText('Seen · 3 days ago', L0 + 22, y); x.restore()
    }
    y += 40
    if (t > T.send) {
      const k = ease.outCubic(prog(t, T.send, T.send + 0.3))
      y += bubble(DRAFT, 1, L0 + 18 + (1 - k) * 0, y + (1 - k) * 200, inner, k) + 6
      if (t > T.delivered) { x.font = `700 21px ${MONO}`; x.fillStyle = '#9be08a'; x.textAlign = 'right'; x.textBaseline = 'top'; x.globalAlpha = clamp((t - T.delivered) / 0.15); x.fillText('Delivered ✓', L0 + sw - 22, y); x.globalAlpha = 1 }
      y += 36
    }
    if (t > T.reply) {
      const k = easeOutBack(prog(t, T.reply, T.reply + 0.3), 1.6)
      x.save(); x.translate(L0 + 18, y); x.scale(k, k); bubble(REPLY, -1, 0, 0, inner * 0.86); x.restore()
    }
    // the input bar + the draft being typed
    const by = T0 + sh - 74
    x.fillStyle = '#20163f'; x.fillRect(L0, by - 10, sw, 84)
    x.fillStyle = '#2b2160'; x.beginPath(); x.roundRect(L0 + 14, by, sw - 28, 54, 27); x.fill()
    const n = t < T.type[0] ? 0 : t >= T.send ? 0 : Math.floor(DRAFT.length * prog(t, ...T.type))
    x.font = `500 26px ${INTER}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    let shown = DRAFT.slice(0, n)
    while (x.measureText(shown).width > sw - 90 && shown.length) shown = shown.slice(1)
    x.fillStyle = n ? BONE : '#6a5aa8'; x.fillText(n ? shown : (t < T.send ? 'message…' : 'message…'), L0 + 34, by + 28)
    if (n && t < T.send && Math.floor(t * 4) % 2) { x.fillStyle = GOLD; x.fillRect(L0 + 36 + x.measureText(shown).width, by + 14, 3, 28) }
    x.restore()
    x.restore()
  }

  function drawBoxFront(t, dy, ok) {
    const k = easeOutBack(prog(t, T.boxIn, T.boxIn + 0.3), 1.6), drop = (1 - prog(t, T.boxIn, T.boxIn + 0.22)) * -900
    if (t < T.boxIn) return
    const B = BOX, cx = B.x, cy = B.y + dy + drop
    x.save(); x.translate(cx, cy + B.h / 2); x.scale(lerp(1.15, 1, k), lerp(0.85, 1, k)); x.globalAlpha *= ok
    x.fillStyle = INK; x.fillRect(-B.w / 2 - 6, -B.h - 6, B.w + 12, B.h + 12)
    x.fillStyle = '#c98a4a'; x.fillRect(-B.w / 2, -B.h, B.w, B.h)
    x.fillStyle = '#e0a462'; x.fillRect(-B.w / 2, -B.h, B.w, 14)
    x.fillStyle = '#a86c34'; x.fillRect(-B.w / 2, -B.h + 14, B.w, 8)
    // open flaps
    x.fillStyle = INK; x.beginPath(); x.moveTo(-B.w / 2 - 6, -B.h); x.lineTo(-B.w / 2 - 60, -B.h - 54); x.lineTo(-B.w / 2 - 22, -B.h - 60); x.lineTo(-B.w / 2 + 30, -B.h); x.fill()
    x.beginPath(); x.moveTo(B.w / 2 + 6, -B.h); x.lineTo(B.w / 2 + 60, -B.h - 54); x.lineTo(B.w / 2 + 22, -B.h - 60); x.lineTo(B.w / 2 - 30, -B.h); x.fill()
    x.fillStyle = '#d99856'; x.beginPath(); x.moveTo(-B.w / 2, -B.h); x.lineTo(-B.w / 2 - 50, -B.h - 48); x.lineTo(-B.w / 2 - 24, -B.h - 52); x.lineTo(-B.w / 2 + 24, -B.h); x.fill()
    x.beginPath(); x.moveTo(B.w / 2, -B.h); x.lineTo(B.w / 2 + 50, -B.h - 48); x.lineTo(B.w / 2 + 24, -B.h - 52); x.lineTo(B.w / 2 - 24, -B.h); x.fill()
    // tape + marker label
    x.fillStyle = '#e8d29a'; x.fillRect(-26, -B.h, 52, B.h)
    x.fillStyle = INK; x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('HTX', -100, -B.h / 2 + 10); x.fillText('♥', 100, -B.h / 2 + 10)
    x.restore()
  }
  function fairyLights(t, dy, ok) {
    const k = prog(t, T.lights, T.lights + 0.6)
    if (k <= 0) return
    const n = 12, x0 = BOX.x - BOX.w / 2 - 40, x1 = BOX.x + BOX.w / 2 + 40, y0 = BOX.y + dy - 70
    x.save(); x.globalAlpha *= ok
    x.strokeStyle = '#2a7a4a'; x.lineWidth = 3; x.beginPath()
    for (let i = 0; i <= 40 * k; i++) { const u = i / 40; const px = lerp(x0, x1, u), py = y0 + Math.sin(u * Math.PI * 3) * 26 + 30 * Math.sin(u * Math.PI); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
    const cols = [GOLD, PINK, '#7fdcff', '#9be08a']
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1); if (u > k) break
      const px = lerp(x0, x1, u), py = y0 + Math.sin(u * Math.PI * 3) * 26 + 30 * Math.sin(u * Math.PI) + 10
      const on = t > T.cut ? 0.7 + 0.3 * Math.sin(t * 5 + i * 1.7) : 0.6
      x.fillStyle = rgba(cols[i % 4], 0.25 * on); x.beginPath(); x.arc(px, py, 18, 0, Math.PI * 2); x.fill()
      x.fillStyle = cols[i % 4]; x.fillRect(Math.round(px - 6), Math.round(py - 8), 12, 16)
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out), dy = LOW * lowK(t)
      // the new place: skyline out back, a warm floor
      drawSkyline(x, t, { y: FLOOR + dy - 40, scale: 0.62, alpha: 0.9 * ok, lit: 0.35 })
      x.save(); x.globalAlpha = ok
      const fl = x.createLinearGradient(0, FLOOR + dy - 40, 0, 1920); fl.addColorStop(0, '#2a1a3e'); fl.addColorStop(1, '#0d0820')
      x.fillStyle = fl; x.fillRect(0, FLOOR + dy - 40, 1080, 1920)
      x.fillStyle = '#3d2756'; for (let i = 0; i < 6; i++) x.fillRect(0, FLOOR + dy - 40 + 6 + i * 70, 1080, 3)
      x.restore()
      if (ok > 0) {
        // the ghost: rises from behind the box, sinks at "Seen", rises again
        const up = ease.outBack(prog(t, ...T.ghostUp)) - 0.55 * ease.inOutCubic(prog(t, ...T.sink)) + 0.55 * ease.outBack(prog(t, ...T.rise))
        if (up > 0.01) {
          const gl = ghostLook(t), hop = t > T.blush && t < T.blush + 0.4 ? -30 * Math.sin(Math.PI * (t - T.blush) / 0.4) : 0
          const gy = BOX.y + 120 + dy - lerp(0, BOX.y + 120 - GH.y, up) + hop + Math.sin(t * 2.2) * 8
          x.save(); x.beginPath(); x.rect(0, 0, 1080, BOX.y + BOX.h / 2 + dy); x.clip()
          drawGhostSheet(x, t, GH.x, gy, GH.cell, { look: gl.look, wide: !!gl.wide, blush: gl.blush || 0, alpha: ok, rot: t > T.send && t < T.send + 0.3 ? 0.08 * Math.sin((t - T.send) * 30) : 0 })
          x.restore()
        }
        drawBoxFront(t, dy, ok)
        // unpacked things
        const pk = pop01(t, T.plant, 0.34, 2.2) * ok, mk = pop01(t, T.mug, 0.34, 2.2) * ok
        if (pk > 0.02) drawBits(x, PLANT, PLANT_C, lerp(BOX.x, 90, ease.outCubic(prog(t, T.plant, T.plant + 0.3))), BOX.y + dy + 70 - Math.sin(Math.PI * prog(t, T.plant, T.plant + 0.3)) * 200, 11 * pk)
        if (mk > 0.02) drawBits(x, MUG, MUG_C, lerp(BOX.x, 560, ease.outCubic(prog(t, T.mug, T.mug + 0.3))), BOX.y + dy + 105 - Math.sin(Math.PI * prog(t, T.mug, T.mug + 0.3)) * 220, 9 * mk)
        fairyLights(t, dy, ok)
        drawPhone(t, dy, ok)
        sparkles(x, t, PHONE.x, PHONE.y + dy - 120, T.send, 10, 160, 1)
        if (t > T.hearts) floatHearts(x, t, GH.x, GH.y + dy - 150, T.hearts, T.out[0] - 0.3, 3, 6, 200)
        sparkles(x, t, GH.x, GH.y + dy - 60, T.rise[1] - 0.1, 8, 170, 2, [ICE, BONE, GOLD])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.44 (inert: H0 → H1 while the box talks) and 8.42 (box shut → "New city. Kind goodbyes.").
const CUTS = [4.44, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['whoosh', T.boxIn - 0.1, 0.3, 0.03], ['boom', T.boxIn + 0.22, 0.1], ['whoosh', T.ghostUp[0], 0.5, 0.025],
  ['pop', T.plant + 0.3, 659.25, 0.035, -0.4], ['pop', T.mug + 0.3, 783.99, 0.035, 0.2], ['glitter', T.lights, T.lights + 0.6],
  ['pop', T.phoneIn, 880, 0.04, 0.4], ['tick', T.phoneIn + 0.1, 0.03], ['tick', T.phoneIn + 0.25, 0.03], ['pop', T.sink[0], 392, 0.03, -0.2],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GH_TAG]: 1174.66, [SPEAK]: 880 } }),
  ['whoosh', T.rise[0], 0.4, 0.025],
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.type[0] + i * 0.11).toFixed(3), 0.014]),
  ['whoosh', T.send, 0.3, 0.04], ['pop', T.send + 0.05, 1318.51, 0.04, 0.4], ['bell', T.delivered, 1567.98, 0.025, 0.8, 0.4],
  ['pluck', T.blush, 1174.66, 0.04, 0.5, -0.2], ['bell', T.hearts, 1760, 0.02, 1.0, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pop', T.h2Land + 0.14, 1174.66, 0.05, 0],
  ['pop', T.reply, 987.77, 0.04, 0.4], ['pluck', T.reply + 0.05, 1318.51, 0.035, 0.6, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
