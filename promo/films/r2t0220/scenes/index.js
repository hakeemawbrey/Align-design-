// r2t0220: star_talk, BE LIKE, "Sleepy zodiacs | be like." (~54 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each the most extreme version of itself when sleepy.
//   0.0–3.6    "Sleepy zodiacs | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ fought sleep, lost in one round · ♉ fell asleep mid-bite · ♊ too sleepy to text, still texting
//              · ♋ tucked everyone in, fell asleep first · ♌ the eye mask is gold · ♍ still did the 12-step skincare
//              · ♎ picking a pillow at 4 a.m. · ♏ yawned, denied it · ♐ fell asleep on the first date
//              · ♑ scheduled a yawn for 9:15 · ♒ sleepy at 3 p.m., wide awake at 3 a.m. · ♓ too tired to cry, cried
//  49.2        group ending: "Sleepy all day. | *Awake all night.*"  The twelve, wide awake, under a 2 A.M. moon.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const NIGHT = '#8fa8ff'
const SANDWICH = ['.BBBBBBBBB..', 'BBBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRR.', 'YYYYYYYYYYY.', 'BBBBBBBBBBB.']
const SANDWICH_C = { B: '#e8a24a', G: GREEN, R: RED, Y: SUN }
const MASK = ['.YYYYY...YYYYY.', 'YYYYYYYYYYYYYYY', 'YYKKKYYYYYKKKYY', 'YYYYYYY.YYYYYYY', '.YYYYY...YYYYY.']
const BOTTLE = ['.KK.', '.KK.', 'BBBB', 'BWBB', 'BBBB', 'BBBB', 'BBBB']
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const BALL = ['..SSSS..', '.SWSSWS.', 'SSSSSSSS', 'SWSSSSWS', 'SSSSSSSS', '.SWSSWS.', '..SSSS..']
const BELL = ['...KK...', '..YYYY..', '.YYYYYY.', '.YYYYYY.', 'YYYYYYYY', '...KK...']

