// st11libra (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E07: Libra · MISSION 07 · Gliese 581) · story
// 0–55.6, then the shared end card.
//   0.00  HOOK. The Houston launch pad: Libra in its suit mid-weigh, the brass scale (season 9) tipping between a tiny HOT
//         world and a tiny COLD one; Aries already in the rocket's porthole. The countdown is on "3".
//         Hook: "Libra is shopping for a *planet*."  2 · 1 · LIFTOFF at 2.45.
//   4.20  WANT. Houston Mission Control. SATURN: "Mission 07: Gliese 581, a red dwarf in *Libra.*"  On the feed, Libra and
//         Aries: "we're shopping for a *planet.* for two."  ARIES: "first one we see. *done.*"
//  13.80  the warp (the ghost peeks out from behind the hull); 15.6 inside: the twin vases, the crate labelled PAIRS.
//  17.60  TRY. "HOUSE HUNTING · IN SPACE" (a home-tour show parody). The red dwarf. SPOT A, "SUN-DRENCHED": ARIES: "this one!
//         *sold!*" The thermometer pops: WATER BOILS · TOO HOT. SPOT B, "QUIET VIEWS": WATER FREEZES · TOO COLD. The scale
//         swings. LIBRA: "too hot. too cold. i can't *choose.*"
//  30.60  TURN. The map: the hot zone, the cold zone, and the green ring between. ★ REAL SKY: Gliese 581 is a red dwarf in
//         Libra about 20 light-years away, with known planets; the habitable or "Goldilocks" zone is where liquid water could
//         exist.  SATURN (radio): "it's not a guess. it's a *distance.*"  LIBRA: "not too hot. not too cold. *just right.*"
//  42.20  WIN. The rocket eases into the green ring. LIBRA (asking, the healthy Libra): "what do *you* want?"  Then the porch:
//         the two of them side by side in the red-dwarf glow, Aries: "ANYWHERE WITH YOU", the scale levels, hands held.
//  46.60  the trip home; 48.0 Mission Control cheers. SATURN: "welcome home. you found the *middle.*"
//  52.20  LAST LINE on frame 0's framing, the scale now level, Aries beside Libra: "*Balance* is a place you find."
//   The listing spots are spots at a distance from the star, not named planets: the brief's facts are the star, its
//   distance, that it has known planets, and what the Goldilocks zone is. Rewatch bait: the twin vases (one rose, one mint,
//   season 9) ride along; the crate says PAIRS; the SOLD sticker on SPOT C is heart-shaped. The ghost: 14.4 behind the hull,
//   and 16.0 leaning out of the PAIRS crate.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { drawLibraScale, drawLibraVases } from '../../st9librahome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet, drawStarBall, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { GOLD, BONE, PINK, INK, CYAN, MINT, RED, MONO, INTER, r3, R, pop01, outK, camAt, camApply, sparkles, floatHearts,
  lastLine, pixelBubble, launchPad, cockpit, drawHeart } from '../st11kit.js'

export const DURATION = 60
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const LIB = signStar('libra'), ARI = signStar('aries')
const DWARF = '#ff7a4a', HOT = '#ff5d3a', COLD = '#7fc8ff', ZONE = '#7dff9a'

