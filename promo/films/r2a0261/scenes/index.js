// r2a0261: star_advice, ADVICE SOLO, "Libra, it's okay | to miss them." (~52 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine gentle truths about missing someone, each with a warm reframe and one soft visual gag.
//   0.0–3.6    "Libra, it’s okay | *to miss them.*"
//   3.6–37.8   nine cards: replaying the good days · typed a text, deleted it · the scales: miss them AND move on
//              · two mugs out of habit · not too much, loved fully · friends asked you out · bad days pass faster
//              · saw their sign somewhere · your heart's still open
//  37.8        "Miss them. | *Mend gently.*"
//  41.0        LESSON UNLOCKED: "Missing someone means | *you loved well.*"  STATUS: HEALING
//  46.9        "Whoever’s next | *is lucky.*" over the match card: Libra + Gemini (the friend who asked them out).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, sun, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff9fc6'
const ST = { x: -170 }
const MUG = ['.WWWWWW.', 'WPPPPPPW', 'WPPPPPPWWW', 'WPPPPPPW.W', 'WPPPPPPWWW', 'WPPPPPPW', '.WWWWWW.']
const CLOUD = ['...WWWW.....', '..WWWWWW.WW.', '.WWWWWWWWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']

/** Libra's scales: a beam that tips and settles level, a pan on each side; fl / fr draw the pans' contents */
function scales(x, cx, cy, k, tilt, fl, fr) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, -150, 28, 300); x.fillRect(-90, 140, 180, 26)
  x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 288); x.fillRect(-84, 144, 168, 18)
  x.save(); x.translate(0, -150); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-180, -10, 360, 20); x.fillStyle = GOLD; x.fillRect(-176, -6, 352, 12)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 170, 0); x.rotate(-tilt)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-56, 110); x.moveTo(0, 0); x.lineTo(56, 110); x.stroke()
    x.fillStyle = INK; x.fillRect(-72, 106, 144, 22); x.fillStyle = GOLD; x.fillRect(-68, 110, 136, 14)
    ;(s < 0 ? fl : fr)(x)
    x.restore()
  }
  x.restore(); x.restore()
}

