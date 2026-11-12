// r2t0390: star_talk, SOLO (virgo), "Virgos vs. | a messy desk." (signs3kit social cut, music: lofi · F). Ending: group.
//   nine cards: one pen out of place = code red · brought gloves to your desk · paperclips sorted by mood · a coffee ring
//   got a meeting · labelled the labels · read your desk like a birth chart · crumbs, tweezers · moved one sticky note,
//   Virgo felt it from home · desk finally perfect: velvet rope
//   group ending: "The desk lost. | Virgo always wins."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, confetti, friend, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'virgo', ACC = '#a6e07a', ST = { x: -170 }
// a little desk top the props sit on
function desk(x, k, y = 1060) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  x.fillStyle = INK; x.fillRect(600, y - 6, 370, 40); x.fillStyle = WOOD; x.fillRect(606, y, 358, 28)
  x.fillStyle = INK; x.fillRect(630, y + 28, 18, 150); x.fillRect(922, y + 28, 18, 150)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'One pen out of place. | *Code red.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      desk(x, k)
      for (let i = 0; i < 4; i++) bits(x, 'PEN', 700 + i * 58, 1008, 9 * k, { rot: i === 2 ? Math.PI / 2 - 0.5 : Math.PI / 2 })
      if (lt > 0.9) { const fl = Math.floor(lt * 5) % 2; L(x, 785, 720, 'ALERT', 1, fl ? RED : GOLD, -0.05, 48) }
    } },
  { sign: S, cap: 'Saw your desk. | Put on *gloves.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      bits(x, 'GLOVE', F.x + 150, F.cy + 10, 12 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.3 })
      bits(x, 'PAPERS', 800, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      L(x, 800, 720, 'HAZARD ZONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 32)
      bubble(x, 800, 1090, 'oh. oh no.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Sorted the paperclips | *by mood.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const tags = [['CALM', MINT], ['ANGSTY', RED], ['HOPEFUL', GOLD]]
      tags.forEach(([s, c], i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.3, 2.2)
        bits(x, 'CLIP', 690 + i * 110, 880, 12 * k, { rot: (i - 1) * 0.2 })
        L(x, 690 + i * 110, 1010, s, k, c, (i - 1) * 0.06, 22)
      })
      bubble(x, 800, 690, 'much better.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'One coffee ring. | Called *a meeting.*', mood: lt => lt > 1.1 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      desk(x, k)
      if (k > 0.5) { x.save(); x.strokeStyle = '#6b4a3a'; x.lineWidth = 8; x.beginPath(); x.ellipse(785, 1040, 50, 14, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      sheet(x, 790, 790, pop01(t, P.t0 + 0.8, 0.35, 2), { w: 300, h: 230, head: 'MEETING 3PM', headBg: STEEL, headInk: INK, lines: ['agenda:', 'the ring.'], size: 32 })
    } },
  { sign: S, cap: 'Labelled every drawer. | Then *labelled the labels.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 800, 760, 'DRAWER 1', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, -0.03, 34)
      L(x, 800, 860, 'LABEL: “DRAWER 1”', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.03, 28)
      L(x, 800, 960, 'LABEL OF LABEL', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 28)
      L(x, 800, 1060, 'SEE: LABEL', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, 0.04, 26)
    } },
  { sign: S, cap: 'Read your desk | like *a birth chart.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.scale(k, k); x.rotate(lt * 0.3)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#e6dcff'; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
        x.strokeStyle = '#6b62a8'; x.lineWidth = 4
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 60, Math.sin(a) * 60); x.lineTo(Math.cos(a) * 140, Math.sin(a) * 140); x.stroke() }
        x.fillStyle = INK; x.fillRect(-14, -14, 28, 28)
        x.restore()
      }
      L(x, 800, 1070, 'SUN: CLUTTER', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 800, 1150, 'MESSY RISING', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Crumbs in the keyboard? | *Tweezers.* One by one.', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'LAPTOP', 800, 900, 18 * k)
      const left = 9 - Math.floor(clamp((lt - 0.5) / 1.5) * 9)
      x.fillStyle = '#e8b36a'; for (let i = 0; i < left; i++) x.fillRect(700 + (i * 53) % 200, 990 + (i % 3) * 10, 10, 10)
      bits(x, 'TWEEZ', 700 + (left * 53) % 200 + 4, 940 + 6 * Math.sin(t * 10), 9 * k)
      L(x, 800, 720, `CRUMBS: ${left}`, pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'You moved one sticky note. | Virgo *felt it.*', mood: lt => lt > 1.1 ? 'wide' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lt > 0.8 ? 0.35 : 0
      for (let i = 0; i < 3; i++) sheet(x, 690 + i * 100, 820, pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { w: 90, h: 90, bg: ['#ffe76a', PINK, MINT][i], rot: i === 1 ? tilt : 0 })
      L(x, 790, 680, 'MILES AWAY:', pop01(t, P.t0 + 1.0, 0.3, 2), BONE, -0.03, 26)
      L(x, 790, 1000, 'DISTURBANCE DETECTED', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, 0.04, 26)
    } },
  { sign: S, cap: 'Desk finally perfect. | *Nobody touch it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      desk(x, k, 960)
      bits(x, 'PEN', 730, 940, 9 * k); bits(x, 'MUG', 860, 920, 8 * k)
      sparkles(x, t, 790, 880, P.t0 + 0.6, 8, 170, 0.1)
      bits(x, 'ROPE', 785, 1120, 14 * pop01(t, P.t0 + 1.0, 0.35, 2))
      L(x, 790, 700, 'MUSEUM PIECE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0390', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Virgos vs. | *a messy desk.*',
  cameos: CAMEOS,
  group: {
    cap: 'The desk lost. | *Virgo always wins.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
