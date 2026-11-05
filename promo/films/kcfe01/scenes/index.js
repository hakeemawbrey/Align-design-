// kcfe01: ZODIAC CONFESSIONAL ep 1, "Here for the snacks (and maybe love)" (15.6 s vertical, music: funk · A)
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition: hard cut on the last line.
//   0.00   frame 0: Taurus mid-bite of a giant cracker in the confessional chair, crumbs frozen mid-air (freeze frame,
//          FREEZE chip), hook "Taurus came for the *snacks.* Only.", lower third TAURUS · "here for the snacks".
//          Pisces dangles the boom mic in from the right, already sniffling.
//   0.40   record scratch → unfreeze, crumbs fly, whip zoom.
//   0.7–3.9   "I'm not here to make friends." · "I'm here for the *snacks.*"
//   3.9–7.4   EARLIER: the snack table. Taurus piles a plate; a Virgo walks in and laughs; slow motion: the cracker falls,
//             caught circle on Taurus's heart eyes.
//   7.4–12.3  booth. PRODUCER: "and?" · Taurus looks away, blushing… "…and *maybe love.*" Pisces bawls, the boom shakes.
//   12.3–14.6 Taurus pulls out a napkin-wrapped cracker: "I saved them *the last one.*" (the crush's name on the napkin)
//   14.6      last line "Snacks *and* love. Final answer." holds 1.0 s → hard cut at 15.6.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  clamp, lerp, prog, ease, el, easeOutBack, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, wob, pop01, outK,
  buildBug, buildLower, buildCaps, capCues, wordPops, sobCues, NOTE,
} from './cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, caught, caughtCues, screenShake, shakeCues } from '../../hookkit.js'

