// r2t0265: star_talk, ROLLCALL, "The signs teaching | parents tech." (~59 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of themselves on family tech support.
//   0.0–3.6    "The signs teaching | *parents tech.*"
//   3.6–49.2   ♈ grabbed the phone, did it themself · ♉ explained it slowly, over snacks · ♊ explained it twelve ways
//              · ♋ wrote it on a recipe card · ♌ set the wallpaper to a Leo selfie · ♍ a laminated forty-page manual
//              · ♎ showed them their birth chart, now hooked · ♏ two-factor on the toaster · ♐ teaching video calls from
//              another country · ♑ sent an invoice · ♒ built them a robot butler · ♓ Dad sent a thumbs-up, Pisces sobbed
//  49.2        "Tech support: | *closed for today.*"
//  52.4        LESSON UNLOCKED: "They taught you to walk. | *Teach them gently.*"  STATUS: PATIENT
//  58.3        "Dad is still | *typing in caps.*"  a phone with Dad's all-caps message.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, laptop, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fe3ff'
const ST = { x: -170 }
const CHIPS = ['..YYYYYY..', '.YoYYYYoY.', 'YYYYoYYYYY', 'KKKKKKKKKK', '.KBBBBBBK.', '..KBBBBK..', '...KKKK...']
const TOASTER = ['..........', '.KKKKKKKK.', 'KSSSSSSSSK', 'KSDSSSDSSK', 'KSSSSSSSSK', 'KSSSSSSSGK', 'KSSSSSSSSK', 'KKKKKKKKKK', '.K......K.']
const ROBOT = ['...KKKK...', '...KSSK...', '.KKKKKKKK.', '.KSBSSBSK.', '.KSSSSSSK.', '.KSRRRRSK.', '.KKKKKKKK.', 'KKSSSSSSKK', 'KSSSGGSSSK', 'KKSSSSSSKK', '..KK..KK..', '..KK..KK..']
const ROBOT_C = { K: INK, S: '#c9c9d8', B: SKYB, R: '#ff6b5a', G: GOLD }
const THUMB = ['...YY...', '...YY...', '..YYY...', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYY.', 'YYYYYYY.', '.YYYYY..']

const CAMEOS = [
  { sign: 'aries', cap: 'Grabbed the phone. | *Did it themself.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const grab = ease.inOutCubic(prog(lt, 0.4, 0.8))
      phone(x, lerp(820, 600, grab), 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'SETTINGS', headCol: GREY, size: 30, w: 280, h: 400, rot: lerp(0.05, -0.15, grab), lines: [['DONE ✓', MINT, pop01(t, P.t0 + 1.1, 0.25, 2)]] })
      label(x, 820, 1110, 'TIME: 4 SECONDS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Explained it slowly. | *Over snacks.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHIPS, { Y: '#ffd86b', o: '#e8a93a', K: INK, B: '#5fd068' }, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 740, 'so… you tap here.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1120, 'LESSON 1 OF 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Explained it | *twelve different ways.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const ways = ['like a door', 'like a fridge', 'like a sandwich', 'like… a cloud']
      ways.forEach((w, i) => bubble(x, 790 + (i % 2 ? 30 : -20), 650 + i * 130, w, pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 32, col: [BONE, GOLD, MINT, LAV][i], tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Wrote the steps | *on a recipe card.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 270, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#fff1d6', rot: 0.05 }, () => {
        x.fillStyle = PINK; x.fillRect(-165, -135, 330, 50)
        txt(x, 'VIDEO CALL ♥', 0, -108, { size: 28, font: MONO, weight: 700 })
        ;['1. tap green', '2. smile', '3. call me'].forEach((s, i) => txt(x, s, -130, -40 + i * 60, { size: 32, align: 'left', font: INTER, weight: 700 }))
      })
      label(x, 790, 1110, 'FROM THE KITCHEN OF ME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Set their wallpaper | *to a Leo selfie.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      phone(x, 790, 860, k, { head: 'HOME', headCol: ORANGE, size: 26, w: 280, h: 420, lines: [] })
      if (k > 0.5) signChar(x, t, 'leo', 790, 900, 200, { mood: 'wink', seed: 61, glyph: false, glow: 0.6 })
      label(x, 790, 1120, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made a laminated manual. | *Forty pages.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 40)
      for (let i = 0; i < 5; i++) card(x, 790 + i * 6, 880 - i * 8, 260, 330, pop01(t, P.t0 + 0.2 + i * 0.06, 0.3, 2), { bg: i === 4 ? '#e8f8ff' : CREAM, rot: 0.04 })
      card(x, 814, 848, 260, 330, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: '#e8f8ff', rot: 0.04 }, () => {
        txt(x, 'HOW TO:', 0, -110, { size: 32 }); txt(x, 'THE PHONE', 0, -60, { size: 32 })
        txt(x, `p. ${Math.max(1, n)}/40`, 0, 110, { size: 28, font: MONO, weight: 700, color: '#6b62a8' })
        x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-130, -165, 40, 330)
      })
    } },
  { sign: 'libra', cap: 'Showed Mom her birth chart. | *Now she’s hooked.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 840, 130, pop01(t, P.t0 + 0.2, 0.4, 2), t, 0.3)
      bubble(x, 790, 1060, 'I’m a Libra MOON?!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Set up two-factor | *on the toaster.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TOASTER, { K: INK, S: '#c9c9d8', D: '#2a2350', G: RED }, 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'ENTER CODE: ••••••', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1140, 'TOAST: SECURED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Teaching video calls. | *From another country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      laptop(x, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = '#3a2a68'; x.fillRect(-120, -70, 240, 140)
        signChar(x, t, 'cancer', -50, 10, 90, { mood: lt > 1.2 ? 'heart' : 'wide', look: [0, -1], seed: 71, glyph: false, glow: 0.5 })
        txt(x, 'MOM', 50, -40, { size: 22, font: MONO, weight: 700, color: BONE })
      })
      bubble(x, 790, 650, 'Mom, you’re upside down', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 28, col: GOLD, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Fixed the printer. | *Sent an invoice.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'INVOICE', 0, -130, { size: 40 })
        ;['printer: 1', 'patience: 9', 'family rate'].forEach((s, i) => txt(x, s, -120, -50 + i * 56, { size: 28, align: 'left', font: MONO, weight: 700 }))
        txt(x, 'TOTAL: 1 HUG', 0, 130, { size: 32, color: RED })
      })
    } },
  { sign: 'aquarius', cap: 'Built them | *a robot butler.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 790, 900 + 8 * Math.sin(t * 4), 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 * Math.sin(t * 3) })
      bubble(x, 800, 640, 'TEA, MADAM?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl', font: MONO, weight: 700 })
      label(x, 790, 1140, 'MOM’S NEW BEST FRIEND', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Dad sent a thumbs-up. | *Pisces sobbed.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'DAD', headCol: SKYB, size: 30, w: 280, h: 400, lines: [] })
      drawBits(x, THUMB, { Y: '#ffd23a' }, 790, 880, 16 * pop01(t, P.t0 + 0.7, 0.35, 2.2))
      label(x, 790, 1120, 'HIS FIRST EMOJI', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0265', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs teaching | *parents tech.*',
  cameos: CAMEOS,
  group: { cap: 'Tech support: | *closed for today.*' },
  lesson: { text: 'They taught you to walk. | *Teach them gently.*', chip: 'STATUS: PATIENT' },
  last: {
    text: 'Dad is still | *typing in caps.*',
    draw(x, t, lt) {
      phone(x, 540, 730, pop01(t, t - lt + 0.6, 0.35, 2), { head: 'DAD', headCol: SKYB, size: 36, w: 480, h: 250, rot: -0.03, lines: [['HELLO THIS IS DAD', BONE, pop01(t, t - lt + 1.1, 0.25, 2)], ['…', GOLD, lt > 1.5 ? 1 : 0]] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
