// r2a0166: star_advice, ADVICE SOLO, "Gemini, the right people | will stay." (~49 s vertical, signs3kit social cut,
// music: lofi · D). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe.
//   0.0–3.6    "Gemini, the right people | *will stay.*"
//   3.6–37.8   ten hobbies this month (curiosity) · worried you talk too much (your people lean in) · two moods in an
//              hour (both welcome) · replied three days late (real ones get it) · know everyone at the party (keep
//              your few) · someone drifted off (room for someone new) · wait for the match who loves the tangents
//              · called "too much" (you're a whole playlist) · the ones who stay love every version
//  37.8        "Many sides. | *All lovable.*"
//  41.2        CALLBACK: "Still leaning in. | *Still here.*"  the friend from card 2 is back: "go on!!"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'gemini', ACC = '#ffd23a'
const ST = { x: -190 }
const DOOR = ['KKKKKKK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWYK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK']
const MAT = ['MMMMMMMMMMMM', 'MmMmMmMmMmMM', 'MMMMMMMMMMMM']
const CASSETTE = ['KKKKKKKKKKKK', 'KPPPPPPPPPPK', 'KPWWWWWWWWPK', 'KPWK.WW.KWPK', 'KPWWWWWWWWPK', 'KPPPPPPPPPPK', 'KKKKKKKKKKKK']

const CAMEOS = [
  // 1 · hobbies
  { sign: S, cap: 'Ten hobbies this month? | That’s *curiosity.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const H = ['POTTERY', 'CHESS', 'BAKING', 'DRUMS', 'KNITTING', 'BIRDS']
      const COL = [PINK, MINT, GOLD, SKYB, LAV, ORANGE]
      const n = Math.min(6, 1 + Math.floor(prog(lt, 0.3, 1.6) * 6))
      for (let i = 0; i < n; i++) label(x, 790 + Math.sin(i * 2.1) * 40, 1020 - i * 70, H[i], pop01(t, P.t0 + 0.3 + i * 0.2, 0.25, 2.2), { size: 34, bg: COL[i], rot: Math.sin(i * 1.7) * 0.08, font: MONO, weight: 700 })
      bubble(x, 790, 600, 'ooh, what’s THAT?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  // 2 · talking a lot (the friend comes back at the end)
  { sign: S, cap: 'Worried you talk too much? | *Your people lean in.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 990); x.rotate(-0.12 * ease.outCubic(prog(lt, 0.8, 1.3))); x.translate(-800, -990); signChar(x, t, 'libra', 800, 960, 200 * k, { mood: lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], seed: 14, glyph: false }); x.restore() }
      bubble(x, 520, 640, '…and THEN—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 830, 700, 'go on!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'br', col: PINK })
    } },
  // 3 · two moods
  { sign: S, cap: 'Two moods in one hour? | *Both are welcome.*', mood: 'happy', look: [1, 0], star: { x: -200, y: -20, s: 240 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MAT, { M: '#c98f2a', m: '#a8702a' }, 790, 1080, 30 * k)
      if (k > 0.01) {
        signChar(x, t, S, 690, 970, 190 * k, { mood: 'sparkle', seed: 31, glyph: false, hops: [P.t0 + 0.8] })
        signChar(x, t, S, 890, 970, 190 * k, { mood: 'sleepy', seed: 32, glyph: false })
      }
      label(x, 790, 700, 'WELCOME, BOTH', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 4 · late replies
  { sign: S, cap: 'Replied three days late? | *Real ones get it.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: GOLD, size: 28, w: 300, h: 420, lines: [
        ['sorry!! just saw', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['lol same', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
        ['dinner fri?', MINT, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
      label(x, 790, 1120, 'FRIENDSHIP: FINE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 5 · the party
  { sign: S, cap: 'Know everyone at the party? | *Keep your few close.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const IDS = ['aries', 'taurus', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'capricorn', 'aquarius']
      const FEW = [2, 4, 6], glow = lt > 1.2
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.06, 0.25, 2), few = FEW.includes(i)
        signChar(x, t, id, 680 + (i % 3) * 110, 720 + Math.floor(i / 3) * 140, (glow && few ? 110 : 84) * k, { mood: glow && few ? 'heart' : 'happy', seed: 40 + i, glyph: false, alpha: glow && !few ? 0.35 : 1, glow: 0.6 })
      })
      label(x, 790, 1130, 'YOUR FEW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · someone drifted
  { sign: S, cap: 'Someone drifted off? | *Room for someone new.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DOOR, { K: INK, W: WOOD, Y: GOLD }, 820, 900, 34 * k)
      const p = ease.outCubic(prog(lt, 0.8, 1.4))
      if (p > 0) signChar(x, t, 'sagittarius', lerp(900, 780, p), 960, 150, { mood: 'sparkle', look: [-1, 0], seed: 51, glyph: false, alpha: clamp(p * 2) })
      bubble(x, 790, 640, 'hi! seat free?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  // 7 · Align: the match who loves the tangents
  { sign: S, cap: 'Wait for the match | who *loves the tangents.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', headCol: PINK, size: 28, w: 300, h: 420, lines: [
        ['okay but OWLS—', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['TELL ME MORE', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)],
        ['also: moths?', GOLD, pop01(t, P.t0 + 1.5, 0.25, 2.2)],
      ] })
      label(x, 790, 1120, 'TANGENTS: YES', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · "too much"
  { sign: S, cap: 'Called “too much”? | You’re *a whole playlist.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      drawBits(x, CASSETTE, { K: INK, P: LAV, W: CREAM }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      notes(x, t, 790, 760, { n: 5, cell: 7, col: GOLD, seed: 3, alpha: clamp((lt - 0.5) * 2) })
      label(x, 790, 1080, 'SHUFFLE: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 9 · the ones who stay
  { sign: S, cap: 'The ones who stay | *love every version.*', mood: 'heart', star: { x: 0, y: -30, s: 260 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'libra', 330, 1000, 150 * k, { mood: 'heart', look: [1, 0], seed: 61, glyph: false })
        signChar(x, t, 'sagittarius', 750, 1000, 150 * k, { mood: 'heart', look: [-1, 0], seed: 62, glyph: false })
      }
      label(x, 540, 1150, 'STILL HERE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 700, P.t0 + 1.2, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0166', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Gemini, the right | people *will stay.*',
  cameos: CAMEOS,
  group: { cap: 'Many sides. | *All lovable.*', mood: 'heart' },
  last: {
    text: 'Still leaning in. | *Still here.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) {
        signChar(x, t, S, 360, 1060, 300 * k, { mood: 'sparkle', look: [1, 0], seed: 70, hops: [t - lt + 1.6] })
        x.save(); x.translate(760, 1090); x.rotate(-0.12 * ease.outCubic(prog(lt, 1.0, 1.5))); x.translate(-760, -1090)
        signChar(x, t, 'libra', 760, 1060, 260 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 71 })
        x.restore()
      }
      bubble(x, 340, 740, '…and THEN—', pop01(t, t - lt + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 780, 780, 'go on!!', pop01(t, t - lt + 1.4, 0.25, 2.2), { size: 52, tail: 'br', col: PINK })
      hearts(x, t, 560, 1300, t - lt + 1.6, { n: 5, life: 1.6, spread: 200, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
