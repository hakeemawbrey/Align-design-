// st9aries3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E05, 3 AM) · story 0–27.6, then the end card.
//   "What an Aries thinks about at *3 AM.*"  The same bedroom as E01, dark, every star out in the window. Aries is bolt
//   upright in bed. A VHS "◀◀ REPLAY" of hole 4 (E04) runs in the dark: tiny Aries yelling THAT WAS NOT A MULLIGAN.
//   "was i… too *much?*" (its season-6 fear). It drafts a sorry to Leo in Notes, hovers over SEND NOW, and picks MORNING.
//   In the window, the ram's stars; fact chip: in Greek myth, the golden ram's fleece became the Golden Fleece. It lies
//   down and sleeps. 7:00 AM, the alarm (E01's), it sends the sorry; Leo: "lol you were hilarious. rematch?" Last shot =
//   frame 0's framing, sunlit, sitting up in bed, smiling.   "Even rams need *rest.*"
//   Rewatch bait: the IDEAS board now has the 3RD ribbon and a sixth note, SAY SORRY. Ghost: behind the right curtain.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawPixelStar } from '../../sky.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, phoneScreen, phoneCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawAriesHome } from '../../st9arieshome.js'

export const DURATION = 32
const KEY = 'Dm'
const STORY_END = DURATION - ENDCARD_LEN         // 27.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0'
const AR = signStar('aries'), LE = signStar('leo')
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.75, replay: [2.9, 6.4], much: 6.6, phone: 8.8, ask: 12.0, pick: 13.2, ram: 15.4, sleep: 18.6, morning: 21.2,
  ghost: 17.0, last: 24.1, lastOut: [27.0, 27.25], fade: [27.2, 27.6],
}
const CUTS = [T.morning]
const PUNCH = [{ at: T.much, out: T.phone - 0.1, zoom: 1.35, x: 330, y: 1000 }, { at: T.ram, out: T.sleep - 0.1, zoom: 1.3, x: 780, y: 730 }]
const CLOCK = [
  { at: 0, from: '3:04 AM' },
  { at: T.phone, dur: 0.6, from: '3:04 AM', to: '3:12 AM' },
  { at: T.pick + 0.2, dur: 0.5, from: '3:12 AM', to: '3:21 AM' },
  { at: T.sleep, dur: 0.8, from: '3:21 AM', to: '3:30 AM' },
  { at: T.morning, from: '7:00 AM' },
]
const NOTES = [
  { text: 'hey. i got loud at hole 4.', at: 9.1 },
  { text: 'sorry. you’re my favorite rival.', at: 10.4 },
]
const CHAT = [
  { from: 'me', text: 'hey. i got loud at hole 4. sorry. you’re my favorite rival.', at: 21.7 },
  { from: 'Leo', text: 'lol you were hilarious. rematch?', at: 23.0, typing: 22.3 },
]
const SAY = [
  { text: 'was i… too *much?*', at: T.much, out: 8.6 },
  { text: 'it can wait till *morning.*', at: 13.45, out: 15.25 },
]
const STAMPS = [
  { at: 2.95, out: T.much - 0.1, time: '3:04 AM', text: 'replaying an *argument*' },
  { at: 9.05, out: T.ask - 0.1, time: '3:12 AM', text: 'drafting a *sorry*' },
  { at: T.sleep + 0.2, out: T.morning - 0.15, time: '3:30 AM', text: 'rest. *finally.*' },
  { at: T.morning + 0.25, out: T.last - 0.1, time: '7:00 AM', text: 'sent it, *rested*' },
]
const FACT = { text: 'In Greek myth, the golden ram’s fleece became the Golden Fleece.', at: T.ram + 0.3, dur: 2.7, y: 1694, label: '★ THE MYTH' }
export const GHOST = { at: T.ghost, x: 1002, y: 760, where: 'peeking out from behind the right curtain of the bedroom window, 3 AM' }

