// r2t0183: star_talk, SOLO, "Aries with a secret | be like." (topic: Aries keeping a secret) (~50 s vertical, signs3kit social cut, music: lofi · G)
// One sign (solo, 9 cards): Aries has never held a secret longer than a sneeze. Ending: group.
//   held it four seconds · told the birthday person about their surprise party · lips sealed, face screaming
//   · "hint: it's a puppy" · told the crush their friend likes them · texted "can't tell u" + the secret · pressure 99%
//   · whispered it through a megaphone · asked to keep a secret: "no thanks"
//   group (the ending) "Zero secrets. | *All heart.*"  (Aries winks)
import { prog, ease, clamp } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const S = 'aries', L = { x: -170 }
function megaphone(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.15); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -40); x.lineTo(110, -130); x.lineTo(110, 130); x.lineTo(-130, 40); x.closePath(); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.moveTo(-122, -30); x.lineTo(100, -116); x.lineTo(100, 116); x.lineTo(-122, 30); x.closePath(); x.fill()
  x.fillStyle = BONE; x.fillRect(96, -116, 14, 232)
  x.fillStyle = INK; x.fillRect(-60, 30, 30, 90); x.fillStyle = '#9aa5c4'; x.fillRect(-54, 36, 18, 78)
  x.strokeStyle = GOLD; x.lineWidth = 8
  for (let i = 0; i < 3; i++) { const r = 160 + i * 40 + ((t * 120) % 40); x.globalAlpha = 0.8 - i * 0.25; x.beginPath(); x.arc(40, 0, r, -0.5, 0.5); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Knew the secret | *for four seconds.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(prog(lt, 0.2, 1.3) * 4.99))
      label(x, 790, 720, `HELD: 0:0${s}`, pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 56, bg: s >= 4 ? RED : GOLD, color: s >= 4 ? BONE : INK, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'OKAY SO—', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 60, col: ORANGE, tail: 'bl' })
    } },
  { sign: S, cap: 'Planned the surprise party. | *Told them first.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'cake', 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 650, 'it’s on | friday!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 790, 1090, 'SURPRISE: GONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Lips sealed. | *Face was not.*', mood: 'wide', look: lt => [Math.floor(lt * 4) % 2 ? 1 : -1, 0], star: L, squash: lt => 0.06 * Math.sin(lt * 20),
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x, F.cy + 40); x.scale(k, k); x.fillStyle = INK; x.fillRect(-70, -16, 140, 32); x.fillStyle = BONE; x.fillRect(-64, -10, 128, 20); x.fillStyle = INK; x.fillRect(-4, -16, 8, 32); x.restore() }
      label(x, 790, 760, 'FACE: SCREAMING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 960, 'MOUTH: TAPED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Gave a hint. | *The hint was the answer.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'gift', 790, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 680, 'hint: it’s | a PUPPY.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: S, cap: 'Friend has a crush? | *Told the crush.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.3], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'SHE LIKES | YOU!!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      label(x, 790, 950, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'ACCIDENTALLY', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “can’t tell u.” | *Then told.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '2:14', head: 'SENT', msg: lt > 1.2 ? 'can’t tell u | IT’S TWINS' : 'can’t tell u', bg: ORANGE })
    } },
  { sign: S, cap: 'Kept it in. | *Nearly exploded.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [0, 0], star: L, squash: lt => -0.1 * prog(lt, 0.2, 1.8),
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 1.8)
      meter(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), p, { w: 300, col: p > 0.8 ? RED : GOLD, title: 'SECRET PRESSURE' })
      label(x, 790, 1040, `${Math.round(p * 99)}%`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 56, bg: p > 0.8 ? RED : GOLD, color: p > 0.8 ? BONE : INK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Whispered it. | *Through a megaphone.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.8],
    front(x, t, lt, P) {
      megaphone(x, 690, 860, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1110, '“psst…”', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Asked to keep a secret. | *“No thanks.”*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'can you keep | a secret?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      bubble(x, 760, 920, 'no. don’t.', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 52, col: ORANGE, tail: 'bl' })
      label(x, 790, 1110, 'SELF-AWARE ✓', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0183', key: 'G', accent: '#ff6b5a', solo: S, ending: 'group',
  title: 'Aries with a secret | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Zero secrets. | *All heart.*', mood: 'wink',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
