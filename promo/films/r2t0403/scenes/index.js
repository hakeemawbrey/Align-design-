// r2t0403: THE SIGNS AS… v3, SOLO film, "Taurus + a secret | be like." (topic: Tauruses keeping a secret; ~47 s vertical,
// signs3kit social cut, music: lofi · G). One sign the whole way: nine ways a Taurus keeps a secret, pushed to extreme.
// Ending: lesson.
//   0.0–3.6    "Taurus + a secret | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              asked to spill, took a bite · locked it in a vault, then sat on it · bribed with a donut, ate it, said
//              nothing · ten years later, still no · group chat begging, muted · tickled, immovable · buried it in the
//              garden · twenty questions, "snack" every time · it was your surprise party, kept perfectly
//  37.8        "Locked. Loyal. | *Lunch-motivated.*"
//  41.0        LESSON: "Tell a Taurus a secret. | It’s *safe forever.*"  VAULT: LOCKED
//  46.9        "Safer than | *their fries.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', PAPER = '#fff4e2', RED = '#e23d4e', BROWN = '#8a5a2e'

const SANDWICH = [
  '..BBBBBBBB..',
  '.BBBBBBBBBB.',
  'GGGGGGGGGGGG',
  'RRRRRRRRRRRR',
  'YYYYYYYYYYYY',
  '.BBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8b77e', G: GREEN, R: RED, Y: '#ffd23a' }
const DONUT = [
  '..PPPPPP..',
  '.PPWPPPWP.',
  'PPPP..PPPP',
  'PWP....PPP',
  'PPP....PWP',
  'PPPP..PPPP',
  '.DDDDDDDD.',
  '..DDDDDD..',
]
const DONUT_C = { P: PINK, W: '#fff', D: '#c98f5a' }
const FEATHER = [
  '......WW',
  '.....WWW',
  '....WWW.',
  '...WWW..',
  '..WWW...',
  '.WWW....',
  'S.......',
]
const HAT = [
  '....G....',
  '...PPP...',
  '...PYP...',
  '..PPPPP..',
  '..PYPYP..',
  '.PPPPPPP.',
  '.PYPPPYP.',
  'PPPPPPPPP',
]
const HAT_C = { G: GOLD, P: PINK, Y: '#fff' }

