// r2t0711: star_talk, ROLL CALL, "The signs at | the planetarium." (signs3kit social cut, music: lofi · C, ending: callback)
//   0.0–3.6    "The signs at | *the planetarium.*"  The twelve line up, then the cards start.
//   3.6–49.2   twelve cards (3.8 s each), each sign's most extreme planetarium self:
//              Aries asks them to fast-forward the sky · Taurus reclines and sleeps through Saturn · Gemini asks the
//              stranger "what's your sign?" · Cancer adopts a star and names it Mom · Leo finds their constellation and
//              bows · Virgo spots a star in the wrong place · Libra checks compatibility with every planet · Scorpio only
//              came for the black hole · Sag asks for a ticket to Mars · Capricorn buys the telescope (business expense)
//              · Aquarius stages a protest for Pluto · Pisces sobs when the lights come on
//  49.2        "Twelve signs. | *One sky.*"
//  52.6        callback: "Taurus woke up. | *Saturn left.*"  Saturn drifts away while Taurus still snoozes.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, board, ringed, planet, zzz, ticket, chartWheel, friend, TELESCOPE, TELESCOPE_C, RED, CREAM, ORANGE, VIOLET, NIGHT } from './props.js'

// a dome of little stars, one of them out of line
function starField(x, t, cx, cy, k, { odd = -1, ring = 0 } = {}) {
  if (k <= 0.01) return
  const P = [[-120, -90], [-60, -110], [0, -120], [60, -110], [120, -90], [-90, -30], [-30, -45], [30, -45], [90, -30], [-50, 30], [50, 30], [0, 70]]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  P.forEach(([a, b], i) => {
    const off = i === odd ? [26, 34] : [0, 0]
    x.fillStyle = i === odd ? '#fff1a0' : BONE
    const s = 8 + 3 * Math.sin(t * 3 + i)
    x.fillRect(a * 1.6 + off[0] - s / 2, b * 1.6 + off[1] - s / 2, s, s)
  })
  if (ring > 0.01) { x.strokeStyle = RED; x.lineWidth = 6; x.globalAlpha = clamp(ring); x.beginPath(); x.arc(P[odd][0] * 1.6 + 26, P[odd][1] * 1.6 + 34, 40, 0, Math.PI * 2 * clamp(ring)); x.stroke() }
  x.restore()
}
// a swirling black hole
function blackHole(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) { x.strokeStyle = [VIOLET, '#7a4ac0', PINK, LAV][i]; x.lineWidth = 12 - i * 2; x.beginPath(); x.ellipse(0, 0, 160 - i * 26, 70 - i * 10, t * (0.8 + i * 0.3), 0, Math.PI * 1.5); x.stroke() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#000'; x.beginPath(); x.arc(0, 0, 48, 0, Math.PI * 2); x.fill()
  x.restore()
}
// connect-the-dots Leo constellation
function constellation(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const P = [[-150, 40], [-90, -10], [-20, -30], [40, -90], [100, -70], [110, -10], [60, 20], [130, 90]]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const n = clamp((lt - 0.3) / 0.9) * (P.length - 1)
  x.strokeStyle = GOLD; x.lineWidth = 5
  x.beginPath(); x.moveTo(P[0][0], P[0][1])
  for (let i = 1; i <= Math.floor(n); i++) x.lineTo(P[i][0], P[i][1])
  if (n < P.length - 1) { const i = Math.floor(n), f = n - i; x.lineTo(lerp(P[i][0], P[i + 1][0], f), lerp(P[i][1], P[i + 1][1], f)) }
  x.stroke()
  P.forEach(([a, b], i) => { const s = 14 + 3 * Math.sin(t * 4 + i); x.fillStyle = INK; x.fillRect(a - s / 2 - 3, b - s / 2 - 3, s + 6, s + 6); x.fillStyle = '#fff1a0'; x.fillRect(a - s / 2, b - s / 2, s, s) })
  x.restore()
}
// a cinema seat that reclines
function seat(x, cx, cy, k, rec) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, 40, 320, 70); x.fillStyle = '#7a2a4a'; x.fillRect(-152, 48, 304, 54)
  x.save(); x.translate(-150, 60); x.rotate(-0.25 - rec * 0.9); x.fillStyle = INK; x.fillRect(-20, -250, 70, 260); x.fillStyle = '#9a3a5e'; x.fillRect(-12, -242, 54, 244); x.restore()
  x.fillStyle = INK; x.fillRect(-140, 110, 20, 60); x.fillRect(120, 110, 20, 60)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked them to | *fast-forward the sky.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, -1], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      board(x, 790, 760, k, { w: 300, h: 200, frame: '#c9c9d8', bg: NIGHT }, x => {
        x.fillStyle = BONE; for (let i = 0; i < 9; i++) { const px = ((i * 47 + t * (lt > 1 ? 900 : 60)) % 340) - 170; x.fillRect(px, -80 + i * 19, lt > 1 ? 60 : 8, 6) }
      })
      label(x, 790, 960, lt > 1.1 ? 'SPEED: 10×' : 'SPEED: 1×', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: lt > 1.1 ? RED : GOLD, color: lt > 1.1 ? CREAM : INK, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'FASTER!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Reclined the seat. | *Slept through Saturn.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: -200, y: -30, s: 260 },
    back(x, t, lt, P) { seat(x, 380, 960, pop01(t, P.t0 + 0.1, 0.3, 2), ease.inOutCubic(prog(lt, 0.4, 0.9))) },
    front(x, t, lt, P, F) {
      if (lt > 0.9) zzz(x, t, F.x + 110, F.cy - 120)
      ringed(x, lerp(980, 760, ease.outCubic(prog(lt, 0.5, 1.6))), 720, 70, pop01(t, P.t0 + 0.5, 0.3, 2))
      label(x, 780, 1110, 'SATURN: MISSED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: LAV, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Turned to a stranger: | *“what’s your sign?”*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      friend(x, t, 'capricorn', 800, 960, 210, k, { mood: lt > 1.3 ? 'wide' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.4] })
      bubble(x, 560, 640, 'what’s | your sign?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 820, 690, '…shh', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc', col: LAV })
    } },
  { sign: 'cancer', cap: 'Adopted a star. | *Named it Mom.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -190 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      note(x, 790, 830, pop01(t, P.t0 + 0.3, 0.35, 2), { title: '✦ CERTIFICATE', lines: ['star no. 1', 'name: MOM', 'loved: yes'], ticks: clamp((lt - 0.8) / 0.9) * 3.01, w: 320, head: SKYB })
      hearts(x, t, 790, 720, P.t0 + 1.3, { n: 5, life: 1.7, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Found their constellation. | *Took a bow.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: { x: -190, y: 40 }, hops: [1.4],
    squash: lt => lt > 1.4 && lt < 2.0 ? 0.14 : 0,
    front(x, t, lt, P) {
      constellation(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 990, '♌︎ THAT’S ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, font: MONO, weight: 700 })
      bubble(x, 790, 1120, 'thank you, thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      sparkles(x, t, 790, 760, P.t0 + 1.4, 7, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Spotted one star | *in the wrong place.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      board(x, 790, 790, k, { w: 400, h: 330, frame: '#7a86b8', bg: NIGHT }, x => starField(x, t, 0, 10, 1, { odd: 7, ring: (lt - 1.0) / 0.5 }))
      label(x, 790, 1060, 'OFF BY 3 INCHES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: '#c7e07a', font: MONO, weight: 700, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Checked compatibility | *with every planet.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.2) * 3.99))
      const PL = [['#ff9ac0', 'VENUS'], ['#ff6b5e', 'MARS'], ['#ffcf7a', 'JUPITER']]
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2)
        planet(x, 680 + i * 120, 760 + (i % 2) * 70, 46, k, { body: PL[i][0], crater: 'rgba(0,0,0,0.15)' })
        if (i < n) label(x, 680 + i * 120, 840 + (i % 2) * 70, '♡', k, { size: 30, bg: PINK, rot: 0 })
      }
      label(x, 790, 1080, '✦ IT’S A MATCH ×3', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Only came | *for the black hole.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      blackHole(x, t, 790, 800, pop01(t, P.t0 + 0.3, 0.4, 2))
      bubble(x, 790, 1060, 'finally. a vibe.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl', col: LAV })
    } },
  { sign: 'sagittarius', cap: 'Asked the guide | *for a ticket to Mars.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      planet(x, 830, 700, 80, pop01(t, P.t0 + 0.2, 0.3, 2), { body: '#ff6b5e', crater: '#c94a3e' })
      ticket(x, 790, 960, pop01(t, P.t0 + 0.8, 0.3, 2.2), 'ADMIT ONE', 'MARS · ONE WAY', { bg: GOLD })
      bubble(x, 520, 640, 'window seat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Bought the telescope. | *Business expense.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TELESCOPE, TELESCOPE_C, 790, 800, 24 * pop01(t, P.t0 + 0.25, 0.35, 2))
      note(x, 790, 1060, pop01(t, P.t0 + 1.0, 0.3, 2.2), { title: 'RECEIPT', lines: ['1 × telescope', 'filed: TAXES'], ticks: clamp((lt - 1.3) / 0.6) * 2.01, w: 330, head: '#c7c0b0', size: 26 })
    } },
  { sign: 'aquarius', cap: 'Started a protest. | *Justice for Pluto.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -200 }, hops: [0.9, 1.5, 2.1],
    front(x, t, lt, P) {
      planet(x, 820, 980, 50, pop01(t, P.t0 + 0.3, 0.3, 2), { body: '#d8c8e8', crater: '#b8a8c8', face: 'sad' })
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(800, 760); x.rotate(0.06 * Math.sin(t * 6)); x.translate(-800, -760); x.fillStyle = INK; x.fillRect(792, 760, 16, 170 * k); label(x, 800, 720, 'PLUTO IS', k, { size: 34, bg: CREAM, rot: 0 }); label(x, 800, 780, 'A PLANET!', k, { size: 34, bg: CREAM, rot: 0 }); x.restore() }
    } },
  { sign: 'pisces', cap: 'Sobbed when | *the lights came on.*', mood: lt => lt > 1.0 ? 'wide' : 'heart', tears: lt => lt > 1.0 ? 3 : 1, star: { x: -170 },
    back(x, t, lt, P) {
      const on = ease.outCubic(prog(lt, 0.9, 1.2))
      if (on > 0.01) { x.fillStyle = `rgba(255,241,200,${(0.16 * on).toFixed(3)})`; x.fillRect(110, 480, 860, 740) }
    },
    front(x, t, lt, P) {
      const on = lt > 0.9
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2); x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(674 + i * 110, 560, 52, 52); x.fillStyle = on ? '#fff1a0' : '#5a5070'; x.fillRect(680 + i * 110, 566, 40, 40); x.restore() }
      label(x, 790, 960, 'SHOW’S OVER', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 38, bg: CREAM, font: MONO, weight: 700, rot: -0.05 })
      bubble(x, 790, 1110, 'it was so | beautiful', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl', col: SKYB })
    } },
]

const F = makeFilm({
  id: 'r2t0711', key: 'C', accent: SKYB, ending: 'callback',
  title: 'The signs at | *the planetarium.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One sky.*' },
  last: {
    text: 'Taurus woke up. | *Saturn left.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      seat(x, 420, 1180, k, 1)
      if (k > 0.01) { signChar(x, t, 'taurus', 470, 1090, 240 * k, { mood: lt > 2.0 ? 'wide' : 'sleepy', seed: 9, glyph: false, hops: [t0 + 2.0] }); if (lt < 2.0) zzz(x, t, 560, 980) }
      ringed(x, lerp(720, 1200, ease.inCubic(prog(lt, 0.8, 3.4))), lerp(1000, 820, prog(lt, 0.8, 3.4)), 70, pop01(t, t0 + 0.5, 0.35, 2))
      bubble(x, 760, 1300, 'bye!!', pop01(t, t0 + 1.2, 0.25, 2.2) * (1 - prog(lt, 2.6, 3.0)), { size: 36, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
