// sr07aura (20 s vertical Align ad, Star Talk Remix of teaser 07 "What color is your aura?") · story 0–15.6, then the
// end card. The teaser's aura-camera prints are now taken by THE STARS, who run a little aura photo booth.
//   0.00–3.00  "What color is | your *aura?*"  THE STARS (gold) with a pixel instant camera. THE STARS: "hold still. say
//              cheese."  ♌ Leo hops in and poses (sparkle eyes). FLASH: the print ejects, sweeps the spectrum, lands gold.
//   3.10–5.50  "Leo? | *Gold.*"  print strip: LEO · GOLD / MAIN CHARACTER.
//   5.40–7.90  "Pisces? | *Sea green.*"  ♓ Pisces hops in already crying. FLASH: sea green / FEELS EVERYTHING.
//   7.90–10.3  "Scorpio? | *Nice try.*"  ♏ Scorpio squints and hops right up against the lens. FLASH: the print comes out
//              black except two squinting eyes. ♏ SCORPIO: "no photos."
//   10.4–13.4  "And *you?*"  The camera turns to face you. Big flash. Your print develops… and keeps cycling through every
//              colour, a gold "?" on it. THE STARS: "your aura says what your bio won't."
//   13.55 card flip → "What color | is *yours?*"  The three prints fan out round your "?" print; the three subjects pop up
//              under them. Everything pops out by 15.45.
// One canvas (sky + booth + prints), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, LAV, pop01, outK, popOut, drawBits, QMARK, starGeom, tears, sparkles } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const MONO = "'Space Mono', ui-monospace, monospace"
const LEO = signStar('leo'), PIS = signStar('pisces'), SCO = signStar('scorpio')

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [2.95, 3.1], gIn: 0.3, camIn: 0.5, open: 0.85, l1: 1.0, close: 13.42,
  h1: 3.15, h1Land: 3.4, h1Out: [5.3, 5.45],
  h2: 5.55, h2Land: 5.8, h2Out: [7.75, 7.9],
  h3: 7.98, h3Land: 8.25, h3Out: [10.2, 10.35], l2: 8.95,
  h4: 10.45, h4Land: 10.7, h4Out: [13.25, 13.42], turn: [10.4, 10.75], l3: 10.6,
  h5: 13.7, h5Land: 14.05, fan: [13.6, 14.1], h5Out: [15.15, 15.4], out: [15.05, 15.45],
}
// the sitters: hop in, flash, hop out; each makes a print
const SIT = [
  { id: 'leo', star: LEO, in: 1.55, flash: 2.4, out: 5.25, aura: '#ffc23a', name: 'LEO', col: 'GOLD', trait: 'MAIN CHARACTER', mood: 'sparkle' },
  { id: 'pis', star: PIS, in: 5.45, flash: 6.15, out: 7.75, aura: '#2fe6c0', name: 'PISCES', col: 'SEA GREEN', trait: 'FEELS EVERYTHING', mood: 'happy', cry: true },
  { id: 'sco', star: SCO, in: 7.95, flash: 8.75, out: 10.2, aura: '#120a22', name: 'SCORPIO', col: '???', trait: 'NICE TRY', mood: 'squint', block: true },
]
const YOU = { flash: 10.95, name: 'YOU', col: '???', trait: "LET'S FIND OUT" }
const LINES = [
  { t: T.l1, speaker: 'THE STARS', text: 'hold still. say *cheese.*' },
  { t: T.l2, speaker: '♏ SCORPIO STAR', text: 'no *photos.*', color: SCO.color },
  { t: T.l3, speaker: 'THE STARS', text: "your aura says what your bio *won't.*" },
]
const CPS = 27

// ── layout
const PH = { x: 250, y: 1230, size: 270 }          // the photographer
const CAM = { x: 470, y: 1150 }                     // camera (side view, lens to the right)
const SITTER = { x: 830, y: 1230, size: 260 }
const PRINT = { x: 540, y: 720, w: 340, h: 410 }
const PILE = [{ x: 205, y: 760, rot: -0.22 }, { x: 875, y: 760, rot: 0.2 }, { x: 540, y: 700, rot: 0.04 }]

const G_HOPS = [T.gIn + 0.3, ...talkHops(LINES.slice(0, 1), 'THE STARS', { cps: CPS }), ...SIT.map(s => s.flash + 0.05), ...talkHops(LINES.slice(2), 'THE STARS', { cps: CPS }), T.h5Land]
const flashK = (t, f, d = 0.3) => (t >= f && t < f + d ? 1 - (t - f) / d : 0)
const hue = (h, s = 90, l = 60) => `hsl(${((h % 360) + 360) % 360},${s}%,${l}%)`

