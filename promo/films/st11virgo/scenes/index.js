// st11virgo (60 s vertical Align ad, Star Talk season 11 "FAR OUT", S11 E06: Virgo · MISSION 06 · the Virgo Cluster) ·
// story 0–55.6, then the shared end card.
//   0.00  HOOK. The Houston launch pad: Virgo in its suit, mid-label, printing "ROCKET" for the rocket (which already wears
//         NOSE ↑ and FINS labels). The countdown is on "3". Hook: "Virgo tried to organise a *galaxy cluster*."
//         2 · 1 · LIFTOFF at 2.7.
//   4.20  WANT. Houston Mission Control. SATURN: "Mission 06: the *Virgo Cluster.*"  On the feed, Virgo with the label
//         maker: "i'm going to get it all *organised.*"  Pisces, co-pilot, floating upside down: "i'm just here for the
//         *view.*"
//  13.80  the warp; 15.6 inside the rocket: the clipboard (1. SORT GALAXIES … 5. REST, still open), PISCES' MUG, and the ghost
//         peeking out of the drawer labelled LABELS (SPARE).
//  17.60  TRY. "THE BIG SORT" (a home-organising-show parody): Virgo labels galaxies, GALAXY 01, 02, 03… faster; the camera
//         pulls back and there are always more. At GALAXY 47 the tape runs out. VIRGO: "there are *so many.*"
//  30.60  TURN. ★ REAL SKY: the Virgo Cluster has over a thousand galaxies; the black hole in galaxy M87 was the first ever
//         photographed (released 2019).  PISCES: "stop sorting. come look at *this* one."  The rocket glides to M87, and
//         there it is: the orange ring round the dark.  VIRGO: "…you can't label *that.*"
//  42.20  WIN. On the rocket's wing, side by side. PISCES: "you don't have to fix it. just *look* with me."  Pisces takes
//         Virgo's hand. Virgo prints one last label, WOW, and the clipboard's REST finally gets its tick.
//  46.60  the trip home; 48.0 Mission Control cheers (Saturn holds up the photo).
//  52.20  LAST LINE on frame 0's framing (the pad; the rocket's new label reads HOME, Pisces beside Virgo):
//         "Some things are too big to *fix*. | Just look."
//   Rewatch bait: the season-9 labels come along (PISCES' MUG); the clipboard's last item is REST, open since st9virgo3am,
//   ticked at 45.0; one galaxy in the sort is labelled "???" before Virgo fixes it. The ghost: the LABELS (SPARE) drawer, 16.0.
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
import { hookCard, hookCues, genreBug } from '../../st8cast.js'
import { factChip, factChipCues } from '../../st9day.js'
import { drawLabelMaker } from '../../st9virgohome.js'
import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawCountdown, countdownCues, launchCues, warpCues, cheerCues, SPACE_FONTS } from '../../st11space.js'
import { GOLD, BONE, PINK, INK, CYAN, MINT, RED, MONO, INTER, r3, R, pop01, outK, camAt, camApply, sparkles, floatHearts,
  cheers, lastLine, launchPad, cockpit, label, feedPanel, drawHeart } from '../st11kit.js'

export const DURATION = 60
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const VIR = signStar('virgo'), PIS = signStar('pisces')

