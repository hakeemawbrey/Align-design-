// r2t0047: THE SIGNS AS… v3, SOLO film, "Being a Gemini | be like." (~51 s vertical, signs3kit social cut, lofi · E)
// One Gemini, nine cards, each the most extreme version of the Gemini brain. Ending: lesson.
//   0.0–3.6    "Being a Gemini | *be like.*"
//   3.6–37.8   nine chats at once · new hobby Monday, quit Wednesday · same story, new ending · two moods, one
//              minute · went for milk, came back with a friend · profile bio changes daily · three books at once
//              · "quick question" → forty · fell asleep mid-sentence, woke up finishing it
//  37.8        "Never boring. | *Ever.*"
//  41.0        LESSON: "Love a Gemini? | Keep up. It’s *worth it.*"  STATUS: ENTERTAINED
//  46.9        "Wait — | where *was I?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'gemini', YEL = '#ffd23a', ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068'

const MILK = [
  '.WWWW.',
  'WWWWWW',
  'WBBBBW',
  'WBWWBW',
  'WBBBBW',
  'WWWWWW',
  'WWWWWW',
]
const MILK_C = { W: '#fff4e2', B: SKYB }
const BOOK = (c) => ({ bm: ['CCCCCCCCCC', 'CWWWWCWWWW', 'CWWWWCWWWW', 'CWWWWCWWWW', 'CCCCCCCCCC'], c: { C: c, W: '#fff4e2' } })
const ZZZ = ['ZZZ', '..Z', '.Z.', 'Z..', 'ZZZ']

// a phone with a stack of chat bubbles piling up
function chats(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -214, 288, 440)
  x.fillStyle = INK; x.fillRect(-150, -226, 300, 452)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -216, 280, 432)
  x.fillStyle = '#140c30'; x.fillRect(-126, -186, 252, 372)
  const n = Math.min(9, Math.floor(Math.max(0, lt - 0.3) / 0.15) + 1)
  const COLS = [YEL, PINK, MINT, SKYB, LAV, ORANGE]
  for (let i = 0; i < n; i++) {
    const y = -160 + i * 40
    x.fillStyle = COLS[i % 6]; x.fillRect(i % 2 ? -20 : -112, y, 130, 28)
  }
  x.restore()
}
// a profile card whose bio text keeps changing
function profile(x, t, cx, cy, k, bio) {
  if (k <= 0.01) return
  const w = 300, h = 380
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 190)
  signChar(x, t, 'gemini', 0, -h / 2 + 108, 150, { mood: 'wink', seed: 71, glyph: false, glow: 0.8 })
  x.fillStyle = YEL; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♊︎ GEMINI', 0, 42)
  x.fillStyle = BONE; x.font = `800 28px ${INTER}`
  String(bio).split('|').forEach((l, i) => x.fillText(l.trim(), 0, 96 + i * 38))
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Nine chats open. | *Replying to all.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      chats(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, lt)
      label(x, 790, 1100, 'TYPING… ×9', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New hobby Monday. | Quit by *Wednesday.*', mood: lt => lt > 1.7 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const H = ['MON: POTTERY', 'TUE: GUITAR', 'WED: …NEXT!']
      const i = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))
      label(x, 790, 760, H[i], pop01(t, P.t0 + 0.3 + i * 0.71, 0.3, 2.2), { size: 36, bg: [ORANGE, MINT, PINK][i], rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 960, 'HOBBIES TRIED: 31', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Same story. | *Brand-new ending.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      const E = ['…and then a dragon', '…and then I won', '…and then, aliens']
      const i = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      bubble(x, 760, 720, E[i], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 950, `VERSION ${i + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two moods. | *One minute.*', mood: lt => Math.floor(lt * 2) % 2 ? 'sleepy' : 'sparkle', star: { x: 0, y: -10 },
    front(x, t, lt, P) {
      const sunny = Math.floor(lt * 2) % 2 === 0
      x.save(); x.globalAlpha = sunny ? 1 : 0.65
      label(x, 260, 720, '☀ GREAT', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: YEL, rot: -0.06, font: MONO, weight: 700 })
      x.globalAlpha = sunny ? 0.65 : 1
      label(x, 820, 720, '☁ DOOMED', pop01(t, P.t0 + 0.55, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.06, font: MONO, weight: 700 })
      x.restore()
      label(x, 540, 1120, 'BOTH ARE TRUE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Went out for milk. | Came back *with a friend.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MILK, MILK_C, 470, 1080, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 790, 950, 210 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 790, 680, 'meet my new | best friend!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Their profile bio? | *Changes daily.*', mood: 'wink', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const B = ['chef. | adventurer.', 'poet. | night owl.', 'astronaut? | maybe.']
      const i = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      profile(x, t, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.95, B[i])
      label(x, 780, 1110, `EDIT ${i + 1} TODAY`, pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Reading three books. | *At once.*', mood: lt => Math.floor(lt * 2.2) % 3 === 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.2) % 3 - 1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      ;[[SKYB, 960, -0.06], [PINK, 880, 0.05], [MINT, 800, -0.03]].forEach(([c, y, r], i) => {
        const b = BOOK(c); drawBits(x, b.bm, b.c, 790, y, 20 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: r })
      })
      label(x, 790, 660, 'ALL ON PAGE 12', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Quick question.” | *Forty questions.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 39)
      bubble(x, 780, 700, 'quick question—', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 920, `QUESTION ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 42, bg: YEL, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fell asleep mid-sentence. | Woke up *finishing it.*', mood: lt => lt < 1.3 ? 'sleepy' : 'wide', star: { x: -180 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      if (lt < 1.3) drawBits(x, ZZZ, { Z: BONE }, F.x + 120, F.top - 30 - (t * 20 % 20), 10, { alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      bubble(x, 780, 700, 'so anyway the…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 1.2, 1.3)), { size: 34, tail: 'bl' })
      bubble(x, 780, 720, '…THE SECOND PART!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 960, '8 HOURS LATER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0047', key: 'E', accent: YEL, solo: S, ending: 'lesson',
  title: 'Being a Gemini | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never boring. | *Ever.*', mood: 'sparkle' },
  lesson: { text: 'Love a Gemini? | Keep up. It’s *worth it.*', chip: 'STATUS: ENTERTAINED' },
  last: {
    text: 'Wait — | where *was I?*',
    draw(x, t, lt) { sparkles(x, t, 540, 1150, t - lt + 0.6, 9, 260, 0.2, [GOLD, BONE, PINK]) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
