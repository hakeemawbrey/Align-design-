// r2t0494: star_talk, BELIKE, "Never-sent zodiacs | *be like.*" (topic: Zodiacs deleting a text unsent) (~53 s vertical,
// signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each typing a text and deleting it, in the most extreme
// way. Every card has the same little "typing…" box: the text types out, then backspaces away. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ deleted the rant, typed a louder one · ♉ offered to share fries, deleted it, mine · ♊ five drafts, forgot
//              the topic · ♋ deleted "miss you", baked cookies instead · ♌ deleted a text, it wasn't about them
//              · ♍ deleted the whole text over one comma · ♎ "yes" then "no" then "maybe", deleted · ♏ the drafts folder,
//              a secret archive · ♐ typed brutal honesty, deleted, growth · ♑ deleted the 2 a.m. text, scheduled it for 9
//              · ♒ typed their feelings in binary · ♓ deleted "hey" to the match, needed a nap (tears)
//  49.2        "Typed. Deleted. | *Typed again.*"
//  52.6        callback: "That 2 a.m. text? | Sent *at 9 sharp.*"  Capricorn's scheduled text finally lands: SENT 9:00 ✓.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', DEEP = '#2a2350'
const ACC = '#ffb3c7'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const R = (t, P, a = 0.2) => pop01(t, P.t0 + a, 0.3, 2)

/** how much of a typed-then-deleted text shows at lt: types in over [a, b], holds, backspaces over [c, d] */
const typed = (s, lt, a = 0.3, b = 1.0, c = 1.4, d = 1.8) => { const n = s.length; const k = lt < c ? clamp((lt - a) / (b - a)) : 1 - clamp((lt - c) / (d - c)); return s.slice(0, Math.round(n * k)) }
/** a phone with a header, optional chat pills, and a "typing" box at the bottom showing `draft` */
function phone(x, t, cx, cy, k, { head = '', headCol = MINT, lines = [], draft = '', draftSize = 26, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -192, 276, 400)
  x.fillStyle = INK; x.fillRect(-144, -204, 288, 408)
  x.fillStyle = DEEP; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#140c30'; x.fillRect(-122, -170, 244, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-110, -156, 220, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 22
    x.save(); x.translate(right ? 106 - w : -106, -70 + i * 60); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -21, w, 42); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  // the typing box
  x.fillStyle = INK; x.fillRect(-114, 92, 228, 70); x.fillStyle = BONE; x.fillRect(-108, 98, 216, 58)
  x.fillStyle = INK; x.font = `700 ${draftSize}px ${MONO}`; x.textAlign = 'left'
  const w = x.measureText(draft).width
  x.fillText(draft, -98, 128)
  if (Math.floor(t * 3) % 2) x.fillRect(-96 + w, 110, 4, 34)
  x.restore()
}
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
const FRIES = ['.Y.Y.Y.', 'YY.YY.Y', 'YYYYYYY', 'RRRRRRR', 'RRWWWRR', 'RRRRRRR', '.RRRRR.']
const COOKIE = ['..CCCC..', '.CCdCCC.', 'CCCCCdCC', 'CdCCCCCC', 'CCCCdCCC', '.CCCCCC.', '..CCCC..']
const FOLDER = ['FFFF......', 'FFFFFFFFFF', 'FffffffffF', 'FffffffffF', 'FffffffffF', 'FffffffffF', 'FFFFFFFFFF']

