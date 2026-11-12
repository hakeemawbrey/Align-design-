// r2a0341: star_advice, ADVICE SOLO, "Capricorn, the right people | will stay." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Capricorn truth + a warm reframe, one light gag each.
//   0.0–3.6    "Capricorn, the right people | *will stay.*"  One big Capricorn pops in, then dives away.
//   3.6–37.8   nine cards (3.8 s each):
//              cancelled for work, they saved you a seat · slow to open up (a loading bar at 3%), they'll wait
//              · you love by fixing things (one very level shelf) · "ok." with no emoji, they still read the love
//              · the five-year plan has a pencilled-in "friends" row · a dry joke lands: one friend snorts
//              · a spreadsheet for their moving day, that's love · some people drift (a paper boat), that's okay
//              · your report card says B−, theirs says A+
//  37.8        "Built slow. | *Built to last.*"  The big Capricorn comes back.
//  41.0        LESSON UNLOCKED: "The right people | *don't need convincing.*"  STATUS: STAYING
//  46.9        "They even read | *the spreadsheet.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const CHAIR = [
  'WWWWWWWW..',
  'W......W..',
  'W......W..',
  'W......W..',
  'W......W..',
  'SSSSSSSSSS',
  'SSSSSSSSSS',
  'L.......L.',
  'L.......L.',
  'L.......L.',
]
const CHAIR_C = { W: WOOD, S: '#c9744a', L: WOOD }
const WRENCH = [
  'GG...GG',
  'GGG.GGG',
  '.GGGGG.',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..GGG..',
  '..RRR..',
  '..RRR..',
  '..RRR..',
]
const WRENCH_C = { G: '#c9c2e6', R: '#e23d4e' }
const BOAT = [
  '......W......',
  '.....WW......',
  '....WWW......',
  '...WWWW......',
  '..WWWWW......',
  '......K......',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
]
const BOAT_C = { W: PAPER, K: INK, B: '#e8dcc6' }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const S = 'capricorn'
const CAMEOS = [
  { sign: S, cap: 'Worked late again? | *They saved a seat.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 1010, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 960, 'SAVED ♥', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.06 })
      bubble(x, 780, 680, 'still yours.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Slow to open up? | *They’ll wait.*', mood: lt => lt > 1.7 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const pct = Math.min(3, Math.floor(prog(lt, 0.4, 1.6) * 3))
      card(x, 790, 860, 340, 200, pop01(t, P.t0 + 0.2, 0.3, 2), 0.03, '#140c30', () => {
        txt(x, 'OPENING UP…', 0, -50, 30, BONE, MONO, 700)
        x.fillStyle = INK; x.fillRect(-140, -6, 280, 44)
        x.fillStyle = TEAL; x.fillRect(-134, 0, 268 * pct / 100 + 6, 32)
        txt(x, `${pct}%`, 0, 70, 34, MINT, MONO, 700)
      })
      bubble(x, 790, 1100, 'take your time.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'You love by fixing. | *They notice.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    back(x, t, lt, P) {
      const lev = ease.outBack ? ease.outCubic(prog(lt, 0.6, 1.0)) : 1
      x.save(); x.translate(800, 760); x.rotate(lerp(0.22, 0, lev))
      x.fillStyle = INK; x.fillRect(-160, -26, 320, 52); x.fillStyle = WOOD; x.fillRect(-154, -20, 308, 40)
      x.restore()
      drawBits(x, WRENCH, WRENCH_C, 690, 990, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.5 - 0.6 * Math.sin(Math.min(1, lt / 1.0) * Math.PI) })
    },
    front(x, t, lt, P) {
      label(x, 860, 900, 'LEVEL ✓', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'you fixed it?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Texted “ok.” No emoji. | *They still get it.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'ok.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 64, tail: 'bl' })
      bubble(x, 800, 920, 'love you too ♥', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Five-year plan? | *Pencil them in.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const w = ease.outCubic(prog(lt, 1.0, 1.5))
      card(x, 790, 880, 360, 420, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, PAPER, () => {
        txt(x, 'THE PLAN', 0, -170, 34, INK, MONO, 700)
        const ROWS = ['2027: PROMOTION', '2028: SAVINGS', '2029: HOUSE', '2030: ???']
        ROWS.forEach((r, i) => txt(x, r, -150, -100 + i * 56, 26, '#6b62a8', MONO, 700, 'left'))
        x.save(); x.globalAlpha = w; txt(x, '+ FRIENDS ♥', -150, 132, 34, '#e23d4e', INTER, 800, 'left'); x.restore()
      })
    } },
  { sign: S, cap: 'Dry joke landed? | *That’s your person.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'my hobby? | quarterly reviews.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 920, '*SNORT*', pop01(t, P.t0 + 1.1, 0.25, 2.6), { size: 64, col: MINT, tail: 'br' })
      sparkles(x, t, 800, 920, P.t0 + 1.2, 6, 150, 0.3)
    } },
  { sign: S, cap: 'Made them a spreadsheet? | *That’s love.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 360, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, PAPER, () => {
        x.fillStyle = TEAL; x.fillRect(-180, -180, 360, 60)
        txt(x, 'MOVING DAY', 0, -150, 30, INK, MONO, 700)
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 3
        for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-180, -120 + i * 50); x.lineTo(180, -120 + i * 50); x.stroke() }
        for (const cx of [-60, 60]) { x.beginPath(); x.moveTo(cx, -120); x.lineTo(cx, 180); x.stroke() }
        const n = Math.floor(prog(lt, 0.5, 1.5) * 6)
        for (let i = 0; i < n; i++) txt(x, '✓', 120, -95 + i * 50, 34, TEAL)
      })
      hearts(x, t, 790, 700, P.t0 + 1.5, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Some people drift. | *That’s okay.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {
      x.save(); x.fillStyle = 'rgba(143,227,255,0.18)'; x.fillRect(110, 1090, 860, 120); x.restore()
      const p = ease.inOutQuad(prog(lt, 0.3, 2.3))
      drawBits(x, BOAT, BOAT_C, lerp(640, 850, p), 1050 + 6 * Math.sin(t * 3), 22 * (1 - 0.45 * p) * pop01(t, P.t0 + 0.15, 0.3, 2))
    },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'bon voyage.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Harder on yourself | *than they’ll ever be.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      card(x, 730, 860, 230, 270, pop01(t, P.t0 + 0.2, 0.3, 2), -0.08, PAPER, () => {
        txt(x, 'YOU:', 0, -80, 30, INK, MONO, 700); txt(x, 'B−', 0, 20, 110, '#9aa5c4')
      })
      card(x, 870, 900, 230, 270, pop01(t, P.t0 + 1.0, 0.3, 2.4), 0.08, PAPER, () => {
        txt(x, 'THEM:', 0, -80, 30, INK, MONO, 700); txt(x, 'A+', 0, 20, 110, '#e23d4e')
      })
      sparkles(x, t, 870, 900, P.t0 + 1.2, 6, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0341', key: 'D', accent: MINT, solo: 'capricorn', ending: 'lesson',
  title: 'Capricorn, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Built slow. | *Built to last.*', mood: 'heart' },
  lesson: { text: 'The right people | *don’t need convincing.*', chip: 'STATUS: STAYING' },
  last: { text: 'They even read | *the spreadsheet.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
