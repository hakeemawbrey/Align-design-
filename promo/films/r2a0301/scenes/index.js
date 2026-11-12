// r2a0301: star_advice, ADVICE SOLO, "How to check in | *on a Scorpio.*" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle ways to check in on a Scorpio, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "How to check in | *on a Scorpio.*"
//   3.6–37.8   nine cards: "fine" means ask once more · send a text, no pressure · bring snacks, not questions
//              · trust warms up slowly · remember the small stuff · quiet isn't angry, it's recharging
//              · share something back · don't fix it, just sit with them · get let in, you're in for life
//  37.8        "Gentle and steady | *wins them over.*"
//  41.2        CALLBACK: "Bring the snacks. | They’ll *tell you everything.*"  the snack bowl comes back, the Scorpio opens up.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b8a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const BOWL = ['..C.Y..C.Y..', '.CYCYCYCYCY.', 'KKKKKKKKKKKK', 'KBBBBBBBBBBK', '.KBBBBBBBBK.', '..KBBBBBBK..', '...KKKKKK...']
const BOWL_C = { K: INK, B: LAV, C: ORANGE, Y: GOLD }
const VAULT = ['KKKKKKKKKK', 'KGGGGGGGGK', 'KGKKKKKKGK', 'KGK.YY.KGK', 'KGK.YY.KGK', 'KGKKKKKKGK', 'KGGGGGGGGK', 'KKKKKKKKKK']
const CANDLE = ['...F...', '..FYF..', '..FYF..', '...W...', '.WWWWW.', '.WWWWW.', '.WWWWW.', '.WWWWW.', 'KKKKKKK']
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDYDK', 'KDDDDDDK', 'KDDDDDDK', 'KDDDDDDK', 'KKKKKKKK']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 26px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
function thermo(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-34, -200, 68, 330); x.beginPath(); x.arc(0, 150, 62, 0, 7); x.fill()
  x.fillStyle = CREAM; x.fillRect(-22, -188, 44, 320); x.beginPath(); x.arc(0, 150, 50, 0, 7); x.fill()
  x.fillStyle = ACC; x.beginPath(); x.arc(0, 150, 40, 0, 7); x.fill(); const h = 300 * f; x.fillRect(-14, 130 - h, 28, h + 20)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(22, -170 + i * 52, 18, 5)
  x.restore()
}
function note(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -132, 300, 280)
  x.fillStyle = INK; x.fillRect(-156, -146, 312, 292); x.fillStyle = '#ffe27a'; x.fillRect(-148, -138, 296, 276)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -120, -80 + i * 56))
  x.restore()
}
function battery(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillRect(130, -30, 26, 60)
  x.fillStyle = '#140c30'; x.fillRect(-118, -58, 236, 116)
  const n = Math.max(1, Math.round(f * 5)); x.fillStyle = MINT
  for (let i = 0; i < n; i++) x.fillRect(-108 + i * 46, -48, 38, 96)
  x.restore()
}

const S = 'scorpio'
const CAMEOS = [
  { sign: S, cap: 'They said “fine”? | Ask *one more time.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'i’m fine.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      bubble(x, 790, 880, 'you sure?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      bubble(x, 790, 1080, '…ok, so', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Send a text. | *No pressure attached.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 750, 860, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: '♏︎ MY MATCH', headCol: ACC, lines: [
        ['thinking of u', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true],
        ['no need', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['to reply', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2), true],
        ['♡', ACC, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'Bring snacks, | *not questions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 650, 'INTERROGATION: OFF', pop01(t, P.t0 + 0.8, 0.3, 2.4), BONE, 0.04, 30)
      L(x, 790, 1100, 'CHIPS: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD)
    } },
  { sign: S, cap: 'Trust warms up slowly. | *Worth the wait.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      thermo(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.6))
      L(x, 790, 1110, lt > 1.8 ? 'TRUST: WARM' : 'TRUST: LOADING', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.8 ? ACC : BONE)
    } },
  { sign: S, cap: 'Remember the small stuff. | It’s *huge* to them.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['likes: rain', 'tea: black', 'hates: small', '       talk'])
      L(x, 790, 1100, 'NOTED ♥', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.05, 38)
      if (lt > 1.3) hearts(x, t, 560, 800, P.t0 + 1.4, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Quiet isn’t angry. | *It’s recharging.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      battery(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.3) / 1.8))
      L(x, 780, 1060, 'DO NOT DISTURB (YET)', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: S, cap: 'Share something back. | *Vaults go both ways.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = lt > 1.3
      drawBits(x, VAULT, { K: INK, G: '#9aa5c4', Y: open ? GOLD : '#4a4470' }, 790, 850, 26 * k)
      if (open) sparkles(x, t, 790, 850, P.t0 + 1.3, 7, 170, 0.4)
      bubble(x, 790, 640, 'ok, my turn', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      L(x, 790, 1100, 'VAULT: UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD)
    } },
  { sign: S, cap: 'Don’t fix it. | *Just sit with them.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 640, 940, 190 * k, { mood: 'happy', look: [-1, 0], seed: 17, glyph: false })
      const fl = 0.9 + 0.1 * Math.sin(t * 13)
      drawBits(x, CANDLE, { F: ORANGE, Y: GOLD, W: CREAM, K: INK }, 850, 940, 24 * pop01(t, P.t0 + 0.8, 0.3, 2), { sy: fl })
      L(x, 790, 660, 'ADVICE GIVEN: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT)
    } },
  { sign: S, cap: 'Get let in? | You’re in *for life.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.5, 1.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DOOR, { K: INK, D: lt > 1.2 ? ACC : '#4a4470', Y: GOLD }, 800, 840, 30 * k)
      const kk = ease.outCubic(prog(lt, 0.4, 1.1))
      if (lt > 0.4) drawBits(x, KEY, { Y: GOLD }, lerp(600, 760, kk), 860, 12)
      L(x, 790, 1120, 'MEMBERSHIP: LIFETIME', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0301', key: 'D', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'How to check in | *on a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Gentle and steady | *wins them over.*', mood: 'heart' },
  last: {
    text: 'Bring the snacks. | They’ll *tell you everything.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'scorpio', 380, 1100, 380 * k, { mood: lt > 1.6 ? 'heart' : 'happy', look: [1, 0], seed: 33, hops: [t0 + 1.5] })
      drawBits(x, BOWL, BOWL_C, 760, 1230, 28 * k)
      bubble(x, 720, 860, 'ok so, | three things…', pop01(t, t0 + 1.4, 0.25, 2.2), { size: 52, col: BONE, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
