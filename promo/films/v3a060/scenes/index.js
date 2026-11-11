// v3a060: ADVICE ROLL CALL, "What each sign | is learning." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific lesson each, one light gag per card. Ending: lesson.
//   0.0–3.6    "What each sign | *is learning.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ rest days count (TRAINING: SOFA) · ♉ a new way home can be pretty (signpost, flowers)
//              · ♊ finishing one thing (DONE: 1/1) · ♋ feelings aren't a burden (Taurus lifts the FEELINGS box)
//              · ♌ quiet wins count (a trophy for watering a plant) · ♍ good enough is good (the crooked frame stays)
//              · ♎ your pick matters (POLL: CANCELLED) · ♏ letting people in (seven locks, one opens)
//              · ♐ answers can be close (binoculars, the key at their feet) · ♑ asking for help (Taurus takes half the boxes)
//              · ♒ not everything needs a theory (sad? = tired) · ♓ cry, then hydrate (a glass of water)
//  49.2        "Twelve signs. | *Still in class.*"
//  52.4        LESSON UNLOCKED: "Nobody’s finished. | That’s *the fun part.*"  GROWTH: ONGOING
//  58.3        "Pisces is | *still hydrating.*"
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, checklist, board, bits, frame, tableTop, confetti, door, ORANGE, RED, WOOD, BROWN, TEAL, CREAM, GREEN, clamp, prog, ease, lerp } from './props.js'

