// r2t0765: star_talk, BELIKE, "Cold outside? | Zodiacs be like." (topic: "Zodiacs when they're cold be like",
// reworded to fit two lines; signs3kit social cut, lofi · F). Ending: callback (Aries, still no coat).
//   ♈ refuses a coat in a blizzard · ♉ built a blanket fort, moved in · ♊ too hot, too cold, every five seconds
//   · ♋ blanketed everyone, even the plant · ♌ Leo IS the heater · ♍ thermostat: exactly 20.5 · ♎ freezing, but the
//   outfit matched · ♏ "not cold", teeth chattering · ♐ booked a beach · ♑ checked the forecast, packed for March
//   · ♒ invented a heated hat · ♓ cried at a snowflake (it was unique)
//   group "Nobody dressed | *for this.*"   last "Aries? | *Still no coat.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff'
const FLAKE = ['..W.W..', 'W..W..W', '.WWWWW.', 'WWW.WWW', '.WWWWW.', 'W..W..W', '..W.W..']
const FLAKE_C = { W: '#ffffff' }
const SHORTS = ['RRRRRRRR', 'RRRRRRRR', 'RRR..RRR', 'RRR..RRR', 'RRR..RRR']
const SHORTS_C = { R: '#ff6b5a' }
const BEANIE = ['....Y....', '...YYY...', '..RRRRR..', '.RRRRRRR.', 'RRRRRRRRR', 'WWWWWWWWW', 'WWWWWWWWW']
const BEANIE_C = { Y: GOLD, R: '#6fc3ff', W: CREAM }

/** snow falling inside the panel */
function snow(x, t, { n = 26, alpha = 0.9, l = 110, r = 970, top = 480, bot = 1220, speed = 0.35 } = {}) {
  x.save(); x.fillStyle = '#ffffff'
  for (let i = 0; i < n; i++) {
    const ph = ((t * speed + i * 0.1379) % 1 + 1) % 1
    x.globalAlpha = alpha * Math.sin(Math.PI * ph)
    const s = 8 + (i % 3) * 4
    x.fillRect(l + ((i * 137) % (r - l)) + Math.sin(t * 2 + i) * 14, top + ph * (bot - top), s, s)
  }
  x.restore()
}
const shiver = lt => 0.05 * Math.sin(lt * 40)

