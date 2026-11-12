// r2t0279: star_talk, SOLO (gemini), "How to spot | a Gemini." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One Gemini the whole way through: nine tell-tale signs, each pushed to the most extreme Gemini version.
//   0.0–3.6    "How to spot | *a Gemini.*"
//   3.6–37.8   nine cards: three new hobbies this week · a different laugh for every friend · forty-two tabs open, all
//              important · two coffees, one per personality · knows everyone at the party (met them tonight) · new hair,
//              twice today · reading five books, finished none · a "short story" that runs forty minutes · rewrites their
//              profile bio daily
//  37.8        "Twin energy. | *Double the fun.*"
//  41.2        callback: "Hobby #4? | *Already started.*" the hobby counter comes back: juggling.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, laptop, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'gemini', ACC = '#ffe066'
const ST = { x: -170 }

const VASE = ['..KKKK..', '.KCCCCK.', '..KCCK..', '.KCCCCK.', 'KCCCCCCK', 'KCCCCCCK', '.KCCCCK.', '..KKKK..']
const PAINT = ['KKKKKKKKKK', 'KRRYYBBGGK', 'KRRYYBBGGK', 'KKKKKKKKKK', '....KK....', '....KK....']
const CUP = ['.WWWWWW.', 'WBBBBBBW', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW', '.WWWWWW.']
const CUP_C = { W: '#fff4e2', B: '#c98f6a' }
const BOOK = c => ({ K: INK, B: c, P: CREAM, R: RED })
const BOOK_BM = ['KKKKKKKKKKKKKKR.', 'KBBBBBBBBBBBBBR.', 'KPPPPPPPPPPPPPR.', 'KKKKKKKKKKKKKKKK']
const BALL = ['.KK.', 'KRRK', 'KRRK', '.KK.']

const CAMEOS = [
  { sign: S, cap: 'Three new hobbies. | *This week.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.5))
      drawBits(x, VASE, { K: INK, C: '#c98f6a' }, 690, 990, 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (n >= 2) drawBits(x, PAINT, { K: INK, R: RED, Y: SUN, B: SKYB, G: GREEN }, 860, 1010, 18 * pop01(t, P.t0 + 0.9, 0.3, 2))
      const H = ['pottery', 'painting', 'beekeeping?']
      bubble(x, 790, 790, H[n - 1], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl' })
      label(x, 790, 640, `HOBBY #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A different laugh | for *every friend.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'happy' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const L = [['HAHA!', GOLD, 52], ['hehe', PINK, 40], ['AHAHAHA', MINT, 46], ['*snort*', LAV, 38]]
      L.forEach(([w, c, s], i) => bubble(x, 700 + (i % 2) * 170, 660 + i * 130, w, pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2.2), { size: s, col: c, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: S, cap: 'Forty-two tabs open. | *All important.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(42, Math.floor(clamp((lt - 0.3) / 1.4) * 42) + 1)
      laptop(x, 790, 940, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        for (let i = 0; i < Math.min(14, Math.ceil(n / 3)); i++) { x.fillStyle = [SKYB, PINK, GOLD, MINT, LAV][i % 5]; x.fillRect(-120 + i * 17, -70, 14, 16) }
        txt(x, `TABS: ${n}`, 0, 10, { size: 40, font: MONO, weight: 700, color: BONE })
      })
      label(x, 790, 640, 'CLOSE ONE? NEVER.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04 })
    } },
  { sign: S, cap: 'Two coffees. | *One per personality.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 700, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CUP, { W: '#2a2350', B: '#6b4a3a' }, 880, 950, 18 * pop01(t, P.t0 + 0.5, 0.3, 2), { outline: BONE })
      label(x, 700, 760, 'OAT LATTE', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 850, 700, 'TRIPLE BLACK', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: GREY, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Knows everyone here. | *Met them tonight.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const IDS = ['taurus', 'virgo', 'scorpio']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.35, 2); if (k > 0.01) signChar(x, t, id, 670 + i * 130, 1040 - (i % 2) * 40, 140 * k, { mood: 'heart', look: [-1, 0], seed: 80 + i, glyph: false }) })
      bubble(x, 790, 700, 'BESTIES!!', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 52, col: GOLD, tail: 'bl' })
      label(x, 790, 860, 'KNOWN FOR: 20 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New hair. | *Twice. Today.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.9, 1.6],
    back(x, t, lt, P, F) {
      const c = lt < 0.9 ? PINK : lt < 1.6 ? MINT : SKYB
      x.fillStyle = INK; x.fillRect(F.x - 100, F.top - 50, 200, 64); x.fillStyle = c; x.fillRect(F.x - 92, F.top - 42, 184, 48); x.fillRect(F.x - 60, F.top - 64, 120, 20)
    },
    front(x, t, lt, P) {
      const n = lt < 0.9 ? 1 : lt < 1.6 ? 2 : 3
      label(x, 790, 820, `LOOK #${n} TODAY`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: [PINK, MINT, SKYB][n - 1], rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'it’s a phase!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Reading five books. | Finished *none.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const C = [RED, SKYB, GREEN, LAV, GOLD]
      C.forEach((c, i) => drawBits(x, BOOK_BM, BOOK(c), 790 + (i % 2 ? 10 : -10), 1080 - i * 70, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)))
      label(x, 790, 640, 'PAGE 12 · 12 · 12 · 12 · 12', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 24, bg: CREAM, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Quick story—” | It’s *forty minutes.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = Math.floor(clamp((lt - 0.3) / 1.8) * 40)
      clock(x, 830, 900, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 8, m)
      bubble(x, 760, 650, 'ok so quick story—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 830, 1110, `+${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their profile bio? | *Rewritten daily.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const BIOS = ['chef, probably', 'future astronaut', 'cat person?', 'dog person!', 'mystery ✦']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      card(x, 790, 860, 330, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.03 }, () => {
        x.fillStyle = DEEP; x.fillRect(-150, -170, 300, 190)
        signChar(x, t, S, 0, -70, 150, { mood: 'wink', seed: 91, glyph: false, glow: 0.8 })
        txt(x, '♊︎ GEMINI', 0, 60, { size: 28, font: MONO, weight: 700, color: ACC })
        x.fillStyle = CREAM; x.fillRect(-140, 100, 280, 56); txt(x, BIOS[n], 0, 128, { size: 28 })
      })
      label(x, 790, 1120, `BIO v${n + 30}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0279', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'How to spot | *a Gemini.*',
  cameos: CAMEOS,
  group: { cap: 'Twin energy. | *Double the fun.*', mood: 'sparkle' },
  last: {
    text: 'Hobby #4? | *Already started.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 540, 1000, 340 * k, { mood: 'sparkle', look: [0, -1], seed: 54, hops: [t0 + 1.2, t0 + 2.2] })
      if (lt > 0.8) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.1; drawBits(x, BALL, { K: INK, R: [RED, MINT, GOLD][i] }, 540 + Math.cos(a) * 200, 780 - Math.abs(Math.sin(a)) * 180, 28) }
      label(x, 540, 1220, 'HOBBY #4: JUGGLING', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
