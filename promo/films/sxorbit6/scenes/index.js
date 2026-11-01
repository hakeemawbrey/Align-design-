// sxorbit6 — ORBIT · Ep 6 (season finale): "Same Sky." (60 s vertical Align ad, Star Talk Shows · ORBIT, music: dreamy, C).
// Cast from the shared ORBIT kit (promo/films/sxorbit1/scenes/orbit.js, imported directly): ♈ EMBER, ♋ TIDE + her shell,
// ☄ STREAK, ♓ PISCES (sobbing, as always). Story 0–55.6, then the shared end card.
//   0.00–1.10  PREVIOUSLY ON ORBIT… the invitation scroll; "how far?"
//   1.10–5.90  A dotted line runs from Ember to a tiny galaxy in the corner of the sky: "far." "farther." "VERY far."  "*Very* far."
//   5.95       card-free beat change.  6.0–13.9  "Ember is *torn.*"  Rule of three: EMBER packs Tide (shell and all) into a
//              suitcase: "you'll fit! probably!" (the lid won't shut) → "or I just… don't go." (Ember dims, the suitcase flops)
//              → "I don't want to lose you." (soap zoom; Pisces wails).
//  14.00       card cut.  14.05–21.9  "For the first time: | *no shell.*"  Tide climbs out and sets the shell down. Gasp. Zoom.
//              TIDE: "go shine." "we'll talk every night."  Ember: heart eyes; a hug-bump.
//  22.0–33.3   Ember streaks off. Split screen: OUT THERE / HOME, the same moon in both skies. "Every *night.*"
//              NIGHT 1 · 2 · 3: one talk card in both skies; the answers flip together. (26.95 card cut, a deal.)
//              Ember shines brighter every night; Tide too.
//  33.4–39.7   The split closes; Ember streaks home and lands. "Ember comes *home.*"  EMBER: "you cheered every night."
//              TIDE: "of course. same sky."
//  39.80       card cut.  40.6 ★ LESSON UNLOCKED: "Love isn't keeping | someone close. | It's *cheering* | them on."  +1 SEASON FINALE
//  45.2–49.5   THE END… *for now.*  Far off, Streak sails by with a new comet date and waves: "I have a date! byeee!"
//  49.55       card cut.  49.6–55.45  "Same sky. | *Always.*"  Ember and Tide side by side under one moon. Fade to the plain sky.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { rgba, drawComet, drawCometTail } from './props.js'
import { drawEmber, drawTide, drawShell, drawPisces, drawStreak, drawStreakTail, showBug, buildPreviously, makeTalkCard } from '../../sxorbit1/scenes/orbit.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', ORBIT_PINK = '#ff7eb6', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const ARI = signStar('aries')