const CAMEOS = [
  { sign: 'aries', cap: 'Refuses a coat. | *In a blizzard.*', mood: 'squint', squash: shiver, look: [1, 0], star: { x: -160 },
    back(x, t, lt, P) { snow(x, t, { n: 34, speed: 0.6 }) },
    front(x, t, lt, P, F) {
      drawBits(x, SHORTS, SHORTS_C, F.x, F.cy + 150, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'COAT: NEVER', pop01(t, P.t0 + 0.6, 0.3, 2), RED, 0.05, 38)
      bubble(x, 790, 960, 'i’m w-warm', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Built a blanket fort. | *Moved in.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -160, y: 30 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bits(x, 'BLANKET', 380, 820, 26 * k)
      if (k > 0.01) { x.fillStyle = '#b48ad8'; x.fillRect(380 - 200 * k, 830, 30 * k, 300 * k); x.fillRect(380 + 170 * k, 830, 30 * k, 300 * k) }
    },
    front(x, t, lt, P) {
      L(x, 790, 760, 'FORT: OCCUPIED', pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV, 0.05, 34)
      L(x, 790, 960, 'RENT: SNACKS', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Too hot. Too cold. | *Every five seconds.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'wide', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const hot = Math.floor(lt * 2.5) % 2
      L(x, 790, 800, hot ? 'HOT!' : 'COLD!', pop01(t, P.t0 + 0.3, 0.3, 2), hot ? '#ff9a4a' : SKYB, hot ? 0.06 : -0.06, 58)
      bubble(x, 790, 1040, hot ? 'window open' : 'window shut', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 620, 'MATCH SAYS: PICK ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Blanketed everyone. | *Even the plant.*', mood: 'heart', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {   // a little potted plant wearing a blanket
        x.save(); x.translate(800, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-56, 40, 112, 100); x.fillStyle = '#c97a4a'; x.fillRect(-48, 46, 96, 88)
        x.fillStyle = INK; x.fillRect(-80, -110, 160, 160); x.fillStyle = '#4fbf6a'; x.fillRect(-72, -102, 144, 144)
        x.restore()
      }
      bits(x, 'BLANKET', 800, lerp(700, 930, ease.outBounce ? ease.outBounce(prog(lt, 0.8, 1.3)) : ease.outCubic(prog(lt, 0.8, 1.3))), 14 * pop01(t, P.t0 + 0.8, 0.25, 2))
      L(x, 800, 650, 'STAY WARM, FERN', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.05, 32)
    } },
  { sign: 'leo', cap: 'Too cold? | Leo *is the heater.*', mood: 'sparkle', star: { x: -150 }, hops: [1.3],
    back(x, t, lt, P, F) {
      const g = ease.outCubic(prog(lt, 0.3, 0.9))
      x.save(); x.globalAlpha = 0.35 * g
      const gr = x.createRadialGradient(F.x, F.cy, 20, F.x, F.cy, 300); gr.addColorStop(0, '#ffd27a'); gr.addColorStop(1, 'rgba(255,210,122,0)')
      x.fillStyle = gr; x.fillRect(F.x - 300, F.cy - 300, 600, 600); x.restore()
    },
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 740, 1040, 140, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'happy', look: [-1, 0] })
      friend(x, t, 'pisces', 880, 1060, 140, pop01(t, P.t0 + 0.8, 0.3, 2), { mood: 'happy', look: [-1, 0], tears: 1, seed: 39 })
      L(x, 800, 730, 'HEAT: SELF-MADE', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.05, 34)
    } },
  { sign: 'virgo', cap: 'Set the thermostat. | *Exactly 20.5.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -110, 260, 220); x.fillStyle = BONE; x.fillRect(-120, -100, 240, 200)
        x.fillStyle = '#140c30'; x.fillRect(-96, -70, 192, 100)
        x.fillStyle = MINT; x.font = `700 64px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText((19 + clamp((lt - 0.3) / 1.0) * 1.5).toFixed(1), 0, -20)
        x.restore()
      }
      L(x, 800, 1080, 'DO NOT TOUCH.', pop01(t, P.t0 + 1.5, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Freezing. But | *the outfit matched.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', squash: shiver, look: [1, 0], star: { x: -160 },
    back(x, t, lt, P) { snow(x, t, { n: 18 }) },
    front(x, t, lt, P, F) {
      drawBits(x, BEANIE, { ...BEANIE_C, R: PINK }, F.x, F.top - 30, 11 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'WARMTH: LOW', pop01(t, P.t0 + 0.6, 0.3, 2), SKYB, 0.05, 34)
      L(x, 800, 960, 'LOOK: PERFECT ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: '“Not cold.” | *Teeth chattering.*', mood: 'squint', squash: shiver, look: [1, 0], star: { x: -160 },
    back(x, t, lt, P) { snow(x, t, { n: 18 }) },
    front(x, t, lt, P) {
      bubble(x, 800 + 4 * Math.sin(t * 50), 760, 'i’m f-f-fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: LAV })
      L(x, 800, 1000, 'CHATTER: LOUD', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Cold here? | *Booked a beach.*', mood: 'sparkle', star: { x: 160 }, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      bits(x, 'UMB', 330, 840, 20 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.15 })
      bits(x, 'SHADES', 330, 1040, 14 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 330, 640, 'GONE: TROPICS', pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.05, 34)
      const p = prog(lt, 1.0, 2.3)
      if (p > 0 && p < 1) bits(x, 'PLANE', lerp(980, 180, p), 560, 10, { rot: -Math.PI / 2 })
    } },
  { sign: 'capricorn', cap: 'Checked the forecast. | *Packed for March.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 920, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 700, 'LAYERS: 14', pop01(t, P.t0 + 0.8, 0.3, 2.4), STEEL, 0.05, 36)
      L(x, 800, 1110, 'READY TILL SPRING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Too cold? | Invented *a heated hat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -160 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, BEANIE, BEANIE_C, F.x, F.top - 30, 12 * k)
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(F.x - 4, F.top - 130, 8, 60); x.fillStyle = lt > 1.0 && Math.floor(t * 6) % 2 ? RED : MINT; x.fillRect(F.x - 12, F.top - 146, 24, 24) }
      L(x, 800, 780, 'HAT 2.0: ON', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, 0.05, 36)
      bubble(x, 800, 1000, 'patent pending', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw a snowflake. | *Cried.* It was unique.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 1 : 3, look: [1, -1], star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.outCubic(prog(lt, 0.2, 1.0))
      drawBits(x, FLAKE, FLAKE_C, 790 + 10 * Math.sin(t * 2), lerp(560, 820, d), 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.6 })
      L(x, 790, 1060, 'ONE OF A KIND ♡', pop01(t, P.t0 + 1.1, 0.3, 2.4), SKYB, -0.04, 34)
      sparkles(x, t, 790, 820, P.t0 + 1.0, 6, 140, 0.4, ['#ffffff', SKYB, LAV])
    } },
]

const F = makeFilm({
  id: 'r2t0765', key: 'F', accent: ACC, ending: 'callback',
  title: 'Cold outside? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody dressed | *for this.*' },
  last: {
    text: 'Aries? | *Still no coat.*',
    draw(x, t, lt) {
      snow(x, t, { n: 40, l: 160, r: 920, top: 700, bot: 1500, speed: 0.5 })
      const k = pop01(t, t - lt + 0.5, 0.4, 1.8)
      if (k > 0.01) {
        const Fa = signChar(x, t, 'aries', 540, 1100, 320 * k, { mood: 'squint', seed: 40, squash: shiver(lt) })
        drawBits(x, SHORTS, SHORTS_C, 540, Fa.cy + 170, 14 * k)
      }
      label(x, 780, 900, '-5° · SHORTS', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 36, bg: '#ff6b5a', rot: 0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
