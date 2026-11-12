// r2a0189: star_advice, ADVICE ROLL CALL, "What each sign | needs in a hard season." (~57 s vertical, signs3kit social
// cut, music: lofi · E). Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: callback.
//   0.0–3.6    "In a hard season, | *each sign needs…*" (the topic, reordered to fit two lines)
//   3.6–49.2   ♈ a finish line they can see · ♉ something cosy, no rushing (a mug of tea) · ♊ someone to talk it all out with
//              · ♋ a meal someone else made · ♌ reminders they still shine (sticky notes) · ♍ permission not to fix
//              everything (toolbox: closed) · ♎ quiet and pretty light · ♏ one person who gets the whole story
//              · ♐ a tiny adventure, even a new street · ♑ a day off that's actually off · ♒ space to be weird, still loved
//              · ♓ a good cry and a better hug
//  49.2        "Hard seasons pass. | *Your people stay.*"
//  52.6        CALLBACK: "The tea’s still warm. | *Take your time.*"  Taurus is back with the mug.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#c9a6ff', L = { x: -160 }, R = { x: 160 }
const FLAG = ['KCWCWCW', 'KWCWCWC', 'KCWCWCW', 'KWCWCWC', 'K......', 'K......', 'K......', 'K......', 'K......']
const MUG = ['.MMMMMMM...', 'MMMMMMMMMM.', 'MTTTTTTTMMM', 'MTTTTTTTM.M', 'MTTTTTTTM.M', 'MTTTTTTTMMM', 'MMMMMMMMM..', '.MMMMMMM...']
const MUG_C = { M: PINK, T: '#c98f4a' }
const DISH = ['.....KK.....', '...GGGGGG...', '.GGGGGGGGGG.', 'GGgGGGGGGGGG', 'GGGGGGGGGGGG', 'WWWWWWWWWWWW']
const TOOLBOX = ['...RRRRRR...', '...R....R...', 'RRRRRRRRRRRR', 'RrrrrrrrrrrR', 'RrrrrGGrrrrR', 'RrrrrrrrrrrR', 'RRRRRRRRRRRR']
const DIARY = ['PPPPPPPPPP', 'PppppppppP', 'PpHHpHHppP', 'PpHHHHHppP', 'PppHHHpppP', 'PpppHppppP', 'PPPPPPPPPP']
const LAPTOP = ['..GGGGGGGGGG..', '..GSSSSSSSSG..', '..GSSSSSSSSG..', '..GSSSSSSSSG..', '..GGGGGGGGGG..', 'GGGGGGGGGGGGGG']
const UFO = ['.....GGG.....', '....GGGGG....', '..SSSSSSSSS..', 'SSYSSYSSYSSYS', '..SSSSSSSSS..', '....L...L....']
const PIN = ['.RRR.', 'RRRRR', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']

function steam(x, t, cx, cy) {
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); x.fillStyle = CREAM; x.fillRect(cx - 30 + i * 30 + Math.sin(ph * 8 + i) * 8, cy - ph * 120, 10, 26); x.restore() }
}
function friend(x, t, P, id, cx, cy, at, s = 200, mood = 'happy', look = [-1, 0]) {
  const k = pop01(t, P.t0 + at, 0.4, 2)
  if (k > 0.01) return signChar(x, t, id, cx, cy, s * k, { mood, look, seed: 13, glyph: false, hops: [P.t0 + at + 0.6] })
}

