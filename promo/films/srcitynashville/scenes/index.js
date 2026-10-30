// srcitynashville · "Nashville heartbreak" (Star Talk Remix of citynashville, 20 s vertical, music: synthwave, Gm) · story
// 0–15.6, then the shared end card (cta JOIN THE WAITLIST, as the original).
//   0.00–5.75  "Nashville: | every song's about | *heartbreak.*"  A generic bar row rises with festoon lights and neon signs.
//              The ♓ Pisces star (cowboy hat, acoustic guitar, already sniffling) strums on stage under a heart-headed note.
//              PISCES: "♪ left on read… *again* ♪". Drop (2.82): the heart note cracks in two, the neon flickers and
//              Pisces' tears turn to fountains. THE STARS pop in, deadpan: "babe. that's verse *nine.*"
//   5.88       the bar row drops away (breakdown).
//   5.95–10.6  "Write a | *different* song."  Five staff lines draw across the sky; two charts pop onto the staff and each
//              heart half flies into one. The ♏ Scorpio star slides in under the right chart. The Push / Pull / Align
//              reading draws its three lines over the staff like a melody, notes riding them; chip WATER + WATER · TRINE.
//              THE STARS: "read the chart *before* the chorus."
//  10.75       card cut (flip)
//  10.85–15.4  "Your love song | *starts here.*"  The charts slide together and the two halves snap back into one heart
//              note (11.16); Pisces and Scorpio scoot together, Pisces gets its guitar back and strums a duet, notes float
//              up, festoon lights return. Pisces is still crying: chip HAPPY TEARS (STILL TEARS). All out by 15.42.
// One canvas (sky + set + cast + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack, drawWheelH } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, HOT, CYAN, SILVER, TAN, VIOLET, rgba, ink, sparkle, flick, facades, festoon, guitar, neonGuitar, neonLive, cowboyHat, heartNote, note, starFrame, inSprite, tearsCells } from './props.js'

export const DURATION = 20
export const CTA = 'JOIN THE WAITLIST'
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const INK = '#1b1236', MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const B = n => +(0.6 + n * 60 / 108).toFixed(3)
const PIS = signStar('pisces'), SCO = signStar('scorpio')
const P_TAG = `${PIS.glyph}︎ PISCES`, S_TAG = 'THE STARS'
const CPS = 28

