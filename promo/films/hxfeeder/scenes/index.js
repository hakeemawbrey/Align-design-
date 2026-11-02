// hxfeeder (20 s vertical Align ad, Star Talk "HOT TAKES", Houston edition) · story 0–15.6, then the shared end card.
//   🔥 "The feeder road is a *love* language."  Heat 3.
//   0.00   frame 0 = the thumbnail: the hot-take stamp + the take; the Houston star (HOU badge) at the wheel of a little
//          orange car, cruising the feeder road under a jammed elevated freeway, Aries (the date) in the passenger seat.
//   2.45   OBJECTION! ♈ Aries: "it’s just a *road!*"
//   ~4.9   HOUSTON: "it’s *your* road. I know | every U-turn to your place." The GPS bubble flips RECALCULATING…
//          → a dotted U-turn arrow loops under the overpass; the car takes it.
//   ~7.9   ARIES (heart eyes, gasp zoom): "you *memorized* my shortcuts?"
//   ~9.9   THE STARS RULE: "Knowing their shortcuts | means you’ve been *paying attention*."
//   ~13    AGREE / DISAGREE?  "Know their *shortcuts*."  The end rhymes with frame 0: same car, same feeder, but Aries
//          now holds the little route notebook ("YOUR ROUTES ♡") and the GPS bubble has given up: "OK. YOU KNOW BEST."
//   Rewatch bait: up on the freeway the jam never moves, and ♓ Pisces is crying in the stuck car up there the whole time.
// Affectionate feeder-road love only. No card transition (a 20 s film; the gavel slam is the big beat). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 20
const KEY = 'E'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff4a4a', SIGN_G = '#1f7a4a', ARC = '#ff6b5c'
const ARI = signStar('aries'), PIS = signStar('pisces')

const T = { take: 0, takeOut: [2.6, 2.75], heat: 0.3, obj: 2.45, open: 2.6, l1: 2.72 }
const HO = 'HOUSTON STAR', AR = '♈ ARIES'
const LINES = [
  { t: T.l1, speaker: AR, text: 'it’s just a *road!*', color: ARC },
  { t: 0, speaker: HO, text: 'it’s *your* road. I know every U-turn to your place.', color: '#ffb08a' },
  { t: 0, speaker: AR, text: 'you *memorized* my shortcuts?', color: ARC },
]
const CPS = 30
const TAKE = 'The feeder road is a *love* language.'
const VERDICT = 'Knowing their shortcuts | means you’ve been *paying attention*.'
const LAST = 'Know their *shortcuts*.'

