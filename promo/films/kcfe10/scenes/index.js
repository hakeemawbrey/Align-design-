// kcfe10: ZODIAC CONFESSIONAL ep 10, "Capricorn's advice, for everyone else" (17.4 s vertical, music: cinematic · G). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Capricorn mid-juggle of three ringing phones orbiting the chair; hook "Capricorn fixes every love life.
//          Except *theirs.*"
//   0.9–4.6   rapid advice, one phone each, and each phone flies off with a tick: "Aries, *breathe.*" · "Libra, say
//             *noodles.*" · "Cancer, *give it back.*" (callbacks to eps 2, 7, 4)
//   4.8–6.3   PRODUCER: "and your crush?" Capricorn freezes.
//   6.5–8.9   a loading bar: "processing…" stalls at 99% → "Error: advice not found"
//   9.0–10.8  "I'll… *get back to you.*"
//   11.0–13.8 Capricorn types on its own phone: "hi. coffee saturday?" → sent. Pisces sobs. A reply drops: "yes!! saturday"
//   14.0–15.6 "…huh. *it works.*"
//   16.2      last line "My advice is good. For *me,* too." holds → hard cut at 17.4.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, rr, sparkles, step, pop01, drawPhone,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, screenShake, shakeCues, loadingBar, loadingBarCues, notification, notificationCues, whipZoom, whipZoomCues } from '../../hookkit.js'

