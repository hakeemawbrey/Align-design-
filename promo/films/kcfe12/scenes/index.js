// kcfe12: ZODIAC CONFESSIONAL ep 12, "Pisces finally gets the chair" (15.5 s vertical, music: dreamy · Ab). Loops.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Pisces mid-SOB in the confessional chair, tears flying sideways (whip zoom); a confused grey stagehand
//          star holds the boom for once. Hook "Pisces cried *before* the question."
//   0.5    record scratch + freeze: "we haven't *started* yet."
//   1.6–3.0   PRODUCER: "how was your week?"
//   3.2–9.0   thought bubbles: "I cried at a *dog in a scarf.*" · "I cried when the machine gave me *two snacks.*" ·
//             "I cried at *a nice cloud.*"
//   9.2–10.5  PRODUCER: "is that bad?"
//   10.7–12.9 Pisces, sparkly: "no. it's my *favourite thing* about me." The stagehand tears up too.
//   13.0      last line "Big feelings are still *good* feelings." → the loop helper blends back into the frame-0 sob.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, rr, sparkles, step, pop01, drawBits,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { slamTitle, slamTitleCues, whipZoom, whipZoomCues, recordScratch, recordScratchCues, frozen, loopBack, loopCues } from '../../hookkit.js'

export const DURATION = 15.5
const PIS = SIGN('pisces')
const T = { scratch: 0.5, prod: 1.6, dog: 3.2, snack: 5.2, cloud: 7.6, bad: 9.2, fav: 10.7, last: 13.0 }
const HOOK = { at: -1, text: 'Pisces cried *before* | the question.', top: 150, size: 104, accentColor: PIS.color, out: [3.0, 3.2] }
const WHIP = { at: -0.26, len: 0.5, from: 1.6, blur: 12 }
const REC = { at: T.scratch, len: 1.0, caption: 'we haven’t *started* yet.', sub: 'take 1', top: 1560 }
const WHO = `${PIS.glyph}︎ PISCES`
const CAPS = [
  { t: T.prod, end: 3.0, kind: 'prod', text: 'how was your week?' },
  { t: T.dog, end: 5.05, who: WHO, color: PIS.color, text: 'I cried at a *dog in a scarf.*' },
  { t: T.snack, end: 7.45, who: WHO, color: PIS.color, text: 'I cried when the machine gave me *two snacks.*' },
  { t: T.cloud, end: 9.05, who: WHO, color: PIS.color, text: 'I cried at *a nice cloud.*' },
  { t: T.bad, end: 10.55, kind: 'prod', text: 'is that bad?' },
  { t: T.fav, end: 12.85, who: WHO, color: PIS.color, text: "no. it's my *favourite thing* about me.", accent: PINK },
  { t: T.last, end: DURATION - 0.45, who: WHO, color: PIS.color, text: 'Big feelings are still *good* feelings.' },
]

