// st9tauruslove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E08, DATE NIGHT) · story 0–25.6, the end card.
//   "How a Taurus says *I love you.*"  The kitchen at dusk: Taurus stirring a pot that steams little hearts ("cooking
//   since *three*"). Ding: Scorpio, its season 4/5 partner. "it smells like… *effort.*" (it checks the recipe with a tiny
//   magnifier, a season-1 habit). Three candles light one by one. At the table: "you could’ve just *said* it." "i’m saying
//   it. with *pasta.*" They lean in, points touching. Fact chip: Taurus is ruled by Venus (bright in the window). "it took
//   me months to *decide.*" "now i’m *sure.*" Last shot = frame 0's framing at the stove, Scorpio stirring now, Taurus
//   beside it.   "Love you *slowly.* On purpose."
//   Rewatch bait: Scorpio's magnifier on the recipe card. Ghost: peeking around the window frame.
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
import { drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawTaurusHome } from '../../st9taurushome.js'

export const DURATION = 30
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN         // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const TA = signStar('taurus'), SC = signStar('scorpio')

const T = {
  hookOut: 2.75, bell: 5.0, candles: [7.6, 7.9, 8.2], table: 9.8, lean: 14.0, fact: 14.2, stove: 20.5,
  ghost: 12.6, last: 22.8, lastOut: [25.0, 25.25], fade: [25.2, 25.6],
}
const CUTS = [T.table, T.stove]
const PUNCH = [{ at: 18.6, out: 20.35, zoom: 1.25, x: 540, y: 1200 }]
const CLOCK = [{ at: 0, from: '6:30 PM' }, { at: 7.5, dur: 0.5, from: '6:30 PM', to: '7:00 PM' }, { at: T.stove, from: '9:30 PM' }]
const SAY = [
  { text: 'it smells like… *effort.*', at: 5.55, out: 7.35, who: 'sc' },
  { text: 'you could’ve just *said* it.', at: 10.0, out: 11.8, who: 'sc' },
  { text: 'i’m saying it. with *pasta.*', at: 12.0, out: 13.85, who: 'ta' },
  { text: 'it took me months to *decide.*', at: 16.6, out: 18.45, who: 'ta' },
  { text: 'now i’m *sure.*', at: 18.6, out: 20.35, who: 'ta' },
]
const STAMPS = [
  { at: 2.9, out: T.bell - 0.1, time: '6:30 PM', text: 'cooking since *three*' },
  { at: 7.65, out: T.table - 0.15, time: '7:00 PM', text: 'candles: *lit*' },
  { at: T.stove + 0.2, out: T.last - 0.1, time: '9:30 PM', text: 'dishes, *together*' },
]
const FACT = { text: 'Taurus is ruled by Venus.', at: T.fact, dur: 2.1, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 596, y: 760, where: 'peeking in around the left of the kitchen window frame' }

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

