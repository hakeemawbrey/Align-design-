// r2a0280: star_advice, ADVICE ROLLCALL, "Each sign’s | friendship advice." (~60 s vertical, signs3kit, lofi · G)
// Twelve signs, one warm, specific piece of friendship advice each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *friendship advice.*"
//   3.6–49.2   ♈ be the first to cheer · ♉ feed your friends, it counts as love · ♊ ask one more question, then listen
//              · ♋ check on the strong friend · ♌ hype them up in public · ♍ help with the plan, skip the critique
//              · ♎ say the honest thing, kindly · ♏ keep their secrets, forever · ♐ stop planning, book the trip
//              · ♑ remember their small wins · ♒ let them be weird, be weird back · ♓ cry with them, then make them laugh
//  49.2        "Twelve ways | *to show up.*"
//  52.4        LESSON UNLOCKED: "Friendship is built | in *small moments.*"  STATUS: BESTIES
//  58.3        "Pisces read this. | *Already crying.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, confetti, shades, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }

const PLATE = ['..WWWWWWWWW..', '.WWYYWWWRRWW.', 'WWYYYWWWRRRWW', '.WWWWWWWWWWW.', '..WWWWWWWWW..']
const PLATE_C = { W: CREAM, Y: '#ffd86b', R: '#e8a24a' }
const LOCK = ['..KKKKKK..', '.KGGGGGGK.', '.KG....GK.', '.KG....GK.', 'KKKKKKKKKK', 'KYYYYYYYYK', 'KYYYKKYYYK', 'KYYYKKYYYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const LOCK_C = { K: INK, G: GREY, Y: GOLD }
const CLIP = ['...KKKK...', 'KKKGGGGKKK', 'KWWWWWWWWK', 'KWKKKKKKWK', 'KWWWWWWWWK', 'KWKKKKKWWK', 'KWWWWWWWWK', 'KWKKKKKKWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const CLIP_C = { K: INK, G: GREY, W: CREAM }

const CAMEOS = [
  { sign: 'aries', cap: 'Be the first | *to cheer.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'GO YOU!!', pop01(t, P.t0 + 0.3, 0.25, 2.6), { size: 64, col: GOLD, tail: 'bl' })
      label(x, 800, 960, 'FIRST CLAP: ARIES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 0.6, 8, 180, 0.3)
    } },
  { sign: 'taurus', cap: 'Feed your friends. | *It counts as love.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'SECONDS? THIRDS?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
      hearts(x, t, 800, 860, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Ask one more question. | *Then really listen.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, '…and then what?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      label(x, 800, 920, 'PHONE: DOWN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1070, 'LISTENING ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Check on | *the strong friend.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'CAPRICORN', headCol: MINT, size: 26, lines: [
        ['you okay?', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['…honestly, no', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['on my way ♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
    } },
  { sign: 'leo', cap: 'Hype them up. | *In public.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1000, 170 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 61, glyph: false })
      label(x, 770, 700, 'STANDING OVATION', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04 })
      confetti(x, t, 800, 860, P.t0 + 1.0, { n: 18, spread: 200, h: 480 })
    } },
  { sign: 'virgo', cap: 'Help with the plan. | *Skip the critique.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CLIP, CLIP_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      const out = prog(lt, 0.9, 1.2)
      label(x, 800, 660, 'RED PEN', pop01(t, P.t0 + 0.4, 0.3, 2) * (1 - out), { size: 36, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 660, 'YOU’VE GOT THIS', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Say the honest thing. | *Kindly.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'can I be honest? | (with love)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      bubble(x, 800, 960, 'thank you. | I needed that.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
    } },
  { sign: 'scorpio', cap: 'Keep their secrets. | *Forever.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LOCK, LOCK_C, 800, 870, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1100, 'VAULT: SEALED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Stop planning. | *Book the trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      card(x, 800, 860, 340, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        x.fillStyle = LAV; x.fillRect(-170, -90, 80, 180)
        txt(x, 'TICKET ×2', 40, -40, { size: 32, font: MONO, weight: 700 })
        txt(x, 'you + me', 40, 20, { size: 34, color: '#6b62a8' })
      })
      label(x, 800, 1080, 'BOOKED!', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 46, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Remember their | *small wins.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 840, 320, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = GREEN; x.fillRect(-160, -130, 320, 56); txt(x, 'REMINDER', 0, -102, { size: 30, font: MONO, weight: 700, color: CREAM })
        txt(x, 'their first', 0, -20, { size: 34 }); txt(x, 'pottery class!', 0, 30, { size: 34 })
        if (lt > 1.1) txt(x, 'ASK HOW IT WENT', 0, 92, { size: 22, font: MONO, weight: 700, color: GREEN })
      })
      sparkles(x, t, 800, 840, P.t0 + 1.2, 7, 190, 0.4)
    } },
  { sign: 'aquarius', cap: 'Let them be weird. | *Be weird back.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const Fs = signChar(x, t, 'gemini', 820, 960, 200 * k, { mood: 'happy', look: [-1, 0], seed: 62, glyph: false })
        if (lt > 0.9) shades(x, Fs.x, Fs.cy - 6, 11)
      }
      if (lt > 1.3) shades(x, F.x, F.cy - 8, 16)
      label(x, 800, 680, 'MATCHING SHADES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry with them. | *Then make them laugh.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: lt => lt > 1.3 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 1000, 170 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 63, glyph: false, tears: lt > 1.3 ? 0 : 1 })
      bubble(x, 800, 700, lt > 1.3 ? 'HAHA stop' : 'it’s okay', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: lt > 1.3 ? GOLD : SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0280', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *friendship advice.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to show up.*' },
  lesson: { text: 'Friendship is built | in *small moments.*', chip: 'STATUS: BESTIES' },
  last: { text: 'Pisces read this. | *Already crying.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
