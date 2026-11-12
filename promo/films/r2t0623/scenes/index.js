// r2t0623: star_talk, BELIKE, "Zodiacs leaving | *be like.*" (batch topic "Zodiacs when it's time to leave | be like.",
// tightened to fit two lines) (signs3kit social cut, music: lofi · G). Ending: callback.
//   ♈ already home, texted bye from bed · ♉ said "leaving", sat back down (attempt 3) · ♊ the goodbye took ninety minutes
//   · ♋ sent everyone home with snacks · ♌ announced the exit, waited for applause · ♍ did everyone's dishes first
//   · ♎ held a vote · ♏ gone, no goodbye · ♐ "heading home", now at party two · ♑ exit booked in March
//   · ♒ left through the window · ♓ sobbed at the goodbye (see you tomorrow)
//   group "Twelve signs. | *Zero clean exits.*"
//   last "Gemini is | *still saying bye.*" (card 3, paid off)
import { makeFilm, notes, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }
const WINDOW = ['KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KSSSSKSSSSSK', 'KKKKKKKKKKKK']
const BOXF = ['.KKKKKK.', 'KMMMMMMK', 'KMMMMMMK', 'KKKKKKKK']

const CAMEOS = [
  { sign: 'aries', cap: 'Already home. | Texted *“bye”* from bed.', mood: 'sparkle', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 1080, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      phone(x, t, 800, 800, pop01(t, P.t0 + 0.4, 0.3, 2), { head: 'PARTY CHAT', headCol: '#ff6b5a', lines: [['where’d aries go', BONE, 1, false], ['bye!! (home)', '#ff6b5a', pop01(t, P.t0 + 1.2, 0.25, 2), true]] })
    } },
  { sign: 'taurus', cap: 'Said “leaving.” | *Sat back down.*', mood: 'happy', star: { x: -170, y: 30 },
    front(x, t, lt, P) {
      bits(x, 'COUCH', 760, 1040, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, `ATTEMPT ${1 + Math.floor(clamp((lt - 0.3) / 1.4) * 2)}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.05, 44)
    } },
  { sign: 'gemini', cap: 'The goodbye took | *ninety minutes.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'okay bye!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 860, 'oh, one more thing', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
      bubble(x, 790, 1050, 'wait, your sign?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Sent everyone home | *with snacks.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.25) + 1)
      for (let i = 0; i < n; i++) drawBits(x, BOXF, { K: INK, M: ['#ff9a4a', MINT, PINK, SKYB, GOLD][i] }, 800 + (i % 2 ? 20 : -20), 1120 - i * 70, 18)
      L(x, 800, 650, 'ONE PER GUEST', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Announced the exit. | Waited for *applause.*', mood: 'sparkle', star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'I’M LEAVING.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 920, '…APPLAUSE?', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 44)
      sparkles(x, t, 800, 920, P.t0 + 1.7, 7, 170, 0.6)
    } },
  { sign: 'virgo', cap: 'Couldn’t leave | until the *dishes were done.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.22) + 1)
      for (let i = 0; i < n; i++) bits(x, 'PLATE', 800, 1120 - i * 48, 14)
      L(x, 800, 700, 'EVERYONE’S.', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 40)
    } },
  { sign: 'libra', cap: 'Can’t leave | *without a vote.*', mood: 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 270, head: 'SHOULD I GO?', headBg: PINK, headInk: INK, lines: ['YES: 4', 'NO: 4', 'RECOUNT…'], size: 34, progress: clamp((lt - 0.4) / 1.2) })
    } },
  { sign: 'scorpio', cap: 'Gone. No goodbye. | *Somehow iconic.*', mood: 'wink', look: [-1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      bits(x, 'DOORX', 760, 870, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 610, 'where’d scorpio go?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      L(x, 760, 1150, 'DOOR: STILL SWINGING', pop01(t, P.t0 + 1.6, 0.3, 2.2), '#c97bff', 0.04, 28)
    } },
  { sign: 'sagittarius', cap: '“Heading home.” | Now at *party two.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      swapLabel(x, 800, 780, lt, 1.0, 'HOME', 'PARTY #2', { size: 56, fromBg: BONE, toBg: '#c97bff' })
      if (lt > 1.3) notes(x, t, 800, 1100, { n: 4, cell: 8, col: '#c97bff', seed: 3 })
    } },
  { sign: 'capricorn', cap: 'Left at nine sharp. | *Booked it in March.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1070, 'EXIT: 21:00', pop01(t, P.t0 + 1.1, 0.3, 2.2), STEEL, 0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Left through | *the window.*', mood: 'wink', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, WINDOW, { K: INK, S: SKYB }, 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'DOOR? MAINSTREAM.', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#6fc3ff', -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Sobbed at the goodbye. | *See them tomorrow.*', mood: 'wide', tears: 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'i’ll miss u', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 780, 960, 'SEE YOU: 10 AM', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 30)
      bits(x, 'TISSUE', 800, 1120, 12 * pop01(t, P.t0 + 1.6, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0623', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs leaving | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero clean exits.*' },
  last: {
    text: 'Gemini is | *still saying bye.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 420, 1150, 280 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'happy', seed: 12, hops: [t - lt + 0.9], glyph: true })
      bubble(x, 720, 920, 'okay, LAST thing', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
