// kcfe07: ZODIAC CONFESSIONAL ep 7, "Libra minded. A lot." (15 s vertical, music: dreamy · Eb). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Libra mid-SHRUG in the chair, red circle round the shrug; hook "“I don't *mind.*” (Libra minded.)"
//   0.45   record scratch + freeze: "the *shrug.*"
//   1.6–6.4   EARLIER: a café table at night with a date (Capricorn). "where should we eat?" "I don't mind." · "movie?"
//             "I don't mind." · "dessert?" "I don't mind!" (each shrug faster)
//   6.4–8.6   booth: Libra screams into a cushion: "I WANTED *NOODLES.*" (shake)
//   8.7–11.9  PRODUCER: "so why didn't you say?" · "I didn't want to *be a bother.*" Pisces sobs.
//   12.0–13.6 Libra practises to camera: "I'd *love* noodles."
//   14.0      last line "Wanting noodles is *allowed.*" holds → hard cut at 15.0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, pop01, wob, wrapText,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, recordScratch, recordScratchCues, frozen, caught, caughtCues, screenShake, shakeCues } from '../../hookkit.js'

export const DURATION = 15
const LIB = SIGN('libra'), CAP = SIGN('capricorn')
const T = { scratch: 0.45, broll: [1.6, 6.4], scream: 6.6, prod: 8.75, bother: 10.4, practise: 12.05, last: 14.0 }
const DATE = [
  { t: 1.85, who: 'cap', text: 'where should we eat?' }, { t: 2.45, who: 'lib', text: "I don't mind." },
  { t: 3.3, who: 'cap', text: 'movie?' }, { t: 3.75, who: 'lib', text: "I don't mind." },
  { t: 4.5, who: 'cap', text: 'dessert?' }, { t: 4.85, who: 'lib', text: "I don't mind!" },
  { t: 5.45, who: 'cap', text: 'ok! salad bar?' }, { t: 5.8, who: 'lib', text: '…love that.' },
]
const SHRUGS = [-0.4, 2.45, 3.75, 4.85, 5.8]
const HOOK = { at: -1, text: '“I don’t *mind.*” | (Libra minded.)', top: 150, size: 104, accentColor: LIB.color, out: [1.45, 1.6] }
const CAUGHT = { at: -1, x: 540, y: 960, r: 250, label: null, arrow: null, rec: false, out: [1.4, 1.6] }
const REC = { at: T.scratch, len: 1.1, caption: 'the *shrug.*', sub: 'exhibit A', top: 1560 }
const WHIP2 = { at: T.broll[0] - 0.04, len: 0.4, from: 1.5 }, WHIP3 = { at: T.broll[1] - 0.04, len: 0.35, from: 1.8 }
const SHAKE = { at: T.scream + 0.05, len: 0.9, amp: 26 }
const WHO = `${LIB.glyph}︎ LIBRA`
const CAPS = [
  { t: T.scream, end: 8.6, who: WHO, color: LIB.color, text: 'I WANTED *NOODLES.*', accent: '#ffcf5a' },
  { t: T.prod, end: 10.25, kind: 'prod', text: "so why didn't you say?" },
  { t: T.bother, end: 11.95, who: WHO, color: LIB.color, text: "I didn't want to *be a bother.*" },
  { t: T.practise, end: 13.85, who: WHO, color: LIB.color, text: "I'd *love* noodles." },
  { t: T.last, end: 99, who: WHO, color: LIB.color, text: 'Wanting noodles is *allowed.*' },
]

