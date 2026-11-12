// r2a0129: star_advice, ADVICE ROLLCALL, "Fell for a friend? | Each sign." (topic: Each sign falling for a friend) (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line each for when you're falling for a friend, one light gag each.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ just tell them, you're brave · ♉ go slow, the friendship holds · ♊ drafted it ten times (to Aquarius), send the true one
//              · ♋ scared to lose them? real ones stay · ♌ let them see the softer you · ♍ no perfect moment, now is fine
//              · ♎ choose what you want, for once · ♏ feel it deeply, let them in · ♐ your best adventure might be them
//              · ♑ no five-year plan needed, just coffee · ♒ friends first is your superpower · ♓ wrote vows already? start with hello
//  49.2        "Friends first. | *Feelings second.*"
//  52.4        LESSON: "Great love stories | often *start as friends.*"  BESTIE: +MORE
//  58.3        "Still best friends. | *Just more.*" over the match card: Gemini + Aquarius (the ten drafts, finally sent).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const CUP = ['.S.S...', 'S.S....', 'WWWWWW.', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCWWW', '.WWWW...']
const CUP_C = { S: '#c9d6f0', W: CREAM, C: BROWN }
const DOOR = ['FFFFFFFF', 'FDDDDDDF', 'FDDDDDDF', 'FDDDDDDF', 'FDDDDKDF', 'FDDDDDDF', 'FDDDDDDF', 'FDDDDDDF', 'FFFFFFFF']
function clock(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOW', 0, 40)
  x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(t * 3) * 70, -Math.cos(t * 3) * 70); x.stroke()
  x.restore()
}
function compass(x, t, cx, cy, k, aim) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 72, 0, Math.PI * 2); x.fill()
  x.rotate(aim); x.fillStyle = RED; x.beginPath(); x.moveTo(0, -64); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill(); x.fillStyle = INK; x.beginPath(); x.moveTo(0, 64); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Just tell them. | *You’re brave.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const full = lt > 1.2
      label(x, 790, 760, full ? 'COURAGE: FULL' : 'COURAGE: LOADING…', pop01(t, P.t0 + (full ? 1.2 : 0.2), 0.3, 2), { size: 38, bg: full ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'so… i like | you. a lot.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: ROSE, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Go slow. | *The friendship holds.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 720, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CUP, CUP_C, 880, 920, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { sx: -1 })
      label(x, 800, 1110, 'TEA NUMBER 300', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 820, P.t0 + 1.0, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Drafted it ten times? | *Send the true one.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 610, 'TO: AQUARIUS', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      const n = Math.min(10, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.1))
      label(x, 790, 1080, `DRAFT ${n}/10`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 850, lt < 1.3 ? 'hey so funny | story lol jk' : 'i really | like you', pop01(t, P.t0 + (lt < 1.3 ? 0.4 : 1.3), 0.25, 2.2), { size: 38, col: lt < 1.3 ? BONE : ROSE, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Scared to lose them? | *Real ones stay.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 900, 200 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 650, 'not going | anywhere', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bc' })
      label(x, 800, 1110, 'STILL HERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Let them see | *the softer you.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', star: { x: -190 },
    front(x, t, lt, P) {
      const off = lt > 1.0
      label(x, 790, 760, off ? 'SPOTLIGHT: OFF' : 'SPOTLIGHT: ON', pop01(t, P.t0 + (off ? 1.0 : 0.2), 0.3, 2.4), { size: 36, bg: off ? LAV : GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (off) bubble(x, 790, 960, 'i get | shy too', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: ROSE, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'No perfect moment. | *Now is fine.*', mood: lt => lt < 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      clock(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 640, 'PLAN v14', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1080, 'GOOD ENOUGH: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Pick what *you* want. | For once.', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 640, "✦ IT'S A MATCH?", pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 830, 'what do | you want?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: CREAM, tail: 'br' })
      bubble(x, 800, 1020, 'you. | (gulp)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, col: ROSE, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Feeling it deeply? | *Let them in.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const open = ease.inOutCubic(prog(lt, 0.8, 1.4))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.fillStyle = '#ffe7a8'; x.globalAlpha = open * k; x.fillRect(720, 760, 140, 250); x.restore() }
      drawBits(x, DOOR, { F: INK, D: '#c97bff', K: GOLD }, 790 - 60 * open, 885, 22 * k, { sx: 1 - 0.8 * open })
      label(x, 790, 1110, 'WALLS: DOWN (1)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Your best adventure | *might be them.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'leo', 860, 980, 170 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false })
      const aim = lt < 1.0 ? Math.sin(lt * 14) * 1.5 : lerp(Math.sin(14) * 1.5, 2.4, ease.outCubic(prog(lt, 1.0, 1.4)))
      compass(x, t, 700, 720, pop01(t, P.t0 + 0.35, 0.3, 2), aim)
      label(x, 790, 1150, 'DESTINATION: FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'No five-year plan needed. | *Just coffee.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const gone = lt > 1.1
      if (card(x, 790, 820, 280, 300, CREAM, pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - ease.inCubic(prog(lt, 1.0, 1.3))), 0.05)) {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('5-YEAR PLAN', 0, -100)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(-100, -60 + i * 34, 200 - (i * 31) % 70, 12)
        x.restore()
      }
      if (gone) drawBits(x, CUP, CUP_C, 790, 860, 22 * pop01(t, P.t0 + 1.25, 0.3, 2.2))
      label(x, 790, 1100, 'PLAN: COFFEE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Friends first? | *Your superpower.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'KNOWS YOUR WEIRD', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'LIKES IT', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'RARE COMBO ✦', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      sparkles(x, t, 790, 960, P.t0 + 1.25, 8, 200, 0.3)
    } },
  { sign: 'pisces', cap: 'Wrote the vows already? | *Start with hello.*', mood: lt => lt < 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 2 : 1, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const unroll = ease.outCubic(prog(lt, 0.2, 1.1))
      if (card(x, 790, 600 + 260 * unroll, 260, 60 + 520 * unroll, CREAM, pop01(t, P.t0 + 0.15, 0.3, 2), 0)) {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('MY VOWS', 0, -(30 + 260 * unroll) + 44)
        x.fillStyle = '#c9b8d8'; for (let i = 0; i < Math.floor(unroll * 11); i++) x.fillRect(-100, -(30 + 260 * unroll) + 76 + i * 40, 200 - (i * 37) % 80, 12)
        x.restore()
      }
      bubble(x, 520, 640, 'hi!', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 50, col: ROSE, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0129', key: 'E', accent: ROSE, ending: 'card',
  title: 'Fell for a friend? | *Each sign.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Friends first. | *Feelings second.*' },
  lesson: { text: 'Great love stories | often *start as friends.*', chip: 'BESTIE: +MORE' },
  last: { text: 'Still best friends. | *Just more.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
