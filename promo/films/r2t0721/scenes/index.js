// r2t0721: THE SIGNS AS… v3, "The signs as | game show hosts." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs hosting a game show, each pushed to the extreme. Ending: callback.
//   ♈ asks the question, answers it too · ♉ back after a nap · ♊ hosts two shows at once · ♋ every loser gets a hug
//   · ♌ gave themself the trophy · ♍ the rules are forty pages · ♎ the compatibility round, can't pick a winner
//   · ♏ the mystery box never opens · ♐ the prize is a trip, the host went instead · ♑ invested your cash prize
//   · ♒ every question in binary · ♓ announces the winner, sobs louder
//   group "Twelve hosts. | *Zero contestants.*"
//   last "Sagittarius? | *Still on the trip.*" (the plane comes back past, with a postcard)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffb34a', ST = { x: -170 }, SR = { x: 160 }
const BIGPLANE = [
  '......WW......',
  '......WWW.....',
  'W.....WWWW....',
  'WWWWWWWWWWWWW.',
  'WWWWWWWWWWWWWS',
  'W.....WWWW....',
  '......WWW.....',
  '......WW......',
]

const CAMEOS = [
  { sign: 'aries', cap: 'Asked the question. | Answered it *too.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 640, "what's my sign?", pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const press = lt > 1.0 && lt < 1.25 ? 0.82 : 1
      bits(x, 'BUZZER', 790, 960, 20 * pop01(t, P.t0 + 0.5, 0.3, 2), { sy: press })
      L(x, 790, 820, 'ARIES! (ME)', pop01(t, P.t0 + 1.15, 0.3, 2.4), MINT, 0.05, 36)
      sparkles(x, t, 790, 930, P.t0 + 1.1, 6, 130, 0.3)
    } },
  { sign: 'taurus', cap: 'Round two? | After a *nap.*', mood: lt => lt > 0.6 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'PODIUM', 790, 1010, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 700, 'BACK IN 20 MIN', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.05, 34)
      if (lt > 0.7) zzz(x, t, F.x + 70, F.top - 10, { alpha: clamp((lt - 0.7) / 0.3), size: 46 })
      L(x, 790, 850, 'STILL ROUND 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), STEEL, 0.05, 30)
    } },
  { sign: 'gemini', cap: 'Hosting two shows. | *At once.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: { x: 0, y: 20 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const side = Math.floor(lt * 2.6) % 2
      bits(x, 'MIC', 300, 900, 16 * k, { rot: -0.2 }); bits(x, 'MIC', 780, 900, 16 * k, { rot: 0.2 })
      L(x, 300, 640, 'SHOW A', k, PINK, -0.05, 30); L(x, 780, 640, 'SHOW B', k, SKYB, 0.05, 30)
      bubble(x, side ? 760 : 320, 1100, side ? "we're live!" : 'welcome back!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Every loser | gets a *hug.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', star: { x: -150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.35, 0.35, 2)
      friend(x, t, 'libra', lerp(860, 730, ease.inOutCubic(clamp((lt - 0.9) / 0.5))), 980, 170, k, { mood: lt > 1.4 ? 'heart' : 'neutral', look: [-1, 0] })
      L(x, 790, 700, 'CONSOLATION PRIZE:', pop01(t, P.t0 + 0.6, 0.3, 2.2), STEEL, -0.04, 28)
      L(x, 790, 770, 'ONE (1) HUG', pop01(t, P.t0 + 1.1, 0.3, 2.4), PINK, 0.04, 36)
      hearts(x, t, 640, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Gave themself | the *trophy.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      bits(x, 'TROPHY', lerp(790, F.x + 150, ease.inOutCubic(clamp((lt - 1.0) / 0.4))), lerp(920, F.cy - 20, ease.inOutCubic(clamp((lt - 1.0) / 0.4))), 18 * k)
      L(x, 790, 700, 'AND THE WINNER IS…', pop01(t, P.t0 + 0.25, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 790, 1110, 'THE HOST', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#ffb34a', 0.05, 40)
      sparkles(x, t, F.x + 150, F.cy - 20, P.t0 + 1.4, 7, 140, 0.2)
    } },
  { sign: 'virgo', cap: 'Read the rules. | All *forty pages.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'THE RULES', headBg: '#2fc79a', headInk: INK, lines: ['1. no buzzing', '   early', '2. see rule 1', '3. see page 2'], size: 26, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      swapLabel(x, 790, 1110, lt, 1.4, 'PAGE 1 OF 40', 'PAGE 2 OF 40', { size: 30, fromBg: CREAM, toBg: MINT })
    } },
  { sign: 'libra', cap: "Couldn't pick a winner. | *Tie. Forever.*", mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      friend(x, t, 'aries', 250, 1000, 150, k, { mood: 'sparkle', look: [1, 0] })
      friend(x, t, 'taurus', 830, 1000, 150, k, { mood: 'sparkle', look: [-1, 0] })
      L(x, 540, 600, 'THE COMPATIBILITY ROUND', pop01(t, P.t0 + 0.15, 0.3, 2.2), PINK, -0.03, 30)
      const w = Math.floor(lt * 2.5) % 2 ? 'you win!' : 'no, you!'
      bubble(x, 540, 720, w, pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'The mystery box? | *Never opens.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt > 0.9 && lt < 1.3 ? Math.sin(t * 40) * 0.06 : 0
      bits(x, 'MBOX', 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: shake })
      bubble(x, 790, 650, 'open it? | no.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 790, 1120, 'CONTENTS: A SECRET', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Prize: a dream trip. | Host *went instead.*', mood: 'sparkle', star: SR, hops: [0.6],
    back(x, t, lt, P) {
      const p = prog(lt, 0.9, 2.3)
      if (p > 0 && p < 1) drawBits(x, BIGPLANE, { W: BONE, S: SKYB }, lerp(160, 980, p), 620 - 60 * p, 14, { rot: -0.08 })
    },
    front(x, t, lt, P) {
      L(x, 320, 760, 'GRAND PRIZE: A TRIP', pop01(t, P.t0 + 0.2, 0.3, 2.2), GOLD, -0.05, 30)
      bubble(x, 320, 960, 'be right back!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'br' })
      bits(x, 'SUITCASE', 330, 1110, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
    } },
  { sign: 'capricorn', cap: 'Your cash prize? | *Invested it.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: SR,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(310, 840); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-170, -150, 340, 290)
      x.fillStyle = CREAM; x.fillRect(-160, -140, 320, 270)
      x.fillStyle = INK; x.font = "800 28px Inter, Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR PRIZE', 0, -105)
      const BARS = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a']
      for (let i = 0; i < 4; i++) { const h = 40 + i * 32, g = ease.outCubic(prog(lt, 0.5 + i * 0.2, 0.8 + i * 0.2)); x.fillStyle = BARS[i]; x.fillRect(-120 + i * 64, 110 - h * g, 44, h * g) }
      x.restore()
    },
    front(x, t, lt, P) {
      L(x, 310, 1110, 'PAYOUT: IN 30 YEARS', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#2fc79a', -0.05, 28)
      bubble(x, 720, 640, "you'll thank me", pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Every question: | *in binary.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 270, head: 'QUESTION 1', headBg: '#6fc3ff', headInk: INK, lines: ['0110 1001', '0011 1111'], size: 34, font: "'Space Mono', monospace", weight: 700 })
      bubble(x, 790, 1080, 'anyone? easy one', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Announced the winner. | *Sobbed* louder.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 680, 'YOU WON A CAR!', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.05, 36)
      bits(x, 'CAR', 790, 930, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      confetti(x, t, 790, 900, P.t0 + 0.9, { n: 20, spread: 260 })
      bubble(x, 790, 1110, "i'm SO happy", pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0721', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs as | *game show hosts.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve hosts. | *Zero contestants.*' },
  last: {
    text: 'Sagittarius? | *Still on the trip.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const p = clamp((lt - 0.3) / 2.6)
      if (p > 0 && p < 1) {
        const px = lerp(-120, 1200, p), py = 1060 - 120 * p + 18 * Math.sin(t * 3)
        drawBits(x, BIGPLANE, { W: BONE, S: SKYB }, px, py, 22, { rot: -0.08 })
        friend(x, t, 'sagittarius', px + 20, py - 120, 120, 1, { mood: 'sparkle' })
      }
      L(x, 540, 1300, 'WISH YOU WERE HERE!', pop01(t, t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
