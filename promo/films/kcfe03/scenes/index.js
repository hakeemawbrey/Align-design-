// kcfe03: ZODIAC CONFESSIONAL ep 3, "Gemini booked the booth twice" (14.8 s vertical, music: pop · G). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: split screen mid-whip, two Geminis in two booths; hook "Gemini booked the booth *twice.*"
//   1.0–4.3   GEMINI (A), arms-crossed energy: "I'm *so* over them." · GEMINI (B), clutching a napkin: "I wrote their name
//             on a *napkin.*"
//   4.4–7.7   the argument speeds up: the lower third flips A/B, the camera whips side to side, Pisces swings the boom
//             between them (over · napkin · over · napkin…)
//   7.8–9.2   PRODUCER: "pick one." (shake)
//   9.3–12.4  the split slides away: both Geminis squeezed into ONE chair: "…we *like* them." Pisces sobs.
//   12.6      last line "First time we've *agreed* on anything." holds → hard cut at 14.8.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, FONTS, GOLD, BONE, INK, PINK, INTER,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'

export const DURATION = 14.8
const GEM = SIGN('gemini')
const T = { flip: [4.4, 7.7], prod: 7.8, merge: [9.3, 9.9], like: 9.9, last: 12.6 }
const FLIPS = [4.4, 5.05, 5.6, 6.05, 6.45, 6.8, 7.1, 7.38]
const HOOK = { at: -1, text: 'Gemini booked | the booth *twice.*', top: 150, size: 104, accentColor: GEM.color, out: [4.2, 4.4] }
const WHIP = { at: -0.26, len: 0.5, from: 1.6, blur: 14 }
const SHAKE = { at: T.prod + 0.05, len: 0.45, amp: 22 }
const WA = `${GEM.glyph}︎ GEMINI (A)`, WB = `${GEM.glyph}︎ GEMINI (B)`
const CAPS = [
  { t: 1.0, end: 2.6, who: WA, color: GEM.color, text: "I'm *so* over them." },
  { t: 2.7, end: 4.35, who: WB, color: '#ffd9f0', text: 'I wrote their name on a *napkin.*', accent: PINK },
  ...FLIPS.map((t, i) => ({ t, end: FLIPS[i + 1] ?? 7.72, who: i % 2 ? WB : WA, color: i % 2 ? '#ffd9f0' : GEM.color, text: i % 2 ? '*napkin.*' : 'over *them.*', accent: i % 2 ? PINK : GOLD })),
  { t: T.prod, end: 9.25, kind: 'prod', text: 'pick one.' },
  { t: T.like, end: 12.45, who: `${WA} + (B)`, color: GEM.color, text: '…we *like* them.', accent: PINK },
  { t: T.last, end: 99, who: `${WA} + (B)`, color: GEM.color, text: "First time we've *agreed* on anything." },
]
const activeB = t => { if (t < 2.7) return 0; if (t < T.flip[0]) return 1; let a = 0; FLIPS.forEach((f, i) => { if (t >= f) a = i % 2 }); return a }

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function napkin(cx, cy, k = 1, rot = -0.15) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    blk(x, -80, -56, 160, 112, '#ffffff', { r: 6 })
    x.font = `italic 600 30px 'EB Garamond'`; x.fillStyle = '#c42a3f'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('their name', 0, -10)
    x.fillStyle = PINK; x.fillRect(-14, 18, 10, 10); x.fillRect(4, 18, 10, 10); x.fillRect(-10, 28, 20, 10)
    x.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const m = ease.inOutCubic(prog(t, ...T.merge))
      const act = activeB(t)
      // the camera leans toward whoever is talking during the argument
      const lean = t > T.flip[0] && t < T.flip[1] ? (act ? -1 : 1) * 60 * (1 - Math.exp(-(t - FLIPS.filter(f => f <= t).slice(-1)[0]) * 12)) : 0
      const splitX = lerp(540, 1140, m) + lean
      // left booth
      x.save(); x.beginPath(); x.rect(0, 0, splitX, 1920); x.clip(); x.translate(lerp(-270, 0, m) + lean, 0)
      drawBooth(x, t, { sign: 'gemini', plant: m > 0.5 })
      x.restore()
      // right booth (tinted a little pinker)
      if (m < 1) { x.save(); x.beginPath(); x.rect(splitX, 0, 1080, 1920); x.clip(); x.translate(lerp(270, 870, m) + lean, 0); drawBooth(x, t, { sign: 'gemini', wall: '#f0a8d8', plant: false, neon: false }); x.restore() }
      // the two Geminis
      const ax = lerp(270, 395, m) + lean * (1 - m), bx = lerp(810, 690, m) + lean * (1 - m), s = lerp(320, 330, m)
      const moodA = step(t, [[-1, 'squint'], [1.0, 'eyeroll'], [2.7, 'squint'], [T.prod, 'wide'], [T.merge[0], 'neutral'], [T.like, 'heart'], [T.last, 'happy']])
      const moodB = step(t, [[-1, 'sparkle'], [2.7, 'heart'], [T.prod, 'wide'], [T.merge[0], 'neutral'], [T.like, 'heart'], [T.last, 'happy']])
      const hopsA = [1.05, 1.6, ...FLIPS.filter((_, i) => i % 2 === 0).map(f => f + 0.03), T.like + 0.05, T.last + 0.05]
      const hopsB = [2.75, 3.3, ...FLIPS.filter((_, i) => i % 2).map(f => f + 0.03), T.like + 0.1, T.last + 0.1]
      seat(x, t, 'gemini', { x: ax, y: SUBJ.y, s, hops: hopsA }, { mood: moodA, look: t > T.merge[1] && t < T.like ? [1, 0] : undefined, seed: 4 })
      seat(x, t, 'gemini', { x: bx, y: SUBJ.y, s, hops: hopsB }, { mood: moodB, look: t > T.merge[1] && t < T.like ? [-1, 0] : undefined, seed: 7, color: '#f6c1e4' })
      if (t > 2.6 && t < T.merge[1]) napkin(bx + 120, SUBJ.y + 70, pop01(t, 2.7, 0.3, 2), 0.15)
      // chair fronts per half, then one shared chair after the merge
      if (m < 0.5) { x.save(); x.beginPath(); x.rect(0, 0, splitX, 1920); x.clip(); drawChairFront(x, 270 + lean, 1010, 0.62); x.restore(); x.save(); x.beginPath(); x.rect(splitX, 0, 1080, 1920); x.clip(); drawChairFront(x, 810 + lean, 1010, 0.62); x.restore() }
      else drawChairFront(x, 540, 1010, 1.05)
      // the split line
      if (m < 1) { x.fillStyle = INK; x.fillRect(splitX - 9, 0, 18, 1330); x.fillStyle = BONE; x.fillRect(splitX - 4, 0, 8, 1324) }
      // Pisces swings the boom to whoever is talking
      const micX = t < T.merge[0] ? (act ? 760 : 320) : 540
      boomOp(x, t, { mic: [micX, 700], tears: t > T.like ? 4 : 2, mood: t > T.like ? 'happy' : 'wide', sway: t > T.flip[0] && t < T.flip[1] ? 2 : 1 })
      if (t > T.like) sparkles(x, t, 540, 900, T.like, 12, 280, 2, [PINK, GOLD, BONE])
      recChrome(x, t, { tc0: 9030, y0: 440 })
      lower.update(t, { k: 1, name: t > T.merge[0] ? `${GEM.glyph}︎ GEMINI (A + B)` : act ? WB : WA, color: act && t < T.merge[0] ? '#f6c1e4' : GEM.color, tag: t > T.merge[0] ? '“finally on the same page”' : act ? '“the romantic one”' : '“the over-it one”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), slamTitle(HOOK), screenShake(SHAKE)]
export const CUES = [
  ...whipZoomCues(WHIP), ...slamTitleCues(HOOK), ...shakeCues(SHAKE), ...capCues(CAPS),
  ...FLIPS.map((f, i) => ['whoosh', f, 0.2, 0.03 + i * 0.004]),
  ['pop', 2.75, 1046.5, 0.03, 0.4],
  ['whoosh', T.merge[0], 0.5, 0.05], ['tom', T.merge[1], 110, { gain: 0.2, decay: 0.25 }], ['glitter', T.like, T.like + 0.5], ['bell', T.like + 0.05, 1318.5, 0.03, 1.1, 0],
  ...sobCues(T.like + 0.3, 4, 0.38),
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
