// r2a0219: star_advice, ADVICE ROLL CALL, "Each sign's | habit to soften." (~59 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific habit each could soften, with a light visual gag.
//   0.0–3.6    "Each sign’s | *habit to soften.*"
//   3.6–49.2   ♈ interrupting, let them finish · ♉ stubborn, try "maybe" · ♊ changing plans, keep one promise
//              · ♋ mothering everyone, they can pack lunch · ♌ telling every story, ask for theirs · ♍ fixing every
//              mistake, let small ones slide · ♎ yes to every plan, "no" is kind too · ♏ keeping score, close the
//              scoreboard · ♐ too blunt, add a little sugar · ♑ always working, close the laptop at six
//              · ♒ leaving matches on read, text back "here" · ♓ sorry for everything, save it for real
//  49.2        "Nobody’s perfect. | *All growing.*"  Group photo.
//  52.4        LESSON UNLOCKED: "Soft isn’t weak. | It’s *growth.*"  STATUS: SOFTENED
//  58.3        "Start with one. | *We believe in you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, laptop, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const LUNCH = ['....KKKK....', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRWWWWRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const LOCK = ['.KKKK.', 'K....K', 'K....K', 'YYYYYY', 'YYKKYY', 'YYKKYY', 'YYYYYY']
const CUBE = ['WWW', 'WWW', 'WWW']
const EXIT = ['GGGGGGGGGGGG', 'GWWWGWGWGWWG', 'GWGGGWGWGGWG', 'GWWGGGWGGGWG', 'GWGGGWGWGGWG', 'GWWWGWGWGGWG', 'GGGGGGGGGGGG']
const PEACH = '#ff9a8a'

