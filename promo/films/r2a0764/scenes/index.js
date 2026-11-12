// r2a0764: star_advice, ADVICE SOLO (capricorn), "How to cheer up | a Capricorn." (signs3kit social cut, lofi · E).
// Ending: callback (card 6's scheduled nap actually happens, on time). Nine kind, slightly silly how-tos.
//   skip "just relax", offer a checklist · say you noticed the hard work · bring snacks, don't make it weird
//   · plan the fun in advance · quiet company counts · put a nap on their calendar · the rare, real laugh
//   · ask about their goals, then listen · remind them they're more than their job
//   group "Serious face. | *Secretly delighted.*"   last "Did it work? | *Napped on time.*"
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, steam, zzz, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'capricorn', ACC = '#2fc79a', ST = { x: -170 }

const CAMEOS = [
  { sign: S, cap: 'Skip “just relax.” | Offer *a checklist.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.6) / 1.2) * 3)
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 330, head: 'TODAY', headBg: ACC, headInk: INK, lines: [[n > 0 ? '✓ tea' : '☐ tea', n > 0 ? '#2f8a48' : INK], [n > 1 ? '✓ walk' : '☐ walk', n > 1 ? '#2f8a48' : INK], [n > 2 ? '✓ feel better' : '☐ feel better', n > 2 ? '#2f8a48' : INK]], size: 34, align: 'left' })
      L(x, 790, 1110, 'MOOD: IMPROVING', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Say you *noticed* | the hard work.', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'i see how hard | you work ♡', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 960, 'EFFORT: NOTICED', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.05, 36)
      sparkles(x, t, 790, 960, P.t0 + 1.2, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Bring snacks. | *Don’t make it weird.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.outCubic(prog(lt, 0.2, 0.7))
      bits(x, 'SANDWICH', lerp(980, 790, p), 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 690, 'oh. thanks.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1090, '(SECRETLY THRILLED)', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Plan the fun | *in advance.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'SATURDAY', headBg: STEEL, headInk: INK, lines: ['10:00 coffee', ['2:00 FUN ✦', '#c0392b'], '2:45 more fun'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 790, 1100, 'SPONTANEOUS? NO.', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Quiet company counts. | *No talking needed.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 820, 980, 190, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bits(x, 'MUG', 620, 1110, 11 * pop01(t, P.t0 + 0.5, 0.3, 2)); bits(x, 'MUG', 960, 1110, 11 * pop01(t, P.t0 + 0.6, 0.3, 2))
      steam(x, t, 620, 1060, { n: 2, h: 80 }); steam(x, t, 960, 1060, { n: 2, h: 80 })
      L(x, 800, 700, 'WORDS SAID: 0 ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.05, 32)
    } },
  { sign: S, cap: 'Put a nap | *on their calendar.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'MEETING', headBg: ACC, headInk: INK, lines: ['3:00 – 3:30', ['NAP (required)', '#c0392b']], size: 32 })
      bits(x, 'PILLOW', 790, 1060, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 620, 'ACCEPTED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Make them laugh. | The *rare, real* one.', mood: lt => lt > 1.1 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.15, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'why did the | goat invest?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 900, 'HA. ok. | good one.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bl', col: MINT })
      L(x, 790, 1100, 'LAUGH: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Ask about their goals. | *Then listen.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-150, -140, 300, 280)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('5-YEAR PLAN', 0, -105)
        const C = ['#9aa5c4', '#6fc3ff', '#2fc79a', '#ffd23a', '#ff9a4a']
        for (let i = 0; i < 5; i++) { const h = 30 + i * 32, g = ease.outCubic(prog(lt, 0.4 + i * 0.18, 0.7 + i * 0.18)); x.fillStyle = C[i]; x.fillRect(-125 + i * 52, 120 - h * g, 40, h * g) }
        x.restore()
      }
      L(x, 790, 1090, 'TALKED FOR AN HOUR', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Remind them they’re | *more than their job.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 360, head: '♑︎ PROFILE', headBg: ACC, headInk: INK, lines: [lt > 1.0 ? ['job: CEO. also:', '#9a9080'] : 'job: CEO', ['kind ♡', '#c0392b'], ['funny', '#c0392b'], ['loyal', '#c0392b']], size: 32, progress: clamp((lt - 0.3) / 1.2) })
      sparkles(x, t, 790, 1000, P.t0 + 1.4, 7, 200, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0764', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'How to cheer up | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Serious face. | *Secretly delighted.*', mood: 'happy' },
  last: {
    text: 'Did it work? | *Napped on time.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.4, 2)
      bits(x, 'PILLOW', 540, 1200, 28 * k)
      if (k > 0.01) signChar(x, t, S, 540, 1090, 300 * k, { mood: 'sleepy', seed: 40 })
      zzz(x, t, 700, 960, { size: 56, alpha: clamp(lt - 0.8) })
      label(x, 790, 1340, '3:00 ✓', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
