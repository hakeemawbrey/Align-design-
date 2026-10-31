// st13nodes (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E37) · story 0–40.6, then the end card.
//   ❓ "What are the *lunar nodes*?"  ☽ THE MOON teaches ♏ SCORPIO: the Sun's path (gold) and the Moon's tilted path
//   (blue) cross at two points, the lunar nodes (✓); eclipses happen near them (✓); the nodes slide backwards around the
//   zodiac in about 18.6 years (✓); astrologers read the north node as growth and the south node as comfort (✦).
//   Lightbulb: "south node: couch. north node: the gym." Last line (the Moon): "Grow *toward* your north."
// The engine is ./classkit.js (this folder's copy); the Moon is ./kit.js (copied unchanged from st12sunsign);
// the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { EX } from '../../stexplain.js'
import { MOON, drawMoonChar } from './kit.js'
import { makeEpisode } from './classkit.js'

const SCO = signStar('scorpio')
const EY = 170, AMP = 90, SN = 215, NN = 605, X0 = 10, X1 = 810       // board-relative: ecliptic y, the two nodes' x
const moonY = u => EY + AMP * Math.sin(2 * Math.PI * (u - SN) / 780)
const PATH = Array.from({ length: 41 }, (_, i) => { const u = X0 + (X1 - X0) * i / 40; return [u, moonY(u)] })