const CAMEOS = [
  { sign: 'aries', cap: 'Interrupting? | *Let them finish.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so then I—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      const k = pop01(t, P.t0 + 0.9, 0.3, 2.2)
      if (k > 0.01) { x.save(); x.translate(790, 900); x.scale(k, k); x.fillStyle = INK; x.fillRect(-80, -80, 160, 160); x.fillStyle = GOLD; x.fillRect(-72, -72, 144, 144); x.fillStyle = INK; x.fillRect(-40, -44, 26, 88); x.fillRect(14, -44, 26, 88); x.restore() }
      label(x, 790, 1080, 'MOUTH: PAUSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Stubborn streak? | *Try “maybe.”*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const soft = lt > 1.2
      label(x, 790, 820, soft ? 'MAYBE?' : 'NO.', pop01(t, P.t0 + 0.3, 0.3, 2.2) * (soft ? pop01(t, P.t0 + 1.2, 0.3, 2.2) : 1), { size: 76, bg: soft ? MINT : RED, color: soft ? INK : CREAM, rot: soft ? 0.05 : -0.04 })
      bubble(x, 790, 1040, 'tell me more', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Changing plans last-minute? | *Keep one promise.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 860, 330, 380, k, { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'FRIDAY', 0, -150, { size: 30, font: MONO, weight: 700 })
        ;[['brunch?', 'gone'], ['movie?', 'gone'], ['YOUR BDAY', 'keep'], ['party?', 'gone']].forEach(([s, m], i) => {
          const y = -80 + i * 70, keep = m === 'keep'
          x.fillStyle = keep ? GOLD : '#e8dfcf'; x.fillRect(-130, y - 26, 260, 52); txt(x, s, 0, y + 2, { size: 28, color: keep ? INK : '#8a8270' })
          if (!keep && lt > 0.6 + i * 0.15) { x.fillStyle = RED; x.fillRect(-110, y - 3, 220, 7) }
        })
      })
      drawBits(x, LOCK, { K: INK, Y: GOLD }, 990, 890, 12 * pop01(t, P.t0 + 1.4, 0.3, 2.4))
      sparkles(x, t, 790, 900, P.t0 + 1.5, 6, 180, 0.3)
    } },
  { sign: 'cancer', cap: 'Mothering everyone? | *They can pack lunch.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, LUNCH, { K: INK, R: ['#ff6b5a', '#8fe3ff', '#7dffb0', '#ffd23a'][i], W: CREAM }, 700 + (i % 2) * 180, 760 + Math.floor(i / 2) * 170, 14 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.25, 2))
      label(x, 790, 1120, 'LUNCHES: THEIRS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Telling every story? | *Ask for theirs.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 420, 610, 'and then I…', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.9, 1.1)), { size: 40, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 980, 200 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 420, 610, 'and you?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, col: MINT, tail: 'bc' })
      bubble(x, 800, 720, 'oh! so…', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Fixing every mistake? | *Let small ones slide.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), tw = lt < 1.2 ? Math.sin(t * 14) * 0.03 : 0
      card(x, 790, 820, 260, 220, k, { bg: GOLD, rot: 0.12 + tw }, () => { x.fillStyle = SKYB; x.fillRect(-110, -90, 220, 180); x.fillStyle = GREEN; x.fillRect(-110, 30, 220, 60); x.fillStyle = SUN; x.fillRect(40, -60, 40, 40) })
      label(x, 790, 1060, 'CROOKED: FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Yes to every plan? | *“No” is kind too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) label(x, 760 + (i % 2) * 70, 650 + i * 80, 'YES!', pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.2)), { size: 40, bg: PINK, rot: (i % 2 ? 0.06 : -0.06) })
      label(x, 790, 820, 'no, thanks ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 50, bg: MINT, rot: -0.03 })
      label(x, 790, 1020, 'FREE EVENING: 1', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Keeping score? | *Close the scoreboard.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const off = lt > 1.2
      card(x, 790, 840, 340, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#140c30', rot: 0 }, () => {
        if (off) { txt(x, 'CLOSED', 0, 0, { size: 50, color: GREY, font: MONO, weight: 700 }); return }
        txt(x, 'ME', -80, -60, { size: 26, font: MONO, weight: 700, color: BONE }); txt(x, 'YOU', 80, -60, { size: 26, font: MONO, weight: 700, color: BONE })
        txt(x, '47', -80, 30, { size: 70, color: '#ff6b5a', font: MONO, weight: 700 }); txt(x, '12', 80, 30, { size: 70, color: '#ff6b5a', font: MONO, weight: 700 })
      })
      label(x, 790, 1060, off ? 'SCORE: WHO CARES' : 'SINCE 2019', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: off ? MINT : '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Too blunt sometimes? | *Add a little sugar.*', mood: lt => lt > 1.4 ? 'heart' : 'wink', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, lt > 1.4 ? 'new haircut! | brave ♡' : 'new haircut. | bold.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: lt > 1.4 ? PINK : BONE, tail: 'bl' })
      for (let i = 0; i < 5; i++) { const p = prog(lt, 0.8 + i * 0.1, 1.3 + i * 0.1); if (p > 0 && p < 1) drawBits(x, CUBE, { W: '#ffffff' }, 700 + i * 45, lerp(560, 700, p), 10, { alpha: 1 - p }) }
      label(x, 790, 1040, 'SUGAR: ADDED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Always working? | *Close the laptop at six.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      clock(x, 900, 650, 60, pop01(t, P.t0 + 0.2, 0.3, 2), 6, 0)
      const shut = lt > 1.2
      laptop(x, 760, 960, 1.05 * pop01(t, P.t0 + 0.3, 0.35, 2), () => { txt(x, shut ? 'see you tmrw' : 'EMAILS (88)', 0, 0, { size: 28, color: shut ? MINT : BONE, font: MONO, weight: 700 }) })
      label(x, 760, 1130, 'OFF THE CLOCK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Leaving matches on read? | *Text back “here.”*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'YOUR MATCH', headCol: SKYB, size: 30, w: 300, h: 400, rot: 0.03, lines: [
        ['you ok?', LAV, pop01(t, P.t0 + 0.4, 0.25, 2.2)],
        ['here ♡', MINT, pop01(t, P.t0 + 1.3, 0.25, 2.4)],
      ] })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Sorry for everything? | *Save it for real.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt > 1.5 ? 1 : 2, look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['sorry!', 'so sorry', 'sorry?'].forEach((s, i) => {
        const y = 680 + i * 120
        label(x, 790, y, s, pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2), { size: 40, bg: LAV, rot: (i - 1) * 0.05 })
        const cr = ease.outCubic(prog(lt, 1.0 + i * 0.12, 1.2 + i * 0.12))
        if (cr > 0) { x.save(); x.translate(790, y); x.fillStyle = RED; x.fillRect(-120, -4, 240 * cr, 8); x.restore() }
      })
      label(x, 790, 1080, 'YOU DID NOTHING WRONG', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: MINT, rot: 0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0219', key: 'E', accent: PEACH, ending: 'lesson',
  title: 'Each sign’s | *habit to soften.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody’s perfect. | *All growing.*' },
  lesson: { text: 'Soft isn’t weak. | It’s *growth.*', chip: 'STATUS: SOFTENED' },
  last: {
    text: 'Start with one. | *We believe in you.*',
    draw(x, t, lt) { hearts(x, t, 540, 1300, t - lt + 0.4, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