const T = {
  count: [-0.25, 0.65, 1.55], go: 2.45, hookOut: 2.9, lift: [2.5, 4.2], print0: [0.0, 1.5],
  cutMC: 4.2, l1: 4.5, feed: 7.0, l2: 7.3, l3: 10.5, closeA: 13.6,
  warp: 13.8, inside: 15.6, ghost: 16.0,
  arrive: 17.6, show: 18.0, sort: [18.6, 26.4], pull: [21.6, 26.0], tape: 26.5, l4: 27.3, closeB: 30.3,
  fact: 30.6, factDur: 4.4,
  l5: 35.4, glide: [36.2, 38.2], ring: 38.2, l6: 38.9, closeC: 41.8,
  wing: 42.2, l7: 42.6, hold: 44.4, wow: [44.9, 45.9], tick: 46.0, closeD: 46.5,
  home: 46.6, mc2: 48.0, l8: 48.4, closeE: 51.9,
  last: 52.2, lastOut: [55.2, 55.55],
}
const SATN = SATURN.tag, VIRN = '♍ VIRGO', PISN = '♓ PISCES'
const LINES = [
  { t: T.l1, speaker: SATN, text: 'Mission 06: the *Virgo Cluster.*', color: SATURN.tagColor },
  { t: T.l2, speaker: VIRN, text: 'i’m going to get it all *organised.*', color: '#ff9cc0' },
  { t: T.l3, speaker: PISN, text: 'i’m just here for the *view.*', color: '#b4aeff' },
  { t: T.l4, speaker: VIRN, text: 'there are *so many.*', color: '#ff9cc0' },
  { t: T.l5, speaker: PISN, text: 'stop sorting. come look at *this* one.', color: '#b4aeff' },
  { t: T.l6, speaker: VIRN, text: '…you can’t label *that.*', color: '#ff9cc0' },
  { t: T.l7, speaker: PISN, text: 'you don’t have to fix it. just *look* with me.', color: '#b4aeff' },
  { t: T.l8, speaker: SATN, text: 'welcome home, you two. nice *photo.*', color: SATURN.tagColor },
]
const CPS = 28
const BOXES = [
  { lines: [0, 1, 2], open: T.l1 - 0.2, close: T.closeA },
  { lines: [3], open: T.l4 - 0.2, close: T.closeB },
  { lines: [4, 5], open: T.l5 - 0.2, close: T.closeC },
  { lines: [6], open: T.l7 - 0.2, close: T.closeD },
  { lines: [7], open: T.l8 - 0.2, close: T.closeE },
]
const VIR_HOPS = [0.2, 0.7, 1.2, ...talkHops(LINES, VIRN, { cps: CPS }), T.arrive + 0.2, T.tape, T.wow[1], T.mc2 + 0.2, T.last, T.last + 0.5]
const PIS_HOPS = [...talkHops(LINES, PISN, { cps: CPS }), T.hold, T.mc2 + 0.3, T.last + 0.2]
const SAT_HOPS = [...talkHops(LINES, SATN, { cps: CPS }), T.mc2 + 0.1, T.mc2 + 0.7]

const scene = t => t < T.cutMC ? 'pad' : t < T.warp ? 'mc' : t < T.inside ? 'warp' : t < T.arrive ? 'inside'
  : t < T.home ? 'cluster' : t < T.mc2 ? 'warpHome' : t < T.last ? 'mc' : 'pad'
const SHOTS = [
  { t: 0, x: 540, y: 960, s: 1 },
  { t: T.cutMC, x: 540, y: 960, s: 1 },
  { t: T.feed, x: 540, y: 700, s: 1.2 },
  { t: T.l3, x: 640, y: 720, s: 1.3 },
  { t: T.warp, x: 540, y: 960, s: 1 },
  { t: T.inside, x: 540, y: 960, s: 1.04 },
  { t: T.arrive, x: 540, y: 960, s: 1 },
  { t: T.tape, x: 540, y: 1280, s: 1.22 },
  { t: T.fact, x: 540, y: 960, s: 1 },
  { t: T.ring, x: 540, y: 760, s: 1.12 },
  { t: T.wing, x: 540, y: 960, s: 1 },
  { t: T.hold, x: 540, y: 1240, s: 1.18, ease: 0.8 },
  { t: T.home, x: 540, y: 960, s: 1 },
  { t: T.mc2, x: 540, y: 960, s: 1 },
  { t: T.last, x: 540, y: 960, s: 1 },
]
export const GHOST = { at: T.ghost, x: 300, y: 1110, where: 'peeking out of the drawer labelled LABELS (SPARE) inside Virgo’s rocket, bottom left (the stowaway)' }