const T = {
  count: [-0.25, 0.65, 1.55], go: 2.45, hookOut: 2.9, lift: [2.5, 4.2],
  cutMC: 4.2, l1: 4.5, feed: 7.7, l2: 7.9, l3: 11.0, closeA: 13.7,
  warp: 13.8, inside: 15.6, ghost: 16.0,
  arrive: 17.6, show: 18.0, spotA: 18.8, l4: 19.3, hot: 21.8, closeB: 22.5,
  spotB: 22.8, cold: 25.2, swing: 26.0, l5: 26.6, closeC: 30.3,
  fact: 30.6, factDur: 4.4,
  l6: 35.4, l7: 38.5, closeD: 42.0,
  win: 42.2, l8: 42.4, closeE: 45.6, porch: 44.4, bubble: 44.8, level: 45.2, hold: 45.6,
  home: 46.6, mc2: 48.0, l9: 48.4, closeF: 51.9,
  last: 52.2, lastOut: [55.2, 55.55],
}
const SATN = SATURN.tag, LIBN = '♎ LIBRA', ARIN = '♈ ARIES'
const LINES = [
  { t: T.l1, speaker: SATN, text: 'Mission 07: Gliese 581, a red dwarf in *Libra.*', color: SATURN.tagColor },
  { t: T.l2, speaker: LIBN, text: 'we’re shopping for a *planet.* for two.', color: '#f4a0ec' },
  { t: T.l3, speaker: ARIN, text: 'first one we see. *done.*', color: '#ff9a7a' },
  { t: T.l4, speaker: ARIN, text: 'this one! *sold!*', color: '#ff9a7a' },
  { t: T.l5, speaker: LIBN, text: 'too hot. too cold. i can’t *choose.*', color: '#f4a0ec' },
  { t: T.l6, speaker: SATN, text: 'it’s not a guess. it’s a *distance.*', color: SATURN.tagColor },
  { t: T.l7, speaker: LIBN, text: 'not too hot. not too cold. *just right.*', color: '#f4a0ec' },
  { t: T.l8, speaker: LIBN, text: 'what do *you* want?', color: '#f4a0ec' },
  { t: T.l9, speaker: SATN, text: 'welcome home. you found the *middle.*', color: SATURN.tagColor },
]
const CPS = 28
const BOXES = [
  { lines: [0, 1, 2], open: T.l1 - 0.2, close: T.closeA },
  { lines: [3], open: T.l4 - 0.2, close: T.closeB },
  { lines: [4], open: T.l5 - 0.2, close: T.closeC },
  { lines: [5, 6], open: T.l6 - 0.2, close: T.closeD },
  { lines: [7], open: T.l8 - 0.2, close: T.closeE },
  { lines: [8], open: T.l9 - 0.2, close: T.closeF },
]
const LIB_HOPS = [0.2, 0.7, 1.2, ...talkHops(LINES, LIBN, { cps: CPS }), T.arrive + 0.2, T.level, T.mc2 + 0.2, T.last, T.last + 0.5]
const ARI_HOPS = [0.1, 0.5, 0.9, 1.3, ...talkHops(LINES, ARIN, { cps: CPS }), T.spotA + 0.1, T.spotA + 0.4, T.bubble, T.mc2 + 0.3, T.mc2 + 0.8, T.last + 0.2]
const SAT_HOPS = [...talkHops(LINES, SATN, { cps: CPS }), T.mc2 + 0.1, T.mc2 + 0.7]

const scene = t => t < T.cutMC ? 'pad' : t < T.warp ? 'mc' : t < T.inside ? 'warp' : t < T.inside + 2 && t < T.arrive ? 'inside'
  : t < T.spotA ? 'system' : t < T.fact ? 'listing' : t < T.porch ? 'map' : t < T.home ? 'porch' : t < T.mc2 ? 'warpHome' : t < T.last ? 'mc' : 'pad'
const SHOTS = [
  { t: 0, x: 540, y: 960, s: 1 },
  { t: T.cutMC, x: 540, y: 960, s: 1 },
  { t: T.feed, x: 540, y: 700, s: 1.2 },
  { t: T.l3, x: 700, y: 700, s: 1.28 },
  { t: T.warp, x: 540, y: 960, s: 1 },
  { t: T.inside, x: 540, y: 960, s: 1.04 },
  { t: T.arrive, x: 540, y: 900, s: 1.1 },
  { t: T.spotA, x: 540, y: 960, s: 1 },
  { t: T.hot, x: 540, y: 900, s: 1.08 },
  { t: T.spotB, x: 540, y: 960, s: 1 },
  { t: T.cold, x: 540, y: 900, s: 1.08 },
  { t: T.swing, x: 540, y: 1200, s: 1.12 },
  { t: T.fact, x: 540, y: 960, s: 1 },
  { t: T.l7, x: 540, y: 880, s: 1.06 },
  { t: T.win, x: 540, y: 960, s: 1 },
  { t: T.porch, x: 540, y: 960, s: 1 },
  { t: T.hold, x: 540, y: 1150, s: 1.1, ease: 0.8 },
  { t: T.home, x: 540, y: 960, s: 1 },
  { t: T.mc2, x: 540, y: 960, s: 1 },
  { t: T.last, x: 540, y: 960, s: 1 },
]
export const GHOST = { at: T.ghost, x: 300, y: 1110, where: 'leaning out of the PAIRS crate inside Libra’s rocket, bottom left (the stowaway); it also peeks out from behind the hull in the warp' }

