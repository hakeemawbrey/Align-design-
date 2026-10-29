// st11leo (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E05: Leo · MISSION 05 · Regulus) · story 0–55.6,
// then the shared end card.
//   0.00  HOOK. The Houston launch pad at dusk: Leo in its space suit mid-pose in front of its rocket, the countdown already
//         on "3". Hook: "Leo's star spins so fast it's *squished*."  2 · 1 · LIFTOFF at 2.7, the rocket climbs out.
//   4.20  WANT. Houston Mission Control. SATURN (flight director): "Mission 05: *Regulus*, the lion's heart star."  Leo on
//         the feed (its crown floating inside the helmet): "i want a dance-off with my *heart star.*"  Aquarius at CAPCOM,
//         headphones on: "copy. i made you a *playlist.*"
//  13.80  the warp; 15.6 inside the rocket (the ghost leans out of the GLITTER crate), Leo vibing to the playlist.
//  17.60  TRY. Regulus, huge and flattened, spinning: "a visitor! do you *dance?*"  DANCE-OFF · ROUND 1. Leo spins to
//         match it, faster, faster… MISS · MISS · DIZZY. LEO: "how do you spin so *fast?!*"
//  30.60  TURN. ★ REAL SKY: Regulus is about 79 light-years away and spins so fast it's flattened, wider at its equator than
//         pole to pole (a measuring diagram: WIDE ↔ / SHORTER ↕).  REGULUS: "fast is *my* speed. what's yours?"
//         AQUARIUS (radio): "try half time, babe. *feel* the beat."
//  42.20  WIN. ROUND 2 · DUET: Regulus spins fast, Leo sways big and slow on the half-time beat; PERFECT · PERFECT · SYNC 100%.
//  46.60  the trip home; 48.0 Mission Control cheers, Aquarius hugs Leo: "you came back *glowing.*"
//  52.20  LAST LINE on frame 0's framing (the pad, the same pose, now with Aquarius beside it): "Spin *your* speed."
//   Rewatch bait: Leo's season-3 crown floats inside its helmet the whole trip; the crate is labelled GLITTER; a "LEO LIVE"
//   sticker on the console. The ghost stowaway leans out of the GLITTER crate at 16.0.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { hookCard, hookCues } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { drawCrown } from '../../st9leohome.js'
import { drawAquaHeadphones } from '../../st9aquahome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawStarBall, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { GOLD, BONE, PINK, INK, CYAN, MINT, RED, MONO, INTER, r3, R, pop01, outK, popOut, camAt, camApply, sparkles, floatHearts,
  cheers, lastLine, pixelBubble, dizzy, speedLines, launchPad, cockpit, feedPanel } from '../st11kit.js'

export const DURATION = 60
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const LEO = signStar('leo'), AQU = signStar('aquarius')
const REG_COL = '#cfe0ff'
const BEAT = 0.5556

