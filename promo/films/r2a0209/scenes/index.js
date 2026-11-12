// r2a0209: star_advice, ADVICE ROLLCALL, "Each sign | as a parent." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm line each; every parent star has a little kid star of their own sign beside them.
//   0.0–3.6    "Each sign | *as a parent.*"
//   3.6–49.2   ♈ first to cheer at every recital · ♉ always a snack in their bag · ♊ a bedtime story about every star
//              · ♋ keeps every drawing you made · ♌ makes you feel like a star · ♍ a plaster for every scrape · ♎ every
//              cake split perfectly fair · ♏ knows something's wrong before you say it · ♐ turns a car ride into an
//              adventure · ♑ early to every game · ♒ lets you be exactly you · ♓ cries at every school play, proudly
//  49.2        GROUP ENDING: "Twelve ways | to say *“I love you.”*"  hearts float up over the family photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = PINK
const ST = { x: -200 }

/** the little kid star beside the parent */
const kid = (x, t, P, sign, { mood = 'happy', dx = 0, dy = 0, s = 140, look } = {}) => {
  const k = pop01(t, P.t0 + 0.3, 0.35, 2)
  if (k > 0.01) return signChar(x, t, sign, 560 + dx, 1030 + dy, s * k, { mood, look, seed: 60 + P.i, glyph: false, hops: [P.t0 + 0.8], tears: sign === 'pisces' ? 1 : 0 })
}
const BAG = ['..KKKKKK..', '.K......K.', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBGGGBBBB', 'BBBGGGBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BAG_C = { K: '#8a4a2e', B: '#c98f6a', G: GOLD }
const APPLE = ['....S...', '...SL...', '.RRRRRR.', 'RRWRRRRR', 'RRRRRRRR', '.RRRRRR.', '..RRRR..']
const APPLE_C = { S: '#8a4a2e', L: GREEN, R: '#e23d4e', W: '#fff' }
const BOOK = ['RRRRRRRWRRRRRRR', 'RWWWWWWKWWWWWWR', 'RWKKKKWKWKKKKWR', 'RWWWWWWKWWWWWWR', 'RWKKKKWKWKKKWWR', 'RWWWWWWKWWWWWWR', 'RRRRRRRKRRRRRRR']
const BOOK_C = { R: '#ffd23a', W: '#fff4e2', K: '#6b62a8' }
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYRY', 'YYYYYYY']
const CROWN_C = { Y: GOLD, R: '#e23d4e' }
const KIT = ['...KKK...', '..K...K..', 'WWWWWWWWW', 'WWWWRWWWW', 'WWWRRRWWW', 'WWWWRWWWW', 'WWWWWWWWW']
const KIT_C = { K: INK, W: '#fff4e2', R: '#e23d4e' }
const PLASTER = ['.TTTTTTTTTT.', 'TTTTPPPPTTTT', 'TTTTPPPPTTTT', '.TTTTTTTTTT.']
const CAR = ['...RRRRRR....', '..RWWRWWWR...', '.RRRRRRRRRRR.', 'RRRRRRRRRRRRY', 'RRRRRRRRRRRRR', '.KK......KK..', '.KK......KK..']
const CAR_C = { R: '#a35cf0', W: SKYB, Y: SUN, K: INK }
const CONE = ['.PPPP.', 'PPWPPP', 'PPPPPP', '.CCCC.', '.CCCC.', '..CC..', '..CC..']
const CONE_C = { P: PINK, W: '#fff', C: '#e8a24a' }
const CAPE = ['RRRRRRRR', 'RRRRRRRRR', '.RRRRRRRRR', '..RRRRRRRR', '...RRRRRRR']

const CAMEOS = [
  { sign: 'aries', cap: 'First to cheer | at *every recital.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.0, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      kid(x, t, P, 'aries', { dx: 260, dy: -10, s: 150, mood: 'wide' })
      bubble(x, 560, 640, 'THAT’S MY KID!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 820, 1150, 'VOLUME: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#ff6b5a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Always a snack | *in their bag.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      kid(x, t, P, 'taurus', { dx: 300, dy: -20, s: 140, mood: lt > 1.3 ? 'heart' : 'neutral' })
      drawBits(x, BAG, BAG_C, 620, 1020, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const d = ease.outBack(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, APPLE, APPLE_C, lerp(620, 860, d), lerp(980, 820, d) - Math.sin(Math.PI * d) * 100, 12)
      label(x, 800, 680, 'SNACKS: ALWAYS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: '#5fd068', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A bedtime story | *about every star.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      kid(x, t, P, 'gemini', { dx: 300, dy: 0, s: 130, mood: lt > 1.3 ? 'sleepy' : 'happy' })
      drawBits(x, BOOK, BOOK_C, 580, 1060, 12 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 720, 660, 'and THAT star…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      for (let i = 0; i < 4; i++) sparkles(x, t, 700 + i * 70, 820 - (i % 2) * 40, P.t0 + 0.8 + i * 0.2, 4, 40, i)
    } },
  { sign: 'cancer', cap: 'Kept every drawing | *you ever made.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 420, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e6eef8', rot: 0 }, () => {
        const COLS = [PINK, SKYB, SUN, MINT, LAV, ORANGE]
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 6)
        for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-130 + (i % 2) * 130 - 4, -190 + Math.floor(i / 2) * 130 - 4, 118, 108); x.fillStyle = COLS[i]; x.fillRect(-130 + (i % 2) * 130, -190 + Math.floor(i / 2) * 130, 110, 100); x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(-75 + (i % 2) * 130, -140 + Math.floor(i / 2) * 130, 26, 0, Math.PI * 2); x.fill() }
      })
      label(x, 790, 1120, 'DRAWINGS: 1,204', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Makes you feel | *like a star.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const F = kid(x, t, P, 'leo', { dx: 240, dy: -40, s: 180, mood: lt > 1.2 ? 'sparkle' : 'happy' })
      const d = ease.outCubic(prog(lt, 0.6, 1.1))
      if (F && lt > 0.55) drawBits(x, CROWN, CROWN_C, 800, lerp(560, F.top - 26, d), 12)
      label(x, 800, 1180, 'BORN STAR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.3, 7, 150, 0.6)
    } },
  { sign: 'virgo', cap: 'A plaster | *for every scrape.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const F = kid(x, t, P, 'virgo', { dx: 280, dy: -20, s: 160, mood: lt > 1.2 ? 'happy' : 'wide' })
      drawBits(x, KIT, KIT_C, 600, 1060, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (F && lt > 1.0) drawBits(x, PLASTER, { T: '#f2cf8a', P: '#e8b878' }, F.x + 30, F.cy + 30, 7, { rot: 0.4 })
      label(x, 800, 680, 'KIT: ALWAYS PACKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Every cake slice | *perfectly fair.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), sp = ease.inOutCubic(prog(lt, 0.8, 1.2)) * 30
      x.save(); x.translate(790, 900); x.scale(k, k)
      for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s < 0 ? -150 - sp : sp, -70, 150, 130); x.fillStyle = '#fff4e2'; x.fillRect((s < 0 ? -144 - sp : sp + 6), -64, 138, 118); x.fillStyle = PINK; x.fillRect((s < 0 ? -144 - sp : sp + 6), -64, 138, 34) }
      x.restore()
      label(x, 790, 700, 'LEFT: 50% · RIGHT: 50%', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      ;['libra', 'libra'].forEach((id, i) => { const kk = pop01(t, P.t0 + 1.3 + i * 0.1, 0.3, 2); if (kk > 0.01) signChar(x, t, id, 680 + i * 220, 1100, 100 * kk, { mood: 'heart', seed: 80 + i, glyph: false }) })
    } },
  { sign: 'scorpio', cap: 'Knows something’s wrong | *before you say it.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      kid(x, t, P, 'scorpio', { dx: 280, dy: -10, s: 150, mood: lt > 1.3 ? 'happy' : 'neutral', look: [0, 1] })
      bubble(x, 840, 700, 'i’m fine.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      bubble(x, 420, 620, 'hot cocoa. talk.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      if (lt > 1.4) hearts(x, t, 700, 950, P.t0 + 1.4 * 1.29, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'Turns a car ride | *into an adventure.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, CAR, CAR_C, 800 + Math.sin(lt * 6) * 6, 980, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'DETOUR: ICE CREAM', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, CONE, CONE_C, 880, 830, 12 * pop01(t, P.t0 + 1.4, 0.3, 2.2))
    } },
  { sign: 'capricorn', cap: 'Early to | *every single game.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 820, 720, 90, pop01(t, P.t0 + 0.2, 0.35, 2), 8, 15)
      label(x, 800, 910, 'GAME AT 9:00', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1070, 'SEAT: FRONT ROW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Lets you be | *exactly who you are.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const kc = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (kc > 0.01) drawBits(x, CAPE, { R: '#e23d4e' }, 730, 990, 18 * kc, { rot: 0.1 * Math.sin(t * 4) })
      kid(x, t, P, 'aquarius', { dx: 240, dy: -60, s: 170, mood: 'sparkle' })
      label(x, 800, 1180, 'CAPE: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'i’m a dragon now', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cries at every | *school play.* Proudly.', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      kid(x, t, P, 'pisces', { dx: 280, dy: -20, s: 150, mood: 'sparkle' })
      label(x, 820, 680, 'ROLE: TREE #3', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
      label(x, 820, 1150, 'BEST TREE EVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0209', key: 'E', accent: ACC, ending: 'group',
  title: 'Each sign | *as a parent.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve ways | to say *“I love you.”*',
    moods: Array(12).fill('heart'),
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 3.0, spread: 800, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