// ── the timeline
const T = {
  black: [0, 0.12], prevOut: [0.98, 1.1],
  dots: [1.5, 3.4], far: [BEAT(2.5), BEAT(4), BEAT(5.5)],
  open1: 6.1, suit: [6.0, 6.35], stuff: [6.6, 7.0], boing: [7.3, 7.9, 8.5], e1: 6.3, e2: 9.0, flop: [9.3, 9.8], e3: 11.4, z1: BEAT(21), close1: 13.85,
  cut1: 14.0,
  outOf: [14.4, 14.9], drop: [15.0, 15.45], zT: BEAT(26), open2: 15.6, t1: 15.8, t2: 17.6, hearts: 18.6, close2: 20.1, hug: [20.3, 20.9],
  depart: [21.0, 21.85],
  split: [22.0, 22.5], nights: [23.4, 26.4, 29.4], cut2: 26.95, splitOut: [32.9, 33.4],
  land: [33.4, 34.2], open3: 34.7, e4: 34.9, t3: 37.3, close3: 39.75,
  cut3: 39.8,
  lesson: BEAT(72), lessonOut: [44.9, 45.1],
  end: 45.25, endOut: [49.25, 49.5], streak: [45.6, 49.3], open4: 46.2, s1: 46.4, close4: 49.2,
  cut4: 49.55,
  last: 49.65, fade: [55.0, 55.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Love isn’t keeping | someone close. | It’s *cheering* | them on.', chip: '+1 SEASON FINALE' }

// ── the dialogue
const ET = '♈︎ EMBER', TT = '♋︎ TIDE', ST = '☄ STREAK'
const EC = '#ff9a7a', TC = '#8fdcff', SC = '#ffb3dc'
const LINES1 = [
  { t: T.e1, speaker: ET, color: EC, text: 'you’ll *fit!* probably!' },
  { t: T.e2, speaker: ET, color: EC, text: 'or I just… *don’t* go.' },
  { t: T.e3, speaker: ET, color: EC, text: 'I don’t want to *lose* you.' },
]
const LINES2 = [
  { t: T.t1, speaker: TT, color: TC, text: 'go *shine.*' },
  { t: T.t2, speaker: TT, color: TC, text: 'we’ll talk *every night.*' },
]
const LINES3 = [
  { t: T.e4, speaker: ET, color: EC, text: 'you cheered *every night.*' },
  { t: T.t3, speaker: TT, color: TC, text: 'of course. *same sky.*' },
]
const LINES4 = [{ t: T.s1, speaker: ST, color: SC, text: 'I have a *date!* byeee!' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const CPS = 28

// the montage: one talk card a night, both answers flip together
const NIGHTS = [
  { q: ['Best part', 'of today?'], e: 'a nebula waved at me', d: 'a quiet café walk' },
  { q: ['What made', 'you laugh?'], e: 'your last answer', d: 'your last answer' },
  { q: ['What are you', 'proud of?'], e: 'shining SO bright', d: 'you.' },
]

const HEADS = [
  { text: '*Very* far.', top: 170, size: 120, accentSize: 180, at: T.far[2] + 0.1, late: 0, gap: 0.12, accentColor: CYAN, out: [5.7, 5.9] },
  { text: 'Ember is *torn.*', top: 170, size: 108, accentSize: 164, at: 6.05, gap: 0.08, late: 1, lateAt: 6.35, accentColor: ORBIT_PINK, out: [13.7, 13.9] },
  { text: 'For the first time: | *no shell.*', top: 150, size: 92, accentSize: 150, at: 14.1, gap: 0.08, late: 2, lateAt: T.drop[1], lateGap: 0.14, accentColor: CYAN, out: [20.8, 21.0], fit: true },
  { text: 'Every *night.*', top: 140, size: 104, accentSize: 156, at: 22.55, gap: 0.08, late: 1, lateAt: 22.8, accentColor: GOLD, out: [32.7, 32.9] },
  { text: 'Ember comes *home.*', top: 170, size: 100, accentSize: 156, at: 33.5, gap: 0.08, late: 1, lateAt: T.land[1], accentColor: ORBIT_PINK, out: [39.55, 39.75], fit: true },
  { text: 'Same sky. | *Always.*', top: 160, size: 112, accentSize: 190, at: T.last + 0.2, gap: 0.12, late: 1, lateAt: T.last + 0.75, accentColor: GOLD, out: [54.95, 55.4] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── positions
const EMB = { x: 320, y: 1080 }, TID = { x: 740, y: 1080 }, S_E = 270, S_T = 260
const GAL = { x: 930, y: 420 }
const PIS_AT = { x: 120, y: 1335, s: 104 }
const SHELL_REST = { x: 880, y: 1265 }

// ── camera (soap snap-zooms)
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const ECU = (z, fx, fy, sx = 540, sy = 1040) => [z, fx, fy, sx, sy]
const CAM = [
  [0, ...IDN],
  [T.z1, ...IDN, 'lin'], [T.z1 + 0.1, ...ECU(2.2, EMB.x, 1075), 'out'], [13.4, ...ECU(2.28, EMB.x, 1075), 'lin'], [13.8, ...IDN, 'io'],
  [T.zT, ...IDN, 'lin'], [T.zT + 0.1, ...ECU(1.8, TID.x, 1090), 'out'], [15.6, ...ECU(1.85, TID.x, 1090), 'lin'], [15.95, ...IDN, 'io'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}
const toS = (C, wx, wy, s = 0) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z, s: s * C.z })
const SNAPS = [T.z1, T.zT]
const DRAMA = [[T.z1, 13.5, 0.9], [T.zT, 15.7, 0.6]]
const dramaK = t => DRAMA.reduce((m, [a, b, k]) => Math.max(m, k * clamp((t - a) / 0.1) * (1 - prog(t, b, b + 0.3))), 0)

// ── states
function tideHide(t) {
  if (t < T.suit[1]) return 0
  if (t < T.outOf[0]) return ease.inOutCubic(prog(t, T.suit[1], T.suit[1] + 0.25))
  return 1 - ease.inOutCubic(prog(t, ...T.outOf))
}
const shellOn = t => t < T.drop[0]            // from here on: no shell
function tideState(t) {
  const st = { mood: 'neutral', look: [-1, 0], blush: undefined, blink: undefined, peek: 0, peekLook: [-1, 0] }
  if (t < T.dots[0]) { st.mood = 'wide'; st.look = [-1, 0]; return st }
  if (t < T.suit[0]) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.outOf[0]) { st.peek = 1; st.peekLook = inR(t, T.e3, T.outOf[0]) ? [-1, -1] : [-1, 0]; return st }
  if (t < T.t1) { st.mood = 'sparkle'; st.look = [-1, 0]; return st }
  if (t < T.depart[0]) { st.mood = t < T.hearts ? 'sparkle' : 'happy'; st.look = [-1, 0]; st.blush = 0.8; return st }
  if (t < T.split[0]) { st.mood = 'happy'; st.look = [0, -1]; return st }
  if (t < T.land[0]) { st.mood = 'happy'; st.look = [1, -1]; return st }
  if (t < T.cut3) { st.mood = t < T.land[1] + 0.6 ? 'wide' : 'heart'; st.look = [-1, -1]; return st }
  st.mood = 'happy'; st.look = [-1, 0]; st.blush = 0.8
  return st
}
function emberState(t) {
  const st = { mood: 'happy', look: [1, 0], blink: undefined, squash: 0, dim: 0 }
  if (t < T.dots[0]) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.suit[0]) { st.mood = 'wide'; st.look = [1, -1]; st.blink = false; return st }
  if (t < T.e2) { st.mood = 'happy'; st.look = [1, 0]; return st }
  if (t < T.e3) { st.mood = 'neutral'; st.look = [1, 1]; st.dim = ease.inOutCubic(prog(t, T.e2, T.e2 + 0.8)); st.squash = 0.06 * st.dim; return st }
  if (t < T.outOf[0]) { st.mood = 'sparkle'; st.look = [0, 0]; st.dim = 0.6; return st }
  if (t < T.hearts) { st.mood = 'wide'; st.look = [1, 0]; st.dim = 0.6 * (1 - prog(t, T.t1, T.t2)); return st }
  if (t < T.split[0]) { st.mood = 'heart'; st.look = [1, 0]; return st }
  if (t < T.land[1]) { st.mood = 'sparkle'; st.look = [0, 0]; return st }
  st.mood = t < T.cut3 ? 'heart' : 'happy'; st.look = [1, 0]
  return st
}

const E_HOPS = [...talkHops(ALL_LINES, ET, { cps: CPS }), T.hug[0], T.land[1] + 0.05, ...T.nights.map(n => n + 1.0)]
const T_HOPS = [...talkHops(ALL_LINES, TT, { cps: CPS }), T.drop[1] + 0.1, T.hug[0] + 0.05, T.land[1] + 0.1, ...T.nights.map(n => n + 1.05)]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 36px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const lovers = await loadImg('card-talk-6.png')
  const CARDS = NIGHTS.map(n => makeTalkCard(document, lovers, n.q))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, open: T.open4, close: T.close4 }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.62 })
  const prev = buildPreviously(root, { at: 0, len: 1.1 })
  const bug = showBug(root, 6)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const stroked = (txt, X, Y, size, col, lw = 10, font = INTER, weight = 800) => { x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function popWord(t, t0, txt, X, Y, size, col, life = 1.0, rot = -0.08) {
    const k = t - t0
    if (k < 0 || k > life) return
    x.save(); x.globalAlpha *= 1 - prog(k, life - 0.25, life); x.translate(X, Y - k * 20); x.rotate(rot); const s = easeOutBack(prog(k, 0, 0.18), 3); x.scale(s, s)
    stroked(txt, 0, 0, size, col, Math.max(6, size / 5)); x.restore()
  }
  function dramaFx(t) {
    const k = dramaK(t)
    if (k > 0.01) {
      const g = x.createRadialGradient(540, 1000, 300, 540, 1000, 1180)
      g.addColorStop(0, 'rgba(150,10,74,0)'); g.addColorStop(0.55, `rgba(150,10,74,${0.2 * k})`); g.addColorStop(1, `rgba(56,0,30,${0.75 * k})`)
      x.fillStyle = g; x.fillRect(0, 0, W, H)
    }
    for (const s of SNAPS) {
      const dt = t - s
      if (dt < 0 || dt > 0.34) continue
      const a = 1 - dt / 0.34, r = rng(Math.round(s * 100))
      x.save(); x.globalAlpha = 0.5 * a; x.strokeStyle = '#fff1f6'; x.lineCap = 'round'
      for (let i = 0; i < 44; i++) {
        const ang = r() * TAU, r0 = 300 + r() * 240 + dt * 900, len = 420 + r() * 700
        x.lineWidth = 2 + r() * 6
        x.beginPath(); x.moveTo(540 + Math.cos(ang) * r0, 1040 + Math.sin(ang) * r0); x.lineTo(540 + Math.cos(ang) * (r0 + len), 1040 + Math.sin(ang) * (r0 + len)); x.stroke()
      }
      x.restore()
      if (dt < 0.09) { x.fillStyle = `rgba(255,240,246,${0.22 * (1 - dt / 0.09)})`; x.fillRect(0, 0, W, H) }
    }
  }

  // ═══════════════════════ props ═══════════════════════
  function moon(cx, cy, r, t, a = 1) {
    x.save(); x.globalAlpha *= a
    const g = x.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 3); g.addColorStop(0, 'rgba(255,241,200,0.35)'); g.addColorStop(1, 'rgba(255,241,200,0)')
    x.fillStyle = g; x.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6)
    const c = Math.max(3, Math.round(r / 9))
    for (let j = -10; j <= 10; j++) for (let i = -10; i <= 10; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5) * c
      if (d > r) continue
      const sh = Math.hypot(i + 0.5 + 4, j + 0.5 - 2) * c < r * 0.95
      x.fillStyle = sh ? 'rgba(255,241,200,0.08)' : (i + j) % 5 === 0 ? '#f4dfa6' : '#fff3c8'
      x.fillRect(cx + i * c, cy + j * c, c + 0.5, c + 0.5)
    }
    x.restore()
  }
  function galaxy(cx, cy, r, t, a = 1) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(t * 0.3)
    for (let i = 0; i < 70; i++) {
      const u = i / 70, arm = i % 2, ang = u * 5 + arm * Math.PI, rr = u * r
      x.fillStyle = [LAV, PINK, CYAN, BONE][i % 4]; const s = Math.max(3, 9 * (1 - u))
      x.fillRect(Math.cos(ang) * rr - s / 2, Math.sin(ang) * rr * 0.55 - s / 2, s, s)
    }
    const g = x.createRadialGradient(0, 0, 0, 0, 0, r * 0.5); g.addColorStop(0, 'rgba(255,240,255,0.9)'); g.addColorStop(1, 'rgba(200,160,255,0)'); x.fillStyle = g; x.beginPath(); x.arc(0, 0, r * 0.5, 0, TAU); x.fill()
    x.restore()
  }
  function suitcase(cx, cy, c, t, lid = 0, alpha = 1, rot = 0) {
    if (alpha <= 0) return
    x.save(); x.globalAlpha *= alpha; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
    const w = 30 * c, h = 18 * c
    x.fillStyle = INK; x.fillRect(-w / 2 - c, -h / 2 - c, w + 2 * c, h + 2 * c)
    x.fillStyle = '#c4703a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#e8955a'; x.fillRect(-w / 2, -h / 2, w, 2 * c)
    x.fillStyle = '#7a3e1a'; x.fillRect(-w / 2 + 4 * c, -h / 2, 2 * c, h); x.fillRect(w / 2 - 6 * c, -h / 2, 2 * c, h)
    // stickers
    x.fillStyle = ORBIT_PINK; x.beginPath(); x.arc(-4 * c, 2 * c, 3 * c, 0, TAU); x.fill()
    x.fillStyle = GOLD; x.font = `800 ${Math.round(4 * c)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('★', -4 * c, 2.3 * c)
    x.fillStyle = CYAN; x.fillRect(5 * c, -3 * c, 6 * c, 4 * c)
    // handle
    x.fillStyle = INK; x.fillRect(-4 * c, h / 2 + c, 8 * c, 2.5 * c); x.fillStyle = '#7a3e1a'; x.fillRect(-3 * c, h / 2 + c, 6 * c, 1.5 * c)
    // the lid (hinged at the top edge, flips up)
    x.save(); x.translate(0, -h / 2); x.scale(1, Math.cos(lid * Math.PI * 0.85))
    x.fillStyle = INK; x.fillRect(-w / 2 - c, -4 * c - c, w + 2 * c, 4 * c + c)
    x.fillStyle = '#d98048'; x.fillRect(-w / 2, -4 * c, w, 4 * c)
    x.restore()
    x.restore()
  }

  // ═══════════════════════ the main stage (camera) ═══════════════════════
  function stage1(t, C) {
    // the far galaxy + the dotted line (hook)
    const ga = clamp(prog(t, 1.15, 1.6)) * (1 - prog(t, 5.6, 6.0))
    if (ga > 0) {
      galaxy(GAL.x, GAL.y, 70, t, ga)
      const p = ease.inOutCubic(prog(t, ...T.dots)), E = { x: EMB.x + 40, y: EMB.y - 140 }
      x.save(); x.globalAlpha *= ga; x.strokeStyle = rgba(CYAN, 0.85); x.lineWidth = 6; x.setLineDash([4, 18]); x.lineCap = 'round'; x.lineDashOffset = -t * 40
      x.beginPath(); x.moveTo(E.x, E.y); x.quadraticCurveTo(560, 520, lerp(E.x, GAL.x, p) + (560 - E.x) * 0, lerp(E.y, GAL.y, p)); x.stroke(); x.restore()
      const labels = [['far.', 470, 760, 40], ['farther.', 640, 600, 50], ['VERY far.', 820, 520, 62]]
      labels.forEach(([s, lx, ly, sz], i) => { const k = pop01(t, T.far[i], 0.3, 2.6); if (k > 0.01) { x.save(); x.globalAlpha *= ga; x.translate(lx, ly); x.scale(k, k); x.rotate(-0.08); stroked(s, 0, 0, sz, i === 2 ? CYAN : BONE, 10); x.restore() } })
    }
    // Pisces
    const big = inR(t, T.z1, 14.0) || inR(t, T.drop[0], T.split[0])
    { const S = toS(C, PIS_AT.x, PIS_AT.y, PIS_AT.s); drawPisces(x, S.x, S.y, S.s, t, { tears: big ? 3 : 1, hank: big && Math.floor(t * 5) % 2 ? 1 : 0, pull: bump(t, T.z1, 0.5) + bump(t, T.drop[1], 0.5), look: [1, -1], mood: big ? 'happy' : 'sparkle' }) }
    // the shell set down (from 15.0 on)
    if (t >= T.drop[0]) {
      const p = prog(t, ...T.drop), from = { x: TID.x + 70, y: TID.y + 90 }
      const sx = lerp(from.x, SHELL_REST.x, ease.outCubic(p)), sy = lerp(from.y, SHELL_REST.y, ease.inQuad(p)) - Math.sin(Math.PI * p) * 60 - bump(t, T.drop[1], 0.25) * 12
      const S = toS(C, sx, sy)
      drawShell(x, S.x, S.y, 3.2 * C.z, t, {})
      if (t > T.drop[1]) sparkleRing(t, S.x, S.y - 30, T.drop[1], 8, 60, 0.4, [CYAN, BONE, PINK], 0.6, 18)
    }
    // the suitcase
    const sa = clamp(prog(t, ...T.suit)) * (1 - prog(t, ...T.flop))
    if (sa > 0) {
      const S = toS(C, TID.x, TID.y + 120), b = T.boing.reduce((m, bt) => Math.max(m, bump(t, bt, 0.35)), 0)
      suitcase(S.x, S.y, 8 * C.z, t, t < T.stuff[1] ? 1 : b, sa, prog(t, ...T.flop) * 0.6)
      T.boing.forEach((bt, i) => popWord(t, bt, ['boing.', 'boing!', 'BOING.'][i], S.x + 150, S.y - 140 - i * 20, 34 + i * 6, GOLD, 0.6, 0.1))
    }
    // Ember
    const est = emberState(t)
    let eP = { x: EMB.x, y: EMB.y }
    if (inR(t, T.hug[0], T.hug[1])) eP.x += 90 * bump(t, T.hug[0], T.hug[1] - T.hug[0])
    let eA = 1
    if (t >= T.depart[0] && t < T.land[0]) { const p = ease.inCubic(prog(t, ...T.depart)); eP = { x: lerp(EMB.x, 1200, p), y: lerp(EMB.y, -300, p) }; eA = 1 - prog(t, T.depart[1] - 0.15, T.depart[1]) }
    if (eA > 0 && (t < T.split[0] || t >= T.land[0])) {
      if (t >= T.depart[0] && t < T.depart[1]) { const S = toS(C, eP.x, eP.y); drawStreakTail(x, S.x, S.y, 90, t, { ang: Math.atan2(EMB.y + 300, EMB.x - 1200), len: 4 * prog(t, ...T.depart), alpha: eA }) }
      const S = toS(C, eP.x, eP.y, S_E)
      x.save(); x.globalAlpha *= eA
      drawEmber(x, S.x, S.y, S.s, t, { mood: est.mood, look: est.look, blink: est.blink, squash: est.squash, hops: E_HOPS, glow: 1 - 0.6 * est.dim, alpha: 1 - 0.25 * est.dim, pop: pop01(t, 0.02, 0.3, 1.6) })
      x.restore()
      if (t >= T.depart[0] && t < T.depart[0] + 0.25) sparkleRing(t, S.x, S.y, T.depart[0], 10, 120, 0.2)
    }
    // Tide
    if (t < T.split[0] || t >= T.land[0]) {
      const st = tideState(t), S = toS(C, TID.x + (inR(t, T.hug[0], T.hug[1]) ? -60 * bump(t, T.hug[0], T.hug[1] - T.hug[0]) : 0), TID.y, S_T)
      drawTide(x, S.x, S.y, S.s, t, { hide: tideHide(t), peek: st.peek, peekLook: st.peekLook, shellAlpha: shellOn(t) ? 1 : 0, mood: st.mood, look: st.look, blush: st.blush, blink: st.blink, hops: T_HOPS, shake: inR(t, T.stuff[0], T.boing[2] + 0.4) ? 0.6 : 0 })
      if (inR(t, T.outOf[1], T.outOf[1] + 0.8)) sparkleRing(t, S.x, S.y, T.outOf[1], 14, 200, 0.1, [CYAN, BONE, GOLD, PINK], 0.8)
    }
    if (inR(t, T.hug[0], T.hug[1] + 0.8)) popWord(t, T.hug[0] + 0.25, 'bump.', 530, 900, 40, PINK, 0.9, 0)
    if (inR(t, T.zT, T.zT + 1)) popWord(t, T.zT + 0.05, '*gasp*', 540, 560, 56, CYAN, 1.0, -0.06)
    // the landing
    if (t >= T.land[0] && t < T.land[1] + 0.8) {
      const p = ease.outCubic(prog(t, ...T.land))
      if (p < 1) { const S = toS(C, lerp(EMB.x - 500, EMB.x, p), lerp(-300, EMB.y, p)); drawStreakTail(x, S.x, S.y, 90, t, { ang: Math.atan2(-300 - EMB.y, -500), len: 4 * (1 - p) }) }
      sparkleRing(t, toS(C, EMB.x, EMB.y).x, toS(C, EMB.x, EMB.y).y, T.land[1], 14, 220, 0.3)
    }
  }
  // Ember arriving home is drawn by stage1's Ember (eP lerps from the sky)
  function emberLandPos(t) { return null }

  // ═══════════════════════ the montage: split screen, same moon ═══════════════════════
  function montage(t) {
    if (t < T.split[0] || t >= T.splitOut[1]) return
    const kIn = ease.inOutCubic(prog(t, ...T.split)), kOut = ease.inOutCubic(prog(t, ...T.splitOut))
    const seam = 960
    // two skies: the top one (OUT THERE) slides down from above, then back up
    const topH = seam * kIn * (1 - kOut)
    x.save(); x.beginPath(); x.rect(0, 0, W, topH); x.clip()
    x.translate(0, topH - seam)
    drawSky(x, t + 30, { ...SKY_H, zoom: SKY_H.zoom * 1.3, dx: 260, dy: -180, moon: null })
    x.fillStyle = 'rgba(80,30,120,0.35)'; x.fillRect(0, 0, W, seam)
    galaxy(170, 330, 140, t, 0.9)
    moon(900, 330, 46, t)
    // Ember out there, shining brighter every night
    const n = T.nights.filter(v => t >= v).length
    const grow = 1 + 0.12 * n
    drawEmber(x, 330, 640, 230 * grow, t, { mood: n ? 'happy' : 'sparkle', look: [1, 0], hops: E_HOPS, glow: 1 + 0.3 * n })
    stroked('OUT THERE', 880, 880, 26, CYAN, 6, MONO, 700)
    x.restore()
    // bottom (HOME)
    x.save(); x.beginPath(); x.rect(0, topH, W, H - topH); x.clip()
    x.save(); x.globalAlpha *= clamp(kIn * 3) * (1 - kOut); drawSky(x, t, { ...SKY_H, moon: null }); x.restore()
    moon(900, topH + 330, 46, t, kIn * (1 - kOut))
    const st = 'happy'
    drawTide(x, 330, topH + 600, 230 * (1 + 0.08 * n), t, { shellAlpha: 0, mood: st, look: [1, -1], hops: T_HOPS, blush: 0.6 })
    { const pS = { x: PIS_AT.x + 30, y: topH + 820 }; drawPisces(x, pS.x, pS.y, 96, t, { tears: n >= 3 ? 3 : 2, look: [1, -1], mood: 'happy' }) }
    stroked('HOME', 900, topH + 140, 26, PINK, 6, MONO, 700)
    x.restore()
    // the seam: a dotted gold line (same sky), the NIGHT pill
    if (topH > 2) {
      x.save(); x.strokeStyle = rgba(GOLD, 0.8); x.lineWidth = 4; x.setLineDash([10, 10]); x.lineDashOffset = -t * 30; x.beginPath(); x.moveTo(0, topH); x.lineTo(W, topH); x.stroke(); x.restore()
      x.fillStyle = 'rgba(255,241,200,0.12)'; x.fillRect(895, 0, 10, topH + 330)   // the moon's light runs through both skies
    }
    // each night: the card deals into both skies, then both answers flip together
    T.nights.forEach((n0, i) => {
      const end = (T.nights[i + 1] ?? T.splitOut[0]) - 0.05
      if (t < n0 || t > end) return
      const k = pop01(t, n0, 0.4, 1.6) * (1 - ease.inCubic(prog(t, end - 0.3, end)))
      const flip = Math.cos(Math.PI * clamp(prog(t, n0 + 0.1, n0 + 0.5)))
      const card = CARDS[i]
      // NIGHT pill on the seam
      x.save(); x.globalAlpha *= clamp(k); x.translate(540, topH); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-120, -32, 240, 64, 32); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 4; x.stroke()
      stroked(`NIGHT ${i + 1}`, 0, 2, 34, GOLD, 0, MONO, 700); x.restore()
      { const qk = pop01(t, n0 + 0.3, 0.3, 2.2) * (1 - ease.inCubic(prog(t, end - 0.3, end))); if (qk > 0.01) { x.save(); x.translate(540, topH + 76); x.scale(qk, qk); stroked(`“${NIGHTS[i].q.join(' ')}”`, 0, 0, 44, BONE, 10); x.restore() } }
      for (const [cy, ans, col, ax] of [[topH - 380, NIGHTS[i].e, EC, 330], [topH + 560, NIGHTS[i].d, TC, 330]]) {
        if (card) {
          const w = 220, h = w * card.height / card.width
          x.save(); x.globalAlpha *= clamp(k); x.translate(790, cy); x.rotate(-0.05); x.scale(Math.max(0.03, Math.abs(flip)) * k, k)
          if (flip > 0) { x.fillStyle = '#2a1a5a'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 16); x.fill(); x.strokeStyle = GOLD; x.lineWidth = 4; x.stroke(); stroked('?', 0, 0, 90, GOLD, 0) }
          else x.drawImage(card, -w / 2, -h / 2, w, h)
          x.restore()
        }
        // the answer (both at the same moment)
        const ak = pop01(t, n0 + 1.0, 0.3, 2.4) * (1 - ease.inCubic(prog(t, end - 0.3, end)))
        if (ak > 0.01) {
          x.save(); x.translate(ax, cy + 230); x.scale(ak, ak)
          x.font = `800 36px ${INTER}`; const tw = x.measureText(ans).width + 44
          x.fillStyle = '#fff7ec'; x.beginPath(); x.roundRect(-tw / 2, -34, tw, 68, 34); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke()
          x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(ans, 0, 2)
          x.restore()
        }
      }
      if (t > n0 + 1.0) sparkleRing(t, 540, topH, n0 + 1.0, 10, 160, i, [GOLD, BONE, PINK, CYAN], 0.7)
    })
  }

  // ═══════════════════════ THE END… for now (+ Streak and a new comet date) ═══════════════════════
  function theEnd(t) {
    if (t < T.end || t > T.endOut[1]) return
    const tau = t - T.end, pin = easeOutBack(clamp(tau / 0.45), 1.7), po = ease.inCubic(prog(t, ...T.endOut))
    // Streak + date sail across the far sky behind the card
    const sp = prog(t, ...T.streak), sx = lerp(1250, -250, sp), sy = 420 + Math.sin(sp * 6) * 30
    x.save(); x.globalAlpha *= 1 - po
    drawStreakTail(x, sx, sy, 56, t, { ang: 0.15, len: 3.4, wag: 0.1 })
    drawStreak(x, sx, sy, 56, t, { mood: 'happy', shades: 0.2, tilt: 0.25 * Math.sin(t * 9), look: [0, 1] })
    drawCometTail(x, sx + 150, sy + 40, 48, t, { ang: 0.12, len: 3.2, wag: 0.1, seed: 9 })
    drawComet(x, sx + 150, sy + 40, 48, t, { mood: 'happy', shades: 1, tag: false, look: [-1, 0] })
    // a little heart between them
    const hb = 1 + 0.2 * Math.sin(t * 9); x.fillStyle = '#ff4f7e'; x.font = `800 ${Math.round(40 * hb)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥', sx + 75, sy - 60)
    popWord(t, T.streak[0] + 0.8, 'NEW DATE ✨', sx + 75, sy - 120, 30, PINK, 2.4, 0)
    x.restore()
    // the card
    x.save(); x.globalAlpha *= clamp(tau / 0.1) * (1 - po); x.translate(540, 900); x.rotate(-0.04 * (1 - pin) + 0.02 * Math.sin(tau * 2)); x.scale(pin * (1 - 0.2 * po), pin * (1 - 0.2 * po))
    const w = 820, h = 440
    x.save(); x.shadowColor = 'rgba(40,0,20,0.6)'; x.shadowBlur = 50; x.shadowOffsetY = 18; x.fillStyle = GOLD; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 30); x.fill(); x.restore()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a1250'); g.addColorStop(1, '#14082e')
    x.fillStyle = g; x.beginPath(); x.roundRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 20); x.fill()
    x.strokeStyle = rgba(GOLD, 0.6); x.lineWidth = 3; x.beginPath(); x.roundRect(-w / 2 + 30, -h / 2 + 30, w - 60, h - 60, 12); x.stroke()
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.font = `800 104px ${INTER}`; x.fillStyle = BONE; x.fillText('THE END…', 0, -10)
    const fk = clamp((tau - 0.8) / 0.3), fs = easeOutBack(fk, 2.6)
    x.save(); x.translate(0, 120); x.rotate(-0.06); x.scale(fs, fs); x.font = `italic 600 130px ${SERIF}`; x.fillStyle = ORBIT_PINK; x.fillText('for now', 0, 0); x.restore()
    x.font = `700 24px ${MONO}`; x.letterSpacing = '6px'; x.fillStyle = rgba(GOLD, 0.85); x.fillText('ORBIT', 3, -h / 2 + 70); x.letterSpacing = '0px'
    x.restore()
    if (tau > 0.8) sparkleRing(t, 540, 1010, T.end + 0.8, 14, 260, 0.2)
  }

  // ═══════════════════════ same sky. always. ═══════════════════════
  function finale(t, C) {
    if (t < T.last) return
    const k = clamp(prog(t, T.last, T.last + 0.4)), out = 1 - ease.inQuad(prog(t, ...T.fade))
    x.save(); x.globalAlpha *= k * out
    const mk = pop01(t, T.last + 0.3, 0.6, 1.4)
    moon(540, 640, 90 * mk, t)
    // the gold line between them
    const lp = ease.inOutCubic(prog(t, T.last + 1.0, T.last + 1.8))
    x.save(); x.strokeStyle = rgba(GOLD, 0.85); x.lineWidth = 6; x.setLineDash([16, 12]); x.lineDashOffset = -t * 30
    x.beginPath(); x.moveTo(380, 1080); x.lineTo(lerp(380, 700, lp), 1080); x.stroke(); x.restore()
    drawEmber(x, 380, 1090, 250, t, { mood: inR(t, 51.5, 52.3) ? 'wink' : 'happy', look: [1, -1], hops: [T.last + 0.6, 53.0], glow: 1.2 })
    drawTide(x, 700, 1090, 240, t, { shellAlpha: 0, mood: 'happy', look: [-1, -1], blush: 0.9, hops: [T.last + 0.7, 53.05], glow: 1.2 })
    drawPisces(x, PIS_AT.x, PIS_AT.y, PIS_AT.s, t, { tears: 3, hank: Math.floor(t * 5) % 2 ? 1 : 0, look: [1, -1], mood: 'happy', pull: bump(t, 52.0, 0.5) })
    drawShell(x, SHELL_REST.x, SHELL_REST.y, 3.2, t, {})
    x.restore()
    if (t > T.last + 1.8 && t < T.last + 2.6) sparkleRing(t, 540, 1080, T.last + 1.8, 12, 200, 0.4)
  }

  function previouslyGrade(t) {
    if (t >= T.prevOut[1]) return
    const k = 1 - prog(t, ...T.prevOut)
    x.save(); x.globalAlpha = k; x.globalCompositeOperation = 'color'; x.fillStyle = '#ff6fae'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(70,0,40,0.3)'; x.fillRect(0, 0, W, H); x.restore()
    if (t > 1.0) { x.fillStyle = `rgba(255,240,248,${0.6 * bump(t, 1.0, 0.16)})`; x.fillRect(0, 0, W, H) }
  }
  // the recap: the end of Ep 5 — the invitation, Ember and Tide wide-eyed
  function recap(t) {
    drawEmber(x, EMB.x, EMB.y, S_E, 0.6, { mood: 'wide', look: [1, -1], blink: false })
    drawTide(x, TID.x, TID.y, S_T, 0.6, { mood: 'wide', look: [-1, -1], blink: false })
    x.save(); x.translate(540, 600)
    x.fillStyle = INK; x.fillRect(-306, -206, 612, 412); x.fillStyle = '#fff3d6'; x.fillRect(-300, -200, 600, 400)
    for (const yy of [-200, 200]) { x.fillStyle = '#c98a3a'; x.fillRect(-330, yy - 16, 660, 32) }
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#c23a2a'; x.font = `800 60px ${INTER}`; x.fillText('EMBER ♈︎', 0, -80)
    x.fillStyle = '#4a2410'; x.font = `italic 500 48px ${SERIF}`; x.fillText('come shine in a galaxy', 0, 10); x.fillText('very, very far away.', 0, 70)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) * (t >= T.last - 0.2 && t < T.fade[0] ? 0 : 1) } })
      if (t < 1.1) recap(t)
      else if (t < T.end) { stage1(t, C); montage(t); dramaFx(t) }
      else if (t < T.last) { const pk = 1 - prog(t, T.end, T.end + 0.3); if (pk > 0) { x.save(); x.globalAlpha = pk; stage1(t, C); x.restore() } theEnd(t) }
      else if (t < T.fade[1] + 0.02) finale(t, C)
      previouslyGrade(t)
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      prev.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card cuts: torn → no shell, night 1 → night 2 (a deal), home → the lesson, THE END → same sky (≈ every 12–14 s)
export const CUTS = [{ t: T.cut1, keep: true }, { t: T.cut2, kind: 'deal', keep: true }, { t: T.cut3, keep: true }, { t: T.cut4, keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into C); brass / chip / strings are absolute (C).
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { C3: 130.81, E3: 164.81, G3: 196.0, A3: 220.0, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, C5: 523.25, E5: 659.25 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.5, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.1, ...FXB }], ['tom', r3(t), low, { gain: 0.28, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.05]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
export const CUES = [
  ['whoosh', 0.05, 0.5, 0.05], ['bell', 0.18, 1760, 0.025, 1.0, 0], ['whoosh', 0.95, 0.3, 0.06], ['pop', 1.08, 880, 0.035, 0],
  // very far
  ['riser', T.dots[0], T.dots[1], 0.03], ...T.far.map((f, i) => ['pop', f, NOTE[2 + i * 2], 0.04 + i * 0.01, 0.3]), ['bell', T.far[2], 2349.3, 0.025, 1.4, 0.4],
  ...headCues(HEADS[0]),
  // torn
  ...headCues(HEADS[1]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ET]: 1046.5, [TT]: 740, [ST]: 1318.51 } }),
  ['whoosh', T.suit[0], 0.3, 0.05], ['pop', T.suit[1], 330, 0.05, 0.3], ['chip', T.stuff[0], 700, 0.35, { duty: 0.25, slide: -20, gain: 0.03, decay: 0.3, sustain: 0.5, rev: 0.1, dly: 0, bus: 'fx' }],
  ...T.boing.map((b, i) => ['chip', b, 300 + i * 60, 0.3, { wave: 'tri', slide: 18, gain: 0.05, decay: 0.25, sustain: 0.4, rev: 0.1, dly: 0, bus: 'fx' }]),
  ['chip', T.flop[0], 500, 0.5, { wave: 'tri', slide: -24, gain: 0.04, decay: 0.4, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }], ['pop', T.flop[1], 160, 0.05, 0.3],
  ...sting(T.z1, [N.A3, N.C4, N.E4, N.A4], 1.0, 0.045, 64), ['strings', T.z1, r3(T.z1 + 1.4), [N.A3, N.C4, N.E4, N.A4], { gain: 0.012, attack: 0.1, release: 0.6, rev: 0.5, bus: 'fx' }],
  // no shell
  ...headCues(HEADS[2]),
  ['glitter', T.outOf[0], r3(T.outOf[1] + 0.4)], ['bell', T.outOf[1], 1760, 0.03, 1.4, 0],
  ['pop', T.drop[1], 220, 0.05, 0.3], ['tick', T.drop[1], 0.05],
  ...sting(T.zT, [N.C4, N.E4, N.G4, N.C5], 1.0, 0.04, 70), ['strings', T.zT, r3(T.zT + 1.8), [N.C4, N.E4, N.G4, N.C5], { gain: 0.012, attack: 0.2, release: 0.8, rev: 0.5, bus: 'fx' }],
  ['glitter', T.hearts, r3(T.hearts + 0.5)], ['pop', r3(T.hug[0] + 0.25), 523.25, 0.05, 0], ['tick', r3(T.hug[0] + 0.25), 0.04],
  ['riser', T.depart[0], T.depart[1], 0.04], ['whoosh', r3(T.depart[0] + 0.3), 0.7, 0.08], ['glitter', T.depart[0], T.depart[1]],
  // every night
  ['whoosh', T.split[0], 0.5, 0.05], ...headCues(HEADS[3]),
  ...T.nights.flatMap((n, i) => [['whoosh', n, 0.3, 0.04], ['pop', r3(n + 0.1), 784, 0.035, 0], ['tick', r3(n + 0.5), 0.04], ['bell', r3(n + 1.0), NOTE[3 + i] * 2, 0.03, 1.4, 0], ['glitter', r3(n + 1.0), r3(n + 1.4)], ['pluck', r3(n + 1.02), NOTE[1 + i], 0.03, 0.8, 0]]),
  ['whoosh', T.splitOut[0], 0.5, 0.05],
  // home
  ['riser', T.land[0], T.land[1], 0.04], ['whoosh', T.land[0], 0.6, 0.07], ['pop', T.land[1], 330, 0.06, 0], ['glitter', T.land[1], r3(T.land[1] + 0.6)], ['bell', r3(T.land[1] + 0.05), 1174.66, 0.03, 1.4, 0],
  ...headCues(HEADS[4]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'C' }),
  // the end… for now
  ['whoosh', r3(T.end + 0.1), 0.5, 0.05], ['brass', r3(T.end + 0.1), [N.C3, N.G3, N.C4, N.E4, N.G4], 1.4, { gain: 0.04, bright: 1.0, ...FXB }],
  ['pop', r3(T.end + 0.8), 1174.66, 0.045, 0], ['pluck', r3(T.end + 0.8), 1174.66, 0.035, 0.6, 0], ['glitter', r3(T.end + 0.8), r3(T.end + 1.3)],
  ['glitter', T.streak[0], r3(T.streak[0] + 1.2)], ['whoosh', r3(T.streak[0] + 0.3), 1.0, 0.04], ['bell', r3(T.streak[0] + 0.8), 1760, 0.02, 1.2, 0.4],
  // same sky. always.
  ['whoosh', r3(T.last + 0.1), 0.5, 0.04], ['bell', r3(T.last + 0.3), 1318.51, 0.03, 2.0, 0],
  ...headCues(HEADS[5]),
  ['glitter', r3(T.last + 1.0), r3(T.last + 1.9)], ...[0, 1, 2, 3].map(i => ['bell', r3(T.last + 1.9 + i * 0.3), NOTE[5 - i] * 2, 0.015, 1.4, (i - 1.5) * 0.3]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
