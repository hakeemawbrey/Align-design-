// r2t0210: THE SIGNS AS… v3, BE LIKE, "Zodiacs when someone says “it’s fine” be like." (~57 s vertical, lofi · F)
//   0.0–3.6    "“It’s fine.” | Zodiacs *be like.*"
//   3.6–49.2   ♈ asked "what's wrong?" fourteen times · ♉ believed it, back to napping · ♊ told the group chat · ♋ knew,
//              already made soup · ♌ assumed it was about them · ♍ a list of why it isn't · ♎ said "it's fine" too, neither
//              was · ♏ decoded the tone · ♐ took it literally, "great, bye!" · ♑ filed it under LATER · ♒ checked the
//              chart, blamed Mercury · ♓ cried for both of you
//  49.2        "Nobody believed | *“it’s fine.”*"
//  52.6        callback: "It wasn’t fine. | *Soup fixed it.*"  Cancer's soup comes back, hearts rise.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = SKYB
const ST = { x: -170 }

const SOUP = ['.S..S..S.', '..S..S...', 'OOOOOOOOO', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const SOUP_C = { S: '#ffffff', O: '#ffb34a', W: '#fff4e2', K: INK }
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const FOLDER = ['YYYY........', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'Asked “what’s wrong?” | *Fourteen times.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 13)
      bubble(x, 780, 720, 'what’s wrong?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 920, `ASKED: ${n}×`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: '#ff6b5a', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1100, 'it’s fine.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'Believed it. | *Went back to napping.*', mood: 'sleepy', star: { x: -170, y: 30 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: '#fff4e2' }, 370, 1040, 22 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it’s fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 790, 960, 'GREAT. NAP: ON', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: '#5fd068', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told the group chat: | *“it’s NOT fine.”*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GROUP (9)', headCol: '#ffd23a', lines: [['update!!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['she said fine', BONE, pop01(t, P.t0 + 0.7, 0.25, 2)], ['oh no', MINT, pop01(t, P.t0 + 1.1, 0.25, 2)], ['NOT fine', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.4)]] })
    } },
  { sign: 'cancer', cap: 'Knew it wasn’t. | *Already made soup.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SOUP, SOUP_C, 790, 920, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 700, 'SOUP: READY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 790, 850, P.t0 + 1.3 * 1.29, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Assumed it was | *about them.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'is this about me?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 900, 'it’s fine.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1090, 'SO… IT’S ABOUT ME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Made a list | *of why it isn’t.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 870, 320, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'NOT FINE:', 0, -160, { size: 30, font: MONO, weight: 700 })
        ;['1. the sigh', '2. the “k.”', '3. the pause', '4. the face'].forEach((s, i) => { if (lt > 0.4 + i * 0.3) txt(x, s, 0, -90 + i * 62, { size: 32, align: 'center' }) })
      })
    } },
  { sign: 'libra', cap: 'Said “it’s fine” too. | *Neither was fine.*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 1000, 190 * k, { mood: lt > 1.2 ? 'neutral' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 800, 720, 'it’s fine.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      bubble(x, 400, 620, 'it’s fine!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      label(x, 600, 1170, 'FINE-NESS: 0%', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Heard the tone. | *Decoded every syllable.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: DEEP, rot: -0.03 }, () => {
        x.strokeStyle = MINT; x.lineWidth = 6; x.beginPath()
        for (let i = 0; i <= 60; i++) { const px = -160 + i * 320 / 60, a = Math.sin(i * 0.7 + t * 6) * (i > 20 && i < 40 ? 70 : 20) * clamp((lt - 0.3) * 2); i ? x.lineTo(px, a) : x.moveTo(px, a) }
        x.stroke()
      })
      label(x, 790, 1080, 'TONE: NOT FINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Took it literally. | *“Great! Bye!”*', mood: 'sparkle', look: [-1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'it’s fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      bubble(x, 400, 640, 'great! bye!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1090, 'GONE: HIKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Replied “noted.” | *Filed it under later.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FOLDER, { Y: '#e8c06a' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 900, 'LATER', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: BONE, rot: 0, font: MONO, weight: 700 })
      label(x, 790, 1110, 'FOLDER: FULL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Checked the chart. | *Blamed Mercury.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 830, 130, pop01(t, P.t0 + 0.2, 0.4, 2), t)
      label(x, 790, 1060, 'MERCURY: GUILTY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Heard “it’s fine.” | *Cried for both of you.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 1000, 180 * k, { mood: 'neutral', look: [-1, 0], seed: 23, glyph: false })
      bubble(x, 800, 720, 'it’s fine.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 600, 1170, 'TEARS: SHARED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0210', key: 'F', accent: ACC, ending: 'callback',
  title: '“It’s fine.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody believed | *“it’s fine.”*' },
  last: {
    text: 'It wasn’t fine. | *Soup fixed it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 420, 1080, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 52, hops: [t - lt + 1.4] })
      drawBits(x, SOUP, SOUP_C, 730, 1120, 22 * pop01(t, t - lt + 0.9, 0.35, 2))
      label(x, 730, 1300, 'NOW: FINE', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 600, 980, t - lt + 1.4, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
