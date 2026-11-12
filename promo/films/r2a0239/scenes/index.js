// r2a0239: star_advice, ADVICE ROLLCALL, "How to ask out | each sign." (~63 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm and specific way to ask each one out, each with a light visual gag.
//   0.0–3.6    "How to ask out | *each sign.*"
//   3.6–49.2   ♈ be direct, they'll say yes first · ♉ lead with food · ♊ open with a weird fact · ♋ make it cozy
//              · ♌ compliment first, then ask · ♍ bring a real plan · ♎ pick the place for them · ♏ be honest, mystery can wait
//              · ♐ make it an adventure · ♑ send a calendar invite · ♒ ask something odd · ♓ write it down, they'll keep it
//  49.2        "Twelve ways. | *One brave question.*"
//  52.4        LESSON UNLOCKED: "Just ask. | *Kindly and clearly.*"  STATUS: ASKED
//  58.3        "Pisces kept the note. | *Framed it.*" over the match card: Cancer + Pisces (the cozy night and the note).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, sheet, handset, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const ACC = '#ff8fb1'
const ST = { x: -170 }
const LBL = { font: MONO, weight: 700 }
const BASKET = ['...KKKKKK...', '..K......K..', '.K........K.', 'RWRWRWRWRWRW', 'WRWRWRWRWRWR', 'RWRWRWRWRWRW', '.BBBBBBBBBB.', '..BBBBBBBB..']
const BASKET_C = { K: BROWN, R: RED, W: CREAM, B: WOOD }
const BLANKET = ['LLLLLLLLLLLL', 'LWLLWLLWLLWL', 'LLLLLLLLLLLL', 'LWLLWLLWLLWL', 'LLLLLLLLLLLL']
const TICKET = ['GGGGGGGGGGGG', 'G.GGGGGGGG.G', 'GGGGGGGGGGGG', 'G.GGGGGGGG.G', 'GGGGGGGGGGGG']
const ENV = ['KKKKKKKKKKKK', 'KWWKWWWWKWWK', 'KWWWKWWKWWWK', 'KWWWWKKWWWWK', 'KWWWWPPWWWWK', 'KWWWPPPPWWWK', 'KWWWWPPWWWWK', 'KKKKKKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Be direct. | *They’ll say yes first.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'want to get—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 820, 900, 'YES.', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 70, col: GOLD, tail: 'bl' })
      sparkles(x, t, 820, 900, P.t0 + 1.0, 7, 140, 0.3)
    } },
  { sign: 'taurus', cap: 'Lead with food. | *Honestly, just bring food.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'PICNIC FOR TWO?', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...LBL })
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 4, life: 1.5, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Open with a weird fact. | *Instant chemistry.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'octopuses have | three hearts.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 900, 'TELL ME MORE', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Make it cozy. | *Homemade always wins.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BLANKET, { L: PINK, W: '#ffd0dc' }, 790, 1050, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 800, 260, 170, pop01(t, P.t0 + 0.6, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => { txt(x, 'movie night', 0, -30, { size: 32 }); txt(x, 'at mine? ♥', 0, 22, { size: 32, color: RED }) })
    } },
  { sign: 'leo', cap: 'Compliment them first. | *Then ask.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'your laugh | is iconic', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      label(x, 790, 900, 'SAY YES: LOADING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, ...LBL })
      sparkles(x, t, 380, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Bring a real plan. | *Details are romantic.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 290, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 'DATE PLAN', { rot: 0.04, size: 30 }, () => {
        ;['7:00 quiet café', '8:30 short walk', '10:00 home', 'chart: checked ✓'].forEach((s, i) => { if (lt < 0.5 + i * 0.25) return; txt(x, s, -120, -60 + i * 40, { size: 22, font: MONO, weight: 700, align: 'left', color: i === 3 ? GREEN : INK }) })
      })
    } },
  { sign: 'libra', cap: 'Pick the place for them. | *They’ll be relieved.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => lt > 1.3 ? [0, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I booked | the garden place', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      label(x, 790, 920, 'DECISIONS: 0 ♥', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, ...LBL })
    } },
  { sign: 'scorpio', cap: 'Be honest. | *Mystery can wait.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I like you. | really.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 920, 'GAMES PLAYED: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, ...LBL })
      hearts(x, t, 400, 820, P.t0 + 1.4, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Make it an adventure. | *Spontaneous counts.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, TICKET, { G: SUN }, 320, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      label(x, 320, 820, 'SUNRISE HIKE?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: CREAM, rot: -0.08, ...LBL })
      bubble(x, 320, 1030, 'leaving in 10', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Send a calendar invite. | *They’ll swoon.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = '#3f6fd0'; x.fillRect(-150, -120, 300, 50); txt(x, 'INVITE', 0, -95, { size: 26, font: MONO, weight: 700, color: CREAM })
        txt(x, 'Dinner · Fri 7pm', 0, -30, { size: 28 })
        x.fillStyle = lt > 1.2 ? GREEN : '#cfe9d2'; x.fillRect(-120, 30, 110, 56); txt(x, 'YES', -65, 58, { size: 26, font: MONO, weight: 700 })
        x.fillStyle = '#e0dbd0'; x.fillRect(10, 30, 110, 56); txt(x, 'no', 65, 58, { size: 26, font: MONO, weight: 700, color: GREY })
      })
      label(x, 790, 1100, 'ACCEPTED IN 4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: 'aquarius', cap: 'Ask something odd. | *Weird is romantic.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'museum of | old maps?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 790, 900, 'PERFECT. MARRY ME.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...LBL })
    } },
  { sign: 'pisces', cap: 'Write it down. | *They’ll keep it forever.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', tears: lt => lt > 1.0 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ENV, { K: INK, W: CREAM, P: PINK }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 790, 680, 'READ IT 40 TIMES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, ...LBL })
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0239', key: 'E', accent: ACC, ending: 'card',
  title: 'How to ask out | *each sign.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'pisces', chip: 'IT’S A DATE' },
  group: { cap: 'Twelve ways. | *One brave question.*' },
  lesson: { text: 'Just ask. | *Kindly and clearly.*', chip: 'STATUS: ASKED' },
  last: { text: 'Pisces kept the note. | *Framed it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
