// r2a0174: star_advice, ADVICE ROLL CALL, "How signs make | *a big decision.*" (~53 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "How signs make | *a big decision.*"
//   3.6–49.2   ♈ trusts their gut (the GO button) · ♉ sleeps on it (a pillow) · ♊ asks both minds · ♋ asks the people
//              they love · ♌ picks what makes them glow (a compass) · ♍ pros and cons, both valid · ♎ both can be okay
//              (balanced scales) · ♏ decides quietly, commits fully · ♐ flips a coin, feels which side they hoped
//              · ♑ plans five years, leaves room for joy · ♒ picks the option nobody listed · ♓ follows their heart, cries
//  49.2        "Every way works. | *Trust yours.*"
//  52.6        CALLBACK: "Taurus woke up. | *Still a yes.*"  Taurus is back on the pillow, YES.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
function goButton(x, cx, cy, k, pressed) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 20, 300, 80); x.fillStyle = '#4a3a6a'; x.fillRect(-142, 28, 284, 64)
  const d = pressed ? 18 : 0
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20 + d, 120, 50, 0, 0, 7); x.fill()
  x.fillStyle = INK; x.fillRect(-120, -30 + d, 240, 50); x.beginPath(); x.ellipse(0, -30 + d, 120, 50, 0, 0, 7); x.fill()
  x.fillStyle = RED; x.beginPath(); x.ellipse(0, -34 + d, 110, 42, 0, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.font = `800 48px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GO', 0, -34 + d)
  x.restore()
}
function pillow(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 210, 80, 0, 0, 7); x.fill()
  x.fillStyle = '#e8eef8'; x.beginPath(); x.ellipse(0, -4, 198, 68, 0, 0, 7); x.fill()
  x.fillStyle = '#c9d3e8'; x.beginPath(); x.ellipse(0, 20, 150, 30, 0, 0, 7); x.fill()
  x.restore()
}
function zz(x, t, cx, cy) {
  x.save(); x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.font = `800 ${30 + i * 10}px ${INTER}`; x.fillText('z', cx + i * 34 + ph * 20, cy - ph * 90 - i * 20) }
  x.restore()
}
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -216, 280, 432); x.fillStyle = '#2a2350'; x.fillRect(-130, -206, 260, 412)
  x.fillStyle = '#140c30'; x.fillRect(-116, -180, 232, 360)
  lines.forEach(([l, col], i) => {
    x.fillStyle = col; x.fillRect(-100, -150 + i * 84, 200, 64)
    x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(l, 0, -118 + i * 84)
  })
  x.restore()
}
function compass(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 118, 0, 7); x.fill()
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('JOY', 0, -92); x.fillText('meh', 0, 92); x.fillText('?', -92, 0); x.fillText('?', 92, 0)
  x.rotate(Math.sin(t * 5) * 0.06)
  x.fillStyle = RED; x.beginPath(); x.moveTo(0, -70); x.lineTo(18, 0); x.lineTo(-18, 0); x.fill()
  x.fillStyle = '#6b62a8'; x.beginPath(); x.moveTo(0, 70); x.lineTo(18, 0); x.lineTo(-18, 0); x.fill()
  x.restore()
}
function tchart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -170, 360, 340); x.fillStyle = BONE; x.fillRect(-172, -162, 344, 324)
  x.fillStyle = INK; x.fillRect(-172, -100, 344, 6); x.fillRect(-3, -162, 6, 324)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2f9a5a'; x.fillText('PROS', -86, -130); x.fillStyle = RED; x.fillText('CONS', 86, -130)
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 4)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`
  for (let i = 0; i < n; i++) { x.fillText('✓ ' + ['growth', 'fun', 'new city', 'brave'][i], -86, -60 + i * 50); x.fillText('• ' + ['scary', 'packing', 'far', 'new'][i], 86, -60 + i * 50) }
  x.restore()
}
function scales(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = GOLD; x.fillRect(-12, -150, 24, 300); x.fillRect(-90, 140, 180, 24)
  const tilt = Math.sin(t * 1.6) * 0.04
  x.rotate(tilt); x.fillRect(-180, -150, 360, 16)
  for (const s of [-1, 1]) {
    x.strokeStyle = GOLD; x.lineWidth = 5; x.beginPath(); x.moveTo(s * 170, -142); x.lineTo(s * 120, -50); x.moveTo(s * 170, -142); x.lineTo(s * 220, -50); x.stroke()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(s * 170, -46, 64, 22, 0, 0, Math.PI); x.fill()
    x.fillStyle = s < 0 ? PINK : SKYB; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.save(); x.translate(s * 170, -76); x.rotate(-tilt); x.fillText(s < 0 ? 'A' : 'B', 0, 0); x.restore()
  }
  x.restore()
}
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'KKKKKKKK', 'KGGGGGGK', 'KGGKKGGK', 'KGGKKGGK', 'KGGGGGGK', 'KKKKKKKK']
function coin(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const flip = lt < 1.3 ? Math.abs(Math.cos(lt * 14)) : 1, up = lt < 1.3 ? Math.sin(Math.PI * clamp(lt / 1.3)) * 160 : 0
  x.save(); x.translate(cx, cy - up); x.scale(k, k * Math.max(0.08, flip))
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.fill()
  x.fillStyle = '#c98f2a'; x.beginPath(); x.arc(0, 0, 70, 0, 7); x.fill()
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('★', 0, 2)
  x.restore()
}
function roadmap(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 10; x.setLineDash([22, 14]); x.beginPath(); x.moveTo(-180, 160); x.bezierCurveTo(-60, 60, 120, 120, 40, -20); x.bezierCurveTo(-30, -110, 140, -140, 170, -190); x.stroke(); x.setLineDash([])
  const flags = [[-180, 160, MINT], [40, -20, SKYB], [170, -190, GOLD]]
  for (const [fx, fy, col] of flags) { x.fillStyle = INK; x.fillRect(fx - 4, fy - 70, 8, 70); x.fillStyle = col; x.fillRect(fx + 4, fy - 70, 50, 32) }
  x.restore()
}
function quiz(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = BONE; x.fillRect(-162, -162, 324, 324)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['A) this', 'B) that', 'C) the other', 'D) ✎ my idea'].forEach((l, i) => x.fillText(l, -130, -110 + i * 72))
  if (lt > 1.0) { x.strokeStyle = PINK; x.lineWidth = 6; x.beginPath(); x.ellipse(-20, 106, 130, 34, 0, 0, Math.PI * 2 * clamp((lt - 1.0) / 0.5)); x.stroke() }
  x.restore()
}
const BALLOON = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...', '...K...', '...K...', '...K...', '....K..', '....K..']

