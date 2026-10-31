// st13opposites (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E38) · story 0–40.6, then the end card.
//   ❓ "Do *opposite* signs attract?"  ♎ LIBRA teaches ♈ ARIES, her own opposite: on the zodiac wheel, opposite signs
//   sit 180° apart, like Aries and Libra (✦); they share a modality and their elements pair up, fire with air and earth
//   with water (✦); astrologers read them as mirrors (✦); attraction is about people, not signs (♥).
//   Lightbulb: "so you're my mirror. and I look *great*." Last line (Libra): "Opposites *mirror*."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { SIGNS, ELEMENT_COLOR } from '../../wheel.js'
import { EX } from '../../stexplain.js'
import { makeEpisode } from './classkit.js'

const LIB = signStar('libra'), ARI = signStar('aries')
const W = { x: 210, y: 240, r: 130, rl: 172 }       // the wheel, board-relative
const ang = i => Math.PI - i * Math.PI / 6 - Math.PI / 12   // Aries on the left, counterclockwise (the chart convention)
const at = (i, r) => [W.x + Math.cos(ang(i)) * r, W.y + Math.sin(ang(i)) * r]

function wheel(x, t, B, M) {
  const k = clamp(prog(t, M.wheel + 0.6, M.wheel + 1.4))
  if (k <= 0) return
  x.save()
  x.font = "700 26px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  SIGNS.forEach((s, i) => {
    const p = clamp((k * 12 - i) / 1.5)
    if (p <= 0) return
    const [u, v] = at(i, W.rl), hot = i === 0 || i === 6
    const glow = hot ? 0.5 + 0.5 * Math.sin(t * 5 + i) : 0
    x.globalAlpha = p
    if (hot) { x.fillStyle = `rgba(255,226,122,${0.18 + 0.15 * glow})`; x.fillRect(B.x0 + u - 34, B.y0 + v - 20, 68, 40) }
    x.fillStyle = ELEMENT_COLOR[s.el]
    x.fillText(s.name.slice(0, 3).toUpperCase(), B.x0 + u, B.y0 + v + 2)
  })
  x.restore()
  // the other five opposite pairs, dashed, once the modality + elements beat lands
  const e = clamp(prog(t, M.mode + 0.6, M.mode + 1.6))
  if (e > 0) {
    x.save(); x.lineWidth = 3; x.setLineDash([7, 9])
    for (let i = 1; i < 6; i++) {
      const p = clamp(e * 5 - (i - 1))
      if (p <= 0) continue
      const [a, b] = at(i, W.r - 12), [c, d] = at(i + 6, W.r - 12)
      x.globalAlpha = 0.45 * p; x.strokeStyle = ELEMENT_COLOR[SIGNS[i].el]
      x.beginPath(); x.moveTo(B.x0 + a, B.y0 + b); x.lineTo(B.x0 + a + (c - a) * p, B.y0 + b + (d - b) * p); x.stroke()
    }
    x.restore()
  }
  // the mirror: a little pixel hand mirror in the middle of the wheel, flashing
  const m = clamp(prog(t, M.mirror + 0.4, M.mirror + 0.7))
  if (m > 0) {
    const cx = B.x0 + W.x, cy = B.y0 + W.y + 62, s = 4
    x.save(); x.globalAlpha *= m
    x.fillStyle = EX.ink; x.fillRect(cx - 7 * s, cy - 9 * s, 14 * s, 16 * s); x.fillRect(cx - 2 * s, cy + 7 * s, 4 * s, 9 * s)
    x.fillStyle = EX.woodLite; x.fillRect(cx - 6 * s, cy - 8 * s, 12 * s, 14 * s); x.fillRect(cx - s, cy + 6 * s, 2 * s, 9 * s)
    x.fillStyle = '#bfe9ff'; x.fillRect(cx - 4.5 * s, cy - 6.5 * s, 9 * s, 11 * s)
    const sh = (t * 1.2) % 2
    if (sh < 1) { x.fillStyle = '#ffffff'; x.fillRect(cx - 4.5 * s + sh * 7 * s, cy - 6.5 * s, 2 * s, 11 * s) }
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'st13opposites', numeral: 'S13 E38', duration: 45, key: 'G',
  q: 'Do *opposite* signs attract?', qAccent: EX.chalkPink,
  teacher: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, pitch: 587.33 },
  student: { tag: '♈ ARIES', color: ARI.color, glyph: ARI.glyph, pitch: 783.99 },
  board: { title: 'OPPOSITE SIGNS' },
  script: [
    { who: 's', text: 'Libra! people say opposites attract. true?' },
    { who: 't', text: "Here's the wheel. You're here. I'm here.", mark: 'wheel' },
    { who: 't', text: 'Opposite signs sit *180°* apart. Like us.', mark: 'across', tag: { kind: 'astro', x: 470, y: 92 } },
    { who: 's', text: 'wait. YOU are my opposite??', mark: 'wait' },
    { who: 't', text: "We share a mode: we're both *cardinal*.", mark: 'mode', tag: { kind: 'astro', x: 470, y: 236 } },
    { who: 't', text: 'Fire pairs with air. Earth with *water*.', mark: 'elem' },
    { who: 't', text: 'Astrologers read opposites as *mirrors*.', mark: 'mirror', tag: { kind: 'astro', x: 470, y: 336 } },
    { who: 't', text: 'But attraction is about *people*, not signs.', mark: 'tip', tag: { kind: 'tip', x: 470, y: 432 } },
    { who: 's', text: "so you're my mirror. and I look *great*.", mark: 'bulb' },
  ],
  bulb: 'bulb',
  chalk: [
    { circle: [W.x, W.y, W.r], at: 'wheel+0.2', dur: 0.8 },
    { draw: wheel },
    { line: [at(0, W.r - 10), at(6, W.r - 10)], at: 'across+0.3', dur: 0.6, color: EX.chalkYellow, width: 7 },
    { text: '180°', x: W.x + 4, y: W.y - 62, at: 'across+0.8', size: 30, color: EX.chalkYellow, align: 'center', cps: 14 },
    { text: '*180°* APART', x: 470, y: 36, at: 'across+0.5', size: 30 },
    { text: 'MODE: *CARDINAL*', x: 470, y: 136, at: 'mode+0.5', size: 30 },
    { text: 'FIRE+AIR EARTH+WATER', x: 470, y: 180, at: 'elem+0.4', size: 24, color: EX.chalkBlue },
    { text: '= *MIRRORS*', x: 470, y: 280, at: 'mirror+0.5', size: 30 },
    { text: 'PEOPLE, NOT SIGNS', x: 470, y: 380, at: 'tip+0.5', size: 26, color: EX.chalkPink },
  ],
  recap: ['Opposites: *180°* apart', 'Same mode, *paired* elements', 'Attraction is about *people*'],
  last: 'Opposites *mirror*.', lastWho: 't',
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [1, 0] }
      if (ph === 'bulb') return { mood: 'eyeroll' }
      if (t >= M.wait - 0.05 && t < M.mode) return { mood: 'wink', look: [1, 0] }
      if (ph === 'q' || ph === 0) return { mood: 'neutral', look: [1, 0] }
      return { mood: 'neutral', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'wide', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, 0] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, 0] }
    if (t >= M.wait - 0.05 && t < M.mode) return { mood: 'wide', look: [-1, 0], squash: 0.08 }
    return { mood: 'neutral', look: [-1, -1] }
  },
  cues: (T, M) => [['pop', +(M.wait).toFixed(3), 1174.66, 0.04, 0.3], ['tick', +(M.mirror + 0.5).toFixed(3), 0.05]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
