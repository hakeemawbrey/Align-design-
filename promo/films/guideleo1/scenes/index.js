// guideleo1 (20 s vertical Align ad, Star Talk "Your Star Guide", note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.30  "*Leo*, your star has a note."  ♌ your star in its crown, alone in one spotlight, heart-eyed at itself;
//              a pink star waits in the dark beside it.
//   2.50–6.50  YOUR STAR: "the spotlight's great. share it."  CLUNK: the light widens into two circles, one on the friend.
//              Chip: Leo, fixed fire, ruled by the Sun.
//   6.60–11.55 YOUR STAR: "ask about their day. then ask again."  Leo turns to the friend: "how was your day?" … "and then?"
//              The friend lights up brighter with every question.
//   11.62–15.6 card flip · "Shine *with* them."  Two spotlights, two glowing stars: frame 0, shared.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm, bubble } from './guidefilm.js'
import { drawBits, pop01 } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, clunk: 4.35, fact: [5.3, 4.3],
  l2: 6.6, turn: 8.25, ask1: 8.4, reply: 9.15, ask2: 10.0, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 380, y: 1050, size: 320 }
const PAL = { x: 830, y: 1100, size: 200, c: '#ff8fb1' }
const GROUND = 1230
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

function beam(x, topX, cx, w, a) {
  if (a <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createLinearGradient(0, -100, 0, GROUND + 40)
  g.addColorStop(0, `rgba(255,236,190,${0.17 * a})`); g.addColorStop(1, `rgba(255,190,120,${0.1 * a})`)
  x.fillStyle = g
  x.beginPath(); x.moveTo(topX - 60, -100); x.lineTo(topX + 60, -100); x.lineTo(cx + w, GROUND + 30); x.lineTo(cx - w, GROUND + 30); x.closePath(); x.fill()
  x.translate(cx, GROUND); x.scale(1, 0.2)
  const p = x.createRadialGradient(0, 0, 0, 0, 0, w * 1.15)
  p.addColorStop(0, `rgba(255,214,150,${0.42 * a})`); p.addColorStop(1, 'rgba(255,190,120,0)')
  x.fillStyle = p; x.beginPath(); x.arc(0, 0, w * 1.15, 0, Math.PI * 2); x.fill()
  x.restore()
}

const palGlow = t => lerp(0.15, 0.7, clamp(prog(t, T.clunk, T.clunk + 0.3))) + 0.25 * clamp(prog(t, T.reply, T.reply + 0.4)) + 0.3 * clamp(prog(t, T.ask2 + 0.3, T.ask2 + 0.7))

function mood(t) {
  if (t < T.l1 + 0.6) return { mood: 'heart', look: [0, -1] }
  if (t < T.clunk) return { mood: 'wide', look: [0, 0] }
  if (t < T.turn) return { mood: 'happy' }
  if (t < T.lastLand) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'heart', look: [1, 0] }
}

const film = guideFilm({
  duration: 20, sign: 'leo', n: 1, seed: 3, side: -1,
  hook: '*Leo,* your star | has a note.',
  lines: [{ t: T.l1, text: "the spotlight's great. *share it.*" }, { t: T.l2, text: 'ask about their day. then *ask again.*' }],
  T, fact: 'LEO: FIXED FIRE · RULED BY THE SUN', factY: 1310,
  last: 'Shine | *with* them.', hero: HERO, mood,
  hops: [T.clunk + 0.1, T.ask1, T.ask2],
  back(x, t, S) {
    const k = ease.outCubic(prog(t, T.clunk, T.clunk + 0.35))
    const a = S.ok
    // frame 0: one narrow beam on Leo. CLUNK: it re-aims and a second beam swings onto the friend.
    beam(x, lerp(540, 380, k), HERO.x, lerp(230, 210, k), a)
    beam(x, lerp(380, 700, k), lerp(HERO.x, PAL.x, k), lerp(0, 190, k), a * k)
    if (a <= 0) return
    const m = t < T.clunk ? 'neutral' : t < T.ask1 ? 'wide' : t < T.ask2 + 0.3 ? 'happy' : 'heart'
    drawStarChar(x, PAL.x, PAL.y, PAL.size, t, { color: PAL.c, mood: m, look: [-1, t < T.clunk ? 0 : -1], seed: 6, glow: palGlow(t), alpha: lerp(0.45, 1, clamp(prog(t, T.clunk, T.clunk + 0.3))) * a, hops: [T.clunk + 0.05, T.reply, T.ask2 + 0.35] })
  },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    const cell = Math.round(HERO.size / 36)
    drawBits(x, CROWN, CROWN_C, r.x, r.top + cell * 0.6, cell, { rot: -0.2 + 0.04 * Math.sin(t * 3), alpha: ok })
    // heart-eyed at itself in frame 0: hearts float up off Leo
    for (let i = 0; i < 6; i++) {
      const born = -0.9 + i * 0.3, p = (t - born) / 1.2
      if (p < 0 || p >= 1 || born > T.l1) continue
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, r.x + ((i * 37) % 7 - 3) * 40, r.y - 150 - p * 200, 7, { alpha: Math.sin(Math.PI * p) * ok })
    }
    // the stage-light CLUNK
    if (t > T.clunk - 0.05 && t < T.clunk + 0.7) {
      const p = prog(t, T.clunk - 0.05, T.clunk + 0.7)
      x.save(); x.globalAlpha = 1 - ease.inQuad(prog(p, 0.5, 1)); x.fillStyle = '#f7c948'; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 18; x.font = `800 ${Math.round(80 + 30 * easeOutBack(Math.min(1, p * 4), 2))}px Inter`; x.textAlign = 'center'
      x.translate(700, 640); x.rotate(-0.1); x.fillText('CLUNK!', 0, 0); x.restore()
    }
    // the questions and the answer
    const end = T.close - 0.1
    bubble(x, HERO.x + 30, HERO.y - 300, pop01(t, T.ask1, 0.3, 2.4) * (1 - prog(t, T.ask2 - 0.15, T.ask2)), 'how was your day?', { size: 50, color: '#a3581c', tail: 'bl' })
    bubble(x, PAL.x - 60, PAL.y - 470, pop01(t, T.reply, 0.3, 2.4) * (1 - prog(t, end - 0.25, end)), 'so, my boss…', { size: 52, color: '#a8335f', tail: 'br' })
    bubble(x, HERO.x + 10, HERO.y - 300, pop01(t, T.ask2, 0.3, 2.6) * (1 - prog(t, end - 0.25, end)), 'and then?', { size: 60, color: '#a3581c', tail: 'bl' })
  },
  cues: [
    ['pluck', 0.3, 1174.66, 0.035, 0.5, 0], ['pluck', 0.6, 1567.98, 0.03, 0.5, 0],
    ['boom', T.clunk, 0.12], ['tick', T.clunk, 0.04], ['tick', T.clunk + 0.06, 0.03], ['bell', T.clunk + 0.3, 1760, 0.025, 1.0, 0.3],
    ['pop', T.ask1, 880, 0.035, -0.2], ['pop', T.reply, 987.77, 0.035, 0.3], ['pop', T.ask2, 1174.66, 0.04, -0.2], ['glitter', T.ask2 + 0.3, T.ask2 + 0.9],
  ],
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
