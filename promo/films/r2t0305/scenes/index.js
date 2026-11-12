// r2t0305: star_talk, BE LIKE roll call, "Zodiacs at a new job | *be like.*" (topic: meeting new coworkers) (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme first day with a new team. Ending: group.
//   0.0–3.6    "Zodiacs at a new job | *be like.*" (topic: meeting new coworkers)
//   3.6–49.2   ♈ shook forty hands in a minute · ♉ "hi. where are the snacks?" · ♊ knows all the gossip by lunch
//              · ♋ brought homemade cookies, day one · ♌ introduced themself with a slideshow · ♍ fixed the printer before
//              saying hi · ♎ remembered every name and every coffee order · ♏ said four words, read the whole room
//              · ♐ "is the beach an office?" · ♑ asked for the five-year plan · ♒ asked everyone's sign "for research"
//              · ♓ cried at the welcome card
//  49.2        group (the ending): "New team. | *Same chaos.*"  a WELCOME banner over the team photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dd3ff', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const PRINTER = ['..KKKKKKKK..', '..KWWWWWWK..', 'KKKKKKKKKKKK', 'KGGGGGGGGGGK', 'KGGGGGGGMGGK', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK', '..KWWWWWWK..', '..KKKKKKKK..']
const TIN = ['..KKKKKKKK..', '.KRRRRRRRRK.', 'KKKKKKKKKKKK', 'KCCCCCCCCCCK', 'KCDCCDCCDCCK', 'KCCCCCCCCCCK', 'KKKKKKKKKKKK']
const COOKIE = ['.CCCC.', 'CCDCCC', 'CCCCDC', 'CDCCCC', '.CCCC.']
const CUP = ['.W.W..', 'KKKKK.', 'KBBBKK', 'KBBBK.K', 'KBBBKK', '.KKK..']

function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Shook forty hands. | *In one minute.*', mood: 'wide', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(clamp((lt - 0.2) / 1.6) * 40))
      L(x, 790, 800, `HANDSHAKES: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), ORANGE, -0.05, 40)
      L(x, 790, 1040, 'TIME: 0:59', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, 0.04)
    } },
  { sign: 'taurus', cap: '“Hi. Nice to meet you. | *Where are the snacks?*”', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 740, 'hi. snacks?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: BONE, tail: 'bl' })
      L(x, 790, 1000, 'PRIORITIES: SET', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Knows all the gossip | *by lunch.*', mood: 'wink', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      ['psst…', 'did you hear?', 'no WAY'].forEach((q, i) => bubble(x, 760 + (i % 2) * 60, 660 + i * 160, q, pop01(t, P.t0 + 0.3 + i * 0.45, 0.25, 2.2), { size: 38, col: [BONE, GOLD, PINK][i], tail: i % 2 ? 'br' : 'bl' }))
      L(x, 790, 1130, 'FIRST DAY: 11:58 AM', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, -0.04, 28)
    } },
  { sign: 'cancer', cap: 'Brought homemade cookies. | *Day one.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TIN, { K: INK, R: PINK, C: '#d9a066', D: '#6b3a1e' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) drawBits(x, COOKIE, { C: '#d9a066', D: '#6b3a1e' }, 700 + i * 100, 700 - Math.sin(t * 3 + i) * 10, 12 * pop01(t, P.t0 + 0.8 + i * 0.2, 0.3, 2.2))
      L(x, 800, 1110, 'BELOVED: ALREADY', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Introduced themself | *with a slideshow.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const s = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 46)
      paper(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['ALL ABOUT ME', '(part one)'], { head: `SLIDE ${s} / 47`, headBg: ORANGE, w: 340, size: 34, rot: -0.03 })
      L(x, 790, 1080, 'Q&A: AFTER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05)
    } },
  { sign: 'virgo', cap: 'Fixed the printer | *before saying hi.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ok = lt > 1.2
      drawBits(x, PRINTER, { K: INK, W: CREAM, G: '#9aa5c4', M: ok ? MINT : RED }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1090, ok ? 'PRINTER: FIXED ✓' : 'PAPER JAM', 1, ok ? MINT : RED, -0.04, 32, ok ? INK : CREAM)
      if (ok) sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: 'libra', cap: 'Remembered every name. | *And coffee order.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const names = ['Sam: oat', 'Jo: black', 'Ty: decaf'], cols = [CREAM, '#6b3a1e', GOLD]
      names.forEach((n, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2); drawBits(x, CUP, { K: INK, W: CREAM, B: cols[i] }, 650, 700 + i * 150, 12 * k); L(x, 820, 700 + i * 150, n, k, PINK, i % 2 ? 0.04 : -0.04, 30) })
    } },
  { sign: 'scorpio', cap: 'Said four words. | *Read the whole room.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'hi. i’m scorpio.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, col: '#ff8fb1', tail: 'bl' })
      L(x, 790, 920, 'ROOM: READ ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), BONE, -0.05, 44)
      L(x, 790, 1100, 'WORDS LEFT: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: 'sagittarius', cap: '“Does a beach | *count as the office?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'remote from | a beach?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: '#ffe7a8', tail: 'bl' })
      L(x, 790, 960, 'HR: …', pop01(t, P.t0 + 1.1, 0.3, 2.4), BONE, 0.05, 44)
      L(x, 790, 1110, 'BAGS: PACKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04)
    } },
  { sign: 'capricorn', cap: 'Asked the boss | *for the five-year plan.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), ['year 1: learn', 'year 3: lead', 'year 5: your job'], { head: 'MY PLAN', headBg: MINT, w: 340, size: 30, rot: 0.04 })
      L(x, 790, 1100, 'BOSS: NERVOUS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04)
    } },
  { sign: 'aquarius', cap: 'Asked everyone’s sign. | *For “research.”*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.3) / 1.4) * 12))
      x.save(); const R = 130
      for (let i = 0; i < n; i++) { const a = i / 12 * Math.PI * 2 - Math.PI / 2; x.fillStyle = [PINK, GOLD, MINT, SKYB, LAV, ORANGE][i % 6]; x.fillRect(790 + Math.cos(a) * R - 14, 840 + Math.sin(a) * R - 14, 28, 28) }
      x.restore()
      L(x, 790, 840, `${n}/12`, pop01(t, P.t0 + 0.3, 0.3, 2), BONE, 0, 36)
      L(x, 790, 1100, 'BIRTH CHARTS: FILED', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cried at | *the welcome card.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), ['welcome!', '– the team ♥'], { head: 'CARD', headBg: LAV, w: 320, size: 36, rot: -0.04, bg: CREAM })
      L(x, 790, 1090, 'TISSUES: REQUESTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0305', key: 'F', accent: ACC, ending: 'group',
  title: 'Zodiacs at a new job | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'New team. | *Same chaos.*',
    draw(x, t, lt) { label(x, 540, 760, 'WELCOME, TEAM!', pop01(t, t - lt + 1.2, 0.35, 2.4), { size: 52, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
