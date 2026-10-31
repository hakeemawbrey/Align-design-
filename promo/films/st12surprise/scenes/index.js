// st12surprise (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E12) · story 0–15.6, then the end card.
//   🔥 HOT TAKE: "Surprise parties are for the *planner*." (heat 4). ♍ VIRGO (pro, clipboard) vs ♌ LEO (crown:
//   "I LOVE SURPRISES"), under a SURPRISE! banner with balloons; Leo's objection fires a confetti cannon.
//   THE STARS RULE: know your person; some love a crowd, some love a quiet dinner.
//   Last line (Virgo): "Surprise them *their* way."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawClipboard, drawCrown, confetti } from './props.js'
import { makeEpisode, R, INK, BONE, GOLD, r3 } from './hotkit.js'

const VIR = signStar('virgo'), LEO = signStar('leo')
const BAL = ['#ff5c8a', '#f2c75c', '#4fd1ff', '#9cf08a', '#c9a6ff']

function party(x, t, T) {
  // bunting + the SURPRISE! banner + balloons on strings
  for (let i = 0; i < 12; i++) {
    const bx = 40 + i * 90, by = 690 + Math.sin(i * 0.9) * 8
    x.fillStyle = INK; x.beginPath(); x.moveTo(bx - 4, by - 4); x.lineTo(bx + 52, by - 4); x.lineTo(bx + 24, by + 52); x.fill()
    x.fillStyle = BAL[i % BAL.length]; x.beginPath(); x.moveTo(bx + 2, by); x.lineTo(bx + 46, by); x.lineTo(bx + 24, by + 40); x.fill()
  }
  R(x, 'rgba(239,230,214,0.5)', 0, 684, 1080, 4)
  const k = t >= T.obj ? 1 : 0.0
  const sw = Math.sin(t * 3) * 0.03
  x.save(); x.translate(540, 830); x.rotate(sw)
  R(x, INK, -230, -48, 460, 96); R(x, '#ff5c8a', -222, -40, 444, 80); R(x, '#ff8fb1', -222, -40, 444, 10)
  x.font = "800 54px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff6e8'
  x.fillText('SURPRISE!', 0, 6)
  x.restore()
  void k
  for (let i = 0; i < 4; i++) {
    const bx = [120, 250, 830, 960][i], by = 960 + Math.sin(t * 1.6 + i) * 14
    R(x, 'rgba(239,230,214,0.5)', bx - 1, by + 44, 2, 160)
    x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 40, 50, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = BAL[(i + 1) % BAL.length]; x.beginPath(); x.ellipse(bx, by, 34, 44, 0, 0, Math.PI * 2); x.fill()
    R(x, 'rgba(255,255,255,0.6)', bx - 18, by - 28, 8, 12)
  }
}

const EP = makeEpisode({
  id: 'st12surprise', numeral: 'S12 E12', duration: 20, key: 'G',
  take: 'Surprise parties are for the *planner*.', takeAccent: '#ff9cc0', heat: 4,
  pro: { tag: '♍ VIRGO', color: VIR.color, glyph: VIR.glyph, accent: '#ffb0cd', pitch: 659,
    prop: (x, r, t, T) => drawClipboard(x, r.x + 132, r.y + 40, 6, { rot: 0.14, page: t >= T.lines[1].t ? 1 : 0, strike: 0 }) },
  con: { tag: '♌ LEO', color: LEO.color, glyph: LEO.glyph, accent: GOLD, pitch: 523,
    prop: (x, r) => drawCrown(x, r.x + 4, r.top + 18, 8, 0.1) },
  lines: [
    ['con', 'I *LOVE* SURPRISES!!'],
    ['pro', 'you love a crowd. some people *don’t.*'],
    ['con', '…okay. but plan *my* party.'],
  ],
  verdict: 'know your person. some love a crowd, some love a quiet dinner.',
  last: 'Surprise them *their* way.', lastWho: 'pro',
  moods(ph) {
    if (ph === 'take') return [{ mood: 'squint', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (ph === 1) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wink', look: [-1, 0] }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'happy', look: [1, 0] }, { mood: 'heart', look: [-1, 0] }]
  },
  set: (x, t, T) => party(x, t, T),
  front(x, t, T) { confetti(x, t, T.obj + 0.1, { x0: 794, y0: 1100, n: 70, spread: 0.7, seed: 12, life: 3.2 }) },
  cues: T => [
    ['boom', r3(T.obj + 0.1), 0.22], ['glitter', r3(T.obj + 0.15), r3(T.obj + 1.4)],
  ],
})
void BONE; void clamp; void prog

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
