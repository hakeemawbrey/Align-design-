// stabducted — "Abducted." (45 s vertical Align ad, Star Talk "Wild Lessons" #4, music: chiptune · Am). Story 0–40.6, then
// the shared end card. A pixel sci-fi B-movie: two aliens beam up ♎ Libra to study "human dating" by scanning its texts.
//   0.00–3.38  "Your star got | *abducted.*"  A saucer swoops in over Libra scrolling its phone; ♓ Pisces is already inside the
//              dome, sobbing against the glass. The tractor beam sucks Libra up, the dropped phone pauses… and zips up too.
//   3.38       DROP: inside the saucer (a glass lab in the night sky). Libra on the exam pad under a hanging scanner screen.
//              ZORP (green, lab coat, clipboard) and BLIP (lavender, one antenna). ♓ Pisces sits in a specimen jar on a shelf
//              ("SPECIMEN #2 · CRIES A LOT"), its happy-tear level rising every scan (the running gag).
//              ZORP: "specimen acquired. scan its texts."  The phone is yanked into a scanner beam.
//   7.82       SCAN 1  them: "dinner friday?" · Libra (sent): "it's whatever :)" → MEANING: ???   ZORP: "'whatever.' which ever?
//              WHICH?"  Libra: "I was being chill!"
//  12.27       SCAN 2  them: "should I book a table?" · Libra: "maybe! we'll see :)" → ERROR: MIXED SIGNAL, the printer spools
//              a tape, BLIP's antenna crackles. BLIP: "yes? no? yes-no?"
//  16.71       SCAN 3  them: "do you like me??" · Libra: "sure, if you want :)" → overload: siren, three tapes, smoke, the
//              screen glitches ERROR ×3. ZORP: "that ':)'… is it lying?"  BLIP faints flat (X eyes).
//  21.16       BREAKDOWN, "Signal: *lost.*"  Silence. Smoke. ZORP, gently: "on our planet, we say what we mean."
//              Libra: "wait. you can just say it?"
//  26.16       Libra types a new reply: "yes. I like you. friday?" → 27.27 LIFT: "SIGNAL: CLEAR ✓", confetti, BLIP springs
//              back up, heart antennae, Pisces' eyes turn to hearts. Their reply lands: "YES!! 7pm?" "Signal: *clear.*"
//  28.93       Beamed home. The saucer drops Libra, Pisces' jar, and a huge binder: REPORT ON HUMAN DATING · VOL. 1 OF 1.
//              It flops open: crossed-out findings… and one line: "be clear."  "The full *report:*"
//  32.27      ★ LESSON UNLOCKED: "Clear is kind. | Even aliens *get it.*" (+1 CLARITY)
//  36.50      Tie-in, dealbreakers: Libra's card stamps "✓ Looking for: something real", "✕ maybe-plans", "✕ mixed signals".
//              "Say what you want | *up front.*"
//  38.60      "Earth: weird. | Love: *worth it.*"  The saucer zips off with both aliens waving; Libra waves back; Pisces sobs.
//              Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + scene), DOM type + the text box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCell, drawAlien, drawUFO, drawBeam, drawMonitor, drawBubble, drawStatus, drawTape, drawSiren,
  drawJar, drawBinder, drawPhone, drawQMark, drawHeart, dustPuff, confetti, drawDealCard, SCREEN_GREEN, ERR_RED, INK } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid

