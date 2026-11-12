// v3t028: THE SIGNS AS… v3, SOLO film, "Dating an Aries | be like." (~48 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through: nine dating moments, each pushed to the most extreme (and lovable) Aries version.
// The format look lives in ../../signs3kit.js.
//   0.0–3.6    "Dating an Aries | *be like.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              booked date two during date one · you said "maybe", Aries heard "yes" · walks you home, sprinting
//              · mini golf, a victory lap every hole · "I love you" on day three · texts back before you hit send
//              · you're cold, got every layer · matched with you, told their mom the same day · bad day? at your door in ten
//  37.8        "Zero to love. | *In a second.*"  Aries comes back, big.
//  41.0        LESSON UNLOCKED: "Date an Aries. | Never be *bored.*"  PACE: FAST
//  46.9        "Libra said “maybe.” | It was *a yes.*" over the match card: Aries + Libra (the "maybe" card, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e'
const pad = bm => { const w = Math.max(...bm.map(r => r.length)); return bm.map(r => r.padEnd(w, '.')) }

const FLAG = pad(['KRRRR', 'KRRRRR', 'KRRRR', 'K', 'K', 'K', 'K', 'K', 'K'])
const BALL = pad(['.WWW.', 'WWWWW', 'WWWWW', '.WWW.'])
const SCARF = pad(['SSSSSSSSSS', 'SYSSYSSYSS', 'SSSSSSSSSS', '......SSS.', '......SYS.', '......SSS.'])
const HAT = pad(['...PP...', '..PPPP..', '.PPPPPP.', 'WWWWWWWW'])
const MITT = pad(['.GG.', 'GGGG', 'GGGG', 'GGG.'])

function phone(x, cx, cy, k, rows, { rot = 0.05, s = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#2a2350'; x.fillRect(-122, -182, 244, 364); x.fillStyle = '#140c30'; x.fillRect(-110, -160, 220, 310)
  rows.forEach(([txt, col, right], i) => {
    x.font = `800 26px ${INTER}`; const w = Math.min(196, x.measureText(txt).width + 30)
    const lx = right ? 100 - w : -100
    x.fillStyle = col; x.fillRect(lx, -140 + i * 70, w, 50)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(txt, lx + 15, -114 + i * 70)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Booked date two | *during date one.*', mood: 'sparkle', star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 840); x.rotate(0.04); x.scale(1.25 * k, 1.25 * k)
        x.fillStyle = INK; x.fillRect(-150, -130, 300, 260); x.fillStyle = BONE; x.fillRect(-142, -122, 284, 244)
        x.fillStyle = RED; x.fillRect(-142, -122, 284, 54)
        x.fillStyle = '#fff4e2'; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TONIGHT', 0, -95)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('8:00 date 1', 0, -30)
        if (lt > 0.9) { x.fillStyle = RED; x.fillText('8:41 book date 2', 0, 20) }
        if (lt > 1.5) { x.fillStyle = RED; x.fillText('8:42 book date 3', 0, 70) }
        x.restore()
      }
    } },
  { sign: 'aries', cap: 'You said “maybe.” | Aries heard *“yes.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.1, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'maybe?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl', col: '#c9c2da' })
      label(x, 790, 900, 'HEARD: YES!!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'aries', cap: 'Walks you home. | *Sprinting.*', mood: 'sparkle', star: { x: 60 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.55; x.fillStyle = BONE
      for (let i = 0; i < 6; i++) { const ox = (t * 900 + i * 160) % 760; x.fillRect(150 + ox, 760 + i * 50, 120, 10) }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 760, 650, 'PACE: OLYMPIC', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1080, 'wait up!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br', col: '#c9c2da' })
    } },
  { sign: 'aries', cap: 'Mini golf. | *Victory lap. Every hole.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.1, 1.4, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, FLAG, { K: '#c9c9d8', R: RED }, 810, 880, 22 * k)
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.beginPath(); x.ellipse(790, 980, 46, 14, 0, 0, Math.PI * 2); x.fill(); x.restore()
      const p = ease.inOutCubic(prog(lt, 0.2, 0.7))
      drawBits(x, BALL, { W: '#ffffff' }, lerp(560, 790, p), 1050 - 70 * p - Math.sin(Math.PI * p) * 60, 12 * k * (1 - 0.6 * prog(lt, 0.65, 0.75)))
      label(x, 790, 1130, 'HOLE 1 OF 18', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
      bubble(x, 800, 650, 'LAP ONE!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'aries', cap: '“I love you.” | *Day three.*', mood: 'heart', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 850); x.rotate(-0.04); x.scale(1.25 * k, 1.25 * k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = BONE; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = RED; x.fillRect(-142, -142, 284, 50)
        for (let d = 0; d < 14; d++) {
          const c = d % 7, r = Math.floor(d / 7), px = -120 + c * 36, py = -60 + r * 70
          x.fillStyle = d === 2 ? PINK : '#e3dccf'; x.fillRect(px, py, 30, 52)
          x.fillStyle = INK; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(d + 1), px + 15, py + 14)
        }
        x.restore()
        if (lt > 0.9) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 780 + 1.25 * (-120 + 2 * 36 + 15), 850 + 1.25 * -30, 9 * pop01(t, P.t0 + 0.9 * 3.1 / 2.4, 0.3, 2.4))
      }
      bubble(x, 560, 600, 'too soon? no.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Texts back | *before you hit send.*', mood: 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      const rows = [['hey, are y—', '#c9c2da', false]]
      if (lt > 0.7) rows.push(['YES!!', ORANGE, true])
      if (lt > 1.1) rows.push(['what time?', ORANGE, true])
      if (lt > 1.5) rows.push(['I’m outside', ORANGE, true])
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), rows, { s: 1.2 })
    } },
  { sign: 'aries', cap: 'You’re cold? | *Got every layer.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const items = [[SCARF, { S: RED, Y: GOLD }, 15], [HAT, { P: PINK, W: '#fff4e2' }, 17], [MITT, { G: MINT }, 20], [MITT, { G: MINT }, 20]]
      items.forEach(([bm, c, cell], i) => {
        const p = ease.outCubic(prog(lt, 0.3 + i * 0.3, 0.6 + i * 0.3))
        if (p > 0) drawBits(x, bm, c, lerp(380, 760 + (i % 2) * 70, p), lerp(880, 1060 - i * 70, p) - Math.sin(Math.PI * p) * 120, cell, { rot: i * 0.3 })
      })
      label(x, 790, 680, 'ARIES: FREEZING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'aries', cap: 'Matched with you. | *Told mom. Same day.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      label(x, 790, 660, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: GOLD, rot: -0.05 })
      phone(x, 790, 960, pop01(t, P.t0 + 0.6, 0.35, 2), [['MOM, I MET', PINK, true], ['SOMEONE!!!', PINK, true], ['(1 hr in)', '#c9c2da', false]], { s: 1.05 })
    } },
  { sign: 'aries', cap: 'Bad day? | *At your door in ten.*', mood: 'heart', star: { x: -170 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const s = Math.max(0, 600 - Math.floor(lt * 9))
      label(x, 790, 800, `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1010, 'on my way. | bringing cake.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'v3t028', key: 'E', accent: '#ff6b5a', solo: 'aries', ending: 'card',
  title: 'Dating an Aries | *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'Zero to love. | *In a second.*', mood: 'heart' },
  lesson: { text: 'Date an Aries. | Never be *bored.*', chip: 'PACE: FAST' },
  last: {
    text: 'Libra said “maybe.” | It was *a yes.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
