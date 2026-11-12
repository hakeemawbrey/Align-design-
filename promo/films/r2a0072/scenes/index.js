// r2a0072: star_advice, ADVICE SOLO, "What Leos need | to feel heard." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each.
//   0.0–3.6    "What Leos need | *to feel heard.*"
//   3.6–37.8   phone down, eyes up · ask for the long version · remember the little things · clap for small wins
//              · big roar, soft heart · say it back · don't steal the big finish · "I'm proud of you" out loud
//              · sometimes it's just a hug
//  37.8        GROUP ENDING: "Be their audience. | *Front row.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', CREAM = '#fff4e2', RED = '#e23d4e'
const HANDS = ['.Y..Y.', 'YY.YY.', 'YYYYY.', 'YYYYYY', '.YYYYY', '..YYY.', '..YYY.']

function phone(x, cx, cy, k, flip) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(lerp(0.05, Math.PI / 2, flip)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-90, -150, 180, 300); x.fillStyle = flip > 0.5 ? '#2a2350' : '#140c30'; x.fillRect(-82, -142, 164, 284)
  if (flip < 0.5) { x.fillStyle = SKYB; for (let i = 0; i < 4; i++) x.fillRect(-60, -100 + i * 50, 120, 26) }
  x.restore()
}
function scroll(x, cx, cy, k, u) {
  if (k <= 0.01) return
  const h = lerp(60, 520, u)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-135, -h / 2 - 5, 270, h + 10); x.fillStyle = CREAM; x.fillRect(-130, -h / 2, 260, h)
  x.save(); x.beginPath(); x.rect(-130, -h / 2, 260, h); x.clip()
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('CHAPTER 1', 0, -h / 2 + 40)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 14; i++) x.fillRect(-100, -h / 2 + 70 + i * 32, 200 - (i * 37) % 60, 10)
  x.restore()
  x.fillStyle = INK; x.fillRect(-150, -h / 2 - 20, 300, 30); x.fillRect(-150, h / 2 - 10, 300, 30)
  x.fillStyle = '#c98f2a'; x.fillRect(-144, -h / 2 - 14, 288, 18); x.fillRect(-144, h / 2 - 4, 288, 18)
  x.restore()
}
function sticky(x, cx, cy, k, txt, { rot = -0.05, bg = '#ffe27a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -122, 280, 260)
  x.fillStyle = INK; x.fillRect(-145, -135, 290, 270); x.fillStyle = bg; x.fillRect(-140, -130, 280, 260)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const ls = txt.split('|'); ls.forEach((l, i) => x.fillText(l.trim(), 0, (i - (ls.length - 1) / 2) * size * 1.3))
  x.restore()
}

const S = 'leo'
const CAMEOS = [
  { sign: S, cap: 'Phone down. | *Eyes up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.0)))
      label(x, 790, 1060, 'ALL EARS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask for the story. | *The long version.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      scroll(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.3, 1.4)))
    } },
  { sign: S, cap: 'Remember the little things. | *They’ll glow.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sticky(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 'their dog: | Biscuit. | fave color: | gold.', { size: 32 })
      sparkles(x, t, 520, 820, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: S, cap: 'Small win? | *Clap anyway.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2, 1.7],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'parked first try!', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 34, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.25, 2), c = Math.abs(Math.sin(t * 14)) * 0.25
      drawBits(x, HANDS, { Y: ORANGE }, 720, 900, 18 * k, { rot: -0.3 - c }); drawBits(x, HANDS, { Y: ORANGE }, 860, 900, 18 * k, { rot: 0.3 + c, sx: -1 })
      label(x, 790, 1100, 'BRAVO!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big roar. | *Soft heart.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const b = 1 + 0.08 * Math.max(0, Math.sin(t * 7))
      drawBits(x, HEART, { H: PINK, W: '#fff' }, 790, 830, 38 * pop01(t, P.t0 + 0.9, 0.35, 2) * b)
      bubble(x, 760, 620, 'RAWR.', pop01(t, P.t0 + 0.2, 0.25, 2.4) * (1 - prog(lt, 0.8, 0.9)), { size: 56, col: ORANGE, tail: 'bl' })
      label(x, 790, 1090, 'MARSHMALLOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say it back. | *They feel seen.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 660, 'I worked so hard.', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 34, col: ORANGE, tail: 'bl' })
      bubble(x, 800, 900, 'you worked | SO hard.', pop01(t, P.t0 + 1.0, 0.25, 2), { size: 40, col: MINT, tail: 'br' })
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Don’t steal | *the big finish.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'and THEN…', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 52, tail: 'bl' })
      label(x, 790, 900, 'DRUMROLL', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 40, bg: LAV, rot: Math.sin(t * 30) * 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'NO SPOILERS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“I’m proud of you.” | *Say it out loud.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'I’m SO | proud of you.', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, col: PINK, tail: 'bl' })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 220, 0.2)
      label(x, 790, 1060, 'VOLUME: UP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Not advice. | *Just a hug.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.6, 1.1))
      if (k > 0.01) signChar(x, t, 'libra', lerp(850, 720, near), 900, 230 * k, { mood: near > 0.9 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      hearts(x, t, 560, 760, P.t0 + 1.2, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0072', key: 'F', accent: ORANGE, solo: 'leo', ending: 'group',
  title: 'What Leos need | *to feel heard.*',
  cameos: CAMEOS,
  group: { cap: 'Be their audience. | *Front row.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
