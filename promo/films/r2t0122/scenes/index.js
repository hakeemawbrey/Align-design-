// r2t0122: THE SIGNS AS… v3, SOLO film, "Aries running late | be like." (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine ways an Aries is late, each pushed to the most extreme (and lovable) version.
//   0.0–3.6    "Aries running late | *be like.*"
//   3.6–37.8   left the house in one shoe · texted "here!" from the shower · sprinted there (47 km/h)
//              · yelled at the elevator for being slow · toast in hand, hair still wet · blamed traffic (walked)
//              · checked their chart, blamed Mercury · late to the first date, sprinted in with flowers
//              · still late, but made an entrance
//  37.8        GROUP ENDING: "Late, loud, | and *worth the wait.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ff8a4a', CREAM = '#fff4e2'

// ── props
const SHOE = ['.......RRR..', '......RRRRR.', 'RRRRRRRWRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']
const SHOE_C = { R: RED, W: CREAM }
const SOCK = ['.SSS', '.SSS', '.SSS', 'SSSS', 'SSSS']
const TOAST = ['.CCCCCCC.', 'CCBBBBBCC', 'CBBBBBBBC', 'CBBBBBBBC', 'CBBBBBBBC', 'CBBBBBBBC', 'CCCCCCCCC']
const TOAST_C = { C: '#b07a3a', B: '#f2c27a' }
const FLOWERS = ['.P...Y...P.', 'PPP.YYY.PPP', '.P...Y...P.', '..G..G..G..', '...G.G.G...', '....GGG....', '...WWWWW...', '...WWWWW...', '....WWW....']
const FLOWERS_C = { P: PINK, Y: GOLD, G: '#5fd068', W: '#bff0ff' }
const DROP = ['.D.', 'DDD', 'DDD']

function speedLines(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k; x.fillStyle = BONE
  for (let i = 0; i < 7; i++) { const y = cy - 120 + i * 40, len = 120 + ((i * 53) % 90), off = ((t * 900 + i * 140) % 300); x.fillRect(cx - off - len, y, len, 8) }
  x.restore()
}
// elevator panel: floor counter that crawls
function elevator(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380)
  x.fillStyle = '#9aa5c4'; x.fillRect(-112, -182, 224, 364)
  x.fillStyle = '#140c30'; x.fillRect(-80, -160, 160, 70)
  const fl = 1 + Math.floor(clamp(lt / 2.4) * 2)
  x.fillStyle = '#ff6b5a'; x.font = `700 48px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`${fl} ▲`, 0, -124)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.beginPath(); x.arc(0, -30 + i * 60, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = i === 3 && lt > 0.6 ? GOLD : '#d8dbe8'; x.beginPath(); x.arc(0, -30 + i * 60, 20, 0, Math.PI * 2); x.fill() }
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9aa5c4'; x.beginPath(); x.arc(r * 0.35, 0, 16, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a door blown open, with light pouring out
function door(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(255,241,200,0.25)'; x.beginPath(); x.moveTo(-90, -170); x.lineTo(90, -170); x.lineTo(200, 190); x.lineTo(-200, 190); x.fill()
  x.fillStyle = INK; x.fillRect(-100, -180, 200, 370)
  x.fillStyle = '#fff1c8'; x.fillRect(-90, -170, 180, 350)
  const sw = ease.outBack(clamp(lt / 0.5))
  x.save(); x.translate(-90, 0); x.scale(1 - 0.75 * sw, 1)
  x.fillStyle = '#8a4a2e'; x.fillRect(0, -170, 180, 350); x.fillStyle = GOLD; x.fillRect(150, 0, 14, 14)
  x.restore()
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Left the house | in *one shoe.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P, F) {
      drawBits(x, SHOE, SHOE_C, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SOCK, { S: BONE }, F.x + 40, F.cy + 150, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      label(x, 800, 720, 'SHOE 2: ???', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “here!” | Still *in the shower.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 12; i++) { const ph = (t * 1.4 + i * 0.37) % 1; drawBits(x, DROP, { D: SKYB }, F.x - 150 + (i * 29) % 300, 520 + ph * 420, 8, { alpha: k * 0.9 }) }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'here!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 56, tail: 'bl', col: '#bff0ff' })
      label(x, 790, 940, 'SENT 9:00', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1060, 'DRY BY 9:40', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Didn’t walk there. | *Sprinted.*', mood: 'wide', look: [1, 0], star: { x: -60 }, squash: 0.05,
    back(x, t, lt, P, F) { speedLines(x, t, F.x - 140, F.cy, pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, '47 KM/H', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 52, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Yelled at the elevator | for *being slow.*', mood: lt => lt > 0.8 ? 'eyeroll' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6, 2.1],
    front(x, t, lt, P) {
      elevator(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 420, 620, 'COME ON!', pop01(t, P.t0 + 0.9, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 30)), { size: 46, tail: 'bc', col: '#ffb0a8' })
    } },
  { sign: S, cap: 'Toast in hand. | Hair *still wet.*', mood: 'wide', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, TOAST, TOAST_C, F.x + 175, F.cy + 30, 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.2 })
      for (let i = 0; i < 4; i++) { const ph = (t * 1.6 + i * 0.25) % 1; drawBits(x, DROP, { D: SKYB }, F.x - 90 + i * 50, F.top + ph * 120, 7, { alpha: pop01(t, P.t0 + 0.6, 0.3, 2) * (1 - ph) }) }
      label(x, 820, 1080, 'BREAKFAST: MOBILE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blamed traffic. | They *walked.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'traffic was | WILD', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.1, 0.3, 2)
      for (let i = 0; i < 5; i++) drawBits(x, ['FF', 'FF', 'FF', '.F'], { F: BONE }, 630 + i * 80, 1000 - (i % 2) * 40, 16 * k, { alpha: clamp((lt - 1.1 - i * 0.12) * 4) })
      label(x, 790, 1120, 'CARS SEEN: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked their chart. | *Blamed Mercury.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1050, 'NOT MY FAULT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Late to the first date. | Sprinted in *with flowers.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.9],
    front(x, t, lt, P, F) {
      drawBits(x, FLOWERS, FLOWERS_C, 800, 900, 24 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.1 })
      label(x, 790, 680, '+22 MIN', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 380, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Still late. | Made an *entrance.*', mood: 'sparkle', star: { x: -40, y: 20 }, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { door(x, t, 540, 860, pop01(t, P.t0 + 0.1, 0.3, 2), lt) },
    front(x, t, lt, P) {
      label(x, 790, 620, 'TA-DA!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 52, bg: GOLD, rot: 0.06 })
      sparkles(x, t, 540, 860, P.t0 + 0.8, 9, 260, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2t0122', key: 'E', accent: ORANGE, solo: 'aries', ending: 'group',
  title: 'Aries running late | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late, loud, | and *worth the wait.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
