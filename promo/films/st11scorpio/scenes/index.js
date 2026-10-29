// st11scorpio (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E08: Scorpio · MISSION 08 · Antares) · story
// 0–55.6, then the shared end card.
//   0.00  HOOK. The Houston launch pad at dusk: Scorpio in its suit, mid-sneak, tucking its secret pink sock (season 9) into
//         the suit; Taurus already in the porthole. The countdown is on "3". Hook: "Scorpio's heart is a *supergiant*."
//         2 · 1 · LIFTOFF at 2.45.
//   4.20  WANT. Houston Mission Control. SATURN: "Mission 08: *Antares*, the scorpion's heart."  On the feed, Scorpio:
//         "i want to see my heart. *up close.*"  Taurus: "i packed *snacks.* for the whole trip."
//  13.80  the warp (the ghost peeks out from behind the hull); 15.6 inside: the corkboard and red string, CASE: ANTARES, the
//         pink sock drifting in zero-g, and the ghost leaning out of the SNACKS (TAURUS) crate.
//  17.60  TRY. "CASE FILE · ANTARES". It's red and it's enormous. EXHIBIT A, the set-piece: our solar system's orbits drawn
//         round a tiny Sun, then Antares grows from the Sun's spot and swallows Mercury, Venus, Earth… and Mars.
//         ANTARES (kind, slow): "hello, little scorpion. someday i'll *change.*"
//         SCORPIO: "no. stay *exactly* like this."
//  30.60  TURN. ★ REAL SKY: Antares is a red supergiant about 550 light-years away, so big it would reach past Mars's orbit;
//         stars that big end as supernovas and scatter the stuff of new stars. The "SOMEDAY…" dream panel: a flash, a cloud,
//         then baby stars lighting up inside it.  ANTARES: "my stardust becomes *new stars.*"  SCORPIO: "so changing
//         isn't *losing.*"
//  42.20  WIN. Taurus takes Scorpio's hand: "i don't love change either. *together?*"  Scorpio makes one small change of
//         its own: the secret pink sock comes out, worn on the outside of the suit.
//  46.60  the trip home; 48.0 Mission Control cheers. SATURN: "welcome back. you look… *different.*"
//  52.20  LAST LINE on frame 0's framing (the pad, the pink sock now on show, Taurus beside it):
//         "Change is how *new* things are made."
//   Rewatch bait: the season-9 corkboard and red string fly along; the pink sock that was a secret all of season 9 goes
//   public; the crate is labelled SNACKS (TAURUS). The ghost: 14.4 behind the hull, 16.0 out of the SNACKS crate.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { drawPinkSock, pinCard, redString } from '../../st9scorpiohome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawStarBall, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { GOLD, BONE, PINK, INK, CYAN, RED, MONO, INTER, r3, R, pop01, outK, camAt, camApply, sparkles, floatHearts,
  lastLine, pixelBubble, launchPad, cockpit, drawHeart } from '../st11kit.js'

export const DURATION = 60
const KEY = 'C#m'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const SCO = signStar('scorpio'), TAU = signStar('taurus')
const ANT = '#ff5a3c'

