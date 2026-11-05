// kbhe14: BRAIN VS HEART, Ep 14 "Single at the Dinner" (12.6 s vertical, star_talk post, music: funk · A). Hard cut.
// Inside ♌ Leo's head at the holiday dinner. The window: the table, and the aunt leaning in.
//   0.00   frame 0: mid whip zoom; Brain mid-dive off the console to hide, Heart holding up a sign: I'M THRIVING.
//          The aunt (in the window): "so… seeing anyone?"  Title "'So, seeing anyone?' | *Leo's aunt.*"
//   1.40   BRAIN (peeking over the console): "I'm *very* busy."  2.40 "my plants *need* me."
//   3.60   HEART: "tell the *TRUTH.* proudly."   5.00 Leo stands up (the view rises): "nope. and I'm having the *best year.*"
//   7.20   the aunt claps, the whole table claps.  8.00 achievement "SINGLE AND *SHINING.*"
//   9.60   HEART: "Single, sparkling, passing the *potatoes.*"
// Pisces cam: nervous sniffles, happy fountains at the applause. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, achievement, achievementCues } from '../../hookkit.js'
import { makeBuild, bubbleCues, bubble, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar } from '../../kbhe01/bhkit.js'

export const DURATION = 12.6
const SIGN = 'leo'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "'So, seeing anyone?' | *Leo's aunt.*", top: 168, size: 100 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const ACH = { at: 8.0, out: [10.2, 10.5], text: 'SINGLE AND *SHINING.*', y: 1700 }
const T = { stand: 5.0, say: 5.2, clap: 7.2, last: 9.6 }
const AUNT = { bg: '#e8f6e8', fg: INK, acc: '#2a8a4a', tag: 'AUNT' }
const LEOSAY = { bg: '#ffe6c4', fg: INK, acc: '#d0701a', tag: '♌︎ LEO' }
const BUB = [
  { t0: 1.4, t1: 2.3, who: 'brain', x: 380, y: 1195, tail: -120, text: "I'm *very* busy.", size: 48 },
  { t0: 2.4, t1: 3.45, who: 'brain', x: 380, y: 1195, tail: -120, text: 'my plants *need* me.', size: 48 },
  { t0: 3.6, t1: 4.9, who: 'heart', x: 690, y: 1195, tail: 130, text: 'tell the *TRUTH.* proudly.', size: 48 },
  { t0: T.last, t1: 99, who: 'heart', x: 640, y: 1200, tail: 180, text: 'Single, sparkling, passing the *potatoes.*', size: 44, maxW: 560 },
]
const WINB = [
  { t0: -1, t1: 4.9, who: AUNT, x: 640, y: 650, tail: 60, text: 'so… seeing *anyone?*', size: 42 },
  { t0: T.say, t1: 7.1, who: LEOSAY, x: 540, y: 660, tail: 0, text: "nope. and I'm having the *best year.*", size: 42, maxW: 700 },
]

