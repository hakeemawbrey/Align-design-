// r2a0048: THE SIGNS AS… v3, SOLO advice film, "Leo, you can't fix | everyone." (~47 s vertical, signs3kit, lofi · C)
// One Leo, nine cards: the big-hearted Leo who tries to save everyone + a warm reframe. Ending: group.
//   0.0–3.6    "Leo, you can’t fix | *everyone.*"
//   3.6–37.8   pep talks for all, save one for you · even suns set · their drama isn't your stage (curtains)
//              · crown heavy? set it down (cushion) · the door can close at ten · cheering counts (no carrying)
//              · let them find their own roar · big hearts need naps (battery) · royalty delegates (a decree)
//  37.8        group ending: "You shine brighter | *after a rest.*" (Leo naps)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'leo', ORANGE = '#ffb34a', RED = '#e23d4e', PLUM = '#7a2e5c', WOOD = '#8a4a2e'

const CROWN = [
  'Y...Y...Y',
  'YY.YYY.YY',
  'YYYYYYYYY',
  'YRYYBYYRY',
  'YYYYYYYYY',
]
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const CUSHION = [
  'T.PPPPPPPPP.T',
  '.PPPPPPPPPPP.',
  'PPPPPPPPPPPPP',
  '.PPPPPPPPPPP.',
  'T.PPPPPPPPP.T',
]
const CUSHION_C = { P: PLUM, T: GOLD }
const SUN = [
  '...Y...Y...',
  '....OOOO...',
  'Y.OOOOOOO.Y',
  '.OOOOOOOOO.',
  '.OOOOOOOOO.',
  'YOOOOOOOOOY',
  '.OOOOOOOOO.',
]
const SUN_C = { Y: GOLD, O: ORANGE }
const BOX = [
  'KKKKKKKK',
  'KBBBBBBK',
  'KBBTTBBK',
  'KBBBBBBK',
  'KBBBBBBK',
  'KKKKKKKK',
]
const BOX_C = { K: WOOD, B: '#c98f5a', T: '#e8c48a' }

