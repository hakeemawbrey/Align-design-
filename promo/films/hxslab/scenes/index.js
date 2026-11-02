// hxslab — "Candy Paint." (45 s vertical Align ad, Star Talk "Wild Lessons", Houston: a slow-rolling music video;
// music: screwed · C#m). Story 0–40.6, then the shared end card. No show bug.
//   0.0–4.5    "All *shine,* | no talk?"  Night, a Houston boulevard, the skyline behind: ♈ ARIES rolls a candy-painted
//              slab (flake paint, chrome swangas poking out) with ♉ TAURUS riding shotgun. Music-video chrome: letterbox,
//              a credit block bottom-left. ARIES: "you see this *shine?*"  (♓ Pisces cries in the back seat, as ever.)
//   4.6–8.8    "The *flex.*"  The drop: the trunk pops, a neon sign inside reads LOOK AT ME, the swangas glint.
//              ARIES: "elbows. *candy.* trunk *popped.*"
//   8.85–11.9  "Full *speed.*"  Aries guns it: speed lines, Taurus holds on. TAURUS: "can we go… *slower?*"
//  12.0–15.2   "Slower? | In a *slab?*"  ARIES: "slower? it's a… *oh.*"  The penny drops: a slab is built to roll slow.
//  15.3        the one card cut.
//  15.35–19.4 "Now: | *screwed* speed."  Everything goes half-time: ghost trails, a chopped caption stutter. ARIES:
//              "so… how was your *day?*"
//  19.5–23.5  "Actually | *listening.*"  Aries turns the music down. TAURUS: "honestly? kinda *long.*"  ARIES: "tell me."
//  23.6–28.7  "Parked. | *Real* talk."  They park under the skyline; the trunk sign flickers from LOOK AT ME to TALK TO ME;
//              a heart.
//  28.93      ★ LESSON UNLOCKED: "Slow it *down.*"
//  33.5–37.85 "Ask about | *their* day."  A talk card ("Best part of | your *day?*"); both play; both flip: "This |
//              ride." ✓ ✓  ARIES: "same. *right now.*"
//  37.95–40.42 "Candy paint. | *Real* talk."  Frame 0's shot, changed: the same slab, rolling slow, TALK TO ME glowing,
//              both talking. Everything clears by 40.42; the end card takes over at 40.6.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, GOLD, BONE, PINK, LAV, MONO, SERIF, BEAT, R, rgba, pop01, outK, popOut, inW, bump, keyed, S_, win,
  drawPixelHeart, drawTissue, drawSweat, makeFx, drawCardBack, drawTalkCard, drawAnswerCard, SND } from './kit.js'

export { BEAT }
export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
export const KEY = 'C#m'
const CANDY = ['#7a2ad0', '#c03ad8', '#ff5ab0'], CHROME = '#e8ecf4', NEON = '#ff4fb8', NEON2 = '#4ff0ff'

const ARI = signStar('aries'), TAU = signStar('taurus'), PIS = signStar('pisces')
const ARI_T = '#ff9a7a', TAU_T = '#ffd27a'

export const T = {
  h0Out: [4.3, 4.48], l1: -2.0,
  h1: 4.6, h1Land: BEAT(8), h1Out: [8.62, 8.78], trunk: BEAT(8), glint: [6.3, 7.4], l2: 4.95,
  h2: 8.85, h2Land: 9.2, h2Out: [11.75, 11.9], gun: 8.9, l3: 9.6,
  h3: 12.0, h3Land: 12.4, h3Out: [15.06, 15.2], l4: 12.3, penny: 13.6, closeA: 15.28,
  cut: 15.3,
  h4: 15.36, h4Land: 15.8, h4Out: [19.25, 19.4], l5: 16.0, stutter: [17.6, 18.9],
  h5: 19.5, h5Land: 19.85, h5Out: [23.4, 23.55], knob: 19.6, l6: 19.75, l7: 22.55,
  h6: 23.6, h6Land: 24.0, h6Out: [28.55, 28.7], park: [23.6, 24.6], swap: 25.2, heart1: 26.0, closeB: 24.6,
  lesson: BEAT(51), lessonOut: [33.25, 33.45],
  h7: 33.5, h7Land: BEAT(60), h7Out: [37.7, 37.85], tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l8: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.5, 37.8], closeC: 37.7,
  h8: 37.98, h8Land: BEAT(68), roll: 37.9, heart2: 38.9, out: [39.98, 40.42], h8Out: [40.18, 40.42],
}

