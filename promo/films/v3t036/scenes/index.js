// v3t036: THE SIGNS AS… v3, "The signs | at a bakery." (~54 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    the hook, the twelve line up, then dive into the pip row.
//   3.6–49.2   one bakery visit per sign, each pushed to the extreme:
//              ♈ ate the bread before it cooled · ♉ smelled it from three streets away · ♊ chatted with the baker, now co-owns it
//              · ♋ smells like grandma's, hugged the baker · ♌ a cake with their face on it · ♍ straightened every croissant
//              · ♎ bought the prettiest one, too cute to eat · ♏ knows the secret off-menu item · ♐ came for bread, left a baker
//              · ♑ asked about franchise rights · ♒ ordered a cucumber croissant · ♓ the last cookie sold, Pisces wept
//  49.2        group (the ending): "Twelve signs. | *Zero crumbs.*" — the empty tray, SOLD OUT
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', CREAM = '#fff4e2', CRUST = '#d8963a'

const LOAF = [
  '...CCCCCC...',
  '.CCcCCCcCCC.',
  'CCCCcCCCcCCC',
  'CCCCCCCCCCCC',
  'CCCCCCCCCCCC',
  '.CCCCCCCCCC.',
]
const LOAF_C = { C: CRUST, c: '#f3c070' }
const CROISSANT = [
  '..CCCCCC..',
  '.CcCCCCcC.',
  'CCCcCCcCCC',
  'CC.CCCC.CC',
  'C........C',
]
const CUPCAKE = [
  '....R.....',
  '..PPPPPP..',
  '.PPWPPPPP.',
  'PPPPPPPPPP',
  '.LLLLLLLL.',
  '.LlLlLlLl.',
  '..LLLLLL..',
]
const CUP_C = { R: RED, P: PINK, W: '#fff', L: LAV, l: '#9a7ad8' }
const CAKE = [
  'PPPPPPPPPPPP',
  'WWWWWWWWWWWW',
  'CCCCCCCCCCCC',
  'PPPPPPPPPPPP',
  'CCCCCCCCCCCC',
  'KKKKKKKKKKKK',
]
const CAKE_C = { P: '#ffd23a', W: CREAM, C: '#b9784a', K: '#c4c8e0' }
const HAT = [
  '.WWW.WWW.',
  'WWWWWWWWW',
  'WWWWWWWWW',
  '.WWWWWWW.',
  '.WWWWWWW.',
  '.KKKKKKK.',
]
const TRAY = [
  '...c.......c....',
  '.......c........',
  'KKKKKKKKKKKKKKKK',
  'KSSSSSSSSSSSSSSK',
  'KSSsSSSSSSSsSSSK',
  'KSSSSSSSSSSSSSSK',
  '.KKKKKKKKKKKKKK.',
]
const CRUMB = ['C']

