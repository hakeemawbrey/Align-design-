// r2a0231: star_advice, ADVICE SOLO, "How to apologise | to a Virgo." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a true thing about Virgo + a warm way to say sorry.
//   0.0–3.6    "How to apologise | *to a Virgo.*"
//   3.6–37.8   nine cards (3.8 s each):
//              name the exact thing (the magnifier) · bring a plan, not just sorry · give them time to sort it (folders)
//              · a tidy gesture says a lot (dishes) · let them edit your apology (red pen) · ask, then really listen
//              · they're hardest on themselves (a gold star) · follow through next week too · they forgive slowly,
//              then completely
//  37.8        "Say it right. | *They melt.*"  Virgo comes back, big.
//  41.2        callback: "Your apology? | *Graded A+.*"  the red-pen note comes back with an A+.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, bar, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN } from './props.js'

const VIR = '#ef5c94'
const S = 'virgo', ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const FOLDER = ['KKKK......', 'KCCCKKKKKK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KKKKKKKKKK']
const STAR = ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YY...YY.']

/** a magnifying glass (lens at cx, cy) */
function magnifier(x, cx, cy, r, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(0.7); x.fillStyle = INK; x.fillRect(-14, r - 4, 28, r * 1.1); x.fillStyle = '#8a4a2e'; x.fillRect(-8, r, 16, r * 1.05); x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, Math.PI * 2); x.fill()
  x.fillStyle = GREY; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(190,230,255,0.35)'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-r * 0.55, -r * 0.55, r * 0.3, r * 0.14)
  x.restore()
}
/** the apology note; edits 0…1 draws the red-pen corrections; grade shows an A+ */
function note(x, cx, cy, k, edits, grade = 0) {
  card(x, cx, cy, 300, 250, k, { bg: CREAM, rot: -0.04 }, () => {
    txt(x, 'I’m sorry', 0, -40, { size: 46 })
    txt(x, 'about that.', 0, 20, { size: 34, weight: 700 })
    if (edits > 0) {
      x.save(); x.globalAlpha = clamp(edits * 3)
      txt(x, '^ so', -80, -88, { size: 30, color: RED, weight: 800 })
      x.fillStyle = RED; x.fillRect(-90, 20, 180 * clamp(edits * 2 - 0.5), 5)
      txt(x, 'the dishes.', 0, 74, { size: 32, color: RED, weight: 800 })
      x.restore()
    }
    if (grade > 0.01) { x.save(); x.translate(130, 110); x.rotate(0.2); x.scale(grade, grade); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 56, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); txt(x, 'A+', 0, 4, { size: 48, color: BONE }); x.restore() }
  })
}

