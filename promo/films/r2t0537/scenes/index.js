// r2t0537: star_talk, BELIKE, "Results day | *be like.*" (zodiacs waiting for results; signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each waiting for results in the most extreme way possible.
//   ♈ refreshed the page 400 times · ♉ stress-baked a whole bakery · ♊ three predictions for three people
//   · ♋ wrote themselves a consolation card in advance · ♌ booked the victory party · ♍ re-marks every answer from memory
//   · ♎ can't decide whether to open the email · ♏ "i don't care", awake at 4 a.m. · ♐ forgot there was a test
//   · ♑ plan B, and C through Z · ♒ asked their birth chart for the answer · ♓ cried before, cried after, passed
//  group "Everyone passed. | *Nobody slept.*"   callback: "Aries got the results. | *Refreshed anyway.*" (the counter, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, calendar, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#7dc8ff'
const CURSOR = ['K.....', 'KK....', 'KWK...', 'KWWK..', 'KWWWK.', 'KWWWWK', 'KWWKKK', 'KK.KW.', '....KW']
const CURSOR_C = { K: INK, W: '#ffffff' }
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.4)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.5, 2.2, 3.9, 5.1]) x.fillRect(Math.cos(a) * r * 0.42 - 7, Math.sin(a) * r * 0.42 - 7, 14, 14)
  x.restore()
}
// a browser-ish window with a refresh counter
function refresh(x, cx, cy, k, n, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -110, 310, 240)
  x.fillStyle = INK; x.fillRect(-160, -120, 320, 240)
  x.fillStyle = '#9aa5c4'; x.fillRect(-152, -112, 304, 40)
  x.fillStyle = PAPER; x.fillRect(-152, -66, 304, 178)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RESULTS: SOON', 0, -24)
  x.font = `800 54px ${INTER}`; x.fillText(`↻ ×${n}`, 0, 50)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Refreshed the page | *four hundred times.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, squash: lt => 0.06 * Math.sin(lt * 30),
    front(x, t, lt, P) {
      const n = Math.min(400, Math.floor(Math.pow(clamp(lt / 2.0), 1.6) * 400))
      refresh(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), n, t)
      drawBits(x, CURSOR, CURSOR_C, 905 + 6 * Math.sin(t * 30), 935, 9 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1060, 'F5 F5 F5 F5', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: RED, color: '#fff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Stress-baked | *a whole bakery.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const spots = [[720, 1080], [880, 1080], [800, 950], [720, 820], [880, 820]]
      spots.forEach(([cx, cy], i) => bits(x, i % 2 ? 'cookie' : 'cake', cx, cy, 13 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2)))
      label(x, 800, 650, 'BATCH 9', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Three predictions. | *For three people.*', mood: lt => ['wink', 'sparkle', 'wide'][Math.floor(lt * 2.4) % 3], look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'nailed it!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      bubble(x, 790, 820, 'it’s over.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      bubble(x, 800, 1020, 'who knows?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Wrote themselves | *a consolation card.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.25, 0.3, 2), 'you tried | so hard. | proud of u.', { head: 'TO: ME', headBg: SKYB, size: 34, w: 300, rot: 0.05 })
      label(x, 800, 1100, 'WRITTEN: IN ADVANCE', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Booked the victory party. | *Results pending.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.9, 1.6],
    front(x, t, lt, P) {
      [[720, 760], [800, 700], [880, 760]].forEach(([cx, cy], i) => bits(x, 'balloon', cx, cy + 8 * Math.sin(t * 2 + i), 19 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2)))
      label(x, 800, 960, 'PARTY: BOOKED', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: GOLD, rot: -0.05 })
      label(x, 800, 1070, 'GRADE: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Re-marked every answer. | *From memory.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'Q1 ✓ | Q2 ✓ | Q3 ✓ | Q37 ...?', { head: 'MY ANSWERS', headBg: MINT, size: 34, w: 300, rot: -0.04, strike: lt > 1.3 ? [3] : [] })
      bubble(x, 800, 610, 'wait. Q37.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'The email arrived. | Open it? *Don’t?*', mood: lt => lt > 1.6 ? 'squint' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bits(x, 'envelope', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      const w = Math.floor(lt * 2.5) % 2 ? 'DON’T.' : 'OPEN IT.'
      label(x, 800, 680, w, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: Math.floor(lt * 2.5) % 2 ? PINK : MINT, rot: -0.05 })
      label(x, 800, 1090, 'UNREAD: DAY 2', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“I don’t even care.” | *Awake at 4 a.m.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'not bothered.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      calendar(x, 800, 920, pop01(t, P.t0 + 0.9, 0.3, 2), 'RIGHT NOW', '4:07', { topBg: '#6b62a8', rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Forgot there was a test. | *Already abroad.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.5, 1.2],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 310, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      bits(x, 'sun', 300, 690, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: t * 0.5 })
      bubble(x, 330, 840, 'wait, | what test?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Made a plan B. | *And plans C to Z.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const n = 2 + Math.floor(clamp((lt - 0.3) / 1.6) * 24)
      const L = String.fromCharCode(64 + Math.min(26, n))
      note(x, 320, 840, pop01(t, P.t0 + 0.2, 0.3, 2), `plan B | plan C | ... | plan ${L}`, { head: 'BACKUP PLANS', headBg: '#9aa5c4', size: 36, w: 300, rot: 0.04 })
      label(x, 320, 1100, 'BINDER: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked their birth chart | *for the answer.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 800, 820, 120, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      bubble(x, 800, 1040, 'it says: | probably?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cried before. Cried after. | *Passed.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', tears: lt => lt > 1.3 ? 3 : 2, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 700, 'BEFORE: TEARS', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 880, 'PASSED!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 56, bg: MINT, rot: 0.05 })
      sparkles(x, t, 800, 880, P.t0 + 1.35, 8, 170, 0.3)
      label(x, 800, 1050, 'AFTER: TEARS', pop01(t, P.t0 + 1.7, 0.3, 2), { size: 34, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0537', key: 'E', accent: ACC, ending: 'callback',
  title: 'Results day | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone passed. | *Nobody slept.*', moods: ['wide', 'happy', 'wink', 'heart', 'sparkle', 'squint', 'happy', 'sleepy', 'sparkle', 'happy', 'wink', 'wide'] },
  last: {
    text: 'Aries got the results. | *Refreshed anyway.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 360, 1110, 260 * k, { mood: 'squint', look: [1, 0], seed: 12, squash: 0.06 * Math.sin(lt * 30) })
      const n = 400 + Math.floor(Math.max(0, lt - 0.9) * 9)
      refresh(x, 730, 1080, pop01(t, t - lt + 0.7, 0.35, 2), n, t)
      label(x, 730, 1280, 'PASSED ✓', pop01(t, t - lt + 0.9, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
