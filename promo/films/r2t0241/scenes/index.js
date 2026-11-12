// r2t0241: THE SIGNS AS… v3, SOLO film, "Gemini bosses | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through: nine days at work with a Gemini boss, each pushed to the extreme. Ending: callback.
//   0.0–3.6    "Gemini bosses | *be like.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the "quick" meeting, hour three · approved it, then the twin denied it · the deadline moved four times
//              · your review is a 40-minute voice memo · six projects, all at 50% · "random thought" at 2am
//              · a new company plan since lunch · nicknames for everyone on day one · remembered your birthday, twice
//  37.8        "Fun boss. | *Zero follow-up.*"  Gemini comes back, big.
//  41.2        CALLBACK: "The quick meeting? | *Still going.*"  The clock comes back, spinning.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, pill, clock, sticky, confetti, CREAM, RED, ORANGE, SUN, GREY, clamp, prog, lerp, ease } from './props.js'

const S = 'gemini', ACC = SUN

const CAKE = [
  '..F...F..',
  '..W...W..',
  '..W...W..',
  'PPPPPPPPP',
  'CCCCCCCCC',
  'PPPPPPPPP',
  'CCCCCCCCC',
]
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK, C: CREAM }

// a whiteboard of arrows and boxes that keeps redrawing itself
function whiteboard(x, t, cx, cy, k, lt) {
  card(x, cx, cy, 340, 260, k, { bg: '#f6f7fb', rot: -0.03 }, () => {
    x.strokeStyle = INK; x.lineWidth = 5
    const n = Math.floor(clamp((lt - 0.3) / 1.6) * 9)
    for (let i = 0; i < n; i++) {
      const a = i * 2.39, px = Math.cos(a) * 110, py = Math.sin(a * 1.3) * 70
      x.strokeStyle = [RED, '#3d8fd8', '#2fa36b'][i % 3]
      x.strokeRect(px - 26, py - 18, 52, 36)
      if (i) { const b = (i - 1) * 2.39; x.beginPath(); x.moveTo(Math.cos(b) * 110, Math.sin(b * 1.3) * 70); x.lineTo(px, py); x.stroke() }
    }
  })
}

