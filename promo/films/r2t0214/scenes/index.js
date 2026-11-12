// r2t0214: star_talk, SOLO, "How to spot | a Libra." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards), each the most extreme, most charming Libra tell.
//   0.0–3.6    "How to spot | *a Libra.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              still reading the menu since lunch · outfit matches the room · straightened a stranger's crooked frame
//              · split the bill to the cent · ends every fight with a hug · accidentally flirted with a lamp
//              · weighs your compatibility on a real scale · a pros-and-cons list for a nap · "I don't mind" (minds a little)
//  37.8        ending 'group': "Pretty, polite, | and *still deciding.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ccf', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'libra'

// ── props
const LAMP = [
  '..YYYYY..',
  '.YYYYYYY.',
  'YYYYYYYYY',
  '....K....',
  '....K....',
  '....K....',
  '....K....',
  '..KKKKK..',
]
const BOW = ['RR...RR', 'RRR.RRR', 'RRRRRRR', 'RRR.RRR', 'RR...RR']
const FLAG = ['KWWWWWW', 'KWWWWWW', 'KWWWWWW', 'K......', 'K......', 'K......', 'K......']

// a paper card with lines of text
function paper(x, cx, cy, k, rows, { rot = -0.04, w = 300, head } = {}) {
  if (k <= 0.01) return
  const h = (head ? 120 : 70) + rows.length * 54
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 50
  if (head) { x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, y0); y0 += 60 }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => { if (kk < 0.5) return; x.fillStyle = col || INK; x.font = `800 28px ${INTER}`; x.fillText(txt, -w / 2 + 24, y0 + i * 54) })
  x.restore()
}
// a balance scale with two little sign cards on its pans
function scale(x, t, cx, cy, k, tilt, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -150, 24, 300); x.fillRect(-90, 140, 180, 24)
  x.fillStyle = GOLD; x.fillRect(-6, -144, 12, 290); x.fillRect(-84, 144, 168, 14)
  x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-190, -160, 380, 18); x.fillStyle = GOLD; x.fillRect(-186, -156, 372, 10)
  x.restore()
  for (const [side, id] of [[-1, a], [1, b]]) {
    const px = cx + side * 186 * k * Math.cos(tilt), py = cy + (-150 + side * 186 * Math.sin(tilt)) * k
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60 * k, py + 110 * k); x.moveTo(px, py); x.lineTo(px + 60 * k, py + 110 * k); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 80 * k, py + 108 * k, 160 * k, 16 * k); x.fillStyle = GOLD; x.fillRect(px - 76 * k, py + 110 * k, 152 * k, 10 * k)
    signChar(x, t, id, px, py + 66 * k, 110 * k, { mood: 'happy', seed: side > 0 ? 81 : 82, glyph: false, glow: 0.5 })
  }
}

