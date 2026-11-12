// r2a0300: star_advice, ADVICE ROLL CALL, "Each sign's best | *compliment.*" (topic: Each sign's best compliment) (~54 s, lofi · G)
// Twelve signs in zodiac order: the compliment that lands hardest for each, and what it does to them. Ending: group.
//   0.0–3.6    "Each sign's best | *compliment.*"
//   3.6–49.2   ♈ "you're fearless" (speed +200%) · ♉ "your taste is impeccable" · ♊ "you're so fun to talk to"
//              · ♋ "your home feels like a hug" · ♌ "you light up every room" (the room's lights pop on)
//              · ♍ "thank you for remembering that" · ♎ "you always know what to wear" · ♏ "I trust you" (vault opens)
//              · ♐ "life with you is an adventure" · ♑ "I'm proud of you" (smile: suppressed) · ♒ "one of a kind"
//              · ♓ "your heart is beautiful" (happy tears)
//  49.2        "Say it out loud. | *It lands.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = GOLD, RED = '#e23d4e', CREAM = '#fff4e2'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.WWWWWWWW.', '.WBWHHWBW.', '.WWWHHWWW.', '.WWWDDWWW.', '.WWWDDWWW.']
const PLANT = ['..G.G..', '.GGGGG.', 'GGgGgGG', '.GGGGG.', '..GGG..', '.KKKKK.', '.KRRRK.', '.KRRRK.', '..KKK..']
const COMPASS = ['..KKKKK..', '.KWWWWWK.', 'KWWWRWWWK', 'KWWRRRWWK', 'KWWWKWWWK', 'KWWWBWWWK', 'KWWWBWWWK', '.KWWWWWK.', '..KKKKK..']
const KEY = ['.YYY.......', 'Y...Y......', 'Y...YYYYYYY', 'Y...Y...Y.Y', '.YYY.......']

const CAMEOS = [
  { sign: 'aries', cap: '“You’re *fearless.*” | Watch them run a lap.', mood: 'sparkle', star: ST, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re fearless.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 900, 'SPEED: +200%', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 36)
      sparkles(x, t, 370, 860, P.t0 + 1.2, 7, 180, 0.4)
    } },
  { sign: 'taurus', cap: '“Your taste is | *impeccable.*”', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, { G: '#4ac77d', g: '#2f9a5a', K: INK, R: '#c96a3a' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 640, 'love your place.', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 1100, 'TASTE: CONFIRMED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: '“You’re *so fun* | to talk to.”', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you’re so fun | to talk to!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 900, 'okay so ANYWAY—', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: GOLD, tail: 'br' })
      L(x, 790, 1080, 'NEW TOPICS: 14', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 32)
    } },
  { sign: 'cancer', cap: '“Your home feels | like a *hug.*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOUSE, { R: RED, W: BONE, B: SKYB, H: PINK, D: '#8a4a2e' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 760, P.t0 + 0.8, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 3 })
      L(x, 790, 1100, 'GUESTS: STAYING', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: '“You light up | *every room.*”', mood: 'sparkle', star: ST, hops: [1.0],
    back(x, t, lt, P) {
      const on = clamp((lt - 0.9) / 0.3)
      if (on > 0) { x.save(); x.globalAlpha = 0.22 * on; x.fillStyle = '#fff1b0'; x.fillRect(110, 480, 860, 740); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you light up | every room.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 920, lt > 0.9 ? 'LIGHTS: ON ✦' : 'LIGHTS: DIM', 1, lt > 0.9 ? GOLD : BONE, 0.04, 34)
      sparkles(x, t, 370, 860, P.t0 + 0.9 * 1.29, 9, 200, 0.4)
    } },
  { sign: 'virgo', cap: '“Thank you for | *remembering that.*”', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#ffe76a'; x.fillRect(-142, -142, 284, 284)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        ;['your mum’s', 'birthday ✓', 'your coffee ✓', 'that thing ✓'].forEach((l, i) => x.fillText(l, 0, -84 + i * 56))
        x.restore()
      }
      L(x, 790, 1090, 'NOTICED: EVERYTHING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: '“You always know | *what to wear.*”', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 120, 170, 0, 0, 7); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 110, 160, 0, 0, 7); x.fill()
        x.fillStyle = '#cfefff'; x.beginPath(); x.ellipse(0, 0, 92, 140, 0, 0, 7); x.fill()
        x.restore()
        signChar(x, t, 'libra', 790, 850, 120 * k, { mood: 'wink', seed: 52, glyph: false })
      }
      sparkles(x, t, 790, 820, P.t0 + 1.0, 8, 170, 0.2)
      L(x, 790, 1100, 'OUTFIT: ICONIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'scorpio', cap: '“I *trust* you.” | Highest honour there is.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I trust you.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, KEY, { Y: GOLD }, 790, 880, 18 * pop01(t, P.t0 + 0.8, 0.35, 2), { rot: -0.2 })
      L(x, 790, 1060, 'VAULT: OPEN (FOR YOU)', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: '“Life with you | is an *adventure.*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      drawBits(x, COMPASS, { K: INK, W: CREAM, R: RED, B: SKYB }, 790, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(lt * 4) * 0.25 })
      L(x, 790, 1060, 'BAGS: ALREADY PACKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'capricorn', cap: '“I’m *proud* of you.” | They’ll act normal.', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST, tears: lt => lt > 1.5 ? 1 : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'I’m proud of you.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 860, 'cool. thanks.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
      L(x, 790, 1060, 'SMILE: SUPPRESSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'aquarius', cap: '“There’s nobody | *like you.*”', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2); if (k > 0.01) signChar(x, t, i === 4 ? 'aquarius' : 'capricorn', 680 + (i % 3) * 110, 760 + Math.floor(i / 3) * 130, (i === 4 ? 120 : 80) * k, { mood: i === 4 ? 'sparkle' : 'neutral', seed: 60 + i, glyph: false, alpha: i === 4 ? 1 : 0.35, glow: 0.4 }) }
      L(x, 790, 1080, 'ORIGINAL ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: 'pisces', cap: '“Your heart is | *so beautiful.*”', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'your heart is | so beautiful.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      hearts(x, t, 790, 980, P.t0 + 0.9, { n: 6, life: 1.8, spread: 240, cell: 7, seed: 6 })
      L(x, 790, 1100, 'TEARS: THE HAPPY KIND', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 26)
    } },
]

const F = makeFilm({
  id: 'r2a0300', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s best | *compliment.*',
  cameos: CAMEOS,
  group: { cap: 'Say it out loud. | *It lands.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
