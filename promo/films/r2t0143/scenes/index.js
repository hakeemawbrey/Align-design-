// r2t0143: THE SIGNS AS… v3, SOLO film, "Sag with a secret | be like." (~46 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine attempts at keeping a secret, each the most extreme (and lovable) Sag version.
// Ending: callback.
//   0.0–3.6    "Sag with a secret | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              surprise party secret, lasted four seconds · whispered it at full volume · zipped their lips, the zip
//              broke · kept it… in the group chat · poker face? never heard of it · fled the room, told a goat · wrote it
//              in a diary, read it out loud · saw your new match, told the whole street · held it in all day, burst at dinner
//  37.8        "Secrets? | *Not their thing.*"  Sag comes back, big.
//  41.2        CALLBACK: "The goat | *told no one.*"  the goat is back, with a SECRET: SAFE badge.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAG = '#b58cff', RED = '#e23d4e'
const S = 'sagittarius'

// ── props
const GOAT = [
  'H.........H.',
  'HH.......HH.',
  '.HWWWWWWWH..',
  '..WWKWWKWW..',
  '..WWWWWWWW..',
  '...WWPPWW...',
  '...WWPPWW...',
  '....WWWW....',
  '.....BB.....',
  '.....BB.....',
]
const GOAT_C = { H: '#c9b48a', W: '#f4f1ff', K: INK, P: '#ffb0c8', B: '#e8e0d0' }
function goat(x, t, cx, cy, cell, { alpha = 1 } = {}) {
  drawBits(x, GOAT, GOAT_C, cx, cy + Math.sin(t * 3) * 4, cell, { alpha, rot: 0.04 * Math.sin(t * 2) })
}
const ZIP = ['KKKKKKKKKKK', 'KGKGKGKGKGK', 'KKKKKKKKKKK']
function phone(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316)
  fn(x); x.restore()
}
function msg(x, y, text, col, right, size = 30) {
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 28, h = size + 22, l = right ? 96 - w : -96
  x.fillStyle = col; x.fillRect(l, y - h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(text, l + 14, y + 2)
}
function diary(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -130, 400, 260)
  x.fillStyle = '#ff8fb1'; x.fillRect(-192, -122, 188, 244); x.fillRect(4, -122, 188, 244)
  if (open) {
    x.fillStyle = BONE; x.fillRect(-180, -110, 172, 220); x.fillRect(8, -110, 172, 220)
    x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) { x.fillRect(-166, -80 + i * 32, 140, 6); x.fillRect(22, -80 + i * 32, 140, 6) }
  } else { x.fillStyle = GOLD; x.fillRect(-40, -20, 80, 40); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PRIVATE', -96, -80) }
  x.restore()
}
// a pressure gauge whose needle swings into the red
function gauge(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.lineTo(150, 30); x.lineTo(-150, 30); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 136, Math.PI, 0); x.lineTo(136, 18); x.lineTo(-136, 18); x.closePath(); x.fill()
  ;[[MINT, Math.PI, Math.PI * 1.5], [GOLD, Math.PI * 1.5, Math.PI * 1.75], [RED, Math.PI * 1.75, Math.PI * 2]].forEach(([c, a, b]) => { x.strokeStyle = c; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 110, a, b); x.stroke() })
  const a = Math.PI + p * Math.PI
  x.strokeStyle = INK; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 100, Math.sin(a) * 100); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 14, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Surprise party secret? | Lasted *four seconds.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, `HOLDING… ${Math.min(4, Math.floor(clamp(lt / 1.1) * 4) + 1)}s`, pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'IT’S A PARTY!!', pop01(t, P.t0 + 1.45, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Whispered it. | *At full volume.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 700, '(psst)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
      bubble(x, 790, 940, 'THEY LIKE YOU!', pop01(t, P.t0 + 0.9, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 30)), { size: 52, col: '#ff6b5a', tail: 'bl' })
    } },
  { sign: S, cap: 'Zipped their lips. | The zip *broke.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P, F) {
      const pop = prog(lt, 1.0, 1.4)
      if (pop < 1) drawBits(x, ZIP, { K: '#9aa5c4', G: GOLD }, F.x + pop * 200, F.cy + 34 - pop * 300, 9 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: pop * 3 })
      label(x, 790, 820, 'ZIP: BROKEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1030, 'so anyway…', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Kept the secret… | *in the group chat.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = BONE; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillText('GROUP (14)', 0, -132)
        if (lt > 0.4) msg(x, -80, 'don’t tell', SAG, true, 28)
        if (lt > 0.8) msg(x, -10, 'anyone but…', SAG, true, 28)
        if (lt > 1.3) msg(x, 60, '!!!!!', GOLD, false, 30)
        if (lt > 1.6) msg(x, 124, 'NO WAY', MINT, false, 28)
      })
    } },
  { sign: S, cap: 'Poker face? | *Never heard of it.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'squint', look: lt => [Math.sin(lt * 9) > 0 ? 1 : -1, 0], star: { x: -200 },
    squash: lt => 0.04 * Math.sin(lt * 30),
    front(x, t, lt, P) {
      label(x, 790, 760, 'TOTALLY CALM', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, '(SWEATING)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 0.6) for (let i = 0; i < 3; i++) { const ph = (t * 1.4 + i / 3) % 1; x.fillStyle = INK; x.fillRect(470 + i * 14 - 2, 760 + ph * 90 - 2, 16, 24); x.fillStyle = SKYB; x.fillRect(470 + i * 14, 760 + ph * 90, 12, 20) }
    } },
  { sign: S, cap: 'Fled the room. | Told *a goat.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 }, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      goat(x, t, 800, 930, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 790, 680, 'ok so basically', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1140, 'GOAT: SHOCKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wrote it in a diary. | *Read it out loud.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      diary(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.9)
      bubble(x, 790, 640, '“dear diary…”', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1080, 'AUDIENCE: 30', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saw your new match. | Told *the whole street.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      label(x, 790, 700, '✦ NEW MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 920, 'EVERYONE! | GUESS WHAT!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Held it in all day. | *Burst at dinner.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    squash: lt => lt < 1.4 ? 0.05 * Math.sin(lt * 26) * clamp(lt) : 0,
    front(x, t, lt, P) {
      gauge(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.3) / 1.1) + (lt > 1.3 ? 0.02 * Math.sin(t * 40) : 0))
      bubble(x, 790, 680, 'OK FINE!!', pop01(t, P.t0 + 1.45, 0.25, 2.4), { size: 50, col: '#ff6b5a', tail: 'bl' })
      if (lt > 1.4) sparkles(x, t, 400, 860, P.t0 + 1.4 * 1.29, 8, 200, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0143', key: 'G', accent: SAG, solo: S, ending: 'callback',
  title: 'Sag with a secret | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Secrets? | *Not their thing.*', mood: 'sparkle' },
  last: {
    text: 'The goat | *told no one.*',
    draw(x, t, lt) {
      goat(x, t, 540, 1080, 30 * pop01(t, t - lt + 0.3, 0.45, 1.8))
      label(x, 540, 1340, 'SECRET: SAFE', pop01(t, t - lt + 1.2, 0.3, 2.6), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1080, t - lt + 1.2, 8, 230, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