const T = {
  count: [-0.25, 0.65, 1.55], go: 2.45, hookOut: 2.9, lift: [2.5, 4.2], tuck: [0.0, 1.4],
  cutMC: 4.2, l1: 4.5, feed: 7.7, l2: 7.9, l3: 11.0, closeA: 13.7,
  warp: 13.8, inside: 15.6, ghost: 16.0,
  arrive: 17.6, exhibit: 19.0, orbits: [19.3, 20.6], grow: [20.8, 23.9], l4: 24.2, l5: 27.5, closeB: 30.3,
  fact: 30.6, factDur: 4.6, dream: [30.9, 35.2], flash: 31.4,
  l6: 35.4, l7: 38.6, closeC: 42.0,
  win: 42.2, l8: 42.4, hold: 43.4, sock: [44.8, 45.8], closeD: 46.5,
  home: 46.6, mc2: 48.0, l9: 48.4, closeE: 51.9,
  last: 52.2, lastOut: [55.2, 55.55],
}
const SATN = SATURN.tag, SCON = '♏ SCORPIO', TAUN = '♉ TAURUS', ANTN = '★ ANTARES'
const LINES = [
  { t: T.l1, speaker: SATN, text: 'Mission 08: *Antares*, the scorpion’s heart.', color: SATURN.tagColor },
  { t: T.l2, speaker: SCON, text: 'i want to see my heart. *up close.*', color: '#ff8aa6' },
  { t: T.l3, speaker: TAUN, text: 'i packed *snacks.* obviously.', color: '#f5cf7c' },
  { t: T.l4, speaker: ANTN, text: 'little scorpion. someday i’ll *change.*', color: '#ff9a7a' },
  { t: T.l5, speaker: SCON, text: 'no. stay *exactly* like this.', color: '#ff8aa6' },
  { t: T.l6, speaker: ANTN, text: 'my stardust becomes *new stars.*', color: '#ff9a7a' },
  { t: T.l7, speaker: SCON, text: 'so changing isn’t *losing.*', color: '#ff8aa6' },
  { t: T.l8, speaker: TAUN, text: 'i don’t love change either. *together?*', color: '#f5cf7c' },
  { t: T.l9, speaker: SATN, text: 'welcome back. you look… *different.*', color: SATURN.tagColor },
]
const CPS = 28
const BOXES = [
  { lines: [0, 1, 2], open: T.l1 - 0.2, close: T.closeA },
  { lines: [3, 4], open: T.l4 - 0.2, close: T.closeB },
  { lines: [5, 6], open: T.l6 - 0.2, close: T.closeC },
  { lines: [7], open: T.l8 - 0.2, close: T.closeD },
  { lines: [8], open: T.l9 - 0.2, close: T.closeE },
]
const SCO_HOPS = [0.3, 1.0, ...talkHops(LINES, SCON, { cps: CPS }), T.arrive + 0.2, T.sock[1], T.mc2 + 0.2, T.last, T.last + 0.5]
const TAU_HOPS = [...talkHops(LINES, TAUN, { cps: CPS }), T.hold, T.mc2 + 0.3, T.last + 0.2]
const SAT_HOPS = [...talkHops(LINES, SATN, { cps: CPS }), T.mc2 + 0.1, T.mc2 + 0.7]

const scene = t => t < T.cutMC ? 'pad' : t < T.warp ? 'mc' : t < T.inside ? 'warp' : t < T.arrive ? 'inside'
  : t < T.exhibit ? 'antares' : t < T.l4 - 0.3 ? 'exhibit' : t < T.home ? 'antares' : t < T.mc2 ? 'warpHome' : t < T.last ? 'mc' : 'pad'
const SHOTS = [
  { t: 0, x: 540, y: 960, s: 1 },
  { t: T.cutMC, x: 540, y: 960, s: 1 },
  { t: T.feed, x: 540, y: 700, s: 1.2 },
  { t: T.l3, x: 700, y: 700, s: 1.28 },
  { t: T.warp, x: 540, y: 960, s: 1 },
  { t: T.inside, x: 540, y: 960, s: 1.04 },
  { t: T.arrive, x: 540, y: 700, s: 1.4 },
  { t: T.arrive + 0.2, x: 540, y: 960, s: 1, ease: 1.2 },
  { t: T.exhibit, x: 540, y: 960, s: 1 },
  { t: T.l4 - 0.3, x: 540, y: 960, s: 1 },
  { t: T.l5, x: 540, y: 1250, s: 1.14 },
  { t: T.fact, x: 540, y: 960, s: 1 },
  { t: T.l6, x: 540, y: 900, s: 1.06 },
  { t: T.l7, x: 540, y: 1250, s: 1.12 },
  { t: T.win, x: 540, y: 960, s: 1 },
  { t: T.hold, x: 540, y: 1230, s: 1.14, ease: 0.8 },
  { t: T.home, x: 540, y: 960, s: 1 },
  { t: T.mc2, x: 540, y: 960, s: 1 },
  { t: T.last, x: 540, y: 960, s: 1 },
]
export const GHOST = { at: T.ghost, x: 300, y: 1110, where: 'leaning out of the SNACKS (TAURUS) crate inside Scorpio’s rocket, bottom left (the stowaway); it also peeks out from behind the hull in the warp' }

