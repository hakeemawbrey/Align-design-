// r2a0449: star_advice, ADVICE ROLLCALL, "How each sign | *feels chosen.*" (~62 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific line each, with a light visual gag. Ending: card.
//   3.6–49.2   ♈ pick them first · ♉ save them the last bite · ♊ ask about the new obsession · ♋ stay for dinner
//              · ♌ frame their photo · ♍ notice the little things · ♎ pick the place for once · ♏ share a secret, keep theirs
//              · ♐ say yes to the adventure · ♑ notice how hard they work · ♒ love their weird, loudly · ♓ ask about the dream
//  49.2        "Everyone wants | to be *picked.*"
//  52.4        LESSON: "Choose your people. | *On purpose.*"  CHOSEN: YOU
//  58.3        "Aries picked. | Libra *said yes.*" over the match card: Aries + Libra (Aries picks first, Libra gets let off picking).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, frame, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE, SLATE } from './props.js'

const CAKE = ['......W', '....WWP', '..WWPPP', 'WWPPPPP', 'BBBBBBB', 'PPPPPPP', 'BBBBBBB']
const CAKE_C = { W: CREAM, P: PINK, B: '#c98f5a' }
const PIN = ['.RRRR.', 'RRWWRR', 'RRWWRR', 'RRRRRR', '.RRRR.', '..RR..', '..RR..']
const PIN_C = { R: RED, W: CREAM }

const CAMEOS = [
  { sign: 'aries', cap: 'Pick them first. | *Every time.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -160 }, hops: [1.0, 1.4],
    front(x, t, lt, P) {
      label(x, 790, 700, 'TEAM PICK #1:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, '♈︎ YOU!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 56, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 170, 0.2)
    } },
  { sign: 'taurus', cap: 'Save them | *the last bite.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'SAVED FOR YOU ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Ask about their | *newest obsession.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'tell me about | the frogs!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      label(x, 790, 920, 'TALK TIME: 2 HRS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1040, 'FROG FACTS: 41', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Come over. | *Stay for dinner.*', mood: 'heart', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BM.SOUP, BM.SOUP_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'EXTRA PLATE: SET', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 780, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'Frame their photo. | *Hang it up.*', mood: 'sparkle', star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 840, pop01(t, P.t0 + 0.3, 0.35, 2), 220, 260, x => { x.fillStyle = '#ffe7a8'; x.fillRect(-110, -130, 220, 260); signChar(x, t, 'leo', 0, 10, 160, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.4 }) }, { rot: 0.03 })
      label(x, 790, 1100, 'HANGING: CENTRE WALL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Notice the little things | *they do.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 360, head: 'THANK YOU FOR:', headCol: MINT, size: 28, rows: [
        ['the reminder ✓', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['the snacks ✓', INK, pop01(t, P.t0 + 0.8, 0.2, 2)], ['the label maker ✓', INK, pop01(t, P.t0 + 1.1, 0.2, 2)], ['everything ♡', RED, pop01(t, P.t0 + 1.5, 0.2, 2)],
      ] })
    } },
  { sign: 'libra', cap: 'Pick the place. | *For once.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.3, 0.8))
      if (lt > 0.3) drawBits(x, PIN, PIN_C, 790, lerp(560, 860, d), 18)
      sheet(x, 790, 980, pop01(t, P.t0 + 0.15, 0.3, 2), { w: 320, h: 120, head: '', rows: [['DECIDED: YOU ✓', INK, pop01(t, P.t0 + 1.0, 0.2, 2)]], size: 30, rot: 0.02 })
      label(x, 790, 1140, 'RELIEF: TOTAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Share a secret. | *Keep theirs.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 770, 700, 'psst…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: LAV, tail: 'bl' })
      drawBits(x, BM.KEY, BM.KEY_C, 790, 900, 16 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.2 })
      label(x, 790, 1060, 'VAULT: SHARED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Say yes | *to the adventure.*', mood: 'sparkle', star: { x: 150 }, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2); drawBits(x, BM.BALLOON, { ...BM.BALLOON_C, R: [PINK, GOLD, SKYB, MINT][i] }, 230 + i * 70, 860 - (i % 2) * 70 - lt * 30, 13 * k) }
      label(x, 320, 1080, 'YES! WHEN?', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Notice how hard | *they work.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      drawBits(x, BM.TROPHY, BM.TROPHY_C, 320, 880, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 320, 680, 'EFFORT: SEEN ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 320, 880, P.t0 + 0.55, 7, 150, 0.4)
    } },
  { sign: 'aquarius', cap: 'Love their weird. | *Loudly.*', mood: 'sparkle', look: [1, -1], star: { x: -160 }, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 760, 'WEIRD: CERTIFIED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, BM.STAR5, BM.STAR5_C, 790, 930, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 790, 1080, '10/10 ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Remember their dream. | *Ask about it.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 2, star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'how’s the | novel going?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      label(x, 790, 920, 'HAPPY TEARS', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 780, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0449', key: 'E', accent: PINK, ending: 'card',
  title: 'How each sign | *feels chosen.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'CHOSEN' },
  group: { cap: 'Everyone wants | to be *picked.*' },
  lesson: { text: 'Choose your people. | *On purpose.*', chip: 'CHOSEN: YOU' },
  last: { text: 'Aries picked. | Libra *said yes.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
