// kwme08: WAIT, THAT'S ME, "Asking five friends before replying “ok”" (10 s loop, star_advice trial, music: jazzy · B♭).
//   0.00  frame 0: ♎ Libra mid-gasp under a five-tile video call of friend stars, all mid-lean-in; hook on.  0.32 colour flash.
//   1.2   Libra: "they said ‘ok.’ what do I say??"  2.4–3.6 five opinions pop at once.  4.4 Libra sends: "ok"
//   5.6–7.1  the slow turn.  7.2  last line: "the committee has spoken."   9.55–10 loop back.
import { makeWM, wmMusic, box, bubble, label, drawStarChar, signStar, pop01, outK, prog, BONE, INK, GOLD } from '../../kwme01/wmkit.js'

const H = { x: 400, y: 1330, s: 360, face: 1 }
const F = [['aries', 'say ok back'], ['virgo', 'wait 20 min'], ['sagittarius', 'send a meme'], ['aquarius', 'ask about their day'], ['capricorn', 'just be honest']]
const TILE = (i) => i < 3 ? { x: 200 + i * 340, y: 520 } : { x: 370 + (i - 3) * 340, y: 850 }
const ASK = 1.2, OPS = [2.4, 2.65, 2.9, 3.2, 3.5], SEND = 4.4, TURN = 5.6
function tiles(x, t) {
  F.forEach(([sg, op], i) => {
    const P = TILE(i), S = signStar(sg)
    box(x, P.x - 150, P.y - 140, 300, 280, '#1d1838', { bw: 6, ink: '#5a5470' })
    x.save(); x.beginPath(); x.rect(P.x - 150, P.y - 140, 300, 280); x.clip()
    drawStarChar(x, P.x, P.y + 40, 230, t, { color: S.color, mood: t > OPS[i] ? 'happy' : 'wide', look: [0, 1], seed: 11 + i, hops: [OPS[i]] })
    x.restore()
    x.font = "700 22px 'Space Mono', monospace"; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText(S.glyph + '︎', P.x - 138, P.y + 128)
    bubble(x, t, P.x, P.y - 70, OPS[i], SEND + 0.6, op, { size: 30, maxW: 270 })
  })
}
const EP = makeWM({
  id: 'kwme08', dur: 10, sign: 'libra', turn: TURN, brk: 'flash',
  hook: 'Asking *five friends* | before replying “ok”',
  last: 'the committee has spoken.',
  hero: H, wash: '#2f7ab0',
  heroOpts: (t) => ({ mood: t < OPS[4] + 0.5 ? 'wide' : t < SEND + 0.3 ? 'squint' : 'happy', look: [0.6, -1], hops: [ASK, SEND], tilt: 0.04 }),
  back(x, t) { tiles(x, t) },
  front(x, t) {
    bubble(x, t, 640, 1130, ASK, OPS[0] - 0.1, 'they said ‘ok.’ what do I say??', { size: 34, tail: -0.5, maxW: 520 })
    const k = pop01(t, SEND, 0.3, 2.6) * outK(t, [TURN, TURN + 0.15])
    if (k > 0.01) { x.save(); x.translate(760, 1250); x.scale(k, k); box(x, -150, -60, 300, 120, '#7fd0ff', { bw: 6 }); label(x, 'ok', 0, 4, { size: 64, col: INK, stroke: null, font: "'Space Mono', monospace", weight: 700 }); label(x, 'SENT', 0, 92, { size: 30, col: GOLD }); x.restore() }
  },
  cues: [['pop', ASK, 987.77, 0.04, -0.2], ...OPS.map((v, i) => ['pop', v, 659.25 * (1 + i * 0.15), 0.04, (i - 2) * 0.3]), ['whoosh', SEND - 0.05, 0.25, 0.04], ['pop', SEND + 0.05, 1318.51, 0.05, 0.2]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'jazzy', key: 'Bb', seed: 2608 })
