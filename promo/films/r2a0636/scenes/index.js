// r2a0636: star_advice, ADVICE SOLO (pisces), "Pisces, you owe | *no instant replies.*" (signs3kit social
// cut, music: lofi · D). Nine gentle truths for a Pisces who answers everything at once, each with a warm reframe and one
// light gag. Pisces cries in every card (soft, relieved tears). Ending: callback.
//   read it at 2 a.m., reply at noon · a whole essay, "sounds good" works · phone at dinner, dinner wins · a nap with
//   forty unread · 300 group-chat messages, mute is kind · a match double-texts, take a breath · "no" is a full sentence
//   · you left a friend on read, they're fine · phone off for a night, peace on (the phone tucked into a tiny bed)
//   group "Soft heart. | *Slow replies.*"
//   last "The phone | *is still napping.*" (card 9, paid off: the phone back in its little bed)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, zzz, steam, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, PLUM, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fb8ff', S = 'pisces', ST = { x: -190 }
const TEARS = lt => lt > 1.2 ? 2 : 3

// the phone tucked into a tiny bed: pillow, phone lying down, blanket, z z z
function napPhone(x, t, cx, cy, k, cell = 16) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  bits(x, 'PILLOW', -110, -10, cell)
  x.save(); x.translate(10, 10); x.rotate(-Math.PI / 2)
  x.fillStyle = INK; x.fillRect(-70, -120, 140, 240); x.fillStyle = STEEL; x.fillRect(-62, -112, 124, 224); x.fillStyle = '#3a5a9a'; x.fillRect(-52, -96, 104, 192)
  x.restore()
  bits(x, 'BLANKET', 60, 40, cell)
  x.restore()
  zzz(x, t, cx + 40 * k, cy - 80 * k, { size: 44 * k })
}

const CAMEOS = [
  { sign: S, cap: 'Read it at 2 a.m.? | *Reply at noon.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      const day = lt > 1.2
      bits(x, day ? 'SUN' : 'MOON', 380, 620, 13 * pop01(t, P.t0 + (day ? 1.2 : 0.2), 0.3, 2))
      phone(x, t, 800, 900, 1.25 * pop01(t, P.t0 + 0.3, 0.3, 2), { head: day ? '12:00' : '2:00 AM', headCol: day ? GOLD : LAV, size: 30,
        lines: [['hey u up?', BONE, 1, false], ['morning! :)', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
  { sign: S, cap: 'Typed a whole essay? | *“Sounds good” works.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      const short = lt > 1.4
      if (!short) sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 470, head: 'DRAFT', headBg: LAV, headInk: INK, lines: ['so first of all', 'i just want to', 'say that i', 'totally get it', 'and also…', '(page 1 of 9)'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      else bubble(x, 800, 840, 'sounds good!', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 58, col: MINT, tail: 'bl' })
      if (short) sparkles(x, t, 800, 840, P.t0 + 1.45, 7, 200, 0.3)
    } },
  { sign: S, cap: 'Phone buzzing at dinner? | *Dinner wins.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      const buzz = lt < 1.3 ? Math.sin(t * 50) * 5 : 0
      bits(x, 'PLATE', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800 + buzz, 680, lt < 1.3 ? 'BZZ BZZ BZZ' : 'FACE DOWN', pop01(t, P.t0 + 0.4, 0.3, 2), lt < 1.3 ? RED : STEEL, -0.04, 36)
      steam(x, t, 800, 900, { n: 3 })
      if (lt > 1.6) L(x, 800, 1140, 'PASTA: HOT', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'Napping with forty unread? | *Naps are allowed.*', mood: 'sleepy', tears: 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'PILLOW', 800, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, `UNREAD: ${Math.min(40, Math.floor(clamp((lt - 0.3) / 1.0) * 40))}`, pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.05, 38)
      L(x, 800, 860, 'STATUS: COZY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.05, 34)
    } },
  { sign: S, cap: 'Group chat at 300? | *Mute is kind too.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      const muted = lt > 1.4
      phone(x, t, 800, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: muted ? 'MUTED ✓' : `${Math.floor(lerp(120, 300, clamp(lt / 1.3)))} NEW`, headCol: muted ? MINT : RED, size: 30,
        lines: [['lol', BONE, 1, false], ['LOL', PINK, 1, true], ['wait what', LAV, 1, false], ['lmaooo', GOLD, muted ? 0 : 1, true]] })
      if (muted) sparkles(x, t, 800, 700, P.t0 + 1.45, 6, 150, 0.2)
    } },
  { sign: S, cap: 'A match double-texted? | *Take a breath.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: TEARS, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCH: LEO', headCol: GOLD, size: 32,
        lines: [['hi!', BONE, pop01(t, P.t0 + 0.4, 0.25, 2), false], ['hi??', BONE, pop01(t, P.t0 + 0.8, 0.25, 2), false]] })
      L(x, 800, 1165, 'BREATHE IN… OUT…', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: S, cap: '“No, thank you” | is *a full sentence.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'no, thank you!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 50, col: BONE, tail: 'bl' })
      L(x, 800, 1000, 'GUILT: 0%', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.05, 40)
      sparkles(x, t, 800, 760, P.t0 + 0.5, 6, 220, 0.6)
    } },
  { sign: S, cap: 'Left a friend on read? | *They’re fine.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', tears: TEARS, star: ST,
    front(x, t, lt, P) {
      L(x, 800, 650, 'SEEN 3 HRS AGO', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.05, 32)
      friend(x, t, 'sagittarius', 800, 920, 230, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', hops: [P.t0 + 1.4] })
      bubble(x, 800, 1140, 'busy at a picnic!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Phone off for a night? | *Peace on.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', tears: 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      napPhone(x, t, 800, 880, pop01(t, P.t0 + 0.3, 0.35, 2), 14)
      L(x, 800, 1120, 'GOODNIGHT, PHONE', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, 0.04, 32)
      bits(x, 'MOON', 860, 620, 11 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2a0636', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Pisces, you owe | *no instant replies.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Slow replies.*', mood: 'heart' },
  last: {
    text: 'The phone | *is still napping.*',
    draw(x, t, lt) { napPhone(x, t, 540, 1150, pop01(t, t - lt + 0.6, 0.4, 2) * 1.3, 15) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