function rocket(x, t, cx, cy, size, o = {}, rot = 0, labels = null) {
  x.save(); x.translate(cx, cy); x.rotate(rot); const r = drawRocket(x, 0, 0, size, t, { color: VIR.color, pilot: VIR.color, ...o })
  if (labels) for (const [lx, ly, s, a, rr] of labels) label(x, lx * size, ly * size, s, { size: Math.round(size / 26), alpha: a, rot: rr })
  x.restore()
  return r
}
function virgoSuit(x, t, cx, cy, size, o = {}) {
  return drawSpaceSuit(x, cx, cy, size, t, { sign: 'virgo', helmet: true, color: VIR.color, glyph: VIR.glyph, seed: 6, ...o })
}
function piscesSuit(x, t, cx, cy, size, o = {}) {
  return drawSpaceSuit(x, cx, cy, size, t, { sign: 'pisces', helmet: true, color: PIS.color, glyph: PIS.glyph, seed: 12, ...o })
}
/** a pixel galaxy: 'spiral' (two arms) or 'elliptical' (a soft oval) */
function galaxy(x, cx, cy, r, t, kind, seed, alpha = 1) {
  if (alpha <= 0 || r < 3) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(seed * 1.7 + t * 0.05 * (seed % 2 ? 1 : -1)); x.scale(1, kind === 'elliptical' ? 0.7 : 0.55)
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(0, 0, 0, 0, 0, r)
  const warm = kind === 'elliptical'
  g.addColorStop(0, warm ? 'rgba(255,226,180,0.95)' : 'rgba(240,236,255,0.95)'); g.addColorStop(0.35, warm ? 'rgba(255,190,140,0.45)' : 'rgba(170,180,255,0.4)'); g.addColorStop(1, 'rgba(120,120,255,0)')
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  if (kind === 'spiral') {
    const c = Math.max(2, Math.round(r / 14))
    for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 22; i++) {
      const a = arm * Math.PI + i * 0.32, d = r * (0.18 + i * 0.037)
      x.fillStyle = i % 3 ? 'rgba(190,210,255,0.8)' : 'rgba(255,170,220,0.8)'
      x.fillRect(Math.round(Math.cos(a) * d), Math.round(Math.sin(a) * d), c, c)
    }
  }
  x.restore()
}
// the cluster's galaxies (frame coords at zoom 1, size, kind); the sort labels the first 47 in this order
const GAL = Array.from({ length: 140 }, (_, i) => {
  const a = i * 2.39996, d = 70 + Math.sqrt(i) * 92
  return { x: 540 + Math.cos(a) * d * 1.05, y: 900 + Math.sin(a) * d * 1.25, r: i === 3 ? 90 : i < 8 ? 64 - i * 2 : 22 + ((i * 37) % 30), kind: i === 3 || i % 3 === 1 ? 'elliptical' : 'spiral', seed: i + 1 }
})
/** the M87 photo: an orange ring around the dark, brighter on its lower side (as in the real image), in a print frame */
function m87(x, t, cx, cy, r, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k)
  const W = r * 3.1
  R(x, cx - W / 2 - 14, cy - W / 2 - 14, W + 28, W + 120, INK); R(x, cx - W / 2 - 8, cy - W / 2 - 8, W + 16, W + 108, '#f4ecd6')
  R(x, cx - W / 2, cy - W / 2, W, W, '#120604')
  x.save(); x.beginPath(); x.rect(cx - W / 2, cy - W / 2, W, W); x.clip()
  x.globalCompositeOperation = 'lighter'
  const c = Math.max(4, Math.round(r / 18))
  for (let j = -r * 1.5; j < r * 1.5; j += c) for (let i = -r * 1.5; i < r * 1.5; i += c) {
    const d = Math.hypot(i, j), ring = Math.exp(-Math.pow((d - r) / (r * 0.22), 2))
    const bright = 0.55 + 0.45 * Math.max(0, j / (d || 1)) + 0.08 * Math.sin(t * 2 + i * 0.05)
    const v = ring * bright
    if (v < 0.05) continue
    x.fillStyle = `rgba(255,${Math.round(110 + 120 * v)},${Math.round(30 + 60 * v)},${Math.min(1, v * 1.1)})`
    x.fillRect(cx + Math.round(i / c) * c, cy + Math.round(j / c) * c, c, c)
  }
  x.restore()
  const fs = Math.round(W * 0.07)
  x.font = `700 ${fs}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
  x.fillText('M87 · FIRST PHOTO', cx, cy + W / 2 + 16 + fs * 0.7)
  x.fillText('OF A BLACK HOLE · 2019', cx, cy + W / 2 + 16 + fs * 1.9)
  x.restore()
}
/** the clipboard checklist (season-9 continuity: REST is the item that stays open) */
const TODO = ['SORT GALAXIES', 'LABEL ROCKET', 'PACK SNACKS', 'CALL HOME', 'REST']
function clipboard(x, t, cx, cy, s, { struck = 0, rest = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(-0.05)
  R(x, -130 * s - 6, -170 * s - 6, 260 * s + 12, 340 * s + 12, INK); R(x, -130 * s, -170 * s, 260 * s, 340 * s, '#c79a5e'); R(x, -112 * s, -150 * s, 224 * s, 306 * s, '#fbf6ea')
  R(x, -40 * s, -184 * s, 80 * s, 30 * s, '#8a82a6')
  x.font = `700 ${Math.round(19 * s)}px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  TODO.forEach((it, i) => {
    const y = -112 * s + i * 56 * s
    R(x, -100 * s, y - 12 * s, 24 * s, 24 * s, INK); R(x, -97 * s, y - 9 * s, 18 * s, 18 * s, '#fbf6ea')
    const done = i > 0 && i < 4 ? 1 : i === 4 ? rest : 0
    if (done > 0) { x.fillStyle = MINT; x.globalAlpha = done; x.fillRect(-94 * s, y - 6 * s, 12 * s, 12 * s); x.globalAlpha = 1 }
    x.fillStyle = INK; x.fillText(it, -66 * s, y + 1)
    if (i === 0 && struck > 0) R(x, -70 * s, y - 2 * s, 180 * s * struck, 5 * s, RED)
  })
  x.restore()
}
/** the home-organising-show chrome: the show bug, the bins and the counter */
function sortShow(x, t, n, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  genreBug(x, t, { text: 'THE BIG SORT', x: 70, y: 300, color: '#2aa58a', size: 30 })
  const shake = t > T.tape && t < T.tape + 0.4 ? Math.sin(t * 80) * 6 : 0
  R(x, 680 + shake, 270, 330, 70, INK); R(x, 686 + shake, 276, 318, 58, '#fbf6ea')
  x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = n >= 47 ? RED : INK
  x.fillText(`SORTED: ${String(n).padStart(2, '0')}`, 845 + shake, 306)
  R(x, 680, 344, 330, 40, INK); R(x, 686, 348, 318, 32, '#2aa58a')
  x.font = `700 22px ${MONO}`; x.fillStyle = '#fbf6ea'; x.fillText(n >= 47 ? 'LEFT: …A LOT' : 'LEFT: ???', 845, 365)
  x.restore()
}