const CAMEOS = [
  { sign: S, cap: 'Called a “quick” meeting. | It’s *hour three.*', mood: 'sparkle', star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      clock(x, 790, 790, pop01(t, P.t0 + 0.2, 0.35, 2), t, { speed: 5 })
      label(x, 790, 990, 'MEETING: 3H 12M', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: RED, color: CREAM, font: MONO, weight: 700 })
      bubble(x, 380, 610, 'one more thing—', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Approved your idea. | *The twin didn’t.*', mood: lt => lt > 1.4 ? 'squint' : 'heart', star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, S, 760, 920, 260 * k, { mood: 'squint', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 330, 620, 'love it!', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 40, tail: 'bc' })
      bubble(x, 780, 620, 'hate it.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Moved the deadline. | *Four times today.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const DAYS = ['MON', 'WED', 'TODAY', 'LAST WEEK??']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      card(x, 790, 820, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: SUN, rot: 0.05, border: 5 }, () => {
        txt(x, 'DUE:', 0, -90, { size: 40 })
        for (let i = 0; i < n; i++) { txt(x, DAYS[i], 0, -30 + i * 30, { size: 26, color: '#7a6a40', font: MONO, weight: 700 }); x.fillStyle = RED; x.fillRect(-70, -32 + i * 30, 140, 5) }
        txt(x, DAYS[n], 0, -30 + n * 30 + 14, { size: n === 3 ? 30 : 34, color: RED })
      })
      label(x, 790, 1040, 'NEW DEADLINE!', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: ORANGE })
    } },
  { sign: S, cap: 'Your review? | A *40-minute voice memo.*', mood: 'sparkle', star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FROM: BOSS', headCol: SUN }, () => {
        x.fillStyle = MINT
        for (let i = 0; i < 16; i++) { const hh = 14 + 40 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-96 + i * 12, -10 - hh / 2, 8, hh) }
        txt(x, '▶ 40:12', 0, 80, { size: 36, color: BONE, font: MONO, weight: 700 })
      })
      label(x, 790, 1100, 'PART 1 OF 3', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: LAV, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Started six projects. | Finished *the vibe.*', mood: lt => lt > 1.5 ? 'happy' : 'sparkle', star: { x: -190 },
    front(x, t, lt, P) {
      const COLS = [SUN, PINK, MINT, SKYB, LAV, ORANGE]
      for (let i = 0; i < 6; i++) sticky(x, 700 + (i % 2) * 175, 650 + Math.floor(i / 2) * 175, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), `#${i + 1}|50%`, { col: COLS[i], rot: ((i * 5) % 3 - 1) * 0.07, w: 140, size: 30 })
      label(x, 790, 1160, 'DONE: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '2 a.m. message: | *“random thought.”*', mood: 'wide', star: { x: -180 }, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '2:07 AM', headCol: LAV }, () => {
        const n = Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.3) + 1)
        const M = ['random thought', 'what if', 'we sold hats', 'or soup', 'call me']
        for (let i = 0; i < n; i++) pill(x, M[i], (i % 2 ? 14 : -14), -90 + i * 56, 1, { col: i % 2 ? SUN : BONE, size: 24 })
      })
      label(x, 800, 1110, 'UNREAD: 37', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SUN, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A whole new company plan. | *Since lunch.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      whiteboard(x, t, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1010, 'PLAN v9', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: SUN, font: MONO, weight: 700, rot: 0.05 })
      label(x, 800, 610, 'v1–v8: GONE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 26, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gave everyone a nickname. | *Day one.*', mood: 'wink', star: { x: -190 }, hops: [0.8],
    front(x, t, lt, P) {
      const N = ['HELLO, I’M|SPRINKLES', 'HELLO, I’M|BIG SOUP', 'HELLO, I’M|CAPTAIN']
      N.forEach((s, i) => card(x, 790, 650 + i * 170, 300, 130, pop01(t, P.t0 + 0.25 + i * 0.4, 0.3, 2), { bg: i === 1 ? PINK : i ? SKYB : CREAM, rot: (i - 1) * -0.05, border: 5 }, () => {
        const [a, b] = s.split('|'); x.fillStyle = RED; x.fillRect(-150, -65, 300, 40); txt(x, a, 0, -45, { size: 22, color: CREAM, font: MONO, weight: 700 }); txt(x, b, 0, 22, { size: 40 })
      }))
    } },
  { sign: S, cap: 'Remembered your birthday. | *Twice. Different dates.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 700, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, CAKE, CAKE_C, 880, 900, 20 * pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 700, 1060, 'MAR 3', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: SUN, font: MONO, weight: 700, rot: -0.06 })
      label(x, 880, 1060, 'JULY 9', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: PINK, font: MONO, weight: 700, rot: 0.06 })
      bubble(x, 790, 640, 'it’s in June.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      confetti(x, t, 790, 860, P.t0 + 1.0, { n: 14, spread: 200, h: 420 })
    } },
]

const F = makeFilm({
  id: 'r2t0241', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Gemini bosses | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Fun boss. | *Zero follow-up.*', mood: 'sparkle' },
  last: {
    text: 'The quick meeting? | *Still going.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 380, 1120, 250 * k, { mood: 'sparkle', seed: 40, hops: [t - lt + 1.5] })
      clock(x, 740, 1080, pop01(t, t - lt + 0.3, 0.35, 2), t, { speed: 9 })
      label(x, 740, 1290, 'MEETING: 9H 40M', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, font: MONO, weight: 700, rot: -0.04 })
      bubble(x, 380, 900, 'one more thing—', pop01(t, t - lt + 1.8, 0.25, 2.2), { size: 34, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