// shrug: a quick lift-and-squash plus little "^ ^" marks
const shrugK = t => { let k = 0; for (const s of SHRUGS) { const d = t - s, len = s < 0 ? 1.0 : 0.5; if (d >= 0 && d < len) k = Math.max(k, Math.sin(Math.PI * d / len)) } return k }
function shrugMarks(x, cx, cy, s, k) {
  if (k < 0.05) return
  x.save(); x.globalAlpha = Math.min(1, k * 1.6); x.strokeStyle = BONE; x.lineWidth = 10; x.lineCap = 'round'
  for (const d of [-1, 1]) { x.beginPath(); x.moveTo(cx + d * s * 0.52, cy - s * 0.05); x.lineTo(cx + d * s * 0.62, cy - s * 0.2 - k * 20); x.lineTo(cx + d * s * 0.72, cy - s * 0.05); x.stroke() }
  x.restore()
}
function bubble(x, cx, cy, text, k, { col = BONE, tail = 'L' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 44px ${INTER}`
  const rows = wrapText(x, text, 440), w = Math.max(...rows.map(r => x.measureText(r).width)) + 56, h = rows.length * 54 + 36
  x.fillStyle = INK; rr(x, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 26); x.fill()
  x.fillStyle = col; rr(x, -w / 2, -h / 2, w, h, 22); x.fill()
  x.beginPath(); const tx = tail === 'L' ? -w / 4 : w / 4; x.moveTo(tx - 18, h / 2 - 2); x.lineTo(tx + (tail === 'L' ? -30 : 30), h / 2 + 34); x.lineTo(tx + 18, h / 2 - 2); x.fill()
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  rows.forEach((r, i) => x.fillText(r, 0, (i - (rows.length - 1) / 2) * 54 + 2))
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function booth(t) {
    drawBooth(x, t, { sign: 'libra' })
    const sk = shrugK(t)
    const mood = step(t, [[-1, 'happy'], [T.scream, 'squint'], [T.prod, 'wide'], [T.bother, 'neutral'], [T.practise, 'sparkle'], [T.last, 'happy']])
    const F = seat(x, t, 'libra', { ...SUBJ, y: SUBJ.y - sk * 40, hops: [T.bother + 0.05, T.practise + 0.05, T.practise + 0.6, T.last + 0.05] }, { mood, look: t > T.bother && t < T.practise ? [0, 1] : [0, 0], seed: 11, squash: -sk * 0.14, tears: t > T.bother && t < T.practise ? 1 : 0 })
    shrugMarks(x, SUBJ.x, F.cy, SUBJ.s, sk)
    // the cushion scream
    const ck = t > T.scream - 0.15 && t < T.prod ? easeOutBack(prog(t, T.scream - 0.15, T.scream + 0.1), 1.8) * (1 - prog(t, T.prod - 0.25, T.prod)) : 0
    if (ck > 0.01) {
      const jit = Math.sin(t * 60) * 6
      x.save(); x.translate(SUBJ.x + jit, F.cy + 10); x.scale(ck, ck); x.rotate(0.05)
      blk(x, -170, -120, 340, 240, '#f59cc4', { r: 60 })
      x.fillStyle = '#d97aa8'; x.beginPath(); x.arc(0, 0, 18, 0, Math.PI * 2); x.fill()
      x.restore()
      // muffled scream lines
      x.save(); x.strokeStyle = BONE; x.lineWidth = 8; x.globalAlpha = 0.8
      for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.4, r0 = 250 + 20 * Math.sin(t * 30 + i); x.beginPath(); x.moveTo(SUBJ.x + Math.cos(a) * r0, F.cy + Math.sin(a) * r0); x.lineTo(SUBJ.x + Math.cos(a) * (r0 + 70), F.cy + Math.sin(a) * (r0 + 70)); x.stroke() }
      x.restore()
    }
    drawChairFront(x)
    // a bowl of noodles appears when Libra practises
    const nk = pop01(t, T.practise + 0.3, 0.35, 2)
    if (nk > 0.01) {
      x.save(); x.translate(SUBJ.x - 230, F.cy + 230); x.scale(nk, nk)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 110, 70, 0, 0, Math.PI); x.fill(); x.fillRect(-116, -10, 232, 18)
      x.fillStyle = '#e8604a'; x.beginPath(); x.ellipse(0, 4, 100, 60, 0, 0, Math.PI); x.fill()
      x.strokeStyle = '#f6d08a'; x.lineWidth = 9; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-70 + i * 35, 0); x.quadraticCurveTo(-60 + i * 35, -50, -40 + i * 35, -20); x.stroke() }
      x.fillStyle = INK; x.fillRect(30, -150, 10, 160); x.fillRect(50, -150, 10, 160)
      x.restore()
      sparkles(x, t, SUBJ.x - 230, F.cy + 190, T.practise + 0.4, 8, 120, 3)
    }
    const sob = t > T.bother
    boomOp(x, t, { tears: sob ? 4 : 2, mood: t > T.practise ? 'happy' : 'sparkle', sway: t > T.scream && t < T.prod ? 3 : sob ? 2 : 1 })
    recChrome(x, t, { tc0: 7720, y0: 440 })
  }

  function broll(t) {
    x.save(); x.translate(wob(t, 1.2, 6, 1), wob(t, 1, 5, 2))
    drawRoom(x, t, { wall: '#2a2350', floor: '#3a2a20', window: true, lamp: true })
    // string lights
    for (let i = 0; i < 12; i++) { const px = 40 + i * 90, py = 420 + 30 * Math.sin(i * 0.9); x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 22); x.fillStyle = i % 2 ? GOLD : PINK; x.globalAlpha = 0.75 + 0.25 * Math.sin(t * 4 + i); x.fillRect(px - 6, py - 6, 12, 16); x.globalAlpha = 1 }
    // the café table
    const sk = shrugK(t)
    seat(x, t, 'capricorn', { x: 790, y: 1010, s: 270, hops: DATE.filter(d => d.who === 'cap').map(d => d.t) }, { mood: 'happy', look: [-1, 0], seed: 12 })
    seat(x, t, 'libra', { x: 290, y: 1010 - sk * 30, s: 270 }, { mood: 'happy', look: [1, 0], seed: 11, squash: -sk * 0.14 })
    shrugMarks(x, 290, 1010 - sk * 30, 270, sk)
    blk(x, 120, 1150, 840, 40, '#f4ead8', { r: 8 })
    x.fillStyle = INK; x.fillRect(520, 1190, 40, 150)
    // two mugs (cocoa)
    for (const mx of [400, 680]) { blk(x, mx - 40, 1086, 80, 70, '#c86a3c', { r: 10 }); x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(mx - 6, 1040 + 6 * Math.sin(t * 3 + mx), 12, 30) }
    // the speech bubbles: the latest pair
    const cur = DATE.filter(d => t >= d.t)
    const lastCap = [...cur].reverse().find(d => d.who === 'cap'), lastLib = [...cur].reverse().find(d => d.who === 'lib')
    if (lastCap) bubble(x, 760, 690, lastCap.text, easeOutBack(prog(t, lastCap.t, lastCap.t + 0.22), 2), { col: '#e6dbff', tail: 'R' })
    if (lastLib && lastLib.t > (lastCap?.t ?? 0)) bubble(x, 320, 760, lastLib.text, easeOutBack(prog(t, lastLib.t, lastLib.t + 0.22), 2), { col: '#ffd9ea', tail: 'L' })
    // Pisces on the boom, peeking from the top right
    boomOp(x, t, { tears: 2, mic: [560, 560], op: [990, 480], size: 140 })
    x.restore()
    recChrome(x, t, { label: 'EARLIER', tc0: 2210, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inB = t >= T.broll[0] && t < T.broll[1]
      if (inB) broll(t); else booth(t)
      lower.update(t, { k: inB ? 0 : t < T.broll[0] ? 1 : pop01(t, T.broll[1] + 0.05, 0.4, 1.2), name: WHO, color: LIB.color, tag: t < T.practise ? '“honestly doesn’t mind”' : '“would love noodles”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), slamTitle(HOOK), caught(CAUGHT), recordScratch(REC), whipZoom(WHIP2), whipZoom(WHIP3), screenShake(SHAKE)]
export const CUES = [
  ['whoosh', 0.0, 0.3, 0.04], ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...shakeCues(SHAKE), ...capCues(CAPS),
  ...DATE.map((d, i) => ['pop', d.t, d.who === 'cap' ? 659.25 : 880, 0.035, d.who === 'cap' ? 0.3 : -0.3]),
  ...SHRUGS.filter(s => s > 0).map((s, i) => ['pluck', s + 0.1, 1318.5 + i * 100, 0.02, 0.3, -0.3]),
  ['boom', T.scream, 0.2], ...sobCues(T.bother + 0.2, 4, 0.4),
  ['glitter', T.practise + 0.3, T.practise + 0.7], ['bell', T.practise + 0.35, 1318.5, 0.03, 1.0, 0],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
