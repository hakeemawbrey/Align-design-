// kcfe02: ZODIAC CONFESSIONAL ep 2, "Aries waited four whole minutes" (14 s vertical, music: chiptune · E). Loops.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Aries mid-crash through the booth curtain, flaps flying, speed lines; hook "Aries is *done* waiting.
//          (4 minutes)". Pisces on the boom, already crying.
//   0.45   Aries slams into the chair: screen shake. Lower third ARIES · "patience: loading".
//   0.9–4.4   "they said *'talk soon.'*" · "that was *FOUR MINUTES* ago." (a 00:04:00 timer ticks over the ring light)
//   4.5–7.6   Aries paces the booth, zig-zag, the chair spins. PRODUCER: "it's been four minutes." · "FOUR. WHOLE. MINUTES."
//   7.7       the phone drops a notification: "hey you!! sorry, was making toast"
//   8.2–12.4  Aries is instantly serene in the chair: "I'm a very *patient* person." Pisces sobs with relief.
//   12.5–14   another buzz ("wanna call?") → Aries launches back at the curtain… and the loop helper blends into frame 0.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  clamp, lerp, prog, ease, FONTS, GOLD, BONE, INK, RED, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues, loopBack, loopCues } from '../../hookkit.js'

export const DURATION = 14
const ARI = SIGN('aries')
const T = { land: 0.45, timer: [2.6, 4.4], pace: [4.5, 7.6], notif: 7.7, calm: 8.2, buzz2: 12.5, launch: [12.85, 13.6] }
const HOOK = { at: -1, text: 'Aries is *done* waiting. | (4 minutes)', top: 150, size: 96, accentColor: ARI.color, out: [4.3, 4.5] }
const SHAKE = { at: T.land, len: 0.5, amp: 30 }
const N1 = { at: T.notif, out: [11.2, 11.5], title: 'messages', body: 'hey you!! sorry, was making *toast*', glyph: '♑', time: 'now', y: 470 }
const N2 = { at: T.buzz2, out: [13.4, 13.6], title: 'messages', body: 'wanna *call?*', glyph: '♑', time: 'now', y: 470 }
const WHO = `${ARI.glyph}︎ ARIES`
const CAPS = [
  { t: 0.9, end: 2.55, who: WHO, color: ARI.color, text: "they said *'talk soon.'*" },
  { t: 2.6, end: 4.45, who: WHO, color: ARI.color, text: 'that was *FOUR MINUTES* ago.', accent: RED },
  { t: 4.9, end: 6.2, kind: 'prod', text: "it's been four minutes." },
  { t: 6.3, end: 7.65, who: WHO, color: ARI.color, text: 'FOUR. WHOLE. *MINUTES.*', accent: RED },
  { t: 8.6, end: 12.45, who: WHO, color: ARI.color, text: "I'm a very *patient* person." },
]

