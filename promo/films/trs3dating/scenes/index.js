// trs3dating: THE SIGNS AS… v3, "Dating every sign | be like." (~64 s vertical, signs3kit social cut, music: lofi · D)
// Story, then the closing match card. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Dating every sign | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one first date per sign (3.8 s each), each pushed to the extreme:
//              ♈ matched an hour ago, proposed · ♉ ordered for both, ate both · ♊ changed topics mid-word
//              · ♋ brought their mom (she approves) · ♌ brought a spotlight for themself · ♍ a laminated feedback form
//              · ♎ still picking a table, week two · ♏ read your birth chart, kept theirs secret
//              · ♐ planned date two on another continent · ♑ pitched the relationship with slides
//              · ♒ invited the aliens (they said yes) · ♓ saw the match, sobbed for an hour
//  49.2        "Nobody played | it *cool.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Be a lot. | The right one *stays.*"  MATCH: MADE
//  58.3        "Pisces said *yes.*" over the match card: Aries + Pisces (the proposal and the sobbing, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB,
} from '../../signs3kit.js'

// ── props
const RING = [
  '....DD....',
  '...DWWD...',
  '....DD....',
  '...YYYY...',
  '..YY..YY..',
  '..Y....Y..',
  '..YY..YY..',
  '...YYYY...',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
  'RRRRRRRRRR',
]
const RING_C = { D: SKYB, W: '#ffffff', Y: GOLD, R: '#e23d4e' }
const PLATE = [
  '..WWWWWWWWW..',
  '.WWWWWWWWWWW.',
  'WWWWWWWWWWWWW',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
]
const PLATE_C = { W: '#fff4e2' }
const BURGER = [
  '..BBBBB..',
  '.BBWBBWB.',
  'GGGGGGGGG',
  'MMMMMMMMM',
  '.BBBBBBB.',
]
const BURGER_C = { B: '#e8a24a', W: '#fff4e2', G: '#5fd068', M: '#8a4a2e' }
const FORM = [
  '...KKKK...',
  'WWWKKKKWWW',
  'WWWWWWWWWW',
  'WGGW.....W',
  'WGGW.....W',
  'WWWWWWWWWW',
  'WGGW.....W',
  'WGGW.....W',
  'WWWWWWWWWW',
  'WGGW.....W',
  'WGGW.....W',
  'WWWWWWWWWW',
]
const FORM_C = { K: '#6b62a8', W: '#fff4e2', G: '#2fc79a' }
const TABLE = [
  'WWWWWWWWW',
  'WWWWWWWWW',
  '....B....',
  '....B....',
  '...BBB...',
]
const TABLE_C = { W: '#fff4e2', B: '#8a4a2e' }
const PLANE = [
  '......WW.....',
  '......WWW....',
  'W.....WWWW...',
  'WWWWWWWWWWWWW',
  'WWWWWWWWWWWWS',
  'W.....WWWW...',
  '......WWW....',
  '......WW.....',
]
const PLANE_C = { W: '#ffffff', S: SKYB }
const UFO = [
  '.....SSS.....',
  '....SSSSS....',
  '..GGGGGGGGG..',
  'GGGYGGYGGYGGG',
  '..GGGGGGGGG..',
]
const UFO_C = { S: SKYB, G: '#9aa5c4', Y: GOLD }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSHHSHHK',
  'KSHHHHHK',
  'KSHHHHHK',
  'KSSHHHSK',
  'KSSSHSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
  'KKKKKKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', H: '#ff4f86', G: '#6b62a8' }

