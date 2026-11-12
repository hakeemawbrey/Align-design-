// r2a0047: THE SIGNS AS… v3, SOLO advice film, "Sagittarius, before you | send that text." (~51 s, signs3kit, lofi · F)
// One Sagittarius, nine cards: the honest, fast-typing Sag + a warm reframe before hitting send. Ending: card.
//   0.0–3.6    "Sagittarius, before you | *send that text.*"
//   3.6–37.8   caps lock off · blunt → kind (the bubble rewrites itself) · essay → three lines (scroll rolls up)
//              · add the smiley · say you need space (compass) · sorry without a speech · slow reply isn't gone
//              · honesty is a gift: wrap it · your match asked for honesty
//  37.8        "Big heart. | *Bigger honesty.*"
//  41.0        LESSON: "Say it true. | Say it *gently.*"  STATUS: SENT (NICELY)
//  46.9        "Gemini replied: | *“same.”*" over the match card: Sagittarius + Gemini (the match who asked).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'sagittarius', AMBER = '#ff9a4a', RED = '#e23d4e', GREEN = '#5fd068'

const SMILEY = [
  '..YYYYY..',
  '.YYYYYYY.',
  'YYKYYYKYY',
  'YYKYYYKYY',
  'YYYYYYYYY',
  'YKYYYYYKY',
  'YYKKKKKYY',
  '.YYYYYYY.',
  '..YYYYY..',
]
const SMILEY_C = { Y: GOLD, K: INK }
const COMPASS = [
  '...BBBBB...',
  '..BWWWWWB..',
  '.BWWWRWWWB.',
  'BWWWWRWWWWB',
  'BWWWWRWWWWB',
  'BWWWWKWWWWB',
  'BWWWWSWWWWB',
  'BWWWWSWWWWB',
  '.BWWWSWWWB.',
  '..BWWWWWB..',
  '...BBBBB...',
]
const COMPASS_C = { B: '#c98f2a', W: '#fff4e2', R: RED, S: '#6b62a8', K: INK }
const GIFT = [
  '...PP.PP...',
  '....PPP....',
  'GGGGGPGGGGG',
  'GGGGGPGGGGG',
  '.GGGGPGGGG.',
  '.GGGGPGGGG.',
  '.GGGGPGGGG.',
  '.GGGGPGGGG.',
  '.GGGGPGGGG.',
]
const GIFT_C = { P: PINK, G: MINT }

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-158, -214, 328, 440)
  x.fillStyle = INK; x.fillRect(-170, -226, 340, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-160, -216, 320, 432)
  x.fillStyle = '#140c30'; x.fillRect(-146, -186, 292, 372)
  if (head) { x.fillStyle = headCol; x.fillRect(-146, -186, 292, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -158) }
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(right ? 30 : -30, -80 + i * 90); x.scale(kk, kk)
    x.font = `800 ${size}px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = col; x.fillRect(-w / 2, -24, w, 48)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 1)
    x.restore()
  })
  x.restore()
}
// a long paper scroll that rolls up to three lines
function scroll(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const h = lerp(420, 150, ease.inOutCubic(prog(lt, 1.0, 1.6)))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -h / 2 - 4, 252, h + 8)
  x.fillStyle = '#fff4e2'; x.fillRect(-120, -h / 2, 240, h)
  x.fillStyle = '#b9b0a0'; for (let y = -h / 2 + 24; y < h / 2 - 14; y += 26) x.fillRect(-100, y, 160 + ((y * 7) % 40), 8)
  x.fillStyle = '#c98f2a'; x.fillRect(-140, -h / 2 - 20, 280, 22); x.fillRect(-140, h / 2 - 2, 280, 22)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Typed it in caps? | *Read it back once.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const calm = lt > 1.3
      phone(x, 770, 850, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.95, { head: 'DRAFT', headCol: AMBER, lines: [[calm ? 'just saying…' : 'I’M JUST SAYING', calm ? BONE : AMBER, pop01(t, P.t0 + 0.4, 0.25, 2.2)]] })
      label(x, 780, 1110, 'CAPS LOCK: OFF', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blunt is honest. | *Kind is too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const soft = lt > 1.2
      bubble(x, 780, 760, soft ? 'I see it | differently' : 'you’re wrong.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: soft ? MINT : BONE, tail: 'bl' })
      label(x, 790, 1010, 'SAME POINT. SOFTER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 760, P.t0 + 1.2, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Wrote an essay? | *Three lines will do.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scroll(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1110, '900 WORDS → 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: AMBER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Joke might land wrong? | *Add the smiley.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'nice haircut', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, SMILEY, SMILEY_C, 790, 910, 20 * pop01(t, P.t0 + 1.2, 0.35, 2.2), { rot: 0.08 })
      sparkles(x, t, 790, 910, P.t0 + 1.3, 7, 140, 0.6)
    } },
  { sign: S, cap: 'Feeling boxed in? | *Ask for space.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, COMPASS, COMPASS_C, 790, 820, 22 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.15 * Math.sin(t * 3) })
      bubble(x, 790, 1080, 'need a little | room today', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'Saying sorry? | *Skip the speech.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const short = lt > 1.2
      if (!short) label(x, 790, 760, 'SORRY (PART 1 OF 6)', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      else bubble(x, 790, 760, 'sorry. | I mean it.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      hearts(x, t, 790, 1080, P.t0 + 1.4, { n: 4, life: 1.5, spread: 150, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Slow reply? | *They’re still there.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const dots = '.'.repeat(1 + Math.floor(t * 3) % 3)
      phone(x, 770, 850, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.95, { head: 'FRIEND', headCol: SKYB, lines: [
        ['typing' + dots, LAV, lt < 1.5 ? 1 : 0],
        ['', BONE, 0],
        ['miss you too!', SKYB, pop01(t, P.t0 + 1.9, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Honesty is a gift. | *Wrap it nicely.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 640, 'THE TRUTH (GENTLY)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Your match wants honesty? | *That’s your thing.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 770, 850, pop01(t, P.t0 + 0.15, 0.3, 2) * 0.95, { head: '♊︎ YOUR MATCH', headCol: GOLD, lines: [
        ['be honest?', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['I like you.', BONE, pop01(t, P.t0 + 1.3, 0.25, 2.2), true],
        ['a lot.', BONE, pop01(t, P.t0 + 1.7, 0.25, 2.2), true],
      ] })
      hearts(x, t, 560, 800, P.t0 + 1.6, { n: 5, life: 1.5, spread: 140, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0047', key: 'F', accent: AMBER, solo: S, ending: 'card',
  title: 'Sagittarius, before | you *send that text.*',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'gemini', chip: "IT'S A MATCH" },
  group: { cap: 'Big heart. | *Bigger honesty.*', mood: 'sparkle' },
  lesson: { text: 'Say it true. | Say it *gently.*', chip: 'STATUS: SENT (NICELY)' },
  last: {
    text: 'Gemini replied: | *“same.”*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
