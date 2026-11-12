// r2a0495: star_advice, ADVICE ROLLCALL, "What fills | *each sign’s cup.*" (~53 s vertical, signs3kit social cut,
// music: lofi · G). Twelve signs in zodiac order: one warm, specific thing that fills each sign's cup. Running gag: every
// card has a little mug beside the star that fills as the good thing happens (Pisces' fills with happy tears). Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ a new challenge, any challenge · ♉ slow mornings, warm bread · ♊ a long chat with a new friend
//              · ♋ a full table, everyone fed · ♌ a sincere "you look great" · ♍ a clean desk, a finished list
//              · ♎ a pretty playlist, good company · ♏ a 2 a.m. talk that goes deep · ♐ learning something totally random
//              · ♑ being trusted with the big stuff · ♒ a weird idea someone gets · ♓ a sad movie, a good cry
//  49.2        "Twelve cups. | *All full.*"
//  52.6        callback: "Pisces’ cup? | *Still overflowing.*"  The tear mug comes back, spilling hearts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350', WOOD = '#c98f2a'
const ACC = '#ffd27a'
const ST = { x: -190 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)

/** a big mug that fills to `level` (0…1) with `col`; over > 0 makes it spill */
function mug(x, t, cx, cy, k, level, { col = '#c98f2a', body = BONE, over = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-80, -84, 176, 188)
  x.fillStyle = INK; x.fillRect(-96, -100, 176, 196); x.fillRect(70, -60, 56, 110)
  x.fillStyle = body; x.fillRect(80, -50, 36, 90); x.fillStyle = INK; x.fillRect(80, -30, 18, 50)
  x.fillStyle = body; x.fillRect(-88, -92, 160, 180)
  x.fillStyle = '#140c30'; x.fillRect(-76, -80, 136, 156)
  const h = 156 * clamp(level)
  x.fillStyle = col; x.fillRect(-76, 76 - h, 136, h)
  x.fillStyle = 'rgba(255,255,255,0.35)'; if (h > 10) x.fillRect(-76, 76 - h, 136, 8)
  if (over > 0) {
    x.fillStyle = col
    for (const s of [-1, 1]) { const d = over * 120; x.fillRect(s < 0 ? -100 : 60, -96, 40, d); x.fillRect(s < 0 ? -112 : 72, -96 + d - 10, 52, 22) }
  }
  x.restore()
}
const fill = (lt, a = 0.5, b = 1.6) => ease.inOutCubic(prog(lt, a, b))
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
const BREAD = ['..BBBBBB..', '.BbBBbBBB.', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
const BOOK = ['KKKKKKKKKK', 'KPPPPKPPPK', 'KPWWPKPWWK', 'KPPPPKPPPK', 'KPWWPKPWWK', 'KPPPPKPPPK', 'KKKKKKKKKK']
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const BULB = ['.YYYY.', 'YYYYYY', 'YYWYYY', 'YYYYYY', '.YYYY.', '.KKKK.', '.KKKK.']
const MUGY = 1000, MUGX = 830

const CAMEOS = [
  { sign: 'aries', cap: 'A new challenge. | *Any* challenge.', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: RED })
      L(x, MUGX, 700, 'RACE YOU!', R(t, P, 0.5), GOLD, -0.04, 44)
    } },
  { sign: 'taurus', cap: 'Slow mornings. | *Warm bread.*', mood: lt => lt < 1.2 ? 'sleepy' : 'heart', star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: WOOD })
      drawBits(x, BREAD, { B: '#e6b25a', b: '#c98f2a' }, MUGX, 720, 26 * R(t, P, 0.5))
    } },
  { sign: 'gemini', cap: 'A long chat | with *a new friend.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: GOLD })
      bubble(x, 660, 660, 'wait, YOU too?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 860, 790, '4 hours later…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'A full table. | *Everyone fed.*', mood: 'heart', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: PINK })
      L(x, MUGX, 700, 'SECONDS FOR ALL', R(t, P, 0.5), PINK, 0.04, 30)
      hearts(x, t, 400, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'A sincere | *“you look great.”*', mood: lt => lt < 1.0 ? 'happy' : 'heart', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt, 0.8, 1.2), { col: ORANGE })
      bubble(x, MUGX, 700, 'you look | great.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bc' })
      sparkles(x, t, 400, 860, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'A clean desk. | *A finished list.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: '#9be3b0' })
      note(x, MUGX, 720, R(t, P, 0.4), ['✓ ✓ ✓ ✓ ✓'], { w: 260, bg: CREAM, size: 36, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'A pretty playlist. | *Good company.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: LAV })
      for (let i = 0; i < 4; i++) { const ph = ((t * 0.7 + i / 4) % 1); x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = PINK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.fillText('♪', 700 + i * 70 + Math.sin(ph * 7) * 10, 820 - ph * 180); x.restore() }
      L(x, MUGX, 640, 'NOW PLAYING: US', R(t, P, 0.6), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'A 2 a.m. talk | that *goes deep.*', mood: lt => lt < 1.2 ? 'neutral' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: '#6b62a8' })
      drawBits(x, MOON, { Y: GOLD }, 690, 710, 22 * R(t, P, 0.4))
      L(x, 880, 720, '2:14 A.M.', R(t, P, 0.6), LAV, 0.05, 30)
    } },
  { sign: 'sagittarius', cap: 'Learning something | *totally random.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: '#b98cff' })
      drawBits(x, BOOK, { K: INK, P: '#c97bff', W: CREAM }, MUGX, 730, 22 * R(t, P, 0.4))
      L(x, MUGX, 610, 'OCTOPUS FACTS', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Being trusted | with *the big stuff.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: MINT })
      bubble(x, MUGX, 700, 'you’ve got | this one.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'A weird idea | someone *actually gets.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt), { col: SKYB })
      drawBits(x, BULB, { Y: '#ffe27a', W: '#ffffff', K: INK }, 680, 710, 22 * R(t, P, 0.4))
      bubble(x, 880, 760, 'GENIUS.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: GOLD, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'A sad movie. | *A good cry.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      mug(x, t, MUGX, MUGY, R(t, P), fill(lt, 0.3, 1.2), { col: SKYB, over: clamp((lt - 1.3) / 0.6) })
      L(x, MUGX, 700, 'THE END (SOB)', R(t, P, 0.5), LAV, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0495', key: 'G', accent: ACC, ending: 'callback',
  title: 'What fills | *each sign’s cup.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve cups. | *All full.*' },
  last: {
    text: 'Pisces’ cup? | *Still overflowing.*',
    draw(x, t, lt) {
      const t0 = t - lt
      mug(x, t, 540, 1100, pop01(t, t0 + 0.5, 0.35, 2) * 1.3, 1, { col: SKYB, over: clamp((lt - 1.0) / 0.6) })
      const k = pop01(t, t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 260, 1150, 190 * k, { mood: 'heart', look: [1, 0], seed: 47, glyph: false, tears: 3 })
      hearts(x, t, 540, 960, t0 + 1.3, { n: 8, life: 2.0, spread: 300, cell: 8, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