export const DURATION = 17.4
const CAP = SIGN('capricorn')
const T = { advice: [0.9, 2.1, 3.3], fly: [1.9, 3.1, 4.3], prod: 4.8, gb: 9.0, type: [11.0, 12.3], sent: 12.4, reply: 13.3, huh: 14.0, last: 16.2 }
const HOOK = { at: -1, text: 'Capricorn fixes every | love life. Except *theirs.*', top: 150, size: 88, accentColor: CAP.color, out: [4.6, 4.8] }
const WHIP = { at: -0.26, len: 0.5, from: 1.6, blur: 12 }
const SHAKE = { at: T.prod + 0.05, len: 0.4, amp: 18 }
const LOAD = { at: 6.5, len: 2.4, label: 'processing…', stallAt: 99, error: 'Error: advice not found', y: 1380 }
const NOTE1 = { at: T.reply, out: [15.8, 16.1], title: 'messages', body: 'yes!! *saturday*', glyph: '♉', time: 'now', y: 470 }
const WHO = `${CAP.glyph}︎ CAPRICORN`
const PH = [{ col: '#f0603a', g: '♈' }, { col: '#f59cc4', g: '♎' }, { col: '#7fd0f0', g: '♋' }]
const CAPS = [
  { t: T.advice[0], end: 2.05, who: WHO, color: CAP.color, text: 'Aries, *breathe.*' },
  { t: T.advice[1], end: 3.25, who: WHO, color: CAP.color, text: 'Libra, say *noodles.*' },
  { t: T.advice[2], end: 4.7, who: WHO, color: CAP.color, text: 'Cancer, *give it back.*' },
  { t: T.prod, end: 6.4, kind: 'prod', text: 'and your crush?' },
  { t: T.gb, end: 10.85, who: WHO, color: CAP.color, text: "I'll… *get back to you.*" },
  { t: T.huh, end: 15.9, who: WHO, color: CAP.color, text: '…huh. *it works.*' },
  { t: T.last, end: 99, who: WHO, color: CAP.color, text: 'My advice is good. For *me,* too.' },
]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function miniPhone(cx, cy, col, g, rot, ring, t) {
    x.save(); x.translate(cx, cy); x.rotate(rot)
    x.fillStyle = INK; rr(x, -50, -88, 100, 176, 18); x.fill(); x.fillStyle = '#2b2440'; rr(x, -44, -82, 88, 164, 14); x.fill()
    x.fillStyle = col; rr(x, -36, -72, 72, 144, 10); x.fill()
    x.font = `700 46px 'Noto Sans Symbols 2', 'Segoe UI Symbol', sans-serif`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(g + '︎', 0, 0)
    x.restore()
    if (ring) { x.save(); x.strokeStyle = BONE; x.lineWidth = 6; for (let i = 0; i < 2; i++) { const p = (t * 2.2 + i / 2) % 1; x.globalAlpha = 1 - p; x.beginPath(); x.arc(cx, cy, 100 + p * 60, -0.8, 0.8); x.stroke(); x.beginPath(); x.arc(cx, cy, 100 + p * 60, Math.PI - 0.8, Math.PI + 0.8); x.stroke() } x.restore() }
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawBooth(x, t, { sign: 'capricorn' })
      const frozen = t > T.prod && t < T.gb
      const mood = step(t, [[-1, 'squint'], [T.advice[0], 'neutral'], [T.prod, 'wide'], [T.gb, 'neutral'], [T.type[0], 'neutral'], [T.sent, 'wide'], [T.reply, 'sparkle'], [T.huh, 'happy'], [T.last, 'sparkle']])
      const F = seat(x, t, 'capricorn', { ...SUBJ, hops: frozen ? [] : [...T.advice, T.gb + 0.05, T.reply + 0.1, T.huh + 0.05, T.last + 0.05] }, { mood, look: t > T.type[0] && t < T.reply ? [0, 1] : [0, 0], seed: 15, bob: frozen ? 0 : undefined, blink: frozen ? false : undefined })
      // three phones juggled in an orbit; each flies away after its advice
      PH.forEach((p, i) => {
        const fl = ease.inCubic(prog(t, T.fly[i], T.fly[i] + 0.45))
        if (fl >= 1) return
        const a = t * 3.2 + i * 2.09
        let cx = SUBJ.x + Math.cos(a) * 300, cy = F.cy - 60 + Math.sin(a) * 140
        cx = lerp(cx, i === 1 ? -200 : 1300, fl); cy = lerp(cy, -200, fl)
        miniPhone(cx, cy, p.col, p.g, Math.sin(a) * 0.4 + fl * 3, t < T.advice[i] + 0.3, t)
        if (t > T.fly[i] - 0.05 && t < T.fly[i] + 0.4) sparkles(x, t, cx, cy, T.fly[i], 6, 80, i, ['#7fe0a0', BONE])
      })
      drawChairFront(x)
      // Capricorn's own phone
      if (t > T.type[0] - 0.3) {
        const pk = easeOutBack(prog(t, T.type[0] - 0.3, T.type[0]), 1.8) * (1 - prog(t, T.last - 0.3, T.last))
        const typed = 'hi. coffee saturday?'.slice(0, Math.floor(prog(t, T.type[0] + 0.2, T.type[1]) * 20))
        drawPhone(x, t, { cx: SUBJ.x + 250, cy: F.cy + 150, w: 250, h: 360, k: pk, rot: 0.14, title: '♉︎ them', msgs: t > T.sent ? [{ at: T.sent, side: 'R', text: 'hi. coffee saturday?' }, ...(t > T.reply ? [{ at: T.reply, side: 'L', text: 'yes!! saturday' }] : [])] : [], screen: '#10162e' })
        if (t < T.sent && pk > 0.5) { x.font = `700 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(typed + (Math.floor(t * 3) % 2 ? '|' : ''), SUBJ.x + 160, F.cy + 290) }
      }
      const sob = t > T.sent
      boomOp(x, t, { tears: sob ? 4 : 2, mood: t > T.reply ? 'happy' : 'wide', sway: sob ? 2 : 1 })
      if (t > T.reply) sparkles(x, t, 540, 860, T.reply, 12, 280, 1, [PINK, GOLD, BONE])
      recChrome(x, t, { tc0: 26020, y0: 440 })
      lower.update(t, { k: 1, name: WHO, color: CAP.color, tag: t < T.reply ? '“the group’s love coach”' : '“has a saturday plan”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), screenShake(SHAKE), loadingBar(LOAD), notification(NOTE1)]
export const CUES = [
  ...[0, 0.55, 1.1].flatMap(d => [['pluck', d, 1318.5, 0.02, 0.2, -0.3], ['pluck', d + 0.1, 1046.5, 0.02, 0.2, 0.3]]),
  ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...shakeCues(SHAKE), ...loadingBarCues(LOAD), ...notificationCues(NOTE1), ...capCues(CAPS),
  ...T.fly.map((f, i) => ['whoosh', f, 0.35, 0.04]), ...T.fly.map((f, i) => ['bell', f + 0.05, [1318.5, 1567.98, 1760][i], 0.025, 0.6, 0]),
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.type[0] + 0.25 + i * 0.1).toFixed(3), 0.03]),
  ['whoosh', T.sent, 0.3, 0.04], ['pop', T.sent + 0.05, 1174.66, 0.04, 0], ...sobCues(T.sent + 0.2, 4, 0.4),
  ['glitter', T.reply, T.reply + 0.5],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
