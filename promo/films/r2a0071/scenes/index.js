// r2a0071: star_advice, ADVICE SOLO, "Giving a Cancer | space." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "Giving a Cancer | *space.*"
//   3.6–37.8   say "I need space" with a hug · a snack at the door · "no rush" (mean it) · tell them when you're back
//              · a blanket fort is a yes · leave the porch light on · it's a recharge, not a goodbye
//              · let the sad song play · when they come out, be there
//  37.8        "Close, not | *crowding.*"
//  41.0        LESSON UNLOCKED: "Space is love too. | They come back *softer.*"  HEART: REFILLED
//  46.9        "And they’ll bring | *you snacks.*"  The snack tray, back again.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', BROWN = '#8a4a2e', ORANGE = '#ffb34a', BLUE = '#8fc8ff'

// ── props
const COOKIE = ['.BBBB.', 'BBCBBB', 'BBBBCB', 'BCBBBB', 'BBBCBB', '.BBBB.']
const COOKIE_C = { B: '#e8a24a', C: BROWN }
const MUG = ['.S.S...', 'S.S....', 'WWWWW..', 'WTTTWWW', 'WTTTW.W', 'WTTTWWW', 'WWWWW..']
const MUG_C = { S: '#d8dbe8', W: CREAM, T: '#c98f2a' }
const LAMP = ['..YYYYY..', '.YYYYYYY.', 'YYYYYYYYY', '....K....', '....K....', '....K....', '....K....', '....K....', '...KKK...', '..KKKKK..']
const LAMP_C = { Y: GOLD, K: '#2a2350' }
const BATT = ['KKKKKKKKKKK.', 'K.........KK', 'K.........KK', 'K.........KK', 'KKKKKKKKKKK.']
function tray(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, 30, 300, 30); x.fillStyle = '#c9c9d8'; x.fillRect(-144, 34, 288, 20)
  drawBits(x, COOKIE, COOKIE_C, -80, 0, 13); drawBits(x, COOKIE, COOKIE_C, -10, 6, 13); drawBits(x, MUG, MUG_C, 80, -6, 13)
  x.restore()
}
function note(x, cx, cy, k, txt, { rot = -0.05, bg = '#ffe27a', w = 280, h = 200, size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const ls = txt.split('|'); ls.forEach((l, i) => x.fillText(l.trim(), 0, (i - (ls.length - 1) / 2) * size * 1.25))
  x.restore()
}
function phone(x, cx, cy, k, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -220, 280, 440); x.fillStyle = '#2a2350'; x.fillRect(-132, -212, 264, 424)
  x.fillStyle = '#140c30'; x.fillRect(-120, -186, 240, 360)
  x.fillStyle = MINT; x.fillRect(-110, -70, 220, 170)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  msg.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -30 + i * 44))
  x.restore()
}
function door(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -230, 240, 460)
  x.fillStyle = '#ffe7a8'; x.fillRect(-110, -220, 220, 440)
  const w = lerp(220, 40, open)
  x.fillStyle = INK; x.fillRect(-110 - 4, -224, w + 8, 448)
  x.fillStyle = BROWN; x.fillRect(-110, -220, w, 440)
  if (w > 80) { x.fillStyle = GOLD; x.fillRect(-110 + w - 36, 0, 16, 16) }
  x.restore()
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Need space? | *Say it with a hug.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'brb. love you.', pop01(t, P.t0 + 0.3, 0.25, 2), { size: 44, col: PINK, tail: 'bl' })
      hearts(x, t, 760, 1000, P.t0 + 1.1, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Leave a snack | *at the door.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tray(x, t, 790, 900, pop01(t, P.t0 + 0.3, 0.3, 2) * 1.3)
      label(x, 790, 680, 'NO TALKING NEEDED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Text “no rush.” | *Mean it.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'no rush. | here when | you are.')
    } },
  { sign: S, cap: 'Say when you’ll be back. | *They’ll relax.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      note(x, 790, 830, pop01(t, P.t0 + 0.3, 0.3, 2), 'BACK AT 6. | PROMISE.')
      sparkles(x, t, 790, 830, P.t0 + 1.2, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Blanket fort? | *That’s a yes.*', mood: 'sleepy', star: { x: -40, y: 40 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2); if (k <= 0.01) return
      x.save(); x.translate(500, 900); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-240, 180); x.lineTo(0, -200); x.lineTo(240, 180); x.closePath(); x.fill()
      x.fillStyle = LAV; x.beginPath(); x.moveTo(-226, 172); x.lineTo(0, -184); x.lineTo(226, 172); x.closePath(); x.fill()
      x.fillStyle = '#140c30'; x.fillRect(-70, 40, 140, 132)
      x.fillStyle = PINK; for (let i = 0; i < 5; i++) x.fillRect(-180 + i * 80, 120 - (i % 2) * 40, 22, 22)
      x.restore()
      if (k > 0.6) signChar(x, t, S, 500, 1030, 130, { mood: 'sleepy', seed: 31, glyph: false })
      label(x, 800, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    }, hideStar: true },
  { sign: S, cap: 'They went in their shell. | *Leave a light on.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (lt > 0.9) { x.save(); x.globalAlpha = 0.35 * clamp((lt - 0.9) / 0.3); x.fillStyle = '#ffe7a8'; x.beginPath(); x.moveTo(790, 720); x.lineTo(640, 1120); x.lineTo(940, 1120); x.closePath(); x.fill(); x.restore() }
      drawBits(x, LAMP, LAMP_C, 790, 850, 26 * k)
    } },
  { sign: S, cap: 'It’s not goodbye. | It’s *a recharge.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BATT, { K: BONE }, 790, 830, 26 * k, { outline: null })
      if (k > 0.5) { const f = clamp((lt - 0.4) / 1.4); x.fillStyle = f > 0.8 ? MINT : GOLD; x.fillRect(790 - 117, 830 - 39, 234 * f, 78) }
      label(x, 790, 1040, 'RECHARGING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Same sad song again? | *Let it play.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'ON REPEAT', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      notes(x, t, 790, 1060, { n: 4, cell: 8, col: BLUE, seed: 3 })
      label(x, 790, 1080, 'PLAY COUNT: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'When they come out, | *be there.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      door(x, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 1.0)))
      if (lt > 0.9) signChar(x, t, 'pisces', 830, 960, 180 * pop01(t, P.t0 + 1.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 12, glyph: false, tears: 1 })
      hearts(x, t, 640, 900, P.t0 + 1.6, { n: 5, life: 1.4, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0071', key: 'D', accent: PINK, solo: 'cancer', ending: 'lesson',
  title: 'Giving a Cancer | *space.*',
  cameos: CAMEOS,
  group: { cap: 'Close, not | *crowding.*', mood: 'heart' },
  lesson: { text: 'Space is love too. | They come back *softer.*', chip: 'HEART: REFILLED' },
  last: {
    text: 'And they’ll bring | *you snacks.*',
    draw(x, t, lt) { tray(x, t, 540, 1150, 1.3 * pop01(t, t - lt + 0.6, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
