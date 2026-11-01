// tr2amcalm (20 s vertical, Star Talk Trends · ME AT 2 PM vs ME AT 2 AM · 1) "Cool is overrated." · synthwave Bbm.
// The format's shared look lives in ./tam.js (identical in all five tr2am films). Story 0–15.6, then the end card.
//   2 PM   "My plan to | play it *cool.*"  A sunny room. ♒ AQUARIUS lounges in sunglasses: "I'm super chill | about it."
//          A sticker slaps on: REPLY IN: 3 BUSINESS DAYS (the shades glint).
//   2 AM   "2 AM: | *not* cool."  The same star in bed, phone glow on its face: "they said 'haha'. | what did it MEAN".
//          Three stickers as the clock ticks: READ 'HAHA' 41 TIMES (the phone) · NAMED OUR FUTURE DOG (a dog in the
//          thought bubble, with a name tag) · STILL PLAYING IT COOL (the twist: it puts the sunglasses ON, in the dark).
//          Up top the 2 PM self lowers its shades, horrified, then sweats.
//   TURN   a hush… the phone buzzes: "been playing it cool | all day. I give up." The shades fly off; heart eyes.
//   card cut.  The stitch opens: the whole room, the moon, ♓ Pisces on the shelf sobbing happy tears.
//          "Plot twist: | they're *up* too."  Box (2 AM AQUARIUS): "they were playing it cool *too?!*"
//   LAST   "Cool is *overrated.*"  A neon sign flickers on: UNCOOL & HAPPY.
import { makeTAM, BEAT, r3, INK, BONE, GOLD, PINK, HOT, NEON, CYAN, MONO, INTER, clamp, lerp, prog, ease, easeOutBack } from './tam.js'

const G = [BEAT(9), BEAT(11), BEAT(13)]
const ME_AM = { x: 250, y: 1372, s: 180 }, ME_PM = { x: 300, y: 862, s: 184 }
const T2 = { buzz: BEAT(15), shadesOff: BEAT(15) + 0.55, reply: BEAT(19) }
const DOG = ['B..........B', 'BB........BB', 'BBbbbbbbbbBB', '.bbbbbbbbbb.', '.bbEbbbbEbb.', '.bbbbbbbbbb.', '.bbbbNNbbbb.', '..bbbttbbb..', '...bbbbbb...']
const DOG_C = { B: '#7a4a2a', b: '#c8884a', E: INK, N: INK, t: '#ff6f8f' }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

/** sunglasses in sprite cells; drop = how far they have slid down the face (cells) */
function shades(x, drop = 0, glint = 0) {
  x.fillStyle = INK
  x.fillRect(8.6, 16.6 + drop, 9.6, 5.6); x.fillRect(17.8, 17.4 + drop, 0.8, 1.4); x.fillRect(17.8, 16.6 + drop, 9.6, 5.6)
  x.fillRect(6.5, 17.2 + drop, 2.4, 1.1); x.fillRect(27, 17.2 + drop, 2.4, 1.1)
  x.fillStyle = '#2a2050'; x.fillRect(9.4, 17.4 + drop, 8, 4); x.fillRect(18.6, 17.4 + drop, 8, 4)
  x.fillStyle = 'rgba(160,220,255,0.7)'; x.fillRect(10, 17.8 + drop, 2.2, 0.9); x.fillRect(19.2, 17.8 + drop, 2.2, 0.9)
  if (glint > 0) { x.fillStyle = `rgba(255,255,255,${glint})`; x.fillRect(14.6, 15.2 + drop, 1, 4); x.fillRect(13.1, 16.7 + drop, 4, 1) }
}

