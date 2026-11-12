// r2t0127: star_talk, SOLO, "Libras when friends | argue." (~47 s vertical, signs3kit social cut, music: lofi · E)
// The whole film is one sign (makeFilm solo mode, 9 cards). The two friends are always the same pair: Aries and Cancer.
//   0.0–3.6    "Libras when friends | *argue.*"
//   3.6–37.8   brought peace snacks · agreed with both, out loud · weighed both sides on a real scale
//              · booked a peace summit · changed the subject seven times · ran their compatibility, explains a lot
//              · group chat fight, sent one heart each · wrote a pros-and-cons list for the fight · they made up, Libra needs a nap
//  37.8        "Peacekeeper. | *Off duty.*"
//  41.2        CALLBACK: "The fight’s over. | The snacks *aren’t.*"  Libra and the peace snacks.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9fc6', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const COOKIE = ['.CCCC.', 'CCkCCC', 'CCCCkC', 'CkCCCC', 'CCCkCC', '.CCCC.']
const COOKIE_C = { C: '#e0a56a', k: BROWN }
// a plate of peace snacks
function platter(x, t, cx, cy, k, n = 6) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 200, 56, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 34, 188, 46, 0, 0, Math.PI * 2); x.fill()
  const POS = [[-110, 16], [-40, 6], [30, 10], [100, 18], [-70, -30], [10, -34], [80, -26]]
  for (let i = 0; i < Math.min(n, POS.length); i++) drawBits(x, COOKIE, COOKIE_C, POS[i][0], POS[i][1], 11)
  x.restore()
}
// the two friends, glaring at each other (or not)
function friends(x, t, cx, cy, k, { size = 150, gap = 210, mood = 'squint', seed = 50 } = {}) {
  if (k <= 0.01) return
  signChar(x, t, 'aries', cx - gap / 2, cy, size * k, { mood, look: [1, 0], seed, glyph: false })
  signChar(x, t, 'cancer', cx + gap / 2, cy, size * k, { mood, look: [-1, 0], seed: seed + 1, glyph: false })
}
function bolt(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-14, -46); x.lineTo(26, -46); x.lineTo(6, -6); x.lineTo(30, -6); x.lineTo(-20, 54); x.lineTo(-4, 8); x.lineTo(-26, 8); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(-8, -40); x.lineTo(18, -40); x.lineTo(0, -2); x.lineTo(20, -2); x.lineTo(-12, 38); x.lineTo(0, 4); x.lineTo(-18, 4); x.fill()
  x.restore()
}
// a balance scale: two pans, a beam that tips with `tilt` (−1…1)
function scales(x, t, cx, cy, k, tilt, draw) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, -170, 32, 330); x.fillRect(-90, 150, 180, 28)
  x.fillStyle = GOLD; x.fillRect(-9, -164, 18, 318); x.fillRect(-84, 154, 168, 18)
  const a = tilt * 0.22
  const end = s => ({ x: Math.cos(a) * 190 * s, y: -150 + Math.sin(a) * 190 * s })
  x.save(); x.translate(0, -150); x.rotate(a); x.fillStyle = INK; x.fillRect(-200, -12, 400, 24); x.fillStyle = GOLD; x.fillRect(-194, -6, 388, 12); x.restore()
  for (const s of [-1, 1]) {
    const e = end(s)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(e.x, e.y); x.lineTo(e.x - 60, e.y + 110); x.moveTo(e.x, e.y); x.lineTo(e.x + 60, e.y + 110); x.stroke()
    x.fillStyle = INK; x.fillRect(e.x - 80, e.y + 104, 160, 22); x.fillStyle = GOLD; x.fillRect(e.x - 74, e.y + 108, 148, 12)
    if (draw) draw(s, e.x, e.y + 100)
  }
  x.restore()
}

