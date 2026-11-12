// r2t0264: star_talk, ROLLCALL, "The signs planning | a proposal." (~60 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each planning the most extreme version of a proposal.
//   0.0–3.6    "The signs planning | *a proposal.*"
//   3.6–49.2   ♈ planned Saturday, did it Tuesday · ♉ ring hidden in a five-course dinner · ♊ told the group chat
//              (partner's in it) · ♋ both moms hiding in the bushes · ♌ hired a choir and a spotlight · ♍ checked the
//              compatibility again and again · ♎ couldn't choose, bought four rings · ♏ knew the ring size for two years
//              · ♐ mid-skydive · ♑ a five-year plan, step one: ask · ♒ no ring, a planet with rings · ♓ crying before kneeling
//  49.2        "Twelve proposals. | *One very loud yes.*"
//  52.4        LESSON UNLOCKED: "Big or tiny, | *mean every word.*"  STATUS: ENGAGED
//  58.3        "Pisces said yes. | *Obviously crying.*" over the match card: Pisces + Scorpio.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff8fb1'
const ST = { x: -170 }
const RING = ['...DDD...', '..DWDDD..', '...DDD...', '...GGG...', '..G...G..', '.G.....G.', '.G.....G.', '.G.....G.', '..G...G..', '...GGG...']
const RING_C = { D: SKYB, W: '#ffffff', G: GOLD }
const CAKE = ['....PP....', '...PPPP...', '.CCCCCCCC.', '.CWCWCWCC.', '.CCCCCCCC.', 'CCCCCCCCCC', 'CWCWCWCWCC', 'CCCCCCCCCC', 'KKKKKKKKKK']
const CAKE_C = { C: '#ffd0dc', W: '#ffffff', P: '#ff6b8a', K: '#c9c9d8' }
const BUSH = ['...GGGG...GGG...', '..GGgGGG.GGgGG..', '.GGGGGGGGGGGGGG.', 'GGgGGGGGgGGGGGgG', 'GGGGGGgGGGGGGGGG', 'GGGGGGGGGGGgGGGG', '.GGGGGGGGGGGGGG.']
const BUSH_C = { G: '#3e9a48', g: '#5fd068' }
const CHUTE = ['...RRRWWWRRR...', '.RRRRWWWWWRRRR.', 'RRRRRWWWWWRRRRR', 'K.....K.K.....K', '.K....K.K....K.', '..K...K.K...K..', '...K..K.K..K...', '....K.K.K.K....', '.....KKKKK.....']
const CHUTE_C = { R: '#ff6b5a', W: CREAM, K: BONE }
const PLANET = ['......PPPP......', '....PPPPPPPP....', '...PPpPPPPPPP...', 'RRRRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRRR', '...PPPPPPpPPP...', '....PPPPPPPP....', '......PPPP......']
const PLANET_C = { P: '#c97bff', p: '#e4c4ff', R: GOLD }
const BOX = ['.KKKKKK.', 'KRRRRRRK', 'KRRRRRRK', 'KKKKKKKK', 'KRRRRRRK', 'KRRRRRRK', '.KKKKKK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Planned it for Saturday. | *Did it Tuesday.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-165, -130, 330, 60)
        txt(x, 'THIS WEEK', 0, -98, { size: 30, color: CREAM, font: MONO, weight: 700 })
        txt(x, 'TUE', -80, 10, { size: 52 }); txt(x, 'SAT ♥', 70, 10, { size: 44, color: '#9a8a8a' })
        if (lt > 0.9) { x.fillStyle = RED; x.fillRect(20, 4, 110 * clamp((lt - 0.9) / 0.3), 8) }
        if (lt > 1.2) { x.strokeStyle = GREEN; x.lineWidth = 8; x.beginPath(); x.ellipse(-80, 10, 70, 44, 0, 0, Math.PI * 2 * clamp((lt - 1.2) / 0.3)); x.stroke() }
        txt(x, 'couldn’t wait', 0, 90, { size: 26, font: MONO, weight: 700, color: '#6b62a8' })
      })
    } },
  { sign: 'taurus', cap: 'Hid the ring | *in a five-course dinner.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, RING, RING_C, 790, 760 + 20 * Math.sin(t * 3), 12 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      label(x, 790, 640, 'COURSE 5: DESSERT', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told the group chat. | *Partner’s in it.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'THE GROUP (14)', headCol: GOLD, size: 30, w: 330, h: 420, lines: [
        ['I’M PROPOSING!!', MINT, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['omg!!', PINK, pop01(t, P.t0 + 1.0, 0.25, 2)],
        ['…to who?', LAV, pop01(t, P.t0 + 1.4, 0.25, 2)],
        ['wait. me?', GOLD, pop01(t, P.t0 + 1.8, 0.25, 2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Both moms | *hiding in the bushes.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pk = ease.outBack(prog(lt, 0.7, 1.1))
      signChar(x, t, 'capricorn', 720, 1000 - 90 * pk, 130, { mood: 'heart', seed: 41, glyph: false })
      signChar(x, t, 'libra', 870, 1000 - 90 * pk, 130, { mood: 'wide', seed: 42, glyph: false })
      drawBits(x, BUSH, BUSH_C, 790, 1040, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 720, 'shh! is it now??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Hired a choir. | *And a spotlight.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.6],
    back(x, t, lt, P) { beam(x, 370, 470, 370, 1100, 200, pop01(t, P.t0 + 0.2, 0.4, 1.6)) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.5 + i * 0.2, 0.35, 2); if (k > 0.01) signChar(x, t, ['aries', 'gemini', 'sagittarius'][i], 680 + i * 110, 1010 - (i % 2) * 30, 120 * k, { mood: 'happy', look: [-1, -1], seed: 50 + i, glyph: false }) }
      notes(x, t, 790, 860, { n: 5, cell: 8, col: ORANGE, seed: 3 })
      label(x, 790, 650, 'ALL FOR YOU (AND ME)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Checked your compatibility. | *Again. And again.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 140, pop01(t, P.t0 + 0.2, 0.4, 2), t, 0.6)
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.8) * 11)
      label(x, 790, 1080, `CHECK #${n}: ALIGNED`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a ring. | *Bought four.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [SKYB, PINK, MINT, '#c97bff']
      for (let i = 0; i < 4; i++) drawBits(x, RING, { ...RING_C, D: cols[i] }, 690 + (i % 2) * 200, 760 + Math.floor(i / 2) * 230, 13 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2.2))
      label(x, 790, 1120, 'ONE PER MOOD', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew their ring size | *for two years.*', mood: lt => lt > 1.0 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, R: '#8a1e3a' }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, RING, RING_C, 790, 780, 12 * pop01(t, P.t0 + 0.7, 0.35, 2))
      bubble(x, 790, 640, 'size 6. obviously.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Proposing mid-skydive. | *Hold on tight.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: -20 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, CHUTE, CHUTE_C, 790, 760 + 12 * Math.sin(t * 2), 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 980 + 12 * Math.sin(t * 2), 150 * k, { mood: 'wide', look: [-1, 0], seed: 61, glyph: false })
      bubble(x, 560, 620, 'MARRY MEEE', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Made a five-year plan. | *Step one: ask.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-165, -180, 330, 60)
        txt(x, 'THE PLAN.xls', 0, -148, { size: 28, font: MONO, weight: 700, color: CREAM })
        const rows = ['Y1: ask ♥', 'Y2: house', 'Y3: dog', 'Y4: bigger dog', 'Y5: review']
        rows.forEach((r, i) => { x.fillStyle = i % 2 ? '#efe6d6' : '#fff8ea'; x.fillRect(-150, -100 + i * 52, 300, 48); txt(x, r, -130, -76 + i * 52, { size: 26, align: 'left', color: i === 0 ? RED : INK }) })
      })
    } },
  { sign: 'aquarius', cap: 'No ring. | *A planet with rings.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 790, 860, 20 * pop01(t, P.t0 + 0.3, 0.4, 2), { rot: -0.2 })
      label(x, 790, 1080, 'NAMED IT AFTER YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 7, 200, 0.6, [GOLD, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'Started crying | *before kneeling.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, { K: INK, R: '#8a1e3a' }, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, RING, RING_C, 790, 830, 11 * pop01(t, P.t0 + 0.5, 0.35, 2))
      bubble(x, 790, 680, 'will you… *sob*', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0264', key: 'D', accent: ACC, ending: 'card',
  title: 'The signs planning | *a proposal.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'scorpio', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve proposals. | *One very loud yes.*' },
  lesson: { text: 'Big or tiny, | *mean every word.*', chip: 'STATUS: ENGAGED' },
  last: { text: 'Pisces said yes. | *Obviously crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
