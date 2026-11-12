// v3t119: THE SIGNS AS… v3, "Your birthday? | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · F)
// (batch topic: "Zodiacs on their friend's birthday | be like."; shortened so the hook stays on two lines)
//   0.0–3.6    "Your birthday? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   a friend's birthday, per sign (3.8 s each), pushed to the extreme:
//              ♈ texted at 12:00:01 · ♉ gave a blanket, napped in it · ♊ planned three parties, same night
//              · ♋ a scrapbook of your whole life · ♌ wore a party hat bigger than yours · ♍ party schedule, minute by minute
//              · ♎ picked your gift, then five more · ♏ planned the surprise for a year · ♐ forgot the date, party on a Tuesday
//              · ♑ gift: a five-year plan, framed · ♒ celebrated your half-birthday too · ♓ cried during the candles
//  49.2        "Everyone showed up. | *Too much.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Show up for your people. | *Loudly.*"  FRIEND: CELEBRATED
//  58.3        "Text them first. | *Beat Aries.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068', ACC = '#ffd23a'

const PHONE = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKGGKKKK', 'KKKKKKKKKK']
const BLANKET = ['..CCCCCCCCCCCC..', '.CCcCCCcCCCcCCC.', 'CCCCCCCCCCCCCCCC', 'CcCCCcCCCcCCCcCC', 'CCCCCCCCCCCCCCCC']
const HAT = ['...Y...', '...P...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPYP.', 'PPPPPPP', 'PPPPPPP']
const GIFT = ['...R.R...', '....R....', 'BBBBRBBBB', 'BBBBRBBBB', 'RRRRRRRRR', 'BBBBRBBBB', 'BBBBRBBBB']
const CAKE = ['..F..F..F..', '..Y..Y..Y..', '..W..W..W..', '.PPPPPPPPP.', 'PWPWPWPWPWP', 'CCCCCCCCCCC', 'PPPPPPPPPPP', 'CCCCCCCCCCC']
const CAKE_C = { F: ORANGE, Y: '#fff1b0', W: '#fff4e2', P: PINK, C: '#c98a5a' }

function card(x, cx, cy, k, w, h, title, lines, opt = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(opt.rot ?? 0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = opt.frame || INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = opt.bg || '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 40)
  x.font = `700 28px ${MONO}`; lines.forEach((s, i) => x.fillText(s, 0, -h / 2 + 96 + i * 46))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Texted happy birthday | at *12:00:01.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: '#2a2350', S: '#140c30', G: '#6b62a8' }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 820, 'HBD!!!', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 44, col: GOLD, tail: 'bl' })
      label(x, 790, 960, '12:00:01', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 640, 'FIRST. OBVIOUSLY.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Gift: a cozy blanket. | Then *napped in it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -150, y: -20 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 1.0, 1.4))
      if (lt > 0.4) drawBits(x, BLANKET, { C: LAV, c: '#e0d0ff' }, lerp(800, F.x, d), lerp(900, F.cy + 130, d), 20)
      label(x, 790, 680, 'FOR YOU! (MINE NOW)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Planned three parties. | *Same night.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const L = ['8 P.M. · ROOFTOP', '8 P.M. · KARAOKE', '8 P.M. · PICNIC']
      L.forEach((s, i) => label(x, 790, 680 + i * 140, s, pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2), { size: 28, bg: [GOLD, PINK, SKYB][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
      bubble(x, 790, 1120, 'I’ll do all three', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook | of *your whole life.*', mood: 'heart', tears: lt => lt > 1.4 ? 1 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      const pg = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.45))
      const PAGES = [['AGE 0', 'first smile'], ['AGE 6', 'lost a tooth'], ['YOUR BIRTH', 'CHART (signed)'], ['AGE 27', 'today!']]
      card(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), 300, 300, 'PAGE ' + (pg + 1) + ' OF 400', PAGES[pg], { bg: '#ffe7f0', frame: '#c97bff' })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Wore a party hat. | *Bigger than yours.*', mood: 'sparkle', star: { x: -170, y: 40 },
    front(x, t, lt, P, F) {
      const g = 10 + 14 * ease.outCubic(prog(lt, 0.4, 1.4))
      drawBits(x, HAT, { Y: GOLD, P: ORANGE }, F.x, F.top - g * 3.4, g * pop01(t, P.t0 + 0.3, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) { const Fc = signChar(x, t, 'libra', 800, 1000, 170 * k, { mood: 'happy', look: [-1, -1], seed: 13, glyph: false }); drawBits(x, HAT, { Y: GOLD, P: PINK }, 800, Fc.top - 20, 5 * k) }
      label(x, 800, 760, 'NOT LEO’S BIRTHDAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Planned your party. | *Minute by minute.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const S = ['8:00 ARRIVE', '8:14 CAKE', '8:15 CANDLES', '8:16 WISH (60 S)', '8:17 HUGS']
      card(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 340, 400, 'SCHEDULE', S.filter((_, i) => lt > 0.4 + i * 0.25))
    } },
  { sign: 'libra', cap: 'Picked your gift. | Then *five more.*', mood: lt => lt > 1.5 ? 'squint' : 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      for (let i = 0; i < 6; i++) drawBits(x, GIFT, { B: COLS[i], R: i % 2 ? RED : GOLD }, 700 + (i % 3) * 95, 760 + Math.floor(i / 3) * 150, 11 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2.2))
      label(x, 790, 1110, 'CHOSEN: ALL', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Planned the surprise | *for a whole year.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 300, 300, 'OPERATION', ['CAKE', 'started:', 'last March'], { bg: '#e8dcff', frame: INK, rot: -0.04 })
      label(x, 790, 1100, 'CLASSIFIED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Forgot the date. | Party *on a Tuesday.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3, 1.9],
    front(x, t, lt, P) {
      label(x, 330, 680, 'BIRTHDAY: SATURDAY', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 330, 840, 'PARTY: TUESDAY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1040, 'still counts!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'br' })
      sparkles(x, t, 330, 860, P.t0 + 1.0, 7, 180, 0.2)
    } },
  { sign: 'capricorn', cap: 'Gift: a five-year plan. | *Framed.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 300, 320, 'YOUR PLAN', ['YR 1: SAVE', 'YR 2: PROMOTED', 'YR 3: HOUSE', 'YR 5: THANK ME'], { frame: '#c9a24a' })
      label(x, 790, 1110, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Also celebrated | your *half-birthday.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.beginPath(); x.rect(650, 700, 140, 400); x.clip(); drawBits(x, CAKE, CAKE_C, 790, 900, 24 * k); x.restore() }
      label(x, 790, 660, 'HAPPY 26½', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.05 })
      label(x, 790, 1110, 'NEXT: 26¾', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried during | *the candles.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'MAKE A WISH!', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      bubble(x, 790, 1120, 'it’s just so | beautiful', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3t119', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Your birthday? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone showed up. | *Too much.*' },
  lesson: { text: 'Show up for your people. | *Loudly.*', chip: 'FRIEND: CELEBRATED' },
  last: {
    text: 'Text them first. | *Beat Aries.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
