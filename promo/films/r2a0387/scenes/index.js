// r2a0387: star_advice, ADVICE SOLO (cancer), "Cancer, soft heart | is strength." (signs3kit social cut, music: lofi · F).
// Ending: callback (the friend emergency kit comes back, this time packed for Cancer).
//   nine cards: feeling deeply · remembering every birthday · the group's emergency kit · the shell days · the ticket stubs
//   · saying sorry first · other people's storms · feeding people · soft AND strong
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, steam, zzz, friend, bits, B, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'cancer', ACC = '#c9d6ff', ST = { x: -170 }
function rain(x, t, cx, cy, w) {
  x.save(); x.fillStyle = SKYB
  for (let i = 0; i < 7; i++) { const ph = ((t * 1.4 + i * 0.37) % 1 + 1) % 1; x.fillRect(cx - w / 2 + (i / 6) * w, cy + ph * 150, 5, 16) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Cry at sweet videos? | That’s *feeling deeply.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', tears: lt => lt < 1.4 ? 1 : 0, look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'FEELINGS: VALID', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 32)
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Remember every birthday? | That’s *a gift.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'BIRTHDAYS', headBg: PINK, headInk: INK, lines: ['mom ✓', 'best friend ✓', 'neighbour’s cat ✓', 'your dentist ✓'], size: 28, align: 'left', progress: (lt - 0.4) / 1.0 })
      L(x, 790, 1100, 'NEVER MISSED ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'The group’s mom-friend? | They’re *lucky* to have you.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'BAG', 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const items = [['PLASTERS', MINT], ['SNACKS', GOLD], ['SPARE SOCKS', SKYB]]
      const pos = [[680, 690], [900, 690], [790, 610]]
      items.forEach(([s, c], i) => L(x, pos[i][0], pos[i][1], s, pop01(t, P.t0 + 0.7 + i * 0.3, 0.3, 2.2), c, (i - 1) * 0.06, 26))
      L(x, 790, 1100, 'EMERGENCY KIT', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Need your shell days? | *Rest* is allowed.', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'BLANKET', F.x, F.cy + 40, 22 * pop01(t, P.t0 + 0.5, 0.35, 2))
      L(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.04, 30)
      if (lt > 1.0) zzz(x, t, F.x + 80, F.top - 30)
      bits(x, 'LAMP', 820, 960, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: S, cap: 'Kept every ticket stub? | That’s *love,* archived.', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BOX', 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.6 + i * 0.2, 0.3, 2.2); bits(x, 'STUB', 700 + i * 60, 860 - i * 40, 10 * k, { rot: -0.3 + i * 0.2 }) }
      L(x, 790, 680, 'MEMORIES: SAFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Always say sorry first? | That’s *brave,* not weak.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'i’m sorry.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      friend(x, t, 'aries', 820, 960, 180, k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 13 })
      L(x, 790, 1130, 'BRAVE', pop01(t, P.t0 + 1.5, 0.3, 2.6), GOLD, 0.05, 44)
    } },
  { sign: S, cap: 'Feel everyone’s storms? | Keep *an umbrella* for you.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, -1], star: ST, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'CLOUD', 800, 620, 16 * k); bits(x, 'CLOUD', 400, 580, 14 * k)
      if (k > 0.9) { rain(x, t, 800, 660, 170); if (lt < 1.0) rain(x, t, 400, 610, 140) }
    },
    front(x, t, lt, P, F) {
      if (lt > 0.9) bits(x, 'UMB', F.x + 20, F.top - 70, 18 * pop01(t, P.t0 + 0.9, 0.35, 2))
      L(x, 800, 1110, 'MY PEACE: DRY', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Feed everyone you love? | *They feel it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'DISH', 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 830, { n: 3 })
      L(x, 790, 1060, 'FOR YOU ♡', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 32)
      bubble(x, 800, 640, 'seconds?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Soft *and* strong? | You’re both.', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 170, 0.4)
      L(x, 790, 1090, 'SOFT POWER', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0387', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Cancer, soft heart | *is strength.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong shell.*', mood: 'heart' },
  last: {
    text: 'The emergency kit? | Now packed *for you.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 400, 1060, 280 * k, { mood: lt > 1.4 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.4, t0 + 2.0] })
      bits(x, 'BAG', 760, 1100, 20 * pop01(t, t0 + 0.6, 0.4, 2))
      L(x, 760, 950, 'FOR: ME', pop01(t, t0 + 1.2, 0.3, 2.4), PINK, 0.05, 36)
      if (lt > 1.5) hearts(x, t, 600, 1000, t0 + 1.5, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