// a steel vault door with a dial
function vault(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -146, 272, 292)
  x.fillStyle = '#9aa5c4'; x.fillRect(-128, -138, 256, 276)
  x.fillStyle = '#c3cbe0'; x.fillRect(-112, -122, 224, 244)
  x.save(); x.rotate(t * 1.4); x.fillStyle = INK; x.fillRect(-46, -46, 92, 92); x.fillStyle = '#6b7590'; x.fillRect(-40, -40, 80, 80); x.fillStyle = GOLD; x.fillRect(-6, -40, 12, 30); x.restore()
  x.fillStyle = INK; for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) x.fillRect(a * 92 - 8, b * 102 - 8, 16, 16)
  x.restore()
}
// a phone with a growing unread badge and a mute bell
function chatPhone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -210, 260, 420)
  x.fillStyle = '#2a2350'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#140c30'; x.fillRect(-106, -172, 212, 344)
  x.font = `700 22px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const msgs = ['TELL US', 'pleeease', 'WHAT IS IT', '???']
  msgs.forEach((m, i) => { if (lt < 0.3 + i * 0.2) return; const w = x.measureText(m).width + 26; x.fillStyle = BONE; x.fillRect(-92, -150 + i * 62, w, 44); x.fillStyle = INK; x.fillText(m, -79, -128 + i * 62) })
  const n = Math.min(99, Math.floor(clamp((lt - 0.3) / 1.2) * 99))
  x.fillStyle = INK; x.fillRect(64, -230, 96, 56); x.fillStyle = RED; x.fillRect(68, -226, 88, 48)
  x.fillStyle = '#fff'; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillText(n >= 99 ? '99+' : String(n), 112, -201)
  if (lt > 1.5) {
    x.fillStyle = 'rgba(20,12,48,0.8)'; x.fillRect(-106, 80, 212, 92)
    x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.fillText('🔕︎ MUTED', 0, 126)
  }
  x.restore()
}
// a garden mound with a little shovel and a flag
function garden(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const dig = ease.outCubic(prog(lt, 0.4, 1.2))
  x.fillStyle = INK; x.fillRect(-156, 26 - 50 * dig, 312, 60 + 50 * dig)
  x.fillStyle = BROWN; x.fillRect(-150, 32 - 50 * dig, 300, 48 + 50 * dig)
  x.fillStyle = '#6b4220'; for (let i = 0; i < 6; i++) x.fillRect(-130 + i * 50, 44 - 40 * dig, 18, 10)
  // shovel
  x.save(); x.translate(130, -40); x.rotate(0.5 + 0.2 * Math.sin(t * 5) * (lt < 1.2 ? 1 : 0))
  x.fillStyle = INK; x.fillRect(-8, -130, 16, 140); x.fillStyle = '#c98f2a'; x.fillRect(-4, -126, 8, 132)
  x.fillStyle = INK; x.fillRect(-30, 0, 60, 60); x.fillStyle = '#c3cbe0'; x.fillRect(-26, 4, 52, 52)
  x.restore()
  if (lt > 1.3) { x.fillStyle = GREEN; x.fillRect(-60, -10 - 50 * dig, 8, 40); x.fillStyle = PINK; x.fillRect(-72, -26 - 50 * dig, 32, 24) }
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'taurus', cap: 'You begged them to spill. | They *took a bite.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      bubble(x, 780, 680, 'TELL ME!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'br' })
      bubble(x, 600, 820, 'mm-hm.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Locked it in a vault. | Then *sat on it.*', mood: 'sleepy', star: STAR,
    front(x, t, lt, P) {
      vault(x, t, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'SECURITY: TAURUS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bribed with a donut. | *Ate it.* Said nothing.', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: STAR, hops: [1.5],
    front(x, t, lt, P) {
      const gone = ease.inCubic(prog(lt, 1.2, 1.6))
      if (gone < 1) drawBits(x, DONUT, DONUT_C, lerp(800, 470, gone), lerp(980, 920, gone), 20 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 - gone))
      label(x, 800, 680, 'BRIBE: ACCEPTED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1110, 'SECRET: STILL SAFE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Ten years later? | *Still no.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      const y = Math.min(10, Math.floor(clamp((lt - 0.3) / 1.3) * 10))
      label(x, 790, 860, `YEAR ${y}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 70, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'nope.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'The group chat begged. | Taurus *muted it.*', mood: lt => lt > 1.5 ? 'sleepy' : 'neutral', look: [1, 0], star: STAR,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) { chatPhone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt) } },
  { sign: 'taurus', cap: 'You tried tickling. | *Immovable.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 0], star: STAR, squash: lt => 0.02 * Math.sin(lt * 30) * (lt > 0.6 && lt < 1.6 ? 1 : 0),
    front(x, t, lt, P, F) {
      drawBits(x, FEATHER, { W: '#ffffff', S: '#c3cbe0' }, F.x + 170 + 20 * Math.sin(t * 14), F.cy + 20, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.3 * Math.sin(t * 10) })
      label(x, 790, 680, 'NOT. A. WORD.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: RED, color: PAPER, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Buried it | in *the garden.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.4],
    front(x, t, lt, P) {
      garden(x, t, 750, 1040, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 700, 'PLANTED: 1 SECRET', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Twenty questions? | *“Snack.”* Every time.', mood: 'happy', look: [1, 0], star: STAR, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const q = Math.min(20, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 20))
      label(x, 790, 680, `QUESTION ${q}/20`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'snack.', pop01(t, P.t0 + 0.5, 0.25, 2.2) * (0.92 + 0.08 * Math.sin(lt * 14)), { size: 52, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'It was your surprise party. | *Kept. Perfectly.*', mood: lt => lt > 1.3 ? 'heart' : 'wink', look: [1, 0], star: STAR, hops: [1.3, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 20, F.top - 40, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 })
      label(x, 790, 800, 'SURPRISE!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.05 })
      sparkles(x, t, 790, 800, P.t0 + 1.25, 8, 200, 0.2)
      hearts(x, t, 790, 1000, P.t0 + 1.4, { n: 6, life: 1.6, spread: 260, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0403', key: 'G', accent: GREEN, solo: 'taurus', ending: 'lesson',
  title: 'Taurus + a secret | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Locked. Loyal. | *Lunch-motivated.*', mood: 'wink' },
  lesson: { text: 'Tell a Taurus a secret. | It’s *safe forever.*', chip: 'VAULT: LOCKED' },
  last: {
    text: 'Safer than | *their fries.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
