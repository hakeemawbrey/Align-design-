// sthold — "Cosmic Customer Service." (60 s vertical Align ad, Star Talk season 3 #11, music: chiptune, Gm).
// Story 0–55.6, then the shared end card. A call centre floats in the nebula: three desks in a row. ♑ CAPRICORN (in a
// headset) has the middle one; ♈ ARIES works the desk to the right, ♓ PISCES the one to the left ("FEELINGS DEPT.").
// The joke underneath: Capricorn deflects a feeling with procedure, until it takes the headset off.
//   0.0–5.2    "You’ve reached | the *stars.* | Please hold."  A big pixel phone rings in the sky (RING!). Capricorn,
//              bored, half-lidded, taps its headset (1.71): the phone drops onto its desk and the camera pulls back.
//              CAPRICORN: "thank you for calling the stars." → "how can we help?"
//   5.3–10.5   "Caller ID: | *you.*"  Your texts pop up over the desk: "first time dating since the breakup." →
//              "what if I'm not ready?"  Capricorn reads it, panics (wide eyes, sweat), fakes a smile: "please hold."
//  10.6        CLICK. The hold music starts (cheerful chiptune). A "♪ HOLD MUSIC" bug.
//  10.6–15.0   "Estimated wait: | *2 minutes.*"  Whip right: ARIES juggles three ringing handsets: "your call is
//              important to us!!" One lands on its head (bonk, dizzy stars); the others clatter onto the desk.
//  15.0        card cut (flip): you've been transferred. The hold music comes back sadder (an octave down, muffled).
//  15.0–20.4   "Estimated wait: | *2 hours.*"  PISCES at FEELINGS DEPT., already crying: "hi, you've been transferred
//              to feelings." It sobs, then floats up off its desk and drifts away, crying.
//  20.4–27.2   "Estimated wait: | *forever.*"  Whip back. The hold music is slowed + sad (droopy, warbly). Pisces
//              floats in the background, still crying. Capricorn sips coffee, eyes shut, on break. Your texts
//              spiral: "what if I cry at dinner" / "what if they ask about my ex" / "what if I'm rusty", then a
//              search bar types "how to da…". Capricorn peeks, double-takes, SPIT-TAKE (PFFT!); the hold music
//              dies on a tape stop + record scratch. CAPRICORN: "do NOT search 'how to date.'"  NOPE (stamp).
//  27.25       card cut (shuffle).
//  27.3–35.0   "Our options | have *changed.*"  Capricorn takes the headset OFF and sets it down; the camera pushes
//              in; soft eyes. "press 1 to wait until you're 'perfect.'" → "press 2 to start small and honest."
//              A keypad: your pixel finger hovers over 1 (Capricorn: wide eyes)… slides to 2… presses it.
//  35.04       THE DROP: the 2 beeps, your worries pop like bubbles.
//  35.0–39.8   "Now *connecting.*"  Aries hops in (a handset still on its head), Pisces floats down, happy-crying.
//              CAPRICORN: "you don't need to be healed. just honest."
//  39.95       card cut (flip).
//  40.04–44.8  ★ LESSON UNLOCKED (lesson.js): "You don’t need to be | fully healed. | Just *honest.*"  +1 COURAGE
//  44.9–50.9   "Tonight’s *deck.*"  The hold music comes back HAPPY. Three cards deal in, one at a time; the middle
//              one flips to a veiled card. CAPRICORN: "one card at a time. at your pace."
//  51.05       card cut (deal).
//  51.2–55.5   "Thanks for calling. | You’re *ready* enough."  Headset back on, a wink. The phone rings again (next
//              caller); everyone's eyes go wide. All pops out by 55.5; the end card takes over at 55.6.
// One canvas (sky + a camera-moved world of three desks + screen-space bug, keypad, cards), DOM type + dialogue boxes +
// the shared lesson above it, grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, cellToWorld, headsetCells, headsetWorld, tearsCells, sweatCells, dizzyCells, drawDeskPhone, drawHandset,
  drawDesk, drawMug, drawTissueBox, drawFinger, drawStamp, ringWaves, confetti, drawSmartphone, INK } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0', SKYB = '#8fd8f6', RED = '#ff4a5e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)     // 108 bpm grid
const BAR = 4 * BL, S16 = BL / 4
const CAP = signStar('capricorn'), ARI = signStar('aries'), PIS = signStar('pisces')
const mod = (a, n) => ((a % n) + n) % n
const r2 = v => +v.toFixed(2), r3 = v => +v.toFixed(3)

// ── the timeline
export const DROP = BEAT(62)                    // 35.044: "2" is pressed → the drop
export const T = {
  black: [0, 0.3],
  // 0 · the hook
  h0: 0.18, h0Late: 1.02, rings: [0.12, 0.62, 1.12],
  answer: BEAT(2), land: [1.74, 2.3], pull: [1.711, 2.55],
  l1: 2.2, l2: 4.9, closeA: 7.05, h0Out: [5.0, 5.2],
  // 1 · caller ID: you
  h1: 5.3, h1Land: 5.68, b1: 5.85, b2: 7.45, panic: [7.75, 8.95], l3: 9.05, h1Out: [10.3, 10.5],
  // 2 · hold #1: Aries
  click: BEAT(18), whip1: [10.6, 10.95], h2: 10.72, h2Land: 11.05, l4: 11.3, stop: [13.05, 13.1, 13.2], bonk: 13.35, h2Out: [14.66, 14.84],
  // 3 · hold #2: transferred to feelings
  transfer: BEAT(26), whip2: [14.86, 15.2], h3: 15.24, h3Land: 15.56, l5: 15.8, sob: 17.5, float: [17.95, 20.35], closeB: 18.95, h3Out: [20.12, 20.3],
  // 4 · hold #3: the spiral
  whip3: [20.35, 20.72], h4: 20.5, h4Land: 20.88, sad3: BEAT(36), sip: 20.55, b3: 21.35, b4: 22.0, b5: 22.65, search: 23.3,
  peek: 23.72, dbl: 24.0, snap: 24.27, spit: BEAT(43), die: [23.95, BEAT(43)], l6: 24.85, stamp: 25.35, crumple: [26.3, 26.75], closeC: 27.4, h4Out: [26.98, 27.16],
  // 5 · the turn
  h5: 27.42, h5Land: 27.78, off: [27.55, 28.5], push: [27.35, 28.9], dimB: [27.3, 27.9], l7: 28.62, l8: 31.62,
  keypad: [32.2, 32.55], finger: [32.75, 33.25], hover1: [33.3, 33.95], move2: [33.95, 34.38], tap: [34.86, DROP], closeD: 34.42, h5Out: [34.82, 34.98],
  // 6 · now connecting
  h6: 35.14, h6Land: 35.5, burst: [35.1, 35.22, 35.34, 35.46], padOut: [35.62, 35.98], fingerOut: [35.45, 35.95], join: [35.3, 36.2], l9: 36.32, closeE: 39.62, h6Out: [39.55, 39.75],
  // 7 · LESSON UNLOCKED
  lesson: BEAT(71), lessonOut: [44.55, 44.8],
  // 8 · tonight's deck (the hold music comes back happy)
  happy: BEAT(80), h7: 44.92, h7Land: 45.26, deal: [45.36, 46.26, 47.16], flip: [48.3, 48.66], l10: 45.62, closeF: 50.45, deckOut: [50.5, 50.9], h7Out: [50.68, 50.88],
  // 9 · the last line
  lift: BEAT(91), h8: 51.28, h8Land: 51.85, on: [51.35, 51.98], wink: [52.45, 53.2], ring2: 53.85,
  out: [55.05, 55.5], h8Out: [55.2, 55.45],
}

