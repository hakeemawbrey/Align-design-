// st9arieswork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E02, 9 TO 5) · story 0–20.6, then the end card.
//   "An Aries in a meeting that could’ve been an *email.*"  Work from home, the weekly sync on the monitor (Capricorn,
//   Taurus, Virgo, and Pisces' tile, which is just a cat). Aries volunteers first ("ME. i'll lead it."), then starts three
//   projects at once: three progress bars race up on the floor and stall. "wait. which one is *due?*" Fact chip: Aries is
//   cardinal, a "starter" sign, and the natural ruler of the 1st house (self, first impressions). Aries picks one: bar A
//   fills to COMPLETE; B and C get a TOMORROW sticky. The meeting ends with the email it could have been. Last shot =
//   frame 0's framing: the next meeting, Capricorn asks again, Aries' point goes up… and back down. "after i finish
//   *this* one."   "First in. *Finish* one."
//   Rewatch bait: Pisces' tile is a cat the whole meeting (its name tag says "brb"). Ghost: behind the monitor's right edge.
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
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawAriesHome } from '../../st9arieshome.js'

export const DURATION = 25
const KEY = 'F#m'
const STORY_END = DURATION - ENDCARD_LEN         // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0'
const AR = signStar('aries')
const NAME = '♈ ARIES'
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.75, start3: 5.0, stall: 8.5, fact: 10.5, pick: 11.1, fillA: [13.0, 14.2], email: 14.6,
  next: 15.5, raise: 15.8, lower: 16.3, ghost: 7.0, last: 18.0, lastOut: [19.95, 20.2], fade: [20.15, 20.6],
}
const CUTS = [T.start3, T.next]
const PUNCH = [{ at: T.stall, out: T.fact - 0.1, zoom: 1.35, x: 770, y: 1000 }]
const CLOCK = [
  { at: 0, from: '9:00', to: '9:00' },
  { at: 2.9, dur: 0.4, from: '9:00', to: '9:02' },
  { at: T.start3 + 0.1, dur: 1.0, from: '9:02', to: '11:15' },
  { at: T.fillA[0], dur: 1.2, from: '11:15 AM', to: '4:58 PM' },
  { at: T.next, dur: 0.4, from: '4:58 PM', to: '5:00 PM' },
]
const BARS = [
  { name: 'A · THE DECK', col: '#ff6a4a', to: 0.22 }, { name: 'B · NEW LOGO', col: '#f2c75c', to: 0.16 }, { name: 'C · OFFICE GYM', col: '#8fe3ff', to: 0.09 },
]
const SAY = [
  { text: 'ME. i’ll *lead* it.', at: 0.4, out: 2.65 },
  { text: 'wait. which one is *due?*', at: 8.65, out: 10.45 },
  { text: '*one.* finish one.', at: 11.2, out: 12.95 },
  { text: 'after i finish *this* one.', at: 16.35, out: 17.95 },
]
const STAMPS = [
  { at: 2.95, out: T.start3 - 0.15, time: '9:02 AM', text: 'volunteered *first*' },
  { at: T.start3 + 0.25, out: T.stall - 0.1, time: '11:15 AM', text: 'started *three* projects' },
  { at: T.fillA[0] + 0.3, out: T.next - 0.15, time: '4:58 PM', text: '*finished* one' },
]
const FACT = { text: 'Aries is cardinal, a “starter” sign, and the natural ruler of the 1st house (self, first impressions).', at: T.fact, dur: 3.7, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 534, y: 830, where: 'peeking out from behind the right edge of the monitor, desk' }

