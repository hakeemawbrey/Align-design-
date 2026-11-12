// v3a068: ADVICE SOLO, "Dear Aquarius: | it's okay." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way (makeFilm solo mode, 9 cards): gentle permission for an Aquarius, one gag each. Ending: card.
//   0.0–3.6    "Dear Aquarius: | *it’s okay.*"
//   3.6–37.8   being different (a row of grey blocks, one starry one) · needing space (a space helmet: BACK IN 10 MIN)
//              · feelings take time to load (73%) · not replying for a bit (phone in a drawer) · your weird ideas
//              (a lightbulb sprouting) · saying "I care" out loud (NEW SKILL UNLOCKED) · the world can wait one Saturday
//              (the globe: BACK MONDAY) · liking the popular thing (queueing for it) · letting someone in (Libra knocks)
//  37.8        "Strange. | *And so loved.*"
//  41.0        LESSON UNLOCKED: "You don’t have to fit in | to *belong.*"  ORBIT: STEADY
//  46.9        "Libra knocked. | *Aquarius opened.*" over the match card: Aquarius + Libra (the door, paid off).
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, bar, bits, door, fitTitleScenes, ORANGE, RED, TEAL, CREAM, GREY, BROWN, WOOD, NAVY, clamp, prog, ease, lerp } from './props.js'

const S = 'aquarius', BLUE = '#6fc3ff'
// a glass space helmet over the star
function helmet(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy); x.scale(k, k)
  const r = F.S * 0.62
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.strokeStyle = '#d8dbe8'; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.stroke()
  x.fillStyle = 'rgba(191,230,255,0.18)'; x.beginPath(); x.arc(0, 0, r - 4, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(-r * 0.6, -r * 0.6, 22, 60)
  x.restore()
}
// a desk drawer, phone going in
function deskDrawer(x, cx, cy, k, shut) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -20, 360, 200); x.fillStyle = WOOD; x.fillRect(-172, -12, 344, 184)
  const dy = lerp(-170, 10, shut)
  x.fillStyle = INK; x.fillRect(-46, dy - 60, 92, 150); x.fillStyle = NAVY; x.fillRect(-38, dy - 52, 76, 134); x.fillStyle = PINK; x.fillRect(-28, dy - 30, 56, 30)
  x.fillStyle = INK; x.fillRect(-180, 40, 360, 140); x.fillStyle = '#b07a2a'; x.fillRect(-172, 48, 344, 124); x.fillStyle = INK; x.fillRect(-44, 96, 88, 18)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Being different | *is okay.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), bx = 640 + i * 70
        if (k <= 0.01) continue
        x.save(); x.translate(bx, 980); x.scale(k, k); x.fillStyle = INK; x.fillRect(-28, -100, 56, 104)
        x.fillStyle = i === 3 ? BLUE : GREY; x.fillRect(-22, -94, 44, 92); x.restore()
        if (i === 3) sparkles(x, t, bx, 920, P.t0 + 1.0, 6, 70, 0.2)
      }
      label(x, 780, 740, 'ONE OF A KIND', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Needing space | *is okay.*', mood: 'sleepy', star: { x: -150 },
    front(x, t, lt, P, F) {
      helmet(x, F, pop01(t, P.t0 + 0.4, 0.35, 2))
      note(x, 800, 1020, pop01(t, P.t0 + 1.0, 0.3, 2), { w: 280, h: 120, bg: CREAM, lines: ['BACK IN', '10 MIN ✦'], size: 34, rot: 0.05 })
    } },
  { sign: S, cap: 'Feelings take time | *to load.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 780, 740, 'FEELINGS.EXE', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
      bar(x, 780, 860, pop01(t, P.t0 + 0.3, 0.3, 2), lerp(0.08, lt > 1.7 ? 1 : 0.73, ease.outCubic(prog(lt, 0.4, 1.6))), { w: 340, label: '', col: PINK })
      label(x, 780, 1000, 'NO RUSH ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Going quiet for a bit | *is okay.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      deskDrawer(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.7, 1.3)))
      label(x, 790, 660, 'DO NOT DISTURB (KINDLY)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your weird ideas | *are okay.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BULB', 780, 820, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bits(x, 'SPROUT', 780, 680, 14 * pop01(t, P.t0 + 1.0, 0.35, 2.2))
      label(x, 780, 1040, 'IDEA #84: A HAT FOR SNAILS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 24, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 800, P.t0 + 1.0, 7, 160, 0.4)
    } },
  { sign: S, cap: 'Saying “I care” | *out loud is okay.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'scorpio', 830, 990, 180 * k, { mood: lt > 1.3 ? 'heart' : 'wide', look: [-1, 0], seed: 32, glyph: false })
      bubble(x, 560, 640, 'i… care. | about you.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, col: PINK, tail: 'bc' })
      label(x, 830, 760, 'NEW SKILL UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The world can wait | *one Saturday.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'GLOBE', 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      note(x, 840, 780, pop01(t, P.t0 + 1.0, 0.3, 2.4), { w: 210, h: 110, bg: GOLD, lines: ['BACK', 'MONDAY'], size: 30, rot: 0.12 })
      label(x, 790, 1110, 'SAVING IT: PAUSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Liking the popular thing | *is okay.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 800, 660, 'POPULAR THING →', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: PINK, rot: -0.03, font: MONO, weight: 700 })
      const ids = ['leo', 'gemini', 'libra', 'taurus']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2); if (k > 0.01) signChar(x, t, id, 920 - i * 90, 990, 120 * k, { mood: 'happy', look: [1, 0], seed: 40 + i, glyph: false }) })
      label(x, 760, 1140, 'AQUARIUS: IN LINE (SHH)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Letting someone in | *is okay.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const open = ease.inOutCubic(prog(lt, 1.2, 1.7))
      door(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, open, { col: BLUE })
      if (open > 0.3) signChar(x, t, 'libra', 800, 890, 150 * clamp((open - 0.3) / 0.4), { mood: 'sparkle', look: [-1, 0], seed: 44, glyph: false })
      bubble(x, 790, 600, 'knock knock!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'v3a068', key: 'F', accent: BLUE, solo: S, ending: 'card',
  title: 'Dear Aquarius: | *it’s okay.*',
  cameos: CAMEOS,
  card: { a: 'aquarius', b: 'libra', chip: 'ALIGNED' },
  group: { cap: 'Strange. | *And so loved.*', mood: 'heart' },
  lesson: { text: 'You don’t have to fit in | to *belong.*', chip: 'ORBIT: STEADY' },
  last: {
    text: 'Libra knocked. | *Aquarius opened.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
