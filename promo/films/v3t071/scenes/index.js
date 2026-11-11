// v3t071: THE SIGNS AS… v3, "Zodiacs vs. spoilers | be like." (~62 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    "Zodiacs vs. spoilers | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign takes a spoiler (3.8 s each), pushed to the extreme:
//              ♈ spoiled season five back · ♉ didn't flinch, finished the popcorn · ♊ already told ten friends
//              · ♋ wore black for the character · ♌ gasped so loud the neighbours clapped · ♍ rewatched it to fact-check
//              · ♎ still deciding if they're mad · ♏ smiled, added them to the list · ♐ never watched it, had opinions
//              · ♑ updated their sign profile: NO SPOILERS · ♒ went off-grid, permanently · ♓ knew the ending, still sobbed
//  49.2        "Nobody | *took it well.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Spoilers happen. | Enjoy *the ride anyway.*"  SHOW: STILL GOOD
//  58.3        "Virgo found | a *second error.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
const POPCORN = [
  '.WW.WW.WW.',
  'WWWWWWWWWW',
  'WYWWWYWWYW',
  'RRWWRRWWRR',
  'RRWWRRWWRR',
  '.RWWRRWWR.',
  '.RWWRRWWR.',
  '..WWRRWW..',
]
const POP_C = { W: '#fff4e2', Y: GOLD, R: RED }
const SCALE = [
  '.....KK.....',
  'KKKKKKKKKKKK',
  'K....KK....K',
  'K....KK....K',
  'K....KK....K',
  '.....KK.....',
  '.....KK.....',
  '...KKKKKK...',
]
const SCALE_C = { K: GOLD }
const CABIN = [
  '.....RR.....',
  '....RRRR....',
  '...RRRRRR...',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  'RRRRRRRRRRRR',
  '.BBBBBBBBBB.',
  '.BYYBBBBDDB.',
  '.BYYBBBBDDB.',
  '.BBBBBBBDDB.',
]
const CABIN_C = { R: '#a8442e', B: '#8a5a3a', Y: '#ffe7a8', D: '#4a2a1e' }
const TISSUE = [
  '....WW....',
  '...WWWW...',
  '....WW....',
  'BBBBBBBBBB',
  'BPPPPPPPPB',
  'BPPPPPPPPB',
  'BBBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: LAV, P: '#e8dcff' }
const ROSE = [
  '.KKK.',
  'KKKKK',
  '.KKK.',
  '..G..',
  '.GG..',
  '..G..',
  '..G..',
]
const ROSE_C = { K: '#2a2350', G: '#5fd068' }

// a little paper card with a header and a few lines (a list / a fact-check sheet)
function sheet(x, cx, cy, k, { w = 250, h = 300, head = 'THE LIST', headBg = RED, lines = 4, rot = 0.05, fill = 1, mark = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60)
  x.fillStyle = '#fff4e2'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32)
  for (let i = 0; i < lines; i++) {
    const ww = (w - 60) * (i === lines - 1 ? clamp(fill) : 1) * (0.7 + 0.3 * ((i * 37) % 10) / 10)
    x.fillStyle = '#9aa5c4'; x.fillRect(-w / 2 + 30, -h / 2 + 90 + i * 46, ww, 12)
  }
  if (mark) { x.fillStyle = RED; x.font = `800 26px ${INTER}`; x.fillText(mark, 0, h / 2 - 36) }
  x.restore()
}
// a sign profile card (the Align nod): a star, the sign name and one line of bio
function profile(x, t, cx, cy, k, { id, line, bg = '#2a2350', w = 280, h = 360 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 130)
  signChar(x, t, id, 0, -h / 2 + 14 + (h - 130) / 2 + 6, 150, { mood: 'neutral', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(id.toUpperCase(), 0, h / 2 - 90)
  x.fillStyle = RED; x.fillRect(-w / 2 + 20, h / 2 - 66, w - 40, 46)
  x.fillStyle = '#fff4e2'; x.font = `800 26px ${INTER}`; x.fillText(line, 0, h / 2 - 42)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Spoiled it back. | Plus *season five.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', star: { x: -160 }, hops: [0.8, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 640, 'oh yeah?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      bubble(x, 780, 860, 'season 5: | they get MARRIED', pop01(t, P.t0 + 0.95, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1070, 'SPOILED: EVERYTHING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  { sign: 'taurus', cap: "Didn't flinch. | Finished *the popcorn.*", mood: lt => lt > 1.7 ? 'sleepy' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, POPCORN, POP_C, 790, 900, 22 * k, { rot: 0.05 })
      // kernels hopping out of the bucket and into Taurus
      for (let i = 0; i < 4; i++) {
        const ph = prog(lt, 0.5 + i * 0.3, 0.9 + i * 0.3)
        if (ph > 0 && ph < 1) drawBits(x, ['.W.', 'WWW', '.W.'], { W: '#fff4e2' }, lerp(790, 430, ph), 800 - Math.sin(Math.PI * ph) * 200, 9)
      }
      bubble(x, 780, 640, 'anyway…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1110, 'BUCKET: EMPTY', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Already knew. | Told *ten friends.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(10, Math.floor(Math.max(0, lt - 0.3) / 0.15))
      bubble(x, 780, 650, 'omg guess what', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      for (let i = 0; i < Math.min(n, 5); i++) label(x, 700 + (i % 2) * 150, 790 + i * 50, 'sent ✓', 0.9, { size: 24, bg: MINT, rot: (i % 2 ? 0.06 : -0.06) })
      label(x, 790, 1100, `TOLD: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Mourning the character. | *Wore black.*', mood: 'neutral', look: [0, 1], star: { x: -160 },
    front(x, t, lt, P, F) {
      // a little black veil on the star's head
      const k = pop01(t, P.t0 + 0.35, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.85 * k; x.fillStyle = '#1b1236'; x.beginPath(); x.ellipse(F.x, F.top + 40, 120 * k, 40 * k, 0, Math.PI, 0); x.fill(); x.fillStyle = 'rgba(27,18,54,0.45)'; x.fillRect(F.x - 110, F.top + 40, 220, 80 * k); x.restore() }
      drawBits(x, ROSE, ROSE_C, 790, 880, 22 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: 0.2 })
      label(x, 790, 680, 'R.I.P. DEREK', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 36, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1080, 'HE WAS FICTIONAL', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.05 })
    } },
  { sign: 'leo', cap: 'Gasped so loud, | *neighbours clapped.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.4, 1.4],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'GASP!!!', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 64, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.1, 0.3, 2)
      label(x, 790, 880, '✦ BRAVO ✦', k, { size: 40, bg: GOLD, rot: 0.05 })
      label(x, 790, 1060, 'NEXT DOOR: STANDING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: ORANGE, rot: -0.05 })
      sparkles(x, t, 380, 820, P.t0 + 1.3, 7, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Rewatched it all. | To *fact-check it.*', mood: lt => lt > 1.6 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.25, 0.3, 2), { head: 'FACT-CHECK', headBg: '#2fc79a', lines: 4, fill: prog(lt, 0.4, 1.4), mark: lt > 1.5 ? 'ERRORS: 1' : null })
      label(x, 790, 1080, 'EPISODES: ALL 62', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still deciding | if they\'re *mad.*', mood: lt => lt > 1.9 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const tilt = 0.22 * Math.sin(lt * 4)
      drawBits(x, SCALE, SCALE_C, 790, 860, 24 * k, { rot: tilt })
      label(x, 790 - 130, 760 - tilt * 260, 'MAD', k, { size: 30, bg: RED, color: '#fff4e2', rot: -0.05 })
      label(x, 790 + 130, 760 + tilt * 260, 'FINE', k, { size: 30, bg: MINT, rot: 0.05 })
      label(x, 790, 1100, 'DAY 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Smiled sweetly. | Added them *to the list.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2), { head: 'THE LIST', headBg: '#c97bff', lines: 4, fill: prog(lt, 1.0, 1.6) })
      bubble(x, 790, 640, "it's fine", pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Never watched it. | Still *had opinions.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      bubble(x, 320, 640, 'overrated!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'br' })
      bubble(x, 300, 860, 'the ending? | predictable.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 310, 1080, 'EPISODES SEEN: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Updated their profile. | *No spoilers.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      profile(x, t, 310, 850, pop01(t, P.t0 + 0.3, 0.35, 2), { id: 'capricorn', line: 'NO SPOILERS.' })
      label(x, 310, 610, 'BIO: UPDATED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Went off-grid. | *Permanently.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CABIN, CABIN_C, 790, 900, 22 * k)
      // pine trees either side
      for (const [px, s] of [[640, 12], [940, 10]]) drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.GGG.', 'GGGGG', '..B..'], { G: '#2fa85a', B: '#8a5a3a' }, px, 930, s * k)
    },
    front(x, t, lt, P) {
      label(x, 790, 650, 'WI-FI: NONE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'safe here.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Knew the ending. | *Still sobbed.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 790, 680, 'TISSUES: 3 BOXES', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 30, bg: SKYB, rot: -0.05 })
      bubble(x, 790, 1100, 'so beautiful', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'v3t071', key: 'C', accent: RED, ending: 'lesson',
  title: 'Zodiacs vs. spoilers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody | *took it well.*' },
  lesson: { text: 'Spoilers happen. | Enjoy *the ride anyway.*', chip: 'SHOW: STILL GOOD' },
  last: {
    text: 'Virgo found | a *second error.*',
    draw(x, t, lt) { sheet(x, 540, 1150, pop01(t, t - lt + 0.6, 0.35, 2), { head: 'FACT-CHECK', headBg: '#2fc79a', lines: 4, mark: 'ERRORS: 2', rot: -0.04 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