function battery(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -70, 300, 140); x.fillRect(150, -30, 24, 60)
  x.fillStyle = '#140c30'; x.fillRect(-140, -60, 280, 120)
  const n = Math.round(p * 5)
  for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? (n <= 1 ? RED : MINT) : '#2a2350'; x.fillRect(-130 + i * 54, -50, 46, 100) }
  x.restore()
}
function doorSign(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(open ? 0.05 : -0.05); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(-60, -80); x.lineTo(0, -130); x.lineTo(60, -80); x.stroke()
  x.fillStyle = INK; x.fillRect(-170, -86, 340, 150)
  x.fillStyle = open ? MINT : LAV; x.fillRect(-162, -78, 324, 134)
  x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(open ? 'OPEN 24/7' : 'CLOSED', 0, open ? -10 : -26)
  if (!open) { x.font = `700 26px ${MONO}`; x.fillText('(resting)', 0, 22) }
  x.restore()
}
function decree(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -170, 300, 340)
  x.fillStyle = '#fff1d0'; x.fillRect(-142, -162, 284, 324)
  x.fillStyle = '#c98f2a'; x.fillRect(-160, -186, 320, 26); x.fillRect(-160, 160, 320, 26)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 30px ${INTER}`; x.fillText('ROYAL DECREE', 0, -110)
  x.font = `700 30px ${MONO}`; x.fillStyle = '#5b2e1a'; x.fillText('could you', 0, -30); x.fillText('help me', 0, 14); x.fillText('a bit?', 0, 58)
  x.fillStyle = RED; x.beginPath(); x.arc(80, 120, 26, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Pep talks for everyone? | *Save one for you.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -180 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      const toMe = lt > 1.3
      bubble(x, 780, 720, toMe ? 'and YOU, | Leo? you too.' : 'you got this! | and you! and—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl', col: toMe ? MINT : BONE })
      label(x, 790, 980, toMe ? 'PEP TALK: SELF' : 'PEP TALKS: 41', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Everyone’s sunshine? | *Even suns set.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.beginPath(); x.rect(560, 560, 420, 470); x.clip()
      drawBits(x, SUN, SUN_C, 790, lerp(780, 1000, ease.inOutCubic(prog(lt, 0.7, 1.9))), 24 * k)
      x.restore()
      x.fillStyle = INK; x.fillRect(570, 1024, 400, 10); x.fillStyle = LAV; x.fillRect(570, 1034, 400, 40)
      label(x, 790, 640, 'GOODNIGHT, SUN', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their drama | *isn’t your stage.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      const c = ease.inOutCubic(prog(lt, 0.7, 1.4))
      x.save(); x.translate(790, 840); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-190, -200, 380, 30); x.fillStyle = GOLD; x.fillRect(-184, -196, 368, 22)
      for (const d of [-1, 1]) {
        const w = lerp(60, 184, c)
        x.fillStyle = INK; x.fillRect(d < 0 ? -190 : 190 - w - 6, -172, w + 6, 340)
        x.fillStyle = RED; x.fillRect(d < 0 ? -186 : 186 - w, -168, w - 2, 332)
        x.fillStyle = '#b02a3a'; for (let i = 0; i < 4; i++) x.fillRect((d < 0 ? -186 : 186 - w) + i * w / 4 + 6, -168, 6, 332)
      }
      x.restore()
      label(x, 790, 1100, 'SHOW’S OVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Crown feeling heavy? | *Set it down.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P, F) {
      drawBits(x, CUSHION, CUSHION_C, 790, 1020, 18 * pop01(t, P.t0 + 0.3, 0.35, 2))
      const m = ease.inOutCubic(prog(lt, 0.8, 1.4))
      const arc = Math.sin(Math.PI * m) * 120
      drawBits(x, CROWN, CROWN_C, lerp(F.x, 790, m), lerp(F.top - 28, 960, m) - arc, 15, { rot: lerp(0.06, 0, m) })
      label(x, 790, 680, 'LIGHTER NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Open for every crisis? | *Doors can close.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const open = lt < 1.2
      doorSign(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2) * (open ? 1 : pop01(t, P.t0 + 1.2 * 1.29, 0.35, 2)), open)
      label(x, 790, 1090, 'BACK TOMORROW', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You don’t have to carry. | *Cheering counts.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        const Fc = signChar(x, t, 'taurus', 800, 980, 200 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.8] })
        drawBits(x, BOX, BOX_C, 800, Fc.top - 50, 14 * k)
      }
      bubble(x, 560, 640, 'you got it!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 800, 1140, 'CHEER SQUAD: 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *find their own roar.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 960, 180 * k, { mood: lt > 1.2 ? 'sparkle' : 'neutral', look: [0, 0], seed: 19, glyph: false, hops: [P.t0 + 1.6], tears: 2 })
      bubble(x, 800, 720, 'rawr!', pop01(t, P.t0 + 1.2, 0.25, 2.4), { size: 50, tail: 'bc' })
      label(x, 800, 1120, 'SO PROUD', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hearts this big | *need naps too.*', mood: lt => lt > 0.9 ? 'sleepy' : 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      const p = lt < 0.9 ? 0.2 : clamp(0.2 + (lt - 0.9) / 1.2)
      battery(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), p)
      label(x, 790, 1010, `RECHARGING ${Math.round(p * 100)}%`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Need help? | *Royalty delegates.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      decree(x, 790, 850, pop01(t, P.t0 + 0.3, 0.35, 2) * 0.95)
      sparkles(x, t, 790, 850, P.t0 + 1.2, 7, 200, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0048', key: 'C', accent: ORANGE, solo: S, ending: 'group',
  title: 'Leo, you can’t fix | *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'You shine brighter | *after a rest.*', mood: 'sleepy' },

})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
