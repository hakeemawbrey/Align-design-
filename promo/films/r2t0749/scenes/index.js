// r2t0749: star_talk, SOLO, "Running late? | Aquarians *be like.*" (topic: "Aquarians running late | be like") (~46 s vertical, signs3kit social cut, music: lofi · D).
// One sign the whole way, nine cards, each the most extreme Aquarius way to be late:
//   invented a shortcut (+40 min) · stopped to rescue a snail · "on my way" from bed · on time, wrong day
//   · "time is a construct" · one documentary became six · checked their chart for a better time
//   · built a gadget to be on time (still building) · showed up with snacks for everyone
//  37.8  "Never on time. | *Always worth it.*"   41.2  callback: "Finally here. | *With the snail.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, phone, swapLabel, zzz, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'aquarius', ACC = '#38c4ec', ST = { x: -170 }
const SNAIL = ['....SSSS.....', '...SPPPPS....', '..SPSSSPPS...', '..SPSPPSPS..E', '..SPSSPSPS.E.', '..SPPPPPPS.E.', 'BBBSSSSSSBBBB', 'BBBBBBBBBBBB.']
const SNAIL_C = { S: '#b5743a', P: '#f2c27a', B: '#a8e07a', E: '#a8e07a' }

const CAMEOS = [
  { sign: S, cap: 'Invented a shortcut. | *Added forty minutes.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.5))
      x.save(); x.strokeStyle = ACC; x.lineWidth = 10; x.setLineDash([16, 12]); x.beginPath()
      for (let i = 0; i <= 60 * p; i++) { const u = i / 60, a = u * Math.PI * 5; const px = 790 + Math.cos(a) * (40 + u * 120), py = 860 + Math.sin(a) * (40 + u * 120); i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
      L(x, 790, 640, 'MY SHORTCUT', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 30)
      L(x, 790, 1100, '+40 MIN', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: S, cap: 'Stopped to | *rescue a snail.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 790, 960, 16 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 700, 'RESCUE: COMPLETE', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: S, cap: '“On my way!” | *Still in bed.*', mood: 'sleepy', star: { x: -170, y: 20 },
    back(x, t, lt, P) { bits(x, 'BLANKET', 370, 1010, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'GROUP CHAT', headCol: ACC, lines: [['where r u?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['on my way!!', MINT, pop01(t, P.t0 + 0.9, 0.25, 2), true]] })
      zzz(x, t, 520, 760, { size: 44 })
    } },
  { sign: S, cap: 'Arrived *on time.* | Wrong day.', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 260, head: 'THE PARTY', headBg: PINK, headInk: INK, lines: ['when: SATURDAY', ['today: friday', RED]], size: 30, align: 'left', progress: clamp((lt - 0.4) / 0.9) })
      L(x, 790, 1090, 'EARLY! (BY A DAY)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Late? | *“Time is a construct.”*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      bits(x, 'CLOCK', 790, 880, 24 * k)
      L(x, 790, 1100, 'TIME: OPTIONAL', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
      bubble(x, 790, 640, 'is it, though?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'One documentary. | *Became six.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.min(5, Math.floor(Math.max(0, lt - 0.5) / 0.25))
      L(x, 790, 860, `EPISODE ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), GOLD, 0.03, 34)
      L(x, 790, 1100, 'ALSO: LEAVING SOON', pop01(t, P.t0 + 1.7, 0.3, 2.4), STEEL, -0.04, 28)
    } },
  { sign: S, cap: 'Checked their chart. | *For a better time.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 300, head: 'BIRTH CHART', headBg: '#6b62a8', lines: ['sun: aquarius', 'rising: later', 'arrival: TBD'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.0) })
      L(x, 790, 1100, 'THE STARS SAID WAIT', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Built a gadget | *to be on time.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 790, 880, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: Math.sin(lt * 14) * 0.04 })
      sparkles(x, t, 790, 880, P.t0 + 0.9, 7, 170, 0.5, [SKYB, MINT, BONE])
      L(x, 790, 650, 'STILL BUILDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.05, 34)
    } },
  { sign: S, cap: 'Showed up late | with *snacks for all.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 720 + i * 80, 940 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.3 + i * 0.15, 0.3, 2))
      L(x, 790, 700, 'FORGIVEN ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 38)
    } },
]

const F = makeFilm({
  id: 'r2t0749', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Running late? | Aquarians *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Never on time. | *Always worth it.*', mood: 'sparkle' },
  last: {
    text: 'Finally here. | *With the snail.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.7, 0.4, 2)
      if (k <= 0.01) return
      const A = signChar(x, t, 'aquarius', 540, 1100, 320 * k, { mood: 'sparkle', seed: 71, hops: [t - lt + 1.2] })
      drawBits(x, SNAIL, SNAIL_C, 540, A.top - 50, 13 * pop01(t, t - lt + 1.3, 0.3, 2))
      hearts(x, t, 540, 900, t - lt + 1.5, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
