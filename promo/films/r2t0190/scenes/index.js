// r2t0190: star_talk BE LIKE, "Zodiacs winning | a game be like." (topic: "Zodiacs when they win a game | be like.",
// shortened to fit two lines) (~54 s vertical, signs3kit social cut, music: lofi · F). Ending: 'group'.
//   0.0–3.6    "Zodiacs winning | a game *be like.*"
//   3.6–49.2   ♈ won once, took a victory lap · ♉ won, napped, undefeated · ♊ narrated their own replay · ♋ won, then
//              apologised to everyone · ♌ updated their profile: CHAMPION · ♍ reviewed the rules anyway · ♎ insisted it
//              was a tie · ♏ checked their chart, knew they'd win · ♐ won by accident, rules unknown
//              · ♑ already planning season two · ♒ invented a new game, lost · ♓ cried for the loser
//  49.2        "Rematch? | *Absolutely not.*"  The twelve pose; the game box slams shut with a GAME OVER sticker.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, wheel, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ff9a4a', L = { x: -160 }, R = { x: 160 }
const SCALES = ['......G......', '.....GGG.....', 'GGGGGGGGGGGGG', 'G.....G.....G', 'G.....G.....G', 'PPP...G...PPP', 'PPP...G...PPP', '......G......', '....GGGGG....']
const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']
const ODD = ['WWWWWWW', 'WHWWWWW', 'WWWWWWW', 'WWWSWWW', 'WWWWWWW', 'WWWWWQW', 'WWWWWWW']
const BOOK = ['BBBBBBBBBBBB', 'BWWWWWBWWWWW', 'BWYYYWBWWWWW', 'BWWWWWBWYYYW', 'BWYYWWBWWWWW', 'BWWWWWBWWYYW', 'BBBBBBBBBBBB']
const CARD_Q = ['WWWWWW', 'WRRRRW', 'WRWWRW', 'WWWRRW', 'WWRRWW', 'WWWWWW', 'WWRRWW', 'WWWWWW']

const CAMEOS = [
  { sign: 'aries', cap: 'Won once. | *Took a victory lap.*', mood: 'sparkle', look: [1, 0], star: { x: -160 }, hops: [0.3, 0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 3)
      label(x, 790, 760, `LAP ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 52, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1020, 'WHO’S NEXT?!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Won. Napped. | *Undefeated.*', mood: lt => lt > 0.9 ? 'sleepy' : 'sparkle', star: { x: -40 },
    front(x, t, lt, P) {
      label(x, 820, 1100, 'UNDEFEATED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Narrated their own | *replay. Five times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => {
        x.fillStyle = DEEP; x.fillRect(-145, -100, 290, 170)
        x.fillStyle = RED; x.beginPath(); x.moveTo(-20, -40); x.lineTo(30, -10); x.lineTo(-20, 20); x.fill()
        txt(x, `REPLAY ×${1 + Math.floor(clamp((lt - 0.3) / 1.6) * 4)}`, 0, 50, { size: 28, font: MONO, weight: 700, color: GOLD })
      })
      bubble(x, 790, 1100, 'and THEN…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Won. | *Apologised to everyone.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'sorry!! | good game!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      label(x, 790, 1120, 'SNACKS FOR ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 1000, P.t0 + 1.2, { n: 4, life: 1.2, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Updated their profile: | *“Champion.”*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        txt(x, 'MY PROFILE', 0, -130, { size: 22, font: MONO, weight: 700, color: GOLD })
        signChar(x, t, 'leo', 0, -30, 120, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.6 })
        txt(x, 'LEO · FIRE', 0, 60, { size: 26, color: CREAM })
        if (lt > 0.9) { const k = pop01(lt, 0.9, 0.3, 2.4); x.save(); x.translate(0, 110); x.scale(k, k); x.fillStyle = GOLD; x.fillRect(-90, -22, 180, 44); txt(x, 'CHAMPION', 0, 1, { size: 26, font: MONO, weight: 700 }); x.restore() }
      })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 240, 0.5)
    } },
  { sign: 'virgo', cap: 'Won. Still | *reviewed the rules.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { B: '#2fc79a', W: CREAM, Y: GOLD }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      label(x, 790, 1110, 'PAGE 41, RULE 3', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Won. | *Insisted it was a tie.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const tilt = lt < 1.0 ? 0.25 * Math.sin(lt * 6) : 0
      drawBits(x, SCALES, { G: GOLD, P: PINK }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: tilt })
      label(x, 790, 1120, 'EVERYONE WINS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Checked their chart. | *Knew they’d win.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      wheel(x, 790, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.15)
      label(x, 790, 1110, 'CALLED IT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 44, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Won by accident. | *Rules: unknown.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CARD_Q, { W: CREAM, R: RED }, 320, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.PI + Math.sin(t * 2) * 0.1 })
      bubble(x, 330, 640, 'wait, I won?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: CREAM, tail: 'br' })
      label(x, 320, 1110, 'BEGINNER’S LUCK', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Won one round. | *Planning the dynasty.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 320, 860, 300, 280, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, '5-YEAR PLAN', 0, -105, { size: 26, font: MONO, weight: 700 })
        const p = clamp((lt - 0.4) / 1.2)
        x.strokeStyle = GREEN; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(-110, 90)
        for (let i = 1; i <= 5; i++) { if (i / 5 > p) break; x.lineTo(-110 + i * 44, 90 - i * 30 + (i % 2) * 10) }
        x.stroke()
      })
      label(x, 320, 1100, 'SEASON 2', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new game. | *Lost it.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, ODD, { W: CREAM, H: PINK, S: SKYB, Q: MINT }, 730, 900, 18 * k, { rot: t * 2 })
      drawBits(x, ODD, { W: CREAM, H: GOLD, S: LAV, Q: RED }, 870, 940, 18 * k, { rot: -t * 1.6 })
      label(x, 800, 1120, 'RULES: VIBES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Won. | *Cried for the loser.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 940, 200 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 15, glyph: false })
      bubble(x, 820, 700, 'I’m fine?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0190', key: 'F', accent: ACC, ending: 'group',
  title: 'Zodiacs winning | a game *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Rematch? | *Absolutely not.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.3, 0.4, 2)
      drawBits(x, DIE, { W: CREAM, K: INK }, 330, 660, 16 * k, { rot: 0.2 })
      drawBits(x, DIE, { W: CREAM, K: INK }, 460, 640, 16 * k, { rot: -0.15 })
      label(x, 720, 660, 'GAME OVER', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 48, bg: RED, color: CREAM, rot: -0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