function gState(t) {
  for (const s of SIT) if (t >= s.flash - 0.1 && t < s.flash + 0.35) return { mood: 'squint', look: [1, 0] }
  if (t >= T.turn[0] && t < YOU.flash + 0.4) return { mood: 'happy' }
  if (t >= T.l3 + 1.5 && t < T.fan[0]) return { mood: 'sparkle', look: [0, 0] }
  if (t >= T.fan[0]) return { mood: 'happy' }
  return { mood: 'neutral', look: [1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(['800 112px Inter', "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'What color is | your *aura?*', { top: 200, size: 116, accentSize: 186, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, 'Leo? | *Gold.*', { top: 150, size: 112, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: '#ffc23a', lineHeight: 0.92 })
  const H2 = popText(root, 'Pisces? | *Sea green.*', { top: 150, size: 112, accentSize: 170, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: '#2fe6c0', lineHeight: 0.92 })
  const H3 = popText(root, 'Scorpio? | *Nice try.*', { top: 150, size: 112, accentSize: 170, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: SCO.color, lineHeight: 0.92 })
  const H4 = popText(root, 'And *you?*', { top: 230, size: 132, accentSize: 200, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GOLD })
  const H5 = popText(root, 'What color | is *yours?*', { top: 170, size: 120, accentSize: 190, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: PINK, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flashEl = el('div', { position: 'absolute', inset: 0, background: '#fff', opacity: 0 }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── a print: cream frame, the aura window, the strip with name/colour and trait
  function drawPrint(t, p, cx, cy, sc, rot, alpha = 1) {
    if (sc <= 0.01 || alpha <= 0) return
    const { w, h } = PRINT
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#f5ecd8'; x.fillRect(-w / 2, -h / 2, w, h)
    const m = 22, ww = w - 2 * m, wh = w - 2 * m, wy = -h / 2 + m
    x.save(); x.beginPath(); x.rect(-ww / 2, wy, ww, wh); x.clip()
    const dev = clamp((t - p.flash - 0.15) / 1.0)                // developing 0 → 1
    const wcx = 0, wcy = wy + wh / 2
    if (p.you) {
      const hh = (t - p.flash) * 160
      const g = x.createRadialGradient(wcx, wcy + 40, 10, wcx, wcy + 40, ww * 0.8)
      g.addColorStop(0, hue(hh + 60, 100, 85)); g.addColorStop(0.35, hue(hh, 95, 62)); g.addColorStop(0.75, hue(hh - 70, 85, 45)); g.addColorStop(1, '#1a0f3a')
      x.fillStyle = g; x.fillRect(-ww / 2, wy, ww, wh)
      x.globalAlpha *= 1 - dev; x.fillStyle = '#f7f1e4'; x.fillRect(-ww / 2, wy, ww, wh); x.globalAlpha = alpha
      const qk = pop01(t, p.flash + 0.9, 0.4, 2.4)
      if (qk > 0) drawBits(x, QMARK, { Y: '#f7c948', g: '#fff1c8' }, wcx, wcy + Math.sin(t * 2.6) * 6, 16 * qk, { rot: 0.06 * Math.sin(t * 2.1) })
    } else {
      const sweep = clamp((t - p.flash - 0.1) / 0.8)
      const settle = ease.inOutCubic(clamp((t - p.flash - 0.75) / 0.35))
      const g = x.createRadialGradient(wcx, wcy + 30, 10, wcx, wcy + 30, ww * 0.8)
      const swH = sweep * 300
      const c0 = p.block ? '#120a22' : p.aura
      g.addColorStop(0, settle < 1 ? hue(swH + 40, 100, 80) : '#fff6dc'); g.addColorStop(0.4, settle < 0.5 ? hue(swH, 95, 58) : c0); g.addColorStop(1, '#1a0f3a')
      x.fillStyle = g; x.fillRect(-ww / 2, wy, ww, wh)
      if (p.block) { x.globalAlpha = alpha * settle; x.fillStyle = '#0b0614'; x.fillRect(-ww / 2, wy, ww, wh); x.globalAlpha = alpha }
      if (p.block) {
        // just two squinting eyes in the dark
        const ek = settle, c = 10
        x.fillStyle = `rgba(255,255,255,${ek})`
        for (const sd of [-1, 1]) { x.fillRect(sd * 52 - 3 * c, wcy - c, 6 * c, 2 * c); x.fillRect(sd * 52 - 2 * c, wcy + c, 4 * c, c) }
      } else {
        // the sitter, small, in the middle of its aura
        drawStarChar(x, wcx, wcy + 34, 170, t, { color: p.star.color, mood: p.mood, look: [0, 0], blink: false, bob: 0, glow: 0.6, tips: false, seed: 5, alpha: settle })
      }
      x.globalAlpha = alpha * (1 - dev); x.fillStyle = '#f7f1e4'; x.fillRect(-ww / 2, wy, ww, wh); x.globalAlpha = alpha
    }
    x.restore()
    // the strip
    const sy = wy + wh + 30
    x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    const lk = clamp((t - p.flash - 1.0) / 0.3)
    x.globalAlpha = alpha * lk
    x.fillText(`${p.name} · ${p.col}`, -ww / 2, sy)
    x.fillStyle = p.you ? '#b0407a' : '#7a5a2a'; x.font = `700 24px ${MONO}`
    x.fillText(p.trait, -ww / 2, sy + 34)
    x.restore()
  }

  // print state over time: ejects from the camera, flies to centre, then is tossed onto the pile
  const PRINTS = [...SIT.map((s, i) => ({ ...s, pile: PILE[i] })), { ...YOU, you: true, pile: null }]
  function drawPrints(t) {
    const ok = popOut(t, T.out)
    PRINTS.forEach((p, i) => {
      if (t < p.flash + 0.05) return
      const ej = ease.outCubic(clamp((t - p.flash - 0.05) / 0.45))
      const next = PRINTS[i + 1]
      let cx = lerp(CAM.x + 30, PRINT.x, ej), cy = lerp(CAM.y - 60, PRINT.y, ej), sc = lerp(0.25, 1, ej), rot = lerp(-0.4, 0.03 * Math.sin(t * 1.4 + i), ej)
      if (p.you && t > T.fan[0]) { const f = ease.inOutCubic(prog(t, ...T.fan)); cy = lerp(PRINT.y, 780, f); sc = lerp(1, 1.08, f) }
      if (next && t > next.flash - 0.1 && p.pile) {
        const k = ease.inOutCubic(clamp((t - next.flash + 0.1) / 0.4))
        cx = lerp(PRINT.x, p.pile.x, k); cy = lerp(PRINT.y, p.pile.y, k); sc = lerp(1, 0.58, k); rot = lerp(rot, p.pile.rot, k)
      }
      if (p.pile && t > T.fan[0]) {                                // fan out round your print
        const f = ease.inOutCubic(prog(t, ...T.fan)), FAN = [{ x: 200, y: 860, r: -0.26 }, { x: 880, y: 860, r: 0.26 }, { x: 540, y: 600, r: 0 }][i]
        if (i < 2) { cx = lerp(cx, FAN.x, f); cy = lerp(cy, FAN.y, f); rot = lerp(rot, FAN.r, f) }   // Scorpio's black print stays hidden behind yours
      }
      drawPrint(t, p, cx, cy, sc * (0.4 + 0.6 * ok), rot, clamp(ok * 1.5))
    })
  }

  // ── the camera: side view (lens right), turning to face you at T.turn
  function drawCamera(t) {
    const k = pop01(t, T.camIn, 0.35, 2.2) * popOut(t, [13.4, 13.58])
    if (k <= 0.01) return
    const tu = ease.inOutCubic(prog(t, ...T.turn)), c = 10
    const cx = lerp(CAM.x, 540, tu * (1 - ease.inOutCubic(prog(t, ...T.fan)))), cy = lerp(CAM.y, 1050, tu) + Math.sin(t * 2.3) * 5
    let shake = 0
    for (const s of [...SIT, YOU]) if (t > s.flash - 0.05 && t < s.flash + 0.2) shake = Math.sin(t * 120) * 4
    x.save(); x.translate(cx + shake, cy); x.scale(k * lerp(1, 1.25, tu), k * lerp(1, 1.25, tu))
    const W = 200, H = 140
    // body
    const step = (o, col, w = W, h = H) => { x.fillStyle = col; x.fillRect(-w / 2 + c - o, -h / 2 - o, w - 2 * c + 2 * o, h + 2 * o); x.fillRect(-w / 2 - o, -h / 2 + c - o, w + 2 * o, h - 2 * c + 2 * o) }
    step(c, INK); step(0, '#efe6d6')
    x.fillStyle = '#d9cbb0'; x.fillRect(-W / 2, H / 2 - 3 * c, W, 3 * c)
    // rainbow stripe
    const RB = ['#ff4f5e', '#ff9a3a', '#ffd23f', '#5fdc54', '#3fb0ff']
    RB.forEach((col, i) => { x.fillStyle = col; x.fillRect(-W / 2 + c, -H / 2 + 2 * c + i * c * 0.8, W * 0.3, c * 0.8) })
    // flash window
    const fl = Math.max(...[...SIT, YOU].map(s => flashK(t, s.flash, 0.25)))
    x.fillStyle = INK; x.fillRect(W / 2 - 7 * c, -H / 2 + c, 6 * c, 4 * c)
    x.fillStyle = fl > 0 ? '#ffffff' : '#bfe4ff'; x.fillRect(W / 2 - 6 * c, -H / 2 + 2 * c, 4 * c, 2 * c)
    // the lens: a disc on the side (side view) or straight at you (front view)
    const lx = lerp(W / 2 + 2 * c, 0, tu), lr = lerp(4.2, 5.6, tu) * c
    if (tu < 0.5) { x.fillStyle = INK; x.fillRect(W / 2 - c, -3 * c, 5 * c, 7 * c); x.fillStyle = '#4a3f6a'; x.fillRect(W / 2, -2 * c, 3 * c, 5 * c) }
    if (tu >= 0.5) {
      x.fillStyle = INK; x.beginPath(); x.arc(lx, 8, lr + c, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#2a2350'; x.beginPath(); x.arc(lx, 8, lr, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#5d4fb0'; x.beginPath(); x.arc(lx, 8, lr * 0.55, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffffff'; x.fillRect(lx - lr * 0.4, 8 - lr * 0.45, c, c)
    }
    x.restore()
    // flash burst at the camera
    if (fl > 0) {
      const g = x.createRadialGradient(cx + 60, cy - 50, 0, cx + 60, cy - 50, 380)
      g.addColorStop(0, `rgba(255,255,255,${0.9 * fl})`); g.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = g; x.fillRect(cx - 340, cy - 440, 800, 800)
    }
  }

  function drawSitters(t) {
    for (const s of SIT) {
      const pin = pop01(t, s.in, 0.35, 2.2), pout = prog(t, s.out - 0.25, s.out)
      if (pin <= 0.01 || pout >= 1) continue
      let sx = SITTER.x + pout * 380, sy = SITTER.y, size = SITTER.size, sq = 0
      const hops = [s.in + 0.3, s.flash - 0.6, s.out - 0.3]
      let st = { mood: s.mood, look: [-1, 0] }
      if (t > s.flash && t < s.flash + 0.4) st = { mood: 'squint', look: [0, 0] }          // dazzled
      if (s.block) {
        // Scorpio sidles right up to the lens and blocks it
        const b = ease.inOutCubic(prog(t, s.flash - 0.6, s.flash - 0.2))
        sx = lerp(SITTER.x, CAM.x + 190, b) + pout * 380; sy = lerp(SITTER.y, CAM.y + 10, b); size = lerp(SITTER.size, 230, b)
        st = { mood: 'squint', look: [-1, 0] }
        if (t > s.flash + 0.3 && t < s.flash + 1.0) st = { mood: 'wide', look: [0, -1], blink: false }
        if (t > T.l2 && t < T.l2 + 1.4) st = { mood: 'squint', look: [0, 0] }
      }
      if (s.id === 'leo' && t > s.flash + 1.1) st = { mood: 'heart', look: [0, 0] }   // in love with its own print
      const r = drawStarChar(x, sx, sy, size, t, { color: s.star.color, glyph: s.star.glyph, ...st, hops, squash: sq, seed: 7 + s.in, glow: 1.1 })
      if (s.cry) tears(x, t, starGeom(t, r, size, { hops, seed: 7 + s.in }), r.x, s.in + 0.2)
    }
  }

  function drawFinale(t) {
    const ok = popOut(t, T.out)
    SIT.forEach((s, i) => {
      const p = pop01(t, T.fan[1] + i * 0.12, 0.35, 2.2) * ok
      if (p <= 0.02) return
      const P = [{ x: 230, y: 1250 }, { x: 850, y: 1250 }, { x: 540, y: 1300 }][i]
      const r = drawStarChar(x, P.x, P.y, 170, t, { color: s.star.color, glyph: null, mood: i === 0 ? 'heart' : i === 1 ? 'happy' : 'squint', look: [0, 0], pop: p, seed: 30 + i, glow: 0.9, hops: [T.h5Land + i * 0.15] })
      if (s.cry) tears(x, t, starGeom(t, r, 170, { pop: p, seed: 31, hops: [T.h5Land + 0.15] }), r.x, T.fan[1])
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.45, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        // the photographer (shuffles to the side when the camera turns to you)
        const tu = ease.inOutCubic(prog(t, ...T.turn)) * (1 - ease.inOutCubic(prog(t, ...T.fan)))
        const gp = pop01(t, T.gIn, 0.4, 2.2) * ok
        if (gp > 0.02) drawStarChar(x, lerp(PH.x, 230, tu), lerp(PH.y, 1250, tu), PH.size, t, { color: STAR.sky, ...gState(t), hops: G_HOPS, pop: gp * popOut(t, [13.4, 13.58]), seed: 2, glow: 1.2 })
        drawSitters(t)
        drawCamera(t)
        drawPrints(t)
        drawFinale(t)
        for (const s of SIT) if (!s.block && t > s.flash + 0.9 && t < s.flash + 1.7) sparkles(x, t, PRINT.x, PRINT.y, s.flash + 0.95, 10, 250, 1, [s.aura, BONE, GOLD])
        if (t > YOU.flash + 0.9 && t < YOU.flash + 1.7) sparkles(x, t, PRINT.x, PRINT.y, YOU.flash + 0.95, 12, 260, 2, [PINK, GOLD, '#2fe6c0', LAV])
      }
      box.update(t)
      flashEl.style.opacity = String(0.85 * flashK(t, YOU.flash, 0.45))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 13.55 (the box shuts → "What color is yours?"). One cut for a 20 s film.
const CUTS = [{ t: 13.55, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (authored in D; the engine moves pitched cues into the score's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const shutter = f => [['tick', f - 0.02, 0.07], ['pop', f, 1760, 0.04, 0.2], ['whoosh', f + 0.05, 0.4, 0.03], ['tick', f + 0.12, 0.04], ['riser', f + 0.15, f + 0.9, 0.02]]
export const CUES = [
  ...wordPops(T.h0, 3, 0.08, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land + 0.05, 1318.51, 0.035, 0.5, 0],
  ['pop', T.gIn + 0.05, 739.99, 0.045, -0.3], ['pop', T.camIn + 0.1, 987.77, 0.035, -0.1],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { '♏ SCORPIO STAR': 523.25 } }),
  ...SIT.flatMap(s => [['pop', s.in + 0.05, 880, 0.04, 0.5], ...shutter(s.flash), ['bell', s.flash + 1.0, s.block ? 440 : 1567.98, 0.03, 1.1, 0], ...(s.block ? [] : [['glitter', s.flash + 0.95, s.flash + 1.4]])]),
  ...wordPops(T.h1, 1, 0.1, 2), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ...wordPops(T.h2, 1, 0.1, 3), ['pop', T.h2Land, 1318.51, 0.045, 0], ['pluck', SIT[1].in + 0.4, 987.77, 0.025, 0.4, 0.5],
  ...wordPops(T.h3, 1, 0.1, 4), ['pop', T.h3Land, 739.99, 0.045, 0], ['whoosh', SIT[2].flash - 0.6, 0.35, 0.035], ['boom', SIT[2].flash + 1.0, 0.1],
  // and you
  ...wordPops(T.h4, 1, 0.1, 1), ['pop', T.h4Land, 1174.66, 0.05, 0], ['whoosh', T.turn[0], 0.35, 0.035], ['tick', T.turn[1], 0.04],
  ...shutter(YOU.flash), ['boom', YOU.flash, 0.14], ['glitter', YOU.flash + 0.9, YOU.flash + 1.6], ['bell', YOU.flash + 0.95, 1760, 0.03, 1.3, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // what color is yours?
  ...wordPops(T.h5, 2, 0.1, 0, 0.028), ['pop', T.h5Land, 1318.51, 0.055, 0], ['pluck', T.h5Land, 1174.66, 0.05, 0.7, 0], ['whoosh', T.fan[0], 0.45, 0.035],
  ...[0, 1, 2].map(i => ['pop', +(T.fan[1] + i * 0.12).toFixed(3), NOTE[i + 2], 0.03, (i - 1) * 0.5]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
