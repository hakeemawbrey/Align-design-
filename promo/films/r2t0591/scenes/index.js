// r2t0591: star_talk, SOLO (leo), "Leos keeping a secret | *be like.*" (signs3kit social cut, music: lofi · C).
// Nine cards, each the most extreme Leo-with-a-secret: kept it four whole minutes · planned your surprise party, sent YOU
// the invite · whispered it, very loudly · "I can't say!", then acted it out · zipped their lips, bedazzled the zipper
// · "knows nothing", says it smugly · made a secret group chat called LEO KNOWS · secret crush, custom T-shirt
// · finally spilled it, took a bow.
// Ending: group ("Your secret's safe. | For *four minutes.*", calling back card one).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER } from '../../signs3kit.js'
import { L, sheet, phone, bits, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -180 }, SG = 'leo', ORANGE = '#ffb34a'

const SHIRT = [
  '...WW....WW...',
  '.WWWW....WWWW.',
  'WWWWWWWWWWWWWW',
  'WWWWWWWWWWWWWW',
  '.WWWWWWWWWWWW.',
  '...WWWWWWWW...',
  '...WWWWWWWW...',
  '...WWWWWWWW...',
  '...WWWWWWWW...',
  '...WWWWWWWW...',
]
const ZIP = ['GSG', 'GSG', 'GSG', 'GSG', 'GSG', 'GSG', 'YYY', 'YYY', '.Y.', '.Y.']
const ROSE = ['.RR.', 'RRRR', '.RR.', '..G.', '.GG.', '..G.']

// a big digital timer sticker
function timer(x, cx, cy, k, secs, { bg = BONE, size = 64 } = {}) {
  const m = Math.floor(secs / 60), s = Math.floor(secs % 60)
  L(x, cx, cy, `${m}:${String(s).padStart(2, '0')}`, k, bg, 0.03, size)
}

const CAMEOS = [
  { sign: SG, cap: 'Kept the secret. | For *four minutes.*', mood: lt => lt > 1.6 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const secs = Math.min(240, 240 * clamp((lt - 0.3) / 1.3))
      L(x, 790, 660, 'SECRET KEPT FOR:', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.04, 28)
      timer(x, 790, 820, pop01(t, P.t0 + 0.3, 0.3, 2), secs, { bg: lt > 1.6 ? RED : BONE, size: 84 })
      bubble(x, 790, 1040, 'OK SO…', pop01(t, P.t0 + 1.7, 0.25, 2.3), { size: 46, tail: 'bl' })
    } },
  { sign: SG, cap: 'Planned your surprise party. | Sent *you* the invite.', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 330, h: 300, head: 'YOU’RE INVITED', headBg: PINK, headInk: INK, lines: ['a surprise', 'party for:', ['YOU', RED]], size: 36 })
      L(x, 790, 1060, 'TO: YOU. OOPS.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
      sparkles(x, t, 790, 840, P.t0 + 0.6, 7, 190, 0.4)
    } },
  { sign: SG, cap: 'Whispered the secret. | *Very* loudly.', mood: 'wide', look: [1, 0], star: ST, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'psst…', pop01(t, P.t0 + 0.25, 0.25, 2), { size: 34, tail: 'bl' })
      const big = pop01(t, P.t0 + 1.0, 0.3, 2.4)
      if (big > 0.01) bubble(x, 760, 940, 'SHE’S | MOVING!!', big, { size: 62, col: GOLD, tail: 'bl' })
      sparkles(x, t, 760, 940, P.t0 + 1.05, 8, 220, 0.2)
    } },
  { sign: SG, cap: '“I can’t say!” | Then *acted it out.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: lt => lt > 1.0 ? [0, 0] : [1, 0], star: ST, hops: [1.0, 1.5, 2.0],
    back(x, t, lt, P, F) {
      // a spotlight cone on Leo
      const k = clamp((lt - 0.9) / 0.3)
      if (k <= 0) return
      x.globalAlpha = 0.22 * k; x.fillStyle = '#fff1c8'
      x.beginPath(); x.moveTo(F.x - 40, 470); x.lineTo(F.x + 40, 470); x.lineTo(F.x + 190, 1160); x.lineTo(F.x - 190, 1160); x.fill()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I can’t say!', pop01(t, P.t0 + 0.2, 0.25, 2), { size: 38, tail: 'bl' })
      L(x, 790, 900, 'ACT ONE', pop01(t, P.t0 + 1.0, 0.3, 2.3), RED, 0.05, 50)
      L(x, 790, 1040, 'THE SECRET', pop01(t, P.t0 + 1.5, 0.3, 2.3), GOLD, -0.04, 36)
    } },
  { sign: SG, cap: 'Zipped their lips. | *Bedazzled* the zipper.', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, ZIP, { G: lt > 1.2 ? GOLD : STEEL, S: lt > 1.2 ? '#fff4c0' : '#c9c9d8', Y: GOLD }, 790, 860, 30 * k, { rot: 0.1 })
      if (lt > 1.2) for (let i = 0; i < 6; i++) { const a = t * 1.5 + i; x.fillStyle = [PINK, SKYB, MINT][i % 3]; x.fillRect(790 + Math.cos(a) * 90 - 8, 800 + (i * 37 % 160) - 8, 16, 16) }
      sparkles(x, t, 790, 860, P.t0 + 1.25, 8, 180, 0.6)
      L(x, 790, 1100, 'SEALED ✦ FABULOUSLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: SG, cap: 'Knows nothing. | Says it *smugly.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'who, me?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 900, 'TOTALLY CLUELESS', pop01(t, P.t0 + 0.9, 0.3, 2.3), BONE, 0.04, 32)
      L(x, 790, 1020, '(KNOWS EVERYTHING)', pop01(t, P.t0 + 1.5, 0.3, 2.3), GOLD, -0.05, 28)
    } },
  { sign: SG, cap: 'Made a secret group chat. | Named it *“LEO KNOWS.”*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { head: '✦ LEO KNOWS ✦', headCol: ORANGE, lines: [
        ['don’t tell', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)],
        ['ok but', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)],
        ['HUGE NEWS', GOLD, pop01(t, P.t0 + 1.2, 0.25, 2)],
      ], typing: lt > 1.5 ? 1 : 0, size: 24 })
      L(x, 790, 1100, '48 MEMBERS', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Secret crush. | *Custom T-shirt.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, SHIRT, { W: CREAM }, 790, 850, 26 * k, { rot: 0.05 })
      if (k > 0.5) {
        x.save(); x.translate(790, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = RED; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('I ♡', 0, -30); x.fillText('LIBRA', 0, 26); x.restore()
      }
      L(x, 790, 1080, 'VERY LOW-KEY', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Finally spilled it. | Took *a bow.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', star: ST, hops: [1.1],
    squash: lt => lt > 1.1 && lt < 1.8 ? 0.12 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'THEY’RE ENGAGED!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
      for (let i = 0; i < 6; i++) {
        const ph = clamp((lt - 1.1 - i * 0.12) / 0.9)
        if (ph <= 0) continue
        drawBits(x, ROSE, { R: RED, G: '#4fbf6a' }, 560 + i * 80, lerp(500, 1150 - (i % 3) * 30, ease.outCubic(ph)), 9, { rot: i * 0.7 })
      }
      L(x, 790, 1060, 'ENCORE?', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.05, 44)
    } },
]

const F = makeFilm({
  id: 'r2t0591', key: 'C', accent: ACC, solo: SG, ending: 'group',
  title: 'Leo with a secret | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Your secret’s safe. | For *four minutes.*', mood: 'wink' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
