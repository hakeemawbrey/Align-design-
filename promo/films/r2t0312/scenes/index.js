// r2t0312: THE SIGNS AS… v3, SOLO film, "Group chat Geminis | be like." (~48 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way: nine group-chat moments, each the most extreme Gemini version. Ending: callback.
//   0.0–3.6    "Group chat Geminis | *be like.*"  One big Gemini pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              asleep an hour, missed a whole saga · replied to a message from last spring · an eleven-minute voice note
//              · renamed the chat six times today · typed for twenty minutes, sent "lol" · a poll about making a poll
//              · left the chat, back in a minute · forwarded the chat to the other chat · shared everyone's birth charts
//  37.8        "Online. | *Always.*"  Gemini comes back, big.
//  41.2        callback: "The voice note | had *a part two.*" (the eleven-minute voice note, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', RED = '#e23d4e', PAPER = '#fff4e2'

// ── props
/** a phone: dark screen, returns nothing; draw contents yourself in its local space via fn(x) */
function phone(x, cx, cy, k, { w = 260, h = 420, rot = 0.04 } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = '#2a2350'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 12, -h / 2 + 30, w - 24, h - 60)
  x.fillStyle = '#6b62a8'; x.fillRect(-26, h / 2 - 20, 52, 8)
  if (fn) fn(x, w, h)
  x.restore()
}
/** a voice-note card: play button, a waveform, a running time */
function voiceNote(x, t, cx, cy, k, time, { col = YEL, rot = -0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-172, -50, 356, 116)
  x.fillStyle = INK; x.fillRect(-184, -64, 368, 128)
  x.fillStyle = BONE; x.fillRect(-176, -56, 352, 112)
  x.fillStyle = col; x.beginPath(); x.arc(-130, 0, 32, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -16); x.lineTo(-140, 16); x.lineTo(-114, 0); x.fill()
  for (let i = 0; i < 18; i++) { const hh = 10 + 30 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillStyle = INK; x.fillRect(-84 + i * 11, -hh / 2 - 10, 6, hh) }
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(time, 160, 34)
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chartWheel(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.4, 4.2]) x.fillRect(Math.cos(a) * r * 0.4 - 6, Math.sin(a) * r * 0.4 - 6, 12, 12)
  x.restore()
}
/** a chat-notice pill, like "gemini left the chat" */
function notice(x, cx, cy, text, k, col = '#3a2e55', fg = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `700 26px ${MONO}`; const w = x.measureText(text).width + 40
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 4, -26, w + 8, 52, 26); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-w / 2, -22, w, 44, 22); x.fill()
  x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}

const NAMES = ['BESTIES', 'THE COUNCIL', 'SOUP CLUB', 'NO NAME', 'BESTIES 2', 'CHAOS HQ']

