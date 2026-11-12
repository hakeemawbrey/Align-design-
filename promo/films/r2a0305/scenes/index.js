// r2a0305: star_advice, ADVICE ROLL CALL, "Each sign's | *ideal friend group.*" (~62 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each about the friends who fit them. Ending: lesson.
//   0.0–3.6    "Each sign's | *ideal friend group.*"
//   3.6–49.2   ♈ friends who say "let's go!" first · ♉ friends who always bring dessert · ♊ a group chat that never sleeps
//              · ♋ friends who ask about your mum · ♌ friends who hype you loudly · ♍ friends who show up on time
//              · ♎ friends who love a matching outfit · ♏ a small circle that keeps secrets · ♐ friends who say yes to the
//              road trip · ♑ friends who cheer your quiet wins · ♒ friends who love your weird ideas · ♓ friends who hold the tissues
//  49.2        "Find your people. | *Keep them close.*"
//  52.4        LESSON UNLOCKED: "The right friends | feel like *home.*"  GROUP: FOUND
//  58.3        "Group chat name? | *“The Twelve.”*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffc26b', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const PIE = ['......PP', '....PPCC', '..PPCCCC', 'PPCCRCCC', 'CCCCCCCC', 'KKKKKKKK']
const TEE = ['KKK..KKK', 'KTTKKTTK', 'KTTTTTTK', '.KTTTTK.', '.KTTTTK.', '.KTTTTK.', '.KKKKKK.']
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'KKKKKKKK', 'KYYYYYYK', 'KYYKKYYK', 'KYYYYYYK', 'KKKKKKKK']
const CAR = ['...KKKKKK....', '..KWWKWWWK...', 'KKKKKKKKKKKKK', 'KRRRRRRRRRRRK', 'KRRRRRRRRRRRK', 'KKGGKKKKKGGKK', '..GG.....GG..']
const TISSUE = ['...WW...', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBBWWBBK', 'KBBBBBBK', 'KKKKKKKK']

function phone(x, cx, cy, k, head, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -210, 280, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-130, -200, 260, 400)
  x.fillStyle = '#140c30'; x.fillRect(-118, -176, 236, 352)
  x.fillStyle = ACC; x.fillRect(-106, -162, 212, 50); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -136)
  rows.forEach(([txt, col, kk], i) => { if (kk <= 0.01) return; x.save(); x.translate(0, -54 + i * 72); x.scale(kk, kk); x.fillStyle = col; x.fillRect(-106, -27, 212, 54); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText(txt, 0, 2); x.restore() })
  x.restore()
}
function confetti(x, t, cx, cy, t0, { n = 18, spread = 220, h = 420 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => k > 0.01 && signChar(x, t, id, cx, cy, s * k, { look: [-1, 0], glyph: false, seed: 13, ...o })

const CAMEOS = [
  { sign: 'aries', cap: 'Friends who say | *“let’s go!” first.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'LET’S GO!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 54, col: '#ff8f6a', tail: 'br' })
      L(x, 790, 980, 'PLAN: NONE NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Friends who always | *bring dessert.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PIE, { P: '#d9a066', C: '#ffe7a8', R: RED, K: '#9aa5c4' }, 800, 880, 30 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 660, 'THIS IS LOVE', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.05, 34)
    } },
  { sign: 'gemini', cap: 'A group chat | *that never sleeps.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 770, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), 'THE CHAT', [
        ['3:02 am: lol', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['3:03: WAIT', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2.2)], ['3:04: same', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.2)]])
    } },
  { sign: 'cancer', cap: 'Friends who ask | *about your mum.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'libra', 820, 960, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'happy' })
      bubble(x, 790, 690, 'how’s your | mum doing?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      hearts(x, t, 560, 840, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Friends who | *hype you loudly.*', mood: 'sparkle', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      L(x, 790, 720, 'GO LEO!!', pop01(t, P.t0 + 0.3, 0.3, 2.4), ORANGE, -0.08, 60)
      L(x, 800, 900, 'ICON!', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, 0.06, 50)
      L(x, 780, 1070, 'LEGEND!', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 44)
    } },
  { sign: 'virgo', cap: 'Friends who show up | *on time.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 800); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 96, 0, 7); x.fill(); x.strokeStyle = INK; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -70); x.moveTo(0, 0); x.lineTo(0, 50); x.stroke(); x.restore() }
      L(x, 800, 1060, '7:00 SHARP ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Friends who love | *a matching outfit.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TEE, { K: INK, T: PINK }, 720, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.1 })
      drawBits(x, TEE, { K: INK, T: PINK }, 880, 860, 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.1 })
      L(x, 800, 1080, 'TWINNING', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 40)
    } },
  { sign: 'scorpio', cap: 'A small circle | that *keeps secrets.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      friend(x, t, 'cancer', 700, 1000, 150, k, { mood: 'happy', look: [0, 0] })
      friend(x, t, 'capricorn', 900, 1000, 150, k, { mood: 'happy', look: [0, 0], seed: 14 })
      drawBits(x, LOCK, { K: INK, Y: GOLD }, 800, 760, 20 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      L(x, 800, 1140, 'MEMBERS: 3. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Friends who say yes | *to the road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const drive = Math.sin(t * 9) * 4
      drawBits(x, CAR, { K: INK, W: SKYB, R: '#c58bff', G: '#4a4470' }, 800, 880 + drive, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'LEAVING: NOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 34)
      L(x, 800, 1090, 'SEATS: ALL TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Friends who cheer | *your quiet wins.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 760, 'FILED MY TAXES', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 36)
      confetti(x, t, 790, 860, P.t0 + 1.0)
      L(x, 800, 1000, 'PARTY!!', pop01(t, P.t0 + 1.0, 0.3, 2.6), PINK, 0.06, 56)
    } },
  { sign: 'aquarius', cap: 'Friends who love | *your weird ideas.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'a museum | of spoons?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 790, 940, 'I’M IN.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 52, col: MINT, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Friends who hold | *the tissues.*', mood: 'heart', tears: lt => lt < 1.0 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      friend(x, t, 'taurus', 820, 980, 200, k, { mood: 'heart' })
      drawBits(x, TISSUE, { K: INK, B: LAV, W: CREAM }, 700, 800, 24 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { rot: -0.1 })
      L(x, 800, 660, 'ON STANDBY ♥', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04)
    } },
]

const F = makeFilm({
  id: 'r2a0305', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s ideal | *friend group.*',
  cameos: CAMEOS,
  group: { cap: 'Find your people. | *Keep them close.*' },
  lesson: { text: 'The right friends | feel like *home.*', chip: 'GROUP: FOUND' },
  last: { text: 'Group chat name? | *“The Twelve.”*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
