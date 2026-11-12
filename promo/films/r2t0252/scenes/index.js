// r2t0252: star_talk, SOLO, "Capricorns texting | be like." (~45 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way through (makeFilm solo mode, 9 cards): Capricorn on their phone, every text pushed to the extreme.
//   0.0–3.6    "Capricorns texting | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              every text ends "best regards" · replies in business hours only · your "hey" got a calendar invite
//              · sent a meme, explained it in bullet points · group chat chaos, Cap sent an agenda · "k." is a full reply
//              · asked your sign, then your five-year plan · typing… for an hour · "good night" at 9:00 sharp
//  37.8        "Professional. | *Even in love.*"  Capricorn comes back, big.
//  41.2        callback: "And your “hey”? | *Approved. Finally.*"  the calendar invite comes back, stamped.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAP = '#2fc79a', CREAM = '#fff4e2', RED = '#e23d4e'
const S = 'capricorn'

const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// a phone; fn draws on its screen (screen spans -120…120 × -200…200)
function phone(x, cx, cy, k, fn, { rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.12, k * 1.12)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-138, -226, 296, 470)
  x.fillStyle = INK; x.fillRect(-150, -240, 300, 480); x.fillStyle = '#2a2350'; x.fillRect(-140, -230, 280, 460)
  x.fillStyle = '#140c30'; x.fillRect(-128, -206, 256, 412)
  x.fillStyle = '#6b62a8'; x.fillRect(-30, 216, 60, 8)
  x.save(); x.beginPath(); x.rect(-128, -206, 256, 412); x.clip(); fn(x); x.restore()
  x.restore()
}
// a chat bubble on a phone screen: me = right, green
function chip(x, s, y, me, { size = 22, w } = {}) {
  x.font = `700 ${size}px ${MONO}`
  const lines = s.split('|'), tw = w || Math.max(...lines.map(l => x.measureText(l).width)) + 28, h = lines.length * size * 1.25 + 18
  const left = me ? 116 - tw : -116
  x.fillStyle = me ? CAP : '#3d3470'; x.fillRect(left, y - h / 2, tw, h)
  x.fillStyle = me ? INK : BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, left + 14, y - h / 2 + 9 + size * 1.25 * (i + 0.5)))
}
// a calendar-invite card; stamped = big APPROVED stamp
function invite(x, cx, cy, k, { stamp = 0, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 316, 236)
  x.fillStyle = INK; x.fillRect(-160, -124, 320, 248); x.fillStyle = CREAM; x.fillRect(-152, -116, 304, 232)
  x.fillStyle = CAP; x.fillRect(-152, -116, 304, 54)
  txt(x, 'MEETING INVITE', 0, -89, 24, INK, MONO, 700)
  txt(x, 'RE: “hey”', 0, -26, 40, INK)
  txt(x, 'tue · 15 min', 0, 26, 24, '#6b62a8', MONO, 700)
  x.fillStyle = MINT; x.fillRect(-120, 60, 110, 38); x.fillStyle = '#e8e0d0'; x.fillRect(10, 60, 110, 38)
  txt(x, 'accept', -65, 79, 18, INK, MONO, 700); txt(x, 'decline', 65, 79, 18, INK, MONO, 700)
  if (stamp > 0.01) {
    x.save(); x.rotate(-0.2); x.scale(1 + 0.6 * (1 - stamp), 1 + 0.6 * (1 - stamp)); x.globalAlpha = stamp
    x.strokeStyle = RED; x.lineWidth = 10; x.strokeRect(-140, -40, 280, 80)
    txt(x, 'APPROVED', 0, 2, 50, RED, MONO, 700)
    x.restore()
  }
  x.restore()
}
// a wall clock
function clock(x, cx, cy, k, h, m, { r = 120 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 12, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * (r - 18) - 4, Math.sin(a) * (r - 18) - 4, 8, 8) }
  const hand = (a, l, w) => { x.save(); x.rotate(a); x.fillRect(-w / 2, -l, w, l); x.restore() }
  x.fillStyle = INK; hand((h % 12 + m / 60) / 12 * Math.PI * 2, r * 0.5, 12); hand(m / 60 * Math.PI * 2, r * 0.78, 8)
  x.beginPath(); x.arc(0, 0, 12, 0, 7); x.fill()
  x.restore()
}
const MOON = ['..MMM.', '.MMM..', 'MMM...', 'MMM...', 'MMM...', '.MMM..', '..MMM.']

