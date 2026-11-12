// r2t0021: THE SIGNS AS… v3, BE LIKE, "Zodiacs when they can't decide | be like." (~56 s vertical, signs3kit, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of themselves stuck on a choice.
//   0.0–3.6    "Can't decide? | Zodiacs *be like.*"
//   3.6–49.2   ♈ answered before you asked · ♉ the usual, order 400 · ♊ held a vote, 1–1 · ♋ can't pick a mug, they'd be sad
//              · ♌ ran a poll, option B: Leo · ♍ pros-and-cons list v14 · ♎ coin flip, best of 101 · ♏ stared down the menu
//              · ♐ couldn't pick a trip, booked all three · ♑ scheduled the decision for 2031 · ♒ invented option C
//              · ♓ chose one cupcake, mourned the other
//  49.2        "Two hours later, | the *café closed.*"
//  52.6        CALLBACK: "Flip 101? | Landed *on its edge.*"  Libra and the coin, standing on its edge.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
function coin(x, cx, cy, r, k, spin, { edge = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const sx = edge ? 0.16 : Math.max(0.08, Math.abs(Math.cos(spin)))
  x.scale(sx, 1)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d9a93a'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, r * 0.78, 0, Math.PI * 2); x.fill()
  if (!edge) { x.fillStyle = INK; x.font = `800 ${Math.round(r * 0.9)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(Math.cos(spin) > 0 ? '♎︎' : '?', 0, 4) }
  x.restore()
}
function mug(x, cx, cy, s, col, face, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-46, -56, 92, 112); x.fillRect(40, -30, 36, 60)
  x.fillStyle = col; x.fillRect(-38, -48, 76, 96)
  x.fillStyle = INK; x.fillRect(46, -22, 22, 44); x.fillStyle = col; x.fillRect(46, -14, 14, 28)
  x.fillStyle = INK
  if (face === 'sad') { x.fillRect(-20, -14, 8, 10); x.fillRect(12, -14, 8, 10); x.fillRect(-12, 16, 24, 6); x.fillRect(-16, 22, 6, 6); x.fillRect(10, 22, 6, 6); x.fillStyle = SKYB; x.fillRect(-20, 0, 6, 12) }
  else { x.fillRect(-20, -14, 8, 10); x.fillRect(12, -14, 8, 10); x.fillRect(-16, 10, 6, 6); x.fillRect(10, 10, 6, 6); x.fillRect(-10, 16, 20, 6) }
  x.restore()
}
function menu(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05 + (lt > 1.4 ? Math.sin(lt * 40) * 0.03 : 0)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-128, -170, 256, 340)
  x.fillStyle = '#fff4e2'; x.fillRect(-118, -160, 236, 320)
  x.fillStyle = BROWN; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -120)
  x.fillStyle = '#c9bca6'; for (let i = 0; i < 5; i++) x.fillRect(-90, -70 + i * 44, 180 - (i % 2) * 40, 14)
  x.restore()
}
const TICKET = ['KKKKKKKKKKKKKK', 'KWWWWWWWWWWW.K', 'KWWWWWWWWWWWWK', 'KWWWWWWWWWWW.K', 'KKKKKKKKKKKKKK']
const CUPCAKE = ['....PP....', '..PPPPPP..', '.PPWPPPPP.', 'PPPPPPPPPP', 'BBBBBBBBBB', '.BKBKBKBB.', '.BBBBBBBB.', '..BBBBBB..']
const CUPCAKE_C = { P: PINK, W: '#ffffff', B: '#e8a24a', K: BROWN }
const GADGET = ['....Y....', '...YYY...', '..GGGGG..', '.GSGSGSG.', 'GGGGGGGGG', 'G.G.G.G.G', 'GGGGGGGGG', '.K.....K.', 'KK.....KK']
const GADGET_C = { Y: GOLD, G: '#9aa5c4', S: '#6fc3ff', K: INK }

function grid(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300)
  x.fillStyle = '#fff4e2'; x.fillRect(-160, -140, 320, 280)
  x.fillStyle = '#2fc79a'; x.fillRect(-160, -140, 320, 46)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('PROS', -80, -116); x.fillText('CONS', 80, -116)
  x.fillStyle = '#c9bca6'; x.fillRect(-2, -94, 4, 234)
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 6)
  for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1, row = Math.floor(i / 2); x.fillStyle = side < 0 ? GREEN : RED; x.fillRect(side * 80 - 56, -64 + row * 54, 112, 16) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Answered before | you *asked.*', mood: 'sparkle', star: { x: -160 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'YES!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 70, tail: 'bl' })
      label(x, 790, 900, 'QUESTION: LOADING…', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ordered the usual. | For the *400th time.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const n = 380 + Math.floor(prog(lt, 0.3, 1.4) * 20)
      label(x, 790, 760, `THE USUAL ×${n}`, pop01(t, P.t0 + 0.25, 0.3, 2), { size: 40, bg: GOLD, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'no new | menu, thanks', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Held a vote. | It’s tied *1–1.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const flip = Math.floor(lt * 2.6) % 2
      bubble(x, 790, 680, flip ? 'tacos!' : 'pizza!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl', col: flip ? MINT : BONE })
      label(x, 790, 900, 'VOTES: 1 – 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Can’t pick a mug. | They’d *be sad.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sad = lt > 1.1
      mug(x, 660, 1010, 0.95, SKYB, sad ? 'sad' : 'happy', k)
      mug(x, 800, 1010, 0.95, PINK, sad ? 'sad' : 'happy', k)
      mug(x, 730, 860, 0.95, GOLD, sad ? 'sad' : 'happy', k)
      bubble(x, 800, 660, 'pick me!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Ran a poll. | Option B: *Leo.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 840); x.rotate(0.04); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-180, -150, 360, 300); x.fillStyle = '#fff4e2'; x.fillRect(-170, -140, 340, 280)
      x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('DINNER?', -150, -100)
      const g = ease.outCubic(prog(lt, 0.6, 1.5))
      x.fillStyle = '#c9bca6'; x.fillRect(-150, -60, 300 * 0.05 + 2, 50); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('A) pasta  1%', -140, -35)
      x.fillStyle = '#ffb34a'; x.fillRect(-150, 20, 300 * g, 50); x.fillStyle = INK; x.fillText(`B) LEO  ${Math.round(99 * g)}%`, -140, 45)
      x.restore()
      sparkles(x, t, 790, 860, P.t0 + 1.6, 7, 190, 0.3)
    } },
  { sign: 'virgo', cap: 'Pros-and-cons list. | *Version 14.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      grid(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1060, 'FINAL_FINAL_v14', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Flipped a coin. | *Best of 101.*', mood: lt => lt > 1.7 ? 'squint' : 'happy', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const air = Math.abs(Math.sin(lt * 4))
      coin(x, 790, 900 - air * 200, 70, pop01(t, P.t0 + 0.2, 0.3, 2), t * 12)
      const n = 40 + Math.floor(prog(lt, 0.3, 2.2) * 17)
      label(x, 790, 1120, `FLIP ${n} / 101`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stared at the menu | until *it chose.*', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      menu(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 620, 'ok ok… | the soup', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Couldn’t pick a trip. | *Booked all three.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const L = [['BEACH ✓', GOLD], ['MOUNTAINS ✓', MINT], ['THE MOON ✓', LAV]]
      L.forEach(([s, bg], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.45, 0.3, 2.2)
        drawBits(x, TICKET, { K: INK, W: bg }, 320, 640 + i * 190, 24 * k, { rot: -0.05 + i * 0.05 })
        label(x, 320, 640 + i * 190, s, k, { size: 30, bg, rot: -0.05 + i * 0.05, font: MONO, weight: 700 })
      })
    } },
  { sign: 'capricorn', cap: 'Scheduled the decision. | For *2031.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 840); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#fff4e2'; x.fillRect(-140, -140, 280, 280)
        x.fillStyle = '#9aa5c4'; x.fillRect(-140, -140, 280, 70)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MAR 3, 2031', 0, -104)
        x.font = `800 30px ${INTER}`; x.fillText('9:00  DECIDE', 0, 0); x.fillText('9:05  LUNCH', 0, 70)
        x.restore()
      }
      label(x, 320, 1100, 'ON SCHEDULE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Picked neither. | Invented *option C.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      drawBits(x, GADGET, GADGET_C, 790, 880 + 8 * Math.sin(t * 5), 26 * k)
      label(x, 790, 640, 'A ✗   B ✗', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: BONE, font: MONO, weight: 700 })
      label(x, 790, 1120, 'OPTION C', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 6, 160, 0.5, [MINT, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Chose one cupcake. | *Mourned* the other.', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CUPCAKE, CUPCAKE_C, 800, 980, 22 * k)
      bubble(x, 800, 700, 'goodbye, | little guy', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0021', key: 'C', accent: '#ff8fb1', ending: 'callback',
  title: 'Can’t decide? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Two hours later, | the *café closed.*' },
  last: {
    text: 'Flip 101? | Landed *on its edge.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 400, 1060, 260 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.3] })
      const c = pop01(t, t - lt + 0.8, 0.35, 2)
      coin(x, 720, 1060, 120, c, 0, { edge: true })
      label(x, 720, 1240, 'FLIP 101: EDGE', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 42, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1080, t - lt + 1.0, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
