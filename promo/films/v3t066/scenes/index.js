// v3t066: THE SIGNS AS… v3, "Party of strangers? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order at a party where they know no one, each pushed to the extreme; callback ending.
//   0.0–3.6    "Party of strangers? | Zodiacs *be like.*"
//   3.6–49.2   ♈ knew no one, now hosting · ♉ found the snacks, never left · ♊ twelve friends, no names · ♋ did the
//              host's mum's dishes · ♌ is the dance circle · ♍ sorted the coats by colour · ♎ complimented everyone twice
//              · ♏ stood in a corner, everyone came to them · ♐ the plus-one they met at the door · ♑ three new clients
//              · ♒ debated a stranger about dinosaurs · ♓ cried at goodbye
//  49.2        "Strangers? | Not *anymore.*"
//  52.6        callback: "Party’s over. | Taurus *didn’t leave.*" (the snack table, paid off)
import {
  makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { paper, readout, bits, B, clamp, prog, ease, lerp, RED, ORANGE, CREAM, GREY, DEEP, NIGHT, GREEN } from './props.js'

const ACC = GOLD
const PLATE = ['.WWWWWWWW.', 'WWWWWWWWWW', '.WWWWWWWW.']

const CAMEOS = [
  { sign: 'aries', cap: 'Knew no one. | *Now hosting.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      label(x, 790, 700, 'HOST: ARIES', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: '#f0603a', color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'welcome, | everyone!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'REAL HOST: ???', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the snacks. | *Never left.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const h = Math.floor(clamp((lt - 0.5) / 1.5) * 4) + 1
      label(x, 790, 680, `HOUR ${h} AT THE TABLE`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'this is | my spot now', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Made twelve friends. | *Forgot every name.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.22, 0.3, 2)
        paper(x, 700 + (i % 2) * 190, 760 + Math.floor(i / 2) * 230, k, { w: 170, h: 150, rot: (i % 2 ? 0.06 : -0.05), head: 'HELLO', headBg: '#f2cf4a', headColor: INK, lines: [lt > 1.2 ? '???' : ['SAM', 'JO', 'AL', 'MO'][i]], size: 30, top: 0 })
      }
      bubble(x, 790, 600, 'hey… you!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Found the host’s mom. | Did *the dishes.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 820, 190 * k, { mood: 'heart', look: [-1, 0], seed: 12, glyph: false })
      const n = Math.floor(clamp((lt - 0.6) / 1.2) * 6)
      for (let i = 0; i < n; i++) drawBits(x, PLATE, { W: CREAM }, 640, 1110 - i * 26, 14)
      bubble(x, 830, 640, 'such a sweetie!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 850, 1060, 'INVITED: XMAS', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Started a dance circle. | *Is* the circle.', mood: 'sparkle', star: { x: 0, y: -20 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.7))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.strokeStyle = GOLD; x.lineWidth = 8; x.setLineDash([22, 16]); x.lineDashOffset = -t * 60
      x.beginPath(); x.ellipse(540, 880, 260 * k, 230 * k, 0, 0, Math.PI * 2); x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      notes(x, t, 540, 700, { n: 5, cell: 7, col: '#f39a3a', seed: 3 })
      label(x, 540, 1160, 'CIRCLE SIZE: 1', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: '#f39a3a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Sorted the coat pile. | *By color.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const COLS = [RED, ORANGE, GOLD, MINT, SKYB, LAV]
      const sorted = lt > 1.1
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2)
        const j = sorted ? i : [3, 0, 5, 1, 4, 2][i]
        drawBits(x, B.HOODIE.bm, { H: COLS[j], h: INK }, 680 + (i % 3) * 120, 780 + Math.floor(i / 3) * 160, 12 * k, { rot: sorted ? 0 : Math.sin(i * 3) * 0.3 })
      }
      label(x, 790, 1110, 'RAINBOW ORDER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      if (sorted) sparkles(x, t, 810, 860, P.t0 + 1.15, 7, 200, 0.1)
    } },
  { sign: 'libra', cap: 'Complimented everyone. | *Twice.*', mood: 'sparkle', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'love your | shoes!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 790, 860, 'great laugh!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      bubble(x, 790, 1060, 'love your | shoes! (again)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Stood in a corner. | *Everyone* came to them.', mood: lt => lt > 1.2 ? 'wink' : 'neutral', star: { x: -200, y: -40, s: 260 },
    front(x, t, lt, P) {
      const IDS = ['gemini', 'libra', 'leo', 'pisces', 'aries']
      IDS.forEach((id, i) => {
        const d = ease.outCubic(prog(lt, 0.4 + i * 0.18, 0.9 + i * 0.18))
        if (d <= 0) return
        const tx = 520 + (i % 3) * 150, ty = 820 + Math.floor(i / 3) * 190 + (i % 2) * 40
        signChar(x, t, id, lerp(1000, tx, d), ty, 140, { mood: 'heart', look: [-1, 0], seed: 30 + i, glyph: false, tears: id === 'pisces' ? 1 : 0 })
      })
      label(x, 330, 1130, 'CORNER: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: '#e23d66', color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brought a plus-one. | *Met them at the door.*', mood: 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'DOOR', 860, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 660, 960, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 700, 640, 'my oldest | friend!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 760, 1140, 'KNOWN: 4 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#a35cf0', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Came for fun. | Left with *three clients.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.3) * 3)
      readout(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), `CLIENTS: ${n}`, { size: 52, color: '#2fc79a' })
      bubble(x, 790, 960, 'here’s my | card.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1120, 'FUN: ALSO HAD', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Debated a stranger | about *dinosaurs.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bits(x, 'DINO', 800, 900, 24 * pop01(t, P.t0 + 0.25, 0.3, 2))
      bubble(x, 790, 640, 'birds ARE | dinosaurs.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1120, 'HOUR 2', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Met someone nice. | *Cried* at goodbye.', mood: lt => lt < 1.0 ? 'heart' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 940, 210 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      bubble(x, 800, 660, 'see you | around!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, col: SKYB, tail: 'br' })
      label(x, 800, 1130, 'KNEW THEM: 1 HR', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 640, 900, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3t066', key: 'C', accent: ACC, ending: 'callback',
  title: 'Party of strangers? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strangers? | Not *anymore.*' },
  last: {
    text: 'Party’s over. | Taurus *didn’t leave.*',
    draw(x, t, lt) {
      const t0 = t - lt
      signChar(x, t, 'taurus', 420, 1030, 360 * pop01(t, t0 + 0.3, 0.45, 1.8), { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 1], seed: 4, hops: [t0 + 1.5] })
      bits(x, 'BOWL', 760, 1060, 30 * pop01(t, t0 + 0.6, 0.3, 2))
      label(x, 600, 1290, 'HOUR 6', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 48, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
