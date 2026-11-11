// v3t025: THE SIGNS AS… v3, SOLO film, "Your Leo friend | be like." (~45 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through: nine moments with a Leo friend, each pushed to the most extreme (and lovable) version.
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Your Leo friend | *be like.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              group photo, always in the middle · you're sad, hyped you for an hour (megaphone) · texts in all caps
//              · your birthday, made a slideshow · walks in, waits for applause · hair takes an hour (worth it)
//              · lost a board game, rematch #5 · your new match, Leo approves first · you did great, cheered the loudest
//  37.8        "Loud. Loyal. | *Iconic.*"  Leo comes back, big.
//  41.2        callback: "The group photo? | Leo *is the group.*" (the photo frame comes back: just Leo, three times).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const MEGA = pad([
  '..........WW',
  '.......WWWWW',
  '....WWWWWWWW',
  'KKKWWWWWWWWW',
  'KKKWWWWWWWWW',
  '....WWWWWWWW',
  '.......WWWWW',
  '...RR.....WW',
  '...RR.......',
])
const MEGA_C = { W: '#ff5a4f', K: INK, R: '#8a4a2e' }
const DRYER = pad([
  '.PPPPPPP...',
  'PPPPPPPPGGG',
  'PPPPPPPPGGG',
  '.PPPPPPP...',
  '...PP......',
  '...PP......',
  '...PP......',
  '...PP......',
])
const DIE = pad(['KKKKKKK', 'KWWWWWK', 'KWKWWWK', 'KWWKWWK', 'KWWWKWK', 'KWWWWWK', 'KKKKKKK'])

