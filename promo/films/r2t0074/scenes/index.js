// r2t0074: star_talk, ROLLCALL, "The signs | flying a kite." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each one's most extreme version of themselves flying a kite.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ ran so fast the kite gave up · ♉ brought a picnic, forgot the kite · ♊ two kites, tangled both
//              · ♋ named the kite, won't let go · ♌ their face on the kite · ♍ wind report, laminated
//              · ♎ picked a colour for an hour · ♏ flies it at midnight · ♐ let go, followed it out of town
//              · ♑ highest kite, not close · ♒ built one that flies itself · ♓ kite flew away, waved, sobbing
//  49.2        GROUP ENDING: "Twelve kites. | *One tree.*"  A tree above the group photo, full of kites.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { signStar } from '../../startalk.js'

const RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#5fd068', DG = '#2f9a4a', BROWN = '#8a4a2e'
const BASKET = ['..KKKKKKK..', '.K.......K.', 'BBBBBBBBBBB', 'BRBRBRBRBRB', 'BBBBBBBBBBB', 'BRBRBRBRBRB', 'BBBBBBBBBBB']
const MOON = ['..WWW.', '.WWW..', 'WWW...', 'WWW...', 'WWW...', '.WWW..', '..WWW.']

/** a diamond kite at (cx, cy) with a wavy tail, held by a string from (hx, hy) */
function kite(x, t, cx, cy, s, col, { hx = null, hy = null, rot = 0, tail = true, face = null, seed = 0 } = {}) {
  if (s <= 0.01) return
  if (hx !== null) { x.save(); x.strokeStyle = 'rgba(239,230,214,0.8)'; x.lineWidth = 3; x.beginPath(); x.moveTo(hx, hy); x.quadraticCurveTo((hx + cx) / 2, Math.max(hy, cy) + 60, cx, cy + 60 * s); x.stroke(); x.restore() }
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.08 * Math.sin(t * 3 + seed)); x.scale(s, s)
  if (tail) { x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 90); for (let i = 1; i <= 8; i++) x.lineTo(Math.sin(t * 6 + i + seed) * 16, 90 + i * 18); x.stroke()
    for (let i = 2; i <= 8; i += 3) { x.fillStyle = i % 2 ? PINK : GOLD; x.fillRect(Math.sin(t * 6 + i + seed) * 16 - 8, 90 + i * 18 - 6, 16, 12) } }
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -100); x.lineTo(76, -10); x.lineTo(0, 100); x.lineTo(-76, -10); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(0, -88); x.lineTo(64, -10); x.lineTo(0, 88); x.lineTo(-64, -10); x.closePath(); x.fill()
  x.strokeStyle = 'rgba(27,18,54,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -88); x.lineTo(0, 88); x.moveTo(-64, -10); x.lineTo(64, -10); x.stroke()
  x.restore()
  if (face) signChar(x, t, face, cx, cy - 6 * s, 90 * s, { mood: 'wink', seed: 77, glyph: false, glow: 0.4 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran so fast | the kite *gave up.*', mood: 'squint', look: [1, 0], star: { x: 120 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      kite(x, t, 280, 1090, 0.9 * k, RED, { hx: 600, hy: 900, rot: 1.4, tail: false })
      for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(820 + i * 30, 840 + i * 20, 60, 6) }
    },
    front(x, t, lt, P) { label(x, 300, 640, 'DRAGGED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 }) } },
  { sign: 'taurus', cap: 'Brought a picnic. | *Forgot the kite.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BASKET, { K: BROWN, B: '#c98f2a', R: RED }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'KITE: ? ', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'worth it.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Two kites at once. | *Tangled both.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tg = ease.inOutCubic(prog(lt, 0.8, 1.4))
      kite(x, t, lerp(650, 760, tg), 650, 0.75 * k, GOLD, { hx: F.x + 60, hy: F.cy, rot: lerp(-0.3, 0.6, tg), seed: 1 })
      kite(x, t, lerp(900, 820, tg), 700, 0.75 * k, SKYB, { hx: F.x + 60, hy: F.cy, rot: lerp(0.3, -0.7, tg), seed: 2 })
      label(x, 800, 1100, 'KNOT FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Named the kite. | Won’t *let it go.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P, F) {
      kite(x, t, 800, 690, 0.8 * pop01(t, P.t0 + 0.2, 0.3, 2), SKYB, { hx: F.x + 60, hy: F.cy })
      label(x, 800, 960, 'THIS IS SKYLER', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'STRING: 2 FT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'The kite? | Their *face on it.*', mood: 'sparkle', look: [1, -1], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P, F) {
      kite(x, t, 800, 720, 1.2 * pop01(t, P.t0 + 0.3, 0.35, 2), '#ffb34a', { hx: F.x + 60, hy: F.cy, face: 'leo', seed: 3 })
      sparkles(x, t, 800, 720, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Checked the wind. | *Laminated it.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(800, 840); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = 'rgba(143,227,255,0.35)'; x.fillRect(-176, -206, 352, 412)
      x.fillStyle = INK; x.fillRect(-160, -190, 320, 380); x.fillStyle = CREAM; x.fillRect(-154, -184, 308, 368)
      x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillText('WIND REPORT', 0, -140)
      const rows = ['N: 4 mph', 'gusts: mild', 'tail: 1.2 m', 'go?: YES']
      x.font = `800 30px ${INTER}`; rows.forEach((r, i) => { x.fillStyle = INK; x.fillText(r, 0, -70 + i * 62); x.fillStyle = '#2fc79a'; x.fillRect(-140, -86 + i * 62, 20, 20) })
      x.restore()
      x.save(); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 6); x.fillStyle = '#fff'; x.fillRect(900, 680, 18, 60); x.restore()
    } },
  { sign: 'libra', cap: 'Picked a colour | *for an hour.*', mood: lt => lt > 1.5 ? 'wide' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const cols = [PINK, GOLD, SKYB, MINT, LAV, RED], k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const pick = Math.floor(t * 3) % cols.length
      kite(x, t, 800, 760, 0.9 * k, cols[pick], { tail: true, seed: 4 })
      label(x, 800, 1100, 'SUNSET NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Only flies it | *at midnight.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, -1], star: { x: -180 },
    back(x, t, lt, P) {
      x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(110, 480, 860, 740)
      drawBits(x, MOON, { W: BONE }, 880, 600, 14 * pop01(t, P.t0 + 0.1, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      kite(x, t, 760, 720, 0.85 * pop01(t, P.t0 + 0.3, 0.3, 2), '#2a2350', { hx: F.x + 60, hy: F.cy, seed: 5 })
      label(x, 800, 1100, 'BLACK KITE. OBVIOUSLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Let go. | *Followed it.*', mood: 'sparkle', look: [1, -1], star: { x: -160 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      kite(x, t, lerp(700, 900, clamp(lt / 2.4)), lerp(800, 600, clamp(lt / 2.4)), 0.7 * pop01(t, P.t0 + 0.2, 0.3, 2), '#c97bff', { seed: 6 })
      label(x, 760, 1100, 'NEXT TOWN →', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Highest kite. | *Not even close.*', mood: 'sparkle', look: [1, -1], star: { x: -180, y: 60 },
    front(x, t, lt, P, F) {
      const up = ease.outCubic(prog(lt, 0.2, 1.4))
      kite(x, t, 860, lerp(1000, 560, up), 0.45 * pop01(t, P.t0 + 0.1, 0.3, 2), '#9aa5c4', { hx: F.x + 60, hy: F.cy, tail: false })
      kite(x, t, 560, 1000, 0.3, PINK, { tail: false }); kite(x, t, 700, 1060, 0.3, GOLD, { tail: false })
      label(x, 760, 1150, 'ALTITUDE: WINNING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Built a kite | that *flies itself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      kite(x, t, 800, 760 + Math.sin(t * 2) * 20, 0.85 * k, '#6fc3ff', { seed: 7 })
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(796, 650, 8, 50); x.fillStyle = Math.sin(t * 10) > 0 ? '#ff4f86' : MINT; x.fillRect(790, 638, 20, 20) }
      label(x, 800, 1100, 'AUTOPILOT: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Kite flew away. | *Waved. Sobbing.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const away = ease.inCubic(prog(lt, 0.3, 2.2))
      kite(x, t, lerp(760, 920, away), lerp(820, 540, away), 0.8 * (1 - 0.7 * away) * pop01(t, P.t0 + 0.1, 0.3, 2), LAV, { seed: 8 })
      bubble(x, 760, 1080, 'bye!! be safe!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0074', key: 'D', accent: SKYB, ending: 'group',
  title: 'The signs | *flying a kite.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve kites. | *One tree.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 1.8); if (k <= 0.01) return
      x.save(); x.translate(540, 700); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-26, 40, 52, 140); x.fillStyle = BROWN; x.fillRect(-20, 40, 40, 140)
      for (const [dx, dy, r] of [[0, -40, 150], [-140, 10, 100], [140, 10, 100]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 6, 0, Math.PI * 2); x.fill() }
      for (const [dx, dy, r] of [[0, -40, 150], [-140, 10, 100], [140, 10, 100]]) { x.fillStyle = DG; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
      x.restore()
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2, kk = pop01(t, t - lt + 1.8 + i * 0.08, 0.3, 2)
        kite(x, t, 540 + Math.cos(a) * 170 * k, 670 + Math.sin(a) * 100 * k, 0.32 * kk, signStar(['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'][i]).color, { tail: false, rot: a, seed: i })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
