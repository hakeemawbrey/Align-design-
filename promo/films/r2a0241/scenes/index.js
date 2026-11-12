// r2a0241: star_advice, ADVICE SOLO, "Leo, your sign | to slow down." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each.
// Ending: lesson.
//   0.0–3.6    "Leo, your sign | *to slow down.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              planning your own surprise party (let them) · hyping everyone (GO YOU! flips to GO ME!) · five plans, keep one
//              · three likes, still a great photo · put down everyone's heavy stuff · the BEST NAP trophy
//              · the spotlight has an off switch · slow mornings count · say you're tired, we'll still clap
//  37.8        "Still the brightest. | *Just rested.*"  Leo comes back, big.
//  41.0        LESSON UNLOCKED: "You shine longer | when you *rest.*"  STATUS: RECHARGED
//  46.9        "Spotlight off. | *Feet up.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, mug, sticky, clock, CREAM, RED, ORANGE, SUN, GREY, WOOD, clamp, prog, lerp, ease } from './props.js'

const S = 'leo', ACC = ORANGE

const TROPHY = [
  'YYYYYYYYY',
  'YWYYYYYYY',
  'YYYYYYYYY',
  '.YYYYYYY.',
  '..YYYYY..',
  '...YYY...',
  '....Y....',
  '....Y....',
  '..BBBBB..',
  '.BBBBBBB.',
]
const TROPHY_C = { Y: GOLD, W: '#fff6c8', B: '#8a4a2e' }
const SUNB = [
  '...Y...',
  'Y..Y..Y',
  '.YYYYY.',
  'YYYYYYY',
  '.YYYYY.',
  'Y..Y..Y',
  '...Y...',
]

