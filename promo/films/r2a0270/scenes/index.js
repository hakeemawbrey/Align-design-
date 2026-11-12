// r2a0270: star_advice, ADVICE ROLLCALL, "Work-life reminders | for each sign." (topic: "Each sign's work-life reminder") (~62 s vertical, signs3kit social cut,
// music: lofi · G). Twelve warm, specific reminders, each with one light visual gag.
//   0.0–3.6    "Work-life reminders | *for each sign.*"
//   3.6–49.2   ♈ not every email is an emergency (the siren switches off) · ♉ lunch is not optional (a bento box)
//              · ♊ close some tabs, brain included · ♋ care and still clock out (the time card) · ♌ your worth isn't
//              your job title (a sign profile) · ♍ done beats perfect · ♎ your chart says take Friday off
//              · ♏ leave work at work (the box stays on the doorstep) · ♐ use your vacation days
//              · ♑ log off, the ladder will wait · ♒ that weird idea? pitch it · ♓ feel it, then log off (happy-sad tears)
//  49.2        "Twelve signs. | *One long weekend.*"
//  52.4        LESSON UNLOCKED: "Work is what you do. | *Not who you are.*"  BALANCE: RESTORED
//  58.3        "Now close | *the laptop.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, laptop, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }
const tag = (x, cx, cy, k, s, bg, rot = -0.04, size = 32) => label(x, cx, cy, s, k, { size, bg, rot, font: MONO, weight: 700 })

const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..gggg..', '..GGGG..']
const BULB_C = { Y: '#ffd23a', W: '#fff8d0', G: '#9aa5c4', g: '#6b62a8' }
const CASE = ['...KKKK...', '..K....K..', 'KKKKKKKKKK', 'KOOOOOOOOK', 'KOOOGGOOOK', 'KOOOOOOOOK', 'KOOOOOOOOK', 'KKKKKKKKKK']
const CASE_C = { K: INK, O: ORANGE, G: GOLD }