const LIB = signStar('libra'), PIS = signStar('pisces')
const VS = '︎'
const ZORP_C = '#8be36b', BLIP_C = '#c9a6ff'

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.3, h0Land: 1.05, ufoIn: [0.05, 0.62], beamOn: [0.7, 0.9], libLook: 0.8, rise: [1.05, 2.85], phoneZip: [2.5, 2.9], flash: [3.12, 3.62],
  lab: BEAT(5),                                    // 3.378 drop: inside the saucer
  grab: [5.35, 5.75], scanBeam: 5.75,
  s1: BEAT(13), s2: BEAT(21), s3: BEAT(29),        // 7.822 · 12.267 · 16.711
  faint: 19.45,
  lost: BEAT(37),                                  // 21.156 breakdown
  clear: BEAT(46), hit: BEAT(48), reply: 28.05,    // 26.156 · 27.267 lift · reply
  home: BEAT(51),                                  // 28.933
  libDown: [29.0, 29.6], jarDown: [29.15, 29.75], binderDrop: [29.55, 29.92], binderOpen: [30.4, 30.8], write: [30.82, 31.18],
  cutL: 32.2, lesson: BEAT(57), lessonOut: [36.3, 36.5],   // 32.267
  tie: 36.4, chips: [36.95, 37.3, 37.65], tieOut: [38.36, 38.56],
  last: 38.6, lastLand: 39.25, zip: [38.62, 40.25],
  out: [40.0, 40.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Clear is kind. | Even aliens *get it.*', chip: '+1 CLARITY', accentColor: SCREEN_GREEN, dim: 0.74 }

// ── the three scans (+ the clear one)
const SCANS = [
  { at: T.s1, them: 'dinner friday?', sent: "it's whatever :)", result: 'MEANING: ???', col: GOLD },
  { at: T.s2, them: 'should I book a table?', sent: "maybe! we'll see :)", result: 'ERROR: MIXED SIGNAL', col: ERR_RED },
  { at: T.s3, them: 'do you like me??', sent: 'sure, if you want :)', result: 'ERROR ERROR ERROR', col: ERR_RED },
]
const CLEAR_TEXT = 'yes. I like you. friday?'
const scanIdx = t => t >= T.s3 ? 2 : t >= T.s2 ? 1 : t >= T.s1 ? 0 : -1

// ── dialogue
const ZORP = 'ZORP', BLIP = 'BLIP', LIBRA = `${LIB.glyph}${VS} LIBRA`
const CPS = 28
const LINES = [
  { t: 3.8, speaker: ZORP, color: ZORP_C, text: 'specimen acquired. *scan its texts.*' },
  { t: 8.45, speaker: ZORP, color: ZORP_C, text: "'whatever.' *which ever?* WHICH?" },
  { t: 11.3, speaker: LIBRA, color: LIB.color, text: 'I was being *chill!*' },
  { t: 13.75, speaker: BLIP, color: BLIP_C, text: 'yes? no? *yes-no?*' },
  { t: 17.25, speaker: ZORP, color: ZORP_C, text: "that ':)'… *is it lying?*" },
  { t: 21.5, speaker: ZORP, color: ZORP_C, text: 'on our planet, we *say what we mean.*' },
  { t: 24.4, speaker: LIBRA, color: LIB.color, text: 'wait. you can *just say it?*' },
]
export const LT = lineTimes(LINES, { cps: CPS })
const ZH = talkHops(LINES, ZORP, { cps: CPS }), BH = talkHops(LINES, BLIP, { cps: CPS }), LH = talkHops(LINES, LIBRA, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const hopAt = (t, times) => { let h = -1e9; for (const v of times) if (v <= t && v > h) h = v; const d = t - h; return d >= 0 && d < 0.36 ? Math.sin(Math.PI * d / 0.36) : 0 }

// ── geometry
const MON = { cx: 540, cy: 600, w: 880, h: 440 }
const LAB_LIB = { x: 540, y: 1235, s: 300 }
const ZP = { x: 215, y: 1400, px: 11 }
const BP = { x: 880, y: 1400, px: 9 }
const JAR = { x: 100, y: 930, w: 130, h: 170 }
const PHONE_AT = { x: 540, y: 950 }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 46px Inter", "600 38px Inter", "800 40px Inter", "700 32px Inter", "italic 500 150px 'EB Garamond'", "italic 600 96px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 18px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Your star got | *abducted.*', { top: 130, size: 92, accentSize: 150, at: T.h0, gap: 0.08, late: 1, lateAt: T.h0Land, wobble: true, accentColor: SCREEN_GREEN, lineHeight: 1.0 })
  const HL = popText(root, 'Subject: | *human dating.*', { top: 120, size: 80, accentSize: 120, at: T.lab + 0.05, gap: 0.08, late: 2, lateAt: T.lab + 0.45, wobble: true, accentColor: SCREEN_GREEN, lineHeight: 1.0 })
  const HS = SCANS.map((s, i) => popText(root, `Scan ${i + 1}: | *“${s.sent.replace(' :)', '')}”*`, { top: 120, size: 80, accentSize: 112, at: s.at, gap: 0.06, late: 1, lateAt: s.at + 0.3, wobble: true, accentColor: i ? PINK : GOLD, lineHeight: 1.0, fit: true }))
  const HLOST = popText(root, 'Signal: *lost.*', { top: 150, size: 104, accentSize: 150, at: T.lost + 0.1, gap: 0.12, late: 1, lateAt: T.lost + 0.55, wobble: true, accentColor: ERR_RED })
  const HCLR = popText(root, 'Signal: *clear.*', { top: 150, size: 104, accentSize: 150, at: T.hit, gap: 0.05, late: 1, lateAt: T.hit + 0.08, wobble: true, accentColor: SCREEN_GREEN })
  const HREP = popText(root, 'The full *report:*', { top: 150, size: 100, accentSize: 140, at: T.home + 0.1, gap: 0.09, late: 1, lateAt: T.home + 0.4, wobble: true, accentColor: GOLD })
  const HTIE = popText(root, 'Say what you want | *up front.*', { top: 130, size: 84, accentSize: 128, at: T.tie + 0.02, gap: 0.06, late: 1, lateAt: T.tie + 0.4, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const HEND = popText(root, 'Earth: weird. | Love: *worth it.*', { top: 130, size: 100, accentSize: 150, at: T.last + 0.02, gap: 0.09, late: 1, lateAt: T.lastLand, wobble: true, accentColor: PINK, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1480, width: 960, height: 250, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flashEl = el('div', { position: 'absolute', inset: 0, background: '#eafff2', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  function star(px, py, size, t, opts, { rot = 0, sx = 1, sy = 1, cells, after } = {}) {
    x.save(); x.translate(px, py); x.rotate(rot); x.scale(sx, sy)
    const F = starFrame(0, 0, size, t, opts)
    drawStarChar(x, 0, 0, size, t, opts)
    if (cells) inSprite(x, F, () => cells(F))
    if (after) after(F)
    x.restore()
    return F
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, SCREEN_GREEN]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.7 + 0.5 * p), cy + Math.sin(a) * R0 * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  const pisces = (t, px, py, size, o = {}) => star(px, py, size, t, { color: PIS.color, glyph: size >= 120 ? PIS.glyph : null, mood: o.mood || 'sparkle', look: o.look || [0, -1], seed: 61, bob: o.bob ?? 4, pop: o.pop ?? 1, hops: o.hops || null }, { rot: o.rot || 0, cells: () => tearsCells(x, t, o.tears ?? 3) })

  // ═══════════════════════ 0 · the hook ═══════════════════════
  function ufoPose(t) {
    const p = prog(t, ...T.ufoIn)
    const px = lerp(1250, 540, ease.outCubic(p)), py = lerp(260, 560, ease.outCubic(p)) + Math.sin(t * 2.6) * 6
    const rot = (1 - ease.outCubic(p)) * -0.35 + 0.04 * Math.sin(t * 3)
    return { px, py, rot }
  }
  function drawHook(t) {
    const U = ufoPose(t), bk = clamp(prog(t, ...T.beamOn)) * (t < T.flash[0] ? 1 : 1 - prog(t, T.flash[0], T.lab))
    // the beam (behind Libra)
    drawBeam(x, U.px, U.py + 60, 1460, 170, 540, bk, t)
    // the phone: dropped at the start of the rise, hovers, then zips up
    const rp = prog(t, ...T.rise)
    const zp = prog(t, ...T.phoneZip)
    if (zp < 1) {
      const fallY = t < T.rise[0] ? 1290 : lerp(1290, 1360, ease.outCubic(clamp((t - T.rise[0]) * 3)))
      const py = lerp(fallY, U.py + 80, ease.inCubic(zp)), pxx = lerp(t < T.rise[0] ? 668 : 630, U.px, ease.inCubic(zp))
      drawPhone(x, pxx, py, t < T.rise[0] ? 54 : lerp(50, 20, zp), t, { rot: t < T.rise[0] ? 0.2 : 0.2 + zp * 6 })
      if (zp > 0) { x.save(); x.globalAlpha = 0.7 * (1 - zp); x.fillStyle = BONE; x.fillRect(pxx - 4, py + 20, 8, 120 * zp); x.restore() }
    }
    // Libra: scrolling → looks up → rises, shrinking, spinning a little → sucked into the hatch
    if (rp < 1) {
      const y = lerp(1250, U.py + 70, ease.inQuad(rp)), s = lerp(320, 110, ease.inQuad(rp))
      const rot = rp > 0 ? Math.sin(rp * 9) * 0.3 * rp : 0
      const mood = t < T.libLook ? 'neutral' : 'wide'
      const look = t < T.libLook ? [1, 1] : [0, -1]
      const sq = t < T.rise[0] ? 0.12 * bump(t, T.libLook, 0.3) : -0.18 * Math.min(1, rp * 4)
      star(lerp(540, U.px, ease.inQuad(rp)), y, s, t, { color: LIB.color, glyph: s > 150 ? LIB.glyph : null, mood, look, squash: sq, blink: t > T.libLook ? false : undefined, seed: 3, alpha: 1 - prog(rp, 0.9, 1) }, { rot, cells: () => { if (t > T.libLook) sweatCell(x, prog(t, T.libLook, T.libLook + 1.4)) } })
      if (t < T.rise[0]) drawPhone(x, 668, 1290, 54, t, { rot: 0.2 })
    }
    // the saucer, Pisces + a tiny alien pilot in the dome
    drawUFO(x, U.px, U.py, 11, t, { rot: U.rot, lights: 1 + bk, dome: (dx, dy) => {
      drawAlien(x, dx + 60, dy + 30, 3.2, t, { color: ZORP_C, mood: 'almond', arms: 'down', armsR: 'wave', seed: 4 })
      pisces(t, dx - 46, dy + 10, 96, { mood: 'sparkle', tears: 3, look: [0, 1], bob: 2 })
    } })
  }

  // ═══════════════════════ 1 · the lab ═══════════════════════
  function labBg(t, alarm) {
    // a glass dome (the saucer's lab) over the night sky + the deck
    x.save()
    x.strokeStyle = 'rgba(160,240,255,0.22)'; x.lineWidth = 6
    x.beginPath(); x.ellipse(540, 1420, 700, 1150, 0, Math.PI, TAU); x.stroke()
    x.strokeStyle = 'rgba(160,240,255,0.10)'; x.lineWidth = 3
    for (const k of [-0.55, 0, 0.55]) { x.beginPath(); x.ellipse(540, 1420, 700 * Math.abs(Math.cos(k * 1.3)) + 1, 1150, 0, Math.PI, TAU); x.stroke() }
    x.restore()
    // deck
    x.fillStyle = INK; x.fillRect(0, 1396, W, 90)
    x.fillStyle = '#4a4f72'; x.fillRect(0, 1404, W, 22)
    x.fillStyle = '#2c2f4e'; x.fillRect(0, 1426, W, 60)
    for (let k = 0; k < 11; k++) { const on = (Math.floor(t * 4) + k) % 4 === 0; x.fillStyle = INK; x.fillRect(30 + k * 100 - 4, 1446, 26, 18); x.fillStyle = alarm > 0.3 ? (on ? '#ff5c78' : '#6a2030') : (on ? SCREEN_GREEN : '#2c5a46'); x.fillRect(30 + k * 100, 1450, 18, 10) }
    // the exam pad
    x.fillStyle = INK; x.beginPath(); x.ellipse(LAB_LIB.x, 1392, 196, 34, 0, 0, TAU); x.fill()
    x.fillStyle = '#8a93b8'; x.beginPath(); x.ellipse(LAB_LIB.x, 1388, 186, 26, 0, 0, TAU); x.fill()
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(LAB_LIB.x, 1388, 0, LAB_LIB.x, 1388, 220); g.addColorStop(0, 'rgba(127,255,176,0.35)'); g.addColorStop(1, 'rgba(127,255,176,0)')
    x.fillStyle = g; x.fillRect(LAB_LIB.x - 240, 1250, 480, 200); x.restore()
  }
  function screenContent(t, S) {
    // which content is on screen right now
    const si = scanIdx(t)
    const sx = S.x, sw = S.w
    const statusY = S.y + S.h - 38
    const bubbleThem = (txt, k, glitch = 0) => {
      x.font = `600 38px ${INTER}`
      const w = x.measureText(txt).width + 64
      drawBubble(x, sx + 34 + w / 2 + glitch, S.y + 130, w, 76, { fill: '#3b4a70', text: txt, color: BONE, font: `600 38px ${INTER}`, side: 'l', sc: k, label: 'THEM' })
    }
    const bubbleSent = (txt, k, glitch = 0, fillC = GOLD) => {
      x.font = `700 46px ${INTER}`
      const w = x.measureText(txt).width + 70
      drawBubble(x, sx + sw - 34 - w / 2 - glitch, S.y + 250, w, 92, { fill: fillC, text: txt, color: INK, font: `700 46px ${INTER}`, side: 'r', sc: k, label: 'LIBRA · SENT' })
    }
    if (t < T.s1) {
      // idle: waiting for a signal
      const k = prog(t, T.scanBeam, T.scanBeam + 0.4)
      drawStatus(x, sx + 34, statusY, t < T.scanBeam ? 'AWAITING SPECIMEN' : 'LINKING PHONE…', t < T.scanBeam ? prog(t, T.lab + 0.3, T.lab + 1.0) : k, t, { size: 36 })
      // a slowly rotating wireframe planet in the middle
      x.save(); x.translate(MON.cx, S.y + 190); x.strokeStyle = 'rgba(125,255,176,0.45)'; x.lineWidth = 3
      x.beginPath(); x.arc(0, 0, 92, 0, TAU); x.stroke()
      for (let k2 = 0; k2 < 4; k2++) { const a = (t * 0.8 + k2 / 4) % 1; x.beginPath(); x.ellipse(0, 0, 92 * Math.abs(Math.cos(a * Math.PI)), 92, 0, 0, TAU); x.stroke() }
      x.beginPath(); x.ellipse(0, 0, 92, 30, 0, 0, TAU); x.stroke()
      x.restore()
      return
    }
    if (t < T.lost) {
      const s = SCANS[si], r = t - s.at
      const over = si === 2 && r > 1.4
      const gl = over ? (Math.floor(t * 18) % 3 - 1) * 10 : 0
      bubbleThem(s.them, pop01(t, s.at + 0.08, 0.28, 2.2), gl)
      bubbleSent(s.sent, pop01(t, s.at + 0.3, 0.3, 2.2), -gl)
      // scan line sweeping down over the bubbles
      const sp = prog(r, 0.55, 1.3)
      if (sp > 0 && sp < 1) {
        const yy = S.y + 70 + sp * 250
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createLinearGradient(0, yy - 60, 0, yy + 8); g.addColorStop(0, 'rgba(125,255,176,0)'); g.addColorStop(1, 'rgba(125,255,176,0.45)')
        x.fillStyle = g; x.fillRect(sx, yy - 60, sw, 68); x.fillStyle = 'rgba(200,255,220,0.9)'; x.fillRect(sx, yy, sw, 4); x.restore()
      }
      if (r < 1.35) drawStatus(x, sx + 34, statusY, 'ANALYZING…', prog(r, 0.55, 0.85), t, { size: 38 })
      else drawStatus(x, si === 0 ? sx + 34 : sx + 34 + gl, statusY, s.result, prog(r, 1.38, 1.38 + (si === 0 ? 0.25 : 0.3)), t, { color: s.col, size: si === 0 ? 40 : 40, flash: si > 0 })
      // overload: glitch bands
      if (over) {
        const rr = rng(Math.floor(t * 20))
        for (let k = 0; k < 5; k++) { x.fillStyle = k % 2 ? 'rgba(255,74,94,0.35)' : 'rgba(125,255,176,0.25)'; x.fillRect(sx, S.y + rr() * S.h, sw, 6 + rr() * 22) }
      }
      return
    }
    if (t < T.clear) {
      // NO SIGNAL: static + the line
      const rr = rng(Math.floor(t * 12))
      x.save(); x.globalAlpha = 0.5
      for (let k = 0; k < 160; k++) { x.fillStyle = rr() > 0.5 ? 'rgba(200,255,220,0.35)' : 'rgba(0,0,0,0.4)'; x.fillRect(sx + rr() * sw, S.y + 60 + rr() * (S.h - 60), 10, 6) }
      x.restore()
      x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.85)'
      x.fillText('NO SIGNAL', MON.cx, S.y + S.h / 2 + 10)
      return
    }
    // the clear one: them asks again, Libra types the new reply, CLEAR
    bubbleThem('do you like me??', 1)
    const typed = Math.round(CLEAR_TEXT.length * prog(t, T.clear + 0.25, T.clear + 1.0))
    if (typed > 0) bubbleSent(CLEAR_TEXT.slice(0, typed) + (t < T.clear + 1.05 ? '|' : ''), 1, 0, t >= T.hit ? '#7dffb0' : GOLD)
    if (t >= T.reply) {                                           // their reply pops in under it
      x.font = `800 40px ${INTER}`
      const w = x.measureText('YES!! 7pm?').width + 64
      drawBubble(x, sx + 34 + w / 2, S.y + 345, w, 70, { fill: '#3b4a70', text: 'YES!! 7pm?', color: BONE, font: `800 40px ${INTER}`, side: 'l', sc: pop01(t, T.reply, 0.3, 2.6) })
    }
    if (t < T.hit) drawStatus(x, sx + 34, statusY, 'ANALYZING…', prog(t, T.clear + 1.05, T.clear + 1.3), t, { size: 38 })
    else if (t < T.reply) drawStatus(x, MON.cx, statusY, 'SIGNAL: CLEAR ✓', prog(t, T.hit, T.hit + 0.18), t, { color: SCREEN_GREEN, size: 46, center: true })
  }
  function drawLab(t) {
    const si = scanIdx(t), r3 = t - T.s3
    const alarm = inR(t, T.s3 + 1.4, T.lost) ? 1 : 0
    const shake = alarm ? (Math.sin(t * 61) * 6) : 0
    labBg(t, alarm)
    // Pisces' jar: the tear level creeps up every scan; hearts at the clear
    const lvl = t < T.s1 ? 0.18 : t < T.s2 ? 0.3 : t < T.s3 ? 0.42 : t < T.hit ? 0.55 : 0.62
    drawJar(x, JAR.x, JAR.y, JAR.w, JAR.h, t, { level: lvl, inner: (cx, cy) => pisces(t, cx, cy + 6, 104, { mood: t >= T.hit ? 'heart' : 'sparkle', tears: t >= T.s2 ? 3 : 2, look: [1, -1], bob: 3, hops: t >= T.hit ? [T.hit + 0.05, T.hit + 0.5] : null }) })
    // the scanner monitor (+ the scan beam down to the phone)
    x.save(); x.translate(shake, 0)
    const sb = clamp(prog(t, T.scanBeam, T.scanBeam + 0.25)) * (t < T.lost || t >= T.clear ? 1 : 0.25)
    drawBeam(x, MON.cx, MON.cy + MON.h / 2 - 6, PHONE_AT.y + 10, 90, 150, sb * (0.7 + 0.3 * Math.sin(t * 9)), t)
    const S = drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, { alarm: alarm * (0.6 + 0.4 * Math.sin(t * 18)) })
    screenContent(t, S)
    x.restore()
    // the phone: yanked from Libra into the beam
    {
      const gp = prog(t, ...T.grab)
      const px = lerp(LAB_LIB.x + 130, PHONE_AT.x, ease.inOutCubic(gp)), py = lerp(1290, PHONE_AT.y, easeOutBack(gp, 1.4)) + Math.sin(t * 3) * 6 * gp
      drawPhone(x, px, py, 60, t, { rot: lerp(0.25, 0, gp) + 0.05 * Math.sin(t * 2.2) * gp, glow: 0.5 + 0.5 * Math.sin(t * 8) })
    }
    // printer tapes (scan 2: one, scan 3: three)
    if (t >= T.s2 + 1.45 && t < T.lost + 0.5) {
      const L = t < T.s3 ? 330 * ease.outCubic(prog(t, T.s2 + 1.45, T.s2 + 3.2)) : 330
      drawTape(x, MON.cx + 280 + shake, MON.cy + MON.h / 2 + 4, 200, L, t, { rot: -0.04 })
    }
    if (t >= T.s3 + 1.5 && t < T.lost + 0.5) {
      drawTape(x, MON.cx - 230 + shake, MON.cy + MON.h / 2 + 4, 190, 290 * ease.outCubic(prog(t, T.s3 + 1.5, T.s3 + 3.0)), t, { rot: 0.05, lines: ['ERROR:', 'ERROR', 'ERROR'] })
      drawTape(x, MON.cx + 130 + shake, MON.cy + MON.h / 2 + 4, 160, 200 * ease.outCubic(prog(t, T.s3 + 1.9, T.s3 + 3.3)), t, { rot: -0.02, lines: ['ERROR:', ':) ???'] })
    }
    // smoke from the monitor after the overload
    if (t >= T.s3 + 2.2 && t < T.clear) {
      for (let q = 0; q < 6; q++) {
        const t0 = T.s3 + 2.2 + q * 0.75, k = prog(t, t0, t0 + 1.6)
        dustPuff(x, MON.cx + (q % 2 ? 360 : -360), MON.cy - MON.h / 2 + 10, k, { n: 5, spread: 70, seed: 20 + q, col: '#9a94b0', rise: 120 })
      }
    }
    drawSiren(x, MON.cx, MON.cy - MON.h / 2 - 8, alarm, t)

    // Libra on the pad
    {
      let mood = 'wide', look = [0, -1], sq = 0, sweat = 0, hops = [...LH], blink
      if (t < T.s1) { look = t < T.grab[0] ? (Math.floor(t * 1.4) % 2 ? [-1, 0] : [1, 0]) : [0, -1]; if (inR(t, T.grab[0], T.grab[1] + 0.3)) { mood = 'wide'; sq = 0.14 * bump(t, T.grab[0], 0.35) } }
      else if (t < T.s2) { const r = t - T.s1; mood = r < 1.4 ? 'neutral' : r < 3.0 ? 'squint' : 'happy'; look = r < 3.0 ? [0, -1] : [-1, 0]; sweat = r > 1.5 ? prog(r, 1.5, 2.6) : 0 }
      else if (t < T.s3) { const r = t - T.s2; mood = r < 1.4 ? 'neutral' : 'wide'; look = r < 1.4 ? [0, -1] : [1, 0]; sweat = r > 1.4 ? prog(r, 1.4, 2.6) : 0; if (r > 1.4) sq = 0.05 }
      else if (t < T.lost) { mood = r3 < 1.4 ? 'neutral' : 'wide'; look = r3 < 1.4 ? [0, -1] : (Math.floor(t * 4) % 2 ? [-1, 0] : [1, 0]); sq = r3 > 1.4 ? 0.12 : 0; sweat = r3 > 1.4 ? 1 : 0; blink = r3 > 1.4 ? false : undefined }
      else if (t < T.clear) { mood = t < LINES[6].t ? 'wide' : 'sparkle'; look = t < LINES[6].t ? [-1, 0] : [0, 0]; sweat = t < LINES[6].t ? 1 : 0 }
      else if (t < T.hit) { mood = 'squint'; look = [0, -1] }
      else { mood = 'heart'; look = [0, 0]; hops = [T.hit + 0.02, T.hit + 0.5, T.reply + 0.05, T.reply + 0.45] }
      star(LAB_LIB.x, LAB_LIB.y, LAB_LIB.s, t, { color: LIB.color, glyph: LIB.glyph, mood, look, squash: sq, hops, blink, seed: 3 }, { cells: () => sweatCell(x, sweat) })
    }
    // ZORP (left, lab coat + clipboard)
    {
      let mood = 'almond', mouth = 'dot', rot = 0, droop = 0, arms = 'down', armsR = null, hearts = false, lift = 0, sq = 0
      if (t < T.s1) { mouth = inR(t, LINES[0].t, LT[0].done) ? 'open' : 'dot'; armsR = inR(t, T.grab[0] - 0.4, T.grab[1]) ? 'point' : null }
      else if (t < T.s2) { const r = t - T.s1; rot = r > 1.5 ? -0.16 * ease.outBack(prog(r, 1.5, 1.8)) : 0; droop = r > 1.5 ? 0.6 : 0; mood = r > 1.5 && r < 3.0 ? 'squint' : 'almond'; mouth = inR(t, LINES[1].t, LT[1].done) ? 'open' : 'flat' }
      else if (t < T.s3) { const r = t - T.s2; rot = r > 1.4 ? 0.12 : 0; mood = r > 1.4 ? 'wide' : 'almond'; mouth = r > 1.4 ? 'o' : 'dot' }
      else if (t < T.lost) { mood = r3 > 1.4 ? 'wide' : 'almond'; mouth = inR(t, LINES[4].t, LT[4].done) ? 'open' : r3 > 1.4 ? 'o' : 'dot'; arms = r3 > 1.4 ? 'up' : 'down'; armsR = r3 > 1.4 ? 'up' : null; lift = r3 > 1.4 ? 8 * Math.abs(Math.sin(t * 9)) : 0 }
      else if (t < T.hit) { mood = t < T.clear ? 'almond' : 'wide'; mouth = inR(t, LINES[5].t, LT[5].done) ? 'open' : 'smile'; rot = 0.05 }
      else { mood = 'heart'; mouth = 'open'; arms = 'up'; armsR = 'up'; hearts = true; lift = 70 * hopAt(t, [T.hit, T.hit + 0.42, T.hit + 0.84, T.reply + 0.1, T.reply + 0.55]) }
      const talking = LINES.some((L, i) => L.speaker === ZORP && inR(t, L.t, LT[i].done))
      sq = talking ? 0.04 * Math.sin(t * 22) : 0
      drawAlien(x, ZP.x, ZP.y, ZP.px, t, { color: ZORP_C, suit: '#f4f1ea', coat: true, clip: armsR == null && !hearts, mood, mouth, rot, droop, arms, armsR, hearts, lift, squash: sq, seed: 5 })
      // question marks
      if (si === 0) drawQMark(x, ZP.x + 80, ZP.y - 300, 9, pop01(t, T.s1 + 1.55, 0.3, 2.6) * (1 - prog(t, T.s2 - 0.2, T.s2)), GOLD, 0.15)
    }
    // BLIP (right, one antenna): crackles at scan 2, faints at scan 3, springs back at the clear
    {
      let mood = 'almond', mouth = 'dot', rot = 0, spin = 0, arms = 'down', armsR = null, hearts = false, lift = 0, sq = 0, wob = 0.6
      if (t < T.s1) { mood = 'almond' }
      else if (t < T.s2) { const r = t - T.s1; rot = r > 1.6 ? 0.18 : 0; mood = r > 1.6 ? 'squint' : 'almond'; armsR = r > 1.6 ? 'hip' : null }
      else if (t < T.s3) { const r = t - T.s2; spin = r > 1.4 ? 1 : 0; wob = r > 1.4 ? 3 : 0.6; mood = r > 1.4 ? 'wide' : 'almond'; mouth = inR(t, LINES[3].t, LT[3].done) ? 'open' : 'dot'; sq = r > 1.4 ? 0.04 * Math.sin(t * 30) : 0 }
      else if (t < T.hit) {
        const fp = prog(t, T.faint, T.faint + 0.4)
        if (t < T.faint) { mood = r3 > 1.4 ? 'wide' : 'almond'; spin = r3 > 1.4 ? 1 : 0; wob = r3 > 1.4 ? 4 : 0.6; mouth = r3 > 1.4 ? 'open' : 'dot'; sq = r3 > 1.4 ? 0.05 * Math.sin(t * 34) : 0 }
        else { mood = 'x'; mouth = 'o'; rot = -(Math.PI / 2) * ease.inQuad(fp); lift = 58 * ease.inQuad(fp); wob = 0; spin = t < T.faint + 1.2 ? 1 : 0; sq = fp >= 1 ? 0.15 * Math.exp(-(t - T.faint - 0.4) * 8) * Math.cos((t - T.faint - 0.4) * 30) : 0 }
      } else {
        const up = prog(t, T.hit, T.hit + 0.3)
        rot = -(Math.PI / 2) * (1 - ease.outBack(up)); mood = 'heart'; mouth = 'open'; arms = 'up'; armsR = 'up'; hearts = true
        lift = up >= 1 ? 60 * hopAt(t, [T.hit + 0.3, T.hit + 0.72, T.reply + 0.15, T.reply + 0.6]) : 58 * (1 - up) + 40 * Math.sin(Math.PI * up)
      }
      drawAlien(x, BP.x, BP.y, BP.px, t, { color: BLIP_C, suit: '#c3cae6', antennae: 1, mood, mouth, rot, spin, wob, arms, armsR, hearts, lift, squash: sq, seed: 9, ball: '#7fe0ff' })
      if (si === 0) drawQMark(x, BP.x - 60, BP.y - 250, 7, pop01(t, T.s1 + 1.7, 0.3, 2.6) * (1 - prog(t, T.s2 - 0.2, T.s2)), GOLD, -0.2)
      if (si === 1) { drawQMark(x, BP.x - 70, BP.y - 250, 7, pop01(t, T.s2 + 1.5, 0.3, 2.6) * (1 - prog(t, T.s3 - 0.2, T.s3)), PINK, -0.2); drawQMark(x, BP.x + 40, BP.y - 290, 6, pop01(t, T.s2 + 1.65, 0.3, 2.6) * (1 - prog(t, T.s3 - 0.2, T.s3)), PINK, 0.25) }
      if (t >= T.faint + 0.4 && t < T.hit) {                      // little stars circling the fainted head
        for (let k = 0; k < 3; k++) { const a = t * 4 + k * TAU / 3; drawPixelStar(x, BP.x - 175 + Math.cos(a) * 46, BP.y - 70 + Math.sin(a) * 16, 22, 1, k % 2 ? GOLD : BONE) }
      }
    }
    // the clear: confetti + a sparkle burst off the screen
    if (t >= T.hit) { confetti(x, t, T.hit, { n: 46, seed: 33 }); sparkleRing(t, MON.cx, MON.cy, T.hit, 12, 380, 0.4) }
    // alarm red wash
    if (alarm) { x.fillStyle = `rgba(255,40,70,${0.08 + 0.08 * Math.max(0, Math.sin(t * 18))})`; x.fillRect(0, 0, W, 1920) }
    // breakdown: a dim, quiet room
    if (inR(t, T.lost, T.clear)) { x.fillStyle = `rgba(5,4,16,${0.25 * (1 - prog(t, T.clear - 0.3, T.clear))})`; x.fillRect(0, 0, W, 1920) }
  }

  // ═══════════════════════ 2 · home: the report ═══════════════════════
  function drawHome(t) {
    const uy = 470 + Math.sin(t * 2.4) * 6
    const bk = 1 - prog(t, T.binderDrop[1] + 0.4, T.binderDrop[1] + 1.0)
    drawBeam(x, 540, uy + 60, 1440, 170, 760, bk, t)
    // the binder: drops out of the beam, thuds, flops open
    const dp = prog(t, ...T.binderDrop), op = prog(t, ...T.binderOpen)
    if (t >= T.binderDrop[0]) {
      const BW = 680, BH = 440, cy = lerp(560, 920, ease.inQuad(dp))
      const land = t > T.binderDrop[1] ? 0.06 * Math.exp(-(t - T.binderDrop[1]) * 9) * Math.cos((t - T.binderDrop[1]) * 30) : 0
      const cx = 540 - (BW / 4) * (1 - ease.inOutQuad(op))
      drawBinder(x, cx, cy, BW, BH, t, { open: op, write: prog(t, ...T.write), sc: lerp(0.4, 1, ease.outCubic(dp)) * (1 + land), rot: (1 - dp) * 0.3 })
      dustPuff(x, 400, 1150, prog(t, T.binderDrop[1], T.binderDrop[1] + 0.8), { n: 8, spread: 200, seed: 41 })
      dustPuff(x, 700, 1150, prog(t, T.binderDrop[1], T.binderDrop[1] + 0.8), { n: 8, spread: 200, seed: 42 })
      // a stamp on the page once it's written
      const stk = pop01(t, T.write[1] + 0.25, 0.22, 3)
      if (stk > 0 && op >= 1) {
        x.save(); x.translate(820, 1080); x.rotate(-0.18); x.scale(stk * (1 + 0.5 * (1 - stk)), stk * (1 + 0.5 * (1 - stk)))
        x.strokeStyle = '#2fa860'; x.lineWidth = 6; x.strokeRect(-120, -34, 240, 68)
        x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2fa860'; x.fillText('PEER-REVIEWED', 0, 2)
        x.restore()
      }
    }
    // Libra floats down and lands (reads it, gets it)
    {
      const p = prog(t, ...T.libDown)
      const y = lerp(640, 1290, ease.outCubic(p)), s = lerp(140, 260, ease.outCubic(p))
      const d = t - T.libDown[1], land = d > 0 ? 0.2 * Math.exp(-d * 8) * Math.cos(d * 24) : 0
      const mood = t < T.libDown[1] + 0.3 ? 'wide' : t < T.write[0] ? 'neutral' : t < T.write[1] + 0.5 ? 'wide' : 'sparkle'
      const look = t < T.write[0] ? [1, -1] : t < T.write[1] + 0.5 ? [1, -1] : [0, 0]
      star(lerp(540, 250, ease.outCubic(p)), y, s, t, { color: LIB.color, glyph: s > 150 ? LIB.glyph : null, mood, look, squash: land, seed: 3, hops: t > T.write[1] + 0.5 ? [T.write[1] + 0.6] : null })
    }
    // Pisces' jar comes down too (still crying)
    {
      const p = prog(t, ...T.jarDown)
      const y = lerp(620, 1240, ease.outCubic(p)), d = t - T.jarDown[1], land = d > 0 ? 12 * Math.exp(-d * 8) * Math.abs(Math.sin(d * 20)) : 0
      x.save(); x.translate(lerp(540, 870, ease.outCubic(p)), y - land); x.scale(lerp(0.5, 1, ease.outCubic(p)), lerp(0.5, 1, ease.outCubic(p))); x.rotate((1 - p) * -0.4)
      drawJar(x, 0, 0, 130, 170, t, { level: 0.62, inner: (cx, cy) => pisces(t, cx, cy + 6, 104, { mood: 'heart', tears: 3, look: [-1, -1], bob: 3 }) })
      x.restore()
    }
    // the saucer (ZORP waving in the dome)
    drawUFO(x, 540, uy, 10, t, { lights: 1 + bk, dome: (dx, dy) => {
      drawAlien(x, dx - 36, dy + 34, 3.3, t, { color: ZORP_C, suit: '#f4f1ea', coat: true, mood: 'happy', mouth: 'smile', arms: 'down', armsR: 'wave', seed: 5 })
      drawAlien(x, dx + 44, dy + 34, 2.8, t, { color: BLIP_C, antennae: 1, mood: 'happy', mouth: 'smile', arms: 'wave', armsR: 'wave', seed: 9, ball: '#7fe0ff' })
    } })
  }

  // ═══════════════════════ 3 · tie-in: dealbreakers ═══════════════════════
  function drawTie(t) {
    const k = pop01(t, T.tie, 0.36, 1.6) * popOut(t, T.tieOut)
    const chips = [
      { text: 'Looking for: something real', kind: 'yes', k: prog(t, T.chips[0], T.chips[0] + 0.25) },
      { text: 'maybe-plans', kind: 'no', k: prog(t, T.chips[1], T.chips[1] + 0.25) },
      { text: 'mixed signals', kind: 'no', k: prog(t, T.chips[2], T.chips[2] + 0.25) },
    ]
    drawDealCard(x, 540, 880, 780, 540, t, { k, chips })
    if (k > 0) {
      x.save(); x.globalAlpha = clamp(prog(t, T.tie + 0.3, T.tie + 0.6)) * popOut(t, T.tieOut)
      x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.fillStyle = 'rgba(239,230,214,0.8)'
      x.fillText('DEALBREAKERS · ON YOUR CARD, DAY ONE', 540, 1210)
      x.restore()
    }
    const pk = popOut(t, T.tieOut)
    star(290, 1420, 230, t, { color: LIB.color, glyph: LIB.glyph, mood: 'happy', look: [1, -1], seed: 3, hops: T.chips.map(c => c + 0.02), pop: pk * pop01(t, T.tie, 0.3, 2) })
    pisces(t, 800, 1440, 180, { mood: 'sparkle', tears: 2, look: [-1, -1], pop: pk * pop01(t, T.tie + 0.1, 0.3, 2), hops: [T.chips[2] + 0.1] })
  }

  // ═══════════════════════ 4 · the last line ═══════════════════════
  function drawLast(t) {
    const pk = (i) => popOut(t, [T.out[0] + i * 0.04, T.out[0] + 0.3 + i * 0.04])
    // the saucer zips off, both aliens waving, a sparkle trail
    const zp = prog(t, ...T.zip)
    const zIn = ease.outCubic(prog(t, T.zip[0], T.zip[0] + 0.7)), zOut = ease.inCubic(prog(t, T.zip[1] - 0.45, T.zip[1]))
    const ux = lerp(-300, 560, zIn) + 900 * zOut, uy = lerp(820, 640, zIn) - 120 * zOut + Math.sin(t * 5) * 10
    for (let q = 1; q <= 6; q++) { const back = q * 70; if (ux - back > -100) drawPixelStar(x, ux - back, uy + 40 + Math.sin(t * 8 + q) * 10, 26 - q * 3, q % 2 ? 1 : 2, q % 2 ? SCREEN_GREEN : GOLD) }
    drawUFO(x, ux, uy, 9, t, { rot: 0.08 * Math.sin(t * 4), lights: 2, dome: (dx, dy) => {
      drawAlien(x, dx - 32, dy + 30, 3, t, { color: ZORP_C, suit: '#f4f1ea', coat: true, mood: 'happy', mouth: 'smile', arms: 'wave', armsR: 'wave', seed: 5 })
      drawAlien(x, dx + 40, dy + 30, 2.6, t, { color: BLIP_C, antennae: 1, mood: 'heart', mouth: 'open', arms: 'wave', armsR: 'wave', hearts: true, seed: 9 })
    } })
    star(390, 1250, 300, t, { color: LIB.color, glyph: LIB.glyph, mood: 'happy', look: [1, -1], seed: 3, hops: [T.last + 0.3, T.last + 0.85, T.lastLand + 0.1], pop: pk(0) * pop01(t, T.last, 0.3, 2) })
    pisces(t, 790, 1320, 200, { mood: 'heart', tears: 3, look: [-1, -1], pop: pk(1) * pop01(t, T.last + 0.1, 0.3, 2) })
    // hearts drifting up
    const rr = rng(77)
    for (let k = 0; k < 8; k++) { const t0 = T.last + 0.3 + rr() * 1.2, d = t - t0, hx = 160 + rr() * 760; if (d > 0 && d < 1.6) { x.save(); x.globalAlpha = (1 - d / 1.6) * pk(2); drawHeart(x, hx + Math.sin(d * 4 + k) * 20, 1500 - d * 260, 6, k % 2 ? PINK : '#ff4f7e'); x.restore() } }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.lab) drawHook(t)
      else if (t < T.home) drawLab(t)
      else if (t < T.tie) drawHome(t)
      else if (t < T.last) drawTie(t)
      else if (t < T.out[1] + 0.05) drawLast(t)
      // type
      H0.update(t, t < T.lab ? 1 : 0)
      HL.update(t, t >= T.lab && t < T.s1 ? 1 : 0)
      const si = t < T.lost ? scanIdx(t) : -1
      HS.forEach((h, i) => h.update(t, i === si ? 1 : 0))
      HLOST.update(t, t >= T.lost && t < T.hit ? 1 : 0)
      HCLR.update(t, t >= T.hit && t < T.home ? 1 : 0)
      HREP.update(t, t >= T.home && t < T.lesson ? 1 : 0)
      HTIE.update(t, t >= T.tie && t < T.last ? outK(t, T.tieOut) : 0)
      HEND.update(t, t >= T.last ? outK(t, [T.out[0] + 0.05, T.out[0] + 0.35]) : 0)
      box.update(t)
      lesson.update(t)
      const fl = Math.max(bump(t, T.flash[0], T.flash[1] - T.flash[0]), bump(t, T.home - 0.22, 0.44) * 0.85)
      flashEl.style.opacity = String(fl)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 3 of these 9 (indices 1, 4, 7):
// 7.77 (→ scan 1), 21.1 (→ signal lost), 32.2 (→ LESSON UNLOCKED). The end card flips at 40.6.
export const CUTS = [3.33, 7.77, 12.22, 16.66, 21.1, 26.1, 28.88, T.cutL, 36.45]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in D and moved by the engine; chip / lead / brass are written in A minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const AM = { A3: 220, C4: 261.63, E4: 329.63, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51 }
const FXO = { rev: 0, dly: 0, bus: 'fx' }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const noise = (t, f, len, g, o = {}) => ['chip', r3(t), f, len, { wave: 'noise', gain: g, decay: len * 0.6, sustain: 0, ...FXO, ...o }]
const warble = (t, f, len, g = 0.018, o = {}) => ['chip', r3(t), f, len, { wave: 'square', duty: 0.25, vib: 0.09, gain: g, decay: len * 0.8, sustain: 0.7, rev: 0.25, dly: 0.15, bus: 'fx', ...o }]
const beep = (t, f, len = 0.07, g = 0.02) => ['chip', r3(t), f, len, { wave: 'square', duty: 0.125, gain: g, decay: len * 0.7, sustain: 0.4, ...FXO }]
// scanner analysis: a burst of computer beeps
const analyze = (t0, n = 10) => Array.from({ length: n }, (_, k) => beep(t0 + k * 0.075, [AM.A5, AM.E6, AM.C6, AM.G5 * 2, AM.A5, AM.C6 * 1.5][k % 6], 0.05, 0.014))
const printer = (t0, n) => Array.from({ length: n }, (_, k) => noise(t0 + k * 0.09, 2600 + (k % 3) * 600, 0.05, 0.022))
const siren = (t0, t1) => { const out = []; for (let t = t0, k = 0; t < t1; t += 0.3, k++) out.push(['chip', r3(t), k % 2 ? AM.E5 : AM.A5, 0.28, { wave: 'square', duty: 0.5, slide: k % 2 ? 6 : -6, gain: 0.016, decay: 0.25, sustain: 0.8, ...FXO }]); return out }

export const CUES = [
  // 0 · the hook: saucer warble swoops in, the beam hums, Libra yelps up, the phone zips after it
  ['whoosh', 0.05, 0.6, 0.06], warble(0.08, AM.A5, 0.6, 0.02, { slide: -14 }), warble(0.62, AM.E5, 0.35, 0.016, { slide: 8 }),
  ...head(T.h0, 3, T.h0Land, 0),
  ['riser', T.beamOn[0], T.rise[1], 0.05],
  ['chip', r3(T.beamOn[0]), AM.A3, 2.3, { wave: 'tri', vib: 0.03, gain: 0.03, decay: 2, sustain: 0.9, rev: 0.2, dly: 0, bus: 'fx' }],
  ['pop', r3(T.libLook), 1318.51, 0.04, 0], ['chip', r3(T.rise[0]), AM.C5, 1.4, { wave: 'square', duty: 0.25, slide: 14, vib: 0.03, gain: 0.014, decay: 1.2, sustain: 0.7, ...FXO }],
  ['tick', r3(T.rise[0] + 0.25), 0.04], ['pop', r3(T.rise[0] + 0.3), 330, 0.04, 0.3],
  ['whoosh', r3(T.phoneZip[0]), 0.4, 0.05], ['pop', r3(T.phoneZip[1]), 1760, 0.04, 0],
  ['boom', r3(T.lab - 0.02), 0.18], ['glitter', r3(T.flash[0]), r3(T.flash[1])],
  // 1 · the lab
  ...head(T.lab + 0.05, 1, T.lab + 0.45, 3),
  ...analyze(T.lab + 0.35, 6),
  ['whoosh', r3(T.grab[0]), 0.35, 0.045], ['pop', r3(T.grab[1]), 1174.66, 0.035, 0], ['chip', r3(T.scanBeam), AM.E4, 1.0, { wave: 'tri', vib: 0.05, gain: 0.02, decay: 0.9, sustain: 0.6, ...FXO }],
  ...talkCues(LINES, { cps: CPS, pitch: { [ZORP]: 739.99, [BLIP]: 1174.66, [LIBRA]: 880 } }),
  // the three scans: bubbles pop, the scan, the result
  ...SCANS.flatMap((s, i) => [
    ['tick', s.at, 0.04], ...head(s.at, 2, s.at + 0.3, i * 2),
    ['pop', r3(s.at + 0.1), 659.25, 0.03, -0.3], ['pop', r3(s.at + 0.32), 880, 0.035, 0.3],
    ...analyze(s.at + 0.55, 10),
  ]),
  // scan 1: a puzzled descending trio
  ...[AM.E5, AM.C5, AM.A4].map((f, k) => beep(T.s1 + 1.4 + k * 0.14, f, 0.12, 0.024)), ['pop', r3(T.s1 + 1.55), 523.25, 0.04, -0.3], ['pop', r3(T.s1 + 1.7), 440, 0.035, 0.3],
  // scan 2: error buzz + printer + crackle
  ['chip', r3(T.s2 + 1.4), 110, 0.45, { wave: 'square', duty: 0.5, gain: 0.03, decay: 0.4, sustain: 0.9, ...FXO }], ['chip', r3(T.s2 + 1.9), 110, 0.3, { wave: 'square', duty: 0.5, gain: 0.025, decay: 0.3, sustain: 0.9, ...FXO }],
  ...printer(T.s2 + 1.45, 18),
  ...Array.from({ length: 8 }, (_, k) => noise(T.s2 + 1.45 + k * 0.17, 6000, 0.03, 0.02)),
  ['pop', r3(T.s2 + 1.5), 880, 0.03, 0.4], ['pop', r3(T.s2 + 1.65), 988, 0.03, 0.5],
  // scan 3: overload: siren, printers, the faint
  ['chip', r3(T.s3 + 1.4), 110, 0.6, { wave: 'square', duty: 0.5, gain: 0.03, decay: 0.5, sustain: 0.9, ...FXO }],
  ...siren(T.s3 + 1.4, T.lost - 0.1),
  ...printer(T.s3 + 1.5, 16), ...printer(T.s3 + 1.95, 14),
  ['whoosh', r3(T.faint), 0.45, 0.05], ['chip', r3(T.faint), AM.A5, 0.45, { wave: 'square', duty: 0.25, slide: -30, gain: 0.02, decay: 0.4, sustain: 0.6, ...FXO }], ['pop', r3(T.faint + 0.4), 150, 0.07, 0.4], ['tick', r3(T.faint + 0.4), 0.05],
  // breakdown: power down
  ['tapeStop', r3(T.lost - 0.3), 0.4], ['chip', r3(T.lost), AM.E5, 0.8, { wave: 'square', duty: 0.5, slide: -40, gain: 0.02, decay: 0.7, sustain: 0.5, ...FXO }], noise(T.lost + 0.05, 900, 0.5, 0.02),
  ...head(T.lost + 0.1, 1, T.lost + 0.55, 4),
  // the clear: typing, analysis, success
  ...Array.from({ length: 12 }, (_, k) => ['tick', r3(T.clear + 0.25 + k * 0.063), 0.02]),
  ...analyze(T.clear + 1.05, 3),
  ...[AM.C5, AM.E5, AM.G5, AM.C6].map((f, k) => ['chip', r3(T.hit + k * 0.06), f, 0.18, { duty: 0.25, gain: 0.03, decay: 0.14, sustain: 0.6, rev: 0.15, dly: 0.12, bus: 'fx' }]),
  ['bell', r3(T.hit), 1318.51, 0.04, 1.6, 0], ['glitter', r3(T.hit), r3(T.hit + 0.9)],
  ...head(T.hit, 1, T.hit + 0.08, 2),
  ...[T.hit, T.hit + 0.42, T.hit + 0.84].flatMap((c, j) => Array.from({ length: 5 }, (_, k) => ['pop', r3(c + 0.03 + k * 0.03), NOTE[(k * 2 + j) % 7], 0.02, ((k % 3) - 1) * 0.4])),
  ['pop', r3(T.reply), 1174.66, 0.045, -0.3], ['pluck', r3(T.reply), 1760, 0.03, 0.5, -0.3],
  // 2 · home: beam, landings, the binder thud, the flip, the finding
  ['whoosh', r3(T.home - 0.2), 0.5, 0.05], warble(T.home, AM.E5, 0.5, 0.016, { slide: 6 }),
  ...head(T.home + 0.1, 2, T.home + 0.4, 1),
  ['pop', r3(T.libDown[1]), 392, 0.04, -0.3], ['tick', r3(T.jarDown[1]), 0.05], ['pop', r3(T.jarDown[1]), 1318.51, 0.025, 0.4],
  ['boom', r3(T.binderDrop[1]), 0.22], noise(T.binderDrop[1], 600, 0.25, 0.04),
  ['whoosh', r3(T.binderOpen[0]), 0.4, 0.04], ['tick', r3(T.binderOpen[1]), 0.05],
  ['pluck', r3(T.write[0] + 0.1), 880, 0.035, 0.6, 0], ['pluck', r3(T.write[1]), 1174.66, 0.035, 0.6, 0], ['pop', r3(T.write[1] + 0.25), 130, 0.07, 0.3], ['tick', r3(T.write[1] + 0.25), 0.06],
  // 3 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'Am' }),
  // 4 · tie-in: stamps
  ['whoosh', r3(T.tie), 0.35, 0.04], ...head(T.tie + 0.02, 4, T.tie + 0.4, 2),
  ...T.chips.flatMap((c, k) => [['pop', r3(c), 130, 0.07, 0], ['tick', r3(c), 0.06], ['pop', r3(c + 0.04), NOTE[3 + k], 0.03, 0.2]]),
  // 5 · the last line: the saucer zips off
  ...head(T.last + 0.02, 4, T.lastLand, 0),
  ['whoosh', r3(T.zip[0]), 0.6, 0.045], warble(T.zip[0] + 0.1, AM.E5, 0.6, 0.014, { slide: -6 }), ['whoosh', r3(T.zip[1] - 0.45), 0.5, 0.05], warble(T.zip[1] - 0.45, AM.A5, 0.45, 0.016, { slide: 24 }),
  ...[T.last + 0.3, T.last + 0.85].flatMap((c, j) => Array.from({ length: 4 }, (_, k) => ['pop', r3(c + k * 0.04), NOTE[(k * 2 + j) % 7], 0.02, ((k % 3) - 1) * 0.4])),
  ['whoosh', r3(T.out[0]), 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lineTimes; void STAR; void LAV