const rocket = (x, t, cx, cy, size, o = {}) => drawRocket(x, cx, cy, size, t, { color: SCO.color, pilot: TAU.color, ...o })
const scoSuit = (x, t, cx, cy, size, o = {}) => drawSpaceSuit(x, cx, cy, size, t, { sign: 'scorpio', helmet: true, seed: 8, ...o })
const tauSuit = (x, t, cx, cy, size, o = {}) => drawSpaceSuit(x, cx, cy, size, t, { sign: 'taurus', helmet: true, seed: 2, ...o })
/** the pink sock, worn: pinned to the suit's collar, out in the open (after the win) */
function wornSock(x, t, r, k = 1) {
  if (k <= 0 || !r) return
  const s = r.size / 300
  x.save(); x.globalAlpha *= clamp(k); drawPinkSock(x, r.x + 70 * s, r.y + r.size * 0.42, Math.round(6 * s), { rot: -0.3 + 0.08 * Math.sin(t * 3) }); x.restore()
}

function scoState(t) {
  if (t < T.go) return { mood: 'squint', look: [1, 0] }
  if (t < T.arrive) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l4) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.fact) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.l7) return { mood: 'neutral', look: [0, -1] }
  if (t < T.win) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.hold) return { mood: 'neutral', look: [1, 0] }
  if (t < T.last) return { mood: 'heart', look: [1, 0] }
  return { mood: 'happy', look: [1, 0] }
}
function tauState(t) {
  if (t < T.arrive) return { mood: 'happy', look: [-1, 0] }
  if (t < T.fact) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.win) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.hold) return { mood: 'happy', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}