function table(x, t, Rw) {
  const rise = ease.inOutCubic(prog(t, T.stand, T.stand + 0.4))
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#5a2a3a'); g.addColorStop(1, '#3a1a2a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  for (let i = 0; i < 14; i++) { x.fillStyle = ['#ffd98a', '#ff8fa0', '#9fe6b0'][i % 3]; x.beginPath(); x.arc(Rw.x + 40 + i * 66, Rw.y + 40 + 14 * Math.sin(i), 8, 0, 7); x.fill() }
  x.save(); x.translate(0, -rise * 90)
  // family round the table: four star relatives
  const fam = [[260, '#5fd38a', 'aunt'], [440, '#7fd0f0'], [640, '#c9a6ff'], [820, '#f0603a']]
  fam.forEach(([fx, col, who], i) => {
    const clap = t > T.clap && t < T.clap + 2
    const lean = who === 'aunt' && t < T.stand ? 30 : 0
    drawStarChar(x, fx + lean, Rw.y + 340 + (clap ? -10 * Math.abs(Math.sin(t * 14 + i)) : 0), 170, t, { color: col, mood: clap ? 'happy' : who === 'aunt' ? (t < T.say ? 'sparkle' : 'wide') : 'neutral', look: who === 'aunt' ? [0, 1] : [0, 0], seed: i + 3, glow: 0.4 })
  })
  R(x, INK, Rw.x, Rw.y + 400, Rw.w, 300); R(x, '#f4e8cc', Rw.x, Rw.y + 406, Rw.w, 300)
  // the potatoes and plates
  for (const px of [220, 420, 640, 860]) { x.fillStyle = INK; x.beginPath(); x.ellipse(px, Rw.y + 460, 80, 24, 0, 0, 7); x.fill(); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(px, Rw.y + 458, 72, 19, 0, 0, 7); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(540, Rw.y + 520, 110, 40, 0, 0, 7); x.fill(); x.fillStyle = '#e9e2d0'; x.beginPath(); x.ellipse(540, Rw.y + 516, 100, 32, 0, 0, 7); x.fill()
  for (let i = 0; i < 6; i++) { x.fillStyle = '#e8c070'; x.beginPath(); x.arc(500 + (i % 3) * 40, Rw.y + 506 + Math.floor(i / 3) * 16, 16, 0, 7); x.fill() }
  x.restore()
  if (t > T.clap && t < T.clap + 2) for (let i = 0; i < 6; i++) { const k = pop01(t, T.clap + i * 0.18, 0.2, 2.6) * (1 - prog(t, T.clap + 1.6, T.clap + 2)); x.save(); x.translate(Rw.x + 120 + i * 150, Rw.y + 120 + (i % 2) * 60); x.scale(k, k); x.rotate((i % 2 ? 1 : -1) * 0.2); x.fillStyle = GOLD; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.fillText('CLAP!', 0, 0); x.restore() }
  for (const b of WINB) bubble(x, t, b)
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8], look: [0, 1] }],
    [1.2, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [0.5, -1], sweat: 1 }],
    [3.6, { mood: 'sad', mouth: 'frown', arms: [2.6, 2.6], look: [1, 0] }],
    [T.stand, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [0.5, -1] }],
    [T.clap, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.8], sweat: 0 }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.3], look: [1, 0] }],
  ])
  const yy = key(t, [[0, 1360], [0.45, 1360, ease.inQuad], [1.15, 1360], [1.35, 1440]])
  const rot = key(t, [[0, 2.4], [0.45, 1.55], [1.15, 1.55], [1.35, 0, ease.outBack]])
  const sq = t > 0.45 && t < 1.15 ? 0.25 : 0
  return { ...P, x: 280, y: yy, rot, squash: sq, hops: [1.4, 2.4, T.clap + 0.6, T.last] }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'love', mouth: 'grin', arms: [2.9, 2.9], look: [0, 0] }],
    [3.6, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9], look: [-1, 0] }],
    [T.stand, { mood: 'love', mouth: 'grin', arms: [2.9, 2.9], look: [0, -1] }],
    [T.clap, { mood: 'happy', mouth: 'grin', arms: [2.9, 2.9] }],
    [T.last, { mood: 'love', mouth: 'grin', arms: [2.4, 2.9], look: [-1, 0] }],
  ])
  return { ...P, x: 820, y: 1440, hops: [3.6, 4.0, T.stand, T.clap, T.clap + 0.4, T.clap + 0.8], prop: (x, t2, o) => {
    // the I'M THRIVING sign held over Heart's head
    const cx = (o.hl.x + o.hr.x) / 2, cy = Math.min(o.hl.y, o.hr.y) - 80
    x.save(); x.translate(cx, cy); x.rotate(0.05 * Math.sin(t2 * 5))
    R(x, INK, -150, -54, 300, 92); R(x, '#fffbea', -144, -48, 288, 80)
    x.fillStyle = '#f39a3a'; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("I'M THRIVING", 0, -6)
    x.restore()
  } }
}

const build = makeBuild({
  sign: SIGN, blinks: [],
  view: table,
  desk: t => ({ button: { label: 'STAND UP', press: [T.stand], glow: 0.5, col: '#f39a3a' }, score: { b: [[0, 0]], h: [[0, 0], [T.clap, 1]] }, cam: { tears: [[0, 1], [T.clap, 3]], mood: [[0, 'wide'], [T.clap, 'happy']], look: [0, -1], hops: [T.clap, T.clap + 0.4] } }),
  brain: brainP, heart: heartP,
  front: (x, t) => { sparkles(x, t, 540, 750, T.clap, 14, 260, 1, [GOLD, BONE, '#f39a3a']) },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), achievement(ACH)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK), ['whoosh', 0.1, 0.4, 0.05], ['tom', 0.5, 70, { gain: 0.2, decay: 0.3 }],
  ['boom', T.stand, 0.2], ['riser', T.stand - 0.3, T.say, 0.04], ['pop', T.say, 1318.51, 0.05, 0],
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.clap + i * 0.15).toFixed(2), 0.07]), ['glitter', T.clap, T.clap + 0.6],
  ...achievementCues(ACH), ...bubbleCues([...BUB, ...WINB.filter(b => b.t0 > 0)]), ['bell', T.last + 0.05, 1760, 0.03, 1.4, 0],
]