const CAMEOS = [
  { sign: 'gemini', cap: 'Asleep for an hour. | Missed *a whole saga.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      const n = lt < 0.9 ? 3 : 3 + Math.floor(Math.min(1, (lt - 0.9) / 0.9) * 309)
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), {}, (x) => {
        for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? SKYB : LAV; x.fillRect(i % 2 ? -40 : -104, -150 + i * 52, 144, 34) }
      })
      label(x, 790, 640, `${n} NEW`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: RED, color: '#fff4e2', rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'wait WHO broke up?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Replied to a message | from *last spring.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'pizza friday?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 790, 800, 'SENT: 11 MONTHS AGO', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 26, bg: '#3a2e55', color: BONE, rot: 0, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'YES omg', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: YEL, tail: 'bl' })
      label(x, 790, 1090, 'CONTEXT: GONE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'One voice note. | *Eleven minutes.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const s = Math.floor(lerp(4, 702, ease.inQuad(prog(lt, 0.4, 2.2))))
      voiceNote(x, t, 790, 860, pop01(t, P.t0 + 0.25, 0.3, 2), `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`)
      label(x, 790, 680, 'quick update', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: MINT, rot: -0.05 })
      notes(x, t, 600, 760, { n: 3, cell: 6, col: YEL, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Renamed the chat | *six times today.*', mood: lt => lt > 1.6 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const i = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.28))
      label(x, 790, 740, 'CHAT NAME:', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 28, bg: '#3a2e55', color: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 860, NAMES[i], pop01(t, P.t0 + 0.3 + i * 0.28, 0.2, 2.4), { size: 50, bg: [YEL, PINK, MINT, SKYB, LAV, GOLD][i], rot: (i % 2 ? 0.05 : -0.05) })
      label(x, 790, 1040, `RENAME #${i + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Typing for twenty minutes. | Sent *“lol.”*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.5) {
        bubble(x, 790, 820, '      ', k, { size: 50, col: BONE, tail: 'bl' })
        for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 8 - i * 0.8)); x.fillStyle = INK; x.globalAlpha = k; x.fillRect(750 + i * 34, 812 - b * 10, 18, 18); x.globalAlpha = 1 }
        label(x, 790, 1000, `TYPING… ${Math.floor(lerp(1, 20, prog(lt, 0.2, 1.5)))} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      } else {
        bubble(x, 790, 820, 'lol', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 70, col: YEL, tail: 'bl' })
        label(x, 790, 1000, 'SENT.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      }
    } },
  { sign: 'gemini', cap: 'Made a poll | about *making a poll.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 870); x.rotate(0.03); x.scale(k, k)
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -152, 316, 320)
      x.fillStyle = INK; x.fillRect(-164, -164, 328, 328); x.fillStyle = BONE; x.fillRect(-156, -156, 312, 312)
      x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('Should we do', -130, -118); x.fillText('a poll?', -130, -82)
      const g = ease.outCubic(prog(lt, 0.6, 1.6))
      ;[['YES', 0.9, MINT], ['NO', 0.2, PINK], ['POLL IT', 0.6, YEL]].forEach(([s, v, c], i) => {
        const y = -24 + i * 64
        x.fillStyle = '#d9cfbd'; x.fillRect(-130, y - 22, 260, 44)
        x.fillStyle = c; x.fillRect(-130, y - 22, 260 * v * g, 44)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText(s, -116, y + 2)
      })
      x.restore()
      label(x, 790, 1130, 'POLL #2 INCOMING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'gemini', cap: 'Left the chat. | *Back in a minute.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      notice(x, 790, 730, 'gemini left', pop01(t, P.t0 + 0.3, 0.3, 2), '#3a2e55')
      label(x, 790, 850, '0:58 LATER', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      notice(x, 790, 970, 'gemini joined', pop01(t, P.t0 + 1.4, 0.3, 2.2), YEL, INK)
      bubble(x, 790, 1110, 'anyway', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Forwarded the chat | to *the other chat.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 680, 900, k, { w: 170, h: 280, rot: -0.06 }, (x) => { for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? SKYB : LAV; x.fillRect(i % 2 ? -20 : -64, -90 + i * 46, 84, 28) } })
      phone(x, 900, 900, pop01(t, P.t0 + 0.9, 0.3, 2), { w: 170, h: 280, rot: 0.06 }, (x) => { for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? YEL : PINK; x.fillRect(i % 2 ? -20 : -64, -90 + i * 46, 84, 28) } })
      label(x, 790, 900, '→', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 40, bg: GOLD, rot: 0 })
      label(x, 790, 680, 'CHAT A → CHAT B', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Shared everyone’s | *birth charts.* Unasked.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) chartWheel(x, 700 + i * 95, 880 + (i % 2 ? -50 : 30), 70, pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2), t + i)
      label(x, 790, 660, 'SHARED: 12 CHARTS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'this explains SO much', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0312', key: 'E', accent: YEL, solo: 'gemini', ending: 'callback',
  title: 'Group chat Geminis | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Online. | *Always.*', mood: 'sparkle' },
  last: {
    text: 'The voice note | had *a part two.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'gemini', 540, 1000, 300 * k, { mood: Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', seed: 12, hops: [t - lt + 1.2, t - lt + 2.2] })
      const s = Math.floor(lerp(0, 845, ease.inQuad(prog(lt, 0.9, 3.4))))
      voiceNote(x, t, 540, 1330, 1.5 * pop01(t, t - lt + 0.8, 0.35, 2), `PART 2 · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, { rot: 0.03 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
