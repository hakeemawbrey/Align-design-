// r2a0008: star_advice ADVICE ROLLCALL, "How each sign | moves on." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order: each sign's way of healing after a goodbye, said warmly, with one light gag:
//   ♈ runs it out, then really heals · ♉ bakes bread, lets it rise slowly · ♊ talks it through with everyone (friend #9)
//   · ♋ repaints the room, new chapter · ♌ new haircut, new era · ♍ cleans everything, heart included · ♎ makes a
//   playlist, then a better one · ♏ goes quiet, comes back glowing (cocoon → butterfly) · ♐ gets lost on purpose, finds
//   themself · ♑ sets a goal, climbs it · ♒ a hobby nobody understands (bees) · ♓ writes it down, lets it float away
//  49.2   "Everyone heals | *their own way.*"  group photo
//  52.6   callback: "Taurus’s bread rose. | *So did they.*"  the loaf comes back, Taurus beside it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb38a'
const SHOE = [
  '.....RRRR....',
  '....RRWWR....',
  '...RRRRRRR...',
  'RRRRRRRRRRRRR',
  'RRRRRRRRRRRRR',
  'WWWWWWWWWWWWW',
]
const SHOE_C = { R: '#ff6b5a', W: '#fff4e2' }
const LOAF = [
  '...BBBBBBB...',
  '.BBBLBBBLBBB.',
  'BBBLBBBLBBBBB',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
]
const LOAF_C = { B: '#d9944a', L: '#ffd88a' }
const ROLLER = [
  'PPPPPPPPPP',
  'PPPPPPPPPP',
  '....G.....',
  '....G.....',
  '....K.....',
  '....K.....',
  '....K.....',
]
const COCOON = ['..GG..', '.GGGG.', 'GGDGGG', 'GGGDGG', 'GGDGGG', '.GGGG.', '..GG..']
const FLY = [
  'PP.....PP',
  'PPP...PPP',
  'PPPP.PPPP',
  'PPPPKPPPP',
  '.PPPKPPP.',
  '..PP.PP..',
]
const FLY_C = { P: '#c97bff', K: INK }
const BEE = ['..WW.WW..', '...WWW...', '.YKYKYK..', 'YYKYKYKY.', '.YKYKYK..']
const BEE_C = { W: '#e8eef8', Y: '#ffd23a', K: INK }
const BOAT = ['....W....', '...WW....', '..WWW....', '....K....', 'BBBBBBBBB', '.BBBBBBB.']
const BOAT_C = { W: '#fff4e2', K: '#9aa5c4', B: '#fff4e2' }
const MOUNT = [
  '......R.......',
  '......RR......',
  '......K.......',
  '.....WWW......',
  '....WGGGW.....',
  '...GGGGGGG....',
  '..GGGGGGGGGG..',
  '.GGGGGGGGGGGG.',
  'GGGGGGGGGGGGGG',
]
const MOUNT_C = { R: '#ff6b5a', K: INK, W: '#fff4e2', G: '#9aa5c4' }

