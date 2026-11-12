// r2t0263: star_talk, BE LIKE, "Movie’s over. | Zodiacs be like." (topic: zodiacs when the movie lights come on) (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, the second the cinema lights come up.
//   0.0–3.6    "Movie’s over. | Zodiacs *be like.*"
//   3.6–49.2   ♈ already in the car · ♉ every last kernel · ♊ asking the row their signs · ♋ hugging the stranger
//              · ♌ standing ovation, alone · ♍ collecting the row's trash · ♎ can't pick where to eat · ♏ called the twist
//              in minute two · ♐ booking a trip to the filming spot · ♑ checking email, didn't watch · ♒ staying for every
//              credit · ♓ sobbing, and it was a comedy
//  49.2        "Lights on. | *Chaos on.*"
//  52.6        ending 'callback': "Theatre’s empty. | *Pisces is still here.*"  Pisces alone in a red seat, still crying.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, beam, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffd23a'
const ST = { x: -170 }
const CAR = ['....RRRRRR....', '...RSSRSSSR...', '..RRSSRSSSRR..', 'RRRRRRRRRRRRRR', 'RYRRRRRRRRRRYR', 'RRRRRRRRRRRRRR', '.KKK......KKK.', '.KGK......KGK.', '..K........K..']
const CAR_C = { R: '#ff6b5a', S: SKYB, Y: SUN, K: INK, G: GREY }
const POPCORN = ['.WWYWWYW.', 'WYWWWWWYW', 'WWWYWWWWW', 'RWRWRWRWR', 'RWRWRWRWR', '.RWRWRWR.', '.RWRWRWR.', '..RWRWR..']
const POP_C = { W: CREAM, Y: '#ffe27a', R: RED }
const BAG = ['...KK...', '..K..K..', '.GGGGGG.', 'GGGGGGGG', 'GgGGGGgG', 'GGGGGGGG', 'GGGgGGGG', '.GGGGGG.']
const SEAT = ['.RRRRRRRR.', 'RRrrrrrrRR', 'RRrrrrrrRR', 'RRrrrrrrRR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'K.K....K.K']
const SEAT_C = { R: '#c23a4a', r: '#e2566a', K: INK }

const CAMEOS = [
  { sign: 'aries', cap: 'Already in the car. | *Engine running.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CAR, CAR_C, 780 + Math.sin(t * 40) * 3 * clamp(lt - 0.6), 940, 20 * k)
      x.fillStyle = 'rgba(200,200,220,0.5)'; for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i * 0.25) % 1; x.globalAlpha = (1 - ph) * k; x.beginPath(); x.arc(940 + ph * 30, 1010 - ph * 50, 10 + ph * 14, 0, Math.PI * 2); x.fill() }
      x.globalAlpha = 1
      label(x, 790, 700, 'VROOM. BYE.', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 38, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Finishing the popcorn. | *Every last kernel.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POPCORN, POP_C, 790, 910, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.08 })
      label(x, 790, 1120, 'NOT LEAVING YET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asking the whole row | *their signs.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'what’s your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 830, 'Capricorn? KNEW it', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      bubble(x, 790, 1000, 'and you??', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Hugging the stranger | *in the next seat.*', mood: 'heart', look: [1, 0], star: { x: -140 }, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 930, 210 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], seed: 31, glyph: false })
      hearts(x, t, 620, 820, P.t0 + 0.9, { n: 6, life: 1.6, spread: 200, cell: 7, seed: 3 })
      bubble(x, 800, 660, 'um. hi?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Standing ovation. | *Alone.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { beam(x, 370, 470, 370, 1100, 200, pop01(t, P.t0 + 0.2, 0.4, 1.6)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'BRAVO!!!', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.05 })
      label(x, 790, 960, 'clap · clap · clap', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      confetti(x, t, 600, 800, P.t0 + 0.7, { n: 16, spread: 300, h: 560 })
    } },
  { sign: 'virgo', cap: 'Collecting everyone’s trash. | *Row by row.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BAG, { G: '#5fd068', g: '#3e9a48', K: INK }, 790, 920, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const r = 'ABCDEFGH'[Math.min(7, Math.floor(clamp((lt - 0.3) / 1.8) * 8))]
      label(x, 790, 680, `ROW ${r}: CLEAN`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Can’t pick | *where to eat after.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : 0, 0], star: ST,
    front(x, t, lt, P) {
      const opts = ['TACOS?', 'PASTA?', 'SUSHI?']
      opts.forEach((o, i) => card(x, 790, 700 + i * 160, 270, 110, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), { bg: [PINK, GOLD, MINT][i], rot: (i - 1) * 0.05 }, () => txt(x, o, 0, 4, { size: 46 })))
      label(x, 800, 1140, 'DECIDING… (40 MIN)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Called the twist | *in minute two.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        x.fillStyle = '#c97bff'; x.fillRect(-150, -150, 300, 64)
        txt(x, 'PREDICTIONS', 0, -118, { size: 28, font: MONO, weight: 700, color: CREAM })
        txt(x, 'the butler.', 0, -20, { size: 40 })
        txt(x, '0:02', 0, 50, { size: 34, font: MONO, weight: 700, color: '#6b62a8' })
        if (lt > 1.1) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, -18, 130, 44, 0, 0, Math.PI * 2 * clamp((lt - 1.1) / 0.4)); x.stroke() }
      })
      label(x, 790, 1100, 'CALLED IT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: '#c97bff', rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Booking a trip | *to where it was filmed.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FLIGHTS', headCol: LAV, size: 32, w: 330, h: 420, lines: [
        ['the movie island', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['1 seat · tonight', GOLD, pop01(t, P.t0 + 1.0, 0.25, 2)],
        ['BOOKED ✓', MINT, pop01(t, P.t0 + 1.5, 0.25, 2)],
      ] })
    } },
  { sign: 'capricorn', cap: 'Checking emails. | *Didn’t watch it.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'INBOX', headCol: GREY, size: 32, w: 330, h: 420, lines: [
        ['re: re: Q3', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)],
        ['re: budget', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)],
        ['re: re: re: re:', BONE, pop01(t, P.t0 + 1.1, 0.25, 2)],
      ] })
      bubble(x, 560, 620, 'was it good?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Staying for the credits. | *All of them.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#0c0820', rot: 0 }, () => {
        x.save(); x.beginPath(); x.rect(-150, -190, 300, 380); x.clip()
        const roles = ['DIRECTOR', 'KEY GRIP', 'BEST BOY', 'CATERING', 'DOG WRANGLER', 'GAFFER', 'FOLEY', 'THE DOG', 'INTERN #4']
        roles.forEach((r, i) => txt(x, r, 0, 210 + i * 70 - lt * 120, { size: 26, font: MONO, weight: 700, color: BONE }))
        x.restore()
      })
      label(x, 790, 1100, 'GAFFER: LEGEND', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Still sobbing. | *It was a comedy.*', mood: 'wide', tears: 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'GENRE: COMEDY', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'the DOG was so happy', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0263', key: 'G', accent: ACC, ending: 'callback',
  title: 'Movie’s over. | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Lights on. | *Chaos on.*' },
  last: {
    text: 'Theatre’s empty. | *Pisces is still here.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      for (let i = 0; i < 3; i++) drawBits(x, SEAT, SEAT_C, 300 + i * 240, 1080, 20 * pop01(t, t - lt + 0.3 + i * 0.1, 0.35, 2))
      if (k > 0.01) signChar(x, t, 'pisces', 540, 950, 240 * k, { mood: 'wide', seed: 54, tears: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
