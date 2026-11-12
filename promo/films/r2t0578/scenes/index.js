// r2t0578: star_talk, BE LIKE (twelve signs), "“You had to be there.” | Zodiacs *be like.*" (signs3kit social cut, music: lofi · G).
// Twelve signs hearing "you had to be there":
//   ♈ demanded a reenactment · ♉ nodded politely, kept eating · ♊ wasn't there, told the story anyway · ♋ wasn't invited,
//   hurt for a week · ♌ wasn't there, so it didn't happen · ♍ asked for the timeline, with sources · ♎ laughed anyway, to
//   be nice · ♏ was there, in disguise · ♐ missed it, their story is better · ♑ couldn't, had a meeting · ♒ has a theory
//   anyway · ♓ cried just imagining it.
// Ending: group ("Next time, | everyone's going." with a group-chat sticker).
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }
// a fake moustache (Scorpio's disguise), drawn on the sprite's face area at (cx, cy)
function stache(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-58, -12, 116, 30); x.fillStyle = '#3a2418'; x.fillRect(-52, -6, 46, 18); x.fillRect(6, -6, 46, 18); x.fillRect(-62, 4, 14, 10); x.fillRect(48, 4, 14, 10)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Wasn’t there? | Demanded *a reenactment.*', mood: lt => lt > 0.9 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.9, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 640, 820, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.15 })
      bubble(x, 800, 660, 'AGAIN. FROM | THE TOP.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1060, 'TAKE 14', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 44)
    } },
  { sign: 'taurus', cap: 'Nodded politely. | *Kept eating.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2)); steam(x, t, 790, 820, { alpha: 0.6 })
      bubble(x, 790, 650, 'mm. wow.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1090, 'LISTENING: 4%', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Wasn’t there. | Told the story *anyway.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const V = ['so basically—', 'and THEN—', 'okay so—']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.2) / 0.5))
      bubble(x, 790, 720, V[n], pop01(t, P.t0 + 0.2 + n * 0.5, 0.2, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 950, `VERSION ${n + 2}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), GOLD, 0.04, 40)
    } },
  { sign: 'cancer', cap: 'Wasn’t invited?! | Hurt *for a week.*', mood: lt => lt > 0.8 ? 'wide' : 'neutral', look: [1, 0], star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'BLANKET', 380, 1080, 20 * pop01(t, P.t0 + 0.9, 0.3, 2)) },
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'MON–SUN', headBg: SKYB, headInk: INK, font: MONO, weight: 700, size: 30, lines: ['hurt', 'still hurt'], progress: prog(lt, 0.4, 1.2) })
      L(x, 790, 1060, 'INVITE ME NEXT TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Wasn’t there? | So *it didn’t happen.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'was I there? | no? then no.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 920, 'EVENT: CANCELLED', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.05, 34)
      sparkles(x, t, 370, 880, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Asked for the timeline. | *With sources.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 340, head: 'TIMELINE', headBg: '#2fc79a', headInk: INK, font: MONO, weight: 700, size: 26, align: 'left',
        lines: ['9:02 the joke', '9:03 laughter', '9:04 a chair?', ['source??', RED]], progress: prog(lt, 0.4, 1.6) })
    } },
  { sign: 'libra', cap: 'Laughed anyway. | *To be nice.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, lt < 1.3 ? 'HAHAHA' : 'ha… ha.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      L(x, 790, 940, 'POLITE LAUGH: ON', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Oh, they were there. | *In disguise.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - F.S * 0.04, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      stache(x, F.x, F.cy + F.S * 0.12, pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 790, 760, 'UNDERCOVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 40)
      bubble(x, 790, 960, 'great joke.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Missed it. | Their story *is better.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so there I was, | on a glacier—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bits(x, 'MOUNT', 790, 950, 24 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 1120, 'EVERYONE: LISTENING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Couldn’t be there. | *Had a meeting.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 660, 'MEETING 6 OF 9', pop01(t, P.t0 + 0.7, 0.3, 2.4), '#2fc79a', 0.04, 32)
      L(x, 790, 1060, 'FUN: SCHEDULED Q3', pop01(t, P.t0 + 1.5, 0.3, 2.4), STEEL, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Wasn’t there. | Has *a theory* anyway.', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, head: 'THEORY', headBg: MINT, headInk: INK, lines: [] })
      if (lt > 0.5) { x.save(); x.strokeStyle = RED; x.lineWidth = 6; const pts = [[680, 820], [800, 900], [890, 790], [720, 900]]; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke(); pts.forEach(([a, b]) => { x.fillStyle = INK; x.fillRect(a - 14, b - 14, 28, 28); x.fillStyle = GOLD; x.fillRect(a - 10, b - 10, 20, 20) }); x.restore() }
      bubble(x, 790, 1060, 'it was aliens', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Wasn’t there. | *Cried* just imagining it.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'it sounds | SO beautiful', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      hearts(x, t, 800, 960, P.t0 + 1.0, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 4 })
      L(x, 790, 1100, 'NOT EVEN THERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0578', key: 'G', accent: ACC, ending: 'group',
  title: '“Had to be there.” | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'pisces', chip: 'ALIGNED' },
  group: {
    cap: 'Next time, | *everyone’s going.*',
    draw(x, t, lt) { label(x, 540, 700, 'GROUP CHAT: PLANNING', pop01(t, t - lt + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
