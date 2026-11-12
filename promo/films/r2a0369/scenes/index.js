// r2a0369: star_advice, ADVICE ROLLCALL, "Loneliness, | *sign by sign.*" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "Loneliness, | *sign by sign.*"
//   3.6–49.2   ♈ fills the quiet with plans, try one slow night · ♉ cooks for one, invite someone to share
//              · ♊ texts twenty people, call the one who matters · ♋ rewatches old memories, make a new one
//              · ♌ hides it behind a smile, you can say it · ♍ cleans the whole house, the heart needs care too
//              · ♎ start with your own company · ♏ "i like being alone", let one person in
//              · ♐ books a trip to outrun it, bring a friend · ♑ works through it, feelings aren't overtime
//              · ♒ lonely in a crowd, find your weird people · ♓ cries to sad songs, then calls a friend
//  49.2        "Lonely isn’t broken. | *Reach out.*"
//  52.6        CALLBACK: "Taurus made | *soup for two.*"  the pot comes back, two bowls, Taurus + Cancer.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const POT = ['KKKKKKKKK', 'KRRRRRRRK', 'KRRRRRRRK', 'KRRRRRRRK', '.KRRRRRK.', '..KKKKK..']
const POT_C = { S: '#e8e4f8', K: INK, R: RED }
const BOWL = ['KKKKKKKK', 'KOOOOOOK', '.KWWWWK.', '..KKKK..']
const BOWL_C = { K: INK, O: '#ffb34a', W: CREAM }
const MOP = ['....KK....', '....KK....', '....KK....', '....KK....', '....KK....', '..WWWWWW..', '.WWWWWWWW.', 'W.W.W.W.W.']
const SUITCASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KPPPPPPPPK', 'KPYPPPPYPK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const LAPTOP = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSWWSSWWWSSK', 'KSSSSSSSSSSK', 'KSWWWSSWWSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', 'GGGGGGGGGGGGGG']
const HEADPHONES = ['..KKKKKK..', '.K......K.', 'K........K', 'K........K', 'PP......PP', 'PP......PP', 'PP......PP']
/** a phone with a stack of little chat bubbles */
function phone(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -190, 240, 380); x.fillStyle = '#2a2350'; x.fillRect(-110, -180, 220, 360); x.fillStyle = '#140c30'; x.fillRect(-98, -160, 196, 320)
  const C = [MINT, PINK, GOLD, LAV, SKYB]
  for (let i = 0; i < n; i++) { const y = 130 - i * 34; if (y < -150) break; x.fillStyle = C[i % 5]; x.fillRect(i % 2 ? -10 : -86, y - 12, 96, 24) }
  x.restore()
}
/** an open photo album */
function album(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -130, 400, 260); x.fillStyle = '#8a4a2e'; x.fillRect(-192, -122, 384, 244)
  x.fillStyle = CREAM; x.fillRect(-180, -110, 172, 220); x.fillRect(8, -110, 172, 220)
  const C = [SKYB, PINK, GOLD, MINT]
  for (let i = 0; i < 4; i++) { const px = (i % 2 ? 30 : -160) + (i > 1 ? 0 : 0), py = i < 2 ? -90 : 10; x.fillStyle = INK; x.fillRect(px - 4 + (i > 1 ? 0 : 0), py - 4, 138, 88); x.fillStyle = C[i]; x.fillRect(px, py, 130, 80) }
  x.restore()
}
/** a hand mirror */
function mirror(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-18, 110, 36, 160); x.fillStyle = GOLD; x.fillRect(-10, 116, 20, 150)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 150, 0, 0, 7); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 120, 140, 0, 0, 7); x.fill()
  x.fillStyle = '#bfe9ff'; x.beginPath(); x.ellipse(0, 0, 100, 120, 0, 0, 7); x.fill()
  x.fillStyle = '#fff'; x.fillRect(-60, -70, 20, 60)
  x.restore()
}
/** a door, opened by p (0–1), warm light spilling out */
function door(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -220, 240, 440)
  x.fillStyle = '#ffd27a'; x.fillRect(-110, -210, 220 * p, 420)
  x.fillStyle = '#6b3aa8'; x.fillRect(-110 + 220 * p, -210, 220 * (1 - p), 420)
  x.fillStyle = GOLD; x.fillRect(80 - 30 * p, 0, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fills the quiet with plans. | *Try one slow night.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const plans = ['GYM 6AM', 'BRUNCH', 'PARTY', 'KARAOKE']
      plans.forEach((p, i) => L(x, 790, 620 + i * 80, p, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.4) * (lt > 1.5 ? 0.85 : 1), [GOLD, PINK, MINT, LAV][i], (i % 2 ? 0.05 : -0.05), 30))
      L(x, 790, 1050, 'TONIGHT: COUCH ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.03, 34)
    } },
  { sign: 'taurus', cap: 'Cooks for one, beautifully. | *Invite someone over.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, BOWL, BOWL_C, 720, 1080, 18 * pop01(t, P.t0 + 0.6, 0.3, 2))
      const k2 = pop01(t, P.t0 + 1.5, 0.3, 2.2)
      drawBits(x, BOWL, BOWL_C, 880, 1080, 18 * k2)
      if (k2 > 0.5) sparkles(x, t, 880, 1080, P.t0 + 1.6, 6, 90, 0.3)
    } },
  { sign: 'gemini', cap: 'Texts twenty people. | *Call the one who matters.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.2) / 1.0) * 9))
      L(x, 790, 1110, lt > 1.6 ? 'CALLING: BEST FRIEND' : 'SENT: 20', pop01(t, P.t0 + 0.6, 0.3, 2.4), lt > 1.6 ? MINT : GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Rewatches old memories. | *Go make a new one.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      album(x, 790, 860, 0.8 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1090, 'PAGE 1: BLANK (FOR NOW)', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.03, 26)
    } },
  { sign: 'leo', cap: 'Hides it behind a smile. | *You can say it.*', mood: lt => lt > 1.4 ? 'neutral' : 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      L(x, 790, 680, 'SMILE: ON', pop01(t, P.t0 + 0.3, 0.3, 2.4) * (lt > 1.4 ? 0.7 : 1), GOLD, 0.05, 40)
      bubble(x, 790, 900, 'actually… | i miss people', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: BONE, tail: 'bl' })
      if (lt > 1.8) hearts(x, t, 560, 800, P.t0 + 1.9 * (3.1 / 2.4), { n: 4, life: 1.2, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: 'virgo', cap: 'Cleans the whole house. | *Your heart counts too.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, MOP, { K: WOOD, W: '#c9c2e6' }, 790 + 40 * Math.sin(t * 5), 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.15 * Math.sin(t * 5) })
      sparkles(x, t, 790, 1060, P.t0 + 0.8, 6, 140, 0.2)
      L(x, 790, 650, 'FLOORS: SPOTLESS', pop01(t, P.t0 + 0.6, 0.3, 2.4), MINT, 0.04, 32)
      L(x, 790, 1130, 'YOU: NEXT ON THE LIST', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.03, 26)
    } },
  { sign: 'libra', cap: 'Alone? Start with | *your own company.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mirror(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 640, 'oh hi, me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: '“I like being alone.” | *Let one person in.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      door(x, 800, 860, 0.8 * pop01(t, P.t0 + 0.2, 0.35, 2), 0.1 + 0.4 * ease.inOutCubic(prog(lt, 0.9, 1.6)))
      L(x, 800, 1110, 'DOOR: A LITTLE OPEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Books a trip to outrun it. | *Bring a friend.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, P: '#c97bff', Y: GOLD }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 660, lt > 1.4 ? 'TICKETS: 2' : 'TICKETS: 1', pop01(t, P.t0 + 0.7, 0.3, 2.4), lt > 1.4 ? MINT : GOLD, 0.04, 40)
    } },
  { sign: 'capricorn', cap: 'Works through it. | *Feelings aren’t overtime.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: lt > 1.5 ? '#2a2350' : SKYB, W: lt > 1.5 ? '#2a2350' : CREAM, G: '#9aa0b4' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1090, lt > 1.5 ? 'CLOCKED OUT ♡' : '11:47 PM', pop01(t, P.t0 + 0.6, 0.3, 2.4), lt > 1.5 ? PINK : LAV, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Lonely in a crowd? | *Find your weird people.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      ;['gemini', 'sagittarius', 'aquarius'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.6 + i * 0.3, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 640 + i * 130, 1000 - (i % 2) * 40, 140 * k, { mood: i === 1 ? 'wink' : 'sparkle', look: [-1, 0], seed: 21 + i, glyph: false, squash: 0.15 * Math.sin(t * 8 + i) })
      })
      bubble(x, 780, 660, 'you too?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cries to sad songs. | *Then calls a friend.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], tears: lt => lt > 1.5 ? 1 : 3, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HEADPHONES, { K: INK, P: PINK }, 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      notes(x, t, 790, 780, { n: 4, cell: 7, col: LAV, alpha: clamp(lt * 2) })
      bubble(x, 790, 1060, 'hey… | got a minute?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2a0369', key: 'E', accent: ACC, ending: 'callback',
  title: 'Loneliness, | *sign by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Lonely isn’t broken. | *Reach out.*' },
  last: {
    text: 'Taurus made | *soup for two.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, POT, POT_C, 540, 1000, 26 * pop01(t, t0 + 0.3, 0.35, 2))
      const k = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k > 0.01) {
        signChar(x, t, 'taurus', 300, 1200, 220 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 40, hops: [t0 + 1.6] })
        signChar(x, t, 'cancer', 780, 1200, 220 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [-1, 0], seed: 41, hops: [t0 + 1.8] })
      }
      drawBits(x, BOWL, BOWL_C, 440, 1360, 18 * pop01(t, t0 + 1.0, 0.3, 2))
      drawBits(x, BOWL, BOWL_C, 640, 1360, 18 * pop01(t, t0 + 1.2, 0.3, 2))
      hearts(x, t, 540, 1150, t0 + 1.6, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
