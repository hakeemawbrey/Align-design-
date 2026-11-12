// r2t0189: star_talk BE LIKE, "Zodiacs trying a new recipe | be like." (~57 s vertical, signs3kit social cut, music: lofi · D).
// Ending: 'lesson'.
//   0.0–3.6    "Zodiacs trying | a recipe *be like.*"
//   3.6–49.2   ♈ max heat, called it "seared" · ♉ ate it before plating · ♊ two recipes at once · ♋ enough for the whole street
//              · ♌ plated it, new profile pic · ♍ measured the salt with tweezers · ♎ garnished the fork · ♏ secret
//              ingredient, won't say · ♐ "a pinch" = the whole jar · ♑ worked out the cost per bite · ♒ swapped every
//              ingredient, now it's soup? · ♓ chopped one onion, sobbed about life
//  49.2        "Twelve chefs. | *Zero recipes.*"
//  52.4        LESSON: "Best recipe? | Eating it *together.*"  TABLE FOR 12
//  58.3        "Pizza night? | *Pizza night.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#ffd23a', L = { x: -160 }, R = { x: 160 }
const PAN = ['..KKKKKKKK..........', '.KbbbbbbbbK.........', 'KbbbBBBbbbbKHHHHHHHH', 'KbbBBBBBbbbKHHHHHHHH', '.KbbbbbbbbK.........', '..KKKKKKKK..........']
const PLATE = ['..WWWWWWWW..', '.WWwwwwwwWW.', 'WWwwwwwwwwWW', '.WWwwwwwwWW.', '..WWWWWWWW..']
const POT = ['.KK......KK.', 'KKKKKKKKKKKK', 'GGGGGGGGGGGG', 'GgGGGGGGGGgG', 'GGGGGGGGGGGG', 'GGGGGGGGGGGG', 'GgGGGGGGGGgG', '.GGGGGGGGGG.']
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '..W..', '..W..', '..W..', '..W..', '..W..']
const PARSLEY = ['.G.G.', 'GGGGG', '.GgG.', '..g..']
const JAR = ['.KKKKK.', '.LLLLL.', 'JJJJJJJ', 'JJJJJJJ', 'JJJJJJJ', 'JJJJJJJ', 'JJJJJJJ', '.JJJJJ.']
const SPICE = ['..KK..', '.RRRR.', 'RRRRRR', 'RWWWWR', 'RRRRRR', 'RRRRRR', '.RRRR.']
const BOWL = ['WWWWWWWWWWWW', 'WSSSSSSSSSSW', '.WSSSSSSSSW.', '..WWWWWWWW..']
const ONION = ['...G...', '..GG...', '.PPPP..', 'PPpPPP.', 'PPPpPP.', 'PPPPPP.', '.PPPP..']
const PIZZA = ['.....YY.....', '....YRYY....', '...YYYYRY...', '..YRYYYYYY..', '.YYYYRYYRYY.', 'BBBBBBBBBBBB']
const TWEEZ = ['G.......G', '.G.....G.', '..G...G..', '...G.G...', '....G....']

