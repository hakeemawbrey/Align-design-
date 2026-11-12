// r2t0710: star_talk, SOLO (sagittarius), "Your Sag coworker | *be like.*" (the batch hook "Your Sagittarius coworker", shortened so it fits two lines) (signs3kit social cut, lofi · F).
// One sign the whole way: nine office moments, each the most extreme free-spirited, blunt, loud Sagittarius version.
// Ending: callback (card 8's out-of-office reply comes back, still on).
//   today's office: another country · hit reply-all with a joke · asked for feedback, got the whole truth
//   · desk covered in postcards · lunch break became a road trip · signed up for every office event · laughs loudest
//   on every call, muted by host · out-of-office: "gone. back maybe." · snacks from four countries for the team
//   group "Fun. Honest. | *Never at their desk.*"   last "Back from the trip? | *Still “gone.”*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', S = 'sagittarius', ST = { x: -190 }
const ooo = (x, cx, cy, k, extra = false) => sheet(x, cx, cy, k, { w: 330, h: 300, rot: 0.04, head: 'AUTO-REPLY', headBg: ACC, headInk: INK, size: 30,
  lines: extra ? ['gone. back maybe.', ['(still on)', '#b03a4a']] : ['gone.', 'back maybe.'] })

const CAMEOS = [
  { sign: S, cap: 'Today’s office? | *Another country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 990, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SUN', 900, 720, 10 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 760, 810, 'WIFI: BEACH_GUEST', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.05, 28)
      L(x, 800, 1110, 'STANDUP: FROM A HAMMOCK', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 24)
    } },
  { sign: S, cap: 'Hit reply-all. | *With a joke.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'RE: Q3 BUDGET', headCol: STEEL, size: 22, lines: [
        ['knock knock', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2), true], ['…who’s there?', BONE, pop01(t, P.t0 + 1.1, 0.25, 2), false], ['the budget', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
      L(x, 800, 650, 'CC: 400 PEOPLE', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Asked for feedback? | *Got the whole truth.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'honestly? | slide 3 is a nap', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 960, 'ROOM: SILENT', pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, 0.05, 34)
      L(x, 800, 1090, '(THEY WERE RIGHT)', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Their desk? | *Covered in postcards.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const C = [PINK, SKYB, GOLD, MINT, LAV, '#ff9a4a']
      for (let i = 0; i < 6; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2)
        if (k < 0.01) continue
        x.save(); x.translate(700 + (i % 3) * 100, 820 + Math.floor(i / 3) * 140); x.rotate(((i * 37) % 7 - 3) * 0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-50, -36, 100, 72); x.fillStyle = C[i]; x.fillRect(-44, -30, 88, 60); x.fillStyle = BONE; x.fillRect(16, -22, 20, 22)
        x.restore()
      }
      L(x, 800, 1110, 'DESK: SOMEWHERE UNDER', pop01(t, P.t0 + 1.6, 0.3, 2.2), CREAM, 0.04, 26)
    } },
  { sign: S, cap: 'Lunch break | *became a road trip.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      swapLabel(x, 800, 700, lt, 1.0, 'BACK AT 1:00', 'BACK AT 1:00 (THURSDAY)', { size: 28, fromBg: CREAM, toBg: GOLD })
    } },
  { sign: S, cap: 'Signed up for | *every office event.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'SIGN-UP SHEET', headBg: MINT, headInk: INK, align: 'left', size: 26,
        lines: ['kayak day: sag', 'trivia: sag', 'bake-off: sag', 'safety talk: sag'], progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1110, 'ALSO STARTED TWO', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Laughs the loudest | *on every call.*', mood: 'squint', star: ST, hops: [0.6, 0.9, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'HAHAHA', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 54, tail: 'bl' })
      L(x, 800, 1000, 'MUTED BY HOST', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.05, 36)
    } },
  { sign: S, cap: 'Their out-of-office? | *“Gone. Back maybe.”*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ooo(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PLANE', 900, 1100, 14 * pop01(t, P.t0 + 1.2, 0.3, 2), { rot: -0.3 })
    } },
  { sign: S, cap: 'Brought snacks | *from four countries.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const items = ['COOKIE', 'PIZZA', 'APPLE', 'SANDWICH']
      items.forEach((n, i) => bits(x, n, 700 + (i % 2) * 200, 820 + Math.floor(i / 2) * 170, 11 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2)))
      L(x, 800, 1120, 'FOR THE WHOLE TEAM', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0710', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Your Sag coworker | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fun. Honest. | *Never at their desk.*', mood: 'sparkle' },
  last: {
    text: 'Back from the trip? | *Still “gone.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, S, 320, 1160, 300 * k, { mood: 'wink', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      ooo(x, 730, 1170, 1.25 * pop01(t, t - lt + 0.7, 0.4, 2), lt > 1.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