// the ram's stars in the window (41 Ari · Hamal · Sheratan · Mesarthim, a bent line)
const RAM_STARS = [[668, 626, 2], [764, 692, 4], [846, 752, 3], [872, 800, 2]]
function ramStars(x, t, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.strokeStyle = 'rgba(242,199,92,0.55)'; x.lineWidth = 3; x.beginPath()
  RAM_STARS.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(780, 720, 0, 780, 720, 200); g.addColorStop(0, `rgba(255,210,110,${0.35 * k})`); g.addColorStop(1, 'rgba(255,210,110,0)')
  x.fillStyle = g; x.fillRect(580, 520, 400, 400)
  x.globalCompositeOperation = 'source-over'
  RAM_STARS.forEach(([a, b, s], i) => drawPixelStar(x, a, b, 14 + s * 7 + 3 * Math.sin(t * 3 + i), i % 2, GOLD, '#fff6e6'))
  x.restore()
}
/** the VHS replay of hole 4 (a thought, in the dark) */
function vhsReplay(x, t) {
  const [a, b] = T.replay
  const k = Math.min(prog(t, a, a + 0.2), 1 - prog(t, b - 0.25, b))
  if (k <= 0) return
  const x0 = 560, y0 = 560, w = 450, h = 330
  x.save(); x.globalAlpha = k
  x.fillStyle = '#0d1a14'; x.fillRect(x0, y0, w, h)
  // the tiny scene: green, a windmill, two tiny stars
  x.fillStyle = '#2f7a3c'; x.fillRect(x0, y0 + 200, w, 130)
  x.fillStyle = '#e8e1d2'; x.fillRect(x0 + 340, y0 + 110, 50, 90); x.fillStyle = '#c8432a'; x.fillRect(x0 + 330, y0 + 98, 70, 16)
  const yell = Math.floor(t * 6) % 2
  drawStarChar(x, x0 + 120, y0 + 200, 110, t, { color: AR.color, mood: 'squint', glow: 0.2, tips: false, hops: [a + 0.3, a + 0.7, a + 1.1, a + 1.5, a + 2.3, a + 2.7], seed: 3, squash: yell ? -0.1 : 0 })
  drawStarChar(x, x0 + 250, y0 + 210, 90, t, { color: LE.color, mood: 'wide', glow: 0.2, tips: false, seed: 4, look: [-1, 0] })
  x.font = `800 26px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'
  x.fillText('THAT WAS NOT A MULLIGAN!!', x0 + w / 2, y0 + 70 + (yell ? -2 : 2))
  // VHS chrome: scanlines, tracking band, labels
  x.fillStyle = 'rgba(0,0,0,0.25)'; for (let yy = y0; yy < y0 + h; yy += 6) x.fillRect(x0, yy, w, 2)
  const band = y0 + ((t * 140) % h)
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(x0, band, w, 14)
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#ffffff'
  x.fillText('◀◀ REPLAY', x0 + 14, y0 + 24); x.textAlign = 'right'; x.fillText('HOLE 4', x0 + w - 14, y0 + 24)
  x.fillText(`SP 0:0${Math.floor((t - a) * 1.5) % 10}`, x0 + w - 14, y0 + h - 20)
  x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 4; x.strokeRect(x0, y0, w, h)
  x.restore()
}
/** SEND NOW? YES / MORNING over the phone, a cursor that hovers YES then taps MORNING */
function sendPrompt(x, t) {
  const k = Math.min(prog(t, T.ask, T.ask + 0.2), 1 - prog(t, T.ram - 0.3, T.ram))
  if (k <= 0) return
  const cx = 770, cy = 1240
  x.save(); x.globalAlpha = k
  x.fillStyle = 'rgba(10,6,24,0.94)'; x.fillRect(cx - 190, cy - 90, 380, 180)
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(cx - 190, cy - 90, 380, 180)
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('SEND NOW?', cx, cy - 50)
  const picked = t > T.pick + 0.1
  const btn = (bx, label, on) => { x.fillStyle = on ? GOLD : '#2b2440'; x.fillRect(bx - 80, cy + 4, 160, 60); x.fillStyle = on ? INK : BONE; x.font = `700 24px ${MONO}`; x.fillText(label, bx, cy + 35) }
  btn(cx - 92, 'YES', !picked && Math.floor(t * 3) % 2 === 0)
  btn(cx + 92, 'MORNING', picked)
  // the cursor
  const p = ease.inOutCubic(prog(t, T.pick - 0.5, T.pick))
  const px = lerp(cx - 80, cx + 100, p), py = cy + 50 + Math.sin(t * 4) * 3 * (1 - p)
  x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 26, py + 26); x.lineTo(px + 10, py + 28); x.lineTo(px + 4, py + 42); x.closePath(); x.fill()
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "800 26px Inter", "500 26px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'What an Aries thinks | about at *3 AM.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Even rams | need *rest.*', { top: 290, size: 112, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.last + 0.4, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK), morn = t >= T.morning
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: morn ? 7 : 3 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      ramStars(x, t, morn ? 0 : 0.35 + 0.65 * prog(t, T.ram - 0.2, T.ram + 0.6) * (1 - 0.6 * prog(t, T.sleep + 1, T.sleep + 2)))
      const g = drawAriesHome(x, t, { room: 'bedroom', ep: 5, dark: morn ? 0 : 1, ring: morn && t < T.morning + 0.5 })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      // Aries in bed
      const asleep = t >= T.sleep + 0.4 && !morn
      let mood = t < T.much ? 'wide' : t < T.phone ? 'neutral' : t < T.ram ? (t < T.pick ? 'squint' : 'happy') : t < T.sleep ? 'sparkle' : 'sleepy'
      if (morn) mood = t < T.morning + 0.6 ? 'wide' : t < CHAT[1].at ? 'neutral' : 'happy'
      const look = t < T.much ? [1, 0] : t < T.phone ? [0, 1] : t < T.ram ? [1, 0.6] : t < T.sleep ? [1, -1] : morn ? [1, 0.4] : [0, 0]
      const ay = lerp(1000, 1070, ease.inOutCubic(prog(t, T.sleep, T.sleep + 0.6))) * (morn ? 0 : 1) + (morn ? 1000 : 0)
      const hops = morn ? [T.morning + 0.1, CHAT[1].at + 0.1, CHAT[1].at + 0.45, T.last + 0.4] : [0.1, 0.5, T.pick + 0.15]
      drawStarChar(x, 330, ay, 290, t, { color: AR.color, glyph: AR.glyph, mood, look, hops, seed: 9, squash: asleep ? 0.12 : 0, bob: asleep ? 2 : undefined, glow: morn ? 1 : 0.7 })
      // the blanket over it (in bed)
      x.fillStyle = '#c8432a'; x.fillRect(210, 1110, 360, 132); x.fillStyle = '#f0603a'; x.fillRect(210, 1092, 360, 24)
      // phone glow on its face while drafting
      if (!morn && t > T.phone && t < T.ram) { x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(560, 1100, 0, 560, 1100, 360); gg.addColorStop(0, 'rgba(120,160,255,0.22)'); gg.addColorStop(1, 'rgba(120,160,255,0)'); x.fillStyle = gg; x.fillRect(200, 740, 720, 720); x.restore() }
      x.restore()

      vhsReplay(x, t)
      if (!morn && t > T.phone - 0.2 && t < T.ram) phoneScreen(x, t, { x: 770, y: 1180, w: 420, h: 640, app: 'notes', title: 'draft to Leo', lines: NOTES, clock: '3:12', pop: ease.outCubic(prog(t, T.phone - 0.2, T.phone + 0.1)) * (1 - prog(t, T.ram - 0.3, T.ram)), rot: -0.04, size: 32 })
      sendPrompt(x, t)
      if (morn) phoneScreen(x, t, { x: 790, y: 1150, w: 420, h: 700, app: 'chat', title: 'Leo', lines: CHAT, clock: '7:00', pop: ease.outCubic(prog(t, T.morning + 0.2, T.morning + 0.45)) * (1 - prog(t, T.last - 0.2, T.last + 0.1)), rot: 0.04, accent: '#ff6a4a', size: 30 })
      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'aries' })
      for (const s of SAY) speechBubble(x, t, { ...s, x: 330, y: 840, name: '♈ ARIES', color: AR.color, side: 0.3 })
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: morn ? 1 : 0.15 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.5 * cam.flash; x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.morning, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E05' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['whoosh', T.replay[0], 0.4, 0.04], ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.replay[0] + 0.2 + i * 0.33), 0.012]),
  ['pop', T.replay[0] + 0.3, 1174.66, 0.03, 0.4], ['pop', T.replay[0] + 1.1, 1174.66, 0.03, 0.4],
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 740 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.03 })),
  ...CLOCK.slice(1, 4).flatMap(c => clockCues(c.at, c.dur, { gain: 0.02 })),
  ...phoneCues(NOTES, { app: 'notes' }),
  ['pop', T.ask, 880, 0.04, 0.3], ['pop', T.pick, 1318.51, 0.045, 0.3], ['bell', T.pick + 0.05, 1760, 0.025, 1.4, 0.3],
  ['glitter', T.ram + 0.1, T.ram + 1.0], ...factChipCues(FACT.at, FACT),
  ['tick', T.ghost + 0.05, 0.015],
  ['bell', T.sleep + 0.4, 880, 0.02, 2.2, 0], ['bell', T.sleep + 0.9, 1174.66, 0.018, 2.2, 0],
  ...Array.from({ length: 3 }, (_, i) => ['pop', r3(T.morning + 0.05 + i * 0.25), 1760, 0.025, -0.3]),
  ...phoneCues(CHAT),
  ...[0, 0.09, 0.18, 0.4].map((d, i) => ['pop', r3(T.last + d), [880, 987.77, 1174.66, 1318.51][i], 0.04, 0]), ['pluck', T.last + 0.4, 1318.51, 0.045, 0.8, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
