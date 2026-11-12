// r2t0759: star_talk, BELIKE, "New notebook, page one? | Zodiacs *be like.*" (topic: zodiacs on the first page of a new
// notebook; signs3kit social cut, lofi · D). Twelve signs in zodiac order, each one's most extreme first page.
// Ending: lesson.
//   ♈ pressed so hard it went through ten pages · ♉ page one: a snack list · ♊ page one of five notebooks
//   · ♋ pressed a flower in it · ♌ autograph practice · ♍ one typo, new notebook · ♎ which pen? page still blank
//   · ♏ page one says "nothing to see here" · ♐ drew a world map, lost the notebook · ♑ a five-year plan
//   (year 3: find a match) · ♒ started on the back page · ♓ too pretty to write in (sobbing)
//   lesson "Messy pages count. | *Just start.*"  last "Virgo is on | *notebook nine.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, fitTitleScenes, B, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe76a', ST = { x: -170 }
const page = (x, cx, cy, k, o = {}) => sheet(x, cx, cy, k, { w: 300, h: 360, rot: 0.04, bg: CREAM, size: 30, align: 'left', ...o })
const nb = (x, cx, cy, cell, col, rot = 0) => drawBits(x, B.NOTEBOOK, { ...C.NOTEBOOK, C: col }, cx, cy, cell, { rot })

