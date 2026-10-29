// st9leoam (24 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E21: Leo · MORNING) · story 0–19.6, then the
// shared end card.
//   0.00  frame 0 (the thumbnail): Leo's bedroom, 6:58 AM, the ring light already on and Leo mid crown-flip in front of it.
//         Hook: "POV: a Leo's morning | *lighting* check."  The ring light's HUD steps WARM → WARMER → GOLDEN.
//   2.80  cut to the bulb mirror (7:00 AM): "7:00 AM — lighting: *perfect.*"  The crown flip, with a sparkle swoosh.
//   5.50  the mirror pep talk. LEO: "who has a big heart *and* great lighting?" The APPLAUSE sign lights up, a crowd
//         cheers, Leo bows ("thank u. thank u."). The reflection is always a beat late (rewatch bait).
//   9.40  cut to the window nook, the clock rolls to 7:12: the real Sun comes up in the window, also posing.
//         ★ ASTROLOGY SAYS: Leo is ruled by the Sun. LEO: "oh. you're up *too?*"
//  13.80  back in the bedroom: Leo clicks the ring light OFF and stands in the sunbeam instead.
//         "7:15 AM — natural light. *natural* glow."  The ghost leans out from behind the headboard (14.6).
//  16.20  the last line, in frame 0's framing and pose (the crown flip), ring light off: "Shine *for* yourself first."
//   19.6  the end card.
// One canvas (the room in a camera, the cast, the vlog chrome), DOM type on top, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawLeoHome, leoSpots, drawLeoStar, drawRingLight } from '../../st9leohome.js'
import { GOLD, BONE, PINK, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, cheers, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 24
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 19.6
const LEON = '♌ LEO'

const T = {
  hookOut: 2.7, hud: [0.0, 0.75, 1.5], ff1: [2.25, 0.5],
  cut1: 2.8, st1: 3.0, st1Out: 5.3, flip1: 3.35,
  open: 5.45, l1: 5.6, applause: [7.75, 9.15], bow: [8.0, 8.5], close: 9.25,
  cut2: 9.4, ff2: [9.45, 0.8], sun: [9.5, 11.4], fact: 10.2, factDur: 3.1, l2: 11.4, close2: 13.55,
  cut3: 13.8, click: 14.35, st2: 14.5, st2Out: 16.05, ghost: 14.6,
  last: 16.2, lastLand: 16.75, lastOut: [19.15, 19.45], flip2: 16.3,
}
const LINES = [
  { t: T.l1, speaker: LEON, text: 'who has a big heart *and* great lighting?', color: '#ffc27a' },
  { t: T.l2, speaker: LEON, text: 'oh. you’re up *too?*', color: '#ffc27a' },
]
const CPS = 28
const HOPS = [...talkHops(LINES, LEON, { cps: CPS }), T.flip1, T.bow[0], T.bow[1], T.click, T.flip2]

// rooms by time
const roomAt = t => t < T.cut2 ? 'bedroom' : t < T.cut3 ? 'window' : 'bedroom'
const SHOTS = [
  { t: 0, x: 540, y: 960, s: 1 },
  { t: T.cut1, x: 760, y: 1060, s: 1.32 },          // the mirror two-shot
  { t: T.applause[0], x: 780, y: 1040, s: 1.45 },   // punch-in on the applause
  { t: T.cut2, x: 540, y: 960, s: 1 },
  { t: T.fact + 1.0, x: 560, y: 900, s: 1.12, ease: 2.2 },
  { t: T.cut3, x: 540, y: 960, s: 1 },
]
const RING = { x: 250, y: 930, r: 96 }
const LEO0 = { x: 600, y: 1170, size: 350 }
const MIRROR = leoSpots('bedroom').mirror
const HIDE = leoSpots('bedroom').hide[1]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where }

function leoState(t) {
  if (t < T.cut1) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.l1) return { mood: t < T.flip1 + 0.6 ? 'happy' : 'sparkle', look: [1, 0] }
  if (t < T.applause[0]) return { mood: 'happy', look: [1, 0] }
  if (t < T.cut2) return { mood: 'heart', look: [0, 0] }
  if (t < T.sun[0] + 0.9) return { mood: 'sleepy', look: [0, 0], zzz: false }
  if (t < T.l2) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.cut3) return { mood: 'happy', look: [1, -1] }
  if (t < T.click + 0.4) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'happy', look: [0, 0] }
}
function crownRot(t) {
  const f = (t0) => { const d = t - t0; return d > 0 && d < 0.9 ? -0.7 * Math.sin(Math.PI * Math.min(1, d / 0.35)) * Math.exp(-d * 2.5) : 0 }
  return t < 0.6 ? -0.45 + 0.75 * ease.outBack(clamp(t / 0.6)) - 0.3 : f(T.flip1) + f(T.flip2)
}