const TAM = makeTAM({
  id: 'tr2amcalm', sign: 'aquarius',
  heads: {
    topic: 'My plan to | play it *cool.*',
    spiral: '2 AM: | *not* cool.',
    turn: 'Plot twist: | they’re *up* too.',
    last: 'Cool is *overrated.*',
  },
  accents: { topic: '#7fd0ff', spiral: NEON, turn: '#ffd25a', last: PINK },
  stickers: [{ text: "READ 'HAHA' 41 TIMES" }, { text: 'NAMED OUR FUTURE DOG' }, { text: 'STILL PLAYING IT COOL' }],
  clock: { am: t => t < G[0] ? '2:00 AM' : t < G[1] ? '2:14 AM' : t < G[2] ? '2:31 AM' : t < T2.buzz ? '2:47 AM' : '2:52 AM' },
  neon: 'UNCOOL & HAPPY', neonAt: { y: 1000 },
  line: { who: 'me', text: 'they were playing it cool *too?!*' },

  pmScene(x, t, W) {
    const { T } = W
    // a little side table with the phone, face down (cool)
    W.px(520, 896, 150, 16, INK); W.px(524, 898, 142, 10, '#c98a5a'); W.px(584, 912, 18, 40, INK)
    W.px(552, 882, 70, 14, INK); W.px(556, 884, 62, 8, '#3a3f58')
    let mood = 'happy', look, drop = 0, sweat = false
    if (t > T.AMin[1] + 0.2) { mood = 'neutral'; look = [0.3, 1] }
    if (t > G[0]) { mood = 'wide'; look = [0.2, 1]; drop = ease.outBack(prog(t, G[0], G[0] + 0.3)) * 3.2 }
    if (t > G[1]) sweat = true
    if (t > G[2]) { mood = 'eyeroll'; look = undefined }
    const glint = t > T.pmGag && t < T.pmGag + 0.5 ? Math.sin(Math.PI * prog(t, T.pmGag, T.pmGag + 0.5)) : 0
    W.me(ME_PM.x, ME_PM.y, ME_PM.s, { mood, look, sweat, seed: 3, pop: W.pop01(t, T.pmIn, 0.35, 2), hops: [T.pmIn + 0.3, T.pmSay - 0.1, T.pmGag, G[0] + 0.02],
      squash: t > G[2] && t < G[2] + 0.6 ? 0.08 * Math.sin((t - G[2]) * 18) : 0,
      prop: () => shades(x, drop, glint) })
    W.bubble(t, 640, 650, T.pmSay, "I'm super chill|about it.", { t1: T.h0Out[1] + 2.2, size: 38, tx: ME_PM.x + 70, ty: ME_PM.y - 40 })
    // the 2 PM gag: a cool little sticker
    const k = W.pop01(t, T.pmGag, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(720, 818); x.rotate(0.05); x.scale(k, k)
      x.font = `800 28px ${INTER}`; const s = 'REPLY IN: 3 BUSINESS DAYS', w = x.measureText(s).width + 34
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -24, w, 48)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
    }
  },

  amScene(x, t, W) {
    const { T } = W
    // ♓ Pisces on the shelf (revealed when the stitch opens), sobbing happy tears
    W.pisces(880, 868, 130, t > T.open[1] ? 3 : 2, t > T.open[0] ? 'happy' : 'sparkle', { look: [-1, 0.6], hops: [T.open[1] + 0.05, T.open[1] + 0.6, T.neon + 0.3] })
    // a heart drifting up from the phone after the turn
    for (let i = 0; i < 4; i++) {
      const b = T.turn + 0.4 + i * 0.5, q = prog(t, b, b + 2.4)
      if (q > 0 && q < 1) W.bits(HEART, { H: i % 2 ? HOT : PINK }, 420 + 40 * Math.sin(t * 2 + i * 2), 1240 - q * 300, 6, { alpha: Math.sin(Math.PI * q) })
    }
    // the 2 AM self in bed
    let mood = 'neutral', look = [0.7, 0.4], shadeK = 0, tears = 0
    if (t > T.amSay) { mood = 'squint'; look = [1, 0] }
    if (t > G[0]) { mood = 'wide'; look = [1, 0.3] }
    if (t > G[1]) { mood = 'sparkle'; look = [0.5, -1] }
    if (t > G[2]) { mood = 'neutral'; look = [1, 0] }
    if (t > T.hush[0]) { mood = 'neutral'; look = [1, 0.4] }
    if (t > T2.buzz) { mood = 'wide'; look = [1, 0] }
    if (t > T2.buzz + 0.5) { mood = 'heart'; look = undefined }
    if (t > T.open[1]) mood = 'happy'
    if (t > T.line + 1.2) mood = 'heart'
    // sunglasses: on at the third gag (in the dark), flung off at the buzz
    const on = ease.outBack(prog(t, G[2] - 0.05, G[2] + 0.25))
    shadeK = t < T2.shadesOff ? on : 0
    W.me(ME_AM.x, ME_AM.y, ME_AM.s, { mood, look, seed: 3, pop: W.pop01(t, T.amIn, 0.35, 2), tears,
      hops: [T.amIn + 0.3, G[0] + 0.02, G[1] + 0.05, T2.buzz + 0.05, T2.buzz + 0.5, T.open[1], T.line + 1.2, T.neon + 0.3],
      squash: t > T2.buzz && t < T2.buzz + 0.5 ? 0.1 * Math.sin((t - T2.buzz) * 40) : 0,
      prop: () => { if (shadeK > 0.01) shades(x, (1 - shadeK) * -12) } })
    // the blanket front edge over the body
    W.blanket(t, '#3f5ac0', '#6a8af0', 1438)
    // the flung shades
    if (t > T2.shadesOff && t < T2.shadesOff + 1) {
      const q = prog(t, T2.shadesOff, T2.shadesOff + 1)
      x.save(); x.translate(ME_AM.x + 260 * q, ME_AM.y - 40 - 300 * q + 420 * q * q); x.rotate(q * 9); x.scale(5, 5); x.translate(-18, -19); shades(x); x.restore()
    }
    // the phone (in the hand; pops big at the buzz, then rises into the opened room as a close-up)
    const big = ease.outBack(prog(t, T2.buzz, T2.buzz + 0.3))
    const up = ease.inOutCubic(prog(t, T.open[0], T.open[1] + 0.1)), back = ease.inOutCubic(prog(t, T.h3 - 0.25, T.h3 + 0.15))
    const H0 = { x: ME_AM.x + 120, y: ME_AM.y + 40, w: 64, h: 104, r: -0.25 }
    const P1 = { x: lerp(H0.x, 640, big), y: lerp(H0.y, 1220, big), w: lerp(64, 380, big), h: lerp(104, 240, big), r: lerp(-0.25, 0.02, big) }
    const P2 = { x: lerp(P1.x, 560, up), y: lerp(P1.y, 744, up), w: lerp(P1.w, 440, up), h: lerp(P1.h, 300, up), r: lerp(P1.r, 0, up) }
    const P = { x: lerp(P2.x, H0.x, back), y: lerp(P2.y, H0.y, back), w: lerp(P2.w, H0.w, back), h: lerp(P2.h, H0.h, back), r: lerp(P2.r, H0.r, back) }
    const buzz = t > T2.buzz && t < T2.buzz + 0.5 ? 6 * Math.sin(t * 90) : 0
    const after = back > 0.5
    W.phone(P.x + buzz, P.y, P.w, P.h, { rot: P.r, glow: t > T.amIn ? 1 : 0, draw: (l, tp, w, h) => {
      if (!after && big > 0.3) {
        const a = clamp((big - 0.3) / 0.4)
        x.save(); x.globalAlpha *= a
        x.fillStyle = '#5a6ad0'; x.fillRect(l, tp, w, 34); x.font = `700 20px ${MONO}`; x.fillStyle = '#fff'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('them · 2:52 AM', l + 12, tp + 18)
        x.fillStyle = INK; x.fillRect(l + 14, tp + 50, w - 50, 104); x.fillStyle = '#ffffff'; x.fillRect(l + 18, tp + 54, w - 58, 96)
        x.font = `700 26px ${INTER}`; x.fillStyle = INK; x.fillText('been playing it cool', l + 30, tp + 82); x.fillText('all day. I give up.', l + 30, tp + 120)
        // my reply (once the room is open)
        const rk = W.pop01(t, T2.reply, 0.28, 2.4)
        if (rk > 0.01) {
          x.save(); x.translate(l + w - 20, tp + 196); x.scale(rk, rk)
          x.font = `800 28px ${INTER}`; const rw = x.measureText('same. hi.').width + 36
          x.fillStyle = INK; x.fillRect(-rw - 4, -28, rw + 8, 56); x.fillStyle = PINK; x.fillRect(-rw, -24, rw, 48)
          x.fillStyle = INK; x.textAlign = 'center'; x.fillText('same. hi.', -rw / 2, 2); x.restore()
        }
        x.restore()
      } else if (t > G[0] && t < T.hush[1]) {
        x.font = `700 16px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('haha', l + w / 2, tp + h / 2)
      }
    } })
    // thoughts: the AM line, then the future dog
    W.bubble(t, 330, 1140, T.amSay, "they said 'haha'.|what did it MEAN", { t1: G[1] - 0.05, size: 32, think: true, col: '#e8ecff', tx: ME_AM.x + 10, ty: ME_AM.y - 90 })
    const dk = W.pop01(t, G[1], 0.3, 2.4) * W.outK(t, [T.hush[0] - 0.1, T.hush[0] + 0.1])
    if (dk > 0.01) {
      x.save(); x.translate(330, 1140); x.scale(dk, dk)
      for (const [bx, by, r] of [[-60, 110, 8], [-80, 140, 6]]) { x.fillStyle = INK; x.fillRect(bx - r - 4, by - r - 4, 2 * r + 8, 2 * r + 8); x.fillStyle = '#e8ecff'; x.fillRect(bx - r, by - r, 2 * r, 2 * r) }
      x.fillStyle = INK; x.fillRect(-150, -78, 300, 156); x.fillStyle = '#e8ecff'; x.fillRect(-144, -72, 288, 144)
      W.bits(DOG, DOG_C, -50, 0, 9)
      x.fillStyle = INK; x.fillRect(30, -24, 104, 48); x.fillStyle = '#ffd25a'; x.fillRect(34, -20, 96, 40)
      x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BISCUIT', 82, 2)
      x.restore()
    }
    if (t > G[1] && t < G[1] + 0.8) W.sparkles(t, 330, 1140, G[1] + 0.1, 8, 150, 1, [GOLD, PINK, '#fff'])
  },

  cues(T) {
    return [
      // the shades glint (2 PM)
      ['bell', r3(T.pmGag + 0.1), 2637, 0.02, 0.8, -0.3], ['glitter', r3(T.pmGag), r3(T.pmGag + 0.3)],
      // the 2 PM self lowers its shades (G1) / the eyeroll (G3)
      ['pluck', r3(G[0] + 0.12), 392, 0.03, 0.4, -0.3], ['pop', r3(G[2] + 0.1), 440, 0.025, -0.3],
      // the dog thought: a tiny bark
      ['pluck', r3(G[1] + 0.2), 880, 0.03, 0.2, 0.2], ['pluck', r3(G[1] + 0.32), 987.77, 0.03, 0.2, 0.2],
      // the shades go on (in the dark)
      ['whoosh', r3(G[2] - 0.05), 0.2, 0.025], ['tick', r3(G[2] + 0.22), 0.05],
      // the hush, then the buzz
      ...[0, 0.09, 0.18, 0.36, 0.45, 0.54].map(d => ['tick', r3(T2.buzz + d), 0.05]),
      ['pop', r3(T2.buzz + 0.3), 1174.66, 0.05, 0.2], ['whoosh', r3(T2.shadesOff), 0.3, 0.035],
      ...[0, 1, 2, 3].map(i => ['pluck', r3(T.turn + 0.4 + i * 0.5), [880, 987.77, 1174.66, 1318.51][i], 0.02, 0.4, (i - 1.5) * 0.2]),
      // Pisces sob
      ['pluck', r3(T.open[1] + 0.1), 659.25, 0.02, 0.5, 0.4],
      // my reply lands
      ['pop', T2.reply, 1318.51, 0.04, 0.1], ['pop', r3(T2.reply + 0.06), 1760, 0.025, 0.1],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TAM
