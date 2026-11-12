// r2t0702: star_talk, BELIKE, "To-do list done? | Zodiacs *be like.*" (topic: zodiacs when they finish their to-do
// list; signs3kit social cut, music: lofi · E). Twelve signs in zodiac order, each one's most extreme reaction to the
// last tick. Ending: lesson.
//   ♈ done by 9 a.m., started tomorrow's · ♉ one list, a week of treats · ♊ finished it, wrong list · ♋ made a list
//   for you (drink water, rest) · ♌ asked for a standing ovation · ♍ felt lost, made a list of lists · ♎ "is it done
//   done?" · ♏ nobody ever saw it (redacted) · ♐ lost the list, climbed a mountain instead · ♑ laminated it
//   · ♒ wrote it in a made-up language · ♓ wept, it was beautiful
//   lesson "Done is done. | *Rest counts too.*" · last "Tomorrow’s list: | *one nap.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, confetti, fitTitleScenes, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = MINT, ST = { x: -170 }
const tick = (lt, a, n, d = 0.3) => Math.max(0, Math.min(n, Math.floor((lt - a) / d) + 1))
/** a to-do list whose lines get ticked one by one (ticked = n lines) */
function todo(x, cx, cy, k, items, n, { head = 'TO-DO', headBg = MINT, w = 330, rot = -0.04, size = 30 } = {}) {
  sheet(x, cx, cy, k, { w, h: 90 + items.length * size * 1.35 + 20, head, headBg, headInk: INK, lines: items.map((s, i) => i < n ? [`✓ ${s}`, '#1f8a4c'] : `○ ${s}`), size, align: 'left', rot })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Done by 9 a.m. | *Started tomorrow’s list.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      todo(x, 800, 820, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), ['inbox', 'gym', 'taxes', 'move house'], tick(lt, 0.3, 4, 0.2), { head: 'TODAY ✓' })
      L(x, 800, 1150, 'TOMORROW: 60% DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Finished one list. | *A week of treats.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 720, 820, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bits(x, 'COOKIE', 880, 800, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      bits(x, 'MUG', 800, 990, 11 * pop01(t, P.t0 + 0.9, 0.3, 2))
      const d = 1 + Math.min(6, Math.floor(Math.max(0, lt - 0.5) / 0.22))
      L(x, 800, 650, `TREAT DAY ${d}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 36)
    } },
  { sign: 'gemini', cap: 'Finished the list. | *It was the wrong list.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 800, 830, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), ['buy socks', 'learn harp', 'call ???'], tick(lt, 0.3, 3, 0.3), { head: 'LIST #7', headBg: '#ffe76a' })
      L(x, 800, 1080, 'WRONG LIST', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.05, 40)
    } },
  { sign: 'cancer', cap: 'Done early. | *Made a list for you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), ['drink water', 'eat lunch', 'rest a bit', 'text me'], 0, { head: 'FOR YOU ♥', headBg: PINK })
      hearts(x, t, 800, 700, P.t0 + 1.3, { n: 5, life: 1.8, spread: 200, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'One task done. | *Demanded applause.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'applause, | please', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: '#ffd23a', tail: 'bl' })
      L(x, 800, 920, 'TASK: 1 EMAIL', pop01(t, P.t0 + 0.9, 0.3, 2), BONE, 0.04, 34)
      L(x, 800, 1060, 'ENCORE?', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 38)
      sparkles(x, t, 400, 820, P.t0 + 1.0, 7, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'List done. Felt lost. | *Made a list of lists.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), ['make list', 'check list', 'list lists', 'rate lists'], tick(lt, 0.8, 4, 0.25), { head: 'LISTS (1/∞)', headBg: '#ff8fb1' })
    } },
  { sign: 'libra', cap: 'All ticked. | *“But is it done done?”*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: lt => [lt > 1.5 ? -1 : 1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 800, 900, 0.95 * pop01(t, P.t0 + 0.2, 0.3, 2), ['laundry', 'dishes', 'reply'], 3, { head: 'DONE?', headBg: PINK, rot: 0.04 })
      bubble(x, 790, 640, 'done done? | or done?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: BONE, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Finished the list. | *Nobody ever saw it.*', mood: 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 800, 860, 1.05 * k, { w: 330, h: 300, head: 'TO-DO', headBg: '#c97bff', headInk: INK, lines: [], rot: -0.04 })
      const n = Math.floor(clamp((lt - 0.5) / 0.9) * 4)
      x.save(); x.translate(800, 860); x.rotate(-0.04); x.scale(1.05 * k, 1.05 * k)
      for (let i = 0; i < n; i++) { x.fillStyle = INK; x.fillRect(-130, -40 + i * 46, 220 - (i % 2) * 50, 26) }
      x.restore()
      L(x, 800, 1100, 'TOP SECRET', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.05, 38)
    } },
  { sign: 'sagittarius', cap: 'Lost the list. | *Climbed a mountain.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      // a pixel mountain with a little flag on top
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.translate(800, 1060); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 8); x.lineTo(0, -330); x.lineTo(200, 8); x.fill()
      x.fillStyle = '#7a6bb8'; x.beginPath(); x.moveTo(-186, 0); x.lineTo(0, -316); x.lineTo(186, 0); x.fill()
      x.fillStyle = BONE; x.beginPath(); x.moveTo(-58, -218); x.lineTo(0, -316); x.lineTo(58, -218); x.lineTo(20, -236); x.lineTo(0, -214); x.lineTo(-24, -238); x.fill()
      x.fillStyle = INK; x.fillRect(-4, -400, 8, 90); x.fillStyle = GOLD; x.fillRect(4, -398, 60, 36)
      x.restore()
      L(x, 800, 620, 'LIST: ???', pop01(t, P.t0 + 1.3, 0.3, 2.2), BONE, -0.05, 34)
    } },
  { sign: 'capricorn', cap: 'Finished the list. | *Laminated it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sh = lt > 1.0
      if (sh) { x.save(); x.translate(800, 860); x.rotate(-0.03); x.fillStyle = INK; x.fillRect(-192, -192, 384, 384); x.fillStyle = '#d9f6ff'; x.fillRect(-184, -184, 368, 368); x.restore() }
      todo(x, 800, 860, 1.0 * k, ['budget', 'goals', '5-year plan'], 3, { head: 'Q4 ✓', headBg: STEEL, rot: -0.03 })
      if (sh) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#ffffff'; x.translate(800, 860); x.rotate(-0.5); x.fillRect(-30 + 400 * (prog(lt, 1.0, 1.8) - 0.5), -260, 36, 520); x.restore() }
      L(x, 800, 1110, 'LAMINATED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Wrote the whole list | *in a made-up language.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      todo(x, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), ['⟟⏃⌖ ☊⍜', '⏚⟒⍀ ⋔⟟⌇', '⍜⏁ ⏃⌇⌇'], tick(lt, 0.6, 3, 0.35), { head: '⌖⍜-⎅⍜', headBg: SKYB })
      L(x, 800, 1090, 'TRANSLATION: NO', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Last tick. | *Wept. It was beautiful.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      todo(x, 800, 860, 1.0 * pop01(t, P.t0 + 0.2, 0.3, 2), ['wake up', 'water plant', 'one email'], tick(lt, 0.3, 3, 0.25), { head: 'MY LIST', headBg: SKYB })
      bubble(x, 800, 640, 'we did it', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0702', key: 'E', accent: ACC, ending: 'lesson',
  title: 'To-do list done? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Every box | *ticked.*', moods: Array(12).fill('sparkle').map((m, i) => i === 11 ? 'wide' : i === 7 ? 'squint' : m) },
  lesson: { text: 'Done is done. | *Rest counts too.*', chip: 'NEXT TASK: REST' },
  last: {
    text: 'Tomorrow’s list: | *one nap.*',
    draw(x, t, lt) { bits(x, 'PILLOW', 540, 1560, 24 * pop01(t, t - lt + 0.9, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
