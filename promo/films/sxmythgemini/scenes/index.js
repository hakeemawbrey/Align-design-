// sxmythgemini — STAR MYTH-BUSTERS #1: "Geminis are two-faced." (30 s vertical Align ad, Star Talk Shows, show 10;
// music: chiptune · Bb). Story 0–25.6, then the shared end card.
//   0.0–4.55   "Myth: Geminis are | *two-faced.*"  The lab lights clunk on. The ♊ Gemini star sits in a glass bell jar
//              on the bench (SUBJECT ♊), waving hello at everyone. THE STARS (gold, goggles up, clipboard): "today's
//              myth: geminis are two-faced." Gemini looks left… right… who, me?
//   4.6–10.0   "Test 1: | the *face scan.*"  (the drop) A cyan scan beam sweeps the jar. The monitor counts FACES: 1…
//              FACES: 2 (alarm! red screen, Pisces gasps on the shelf)… then the counter keeps going, 17… 64… 200, and
//              two hundred little interests pop out around the jar (a bird, a pot, a book, a frog, a camera, bread…).
//              THE STARS: "those aren't faces. those are *hobbies.*"
//   10.05–14.3 "Test 2: | the *interview.*"  GEMINI: "birds! no, pottery! no— *jazz!*" Its thought bubble flips
//              bird → pot → a big gold note; THE STARS scribble, then eye-roll.
//   14.3       card cut.
//   14.35–17.7 "Test 3: | the *lie detector.*"  (breakdown) An electrode pops onto Gemini's tip; the monitor asks
//              "ARE YOU FAKE?". The needle stays dead flat: TRUTH ✓. Then Gemini spots the shiny machine, gets
//              distracted, and the needle starts doodling: a heart, a star. Pisces sobs.
//   17.75–21.0 "Geminis are | *two-faced?*"  (the lift) BUSTED slams over the myth. The jar lifts off; Gemini hops free.
//              THE STARS: "not two-faced. two *hundred* interests."
//   21.05–23.5 "Ask a | *good question.*"  A talk card deals in and flips: "Planned date or spontaneous date?"
//              Gemini goes heart-eyed; its answer bubble: "BOTH!!"
//   23.6–25.45 "Two *hundred* faces. | All curious."  Everything pops out by 25.45; the end card takes over at 25.6.
// One canvas (sky + lab + cast), DOM type + dialogue boxes + stamp + show bug above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, PINK, INK, RED, MINT, CYAN, PHOS, MONO, rgba, pop01, outK, popOut, bump, keyed, r3,
  drawBits, starGeom, drawGoggles, drawWall, drawBench, drawShelf, drawFlask, drawJar, drawMonitor, phosText, drawClipboard,
  drawTears, drawBubble, drawIcon, ICON_KEYS, buildBug, buildStamp, shakeAt, dust,
} from './lab.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
export const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const GEM = signStar('gemini'), PIS = signStar('pisces')
const GEM_T = '#ffe27a'

// ── the timeline
export const T = {
  lights: 0.28, hello: [0.72, 1.0],
  h0: 0.15, h0Land: 0.8, h0Out: [4.38, 4.55],
  open1: 1.1, l1: 1.32, who: [3.3, 3.75, 4.15],
  h1: 4.62, h1Land: 4.98, scan: [BEAT(8), 6.45], f1: 5.35, f2: 5.75, climb: [6.1, 7.0], l2: 7.2,
  h1Out: [9.85, 10.0],
  h2: 10.05, h2Land: 10.38, l3: 10.6,
  cut: 14.3,
  h3: 14.38, h3Land: 14.7, wire: [14.5, 14.85], q: 15.0, truth: 15.75, distract: 16.15, heart: [16.3, 16.95], star: [17.0, 17.45], sob: 16.45,
  h3Out: [17.55, 17.7],
  h4: 17.78, h4Land: 18.05, stamp: BEAT(32), lift: [18.62, 19.3], free: 19.32, l4: 18.75,
  h4Out: [20.85, 21.0],
  h5: 21.08, h5Land: 21.42, deal: [21.15, 21.6], flip: [21.66, 21.98], heartEyes: 22.05, both: 22.45, cardOut: [23.25, 23.48], h5Out: [23.3, 23.48],
  h6: 23.6, h6Land: 23.98, wink: 24.4, out: [25.05, 25.45], h6Out: [25.18, 25.45],
}