// the Sun, with a face: it rises in the window and strikes the same pose
function drawSun(x, t, cx, cy, r, happy) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 3); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(1, 'rgba(255,214,140,0)')
  x.fillStyle = g; x.fillRect(cx - r * 3, cy - r * 3, r * 6, r * 6); x.restore()
  const c = 10
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2 + t * 0.4, rr = r + 22 + (i % 2) * 14
    x.fillStyle = i % 2 ? '#ffd27a' : '#ffb347'; x.fillRect(Math.round(cx + Math.cos(a) * rr - c), Math.round(cy + Math.sin(a) * rr - c), 2 * c, 2 * c)
  }
  for (let j = -r; j <= r; j += c) {
    const hw = Math.floor(Math.sqrt(r * r - j * j) / c) * c
    x.fillStyle = INK; x.fillRect(cx - hw - c, cy + j - c / 2, 2 * hw + 2 * c, c + 1)
  }
  for (let j = -r + c; j <= r - c; j += c) {
    const hw = Math.floor(Math.sqrt((r - c) * (r - c) - j * j) / c) * c
    x.fillStyle = j < -r * 0.3 ? '#ffe9a8' : '#ffc94d'; x.fillRect(cx - hw, cy + j - c / 2, 2 * hw, c + 1)
  }
  x.fillStyle = INK
  if (happy) for (const s of [-1, 1]) { x.fillRect(cx + s * 30 - 12, cy - 10, 8, 8); x.fillRect(cx + s * 30 - 4, cy - 18, 8, 8); x.fillRect(cx + s * 30 + 4, cy - 10, 8, 8) }
  else for (const s of [-1, 1]) x.fillRect(cx + s * 30 - 8, cy - 20, 16, 24)
  x.fillStyle = '#ff9a7a'; for (const s of [-1, 1]) x.fillRect(cx + s * 52 - 10, cy + 14, 20, 8)
  // its own little crown: it is the Sun, after all
  x.fillStyle = INK; x.fillRect(cx - 34, cy - r - 4, 68, 22)
  x.fillStyle = '#f7c948'; x.fillRect(cx - 30, cy - r, 60, 14); x.fillRect(cx - 30, cy - r - 12, 10, 12); x.fillRect(cx - 5, cy - r - 16, 10, 16); x.fillRect(cx + 20, cy - r - 12, 10, 12)
}
function applauseSign(x, t, on) {
  const cx = MIRROR.x, cy = 770
  x.fillStyle = INK; x.fillRect(cx - 150, cy - 40, 300, 80)
  const lit = on, blink = Math.floor(t * 6) % 2 === 0
  x.fillStyle = lit ? '#ff3b4f' : '#5a1a26'; x.fillRect(cx - 142, cy - 32, 284, 64)
  x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = lit ? '#fff1e0' : '#8a3a46'; x.fillText('APPLAUSE', cx, cy + 3)
  if (lit) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx, cy, 20, cx, cy, 260); g.addColorStop(0, `rgba(255,60,80,${blink ? 0.45 : 0.25})`); g.addColorStop(1, 'rgba(255,60,80,0)'); x.fillStyle = g; x.fillRect(cx - 260, cy - 260, 520, 520); x.restore() }
  R(x, cx - 6, cy + 40, 12, 40, INK)
}
function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(a, b, w, h) }
const HUD = ['LIGHT: WARM', 'LIGHT: WARMER', 'LIGHT: GOLDEN']

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Leo’s morning *lighting* check.', at: 0, out: T.hookOut, top: 270, accentColor: GOLD })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '7:00 AM', text: 'lighting: *perfect.*' })
  const st2 = stampCaption(root, { at: T.st2, out: T.st2Out, time: '7:15 AM', text: 'natural light. *natural* glow.' })
  const box = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1540, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1540, width: 960, height: 200, open: T.l2 - 0.2, close: T.close2, cps: CPS })
  const last = lastLine(root, 'Shine *for* | yourself first.', { at: T.last, lateAt: T.lastLand, top: 300, accentColor: GOLD, late: 0 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const room = roomAt(t)
      const hour = t < T.cut2 ? 6.9 : t < T.cut3 ? lerp(6.4, 7.2, prog(t, T.cut2, T.cut3)) : 7.25
      const ringOn = t < T.click ? 1 : 0
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawLeoHome(x, t, { room, ep: 'am', sky: skyIn(t, hour), light: room === 'bedroom' ? (t < T.cut3 ? 0.55 : 1) : 0 })
      const ok = popOut(t, [19.2, 19.55])
      if (room === 'bedroom') {
        applauseSign(x, t, t > T.applause[0] && t < T.applause[1])
        drawRingLight(x, RING.x, RING.y, RING.r, t, { on: ringOn, stand: 250 })
        if (t < T.cut1) {   // the ring light's settings HUD
          const i = t < T.hud[1] ? 0 : t < T.hud[2] ? 1 : 2, p = pop01(t, T.hud[i], 0.25, 2.4)
          pixelBubble(x, RING.x + 40, RING.y - RING.r - 70, HUD[i], { size: 40 * (0.7 + 0.3 * p), color: '#ffe3a8' })
        }
        if (t > T.click - 0.05 && t < T.click + 0.6) pixelBubble(x, RING.x, RING.y - RING.r - 60, 'OFF', { size: 30, color: '#c9c2d8', alpha: 1 - prog(t, T.click + 0.3, T.click + 0.6) })
        // the reflection (a beat late), clipped to the mirror glass
        x.save(); x.beginPath(); x.rect(MIRROR.x - 120, MIRROR.y - 150, 240, 330); x.clip()
        const tl = t - 0.25, sR = leoState(tl)
        drawLeoStar(x, MIRROR.x + 30, MIRROR.y + 70, 190, tl, { ...sR, look: [-(sR.look?.[0] ?? 0), sR.look?.[1] ?? 0], alpha: 0.72, glow: 0.4, hops: HOPS, crownRot: -crownRot(tl), seed: 3, glyph: null })
        x.restore()
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 4 })
        const r = drawLeoStar(x, LEO0.x, LEO0.y, LEO0.size, t, { ...leoState(t), hops: HOPS, crownRot: crownRot(t), seed: 2, pop: ok })
        sparkles(x, t, r.x - 40, r.top + 20, T.flip1 + 0.1, 8, 120, 0.3)
        sparkles(x, t, r.x - 40, r.top + 20, T.flip2 + 0.1, 8, 120, 1.3)
        if (t > T.bow[0] && t < T.close) pixelBubble(x, r.x + 30, r.top - 90, 'thank u. thank u.', { size: 28, alpha: pop01(t, T.bow[0], 0.25) })
        if (t > T.click && t < T.click + 0.7) sparkles(x, t, r.x, r.y, T.click + 0.1, 10, 170, 0.8, [GOLD, '#ffe3a8', BONE])
      } else {
        // the window nook: the Sun rises, sees Leo, and strikes the same pose
        const win = leoSpots('window').win
        const sp = ease.outCubic(prog(t, ...T.sun))
        x.save(); x.beginPath(); x.rect(win.x, win.y, win.w, win.h * 0.45); x.clip()
        drawSun(x, t, 650, lerp(win.y + win.h * 0.45 + 120, win.y + 170, sp), 84, t > T.l2)
        x.restore()
        // the lower panes show the sunrise glow over the city (drawn by the home) — just add warmth
        drawLeoStar(x, 400, 1180, 300, t, { ...leoState(t), hops: HOPS, crownRot: crownRot(t), seed: 2 })
      }
      x.restore()
      // chrome
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.92 })
      if (t < T.cut2) drawClock(x, t, { from: '6:58', to: '7:00', at: T.ff1[0], dur: T.ff1[1], sign: 'leo' })
      else drawClock(x, t, { from: '7:00', to: t < T.cut3 ? '7:12' : '7:15', at: t < T.cut3 ? T.ff2[0] : T.cut3, dur: t < T.cut3 ? T.ff2[1] : 0.3, sign: 'leo' })
      factChip(x, t, { text: 'Leo is ruled by the Sun.', at: T.fact, dur: T.factDur, y: 300, label: '★ ASTROLOGY SAYS' })
      hook.update(t); st1.update(t); st2.update(t); box.update(t); box2.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut2, kind: 'flip' }, { t: T.cut3, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E21' }), cardCuts(CUTS)]

const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...T.hud.slice(1).map((h, i) => ['pop', h, NOTE[i + 2], 0.04, -0.4]),
  ...clockCues(T.ff1[0], T.ff1[1]),
  ['whoosh', T.cut1 - 0.15, 0.25, 0.03],
  ...stampCues(T.st1),
  ['glitter', T.flip1, T.flip1 + 0.6], ['pluck', T.flip1, 1318.51, 0.04, 0.6, -0.2],
  ['pop', T.open, 987.77, 0.035, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 740 } }),
  ['tick', T.applause[0] - 0.02, 0.08], ['bell', T.applause[0], 1760, 0.03, 1.0, 0.3],
  ...cheers(T.applause[0], T.applause[1]),
  ['pop', T.bow[0], 830.61, 0.04, 0], ['pop', T.bow[1], 659.25, 0.04, 0],
  ...clockCues(T.ff2[0], T.ff2[1]),
  ['swell', T.sun[0], T.sun[1], { bus: 'sfx', gain: 0.03, f0: 400, f1: 1800 }], ['bell', T.sun[1] - 0.2, 1318.51, 0.035, 1.6, 0.2],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['tick', T.click, 0.12], ['pop', T.click + 0.02, 523.25, 0.04, -0.5],
  ...stampCues(T.st2),
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.last, 987.77, 0.03, 0], ['pop', r3(T.last + 0.09), 1108.73, 0.03, 0], ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 1318.51, 0.045, 0.6, 0],
  ['glitter', T.flip2, T.flip2 + 0.6],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void PINK; void el
