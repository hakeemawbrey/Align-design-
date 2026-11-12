// r2t0028: star_talk, ROLLCALL, "The signs at a | lantern festival." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme version of themself at a lantern festival. Ending: the group beat.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ let go before the countdown · ♉ didn't let go, took it home · ♊ edited the wish six times
//              · ♋ wished for everyone, ran out of room · ♌ biggest lantern, their face on it · ♍ read the safety leaflet out loud
//              · ♎ still picking a colour, festival's over · ♏ the wish is classified · ♐ followed the lantern two towns over
//              · ♑ wished for a promotion, again · ♒ built their own lantern, it's in orbit · ♓ let it go, cried like it left home
//  49.2        group (the ending): "Twelve lanterns. | *Eleven went up.*"  Eleven little lanterns rise over the photo.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AMBER = '#ffb347', RED = '#e23d4e', CREAM = '#fff4e2'

// ── props: a glowing paper lantern (drawn, so it can carry text or a face)
function lantern(x, t, cx, cy, s, k, { col = AMBER, text = '', face = null, rot = 0, glow = 1, tsize = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  const rr = (w, h, r, c) => { x.fillStyle = c; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, r); x.fill() }
  x.save(); x.shadowColor = col; x.shadowBlur = 50 * glow; x.globalAlpha = 0.55; rr(150, 190, 70, col); x.restore()
  x.fillStyle = INK; x.fillRect(-46, -112, 92, 22); x.fillRect(-46, 90, 92, 22)
  rr(166, 206, 78, INK); rr(150, 190, 70, col)
  x.save(); x.beginPath(); x.roundRect(-75, -95, 150, 190, 70); x.clip()
  x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(-58, -95, 18, 190)
  x.fillStyle = 'rgba(0,0,0,0.13)'; for (let i = -1; i <= 1; i++) x.fillRect(i * 40 - 2, -95, 4, 190)
  x.restore()
  x.fillStyle = '#fff1b0'; x.fillRect(-14, 98, 28, 10)
  if (text) { x.fillStyle = INK; x.font = `800 ${tsize}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, (i - (a.length - 1) / 2) * tsize * 1.15)) }
  x.restore()
  if (face) signChar(x, t, face, cx, cy + 6, 120 * k * s, { mood: 'sparkle', seed: 61, glyph: false, glow: 0.3 })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Let go | *before the countdown.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.4, 2.2))
      lantern(x, t, 800, lerp(920, 680, up), 1, pop01(t, P.t0 + 0.15, 0.3, 2), { col: '#ff7a5a' })
      label(x, 790, 1110, '3… 2… GONE', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t let go. | *Took it home.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      lantern(x, t, 760, 880, 1, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#ffd23a' })
      x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(760, 990); x.lineTo(460, 960); x.stroke()
      label(x, 800, 1120, 'IT LIVES HERE NOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Wrote a wish. | *Edited it six times.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const W = ['a cat', 'a trip', 'pizza?', 'a band', 'wings', 'ALL OF IT']
      const n = Math.min(5, Math.floor(Math.max(0, lt - 0.3) / 0.33))
      lantern(x, t, 790, 860, 1.25, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#ffe066', text: W[n], tsize: n === 5 ? 22 : 28 })
      label(x, 790, 1110, `EDIT #${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Wished for everyone. | *Ran out of room.*', mood: 'heart', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      lantern(x, t, 790, 860, 1.65, k, { col: SKYB })
      if (k > 0.5) {
        const n = Math.min(8, Math.floor(clamp((lt - 0.3) / 1.4) * 8))
        x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'
        const N = ['mom', 'dad', 'nan', 'you', 'the dog', 'Sam', 'Jo', '+ all']
        for (let i = 0; i < n; i++) x.fillText(N[i], 790 + ((i % 2) ? 44 : -44), 790 + Math.floor(i / 2) * 36)
      }
      label(x, 790, 1120, 'NEEDS A BIGGER ONE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Biggest lantern there. | *Their face on it.*', mood: 'sparkle', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      lantern(x, t, 790, 840, 1.7, pop01(t, P.t0 + 0.2, 0.35, 2), { col: '#ffb34a', face: lt > 0.5 ? 'leo' : null })
      sparkles(x, t, 790, 840, P.t0 + 0.9, 8, 220, 0.4)
    } },
  { sign: 'virgo', cap: 'Read the safety leaflet. | *Out loud.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-130, -170, 260, 340); x.fillStyle = CREAM; x.fillRect(-122, -162, 244, 324)
        x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAFETY', 0, -124)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 6; i++) x.fillRect(-96, -74 + i * 38, 192 - (i % 3) * 26, 10)
        x.restore()
      }
      bubble(x, 790, 680, '“step one…”', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1110, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking a colour. | *Festival’s over.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const C = [PINK, SKYB, MINT, GOLD], c = C[Math.floor(lt * 3) % 4]
      lantern(x, t, 790, 860, 1.1, pop01(t, P.t0 + 0.2, 0.3, 2), { col: c })
      label(x, 790, 1110, 'LIGHTS: OFF', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Made a wish. | *Won’t tell. Ever.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      lantern(x, t, 790, 860, 1.2, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#c97bff' })
      label(x, 790, 860, 'CLASSIFIED', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: -0.18, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'nice try.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Followed their lantern. | *Two towns over.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 0.3, 2.2))
      lantern(x, t, lerp(760, 900, go), lerp(860, 700, go), lerp(1, 0.6, go), pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#ff9a4a' })
      label(x, 790, 1110, 'NEXT STOP: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Made a wish. | *Promotion. Again.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      lantern(x, t, 790, 860, 1.25, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#9ae6b4', text: 'SENIOR | MANAGER', tsize: 24 })
      label(x, 790, 1110, 'WISH #14 (SAME)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Built their own lantern. | *It’s in orbit.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.6, 2.0))
      lantern(x, t, 800, lerp(900, 690, up), 1, pop01(t, P.t0 + 0.2, 0.3, 2), { col: SKYB })
      if (lt > 0.6) { x.fillStyle = '#ffb34a'; for (let i = 0; i < 4; i++) x.fillRect(785 + (i % 2) * 14, lerp(900, 690, up) + 116 + i * 14 + Math.sin(t * 30 + i) * 4, 12, 12) }
      label(x, 790, 1110, 'SIGNAL: STRONG', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Let it go. | *Cried like it left home.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const up = ease.inOutCubic(prog(lt, 0.3, 2.2))
      lantern(x, t, 800, lerp(900, 640, up), lerp(1, 0.7, up), pop01(t, P.t0 + 0.2, 0.3, 2), { col: LAV })
      bubble(x, 790, 1110, 'call me!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0028', key: 'G', accent: AMBER, ending: 'group',
  title: 'The signs at a | *lantern festival.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve lanterns. | *Eleven went up.*',
    draw(x, t, lt) {
      for (let i = 0; i < 11; i++) {
        const born = 0.9 + i * 0.12, ph = Math.max(0, lt - born)
        const k = pop01(t, t - lt + born, 0.3, 2)
        lantern(x, t, 120 + i * 84, 760 - ph * 60 - (i % 3) * 40, 0.42, k, { col: [AMBER, PINK, SKYB, MINT, GOLD, LAV][i % 6], glow: 0.7 })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