// a barbell with a heavy tag
function barbell(x, cx, cy, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -10, 340, 20); x.fillStyle = GREY; x.fillRect(-166, -6, 332, 12)
  for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 150 - 26, -70, 52, 140); x.fillStyle = '#3d3470'; x.fillRect(s * 150 - 20, -64, 40, 128) }
  x.restore()
}
// a wall light switch, up (on) or down (off)
function lightSwitch(x, cx, cy, k, on) {
  card(x, cx, cy, 120, 180, k, { bg: CREAM, rot: 0, border: 6 }, () => {
    x.fillStyle = INK; x.fillRect(-26, -56, 52, 112); x.fillStyle = '#d9d2c2'; x.fillRect(-20, -50, 40, 100)
    x.fillStyle = on ? SUN : GREY; x.fillRect(-20, on ? -50 : 0, 40, 50)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Planning your own | surprise party? *Let them.*', mood: lt => lt > 1.5 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = WOOD; x.fillRect(-150, -170, 300, 40); txt(x, 'MY SURPRISE', 0, -150, { size: 24, color: CREAM, font: MONO, weight: 700 })
        const L = ['guest list', 'cake', 'my entrance', 'my speech']
        L.forEach((s, i) => { txt(x, '☐ ' + s, -120, -86 + i * 52, { size: 26, align: 'left' }) })
        if (lt > 1.2) { x.fillStyle = RED; for (let i = 0; i < 4; i++) x.fillRect(-124, -88 + i * 52, 240 * clamp((lt - 1.2 - i * 0.1) / 0.2), 5) }
      })
      label(x, 790, 1060, 'LET THEM PLAN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT })
    } },
  { sign: S, cap: 'Hyping everyone else? | *Hype you too.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', star: { x: -190 }, hops: [0.6, 1.5],
    front(x, t, lt, P) {
      const flip = lt > 1.3
      card(x, 790, 790, 300, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: flip ? ORANGE : SUN, rot: Math.sin(t * 6) * 0.05 }, () => txt(x, flip ? 'GO ME!' : 'GO YOU!', 0, 4, { size: 64 }))
      x.fillStyle = INK; x.fillRect(782, 890, 16, 170 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 790, 790, P.t0 + 1.35, 7, 200, 0.4)
    } },
  { sign: S, cap: 'Said yes to five plans? | *Keep one.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', star: { x: -190 },
    front(x, t, lt, P) {
      const PL = ['BRUNCH', 'GYM', 'PARTY', 'GALA', 'NAP']
      PL.forEach((s, i) => {
        const keep = i === 4, a = keep ? 1 : 1 - prog(lt, 1.2 + i * 0.1, 1.45 + i * 0.1)
        const px = keep && lt > 1.6 ? lerp(700 + (i % 2) * 175, 790, prog(lt, 1.6, 1.9)) : 700 + (i % 2) * 175
        const py = keep && lt > 1.6 ? lerp(650 + Math.floor(i / 2) * 175, 830, prog(lt, 1.6, 1.9)) : 650 + Math.floor(i / 2) * 175
        if (a > 0.01) { x.save(); x.globalAlpha = a; sticky(x, px, py, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2) * (keep && lt > 1.6 ? 1.3 : 1), s, { col: [SUN, PINK, SKYB, LAV, MINT][i], rot: ((i * 5) % 3 - 1) * 0.07, w: 150, size: 28 }); x.restore() }
      })
    } },
  { sign: S, cap: 'Only three likes? | Still *a great photo.*', mood: 'sparkle', star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        x.fillStyle = SUN; x.fillRect(-100, -150, 200, 220)
        signChar(x, t, S, 0, -40, 150, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.5 })
        txt(x, '♥ 3', 0, 120, { size: 44, color: PINK })
      })
      bubble(x, 800, 600, 'iconic anyway', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'You don’t have to be | *the strong one.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', star: { x: -190, y: 30 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const down = ease.inOutCubic(prog(lt, 1.1, 1.5))
      barbell(x, lerp(F.x + 10, 790, down), lerp(F.top - 40, 1080, down), pop01(t, P.t0 + 0.2, 0.35, 2), lerp(-0.06, 0, down))
      label(x, lerp(F.x + 10, 790, down), lerp(F.top - 130, 990, down), 'EVERYONE’S STUFF', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 28, bg: GREY, rot: -0.04 })
      sparkles(x, t, 790, 1060, P.t0 + 1.55, 6, 150, 0.3)
    } },
  { sign: S, cap: 'Resting isn’t losing. | It’s *a win.*', mood: 'sleepy', star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 820, 28 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 790, 1030, 'BEST NAP', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: SUN, font: MONO, weight: 700 })
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 180, 0.6)
    } },
  { sign: S, cap: 'The spotlight has | *an off switch.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', star: { x: -190 },
    back(x, t, lt, P) {
      const on = lt < 1.2
      if (on) { x.save(); x.globalAlpha = 0.25 * pop01(t, P.t0 + 0.1, 0.3, 2); x.fillStyle = '#fff2b0'; x.beginPath(); x.moveTo(300, 470); x.lineTo(420, 470); x.lineTo(500, 1060); x.lineTo(200, 1060); x.fill(); x.restore() }
      else { x.save(); x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(110, 480, 860, 740); x.restore() }
    },
    front(x, t, lt, P) {
      lightSwitch(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), lt < 1.2)
      label(x, 790, 1010, 'OFF. FOR NOW.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: LAV })
    } },
  { sign: S, cap: 'Slow mornings | *count too.*', mood: 'happy', star: { x: -190 }, hops: [1.7],
    front(x, t, lt, P) {
      drawBits(x, SUNB, { Y: SUN }, 860, 640, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.3 })
      mug(x, 760, 900, pop01(t, P.t0 + 0.4, 0.35, 2), t, { col: ORANGE, text: '♌︎', size: 48 })
      label(x, 790, 1100, 'ALARM: OFF', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Say “I’m tired.” | *We’ll still clap.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 380, 620, 'I’m tired.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bc' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'sagittarius', 720, 960, 170 * k, { mood: 'happy', seed: 51, glyph: false, hops: [P.t0 + 1.4, P.t0 + 1.9] }); signChar(x, t, 'cancer', 880, 960, 170 * k, { mood: 'heart', seed: 52, glyph: false, hops: [P.t0 + 1.6, P.t0 + 2.1] }) }
      bubble(x, 800, 720, 'clap clap clap', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2a0241', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leo, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Still the brightest. | *Just rested.*', mood: 'sparkle' },
  lesson: { text: 'You shine longer | when you *rest.*', chip: 'STATUS: RECHARGED' },
  last: {
    text: 'Spotlight off. | *Feet up.*',
    draw(x, t, lt) {
      label(x, 540, 1110, 'BACK TOMORROW', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 34, bg: SUN, font: MONO, weight: 700, rot: -0.03 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
