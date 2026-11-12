// r2t0061: THE SIGNS AS… v3, SOLO film, "Libras with a secret | be like." (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine attempts to keep one secret, each pushed to the most extreme (and lovable) Libra.
//   0.0–3.6    "Libras with a secret | *be like.*"  One big Libra pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              told both sides, to be fair · poker face lasted four seconds · gift-wrapped the secret
//              · planning your surprise, asked YOU to pick the cake · sent you your crush's birth chart
//              · typed it, deleted it, forty drafts · should they tell? held a vote: tied
//              · whispered it to a houseplant · kept it all day, cracked at "how are you?"
//  37.8        "Lips sealed. | *Mostly.*"  Libra comes back, big.
//  41.2        CALLBACK: "The tiebreaker vote? | *Also Libra.*"  The ballot box returns: YES 3 · NO 2.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'libra', MAG = '#e163d6', RED = '#e23d4e'

// ── props
const SCALES = [
  '......GG......',
  '......GG......',
  'GGGGGGGGGGGGGG',
  'G.....GG.....G',
  'G.....GG.....G',
  'GG....GG....GG',
  'GGG...GG...GGG',
  '......GG......',
  '......GG......',
  '....GGGGGG....',
]
const GIFT = [
  'PP..RR..PP',
  '.PP.RR.PP.',
  '..PPRRPP..',
  'MMMMRRMMMM',
  'MMMMRRMMMM',
  'RRRRRRRRRR',
  'MMMMRRMMMM',
  'MMMMRRMMMM',
  'MMMMRRMMMM',
  'MMMMRRMMMM',
]
const GIFT_C = { P: PINK, R: GOLD, M: MAG }
const CAKE = [
  '...F..F..F...',
  '...C..C..C...',
  '.WWWWWWWWWWW.',
  'WPWWPWWPWWPWW',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  'WWWWWWWWWWWWW',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
]
const CAKE_C = { F: GOLD, C: SKYB, W: '#fff4e2', P: PINK, B: '#8a4a2e' }
const PLANT = [
  '..G...G..',
  '.GGG.GGG.',
  'GGGGGGGGG',
  '.GGGGGGG.',
  '...GGG...',
  '....G....',
  '.TTTTTTT.',
  '.TTTTTTT.',
  '..TTTTT..',
  '..TTTTT..',
]
const PLANT_C = { G: '#5fd068', T: '#c9673a' }

