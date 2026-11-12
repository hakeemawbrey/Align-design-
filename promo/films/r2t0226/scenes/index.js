// r2t0226: THE SIGNS AS… v3, "The signs | get promoted." (rollcall, star_talk, music: lofi · C). Ending: callback.
//   ♈ promoted at nine, asked for more at ten · ♉ first request: a nap pod · ♊ told everyone before the boss did
//   · ♋ moved one desk over, threw a farewell party · ♌ printed the new title on a banner · ♍ day one: a handbook (vol. 1 of 3)
//   · ♎ still deciding since March · ♏ knew before HR · ♐ promoted Monday, backpacking by Friday
//   · ♑ already planning the next three · ♒ accepted, abolished all job titles · ♓ boss said "well done", sobbed
//   group "New titles. | *Same chaos.*"   last (callback to Libra) "Libra finally | said *yes.*"  OFFER: EXPIRED
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }

// a long party banner with bunting edges
function banner(x, t, cx, cy, k, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-190, -50, 400, 120)
  x.fillStyle = INK; x.fillRect(-206, -66, 412, 132)
  x.fillStyle = GOLD; x.fillRect(-200, -60, 400, 120)
  x.fillStyle = INK; x.font = `800 40px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  String(text).split('|').map(s => s.trim()).forEach((l, i, a) => x.fillText(l, 0, (i - (a.length - 1) / 2) * 46 + 2))
  const COLS = [PINK, MINT, SKYB, ORANGE]
  for (let i = 0; i < 8; i++) { x.fillStyle = COLS[i % 4]; x.beginPath(); x.moveTo(-200 + i * 50, 60); x.lineTo(-150 + i * 50, 60); x.lineTo(-175 + i * 50, 92); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Promoted at nine. | Asked for *more* at ten.', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: L, hops: [0.5, 1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 650, 'PROMOTED: 9:00', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 860, 'cool. | what’s next?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1060, '10:00', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'New title accepted. | First ask: *a nap pod.*', mood: lt => lt > 1.6 ? 'sleepy' : 'happy', star: L,
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'REQUEST #1: | nap pod', { head: 'TO: HR', headBg: MINT, size: 40, w: 340 })
      bits(x, 'pillow', 790, 1000, 20 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: 0.04 })
      label(x, 790, 1110, 'NON-NEGOTIABLE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told the whole office. | *Before the boss did.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(47, Math.floor(Math.max(0, lt - 0.4) * 30))
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: '9:02', head: 'OFFICE CHAT', msg: `guess who? | +${n} replies`, bg: GOLD })
    } },
  { sign: 'cancer', cap: 'Moved one desk over. | Threw *a farewell party.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      bits(x, 'cake', 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 940, 'DISTANCE: 2 METERS', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'I’ll visit!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 740, P.t0 + 1.5, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'New title? | Printed it *on a banner.*', mood: 'sparkle', star: { x: 0, y: 90 }, hops: [0.9],
    front(x, t, lt, P) {
      banner(x, t, 540, 600, pop01(t, P.t0 + 0.3, 0.35, 2), 'SENIOR | LEO')
      sparkles(x, t, 540, 620, P.t0 + 0.7, 8, 240, 0.2)
    } },
  { sign: 'virgo', cap: 'Day one as manager. | Wrote *a handbook.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'book', 790, 740, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 790, 920, 'VOL. 1 OF 3', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 40, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'quiz on friday', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Got the offer. | *Still deciding.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, Math.floor(lt * 2.5) % 2 ? 'yes?' : 'no?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 790, 900, 'OFFER SENT: MARCH', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 32, bg: '#ff8fb1', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew about the promotion. | *Before HR.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 740, pop01(t, P.t0 + 0.2, 0.3, 2), 'promotion | list', { head: 'TOP SECRET', headBg: RED, size: 40, w: 320 })
      bubble(x, 790, 1020, 'oh, I know.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Promoted on Monday. | *Backpacking* by Friday.', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bits(x, 'suitcase', 310, 740, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 310, 950, 'OUT OF OFFICE', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 310, 1060, 'BACK: ???', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Got promoted. | Planned *the next three.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 310, 800, k, 'manager ✓ | director | VP | the moon', { head: 'CAREER PLAN', headBg: MINT, size: 36, w: 330 })
    } },
  { sign: 'aquarius', cap: 'Took the promotion. | Abolished *all job titles.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.5],
    front(x, t, lt, P) {
      note(x, 790, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 'manager', { head: 'NAMEPLATE', headBg: SKYB, size: 46, w: 300, strike: lt > 0.9 ? [0] : [] })
      bubble(x, 790, 960, 'we’re all | just people.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Boss said “well done.” | *Sobbed* in the meeting.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'well done!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 48, tail: 'br', col: LAV })
      label(x, 790, 900, 'MEETING: PAUSED', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 600, 1160, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0226', key: 'C', accent: MINT, ending: 'callback',
  title: 'The signs | *get promoted.*',
  cameos: CAMEOS,
  group: { cap: 'New titles. | *Same chaos.*' },
  last: {
    text: 'Libra finally | said *yes.*',
    draw(x, t, lt) {
      signChar(x, t, 'libra', 540, 1020, 260, { mood: lt > 0.8 ? 'sparkle' : 'happy', pop: pop01(t, t - lt + 0.3, 0.4, 1.8), hops: [t - lt + 0.9], seed: 9 })
      bubble(x, 540, 790, 'yes!', pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 72, tail: 'bc' })
      label(x, 540, 1240, 'OFFER: EXPIRED', pop01(t, t - lt + 1.6, 0.3, 2.2), { size: 44, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