function virState(t) {
  if (t < T.go) return { mood: 'squint', look: [1, -1] }
  if (t < T.arrive) return { mood: 'happy', look: [0, 0] }
  if (t < T.sort[0]) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.pull[0] + 2.5) return { mood: 'squint', look: [Math.sign(Math.sin(t * 5)), -1] }
  if (t < T.tape) return { mood: 'wide', look: [Math.sin(t * 9), -1], blink: false }
  if (t < T.l5) return { mood: 'sleepy', look: [0, 1], zzz: false }
  if (t < T.ring) return { mood: 'neutral', look: [1, -1] }
  if (t < T.wing) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.hold) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.last) return { mood: 'heart', look: [1, 0] }
  return { mood: 'happy', look: [1, -1] }
}

async function build(stage) {
  try { await Promise.all([...SPACE_FONTS, "800 110px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "600 34px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookCard(root, { text: 'Virgo tried to organise a *galaxy cluster*.', at: 0, out: T.hookOut, top: 190, size: 100, accentSize: 150, accentColor: PINK })
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines.map(i => LINES[i]), y: 1560, width: 960, height: 240, open: b.open, close: b.close, cps: CPS }))
  const last = lastLine(root, 'Some things are too big to *fix*. | Just look.', { at: T.last, lateAt: T.last + 0.5, top: 280, size: 92, accentSize: 150, accentColor: PINK, late: 2 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function pad(t) {
    const end = t >= T.last
    const { padY, rocketX } = launchPad(x, t, { rocketX: 700 })
    const lp = end ? 0 : ease.inCubic(prog(t, ...T.lift))
    const shake = !end && t > T.count[1] && t < T.lift[1] ? clamp((t - T.count[1]) / 1.4) : 0
    if (!end && t > T.go - 0.4) {
      for (let i = 0; i < 9; i++) {
        const k = prog(t, T.go - 0.4 + i * 0.05, T.go + 1.4), r = 60 + k * 160
        x.save(); x.globalAlpha = 0.8 * (1 - prog(t, T.lift[1] - 0.4, T.lift[1] + 0.2)); x.fillStyle = i % 2 ? '#d9cfe8' : '#b9aecb'
        x.beginPath(); x.arc(rocketX + (i - 4) * (40 + k * 60), padY - 10 - k * 30 * (i % 3), r * 0.5, 0, Math.PI * 2); x.fill(); x.restore()
      }
    }
    const labels = [[0, -0.36, 'NOSE ↑', 1, -0.06], [0.12, 0.3, 'FINS', 1, 0.08], [-0.02, 0.05, end ? 'HOME' : 'ROCKET', end ? 1 : prog(t, 1.1, 1.3), 0.03]]
    rocket(x, t, rocketX, padY - 330 - lp * 1900, 620, { flame: end ? 0 : clamp((t - T.go + 0.3) * 2), shake: shake * 5, smoke: end ? 0 : clamp((t - T.go + 0.6) * 1.5) * (1 - lp), trail: lp }, 0, labels)
    if (!end) {
      const up = ease.inCubic(prog(t, T.count[2], T.count[2] + 0.55))
      if (up < 1) {
        const vr = virgoSuit(x, t, lerp(360, rocketX - 60, up), lerp(1360, padY - 560, up), 400 * (1 - 0.7 * up), { ...virState(t), hops: VIR_HOPS })
        if (up < 0.1) drawLabelMaker(x, (vr?.x ?? 320) + 150, (vr?.y ?? 1360) + 40, 9, t, { print: prog(t, ...T.print0), text: 'ROCKET' })
      }
    } else {
      const k = pop01(t, T.last - 0.05, 0.35)
      piscesSuit(x, t, 670, 1440, 250, { mood: 'heart', look: [-1, 0], pop: k, hops: PIS_HOPS })
      const vr = virgoSuit(x, t, 330, 1360, 400, { ...virState(t), hops: VIR_HOPS })
      drawLabelMaker(x, (vr?.x ?? 320) + 150, (vr?.y ?? 1360) + 40, 9, t, { print: 1, text: 'HOME' })
      floatHearts(x, t, 450, 1180, T.last + 0.4, STORY_END, 3)
    }
    drawCountdown(x, t, { at: T.count[0], x: 820, y: 760, size: 220 })
  }
  function mc(t, end) {
    // the big screen: Virgo's live feed (label maker out), Pisces floating by upside down; at the end, the track home
    const feed = (c, rect) => {
      c.fillStyle = '#0a1630'; c.fillRect(rect.x, rect.y, rect.w, rect.h)
      starfield(c, t, { speed: 0.6, dir: 'right', cx: rect.x + rect.w / 2, cy: rect.y + rect.h / 2 })
      const vr = virgoSuit(c, t, rect.x + rect.w * 0.36, rect.y + rect.h * 0.6, 330, { ...virState(t), mood: t > T.l2 ? 'sparkle' : 'happy', hops: VIR_HOPS })
      drawLabelMaker(c, vr.x + 150, vr.y + 40, 8, t, { print: prog(t, T.l2 + 0.4, T.l2 + 1.4), text: 'GALAXY 01' })
      c.save(); c.translate(rect.x + rect.w * 0.76, rect.y + rect.h * 0.42 + Math.sin(t * 1.2) * 14); c.rotate(Math.PI + Math.sin(t * 0.8) * 0.2)
      piscesSuit(c, t, 0, 0, 230, { mood: t > T.l3 ? 'happy' : 'sleepy', zzz: false, look: [0, 0], hops: PIS_HOPS })
      c.restore()
      c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = RED; c.fillText('● LIVE · ROCKET 06', rect.x + 24, rect.y + 34)
    }
    const mcr = drawMissionControl(x, t, { mission: 'MISSION 06', screens: end ? { big: 'track', progress: 1, target: 'VIRGO CLUSTER', text: 'WELCOME HOME, VIRGO + PISCES' } : { big: feed }, cheer: end ? 1 : 0, cheerAt: T.mc2 })
    const [, dy] = mcr.spots.director
    if (!end) {
      drawSaturn(x, 250, dy + 60, 240, t, { mood: 'neutral', look: [1, -1], hops: SAT_HOPS, prop: 'book' })
    } else {
      // Saturn holds up the photo; Virgo and Pisces arrive hand in hand
      drawSaturn(x, 200, dy + 60, 220, t, { mood: 'happy', look: [1, 0], hops: SAT_HOPS })
      m87(x, t, 250, dy - 170, 60, pop01(t, T.mc2 + 0.3, 0.3))
      const ax = lerp(1000, 0, ease.outCubic(prog(t, T.mc2, T.mc2 + 0.7)))
      virgoSuit(x, t, 560 + ax, dy + 260, 290, { ...virState(t), hops: VIR_HOPS })
      piscesSuit(x, t, 810 + ax, dy + 280, 260, { mood: 'happy', look: [-1, 0], hops: PIS_HOPS })
      drawHeart(x, 690 + ax, dy + 360, 7)
    }
  }
  function warp(t, back) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    const p = prog(t, back ? T.home : T.warp, back ? T.mc2 : T.inside)
    const ang = back ? Math.PI * 0.75 : -Math.PI / 4
    starfield(x, t, { speed: 3, warp: clamp(p * 3) * (1 - prog(p, 0.85, 1)), dir: ang })
    rocket(x, t, lerp(back ? 820 : 260, back ? 260 : 820, p), lerp(back ? 640 : 1300, back ? 1300 : 640, p), 420, { flame: 1.2, trail: 1, stowaway: back ? 0 : pop01(t, T.warp + 0.6) * (1 - pop01(t, T.warp + 1.4)) }, ang + Math.PI / 2)
    missionHUD(x, t, { mission: 'MISSION 06', target: 'VIRGO CLUSTER', status: back ? 'RETURNING HOME' : 'EN ROUTE' })
  }
  function inside(t) {
    const cp = cockpit(x, t, { tint: '#2e2a3a', accent: VIR.color, crate: 'LABELS (SPARE)', window: (c) => { starfield(c, t, { speed: 3, warp: 1 }) } })
    drawGhostCameo(x, t, { x: cp.crate.x + cp.crate.w, y: cp.crate.y + 70, at: GHOST.at, dur: 1.5, from: 'left', cell: 4 })
    clipboard(x, t, 830, 1060, 0.95)
    // Pisces' mug, labelled (season 9), floating
    const my = 520 + Math.sin(t * 1.4) * 20
    x.save(); x.translate(200, my); x.rotate(Math.sin(t * 0.7) * 0.3); R(x, -46, -50, 92, 100, INK); R(x, -40, -44, 80, 88, '#b4aeff'); R(x, 40, -24, 24, 50, INK); R(x, 40, -16, 14, 34, '#b4aeff'); x.restore()
    label(x, 200, my + 70, 'PISCES’ MUG', { size: 18, rot: 0.04 })
    virgoSuit(x, t, 560, 1180, 360, { mood: 'squint', look: [1, 0], seed: 6 })
  }
  function cluster(t) {
    R(x, 0, 0, 1080, 1920, '#05040c')
    starfield(x, t, { speed: 0.2 })
    // zoom: arrival, the pull-back (more and more galaxies), then the glide to M87
    const pull = ease.inOutCubic(prog(t, ...T.pull))
    const gl = ease.inOutCubic(prog(t, ...T.glide))
    let z = lerp(1.6, 0.55, pull)
    const m87at = GAL[3]
    let fx = 540, fy = 900
    if (t >= T.glide[0]) { z = lerp(0.55, 3.2, gl); fx = lerp(540, m87at.x, gl); fy = lerp(900, m87at.y, gl) }
    const wingOn = t >= T.wing
    x.save(); x.translate(540, 900); x.scale(z, z); x.translate(-fx, -fy)
    const nSorted = t < T.sort[0] ? 0 : Math.min(47, Math.floor(Math.pow(prog(t, ...T.sort), 1.6) * 47) + 1)
    GAL.forEach((g, i) => {
      const a = wingOn ? 0.45 : 1
      galaxy(x, g.x, g.y, g.r, t, g.kind, g.seed, a)
    })
    // the labels on the sorted galaxies
    if (!wingOn && t < T.glide[0]) GAL.slice(0, nSorted).forEach((g, i) => {
      const txt = i === 5 && t < T.sort[0] + 2.2 ? '???' : `GALAXY ${String(i + 1).padStart(2, '0')}`
      label(x, g.x, g.y + g.r * 0.7 + 10, txt, { size: 16, rot: ((i * 7) % 5 - 2) * 0.04, alpha: pop01(t, T.sort[0] + Math.pow((i) / 47, 1 / 1.6) * (T.sort[1] - T.sort[0]), 0.2) * (1 - gl) })
    })
    x.restore()
    // M87's black hole: the photo moment
    const rk = ease.outCubic(prog(t, T.ring, T.ring + 0.8)) * (1 - prog(t, T.home - 0.3, T.home))
    if (!wingOn) m87(x, t, 540, 700, 150, rk)
    // Virgo (and Pisces) in front
    if (!wingOn) {
      const vx = 540 + (t < T.tape ? Math.sin(t * 6) * 140 * prog(t, T.sort[0], T.sort[0] + 1) : 0)
      const vr = virgoSuit(x, t, vx, 1330, 360, { ...virState(t), hops: VIR_HOPS })
      const pr = prog(t, T.sort[0], T.tape)
      if (t < T.l5 + 1) drawLabelMaker(x, (vr?.x ?? vx) + 150, (vr?.y ?? 1330) + 40, 9, t, { print: t < T.tape ? (pr * 30) % 1 : 0, text: 'GALAXY' })
      if (t > T.tape && t < T.l5) {
        // out of tape: a sad curl of the last strip floating away
        const p = prog(t, T.tape, T.tape + 3)
        label(x, 760 + p * 120, 1300 - p * 260, 'GALAXY 4', { size: 22, rot: 0.6 + p * 2, alpha: 1 - p })
        x.save(); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.fillStyle = RED; x.globalAlpha = pop01(t, T.tape, 0.2) * (1 - prog(t, T.l5 - 0.4, T.l5)); x.fillText('OUT OF TAPE', 760, 1130); x.restore()
      }
      if (t > T.l5 - 0.3) piscesSuit(x, t, lerp(1240, 840, ease.outCubic(prog(t, T.l5 - 0.3, T.l5 + 0.4))), 1240, 260, { mood: 'happy', look: [-1, -1], hops: PIS_HOPS })
      sparkles(x, t, 540, 700, T.ring + 0.1, 14, 320, 0.3, [GOLD, '#ffb06a', BONE, PINK])
    } else {
      // on the wing, side by side, looking out at the ring
      R(x, 0, 1330, 1080, 40, INK); R(x, 0, 1336, 1080, 28, VIR.color); R(x, 0, 1336, 1080, 6, '#ffb3cf')
      m87(x, t, 540, 640, 130, 1)
      const vr = virgoSuit(x, t, 400, 1200, 320, { ...virState(t), hops: VIR_HOPS })
      piscesSuit(x, t, 690, 1210, 300, { mood: t < T.hold ? 'happy' : 'heart', look: [-1, -1], hops: PIS_HOPS })
      // the held hand: a little heart between them
      if (t > T.hold) { drawHeart(x, 545, 1280 - Math.sin((t - T.hold) * 4) * 4, 7); floatHearts(x, t, 545, 1180, T.hold + 0.3, T.home, 9, 5, 120) }
      // the last label: WOW, stuck on the visor
      const wp = prog(t, ...T.wow)
      if (wp > 0) {
        drawLabelMaker(x, (vr?.x ?? 400) - 150, (vr?.y ?? 1200) + 60, 8, t, { print: Math.min(1, wp * 1.6), text: 'WOW' })
        if (wp > 0.7) label(x, (vr?.x ?? 400) + 10, (vr?.top ?? 1040) + 40, 'WOW', { size: 30, rot: -0.1, alpha: pop01(t, T.wow[0] + 0.75, 0.2) })
      }
      clipboard(x, t, 920, 1040, 0.62, { struck: prog(t, T.tick - 0.6, T.tick - 0.2), rest: prog(t, T.tick, T.tick + 0.2) })
      sparkles(x, t, 920, 1100, T.tick + 0.05, 10, 140, 0.5, [MINT, GOLD, BONE])
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
      else cluster(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      if (scene(t) === 'cluster' && t < T.fact) missionHUD(x, t, { mission: 'MISSION 06', target: 'VIRGO CLUSTER', status: t < T.tape ? 'SORTING' : 'OUT OF TAPE' })
      if (scene(t) === 'cluster' && t < T.fact) sortShow(x, t, t < T.sort[0] ? 0 : Math.min(47, Math.floor(Math.pow(prog(t, ...T.sort), 1.6) * 47) + 1), t >= T.arrive ? pop01(t, T.show, 0.3) : 0)
      factChip(x, t, { text: 'The Virgo Cluster has over a thousand galaxies. The black hole in galaxy M87 was the first ever photographed (released 2019).', at: T.fact, dur: T.factDur, y: 1640, w: 920, label: '★ REAL SKY' })
      hook.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutMC, kind: 'flip' }, { t: T.arrive, kind: 'flip' }, { t: T.mc2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S11 E06' }), cardCuts(CUTS)]

const NOTE = [466.16, 523.25, 587.33, 698.46, 783.99, 932.33]
// the label maker's chatter: one tick per label during the sort (they speed up)
const SORT_TICKS = Array.from({ length: 47 }, (_, i) => r3(T.sort[0] + Math.pow(i / 47, 1 / 1.6) * (T.sort[1] - T.sort[0])))
export const CUES = [
  ...hookCues(0, { key: KEY }),
  ...countdownCues(T.count[0]).filter(c => c[1] >= 0.1), ...launchCues(T.go),
  ['tick', 1.1, 0.03], ['tick', 1.25, 0.03],
  ['whoosh', T.cutMC - 0.1, 0.3, 0.03], ['tick', T.cutMC, 0.05],
  ...talkCues(LINES, { cps: CPS, pitch: { [SATN]: 520, [VIRN]: 880, [PISN]: 740 } }),
  ['pop', T.feed, 932.33, 0.035, 0],
  ...warpCues(T.warp),
  ['tick', T.inside, 0.05], ['tick', T.ghost + 0.05, 0.015],
  ['boom', T.arrive, 0.18], ['glitter', T.arrive, T.arrive + 0.9], ['bell', T.arrive + 0.1, 1174.66, 0.035, 1.6, 0],
  ['pop', T.show, 1174.66, 0.045, -0.4],
  ...SORT_TICKS.map((s, i) => i % 2 ? ['tick', s, 0.02] : ['pop', s, NOTE[i % NOTE.length] * 2, 0.022, 0.3]),
  ['whoosh', T.pull[0], 1.2, 0.03],
  ['tapeStop', T.tape - 0.02, 0.5], ['pop', T.tape + 0.05, 349.23, 0.05, 0.3],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['whoosh', T.glide[0], 1.6, 0.04], ['riser', T.glide[0], T.ring, 0.04],
  ['boom', T.ring, 0.12], ['bell', T.ring + 0.05, 932.33, 0.04, 2.6, 0], ['glitter', T.ring, T.ring + 1.0],
  ['bell', T.hold, 1396.91, 0.03, 1.6, 0.2],
  ['tick', T.wow[0] + 0.1, 0.02], ['tick', T.wow[0] + 0.3, 0.02], ['pop', T.wow[0] + 0.75, 1174.66, 0.04, -0.2],
  ['pop', T.tick, 1567.98, 0.045, 0.4], ['glitter', T.tick, T.tick + 0.5],
  ...warpCues(T.home),
  ...cheerCues(T.mc2, { len: 2.4 }),
  ['pop', T.last, 932.33, 0.04, 0], ['pop', r3(T.last + 0.5), 1174.66, 0.05, 0], ['pluck', r3(T.last + 0.55), 1174.66, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void drawPixelStar; void INTER