const CAMEOS = [
  { sign: 'libra', cap: 'Replaying the good days? | *That was real.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 220, 440, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.06 }, () => {
        for (let i = 0; i < 3; i++) { x.fillStyle = ['#3a2a68', '#2a3a68', '#4a2a58'][i]; x.fillRect(-90, -200 + i * 136, 180, 120) }
        signChar(x, t, 'libra', -30, -140, 90, { mood: 'happy', seed: 61, glyph: false })
        signChar(x, t, 'gemini', 32, -138, 90, { mood: 'wink', seed: 62, glyph: false })
        signChar(x, t, 'libra', 0, 0, 100, { mood: 'sparkle', seed: 63, glyph: false })
        signChar(x, t, 'libra', -30, 132, 90, { mood: 'heart', seed: 64, glyph: false })
        signChar(x, t, 'leo', 32, 134, 90, { mood: 'happy', seed: 65, glyph: false })
      })
      label(x, 790, 1120, 'KEEPING THESE', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Typed a text. Deleted it. | *Both are okay.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const typed = 'hey… I miss', n = lt < 1.3 ? Math.floor(clamp((lt - 0.3) / 0.9) * typed.length) : Math.max(0, typed.length - Math.floor((lt - 1.3) / 0.05))
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'DRAFT', headCol: LAV, size: 34, w: 300, h: 420, lines: [[typed.slice(0, n) + (n ? '' : '…'), BONE, n > 0 || lt > 1.3 ? 1 : 0]] })
      label(x, 790, 1120, 'NOT SENT. STILL OKAY.', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You can miss them | *and still move on.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const tilt = lt < 0.5 ? 0.22 : 0.22 * Math.cos((lt - 0.5) * 5) * Math.exp(-(lt - 0.5) * 2.2)
      scales(x, 740, 950, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), tilt,
        x => drawBits(x, HEART, { H: PINK, W: '#fff' }, 0, 80, 10),
        x => sun(x, t, 0, 70, 30, 1))
      label(x, 740, 580, 'BOTH. AT ONCE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Set out two mugs? | *Habits fade gently.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1030, 360, 30, k, { bg: WOOD, rot: 0 })
      drawBits(x, MUG, { W: CREAM, P: '#ff9fc6' }, 700, 945, 19 * k)
      drawBits(x, MUG, { W: CREAM, P: LAV }, 880, 945, 19 * k)
      x.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i * 0.25) % 1; x.globalAlpha = 0.6 * Math.sin(Math.PI * ph) * k; x.fillRect(710 + Math.sin(ph * 6 + i) * 12, 880 - ph * 120, 12, 18) }
      x.globalAlpha = 1
      bubble(x, 800, 720, 'oops. habit.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 870, 1110, 'MORE TEA FOR ME', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 26, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You weren’t too much. | *You loved fully.*', mood: 'heart', star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = 12 + 14 * ease.outCubic(prog(lt, 0.3, 1.4))
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 860, g * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.04 * Math.sin(t * 7)))
      label(x, 790, 1100, 'FULL SIZE. ON PURPOSE.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.45, 7, 190, 0.2)
    } },
  { sign: 'libra', cap: 'Friends asked you out. | *Maybe say yes.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'gemini', 720, 1010, 170 * k, { mood: 'wink', look: [-1, 0], seed: 71, glyph: false, hops: [P.t0 + 1.0] })
        signChar(x, t, 'sagittarius', 890, 1000, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 72, glyph: false, hops: [P.t0 + 1.3] })
      }
      bubble(x, 720, 700, 'come with us!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      bubble(x, 860, 820, 'no pressure', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 30, col: GOLD, tail: 'br' })
    } },
  { sign: 'libra', cap: 'Bad days still come. | *They pass faster now.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), sh = 1 - 0.55 * ease.inOutCubic(prog(lt, 0.8, 1.8))
      sun(x, t, 860, 760, 60, pop01(t, P.t0 + 1.2, 0.4, 1.8))
      drawBits(x, CLOUD, { W: '#9aa5c4' }, 760 - (1 - sh) * 140, 800, 22 * k * sh)
      x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i * 0.17) % 1; x.globalAlpha = k * sh * (1 - ph); x.fillRect(680 + i * 30 - (1 - sh) * 140, 870 + ph * 200 * sh, 6, 18) }
      x.globalAlpha = 1
      label(x, 790, 1090, 'FORECAST: CLEARING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SUN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Saw their sign somewhere? | *Smile. Keep going.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 850, 260, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a2350', rot: 0.05 }, () => {
        x.fillStyle = DEEP; x.fillRect(-116, -150, 232, 230)
        signChar(x, t, 'scorpio', 0, -40, 150, { mood: 'neutral', seed: 81, glyph: false, glow: 0.7 })
        txt(x, '♏︎ SCORPIO', 0, 125, { size: 28, font: MONO, weight: 700, color: '#c97bff' })
      })
      bubble(x, 560, 620, 'aw.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
      label(x, 790, 1110, 'SMILED. MOVED ON.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Your heart’s still open. | That’s *your superpower.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), o = ease.inOutCubic(prog(lt, 0.5, 1.2))
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -200, 240, 400)
        x.fillStyle = '#fff1b0'; x.fillRect(-108, -188, 216, 388)
        x.globalAlpha = 0.35; x.beginPath(); x.moveTo(-108, 200); x.lineTo(108, 200); x.lineTo(200, 300); x.lineTo(-200, 300); x.fill(); x.globalAlpha = 1
        x.fillStyle = '#c98f6a'; x.fillRect(-108, -188, 216 * (1 - 0.8 * o), 388)
        x.fillStyle = GOLD; x.fillRect(-108 + 216 * (1 - 0.8 * o) - 30, 0, 14, 14)
        x.restore()
      }
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 5 })
      label(x, 790, 640, 'OPEN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0261', key: 'D', accent: ACC, solo: 'libra', ending: 'card',
  title: 'Libra, it’s okay | *to miss them.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'gemini', chip: 'ALIGNED' },
  group: { cap: 'Miss them. | *Mend gently.*', mood: 'happy' },
  lesson: { text: 'Missing someone means | *you loved well.*', chip: 'STATUS: HEALING' },
  last: { text: 'Whoever’s next | *is lucky.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