// ── the dialogue
const CAPN = `${CAP.glyph}︎ CAPRICORN`, ARIN = `${ARI.glyph}︎ ARIES`, PISN = `${PIS.glyph}︎ PISCES`
const CAPC = '#5fe8bd', ARIC = '#ff8a5c', PISC = '#aaa4ff'
const LA = [
  { t: T.l1, speaker: CAPN, color: CAPC, text: 'thank you for calling the *stars.*' },
  { t: T.l2, speaker: CAPN, color: CAPC, text: 'how can we *help?*' },
]
const LB = [
  { t: T.l3, speaker: CAPN, color: CAPC, text: 'please *hold.*' },
  { t: T.l4, speaker: ARIN, color: ARIC, text: 'your call is *important* to us!!' },
  { t: T.l5, speaker: PISN, color: PISC, text: "hi, you've been transferred to *feelings.*" },
]
const LC = [{ t: T.l6, speaker: CAPN, color: CAPC, text: "do NOT search *'how to date.'*" }]
const LD = [
  { t: T.l7, speaker: CAPN, color: CAPC, text: "press 1 to wait until you're *'perfect.'*" },
  { t: T.l8, speaker: CAPN, color: CAPC, text: 'press 2 to start *small and honest.*' },
]
const LE = [{ t: T.l9, speaker: CAPN, color: CAPC, text: "you don't need to be healed. just *honest.*" }]
const LF = [{ t: T.l10, speaker: CAPN, color: CAPC, text: 'one card at a time. *at your pace.*' }]
export const ALL_LINES = [...LA, ...LB, ...LC, ...LD, ...LE, ...LF]
const BOXES = [[LA, T.closeA], [LB, T.closeB], [LC, T.closeC], [LD, T.closeD], [LE, T.closeE], [LF, T.closeF]]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const CAP_HOPS = talkHops(ALL_LINES, CAPN, { cps: CPS }), ARI_HOPS = talkHops(ALL_LINES, ARIN, { cps: CPS }), PIS_HOPS = talkHops(ALL_LINES, PISN, { cps: CPS })
const talking = (t, who) => ALL_LINES.some((L, i) => L.speaker === who && t >= L.t && t < LT[i].done + 0.15)

// your texts (bubbles over Capricorn's desk) and the search bar
const BUBS = [
  { t: T.b1, text: 'first time dating | since the breakup.' },
  { t: T.b2, text: "what if I'm not ready?" },
  { t: T.b3, text: 'what if I cry at dinner' },
  { t: T.b4, text: 'what if they ask about my ex' },
  { t: T.b5, text: "what if I'm rusty" },
  { t: T.search, text: 'how to da', search: true },
]
const SEARCH_GAP = 0.085

// the lesson (shared module)
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'You don’t need to be | fully healed. | Just *honest.*', chip: '+1 COURAGE', accentColor: GOLD }

// ── easing helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the world: three desks in a row (Pisces left, Capricorn middle, Aries right); the camera maps (fx, fy) → (540, 960)
const PANEL = { pis: -540, cap: 540, ari: 1620 }
const STAR_Y = 1108, STAR_S = 320, DESK_Y = 1220, DESK_H = 140
const PHONE_SKY = { x: 540, by: 895, px: 15 }, PHONE_DESK = { x: 285, by: DESK_Y + 2, px: 7 }
const MUG_DESK = { x: 862, by: DESK_Y + 2 }, MUG_SIP = { x: 606, by: 1192 }
const HEADSET_DESK = { x: 738, y: 1138, rot: 0.3, cell: 6 }
const STACK = { right: 975, bottom: 952, fadeTop: 585, gap: 12, font: 44, row: 52, pad: 30, maxW: 730 }
const CAPCAM = [1.08, 540, 985], SIDECAM = 1.2, SIDEY = 1030, PUSH = [1.2, 540, 1030]
// camera keys [t, s, fx, fy]; consecutive keys tween
const CAM = [
  [0, 1.3, 540, 770], [T.pull[0], 1.3, 540, 770], [T.pull[1], ...CAPCAM],
  [T.whip1[0], ...CAPCAM], [T.whip1[1], SIDECAM, PANEL.ari, SIDEY],
  [T.whip2[0], SIDECAM, PANEL.ari, SIDEY], [T.whip2[1], SIDECAM, PANEL.pis, SIDEY],
  [T.whip3[0], SIDECAM, PANEL.pis, SIDEY], [T.whip3[1], ...CAPCAM],
  [T.push[0], ...CAPCAM], [T.push[1], ...PUSH],
  [DROP - 0.06, ...PUSH], [DROP + 0.6, ...CAPCAM],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}
const WHIPS = [T.whip1, T.whip2, T.whip3]

// ── Aries' juggling (a shower: a high arc left → right, a low pass back), then the drop
const HANDS = [PANEL.ari - 150, PANEL.ari + 150], HAND_Y = 1050, JPER = 1.2
const PHONE_COLS = ['#ff6a5a', GOLD, BONE]
const LAND = [null, { x: PANEL.ari - 150, y: DESK_Y - 30, rot: -1.45 }, { x: PANEL.ari + 150, y: DESK_Y - 30, rot: 1.5 }]
function juggle(t, i) {
  const ph = mod(t / JPER + i / 3, 1)
  if (ph < 0.68) { const u = ph / 0.68; return { x: lerp(HANDS[0], HANDS[1], u), y: HAND_Y - 330 * 4 * u * (1 - u), rot: u * 5.6 + i * 2 } }
  const u = (ph - 0.68) / 0.32; return { x: lerp(HANDS[1], HANDS[0], u), y: HAND_Y - 80 * 4 * u * (1 - u), rot: 5.6 + u * 0.7 + i * 2 }
}

