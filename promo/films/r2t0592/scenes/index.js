// r2t0592: star_talk, ROLLCALL, "The signs on | *parents’ night.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme parent at parent-teacher night:
//   ♈ challenged the teacher to a race · ♉ came for the cookies, took the tray · ♊ talked to every teacher at once
//   · ♋ brought baby photos and the kid's birth chart · ♌ asked about the kid, talked about themself · ♍ graded the
//   report card: C minus · ♎ couldn't pick a tiny chair, stood all night · ♏ knew the grades before the teacher
//   · ♐ took the field-trip form, went themself · ♑ brought a career plan, the kid is six · ♒ proposed a school on
//   the moon · ♓ saw the macaroni art, wept in the hallway.
// Ending: callback. group "The kids are fine. | The *parents?*", then "The tray came back. | *Empty.*" (Taurus + the empty tray)
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER } from '../../signs3kit.js'
import { L, sheet, bits, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }

const CHAIR = ['RRRRRR', 'R....R', 'RRRRRR', 'R....R', 'R....R']
const MAC = ['Y.Y.Y.Y', '.Y.Y.Y.', 'Y.Y.Y.Y', '.Y.Y.Y.', 'Y.Y.Y.Y']

// a baking tray with n cookies left on it
function tray(x, cx, cy, k, n, { rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -60, 312, 132)
  x.fillStyle = INK; x.fillRect(-164, -74, 328, 140)
  x.fillStyle = STEEL; x.fillRect(-156, -66, 312, 124)
  x.fillStyle = '#c9d0e4'; x.fillRect(-140, -50, 280, 92)
  for (let i = 0; i < n; i++) bits(x, 'COOKIE', -96 + (i % 3) * 96, -16 + Math.floor(i / 3) * 44, 5)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged the teacher | to *a race.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 800, 960, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'wide', look: [-1, 0], seed: 21 })
      L(x, 800, 700, 'TEACHER VS ME', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.04, 34)
      bubble(x, 420, 640, 'ON YOUR MARKS!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Came for the cookies. | Took *the tray.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const grab = ease.inOutCubic(prog(lt, 1.0, 1.5))
      tray(x, lerp(800, F.x + 40, grab), lerp(880, F.cy + 120, grab), pop01(t, P.t0 + 0.2, 0.3, 2), 6)
      L(x, 800, 1080, 'TRAY: GONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'gemini', cap: 'Talked to every teacher. | *At once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 830, 'love the tie', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      bubble(x, 790, 1020, 'is that a gym?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Brought baby photos. | And *his birth chart.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 0.9) * 6)
      for (let i = 0; i < n; i++) sheet(x, 780 + i * 6, 900 - i * 22, 1, { w: 220, h: 160, rot: (i % 2 ? 0.08 : -0.06), bg: CREAM, lines: [], size: 20 })
      L(x, 790, 720, '400 PHOTOS', pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.04, 36)
      L(x, 790, 1070, '+ HIS BIRTH CHART', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Asked about their kid. | Talked about *themself.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'so, my kid…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 780, 920, 'ME AT HIS AGE?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
      L(x, 790, 1080, 'MINUTE 45', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 34)
    } },
  { sign: 'virgo', cap: 'Graded the report card. | *C minus.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 300, head: 'REPORT CARD', headBg: STEEL, headInk: INK, lines: ['math: A', 'art: A', 'font: ugh'], size: 34 })
      const k = pop01(t, P.t0 + 1.3, 0.3, 2.4)
      if (k > 0.01) { x.save(); x.translate(800, 1085); x.rotate(-0.12); x.scale(k, k); x.fillStyle = RED; x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('C–', 0, 0); x.restore() }
    } },
  { sign: 'libra', cap: 'Couldn’t pick a tiny chair. | Stood *all night.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [RED, SKYB, MINT]
      for (let i = 0; i < 3; i++) drawBits(x, CHAIR, { R: COLS[i] }, 650 + i * 130, 900, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      L(x, 790, 1060, 'STANDING: 2 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Knew the grades | *before the teacher.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'B+ in history.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 900, 'TEACHER: ??', pop01(t, P.t0 + 1.0, 0.3, 2.3), BONE, 0.04, 38)
      L(x, 790, 1040, 'NOT EVEN POSTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Took the field-trip form. | *Went themself.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      sheet(x, 330, 760, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 260, h: 200, head: 'FIELD TRIP', headBg: MINT, headInk: INK, lines: ['signed:', ['ME!', RED]], size: 34 })
      const fly = ease.inOutCubic(prog(lt, 1.1, 2.0))
      bits(x, 'SUITCASE', lerp(330, 380, fly), 1010, 15 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bits(x, 'PLANE', lerp(160, 520, fly), lerp(1080, 600, fly), 12 * clamp((lt - 1.1) * 4))
    } },
  { sign: 'capricorn', cap: 'Brought a career plan. | The kid is *six.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      sheet(x, 330, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 320, head: 'CAREER PLAN', headBg: STEEL, headInk: INK, lines: ['age 7: intern', 'age 9: CEO', 'nap: 2 p.m.'], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 330, 1080, 'GOALS: SET', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Proposed a school | *on the moon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MOON', 800, 800, 26 * pop01(t, P.t0 + 0.25, 0.3, 2))
      L(x, 800, 1030, 'RECESS: ZERO-G', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 34)
      sparkles(x, t, 800, 800, P.t0 + 1.3, 7, 180, 0.3)
    } },
  { sign: 'pisces', cap: 'Saw the macaroni art. | Wept *in the hallway.*', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      sheet(x, 800, 860, k, { w: 300, h: 280, rot: 0.05, lines: [], size: 20 })
      drawBits(x, MAC, { Y: '#ffd23a' }, 800, 840, 26 * k, { rot: 0.05 })
      L(x, 800, 1080, 'A MASTERPIECE', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0592', key: 'E', accent: ACC, ending: 'callback',
  title: 'The signs on | *parents’ night.*',
  cameos: CAMEOS,
  group: { cap: 'The kids are fine. | The *parents?*' },
  last: {
    text: 'The tray came back. | *Empty.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 380, 1100, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      tray(x, 760, 1100, pop01(t, t0 + 0.5, 0.35, 2), 0)
      L(x, 760, 1260, '0 COOKIES LEFT', pop01(t, t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
