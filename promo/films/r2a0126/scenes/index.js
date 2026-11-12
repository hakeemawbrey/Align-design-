// r2a0126: star_advice, ADVICE SOLO, "Gemini, want more? | You're allowed." (topic: Gemini, you're allowed to want more) (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one gag each.
//   0.0–3.6    "Gemini, want more? | *You’re allowed.*"
//   3.6–37.8   ten hobbies (keep them all) · bored of small talk (ask the big one) · changed your mind (that's growing)
//              · want deeper friends (say so) · a match sent "hey" (ask for more) · two sides of you (both welcome)
//              · forty group chats (find your people) · restless at work (the kite climbs) · your curiosity is a gift
//  37.8        GROUP ENDING: "Big dreams? | *All yours.*"  The big Gemini comes back, hearts in its eyes.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const HOBBIES = ['GUITAR', 'POTTERY', 'FRENCH', 'CHESS', 'BAKING', 'SKATING', 'POETRY', 'BIRDS', 'YOGA', 'MAGIC']
const HCOL = [YEL, PINK, SKYB, MINT, LAV, ORANGE]
// a signpost with arrows that keep flipping
function signpost(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 330); x.fillStyle = '#8a4a2e'; x.fillRect(-8, -144, 16, 318)
  const arrows = [['PLAN A', -110, 1], ['PLAN B', -30, -1], ['PLAN C', 50, 1]]
  arrows.forEach(([txt, y, d], i) => {
    if (lt < 0.25 + i * 0.35) return
    const dir = d * (Math.floor(lt * 1.5 + i) % 2 ? 1 : -1)
    x.save(); x.translate(0, y); x.scale(dir, 1)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-20, -36); x.lineTo(150, -36); x.lineTo(196, 0); x.lineTo(150, 36); x.lineTo(-20, 36); x.fill()
    x.fillStyle = HCOL[i]; x.beginPath(); x.moveTo(-14, -30); x.lineTo(148, -30); x.lineTo(186, 0); x.lineTo(148, 30); x.lineTo(-14, 30); x.fill()
    x.scale(dir, 1); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, dir * 82, 2)
    x.restore()
  })
  x.restore()
}
// a kite that climbs out of the office
function kite(x, t, cx, cy, k, lift) {
  if (k <= 0.01) return
  const ky = cy - lift * 260, kx = cx + Math.sin(t * 2) * 20
  x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(cx - 160, cy + 260)
  x.quadraticCurveTo(cx - 60, ky + 200, kx, ky + 60); x.stroke(); x.restore()
  x.save(); x.translate(kx, ky); x.scale(k, k); x.rotate(0.1 * Math.sin(t * 2.4))
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -96); x.lineTo(76, 0); x.lineTo(0, 96); x.lineTo(-76, 0); x.fill()
  x.fillStyle = YEL; x.beginPath(); x.moveTo(0, -84); x.lineTo(64, 0); x.lineTo(0, 0); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(0, -84); x.lineTo(-64, 0); x.lineTo(0, 0); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.moveTo(0, 84); x.lineTo(64, 0); x.lineTo(0, 0); x.fill()
  x.fillStyle = MINT; x.beginPath(); x.moveTo(0, 84); x.lineTo(-64, 0); x.lineTo(0, 0); x.fill()
  for (let i = 0; i < 4; i++) { x.fillStyle = HCOL[i]; x.fillRect(-8 + 16 * Math.sin(t * 4 + i), 100 + i * 34, 16, 16) }
  x.restore()
}
// a gift box whose lid pops and a question mark bounces out
function gift(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const lid = ease.outBack ? ease.outCubic(prog(lt, 0.7, 1.0)) : prog(lt, 0.7, 1.0)
  if (lt > 0.8) {
    const q = ease.outCubic(prog(lt, 0.8, 1.3))
    x.fillStyle = INK; x.font = `800 ${Math.round(150 * q + 10)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('?', 4, -150 * q + 4); x.fillStyle = YEL; x.fillText('?', 0, -150 * q)
  }
  x.fillStyle = INK; x.fillRect(-136, -60, 272, 200); x.fillStyle = PINK; x.fillRect(-128, -52, 256, 184)
  x.fillStyle = GOLD; x.fillRect(-20, -52, 40, 184)
  x.save(); x.translate(-150 * lid, -80 - 140 * lid); x.rotate(-0.6 * lid)
  x.fillStyle = INK; x.fillRect(-152, -40, 304, 56); x.fillStyle = '#ff6f9a'; x.fillRect(-146, -34, 292, 44); x.fillStyle = GOLD; x.fillRect(-20, -34, 40, 44)
  x.fillStyle = GOLD; x.fillRect(-56, -70, 46, 34); x.fillRect(10, -70, 46, 34)
  x.restore()
  x.restore()
}

const S = 'gemini'
const CAMEOS = [
  // 1 · ten hobbies
  { sign: S, cap: 'Ten hobbies at once? | *Keep them all.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) / 0.22) + 1)
      for (let i = 0; i < n; i++) label(x, 790 + (i % 2 ? 40 : -40), 1060 - i * 82, HOBBIES[i], pop01(t, P.t0 + 0.2 + i * 0.22, 0.25, 2.2), { size: 32, bg: HCOL[i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
      bubble(x, 400, 600, 'and | knitting?', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  // 2 · small talk
  { sign: S, cap: 'Bored of small talk? | Ask *the big one.*', mood: lt => lt < 1.2 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      if (lt < 1.2) bubble(x, 780, 760, 'nice | weather…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      else bubble(x, 780, 760, 'what’s your | wildest dream?', pop01(t, P.t0 + 1.25, 0.25, 2.2), { size: 40, col: YEL, tail: 'bl' })
      label(x, 790, 1080, 'CONVO: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 760, P.t0 + 1.25, 7, 200, 0.4)
    } },
  // 3 · changed your mind
  { sign: S, cap: 'Changed your mind again? | That’s *growing.*', mood: lt => lt < 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      signpost(x, 760, 860, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1130, 'ALL ROADS: VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 4 · deeper friends
  { sign: S, cap: 'Want deeper friendships? | *Say so.*', mood: lt => lt < 1.3 ? 'neutral' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'can we talk | for real?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 800, 920, 'finally!! | yes!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 2 })
    } },
  // 5 · Align: a match sent "hey"
  { sign: S, cap: 'A match sent “hey.” | *Ask for more.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 600, '✦ NEW MATCH: LIBRA', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 780, 'hey', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 56, col: BONE, tail: 'br' })
      bubble(x, 790, 960, 'tell me your | favourite memory', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: YEL, tail: 'bl' })
      label(x, 790, 1130, 'UPGRADE: DEEP TALK', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · two sides of you
  { sign: S, cap: 'Two sides of you? | *Both welcome.*', mood: 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, S, 700, 900, 170 * k, { mood: 'sparkle', seed: 31, glyph: false, hops: [P.t0 + 1.2] })
        signChar(x, t, S, 880, 900, 170 * k, { mood: lt > 1.1 ? 'wink' : 'sleepy', seed: 32, glyph: false, hops: [P.t0 + 1.4] })
      }
      label(x, 590, 640, 'PARTY ME', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.06, font: MONO, weight: 700 })
      label(x, 880, 660, 'COUCH ME', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 28, bg: SKYB, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1130, 'TABLE FOR THREE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03 })
    } },
  // 7 · forty group chats
  { sign: S, cap: 'In forty group chats? | Find *your people.*', mood: lt => lt < 1.3 ? 'wide' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const many = lt < 1.3
      if (many) for (let i = 0; i < 6; i++) bubble(x, 700 + (i % 2) * 170, 640 + Math.floor(i / 2) * 150, '99+', pop01(t, P.t0 + 0.2 + i * 0.1, 0.22, 2.2), { size: 40, col: HCOL[i], tail: i % 2 ? 'br' : 'bl' })
      else bubble(x, 790, 800, 'the | three of us', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      if (!many) hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 7 })
      label(x, 790, 1120, many ? 'UNREAD: ALL' : 'MUTED: 37', pop01(t, P.t0 + (many ? 0.8 : 1.5), 0.3, 2.4), { size: 34, bg: many ? RED : MINT, color: many ? CREAM : INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · restless at work
  { sign: S, cap: 'Restless at work? | Let *it fly.*', mood: lt => lt < 1.0 ? 'neutral' : 'sparkle', look: [1, -1], star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      kite(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.6, 1.8)))
      label(x, 800, 1130, 'ALTITUDE: RISING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 9 · curiosity
  { sign: S, cap: 'Your curiosity | is *a gift.*', mood: lt => lt < 1.0 ? 'happy' : 'heart', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      gift(x, t, 790, 960, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 790, 1150, 'OPEN DAILY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.05, 8, 190, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0126', key: 'D', accent: YEL, solo: 'gemini', ending: 'group',
  title: 'Gemini, want more? | *You’re allowed.*',
  cameos: CAMEOS,
  group: { cap: 'Big dreams? | *All yours.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