function spoon(x, cx, cy, t) {
  const a = t * 5
  x.save(); x.translate(cx + Math.cos(a) * 26, cy + Math.sin(a) * 8); x.rotate(-0.4)
  x.fillStyle = '#a8744a'; x.fillRect(-5, -110, 10, 110); x.fillRect(-12, -4, 24, 16)
  x.restore()
}
function heartSteam(x, t, cx, cy) {
  for (let i = 0; i < 4; i++) {
    const p = (t * 0.45 + i / 4) % 1
    drawBits(x, HEART, HEART_C, Math.round(cx + Math.sin(p * 6 + i) * 24), Math.round(cy - p * 220), 5, { alpha: Math.sin(Math.PI * p) * 0.85 })
  }
}
function plate(x, cx, cy) {
  x.fillStyle = '#f7efe0'; x.beginPath(); x.ellipse(cx, cy, 70, 18, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e9c46a'; x.beginPath(); x.ellipse(cx, cy - 6, 44, 12, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d9533a'; x.fillRect(cx - 10, cy - 14, 18, 8)
}
function magnifier(x, cx, cy) {
  x.strokeStyle = '#d7b46a'; x.lineWidth = 6; x.beginPath(); x.arc(cx, cy, 22, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(200,230,255,0.35)'; x.beginPath(); x.arc(cx, cy, 19, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6b3a22'; x.save(); x.translate(cx, cy); x.rotate(0.8); x.fillRect(20, -5, 40, 10); x.restore()
}
function recipeCard(x, cx, cy) {
  x.fillStyle = '#fff8e8'; x.fillRect(cx - 50, cy - 36, 100, 72)
  x.fillStyle = '#c8693e'; x.fillRect(cx - 40, cy - 26, 60, 6)
  x.fillStyle = '#b8ab8a'; for (let i = 0; i < 4; i++) x.fillRect(cx - 40, cy - 12 + i * 12, 80, 4)
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'How a Taurus | says *I love you.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Love you *slowly.* | On purpose.', { top: 290, size: 104, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: GOLD, wobble: true, fit: true })
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
      const ck = clockTrack(t, CLOCK)
      const atTable = t >= T.table && t < T.stove, end = t >= T.stove
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: t < T.table ? lerp(18.6, 19.2, t / T.table) : end ? 21.6 : 19.8 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      if (atTable && t > T.fact - 0.3) {                             // Venus, bright in the window
        const k = prog(t, T.fact - 0.3, T.fact + 0.3)
        x.save(); x.globalAlpha = k; drawPixelStar(x, 820, 640, 30 + 4 * Math.sin(t * 3), 1, '#fff6d8', '#ffffff'); x.restore()
      }
      const nC = t < T.candles[0] ? 0 : T.candles.filter(c => t >= c).length
      const g = drawTaurusHome(x, t, { room: 'kitchen', ep: 3, steam: 1, candles: nC, spin: false })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      if (!atTable) {
        // at the stove: Taurus stirring (frame 0), then Scorpio arrives; at the end Scorpio stirs
        heartSteam(x, t, 826, 880)
        if (!end) {
          const r = drawStarChar(x, 700, 1150, 300, t, { color: TA.color, glyph: TA.glyph, mood: t < T.bell ? 'happy' : 'sparkle', look: t < T.bell ? [1, -0.5] : [-1, 0], hops: [T.bell + 0.1, 5.6], seed: 14 })
          if (t < T.bell + 0.3) spoon(x, 826, 920, t)
          void r
          if (t > T.bell) {
            const sx = lerp(-150, 330, ease.outCubic(prog(t, T.bell + 0.2, T.bell + 0.8)))
            const s = drawStarChar(x, sx, 1170, 280, t, { color: SC.color, glyph: SC.glyph, mood: t < 7.5 ? 'squint' : 'happy', look: [1, -0.3], hops: [T.bell + 0.8, 5.6, 6.3], seed: 27 })
            if (t > 7.5 && t < T.table) { recipeCard(x, 340, 960); magnifier(x, s.x + 70, 950) }
          }
        } else {
          drawStarChar(x, 760, 1150, 280, t, { color: SC.color, glyph: SC.glyph, mood: 'happy', look: [1, -0.5], seed: 27, hops: [T.stove + 0.3] })
          spoon(x, 826, 920, t)
          drawStarChar(x, 480, 1170, 290, t, { color: TA.color, glyph: TA.glyph, mood: 'heart', look: [1, 0], seed: 14, hops: [T.stove + 0.5, T.last + 0.3] })
        }
      } else {
        // at the table: both seated behind it, plates, leaning in
        const lean = ease.inOutCubic(prog(t, T.lean, T.lean + 0.6))
        const sx = lerp(380, 450, lean), tx = lerp(700, 630, lean)
        drawStarChar(x, sx, 1250, 270, t, { color: SC.color, glyph: SC.glyph, mood: t > 18.9 ? 'heart' : t > 12.2 ? 'sparkle' : 'neutral', look: [1, 0], hops: [10.0, 10.8, 18.9], seed: 27 })
        drawStarChar(x, tx, 1250, 280, t, { color: TA.color, glyph: TA.glyph, mood: t > T.lean ? 'happy' : 'neutral', look: [-1, 0], hops: [12.0, 12.8, 16.6, 18.6], seed: 14 })
        x.fillStyle = '#a8744a'; x.fillRect(198, 1380, 684, 24); x.fillStyle = '#f7efe0'; x.fillRect(198, 1368, 684, 12)
        for (let i = 0; i < 3; i++) { const c = 470 + i * 70; x.fillStyle = '#f3e8cf'; x.fillRect(c - 9, 1312, 18, 60); const f = 1 + 0.15 * Math.sin(t * 17 + i * 2); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(c, 1296, 7 * f, 14 * f, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff1a8'; x.beginPath(); x.ellipse(c, 1300, 3, 7, 0, 0, Math.PI * 2); x.fill() }
        plate(x, 330, 1360); plate(x, 750, 1360)
        if (lean > 0.9) drawBits(x, HEART, HEART_C, 540, Math.round(1140 - 6 * Math.sin(t * 4)), 7)
      }
      x.restore()

      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'taurus' })
      for (const s of SAY) {
        const ta = s.who === 'ta'
        const px = atTable || (s.at > T.table && s.at < T.stove) ? (ta ? 660 : 420) : 330
        speechBubble(x, t, { ...s, x: px, y: atTable || s.at > T.table ? 1080 : 1000, name: ta ? '♉ TAURUS' : '♏ SCORPIO', color: ta ? TA.color : SC.color, side: ta ? 0.3 : -0.3 })
      }
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

const CARD_CUTS = [{ t: T.table, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E08' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...Array.from({ length: 8 }, (_, i) => ['tick', r3(0.2 + i * 0.62), 0.012]),
  ['pop', T.bell, 1396.91, 0.045, -0.4], ['bell', T.bell + 0.02, 1396.91, 0.035, 1.4, -0.4], ['pop', T.bell + 0.35, 1108.73, 0.04, -0.4], ['bell', T.bell + 0.37, 1108.73, 0.03, 1.6, -0.4],
  ['whoosh', T.bell + 0.2, 0.5, 0.03],
  ...SAY.flatMap(s => speechCues(s.at, { pitch: s.who === 'ta' ? 659.25 : 523.25 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.03 })),
  ...clockCues(7.5, 0.5, { gain: 0.02 }),
  ...T.candles.flatMap((c, i) => [['tick', r3(c), 0.05], ['pluck', r3(c + 0.02), [1108.73, 1396.91, 1661.22][i], 0.04, 0.7, (i - 1) * 0.3]]),
  ['tick', T.ghost + 0.05, 0.015],
  ['glitter', T.lean + 0.3, T.lean + 1.0], ['bell', T.lean + 0.6, 1661.22, 0.03, 1.6, 0],
  ...factChipCues(FACT.at, FACT),
  ['bell', 18.9, 2217.46, 0.03, 1.4, 0],
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [830.61, 932.33, 1108.73, 1244.51][i], 0.04, 0]), ['pluck', T.last + 0.2, 1108.73, 0.045, 0.8, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