const CAMEOS = [
  { sign: 'aries', cap: 'Fought sleep. | Lost in *one round.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, BELL, { K: INK, Y: GOLD }, 860, 680, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 0.6 ? Math.sin(t * 30) * 0.2 : 0 })
      label(x, 720, 700, 'ROUND 1', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 920, 'K.O. 9:01 P.M.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fell asleep | *mid-bite.*', mood: lt => lt > 0.9 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, SANDWICH, SANDWICH_C, F.x + 150, F.cy + 30, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 800, 720, 'BITES: ½', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Too sleepy to text. | *Still texting.*', mood: 'sleepy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MATCH', headCol: MINT, size: 26, w: 300, h: 420, rot: 0.03, lines: [
        ['ok goodnight', LAV, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['wait one more', LAV, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['ALSO—', LAV, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
        ['zzzzzzzz', GOLD, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
    } },
  { sign: 'cancer', cap: 'Tucked everyone in. | *Fell asleep first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', look: [1, 1], star: { x: -180, y: 20 },
    front(x, t, lt, P) {
      const kids = [['leo', 680], ['aries', 790], ['libra', 900]]
      kids.forEach(([id, cx], i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, id, cx, 945, 130 * k, { mood: lt > 1.4 ? 'wide' : 'sleepy', look: [-1, 0], seed: 40 + i, glyph: false }) })
      const b = ease.outCubic(prog(lt, 0.5, 0.9))
      x.save(); x.fillStyle = INK; x.fillRect(612, lerp(1220, 1000, b) - 6, 356, 226); x.fillStyle = '#ff8fb1'; x.fillRect(620, lerp(1220, 1000, b), 340, 214)
      x.fillStyle = '#ffd1df'; for (let i = 0; i < 4; i++) x.fillRect(640 + i * 82, lerp(1220, 1000, b) + 30, 40, 40); x.restore()
      bubble(x, 820, 760, 'is she asleep?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Exhausted. But the | eye mask is *gold.*', mood: 'sleepy', star: { x: -160 },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 0.7))
      drawBits(x, MASK, { Y: GOLD, K: '#c98f2a' }, F.x, lerp(F.cy - 200, F.cy - 6, d), 14, { alpha: clamp(d * 3) })
      sparkles(x, t, F.x, F.cy, P.t0 + 0.75, 7, 170, 0.4)
      label(x, 800, 760, '24 KARAT NAP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Half asleep. Still did | the *12-step skincare.*', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(12, 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 11))
      for (let i = 0; i < n; i++) drawBits(x, BOTTLE, { K: INK, B: [MINT, PINK, SKYB, LAV][i % 4], W: '#fff' }, 660 + (i % 4) * 85, 720 + Math.floor(i / 4) * 150, 12)
      label(x, 790, 1170, `STEP ${n} / 12`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picking a pillow. | *It’s 4 a.m.*', mood: lt => lt > 1.6 ? 'sleepy' : 'squint', look: lt => [Math.floor(lt * 2.5) % 3 - 1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const C = ['#fff4e2', '#ffd1df', '#c9e8ff']
      C.forEach((c, i) => { const sel = Math.floor(lt * 2.5) % 3 === i; drawBits(x, PILLOW, { W: c }, 680 + i * 110, 860 + (sel ? -30 : 0), 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)) })
      clock(x, 790, 660, 66, pop01(t, P.t0 + 0.6, 0.3, 2), 4, 0)
      label(x, 790, 1040, 'STILL DECIDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Yawned. | Denied it *completely.*', mood: lt => lt > 0.5 && lt < 1.0 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I’m NOT | tired.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
      const n = 1 + Math.floor(clamp((lt - 1.0) / 1.0) * 13)
      label(x, 790, 950, `YAWNS: ${n}`, pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Fell asleep | on the *first date.*', mood: lt => lt > 1.1 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 960, 200 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 29, glyph: false })
      bubble(x, 810, 700, 'so anyway, | my taxes…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
      label(x, 560, 1160, 'DATE 2: TBD', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Scheduled a yawn. | *For 9:15.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'TONIGHT', 0, -130, { size: 30, font: MONO, weight: 700 })
        ;[['9:00', 'teeth', SKYB], ['9:15', 'YAWN', GOLD], ['9:16', 'sleep', LAV]].forEach(([h, s, c], i) => {
          const y = -50 + i * 80; txt(x, h, -100, y, { size: 26, font: MONO, weight: 700 }); x.fillStyle = c; x.fillRect(-30, y - 26, 170, 52); txt(x, s, 55, y + 2, { size: 28 })
        })
      })
      label(x, 790, 1110, 'ON SCHEDULE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Sleepy at 3 p.m. | *Wide awake at 3 a.m.*', mood: lt => lt > 1.1 ? 'wide' : 'sleepy', look: [1, -1], star: { x: -170 },
    back(x, t, lt, P) { const n = ease.inOutCubic(prog(lt, 0.9, 1.2)); x.save(); x.globalAlpha = 0.55 * n; x.fillStyle = '#05040c'; x.fillRect(120, 480, 840, 740); x.restore() },
    front(x, t, lt, P) {
      const night = lt > 1.1
      clock(x, 790, 760, 90, pop01(t, P.t0 + 0.2, 0.3, 2), 3, 0)
      label(x, 790, 920, night ? '3 A.M.' : '3 P.M.', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: night ? NIGHT : SUN, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'new idea!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Too tired to cry. | *Cried anyway.*', mood: lt => lt > 1.0 ? 'wide' : 'sleepy', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'REASON: TIRED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 900, 'I’m just | so sleepy', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0220', key: 'F', accent: NIGHT, ending: 'group',
  title: 'Sleepy zodiacs | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Sleepy all day. | *Awake all night.*',
    moods: Array(12).fill('wide'),
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.4, 0.4, 2)
      if (k <= 0.01) return
      x.save(); x.translate(540, 640); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 98, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill()
      x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(46, -28, 86, 0, Math.PI * 2); x.fill()
      x.restore()
      label(x, 540, 790, '2:00 A.M.', pop01(t, t - lt + 1.8, 0.3, 2.4), { size: 40, bg: NIGHT, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
