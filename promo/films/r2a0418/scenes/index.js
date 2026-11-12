// r2a0418: star_advice, ADVICE SOLO (sagittarius), "What Sagittarians need | to feel heard." (signs3kit social cut, music: lofi · C). Ending: callback.
// Nine Sagittarius truths about being heard, each with a warm reframe and one light gag.
//   0.0–3.6    "What Sagittarians need | *to feel heard.*"  One big Sagittarius pops in.
//   3.6–37.8   nine cards: the story scroll, part 7 of 12 · plans changed again, the map reroutes · blunt truth, no offence taken
//              · the 2am whiteboard pitch · room to roam, friends wave · "lol it's fine" → "actually, it's not"
//              · the kite, still connected · interrupted again? the floor is yours · back from a trip, slide 1 of 86
//  37.8        "Heard, not just | *listened to.*"
//  41.2        callback: "Part 12 of 12? | *We’re still here.*"  The story scroll, now enormous.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#c08bff'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }
const S = 'sagittarius'

/** a paper scroll unrolling downwards to length h, with lines of writing */
function scroll(x, cx, top, w, h, k) {
  if (k <= 0.01 || h <= 0) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, 0, w + 12, h + 6); x.fillStyle = CREAM; x.fillRect(-w / 2, 0, w, h)
  x.fillStyle = '#b9b0a0'; for (let y = 30; y < h - 16; y += 26) x.fillRect(-w / 2 + 22, y, (Math.sin(y) * 0.2 + 0.7) * (w - 44), 8)
  x.fillStyle = INK; x.fillRect(-w / 2 - 20, -22, w + 40, 34); x.fillStyle = WOOD; x.fillRect(-w / 2 - 14, -16, w + 28, 22)
  x.fillStyle = INK; x.fillRect(-w / 2 - 20, h - 4, w + 40, 34); x.fillStyle = WOOD; x.fillRect(-w / 2 - 14, h + 2, w + 28, 22)
  x.restore()
}
/** a folded map with a route that keeps re-drawing to new places */
function reroute(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-182, -152, 364, 304); x.fillStyle = '#ead7a8'; x.fillRect(-174, -144, 348, 288)
  const n = Math.min(4, 1 + Math.floor(lt / 0.5)), ENDS = [[120, -100], [-110, -90], [130, 90], [0, -120]]
  for (let i = 0; i < n; i++) {
    const [ex, ey] = ENDS[i]
    x.strokeStyle = i === n - 1 ? RED : 'rgba(138,74,46,0.35)'; x.lineWidth = 6; x.setLineDash([14, 12])
    x.beginPath(); x.moveTo(-130, 110); x.quadraticCurveTo(0, 40 * (i - 1.5), ex, ey); x.stroke(); x.setLineDash([])
  }
  const [ex, ey] = ENDS[n - 1]; x.fillStyle = RED; x.beginPath(); x.arc(ex, ey, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
/** a whiteboard with arrows and boxes */
function whiteboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 280); x.fillStyle = '#f7f7ff'; x.fillRect(-180, -140, 360, 260)
  x.fillStyle = INK; x.fillRect(-120, 130, 12, 90); x.fillRect(108, 130, 12, 90)
  x.strokeStyle = '#5a6bff'; x.lineWidth = 6; x.strokeRect(-150, -110, 110, 60)
  if (lt > 0.6) { x.strokeStyle = RED; x.strokeRect(40, -110, 110, 60); x.beginPath(); x.moveTo(-40, -80); x.lineTo(40, -80); x.stroke() }
  if (lt > 1.0) { x.strokeStyle = '#2f9a4a'; x.strokeRect(-55, 10, 110, 60); x.beginPath(); x.moveTo(95, -50); x.lineTo(30, 10); x.moveTo(-95, -50); x.lineTo(-30, 10); x.stroke() }
  if (lt > 1.4) { x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('!!!', 0, 40) }
  x.restore()
}
/** a kite on a string, string held at (hx, hy) */
function kite(x, t, cx, cy, hx, hy, k) {
  if (k <= 0.01) return
  const kx = cx + Math.sin(t * 1.6) * 30, ky = cy + Math.sin(t * 2.1) * 16
  x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo((hx + kx) / 2 + 40, (hy + ky) / 2 + 60, kx, ky + 70 * k); x.stroke()
  x.translate(kx, ky); x.scale(k, k); x.rotate(0.1 * Math.sin(t * 2))
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -100); x.lineTo(76, 0); x.lineTo(0, 100); x.lineTo(-76, 0); x.fill()
  x.fillStyle = ACC; x.beginPath(); x.moveTo(0, -88); x.lineTo(64, 0); x.lineTo(0, 0); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, 0); x.lineTo(-64, 0); x.lineTo(0, 88); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(0, -88); x.lineTo(-64, 0); x.lineTo(0, 0); x.fill(); x.fillStyle = MINT; x.beginPath(); x.moveTo(0, 0); x.lineTo(64, 0); x.lineTo(0, 88); x.fill()
  x.restore()
}
/** a projector screen showing a slide counter */
function slides(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -170, 360, 250); x.fillStyle = '#f7f7ff'; x.fillRect(-170, -160, 340, 230)
  x.fillStyle = '#8fd4ff'; x.fillRect(-140, -130, 280, 150); x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-140, 20); x.lineTo(-60, -60); x.lineTo(10, 10); x.lineTo(70, -40); x.lineTo(140, 20); x.fill()
  x.fillStyle = '#ffe76a'; x.beginPath(); x.arc(90, -90, 22, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-6, 80, 12, 90)
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`SLIDE ${n} OF 86`, 0, 48)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Stories run long? | *Tell the whole thing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scroll(x, 790, 560, 220, lerp(60, 520, ease.outCubic(prog(lt, 0.3, 1.8))), pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 640, 'PART 7 OF 12', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.05, 34)
      bubble(x, 470, 620, 'and THEN…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Changed plans again? | *We’re still coming.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      reroute(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1110, 'ROUTE UPDATED (4)', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Blunt truth slipped out? | *Honest is welcome.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'that hat is… | a lot', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: ORANGE, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 830, 980, 170 * k, { mood: lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.5] })
      L(x, 760, 860, 'NO OFFENCE TAKEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Big idea at 2am? | *Pitch it to us.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      whiteboard(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 800, 1100, 'WE’RE LISTENING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Need room to roam? | *Go. We’ll wave.*', mood: 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const IDS = ['taurus', 'cancer', 'virgo']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2); if (k > 0.01) signChar(x, t, id, 650 + i * 120, 1030, 120 * k, { mood: 'heart', look: [-1, 0], seed: 50 + i, glyph: false, squash: 0.04 * Math.sin(t * 9 + i) }) })
      L(x, 790, 720, 'SEE YOU SOON!', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 40)
      hearts(x, t, 760, 940, P.t0 + 1.4, { n: 5, life: 1.5, spread: 260, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Joking through it? | *You can say it straight.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'lol it’s fine', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.1 ? 1 : 0), { size: 40, tail: 'bl' })
      bubble(x, 790, 650, 'actually… | it’s not', pop01(t, P.t0 + 1.1 * 1.29, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 960, 'WE’RE RIGHT HERE', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Need your freedom? | *Love can fly too.*', mood: 'heart', look: [1, -1], star: { x: -200, y: 40, s: 260 },
    front(x, t, lt, P, F) {
      kite(x, t, 760, 700, F.x + 90, F.cy, pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 760, 1110, 'STILL CONNECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Interrupted again? | *The floor is yours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 830, 960, 160 * k, { mood: lt > 1.1 ? 'happy' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      bubble(x, 830, 760, 'sorry, go on', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      L(x, 790, 1130, 'FLOOR: YOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, -0.04, 36)
    } },
  { sign: S, cap: 'Back from a trip? | *Tell us everything.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slides(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(clamp((lt - 0.5) / 1.5) * 5))
      bubble(x, 800, 1100, 'next slide!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0418', key: 'C', accent: ACC, solo: 'sagittarius', ending: 'callback',
  title: 'What Sagittarians | need *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Heard, not just | *listened to.*', mood: 'heart' },
  last: {
    text: 'Part 12 of 12? | *We’re still here.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 360, 1100, 260 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      scroll(x, 720, 820, 220, lerp(80, 520, ease.outCubic(prog(lt, 0.4, 1.8))), pop01(t, t0 + 0.3, 0.4, 2))
      if (lt > 1.6) hearts(x, t, 560, 1060, t0 + 1.6, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
