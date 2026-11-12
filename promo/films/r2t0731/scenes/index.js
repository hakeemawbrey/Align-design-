// r2t0731: star_talk, ROLLCALL, "The signs having | *breakfast in bed.*" (signs3kit social cut, lofi · C). Ending: callback.
//   ♈ ate it before the tray landed · ♉ breakfast, then second breakfast (tray 4) · ♊ started a podcast mid-toast
//   · ♋ made a tray for the houseplant · ♌ hired a photographer (take 14) · ♍ bed rules, no crumbs, in writing
//   · ♎ still picking a jam at lunchtime · ♏ knew the menu from the hallway · ♐ took the bed camping
//   · ♑ answered forty emails between bites · ♒ built a robot to butter toast · ♓ got breakfast, sobbed into it
//   group "Nobody left | the *bed.*"  →  callback: "The plant | *loved it.*" (Cancer's houseplant tray comes back)
import { makeFilm, sparkles, hearts, bubble, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffc65a', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Ate it before | the tray *landed.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: ST, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      const drop = ease.outCubic(clamp((lt - 0.2) / 0.9))
      bits(x, 'TRAY', 800, lerp(620, 1040, drop), 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (lt < 0.6) bits(x, 'TOAST', 800, lerp(620, 1040, drop) - 70, 14)
      L(x, 800, 720, 'TRAY: JUST LANDING', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 880, 'BREAKFAST: GONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'taurus', cap: 'Breakfast, then | *second breakfast.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.45))
      for (let i = 0; i < n; i++) bits(x, 'STACK', 800, 1050 - i * 86, 16 * (i === n - 1 ? pop01(t, P.t0 + 0.3 + i * 0.58, 0.25, 2.2) : 1))
      swapLabel(x, 800, 650, lt, 1.5, 'TRAY 1', 'TRAY 4 (OF 6)', { size: 34, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: 'gemini', cap: 'Started a podcast. | *Mid-toast.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MIC', 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 820, 700, '● ON AIR', pop01(t, P.t0 + 0.5, 0.3, 2.2), RED, 0.05, 36)
      bubble(x, 830, 1120, 'episode 1: toast', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made a tray | for the *houseplant.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TRAY', 800, 1080, 14 * k)
      bits(x, 'POT', 800, 960, 20 * k)
      bubble(x, 800, 700, 'eat up, sweetie', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Breakfast in bed. | Hired a *photographer.*', mood: 'sparkle', star: ST, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      for (const f of [0.8, 1.3, 1.8]) { const d = lt - f; if (d > 0 && d < 0.15) { x.fillStyle = `rgba(255,250,235,${(0.5 * (1 - d / 0.15)).toFixed(3)})`; x.fillRect(110, 480, 860, 740) } }
    },
    front(x, t, lt, P) {
      bits(x, 'CAMERA', 810, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 810, 700, `TAKE ${Math.min(14, 11 + Math.floor(Math.max(0, lt - 0.8) / 0.5))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), '#ffb34a', 0.05, 38)
      bubble(x, 810, 1100, 'again, but chewing', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Banned crumbs. | *In writing.*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 360, head: 'BED RULES', headBg: '#2fc79a', lines: ['1. no crumbs', '2. see rule 1', '3. napkin ON', 'sign here: ___'], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1130, 'COPY FOR YOU', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Picked a jam. | By *lunchtime.*', mood: lt => lt > 1.7 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sel = Math.floor(lt * 2.5) % 3
      ;[680, 800, 920].forEach((jx, i) => bits(x, 'JAR', jx, 980 - (i === sel ? 30 : 0), 16 * k))
      swapLabel(x, 800, 720, lt, 1.4, '8:00 A.M.', '12:30 P.M.', { size: 38, fromBg: CREAM, toBg: PINK })
    } },
  { sign: 'scorpio', cap: 'Knew the menu. | From *the hallway.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'pancakes. | blueberry. | extra syrup.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 800, 1010, 'TRAY: STILL COVERED', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Breakfast in bed? | Took the bed *camping.*', mood: 'sparkle', star: { x: 160 }, hops: [0.6, 1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      bits(x, 'MOUNT', 320, 860, 30 * k)
      bits(x, 'TENT', 300, 1080, 18 * k)
    },
    front(x, t, lt, P) {
      L(x, 320, 640, 'ROOM SERVICE: 3,000 M UP', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.05, 28)
    } },
  { sign: 'capricorn', cap: 'Ate breakfast. | Answered *forty emails.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 320, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.max(0, 40 - Math.floor(Math.max(0, lt - 0.4) * 25))
      L(x, 320, 700, `INBOX: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), n ? STEEL : MINT, -0.04, 38)
      L(x, 320, 1120, 'TOAST: COLD', pop01(t, P.t0 + 1.7, 0.3, 2.2), CREAM, 0.05, 30)
    } },
  { sign: 'aquarius', cap: 'Built a robot | to *butter toast.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'ROBOT', 800, 930 + Math.sin(t * 8) * 6, 18 * k)
      bits(x, 'TOAST', 800, 1110, 12 * k, { rot: Math.sin(t * 6) * 0.1 })
      bubble(x, 800, 690, 'BEEP. BUTTERED.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
      confetti(x, t, 800, 1060, P.t0 + 1.6, { n: 14, spread: 180, cols: ['#ffe76a', BONE] })
    } },
  { sign: 'pisces', cap: 'Got breakfast in bed. | *Sobbed* into it.', mood: lt => lt < 0.8 ? 'heart' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TRAY', 800, 1060, 16 * k)
      bits(x, 'CEREAL', 800, 1000, 16 * k)
      L(x, 800, 720, 'NOBODY’S EVER…', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.05, 34)
      L(x, 800, 860, 'CEREAL: NOW SALTY', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, 0.05, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0731', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs having | *breakfast in bed.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody left | the *bed.*' },
  last: {
    text: 'The plant | *loved it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.5, 0.4, 2)
      bits(x, 'TRAY', 540, 1250, 26 * k)
      bits(x, 'POT', 540, 1010, 34 * k)
      bubble(x, 540, 740, 'thank you ♡', pop01(t, t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
      hearts(x, t, 540, 1000, t0 + 1.3, { n: 8, life: 2, spread: 380, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
