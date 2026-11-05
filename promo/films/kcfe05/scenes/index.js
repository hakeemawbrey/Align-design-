// kcfe05: ZODIAC CONFESSIONAL ep 5, "Leo posted it for one viewer" (15.8 s vertical, music: house · C). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: Leo mid-pose in the chair, the ring light mid-FLASH (white wash, whip zoom); hook "Leo posted it for
//          *one* person."
//   0.9–2.6   "I didn't post that selfie for *anyone.*"
//   2.7–5.0   close-up: Leo's phone, a story viewer list, pull-to-refresh, refresh, refresh. CAUGHT: "REFRESHING".
//   5.1–6.9   booth: "…ok. *one* person."
//   7.0–9.5   the phone again: a new viewer pops in (the crush). "they saw it. *no reply.*" Leo deflates, the ring light dims.
//   9.6–11.0  PRODUCER: "so what now?" Pisces sobs on the boom.
//   11.2–13.6 Leo sits up, the ring light comes back: "next time I'll just *say hi.*"
//   14.6      last line "A *hi* beats a hundred selfies." holds → hard cut at 15.8.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, caught, caughtCues } from '../../hookkit.js'

export const DURATION = 15.8
const LEO = SIGN('leo'), AQU = SIGN('aquarius')
const T = { phone1: [2.7, 5.0], refresh: [3.0, 3.6, 4.2], booth2: 5.0, phone2: [7.0, 9.5], seen: 7.4, deflate: 8.2, prod: 9.6, up: 11.2, last: 14.6 }
const HOOK = { at: -1, text: 'Leo posted it | for *one* person.', top: 150, size: 104, accentColor: LEO.color, out: [2.55, 2.7] }
const WHIP = { at: -0.26, len: 0.5, from: 1.7, blur: 14, flash: 0.6 }
const WHIP2 = { at: T.phone1[0] - 0.04, len: 0.4, from: 1.6 }, WHIP3 = { at: T.booth2 - 0.04, len: 0.4, from: 1.5 }, WHIP4 = { at: T.phone2[0] - 0.04, len: 0.4, from: 1.6 }, WHIP5 = { at: T.phone2[1] - 0.04, len: 0.4, from: 1.4 }
const CAUGHT = { at: 3.2, x: 470, y: 1050, r: 220, label: null, arrow: null, rec: false, out: [4.8, 5.0] }
const WHO = `${LEO.glyph}︎ LEO`
const CAPS = [
  { t: 0.9, end: 2.6, who: WHO, color: LEO.color, text: "I didn't post that selfie for *anyone.*" },
  { t: 5.25, end: 6.9, who: WHO, color: LEO.color, text: '…ok. *one* person.' },
  { t: 7.7, end: 9.45, who: WHO, color: LEO.color, text: 'they saw it. *no reply.*', accent: '#9fc4ff' },
  { t: T.prod, end: 11.0, kind: 'prod', text: 'so what now?' },
  { t: T.up + 0.1, end: 13.6, who: WHO, color: LEO.color, text: "next time I'll just *say hi.*" },
  { t: T.last, end: 99, who: WHO, color: LEO.color, text: 'A *hi* beats a hundred selfies.' },
]
const VIEWERS = [['♈', '#f0603a', 'aries'], ['♋', '#7fd0f0', 'cancer'], ['♍', '#9fe6b0', 'virgo'], ['♎', '#f59cc4', 'libra'], ['♑', '#c9a6ff', 'capricorn']]

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // the phone close-up: a story viewer list
  function phone(t, crush) {
    x.fillStyle = '#120a1e'; x.fillRect(0, 0, 1080, 1920)
    const g = x.createRadialGradient(540, 1000, 0, 540, 1000, 800); g.addColorStop(0, 'rgba(255,200,120,0.25)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    const W = 640, H = 1100, cx = 540, cy = 1000
    x.save(); x.translate(cx, cy); x.rotate(-0.03)
    x.fillStyle = INK; rr(x, -W / 2 - 14, -H / 2 - 14, W + 28, H + 28, 70); x.fill()
    x.fillStyle = '#2b2440'; rr(x, -W / 2, -H / 2, W, H, 60); x.fill()
    x.fillStyle = '#0f1226'; rr(x, -W / 2 + 18, -H / 2 + 18, W - 36, H - 36, 46); x.fill()
    x.fillStyle = INK; rr(x, -70, -H / 2 + 30, 140, 30, 15); x.fill()
    // the selfie thumbnail
    x.fillStyle = '#3a2a10'; rr(x, -W / 2 + 50, -H / 2 + 100, 160, 220, 20); x.fill()
    seat(x, t, 'leo', { x: -W / 2 + 130, y: -H / 2 + 220, s: 130 }, { mood: 'wink', seed: 3, glyph: false })
    x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('your story', -W / 2 + 240, -H / 2 + 170)
    x.font = `400 28px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillText('posted 9:41 pm', -W / 2 + 240, -H / 2 + 220)
    x.font = `800 30px ${INTER}`; x.fillStyle = GOLD; x.fillText('SEEN BY', -W / 2 + 50, -H / 2 + 380)
    // pull-to-refresh spinner
    const rf = T.refresh.find(r => t > r && t < r + 0.45)
    let pull = 0
    if (rf !== undefined) { pull = Math.sin(Math.PI * prog(t, rf, rf + 0.45)); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(0, -H / 2 + 420 + pull * 30, 26, t * 12, t * 12 + 4.4); x.stroke() }
    const list = crush ? [['♒', AQU.color, 'aquarius', true], ...VIEWERS] : VIEWERS
    list.forEach(([gl, col, name, isNew], i) => {
      const y = -H / 2 + 470 + i * 104 + pull * 70
      const k = isNew ? easeOutBack(prog(t, T.seen, T.seen + 0.35), 2) : 1
      x.save(); x.translate(0, y); x.scale(1, k)
      if (isNew) { x.fillStyle = 'rgba(127,208,240,0.18)'; rr(x, -W / 2 + 34, -46, W - 68, 92, 20); x.fill() }
      x.fillStyle = col; x.beginPath(); x.arc(-W / 2 + 96, 0, 36, 0, Math.PI * 2); x.fill()
      x.font = `700 40px 'Noto Sans Symbols 2', 'Segoe UI Symbol', sans-serif`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText(gl + '︎', -W / 2 + 96, 2)
      x.font = `800 36px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(name, -W / 2 + 156, 0)
      if (isNew) { x.font = `800 26px ${INTER}`; x.fillStyle = '#7fd0f0'; x.textAlign = 'right'; x.fillText('JUST NOW', W / 2 - 60, 0) }
      x.restore()
    })
    x.restore()
    // Leo's thumb (a big star point) dragging down on each refresh
    const th = rf !== undefined ? pull : 0
    x.save(); x.translate(760, 1500 - th * 120); x.fillStyle = INK; rr(x, -66, -86, 132, 300, 60); x.fill(); x.fillStyle = LEO.color; rr(x, -56, -76, 112, 290, 52); x.fill(); x.restore()
    // Pisces peeking from the bottom corner, crying
    if (crush) seat(x, t, 'pisces', { x: 170, y: 1600, s: 200 }, { mood: 'wide', look: [1, -1], tears: 3, seed: 6 })
    else seat(x, t, 'pisces', { x: 170, y: 1640, s: 180 }, { mood: 'sparkle', look: [1, -1], tears: 1, seed: 6 })
  }

  function booth(t) {
    const dimK = t > T.deflate && t < T.up ? 0.65 : t > T.phone2[1] && t < T.up + 0.4 ? 0.65 * (1 - prog(t, T.up, T.up + 0.4)) : 0
    drawBooth(x, t, { sign: 'leo', dim: dimK })
    const mood = step(t, [[-1, 'wink'], [0.9, 'happy'], [T.booth2, 'squint'], [T.prod, 'neutral'], [T.up, 'happy'], [T.last, 'sparkle']])
    const sq = t > T.phone2[1] && t < T.up ? 0.12 : 0
    seat(x, t, 'leo', { ...SUBJ, hops: [0.95, 1.6, 5.3, 5.9, T.up + 0.15, T.up + 0.8, T.last + 0.05] }, { mood, look: t < 0.9 ? [0, 0] : t > T.prod && t < T.up ? [0, 1] : undefined, seed: 3, squash: sq })
    drawChairFront(x)
    boomOp(x, t, { tears: t > T.prod && t < T.up ? 4 : 2, mood: t > T.up ? 'happy' : 'sparkle', sway: t > T.prod && t < T.up ? 2 : 1 })
    // the frame-0 ring-light flash
    const fl = 0.75 * Math.pow(1 - prog(t, -0.1, 0.5), 2)
    if (fl > 0.003) { x.fillStyle = `rgba(255,252,240,${fl})`; x.fillRect(0, 0, 1080, 1920) }
    if (t > T.up) sparkles(x, t, 540, 860, T.up + 0.05, 12, 300, 1)
    recChrome(x, t, { tc0: 22050, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inP = (t >= T.phone1[0] && t < T.phone1[1]) || (t >= T.phone2[0] && t < T.phone2[1])
      if (inP) phone(t, t >= T.phone2[0] && t >= T.seen); else booth(t)
      lower.update(t, { k: inP ? 0 : 1, name: WHO, color: LEO.color, tag: t < T.phone2[0] ? '“posts for the art”' : t < T.up ? '“posts for… one person”' : '“saying hi next time”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, whipZoom(WHIP), whipZoom(WHIP2), whipZoom(WHIP3), whipZoom(WHIP4), whipZoom(WHIP5), slamTitle(HOOK), caught(CAUGHT)]
export const CUES = [
  ['bell', 0.0, 2093, 0.03, 0.6, 0], ...whipZoomCues(WHIP), ...whipZoomCues(WHIP2), ...whipZoomCues(WHIP3), ...whipZoomCues(WHIP4), ...whipZoomCues(WHIP5),
  ...slamTitleCues(HOOK), ...caughtCues(CAUGHT), ...capCues(CAPS),
  ...T.refresh.map(r => ['tick', r + 0.2, 0.05]),
  ['pop', T.seen, 1318.5, 0.05, 0], ['pop', T.seen + 0.07, 1760, 0.035, 0],
  ['riser', T.deflate - 0.1, T.deflate + 0.5, 0.02], ['tom', T.deflate + 0.5, 70, { gain: 0.2, decay: 0.4 }],
  ...sobCues(T.prod + 0.2, 4, 0.4),
  ['glitter', T.up, T.up + 0.5], ['bell', T.up + 0.05, 1318.5, 0.03, 1.0, 0],
  ['pop', T.last, 1046.5, 0.045, 0], ['bell', T.last + 0.05, 2093, 0.025, 0.9, 0],
]
