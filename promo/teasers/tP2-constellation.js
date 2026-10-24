// P2 · Constellation — film-faithful loop (S7 aurora sky + constellation of people). 10s @ 96 bpm, seamless.
// S7's night sky (galaxy arc, aurora curtain swaying once per loop) with 13 ringed aura portraits in S7's vertical layout.
// The constellation hairlines draw and undraw in one slow wave that travels round the ring once per loop
// (each line: grows 0–18% of its cycle, holds, retracts 55–72%), with a joint sparkle as each line lands.
// Portraits breathe with the 96 bpm pulse. Tagline held steady in bone serif inside S7's corner ticks.
import { W, H, el, fill, lerp, clamp, ease, prog, SERIF, BONE, IMG, PEOPLE,
  LOOP, BEAT, ph, osc, cyc, kick, auroraSky, filmGrain, filmPixelStars, portraitStar, pixSpark, hairline, filmMusic, filmCues } from './filmkit.js'
import { Ticks } from '../src/scenes/common.js'

const SRC = [...PEOPLE, IMG + 'juniper.jpg', IMG + 'hakeem.jpg']
// [x, y, diameter, photo] — S7's vertical constellation (tagline block ~x 190–890, y 820–1100 stays clear)
const NODES = [[180, 470, 112, 12], [330, 320, 92, 0], [560, 430, 84, 4], [790, 310, 118, 2], [690, 650, 90, 8], [930, 500, 100, 6],
  [960, 790, 88, 13], [910, 1270, 92, 9], [720, 1500, 108, 1], [560, 1240, 80, 5], [370, 1550, 100, 10], [190, 1340, 94, 3], [110, 1060, 90, 7]]
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [1, 3], [8, 10]]
// wave order: the 13 ring edges in sequence, the two chords ride along with their neighbours
const EOFF = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 2.2, 8.6].map(k => k / 13)
const G0 = 0.18, H1 = 0.55, R1 = 0.72        // grow end · retract start · retract end (fractions of the edge's cycle)

export default {
  id: 'P2-constellation', title: 'Constellation (film loop)', duration: LOOP, loop: true,
  music: filmMusic(),
  // a soft bell as each ring line lands (pentatonic in D, quiet), plus the bar bells
  cues: filmCues({ gain: 0.018, extra: EOFF.slice(0, 13).map((o, k) => ['bell', ((o + G0) * LOOP) % LOOP, [1174.66, 987.77, 880, 739.99, 659.25][k % 5], 0.011, 1.4, (NODES[EDGES[k][1]][0] / W - 0.5) * 0.8]) }),
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const sky = auroraSky(root, { hem: 0.68, scrim: [1060, 640] })
    const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    cv.width = W; cv.height = H
    const cx = cv.getContext('2d')
    const nodes = NODES.map(([x, y, d, pi], i) => ({ x, y, d, i, off: (i * 0.137) % 1, p: portraitStar(root, SRC[pi], { objectPosition: pi === 13 ? '50% 30%' : '50% 40%' }) }))
    const tag = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '50%', transform: 'translateY(-50%)', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '104px', lineHeight: 1.08, color: '#fff6ea' }, root, 'Dating, dealt<br>by the stars.')
    const ticks = new Ticks(root, BONE, 14)
    const grain = filmGrain(root, { opacity: 0.3 })
    let tw = 0, th = 0
    return {
      update(t) {
        sky.update(t)
        if (!tw) { const s = tag.querySelectorAll('br').length; tw = 640; th = tag.offsetHeight; void s }
        const br = 0.5 + 0.5 * osc(t, 2, 0.25)
        tag.style.textShadow = `0 0 ${(30 + 16 * br).toFixed(1)}px rgba(232,98,138,${(0.2 + 0.12 * br).toFixed(3)}), 0 2px 18px rgba(8,4,24,0.75), 0 1px 3px rgba(8,4,24,0.6)`
        ticks.update(W / 2, H / 2, tw + 120, th + 70, 0.9)
        const k = kick(t, 4.5)
        // node positions (small closed drift)
        const st = nodes.map(n => ({ x: n.x + 7 * osc(t, 1, n.off), y: n.y + 6 * osc(t, 1, n.off + 0.25), d: n.d, lit: 0 }))
        cx.clearRect(0, 0, W, H)
        filmPixelStars(cx, t, { seed: 79, sprites: 16, dots: 50, pal: ['#ffffff', BONE, '#ffe6a0', '#f2c75c', '#c9a6ff'], centre: '#ffffff', dot: '255,250,240', keep: [[150, 780, 780, 360]], alpha: 0.95 })
        EDGES.forEach(([a, b], e) => {
          const u = cyc(t, 1, -EOFF[e])
          const to = ease.inOutCubic(prog(u, 0, G0)), from = ease.inOutCubic(prog(u, H1, R1))
          if (to <= 0 || from >= 1) return
          const A_ = st[a], B_ = st[b]
          const hd = hairline(cx, A_, B_, from, to, { ra: A_.d / 2 + 10, rb: B_.d / 2 + 10 })
          if (to < 1) pixSpark(cx, hd.x, hd.y, 3, 0.9 * to)
          // joint sparkle as the line lands, settling
          const land = Math.exp(-(((u - G0 - 0.01) / 0.035) ** 2)) + 0.25 * prog(u, G0, G0 + 0.05) * (1 - prog(u, H1 - 0.1, H1))
          if (land > 0.01) pixSpark(cx, hd.end.x, hd.end.y, 4, Math.min(1, land), '255,226,160', true)
          st[b].lit = Math.max(st[b].lit, Math.exp(-(((u - G0) / 0.05) ** 2)))
          st[a].lit = Math.max(st[a].lit, 0.35 * Math.exp(-(((u - 0.02) / 0.04) ** 2)))
        })
        nodes.forEach((n, i) => {
          const S = st[i]
          n.p.set({ x: S.x, y: S.y, d: S.d, s: 1 + 0.035 * k + 0.05 * S.lit, glow: clamp(0.4 + 0.18 * k + 0.5 * S.lit) * (0.85 + 0.15 * osc(t, 3, n.off)) })
          // ring sparkle upper-right of each portrait, twinkling
          pixSpark(cx, S.x + S.d * 0.36, S.y - S.d * 0.36, 3, 0.5 + 0.5 * osc(t, 3, n.off * 2), '255,250,242', true)
        })
        grain.update(t)
        void lerp; void BEAT
      },
    }
  },
}