export const T = {
  h0: 0.15, h0Land: B(4), h0Out: [5.55, 5.72],
  rise: [0, 0.55], fest: 0.25, signs: [B(0.5), B(1.5)], pisIn: 0.35, strums: [B(1), B(2), B(3)], noteIn: 0.9,
  open: 1.0, l0: 1.2, drop: B(4), split: B(4.5), stutter: [B(4), B(5.6)], starsIn: 3.75, l1: 4.1,
  wipe: B(9.5), barOut: [5.6, 6.1],
  h1: 5.95, h1Land: 6.3, h1Out: [10.42, 10.6], staff: [6.0, 6.5], fly: [5.95, 6.6], cA: 6.35, cB: 6.55, scoIn: [6.3, 7.0],
  lines: [B(11), B(12), B(13)], trine: 8.1, l2: 7.45, close: 10.45,
  cut: 10.75,
  h2: 10.85, h2Land: 11.2, move: [10.8, 11.12], join: B(19), snug: [10.9, 11.5], gtrBack: 11.5, duet: [B(20), B(21), B(22), B(23), B(24), B(25)],
  happy: B(22), out: [15.0, 15.42],
}
const LINES = [
  { t: T.l0, speaker: P_TAG, color: '#9fe0d6', text: '♪ left on read… *again* ♪' },
  { t: T.l1, speaker: S_TAG, color: PINK, text: "babe. that's verse *nine.*" },
  { t: T.l2, speaker: S_TAG, text: 'read the chart *before* the chorus.' },
]
const CUTS = [5.75, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b

// ── layout
const HN = { x: 540, y: 820, s: 92 }                     // the heart note over the stage
const SIGN_G = { x: 170, y: 1140, s: 0.55, rot: -0.22 }, SIGN_L = { x: 905, y: 1170, s: 0.74 }
const STAFF_Y = 900, STAFF_GAP = 50
const CA = { x: 290, y: STAFF_Y }, CB = { x: 790, y: STAFF_Y }, C3 = { x: 540, y: 860 }
const WDEF = { cx: 0, cy: 0, rOut: 430, rIn: 344, rGlyph: 387, alpha: 0.92 }
const WS = 0.4, HS2 = 54
const RL = [{ y: STAFF_Y - 2 * STAFF_GAP, col: READING.push, amp: 16 }, { y: STAFF_Y + 2 * STAFF_GAP, col: READING.pull, amp: 16 }, { y: STAFF_Y, col: READING.align, amp: 7 }]
const XL = 150, XR = 930

// the cast's paths (x, y, size) through the three beats
function pisPose(t) {
  const m1 = ease.inOutCubic(prog(t, 5.7, 6.35)), m2 = ease.inOutCubic(prog(t, ...T.snug))
  return { x: lerp(lerp(540, 290, m1), 375, m2), y: lerp(lerp(1225, 1330, m1), 1420, m2), s: lerp(lerp(300, 210, m1), 290, m2) }
}
function scoPose(t) {
  const m1 = ease.outCubic(prog(t, ...T.scoIn)), m2 = ease.inOutCubic(prog(t, ...T.snug))
  return { x: lerp(lerp(1300, 790, m1), 705, m2), y: lerp(1330, 1420, m2), s: lerp(210, 290, m2) }
}
function skyPose(t) {
  const m1 = ease.inOutCubic(prog(t, 5.7, 6.3)), m2 = ease.inOutCubic(prog(t, 10.6, 11.0))
  return { x: lerp(lerp(870, 540, m1), 880, m2), y: lerp(lerp(640, 1395, m1), 640, m2), s: lerp(lerp(160, 130, m1), 150, m2) }
}

async function build(stage) {
  try {
    await Promise.all(["800 100px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 28px 'Space Mono'", "bold 60px 'EB Garamond'", "900 70px Inter", "italic 500 120px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H = (text, o) => popText(root, text, { size: 100, accentSize: 150, wobble: true, late: 1, ...o })
  const HEADS = [
    [H('Nashville: every | song’s about | *heartbreak.*', { top: 140, size: 96, accentSize: 146, at: T.h0, lateAt: T.h0Land, accentColor: HOT }), T.h0Out],
    [H('Write a | *different* song.', { top: 150, size: 104, accentSize: 150, late: 2, at: T.h1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [H('Push.', { top: 470, size: 84, left: 60, width: 320, late: 0, at: T.lines[0], color: READING.push }), T.h1Out],
    [H('Pull.', { top: 470, size: 84, left: 380, width: 320, late: 0, at: T.lines[1], color: READING.pull }), T.h1Out],
    [H('*Align.*', { top: 446, size: 84, accentSize: 120, left: 690, width: 330, late: 1, at: T.lines[2], lateAt: T.lines[2], accentColor: READING.align }), T.h1Out],
    [H('Your love song | *starts here.*', { top: 150, size: 104, accentSize: 150, late: 2, at: T.h2, lateAt: T.h2Land, lateGap: 0.12, accentColor: PINK }), T.out],
  ]
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 236, cps: CPS, open: T.open, close: T.close })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const P_HOPS = [...talkHops(LINES, P_TAG, { cps: CPS }), T.drop, T.lines[2] + 0.1, T.snug[1], T.join + 0.1, ...T.duet.filter((_, i) => i % 2)]
  const SC_HOPS = [T.scoIn[1], T.lines[2] + 0.2, T.snug[1] + 0.05, T.join + 0.2, ...T.duet.filter((_, i) => !(i % 2))]
  const S_HOPS = [...talkHops(LINES, S_TAG, { cps: CPS }), T.join + 0.25]

  function chip(px, py, text, k, { size = 28, col = BONE, bar = GOLD } = {}) {
    if (k <= 0.01) return
    x.save(); x.translate(px, py); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(text).width + 32, th = size + 22
    x.fillStyle = INK; x.fillRect(-tw / 2 - 4, -th / 2 - 4, tw + 8, th + 8)
    x.fillStyle = 'rgba(20,12,44,0.97)'; x.fillRect(-tw / 2, -th / 2, tw, th); x.fillStyle = bar; x.fillRect(-tw / 2, th / 2 - 5, tw, 5)
    x.fillStyle = col; x.fillText(text, 0, 2)
    x.restore()
  }
  const strumK = t => { let k = 0; for (const s of T.strums) if (t >= s) k = Math.max(k, Math.exp(-(t - s) * 7)); for (const s of T.duet) if (t >= s) k = Math.max(k, Math.exp(-(t - s) * 7)); return k }

  // ── 1 · the bar row (rises in, drops away at the wipe)
  function drawStreet(t) {
    if (t > T.barOut[1] + 0.05) return
    const dy = (1 - ease.outCubic(prog(t, ...T.rise))) * 900 + ease.inCubic(prog(t, ...T.barOut)) * 1100
    facades(x, t, dy)
    const g = x.createRadialGradient(540, 1300 + dy, 40, 540, 1300 + dy, 560)
    g.addColorStop(0, 'rgba(255,170,90,0.28)'); g.addColorStop(1, 'rgba(255,170,90,0)')
    x.fillStyle = g; x.fillRect(0, 700 + dy, 1080, 1200)
    festoon(x, t, 700, 80, clamp(prog(t, T.fest, T.fest + 0.3)), dy * 0.7)
    const ga = flick(t, T.signs[0], 3, T.stutter), la = flick(t, T.signs[1], 7, T.stutter)
    const gk = pop01(t, T.signs[0], 0.35, 2.4), lk = pop01(t, T.signs[1], 0.35, 2.4)
    if (gk > 0) { x.save(); x.translate(SIGN_G.x, SIGN_G.y + dy); x.rotate(SIGN_G.rot); x.scale(SIGN_G.s * gk, SIGN_G.s * gk); neonGuitar(x, HOT, ga); x.restore() }
    if (lk > 0) { x.save(); x.translate(SIGN_L.x, SIGN_L.y + dy); x.scale(SIGN_L.s * lk, SIGN_L.s * lk); neonLive(x, la, t); x.restore() }
    // the stage: a little lit riser under Pisces
    x.save(); x.translate(0, dy)
    x.beginPath(); x.roundRect(330, 1400, 420, 46, 10); ink(x, GOLD, { w: 6, fa: 0.5, glow: 22, fill: '#6a3a1a' })
    x.restore()
    // notes fly off each strum
    T.strums.forEach((s, i) => {
      for (let j = 0; j < 2; j++) {
        const u = prog(t, s + j * 0.08, s + j * 0.08 + 1.1)
        if (u <= 0 || u >= 1) continue
        const side = (i + j) % 2 ? 1 : -1
        note(x, 540 + side * (150 + 200 * u), 1180 + dy - 360 * ease.outCubic(u), 1.1 * easeOutBack(clamp(u * 4), 2.4), [CYAN, GOLD, PINK][(i + j) % 3], 1 - ease.inQuad(u), side * 0.3 * Math.sin(u * 6))
      }
    })
  }

  // ── the heart note: whole over the stage, cracks on the drop, halves ride the charts, rejoin on T.join
  function heartState(t) {
    if (t < T.noteIn || t > T.out[1]) return null
    if (t < T.fly[0]) {
      const k = pop01(t, T.noteIn, 0.45, 2.6)
      const crack = clamp(prog(t, T.drop, T.drop + 0.12))
      const split = easeOutBack(prog(t, T.split, T.split + 0.4), 1.6)
      const sag = 60 * ease.inOutCubic(prog(t, T.split, T.split + 0.6))
      const jolt = t > T.drop ? 14 * Math.sin((t - T.drop) * 40) * Math.exp(-(t - T.drop) * 8) : 0
      return { whole: true, x: HN.x + jolt, y: HN.y + Math.sin(t * 4.4) * 10 + sag, s: HN.s * k, split, crack, stem: 1 }
    }
    if (t < T.move[0]) {
      const f = ease.inOutCubic(prog(t, ...T.fly))
      const pulse = T.lines.reduce((m, l) => Math.max(m, t > l + 0.36 ? Math.exp(-(t - l - 0.36) * 6) : 0), 0)
      const s = lerp(HN.s, HS2, f) * (1 + 0.15 * pulse), arc = Math.sin(Math.PI * f) * 140, hy = HN.y + 60
      const o = t < T.h1Out[0] ? 1 : 0
      return { whole: false, s: s * o, split: 1, stem: 1 - f,
        L: { x: lerp(HN.x, CA.x + 34 * HS2 / 60, f), y: lerp(hy, CA.y - 26 * HS2 / 60, f) - arc },
        R: { x: lerp(HN.x, CB.x - 34 * HS2 / 60, f), y: lerp(hy, CB.y - 10 * HS2 / 60, f) - arc } }
    }
    const sp = 1 - ease.inCubic(prog(t, T.join - 0.3, T.join))
    if (sp > 0) {
      const m = ease.inOutCubic(prog(t, ...T.move))
      const ca = { x: lerp(CA.x, C3.x, m), y: lerp(CA.y, C3.y, m) }, cb = { x: lerp(CB.x, C3.x, m), y: lerp(CB.y, C3.y, m) }
      return { whole: false, s: HS2, split: sp, stem: 0, L: { x: ca.x + 34 * HS2 / 60 * sp, y: ca.y - 26 * HS2 / 60 * sp }, R: { x: cb.x - 34 * HS2 / 60 * sp, y: cb.y - 10 * HS2 / 60 * sp } }
    }
    const g = easeOutBack(prog(t, T.join, T.join + 0.45), 2.4)
    const beats = T.duet.reduce((m, b) => Math.max(m, t > b ? Math.exp(-(t - b) * 7) : 0), 0)
    return { whole: true, x: C3.x, y: C3.y - 50 * g, s: lerp(HS2, 118, g) * (1 + 0.08 * beats) * popOut(t, T.out), split: 0, crack: 0, stem: clamp(prog(t, T.join + 0.1, T.join + 0.45)) }
  }
  function drawHeart(t) {
    const Hs = heartState(t)
    if (Hs && Hs.s > 0) {
      const col = Hs.whole && t > T.join ? PINK : HOT
      if (Hs.whole) { x.save(); x.translate(Hs.x, Hs.y); heartNote(x, Hs.s, col, { split: Hs.split, crack: Hs.crack, stem: Hs.stem }); x.restore() }
      else {
        x.save(); x.translate(Hs.L.x, Hs.L.y); heartNote(x, Hs.s, col, { split: Hs.split, stem: 0, only: -1 }); x.restore()
        x.save(); x.translate(Hs.R.x, Hs.R.y); heartNote(x, Hs.s, col, { split: Hs.split, stem: Hs.stem, only: 1 }); x.restore()
      }
    }
    sparkle(x, HN.x, HN.y, t, T.noteIn + 0.1, { n: 10, R: 200, seed: 11, size: 26, cols: [HOT, PINK, GOLD, '#fff3e0'] })
    sparkle(x, HN.x, HN.y + 30, t, T.split, { n: 10, R: 200, seed: 13, size: 22, cols: ['#8fd8f6', '#6f8cff', '#c9a6ff'], dur: 0.9 })
    const fk = prog(t, T.join, T.join + 0.6)
    if (fk > 0 && fk < 1) { x.save(); x.globalAlpha = 1 - fk; x.beginPath(); x.arc(C3.x, C3.y, 120 + 320 * ease.outCubic(fk), 0, TAU); ink(x, GOLD, { w: 14 * (1 - fk) + 2, fa: 0, glow: 34 }); x.restore() }
    sparkle(x, C3.x, C3.y, t, T.join, { n: 20, R: 440, seed: 61, size: 32, cols: [PINK, GOLD, '#fff3e0', VIOLET, HOT] })
    if (t > T.join) {
      const ok = popOut(t, T.out)
      for (let i = 0; i < 9; i++) {
        const t0 = T.join + 0.1 + i * 0.36, u = prog(t, t0, t0 + 1.5)
        if (u <= 0 || u >= 1) continue
        const side = i % 2 ? 1 : -1
        note(x, C3.x + side * (110 + 200 * u + 40 * Math.sin(u * 5 + i)), C3.y - 40 - 340 * ease.outCubic(u), 1.05 * easeOutBack(clamp(u * 5), 2.4) * ok, [GOLD, PINK, CYAN, VIOLET][i % 4], (1 - ease.inQuad(u)) * ok, side * 0.25)
      }
    }
  }

  // ── 2 · the staff, the charts, the reading
  const lineY = (L, px, t) => L.y + L.amp * Math.sin((px / 150) * TAU - t * 5) * Math.sin(Math.PI * clamp((px - XL) / (XR - XL)))
  const s2Out = t => outK(t, [T.h1Out[0] - 0.1, T.h1Out[1]])
  function drawStaff(t) {
    if (t < T.staff[0] || t > T.h1Out[1]) return
    x.save(); x.globalAlpha = s2Out(t)
    for (let i = 0; i < 5; i++) {
      const p = ease.inOutCubic(prog(t, T.staff[0] + i * 0.05, T.staff[1] + i * 0.05))
      if (p <= 0) continue
      const y = STAFF_Y + (i - 2) * STAFF_GAP
      x.beginPath(); x.moveTo(40, y); x.lineTo(40 + 1000 * p, y); ink(x, BONE, { w: 5, fa: 0, glow: 10 })
    }
    const bk = clamp(prog(t, T.staff[1], T.staff[1] + 0.2))
    x.globalAlpha *= 0.5
    if (bk > 0) for (const bx of [40, 1040]) { x.beginPath(); x.moveTo(bx, STAFF_Y - 2 * STAFF_GAP); x.lineTo(bx, STAFF_Y - 2 * STAFF_GAP + 4 * STAFF_GAP * bk); ink(x, BONE, { w: 6, fa: 0, glow: 8 }) }
    x.restore()
  }
  function drawCharts(t) {
    if (t < T.cA || t > T.out[1]) return
    for (const which of [0, 1]) {
      const c0 = which ? CB : CA, t0 = which ? T.cB : T.cA
      const k = pop01(t, t0, 0.5, 1.6)
      const m = ease.inOutCubic(prog(t, ...T.move))
      const hide = t >= T.h1Out[1] && t < T.move[0] ? 0 : 1
      const lockBump = t > T.join ? 1 + 0.08 * Math.exp(-(t - T.join) * 7) : 1
      const sc = lerp(WS, which ? 0.36 : 0.5, m) * k * popOut(t, T.out) * lockBump * hide
      if (sc <= 0) continue
      const spin = (which ? -1 : 1) * 1.6 * Math.PI * (1 - ease.outCubic(prog(t, t0, t0 + 0.7))) + (which ? -1 : 1) * t * 0.25
      x.save(); x.translate(lerp(c0.x, C3.x, m), lerp(c0.y, C3.y, m)); x.rotate(spin); x.scale(sc, sc)
      x.globalAlpha = t < T.move[0] ? s2Out(t) : t > T.join ? 0.75 : 1
      x.beginPath(); x.arc(0, 0, WDEF.rOut, 0, TAU); x.fillStyle = 'rgba(14,10,34,0.62)'; x.fill()
      drawWheelH(x, { W: WDEF })
      x.restore()
      sparkle(x, c0.x, STAFF_Y, t, t0 + 0.12, { n: 12, R: 260, seed: 21 + which, size: 26 })
    }
  }
  function orb(px, py, r, col, a) {
    if (a <= 0 || r <= 0) return
    x.save(); x.globalAlpha = a; x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(px, py, 0, px, py, r * 3.2); g.addColorStop(0, rgba(col, 0.75)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r * 3.2, 0, TAU); x.fill()
    x.globalCompositeOperation = 'source-over'
    x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = col; x.fill()
    x.restore()
  }
  function drawReading(t) {
    if (t < T.lines[0] - 0.3 || t > T.h1Out[1]) return
    const o = s2Out(t)
    RL.forEach((L, i) => {
      const tl = T.lines[i], lk = ease.inOutCubic(prog(t, tl, tl + 0.4))
      if (lk > 0) {
        const pulse = 1 + 0.3 * Math.exp(-Math.max(0, t - tl - 0.4) * 4)
        x.save(); x.globalAlpha = o; x.beginPath()
        const N = 60
        for (let j = 0; j <= N * lk; j++) { const px = lerp(XL, XR, j / N); j ? x.lineTo(px, lineY(L, px, t)) : x.moveTo(px, lineY(L, px, t)) }
        ink(x, L.col, { w: (i === 2 ? 13 : 10) * pulse, fa: 0, glow: 28 })
        x.restore()
        sparkle(x, XR, L.y, t, tl + 0.38, { n: 9, R: 110, seed: 40 + i, cols: [L.col, '#fff3e0'], size: 22 })
        if (lk >= 1) for (let j = 0; j < 2; j++) {
          const u = ((t - tl - 0.4) * 0.55 + j * 0.5) % 1, px = lerp(XL + 40, XR - 40, u)
          note(x, px, lineY(L, px, t) - 8, 0.9, L.col, Math.sin(Math.PI * u) * o * clamp((t - tl - 0.4) * 4), 0)
        }
      }
      const dk = pop01(t, tl - 0.3, 0.3, 2.2) * o
      if (dk > 0) { orb(XL, L.y, 18 * dk, GOLD, clamp(dk * 2) * o); orb(XR, L.y, 18 * dk, SILVER, clamp(dk * 2) * o) }
    })
  }

  // ── the cast
  function pisState(t) {
    if (t < T.drop) return { mood: 'squint', look: [0, -0.4], tears: t < T.l0 ? 1 : 2, sq: 0 }
    if (t < T.l1) return { mood: 'wide', look: [0, 0], tears: 3, sq: 0.16 * bump(t, T.drop, 0.35) }
    if (t < T.l1 + 1.2) return { mood: 'wide', look: [1, -1], tears: 1, sq: 0.12 * bump(t, T.l1 + 0.75, 0.3) }
    if (t < T.scoIn[0]) return { mood: 'squint', look: [0, 0], tears: 1, sq: 0 }
    if (t < T.lines[2]) return { mood: t < T.scoIn[1] + 0.2 ? 'wide' : 'sparkle', look: [1, 0], tears: 0, sq: 0 }
    if (t < T.h2) return { mood: 'heart', look: [1, 0], tears: 0, sq: 0 }
    if (t < T.happy) return { mood: 'heart', look: [1, 0], tears: 0, sq: 0 }
    return { mood: 'happy', look: [0, 0], tears: 2, sq: 0 }
  }
  function scoState(t) {
    if (t < T.lines[2]) return { mood: 'squint', look: [-1, 0] }
    if (t < T.lines[2] + 0.9) return { mood: 'wink', look: [-1, 0] }
    return { mood: 'heart', look: [-1, 0] }
  }
  function skyState(t) {
    if (t < T.l1 + 1.4) return { mood: 'eyeroll', look: [0, 0] }
    if (t < T.l2) return { mood: 'neutral', look: [-1, 0.5] }
    if (t < T.lines[2]) return { mood: 'neutral', look: [0, 0] }
    if (t < T.h2) return { mood: 'happy', look: [0, 0] }
    return { mood: 'wink', look: [-1, 1] }
  }
  function drawHat(F, s, rot) {
    x.save(); x.translate(F.ox, F.oy - F.base * F.sy - s * 0.41); x.rotate(rot); const k = s / 300; x.scale(k, k); x.translate(0, 268); cowboyHat(x, TAN); x.restore()
  }
  function drawGuitar(F, s, a, sk) {
    if (a <= 0.01) return
    x.save(); x.translate(F.ox - s * 0.16, F.oy - F.base * F.sy + s * 0.27); x.rotate(1.32 - 0.06 * sk); const k = s / 270 * 0.5 * a; x.scale(k, k); guitar(x, TAN, { strum: sk }); x.restore()
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    // Scorpio
    if (t >= T.scoIn[0]) {
      const P = scoPose(t), st = scoState(t)
      drawStarChar(x, P.x, P.y, P.s, t, { color: SCO.color, glyph: SCO.glyph, mood: st.mood, look: st.look, hops: SC_HOPS, seed: 6, pop: ok, glow: 1.2 })
    }
    // Pisces
    const P = pisPose(t), st = pisState(t)
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, squash: st.sq + 0.05 * strumK(t), hops: P_HOPS, seed: 3, pop: pop01(t, T.pisIn, 0.4, 2.2) * ok, glow: 1.2 }
    if (opts.pop > 0) {
      drawStarChar(x, P.x, P.y, P.s, t, opts)
      const F = starFrame(P.x, P.y, P.s, t, opts)
      if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
      drawHat(F, P.s * opts.pop, 0.08 * Math.sin(t * 5) * (t < T.drop ? 1 : 0.3) - 0.1)
      const ga = (t < T.barOut[0] ? 1 : popOut(t, [T.barOut[0], T.barOut[0] + 0.3])) * (t < T.gtrBack ? 1 : 0) + (t >= T.gtrBack ? pop01(t, T.gtrBack, 0.35, 2.2) : 0)
      drawGuitar(F, P.s * opts.pop, ga, strumK(t))
    }
    // THE STARS
    if (t >= T.starsIn) {
      const Q = skyPose(t), ss = skyState(t)
      drawStarChar(x, Q.x, Q.y, Q.s, t, { color: STAR.sky, glyph: null, mood: ss.mood, look: ss.look, hops: S_HOPS, seed: 2, pop: pop01(t, T.starsIn, 0.4, 2.2) * ok })
    }
  }
  function drawButton(t) {
    // festoon lights come back over the duet
    const fk = clamp(prog(t, T.join, T.join + 0.4)) * outK(t, T.out)
    if (fk > 0) festoon(x, t, 520, 70, fk)
    if (t >= T.happy) chip(400, 1200, 'HAPPY TEARS (STILL TEARS)', pop01(t, T.happy, 0.3, 2.4) * outK(t, [T.out[0] - 0.2, T.out[0]]), { bar: '#9fe0d6', col: '#d8fff8' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.out[1] + 0.02) {
        drawStreet(t); drawStaff(t); drawCharts(t); drawReading(t); drawButton(t)
        drawCast(t); drawHeart(t)
        if (inR(t, T.trine, T.h1Out[1])) chip(540, 1130, 'WATER + WATER · TRINE', pop01(t, T.trine, 0.3, 2.4) * s2Out(t), { bar: GOLD, col: GOLD })
        if (inR(t, T.drop, T.drop + 0.35)) { x.fillStyle = rgba('#ff5fa2', 0.22 * (1 - prog(t, T.drop, T.drop + 0.35))); x.fillRect(0, 0, 1080, 1920) }
        if (inR(t, T.join, T.join + 0.5)) { x.fillStyle = rgba('#ffe2b0', 0.35 * (1 - prog(t, T.join, T.join + 0.5))); x.fillRect(0, 0, 1080, 1920) }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ow] of HEADS) h.update(t, outK(t, ow))
      drawGrain(gx, t)
    },
  }
}

// ── sound (pop / pluck / bell are written in D: the engine keeps pitched SFX in the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.07, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const strum = (t0, root, gain = 0.032, pan = 0.2) => [root, root * 1.25, root * 1.5, root * 2].map((f, i) => ['pluck', +(t0 + i * 0.018).toFixed(3), +f.toFixed(2), gain, 0.5, pan])
export const CUES = [
  ...head(T.h0, 5, T.h0Land, 0), ['whoosh', 0.05, 0.4, 0.03],
  ['pop', T.pisIn + 0.1, 739.99, 0.045, 0],
  ...T.signs.flatMap((s, i) => [['tick', s, 0.05], ['tick', s + 0.08, 0.04], ['pop', s + 0.1, [880, 1174.66][i], 0.04, i ? 0.5 : -0.5]]),
  ...T.strums.flatMap((s, i) => strum(s, [293.66, 392, 440][i])),
  ['pop', T.noteIn + 0.05, 987.77, 0.045, 0], ['glitter', T.noteIn + 0.1, T.noteIn + 0.5],
  ['tick', T.drop, 0.08], ['pop', T.drop, 440, 0.04, 0], ['boom', T.split, 0.1], ['tick', T.split, 0.07],
  ...[880, 783.99, 659.25, 587.33].map((f, i) => ['pluck', +(T.split + 0.12 + i * 0.13).toFixed(3), f, 0.035, 0.45, -0.1 + i * 0.07]),
  ['pop', T.starsIn, 1174.66, 0.04, 0.4],
  ['whoosh', T.barOut[0], 0.5, 0.04],
  ...head(T.h1, 1, T.h1Land, 2), ['pop', T.h1Land + 0.1, 1318.51, 0.045, 0],
  ...[0, 1, 2, 3, 4].map(i => ['pluck', +(T.staff[0] + i * 0.05).toFixed(3), NOTE[i], 0.03, 0.4, -0.4 + i * 0.2]),
  ['whoosh', T.fly[0], 0.5, 0.03], ['pop', T.cA, 739.99, 0.045, -0.5], ['pop', T.cB, 880, 0.045, 0.5],
  ['whoosh', T.scoIn[0], 0.5, 0.03], ['pop', T.scoIn[1], 659.25, 0.04, 0.5],
  ...T.lines.map((tl, i) => ['pluck', tl, [739.99, 880, 1174.66][i], 0.05, 0.6, (i - 1) * 0.4]),
  ...T.lines.map((tl, i) => ['pop', +(tl + 0.02).toFixed(3), [739.99, 880, 1174.66][i], 0.04, 0]),
  ['bell', T.lines[2] + 0.38, 1174.66, 0.045, 1.2, 0], ['glitter', T.lines[2] + 0.38, T.lines[2] + 0.9],
  ['pop', T.trine, 1318.51, 0.035, 0],
  ...head(T.h2, 2, T.h2Land, 1),
  ['whoosh', T.move[0], 0.4, 0.035], ['riser', T.move[0], T.join, 0.03],
  ['boom', T.join, 0.12], ['bell', T.join, 1174.66, 0.05, 1.6, 0], ['bell', T.join + 0.08, 1760, 0.035, 1.4, 0.2], ['glitter', T.join, T.join + 0.7],
  ['pop', T.gtrBack, 880, 0.04, -0.3],
  ...T.duet.flatMap((s, i) => strum(s, [293.66, 392, 329.63, 440, 293.66, 392][i], 0.03, i % 2 ? 0.25 : -0.25)),
  ['pop', T.happy, 1318.51, 0.04, -0.3], ['tick', T.happy + 0.05, 0.05],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [P_TAG]: 659.25, [S_TAG]: 739.99 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
