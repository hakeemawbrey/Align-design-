// r2a0530: star_advice, ADVICE ROLLCALL, "How each sign | handles *hard talks.*" (how each sign handles a hard
// conversation; ~57 s vertical, signs3kit social cut, music: lofi · G). Twelve signs in zodiac order, one warm, specific
// line each with a light visual gag. Ending: callback (Cancer's snacks come back).
//   3.6–49.2   ♈ says it straight, then softens it · ♉ needs a day, then means it · ♊ talks it out, listens too
//              · ♋ brings snacks to the serious talk · ♌ says "I'm hurt" · ♍ wrote notes (kind ones)
//              · ♎ asks how you feel, then shares · ♏ goes deep, stays gentle · ♐ one joke, then real
//              · ♑ booked a time, came early · ♒ talks it out on a walk · ♓ cries a little, still says it
//  49.2        "Hard talks. | *Softer hearts.*"
//  52.6        callback: "Best part? | *Cancer’s snacks.*" (the cookie plate comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#5fd068', ORANGE = '#ffb34a'

const COOKIES = ['...CCC..CCC...', '..CDCCCCCDCC..', '..CCCDCCDCCC..', '.WWWWWWWWWWWW.', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.']
const COOK_C = { C: '#e0a050', D: BROWN, W: CREAM }
const NOTEPAD = ['KKKKKKKKKK', 'WWWWWWWWWW', 'WLLLLLLWWW', 'WWWWWWWWWW', 'WLLLLLWWWW', 'WWWWWWWWWW', 'WLLLLLLLWW', 'WWWWWWWWWW', 'WPPWWWWWWW', 'WWWWWWWWWW']
const SHOE = ['....GGG....', '...GGGGG...', '..GGGGGGGG.', 'GGGGGGGGGGG', 'WWWWWWWWWWW']
const HEARTBIG = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function cal(x, cx, cy, k, line1, line2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 312, 272)
  x.fillStyle = INK; x.fillRect(-162, -142, 324, 284); x.fillStyle = CREAM; x.fillRect(-154, -134, 308, 268)
  x.fillStyle = GREEN; x.fillRect(-154, -134, 308, 64); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CALENDAR', 0, -102)
  x.font = `800 40px ${INTER}`; x.fillText(line1, 0, -6); x.font = `700 28px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText(line2, 0, 60)
  x.restore()
}

const L = (x, t, P, a, s, y = 1100, bg = GOLD, size = 32) => label(x, 790, y, s, pop01(t, P.t0 + a, 0.3, 2.4), { size, bg, rot: -0.04, font: MONO, weight: 700 })
const CAMEOS = [
  { sign: 'aries', cap: 'Says it straight. | *Then softens it.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I’m upset.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, col: '#ff6b5a', tail: 'bl' })
      bubble(x, 790, 920, '…and I | love you.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Needs a day. | *Then means every word.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', star: { x: -160 },
    front(x, t, lt, P) {
      const p = clamp((lt - 0.2) / 1.2)
      label(x, 790, 760, `THINKING… ${Math.round(p * 24)}H`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.4) bubble(x, 790, 960, 'ok. I’m ready.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Talks it all out. | *Then listens, too.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 790, 760, 'so SO and | also and…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      else { label(x, 790, 760, 'MODE: LISTENING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 }); bubble(x, 790, 940, 'go on…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' }) }
    } },
  { sign: 'cancer', cap: 'Brings snacks | *to the serious talk.*', mood: 'heart', look: [1, 0], star: { x: -160 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COOKIES, COOK_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'AGENDA: FEELINGS', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      L(x, t, P, 1.5, 'COOKIES: MANDATORY', 1080, PINK, 30)
    } },
  { sign: 'leo', cap: 'Says “I’m hurt.” | *Brave, not dramatic.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'that hurt | my feelings.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: ORANGE, tail: 'bl' })
      drawBits(x, HEARTBIG, { H: '#ff4f86', W: '#fff' }, 790, 960, 14 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, t, P, 1.5, 'COURAGE: +10', 1110, GOLD)
    } },
  { sign: 'virgo', cap: 'Wrote notes first. | *Kind ones.*', mood: 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, NOTEPAD, { K: '#6b62a8', W: CREAM, L: SLATE, P: PINK }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, t, P, 1.2, 'POINT 1: I LIKE YOU', 1100, MINT, 30)
    } },
  { sign: 'libra', cap: 'Asks how you feel. | *Then shares their side.*', mood: 'happy', look: [1, 0], star: { x: -160 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'how do YOU | feel?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bubble(x, 790, 950, 'ok. me too.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Goes deep. | *Stays gentle.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DEPTH: OCEAN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'TONE: SOFT', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'One joke first. | *Then gets real.*', mood: lt => lt > 1.2 ? 'neutral' : 'wink', look: [1, 0], star: { x: -160 }, hops: [0.5],
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 790, 760, 'so… knock | knock?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: ORANGE, tail: 'bl' })
      else bubble(x, 790, 760, 'ok. seriously:', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      L(x, t, P, 1.5, 'ICE: BROKEN', 1060, MINT)
    } },
  { sign: 'capricorn', cap: 'Booked a time. | *Showed up early.*', mood: 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      cal(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'BIG TALK', '7:00 PM')
      L(x, t, P, 1.3, 'ARRIVED: 6:45', 1100, GOLD)
    } },
  { sign: 'aquarius', cap: 'Talks it out | *on a long walk.*', mood: 'happy', look: [1, 0], star: { x: -160 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { G: SKYB, W: CREAM }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 5) * 0.05 })
      const n = (lt * 1.6).toFixed(1)
      label(x, 790, 680, `DISTANCE: ${n} KM`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      L(x, t, P, 1.5, 'EASIER SIDE BY SIDE', 1080, BONE, 28)
    } },
  { sign: 'pisces', cap: 'Cries a little. | *Still says it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 0.8 ? 2 : 1, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'VOICE: WOBBLY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      L(x, t, P, 1.6, 'WORDS: CLEAR', 1110, MINT)
      bubble(x, 790, 960, 'I need | to say this.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0530', key: 'G', accent: MINT, ending: 'callback',
  title: 'How each sign | handles *hard talks.*',
  cameos: CAMEOS,
  group: { cap: 'Hard talks. | *Softer hearts.*' },
  last: {
    text: 'Best part? | *Cancer’s snacks.*',
    draw(x, t, lt) {
      drawBits(x, COOKIES, COOK_C, 540, 1000, 30 * pop01(t, t - lt + 0.7, 0.35, 2))
      sparkles(x, t, 540, 980, t - lt + 0.9, 8, 240, 0.3)
      hearts(x, t, 540, 900, t - lt + 1.1, { n: 8, life: 2, spread: 400, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
