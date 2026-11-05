// kpnee04: PLANET TALK: NEPTUNE, "Neptune to Cancer: Their Lines, Not Yours" (27 s vertical, star_advice, dreamy · Db).
// Hard cut.
//   0.00  frame 0: Neptune mid-slide down an unspooling film reel like a waterslide, Cancer mid-wince.
//         "Cancer. Stop writing | *their* lines." · 1.0 record scratch: "writing *both* sides. again." (11:48 pm)
//   2.6   Cancer's script: "CANCER: hi :)" · "CRUSH: ew. no." · "they'd *never* like me back."
//   6.1   Neptune: "you wrote their side of the scene. and made it *sad.*"
//   9.6   Neptune's red pen strikes the crush's line: (their line. not yours.) · "ask them. then let them answer for
//         *themselves.*" · "a real reply beats any script. even *mine.*"
//  17.0   the real text: "want to get a walk this week?" … typing … "yes!! when?" · Pisces fountains
//  25.2   "Let them say their *own* lines." Hard cut.
import { episode, P, drawSpace, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE, NEP, MONO } from '../../kpnee01/scenes/nepkit.js'

const D = 27
const T = { script: 2.6, nep1: 6.1, pen: 9.6, text: 17.0, reply: 20.6, end: 25.2 }

function reel(x, t) {
  drawSpace(x, t, { planet: 'neptune', seed: 41 })
  // the film strip, a long slide from the top-left reel down to the bottom-right
  x.save()
  const pts = []
  for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([lerp(-100, 1180, u), lerp(250, 1600, u) - 260 * Math.sin(u * Math.PI)]) }
  x.lineCap = 'round'; x.lineJoin = 'round'
  x.strokeStyle = INK; x.lineWidth = 200; x.beginPath(); pts.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke()
  x.strokeStyle = '#2b2350'; x.lineWidth = 176; x.stroke()
  x.setLineDash([26, 30]); x.lineDashOffset = -t * 300; x.strokeStyle = BONE; x.lineWidth = 150; x.stroke()
  x.setLineDash([]); x.strokeStyle = '#3a3070'; x.lineWidth = 118; x.stroke()
  x.setLineDash([90, 16]); x.lineDashOffset = -t * 300; x.strokeStyle = '#ffd2e4'; x.lineWidth = 96; x.stroke()
  x.restore()
  // the reel
  x.save(); x.translate(120, 220); x.rotate(t * 4)
  x.fillStyle = '#c9c4e0'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill(); x.lineWidth = 10; x.strokeStyle = INK; x.stroke()
  x.fillStyle = INK; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(Math.cos(i * 1.2566) * 80, Math.sin(i * 1.2566) * 80, 34, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function script(x, t, { strike = 0, fix = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 780); x.scale(k, k); x.rotate(0.02)
  P.box(x, 0, 0, 700, 640, '#fbf6ea', { r: 6, lw: 8 })
  x.font = `700 34px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const L = [['SCENE 1 · THE CAFE', INK, 0.2], ['CANCER: hi :)', INK, 0.9], ['CRUSH: ew. no.', '#d0303f', 1.7], ['(CANCER leaves.', INK, 2.4], [' forever.)', INK, 2.9]]
  L.forEach(([s, c, d], i) => {
    const n = Math.floor(clamp((t - T.script - d) * 22, 0, s.length))
    x.fillStyle = c; x.fillText(s.slice(0, n), -300, -220 + i * 82)
  })
  if (strike > 0) { x.strokeStyle = '#ff3b3b'; x.lineWidth = 10; x.lineCap = 'round'; for (const row of [2, 3, 4]) { const p = clamp(strike * 3 - (row - 2)); if (p > 0) { x.beginPath(); x.moveTo(-310, -220 + row * 82); x.lineTo(-310 + 560 * p, -220 + row * 82 - 6); x.stroke() } } }
  if (fix > 0) { x.save(); x.rotate(-0.04); x.font = "italic 600 50px 'EB Garamond', Georgia, serif"; x.fillStyle = NEP; const s = '(their line. not yours.)'; x.fillText(s.slice(0, Math.floor(clamp(fix) * s.length)), -290, 220); x.restore() }
  x.restore()
}
function pen(x, t, px, py) {
  x.save(); x.translate(px, py); x.rotate(-0.7)
  x.fillStyle = INK; x.fillRect(-16, -170, 32, 190); x.fillStyle = '#ff3b3b'; x.fillRect(-11, -165, 22, 150)
  x.beginPath(); x.moveTo(-14, 20); x.lineTo(14, 20); x.lineTo(0, 54); x.closePath(); x.fillStyle = INK; x.fill()
  x.restore()
}

const MSGS = [{ at: T.text + 0.6, side: 'R', text: 'want to get a walk this week?' }, { at: T.reply, side: 'L', text: 'yes!! when?' }]
const E = episode({
  sign: 'cancer', duration: D, ending: 'cut',
  entrance: { kind: 'burst', at: -0.45, x: 540, y: 690, size: 430 },
  hook: { text: 'Cancer. Stop writing | *their* lines.', out: [2.35, 2.55], size: 106 },
  fx: [{ kind: 'rec', at: 1.0, len: 1.35, caption: 'writing *both* sides. again.', sub: 'cancer · 11:48 pm' }],
  caps: [{ at: T.end, text: 'Let them say their | *own* lines.', top: 250, size: 100 }],
  cry: [[0, 2], [4.4, 3], [7.0, 2], [11.0, 2], [T.reply + 0.2, 3]],
  shots: [
    { a: -1, b: T.script, bg: (x, t) => reel(x, t),
      nep: { x: 540, y: 690, size: 430, mood: 'wide', rot: -0.2 }, sign: { x: 780, y: 1460, size: 290, mood: 'squint', look: [-1, -1] } },
    { a: T.script, b: T.pen, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 42 }), mid: (x, t) => script(x, t, { k: pop01(t, T.script, 0.4) }),
      nep: { x: 170, y: 1260, size: 250, mood: [[0, 'happy'], [T.nep1, 'sad']] }, sign: { x: 800, y: 1380, size: 290, mood: [[0, 'sad']], tears: [[0, 0], [T.script + 3, 1]], look: [-0.6, -1] } },
    { a: T.pen, b: T.text, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 42 }),
      mid: (x, t) => { const s = prog(t, T.pen + 0.3, T.pen + 1.4); script(x, t, { strike: s, fix: prog(t, T.pen + 1.5, T.pen + 2.6) }); const pp = s < 1 ? [lerp(190, 730, (s * 3) % 1), 740 + Math.floor(s * 3) * 82] : [lerp(230, 690, prog(t, T.pen + 1.5, T.pen + 2.6)), 1000]; if (t < T.pen + 3.2) pen(x, t, ...pp) },
      nep: { x: 170, y: 1260, size: 250, mood: [[0, 'sly'], [T.pen + 2.8, 'happy']] }, sign: { x: 800, y: 1380, size: 290, mood: [[0, 'wide'], [T.pen + 3, 'neutral']], look: [-0.6, -1] } },
    { a: T.text, b: T.end, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 43 }),
      mid: (x, t) => { P.phone(x, t, 470, 840, { w: 560, h: 760, msgs: MSGS, title: 'the crush', k: pop01(t, T.text, 0.4), typingAt: t < T.reply ? T.text + 1.8 : null }); P.hearts(x, t, T.reply + 0.1, 540, 1100, { n: 12, spread: 700 }) },
      nep: { x: 170, y: 1300, size: 240, mood: [[0, 'love']] }, sign: { x: 820, y: 1400, size: 290, mood: [[0, 'neutral'], [T.text + 1.8, 'wide'], [T.reply, 'heart']], look: [-0.6, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 44 }); P.filmEdge(x, t, { alpha: 0.6 }) },
      nep: { x: 330, y: 1000, size: 330, mood: 'proud' }, sign: { x: 760, y: 1250, size: 300, mood: 'happy', look: [-0.6, 0] } },
  ],
  lines: [
    { t0: T.script + 0.4, t1: T.nep1 - 0.25, who: 'cancer', text: "they'd *never* like me back.", x: 600, y: 1700, tailUp: true, tail: 200 },
    { t0: T.nep1, t1: T.pen - 0.2, who: 'neptune', text: 'you wrote their side of the scene. and made it *sad.*', x: 540, y: 1700, tailUp: true, tail: -250 },
    { t0: T.pen + 2.8, t1: T.pen + 5.6, who: 'neptune', text: 'ask them. then let them answer for *themselves.*', x: 540, y: 1700, tailUp: true, tail: -250 },
    { t0: T.pen + 5.8, t1: T.text - 0.2, who: 'neptune', text: 'a real reply beats any script. even *mine.*', x: 540, y: 1700, tailUp: true, tail: -250 },
    { t0: T.reply + 0.8, t1: T.end - 0.2, who: 'cancer', text: 'they wrote that *themselves.*', x: 560, y: 1700, tailUp: true, tail: 200 },
  ],
  cues: [['whoosh', T.script, 0.4, 0.04], ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.script + 0.3 + i * 0.25).toFixed(2), 0.03]), ['whoosh', T.pen + 0.3, 0.3, 0.05], ['whoosh', T.pen + 0.7, 0.3, 0.05], ['pop', T.text + 0.6, 1174.66, 0.05, 0.2], ['pop', T.reply, 1567.98, 0.06, -0.2], ['glitter', T.reply, T.reply + 0.6]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
