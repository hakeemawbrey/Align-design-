// kcfe09: ZODIAC CONFESSIONAL ep 9, "Sagittarius, month four of casual" (16.1 s vertical, music: synthwave · Bm). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Sagittarius mid-SPIN on the confessional chair, motion streaks, whip zoom; hook "Sag's “casual” thing.
//          Month *four.*"
//   0.9–2.6   "it's *totally* casual!"
//   2.7–7.0   B-ROLL: a wall calendar flips MONTH 1 · 2 · 3 · 4, and the shelf below fills: two mugs, matching keychains,
//             a shared plant. "we have a *plant.*"
//   7.0–8.6   booth, the plant in Sag's lap with a name tag: "the plant has a *name.*"
//   8.8–12.3  PRODUCER: "do you want more?" · "…*yeah.*" Pisces sobs.
//   12.4–14.4 Sag points at the camera: "I should say that to *them.* not you."
//   15.0      last line "Tell *them.* Not the camera." holds → hard cut at 16.1.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, pop01, wob,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues } from '../../hookkit.js'

export const DURATION = 16.1
const SAG = SIGN('sagittarius')
const T = { spinEnd: 0.8, casual: 0.9, broll: [2.7, 7.0], months: [2.9, 3.7, 4.5, 5.3], plantVO: 5.6, name: 7.1, prod: 8.85, yeah: 10.7, point: 12.45, last: 15.0 }
const HOOK = { at: -1, text: 'Sag’s “casual” thing. | Month *four.*', top: 150, size: 100, accentColor: SAG.color, out: [2.55, 2.7] }
const WHIP = { at: -0.26, len: 0.5, from: 1.7, blur: 14 }
const WHIP2 = { at: T.broll[0] - 0.04, len: 0.4, from: 1.5 }, WHIP3 = { at: T.broll[1] - 0.04, len: 0.4, from: 1.5 }, WHIP4 = { at: T.point - 0.04, len: 0.4, from: 1.35, cy: 1000 }
const WHO = `${SAG.glyph}︎ SAGITTARIUS`
const CAPS = [
  { t: T.casual, end: 2.6, who: WHO, color: SAG.color, text: "it's *totally* casual!" },
  { t: T.plantVO, end: 6.95, who: WHO, color: SAG.color, text: 'we have a *plant.*', accent: '#7ac46a' },
  { t: T.name, end: 8.7, who: WHO, color: SAG.color, text: 'the plant has a *name.*', accent: '#7ac46a' },
  { t: T.prod, end: 10.4, kind: 'prod', text: 'do you want more?' },
  { t: T.yeah, end: 12.3, who: WHO, color: SAG.color, text: '…*yeah.*', accent: PINK },
  { t: T.point, end: 14.75, who: WHO, color: SAG.color, text: 'I should say that to *them.* not you.' },
  { t: T.last, end: 99, who: WHO, color: SAG.color, text: 'Tell *them.* Not the camera.' },
]

