// r2t0179: THE SIGNS AS… v3, ROLLCALL, "The signs at | the team lunch." (~57 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs at | *the team lunch.*"
//   3.6–49.2   ♈ ordered before the boss sat down · ♉ finished every bread basket · ♊ sat at three tables in one lunch
//              · ♋ brought cookies for the waiter · ♌ gave a toast nobody asked for · ♍ split the bill to the cent
//              · ♎ still on the menu when dessert arrived · ♏ guessed everyone's rising sign · ♐ turned lunch into a field
//              trip · ♑ expensed the napkins, itemised · ♒ ordered off-menu, it worked · ♓ cried at a stranger's birthday song
//  49.2        "One hour. | *Twelve stories.*"
//  52.6        CALLBACK: "Libra finally ordered. | *Lunch is over.*"  Libra with the menu, the CLOSED sign up.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#2fc79a'

const BASKET = ['.BBBBBBBB.', 'BbBbBbBbBb', 'BBBBBBBBBB', '.bBbBbBbB.', '..BBBBBB..']
const BREAD = ['.CCCC.', 'CCCCCC', 'CdCdCC', '.CCCC.']
const COOKIE = ['.CCCC.', 'CCdCCC', 'CCCCdC', 'CdCCCC', 'CCCdCC', '.CCCC.']
const COOKIE_C = { C: '#e0a04a', d: '#5a3420' }
const GLASS = ['W....W', 'WSSSSW', 'WSSSSW', 'WSSSSW', '.WSSW.', '..WW..', '..WW..', '.WWWW.']
const GLASS_C = { W: '#e8f4ff', S: '#8fe3ff' }
const CAKE = ['....F....', '....W....', 'PPPPPPPPP', 'WWWWWWWWW', 'CCCCCCCCC', 'WWWWWWWWW', 'CCCCCCCCC']
const CAKE_C = { F: GOLD, W: '#fff4e2', P: PINK, C: '#c98f2a' }
const BUS = ['YYYYYYYYYYYY', 'YSSYSSYSSYSY', 'YSSYSSYSSYSY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', '.KK.....KK..']
const BUS_C = { Y: '#ffd23a', S: '#8fe3ff', K: INK }

