// r2t0187: star_talk SOLO (Libra), "Libras on a day off | be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// Nine day-off situations, each the most extreme (and lovable) Libra version. Ending: lesson.
//   0.0–3.6    "Libras on a day off | *be like.*"
//   3.6–37.8   nap or brunch? still choosing since 9 · moved the sofa three times · a full spa production
//              · "quiet day" → hosted nine people · mediated two pigeons · four outfits, never left the couch
//              · compatibility check with the houseplant · a mood board for the nap · couldn't pick a movie, the day ended
//  37.8        "Rested? | *Eventually.*"
//  41.0        LESSON: "Pick the movie. | They'll *love you.*"  PEACE: RESTORED
//  46.9        "Next day off? | *Still deciding.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const S = 'libra', ACC = '#ff8fb1', L = { x: -160 }
const SOFA = ['.SSSSSSSSSSSS.', 'SSssssssssssSS', 'SSssssssssssSS', 'SSSSSSSSSSSSSS', 'SSssssssssssSS', 'SSSSSSSSSSSSSS', '.W..........W.']
const CANDLE = ['..F..', '.FYF.', '..Y..', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW']
const CANDLE_C = { F: ORANGE, Y: GOLD, W: CREAM }
const PIGEON = ['...GGG....', '..GGKGG...', '..GGGGGO..', '.GGGGGG...', 'GGgggGGG..', 'GgggggGGG.', '.GgggggGGG', '..GGGGGG..', '...O..O...']
const PIGEON_C = { G: '#9aa5c4', g: '#c4cde4', K: INK, O: ORANGE }
const PLANT = ['...LL.LL...', '..LLLLLLL..', '.LLlLLLlLL.', '..LLLLLLL..', '...LLLLL...', '.PPPPPPPPP.', '.PPKPPPKPP.', '.PPPPPPPPP.', '..PPKKKPP..', '..PPPPPPP..']
const PLANT_C = { L: GREEN, l: MINT, P: '#c9572e', K: INK }
const SHIRT = ['.SS.SS.', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '.SSSSS.']

/** a clock whose hands spin while two options flip */
function clock(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 84 - 4, Math.sin(a) * 84 - 4, 8, 8) }
  const a = lt * 5, b = lt * 0.5
  x.strokeStyle = INK; x.lineWidth = 8; x.lineCap = 'round'
  x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * 76, -Math.cos(a) * 76); x.stroke()
  x.lineWidth = 11; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(b) * 50, -Math.cos(b) * 50); x.stroke()
  x.restore()
}
/** a cork mood board with swatches and a tiny pillow */
function moodBoard(x, cx, cy, k, lt) {
  card(x, cx, cy, 330, 300, k, { bg: '#c98f4a', rot: 0.04 }, () => {
    const SW = [[PINK, -100, -80], [LAV, 0, -90], [MINT, 100, -70], [SKYB, -90, 40], [GOLD, 20, 50], [CREAM, 110, 60]]
    SW.forEach(([c, px, py], i) => { if (lt > 0.3 + i * 0.15) { x.fillStyle = INK; x.fillRect(px - 44, py - 40, 88, 80); x.fillStyle = c; x.fillRect(px - 40, py - 36, 80, 72); x.fillStyle = RED; x.fillRect(px - 5, py - 46, 10, 10) } })
    txt(x, 'NAP: VIBES', 0, 125, { size: 24, font: MONO, weight: 700, color: CREAM })
  })
}
/** a TV with tiles scrolling past, then the moon comes out */
function tv(x, t, cx, cy, k, lt) {
  card(x, cx, cy, 340, 240, k, { bg: '#2a2350', rot: 0.03 }, () => {
    x.fillStyle = DEEP; x.fillRect(-150, -100, 300, 180)
    x.save(); x.beginPath(); x.rect(-150, -100, 300, 180); x.clip()
    const C = [PINK, MINT, SKYB, GOLD, LAV, ORANGE]
    const off = (lt * 260) % 120
    for (let i = -1; i < 4; i++) { x.fillStyle = C[((i + Math.floor(lt * 260 / 120)) % 6 + 6) % 6]; x.fillRect(-150 + i * 120 - off + 120, -70, 100, 120) }
    x.restore()
    x.fillStyle = INK; x.fillRect(-40, 112, 80, 14)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Nap or brunch? | *Deciding since 9am.*', mood: lt => Math.floor(lt * 2) % 2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      clock(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1100, Math.floor(lt * 2.5) % 2 ? 'BRUNCH?' : 'NAP?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 640, 'NOW: 4PM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Moved the sofa. | *Three times.*', mood: lt => lt > 1.7 ? 'sparkle' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45) + 1)
      const pos = [[760, 980, 0], [840, 900, -0.12], [780, 950, 0.1]][n - 1]
      drawBits(x, SOFA, { S: LAV, s: '#e0ccff', W: WOOD }, pos[0], pos[1], 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: pos[2] })
      label(x, 790, 650, `LAYOUT ${n}/3`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Self-care day? | *A full spa production.*', mood: 'happy', star: { x: -40 },
    front(x, t, lt, P, F) {
      if (lt > 0.4) inSprite(x, F, () => { x.fillStyle = '#5fd068'; x.beginPath(); x.arc(13, 19, 4.2, 0, 7); x.arc(23, 19, 4.2, 0, 7); x.fill(); x.fillStyle = '#b8f0a0'; x.beginPath(); x.arc(13, 19, 3, 0, 7); x.arc(23, 19, 3, 0, 7); x.fill() })
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 760 + i * 60, 1040 - (i % 2) * 20, 12 * pop01(t, P.t0 + 0.6 + i * 0.15, 0.3, 2.2))
      label(x, 790, 680, 'DO NOT DISTURB', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said “quiet day.” | *Hosted nine people.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const G = ['aries', 'gemini', 'leo', 'sagittarius', 'aquarius', 'cancer', 'taurus', 'pisces', 'virgo']
      G.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, id, 660 + (i % 3) * 110, 760 + Math.floor(i / 3) * 120, 100 * k, { mood: 'happy', seed: 30 + i, glyph: false, glow: 0.6, tears: id === 'pisces' ? 1 : 0 }) })
      label(x, 770, 1130, 'GUESTS: 9', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mediated a fight | *between two pigeons.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const calm = lt > 1.3
      const jit = calm ? 0 : Math.sin(t * 20) * 6
      drawBits(x, PIGEON, PIGEON_C, 690 + jit, 960, 19 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIGEON, PIGEON_C, 890 - jit, 960, 19 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      if (!calm) bubble(x, 790, 700, 'coo!! COO!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bc' })
      else label(x, 790, 700, 'PEACE TREATY', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      if (calm) hearts(x, t, 790, 880, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Four outfits. | *Never left the couch.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const C = [PINK, MINT, SKYB, GOLD]
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.2) / 0.4) + 1)
      for (let i = 0; i < n; i++) drawBits(x, SHIRT, { S: C[i] }, 700 + (i % 2) * 170, 780 + Math.floor(i / 2) * 190, 18, { rot: (i % 2 ? 0.08 : -0.08) })
      label(x, 790, 1150, `LOOK ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ran a compatibility check | *with the houseplant.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 2) * 0.04 })
      label(x, 790, 650, 'IT’S A MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 700, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Made a mood board | *for the nap.*', mood: lt => lt > 1.6 ? 'sleepy' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      moodBoard(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
    } },
  { sign: S, cap: 'Couldn’t pick a movie. | *The day ended.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tv(x, t, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, lt > 1.5 ? 'GOODNIGHT' : 'STILL SCROLLING', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: lt > 1.5 ? SKYB : PINK, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 650, 'maybe… | that one?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0187', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Libras on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Rested? | *Eventually.*', mood: 'sparkle' },
  lesson: { text: 'Pick the movie. | They’ll *love you.*', chip: 'PEACE: RESTORED' },
  last: {
    text: 'Next day off? | *Still deciding.*',
    draw(x, t, lt) { clock(x, t, 540, 1220, pop01(t, t - lt + 0.5, 0.4, 2), lt * 2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
