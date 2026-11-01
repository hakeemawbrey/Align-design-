// trexpectdance (20 s vertical, Star Talk Trends · EXPECTATION vs REALITY · 4) "Two left stars." · lofi Dm.
// The format's shared look lives in ./evr.js (identical in all five trexpect films). Story 0–15.6, then the end card.
//   EXPECTATION  "Expectation: | a *smooth* slow dance."  A ballroom: a chandelier, a spotlight, a polished floor, petals.
//                ♌ LEO and ♍ VIRGO sway in a slow half-orbit; Leo dips Virgo, perfectly (sparkle). Heart eyes.
//   REALITY      "Reality: | *four* left feet."  A living room, a lamp, a rug, a tiny speaker. Three stickers:
//                STEPPED ON (Leo lands on Virgo's tip: OW) · STEPPED ON AGAIN (Virgo, on Leo's) · THE DIP (it starts
//                fine… then both topple flat onto the rug; the sticker is struck through: "the flop."). A hush: they lie
//                there, look at each other… crack up, still on the floor.
//   card cut     at the laugh.
//   TURN         "Plan B: | the *goofy* jig."  They bounce up and jig, completely off-beat. Reality fills the frame: a
//                couch on the left with ♓ Pisces sobbing happy tears, the little speaker on the right puffing notes.
//                Box (LEO): "we invented a *dance.*"
//   LAST         "Two left *stars.*"  A stamp THUNKs on: 11/10.
import { makeEVR, BEAT, r3, INK, BONE, GOLD, PINK, HOT, clamp, lerp, prog, ease, drawPixelStar } from './evr.js'

const CHAND = ['....gg....', '...gGGg...', '.gGgGGgGg.', 'gGGGGGGGGg', '.c.c..c.c.', '.C.C..C.C.']
const CHAND_C = { g: '#c8963a', G: '#f2c75c', c: '#bfe6ff', C: '#ffffff' }
const PETAL = ['.p', 'pP', 'p.']
const LAMP = ['.SSSS.', 'SSSSSS', 'SSSSSS', '..ll..', '..ll..', '..ll..', '..ll..', '..ll..', '..ll..', '..ll..', '.LLLL.']
const LAMP_C = { S: '#ffe9a8', l: '#5a5470', L: '#3a3550' }
const SPEAKER = ['BBBBBB', 'BccccB', 'BcCCcB', 'BccccB', 'BBBBBB', 'BBttBB', 'BtTTtB', 'BBttBB', 'BBBBBB']
const SPEAKER_C = { B: '#2c2840', c: '#5a5478', C: '#9a94b8', t: '#5a5478', T: '#9a94b8' }
const NOTE = ['..NN', '..NN', '..N.', 'NNN.', 'NNN.']
const OW = ['..y...y..', '...y.y...', 'yy.YYY.yy', '...YRY...', 'yy.YYY.yy', '...y.y...', '..y...y..']
const OW_C = { y: '#ffd25a', Y: '#fff1a0', R: '#e8324a' }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

const STAR_Y = 1084, STAR_S = 176, LEO_X = 430, VIR_X = 650, FLOOR = 1170
const G1 = BEAT(9), G2 = BEAT(11), G3 = BEAT(13)
const T2 = { dip: [BEAT(3) - 0.3, BEAT(3) + 0.9], hearts: BEAT(5), flop: G3 + 0.45, strike: G3 + 0.62, up: 10.15 }

