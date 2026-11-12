// r2t0113: star_talk, BELIKE, "“Can I have some?” | Zodiacs be like." (~57 s vertical, signs3kit social cut, lofi · G)
// Twelve signs in zodiac order, each one's most extreme reaction to being asked to share their snack.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ ate it all in one bite · ♉ suddenly couldn't hear you · ♊ shared half, ate your half too
//              · ♋ cooked you a whole second meal · ♌ shared a cookie, updated their profile · ♍ cut it into exact halves
//              · ♎ gave you the bigger half, regretted it · ♏ shared one crumb, will remember forever
//              · ♐ shared with the whole street · ♑ shared it, sent an invoice · ♒ started a community fridge
//              · ♓ gave you all of it, cried happily
//  49.2        "One cookie. | *Twelve policies.*"
//  52.4        LESSON UNLOCKED: "Everyone shares | *their own way.*"  SNACKS: SPLIT
//  58.3        "Next time? | *Order two.*"  Two cookies pop up over the group photo.
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, profile, RED, CREAM, ORANGE, SAGE, WOOD, BROWN, PLATE, COOKIE, COOKIE_C, TISSUE, TISSUE_C, PEN } from './props.js'

const HALF = ['..BBBB', '.BBcBB', 'BBBBBc', 'BcBBBB', 'BBBBcB', '.BBBBB', '..BBBB']
const POT = ['.KKKKKKKKKK.', 'KGGGGGGGGGGK', 'KGWWWWWWWWGK', 'KGGGGGGGGGGK', 'KGGGGGGGGGGK', 'KGGGGGGGGGGK', '.KGGGGGGGGK.']
const cookie = (x, cx, cy, s, k = 1, rot = 0) => drawBits(x, COOKIE, COOKIE_C, cx, cy, s * k, { rot })

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it all. | *In one bite.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P, F) {
      const gone = lt > 0.85
      if (!gone) cookie(x, F.x + 150, F.cy, 14, pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, PLATE, { W: CREAM }, 790, 1040, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (gone) label(x, 790, 760, 'PLATE: EMPTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      if (gone) bubble(x, 800, 940, 'some of what?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Suddenly | *couldn’t hear you.*', mood: 'squint', look: [-1, 0], star: { x: -60 },
    front(x, t, lt, P, F) {
      drawBits(x, PLATE, { W: CREAM }, F.x + 30, F.cy + 120, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 3; i++) cookie(x, F.x - 20 + i * 50, F.cy + 90 - (i % 2) * 20, 8, pop01(t, P.t0 + 0.25 + i * 0.1, 0.25, 2))
      bubble(x, 830, 640, 'can I have | some?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      bubble(x, 300, 640, 'hm? what?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Shared half. | Ate *your half too.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, HALF, COOKIE_C, 720, 860, 18 * k)
      if (lt < 1.2) drawBits(x, HALF, COOKIE_C, 870, 860, 18 * k, { sx: -1 })
      label(x, 880, 1060, lt < 1.2 ? 'YOURS' : 'WAS YOURS', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: lt < 1.2 ? MINT : RED, color: lt < 1.2 ? INK : CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 650, 1060, 'MINE', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cooked you | *a whole second meal.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, G: '#5b5480', W: '#ffd08a' }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(239,230,214,${0.5 * Math.sin(Math.PI * ((t * 0.8 + i / 3) % 1))})`; x.fillRect(730 + i * 50, 760 - ((t * 60 + i * 40) % 120), 14, 40) }
      label(x, 790, 1100, 'SERVES: 12', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Shared a cookie. | *Updated their profile.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2), { id: 'leo', name: '♌︎ LEO' })
      label(x, 790, 1060, 'BIO: SO GENEROUS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.1, 7, 180, 0.6)
    } },
  { sign: 'virgo', cap: 'Cut it into | *exact halves.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      cookie(x, 790, 860, 22, pop01(t, P.t0 + 0.15, 0.3, 2))
      const c = prog(lt, 0.5, 1.2)
      if (c > 0) { x.fillStyle = RED; x.fillRect(786, 860 - 100, 8, 200 * c) }
      card(x, 790, 700, 340, 40, GOLD, { k: pop01(t, P.t0 + 0.3, 0.3, 2), rot: 0 }, x => { for (let i = 0; i < 17; i++) { x.fillStyle = INK; x.fillRect(-160 + i * 20, -20, 3, i % 5 ? 12 : 22) } })
      label(x, 790, 1090, '50.00% / 50.00%', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Gave you the bigger half. | *Then regretted it.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      cookie(x, 840, 860, 18, k)
      drawBits(x, HALF, COOKIE_C, 680, 880, 8 * k)
      if (lt > 1.2) bubble(x, 800, 660, 'wait. can | we swap?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 840, 1060, 'YOURS (BIG)', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Shared one crumb. | *Will remember forever.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 330, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.03 }, x => {
        txt(x, 'THE LEDGER', 0, -130, 28, RED, { font: MONO, weight: 700 })
        txt(x, 'YOU OWE:', -140, -60, 28, INK, { font: MONO, weight: 700, align: 'left' })
        txt(x, '1 CRUMB', -140, -10, 34, INK, { font: MONO, weight: 700, align: 'left' })
        txt(x, 'DUE: ALWAYS', -140, 60, 26, '#b0386b', { font: MONO, weight: 700, align: 'left' })
      })
      drawBits(x, PEN, { R: '#b0386b', W: CREAM }, 960, 1000, 11 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: Math.sin(t * 10) * 0.06 })
    } },
  { sign: 'sagittarius', cap: 'Shared it with | *the whole street.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const ids = ['aries', 'gemini', 'leo', 'libra', 'aquarius', 'virgo']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.4 + i * 0.15, 0.3, 2); if (k > 0.01) { signChar(x, t, id, 640 + (i % 3) * 140, 760 + Math.floor(i / 3) * 190, 120 * k, { mood: 'happy', seed: 50 + i, glyph: false, glow: 0.6 }); cookie(x, 680 + (i % 3) * 140, 800 + Math.floor(i / 3) * 190, 4.5, k) } })
      label(x, 790, 1120, 'COOKIES LEFT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Shared it. | *Sent an invoice.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 850, 320, 380, CREAM, { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: 0.04 }, x => {
        x.fillStyle = '#4c7a5a'; x.fillRect(-160, -190, 320, 64)
        txt(x, 'INVOICE', 0, -158, 32, CREAM, { font: MONO, weight: 700 })
        txt(x, '½ cookie', -130, -70, 28, INK, { font: MONO, weight: 700, align: 'left' })
        txt(x, 'service fee', -130, -16, 26, INK, { font: MONO, weight: 700, align: 'left' })
        x.fillStyle = INK; x.fillRect(-130, 30, 260, 4)
        txt(x, 'TOTAL: 1 hug', -130, 80, 28, '#2f9a4a', { font: MONO, weight: 700, align: 'left' })
      })
      label(x, 790, 1110, 'DUE: FRIDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a | *community fridge.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 240, 400, '#d8f4ff', { k: pop01(t, P.t0 + 0.15, 0.3, 2), rot: -0.03 }, x => {
        x.fillStyle = INK; x.fillRect(-120, -60, 240, 6); x.fillRect(84, -170, 10, 60); x.fillRect(84, -20, 10, 80)
        const n = Math.floor(prog(lt, 0.4, 1.6) * 6)
        for (let i = 0; i < n; i++) drawBits(x, COOKIE, COOKIE_C, -70 + (i % 3) * 60, -130 + Math.floor(i / 3) * 170 + (i > 2 ? 30 : 0), 6)
      })
      label(x, 790, 640, 'FREE ✦ TAKE ONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 30, bg: '#5fd0ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Gave you all of it. | *Cried happily.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), m = ease.inOutCubic(prog(lt, 0.5, 1.2))
      drawBits(x, PLATE, { W: CREAM }, lerp(560, 800, m), 1040, 18 * k)
      for (let i = 0; i < 3; i++) cookie(x, lerp(520, 760, m) + i * 40, 1010 - (i % 2) * 18, 8, k)
      bubble(x, 800, 700, 'take it all!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2t0113', key: 'G', accent: GOLD, ending: 'lesson',
  title: '“Can I have some?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One cookie. | *Twelve policies.*', moods: ['sparkle', 'squint', 'wink', 'heart', 'sparkle', 'squint', 'wide', 'squint', 'sparkle', 'neutral', 'happy', 'heart'] },
  lesson: { text: 'Everyone shares | *their own way.*', chip: 'SNACKS: SPLIT' },
  last: {
    text: 'Next time? | *Order two.*',
    draw(x, t, lt) {
      cookie(x, 470, 740, 14, pop01(t, t - lt + 0.8, 0.35, 2.2), -0.1)
      cookie(x, 610, 740, 14, pop01(t, t - lt + 1.0, 0.35, 2.2), 0.1)
      sparkles(x, t, 540, 740, t - lt + 1.1, 8, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
