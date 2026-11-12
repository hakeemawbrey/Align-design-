// r2t0164: THE SIGNS AS… v3, SOLO (Virgo), "Your Virgo mom | be like." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the Virgo mom, every trait pushed to the extreme.
//   0.0–3.6    "Your Virgo mom | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              packed your lunch with a nutrition chart · "I'm fine", she ran a full diagnostic · cleaned before the
//              cleaner came · care package with an index · runs the family chat's agenda · checked your new partner's
//              chart, approved · fridge magnets in a grid · sneezed once, soup and a recovery plan · worries because
//              she loves you
//  37.8        "Detail-obsessed. | *Love-obsessed.*"
//  41.0        LESSON UNLOCKED: "Her lists are | *love letters.*"  STATUS: LOVED
//  46.9        "Call your mom. | *She made a slot.*"  a little planner: 4:15, YOU.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, chart, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'virgo'
const ST = { x: -190 }

const LUNCH = ['.KKKKKKKKKKKK.', 'KRRRRRRRRRRRRK', 'KRRRRKKKKRRRRK', 'KKKKKKKKKKKKKK', 'KWWWWKWWWWKWWK', 'KWGGWKWOOWKWBK', 'KWGGWKWOOWKWBK', 'KWWWWKWWWWKWWK', 'KKKKKKKKKKKKKK']
const LUNCH_C = { K: INK, R: '#5fd068', W: CREAM, G: '#5fd068', O: ORANGE, B: '#c98f6a' }
const SPRAY = ['.KKKK...', 'KBBBBKKK', '.KBBK...', '..KK....', '.KWWK...', 'KWWWWK..', 'KWMMWK..', 'KWMMWK..', 'KWWWWK..', 'KKKKKK..']
const BOX = ['KKKKKKKKKKKKKK', 'KBBBBBTTBBBBBK', 'KBBBBBTTBBBBBK', 'KKKKKKKKKKKKKK', 'KBBBBBBBBBBBBK', 'KBBBBBBBBBBBBK', 'KBBBBBBBBBBBBK', 'KBBBBBBBBBBBBK', 'KKKKKKKKKKKKKK']
const BOX_C = { K: INK, B: '#c98f6a', T: '#e8dfcf' }
const SOUP = ['.S..S..S.', '..S..S...', 'WWWWWWWWW', 'WOOOOOOOW', '.WWWWWWW.', '..WWWWW..']

