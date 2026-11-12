// r2t0095: star_talk, BE LIKE, "Trying to whistle. | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself trying to whistle.
//   0.0–3.6    "Trying to whistle. | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one sign per card (3.8 s each):
//              ♈ blew so hard their hat flew off · ♉ can't, hums very confidently · ♊ two songs at once · ♋ a lullaby, everyone
//              fell asleep · ♌ can't, brought a trumpet · ♍ read a forty-page guide, still just air · ♎ one note, perfectly in tune
//              · ♏ whistles perfectly, never tells (like their birth time) · ♐ whistled for a taxi, a horse showed up
//              · ♑ took lessons, level 9 · ♒ whistled at a bird, now they're a band · ♓ finally whistled, cried, so proud
//  49.2        "Not one | *actual whistle.*"  The twelve fly up into a group photo.
//  52.6        callback: "Sag’s horse? | *Still outside.*"  The horse trots back in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#8a4a2e'

// ── props
const HAT = [
  '...RRRR...',
  '..RRRRRR..',
  '..RRRRRR..',
  '..YYYYYY..',
  'RRRRRRRRRR',
]
const HAT_C = { R: RED, Y: GOLD }
const TRUMPET = [
  '.............YY',
  '............YYY',
  'YY..........YYY',
  'YYYYYYYYYYYYYYY',
  'YY.Y.Y.Y....YYY',
  '............YYY',
  '.............YY',
]
const HORSE = [
  '..........MM.',
  '.........MBBB',
  '........MBBKB',
  '........BBBBB',
  'T......BBB...',
  'TBBBBBBBBB...',
  'TBBBBBBBBB...',
  '.BBBBBBBBB...',
  '.B.B...B.B...',
  '.B.B...B.B...',
  '.H.H...H.H...',
]
const HORSE_C = { B: '#c98f6a', M: '#5b2e1a', T: '#5b2e1a', K: INK, H: INK }
const BIRD = [
  '..BBB...',
  '.BBKBB..',
  'OBBBBBB.',
  '..BBBBBB',
  '..BWWWB.',
  '...B.B..',
]
const BIRD_C = { B: SKYB, K: INK, O: GOLD, W: '#ffffff' }
const STICKER = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.', 'Y.....Y']

