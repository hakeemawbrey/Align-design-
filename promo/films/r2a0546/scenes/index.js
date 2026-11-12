// r2a0546: star_advice, ADVICE SOLO (gemini), "Gemini, it's okay | *to miss them.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a Gemini missing someone, each with a warm reframe and one light gag.
// Ending: card (lesson + last line over the Gemini + Libra match card: Libra is the friend who stays, card 9).
//   typed "hey" ten times · still laughing at their joke · talking to everyone, still missing one · both twins miss them
//   · rereading old messages · a playlist named after them · missing isn't going back · the compatibility was real
//   · call the friend who stays (Libra)
//   group "Big heart. | *Two of them.*"  lesson "Missing someone means | *you loved well.*"  HEART: OPEN
//   last "Text the friend | *who always texts back.*"
import { makeFilm, sparkles, hearts, bubble, notes, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -190 }
const TAPE = ['KKKKKKKKKKKKKK', 'KPPPPPPPPPPPPK', 'KPWWWWWWWWWWPK', 'KPWKKWWWWKKWPK', 'KPWKKWWWWKKWPK', 'KPWWWWWWWWWWPK', 'KPPPPPPPPPPPPK', 'KPPKKKKKKKKPPK', 'KKKKKKKKKKKKKK']
/** a horizontal meter that fills */
function meter(x, cx, cy, k, p, { w = 320, col = MINT, title = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (title) { x.fillStyle = BONE; x.font = "700 28px 'Space Mono', ui-monospace, monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -66) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -36, w + 16, 72)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -28, w, 56)
  x.fillStyle = col; x.fillRect(-w / 2, -28, w * clamp(p), 56)
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-w / 2, -28, w * clamp(p), 10)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Typed “hey” ten times? | *Missing is human.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const cur = Math.floor(t * 3) % 2 === 0 ? '|' : ' '
      phone(x, t, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'DRAFT', headCol: ACC, lines: [['hey' + cur, BONE, 1, true]], size: 34 })
      const n = Math.min(10, 1 + Math.floor(lt / 0.13))
      L(x, 800, 1100, `DELETED: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 34)
    } },
  { sign: S, cap: 'Still laugh at their joke? | *Keep the laugh.*', mood: lt => lt > 0.8 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [0.9, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'HA!', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 92, col: ACC, tail: 'bl' })
      L(x, 800, 1060, 'INSIDE JOKE: SAVED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Talking to everyone? | *You can still miss one.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bubble(x, 740 + (i % 2) * 120, 640 + i * 95, ['so anyway', 'omg yes', 'wait what', 'lol same'][i], pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2.2), { size: 30, tail: i % 2 ? 'br' : 'bl' })
      L(x, 800, 1090, 'MISSING: JUST ONE', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Both twins miss them? | *Double feelings count.*', mood: 'neutral', look: [1, 0], tears: lt => lt > 0.9 ? 1 : 0, star: ST,
    front(x, t, lt, P) {
      friend(x, t, S, 790, 900, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'neutral', look: [-1, 0], tears: lt > 0.9 ? 1 : 0, seed: 33 })
      L(x, 800, 1100, 'FEELINGS: x2', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 36)
      hearts(x, t, 590, 760, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Reread old messages? | *Smile, then put it down.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const dn = ease.inOutCubic(prog(lt, 1.2, 1.6))
      phone(x, t, 800, 830 + dn * 60, k * (1 - 0.25 * dn), { head: 'SCROLLED BACK', headCol: STEEL, lines: [['remember when', BONE, 1], ['haha yes', BONE, 1, true], ['miss that', BONE, 1]], rot: 0.05 + dn * 0.2, size: 22 })
      L(x, 800, 1110, 'PHONE: DOWN ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'A playlist named after them? | *Let it play.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TAPE, { K: INK, P: PINK, W: CREAM }, 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      if (lt > 0.6) notes(x, t, 800, 760, { n: 4, cell: 7, col: ACC, alpha: clamp((lt - 0.6) * 3), seed: 2 })
      L(x, 800, 1080, 'NOW PLAYING: “US”', pop01(t, P.t0 + 0.9, 0.3, 2.2), ACC, 0.04, 32)
    } },
  { sign: S, cap: 'Missing them isn’t | *going back.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      if (lt > 0.3) swapLabel(x, 800, 1080, lt, 1.1, 'ROUTE: BACK', 'ROUTE: FORWARD', { size: 32 })
    } },
  { sign: S, cap: 'The compatibility was real. | *So is moving on.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      L(x, 800, 700, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.0, 30)
      meter(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), 0.2 + 0.8 * ease.inOutCubic(prog(lt, 0.3, 1.0)), { col: PINK, w: 340 })
      L(x, 800, 1010, 'IT WAS REAL', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 32)
      L(x, 800, 1110, 'STILL GROWING', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Miss them, then | *call the friend who stays.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const ring = lt < 1.0 ? Math.sin(t * 40) * 0.05 : 0
      phone(x, t, 820, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING ♎︎ LIBRA', headCol: MINT, lines: [], rot: 0.05 + ring, size: 22 })
      friend(x, t, 'libra', 820, 860, 150, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: lt > 1.0 ? 'heart' : 'happy', seed: 35 })
      bubble(x, 820, 1100, 'on my way!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      hearts(x, t, 600, 800, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0546', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'Gemini, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: 'BESTIES' },
  group: { cap: 'Big heart. | *Two of them.*', mood: 'heart' },
  lesson: { text: 'Missing someone means | *you loved well.*', chip: 'HEART: OPEN' },
  last: { text: 'Now text the friend | *who texts back.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