function nodes(x, t, B, M) {
  const dot = (u, at, col, label, lx, ly) => {
    const p = clamp(prog(t, at, at + 0.3))
    if (p <= 0) return
    const px = B.x0 + u, py = B.y0 + EY, pulse = 1 + 0.12 * Math.sin(t * 5 + u)
    x.save(); x.globalAlpha *= p
    x.fillStyle = EX.ink; x.beginPath(); x.arc(px, py, 17 * pulse, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(px, py, 12 * pulse, 0, Math.PI * 2); x.fill()
    x.font = "700 28px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = col; x.fillText(label, B.x0 + lx, B.y0 + ly)
    x.restore()
  }
  dot(SN, M.nodes + 0.2, EX.chalkPink, 'SOUTH NODE', SN - 70, EY + 52)
  dot(NN, M.nodes + 0.5, EX.chalkGreen, 'NORTH NODE', NN + 60, EY + 52)
  // a tiny eclipse near the north node: the Moon's disc sliding over the Sun's
  const e = clamp(prog(t, M.eclipse + 0.3, M.eclipse + 1.6))
  if (e > 0) {
    const ex = B.x0 + NN - 4, ey = B.y0 + EY - 66
    x.save()
    x.fillStyle = EX.chalkYellow; x.beginPath(); x.arc(ex, ey, 24, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,226,122,0.35)'; x.beginPath(); x.arc(ex, ey, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#10241f'; x.beginPath(); x.arc(ex - 52 + 52 * e, ey, 23, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  // the nodes drifting backwards: two little chalk arrows riding the gold line, pointing left
  const d = clamp(prog(t, M.slide + 0.4, M.slide + 0.8))
  if (d > 0 && t < M.astro + 0.2) {
    x.save(); x.globalAlpha *= d * clamp(1 - prog(t, M.astro - 0.2, M.astro + 0.2))
    for (const u of [SN, NN]) {
      const ax = B.x0 + u - 40 - ((t * 18) % 30), ay = B.y0 + EY - 26
      x.fillStyle = EX.chalk; x.fillRect(ax, ay - 2, 30, 5)
      for (let k = 0; k < 4; k++) x.fillRect(ax - k * 3, ay - 2 - k * 3, 4, 5 + k * 6)
    }
    x.restore()
  }
}

const EP = makeEpisode({
  id: 'st13nodes', numeral: 'S13 E37', duration: 45, key: 'A',
  q: 'What are the *lunar nodes*?', qAccent: EX.chalkBlue,
  teacher: { tag: MOON.tag, color: MOON.color, pitch: 523.25, size: 230, accent: '#c9c2ff',
    draw: (ctx, X, Y, s, t, o) => { const r = drawMoonChar(ctx, X, Y - 10, s * 0.42, t, o); return { x: r.x, y: r.y, size: s, top: r.top } } },
  student: { tag: '♏ SCORPIO', color: SCO.color, glyph: SCO.glyph, pitch: 698.46 },
  board: { title: 'THE LUNAR NODES' },
  script: [
    { who: 's', text: "everyone says 'north node.' what IS that?" },
    { who: 't', text: "This gold line: the Sun's path in our sky.", mark: 'sun' },
    { who: 't', text: "My path tilts, so it crosses the Sun's twice.", mark: 'cross', tag: { kind: 'sky', x: 820, y: 30, align: 'right' } },
    { who: 't', text: 'Those two crossings are the *lunar nodes*.', mark: 'nodes' },
    { who: 't', text: 'Eclipses happen near them.', mark: 'eclipse', tag: { kind: 'sky', x: 820, y: 292, align: 'right' } },
    { who: 't', text: 'They slide *backwards*. A lap: about 18.6 yrs.', mark: 'slide', tag: { kind: 'sky', x: 820, y: 360, align: 'right' } },
    { who: 't', text: 'Astrologers read the north node as *growth*...', mark: 'astro', tag: { kind: 'astro', x: 820, y: 428, align: 'right' } },
    { who: 't', text: '...and the south node as *comfort*.' },
    { who: 's', text: 'south node: couch. north node: the *gym*.', mark: 'bulb' },
  ],
  bulb: 'bulb',
  chalk: [
    { line: [[X0, EY], [X1, EY]], at: 'sun+0.2', dur: 0.7, color: EX.chalkYellow },
    { text: "SUN'S PATH", x: 300, y: EY - 52, at: 'sun+0.6', size: 26, color: EX.chalkYellow },
    { line: PATH, at: 'cross+0.2', dur: 1.1, color: EX.chalkBlue },
    { text: "MOON'S PATH", x: 290, y: 58, at: 'cross+1.0', size: 26, color: EX.chalkBlue },
    { draw: nodes },
    { text: 'ECLIPSES: NEAR NODES', x: 0, y: 274, at: 'eclipse+0.4', size: 26 },
    { text: 'LAP: ABOUT *18.6* YRS', x: 0, y: 342, at: 'slide+0.5', size: 26 },
    { text: 'N = *GROWTH*  S = COMFORT', x: 0, y: 410, at: 'astro+0.5', size: 26, color: EX.lilac },
  ],
  recap: ['Nodes: where *paths* cross', 'Eclipses happen *near* them', 'Astro: north = *growth*'],
  last: 'Grow *toward* your north.', lastWho: 't',
  moods(t, who, ph, M) {
    if (who === 't') {
      if (ph === 'last' || ph === 'recap' || ph === 'bulb') return { mood: 'happy', look: [1, 0] }
      if (ph === 'q' || ph === 0) return { mood: 'neutral', look: [1, 0] }
      return { mood: 'neutral', look: [1, -1] }
    }
    if (ph === 'q') return { mood: 'squint', look: [0, -1] }
    if (ph === 'last' || ph === 'recap') return { mood: 'happy', look: [-1, 0] }
    if (ph === 'bulb') return { mood: 'sparkle', look: [-1, -1] }
    if (ph === 0) return { mood: 'squint', look: [-1, 0] }
    if (t >= M.eclipse && t < M.eclipse + 2) return { mood: 'wide', look: [-1, -1] }
    return { mood: 'neutral', look: [-1, -1] }
  },
  cues: (T, M) => [['whoosh', +(M.eclipse + 0.3).toFixed(3), 0.9, 0.02], ['pop', +(M.eclipse + 1.5).toFixed(3), 880, 0.035, 0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
