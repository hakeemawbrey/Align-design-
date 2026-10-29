// st9leocrew (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E24: Leo · THE CREW) · story 0–20.6, then
// the shared end card.
//   0.00  frame 0: an open-mic night, 8:00 PM. Sagittarius at the mic, Leo front row mid-jump with a giant "SAG!!!" sign,
//         Aries beside it (the fire trio). Hook: "A Leo hypes every friend like a *headliner*."
//   2.60  EARLIER, at Leo's desk (6:30 PM): Leo paints the sign, glitter everywhere. "6:30 PM — arts and *crafts.*"
//   5.60  back at the mic (8:04): SAG: "uh. hi. this one's about a *road trip.*"  The sign flips: LEGEND. Leo whoops alone.
//   9.40  Sag finds its feet; the sign flips again: ENCORE?! (Sag isn't done.) Aries laughs.
//  11.60  ★ REAL SKY: Regulus, the "little king", is the lion's heart star.
//  14.20  the room claps; Sag points the spotlight at Leo. Leo turns the sign round (YOU'RE THE STAR) and sends the light
//         back. LEO: "nope. tonight it's *your* light."
//  17.50  the last line, frame 0's framing: Leo's sign up again, and Sag holding a little sign back: "LEO!!"
//         "Your friends are *stars*, too."
//   The ghost leans out from behind the LEO LIVE poster in the flashback (3.6). Rewatch bait: the open-mic chalkboard lists
//   "8:00 SAG · 8:10 ??? · 8:20 GHOST (SHY)".
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawLeoHome, leoSpots, drawLeoStar } from '../../st9leohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, cheers, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 25
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const LEON = '♌ LEO', SAGN = '♐ SAGITTARIUS'
const MONO = "'Space Mono', monospace", INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SAG = signStar('sagittarius'), ARI = signStar('aries')

const T = {
  hookOut: 2.5, cutHome: 2.6, st1: 2.8, st1Out: 5.3, ghost: 3.6,
  cutBack: 5.6, l1: 5.8, flip1: 7.6, whoo: [7.7, 9.2], flip2: 9.4, laugh: 9.6,
  fact: 11.6, factDur: 2.6,
  clap: [14.2, 15.6], point: 14.3, swing: [14.4, 14.8], turn: 15.0, back: [15.5, 15.9], l2: 15.0, close: 17.3,
  last: 17.5, sagSign: 17.4, lastOut: [20.2, 20.55],
}
const LINES = [
  { t: T.l1, speaker: SAGN, text: 'uh. hi. this one’s about a *road trip.*', color: '#d8b0ff' },
  { t: T.l2, speaker: LEON, text: 'nope. tonight it’s *your* light.', color: '#ffc27a' },
]
const CPS = 28
const LEO_HOPS = [0.05, 0.5, 0.95, 1.4, 1.85, 2.3, ...talkHops(LINES, LEON, { cps: CPS }), T.flip1, T.flip1 + 0.45, T.flip2, T.turn, 17.55, 18.0]
const SAG_HOPS = [...talkHops(LINES, SAGN, { cps: CPS }), T.flip2 + 0.3, T.point, T.sagSign]
const ARI_HOPS = [0.25, 0.7, 1.15, T.laugh, T.laugh + 0.3, T.laugh + 0.6, T.clap[0], 17.7]

