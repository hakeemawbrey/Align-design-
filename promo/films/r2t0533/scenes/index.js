// r2t0533: star_talk, SOLO (libra), "Libras making plans | be like." (signs3kit social cut, music: lofi · G).
// Nine cards of the most extreme, most loving Libra planner. Ending: lesson.
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -180 }

const CAMEOS = [
  { sign: 'libra', cap: 'Group chat: “where?” | *Six polls* later…', mood: lt => lt > 1.3 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 5)
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `POLL ${n} OF 6`, headCol: PINK, lines: [['option A', BONE, 1], ['option B', BONE, 1], ['new poll?', GOLD, pop01(t, P.t0 + 1.4, 0.25, 2.2)]] })
    } },
  { sign: 'libra', cap: 'Picked a date. | Plus *five backups.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 380, head: 'THE PLAN', headBg: PINK, headInk: INK, lines: ['A: sat 7pm', 'B: sat 8pm', 'C: sun 2pm', 'D: sun 3pm', 'E: whenever ♡'], size: 28, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
    } },
  { sign: 'libra', cap: 'Made a mood board | for *a coffee.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -170, 340, 340); x.fillStyle = CREAM; x.fillRect(-160, -160, 320, 320)
        const cols = ['#e8c4a0', PINK, '#c9a6ff', '#ffe7a8', '#b5653d', MINT]
        cols.forEach((c, i) => { x.fillStyle = c; x.fillRect(-145 + (i % 3) * 98, -110 + Math.floor(i / 3) * 120, 88, 106) })
        x.fillStyle = INK; x.font = '700 24px monospace'; x.textAlign = 'center'; x.fillText('VIBE: LATTE', 0, -128)
        x.restore()
      }
      bits(x, 'MUG', 800, 1090, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Invited everyone. | Even *the rivals.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 720, 960, 140, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'squint', look: [1, 0], seed: 37 })
      friend(x, t, 'capricorn', 880, 960, 140, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'squint', look: [-1, 0], seed: 38 })
      L(x, 800, 720, 'PEACE TREATY BRUNCH', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 28)
      if (lt > 1.6) hearts(x, t, 800, 900, P.t0 + 1.6, { n: 4, life: 1.2, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'libra', cap: '“You pick!” “No, you!” | *Forty minutes.*', mood: 'wide', look: lt => [Math.sin(lt * 8) > 0 ? 1 : -1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const side = Math.floor(lt * 1.8) % 2
      bubble(x, side ? 820 : 760, side ? 1040 : 720, side ? 'no, YOU pick!' : 'you pick!', lt > 0.3 ? 1 : 0, { size: 36, col: side ? GOLD : PINK, tail: side ? 'br' : 'bl' })
      bits(x, 'CLOCK', 820, 880, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
    } },
  { sign: 'libra', cap: 'Checked if the plans | are *compatible.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: '♎︎ + BRUNCH', headBg: LAV, headInk: INK, lines: ['vibe: ✓', 'venus: ✓', 'table: ?'], size: 32, progress: clamp((lt - 0.4) / 0.9) })
      L(x, 800, 1080, 'IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Confirmed. | *Re-confirmed.* Re-re…', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SATURDAY', headCol: GOLD, lines: [['still on?', PINK, pop01(t, P.t0 + 0.4, 0.25, 2.2), true], ['still on??', PINK, pop01(t, P.t0 + 0.9, 0.25, 2.2), true], ['STILL ON???', PINK, pop01(t, P.t0 + 1.4, 0.25, 2.2), true]] })
    } },
  { sign: 'libra', cap: 'Running late. | Choosing *earrings.*', mood: 'wide', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 3) % 2
      L(x, 720, 820, 'GOLD?', pop01(t, P.t0 + 0.2, 0.3, 2), pick ? STEEL : GOLD, -0.05, 40 + (pick ? 0 : 6))
      L(x, 880, 960, 'SILVER?', pop01(t, P.t0 + 0.4, 0.3, 2), pick ? BONE : STEEL, 0.05, 40 + (pick ? 6 : 0))
      L(x, 800, 1120, 'ETA: 40 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 30)
    } },
  { sign: 'libra', cap: 'The big day? | *Rescheduled.* Lovingly.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 790, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.3) swapLabel(x, 800, 1020, lt, 1.0, 'SAT 7PM', 'SUN?? ♡', { size: 40, fromBg: BONE, toBg: PINK })
    } },
]

const F = makeFilm({
  id: 'r2t0533', key: 'G', accent: ACC, solo: 'libra', ending: 'lesson',
  title: 'Libras making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Plans: made. | *Remade.* Perfect.', mood: 'sparkle' },
  lesson: { text: 'Libras plan so everyone | feels *included.*', chip: 'STATUS: BALANCED' },
  last: { text: 'See you Saturday. | *Or Sunday.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
