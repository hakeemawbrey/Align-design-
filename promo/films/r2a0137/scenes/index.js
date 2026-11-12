// r2a0137: THE SIGNS AS… v3, SOLO advice film, "Pisces, you're doing | better than you think." (~45 s vertical, lofi · F)
// One Pisces (crying, always), nine cards: a relatable Pisces truth + a warm reframe, one visual gag each. Ending: 'callback'.
//   0.0–3.6    "Doing better than | you think, *Pisces.*"
//   3.6–37.8   cried at an ad, big heart · feel everything, superpower (a cape) · daydreamed all meeting, creating
//              · forgot to reply, they still love you · napped, that counts · said no, proud of you (medal)
//              · kept a plant alive · your horoscope says "you've got this" (read twice) · small step, still a step
//  37.8        "Soft heart. | *Strong soul.*"
//  41.2        callback: "Keep the *cape* on."  (the superpower cape from card 2 comes back, flapping)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', PIS = '#9a92ff', RED = '#e23d4e', WOOD = '#8a4a2e', GREEN = '#5fd068'

function sheet(x, cx, cy, w, h, k, { rot = 0, bg = BONE, head = null, headBg = RED, headInk = '#fff4e2', headSize = 30 } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) {
    x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
    x.fillStyle = headInk; x.font = `800 ${headSize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  }
  return true
}
// a red cape behind the star, flapping
function cape(x, t, cx, cy, s, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s / 300, k * s / 300)
  const f = Math.sin(t * 7) * 18
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, -60); x.lineTo(70, -60); x.lineTo(190 + f, 170); x.lineTo(-30 + f * 0.5, 200); x.closePath(); x.fill()
  x.fillStyle = RED; x.beginPath(); x.moveTo(-60, -52); x.lineTo(60, -52); x.lineTo(176 + f, 160); x.lineTo(-22 + f * 0.5, 186); x.closePath(); x.fill()
  x.fillStyle = '#ff6b7a'; x.beginPath(); x.moveTo(20, -52); x.lineTo(60, -52); x.lineTo(176 + f, 160); x.lineTo(130 + f, 166); x.closePath(); x.fill()
  x.restore()
}
const TV = [
  'KKKKKKKKKKKK',
  'KSSSSSSSSSSK',
  'KSSSHHSHHSSK',
  'KSSHHHHHHHSK',
  'KSSSHHHHHSSK',
  'KSSSSHHHSSSK',
  'KSSSSSHSSSSK',
  'KKKKKKKKKKKK',
  '....K..K....',
  '...KK..KK...',
]
const MEDAL = ['RR.RR', '.RRR.', '..R..', '.GGG.', 'GGWGG', 'GGGGG', '.GGG.']
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const POT = ['KKKKKKK', '.TTTTT.', '.TTTTT.', '..TTT..']
const STEP = ['.FF.', 'FFFF', 'FFFF', '.FF.', '....', '.FF.', '.FF.']
const tearsAll = lt => lt > 1.4 ? 2 : 1

const CAMEOS = [
  { sign: S, cap: 'Cried at an ad? | That\'s a *big heart.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 0.6 ? 3 : 1, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, { K: '#2a2350', S: SKYB, H: PINK }, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'IT WAS ABOUT SOCKS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
      label(x, 790, 1070, 'HEART SIZE: HUGE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'You feel everything? | That\'s a *superpower.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', tears: 1, star: { x: -100 }, hops: [1.2],
    back(x, t, lt, P, F) { cape(x, t, F.x - 20, F.cy - 30, 420, pop01(t, P.t0 + 0.7, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 760, 650, 'POWER: FEELINGS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 440, 880, P.t0 + 1.2, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Daydreamed all meeting? | You were *creating.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, -1], tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 720); x.scale(k, k)
        x.fillStyle = INK; for (const [a, b, r] of [[-90, 0, 90], [0, -40, 110], [100, 0, 90], [0, 40, 100]]) { x.beginPath(); x.arc(a, b, r + 6, 0, Math.PI * 2); x.fill() }
        x.fillStyle = BONE; for (const [a, b, r] of [[-90, 0, 90], [0, -40, 110], [100, 0, 90], [0, 40, 100]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
        x.fillStyle = LAV; x.fillRect(-60, -60, 40, 100); x.fillRect(20, -90, 40, 130); x.fillRect(-20, -30, 40, 70)
        x.fillStyle = PINK; x.beginPath(); x.moveTo(-60, -60); x.lineTo(-40, -100); x.lineTo(-20, -60); x.fill(); x.beginPath(); x.moveTo(20, -90); x.lineTo(40, -130); x.lineTo(60, -90); x.fill()
        x.restore()
        for (const [a, b, r] of [[600, 930, 18], [560, 980, 11]]) { x.fillStyle = BONE; x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
      }
      label(x, 800, 1060, 'MINUTES: 0 · CASTLES: 1', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Forgot to reply? | They *still love you.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: tearsAll, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (sheet(x, 790, 850, 240, 400, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05, bg: '#2a2350' })) {
        x.fillStyle = '#140c30'; x.fillRect(-104, -170, 208, 330)
        x.fillStyle = '#6b62a8'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('3 days ago', 0, -130)
        x.restore()
      }
      bubble(x, 790, 790, 'all good!! | love you', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 30, col: MINT, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Took a nap? | That *counts.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', tears: 1, star: { x: -170 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: '#e6dcff' }, 370, 1050, 26 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'REST: COMPLETED', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 920, '+10 TO EVERYTHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Said no for once? | *Proud of you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', tears: tearsAll, star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P, F) {
      bubble(x, 760, 660, 'no, thank you :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const d = ease.outCubic(prog(lt, 1.0, 1.5))
      if (lt > 1.0) drawBits(x, MEDAL, { R: RED, G: GOLD, W: '#fff4e2' }, lerp(800, F.x + 4, d), lerp(560, F.cy + 90, d), 16)
      sparkles(x, t, F.x, F.cy + 90, P.t0 + 1.5, 7, 140, 0.3)
      label(x, 790, 1060, 'BOUNDARY: SET', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Kept a plant alive? | *Look at you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POT, { K: INK, T: '#d8703a' }, 790, 1010, 30 * k)
      const g = ease.outCubic(prog(lt, 0.5, 1.6))
      if (k > 0.5) {
        x.fillStyle = INK; x.fillRect(782, 950 - 260 * g - 4, 20, 260 * g + 4); x.fillStyle = GREEN; x.fillRect(786, 950 - 260 * g, 12, 260 * g)
        for (let i = 0; i < 4; i++) if (g > 0.2 + i * 0.2) drawBits(x, ['.LL', 'LLL', 'LL.'], { L: GREEN }, 792 + (i % 2 ? 40 : -40), 920 - i * 60, 14, { sx: i % 2 ? 1 : -1 })
      }
      label(x, 790, 620, 'DAY 200', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your horoscope says | *you\'ve got this.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], tears: tearsAll, star: { x: -170 },
    front(x, t, lt, P) {
      if (sheet(x, 790, 840, 320, 360, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, bg: '#fff4e2', head: '♓︎ TODAY', headBg: PIS, headInk: INK })) {
        x.fillStyle = '#d8d0bf'; for (let j = 0; j < 3; j++) x.fillRect(-130, -80 + j * 40, 260 - j * 50, 20)
        if (lt > 1.1) { x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("you've", 0, 70); x.fillText('got this.', 0, 116) }
        x.restore()
      }
      label(x, 790, 610, 'READ: x2', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One small step? | Still a *step.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', tears: tearsAll, star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, STEP, { F: '#c9a6ff' }, 700, 1060, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.3 })
      label(x, 800, 760, 'STEP 1: DONE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 820, 940, 'tiny! | but mine.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0137', key: 'F', accent: PIS, solo: S, ending: 'callback',
  title: 'Doing better than | you think, *Pisces.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong soul.*', mood: 'sparkle' },
  last: {
    text: 'Keep the *cape* on.',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k <= 0.01) return
      cape(x, t, 520, 990, 420, pop01(t, t - lt + 0.8, 0.35, 2))
      signChar(x, t, S, 540, 1020, 300 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', seed: 40, hops: [t - lt + 1.4], tears: 1 })
      sparkles(x, t, 540, 1000, t - lt + 1.4, 8, 230, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
