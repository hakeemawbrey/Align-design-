// r2a0262: star_advice, ADVICE SOLO, "Taurus, you don't have | to be perfect." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way: nine small imperfections, each with a warm reframe and one soft visual gag.
//   0.0–3.6    "Taurus, you don’t have | *to be perfect.*"
//   3.6–37.8   nine cards: one weed in the garden · burnt one cookie · rest isn't lazy · slow is steady (the snail)
//              · changed your mind · a stain on the couch · ask for help · you're not your stuff · missed a workout
//  37.8        "Not perfect. | *Perfectly you.*"
//  41.2        ending 'callback': "That burnt cookie? | *Best one yet.*"  the burnt cookie comes back, with a bite out of it.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fdc7a'
const ST = { x: -170 }
const POT = ['.F.P..F.W.', 'FYF.PFYF.W', '.F..G.F.WW', '.G..G.G.W.', '.G.GG.G.W.', 'KKKKKKKKKK', '.TTTTTTTT.', '.TTTTTTTT.', '..TTTTTT..']
const POT_C = { F: PINK, Y: GOLD, P: LAV, G: '#5fd068', W: '#9a8a3a', K: INK, T: '#c9673a' }
const COOKIE = ['..CCCC..', '.CCcCCC.', 'CCCCCcCC', 'CcCCCCCC', 'CCCCcCCC', '.CCCCCc.', '..CCCC..']
const SNAIL = ['....SSSS....', '...SsssSS...', '..SsSSSsS...', '..SsSsSsS..A', '..SsSSsS..A.', 'BBBSSSSSBBB.', 'BBBBBBBBBBBB']
const SNAIL_C = { S: '#ffb34a', s: '#c9673a', B: '#c9e88a', A: INK }
const SOFA = ['.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCcccccccccCCC', 'CCcccccPPcccCC', 'CCccccccPccccC', 'CCCCCCCCCCCCCC', 'K............K']
const SOFA_C = { C: '#6b8fd0', c: '#8fb0f0', P: '#c9a06a', K: INK }
const BOX = ['TTTTTTTTTTTT', 'TTTTTKKTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT', 'TTTTTTTTTTTT']
const BELL = ['KK..........KK', 'KKK........KKK', 'KKKGGGGGGGGKKK', 'KKK...PP...KKK', 'KK....PP....KK']
const BELL_C = { K: '#4a4378', G: GREY, P: PINK }

function cookie(x, cx, cy, cell, burnt, bite = 0) {
  drawBits(x, COOKIE, burnt ? { C: '#6a3a1e', c: '#2a1640' } : { C: '#e8b46a', c: '#5a2e1a' }, cx, cy, cell)
  if (bite > 0) { x.fillStyle = 'rgba(20,12,48,1)'; x.beginPath(); x.arc(cx + 4 * cell, cy - 3 * cell, 1.8 * cell * bite, 0, Math.PI * 2); x.fill() }
}

const CAMEOS = [
  { sign: 'taurus', cap: 'One weed in the garden? | *Still lovely.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 900, 680, 'him? he stays.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.05 })
      label(x, 790, 1120, 'STILL GORGEOUS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Burnt one cookie? | *Eat it anyway.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 900, 340, 240, k, { bg: GREY, rot: 0.03 }, () => {
        for (let i = 0; i < 6; i++) cookie(x, -110 + (i % 3) * 110, -55 + Math.floor(i / 3) * 110, 10, i === 4)
      })
      label(x, 790, 650, '5 PERFECT · 1 CHARACTER', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Rest isn’t lazy. | It’s *how you bloom.*', mood: 'sleepy', star: { x: -170, y: 10 }, squash: 0.05,
    front(x, t, lt, P) {
      bar(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), clamp(0.15 + lt / 2.4 * 0.85), 'RECHARGING', { col: MINT, w: 300 })
      label(x, 790, 1080, 'BLOOM IN PROGRESS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Your pace is fine. | *Slow is steady.*', mood: 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, SNAIL, SNAIL_C, 700 + lt * 50, 960, 18 * k)
      label(x, 800, 720, 'STILL MOVING. ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Changed your mind? | *That’s allowed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 780, 300, 120, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'PLAN A', 0, 4, { size: 48 })
        if (lt > 0.8) { x.fillStyle = RED; x.fillRect(-130, -4, 260 * clamp((lt - 0.8) / 0.3), 12) }
      })
      card(x, 790, 990, 300, 120, pop01(t, P.t0 + 1.1, 0.35, 2), { bg: MINT, rot: 0.04 }, () => txt(x, 'PLAN B ✓', 0, 4, { size: 48 }))
    } },
  { sign: 'taurus', cap: 'A stain on the couch? | *Home is lived in.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SOFA, SOFA_C, 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'MOVIE NIGHT, 2024', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ask for help. | *Strong people do.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2), lift = 30 * ease.inOutCubic(prog(lt, 1.2, 1.7))
      drawBits(x, BOX, { T: '#c98f6a', K: INK }, 640, 990 - lift, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (k > 0.01) signChar(x, t, 'cancer', 850, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 41, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 860, 720, 'got the other end!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'You’re not your stuff. | You’re *priceless.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(760, 860); x.rotate(-0.15 + 0.05 * Math.sin(t * 2)); x.scale(k, k)
        x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-200, -40); x.lineTo(-130, 0); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.moveTo(-136, -56); x.lineTo(176, -56); x.lineTo(176, 56); x.lineTo(-136, 56); x.lineTo(-176, 0); x.closePath(); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.moveTo(-130, -48); x.lineTo(168, -48); x.lineTo(168, 48); x.lineTo(-130, 48); x.lineTo(-166, 0); x.closePath(); x.fill()
        txt(x, 'PRICELESS', 16, 4, { size: 44 })
        x.restore()
      }
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.2)
    } },
  { sign: 'taurus', cap: 'Skipped a workout? | *Your body forgives you.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BELL, BELL_C, 790, 960, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 760, 'SEE YOU TOMORROW', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 920, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0262', key: 'F', accent: ACC, solo: 'taurus', ending: 'callback',
  title: 'Taurus, you don’t | have to be *perfect.*',
  cameos: CAMEOS,
  group: { cap: 'Not perfect. | *Perfectly you.*', mood: 'heart' },
  last: {
    text: 'That burnt cookie? | *Best one yet.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 960, 330 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 54, hops: [t - lt + 1.6] })
      const c = pop01(t, t - lt + 0.8, 0.35, 2)
      if (c > 0.01) { x.save(); x.translate(740, 960); x.scale(c, c); cookie(x, 0, 0, 28, true, lt > 1.5 ? 1 : 0); x.restore() }
      if (lt > 1.5) sparkles(x, t, 740, 960, t - lt + 1.5, 7, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
