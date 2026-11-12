// r2a0441: star_advice, ADVICE SOLO, "Making friends | *with a Libra.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Libra truth + a warm reframe, one light gag each.
// Ending: lesson (lesson beat + last line).
//   0.0–3.6    hook
//   3.6–37.8   compliment their taste · pick the restaurant (the menu keeps flipping) · ask their sign (compatible)
//              · they hate drama: bring calm (rain cloud → sun) · they know they look cute, say it anyway (mirror)
//              · fairness matters: split dessert even (balance scale) · they draft replies forever (draft 14)
//              · plan something pretty (picnic) · they love everyone, love them back
//  37.8        "Charming. | *Loyal, too.*"
//  41.0        LESSON: "Be gentle. Be sure. | They’ll *adore you.*"  FRIENDSHIP: BALANCED
//  46.9        "Best friend? | They picked *you.* Finally."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const ROSE = '#ff9cc8', CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4', WOOD = '#c98f5a'

/** a paper card with a coloured header and rows [text, k] */
function sheet(x, cx, cy, k, { w = 330, h = 360, head = '', headCol = ROSE, rows = [], rot = 0.04, size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 62); x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 32) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 24, -h / 2 + (head ? 62 : 0) + 46 + i * (size + 20)); x.restore() })
  x.restore()
}
/** a phone with message bubbles [text, colour, k, right?] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
/** a small profile card with a sign star in it */
function profile(x, t, cx, cy, k, id, glyph, col, { rot = 0, mood = 'happy', seed = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -126, 212, 268)
  x.fillStyle = INK; x.fillRect(-112, -138, 224, 276)
  x.fillStyle = '#140c30'; x.fillRect(-104, -130, 208, 260)
  x.fillStyle = col; x.fillRect(-104, 70, 208, 60)
  x.fillStyle = INK; x.font = `700 50px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(glyph + '︎', 0, 102)
  x.restore()
  signChar(x, t, id, cx, cy - 30 * k, 130 * k, { mood, seed, glyph: false, glow: 0.5 })
}
const CLOUD = ['...WWWW.....', '..WWWWWWW...', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const SUN = ['...Y..Y...', 'Y...YY...Y', '...YYYY...', '.YYYYYYYY.', 'YYYYWYYYYY', 'YYYYYYYYYY', '.YYYYYYYY.', '...YYYY...', 'Y...YY...Y', '...Y..Y...']
const MIRROR = ['..FFFFFFF..', '.FFGGGGGFF.', 'FFGGGGGGGFF', 'FGGGGGGGGGF', 'FGGGGGGGGGF', 'FGGGGGGGGGF', 'FGGGGGGGGGF', 'FGGGGGGGGGF', 'FFGGGGGGGFF', '.FFGGGGGFF.', '..FFFFFFF..', '.....F.....', '....FFF....']
const MIRROR_C = { F: GOLD, G: '#bfe8ff' }
const CAKE = ['..PPPP', '.PWPWP', 'PPPPPP', 'BBBBBB', 'BBBBBB', 'KKKKKK']
const CAKE_C = { P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
const VASE = ['.R.P.R.', 'RRPPPRR', '.RPYPR.', '..GGG..', '...G...', '..GGG..', '.BBBBB.', '.BWBBB.', '.BBBBB.', '..BBB..']
const VASE_C = { R: '#ff6b8a', P: ROSE, Y: GOLD, G: '#5fd068', B: SKYB, W: '#e8f8ff' }
const BASKET = ['...KKKKKK...', '..K......K..', '.K........K.', 'WWWWWWWWWWWW', 'WBWBWBWBWBWB', 'BWBWBWBWBWBW', 'WBWBWBWBWBWB', '.WWWWWWWWWW.']
const BASKET_C = { K: '#8a4a2e', W: '#e0a050', B: '#c98f5a' }
const FLOWER = ['.P.', 'PYP', '.P.', '.G.', '.G.']

/** a balance scale: two pans, level at the end */
function scale(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.32 * (1 - ease.outCubic(prog(lt, 0.7, 1.4))) * Math.cos(lt * 5)
  x.save(); x.translate(cx, cy); x.scale(k * 0.85, k * 0.85)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 290); x.fillRect(-90, 130, 180, 30)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 278); x.fillRect(-84, 134, 168, 22)
  x.save(); x.translate(0, -140); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -10, 340, 20); x.fillStyle = GOLD; x.fillRect(-166, -6, 332, 12)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 150, 0); x.rotate(-tilt)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-56, 110); x.moveTo(0, 0); x.lineTo(56, 110); x.stroke()
    x.fillStyle = INK; x.fillRect(-72, 106, 144, 18); x.fillStyle = GOLD; x.fillRect(-68, 108, 136, 12)
    drawBits(x, CAKE, CAKE_C, 0, 80, 10, { sx: s })
    x.restore()
  }
  x.restore(); x.restore()
}

const S = 'libra'
const CAMEOS = [
  { sign: S, cap: 'Compliment their taste. | *They’ll remember forever.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, VASE, VASE_C, 790, 880, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 610, 'who arranged | these?!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 790, 1140, 'TASTE: FLAWLESS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.2, 7, 190, 0.3)
    } },
  { sign: S, cap: 'Pick the restaurant. | *They’ll be so relieved.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const opts = ['tacos?', 'sushi?', 'pasta?', 'tacos??']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.28))
      sheet(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'TONIGHT', rows: lt < 1.3 ? [[opts[n]]] : [['you picked:'], ['pasta ✓', 1, '#2f9a5a']], h: 300 })
      label(x, 790, 1100, 'DECIDED. PHEW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ask their sign. | *They’ll ask yours back.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      profile(x, t, 680, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'libra', '♎', ROSE, { rot: -0.06, mood: 'happy', seed: 31 })
      profile(x, t, 860, 880, pop01(t, P.t0 + 0.6, 0.3, 2), 'gemini', '♊', GOLD, { rot: 0.06, mood: 'wink', seed: 32 })
      label(x, 790, 1110, 'COMPATIBLE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They hate drama. | *Bring the calm.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), sun = lt > 1.2
      if (!sun) {
        drawBits(x, CLOUD, { W: '#8a8aa0' }, 790, 760, 22 * k)
        for (let i = 0; i < 6; i++) { const ph = (t * 1.5 + i / 6) % 1; x.fillStyle = SKYB; x.fillRect(700 + i * 34, 820 + ph * 200, 8, 22) }
      } else {
        const s = pop01(t, P.t0 + 1.2 * 3.1 / 2.4, 0.35, 2)
        drawBits(x, SUN, { Y: GOLD, W: '#fff6c8' }, 790, 800, 22 * s, { rot: t * 0.3 })
      }
      label(x, 790, 1100, sun ? 'FORECAST: PEACE' : 'FORECAST: DRAMA', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: sun ? GOLD : SLATE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They know they look cute. | *Say it anyway.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MIRROR, MIRROR_C, 800, 880, 30 * k)
      if (k > 0.6) signChar(x, t, 'libra', 800, 840, 150, { mood: 'wink', seed: 51, glyph: false, glow: 0.4, alpha: 0.85 })
      bubble(x, 790, 600, 'you look great!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 420, 640, 'I know ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: ROSE, tail: 'bc' })
    } },
  { sign: S, cap: 'Fairness matters to them. | *Split it even.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scale(x, t, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1150, 'PERFECTLY FAIR ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They draft texts forever. | *Be patient.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const d = 1 + Math.floor(clamp((lt - 0.3) / 1.0) * 13)
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), { head: lt < 1.4 ? `DRAFT ${d}…` : 'SENT ✓', headCol: lt < 1.4 ? SLATE : MINT, lines: [
        ['hey!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true],
        [lt < 1.4 ? 'hii :)' : 'heyyy ♡', ROSE, pop01(t, P.t0 + 0.6, 0.25, 2.2)],
        ['worth it', GOLD, pop01(t, P.t0 + 2.0, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Plan something pretty. | *They’ll bring flowers.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 1080); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-196, -36, 392, 92)
        for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? RED : CREAM; x.fillRect(-190 + i * 47.5, -30 + j * 40, 47.5, 40) }
        x.restore()
      }
      drawBits(x, BASKET, BASKET_C, 740, 960, 18 * k)
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.7) / 0.18))
      for (let i = 0; i < n; i++) drawBits(x, FLOWER, { P: [ROSE, LAV, GOLD, '#ff6b8a'][i], Y: GOLD, G: '#5fd068' }, 860 + i * 28, 930 - (i % 2) * 30, 14)
      label(x, 790, 650, 'PICNIC: CURATED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They love everyone. | *Love them back.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;[['leo', 700, 820], ['aquarius', 860, 800], ['cancer', 780, 1000]].forEach(([id, px, py], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 40 + i, glyph: false, hops: [P.t0 + 1.5 + i * 0.1] })
      })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 7, life: 1.8, spread: 300, cell: 8, seed: 6 })
      label(x, 790, 1150, 'FRIENDS: ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0441', key: 'D', accent: ROSE, solo: S, ending: 'lesson',
  title: 'Making friends | *with a Libra.*',
  cameos: CAMEOS,
  group: { cap: 'Charming. | *Loyal, too.*', mood: 'heart' },
  lesson: { text: 'Be gentle. Be sure. | They’ll *adore you.*', chip: 'FRIENDSHIP: BALANCED' },
  last: { text: 'Best friend? | They picked *you.* Finally.' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