async function build(stage) {
  try { await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "600 34px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Scorpio’s heart is a *supergiant*.', at: 0, out: T.hookOut, top: 190, size: 104, accentSize: 156, accentColor: '#ff6a5a' })
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines.map(i => LINES[i]), y: 1560, width: 960, height: 240, open: b.open, close: b.close, cps: CPS }))
  const last = lastLine(root, 'Change is how *new* things are made.', { at: T.last, lateAt: null, top: 290, size: 100, accentSize: 160, accentColor: '#ff6a5a', late: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function pad(t) {
    const end = t >= T.last
    const { padY, rocketX } = launchPad(x, t, { rocketX: 720 })
    const lp = end ? 0 : ease.inCubic(prog(t, ...T.lift))
    const shake = !end && t > T.count[1] && t < T.lift[1] ? clamp((t - T.count[1]) / 1.4) : 0
    rocket(x, t, rocketX, padY - 330 - lp * 1900, 620, { flame: end ? 0 : clamp((t - T.go + 0.3) * 2), shake: shake * 5, smoke: end ? 0 : clamp((t - T.go + 0.6) * 1.5) * (1 - lp), trail: lp, pilot: end ? null : TAU.color })
    if (!end) {
      const up = ease.inCubic(prog(t, T.count[2], T.count[2] + 0.55))
      if (up < 1) {
        const r = scoSuit(x, t, lerp(320, rocketX - 60, up), lerp(1320, padY - 560, up), 380 * (1 - 0.7 * up), { ...scoState(t), hops: SCO_HOPS })
        // the secret pink sock, being tucked away (a guilty look to camera)
        const tk = ease.inOutCubic(prog(t, ...T.tuck))
        if (up < 0.05 && tk < 1) { x.save(); x.globalAlpha = 1 - prog(tk, 0.8, 1); drawPinkSock(x, r.x + lerp(200, 90, tk), r.y + lerp(-20, 140, tk), 9, { rot: -0.5 + tk }); x.restore() }
        if (up < 0.05 && t > 0.9) pixelBubble(x, r.x + 150, r.top - 40, 'nobody saw that', { size: 24, alpha: pop01(t, 0.9, 0.2) * (1 - prog(t, T.count[2] - 0.1, T.count[2])) })
      }
    } else {
      tauSuit(x, t, 760, 1440, 240, { ...tauState(t), pop: pop01(t, T.last - 0.05, 0.35), hops: TAU_HOPS })
      const r = scoSuit(x, t, 320, 1320, 380, { ...scoState(t), hops: SCO_HOPS })
      wornSock(x, t, r)
      floatHearts(x, t, 520, 1160, T.last + 0.4, STORY_END, 3)
    }
    drawCountdown(x, t, { at: T.count[0], x: 840, y: 760, size: 220 })
  }
  function mc(t, end) {
    const feed = (c, rect) => {
      c.fillStyle = '#0a1630'; c.fillRect(rect.x, rect.y, rect.w, rect.h)
      starfield(c, t, { speed: 0.6, dir: 'right', cx: rect.x + rect.w / 2, cy: rect.y + rect.h / 2 })
      scoSuit(c, t, rect.x + rect.w * 0.34, rect.y + rect.h * 0.6, 320, { ...scoState(t), mood: t > T.l2 ? 'sparkle' : 'neutral', hops: SCO_HOPS })
      tauSuit(c, t, rect.x + rect.w * 0.72, rect.y + rect.h * 0.64, 280, { mood: 'happy', look: [-1, 0], hops: TAU_HOPS })
      // Taurus's snacks, floating
      for (let i = 0; i < 3; i++) { const fx = rect.x + rect.w * (0.6 + i * 0.12), fy = rect.y + 90 + Math.sin(t * 1.3 + i) * 16; R(c, fx - 18, fy - 14, 36, 28, INK); R(c, fx - 14, fy - 10, 28, 20, ['#f5cf7c', '#ff8aa6', '#a7e07a'][i]) }
      c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = RED; c.fillText('● LIVE · ROCKET 08', rect.x + 24, rect.y + 34)
    }
    const mcr = drawMissionControl(x, t, { mission: 'MISSION 08', screens: end ? { big: 'track', progress: 1, target: 'ANTARES', text: 'WELCOME HOME, SCORPIO + TAURUS' } : { big: feed }, cheer: end ? 1 : 0, cheerAt: T.mc2 })
    const [, dy] = mcr.spots.director
    if (!end) drawSaturn(x, 250, dy + 60, 240, t, { mood: 'neutral', look: [1, -1], hops: SAT_HOPS, prop: 'book' })
    else {
      drawSaturn(x, 200, dy + 60, 220, t, { mood: t > T.l9 + 1 ? 'squint' : 'happy', look: [1, 0], hops: SAT_HOPS })
      const ax = lerp(1000, 0, ease.outCubic(prog(t, T.mc2, T.mc2 + 0.7)))
      const r = scoSuit(x, t, 560 + ax, dy + 260, 290, { ...scoState(t), hops: SCO_HOPS })
      wornSock(x, t, r)
      tauSuit(x, t, 810 + ax, dy + 280, 260, { ...tauState(t), hops: TAU_HOPS })
      drawHeart(x, 690 + ax, dy + 360, 7)
    }
  }
  function warp(t, back) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    const p = prog(t, back ? T.home : T.warp, back ? T.mc2 : T.inside)
    const ang = back ? Math.PI * 0.75 : -Math.PI / 4
    starfield(x, t, { speed: 3, warp: clamp(p * 3) * (1 - prog(p, 0.85, 1)), dir: ang })
    rocket(x, t, lerp(back ? 820 : 260, back ? 260 : 820, p), lerp(back ? 640 : 1300, back ? 1300 : 640, p), 420, { flame: 1.2, trail: 1, rot: ang + Math.PI / 2, stowaway: back ? 0 : pop01(t, T.warp + 0.6) * (1 - pop01(t, T.warp + 1.4)) })
    missionHUD(x, t, { mission: 'MISSION 08', target: 'ANTARES', distance: 'ABOUT 550 LIGHT-YEARS', status: back ? 'RETURNING HOME' : 'EN ROUTE' })
  }
  function inside(t) {
    const cp = cockpit(x, t, { tint: '#2a1420', accent: SCO.color, crate: 'SNACKS (TAURUS)', window: (c) => { starfield(c, t, { speed: 3, warp: 1 }) } })
    drawGhostCameo(x, t, { x: cp.crate.x + cp.crate.w, y: cp.crate.y + 70, at: GHOST.at, dur: 1.5, from: 'left', cell: 4 })
    // the corkboard (season 9): CASE: ANTARES
    const bx = 820, by = 1010
    R(x, bx - 136, by - 116, 272, 232, INK); R(x, bx - 128, by - 108, 256, 216, '#9c6b3e'); R(x, bx - 116, by - 96, 232, 192, '#c49060')
    pinCard(x, bx - 60, by - 40, 80, 70, { photo: ANT, rot: -0.06 }); pinCard(x, bx + 60, by - 50, 80, 70, { photo: '#7aa4ff', rot: 0.05 }); pinCard(x, bx, by + 50, 110, 46, { rot: 0.02 })
    redString(x, [[bx - 60, by - 70], [bx + 60, by - 80], [bx, by + 30], [bx - 60, by - 70]], { k: prog(t, T.inside + 0.2, T.inside + 1.2) })
    x.save(); x.font = `700 16px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('ANTARES?', bx, by + 56); x.restore()
    // the pink sock, drifting in zero-g (it escaped)
    drawPinkSock(x, 230 + Math.sin(t * 0.9) * 30, 520 + Math.cos(t * 1.1) * 26, 7, { rot: t * 0.8 })
    const r = scoSuit(x, t, 470, 1180, 320, { mood: 'squint', look: [-1, -1] })
    tauSuit(x, t, 700, 1210, 260, { mood: 'happy', look: [-1, 0], hops: [T.inside + 0.4, T.inside + 1.0] })
    void r
  }
  /** Antares: huge, red, with a slow kind face; Scorpio and Taurus in front */
  function antares(t) {
    R(x, 0, 0, 1080, 1920, '#08040a')
    starfield(x, t, { speed: 0.12, tint: '#ffc0b0' })
    const ap = ease.outCubic(prog(t, T.arrive, T.arrive + 1.4))
    const face = t < T.l4 ? null : t < T.fact ? 'neutral' : 'happy'
    const dk = prog(t, ...T.dream) > 0 && prog(t, ...T.dream) < 1 ? 0.35 : 1
    x.save(); x.globalAlpha = dk
    drawStarBall(x, 540, lerp(1200, 690, ap), lerp(160, 420, ap), t, { color: ANT, corona: 1.4, face, look: [0, 1] })
    x.restore()
    if (t >= T.fact && t < T.l6) dream(t)
    const win = t >= T.win
    const sx = win ? 400 : 370, tx = win ? 700 : 770
    const r = scoSuit(x, t, sx, 1400, 320, { ...scoState(t), hops: SCO_HOPS })
    tauSuit(x, t, tx, 1420, 280, { ...tauState(t), hops: TAU_HOPS })
    if (win && t > T.hold) { drawHeart(x, 550, 1480, 7); floatHearts(x, t, 550, 1300, T.hold, T.home, 8, 5, 140) }
    // the small change: the sock comes out and gets worn on the outside
    const sp = prog(t, ...T.sock)
    if (sp > 0 && sp < 1) drawPinkSock(x, lerp(r.x + 20, r.x + 70, sp), lerp(r.y + 160, r.y + r.size * 0.42, ease.outCubic(sp)) - Math.sin(Math.PI * sp) * 120, 6, { rot: sp * 6 })
    if (sp >= 1) wornSock(x, t, r)
    sparkles(x, t, r.x + 70, r.y + r.size * 0.42, T.sock[1], 10, 100, 0.4, [PINK, GOLD, BONE])
    if (t > T.sock[1] && t < T.home) pixelBubble(x, tx + 30, 1180, 'cute sock.', { size: 26, alpha: pop01(t, T.sock[1] + 0.2, 0.2) })
    sparkles(x, t, 540, 760, T.arrive + 0.3, 16, 420, 0.2, [ANT, GOLD, BONE, PINK])
  }
  /** "SOMEDAY…": the dream panel. A flash (supernova), a glowing cloud, then baby stars lighting up inside it */
  function dream(t) {
    const k = ease.outCubic(prog(t, T.dream[0], T.dream[0] + 0.4)) * (1 - prog(t, T.dream[1] - 0.3, T.dream[1]))
    if (k <= 0) return
    const cx = 540, cy = 760, W = 760, H = 640
    x.save(); x.globalAlpha = k
    R(x, cx - W / 2 - 10, cy - H / 2 - 10, W + 20, H + 20, '#f4e6d0'); R(x, cx - W / 2, cy - H / 2, W, H, '#140a1c')
    x.save(); x.beginPath(); x.rect(cx - W / 2, cy - H / 2, W, H); x.clip()
    const fp = prog(t, T.flash, T.flash + 0.8), cl = prog(t, T.flash + 0.5, T.flash + 2.2), bb = prog(t, T.flash + 1.9, T.dream[1] - 0.4)
    if (t < T.flash) drawStarBall(x, cx, cy, 120, t, { color: ANT, corona: 1 })
    // the flash
    if (fp > 0 && fp < 1) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 0, cx, cy, 80 + fp * 500); g.addColorStop(0, `rgba(255,250,230,${1 - fp})`); g.addColorStop(1, 'rgba(255,200,150,0)'); x.fillStyle = g; x.fillRect(cx - W / 2, cy - H / 2, W, H); x.restore() }
    // the cloud: the stuff of new stars, scattered
    if (cl > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (let i = 0; i < 90; i++) {
        const a = i * 2.39996, d = (40 + (i * 53) % 260) * ease.outCubic(cl)
        x.globalAlpha = 0.5 * k; x.fillStyle = ['#ff6a8a', '#a06cff', '#5fc8ff', '#ffb070'][i % 4]
        x.fillRect(Math.round(cx + Math.cos(a) * d * 1.2), Math.round(cy + Math.sin(a) * d * 0.8), 14, 14)
      }
      x.restore()
    }
    // new baby stars, lighting up one by one
    for (let i = 0; i < 7; i++) {
      const on = prog(bb, i / 8, i / 8 + 0.15)
      if (on <= 0) continue
      const a = i * 1.9 + 0.5, d = 80 + (i * 61) % 180
      drawPixelStar(x, cx + Math.cos(a) * d * 1.3, cy + Math.sin(a) * d * 0.8, 30 * easeIn(on), 2, ['#fff3d0', '#cfe6ff', '#ffd1de'][i % 3])
    }
    x.restore()
    x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    R(x, cx - W / 2 - 10, cy - H / 2 - 64, 230, 54, INK); x.fillStyle = '#f4e6d0'; x.fillText('SOMEDAY…', cx - W / 2 + 6, cy - H / 2 - 36)
    x.restore()
  }
  const easeIn = v => 0.4 + 0.6 * ease.outCubic(v)
  /** EXHIBIT A: our solar system's orbits round a tiny Sun, and Antares growing from the Sun's spot past Mars */
  function exhibit(t) {
    R(x, 0, 0, 1080, 1920, '#0a0610')
    starfield(x, t, { speed: 0.05, alpha: 0.6 })
    const cx = 540, cy = 900, AU = 225
    const ORB = [['MERCURY', 0.39], ['VENUS', 0.72], ['EARTH', 1], ['MARS', 1.52]]
    const op = prog(t, ...T.orbits), gp = ease.inOutCubic(prog(t, ...T.grow))
    const RA = gp * AU * 1.85
    // Antares, growing from where our Sun is
    if (gp > 0) drawStarBall(x, cx, cy, Math.max(4, RA), t, { color: ANT, corona: 0.8 })
    ORB.forEach(([name, a], i) => {
      const k = prog(op, i / 4, i / 4 + 0.35)
      if (k <= 0) return
      const r = a * AU, gone = RA > r
      x.save(); x.globalAlpha = gone ? 0.35 : 0.9; x.strokeStyle = gone ? '#ffd0c0' : BONE; x.lineWidth = 4; x.setLineDash([12, 10])
      x.beginPath(); x.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * k); x.stroke(); x.restore()
      // the planet dot + its label
      const pa = -Math.PI / 2 + i * 1.4 + t * 0.2 / a
      const px = cx + Math.cos(pa) * r, py = cy + Math.sin(pa) * r
      R(x, px - 9, py - 9, 18, 18, INK); R(x, px - 6, py - 6, 12, 12, ['#c8b8a8', '#f2d29a', '#5fa8ff', '#e0603a'][i])
      x.save(); x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const lw = x.measureText(name).width + 24, ly = cy - r - 30
      x.globalAlpha = k; R(x, cx - lw / 2, ly - 20, lw, 40, gone ? RED : INK); x.fillStyle = gone ? BONE : BONE
      x.fillText(gone ? `${name} ✕` : name, cx, ly + 1); x.restore()
    })
    // our Sun, for scale
    if (gp < 0.15) { R(x, cx - 7, cy - 7, 14, 14, '#ffe27a'); x.save(); x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffe27a'; x.globalAlpha = 1 - gp / 0.15; x.fillText('OUR SUN', cx, cy + 44); x.restore() }
    // the case-file caption
    x.save(); x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const cap = gp < 0.02 ? 'If Antares sat where our Sun is…' : RA > 1.52 * AU ? '…it would reach past Mars.' : 'If Antares sat where our Sun is…'
    x.fillStyle = INK; x.fillText(cap, cx + 3, 1430 + 4); x.fillStyle = BONE; x.fillText(cap, cx, 1430)
    x.restore()
    // tiny Scorpio + Taurus, gasping, bottom
    scoSuit(x, t, 360, 1640, 200, { mood: 'wide', look: [0, -1], blink: false })
    tauSuit(x, t, 700, 1650, 180, { mood: 'wide', look: [0, -1], blink: false })
  }
  function caseChrome(t) {
    genreBug(x, t, { text: 'CASE FILE · ANTARES', x: 70, y: 232, color: '#b02848', size: 26 })
    if (t >= T.exhibit && t < T.l4 - 0.3) {
      const s = 1 + 0.5 * (1 - ease.outCubic(prog(t, T.exhibit, T.exhibit + 0.2)))
      x.save(); x.translate(800, 340); x.rotate(-0.12); x.scale(s, s); x.globalAlpha = clamp((t - T.exhibit) * 6)
      x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-140, -40, 280, 80)
      x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('EXHIBIT A', 0, 3)
      x.restore()
    }
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
      else if (sc === 'exhibit') exhibit(t)
      else antares(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      if ((sc === 'antares' || sc === 'exhibit') && t < T.fact) caseChrome(t)
      if (sc === 'antares' && t < T.exhibit) missionHUD(x, t, { mission: 'MISSION 08', target: 'ANTARES', distance: 'ABOUT 550 LIGHT-YEARS', status: 'ARRIVED' })
      factChip(x, t, { text: 'Antares is a red supergiant about 550 light-years away, so big it would reach past Mars’s orbit. Stars that big end as supernovas and scatter the stuff of new stars.', at: T.fact, dur: T.factDur, y: 1620, w: 940, label: '★ REAL SKY' })
      hook.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutMC, kind: 'flip' }, { t: T.arrive, kind: 'flip' }, { t: T.mc2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E08' }), cardCuts(CUTS)]

// when the growing Antares reaches each orbit (the inverse of ease.inOutCubic)
const invInOutCubic = p => p < 0.5 ? Math.cbrt(p / 4) : 1 - Math.cbrt(2 * (1 - p)) / 2
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count[0]).filter(c => c[1] >= 0.1), ...launchCues(T.go),
  ['whoosh', 0.3, 0.3, 0.02], ['pop', 0.95, 523.25, 0.03, 0.3],
  ['whoosh', T.cutMC - 0.1, 0.3, 0.03], ['tick', T.cutMC, 0.05],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [SCON]: 660, [TAUN]: 587, [ANTN]: 330 } }),
  ['pop', T.feed, 830.61, 0.035, 0],
  ...warpCues(T.warp), ['tick', T.warp + 0.65, 0.015],
  ['tick', T.inside, 0.05], ['tick', T.ghost + 0.05, 0.015],
  ['boom', T.arrive, 0.22], ['riser', T.arrive - 0.6, T.arrive, 0.05], ['crash', T.arrive, { gain: 0.05, len: 2.4 }], ['bell', T.arrive + 0.1, 554.37, 0.04, 2.6, 0],
  ['pop', T.exhibit, 349.23, 0.06, 0.3], ['tick', T.exhibit + 0.02, 0.1],
  ...[0, 1, 2, 3].map(i => ['pluck', r3(T.orbits[0] + i * 0.33), [830.61, 987.77, 1108.73, 1244.51][i], 0.035, 0.5, 0]),
  ['riser', T.grow[0], T.grow[1], 0.06],
  ...[0.39, 0.72, 1, 1.52].map(a => ['pop', r3(T.grow[0] + (T.grow[1] - T.grow[0]) * invInOutCubic(a / 1.85)), 277.18, 0.05, 0]),
  ['boom', T.grow[1], 0.14],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['boom', T.flash, 0.2], ['crash', T.flash, { gain: 0.05, len: 2.6 }], ['glitter', T.flash + 1.9, T.dream[1] - 0.4],
  ...Array.from({ length: 7 }, (_, i) => ['bell', r3(T.flash + 1.9 + (T.dream[1] - 0.4 - T.flash - 1.9) * i / 8), [1108.73, 1244.51, 1318.51, 1661.22, 1864.66, 2217.46, 2489.02][i], 0.02, 1.2, (i % 2 ? 0.3 : -0.3)]),
  ['bell', T.hold, 1108.73, 0.035, 1.8, 0],
  ['whoosh', T.sock[0], 0.6, 0.03], ['pop', T.sock[1], 1318.51, 0.05, 0], ['glitter', T.sock[1], T.sock[1] + 0.5],
  ...warpCues(T.home),
  ...cheerCues(T.mc2, { len: 2.4 }),
  ...Array.from({ length: 7 }, (_, i) => ['pop', r3(T.last + i * 0.09), [554.37, 622.25, 659.25, 739.99, 830.61, 987.77, 1108.73][i], 0.035, 0]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void CYAN
