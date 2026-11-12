// r2t0443: star_talk, ROLLCALL, "The signs at | *a souvenir shop.*" (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in the gift shop, each the most extreme version of itself. Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–49.2   ♈ bought the first thing, didn't look · ♉ skipped the shop, bought all the fudge · ♊ postcards for everyone, wrote none
//              · ♋ a mug for every relative · ♌ a shirt with their own face · ♍ compared prices in four shops
//              · ♎ two zodiac keychains, forty minutes · ♏ bought a crystal, won't say why · ♐ a snow globe from every trip
//              · ♑ haggled over a fridge magnet · ♒ a tiny spork, calls it art · ♓ cried at a seashell
//  49.2        "Twelve signs. | *One suitcase.*"  (the suitcase can't close: OVERWEIGHT)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', TEAL = '#5fd0c0', BROWN = '#8a4a2e', STEEL = '#c9c9d8'

const FOAM = ['...YY....', '...YY....', '...YY....', '.YYYYYY..', 'YYYYYYYY.', 'YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..RRRRR..', '..RRRRR..', '..RRRRR..']
const FUDGE = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KBWWBBWWBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const POST = ['WWWWWWWWWWWW', 'WWWWWWWWWSSW', 'WLLLLLWWWSSW', 'WWWWWWWWWWWW', 'WLLLLWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW']
const MUG = ['WWWWWW..', 'WWWWWWWW', 'WWWWWW.W', 'WWWWWW.W', 'WWWWWWWW', '.WWWW...']
const SHIRT = ['KK....KK', 'KKKKKKKK', 'KKKKKKKK', '.KKKKKK.', '.KKKKKK.', '.KKKKKK.', '.KKKKKK.']
const CRYSTAL = ['...P...', '..PLP..', '.PPLPP.', '.PPLPP.', 'PPPLPPP', 'PPPLPPP', '.PPPPP.', '..PPP..']
const GLOBE = ['..BBBBB..', '.BWBBBBB.', 'BBBBBWBBB', 'BBWBGBBBB', 'BBBGGGBWB', '.BGGGGGB.', '..BBBBB..', '.KKKKKKK.', 'KKKKKKKKK']
const SPORK = ['W.W.W', 'WWWWW', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..']
const SHELL = ['....P....', '..PPPPP..', '.PWPWPWP.', 'PWPWPWPWP', 'PWPWPWPWP', '.PWPWPWP.', '..PPPPP..', '...PPP...']
const CASE = ['...HHHH...', '...H..H...', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BYBBBBBBYB', 'BBBBBBBBBB']

function sheet(x, cx, cy, k, { w = 340, h = 360, head = '', headCol = GOLD, rows = [], rot = 0.04, size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, kk = 1, col = INK], i) => { if (kk <= 0.01) return; x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore() })
  x.restore()
}
/** a hanging keychain: ring, chain and a coloured tag with a glyph */
function keychain(x, cx, cy, k, glyph, col, swing, hi) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(swing); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(0, -150, 26, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = STEEL; x.lineWidth = 6; x.beginPath(); x.arc(0, -150, 26, 0, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.fillRect(-5, -124, 10, 70)
  x.fillStyle = INK; x.fillRect(-66, -60, 132, 150); x.fillStyle = col; x.fillRect(-60, -54, 120, 138)
  if (hi) { x.strokeStyle = GOLD; x.lineWidth = 8; x.strokeRect(-74, -68, 148, 166) }
  x.fillStyle = INK; x.font = `700 80px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(glyph + '︎', 0, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Bought the first thing. | *Didn’t look.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4],
    front(x, t, lt, P) {
      drawBits(x, FOAM, { Y: GOLD, R: RED }, 790, 900, 26 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.1 })
      label(x, 790, 650, 'CHECKOUT: 0.4 SEC', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 32, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1140, 'wait… what is it?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Skipped the shop. | Bought *all the fudge.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(7, Math.floor(Math.max(0, lt - 0.2) / 0.15))
      for (let i = 0; i < n; i++) drawBits(x, FUDGE, { K: INK, B: BROWN, W: CREAM }, 790 + (i % 2 ? 8 : -8), 1120 - i * 60, 18)
      label(x, 790, 610, 'FUDGE: ALL OF IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Postcards for everyone. | *Wrote none.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.2) / 0.16))
      for (let i = 0; i < n; i++) drawBits(x, POST, { L: '#c8c0b0', W: CREAM, S: [RED, SKYB, MINT, PINK, GOLD][i] }, 700 + i * 30, 760 + i * 70, 18, { rot: -0.2 + i * 0.09 })
      label(x, 790, 1140, 'SENT: 0 · BOUGHT: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'A mug | for *every relative.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const N = ['MOM', 'GRAN', 'AUNT', 'BFF', 'MAIL', 'DOG']
      N.forEach((s, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.16, 0.3, 2)
        if (k <= 0.01) return
        const mx = 680 + (i % 3) * 115, my = 790 + Math.floor(i / 3) * 160
        drawBits(x, MUG, { W: CREAM }, mx, my, 15 * k)
        x.fillStyle = INK; x.font = `700 ${Math.round(26 * k)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, mx - 8, my)
      })
      label(x, 790, 1120, 'SUITCASE: MUGS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A souvenir shirt | with *their own face.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SHIRT, { K: CREAM }, 790, 900, 40 * k)
      if (k > 0.6) signChar(x, t, 'leo', 790, 920, 150, { mood: 'wink', seed: 71, glyph: false, glow: 0.4 })
      label(x, 790, 650, 'ICONIC. (THEIR WORD)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Compared prices | in *four shops.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'MAGNET PRICES', headCol: MINT, size: 32, rows: [
        ['shop A  3.00', pop01(t, P.t0 + 0.4, 0.2, 2)], ['shop B  2.95', pop01(t, P.t0 + 0.7, 0.2, 2)], ['shop C  3.10', pop01(t, P.t0 + 1.0, 0.2, 2)], ['shop D  2.90 ✓', pop01(t, P.t0 + 1.3, 0.2, 2), '#2f9a5a'],
      ] })
    } },
  { sign: 'libra', cap: 'Two keychains. | *Forty minutes.*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const pick = Math.sin(lt * 4) > 0
      keychain(x, 690, 900, pop01(t, P.t0 + 0.15, 0.3, 2), '♎', PINK, Math.sin(t * 2) * 0.08, !pick)
      keychain(x, 890, 900, pop01(t, P.t0 + 0.3, 0.3, 2), '♊', GOLD, Math.sin(t * 2 + 1) * 0.08, pick)
      label(x, 790, 1150, `MINUTE ${Math.min(40, 1 + Math.floor(lt * 17))}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Bought a crystal. | *Won’t say why.*', mood: lt => lt > 1.1 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CRYSTAL, { P: '#b07bff', L: '#e0c8ff' }, 790, 900, 30 * pop01(t, P.t0 + 0.15, 0.3, 2))
      sparkles(x, t, 790, 900, P.t0 + 0.9, 6, 160, 0.4, ['#e0c8ff', BONE, LAV])
      label(x, 790, 650, 'REASONS: PRIVATE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A snow globe | from *every trip.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.16))
      const C = ['#5fd068', '#ffd23a', '#ff8fb1', '#8fe3ff', '#ff9a4a', '#c97bff']
      for (let i = 0; i < n; i++) drawBits(x, GLOBE, { B: '#bfe8ff', W: '#ffffff', G: C[i], K: BROWN }, 690 + (i % 3) * 100, 860 + Math.floor(i / 3) * 130, 11)
      label(x, 790, 1130, 'SHELF NUMBER 4', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Haggled over | a *fridge magnet.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 900); x.rotate(-0.06); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -80, 220, 160); x.fillStyle = TEAL; x.fillRect(-102, -72, 204, 144); x.fillStyle = INK; x.font = `700 90px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♑︎', 0, 4); x.restore() }
      label(x, 790, 680, lt < 1.2 ? 'PRICE: 3.00' : 'DEAL: 2.75', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: lt < 1.2 ? BONE : MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'final offer.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'A tiny spork. | Calls it *art.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 1060); x.scale(k, k); x.fillStyle = INK; x.fillRect(-90, -20, 180, 140); x.fillStyle = CREAM; x.fillRect(-82, -12, 164, 124); x.restore() }
      drawBits(x, SPORK, { W: STEEL }, 790, 920, 20 * k)
      label(x, 790, 660, 'EXHIBIT A', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 920, P.t0 + 1.0, 6, 130, 0.3)
    } },
  { sign: 'pisces', cap: 'Cried | at a *seashell.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHELL, { P: '#ffb0c8', W: CREAM }, 790, 960, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 680, 'it was someone’s | HOME!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0443', key: 'G', accent: TEAL, ending: 'group',
  title: 'The signs at | *a souvenir shop.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *One suitcase.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 1.4, 0.35, 2)
      drawBits(x, CASE, { H: BROWN, B: RED, Y: GOLD }, 540, 700, 32 * k, { rot: Math.sin(t * 9) * 0.04 * clamp(lt - 1.8) })
      label(x, 540, 880, 'OVERWEIGHT', pop01(t, t0 + 2.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
