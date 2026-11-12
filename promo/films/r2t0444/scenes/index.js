// r2t0444: star_talk, SOLO, "Group chat Aries | *be like.*" (~49 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine group-chat moments, each the most extreme Aries version. Ending: callback (the voice note).
//   0.0–3.6    hook
//   3.6–37.8   replies before you finish typing · an eleven-minute voice note · renamed the chat WINNERS ONLY
//              · starts a poll, votes for everyone · ALL CAPS, always · leaves the chat, rejoins a minute later
//              · posts everyone's sign, then ranks them · "who's up?" at 5 a.m. (gym) · LET'S GOOO to every message
//  37.8        "Loud. | *Loyal. Online.*"
//  41.2        "The voice note? | *Part two.*" (the waveform comes back: 11:02, PART 2)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CORAL = '#ff6b5a', CREAM = '#fff8ea', RED = '#e23d4e', SLATE = '#9aa5c4'

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05, size = 32 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 ${size}px ${INTER}`; const w = Math.min(236, x.measureText(txt).width + 30)
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2, w - 24)
    x.restore()
  })
  x.restore()
}
/** a long voice-note bubble: play button, waveform, time */
function voiceNote(x, t, cx, cy, k, time, w = 380) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -50, w, 112)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -62, w + 12, 124)
  x.fillStyle = CORAL; x.fillRect(-w / 2, -56, w, 112)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 + 26, -24); x.lineTo(-w / 2 + 26, 24); x.lineTo(-w / 2 + 62, 0); x.closePath(); x.fill()
  for (let i = 0; i < 22; i++) { const h = 10 + Math.abs(Math.sin(i * 1.7 + t * 4)) * 30; x.fillRect(-w / 2 + 84 + i * 11, -h / 2 - 10, 6, h) }
  x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, w / 2 - 16, 32)
  x.restore()
}
const DUMB = ['KK......KK', 'KK......KK', 'KKSSSSSSKK', 'KK......KK', 'KK......KK']

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Replies before | *you finish typing.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'THE GROUP (6)', lines: [
        ['so what if w…', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['YES. IN.', CORAL, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['…e went out?', BONE, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'Sends a voice note. | *Eleven minutes.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      voiceNote(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.95, `${Math.min(11, Math.floor(lt * 5))}:${String(Math.floor(lt * 37) % 60).padStart(2, '0')}`)
      label(x, 790, 1080, 'UNHEARD BY: ALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Renamed the chat. | *“WINNERS ONLY.”*', mood: 'wink', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      label(x, 790, 760, lt < 1.0 ? 'weekend plans' : '🏆︎ WINNERS ONLY', k, { size: 40, bg: lt < 1.0 ? BONE : GOLD, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'aries changed | the group name', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: SLATE, tail: 'bc' })
    } },
  { sign: S, cap: 'Started a poll. | *Voted for everyone.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.4) / 0.16))
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'POLL: DINNER?', headCol: GOLD, size: 30, lines: [
        [`MY PICK  ${'▮'.repeat(n)}`, CORAL, 1], ['other  ', BONE, 1], ['(votes: 6/6)', MINT, pop01(t, P.t0 + 1.6, 0.25, 2.2), true],
      ] })
    } },
  { sign: S, cap: 'ALL CAPS. | *Always.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 740, 680, 'GOOD MORNING!!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: CORAL, tail: 'bl' })
      bubble(x, 750, 880, 'WHO WANTS TACOS', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: CORAL, tail: 'bl' })
      bubble(x, 760, 1070, 'NOT YELLING', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Left the chat. | *Back in a minute.*', mood: lt => lt > 1.3 ? 'happy' : 'eyeroll', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 740, 760, 'aries left the chat', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: SLATE, rot: 0.03, font: MONO, weight: 700 })
      label(x, 740, 900, 'aries joined the chat', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'anyway', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, col: CORAL, tail: 'bc' })
    } },
  { sign: S, cap: 'Posted everyone’s sign. | *Then ranked them.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -180, 312, 372)
        x.fillStyle = INK; x.fillRect(-162, -192, 324, 384); x.fillStyle = CREAM; x.fillRect(-154, -184, 308, 368)
        x.fillStyle = CORAL; x.fillRect(-154, -184, 308, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('OFFICIAL RANKING', 0, -153)
        x.textAlign = 'left'
        ;[['1.', '♈︎', 'me'], ['2.', '♌︎', 'sam'], ['3.', '♐︎', 'jo'], ['4.', '♓︎', 'lee']].forEach(([n, g, nm], i) => { if (lt < 0.5 + i * 0.25) return; x.font = `700 34px ${MONO}`; x.fillText(n, -130, -80 + i * 66); x.font = `700 44px ${GLYPH_FONT}`; x.fillText(g, -70, -78 + i * 66); x.font = `800 34px ${INTER}`; x.fillText(nm, 0, -80 + i * 66) })
        x.restore()
      }
    } },
  { sign: S, cap: '“Who’s up?” | *5 a.m. Gym.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 680, '5:00 AM', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 56, bg: SLATE, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, DUMB, { K: INK, S: '#c9c9d8' }, 790, 880, 30 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.1 })
      bubble(x, 790, 1070, 'WHO’S UP?? GYM??', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: CORAL, tail: 'bc' })
    } },
  { sign: S, cap: 'Hypes every message. | *“LET’S GOOO.”*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'THE GROUP (6)', lines: [
        ['I made toast', BONE, pop01(t, P.t0 + 0.3, 0.25, 2.2), true], ['LET’S GOOO', CORAL, pop01(t, P.t0 + 0.6, 0.25, 2.2)], ['it’s raining', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2), true], ['LET’S GOOO', CORAL, pop01(t, P.t0 + 1.3, 0.25, 2.2)],
      ] })
    } },
]

const F = makeFilm({
  id: 'r2t0444', key: 'D', accent: CORAL, solo: S, ending: 'callback',
  title: 'Group chat Aries | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud. | *Loyal. Online.*', mood: 'sparkle' },
  last: {
    text: 'The voice note? | *Part two.*',
    draw(x, t, lt) {
      const t0 = t - lt
      voiceNote(x, t, 540, 1000, pop01(t, t0 + 0.5, 0.4, 2) * 1.7, '11:02')
      label(x, 540, 1230, 'PART 2 OF 3', pop01(t, t0 + 1.2, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