function thought(x, t, t0, t1, draw) {
  const k = easeOutBack(prog(t, t0, t0 + 0.3), 1.8) * (1 - ease.inQuad(prog(t, t1 - 0.2, t1)))
  if (k <= 0.01) return
  x.save(); x.translate(300, 640); x.scale(k, k)
  x.fillStyle = INK; for (const [cx, cy, r] of [[0, 0, 190], [-120, 40, 120], [130, 50, 130], [0, 110, 120]]) { x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#f4f0ff'; for (const [cx, cy, r] of [[0, 0, 190], [-120, 40, 120], [130, 50, 130], [0, 110, 120]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  for (const [cx, cy, r] of [[150, 250, 30], [200, 310, 18]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f0ff'; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
  draw()
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawBooth(x, t, { sign: 'pisces' })
      const mood = step(t, [[-1, 'wide'], [T.dog, 'sparkle'], [T.bad, 'wide'], [T.fav, 'sparkle'], [T.last, 'happy']])
      const tears = t < T.fav ? 4 : t < T.last ? 2 : 3
      seat(x, t, 'pisces', { ...SUBJ, hops: [0.1, 0.4, T.dog + 0.05, T.snack + 0.05, T.cloud + 0.05, T.fav + 0.05, T.last + 0.05] }, { mood, look: t > T.dog && t < T.bad ? [-1, -1] : [0, 0], seed: 6, tears, squash: t < 1.5 ? 0.06 * Math.sin(t * 18) : 0 })
      // a puddle that grows
      const pud = 120 + 40 * Math.min(1, t / 10)
      x.fillStyle = 'rgba(143,227,255,0.45)'; x.beginPath(); x.ellipse(540, 1290, pud * 2, 26, 0, 0, Math.PI * 2); x.fill()
      drawChairFront(x)
      // thought bubbles
      thought(x, t, T.dog, T.snack, () => {
        const DOG = ['..BB..BB..', '.BBBBBBBB.', '.BEBBBBEB.', '.BBBNNBBB.', 'RRRRRRRRRR', '.RRBBBBBR.', '..BBBBBB..', '..B.BB.B..']
        drawBits(x, DOG, { B: '#c88a4a', E: INK, N: '#3a2a20', R: '#e8403a' }, 0, 40, 26)
      })
      thought(x, t, T.snack, T.cloud, () => {
        blk(x, -110, -150, 220, 300, '#5a6aa8', { r: 12 })
        x.fillStyle = '#1a2040'; x.fillRect(-90, -130, 180, 190)
        ;['#f2c75c', '#e8604a'].forEach((c, i) => { const dy = ease.outBounce ? 0 : 0; blk(x, -70 + i * 80, 80 + dy, 60, 50, c, { r: 6, ink: 4 }) })
        x.font = `900 40px ${INTER}`; x.fillStyle = PINK; x.textAlign = 'center'; x.fillText('x2!', 0, -40)
      })
      thought(x, t, T.cloud, T.bad, () => {
        x.fillStyle = '#9fd6ff'; x.fillRect(-170, -120, 340, 260)
        x.fillStyle = '#ffffff'; for (const [cx, cy, r] of [[-40, 10, 60], [30, -10, 70], [90, 20, 50], [-90, 30, 44]]) { x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
        x.fillStyle = INK; x.fillRect(-10, 0, 10, 10); x.fillRect(30, 0, 10, 10); x.fillRect(0, 22, 30, 8)
      })
      // the stagehand on the boom (confused), tearing up at the end
      boomOp(x, t, { who: 'stage', glyph: false, mood: t > T.fav ? 'sparkle' : 'squint', tears: t > T.fav + 0.5 ? 2 : 0 })
      if (t > T.fav) sparkles(x, t, 540, 860, T.fav, 12, 280, 2, [PINK, GOLD, BONE])
      recChrome(x, t, { tc0: 51000, y0: 440 })
      lower.update(t, { k: 1, name: WHO, color: PIS.color, tag: t < T.fav ? '“feels everything”' : '“feels everything (proudly)”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP), slamTitle(HOOK), recordScratch(REC), loopBack([build, slamTitle(HOOK)], { duration: DURATION })]
export const CUES = [
  ...sobCues(0.0, 2, 0.3), ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...recordScratchCues(REC), ...capCues(CAPS),
  ...sobCues(T.prod + 0.4, 3, 0.4),
  ['pop', T.dog + 0.05, 880, 0.035, -0.3], ['pop', T.snack + 0.05, 988, 0.035, -0.3], ['pop', T.snack + 0.6, 1318.5, 0.03, -0.3], ['pop', T.snack + 0.75, 1567.98, 0.03, -0.3], ['pop', T.cloud + 0.05, 1046.5, 0.035, -0.3],
  ['glitter', T.fav, T.fav + 0.5], ['bell', T.fav + 0.05, 1318.5, 0.03, 1.2, 0], ...sobCues(T.fav + 0.5, 3, 0.4),
  ['pop', T.last, 1046.5, 0.045, 0],
  ...loopCues({ duration: DURATION }),
]
