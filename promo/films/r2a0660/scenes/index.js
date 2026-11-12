// r2a0660: star_advice, ADVICE SOLO (virgo), "What Virgos need | *on a bad day.*" (signs3kit social cut, music: lofi · G).
// Nine small, kind things a Virgo needs on a bad day, each with one light gag. Ending: lesson.
//   sit with them, no advice · bring their exact snack · let them vent in bullet points · don't fix it unless asked
//   · "not your fault" · a quiet room, soft lamp · a B+ is fine · wash their mug, don't make it a thing
//   · let them plan tomorrow.   group "Small things. | *Big love.*" · lesson · "Tomorrow is | *a fresh page.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, friend, soap, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'virgo', ST = { x: -180 }

const CAMEOS = [
  { sign: S, cap: 'Skip the advice. | *Just sit with them.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'cancer', 800, 880, 170, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 800, 660, 'ADVICE: 0 · COMPANY: 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Bring their exact snack. | *They’ll notice.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'COOKIE', 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 650, 'INSPECTING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), STEEL, 0.04, 34)
      L(x, 800, 1100, 'CORRECT ONE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Let them vent. | *In bullet points.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'TODAY WAS:', headBg: STEEL, headInk: INK, lines: ['• long', '• loud', '• a lot'], size: 36, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1100, 'HEARD ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: S, cap: 'Don’t fix it. | *Unless they ask.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const away = ease.inCubic(prog(lt, 0.8, 1.3))
      bits(x, 'WRENCH', lerp(800, 1000, away), lerp(860, 600, away), 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 + away * 2, alpha: 1 - away })
      L(x, 800, 860, 'TOOLBOX: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 36)
      bubble(x, 800, 1050, 'thank you.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Tell them | *it’s not their fault.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'not your fault.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 800, 940, 'BELIEVED IT: ALMOST', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 30)
      bubble(x, 800, 1080, 'say it again?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, col: BONE, tail: 'br' })
    } },
  { sign: S, cap: 'A quiet room. | *Soft lighting.*', mood: lt => lt > 1.0 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.globalAlpha = 0.35 * clamp(lt - 0.5); const g = x.createRadialGradient(800, 800, 10, 800, 800, 260); g.addColorStop(0, '#ffe7a8'); g.addColorStop(1, 'rgba(255,231,168,0)'); x.fillStyle = g; x.fillRect(540, 540, 520, 520); x.restore()
      bits(x, 'LAMP', 800, 860, 26 * k)
      L(x, 800, 1100, 'BRIGHTNESS: 30%', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Remind them | *a B+ is fine.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2.2)
      if (k > 0.01) { x.save(); x.translate(800, 850); x.rotate(-0.1); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 120, 0, 7); x.fill(); x.fillStyle = INK; x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('B+', 0, 6); x.restore() }
      L(x, 800, 1090, 'STILL GREAT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Wash their mug. | *Don’t make it a thing.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      soap(x, t, 800, 820, { n: 6, spread: 220, r: 22, h: 200, alpha: clamp(lt - 0.4) })
      L(x, 800, 1090, 'DONE. SHH.', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 38)
    } },
  { sign: S, cap: 'Let them plan tomorrow. | *It helps.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 320, head: 'TOMORROW', headBg: ACC, headInk: INK, lines: ['sleep in', 'try again', ['be gentle', '#c2185b']], size: 36, align: 'left', progress: clamp((lt - 0.3) / 1.1) })
      sparkles(x, t, 800, 860, P.t0 + 1.6, 6, 190, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0660', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'What Virgos need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Small things. | *Big love.*', mood: 'heart' },
  lesson: { text: 'They care for everyone. | *Care for them too.*', chip: 'BAD DAY: SOFTENED' },
  last: { text: 'Tomorrow is | *a fresh page.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