function bubbles(x, t, cx, cy, n = 8) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.5 + i / n) % 1 + 1) % 1
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.8; x.strokeStyle = '#e8eef8'; x.lineWidth = 4
    x.beginPath(); x.arc(cx + Math.sin(i * 2.1) * 140, cy - ph * 260, 12 + (i % 3) * 8, 0, Math.PI * 2); x.stroke(); x.restore()
  }
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Runs it out. | Then *really heals.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHOE, SHOE_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 790, 700, 'MILE 12', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'FEELINGS: FELT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Bakes bread. | Lets it *rise slowly.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const rise = 0.7 + 0.5 * ease.inOutQuad(prog(lt, 0.4, 2.0))
      drawBits(x, LOAF, LOAF_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: rise })
      label(x, 790, 700, 'TAKING ITS TIME', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Talks it through | *with everyone.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))
      bubble(x, 780, 700, 'so basically…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 940, `FRIEND #${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 46, bg: '#ffe36a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'ALL OF THEM CARE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.03 })
    } },
  { sign: 'cancer', cap: 'Repaints the room. | *New chapter.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const p = ease.inOutQuad(prog(lt, 0.3, 1.8))
      x.save(); x.fillStyle = '#5a4a8a'; x.fillRect(600, 560, 290, 560); x.fillStyle = '#ffd1a8'; x.fillRect(600, 560, 290 * p, 560); x.restore()
      drawBits(x, ROLLER, { P: '#ffd1a8', G: '#9aa5c4', K: INK }, 600 + 290 * p, 760, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) { label(x, 790, 1060, 'COLOUR: “FRESH START”', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 }) } },
  { sign: 'leo', cap: 'New haircut. | *New era.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 880); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 170, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c98f2a'; x.beginPath(); x.ellipse(0, 0, 120, 160, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(0, 0, 100, 140, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-60, -90, 18, 80); x.restore() }
      label(x, 790, 1110, 'ERA: NEW', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 790, 880, P.t0 + 1.2, 8, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'Cleans everything. | *Heart included.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubbles(x, t, 790, 1060, 9)
      label(x, 790, 700, 'SPOTLESS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: MINT, rot: -0.04 })
      label(x, 790, 900, 'SOUL: RINSED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Makes a playlist. | *Then a better one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 1080, { n: 5, cell: 12, col: PINK, seed: 3 })
      const v = Math.min(12, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.15))
      label(x, 790, 760, `HEALING VOL. ${v}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Goes quiet. | Comes back *glowing.*', mood: lt => lt > 1.4 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), out = lt > 1.3
      if (!out) drawBits(x, COCOON, { G: '#8a7f6a', D: '#5a4f3a' }, 800, 860, 26 * k)
      else { const f = 1 + 0.15 * Math.sin(t * 14); drawBits(x, FLY, FLY_C, 800, 800 - 30 * Math.sin(t * 2), 22, { sx: f }) }
      sparkles(x, t, 800, 840, P.t0 + 1.7, 8, 180, 0.4)
      label(x, 790, 1110, out ? 'GLOW: ON' : 'DO NOT DISTURB', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: out ? GOLD : '#9aa5c4', rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'Gets lost on purpose. | *Finds themself.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = '#f3e2b8'; x.fillRect(-162, -122, 324, 244)
        x.strokeStyle = '#c96a3a'; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(-130, 80); x.bezierCurveTo(-60, -100, 40, 120, 110, -60); x.stroke(); x.setLineDash([])
        x.fillStyle = '#e23d4e'; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✕', 110, -60)
        x.restore()
      }
      label(x, 790, 1100, 'FOUND: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: '#c97bff', color: '#fff4e2', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Sets a goal. | *Climbs it.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1150, 'SUMMIT: REACHED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Starts a hobby | *nobody understands.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BEE, BEE_C, 760 + i * 70 + 30 * Math.sin(t * 3 + i * 2), 820 + i * 50 + 20 * Math.cos(t * 4 + i), 12 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      label(x, 790, 660, 'NEW HOBBY: BEES', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: '#ffd23a', rot: -0.04 })
      bubble(x, 790, 1110, 'they get me.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Writes it down. | *Lets it float away.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = ease.inOutQuad(prog(lt, 0.8, 2.4))
      x.save(); x.fillStyle = 'rgba(111,195,255,0.35)'; x.fillRect(110, 1100, 860, 110); x.restore()
      drawBits(x, BOAT, BOAT_C, lerp(640, 930, p), 1070 + 6 * Math.sin(t * 3), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: 1 - prog(lt, 2.0, 2.4) * 0.6 })
      label(x, 790, 720, 'BYE, FEELINGS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0008', key: 'C', accent: ACC, ending: 'callback',
  title: 'How each sign | *moves on.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone heals | *their own way.*' },
  last: {
    text: 'Taurus’s bread rose. | *So did they.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      drawBits(x, LOAF, LOAF_C, 680, 1120, 26 * k, { sy: 1.2 })
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1100, 240 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0], seed: 85, glyph: false, hops: [t - lt + 1.2] })
      sparkles(x, t, 680, 1110, t - lt + 1.0, 8, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