// the call tiles (in the monitor)
const TILES = [
  { id: 'capricorn', name: 'CAPRICORN' }, { id: 'taurus', name: 'TAURUS' },
  { id: 'virgo', name: 'VIRGO' }, { id: 'cat', name: 'PISCES (brb)' },
]
const CAT = ['K.....K.', 'KK...KK.', 'KKKKKKK.', 'KGKKKGK.', 'KKKPKKK.', 'KKWKWKK.', '.KKKKK..']
function drawCall(x, t, sc, speaking) {
  const { x0, y0, x1, y1 } = sc, tw = (x1 - x0) / 2, th = (y1 - y0 - 30) / 2
  x.save()
  x.fillStyle = '#100c22'; x.fillRect(x0, y0, x1 - x0, y1 - y0)
  x.font = `700 15px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#9a93b5'
  const el = 42 * 60 + 17 + Math.floor(t * 9)
  x.fillText(`WEEKLY SYNC · ${String(Math.floor(el / 3600)).padStart(2, '0')}:${String(Math.floor(el / 60) % 60).padStart(2, '0')}:${String(el % 60).padStart(2, '0')}`, x0 + 10, y0 + 15)
  TILES.forEach((tl, i) => {
    const tx = x0 + (i % 2) * tw + 4, ty = y0 + 30 + Math.floor(i / 2) * th + 2
    x.fillStyle = '#211b3a'; x.fillRect(tx, ty, tw - 8, th - 6)
    if (tl.id === 'cat') {
      const cell = 9, cx = tx + tw / 2 - 40, cy = ty + 26
      CAT.forEach((row, r) => [...row].forEach((ch, c) => {
        if (ch === '.') return
        x.fillStyle = ch === 'K' ? '#e2a35a' : ch === 'G' ? '#7dff9a' : ch === 'P' ? '#ff8fb1' : '#ffffff'
        if (ch === 'G' && Math.floor(t * 0.7) % 4 === 3) x.fillStyle = '#e2a35a'
        x.fillRect(cx + c * cell, cy + r * cell, cell, cell)
      }))
    } else {
      const st = signStar(tl.id)
      drawStarChar(x, tx + tw / 2 - 4, ty + th / 2 - 6, 88, t, { color: st.color, glow: 0.3, tips: false, zzz: false, mood: tl.id === 'taurus' && t > T.start3 && t < T.next ? 'sleepy' : 'neutral', seed: 30 + i, hops: speaking === i ? [t - (t % 0.4)] : [] })
    }
    if (speaking === i) { x.strokeStyle = MINT; x.lineWidth = 4; x.strokeRect(tx + 2, ty + 2, tw - 12, th - 10) }
    x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillRect(tx + 4, ty + th - 30, x.measureText(tl.name).width + 12, 20)
    x.fillStyle = '#efe6d6'; x.fillText(tl.name, tx + 10, ty + th - 20)
  })
  x.restore()
}
/** Capricorn's tile caption (a tiny live subtitle on the call) */
function callCaption(x, t, sc, text, at, out) {
  if (t < at || t > out) return
  const n = Math.floor((t - at) * 30)
  x.save(); x.font = `700 20px Inter, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(0,0,0,0.75)'; x.fillRect(sc.x0 + 10, sc.y1 - 40, sc.x1 - sc.x0 - 20, 32)
  x.fillStyle = '#ffffff'; x.fillText(text.slice(0, n), (sc.x0 + sc.x1) / 2, sc.y1 - 24); x.restore()
}
function emailToast(x, t, sc) {
  const p = prog(t, T.email, T.email + 0.25), q = 1 - prog(t, T.next - 0.2, T.next)
  const k = Math.min(p, q)
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  const y = lerp(sc.y0 - 40, sc.y0 + 40, ease.outBack ? ease.outCubic(p) : p)
  x.fillStyle = '#fbf4e6'; x.fillRect(sc.x0 + 14, y, sc.x1 - sc.x0 - 28, 120)
  x.fillStyle = '#3a7bd5'; x.fillRect(sc.x0 + 14, y, 10, 120)
  x.fillStyle = INK; x.font = `700 17px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('NEW EMAIL · CAPRICORN', sc.x0 + 36, y + 22)
  x.font = `700 21px Inter, sans-serif`; x.fillText('Re: weekly sync', sc.x0 + 36, y + 54)
  x.font = `500 19px Inter, sans-serif`; x.fillText('“next time, this can be an email.”', sc.x0 + 36, y + 88)
  x.restore()
}
function progressBars(x, t) {
  const a = ease.outCubic(prog(t, T.start3, T.start3 + 0.3)) * (1 - prog(t, T.next - 0.25, T.next))
  if (a <= 0) return
  const x0 = 110, y0 = 1290, w = 860
  x.save(); x.globalAlpha = a
  x.fillStyle = 'rgba(10,6,24,0.84)'; x.fillRect(x0 - 20, y0 - 20, w + 40, 238)
  x.fillStyle = '#ff5a3c'; x.fillRect(x0 - 20, y0 - 20, w + 40, 6)
  BARS.forEach((b, i) => {
    const y = y0 + 16 + i * 70
    let v = b.to * ease.outCubic(prog(t, T.start3 + 0.2 + i * 0.35, T.stall))
    if (i === 0) v = lerp(v, 1, ease.inOutCubic(prog(t, ...T.fillA)))
    x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText(b.name, x0, y)
    x.fillStyle = '#2b2440'; x.fillRect(x0 + 300, y - 18, 440, 36)
    x.fillStyle = b.col; x.fillRect(x0 + 300, y - 18, Math.round(440 * v / 20) * 20, 36)
    for (let k = 1; k < 22; k++) { x.fillStyle = 'rgba(10,6,24,0.5)'; x.fillRect(x0 + 300 + k * 20 - 2, y - 18, 4, 36) }
    x.textAlign = 'right'
    const stalled = t > T.stall && t < T.fillA[0] && i < 3
    x.fillStyle = stalled && Math.floor(t * 3) % 2 ? '#ff5a3c' : BONE
    x.fillText(i === 0 && v > 0.995 ? 'DONE ✓' : `${Math.round(v * 100)}%`, x0 + w, y)
    if (i > 0 && t > T.fillA[1]) {                                   // the TOMORROW sticky
      const k = ease.outBack ? clamp((t - T.fillA[1] - i * 0.15) / 0.25) : 1
      if (k > 0) { x.save(); x.translate(x0 + 600, y); x.rotate(-0.08 + i * 0.05); x.scale(k, k); x.fillStyle = '#ffe36e'; x.fillRect(-90, -24, 180, 48); x.fillStyle = INK; x.textAlign = 'center'; x.font = `700 20px ${MONO}`; x.fillText('TOMORROW', 0, 1); x.restore() }
    }
  })
  if (t > T.fillA[1] && t < T.fillA[1] + 1.2) {                     // COMPLETE burst on A
    const p = (t - T.fillA[1]) / 1.2
    x.globalAlpha = a * (1 - p)
    for (let i = 0; i < 10; i++) { const an = i * 0.63; x.fillStyle = i % 2 ? GOLD : MINT; x.fillRect(x0 + 520 + Math.cos(an) * p * 200, y0 + 16 + Math.sin(an) * p * 90, 10, 10) }
  }
  x.restore()
}

/** a soft dark wash behind the top type (the hook at frame 0, the last line at the end) */
function topScrim(x, t) {
  const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
  if (k <= 0) return
  const g = x.createLinearGradient(0, 0, 0, 820)
  g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 15px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'An Aries in a meeting | that could’ve been | an *email.*', out: T.hookOut, size: 88, accentSize: 130, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'First in. | *Finish* one.', { top: 290, size: 112, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.last + 0.3, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // Aries zips between the three projects
  const zipX = t => { const k = Math.floor((t - T.start3 - 0.2) / 0.55); return [600, 780, 940][((k % 3) + 3) % 3] }
  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK)
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: t < T.fillA[0] ? 9 + t * 0.15 : lerp(11.3, 17, prog(t, ...T.fillA)) })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const g = drawAriesHome(x, t, { room: 'desk', ep: 2 })
      const speaking = t < 2.6 || (t > T.next && t < T.raise + 0.4) ? 0 : t > T.start3 && t < T.stall ? 2 : -1
      drawCall(x, t, g.screen, speaking)
      callCaption(x, t, g.screen, 'who wants to lead the—', 0, 1.4)
      callCaption(x, t, g.screen, 'who wants to lead the next—', T.next + 0.1, T.raise + 1.0)
      emailToast(x, t, g.screen)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      // Aries
      let ax = 770, ay = 1040, mood = 'happy', look, squash = 0, hops = [], rot = 0
      if (t < T.start3) { squash = t < 2.6 ? -0.16 + 0.04 * Math.sin(t * 9) : 0; hops = [0.2, 0.8, 1.4, 2.0]; mood = 'sparkle'; look = [-1, 0] }
      else if (t < T.stall) { ax = zipX(t); hops = Array.from({ length: 8 }, (_, i) => T.start3 + 0.2 + i * 0.55); mood = 'happy' }
      else if (t < T.pick) { mood = 'wide'; look = [0, 1] }
      else if (t < T.next) { mood = t < T.fillA[0] ? 'squint' : 'happy'; look = [-1, 1]; if (t > T.fillA[1]) hops = [T.fillA[1] + 0.05, T.fillA[1] + 0.4] }
      else { mood = t < T.lower ? 'sparkle' : 'happy'; squash = t > T.raise && t < T.lower ? -0.16 : 0; look = [-1, 0]; hops = [T.raise] }
      drawStarChar(x, ax, ay, 320, t, { color: AR.color, glyph: AR.glyph, mood, look, squash, hops, seed: 9 })
      void rot
      x.restore()

      topScrim(x, t)
      drawClock(x, t, { ...ck, sign: 'aries' })
      progressBars(x, t)
      for (const s of SAY) speechBubble(x, t, { ...s, x: s.at > T.start3 && s.at < T.next ? 770 : 780, y: 860, name: NAME, color: AR.color })
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.7 })
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

const CARD_CUTS = [{ t: T.start3, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E02' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const NOTE = [739.99, 830.61, 880, 987.77, 1108.73, 1244.51, 1479.98]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 880 })),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur)),
  ...BARS.map((b, i) => ['pop', r3(T.start3 + 0.2 + i * 0.35), NOTE[i * 2], 0.045, (i - 1) * 0.4]),
  ...Array.from({ length: 8 }, (_, i) => ['whoosh', r3(T.start3 + 0.2 + i * 0.55), 0.2, 0.025]),
  ...[0, 0.4, 0.8].map(d => ['pop', r3(T.stall + d), 466.16, 0.035, 0]), ['boom', T.stall, 0.18],
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(FACT.at, FACT),
  ['riser', T.fillA[0], T.fillA[1], 0.06], ['glitter', T.fillA[1], T.fillA[1] + 0.8], ['bell', T.fillA[1], 1479.98, 0.04, 1.4, 0], ['pop', T.fillA[1], 1479.98, 0.05, 0],
  ...[0.15, 0.3].map(d => ['pop', r3(T.fillA[1] + d), 987.77, 0.035, 0.3]),
  ['pop', T.email, 1318.51, 0.04, -0.3], ['pop', T.email + 0.08, 1760, 0.03, -0.3],
  ['pop', T.raise, 1318.51, 0.035, 0.2], ['pop', T.lower, 739.99, 0.035, 0.2],
  ['pop', T.last, 987.77, 0.04, 0], ['pop', T.last + 0.09, 1108.73, 0.04, 0], ['pop', T.last + 0.3, 1479.98, 0.055, 0], ['pluck', T.last + 0.3, 1479.98, 0.045, 0.7, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
