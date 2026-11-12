// r2a0081: star_advice, ADVICE SOLO, "Pisces, your people | will stay." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Pisces truth + a warm reframe, one gag each.
// Pisces cries in every card (the house rule), mostly happy tears by the end.
//   0.0–3.6    "Pisces, your people | *will stay.*"
//   3.6–37.8   nine cards (3.8 s each):
//              over-explained (a scroll of a text) → "all good!" · cancelled plans → they rescheduled
//              · felt too much → a friend with spare tissues · daydreamed mid-chat → "take your time"
//              · an eleven-minute voice note → listened to all of it · remembers every birthday → someone remembered theirs
//              · a weird dream → "and THEN?" · a match saw the sad playlist → added a song · people drift → the right ones float back
//  37.8        "Too much? | *Just enough.*"  Pisces comes back, big.
//  41.0        LESSON UNLOCKED: "Be fully you. | The right ones *stay.*"  STATUS: KEPT
//  46.9        "Still crying. | *Happy tears now.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', SEA = '#8fb8ff', CREAM = '#fff4e2', RED = '#e23d4e'

function phone(x, cx, cy, k, { head = 'MESSAGES', headCol = LAV, draw } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132)
  if (draw) draw(x)
  x.restore()
}
function chip(x, cx, cy, txt, col, k, size = 24) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
  x.fillStyle = col; x.fillRect(-w / 2, -size, w, size * 2); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
  x.restore()
}
const TISSUE = [
  '...WWW....',
  '..WWWWW...',
  'BBBBBBBBBB',
  'BPPPPPPPPB',
  'BPPBBBBPPB',
  'BPPPPPPPPB',
  'BBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: '#6fc3ff', P: '#bfe6ff' }
const CAKE = [
  '....F....',
  '....C....',
  '.PPPPPPP.',
  'PWPWPWPWP',
  'PPPPPPPPP',
  'CCCCCCCCC',
  'PPPPPPPPP',
]
const CAKE_C = { F: GOLD, C: CREAM, P: PINK, W: '#fff' }
const BOAT = [
  '.....M......',
  '.....MSS....',
  '.....MSSS...',
  '.....MSSSS..',
  '.....M......',
  'HHHHHHHHHHHH',
  '.HHHHHHHHHH.',
  '..HHHHHHHH..',
]
const BOAT_C = { M: '#8a4a2e', S: CREAM, H: '#ff9a4a' }
const FISH = ['..GG...', '.GGGG.G', 'GWGGGGG', '.GGGG.G', '..GG...']
function cloud(x, cx, cy, k, w = 260) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK
  for (const [dx, dy, r] of [[-w * 0.3, 10, 64], [0, -20, 84], [w * 0.3, 10, 64]]) { x.beginPath(); x.arc(dx, dy, r + 6, 0, Math.PI * 2); x.fill() }
  x.fillStyle = CREAM
  for (const [dx, dy, r] of [[-w * 0.3, 10, 64], [0, -20, 84], [w * 0.3, 10, 64]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function waves(x, t, y, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k; x.fillStyle = '#3d6fd6'
  x.beginPath(); x.moveTo(110, 1240)
  for (let i = 0; i <= 40; i++) x.lineTo(110 + i * 21.5, y + Math.sin(t * 2.4 + i * 0.6) * 10)
  x.lineTo(970, 1240); x.closePath(); x.fill(); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You over-explain. | *They already get it.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', tears: 2, star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { draw(x) {
        const n = Math.min(7, Math.floor(prog(lt, 0.2, 1.2) * 7))
        x.fillStyle = SEA; for (let i = 0; i < n; i++) x.fillRect(-90, -90 + i * 26, i === n - 1 ? 110 : 180, 16)
        chip(x, -10, 120, 'all good! ♥', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2), 26)
      } })
    } },
  { sign: S, cap: 'Cancelled plans? | *Real friends reschedule.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', tears: lt => lt > 1.4 ? 1 : 2, star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -150, 280, 300); x.fillStyle = CREAM; x.fillRect(-132, -142, 264, 284)
        x.fillStyle = PINK; x.fillRect(-132, -142, 264, 60)
        x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLANS', 0, -112)
        x.font = `800 44px ${INTER}`; x.fillText('FRI', -60, -10); x.fillText('SAT', 60, -10)
        x.fillStyle = RED; x.fillRect(-110, -14, 100, 8)
        if (lt > 1.2) { x.strokeStyle = '#2fc79a'; x.lineWidth = 8; x.beginPath(); x.arc(60, -10, 52, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      label(x, 790, 1080, 'STILL ON ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Felt too much? | They *brought tissues.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: 3, star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.0] })
      drawBits(x, TISSUE, TISSUE_C, 790, 740, 20 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.08 })
      label(x, 790, 1160, 'SPARE TISSUES: ∞', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Drifted off mid-chat? | *They waited.*', mood: lt => lt < 1.3 ? 'sleepy' : 'sparkle', tears: 1, look: [1, -1], star: { x: -200 },
    front(x, t, lt, P) {
      const c = pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - prog(lt, 1.2, 1.4))
      cloud(x, 560, 620, c * 0.9)
      if (c > 0.3) { drawBits(x, FISH, { G: GOLD, W: '#fff' }, 520 + 30 * Math.sin(t * 3), 610, 10 * c); drawBits(x, FISH, { G: PINK, W: '#fff' }, 610, 640 + 10 * Math.sin(t * 4), 8 * c, { sx: -1 }) }
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 980, 180 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 790, 760, 'take your | time ♥', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Eleven-minute voice note? | *Heard every second.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: 2, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'VOICE NOTE', headCol: SKYB, draw(x) {
        x.fillStyle = SEA
        const play = prog(lt, 0.4, 1.6)
        for (let i = 0; i < 14; i++) { const h = 14 + 40 * Math.abs(Math.sin(i * 1.7)); x.fillStyle = i / 14 < play ? GOLD : SEA; x.fillRect(-96 + i * 14, -10 - h / 2, 9, h) }
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('11:42', 0, 60)
        chip(x, 0, 130, 'loved it ♥', MINT, pop01(t, P.t0 + 1.7, 0.25, 2.2), 26)
      } })
    } },
  { sign: S, cap: 'You remember birthdays. | *They remembered yours.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: 3, star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 950, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 680, 'happy birthday, | Pisces!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 8, 150, 0.2)
    } },
  { sign: S, cap: 'Shared your weird dream? | They asked *for part two.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', tears: 1, star: { x: -200 },
    front(x, t, lt, P) {
      const c = pop01(t, P.t0 + 0.2, 0.3, 2)
      cloud(x, 790, 760, c)
      if (c > 0.3) {
        x.save(); x.fillStyle = GOLD; x.beginPath(); x.arc(760, 740, 34 * c, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(778, 728, 30 * c, 0, Math.PI * 2); x.fill(); x.restore()
        drawBits(x, FISH, { G: PINK, W: '#fff' }, 850 + 14 * Math.sin(t * 3), 770, 9 * c)
      }
      bubble(x, 790, 1040, 'and THEN??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Your sad playlist? | Your match *added a song.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: 2, star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: '✦ YOUR MATCH', headCol: MINT, draw(x) {
        x.fillStyle = BONE; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('SAD SONGS', 0, -70); x.font = `700 40px ${MONO}`; x.fillStyle = GOLD; x.fillText(lt > 1.3 ? '48' : '47', 0, -10)
        chip(x, 0, 90, '+1 from your match', PINK, pop01(t, P.t0 + 1.3, 0.25, 2.2), 20)
      } })
      hearts(x, t, 620, 1000, P.t0 + 1.5, { n: 5, life: 1.5, spread: 120, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Some people drift. | *The right ones float back.*', mood: lt => lt > 1.6 ? 'heart' : 'sparkle', tears: 2, star: { x: -200, y: -40 },
    back(x, t, lt, P) { waves(x, t, 1110, pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.7))
      drawBits(x, BOAT, BOAT_C, lerp(930, 740, p), 1060 + 6 * Math.sin(t * 2.4), 13 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 2) })
      label(x, 760, 700, 'WELCOME BACK', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0081', key: 'D', accent: '#b7a6ff', solo: S, ending: 'lesson',
  title: 'Pisces, your people | *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Too much? | *Just enough.*', mood: 'heart' },
  lesson: { text: 'Be fully you. | The right ones *stay.*', chip: 'STATUS: KEPT' },
  last: {
    text: 'Still crying. | *Happy tears now.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
