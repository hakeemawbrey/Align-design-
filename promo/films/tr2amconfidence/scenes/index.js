// tr2amconfidence (20 s vertical, Star Talk Trends · ME AT 2 PM vs ME AT 2 AM · 2) "Catch. Confirmed." · synthwave Cm.
// The format's shared look lives in ./tam.js (identical in all five tr2am films). Story 0–15.6, then the end card.
//   2 PM   "My level of | *confidence.*"  A sunny room, a full-length mirror. ♌ LEO, glowing: "I'm a catch."
//          The reflection winks back; a sticker slaps on: MIRROR: AGREES.
//   2 AM   "2 AM: | am I a *catch?*"  The same star in bed, staring at the ceiling: "am I a catch?" Three stickers as the
//          clock ticks: REPLAYING "YOU TOO!" (the thought: "enjoy your meal!" / "you too!") · RATED MY LAUGH: 4/10 (a
//          score card) · the twist, the first kind voice: PISCES (SOBBING): YES (♓ pops up on the nightstand, fountaining).
//          Up top the 2 PM self watches, horrified, then nods hard at Pisces.
//   TURN   a hush… THE STARS lean in from the top of the panel: "yes."
//   card cut.  The stitch opens: THE STARS float in the whole room. "Second opinion: | *the stars.*"
//          Box (THE STARS): "2 AM lies. you're a *catch.*"
//   LAST   "*Catch.* Confirmed."  A neon sign flickers on: CERTIFIED CATCH.
import { makeTAM, BEAT, r3, INK, BONE, GOLD, PINK, HOT, NEON, CYAN, INTER, clamp, lerp, prog, ease } from './tam.js'

const G = [BEAT(9), BEAT(11), BEAT(13)]
const ME_AM = { x: 250, y: 1372, s: 180 }, ME_PM = { x: 250, y: 862, s: 184 }
const MIR = { l: 420, r: 580, t: 600, b: 946 }
const T2 = { lean: BEAT(15), nod: G[2] + 0.2 }
const CARD = ['WWWWWWWWWW', 'WwwwwwwwwW', 'WwwwwwwwwW', 'WwwwwwwwwW', 'WwwwwwwwwW', 'WwwwwwwwwW', 'WWWWWWWWWW', '....SS....', '....SS....', '....SS....']