// a wooden signpost with two arrows
function signpost(x, cx, cy, k, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 330); x.fillStyle = WOOD; x.fillRect(-8, -146, 16, 322)
  const arrow = (y, w, dir, col, text) => {
    x.save(); x.translate(0, y)
    x.fillStyle = INK; x.beginPath(); x.moveTo(-dir * 20, -40); x.lineTo(dir * w, -40); x.lineTo(dir * (w + 40), 0); x.lineTo(dir * w, 40); x.lineTo(-dir * 20, 40); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(-dir * 14, -32); x.lineTo(dir * (w - 2), -32); x.lineTo(dir * (w + 30), 0); x.lineTo(dir * (w - 2), 32); x.lineTo(-dir * 14, 32); x.fill()
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, dir * w / 2, 2)
    x.restore()
  }
  arrow(-110, 210, 1, MINT, 'NEW WAY')
  arrow(-10, 200, -1, '#d9c8a8', 'OLD WAY')
  x.restore()
}
// a tall wobbling stack of boxes
function boxStack(x, t, cx, base, k, n, lean) {
  for (let i = 0; i < n; i++) bits(x, 'BOX', cx + Math.sin(t * 4 + i) * lean * i, base - i * 64, 10 * k)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Rest days | *count as training.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'SOFA', 790, 930, 18 * k)
      label(x, 790, 700, 'TODAY’S WORKOUT:', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 780, 'THE SOFA', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'A new way | can be *pretty too.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      signpost(x, 760, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 4; i++) bits(x, 'FLOWER', 700 + i * 70, 1090 - (i % 2) * 14, 12 * pop01(t, P.t0 + 1.2 + i * 0.12, 0.3, 2.4))
      sparkles(x, t, 860, 780, P.t0 + 1.3, 6, 120, 0.3)
    } },
  { sign: 'gemini', cap: 'You can finish | *one thing.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      checklist(x, 790, 820, k, ['start a band', 'learn French', 'read 1 book', 'build a boat'], 0, { title: 'PROJECTS', w: 380 })
      stamp(x, 790, 820, pop01(t, P.t0 + 1.3, 0.3, 2.6), 'READ 1 BOOK ✓', { col: TEAL, size: 36, rot: -0.12 })
      sparkles(x, t, 790, 820, P.t0 + 1.4, 7, 200, 0.5)
    } },
  { sign: 'cancer', cap: 'Your feelings | aren’t *a burden.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const lift = ease.outCubic(prog(lt, 1.0, 1.5)) * 90
      if (k > 0.01) signChar(x, t, 'taurus', 800, 1010, 200 * k, { mood: lt > 1.4 ? 'happy' : 'neutral', look: [-1, -1], seed: 15, glyph: false })
      note(x, 800, 830 - lift, k, { w: 260, h: 150, bg: '#d9a86a', lines: ['FEELINGS'], size: 40, rot: -0.03 })
      bubble(x, 800, 600 - lift, 'light as air!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
      hearts(x, t, 560, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Quiet wins | *count too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'PLANT', 900, 1050, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'TROPHY', 740, 900, 20 * pop01(t, P.t0 + 0.7, 0.35, 2), { rot: -0.05 })
      label(x, 760, 680, 'WATERED THE PLANT', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04 })
      sparkles(x, t, 740, 880, P.t0 + 1.1, 7, 160, 0.2)
    } },
  { sign: 'virgo', cap: 'Good enough | *is good.*', mood: lt => lt < 0.9 ? 'squint' : lt < 1.6 ? 'neutral' : 'happy', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      const tilt = 0.22 + 0.03 * Math.sin(t * 2)
      frame(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), x => { x.fillStyle = '#ffe7a8'; x.fillRect(-116, 20, 232, 80); x.fillStyle = ORANGE; x.beginPath(); x.arc(40, -10, 40, 0, Math.PI * 2); x.fill() }, { rot: tilt })
      bubble(x, 420, 600, 'it’s… fine.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      label(x, 790, 1040, 'LEAVING IT. ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Your pick | *matters most.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: lt => lt < 1.2 ? [Math.floor(lt * 4) % 2 ? 1 : -1, 0] : [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), pick = ease.outCubic(prog(lt, 1.1, 1.4))
      bits(x, 'CONE', 700, 900 - pick * 0, 18 * k, { alpha: 1 - 0.5 * pick })
      bits(x, 'CONE2', 880, 900 - pick * 60, 18 * k * (1 + 0.2 * pick))
      bubble(x, 790, 640, 'this one.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1100, 'GROUP POLL: CANCELLED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Letting people in | *is brave.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const open = Math.floor(clamp((lt - 0.8) / 0.5) * 1.99)
      door(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 1.6, 2.1) * 0.25, { locks: 6, open, col: '#7a3fb0' })
      label(x, 790, 1110, `LOCKS: 6 → ${6 - open}`, pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 420, 600, 'baby steps.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Some answers | are *right here.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: lt => lt > 1.4 ? [0, 1] : [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BINOC', 560, 820, 16 * k * (lt > 1.4 ? 0 : 1), { rot: -0.1 })
      bits(x, 'GLOBE', 820, 780, 16 * k)
      label(x, 820, 1000, 'SEARCHED: EVERYWHERE', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      bits(x, 'KEY', F.x + 30, 1150, 12 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      bubble(x, F.x + 120, 1080, 'oh.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, F.x + 30, 1150, P.t0 + 1.5, 6, 90, 0.4)
    } },
  { sign: 'capricorn', cap: 'Asking for help | *isn’t failing.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), split = ease.outCubic(prog(lt, 1.1, 1.5))
      boxStack(x, t, 600, 1080, k, 6 - Math.round(split * 3), lerp(4, 0, split))
      const k2 = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k2 > 0.01) signChar(x, t, 'taurus', 840, 1000, 180 * k2, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.5] })
      if (split > 0.01) boxStack(x, t, 840, 870, split, 3, 0)
      bubble(x, 840, 610, 'I’ve got these.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Not everything | needs *a theory.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      board(x, 790, 760, k, lt < 1.3 ? ['WHY AM I SAD?', ['∑(moon × ∆mood)²', '#6b62a8'], ['÷ planets = ?', '#6b62a8']] : ['WHY AM I SAD?', ['= tired.', RED], ['go to bed.', TEAL]], { size: 32 })
      label(x, 790, 1120, 'THEORY: SLEEP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cry it out. | Then *drink water.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt > 1.5 ? 1 : 3, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 850, 1010, 180 * k, { mood: 'happy', look: [-1, 0], seed: 11, glyph: false })
      bits(x, 'GLASS', 720, 900, 14 * pop01(t, P.t0 + 1.1, 0.3, 2.2), { rot: -0.1 })
      label(x, 790, 680, 'HYDRATION BREAK', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04 })
      hearts(x, t, 720, 820, P.t0 + 1.6, { n: 4, life: 1.5, spread: 120, cell: 6, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3a060', key: 'C', accent: GOLD, ending: 'lesson',
  title: 'What each sign | *is learning.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Still in class.*' },
  lesson: { text: 'Nobody’s finished. | That’s *the fun part.*', chip: 'GROWTH: ONGOING' },
  last: {
    text: 'Pisces is | *still hydrating.*',
    draw(x, t, lt) {
      bits(x, 'GLASS', 540, 730, 22 * pop01(t, t - lt + 0.6, 0.35, 2.2), { rot: -0.1 + 0.05 * Math.sin(t * 2) })
      label(x, 540, 900, 'GLASS #4', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1200, t - lt + 0.5, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