function rocket(x, t, cx, cy, size, o = {}) {
  return drawRocket(x, cx, cy, size, t, { color: LIB.color, pilot: ARI.color, ...o })
}
const libraSuit = (x, t, cx, cy, size, o = {}) => drawSpaceSuit(x, cx, cy, size, t, { sign: 'libra', helmet: true, seed: 7, ...o })
const ariesSuit = (x, t, cx, cy, size, o = {}) => drawSpaceSuit(x, cx, cy, size, t, { sign: 'aries', helmet: true, seed: 1, ...o })
/** Libra's scale, tipping: tilt −1…1 (−1 = the left pan down) */
const tinyWorld = (kind) => (c, px, py) => drawPlanet(c, px, py - 22, 20, 0, { kind, glow: 0.3 })
function scale(x, t, cx, base, cell, tilt, items = true) {
  return drawLibraScale(x, t, cx, base, cell, tilt, items ? { left: tinyWorld('hot'), right: tinyWorld('ice') } : {})
}
/** the scale's tilt through the episode */
function tiltAt(t) {
  if (t < T.go) return Math.sin(t * 3.2) * 0.8
  if (t < T.spotA) return 0.2 * Math.sin(t * 1.5)
  if (t < T.spotB) return -0.7
  if (t < T.swing) return 0.7
  if (t < T.fact) return Math.sin(t * 6) * 1
  if (t < T.level) return Math.sin(t * 2.4) * 0.5 * (1 - prog(t, T.l7, T.level))
  return 0
}

