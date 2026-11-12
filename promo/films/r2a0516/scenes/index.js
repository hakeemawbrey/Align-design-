// r2a0516: star_advice, ADVICE SOLO, "What Scorpios need | *on a bad day.*" (~51 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole way: nine kind truths for a Scorpio's rough day, each with one small visual gag.
// Ending: lesson.
//   0.0–3.6    "What Scorpios need | *on a bad day.*"
//   3.6–37.8   the cave is valid · someone asks "you ok?", let them care · snacks first, feelings second
//              · one person gets the whole story · silence is recharging · intense day, intense nap
//              · revenge playlist? make it a dance one · your chart says rest · let one friend in: they brought soup
//  37.8        "Deep feelings. | *Soft landing.*"
//  41.0        LESSON: "Bad days end. | *You rise.*"  MOOD: MENDING
//  46.9        "Tomorrow? | *Fully charged.*"  (the battery from the silence card, full)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#c97bff', GREY = '#9aa5c4', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

const FORT = [
  '......BB......',
  '.....BBBB.....',
  '....BbBBbB....',
  '...BBBBBBBB...',
  '..BbBBKKBBbB..',
  '.BBBBKKKKBBBB.',
  'BBbBBKKKKBBbBB',
  'BBBBBKKKKBBBBB',
]
const FORT_C = { B: '#6b62a8', b: '#c9a6ff', K: '#140c30' }
const MUG = ['.S.S...', '..S.S..', 'MMMMM..', 'MmMMMMM', 'MMMMM.M', 'MMMMMMM', 'MMMMM..', '.MMM...']
const BOWL = ['.y.o.y.o.y.', 'oyoyoyoyoyo', 'WWWWWWWWWWW', '.WWWWWWWWW.', '..WWWWWWW..', '...WWWWW...']
const SOUP = ['..S...S..', '...S.S...', 'OOOOOOOOO', 'WWWWWWWWW', '.WWWWWWW.', '..WWWWW..']
const DIARY = ['RRRRRRRR', 'RrRRRRRR', 'RRRRRRGG', 'RRRRRRGg', 'RRRRRRGG', 'RRRRRRRR', 'RrRRRRRR', 'RRRRRRRR']
const KEY = ['.GGG.....', 'G...GGGGG', '.GGG..G.G']
const PILLOW = ['.PPPPPPPPPP.', 'PPpPPPPPPpPP', 'PPPPPPPPPPPP', 'PPpPPPPPPpPP', '.PPPPPPPPPP.']

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
// a pixel battery that fills to p (0…1)
function battery(x, cx, cy, k, p, col = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -60, 220, 120); x.fillRect(110, -24, 22, 48)
  x.fillStyle = BONE; x.fillRect(-100, -50, 200, 100); x.fillRect(110, -16, 14, 32)
  x.fillStyle = '#140c30'; x.fillRect(-90, -40, 180, 80)
  const n = Math.round(clamp(p) * 5)
  for (let i = 0; i < n; i++) { x.fillStyle = col; x.fillRect(-84 + i * 35, -34, 28, 68) }
  x.restore()
}
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 376)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = DEAD; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
const DEAD = DEEP
const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Need the cave today? | *The cave is valid.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FORT, FORT_C, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'CAVE MODE: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), ACC, -0.04, 34, PAPER)
      L(x, 800, 1160, 'VISITORS: SNACKS ONLY', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 26)
    } },
  { sign: S, cap: 'Someone asks “you ok?” | *Let them care.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = PINK; x.font = `700 22px ${MONO}`; x.fillText('YOUR MATCH', 0, -132)
        const a = pop01(t, P.t0 + 0.6, 0.25, 2.2), b = pop01(t, P.t0 + 1.4, 0.25, 2.2)
        if (a > 0.01) { x.save(); x.translate(-10, -60); x.scale(a, a); x.fillStyle = BONE; x.fillRect(-80, -30, 160, 60); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('you ok?', 0, 2); x.restore() }
        if (b > 0.01) { x.save(); x.translate(10, 40); x.scale(b, b); x.fillStyle = MINT; x.fillRect(-80, -30, 160, 60); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('…not really', 0, 2); x.restore() }
      })
      hearts(x, t, 800, 1000, P.t0 + 1.9, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Snacks first. | *Feelings second.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { y: '#ffd23a', o: '#ffb34a', W: '#8fe3ff' }, 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'STEP 1 OF 2', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 34)
      L(x, 800, 1150, 'STEP 2: LATER', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'One person gets | *the whole story.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DIARY, { R: '#a8324a', r: '#e0607a', G: GOLD, g: INK }, 800, 920, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const f = ease.inOutCubic(prog(lt, 0.7, 1.3))
      drawBits(x, KEY, { G: GOLD }, lerp(960, 860, f), lerp(1150, 940, f), 12, { alpha: pop01(t, P.t0 + 0.5, 0.3, 2) })
      L(x, 800, 660, 'COPIES OF KEY: 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Gone quiet? | It’s *recharging.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      battery(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), 0.2 + 0.5 * clamp((lt - 0.4) / 1.6))
      L(x, 800, 700, 'DO NOT DISTURB', pop01(t, P.t0 + 0.7, 0.3, 2.2), ACC, -0.04, 32, PAPER)
      L(x, 800, 1100, 'NOT MAD. CHARGING.', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Intense day? | *Intense nap.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { P: '#d8dbe8', p: '#b9b0d8' }, 370, 1020, 20 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(clamp((lt - 0.5) / 1.4) * 4))
      L(x, 790, 820, `NAP: ${n} HRS`, pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.04, 44)
      bubble(x, 790, 1040, 'five more | minutes', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Revenge playlist? | Make it *a dance one.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.2, 1.7, 2.2],
    front(x, t, lt, P) {
      card(x, 800, 900, 270, 300, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('PLAYLIST', 0, -118)
        const names = lt > 1.0 ? ['dance it off', 'still glowing', 'who? anyway', 'main stage'] : ['how dare they', 'never forget', 'payback', 'cold, cold']
        names.forEach((n, i) => { x.fillStyle = lt > 1.0 ? '#2fc79a' : '#a8324a'; x.fillRect(-110, -78 + i * 52, 20, 20); x.fillStyle = INK; x.font = `700 24px ${INTER}`; x.textAlign = 'left'; x.fillText(n, -80, -68 + i * 52) })
      })
      if (lt > 1.0) notes(x, t, 600, 800, { n: 4, cell: 7, col: ACC, seed: 3 })
    } },
  { sign: S, cap: 'Your chart says rest. | *Listen to it.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 280, 280, pop01(t, P.t0 + 0.25, 0.35, 2), 0.05, x => {
        x.strokeStyle = '#6b62a8'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = i === 7 ? '#a8324a' : GREY; x.fillRect(Math.cos(a) * 86 - 8, Math.sin(a) * 86 - 8, 16, 16) }
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('REST', 0, 2)
      })
      L(x, 800, 660, 'TODAY: GO SLOW', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 800, 1140, 'SIGNED: THE STARS', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Let one friend in. | *They brought soup.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 810, 930, 220 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 0.6] })
      drawBits(x, SOUP, { S: '#d8dbe8', O: '#ffb34a', W: BONE }, 670, 1060, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 820, 670, 'no talking. | just soup.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0516', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'What Scorpios need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Deep feelings. | *Soft landing.*', mood: 'heart' },
  lesson: { text: 'Bad days end. | *You rise.*', chip: 'MOOD: MENDING' },
  last: {
    text: 'Tomorrow? | *Fully charged.*',
    draw(x, t, lt) { const t0 = t - lt; battery(x, 540, 1260, pop01(t, t0 + 0.5, 0.35, 2), clamp((lt - 0.8) / 1.2)); sparkles(x, t, 540, 1260, t0 + 2.0, 8, 200, 0.4) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
