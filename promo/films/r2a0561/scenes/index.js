// r2a0561: star_advice, ADVICE SOLO (scorpio), "Scorpio, here's your | *Sunday reset.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle Sunday-reset ideas, each a relatable Scorpio truth + a warm reframe with one light gag.
// Ending: group (the group beat is the punchline).
//   ignored texts all week, reply to one · mute the group chat till Monday · set the old grudge down (a rock marked 2019)
//   · curtains shut for days, let in one sunbeam · soft socks today · the chart says recharge in the dark
//   · one sticky note for Monday · missing someone, text first · journal it out (PRIVATE. VERY.)
//   group "Reset complete. | *Mystery restored.*" (solo: the big star winks)
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, phone, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#c97bff', S = 'scorpio', ST = { x: -190 }

const ROCK = ['...GGGGG....', '.GGGgGGGGG..', 'GGGGGGGgGGG.', 'GGgGGGGGGGGG', 'GGGGGGGGgGGG', '.GGGGgGGGGG.', '..GGGGGGGG..']
const ROCK_C = { G: '#8b8ba0', g: '#6a6a80' }
const SOCK = ['.PPPP...', '.PwPP...', '.PPPP...', '.PPwP...', '.PPPP...', '.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP', '.WWWWWW.']
const SOCK_C = { P: '#ff9ec4', w: '#fff4e2', W: '#fff4e2' }

// a window with two curtains that part a little, and one sunbeam
function window_(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = '#8fd0ff'; x.fillRect(-138, -158, 276, 316)
  x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(40, -60, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-4, -158, 8, 316); x.fillRect(-138, -4, 276, 8)
  const w = lerp(138, 100, open)
  x.fillStyle = '#5a2e8a'; x.fillRect(-150, -180, w + 12, 360); x.fillRect(150 - w - 12, -180, w + 12, 360)
  x.fillStyle = '#7a44b0'; for (let i = 0; i < 4; i++) { x.fillRect(-140 + i * 30, -180, 8, 360); x.fillRect(150 - w + i * 30, -180, 8, 360) }
  x.fillStyle = WOOD; x.fillRect(-170, -192, 340, 16)
  x.restore()
  if (open > 0.05) {
    x.save(); x.globalAlpha = 0.28 * open; x.fillStyle = '#fff1b0'
    x.beginPath(); x.moveTo(cx - 20, cy - 60); x.lineTo(cx + 30, cy - 60); x.lineTo(cx - 280, cy + 330); x.lineTo(cx - 460, cy + 330); x.closePath(); x.fill(); x.restore()
  }
}

const CAMEOS = [
  { sign: S, cap: 'Ignored texts all week? | *Reply to one.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const n = lt > 1.2 ? 46 : 47
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:41', head: `${n} UNREAD`, msg: lt > 1.2 ? 'sent: | “hi :)”' : 'unread… | unread…', bg: lt > 1.2 ? MINT : LAV, size: 32 })
      label(x, 800, 1110, 'ONE IS PLENTY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Read the whole group chat? | *Mute it till Monday.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const n = Math.floor(clamp(lt / 1.1) * 312)
      note(x, 800, 860, k, lt > 1.15 ? 'muted till | monday ✓' : `${n} new | messages`, { head: 'THE GROUP CHAT', headBg: lt > 1.15 ? MINT : PINK, size: 38, w: 330, rot: 0.04 })
      bubble(x, 800, 620, 'shh.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Carrying an old grudge? | *Set it down.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const d = ease.outBounce ? ease.outBounce(prog(lt, 0.7, 1.2)) : ease.outCubic(prog(lt, 0.7, 1.2))
      const rx = lerp(F.x + 150, 760, d), ry = lerp(F.cy - 120, 1040, d)
      drawBits(x, ROCK, ROCK_C, rx, ry, 28 * k)
      label(x, rx, ry + 6, '2019', k, { size: 38, bg: BONE, rot: -0.06, font: MONO, weight: 700 })
      bubble(x, 800, 640, 'oof. | lighter.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Curtains shut for days? | *Let in one sunbeam.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.3],
    back(x, t, lt, P) {
      window_(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.3)))
    },
    front(x, t, lt, P) {
      label(x, 800, 1100, 'JUST A CRACK', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Been intense lately? | *Soft socks today.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 1], star: ST, hops: [1.3, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, SOCK, SOCK_C, 730, 900, 22 * k, { rot: -0.15 })
      drawBits(x, SOCK, SOCK_C, 870, 920, 22 * k, { rot: 0.12, sx: -1 })
      label(x, 800, 660, 'EXTRA FUZZY', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'Even your chart says: | *recharge in the dark.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'lights: low | snacks: yes | plans: none', { head: '♏︎ SUNDAY', headBg: ACC, size: 34, w: 330, rot: -0.04 })
      bits(x, 'moon', 940, 640, 14 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 1100, 'COZY MODE: ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Overplanning Monday? | *One sticky note.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), big = lt < 1.1
      if (big) note(x, 800, 850, k, '6:00 plan | 6:05 replan | 6:10 backup | 6:15 backup²', { head: 'MONDAY v14', headBg: SKYB, size: 30, w: 330, rot: 0.03 })
      else note(x, 800, 860, pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2), 'be kind | to me.', { bg: '#ffe680', size: 44, w: 270, rot: -0.05 })
      sparkles(x, t, 800, 860, P.t0 + 1.45, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Missing someone? | *Text them first.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '6:12', head: lt > 1.2 ? 'DELIVERED ✓' : 'TYPING…', msg: 'thought | of you', bg: lt > 1.2 ? PINK : LAV, size: 34 })
      bubble(x, 800, 560, 'me too!!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      hearts(x, t, 800, 760, P.t0 + 1.8, { n: 5, life: 1.4, spread: 160, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Feeling it all at once? | *Journal it out.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'book', 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'PRIVATE. VERY.', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: RED, color: PAPER, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 1080, 'PAGES: 14 (TODAY)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0561', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: "Scorpio, here's your | *Sunday reset.*",
  cameos: CAMEOS,
  group: {
    cap: 'Reset complete. | *Mystery restored.*', mood: 'wink',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
