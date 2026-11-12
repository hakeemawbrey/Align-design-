// r2a0017: star_advice, ADVICE SOLO, "Gemini, here’s your | Sunday reset." (~46 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one gag each.
// Ending: callback (the browser full of tabs from card 1 comes back with one tab).
//   0.0–3.6    "Gemini, here’s your | *Sunday reset.*"
//   3.6–37.8   43 tabs open (close three, celebrate) · group chats on fire (mute one) · twelve hobbies (pick one today)
//              · brain won’t stop talking (write it down) · half-read books (one chapter) · two moods (both welcome)
//              · owe your match a reply (one message, done) · laundry mountain (just the socks) · the week ahead (first three)
//  37.8        "Fresh mind. | *Same sparkle.*"
//  41.2        CALLBACK: "All those tabs? | *Down to one.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEMON = '#ffd23a', RED = '#e23d4e', GREEN = '#7ee08a'

// ── props
function browser(x, cx, cy, k, tabs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  const W = 360, H = 270
  x.fillStyle = INK; x.fillRect(-W / 2 - 8, -H / 2 - 8, W + 16, H + 16)
  x.fillStyle = '#3a3168'; x.fillRect(-W / 2, -H / 2, W, 46)
  x.fillStyle = BONE; x.fillRect(-W / 2, -H / 2 + 46, W, H - 46)
  const n = Math.max(1, Math.round(tabs)), tw = Math.min(110, (W - 10) / n)
  for (let i = 0; i < n; i++) { x.fillStyle = i === 0 ? BONE : ['#ffd23a', '#8fe3ff', '#ff8fb1', '#7ee08a'][i % 4]; x.fillRect(-W / 2 + 5 + i * tw, -H / 2 + 10, Math.max(2, tw - 3), 36) }
  x.fillStyle = '#c9b8a8'; for (let j = 0; j < 4; j++) x.fillRect(-W / 2 + 30, -H / 2 + 80 + j * 42, W - 60 - (j % 2) * 80, 18)
  x.restore()
}
function chatStack(x, t, cx, cy, k, muted) {
  if (k <= 0.01) return
  const msgs = ['omg', 'WAIT', 'lol', 'who??', 'ok but', '!!!']
  msgs.forEach((m, i) => { const ph = (t * 1.4 + i / 6) % 1; if (!muted) bubble(x, cx + Math.sin(i * 2.1) * 80, cy + 160 - ph * 320, m, k * Math.sin(Math.PI * ph), { size: 32, col: i % 2 ? LEMON : BONE, tail: i % 2 ? 'br' : 'bl' }) })
}
const YARN = ['..YYYY..', '.YRYYRY.', 'YYRYYRYY', 'YRYYRYYY', 'YYYRYYRY', '.YRYYRY.', '..YYYY..']
const NOTEBOOK = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWLLLLLWWK', 'KWWWWWWWWK', 'KWLLLLLLWK', 'KWWWWWWWWK', 'KWLLLWWWWK', 'KWWWWWWWWK', 'KWLLLLLWWK', 'KKKKKKKKKK']
const BOOK = ['RRRRRRRRRR', 'WWWWWWWWWR', 'RRRRRRRRRR']
const SOCK = ['WWWW..', 'SSSS..', 'SSSS..', 'SSSSSS', '.SSSSS']
function list3(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = BONE; x.fillRect(-160, -140, 320, 280)
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  ;['1. laundry', '2. call mom', '3. nap'].forEach((s, i) => { x.globalAlpha = clamp((lt - 0.4 - i * 0.3) * 4); x.fillText(s, -130, -80 + i * 80) })
  x.restore()
}

const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: '43 tabs open? | *Close three. Celebrate.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = lt < 1.0 ? 43 : 40
      browser(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      label(x, 790, 1090, `TABS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 200, 0.3)
    } },
  { sign: S, cap: 'Group chats on fire? | *Mute one. Breathe.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chatStack(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.3)
      label(x, 790, 860, 'MUTED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 48, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Twelve hobbies started? | *Pick one for today.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, YARN, { Y: PINK, R: '#c95a8a' }, 790, 870, 26 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: t * 0.6 })
      label(x, 790, 640, 'HOBBY #12', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'TODAY: YARN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Brain won’t stop talking? | *Write it down.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, NOTEBOOK, { K: INK, W: BONE, L: '#9aa5c4' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 560, 600, 'blah blah | blah', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - clamp((lt - 1.2) * 3)), { size: 36, tail: 'bl' })
      label(x, 790, 640, 'BRAIN: EMPTIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Half-read books everywhere? | *Finish one chapter.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const cols = [RED, '#6fc3ff', GREEN, LAV, LEMON, PINK]
      cols.forEach((c, i) => drawBits(x, BOOK, { R: c, W: BONE }, 790 + (i % 2 ? 14 : -14), 1060 - i * 52, 20 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2.2)))
      label(x, 790, 650, 'CHAPTER 1 ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Two moods at once? | *Both are welcome.*', mood: 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        signChar(x, t, S, 710, 930, 170 * k, { mood: 'happy', seed: 31, glyph: false, hops: [P.t0 + 0.8] })
        signChar(x, t, S, 880, 930, 170 * k, { mood: 'sleepy', seed: 32, glyph: false })
      }
      label(x, 795, 1110, 'BOTH: INVITED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 795, 820, P.t0 + 1.3, { n: 4, life: 1.4, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Owe your match a reply? | *One message. Done.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 650, '✦ YOUR MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 850, 'how was | your week?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 790, 1060, 'so good, tell | you Sunday!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LEMON, tail: 'br' })
    } },
  { sign: S, cap: 'Laundry mountain? | *Fold just the socks.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha *= clamp(k); const cols = [LAV, SKYB, PINK, GREEN, BONE, LEMON]
      for (let i = 0; i < 14; i++) { x.fillStyle = cols[i % 6]; const r = Math.floor(i / 5); x.fillRect(660 + (i % 5) * 52 + r * 26, 1060 - r * 60 - k * 0, 56, 56) }
      x.restore()
      drawBits(x, SOCK, { W: BONE, S: PINK }, 760, 760, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: -0.2 })
      drawBits(x, SOCK, { W: BONE, S: PINK }, 840, 760, 18 * pop01(t, P.t0 + 1.1, 0.3, 2.2), { rot: 0.2 })
      label(x, 800, 640, 'SOCKS: DONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Week ahead spinning? | *Pick the first three.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) { list3(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), lt); sparkles(x, t, 790, 870, P.t0 + 1.6, 6, 200, 0.3) } },
]

const F = makeFilm({
  id: 'r2a0017', key: 'F', accent: LEMON, solo: 'gemini', ending: 'callback',
  title: 'Gemini, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Fresh mind. | *Same sparkle.*', mood: 'sparkle' },
  last: {
    text: 'All those tabs? | *Down to one.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 330, 1090, 230 * k, { mood: lt > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.6] })
      const n = lerp(43, 1, ease.inOutCubic(prog(lt, 0.8, 1.6)))
      browser(x, 720, 1060, pop01(t, t - lt + 0.6, 0.35, 2) * 0.95, n)
      label(x, 720, 1250, 'TABS: 1', pop01(t, t - lt + 1.7, 0.3, 2.4), { size: 44, bg: LEMON, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1060, t - lt + 1.6, 8, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