const CAMEOS = [
  { sign: 'aries', cap: 'Pressed so hard. | *Through ten pages.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.6, 0.9],
    front(x, t, lt, P) {
      const n = Math.min(10, Math.floor(clamp((lt - 0.4) / 1.2) * 10))
      page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { lines: ['DAY ONE', 'LET’S GO!!!'], size: 40, weight: 800 })
      for (let i = 0; i < n; i++) { x.save(); x.fillStyle = i % 2 ? RED : INK; x.fillRect(680 + (i * 37) % 160, 900 + i * 14, 70, 7); x.restore() }
      L(x, 800, 1110, `PAGES DAMAGED: ${n}`, pop01(t, P.t0 + 1.2, 0.3, 2.2), RED, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Page one: | *a snack list.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'GOALS', headBg: GOLD, headInk: INK, lines: ['1. cheese', '2. more cheese', '3. bread', '4. nap'], progress: prog(lt, 0.4, 1.4) })
      L(x, 800, 1110, 'PRIORITIES: CLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Page one. | Of *five notebooks.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COL = ['#6fc3ff', '#ff8fb1', '#7dffb0', GOLD, LAV]
      COL.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2); if (k > 0.01) nb(x, 690 + (i % 3) * 110, 800 + Math.floor(i / 3) * 190, 12 * k, c, (i - 2) * 0.08) })
      L(x, 800, 1120, 'PAGE TWOS: 0', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Page one: | *pressed a flower.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { lines: ['', '', '', '', '', '', 'from our walk ♥'], size: 26 })
      bits(x, 'FLOWER', 785, 820, 12 * pop01(t, P.t0 + 0.7, 0.3, 2), { rot: -0.5, sy: 0.85 })
      L(x, 800, 1110, 'MEMORY: SAVED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'leo', cap: 'Page one: | *autograph practice.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      page(x, 785, 860, k, {})
      if (k > 0.9) { x.save(); x.translate(800, 860); x.rotate(0.04); x.fillStyle = '#c98f2a'; x.font = "italic 700 44px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; const n = Math.min(5, Math.floor(clamp((lt - 0.3) / 1.2) * 5) + 1); for (let i = 0; i < n; i++) x.fillText('Leo ✦', (i % 2 ? 40 : -30), -120 + i * 62); x.restore() }
      L(x, 800, 1110, 'FOR THE FANS', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'One typo. | *New notebook.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      if (lt < 1.3) page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { lines: ['Monady'], size: 40 })
      else nb(x, 800, 860, 22 * pop01(t, P.t0 + 1.7, 0.35, 2), MINT)
      if (lt > 0.8 && lt < 1.3) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(770, 750, 110, 40, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 800, 1110, lt > 1.3 ? 'NOTEBOOK #2' : 'UNACCEPTABLE', 1, lt > 1.3 ? MINT : RED, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Which pen? | *Page still blank.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      page(x, 820, 900, pop01(t, P.t0 + 0.2, 0.3, 2), {})
      const COL = [PINK, SKYB, MINT, GOLD, LAV], a = Math.floor(lt * 3) % 5
      COL.forEach((c, i) => drawBits(x, B.PEN, { K: INK, Y: c, R: BONE }, 820, 760 + i * 60 - (i === a ? 14 : 0), 10 * pop01(t, P.t0 + 0.4 + i * 0.1, 0.3, 2), { rot: -0.05 }))
      L(x, 800, 1120, 'PENS TESTED: 31', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Page one says | *“nothing to see here.”*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { lines: ['nothing to', 'see here.', '', 'turn back.'], size: 34 })
      bits(x, 'LOCK', 900, 1000, 12 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      L(x, 760, 1120, 'PAGE TWO: CLASSIFIED', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#c97bff', -0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Drew a world map. | *Lost the notebook.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const gone = lt > 1.3
      if (!gone) bits(x, 'MAP', 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 })
      else { x.save(); x.globalAlpha = 0.5; x.strokeStyle = BONE; x.setLineDash([16, 12]); x.lineWidth = 6; x.strokeRect(670, 780, 260, 160); x.restore() }
      L(x, 800, 1090, gone ? 'LAST SEEN: SOMEWHERE' : 'NEXT: EVERYWHERE', 1, gone ? STEEL : GOLD, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Page one: | *a five-year plan.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      page(x, 785, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE PLAN', headBg: '#7dd18a', headInk: INK, lines: ['Y1 promotion', 'Y2 house', 'Y3 find match', 'Y4 compatible', 'Y5 vacation'], size: 26, font: MONO, weight: 700, progress: prog(lt, 0.4, 1.5) })
      L(x, 800, 1120, 'VACATION: 1 DAY', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Started | *on the back page.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      nb(x, 800, 860, 22 * k, SKYB, 0.05)
      if (k > 0.9) { x.save(); x.translate(800, 860); x.rotate(Math.PI + 0.05); x.fillStyle = INK; x.font = `800 30px Inter, sans-serif`; x.textAlign = 'center'; x.fillText('THE END', 0, 10); x.restore() }
      L(x, 800, 1110, 'RULES: OPTIONAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Too pretty | to *write in.*', mood: 'wide', look: [1, 0], tears: lt => lt > 0.8 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      nb(x, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#c9b8ff', 0.04)
      sparkles(x, t, 800, 860, P.t0 + 0.6, 7, 200, 0.3)
      L(x, 800, 1110, 'PAGES USED: 0 (FOREVER)', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2t0759', key: 'D', accent: ACC, ending: 'lesson',
  title: 'New notebook, page one? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Page two? | *Never heard of it.*', moods: ['wide', 'heart', 'wink', 'heart', 'wink', 'squint', 'neutral', 'squint', 'sparkle', 'neutral', 'sparkle', 'wide'] },
  lesson: { text: 'Messy pages count. | *Just start.*', chip: 'PAGE ONE: DONE' },
  last: {
    text: 'Virgo is on | *notebook nine.*',
    draw(x, t, lt) {
      const t0 = t - lt
      for (let i = 0; i < 9; i++) { const k = pop01(t, t0 + 0.5 + i * 0.1, 0.25, 2); if (k > 0.01) drawBits(x, ['KKKKKKKKKKKKKKKKKK', 'KCCCCCCCCCCCCCCCCK', 'KKKKKKKKKKKKKKKKKK'], { K: INK, C: [MINT, SKYB, PINK, GOLD, LAV][i % 5] }, 540 + (i % 2 ? 10 : -10), 1700 - i * 38, 14 * k) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
