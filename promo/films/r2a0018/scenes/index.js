// r2a0018: star_advice, ADVICE ROLLCALL, "What each sign | says when hurt." (topic: what each sign says when they’re hurt) (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order: what each sign says when they’re hurt, and the kind way to hear it, each with a light gag.
// Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ “I’m fine!” = give me ten minutes · ♉ “just tired” = bring snacks · ♊ “lol whatever” = ask again
//              · ♋ “it’s nothing” = hug please · ♌ “I don’t care” = notice me, gently · ♍ “I’ll just fix it” = help would be nice
//              · ♎ “no worries at all!” = some worries · ♏ “interesting.” = talk to me honestly · ♐ “haha, anyway!” = that one stung
//              · ♑ “I’m busy” = sit with me anyway · ♒ “I need space” = check in tomorrow · ♓ “I’m okay!” (crying) = stay a little
//  49.2        "Twelve ways | to say *“ouch.”*"
//  52.4        LESSON UNLOCKED: "Hear the words. | *Feel the heart.*"  HEART: HEARD
//  58.3        "“I’m fine”? | *Ask twice.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff8fb1', RED = '#e23d4e', GREEN = '#7ee08a', ORANGE = '#ff9a4a'

// ── props
const COOKIE = ['..CCCCC..', '.CCKCCCC.', 'CCCCCCKCC', 'CKCCCCCCC', 'CCCCKCCCC', '.CCCCCKC.', '..CCCCC..']
function phone(x, cx, cy, k, rows) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -200, 240, 400); x.fillStyle = '#2a2350'; x.fillRect(-106, -180, 212, 360)
  x.restore()
  rows.forEach(([s, col, kk], i) => bubble(x, cx + (i % 2 ? 20 : -10), cy - 100 + i * 120, s, kk * k, { size: 32, col, tail: i % 2 ? 'br' : 'bl' }))
}
function spotlight(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= 0.35 * k; x.fillStyle = '#fff1b0'
  x.beginPath(); x.moveTo(cx - 40, cy - 330); x.lineTo(cx + 40, cy - 330); x.lineTo(cx + 170, cy + 120); x.lineTo(cx - 170, cy + 120); x.closePath(); x.fill(); x.restore()
}
function list(x, cx, cy, k, items, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = BONE; x.fillRect(-150, -130, 300, 260)
  x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  items.forEach((s, i) => x.fillText(s, -125, -80 + i * 60))
  x.restore()
}
function scales(x, t, cx, cy, k, tilt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -120, 24, 240); x.fillRect(-80, 110, 160, 24)
  x.fillStyle = GOLD; x.fillRect(-6, -114, 12, 228)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const d of [-1, 1]) { x.fillStyle = INK; x.fillRect(d * 150 - 60, 40, 120, 26); x.fillStyle = d < 0 ? ROSE : SKYB; x.fillRect(d * 150 - 54, 44, 108, 18) }
  x.restore(); x.restore()
}
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const PLANET = ['...PPPP...', '.PPPPPPPP.', 'RRRRRRRRRR', 'PPPPPPPPPP', '.PPPPPPPP.', '...PPPP...']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBBBPB', 'BBBBBBBB']

const CAMEOS = [
  { sign: 'aries', cap: '“I’m fine!” | *Means: give me a minute.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I’M FINE!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 52, col: RED, tail: 'bl' })
      label(x, 790, 960, `COOLDOWN: ${lt < 1.4 ? '10:00' : '0:00'}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“I’m just tired.” | *Means: bring snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, COOKIE, { C: '#d99a4e', K: '#5a3a2a' }, 790, 880, 26 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      bubble(x, 790, 660, 'just tired.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1100, 'COOKIE: DELIVERED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: '“lol it’s whatever” | *Means: ask again.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) { phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), [['lol whatever', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['you sure?', LAV, pop01(t, P.t0 + 1.1, 0.25, 2.2)], ['ok… no.', BONE, pop01(t, P.t0 + 1.6, 0.25, 2.2)]]) } },
  { sign: 'cancer', cap: '“No, it’s nothing.” | *Means: hug, please.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'it’s nothing.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 920, 'HUG: REQUESTED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: '“I don’t even care.” | *Means: notice me, gently.*', mood: lt => lt > 1.3 ? 'sparkle' : 'eyeroll', look: [1, 0], star: { x: -190 },
    back(x, t, lt, P) { spotlight(x, 350, 880, ease.outCubic(prog(lt, 1.0, 1.4))) },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'don’t care.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 960, 'SPOTLIGHT: ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: '“I’ll just fix it.” | *Means: please help.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      list(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ['☐ fix it', '☐ fix it', '☐ fix it', '☐ fix it'], lt)
      label(x, 790, 1080, 'HELPER: ARRIVED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“No worries at all!” | *Means: some worries.*', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      scales(x, t, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lerp(0, 0.35, ease.outBack ? ease.outCubic(prog(lt, 0.9, 1.4)) : prog(lt, 0.9, 1.4)))
      label(x, 790, 640, 'WORRIES: 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: ROSE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“Interesting.” | *Means: be honest with me.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'interesting.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: '#c97bff', tail: 'bl' })
      label(x, 790, 980, 'SAY IT STRAIGHT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Haha, anyway!” | *Means: that one stung.*', mood: lt => lt > 1.4 ? 'neutral' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'haha, ANYWAY!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: ORANGE, tail: 'bl' })
      label(x, 790, 960, 'OUCH: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“I’m busy.” | *Means: sit with me.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: INK, S: '#6fc3ff', G: '#9aa5c4' }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 1.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 860, 1100, 120 * k, { mood: 'happy', look: [-1, 0], seed: 35, glyph: false })
      label(x, 790, 660, 'COMPANY: WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: '“I need space.” | *Means: check in tomorrow.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PLANET, { P: '#6fc3ff', R: LAV }, 800, 800 + Math.sin(t * 2) * 10, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      label(x, 790, 1040, 'CHECK-IN: TOMORROW', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“I’m okay!” | *Means: stay a little.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I’m okay!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: ROSE }, 790, 940, 20 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 790, 1110, 'STAYING ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: ROSE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0018', key: 'C', accent: ROSE, ending: 'lesson',
  title: 'What each sign | *says when hurt.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to say *“ouch.”*' },
  lesson: { text: 'Hear the words. | *Feel the heart.*', chip: 'HEART: HEARD' },
  last: {
    text: '“I’m fine”? | *Ask twice.*',
    draw(x, t, lt) {
      bubble(x, 400, 700, 'I’m fine.', pop01(t, t - lt + 0.5, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 700, 790, 'you sure?', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 46, col: ROSE, tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