const S = 'libra'
const CAMEOS = [
  // 1 · peace snacks
  { sign: S, cap: 'Two friends arguing? | Libra *brings snacks.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friends(x, t, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), { mood: lt < 1.2 ? 'squint' : 'heart', size: 140 })
      if (lt < 1.2) bolt(x, 790, 730, pop01(t, P.t0 + 0.4, 0.25, 2))
      platter(x, t, 790, 1000, pop01(t, P.t0 + 0.9, 0.3, 2.2))
      label(x, 790, 1140, 'PEACE SNACKS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · agreed with both
  { sign: S, cap: 'Agreed with both. | *Out loud.*', mood: 'happy', look: lt => lt < 1.1 ? [-1, 0] : [1, 0], star: { x: 0, y: 90, s: 240 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 260, 960, 150 * k, { mood: 'squint', look: [1, 0], seed: 61, glyph: false }); signChar(x, t, 'cancer', 820, 960, 150 * k, { mood: 'squint', look: [-1, 0], seed: 62, glyph: false }) }
      bubble(x, 330, 640, 'you’re | right!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: ROSE, tail: 'br' })
      bubble(x, 750, 640, 'so are | you!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: ROSE, tail: 'bl' })
      label(x, 540, 1150, 'SIDE PICKED: BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  // 3 · weighed both sides (the scale)
  { sign: S, cap: 'Weighed both sides. | *Literally.*', mood: lt => lt < 1.5 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const tilt = lt < 1.5 ? Math.sin(lt * 5) : Math.sin(lt * 5) * Math.exp(-(lt - 1.5) * 4)
      scales(x, t, 780, 900, pop01(t, P.t0 + 0.15, 0.3, 2), tilt, (s, px, py) => signChar(x, t, s < 0 ? 'aries' : 'cancer', px, py - 40, 110, { mood: 'squint', seed: 70 + s, glyph: false }))
      label(x, 780, 1140, 'BALANCE: PERFECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 4 · a peace summit
  { sign: S, cap: 'Booked them a | *peace summit.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 790, 860, 330, 340, CREAM, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04)) {
        x.fillStyle = ROSE; x.fillRect(-165, -170, 330, 60)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGENDA', 0, -138)
        x.font = `700 32px ${MONO}`; x.textAlign = 'left'
        ;['1. hugs', '2. snacks', '3. more hugs', '4. group pic'].forEach((l, i) => { if (lt > 0.4 + i * 0.25) x.fillText(l, -130, -70 + i * 60) })
        x.restore()
      }
      label(x, 790, 1110, 'DRESS CODE: CALM', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 5 · changed the subject
  { sign: S, cap: 'Changed the subject. | *Seven times.*', mood: lt => lt < 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const TOP = ['anyway…', 'cute shoes!', 'ducks?', 'look, a cloud', 'who’s hungry?', 'fun fact…', 'MOVIE NIGHT?']
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.3))
      bubble(x, 790, 760, TOP[n], pop01(t, P.t0 + 0.2 + n * 0.3, 0.2, 2.4), { size: 46, col: [ROSE, SKYB, MINT, GOLD][n % 4], tail: 'bl' })
      label(x, 790, 1080, `TOPICS: ${n + 1}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · Align: ran their compatibility
  { sign: S, cap: 'Ran their compatibility. | *Explains a lot.*', mood: lt => lt < 1.3 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 600, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      friends(x, t, 790, 830, pop01(t, P.t0 + 0.35, 0.3, 2), { mood: 'neutral', size: 150, gap: 220 })
      label(x, 790, 1060, 'FIRE + WATER: STEAM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 7 · group chat fight
  { sign: S, cap: 'Group chat fight? | Sent *one heart each.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'ARIES: | WOW.', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 36, col: '#ff8a7a', tail: 'br' })
      bubble(x, 820, 800, 'CANCER: | fine.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
      bubble(x, 760, 990, '♡   ♡', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 52, col: ROSE, tail: 'bl' })
      hearts(x, t, 760, 960, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
  // 8 · pros and cons
  { sign: S, cap: 'Made a pros-and-cons list. | For *the fight.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), unroll = ease.outCubic(prog(lt, 0.3, 1.4))
      if (card(x, 790, 600 + 280 * unroll, 300, 80 + 560 * unroll, CREAM, k, 0)) {
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const top = -(40 + 280 * unroll)
        x.fillText('PROS   CONS', 0, top + 34); x.fillRect(-4, top + 60, 8, 520 * unroll)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < Math.floor(unroll * 9); i++) { x.fillRect(-120, top + 80 + i * 56, 90, 12); x.fillRect(30, top + 80 + i * 56, 90, 12) }
        x.restore()
      }
      label(x, 600, 1160, 'PAGES: 4', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  // 9 · they made up
  { sign: S, cap: 'They made up. | Libra *needs a nap.*', mood: lt => lt < 1.0 ? 'sparkle' : 'sleepy', star: { x: -190, y: 30 },
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friends(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), { mood: 'heart', size: 150, gap: 170 })
      hearts(x, t, 790, 720, P.t0 + 0.4, { n: 6, life: 1.8, spread: 200, cell: 7, seed: 3 })
      label(x, 790, 1070, 'PEACE: RESTORED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 380, 640, 'SOCIAL BATTERY: LOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0127', key: 'E', accent: ROSE, solo: 'libra', ending: 'callback',
  title: 'Libras when friends | *argue.*',
  cameos: CAMEOS,
  group: { cap: 'Peacekeeper. | *Off duty.*', mood: 'sleepy' },
  last: {
    text: 'The fight’s over. | The snacks *aren’t.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 360, 1040, 340 * k, { mood: lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      platter(x, t, 760, 1110, 1.5 * pop01(t, t - lt + 0.8, 0.35, 2), Math.max(1, 7 - Math.floor(Math.max(0, lt - 1.6) / 0.35)))
      sparkles(x, t, 760, 1060, t - lt + 1.0, 7, 180, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
