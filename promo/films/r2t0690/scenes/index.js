// r2t0690: star_talk, SOLO (aquarius), "Aquarians in the group chat | *be like.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine extreme Aquarius group-chat moves.
//   renamed the chat 41 times · sent a four-hour documentary · a poll: "is time real?" · left, rejoined under a new name
//   · planning dinner, pitched a boat · muted the chat, still the admin · dropped a wild theory, logged off
//   · colour-coded the chat by sign · silent for a week, then one perfect text
// Ending: lesson. group "Chaos admin. | *Total sweetheart.*" · lesson · "New chat name? | *Pending.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const SIGNCOL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0']

const CAMEOS = [
  { sign: S, cap: 'Renamed the group chat. | *Forty-one times.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      const N = ['SOUP CLUB', 'THE VOID', 'BOAT PEOPLE', 'chat (new)', 'COSMIC ✦']
      const i = Math.min(N.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.35))
      L(x, 800, 820, N[i], pop01(t, P.t0 + 0.2, 0.3, 2), [SKYB, GOLD, PINK, STEEL, LAV][i], i % 2 ? 0.05 : -0.05, 46)
      L(x, 800, 1040, `RENAME #${37 + i}`, pop01(t, P.t0 + 0.5, 0.3, 2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Sent the chat | *a four-hour documentary.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE CHAT', headCol: SKYB, lines: [['▶ 4:12:07', GOLD, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['watch by tonight', SKYB, pop01(t, P.t0 + 0.9, 0.2, 2), true], ['…', STEEL, pop01(t, P.t0 + 1.6, 0.2, 2), false]], size: 26 })
    } },
  { sign: S, cap: 'Started a poll: | *“Is time real?”*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.6, 1.6))
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 320, head: 'POLL', headBg: SKYB, headInk: INK, lines: ['is time real?', 'yes', 'no', 'what??'], size: 32, align: 'left' })
      if (f > 0.01) { x.fillStyle = MINT; x.fillRect(800 - 40, 860 - 25, 170 * f * 0.2, 16); x.fillRect(800 - 40, 860 + 18, 170 * f * 0.1, 16); x.fillStyle = PINK; x.fillRect(800 - 10, 860 + 61, 150 * f, 16) }
      L(x, 800, 1100, 'VOTES: “WHAT??”', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Left the chat. | *Rejoined under a new name.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE CHAT', headCol: SKYB, lines: [['aqua left', STEEL, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['“x” joined', LAV, pop01(t, P.t0 + 1.0, 0.2, 2), false], ['hi, i’m new', SKYB, pop01(t, P.t0 + 1.4, 0.2, 2), true]], size: 26 })
      L(x, 810, 1110, 'IT’S AQUARIUS', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Planning dinner? | Aquarius *pitched a boat.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'what if… a boat?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const BOAT = ['.....W......', '.....WW.....', '.....WWW....', '.....WWWW...', '.....W......', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..']
      drawBits(x, BOAT, { W: BONE, B: '#c98f5a' }, 800, 900 + Math.sin(t * 3) * 8, 16 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1100, 'DINNER: DERAILED', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Muted the chat. | *Still the admin.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'CHAT: MUTED', pop01(t, P.t0 + 0.3, 0.3, 2), STEEL, -0.04, 48)
      L(x, 800, 940, 'ADMIN: AQUARIUS', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 38)
      L(x, 800, 1080, 'RULES: 1. BE WEIRD', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'Dropped a wild theory. | *Logged off.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what if clouds | are just shy?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 960, 'AQUARIUS: OFFLINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), STEEL, -0.04, 32)
      L(x, 800, 1090, '87 REPLIES', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Colour-coded the chat | *by everyone’s sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 800, 860, k, { w: 330, h: 330, head: 'MEMBERS', headBg: SKYB, headInk: INK, lines: [], size: 30 })
      const G = ['♈ sam', '♉ jo', '♊ ali', '♋ mo', '♌ kai', '♍ bea']
      G.forEach((g, i) => { const kk = pop01(t, P.t0 + 0.5 + i * 0.15, 0.25, 2); if (kk > 0.01) { x.save(); x.translate(800 - 130 + (i % 2) * 140, 860 - 50 + Math.floor(i / 2) * 70); x.rotate(-0.04); x.scale(kk, kk); x.fillStyle = SIGNCOL[i]; x.fillRect(0, -24, 120, 48); x.fillStyle = INK; x.font = '700 24px ui-monospace, monospace'; x.textBaseline = 'middle'; x.fillText(g, 10, 2); x.restore() } })
      L(x, 800, 1110, 'MERCURY: NOTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Silent for a week. | Then *one perfect text.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 810, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE CHAT', headCol: SKYB, lines: [['…7 days…', STEEL, pop01(t, P.t0 + 0.4, 0.2, 2), false], ['love u weirdos', PINK, pop01(t, P.t0 + 1.2, 0.2, 2), true]], size: 26 })
      hearts(x, t, 810, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 1 })
      L(x, 810, 1110, 'CHAT: IN TEARS', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0690', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarians in the group chat | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaos admin. | *Total sweetheart.*', mood: 'sparkle' },
  lesson: { text: 'The weird friend | *keeps the chat alive.*', chip: 'CHAT: THRIVING' },
  last: { text: 'New chat name? | *Pending.*' },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.71)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