const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) x.fillRect(Math.cos(a) * r * 0.45 - 7, Math.sin(a) * r * 0.45 - 7, 14, 14)
  x.restore()
}
// a phone: a draft line types in, gets deleted, again and again
function phone(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -196, 256, 404)
  x.fillStyle = INK; x.fillRect(-134, -208, 268, 416)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -198, 248, 396)
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  // incoming bubble
  x.fillStyle = '#3d3470'; x.fillRect(-96, -150, 196, 60)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('so… tell?', -84, -119)
  // the draft box at the bottom: types, then deletes
  const ph = (lt * 1.6) % 1, full = 'OK SO…', n = Math.floor(clamp(ph < 0.6 ? ph / 0.6 : 1 - (ph - 0.6) / 0.4) * full.length)
  x.fillStyle = BONE; x.fillRect(-100, 100, 200, 54)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText(full.slice(0, n) + (Math.floor(lt * 4) % 2 ? '|' : ''), -88, 128)
  x.restore()
}
// a ballot box with a little tally card above it
function ballot(x, cx, cy, k, yes, no, sc = 1.25) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * sc, k * sc)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-120, -60, 252, 220)
  x.fillStyle = INK; x.fillRect(-132, -72, 264, 224)
  x.fillStyle = BONE; x.fillRect(-124, -64, 248, 208)
  x.fillStyle = INK; x.fillRect(-70, -64, 140, 16)
  x.fillStyle = MAG; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TELL?', 0, 20)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.fillText(`YES ${yes} · NO ${no}`, 0, 90)
  x.restore()
}
// a paper slip dropping into the slot
function slip(x, cx, cy, p) {
  if (p <= 0 || p >= 1) return
  x.save(); x.translate(cx, lerp(cy - 160, cy - 60, ease.inCubic(p))); x.globalAlpha = 1 - prog(p, 0.85, 1)
  x.fillStyle = INK; x.fillRect(-36, -26, 72, 52); x.fillStyle = '#fff4e2'; x.fillRect(-32, -22, 64, 44)
  x.fillStyle = MAG; x.fillRect(-20, -6, 40, 8); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Promised to keep it. | Told *both sides.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), tip = Math.sin(t * 2.4) * 0.08
      drawBits(x, SCALES, { G: GOLD }, 790, 870, 22 * k, { rot: tip })
      bubble(x, 680, 690, 'psst', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 900, 690, 'psst', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 790, 1100, 'FAIR IS FAIR', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Poker face. | Lasted *four seconds.*', mood: lt => lt < 1.5 ? 'neutral' : 'wide', look: [0, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.32))
      label(x, 790, 760, lt < 1.6 ? `0:0${n}` : '0:04', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 80, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 790, 960, 'LEAKED', pop01(t, P.t0 + 1.6, 0.3, 2.6), { size: 52, bg: RED, color: '#fff4e2', rot: -0.07 })
      sparkles(x, t, 790, 960, P.t0 + 1.6, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Kept the secret. | *Gift-wrapped it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.05 })
      label(x, 790, 650, 'TOP SECRET (CUTE)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05 })
      sparkles(x, t, 790, 880, P.t0 + 1.25, 8, 190, 0.6)
    } },
  { sign: S, cap: 'Planning your surprise. | Asked *you* to pick.', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 950, 20 * pop01(t, P.t0 + 0.25, 0.35, 2))
      bubble(x, 790, 690, 'chocolate or | vanilla? no reason.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1130, 'TOTALLY NO REASON', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Knows your crush likes you. | Sent *their chart.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 830, 140, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 790, 1060, 'COMPATIBLE. JUST SAYING.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Typed it. Deleted it. | *Forty times.*', mood: lt => lt > 1.6 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const n = Math.min(40, 1 + Math.floor(Math.max(0, lt - 0.4) / 1.6 * 40))
      label(x, 790, 610, `DRAFTS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Should they tell? | Held a vote. *Tied.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      ballot(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.2 ? 2 : lt > 0.9 ? 2 : 1, lt > 1.5 ? 2 : 1)
      slip(x, 790, 900, prog(lt, 0.5, 1.0))
      slip(x, 790, 900, prog(lt, 1.0, 1.5))
      label(x, 790, 640, 'TIE. AGAIN.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 38, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: S, cap: 'Told nobody. | Just *the houseplant.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 950, 24 * pop01(t, P.t0 + 0.25, 0.35, 2))
      bubble(x, 760, 690, 'okay so…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 830, 1150, 'PLANT: SHOOK', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: '#5fd068', rot: 0.05 })
    } },
  { sign: S, cap: 'Kept it all day. | Cracked at *“how are you?”*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.2, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 980, 200 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 820, 740, 'how are you?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'br' })
      bubble(x, 520, 600, 'OKAY SO—', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 50, col: PINK, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0061', key: 'C', accent: MAG, solo: S, ending: 'callback',
  title: 'Libras with a secret | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Lips sealed. | *Mostly.*', mood: 'wink' },
  last: {
    text: 'The tiebreaker vote? | *Also Libra.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, S, 330, 1000, 320 * a, { mood: lt > 1.4 ? 'wink' : 'happy', look: [1, 0], seed: 31, hops: [t0 + 1.0] })
      ballot(x, 740, 1060, pop01(t, t0 + 0.6, 0.4, 2), 2 + (lt > 1.4 ? 1 : 0), 2, 1.7)
      slip(x, 740, 980, prog(lt, 0.9, 1.4))
      sparkles(x, t, 730, 1040, t0 + 1.45, 8, 180, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
