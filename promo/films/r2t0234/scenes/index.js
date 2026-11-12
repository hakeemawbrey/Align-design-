// r2t0234: star_talk, ROLLCALL, "The signs planning | a group trip." (~62 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs planning one trip together, each the most extreme version of itself.
//   0.0–3.6    "The signs planning | *a group trip.*"
//   3.6–49.2   ♈ booked the flights before the group chat · ♉ planned it around brunch · ♊ seven group chats for one trip
//              · ♋ packed for everyone, the dog too · ♌ planned the outfits, not the trip · ♍ colour-coded the naps
//              · ♎ ran a poll, tied forever · ♏ already knows who's cancelling · ♐ suggested Antarctica, seriously
//              · ♑ planned to the minute, bathroom breaks too · ♒ pitched the moon, got two votes · ♓ cried planning it
//  49.2        "Trip status: | *still planning.*"
//  52.4        LESSON UNLOCKED: "Go anywhere. | *Just go together.*"  STATUS: PACKED
//  58.3        "Aries is already | *at the airport.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#8fd8ff'
const ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const CASE = ['...KKKK...', '..K....K..', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOYOOOOYOK', 'KOOOOOOOOK', 'KOYOOOOYOK', 'KOOOOOOOOK', 'KKKKKKKKKK', '.K......K.']
const PENG = ['..KKK..', '.KKKKK.', 'KKWWWKK', 'KWKWKWK', 'KWWYWWK', 'KWWWWWK', '.KWWWK.', '.YY.YY.']
const ROCKET = ['....R....', '...WWW...', '..WWWWW..', '..WSSWW..', '..WSSWW..', '..WWWWW..', '.RWWWWWR.', 'RRWWWWWRR', 'R..OOO..R', '....O....']

const CAMEOS = [
  { sign: 'aries', cap: 'Booked the flights. | *Before the group chat.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 170, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'BOARDING PASS', 0, -40, { size: 26, ...M }); txt(x, '× 12', 0, 20, { size: 52 }) })
      label(x, 790, 700, 'BOOKED ✓', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 40, bg: GREEN, rot: -0.05, ...M })
      bubble(x, 790, 1070, 'wait, where?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: GREY, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Planned the whole trip | *around brunch.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'DAY 1', 0, -140, { size: 32, ...M })
        ;['9:00  brunch', '11:00 brunch', '1:00  brunch', '3:00  nap'].forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, s, -110, -70 + i * 58, { size: 28, weight: 700, align: 'left', color: i === 3 ? '#6b62a8' : INK }) })
      })
    } },
  { sign: 'gemini', cap: 'Seven group chats. | *One trip.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(7, 1 + Math.floor(lt / 0.28))
      const NM = ['TRIP', 'TRIP (real)', 'TRIP no Leo', 'TRIP 2', 'snacks', 'TRIP FINAL', 'TRIP FINAL 2']
      for (let i = 0; i < n; i++) label(x, 790 + (i % 2 ? 30 : -30), 640 + i * 70, NM[i], pop01(t, P.t0 + i * 0.28, 0.25, 2.2), { size: 26, bg: [MINT, GOLD, PINK, SKYB, LAV][i % 5], rot: i % 2 ? 0.04 : -0.04, ...M })
    } },
  { sign: 'cancer', cap: 'Packed for everyone. | *Even the dog.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(lt / 0.4))
      for (let i = 0; i < n; i++) drawBits(x, CASE, { K: INK, O: ['#ff9a4a', SKYB, PINK, MINT][i], Y: GOLD }, 700 + (i % 2) * 170, 1060 - Math.floor(i / 2) * 200, 14 * pop01(t, P.t0 + i * 0.4, 0.3, 2))
      label(x, 790, 640, 'BAG 4 OF 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, ...M })
    } },
  { sign: 'leo', cap: 'Planned the outfits. | *Not the trip.*', mood: 'sparkle', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const L = ['DAY 1 · LOOK 1', 'DAY 1 · LOOK 2', 'DAY 1 · LOOK 3', 'DAY 2 · ???']
      L.forEach((s, i) => label(x, 790, 660 + i * 110, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2.2), { size: 30, bg: i === 3 ? GREY : ['#ffb34a', GOLD, PINK][i], rot: i % 2 ? 0.04 : -0.04, ...M }))
      sparkles(x, t, 390, 860, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Made the spreadsheet. | *Colour-coded the naps.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 330, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        const C = [MINT, GOLD, PINK, SKYB, LAV]
        for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) { const n = j * 4 + i; if (lt > 0.4 + n * 0.06) { x.fillStyle = C[(i + j * 2) % 5]; x.fillRect(-140 + i * 72, -120 + j * 50, 64, 40) } }
      })
      label(x, 790, 1100, 'TAB 14: NAPS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: 'libra', cap: 'Ran a poll. | It’s *tied. Forever.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 330, 280, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => {
        txt(x, 'WHERE?', 0, -100, { size: 30, ...M, color: BONE })
        const p = ease.inOutCubic(prog(lt, 0.5, 1.4))
        ;[['BEACH', PINK], ['MOUNTAINS', MINT]].forEach(([s, c], i) => { x.fillStyle = c; x.fillRect(-140, -40 + i * 90, 280 * p * 0.5, 56); txt(x, s, -130, -12 + i * 90, { size: 24, ...M, align: 'left', color: INK }); txt(x, `${Math.round(6 * p)}`, 130, -12 + i * 90, { size: 30, ...M, color: BONE, align: 'right' }) })
      })
      label(x, 790, 1100, 'TIEBREAK: NEVER', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: 'scorpio', cap: 'Already knows | *who’s cancelling.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s Gemini.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1020, 170 * k, { mood: 'wide', look: [-1, 0], seed: 31, glyph: false })
      label(x, 820, 880, 'CANCELLED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: BONE, rot: 0.05, ...M })
    } },
  { sign: 'sagittarius', cap: 'Suggested Antarctica. | *Seriously.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      drawBits(x, PENG, { K: INK, W: '#ffffff', Y: ORANGE }, 320, 980, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.08 * Math.sin(t * 5) })
      bubble(x, 330, 680, 'penguins!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: SKYB, tail: 'br' })
      label(x, 330, 1140, 'COATS: NONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'capricorn', cap: 'Planned it to the minute. | *Bathroom breaks too.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'SCHEDULE', 0, -130, { size: 30, ...M })
        ;[['10:00', 'leave'], ['10:02', 'bathroom'], ['10:04', 'leave (real)'], ['10:05', 'fun: 4 min']].forEach(([a, b], i) => { if (lt > 0.5 + i * 0.3) { txt(x, a, -130, -66 + i * 58, { size: 24, ...M, align: 'left', color: RED }); txt(x, b, -40, -66 + i * 58, { size: 26, weight: 700, align: 'left' }) } })
      })
    } },
  { sign: 'aquarius', cap: 'Pitched the moon. | *Got two votes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const p = prog(lt, 0.4, 2.2)
      drawBits(x, ROCKET, { R: RED, W: '#e8eefc', S: SKYB, O: ORANGE }, 790, 990 - p * 200, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1120, 'VOTES: 2 (ME, ALSO ME)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 24, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: 'pisces', cap: 'Cried planning it. | *Already nostalgic.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 880, 260, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => { x.fillStyle = SKYB; x.fillRect(-100, -120, 200, 160); x.fillStyle = GOLD; x.beginPath(); x.arc(40, -70, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5fd068'; x.fillRect(-100, 0, 200, 40); txt(x, 'us, someday', 0, 90, { size: 26, weight: 700 }) })
      label(x, 790, 650, 'SO GRATEFUL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.04, ...M })
      hearts(x, t, 380, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2t0234', key: 'D', accent: ACC, ending: 'lesson',
  title: 'The signs planning | *a group trip.*',
  cameos: CAMEOS,
  group: { cap: 'Trip status: | *still planning.*' },
  lesson: { text: 'Go anywhere. | *Just go together.*', chip: 'STATUS: PACKED' },
  last: { text: 'Aries is already | *at the airport.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
