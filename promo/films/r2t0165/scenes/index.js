// r2t0165: THE SIGNS AS… v3, BE LIKE, "Zodiacs making | small talk be like." (~62 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Zodiacs making | small talk *be like.*"  (batch topic "Zodiacs trying to make small talk", tightened to fit)
//   3.6–49.2   ♈ asked "how are you?", left before the answer · ♉ asked about your weekend, only the food part · ♊ quick
//              chat, three-hour podcast · ♋ met you once, asks after your mom · ♌ "how are you?" got a one-act
//              show · ♍ "nice weather", corrected the forecast · ♎ agreed with everyone, even both sides · ♏ answered
//              with a question · ♐ small talk, booked a trip together · ♑ elevator pitch in an actual elevator · ♒ skipped
//              to the universe · ♓ "how's your day?", cried telling it
//  49.2        "Small talk? | *Never heard of it.*"
//  52.4        LESSON UNLOCKED: "Every chat is | *a door opening.*"  STATUS: CONNECTED
//  58.3        "Aries still hasn’t | *heard the answer.*"  a little Aries dashing past, the reply floating behind.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }

const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '.KKKK.']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const TICKET = ['KKKKKKKKKKKKKK', 'KPPPPPPPKWWWWK', 'KPWWWWPPKWWWWK', 'KPPPPPPPKWWWWK', 'KPWWWPPPKWWWWK', 'KPPPPPPPKWWWWK', 'KKKKKKKKKKKKKK']

/** dust puffs trailing a running star */
function dust(x, t, cx, cy, n = 4) {
  for (let i = 0; i < n; i++) { const ph = (t * 3 + i / n) % 1; x.save(); x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = '#d9d4e8'; x.beginPath(); x.arc(cx - ph * 120 - i * 10, cy - ph * 30, 16 + ph * 20, 0, Math.PI * 2); x.fill(); x.restore() }
}
/** elevator doors (0 closed … 1 open) with a floor display */
function elevator(x, cx, cy, k, open, floor) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -230, 340, 460); x.fillStyle = '#6b7594'; x.fillRect(-160, -220, 320, 450)
  x.fillStyle = '#2a2350'; x.fillRect(-140, -150, 280, 380)
  const w = 140 * (1 - open)
  x.fillStyle = '#c9c9d8'; x.fillRect(-140, -150, w, 380); x.fillRect(140 - w, -150, w, 380)
  x.fillStyle = INK; x.fillRect(-4, -150, 8 * (1 - open), 380)
  x.fillStyle = INK; x.fillRect(-70, -210, 140, 50); txt(x, floor, 0, -184, { size: 34, color: RED, font: MONO, weight: 700 })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked “how are you?” | *Left before the answer.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -150 }, hops: [0.9, 1.2, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 520, 650, 'how are you?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      if (lt > 0.9) dust(x, t, F.x - 120, F.cy + 100)
      bubble(x, 800, 900, 'oh, I’m— | …hello?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: GOLD, tail: 'br' })
      label(x, 790, 1110, 'CONVO: 0.8 SECONDS', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Asked about your weekend. | *Just the food part.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'your weekend?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 780, 860, 'went hiking—', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      bubble(x, 780, 1050, 'but what | did you EAT?', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 38, col: GREEN, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Quick chat. | *Three-hour podcast.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIC, MIC_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const m = Math.floor(prog(lt, 0.3, 2.2) * 179)
      label(x, 790, 680, `ON AIR · ${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, 'EPISODE 1: HI', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Met you once. | *Asks how your mom is.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'how’s your mom?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      bubble(x, 790, 860, 'and her knee?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
      bubble(x, 790, 1020, 'and the cat?!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      label(x, 790, 1150, 'MET: ONCE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '“How are you?” | *Got a one-act show.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.6, 1.0))
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(350, 470); x.lineTo(430, 470); x.lineTo(560, 1170); x.lineTo(220, 1170); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how are you?', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      label(x, 790, 870, 'ACT ONE: “GREAT”', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 990, 'INTERMISSION: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: '“Nice weather.” | *Corrected the forecast.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'nice weather!', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      card(x, 790, 900, 340, 260, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'ACTUALLY:', 0, -90, { size: 30, font: MONO, weight: 700, color: RED })
        txt(x, 'partly cloudy', 0, -30, { size: 34 }); txt(x, 'rain by 4:10', 0, 20, { size: 34 }); txt(x, 'bring a jacket', 0, 70, { size: 30, weight: 700, color: GREEN })
      })
    } },
  { sign: 'libra', cap: 'Agreed with everyone. | *Even both sides.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 640, 660, 'cats!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: GOLD, tail: 'bc' })
      bubble(x, 900, 660, 'dogs!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
      bubble(x, 790, 880, 'so true!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      bubble(x, 790, 1040, 'also so true!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: '“What do you do?” | *Answered with a question.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so, what do you do?', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
      bubble(x, 760, 880, 'why do you ask?', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1080, 'INFO GIVEN: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Five minutes in? | *Booked a trip together.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) drawBits(x, TICKET, { K: INK, P: [GOLD, PINK][i], W: CREAM }, 760 + i * 60, 830 + i * 60, 16 * pop01(t, P.t0 + 0.7 + i * 0.25, 0.3, 2.2), { rot: -0.1 + i * 0.16 })
      bubble(x, 790, 650, 'we should go!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: GOLD, tail: 'bl' })
      label(x, 790, 1090, 'DEPARTS: TOMORROW', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Elevator pitch. | *In an actual elevator.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fl = 1 + Math.floor(prog(lt, 0.2, 2.0) * 11)
      elevator(x, 790, 930, 0.9 * pop01(t, P.t0 + 0.15, 0.35, 2), ease.inOutCubic(prog(lt, 0.0, 0.4)) * (1 - ease.inOutCubic(prog(lt, 2.15, 2.4))), `F${fl}`)
      bubble(x, 560, 640, 'Q3 vision: | three pillars—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      label(x, 790, 1170, 'FLOORS LEFT: 2', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Skipped small talk. | *Asked about the universe.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.2],
    back(x, t, lt, P) {
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + t * 0.5, r = 60 + (i % 4) * 40; x.fillStyle = [BONE, LAV, SKYB, GOLD][i % 4]; x.globalAlpha = clamp(lt - 0.6); x.fillRect(790 + Math.cos(a) * r * 1.4 - 5, 900 + Math.sin(a) * r * 0.6 - 5, 10, 10) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'do you think | stars get lonely?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      label(x, 790, 1100, 'TIME: 9:02 A.M.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“How’s your day?” | *Cried telling them.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'how’s your day?', pop01(t, P.t0 + 0.1, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
      bubble(x, 790, 880, 'a bird waved | at me…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 1090, 'IT WAS BEAUTIFUL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0165', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Zodiacs making | small talk *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Small talk? | *Never heard of it.*' },
  lesson: { text: 'Every chat is | *a door opening.*', chip: 'STATUS: CONNECTED' },
  last: {
    text: 'Aries still hasn’t | *heard the answer.*',
    draw(x, t, lt) {
      const p = ease.inOutCubic(prog(lt, 0.4, 2.6))
      const k = pop01(t, t - lt + 0.3, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'aries', lerp(260, 820, p), 760, 170 * k, { mood: 'sparkle', look: [1, 0], seed: 52, hops: [t - lt + 0.6, t - lt + 0.9, t - lt + 1.2, t - lt + 1.5] }); dust(x, t, lerp(260, 820, p) - 60, 830) }
      bubble(x, 300, 640, 'I’m good, th—', pop01(t, t - lt + 1.2, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