const CAMEOS = [
  { sign: S, cap: 'Still reading the menu. | *Since lunch.*', mood: 'squint', look: lt => [Math.sin(lt * 5) > 0 ? 1 : 0.4, Math.sin(lt * 3) > 0 ? -0.5 : 0.5], star: { x: -200 },
    front(x, t, lt, P) {
      paper(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), [['pasta', INK], ['tacos', INK], ['soup', INK], ['salad', INK], ['…all?', '#d96a96']], { head: 'MENU', rot: 0.04, w: 280 })
      label(x, 790, 1150, 'IT’S 7 PM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their outfit matches | *the room.*', mood: 'sparkle', star: { x: -200 }, hops: [1.2],
    back(x, t, lt, P) {
      const k = clamp(ease.outCubic(prog(lt, 0.3, 0.8)))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.9 * k
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#ffc4dd' : '#ffd9e8'; x.fillRect(110 + i * 143, 480, 143, 740) }
      x.restore()
    },
    front(x, t, lt, P, F) {
      drawBits(x, BOW, { R: ROSE }, F.x + 70, F.top - 4, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.2 })
      label(x, 790, 1080, 'PERFECT MATCH: WALL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Straightened a frame | *in a stranger’s house.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -0.5], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const rot = lerp(0.35, 0, ease.outBack ? clamp(ease.outCubic(prog(lt, 0.8, 1.3))) : prog(lt, 0.8, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(790, 800); x.rotate(rot); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -110, 280, 220); x.fillStyle = WOOD; x.fillRect(-132, -102, 264, 204)
        x.fillStyle = '#7fc8e8'; x.fillRect(-110, -80, 220, 160); x.fillStyle = '#5fd068'; x.fillRect(-110, 20, 220, 60)
        x.fillStyle = GOLD; x.beginPath(); x.arc(50, -30, 26, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 790, 1060, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Split the bill | *to the exact cent.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.0) * 4)
      paper(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), [['you: $14.37', INK, n > 0], ['me: $14.37', INK, n > 1], ['them: $14.37', INK, n > 2], ['tip: fair ✓', '#2f9a62', n > 3]], { head: 'RECEIPT', w: 300, rot: -0.04 })
      label(x, 790, 1110, 'MATH: BEAUTIFUL', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ends every fight | with *a group hug.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: 0, y: 30, s: 260 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const a = pop01(t, P.t0 + 0.15, 0.35, 2), d = ease.inOutCubic(prog(lt, 1.0, 1.5))
      const hug = d > 0.5
      if (a > 0.01) {
        signChar(x, t, 'leo', lerp(240, 330, d), 980, 180 * a, { mood: hug ? 'heart' : 'eyeroll', look: [1, 0], seed: 21, glyph: false })
        signChar(x, t, 'scorpio', lerp(840, 750, d), 980, 180 * a, { mood: hug ? 'heart' : 'eyeroll', look: [-1, 0], seed: 22, glyph: false })
      }
      drawBits(x, FLAG, { K: '#8a4a2e', W: '#ffffff' }, F.x + 120, F.cy - 110, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.1 * Math.sin(t * 6) })
      label(x, 540, 640, hug ? 'PEACE: RESTORED' : 'TENSION: HIGH', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: hug ? MINT : RED, color: hug ? INK : CREAM, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.5 * 1.29, { n: 7, life: 1.4, spread: 360, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Accidentally flirted | *with a lamp.*', mood: lt => lt > 0.9 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      const on = lt > 1.2
      if (on) { x.save(); x.globalAlpha = 0.3; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(740, 760); x.lineTo(840, 760); x.lineTo(920, 1080); x.lineTo(660, 1080); x.closePath(); x.fill(); x.restore() }
      drawBits(x, LAMP, { Y: on ? '#ffe27a' : '#b9a46a', K: '#5b5d78' }, 790, 880, 28 * k)
      bubble(x, 560, 620, 'well, | hello there.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 790, 800, P.t0 + 1.2 * 1.29, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 2 })
      label(x, 790, 1130, 'LAMP: CHARMED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Weighs your compatibility | *on a real scale.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.6],
    front(x, t, lt, P) {
      const tilt = lt < 1.5 ? 0.18 * Math.sin(lt * 6) : 0.18 * Math.sin(1.5 * 6) * Math.exp(-(lt - 1.5) * 6) * Math.cos((lt - 1.5) * 18)
      scale(x, t, 770, 900, 0.8 * pop01(t, P.t0 + 0.15, 0.35, 2), tilt, 'libra', 'gemini')
      label(x, 790, 620, 'BALANCED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A pros and cons list | *for a nap.*', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4)
      paper(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), [['+ cozy', '#2f9a62', n > 0], ['− the day', RED, n > 1], ['+ dreams', '#2f9a62', n > 2], ['− indecision', RED, n > 3]], { head: 'NAP?', w: 290, rot: 0.04 })
      label(x, 790, 1130, 'DECIDED: LATER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“I don’t mind!” | *Minds a little.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I don’t mind!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.2, 0.3, 2.2)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        for (let i = 0; i < 3; i++) { x.fillStyle = LAV; x.beginPath(); x.arc(560 + i * 50, 900 + i * 30, 10 + i * 4, 0, Math.PI * 2); x.fill() }
        x.restore()
        label(x, 790, 1000, '(minds a little)', k, { size: 36, bg: LAV, rot: -0.04 })
      }
    } },
]

const F = makeFilm({
  id: 'r2t0214', key: 'D', accent: ROSE, solo: S, ending: 'group',
  title: 'How to spot | *a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Pretty, polite, | and *still deciding.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