const SARI = `${ARI.glyph}︎ ARIES`, STAU = `${TAU.glyph}︎ TAURUS`
const LINES_A = [
  { t: T.l1, speaker: SARI, color: ARI_T, text: 'you see this *shine?*' },
  { t: T.l2, speaker: SARI, color: ARI_T, text: 'elbows. *candy.* trunk *popped.*' },
  { t: T.l3, speaker: STAU, color: TAU_T, text: 'can we go… *slower?*' },
  { t: T.l4, speaker: SARI, color: ARI_T, text: "slower? it's a… *oh.*" },
]
const LINES_B = [
  { t: T.l5, speaker: SARI, color: ARI_T, text: 'so… how was your *day?*' },
  { t: T.l6, speaker: STAU, color: TAU_T, text: 'honestly? kinda *long.*' },
  { t: T.l7, speaker: SARI, color: ARI_T, text: '*tell me.*' },
]
const LINES_C = [{ t: T.l8, speaker: SARI, color: ARI_T, text: 'same. *right now.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const ALL = [LINES_A, LINES_B, LINES_C]
const HOPS = { ari: ALL.flatMap(L => talkHops(L, SARI, { cps: CPS })), tau: ALL.flatMap(L => talkHops(L, STAU, { cps: CPS })) }
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Slow it *down.*', chip: 'REAL TALK ★', accentColor: GOLD, dim: 0.62 }

// ── the road: speed (px/s of scenery) over time
function speed(t) {
  if (t < T.gun) return 420
  if (t < T.penny) return lerp(420, 1500, ease.inOutCubic(prog(t, T.gun, T.gun + 0.6)))
  if (t < T.cut) return lerp(1500, 220, ease.inOutCubic(prog(t, T.penny, T.penny + 1.2)))
  if (t < T.park[0]) return 160
  if (t < T.roll) return lerp(160, 0, ease.inOutCubic(prog(t, ...T.park)))
  return lerp(0, 150, ease.inOutCubic(prog(t, T.roll, T.roll + 0.8)))
}
// scenery distance travelled (integral of speed; sampled)
function dist(t) {
  let d = 0; const st = 0.05
  for (let u = 0; u < t; u += st) d += speed(u) * Math.min(st, t - u)
  return d
}
const slowK = t => win(t, T.cut, T.park[1], 0.3) + ease.inOutCubic(prog(t, T.roll, T.roll + 0.8))

const ROAD = 1290
const CAR = { cx: 520, by: 1290, w: 860 }
const ARI_SEAT = [330, 1004, 170], TAU_SEAT = [515, 1004, 170], PIS_SEAT = [664, 1030, 96]
const SEED = { ari: 5, tau: 12, pis: 23 }

const ARI_K = [
  [0, S_('happy', [1, 0])], [T.l2, S_('happy', [1, 0])], [T.glint[0], S_('wink', [1, 0])], [T.h2, S_('squint', [-1, 0], { blink: false })],
  [T.l3, S_('neutral', [1, 0])], [T.l4, S_('neutral', [1, 0])], [T.penny, S_('wide', [0, 0], { blink: false })], [T.penny + 0.8, S_('happy', [1, 0])],
  [T.h4, S_('neutral', [1, 0], { blink: 0.25 })], [T.l5, S_('sparkle', [1, 0])], [T.l6, S_('sparkle', [1, 0])], [T.l7, S_('happy', [1, 0])],
  [T.heart1, S_('heart', [1, 0])], [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('happy', [1, 0])],
  [T.h8, S_('happy', [1, 0])], [T.heart2, S_('heart', [1, 0])],
]
const TAU_K = [
  [0, S_('neutral', [-1, 0], { blink: 0.2 })], [T.trunk, S_('wide', [-1, 0])], [T.trunk + 0.8, S_('happy', [-1, 0])], [T.gun, S_('wide', [0, 0], { blink: false, sq: -0.06 })],
  [T.l3, S_('squint', [-1, 0])], [T.penny, S_('neutral', [-1, 0])], [T.h4, S_('sparkle', [-1, 0])], [T.l6, S_('neutral', [-1, 0], { blink: 0.3 })],
  [T.l7, S_('sparkle', [-1, 0])], [T.heart1, S_('heart', [-1, 0])], [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('happy', [-1, 0])],
  [T.h8, S_('happy', [-1, 0])], [T.heart2 + 0.2, S_('heart', [-1, 0])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { ono, sparkleRing, tears, streaks } = makeFx(x)

  const H0 = popText(root, 'All *shine,* | no talk?', { top: 172, size: 116, accentSize: 180, at: -2, late: 0, accentColor: NEON })
  const H1 = popText(root, 'The *flex.*', { top: 196, size: 124, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: NEON })
  const H2 = popText(root, 'Full *speed.*', { top: 196, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: NEON2 })
  const H3 = popText(root, 'Slower? | In a *slab?*', { top: 172, size: 112, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Now: | *screwed* speed.', { top: 172, size: 108, accentSize: 170, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: LAV, fit: true })
  const H5 = popText(root, 'Actually | *listening.*', { top: 172, size: 108, accentSize: 170, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: PINK })
  const H6 = popText(root, 'Parked. | *Real* talk.', { top: 172, size: 112, accentSize: 176, at: T.h6, late: 2, lateAt: T.h6Land, wobble: true, accentColor: NEON2 })
  const H7 = popText(root, 'Ask about | *their* day.', { top: 168, size: 100, accentSize: 156, at: T.h7, late: 2, lateAt: T.h7Land, wobble: true, accentColor: LAV, fit: true })
  const H8 = popText(root, 'Candy paint. | *Real* talk.', { top: 172, size: 112, accentSize: 176, at: T.h8, late: 2, lateAt: T.h8Land, wobble: true, gap: 0.1, accentColor: NEON, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const box = (L, open, close) => dialogueBox(root, { lines: L, y: 1478, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [box(LINES_A, -2.3, T.closeA), box(LINES_B, T.l5 - 0.24, T.closeB), box(LINES_C, T.l8 - 0.24, T.closeC)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  // distance table (pure: built once, read by t)
  const DT = 0.02, DIST = []; { let d = 0; for (let u = 0; u <= DURATION + 0.1; u += DT) { DIST.push(d); d += speed(u) * DT } }
  const distAt = t => { const i = Math.max(0, Math.min(DIST.length - 2, Math.floor(t / DT))), f = t / DT - i; return lerp(DIST[i], DIST[i + 1], clamp(f)) }
  void dist

  function cam(t) {
    let s = 1.14 + 0.03 * ease.inOutQuad(prog(t, 0, 4.4)), fx = 560, fy = 1060
    const kf = win(t, T.trunk - 0.2, T.h1Out[1], 0.4)
    s += 0.06 * kf; fx = lerp(fx, 640, kf)
    const kp = win(t, T.park[0], T.lesson, 0.6)
    s += 0.12 * kp; fx = lerp(fx, 470, kp); fy = lerp(fy, 1010, kp)
    s += 0.05 * bump(t, T.trunk, 0.35) + 0.04 * bump(t, T.gun, 0.3) + 0.04 * bump(t, T.penny, 0.35)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = inW(t, T.gun, T.penny + 0.6) ? 3 : 0
    for (const [t0, amp] of [[T.trunk, 9], [T.gun, 8], [T.penny, 5]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    // the bass thump bounce, half-time when slow
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  const worldK = t => 1 - ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))

  // ── the boulevard
  function drawCity(t, d) {
    // far skyline (slow parallax)
    const off = (d * 0.05) % 1400
    for (let i = -1; i < 12; i++) {
      const bx = i * 130 - off, bh = 180 + ((i * 53 + 1000) % 7) * 40, bw = 110
      R(x, bx, 1020 - bh, bw, bh, '#1e1236')
      for (let wy = 1020 - bh + 20; wy < 1000; wy += 30) for (let wx = bx + 12; wx < bx + bw - 14; wx += 24) if (((wx + wy) * 7 % 13) < 4) R(x, wx, wy, 8, 12, 'rgba(255,207,106,0.4)')
    }
    const g = x.createLinearGradient(0, 760, 0, 1020); g.addColorStop(0, 'rgba(255,90,176,0)'); g.addColorStop(1, 'rgba(255,90,176,0.22)')
    x.fillStyle = g; x.fillRect(-200, 760, W + 400, 260)
    // palms + street lamps (fast parallax)
    const o2 = d % 420
    for (let i = -1; i < 5; i++) {
      const px = i * 420 - o2 + 120
      // palm
      R(x, px - 8, 760, 16, ROAD - 140 - 760, '#2a1c2e')
      for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + (k - 2) * 0.55; x.save(); x.translate(px, 760); x.rotate(a + Math.PI / 2); R(x, -6, -150, 12, 150, '#1c3a2a'); x.restore() }
      // lamp
      const lx = px + 210
      R(x, lx - 6, 820, 12, ROAD - 140 - 820, '#3a3450'); R(x, lx - 6, 820, 60, 10, '#3a3450'); R(x, lx + 40, 826, 26, 12, '#fff1b0')
      const lg = x.createRadialGradient(lx + 52, 840, 0, lx + 52, 840, 160); lg.addColorStop(0, 'rgba(255,236,170,0.35)'); lg.addColorStop(1, 'rgba(255,236,170,0)')
      x.fillStyle = lg; x.fillRect(lx - 110, 680, 320, 320)
    }
    // sidewalk + the road
    R(x, -200, ROAD - 150, W + 400, 40, '#3a3048'); R(x, -200, ROAD - 110, W + 400, 10, '#5a4e6a')
    const rg = x.createLinearGradient(0, ROAD - 100, 0, H + 200); rg.addColorStop(0, '#2a2236'); rg.addColorStop(1, '#100c1a')
    x.fillStyle = rg; x.fillRect(-200, ROAD - 100, W + 400, H + 300 - ROAD)
    const o3 = d % 240
    for (let i = -1; i < 7; i++) R(x, i * 240 - o3, ROAD + 120, 130, 12, 'rgba(255,207,106,0.6)')
    // the neon sheen on the wet road under the car
    const sg = x.createRadialGradient(CAR.cx, ROAD + 40, 20, CAR.cx, ROAD + 40, 520); sg.addColorStop(0, 'rgba(192,58,216,0.35)'); sg.addColorStop(1, 'rgba(192,58,216,0)')
    x.fillStyle = sg; x.fillRect(CAR.cx - 520, ROAD - 60, 1040, 300)
  }

  // ── the slab (side view, facing left)
  function swanga(cx, cy, r, t, d) {
    // the wheel + the chrome elbow poking out (a star-burst of spokes that spins)
    R(x, cx - r - 6, cy - r - 6, 2 * r + 12, 2 * r + 12, OUT)
    x.fillStyle = '#16121e'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
    x.fillStyle = CHROME; x.beginPath(); x.arc(cx, cy, r * 0.62, 0, Math.PI * 2); x.fill()
    const rot = -d / r
    for (let k = 0; k < 10; k++) {
      const a = rot + k * Math.PI / 5
      x.strokeStyle = k % 2 ? '#a8b0c8' : '#ffffff'; x.lineWidth = 6
      x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.6); x.stroke()
    }
    // the elbow: a chrome cone sticking out toward us
    x.fillStyle = OUT; x.beginPath(); x.arc(cx, cy, r * 0.26, 0, Math.PI * 2); x.fill()
    x.fillStyle = CHROME; x.beginPath(); x.arc(cx, cy, r * 0.2, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffffff'; x.fillRect(cx - r * 0.08, cy - r * 0.14, r * 0.08, r * 0.08)
  }
  function drawSlab(t, d, { trunk = 0, sign = 'LOOK AT ME', signK = 1, bounce = 0 } = {}) {
    const { cx, by, w } = CAR, x0 = cx - w / 2, h = 190
    const yb = by - bounce
    // body
    R(x, x0 - 8, yb - h - 8, w + 16, h + 16, OUT)
    const g = x.createLinearGradient(x0, 0, x0 + w, 0); g.addColorStop(0, CANDY[0]); g.addColorStop(0.5, CANDY[1]); g.addColorStop(1, CANDY[2])
    x.fillStyle = g; x.fillRect(x0, yb - h, w, h)
    // candy flake sparkle
    for (let i = 0; i < 40; i++) { const tw = Math.sin(t * 3 + i * 1.7); if (tw > 0.6) R(x, x0 + (i * 97) % (w - 10), yb - h + 10 + (i * 41) % (h - 30), 6, 6, 'rgba(255,255,255,0.8)') }
    R(x, x0, yb - h, w, 14, 'rgba(255,255,255,0.28)')
    R(x, x0, yb - 70, w, 10, CHROME)
    const c0 = x0 + 120, c1 = x0 + w - 230, ct = yb - h - 180
    // front bumper, lights
    R(x, x0 - 24, yb - 60, 34, 40, CHROME); R(x, x0 - 10, yb - h + 30, 26, 22, '#fff1b0')
    const hl = x.createRadialGradient(x0 - 10, yb - h + 40, 0, x0 - 10, yb - h + 40, 260); hl.addColorStop(0, 'rgba(255,241,176,0.35)'); hl.addColorStop(1, 'rgba(255,241,176,0)')
    x.fillStyle = hl; x.fillRect(x0 - 280, yb - h - 220, 300, 460)
    R(x, x0 + w - 10, yb - h + 30, 22, 22, '#ff3b4a')
    // the trunk lid (hinged at the back window, opens up) with the neon sign inside it
    if (trunk > 0.01) {
      const tx0 = x0 + w - 220, tx1 = x0 + w + 6, ty = yb - h
      const ang = -trunk * 1.25
      x.save(); x.translate(tx0, ty); x.rotate(ang)
      R(x, -8, -16, tx1 - tx0 + 16, 24, OUT); x.fillStyle = g; x.fillRect(0, -12, tx1 - tx0, 16)
      x.restore()
      // the neon sign standing up in the open trunk
      const sw = 300, sh = 190 * clamp(trunk), sx0 = tx1 - sw + 30, sy0 = ty - sh
      if (sh > 4) {
        R(x, sx0 - 8, sy0 - 8, sw + 16, sh + 8, OUT); R(x, sx0, sy0, sw, sh, '#140a20')
        const fl = signK * (0.85 + 0.15 * Math.sin(t * 13)), col = sign === 'TALK TO ME' ? NEON2 : NEON
        x.save(); x.beginPath(); x.rect(sx0, sy0, sw, sh); x.clip()
        x.globalAlpha *= clamp(fl)
        x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
        const words = sign.split(' '), L1 = words.slice(0, 2).join(' '), L2 = words.slice(2).join(' ')
        for (const [lw, a] of [[18, 0.18], [10, 0.3]]) { x.strokeStyle = rgba(col, a); x.lineWidth = lw; x.strokeText(L1, sx0 + sw / 2, ty - 128); x.strokeText(L2, sx0 + sw / 2, ty - 62) }
        x.fillStyle = col; x.fillText(L1, sx0 + sw / 2, ty - 128); x.fillText(L2, sx0 + sw / 2, ty - 62)
        x.restore()
        x.strokeStyle = rgba(col, 0.6 * fl); x.lineWidth = 4; x.strokeRect(sx0 + 10, sy0 + 10, sw - 20, sh - 20)
      }
    }
    swanga(x0 + 150, yb + 10, 74, t, d); swanga(x0 + w - 150, yb + 10, 74, t, d)
    return { c0, c1, ct, yb }
  }
  function drawWindowsAndRiders(t, d, k, bounce, ghost = 0) {
    const { cx, by, w } = CAR, x0 = cx - w / 2, h = 190, yb = by - bounce
    const c0 = x0 + 120, c1 = x0 + w - 230, ct = yb - h - 180
    // the cabin, then the glass
    const g = x.createLinearGradient(x0, 0, x0 + w, 0); g.addColorStop(0, CANDY[0]); g.addColorStop(0.5, CANDY[1]); g.addColorStop(1, CANDY[2])
    R(x, c0 - 8, ct - 8, c1 - c0 + 16, 204, OUT)
    x.fillStyle = g; x.fillRect(c0, ct, c1 - c0, 196)
    R(x, c0, ct, c1 - c0, 10, 'rgba(255,255,255,0.3)')
    x.fillStyle = 'rgba(40,30,70,0.85)'; x.fillRect(c0 + 16, ct + 16, c1 - c0 - 32, 156)
    // riders
    x.save(); x.beginPath(); x.rect(c0 + 16, ct + 16, c1 - c0 - 32, 156); x.clip()
    const sa = keyed(t, ARI_K), st = keyed(t, TAU_K)
    const pis = drawStarChar(x, PIS_SEAT[0], PIS_SEAT[1] - bounce, PIS_SEAT[2], t, { color: PIS.color, mood: 'sparkle', look: [-1, 0], seed: SEED.pis, glow: 0.6, pop: k, hops: [T.trunk, T.heart1, T.heart2] })
    const rt = drawStarChar(x, TAU_SEAT[0], TAU_SEAT[1] - bounce, TAU_SEAT[2], t, { color: TAU.color, glyph: TAU.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, seed: SEED.tau, glow: 0.8, pop: k, hops: [...HOPS.tau, T.heart1, T.flip + 0.35, T.heart2 + 0.2] })
    const ra = drawStarChar(x, ARI_SEAT[0], ARI_SEAT[1] - bounce, ARI_SEAT[2], t, { color: ARI.color, glyph: ARI.glyph, mood: sa.mood, look: sa.look, blink: sa.blink, squash: sa.sq || 0, seed: SEED.ari, glow: 0.8, pop: k, hops: [...HOPS.ari, T.heart1, T.flip + 0.35, T.heart2] })
    x.restore()
    if (pis) { drawTissue(x, pis.x + 40, pis.y + 30, 3, t); tears(pis.x, pis.y, pis.size, t, 0.2, T.out[0], { gap: 0.13, spread: 0.6, life: 0.4 }) }
    if (inW(t, T.gun, T.penny)) drawSweat(x, rt.x + 70, rt.top + 40 + ((t * 0.8) % 1) * 18, 4)
    // pillars over the glass
    R(x, 606, ct + 10, 18, 176, OUT)
    // Aries' cool shades in the flex
    if (t < T.penny && ra) { x.fillStyle = '#120a1a'; x.fillRect(Math.round(ra.x - 52), Math.round(ra.y - 8), 104, 22); x.fillStyle = NEON; x.fillRect(Math.round(ra.x - 46), Math.round(ra.y - 6), 14, 4) }
    void ghost
    return { ra, rt }
  }

  // ── music-video chrome
  function drawCredit(t, [a, b], l1, l2, l3) {
    const k = ease.outCubic(prog(t, a, a + 0.35)) * (1 - ease.inCubic(prog(t, b - 0.3, b)))
    if (k <= 0.01) return
    x.save(); x.globalAlpha = k; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    const X = 70, Y = 520
    x.fillStyle = BONE; x.font = `700 30px ${MONO}`; if ('letterSpacing' in x) x.letterSpacing = '3px'; x.fillText(l1, X, Y)
    x.font = `italic 500 44px ${SERIF}`; if ('letterSpacing' in x) x.letterSpacing = '0px'; x.fillStyle = NEON; x.fillText(l2, X, Y + 46)
    x.font = `700 22px ${MONO}`; if ('letterSpacing' in x) x.letterSpacing = '3px'; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText(l3, X, Y + 76)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }
  function drawBars(t) {
    x.fillStyle = 'rgba(4,2,10,0.95)'; x.fillRect(0, 0, W, 96); x.fillRect(0, H - 96, W, 96)
    // a chopped-and-screwed tint pass while slow
    const sk = slowK(t)
    if (sk > 0) { x.fillStyle = `rgba(120,60,200,${0.12 * sk})`; x.fillRect(0, 0, W, H) }
  }

  // ── the tie-in
  const TALK_AT = { x: 540, y: 760, w: 400 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1260, from: ARI_SEAT, tp: T.playA, rot: -0.06 }, { x: 692, y: 1260, from: TAU_SEAT, tp: T.playB, rot: 0.06 }]
  function drawTie(t, toScreen) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.55 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    drawTalkCard(x, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * clamp(tp, 0, 1.2), 'Best part of | your *day?*', { rot: (1 - clamp(tp)) * -0.4, alpha: clamp(tp * 3) * (1 - o) })
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = toScreen(C.from), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardBack(x, cx, cy, ANS_W, { rot, sx, alpha: clamp(p * 4) })
      else drawAnswerCard(x, cx, cy, ANS_W, 'This | ride.', { rot, sx: -sx, stampK: prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1) })
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  function drawWorld(t, k, alpha = 1) {
    const d = distAt(t)
    const sk = slowK(t)
    // the bass bounce: on the beat, half-time when slow
    const beatLen = 60 / 108 * (sk > 0.5 ? 2 : 1)
    const ph = ((t - 0.6) / beatLen) % 1
    const bounce = speed(t) > 1 ? Math.max(0, 1 - ph * 4) * (sk > 0.5 ? 10 : 6) : 0
    const trunk = ease.outBack(prog(t, T.trunk - 0.05, T.trunk + 0.35))
    const swapK = prog(t, T.swap, T.swap + 0.6)
    const sign = swapK < 0.5 ? 'LOOK AT ME' : 'TALK TO ME'
    const signK = swapK > 0 && swapK < 1 ? (Math.sin(swapK * 40) > 0 ? 1 : 0.1) : 1
    x.save(); x.globalAlpha *= alpha
    drawCity(t, d)
    drawWindowsAndRiders(t, d, k, bounce)
    drawSlab(t, d, { trunk, sign, signK, bounce })
    x.restore()
    return { d, bounce }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t), wk = worldK(t), k = popOut(t, T.out)
        const toScreen = P => [540 + (P[0] - C.fx) * C.s, 1000 + (P[1] - C.fy) * C.s]
        x.save(); x.globalAlpha = wk
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawWorld(t, k)
        // the screwed ghost trail: the whole frame echoed a beat behind while slow (chopped-and-screwed visuals)
        const sk = slowK(t)
        if (sk > 0.05 && t > T.cut + 0.3 && t < T.lesson) { x.save(); x.translate(-18, -6); drawWorld(t - 0.18, k, 0.18 * sk); x.restore() }
        // onomatopoeia + glints
        ono('*POP*', CAR.cx + 330, CAR.by - 420, t, T.trunk, { size: 60, life: 0.8, rise: 20, color: NEON })
        for (const [i, g] of T.glint.entries()) { const gx2 = [CAR.cx - 280, CAR.cx + 280][i]; if (inW(t, g, g + 0.5)) { const q = prog(t, g, g + 0.5); x.save(); x.globalAlpha *= Math.sin(q * Math.PI); drawPixelStar(x, gx2 + 10, CAR.by - 6, 70 * Math.sin(q * Math.PI), 2, '#ffffff'); x.restore() } }
        ono('*bling*', CAR.cx - 280, CAR.by - 120, t, T.glint[0], { size: 40, life: 0.7, rise: 14, color: CHROME })
        ono('*bling*', CAR.cx + 280, CAR.by - 120, t, T.glint[1], { size: 40, life: 0.7, rise: 14, color: CHROME })
        ono('VROOM', CAR.cx - 470, CAR.by - 300, t, T.gun, { size: 60, life: 0.9, rise: 10, color: NEON2, rot: -0.08 })
        ono('*ding*', 330, 790, t, T.penny, { size: 46, life: 0.8, rise: 20, color: GOLD })
        ono('*click*', 430, 790, t, T.knob, { size: 40, life: 0.7, rise: 14 })
        // the chopped caption stutter: "day? day? day?" (screwed)
        if (inW(t, ...T.stutter)) for (let i = 0; i < 3; i++) ono('day?', 760 - i * 40, 800 - i * 90, t, T.stutter[0] + i * 0.36, { size: 84 - i * 10, life: 0.9, rise: 10, ticks: false, color: rgba('#c9a6ff', 1 - i * 0.25), font: SERIF, weight: 'italic 600' })
        if (t >= T.heart1 && t < T.lessonOut[0]) {
          const hk = pop01(t, T.heart1, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.lesson, T.lesson + 0.3)))
          if (hk > 0.02) { x.save(); x.translate(430, 820 - 6 * Math.sin(t * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 9); x.restore() }
        }
        if (t >= T.heart2) {
          const hk = pop01(t, T.heart2, 0.34, 2.4) * popOut(t, T.out)
          if (hk > 0.02) { x.save(); x.translate(430, 820 - 8 * Math.sin((t - T.heart2) * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 10); x.restore() }
        }
        x.restore()
        // speed lines while the slab is flying
        const fast = clamp((speed(t) - 500) / 900)
        if (fast > 0) streaks(t, fast, { y0: 500, y1: 1450, dir: 1 })
        drawBars(t)
        drawCredit(t, [-1, 4.3], '♈︎ ARIES ft. ♉︎ TAURUS', '“Candy Paint”', 'DIRECTED BY THE STARS')
        drawCredit(t, [T.h4 + 0.3, T.h4Out[0]], '♈︎ ARIES ft. ♉︎ TAURUS', '“Candy Paint” (slowed)', 'THE SLOW ROLL')
        drawTie(t, toScreen)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// the one card transition: "Slower? In a slab?" → screwed speed
export const CUTS = [T.cut]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const { N, FX } = SND
const thump = (t, g = 0.14) => [['tom', +t.toFixed(3), 52, { ...FX, gain: g, decay: 0.4 }]]
const PITCH = { [SARI]: 860, [STAU]: 640 }
const CUES_ = [
  ['busFx', 'sfx', { gain: 25 }],
  ...[0.6, 1.71, 2.82, 3.93].flatMap(b => thump(b, 0.08)),
  ...SND.sob(1.0, N.E6), ...SND.sob(3.2, N.D6),
  // 2 · the flex
  ...SND.head(T.h1, 1, T.h1Land, 2), ...thump(T.trunk, 0.2), ['boom', T.trunk, 0.06], ['pop', T.trunk + 0.05, N.A5, 0.05, 0.3], ['glitter', T.trunk + 0.1, T.trunk + 0.8],
  ...T.glint.flatMap(g => [['bell', g + 0.05, N.E6, 0.035, 1.0, 0], ['pop', g + 0.05, N.D6, 0.03, 0]]),
  // 3 · full speed
  ...SND.head(T.h2, 1, T.h2Land, 3), ['swell', T.gun, T.gun + 1.2, { bus: 'sfx', gain: 0.06, f0: 300, f1: 2600 }], ['whoosh', T.gun, 1.0, 0.07], ['whoosh', T.gun + 1.2, 1.4, 0.05],
  // 4 · slower? in a slab?
  ...SND.head(T.h3, 2, T.h3Land, 1), ['tapeStop', T.penny, 0.9], ['bell', T.penny, N.A5, 0.04, 1.4, 0], ['pop', T.penny + 0.05, N.E6, 0.035, 0],
  // 5 · screwed speed
  ...SND.head(T.h4, 2, T.h4Land, 0), ...[0, 0.36, 0.72].map((d, i) => ['pop', +(T.stutter[0] + d).toFixed(3), N.E5 * (1 - i * 0.06), 0.03, 0]),
  // 6 · actually listening
  ...SND.head(T.h5, 1, T.h5Land, 2), ['tick', T.knob, 0.07], ['chip', T.knob + 0.05, 700, 0.4, { ...FX, wave: 'tri', slide: -10, gain: 0.02, decay: 0.3, sustain: 0.4 }],
  // 7 · parked, real talk
  ...SND.head(T.h6, 2, T.h6Land, 4), ['whoosh', T.park[0], 0.9, 0.03],
  ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.swap + i * 0.1).toFixed(3), 0.03]), ['bell', T.swap + 0.6, N.A5, 0.035, 1.4, 0],
  ['pop', T.heart1, N.A5, 0.04, 0], ['bell', T.heart1 + 0.02, N.E6, 0.03, 1.2, 0], ...SND.sob(T.heart1 + 0.3, N.E6),
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · talk cards
  ...SND.head(T.h7, 3, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N.E6, 0.04, 0.3], ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · candy paint, real talk
  ...SND.head(T.h8, 3, T.h8Land, 0), ...thump(T.h8Land, 0.1),
  ['pop', T.heart2, N.A5, 0.04, 0], ['bell', T.heart2 + 0.02, N.E6, 0.03, 1.2, 0], ...SND.sob(T.heart2 + 0.2, N.D6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = CUES_.filter(c => typeof c[1] !== 'number' || c[1] >= 0)