// Aries' position: crash in → chair → pacing zig-zag → chair → launch back at the curtain
function ariesPose(t) {
  if (t < T.land) { const p = ease.inQuad(prog(t, -0.3, T.land)); return { x: lerp(560, SUBJ.x, p), y: lerp(640, SUBJ.y, p), s: lerp(430, SUBJ.s, p), rot: lerp(-0.5, 0, p), fly: 1 - p } }
  if (t >= T.pace[0] && t < T.calm) {
    const u = t - T.pace[0], side = Math.sin(u * 3.2)
    if (t > T.notif + 0.15) { const p = ease.outBack(prog(t, T.notif + 0.15, T.calm)); return { x: lerp(540 + 300 * side, SUBJ.x, p), y: lerp(1080, SUBJ.y, p), s: SUBJ.s, rot: 0, fly: 0 } }
    return { x: 540 + 300 * side, y: 1080 - Math.abs(Math.sin(u * 6.4)) * 60, s: 330, rot: 0.25 * Math.cos(u * 3.2), fly: 0 }
  }
  if (t >= T.launch[0]) { const p = ease.inCubic(prog(t, T.launch[0], T.launch[1])); return { x: SUBJ.x, y: lerp(SUBJ.y, 600, p), s: lerp(SUBJ.s, 430, p), rot: lerp(0, 0.4, p), fly: p } }
  return { x: SUBJ.x, y: SUBJ.y, s: SUBJ.s, rot: 0, fly: 0 }
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function curtainRip(t) {
    // the curtain split where Aries came through: a dark gap, two flaps swinging, tassels flying
    const open = t < 1.6 ? 1 - ease.inOutQuad(prog(t, 0.2, 1.6)) : t > T.launch[0] - 0.1 ? ease.outCubic(prog(t, T.launch[0] - 0.1, T.launch[0] + 0.3)) : 0
    if (open <= 0.01) return
    const w = 280 * open
    x.fillStyle = '#05030a'; x.fillRect(540 - w / 2, 430, w, 760)
    for (const d of [-1, 1]) {
      const sw = Math.sin(t * 9 + d) * 20 * open
      x.fillStyle = INK; x.beginPath(); x.moveTo(540 + d * w / 2, 430); x.quadraticCurveTo(540 + d * (w / 2 + 70) + sw, 800, 540 + d * (w / 2 + 10), 1190); x.lineTo(540 + d * (w / 2 + 110), 1190); x.lineTo(540 + d * (w / 2 + 110), 430); x.fill()
      x.fillStyle = '#6a1d2a'; x.beginPath(); x.moveTo(540 + d * (w / 2 + 6), 430); x.quadraticCurveTo(540 + d * (w / 2 + 76) + sw, 800, 540 + d * (w / 2 + 16), 1184); x.lineTo(540 + d * (w / 2 + 104), 1184); x.lineTo(540 + d * (w / 2 + 104), 430); x.fill()
    }
    // flying gold tassels
    for (let i = 0; i < 8; i++) {
      const a = i * 0.79, r = 160 + 380 * ((t + 0.4 + i * 0.07) % 1.2)
      x.fillStyle = GOLD; x.globalAlpha = open; x.fillRect(540 + Math.cos(a) * r - 8, 760 + Math.sin(a) * r * 0.7 - 8, 16, 16); x.globalAlpha = 1
    }
  }
  function speedLines(t, k) {
    if (k <= 0.02) return
    x.save(); x.globalAlpha = k * 0.8; x.strokeStyle = BONE; x.lineWidth = 6
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + 0.2, r0 = 520 + 60 * Math.sin(i * 7 + t * 30); x.beginPath(); x.moveTo(540 + Math.cos(a) * r0, 820 + Math.sin(a) * r0); x.lineTo(540 + Math.cos(a) * (r0 + 260), 820 + Math.sin(a) * (r0 + 260)); x.stroke() }
    x.restore()
  }
  function timer(t) {
    const k = pop01(t, T.timer[0], 0.3, 2.2) * (1 - prog(t, T.pace[1], T.pace[1] + 0.2))
    if (k <= 0.01) return
    const sec = 240 + Math.max(0, Math.floor((t - T.timer[0]) * 1))
    const s = `00:0${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
    x.save(); x.translate(540, 560); x.scale(k, k)
    x.fillStyle = INK; rr(x, -200, -54, 400, 108, 18); x.fill()
    x.fillStyle = '#1a0e16'; rr(x, -190, -44, 380, 88, 14); x.fill()
    x.font = `700 64px ${MONO}`; x.fillStyle = RED; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 4)
    x.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawBooth(x, t, { sign: 'aries' })
      curtainRip(t)
      timer(t)
      const P = ariesPose(t)
      speedLines(t, P.fly)
      const mood = step(t, [[-1, 'wide'], [T.land, 'squint'], [2.6, 'wide'], [T.pace[0], 'squint'], [T.notif, 'wide'], [T.calm, 'sparkle'], [9.0, 'happy'], [T.buzz2, 'wide']])
      x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.translate(-P.x, -P.y)
      const hops = [1.0, 1.5, 2.7, 3.3, 6.35, 6.75, 7.15, 8.65, 9.3]
      seat(x, t, 'aries', { x: P.x, y: P.y, s: P.s, hops }, { mood, look: mood === 'sparkle' ? [0, 0] : undefined, seed: 2, sweat: t > T.pace[0] && t < T.notif ? 1 : 0, squash: t > T.land && t < T.land + 0.25 ? 0.2 * (1 - prog(t, T.land, T.land + 0.25)) : 0 })
      x.restore()
      // the spinning chair while pacing (its front stays put; a spin blur ring)
      if (t > T.pace[0] && t < T.calm) { x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.ellipse(540, 1170, 300, 50, 0, t * 9, t * 9 + 2); x.stroke(); x.restore() }
      drawChairFront(x)
      const relief = t > T.calm && t < T.buzz2
      boomOp(x, t, { tears: relief ? 4 : t > T.pace[0] ? 2 : 2, mood: relief ? 'happy' : 'wide', sway: t > T.pace[0] && t < T.calm ? 2.5 : 1 })
      if (relief) sparkles(x, t, 540, 900, T.calm + 0.05, 10, 260, 1)
      recChrome(x, t, { tc0: 4410, y0: 440 })
      lower.update(t, { k: 1, name: WHO, color: ARI.color, tag: t < T.calm ? '“patience: loading”' : '“patience: restored”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, slamTitle(HOOK), screenShake(SHAKE), notification(N1), notification(N2), loopBack([build, slamTitle(HOOK)], { duration: DURATION })]
export const CUES = [
  ['whoosh', 0.0, 0.4, 0.06], ['boom', T.land, 0.25], ['tom', T.land, 80, { gain: 0.3, decay: 0.3 }],
  ...slamTitleCues(HOOK), ...shakeCues(SHAKE), ...capCues(CAPS),
  ...Array.from({ length: 18 }, (_, i) => ['tick', +(T.timer[0] + i * 0.25).toFixed(3), 0.025]),
  ...Array.from({ length: 6 }, (_, i) => ['whoosh', +(T.pace[0] + i * 0.49).toFixed(3), 0.25, 0.025]),
  ...notificationCues(N1), ['glitter', T.calm, T.calm + 0.5], ['bell', T.calm + 0.05, 1318.5, 0.03, 1.1, 0], ...sobCues(T.calm + 0.4, 3, 0.4),
  ...notificationCues(N2), ['riser', T.launch[0] - 0.2, T.launch[1], 0.03],
  ...loopCues({ duration: DURATION }),
]