/** a little birth-chart wheel: twelve coloured houses, a few planet dots, drawn at k */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) {
    x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill()
  }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.strokeStyle = BONE; x.lineWidth = 3
  for (const [a, b] of [[0.4, 2.6], [2.6, 4.5], [4.5, 0.4], [1.2, 3.9]]) { x.beginPath(); x.moveTo(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55); x.lineTo(Math.cos(b) * r * 0.55, Math.sin(b) * r * 0.55); x.stroke() }
  x.fillStyle = GOLD
  for (const a of [0.4, 2.6, 4.5, 1.2, 3.9]) { x.fillRect(Math.cos(a) * r * 0.55 - 7, Math.sin(a) * r * 0.55 - 7, 14, 14) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Matched an hour ago. | *Proposed.*', mood: lt => lt > 1.0 ? 'heart' : 'sparkle', star: { x: -150 }, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 640, 'marry me?', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 50, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, RING, RING_C, 790, 930, 20 * k, { rot: 0.06 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 6, 120, 0.4)
    } },
  { sign: 'taurus', cap: 'Ordered for both. | Ate *both.*', mood: lt => lt > 1.9 ? 'sleepy' : 'happy', star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, PLATE, PLATE_C, 680, 1080, 18 * k)
      drawBits(x, PLATE, PLATE_C, 830, 1000, 18 * k)
      drawBits(x, BURGER, BURGER_C, 680, 1030, 20 * k, { alpha: 1 - prog(lt, 0.6, 0.9) })
      drawBits(x, BURGER, BURGER_C, 830, 950, 20 * k, { alpha: 1 - prog(lt, 1.1, 1.4) })
      label(x, 790, 860, 'PLATES: 2 · LEFT: 0', pop01(t, P.t0 + 1.45, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'oh, you wanted | some?', pop01(t, P.t0 + 1.75, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Changed topics | *mid-word.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const TOP = ['so my cat—', 'wait, sharks!', 'tacos or—', 'did you know—', 'ANYWAY, my cat']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38))
      bubble(x, 770, 700, TOP[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 860, `TOPIC ${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Brought their mom. | She *approves.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 790, 960, 190 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 11, glyph: false, hops: [P.t0 + 1.4] })
      label(x, 790, 790, 'MOM', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: PINK, rot: 0.05 })
      bubble(x, 770, 620, 'so polite!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'br' })
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Brought a spotlight. | For *themself.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.32 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill()
      x.globalAlpha = 0.5 * k; x.beginPath(); x.ellipse(390, 1150, 200, 36, 0, 0, Math.PI * 2); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'STARRING: LEO', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: '#ffb34a', rot: 0.06 })
      bubble(x, 790, 940, 'anyway, me', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Brought a feedback form. | *Laminated.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, FORM, FORM_C, 790, 880, 24 * k, { rot: 0.05 })
      // the lamination glint sweeping across
      const g = prog(lt, 1.2, 1.7)
      if (g > 0 && g < 1 && k > 0.9) {
        x.save(); x.translate(790, 880); x.rotate(0.05); x.beginPath(); x.rect(-120, -144, 240, 288); x.clip()
        x.fillStyle = 'rgba(255,255,255,0.65)'; x.translate(lerp(-260, 260, g), 0); x.rotate(0.5); x.fillRect(-18, -260, 36, 520)
        x.restore()
      }
      label(x, 790, 680, 'RATE YOUR DATE', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Still picking a table. | *Week two.*', mood: lt => lt > 1.9 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, TABLE, TABLE_C, 700, 1080, 18 * k)
      drawBits(x, TABLE, TABLE_C, 880, 1080, 18 * k)
    },
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2 ? 'that one?' : 'this one?'
      bubble(x, 780, 660, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 860, 'WEEK 2', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 40, bg: '#ff8fb1', rot: 0.05 })
    } },
  { sign: 'scorpio', cap: 'Read your birth chart. | Kept *theirs secret.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      chart(x, 790, 760, 130, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 920, 'YOURS: READ', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 32, bg: MINT, rot: -0.05 })
      bubble(x, 790, 1070, 'mine? | a secret.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Planned date two. | On *another continent.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.3],
    back(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      if (p > 0 && p < 1) drawBits(x, PLANE, PLANE_C, lerp(120, 960, p), 600 - 60 * p, 14, { rot: -0.08 })
    },
    front(x, t, lt, P) {
      label(x, 320, 860, 'BOARDING: 6 A.M.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 32, bg: GOLD, rot: -0.06 })
      bubble(x, 320, 1020, 'pack light!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Pitched the relationship. | With *slides.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(310, 820); x.scale(k, k)
      // easel legs + board
      x.fillStyle = '#8a4a2e'; x.fillRect(-100, 120, 16, 200); x.fillRect(84, 120, 16, 200)
      x.fillStyle = INK; x.fillRect(-170, -150, 340, 290)
      x.fillStyle = '#fff4e2'; x.fillRect(-160, -140, 320, 270)
      x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US: THE PLAN', 0, -105)
      const BARS = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a']
      for (let i = 0; i < 4; i++) {
        const h = 50 + i * 30, g = ease.outCubic(prog(lt, 0.5 + i * 0.2, 0.8 + i * 0.2))
        x.fillStyle = BARS[i]; x.fillRect(-120 + i * 64, 110 - h * g, 44, h * g)
      }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 310, 1110, 'Q4: MEET THE FAMILY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: '#2fc79a', rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Invited the aliens. | They *said yes.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      const ux = 790, uy = 640 + 10 * Math.sin(t * 3)
      if (k > 0.01 && lt > 0.7) {
        x.save(); x.globalAlpha = 0.25 * clamp((lt - 0.7) / 0.3); x.fillStyle = MINT
        x.beginPath(); x.moveTo(ux - 40, uy + 30); x.lineTo(ux + 40, uy + 30); x.lineTo(ux + 120, 1120); x.lineTo(ux - 120, 1120); x.closePath(); x.fill(); x.restore()
      }
      drawBits(x, UFO, UFO_C, ux, uy, 18 * k)
      bubble(x, 790, 900, "we'd love to!", pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Saw the match. | *Sobbed* for an hour.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, PHONE, PHONE_C, 800, 900, 20 * k, { rot: 0.08 })
      label(x, 790, 660, '✦ NEW MATCH', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: GOLD, rot: -0.05 })
      hearts(x, t, 800, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'trs3dating', key: 'D', accent: '#ff8fb1',
  title: 'Dating every sign | *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'pisces', chip: "IT'S A MATCH" },
  group: { cap: 'Nobody played | it *cool.*' },
  lesson: { text: 'Be a lot. | The right one *stays.*', chip: 'MATCH: MADE' },
  last: {
    text: 'Pisces said *yes.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
