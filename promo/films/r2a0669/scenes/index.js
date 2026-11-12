// r2a0669: star_advice, ADVICE SOLO (virgo), "Virgo, you can’t | *edit people.*" (signs3kit social cut, music: lofi · E).
// One sign (solo, 9 cards): warm reminders for a Virgo to let people be people, one gag each. Ending: group.
//   you can't fix them with a schedule · their messy desk is their happy place · suggest once, then let it go (the
//   advice balloon floats off) · love them un-alphabetized · not everyone wants a five-step plan · their way works too,
//   just scenic · friend, not project manager · give your own inner critic a break · the right match loves you unedited
//   group "Edit less. | *Love more.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, swapLabel, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', S = 'virgo', ST = { x: -190 }
const BALLOON = ['.RRRRR.', 'RRRRRRR', 'RWRRRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..', '...R...']
const SPINES = ['#6f8cff', RED, '#5fd068', GOLD, '#c97bff', '#ff9a4a']

const CAMEOS = [
  { sign: S, cap: 'You can’t fix them | *with a schedule.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, rot: 0.04, head: 'SAM’S NEW LIFE', headBg: STEEL, headInk: INK, lines: ['6:00 wake up', '6:05 hydrate', '6:10 be fixed'], size: 32, align: 'left' })
      L(x, 800, 860, 'RETURNED ♡', pop01(t, P.t0 + 1.2, 0.3, 2.6), PINK, -0.14, 48)
    } },
  { sign: S, cap: 'Their messy desk | is *their happy place.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) bits(x, 'PAPERS', 760 + (i - 1) * 60, 1020 - i * 50, 14 * k, { rot: (i - 1) * 0.3 })
      friend(x, t, 'sagittarius', 800, 860, 180, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'sparkle', look: [-1, 0] })
      L(x, 790, 650, 'VIBES: IMMACULATE', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Suggest once. | *Then let it go.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const up = ease.inOutCubic(prog(lt, 0.9, 2.4))
      const by = lerp(900, 700, up), bx = 790 + 20 * Math.sin(t * 2)
      x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(bx, by + 70); x.lineTo(bx - 10 + 10 * Math.sin(t * 3), by + 190); x.stroke(); x.restore()
      drawBits(x, BALLOON, { R: PINK, W: '#ffffff' }, bx, by, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, bx, by, 'ADVICE', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, 0.04, 26)
      L(x, 790, 1100, 'BYE, ADVICE', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Love them | *un-alphabetized.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.fillStyle = INK; x.fillRect(620, 990, 340, 20); x.fillStyle = '#8a4a2e'; x.fillRect(624, 992, 332, 14); x.restore()
      SPINES.forEach((c, i) => { x.save(); x.translate(650 + i * 54, 990); x.rotate([0, 0.2, -0.1, 0.35, 0, -0.25][i]); x.scale(k, k); x.fillStyle = INK; x.fillRect(-22, -[150, 110, 170, 130, 90, 160][i] - 4, 44, [150, 110, 170, 130, 90, 160][i] + 4); x.fillStyle = c; x.fillRect(-18, -[150, 110, 170, 130, 90, 160][i], 36, [150, 110, 170, 130, 90, 160][i]); x.restore() })
      L(x, 790, 1090, 'SHELF: CHAOS ♡', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: S, cap: 'Not everyone wants | *a five-step plan.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.2 ? 0.75 : 1), { w: 320, h: 300, rot: -0.04, head: '5-STEP PLAN', headBg: MINT, headInk: INK, lines: ['1. breathe', '2. journal', '3. …'], size: 32, align: 'left' })
      bubble(x, 790, 1060, 'I just wanted | a hug.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'br', col: LAV })
      if (lt > 1.5) hearts(x, t, 620, 820, P.t0 + 1.5 * 3.1 / 2.4, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Their way works too. | *Just scenic.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.lineWidth = 10; x.lineCap = 'round'
        x.strokeStyle = STEEL; x.beginPath(); x.moveTo(660, 1000); x.lineTo(880, 700); x.stroke()
        x.strokeStyle = MINT; x.setLineDash([2, 22]); x.lineWidth = 14; x.beginPath(); x.moveTo(660, 1000)
        const n = Math.floor(clamp((lt - 0.3) / 1.4) * 40)
        for (let i = 0; i <= n; i++) { const u = i / 40; x.lineTo(lerp(660, 880, u) + Math.sin(u * 14) * 60, lerp(1000, 700, u)) }
        x.stroke(); x.restore()
        drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, 880, 690, 12 * k)
      }
      L(x, 790, 1100, 'SAME DESTINATION', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Friend, | *not project manager.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLIP', 790, 790, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      swapLabel(x, 780, 1020, lt, 1.0, 'ROLE: MANAGER', 'ROLE: FRIEND ♡', { size: 34, fromBg: STEEL, toBg: PINK })
    } },
  { sign: S, cap: 'Give your inner critic | *a day off too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'could be better…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt > 1.1 ? 0 : 1), { size: 38, tail: 'bl', col: STEEL })
      bubble(x, 790, 680, 'you did great.', pop01(t, P.t0 + 1.1 * 3.1 / 2.4, 0.25, 2.2), { size: 40, tail: 'bl', col: MINT })
      L(x, 790, 960, 'CRITIC: ON BREAK', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'The right match | loves you *unedited.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: MINT, lines: [['your label maker?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['adorable.', BONE, pop01(t, P.t0 + 1.0, 0.25, 2)], ['it’s mine ♡', PINK, pop01(t, P.t0 + 1.6, 0.25, 2), true]], size: 20 })
    } },
]

const F = makeFilm({
  id: 'r2a0669', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Virgo, you can’t | *edit people.*',
  cameos: CAMEOS,
  group: { cap: 'Edit less. | *Love more.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
