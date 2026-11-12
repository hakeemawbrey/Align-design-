// r2t0704: star_talk, BELIKE, "Someone texts “k”? | Zodiacs *be like.*" (topic: zodiacs when someone texts "k";
// signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each one's most extreme reaction to one
// letter. Ending: lesson.
//   ♈ called them in four seconds · ♉ replied "k", back to lunch · ♊ showed it to nine friends · ♋ wrote a three-page
//   apology · ♌ "they're clearly intimidated" · ♍ corrected it to "Okay." · ♎ drafted eleven replies, sent none
//   · ♏ replied with a single period · ♐ didn't notice, no signal on a hike · ♑ sent the "k" (efficiency)
//   · ♒ decoded it with a birth chart · ♓ cried, wrote an ode
//   lesson "“k” usually means | *just okay.*" · last "They were | *just driving.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, chart, swapLabel, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe76a', ST = { x: -170 }
const K = (t, P, d = 0.2) => ['k', BONE, pop01(t, P.t0 + d, 0.2, 2), false]

const CAMEOS = [
  { sign: 'aries', cap: 'Got a “k.” | *Called in four seconds.*', mood: lt => lt > 0.8 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.8, 1.1, 1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt > 0.8 ? 'CALLING…' : 'MESSAGES', headCol: lt > 0.8 ? RED : MINT, lines: [K(t, P, 0.3), ['explain.', '#ff8a7a', pop01(t, P.t0 + 0.6, 0.2, 2), true]], size: 30, rot: 0.05 + (lt > 0.8 ? Math.sin(t * 40) * 0.03 : 0) })
      L(x, 810, 1130, 'RESPONSE TIME: 4s', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Replied “k.” | *Back to lunch.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 820, 780, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: MINT, lines: [K(t, P, 0.3), ['k', '#7dffb0', pop01(t, P.t0 + 0.7, 0.2, 2), true]], size: 30 })
      bits(x, 'SANDWICH', 700, 1060, 13 * pop01(t, P.t0 + 1.0, 0.3, 2))
    } },
  { sign: 'gemini', cap: 'Got a “k.” | *Showed nine friends.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const W = ['look at THIS', 'what does', 'it MEAN', 'screenshot ✓'], n = Math.min(3, Math.floor(lt / 0.4))
      for (let i = 0; i <= n; i++) bubble(x, 760 + (i % 2) * 60, 650 + i * 120, W[i], 1, { size: 34, tail: i % 2 ? 'br' : 'bl', col: i % 2 ? '#ffe76a' : BONE })
      L(x, 800, 1150, 'FORWARDED: 9×', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Got a “k.” | *Wrote a 3-page apology.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) sheet(x, 800 + i * 26, 860 - i * 22, 1.1 * pop01(t, P.t0 + 0.2 + (2 - i) * 0.2, 0.3, 2), { w: 300, h: 330, head: `SORRY (${3 - i}/3)`, headBg: SKYB, headInk: INK, lines: i ? [] : ['dear you,', 'whatever i', 'did, i’m so', 'so sorry…'], size: 28, align: 'left', progress: prog(lt, 0.8, 1.6), rot: -0.04 + i * 0.03 })
    } },
  { sign: 'leo', cap: '“k”? | *They’re intimidated.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, t, 820, 760, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: '#ffb34a', lines: [K(t, P, 0.3)], size: 30 })
      bubble(x, 790, 1060, 'they’re just | shy of me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: '#ffd23a', tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Got a “k.” | *Corrected it to “Okay.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 1.0, 'k', 'Okay.', { size: 72, fromBg: BONE, toBg: MINT })
      L(x, 800, 1060, 'GRAMMAR: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Got a “k.” | *Drafted eleven replies.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(10, Math.floor(Math.max(0, lt - 0.3) / 0.12))
      phone(x, t, 800, 860, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFT ${n}/11`, headCol: PINK, lines: [['k!', BONE, 1, true], ['kk :)', BONE, 1, true], ['ok but like', BONE, 1, true]].slice(0, Math.min(3, n)), size: 28 })
      L(x, 810, 1130, 'SENT: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Got a “k.” | *Replied with a period.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: '#c97bff', lines: [K(t, P, 0.3), ['.', '#c97bff', pop01(t, P.t0 + 1.0, 0.2, 2.4), true]], size: 34 })
      L(x, 810, 1120, 'TEMPERATURE: ICE', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Got a “k”? | *Didn’t notice. Hiking.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 660, 'NO SIGNAL ✦', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, -0.04, 36)
      L(x, 800, 1110, 'UNREAD: 1 (k)', pop01(t, P.t0 + 1.5, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Sent the “k.” | *It’s called efficiency.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 820, 780, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SENT', headCol: STEEL, lines: [['k', STEEL, pop01(t, P.t0 + 0.4, 0.2, 2), true]], size: 30 })
      L(x, 800, 1080, 'TIME SAVED: 2 SEC', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Got a “k.” | *Checked their chart.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * 3)
      L(x, 800, 1070, lt < 1.4 ? 'DECODING…' : 'MEANS: OKAY', pop01(t, P.t0 + 0.6, 0.3, 2), lt < 1.4 ? STEEL : MINT, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Got a “k.” | *Cried. Wrote it an ode.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, 1.15 * pop01(t, P.t0 + 0.3, 0.3, 2), { w: 320, h: 300, head: 'ODE TO “k”', headBg: SKYB, headInk: INK, lines: ['one letter,', 'so much', 'unsaid…'], size: 32, font: "'EB Garamond', Georgia, serif", weight: 600, progress: prog(lt, 0.6, 1.6), rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0704', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Someone texts “k”? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One letter. | *Twelve meltdowns.*', moods: ['wide', 'happy', 'wide', 'wide', 'wink', 'squint', 'wide', 'squint', 'sparkle', 'neutral', 'squint', 'wide'] },
  lesson: { text: '“k” usually means | *just okay.*', chip: 'PANIC: CANCELLED' },
  last: {
    text: 'They were | *just driving.*',
    draw(x, t, lt) { bubble(x, 540, 1560, 'sorry, was driving! :)', pop01(t, t - lt + 0.9, 0.3, 2.2), { size: 54, col: MINT, tail: 'bc' }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
