// kpre04: PISCES REACTS, "This reminded me of you" (8 s vertical trial reel, star_advice, music: lofi · Bb). Loop.
// The look lives in ../../kpre01/scenes/reactkit.js.
//   0.00   frame 0: a big glowing phone; Scorpio (left) holding it, the smallest smile; Pisces peeking over its shoulder,
//          mid-sob. Hook: "‘This reminded me of *you.*’" · 0.38 record scratch, freeze · 0.72 rewind
//   1.12   buzz: a photo lands, a tiny frog in a leaf hat · "this reminded me of you" · Scorpio: the smallest smile ·
//          types back "it's perfect." · 5.42 Pisces: "THE FROG." · 5.92 last line "Thought of you. *Sent* the frog." · loop.
import { makeReact, R, box, bubble, drawStarChar, signStar, drawBits, sparkles, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, INTER } from '../../kpre01/scenes/reactkit.js'

const SCO = signStar('scorpio')
const U = { buzz: 0.2, photo: 0.6, text: 1.5, smile: 2.3, reply: 3.0, END: 3.8 }
const FROG = ['..L.L.L...', '.LLLLLLL..', 'LLLLLLLLL.', '..GGGGG...', '.GWKGWKG..', 'GGGGGGGGG.', 'GGPPPPPGG.', '.GGGGGGG..', 'GG.....GG.']

function set(x, c) {
  R(x, '#1a1230', 0, 0, 1080, 1920)
  for (let i = 0; i < 6; i++) R(x, 'rgba(255,255,255,0.03)', 0, 480 + i * 200, 1080, 90)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 900, 30, 540, 900, 700); g.addColorStop(0, 'rgba(160,190,255,0.25)'); g.addColorStop(1, 'rgba(160,190,255,0)'); x.fillStyle = g; x.fillRect(0, 200, 1080, 1400); x.restore()
  void c
}
function moment(x, c, u) {
  // the phone
  const bz = u > U.buzz && u < U.buzz + 0.4 ? 8 * Math.sin(u * 80) : 0
  x.save(); x.translate(540 + bz, 920); x.rotate(-0.04)
  box(x, -270, -420, 540, 820, '#2a2148', { b: 10 })
  R(x, '#121026', -244, -380, 488, 740)
  x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = '#9fe6b0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♑︎ my person', 0, -345)
  // the photo
  const pk = ease.outBack(prog(u, U.photo, U.photo + 0.4))
  if (pk > 0.01) {
    x.save(); x.translate(-60, -150); x.scale(pk, pk)
    box(x, -150, -140, 300, 280, '#5fae6a', { b: 6 }); R(x, '#7fd08a', -150, 40, 300, 100)
    drawBits(x, FROG, { L: '#3fb08a', G: '#7fe08a', W: '#ffffff', K: INK, P: '#ff8fb1' }, 0, 10, 22)
    x.restore()
  }
  const msg = (y, side, text, t0) => { const k = pop01(u, t0, 0.22, 2.4); if (k <= 0.01) return; x.save(); x.font = `700 36px ${INTER}`; const w = x.measureText(text).width + 40; const bx = side === 'R' ? 220 - w : -220; x.translate(bx + w / 2, y); x.scale(k, k); R(x, side === 'R' ? '#4f7cd8' : '#3a3160', -w / 2, -32, w, 64); x.fillStyle = BONE; x.textAlign = 'center'; x.fillText(text, 0, 2); x.restore() }
  msg(80, 'L', 'this reminded me of you', U.text)
  msg(170, 'R', 'it’s perfect.', U.reply)
  x.restore()
  if (u > U.buzz && u < U.buzz + 0.6) { x.save(); x.globalAlpha = 1 - prog(u, U.buzz, U.buzz + 0.6); x.font = `900 60px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('bzzt', 860, 520); x.restore() }
  // Scorpio, front-left, holding it
  const sm = u < U.text ? 'neutral' : u < U.smile ? 'squint' : 'happy'
  drawStarChar(x, 230, 1380, 360, c, { color: SCO.color, glyph: SCO.glyph, mood: sm, look: [1, -1], seed: 3, blush: u > U.smile ? 0.6 : 0 })
  if (u > U.smile) sparkles(x, u, 230, 1300, U.smile, 8, 180, 3)
}

const EP = makeReact({
  id: 'kpre04', D: 8, loop: true, END: U.END, accent: '#7fe08a', label: '5 SECONDS EARLIER',
  hook: '‘This reminded | me of *you.*’',
  set, moment,
  pis: { x: 860, y: 1380, s: 360, look: [-1, -1] },
  react: [[0, 0, 'neutral'], [U.photo, 1, 'wide'], [U.text, 2, 'wide'], [U.smile, 3, 'sparkle']],
  line: { text: 'THE FROG.', x: 640, y: 1150, size: 60, col: '#c9f2d4', tail: 0.6 },
  last: 'Thought of you. *Sent* the frog.',
  cues: T => [
    ['tick', T.u(U.buzz), 0.05], ['tick', T.u(U.buzz) + 0.08, 0.05], ['tick', T.u(U.buzz) + 0.16, 0.05],
    ['pop', T.u(U.photo), 1174.66, 0.045, 0], ['glitter', T.u(U.photo), T.u(U.photo) + 0.4],
    ['pop', T.u(U.text), 880, 0.04, -0.2], ['pluck', T.u(U.smile), 1318.51, 0.035, 0.5, -0.3], ['pop', T.u(U.reply), 440, 0.045, 0.25],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [bubble, clamp, lerp]
