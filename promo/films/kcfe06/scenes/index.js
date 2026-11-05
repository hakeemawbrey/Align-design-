// kcfe06: ZODIAC CONFESSIONAL ep 6, "Virgo brought a binder" (16.8 s vertical, music: jazzy · Bb). Hard cut.
// Month 2 boost (promo/films/month2/m09.md). No end card, no card transition.
//   0.00   frame 0: a fat binder mid-SLAM onto Virgo's lap, pages flying; hook "Virgo brought a *binder.* About a crush."
//   0.05   screen shake.
//   1.0–2.6   "I've prepared *a few notes.*"
//   2.7–6.1   close-up of the binder: tabs flip with a slam each: TEXTING CADENCE · IS THE LAUGH REAL? · APPENDIX C ·
//             APPENDIX C (CONT.) (doodled charts, sticky notes, a pressed flower).
//   6.1–7.7   booth. PRODUCER: "do you like them?"
//   7.8–10.7  the last page: CONCLUSION: … blank. A loading bar: "analysing…" stalls at 99% → "Error: needs a feeling".
//   10.8–14.4 booth: "…the binder doesn't *say.*" · then softly: "*yes.*" Pisces sobs.
//   15.6      last line "Some answers aren't *in the binder.*" holds → hard cut at 16.8.
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  lerp, prog, ease, easeOutBack, FONTS, GOLD, BONE, INK, PINK, INTER, SERIF, MONO,
  SIGN, SUBJ, seat, drawBooth, drawChairFront, boomOp, recChrome, blk, rr, sparkles, step, pop01,
  buildBug, buildLower, buildCaps, capCues, sobCues,
} from '../../kcfe01/scenes/cfkit.js'
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, loadingBar, loadingBarCues } from '../../hookkit.js'

export const DURATION = 16.8
const VIR = SIGN('virgo')
const T = { slam: 0.05, notes: 1.0, close: [2.7, 6.1], tabs: [2.8, 3.6, 4.4, 5.1], prod: 6.25, last: [7.8, 10.7], doesnt: 10.85, yes: 12.6, last2: 15.6 }
const TABS = [['TEXTING CADENCE', '#7fd0f0'], ['IS THE LAUGH REAL?', '#f59cc4'], ['APPENDIX C', '#f2c75c'], ['APPENDIX C (CONT.)', '#9fe6b0']]
const HOOK = { at: -1, text: 'Virgo brought a *binder.* | About a crush.', top: 150, size: 96, accentColor: VIR.color, out: [2.55, 2.7] }
const SHAKE = { at: T.slam, len: 0.5, amp: 30 }
const WHIPS = [{ at: T.close[0] - 0.04, len: 0.4, from: 1.6 }, { at: T.close[1] - 0.04, len: 0.4, from: 1.5 }, { at: T.last[0] - 0.04, len: 0.4, from: 1.6 }, { at: T.last[1] - 0.04, len: 0.4, from: 1.4 }]
const LOAD = { at: 8.3, len: 2.3, label: 'analysing…', stallAt: 99, error: 'Error: needs a feeling', y: 1380 }
const WHO = `${VIR.glyph}︎ VIRGO`
const CAPS = [
  { t: T.notes, end: 2.6, who: WHO, color: VIR.color, text: "I've prepared *a few notes.*" },
  { t: T.prod, end: 7.7, kind: 'prod', text: 'do you like them?' },
  { t: T.doesnt, end: 12.45, who: WHO, color: VIR.color, text: "…the binder doesn't *say.*" },
  { t: T.yes, end: 15.45, who: WHO, color: VIR.color, text: '*yes.*', accent: PINK },
  { t: T.last2, end: 99, who: WHO, color: VIR.color, text: "Some answers aren't *in the binder.*" },
]