const atVenue = t => t < T.cutHome || t >= T.cutBack
const LEO0 = { x: 320, y: 1330, size: 300 }
const ARI0 = { x: 800, y: 1360, size: 230 }
const SAG0 = { x: 620, y: 900, size: 250 }
const HIDE = leoSpots('desk').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (the flashback)' }
const SHOTS = [
  { t: 0, x: 540, y: 1020, s: 1.04 },
  { t: T.cutHome, x: 480, y: 1000, s: 1.06 },
  { t: T.cutBack, x: 540, y: 960, s: 1 },
  { t: T.flip1, x: 420, y: 1160, s: 1.18 },
  { t: T.flip2, x: 540, y: 1000, s: 1.04 },
  { t: T.fact, x: 600, y: 880, s: 1.12, ease: 2.0 },
  { t: T.clap[0], x: 540, y: 960, s: 1 },
  { t: T.last, x: 540, y: 1020, s: 1.04 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
function spotCone(x, cx, top, bot, w0, w1, a, col = '255,240,200') {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a
  const g = x.createLinearGradient(0, top, 0, bot); g.addColorStop(0, `rgba(${col},0.5)`); g.addColorStop(1, `rgba(${col},0.06)`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - w0 / 2, top); x.lineTo(cx + w0 / 2, top); x.lineTo(cx + w1 / 2, bot); x.lineTo(cx - w1 / 2, bot); x.closePath(); x.fill()
  x.restore()
}
// the open-mic room: brick wall, a neon sign, a chalkboard, the little stage, café tables
function venue(x, t) {
  R(x, 0, 0, 1080, 1920, '#1a1024')
  for (let j = 0; j < 1060; j += 30) for (let i = -((j / 30) % 2) * 45; i < 1080; i += 90) R(x, i + 3, j + 3, 84, 24, (i + j) % 7 ? '#3a1d2a' : '#43222f')
  // neon OPEN MIC sign
  const flick = Math.floor(t * 7) % 23 === 0 ? 0.4 : 1
  x.save(); x.globalAlpha = t < T.hookOut ? 0.2 : (t > T.last - 0.2 ? 0.25 : 1); x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = `rgba(255,79,216,${0.9 * flick})`; x.shadowBlur = 28; x.fillStyle = `rgba(255,170,240,${flick})`; x.fillText('OPEN MIC', 470, 640)
  x.shadowColor = 'rgba(127,220,255,0.9)'; x.font = `700 30px ${MONO}`; x.fillStyle = '#bff0ff'; x.fillText('★ TONIGHT ★', 470, 700); x.restore()
  // chalkboard (rewatch bait)
  R(x, 800, 600, 230, 200, '#5c3420'); R(x, 810, 610, 210, 180, '#1f2e28')
  x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#e8efe6'
  ;['8:00 SAG', '8:10 ???', '8:20 GHOST', '     (SHY)'].forEach((s, i) => x.fillText(s, 824, 640 + i * 36))
  // stage
  R(x, 0, 1030, 1080, 24, '#2a1810'); R(x, 0, 1054, 1080, 110, '#5c3420'); R(x, 0, 1054, 1080, 8, '#8a5330')
  for (let i = 0; i < 1080; i += 120) R(x, i, 1062, 6, 102, '#4a2a18')
  // mic stand
  R(x, SAG0.x - 150, 860, 8, 175, INK); R(x, SAG0.x - 172, 1028, 52, 8, INK); R(x, SAG0.x - 160, 840, 26, 34, '#4a4166'); R(x, SAG0.x - 156, 844, 18, 26, '#8a82a6')
  // floor + café tables
  R(x, 0, 1164, 1080, 756, '#24152c')
  for (let j = 1200; j < 1920; j += 60) R(x, 0, j, 1080, 4, '#2e1c36')
  for (const [tx, ty] of [[110, 1250], [970, 1250]]) { R(x, tx - 70, ty, 140, 16, INK); R(x, tx - 64, ty + 2, 128, 10, '#8a5330'); R(x, tx - 5, ty + 16, 10, 120, INK); R(x, tx - 14, ty - 34, 22, 34, '#f4e6c8'); R(x, tx + 20, ty - 20, 14, 20, '#ff8fb1') }
}
// the giant sign: text on a white board, held on two sticks; `flip` 0…1 turns it round to `back`
const SIGNS_ = [[T.flip1, 'SAG!!!', 'LEGEND'], [T.flip2, 'LEGEND', 'ENCORE?!'], [T.turn, 'ENCORE?!', 'YOU’RE\nTHE STAR'], [T.last - 0.35, 'YOU’RE\nTHE STAR', 'SAG!!!']]
function signAt(t) {
  let text = 'SAG!!!'
  for (const [a, o, n] of SIGNS_) {
    if (t < a) return { text, sx: 1 }
    if (t < a + 0.32) { const p = (t - a) / 0.32; return { text: p < 0.5 ? o : n, sx: Math.abs(Math.cos(Math.PI * p)) } }
    text = n
  }
  return { text, sx: 1 }
}
function bigSign(x, t, cx, cy, text, sx, { w = 380, h = 200, size = 64, col = '#c8363f' } = {}) {
  R(x, cx - 40, cy + h / 2, 10, 170, '#8a5330'); R(x, cx + 30, cy + h / 2, 10, 170, '#8a5330')
  x.save(); x.translate(cx, cy); x.scale(Math.max(0.04, Math.abs(sx)), 1); x.rotate(-0.04 + 0.03 * Math.sin(t * 5))
  R(x, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK); R(x, -w / 2, -h / 2, w, h, '#fff8ea')
  for (let i = 0; i < 8; i++) drawPixelStar(x, -w / 2 + 20 + ((i * 97) % (w - 40)), -h / 2 + 16 + ((i * 53) % (h - 32)), 18, i % 2, [GOLD, '#ff8fb1', '#7fdcff'][i % 3])
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const lines = text.split('\n'), fs = lines.length > 1 ? size * 0.62 : size
  x.font = `800 ${fs}px ${INTER}`
  lines.forEach((l, i) => { x.fillStyle = INK; x.fillText(l, 3, (i - (lines.length - 1) / 2) * fs * 1.05 + 3); x.fillStyle = col; x.fillText(l, 0, (i - (lines.length - 1) / 2) * fs * 1.05) })
  x.restore()
}

function leoState(t) {
  if (!atVenue(t)) return { mood: 'squint', look: [-1, -1] }
  if (t < T.cutHome) return { mood: 'happy', look: [1, -1] }
  if (t < T.flip1) return { mood: 'sparkle', look: [1, -1] }
  if (t < T.point) return { mood: 'happy', look: [1, -1] }
  if (t < T.turn) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.last) return { mood: 'happy', look: [1, -1] }
  return { mood: 'heart', look: [1, -1] }
}
function sagState(t) {
  if (t < T.flip2) return { mood: t < T.cutHome ? 'wide' : 'squint', look: [0, 1] }
  if (t < T.point) return { mood: 'happy', look: [0, 0] }
  if (t < T.back[1]) return { mood: 'sparkle', look: [-1, 1] }
  return { mood: 'heart', look: [-1, 1] }
}
function ariState(t) {
  if (t < T.laugh) return { mood: 'happy', look: [-1, 0] }
  if (t < T.laugh + 1.2) return { mood: 'happy', look: [-1, 0], squash: 0.08 * Math.sin(t * 30) }
  return { mood: 'sparkle', look: [-1, -1] }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "800 64px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Leo hypes every friend like a *headliner*.', at: 0, out: T.hookOut, top: 270 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '6:30 PM', text: 'arts and *crafts.*' })
  const box = dialogueBox(root, { lines: LINES.slice(0, 1), y: 1560, width: 960, height: 230, open: T.l1 - 0.2, close: T.l1 + 3.4, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(1), y: 1560, width: 960, height: 230, open: T.l2 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Your friends are *stars*, too.', { at: T.last, lateAt: T.last + 0.5, top: 290, size: 100, accentSize: 156, late: 2 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      const ok = popOut(t, [20.2, 20.55])
      if (atVenue(t)) {
        venue(x, t)
        // the spotlight: on Sag; it swings to Leo when Sag points, and back when Leo turns the sign
        const sw = prog(t, ...T.swing) - prog(t, ...T.back)
        const sx = lerp(SAG0.x, LEO0.x, ease.inOutCubic(clamp(sw)))
        spotCone(x, sx, 0, lerp(SAG0.y + 160, LEO0.y + 150, clamp(sw)), 90, lerp(380, 440, clamp(sw)), t < T.flip2 ? 0.55 : 0.85)
        const sr = drawStarChar(x, SAG0.x, SAG0.y, SAG0.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, seed: 9, pop: ok })
        if (t > T.point && t < T.back[1]) pixelBubble(x, sr.x + 150, sr.top - 30, 'it’s LEO!', { size: 28, alpha: pop01(t, T.point, 0.2) })
        if (t > T.sagSign - 0.1) bigSign(x, t, sr.x + 200, sr.y - 40, 'LEO!!', pop01(t, T.sagSign - 0.1, 0.3), { w: 220, h: 120, size: 56, col: '#f39a3a' })
        drawStarChar(x, ARI0.x, ARI0.y, ARI0.size, t, { color: ARI.color, glyph: ARI.glyph, ...ariState(t), hops: ARI_HOPS, seed: 6, pop: ok })
        if (t > T.laugh && t < T.laugh + 1.4) pixelBubble(x, ARI0.x, ARI0.y - 200, 'HA! SAG’S NOT DONE', { size: 26, alpha: pop01(t, T.laugh, 0.2) })
        const lr = drawLeoStar(x, LEO0.x, LEO0.y, LEO0.size, t, { ...leoState(t), hops: LEO_HOPS, seed: 4, pop: ok })
        const ss = signAt(t), hop = (lr.y - LEO0.y)
        bigSign(x, t, LEO0.x + 10, LEO0.y - 300 + hop * 0.6, ss.text, ss.sx)
        if (t > T.whoo[0] && t < T.whoo[1]) pixelBubble(x, LEO0.x + 230, LEO0.y - 140, 'WOOOO!!', { size: 34, alpha: pop01(t, T.whoo[0], 0.2), color: '#ffe3a8' })
        sparkles(x, t, LEO0.x, LEO0.y - 300, T.flip1, 10, 220, 0.2); sparkles(x, t, LEO0.x, LEO0.y - 300, T.flip2, 10, 220, 1.2); sparkles(x, t, sr.x, sr.y, T.back[1], 12, 200, 2.2)
        sparkles(x, t, LEO0.x, LEO0.y - 300, T.last, 12, 240, 0.7)
      } else {
        // EARLIER: Leo painting the sign at its desk
        drawLeoHome(x, t, { room: 'desk', ep: 'crew', sky: skyIn(t, 18.5), light: 0.2, ring: 0 })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 4 })
        const p = prog(t, T.cutHome + 0.2, T.cutBack - 0.6)
        const txt = 'SAG!!!'.slice(0, Math.ceil(p * 6))
        bigSign(x, t, 380, 930, txt || ' ', 1, { w: 420, h: 220, size: 72 })
        drawLeoStar(x, 700, 1230, 300, t, { ...leoState(t), hops: [T.cutHome + 0.6, T.cutHome + 1.4, T.cutHome + 2.2], seed: 4 })
        // the paintbrush
        const bx = 560 + Math.sin(t * 9) * 20, by = 1020 + Math.cos(t * 9) * 10
        x.save(); x.translate(bx, by); x.rotate(-0.9); R(x, -6, -60, 12, 80, INK); R(x, -3, -57, 6, 60, '#c98a1f'); R(x, -8, 18, 16, 22, '#c8363f'); x.restore()
        for (let i = 0; i < 14; i++) { const tt = (t * 1.3 + i * 0.37) % 1; drawPixelStar(x, 380 + Math.sin(i * 3.1) * 220, 820 + tt * 300, 14, i % 2, [GOLD, '#ff8fb1', '#7fdcff'][i % 3]) }
        x.save(); x.font = `700 40px ${MONO}`; x.textAlign = 'left'; x.fillStyle = 'rgba(255,241,200,0.9)'; x.fillText('EARLIER…', 120, 1460); x.restore()
      }
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.3 })
      if (atVenue(t)) drawClock(x, t, { from: '8:00', to: t < T.cutBack ? '8:00' : t < T.last ? '8:04' : '8:12', at: t < T.last ? T.cutBack : T.last, dur: t < T.last ? 0.35 : 0.5, ampm: 'PM', sign: 'leo' })
      else drawClock(x, t, { from: '6:30', ampm: 'PM', sign: 'leo' })
      factChip(x, t, { text: 'Regulus, the “little king”, is the lion’s heart star.', at: T.fact, dur: T.factDur, y: 300, label: '★ REAL SKY' })
      hook.update(t); st1.update(t); box.update(t); box2.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutBack, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E24' }), cardCuts(CUTS)]