const CAMEOS = [
  { sign: 'aries', cap: 'A finish line | *they can actually see.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, C: INK, W: CREAM }, 820, 890, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 4) * 0.04 })
      label(x, 790, 1120, 'ALMOST THERE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Something cosy. | *And no rushing.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MUG, MUG_C, 790, 950, 22 * k)
      if (k > 0.8) steam(x, t, 770, 830)
      label(x, 790, 1130, 'NO RUSH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone to talk | *it all out with.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const B = [['so anyway…', 0.2], ['AND another', 0.6], ['thing…', 0.9]]
      B.forEach(([s, at], i) => bubble(x, 780 + (i % 2) * 30, 640 + i * 110, s, pop01(t, P.t0 + at, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bl' }))
      friend(x, t, P, 'cancer', 820, 1060, 1.1, 170, lt > 1.5 ? 'heart' : 'happy')
    } },
  { sign: 'cancer', cap: 'A warm meal | *someone else made.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const s = ease.outCubic(prog(lt, 0.2, 0.9))
      drawBits(x, DISH, { K: INK, G: GREY, g: '#d8dbe8', W: CREAM }, lerp(1100, 800, s), 950, 22)
      if (s > 0.9) steam(x, t, 800, 860)
      label(x, 790, 680, 'FOR YOU ♥', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Reminders that | *they still shine.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const N = [['still', GOLD, 700, 700, -0.08], ['iconic', PINK, 870, 760, 0.07], ['so proud', MINT, 720, 900, 0.05], ['you glow', SKYB, 880, 960, -0.06]]
      N.forEach(([s, c, cx, cy, r], i) => card(x, cx, cy, 180, 140, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2), { bg: c, rot: r }, () => txt(x, s, 0, 2, { size: 34 })))
      sparkles(x, t, 400, 860, P.t0 + 1.6, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Permission | *not to fix everything.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX, { R: RED, r: '#ff8a7a', G: GOLD }, 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'CLOSED TODAY', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Some quiet. | *And pretty light.*', mood: 'heart', look: [1, -1], star: L,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.0) * 9)
      x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let i = 0; i <= 8; i++) { const px = 620 + i * 45, py = 640 + Math.sin(i / 8 * Math.PI) * 70; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
      for (let i = 0; i < n; i++) { const px = 620 + i * 45, py = 652 + Math.sin(i / 8 * Math.PI) * 70; x.save(); x.globalAlpha = 0.7 + 0.3 * Math.sin(t * 4 + i); x.fillStyle = [GOLD, PINK, MINT, SKYB][i % 4]; x.beginPath(); x.arc(px, py, 14, 0, 7); x.fill(); x.restore() }
      label(x, 790, 1110, 'SHH. NICE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'One person who | *gets the whole story.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, DIARY, { P: '#6a2a6e', p: '#8a3a8e', H: lt > 1.2 ? PINK : GREY }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'TRUSTED: 1', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: PURPLE, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.2) hearts(x, t, 790, 820, P.t0 + 1.2, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: 'sagittarius', cap: 'A tiny adventure. | *Even a new street.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], star: R, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      card(x, 320, 860, 300, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#e8d8b0', rot: -0.04 }, () => {
        x.strokeStyle = GREY; x.lineWidth = 14; x.beginPath(); x.moveTo(-150, 40); x.lineTo(150, 40); x.moveTo(-40, -130); x.lineTo(-40, 130); x.stroke()
        x.setLineDash([10, 10]); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-40, 120); x.lineTo(-40, 40); x.lineTo(90 * clamp((lt - 0.5) / 0.8), 40); x.stroke(); x.setLineDash([])
        if (lt > 1.3) drawBits(x, PIN, { R: RED, W: CREAM }, 90, 10, 9)
      })
      label(x, 320, 1110, 'NEW STREET!', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A day off | *that’s actually off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.6, 1.0))
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, LAPTOP, { G: GREY, S: lerp(0, 1, shut) > 0.5 ? '#2a2350' : SKYB }, 320, 940, 20 * k, { sy: 1 - 0.0 * shut })
      label(x, 320, 700, 'OUT OF OFFICE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Space to be weird. | *And still loved.*', mood: 'sparkle', look: [1, -1], star: L,
    front(x, t, lt, P) {
      drawBits(x, UFO, { G: '#8fe3ff', S: GREY, Y: GOLD, L: MINT }, 790, 820 + Math.sin(t * 3) * 14, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.06 })
      hearts(x, t, 790, 980, P.t0 + 0.9, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
      label(x, 790, 1120, 'LOVED ANYWAY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'A good cry. | *And a better hug.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', tears: lt => lt < 1.4 ? 3 : 2, look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.5, 1.2))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(900, 680, k), 900, 220, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false })
      if (k > 0.9) hearts(x, t, 560, 760, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0189', key: 'E', accent: ACC, ending: 'callback',
  title: 'In a hard season, | *each sign needs…*',
  cameos: CAMEOS,
  group: { cap: 'Hard seasons pass. | *Your people stay.*' },
  last: {
    text: 'The tea’s still warm. | *Take your time.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 2)
      drawBits(x, MUG, MUG_C, 620, 1140, 30 * k)
      if (k > 0.8) steam(x, t, 590, 990)
      const s = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 300, 1150, 210 * s, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 47, hops: [t - lt + 1.5] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
