// r2a0332: star_advice, ADVICE SOLO, "Libra, decide. | Don't look back." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine relatable Libra truths about choosing, each with a warm reframe and one light visual gag.
// Ending: lesson.
//   0.0–3.6    "Libra, decide. | *Don’t look back.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              stuck on the menu, it's all delicious · two outfits, both cute · asked twelve friends, your gut
//              knew · can't pick a side, fairness is a gift (the scales) · a pro/con list one line long · sent it? stop
//              re-reading it · bio still says "TBD", still lovable · picked the wrong road, scenic route · decision made,
//              now enjoy it
//  37.8        "Fair heart. | *Brave choice.*"  Libra comes back, big.
//  41.0        LESSON UNLOCKED: "Chosen with love? | Then *it’s the right one.*"  STATUS: DECIDED
//  46.9        "And the outfit? | *Wear both.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9ec7', PAPER = '#fff4e2'

// ── props
const SHIRT = [
  '...KKK...',
  '..K...K..',
  '.SSSKSSS.',
  'SSSSSSSSS',
  'SSSSSSSSS',
  '.SSSSSSS.',
  '.SSSSSSS.',
  '.SSSSSSS.',
  '.SSSSSSS.',
]
const SCALES = [
  '.......G.......',
  '......GGG......',
  'GGGGGGGGGGGGGGG',
  'G......G......G',
  'G......G......G',
  'G......G......G',
  'PPP....G....PPP',
  'PPP....G....PPP',
  '.......G.......',
  '.....GGGGG.....',
]
const SCALES_C = { G: GOLD, P: PINK }

