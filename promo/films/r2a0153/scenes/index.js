// r2a0153: star_advice ADVICE SOLO, "How to apologise | to a Sagittarius." (~43 s vertical, signs3kit social cut, music: lofi · C).
// Ending: 'group'.
//   0.0–3.6    "How to apologise | *to a Sagittarius.*"
//   3.6–37.8   nine warm how-tos: be honest, they can take it · keep it short, they've got plans (the forty-page apology, trimmed)
//              · give them room, they come back lighter · make them laugh (a rubber chicken) · invite them somewhere new
//              · own it, no "but" · they forgive fast, don't make them wait · snacks for the road, peace treaty
//              · then let it go, they already did (the fight floats off as a balloon)
//  37.8        "Forgiven. | *Already packing.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const S = 'sagittarius', ST = { x: -170 }, ACC = '#ff9a4a'
const CHICKEN = ['....RR.......', '...YYYY......', '..YYKYYO.....', '..YYYYYOO....', '...YYYY......', '...YYYYY.....', '..YYYYYYYYY..', '.YYYYYYYYYYY.', '.YYYYYYYYYYY.', '..YYYYYYYYY..', '....O...O....', '....O...O....', '...OO..OO....']
const CHICKEN_C = { R: RED, Y: '#ffe66b', K: INK, O: ORANGE }
const BAG = ['..KKKKK..', '.KCCCCCK.', 'KCCCCCCCK', 'KCOCCOCCK', 'KCCCCCCCK', 'KCCOCCOCK', 'KCCCCCCCK', '.KKKKKKK.']
const BAG_C = { K: INK, C: ORANGE, O: GOLD }
const BALLOON = ['..RRRRR..', '.RRRRRRR.', 'RRWRRRRRR', 'RRRRRRRRR', 'RRRRRRRRR', '.RRRRRRR.', '..RRRRR..', '....R....']

/** a ticket stub */
function ticket(x, cx, cy, k, rot, text) {
  card(x, cx, cy, 300, 130, k, { bg: GOLD, rot }, () => {
    x.fillStyle = INK; for (let i = 0; i < 5; i++) x.fillRect(80, -55 + i * 24, 6, 12)
    txt(x, 'ADMIT 1', -40, -25, { size: 26, font: MONO, weight: 700 })
    txt(x, text, -40, 25, { size: 30, font: MONO, weight: 700, color: RED })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Be honest. | *They can take it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'i messed up.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: CREAM, tail: 'bl' })
      label(x, 790, 960, 'HONESTY: RESPECTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Keep it short. | *They’ve got plans.*', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const unroll = ease.outCubic(prog(lt, 0.2, 0.9)), cut = lt > 1.3
      const h = cut ? 170 : 60 + 520 * unroll
      card(x, 790, 620 + h / 2, cut ? 340 : 280, h, 1, { bg: CREAM, rot: 0 }, () => {
        if (!cut) { x.fillStyle = GREY; for (let y = -h / 2 + 30; y < h / 2 - 20; y += 26) x.fillRect(-110, y, 220 - ((y * 7) % 60), 8) }
        else txt(x, 'sorry. ♥', 0, 0, { size: 64, color: RED })
      })
      label(x, 790, 590, cut ? 'SHORT VERSION' : 'PAGE 1 OF 40', 1, { size: 32, bg: cut ? MINT : GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Give them room. | *They come back lighter.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      card(x, 790, 860, 240, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: WOOD, rot: 0 }, () => {
        const o = ease.inOutCubic(prog(lt, 0.5, 1.0))
        x.fillStyle = SKYB; x.fillRect(-110, -190, 220, 380)
        x.fillStyle = GREEN; x.fillRect(-110, 100, 220, 90)
        x.fillStyle = '#6e3a24'; x.fillRect(-110, -190, 220 * (1 - 0.8 * o), 380)
      })
      label(x, 790, 1120, 'BACK IN 20', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Make them laugh. | *Forgiveness follows.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.3, 1.6],
    front(x, t, lt, P) {
      drawBits(x, CHICKEN, CHICKEN_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: Math.sin(t * 8) * 0.12 })
      bubble(x, 790, 640, 'SQUAWK.', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 50, col: CREAM, tail: 'bl' })
      if (lt > 1.2) sparkles(x, t, 370, 860, P.t0 + 1.2 * 1.29, 7, 160, 0.3)
    } },
  { sign: S, cap: 'Invite them somewhere new. | *Sorry travels well.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ticket(x, 790, 780, pop01(t, P.t0 + 0.3, 0.35, 2), -0.08, 'SORRY TOUR')
      ticket(x, 800, 950, pop01(t, P.t0 + 0.6, 0.35, 2), 0.06, 'SEAT 2: YOU')
      if (lt > 1.2) hearts(x, t, 790, 1100, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Own it. | *No “but” needed.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'sorry, BUT—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, col: CREAM, tail: 'bl' })
      const c = ease.outCubic(prog(lt, 0.9, 1.2))
      if (c > 0) { x.fillStyle = RED; x.save(); x.translate(790, 760); x.rotate(-0.12); x.fillRect(-200, -7, 400 * c, 14); x.restore() }
      label(x, 790, 980, 'JUST SORRY', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), { size: 42, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They forgive fast. | *Don’t make them wait.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const s = Math.max(0, 3 - Math.floor(Math.max(0, lt - 0.3) / 0.3))
      card(x, 790, 820, 320, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'GRUDGE', 0, -70, { size: 34, font: MONO, weight: 700 })
        txt(x, s > 0 ? `00:0${s}` : 'EXPIRED', 0, 30, { size: s > 0 ? 70 : 54, font: MONO, weight: 700, color: s > 0 ? RED : '#2fa36b' })
      })
      if (s === 0) sparkles(x, t, 790, 840, P.t0 + 1.2 * 1.29, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Bring snacks for the road. | *Instant peace treaty.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const kb = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, BAG, BAG_C, 790, 900, 26 * kb)
      label(x, 790, 900, 'SNACKS', kb, { size: 36, bg: CREAM, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 1120, 'PEACE TREATY: SIGNED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Then let it go. | *They already did.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const f = ease.inQuad(prog(lt, 0.7, 2.4))
      const bx = 790 + Math.sin(t * 2) * 20, by = lerp(900, 600, f)
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(bx, by + 70); x.quadraticCurveTo(bx - 20, by + 160, bx + 10, by + 240); x.stroke() }
      drawBits(x, BALLOON, { R: RED, W: '#fff' }, bx, by, 18 * k)
      label(x, bx, by + 10, 'THE FIGHT', k, { size: 24, bg: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 760, 1110, 'bye!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0153', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'How to apologise | *to a Sagittarius.*',
  cameos: CAMEOS,
  group: { cap: 'Forgiven. | *Already packing.*', mood: 'sparkle' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