const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5 + (LINES[i].gap || 0))
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.4)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 1.7), r3(VEND + 1.7 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.pillDur = 0.6
T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.recalc = r3(LINES[1].t + 0.1)                       // the GPS gives up on its own route
T.uturn = r3(LINES[1].t + 0.5)                        // the dotted U-turn arrow draws, the car takes it
T.heart = r3(LINES[2].t)                              // Aries: heart eyes + gasp zoom
T.end = r3(T.pill + 0.2)                              // the rhyme: notebook in hand, GPS defeated

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const CAR0 = { x: 470, y: 1390 }
const DECK_Y = 760
const CAR_COLS = ['#5fb0ff', '#ffcf5c', '#9ee6a8', '#ff8fb1', '#c9b8ff', '#ffa86b', '#e6e6ee']

const HO_HOPS = [0.25, ...talkHops(LINES, HO, { cps: CPS }), T.last + 0.1]
const AR_HOPS = [T.obj + 0.1, ...talkHops(LINES, AR, { cps: CPS }), T.last + 0.2]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#0b0816' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ff9a6b' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 260, size: 116, accentSize: 176, at: T.last, gap: 0.08, accentColor: '#ff9a6b', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function car(cx, cy, col, w = 150, { brake = 1 } = {}) {
    const h = 64
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, cy - h / 2 - 30, w + 12, h + 36)
    x.fillStyle = col; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    x.fillRect(cx - w / 2 + 22, cy - h / 2 - 24, w - 44, 26)
    x.fillStyle = 'rgba(180,220,255,0.55)'; x.fillRect(cx - w / 2 + 30, cy - h / 2 - 18, w - 60, 16)
    x.fillStyle = INK; x.fillRect(cx - w / 2 + 14, cy + h / 2 - 6, 30, 18); x.fillRect(cx + w / 2 - 44, cy + h / 2 - 6, 30, 18)
    x.fillStyle = brake > 0.5 ? RED : '#7a2a2a'; x.fillRect(cx - w / 2 + 6, cy - 10, 18, 12); x.fillRect(cx + w / 2 - 24, cy - 10, 18, 12)
    if (brake > 0.5) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (const lx of [cx - w / 2 + 15, cx + w / 2 - 15]) { const g = x.createRadialGradient(lx, cy - 4, 0, lx, cy - 4, 40); g.addColorStop(0, 'rgba(255,60,60,0.4)'); g.addColorStop(1, 'rgba(255,60,60,0)'); x.fillStyle = g; x.fillRect(lx - 40, cy - 44, 80, 80) }
      x.restore()
    }
  }
  /** pixel tears: two little streams falling from a star's eyes */
  function tears(cx, cy, size, t) {
    x.fillStyle = '#8fd6ff'
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.6 + i / 3 + (side > 0 ? 0.17 : 0)) % 1)
      const tx = cx + side * size * 0.17 + side * ph * size * 0.08, ty = cy + size * 0.02 + ph * size * 0.5
      x.globalAlpha = 1 - ph; x.fillRect(Math.round(tx) - 3, Math.round(ty), 6, 8)
    }
    x.globalAlpha = 1
  }
  /** the set: the elevated freeway (forever jammed) above, the feeder road below (flowing), a U-TURN sign */
  function set(t) {
    // ground + feeder
    x.fillStyle = '#26222e'; x.fillRect(0, 1010, 1080, 910)
    x.fillStyle = '#3a3444'; x.fillRect(0, 1010, 1080, 8)
    x.fillStyle = 'rgba(255,230,140,0.7)'
    const flow = (t * 260) % 160
    for (let i = -1; i < 9; i++) x.fillRect(i * 160 + flow, 1480, 70, 7)
    x.fillStyle = '#4a4458'; x.fillRect(0, 1530, 1080, 12)          // the curb
    // pillars + deck
    x.fillStyle = '#3c3650'; for (const px of [150, 540, 930]) x.fillRect(px - 26, DECK_Y + 70, 52, 1010 - DECK_Y - 70)
    x.fillStyle = INK; for (const px of [150, 540, 930]) x.fillRect(px - 30, DECK_Y + 70, 4, 1010 - DECK_Y - 70)
    x.fillStyle = INK; x.fillRect(0, DECK_Y - 6, 1080, 88)
    x.fillStyle = '#5a5470'; x.fillRect(0, DECK_Y, 1080, 70)
    x.fillStyle = '#6e6888'; x.fillRect(0, DECK_Y, 1080, 10)
    // the jam on the deck: tiny cars, brake lights, not moving one pixel (the rewatch bait)
    for (let i = 0; i < 8; i++) {
      const cx = 70 + i * 135
      x.save(); x.translate(cx, DECK_Y - 22); x.scale(0.55, 0.55); car(0, 0, CAR_COLS[(i * 3 + 1) % CAR_COLS.length], 150, { brake: 1 }); x.restore()
    }
    // Pisces, stuck up there in the jam, crying (the recurring gag)
    const pis = drawStarChar(x, 880, DECK_Y - 74, 96, t, { ...PIS, glyph: null, mood: 'squint', look: [0, 1], seed: 21, glow: 0.6, bob: 1 })
    tears(pis.x, pis.y, 96, t)
    // the U-TURN sign on its pole
    x.fillStyle = INK; x.fillRect(118, 1060, 12, 300)
    x.fillStyle = INK; x.fillRect(40, 1040, 170, 120); x.fillStyle = SIGN_G; x.fillRect(46, 1046, 158, 108)
    x.strokeStyle = BONE; x.lineWidth = 3; x.strokeRect(54, 1054, 142, 92)
    x.font = `700 30px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText('U-TURN', 125, 1078)
    x.strokeStyle = BONE; x.lineWidth = 7; x.beginPath(); x.moveTo(100, 1135); x.lineTo(100, 1112); x.arc(125, 1112, 25, Math.PI, 0); x.lineTo(150, 1128); x.stroke()
    x.fillStyle = BONE; x.beginPath(); x.moveTo(138, 1124); x.lineTo(162, 1124); x.lineTo(150, 1140); x.fill()
    // a little sign on the deck face
    x.fillStyle = INK; x.fillRect(318, DECK_Y + 16, 204, 44); x.fillStyle = SIGN_G; x.fillRect(322, DECK_Y + 20, 196, 36)
    x.font = `700 24px 'Space Mono', monospace`; x.fillStyle = BONE; x.fillText('FEEDER RD', 420, DECK_Y + 39)
  }
  /** the GPS bubble: on-route → RECALCULATING… → (the rhyme) OK. YOU KNOW BEST. */
  function gps(t, gx0, gy0, k) {
    if (k <= 0) return
    const st = t >= T.end ? 2 : t >= T.recalc ? 1 : 0
    const txt = ['GPS: STAY ON FREEWAY', 'RECALCULATING…', 'OK. YOU KNOW BEST.'][st]
    const at = [0, T.recalc, T.end][st]
    x.save(); x.globalAlpha = k
    x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(txt).width + 36, bump = st ? 1 + 0.15 * Math.max(0, 1 - (t - at) / 0.25) : 1
    x.translate(gx0, gy0); x.scale(bump, bump)
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -26, w + 8, 52)
    x.fillStyle = '#1d3a5a'; x.fillRect(-w / 2, -22, w, 44)
    x.fillStyle = st === 1 ? '#ffcf5c' : st === 2 ? '#9ee6a8' : '#9fe0ff'
    if (st === 1 && Math.floor(t * 4) % 2) x.globalAlpha *= 0.6
    x.fillText(txt, 0, 1)
    x.restore()
  }
  /** the dotted U-turn arrow on the road */
  function uturnArrow(t) {
    const p = prog(t, T.uturn, T.uturn + 0.9), fade = 1 - prog(t, LINES[2].t - 0.2, LINES[2].t + 0.2)
    if (p <= 0 || fade <= 0) return
    x.save(); x.globalAlpha = fade
    // the path: right along the feeder, loop under the deck, back
    const path = u => {
      if (u < 0.4) return [lerp(640, 900, u / 0.4), 1300]
      if (u < 0.75) { const a = -Math.PI / 2 + Math.PI * ((u - 0.4) / 0.35); return [900 + Math.cos(a) * 110, 1190 + Math.sin(a) * -110 * -1] }
      return [lerp(900, 640, (u - 0.75) / 0.25), 1080]
    }
    x.fillStyle = '#ffd23f'
    const n = Math.floor(28 * p)
    for (let i = 0; i < n; i++) { const [px, py] = path(i / 28); x.fillRect(Math.round(px) - 6, Math.round(py) - 6, 12, 12) }
    if (n > 0) { const [px, py] = path(Math.min(1, n / 28)); x.fillStyle = INK; x.fillRect(px - 14, py - 14, 28, 28); x.fillStyle = '#ffd23f'; x.fillRect(px - 10, py - 10, 20, 20) }
    x.restore()
  }
  /** the route notebook Aries holds at the end */
  function notebook(nx, ny, k) {
    if (k <= 0) return
    x.save(); x.translate(nx, ny); x.rotate(-0.12); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-92, -64, 184, 128)
    x.fillStyle = '#fff1c8'; x.fillRect(-86, -58, 172, 116)
    x.fillStyle = ARC; x.fillRect(-86, -58, 14, 116)
    x.font = `700 22px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('YOUR', 8, -30); x.fillText('ROUTES ♡', 8, -4)
    x.strokeStyle = '#ff5d73'; x.lineWidth = 4; x.beginPath(); x.moveTo(-50, 30); x.lineTo(20, 30); x.arc(20, 18, 12, Math.PI / 2, -Math.PI / 2, true); x.lineTo(-20, 6); x.stroke()
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.heart, dur: 1.4, x: CAR0.x + 60, y: CAR0.y - 150, amount: 0.22, follow: 0.5 })
      x.save(); z.apply(x)
      set(t)
      uturnArrow(t)
      // the car: a small sway as it drives; the U-turn = it slides right, ducks out of shot, slides back in
      const uP = prog(t, T.uturn + 0.3, T.uturn + 1.5)
      const uX = uP <= 0 || uP >= 1 ? 0 : Math.sin(Math.PI * uP) * 620
      const sway = Math.sin(t * 5) * 3
      const cx = CAR0.x + uX, cy = CAR0.y + sway
      const flip = uP > 0.5 && uP < 1 ? -1 : 1
      const hMood = t < T.obj ? { mood: 'happy', look: [1, 0] } : t < LINES[1].t ? { mood: 'squint', look: [1, 0] } : t < T.verdict ? { mood: 'happy', look: [1, 0] } : { mood: 'wink', look: [1, 0] }
      const aMood = t < T.obj ? { mood: 'neutral', look: [-1, 0] } : t < LINES[1].t ? { mood: 'wide', look: [-1, 0], blink: false } : t < T.heart ? { mood: 'squint', look: [-1, 0] } : { mood: 'heart', look: [-1, 0] }
      x.save(); x.translate(cx, 0); x.scale(flip, 1); x.translate(-cx, 0)
      const rH = cityStar(x, cx - 72, cy - 165, 240, t, { city: 'HOU', ...hMood, pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      const rA = drawStarChar(x, cx + 86, cy - 150, 210, t, { ...ARI, ...aMood, pop: pop01(t, -1) * ok, seed: 11, hops: AR_HOPS, glow: 0.9 })
      x.save(); x.globalAlpha = ok; x.translate(cx, cy); x.scale(1.6, 1.6); car(0, 0, '#5fb0ff', 200, { brake: 0 }); x.restore()
      x.restore()
      notebook(rA.x + 40, rA.y + 30, pop01(t, T.end, 0.4, 2.4) * ok)
      gps(t, CAR0.x + 10, Math.min(rH.top, rA.top) - 40, ok * (uP > 0 && uP < 1 ? 0 : 1))
      x.restore()
      objection(x, t, { at: T.obj, x: 760, y: 930 })
      // the meter's own "n/5" score line is clipped off: no numbers on screen
      x.save(); x.beginPath(); x.rect(0, 0, 1080, 124); x.clip(); heatMeter(x, t, { level: 3, at: T.heat }); x.restore()
      agreePill(x, t, { at: T.pill, dur: T.pillDur })
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// no card-motif cut (a 20 s film may have zero): the verdict's gavel slam is the big transition
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

// ── sound
const NOTE = [659.25, 739.99, 830.61, 880, 987.77, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 830.61, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [AR]: 1046.5 } }),
  ['pop', T.recalc, 1244.51, 0.04, -0.3], ['pop', T.recalc + 0.18, 1108.73, 0.035, -0.3],
  ...wordPops(T.uturn, 6, 0.15, 0, 0.022),
  ['whoosh', T.uturn + 0.3, 0.6, 0.035], ['whoosh', T.uturn + 1.0, 0.5, 0.03],
  ['whoosh', T.heart - 0.05, 0.3, 0.03], ['bell', T.heart + 0.1, 1318.51, 0.04],
  ['pop', T.close, 987.77, 0.03, 0],
  ['pop', T.end, 1318.51, 0.035, 0.3], ['pop', T.end + 0.1, 1479.98, 0.03, 0.3],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1318.51, 0.05, 0], ['pluck', T.lastLand, 987.77, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void drawPixelStar; void GOLD
export { T }
