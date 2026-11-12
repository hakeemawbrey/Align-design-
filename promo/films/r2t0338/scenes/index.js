// r2t0338: star_talk, SOLO (sagittarius), "Sagittarians making plans | *be like.*" (signs3kit social cut, music: lofi · G).
// Ending: lesson (LESSON UNLOCKED, then a last line).
//   planned dinner, booked a flight · "let's hang out" means another continent · two options in the chat, Sag added nine
//   · RSVP'd yes to four parties, same night · the itinerary: "vibes" · packed for a picnic, brought a tent
//   · a five-minute errand, back in six hours · plan B? there is no plan A · running late, arrived with a new friend
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, phone, clock, confetti, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

const ACC = '#ff9a4a'
const PLANE = ['......W.....', '.....WW.....', 'W...WWW.....', 'WWWWWWWWWWWB', 'W...WWW.....', '.....WW.....', '......W.....']
const PLANE_C = { W: CREAM, B: SKYB }
const TENT = ['.....K.....', '....GGG....', '...GGGGG...', '..GGGKGGG..', '.GGGKKKGGG.', 'GGGKKKKKGGG', 'GGKKKKKKKGG', 'BBBBBBBBBBB']
const TENT_C = { G: '#5fd068', K: '#1f5a30', B: '#7a4a2e' }
const BASKET = ['..KKKKK..', '.K.....K.', 'RWRWRWRWR', 'WRWRWRWRW', 'RWRWRWRWR', '.RWRWRWR.']
const BASKET_C = { K: '#7a4a2e', R: RED, W: CREAM }

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Planned dinner. | Booked *a flight.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 800, 820, 340, 200, pop01(t, P.t0 + 0.3, 0.35, 2), 0.05, x => { x.fillStyle = ACC; x.fillRect(-170, -100, 340, 54); lines(x, ['BOARDING PASS'], { size: 28, y: -73, font: MONO, weight: 700 }); lines(x, ['DINNER → ?'], { size: 40, y: 20 }); lines(x, ['gate: now'], { size: 24, y: 70, font: MONO, weight: 700, color: '#6b62a8' }) })
      drawBits(x, PLANE, PLANE_C, lerp(640, 960, prog(lt, 1.0, 2.4)), lerp(1060, 980, prog(lt, 1.0, 2.4)), 14 * pop01(t, P.t0 + 1.0, 0.3, 2), { rot: -0.15 })
    } },
  { sign: S, cap: '“Let’s hang out” means | *another continent.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 340, 300, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => {
        x.fillStyle = '#5fd068'; x.beginPath(); x.ellipse(-70, -30, 70, 50, 0.3, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(80, 40, 60, 70, -0.4, 0, Math.PI * 2); x.fill()
        x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-90, -30); x.quadraticCurveTo(0, -140 * clamp((lt - 0.5) / 1.0) - 10, 90 * clamp((lt - 0.5) / 1.0), 40); x.stroke(); x.setLineDash([])
        if (lt > 1.5) { x.fillStyle = RED; x.fillRect(80, 30, 22, 22) }
      }, '#6fc3ff')
      if (lt > 1.5) L(x, 800, 1080, 'MEET YOU THERE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Chat had two options. | Sag *added nine.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ops = ['café', 'park', '+ volcano?', '+ road trip', '+ circus']
      phone(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'PLANS: 11', headCol: ACC, rows: ops.map((o, i) => [o, i < 2 ? GREY : MINT, pop01(t, P.t0 + 0.4 + i * 0.28, 0.25, 2.2), i >= 2]) })
    } },
  { sign: S, cap: 'Said yes to four parties. | *Same night.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = RED; x.fillRect(-160, -180, 320, 64); lines(x, ['SAT 8PM'], { size: 36, y: -148, color: CREAM })
        ;['party A', 'party B', 'party C', 'party D'].forEach((p, i) => { if (lt > 0.4 + i * 0.3) { x.fillStyle = [GOLD, PINK, MINT, LAV][i]; x.fillRect(-130, -90 + i * 66, 260, 52); lines(x, ['✓ ' + p], { size: 30, y: -64 + i * 66, font: MONO, weight: 700 }) } })
      })
    } },
  { sign: S, cap: 'The itinerary? | *“Vibes.”*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 320, 300, pop01(t, P.t0 + 0.25, 0.35, 2), -0.05, x => {
        lines(x, ['ITINERARY'], { size: 34, y: -110 })
        x.fillStyle = '#c9cde0'; x.fillRect(-120, -70, 240, 3)
        if (lt > 0.9) lines(x, ['vibes.'], { size: 72, y: 20, font: "'EB Garamond', Georgia, serif", weight: 500 })
        if (lt > 1.5) lines(x, ['(that’s it)'], { size: 24, y: 100, font: MONO, weight: 700, color: '#6b62a8' })
      })
      sparkles(x, t, 800, 880, P.t0 + 0.95, 7, 170, 0.2)
    } },
  { sign: S, cap: 'Packed for a picnic. | *Brought a tent.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 660, 1060, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, TENT, TENT_C, 800, 880, 22 * pop01(t, P.t0 + 0.8, 0.35, 2))
      if (lt > 1.5) L(x, 820, 640, 'STAYING A WEEK', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.05, 32)
    } },
  { sign: S, cap: 'Five-minute errand. | *Back in six hours.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const m = Math.floor(clamp((lt - 0.4) / 1.6) * 360)
      clock(x, 800, 830, 130, pop01(t, P.t0 + 0.2, 0.35, 2), 1 + Math.floor(m / 60), m % 60)
      L(x, 800, 1060, lt > 1.6 ? 'BACK! (6 HRS)' : 'BRB 5 MIN', pop01(t, P.t0 + 0.5, 0.3, 2), lt > 1.6 ? RED : MINT, 0.04, 34, lt > 1.6 ? CREAM : INK)
    } },
  { sign: S, cap: 'Plan B? | There *was no plan A.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 800, 800, 260, 160, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => lines(x, ['PLAN A'], { size: 48, font: MONO, weight: 700 }))
      if (lt > 0.9) { const p = clamp((lt - 0.9) / 0.3); x.save(); x.globalAlpha = 1 - p; card(x, 800, 800, 270, 170, 1, -0.04, null, '#140c30'); x.restore() }
      if (lt > 1.2) L(x, 800, 800, '404: NOT FOUND', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 34, CREAM)
      if (lt > 1.6) bubble(x, 800, 1040, 'we’ll wing it!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Running late? | Arrives *with a new friend.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 800, 930, 220 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 560, 620, 'this is Kevin!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (lt > 1.5) bubble(x, 820, 720, 'hi!!', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 40, tail: 'bc', col: MINT })
    } },
]

const F = makeFilm({
  id: 'r2t0338', key: 'G', accent: ACC, solo: 'sagittarius', ending: 'lesson',
  title: 'Sagittarians making | plans *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Plans? | *Adventures.*', mood: 'sparkle' },
  lesson: { text: 'Their plans get wild. | *Go anyway.*', chip: 'ADVENTURE: BOOKED' },
  last: {
    text: 'Bring snacks. | *And a passport.*',
    draw(x, t, lt) { confetti(x, t, 540, 1100, t - lt + 0.4, { n: 20, spread: 360, h: 560 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
