// v3t035: THE SIGNS AS… v3, "The signs | with no wifi." (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   the wifi goes out, one sign per card, each pushed to the extreme:
//              ♈ fought the router · ♉ didn't notice, asleep since noon · ♊ called everyone to tell them
//              · ♋ made it a family game night · ♌ couldn't post, performed for the neighbours · ♍ fixed it, re-cabled the house
//              · ♎ asked the router nicely · ♏ knows exactly who unplugged it (Gemini) · ♐ went outside, loved it
//              · ♑ worked anyway, on paper · ♒ built their own internet · ♓ died mid-chat with their match
//  49.2        group (the ending): "Wifi’s back. | *Nobody noticed.*" — the wifi bars light up over the group photo
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2', GREEN = '#5fd068'

// the wifi fan: n of 3 arcs lit (dead arcs grey), optional red slash
function wifi(x, cx, cy, s, k, n, { slash = false, col = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s); x.lineCap = 'round'
  for (let i = 0; i < 3; i++) {
    const r = 40 + i * 36
    x.lineWidth = 26; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, r, -Math.PI * 0.75, -Math.PI * 0.25); x.stroke()
    x.lineWidth = 16; x.strokeStyle = i < n ? col : '#4a4070'; x.beginPath(); x.arc(0, 0, r, -Math.PI * 0.75, -Math.PI * 0.25); x.stroke()
  }
  x.fillStyle = INK; x.fillRect(-16, -16, 32, 32); x.fillStyle = n > 0 ? col : '#4a4070'; x.fillRect(-10, -10, 20, 20)
  if (slash) { x.lineWidth = 22; x.strokeStyle = INK; x.beginPath(); x.moveTo(-110, -150); x.lineTo(110, 10); x.stroke(); x.lineWidth = 12; x.strokeStyle = RED; x.stroke() }
  x.restore()
}
const ROUTER = [
  '.K........K.',
  '.K........K.',
  '.K........K.',
  'BBBBBBBBBBBB',
  'BLBLBLBBBBBB',
  'BBBBBBBBBBBB',
]
const ROUTER_C = { K: '#5a5a7a', B: '#2a2350', L: RED }
const DICE = [
  'WWWWW',
  'WKWWW',
  'WWKWW',
  'WWWKW',
  'WWWWW',
]
const PLUG = [
  '.K.K.',
  '.K.K.',
  'WWWWW',
  'WWWWW',
  'WWWWW',
  '.WWW.',
  '..C..',
  '..C..',
  '..C..',
]
const TREE = [
  '...GGG...',
  '.GGGGGGG.',
  'GGGgGGGGG',
  'GGGGGGgGG',
  '.GGGGGGG.',
  '...BB....',
  '...BB....',
]
const PAPERS = [
  '.WWWWWWW.',
  'WWWWWWWWW',
  'WKKKKKWWW',
  'WWWWWWWWW',
  'WKKKWKKKW',
  'WWWWWWWWW',
  'WKKKKWWWW',
  'WWWWWWWWW',
]
const DISH = [
  '.SSSSSS..',
  'S......S.',
  '.S....S..',
  '..SSSS...',
  '....K....',
  '...KKK...',
  '..KKKKK..',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Wifi down. | Fought *the router.*', mood: lt => lt > 0.8 ? 'wide' : 'squint', star: { x: -150 }, hops: [0.4, 0.7, 1.0, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shake = lt > 0.5 ? Math.sin(t * 40) * 8 : 0
      drawBits(x, ROUTER, ROUTER_C, 810 + shake, 940, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: shake * 0.01 })
      label(x, 810, 660, 'ROUND 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: RED, color: CREAM, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Didn’t notice. | *Asleep since noon.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      wifi(x, 800, 960, 1.5, pop01(t, P.t0 + 0.2, 0.3, 2), 0, { slash: true })
      bubble(x, 800, 650, 'zzz', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Called *everyone* | to say it’s down.', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['mom!', 'Sam!', 'Jo!', 'Dee!', 'neighbour!']
      bubble(x, 790, 700, 'CALLING ' + W[Math.min(4, Math.floor(lt / 0.45))], pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1020, 'CALLS: ' + (1 + Math.floor(lt / 0.2)), pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made it | *family game night.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DICE, { W: CREAM, K: INK }, 720, 960, 22 * k, { rot: -0.2 })
      drawBits(x, DICE, { W: CREAM, K: INK }, 860, 980, 22 * k, { rot: 0.25 })
      label(x, 790, 680, 'NO PHONES!', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 42, bg: SKYB, rot: -0.05 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: 'leo', cap: 'Couldn’t post. | Sang *for the neighbours.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = 0.28 * clamp(k); x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 470); x.lineTo(470, 470); x.lineTo(560, 1150); x.lineTo(180, 1150); x.fill(); x.restore()
      label(x, 790, 690, 'ENCORE?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 960, 'nobody | asked', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Fixed it. | Re-cabled *the house.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, ROUTER, { ...ROUTER_C, L: MINT }, 790, 760, 20 * k)
      const C = [RED, GOLD, SKYB, MINT, PINK]
      const n = clamp((lt - 0.4) / 1.2)
      for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(686 + i * 50 - 3, 820, 18, 300 * n + 3); x.fillStyle = C[i]; x.fillRect(686 + i * 50, 820, 12, 300 * n) }
      label(x, 790, 1150, 'TIDY ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Restarted the router. | Asked it *nicely.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, ROUTER, ROUTER_C, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'pretty | please?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 3, life: 1.0, spread: 160, cell: 6, seed: 7 })
    } },
  { sign: 'scorpio', cap: 'Knows *exactly* | who unplugged it.', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLUG, { K: '#9aa5c4', W: CREAM, C: INK }, 790, 920, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      label(x, 790, 660, 'IT WAS GEMINI', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Went outside. | *Loved it.*', mood: 'sparkle', star: { x: 150 }, hops: [0.4, 0.9, 1.4],
    front(x, t, lt, P) {
      drawBits(x, TREE, { G: GREEN, g: '#2a8a3a', B: BROWN }, 330, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 1120, 'GRASS: TOUCHED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Worked anyway. | *On paper.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, PAPERS, { W: CREAM, K: '#b9b0a0' }, 790 + (i % 2) * 14, 1000 - i * 70, 18 * k, { rot: (i % 2 ? 0.05 : -0.04) })
      label(x, 790, 650, 'EMAILS: BY HAND', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Built their own | *internet.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DISH, { S: '#9aa5c4', K: '#5a5a7a' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      if (lt > 1.0) sparkles(x, t, 740, 760, P.t0 + 1.0 * 1.29, 6, 120, 0.3, [SKYB, BONE])
      label(x, 790, 1100, 'NET v2 ✦', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'It died mid-chat | *with their match.*', mood: lt => lt < 0.6 ? 'happy' : 'wide', tears: lt => lt < 0.6 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      wifi(x, 800, 1080, 1.2, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 0.5 ? 3 : 0, { slash: lt >= 0.5 })
      bubble(x, 800, 700, 'they’ll think | i LEFT', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t035', key: 'G', accent: '#7dffb0', ending: 'group',
  title: 'The signs | *with no wifi.*',
  cameos: CAMEOS,
  group: {
    cap: 'Wifi’s back. | *Nobody noticed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.6, 0.4, 2)
      wifi(x, 540, 800, 1.4, k, Math.min(3, Math.floor(clamp((lt - 1.8) / 1.2) * 3 + 0.001)), { col: MINT })
      if (lt > 3.0) label(x, 540, 600, 'CONNECTED', pop01(t, t - lt + 3.0, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
