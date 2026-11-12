// r2t0762: star_talk, SOLO (leo), "Your Leo roommate | be like." (signs3kit social cut, lofi · E). Ending: group.
// One sign the whole way: nine flat-share moments, each the most extreme (and lovable) Leo version.
//   bathroom mirror booked till noon · chore chart: their chore is "being adored" · borrowed your hoodie, now it's iconic
//   · threw a party in your room · grocery run, bought a ring light · did the dishes once, wants a trophy
//   · your match came over, Leo gave a tour · you had a bad day, Leo cooked a feast · named the wifi after themself
//   group "Your place. | *Their stage.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, steam, confetti, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'leo', ACC = '#ffb34a', ST = { x: -170 }

const HOODIE = ['..OOOOOO..', '.OOO..OOO.', 'OOOOOOOOOO', 'OOOOYYOOOO', 'OOOYYYYOOO', 'OOOOYYOOOO', 'OOOOOOOOOO', 'OO.OOOO.OO', 'OO.OOOO.OO']
const HOODIE_C = { O: '#6fc3ff', Y: GOLD }
const POT = ['.KKKKKKKK.', 'KKKKKKKKKK', 'RRRRRRRRRR', 'RRWRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRR', '.RRRRRRRR.']
const POT_C = { K: STEEL, R: RED, W: '#ff8f8f' }

/** a ring light on a stand */
function ringLight(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, 60, 16, 200); x.fillRect(-60, 250, 120, 14)
  x.shadowColor = '#fff6c8'; x.shadowBlur = 40
  x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, -40, 100, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#fff6c8'; x.lineWidth = 22; x.beginPath(); x.arc(0, -40, 100, 0, Math.PI * 2); x.stroke()
  x.restore()
}
/** a spinning disco ball with light flecks */
function disco(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-3, -200, 6, 130)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 78, 0, Math.PI * 2); x.fill()
  for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) {
    if (i * i + j * j > 10) continue
    const f = (Math.sin(t * 6 + i * 1.7 + j * 2.3) + 1) / 2
    x.fillStyle = f > 0.7 ? '#ffffff' : f > 0.35 ? '#c9c9d8' : '#8a8aa0'; x.fillRect(i * 20 - 9, j * 20 - 9, 18, 18)
  }
  x.restore()
  const COLS = [PINK, MINT, SKYB, GOLD]
  for (let i = 0; i < 10; i++) { const a = t * 1.5 + i * 0.63; x.fillStyle = COLS[i % 4]; x.globalAlpha = 0.7 * k; x.fillRect(cx - 60 + Math.cos(a) * 170, cy + 230 + Math.sin(a * 1.3) * 90, 14, 14) }
  x.globalAlpha = 1
}

const CAMEOS = [
  { sign: S, cap: 'Bathroom mirror? | *Booked till noon.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 380, head: 'MIRROR TIME', headBg: ACC, headInk: INK, lines: ['7:00  LEO', '8:00  LEO', '9:00  LEO', '10:00 LEO', ['11:00 you?', '#b9b0a0'], '12:00 LEO'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.3) })
      L(x, 790, 1120, 'FULLY BOOKED', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: S, cap: 'The chore chart. | Theirs: *being adored.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 340, head: 'CHORES', headBg: MINT, headInk: INK, lines: ['you: dishes', 'you: trash', 'you: floors', ['leo: be adored', '#c0392b']], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      sparkles(x, t, 790, 960, P.t0 + 1.5, 7, 170, 0.5)
      L(x, 790, 1100, 'HARD WORK, HONESTLY', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Borrowed your hoodie. | Now it’s *iconic.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      drawBits(x, HOODIE, HOODIE_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      L(x, 790, 640, 'YOURS, ONCE', pop01(t, P.t0 + 0.6, 0.3, 2), STEEL, -0.05, 32)
      L(x, 790, 1100, 'NOW: A LOOK ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 190, 0.2)
    } },
  { sign: S, cap: 'Threw a party. | In *your room.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [0.7, 1.4, 2.0],
    front(x, t, lt, P) {
      disco(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'VENUE: YOUR BED', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Grocery run. | Bought *a ring light.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ringLight(x, t, 790, 820, pop01(t, P.t0 + 0.6, 0.35, 2))
      bits(x, 'BAG', 640, 1080, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 860, 1110, 'MILK: FORGOT', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, 0.05, 30)
    } },
  { sign: S, cap: 'Did the dishes *once.* | Wants a trophy.', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PLATE', 790, 1070, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(prog(lt, 0.7, 1.1))
      bits(x, 'TROPHY', 790, lerp(600, 830, d), 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 640, 'BEST ROOMMATE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 830, P.t0 + 1.2, 7, 160, 0.6)
    } },
  { sign: S, cap: 'Your match came over. | Leo *gave a tour.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 820, 980, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0] })
      L(x, 820, 820, 'YOUR MATCH ♡', pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 0.05, 30)
      bubble(x, 760, 640, 'and THIS wall? | all me.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Had a bad day? | Leo *cooked a feast.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, POT, POT_C, 790, 960, 24 * k)
      if (k > 0.9) steam(x, t, 790, 860, { n: 3, h: 140 })
      L(x, 790, 660, 'TABLE FOR YOU ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, -0.04, 34)
      hearts(x, t, 790, 820, P.t0 + 1.3, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Named the wifi | *after themself.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'WI-FI', headCol: ACC, size: 26, lines: [
        ['LEO_IS_HERE', GOLD, pop01(t, P.t0 + 0.5, 0.2, 2)],
        ['LEO_5G_ICON', GOLD, pop01(t, P.t0 + 0.8, 0.2, 2)],
        ['LEO_GUEST', GOLD, pop01(t, P.t0 + 1.1, 0.2, 2)],
        ['pw: ilove_leo', BONE, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0762', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Your Leo roommate | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Your place. | *Their stage.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
