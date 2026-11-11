// v3t073: THE SIGNS AS… v3, SOLO film, "Dating an Aquarius | be like." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Aquarius version.
// The format look lives in ../../signs3kit.js. Ending: group.
//   0.0–3.6    "Dating an Aquarius | *be like.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards: first date was a protest · "I love you" → a fun fact · anniversary gift: a meteorite
//              · needs space (actual space) · profile bio: not like the others · met your friends, started a club
//              · texts back in three weeks · invented a new compatibility scale · holds your hand like an experiment
//  37.8        "Weird? | *Wonderfully.*"  The big Aquarius comes back, in love. The end.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#6fc3ff', RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const ROCK = [
  '...GGGG...',
  '.GGgGGGGG.',
  'GGGGGgGGGG',
  'GgGGGGGGgG',
  'GGGGgGGGGG',
  '.GGGGGGgG.',
  '..GGGGG...',
]
const ROCK_C = { G: '#7a6f94', g: '#4e4568' }
const ROCKET = [
  '...RR...',
  '..RWWR..',
  '..WWWW..',
  '..WSSW..',
  '..WSSW..',
  '..WWWW..',
  '.RWWWWR.',
  'RR.WW.RR',
  '...OO...',
  '...YY...',
]
const ROCKET_C = { R: RED, W: '#fff4e2', S: SKYB, O: ORANGE, Y: GOLD }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#fff4e2', G: '#6b62a8' }

// a paper card with a coloured header and a few lines (a sign, a clipboard)
function card(x, cx, cy, k, { w = 270, h = 300, head = '', headBg = AQ, body = [], rot = 0.05, size = 34, stick = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  if (stick) { x.fillStyle = INK; x.fillRect(-12, h / 2 - 4, 24, 210); x.fillStyle = '#8a5a3a'; x.fillRect(-7, h / 2, 14, 200) }
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 32) }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`
  const top = head ? -h / 2 + 60 : -h / 2
  body.forEach((l, i) => x.fillText(l, 0, top + (h - (head ? 60 : 0)) * (i + 0.5) / body.length))
  x.restore()
}
// a sign profile card (the Align nod)
function profile(x, t, cx, cy, k, { line, w = 300, h = 380 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 140)
  signChar(x, t, 'aquarius', 0, -h / 2 + 14 + (h - 140) / 2 + 6, 150, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = AQ; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AQUARIUS', 0, h / 2 - 100)
  x.fillStyle = '#fff4e2'; x.font = `800 32px ${INTER}`
  line.split('|').forEach((l, i) => x.fillText(l.trim(), 0, h / 2 - 64 + i * 36))
  x.restore()
}
// a tiny compatibility dial with a needle that spins off the scale
function dial(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 138, Math.PI, 0); x.lineTo(138, 20); x.lineTo(-138, 20); x.fill()
  const COLS = [RED, ORANGE, GOLD, '#5fd068', AQ]
  for (let i = 0; i < 5; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 126, Math.PI + i * Math.PI / 5, Math.PI + (i + 1) * Math.PI / 5); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 60, Math.PI, 0); x.fill()
  const a = Math.PI + clamp(lt / 1.4) * Math.PI * 1.35 + (lt > 1.4 ? 0.1 * Math.sin(t * 9) : 0)
  x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); x.stroke()
  x.fillStyle = BONE; x.fillRect(-12, -12, 24, 24)
  x.restore()
}

const CAMEOS = [
  { sign: 'aquarius', cap: 'First date? | A *protest.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      card(x, 790, 760, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 280, h: 200, body: ['SAVE', 'THE BEES'], size: 46, stick: true, rot: 0.06 + 0.05 * Math.sin(t * 5) })
      bubble(x, 380, 600, 'romantic, right?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Said “I love you.” | Got *a fun fact.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'I love you', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      bubble(x, 780, 860, 'octopuses have | three hearts!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      label(x, 790, 1080, 'SO… YES?', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Anniversary gift? | A *meteorite.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, ROCK, ROCK_C, 790, 860, 26 * k, { rot: 0.1 })
      // a gift bow on top
      if (k > 0.5) drawBits(x, ['PP.PP', '.PPP.', 'PP.PP'], { P: PINK }, 790, 760, 16 * k)
      label(x, 790, 1060, 'FROM SPACE. FOR YOU.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: AQ, rot: -0.05 })
      sparkles(x, t, 790, 860, P.t0 + 0.6, 7, 170, 0.4)
    } },
  { sign: 'aquarius', cap: 'Needs space. | *Actual space.*', mood: 'sparkle', star: { x: -180 }, hops: [0.5],
    front(x, t, lt, P) {
      const p = ease.inCubic(prog(lt, 0.9, 2.3))
      drawBits(x, ROCKET, ROCKET_C, 790, lerp(900, 520, p), 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { alpha: 1 - prog(lt, 2.0, 2.3) })
      bubble(x, 380, 600, 'back in a | few weeks!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bc' })
      label(x, 790, 1100, 'DESTINATION: MOON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Their profile bio? | *Not like the others.*', mood: 'wink', star: { x: -180 },
    front(x, t, lt, P) {
      profile(x, t, 790, 840, pop01(t, P.t0 + 0.3, 0.35, 2), { line: 'not like | the others.' })
      label(x, 790, 600, 'MATCHES: CONFUSED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Met your friends. | *Started a club.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 }, hops: [1.1],
    front(x, t, lt, P) {
      card(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 290, h: 260, head: 'CLUB', headBg: MINT, body: ['MEMBERS:', String(Math.floor(clamp((lt - 0.5) / 1.4) * 14))], size: 44 })
      bubble(x, 790, 1090, 'first meeting: | the moon', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Texts back | *in three weeks.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 880, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.06 })
      label(x, 790, 640, 'YOU: hey!', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: BONE, rot: -0.05 })
      label(x, 790, 1100, '21 DAYS LATER: “hey”', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: AQ, rot: 0.05 })
    } },
  { sign: 'aquarius', cap: 'Compatibility check? | Built *their own.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 620, 'AQUA-METER v2', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: AQ, rot: -0.04, font: MONO, weight: 700 })
      dial(x, t, 790, 900, pop01(t, P.t0 + 0.3, 0.35, 2), lt)
      label(x, 790, 1060, 'RESULT: OFF THE CHART', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Holds your hand. | *For science.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 830, pop01(t, P.t0 + 0.3, 0.35, 2), { w: 290, h: 280, head: 'FINDINGS', headBg: AQ, body: ['warm.', 'nice.', lt > 1.4 ? 'again pls.' : '…'], size: 40 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'v3t073', key: 'E', accent: AQ, solo: 'aquarius', ending: 'group',
  title: 'Dating an Aquarius | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Weird? | *Wonderfully.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