// ── the lines
const SS = 'THE STARS', SG = `${GEM.glyph}︎ GEMINI`
const CPS = 28
const LINES1 = [
  { t: T.l1, speaker: SS, text: "today's myth: geminis are *two-faced.*" },
  { t: T.l2, speaker: SS, text: "those aren't faces. those are *hobbies.*" },
  { t: T.l3, speaker: SG, color: GEM_T, text: 'birds! no, pottery! no— *jazz!*' },
]
const LINES2 = [{ t: T.l4, speaker: SS, text: 'not two-faced. two *hundred* interests.' }]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
T.close1 = r3(LT1[2].done + 1.55)
T.close2 = r3(LT2[0].done + 1.55)
T.h2Out = [r3(T.close1 - 0.05), r3(T.close1 + 0.1)]
// test 2: the thought bubble flips as each answer is typed
const charAt = (lt, text, word) => { const plain = text.replace(/\*/g, ''); return lt.chars[plain.indexOf(word)] }
T.ans = [charAt(LT1[2], LINES1[2].text, 'birds'), charAt(LT1[2], LINES1[2].text, 'pottery'), charAt(LT1[2], LINES1[2].text, 'jazz')]
T.roll = r3(T.ans[2] + 0.55)

const HOPS = {
  stars: [...talkHops(LINES1, SS, { cps: CPS }), ...talkHops(LINES2, SS, { cps: CPS }), T.stamp + 0.3, T.wink],
  gem: [...T.hello, ...talkHops(LINES1, SG, { cps: CPS }), 6.3, 6.68, 7.05, T.free, T.free + 0.45, T.heartEyes, T.both, T.h6Land],
  pis: [T.f2 + 0.02, T.sob, T.stamp + 0.1, T.h6 + 0.3],
}

// ── where things are
const JAR = { cx: 540, base: 1336, w: 384, h: 440 }
const GEM_P = { x: 540, y: 1168, size: 280 }
const HOST = { x: 872, y: 1046, size: 210 }
const PIS_P = { x: 940, y: 694, size: 112 }
const SHELF = { cx: 935, y: 756, w: 300 }
const MON = { cx: 192, cy: 878, w: 300, h: 230 }
const CARD = { cx: 540, cy: 738, h: 560 }
const SEED = { gem: 4, stars: 9, pis: 23 }

