// trs2groupchat: THE SIGNS IN… the group chat. (v2 calm cut, ~64 s vertical, music: lofi · E)
// Built on ../../signs2kit.js (safe area, 3.8 s per sign, quiet cue sheet). Story: hook title, then one stage card per
// sign in zodiac order, each with ONE chat-bubble / pixel-prop joke, then the group beat, the lesson and the last line.
//   ♈ replies instantly · ♉ quiet all week, back for dinner plans · ♊ every thought as its own bubble · ♋ remembers
//   everyone's birthday · ♌ made the group pic their selfie · ♍ sends the recap · ♎ starts a poll for everything
//   · ♏ reads everything, says nothing · ♐ texts from a new city · ♑ "let's lock in a date" · ♒ a link, no context
//   · ♓ cries at the old photos
import { prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK,
} from '../../signs2kit.js'

// ── props
const CAKE = ['..R..R..', '..Y..Y..', 'WWWWWWWW', 'WPPWWPPW', 'WWWWWWWW', 'SSSSSSSS']
const CAKE_C = { W: '#fff4e2', P: '#ffb3c8', R: '#ff4f6d', Y: '#ffe27a', S: '#c9b48a' }
const PHOTO = ['KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBYYBBBK', 'KBBYYYYBBK', 'KBBBYYBBBK', 'KBBYBBYBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const PHOTO_C = { K: '#fff4e2', B: '#5fb6ff', Y: GOLD }
const CROWN = ['G...G...G', 'GG.GGG.GG', 'GGGGGGGGG', 'GRGGBGGRG']
const CROWN_C = { G: GOLD, R: '#ff4f6d', B: '#5fb6ff' }
const CAL = ['RRRRRRRR', 'WWWWWWWW', 'WGWGWGWW', 'WWWWWWWW', 'WGWGWGWG', 'WWWWWWWW', 'WGWGWGWW', 'WWWWWWWW']
const CAL_C = { R: '#e23d4e', W: '#f4e8cc', G: '#b9b0a0' }
const TICK = ['.....G', '....G.', 'G..G..', '.GG...']
const CASE = ['..BBBB..', '..B..B..', 'OOOOOOOO', 'OSOOOOSO', 'OSOOOOSO', 'OOOOOOOO', '.K....K.']
const CASE_C = { B: '#6b3d22', O: '#ff9f4a', S: '#ffe27a', K: INK }
const OLDPIC = ['WWWWWWWWWW', 'WSSSSSSSSW', 'WSPSSSSPSW', 'WSPPSSPPSW', 'WSSSSSSSSW', 'WWWWWWWWWW', 'WWWWWWWWWW']
const OLDPIC_C = { W: '#f4e8cc', S: '#c9a87a', P: '#7a5a3a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Replies *instantly.* | Every time.', mood: 'sparkle', hops: [0.5], star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 690, 700, 'on it!', pop01(t, P.t0 + 0.15, 0.25, 2.2), { size: 44, tail: 'bl', col: '#ffd0c4' })
    } },
  { sign: 'taurus', cap: 'Quiet all week. | Back for *dinner.*', mood: lt => lt < 1 ? 'sleepy' : 'sparkle', star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 700, 690, 'dinner? | i’m in', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl', col: '#c8f2d4' })
    } },
  { sign: 'gemini', cap: 'Every thought gets | its *own bubble.*', mood: 'happy', star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const W = ['ok', 'wait', 'also', 'lol', 'one more']
      W.forEach((w, i) => bubble(x, 700 + (i % 2) * 40, 600 + i * 105, w, pop01(t, P.t0 + 0.2 + i * 0.32, 0.22, 2.2), { size: 36, tail: 'bl', col: '#fff1a8' }))
    } },
  { sign: 'cancer', cap: 'Remembers *everyone’s* | birthday.', mood: 'sparkle', star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.32, 2)
      drawBits(x, CAKE, CAKE_C, 330, 960, 26 * k)
      label(x, 330, 800, 'HBD!!', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: -0.08 })
      sparkles(x, t, 330, 940, P.t0 + 0.6, 8, 150, 1, [GOLD, BONE, PINK])
    } },
  { sign: 'leo', cap: 'Made the group pic | *their selfie.*', mood: 'wink', star: { x: 150 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.32, 2)
      drawBits(x, PHOTO, PHOTO_C, 320, 880, 26 * k, { rot: -0.06 })
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 20, 12)
    } },
  { sign: 'virgo', cap: 'Sends the *recap.* | With bullet points.', mood: 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 700, 720, 'recap: | • sat, 6pm | • the park | • bring snacks', pop01(t, P.t0 + 0.25, 0.3, 2), { size: 34, tail: 'bl', col: '#d8f0c8' })
    } },
  { sign: 'libra', cap: 'Starts a *poll* | for everything.', mood: 'sparkle', star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 860); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-160, -150, 320, 300)
      x.fillStyle = '#f4e8cc'; x.fillRect(-150, -140, 300, 280)
      x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('PIZZA OR TACOS?', -132, -100)
      const fills = [0.5, 0.5], cols = ['#ff8fb1', '#8fe3ff']
      fills.forEach((f, i) => {
        const w = 264 * f * ease.outCubic(prog(lt, 0.5 + i * 0.2, 1.4 + i * 0.2))
        x.fillStyle = '#d9cfbd'; x.fillRect(-132, -40 + i * 90, 264, 50)
        x.fillStyle = cols[i]; x.fillRect(-132, -40 + i * 90, w, 50)
      })
      x.restore()
    } },
  { sign: 'scorpio', cap: 'Reads everything. | Says *nothing.*', mood: 'neutral', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 700, 720, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 64, tail: 'bl', col: '#c9c4d8' })
      label(x, 720, 870, 'SEEN', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: '#6b62a8', color: BONE, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Texts you from | a *new city.*', mood: 'sparkle', star: { x: 150 }, hops: [0.8],
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 320, 1000, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 330, 700, 'guess where | i am!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'br', col: '#e3cfff' })
    } },
  { sign: 'capricorn', cap: '“Let’s lock in | *a date.*”', mood: 'happy', star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAL, CAL_C, 320, 900, 30 * k)
      if (lt > 1.1) drawBits(x, TICK, { G: '#2fc79a' }, 350, 920, 22 * pop01(t, P.t0 + 1.1, 0.25, 2.2))
    } },
  { sign: 'aquarius', cap: 'Sends a link. | *No context.*', mood: 'wink', star: { x: -150 },
    front(x, t, lt, P) {
      bubble(x, 700, 720, 'look at this ↗', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'bl', col: '#bff3ff' })
      bubble(x, 760, 880, '?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'br', col: '#f4e8cc' })
    } },
  { sign: 'pisces', cap: 'Cries at | *the old photos.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.32, 2)
      drawBits(x, OLDPIC, OLDPIC_C, 320, 880, 26 * k, { rot: -0.08 })
      label(x, 320, 1065, 'throwback', k, { size: 28, bg: '#7c74f0', color: BONE, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'trs2groupchat', key: 'E', accent: '#8fe3ff',
  title: 'The signs in | the *group chat.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone *showed up* | for the plan.' },
  lesson: { text: 'Your people | are *your home.*', chip: 'CHAT: UNMUTED' },
  last: {
    text: 'Send the *text.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
