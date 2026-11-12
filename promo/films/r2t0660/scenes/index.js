// r2t0660: star_talk, ROLLCALL, "The signs learn | *an instrument.*" (topic: the signs learning an instrument; signs3kit
// social cut, music: lofi · F). Twelve signs in zodiac order, each the most extreme version of itself:
//   ♈ day one, started a band · ♉ fanciest piano, plays one song · ♊ six instruments at once · ♋ sad songs, audience: the
//   cat · ♌ tour poster, knows three chords · ♍ scales for six hours, no mistakes · ♎ can't pick one, week four · ♏ cello,
//   only at midnight · ♐ took the drum on a hike · ♑ practice at 5 a.m., day 213 · ♒ invented an instrument (it honks)
//   · ♓ one note, wept at how beautiful.
// Ending: callback. group "The neighbours: | *impressed?*", then "Taurus’s one song? | *Encore number 40.*" (the piano).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, notes, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }, SR = { x: 170 }

// a pixel upright piano (keys glow when pressed)
function piano(x, t, cx, cy, k, { press = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 290)
  x.fillStyle = INK; x.fillRect(-165, -150, 330, 290)
  x.fillStyle = '#5b2e1a'; x.fillRect(-157, -142, 314, 274)
  x.fillStyle = '#8a4a2e'; x.fillRect(-140, -126, 280, 110)
  x.fillStyle = GOLD; x.fillRect(-40, -80, 80, 14)
  x.fillStyle = INK; x.fillRect(-150, 0, 300, 70)
  for (let i = 0; i < 10; i++) { x.fillStyle = i === press ? GOLD : '#ffffff'; x.fillRect(-144 + i * 29, 6, 25, 58) }
  x.fillStyle = INK; for (const i of [0, 1, 3, 4, 5, 7, 8]) x.fillRect(-124 + i * 29, 6, 16, 34)
  x.fillStyle = INK; x.fillRect(-140, 70, 20, 60); x.fillRect(120, 70, 20, 60)
  x.restore()
}
// a little drum with a strap
function drum(x, cx, cy, k, hit = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * (1 + 0.05 * hit), k * (1 - 0.04 * hit))
  x.fillStyle = INK; x.fillRect(-110, -70, 220, 170); x.fillStyle = RED; x.fillRect(-102, -40, 204, 132)
  x.fillStyle = GOLD; for (let i = 0; i < 6; i++) { x.fillRect(-96 + i * 38, -40, 8, 132) }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -50, 112, 34, 0, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, -50, 102, 26, 0, 0, 7); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Day one. | *Started a band.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      L(x, 800, 700, 'LESSONS: 1', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.04, 36)
      L(x, 800, 880, 'BAND: FORMED', pop01(t, P.t0 + 0.9, 0.3, 2.3), RED, -0.04, 44)
      notes(x, t, 560, 800, { n: 4, cell: 8, col: RED, seed: 1 })
      L(x, 800, 1090, 'TOUR: NEXT WEEK', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Bought the fanciest piano. | *Plays one song.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      piano(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { press: lt > 0.8 ? Math.floor(t * 3) % 4 : -1 })
      notes(x, t, 800, 760, { n: 3, cell: 7, col: GOLD, seed: 2, alpha: clamp(lt - 0.8) })
      L(x, 800, 1100, 'SONGS KNOWN: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Learning six instruments. | *At once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;[['FLUTE', SKYB], ['UKULELE', GOLD], ['HARP', PINK], ['BANJO', MINT], ['TUBA', LAV], ['KAZOO', CREAM]].forEach(([w, c], i) => L(x, 800 + (i % 2 ? 40 : -40), 640 + i * 92, w, pop01(t, P.t0 + 0.3 + i * 0.22, 0.3, 2.2), c, (i % 2 ? 0.05 : -0.05), 32))
    } },
  { sign: 'cancer', cap: 'Only plays sad songs. | *Audience: the cat.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const CAT = ['K...K.', 'KK.KK.', 'KKKKK.', 'KGKGK.', 'KKKKKK', '.KKKKK', '.KKKKK', '.K.K.K']
      drawBits(x, CAT, { K: '#ffb34a', G: MINT }, 820, 920, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      notes(x, t, 740, 760, { n: 3, cell: 7, col: SKYB, seed: 4 })
      bubble(x, 840, 700, 'meow.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: BONE, tail: 'bl' })
      L(x, 800, 1100, 'FANS: 1 (CAT)', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Made the tour poster. | *Knows three chords.*', mood: 'sparkle', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: '✦ LEO LIVE ✦', headBg: GOLD, headInk: INK, lines: ['world tour', 'one night only', 'every night'], size: 32, rot: 0.04 })
      L(x, 800, 1100, 'CHORDS KNOWN: 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Practised scales six hours. | *Zero mistakes.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'PRACTICE LOG', headBg: STEEL, headInk: INK, lines: ['scales: 600', 'mistakes: 0', ['fun: pending', '#c2185b']], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1100, 'METRONOME: TIRED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Can’t pick an instrument. | *Week four.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 780, Math.floor(lt * 2.5) % 2 ? 'VIOLIN?' : 'FLUTE?', 1, Math.floor(lt * 2.5) % 2 ? PINK : SKYB, 0.04, 56)
      L(x, 800, 1000, 'PLAYED: NOTHING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Learned the cello. | *Only plays at midnight.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ['..YYY..', '.YYY...', 'YYY....', 'YYY....', 'YYY....', '.YYY...', '..YYY..'], { Y: '#ffe7a8' }, 820, 720, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 1000, { n: 4, cell: 8, col: LAV, seed: 6 })
      L(x, 800, 1080, 'SHOWTIME: 12 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Took the drum | *on a hike.*', mood: 'sparkle', star: SR, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      drum(x, 330, 880, pop01(t, P.t0 + 0.2, 0.3, 2), Math.max(0, Math.sin(t * 12)))
      L(x, 330, 660, 'TRAIL: LOUD NOW', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.05, 34)
      L(x, 330, 1090, 'BIRDS: LEFT', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Practice at 5 a.m. | *Day 213.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [-1, 0], star: SR,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 330, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 330, 1060, 'STREAK: UNBROKEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Invented | *a new instrument.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 * Math.sin(t * 8) })
      bubble(x, 800, 650, 'HONK.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 54, col: SKYB, tail: 'bc' })
      L(x, 800, 1090, 'NAME: THE HONKER', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Played one note. | *Wept. It was beautiful.*', mood: 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST, hops: [0.4],
    front(x, t, lt, P) {
      notes(x, t, 800, 980, { n: 2, cell: 16, col: SKYB, seed: 5 })
      L(x, 800, 700, 'NOTES PLAYED: 1', pop01(t, P.t0 + 0.4, 0.3, 2.2), SKYB, 0.04, 36)
      L(x, 800, 1090, 'TISSUES USED: 9', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0660', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs learn | *an instrument.*',
  cameos: CAMEOS,
  group: { cap: 'The neighbours: | *impressed?*' },
  last: {
    text: 'Taurus’s one song? | *Encore number 40.*',
    draw(x, t, lt) {
      const t0 = t - lt
      piano(x, t, 720, 1120, 0.85 * pop01(t, t0 + 0.4, 0.35, 2), { press: lt > 1.0 ? Math.floor(t * 3) % 4 : -1 })
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 360, 1120, 260 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      notes(x, t, 700, 960, { n: 4, cell: 8, col: GOLD, seed: 3, alpha: clamp(lt - 1.0) })
      L(x, 720, 1340, 'SAME SONG ♡', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
