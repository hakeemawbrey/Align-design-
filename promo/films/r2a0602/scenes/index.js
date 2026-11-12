// r2a0602: star_advice, ADVICE SOLO (leo), "Leo, here's your | *Sunday reset.*" (signs3kit social cut, music: lofi · F).
// Nine cards, a relatable Leo truth + a warm reframe: you hyped everyone all week, now hype you · phone on silent
// · face mask on, still iconic · rest is recharging (roar battery) · cancel one plan, still loved · write down a small
// win · let someone else shine · a dramatic bubble bath · early night, Monday needs its star.
// Ending: group. "Rested Leo. | *Brighter* week."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }, SG = 'leo'
const CUKE = ['..GGGG..', '.GLLLLG.', 'GLLWWLLG', 'GLWLLWLG', 'GLWLLWLG', 'GLLWWLLG', '.GLLLLG.', '..GGGG..']
const CUKE_C = { G: '#2f8a48', L: '#bff0a0', W: '#e8ffd8' }
const TUB = ['K..............K', 'KWWWWWWWWWWWWWWK', 'KWWWWWWWWWWWWWWK', '.KWWWWWWWWWWWWK.', '..KWWWWWWWWWWK..', '...K........K...']
const TUB_C = { K: INK, W: '#ffffff' }

function foam(x, t, cx, cy, { n = 14, w = 300 } = {}) {
  x.save()
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.35 + i * 0.173) % 1 + 1) % 1
    const px = cx + ((i * 61) % w) - w / 2 + Math.sin(t * 2 + i) * 10, py = cy - ph * 260, r = 10 + (i % 3) * 7
    x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 3, 0, Math.PI * 2); x.fill()
    x.fillStyle = i % 2 ? '#ffffff' : '#ffd6e6'; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'Hyped everyone all week? | Now *hype you.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 800, 840, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 800, 650, 'you’re doing great!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
      L(x, 800, 1060, 'AUDIENCE: YOU ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'Phone on silent. | The world *can wait.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.max(0, 47 - Math.floor(clamp((lt - 0.3) / 1.0) * 47))
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `ALERTS: ${n}`, headCol: n ? RED : MINT, size: 26, lines: [[n ? 'pls reply' : 'shh…', BONE, 1, false]] })
      L(x, 800, 1100, 'SILENT MODE ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: SG, cap: 'Face mask on. | Still *iconic.*', mood: 'sleepy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, CUKE, CUKE_C, F.x - 52, F.cy - 4, 7 * k)
      drawBits(x, CUKE, CUKE_C, F.x + 52, F.cy - 4, 7 * k)
      bubble(x, 800, 700, 'glowing, obviously', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
      L(x, 800, 1000, 'SPA: IN SESSION', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Rest isn’t lazy. | It’s *recharging.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.3)
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BATT', 800, 840, 22 * k)
      if (k > 0.9) { x.fillStyle = p < 0.5 ? '#ffb34a' : MINT; x.fillRect(800 - 6.5 * 22 + 22, 840 - 2.5 * 22 + 22, (10 * 22) * p, 3 * 22) }
      L(x, 800, 1040, `ROAR LEVEL: ${Math.round(12 + p * 88)}%`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: SG, cap: 'Cancel one plan. | You’re *still* loved.', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'SUNDAY', headBg: ACC, headInk: INK, lines: ['brunch', 'brunch #2', ['nap ✓', '#2f8a48']], size: 34 })
      if (lt > 0.8) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; const p = clamp((lt - 0.8) / 0.3); x.beginPath(); x.moveTo(700, 816); x.lineTo(700 + 200 * p, 810); x.stroke(); x.restore() }
      L(x, 770, 1080, 'FRIENDS: STILL OBSESSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: SG, cap: 'Write down a win. | Yes, *a small one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'THIS WEEK’S WINS', headBg: GOLD, headInk: INK, align: 'left', lines: ['✓ made toast', '✓ watered plant', '✓ was lovely'], size: 30, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1080, 'STANDING OVATION', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
      sparkles(x, t, 800, 830, P.t0 + 1.5, 7, 200, 0.6)
    } },
  { sign: SG, cap: 'Let someone else | *shine* for once.', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.5) { x.save(); x.globalAlpha = 0.25 * clamp((k - 0.5) * 2); x.fillStyle = '#fff3c0'; x.beginPath(); x.moveTo(800, 560); x.lineTo(680, 1020); x.lineTo(920, 1020); x.closePath(); x.fill(); x.restore() }
      friend(x, t, 'virgo', 800, 920, 190, k, { mood: 'sparkle', look: [-1, 0], seed: 36, hops: [P.t0 + 1.2] })
      L(x, 800, 1110, 'SUPPORTING ROLE ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Bubble bath? | *Dramatic* bubble bath.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt > 0.4) foam(x, t, 800, 960, { n: 10 + Math.floor(clamp(lt / 1.6) * 14), w: 320 })
      drawBits(x, TUB, TUB_C, 800, 990, 22 * k)
      L(x, 800, 660, 'BUBBLES: EXCESSIVE', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: SG, cap: 'Early night. | Monday needs its *star.*', mood: 'sleepy', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 140, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 820, 760, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      zzz(x, t, F.x + 90, F.cy - 110)
      L(x, 800, 1040, 'CURTAIN CALL: 9 PM', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0602', key: 'F', accent: ACC, solo: SG, ending: 'group',
  title: 'Leo, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Rested Leo. | *Brighter* week.', mood: 'sparkle',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 1.0, 10, 300, 0.5); hearts(x, t, 540, 760, t - lt + 1.4, { n: 8, life: 2.2, spread: 520, cell: 7, seed: 8 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
