// r2a0155: star_advice ADVICE ROLLCALL, "Each sign’s | first move." (~63 s vertical, signs3kit social cut, music: lofi · G).
// Ending: 'card'.
//   0.0–3.6    "Each sign’s | *first move.*"
//   3.6–49.2   ♈ just says it · ♉ cooks for you · ♊ a funny text is their hello · ♋ remembers your coffee order · ♌ a big,
//              loud gesture · ♍ plans the perfect date · ♎ compliments you first · ♏ asks one deep question · ♐ "want to get
//              lost?" · ♑ sends a calendar invite · ♒ sends a weird fact (otters hold hands) · ♓ writes a poem, cries reading it
//  49.2        "Twelve ways | *to say hi.*"
//  52.4        LESSON: "Every first move | *is brave.*"  MOVE: MADE
//  58.3        "The poem was | *about otters.*" over the match card: Aquarius + Pisces (the otter fact and the poem, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ff8fb1', L = { x: -160 }, R = { x: 160 }
const POT = ['.S..S..S.', '..S..S...', 'KKKKKKKKK', 'KRRRRRRRK', 'KRRRRRRRKK', 'KRRRRRRRK', '.KRRRRRK.', '..KKKKK..']
const CUP = ['.WWWWWW.', 'BBBBBBBB', '.BBBBBB.', '.BBWWBB.', '.BBBBBB.', '..BBBB..']
const COMPASS = ['...KKKK...', '.KKWWWWKK.', '.KWWRWWWK.', 'KWWWRWWWWK', 'KWWWKWWWWK', 'KWWWWGWWWK', 'KWWWWGWWWK', '.KWWWWWWK.', '.KKWWWWKK.', '...KKKK...']

const CAMEOS = [
  { sign: 'aries', cap: 'Just says it. | *Brave looks good on you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'i like you.', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 54, col: CREAM, tail: 'bl' })
      label(x, 790, 1000, 'TIME TAKEN: 0 SEC', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Cooks for you. | *That’s a love letter.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, POT, { K: INK, R: GREEN, S: 'rgba(255,255,255,0.7)' }, 790, 960, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 820, P.t0 + 0.8, { n: 6, life: 2.0, spread: 120, cell: 7, seed: 2 })
      label(x, 790, 1150, 'SECONDS: INCLUDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A funny text. | *That’s their hello.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), {}, () => {
        const n = Math.min(4, Math.floor(Math.max(0, lt - 0.4) / 0.3))
        const B = ['a pigeon', 'just winked', 'at me??', 'anyway hi']
        for (let i = 0; i < n; i++) { x.fillStyle = i % 2 ? '#6b62a8' : MINT; x.fillRect(-96, -130 + i * 64, 190, 46); txt(x, B[i], 0, -107 + i * 64, { size: 26, color: i % 2 ? CREAM : INK }) }
      })
    } },
  { sign: 'cancer', cap: 'Remembers your order. | *That’s a big deal.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CUP, { W: CREAM, B: '#c96a3a' }, 790, 940, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'OAT · EXTRA HOT · YOURS', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A big, loud gesture. | *Let them adore you.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    back(x, t, lt, P) {
      const u = ease.outCubic(prog(lt, 0.3, 0.9))
      if (u <= 0.01) return
      x.save(); x.fillStyle = INK; x.fillRect(130, 600, 6, 260); x.fillRect(944, 600, 6, 260)
      x.fillStyle = GOLD; x.fillRect(136, 620, 808 * u, 120)
      x.beginPath(); x.rect(136, 620, 808 * u, 120); x.clip(); txt(x, 'YOU + ME!!', 540, 682, { size: 64, color: INK }); x.restore()
    },
    front(x, t, lt, P) { sparkles(x, t, 540, 680, P.t0 + 1.0 * 1.29, 8, 260, 0.2) } },
  { sign: 'virgo', cap: 'Plans the perfect date. | *Detail is their love.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'OUR DATE', 0, -150, { size: 32, font: MONO, weight: 700, color: RED })
        const A = ['7:00 dinner', '8:30 walk', '9:15 dessert', '9:16 you smile']
        A.forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, s, -140, -80 + i * 60, { size: 32, align: 'left', color: i === 3 ? RED : INK }) })
      })
    } },
  { sign: 'libra', cap: 'Compliments you first. | *Kindness opens doors.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'love your | jacket!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
      label(x, 790, 1000, 'BLUSH: MUTUAL', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 790, 920, P.t0 + 1.3 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Asks one deep question. | *They want the real you.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'what are you | proudest of?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 1010, 'SMALL TALK: SKIPPED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Want to get lost?” | *That’s an invitation.*', mood: 'sparkle', look: [-1, 0], star: R, hops: [0.7],
    front(x, t, lt, P) {
      drawBits(x, COMPASS, { K: INK, W: CREAM, R: RED, G: GREY }, 330, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 3) * 0.3 })
      label(x, 330, 660, 'DESTINATION: ?', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 330, 1120, 'COMPANY: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Sends a calendar invite. | *Romance, organised.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 330, 860, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = GREEN; x.fillRect(-165, -150, 330, 60)
        txt(x, 'INVITE', 0, -120, { size: 30, font: MONO, weight: 700, color: CREAM })
        txt(x, 'Date (us)', 0, -40, { size: 36 }); txt(x, 'Fri · 7 p.m.', 0, 10, { size: 30, color: '#6b62a8' })
        const a = lt > 1.4
        x.fillStyle = a ? '#2fa36b' : GREY; x.fillRect(-100, 60, 200, 54); txt(x, a ? 'ACCEPTED ✓' : 'ACCEPT?', 0, 88, { size: 28, font: MONO, weight: 700, color: CREAM })
      })
      if (lt > 1.4) sparkles(x, t, 330, 900, P.t0 + 1.4 * 1.29, 6, 170, 0.3)
    } },
  { sign: 'aquarius', cap: 'Sends a weird fact. | *That’s affection.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'did you know | otters hold | hands?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 1060, 'TRANSLATION: I LIKE YOU', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Writes you a poem. | *Cries reading it.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'for you', 0, -130, { size: 44, font: SERIF, weight: 600, color: '#6b3a24' })
        x.fillStyle = GREY; for (let i = 0; i < 5; i++) x.fillRect(-110 + (i % 2) * 20, -60 + i * 40, 200 - (i % 2) * 40, 9)
        x.fillStyle = 'rgba(143,227,255,0.6)'; x.beginPath(); x.arc(60, 40, 22, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(-50, 110, 16, 0, Math.PI * 2); x.fill()
      })
    } },
]

const F = makeFilm({
  id: 'r2a0155', key: 'G', accent: ACC, ending: 'card',
  title: 'Each sign’s | *first move.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'pisces', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve ways | *to say hi.*' },
  lesson: { text: 'Every first move | *is brave.*', chip: 'MOVE: MADE' },
  last: { text: 'The poem was | *about otters.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
