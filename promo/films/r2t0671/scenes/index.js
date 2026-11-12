// r2t0671: star_talk, ROLLCALL, "The signs | *on their commute.*" (signs3kit social cut, music: lofi · C).
// Ending: group (the group beat is the punchline; one last gag: the station clock).
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one commute per sign (3.8 s each):
//              ♈ missed the train, outran it · ♉ breakfast on the bus, three courses · ♊ chatted the whole bus, knows
//              their signs · ♋ brought the driver soup · ♌ the crosswalk is a runway · ♍ laminated the timetable
//              · ♎ two buses came, checked their compatibility · ♏ the seat that sees every exit · ♐ wrong train, on
//              purpose · ♑ answered emails at the bus stop · ♒ commutes by unicycle · ♓ dog on the train, sobbed
//  49.2        "Twelve signs. | *Somehow all late.*"  (the station clock: NEXT TRAIN 2 MIN)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, steam, unicycle, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }

const CAMEOS = [
  { sign: 'aries', cap: 'Missed the train. | *Outran it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TRAIN', 820 + lerp(0, 60, clamp(lt / 2.4)), 900, 16 * k)
      for (let i = 0; i < 3; i++) { x.save(); x.globalAlpha = 0.6 * k; x.fillStyle = BONE; x.fillRect(560 - i * 40 - ((t * 400) % 60), 860 + i * 40, 46, 8); x.restore() }
      L(x, 800, 1110, 'ARRIVED FIRST', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Breakfast on the bus. | *Three courses.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 840, { n: 3, alpha: 0.7 })
      L(x, 800, 680, 'COURSE 2 OF 3', pop01(t, P.t0 + 1.0, 0.3, 2.2), CREAM, 0.04, 34)
      bubble(x, 800, 1110, 'dessert next', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Chatted the whole bus. | Knows *their signs.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ids = ['aries', 'virgo', 'leo', 'pisces', 'libra', 'taurus']
      ids.forEach((id, i) => friend(x, t, id, 650 + (i % 3) * 120, 760 + Math.floor(i / 3) * 170, 110, pop01(t, P.t0 + 0.25 + i * 0.15, 0.3, 2), { mood: 'happy', look: [-1, 0] }))
      L(x, 770, 1110, 'CHARTS MEMORISED: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: 'cancer', cap: 'Brought the bus driver | *homemade soup.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 860, { n: 3, alpha: 0.8 })
      bubble(x, 800, 680, 'you look cold', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'The crosswalk? | A *runway.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -150 }, hops: [0.7, 1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      x.save(); x.globalAlpha = k
      for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(250 + i * 100 - 4, 1046, 68, 38); x.fillStyle = BONE; x.fillRect(250 + i * 100, 1050, 60, 30) }
      x.restore()
    },
    front(x, t, lt, P) {
      L(x, 800, 700, 'WALK ✦ SERVE', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, 0.05, 36)
      sparkles(x, t, 390, 760, P.t0 + 1.0, 7, 170, 0.4)
      bubble(x, 800, 900, 'cameras?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Laminated | the *bus timetable.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 330, head: 'BUS 12', headBg: SKYB, headInk: INK, lines: ['7:42', '7:58', '8:14', '8:30'], size: 34, font: 'monospace', weight: 700, progress: clamp((lt - 0.3) / 0.8) })
      L(x, 800, 1100, 'LAMINATED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: 'libra', cap: 'Two buses came. | Checked their *compatibility.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TRAIN', 790, 750, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { alpha: lt > 1.7 ? 0.35 : 1 })
      bits(x, 'TRAIN', 790, 930, 15 * pop01(t, P.t0 + 0.35, 0.3, 2), { alpha: lt > 1.7 ? 0.35 : 1 })
      L(x, 790, 600, '✦ BUS 12 + BUS 14', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, -0.04, 30)
      L(x, 790, 1110, 'BOTH LEFT', pop01(t, P.t0 + 1.7, 0.3, 2.4), RED, 0.05, 36)
    } },
  { sign: 'scorpio', cap: 'Picked the seat that | *sees every door.*', mood: 'squint', look: lt => [Math.round(Math.sin(lt * 3)), 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SEAT', 800, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'DOORS: 4/4 VISIBLE', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 30)
      L(x, 800, 1130, 'BACK: TO THE WALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), BONE, -0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Took the wrong train. | *On purpose.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      swapLabel(x, 800, 660, lt, 1.0, 'TO: WORK', 'TO: ANYWHERE', { size: 34, fromBg: STEEL, toBg: MINT })
      bubble(x, 800, 1110, 'adventure!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Cleared the inbox | *at the bus stop.*', mood: 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.max(0, 48 - Math.floor(clamp((lt - 0.3) / 1.4) * 48))
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `INBOX (${n})`, headCol: n ? GOLD : MINT, lines: [['replied', BONE, 1, true], ['replied', BONE, lt > 0.8 ? 1 : 0, true], ['archived', BONE, lt > 1.2 ? 1 : 0, true]] })
      L(x, 800, 1120, 'BUS: NOT HERE YET', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Commutes by | *unicycle.*', mood: 'happy', star: { x: -150, y: -90 },
    back(x, t, lt, P) { unicycle(x, t, 390 + Math.sin(t * 3) * 10, 1110, 1.2 * pop01(t, P.t0 + 0.1, 0.35, 2)) },
    front(x, t, lt, P) {
      L(x, 800, 760, 'NOT A PHASE', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, 0.05, 36)
      bubble(x, 800, 1000, 'cars? too normal', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Saw a dog on the train. | *Sobbed.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 2, star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOG', 800, 940, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 820, P.t0 + 0.8, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 2 })
      bubble(x, 800, 690, 'he’s so good', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0671', key: 'C', accent: ACC, ending: 'group',
  title: 'The signs | *on their commute.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve signs. | *Somehow all late.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 1.6, 0.35, 2)
      bits(x, 'CLOCK', 540, 710, 22 * k, { rot: Math.sin(t * 6) * 0.04 })
      L(x, 540, 520, 'NEXT TRAIN: 2 MIN', pop01(t, t - lt + 2.2, 0.3, 2.2), GOLD, -0.04, 34)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
