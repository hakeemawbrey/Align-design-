// r2t0549: star_talk, SOLO (capricorn), "First date with | *a Capricorn.*" (signs3kit social cut, music: lofi · D).
// Nine cards, each the most extreme Capricorn on a first date. Ending: card (lesson + last line over the match card:
// Capricorn + Cancer, the match who got the calendar invite in card 7).
//   early, with an agenda · asks your five-year plan · splits the bill to the cent · asks for references · brought a
//   pros and cons list · date ends at 9, work at 6 · follows up with a calendar invite · compatibility spreadsheet
//   · smiled once (highest honour)
//   group "Romance, | *but efficient.*"  lesson "Slow to smile. | *Loyal for life.*"  COMMITMENT: FULL
//   last "Date two? | *Already scheduled.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Twenty minutes early. | *With an agenda.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'AGENDA', headBg: STEEL, headInk: INK, lines: ['7:00 hello', '7:05 small talk', '7:20 big talk', '8:59 goodbye'], size: 28, align: 'left', progress: clamp(lt / 1.4) })
      L(x, 800, 1110, 'ARRIVED: 6:40', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'First question: | *your five-year plan.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'where do you | see yourself | in 5 years?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1060, 'INTERVIEW MODE', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: S, cap: 'Split the bill | *to the cent.*', mood: 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'BILL', headBg: GOLD, headInk: INK, lines: ['total 47.30', '÷ 2', '= 23.65 each'], size: 32, progress: clamp(lt / 1.2) })
      L(x, 800, 1100, 'TIP: CALCULATED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Asked you | *for references.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 280, head: 'REFERENCES', headBg: LAV, headInk: INK, lines: ['1. ________', '2. ________', '3. ________'], size: 32 })
      L(x, 800, 1100, '3 REQUIRED', pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, -0.04, 34)
    } },
  { sign: S, cap: 'Brought a | *pros and cons list.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'YOU', headBg: MINT, headInk: INK, lines: [['+ kind', '#2f9a4a'], ['+ funny', '#2f9a4a'], ['+ on time', '#2f9a4a'], ['− ordered soup', RED]], size: 30, align: 'left', progress: clamp(lt / 1.4) })
      L(x, 800, 1110, 'UNDER REVIEW', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Date ends at nine. | *Work at six.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1070, 'BEDTIME: 9:01', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 36)
    } },
  { sign: S, cap: 'Followed up | *with a calendar invite.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: CANCER', headCol: SKYB, lines: [['INVITE: date #2', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['tues 7:00pm', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true], ['accept? y/n', BONE, pop01(t, P.t0 + 1.1, 0.25, 2.2), true], ['…yes?', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2)]], size: 22 })
    } },
  { sign: S, cap: 'Checked compatibility. | *Made a spreadsheet.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 720, 760, 100, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      sheet(x, 840, 940, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 260, h: 200, head: 'TAB 1 OF 4', headBg: '#4fbf6a', headInk: INK, lines: ['♑︎ + ♋︎', 'promising'], size: 30, rot: 0.04 })
    } },
  { sign: S, cap: 'Smiled once. | *Highest honour.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 850, 20 * pop01(t, P.t0 + 0.9, 0.35, 2))
      sparkles(x, t, 400, 860, P.t0 + 1.0, 8, 190, 0.2)
      L(x, 800, 1070, 'SMILE: RARE', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0549', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'First date with | *a Capricorn.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'cancer', chip: 'IT’S A MATCH' },
  group: { cap: 'Romance, | *but efficient.*', mood: 'neutral' },
  lesson: { text: 'Slow to smile. | *Loyal for life.*', chip: 'COMMITMENT: FULL' },
  last: { text: 'Date two? | *Already scheduled.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