const T = {
  count: [-0.25, 0.65, 1.55], go: 2.45, hookOut: 2.9, lift: [2.5, 4.2],
  cutMC: 4.2, l1: 4.5, feed: 7.6, l2: 7.9, cutAqu: 10.6, l3: 10.8, closeA: 13.7,
  warp: 13.8, inside: 15.6, ghost: 16.0,
  arrive: 17.6, l4: 18.2, closeB: 21.0, round1: 21.4, spin: [21.9, 26.0], miss: [24.6, 25.3, 26.0], dizzy: 26.0, l5: 27.3, closeC: 30.3,
  fact: 30.6, factDur: 4.4,
  l6: 35.5, l7: 38.7, closeD: 42.0, beat: 40.6,
  round2: 42.2, perfect: [43.3, 44.4, 45.5], sync: 45.6,
  home: 46.6, mc2: 48.0, hug: 48.3, l8: 48.6, closeE: 51.9,
  last: 52.2, lastOut: [55.2, 55.55],
}
const SATN = SATURN.tag, LEON = '♌ LEO', AQUN = '♒ AQUARIUS · CAPCOM', REGN = '★ REGULUS'
const LINES = [
  { t: T.l1, speaker: SATN, text: 'Mission 05: *Regulus*, the lion’s heart star.', color: SATURN.tagColor },
  { t: T.l2, speaker: LEON, text: 'i want a dance-off with my *heart star.*', color: '#ffc27a' },
  { t: T.l3, speaker: AQUN, text: 'copy. i made you a *playlist.*', color: '#8fe3ff' },
  { t: T.l4, speaker: REGN, text: 'a visitor! do you *dance?*', color: '#cfe0ff' },
  { t: T.l5, speaker: LEON, text: 'how do you spin so *fast?!*', color: '#ffc27a' },
  { t: T.l6, speaker: REGN, text: 'fast is *my* speed. what’s yours?', color: '#cfe0ff' },
  { t: T.l7, speaker: AQUN, text: 'try half time, babe. *feel* the beat.', color: '#8fe3ff' },
  { t: T.l8, speaker: AQUN, text: 'you came back *glowing.*', color: '#8fe3ff' },
]
const CPS = 28
const BOXES = [
  { lines: [0, 1, 2], open: T.l1 - 0.2, close: T.closeA },
  { lines: [3], open: T.l4 - 0.2, close: T.closeB },
  { lines: [4], open: T.l5 - 0.2, close: T.closeC },
  { lines: [5, 6], open: T.l6 - 0.2, close: T.closeD },
  { lines: [7], open: T.l8 - 0.2, close: T.closeE },
]
const LEO_HOPS = [0.15, 0.6, 1.05, ...talkHops(LINES, LEON, { cps: CPS }), T.arrive + 0.2, T.round1 + 0.1, T.mc2 + 0.1, T.hug, T.last, T.last + 0.5]
const AQU_HOPS = [...talkHops(LINES, AQUN, { cps: CPS }), T.mc2 + 0.2, T.mc2 + 0.6, T.last + 0.2]
const REG_HOPS = [...talkHops(LINES, REGN, { cps: CPS }), T.arrive + 0.1, T.sync]
const SAT_HOPS = [...talkHops(LINES, SATN, { cps: CPS }), T.mc2 + 0.1, T.mc2 + 0.7]

// where each part of the story happens
const scene = t => t < T.cutMC ? 'pad' : t < T.warp ? 'mc' : t < T.inside ? 'warp' : t < T.arrive ? 'inside'
  : t < T.home ? 'regulus' : t < T.mc2 ? 'warpHome' : t < T.last ? 'mc' : 'pad'
const SHOTS = [
  { t: 0, x: 540, y: 960, s: 1 },
  { t: T.cutMC, x: 540, y: 960, s: 1 },
  { t: T.feed, x: 540, y: 700, s: 1.22 },
  { t: T.cutAqu, x: 780, y: 1180, s: 1.18 },
  { t: T.warp, x: 540, y: 960, s: 1 },
  { t: T.inside, x: 540, y: 960, s: 1.04 },
  { t: T.arrive, x: 540, y: 900, s: 1.12 },
  { t: T.l4 + 0.6, x: 540, y: 960, s: 1, ease: 1.2 },
  { t: T.dizzy, x: 540, y: 960, s: 1.05 },
  { t: T.fact, x: 540, y: 820, s: 1.06 },
  { t: T.l6, x: 540, y: 960, s: 1 },
  { t: T.l7, x: 540, y: 1100, s: 1.08 },
  { t: T.round2, x: 540, y: 960, s: 1 },
  { t: T.sync, x: 540, y: 1000, s: 1.08 },
  { t: T.home, x: 540, y: 960, s: 1 },
  { t: T.mc2, x: 540, y: 960, s: 1 },
  { t: T.hug, x: 560, y: 1060, s: 1.06, ease: 0.8 },
  { t: T.last, x: 540, y: 960, s: 1 },
]
export const GHOST = { at: T.ghost, x: 300, y: 1110, where: 'leaning out of the strapped GLITTER crate inside Leo’s rocket, bottom left (the stowaway)' }

