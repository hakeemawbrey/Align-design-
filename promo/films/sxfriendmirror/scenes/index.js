// sxfriendmirror — "Your Own Biggest Fan." (45 s vertical Align ad · Star Talk Shows · FRIENDS & SELF-LOVE, ep. 2)
// Story 0–40.6, then the shared end card. Not a solo date: this one is about the voice in your head. ♋ CANCER's inner
// critic is a tiny grumpy rain cloud that heckles every outfit and every text, and Cancer SHRINKS with each heckle. THE
// STARS hand Cancer a mic; Cancer talks back, kindly, and grows back as the cloud shrinks into a little puff… which only
// wanted to keep Cancer from getting hurt. A hug. Then the stars point that protective voice somewhere useful: your
// dealbreakers. ♓ Pisces cries on a beanbag in the corner of every shot.
//   0.00–4.4   "Meet my | inner critic."  Cancer hums, happy. 1.16 (drop) POOF: a grumpy cloud above its head.
//              CLOUD: "oh. we're wearing that?"
//   4.4–10.6   "Outfit check."  Three outfits on the beat, three heckles in bubbles, Cancer smaller each time:
//              beret "a hat? hiding something?" · scarf "a scarf? it's warm out." · sweater "you look like a lamp."
//  10.6        card cut (deal).
//  10.6–16.5   "Text check."  Cancer types "had fun tonight! :)". "delete the smiley. desperate." It deletes. "now it's
//              cold. they'll hate you." The cloud drifts over and rains on it; it's tiny now. Pisces sobs.
//  16.5–25.5   "Talk back."  THE STARS pop in and lower a gold mic on a string: "psst. you're allowed to talk back."
//              CANCER (mic): "hey. I like this sweater." (the cloud shrinks; Cancer grows) · "and the smiley stays." (the
//              text is SENT ✓; the cloud is a puff now; Cancer is full size)
//  25.6        card cut (flip).
//  25.6–32.1   "The puff."  THE PUFF, teary: "…I just didn't want you hurt." Cancer hugs it: blush, a tiny rainbow.
//              "Know what | you deserve."  THE STARS: "aim that voice at your dealbreakers." The dealbreakers card;
//              the puff stamps three chips (✕ makes me feel small · ✕ mean about my sweater · ✕ "just joking" 24/7).
//  32.27       ★ LESSON UNLOCKED: "Talk to yourself | like you'd talk to a friend." +1 SELF-RESPECT
//  36.8–40.6   "You're the catch."  Cancer wears all three outfits at once, the puff perched on top like a pom.
// One canvas (sky + set + stars + props), DOM type + dialogue boxes + the lesson above it, the show bug, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawCloud, drawRain, drawRainbow, drawHat, drawScarf, drawSweater, drawMic, drawBubble, drawChatPhone, drawDealPanel } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#9fe8ff', MINT = '#7dffb0', SKYB = '#7fd4ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid
export const KEY = 'Am'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · meet my inner critic
  h0: 0.12, h0Land: BEAT(0), h0Out: [4.25, 4.42], poof: BEAT(1), l1: 1.6, close1: 4.4,
  // 2 · outfit check
  h1: 4.5, h1Land: 4.8, o: [BEAT(8), BEAT(11), BEAT(14)], b: [[5.2, 6.55], [6.85, 8.25], [8.55, 10.4]], h1Out: [10.35, 10.52],
  c1: BEAT(18),                                                     // 10.6
  // 3 · text check
  h2: 10.68, h2Land: 10.98, type: [10.95, 11.85], b4: [12.1, 13.9], del: [13.55, 13.85], dot: 13.98, drift: [14.2, 14.7], b5: [14.4, 16.2], h2Out: [16.25, 16.42],
  c2: 16.5,
  // 4 · talk back
  h3: 16.55, h3Land: 16.85, nar: 16.6, l2: 16.9, mic: [16.95, 17.7], grab: 18.75, l3: 20.05, ohh: [21.0, 22.2], l4: 22.9, close4: 25.4, h3Out: [25.3, 25.48],
  c3: BEAT(45),                                                     // 25.6
  // 5 · the puff · know what you deserve
  h4: 25.68, h4Land: 25.98, l5: 25.9, hug: [27.45, 27.95], h4Out: [28.5, 28.66],
  h5: 28.7, h5Land: 29.05, panel: 28.78, l6: 28.95, stamps: [29.7, 30.25, 30.8], close5: 32.0, h5Out: [31.9, 32.08], panelOut: [31.9, 32.15],
  // 6 · LESSON UNLOCKED
  lesson: BEAT(57), lessonOut: [36.6, 36.8],
  // 7 · you're the catch
  h6: 36.85, h6Land: 37.25, dress: 36.95, perch: [37.0, 37.45], wink: [38.2, 38.8], out: [40.05, 40.45], h6Out: [40.2, 40.45],
}
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Talk to yourself | like you’d talk to a *friend.*', chip: '+1 SELF-RESPECT', accentColor: SKYB, dim: 0.55 }

