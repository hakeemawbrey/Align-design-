// r2a0757: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, you’re allowed | *to say no.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle permissions for the sign that says yes to everything, each with one light gag.
// Ending: lesson.
//   three trips, one weekend: pick one · your couch misses you · booked solid: leave a gap · a nap counts as an adventure
//   · "no" is a full sentence · there will be other parties · your passport needs a day off · no to them is yes to you
//   · your chart says explorer, not on-call
//   group "Free spirit. | *Free evenings.*"  lesson "Your freedom includes | the *freedom to rest.*"  last "Say no. | *Adventure waits.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, zzz, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }
const strike = (x, cx, cy, w, p) => { if (p <= 0) return; x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - w / 2, cy + 12); x.lineTo(cx - w / 2 + w * clamp(p), cy - 12); x.stroke(); x.restore() }

const CAMEOS = [
  { sign: S, cap: 'Three trips, one weekend? | *Pick one.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const TR = ['BEACH', 'MOUNTAIN', 'CITY']
      TR.forEach((n, i) => { L(x, 800, 700 + i * 150, `✈ ${n}`, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2), i === 1 ? MINT : CREAM, i % 2 ? 0.04 : -0.04, 32); if (i !== 1) strike(x, 800, 700 + i * 150, 260, (lt - 1.1 - i * 0.15) / 0.3) })
      L(x, 800, 1120, 'ONE IS PLENTY', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Said yes to every plan? | Your *couch* misses you.', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 820, 720, 'come home…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      L(x, 800, 1110, 'COUCH: LONELY', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, -0.04, 30)
    } },
  { sign: S, cap: 'Booked solid till spring? | *Leave a gap.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-168, -168, 336, 336); x.fillStyle = BONE; x.fillRect(-160, -160, 320, 320)
        for (let d = 0; d < 20; d++) { const c = d % 5, r = Math.floor(d / 5), free = d === 12 && lt > 1.0; x.fillStyle = free ? MINT : '#c97bff'; x.fillRect(-148 + c * 60, -148 + r * 74, 52, 66) }
        x.restore()
      }
      L(x, 800, 1110, 'FREE: ONE NIGHT', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'A nap counts | as *an adventure.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', star: { x: -190, y: 10 },
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.cy + 120, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9) zzz(x, t, F.x + 90, F.top, { size: 46 })
      L(x, 800, 720, 'QUEST: REST', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 800, 900, 'XP: +100', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.05, 32)
    } },
  { sign: S, cap: '“No” is a full sentence. | *No essay needed.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 810, 830, 1.05 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: MINT, size: 24, lines: [['bungee sat?', BONE, pop01(t, P.t0 + 0.3, 0.2, 2), false], ['no thanks!', '#d9a6ff', pop01(t, P.t0 + 1.0, 0.2, 2), true], ['np, have fun!', BONE, pop01(t, P.t0 + 1.5, 0.2, 2), false]] })
      L(x, 810, 1120, 'SENT. NO SPEECH.', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Skipping one party? | There’ll be *others.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HAT', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 650, 'PARTY TONIGHT', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 800, 1090, 'NEXT ONE: FRIDAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Your passport | needs a *day off too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PASSPORT', 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      if (lt > 0.9) zzz(x, t, 880, 700, { size: 40 })
      L(x, 800, 1110, 'STAMPS: ENOUGH FOR NOW', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 26)
    } },
  { sign: S, cap: 'No to them | is yes *to you.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      swapLabel(x, 790, 820, lt, 0.9, 'YES TO EVERYTHING', 'YES TO ME', { size: 32, fromBg: STEEL, toBg: MINT })
      sparkles(x, t, 790, 820, P.t0 + 1.25, 7, 170, 0.3)
      L(x, 800, 1050, 'BATTERY: 100%', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Your chart says explorer. | Not *on call.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t * 0.3)
      L(x, 800, 1100, 'ON CALL: NEVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#c97bff', -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0757', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sagittarius, you’re allowed | *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Free evenings.*', mood: 'sparkle' },
  lesson: { text: 'Your freedom includes | the *freedom to rest.*', chip: 'BOUNDARY: SET' },
  last: { text: 'Say no. | *Adventure waits.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
