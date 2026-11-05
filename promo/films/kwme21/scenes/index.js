// kwme21: WAIT, THAT'S ME, "Answering “how's love?” with a work update" (9 s loop, star_advice trial, music: jazzy · E♭).
//   0.00  frame 0: ♑ Capricorn mid-handshake with its own laptop, a friend star already leaning in; hook on.  0.32 flash.
//   1.0   friend: "so… how’s love?"  1.6 Capricorn flips the laptop: a bar chart, "Q4: CRUSHING IT" (at work).
//   3.0   the friend squints (eye roll).  4.8–6.3 the slow turn.  6.4 last line: "love is… pending review."
import { makeWM, wmMusic, box, label, bubble, drawStarChar, signStar, pop01, prog, ease, lerp, clamp, INK, BONE, GOLD } from '../../kwme01/wmkit.js'

const H = { x: 320, y: 1230, s: 400, face: 1 }
const ASK = 1.0, FLIP = 1.6, BARS = [2.0, 2.9], ROLL = 3.0, TURN = 4.8
const FR = signStar('gemini')
function laptop(x, t) {
  const f = ease.outBack(prog(t, FLIP - 0.2, FLIP + 0.2)), cx = lerp(H.x + 150, 650, f), cy = lerp(1300, 820, f)
  x.save(); x.translate(cx, cy); x.scale(lerp(0.55, 1, f), lerp(0.55, 1, f))
  box(x, -230, -160, 460, 300, '#2a2148', { bw: 8 }); x.fillStyle = '#f6f2ff'; x.fillRect(-210, -140, 420, 260)
  if (f > 0.5) {
    label(x, 'Q4: CRUSHING IT', 0, -110, { size: 30, col: INK, stroke: null })
    const p = ease.outCubic(prog(t, ...BARS));
    [0.35, 0.55, 0.7, 1].forEach((v, i) => { const h = 160 * v * p; x.fillStyle = i === 3 ? '#2f8f6a' : '#7fd0ff'; x.fillRect(-170 + i * 95, 100 - h, 64, h) })
    x.fillStyle = INK; x.fillRect(-190, 100, 380, 4)
  }
  x.restore()
}
const EP = makeWM({
  id: 'kwme21', dur: 9, sign: 'capricorn', turn: TURN, brk: 'flash',
  hook: 'Answering *“how’s love?”* | with a work update',
  last: 'love is… pending review.',
  hero: H, wash: '#3a6a8a', hookSize: 82,
  heroOpts: (t) => ({ mood: t < FLIP ? 'neutral' : 'happy', look: [1, -0.3], hops: [-0.2, FLIP, BARS[1]], tilt: 0.05 }),
  back(x, t) {
    drawStarChar(x, 830, 1220, 290, t, { color: FR.color, glyph: FR.glyph, mood: t > ROLL ? 'eyeroll' : t > ASK ? 'happy' : 'sparkle', look: [-1, 0], seed: 4, hops: [ASK, ROLL] })
  },
  front(x, t) {
    laptop(x, t)
    bubble(x, t, 820, 1000, ASK, FLIP + 0.3, 'so… how’s love?', { size: 38, tail: 0.1 })
    const k = pop01(t, ROLL + 0.2, 0.25, 2.4) * (t < TURN ? 1 : 0)
    if (k > 0.01) label(x, '…love, though?', 830, 1020, { size: 40 * k, col: GOLD })
    void [BONE, clamp]
  },
  cues: [['pop', ASK, 1174.66, 0.04, 0.3], ['whoosh', FLIP - 0.2, 0.35, 0.05], ['riser', BARS[0], BARS[1], 0.02], ['bell', BARS[1], 1760, 0.03, 0.8, -0.2], ['pluck', ROLL, 330, 0.035, 0.4, 0.3]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'jazzy', key: 'Eb', seed: 2621 })