// ── helpers that wrap the season's kit (st11space) in this episode's framing
function rocket(x, t, cx, cy, size, o = {}, rot = 0) {
  return drawRocket(x, cx, cy, size, t, { color: LEO.color, pilot: LEO.color, rot, ...o })
}
/** Leo in its suit, crown floating inside the bubble helmet (the season-3 crown: rewatch bait). spin = rotation (rad). */
function leoSuit(x, t, cx, cy, size, o = {}, spin = 0) {
  x.save(); x.translate(cx, cy); x.rotate(spin)
  const r = drawSpaceSuit(x, 0, 0, size, t, { sign: 'leo', helmet: true, color: LEO.color, glyph: LEO.glyph, seed: 4, ...o })
  const p = o.pop ?? 1
  if (p > 0.05 && r) {
    const cell = Math.max(3, Math.round(size * p / 34)), hy = r.helmet ? r.helmet.y - r.helmet.r * 0.62 : r.top + cell * 3
    drawCrown(x, Math.round(r.x + Math.sin(t * 1.3) * size * 0.06), Math.round(hy + Math.sin(t * 1.7) * cell * 1.5), cell, { rot: -0.2 + 0.25 * Math.sin(t * 0.9) })
  }
  x.restore()
  return r ? { ...r, x: r.x + cx, y: r.y + cy, top: r.top + cy } : { x: cx, y: cy, size, top: cy - size / 2 }
}
function aqua(x, t, cx, cy, size, o = {}) {
  const r = drawStarChar(x, cx, cy, size, t, { color: AQU.color, glyph: size >= 120 ? AQU.glyph : null, seed: 11, ...o })
  drawAquaHeadphones(x, r, size, { k: 0, alpha: o.alpha ?? 1 })
  return r
}
/** Regulus: a big blue-white star, squished at the poles by its spin, with equator streaks and a face */
function regulus(x, t, cx, cy, r, o = {}) {
  const spin = o.spinK ?? 1
  x.save(); x.translate(cx, cy); x.scale(1, 0.34)
  speedLines(x, t, 0, 0, r * 1.12, r * 1.4, 0.7 * spin, 'rgba(220,235,255,0.75)', 8)
  x.restore()
  const res = drawStarBall(x, cx, cy, r, t, { color: REG_COL, squish: 0.3, corona: 1.2, face: o.face ?? 'happy', look: o.look ?? [0, 1], seed: 21, pop: o.pop ?? 1 })
  x.save(); x.translate(cx, cy); x.scale(1, 0.62)
  for (let i = 0; i < 4; i++) {
    const a = (t * 7 * spin + i * 1.6) % (Math.PI * 2)
    if (Math.sin(a) < 0.15) continue
    x.globalAlpha = 0.4 * Math.sin(a) * spin
    R(x, Math.cos(a) * r * 0.8 - 30, (i - 1.5) * r * 0.36, 60, 14, '#ffffff')
  }
  x.restore()
  return { x: cx, y: cy, size: r * 2, r: res.r }
}
/** the dance-off HUD: the banner, two plates with meters, and the judgement pops */
function danceHUD(x, t, { round, title, leoBar, regBar, alpha = 1 }) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha = alpha
  const bk = pop01(t, round, 0.35, 2.2)
  x.save(); x.translate(540, 390); x.scale(bk, bk); x.rotate(-0.03)
  R(x, -330, -62, 660, 124, INK); R(x, -322, -54, 644, 108, '#ff4fd8'); R(x, -322, -54, 644, 12, '#ff9be9')
  x.font = `800 74px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(title, 4, 6); x.fillStyle = '#fff6fd'; x.fillText(title, 0, 0)
  x.restore()
  for (const [i, name, v, col] of [[0, 'LEO', leoBar, LEO.color], [1, 'REGULUS', regBar, REG_COL]]) {
    const px = i ? 580 : 90
    R(x, px - 6, 520, 422, 50, INK); R(x, px, 526, 410, 38, '#1e1838')
    R(x, px + 6, 532, Math.round(398 * clamp(v)), 26, col)
    x.font = `700 28px ${MONO}`; x.textAlign = i ? 'right' : 'left'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText(name, i ? px + 410 : px, 497); x.fillStyle = col; x.fillText(name, i ? px + 408 : px - 2, 494)
  }
  x.restore()
}
function judge(x, t, at, text, cx, cy, col) {
  const p = prog(t, at, at + 0.9)
  if (p <= 0 || p >= 1) return
  x.save(); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.6, 1)); x.translate(cx, cy - p * 60); const s = pop01(t, at, 0.2, 2.6); x.scale(s, s); x.rotate(-0.08)
  x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(text, 4, 6); x.fillStyle = col; x.fillText(text, 0, 0)
  x.restore()
}
function beatRings(x, t, cx, cy, from, k = 1) {
  if (t < from || k <= 0) return
  const n = Math.floor((t - from) / (BEAT * 2)), ph = ((t - from) / (BEAT * 2)) % 1
  x.save(); x.globalAlpha = k * (1 - ph) * 0.7; x.strokeStyle = n % 2 ? CYAN : '#ff9be9'; x.lineWidth = 10
  x.beginPath(); x.ellipse(cx, cy, 120 + ph * 260, (120 + ph * 260) * 0.36, 0, 0, Math.PI * 2); x.stroke(); x.restore()
}

function leoState(t) {
  if (t < T.go) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.arrive) return t > T.inside ? { mood: 'happy', look: [0, 0] } : { mood: 'happy', look: [0, 0] }
  if (t < T.round1) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.miss[0]) return { mood: 'squint', look: [0, -1] }
  if (t < T.l6) return { mood: 'wide', look: [Math.cos(t * 7), Math.sin(t * 7)], blink: false }
  if (t < T.l7) return { mood: 'neutral', look: [0, -1] }
  if (t < T.round2) return { mood: 'squint', look: [1, -1] }
  if (t < T.home) return { mood: 'happy', look: [0, -1] }
  if (t < T.last) return { mood: 'heart', look: [1, 0] }
  return { mood: 'sparkle', look: [1, -1] }
}
/** Leo's spin angle in the dance-off: speeding up, then a dizzy wobble, then still */
function leoSpin(t) {
  if (t < T.spin[0] || t >= T.l6) return 0
  if (t < T.spin[1]) { const d = t - T.spin[0]; return 2.6 * d * d }
  const d0 = T.spin[1] - T.spin[0], a0 = 2.6 * d0 * d0, v0 = 5.2 * d0, d = t - T.spin[1]
  const coast = v0 * (1 - Math.exp(-d * 1.4)) / 1.4
  return a0 + coast + Math.sin(d * 5) * 0.25 * Math.exp(-d * 0.5)
}

async function build(stage) {
  try { await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "600 34px Inter", "800 74px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Leo’s star spins so fast it’s *squished*.', at: 0, out: T.hookOut, top: 190, size: 100, accentSize: 150, accentColor: GOLD })
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines.map(i => LINES[i]), y: 1560, width: 960, height: 240, open: b.open, close: b.close, cps: CPS }))
  const last = lastLine(root, 'Spin *your* speed.', { at: T.last, lateAt: T.last + 0.5, top: 300, size: 116, accentSize: 176 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function pad(t) {
    const end = t >= T.last
    const { padY, rocketX } = launchPad(x, t, { rocketX: 700 })
    // the rocket: on the pad, then the climb (the camera stays; it leaves the top of the frame)
    const lp = end ? 0 : ease.inCubic(prog(t, ...T.lift))
    const shake = !end && t > T.count[1] && t < T.lift[1] ? clamp((t - T.count[1]) / 1.4) : 0
    if (!end && t > T.go - 0.4) {
      // the exhaust cloud on the pad
      for (let i = 0; i < 9; i++) {
        const k = prog(t, T.go - 0.4 + i * 0.05, T.go + 1.4), r = 60 + k * 160
        x.save(); x.globalAlpha = 0.8 * (1 - prog(t, T.lift[1] - 0.4, T.lift[1] + 0.2)); x.fillStyle = i % 2 ? '#d9cfe8' : '#b9aecb'
        x.beginPath(); x.arc(rocketX + (i - 4) * (40 + k * 60), padY - 10 - k * 30 * (i % 3), r * 0.5, 0, Math.PI * 2); x.fill(); x.restore()
      }
    }
    rocket(x, t, rocketX, padY - 330 - lp * 1900, 620, { flame: end ? 0 : clamp((t - T.go + 0.3) * 2), shake: shake * 5, smoke: end ? 0 : clamp((t - T.go + 0.6) * 1.5) * (1 - lp), trail: lp })
    // Leo, mid-pose at frame 0 (a big wave), zipping up to the hatch on "1"; at the end it's back with Aquarius beside it
    if (!end) {
      const up = ease.inCubic(prog(t, T.count[2], T.count[2] + 0.55))
      if (up < 1) leoSuit(x, t, lerp(350, rocketX - 60, up), lerp(1360, padY - 560, up), 420 * (1 - 0.7 * up), { ...leoState(t), hops: LEO_HOPS })
      sparkles(x, t, 350, 1300, 0.05, 10, 230, 0.4)
    } else {
      const k = pop01(t, T.last - 0.05, 0.35)
      aqua(x, t, 120 + 330 * 0 + 560, 1400, 280, { mood: 'heart', look: [-1, 0], pop: k, hops: AQU_HOPS })
      leoSuit(x, t, 330, 1360, 400, { ...leoState(t), hops: LEO_HOPS })
      floatHearts(x, t, 470, 1180, T.last + 0.4, STORY_END, 3)
    }
    drawCountdown(x, t, { at: T.count[0], x: 820, y: 760, size: 220 })
  }
  function mc(t, end) {
    // the big screen: Leo's live feed from the rocket (then, at the end, the cheering)
    const feed = (c, rect) => {
      c.fillStyle = '#0a1630'; c.fillRect(rect.x, rect.y, rect.w, rect.h)
      starfield(c, t, { speed: 0.6, dir: 'right', cx: rect.x + rect.w / 2, cy: rect.y + rect.h / 2 })
      leoSuit(c, t, rect.x + rect.w * 0.5, rect.y + rect.h * 0.58, 360, { ...leoState(t), mood: t > T.l2 ? 'sparkle' : 'happy', hops: LEO_HOPS })
      c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = RED; c.fillText('● LIVE · ROCKET 05', rect.x + 24, rect.y + 34)
    }
    const mcr = drawMissionControl(x, t, { mission: 'MISSION 05', screens: end ? { big: 'track', progress: 1, target: 'REGULUS', text: 'WELCOME HOME, LEO' } : { big: feed }, cheer: end ? 1 : 0, cheerAt: T.mc2 })
    const [dx, dy] = mcr.spots.director, [rx, ry] = mcr.spots.right
    if (!end) {
      // Saturn, the flight director, in front of the screen; Aquarius at CAPCOM (front right)
      drawSaturn(x, 250, dy + 60, 240, t, { mood: t < T.feed ? 'neutral' : 'happy', look: [1, -1], hops: SAT_HOPS, prop: 'book' })
      aqua(x, t, rx, ry + 40, 230, { mood: t > T.l3 ? 'happy' : 'neutral', look: [-1, -1], hops: AQU_HOPS })
      // the LEO LIVE sticker on the console (rewatch bait)
      x.save(); x.translate(rx + 40, ry + 190); x.rotate(0.08); R(x, -66, -20, 132, 40, INK); R(x, -62, -16, 124, 32, LEO.color)
      x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('LEO LIVE ★', 0, 1); x.restore()
      void dx
    } else {
      // home: everybody cheers, and Aquarius hugs Leo
      drawSaturn(x, 190, dy + 40, 220, t, { mood: 'happy', look: [1, 0], hops: SAT_HOPS })
      const hk = ease.inOutCubic(prog(t, T.hug - 0.1, T.hug + 0.5))
      const lr = leoSuit(x, t, lerp(980, 640, ease.outCubic(prog(t, T.mc2, T.mc2 + 0.6))), 1220, 320, { ...leoState(t), hops: LEO_HOPS })
      aqua(x, t, lerp(420, 520, hk), 1240, 260, { mood: t > T.hug ? 'heart' : 'wide', look: [1, 0], hops: AQU_HOPS })
      if (t > T.hug) floatHearts(x, t, 580, 1080, T.hug, T.last, 7, 6)
      sparkles(x, t, lr.x, lr.y, T.mc2 + 0.6, 12, 220, 0.3)
    }
  }
  function warp(t, back) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    const p = prog(t, back ? T.home : T.warp, back ? T.mc2 : T.inside)
    const ang = back ? Math.PI * 0.75 : -Math.PI / 4
    starfield(x, t, { speed: 3, warp: clamp(p * 3) * (1 - prog(p, 0.85, 1)), dir: ang })
    rocket(x, t, lerp(back ? 820 : 260, back ? 260 : 820, p), lerp(back ? 640 : 1300, back ? 1300 : 640, p), 420, { flame: 1.2, trail: 1 }, ang + Math.PI / 2)
    missionHUD(x, t, { mission: 'MISSION 05', target: 'REGULUS', distance: 'ABOUT 79 LIGHT-YEARS', status: back ? 'RETURNING HOME' : 'EN ROUTE' })
  }
  function inside(t) {
    const cp = cockpit(x, t, { tint: '#3a2a20', accent: LEO.color, crate: 'GLITTER', window: (c) => { starfield(c, t, { speed: 3, warp: 1 }) } })
    drawGhostCameo(x, t, { x: cp.crate.x + cp.crate.w, y: cp.crate.y + 70, at: GHOST.at, dur: 1.5, from: 'left', cell: 4 })
    // Leo vibing to the playlist, bobbing on the beat
    const b = Math.abs(Math.sin((t - T.inside) * Math.PI / BEAT))
    leoSuit(x, t, 620, 1180 - b * 18, 380, { mood: 'happy', look: [0, 0], squash: 0.05 * b })
    for (let i = 0; i < 3; i++) { const p = ((t - T.inside) * 0.8 + i * 0.33) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.font = `700 54px ${MONO}`; x.fillStyle = [GOLD, PINK, CYAN][i]; x.fillText('♪', 780 + i * 60, 980 - p * 160); x.restore() }
  }
  function space(t) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    starfield(x, t, { speed: 0.25 })
    const ap = ease.outCubic(prog(t, T.arrive, T.arrive + 1.2))
    // Regulus up top: big, squished, spinning; Leo's rocket parked at the right
    const factOn = t >= T.fact && t < T.l6
    const regY = lerp(560, 760, ap), regS = lerp(150, 270, ap)
    rocket(x, t, 960, 1150, 300, { flame: 0, shake: 0 }, 0.25)
    const rr = regulus(x, t, 540, regY, regS, { face: t < T.l6 ? (t < T.dizzy ? 'happy' : 'wide') : 'happy', look: [0, 1], spinK: 1, pop: pop01(t, T.arrive, 0.5, 1.6) })
    // the dance-off
    // Leo: spinning faster (round 1), dizzy, still, then a big slow half-time sway (round 2)
    const sp = leoSpin(t)
    const half = t >= T.round2 ? Math.sin((t - T.round2) * Math.PI / (BEAT * 2)) : 0
    const ly = 1320, lx = 540 + half * 40
    beatRings(x, t, lx, ly + 170, T.beat, t < T.home ? 1 : 0)
    speedLines(x, t, lx, ly, 200, 260, t > T.spin[0] && t < T.dizzy + 0.8 ? clamp(prog(t, T.spin[0], T.spin[0] + 2)) : 0, 'rgba(255,214,150,0.8)')
    const lr = leoSuit(x, t, lx, ly, 360, { ...leoState(t), hops: LEO_HOPS }, sp + half * 0.18)
    if (factOn) diagram(t, rr)
    if (t > T.dizzy && t < T.l6) dizzy(x, t, lr.x, lr.top + 10, 120, 1 - prog(t, T.l6 - 0.5, T.l6))
    if (t > T.sync) floatHearts(x, t, 540, 1150, T.sync, T.home, 5, 6, 300)
    sparkles(x, t, rr.x, rr.y, T.arrive + 0.1, 14, 340, 0.2, [REG_COL, BONE, CYAN, GOLD])
    sparkles(x, t, lr.x, lr.y, T.sync, 14, 260, 1.4)
    // Aquarius on the radio (the half-time tip)
    feedPanel(x, t, 820, 1000, 300, 230, '● CAPCOM', (c) => { R(c, 670, 885, 300, 230, '#123a4a'); aqua(c, t, 820, 1030, 190, { mood: 'happy', look: [-1, 0], hops: AQU_HOPS }) },
      { alpha: t < T.l7 - 0.2 ? 0 : pop01(t, T.l7 - 0.2, 0.3) * (1 - prog(t, T.closeD - 0.3, T.closeD)) })
  }
  function spaceHUD(t) {
    const dk = t >= T.round1 && t < T.fact ? 1 : t >= T.round2 && t < T.home ? 1 : 0
    const leoBar = t < T.round2 ? clamp(prog(t, T.spin[0], T.miss[0]) * 0.7 - prog(t, T.miss[0], T.dizzy) * 0.5) : clamp(0.2 + prog(t, T.round2, T.sync) * 0.8)
    const regBar = t < T.round2 ? 0.92 : 1
    danceHUD(x, t, { round: t < T.round2 ? T.round1 : T.round2, title: t < T.round2 ? 'DANCE-OFF!' : 'ROUND 2 · DUET', leoBar, regBar, alpha: dk })
    T.miss.forEach((m, i) => judge(x, t, m, i < 2 ? 'MISS' : 'DIZZY!', 790 - i * 40, 1050 - i * 40, RED))
    T.perfect.forEach((m, i) => judge(x, t, m, 'PERFECT!', i % 2 ? 300 : 780, 1080, MINT))
    judge(x, t, T.sync, 'SYNC 100%', 540, 1000, GOLD)
    if (dk) { /* the dance HUD owns the top */ } else if (t < T.round1) missionHUD(x, t, { mission: 'MISSION 05', target: 'REGULUS', distance: 'ABOUT 79 LIGHT-YEARS', status: 'ARRIVED' })
  }
  /** the fact's diagram: the equator is wider than pole to pole */
  function diagram(t, rr) {
    const k = ease.outCubic(prog(t, T.fact + 0.2, T.fact + 0.8)) * (1 - prog(t, T.l6 - 0.3, T.l6))
    if (k <= 0) return
    const w = rr.r * 2 * k, h = rr.r * 2 * 0.7 * k, cy = rr.y
    x.save(); x.globalAlpha = k; x.strokeStyle = GOLD; x.fillStyle = GOLD; x.lineWidth = 8
    const arrow = (x0, y0, x1, y1) => {
      x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke()
      for (const [ax, ay, bx, by] of [[x0, y0, x1, y1], [x1, y1, x0, y0]]) { const a = Math.atan2(by - ay, bx - ax); x.beginPath(); x.moveTo(ax, ay); x.lineTo(ax + Math.cos(a + 0.5) * 30, ay + Math.sin(a + 0.5) * 30); x.lineTo(ax + Math.cos(a - 0.5) * 30, ay + Math.sin(a - 0.5) * 30); x.closePath(); x.fill() }
    }
    arrow(540 - w / 2, cy + rr.r * 0.95, 540 + w / 2, cy + rr.r * 0.95)
    x.strokeStyle = CYAN; x.fillStyle = CYAN; arrow(540 + rr.r * 1.25, cy - h / 2, 540 + rr.r * 1.25, cy + h / 2)
    x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tag = (s, tx, ty, col) => { const tw = x.measureText(s).width + 28; R(x, tx - tw / 2, ty - 24, tw, 48, INK); x.fillStyle = col; x.fillText(s, tx, ty + 1) }
    tag('WIDER ↔', 540, cy + rr.r * 0.95 + 52, GOLD)
    tag('SHORTER ↕', 540 + rr.r * 1.25 - 40, cy - h / 2 - 44, CYAN)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      const sc = scene(t)
      if (sc === 'pad') pad(t)
      else if (sc === 'mc') mc(t, t >= T.mc2)
      else if (sc === 'warp') warp(t, false)
      else if (sc === 'warpHome') warp(t, true)
      else if (sc === 'inside') inside(t)
      else space(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      if (scene(t) === 'regulus') spaceHUD(t)
      factChip(x, t, { text: 'Regulus is about 79 light-years away and spins so fast it’s flattened: wider at its equator than pole to pole.', at: T.fact, dur: T.factDur, y: 1640, w: 900, label: '★ REAL SKY' })
      hook.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutMC, kind: 'flip' }, { t: T.arrive, kind: 'flip' }, { t: T.mc2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E05' }), cardCuts(CUTS)]

const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count[0]).filter(c => c[1] >= 0.1), ...launchCues(T.go),
  ['whoosh', T.cutMC - 0.1, 0.3, 0.03], ['tick', T.cutMC, 0.05],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [LEON]: 740, [AQUN]: 880, [REGN]: 1046.5 } }),
  ['pop', T.feed, 987.77, 0.035, 0], ['tick', T.cutAqu, 0.04],
  ...warpCues(T.warp),
  ['tick', T.inside, 0.05], ['tick', T.ghost + 0.05, 0.015],
  ['boom', T.arrive, 0.18], ['glitter', T.arrive, T.arrive + 0.9], ['bell', T.arrive + 0.1, 1318.51, 0.035, 1.6, 0],
  ['pop', T.round1, 1318.51, 0.05, 0], ['crash', T.round1, { gain: 0.04, len: 1.6 }],
  ['riser', T.spin[0], T.miss[0], 0.05],
  ...T.miss.map(m => ['pop', m, 392, 0.05, 0.3]),
  ['tapeStop', T.dizzy, 0.6],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pluck', T.beat, 659.25, 0.04, 0.5, 0], ['pluck', r3(T.beat + BEAT * 2), 659.25, 0.035, 0.5, 0],
  ['pop', T.round2, 1318.51, 0.05, 0], ['crash', T.round2, { gain: 0.04, len: 1.6 }],
  ...T.perfect.map((m, i) => ['pop', m, NOTE[(i * 2) % NOTE.length] * 2, 0.045, i % 2 ? -0.3 : 0.3]),
  ['glitter', T.sync, T.sync + 0.8], ['bell', T.sync + 0.05, 1975.53, 0.03, 1.4, 0],
  ...warpCues(T.home),
  ...cheerCues(T.mc2, { len: 2.4 }),
  ['bell', T.hug + 0.3, 1318.51, 0.03, 1.4, 0],
  ['pop', T.last, 987.77, 0.04, 0], ['pop', r3(T.last + 0.5), 1318.51, 0.05, 0], ['pluck', r3(T.last + 0.55), 1318.51, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void PINK; void drawPixelStar; void INTER