// a menu card, very long
function menu(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -190, 276, 396)
  x.fillStyle = INK; x.fillRect(-142, -202, 284, 404)
  x.fillStyle = PAPER; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -156)
  const sel = Math.floor(lt * 3) % 6
  for (let i = 0; i < 6; i++) {
    const y = -96 + i * 52
    x.fillStyle = i === sel ? '#ffd6e2' : 'transparent'; if (i === sel) x.fillRect(-118, y - 22, 236, 44)
    x.fillStyle = '#6b62a8'; x.fillRect(-100, y - 4, 130 - (i * 23) % 60, 10)
    x.fillStyle = '#b9b0a0'; x.fillRect(60, y - 4, 40, 10)
  }
  x.restore()
}
// a pro/con list on a little notepad
function notepad(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -150, 296, 316)
  x.fillStyle = INK; x.fillRect(-152, -162, 304, 324)
  x.fillStyle = PAPER; x.fillRect(-144, -154, 288, 308)
  x.fillStyle = '#c9a6ff'; x.fillRect(-144, -154, 288, 40)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('PROS', -120, -80); x.fillText('CONS', 30, -80)
  x.fillRect(0, -100, 4, 230)
  const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.25))
  x.fillStyle = '#b9b0a0'
  for (let i = 0; i < n; i++) { x.fillRect(-120, -36 + i * 40, 100, 8); x.fillRect(26, -36 + i * 40, 100, 8) }
  if (lt > 1.4) {
    x.strokeStyle = '#ff4f86'; x.lineWidth = 8; x.beginPath(); x.moveTo(-130, -60); x.lineTo(130, 120); x.moveTo(130, -60); x.lineTo(-130, 120); x.stroke()
  }
  x.restore()
}
// a profile card with a bio line
function profile(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-130, -180, 276, 376)
  x.fillStyle = INK; x.fillRect(-142, -192, 284, 384)
  x.fillStyle = '#241a52'; x.fillRect(-134, -184, 268, 368)
  x.fillStyle = '#ffd6e2'; x.fillRect(-110, -160, 220, 190)
  x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LIBRA', 0, 72)
  x.fillStyle = '#c9c0f0'; x.font = `700 30px ${MONO}`; x.fillText('bio: TBD', 0, 130)
  x.restore()
  signChar(x, t, 'libra', cx, cy - 66 * k, 150 * k, { mood: 'wink', seed: 33, glyph: false, glow: 0.4 })
}
// a forked signpost
function signpost(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 330)
  x.fillStyle = '#8a4a2e'; x.fillRect(-8, -144, 16, 318)
  const arrow = (y, dir, text, col) => {
    x.save(); x.translate(0, y); x.rotate(dir * 0.06)
    x.fillStyle = INK; x.beginPath(); x.moveTo(dir * -20, -38); x.lineTo(dir * 150, -38); x.lineTo(dir * 192, 0); x.lineTo(dir * 150, 38); x.lineTo(dir * -20, 38); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(dir * -12, -30); x.lineTo(dir * 146, -30); x.lineTo(dir * 180, 0); x.lineTo(dir * 146, 30); x.lineTo(dir * -12, 30); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, dir * 80, 2)
    x.restore()
  }
  arrow(-90, 1, 'PLANNED', BONE)
  arrow(10, -1, 'SCENIC', lt > 1.2 ? MINT : BONE)
  x.restore()
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'libra', cap: 'Stuck on the menu? | *It’s all delicious.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: lt => lt > 1.5 ? [1, 0] : [Math.floor(lt * 3) % 2 ? 1 : 0, 1], star: { x: -170 }, hops: [1.55],
    front(x, t, lt, P) {
      menu(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, lt > 1.5 ? 'ORDERED!' : 'STILL READING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: lt > 1.5 ? MINT : LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two outfits, one hour? | *Both look great.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 }, hops: [1.45],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.globalAlpha = k; x.fillStyle = BONE; x.fillRect(640, 700, 300, 8); x.restore()
      drawBits(x, SHIRT, { K: BONE, S: '#7dc7ff' }, 710, 820, 18 * k, { rot: Math.sin(lt * 4) * 0.08 })
      drawBits(x, SHIRT, { K: BONE, S: '#ffb34a' }, 870, 820, 18 * k, { rot: -Math.sin(lt * 4) * 0.08 })
      label(x, 790, 1060, 'BOTH: CUTE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 840, P.t0 + 1.45, 7, 180, 0.3)
    } },
  { sign: 'libra', cap: 'Asked twelve friends? | *Your gut knew.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', ...S,
    front(x, t, lt, P) {
      const q = ['A or B?', 'A or B??', 'A OR B???']
      q.forEach((w, i) => bubble(x, 790 + (i - 1) * 30, 650 + i * 110, w, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2) * (1 - clamp((lt - 1.2) / 0.2)), { size: 34, col: LAV, tail: 'br' }))
      label(x, 790, 900, 'YOUR GUT: “B.”', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 42, bg: MINT, rot: -0.04 })
      label(x, 790, 1010, '(SINCE MONDAY)', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick a side? | *Fairness is a gift.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', ...S, hops: [1.35],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SCALES, SCALES_C, 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(lt * 3) * 0.06 * (1 - clamp((lt - 1.0) / 0.5)) })
      label(x, 790, 1090, 'PERFECTLY BALANCED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.5, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: 'libra', cap: 'Forty pros, forty cons? | *Go with the feeling.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', ...S,
    front(x, t, lt, P) {
      notepad(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, 'IT FEELS RIGHT', pop01(t, P.t0 + 1.55, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Sent the text? | *Stop re-reading it.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', ...S, hops: [1.55],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'sounds good!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 860, 820, 'SENT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 24, bg: BONE, rot: 0, font: MONO, weight: 700 })
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.0) * 8)
      label(x, 790, 940, lt > 1.5 ? 'PHONE: DOWN' : `RE-READ ×${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 38, bg: lt > 1.5 ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.5) sparkles(x, t, 790, 940, P.t0 + 1.55, 6, 150, 0.2)
    } },
  { sign: 'libra', cap: 'Bio still says “TBD”? | *Still lovable.*', mood: 'happy', ...S,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'NEW MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
  { sign: 'libra', cap: 'Picked the wrong road? | *Scenic route.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', ...S, hops: [1.25],
    front(x, t, lt, P) {
      signpost(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1130, 'ALSO LOVELY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Decision made? | *Now enjoy it.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', ...S, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
        x.fillStyle = MINT; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
        x.strokeStyle = INK; x.lineWidth = 22; x.lineCap = 'square'; x.beginPath(); x.moveTo(-50, 0); x.lineTo(-12, 40); x.lineTo(56, -40); x.stroke()
        x.restore()
      }
      label(x, 790, 1080, 'NO TAKE-BACKS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 870, P.t0 + 1.0, 8, 190, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0332', key: 'F', accent: ROSE, solo: 'libra', ending: 'lesson',
  title: 'Libra, decide. | *Don’t look back.*',
  cameos: CAMEOS,
  group: { cap: 'Fair heart. | *Brave choice.*', mood: 'heart' },
  lesson: { text: 'Chosen with love? | Then *it’s the right one.*', chip: 'STATUS: DECIDED' },
  last: {
    text: 'And the outfit? | *Wear both.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
