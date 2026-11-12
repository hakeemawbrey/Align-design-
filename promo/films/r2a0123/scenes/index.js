// r2a0123: ADVICE SOLO, "Cancer, you're allowed | to change your mind." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "Cancer, you can | change your *mind.*"
//   3.6–37.8   said yes too fast (you can unsay it) · moved the couch again (homes can change) · outgrew your shell (size up)
//              · changed your order twice (totally allowed) · planned to stay forever (plans can move)
//              · your feelings changed (feelings are weather) · rewrote the text again (still allowed)
//              · horoscope said stay in (you can go out) · changed your mind back (also allowed)
//  37.8        GROUP ENDING: "New mind. | *Same big heart.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BLUE = '#8fe3ff', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#7ee08a'

// ── props
const SHELL = ['....SSSS....', '..SSsSSsSS..', '.SSsSSSSsSS.', 'SSsSSssSSsSS', 'SSSSsSSsSSSS', 'SSsSSSSSSsSS', '.SSSSSSSSSS.']
const SHELL_C = { S: '#ffb0a8', s: '#e86a8a' }
const COUCH = ['BB........BB', 'BBCCCCCCCCBB', 'BBCCCCCCCCBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.K........K.']
const COUCH_C = { B: '#6fc3ff', C: '#bff0ff', K: INK }
const BOX = ['TTTTTTTTTTTT', 'BBBBBTTBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB']
const BOX_C = { T: '#c98f4a', B: '#e8b46a' }
const CLOUD = ['...WWWW.....', '..WWWWWWW...', '.WWWWWWWWWW.', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const SUN = ['..Y..Y..Y..', '...YYYYY...', 'Y.YYYYYYY.Y', '..YYYYYYY..', 'Y.YYYYYYY.Y', '...YYYYY...', '..Y..Y..Y..']
const PHONE = ['KKKKKKKKKK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', 'KKKKGGKKKK', 'KKKKKKKKKK']
const PHONE_C = { K: '#2a2350', S: '#140c30', G: '#6b62a8' }

function strike(x, cx, cy, w, k, col = RED) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = col; x.lineWidth = 10; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy + 6); x.lineTo(cx - w / 2 + w * k, cy - 6); x.stroke(); x.restore()
}
// a calendar invite: RSVP flips from YES to "actually, no"
function invite(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -112, 300, 240)
  x.fillStyle = INK; x.fillRect(-156, -126, 312, 252)
  x.fillStyle = CREAM; x.fillRect(-148, -118, 296, 236)
  x.fillStyle = BLUE; x.fillRect(-148, -118, 296, 56)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('INVITE', 0, -90)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('sat · 8 a.m.', 0, -30)
  const no = lt > 1.3
  x.fillStyle = no ? '#ffd6e4' : GREEN; x.fillRect(-110, 18, 220, 70)
  x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText(no ? 'actually, no ♡' : 'YES ✓', 0, 54)
  x.restore()
}
// a little U-turn sign
function uturn(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, 60, 20, 170)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -130); x.lineTo(130, 0); x.lineTo(0, 130); x.lineTo(-130, 0); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.moveTo(0, -116); x.lineTo(116, 0); x.lineTo(0, 116); x.lineTo(-116, 0); x.fill()
  x.strokeStyle = INK; x.lineWidth = 16; x.lineCap = 'round'
  x.beginPath(); x.moveTo(30, 50); x.lineTo(30, -10); x.arc(0, -10, 30, 0, Math.PI, true); x.lineTo(-30, 30); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-52, 22); x.lineTo(-8, 22); x.lineTo(-30, 56); x.fill()
  x.restore()
}

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Said yes too fast? | *You can unsay it.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      invite(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      sparkles(x, t, 790, 900, P.t0 + 1.3, 6, 160, 0.3)
    } },
  { sign: S, cap: 'Moved the couch again? | *Homes can change.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sl = ease.inOutCubic(prog(lt, 0.4, 1.4))
      drawBits(x, COUCH, COUCH_C, lerp(880, 760, sl), 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'LAYOUT #6', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Outgrew your shell? | *Size up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SHELL, SHELL_C, 700, 1000, 7 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 700, 1090, 'OLD', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 28, bg: BONE, font: MONO, weight: 700 })
      drawBits(x, SHELL, SHELL_C, 840, 860, 18 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      label(x, 840, 680, 'NEW ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 840, 860, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Changed your order twice? | *Totally allowed.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const o = ['soup', 'no, salad', 'no, soup!'][Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.55))]
      bubble(x, 790, 720, o, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 960, 'ORDER #3: FINAL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned to stay forever? | *Plans can move.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 790, 980, 20 * k)
      drawBits(x, BOX, BOX_C, 760, 860, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 790, 980, 'HOME 2.0', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: BLUE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 780, 780, P.t0 + 1.4, { n: 4, life: 1.5, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Your feelings changed? | Feelings *are weather.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), m = ease.inOutCubic(prog(lt, 0.9, 1.6))
      drawBits(x, SUN, { Y: GOLD }, 830, 760, 18 * pop01(t, P.t0 + 1.0, 0.35, 2))
      drawBits(x, CLOUD, { W: '#c9d3e6' }, lerp(790, 900, m), lerp(800, 900, m), 20 * k, { alpha: 1 - 0.6 * m })
      label(x, 790, 1080, 'FORECAST: SUNNY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rewrote the text again? | *Still allowed.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 8)
      label(x, 790, 760, `DRAFT ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'miss you ♡', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'br', col: '#ffd6e4' })
    } },
  { sign: S, cap: 'Horoscope said stay in? | *You can go out.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 760, 'HOROSCOPE: STAY IN', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
      strike(x, 790, 760, 330, ease.outCubic(prog(lt, 0.8, 1.1)))
      label(x, 790, 920, 'ME: GOING OUT ✦', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 36, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Changed your mind back? | *Also allowed.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      uturn(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0123', key: 'C', accent: BLUE, solo: 'cancer', ending: 'group',
  title: 'Cancer, you can | change your *mind.*',
  cameos: CAMEOS,
  group: { cap: 'New mind. | *Same big heart.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