function plant(x, cx, cy, s, t, tag = false) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const sw = Math.sin(t * 1.6) * 0.05
  x.save(); x.rotate(sw)
  for (const [a, l] of [[-0.6, 120], [-0.2, 150], [0.25, 140], [0.65, 110]]) { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-16, -l - 4, 32, l + 4); x.fillStyle = '#5fc46e'; rr(x, -11, -l, 22, l, 11); x.fill(); x.restore() }
  x.restore()
  blk(x, -60, -10, 120, 90, '#e07a4a', { r: 8 })
  if (tag) {
    x.save(); x.translate(70, 20); x.rotate(0.15)
    blk(x, -10, -26, 150, 52, BONE, { r: 6, ink: 4, hi: 0, lo: 0 })
    x.font = `900 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SPROUT', 65, 2)
    x.restore()
  }
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function booth(t) {
    drawBooth(x, t, { sign: 'sagittarius' })
    // the spin: the star wobbles side to side in squash while streaks whirl
    const sp = 1 - ease.outCubic(prog(t, -0.5, T.spinEnd))
    const mood = step(t, [[-1, 'happy'], [T.casual, 'wink'], [T.name, 'happy'], [T.prod, 'wide'], [T.prod + 0.6, 'neutral'], [T.yeah, 'heart'], [T.point, 'wide'], [T.point + 0.7, 'happy'], [T.last, 'sparkle']])
    const sx = sp > 0 ? Math.sin(t * 40) * 40 * sp : 0
    const F = seat(x, t, 'sagittarius', { x: SUBJ.x + sx, y: SUBJ.y, s: SUBJ.s, hops: [0.95, 1.6, T.name + 0.05, T.yeah + 0.05, T.point + 0.05, T.last + 0.05] }, { mood, look: t > T.yeah && t < T.point ? [-1, 1] : [0, 0], seed: 14, squash: sp * 0.2 * Math.sin(t * 40) })
    if (sp > 0.02) { x.save(); x.globalAlpha = sp; x.strokeStyle = BONE; x.lineWidth = 10; x.lineCap = 'round'; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(540, F.cy + 20, 300 + i * 30, 70 + i * 10, 0, t * 12 + i, t * 12 + i + 1.6); x.stroke() } x.restore() }
    // the plant in the lap
    if (t > T.broll[1]) plant(x, SUBJ.x - 120, F.cy + 120, 0.9, t, true)
    drawChairFront(x)
    // the point at the camera: a big finger-star point (an arrow)
    if (t > T.point && t < T.last) { const k = easeOutBack(prog(t, T.point, T.point + 0.25), 2); x.save(); x.translate(SUBJ.x + 210, F.cy - 40); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.moveTo(-50, -40); x.lineTo(60, 0); x.lineTo(-50, 40); x.closePath(); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(-40, -28); x.lineTo(44, 0); x.lineTo(-40, 28); x.closePath(); x.fill(); x.restore() }
    const sob = t > T.yeah
    boomOp(x, t, { tears: sob ? 4 : 2, mood: sob ? 'happy' : 'sparkle', sway: sp > 0.1 ? 2.5 : sob ? 1.8 : 1 })
    if (t > T.yeah) sparkles(x, t, 540, 880, T.yeah, 12, 280, 2, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 17720, y0: 440 })
  }

  function broll(t) {
    x.save(); x.translate(wob(t, 1.2, 5, 1), wob(t, 1, 4, 2))
    drawRoom(x, t, { wall: '#3a2a5e', floor: '#241a30', window: false, lamp: true })
    // the wall calendar
    const mi = Math.max(0, T.months.filter(m => t >= m).length - 1)
    const flip = T.months.map(m => prog(t, m - 0.15, m + 0.1)).find(p => p > 0 && p < 1) || 0
    x.save(); x.translate(560, 720)
    blk(x, -260, -230, 520, 460, BONE, { r: 10, hi: 0, lo: 0 })
    x.fillStyle = SAG.color; x.fillRect(-260, -230, 520, 110)
    x.font = `900 64px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`MONTH ${mi + 1}`, 0, -172)
    x.fillStyle = 'rgba(27,18,54,0.25)'; for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) x.fillRect(-230 + c * 66, -90 + r * 76, 52, 60)
    // a heart doodle on a date each month
    x.fillStyle = PINK; const hc = [[2, 1], [4, 0], [1, 2], [5, 3]][mi]; x.fillRect(-230 + hc[0] * 66 + 12, -90 + hc[1] * 76 + 14, 28, 28)
    if (flip > 0) { x.save(); x.scale(1, 1 - flip); x.fillStyle = BONE; x.fillRect(-260, -120, 520, 350 * (1 - flip)); x.restore() }
    x.fillStyle = INK; x.fillRect(-12, -260, 24, 40)
    x.restore()
    // the shelf fills up
    blk(x, 120, 1180, 840, 34, '#8a5a3a', { r: 4 })
    const k1 = pop01(t, T.months[0] + 0.2, 0.3, 2), k2 = pop01(t, T.months[1] + 0.2, 0.3, 2), k3 = pop01(t, T.months[2] + 0.2, 0.3, 2)
    if (k1 > 0) for (const mx of [220, 320]) { x.save(); x.translate(mx, 1130); x.scale(k1, k1); blk(x, -40, -46, 80, 92, mx === 220 ? '#7fd0f0' : '#f59cc4', { r: 10 }); x.restore() }
    if (k2 > 0) { x.save(); x.translate(500, 1110); x.scale(k2, k2); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(-30, -40, 26, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(40, -40, 26, 0, Math.PI * 2); x.stroke(); drawStarKey(x, -30, 10); drawStarKey(x, 40, 10); x.restore() }
    if (k3 > 0) plant(x, 760, 1100, 0.8 * k3, t, t > T.months[3])
    // Sag pops in from the side, beaming; Pisces on the boom
    seat(x, t, 'sagittarius', { x: 960, y: 1450, s: 230, pop: pop01(t, 3.1, 0.4, 2) }, { mood: t > T.months[3] ? 'heart' : 'happy', look: [-1, -1], seed: 14 })
    boomOp(x, t, { tears: 2, mic: [460, 1380], op: [120, 1560], size: 140, look: [1, -1] })
    x.restore()
    recChrome(x, t, { label: 'B-ROLL', tc0: 5210, y0: 440 })
  }
  function drawStarKey(x, cx, cy) { x.fillStyle = INK; x.fillRect(cx - 18, cy - 18, 36, 36); x.fillStyle = GOLD; x.fillRect(cx - 13, cy - 13, 26, 26) }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inB = t >= T.broll[0] && t < T.broll[1]
      if (inB) broll(t); else booth(t)
      lower.update(t, { k: inB ? 0 : t < T.broll[0] ? 1 : pop01(t, T.broll[1] + 0.05, 0.4, 1.2), name: WHO, color: SAG.color, tag: t < T.yeah ? '“keeping it casual”' : '“keeping a plant alive”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), whipZoom(WHIP2), whipZoom(WHIP3), whipZoom(WHIP4), slamTitle(HOOK)]
export const CUES = [
  ['whoosh', 0.0, 0.6, 0.06], ...whipZoomCues(WHIP), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...whipZoomCues(WHIP4), ...slamTitleCues(HOOK), ...capCues(CAPS),
  ...T.months.flatMap((m, i) => [['whoosh', m - 0.12, 0.2, 0.03], ['pop', m + 0.22, [784, 880, 988, 1046.5][i], 0.035, 0.2]]),
  ['bell', T.name + 0.05, 1567.98, 0.025, 0.8, -0.2],
  ['glitter', T.yeah, T.yeah + 0.5], ['bell', T.yeah + 0.05, 1318.5, 0.03, 1.2, 0], ...sobCues(T.yeah + 0.3, 4, 0.4),
  ['pop', T.point, 1174.66, 0.04, 0.2],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