/** the home-tour show's listing card (screen space) */
function listingCard(x, t, at, { spot, name, note, stamp, stampAt, color }) {
  const k = pop01(t, at, 0.35, 2)
  if (k <= 0) return
  x.save(); x.translate(540, 360); x.scale(k, k); x.rotate(-0.02)
  R(x, -380, -96, 760, 192, INK); R(x, -372, -88, 744, 176, '#fbf3e6'); R(x, -372, -88, 744, 40, color)
  x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText(`LISTING · ${spot}`, -350, -67)
  x.font = `800 58px ${INTER}`; x.fillText(name, -350, -6)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#5c5480'; x.fillText(note, -350, 56)
  x.restore()
  if (stamp && t > stampAt) {
    const s = 1 + 0.6 * (1 - ease.outCubic(prog(t, stampAt, stampAt + 0.2)))
    x.save(); x.translate(780, 540); x.rotate(-0.22); x.scale(s, s); x.globalAlpha = clamp((t - stampAt) * 6)
    x.strokeStyle = stamp === 'SOLD ♡' ? PINK : RED; x.lineWidth = 10; x.strokeRect(-150, -48, 300, 96)
    x.font = `800 54px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = x.strokeStyle; x.fillText(stamp, 0, 4)
    x.restore()
  }
}
/** a pixel thermometer (screen space), level 0…1 */
function thermo(x, t, cx, cy, level, color, k = 1) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  R(x, cx - 26, cy - 230, 52, 260, INK); R(x, cx - 18, cy - 222, 36, 244, '#fbf3e6')
  x.beginPath(); x.fillStyle = INK; x.arc(cx, cy + 50, 46, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.fillStyle = color; x.arc(cx, cy + 50, 36, 0, Math.PI * 2); x.fill()
  const h = 220 * clamp(level); R(x, cx - 10, cy + 22 - h, 20, h + 10, color)
  for (let i = 0; i < 6; i++) R(x, cx + 18, cy - 200 + i * 40, 14, 6, INK)
  x.restore()
}

function libState(t) {
  if (t < T.go) return { mood: 'squint', look: [Math.sign(Math.sin(t * 3.2)), 0] }
  if (t < T.arrive) return { mood: 'happy', look: [1, 0] }
  if (t < T.spotA) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.hot) return { mood: 'neutral', look: [1, 0] }
  if (t < T.spotB) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.cold) return { mood: 'squint', look: [0, -1] }
  if (t < T.fact) return { mood: 'wide', look: [Math.sin(t * 6), 0], blink: false }
  if (t < T.l7) return { mood: 'neutral', look: [0, -1] }
  if (t < T.win) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.hold) return { mood: 'happy', look: [1, 0] }
  if (t < T.last) return { mood: 'heart', look: [1, 0] }
  return { mood: 'happy', look: [1, 0] }
}
function ariState(t) {
  if (t < T.spotA) return { mood: 'happy', look: [-1, 0] }
  if (t < T.hot) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.spotB) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.fact) return { mood: 'squint', look: [-1, 0] }
  if (t < T.hold) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}

async function build(stage) {
  try { await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "600 34px Inter", "800 58px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Libra is shopping for a *planet*.', at: 0, out: T.hookOut, top: 190, size: 104, accentSize: 156, accentColor: '#f4a0ec' })
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines.map(i => LINES[i]), y: 1560, width: 960, height: 240, open: b.open, close: b.close, cps: CPS }))
  const last = lastLine(root, '*Balance* is a place you find.', { at: T.last, lateAt: null, top: 290, size: 104, accentSize: 164, accentColor: '#f4a0ec', late: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function pad(t) {
    const end = t >= T.last
    const { padY, rocketX } = launchPad(x, t, { rocketX: 720 })
    const lp = end ? 0 : ease.inCubic(prog(t, ...T.lift))
    const shake = !end && t > T.count[1] && t < T.lift[1] ? clamp((t - T.count[1]) / 1.4) : 0
    rocket(x, t, rocketX, padY - 330 - lp * 1900, 620, { flame: end ? 0 : clamp((t - T.go + 0.3) * 2), shake: shake * 5, smoke: end ? 0 : clamp((t - T.go + 0.6) * 1.5) * (1 - lp), trail: lp, pilot: end ? null : ARI.color })
    if (!end) {
      const up = ease.inCubic(prog(t, T.count[2], T.count[2] + 0.55))
      if (up < 1) {
        libraSuit(x, t, lerp(300, rocketX - 60, up), lerp(1300, padY - 560, up), 360 * (1 - 0.7 * up), { ...libState(t), hops: LIB_HOPS })
        if (up < 0.05) scale(x, t, 520, 1740, 8, tiltAt(t))
      }
    } else {
      ariesSuit(x, t, 760, 1440, 240, { ...ariState(t), pop: pop01(t, T.last - 0.05, 0.35), hops: ARI_HOPS })
      libraSuit(x, t, 300, 1300, 360, { ...libState(t), hops: LIB_HOPS })
      scale(x, t, 520, 1740, 8, 0)
      floatHearts(x, t, 470, 1160, T.last + 0.4, STORY_END, 3)
    }
    drawCountdown(x, t, { at: T.count[0], x: 840, y: 760, size: 220 })
  }
  function mc(t, end) {
    const feed = (c, rect) => {
      c.fillStyle = '#0a1630'; c.fillRect(rect.x, rect.y, rect.w, rect.h)
      starfield(c, t, { speed: 0.6, dir: 'right', cx: rect.x + rect.w / 2, cy: rect.y + rect.h / 2 })
      libraSuit(c, t, rect.x + rect.w * 0.34, rect.y + rect.h * 0.6, 320, { ...libState(t), mood: t > T.l2 ? 'sparkle' : 'happy', hops: LIB_HOPS })
      ariesSuit(c, t, rect.x + rect.w * 0.72, rect.y + rect.h * 0.64, 280, { mood: t > T.l3 ? 'sparkle' : 'happy', look: [-1, 0], hops: ARI_HOPS })
      c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = RED; c.fillText('● LIVE · ROCKET 07', rect.x + 24, rect.y + 34)
    }
    const mcr = drawMissionControl(x, t, { mission: 'MISSION 07', screens: end ? { big: 'track', progress: 1, target: 'GLIESE 581', text: 'WELCOME HOME, LIBRA + ARIES' } : { big: feed }, cheer: end ? 1 : 0, cheerAt: T.mc2 })
    const [, dy] = mcr.spots.director
    if (!end) drawSaturn(x, 250, dy + 60, 240, t, { mood: 'neutral', look: [1, -1], hops: SAT_HOPS, prop: 'book' })
    else {
      drawSaturn(x, 200, dy + 60, 220, t, { mood: 'happy', look: [1, 0], hops: SAT_HOPS })
      const ax = lerp(1000, 0, ease.outCubic(prog(t, T.mc2, T.mc2 + 0.7)))
      libraSuit(x, t, 560 + ax, dy + 260, 290, { ...libState(t), hops: LIB_HOPS })
      ariesSuit(x, t, 810 + ax, dy + 280, 260, { ...ariState(t), hops: ARI_HOPS })
      drawHeart(x, 690 + ax, dy + 360, 7)
    }
  }
  function warp(t, back) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    const p = prog(t, back ? T.home : T.warp, back ? T.mc2 : T.inside)
    const ang = back ? Math.PI * 0.75 : -Math.PI / 4
    starfield(x, t, { speed: 3, warp: clamp(p * 3) * (1 - prog(p, 0.85, 1)), dir: ang })
    rocket(x, t, lerp(back ? 820 : 260, back ? 260 : 820, p), lerp(back ? 640 : 1300, back ? 1300 : 640, p), 420, { flame: 1.2, trail: 1, rot: ang + Math.PI / 2, stowaway: back ? 0 : pop01(t, T.warp + 0.6) * (1 - pop01(t, T.warp + 1.4)) })
    missionHUD(x, t, { mission: 'MISSION 07', target: 'GLIESE 581', distance: 'ABOUT 20 LIGHT-YEARS', status: back ? 'RETURNING HOME' : 'EN ROUTE' })
  }
  function inside(t) {
    const cp = cockpit(x, t, { tint: '#3a2440', accent: LIB.color, crate: 'PAIRS', window: (c) => { starfield(c, t, { speed: 3, warp: 1 }) } })
    drawGhostCameo(x, t, { x: cp.crate.x + cp.crate.w, y: cp.crate.y + 70, at: GHOST.at, dur: 1.5, from: 'left', cell: 4 })
    drawLibraVases(x, t, 880, 1240, 5, [3, 3], 1)
    libraSuit(x, t, 470, 1180, 330, { mood: 'happy', look: [1, 0] })
    ariesSuit(x, t, 720, 1210, 270, { mood: 'squint', look: [1, -1], hops: [T.inside + 0.3, T.inside + 0.7, T.inside + 1.1] })
    if (t > T.inside + 0.3) pixelBubble(x, 760, 960, 'ARE WE THERE YET', { size: 26, alpha: pop01(t, T.inside + 0.3, 0.2) })
  }
  function system(t) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    starfield(x, t, { speed: 0.2, tint: '#ffd0c0' })
    const k = pop01(t, T.arrive, 0.6, 1.4)
    drawStarBall(x, 540, 760, 230, t, { color: DWARF, corona: 1.2, face: 'sleepy', pop: k })
    rocket(x, t, lerp(1180, 820, ease.outCubic(prog(t, T.arrive, T.arrive + 0.9))), 1260, 300, { flame: 0.5, rot: -0.6 })
    sparkles(x, t, 540, 760, T.arrive + 0.2, 14, 300, 0.4, [DWARF, GOLD, BONE, PINK])
  }
  /** a listing: the spot's world up close, Libra + Aries in front, the thermometer */
  function listing(t) {
    const B = t >= T.spotB
    R(x, 0, 0, 1080, 1920, '#05040c')
    starfield(x, t, { speed: 0.3 })
    // the red dwarf, huge and close (spot A) or a small far dot (spot B)
    if (!B) drawStarBall(x, 980, 520, 420, t, { color: DWARF, corona: 1.4 })
    else drawStarBall(x, 900, 420, 40, t, { color: DWARF, corona: 0.8 })
    drawPlanet(x, 520, 860, 230, t, { kind: B ? 'ice' : 'hot', light: B ? [0.6, -0.6] : [0.9, -0.4], face: t > (B ? T.cold : T.hot) ? 'wide' : 'neutral', look: [0, 1] })
    const t0 = B ? T.spotB : T.spotA
    const lv = B ? 0.55 - 0.5 * ease.inOutCubic(prog(t, t0 + 0.6, B ? T.cold : T.hot)) : 0.5 + 0.5 * ease.inOutCubic(prog(t, t0 + 0.6, T.hot))
    const sx = 300 + (t > T.swing ? Math.sin(t * 6) * 10 : 0)
    libraSuit(x, t, sx, 1330, 320, { ...libState(t), hops: LIB_HOPS })
    ariesSuit(x, t, 800, 1350, 270, { ...ariState(t), hops: ARI_HOPS })
    scale(x, t, 550, 1500, 6, tiltAt(t))
    if (!B && t > T.l4 - 0.1 && t < T.hot) pixelBubble(x, 780, 1140, 'SOLD!!', { size: 32, alpha: pop01(t, T.l4, 0.2), color: '#ffe3d6' })
    if (!B) sparkles(x, t, 520, 860, T.hot, 12, 260, 0.2, [HOT, GOLD, BONE])
    // heat shimmer / frost
    if (!B && t > T.hot) for (let i = 0; i < 8; i++) { const p = (t * 0.8 + i / 8) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.7; R(x, 300 + i * 60, 640 - p * 120, 8, 30, '#ffb07a'); x.restore() }
    if (B && t > T.cold) for (let i = 0; i < 16; i++) { const p = ((t - T.cold) * 0.4 + i / 16) % 1; x.save(); x.globalAlpha = 0.8; R(x, (i * 137) % 1080, p * 1300 + 300, 8, 8, '#e6f6ff'); x.restore() }
    // on-screen chrome (screen space is the same: no camera inside this function's caller)
    return { lv, B, t0 }
  }
  function listingChrome(t) {
    const B = t >= T.spotB, t0 = B ? T.spotB : T.spotA
    const lv = B ? 0.55 - 0.5 * ease.inOutCubic(prog(t, t0 + 0.6, T.cold)) : 0.5 + 0.5 * ease.inOutCubic(prog(t, t0 + 0.6, T.hot))
    genreBug(x, t, { text: 'HOUSE HUNTING · IN SPACE', x: 70, y: 232, color: '#c2408f', size: 26 })
    listingCard(x, t, t0, B ? { spot: 'B', name: '“QUIET VIEWS”', note: 'FAR OUT · LOTS OF SPACE', stamp: 'TOO COLD', stampAt: T.cold, color: COLD }
      : { spot: 'A', name: '“SUN-DRENCHED”', note: 'CLOSE TO THE STAR · BRIGHT', stamp: 'TOO HOT', stampAt: T.hot, color: HOT })
    thermo(x, t, 960, 1060, lv, B ? COLD : HOT, pop01(t, t0 + 0.3, 0.3))
    const st = B ? T.cold : T.hot
    if (t > st) {
      x.save(); x.globalAlpha = pop01(t, st, 0.25); x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const s = B ? 'WATER: FREEZES' : 'WATER: BOILS'; const w = x.measureText(s).width + 30
      R(x, 960 - w + 40, 1170, w, 50, INK); x.fillStyle = B ? COLD : HOT; x.fillText(s, 960 - w / 2 + 40, 1196); x.restore()
    }
  }
  /** the map: hot zone, cold zone, and the Goldilocks ring between (the turn, and the win) */
  function map(t) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    starfield(x, t, { speed: 0.15 })
    const cx = 540, cy = 860
    const k = ease.outCubic(prog(t, T.fact + 0.2, T.fact + 1.2))
    x.save()
    // cold (outer), the just-right ring, hot (inner)
    x.globalAlpha = 0.3 * k; x.fillStyle = COLD; x.beginPath(); x.arc(cx, cy, 470, 0, Math.PI * 2); x.fill()
    x.globalAlpha = 0.55 * k * (0.85 + 0.15 * Math.sin(t * 3)); x.fillStyle = ZONE; x.beginPath(); x.arc(cx, cy, 330, 0, Math.PI * 2); x.fill()
    x.globalAlpha = 0.6 * k; x.fillStyle = HOT; x.beginPath(); x.arc(cx, cy, 220, 0, Math.PI * 2); x.fill()
    x.restore()
    x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.lineWidth = 3; x.setLineDash([10, 12])
    for (const r of [140, 275, 420]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.stroke() }
    x.restore()
    drawStarBall(x, cx, cy, 80, t, { color: DWARF, corona: 1, face: t > T.l7 ? 'happy' : 'neutral' })
    // the zone labels
    x.save(); x.globalAlpha = k; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tag = (s, tx, ty, col) => { const w = x.measureText(s).width + 28; R(x, tx - w / 2, ty - 25, w, 50, INK); x.fillStyle = col; x.fillText(s, tx, ty + 1) }
    tag('TOO HOT', cx, cy - 170, HOT); tag('JUST RIGHT', cx, cy - 275, ZONE); tag('TOO COLD', cx, cy - 420, COLD)
    x.restore()
    // the rocket: parked out in the cold, then (the win) easing into the green ring
    const w = ease.inOutCubic(prog(t, T.win + 0.2, T.win + 1.8))
    const a = lerp(0.95, 0.6, w), r = lerp(430, 275, w)
    const rr = rocket(x, t, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 150, { flame: w > 0 && w < 1 ? 0.8 : 0, rot: a + Math.PI })
    if (w >= 1) sparkles(x, t, rr.x, rr.y, T.win + 1.8, 12, 120, 0.3, [ZONE, GOLD, BONE])
    // Libra (and, for the win, Aries) watching the map, the scale settling
    if (t >= T.l7 - 0.1) {
      libraSuit(x, t, 260, 1390, 280, { ...libState(t), hops: LIB_HOPS, pop: pop01(t, T.l7 - 0.1, 0.35) })
      if (t >= T.win) ariesSuit(x, t, 780, 1400, 250, { ...ariState(t), hops: ARI_HOPS, pop: pop01(t, T.win, 0.35) })
      scale(x, t, 520, 1530, 5, tiltAt(t))
    }
    // Saturn on the radio (screen-space panel drawn by the caller)
  }
  /** the porch: the two of them, side by side in the red-dwarf glow, in the just-right ring */
  function porch(t) {
    const g = x.createLinearGradient(0, 0, 0, 1920)
    g.addColorStop(0, '#1a0b22'); g.addColorStop(0.5, '#5a2238'); g.addColorStop(1, '#2a1426')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    starfield(x, t, { speed: 0.1, alpha: 0.6 })
    drawStarBall(x, 540, 700, 200, t, { color: DWARF, corona: 1.3, face: 'happy' })
    // the hull they sit on
    R(x, 0, 1340, 1080, 50, INK); R(x, 0, 1346, 1080, 36, LIB.color); R(x, 0, 1346, 1080, 8, '#f6b7ee')
    libraSuit(x, t, 400, 1220, 300, { ...libState(t), hops: LIB_HOPS })
    ariesSuit(x, t, 680, 1230, 280, { ...ariState(t), hops: ARI_HOPS })
    scale(x, t, 540, 1340, 5, tiltAt(t), false)
    if (t > T.bubble) pixelBubble(x, 700, 1010, 'ANYWHERE WITH YOU', { size: 28, alpha: pop01(t, T.bubble, 0.2) * (1 - prog(t, T.home - 0.3, T.home)) })
    sparkles(x, t, 540, 1150, T.level, 12, 160, 0.6, [ZONE, GOLD, BONE, PINK])
    if (t > T.hold) { floatHearts(x, t, 540, 1150, T.hold, T.home, 9, 5, 140) }
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
      else if (sc === 'system') system(t)
      else if (sc === 'listing') listing(t)
      else if (sc === 'map') map(t)
      else porch(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      if (sc === 'system') missionHUD(x, t, { mission: 'MISSION 07', target: 'GLIESE 581', distance: 'ABOUT 20 LIGHT-YEARS', status: 'ARRIVED' })
      if (sc === 'listing') listingChrome(t)
      if (sc === 'map' && t >= T.win) listingCard(x, t, T.win + 0.1, { spot: 'C', name: '“JUST RIGHT”', note: 'WATER COULD BE LIQUID HERE', stamp: 'SOLD ♡', stampAt: T.win + 1.9, color: ZONE })
      // Saturn on the radio during the turn
      if (sc === 'map' && t > T.l6 - 0.3 && t < T.closeD) {
        const k = pop01(t, T.l6 - 0.3, 0.3) * (1 - prog(t, T.closeD - 0.3, T.closeD))
        x.save(); x.globalAlpha = k
        R(x, 740, 1150, 280, 210, INK); R(x, 746, 1156, 268, 198, '#0a1630')
        drawSaturn(x, 880, 1270, 180, t, { mood: 'happy', look: [-1, 0], hops: SAT_HOPS })
        x.font = `700 22px ${MONO}`; x.fillStyle = RED; x.textAlign = 'left'; x.fillText('● HOUSTON', 756, 1180)
        x.restore()
      }
      factChip(x, t, { text: 'Gliese 581 is a red dwarf in Libra, about 20 light-years away, with known planets. The habitable or “Goldilocks” zone is where liquid water could exist.', at: T.fact, dur: T.factDur, y: 1620, w: 920, label: '★ REAL SKY' })
      hook.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutMC, kind: 'flip' }, { t: T.fact, kind: 'flip' }, { t: T.mc2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E07' }), cardCuts(CUTS)]

export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count[0]).filter(c => c[1] >= 0.1), ...launchCues(T.go),
  ['whoosh', T.cutMC - 0.1, 0.3, 0.03], ['tick', T.cutMC, 0.05],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [LIBN]: 880, [ARIN]: 740 } }),
  ['pop', T.feed, 1046.5, 0.035, 0],
  ...warpCues(T.warp), ['tick', T.warp + 0.65, 0.015],
  ['tick', T.inside, 0.05], ['tick', T.ghost + 0.05, 0.015], ['pop', T.inside + 0.35, 698.46, 0.03, 0.3],
  ['boom', T.arrive, 0.16], ['glitter', T.arrive, T.arrive + 0.9], ['bell', T.arrive + 0.1, 1396.91, 0.035, 1.6, 0],
  ['whoosh', T.spotA - 0.15, 0.3, 0.03], ['bell', T.spotA, 1760, 0.03, 1, 0], ['pop', T.spotA + 0.05, 1396.91, 0.045, 0],
  ['riser', T.spotA + 0.6, T.hot, 0.04], ['crash', T.hot, { gain: 0.04, len: 1.2 }], ['pop', T.hot, 349.23, 0.06, 0.3],
  ['whoosh', T.spotB - 0.15, 0.3, 0.03], ['bell', T.spotB, 1760, 0.03, 1, 0], ['pop', T.spotB + 0.05, 1396.91, 0.045, 0],
  ['tapeStop', T.cold - 0.3, 0.3], ['pop', T.cold, 349.23, 0.06, 0.3], ['glitter', T.cold, T.cold + 0.8],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pop', T.l6 - 0.3, 880, 0.03, 0.4],
  ['whoosh', T.win + 0.2, 1.4, 0.03], ['bell', T.win + 1.9, 2093, 0.035, 1.4, 0], ['pop', T.win + 1.9, 1396.91, 0.05, 0],
  ['tick', T.porch, 0.04], ['pop', T.bubble, 1046.5, 0.04, 0.3], ['glitter', T.level, T.level + 0.6], ['bell', T.hold + 0.1, 1396.91, 0.03, 1.6, 0],
  ...warpCues(T.home),
  ...cheerCues(T.mc2, { len: 2.4 }),
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.last + i * 0.09), [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91][i], 0.035, 0]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void CYAN; void MINT; void GOLD
