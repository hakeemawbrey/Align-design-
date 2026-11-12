// r2t0539: star_talk, BELIKE, "When plans work | *be like.*" (topic: zodiacs when the plan actually works; shortened to
// fit two lines). signs3kit social cut, music: lofi · D. Ending: group.
//   ♈ took full credit (it was your plan) · ♉ celebrated with three dinners · ♊ already pitching the sequel
//   · ♋ framed the plan, hung it at home · ♌ acceptance speech, to the plan · ♍ suspicious: what went wrong?
//   · ♎ thanked everyone, twice · ♏ calm nod (had a secret backup plan) · ♐ celebrated by booking a flight
//   · ♑ on the résumé the same day · ♒ bored already, next experiment · ♓ happy tears for an hour
//  group "It worked. | *Nobody knows how.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, bits, frame, ORANGE, RED, WOOD, PAPER } from '../props.js'

const ACC = '#7dffb0'
const MIC = ['.KKK.', 'KSSSK', 'KSSSK', 'KSSSK', '.KKK.', '..W..', '..W..', '..W..', '.WWW.']
const MIC_C = { K: INK, S: '#9aa5c4', W: BONE }
const MAG = ['.KKKK....', 'KSSSSK...', 'KSWSSK...', 'KSSSSK...', 'KSSSSK...', '.KKKKK...', '.....KK..', '......KK.', '.......KK']
const MAG_C = { K: '#2a2350', S: SKYB, W: '#ffffff' }
const PLANE = ['......WW.....', '......WWW....', 'W.....WWWW...', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWS', 'W.....WWWW...', '......WWW....', '......WW.....']
const PLANE_C = { W: '#ffffff', S: SKYB }
const FLASK = ['..KKK..', '..KGK..', '..KGK..', '.KGGGK.', 'KGGGGGK', 'KGGGGGK', '.KKKKK.']
const FLASK_C = { K: INK, G: '#7dffb0' }

const CAMEOS = [
  { sign: 'aries', cap: 'Took full credit. | *It was your plan.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'trophy', 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 650, 'MVP: ME', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 46, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'you’re welcome!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Celebrated with dinner. | *Three dinners.*', mood: lt => lt > 1.6 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      ;[[720, 1060], [880, 1060], [800, 900]].forEach(([cx, cy], i) => bits(x, 'bowl', cx, cy, 15 * pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2)))
      label(x, 800, 680, `DINNER ${1 + Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.4))}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Already pitching | *the sequel.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'okay but | PLAN 2?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      label(x, 800, 920, 'PLAN 2: LOADING...', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, 'PLAN 3: ALSO', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 30, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Framed the plan. | *Hung it at home.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      frame(x, 800, 850, pop01(t, P.t0 + 0.25, 0.35, 2), 220, 220, x2 => {
        x2.fillStyle = PAPER; x2.fillRect(-90, -90, 180, 180); x2.fillStyle = INK; x2.font = `800 26px ${INTER}`; x2.textAlign = 'center'; x2.fillText('THE PLAN', 0, -55)
        x2.fillStyle = '#9aa5c4'; for (let i = 0; i < 4; i++) x2.fillRect(-70, -25 + i * 26, i % 2 ? 110 : 140, 10)
      }, { col: GOLD, rot: -0.04 })
      label(x, 800, 1100, 'LIVING ROOM, CENTRE', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gave a speech. | *To the plan.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 720, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 830, 700, 'i’d like to | thank... me', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bl' })
      label(x, 850, 950, 'SPEECH: 12 MIN', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Suspicious. | *What went wrong?*', mood: 'squint', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MAG, MAG_C, 800 + 60 * Math.sin(t * 2), 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.1 })
      label(x, 800, 660, 'TOO SMOOTH.', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 42, bg: MINT, rot: -0.05 })
      label(x, 800, 1100, 'AUDIT: ROUND 4', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 30, bg: PAPER, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Thanked everyone. | *Twice.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'thank you!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      bubble(x, 810, 860, 'no, THANK | YOU!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 800, 1080, 'CARDS SENT: ALL', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 800, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Nodded calmly. | *Had a secret plan B.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      note(x, 800, 860, pop01(t, P.t0 + 0.6, 0.3, 2), 'if plan A fails: | (classified)', { head: 'PLAN B', headBg: LAV, size: 32, w: 320, rot: 0.04 })
      label(x, 800, 650, 'NOT SURPRISED', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Celebrated by | *booking a flight.*', mood: 'sparkle', look: [-1, -1], star: { x: 170 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) {
      const p = prog(lt, 0.4, 2.3)
      if (p > 0 && p < 1) drawBits(x, PLANE, PLANE_C, lerp(980, 120, p), 640 - 50 * p, 14, { rot: 0.08, sx: -1 })
    },
    front(x, t, lt, P) {
      label(x, 320, 880, 'GATE: CLOSING', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 1050, 'party’s in | another country!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Added it to the résumé. | *Same day.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      note(x, 320, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'skills: | planning | ' + (lt > 1.2 ? 'IT WORKED (new)' : '...'), { head: 'RÉSUMÉ v41', headBg: '#9aa5c4', size: 30, w: 320, rot: -0.04 })
      label(x, 320, 1100, 'UPDATED: 4 MIN AGO', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Bored already. | *Next experiment.*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FLASK, FLASK_C, 800, 900, 28 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.1 * Math.sin(t * 3) })
      label(x, 800, 660, 'PLAN: WORKED. YAWN.', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'EXPERIMENT #48', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears. | *For an hour.*', mood: 'sparkle', tears: 3, look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 700, 'IT WORKED!!', pop01(t, P.t0 + 0.3, 0.3, 2.4), { size: 52, bg: GOLD, rot: -0.05 })
      label(x, 800, 900, 'TISSUES: 0 LEFT', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 0.5, 8, 170, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2t0539', key: 'D', accent: ACC, ending: 'group',
  title: 'When plans work | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'It worked. | *Nobody knows how.*',
    moods: ['sparkle', 'sleepy', 'wink', 'heart', 'heart', 'squint', 'heart', 'wink', 'sparkle', 'happy', 'sleepy', 'wide'],
    draw(x, t, lt) { label(x, 540, 640, '✦ PLAN: SUCCESS ✦', pop01(t, t - lt + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