const CAMEOS = [
  { sign: 'aries', cap: 'Max heat. | *Called it “seared.”*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PAN, { K: INK, b: '#2a2350', B: lt > 0.8 ? '#3a2418' : '#e0a060', H: GREY }, 780, 940, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.7) for (let i = 0; i < 3; i++) { const ph = (lt * 1.5 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = GREY; x.beginPath(); x.arc(740 + i * 50, 880 - ph * 160, 20 + ph * 24, 0, 7); x.fill(); x.restore() }
      label(x, 790, 1110, 'CHEF’S CHOICE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ate it all | *before plating.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM, w: '#e8e0d0' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 4; i++) { x.fillStyle = '#d89a4a'; x.fillRect(740 + i * 30, 950 + (i % 2) * 8, 8, 8) }
      label(x, 790, 700, 'TASTE TEST: DONE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two recipes. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 30 },
    front(x, t, lt, P) {
      card(x, 300, 760, 200, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.1 }, () => { txt(x, 'PASTA', 0, -45, { size: 28, font: MONO, weight: 700 }); x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-70, -5 + i * 28, 140, 8) })
      card(x, 780, 760, 200, 170, pop01(t, P.t0 + 0.4, 0.35, 2), { bg: CREAM, rot: 0.1 }, () => { txt(x, 'CAKE', 0, -45, { size: 28, font: MONO, weight: 700 }); x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-70, -5 + i * 28, 140, 8) })
      label(x, 540, 1130, 'PASTA CAKE?!', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'cancer', cap: 'Cooked for two. | *Fed the whole street.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.2) / 0.35) + 1)
      for (let i = 0; i < n; i++) drawBits(x, POT, { K: INK, G: [SKYB, PINK, MINT][i], g: CREAM }, 790 + (i % 2 ? 20 : -20), 1060 - i * 120, 16)
      label(x, 790, 640, 'LEFTOVERS: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Plated it. | *New profile pic.*', mood: 'sparkle', look: [1, 0], star: L, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        txt(x, 'MY PROFILE', 0, -130, { size: 22, font: MONO, weight: 700, color: GOLD })
        drawBits(x, PLATE, { W: CREAM, w: '#e8e0d0' }, 0, 10, 14)
        x.fillStyle = '#c9572e'; x.fillRect(-20, -2, 40, 18); x.fillStyle = GREEN; x.fillRect(-6, -10, 12, 8)
        if (lt > 1.0) { const k = pop01(lt, 1.0, 0.3, 2.2); x.save(); x.translate(0, 100); x.scale(k, k); x.fillStyle = PINK; x.fillRect(-80, -22, 160, 44); txt(x, '♥ 1 new match', 0, 0, { size: 22 }); x.restore() }
      })
      if (lt > 0.6 && lt < 0.8) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(560, 480, 420, 760) }
    } },
  { sign: 'virgo', cap: 'Measured the salt | *with tweezers.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, TWEEZ, { G: GREY }, 790, 820, 24 * k, { rot: Math.PI })
      if (k > 0.5) { x.fillStyle = '#fff'; x.fillRect(786, 920, 10, 10) }
      label(x, 790, 1060, 'GRAINS: 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'maybe 2.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Garnished everything. | *Even the fork.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, FORK, { W: '#d8dbe8' }, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.15 })
      for (let i = 0; i < 3; i++) drawBits(x, PARSLEY, { G: GREEN, g: '#3a9a48' }, 760 + i * 30, 840 + i * 12, 12 * pop01(t, P.t0 + 0.7 + i * 0.2, 0.3, 2.4))
      label(x, 790, 1140, 'GORGEOUS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Secret ingredient. | *Won’t say. Ever.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, JAR, { K: INK, L: GREY, J: '#6a2a6e' }, 790, 920, 26 * k)
      if (k > 0.5) { x.fillStyle = GOLD; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 790, 950) }
      label(x, 790, 1150, 'CLASSIFIED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Recipe said “a pinch.” | *Used the whole jar.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [-1, 0], star: R, hops: [1.3],
    front(x, t, lt, P) {
      const tip = ease.inOutCubic(prog(lt, 0.4, 0.8))
      drawBits(x, SPICE, { K: INK, R: RED, W: CREAM }, 320, 820, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.PI * 0.75 * tip })
      const pile = clamp((lt - 0.7) / 1.0)
      if (pile > 0) { x.fillStyle = '#e04a2a'; x.beginPath(); x.moveTo(320 - 140 * pile, 1080); x.lineTo(320, 1080 - 120 * pile); x.lineTo(320 + 140 * pile, 1080); x.fill() }
      label(x, 320, 1140, 'A BIG PINCH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Worked out the cost | *per bite.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 320, 880, 300, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'PER BITE', 0, -120, { size: 28, font: MONO, weight: 700 })
        x.fillStyle = GREY; for (let i = 0; i < 4; i++) if (lt > 0.4 + i * 0.2) x.fillRect(-110, -70 + i * 40, 220 - (i % 2) * 60, 10)
        if (lt > 1.3) txt(x, 'GOOD DEAL', 0, 110, { size: 32, color: GREEN })
      })
    } },
  { sign: 'aquarius', cap: 'Swapped every ingredient. | *Now it’s soup?*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { W: CREAM, S: '#7dffb0' }, 790, 960, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 700, 'was it cake?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bc' })
      label(x, 790, 1120, 'INNOVATION', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 38, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Chopped one onion. | *Sobbed about life.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, ONION, { G: GREEN, P: '#c97bff', p: '#e8c4ff' }, 790, 940, 22 * k)
      label(x, 790, 1120, 'FEELINGS: CHOPPED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0189', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Zodiacs trying | a recipe *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve chefs. | *Zero recipes.*' },
  lesson: { text: 'Best recipe? | Eating it *together.*', chip: 'TABLE FOR 12' },
  last: {
    text: 'Pizza night? | *Pizza night.*',
    draw(x, t, lt) { drawBits(x, PIZZA, { Y: GOLD, R: RED, B: '#c98f4a' }, 540, 740, 24 * pop01(t, t - lt + 0.6, 0.45, 2)); sparkles(x, t, 540, 740, t - lt + 1.0, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
