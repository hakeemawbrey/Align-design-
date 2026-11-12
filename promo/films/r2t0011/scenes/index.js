// r2t0011: THE SIGNS AS… v3 SOLO, "Scorpios when they're mad | be like." (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: group (the group beat is the punchline).
//   0.0–3.6    "Scorpios when mad | *be like.*"
//   3.6–37.8   nine "not mad" Scorpio moments: the plants wilt · replied with just a period · forgave, kept the receipts
//              drawer (2019) · renamed your contact "Don't." · silent treatment, day forty (tally wall) · smiling
//              sweetly (worse) · "do what you want" was a test · cleaned the whole house, furious · checked your chart (Mars)
//  37.8        "Not mad. | Just *taking notes.*"  The big Scorpio is back .
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', PURPLE = '#c97bff'

// ── props
const POT = ['TTTTTTTTT', '.TTTTTTT.', '.TTTTTTT.', '..TTTTT..']
function plant(x, cx, base, k, wilt, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, base); x.scale(k, k)
  const green = wilt < 0.5 ? '#5fd068' : '#9b9a52'
  x.strokeStyle = INK; x.lineWidth = 16; x.lineCap = 'round'
  const stem = (sx) => { x.beginPath(); x.moveTo(sx, 0); const ang = lerp(0, 1.25, wilt) * Math.sign(sx || 1); x.quadraticCurveTo(sx, -120, sx + Math.sin(ang) * 140, -Math.cos(ang) * 230); x.stroke() }
  for (const sx of [-30, 0, 30]) stem(sx)
  x.strokeStyle = green; x.lineWidth = 9
  for (const sx of [-30, 0, 30]) stem(sx)
  // leaves at the stem tips
  for (const sx of [-30, 0, 30]) {
    const ang = lerp(0, 1.25, wilt) * Math.sign(sx || 1)
    const lx = sx + Math.sin(ang) * 140, ly = -Math.cos(ang) * 230
    x.fillStyle = INK; x.beginPath(); x.ellipse(lx, ly, 40, 22, ang + 0.6, 0, Math.PI * 2); x.fill()
    x.fillStyle = green; x.beginPath(); x.ellipse(lx, ly, 33, 16, ang + 0.6, 0, Math.PI * 2); x.fill()
  }
  x.restore()
  drawBits(x, POT, { T: '#c96a3a' }, cx, base + 40 * k, 22 * k)
}
function phone(x, cx, cy, k, rot, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 260, 400)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#140c30'; x.fillRect(-108, -160, 216, 320)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 168, 60, 10)
  draw(x)
  x.restore()
}
function cabinet(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#7d86a8'; x.fillRect(-120, -190, 240, 380)
  for (let i = 0; i < 3; i++) {
    const y = -175 + i * 125, dx = i === 1 ? open * 120 : 0
    x.fillStyle = INK; x.fillRect(-110 + dx, y - 6, 220, 118)
    x.fillStyle = '#9aa5c4'; x.fillRect(-104 + dx, y, 208, 106)
    x.fillStyle = INK; x.fillRect(-30 + dx, y + 46, 60, 14)
    if (i === 1 && open > 0.1) {
      // folders sticking up out of the open drawer
      for (let j = 0; j < 4; j++) { x.fillStyle = INK; x.fillRect(-100 + dx + j * 50, y - 46, 44, 52); x.fillStyle = ['#ffd23a', '#ff8fb1', '#8fe3ff', '#7dffb0'][j]; x.fillRect(-96 + dx + j * 50, y - 42, 36, 44) }
    }
  }
  x.restore()
}
function tally(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 380)
  x.fillStyle = '#e8dcc6'; x.fillRect(-160, -180, 320, 360)
  x.fillStyle = INK
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5), r = i % 5, gx = -140 + (g % 4) * 76, gy = -150 + Math.floor(g / 4) * 82
    if (r < 4) x.fillRect(gx + r * 14, gy, 7, 58)
    else { x.save(); x.translate(gx + 24, gy + 29); x.rotate(-0.9); x.fillRect(-42, -4, 84, 8); x.restore() }
  }
  x.restore()
}
const SPONGE = ['YYYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'GGGGGGGGGG', 'GGGGGGGGGG']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.2)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.restore()
  x.fillStyle = RED; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♂︎', 0, 4)
  x.restore()
}
function ring(x, cx, cy, r, k) {   // a red marker circle drawn around something
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
  x.beginPath(); x.ellipse(cx, cy, r * 1.15, r * 0.95, -0.2, 0, Math.PI * 2 * k); x.stroke(); x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: '“I’m not mad.” | The plants *wilted.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      plant(x, 790, 1060, 1.1 * pop01(t, P.t0 + 0.15, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.5)), t)
      bubble(x, 420, 620, 'not mad.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Replied with a period. | *Just the period.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.25 * pop01(t, P.t0 + 0.15, 0.3, 2), 0.05, x => {
        x.fillStyle = BONE; x.fillRect(-96, -140, 150, 44); x.fillStyle = INK; x.font = `700 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('u ok??', -86, -118)
        const p = pop01(t, P.t0 + 0.9, 0.25, 2.4)
        if (p > 0.01) { x.save(); x.translate(60, 20); x.scale(p, p); x.fillStyle = PURPLE; x.fillRect(-50, -50, 100, 100); x.fillStyle = INK; x.fillRect(-14, 4, 28, 28); x.restore() }
      })
      label(x, 790, 1130, 'SENT.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: PURPLE, color: BONE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgave you. | *Kept the receipts.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cabinet(x, 760, 880, pop01(t, P.t0 + 0.15, 0.3, 2), ease.outBack ? ease.outCubic(prog(lt, 0.5, 0.9)) : prog(lt, 0.5, 0.9))
      label(x, 800, 620, 'FILED: 2019', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Renamed your contact. | *“Don’t.”*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, 1.25 * pop01(t, P.t0 + 0.15, 0.3, 2), -0.05, x => {
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INCOMING CALL', 0, -120)
        const ring2 = 1 + 0.06 * Math.sin(t * 14)
        x.save(); x.scale(ring2, ring2); x.fillStyle = PURPLE; x.beginPath(); x.arc(0, -30, 54, 0, Math.PI * 2); x.fill(); x.restore()
        x.fillStyle = BONE; x.font = `800 56px ${INTER}`; x.fillText('Don’t.', 0, 70)
      })
    } },
  { sign: S, cap: 'Silent treatment. | *Day forty.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      tally(x, 780, 860, pop01(t, P.t0 + 0.15, 0.3, 2), Math.min(40, Math.floor(Math.max(0, lt - 0.3) * 28)))
      bubble(x, 370, 600, '…', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 60, tail: 'bc' })
    } },
  { sign: S, cap: 'Smiling sweetly? | Oh, *it’s worse.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 760, 760, 'SMILE LEVEL:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, font: MONO, weight: 700 })
      label(x, 780, 880, 'DANGER', pop01(t, P.t0 + 0.9, 0.3, 2.6), { size: 64, bg: RED, color: BONE, rot: 0.05 })
      sparkles(x, t, 400, 820, P.t0 + 1.0, 7, 170, 0.2, [PINK, BONE, GOLD])
    } },
  { sign: S, cap: '“Do what you want.” | It was *a test.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'do what | you want.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 780, 930, 'TEST: FAILED', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 52, bg: RED, color: BONE, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cleaned the whole house. | *Furiously.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SPONGE, { Y: '#ffd23a', G: '#5fd068' }, 780 + Math.sin(t * 22) * 60, 900 + Math.cos(t * 22) * 30, 28 * k, { rot: Math.sin(t * 22) * 0.3 })
      for (let i = 0; i < 4; i++) sparkles(x, t, 700 + (i % 2) * 180, 760 + Math.floor(i / 2) * 260, P.t0 + 0.7 + i * 0.3, 5, 70, i)
      label(x, 790, 1140, 'SPOTLESS. SEETHING.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked your chart | for *what went wrong.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 780, 830, 150, pop01(t, P.t0 + 0.15, 0.35, 2), t)
      ring(x, 780, 830, 80, ease.outCubic(prog(lt, 0.8, 1.3)))
      label(x, 780, 1080, 'MARS. OBVIOUSLY.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0011', key: 'C', accent: PURPLE, solo: 'scorpio', ending: 'group',
  title: 'Scorpios when mad | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not mad. | Just *taking notes.*', mood: 'squint' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