const TAM = makeTAM({
  id: 'tr2amconfidence', sign: 'leo',
  heads: {
    topic: 'My level of | *confidence.*',
    spiral: '2 AM: | am I a *catch?*',
    turn: 'Second opinion: | *the stars.*',
    last: '*Catch.* Confirmed.',
  },
  accents: { topic: '#ffb84a', spiral: NEON, turn: GOLD, last: '#ffd25a' },
  stickers: [{ text: "REPLAYING: 'YOU TOO!'" }, { text: 'RATED MY LAUGH: 4/10' }, { text: 'PISCES (SOBBING): YES', bg: '#e8f6ff', x: 620 }],
  clock: { am: t => t < G[0] ? '2:00 AM' : t < G[1] ? '2:12 AM' : t < G[2] ? '2:29 AM' : t < T2.lean ? '2:44 AM' : '2:45 AM' },
  neon: 'CERTIFIED CATCH', neonColor: '#ffb84a', neonAt: { y: 1040 },
  line: { who: 'stars', text: "2 AM lies. you're a *catch.*" },

  pmScene(x, t, W) {
    const { T } = W
    // the full-length mirror, with the reflection
    W.px(MIR.l - 10, MIR.t - 10, MIR.r - MIR.l + 20, MIR.b - MIR.t + 10, INK); W.px(MIR.l - 4, MIR.t - 4, MIR.r - MIR.l + 8, MIR.b - MIR.t + 4, '#e0a83c')
    const mg = x.createLinearGradient(MIR.l, MIR.t, MIR.r, MIR.b); mg.addColorStop(0, '#d8f0ff'); mg.addColorStop(1, '#a8cce8')
    x.fillStyle = mg; x.fillRect(MIR.l, MIR.t, MIR.r - MIR.l, MIR.b - MIR.t)
    let mood = 'sparkle', look = [1, 0], sweat = false, sq = 0
    if (t > T.AMin[1] + 0.2) { mood = 'neutral'; look = [0.3, 1] }
    if (t > G[0]) { mood = 'wide'; look = [0.2, 1] }
    if (t > G[1]) { sweat = true; mood = 'squint' }
    if (t > T2.nod) { mood = 'happy'; look = undefined; sweat = false; sq = t < T2.nod + 1 ? 0.09 * Math.sin((t - T2.nod) * 22) : 0 }
    if (t > T2.lean) mood = 'sparkle'
    const pk = W.pop01(t, T.pmIn, 0.35, 2)
    // the reflection (mirrored, a little bluer) winks at the 2 PM gag
    x.save(); x.beginPath(); x.rect(MIR.l, MIR.t, MIR.r - MIR.l, MIR.b - MIR.t); x.clip()
    x.globalAlpha = 0.85
    const rm = t > T.pmGag && t < T.pmGag + 0.9 ? 'wink' : t < T.AMin[1] + 0.2 ? 'sparkle' : mood
    W.me(MIR.l + 70, ME_PM.y - 30, 130, { mood: rm, look: [-1, 0], seed: 5, pop: pk, glyph: null, hops: [T.pmGag] })
    x.globalAlpha = 1
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.moveTo(MIR.l + 20, MIR.t); x.lineTo(MIR.l + 60, MIR.t); x.lineTo(MIR.l, MIR.t + 120); x.lineTo(MIR.l, MIR.t + 60); x.fill()
    x.restore()
    W.px(MIR.l - 10, MIR.b - 6, MIR.r - MIR.l + 20, 12, INK)
    W.me(ME_PM.x, ME_PM.y, ME_PM.s, { mood, look, sweat, seed: 3, pop: pk, squash: sq, hops: [T.pmIn + 0.3, T.pmSay - 0.1, T.pmGag + 0.1, G[0] + 0.02, T2.lean + 0.1] })
    W.bubble(t, 330, 640, T.pmSay, "I'm a catch.", { t1: T.h0Out[1] + 2.2, size: 42, tx: ME_PM.x + 20, ty: ME_PM.y - 90 })
    if (t > T.pmGag && t < T.pmGag + 0.8) W.sparkles(t, MIR.l + 70, ME_PM.y - 60, T.pmGag + 0.05, 6, 60, 2, [GOLD, '#fff'])
    const k = W.pop01(t, T.pmGag + 0.15, 0.3, 2.6)
    if (k > 0.01) {
      x.save(); x.translate(780, 860); x.rotate(-0.05); x.scale(k, k)
      x.font = `800 30px ${INTER}`; const s = 'MIRROR: AGREES', w = x.measureText(s).width + 34
      x.fillStyle = INK; x.fillRect(-w / 2 - 4, -28, w + 8, 56); x.fillStyle = '#fffaf0'; x.fillRect(-w / 2, -24, w, 48)
      x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2); x.restore()
    }
  },

  amScene(x, t, W) {
    const { T } = W
    // THE STARS lean in from the top of the panel at the turn, then float up into the opened room
    const lean = ease.outBack(prog(t, T2.lean, T2.lean + 0.4)), up = ease.inOutCubic(prog(t, T.open[0], T.open[1] + 0.15))
    if (t > T2.lean) {
      const sx = lerp(600, 560, up), sy = lerp(lerp(940, 1150, lean), 700, up), ss = lerp(150, 230, up)
      W.stars(sx, sy, ss, { mood: t > T.line + 1.2 ? 'wink' : 'happy', hops: [T2.lean + 0.4, T.open[1] + 0.05, ...[0, 1].map(i => r3(T.line + 0.2 + i * 0.5)), T.neon + 0.3] })
      if (t > T.open[1]) W.sparkles(t, sx, sy, T.open[1], 10, 170, 1, [GOLD, '#fff', PINK])
    }
    W.bubble(t, lerp(790, 790, up), lerp(1150, 610, up), T2.lean + 0.35, 'yes.', { size: 44, t1: T.h3, tx: lerp(680, 660, up), ty: lerp(1170, 660, up) })
    // the 2 AM self in bed, staring at the ceiling
    let mood = 'neutral', look = [0, -1], tears = 0
    if (t > T.amSay) { mood = 'squint'; look = [0, -1] }
    if (t > G[0]) { mood = 'wide'; look = [0.6, -1] }
    if (t > G[1]) { mood = 'sleepy'; look = [0, -1] }
    if (t > G[2]) { mood = 'wide'; look = [1, 0] }
    if (t > G[2] + 0.6) { mood = 'neutral'; look = [1, -0.3] }
    if (t > T2.lean + 0.1) { mood = 'wide'; look = [1, -1] }
    if (t > T2.lean + 0.7) { mood = 'sparkle'; look = undefined }
    if (t > T.line + 1.2) mood = 'heart'
    const me = W.me(ME_AM.x, ME_AM.y, ME_AM.s, { mood, look, seed: 3, pop: W.pop01(t, T.amIn, 0.35, 2), tears, zzz: false,
      hops: [T.amIn + 0.3, G[0] + 0.02, G[2] + 0.05, T2.lean + 0.15, T2.lean + 0.7, T.open[1], T.line + 1.2, T.neon + 0.3],
      squash: t > G[1] && t < G[1] + 0.5 ? -0.08 * Math.sin((t - G[1]) * 20) : 0 })
    void me
    W.blanket(t, '#c0703a', '#f0a04a', 1438)
    // ♓ Pisces pops up on the nightstand at the third gag: SOBBING, supportive
    const pk = W.pop01(t, G[2], 0.32, 2.4)
    if (pk > 0.01) W.pisces(890, 1300, 130, t > T.open[1] ? 3 : t > G[2] + 0.2 ? 3 : 2, 'happy', { pop: pk, look: [-1, 0], hops: [G[2] + 0.35, G[2] + 0.7, T.open[1] + 0.1, T.neon + 0.35] })
    // thoughts: the question, then the replay, then the score card
    W.bubble(t, 330, 1140, T.amSay, 'am I a catch?', { t1: G[0] - 0.02, size: 36, think: true, col: '#e8ecff', tx: ME_AM.x + 10, ty: ME_AM.y - 90 })
    W.bubble(t, 310, 1140, G[0], "“enjoy your meal!”|me: “you too!”", { t1: G[1] - 0.02, size: 32, think: true, col: '#e8ecff', tx: ME_AM.x + 10, ty: ME_AM.y - 90, weight: 700 })
    const ck = W.pop01(t, G[1], 0.3, 2.4) * W.outK(t, [T.hush[0] - 0.1, T.hush[0] + 0.1])
    if (ck > 0.01) {
      x.save(); x.translate(330, 1140); x.scale(ck, ck)
      for (const [bx, by, r] of [[-60, 100, 8], [-80, 130, 6]]) { x.fillStyle = INK; x.fillRect(bx - r - 4, by - r - 4, 2 * r + 8, 2 * r + 8); x.fillStyle = '#e8ecff'; x.fillRect(bx - r, by - r, 2 * r, 2 * r) }
      x.fillStyle = INK; x.fillRect(-130, -70, 260, 140); x.fillStyle = '#e8ecff'; x.fillRect(-124, -64, 248, 128)
      W.bits(CARD, { W: '#fffaf0', w: '#fffaf0', S: '#8a7ab0' }, -40, 4, 9)
      x.font = `800 40px ${INTER}`; x.fillStyle = HOT; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('4/10', -40, -12)
      x.font = `800 26px ${INTER}`; x.fillStyle = INK; x.fillText('“heh.”', 70, 0)
      x.restore()
    }
  },

  cues(T) {
    return [
      // the mirror wink
      ['bell', r3(T.pmGag + 0.05), 2637, 0.025, 0.8, 0], ['glitter', r3(T.pmGag), r3(T.pmGag + 0.3)], ['pop', r3(T.pmGag + 0.15), 1318.51, 0.035, 0.3],
      // the replay: a cringe slide down
      ['pluck', r3(G[0] + 0.15), 392, 0.03, 0.5, -0.2], ['pluck', r3(G[0] + 0.3), 349.23, 0.03, 0.5, -0.2],
      // the score card: a sad trombone-ish two notes
      ['pluck', r3(G[1] + 0.2), 440, 0.03, 0.3, 0], ['pluck', r3(G[1] + 0.42), 392, 0.03, 0.6, 0],
      // Pisces pops up, sobbing
      ['pop', r3(G[2] + 0.02), 1567.98, 0.04, 0.4], ['pluck', r3(G[2] + 0.4), 659.25, 0.025, 0.5, 0.4], ['pluck', r3(G[2] + 0.75), 587.33, 0.025, 0.5, 0.4],
      // the 2 PM self nods hard
      ...[0, 0.15, 0.3].map(d => ['tick', r3(T2.nod + d), 0.035]),
      // THE STARS lean in: "yes."
      ['whoosh', r3(T2.lean), 0.3, 0.035], ['pop', r3(T2.lean + 0.35), 1174.66, 0.045, 0], ['bell', r3(T2.lean + 0.4), 1760, 0.03, 1.2, 0],
      ['glitter', r3(T.open[1]), r3(T.open[1] + 0.4)],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TAM
