// r2a0767: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, your | *Monday pep talk.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine Monday truths for a restless Sagittarius, each with a warm reframe and one light gag.
// (Hook from the batch topic "Sagittarius, here's your Monday pep talk", tightened to fit the 2-line title box.)
// Ending: lesson ("Freedom isn't a place. | *You bring it.*") then "Go get it, | *archer.*"
//   one snooze, then go · tiny desk, the mind still flies (plane loops the laptop) · meeting bingo · inbox 400 → 399,
//   celebrate · walk the long way · too honest, but kind · five trips planned at lunch · new mug, new Monday
//   · Friday's far, already moving (MON ▸▸▸ FRI)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -180 }

/** a 3×3 bingo card that dots squares one by one */
function bingo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const W = ['“quick sync”', 'on mute', 'next slide', 'circle back', 'FREE', 'can u see?', 'per my email', 'dog barks', 'any qs?']
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 316, 330)
  x.fillStyle = INK; x.fillRect(-164, -176, 328, 344); x.fillStyle = CREAM; x.fillRect(-156, -168, 312, 328)
  x.fillStyle = ACC; x.fillRect(-156, -168, 312, 50); x.fillStyle = INK; x.font = '700 26px "Space Mono", monospace'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MEETING BINGO', 0, -142)
  const n = Math.floor(clamp((lt - 0.4) / 1.4) * 5)
  const order = [4, 0, 1, 2, 6]
  for (let i = 0; i < 9; i++) {
    const c = i % 3, r = Math.floor(i / 3), px = -100 + c * 100, py = -64 + r * 84
    x.fillStyle = '#e8dcc6'; x.fillRect(px - 46, py - 38, 92, 76)
    x.fillStyle = INK; x.font = '800 15px Inter, sans-serif'; x.fillText(W[i], px, py)
    if (order.slice(0, n).includes(i)) { x.fillStyle = 'rgba(201,123,255,0.75)'; x.beginPath(); x.arc(px, py, 30, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Alarm feels like a cage? | *Snooze once. Then go.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const ring = lt < 1.3 ? Math.sin(t * 40) * 0.12 : 0
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: ring })
      L(x, 800, 650, 'MON 7:00', pop01(t, P.t0 + 0.3, 0.3, 2.2), CREAM, -0.04, 36)
      L(x, 790, 1090, 'SNOOZE: 1 (ONE)', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Desk feels tiny? | *Your mind still travels.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'LAPTOP', 800, 940, 18 * k)
      if (lt > 0.6) { const a = (lt - 0.6) * 3.2; bits(x, 'PLANE', 800 + Math.cos(a) * 140, 860 + Math.sin(a) * 110, 12, { rot: a + Math.PI / 2 }) }
      L(x, 800, 1110, 'MENTALLY: ABROAD', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, 0.04, 30)
    } },
  { sign: S, cap: 'Bored by minute ten? | *Make it a game.*', mood: lt => lt > 1.2 ? 'wink' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bingo(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 790, 1100, 'BINGO BY 10:15', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Inbox at four hundred? | *Answer one. Celebrate.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      const done = lt > 1.2
      L(x, 790, 800, done ? 'INBOX: 399' : 'INBOX: 400', pop01(t, P.t0 + 0.2, 0.3, 2), done ? MINT : RED, -0.04, 48)
      confetti(x, t, 790, 800, P.t0 + 1.25 * (3.1 / 2.4))
      L(x, 790, 1060, 'PROGRESS!', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.05, 36)
    } },
  { sign: S, cap: 'Restless by noon? | *Take the long way.*', mood: lt => lt > 1.0 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 870, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      L(x, 800, 650, 'LUNCH: 2 BLOCKS', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1090, 'WALKED: 9 BLOCKS', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Too honest again? | *It came from love.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      friend(x, t, 'libra', 830, 980, 180, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.6] })
      bubble(x, 760, 690, 'that haircut | is… brave!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 740, 1120, 'THEY LAUGHED. PHEW.', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Planned five trips at lunch? | *Dreaming is fuel.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'OPEN TABS', headBg: ACC, headInk: INK, lines: ['mountains', 'islands', 'that one train', 'all of iceland?', 'tab 47…'], size: 28, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1100, 'LUNCH: 30 MIN', pop01(t, P.t0 + 1.8, 0.3, 2.2), CREAM, 0.04, 30)
    } },
  { sign: S, cap: 'Same routine, same mug? | *Change one tiny thing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const nw = lt > 1.0
      bits(x, 'MUG', 800, 880, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), nw ? undefined : { alpha: 0.8 })
      if (nw) drawBits(x, ['.WWWWWW...', 'WPPPPPPW..', 'WPYPPYPWWW', 'WPPPPPPW.W', 'WPYPPYPW.W', 'WPPPPPPWWW', 'WPPPPPPW..', '.WWWWWW...'], { W: BONE, P: ACC, Y: GOLD }, 800, 880, 20 * pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.4))
      swapLabel(x, 800, 1090, lt, 0.9, 'SAME MUG', 'NEW MUG. NEW MONDAY.', { size: 28, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 880, P.t0 + 1.3, 7, 150, 0.2)
    } },
  { sign: S, cap: 'Friday feels far? | *You’re already moving.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = clamp((lt - 0.4) / 1.6)
      if (k > 0.01) {
        x.save(); x.globalAlpha = clamp(k)
        x.fillStyle = INK; x.fillRect(612, 832, 356, 56); x.fillStyle = '#2a2350'; x.fillRect(620, 840, 340, 40)
        x.fillStyle = MINT; x.fillRect(620, 840, 340 * (0.12 + 0.3 * p), 40)
        x.restore()
      }
      L(x, 650, 750, 'MON', k, MINT, -0.04, 36); L(x, 930, 750, 'FRI', k, CREAM, 0.04, 36)
      L(x, 800, 1000, 'ARROW: FLYING', pop01(t, P.t0 + 1.4, 0.3, 2.2), ACC, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0767', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sagittarius, your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: { cap: 'Same fire. | *Monday edition.*', mood: 'sparkle' },
  lesson: { text: 'Freedom isn’t a place. | *You bring it.*', chip: 'MONDAY: HANDLED' },
  last: { text: 'Go get it, | *archer.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