const CAMEOS = [
  { sign: 'aries', cap: 'Ate the bread | *before it cooled.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.0) drawBits(x, LOAF, LOAF_C, 800, 920, 30 * k)
      else drawBits(x, LOAF.map(r => r.slice(0, 6)), LOAF_C, 710, 920, 30 * k)
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(740 + i * 60 + Math.sin(ph * 8) * 8, 820 - ph * 160, 12, 30); x.restore() }
      label(x, 800, 650, 'HOT!!', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 48, bg: RED, color: CREAM, rot: -0.06 })
      bubble(x, 800, 1090, 'worth it', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Smelled it from | *three streets away.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.2, 1.5, 1.8],
    front(x, t, lt, P) {
      const k = clamp(pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = k; x.strokeStyle = 'rgba(255,241,200,0.8)'; x.lineWidth = 10; x.lineCap = 'round'
      for (let j = 0; j < 3; j++) { x.beginPath(); for (let i = 0; i <= 24; i++) { const xx = 940 - i * 18, yy = 760 + j * 70 + Math.sin(i * 0.6 + t * 4 + j) * 18; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
      x.restore()
      label(x, 790, 650, '3 STREETS →', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, LOAF, LOAF_C, 850, 1080, 12 * k)
    } },
  { sign: 'gemini', cap: 'Chatted with the baker. | *Now co-owns it.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and THEN—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, 'CO-OWNER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 50, bg: MINT, rot: -0.05 })
      drawBits(x, CROISSANT, { C: CRUST, c: '#f3c070' }, 790, 1080, 14 * pop01(t, P.t0 + 1.4, 0.3, 2))
    } },
  { sign: 'cancer', cap: 'Smells like grandma’s. | *Hugged the baker.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.4 ? 1 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HAT, { W: CREAM, K: '#b9b0a0' }, 800, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1000, 'HUG #4', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 0.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Ordered a cake | *with their face on it.*', mood: 'sparkle', star: { x: -180, s: 270 }, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 790, 1010, 26 * k)
      if (k > 0.6) signChar(x, t, 'leo', 790, 840, 170 * clamp(k), { mood: 'wink', seed: 31, glyph: false })
      label(x, 790, 640, 'LIFE-SIZE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Straightened | *every croissant.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
        const i = r * 2 + c, fixed = lt > 0.5 + i * 0.2
        drawBits(x, CROISSANT, { C: CRUST, c: '#f3c070' }, 720 + c * 150, 720 + r * 140, 12 * k, { rot: fixed ? 0 : [0.5, -0.4, 0.3, -0.6, 0.45, -0.3][i] })
      }
      label(x, 790, 1130, 'ALIGNED ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The prettiest one? | *Too cute to eat.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CUPCAKE, CUP_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 880, P.t0 + 0.7, 8, 180, 0.2, [PINK, GOLD, BONE])
      label(x, 790, 1110, 'DAY 3: UNEATEN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows the secret | *off-menu* item.', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#2a2350'; x.fillRect(-142, -182, 284, 364)
        x.fillStyle = GOLD; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MENU', 0, -140)
        x.fillStyle = '#6a6290'; for (let i = 0; i < 4; i++) x.fillRect(-100, -80 + i * 50, 200, 14)
        x.restore()
      }
      label(x, 790, 1090, 'ITEM #0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: '#c23a5a', color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Came for bread. | *Left a baker.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      const k = clamp(pop01(t, P.t0 + 0.9, 0.3, 2))
      if (k > 0.01) drawBits(x, HAT, { W: CREAM, K: '#b9b0a0' }, F.x, F.top - 40 - (1 - k) * 200, F.cell * 1.7, { alpha: k })
      drawBits(x, LOAF, LOAF_C, 330, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 700, 'NEW JOB!', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'capricorn', cap: 'Asked about | *franchise rights.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -190, 280, 380); x.fillStyle = CREAM; x.fillRect(-132, -182, 264, 364)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLAN', 0, -140)
        const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4)
        for (let i = 0; i < 4; i++) { x.fillStyle = '#2fc79a'; x.fillRect(-100, -60 + i * 70, 40 + (i < n ? 120 : 0), 30) }
        x.restore()
      }
      label(x, 790, 640, 'BAKERIES: 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ordered a | *cucumber croissant.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, { C: '#5fd068', c: '#a8f0a0' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'it’s art', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 1080, 'BAKER: ???', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'The last cookie sold. | *Pisces wept.*', mood: lt => lt < 0.7 ? 'happy' : 'wide', tears: lt => lt < 0.7 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TRAY, { K: INK, S: '#c4c8e0', s: '#8a8fb0', c: CRUST }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 720, 'SOLD OUT', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 48, bg: RED, color: CREAM, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'v3t036', key: 'C', accent: '#ffb34a', ending: 'group',
  title: 'The signs | *at a bakery.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Zero crumbs.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.6, 0.4, 2)
      drawBits(x, TRAY.slice(2), { K: INK, S: '#c4c8e0', s: '#8a8fb0' }, 540, 800, 26 * k)
      if (lt > 2.6) label(x, 540, 640, 'SOLD OUT', pop01(t, t - lt + 2.6, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: -0.04 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