// ── moods: [t, { mood, look, blink, sq }]
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const GEM_K = [
  [0, S_('happy')], [T.l1 + 0.6, S_('neutral', [1, -1])], [LT1[0].done - 0.25, S_('wide', [0, 0], { blink: false })],
  [T.who[0], S_('wide', [-1, 0], { blink: false })], [T.who[1], S_('wide', [1, 0], { blink: false })], [T.who[2], S_('neutral', [0, 0], { blink: 0.3 })],
  [T.scan[0], S_('neutral', [0, -1], { blink: false })], [T.f2, S_('wide', [0, 0], { blink: false, sq: -0.05 })], [T.climb[0] + 0.1, S_('sparkle', [0, -1])], [T.l2, S_('happy')],
  [T.h2, S_('neutral', [1, 0])], [T.ans[0], S_('happy')], [T.ans[1], S_('sparkle', [0, -1])], [T.ans[2], S_('heart')], [T.ans[2] + 1.0, S_('happy')],
  [T.cut, S_('neutral', [0, -1], { blink: false })], [T.q + 0.2, S_('neutral', [0, 0], { blink: false })], [T.truth, S_('happy')],
  [T.distract, S_('sparkle', [-1, 0])], [T.star[1] + 0.05, S_('sparkle', [-1, -1])],
  [T.h4, S_('wide', [0, -1], { blink: false })], [T.stamp, S_('wide', [0, -1], { blink: false, sq: 0.08 })], [T.stamp + 0.35, S_('sparkle', [0, -1])], [T.free, S_('happy')],
  [T.deal[0], S_('wide', [0, -1], { blink: false })], [T.heartEyes, S_('heart')], [T.cardOut[0], S_('happy')], [T.h6 + 0.5, S_('sparkle', [0, 0])], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const STARS_K = [
  [0, S_('neutral', [-1, 0])], [T.l1, S_('squint', [-1, 0])], [LT1[0].done + 0.3, S_('neutral', [0, 0])],
  [T.scan[0], S_('neutral', [-1, 0])], [T.f2, S_('wide', [-1, 0], { blink: false, sq: -0.07 })], [T.climb[0] + 0.3, S_('wide', [-1, -1], { blink: false })], [T.l2, S_('squint', [0, 0])], [LT1[1].done, S_('neutral', [-1, 0])],
  [T.l3, S_('squint', [-1, 0])], [T.roll, S_('eyeroll')], [T.roll + 0.9, S_('neutral', [-1, 0])],
  [T.cut, S_('squint', [-1, -1])], [T.truth, S_('neutral', [-1, 0])], [T.heart[0] + 0.2, S_('wide', [-1, 0], { blink: false })], [T.star[0] + 0.1, S_('happy')],
  [T.h4, S_('squint', [-1, -1])], [T.stamp, S_('happy', [0, 0], { sq: 0.06 })], [T.l4, S_('happy')], [LT2[0].done + 0.2, S_('wink')], [LT2[0].done + 0.7, S_('happy')],
  [T.deal[0], S_('neutral', [-1, -1])], [T.both, S_('happy')], [T.h6, S_('happy')], [T.wink, S_('wink')], [T.wink + 0.5, S_('happy')],
]
const PIS_K = [
  [0, S_('sparkle', [-1, 1])], [T.f2, S_('wide', [-1, 1], { blink: false, sq: -0.08 })], [T.climb[0] + 0.4, S_('sparkle', [-1, 1])],
  [T.cut, S_('neutral', [-1, 1])], [T.sob, S_('sparkle', [-1, 1])], [T.stamp, S_('wide', [-1, 1], { blink: false })], [T.stamp + 0.4, S_('sparkle', [-1, 1])],
]
const TEARS = [[0, 0.5], [T.f2, 0], [T.climb[1], 0.6], [T.sob, 1.6], [T.h4, 0.9], [T.free, 1.4], [T.h6, 1.8]]

// ── sound helpers
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "900 140px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [backIm, talkIm] = await Promise.all([load('card-back.png'), load('card-talk-6.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = [
    [popText(root, 'Myth: Geminis are | *two-faced.*', { top: 196, size: 104, accentSize: 150, at: T.h0, gap: 0.1, accentColor: GEM_T, wobble: true, late: 1, lateAt: T.h0Land }), T.h0Out],
    [popText(root, 'Test 1: | the *face scan.*', { top: 196, size: 104, accentSize: 140, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CYAN }), T.h1Out],
    [popText(root, 'Test 2: | the *interview.*', { top: 196, size: 104, accentSize: 140, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CYAN }), T.h2Out],
    [popText(root, 'Test 3: | the *lie detector.*', { top: 196, size: 104, accentSize: 140, at: T.h3, late: 3, lateAt: T.h3Land, wobble: true, accentColor: CYAN }), T.h3Out],
    [popText(root, 'Geminis are | *two-faced?*', { top: 196, size: 112, accentSize: 160, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: GEM_T }), T.h4Out],
    [popText(root, 'Ask a | *good question.*', { top: 150, size: 104, accentSize: 140, at: T.h5, late: 2, lateAt: T.h5Land, wobble: true, accentColor: GOLD }), T.h5Out],
    [popText(root, 'Two *hundred* faces. | All curious.', { top: 300, size: 104, accentSize: 150, at: T.h6, gap: 0.14, accentColor: GOLD, wobble: true }), T.h6Out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1430, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1430, width: 960, height: 290, open: T.l4 - 0.22, close: T.close2, cps: CPS })
  const stamp = buildStamp(root, { at: T.stamp, out: T.h4Out, cx: 540, cy: 330, w: 720, h: 230, rot: -10 })
  const bug = buildBug(root, { at: 0.35, out: [STORY_END - 0.35, STORY_END - 0.05] })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }, root)

  // ── the monitor screens
  function screen(x, sx, sy, sw, sh, t) {
    const cx = sx + sw / 2
    if (t < T.h1) {                       // idle: STANDBY + blinking cursor
      phosText(x, 'SUBJECT:', sx + 16, sy + 34, 24); phosText(x, 'GEMINI', sx + 16, sy + 70, 34)
      phosText(x, 'STANDBY' + (Math.floor(t * 2.5) % 2 ? '_' : ''), sx + 16, sy + sh - 30, 22, { alpha: 0.75 })
      return
    }
    if (t < T.cut) {                      // the face scan
      const alarm = t >= T.f2 && t < T.climb[0]
      if (alarm && Math.floor((t - T.f2) * 7) % 2 === 0) { x.fillStyle = 'rgba(255,40,70,0.55)'; x.fillRect(sx, sy, sw, sh) }
      const col = alarm ? '#ffd0d6' : PHOS
      phosText(x, 'FACE SCAN', sx + 16, sy + 30, 22, { color: col })
      let n = t < T.f1 ? 0 : t < T.f2 ? 1 : t < T.climb[0] ? 2 : Math.round(lerp(2, 200, ease.inCubic(prog(t, ...T.climb))))
      if (t >= T.scan[0] && t < T.f1) n = Math.floor((t - T.scan[0]) * 20) % 2
      phosText(x, 'FACES:', sx + 16, sy + 78, 26, { color: col })
      const k = t >= T.climb[1] ? 1 + 0.25 * bump(t, T.climb[1], 0.3) : 1
      phosText(x, String(n), cx + 4, sy + 116, Math.round((n >= 100 ? 58 : 64) * k), { align: 'center', color: alarm ? '#ffffff' : n >= 200 ? MINT : PHOS })
      if (t >= T.l2 + 0.6) phosText(x, '(HOBBIES)', cx, sy + sh - 14, 18, { align: 'center', alpha: clamp((t - T.l2 - 0.6) * 3) })
      return
    }
    // the lie detector
    phosText(x, 'LIE DETECTOR', sx + 16, sy + 28, 21)
    if (t >= T.q) phosText(x, 'Q: ARE YOU FAKE?', sx + 16, sy + 60, 19, { alpha: clamp((t - T.q) * 4) })
    const base = sy + sh * 0.7, span = 2.2
    x.save(); x.strokeStyle = PHOS; x.lineWidth = 4; x.shadowColor = PHOS; x.shadowBlur = 8
    x.beginPath()
    for (let k = 0; k <= 60; k++) {
      const tt = t - span + (k / 60) * span
      if (tt < T.wire[1]) continue
      const yy = base + Math.sin(tt * 40 + k) * 1.5
      const px = sx + (k / 60) * sw
      if (k === 0 || tt - span / 60 < T.wire[1]) x.moveTo(px, yy); else x.lineTo(px, yy)
    }
    x.stroke()
    // the doodles (Gemini got distracted by the shiny machine)
    const heart = (p, k) => { const a = Math.PI * 2 * p; return [16 * Math.sin(a) ** 3, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))].map(v => v * k) }
    const starP = (p, k) => { const q = p * 5, i = Math.floor(q) % 5, f = q - Math.floor(q); const pt = j => { const a = -Math.PI / 2 + (j * 2 % 5) * Math.PI * 2 / 5; return [Math.cos(a), Math.sin(a)] }; const [a, b] = [pt(i), pt(i + 1)]; return [lerp(a[0], b[0], f) * k, lerp(a[1], b[1], f) * k] }
    const draw = (fn, [t0, t1], ox, oy, k, col) => {
      const p = prog(t, t0, t1)
      if (p <= 0) return
      x.strokeStyle = col; x.shadowColor = col; x.beginPath()
      const N = Math.max(2, Math.round(80 * p))
      for (let i = 0; i <= N; i++) { const [u, v] = fn((i / 80), k); i ? x.lineTo(ox + u, oy + v) : x.moveTo(ox + u, oy + v) }
      x.stroke()
      if (p < 1) { const [u, v] = fn(p, k); x.fillStyle = '#ffffff'; x.fillRect(ox + u - 4, oy + v - 4, 8, 8) }
    }
    draw(heart, T.heart, sx + sw * 0.32, sy + sh * 0.5, 2.6, PINK)
    draw(starP, T.star, sx + sw * 0.74, sy + sh * 0.5, 30, GOLD)
    x.restore()
    if (t >= T.truth && t < T.heart[0] + 0.2) {
      const a = pop01(t, T.truth, 0.25, 2.4)
      x.save(); x.translate(sx + sw / 2, sy + sh - 16); x.scale(a, a); phosText(x, 'TRUTH ✓', 0, 0, 22, { align: 'center', color: MINT }); x.restore()
    }
    if (t >= T.heart[1]) phosText(x, 'RESULT: GENUINE', sx + sw / 2, sy + sh - 16, 19, { align: 'center', color: PINK, alpha: clamp((t - T.heart[1]) * 4) })
  }

  // ── the talk card (deal in from below, flip, then out)
  function drawCard(t) {
    if (t < T.deal[0] || t > T.cardOut[1] || !talkIm) return
    const din = ease.outCubic(prog(t, ...T.deal)), fp = prog(t, ...T.flip), dout = ease.inCubic(prog(t, ...T.cardOut))
    const h = CARD.h * (1 - 0.15 * dout), w = h * 732 / 1170
    const cx = CARD.cx, cy = lerp(1500, CARD.cy, din) - 30 * bump(t, T.flip[1], 0.3) + dout * 40
    const rot = lerp(0.35, -0.03, din) + 0.02 * Math.sin(t * 2)
    const sxk = Math.abs(Math.cos(Math.PI * fp)) * (1 + 0.06 * Math.sin(Math.PI * fp))
    x.save(); x.globalAlpha = 1 - dout; x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, sxk), 1)
    x.shadowColor = 'rgba(242,199,92,0.45)'; x.shadowBlur = 40
    if (fp < 0.5 && backIm) x.drawImage(backIm, 119, 119, 1320, 2107, -w / 2, -h / 2, w, h)
    else x.drawImage(talkIm, -w / 2, -h / 2, w, h)
    x.restore()
    if (t > T.flip[1]) { x.save(); x.globalAlpha = 1 - prog(t, T.flip[1], T.flip[1] + 0.6); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2, rr = 260 + 140 * prog(t, T.flip[1], T.flip[1] + 0.6); drawPixelStar(x, cx + Math.cos(a) * rr * 0.7, cy + Math.sin(a) * rr, 26, i % 2 ? 1 : 2, i % 2 ? GOLD : BONE) } x.restore() }
  }

  // ── the hobby swarm (test 1) — 18 interests orbiting the jar
  const SWARM = Array.from({ length: 18 }, (_, i) => ({ k: ICON_KEYS[i % ICON_KEYS.length], a0: i / 18 * Math.PI * 2 + (i % 3) * 0.2, born: T.climb[0] + 0.05 + i * 0.05, rr: 0.86 + ((i * 7) % 5) * 0.06 }))
  function drawSwarm(t, front) {
    if (t < T.climb[0] || t > T.h2 + 0.4) return
    const gone = prog(t, T.h2 - 0.15, T.h2 + 0.35)
    for (const s of SWARM) {
      const p = pop01(t, s.born, 0.3, 2.4)
      if (p <= 0.01) continue
      const a = s.a0 + (t - T.climb[0]) * 0.55
      const isFront = Math.sin(a) > 0
      if (isFront !== front) continue
      const rr = s.rr * (1 - ease.inCubic(gone) * 0.85)
      const ix = 540 + Math.cos(a) * 340 * rr, iy = 1110 + Math.sin(a) * 190 * rr
      drawIcon(x, s.k, Math.round(ix), Math.round(iy + Math.sin(t * 3 + s.a0 * 3) * 6), (front ? 8 : 6) * p * (1 - gone), { alpha: front ? 1 : 0.7 })
    }
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const sh = shakeAt(t, T.stamp, 10)
    // ── Pisces on the shelf (goggles up, crying, always)
    const ps = keyed(t, PIS_K)
    const pisO = { color: PIS.color, ...ps, hops: HOPS.pis, seed: SEED.pis, squash: (ps.sq || 0) + (t > T.sob && t < T.sob + 1.6 ? 0.04 * Math.sin(t * 30) : 0), pop: ok, glow: 0.8 }
    const rp = drawStarChar(x, PIS_P.x + sh * 0.5, PIS_P.y, PIS_P.size, t, pisO)
    const gp = starGeom(t, rp, PIS_P.size, pisO)
    drawGoggles(x, gp, t, { alpha: ok })
    drawTears(x, gp, t, { rate: keyed(t, TEARS) || 0.01, alpha: keyed(t, TEARS) > 0 ? ok : 0, seed: 3 })
    // ── THE STARS (host)
    const hs = keyed(t, STARS_K)
    const hostO = { color: STAR.sky, ...hs, hops: HOPS.stars, seed: SEED.stars, squash: hs.sq || 0, pop: ok, glow: 1.1 }
    const rh = drawStarChar(x, HOST.x + sh * 0.5, HOST.y, HOST.size, t, hostO)
    const gh = starGeom(t, rh, HOST.size, hostO)
    drawGoggles(x, gh, t, { alpha: ok })
    const scrib = (t > T.l3 && t < T.roll) || (t > T.q && t < T.truth + 0.4) ? 1 : 0
    drawClipboard(x, HOST.x + 96, HOST.y + 74 - 6 * bump(t, T.roll, 0.4), 7 * ok, t, { scribble: scrib, rot: -0.14 + 0.04 * Math.sin(t * 2) })
    return { gp, gh }
  }

  function drawGemini(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    const gs = keyed(t, GEM_K)
    const freeK = ease.outCubic(prog(t, T.free, T.free + 0.4))
    const who = t > T.who[0] && t < T.who[2] ? 0.03 * Math.sin((t - T.who[0]) * 14) : 0
    const o = { color: GEM.color, glyph: GEM.glyph, ...gs, hops: HOPS.gem, seed: SEED.gem, squash: (gs.sq || 0) + who, pop: ok * pop01(t, 0.3, 0.4, 2.2), glow: 1.15 + 0.3 * bump(t, T.climb[1], 0.6) }
    const r = drawStarChar(x, GEM_P.x + shakeAt(t, T.stamp, 10) * 0.6, GEM_P.y - 30 * freeK, GEM_P.size, t, o)
    return { r, g: starGeom(t, r, GEM_P.size, o) }
  }

  function scene(t) {
    const sh = shakeAt(t, T.stamp, 12)
    drawSky(x, t, { ...SKY_H, dim: 0.42, dy: sh })
    x.save(); x.globalAlpha = 1 - ease.inOutQuad(prog(t, T.out[0], T.out[1]))   // the lab fades away before the end card
    x.save(); x.translate(0, sh)
    drawWall(x, t)
    // shelf + flasks + Pisces
    drawShelf(x, SHELF.cx, SHELF.y, SHELF.w)
    drawFlask(x, 832, SHELF.y - 2, 7, PINK, t, { kind: 'cone', seed: 2 })
    drawFlask(x, 1040, SHELF.y - 2, 6, '#9a7be0', t, { kind: 'tube', seed: 5 })
    // monitor
    drawMonitor(x, MON.cx, MON.cy, MON.w, MON.h, t, (c, sx, sy, sw, sh2) => screen(c, sx, sy, sw, sh2, t), { on: clamp((t - T.lights - 0.2) * 4) * popOut(t, T.out) })
    // bench + bench flasks
    drawBench(x, t)
    drawFlask(x, 296, 1334, 8, MINT, t, { kind: 'cone', seed: 7, boil: t > T.climb[0] && t < T.h2 ? 2 : 1 })
    drawFlask(x, 1012, 1334, 7, CYAN, t, { kind: 'tube', seed: 11 })
    drawFlask(x, 800, 1334, 6, GOLD, t, { kind: 'cone', seed: 13 })
    x.restore()

    // the scan beam (behind the jar glass, over Gemini)
    const jarA = popOut(t, T.out)
    const lift = prog(t, ...T.lift)
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: jarA, part: 'back', label: `SUBJECT ${GEM.glyph}︎` })
    drawSwarm(t, false)
    const cast = drawStars(t)
    const gem = drawGemini(t)
    if (t >= T.scan[0] && t < T.scan[1]) {
      const p = prog(t, ...T.scan), yy = JAR.base - 40 - Math.abs(Math.sin(Math.PI * p * 1.5)) * (JAR.h - 40)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(0, yy - 60, 0, yy + 10); g.addColorStop(0, 'rgba(127,224,255,0)'); g.addColorStop(1, 'rgba(127,224,255,0.35)')
      x.fillStyle = g; x.fillRect(JAR.cx - JAR.w / 2 - 30, yy - 60, JAR.w + 60, 70)
      x.fillStyle = 'rgba(190,245,255,0.95)'; x.fillRect(JAR.cx - JAR.w / 2 - 30, yy, JAR.w + 60, 6)
      x.restore()
    }
    // test 3: the electrode on Gemini's tip + the wire to the monitor
    if (gem && t >= T.wire[0] && t < T.h4 + 0.2) {
      const e = gem.g.pt(18, 3.2), wp = ease.outCubic(prog(t, ...T.wire)), ga = 1 - prog(t, T.h4 - 0.1, T.h4 + 0.2)
      const kx = JAR.cx, ky = JAR.base - JAR.h - 12
      x.save(); x.globalAlpha = ga
      x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(MON.cx + MON.w / 2 - 6, MON.cy + 40); x.bezierCurveTo(400, 760, 470, 800, kx, ky); x.lineTo(lerp(kx, e.x, wp), lerp(ky, e.y, wp)); x.stroke()
      x.strokeStyle = '#ff6a8a'; x.lineWidth = 5; x.stroke()
      if (wp > 0.98) drawBits(x, ['.SSS.', 'SSSSS', 'KKKKK'], { S: '#9aa0c8', K: '#5a5f8a' }, e.x, e.y - 6, 5)
      x.restore()
    }
    drawJar(x, JAR.cx, JAR.base + sh, JAR.w, JAR.h, t, { alpha: jarA, lift, part: 'front' })
    drawSwarm(t, true)
    if (gem && t >= T.free && t < T.free + 0.7) sparkleRing(t, gem.r.x, gem.r.y, T.free, 10, 200)

    // test 2: the thought bubble
    if (t >= T.ans[0] - 0.1 && t < T.close1 + 0.2) {
      const a = pop01(t, T.ans[0] - 0.1, 0.3, 2.2) * (1 - prog(t, T.close1 - 0.1, T.close1 + 0.15))
      const bx = 540, by = 790
      drawBubble(x, bx, by, 200, 150, a)
      const k = T.ans.reduce((n, at, i) => (t >= at ? i : n), 0)
      const key = ['bird', 'pot', 'note'][k], pp = pop01(t, T.ans[k], 0.28, 3)
      if (a > 0.3) drawIcon(x, key, bx, by, (k === 2 ? 15 : 12) * pp * a)
    }
    // the answer bubble: BOTH!!
    if (t >= T.both && t < T.cardOut[1] + 0.3) {
      const a = pop01(t, T.both, 0.28, 2.6) * (1 - prog(t, T.cardOut[1], T.cardOut[1] + 0.25))
      drawBubble(x, 300, 1100, 230, 96, a, { tail: 'down-right' })
      if (a > 0.2) { x.save(); x.translate(300, 1100); x.scale(a, a); x.font = `800 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('BOTH!!', 0, 2); x.restore() }
    }
    drawCard(t)
    // busted: dust off the slam
    dust(x, t, T.stamp, 540, 420, { n: 12, R: 420, col: '#ffb3bd' })
    x.restore()
    void cast
  }

  function sparkleRing(t, cx, cy, t0, n, R) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.5 * p), cy + Math.sin(a) * R * (0.6 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, GEM_T, MINT][i % 4]) }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      scene(t)
      for (const [h, o] of H) h.update(t, outK(t, o))
      box1.update(t); box2.update(t)
      stamp.update(t)
      bug.update(t)
      drawGrain(gx, t)
      // the lights clunk on (black → flicker → on)
      const L = T.lights
      black.style.opacity = String(t < L ? 1 : t < L + 0.06 ? 0.04 : t < L + 0.12 ? 0.6 : 0)
    },
  }
}

// one card cut kept (cardfx picks the middle of three): 14.3, between the interview and the lie detector
const CUTS = [4.56, T.cut, 17.72]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const chipC = (t, f, len, o = {}) => ['chip', r3(t), f, len, { gain: 0.02, ...o }]
export const CUES = [
  // lights clunk on, Gemini says hi
  ['boom', T.lights, 0.14], ['tick', T.lights, 0.06], ['tick', T.lights + 0.12, 0.04],
  ...wordPops(T.h0, 3, 0.1, 0), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pluck', T.h0Land, 1318.51, 0.035, 0.5, 0],
  ['pop', T.hello[0], 987.77, 0.03, 0], ['pop', T.hello[1], 1174.66, 0.03, 0],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ['tick', T.who[0], 0.03], ['tick', T.who[1], 0.03], ['pop', T.who[2], 440, 0.025, 0],
  // test 1: the face scan
  ...wordPops(T.h1, 2, 0.08, 2), ['pop', T.h1Land, 1174.66, 0.04, 0], ['pop', T.h1Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.scan[0], 1.4, 0.035], chipC(T.scan[0], 1760, 0.08), chipC(T.f1, 1318.51, 0.1, { gain: 0.03 }),
  chipC(T.f2, 1760, 0.12, { gain: 0.04 }), chipC(T.f2 + 0.15, 1318.51, 0.12, { gain: 0.04 }), chipC(T.f2 + 0.3, 1760, 0.12, { gain: 0.04 }),
  ['pop', T.f2 + 0.05, 330, 0.04, 0.4],
  ...Array.from({ length: 16 }, (_, i) => chipC(T.climb[0] + i * (T.climb[1] - T.climb[0]) / 16, 660 * Math.pow(2, i / 10), 0.05, { gain: 0.016 })),
  ['glitter', T.climb[0] + 0.05, T.climb[1] + 0.2], ['bell', T.climb[1], 1760, 0.03, 1.4, 0],
  ...Array.from({ length: 9 }, (_, i) => ['pop', r3(T.climb[0] + 0.05 + i * 0.1), NOTE[(i * 3) % 7] * 2, 0.018, ((i % 3) - 1) * 0.4]),
  // test 2: the interview
  ...wordPops(T.h2, 2, 0.08, 1), ['pop', T.h2Land, 1174.66, 0.04, 0], ['pop', T.h2Land + 0.1, 1318.51, 0.035, 0],
  ['pop', T.ans[0], 1318.51, 0.03, -0.2], ['pop', T.ans[1], 987.77, 0.03, 0], ['pluck', T.ans[2], 1174.66, 0.05, 0.6, 0.1], ['pluck', T.ans[2] + 0.12, 1567.98, 0.04, 0.6, 0.1],
  ['pop', T.roll, 220, 0.03, 0.3],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // test 3: the lie detector
  ...wordPops(T.h3, 2, 0.08, 3), ['pop', T.h3Land, 1174.66, 0.04, 0], ['pop', T.h3Land + 0.1, 1318.51, 0.035, 0], ['pop', T.h3Land + 0.2, 1567.98, 0.03, 0],
  ['whoosh', T.wire[0], 0.35, 0.03], ['pop', T.wire[1], 260, 0.05, 0], ['pop', T.wire[1] + 0.04, 520, 0.02, 0],
  chipC(T.q, 880, 0.08), chipC(T.q + 0.1, 1174.66, 0.08),
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.q + 0.2 + i * 0.12), 0.015]),
  chipC(T.truth, 1318.51, 0.1, { gain: 0.03 }), chipC(T.truth + 0.1, 1760, 0.18, { gain: 0.03 }),
  ['pop', T.distract, 1567.98, 0.03, -0.3], ['glitter', T.heart[0], T.star[1]],
  ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T.heart[0] + i * 0.14), NOTE[i % 7] * 2, 0.025, 0.4, -0.2]),
  ['bell', T.star[1], 1760, 0.03, 1.2, 0], ['pop', T.sob, 392, 0.03, 0.4],
  // busted
  ...wordPops(T.h4, 2, 0.09, 0), ['pop', T.h4Land, 1174.66, 0.045, 0],
  ['whoosh', T.stamp - 0.18, 0.2, 0.05], ['boom', T.stamp, 0.5], ['crash', T.stamp, { gain: 0.07 }], ['tick', T.stamp, 0.08],
  ['whoosh', T.lift[0], 0.6, 0.04], ['pop', T.free, 987.77, 0.04, 0], ['pop', T.free + 0.45, 1318.51, 0.035, 0], ['glitter', T.free, T.free + 0.5],
  ['pop', T.l4 - 0.22, 739.99, 0.04, 0],
  // tie-in: the talk card
  ...wordPops(T.h5, 2, 0.08, 2), ['pop', T.h5Land, 1174.66, 0.04, 0], ['pop', T.h5Land + 0.1, 1318.51, 0.035, 0],
  ['whoosh', T.deal[0], 0.4, 0.045], ['tick', T.deal[1], 0.04], ['whoosh', T.flip[0], 0.25, 0.03], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.flip[1], T.flip[1] + 0.5],
  ['pluck', T.heartEyes, 1174.66, 0.045, 0.5, 0], ['pluck', T.heartEyes + 0.12, 1567.98, 0.04, 0.5, 0],
  ['pop', T.both, 1318.51, 0.045, -0.3], ['pop', T.both + 0.08, 1567.98, 0.04, -0.3],
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.cardOut[0], 0.3, 0.03],
  // the last line
  ...wordPops(T.h6, 5, 0.14, 1, 0.03), ['pluck', T.h6 + 0.14, 1174.66, 0.04, 0.6, 0],
  ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2], ['pop', T.h6 + 0.3, 392, 0.025, 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES1, { cps: CPS, pitch: { [SS]: 880, [SG]: 1318.51 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [SS]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void rgba; void RED; void drawPixelStar; void easeOutBack
