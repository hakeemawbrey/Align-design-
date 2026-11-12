// r2a0752: star_advice, ADVICE SOLO, "Cancer, you don't owe anyone | *an instant reply.*" (~51 s vertical, signs3kit
// social cut, music: lofi · F). One sign the whole way, 9 cards: a relatable Cancer texting truth + a warm reframe.
//   read it at 2am (reply after coffee) · typed a paragraph ("sounds good!" works too) · worried they're mad (they're
//   eating lunch) · phone on silent (that's self-care) · 312 unread in the group chat (mute is love) · apologised for a
//   late reply (no sorry needed) · need a minute to feel it (take ten) · shell time (texts can wait) · real friends wait
//  37.8  "Your pace | *is the right pace.*"   41.0  LESSON "Your care isn't measured | *in minutes.*" REPLY: WHENEVER ♡
//  46.9  "Reply tomorrow. | *Still loved today.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, zzz, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'cancer', ACC = '#8fe3ff', ST = { x: -170 }

const CAMEOS = [
  { sign: S, cap: 'Read it at 2am? | *Reply after coffee.*', mood: lt => lt > 1.2 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 820, 800, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '2:04 AM', headCol: LAV, lines: [['hey u up?', BONE, pop01(t, P.t0 + 0.4, 0.2, 2), false]], size: 26 })
      bits(x, 'MUG', 660, 1040, 13 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 820, 1150, 'REPLY: 9AM ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Typed a whole essay? | *“Sounds good!” works.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const short = lt > 1.2
      phone(x, t, 800, 840, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: short ? 'SEND ✓' : 'DRAFT 1/1', headCol: short ? MINT : SKYB, lines: short ? [['sounds good!', '#7dffb0', pop01(t, P.t0 + 1.25, 0.2, 2.2), true]] : [['so i was thinking', BONE, 1, true], ['and also, if', BONE, 1, true], ['you feel like', BONE, 1, true], ['(continued…)', BONE, 1, true]], size: 22 })
      if (short) sparkles(x, t, 800, 800, P.t0 + 1.25, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Worried they’re mad? | *They’re eating lunch.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'are they mad??', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: '#bfe6ff', tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 800, 940, 170 * k, { mood: 'happy', seed: 13, glyph: false })
      bits(x, 'SANDWICH', 880, 1010, 9 * k)
      L(x, 800, 1130, 'STATUS: MUNCHING', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Phone on silent? | *That’s self-care.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.1 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SILENT ☾', headCol: LAV, lines: [], size: 24 })
      bits(x, 'MOON', 800, 860, 14 * pop01(t, P.t0 + 0.6, 0.3, 2))
      zzz(x, t, 560, 760, { size: 40 })
      L(x, 800, 1120, 'DO NOT DISTURB ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Group chat at 312? | *Mute is love.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(312, Math.floor(clamp((lt - 0.2) / 0.9) * 312))
      if (lt < 1.2) L(x, 800, 760, `${n} UNREAD`, pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.05, 52)
      else L(x, 800, 760, 'MUTED ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.05, 52)
      for (let i = 0; i < 5 && lt < 1.2; i++) bubble(x, 700 + (i % 2) * 180, 920 + Math.floor(i / 2) * 80, ['lol', 'omg', '!!!', 'wait', 'haha'][i], pop01(t, P.t0 + 0.4 + i * 0.12, 0.2, 2), { size: 28 })
      if (lt > 1.2) hearts(x, t, 800, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Said sorry for a late reply? | *No sorry needed.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 800, lt, 1.0, 'SO SORRY!!', 'HI! ♡', { size: 50, fromBg: '#bfe6ff', toBg: MINT })
      bubble(x, 800, 1040, 'hi!! no worries', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
    } },
  { sign: S, cap: 'Need a minute to feel it? | *Take ten.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, tears: lt => lt < 1.0 ? 1 : 0,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'TISSUE', 820, 1040, 11 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 640, 'FEELINGS BREAK: 10', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Need some shell time? | *Texts can wait.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1010, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P, Fs) {
      const d = ease.outCubic(prog(lt, 0.4, 0.9))
      if (lt > 0.4) bits(x, 'BLANKET', 380, lerp(560, 930, d), 15)
      L(x, 800, 820, 'SHELL: OCCUPIED', pop01(t, P.t0 + 1.0, 0.3, 2.4), ACC, -0.04, 34)
      bubble(x, 800, 1020, 'back soon ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
    } },
  { sign: S, cap: 'Real friends | *wait for you.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k1 = pop01(t, P.t0 + 0.3, 0.35, 2), k2 = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k1 > 0.01) signChar(x, t, 'taurus', 720, 950, 160 * k1, { mood: 'happy', seed: 21, glyph: false })
      if (k2 > 0.01) signChar(x, t, 'virgo', 880, 950, 160 * k2, { mood: 'happy', seed: 22, glyph: false })
      L(x, 800, 640, 'WE’LL WAIT ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 36)
      hearts(x, t, 800, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0752', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Cancer, you don’t owe anyone | *an instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Your pace | *is the right pace.*', mood: 'sparkle' },
  lesson: { text: 'Your care isn’t measured | *in minutes.*', chip: 'REPLY: WHENEVER ♡' },
  last: {
    text: 'Reply tomorrow. | *Still loved today.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
