// r2t0597: star_talk, BELIKE, "Zodiacs + gossip | *be like.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme version of itself when the tea arrives:
//   ♈ confronted everyone · ♉ brought snacks, stayed · ♊ forwarded it six times mid-sentence · ♋ sad for everyone
//   · ♌ "is it about me?" · ♍ fact-checked it, with sources · ♎ heard both sides, now friends with both · ♏ knew since Tuesday
//   · ♐ sent it to the wrong chat · ♑ "no comment", took notes · ♒ a whole theory board · ♓ cried, doesn't know them
// Ending: lesson ("Be the friend who | keeps it *kind.*") then "Anyway… | *did you hear?*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -160 }

const CAMEOS = [
  { sign: 'aries', cap: 'Heard one rumour. | *Confronted* everyone.', mood: lt => lt > 0.8 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 820, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      bubble(x, 780, 660, 'WHO SAID IT?!', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 46, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1100, 'MEETING IN 5 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Brought snacks. | *Stayed* for the tea.', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 760, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.5) steam(x, t, 750, 830)
      bits(x, 'COOKIE', 900, 940, 13 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1100, 'PULLED UP A CHAIR', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Told six people. | *Before* you finished.', mood: 'wink', look: [1, 0], star: ST, hops: [0.6, 1.0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FORWARDING…', headCol: SKYB, size: 22, lines: [0, 1, 2, 3, 4].map(i => [`sent ✓ #${i + 1}`, i % 2 ? BONE : SKYB, pop01(t, P.t0 + 0.4 + i * 0.22, 0.2, 2.2), i % 2 === 1]) })
      bubble(x, 520, 640, 'so anyway—', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Feels terrible for | *everyone involved.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], tears: lt => lt > 1.0 ? 1 : 0, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 820, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'MAKING THEM SOUP', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Wait. Is it | *about me?*', mood: lt => lt > 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P, F) {
      bubble(x, 800, 720, 'ME??', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 70, col: GOLD, tail: 'bl' })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.4, 7, 170, 0.4)
      swapLabel(x, 800, 1060, lt, 1.2, 'ABOUT LEO?', 'NOT ABOUT LEO', { size: 36, fromBg: GOLD, toBg: STEEL })
    } },
  { sign: 'virgo', cap: 'Fact-checked it. | With *sources.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 300, head: 'SOURCES', headBg: MINT, headInk: INK, align: 'left', size: 30, lines: ['1. saw it? no', '2. heard? 3rd hand', '3. likely? nope'], progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1090, 'VERDICT: FALSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Heard both sides. | Now *friends with both.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 720, 880, 160, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'happy', look: [1, 0] })
      friend(x, t, 'capricorn', 900, 880, 160, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 38 })
      hearts(x, t, 810, 780, P.t0 + 1.0, { n: 5, life: 1.5, spread: 200, cell: 6, seed: 2 })
      L(x, 810, 1080, 'COMPATIBLE: ALL OF US', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Already knew. | *Since Tuesday.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 820, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 760, 690, 'old news.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      L(x, 800, 1090, 'TEA: ALREADY COLD', pop01(t, P.t0 + 1.4, 0.3, 2.4), STEEL, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Sent it to | the *wrong chat.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt > 1.1 ? 'CHAT: THEM' : 'CHAT: BESTIES', headCol: lt > 1.1 ? '#ff6b5a' : MINT, size: 22, lines: [['omg did u hear', BONE, pop01(t, P.t0 + 0.4, 0.2, 2.2)], ['…hi.', '#ff6b5a', pop01(t, P.t0 + 1.2, 0.2, 2.2), true]] })
      L(x, 800, 1120, 'OOPS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 44)
    } },
  { sign: 'capricorn', cap: '“No comment.” | *Took notes.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 560, 650, 'no comment.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      sheet(x, 830, 880, pop01(t, P.t0 + 0.6, 0.35, 2), { w: 290, h: 250, head: 'MINUTES', headBg: STEEL, headInk: INK, align: 'left', size: 28, lines: ['10:02 the tea', '10:04 more tea', '10:05 wow'], progress: clamp((lt - 0.7) / 0.8) })
    } },
  { sign: 'aquarius', cap: 'Built a whole | *theory board.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 850, k, { w: 340, h: 320, head: 'THEIR BIRTH CHARTS', headBg: SKYB, headInk: INK, lines: [] })
      if (k > 0.9) {
        const pins = [[690, 820], [900, 800], [740, 960], [880, 960], [800, 880]]
        const n = Math.floor(clamp((lt - 0.4) / 1.0) * 6)
        x.save(); x.strokeStyle = RED; x.lineWidth = 5
        for (let i = 0; i < Math.min(n, 4); i++) { x.beginPath(); x.moveTo(...pins[4]); x.lineTo(...pins[i]); x.stroke() }
        x.restore()
        pins.forEach(([px, py]) => { x.fillStyle = INK; x.fillRect(px - 12, py - 12, 24, 24); x.fillStyle = RED; x.fillRect(px - 8, py - 8, 16, 16) })
      }
      L(x, 800, 1100, 'IT’S ALL CONNECTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cried about it. | Doesn’t *know them.*', mood: 'wide', look: [1, 0], tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 830, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, 'WHO EVEN IS THAT?', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0597', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Zodiacs + gossip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One* group chat.' },
  lesson: { text: 'Be the friend who | keeps it *kind.*', chip: 'STATUS: SAFE TO TELL' },
  last: { text: 'Anyway… | *did you hear?*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
