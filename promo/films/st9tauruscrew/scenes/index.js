// st9tauruscrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E09, THE CREW) · story 0–20.6, the end card.
//   "Never ask a Taurus out after *8 PM.*"  8:05 PM, already in the robe in the armchair; the earth-trio chat pings:
//   Capricorn "drinks? 10pm downtown", Virgo "i made a spreadsheet of bars". Taurus: "counteroffer:" "come over. i'll cook."
//   The kitchen (hosting instead), the doorbell, Virgo and Capricorn at the table: "i brought *labeled* leftover containers."
//   "i brought wine. and an *agenda.*" Fact chip, the window punched in: the Pleiades star cluster rides on the Bull's back.
//   11:30 PM, nobody left: Capricorn asleep on the rug. Last shot = frame 0's armchair framing; Virgo texts from two feet
//   away, "same time next week?", Taurus: "i'll cook."   "Come over. I'll *cook.*"
//   Rewatch bait: Virgo's containers are labeled (TAURUS · PASTA · TUES). Ghost: behind the record player, left edge.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, phoneScreen, phoneCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawTaurusHome } from '../../st9taurushome.js'

export const DURATION = 25
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN         // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const TA = signStar('taurus'), VI = signStar('virgo'), CA = signStar('capricorn')
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.75, kitchen: 5.6, bell: 7.0, table: 8.3, laugh: 12.3, fact: 12.6, late: 15.6,
  ghost: 16.3, last: 17.6, lastOut: [19.95, 20.2], fade: [20.15, 20.6],
}
const CUTS = [T.kitchen, T.table, T.late]
const PUNCH = [{ at: T.fact, out: T.late - 0.15, zoom: 1.5, x: 750, y: 700 }]
const CLOCK = [{ at: 0, from: '8:05 PM' }, { at: T.kitchen, dur: 0.6, from: '8:05 PM', to: '8:40 PM' }, { at: T.table, dur: 0.4, from: '8:40 PM', to: '9:00 PM' }, { at: T.late, dur: 0.8, from: '9:00 PM', to: '11:30 PM' }]
const CHAT = [
  { from: 'Capricorn', text: 'drinks? 10pm downtown', at: -1 },
  { from: 'Virgo', text: 'i made a spreadsheet of bars', at: 0.9, typing: 0.3 },
  { from: 'me', text: 'counteroffer:', at: 3.2 },
  { from: 'me', text: 'come over. i’ll cook.', at: 4.2 },
  { from: 'Capricorn', text: 'on our way.', at: 5.05, typing: 4.6 },
]
const CHAT2 = [
  { from: 'Virgo', text: 'same time next week?', at: 16.3, typing: 15.9 },
  { from: 'me', text: 'i’ll cook.', at: 17.0 },
]
const SAY = [
  { text: 'i brought *labeled* leftover containers.', at: 8.55, out: 10.35, who: 'vi' },
  { text: 'i brought wine. and an *agenda.*', at: 10.45, out: 12.25, who: 'ca' },
]
const WHO = { vi: ['♍ VIRGO', VI.color, 300], ca: ['♑ CAPRICORN', CA.color, 780], ta: ['♉ TAURUS', TA.color, 540] }
const STAMPS = [
  { at: 2.9, out: T.kitchen - 0.15, time: '8:05 PM', text: 'already in my *robe*' },
  { at: T.kitchen + 0.2, out: T.table - 0.15, time: '8:40 PM', text: 'hosting *instead*' },
  { at: T.late + 0.2, out: T.last - 0.1, time: '11:30 PM', text: 'nobody *left*' },
]
const FACT = { text: 'The Pleiades star cluster rides on the Bull’s back.', at: T.fact + 0.15, dur: 2.5, y: 1694, label: '★ REAL SKY' }
export const GHOST = { at: T.ghost, x: 20, y: 1060, where: 'peeking out from behind the record player, left edge, window room' }

