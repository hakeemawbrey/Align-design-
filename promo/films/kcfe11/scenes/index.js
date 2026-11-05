// kcfe11: ZODIAC CONFESSIONAL ep 11, "Aquarius has no feelings (allegedly)" (15 s vertical, music: synthwave · C#m). Loops.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Aquarius mid-yawn in the chair while the heart monitor beside it is already SPIKING, red alarm flash;
//          hook "Aquarius has *zero* feelings. Allegedly." Lower third: "emotionally unbothered (self-described)".
//   1.0–2.6   the monitor settles: "I don't get *attached.*"
//   2.8–5.6   B-ROLL: the crush (Gemini) laughs at the table; Aquarius keeps a straight face; the monitor goes wild.
//   5.7–7.0   booth: "technical fault." BEEP (spike, shake)
//   7.2–8.6   PRODUCER: "you okay?"
//   8.8–12.2  "…I like them a *normal amount.*" · "so, *a lot.*" (the trace draws hearts) Pisces cries.
//   12.4      last line "Unbothered. Except for *this one thing.*" — then the loop helper blends back into frame 0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, FONTS, GOLD, BONE, INK, PINK, RED, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, drawRoom, recChrome, blk, rr, sparkles, step, pop01, wob,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, screenShake, shakeCues, whipZoom, whipZoomCues, loopBack, loopCues } from '../../hookkit.js'

export const DURATION = 15
const AQU = SIGN('aquarius'), GEM = SIGN('gemini')
const T = { attached: 1.0, broll: [2.8, 5.65], laugh: 3.6, wild: 3.8, fault: 5.8, beep: 6.25, prod: 7.2, normal: 8.8, lot: 10.7, last: 12.4 }
const HOOK = { at: -1, text: 'Aquarius has *zero* | feelings. Allegedly.', top: 150, size: 98, accentColor: AQU.color, out: [2.65, 2.8] }
const SHAKE = { at: T.beep, len: 0.4, amp: 20 }
const WHIP2 = { at: T.broll[0] - 0.04, len: 0.4, from: 1.5 }, WHIP3 = { at: T.broll[1] - 0.04, len: 0.4, from: 1.5 }
const WHO = `${AQU.glyph}︎ AQUARIUS`
const CAPS = [
  { t: T.attached, end: 2.65, who: WHO, color: AQU.color, text: "I don't get *attached.*" },
  { t: T.fault, end: 7.05, who: WHO, color: AQU.color, text: '*technical* fault.' },
  { t: T.prod, end: 8.65, kind: 'prod', text: 'you okay?' },
  { t: T.normal, end: 10.6, who: WHO, color: AQU.color, text: '…I like them a *normal amount.*' },
  { t: T.lot, end: 12.25, who: WHO, color: AQU.color, text: 'so, *a lot.*', accent: PINK },
  { t: T.last, end: DURATION - 0.45, who: WHO, color: AQU.color, text: 'Unbothered. Except for *this one thing.*' },
]