const CAMEOS = [
  { sign: 'aries', cap: 'Deleted the rant. | Typed *a louder one.*', mood: lt => lt < 1.6 ? 'squint' : 'wide', look: [1, 0], star: ST, hops: [1.9],
    front(x, t, lt, P) {
      const d = lt < 1.85 ? typed('ok so listen', lt, 0.3, 0.9, 1.1, 1.5) : 'OK SO LISTEN!!'
      phone(x, t, 790, 860, R(t, P), { head: 'THE GROUP', headCol: RED, draft: d, draftSize: lt < 1.85 ? 24 : 22 })
      L(x, 790, 560, 'CAPS LOCK: ON', pop01(t, P.t0 + 1.9, 0.3, 2.2), RED, -0.04, 32, CREAM)
    } },
  { sign: 'taurus', cap: 'Offered to share fries. | Deleted it. *Mine.*', mood: lt => lt < 1.3 ? 'happy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      phone(x, t, 820, 820, R(t, P) * 0.9, { head: 'DATE', headCol: PINK, draft: typed('want some?', lt) })
      drawBits(x, FRIES, { Y: '#ffd23a', R: RED, W: CREAM }, F.x + 130, F.cy + 110, 13 * R(t, P, 0.4))
    } },
  { sign: 'gemini', cap: 'Wrote five drafts. | Forgot *the topic.*', mood: lt => lt < 1.4 ? 'sparkle' : 'wide', look: lt => [Math.floor(lt * 1.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) note(x, 700 + i * 46, 760 + i * 48, R(t, P, 0.2 + i * 0.18), ['DRAFT ' + (i + 1)], { w: 220, bg: [CREAM, '#ffe27a', LAV, MINT, PINK][i], size: 30, rot: -0.1 + i * 0.05 })
      bubble(x, 790, 1110, 'wait… what | was it about?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Deleted “miss you.” | Baked *cookies instead.*', mood: lt => lt < 1.5 ? 'sparkle' : 'heart', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      if (lt < 1.6) phone(x, t, 790, 860, R(t, P), { head: 'THE CRUSH', headCol: PINK, draft: typed('miss you ♡', lt) })
      else for (let i = 0; i < 3; i++) drawBits(x, COOKIE, { C: '#d8a05a', d: '#5b2e1a' }, 700 + i * 90, 900 - (i % 2) * 70, 14 * pop01(t, P.t0 + 1.6 + i * 0.12, 0.3, 2))
      if (lt >= 1.6) L(x, 790, 1080, 'DOZEN #3', pop01(t, P.t0 + 1.9, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Deleted a text. | It wasn’t *about them.*', mood: lt => lt < 1.3 ? 'happy' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: 'BESTIE', headCol: GOLD, draft: typed('how was ur day', lt, 0.3, 1.0, 1.3, 1.7), draftSize: 22 })
      L(x, 790, 560, 'TOPIC: NOT LEO', pop01(t, P.t0 + 1.3, 0.3, 2.2), ORANGE, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Deleted the whole text. | Over *one comma.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: 'BOSS', headCol: SKYB, draft: typed('Hi, all good,', lt, 0.3, 0.9, 1.4, 1.8), draftSize: 24 })
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.2) * (lt < 1.4 ? 1 : 0)
      if (k > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(790 + 110, 860 + 144, 40 * k, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 790, 560, 'UNACCEPTABLE', pop01(t, P.t0 + 1.1, 0.3, 2.2), RED, -0.04, 32, CREAM)
    } },
  { sign: 'libra', cap: 'Typed “yes.” Then “no.” | Then *“maybe.”* Deleted.', mood: lt => lt < 1.6 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const w = lt < 0.8 ? 'yes' : lt < 1.3 ? 'no' : lt < 1.8 ? 'maybe' : ''
      phone(x, t, 790, 860, R(t, P), { head: 'NEW MATCH', headCol: PINK, lines: [['dinner fri?', LAV, R(t, P, 0.3)]], draft: w, draftSize: 30 })
    } },
  { sign: 'scorpio', cap: 'The drafts folder? | A *secret archive.*', mood: lt => lt < 1.2 ? 'squint' : 'eyeroll', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FOLDER, { F: '#c98f2a', f: '#ffd27a' }, 790, 880, 30 * R(t, P))
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 900)
      L(x, 790, 900, `DRAFTS: ${n}`, R(t, P, 0.4), RED, 0.03, 34, CREAM)
      L(x, 790, 1100, 'NEVER SENT', pop01(t, P.t0 + 1.6, 0.3, 2.2), INK, -0.04, 32, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Typed brutal honesty. | Deleted. *Growth.*', mood: lt => lt < 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [1.8],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: 'FRIEND', headCol: LAV, lines: [['new haircut!!', LAV, R(t, P, 0.3)]], draft: lt < 1.6 ? typed('honestly? it’s', lt, 0.4, 1.0, 1.2, 1.5) : 'love it ♡', draftSize: 22 })
      sparkles(x, t, 790, 980, P.t0 + 1.7, 7, 160, 0.5)
    } },
  { sign: 'capricorn', cap: 'Deleted the 2 a.m. text. | Scheduled it *for 9.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: '2:04 A.M.', headCol: LAV, draft: typed('we should talk', lt, 0.3, 0.9, 1.1, 1.4), draftSize: 22 })
      L(x, 790, 560, 'SCHEDULED: 9:00', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Typed their feelings. | In *binary.*', mood: lt => lt < 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: 'THE CRUSH', headCol: SKYB, draft: typed('0110100001', lt, 0.3, 1.1, 1.5, 1.9), draftSize: 24 })
      L(x, 790, 560, 'TRANSLATION: ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Deleted “hey” to the match. | Needed *a nap.*', mood: lt => lt < 1.3 ? 'sparkle' : 'sleepy', tears: lt => lt < 1.3 ? 2 : 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, R(t, P), { head: 'NEW MATCH', headCol: PINK, draft: typed('hey', lt, 0.3, 0.7, 1.0, 1.2), draftSize: 30 })
      L(x, 790, 560, 'EXHAUSTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0494', key: 'D', accent: ACC, ending: 'callback',
  title: 'Never-sent zodiacs | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Typed. Deleted. | *Typed again.*' },
  last: {
    text: 'That 2 a.m. text? | Sent *at 9 sharp.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.5, 0.35, 2)
      phone(x, t, 560, 1060, k * 1.15, { head: '9:00 A.M.', headCol: MINT, lines: [['we should talk', MINT, pop01(t, t0 + 1.1, 0.25, 2.2), true], ['SENT ✓', GOLD, pop01(t, t0 + 1.4, 0.25, 2.2), true]], draft: '' })
      if (k > 0.5) signChar(x, t, 'capricorn', 260, 1200, 200, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], seed: 44, glyph: false, hops: [t0 + 1.5] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
