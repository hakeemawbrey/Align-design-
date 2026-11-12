// r2t0222: star_talk, ROLLCALL, "The signs on | a farm stay." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself on a farm holiday.
//   0.0–3.6    "The signs on | *a farm stay.*"
//   3.6–49.2   ♈ challenged the goat to headbutts, goat won · ♉ churned butter, ate it with a spoon · ♊ named every
//              chicken, forgot every name · ♋ adopted a lamb, it's coming home · ♌ out-crowed the rooster · ♍ sorted the
//              haystacks alphabetically · ♎ styled the scarecrow · ♏ knew which hen took the egg · ♐ took the tractor,
//              saw three towns · ♑ day two, running the farm · ♒ read the cows' birth charts · ♓ met a baby goat,
//              never recovered
//  49.2        group ending: "The farm needs | *a vacation.*"  (the chickens parade past the photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

// ── props
const GOAT = ['H.........H.', 'HH.......HH.', '.WWW......W.', 'WWKWW....WW.', 'WWWWWWWWWWW.', '.WWWWWWWWWW.', '..WWWWWWWWW.', '..W.W...W.W.', '..W.W...W.W.']
const GOAT_C = { H: '#b9b0a0', W: CREAM, K: INK }
const CHICK = ['..RR....', '.WWWW...', 'WWKWWO..', 'WWWWWWWW', '.WWWWWWW', '..WWWWW.', '...O.O..']
const CHICK_C = { R: RED, W: CREAM, K: INK, O: ORANGE }
const BUTTER = ['YYYYYYYYYY', 'YWYYYYYYYY', 'YYYYYYYYYY', 'YYYYYYYYYY', 'BBBBBBBBBB']
const BUTTER_C = { Y: '#ffe066', W: '#fff9d0', B: '#e8a24a' }
const SPOONB = ['.SS.', 'SSSS', '.SS.', '.S..', '.S..', '.S..', '.S..']
const LAMB = ['.WWWWWW.', 'WWWWWWWW', 'WKWWWWWW', 'WWWWWWWW', '.WWWWWW.', '.K.K.K.K']
const LAMB_C = { W: '#fff9f0', K: INK }
const ROOSTER = ['..RR......', '.RRR......', '.OOO......', 'OKOOY.....', 'OOOO.OOGG.', '.OOOOOOOGG', '.OOOOOOOG.', '..OOOOOO..', '...Y..Y...']
const ROOSTER_C = { R: RED, O: ORANGE, K: INK, Y: SUN, G: GREEN }
const HAY = ['...YYYY...', '.YYYYYYYY.', 'YYYYYYYYYY', 'YyYYyYYyYY', 'YYYYYYYYYY', 'YYyYYYyYYY']
const HAY_C = { Y: '#e8c27a', y: '#c98f2a' }
const SCARE = ['...HHH...', '..HHHHH..', 'HHHHHHHHH', '...FFF...', '...FKF...', '...FFF...', 'SSSSSSSSS', '..SSSSS..', '..SSSSS..', '...P.P...', '...P.P...']
const SCARE_C = { H: '#c98f2a', F: '#e8c27a', K: INK, S: '#6fc3ff', P: BROWN }
const EGG = ['.WW.', 'WWWW', 'WWWW', '.WW.']
const TRACTOR = ['....KKKK....', '....KSSK....', 'GGGGGGGGG...', 'GGGGGGGGGGG.', 'GGGGGGGGGGGG', '.BBB....BBB.', 'BBWBB..BBWBB', '.BBB....BBB.']
const TRACTOR_C = { K: INK, S: SKYB, G: '#e23d4e', B: '#2a2350', W: GREY }
const COW = ['H........H..', 'WWW......WW.', 'WKWW..BBBWW.', 'WWWWWWBBWWWW', '.PWWWWWWWBBW', '..WBBWWWWWW.', '..W.W...W.W.']
const COW_C = { H: '#b9b0a0', W: CREAM, K: INK, B: '#2a2350', P: PINK }

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the goat. | *Goat won.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: L, hops: [0.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ch = ease.inOutCubic(prog(lt, 0.4, 0.9)), back = ease.outCubic(prog(lt, 0.9, 1.3))
      drawBits(x, GOAT, GOAT_C, lerp(860, 720, ch) + back * 60, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      if (lt > 0.88 && lt < 1.3) sparkles(x, t, 620, 900, P.t0 + 0.9 * 1.29, 6, 110, 0.3)
      label(x, 790, 690, 'GOAT: 1 · ARIES: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Churned butter. | Ate it *with a spoon.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), bite = Math.floor(clamp((lt - 0.8) / 1.0) * 4)
      drawBits(x, BUTTER.map(r => r.slice(0, 10 - bite * 2) || '.'), BUTTER_C, 790 - bite * 22, 950, 22 * k)
      drawBits(x, SPOONB, { S: '#d8dbe8' }, 920, 850 + Math.sin(t * 9) * 16 * (lt > 0.8 ? 1 : 0), 16 * k, { rot: -0.5 })
      label(x, 790, 700, 'FARM-FRESH BUTTER', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'no bread needed', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Named every chicken. | *Forgot every name.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const names = lt > 1.3 ? ['???', '??', 'Bob?'] : ['Ziggy', 'Pam', 'Lord Cluck']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), cx = 680 + i * 120, cy = 1010 - (i % 2) * 120
        drawBits(x, CHICK, CHICK_C, cx, cy + Math.abs(Math.sin(t * 6 + i)) * -10, 14 * k)
        label(x, cx, cy - 100, names[i], pop01(t, P.t0 + 0.5 + i * 0.12, 0.3, 2), { size: 26, bg: lt > 1.3 ? PINK : GOLD, rot: (i - 1) * 0.06, font: MONO, weight: 700 })
      }
    } },
  { sign: 'cancer', cap: 'Adopted a lamb. | It’s *coming home.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      drawBits(x, LAMB, LAMB_C, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 720, '✦ WE MATCHED', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'LUGGAGE: +1 LAMB', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 0.9, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Out-crowed | *the rooster.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', star: L, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      drawBits(x, ROOSTER, ROOSTER_C, 850, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 860, 820, 'cock-a—', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (1 - prog(lt, 0.9, 1.0)), { size: 34, tail: 'br' })
      bubble(x, 640, 660, 'ME-E-E-E!', pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2.4), { size: 56, col: ORANGE, tail: 'bl' })
      label(x, 850, 1130, 'ROOSTER: RETIRED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted the haystacks. | *Alphabetically.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      ;['A', 'B', 'C'].forEach((l, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), cx = 670 + i * 125
        drawBits(x, HAY, HAY_C, cx, 1010, 12 * k)
        label(x, cx, 900, l, pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2.4), { size: 40, bg: MINT, rot: (i - 1) * 0.05, font: MONO, weight: 700 })
      })
      bubble(x, 790, 680, 'D is next week', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Styled the scarecrow. | *Full look.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SCARE, SCARE_C, 800, 920, 22 * k)
      if (lt > 0.9) { drawBits(x, ['P...P', 'PP.PP', 'PPPPP', 'PP.PP', 'P...P'], { P: PINK }, 800, 1060 - 2 * 22 + 8, 9 * pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2.4)) }
      label(x, 800, 690, 'STYLED BY: LIBRA', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 900, P.t0 + 1.3, 6, 170, 0.5)
    } },
  { sign: 'scorpio', cap: 'Knew which hen | *took the egg.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CHICK, CHICK_C, 690 + i * 110, 1020, 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { sx: -1 })
      const g = pop01(t, P.t0 + 1.1, 0.3, 2.4)
      if (g > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.arc(800, 1010, 76 * g, 0, Math.PI * 2); x.stroke(); x.restore() }
      drawBits(x, EGG, { W: CREAM }, 790, 800, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 680, 'CASE CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Took the tractor. | Saw *three towns.*', mood: 'sparkle', star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const p = prog(lt, 0.3, 2.2)
      drawBits(x, TRACTOR, TRACTOR_C, lerp(160, 560, p), 1010 + Math.sin(t * 20) * 2, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      const n = Math.min(3, Math.floor(lt / 0.6))
      label(x, 320, 700, `TOWNS: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 860, 'back by dinner!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Day two. | *Running the farm.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 310, 880, 270, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'FARM PLAN', 0, -125, { size: 30, font: MONO, weight: 700 })
        ;['milk: 5:00', 'eggs: 5:15', 'profit: up'].forEach((s, i) => { txt(x, (lt > 0.6 + i * 0.3 ? '✓ ' : '  ') + s, -110, -60 + i * 58, { size: 26, font: MONO, weight: 700, align: 'left' }) })
      })
      label(x, 310, 1100, 'NEW TITLE: FARM CEO', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Read the cows’ | *birth charts.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, COW, COW_C, 830, 1040, 17 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      chart(x, 790, 790, 110, pop01(t, P.t0 + 0.5, 0.35, 2), t)
      bubble(x, 830, 1150, 'moo-n in Taurus', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Met a baby goat. | *Never recovered.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GOAT, GOAT_C, 820, 1010, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 840, 860, 'meh', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'br' })
      label(x, 790, 680, 'EMOTIONAL DAMAGE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 820, 960, P.t0 + 1.0, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0222', key: 'E', accent: '#7dffb0', ending: 'group',
  title: 'The signs on | *a farm stay.*',
  cameos: CAMEOS,
  group: {
    cap: 'The farm needs | *a vacation.*',
    draw(x, t, lt) {
      for (let i = 0; i < 4; i++) {
        const p = prog(lt, 1.2 + i * 0.25, 4.6 + i * 0.25)
        if (p > 0 && p < 1) drawBits(x, CHICK, CHICK_C, lerp(1060, 20, p), 1435 - Math.abs(Math.sin(t * 7 + i)) * 12, 12, { sx: -1 })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