function receipt(x, cx, cy, k, lines, { head = 'RECEIPT', w = 370, size = 36, rot = 0.04, total = null } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.4, h = lines.length * lh + 100 + (total ? lh + 10 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 36)
  x.fillRect(-w / 2 + 20, -h / 2 + 64, w - 40, 3)
  x.font = `700 ${size}px ${MONO}`; x.textAlign = 'left'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 22, -h / 2 + 90 + lh * (i + 0.5)))
  if (total) { x.fillStyle = TEAL; x.fillRect(-w / 2 + 14, h / 2 - lh - 16, w - 28, lh + 6); x.fillStyle = INK; x.fillText(total, -w / 2 + 22, h / 2 - lh / 2 - 12) }
  x.restore()
}
function menu(x, cx, cy, k, page, rot = -0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -162, 260, 340)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352); x.fillStyle = '#8a2a4a'; x.fillRect(-128, -168, 256, 336)
  x.fillStyle = BONE; x.fillRect(-108, -148, 216, 296)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -116)
  x.fillStyle = '#9aa5c4'; for (let i = 0; i < 6; i++) x.fillRect(-84, -76 + i * 30, 120 + (i * 37) % 48, 10)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(`p. ${page}`, 0, 124)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before | *the boss sat down.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'burger. NOW.', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 50, col: GOLD, tail: 'bl' })
      label(x, 790, 960, 'ORDER #1', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 48, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1120, 'BOSS: STILL PARKING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Finished *every* | bread basket.', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 4 - Math.min(4, Math.floor(clamp((lt - 0.3) / 1.4) * 5))
      drawBits(x, BASKET, { B: '#c98f2a', b: '#a8742a' }, 790, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < n; i++) drawBits(x, BREAD, { C: '#e8b86a', d: '#c98f2a' }, 730 + i * 40, 880 - (i % 2) * 18, 13)
      const b = 1 + Math.min(5, Math.floor(clamp((lt - 0.3) / 1.6) * 6))
      label(x, 790, 700, `BASKET #${b}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 42, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Sat at three tables. | *One lunch.*', mood: 'sparkle', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      const n = 1 + Math.min(2, Math.floor(clamp((lt - 0.3) / 1.6) * 3))
      label(x, 790, 860, `TABLE ${n} OF 3`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 50, bg: [SKYB, PINK, MINT][n - 1], rot: (n % 2 ? -0.05 : 0.05), font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'anyway, so—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought cookies | *for the waiter.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); if (k > 0.01) drawBits(x, COOKIE, COOKIE_C, 700 + (i % 3) * 90, 860 + Math.floor(i / 3) * 90, 15 * k) }
      label(x, 790, 700, 'HOMEMADE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'you work so hard!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Gave a toast. | *Nobody asked.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, GLASS, GLASS_C, F.x + 150, F.cy - 70, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.2 })
      bubble(x, 790, 760, 'a few words…', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      const m = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 11)
      label(x, 790, 1060, `SPEECH: ${m} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Split the bill | *to the cent.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      receipt(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['salad   9.50', 'tea     2.97', 'tip     2.49'], { total: lt > 1.2 ? 'EACH: 14.96' : null })
      label(x, 790, 1150, 'MATH CHECKED TWICE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still on the menu. | *Dessert’s here.*', mood: 'wide', look: lt => [Math.sin(lt * 5) > 0 ? 1 : -1, 1], star: ST,
    front(x, t, lt, P) {
      const pg = 1 + Math.floor(clamp((lt - 0.2) / 1.8) * 8)
      menu(x, 760, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pg)
      drawBits(x, CAKE, CAKE_C, 880, 1100, 18 * pop01(t, P.t0 + 1.5, 0.3, 2))
    } },
  { sign: 'scorpio', cap: 'Guessed everyone’s | *rising sign.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['aries', 'leo', 'aquarius']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.35, 2); if (k > 0.01) signChar(x, t, id, 680 + i * 110, 820 + (i % 2) * 40, 110 * k, { mood: lt > 1.4 ? 'wide' : 'happy', seed: 50 + i, glyph: false, glow: 0.6 }) })
      label(x, 790, 1060, 'ALL CORRECT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Turned lunch into | *a field trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.2, 0.9))
      drawBits(x, BUS, BUS_C, lerp(1060, 800, d), 920, 22 * clamp(d * 2))
      label(x, 790, 700, 'BUS LEAVES 1:15', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Expensed the napkins. | *Itemised.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      receipt(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['napkin  x1', 'napkin  x1', 'napkin  x1'], { head: 'EXPENSES', total: lt > 1.3 ? 'APPROVED' : null, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Ordered off-menu. | *It worked.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'soup, but | make it cold?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      label(x, 790, 1000, 'CHEF: INTRIGUED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: '#6fc3ff', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'NEW MENU ITEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at a stranger’s | *birthday song.*', mood: 'heart', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 800, { n: 4, cell: 8, col: LAV, seed: 4 })
      label(x, 800, 1120, 'NOT EVEN THEIR TABLE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0179', key: 'D', accent: ORANGE, ending: 'callback',
  title: 'The signs at | *the team lunch.*',
  cameos: CAMEOS,
  group: { cap: 'One hour. | *Twelve stories.*' },
  last: {
    text: 'Libra finally ordered. | *Lunch is over.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'libra', 400, 1100, 340 * s, { mood: lt > 1.6 ? 'wide' : 'sparkle', look: [1, 0], seed: 44, hops: [t0 + 1.6] })
      menu(x, 720, 1060, pop01(t, t0 + 0.8, 0.3, 2), 9, 0.06)
      label(x, 720, 1300, 'SORRY, WE’RE CLOSED', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 42, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
