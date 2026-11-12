// r2a0456: star_advice, ADVICE SOLO (libra), "Signs a Libra | *likes you.*" (signs3kit social cut, music: lofi · D).
// Ending: lesson (LESSON UNLOCKED, then the last line). No match card.
//   lets you pick the restaurant (huge honour) · a very specific compliment · asks your opinion and uses it · a playlist
//   named after you · asks your sign, then your rising · can't decide anything except you · redid the room for your visit
//   · introduced you to all their friends · split the dessert perfectly in half.
//   group "Charming everyone. | Choosing you."  lesson "Pick the place sometimes. | They'll feel so loved."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff9cc8', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

/** a pixel phone screen with a header and rows */
function phone(x, cx, cy, k, { head = '', headCol = MINT, rows = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.font = `700 28px ${MONO}`; const w = x.measureText(txt).width + 28
    x.save(); x.translate(-112, -70 + i * 70); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 14, 2)
    x.restore()
  })
  x.restore()
}
/** a menu card */
function menu(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  const W = 280, H = 340
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = '#7a2e4a'; x.fillRect(-W / 2, -H / 2, W, H)
  x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-W / 2 + 16, -H / 2 + 16, W - 32, H - 32)
  x.fillStyle = GOLD; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -H / 2 + 62)
  x.fillStyle = 'rgba(242,199,92,0.6)'; for (let i = 0; i < 5; i++) x.fillRect(-90, -50 + i * 40, i % 2 ? 140 : 180, 10)
  x.restore()
}
const CAKE = ['..PPPPPPPPPP..', '.PWPWPWPWPWPW.', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB', 'PPPPPPPPPPPPPP', 'BBBBBBBBBBBBBB', 'BBBBBBBBBBBBBB']
const CAKE_C = { P: PINK, W: CREAM, B: '#c98f5a' }
const PLATE = ['WWWWWWWWWWWWWWWWWWWW', '.WWWWWWWWWWWWWWWWWW.']
const LAMP = ['..YYYYYYY..', '.YYYYYYYYY.', 'YYYYYYYYYYY', '.....K.....', '.....K.....', '.....K.....', '.....K.....', '...KKKKK...']
const LAMP_C = { Y: GOLD, K: INK }
const PLANT = ['....L.L....', '...LL.LL...', '..LLL.LLL..', '...LLLLL...', '.....L.....', '.TTTTTTTTT.', '..TTTTTTT..', '...TTTTT...']
const PLANT_C = { L: '#5fd068', T: '#d9774a' }
const FRAME = ['KKKKKKKKK', 'KPPPPPPPK', 'KPSSSSSPK', 'KPSHHSSPK', 'KPSSSSSPK', 'KPPPPPPPK', 'KKKKKKKKK']
const FRAME_C = { K: GOLD, P: PINK, S: SKYB, H: CREAM }

const S = 'libra', ST = { x: -170 }
const CAMEOS = [
  // 1 · lets you pick
  { sign: S, cap: 'Lets you pick the place? | *A huge honour.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      menu(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 640, 'you choose ♡', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1120, 'TRUST: MAXIMUM', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  // 2 · a specific compliment
  { sign: S, cap: 'Compliments you. | *Very specifically.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'that blue? | on YOU? art.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 790, 980, 'NOTICED: EVERYTHING', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 30)
      sparkles(x, t, 790, 700, P.t0 + 0.4, 7, 190, 0.2)
    } },
  // 3 · asks your opinion
  { sign: S, cap: 'Asks your opinion. | *Then uses it.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'what do | YOU think?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 900, 'done. your way.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      L(x, 790, 1110, 'YOUR VOTE: COUNTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  // 4 · a playlist named after you
  { sign: S, cap: 'Made a playlist. | *Named it after you.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♪ FOR YOU', headCol: ACC, rows: [
        ['track 1 ♡', LAV, pop01(t, P.t0 + 0.5, 0.2, 2)], ['track 2 ♡', MINT, pop01(t, P.t0 + 0.7, 0.2, 2)], ['track 3 ♡', GOLD, pop01(t, P.t0 + 0.9, 0.2, 2)], ['…track 48', SKYB, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
      notes(x, t, 790, 640, { n: 4, cell: 7, col: ACC, alpha: clamp((lt - 0.4) * 2) })
    } },
  // 5 · Align: your sign, then your rising
  { sign: S, cap: 'Asks your sign. | Then *your rising.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'and your | rising??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      const ok = lt > 1.2
      L(x, 790, 900, ok ? '✦ COMPATIBLE ✦' : 'CHECKING…', pop01(t, P.t0 + 0.7, 0.3, 2), ok ? MINT : LAV, 0.04, 36)
      if (ok) hearts(x, t, 790, 900, P.t0 + 1.25, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  // 6 · can't decide anything, except you
  { sign: S, cap: 'Can’t decide anything. | *Except you.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 720, 640, 'tea?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 880, 760, 'coffee??', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      L(x, 790, 1060, 'YOU: OBVIOUSLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, -0.04, 38)
    } },
  // 7 · redid the room
  { sign: S, cap: 'Redid their whole room | *for your visit.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAMP, LAMP_C, 700, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PLANT, PLANT_C, 890, 960, 16 * pop01(t, P.t0 + 0.45, 0.3, 2))
      drawBits(x, FRAME, FRAME_C, 800, 660, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 1130, 'VIBE: CURATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  // 8 · introduced you to everyone
  { sign: S, cap: 'Introduced you to friends. | *All of them.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.3) + 1)
      const IDS = ['gemini', 'leo', 'aquarius', 'sagittarius', 'aries']
      for (let i = 0; i < n; i++) signChar(x, t, IDS[i], 640 + (i % 3) * 140, 760 + Math.floor(i / 3) * 180, 120, { pop: pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), seed: 30 + i, glyph: false })
      L(x, 790, 1130, 'FRIENDS MET: 47', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 34)
    } },
  // 9 · split the dessert
  { sign: S, cap: 'Shares dessert. | *Perfectly halved.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sp = ease.outCubic(prog(lt, 0.8, 1.2)) * 40
      drawBits(x, PLATE, { W: CREAM }, 790, 1010, 16 * k)
      x.save(); x.beginPath(); x.rect(0, 0, 790, 1920); x.clip(); drawBits(x, CAKE, CAKE_C, 790 - sp, 940, 18 * k); x.restore()
      x.save(); x.beginPath(); x.rect(790, 0, 400, 1920); x.clip(); drawBits(x, CAKE, CAKE_C, 790 + sp, 940, 18 * k); x.restore()
      L(x, 790, 690, '50 / 50 ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, -0.04, 42)
    } },
]

const F = makeFilm({
  id: 'r2a0456', key: 'D', accent: ACC, solo: S,
  title: 'Signs a Libra | *likes you.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Charming everyone. | *Choosing you.*', mood: 'heart' },
  lesson: { text: 'Pick the place sometimes. | They’ll *feel so loved.*', chip: 'BALANCE: FOUND' },
  last: { text: 'Fair is fair. | *Half is yours.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