const CAMEOS = [
  { sign: 'aries', cap: 'Not every email | *is an emergency.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), off = lt > 1.1
      card(x, 790, 900, 320, 200, k, { bg: CREAM, rot: 0.03 }, () => { txt(x, 'RE: quick q', 0, -40, { size: 34 }); txt(x, '“no rush!”', 0, 30, { size: 30, weight: 700, color: GREEN }) })
      if (k > 0.01) { x.save(); x.translate(790, 700); x.scale(k, k); x.fillStyle = INK; x.fillRect(-50, -10, 100, 70); x.fillStyle = off ? GREY : (Math.floor(t * 6) % 2 ? RED : '#ff8a7a'); x.beginPath(); x.arc(0, 0, 44, Math.PI, 0); x.fill(); x.fillRect(-44, 0, 88, 50); x.restore() }
      tag(x, 790, 1100, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'URGENT?: NOPE', MINT, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Lunch is | *not optional.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 320, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#c2304a', rot: -0.03 }, () => {
        x.fillStyle = INK; x.fillRect(-150, -100, 300, 200); x.fillRect(-150, -100, 300, 200)
        const C = [['#fff4e2', -75, -50], ['#5fd068', 75, -50], ['#ffb34a', -75, 50], ['#ff8fb1', 75, 50]]
        C.forEach(([c, cx, cy]) => { x.fillStyle = c; x.fillRect(cx - 66, cy - 42, 132, 84) })
      })
      tag(x, 790, 680, pop01(t, P.t0 + 0.9, 0.3, 2.2), '12:00 – 1:00: SACRED', GOLD, -0.04, 30)
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'AT THE DESK: NO', BONE, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Close some tabs. | *Brain included.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(1, 9 - Math.floor(clamp(prog(lt, 0.6, 1.6)) * 8))
      laptop(x, 780, 940, 1.15 * pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const w = 240 / n
        for (let i = 0; i < n; i++) { x.fillStyle = [PINK, SKYB, MINT, GOLD, LAV][i % 5]; x.fillRect(-120 + i * w, -70, w - 3, 26) }
        txt(x, n > 1 ? `${n} tabs` : '1 tab ✓', 0, 16, { size: 34, color: BONE, font: MONO, weight: 700 })
      })
      tag(x, 790, 640, pop01(t, P.t0 + 1.6, 0.3, 2.2), 'BRAIN: 1 TAB OPEN', MINT, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Care deeply. | *Still clock out.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TIME CARD', 0, -130, { size: 28, font: MONO, weight: 700 })
        txt(x, 'IN   9:00', -110, -50, { size: 30, font: MONO, weight: 700, align: 'left' })
        const p = pop01(t, P.t0 + 1.0, 0.25, 2.8)
        if (p > 0.01) { x.save(); x.translate(0, 30); x.scale(p, p); x.fillStyle = RED; txt(x, 'OUT  5:00', 0, 0, { size: 34, font: MONO, weight: 700, color: RED }); x.restore() }
      })
      hearts(x, t, 380, 1000, P.t0 + 1.4, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 3 })
      tag(x, 790, 1100, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'TEAM: WILL SURVIVE', PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Your worth isn’t | *your job title.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = ORANGE; x.fillRect(-160, -180, 320, 70); txt(x, '♌︎ LEO · PROFILE', 0, -145, { size: 26, font: MONO, weight: 700 })
        txt(x, 'title:', -130, -60, { size: 28, weight: 700, color: BROWN, align: 'left' })
        txt(x, 'Jr. Associate', -130, -14, { size: 30, align: 'left' })
        if (lt > 1.0) { x.fillStyle = RED; x.fillRect(-134, -16, 250, 5) }
        txt(x, 'also:', -130, 50, { size: 28, weight: 700, color: BROWN, align: 'left' })
        if (lt > 1.1) txt(x, 'a whole sun', -130, 96, { size: 34, color: RED, align: 'left' })
      })
      sparkles(x, t, 790, 860, P.t0 + 1.5, 7, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'Done beats | *perfect.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), ch = ease.outCubic(prog(lt, 0.9, 1.2))
      if (k > 0.01) { x.save(); x.translate(790, 850); x.scale(k, k); x.fillStyle = INK; x.fillRect(-110, -110, 220, 220); x.fillStyle = CREAM; x.fillRect(-98, -98, 196, 196)
        if (ch > 0) { x.strokeStyle = GREEN; x.lineWidth = 30; x.lineCap = 'square'; x.beginPath(); x.moveTo(-60, 0); x.lineTo(-60 + 50 * Math.min(1, ch * 2), 50 * Math.min(1, ch * 2)); if (ch > 0.5) x.lineTo(-10 + 110 * (ch - 0.5) * 2, 50 - 130 * (ch - 0.5) * 2); x.stroke() }
        x.restore() }
      tag(x, 790, 680, pop01(t, P.t0 + 0.4, 0.3, 2.2), 'DRAFT 14 → SEND', BONE, -0.04, 32)
      tag(x, 790, 1060, pop01(t, P.t0 + 1.4, 0.3, 2.2), 'GOOD ENOUGH: SENT', MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Your chart says: | *take Friday off.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 790, 120, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      tag(x, 790, 990, pop01(t, P.t0 + 0.9, 0.3, 2.2), 'VENUS: WANTS A NAP', PINK, -0.04, 30)
      tag(x, 790, 1090, pop01(t, P.t0 + 1.5, 0.3, 2.4), 'FRIDAY: YOURS', GOLD, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Leave work | *at work.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), shut = ease.inOutCubic(prog(lt, 0.9, 1.4))
      if (k > 0.01) { x.save(); x.translate(820, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -220, 240, 420); x.fillStyle = '#fff1b0'; x.fillRect(-110, -210, 220, 400)
        x.fillStyle = WOOD; x.fillRect(-110, -210, 220 * (0.2 + 0.8 * shut), 400)
        x.restore() }
      card(x, 640, 1080, 140, 100, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: '#c98f5a', rot: -0.05 }, () => txt(x, 'WORK', 0, 2, { size: 28, font: MONO, weight: 700 }))
      tag(x, 820, 640, pop01(t, P.t0 + 1.5, 0.3, 2.2), 'IT STAYS OUTSIDE', LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Use your | *vacation days.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      sun(x, t, 300, 700, 60, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, CASE, CASE_C, 340, 960, 22 * pop01(t, P.t0 + 0.5, 0.35, 2))
      tag(x, 320, 1110, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'DAYS UNUSED: TOO MANY', GOLD, 0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Log off at six. | *The ladder will wait.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(800, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-90, -260, 30, 460); x.fillRect(60, -260, 30, 460); x.fillStyle = WOOD; x.fillRect(-84, -254, 18, 448); x.fillRect(66, -254, 18, 448)
        for (let i = 0; i < 7; i++) { x.fillStyle = INK; x.fillRect(-66, -230 + i * 66, 132, 22); x.fillStyle = WOOD; x.fillRect(-66, -226 + i * 66, 132, 14) }
        x.restore() }
      tag(x, 800, 1120, pop01(t, P.t0 + 1.3, 0.3, 2.2), 'STILL HERE TOMORROW', MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'That weird idea? | *Pitch it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const on = lt > 0.9
      drawBits(x, BULB, on ? BULB_C : { ...BULB_C, Y: '#6b62a8', W: '#9aa5c4' }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (on) sparkles(x, t, 790, 800, P.t0 + 0.9 * 1.29, 8, 180, 0.2)
      bubble(x, 790, 1060, 'hear me out…', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Feel it all. | *Then log off.*', mood: lt => lt < 0.9 ? 'happy' : 'sleepy', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const off = lt > 1.1
      laptop(x, 780, 940, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), () => { if (off) { txt(x, 'goodnight', 0, 0, { size: 32, color: LAV, font: MONO, weight: 700 }); return } txt(x, 'nice work ♡', 0, 0, { size: 32, color: PINK }) })
      tag(x, 790, 660, pop01(t, P.t0 + 0.6, 0.3, 2.2), 'BOSS SAID THANKS', PINK, -0.04, 32)
      if (off) hearts(x, t, 790, 800, P.t0 + 1.1 * 1.29, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0270', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Work-life reminders | *for each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One long weekend.*' },
  lesson: { text: 'Work is what you do. | *Not who you are.*', chip: 'BALANCE: RESTORED' },
  last: { text: 'Now close | *the laptop.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