// the Pleiades: a tiny dipper of seven pixel stars
const PLEIADES = [[0, 0, 4], [22, -8, 3], [40, 4, 3], [30, 22, 2], [8, 26, 3], [-14, 14, 2], [56, -14, 2]]
function pleiades(x, t, cx, cy, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(cx + 20, cy + 6, 0, cx + 20, cy + 6, 90); g.addColorStop(0, 'rgba(150,190,255,0.35)'); g.addColorStop(1, 'rgba(150,190,255,0)')
  x.fillStyle = g; x.fillRect(cx - 80, cy - 90, 200, 200)
  x.globalCompositeOperation = 'source-over'
  PLEIADES.forEach(([a, b, s], i) => drawPixelStar(x, cx + a, cy + b, 8 + s * 4 + 2 * Math.sin(t * 3 + i), i % 2, '#cfe0ff', '#ffffff'))
  x.restore()
}
function containers(x, cx, cy) {
  for (let i = 0; i < 3; i++) {
    const yy = cy - i * 34
    x.fillStyle = 'rgba(240,250,255,0.9)'; x.fillRect(cx - 50, yy - 30, 100, 30); x.fillStyle = VI.color; x.fillRect(cx - 54, yy - 36, 108, 10)
    x.fillStyle = '#ffffff'; x.fillRect(cx - 34, yy - 22, 68, 14)
    x.font = `700 9px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['TAURUS·PASTA', 'TUES', 'DO NOT EAT'][i], cx, yy - 15)
  }
}
function plate(x, cx, cy) {
  x.fillStyle = '#f7efe0'; x.beginPath(); x.ellipse(cx, cy, 64, 16, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e9c46a'; x.beginPath(); x.ellipse(cx, cy - 5, 40, 10, 0, 0, Math.PI * 2); x.fill()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "500 30px Inter", "700 9px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Never ask a Taurus out | after *8 PM.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Come over. | I’ll *cook.*', { top: 290, size: 112, accentSize: 156, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }
  function robe(r, sz) { x.fillStyle = '#e8a0a8'; x.fillRect(r.x - sz * 0.3, r.y + sz * 0.17, sz * 0.6, sz * 0.24); x.fillStyle = '#f7c4c8'; x.fillRect(r.x - sz * 0.3, r.y + sz * 0.17, sz * 0.6, sz * 0.05) }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK)
      const room = t < T.kitchen || t >= T.late ? 'window' : 'kitchen'
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: t < T.late ? 20.2 + t * 0.06 : 23.5 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      if (room === 'kitchen') pleiades(x, t, 730, 690, t > T.table ? 0.5 + 0.5 * prog(t, T.fact, T.fact + 0.4) : 0.4)
      const g = drawTaurusHome(x, t, { room, ep: 4, spin: room === 'window', steam: room === 'kitchen' ? 1 : 0, candles: t > T.table ? 3 : 0 })
      if (room === 'window') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      if (room === 'window') {
        // the armchair: Taurus tucked in (frame 0), then 11:30 PM with the crew
        const r = drawStarChar(x, 520, 1060, 290, t, { color: TA.color, glyph: TA.glyph, mood: t < T.late ? (t < 3.2 ? 'sleepy' : 'happy') : (t < 17.0 ? 'sleepy' : 'happy'), look: [1, 0.4], hops: [3.25, 4.25, 17.05], seed: 14, zzz: t < 3.2 })
        robe(r, 290)
        if (t < 3.2) { x.fillStyle = '#e9b24a'; x.fillRect(r.x - 150, r.y + 52 - Math.max(0, 1.2 - t) * 16, 300, 110); for (let i = 0; i < 4; i++) { x.fillStyle = '#c9902e'; x.fillRect(r.x - 144, r.y + 66 + i * 24, 288, 6) } }   // the throw, pulled up
        if (t >= T.late) {
          drawStarChar(x, 230, 1330, 220, t, { color: VI.color, glyph: VI.glyph, mood: 'happy', look: [1, -0.5], hops: [16.3], seed: 26 })
          drawStarChar(x, 760, 1440, 200, t, { color: CA.color, glyph: CA.glyph, mood: 'sleepy', seed: 31 })
        }
      } else if (t < T.table) {
        drawStarChar(x, 700, 1150, 290, t, { color: TA.color, glyph: TA.glyph, mood: 'happy', look: t < T.bell ? [1, -0.5] : [-1, 0], hops: [T.kitchen + 0.3, T.bell + 0.1], seed: 14 })
        if (t > T.bell) {
          const k = ease.outCubic(prog(t, T.bell + 0.15, T.bell + 0.7))
          drawStarChar(x, lerp(-160, 220, k), 1170, 230, t, { color: VI.color, glyph: VI.glyph, mood: 'happy', look: [1, 0], seed: 26, hops: [T.bell + 0.7] })
          drawStarChar(x, lerp(-320, 430, k), 1180, 240, t, { color: CA.color, glyph: CA.glyph, mood: 'neutral', look: [1, 0], seed: 31, hops: [T.bell + 0.8] })
        }
      } else {
        const laugh = t > T.laugh && t < T.laugh + 0.9
        const lh = laugh ? [T.laugh, T.laugh + 0.3, T.laugh + 0.6] : []
        drawStarChar(x, 300, 1260, 240, t, { color: VI.color, glyph: VI.glyph, mood: laugh ? 'happy' : 'sparkle', look: [1, 0], hops: [8.6, 9.3, ...lh], seed: 26 })
        drawStarChar(x, 540, 1240, 270, t, { color: TA.color, glyph: TA.glyph, mood: laugh || t > T.fact ? 'happy' : 'neutral', look: t < 10.4 ? [-1, 0] : [1, 0], hops: lh, seed: 14 })
        drawStarChar(x, 780, 1260, 250, t, { color: CA.color, glyph: CA.glyph, mood: laugh ? 'happy' : 'squint', look: [-1, 0], hops: [10.5, 11.2, ...lh], seed: 31 })
        x.fillStyle = '#a8744a'; x.fillRect(198, 1380, 684, 24); x.fillStyle = '#f7efe0'; x.fillRect(198, 1368, 684, 12)
        for (let i = 0; i < 3; i++) { const c = 470 + i * 70; x.fillStyle = '#f3e8cf'; x.fillRect(c - 9, 1312, 18, 60); const f = 1 + 0.15 * Math.sin(t * 17 + i * 2); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(c, 1296, 7 * f, 14 * f, 0, 0, Math.PI * 2); x.fill() }
        plate(x, 300, 1362); plate(x, 780, 1362)
        if (t > 8.55) containers(x, 260, 1350)
      }
      x.restore()

      if (room === 'window') {
        const first = t < T.late
        phoneScreen(x, t, { x: 840, y: first ? 1130 : 1000, w: 400, h: first ? 700 : 560, app: 'chat', title: 'earth trio', lines: first ? CHAT : CHAT2, clock: first ? '8:05' : '11:41', pop: first ? 1 - prog(t, T.kitchen - 0.25, T.kitchen) : ease.outCubic(prog(t, 15.8, 16.05)) * (1 - prog(t, T.lastOut[0] - 0.2, T.lastOut[0])), rot: 0.04, accent: '#7fa37f', size: 30 })
      }
      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'taurus' })
      for (const s of SAY) { const [n, c, px] = WHO[s.who]; speechBubble(x, t, { ...s, x: px, y: 1110, name: n, color: c, side: s.who === 'vi' ? 0.4 : -0.4 }) }
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.45 })
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

const CARD_CUTS = [{ t: T.table, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E09' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...phoneCues(CHAT.filter(l => l.at > 0)), ...phoneCues(CHAT2),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: s.who === 'vi' ? 1046.5 : 587.33 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.03 })),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur, { gain: 0.02 })),
  ['pop', T.bell, 1396.91, 0.045, -0.4], ['bell', T.bell + 0.02, 1396.91, 0.035, 1.4, -0.4], ['pop', T.bell + 0.35, 1174.66, 0.04, -0.4], ['bell', T.bell + 0.37, 1174.66, 0.03, 1.6, -0.4],
  ['whoosh', T.bell + 0.15, 0.5, 0.035],
  ...[0, 0.3, 0.6].map((d, i) => ['pop', r3(T.laugh + d), [932.33, 1046.5, 1174.66][i], 0.035, (i - 1) * 0.4]),
  ['glitter', T.fact, T.fact + 0.8], ...factChipCues(FACT.at, FACT),
  ['tick', T.ghost + 0.05, 0.015],
  ...[0, 0.1, 0.35].map((d, i) => ['pop', r3(T.last + d), [932.33, 1046.5, 1396.91][i], 0.045, 0]), ['pluck', T.last + 0.35, 1396.91, 0.045, 0.8, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