/** "fwoo" puffs coming out of the star's mouth toward dir */
function puffs(x, t, F, dir = 1, { n = 4, col = BONE, alpha = 0.7, len = 200 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 1.4 + i / n) % 1)
    x.save(); x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillStyle = col
    x.fillRect(F.x + dir * (80 + ph * len), F.cy + 20 + Math.sin(i * 2) * 26, dir * (30 + 20 * ph), 8)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Blew so hard | *their hat flew off.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      puffs(x, t, F, 1, { n: 6, len: 360, alpha: 0.85 })
      const f = ease.outCubic(prog(lt, 0.9, 1.8))
      drawBits(x, HAT, HAT_C, lerp(F.x, 820, f), lerp(F.top - 30, 680, f) - Math.sin(Math.PI * f) * 80, 16 * P.k, { rot: f * 4 })
      label(x, 790, 1080, 'SOUND: NONE. WIND: YES.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Can’t whistle. | Hums *very confidently.*', mood: lt => lt > 0.8 ? 'happy' : 'neutral', star: { x: -170 },
    front(x, t, lt, P, F) {
      if (lt > 0.6) notes(x, t, F.x + 120, F.cy - 40, { n: 5, cell: 9, col: GOLD, seed: 2 })
      bubble(x, 790, 680, 'hmm hmm HMMM', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 900, 'CONFIDENCE: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Whistled two songs. | *At the same time.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', star: { x: 0, y: 30, s: 260 },
    front(x, t, lt, P, F) {
      if (lt > 0.4) { notes(x, t, 300, F.cy, { n: 4, cell: 9, col: GOLD, seed: 1 }); notes(x, t, 780, F.cy, { n: 4, cell: 9, col: PINK, seed: 4 }) }
      label(x, 250, 680, 'SONG A', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 830, 680, 'SONG B', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 540, 1160, 'SOMEHOW, BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: '#ffd23a', rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Whistled a lullaby. | *Everyone fell asleep.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P, F) {
      if (lt > 0.3) notes(x, t, F.x + 140, F.cy - 40, { n: 4, cell: 8, col: SKYB, seed: 3 })
      const IDS = ['aries', 'leo', 'sagittarius']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 680 + i * 110, 1000 - (i % 2) * 40, 120 * k, { mood: lt > 0.9 + i * 0.25 ? 'sleepy' : 'neutral', seed: 40 + i, glyph: false, glow: 0.7 })
      })
      label(x, 790, 760, 'AWAKE: 1 (CANCER)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Can’t whistle. | *Brought a trumpet.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, TRUMPET, { Y: GOLD }, F.x + 290, F.cy + 10, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.1 })
      if (lt > 0.8) notes(x, t, F.x + 420, F.cy - 40, { n: 5, cell: 10, col: GOLD, seed: 5 })
      label(x, 790, 720, 'TA-DAAA!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: '#ffb34a', rot: 0.05 })
      sparkles(x, t, 600, 900, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Read a forty-page guide. | *Still just air.*', mood: lt => lt > 1.4 ? 'eyeroll' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 800); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#2fc79a'; x.fillRect(-122, -162, 244, 324)
        x.fillStyle = CREAM; x.fillRect(-100, -130, 200, 120)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('WHISTLING', 0, -90); x.font = `700 20px ${MONO}`; x.fillText('a complete guide', 0, -48)
        x.fillStyle = CREAM; x.font = `700 22px ${MONO}`; x.fillText('pg. 40 / 40', 0, 110)
        x.restore()
      }
      if (lt > 1.2) puffs(x, t, F, 1, { n: 3, alpha: 0.5, len: 120 })
      label(x, 790, 1080, 'RESULT: “fffff”', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Whistled one note. | *Perfectly in tune.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -100, 300, 200); x.fillStyle = '#2a2350'; x.fillRect(-142, -92, 284, 184)
        x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.arc(0, 60, 110, Math.PI * 1.15, Math.PI * 1.85); x.stroke()
        x.fillStyle = MINT; x.fillRect(-4, -60, 8, 30)
        const a = -Math.PI / 2 + lerp(-0.6, 0, ease.outCubic(prog(lt, 0.5, 1.1))) + 0.04 * Math.sin(t * 20) * (1 - prog(lt, 0.5, 1.1))
        x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 60); x.lineTo(Math.cos(a) * 100, 60 + Math.sin(a) * 100); x.stroke()
        x.restore()
      }
      notes(x, t, F.x + 130, F.cy - 40, { n: 1, cell: 10, col: PINK, seed: 1 })
      label(x, 790, 1040, 'PITCH: PERFECT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Whistles perfectly. | *Never tells anyone.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'whistle? | me? no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      label(x, 790, 880, 'SKILL: CLASSIFIED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: '#c97bff', rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, 'BIRTH TIME: ALSO', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Whistled for a taxi. | *A horse showed up.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: 170 }, hops: [1.3],
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.6, 1.4))
      drawBits(x, HORSE, HORSE_C, lerp(-100, 330, p), 960 - Math.abs(Math.sin(lt * 12)) * 10 * (1 - p), 22 * P.k)
      bubble(x, 600, 640, 'TAXI!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 310, 1150, 'RIDE: ARRIVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Took lessons. | *Now level nine.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(300, 820); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 260); x.fillStyle = CREAM; x.fillRect(-162, -122, 324, 244)
        x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-146, -106, 292, 212)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CERTIFIED WHISTLER', 0, -60)
        x.font = `800 56px ${INTER}`; x.fillStyle = '#2fc79a'; x.fillText(`LEVEL ${Math.min(9, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 8))}`, 0, 20)
        x.fillStyle = RED; x.beginPath(); x.arc(110, 80, 26, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 300, 1100, 'LESSONS: 212', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Whistled at a bird. | *Now they’re a band.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, BIRD, BIRD_C, 800, 900, 18 * pop01(t, P.t0 + 0.3, 0.35, 2), { sx: -1 })
      if (lt > 0.6) { notes(x, t, F.x + 100, F.cy - 40, { n: 3, cell: 8, col: SKYB, seed: 2 }); notes(x, t, 800, 840, { n: 3, cell: 8, col: GOLD, seed: 6 }) }
      label(x, 790, 700, 'BAND: THE RISING SIGNS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'TOUR: SPRING', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Finally whistled. | *Cried, so proud.*', mood: lt => lt < 1.0 ? 'squint' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      if (lt > 0.7) notes(x, t, F.x + 120, F.cy - 40, { n: 2, cell: 9, col: LAV, seed: 3 })
      drawBits(x, STICKER, { Y: GOLD }, 800, 820, 20 * pop01(t, P.t0 + 1.0, 0.35, 2.6), { rot: 0.15 })
      label(x, 790, 1040, 'WHISTLES: 1 (!!!)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0095', key: 'F', accent: GOLD, ending: 'callback',
  title: 'Trying to whistle. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Not one | *actual whistle.*' },
  last: {
    text: 'Sag’s horse? | *Still outside.*',
    draw(x, t, lt) {
      const p = ease.outCubic(prog(lt, 0.4, 1.4))
      drawBits(x, HORSE, HORSE_C, lerp(-200, 540, p), 1150 - Math.abs(Math.sin(lt * 12)) * 12 * (1 - p), 32)
      label(x, 540, 1440, 'METER: RUNNING', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
