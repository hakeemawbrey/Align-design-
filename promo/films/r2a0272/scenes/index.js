// r2a0272: star_advice, ADVICE SOLO (aquarius), "Aquarius, you can | *ask for help.*" (~50 s vertical, signs3kit social cut, music: lofi · F)
// The batch topic "Aquarius, you're allowed | to ask for help." tightened to fit two lines. Nine cards: a relatable truth
// about an independent Aquarius plus a warm reframe, one gag each. Ending: lesson.
//   you're everyone's help desk · "I'm fine" (not fine) · big ideas need a team · asking isn't a system error
//   · your friends want to show up · different isn't alone · carrying it all is heavy: share the jug
//   · let someone read your chart (it says: nap) · say it out loud, "can you help?" → "always."
//   group "Independent. | *Not alone.*"  LESSON "Asking for help | is *its own genius.*"  last "Text a friend? | *They’ll be glad.*"
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'aquarius', L = { x: -180 }
const TOOLBOX = [['...KKKKK...', '...K...K...', 'RRRRRRRRRRR', 'RRRRYYYRRRR', 'RRRRRRRRRRR', 'RRRRRRRRRRR', 'RRRRRRRRRRR'], { K: INK, R: RED, Y: GOLD }]
const BULB = [['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..SSSS..', '..SSSS..'], { Y: GOLD, W: '#fff', S: '#9aa5c4' }]
const JUG = [['..BBBB...', '.B....B..', '.BBBBBBBB', 'BWWWWWWB.B', 'BWWWWWWB.B', 'BWWWWWWBB.', 'BWWWWWWB..', '.BBBBBB...'].map(r => r.padEnd(10, '.')), { B: SKYB, W: '#5aa8ff' }]

// a pop-up "error" window
function popup(x, cx, cy, k, line1, line2) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -100, 350, 220)
  x.fillStyle = INK; x.fillRect(-182, -114, 364, 228)
  x.fillStyle = PAPER; x.fillRect(-176, -108, 352, 216)
  x.fillStyle = SKYB; x.fillRect(-176, -108, 352, 48)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('SYSTEM', -160, -84)
  x.fillStyle = RED; x.fillRect(138, -98, 28, 28)
  x.textAlign = 'center'; x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText(line1, 0, -10)
  x.font = `800 34px ${INTER}`; x.fillStyle = '#6b62a8'; x.fillText(line2, 0, 50)
  x.restore()
}
// a birth chart wheel with twelve spokes
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#241a52'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  x.rotate(t * 0.3)
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(Math.cos(a) * 40, Math.sin(a) * 40); x.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); x.stroke() }
  x.fillStyle = SKYB; x.fillRect(60, -16, 26, 26); x.fillStyle = PINK; x.fillRect(-90, 40, 22, 22); x.fillStyle = MINT; x.fillRect(-20, -100, 22, 22)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You’re everyone’s | *help desk.*', mood: 'happy', look: [1, 0], star: L, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, TOOLBOX[0], TOOLBOX[1], 790, 840, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 650, 'OPEN 24/7', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 44, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'and who | helps you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: '“I’m fine.” | *Are you, though?*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I’m fine!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, tail: 'bl' })
      bubble(x, 800, 900, '(three tabs of | problems open)', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl', col: LAV })
    } },
  { sign: S, cap: 'Big ideas | *need a team.*', mood: 'sparkle', look: [1, -1], star: L,
    front(x, t, lt, P) {
      drawBits(x, BULB[0], BULB[1], 790, 740, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) for (const [i, id] of ['gemini', 'libra', 'sagittarius'].entries()) signChar(x, t, id, 660 + i * 112, 990, 130 * k, { mood: 'happy', seed: 40 + i, glyph: false, glow: 0.5, hops: [P.t0 + 1.2 + i * 0.15] })
    } },
  { sign: S, cap: 'Asking isn’t | *a system error.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      popup(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 'NEEDS: A HUG' : 'ERROR 404', lt > 1.0 ? 'totally normal' : 'help not found')
    } },
  { sign: S, cap: 'Your friends | *want to show up.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.3))
      phone(x, 790, 820, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { top: `${n} NEW`, head: 'YOUR FRIENDS', msg: ['need anything?', 'I’m coming over', 'bringing soup', 'we got you ♡'][n - 1], bg: MINT })
    } },
  { sign: S, cap: 'Different | *isn’t alone.*', mood: 'heart', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 800, 860, 200 * k, { mood: 'heart', seed: 61, glyph: false, tears: 1, hops: [P.t0 + 1.2] })
      label(x, 800, 650, 'WEIRD CLUB', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1080, 'MEMBERS: 2+', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Carrying it all? | *Share the jug.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      drawBits(x, JUG[0], JUG[1], 800, 820, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.1 ? 0.3 : 0 })
      label(x, 800, 1060, 'SPLIT THE LOAD', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let someone | *read your chart.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      chart(x, t, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1050, 'IT SAYS: NAP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say it out loud: | *“Can you help?”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: L, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 690, 'can you | help?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
      bubble(x, 800, 920, 'always.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 54, tail: 'br' })
      hearts(x, t, 470, 780, P.t0 + 1.2, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0272', key: 'F', accent: SKYB, solo: S, ending: 'lesson',
  title: 'Aquarius, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Independent. | *Not alone.*', mood: 'heart' },
  lesson: { text: 'Asking for help | is *its own genius.*', chip: 'SUPPORT: UNLOCKED' },
  last: { text: 'Text a friend? | *They’ll be glad.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