// how wild the heart is: 0 calm … 1 spiking … 2 hearts
const wild = t => t < 0.7 ? 1 : t < T.wild ? 0.12 : t < T.broll[1] ? 1 : t < T.beep - 0.05 ? 0.15 : t < T.beep + 0.5 ? 1 : t < T.lot ? 0.3 : 2
function monitor(x, t, cx, cy, s = 1) {
  const w = wild(t)
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.fillRect(-10, 110, 20, 300)
  blk(x, -150, -120, 300, 240, '#5a6078', { r: 18 })
  x.fillStyle = '#071a10'; rr(x, -126, -96, 252, 170, 10); x.fill()
  // the trace
  x.save(); x.beginPath(); rr(x, -126, -96, 252, 170, 10); x.clip()
  x.strokeStyle = w >= 2 ? PINK : '#5dff9a'; x.lineWidth = 6; x.lineJoin = 'round'; x.beginPath()
  for (let i = 0; i <= 60; i++) {
    const u = i / 60, ph = (u * 3 - t * 1.6) % 1, p = ((ph % 1) + 1) % 1
    let y = 0
    if (w >= 2) { const q = p * 2 * Math.PI; y = p > 0.3 && p < 0.7 ? -40 * Math.sin((p - 0.3) / 0.4 * Math.PI) * (1 + 0.3 * Math.sin(q * 2)) : 0 }
    else if (p > 0.45 && p < 0.55) y = -(20 + 60 * w) * Math.sin((p - 0.45) / 0.1 * Math.PI) * (Math.sin(p * 60) > 0 ? 1 : -0.6)
    if (w >= 1 && w < 2) y += 14 * Math.sin(u * 50 + t * 30)
    const px = -120 + u * 240, py = -10 + y
    i ? x.lineTo(px, py) : x.moveTo(px, py)
  }
  x.stroke(); x.restore()
  x.font = `700 26px ${MONO}`; x.fillStyle = w >= 1 ? RED : '#5dff9a'; x.textAlign = 'center'; x.fillText(w >= 2 ? '♥ ♥ ♥' : w >= 1 ? '!! ALERT !!' : 'calm', 0, 100)
  x.restore()
  if (w >= 1 && w < 2 && Math.floor(t * 6) % 2 === 0) { x.fillStyle = 'rgba(255,40,60,0.16)'; x.fillRect(0, 0, 1080, 1920) }
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function booth(t) {
    drawBooth(x, t, { sign: 'aquarius', neon: false })
    const mood = step(t, [[-1, 'sleepy'], [0.8, 'neutral'], [T.attached, 'squint'], [T.fault, 'squint'], [T.beep, 'wide'], [T.prod, 'neutral'], [T.normal, 'squint'], [T.lot, 'heart'], [T.last, 'happy']])
    const yawn = t < 0.9 ? Math.sin(Math.PI * prog(t, -0.6, 0.9)) : 0
    seat(x, t, 'aquarius', { ...SUBJ, hops: [1.05, 1.7, T.fault + 0.05, T.normal + 0.05, T.lot + 0.05, T.last + 0.05] }, { mood, look: t > T.normal && t < T.lot ? [-1, 0] : [0, 0], seed: 16, squash: -0.12 * yawn, sweat: t > T.fault && t < T.lot ? 1 : 0 })
    if (yawn > 0.1) { x.save(); x.globalAlpha = yawn; x.font = `900 60px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('*yawn*', SUBJ.x + 190, SUBJ.y - 170); x.restore() }
    drawChairFront(x)
    monitor(x, t, 180, 840, 0.95)
    const cry = t > T.lot
    boomOp(x, t, { tears: cry ? 4 : 2, mood: cry ? 'happy' : 'wide', sway: cry ? 2 : 1 })
    if (t > T.lot) sparkles(x, t, 540, 860, T.lot, 12, 280, 2, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 40020, y0: 440 })
  }

  function broll(t) {
    x.save(); x.translate(wob(t, 1.2, 5, 1), wob(t, 1, 4, 2))
    drawRoom(x, t, { wall: '#1e3a5a', floor: '#16202e', window: true, lamp: true })
    seat(x, t, 'gemini', { x: 760, y: 1010, s: 270, hops: [T.laugh, T.laugh + 0.25, T.laugh + 0.5, T.laugh + 0.75] }, { mood: t > T.laugh ? 'happy' : 'neutral', look: [-1, 0], seed: 4 })
    seat(x, t, 'aquarius', { x: 330, y: 1010, s: 270 }, { mood: 'neutral', look: [1, 0], seed: 16, sweat: t > T.wild ? 1 : 0 })
    if (t > T.laugh) { x.font = `900 54px ${INTER}`; x.fillStyle = GEM.color; x.textAlign = 'center'; x.fillText('HA HA HA', 780 + Math.sin(t * 20) * 6, 780) }
    blk(x, 120, 1150, 840, 40, '#f4ead8', { r: 8 })
    x.fillStyle = INK; x.fillRect(520, 1190, 40, 150)
    monitor(x, t, 150, 900, 0.7)
    // the clip wire from Aquarius to the monitor
    x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(230, 980); x.quadraticCurveTo(250, 1100, 300, 1020); x.stroke()
    boomOp(x, t, { tears: 2, mic: [560, 600], op: [990, 500], size: 140 })
    x.restore()
    recChrome(x, t, { label: 'B-ROLL', tc0: 9100, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inB = t >= T.broll[0] && t < T.broll[1]
      if (inB) broll(t); else booth(t)
      lower.update(t, { k: inB ? 0 : 1, name: WHO, color: AQU.color, tag: 'emotionally unbothered (self-described)' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, slamTitle(HOOK), whipZoom(WHIP2), whipZoom(WHIP3), screenShake(SHAKE), loopBack([build, slamTitle(HOOK)], { duration: DURATION })]
export const CUES = [
  ...[0, 0.18, 0.36, 0.54].map(d => ['pluck', d, 1760, 0.03, 0.12, -0.4]),
  ...slamTitleCues(HOOK), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...shakeCues(SHAKE), ...capCues(CAPS),
  ...Array.from({ length: 9 }, (_, i) => ['pluck', +(T.wild + i * 0.2).toFixed(3), 1760, 0.028, 0.1, -0.4]),
  ['pluck', T.beep, 1760, 0.05, 0.4, -0.4], ['tom', T.beep, 90, { gain: 0.2, decay: 0.2 }],
  ...[0, 0.6, 1.2, 1.8].map(d => ['bell', +(T.lot + d).toFixed(3), 1318.5, 0.02, 0.6, -0.4]), ['glitter', T.lot, T.lot + 0.5], ...sobCues(T.lot + 0.3, 4, 0.4),
  ['pop', T.last, 1046.5, 0.045, 0],
  ...loopCues({ duration: DURATION }),
]
