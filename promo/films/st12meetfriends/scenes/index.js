// st12meetfriends (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E11) · story 0–15.6, then the end card.
//   🔥 HOT TAKE: "Meet their friends *before* month three." (heat 3). ♋ CANCER (pro) vs ♒ AQUARIUS ("i'm a private
//   person"). Behind a little sofa, Aquarius's crew (three small stars) keeps peeking up; at the last line they pop up
//   and wave. THE STARS RULE: you learn a lot from someone's people; go when it feels right.
//   Last line (Cancer): "Meet the *crew*. Learn a lot."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { makeEpisode, R, INK, BONE, r3 } from './hotkit.js'
import { eyesOf } from './props.js'

function shades(x, r, t, T) {
  // Aquarius, the private person: dark pixel shades, pushed up onto the head at their last line
  const e = eyesOf(r), px = e.px
  const up = ease.inOutQuad(prog(t, T.lines[2].t - 0.1, T.lines[2].t + 0.3))
  const y = e.ey - px * 3 - up * px * 9
  for (const sx of [-1, 1]) { R(x, '#000', e.ex + sx * e.dx - px * 4, y, px * 8, px * 6); R(x, '#2b2140', e.ex + sx * e.dx - px * 3, y + px, px * 6, px * 4); R(x, 'rgba(255,255,255,0.7)', e.ex + sx * e.dx - px * 2, y + px, px * 2, px) }
  R(x, '#000', e.ex - e.dx + px * 4, y + px, 2 * e.dx - px * 8, px * 2)
}

const CAN = signStar('cancer'), AQU = signStar('aquarius')
const CREW = [{ ...signStar('leo'), dx: -96, ph: 0.0 }, { ...signStar('pisces'), dx: 0, ph: 0.45 }, { ...signStar('aries'), dx: 96, ph: 0.9 }]

function crew(x, t, T) {
  const cx = 540, sy = 990
  // peeks: each friend bobs up for a beat at its own time; at the last line all three pop up and wave
  const peekAt = [0.4, T.lines[0].t + 0.6, T.lines[1].t + 0.9, T.lines[2].t + 0.5]
  const allUp = ease.outCubic(prog(t, T.last, T.last + 0.35))
  CREW.forEach((c, i) => {
    let up = 0
    peekAt.forEach((p, j) => { if ((j + i) % 3 === 0 || j === 3 - i) { const q = prog(t, p, p + 1.1); up = Math.max(up, Math.sin(Math.PI * q) * 0.7) } })
    up = Math.max(up, allUp)
    const y = sy + 64 - up * 118
    x.save(); x.beginPath(); x.rect(0, 0, 1080, sy + 10); x.clip()
    drawStarChar(x, cx + c.dx * 1.15, y, 150, t, { color: c.color, mood: up > 0.8 ? 'happy' : 'wide', look: [i - 1, 1], seed: 20 + i, hops: allUp > 0 ? [T.last + 0.4 + i * 0.12, T.last + 0.9 + i * 0.12] : null, tips: false })
    x.restore()
  })
  // the sofa back
  R(x, INK, cx - 210, sy - 4, 420, 96); R(x, '#7a4fb8', cx - 204, sy, 408, 86); R(x, '#946ad0', cx - 204, sy, 408, 12)
  for (const dx of [-70, 70]) R(x, '#5f3b96', cx + dx - 3, sy + 18, 6, 64)
  R(x, INK, cx - 236, sy + 20, 40, 190); R(x, '#946ad0', cx - 230, sy + 26, 28, 178)
  R(x, INK, cx + 196, sy + 20, 40, 190); R(x, '#946ad0', cx + 202, sy + 26, 28, 178)
  R(x, INK, cx - 210, sy + 86, 420, 120); R(x, '#6a43a6', cx - 204, sy + 92, 408, 108); R(x, '#8a62c8', cx - 204, sy + 92, 408, 10)
  for (const lx of [-200, 184]) R(x, INK, cx + lx, sy + 206, 16, 94)
  // a pennant over the sofa
  x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = "700 26px 'Space Mono', monospace"
  x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('THE CREW', cx, sy - 190 - Math.sin(t * 2) * 3); x.restore()
  void clamp
}

const EP = makeEpisode({
  id: 'st12meetfriends', numeral: 'S12 E11', duration: 20, key: 'F',
  take: 'Meet their friends *before* month three.', takeAccent: '#9fdcff', heat: 3,
  pro: { tag: '♋ CANCER', color: CAN.color, glyph: CAN.glyph, pitch: 660 },
  con: { tag: '♒ AQUARIUS', color: AQU.color, glyph: AQU.glyph, accent: '#b9f0ff', pitch: 494, prop: shades },
  lines: [
    ['con', 'i’m a *private* person.'],
    ['pro', 'your friends show me who you *really* are.'],
    ['con', '…okay. they *are* pretty great.'],
  ],
  verdict: 'you learn a lot from someone’s people. go when it feels right.',
  last: 'Meet the *crew*. Learn a lot.', lastWho: 'pro',
  moods(ph) {
    if (ph === 'take') return [{ mood: 'wink', look: [1, -1] }, {}]
    if (ph === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 1) return [{ mood: 'sparkle', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [-1, 1] }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'heart', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
  },
  set: (x, t, T) => crew(x, t, T),
  cues: T => [
    ['pop', 0.6, 1174.66, 0.03, 0], ['pop', r3(T.lines[1].t + 1.1), 1318.51, 0.03, 0.2],
    ...[0, 1, 2].map(i => ['pop', r3(T.last + 0.1 + i * 0.1), [784, 988, 1175][i], 0.04, (i - 1) * 0.4]),
  ],
})
void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