const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...cheers(0.05, 1.4, 0.04),
  ['whoosh', T.cutHome - 0.1, 0.3, 0.03], ['tick', T.cutHome, 0.06],
  ...stampCues(T.st1), ['glitter', T.cutHome + 0.3, T.cutBack - 0.5],
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.cutHome + 0.2 + i * 0.4), [587.33, 659.25, 739.99, 880, 987.77, 1174.66][i], 0.03, -0.3]),
  ['tick', T.ghost + 0.05, 0.015],
  ...clockCues(T.cutBack, 0.35),
  ...talkCues(LINES, { cps: CPS, pitch: { [SAGN]: 587, [LEON]: 740 } }),
  ['whoosh', T.flip1, 0.25, 0.04], ['pop', r3(T.flip1 + 0.15), 1174.66, 0.05, -0.3], ['clap', r3(T.whoo[0] + 0.05), { ...FX, gain: 0.18 }], ['clap', r3(T.whoo[0] + 0.3), { ...FX, gain: 0.16 }],
  ['whoosh', T.flip2, 0.25, 0.04], ['pop', r3(T.flip2 + 0.15), 1318.51, 0.05, -0.3],
  ['pop', T.laugh, 659.25, 0.035, 0.4], ['pop', r3(T.laugh + 0.3), 739.99, 0.035, 0.4], ['pop', r3(T.laugh + 0.6), 880, 0.035, 0.4],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ...cheers(T.clap[0], T.clap[1], 0.07),
  ['whoosh', T.swing[0], 0.4, 0.04], ['whoosh', T.turn, 0.3, 0.035], ['whoosh', T.back[0], 0.4, 0.04], ['bell', T.back[1], 1567.98, 0.035, 1.2, 0.3],
  ['pop', T.sagSign, 987.77, 0.04, 0.3],
  ['pop', T.last, 880, 0.04, 0], ['pop', r3(T.last + 0.5), 1318.51, 0.05, 0], ['pluck', r3(T.last + 0.55), 1318.51, 0.045, 0.6, 0],
  ...cheers(T.last + 0.5, T.last + 1.7, 0.05),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE
