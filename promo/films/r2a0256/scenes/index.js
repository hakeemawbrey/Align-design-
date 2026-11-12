// r2a0256: star_advice, ADVICE SOLO, "Gem, you're allowed | to say no." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one gag each.
//   0.0–3.6    "Gem, you’re allowed | *to say no.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              three plans, one Saturday? pick one · "no" is a full sentence · group chat at 2 AM? mute is okay
//              · can't do the favour? still a good friend · both your sides need a nap · new match wants a call? text is fine
//              · forty tabs open? close a few · skipped the party? still the fun one · even your chart says rest
//  37.8        group ending: "Your *no* | makes room for *yes.*"  Gemini comes back, heart-eyed.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffe066', RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#5fd0c8'
const S = 'gemini'

// ── props
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPP..', '.PPPPYPP.', '.PYPPPPP.', 'PPPPPPPYP']
const HAT_C = { P: PINK, Y: YEL }
const BOX = ['BBBBBBBBBB', 'BbBBBBBBbB', 'BBBBKKBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BOX_C = { B: '#c98f2a', b: '#a8741f', K: INK }
const PILLOW = ['.WWWWWWWWWWWWWWWWWW.', 'WWWWWWWWWWWWWWWWWWWW', 'WwWWWWWWWWWWWWWWWWwW', 'WWWWWWWWWWWWWWWWWWWW', '.WWWWWWWWWWWWWWWWWW.']
const PILLOW_C = { W: '#d8d0f0', w: '#b0a6d8' }
const MOON = ['..MMM.', '.MM...', 'MM....', 'MM....', 'MM....', '.MM...', '..MMM.']

// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a planner page: one day, three plans stacked on top of each other; two get crossed out
function planner(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 356)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364)
  x.fillStyle = CREAM; x.fillRect(-154, -174, 308, 348)
  x.fillStyle = TEAL; x.fillRect(-154, -174, 308, 60)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -144)
  const ITEMS = [['10:00 brunch', PINK], ['10:00 move a sofa', SKYB], ['10:00 a party', YEL]]
  ITEMS.forEach(([s, col], i) => {
    const kk = clamp((lt - 0.3 - i * 0.2) * 4)
    if (kk <= 0) return
    const py = -70 + i * 80
    x.globalAlpha = kk; x.fillStyle = col; x.fillRect(-134, py - 30, 268, 60)
    x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText(s, 0, py + 2)
    const cross = clamp((lt - 1.3 - i * 0.15) * 5)
    if (i > 0 && cross > 0) { x.fillStyle = RED; x.fillRect(-130, py - 3, 260 * cross, 7) }
    x.globalAlpha = 1
  })
  x.restore()
}
// a browser window whose tab strip shrinks from forty tabs to three
function browser(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -120, 356, 260)
  x.fillStyle = INK; x.fillRect(-182, -132, 364, 264)
  x.fillStyle = '#2a2350'; x.fillRect(-174, -124, 348, 248)
  const close = ease.inOutCubic(prog(lt, 1.0, 1.6))
  const n = Math.round(lerp(40, 3, close))
  const tw = 330 / n
  for (let i = 0; i < n; i++) { x.fillStyle = [PINK, SKYB, YEL, MINT, LAV][i % 5]; x.fillRect(-166 + i * tw, -116, Math.max(2, tw - 3), 34) }
  x.fillStyle = '#140c30'; x.fillRect(-166, -74, 332, 190)
  x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${n} TABS`, 0, 6)
  x.restore()
}
// a birth-chart wheel: twelve slices, a slow turn, a word in the middle
function chart(x, t, cx, cy, r, k, word) {
  if (k <= 0.01) return
  const W = ['#ff6b6b', '#7ddc8a', YEL, '#9fd8ff', '#ffb34a', '#b8e07a', PINK, '#b06bff', '#ff9a4a', '#a8a0c8', SKYB, '#8fb8ff']
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = W[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.restore()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.font = `800 ${Math.round(r * 0.3)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, 0, 3)
  x.restore()
}
// an invitation card
function invite(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -100, 280, 200)
  x.fillStyle = LAV; x.fillRect(-132, -92, 264, 184)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 40px ${INTER}`; x.fillText('PARTY!', 0, -34)
  x.font = `700 24px ${MONO}`; x.fillText('tonight · 9 PM', 0, 20); x.fillText('RSVP ↓', 0, 58)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Three plans, one Saturday? | *Pick one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      planner(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'BRUNCH IT IS ♡', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“No” is a | *full sentence.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -160 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 780, 'no ♡', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 110, tail: 'bl' })
      label(x, 780, 1060, 'NO EXPLANATION NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 780, P.t0 + 0.8, 7, 170, 0.4)
    } },
  { sign: S, cap: 'Group chat at 2 AM? | *Mute is okay.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const muted = lt > 1.1
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: muted ? 'MUTED ♡' : '143 NEW', headCol: muted ? LAV : RED, lines: [
        ['wait WHAT', BONE, muted ? 0 : pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['ok but also', BONE, muted ? 0 : pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['GEMINI??', BONE, muted ? 0 : pop01(t, P.t0 + 0.8, 0.25, 2.2)],
      ] })
      if (muted) drawBits(x, MOON, { M: CREAM }, 800, 880, 16 * pop01(t, P.t0 + 1.1, 0.3, 2))
      label(x, 800, 600, '2:04 AM', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Can’t do the favour? | *Still a good friend.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 800, 980, 200 * k, { mood: lt > 1.3 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.8] })
      drawBits(x, BOX, BOX_C, 880, 1080, 9 * k)
      bubble(x, 560, 640, 'can’t today, | sorry ♡', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, tail: 'bc' })
      bubble(x, 800, 720, 'all good!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Both your sides | *need a nap.*', mood: 'sleepy', star: { x: 0, y: 1000, s: 10 }, hideStar: true,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.4, 1.8)
      drawBits(x, PILLOW, PILLOW_C, 540, 1010, 22 * k)
      ;[-1, 1].forEach((d, i) => { if (k > 0.01) signChar(x, t, S, 540 + d * 140, 900, 230 * k, { mood: lt > 0.6 + i * 0.3 ? 'sleepy' : 'happy', seed: 50 + i, glyph: i === 1, hops: [P.t0 + 0.1] }) })
      label(x, 540, 640, 'BOTH: RECHARGING', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match wants a call? | *Text is fine.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ NEW MATCH', lines: [
        ['call now?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['text first? ♡', MINT, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['of course!', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
      label(x, 800, 1110, 'PACE: YOURS', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forty tabs open? | *Close a few.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 }, hops: [1.7],
    front(x, t, lt, P) {
      browser(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'BRAIN: BREATHING', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skipped the party? | *Still the fun one.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      invite(x, 800, 800, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 960, 'maybe next time ♡', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05 })
      drawBits(x, HAT, HAT_C, F.x + 10, F.top - 70, 10 * pop01(t, P.t0 + 1.4, 0.3, 2), { rot: 0.12 })
      label(x, 800, 1110, 'FUN: STILL MAX', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even your chart | *says rest.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -190 }, hops: [1.2],
    front(x, t, lt, P) {
      chart(x, t, 800, 840, 160, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.0 ? 'REST' : '…')
      label(x, 800, 1080, 'MY BIRTH CHART', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 840, P.t0 + 1.3, 7, 190, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0256', key: 'D', accent: YEL, solo: S, ending: 'group',
  title: 'Gem, you’re allowed | *to say no.*',
  cameos: CAMEOS,
  group: {
    cap: 'Every no | makes room for *yes.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
