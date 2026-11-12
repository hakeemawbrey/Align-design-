// r2t0492: star_talk, BELIKE, "Wrong-text zodiacs | *be like.*" (topic: Zodiacs sending the wrong text) (~54 s vertical,
// signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, each the most extreme wrong-chat reaction. Ending: group.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ sent it to Mom, doubled down "and?" · ♉ asked the boss what's for dinner · ♊ sent the gossip to the subject
//              · ♋ wrong chat, a three-page apology · ♌ selfie in the work chat, left it up · ♍ wrong chat, a correction memo
//              · ♎ asked the group chat what to do · ♏ unsent it from the match chat, knows they saw · ♐ "love you" to the
//              driver, now friends · ♑ texted the crush their quarterly goals · ♒ sent the meme to Grandma, Grandma gets it
//              · ♓ "miss you" to the ex, meant the dog (tears)
//  49.2        group (the ending): "Sent. Seen. | *No take-backs.*"  Over the photo: DELIVERED ✓✓.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350'
const ACC = '#8fe3ff'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800 } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.5, h = lines.length * lh + 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 23 + lh * (i + 0.5)))
  x.restore()
}
/** a phone: header strip + chat pills [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 96 - w : -96, -62 + i * 62); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}
const BOXP = ['KKKKKKKKKK', 'KCCCTTCCCK', 'KCCCTTCCCK', 'KCCCCCCCCK', 'KCCCCCCCCK', 'KKKKKKKKKK']
const BOXP_C = { K: '#8a5a3a', C: '#c98f2a', T: '#e6c48a' }
const DOG = ['B....B....', 'BB..BB....', 'BBBBBB....', 'BWBBWB....', 'BBBBBB.BB.', '.BNNB..B..', '.BBBBBBBB.', '.BBBBBBBB.', '.B.B..B.B.']
const DOG_C = { B: '#c98f2a', W: INK, N: '#5b2e1a' }
const R = (x, t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)
const pill = (t, P, a) => pop01(t, P.t0 + a, 0.2, 2)

const CAMEOS = [
  { sign: 'aries', cap: 'Sent it to Mom. | Doubled down: *“and?”*', mood: lt => lt < 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 860, R(x, t, P), { head: 'MOM', headCol: PINK, lines: [['date went', BONE, pill(t, P, 0.4), true], ['SO well ;)', BONE, pill(t, P, 0.55), true], ['excuse me??', LAV, pill(t, P, 0.9)], ['and?', RED, pill(t, P, 1.4), true]] })
    } },
  { sign: 'taurus', cap: 'Asked the boss | what’s *for dinner.*', mood: lt => lt < 1.3 ? 'heart' : 'wide', star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(x, t, P), { head: 'THE BOSS', headCol: SKYB, lines: [['what’s for', BONE, pill(t, P, 0.4), true], ['dinner?? ♡', BONE, pill(t, P, 0.55), true], ['…pasta?', LAV, pill(t, P, 1.4)]] })
      L(x, 790, 1110, 'STILL HUNGRY', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Sent the gossip | *to the subject.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, R(x, t, P), { head: 'THE SUBJECT', headCol: GOLD, lines: [['ok so THEY', BONE, pill(t, P, 0.4), true], ['said what', BONE, pill(t, P, 0.55), true], ['…hi.', LAV, pill(t, P, 1.3)]] })
      bubble(x, 420, 620, 'new phone, | who dis?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Wrong chat. | Sent a *3-page apology.*', mood: lt => lt < 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = R(x, t, P), un = ease.outCubic(prog(lt, 0.5, 1.5))
      if (k > 0.01) {
        x.save(); x.translate(790, 620); x.rotate(0.04); x.scale(k, k)
        const h = 120 + un * 440
        x.fillStyle = INK; x.fillRect(-140, -10, 280, h + 20); x.fillStyle = CREAM; x.fillRect(-130, 0, 260, h)
        x.fillStyle = '#b9b0a0'; for (let y = 60; y < h - 20; y += 34) x.fillRect(-104, y, 208 - (y % 3) * 30, 10)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('SO SORRY', 0, 34)
        x.fillStyle = '#c98f2a'; x.fillRect(-150, -20, 300, 26)
        x.restore()
      }
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Selfie in the work chat? | *Left it up.*', mood: lt => lt < 1.2 ? 'wide' : 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = R(x, t, P)
      phone(x, 790, 860, k, { head: 'WORK CHAT', headCol: SKYB, lines: [] })
      if (k > 0.5) { x.save(); x.translate(790, 860); x.rotate(0.05); x.fillStyle = '#ffb34a'; x.fillRect(-90, -90, 180, 190); x.restore(); signChar(x, t, 'leo', 790, 880, 150, { mood: 'wink', seed: 31, glyph: false, glow: 0.5 }) }
      L(x, 790, 1110, 'GORGEOUS, THO', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Wrong chat. | Sent a *correction memo.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 850, R(x, t, P), ['MEMO', 're: last text', 'please disregard', '(see footnote 3)'], { w: 360, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 610, 'OFFICIAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, -0.05, 36, CREAM)
    } },
  { sign: 'libra', cap: 'Wrong chat? | Started *a poll.*', mood: lt => lt < 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(x, t, P), { head: 'POLL', headCol: PINK, lines: [['delete?', BONE, pill(t, P, 0.4)], ['lol it off?', BONE, pill(t, P, 0.6)], ['move away?', BONE, pill(t, P, 0.8)], ['VOTE NOW', GOLD, pill(t, P, 1.3), true]] })
    } },
  { sign: 'scorpio', cap: 'Unsent it in a second. | Knows *they saw.*', mood: lt => lt < 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const gone = lt > 0.9
      phone(x, 790, 860, R(x, t, P), { head: 'NEW MATCH', headCol: PINK, lines: [[gone ? 'unsent' : 'u up? ♡', gone ? '#6b62a8' : BONE, pill(t, P, 0.4), true], ['…saw that', LAV, pill(t, P, 1.5)]] })
      L(x, 790, 1110, 'SEEN ✓✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, 0.04, 38, CREAM)
    } },
  { sign: 'sagittarius', cap: '“Love you” to the driver? | *Now they’re friends.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = R(x, t, P)
      if (k > 0.01) { drawBits(x, BOXP, BOXP_C, 790, 1020, 20 * k); signChar(x, t, 'taurus', 820, 820, 160 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 32, glyph: false }) }
      bubble(x, 800, 620, 'love you | too!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Texted the crush | their *quarterly goals.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 820, R(x, t, P), ['Q4 GOALS', '1. revenue', '2. gym', '3. you?'], { w: 300, bg: '#ffe27a', size: 34, rot: -0.04 })
      bubble(x, 790, 1080, '#3?? ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Sent the meme to Grandma. | *Grandma gets it.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, R(x, t, P), { head: 'GRANDMA', headCol: MINT, lines: [['[alien meme]', BONE, pill(t, P, 0.4), true], ['HAHA', LAV, pill(t, P, 1.1)], ['sending', LAV, pill(t, P, 1.3)], ['to bridge club', LAV, pill(t, P, 1.5)]] })
    } },
  { sign: 'pisces', cap: '“Miss you” to the ex? | Meant *the dog.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      phone(x, 760, 760, R(x, t, P) * 0.8, { head: 'THE EX', headCol: LAV, lines: [['miss you ♡', BONE, pill(t, P, 0.4), true], ['oh?', LAV, pill(t, P, 1.0)]] })
      drawBits(x, DOG, DOG_C, 840, 1070, 19 * pop01(t, P.t0 + 1.2, 0.3, 2))
      bubble(x, 600, 1060, 'woof', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
]

const F = makeFilm({
  id: 'r2t0492', key: 'E', accent: ACC, ending: 'group',
  title: 'Wrong-text zodiacs | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Sent. Seen. | *No take-backs.*',
    draw(x, t, lt) { label(x, 540, 700, 'DELIVERED ✓✓', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 46, bg: SKYB, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
