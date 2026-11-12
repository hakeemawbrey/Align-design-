// r2a0596: star_advice, ADVICE SOLO (scorpio), "What a Scorpio | *won't say out loud.*" (signs3kit social cut, music: lofi · D).
// Nine cards, a quiet Scorpio truth + a warm reframe: they remember everything (it's how they care) · trust loads slowly
// · fourteen unsent "miss u" drafts · "I'm fine" means hurt · jealous = scared to lose you · tough outside, marshmallow
// inside · read your whole birth chart out of love · alone time isn't about you · loyal for life.
// Ending: lesson ("Their quiet is | *full of love.*") then "Text your Scorpio. | *They miss you.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', ST = { x: -180 }, SG = 'scorpio'
const LOCK = ['..SSSS..', '.S....S.', '.S....S.', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGKGGG', 'GGGGGGGG']
const LOCK_C = { S: STEEL, G: GOLD, K: INK }

// a slow loading bar (bone frame, mint fill)
function loadBar(x, cx, cy, k, p, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -30, 360, 60)
  x.fillStyle = '#2a2350'; x.fillRect(-162, -22, 324, 44)
  x.fillStyle = MINT; x.fillRect(-162, -22, 324 * clamp(p), 44)
  x.fillStyle = BONE; x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, -58)
  x.restore()
}

const CAMEOS = [
  { sign: SG, cap: 'They remember everything. | It’s how they *care.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 350, h: 320, head: 'NOTES ON YOU', headBg: ACC, headInk: INK, align: 'left', size: 30, lines: ['fav snack: mango', 'hates cilantro', 'bad day: 3/14', 'needs: hugs'], progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1090, 'FILED WITH LOVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: SG, cap: 'Trust takes time. | You’re *worth* the wait.', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const open = lt > 1.6
      drawBits(x, open ? ['SSSS....', 'S...S...', 'S...S...', 'GGGGGGGG', 'GGGKKGGG', 'GGGKKGGG', 'GGGGKGGG', 'GGGGGGGG'] : LOCK, LOCK_C, 800, 780, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      loadBar(x, 800, 1050, pop01(t, P.t0 + 0.4, 0.3, 2), ease.inOutCubic(prog(lt, 0.5, 1.6)), open ? 'TRUST: UNLOCKED ♡' : 'TRUST: LOADING…')
      if (open) sparkles(x, t, 800, 780, P.t0 + 1.6, 7, 150, 0.3)
    } },
  { sign: SG, cap: 'Missing you quietly. | Text them *first.*', mood: lt => lt > 1.3 ? 'wide' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const typed = 'miss u'.slice(0, Math.max(0, Math.floor((lt - 0.4) / 0.12)))
      const del = lt > 1.1
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: YOU ♡', headCol: PINK, size: 26, lines: [[del ? '(deleted)' : (typed || '…'), del ? STEEL : BONE, 1, true]] })
      L(x, 800, 1100, 'DRAFTS SAVED: 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: SG, cap: '“I’m fine” means hurt. | Ask *gently.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 560, 650, 'I’M FINE.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      bits(x, 'MUG', 820, 900, 18 * pop01(t, P.t0 + 0.8, 0.3, 2))
      if (lt > 1.0) steam(x, t, 810, 820)
      L(x, 810, 1090, 'TEA? TALK? ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: SG, cap: 'Jealous? Just scared | to *lose you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      friend(x, t, 'gemini', 840, 900, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 36 })
      bubble(x, 600, 650, 'who’s that?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 830, 1100, 'JUST A COWORKER ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Tough outside. | *Marshmallow* inside.', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      swapLabel(x, 800, 760, lt, 1.0, 'DO NOT DISTURB', 'HUGS WELCOME', { size: 38, fromBg: RED, toBg: PINK })
      if (lt > 1.2) hearts(x, t, F.x, F.cy - 80, P.t0 + 1.2, { n: 6, life: 1.6, spread: 180, cell: 7, seed: 3 })
      L(x, 800, 1060, '100% SOFT CENTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), CREAM, 0.04, 32)
    } },
  { sign: SG, cap: 'Read your whole chart. | Out of *love.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 290, head: 'YOUR BIRTH CHART', headBg: LAV, headInk: INK, size: 32, lines: ['sun ✓', 'moon ✓', 'rising ✓'], progress: clamp((lt - 0.3) / 0.9) })
      bits(x, 'LENS', 640, 940, 13 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1080, 'MOON IN CANCER? NOTED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: SG, cap: 'Needs alone time. | It’s not about *you.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOOK', 820, 960, 15 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.1 })
      L(x, 810, 1110, 'RECHARGING · BACK SOON ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 26)
    } },
  { sign: SG, cap: 'Loyal for life. | *Lucky* you.', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 900, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 37 })
      L(x, 820, 1100, 'FRIENDS: FOREVER', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 680, 800, P.t0 + 1.1, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0596', key: 'D', accent: ACC, solo: SG, ending: 'lesson',
  title: 'What a Scorpio | *won’t say.*',
  cameos: CAMEOS,
  group: { cap: 'Deep waters. | *Warm* heart.', mood: 'heart' },
  lesson: { text: 'Their quiet is | *full of love.*', chip: 'STATUS: TRUSTED' },
  last: { text: 'Text your Scorpio. | *They miss you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
