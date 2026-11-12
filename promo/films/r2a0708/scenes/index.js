// r2a0708: star_advice, ADVICE SOLO (capricorn), "Capricorn, your | *Monday pep talk.*" (the batch hook, re-split so it fits two lines) (signs3kit social cut, lofi · C).
// One sign the whole way: nine gentle Monday truths for a Capricorn who runs on goals, each with a warm reframe and one
// light gag. Ending: group.
//   5 AM alarm, one snooze approved · a long list, start with one · coffee first, empire second · lunch break, no
//   permission needed · inbox at 200, it can wait an hour · let someone carry one box · slow climb, still climbing
//   · laughed at work, healthy · log off on time, goals keep overnight
//   group "You’ve got this. | *Gently.*" 
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', S = 'capricorn', ST = { x: -190 }

/** a pixel mountain with a flag on top and a tiny climber star partway up (p 0…1) */
function mountain(x, t, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-190, 150); x.lineTo(0, -170); x.lineTo(190, 150); x.closePath(); x.fill()
  x.fillStyle = '#6f7590'; x.beginPath(); x.moveTo(-176, 142); x.lineTo(0, -154); x.lineTo(176, 142); x.closePath(); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(-50, -70); x.lineTo(0, -154); x.lineTo(50, -70); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(-4, -230, 8, 80); x.fillStyle = RED; x.fillRect(4, -228, 50, 30)
  x.restore()
  friend(x, t, S, cx + lerp(-130, -30, p) * k, cy + lerp(110, -80, p) * k, 80, k, { mood: 'happy', seed: 52, look: [1, -1] })
}

const CAMEOS = [
  { sign: S, cap: 'Alarm at five? | *One snooze. Allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.0 ? Math.sin(t * 40) * 0.08 : 0 })
      L(x, 800, 660, '5:00 AM', pop01(t, P.t0 + 0.3, 0.3, 2), CREAM, 0.05, 40)
      L(x, 800, 1100, 'SNOOZE: APPROVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Long list today? | *Start with one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 360, head: 'MONDAY', headBg: ACC, headInk: INK, align: 'left', size: 28,
        lines: [lt > 1.3 ? ['✓ one thing', '#2f8f57'] : '• one thing', '• the rest', '• the rest', '• the rest…'] })
      L(x, 800, 1110, 'ONE DONE. NICE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Coffee first. | *Empire second.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 860, { n: 3, h: 140 })
      L(x, 800, 680, 'POWER: LOADING', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.05, 32)
    } },
  { sign: S, cap: 'Lunch break? | *No permission needed.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SANDWICH', 800, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      swapLabel(x, 800, 690, lt, 1.0, 'EAT AT DESK?', 'EAT OUTSIDE ☀', { size: 34, fromBg: STEEL, toBg: GOLD })
      L(x, 800, 1100, 'THE WORK WILL WAIT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Inbox at two hundred? | *It can wait an hour.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'INBOX: 200', pop01(t, P.t0 + 0.4, 0.3, 2), RED, 0.05, 38)
      L(x, 800, 1110, 'YOU: STILL FINE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Let someone help. | *Even one box.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const give = ease.inOutCubic(clamp((lt - 0.9) / 0.6))
      for (let i = 0; i < 3; i++) bits(x, 'BOX', 660 + (i === 2 ? give * 190 : 0), 1060 - i * 70 - (i === 2 ? give * 30 : 0), 13 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      friend(x, t, 'taurus', 870, 1000, 150, pop01(t, P.t0 + 0.5, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      bubble(x, 820, 700, 'i got this one', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: S, cap: 'Slow climb? | *Still climbing.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      mountain(x, t, 780, 940, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(clamp((lt - 0.4) / 1.6)))
      L(x, 800, 1130, 'PROGRESS: REAL', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Laughed at work today? | *Healthy, actually.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: ST, hops: [0.9, 1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'HA!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 80, tail: 'bl' })
      L(x, 800, 1000, 'WORK: STILL DONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 32)
      sparkles(x, t, 800, 760, P.t0 + 0.85, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Log off on time. | *Goals keep overnight.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shut = clamp((lt - 0.6) / 0.5)
      bits(x, 'LAPTOP', 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: 1 - 0.6 * shut })
      bits(x, 'MOON', 820, 700, 16 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 800, 1110, 'OFFLINE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2a0708', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, your | *Monday pep talk.*',
  cameos: CAMEOS,
  group: {
    cap: 'You’ve got this. | *Gently.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