function binder(x, cx, cy, s, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  blk(x, -170, -120, 340, 240, '#3f6fd8', { r: 12 })
  x.fillStyle = BONE; x.fillRect(-160, 112, 320, 18)
  TABS.forEach(([, c], i) => { x.fillStyle = INK; x.fillRect(170, -100 + i * 52, 30, 40); x.fillStyle = c; x.fillRect(170, -96 + i * 52, 24, 32) })
  blk(x, -110, -60, 220, 90, BONE, { r: 4, ink: 4, hi: 0, lo: 0 })
  x.font = `900 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RE: THEM', 0, -24)
  x.font = `600 22px ${MONO}`; x.fillText('vol. 1 of 3', 0, 12)
  x.restore()
}
function flyingPages(x, t, t0) {
  const d = t - t0
  if (d > 1.6) return
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.38, v = 520 + (i % 3) * 120, dd = Math.max(0, d + 0.42)
    const px = 540 + Math.cos(a) * v * dd, py = 1120 + Math.sin(a) * v * dd + 520 * dd * dd
    x.save(); x.translate(px, py); x.rotate(i + dd * (3 + i))
    blk(x, -50, -64, 100, 128, '#fbf7ee', { r: 2, ink: 4, hi: 0, lo: 0 })
    x.fillStyle = '#9ab0d8'; for (let r = 0; r < 5; r++) x.fillRect(-36, -44 + r * 20, 72, 4)
    x.restore()
  }
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const lower = buildLower(root), caps = buildCaps(root, CAPS), bug = buildBug(root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function page(t, last) {
    x.fillStyle = '#1a1430'; x.fillRect(0, 0, 1080, 1920)
    // a giant open page filling the frame
    x.save(); x.translate(540, 1000); x.rotate(-0.025)
    blk(x, -440, -660, 880, 1320, '#fbf7ee', { r: 8, hi: 0, lo: 0 })
    x.fillStyle = '#d9e3f6'; for (let r = 0; r < 26; r++) x.fillRect(-420, -560 + r * 48, 840, 3)
    x.fillStyle = '#f2a0a0'; x.fillRect(-340, -650, 4, 1300)
    for (let r = 0; r < 3; r++) { x.fillStyle = '#1a1430'; x.beginPath(); x.arc(-400, -400 + r * 400, 22, 0, Math.PI * 2); x.fill() }
    const ti = last ? -1 : T.tabs.filter(a => t >= a).length - 1
    // tabs along the right edge, the active one sticking out
    TABS.forEach(([, c], i) => { const out = i === ti ? 50 : 0; x.fillStyle = INK; x.fillRect(436, -560 + i * 150, 70 + out, 120); x.fillStyle = c; x.fillRect(436, -554 + i * 150, 64 + out, 108) })
    x.textAlign = 'left'; x.textBaseline = 'middle'
    if (last) {
      x.font = `900 76px ${INTER}`; x.fillStyle = INK; x.fillText('CONCLUSION:', -300, -480)
      // the blinking cursor of nothing
      if (Math.floor(t * 2.5) % 2) { x.fillStyle = INK; x.fillRect(-300, -380, 8, 70) }
      x.font = `italic 600 46px ${SERIF}`; x.fillStyle = 'rgba(27,18,54,0.35)'; x.fillText('(see feelings)', -300, -260)
    } else if (ti >= 0) {
      const [name, col] = TABS[ti], k = easeOutBack(prog(t, T.tabs[ti], T.tabs[ti] + 0.3), 2.4)
      x.save(); x.translate(-300, -480); x.scale(k, k); x.font = `900 70px ${INTER}`; x.fillStyle = INK; x.fillText(name, 0, 0); x.fillStyle = col; x.fillRect(0, 44, x.measureText(name).width, 14); x.restore()
      // doodles per tab
      x.strokeStyle = '#3f6fd8'; x.lineWidth = 8; x.lineJoin = 'round'
      if (ti === 0) { // a wobbly "cadence" chart
        x.beginPath(); for (let i = 0; i <= 20; i++) { const px = -300 + i * 30, py = -100 - 120 * Math.abs(Math.sin(i * 1.3)) * (i % 4 === 0 ? 1.6 : 1); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
        x.font = `italic 600 44px ${SERIF}`; x.fillStyle = '#c42a3f'; x.fillText('replies faster on Tuesdays??', -300, 80)
      } else if (ti === 1) {
        x.font = `italic 600 46px ${SERIF}`; x.fillStyle = INK
        ;['laugh #1: real', 'laugh #2: real', 'laugh #3: SNORTED', '(that was cute)'].forEach((l, i) => x.fillText(l, -300, -300 + i * 96))
        x.fillStyle = PINK; x.fillRect(-310, 60, 360, 10)
      } else if (ti === 2) {
        blk(x, -300, -320, 300, 280, '#ffe98a', { r: 4, ink: 4, hi: 0, lo: 0 })
        x.font = `italic 600 40px ${SERIF}`; x.fillStyle = INK; x.fillText('they said', -270, -260); x.fillText('"see you!"', -270, -200); x.fillText('NOT "bye"', -270, -140)
        x.save(); x.translate(160, -150); x.rotate(0.3); x.fillStyle = '#7ac46a'; x.fillRect(-6, -10, 12, 160); x.fillStyle = PINK; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(Math.cos(i) * 34, -20 + Math.sin(i) * 34, 24, 0, Math.PI * 2); x.fill() } x.restore()
      } else {
        x.font = `italic 600 44px ${SERIF}`; x.fillStyle = INK; x.fillText('see appendix C', -300, -300); x.fillText('see appendix C', -300, -200); x.fillText('see… my heart?', -300, -100)
        x.strokeStyle = '#c42a3f'; x.beginPath(); x.ellipse(-90, -100, 260, 60, 0, 0, Math.PI * 2); x.stroke()
      }
    }
    x.restore()
    // Pisces peeking up from the bottom of the page, crying
    seat(x, t, 'pisces', { x: 900, y: 1720, s: 200 }, { mood: last ? 'wide' : 'sparkle', look: [-1, -1], tears: last ? 3 : 2, seed: 6 })
  }

  function booth(t) {
    drawBooth(x, t, { sign: 'virgo' })
    const mood = step(t, [[-1, 'wide'], [T.notes, 'happy'], [T.close[1], 'neutral'], [T.prod + 0.3, 'wide'], [T.last[1], 'neutral'], [T.yes, 'heart'], [T.last2, 'sparkle']])
    const look = step(t, [[-1, [0, 1]], [T.notes, [0, 0]], [T.last[1], [0, 1]], [T.yes, [0, 0]]])
    const F = seat(x, t, 'virgo', { ...SUBJ, hops: [1.05, 1.7, T.doesnt + 0.05, T.yes + 0.05, T.last2 + 0.05] }, { mood, look, seed: 8, blush: t > T.yes ? 1 : undefined })
    // the binder: mid-slam at frame 0, then on the lap
    const sl = ease.inQuad(prog(t, -0.25, T.slam))
    const by = lerp(F.cy - 40, F.cy + 215, sl), brot = lerp(-0.4, -0.05, sl)
    binder(x, SUBJ.x, by, t > T.yes ? 0.72 : 0.8, brot + (t > T.last[1] && t < T.yes ? 0.05 * Math.sin(t * 3) : 0))
    flyingPages(x, t, T.slam)
    drawChairFront(x)
    const sob = t > T.yes
    boomOp(x, t, { tears: sob ? 4 : 2, mood: sob ? 'happy' : 'wide', sway: sob ? 2 : 1 })
    if (t > T.yes) sparkles(x, t, 540, 880, T.yes, 12, 280, 2, [PINK, GOLD, BONE])
    recChrome(x, t, { tc0: 15500, y0: 440 })
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const inC = t >= T.close[0] && t < T.close[1], inL = t >= T.last[0] && t < T.last[1]
      if (inC) page(t, false); else if (inL) page(t, true); else booth(t)
      lower.update(t, { k: inC || inL ? 0 : 1, name: WHO, color: VIR.color, tag: t < T.yes ? '“just being thorough”' : '“thoroughly smitten”' })
      caps.update(t)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, ...WHIPS.map(w => whipZoom(w)), slamTitle(HOOK), screenShake(SHAKE), loadingBar(LOAD)]
export const CUES = [
  ['boom', T.slam, 0.3], ['tom', T.slam, 85, { gain: 0.3, decay: 0.3 }], ['whoosh', 0.1, 0.5, 0.04],
  ...WHIPS.flatMap(w => whipZoomCues(w)), ...slamTitleCues(HOOK), ...shakeCues(SHAKE), ...loadingBarCues(LOAD), ...capCues(CAPS),
  ...T.tabs.map((a, i) => ['tom', a, 140 + i * 20, { gain: 0.18, decay: 0.2 }]), ...T.tabs.map((a, i) => ['pop', a + 0.05, [784, 880, 988, 1046.5][i], 0.03, 0.3]),
  ['glitter', T.yes, T.yes + 0.5], ['bell', T.yes + 0.05, 1318.5, 0.03, 1.2, 0], ...sobCues(T.yes + 0.3, 4, 0.4),
  ['pop', T.last2, 1046.5, 0.045, 0], ['bell', T.last2 + 0.05, 2093, 0.025, 0.9, 0],
]