const CAMEOS = [
  { sign: 'aries', cap: 'Trusts their gut. | It’s *usually right.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [0.8],
    front(x, t, lt, P) {
      goButton(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.8 && lt < 1.1)
      label(x, 790, 1110, 'DECIDED. NEXT!', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Sleeps on it. | *Slow is wise.*', mood: 'sleepy', look: [1, 0], star: { x: -180, y: -30 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { pillow(x, 360, 1010, pop01(t, P.t0 + 0.1, 0.35, 1.8)) },
    front(x, t, lt, P) {
      zz(x, t, 470, 720)
      label(x, 790, 860, 'ANSWER: TOMORROW', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two minds? | Ask *both of them.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 720, 'yes!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl', col: SKYB })
      bubble(x, 820, 930, 'also yes!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl', col: GOLD })
      label(x, 790, 1120, 'UNANIMOUS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Asks the people they love. | *That’s wisdom.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 3)
      phone(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), [['thoughts?', BONE], ['go for it!', PINK], ['so proud', MINT], ['we’re here', SKYB]].slice(0, n))
    } },
  { sign: 'leo', cap: 'Picks what makes them glow. | *Good compass.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      compass(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 760, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Pros and cons list. | *Both columns count.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) { tchart(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'libra', cap: 'Can’t choose? | *Both can be okay.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scales(x, t, 770, 900, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95)
      label(x, 800, 650, 'BALANCED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Decides quietly. | *Commits fully.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LOCK, { K: INK, G: GOLD }, 790, 880, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'FINAL ANSWER', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Flips a coin. | *Feels* which side they hoped.', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      coin(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 650, 'oh! I wanted heads.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Plans five years ahead. | *Leaves room for joy.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      roadmap(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 860, 1110, '+ ONE FUN STOP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Picks the option | *nobody listed.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) { quiz(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'pisces', cap: 'Follows their heart. | Happy tears. *Good choice.*', mood: 'heart', tears: lt => lt < 0.9 ? 1 : 3, look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, BALLOON, { H: PINK, W: '#fff', K: BONE }, 800, 860 - 20 * Math.sin(t * 2), 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1120, 'THIS WAY ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0174', key: 'E', accent: SKYB, ending: 'callback',
  title: 'How signs make | *a big decision.*',
  cameos: CAMEOS,
  group: { cap: 'Every way works. | *Trust yours.*' },
  last: {
    text: 'Taurus woke up. | *Still a yes.*',
    draw(x, t, lt) {
      const t0 = t - lt
      pillow(x, 540, 1160, pop01(t, t0 + 0.3, 0.45, 1.8) * 1.2)
      const s = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 540, 1030, 260 * s, { mood: lt > 1.6 ? 'sparkle' : 'sleepy', seed: 44, hops: [t0 + 1.8] })
      label(x, 540, 1360, 'YES ✓', pop01(t, t0 + 1.7, 0.3, 2.4), { size: 54, bg: MINT, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