// ── the hold-music jingle: one loop on the score's chord grid (Bb · Gm · Eb · F, a bar each, anchored at the drop),
// always "playing"; you hear it while you're on hold, and every time it comes back it's sadder. [sixteenth, midi, len]
const MEL = [
  [[0, 74, 3], [3, 77, 3], [6, 82, 2], [8, 81, 2], [10, 77, 2], [12, 74, 4]],    // Bb: D F Bb A F D
  [[0, 74, 3], [3, 79, 3], [6, 82, 2], [8, 81, 2], [10, 79, 2], [12, 74, 4]],    // Gm: D G Bb A G D
  [[0, 75, 3], [3, 79, 3], [6, 82, 2], [8, 84, 2], [10, 82, 2], [12, 79, 4]],    // Eb: Eb G Bb C Bb G
  [[0, 81, 3], [3, 77, 3], [6, 72, 2], [8, 74, 2], [10, 75, 2], [12, 72, 4]],    // F: A F C D Eb C
]
const ROOT = [46, 43, 39, 41], FIFTH = [53, 50, 46, 48]
const BSCALE = [10, 0, 2, 3, 5, 7, 9]               // Bb major
const hz = m => 440 * 2 ** ((m - 69) / 12)
const third = m => { for (let d = 3; d <= 4; d++) if (BSCALE.includes(mod(m - d, 12))) return m - d; return m - 3 }
function loopNotes(t0, t1, pat, fn) {
  const out = [], b0 = Math.floor((t0 - DROP) / BAR) - 1, b1 = Math.ceil((t1 - DROP) / BAR) + 1
  for (let b = b0; b <= b1; b++) {
    const bt = DROP + b * BAR, c = mod(b, 4)
    for (const [s, m, len] of pat(c)) { const t = bt + s * S16; if (t >= t0 - 1e-6 && t < t1 - 1e-6) out.push(...fn(r3(t), m, len * S16, c, s)) }
  }
  return out
}
const melody = c => MEL[c]
const bassPat = c => [[0, ROOT[c], 5], [6, FIFTH[c], 2], [8, ROOT[c], 5], [14, FIFTH[c], 2]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 38px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 440), FACE = bake(faceIm, 600)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'You’ve reached | the *stars.* | Please hold.', { top: 132, size: 92, accentSize: 132, at: T.h0, late: 2, lateAt: T.h0Late, lateGap: 0.12, wobble: true, gap: 0.08, accentColor: GOLD, lineHeight: 1.02 })
  const H1 = popText(root, 'Caller ID: | *you.*', { top: 150, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H2 = popText(root, 'Estimated wait: | *2 minutes.*', { top: 150, size: 100, accentSize: 146, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H3 = popText(root, 'Estimated wait: | *2 hours.*', { top: 150, size: 100, accentSize: 146, at: T.h3, late: 2, lateAt: T.h3Land, lateGap: 0.12, wobble: true, accentColor: LAV, lineHeight: 1.0 })
  const H4 = popText(root, 'Estimated wait: | *forever.*', { top: 150, size: 100, accentSize: 156, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: SKYB, lineHeight: 1.0 })
  const H5 = popText(root, 'Our options | have *changed.*', { top: 150, size: 108, accentSize: 156, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CAPC, lineHeight: 1.0 })
  const H6 = popText(root, 'Now | *connecting.*', { top: 150, size: 108, accentSize: 168, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: MINT, lineHeight: 0.98 })
  const H7 = popText(root, 'Tonight’s *deck.*', { top: 190, size: 116, accentSize: 170, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: LAV })
  const H8 = popText(root, 'Thanks for calling. | You’re *ready* enough.', { top: 150, size: 88, accentSize: 132, at: T.h8, late: 2, lateAt: T.h8Land, lateGap: 0.14, wobble: true, gap: 0.08, accentColor: GOLD, lineHeight: 1.06, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1468, width: 960, height: 272, close, cps: CPS }))

  // ── LESSON UNLOCKED (shared): after the scene layers, before grain + the card-cut layers
  const lesson = buildLesson(root, LESSON)

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ═══════════════════════ helpers ═══════════════════════
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawStar(px, py, size, t, opts, extra) {
    drawStarChar(x, px, py, size, t, opts)
    if (!extra) return
    const F = starFrame(px, py, size, t, opts)
    extra(F)
  }
  /** pop text burst (RING! / PFFT!) */
  function burstText(t, t0, txt, cx, cy, size, col, rot = 0, life = 0.55) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 3), a = 1 - prog(k, life * 0.6, life)
    x.save(); x.globalAlpha *= a; x.translate(cx, cy - k * 30); x.rotate(rot); x.scale(p, p)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.22; x.strokeStyle = INK; x.strokeText(txt, 0, 0); x.fillStyle = col; x.fillText(txt, 0, 0)
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ═══════════════════════ your texts ═══════════════════════
  x.font = `700 ${STACK.font}px ${INTER}`
  const wrap = (txt, maxW) => { const words = txt.split(' '), rows = []; let cur = ''; for (const w of words) { if (w === '|') { rows.push(cur); cur = ''; continue } const tryS = cur ? cur + ' ' + w : w; if (x.measureText(tryS).width > maxW && cur) { rows.push(cur); cur = w } else cur = tryS } rows.push(cur); return rows }
  const BLAY = BUBS.map(b => { const rows = b.search ? [b.text + '|'] : wrap(b.text, STACK.maxW - 56); const tw = Math.max(...rows.map(r => x.measureText(r).width)); return { ...b, rows, w: Math.max(b.search ? 420 : 0, tw + 56 + (b.search ? 70 : 0)), h: rows.length * STACK.row + STACK.pad } })
  function searchTyped(t) { return BUBS[5].text.slice(0, clamp(Math.floor((t - T.search) / SEARCH_GAP) + 1, 0, BUBS[5].text.length)) }
  function drawBubbles(t) {
    const vis = BLAY.filter(b => t >= b.t)
    if (!vis.length || t >= T.dimB[1]) return
    // the turn: your worries fade back while Capricorn talks to you
    const dim = 1 - ease.inOutQuad(prog(t, ...T.dimB))
    let yb = STACK.bottom
    const n = vis.length
    for (let k = n - 1; k >= 0; k--) {
      const b = vis[k]
      // newer bubbles push this one up as they arrive
      let lift = 0
      for (let j = k + 1; j < n; j++) lift += (BLAY[BLAY.indexOf(vis[j])].h + STACK.gap) * easeOutBack(prog(t, vis[j].t, vis[j].t + 0.3), 1.5)
      const bot = STACK.bottom - lift, top = bot - b.h
      yb = top
      if (top < STACK.fadeTop - 80) continue
      let a = clamp((top - STACK.fadeTop) / 50 + 1) * dim
      let sc = easeOutBack(prog(t, b.t, b.t + 0.3), 2.2)
      // the search bar: stamped NOPE, then crumpled away
      let rot = 0, dy = 0
      if (b.search) {
        const c = prog(t, ...T.crumple)
        if (c >= 1) continue
        sc *= 1 - 0.85 * ease.inCubic(c); rot = 0.9 * ease.inQuad(c); dy = 260 * ease.inQuad(c); a *= 1 - c * 0.4
      }
      if (a <= 0.01 || sc <= 0.01) continue
      const bx = STACK.right - b.w, cxB = STACK.right - b.w / 2, cyB = (top + bot) / 2
      x.save(); x.globalAlpha *= a; x.translate(cxB, cyB + dy); x.rotate(rot); x.scale(sc, sc); x.translate(-cxB, -cyB)
      if (b.search) {
        rr(bx - 5, top - 5, b.w + 10, b.h + 10, b.h / 2 + 5); x.fillStyle = INK; x.fill()
        rr(bx, top, b.w, b.h, b.h / 2); x.fillStyle = '#fbf7ee'; x.fill()
        // magnifier
        const mx = bx + 42, my = top + b.h / 2
        x.strokeStyle = '#5d6288'; x.lineWidth = 6; x.beginPath(); x.arc(mx - 4, my - 4, 12, 0, Math.PI * 2); x.stroke()
        x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(mx + 5, my + 5); x.lineTo(mx + 15, my + 15); x.stroke()
        const typed = searchTyped(t)
        x.font = `600 ${STACK.font}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
        x.fillText(typed, bx + 78, my + 2)
        if (Math.floor(t * 3) % 2 === 0 || t < T.search + 0.9) { const tw = x.measureText(typed).width; x.fillStyle = '#ff5c8e'; x.fillRect(bx + 82 + tw, my - 24, 5, 48) }
        // NOPE
        const sk = prog(t, T.stamp, T.stamp + 0.16)
        if (sk > 0) drawStamp(x, cxB + 6, cyB + 2, lerp(2.6, 1.15, ease.outCubic(sk)) * (1 + 0.08 * bump(t, T.stamp + 0.16, 0.18)), -0.13, 'NOPE', RED)
      } else {
        // a sent text: pink bubble, tail bottom-right
        x.fillStyle = INK; rr(bx - 5, top - 5, b.w + 10, b.h + 10, 34); x.fill()
        x.beginPath(); x.moveTo(STACK.right - 30, bot - 6); x.lineTo(STACK.right + 20, bot + 12); x.lineTo(STACK.right - 4, bot - 34); x.fill()
        const g = x.createLinearGradient(bx, top, STACK.right, bot); g.addColorStop(0, '#ffb3cb'); g.addColorStop(1, '#ff8fb1')
        x.fillStyle = g; rr(bx, top, b.w, b.h, 30); x.fill()
        x.beginPath(); x.moveTo(STACK.right - 28, bot - 10); x.lineTo(STACK.right + 10, bot + 4); x.lineTo(STACK.right - 8, bot - 30); x.fill()
        x.fillStyle = 'rgba(255,255,255,0.35)'; rr(bx + 14, top + 7, b.w - 28, 9, 5); x.fill()
        x.font = `700 ${STACK.font}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = INK
        b.rows.forEach((row, i) => x.fillText(row, bx + 28, top + STACK.pad / 2 + STACK.font * 0.98 + i * STACK.row))
      }
      x.restore()
    }
    void yb
  }

  // ═══════════════════════ Capricorn ═══════════════════════
  function capState(t) {
    let mood = 'neutral', look = [0, 0], blink, squash = 0, sweat = false
    if (t < T.answer) { blink = 0.55; look = [0, -1] }
    else if (t < T.l1) { blink = 0.55; look = [0, 0]; squash = 0.06 * bump(t, T.answer, 0.25) }
    else if (t < T.b1 + 0.2) { blink = 0.55 }
    else if (t < T.b2 + 0.3) { look = [1, -1]; blink = 0.3 }
    else if (t < T.panic[1]) { mood = 'wide'; look = t < T.b2 + 0.9 ? [1, -1] : [0, 0]; blink = false; sweat = t > T.panic[0] }
    else if (t < T.whip1[1]) { mood = 'happy'; sweat = t < T.l3 + 0.6 }
    else if (t < T.peek) { mood = 'happy' }                                         // on break: sipping, eyes shut
    else if (t < T.dbl) { mood = 'wink'; look = [1, -1] }                           // one eye opens
    else if (t < T.snap) { mood = 'neutral'; look = [-1, 0]; blink = false }        // looks away…
    else if (t < T.spit) { mood = 'wide'; look = [1, -1]; blink = false }           // …double-take
    else if (t < T.l6) { mood = 'wide'; look = [1, -1]; blink = false; squash = -0.1 * bump(t, T.spit, 0.3) }
    else if (t < T.closeC) { mood = 'squint'; look = [1, -1] }
    else if (t < T.off[0] + 0.5) { mood = 'neutral'; look = [0, -1] }
    else if (t < T.hover1[0]) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.move2[0] + 0.1) { mood = 'wide'; look = [-1, -1]; blink = false }
    else if (t < DROP) { mood = 'sparkle'; look = [0, -1] }
    else if (t < T.l9) { mood = 'happy' }
    else if (t < T.lesson) { mood = 'sparkle'; look = [0, 0] }
    else if (t < T.happy) { mood = 'sparkle' }
    else if (t < T.deckOut[0]) { mood = t < T.flip[0] ? 'sparkle' : 'heart'; look = [0, -1] }
    else if (t < T.wink[0]) { mood = 'happy' }
    else if (t < T.wink[1]) { mood = 'wink'; look = [0, 0] }
    else if (t < T.ring2) { mood = 'happy' }
    else if (t < T.ring2 + 0.75) { mood = 'wide'; look = [-1, 1]; blink = false }
    else { mood = 'sparkle'; look = [0, 0] }
    return { mood, look, blink, squash, sweat }
  }
  const CAP_EXTRA_HOPS = [T.answer, DROP, DROP + 2 * BL, T.ring2 + 0.75]
  function headsetState(t) {        // where the headset is: on the head, flying, on the desk
    if (t < T.off[0]) return { on: true }
    if (t < T.off[1]) return { fly: prog(t, ...T.off), from: 'head', at: T.off[0] }
    if (t < T.on[0]) return { desk: true }
    if (t < T.on[1]) return { fly: 1 - prog(t, ...T.on), from: 'head', at: T.on[1] }
    return { on: true }
  }
  function drawCapricorn(t, k) {
    const st = capState(t), hs = headsetState(t)
    const opts = { color: CAP.color, glyph: CAP.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: [...CAP_HOPS, ...CAP_EXTRA_HOPS], seed: 5, pop: k, glow: 0.95 }
    drawStar(PANEL.cap, STAR_Y, STAR_S, t, opts, F => {
      if (hs.on) inSprite(x, F, () => headsetCells(x, CAP.color))
      if (st.sweat) inSprite(x, F, () => sweatCells(x, t))
    })
    // the headset in flight (off → the desk / the desk → back on)
    if (hs.fly !== undefined) {
      const F0 = starFrame(PANEL.cap, STAR_Y, STAR_S, hs.at, { hops: [...CAP_HOPS, ...CAP_EXTRA_HOPS], seed: 5 })
      const [hx, hy] = cellToWorld(F0, 17.5, 12)
      const u = ease.inOutCubic(hs.fly)
      const px = lerp(hx, HEADSET_DESK.x, u), py = lerp(hy, HEADSET_DESK.y, u) - Math.sin(Math.PI * u) * 120
      headsetWorld(x, px, py, lerp(0, HEADSET_DESK.rot, u), lerp(F0.cell, HEADSET_DESK.cell, u), CAP.color)
    }
  }

  // ═══════════════════════ the desk phone (the hook phone, in the sky → on the desk) ═══════════════════════
  function phonePose(t) {
    if (t < T.land[0]) return { ...PHONE_SKY }
    const p = prog(t, ...T.land), e = ease.inOutCubic(p)
    const land = p >= 1 ? 0 : 0
    const by = lerp(PHONE_SKY.by, PHONE_DESK.by, e) - Math.sin(Math.PI * Math.min(1, p * 1.1)) * 70 + land
    return { x: lerp(PHONE_SKY.x, PHONE_DESK.x, e), by, px: lerp(PHONE_SKY.px, PHONE_DESK.px, e) }
  }
  function drawPhone(t) {
    const P = phonePose(t)
    let ring = 0
    for (const r0 of T.rings) if (inR(t, r0, r0 + 0.38)) ring = 1
    if (inR(t, T.ring2, T.ring2 + 0.38) || inR(t, T.ring2 + 0.5, T.ring2 + 0.88)) ring = 1
    const onHold = inR(t, T.click, DROP)
    const light = t < T.answer ? 'blink' : onHold ? 'blink' : t >= T.ring2 && t < T.ring2 + 1 ? 'blink' : 'green'
    const k = t < 0.25 ? easeOutBack(prog(t, 0.02, 0.3), 1.8) : 1
    if (k <= 0.01) return
    x.save(); x.translate(P.x, P.by); x.scale(k, k); x.translate(-P.x, -P.by)
    const lp = Math.max(1, P.px)
    drawDeskPhone(x, P.x, P.by + (t >= T.land[1] ? 2 * bump(t, T.land[1], 0.18) : 0), lp, t, { ring, light, jolt: t >= T.land[1] ? bump(t, T.land[1], 0.22) : 0 })
    x.restore()
    // RING! (hook + the next caller)
    if (ring > 0) ringWaves(x, P.x, P.by - 9 * P.px, 18 * P.px, t, 1, BONE, P.px / 12)
    T.rings.forEach((r0, i) => burstText(t, r0, 'RING!', i % 2 ? 790 : 296, 600 - (i === 2 ? 30 : 0), 62, GOLD, i % 2 ? 0.16 : -0.16, 0.5))
    burstText(t, T.ring2, 'RING!', 300, 1010, 54, GOLD, -0.14, 0.5)
    burstText(t, T.ring2 + 0.5, 'RING!', 330, 960, 54, GOLD, 0.12, 0.5)
  }

  // ═══════════════════════ the mug (on the desk; floats up to sip; the spit-take) ═══════════════════════
  function mugPose(t) {
    if (t < T.sip || t >= T.spit + 0.95) return { ...MUG_DESK, tilt: 0, steam: 1 }
    if (t < T.spit) {
      const u = ease.outCubic(prog(t, T.sip, T.sip + 0.5))
      const sipT = -0.42 - 0.24 * Math.sin((t - T.sip) * 4.2)
      return { x: lerp(MUG_DESK.x, MUG_SIP.x, u), by: lerp(MUG_DESK.by, MUG_SIP.by, u) - Math.sin(Math.PI * u) * 40, tilt: lerp(0, t < T.peek ? sipT : -0.2, u), steam: 1 - u * 0.6 }
    }
    const k = t - T.spit
    if (k < 0.32) return { x: MUG_SIP.x + 8 * Math.sin(k * 90), by: MUG_SIP.by - 40 * Math.sin(Math.PI * Math.min(1, k / 0.32)), tilt: -1.15, steam: 0 }
    const u = ease.inOutCubic(prog(k, 0.32, 0.95))
    return { x: lerp(MUG_SIP.x, MUG_DESK.x, u), by: lerp(MUG_SIP.by, MUG_DESK.by, u) - Math.sin(Math.PI * u) * 50, tilt: lerp(-1.15, 0, u), steam: 0 }
  }
  function drawSpray(t) {
    const k = t - T.spit
    if (k < 0 || k > 0.9) return
    const r = rng(41)
    for (let i = 0; i < 26; i++) {
      const d = r() * 0.12, kk = k - d
      if (kk < 0) continue
      const vx = 420 + r() * 620, vy = -(380 + r() * 620), gr = 2100
      const px = MUG_SIP.x - 30 + vx * kk, py = MUG_SIP.by - 70 + vy * kk + 0.5 * gr * kk * kk
      const sz = 9 + Math.round(r() * 2) * 4
      x.globalAlpha = 1 - prog(kk, 0.5, 0.75)
      x.fillStyle = INK; x.fillRect(px - 3, py - 3, sz + 6, sz + 6)
      x.fillStyle = i % 3 ? '#8a5230' : '#c48a50'; x.fillRect(px, py, sz, sz)
    }
    x.globalAlpha = 1
  }

  // ═══════════════════════ Aries ═══════════════════════
  function phoneAt(t, i) {          // a juggled handset: pattern, then the drop at T.stop[i]
    const s = T.stop[i]
    if (t < s) return { ...juggle(t, i), ring: Math.floor((t + i * 0.37) / 0.55) % 3 === 0 ? 1 : 0, live: true }
    const j = juggle(s, i)
    if (i === 0) {                 // onto Aries' head
      const p = prog(t, s, T.bonk)
      if (p < 1) return { x: lerp(j.x, PANEL.ari, p), y: lerp(j.y, 960, ease.inQuad(p)), rot: lerp(j.rot, 0.1, p), ring: 0 }
      return { head: true }
    }
    const L = LAND[i], te = s + (i === 1 ? 0.35 : 0.42), p = prog(t, s, te)
    if (p < 1) return { x: lerp(j.x, L.x, p), y: lerp(j.y, L.y, ease.inQuad(p)), rot: lerp(j.rot, L.rot + 6.28, p), ring: 0 }
    return { x: L.x, y: L.y - 6 * bump(t, te, 0.2), rot: L.rot, ring: t > te + 0.6 && Math.floor(t * 1.4 + i) % 2 === 0 ? 0.6 : 0 }
  }
  function ariState(t) {
    let mood = 'wide', look = [0, -1], squash = 0.05 * Math.sin(t * 19), blink, dizzy = false, sweat = true
    if (talking(t, ARIN)) { look = [0, 0] }
    if (t >= T.stop[0]) { look = [0, -1]; squash = 0 }
    if (t >= T.bonk) { mood = 'squint'; look = [0, 0]; dizzy = true; sweat = false; squash = 0.24 * Math.exp(-(t - T.bonk) * 7) * Math.cos((t - T.bonk) * 26) }
    if (t >= T.join[0]) { mood = 'happy'; dizzy = false; squash = 0 }
    if (t >= T.lesson) { mood = 'sparkle'; look = [0, 0] }
    if (t >= T.happy) { mood = t >= T.flip[0] ? 'heart' : 'sparkle'; look = [-1, -1] }
    if (t >= T.deckOut[0]) { mood = 'happy'; look = [0, 0] }
    if (t >= T.ring2 && t < T.ring2 + 0.75) { mood = 'wide'; look = [-1, 1]; blink = false }
    return { mood, look, squash, blink, dizzy, sweat }
  }
  const JOIN_HOPS = [T.join[0], T.join[0] + 0.32, T.join[0] + 0.64, DROP + 3 * BL, DROP + 5 * BL, DROP + 7 * BL]
  function ariPose(t) {
    if (t < T.join[0]) return { x: PANEL.ari, y: STAR_Y, s: STAR_S, home: true }
    const u = ease.outCubic(prog(t, T.join[0], T.join[1]))
    return { x: lerp(1180, 896, u), y: 1052, s: 210, home: false }
  }
  function drawAries(t, k) {
    const P = ariPose(t), st = ariState(t)
    const opts = { color: ARI.color, glyph: ARI.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: P.home ? ARI_HOPS : JOIN_HOPS, seed: 9, pop: k, glow: 0.9 }
    drawStar(P.x, P.y, P.s, t, opts, F => {
      if (st.sweat) inSprite(x, F, () => sweatCells(x, t * 1.4))
      if (st.dizzy) inSprite(x, F, () => dizzyCells(x, t))
      // the handset that landed on its head stays there (even when it hops over to Capricorn's desk)
      if (t >= T.bonk) { const [hx, hy] = cellToWorld(F, 18, 1.4); drawSmartphone(x, hx, hy - F.cell * 1.2, F.cell * 0.7, 1.45 + 0.06 * Math.sin(t * 2), PHONE_COLS[0]) }
    })
  }
  function drawAriesPanel(t) {
    const P = ariPose(t)
    if (P.home) drawAries(t, 1)
    drawDesk(x, PANEL.ari - 390, PANEL.ari + 390, DESK_Y, DESK_H, { label: `${ARI.glyph}︎ ARIES · ALL LINES`, color: '#ffb07a' })
    for (let i = 0; i < 3; i++) {
      const p = phoneAt(t, i)
      if (p.head) continue
      if (!p.live && t > T.join[0]) continue
      drawSmartphone(x, p.x, p.y, 7, p.rot, PHONE_COLS[i], { ring: p.ring, t })
    }
  }

  // ═══════════════════════ Pisces ═══════════════════════
  function pisPose(t) {
    if (t < T.float[0]) return { x: PANEL.pis, y: STAR_Y, s: STAR_S, r: 0, home: true }
    if (t < T.float[1]) { const u = ease.inOutQuad(prog(t, ...T.float)); return { x: lerp(PANEL.pis, -270, u), y: lerp(STAR_Y, 700, u), s: lerp(STAR_S, 250, u), r: 0.14 * Math.sin(t * 2.3) * u } }
    const BG = { x: 158 + 14 * Math.sin(t * 0.9), y: 650 + 20 * Math.sin(t * 1.3), s: 168, r: 0.1 * Math.sin(t * 1.1) }
    if (t < 21.4) { const u = ease.outCubic(prog(t, T.float[1], 21.4)); return { x: lerp(-270, BG.x, u), y: lerp(700, BG.y, u), s: lerp(250, BG.s, u), r: BG.r } }
    if (t < T.join[0]) return BG
    const u = ease.inOutCubic(prog(t, T.join[0], T.join[1]))
    return { x: lerp(BG.x, 186, u), y: lerp(BG.y, 1052, u), s: lerp(BG.s, 210, u), r: BG.r * (1 - u) }
  }
  function pisState(t) {
    let mood = 'sparkle', look = [1, 0], tears = 2, squash = 0, blink
    if (talking(t, PISN)) look = [0, 0]
    if (t >= T.sob) { tears = 3; squash = 0.07 * Math.sin(t * 24) * (1 - prog(t, T.float[0], T.float[0] + 1)) }
    if (t >= T.float[1]) { tears = 2; look = [1, 1] }
    if (t >= T.b4 && t < T.b4 + 1.4) { mood = 'wide'; look = [1, 0] }                  // "…ask about my ex": a gasp
    if (t >= T.join[0]) { mood = 'happy'; tears = 2; look = [0, 0] }
    if (t >= T.lesson) { mood = 'sparkle'; tears = 1 }
    if (t >= T.happy) { mood = t >= T.flip[0] ? 'heart' : 'sparkle'; look = [1, -1]; tears = t >= T.flip[0] ? 3 : 1 }
    if (t >= T.deckOut[0]) { mood = 'happy'; tears = 2; look = [0, 0] }
    if (t >= T.ring2 && t < T.ring2 + 0.75) { mood = 'wide'; look = [1, 1]; blink = false; tears = 0 }
    return { mood, look, tears, squash, blink }
  }
  function drawPisces(t, k) {
    const P = pisPose(t), st = pisState(t)
    const hops = P.home ? PIS_HOPS : JOIN_HOPS.map(h => h + 0.1)
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops, seed: 13, pop: k, glow: 0.9, bob: P.home ? undefined : 0 }
    x.save(); x.translate(P.x, P.y); x.rotate(P.r)
    drawStar(0, 0, P.s, t, opts, F => { if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears)) })
    x.restore()
  }
  function drawPiscesPanel(t) {
    const P = pisPose(t)
    if (P.home || t < T.float[0] + 0.6) drawPisces(t, 1)
    drawDesk(x, PANEL.pis - 390, PANEL.pis + 390, DESK_Y, DESK_H, { label: `${PIS.glyph}︎ FEELINGS DEPT.`, color: '#b9b2ff' })
    drawTissueBox(x, PANEL.pis + 250, DESK_Y + 2, 7, t)
  }

  // ═══════════════════════ the "♪ HOLD MUSIC" bug (screen space) ═══════════════════════
  const PILL = [
    [T.click, '♪ HOLD MUSIC', GOLD, 1], [T.transfer, '♪ HOLD MUSIC (SAD)', LAV, 0.5], [T.sad3, '♪ HOLD MUSIC (SLOWED + SAD)', SKYB, 0.18],
    [T.spit, null], [T.happy - 0.1, '♪ HOLD MUSIC (HAPPY!)', MINT, 1.25], [T.deckOut[1], null],
  ]
  function drawPill(t) {
    let cur = null
    for (const p of PILL) if (t >= p[0]) cur = p
    if (!cur || !cur[1]) {
      // the hold music dies: the bug sags and blinks out
      if (t >= T.die[0] && t < T.spit + 0.35) cur = PILL[2]
      else return
    }
    const [t0, txt, col, en] = cur
    const k = pop01(t, t0, 0.32, 2.4)
    const dying = t >= T.die[0] && t < T.spit + 0.35 ? prog(t, T.die[0], T.spit + 0.35) : 0
    if (dying > 0 && Math.floor(t * 18) % 3 === 0) return
    const cx = 540, cy = 480
    x.save(); x.translate(cx, cy + dying * 30); x.rotate(dying * 0.18); x.scale(k * (1 - dying * 0.3), k * (1 - dying * 0.3)); x.globalAlpha = 1 - dying * 0.6
    x.font = `700 34px ${MONO}`
    const tw = x.measureText(txt).width, w = tw + 136, h = 64
    x.fillStyle = INK; rr(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10, 14); x.fill()
    x.fillStyle = 'rgba(16,9,38,0.96)'; rr(-w / 2, -h / 2, w, h, 10); x.fill()
    x.strokeStyle = rgba(col, 0.9); x.lineWidth = 3; rr(-w / 2 + 4, -h / 2 + 4, w - 8, h - 8, 8); x.stroke()
    x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = col
    x.fillText(txt, -w / 2 + 26, 2)
    // equaliser: bouncy when happy, barely breathing when sad
    for (let i = 0; i < 4; i++) {
      const v = en * (0.35 + 0.65 * Math.abs(Math.sin(t * (6 + i * 1.7) * Math.min(1.2, en + 0.2) + i * 1.3)))
      const bh = Math.max(4, Math.round(30 * clamp(v, 0, 1.2) / 4) * 4)
      x.fillStyle = col; x.fillRect(w / 2 - 98 + i * 18, 17 - bh, 12, bh)
    }
    x.restore()
  }

  // ═══════════════════════ the keypad + your finger (screen space) ═══════════════════════
  const KP = { x: 540, y: 672, kw: 100, kh: 72, gx: 14, gy: 13 }
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'], SUB = { 2: 'ABC', 3: 'DEF', 4: 'GHI', 5: 'JKL', 6: 'MNO', 7: 'PQRS', 8: 'TUV', 9: 'WXYZ' }
  const keyPos = i => { const c = i % 3, r = Math.floor(i / 3); return [KP.x + (c - 1) * (KP.kw + KP.gx), KP.y - 1.5 * (KP.kh + KP.gy) + r * (KP.kh + KP.gy)] }
  function fingerPos(t) {
    const [k1x, k1y] = keyPos(0), [k2x, k2y] = keyPos(1)
    const enter = ease.outCubic(prog(t, ...T.finger)), tip1 = [k1x + 4, k1y + 10], tip2 = [k2x + 4, k2y + 10]
    let p = [lerp(1000, tip1[0], enter), lerp(1350, tip1[1], enter)]
    if (t >= T.hover1[0]) p = [tip1[0] + 6 * Math.sin((t - T.hover1[0]) * 13), tip1[1] - 10 * Math.abs(Math.sin((t - T.hover1[0]) * 4))]
    if (t >= T.move2[0]) { const u = ease.inOutCubic(prog(t, ...T.move2)); p = [lerp(tip1[0], tip2[0], u), lerp(tip1[1], tip2[1], u) - Math.sin(Math.PI * u) * 40] }
    if (t >= T.move2[1]) p = [tip2[0], tip2[1] - 14 * Math.sin(Math.PI * prog(t, T.move2[1], T.tap[0]))]
    let press = 0
    if (t >= T.tap[0]) press = ease.inQuad(prog(t, ...T.tap)) * (1 - prog(t, DROP + 0.25, DROP + 0.45))
    if (t >= T.fingerOut[0]) { const u = ease.inCubic(prog(t, ...T.fingerOut)); p = [lerp(tip2[0], 1050, u), lerp(tip2[1], 1400, u)] }
    return { x: p[0], y: p[1] + press * 14, press }
  }
  function drawKeypad(t) {
    const kin = pop01(t, T.keypad[0], 0.35, 2) * (1 - ease.inCubic(prog(t, ...T.padOut)))
    if (kin <= 0.01) return
    const pw = 3 * KP.kw + 2 * KP.gx + 48, ph = 4 * KP.kh + 3 * KP.gy + 48
    x.save(); x.translate(KP.x, KP.y); x.scale(kin, kin); x.translate(-KP.x, -KP.y)
    // panel
    x.fillStyle = INK; rr(KP.x - pw / 2 - 7, KP.y - ph / 2 - 7, pw + 14, ph + 14, 30); x.fill()
    x.fillStyle = 'rgba(22,13,48,0.97)'; rr(KP.x - pw / 2, KP.y - ph / 2, pw, ph, 24); x.fill()
    x.strokeStyle = GOLD; x.lineWidth = 5; rr(KP.x - pw / 2 + 6, KP.y - ph / 2 + 6, pw - 12, ph - 12, 19); x.stroke()
    const pressed = t >= DROP - 0.02, hover1 = inR(t, T.hover1[0], T.move2[0] + 0.1)
    KEYS.forEach((lab, i) => {
      const [kx, ky] = keyPos(i), lit = i < 2
      const dn = i === 1 ? ease.inQuad(prog(t, ...T.tap)) * (1 - prog(t, DROP + 0.25, DROP + 0.45)) * 7 : 0
      x.globalAlpha = lit ? 1 : 0.42
      x.fillStyle = INK; rr(kx - KP.kw / 2 - 4, ky - KP.kh / 2 - 4, KP.kw + 8, KP.kh + 8, 14); x.fill()
      let face = lit ? '#fbf3e2' : '#b9b0c8'
      if (i === 0 && hover1) face = '#ffd0d6'
      if (i === 1 && pressed) face = MINT
      x.fillStyle = 'rgba(0,0,0,0.35)'; rr(kx - KP.kw / 2, ky - KP.kh / 2 + 6, KP.kw, KP.kh, 11); x.fill()
      x.fillStyle = face; rr(kx - KP.kw / 2, ky - KP.kh / 2 + dn, KP.kw, KP.kh - 4, 11); x.fill()
      if (lit) { x.strokeStyle = i === 0 && hover1 ? RED : GOLD; x.lineWidth = 4; rr(kx - KP.kw / 2 - 1, ky - KP.kh / 2 + dn - 1, KP.kw + 2, KP.kh - 2, 12); x.stroke() }
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = `800 ${SUB[lab] ? 38 : 40}px ${INTER}`; x.fillText(lab, kx, ky - (SUB[lab] ? 8 : 0) + dn)
      if (SUB[lab]) { x.font = `700 15px ${MONO}`; x.fillText(SUB[lab], kx, ky + 20 + dn) }
    })
    x.globalAlpha = 1
    x.restore()
    if (pressed) sparkleRing(t, keyPos(1)[0], keyPos(1)[1], DROP, 12, 170, 1, [MINT, GOLD, BONE, PINK], 0.75, 30)
    // the finger
    if (t >= T.finger[0] && t < T.fingerOut[1]) { const F = fingerPos(t); drawFinger(x, F.x, F.y, 9, F.press) }
  }

  // ═══════════════════════ tonight's deck (screen space) ═══════════════════════
  const DECK = [{ x: 292, y: 742, r: -0.1 }, { x: 540, y: 716, r: 0 }, { x: 788, y: 742, r: 0.1 }], CARD_W = 214
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] || t > T.deckOut[1]) return
    const o = prog(t, ...T.deckOut)
    DECK.forEach((D, i) => {
      const t0 = T.deal[i], p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.6)
      const cx = lerp(540 + (i - 1) * 60, D.x, e), cy = lerp(-260, D.y, e) - ease.inCubic(o) * 1400, rot = lerp(2.6 + i, D.r, ease.outCubic(p))
      if (i === 1) {
        const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
        const wB = CARD_W * (1 + 0.1 * clamp(f * 2))
        if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy, wB, rot, sx)
        else drawCardImg(FACE, FACE_BODY, cx, cy, wB, rot, -sx)
        if (f > 0.4) sparkleRing(t, cx, cy, T.flip[0] + 0.2, 12, 230, 2)
      } else drawCardImg(BACK, BACK_BODY, cx, cy, CARD_W, rot)
      sparkleRing(t, D.x, D.y, t0 + 0.32, 8, 150, i, [GOLD, BONE, LAV, MINT], 0.55, 22)
    })
  }

  // ═══════════════════════ the turn: a warm spotlight on Capricorn, the rest of the sky dims (screen space) ═══════════════════════
  function spotlight(t, C) {
    const k = ease.inOutQuad(prog(t, T.off[0] - 0.1, T.off[1])) * (1 - ease.inQuad(prog(t, DROP - 0.04, DROP + 0.3)))
    if (k <= 0) return
    const cx = 540 + (PANEL.cap - C.fx) * C.s, cy = 960 + (STAR_Y - C.fy) * C.s
    const g = x.createRadialGradient(cx, cy, 160 * C.s, cx, cy, 980)
    g.addColorStop(0, 'rgba(6,4,16,0)'); g.addColorStop(1, `rgba(6,4,16,${0.62 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    // the light cone from above
    x.save(); x.globalCompositeOperation = 'lighter'
    const cg = x.createLinearGradient(0, 0, 0, cy + 200)
    cg.addColorStop(0, `rgba(255,214,140,${0.0})`); cg.addColorStop(0.55, `rgba(255,214,140,${0.06 * k})`); cg.addColorStop(1, `rgba(255,214,140,${0.13 * k})`)
    x.fillStyle = cg; x.beginPath(); x.moveTo(cx - 90, 0); x.lineTo(cx + 90, 0); x.lineTo(cx + 330, cy + 200); x.lineTo(cx - 330, cy + 200); x.closePath(); x.fill()
    x.restore()
  }

  // ═══════════════════════ whip streaks (screen space) ═══════════════════════
  function whipStreaks(t) {
    for (const [a, b] of WHIPS) {
      const p = prog(t, a, b)
      if (p <= 0 || p >= 1) continue
      const k = Math.sin(Math.PI * p), r = rng(Math.floor(a * 100))
      x.save(); x.globalAlpha = 0.5 * k; x.fillStyle = BONE
      for (let i = 0; i < 22; i++) { const yy = 300 + r() * 1300, len = 200 + r() * 700, xx = (r() * 1600 - 300 + t * 9000 * (r() > 0.5 ? 1 : -1)) % 1500 - 200; x.fillRect(xx, yy, len, 3 + Math.round(r() * 3)) }
      x.restore()
    }
  }

  // ═══════════════════════ the world ═══════════════════════
  function drawWorld(t, C, outP) {
    x.save(); x.translate(540, 960); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
    const vis = px => Math.abs(px - C.fx) < 540 / C.s + 560
    // Pisces' desk (left)
    if (vis(PANEL.pis)) drawPiscesPanel(t)
    // Pisces floating away (any panel, behind everything else): off its desk, over to Capricorn's, still crying
    { const P = pisPose(t); if (!P.home && t >= T.float[0] + 0.6 && t < T.join[0]) drawPisces(t, outP) }
    // Aries' desk (right)
    if (vis(PANEL.ari)) drawAriesPanel(t)
    // Capricorn's desk (middle)
    if (vis(PANEL.cap)) {
      const k = outP
      drawCapricorn(t, k)
      x.save(); x.translate(540, DESK_Y + DESK_H); x.scale(k, k); x.translate(-540, -(DESK_Y + DESK_H))
      drawDesk(x, 150, 930, DESK_Y, DESK_H, { label: '★ COSMIC CUSTOMER SERVICE ★', color: GOLD })
      x.restore()
      if (k > 0.02) {
        const hs = headsetState(t)
        if (hs.desk) headsetWorld(x, HEADSET_DESK.x, HEADSET_DESK.y, HEADSET_DESK.rot, HEADSET_DESK.cell, CAP.color, k)
        const M = mugPose(t)
        x.save(); x.globalAlpha *= k; drawMug(x, M.x, M.by, 7, { t, steam: M.steam, tilt: M.tilt }); x.restore()
        drawSpray(t)
        burstText(t, T.spit + 0.02, 'PFFT!', 300, 1010, 76, '#e7b27a', -0.12, 0.75)
      }
      if (t >= T.join[0]) { drawPisces(t, k); drawAries(t, k) }
      if (k > 0.02) { x.save(); x.translate(PHONE_DESK.x, PHONE_DESK.by); x.scale(k, k); x.translate(-PHONE_DESK.x, -PHONE_DESK.by); drawPhone(t); x.restore() }
      drawBubbles(t)
      // the press: confetti from the desk
      confetti(x, t, DROP + 0.05, { x0: 540, y0: 1230, n: 70, seed: 4, spread: 1.1 })
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      drawSky(x, t, { ...SKY_H, dx: -(C.fx - 540) * 0.12, dy: -(C.fy - 960) * 0.1, zoom: SKY_H.zoom * (1 + (C.s - 1) * 0.12) })
      const outP = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        drawWorld(t, C, outP)
        spotlight(t, C)
        whipStreaks(t)
        drawPill(t)
        drawKeypad(t)
        drawDeck(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 15.0 (transferred → Pisces, flip), 27.25 (→ the turn, shuffle), 39.95 (→ LESSON, flip), 51.05 (→ the last line, deal).
// The others are the film's own whips / the press / pops and play as such.
export const CUTS = [T.click, { t: 15.0, kind: 'flip' }, T.whip3[0], { t: 27.25, kind: 'shuffle' }, DROP, { t: 39.95, kind: 'flip' }, 44.85, { t: 51.05, kind: 'deal' }, T.ring2]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ═══════════════════════ sound ═══════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into Gm/Bb); chip / lead notes
// are absolute (Bb major = G minor's relative, on the score's chord grid).
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const FX = { rev: 0.1, dly: 0, bus: 'fx' }
const ring = t0 => [['chip', t0, 1567.98, 0.36, { duty: 0.25, arp: [0, 3], gain: 0.026, decay: 0.3, sustain: 0.9, rev: 0.15, dly: 0, bus: 'fx' }], ['chip', t0, 783.99, 0.36, { duty: 0.5, arp: [0, 3], gain: 0.012, decay: 0.3, sustain: 0.9, ...FX }]]
const scratch = t0 => [['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, ...FX }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, ...FX }]]
const sniff = t0 => [['chip', t0, 3000, 0.07, { wave: 'noise', slide: 30, gain: 0.02, decay: 0.05, sustain: 0.5, ...FX }], ['chip', r3(t0 + 0.15), 3600, 0.08, { wave: 'noise', slide: 30, gain: 0.02, decay: 0.05, sustain: 0.5, ...FX }]]
const thud = (t0, f = 120) => [['pop', t0, f, 0.08, 0], ['tick', t0, 0.06]]

// the hold music, four times
const HOLD = [
  // 1 · cheerful: bright 25% square, bouncy; a triangle bass
  ...loopNotes(T.click, T.transfer - 0.06, melody, (t, m, len) => [['chip', t, r2(hz(m)), r3(len * 0.78), { duty: 0.25, gain: 0.032, decay: 0.12, sustain: 0.6, vib: 0.003, rev: 0.12, dly: 0.16 }]]),
  ...loopNotes(T.click, T.transfer - 0.06, bassPat, (t, m, len) => [['chip', t, r2(hz(m)), r3(len * 0.85), { wave: 'tri', gain: 0.085, decay: 0.2, sustain: 0.8, rev: 0, dly: 0, bus: 'bass' }]]),
  // 2 · sad: an octave down, a muffled hollow square, a wobble, a little flat; the bass only on the one
  ...loopNotes(T.transfer + 0.3, T.sad3, melody, (t, m, len) => [['lead', t, r2(hz(m - 12) * 0.986), r3(len), { wave: 'square', duty: 0.5, gain: 0.05, cutoff: 1300, env: 500, envDecay: 6, q: 0.9, vib: 0.012, vibRate: 4, attack: 0.03, decay: 0.4, sustain: 0.75, release: 0.18, rev: 0.32, dly: 0.25 }]]),
  ...loopNotes(T.transfer + 0.3, T.sad3, c => [[0, ROOT[c], 8]], (t, m, len) => [['chip', t, r2(hz(m) * 0.986), r3(len), { wave: 'tri', gain: 0.07, decay: 0.4, sustain: 0.7, rev: 0, dly: 0, bus: 'bass' }]]),
  // 3 · slowed + sad: three notes a bar, each one drooping, a slow tape wow, flatter still
  ...loopNotes(T.sad3, T.die[1], c => MEL[c].filter(([s]) => s === 0 || s === 6 || s === 12), (t, m, len) => { const f = hz(m - 12) * 0.975; return [['lead', t, r2(f), r3(5.5 * S16), { wave: 'tri', gain: 0.062, cutoff: 850, env: 200, envDecay: 4, vib: 0.024, vibRate: 1.3, from: r2(f * 1.07), glide: r3(5.5 * S16), attack: 0.05, decay: 0.5, sustain: 0.8, release: 0.3, rev: 0.5, dly: 0.3 }]] }),
  ...loopNotes(T.sad3, T.die[1], c => [[0, ROOT[c], 12]], (t, m, len) => [['chip', t, r2(hz(m) * 0.975), r3(len), { wave: 'tri', gain: 0.06, decay: 0.6, sustain: 0.6, rev: 0, dly: 0, bus: 'bass' }]]),
  ['tapeStop', T.die[0], r3(T.die[1] - T.die[0])],
  // 4 · happy: the tune again, bright, with a harmony a third below and a sparkle on each downbeat (the score's build
  // groove underneath)
  ...loopNotes(T.happy, T.lift - 0.04, melody, (t, m, len, c, s) => [
    ['chip', t, r2(hz(m)), r3(len * 0.8), { duty: 0.25, gain: 0.034, decay: 0.12, sustain: 0.65, vib: 0.004, rev: 0.12, dly: 0.18 }],
    ['chip', t, r2(hz(third(m))), r3(len * 0.75), { duty: 0.125, gain: 0.018, decay: 0.12, sustain: 0.55, pan: -0.25, rev: 0.1, dly: 0.1 }],
    ...(s === 0 ? [['chip', t, r2(hz(m + 12)), 0.12, { duty: 0.125, gain: 0.014, decay: 0.08, sustain: 0.3, pan: 0.3, rev: 0.2, dly: 0.25 }]] : []),
  ]),
]

const DONE = ALL_LINES.map((L, i) => LT[i].done)
export const CUES = [
  // 0 · the hook: ring ring ring, the answer, the phone drops onto the desk
  ...T.rings.flatMap(r0 => ring(r0)),
  ...head(T.h0, 5, T.h0Late, 0), ['pop', r3(T.h0Late + 0.12), 1318.51, 0.04, 0],
  ['tick', T.answer, 0.06], ['pop', T.answer, 1174.66, 0.035, 0.2],
  ['whoosh', T.land[0] + 0.25, 0.4, 0.04], ...thud(T.land[1], 150),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CAPN]: 660, [ARIN]: 1250, [PISN]: 930 } }),
  // 1 · caller ID: your texts
  ...head(T.h1, 2, T.h1Land, 2),
  ...[T.b1, T.b2].flatMap(tb => [['pop', tb, 880, 0.04, 0.35], ['pop', r3(tb + 0.07), 1318.51, 0.035, 0.35]]),
  ['chip', T.panic[0], 2400, 0.25, { duty: 0.5, slide: 24, gain: 0.014, decay: 0.2, sustain: 0.4, ...FX }],
  // 2 · on hold: click, the whip, Aries juggling, the bonk
  ['tick', T.click, 0.07], ['pop', T.click, 300, 0.05, 0],
  ['whoosh', T.whip1[0] + 0.2, 0.35, 0.06], ...head(T.h2, 2, T.h2Land, 3),
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.whip1[1] + 0.1 + i * 0.4), i % 2 ? 784 : 659.25, 0.016, i % 2 ? 0.35 : -0.35]),
  ...[1, 2].flatMap(i => thud(r3(T.stop[i] + (i === 1 ? 0.35 : 0.42)), 220)),
  ...thud(T.bonk, 140), ['chip', r3(T.bonk + 0.02), 520, 0.42, { wave: 'tri', slide: -24, gain: 0.03, decay: 0.3, sustain: 0.6, ...FX }],
  ...Array.from({ length: 4 }, (_, i) => ['pop', r3(T.bonk + 0.3 + i * 0.22), 1760, 0.012, (i % 2 ? 0.3 : -0.3)]),
  // 3 · transferred (the card cut plays at 15.0), Pisces sobs and floats away
  ['chip', r3(T.transfer - 0.32), 659.25, 0.1, { duty: 0.5, slide: 30, gain: 0.022, decay: 0.08, sustain: 0.6, ...FX }], ['chip', r3(T.transfer - 0.2), 987.77, 0.12, { duty: 0.5, slide: 30, gain: 0.022, decay: 0.08, sustain: 0.6, ...FX }],
  ...head(T.h3, 2, T.h3Land, 1),
  ...sniff(T.sob), ...sniff(r3(T.sob + 0.45)), ...sniff(r3(T.float[0] + 0.6)),
  ['chip', T.float[0], 392, 2.2, { wave: 'tri', slide: 2.4, vib: 0.03, gain: 0.012, decay: 1, sustain: 0.8, rev: 0.4, dly: 0.2, bus: 'fx' }],
  // 4 · the spiral
  ['whoosh', T.whip3[0] + 0.2, 0.35, 0.06], ...head(T.h4, 2, T.h4Land, 4),
  ...[T.b3, T.b4, T.b5].flatMap((tb, i) => [['pop', tb, NOTE[2 + i], 0.04, 0.35], ['pop', r3(tb + 0.07), NOTE[4 + i], 0.035, 0.35]]),
  ...Array.from({ length: 9 }, (_, i) => ['tick', r3(T.search + i * SEARCH_GAP), 0.03]),
  ['pop', T.peek, 988, 0.02, 0.2], ['pop', T.dbl, 660, 0.02, -0.2], ['pop', T.snap, 1318.51, 0.035, 0.3],
  ['chip', T.spit, 2600, 0.32, { wave: 'noise', slide: -18, gain: 0.05, decay: 0.2, sustain: 0.3, ...FX }], ...thud(T.spit, 200),
  ...scratch(r3(T.spit + 0.04)),
  ...thud(T.stamp, 110), ['tick', r3(T.stamp + 0.04), 0.05],
  ['whoosh', T.crumple[0] + 0.2, 0.3, 0.03], ['tick', T.crumple[1], 0.03],
  // 5 · the turn
  ...head(T.h5, 3, T.h5Land, 0),
  ['whoosh', r3(T.off[0] + 0.35), 0.4, 0.03], ['tick', T.off[1], 0.045], ['pop', T.off[1], 523.25, 0.025, 0],
  ['pop', T.keypad[0], 784, 0.035, 0], ['tick', r3(T.keypad[0] + 0.05), 0.04],
  ['whoosh', r3(T.finger[0] + 0.25), 0.35, 0.03],
  ['chip', T.hover1[0], 466.16, 0.14, { duty: 0.5, gain: 0.016, decay: 0.1, sustain: 0.5, ...FX }], ['chip', r3(T.hover1[0] + 0.18), 440, 0.2, { duty: 0.5, gain: 0.014, decay: 0.1, sustain: 0.5, ...FX }],
  ['whoosh', r3(T.move2[0] + 0.25), 0.3, 0.025],
  // 6 · press 2 (a real DTMF "2": 697 + 1336 Hz) → the drop
  ['chip', DROP, 697, 0.26, { wave: 'tri', gain: 0.04, decay: 0.05, sustain: 1, rev: 0.05, dly: 0, bus: 'fx' }], ['chip', DROP, 1336, 0.26, { wave: 'tri', gain: 0.035, decay: 0.05, sustain: 1, rev: 0.05, dly: 0, bus: 'fx' }],
  ['tick', DROP, 0.06], ['bell', r3(DROP + 0.05), 1760, 0.03, 1.4, 0], ['glitter', r3(DROP + 0.05), r3(DROP + 0.8)],
  ...head(T.h6, 1, T.h6Land, 2),
  ...[0, 1, 2, 3].map(i => ['pop', r3(DROP + 0.08 + i * 0.07), NOTE[6 - i], 0.03, 0.3 - i * 0.2]),
  ...[0, 1, 2].map(i => ['pop', r3(T.join[0] + i * 0.32), 784 + i * 120, 0.02, 0.4]),
  ['chip', r3(T.join[0] + 0.2), 1046.5, 0.9, { duty: 0.25, slide: -4, vib: 0.035, gain: 0.012, decay: 0.7, sustain: 0.8, pan: -0.5, rev: 0.25, dly: 0.1, bus: 'fx' }],
  // 7 · LESSON UNLOCKED
  ...lessonCues(T.lesson, { text: LESSON.text, chip: LESSON.chip, key: 'Gm' }),
  // 8 · tonight's deck: one card at a time
  ...head(T.h7, 1, T.h7Land, 3),
  ...T.deal.flatMap((td, i) => [['whoosh', r3(td + 0.15), 0.35, 0.035], ['tick', r3(td + 0.4), 0.05], ['pop', r3(td + 0.4), NOTE[2 + i * 2], 0.03, (i - 1) * 0.3]]),
  ['tick', T.flip[0], 0.04], ['tick', r3(T.flip[0] + 0.12), 0.04], ['bell', r3(T.flip[0] + 0.18), 1318.51, 0.03, 1.4, 0], ['glitter', r3(T.flip[0] + 0.1), r3(T.flip[0] + 0.7)],
  ['whoosh', r3(T.deckOut[0] + 0.2), 0.35, 0.03],
  // 9 · the last line
  ...head(T.h8, 4, T.h8Land, 1, 0.024), ['pop', r3(T.h8Land + 0.14), 1318.51, 0.04, 0],
  ['whoosh', r3(T.on[0] + 0.3), 0.35, 0.025], ['tick', T.on[1], 0.045],
  ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ...ring(T.ring2), ...ring(r3(T.ring2 + 0.5)),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...HOLD,
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void DONE