// ── the dialogue
const CLD = '☁ INNER CRITIC', PUFF = '☁ INNER CRITIC (tiny)', CAN = '♋ CANCER', CANM = '♋ CANCER (on the mic)', STARS = 'THE STARS'
const CLDC = '#c3c7de', CANC = SKYB
const L1 = [{ t: T.l1, speaker: CLD, color: CLDC, text: 'oh. we’re wearing *that?*' }]
const L4 = [
  { t: T.l2, speaker: STARS, text: 'psst. you’re allowed to *talk back.*' },
  { t: T.l3, speaker: CANM, color: CANC, text: 'hey. I *like* this sweater.' },
  { t: T.l4, speaker: CANM, color: CANC, text: 'and the smiley *stays.*' },
]
const L5 = [
  { t: T.l5, speaker: PUFF, color: CLDC, text: '…I just didn’t want you *hurt.*' },
]
const L6 = [{ t: T.l6, speaker: STARS, text: 'aim that voice at your *dealbreakers.*' }]
export const ALL_LINES = [...L1, ...L4, ...L5, ...L6]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
export const BOXES = [[L1, T.close1, 52], [L4, T.close4, 52], [L5, 28.7, 52], [L6, T.close5, 52]]
const charAt = (li, word) => { const s = ALL_LINES[li].text.replace(/\*/g, ''); return LT[li].chars[Math.max(0, s.indexOf(word))] }
export const TW = { like: charAt(2, 'like'), stays: charAt(3, 'stays'), hurt: charAt(4, 'hurt'), deal: charAt(5, 'dealbreakers') }
const CAN_HOPS = talkHops(ALL_LINES, CANM, { cps: CPS })
const NAR_HOPS = talkHops(ALL_LINES, STARS, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b
const JUMP = (t, t0, d = 0.42) => { const p = prog(t, t0, t0 + d); return p > 0 && p < 1 ? Math.sin(Math.PI * p) : 0 }
/** a stepped value: [[t, v], …] with a springy 0.3 s ease into each new step */
const stepped = (t, steps) => {
  let v = steps[0][1]
  for (let i = 1; i < steps.length; i++) { const [t0, v1] = steps[i]; if (t < t0) break; const p = prog(t, t0, t0 + 0.3); v = lerp(v, v1, easeOutBack(p, 2)) }
  return v
}

// ── the cast
const CAN_C = signStar('cancer'), PIS = signStar('pisces')
const GROUND = 1265
// Cancer's size: a step smaller with every heckle, a step bigger with every kind word back
const CAN_SIZE = [[0, 300], [T.b[0][0] + 0.3, 272], [T.b[1][0] + 0.3, 244], [T.b[2][0] + 0.3, 216], [T.b4[0] + 0.3, 190], [T.b5[0] + 0.35, 160]]
const canSize = t => {
  let s = stepped(t, CAN_SIZE)
  if (t >= T.c2) s = stepped(t, [[0, 160], [TW.like, 230], [TW.stays, 300], [T.dress, 320]])
  return s
}
function canPos(t) {
  const s = canSize(t)
  let cx = 540
  if (t >= T.c1 && t < T.c2) cx = 640
  if (t >= T.c2 && t < T.c3) cx = 470
  if (t >= T.c3 && t < T.lessonOut[1]) cx = 400 + 50 * ease.inOutCubic(prog(t, ...T.hug)) * (1 - ease.inOutCubic(prog(t, T.panel, T.panel + 0.4)))
  if (t >= T.lessonOut[1]) cx = 540
  return [cx, GROUND - s * 0.45, s]
}
// the cloud: [x, y, width]
function cloudPos(t) {
  if (t < T.poof) return null
  const C = canPos(t)
  if (t < T.c1) return [C[0] + 220, C[1] - C[2] * 0.45 - 90, 250 * pop01(t, T.poof, 0.35, 2.4)]
  if (t < T.c2) {
    const d = ease.inOutCubic(prog(t, ...T.drift))
    return [lerp(840, C[0], d), lerp(800, C[1] - C[2] * 0.5 - 110, d), lerp(250, 280, d)]
  }
  if (t < T.c3) return [C[0] + 250, C[1] - C[2] * 0.45 - 90, stepped(t, [[0, 260], [TW.like, 180], [TW.stays, 120]])]
  if (t < T.lessonOut[1]) {
    // the puff: beside Cancer, then in its arms (the hug), then off to stamp the dealbreakers
    const base = [720, 1040, 120], inArms = [C[0] + 120, C[1] + 10, 120]
    const hk = ease.inOutCubic(prog(t, T.hug[0], T.hug[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, T.panel - 0.1, T.panel + 0.25)))
    let p = [lerp(base[0], inArms[0], hk), lerp(base[1], inArms[1], hk), 120]
    if (t >= T.panel) {
      const i = T.stamps.findIndex(s => t < s + 0.45)
      const chipY = i < 0 ? 760 : 690 + 74 * i
      const tgt = i < 0 ? [860, 800] : [870, chipY]
      const k = ease.inOutCubic(prog(t, T.panel, T.panel + 0.5)) * (1 - ease.inOutCubic(prog(t, T.panelOut[0], T.panelOut[1] + 0.2)))
      p = [lerp(p[0], tgt[0], k), lerp(p[1], tgt[1], k), 100]
      for (const s of T.stamps) p[1] += 30 * JUMP(t, s - 0.2, 0.3) * -1
    }
    return p
  }
  // the final: perched on Cancer's hat
  const C2 = canPos(t), k = ease.inOutCubic(prog(t, ...T.perch))
  return [lerp(720, C2[0], k), lerp(1040, C2[1] - C2[2] * 0.68, k) - Math.sin(Math.PI * k) * 120, lerp(100, 90, k)]
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 26px Inter", "600 30px Inter", "700 28px Inter", "italic 500 190px 'EB Garamond'", "italic 500 44px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HL = (text, o) => popText(root, text, { late: 1, wobble: true, ...o })
  const H0 = HL('Meet my | inner *critic.*', { top: 150, size: 116, accentSize: 160, at: T.h0, lateAt: T.h0Land, accentColor: '#c3c7de', lineHeight: 1.0 })
  const H1 = HL('Outfit *check.*', { top: 205, size: 124, accentSize: 172, at: T.h1, lateAt: T.h1Land, accentColor: PINK })
  const H2 = HL('Text *check.*', { top: 205, size: 124, accentSize: 172, at: T.h2, lateAt: T.h2Land, accentColor: LAV })
  const H3 = HL('Talk *back.*', { top: 205, size: 124, accentSize: 172, at: T.h3, lateAt: T.h3Land, accentColor: GOLD })
  const H4 = HL('The *puff.*', { top: 205, size: 124, accentSize: 172, at: T.h4, lateAt: T.h4Land, accentColor: PINK })
  const H5 = HL('Know what | you *deserve.*', { top: 140, size: 104, accentSize: 150, at: T.h5, lateAt: T.h5Land, accentColor: GOLD, lineHeight: 1.0 })
  const H6 = HL('You’re *the* catch.', { top: 200, size: 116, accentSize: 168, at: T.h6, lateAt: T.h6Land, late: 2, accentColor: SKYB, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out]]
  const boxes = BOXES.map(([lines, close, size]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS, size }))

  // ── the show bug (top-left, the whole story)
  const bug = el('div', { position: 'absolute', left: '56px', top: '56px', font: `800 26px ${INTER}`, letterSpacing: '0.2em', color: 'rgba(239,230,214,0.82)', textShadow: '0 2px 10px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', opacity: 0 }, root)
  bug.innerHTML = '<span style="color:#ff8fb1">♥</span> FRIENDS <span style="color:#ff8fb1">&amp;</span> SELF-LOVE'

  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── fx
  function sparkles(t, cx, cy, t0, n, Rr, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.6 + 0.6 * p), cy + Math.sin(a) * Rr * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV, CYAN][i % 5])
    }
    x.restore()
  }
  function smoke(t, t0, cx, cy, R0 = 40) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const r = rng(4)
    x.save()
    for (let i = 0; i < 12; i++) {
      const a = r() * Math.PI * 2, v = 120 + r() * 200, rad = (R0 * 0.5 + r() * R0 * 0.6) * (1 + tt * 1.4)
      const px = cx + Math.cos(a) * v * tt, py = cy + Math.sin(a) * v * tt * 0.6
      x.globalAlpha = 0.6 * (1 - tt / 0.7)
      x.fillStyle = i % 3 ? '#d9cff2' : '#f4ecff'
      const c = Math.max(6, Math.round(rad / 4))
      x.fillRect(Math.round(px - c * 1.5), Math.round(py - c), c * 3, c * 2); x.fillRect(Math.round(px - c), Math.round(py - c * 1.5), c * 2, c * 3)
    }
    x.restore()
  }
  function drawTears(eyes, t, cell, strength) {
    if (strength <= 0) return
    const c = Math.max(3, Math.round(cell))
    x.save()
    eyes.forEach(([ex, ey], side) => {
      const dir = side === 0 ? -1 : 1
      for (let k = 0; k < 8; k++) {
        const ph = (t * 2.1 + k / 8) % 1
        const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
        const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
        const a = (1 - ph) * clamp(strength)
        if (a <= 0.03) continue
        x.globalAlpha = a
        const X = Math.round(px), Y = Math.round(py)
        x.fillStyle = '#16204a'; x.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
        x.fillStyle = '#5cc6ff'; x.fillRect(X, Y, c, 2 * c)
        x.fillStyle = '#e6f8ff'; x.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
      }
    })
    x.restore()
  }

  // ─────────────────────────────── Cancer
  const CAN_HOPS_ALL = [...CAN_HOPS, T.o[0] + 0.05, T.o[1] + 0.05, T.o[2] + 0.05, T.type[0], T.grab, TW.like + 0.05, TW.stays + 0.05, T.hug[1], T.lesson + 1.8, T.dress + 0.1, T.perch[1] + 0.05].sort((a, b) => a - b)
  function canState(t) {
    let mood = 'happy', look = [0, 0], blink, squash = 0, dy = 0
    if (t < T.c1) {
      if (t >= T.poof) { mood = 'wide'; look = [1, -1]; blink = false; const kk = t - T.poof; dy = -50 * Math.exp(-kk * 5) * Math.abs(Math.cos(kk * 9)) }
      if (t >= LT[0].done - 0.3) { mood = 'squint'; look = [1, -1] }
      T.o.forEach((o, i) => {
        if (inR(t, o, T.b[i][0] + 0.15)) { mood = 'sparkle'; look = [0, 0] }
        if (inR(t, T.b[i][0] + 0.15, T.b[i][0] + 0.7)) { mood = 'wide'; look = [1, -1]; blink = false }
        if (inR(t, T.b[i][0] + 0.7, (T.o[i + 1] || T.c1))) { mood = 'squint'; look = [i === 2 ? 0 : 1, i === 2 ? 1 : -1] }
      })
    } else if (t < T.c2) {
      mood = 'happy'; look = [-1, -1]
      if (t >= T.b4[0] + 0.15) { mood = 'wide'; look = [1, -1]; blink = false }
      if (t >= T.del[0]) { mood = 'squint'; look = [-1, -1] }
      if (t >= T.b5[0] + 0.3) { mood = 'squint'; look = [0, 1]; squash = 0.06 }
    } else if (t < T.c3) {
      mood = 'squint'; look = [0, 1]; squash = 0.06
      if (t >= T.nar) { mood = 'wide'; look = [-1, -1]; squash = 0; blink = false }
      if (t >= T.grab) { mood = 'neutral'; look = [1, -1]; blink = undefined }
      if (t >= T.l3) mood = 'squint'
      if (t >= TW.like) { mood = 'happy'; look = [1, -1] }
      if (t >= T.l4) mood = 'neutral'
      if (t >= TW.stays) mood = 'sparkle'
    } else if (t < T.lesson - 0.1) {
      mood = 'sparkle'; look = [1, 0]
      if (inR(t, T.hug[0], T.panel)) { mood = 'happy'; squash = 0.08 * pulse(t, T.hug[0], 0.5) }
      if (t >= T.panel) { mood = 'happy'; look = [1, -1] }
    } else if (t < T.lessonOut[0]) { mood = 'sparkle'; look = [0, -1] }
    else {
      mood = 'happy'; look = [0, 0]
      if (inR(t, ...T.wink)) mood = 'wink'
      if (inR(t, T.dress, T.dress + 0.4)) { mood = 'wide'; blink = false }
    }
    return { mood, look, blink, squash, dy }
  }
  function cloudMood(t) {
    if (t < T.c2) return { mood: 'grump', cute: 0, blush: 0 }
    if (t < T.c3) return { mood: t >= TW.stays ? 'sad' : t >= TW.like ? 'shock' : 'grump', cute: 0, blush: 0 }
    if (t < T.hug[0]) return { mood: 'sad', cute: 1, blush: 0 }
    return { mood: 'happy', cute: 1, blush: t >= T.hug[0] ? 1 : 0 }
  }

  // ─────────────────────────────── the world
  function drawRoom(t) {
    drawSky(x, t, SKY_H)
    // floor + rug
    x.fillStyle = '#170f33'; x.fillRect(0, GROUND + 15, W, H - GROUND)
    x.fillStyle = 'rgba(201,166,255,0.18)'; x.fillRect(0, GROUND + 15, W, 6)
    for (let i = 0; i < W; i += 90) { x.fillStyle = 'rgba(201,166,255,0.06)'; x.fillRect(i, GROUND + 21, 4, H - GROUND) }
    x.fillStyle = 'rgba(127,212,255,0.16)'; x.beginPath(); x.ellipse(540, GROUND + 70, 420, 46, 0, 0, Math.PI * 2); x.fill()
    // Pisces' beanbag in the corner
    x.fillStyle = '#5a3c94'; x.beginPath(); x.ellipse(945, GROUND + 4, 105, 44, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#7d5cc0'; x.fillRect(870, GROUND - 30, 150, 8)
  }

  function drawPisces(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    let mood = 'squint', tears = 0.6
    if (inR(t, T.b5[0], T.c2)) tears = 1
    if (inR(t, TW.hurt, T.panel)) tears = 1
    if (t >= T.hug[0]) { mood = 'happy'; tears = 0.85 }
    if (inR(t, T.poof, T.poof + 0.8)) { mood = 'wide'; tears = 0.2 }
    const hops = [T.hug[1] + 0.1, T.hug[1] + 0.5, T.lesson + 1.9, T.perch[1] + 0.1]
    const R = drawStarChar(x, 945, GROUND - 52, 120, t, { ...PIS, mood, look: [-1, 0], seed: 59, hops, pop: ok, glow: 0.8 })
    drawTears([[945 - R.size * 0.17, R.y + R.size * 0.07], [945 + R.size * 0.17, R.y + R.size * 0.07]], t, Math.max(4, R.size / 22), tears * ok)
  }

  function drawNarrator(t) {
    if (t < T.nar || t >= T.c3) return
    const k = pop01(t, T.nar, 0.35, 2.2) * (1 - prog(t, T.c3 - 0.3, T.c3 - 0.05))
    if (k <= 0.02) return
    const mood = t < T.l2 ? 'wink' : t < LT[1].done + 0.3 ? 'happy' : t >= TW.stays ? 'heart' : 'sparkle'
    drawStarChar(x, 175, 640, 170, t, { color: STAR.sky, mood, look: [1, 1], seed: 3, hops: NAR_HOPS, pop: k, glow: 1.1 })
  }

  function drawCancer(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    const [cx, cy, s] = canPos(t), st = canState(t)
    const R = drawStarChar(x, cx, cy + st.dy, s, t, { ...CAN_C, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: CAN_HOPS_ALL, seed: 9, pop: ok })
    const S = R.size, px = Math.max(3, Math.round(S / 40))
    // outfits
    const hat = inR(t, T.o[0], T.o[1]) || t >= T.dress, scarf = inR(t, T.o[1], T.o[2]) || t >= T.dress, sweater = t >= T.o[2]
    if (sweater) drawSweater(x, R.x, R.y + S * 0.2, S * 0.5, S * 0.2, px)
    if (scarf) drawScarf(x, R.x, R.y + S * 0.15, S * 0.44, px, t)
    if (hat) drawHat(x, R.x, R.top + S * 0.1, px * 1.8)
    // the mic: lowered on a gold string, grabbed, then held
    if (t >= T.mic[0] && t < T.c3) {
      const hx = R.x + S * 0.47, hy = R.y - S * 0.02
      if (t < T.grab) {
        const d = ease.outCubic(prog(t, ...T.mic)), my = lerp(440, hy - 40, d) + Math.sin(t * 3) * 8
        x.fillStyle = GOLD; x.fillRect(Math.round(hx), 420, 3, Math.max(0, Math.round(my - 430)))
        drawMic(x, hx + 2, my, 7, 0)
      } else drawMic(x, hx - S * 0.05, hy, 7, -0.4)
    }
    return R
  }

  function drawCritic(t) {
    const P = cloudPos(t)
    if (!P || P[2] <= 4) return
    const ok = popOut(t, T.out)
    const m = cloudMood(t)
    const bob = Math.sin(t * 2.4) * 8
    // rain on Cancer in the text check (the worst moment), a drizzle when it's very grumpy
    const rain = t >= T.drift[0] && t < T.c2 ? clamp(prog(t, T.drift[0], T.drift[1])) : 0
    drawRain(x, P[0], P[1] + bob + P[2] * 0.22, P[2] * 0.7, t, rain * ok)
    drawCloud(x, P[0], P[1] + bob, P[2] * ok, t, m)
    if (t >= T.hug[1] - 0.1 && t < T.panel + 0.2) drawRainbow(x, P[0], P[1] - 40, 90, prog(t, T.hug[1] - 0.1, T.hug[1] + 0.4) * (1 - prog(t, T.panel - 0.1, T.panel + 0.2)))
  }

  // the phone (text check), and the SENT callback
  const DRAFT = 'had fun tonight! :)'
  function draftAt(t) {
    if (t < T.type[0]) return ''
    if (t < T.del[0]) return DRAFT.slice(0, Math.round(DRAFT.length * prog(t, ...T.type)))
    if (t < T.dot) return DRAFT.slice(0, Math.round(lerp(DRAFT.length, 15, prog(t, ...T.del))))
    return 'had fun tonight.'
  }
  function drawPhones(t) {
    if (t >= T.c1 - 0.05 && t < T.c2) {
      const aw = ease.inCubic(prog(t, T.c2 - 0.3, T.c2))
      drawChatPhone(x, 300, 700 + aw * 1300, 1, draftAt(t), { caret: Math.floor(t * 3) % 2 === 0 })
    }
    if (t >= TW.stays && t < T.c3) {
      const k = pop01(t, TW.stays + 0.1, 0.3, 2)
      drawChatPhone(x, 215, 1010, 0.5 * k, DRAFT, { sent: true })
    }
  }

  function drawBubbles(t) {
    const bub = (text, [t0, t1], bx, by, opts) => { if (t < t0 || t >= t1) return; const k = pop01(t, t0, 0.25, 2.4) * (1 - prog(t, t1 - 0.15, t1)); drawBubble(x, bx, by, text, k, { col: '#e9ebf5', ...opts }) }
    const CP = cloudPos(t) || [0, 0, 0], BY = CP[1] - 120
    bub('a hat? hiding something?', T.b[0], 600, BY, { size: 38, tail: 'right' })
    bub('a scarf? it’s warm out.', T.b[1], 600, BY, { size: 38, tail: 'right' })
    bub('you look like a lamp.', T.b[2], 620, BY, { size: 40, tail: 'right' })
    bub('delete the smiley. desperate.', T.b4, 560, 560, { size: 34, tail: 'right' })
    bub('now it’s cold. they’ll hate you.', T.b5, 540, 560, { size: 34, tail: 'right' })
    bub('…oh.', T.ohh, CP[0] + 40, BY + 20, { size: 40, tail: 'left' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawRoom(t)
      if (t < T.out[1] + 0.02) {
        drawPisces(t)
        drawNarrator(t)
        drawPhones(t)
        const R = drawCancer(t)
        drawCritic(t)
        // the dealbreakers card
        if (t >= T.panel && t < T.panelOut[1]) {
          const k = pop01(t, T.panel, 0.35, 1.8) * (1 - ease.inCubic(prog(t, ...T.panelOut)))
          drawDealPanel(x, 540, 700, k, T.stamps.filter(s => t >= s).length, t)
          const P = cloudPos(t)
          if (P) drawCloud(x, P[0], P[1] + Math.sin(t * 2.4) * 8, P[2], t, cloudMood(t))     // the puff stays in front of the card
          T.stamps.forEach(s => sparkles(t, 860, 690 + 74 * T.stamps.indexOf(s), s, 8, 70, 0.3, 0.5, 18))
        }
        drawBubbles(t)
        // bursts
        smoke(t, T.poof - 0.02, 770, 760, 60)
        T.o.forEach(o => { smoke(t, o - 0.05, 540, 1050, 70); sparkles(t, 540, 1000, o, 10, 200, 0.3, 0.6, 24) })
        if (R) { sparkles(t, R.x, R.y, TW.like, 12, 220, 0.2, 0.7, 26); sparkles(t, R.x, R.y, TW.stays, 14, 260, 0.6, 0.8, 30); sparkles(t, R.x, R.y, T.dress, 14, 260, 0.1, 0.8, 30) }
        sparkles(t, 600, 1080, T.hug[0] + 0.3, 12, 200, 0.5, 0.8, 26)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      bug.style.opacity = String(clamp(prog(t, 0.3, 0.6)) * (1 - prog(t, STORY_END - 0.25, STORY_END)))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 10.6 deal into the text check, 25.6 flip into the
// puff). The others stay inert: 4.45 (→ outfit check), 16.5 (→ talk back), 32.1 (→ the lesson).
export const CUTS = [4.45, { t: T.c1, kind: 'deal' }, T.c2, { t: T.c3, kind: 'flip' }, 32.1]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell in the D-major palette; the engine re-keys them into A minor's C major)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const grumble = t => [['chip', r3(t), 150, 0.28, { ...FX, wave: 'square', duty: 0.25, slide: -3, vib: 0.05, gain: 0.025, decay: 0.2, sustain: 0.5 }], ['chip', r3(t + 0.12), 120, 0.2, { ...FX, wave: 'square', duty: 0.25, slide: -4, gain: 0.02, decay: 0.15, sustain: 0.4 }]]
const shrink = t => [0, 1, 2].map(i => ['chip', r3(t + i * 0.06), 880 / (1 + i * 0.25), 0.07, { ...FX, wave: 'square', duty: 0.5, gain: 0.018, decay: 0.05, sustain: 0.4 }])
const grow = t => [0, 1, 2, 3].map(i => ['chip', r3(t + i * 0.06), [523.25, 659.25, 783.99, 1046.5][i], 0.08, { ...FX, wave: 'square', duty: 0.25, gain: 0.02, decay: 0.05, sustain: 0.5 }])
const PITCH = { [CLD]: 300, [PUFF]: 700, [CAN]: 880, [CANM]: 880, [STARS]: 1046.5 }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · meet my inner critic
  ...head(T.h0, 3, T.h0Land, 0),
  ...[0.4, 0.75, 1.0].map((h, i) => ['pluck', h, NOTE[i + 2], 0.02, 0.6, -0.2]),                 // Cancer humming
  ['boom', T.poof, 0.2], ['whoosh', T.poof, 0.3, 0.05], ...grumble(r3(T.poof + 0.15)),
  // 2 · outfit check
  ...head(T.h1, 1, T.h1Land, 2),
  ...T.o.flatMap((o, i) => [['whoosh', r3(o - 0.08), 0.25, 0.05], ['pop', r3(o), NOTE[3 + i], 0.04, 0], ['glitter', r3(o), r3(o + 0.4)]]),
  ...T.b.flatMap(([b]) => [...grumble(b), ['pop', r3(b), 392, 0.03, 0.3], ...shrink(r3(b + 0.3))]),
  // 3 · text check
  ...head(T.h2, 1, T.h2Land, 4),
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.type[0] + i * 0.09), 0.03]),
  ...grumble(T.b4[0]), ...Array.from({ length: 4 }, (_, i) => ['tick', r3(T.del[0] + i * 0.08), 0.045]), ['tick', T.dot, 0.04], ...shrink(r3(T.b4[0] + 0.3)),
  ['whoosh', T.drift[0], 0.4, 0.04], ...grumble(T.b5[0]), ['swell', r3(T.drift[0]), r3(T.c2), { bus: 'sfx', gain: 0.03, f0: 2000, f1: 5000 }], ...shrink(r3(T.b5[0] + 0.35)),
  ...sob(r3(T.b5[0] + 0.5), 1318.5, 3),
  // 4 · talk back
  ...head(T.h3, 1, T.h3Land, 1),
  ['pop', T.nar, 1318.51, 0.04, -0.4], ['bell', r3(T.nar + 0.05), 1760, 0.03, 1.2, -0.4],
  ['whoosh', T.mic[0], 0.5, 0.03], ['tick', T.mic[1], 0.05], ['pop', T.grab, 880, 0.04, 0.3], ['tick', r3(T.grab + 0.02), 0.06],
  ...grow(TW.like), ['pop', r3(TW.like), 1174.66, 0.04, 0], ...shrink(r3(TW.like + 0.05)),
  ...grow(TW.stays), ['bell', r3(TW.stays + 0.05), 1567.98, 0.035, 1.4, 0], ['glitter', TW.stays, r3(TW.stays + 0.7)], ['whoosh', r3(TW.stays + 0.1), 0.25, 0.04], ['pop', r3(TW.stays + 0.3), 1318.51, 0.03, 0.4],
  // 5 · the puff · know what you deserve
  ...head(T.h4, 1, T.h4Land, 3, 0.02),
  ...sob(r3(TW.hurt + 0.2), 1318.5, 2),
  ['pop', T.hug[0], 659.25, 0.03, 0], ['pluck', r3(T.hug[0] + 0.25), 880, 0.035, 1.2, 0], ['pluck', r3(T.hug[0] + 0.4), 1174.66, 0.03, 1.2, 0], ['glitter', T.hug[1], r3(T.hug[1] + 0.6)],
  ...head(T.h5, 3, T.h5Land, 1),
  ['whoosh', T.panel, 0.3, 0.04], ['pop', r3(T.panel + 0.1), 880, 0.03, 0],
  ...T.stamps.flatMap((s, i) => [['tom', r3(s), 90, { ...FX, gain: 0.18, decay: 0.15 }], ['pop', r3(s), NOTE[2 + i * 2], 0.04, 0.3], ['tick', r3(s), 0.05]]),
  // 6 · LESSON UNLOCKED
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · you're the catch
  ['whoosh', T.dress - 0.05, 0.25, 0.05], ['glitter', T.dress, r3(T.dress + 0.6)], ...grow(T.dress),
  ...wordPops(T.h6, 1, 0.08, 1, 0.022), ['pop', T.h6Land, 1174.66, 0.045, 0], ['pluck', T.h6Land, 880, 0.04, 0.8, 0], ['pop', r3(T.h6Land + 0.1), 1318.51, 0.04, 0],
  ['pop', T.perch[1], 1567.98, 0.03, 0], ['tick', T.wink[0], 0.04],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