/** a photo frame; ids = the stars in it, the middle one big */
function photo(x, t, cx, cy, k, ids, { w = 320, h = 260, rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#6fc3ff'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 60)
  const n = ids.length
  ids.forEach((id, i) => {
    const mid = i === Math.floor(n / 2)
    signChar(x, t, id, (i - (n - 1) / 2) * (w - 60) / Math.max(1, n - 1 || 1), -h / 2 + 14 + (h - 60) * (mid ? 0.52 : 0.68), mid ? 150 : 70, { mood: mid ? 'sparkle' : 'happy', seed: 30 + i, glyph: false, glow: 0.5 })
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'leo', cap: 'Group photo? | *Always in the middle.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      photo(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), ['cancer', 'virgo', 'leo', 'libra', 'aries'])
      label(x, 790, 650, 'SAY “LEO!”', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: ORANGE, rot: -0.05 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'leo', cap: 'You’re sad? | *An hour of hype.*', mood: 'sparkle', star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, MEGA_C, F.x + 200, F.cy - 10, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      const W = ['YOU’RE A LEGEND', 'A SUPERSTAR', 'A ROYAL', 'MINUTE 58…']
      bubble(x, 780, 700, W[Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.5))], pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1080, 'HYPE: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Texts only | in *ALL CAPS.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 860); x.rotate(0.05); x.scale(1.2 * k, 1.2 * k)
        x.fillStyle = INK; x.fillRect(-140, -200, 280, 400); x.fillStyle = '#2a2350'; x.fillRect(-132, -192, 264, 384); x.fillStyle = '#140c30'; x.fillRect(-118, -170, 236, 330)
        const M = ['OMG HIIII', 'I’M OUTSIDE', 'COME DOWN!!!', 'WEAR GOLD']
        const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.35))
        for (let i = 0; i < n; i++) { x.fillStyle = ORANGE; x.fillRect(-104, -150 + i * 76, 208, 58); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(M[i], 0, -120 + i * 76) }
        x.restore()
      }
    } },
  { sign: 'leo', cap: 'Your birthday? | Leo *made a slideshow.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = '#fff4e2'; x.fillRect(-160, -120, 320, 230)
        x.fillStyle = '#8a4a2e'; x.fillRect(-8, 120, 16, 120)
        const s = Math.min(3, Math.floor(Math.max(0, lt - 0.4) / 0.5))
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText(['AN ODE TO YOU', 'CHAPTER 1: BABY', 'CHAPTER 9: ICON', 'SLIDE 214 / 300'][s], 0, -70)
        x.fillStyle = PINK; for (let i = 0; i < 3; i++) x.fillRect(-120 + i * 90, -20, 70, 90)
        x.restore()
      }
      hearts(x, t, 790, 1180, P.t0 + 1.2, { n: 5, life: 1.2, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Walks in. | *Waits for applause.*', mood: 'sparkle', star: { x: -170 }, hops: [0.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(380, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-140, -260, 280, 420); x.fillStyle = '#8a4a2e'; x.fillRect(-130, -250, 260, 400); x.fillStyle = '#140c30'; x.fillRect(-110, -230, 220, 380)
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'APPLAUSE?', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 46, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      const n = Math.max(0, Math.floor((lt - 1.2) / 0.25))
      if (lt > 1.2) bubble(x, 790, 980, 'clap' + ' clap'.repeat(Math.min(2, n)), pop01(t, P.t0 + 1.2 * 3.1 / 2.4, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Their hair? | *An hour.* Worth it.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DRYER, { P: PINK, G: '#c9c9d8' }, F.x + 250, F.cy - 160, 14 * k, { sx: -1, rot: 0.3 })
      if (lt < 1.4 && k > 0.5) { x.save(); x.globalAlpha = 0.6; x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(F.x + 80 - ((t * 400 + i * 40) % 120), F.cy - 150 + i * 18, 40, 6); x.restore() }
      label(x, 790, 900, lt > 1.4 ? 'MANE: DONE' : 'MINUTE 59…', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy - 120, P.t0 + 1.4 * 3.1 / 2.4, 7, 170, 0.5)
    } },
  { sign: 'leo', cap: 'Lost a board game. | *Rematch number five.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DIE, { K: INK, W: '#fff4e2' }, 730, 1000 - 30 * Math.abs(Math.sin(t * 5)), 16 * k, { rot: t * 2 })
      drawBits(x, DIE, { K: INK, W: '#fff4e2' }, 860, 990 - 30 * Math.abs(Math.cos(t * 5)), 16 * k, { rot: -t * 2 })
      label(x, 790, 760, 'REMATCH #5', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 520, 600, 'best of nine!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Your new match? | *Leo approves first.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-136, -176, 272, 352); x.fillStyle = '#2a2350'; x.fillRect(-130, -170, 260, 340); x.fillStyle = '#140c30'; x.fillRect(-116, -156, 232, 210)
        x.restore()
        signChar(x, t, 'taurus', 790 - 6, 790, 150 * k, { mood: 'happy', seed: 51, glyph: false, glow: 0.6 })
        x.save(); x.translate(790, 840); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = '#5fd068'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♉︎ NEW MATCH', 0, 100)
        x.restore()
      }
      label(x, 800, 1020, 'LEO APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 38, bg: ORANGE, rot: -0.14 })
    } },
  { sign: 'leo', cap: 'You did great. | Leo *cheered the loudest.*', mood: 'heart', star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 760); x.rotate(-0.04 + 0.03 * Math.sin(t * 5)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -70, 340, 140); x.fillStyle = GOLD; x.fillRect(-162, -62, 324, 124)
        x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THAT’S MY', 0, -22); x.fillText('FRIEND!!!', 0, 24)
        x.restore()
      }
      bubble(x, 790, 1000, 'WOOOO!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bl' })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 220, 0.4)
    } },
]

const F = makeFilm({
  id: 'v3t025', key: 'G', accent: ORANGE, solo: 'leo', ending: 'callback',
  title: 'Your Leo friend | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. Loyal. | *Iconic.*', mood: 'sparkle' },
  last: {
    text: 'The group photo? | Leo *is the group.*',
    draw(x, t, lt) {
      photo(x, t, 540, 1050, 1.6 * pop01(t, t - lt + 0.3, 0.4, 2), ['leo', 'leo', 'leo'])
      sparkles(x, t, 540, 1050, t - lt + 0.8, 8, 280, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
