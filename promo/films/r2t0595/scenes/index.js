// r2t0595: star_talk, ROLLCALL, "The signs at | *1% battery.*" (signs3kit social cut, music: lofi · F).
// Twelve signs in zodiac order, each the most extreme version of itself on 1% battery:
//   ♈ sprinted to a charger across town · ♉ phone died, napped with it · ♊ sent forty texts on 1% · ♋ called mom first,
//   just in case · ♌ borrowed a charger, gave an autograph · ♍ has a backup charger for the backup · ♎ which last text?
//   died deciding · ♏ 1%? went dark on purpose · ♐ booked a flight anyway · ♑ never at 1%, never · ♒ built a potato
//   charger · ♓ wrote the phone a goodbye letter.
// Ending: lesson ("Low battery? | Rest *charges you too.*") then "Virgo's backup | *saved everyone.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', ST = { x: -170 }
const POTATO = ['..PPPPP..', '.PPPpPPP.', 'PPPPPPPpP', 'PpPPPPPPP', 'PPPPPpPPP', '.PPPPPPP.', '..PPPPP..']
const PLUG = ['.K.K.', '.K.K.', 'KKKKK', 'KKKKK', '.KKK.', '..K..', '..K..', '..K..']

// a battery with a level 0…1 (red when low)
function battery(x, cx, cy, k, lvl, { cell = 18 } = {}) {
  if (k <= 0.01) return
  bits(x, 'BATT', cx, cy, cell * k)
  const w = 10 * cell * k * clamp(lvl), h = 3 * cell * k
  x.fillStyle = lvl < 0.15 ? RED : MINT
  x.fillRect(cx - 5.5 * cell * k + cell * k, cy - h / 2, Math.max(cell * k * 0.4, w), h)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Sprinted to a charger. | *Across town.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: ST, hops: [0.4, 0.7, 1.0, 1.3, 1.6],
    front(x, t, lt, P) {
      battery(x, 800, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 0.01)
      L(x, 800, 880, 'DISTANCE: 6 KM', pop01(t, P.t0 + 0.8, 0.3, 2.3), GOLD, 0.04, 34)
      L(x, 800, 1020, 'TIME: 4 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Phone died. | Took *a nap* with it.', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      battery(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.8 ? 0 : 0.01)
      bits(x, 'PILLOW', F.x, F.cy + 140, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      zzz(x, t, F.x + 40, F.cy - 150)
      L(x, 800, 1000, 'BOTH: OFFLINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Sent forty texts | on *1%.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(clamp((lt - 0.3) / 1.4) * 40))
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '1% ⚡', headCol: RED, lines: [
        ['to: match', BONE, 1], ['to: mom', BONE, lt > 0.6 ? 1 : 0], ['to: group', BONE, lt > 0.9 ? 1 : 0],
      ], typing: 1, size: 24 })
      L(x, 800, 1100, `SENT: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: 'cancer', cap: 'Called mom first. | *Just in case.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'love you, bye!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      L(x, 800, 1070, 'PRIORITIES ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Borrowed a charger. | Gave *an autograph.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, PLUG, { K: BONE }, 720, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { outline: INK })
      sheet(x, 880, 900, pop01(t, P.t0 + 0.9, 0.35, 2), { w: 220, h: 160, rot: 0.08, lines: [['xoxo, LEO ✦', '#c98f2a']], size: 26 })
      L(x, 800, 1080, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Has a backup charger. | For *the backup.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) battery(x, 800, 700 + i * 120, pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), 1, { cell: 14 })
      L(x, 800, 1070, 'BACKUP #3', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Which last text? | *Died deciding.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const dead = lt > 1.5
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: dead ? '0%' : '1%', headCol: RED, lines: dead ? [] : [
        ['“night ♡”?', BONE, 1], ['“sleep well”?', BONE, lt > 0.6 ? 1 : 0], ['“…”?', BONE, lt > 1.0 ? 1 : 0],
      ], size: 24 })
      if (dead) L(x, 800, 1100, 'PHONE: GONE', pop01(t, P.t0 + 1.55, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'scorpio', cap: '1%? | Went *dark* on purpose.', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      battery(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 0.01)
      L(x, 800, 920, 'STATUS: UNKNOWN', pop01(t, P.t0 + 0.9, 0.3, 2.3), BONE, 0.04, 34)
      L(x, 800, 1060, 'MYSTERY: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: '1% battery. | Booked *a flight anyway.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      battery(x, 330, 720, pop01(t, P.t0 + 0.2, 0.3, 2), 0.01, { cell: 15 })
      const fly = ease.inOutCubic(prog(lt, 0.9, 2.0))
      bits(x, 'PLANE', lerp(200, 480, fly), lerp(1000, 820, fly), 14 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.4 })
      L(x, 330, 1080, 'GATE CLOSING', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Never at 1%. | *Never.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      battery(x, 330, 800, pop01(t, P.t0 + 0.2, 0.3, 2), 1)
      L(x, 330, 660, '100%', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.04, 50)
      L(x, 330, 980, 'SINCE 2019', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Built a charger | out of *a potato.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, POTATO, { P: '#c98f5a', p: '#8a5a32' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.7) { x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.moveTo(860, 860); x.lineTo(900, 760); x.lineTo(920, 700); x.stroke() }
      L(x, 800, 660, 'CHARGING: 2%', pop01(t, P.t0 + 1.2, 0.3, 2.3), MINT, 0.04, 34)
      sparkles(x, t, 900, 720, P.t0 + 1.2, 6, 90, 0.3)
    } },
  { sign: 'pisces', cap: 'Phone hit 1%. | Wrote it *a goodbye letter.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'DEAR PHONE', headBg: SKYB, headInk: INK, lines: ['you were', 'always there', 'for me ♡'], size: 32, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1080, 'PAGE 1 OF 6', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0595', key: 'F', accent: ACC, ending: 'lesson',
  title: 'The signs at | *1% battery.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve phones. | *One charger.*' },
  lesson: { text: 'Low battery? | Rest *charges you too.*', chip: 'YOU: RECHARGED' },
  last: { text: 'Virgo’s backup | *saved everyone.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
