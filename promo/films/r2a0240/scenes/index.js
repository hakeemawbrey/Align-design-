// r2a0240: star_advice, ADVICE ROLLCALL, "Each sign | being brave." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, each with the small, specific brave thing that's hardest for them, warmly cheered on.
//   0.0–3.6    "Each sign | *being brave.*"
//   3.6–49.2   ♈ waiting their turn · ♉ trying a new place · ♊ saying how they feel, no joke · ♋ leaving the shell for the
//              party · ♌ asking for help, crown off · ♍ posting it before it's perfect · ♎ picking the place in a minute
//              · ♏ letting someone in · ♐ staying home a whole weekend · ♑ phone in a drawer · ♒ "I need you", out loud
//              · ♓ saying no, then a little cry
//  49.2        "Twelve kinds | *of brave.*"
//  52.4        LESSON UNLOCKED: "Brave isn’t loud. | *It’s showing up.*"  COURAGE: +1
//  58.3        "Libra picked. | *In 59 seconds.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, handset, clock, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }
const LBL = { font: MONO, weight: 700 }
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const DOOR = ['KKKKKKKK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWYK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK']
const CASE = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BWWBBBBWWB', 'BBBBBBBBBB', 'BBBBBBBBBB', '.K......K.']

const CAMEOS = [
  { sign: 'aries', cap: 'Brave for Aries? | *Waiting their turn.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: ST, squash: lt => 0.04 * Math.sin(lt * 25),
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, ['taurus', 'libra', 'cancer'][i], 640 + i * 120, 960, 120 * k, { mood: 'happy', look: [1, 0], seed: 70 + i, glyph: false }) }
      label(x, 790, 760, 'YOU’RE NEXT (SOON)', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
      bubble(x, 790, 1120, 'so proud of me', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Trying a new place. | *Not the usual.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 260, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'MENU', 0, -120, { size: 30, font: MONO, weight: 700, color: RED })
        ;['the usual', 'something new'].forEach((s, i) => { txt(x, s, 0, -40 + i * 70, { size: 28 }); if (i === 1 && lt > 0.9) { x.strokeStyle = GREEN; x.lineWidth = 6; x.beginPath(); x.ellipse(0, -40 + 70, 120, 30, 0, 0, Math.PI * 2 * prog(lt, 0.9, 1.2)); x.stroke() } })
      })
      label(x, 790, 1110, 'VERDICT: DELICIOUS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: 'gemini', cap: 'Saying how they feel. | *No joke attached.*', mood: lt => lt > 1.2 ? 'neutral' : 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, lt < 1.0 ? 'haha so anyway—' : 'I’m actually hurt.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: lt < 1.0 ? BONE : LAV, tail: 'bl' })
      bubble(x, 800, 920, 'thank you for | telling me', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Leaving the shell. | *Going to the party.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: BROWN, Y: SUN }, 820, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 620, 'you came!!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 44, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Asking for help. | *Crown off, just for a sec.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const m = ease.inOutCubic(prog(lt, 0.5, 1.0))
      drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, lerp(F.x, 760, m), lerp(F.top - 30, 1080, m), 14, { rot: m * 0.2 })
      bubble(x, 790, 720, 'could you | help me?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 920, 'OF COURSE.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, ...LBL })
    } },
  { sign: 'virgo', cap: 'Posting it | *before it’s perfect.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = LAV; x.fillRect(-90, -140, 180, 140); txt(x, 'draft v1', 0, -70, { size: 26, font: MONO, weight: 700 })
        x.fillStyle = lt > 1.1 ? GREEN : PINK; x.fillRect(-80, 40, 160, 60); txt(x, lt > 1.1 ? 'POSTED ✓' : 'POST', 0, 70, { size: 26, font: MONO, weight: 700 })
      })
      label(x, 790, 1110, 'GOOD ENOUGH = GOOD', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: 'libra', cap: 'Picking the place. | *In under a minute.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: lt => lt > 1.4 ? [0, 0] : [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const s = Math.floor(clamp(lt / 1.4) * 59)
      clock(x, 790, 780, 110, pop01(t, P.t0 + 0.2, 0.35, 2), 0, s)
      label(x, 790, 980, lt > 1.4 ? 'DECIDED: 0:59' : `0:${String(s).padStart(2, '0')}…`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: lt > 1.4 ? MINT : PINK, rot: -0.04, ...LBL })
      sparkles(x, t, 790, 780, P.t0 + 1.4 * 3.1 / 2.4, 7, 160, 0.3)
    } },
  { sign: 'scorpio', cap: 'Letting someone in. | *Really in.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), o = ease.outBack(prog(lt, 0.9, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.save(); x.translate(o * 34, -o * 40); x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.arc(0, -70, 62, Math.PI, 0); x.stroke(); x.strokeStyle = GREY; x.lineWidth = 20; x.stroke(); x.restore()
        x.fillStyle = INK; x.fillRect(-104, -74, 208, 168); x.fillStyle = GOLD; x.fillRect(-96, -66, 192, 152)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 0, 10, 10, { outline: null })
        x.restore()
      }
      bubble(x, 790, 640, 'okay. here’s me.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 1.4, { n: 4, life: 1.5, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: 'sagittarius', cap: 'Staying home. | *A whole weekend.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, B: '#c97bff', W: CREAM }, 320, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 320, 700, 'UNPACKED (!!)', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...LBL })
      bubble(x, 330, 1100, 'this is… nice?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Phone in a drawer. | *Whole afternoon.*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const sh = ease.inOutCubic(prog(lt, 0.6, 1.1))
      card(x, 790, 940, 300, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: WOOD, rot: 0 }, () => { x.fillStyle = BROWN; x.fillRect(-130, -80, 260, 160); x.fillStyle = SUN; x.fillRect(-24, -8, 48, 16) })
      if (sh < 1) handset(x, 790, lerp(720, 900, sh), pop01(t, P.t0 + 0.3, 0.3, 2) * (1 - sh * 0.6), null, { w: 120, h: 200, rot: 0 })
      label(x, 790, 1110, 'DRAWER: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
    } },
  { sign: 'aquarius', cap: 'Saying “I need you.” | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I… need you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, col: MINT, tail: 'bl' })
      bubble(x, 800, 920, 'always here.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      hearts(x, t, 790, 1050, P.t0 + 1.4, { n: 4, life: 1.5, spread: 220, cell: 7, seed: 7 })
    } },
  { sign: 'pisces', cap: 'Saying no. | *Then a little cry.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', tears: lt => lt > 1.2 ? 2 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'no, thank you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 920, 'BOUNDARY: SET', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, ...LBL })
      sparkles(x, t, 790, 920, P.t0 + 1.3, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0240', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign | *being brave.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve kinds | *of brave.*' },
  lesson: { text: 'Brave isn’t loud. | *It’s showing up.*', chip: 'COURAGE: +1' },
  last: { text: 'Libra picked. | *In 59 seconds.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
