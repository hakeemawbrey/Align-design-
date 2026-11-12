// r2t0688: star_talk, ROLLCALL, "The signs on | *a hot air balloon.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme version of itself up in a balloon:
//   ♈ made the pilot race the other balloon · ♉ packed lunch for six (for one) · ♊ live-narrated to three group chats
//   · ♋ homesick at ten feet · ♌ waved at the crowd below (three cows) · ♍ edited the safety manual
//   · ♎ left side or right side? landed · ♏ read the pilot's birth chart first · ♐ next stop: the moon
//   · ♑ answered emails at altitude · ♒ asked a bird its sign · ♓ the view was too pretty, sobbed the whole flight.
// Ending: lesson. group "Everyone landed. | *Eventually.*" · lesson · "Next ride? | *Pack tissues.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }
const BALLOON = ['...RRRRR...', '..RRYYYRR..', '.RRYYYYYRR.', 'RRYYRRRYYRR', 'RRYYRRRYYRR', 'RRYYRRRYYRR', '.RRYYYYYRR.', '..RRYYYRR..', '...RRYRR...', '....K.K....', '....K.K....', '....BBB....', '....BBB....']
const balloon = (x, cx, cy, cell, cols = { R: RED, Y: GOLD }) => drawBits(x, BALLOON, { ...cols, K: INK, B: '#c98f5a' }, cx, cy, cell)
const BIRD = ['.WW....', 'WWWW..W', '.WWWWWW', '..WWWW.', '...Y...']
const COW = ['K.....K', 'WWKWWWW', 'WWWWKKW', 'WKWWWWW', 'W.W.W.W']

const CAMEOS = [
  { sign: 'aries', cap: 'Made the pilot | *race the other balloon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6],
    front(x, t, lt, P) {
      balloon(x, lerp(860, 760, ease.inOutCubic(prog(lt, 0.4, 1.6))), 820, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { R: LAV, Y: SKYB })
      bubble(x, 760, 620, 'faster!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 1100, 'RACE: ARIES WON', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Packed lunch for six. | *For one Taurus.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['SANDWICH', 'PIZZA', 'COOKIE', 'APPLE'].forEach((n, i) => bits(x, n, 700 + (i % 2) * 200, 780 + Math.floor(i / 2) * 170, 11 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)))
      L(x, 800, 1100, 'SNACK 1 OF 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Live-narrated the ride | to *three group chats.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '3 CHATS', headCol: GOLD, lines: [['UP HIGH!!', PINK, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['a CLOUD', PINK, pop01(t, P.t0 + 0.8, 0.2, 2), true], ['another cloud', PINK, pop01(t, P.t0 + 1.2, 0.2, 2), true], ['ok we get it', MINT, pop01(t, P.t0 + 1.7, 0.2, 2), false]], size: 24 })
    } },
  { sign: 'cancer', cap: 'Got homesick | *ten feet up.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 1010, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'miss you, house', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      L(x, 800, 860, 'ALTITUDE: 10 FT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Waved at the crowd below. | *Three cows.*', mood: 'sparkle', look: [1, 1], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, COW, { K: INK, W: BONE }, 690 + i * 110, 1010 + (i % 2) * 20, 12 * pop01(t, P.t0 + 0.5 + i * 0.12, 0.3, 2))
      bubble(x, 790, 680, 'thank you, fans!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 860, 'FANS: 3 COWS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Read the safety manual. | *Edited it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'SAFETY', headBg: MINT, headInk: INK, lines: ['hold on', ['their → there', '#c2185b'], ['add a comma', '#c2185b'], ['nice font ✓', '#2f8a48']], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.1) })
      L(x, 800, 1100, 'TYPOS FIXED: 14', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Left side or right side? | *We landed.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.6) L(x, 800, 800, Math.floor(lt * 2.5) % 2 ? 'RIGHT?' : 'LEFT?', pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.04, 54)
      else L(x, 800, 800, 'LANDED.', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 54)
    } },
  { sign: 'scorpio', cap: 'Read the pilot’s birth chart | *before boarding.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 840, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1080, 'PILOT: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Skip the landing? | Next stop: *the moon.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [-1, -1], star: { x: 170 }, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'MOON', 330, 760, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 330, 760, P.t0 + 0.7, 7, 140, 0.5)
      L(x, 330, 1020, 'DESTINATION: UP', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Answered emails | *at altitude.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 330, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 330, 680, 'INBOX: 0', pop01(t, P.t0 + 1.0, 0.3, 2), MINT, 0.04, 36)
      L(x, 330, 1060, 'VIEW: UNSEEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), STEEL, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Asked a passing bird | *its sign.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BIRD, { W: BONE, Y: GOLD }, 830 + Math.sin(t * 2) * 20, 760 + Math.sin(t * 5) * 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 760, 620, 'what’s your sign?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1000, 'BIRD: GEMINI', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 36)
    } },
  { sign: 'pisces', cap: 'The view was too pretty. | *Sobbed the whole flight.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 800, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TISSUE', 800, 980, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1110, 'TISSUES: 0 LEFT', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0688', key: 'G', accent: ACC, ending: 'lesson',
  title: 'The signs on | *a hot air balloon.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone landed. | *Eventually.*' },
  lesson: { text: 'Same sky, twelve views. | *All worth the ride.*', chip: 'VIEW: SHARED' },
  last: { text: 'Next ride? | *Pack tissues.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
