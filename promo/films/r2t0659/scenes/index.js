// r2t0659: star_talk, SOLO (capricorn), "Capricorns on a trip | *be like.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine trip moments, each the most extreme (and lovable) Capricorn version.
//   packed three months early · laminated the itinerary · airport four hours early · still answering work email
//   · a snack budget spreadsheet · beach relaxing, 2:15 to 2:30 · the tour guide quit, Capricorn took over
//   · souvenir: a receipt folder · home a day early, to rest before work
// Ending: callback. group "Vacation? | *Mission complete.*", then "Last item on the list? | *Have fun.*" (the itinerary).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Packed for June. | *In March.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'TRIP: IN 3 MONTHS', pop01(t, P.t0 + 0.8, 0.3, 2.2), STEEL, 0.04, 32)
      L(x, 800, 1100, 'PACKED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Printed the itinerary. | *Then laminated it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'ITINERARY', headBg: ACC, headInk: INK, lines: ['6:00 wake up', '6:05 coffee', '6:07 joy'], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      if (lt > 1.4) { x.save(); x.globalAlpha = 0.35 + 0.15 * Math.sin(t * 6); x.fillStyle = '#ffffff'; x.fillRect(915, 700, 30, 300); x.restore() }
      L(x, 800, 1100, 'LAMINATED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'At the airport | *four hours early.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLANE', 820, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOCK', 800, 900, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1090, 'GATE: NOT EVEN OPEN', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: S, cap: 'On vacation. | *Still replying to emails.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1080, 'OUT OF OFFICE (NOT)', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, -0.04, 30)
      bubble(x, 800, 660, `inbox: ${Math.max(0, 40 - Math.floor(lt * 20))}`, pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: BONE, tail: 'bl', font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Made a spreadsheet | *for the snacks.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 320, head: 'SNACK BUDGET', headBg: GOLD, headInk: INK, lines: ['chips: 2', 'gum: 1', ['mango: OVER', '#c2185b']], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1100, 'EMERGENCY MEETING', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Beach day! | *Relaxing: 2:15 to 2:30.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'UMB', 800, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1060, `RELAX TIMER: ${Math.max(0, 15 - Math.floor(lt * 6))} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: S, cap: 'The tour guide quit. | *Capricorn took over.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P, F) {
      bits(x, 'MEGA', F.x + 190, F.cy - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      bubble(x, 800, 650, 'keep up, people!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
      L(x, 800, 1090, 'TOUR: 6 MIN AHEAD', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Their souvenir? | *A receipt folder.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bits(x, 'CLIP', 860, 770, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1090, 'FILED BY DATE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Home a day early. | *To rest before work.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'RECOVERY DAY', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.04, 36)
      L(x, 800, 1090, 'ALARM: SET ANYWAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0659', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorns on a trip | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Vacation? | *Mission complete.*', mood: 'sparkle' },
  last: {
    text: 'Last item on the list? | *Have fun.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 330, 1100, 270 * k, { mood: lt > 1.5 ? 'heart' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.55] })
      sheet(x, 760, 1100, pop01(t, t0 + 0.4, 0.35, 2), { w: 340, h: 330, head: 'ITINERARY', headBg: ACC, headInk: INK, lines: ['pack ✓', 'airport ✓', 'emails ✓', lt > 1.4 ? ['have fun ✓', '#2f8a48'] : 'have fun'], size: 32, align: 'left', rot: 0.04 })
      sparkles(x, t, 760, 1200, t0 + 1.45, 7, 170, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
