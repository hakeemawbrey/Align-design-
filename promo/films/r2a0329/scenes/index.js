// r2a0329: star_advice, ADVICE ROLL CALL, "How each sign | handles big feels." (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. Ending: group.
//   ♈ loud feelings (breathe, then speak) · ♉ snack first, talk later (both valid) · ♊ talk it out with everyone
//   · ♋ feel everything at once (a big heart) · ♌ smiling through it (the show can pause) · ♍ feelings in lists (messy is
//   allowed) · ♎ smoothing it over (now serving: you) · ♏ deep and quiet (let one person in) · ♐ running from heavy
//   moments (stay, you're safe) · ♑ a cry scheduled for Friday (today is fine) · ♒ feelings as data (feel them too)
//   · ♓ cries at everything (love leaking)
//  49.2   GROUP ending: "Big feelings. | *Bigger hearts.*"  a shower of hearts over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, HEART,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', w = 300, h = 240, size = 30, strike = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    const y = (i - (lines.length - 1) / 2) * size * 1.35
    x.fillText(l, 0, y)
    const s = strike[i] || 0
    if (s > 0) { const tw = x.measureText(l).width; x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(-tw / 2, y + 4); x.lineTo(-tw / 2 + tw * s, y - 2); x.stroke(); x.restore() }
  })
  x.restore()
}
const COOKIE = ['..BBBBB..', '.BBKBBBB.', 'BBBBBBKBB', 'BKBBBBBBB', 'BBBBKBBBB', 'BBBBBBBKB', '.BBKBBBB.', '..BBBBB..']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']
const SLIP = ['......PPPP', '....PPPPPP', 'PPPPPPPWPP', 'PPPPPPPPPP', 'SSSSSSSSSS']
const MASK = ['.GGGGGGGGG.', 'GGGGGGGGGGG', 'GG.GGGGG.GG', 'GGGGGGGGGGG', 'GGG.....GGG', '.GGG...GGG.', '..GGGGGGG..']

