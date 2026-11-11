// v3a021: star_advice, ADVICE SOLO, "How to love | a Leo." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, practical ways to love a Leo, one gag each.
//   0.0–3.6    "How to love | *a Leo.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              hype them up loudly (Aries with a GO LEO! sign) · compliment the outfit, every outfit ("new jacket?!" / it's
//              from years ago) · come to every show (Aquarius, front row again) · text back fast ("obsessed.")
//              · laugh at the joke, even the second time · give them a crown, paper is fine (Taurus made one)
//              · hug like you mean it · celebrate small wins (a trophy for making the bed) · soft days: stay anyway
//  37.8        "Loud love. | *Big heart.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "Love a Leo out loud. | They love *louder.*"  HEART: WARM
//  46.9        "Paper crown? | Leo *still wears it.*" over the match card: Leo (in the paper crown) + Taurus.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

// ── small prop helpers (local to this film)
const RED = '#e23d4e', ROSE = '#ff9ccf', WOOD = '#c98f2a', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
/** a bone card with an ink outline and a soft shadow; fn draws inside, in local coords centred on the card */
function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head = null, headH = 56 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = head; x.fillRect(-w / 2, -h / 2, w, headH) }
  if (fn) fn()
  x.restore()
}
/** text helper */
function say(x, s, px, py, { size = 34, color = INK, font = INTER, weight = 800, align = 'center' } = {}) {
  x.font = `${weight} ${size}px ${font}`; x.fillStyle = color; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
/** a phone; fn draws on its screen (local coords, screen 224 × 330 centred) */
function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -165, 224, 330)
  if (fn) fn()
  x.restore()
}