const EVR = makeEVR({
  id: 'trexpectdance', pair: ['leo', 'virgo'],
  heads: {
    expect: 'Expectation: | a *smooth* slow dance.',
    reality: 'Reality: | *four* left feet.',
    turn: 'Plan B: | the *goofy* jig.',
    last: 'Two left *stars.*',
  },
  accents: { expect: GOLD, reality: '#ffb36b', turn: '#9fe6b0', last: '#ffd25a' },
  stickers: [{ text: 'STEPPED ON', x: -110, y: 606, rot: -0.07 }, { text: 'STEPPED ON AGAIN', x: 20, y: 680, rot: 0.05 }, { text: 'THE DIP', x: -40, y: 756, rot: -0.04, strike: { at: G3 + 0.62, text: 'the flop.' } }],
  stamp: '11/10', stampAt: { y: 690 },
  clock: { expect: '9:30 PM', reality: '9:31 PM' },
  line: { who: 0, text: 'we invented a *dance.*' },
  lineColor: '#ffd25a',
  gloss: ['#3d1f63', '#d77aa6'],
  real: ['#6a5a6e', '#3a3044'],

  glossy(x, t, W) {
    const { px, bits } = W
    // the chandelier + spotlight cone
    px(538, 320, 4, 120, '#c8963a'); bits(CHAND, CHAND_C, 540, 470, 14)
    for (let i = 0; i < 4; i++) if ((t * 2 + i * 0.7) % 1 < 0.5) drawPixelStar(x, 470 + i * 46, 520, 16, 2, '#fff')
    x.save(); x.globalAlpha = 0.28 + 0.05 * Math.sin(t * 3)
    const cg = x.createLinearGradient(0, 520, 0, 1250); cg.addColorStop(0, 'rgba(255,240,200,0.9)'); cg.addColorStop(1, 'rgba(255,240,200,0.15)')
    x.fillStyle = cg; x.beginPath(); x.moveTo(500, 520); x.lineTo(580, 520); x.lineTo(780, 1250); x.lineTo(300, 1250); x.fill(); x.restore()
    // the polished floor (checker + sheen) and the spotlight pool
    for (let j = 0; j < 6; j++) for (let i = 0; i < 20; i++) px(i * 56 - (j % 2) * 28, FLOOR + j * 40, 56, 40, (i + j) % 2 ? '#5a2a6a' : '#7a3e86')
    px(0, FLOOR, 1080, 6, '#f2c75c')
    x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff4d6'; x.beginPath(); x.ellipse(540, FLOOR + 50, 240, 34, 0, 0, Math.PI * 2); x.fill(); x.restore()
    // petals drift down
    for (let i = 0; i < 10; i++) { const q = (t * 0.22 + i * 0.1) % 1; bits(PETAL, { p: '#ff8fb1', P: '#ffd0e0' }, 300 + ((i * 97) % 480) + 20 * Math.sin(t * 2 + i), 520 + q * 700, 5, { outline: null, alpha: Math.sin(Math.PI * q) }) }
    // the slow orbit + the dip
    const k0 = W.pop01(t, 0.7, 0.35, 2), k1 = W.pop01(t, 0.82, 0.35, 2)
    const th = 0.75 * Math.sin((t - 0.8) * 1.1), dip = Math.sin(Math.PI * prog(t, ...T2.dip))
    const mood = t > T2.hearts - 0.2 ? 'heart' : 'sparkle'
    const P = [{ i: 0, X: 540 - 128 * Math.cos(th), d: Math.sin(th), rot: 0.18 * dip, k: k0 }, { i: 1, X: 540 + 128 * Math.cos(th), d: -Math.sin(th), rot: -0.75 * dip, k: k1 }]
    P.sort((a, b) => a.d - b.d).forEach(p => {
      x.save(); x.translate(p.X, STAR_Y + 30 * (p.i === 1 ? dip : 0)); x.rotate(p.rot)
      W.star(p.i, 0, 0, STAR_S * (1 + 0.05 * p.d), { mood, look: [p.i ? -1 : 1, 0], pop: p.k, bob: 4 })
      x.restore()
    })
    W.sparkles(t, 600, 1000, T2.dip[0] + 0.55, 8, 80, 1, [GOLD, '#fff', PINK])
    for (let i = 0; i < 5; i++) {
      const b = T2.hearts + i * 0.32, q = prog(t, b, b + 2.2)
      if (q <= 0 || q >= 1) continue
      bits(HEART, { H: i % 2 ? HOT : PINK }, 540 + (i - 2) * 60 + 18 * Math.sin(t * 3 + i), 930 - q * 360, 5, { alpha: Math.sin(Math.PI * q) })
    }
  },

  scrappy(x, t, W) {
    const { px, bits, T } = W
    // wallpaper stripes, a window, the floor, the rug
    for (let X = 0; X < 1080; X += 60) px(X, 320, 26, FLOOR - 320, 'rgba(255,230,240,0.06)')
    px(0, FLOOR, 1080, 230, '#4a3a3a'); for (let X = 0; X < 1080; X += 90) px(X, FLOOR, 4, 230, '#3a2c2c')
    x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(540, FLOOR + 70, 300, 56, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c86a4a'; x.beginPath(); x.ellipse(540, FLOOR + 70, 292, 50, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#e8a46a'; x.beginPath(); x.ellipse(540, FLOOR + 70, 220, 34, 0, 0, Math.PI * 2); x.fill(); x.restore()
    // the floor lamp (in view) + its glow
    const lg = x.createRadialGradient(740, 760, 0, 740, 760, 300); lg.addColorStop(0, 'rgba(255,233,168,0.35)'); lg.addColorStop(1, 'rgba(255,233,168,0)'); x.fillStyle = lg; x.fillRect(440, 460, 600, 600)
    bits(LAMP, LAMP_C, 760, 980, 18)
    // the couch + Pisces (revealed by the widen)
    px(30, 1000, 240, 180, INK); px(38, 1008, 224, 70, '#5a7ab8'); px(38, 1078, 224, 94, '#4a68a0'); px(30, 1172, 20, 30, INK); px(250, 1172, 20, 30, INK)
    W.pisces(150, 1010, 150, t > T.laugh ? 3 : 2, t > T.laugh ? 'happy' : 'wide', { look: [1, 0], hops: [T.widen[1] + 0.05, T.widen[1] + 0.5, 12.0, 12.6] })
    // the little speaker + notes (revealed by the widen)
    bits(SPEAKER, SPEAKER_C, 940, FLOOR - 26, 12, { sy: 1 + 0.04 * Math.sin(t * 11.3) })
    for (let i = 0; i < 4; i++) { const q = (t * 0.7 + i / 4) % 1; bits(NOTE, { N: ['#ffd25a', '#9fe6ff', '#ff8fb1', '#9fe6b0'][i] }, 920 + 60 * Math.sin(q * 5 + i), FLOOR - 130 - q * 300, 6, { alpha: Math.sin(Math.PI * q) }) }

    // ── the couple
    const hush = t > T.hush[0] && t < T.laugh
    const sway = t < G3 ? 18 * Math.sin((t - T.Rin[1]) * 2.4) : 0
    // the dip, then the flop: both rotate flat and drop onto the rug; they bounce up at T2.up
    const dip = ease.inOutCubic(prog(t, G3 - 0.1, G3 + 0.3))
    const fl = ease.outBounce ? ease.outBounce(prog(t, T2.flop, T2.flop + 0.45)) : ease.outCubic(prog(t, T2.flop, T2.flop + 0.45))
    const up = ease.outBack(prog(t, T2.up, T2.up + 0.4))
    const flat = fl * (1 - up)
    // the jig after the widen: off-beat hops + a wiggle
    const jig = t > T2.up + 0.3
    const jw = jig ? 0.22 * Math.sin((t - T2.up) * 9) : 0
    const jigHops = jig ? Array.from({ length: 14 }, (_, i) => r3(T2.up + 0.35 + i * 0.37)) : []
    let lm = 'happy', vm = 'neutral', ll = [1, 0], vl = [-1, 0]
    let lt = 0, vt = 0
    if (t > G1) { vm = 'wide'; vl = [0, 1]; lm = 'wide'; ll = [1, 1] }
    if (t > G1 + 0.8) { vm = 'squint'; vl = [-1, 0]; lm = 'neutral' }
    if (t > G2) { lm = 'wide'; ll = [0, 1]; vm = 'wide'; vl = [-1, 1] }
    if (t > G2 + 0.8) { lm = 'squint'; ll = [1, 0]; vm = 'neutral' }
    if (t > G3) { lm = 'happy'; vm = 'sparkle'; ll = [1, 0]; vl = [-1, 0] }
    if (t > T2.flop) { lm = 'wide'; vm = 'wide'; ll = [0, -1]; vl = [0, -1] }
    if (hush) { lm = 'neutral'; vm = 'neutral'; ll = [1, 0]; vl = [-1, 0] }
    if (t > T.laugh) { lm = 'happy'; vm = 'happy'; ll = vl = undefined }
    if (t > T.line + 1.0) lm = 'heart'
    const tears = t > T.laugh + 0.5 && t < T2.up + 1.2 ? 2 : 0
    // step squashes
    const ow1 = Math.sin(Math.PI * prog(t, G1, G1 + 0.35)), ow2 = Math.sin(Math.PI * prog(t, G2, G2 + 0.35))
    const lx = LEO_X + sway + 40 * prog(t, G1 - 0.2, G1) * (1 - prog(t, G1 + 0.3, G1 + 0.6))
    const vx = VIR_X + sway - 40 * prog(t, G2 - 0.2, G2) * (1 - prog(t, G2 + 0.3, G2 + 0.6))
    const lie = (X, Y, rot, i, o) => { x.save(); x.translate(X, Y); x.rotate(rot); W.star(i, 0, 0, STAR_S, o); x.restore() }
    const lRot = 0.25 * dip * (1 - fl) - 1.45 * flat + jw, vRot = -0.9 * dip * (1 - fl) + 1.45 * flat - jw
    const lY = STAR_Y + 52 * flat, vY = STAR_Y + 50 * dip * (1 - fl) + 52 * flat
    lie(lerp(lx, 380, flat), lY, lRot, 0, { mood: lm, look: ll, tears, squash: -0.12 * ow2, hops: [T.Rin[1] + 0.1, G1 + 0.4, ...(flat > 0.5 ? [] : W.laughHops), ...jigHops] })
    lie(lerp(vx, 700, flat), vY, vRot, 1, { mood: vm, look: vl, tears, squash: -0.12 * ow1, hops: [T.Rin[1] + 0.2, G2 + 0.4, ...(flat > 0.5 ? [] : W.laughHops.map(h => r3(h + 0.12))), ...jigHops.map(h => r3(h + 0.18)), T.line + 0.1] })
    // the laugh while lying down: a shudder instead of hops
    // OW bursts at the stepped tips
    if (ow1 > 0.01) { bits(OW, OW_C, vx - 50, STAR_Y + 80, 7, { sx: ow1, sy: ow1 }); W.txt('OW', vx - 50, STAR_Y - 130, { size: 40, font: "Inter, sans-serif", weight: 800, color: '#ffd25a', alpha: ow1 }) }
    if (ow2 > 0.01) { bits(OW, OW_C, lx + 50, STAR_Y + 80, 7, { sx: ow2, sy: ow2 }); W.txt('OW', lx + 50, STAR_Y - 130, { size: 40, font: "Inter, sans-serif", weight: 800, color: '#ffd25a', alpha: ow2 }) }
    // the flop: a dust puff
    const dq = prog(t, T2.flop + 0.1, T2.flop + 0.8)
    if (dq > 0 && dq < 1) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI; px(540 + Math.cos(a) * 260 * (0.6 + 0.6 * dq) * (i % 2 ? 1 : -1), FLOOR + 60 - Math.sin(a) * 40 * dq, 22, 22, `rgba(230,220,210,${0.6 * (1 - dq)})`) }
  },

  cues(T) {
    return [
      // glossy: the dip swoosh + chime + hearts
      ['whoosh', r3(T2.dip[0]), 0.6, 0.03], ['bell', r3(T2.dip[0] + 0.55), 1760, 0.035, 1.6, 0], ['glitter', r3(T2.dip[0] + 0.5), r3(T2.dip[0] + 1.0)],
      ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T2.hearts + i * 0.32), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.022, 0.4, (i - 2) * 0.2]),
      // the steps: squeak + OW
      ['tom', r3(G1), 140, { gain: 0.14, decay: 0.12 }], ['pop', r3(G1 + 0.04), 1975.53, 0.04, 0.3], ['pop', r3(G1 + 0.12), 1567.98, 0.035, 0.3],
      ['tom', r3(G2), 130, { gain: 0.14, decay: 0.12 }], ['pop', r3(G2 + 0.04), 1760, 0.04, -0.3], ['pop', r3(G2 + 0.12), 1318.51, 0.035, -0.3],
      // the dip… the flop
      ['whoosh', r3(G3 - 0.1), 0.4, 0.03], ['pluck', r3(T2.flop), 392, 0.04, 0.5, 0], ['pluck', r3(T2.flop + 0.12), 349.23, 0.04, 0.5, 0],
      ['boom', r3(T2.flop + 0.2), 0.16], ['tom', r3(T2.flop + 0.2), 70, { gain: 0.22, decay: 0.3 }], ['tick', r3(T2.strike), 0.05],
      // bounce up + the jig
      ['pop', r3(T2.up), 1174.66, 0.04, 0], ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T2.up + 0.35 + i * 0.37), [880, 1174.66, 987.77, 1318.51][i % 4], 0.018, i % 2 ? 0.3 : -0.3]),
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = EVR
