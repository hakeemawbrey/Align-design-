// v3a066: ADVICE SOLO, "Capricorn, read this | before your next date." (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way (makeFilm solo mode, 9 cards): warm date advice for a Capricorn, one gag each. Ending: callback.
//   0.0–3.6    "Capricorn, read this | *before your next date.*"
//   3.6–37.8   leave the laptop home (NOT INVITED) · a date, not an interview (question 14 of 30, torn up)
//              · order the dessert (BUDGET: FINE) · laugh at the bad joke (Sagittarius's pun) · the five-year plan
//              stays in the drawer · phone face down (12 emails, ignored) · say what you feel ("I like you", NOT ON THE AGENDA)
//              · wear the fun shirt, not the suit · let them pay next time
//  37.8        "Off the clock. | *On the date.*"
//  41.2        callback: "The laptop | *stayed home.*"  the laptop, asleep, with a little zzz.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, bits, tableTop, fitTitleScenes, ORANGE, RED, TEAL, CREAM, GREY, BROWN, WOOD, clamp, prog, ease, lerp } from './props.js'

const S = 'capricorn'
// a drawer that slides shut over a binder
function drawer(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -40, 340, 220); x.fillStyle = WOOD; x.fillRect(-162, -32, 324, 204)
  const dy = lerp(-150, 0, shut)
  x.fillStyle = '#2f6fd0'; x.fillRect(-90, -120 + dy * 0.6, 180, 150); x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('5-YEAR', 0, -76 + dy * 0.6); x.fillText('PLAN', 0, -44 + dy * 0.6)
  x.fillStyle = INK; x.fillRect(-170, 20, 340, 120); x.fillStyle = '#b07a2a'; x.fillRect(-162, 28, 324, 104)
  x.fillStyle = INK; x.fillRect(-40, 70, 80, 18)
  x.restore()
}
// little zzz letters drifting up
function zzz(x, t, cx, cy, a = 1) {
  x.save(); x.fillStyle = BONE; x.font = `800 40px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = a * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 5) * 10, cy - ph * 120) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Leave | *the laptop home.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      stamp(x, 790, 880, pop01(t, P.t0 + 1.0, 0.3, 2.6), 'NOT INVITED', { col: RED, size: 40, rot: -0.15 })
      bubble(x, 430, 600, 'but what if | someone emails?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 30, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'It’s a date. | *Not an interview.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), rip = ease.outCubic(prog(lt, 1.1, 1.5))
      if (rip < 1) note(x, 790 - rip * 30, 840, k, { w: 300, h: 300, title: 'QUESTION 14 / 30', titleBg: GREY, lines: ['“where do you', 'see yourself', 'in 5 years?”'], size: 30, rot: 0.04 - rip * 0.3 })
      if (rip > 0) { x.save(); x.globalAlpha = 1 - prog(lt, 1.6, 2.2); for (let i = 0; i < 8; i++) { x.fillStyle = CREAM; x.save(); x.translate(760 + (i % 4) * 30 + rip * (i - 4) * 20, 900 + rip * 140 + Math.floor(i / 4) * 30); x.rotate(i); x.fillRect(-18, -12, 36, 24); x.restore() } x.restore() }
      bubble(x, 790, 640, 'so… hi!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Order the dessert. | *Live a little.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      tableTop(x, 790, 1000, k, { w: 300 })
      bits(x, 'CAKE', 790, 930, 13 * pop01(t, P.t0 + 0.7, 0.35, 2))
      label(x, 790, 700, 'BUDGET: IT’S FINE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 140, 0.3)
    } },
  { sign: S, cap: 'Laugh at | *the bad joke.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 990, 190 * k, { mood: lt > 1.3 ? 'sparkle' : 'wink', look: [-1, 0], seed: 24, glyph: false })
      bubble(x, 800, 720, 'what do stars | eat? SPACE-ghetti', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, tail: 'br' })
      label(x, 450, 620, 'LOL (GENUINE)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The five-year plan | *can wait.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawer(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 1.4)))
      label(x, 790, 1130, 'SEE YOU MONDAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Phone down. | *Eyes up.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: lt => lt > 1.3 ? [1, 0] : [1, 1], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), buzz = lt < 1.4 ? Math.sin(t * 50) * 6 : 0
      if (k > 0.01) { x.save(); x.translate(790 + buzz, 1000); x.scale(k, k); x.fillStyle = INK; x.fillRect(-120, -30, 240, 60); x.fillStyle = NAVY2; x.fillRect(-112, -22, 224, 44); x.restore() }
      label(x, 790, 920, 'WORK: 12 EMAILS', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      const g = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (g > 0.01) signChar(x, t, 'cancer', 800, 760, 150 * g, { mood: 'heart', look: [-1, 0], seed: 25, glyph: false })
    } },
  { sign: S, cap: 'Say what | *you feel.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 760, 720, 'I like you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 52, col: PINK, tail: 'bl' })
      note(x, 800, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 150, title: 'AGENDA', titleBg: GREY, lines: ['1. dinner', '2. walk'], size: 30, rot: 0.05 })
      stamp(x, 800, 980, pop01(t, P.t0 + 1.3, 0.3, 2.6), 'NOT ON IT. GOOD.', { col: TEAL, size: 28, rot: -0.12 })
    } },
  { sign: S, cap: 'Wear the fun shirt. | *Not the suit.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = GREY; x.lineWidth = 6; x.beginPath(); x.moveTo(800, 640); x.lineTo(800, 680); x.moveTo(720, 720); x.lineTo(800, 680); x.lineTo(880, 720); x.stroke(); x.restore() }
      bits(x, 'SHIRT', 800, 820, 22 * k, { rot: 0.05 * Math.sin(t * 3) })
      label(x, 800, 1020, 'DRESS CODE: JOY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Let them | *pay next time.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 840, 990, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 26, glyph: false })
      note(x, lerp(600, 720, ease.outCubic(prog(lt, 0.9, 1.3))), 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 180, h: 220, title: 'BILL', titleBg: GREY, lines: ['date #2', '———'], size: 28, rot: -0.08 })
      bubble(x, 840, 650, 'my turn!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 600, 1110, 'ALSO MEANS: DATE #3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
]
const NAVY2 = '#2a2350'

const F = makeFilm({
  id: 'v3a066', key: 'D', accent: TEAL, solo: S, ending: 'callback',
  title: 'Capricorn, read this | *before your next date.*',
  cameos: CAMEOS,
  group: { cap: 'Off the clock. | *On the date.*', mood: 'heart' },
  last: {
    text: 'The laptop | *stayed home.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      bits(x, 'LAPTOP', 540, 960, 22 * k)
      if (k > 0.9) zzz(x, t, 640, 830)
      label(x, 540, 1160, 'STATUS: ASLEEP', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 1250, t - lt + 1.0, { n: 6, life: 2.0, spread: 600, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)   // the hook is long: shrink it to fit two lines
export const CUES = F.CUES
export const T = F.T