const CAMEOS = [
  { sign: S, cap: 'Every text ends | with *“Best regards.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        chip(x, 'lol same', -140, false)
        if (lt > 0.6) chip(x, 'Agreed.|Best regards,|Capricorn', -30, true)
        if (lt > 1.4) chip(x, 'why', 80, false)
        if (lt > 1.8) chip(x, 'Habit.|Kind regards.', 160, true)
      })
    } },
  { sign: S, cap: 'Replies only | during *business hours.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt < 1.0 ? 8 : 9, lt < 1.0 ? 59 : 0)
      label(x, 790, 1040, 'OFFICE HOURS: 9–5', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 30, bg: CAP, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 420, 610, 'now I may reply.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'You texted “hey.” | Got a *calendar invite.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'hey', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      invite(x, 790, 920, pop01(t, P.t0 + 0.9, 0.35, 2))
    } },
  { sign: S, cap: 'Sent a meme. | *Explained it in bullets.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        x.fillStyle = '#3d3470'; x.fillRect(-60, -190, 176, 130)
        signChar(x, t, 'aries', 28, -122, 90, { mood: 'wide', seed: 61, glyph: false, glow: 0.4 })
        if (lt > 0.7) chip(x, 'Why it is funny:|• the face|• the timing|• context (attached)', 30, true, { size: 18 })
        if (lt > 1.6) chip(x, 'not anymore', 160, false)
      })
    } },
  { sign: S, cap: 'Group chat chaos? | Cap sent *an agenda.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        const spam = ['omg', 'WAIT', 'who’s driving', 'lol', '???', 'pizza?']
        const n = Math.min(spam.length, Math.floor(lt / 0.15))
        if (lt < 1.0) for (let i = 0; i < n; i++) chip(x, spam[i], -170 + i * 62, i % 2 === 1)
        else chip(x, 'AGENDA|1. time|2. place|3. who drives|4. questions', -40, true, { size: 20 })
      })
      label(x, 790, 1150, 'MEETING ADJOURNED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A full reply? | *“k.”*', mood: 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'I wrote you a whole | paragraph about my day', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 28, col: LAV, tail: 'br' })
      bubble(x, 520, 840, 'k.', pop01(t, P.t0 + 1.0, 0.25, 2.6), { size: 72, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1000, 170 * k, { mood: lt > 1.1 ? 'wide' : 'happy', look: [-1, 0], seed: 33, glyph: false })
    } },
  { sign: S, cap: 'Asked your sign. | Then your *five-year plan.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), x => {
        x.fillStyle = PINK; x.fillRect(-128, -206, 256, 44)
        txt(x, '✦ NEW MATCH', 0, -184, 20, INK, MONO, 700)
        chip(x, 'what’s your sign?', -110, true)
        if (lt > 0.6) chip(x, 'libra!', -40, false)
        if (lt > 1.1) chip(x, 'and your|5-year plan?|please attach', 50, true)
        if (lt > 1.8) chip(x, '…', 150, false)
      })
    } },
  { sign: S, cap: 'Typing… | *for a full hour.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.roundRect(-150, -70, 300, 140, 60); x.fill()
        x.fillStyle = '#3d3470'; x.beginPath(); x.roundRect(-140, -60, 280, 120, 54); x.fill()
        for (let i = 0; i < 3; i++) { const up = Math.max(0, Math.sin(t * 6 - i * 0.9)) * 16; x.fillStyle = BONE; x.beginPath(); x.arc(-70 + i * 70, -up, 22, 0, 7); x.fill() }
        x.restore()
      }
      clock(x, 820, 1060, 0.6 * pop01(t, P.t0 + 0.7, 0.3, 2), 3, (lt * 25) % 60, { r: 110 })
      label(x, 560, 1110, 'DRAFT 14', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Says “good night” | at *9:00 sharp.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), lt < 0.9 ? 8 : 9, lt < 0.9 ? 58 : 0)
      drawBits(x, MOON, { M: GOLD }, 640, 620, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 1060, 'Good night. Logging off.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0252', key: 'E', accent: CAP, solo: S, ending: 'callback',
  title: 'Capricorns texting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Professional. | *Even in love.*', mood: 'sparkle' },
  last: {
    text: 'And your “hey”? | *Approved. Finally.*',
    draw(x, t, lt) {
      invite(x, 590, 1100, 1.7 * pop01(t, t - lt + 0.3, 0.45, 1.8), { stamp: ease.outCubic(prog(lt, 1.2, 1.5)), rot: -0.04 })
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 270, 1320, 220 * k, { mood: lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], seed: 44, hops: [t - lt + 1.5] })
      sparkles(x, t, 590, 1100, t - lt + 1.5, 8, 240, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