export const DURATION = 16.1
const TAU = SIGN('taurus'), VIR = SIGN('virgo')
const T = {
  scratch: 0.55,
  h0Out: [4.3, 4.5],
  broll: [4.5, 8.0], virIn: 5.1, laugh: 5.7, slow: [5.9, 7.4], drop: [6.0, 7.2], caught: 6.4,
  booth2: 8.0, blush: 9.4, love: 10.0, bawl: 10.5,
  napkin: [12.6, 13.05], last: 15.1, end: DURATION,
}
const WHIP = { at: -0.26, len: 0.5, from: 1.7, blur: 14 }
const HOOK = { at: -1, text: 'Taurus came for | the *snacks.* Only.', top: 150, size: 100, accentColor: '#e9b24a', out: T.h0Out }
const REC = { at: T.scratch, len: 1.0, caption: 'mid-bite. *on camera.*', sub: 'day 1 · the confessional', top: 1560 }
const CAUGHT = { at: T.caught, x: 380, y: 940, r: 175, label: 'HEART EYES', arrow: 'br', rec: false, out: [7.7, 7.9] }
const SHAKE = { at: T.bawl, len: 0.6, amp: 14 }
const CAPS = [
  { t: 1.65, end: 2.95, who: `${TAU.glyph}︎ TAURUS`, color: TAU.color, text: "I'm *not* here to make friends." },
  { t: 3.0, end: 4.45, who: `${TAU.glyph}︎ TAURUS`, color: TAU.color, text: "I'm here for the *snacks.*" },
  { t: 8.2, end: 9.7, kind: 'prod', text: 'and?' },
  { t: 10.0, end: 12.5, who: `${TAU.glyph}︎ TAURUS`, color: TAU.color, text: '…and *maybe* love.', accent: PINK },
  { t: 13.1, end: 15.0, who: `${TAU.glyph}︎ TAURUS`, color: TAU.color, text: 'I saved them *the last one.*' },
  { t: T.last, end: 99, who: `${TAU.glyph}︎ TAURUS`, color: TAU.color, text: 'Snacks *and* love. Final answer.', accent: PINK },
]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // story time: frozen at frame 0, slowed in the slow-motion beat
  const st = t => {
    if (t < T.slow[0]) return t
    if (t < T.slow[1]) return T.slow[0] + (t - T.slow[0]) * 0.35
    return t - (T.slow[1] - T.slow[0]) * 0.65
  }

  function cracker(x, cx, cy, s, bites, rot = 0) {
    x.save(); x.translate(cx, cy); x.rotate(rot)
    blk(x, -s / 2, -s / 2, s, s, '#e8b25a', { r: 10 })
    x.fillStyle = '#b8823a'; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) x.fillRect(-s / 3 + i * s / 3 - 5, -s / 3 + j * s / 3 - 5, 10, 10)
    x.fillStyle = INK
    for (let b = 0; b < bites; b++) { x.beginPath(); x.arc(s / 2 - 4, -s / 2 + 10 + b * s * 0.32, s * 0.2, 0, Math.PI * 2); x.fill() }
    x.restore()
  }
  function crumbs(x, t, cx, cy, t0, n = 14, seed = 1) {
    const d = t - t0
    if (d < 0 || d > 1.6) return
    for (let i = 0; i < n; i++) {
      const a = -Math.PI * (0.15 + 0.7 * ((i * 0.618 + seed) % 1)), v = 300 + 240 * ((i * 0.37) % 1)
      const px = cx + Math.cos(a) * v * d * (i % 2 ? 1 : -1), py = cy + Math.sin(a) * v * d + 900 * d * d
      x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 18); x.fillStyle = i % 3 ? '#e8b25a' : '#f6d08a'; x.fillRect(px - 6, py - 6, 12, 12)
    }
  }

  function booth(t, s) {
    drawBooth(x, s, { sign: 'taurus' })
    // Taurus in the chair
    let mood = step(t, [[0, 'happy'], [3.0, 'sparkle'], [T.booth2, 'neutral'], [T.blush, 'squint'], [T.love, 'heart'], [12.6, 'happy'], [T.last, 'heart']])
    let look = step(t, [[0, [0, 0]], [T.booth2, [0, 0]], [T.blush, [-1, 1]], [T.love, [0, 0]]])
    const hops = [1.7, 2.3, 3.05, 3.7, 10.05, 10.7, 13.15, 13.8, T.last + 0.05]
    const F = seat(x, s, 'taurus', { ...SUBJ, hops }, { mood, look, seed: 9, blush: t > T.blush ? 1 : undefined })
    // the cracker: mid-bite at frame 0, then munched down
    if (t < T.broll[0]) {
      const bites = t < 1.9 ? 1 : t < 2.8 ? 2 : 3
      const bob = Math.sin(s * 9) * 6
      cracker(x, SUBJ.x + 120, F.cy + 40 + bob, 150, bites, -0.2)
      crumbs(x, s, SUBJ.x + 160, F.cy + 10, -0.25, 16, 1)
      crumbs(x, s, SUBJ.x + 150, F.cy + 20, 1.9, 8, 2)
      crumbs(x, s, SUBJ.x + 150, F.cy + 20, 2.8, 8, 3)
    }
    // the napkin-wrapped last cracker
    if (t > T.napkin[0]) {
      const k = easeOutBack(prog(t, ...T.napkin), 1.6)
      x.save(); x.translate(SUBJ.x - 150, F.cy + 60 - 30 * k); x.scale(k, k); x.rotate(-0.12)
      blk(x, -90, -60, 180, 120, '#ffffff', { r: 14 })
      x.fillStyle = '#e8b25a'; x.fillRect(-40, -78, 80, 30)
      x.font = `italic 600 34px 'EB Garamond'`; x.fillStyle = '#c42a3f'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`for ${VIR.glyph}︎`, 0, 10)
      x.restore()
      if (t > T.napkin[1]) sparkles(x, t, SUBJ.x - 150, F.cy + 30, T.napkin[1], 8, 120, 2, [PINK, GOLD, BONE])
    }
    drawChairFront(x)
    // Pisces on the boom
    const tears = t < T.bawl ? 2 : t < 12.6 ? 4 : 3
    const shake = t > T.bawl && t < 12.6 ? 1 + 3 * Math.sin(Math.PI * prog(t, T.bawl, 12.6)) : 1
    boomOp(x, s, { tears, mood: t > T.love ? 'happy' : 'sparkle', sway: shake })
  }

  function broll(t, s) {
    const u = t - T.broll[0]
    x.save()
    x.translate(wob(s, 1.3, 6, 1), wob(s, 1.1, 5, 2)); x.rotate(wob(s, 0.8, 0.006, 3))
    drawRoom(x, s, { wall: '#5a3a2a', floor: '#2a1c1a' })
    // the snack table
    blk(x, 90, 1110, 900, 46, '#f4ead8', { r: 8 })
    x.fillStyle = INK; x.fillRect(140, 1156, 20, 170); x.fillRect(920, 1156, 20, 170)
    const bowls = [[240, '#e8b25a'], [440, '#d8604a'], [800, '#7ac46a']]
    bowls.forEach(([bx, c]) => { x.fillStyle = INK; x.beginPath(); x.ellipse(bx, 1100, 92, 40, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.ellipse(bx, 1092, 84, 30, 0, 0, Math.PI); x.fill(); x.fillStyle = '#ffffff'; x.fillRect(bx - 88, 1090, 176, 24) })
    // Taurus with a towering plate
    const tauMood = s < T.laugh ? 'happy' : 'heart'
    const F = seat(x, s, 'taurus', { x: 360, y: 960, s: 280, hops: [T.broll[0] + 0.2, T.broll[0] + 0.5] }, { mood: tauMood, look: s < T.virIn ? [0, 1] : [1, 0], seed: 9 })
    x.fillStyle = INK; x.beginPath(); x.ellipse(470, F.cy + 80, 96, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(470, F.cy + 76, 90, 20, 0, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 5; i++) cracker(x, 470 + (i % 2 ? 10 : -10), F.cy + 50 - i * 34, 70, 0, (i - 2) * 0.08)
    // the cracker in hand falls in slow motion
    const dp = ease.inQuad(prog(s, T.drop[0], T.drop[0] + (T.drop[1] - T.drop[0]) * 0.35 + 0.35))
    if (dp < 1) cracker(x, 300 + dp * 30, F.cy + 40 + dp * 360, 80, 1, dp * 2.4)
    // the Virgo walks in and laughs
    const vk = ease.outCubic(prog(s, T.virIn, T.virIn + 0.6))
    if (vk > 0) seat(x, s, 'virgo', { x: lerp(1250, 800, vk), y: 980, s: 260, hops: [T.virIn + 0.15, T.virIn + 0.4, T.laugh, T.laugh + 0.3] }, { mood: s > T.laugh ? 'happy' : 'neutral', look: [-1, 0], seed: 4 })
    // Pisces' boom pokes in from the top corner even here
    boomOp(x, s, { tears: 2, mic: [640, 560], op: [980, 420], size: 150 })
    x.restore()
    recChrome(x, s, { label: s > T.slow[0] && t < T.slow[1] ? 'SLOW MOTION' : 'EARLIER', tc0: 6120 })
    void u, F
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const s = st(t)
      const inB = t >= T.broll[0] && t < T.broll[1]
      if (inB) broll(t, s); else booth(t, s)
      if (!inB) recChrome(x, s, { tc0: 7380, y0: 440 })
      lower.update(t, { k: inB ? 0 : t < T.booth2 ? 1 : pop01(t, T.booth2 + 0.05, 0.4, 1.2), name: `${TAU.glyph}︎ TAURUS`, color: TAU.color, tag: t < T.booth2 ? '“here for the snacks”' : '“here for the snacks (mostly)”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

const WHIP2 = { at: T.broll[0] - 0.04, len: 0.4, from: 1.5 }, WHIP3 = { at: T.booth2 - 0.04, len: 0.4, from: 1.5 }
export const SCENES = [frozen(build, [REC]), whipZoom(WHIP), whipZoom(WHIP2), whipZoom(WHIP3), slamTitle(HOOK), recordScratch(REC), caught(CAUGHT), screenShake(SHAKE)]

export const CUES = [
  ...whipZoomCues(WHIP), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...caughtCues(CAUGHT), ...shakeCues(SHAKE),
  ...capCues(CAPS),
  ['pop', 1.9, 392, 0.03, 0.2], ['pop', 2.8, 392, 0.03, 0.2],
  ['whoosh', T.broll[0], 0.4, 0.05], ['pop', T.virIn + 0.15, 880, 0.03, 0.4], ['pluck', T.laugh, 1046.5, 0.035, 0.4, 0.4], ['pluck', T.laugh + 0.14, 1318.5, 0.03, 0.4, 0.4],
  ['riser', T.slow[0], T.slow[1], 0.025], ['tom', T.drop[1], 90, { gain: 0.22, decay: 0.3 }], 
  ['whoosh', T.booth2, 0.35, 0.04],
  ['pluck', T.blush, 659.25, 0.03, 0.5, -0.2], ['glitter', T.love, T.love + 0.5], ['bell', T.love + 0.05, 1318.5, 0.03, 1.2, 0],
  ...sobCues(T.bawl, 4, 0.4),
  ['pop', T.napkin[0] + 0.1, 783.99, 0.035, -0.3], ['glitter', T.napkin[1], T.napkin[1] + 0.3],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
