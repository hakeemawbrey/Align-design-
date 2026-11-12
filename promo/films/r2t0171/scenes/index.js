// r2t0171: star_talk, SOLO film, "Leos when they're mad | *be like.*" (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine ways a mad Leo is still the main character. Ending: lesson.
//   0.0–3.6    "Leos when they're | mad *be like.*"
//   3.6–37.8   nine cards: no like on the post → press conference · silent treatment, under a spotlight
//              · you praised someone else → demanded a recount · stormed out, came back for a better exit
//              · match left them on read → bio now says "iconic" · lost a board game → rematch eleven
//              · wrote your apology for you to sign · the mane gets bigger · mad for five minutes, then a hug
//  37.8        "Loud. Proud. | *Over it in five.*"
//  41.2        LESSON: "A mad Leo just wants | to feel *seen.*"  STATUS: FORGIVEN
//  47.1        "Compliment the hair. | *Works every time.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'

// ── props
const MIC = ['.GGG.', 'GgGgG', 'GGGGG', '.GGG.', '..K..', '..K..', '..K..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
function podium(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -52, 276, 250)
  x.fillStyle = INK; x.fillRect(-140, -60, 280, 250)
  x.fillStyle = '#6b3fa8'; x.fillRect(-132, -52, 264, 234)
  x.fillStyle = GOLD; x.fillRect(-132, -52, 264, 16)
  x.fillStyle = '#fff4e2'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO NEWS', 0, 60)
  for (let i = 0; i < 3; i++) drawBits(x, MIC, MIC_C, -60 + i * 60, -100, 9, { rot: (i - 1) * 0.25 })
  x.restore()
}
function ballot(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 250); x.fillStyle = SKYB; x.fillRect(-142, -112, 284, 234)
  x.fillStyle = INK; x.fillRect(-80, -112, 160, 18)
  x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VOTES', 0, 20)
  x.font = `700 24px ${MONO}`; x.fillText('best friend award', 0, 76)
  x.restore()
}
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-118, -230, 236, 460); x.fillStyle = '#140c30'; x.fillRect(-108, -220, 216, 450)
  const w = lerp(216, 60, open)
  x.fillStyle = '#a8742a'; x.fillRect(-108, -220, w, 450)
  x.fillStyle = '#8a5a2a'; x.fillRect(-108 + w * 0.15, -190, w * 0.7, 160); x.fillRect(-108 + w * 0.15, 0, w * 0.7, 190)
  x.fillStyle = GOLD; x.fillRect(-108 + w - 26, 0, 14, 14)
  x.restore()
}
function phoneProfile(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-128, -204, 268, 420)
  x.fillStyle = INK; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -206, 260, 412)
  x.fillStyle = '#140c30'; x.fillRect(-116, -180, 232, 360)
  signChar(x, t, 'leo', 0, -90, 130, { mood: 'squint', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = ORANGE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♌︎ LEO', 0, 10)
  x.fillStyle = BONE; x.fillRect(-100, 40, 200, 110)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillText('bio:', -88, 64)
  const txt = lt > 1.2 ? 'iconic.' : 'loves walks'
  x.font = `800 ${lt > 1.2 ? 40 : 26}px ${INTER}`; x.fillText(txt, -88, 112)
  x.restore()
}
function board(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = BONE; x.fillRect(-160, -160, 320, 320)
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) if ((r + c) % 2) { x.fillStyle = '#c98f2a'; x.fillRect(-150 + c * 50, -150 + r * 50, 50, 50) }
  const P = [[-1, -2, RED], [1, 1, SKYB], [2, -1, MINT], [-2, 2, GOLD]]
  for (const [c, r, col] of P) { x.fillStyle = INK; x.beginPath(); x.arc(c * 50 + 25 - 25, r * 50, 20, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(c * 50, r * 50, 15, 0, 7); x.fill() }
  x.restore()
}
function paper(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -182, 300, 380)
  x.fillStyle = INK; x.fillRect(-156, -196, 312, 392); x.fillStyle = '#fff8ea'; x.fillRect(-148, -188, 296, 376)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.font = `800 34px ${INTER}`; x.fillText('Dear Leo,', -124, -140)
  x.font = `700 24px ${MONO}`
  ;['I was wrong.', 'You were right.', 'Your hair looks', 'amazing today.'].forEach((l, i) => x.fillText(l, -124, -80 + i * 42))
  x.fillStyle = '#6b62a8'; x.fillRect(-124, 140, 248, 4)
  x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('sign here:', -124, 112)
  const p = clamp((lt - 1.2) / 0.8)
  if (p > 0) { x.strokeStyle = SKYB.replace('8fe3ff', '3d8fd8'); x.strokeStyle = '#3d6fd8'; x.lineWidth = 5; x.beginPath(); for (let i = 0; i <= 20 * p; i++) { const px = -110 + i * 11, py = 126 + Math.sin(i * 1.3) * 10; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
function mane(x, t, cx, cy, R, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy)
  const n = 18
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + Math.sin(t * 3) * 0.04, r1 = R * 0.62, r2 = R * (0.62 + 0.5 * k) * (i % 2 ? 0.86 : 1)
    x.fillStyle = i % 2 ? ORANGE : '#e8862a'
    x.beginPath(); x.moveTo(Math.cos(a - 0.2) * r1, Math.sin(a - 0.2) * r1); x.lineTo(Math.cos(a) * r2, Math.sin(a) * r2); x.lineTo(Math.cos(a + 0.2) * r1, Math.sin(a + 0.2) * r1); x.fill()
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'leo', cap: 'Didn’t like their post? | Leo called a *press conference.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      podium(x, 790, 900, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 640, 'NO QUESTIONS.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.4, 6, 180, 0.2, [BONE, '#fff', GOLD])
    } },
  { sign: 'leo', cap: 'The silent treatment. | But *under a spotlight.*', mood: 'squint', star: { x: -180 },
    back(x, t, lt, P) {
      const k = clamp(pop01(t, P.t0 + 0.4, 0.4, 1.4))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.4 * k
      const g = x.createLinearGradient(0, 480, 0, 1200); g.addColorStop(0, '#fff6d0'); g.addColorStop(1, 'rgba(255,246,208,0.15)')
      x.fillStyle = g; x.beginPath(); x.moveTo(300, 480); x.lineTo(440, 480); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 780, 760, '. . .', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 60, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 780, 960, 'SILENCE (LOUD)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You praised someone else. | Leo *demanded a recount.*', mood: lt => lt > 1.1 ? 'squint' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      ballot(x, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1110, 'RECOUNT!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: ORANGE, rot: 0.05 })
    } },
  { sign: 'leo', cap: 'Stormed out. | Came back for *a better exit.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      door(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), clamp((lt - 0.4) / 0.4) * (1 - clamp((lt - 1.0) / 0.3)) + clamp((lt - 1.4) / 0.3))
      label(x, 800, 600, 'EXIT: TAKE 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 380, 1130, 'and SCENE.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'tc' })
    } },
  { sign: 'leo', cap: 'Their match left them on read. | Bio now: *“iconic.”*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phoneProfile(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 800, 900, P.t0 + 1.3 * 1.29, 6, 170, 0.6)
    } },
  { sign: 'leo', cap: 'Lost a board game. | *Rematch* number eleven.', mood: 'squint', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      board(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 2 + Math.floor(clamp((lt - 0.5) / 1.4) * 9)
      label(x, 800, 640, `REMATCH #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'best of 21?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'tl' })
    } },
  { sign: 'leo', cap: 'Leo wrote your apology. | You just *sign here.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      paper(x, 800, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
    } },
  { sign: 'leo', cap: 'When Leo’s mad, | the *mane gets bigger.*', mood: 'squint', star: { x: 0, s: 300 },
    back(x, t, lt, P) { mane(x, t, 540, 880, 300, clamp((lt - 0.3) / 1.3)) },
    front(x, t, lt, P) {
      label(x, 540, 600, 'VOLUME: MAX', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Mad for five minutes. | Then *hugs you anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -150 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 760, 920, 210 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.6] })
      label(x, 760, 650, '4:59… 5:00', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 560, 820, P.t0 + 1.2 * 1.29, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 6 })
      label(x, 760, 1150, 'FORGIVEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0171', key: 'C', accent: ORANGE, solo: 'leo', ending: 'lesson',
  title: 'Leos when they’re | mad *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Proud. | *Over it in five.*', mood: 'sparkle' },
  lesson: { text: 'A mad Leo just wants | to feel *seen.*', chip: 'STATUS: FORGIVEN' },
  last: { text: 'Compliment the hair. | *Works every time.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
