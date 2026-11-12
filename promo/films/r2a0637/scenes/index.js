// r2a0637: star_advice, ADVICE SOLO (aquarius), "Aquarius, you can | *care out loud.*" (signs3kit social cut, music:
// lofi · F). Nine gentle truths for an Aquarius who cares in quiet, inventive ways, each with a warm reframe and one light
// gag. Ending: lesson.
//   know every birthday, send the card · fixed the wifi as a hug, hugs work too · a meme that means "miss you", just say
//   it · felt something big, not a glitch · soup says "I care", words can too · a match asks how you feel, you can answer
//   · love your friends quietly? loud is allowed (megaphone) · hug.exe, practice counts · gave a friend a named rock, that's love
//   group "Big brain. | *Bigger heart.*"  lesson "Your care is real. | Let it be *heard.*"  HEART: ONLINE
//   last "Say it once. | *Out loud.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, steam, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const ROCK = ['..SSSS..', '.SSSSSS.', 'SSKSSKSS', 'SSSSSSSS', 'SSSPPSSS', '.SSSSSS.']

const CAMEOS = [
  { sign: S, cap: 'Know every birthday? | *Send the card.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 790, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 360, h: 360, head: 'BIRTHDAYS.CSV', headBg: SKYB, headInk: INK, lines: ['ana · mar 3', 'joe · jun 9', 'kim · oct 21', '(+45 more)'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      bits(x, 'GIFT', 800, 1080, 12 * pop01(t, P.t0 + 1.5, 0.3, 2.2))
    } },
  { sign: S, cap: 'Fixed their wifi as a hug? | *Hugs work too.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 800, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      L(x, 800, 880, 'WIFI: 5 BARS', pop01(t, P.t0 + 0.6, 0.3, 2), MINT, 0.04, 36)
      friend(x, t, 'cancer', 800, 1090, 160, pop01(t, P.t0 + 1.1, 0.3, 2), { mood: 'heart' })
      hearts(x, t, 900, 1040, P.t0 + 1.4, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Sent a meme? | *Say “miss you.”*', mood: lt => lt > 1.4 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 850, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: SKYB, size: 30,
        lines: [['[frog meme]', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), true], ['miss u!', PINK, pop01(t, P.t0 + 1.4, 0.25, 2), true], ['MISS U 2!!', MINT, pop01(t, P.t0 + 1.9, 0.25, 2), false]] })
    } },
  { sign: S, cap: 'Felt something big? | It’s *not a glitch.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.2, 'ERROR: FEELINGS', 'FEELINGS: NORMAL', { size: 36, fromBg: RED, toBg: MINT })
      hearts(x, t, 800, 1000, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 7 })
    } },
  { sign: S, cap: 'Your soup says “I care.” | *Words can too.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 880, { n: 3 })
      bubble(x, 800, 680, 'i care about you', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Asked how you feel? | *You can answer.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.5, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: LIBRA', headCol: PINK, size: 28,
        lines: [['how r u?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['define “feel”', STEEL, pop01(t, P.t0 + 0.8, 0.25, 2) * (lt < 1.4 ? 1 : 0), true], ['happy :)', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Love friends quietly? | *Loud is allowed.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 640, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 830, 760, 'I LOVE | MY FRIENDS!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      sparkles(x, t, 830, 760, P.t0 + 1.05, 8, 230, 0.2)
    } },
  { sign: S, cap: 'Hugs feel like a robot’s? | *Practice counts.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.1)
      L(x, 800, 660, p < 1 ? `HUG.EXE ${Math.floor(p * 100)}%` : 'HUG.EXE ✓', pop01(t, P.t0 + 0.2, 0.3, 2), p < 1 ? STEEL : MINT, -0.04, 36)
      x.save(); x.fillStyle = INK; x.fillRect(640, 750, 320, 40); x.fillStyle = SKYB; x.fillRect(646, 756, 308 * p, 28); x.restore()
      friend(x, t, 'leo', 800, 1000, 170, pop01(t, P.t0 + 1.3, 0.3, 2), { mood: 'sparkle' })
    } },
  { sign: S, cap: 'Gifted a named rock? | *That’s love.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROCK, { S: STEEL, K: INK, P: PINK }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'THIS IS GARY', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, -0.05, 38)
      L(x, 800, 1110, 'GARY: TREASURED', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0637', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarius, you can | *care out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Big brain. | *Bigger heart.*', mood: 'heart' },
  lesson: { text: 'Your care is real. | Let it be *heard.*', chip: 'HEART: ONLINE' },
  last: {
    text: 'Say it once. | *Out loud.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
