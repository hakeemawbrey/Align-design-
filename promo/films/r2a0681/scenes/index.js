// r2a0681: star_advice, ADVICE SOLO (leo), "How to cheer up | *a Leo.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine warm, slightly silly ways to lift a Leo, each with one light gag.
// Ending: lesson.
//   the hype megaphone · snacks + one big compliment · invite them out (top hat appears) · remind them of a win
//   · big smile, sad eyes · the photo, every side · "you matter to me" · let them recharge · the glow comes back
//   group "Big heart. | *Bigger comeback.*"   lesson "A Leo glows | when *someone notices.*"   last "Cheer for them. | They *cheer louder.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', S = 'leo', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Hype them up. | *Loudly.* It helps.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 820, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1 })
      bubble(x, 800, 690, 'you’re AMAZING', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'br' })
      sparkles(x, t, 380, 840, P.t0 + 1.4, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Bring snacks. | And *a compliment.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SNACK', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'SIDE: 1 COMPLIMENT', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 800, 650, 'nice mane.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Invite them out. | *They’ll dress up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.9, 1.3))
      if (lt > 0.85) bits(x, 'TOPHAT', F.x, lerp(560, F.top - 30, d), 14, { rot: -0.12 })
      L(x, 800, 760, 'DINNER AT 8?', pop01(t, P.t0 + 0.25, 0.3, 2), MINT, 0.04, 40)
      L(x, 800, 1080, 'DRESS CODE: STAR', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Remind them of a win. | *They forget too.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      sparkles(x, t, 800, 860, P.t0 + 0.7, 7, 150, 0.1)
      bubble(x, 800, 1110, 'remember THIS?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Big smile, quiet eyes? | *Look a little closer.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 800, 650, 'i’m FINE', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      swapLabel(x, 800, 1110, lt, 1.2, 'ROAR: LOUD', 'HEART: TENDER', { size: 34, fromBg: GOLD, toBg: PINK })
    } },
  { sign: S, cap: 'Take the photo. | *All sides are good.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'CAMERA', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fl = t - (P.t0 + 1.1 * 1.29); if (fl > 0 && fl < 0.3) { x.save(); x.globalAlpha = 0.5 * (1 - fl / 0.3); x.fillStyle = '#fffbe8'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 800, 1090, 'ANGLES: ALL GOOD', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Say it plainly: | *“you matter to me.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOU', headCol: ACC, typing: lt > 0.4 && lt < 1.0 ? 1 : 0, lines: [['you matter', BONE, pop01(t, P.t0 + 1.0 * 1.29, 0.25, 2)], ['to me.', BONE, pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2)]], size: 30 })
      hearts(x, t, 800, 640, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Let them rest. | *Even the sun sets.*', mood: lt => lt > 0.9 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), f = clamp((lt - 0.4) / 1.6)
      if (k > 0.01) { bits(x, 'BATT', 800, 860, 22 * k); x.fillStyle = f > 0.6 ? MINT : GOLD; x.fillRect(800 - 6.5 * 22 + 22, 860 - 2.5 * 22 + 22, Math.round(10 * f) * 22, 3 * 22) }
      L(x, 800, 1080, 'ROAR: RECHARGING', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'The glow comes back. | *Stay for sunrise.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    back(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 0.2, 1.4))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 600); x.clip()
      bits(x, 'SUN', 800, lerp(1120, 820, r), 22)
      x.restore()
      x.fillStyle = '#2a2350'; x.fillRect(110, 1060, 860, 20)
    },
    front(x, t, lt, P) {
      L(x, 800, 1140, 'GOOD MORNING, LEO', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
      sparkles(x, t, 800, 820, P.t0 + 1.5, 7, 190, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0681', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to cheer up | *a Leo.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger comeback.*', mood: 'sparkle' },
  lesson: { text: 'A Leo glows | when *someone notices.*', chip: 'STATUS: SHINING' },
  last: {
    text: 'Cheer for them. | They *cheer louder.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