const CAMEOS = [
  { sign: S, cap: 'Packed your lunch. | *With a nutrition chart.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LUNCH, LUNCH_C, 790, 1000, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 760, 320, 220, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'TODAY’S LUNCH', 0, -78, { size: 28, font: MONO, weight: 700 })
        ;[['PROTEIN', MINT], ['FIBRE', GOLD], ['JOY', PINK]].forEach(([s, c], i) => { x.fillStyle = c; x.fillRect(-130, -40 + i * 46, 200 - i * 30, 30); txt(x, s, -120, -25 + i * 46, { size: 22, font: MONO, weight: 700, align: 'left' }) })
      })
    } },
  { sign: S, cap: 'You said “I’m fine.” | *She ran a diagnostic.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ROWS = ['SLEEP?', 'WATER?', 'JACKET?', 'FEELINGS?']
      card(x, 790, 860, 340, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'CHECK-UP', 0, -140, { size: 32, font: MONO, weight: 700 })
        ROWS.forEach((r, i) => {
          txt(x, r, -130, -70 + i * 66, { size: 28, font: MONO, weight: 700, align: 'left' })
          if (lt > 0.5 + i * 0.35) { x.strokeStyle = GREEN; x.lineWidth = 9; x.beginPath(); x.moveTo(96, -72 + i * 66); x.lineTo(110, -56 + i * 66); x.lineTo(136, -90 + i * 66); x.stroke() }
        })
      })
      label(x, 790, 1110, 'SCAN: COMPLETE', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Cleaner coming at ten? | *She cleaned first.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P, F) {
      drawBits(x, SPRAY, { K: INK, B: SKYB, W: CREAM, M: MINT }, F.x + 140, F.cy + 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      for (let i = 0; i < 4; i++) if (lt > 0.4 + i * 0.3) sparkles(x, t, 660 + (i % 2) * 220, 760 + Math.floor(i / 2) * 200, P.t0 + (0.4 + i * 0.3) * 1.29, 5, 70, i)
      label(x, 790, 700, 'CLEANER: 10:00', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'HOUSE CLEAN: 9:15', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sent a care package. | *With an index.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 1010, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 740, 320, 250, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'INDEX', 0, -90, { size: 30, font: MONO, weight: 700 })
        ;['A. socks (4)', 'B. snacks (labelled)', 'C. a note: “love u”'].forEach((s, i) => txt(x, s, -130, -36 + i * 50, { size: 24, font: MONO, weight: 700, align: 'left', color: i === 2 ? RED : INK }))
      })
    } },
  { sign: S, cap: 'The family group chat? | *She runs the agenda.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const L = ['1. hydrate', '2. call grandma', '3. sunscreen', 'questions?']
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FAMILY', headCol: MINT, size: 28, w: 300, h: 420, lines: L.map((s, i) => [s, i === 3 ? PINK : BONE, pop01(t, P.t0 + 0.4 + i * 0.3, 0.25, 2)]) })
      label(x, 790, 1120, 'MINUTES: TAKEN', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your new partner? | She *checked their chart.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      const s = pop01(t, P.t0 + 1.5, 0.3, 2.6)
      if (s > 0.01) { x.save(); x.translate(790, 830); x.rotate(-0.2); x.scale(1.6 - 0.6 * s, 1.6 - 0.6 * s); x.globalAlpha = clamp(s * 2); x.fillStyle = CREAM; x.fillRect(-150, -46, 300, 92); x.strokeStyle = GREEN; x.lineWidth = 10; x.strokeRect(-150, -46, 300, 92); txt(x, 'APPROVED', 0, 4, { size: 52, color: GREEN }); x.restore() }
      label(x, 790, 1090, 'COMPATIBILITY: CHECKED', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fridge magnets? | *In a perfect grid.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 870); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-160, -230, 320, 460); x.fillStyle = '#e8eef4'; x.fillRect(-150, -220, 300, 440); x.fillStyle = INK; x.fillRect(-150, -60, 300, 8); x.fillRect(110, -180, 14, 90)
      const fix = ease.inOutCubic(prog(lt, 0.8, 1.3)), COLS = [PINK, MINT, GOLD, SKYB, ORANGE, LAV]
      for (let i = 0; i < 9; i++) {
        const cx = -90 + (i % 3) * 80, cy = 0 + Math.floor(i / 3) * 70, off = i === 4 ? (1 - fix) : 0
        x.save(); x.translate(cx + off * 24, cy - off * 18); x.rotate(off * 0.5); x.fillStyle = INK; x.fillRect(-26, -22, 52, 44); x.fillStyle = COLS[i % 6]; x.fillRect(-22, -18, 44, 36); x.restore()
      }
      x.restore()
      label(x, 790, 640, 'ONE WAS CROOKED', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'FIXED. BREATHING.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sneezed once? | *Soup and a recovery plan.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'achoo.', pop01(t, P.t0 + 0.1, 0.25, 2.2) * (1 - prog(lt, 0.6, 0.8)), { size: 40, tail: 'bl' })
      drawBits(x, SOUP, { S: BONE, W: CREAM, O: ORANGE }, 660, 1040, 26 * pop01(t, P.t0 + 0.7, 0.35, 2))
      card(x, 830, 800, 270, 260, pop01(t, P.t0 + 1.0, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'RECOVERY', 0, -96, { size: 28, font: MONO, weight: 700 }); txt(x, 'PLAN v3', 0, -60, { size: 24, font: MONO, weight: 700, color: RED })
        for (let i = 0; i < 4; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-100, -16 + i * 34, 200 - (i % 2) * 50, 12) }
      })
    } },
  { sign: S, cap: 'Worries about everything. | *Because she loves you.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'TO WORRY ABOUT', 0, -70, { size: 26, font: MONO, weight: 700 })
        txt(x, '1. YOU', -110, -10, { size: 34, align: 'left' }); txt(x, '2. YOU', -110, 50, { size: 34, align: 'left' })
      })
      label(x, 790, 1080, 'LIST: COMPLETE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0164', key: 'D', accent: MINT, solo: S, ending: 'lesson',
  title: 'Your Virgo mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Detail-obsessed. | *Love-obsessed.*', mood: 'heart' },
  lesson: { text: 'Her lists are | *love letters.*', chip: 'STATUS: LOVED' },
  last: {
    text: 'Call your mom. | *She made a slot.*',
    draw(x, t, lt) {
      card(x, 540, 1300, 420, 240, pop01(t, t - lt + 0.6, 0.4, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'MOM’S DAY', 0, -84, { size: 32, font: MONO, weight: 700 })
        txt(x, '4:00  laundry', -170, -24, { size: 28, font: MONO, weight: 700, align: 'left', color: GREY })
        x.fillStyle = PINK; x.fillRect(-180, 10, 360, 56); txt(x, '4:15  YOU', -170, 40, { size: 32, font: MONO, weight: 700, align: 'left' })
      })
      hearts(x, t, 540, 1240, t - lt + 1.4, { n: 6, life: 2.0, spread: 360, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
