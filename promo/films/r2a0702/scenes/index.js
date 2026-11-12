// r2a0702: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, you're doing | *better than you think.*" (signs3kit
// social cut, music: lofi · F). One sign the whole way: nine things a Sagittarius worries about, each with a warm
// reframe and one light gag. Ending: lesson.
//   ten hobbies = curious · late again, seat still saved · plans fell through, plan B is better · blunt? honesty with a
//   hug · restless at home, rest is an adventure too · passport full, heart too · chart says chaos, friends say joy
//   · the loud laugh is everyone's favourite part · lost track of time, you were living
//   lesson "Free spirit, big heart. | *Keep going.*" · last "Next stop: | *proud of you.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, swapLabel, bits, chart, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', S = 'sagittarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Started ten hobbies? | *That’s called curious.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'HOBBIES', headBg: LAV, headInk: INK, lines: ['guitar', 'pottery', 'french', 'juggling', '+6 more'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.2), rot: -0.04 })
      L(x, 800, 1110, 'CURIOUS, NOT FLAKY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Running late? | *Seat’s still saved.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 700, 960, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'happy', look: [-1, 0] })
      // the empty chair beside the friend
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      x.save(); x.translate(860, 1010); x.scale(k * 1.2, k * 1.2); x.fillStyle = INK; x.fillRect(-56, -110, 112, 20); x.fillRect(-56, -110, 18, 170); x.fillRect(-56, -10, 112, 18); x.fillRect(40, -10, 16, 70); x.fillStyle = '#8a4a2e'; x.fillRect(-50, -104, 100, 10); x.fillRect(-50, -104, 8, 160); x.fillRect(-50, -6, 100, 8); x.restore()
      L(x, 820, 690, 'SEAT: SAVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Plans fell through? | *Plan B is better.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      swapLabel(x, 800, 660, lt, 1.1, 'PLAN A', 'PLAN B ✦', { size: 38, fromBg: STEEL, toBg: GOLD })
      sparkles(x, t, 800, 870, P.t0 + 1.4, 6, 170, 0.5)
    } },
  { sign: S, cap: 'Said it too bluntly? | *Add a hug.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, lt < 1.1 ? 'your haircut | is… a choice' : 'it’s brave | and I love it', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: lt < 1.1 ? STEEL : PINK, tail: 'bl' })
      friend(x, t, 'virgo', 820, 990, 200, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'squint', look: [-1, 0] })
      hearts(x, t, 820, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Restless at home? | *Rest is a trip too.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (lt < 1.1) bits(x, 'BACKPACK', 800, 920, 18 * k)
      else bits(x, 'PILLOW', 800, 940, 18 * pop01(t, P.t0 + 1.1 * 1.29, 0.3, 2))
      swapLabel(x, 800, 680, lt, 1.1, 'PACKING…', 'NAP QUEST', { size: 38, fromBg: GOLD, toBg: LAV })
    } },
  { sign: S, cap: 'Passport full? | *So is your heart.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.translate(800, 870); x.rotate(0.05); x.scale(k * 1.1, k * 1.1)
      x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = '#2f5aa8'; x.fillRect(-142, -182, 284, 364)
      x.fillStyle = CREAM; x.fillRect(-126, -166, 252, 332)
      const cols = [PINK, MINT, GOLD, SKYB, LAV, RED], n = Math.floor(clamp((lt - 0.3) / 1.0) * 9)
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); x.save(); x.translate(-80 + c * 80, -100 + r * 100); x.rotate((i % 2 ? 1 : -1) * 0.2); x.strokeStyle = cols[i % 6]; x.lineWidth = 7; x.strokeRect(-32, -32, 64, 64); x.fillStyle = cols[i % 6]; x.font = '800 30px Inter, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦', 0, 2); x.restore() }
      x.restore()
      hearts(x, t, 800, 700, P.t0 + 1.6, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Chart says chaos? | *Friends say joy.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t * (lt < 1.2 ? 4 : 1))
      L(x, 800, 1060, 'FRIENDS: OBSESSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Laugh too loud? | *It’s everyone’s favourite.*', mood: lt => lt > 0.6 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 0.9, 1.2, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'HA HA HA', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 60, col: GOLD, tail: 'bl' })
      L(x, 800, 930, 'VOLUME: MAX', pop01(t, P.t0 + 0.9, 0.3, 2), BONE, 0.04, 34)
      L(x, 800, 1060, 'SMILES: CONTAGIOUS', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Lost track of time? | *You were living.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? t * 6 : 0 })
      L(x, 800, 1100, 'WORTH IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 38)
      sparkles(x, t, 800, 860, P.t0 + 1.5, 7, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2a0702', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sagittarius, you’re doing | *better than you think.*',
  cameos: CAMEOS,
  group: { cap: 'Wild, warm, | *wonderful.*', mood: 'sparkle' },
  lesson: { text: 'Free spirit, big heart. | *Keep going.*', chip: 'STATUS: THRIVING' },
  last: {
    text: 'Next stop: | *proud of you.*',
    draw(x, t, lt) {
      const p = ease.inOutCubic(prog(lt, 0.6, 3.4))
      bits(x, 'PLANE', lerp(180, 900, p), lerp(1500, 1300, p), 18 * pop01(t, t - lt + 0.5, 0.3, 2), { rot: 1.3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
