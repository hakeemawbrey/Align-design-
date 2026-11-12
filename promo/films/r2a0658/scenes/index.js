// r2a0658: star_advice, ADVICE SOLO (leo), "The right people | *stay, Leo.*" (signs3kit social cut, music: lofi · C).
// Nine relatable Leo truths, each with a warm reframe and one light gag. Ending: callback.
//   too loud? your people turn it up · gave your all (a gift comes back) · need a little praise (gold stars)
//   · someone walked away (someone new walks in) · hosting again (let them bring dessert) · loudest cheer for a friend
//   (megaphone) · scared of being forgotten (thought of you ×14) · hiding a bad day (a friend brings an umbrella)
//   · want a forever crew (already here).
//   group "The real ones | *stay.*", then "Now they cheer | *for you.*" (the megaphone, turned around).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, rain, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Worried you’re too loud? | *Your people turn it up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const v = lt < 1.2 ? 10 : 11
      L(x, 800, 720, `VOLUME: ${v}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), lt < 1.2 ? STEEL : GOLD, 0.04, 44)
      bubble(x, 800, 940, 'louder, leo!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      sparkles(x, t, 800, 720, P.t0 + 1.25, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Gave your all? | *The right ones give back.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 0.4, 0.9))
      bits(x, 'GIFT', lerp(560, 800, go), 860, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'GIFT', 860, lerp(500, 980, ease.outCubic(prog(lt, 1.1, 1.5))), 14 * (lt > 1.1 ? 1 : 0), { rot: 0.1 })
      L(x, 800, 1110, 'ONE CAME BACK ♡', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Need a little praise? | *That’s just human.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2.4); if (k > 0.01) drawPixelStar(x, 680 + (i % 3) * 120, 760 + Math.floor(i / 3) * 160, 120 * k, 3, GOLD) }
      L(x, 800, 1090, 'GOLD STARS: EARNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Someone walked away? | *Room for who stays.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(820, 880); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -210, 220, 420); x.fillStyle = '#8a4a2e'; x.fillRect(-100, -200, 200, 400); x.fillStyle = '#fff1b0'; x.fillRect(-100, -200, 200 * clamp(prog(lt, 0.8, 1.2)) * 0.85, 400); x.restore() }
      if (lt > 1.0) friend(x, t, 'sagittarius', 800, 920, 170, pop01(t, P.t0 + 1.0, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 800, 620, 'hi! saved me a seat?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Hosting again? | *Let them bring dessert.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 880, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 660, 'HOST: ON BREAK', pop01(t, P.t0 + 0.3, 0.3, 2.2), LAV, 0.04, 34)
      L(x, 800, 1100, 'BROUGHT BY: FRIEND', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Friend did a thing? | *Loudest cheer. Always.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 190, F.cy, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      bubble(x, 800, 660, 'THAT’S MY FRIEND!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      L(x, 800, 1090, 'CROWD: JUST LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Scared they’ll forget you? | *Not a chance.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FRIENDS', headCol: GOLD, lines: [['saw this,', MINT, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['thought of u', MINT, pop01(t, P.t0 + 0.8, 0.2, 2), false], ['same!!', PINK, pop01(t, P.t0 + 1.1, 0.2, 2), false], ['miss u leo', SKYB, pop01(t, P.t0 + 1.4, 0.2, 2), false]], size: 28 })
      hearts(x, t, 810, 780, P.t0 + 1.6, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Hiding a bad day? | *Let them in.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOUD', 560, 620, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt < 1.2) rain(x, t, 560, 650, { w: 180, h: 260, alpha: 1 })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      friend(x, t, 'taurus', 820, 950, 170, k, { mood: 'happy', look: [-1, 0] })
      if (k > 0.01) bits(x, 'UMB', lerp(820, 600, ease.inOutCubic(prog(lt, 1.1, 1.5))), 740, 16 * k)
      L(x, 800, 1110, 'SHARED UMBRELLA', pop01(t, P.t0 + 1.7, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Want a forever crew? | *They’re already here.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['cancer', 'gemini', 'libra'].forEach((id, i) => friend(x, t, id, 690 + i * 120, 900 - (i % 2) * 50, 130, pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { mood: 'happy', look: [-1, 0] }))
      L(x, 800, 690, 'STATUS: STAYING', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 34)
      hearts(x, t, 800, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0658', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'The right people | *stay, Leo.*',
  cameos: CAMEOS,
  group: { cap: 'The real ones | *stay.*', mood: 'heart' },
  last: {
    text: 'Now they cheer | *for you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 540, 1060, 300 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 7, hops: [t0 + 1.25] })
      ;[['cancer', 200, -1], ['taurus', 880, 1]].forEach(([id, fx, d], i) => {
        const kk = pop01(t, t0 + 0.5 + i * 0.2, 0.35, 2)
        friend(x, t, id, fx, 1160, 170, kk, { mood: 'sparkle', look: [-d, 0] })
        if (kk > 0.01) drawBits(x, ['......RR', '....RRRR', 'KKRRRRRR', 'KKRRRRRR', '....RRRR', '......RR'], { R: RED, K: INK }, fx - d * 105, 1110, 12 * kk, { sx: -d, rot: d * 0.2 })
      })
      bubble(x, 540, 780, 'LEO!! LEO!!', pop01(t, t0 + 1.1, 0.25, 2.2), { size: 48, col: GOLD, tail: 'bc' })
      hearts(x, t, 540, 1300, t0 + 1.3, { n: 8, life: 2.2, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