const S = 'leo'
// ── props
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: CREAM, R: RED, B: SKYB }
const TROPHY = ['YYYYYYY', 'YWYYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '...Y...', '...Y...', '.BBBBB.', '.BBBBB.']
const TROPHY_C = { Y: GOLD, W: '#fff', B: WOOD }
const JACKET = ['..OO.OO..', '.OOOWOOO.', 'OOOOWOOOO', 'OOOOWOOOO', 'O.OOWOO.O', 'O.OOWOO.O', '..OOWOO..', '..OOOOO..']
const JACKET_C = { O: ORANGE, W: GOLD }
const TEA = ['.S.S.', '..S..', 'MMMMM.', 'MMMMMM', 'MMMMM.', '.MMM..']
const TEA_C = { S: '#c9c4d8', M: MINT }
const BLANKET = ['BBBBBBBBBBBB', 'BPBBPBBPBBPB', 'BBBBBBBBBBBB', 'BBPBBPBBPBBP', 'BBBBBBBBBBBB']
const BLANKET_C = { B: LAV, P: ROSE }

const CAMEOS = [
  { sign: S, cap: 'Hype them up. | *Loudly.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 800, 1040, 170 * k, { mood: 'wide', look: [-1, -1], seed: 41, glyph: false, hops: [P.t0 + 0.6, P.t0 + 1.0, P.t0 + 1.4, P.t0 + 1.8] })
      const wave = 0.08 * Math.sin(t * 9)
      card(x, 800, 760, 300, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { rot: wave, bg: GOLD }, () => say(x, 'GO LEO!', 0, 4, { size: 64 }))
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(793, 845, 14, 110); x.fillStyle = WOOD; x.fillRect(796, 845, 8, 106) }
      sparkles(x, t, 340, 860, P.t0 + 1.3, 8, 190, 0.3)
    } },
  { sign: S, cap: 'Compliment the outfit. | *Every outfit.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, JACKET, JACKET_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      bubble(x, 760, 630, 'new jacket?!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1120, 'OWNED IT FOR YEARS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Show up | *to every show.*', mood: 'sparkle', star: { x: -200, y: -30 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(300, 470); x.lineTo(380, 470); x.lineTo(520, 1060); x.lineTo(160, 1060); x.fill(); x.restore()
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(140, 1030, 400, 30); x.fillStyle = WOOD; x.fillRect(144, 1034, 392, 22) }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 1010, 170 * k, { mood: 'heart', look: [-1, -1], seed: 42, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.5] })
      bubble(x, 800, 720, 'ENCORE!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bc' })
      label(x, 790, 1150, 'FRONT ROW. AGAIN.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text back fast. | *They noticed.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      phone(x, 780, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        const a = pop01(t, P.t0 + 0.5, 0.25, 2), b = pop01(t, P.t0 + 1.0, 0.25, 2)
        if (a > 0.01) { x.save(); x.translate(-20, -80); x.scale(a, a); x.fillStyle = BONE; x.fillRect(-80, -38, 170, 76); say(x, 'new pic,', 5, -12, { size: 26 }); say(x, 'thoughts?', 5, 18, { size: 26 }); x.restore() }
        if (b > 0.01) { x.save(); x.translate(20, 50); x.scale(b, b); x.fillStyle = ORANGE; x.fillRect(-90, -30, 180, 60); say(x, 'obsessed.', 0, 2, { size: 30 }); x.restore() }
      })
      label(x, 780, 1110, 'REPLIED IN 2 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laugh at the joke. | *Even twice.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'okay so THEN—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 1000, 180 * k, { mood: lt > 1.2 ? 'squint' : 'neutral', seed: 43, glyph: false, hops: lt > 1.2 ? [P.t0 + 1.6, P.t0 + 1.8, P.t0 + 2.0] : [] })
      if (lt > 1.2) { const hk = pop01(t, P.t0 + 1.55, 0.25, 2.2); label(x, 690, 820, 'HA', hk, { size: 44, bg: GOLD, rot: -0.2 }); label(x, 900, 840, 'HA!', pop01(t, P.t0 + 1.75, 0.25, 2.2), { size: 44, bg: GOLD, rot: 0.2 }) }
      label(x, 790, 1150, 'HEARD IT. STILL LAUGHED.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them a crown. | *Paper is fine.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 44, glyph: false })
      const fly = ease.inOutCubic(prog(lt, 0.7, 1.3))
      const cx = lerp(820, F.x, fly), cy = lerp(880, F.top - 24, fly) - Math.sin(Math.PI * fly) * 120
      drawBits(x, CROWN, CROWN_C, cx, cy, 13 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: lerp(0.3, -0.06, fly) })
      label(x, 800, 690, 'HANDMADE. ROYAL.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top, P.t0 + 1.3, 8, 120, 0.4)
    } },
  { sign: S, cap: 'Hug them like | *you mean it.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: { x: -120 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const join = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(860, 640, join), 930, 250 * k, { mood: lt > 1.1 ? 'heart' : 'happy', look: [-1, 0], seed: 45, glyph: false, hops: [P.t0 + 0.4] })
      label(x, 540, 640, 'HUG LENGTH: LONG', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 820, P.t0 + 1.1, { n: 7, life: 1.8, spread: 300, cell: 7, seed: 7 })
    } },
  { sign: S, cap: 'Celebrate small wins. | *Like big ones.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 880, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 1130, 'FOR: MADE THE BED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 8, 200, 0.6)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.2, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Soft days happen. | *Stay anyway.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: { x: -200, y: 20 },
    front(x, t, lt, P) {
      drawBits(x, BLANKET, BLANKET_C, 340, 1010, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 780, 960, 190 * k, { mood: 'happy', look: [-1, 0], seed: 46, glyph: false })
      drawBits(x, TEA, TEA_C, 900, 1090, 13 * pop01(t, P.t0 + 0.9, 0.3, 2))
      bubble(x, 760, 690, 'I’m not going | anywhere.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'v3a021', key: 'D', accent: ORANGE, solo: S, ending: 'card',
  title: 'How to love | *a Leo.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'taurus', chip: "IT'S A MATCH" },
  group: { cap: 'Loud love. | *Big heart.*', mood: 'heart' },
  lesson: { text: 'Love a Leo out loud. | They love *louder.*', chip: 'HEART: WARM' },
  last: {
    text: 'Paper crown? | Leo *still wears it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.45, 0.35, 2)
      drawBits(x, CROWN, CROWN_C, 352, 800, 13 * k, { rot: -0.1 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
