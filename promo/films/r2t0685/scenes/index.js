// r2t0685: star_talk, SOLO (gemini), "Geminis keeping a secret | *be like.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine attempts at keeping one secret, each more doomed than the last.
// Ending: group (the punchline: "Your secret's safe. | *Ish.*").
//   told their twin (technically themselves) · held it 59 minutes, a record · hinted in eleven group chats
//   · "I can't say…" then said everything · lips taped, eyebrows talking · changed the subject, back to the secret
//   · wrote it in a diary, read it aloud · charades: acted out the secret · kept it! from one person
//   group "Your secret’s safe. | *Ish.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Told their twin. | *Technically, themselves.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 800, 940, 240, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 70 })
      bubble(x, 560, 650, 'psst…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'br' })
      bubble(x, 820, 680, 'i KNEW it', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Kept it a whole hour. | *Personal record.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = Math.round(lerp(41, 59, ease.outCubic(prog(lt, 0.3, 1.3))))
      L(x, 800, 1080, lt > 1.4 ? 'NEW RECORD: 59 MIN' : `HELD: ${m} MIN`, pop01(t, P.t0 + 0.4, 0.3, 2), lt > 1.4 ? GOLD : BONE, 0.04, 34)
      bits(x, 'TROPHY', 940, 640, 7 * pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.4))
    } },
  { sign: S, cap: 'Didn’t tell anyone. | *Hinted in eleven chats.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(11, Math.floor(Math.max(0, lt - 0.2) * 7) + 1)
      phone(x, t, 800, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `CHAT ${n} OF 11`, headCol: ACC, lines: [['not saying', BONE, 1, true], ['anything…', BONE, 1, true], ['but… !!', BONE, pop01(t, P.t0 + 0.9, 0.25, 2), true]], size: 28 })
    } },
  { sign: S, cap: '“I can’t say.” | *Then said everything.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (lt < 1.0) bubble(x, 800, 760, 'i can’t say', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      else bubble(x, 800, 820, 'OK SO basically | it started when | and THEN…', pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1110, 'DETAILS: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Mouth taped shut. | *Eyebrows still talking.*', mood: 'neutral', look: lt => [Math.sin(lt * 6) > 0 ? 1 : -1, Math.sin(lt * 9) > 0 ? -1 : 0], star: ST, hideStar: false,
    front(x, t, lt, P, F) {
      if (lt > 0.4) bits(x, 'TAPE', F.x, F.cy + 28, 11, { rot: -0.15 })
      for (let i = 0; i < 2; i++) { const up = Math.max(0, Math.sin(t * 10 + i)) * 14; x.fillStyle = INK; x.fillRect(F.x - 70 + i * 90, F.cy - 70 - up, 46, 12) }
      L(x, 800, 860, 'CODE: WIGGLE', pop01(t, P.t0 + 0.9, 0.3, 2.2), ACC, 0.05, 40)
      bubble(x, 800, 1060, 'mmph mmph!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Changed the subject. | *Back to the secret.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const TOP = ['WEATHER', 'LUNCH', 'THE SECRET']
      const n = lt < 0.7 ? 0 : lt < 1.2 ? 1 : 2
      L(x, 800, 820, `TOPIC: ${TOP[n]}`, pop01(t, P.t0 + 0.2, 0.3, 2), n === 2 ? PINK : SKYB, (n % 2 ? 0.05 : -0.05), 40)
      L(x, 800, 1060, 'TIME AWAY: 4 SEC', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: S, cap: 'Wrote it in a diary. | *Read it out loud.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'MY DIARY', headBg: LAV, headInk: INK, lines: ['the secret:', 'shh!!'], size: 38 })
      bits(x, 'LOCK', 930, 780, 8 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 800, 650, '“dear diary…”', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1110, 'AUDIENCE: 14', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Game night charades. | *Acted out the secret.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      L(x, 800, 660, 'SOUNDS LIKE…', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.04, 40)
      friend(x, t, 'libra', 700, 1000, 140, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 71 })
      friend(x, t, 'cancer', 880, 1000, 140, pop01(t, P.t0 + 0.75, 0.3, 2), { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 72 })
      bubble(x, 790, 850, 'WAIT. WHAT?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Kept the secret! | *…from one person.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 700, 'KEPT FROM: 1', pop01(t, P.t0 + 0.2, 0.3, 2), MINT, 0.04, 40)
      L(x, 800, 860, 'TOLD: EVERYONE ELSE', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 800, 1020, '(IT WAS ABOUT THEM)', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, 0.03, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0685', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Geminis keeping | a secret *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Your secret’s safe. | *Ish.*', mood: 'wink' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