const CAMEOS = [
  { sign: S, cap: 'Name the exact thing. | They’ll *feel seen.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 300, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'sorry about', 0, -30, { size: 30, weight: 700 }); txt(x, 'TUES, 3:14 PM', 0, 22, { size: 28, ...M, color: RED }) })
      magnifier(x, 800 + 20 * Math.sin(t * 2), 1080, 55, pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 790, 700, 'DETAIL: CORRECT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Bring a plan, | not just *sorry.*', mood: lt => lt > 1.7 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 300, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'THE PLAN', 0, -120, { size: 30, ...M })
        for (let i = 0; i < 3; i++) {
          x.fillStyle = INK; x.fillRect(-120, -64 + i * 70, 40, 40); x.fillStyle = CREAM; x.fillRect(-114, -58 + i * 70, 28, 28)
          if (lt > 0.8 + i * 0.35) { x.fillStyle = GREEN; x.fillRect(-110, -54 + i * 70, 20, 20) }
          x.fillStyle = GREY; x.fillRect(-60, -52 + i * 70, 170, 16)
        }
      })
      sparkles(x, t, 790, 900, P.t0 + 1.9, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Give them time. | They’re *sorting it.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 3 - 1, 0], star: ST,
    front(x, t, lt, P) {
      const F = [['HURT', '#ff8fb1'], ['FINE', MINT], ['SNACKS', GOLD]]
      F.forEach(([s, c], i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2); drawBits(x, FOLDER, { K: INK, C: c }, 790, 680 + i * 170, 15 * k); label(x, 790, 700 + i * 170, s, k, { size: 26, bg: CREAM, rot: 0, ...M }) })
    } },
  { sign: S, cap: 'A tidy gesture | says *a lot.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2); if (k < 0.01) continue; x.save(); x.translate(790, 1060 - i * 30); x.scale(k, k * 0.5); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 118, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8eefc'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 790, 780, 'DISHES: DONE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, ...M })
      sparkles(x, t, 790, 960, P.t0 + 1.1, 7, 150, 0.4, [BONE, SKYB, '#ffffff'])
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Let them edit | your apology. *It’s love.*', mood: lt => lt > 1.7 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) { note(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.8, 1.6)) } },
  { sign: S, cap: 'Ask how they are. | *Then really listen.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = s => pop01(t, P.t0 + s, 0.25, 2)
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ YOUR MATCH', headCol: PINK, lines: [['how are you,', CREAM, a(0.5)], ['really?', CREAM, a(0.7)], ['okay. point 1:', MINT, a(1.2)], ['i’m all ears', GOLD, a(1.7)]], size: 24 })
    } },
  { sign: S, cap: 'They’re hardest | on *themselves.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      card(x, 790, 900, 260, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'ME:', 0, -40, { size: 32, ...M }); txt(x, lt > 1.2 ? '10/10' : '6/10', 0, 20, { size: 52, color: lt > 1.2 ? GREEN : RED }) })
      drawBits(x, STAR, { Y: GOLD }, 890, 800, 14 * pop01(t, P.t0 + 1.1, 0.3, 2.4), { rot: 0.2 })
      bubble(x, 790, 650, 'you’re doing great', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Follow through. | *Next week too.*', mood: lt => lt > 1.8 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = VIR; x.fillRect(-165, -150, 330, 60); txt(x, 'NEXT WEEK', 0, -120, { size: 28, ...M, color: BONE })
        for (let i = 0; i < 7; i++) {
          const cx = -120 + (i % 4) * 80, cy = -40 + Math.floor(i / 4) * 100
          x.fillStyle = '#e6dccb'; x.fillRect(cx - 32, cy - 32, 64, 64)
          if (lt > 0.6 + i * 0.18) { x.fillStyle = GREEN; x.fillRect(cx - 18, cy, 12, 12); x.fillRect(cx - 6, cy + 10, 12, 12); x.fillRect(cx + 6, cy - 2, 12, 12); x.fillRect(cx + 16, cy - 14, 12, 12) }
        }
      })
    } },
  { sign: S, cap: 'They forgive slowly. | Then *completely.*', mood: lt => lt > 1.9 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.9))
      bar(x, 790, 940, pop01(t, P.t0 + 0.2, 0.3, 2), p, p >= 1 ? 'FORGIVEN ♥' : 'FORGIVING…', { col: p >= 1 ? PINK : MINT, w: 300 })
      hearts(x, t, 790, 860, P.t0 + 2.0, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0231', key: 'D', accent: VIR, solo: S, ending: 'callback',
  title: 'How to apologise | *to a Virgo.*',
  cameos: CAMEOS,
  group: { cap: 'Say it right. | *They melt.*', mood: 'heart' },
  last: {
    text: 'Your apology? | *Graded A+.*',
    draw(x, t, lt) {
      const t0 = t - lt
      note(x, 690, 1110, 1.45 * pop01(t, t0 + 0.3, 0.45, 1.8), 1, ease.outBack(prog(lt, 1.0, 1.35)))
      const k = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 320, 1120, 240 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 44, hops: [t0 + 1.4] })
      hearts(x, t, 320, 980, t0 + 1.5, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