const CAMEOS = [
  { sign: 'aries', cap: 'Feelings come out loud? | *Breathe, then speak.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -170 }, hops: [0.3],
    front(x, t, lt, P, F) {
      if (lt < 1.2) { x.save(); x.fillStyle = 'rgba(239,230,214,0.7)'; for (let i = 0; i < 3; i++) { const ph = ((t * 1.5 + i / 3) % 1); x.globalAlpha = 0.8 * (1 - ph); x.beginPath(); x.arc(F.x - 60 + i * 60, F.top - 30 - ph * 100, 24 + ph * 20, 0, Math.PI * 2); x.fill() } x.restore() }
      const n = Math.min(10, 1 + Math.floor(lt * 4.5))
      L(x, 800, 800, `IN… ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), SKYB, 0.04, 48)
      L(x, 800, 1000, 'NOW: SAY IT KINDLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Snack first, talk later? | *Both are valid.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, COOKIE, { B: '#e8a24a', K: BROWN }, 800, 800, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      bubble(x, 800, 1020, 'ok. now i’m ready.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Talk it out with everyone? | *That’s processing.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      const W = [['so basically…', 650], ['AND THEN', 760], ['…you get it?', 870], ['anyway!!', 990]]
      W.forEach(([w, y], i) => bubble(x, 760 + (i % 2) * 70, y, w, pop01(t, P.t0 + 0.2 + i * 0.3, 0.25, 2.2), { size: 32, col: i % 2 ? GOLD : BONE, tail: 'bl' }))
      L(x, 800, 1130, 'FRIENDS CALLED: 6', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Feel everything at once? | That’s *a big heart.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 2)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 800, 860, 34 * k * (1 + 0.05 * Math.sin(t * 7)))
      L(x, 800, 1100, 'SIZE: EXTRA LARGE', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Smiling through the hurt? | *The show can pause.*', mood: lt => lt > 1.1 ? 'sleepy' : 'happy', star: { x: -170 },
    front(x, t, lt, P, F) {
      const p = ease.inOutCubic(clamp((lt - 0.6) / 0.5))
      drawBits(x, MASK, { G: GOLD }, lerp(F.x, 800, p), lerp(F.cy - 10, 760, p), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: p * 0.3, alpha: 1 - 0.2 * p })
      L(x, 800, 960, 'SHOW: PAUSED', pop01(t, P.t0 + 1.2, 0.3, 2.4), ORANGE, -0.04, 38)
      L(x, 800, 1090, 'STILL A STAR', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Sorting feelings into lists? | *Messy is allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      note(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['1. sad (ok)', '2. mad (fine)', '3. ??? (???)'], { bg: CREAM, w: 340, h: 250, size: 30 })
      if (lt > 0.9) { x.save(); x.strokeStyle = PINK; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); for (let i = 0; i < 14; i++) x.lineTo(680 + i * 18, 900 + Math.sin(i * 1.7 + t * 4) * 26); x.stroke(); x.restore() }
      L(x, 800, 1100, 'SCRIBBLES: WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), '#a8d86a', 0.04, 30)
    } },
  { sign: 'libra', cap: 'Smoothing it over fast? | *Your feelings get a turn.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#140c30'; x.fillRect(-160, -110, 320, 220)
        x.fillStyle = PINK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NOW SERVING', 0, -70)
        x.fillStyle = lt > 1.0 ? MINT : BONE; x.font = `700 ${lt > 1.0 ? 66 : 80}px ${MONO}`; x.fillText(lt > 1.0 ? 'YOU ♡' : '#' + (41 + Math.floor(lt * 6)), 0, 20)
        x.restore()
      }
      L(x, 800, 1080, 'TAKE YOUR TIME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Feel it deep and quiet? | *Let one person in.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, KEY, { Y: GOLD }, 800, 740, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 + 0.05 * Math.sin(t * 3) })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 820, 960, 150 * k, { mood: 'heart', look: [-1, 0], seed: 82, tears: 1, glyph: false })
      L(x, 800, 1140, 'GUEST LIST: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Running from heavy moments? | *Stay a while. You’re safe.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.3, 0.6],
    front(x, t, lt, P, F) {
      drawBits(x, SLIP, { P: PINK, W: '#ffd1e0', S: CREAM }, 760, 1110, 12 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      drawBits(x, SLIP, { P: PINK, W: '#ffd1e0', S: CREAM }, 880, 1110, 12 * pop01(t, P.t0 + 1.1, 0.3, 2.4))
      L(x, 800, 760, lt < 1.0 ? 'RUNNING SHOES: ON' : 'SLIPPERS: ON', 1 * pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.0 ? ORANGE : MINT, 0.04, 32)
      bubble(x, 800, 920, 'i’ll stay.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Scheduled a cry for Friday? | *Today is fine too.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      note(x, 300, 820, pop01(t, P.t0 + 0.2, 0.3, 2), ['TO DO:', 'cry — FRI 6PM', 'cry — now (ok)'], { w: 360, h: 240, size: 30, strike: [0, clamp((lt - 0.9) / 0.3), 0] })
      L(x, 300, 1100, 'FEELINGS: NO DEADLINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), TEAL, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Analysing feelings like data? | *Feel them too.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = CREAM; x.fillRect(-160, -140, 320, 280)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.fillText('FEELINGS.CSV', 0, -110)
        const C = [SKYB, PINK, GOLD, LAV]
        for (let i = 0; i < 4; i++) { const h = (60 + i * 25) * ease.outCubic(clamp((lt - 0.3 - i * 0.15) / 0.3)); x.fillStyle = C[i]; x.fillRect(-130 + i * 70, 110 - h, 50, h) }
        x.restore()
      }
      hearts(x, t, 560, 780, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 10 })
      L(x, 800, 1100, 'RESULT: YOU’RE HUMAN', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cry at everything? | That’s *love, leaking.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hearts(x, t, 560, 900, P.t0 + 0.3, { n: 7, life: 2, spread: 220, cell: 8, seed: 11 })
      L(x, 800, 780, 'CRIED AT: A SPOON', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.04, 32)
      L(x, 800, 960, 'STILL ADORABLE', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0329', key: 'E', accent: '#ff8fb1', ending: 'group',
  title: 'How each sign | *handles big feels.*',
  cameos: CAMEOS,
  group: {
    cap: 'Big feelings. | *Bigger hearts.*',
    moods: ['happy', 'heart', 'sparkle', 'heart', 'happy', 'happy', 'heart', 'happy', 'happy', 'happy', 'heart', 'heart'],
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.3, { n: 12, life: 2.4, spread: 820, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
